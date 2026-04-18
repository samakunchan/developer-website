import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import {
  getProfileAction,
  updatePersonalInfoAction,
  PersonalInfoForm,
  VisualIdentity,
  PersonalInfoInput,
} from '../features/profiles';

export const Route = createFileRoute('/admin/profiles/personal-info')({
  component: ProfilesComponent,
});

function ProfilesComponent() {
  const queryClient = useQueryClient();

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileAction(),
  });

  const { mutate: updateProfile, isPending: isUpdating } = useMutation({
    mutationFn: (data: PersonalInfoInput) => updatePersonalInfoAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      alert('Profile updated successfully!');
    },
    onError: (error) => {
      console.error('Failed to update profile:', error);
      alert('Error updating profile');
    },
  });

  if (isLoading || !profile) {
    return (
      <div className="admin-profiles">
        <header className="admin-profiles__header">
          <div>
            <span className="admin-profiles__header-label">Account Customization</span>
            <h1 className="admin-profiles__header-title">Personal Info</h1>
          </div>
        </header>
        <div className="admin-profiles__loading">
          <span className="material-symbols-outlined spin">sync</span>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  const handlePersonalInfoSubmit = (data: PersonalInfoInput) => {
    updateProfile(data);
  };

  return (
    <>
      <div className="admin-profiles__padding-bottom-large">
        <header className="admin-profiles__header">
          <div>
            <span className="admin-profiles__header-label">Account Customization</span>
            <h1 className="admin-profiles__header-title">Personal Info</h1>
          </div>
        </header>

        <div className="admin-profiles__grid">
          {/* Left Column: Visual Identity & Tech Stack */}

          <div className="admin-profiles__left-col">
            <VisualIdentity avatar={profile.image?.raw} coverImage={profile.personalInfo?.coverImage} />
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
                image: profile.image ?? {
                  raw: '',
                  tiny: '',
                  medium: '',
                },
              }}
              onSubmit={handlePersonalInfoSubmit}
              isSaving={isUpdating}
            />
          </div>
        </div>
      </div>
    </>
  );
}
