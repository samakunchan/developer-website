import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  getProfileAction,
  addSocialLinkAction,
  removeSocialLinkAction,
  SocialLinksManager,
  SocialLinkInput,
  SocialLinkItem,
} from '../features/profiles';

export const Route = createFileRoute('/admin/profiles/social-links')({
  component: SocialLinksComponent,
});

function SocialLinksComponent() {
  const queryClient = useQueryClient();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileAction(),
  });

  const { mutate: addSocialLink, isPending: isAdding } = useMutation({
    mutationFn: (data: SocialLinkInput) => addSocialLinkAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Failed to add social link:', error);
      alert('Error adding social link');
    },
  });

  const { mutate: removeSocialLink } = useMutation({
    mutationFn: (id: number) => removeSocialLinkAction({ data: { id } }),
    onMutate: (id) => {
      setRemovingId(id);
    },
    onSettled: () => {
      setRemovingId(null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Failed to remove social link:', error);
      alert('Error removing social link');
    },
  });

  if (isLoading || !profile) {
    return (
      <div className="admin-profiles">
        <header className="admin-profiles__header">
          <div>
            <span className="admin-profiles__header-label">Personnalisation du compte</span>
            <h1 className="admin-profiles__header-title">Liens professionnels</h1>
          </div>
        </header>
        <div className="admin-profiles__loading">
          <span className="material-symbols-outlined spin">sync</span>
          <p>Chargement des données du profil...</p>
        </div>
      </div>
    );
  }

  const handleAddSocialLink = (data: SocialLinkInput) => {
    addSocialLink(data);
  };

  const handleRemoveSocialLink = (id: number) => {
    removeSocialLink(id);
  };

  // Safe cast since we trust the database output matches the component prop type
  const socialLinks = (profile.socialLinks as SocialLinkItem[]) || [];

  return (
    <div className="admin-profiles__padding-bottom-large">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Personnalisation du compte</span>
          <h1 className="admin-profiles__header-title">Liens professionnels</h1>
        </div>
      </header>

      <div className="admin-profiles__section-spacing">
        <SocialLinksManager
          links={socialLinks}
          onAdd={handleAddSocialLink}
          onRemove={handleRemoveSocialLink}
          isAdding={isAdding}
          removingId={removingId}
        />
      </div>
    </div>
  );
}
