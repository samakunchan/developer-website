export type CategoryProjectType = 'web' | 'mobile' | 'open_source';
export type StatusProjectType = 'draft' | 'published' | 'unpublished' | 'archived';
export type UrlModeType = 'finalResult' | 'demo';

export type TechStackType = {
  name: string;
  icon: string;
};

export type ImageSizeType = {
  medium: ImageType;
  raw: ImageType;
};

export type ImageType = {
  url: string;
  alt: string;
};

export type ProjectUrlType = {
  url: string;
  isActive: boolean;
  mode: UrlModeType;
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
  image?: ImageSizeType;
  projectUrl?: ProjectUrlType;
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
