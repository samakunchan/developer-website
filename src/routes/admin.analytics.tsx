import { createFileRoute } from '@tanstack/react-router';
import { Container } from '../components/Container';

export const Route = createFileRoute('/admin/analytics')({
  component: AnalyticsComponent,
});

function AnalyticsComponent() {
  return (
    <Container>
      <section className="admin-page">
        <h1>Statistiques</h1>
        <p>Données de performance détaillées et données d'engagement utilisateur.</p>
        <div className="admin-page__placeholder">
          <p>Les visualisations statistiques seront bientôt disponibles...</p>
        </div>
      </section>
    </Container>
  );
}
