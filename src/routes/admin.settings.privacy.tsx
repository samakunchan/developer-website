import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/settings/privacy')({
  component: PrivacyComponent,
});

function PrivacyComponent() {
  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>Privacy Policy</h1>
        <p>Edit and manage the site's privacy policy content.</p>
        <div
          style={{
            padding: '2rem',
            border: '2px dashed var(--color-glass-border)',
            borderRadius: 'var(--border-radius-lg)',
            marginTop: '2rem',
          }}
        >
          <p style={{ textAlign: 'center', color: 'var(--color-slate-400)' }}>Privacy policy editor coming soon...</p>
        </div>
      </div>
    </div>
  );
}
