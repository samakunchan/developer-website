import { createServerFn } from '@tanstack/react-start';
import { checkDatabaseStatusInternal } from './db-actions.server';
import { DbStatus } from './schemas';

/**
 * Public server function to check the database health status.
 */
export const checkDatabaseStatus = createServerFn({
  method: 'GET',
}).handler(async (): Promise<DbStatus> => {
  return await checkDatabaseStatusInternal();
});
