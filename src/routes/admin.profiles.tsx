import { createFileRoute } from '@tanstack/react-router';
import { Container } from '../components/Container';

export const Route = createFileRoute('/admin/profiles')({
  component: ProfilesComponent,
});

function ProfilesComponent() {
  return (
    <Container>
      <section className="admin-page">
        <h1>Admin Profiles</h1>
        <p>Manage your user profiles and account details here.</p>
        <div
          style={{
            padding: '2rem',
            border: '2px dashed var(--color-glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            marginTop: '2rem',
          }}
        >
          <p style={{ textAlign: 'center', color: 'var(--color-slate-400)' }}>
            Profiles management interface coming soon...
          </p>
        </div>
      </section>
    </Container>
  );
}
