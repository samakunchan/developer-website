import fs from 'node:fs/promises';
import path from 'node:path';
import { db } from '../../database';
import { getSessionInternal } from '../../auth/utils/auth-actions.server';
import {
  personalInfoSchema,
  PersonalInfoInput,
  TechStackInput,
  techStackSchema,
  socialLinkSchema,
  SocialLinkInput,
} from './schemas';
import sharp from 'sharp';

const MAX_FILE_SIZE = 2;
const VALID_FILE_TYPES = ['image/jpeg', 'image/png'];

/**
 * Fetches the complete profile data for the currently authenticated user.
 */
export async function getProfileInternal() {
  const session = await getSessionInternal();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      personalInfo: true,
      techStacks: true,
      socialLinks: true,
      image: true,
    },
  });

  console.log(user);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

/**
 * Updates the personal information and user identity data.
 */
export async function updatePersonalInfoInternal(data: PersonalInfoInput) {
  const session = await getSessionInternal();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const { fullName, image, ...personalInfoData } = personalInfoSchema.parse(data);

  return await db.$transaction(async (tx) => {
    // Update basic user info
    await tx.user.update({
      where: { id: session.user.id },
      data: {
        name: fullName,
        image: image
          ? {
              upsert: {
                create: {
                  tiny: image.tiny,
                  medium: image.medium,
                  raw: image.raw,
                },
                update: {
                  tiny: image.tiny,
                  medium: image.medium,
                  raw: image.raw,
                },
              },
            }
          : undefined,
      },
    });

    // Update or create detailed personal info
    await tx.personalInformation.upsert({
      where: { userId: session.user.id },
      create: {
        ...personalInfoData,
        userId: session.user.id,
      },
      update: personalInfoData,
    });

    return { success: true };
  });
}

/**
 * Adds a new tech stack item.
 */
export async function addTechStackInternal(data: TechStackInput) {
  const session = await getSessionInternal();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const validatedData = techStackSchema.parse(data);

  return await db.techStack.create({
    data: {
      ...validatedData,
      userId: session.user.id,
    },
  });
}

/**
 * Removes a tech stack item.
 */
export async function removeTechStackInternal(id: number) {
  const session = await getSessionInternal();
  if (!session) {
    throw new Error('Unauthorized');
  }

  // Ensure user owns the item
  const item = await db.techStack.findUnique({ where: { id } });
  if (!item || item.userId !== session.user.id) {
    throw new Error('Not found or unauthorized');
  }

  return await db.techStack.delete({
    where: { id },
  });
}

/**
 * Adds a new social link.
 */
export async function addSocialLinkInternal(data: SocialLinkInput) {
  const session = await getSessionInternal();
  if (!session) {
    throw new Error('Unauthorized');
  }

  const validatedData = socialLinkSchema.parse(data);

  return await db.socialLink.create({
    data: {
      ...validatedData,
      userId: session.user.id,
    },
  });
}

/**
 * Removes a social link.
 */
export async function removeSocialLinkInternal(id: number) {
  const session = await getSessionInternal();
  if (!session) {
    throw new Error('Unauthorized');
  }

  // Ensure user owns the item
  const item = await db.socialLink.findUnique({ where: { id } });
  if (!item || item.userId !== session.user.id) {
    throw new Error('Not found or unauthorized');
  }

  return await db.socialLink.delete({
    where: { id },
  });
}

/**
 * Handles the profile photo upload, saves it to disk, and updates the database.
 */
export async function uploadAvatarInternal(formData: FormData) {
  const session = await getSessionInternal();
  if (!session) throw new Error('Unauthorized');

  const file = formData.get('file') as File;
  if (!file || !(file instanceof File)) throw new Error('Invalid file');

  // --- GARDE CES VÉRIFICATIONS ICI ---
  if (!VALID_FILE_TYPES.includes(file.type)) {
    throw new Error('Format non supporté. Utilisez JPG, PNG ou WebP.');
  }

  if (file.size > MAX_FILE_SIZE * 1024 * 1024) {
    throw new Error(`Fichier trop lourd (max ${MAX_FILE_SIZE}MB).`);
  }
  const currentUser = await db.user.findUnique({
    where: { id: session.user.id },
    include: { image: true },
  });

  // Dossier de base
  const baseDir = path.join(process.cwd(), 'public', 'shared', 'me');
  await fs.mkdir(baseDir, { recursive: true });

  const timestamp = Date.now();
  const extension = 'webp'; // Utiliser WebP est plus performant pour le web
  const baseFileName = `avatar-${session.user.id}-${timestamp}`;

  const buffer = Buffer.from(await file.arrayBuffer());

  // Chemins pour la DB
  const paths = {
    tiny: `/shared/me/${baseFileName}-tiny.${extension}`,
    medium: `/shared/me/${baseFileName}-medium.${extension}`,
    raw: `/shared/me/${baseFileName}-raw.${extension}`,
  };

  try {
    // Génération des 3 versions en parallèle avec Sharp
    await Promise.all([
      // Tiny: 32x32
      sharp(buffer)
        .resize(32, 32, { fit: 'cover' })
        .toFormat(extension)
        .toFile(path.join(baseDir, `${baseFileName}-tiny.${extension}`)),

      // Medium: 80x80
      sharp(buffer)
        .resize(80, 80, { fit: 'cover' })
        .toFormat(extension)
        .toFile(path.join(baseDir, `${baseFileName}-medium.${extension}`)),

      // Raw: Taille normale (on peut quand même optimiser le poids)
      sharp(buffer)
        .toFormat(extension, { quality: 80 })
        .toFile(path.join(baseDir, `${baseFileName}-raw.${extension}`)),
    ]);

    // Mise à jour DB
    await db.user.update({
      where: { id: session.user.id },
      data: {
        image: {
          upsert: {
            create: paths,
            update: paths,
          },
        },
      },
    });

    // Nettoyage des ANCIENS fichiers (tiny, medium, raw)
    if (currentUser?.image) {
      const oldImages: string[] = [currentUser.image.tiny, currentUser.image.medium, currentUser.image.raw];

      for (const oldImgPath of oldImages) {
        try {
          await fs.unlink(path.join(process.cwd(), 'public', oldImgPath));
        } catch (e) {
          console.error(e);
          /* Ignore si le fichier n'existe pas */
        }
      }
    }

    return { success: true, urls: paths };
  } catch (error) {
    // Tentative de nettoyage des nouveaux fichiers en cas d'erreur
    Object.values(paths).forEach((p) => fs.unlink(path.join(process.cwd(), 'public', p)).catch(() => {}));
    throw error;
  }
}
