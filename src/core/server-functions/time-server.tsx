import { createServerFn } from '@tanstack/react-start';
import { localeTzMiddleware } from '../middlewares/middleware';

type TimeServerInput = { timeZone?: string };

export type TimeServerOutput = {
  formatted: string;
  iso: string;
  timeZone: string;
};

export const getServerTime = createServerFn()
  .inputValidator((data: TimeServerInput | undefined) => data)
  .middleware([localeTzMiddleware])
  .handler(async ({ context, data }): Promise<TimeServerOutput> => {
    // Current date
    const date: Date = new Date();

    // Prioritize timezone from input data over middleware context
    const effectiveTimeZone: string = data?.timeZone || context.timeZone;

    // Format the date using Intl with the locale and effective timezone
    const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(
      context.locale,
      {
        dateStyle: 'full',
        timeStyle: 'long',
        timeZone: effectiveTimeZone,
      },
    );

    return {
      formatted: formatter.format(date),
      iso: date.toISOString(),
      timeZone: effectiveTimeZone,
    } as TimeServerOutput;
  });
