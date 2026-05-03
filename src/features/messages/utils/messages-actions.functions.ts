import { createServerFn } from '@tanstack/react-start';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';
import { contactFormSchema, PaginatedMessages } from './schemas';
import {
  submitMessageInternal,
  getMessagesInternal,
  toggleMessageReadInternal,
  getUnreadMessagesCountInternal,
} from './messages-actions.server';

/**
 * Server function to submit a contact message.
 */
export const submitMessageAction = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(contactFormSchema))
  .handler(async ({ data }) => {
    return await submitMessageInternal(data);
  });

/**
 * Server function to fetch paginated messages (Admin).
 */
export const getMessagesAction = createServerFn({ method: 'GET' })
  .inputValidator(
    zodValidator(
      z.object({
        page: z.number().default(1),
        pageSize: z.number().default(10),
        filter: z.enum(['all', 'read', 'unread']).default('all'),
        search: z.string().optional(),
      }),
    ),
  )
  .handler(async ({ data }): Promise<PaginatedMessages> => {
    return await getMessagesInternal(data);
  });

/**
 * Server function to toggle message read status (Admin).
 */
export const toggleMessageReadAction = createServerFn({ method: 'POST' })
  .inputValidator(
    zodValidator(
      z.object({
        id: z.number(),
        isRead: z.boolean(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    return await toggleMessageReadInternal(data.id, data.isRead);
  });

/**
 * Server function to get the unread count (Admin).
 */
export const getUnreadMessagesCountAction = createServerFn({ method: 'GET' }).handler(async () => {
  return await getUnreadMessagesCountInternal();
});
