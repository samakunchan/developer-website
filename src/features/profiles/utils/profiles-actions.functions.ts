import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import { personalInfoSchema, techStackSchema, socialLinkSchema } from './schemas';
import {
  getProfileInternal,
  updatePersonalInfoInternal,
  addTechStackInternal,
  removeTechStackInternal,
  addSocialLinkInternal,
  removeSocialLinkInternal,
} from './profiles-actions.server';
import { z } from 'zod';

/**
 * Server function to fetch the current user's profile.
 */
export const getProfileAction = createServerFn({ method: 'GET' }).handler(async () => {
  return await getProfileInternal();
});

/**
 * Server function to update personal information.
 */
export const updatePersonalInfoAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(personalInfoSchema))
  .handler(async ({ data }) => {
    return await updatePersonalInfoInternal(data);
  });

/**
 * Server function to add a tech stack item.
 */
export const addTechStackAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(techStackSchema))
  .handler(async ({ data }) => {
    return await addTechStackInternal(data);
  });

/**
 * Server function to remove a tech stack item.
 */
export const removeTechStackAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(z.object({ id: z.number() })))
  .handler(async ({ data }) => {
    return await removeTechStackInternal(data.id);
  });

/**
 * Server function to add a social link.
 */
export const addSocialLinkAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(socialLinkSchema))
  .handler(async ({ data }) => {
    return await addSocialLinkInternal(data);
  });

/**
 * Server function to remove a social link.
 */
export const removeSocialLinkAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(z.object({ id: z.number() })))
  .handler(async ({ data }) => {
    return await removeSocialLinkInternal(data.id);
  });
