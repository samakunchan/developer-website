import { db } from '../';
import { DbStatus } from './schemas';

/**
 * Internal logic for checking the database health.
 */
export async function checkDatabaseStatusInternal(): Promise<DbStatus> {
  try {
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
}
