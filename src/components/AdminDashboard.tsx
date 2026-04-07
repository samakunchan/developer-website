import { useNavigate } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { DbStatus } from '../core/server-functions/db-health-check';
import { signOutAction } from '../features/auth/utils/auth-actions.functions';
import { Button } from './Button';
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

  const signOut = useServerFn(signOutAction);
  const navigate = useNavigate();

  const handleLogout = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const result: { success: boolean } = await signOut();

      if (result?.success) {
        // After successful signin, redirect to the dashboard or the requested page
        navigate({ to: '/' });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      alert('Logout failed. Please try again.');
    }
  };
  return (
    <>
      <section className="about">
        <Container>
          <h1>Hello "/admin/dashboard"!</h1>
          <div>
            <Button onClick={handleLogout}>Logout</Button>
          </div>
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
                  backgroundColor: dbStatus.status === 'online' ? '#48bb78' : '#f56565',
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

            {dbStatus.error && <p style={{ color: '#c53030', marginTop: '0.5rem' }}>Error: {dbStatus.error}</p>}

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
      </section>
    </>
  );
}
