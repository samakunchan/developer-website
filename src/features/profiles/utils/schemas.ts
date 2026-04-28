import { z } from 'zod';
import type { Prisma } from '@prisma/client';

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  professionalTitle: z.string().optional().nullable(),
  bio: z.string().optional().nullable(),
  experience: z.number().int().nonnegative().optional().nullable(),
  focus: z.string().optional().nullable(),
  languages: z.string().optional().nullable(),
  // coverImage: z.url().optional().nullable(),
  image: z
    .object({
      tiny: z.url(),
      medium: z.url(),
      raw: z.url(),
    })
    .optional(),
});

export const CategoryStackEnum = z.enum(['frontend', 'backend', 'devops', 'cloud', 'testing', 'mobile']);

export const techStackSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  category: CategoryStackEnum.default('frontend'),
});

export const SocialLinkTypeEnum = z.enum(['github', 'linkedin', 'upwork', 'malt', 'email']);

export const socialLinkSchema = z.object({
  name: z.string().min(1, 'Label is required'),
  url: z.url('Invalid URL'),
  icon: z.string().default('link'),
  type: SocialLinkTypeEnum.default('github'),
});

export type PersonalInfoInput = z.infer<typeof personalInfoSchema>;
export type TechStackInput = z.infer<typeof techStackSchema>;
export type SocialLinkInput = z.infer<typeof socialLinkSchema>;
export type CategoryStackType = z.infer<typeof CategoryStackEnum>;

export type SocialLinkType = z.infer<typeof SocialLinkTypeEnum>;

export type ProfileType = {
  name: string | null;
  email: string;
  image: {
    tiny: string;
    medium: string;
    raw: string;
  } | null;
  personalInfo: {
    professionalTitle: string | null;
    bio: string | null;
    experience: number | null;
    focus: string | null;
    languages: string | null;
  } | null;
  techStacks: { id: number; name: string; category: CategoryStackType }[];
  socialLinks: SocialLinkType[];
};

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
