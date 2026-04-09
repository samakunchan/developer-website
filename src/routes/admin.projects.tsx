import { createFileRoute } from '@tanstack/react-router';
import { Container } from '../components/Container';

export const Route = createFileRoute('/admin/projects')({
  component: ProjectsComponent,
});

function ProjectsComponent() {
  return (
    <Container>
      <section className="admin-page">
        <h1>Admin Projects</h1>
        <p>View and manage all your portfolio projects from this dashboard.</p>
        <div
          style={{
            padding: '2rem',
            border: '2px dashed var(--color-glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            marginTop: '2rem',
          }}
        >
          <p style={{ textAlign: 'center', color: 'var(--color-slate-400)' }}>
            Projects management interface coming soon...
          </p>
        </div>
      </section>
    </Container>
  );
}
