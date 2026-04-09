import { createFileRoute } from '@tanstack/react-router';
import { getServerTime } from '../features/times/utils/times-actions.functions';
import { TimeServerOutput } from '../features/times/utils/schemas';
import { getBrowserTimeZone, getGuessTimeZone } from '../core/utils/timezone';
import { checkDatabaseStatus } from '../features/database/utils/db-actions.functions';
import { DbStatus } from '../features/database/utils/schemas';
import { AdminDashboard } from '../components/AdminDashboard';

export const Route = createFileRoute('/admin/dashboard')({
  loader: async ({
    context,
  }): Promise<TimeServerOutput & { dbStatus: DbStatus; locale: string; isConnected: boolean }> => {
    const detectedTz: string = getBrowserTimeZone();
    const timeZone: string = detectedTz !== 'UTC' ? detectedTz : getGuessTimeZone(context.locale);

    const dbStatus: DbStatus = await checkDatabaseStatus();
    const time: TimeServerOutput = await getServerTime({
      data: { timeZone },
    });

    return {
      ...time,
      dbStatus,
      locale: context.locale,
      isConnected: context.session?.user.role === 'admin',
    };
  },
  component: RouteComponent,
});

function RouteComponent() {
  const { formatted, timeZone, dbStatus, locale } = Route.useLoaderData();

  return <AdminDashboard formatted={formatted} timeZone={timeZone} dbStatus={dbStatus} locale={locale} />;
}
