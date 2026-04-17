import { createFileRoute, Outlet } from '@tanstack/react-router';

export const Route = createFileRoute('/admin/projects')({
  component: AdminProjectsLayout,
});

function AdminProjectsLayout() {
  return (
    <div className="admin-projects-layout">
      <Outlet />
    </div>
  );
}
