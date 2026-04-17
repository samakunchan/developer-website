import { createFileRoute, useRouter, Link } from '@tanstack/react-router';
import { getProjects, toggleProjectFeatured, deleteProject, ProjectType, ProjectAdminCard } from '../features/projects';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

export const Route = createFileRoute('/admin/projects/')({
  loader: async () => {
    return await getProjects();
  },
  component: ProjectsListComponent,
});

function ProjectsListComponent() {
  const projects: ProjectType[] = Route.useLoaderData();
  const router = useRouter();

  const handleToggleFeatured = async (id: number) => {
    try {
      await toggleProjectFeatured({ data: id });
      router.invalidate();
    } catch (error) {
      console.error('Failed to toggle featured status:', error);
    }
  };

  const handleDelete = async (id: number) => {
    if (confirm(t`Are you sure you want to delete this project?`)) {
      try {
        await deleteProject({ data: id });
        router.invalidate();
      } catch (error) {
        console.error('Failed to delete project:', error);
      }
    }
  };

  return (
    <div className="admin-projects">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Portfolio Management</span>
          <h1 className="admin-profiles__header-title">Projects</h1>
        </div>
        <Link to="/admin/projects/new" className="btn btn--primary">
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            add
          </span>
          <Trans>Add Project</Trans>
        </Link>
      </header>

      <div className="admin-profiles__content">
        {projects.length === 0 ? (
          <div className="admin-profiles__empty-state">
            <span className="material-symbols-outlined" style={{ fontSize: '3rem', color: 'var(--color-slate-300)' }}>
              folder_open
            </span>
            <p>
              <Trans>No projects found. Add your first project to showcase your work.</Trans>
            </p>
          </div>
        ) : (
          projects.map((project) => (
            <ProjectAdminCard
              key={project.id}
              project={project}
              onToggleFeatured={handleToggleFeatured}
              onDelete={handleDelete}
            />
          ))
        )}
      </div>
    </div>
  );
}
