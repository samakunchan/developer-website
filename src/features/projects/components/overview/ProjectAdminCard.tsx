import React from 'react';
import { ProjectType } from '../../utils/schemas';
import { t } from '@lingui/core/macro';
import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

interface ProjectAdminCardProps {
  project: ProjectType;
  onToggleFeatured: (id: number) => void;
  onDelete: (id: number) => void;
}

export const ProjectAdminCard: React.FC<ProjectAdminCardProps> = ({ project, onToggleFeatured, onDelete }) => {
  return (
    <div className="card project-admin-card">
      <div className="project-admin-card__image-container">
        {project.image?.medium?.url ? (
          <img src={project.image.medium.url} alt={project.image.medium.alt} className="project-admin-card__image" />
        ) : (
          <div className="project-admin-card__image project-admin-card__image--placeholder">
            <span className="material-symbols-outlined">image</span>
          </div>
        )}
      </div>

      <div className="project-admin-card__content">
        <div className="project-admin-card__header">
          <h3 className="project-admin-card__title">{project.title}</h3>
          {project.isFeatured && (
            <span className="project-admin-card__featured-badge">
              <span className="material-symbols-outlined project-admin-card__featured-icon">star</span>
              <Trans>Featured</Trans>
            </span>
          )}
        </div>
        <p className="project-admin-card__description">{project.description}</p>
        <div className="project-admin-card__tags">
          <span className="badge project-admin-card__badge">{project.category}</span>
        </div>
      </div>

      <div className="project-admin-card__actions">
        <button
          onClick={() => onToggleFeatured(project.id)}
          className="btn btn--outline project-admin-card__btn-compact"
          title={project.isFeatured ? t`Unmark as Featured` : t`Mark as Featured`}
        >
          <span className="material-symbols-outlined">{project.isFeatured ? 'star_filled' : 'star'}</span>
        </button>
        <Link
          to="/admin/projects/$projectId/edit"
          params={{ projectId: project.id.toString() }}
          className="btn btn--secondary project-admin-card__btn-compact"
        >
          <span className="material-symbols-outlined">edit</span>
        </Link>
        <button
          onClick={() => onDelete(project.id)}
          className="btn btn--outline project-admin-card__btn-compact project-admin-card__btn-delete"
          title={t`Delete Project`}
        >
          <span className="material-symbols-outlined">delete</span>
        </button>
      </div>
    </div>
  );
};
