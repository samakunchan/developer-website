import { createFileRoute, Outlet } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { AdminSidebarSecondary } from '../components/AdminSidebarSecondary';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsComponent,
});

function SettingsComponent() {
  const settingsLinks = [
    { label: t`Themes`, to: '/admin/settings/themes' },
    { label: t`Legal Mentions`, to: '/admin/settings/legal-mentions' },
    { label: t`CGU`, to: '/admin/settings/cgu' },
    { label: t`Privacy Policy`, to: '/admin/settings/privacy' },
    { label: t`Cookie Policy`, to: '/admin/settings/cookie-policy' },
  ];

  return (
    <div className="admin-page--with-sidebar">
      <AdminSidebarSecondary title={t`Site Settings`} links={settingsLinks} />
      <div className="admin-page__content">
        <Outlet />
      </div>
    </div>
  );
}
