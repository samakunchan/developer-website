import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import { ForgotPasswordInput, forgotPasswordSchema, resetPasswordSchema, signInSchema } from './schemas';
import {
  getSessionInternal,
  requestPasswordResetInternal,
  resetPasswordInternal,
  signInInternal,
  signOutInternal,
} from './auth-actions.server';

/**
 * Public server function to fetch the current session.
 */
export const getSession = createServerFn({ method: 'GET' }).handler(async () => {
  return await getSessionInternal();
});

/**
 * Public server function to sign in.
 */
export const signInAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(signInSchema))
  .handler(async ({ data }) => {
    return await signInInternal(data);
  });

/**
 * Public server function to sign out.
 */
export const signOutAction = createServerFn({ method: 'POST' }).handler(async () => {
  return await signOutInternal();
});

/**
 * Public server function to request a password reset.
 */
export const requestPasswordResetActionForDev = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(forgotPasswordSchema))
  .handler(async ({ data }) => {
    return await requestPasswordResetInternal(data);
  });

export const requestPasswordResetActionForProd = createServerFn({ method: 'POST' }).handler(async () => {
  const data: ForgotPasswordInput = { email: process.env.ADMIN_EMAIL as string };
  return await requestPasswordResetInternal(data);
});

/**
 * Public server function to reset the password.
 */
export const resetPasswordAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(resetPasswordSchema))
  .handler(async ({ data }) => {
    return await resetPasswordInternal(data);
  });
