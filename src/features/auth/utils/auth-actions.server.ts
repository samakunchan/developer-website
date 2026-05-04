import { setCookie, getCookie, deleteCookie } from '@tanstack/react-start/server';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import crypto from 'node:crypto';
import { db } from '../../database/server/db.server';
import {
  PayloadSessionType,
  SessionType,
  SignInInput,
  UserInputDto,
  ForgotPasswordInput,
  ResetPasswordInput,
} from './schemas';
import { sendEmail } from '../../../core/utils/email.server';

const SESSION_COOKIE_NAME = 'auth_session';
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MINUTES = 15;

if (!process.env.SESSION_SECRET) {
  if (process.env.NODE_ENV === 'production') {
    throw new Error('SESSION_SECRET environment variable is mandatory in production');
  }
}

const JWT_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'a-very-long-and-secure-secret-key-for-development-only',
);

/**
 * Verifies a JWT token and returns the payload.
 */
async function verifySession(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as PayloadSessionType;
  } catch {
    return null;
  }
}

/**
 * Creates a signed JWT token.
 */
async function createSession(user: UserInputDto, sessionId: string) {
  return await new jose.SignJWT({
    sub: String(user.id),
    email: user.email,
    role: user.role,
    name: user.name,
    sessionId,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
}

/**
 * Fetches the current user session from the server.
 */
export async function getSessionInternal(): Promise<SessionType | null> {
  const token: string | undefined = getCookie(SESSION_COOKIE_NAME);

  if (!token) {
    return null;
  }

  const payload: PayloadSessionType = await verifySession(token);
  if (!payload || !payload.sessionId) {
    return null;
  }

  const userId: number = parseInt(payload.sub, 10);
  if (isNaN(userId)) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true, currentSessionId: true },
  });

  if (!user || user.currentSessionId !== payload.sessionId) {
    return null;
  }

  return { user } as SessionType;
}

/**
 * Handles the sign-in logic on the server.
 */
export async function signInInternal(data: SignInInput): Promise<{ success: boolean }> {
  const user = await db.user.findUnique({
    where: { email: data.email },
  });

  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }

  // Check for lockout
  if (user.lockoutUntil && user.lockoutUntil > new Date()) {
    const diff: number = Math.ceil((user.lockoutUntil.getTime() - Date.now()) / (1000 * 60));
    throw new Error(`Account is temporarily locked. Try again in ${diff} minutes.`);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    const newFailedAttempts: number = user.failedLoginAttempts + 1;
    const isLockingOut: boolean = newFailedAttempts >= MAX_FAILED_ATTEMPTS;

    await db.user.update({
      where: { id: user.id },
      data: {
        failedLoginAttempts: newFailedAttempts,
        lockoutUntil: isLockingOut ? new Date(Date.now() + LOCKOUT_DURATION_MINUTES * 60 * 1000) : null,
      },
    });

    if (isLockingOut) {
      throw new Error(`Too many failed attempts. Account locked for ${LOCKOUT_DURATION_MINUTES} minutes.`);
    }

    throw new Error('Invalid email or password');
  }

  const sessionId = crypto.randomUUID();

  await db.user.update({
    where: { id: user.id },
    data: {
      failedLoginAttempts: 0,
      lockoutUntil: null,
      currentSessionId: sessionId,
    },
  });

  const token: string = await createSession(
    {
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    },
    sessionId,
  );

  setCookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  return { success: true };
}

/**
 * Handles the sign-out logic on the server.
 */
export async function signOutInternal(): Promise<{ success: boolean }> {
  const session = await getSessionInternal();
  if (session?.user) {
    await db.user.update({
      where: { id: session.user.id },
      data: { currentSessionId: null },
    });
  }
  deleteCookie(SESSION_COOKIE_NAME);
  return { success: true };
}

/**
 * Handles the password reset request.
 */
export async function requestPasswordResetInternal(data: ForgotPasswordInput): Promise<{ success: boolean }> {
  const user = await db.user.findUnique({
    where: { email: data.email },
  });

  // For security, always return success even if user not found
  if (!user) {
    return { success: true };
  }

  const token = crypto.randomBytes(32).toString('hex');
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await db.user.update({
    where: { id: user.id },
    data: {
      resetToken: token,
      resetTokenExpiry: expiry,
    },
  });

  const resetUrl = `${process.env.APP_URL || 'http://localhost:3000'}/reset-password?token=${token}`;

  await sendEmail({
    to: user.email,
    subject: 'Password Reset Request',
    html: `
      <h1>Password Reset</h1>
      <p>You requested a password reset. Click the link below to set a new password:</p>
      <a href="${resetUrl}">${resetUrl}</a>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, you can safely ignore this email.</p>
    `,
  });

  return { success: true };
}

/**
 * Handles the password reset itself.
 */
export async function resetPasswordInternal(data: ResetPasswordInput): Promise<{ success: boolean }> {
  const user = await db.user.findUnique({
    where: { resetToken: data.token },
  });

  if (!user || !user.resetTokenExpiry || user.resetTokenExpiry < new Date()) {
    throw new Error('Invalid or expired reset token');
  }

  const hashedPassword = await bcrypt.hash(data.password, 10);

  await db.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
      failedLoginAttempts: 0,
      lockoutUntil: null,
      currentSessionId: null, // Invalidate current sessions
    },
  });

  return { success: true };
}
