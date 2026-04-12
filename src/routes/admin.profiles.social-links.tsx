import { createFileRoute, useRouter } from '@tanstack/react-router';
import {
  getProfileAction,
  addSocialLinkAction,
  removeSocialLinkAction,
  SocialLinksManager,
  SocialLinkInput,
  SocialLinkItem,
} from '../features/profiles';

export const Route = createFileRoute('/admin/profiles/social-links')({
  loader: async () => {
    return await getProfileAction();
  },
  component: SocialLinksComponent,
});

function SocialLinksComponent() {
  const profile = Route.useLoaderData();
  const router = useRouter();

  const handleAddSocialLink = async (data: SocialLinkInput) => {
    try {
      await addSocialLinkAction({ data });
      router.invalidate();
    } catch (error) {
      console.error('Failed to add social link:', error);
      alert('Error adding social link');
    }
  };

  const handleRemoveSocialLink = async (id: number) => {
    try {
      await removeSocialLinkAction({ data: { id } });
      router.invalidate();
    } catch (error) {
      console.error('Failed to remove social link:', error);
      alert('Error removing social link');
    }
  };

  // Safe cast since we trust the database output matches the component prop type
  const socialLinks = (profile.socialLinks as SocialLinkItem[]) || [];

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Account Customization</span>
          <h1 className="admin-profiles__header-title">Professional Links</h1>
        </div>
      </header>

      <div style={{ marginTop: '2rem' }}>
        <SocialLinksManager links={socialLinks} onAdd={handleAddSocialLink} onRemove={handleRemoveSocialLink} />
      </div>
    </div>
  );
}
