import { createFileRoute, useRouter } from '@tanstack/react-router';
import {
  getProfileAction,
  addTechStackAction,
  removeTechStackAction,
  TechStackManager,
  CategoryStackType,
  TechStackItem,
} from '../features/profiles';

export const Route = createFileRoute('/admin/profiles/tech-stacks')({
  loader: async () => {
    return await getProfileAction();
  },
  component: TechStacksComponent,
});

function TechStacksComponent() {
  const profile = Route.useLoaderData();
  const router = useRouter();

  const handleAddTechStack = async (name: string, category: CategoryStackType) => {
    try {
      await addTechStackAction({ data: { name, category } });
      router.invalidate();
    } catch (error) {
      console.error('Failed to add tech stack:', error);
      alert('Error adding tech stack');
    }
  };

  const handleRemoveTechStack = async (id: number) => {
    try {
      await removeTechStackAction({ data: { id } });
      router.invalidate();
    } catch (error) {
      console.error('Failed to remove tech stack:', error);
      alert('Error removing tech stack');
    }
  };

  return (
    <div style={{ paddingBottom: '4rem' }}>
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Account Customization</span>
          <h1 className="admin-profiles__header-title">Technical Stacks</h1>
        </div>
      </header>

      <div style={{ marginTop: '2rem' }}>
        <TechStackManager
          stacks={(profile.techStacks as TechStackItem[]) || []}
          onAdd={handleAddTechStack}
          onRemove={handleRemoveTechStack}
        />
      </div>
    </div>
  );
}
