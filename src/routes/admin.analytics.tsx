import { createFileRoute } from '@tanstack/react-router';
import { Container } from '../components/Container';

export const Route = createFileRoute('/admin/analytics')({
  component: AnalyticsComponent,
});

function AnalyticsComponent() {
  return (
    <Container>
      <section className="admin-page">
        <h1>Admin Analytics</h1>
        <p>Detailed performance metrics and user engagement data.</p>
        <div
          style={{
            padding: '2rem',
            border: '2px dashed var(--color-glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            marginTop: '2rem',
          }}
        >
          <p style={{ textAlign: 'center', color: 'var(--color-slate-400)' }}>Analytics visualization coming soon...</p>
        </div>
      </section>
    </Container>
  );
}
