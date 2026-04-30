import { createServerFn } from '@tanstack/react-start';
import { getThemeInternal, setThemeInternal } from './theme-actions.server';
import { ThemeType } from './theme.types';

/**
 * Public server function to fetch the current site theme.
 */
export const getTheme = createServerFn({ method: 'GET' }).handler(async () => {
  return await getThemeInternal();
});

/**
 * Public server function to update the site theme.
 */
export const setThemeAction = createServerFn({ method: 'POST' })
  .inputValidator((theme: unknown): ThemeType => {
    if (
      theme === 'dark' ||
      theme === 'nature' ||
      theme === 'light' ||
      theme === 'nature' ||
      theme === 'ocean' ||
      theme === 'desert'
    ) {
      return theme;
    }
    return 'light';
  })
  .handler(async ({ data }) => {
    return await setThemeInternal(data);
  });
