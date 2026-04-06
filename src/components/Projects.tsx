import React, { useState } from 'react';
import { Container } from './Container';
import { Project, ProjectFilter } from '../core/types/project';
import { ProjectCard } from './ProjectCard';
import { projectsFilters } from '../core/data/projectsData';

interface ProjectsProps {
  id?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  projects: Project[];
}

export function Projects({ id, title, subtitle, projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const filteredProjects: Project[] =
    activeFilter === 'all' ? projects : projects.filter((p: Project) => p.category === activeFilter);

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
          {projectsFilters.map((filter: ProjectFilter) => (
            <button
              key={filter.id}
              className={`projects__filter-btn ${activeFilter === filter.id ? 'projects__filter-btn--active' : ''}`}
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
              slug={project.slug}
              imageSrc={project.imageSrc}
              imageAlt={project.imageAlt}
              title={project.title}
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
