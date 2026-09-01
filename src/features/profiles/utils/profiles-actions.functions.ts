import { createServerFn } from '@tanstack/react-start';
import { UserOutput } from './schemas';
import { getProfilePresentationInternal } from './profiles-actions.server';

/**
 * Server function to fecth to the front page.
 */
export const getProfilePresentationAction = createServerFn({ method: 'GET' }).handler(async (): Promise<UserOutput> => {
  return await getProfilePresentationInternal();
});

// /**
//  * Server function to fetch the current user's profile to admin page.
//  */
// export const getProfileAction = createServerFn({ method: 'GET' }).handler(async (): Promise<UserOutput> => {
//   return await getProfileInternal();
// });
