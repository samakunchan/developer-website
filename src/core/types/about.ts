import React from 'react';

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
