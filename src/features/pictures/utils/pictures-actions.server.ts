import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

export const MAX_FILE_SIZE = 5; // 5MB
export const VALID_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
export const APP_URL = (() => {
  if (process.env.APP_URL_STAGING) {
    return process.env.APP_URL_STAGING;
  }
  if (process.env.APP_URL_PROD) {
    return process.env.APP_URL_PROD;
  }
  return process.env.APP_URL_DEV || process.env.APP_URL || `http://localhost:${process.env.APP_PORT || 3000}`;
})();

export interface ImagePayload {
  tiny?: { url: string; alt: string };
  medium: { url: string; alt: string };
  raw: { url: string; alt: string };
}

export type CleanupImageInput = {
  tiny?: string | { url: string } | unknown;
  medium: string | { url: string } | unknown;
  raw: string | { url: string } | unknown;
};

/**
 * Safely extracts a URL from a potentially mixed image field
 */
export function extractUrl(field: unknown): string | null {
  if (typeof field === 'string') return field;
  if (field && typeof field === 'object' && 'url' in field) {
    const obj = field as { url: unknown };
    if (typeof obj.url === 'string') return obj.url;
  }
  return null;
}

/**
 * Processes temp images:
 * 1. Process with sharp and move to public/shared/{folder}
 * 2. Delete the original temp file
 * 3. Handle cleanup of old images if replaced
 */
export async function processPictureFiles({
  slug,
  newImage,
  existingImage,
  folder = 'projects',
}: {
  slug: string;
  newImage: ImagePayload | null | undefined;
  existingImage?: CleanupImageInput | null;
  folder?: string;
}): Promise<ImagePayload | undefined> {
  if (!newImage || !newImage.medium.url) {
    // If we're removing the image, clean up existing ones
    if (existingImage) {
      await cleanupPictureFiles(existingImage);
    }
    return undefined;
  }

  // If the URL is already final (not in temp), just return it
  if (!newImage.medium.url.includes('/cdn/temp/')) {
    return newImage;
  }

  // It's a temp file, process it!
  const tempFileName = newImage.raw.url.split('/').pop() || '';
  const tempPath = path.join(process.cwd(), 'public', 'shared', 'temp', tempFileName);
  const storageDir = path.join(process.cwd(), 'public', 'shared', folder);
  await fs.mkdir(storageDir, { recursive: true });

  const timestamp = Date.now();
  const extension = 'webp';
  const filenamePrefix = folder === 'projects' ? 'project' : folder;
  const tinyPath = path.join(storageDir, `${filenamePrefix}-${slug}-${timestamp}-tiny.${extension}`);
  const mediumPath = path.join(storageDir, `${filenamePrefix}-${slug}-${timestamp}-medium.${extension}`);
  const rawPath = path.join(storageDir, `${filenamePrefix}-${slug}-${timestamp}-raw.${extension}`);

  const buffer = await fs.readFile(tempPath);

  // Clean up old files BEFORE writing new ones to avoid path collisions
  if (existingImage) {
    await cleanupPictureFiles(existingImage);
  }

  if (folder === 'me') {
    await Promise.all([
      // Tiny version
      sharp(buffer).resize(32, 32, { fit: 'cover' }).toFormat(extension).toFile(tinyPath),
      // Medium version
      sharp(buffer).resize(80, 80, { fit: 'cover' }).toFormat(extension).toFile(mediumPath),
      // Raw version
      sharp(buffer).toFormat(extension, { quality: 80 }).toFile(rawPath),
    ]);
  } else {
    await Promise.all([
      // Medium version
      sharp(buffer).resize(1200, 800, { fit: 'cover' }).toFormat(extension, { quality: 80 }).toFile(mediumPath),
      // Raw version
      sharp(buffer).toFormat(extension, { quality: 90 }).toFile(rawPath),
    ]);
  }

  // Clean up temp file
  await fs.unlink(tempPath).catch(() => {});

  const folderUrlPart = folder === 'projects' ? 'projects' : folder;

  const result: ImagePayload = {
    medium: {
      url: `${APP_URL}/cdn/${folderUrlPart}/${filenamePrefix}-${slug}-${timestamp}-medium.${extension}`,
      alt: newImage.medium.alt,
    },
    raw: {
      url: `${APP_URL}/cdn/${folderUrlPart}/${filenamePrefix}-${slug}-${timestamp}-raw.${extension}`,
      alt: newImage.raw.alt,
    },
  };

  if (folder === 'me') {
    result.tiny = {
      url: `${APP_URL}/cdn/${folderUrlPart}/${filenamePrefix}-${slug}-${timestamp}-tiny.${extension}`,
      alt: newImage.medium.alt || '',
    };
  }

  return result;
}

/**
 * Safely cleans up image files from disk
 */
export async function cleanupPictureFiles(image: CleanupImageInput) {
  const tinyUrl = image && typeof image === 'object' && 'tiny' in image ? extractUrl(image.tiny) : null;
  const mediumUrl = extractUrl(image.medium);
  const rawUrl = extractUrl(image.raw);

  const getLocalPath = (url: string | null) => {
    if (!url) return null;
    try {
      url = new URL(url).pathname;
    } catch {
      // It's already a relative path
    }

    if (url.startsWith('/cdn/')) {
      if (url.startsWith('/cdn/temp/')) {
        url = url.replace('/cdn/temp/', '/shared/temp/');
      } else {
        const parts = url.split('/'); // ['', 'cdn', 'folder', 'filename'] OR ['', 'cdn', 'filename']
        if (parts.length > 3) {
          url = url.replace('/cdn/', '/shared/');
        } else {
          url = url.replace('/cdn/', '/shared/projects/');
        }
      }
    }
    return path.join(process.cwd(), 'public', url);
  };

  const paths = [getLocalPath(tinyUrl), getLocalPath(mediumUrl), getLocalPath(rawUrl)].filter(Boolean) as string[];

  for (const p of paths) {
    await fs.unlink(p).catch(() => {});
  }
}

/**
 * Handles image upload, saves it to disk temp folder, and returns the URLs.
 */
export async function uploadPictureInternal(formData: FormData) {
  const file = formData.get('file') as File;
  if (!file || !(file instanceof File)) throw new Error('Invalid file');

  if (!VALID_FILE_TYPES.includes(file.type)) {
    throw new Error('Format non supporté. Utilisez JPG, PNG ou WebP.');
  }

  if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
    throw new Error(`Fichier trop lourd (max ${MAX_FILE_SIZE}MB).`);
  }

  const tempDir = path.join(process.cwd(), 'public', 'shared', 'temp');
  await fs.mkdir(tempDir, { recursive: true });

  const timestamp = Date.now();
  const extension = path.extname(file.name).replace('.', '') || 'webp';
  const fileName = `raw-${timestamp}.${extension}`;
  const filePath = path.join(tempDir, fileName);

  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filePath, buffer);

  const tempUrl = `${APP_URL}/cdn/temp/${fileName}`;

  return {
    success: true,
    urls: {
      medium: { url: tempUrl, alt: '' },
      raw: { url: tempUrl, alt: '' },
    },
  };
}
