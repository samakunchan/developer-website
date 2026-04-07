import { setCookie, getCookie, deleteCookie } from '@tanstack/react-start/server';
import bcrypt from 'bcryptjs';
import * as jose from 'jose';
import { db } from '../../../core/database/db.server';
import { SessionType, SignInInput } from './schemas';

const SESSION_COOKIE_NAME = 'auth_session';
const JWT_SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET || 'a-very-long-and-secure-secret-key-that-is-at-least-32-characters-long',
);

/**
 * Verifies a JWT token and returns the payload.
 */
async function verifySession(token: string) {
  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as { sub: string; email: string; role: string; name: string | null };
  } catch {
    return null;
  }
}

/**
 * Creates a signed JWT token.
 */
async function createSession(user: { id: number; email: string; role: string; name: string | null }) {
  return await new jose.SignJWT({
    sub: String(user.id),
    email: user.email,
    role: user.role,
    name: user.name,
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

  const payload = await verifySession(token);
  if (!payload) {
    return null;
  }

  const userId = parseInt(payload.sub, 10);
  if (isNaN(userId)) {
    return null;
  }

  const user = await db.user.findUnique({
    where: { id: userId },
    select: { id: true, email: true, name: true, role: true },
  });

  if (!user) {
    return null;
  }

  return { user } as SessionType;
}

/**
 * Handles the sign-in logic on the server.
 */
export async function signInInternal(data: SignInInput): Promise<{ success: boolean }> {
  console.log('On est dans signInInternal');
  const user = await db.user.findUnique({
    where: { email: data.email },
  });

  console.log('On a trouvé l‘utilisateur', user);
  if (!user || !user.password) {
    throw new Error('Invalid email or password');
  }

  console.log('On a trouvé le mot de passe');
  const isPasswordValid = await bcrypt.compare(data.password, user.password);
  if (!isPasswordValid) {
    throw new Error('Invalid email or password');
  }

  console.log('On a trouvé le mot de passe');
  const token: string = await createSession({
    id: user.id,
    email: user.email,
    role: user.role,
    name: user.name,
  });

  console.log('On a créé le token', token);
  setCookie(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 24, // 24 hours
  });

  console.log('On a mis le cookie');
  return { success: true };
}

/**
 * Handles the sign-out logic on the server.
 */
export async function signOutInternal(): Promise<{ success: boolean }> {
  deleteCookie(SESSION_COOKIE_NAME);
  return { success: true };
}
