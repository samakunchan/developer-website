import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { RichTextEditor, getCookiePolicy, saveCookiePolicy } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/cookie-policy')({
  loader: async () => await getCookiePolicy(),
  component: CookiePolicyComponent,
});

function CookiePolicyComponent() {
  const data = Route.useLoaderData();
  const save = useServerFn(saveCookiePolicy);
  const router = useRouter();

  const handleSave = async (title: string, content: string) => {
    await save({ data: { title, content } });
    router.invalidate();
  };

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>Cookie Policy</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's cookie usage and tracking policies.
        </p>

        <RichTextEditor
          title={data?.title || 'Cookie Policy'}
          initialContent={data?.content as string}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
