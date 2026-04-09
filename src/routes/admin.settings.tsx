import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AdminSidebarSecondary } from '../components/AdminSidebarSecondary';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsComponent,
});

function SettingsComponent() {
  const settingsLinks = [
    { label: 'Themes', to: '/admin/settings/themes' },
    { label: 'RGPD', to: '/admin/settings/rgpd' },
    { label: 'Privacy Policy', to: '/admin/settings/privacy' },
  ];

  return (
    <div className="admin-page--with-sidebar">
      <AdminSidebarSecondary title="Site Settings" links={settingsLinks} />
      <div className="admin-page__content">
        <Outlet />
      </div>
    </div>
  );
}
