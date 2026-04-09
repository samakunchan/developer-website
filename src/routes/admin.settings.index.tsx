import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/settings/')({
  component: SettingsIndexComponent,
});

function SettingsIndexComponent() {
  return (
    <div className="admin-settings-index">
      <h1>Admin Settings Overview</h1>
      <p>Select a category from the sidebar to manage specific settings and preferences for your application.</p>
      <div
        style={{
          padding: '2rem',
          border: '2px dashed var(--color-glass-border)',
          borderRadius: 'var(--border-radius-lg)',
          marginTop: '2rem',
        }}
      >
        <p style={{ textAlign: 'center', color: 'var(--color-slate-400)' }}>
          Quick settings and overview widgets will appear here.
        </p>
      </div>
    </div>
  );
}
