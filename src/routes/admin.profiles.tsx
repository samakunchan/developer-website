import { createFileRoute, Outlet } from '@tanstack/react-router';
import { AdminSidebarSecondary } from '../components/AdminSidebarSecondary';

export const Route = createFileRoute('/admin/profiles')({
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const profileLinks = [
    { label: 'Profile Overview', to: '/admin/profiles/overview' },
    { label: 'Personals Informations', to: '/admin/profiles/personal-info' },
    { label: 'Technical Stacks', to: '/admin/profiles/tech-stacks' },
    { label: 'Social Links', to: '/admin/profiles/social-links' },
  ];

  return (
    <>
      <div className="admin-page--with-sidebar">
        <AdminSidebarSecondary title="Profiles Options" links={profileLinks} />
        <div className="admin-page__content">
          <Outlet />
        </div>
      </div>
    </>
  );
}
