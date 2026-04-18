import { createFileRoute } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { RichTextEditor, getCookiePolicy, saveCookiePolicy } from '../features/rich-text';

export const Route = createFileRoute('/admin/settings/cookie-policy')({
  component: CookiePolicyComponent,
});

function CookiePolicyComponent() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['rich-text', 'cookie-policy'],
    queryFn: () => getCookiePolicy(),
  });

  const saveMutation = useMutation({
    mutationFn: (data: { title: string; content: string }) => saveCookiePolicy({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['rich-text', 'cookie-policy'] });
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
        <h1>Cookie Policy</h1>
        <p className="admin-profiles__header-desc">Manage your website's cookie usage and tracking policies.</p>

        <RichTextEditor
          title={data?.title || 'Cookie Policy'}
          initialContent={data?.content as string}
          onSave={handleSave}
          isSaving={saveMutation.isPending}
        />
      </div>
    </div>
  );
}
