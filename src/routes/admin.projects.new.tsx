import { createFileRoute, useNavigate } from '@tanstack/react-router';
import { ProjectCreateForm } from '../features/projects';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';
import { RouteNameType } from '../core/types/routes-name';

export const Route = createFileRoute('/admin/projects/new')({
  component: NewProjectComponent,
});

function NewProjectComponent() {
  const navigate = useNavigate();

  const handleSubmit = async () => {
    navigate({ to: RouteNameType.AdminProjects.toString() });
  };

  const handleCancel = () => {
    navigate({ to: RouteNameType.AdminProjects.toString() });
  };

  return (
    <div className="admin-projects">
      <header className="admin-profiles__header">
        <div>
          <span className="admin-profiles__header-label">Portfolio Management</span>
          <h1 className="admin-profiles__header-title">{t`Add New Project`}</h1>
        </div>
        <button className="btn btn--outline" onClick={handleCancel}>
          <span className="material-symbols-outlined admin-profiles__icon-left">arrow_back</span>
          <Trans>Back to list</Trans>
        </button>
      </header>
      <div className="admin-profiles__section-spacing">
        <ProjectCreateForm onSuccess={handleSubmit} onCancel={handleCancel} />
      </div>
    </div>
  );
}
