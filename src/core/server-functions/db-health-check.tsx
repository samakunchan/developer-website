import { createServerFn } from '@tanstack/react-start';
import { db } from '../database/db.server';

export type DbStatus = {
  status: 'online' | 'offline';
  details?: Record<string, string>;
  error?: string;
};

export const checkDatabaseStatus = createServerFn({
  method: 'GET',
}).handler(async (): Promise<DbStatus> => {
  try {
    // Specify the expected rows from DB (satisfies the non-nullable {} constraint)
    const result = await db.$queryRaw<Array<Record<string, string>>>`SELECT now() as now, version() as version`;

    return {
      status: 'online' as const,
      details: result[0] || {},
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    return {
      status: 'offline' as const,
      error: message,
    };
  }
});
