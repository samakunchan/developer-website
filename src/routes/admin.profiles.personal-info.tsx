import { createFileRoute, useRouter } from '@tanstack/react-router';
import { getProfileAction, updatePersonalInfoAction, PersonalInfoForm, VisualIdentity } from '../features/profiles';
import { PersonalInfoInput } from '../features/profiles/utils/schemas';

export const Route = createFileRoute('/admin/profiles/personal-info')({
  loader: async () => {
    return await getProfileAction();
  },
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const profile = Route.useLoaderData();
  const router = useRouter();

  const handlePersonalInfoSubmit = async (data: PersonalInfoInput) => {
    try {
      await updatePersonalInfoAction({ data });
      alert('Profile updated successfully!');
      router.invalidate();
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('Error updating profile');
    }
  };

  return (
    <>
      <div style={{ paddingBottom: '4rem' }}>
        <header className="admin-profiles__header">
          <div>
            <span className="admin-profiles__header-label">Account Customization</span>
            <h1 className="admin-profiles__header-title">Personal Info</h1>
          </div>
        </header>

        <div className="admin-profiles__grid">
          {/* Left Column: Visual Identity & Tech Stack */}

          <div className="admin-profiles__left-col">
            <VisualIdentity avatar={profile.image} coverImage={profile.personalInfo?.coverImage} />
          </div>
          {/* Right Column: Form Details */}
          <div className="admin-profiles__right-col">
            <PersonalInfoForm
              initialData={{
                fullName: profile.name || '',
                email: profile.email,
                professionalTitle: profile.personalInfo?.professionalTitle || '',
                bio: profile.personalInfo?.bio || '',
                experience: profile.personalInfo?.experience || 0,
                focus: profile.personalInfo?.focus || 'Web Performance',
                languages: profile.personalInfo?.languages || '',
                image: profile.image || '',
                coverImage: profile.personalInfo?.coverImage || '',
              }}
              onSubmit={handlePersonalInfoSubmit}
            />
          </div>
        </div>
      </div>
    </>
  );
}
