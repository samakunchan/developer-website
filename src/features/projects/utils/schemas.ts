import { z } from 'zod';

export const ProjectCategoryEnum = z.enum(['web', 'mobile', 'open_source']);
export const ProjectStatusEnum = z.enum(['draft', 'published', 'unpublished', 'archived']);

export const ProjectTechStackSchema = z.object({
  name: z.string().or(z.literal('')),
  icon: z.string().or(z.literal('')),
});

export const ProjectFeatureSchema = z.object({
  icon: z.string().or(z.literal('')),
  title: z.string().or(z.literal('')),
  description: z.string().or(z.literal('')),
});

export const ProjectImageSchema = z.object({
  medium: z.object({
    url: z.string().or(z.literal('')),
    alt: z.string().or(z.literal('')),
  }),
  raw: z.object({
    url: z.string().or(z.literal('')),
    alt: z.string().or(z.literal('')),
  }),
});

export const projectSchema = z.object({
  slug: z.string().min(1, 'Slug is required'),
  title: z.string().min(1, 'Title is required'),
  description: z.string().or(z.literal('')),
  image: ProjectImageSchema.optional(),
  category: ProjectCategoryEnum,
  categoryLabel: z.string().or(z.literal('')),
  caseStudyNumber: z.string().optional().nullable(),
  techIcons: z.array(z.string()),
  techStack: z.array(ProjectTechStackSchema),
  features: z.array(ProjectFeatureSchema),
  isFeatured: z.boolean(),
  status: ProjectStatusEnum,
});

export type ProjectInput = z.infer<typeof projectSchema>;
export type ProjectCategoryType = z.infer<typeof ProjectCategoryEnum>;
export type ProjectStatusType = z.infer<typeof ProjectStatusEnum>;

export type CategoryProjectType = 'web' | 'mobile' | 'open_source';
export type StatusProjectType = 'draft' | 'published' | 'unpublished' | 'archived';

export type TechStackType = {
  name: string;
  icon: string;
};

export type FeaturesType = {
  icon: string;
  title: string;
  description: string;
};
export interface ProjectType {
  id: number;
  slug: string;
  title: string;
  category: CategoryProjectType;
  categoryLabel: string;
  description: string;
  image?: {
    medium: { url: string; alt: string };
    raw: { url: string; alt: string };
  };
  projectUrl?: {
    url: string;
  };
  caseStudyNumber?: string | null;
  techIcons: string[];
  techStack: TechStackType[];
  features: FeaturesType[];
  isFeatured: boolean;
  status: StatusProjectType;
  userId: number;
  createdAt: string | Date;
  updatedAt: string | Date;
}
