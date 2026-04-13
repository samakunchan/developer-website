import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { RichTextEditor, getLegalMentions, saveLegalMentions } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/legal-mentions')({
  loader: async () => await getLegalMentions(),
  component: LegalMentionsComponent,
});

function LegalMentionsComponent() {
  const data = Route.useLoaderData();
  const save = useServerFn(saveLegalMentions);
  const router = useRouter();

  const handleSave = async (title: string, content: string) => {
    await save({ data: { title, content } });
    router.invalidate();
  };

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>Legal Mentions</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's legal information and data protection notice.
        </p>

        <RichTextEditor
          title={data?.title || 'Legal Mentions'}
          initialContent={data?.content as string}
          onSave={handleSave}
        />
      </div>
    </div>
  );
}
