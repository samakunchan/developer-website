import { createFileRoute, redirect } from '@tanstack/react-router';
import { getServerTime, TimeServerOutput } from '../core/server-functions/time-server';
import { getBrowserTimeZone, getGuessTimeZone } from '../core/utils/timezone';
import { checkDatabaseStatus, DbStatus } from '../core/server-functions/db-health-check';
import { AdminDashboard } from '../components/AdminDashboard';
import { AdminSidebar } from '../components/AdminSidebar';
import { AdminToolbar } from '../components/AdminToolbar';
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
        <div className="admin-layout">
          <AdminSidebar />
          <div className="admin-layout__main">
            <AdminToolbar />
            <main className="admin-layout__content" role="main">
              <AdminDashboard formatted={formatted} timeZone={timeZone} dbStatus={dbStatus} locale={locale} />
            </main>
          </div>
        </div>
      )}
      {!isConnected && <ErrorComponent type={ErrorType.UnAuthorize} />}
    </>
  );
}
