/**
 * Map of common locales to likely standard timezones for SSR guesses.
 */
const localeToTimeZoneMap: Record<string, string> = {
  'en-US': 'America/New_York',
  'en-GB': 'Europe/London',
  'fr-FR': 'Europe/Paris',
  'de-DE': 'Europe/Berlin',
  'ja-JP': 'Asia/Tokyo',
  'zh-CN': 'Asia/Shanghai',
  'pt-BR': 'America/Sao_Paulo',
  'ru-RU': 'Europe/Moscow',
  'es-ES': 'Europe/Madrid',
  'it-IT': 'Europe/Rome',
};

/**
 * Gets a "best-guess" timezone based on the detected locale for initial SSR.
 * Fallbacks to UTC if no mapping is found.
 */
export function getGuessTimeZone(locale: string): string {
  // Try exact match (e.g. en-US)
  if (localeToTimeZoneMap[locale]) {
    return localeToTimeZoneMap[locale];
  }

  // Try language-only match (e.g. en)
  const language = locale.split('-')[0];
  const langMatch = Object.keys(localeToTimeZoneMap).find((key) => key.startsWith(language));

  return langMatch ? localeToTimeZoneMap[langMatch] : 'UTC';
}

/**
 * Detects the actual browser timezone on the client.
 */
export function getBrowserTimeZone(): string {
  if (typeof window === 'undefined') return 'UTC';
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone;
  } catch {
    return 'UTC';
  }
}
