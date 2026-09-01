import { db } from '../../database/server/db.server';
// import { getSessionInternal } from '../../auth/utils/auth-actions.server';
import { UserOutput } from './schemas';
// import { SessionType } from '../../auth';

export async function getProfilePresentationInternal(): Promise<UserOutput> {
  const user = await db.user.findUnique({
    where: { email: process.env.ADMIN_EMAIL },
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

// /**
//  * Fetches the complete profile data for the currently authenticated user.
//  */
// export async function getProfileInternal(): Promise<UserOutput> {
//   const session: SessionType | null = await getSessionInternal();
//   if (!session) {
//     throw new Error('Unauthorized');
//   }

//   const user = await db.user.findUnique({
//     where: { id: session.user.id },
//     include: {
//       personalInfo: true,
//       techStacks: true,
//       socialLinks: true,
//       image: true,
//     },
//   });

//   if (!user) {
//     throw new Error('User not found');
//   }

//   return user;
// }
