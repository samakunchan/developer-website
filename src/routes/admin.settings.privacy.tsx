import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RichTextEditor, getPrivacyPolicy, savePrivacyPolicy } from '../features/rich-text';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

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
        <h1>
          <Trans>Privacy Policy</Trans>
        </h1>
        <p className="admin-profiles__header-desc">
          Gérer la politique de confidentialité de votre site et la collecte des données.
        </p>

        <RichTextEditor
          title={data?.title || t`Privacy Policy`}
          initialContent={data?.content as string}
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
      </div>
    </div>
  );
}
