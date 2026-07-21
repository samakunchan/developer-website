import { createFileRoute, Outlet } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { AdminSidebarSecondary } from '../components/AdminSidebarSecondary';
import { RouteNameType } from '../core/types/routes-name';

export const Route = createFileRoute('/admin/settings')({
  component: SettingsComponent,
});

function SettingsComponent() {
  const settingsLinks = [
    { label: t`Themes`, to: RouteNameType.AdminThemes.toString() },
    { label: t`Legal Mentions`, to: RouteNameType.AdminLegalMentions.toString() },
    { label: t`CGU`, to: RouteNameType.AdminCGU.toString() },
    { label: t`Privacy Policy`, to: RouteNameType.AdminPrivacyPolicy.toString() },
    { label: t`Cookie Policy`, to: RouteNameType.AdminCookiePolicy.toString() },
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
