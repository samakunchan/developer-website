import React from 'react';

export interface Project {
  id: string;
  slug: string;
  imageSrc: string;
  imageAlt: string;
  title: React.ReactNode;
  category: 'web' | 'mobile' | 'open-source';
  categoryLabel: React.ReactNode;
  description: React.ReactNode;
  caseStudyNumber?: string;
  techIcons: string[];
  techStack?: Array<{ name: string; icon: string }>;
  features?: Array<{ icon: string; title: string; description: string }>;
}
export interface ProjectFilter {
  id: string;
  label: string;
}
