import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/settings/rgpd')({
  component: RgpdComponent,
});

function RgpdComponent() {
  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>RGPD Compliance</h1>
        <p>Manage data protection and user privacy settings.</p>
        <div
          style={{
            padding: '2rem',
            border: '2px dashed var(--color-glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            marginTop: '2rem',
          }}
        >
          <p style={{ textAlign: 'center', color: 'var(--color-slate-400)' }}>RGPD controls coming soon...</p>
        </div>
      </div>
    </div>
  );
}
