import { createFileRoute, Outlet } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { AdminSidebarSecondary } from '../components/AdminSidebarSecondary';
import { RouteNameType } from '../core/types/routes-name';

export const Route = createFileRoute('/admin/profiles')({
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const profileLinks = [
    { label: t`Profile Overview`, to: RouteNameType.AdminProfileOverview.toString() },
    { label: t`Personals Informations`, to: RouteNameType.AdminProfilePersonalInfo.toString() },
    { label: t`Technical Stacks`, to: RouteNameType.AdminProfileTechStacks.toString() },
    { label: t`Social Links`, to: RouteNameType.AdminProfileSocialLinks.toString() },
  ];

  return (
    <>
      <div className="admin-page--with-sidebar">
        <AdminSidebarSecondary title={t`Profiles Options`} links={profileLinks} />
        <div className="admin-page__content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
