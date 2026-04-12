import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { RichTextEditor, getPrivacyPolicy, savePrivacyPolicy } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/privacy')({
  loader: async () => await getPrivacyPolicy(),
  component: PrivacyComponent,
});

function PrivacyComponent() {
  const data = Route.useLoaderData();
  const save = useServerFn(savePrivacyPolicy);
  const router = useRouter();

  const handleSave = async (title: string, content: string) => {
    await save({ data: { title, content } });
    router.invalidate();
  };

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>Privacy Policy</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's privacy policy and data collection disclosures.
        </p>

        <RichTextEditor
          title={data?.title || 'Privacy Policy'}
          initialContent={data?.content as string}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
