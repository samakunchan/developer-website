import React from 'react';
import { Trans } from '@lingui/react/macro';

export function ProjectListEmpty() {
  return (
    <div className="projects__empty">
      {/* Visual Background Placeholder */}
      <div className="projects__empty-background">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="project-card project-card--placeholder">
            <div className="project-card__image-wrapper project-card__image-wrapper--placeholder"></div>
            <div className="project-card__content">
              <div className="project-card__placeholder-title"></div>
              <div className="project-card__placeholder-line"></div>
              <div className="project-card__placeholder-line project-card__placeholder-line--short"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Centered Message */}
      <div className="projects__empty-message">
        <span className="material-symbols-outlined projects__empty-icon">auto_awesome_motion</span>
        <h3 className="projects__empty-title">
          <Trans>No other projects yet.</Trans>
        </h3>
        <p className="projects__empty-text">
          <Trans>I'm currently working on new exciting projects. Check back soon!</Trans>
        </p>
      </div>
    </div>
  );
}
