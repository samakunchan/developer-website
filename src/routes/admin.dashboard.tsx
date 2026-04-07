import { createFileRoute, redirect } from '@tanstack/react-router';
import { getServerTime, TimeServerOutput } from '../core/server-functions/time-server';
import { getBrowserTimeZone, getGuessTimeZone } from '../core/utils/timezone';
import { checkDatabaseStatus, DbStatus } from '../core/server-functions/db-health-check';
import { AdminDashboard } from '../components/AdminDashboard';
import { Header } from '../components/Header';
import { ErrorComponent, ErrorType } from '../components/ErrorComponent';

export const Route = createFileRoute('/admin/dashboard')({
  beforeLoad: async ({ context }) => {
    console.log('On est dans beforeLoad', context);
    if (!context.session || context.session.user.role !== 'admin') {
      throw redirect({
        to: '/login',
        search: {
          redirectTo: '/admin/dashboard',
        },
      });
    }
  },
  component: RouteComponent,
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
      locale: context.locale, // Provide locale to component for client-side formatting,
      isConnected: context.session?.user.role === 'admin',
    };
  },
});

function RouteComponent() {
  const { formatted, timeZone, dbStatus, locale, isConnected } = Route.useLoaderData();

  return (
    <>
      {isConnected && (
        <>
          <Header isConnected={isConnected} />
          <main role="main">
            <AdminDashboard formatted={formatted} timeZone={timeZone} dbStatus={dbStatus} locale={locale} />
          </main>
        </>
      )}
      {!isConnected && <ErrorComponent type={ErrorType.UnAuthorize} />}
    </>
  );
}
