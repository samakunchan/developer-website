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
        image: image,
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
