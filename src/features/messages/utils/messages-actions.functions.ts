import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import { contactFormSchema } from './schemas';
import { submitMessageInternal } from './messages-actions.server';

/**
 * Server function to submit a contact message.
 */
export const submitMessageAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(contactFormSchema))
  .handler(async ({ data }) => {
    return await submitMessageInternal(data);
  });
