import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RichTextEditor, getCGU, saveCGU } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/cgu')({
  component: CGUComponent,
});

function CGUComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'cgu'],
    queryFn: () => getCGU(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => saveCGU({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rich-text', 'cgu'] });
    },
  });

  const handleSave = (title: string, content: string) => {
    saveMutation.mutate({ title, content });
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-page--with-sidebar">
      <div className="admin-page__content">
        <h1>CGU</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's Terms and Conditions (Conditions Générales d'Utilisation).
        </p>

        <RichTextEditor
          title={data?.title || 'CGU'}
          initialContent={data?.content as string}
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
      </div>
    </div>
  );
}
