import React, { useState } from 'react';
import { Container } from './Container';
import { Trans } from '@lingui/react/macro';
import { t } from '@lingui/core/macro';

interface ProjectCardProps {
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  category: string;
  categoryLabel: React.ReactNode;
  description: React.ReactNode;
  techIcons?: string[];
  detailsUrl?: string;
}

export function ProjectCard({
  imageSrc,
  imageAlt,
  title,
  categoryLabel,
  description,
  techIcons,
  detailsUrl = '#',
}: ProjectCardProps) {
  return (
    <div className="project-card">
      <div className="project-card__image-wrapper">
        <img src={imageSrc} alt={imageAlt} className="project-card__image" />
      </div>
      <div className="project-card__content">
        <div className="project-card__header">
          <h3 className="project-card__title">{title}</h3>
          <span className="project-card__category">{categoryLabel}</span>
        </div>
        <p className="project-card__description">{description}</p>
        <div className="project-card__footer">
          <div className="project-card__tech">
            {techIcons?.map((icon, index) => (
              <span
                key={index}
                className="material-symbols-outlined project-card__tech-icon"
              >
                {icon}
              </span>
            ))}
          </div>
          <a href={detailsUrl} className="project-card__link">
            <Trans>View Details</Trans>
            <span className="material-symbols-outlined">arrow_forward</span>
          </a>
        </div>
      </div>
    </div>
  );
}

interface Project {
  id: string;
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  category: 'web' | 'mobile' | 'open-source';
  categoryLabel: React.ReactNode;
  description: React.ReactNode;
  techIcons: string[];
}

interface ProjectsProps {
  id?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  projects: Project[];
}

interface FilterProps {
  id: string;
  label: string;
}

export function Projects({ id, title, subtitle, projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filters: FilterProps[] = [
    { id: 'all', label: t`All Projects` },
    { id: 'web', label: t`Web Apps` },
    { id: 'mobile', label: t`Mobile UI` },
    { id: 'open-source', label: t`Open Source` },
  ];

  const filteredProjects =
    activeFilter === 'all'
      ? projects
      : projects.filter((p: Project) => p.category === activeFilter);

  return (
    <section className="projects" id={id}>
      <Container className="projects__container">
        {(subtitle || title) && (
          <div className="services__header">
            {subtitle && <span className="services__subtitle">{subtitle}</span>}
            {title && <h2 className="services__title">{title}</h2>}
          </div>
        )}

        <div className="projects__filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              className={`projects__filter-btn ${
                activeFilter === filter.id ? 'projects__filter-btn--active' : ''
              }`}
              onClick={() => setActiveFilter(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="projects__grid">
          {filteredProjects.map((project: Project) => (
            <ProjectCard
              key={project.id}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              title={project.title}
              category={project.category}
              categoryLabel={project.categoryLabel}
              description={project.description}
              techIcons={project.techIcons}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}
