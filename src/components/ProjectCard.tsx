import React from 'react';
import { Trans } from '@lingui/react/macro';
import { Link } from '@tanstack/react-router';

interface ProjectCardProps {
  slug: string;
  image?: {
    medium: { url: string; alt: string };
    raw: { url: string; alt: string };
  };
  title: React.ReactNode;
  categoryLabel: React.ReactNode;
  description: React.ReactNode;
  techIcons?: string[];
}

export function ProjectCard({ slug, image, title, categoryLabel, description, techIcons }: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-card__image-wrapper">
        {image?.medium?.url ? (
          <img src={image.medium.url} alt={image.medium.alt} className="project-card__image" />
        ) : (
          <div className="project-card__image project-card__image--placeholder">
            <span className="material-symbols-outlined project-card__placeholder-icon">image</span>
          </div>
        )}
      </div>
      <div className="project-card__content">
        <div className="project-card__header">
          <Link to="/projects/$slug" params={{ slug }} className="project-card__link">
            <h3 className="project-card__title">{title}</h3>
          </Link>
          <span className="project-card__category">{categoryLabel}</span>
        </div>
        <p className="project-card__description">{description}</p>
        <div className="project-card__footer">
          <div className="project-card__tech">
            {techIcons?.map((icon, index) => (
              <span key={index} className="material-symbols-outlined project-card__tech-icon">
                {icon}
              </span>
            ))}
          </div>
          <Link to="/projects/$slug" params={{ slug }} className="project-card__link">
            <Trans>View Details</Trans>
            <span className="material-symbols-outlined">arrow_forward</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
