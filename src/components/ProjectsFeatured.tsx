import React from 'react';
import { ProjectType } from '../features/projects';
import { ProjectFeatured } from './ProjectFeatured';

interface ProjectsFeaturedProps {
  projects: ProjectType[];
  index: number;
  onPrev?: () => void;
  onNext?: () => void;
  onDotClick?: (index: number) => void;
}

export function ProjectsFeatured({ projects, index, onPrev, onNext, onDotClick }: ProjectsFeaturedProps) {
  if (projects.length === 0) return null;
  const allFeaturedProjects = projects.filter((p) => p.isFeatured).filter((p) => p.status === 'published');
  const featuredProjects: ProjectType[] = allFeaturedProjects.filter((_, i) => i === index);

  return (
    featuredProjects.length > 0 && (
      <>
        {featuredProjects.map((project: ProjectType) => (
          <ProjectFeatured
            key={project.id}
            slug={project.slug}
            image={project.image}
            title={project.title}
            categoryLabel={project.categoryLabel}
            description={project.description}
            techIcons={project.techStack.map((tech) => tech.name)}
            index={index}
            totalCount={allFeaturedProjects.length}
            onPrev={onPrev}
            onNext={onNext}
            onDotClick={onDotClick}
          />
        ))}
      </>
    )
  );
}
