import { createFileRoute, Outlet } from '@tanstack/react-router';
import { t } from '@lingui/core/macro';
import { AdminSidebarSecondary } from '../components/AdminSidebarSecondary';

export const Route = createFileRoute('/admin/profiles')({
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const profileLinks = [
    { label: t`Profile Overview`, to: '/admin/profiles/overview' },
    { label: t`Personals Informations`, to: '/admin/profiles/personal-info' },
    { label: t`Technical Stacks`, to: '/admin/profiles/tech-stacks' },
    { label: t`Social Links`, to: '/admin/profiles/social-links' },
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
