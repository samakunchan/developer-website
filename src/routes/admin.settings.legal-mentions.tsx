import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RichTextEditor, getLegalMentions, saveLegalMentions } from '../features/rich-text';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

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
        <h1>
          <Trans>Mentions légales</Trans>
        </h1>
        <p className="admin-profiles__header-desc">
          Gérer les informations légales de votre site Web et l'avis de protection des données.
        </p>

        <RichTextEditor
          title={data?.title || t`Legal Mentions`}
          initialContent={data?.content as string}
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
      </div>
    </div>
  );
}
