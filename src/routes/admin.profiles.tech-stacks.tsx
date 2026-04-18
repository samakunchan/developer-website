import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';
import {
  getProfileAction,
  addTechStackAction,
  removeTechStackAction,
  TechStackManager,
  CategoryStackType,
  TechStackItem,
} from '../features/profiles';

export const Route = createFileRoute('/admin/profiles/tech-stacks')({
  component: TechStacksComponent,
});

function TechStacksComponent() {
  const queryClient = useQueryClient();
  const [removingId, setRemovingId] = useState<number | null>(null);

  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: () => getProfileAction(),
  });

  const { mutate: addTechStack, isPending: isAdding } = useMutation({
    mutationFn: (data: { name: string; category: CategoryStackType }) => addTechStackAction({ data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error) => {
      console.error('Failed to add tech stack:', error);
      alert('Error adding tech stack');
    },
  });

  const { mutate: removeTechStack } = useMutation({
    mutationFn: (id: number) => removeTechStackAction({ data: { id } }),
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
      console.error('Failed to remove tech stack:', error);
      alert('Error removing tech stack');
    },
  });

  if (isLoading || !profile) {
    return (
      <div className="admin-profiles">
        <header className="admin-profiles__header">
          <div>
            <span className="admin-profiles__header-label">Account Customization</span>
            <h1 className="admin-profiles__header-title">Technical Stacks</h1>
          </div>
        </header>
        <div className="admin-profiles__loading">
          <span className="material-symbols-outlined spin">sync</span>
          <p>Loading profile data...</p>
        </div>
      </div>
    );
  }

  const handleAddTechStack = (name: string, category: CategoryStackType) => {
    addTechStack({ name, category });
  };

  const handleRemoveTechStack = (id: number) => {
    removeTechStack(id);
  };

  return (
    <div className="admin-profiles__padding-bottom-large">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Account Customization</span>
          <h1 className="admin-profiles__header-title">Technical Stacks</h1>
        </div>
      </header>

      <div className="admin-profiles__section-spacing">
        <TechStackManager
          stacks={(profile.techStacks as TechStackItem[]) || []}
          onAdd={handleAddTechStack}
          onRemove={handleRemoveTechStack}
          isAdding={isAdding}
          removingId={removingId}
        />
      </div>
    </div>
  );
}
