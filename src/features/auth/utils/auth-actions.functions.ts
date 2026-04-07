import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import { signInSchema } from './schemas';
import { getSessionInternal, signInInternal, signOutInternal } from './auth-actions.server';

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
    console.log('On est dans signInAction');
    return await signInInternal(data);
  });

/**
 * Public server function to sign out.
 */
export const signOutAction = createServerFn({ method: 'POST' }).handler(async () => {
  return await signOutInternal();
});
