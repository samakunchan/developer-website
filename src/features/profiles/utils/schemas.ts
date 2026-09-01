import type { Prisma } from '@prisma/client';

export type UserOutput = Prisma.UserGetPayload<{
  include: {
    personalInfo: true;
    techStacks: true;
    socialLinks: true;
    image: true;
  };
}>;

export interface Skill {
  name: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  icon: React.ReactNode;
  href: string;
  ariaLabel: string;
}

export interface AboutProps {
  profileImage?: string;
  profileName?: string;
  profileJob?: string;
  profileDescription?: string;
  profileLinks?: SocialLink[];
  profileSkills?: Skill[];
}
