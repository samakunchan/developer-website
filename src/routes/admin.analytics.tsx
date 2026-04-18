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
        <div className="admin-page__placeholder">
          <p>Analytics visualization coming soon...</p>
        </div>
      </section>
    </Container>
  );
}
