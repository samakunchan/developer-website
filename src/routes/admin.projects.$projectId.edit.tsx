import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ProjectEditForm, getProjectById } from '../features/projects';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

export const Route = createFileRoute('/admin/projects/$projectId/edit')({
  loader: async ({ params }) => {
    const project = await getProjectById({ data: parseInt(params.projectId) });
    if (!project) throw new Error('Project not found');
    return project;
  },
  component: EditProjectComponent,
});

function EditProjectComponent() {
  const project = Route.useLoaderData();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate({ to: '/admin/projects' });
  };

  const handleCancel = () => {
    navigate({ to: '/admin/projects' });
  };

  return (
    <div className="admin-projects">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Portfolio Management</span>
          <h1 className="admin-profiles__header-title">{t`Edit Project`}</h1>
        </div>
        <button className="btn btn--outline" onClick={handleCancel}>
          <span className="material-symbols-outlined" style={{ marginRight: '0.5rem' }}>
            arrow_back
          </span>
          <Trans>Back to list</Trans>
        </button>
      </header>
      <div style={{ marginTop: '2rem' }}>
        <ProjectEditForm initialData={project} onSuccess={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
