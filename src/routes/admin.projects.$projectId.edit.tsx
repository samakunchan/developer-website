import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { useQuery } from '@tanstack/react-query';
import { ProjectEditForm, getProjectById } from '../features/projects';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

export const Route = createFileRoute('/admin/projects/$projectId/edit')({
  component: EditProjectComponent,
});

function EditProjectComponent() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();

  const { data: project, isLoading } = useQuery({
    queryKey: ['projects', projectId],
    queryFn: () => getProjectById({ data: parseInt(projectId) }),
  });

  const handleSubmit = async () => {
    navigate({ to: '/admin/projects' });
  };

  const handleCancel = () => {
    navigate({ to: '/admin/projects' });
  };

  if (isLoading) {
    return (
      <div>
        <Trans>Loading project...</Trans>
      </div>
    );
  }

  if (!project) {
    return (
      <div>
        <Trans>Project not found</Trans>
      </div>
    );
  }

  return (
    <div className="admin-projects">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Gestion des projets</span>
          <h1 className="admin-profiles__header-title">{t`Edit Project`}</h1>
        </div>
        <button className="btn btn--outline" onClick={handleCancel}>
          <span className="material-symbols-outlined admin-profiles__icon-left">arrow_back</span>
          <Trans>Back to list</Trans>
        </button>
      </header>
      <div className="admin-profiles__section-spacing">
        <ProjectEditForm initialData={project} onSuccess={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
