import { db } from '../../database/server/db.server';
import { getSessionInternal } from '../../auth/utils/auth-actions.server';
import {
  personalInfoSchema,
  PersonalInfoInput,
  TechStackInput,
  techStackSchema,
  socialLinkSchema,
  SocialLinkInput,
  UserOutput,
} from './schemas';
import { uploadPictureInternal, processPictureFiles } from '../../pictures/utils/pictures-actions.server';

const MAX_FILE_SIZE = 2;
const VALID_FILE_TYPES = ['image/jpeg', 'image/png'];

/**
 * Fetches the complete profile data for the currently authenticated user.
 */
export async function getProfileInternal(): Promise<UserOutput> {
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

  // 1. Upload to temp using the picture feature
  const uploadResult = await uploadPictureInternal(formData);

  // 2. Process temp files using the picture feature
  const processedImages = await processPictureFiles({
    slug: session.user.id.toString(),
    newImage: uploadResult.urls,
    existingImage: currentUser?.image,
    folder: 'me',
  });

  if (!processedImages || !processedImages.tiny) {
    throw new Error('Failed to process avatar');
  }

  const dbPaths = {
    tiny: processedImages.tiny.url,
    medium: processedImages.medium.url,
    raw: processedImages.raw.url,
  };

  // 3. Mise à jour DB
  await db.user.update({
    where: { id: session.user.id },
    data: {
      image: {
        upsert: {
          create: dbPaths,
          update: dbPaths,
        },
      },
    },
  });

  return { success: true, urls: dbPaths };
}
