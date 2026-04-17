import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RichTextEditor, getPrivacyPolicy, savePrivacyPolicy } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/privacy')({
  component: PrivacyComponent,
});

function PrivacyComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'privacy-policy'],
    queryFn: () => getPrivacyPolicy(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => savePrivacyPolicy({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rich-text', 'privacy-policy'] });
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
        <h1>Privacy Policy</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's privacy policy and data collection disclosures.
        </p>

        <RichTextEditor
          title={data?.title || 'Privacy Policy'}
          initialContent={data?.content as string}
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
      </div>
    </div>
  );
}
