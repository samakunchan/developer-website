import { createServerFn } from '@tanstack/react-start';

export const supportedLocales: string[] = ['en-US', 'fr-FR', 'es-ES', 'zh-CN', 'ar-SA'];

export const fetchServerLocale = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const { getRequestHeader } = await import('@tanstack/react-start/server');

    const acceptLang: string | undefined = getRequestHeader('accept-language');
    if (acceptLang) {
      const parsed: string = acceptLang.split(',')[0].split(';')[0].trim();
      if (supportedLocales.includes(parsed)) return parsed;
      const base: string = parsed.split('-')[0];
      const matchLocale: string | undefined = supportedLocales.find((l) => l.startsWith(base + '-'));
      if (matchLocale) return matchLocale;
    }
  } catch {
    // getRequestHeader might not be available or imported
  }
  return 'en-US';
});
