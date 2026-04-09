import { createFileRoute, useRouter } from '@tanstack/react-router';
import { useServerFn } from '@tanstack/react-start';
import { RichTextEditor } from '../features/rich-text/components/RichTextEditor';
import { getCGU, saveCGU } from '../features/rich-text/utils/rich-text-actions.functions';

export const Route = createFileRoute('/admin/settings/cgu')({
  loader: async () => await getCGU(),
  component: CGUComponent,
});

function CGUComponent() {
  const data = Route.useLoaderData();
  const save = useServerFn(saveCGU);
  const router = useRouter();

  const handleSave = async (title: string, content: string) => {
    await save({ data: { title, content } });
    router.invalidate();
  };

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>CGU</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's Terms and Conditions (Conditions Générales d'Utilisation).
        </p>

        <RichTextEditor title={data?.title || 'CGU'} initialContent={data?.content as string} onSave={handleSave} />
      </div>
    </div>
  );
}
