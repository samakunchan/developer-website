import { createServerFn } from '@tanstack/react-start';
import { getThemeInternal } from './theme-actions.server';

/**
 * Public server function to fetch the current site theme.
 */
export const getTheme = createServerFn({ method: 'GET' }).handler(async () => {
  return await getThemeInternal();
});
