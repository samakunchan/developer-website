import React, { useState } from 'react';
import { Container } from './Container';
import { ProjectFilter } from '../core/types/project';
import { ProjectCard } from './ProjectCard';

import { t } from '@lingui/core/macro';
import { ProjectType } from '../features/projects';
import { ProjectListEmpty } from './ProjectListEmpty';
import { ProjectsFeatured } from './ProjectsFeatured';

interface ProjectsProps {
  id?: string;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  projects: ProjectType[];
}

export function Projects({ id, title, subtitle, projects }: ProjectsProps) {
  const [activeFilter, setActiveFilter] = useState<string>('all');

  const projectsFilters: ProjectFilter[] = [
    { id: 'all', label: t`All Projects` },
    { id: 'web', label: t`Web Apps` },
    { id: 'mobile', label: t`Mobile UI` },
    { id: 'open_source', label: t`Open Source` },
  ];

  const otherProjects = projects.filter((p) => !p.isFeatured).filter((p) => p.status === 'published');

  const [featuredIndex, setFeaturedIndex] = useState<number>(0);
  const featuredProjects = projects.filter((p) => p.isFeatured).filter((p) => p.status === 'published');

  const handlePrev = () => {
    setFeaturedIndex((prev) => (prev === 0 ? featuredProjects.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setFeaturedIndex((prev) => (prev === featuredProjects.length - 1 ? 0 : prev + 1));
  };

  const filteredOtherProjects: ProjectType[] =
    activeFilter === 'all' ? otherProjects : otherProjects.filter((p: ProjectType) => p.category === activeFilter);

  return (
    <>
      <ProjectsFeatured
        projects={projects}
        index={featuredIndex}
        onPrev={handlePrev}
        onNext={handleNext}
        onDotClick={setFeaturedIndex}
      />
      <section className="projects" id={id}>
        <Container className="projects__container">
          {(subtitle || title) && (
            <div className="services__header">
              {subtitle && <span className="services__subtitle">{subtitle}</span>}
              {title && <h2 className="services__title">{title}</h2>}
            </div>
          )}

          {/* Other Projects Section */}
          <div className="projects__section">
            <div className="projects__filters_container">
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
            </div>

            <div
              className={`projects__grid ${filteredOtherProjects.length > 0 && filteredOtherProjects.length < 3 ? 'projects__grid--center' : ''}`}
            >
              {filteredOtherProjects.length > 0 ? (
                filteredOtherProjects.map((project: ProjectType) => (
                  <ProjectCard
                    key={project.id}
                    slug={project.slug}
                    image={project.image}
                    title={project.title}
                    categoryLabel={project.categoryLabel}
                    description={project.description}
                    techIcons={project.techStack.map((tech) => tech.name)}
                  />
                ))
              ) : (
                <ProjectListEmpty />
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
