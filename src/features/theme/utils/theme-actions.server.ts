import { db } from '../../database';

import { ThemeType } from './theme.types';

/**
 * Reads the theme from the database on the server.
 * Returns 'nature' by default if no configuration is found.
 */
export async function getThemeInternal(): Promise<ThemeType> {
  try {
    const settings = await db.settings.findFirst();
    return (settings?.theme as ThemeType) || 'nature';
  } catch (error) {
    console.error('Failed to fetch theme from DB:', error);
    return 'nature';
  }
}

/**
 * Sets the theme in the database (Singleton record with ID 1).
 */
export async function setThemeInternal(theme: ThemeType): Promise<{ success: boolean }> {
  try {
    await db.settings.upsert({
      where: { id: 1 },
      update: { theme },
      create: { id: 1, theme },
    });
    return { success: true };
  } catch (error) {
    console.error('Failed to update theme in DB:', error);
    return { success: false };
  }
}
