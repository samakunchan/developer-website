import { Prisma } from '@prisma/client';
import { db } from '../../database/server/db.server';
import { getSessionInternal } from '../../auth/utils/auth-actions.server';
import { projectSchema, ProjectInput, ProjectType } from './schemas';
import { processPictureFiles, cleanupPictureFiles, ImagePayload } from '../../pictures/utils/pictures-actions.server';
import { removeFromSearchIndexInternal } from '../../search/utils/search-actions.server';

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

/**
 * Creates a new project. Reserved for admins.
 */
export async function createProjectInternal(data: ProjectInput) {
  const { image, ...rest } = projectSchema.parse(data);
  const session = await getSessionInternal();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  let finalImage: ImagePayload | undefined = undefined;
  if (image) {
    const processed = await processPictureFiles({
      slug: rest.slug,
      newImage: image as ImagePayload,
      folder: 'projects',
    });
    if (processed) {
      finalImage = processed;
    }
  }

  const project = await db.project.create({
    data: {
      slug: rest.slug,
      title: rest.title,
      description: rest.description,
      category: rest.category,
      categoryLabel: rest.categoryLabel,
      caseStudyNumber: rest.caseStudyNumber,
      techIcons: rest.techIcons,
      techStack: rest.techStack as Prisma.InputJsonValue,
      features: rest.features as Prisma.InputJsonValue,
      isFeatured: rest.isFeatured,
      status: rest.status || 'draft',
      userId: session.user.id,
      image: finalImage ? { create: finalImage as unknown as Prisma.ProjectImageCreateWithoutProjectInput } : undefined,
    },
    include: { image: true },
  });

  // Project search index is updated automatically via Postgres triggers

  return project as unknown as ProjectType;
}

/**
 * Helper to process project images:
 * 1. If image is temporary (starts with /shared/temp), process with sharp and move to public/shared/projects
 * 2. Delete the original temp file
 * 3. Handle cleanup of old project images if replaced
 */

/**
 * Updates an existing project. Reserved for admins.
 */
export async function updateProjectInternal(id: number, data: ProjectInput) {
  const { image, ...rest } = projectSchema.parse(data);
  const session = await getSessionInternal();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  // Get existing project to handle image replacement
  const existing = await db.project.findUnique({
    where: { id },
    include: { image: true },
  });

  let finalImage: ImagePayload | undefined = image ? (image as ImagePayload) : undefined;
  if (image) {
    const processed = await processPictureFiles({
      slug: rest.slug || existing?.slug || 'project',
      newImage: image as ImagePayload,
      existingImage: existing?.image as unknown as ImagePayload | undefined,
      folder: 'projects',
    });
    if (processed) {
      finalImage = processed;
    }
  }

  const project = await db.project.update({
    where: { id },
    data: {
      slug: rest.slug,
      title: rest.title,
      description: rest.description,
      category: rest.category,
      categoryLabel: rest.categoryLabel,
      caseStudyNumber: rest.caseStudyNumber,
      techIcons: rest.techIcons,
      techStack: rest.techStack as Prisma.InputJsonValue,
      features: rest.features as Prisma.InputJsonValue,
      isFeatured: rest.isFeatured,
      status: rest.status,
      ...(finalImage
        ? {
            image: {
              upsert: {
                create: finalImage as unknown as Prisma.ProjectImageCreateWithoutProjectInput,
                update: finalImage as unknown as Prisma.ProjectImageUpdateWithoutProjectInput,
              },
            },
          }
        : {}),
    },
    include: { image: true },
  });

  // Project search index is updated automatically via Postgres triggers

  return project as unknown as ProjectType;
}

/**
 * Deletes a project. Reserved for admins.
 */
export async function deleteProjectInternal(id: number) {
  const session = await getSessionInternal();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  // Cleanup files on delete
  const project = await db.project.findUnique({
    where: { id },
    include: { image: true },
  });
  if (project?.image) {
    await cleanupPictureFiles(project.image as unknown as ImagePayload);
  }

  const res = await db.project.delete({
    where: { id },
  });

  await removeFromSearchIndexInternal(id, 'project');

  return res;
}

/**
 * Toggles the "featured" status of a project. Reserved for admins.
 */
export async function toggleProjectFeaturedInternal(id: number) {
  const session = await getSessionInternal();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const project = await db.project.findUnique({ where: { id } });
  if (!project) throw new Error('Project not found');

  return await db.project.update({
    where: { id },
    data: { isFeatured: !project.isFeatured },
  });
}

// Internal functions only. Public functions are in projects-actions.functions.ts
