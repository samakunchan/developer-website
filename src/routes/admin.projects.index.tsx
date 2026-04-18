import { createFileRoute, Link } from '@tanstack/react-router';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProjects, toggleProjectFeatured, deleteProject, ProjectType, ProjectAdminCard } from '../features/projects';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

export const Route = createFileRoute('/admin/projects/')({
  component: ProjectsListComponent,
});

function ProjectsListComponent() {
  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery<ProjectType[]>({
    queryKey: ['projects'],
    queryFn: () => getProjects(),
  });

  const toggleMutation = useMutation({
    mutationFn: toggleProjectFeatured,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Failed to toggle featured status:', error);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProject,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (error) => {
      console.error('Failed to delete project:', error);
    },
  });

  const handleToggleFeatured = (id: number) => {
    toggleMutation.mutate({ data: id });
  };

  const handleDelete = (id: number) => {
    if (confirm(t`Are you sure you want to delete this project?`)) {
      deleteMutation.mutate({ data: id });
    }
  };

  if (isLoading) {
    return (
      <div>
        <Trans>Loading projects...</Trans>
      </div>
    );
  }

  return (
    <div className="admin-projects">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Portfolio Management</span>
          <h1 className="admin-profiles__header-title">Projects</h1>
        </div>
        <Link to="/admin/projects/new" className="btn btn--primary">
          <span className="material-symbols-outlined admin-profiles__icon-left">add</span>
          <Trans>Add Project</Trans>
        </Link>
      </header>

      <div className="admin-profiles__content">
        {projects.length === 0 ? (
          <div className="admin-profiles__empty-state">
            <span className="material-symbols-outlined admin-profiles__empty-state-icon">folder_open</span>
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
