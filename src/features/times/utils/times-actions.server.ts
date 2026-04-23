import { TimeServerOutput } from './schemas';

/**
 * Internal logic for fetching and formatting the server time.
 */
export async function getServerTimeInternal(locale: string, timeZone: string): Promise<TimeServerOutput> {
  const date: Date = new Date();

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: timeZone,
  });

  return {
    formatted: formatter.format(date),
    iso: date.toISOString(),
    timeZone: timeZone,
  };
}
// export { TimeServerOutput };
