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

export const ProjectsFeatured: React.FC<ProjectsFeaturedProps> = ({
  projects,
  index,
  onPrev,
  onNext,
  onDotClick,
}: ProjectsFeaturedProps) => {
  if (projects.length === 0) return null;
  const allFeaturedProjects: ProjectType[] = projects
    .filter((p: ProjectType) => p.isFeatured)
    .filter((p: ProjectType) => p.status === 'published');
  const featuredProjects: ProjectType[] = allFeaturedProjects.filter((_, i: number) => i === index);

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
};
