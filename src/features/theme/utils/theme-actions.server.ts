import { db } from '../../database/server/db.server';

import { ThemeType } from './theme.types';

/**
 * Reads the theme from the database on the server.
 * Returns 'light' by default if no configuration is found.
 */
export async function getThemeInternal(): Promise<ThemeType> {
  try {
    const settings = await db.settings.findFirst();
    return (settings?.theme as ThemeType) || 'light';
  } catch (error) {
    console.error('Failed to fetch theme from DB:', error);
    return 'light';
  }
}
