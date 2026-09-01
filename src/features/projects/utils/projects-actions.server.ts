import { db } from '../../database/server/db.server';
import { ProjectType } from './schemas';

/**
 * Fetches all projects from the database.
 */
export async function getProjectsInternal(): Promise<ProjectType[]> {
  const projects = await db.project.findMany({
    include: { image: true, projectUrl: true },
    orderBy: { createdAt: 'desc' },
  });
  return projects as unknown as ProjectType[];
}

/**
 * Fetches a single project by its ID.
 */
export async function getProjectByIdInternal(id: number): Promise<ProjectType | null> {
  const project = await db.project.findUnique({
    where: { id },
    include: { image: true, projectUrl: true },
  });
  return project as unknown as ProjectType | null;
}

/**
 * Fetches a single project by its slug.
 */
export async function getProjectBySlugInternal(slug: string): Promise<ProjectType | null> {
  const project = await db.project.findUnique({
    where: { slug },
    include: { image: true, projectUrl: true },
  });
  return project as unknown as ProjectType | null;
}
