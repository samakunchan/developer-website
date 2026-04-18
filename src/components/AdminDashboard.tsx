import { DbStatus } from '../features/database/utils/schemas';
import { Container } from './Container';

export function AdminDashboard({
  formatted,
  timeZone,
  dbStatus,
  locale,
}: {
  formatted: string;
  timeZone: string;
  dbStatus: DbStatus;
  locale: string;
}) {
  const formatter: Intl.DateTimeFormat = new Intl.DateTimeFormat(locale, {
    dateStyle: 'full',
    timeStyle: 'long',
    timeZone: 'UTC',
  });

  const dbTime: string | null = dbStatus.details?.now ? formatter.format(new Date(dbStatus.details.now)) : null;

  return (
    <>
      <section className="about">
        <Container>
          <h1>Hello "/admin/dashboard"!</h1>

          <div>
            <p>Date locale: {formatted}</p>
            {dbTime && <p>DB status date: {dbTime}</p>}

            <small>Timezone: {timeZone}</small>
          </div>

          <section>
            <h2>Database Status</h2>
            <div className="admin-dashboard__status-container">
              <div
                className={`admin-dashboard__status-indicator admin-dashboard__status-indicator--${dbStatus.status === 'online' ? 'online' : 'offline'}`}
              />
              <strong
                className={`admin-dashboard__status-text admin-dashboard__status-text--${dbStatus.status === 'online' ? 'online' : 'offline'}`}
              >
                {dbStatus.status.toUpperCase()}
              </strong>
            </div>

            {dbStatus.error && <p className="admin-dashboard__error">Error: {dbStatus.error}</p>}

            {dbStatus.details && (
              <pre className="admin-dashboard__details">{JSON.stringify(dbStatus.details, null, 2)}</pre>
            )}
          </section>
        </Container>
      </section>
    </>
  );
}
