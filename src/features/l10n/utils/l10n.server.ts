import { fetchServerLocale, supportedLocales } from './l10n.functions';

export async function getInitialLocale(): Promise<string> {
  if (typeof document !== 'undefined') {
    // Client-side detection
    const navigatorLocale: string = navigator.language;
    if (supportedLocales.includes(navigatorLocale)) return navigatorLocale;
    const browserBase: string = navigatorLocale.split('-')[0];
    const matchLocale: string | undefined = supportedLocales.find((l) => l.startsWith(browserBase + '-'));
    return matchLocale || 'en-US';
  }

  // Server-side detection via RPC function
  return await fetchServerLocale();
}
