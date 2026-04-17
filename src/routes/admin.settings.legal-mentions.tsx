import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RichTextEditor, getLegalMentions, saveLegalMentions } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/legal-mentions')({
  component: LegalMentionsComponent,
});

function LegalMentionsComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'legal-mentions'],
    queryFn: () => getLegalMentions(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => saveLegalMentions({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rich-text', 'legal-mentions'] });
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
        <h1>Legal Mentions</h1>
        <p style={{ marginBottom: '2rem', color: 'var(--color-slate-400)' }}>
          Manage your website's legal information and data protection notice.
        </p>

        <RichTextEditor
          title={data?.title || 'Legal Mentions'}
          initialContent={data?.content as string}
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
      </div>
    </div>
  );
}
