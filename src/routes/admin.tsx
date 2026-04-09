import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AdminSidebarPrimary } from '../components/AdminSidebarPrimary';
import { AdminToolbar } from '../components/AdminToolbar';

export const Route = createFileRoute('/admin')({
  beforeLoad: async ({ context }) => {
    if (!context.session || context.session.user.role !== 'admin') {
      throw redirect({
        to: '/login',
        search: {
          redirectTo: '/admin/dashboard',
        },
      });
    }
  },
  component: AdminLayout,
});

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebarPrimary />
      <div className="admin-layout__main">
        <AdminToolbar />
        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
