import { createFileRoute } from '@tanstack/react-router';
import {
  getServerTime,
  TimeServerOutput,
} from '../core/server-functions/time-server';
import { getBrowserTimeZone, getGuessTimeZone } from '../core/utils/timezone';
import { Container } from '../components/Container';
import {
  checkDatabaseStatus,
  DbStatus,
} from '../core/server-functions/db-health-check';

export const Route = createFileRoute('/admin/dashboard')({
  component: RouteComponent,
  loader: async ({
    context,
  }): Promise<TimeServerOutput & { dbStatus: DbStatus; locale: string }> => {
    const detectedTz: string = getBrowserTimeZone();
    const timeZone: string =
      detectedTz !== 'UTC' ? detectedTz : getGuessTimeZone(context.locale);

    const dbStatus: DbStatus = await checkDatabaseStatus();
    const time: TimeServerOutput = await getServerTime({
      data: { timeZone },
    });

    return {
      ...time,
      dbStatus,
      locale: context.locale, // Provide locale to component for client-side formatting
    };
  },
});

function RouteComponent() {
  const { formatted, timeZone, dbStatus, locale } = Route.useLoaderData();

  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'UTC',
  });

  const dbTime: string | null = dbStatus.details?.now
    ? formatter.format(new Date(dbStatus.details.now))
    : null;

  return (
    <>
      <main role="main">
        <Container>
          <h1>Hello "/admin/dashboard"!</h1>
          <div>
            <p>Date locale: {formatted}</p>
            {dbTime && <p>DB status date: {dbTime}</p>}

            <small>Timezone: {timeZone}</small>
          </div>

          <section>
            <h2>Database Status</h2>
            <div>
              <div
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  backgroundColor:
                    dbStatus.status === 'online' ? '#48bb78' : '#f56565',
                }}
              />
              <strong
                style={{
                  color: dbStatus.status === 'online' ? '#2f855a' : '#c53030',
                }}
              >
                {dbStatus.status.toUpperCase()}
              </strong>
            </div>

            {dbStatus.error && (
              <p style={{ color: '#c53030', marginTop: '0.5rem' }}>
                Error: {dbStatus.error}
              </p>
            )}

            {dbStatus.details && (
              <pre
                style={{
                  marginTop: '1rem',
                  fontSize: '0.875rem',
                  backgroundColor: 'rgba(0,0,0,0.05)',
                  padding: '0.5rem',
                  borderRadius: '4px',
                }}
              >
                {JSON.stringify(dbStatus.details, null, 2)}
              </pre>
            )}
          </section>
        </Container>
      </main>
    </>
  );
}
