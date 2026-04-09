import { createServerFn } from '@tanstack/react-start';
import { localeTzMiddleware } from '../middlewares/middleware';
import { getServerTimeInternal } from './times-actions.server';
import { TimeServerInput, TimeServerOutput } from './schemas';

/**
 * Public server function to fetch the current server time.
 */
export const getServerTime = createServerFn({ method: 'GET' })
  .inputValidator((data: TimeServerInput | undefined) => data)
  .middleware([localeTzMiddleware])
  .handler(
    async ({
      context,
      data,
    }: {
      context: { locale: string; timeZone: string };
      data: TimeServerInput | undefined;
    }): Promise<TimeServerOutput> => {
      // Prioritize timezone from input data over middleware context
      const effectiveTimeZone: string = data?.timeZone || context.timeZone;

      return await getServerTimeInternal(context.locale, effectiveTimeZone);
    },
  );
