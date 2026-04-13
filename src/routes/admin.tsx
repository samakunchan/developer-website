import { createFileRoute, Outlet, redirect } from '@tanstack/react-router';
import { AdminSidebarPrimary } from '../components/AdminSidebarPrimary';
import { AdminToolbar } from '../components/AdminToolbar';
import { getProfileAction } from '../features/profiles';

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
  loader: async () => {
    return await getProfileAction();
  },
  component: AdminLayout,
});

function AdminLayout() {
  const profile = Route.useLoaderData();
  console.log(profile.image);

  return (
    <div className="admin-layout">
      <AdminSidebarPrimary />
      <div className="admin-layout__main">
        <AdminToolbar
          tinyImage={
            profile.image
              ? profile.image?.tiny
              : 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnxUSu47Vp-I9wnl33B443FbAlIF2hD2MheN_Z1XDSoyDj58l77URcdOJIA1T2_P3lH4g2E8Bjm7UZV0KsbrFeO4aRsSWYaYG8EZc8aHifiGl0_sbzhrvAP0n4qy9CAUOgH_a_MovstDCo152Lw-eSpxwfVIJPVDHWIkoMFC-k9XVM4Iqcj6K8vK0K79NMEQqZkG_pRWWypmBrfTz3MszI2vyrj2xyCo_aXPGN6qMgK_auaUGKtjVIY4A9SSEjg5r6jJG9PA6z4-E'
          }
        />
        <main className="admin-layout__content">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
