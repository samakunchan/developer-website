import { createFileRoute } from '@tanstack/react-router';
import { getProfileAction } from '../features/profiles';
import {
  BioCard,
  TechStackBento,
  PortfolioSummaryCard,
  ProfileAvatarCard,
  PersonalDetailsCard,
  SocialLinksCard,
} from '../features/profiles';
import { SocialLinkItem } from '../features/profiles/components/form/SocialLinksManager';

export const Route = createFileRoute('/admin/profiles/overview')({
  loader: async () => {
    return await getProfileAction();
  },
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const profile = Route.useLoaderData();

  return (
    <div className="admin-profiles">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Profile Overview</span>
          <h1 className="admin-profiles__header-title">{profile.name}</h1>
        </div>
      </header>

      <div className="overview-grid">
        {/* Left Column */}
        <div className="overview-col-main">
          <BioCard
            title={profile.personalInfo?.professionalTitle || 'Software Architect'}
            bio={profile.personalInfo?.bio || 'No bio available yet. You can add one in the Personal Info section.'}
          />

          <TechStackBento stacks={profile.techStacks || []} />

          <PortfolioSummaryCard />
        </div>

        {/* Right Column */}
        <div className="overview-col-side">
          <ProfileAvatarCard
            name={profile.name || 'Developer'}
            title={profile.personalInfo?.professionalTitle || 'Senior Developer'}
            image={profile.image}
          />

          <PersonalDetailsCard
            email={profile.email}
            experience={profile.personalInfo?.experience}
            focus={profile.personalInfo?.focus}
            languages={profile.personalInfo?.languages}
          />

          <SocialLinksCard links={(profile.socialLinks as SocialLinkItem[]) || []} />

          {/* <QuickSettingsCard /> */}
        </div>
      </div>
    </div>
  );
}
