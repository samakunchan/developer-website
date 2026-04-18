import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
import { Prisma } from '@prisma/client';
import { db } from '../../database/server/db.server';
import { getSessionInternal } from '../../auth/utils/auth-actions.server';
import { projectSchema, ProjectInput, ProjectType } from './schemas';

const MAX_FILE_SIZE: number = 5; // 5MB for projects
const VALID_FILE_TYPES: string[] = ['image/jpeg', 'image/png', 'image/webp'];

/**
 * Fetches all projects from the database.
 */
export async function getProjectsInternal(): Promise<ProjectType[]> {
  const projects = await db.project.findMany({
    include: { image: true },
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
    include: { image: true },
  });
  return project as unknown as ProjectType | null;
}

/**
 * Fetches a single project by its slug.
 */
export async function getProjectBySlugInternal(slug: string): Promise<ProjectType | null> {
  const project = await db.project.findUnique({
    where: { slug },
    include: { image: true },
  });
  return project as unknown as ProjectType | null;
}

interface ImagePayload {
  medium: { url: string; alt: string };
  raw: { url: string; alt: string };
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
    const processed = await processProjectImageFiles({
      slug: rest.slug,
      newImage: image,
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

  return project as unknown as ProjectType;
}

/**
 * Helper to process project images:
 * 1. If image is temporary (starts with /shared/temp), process with sharp and move to public/shared/projects
 * 2. Delete the original temp file
 * 3. Handle cleanup of old project images if replaced
 */
async function processProjectImageFiles({
  slug,
  newImage,
  existingImage,
}: {
  slug: string;
  newImage: ProjectInput['image'];
  existingImage?: ProjectType['image'];
}): Promise<ImagePayload | undefined> {
  if (!newImage || !newImage.medium.url) {
    // If we're removing the image, clean up existing ones
    if (existingImage) {
      await cleanupProjectFiles(existingImage as unknown as CleanupImageInput);
    }
    return undefined;
  }

  // If the URL is already final (not in temp), just return it
  if (!newImage.medium.url.startsWith('/shared/temp/')) {
    return newImage as ImagePayload;
  }

  // It's a temp file, process it!
  const tempPath = path.join(process.cwd(), 'public', newImage.raw.url);
  const projectsDir = path.join(process.cwd(), 'public', 'shared', 'projects');
  await fs.mkdir(projectsDir, { recursive: true });

  const timestamp = Date.now();
  const extension = 'webp';
  const mediumPath = path.join(projectsDir, `project-${slug}-${timestamp}-medium.${extension}`);
  const rawPath = path.join(projectsDir, `project-${slug}-${timestamp}-raw.${extension}`);

  const buffer = await fs.readFile(tempPath);

  // Clean up old project files BEFORE writing new ones to avoid path collisions
  if (existingImage) {
    await cleanupProjectFiles(existingImage as unknown as CleanupImageInput);
  }

  await Promise.all([
    // Medium version
    sharp(buffer).resize(1200, 800, { fit: 'cover' }).toFormat(extension, { quality: 80 }).toFile(mediumPath),
    // Raw version
    sharp(buffer).toFormat(extension, { quality: 90 }).toFile(rawPath),
  ]);

  // Clean up temp file
  await fs.unlink(tempPath).catch(() => {});

  return {
    medium: {
      url: `/shared/projects/project-${slug}-${timestamp}-medium.${extension}`,
      alt: newImage.medium.alt,
    },
    raw: {
      url: `/shared/projects/project-${slug}-${timestamp}-raw.${extension}`,
      alt: newImage.raw.alt,
    },
  };
}

type CleanupImageInput = {
  medium: string | { url: string } | unknown;
  raw: string | { url: string } | unknown;
};

/**
 * Safely extracts a URL from a potentially mixed image field
 */
function extractUrl(field: unknown): string | null {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object' && 'url' in field) {
    const obj = field as { url: unknown };
    if (typeof obj.url === 'string') return obj.url;
  }
  return null;
}

async function cleanupProjectFiles(image: CleanupImageInput) {
  const mediumUrl = extractUrl(image.medium);
  const rawUrl = extractUrl(image.raw);

  const paths = [
    mediumUrl ? path.join(process.cwd(), 'public', mediumUrl) : null,
    rawUrl ? path.join(process.cwd(), 'public', rawUrl) : null,
  ].filter(Boolean) as string[];

  for (const p of paths) {
    await fs.unlink(p).catch(() => {});
  }
}

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
    const processed = await processProjectImageFiles({
      slug: rest.slug || existing?.slug || 'project',
      newImage: image,
      existingImage: existing?.image as ProjectType['image'],
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
    await cleanupProjectFiles(project.image as unknown as CleanupImageInput);
  }

  return await db.project.delete({
    where: { id },
  });
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

/**
 * Handles project image upload, saves it to disk, and returns the URLs.
 */
export async function uploadProjectImageInternal(formData: FormData) {
  const session = await getSessionInternal();
  if (!session || session.user.role !== 'admin') {
    throw new Error('Unauthorized');
  }

  const file = formData.get('file') as File;
  if (!file || !(file instanceof File)) throw new Error('Invalid file');

  if (!VALID_FILE_TYPES.includes(file.type)) {
    throw new Error('Format non supporté. Utilisez JPG, PNG ou WebP.');
  }

  if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
    throw new Error(`Fichier trop lourd (max ${MAX_FILE_SIZE}MB).`);
  }

  // Base directory for temp project images
  const tempDir = path.join(process.cwd(), 'public', 'shared', 'temp');
  await fs.mkdir(tempDir, { recursive: true });

  const timestamp = Date.now();
  const extension = path.extname(file.name).replace('.', '') || 'webp';
  const fileName = `raw-${timestamp}.${extension}`;
  const filePath = path.join(tempDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  // Return temp URLs (pointing to the same raw file for now)
  const tempUrl = `/shared/temp/${fileName}`;

  return {
    success: true,
    urls: {
      medium: { url: tempUrl, alt: '' },
      raw: { url: tempUrl, alt: '' },
    },
  };
}

// Internal functions only. Public functions are in projects-actions.functions.ts
