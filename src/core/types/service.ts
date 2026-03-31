import React from 'react';

export interface ServiceData {
  icon: string;
  title: React.ReactNode;
  description: React.ReactNode;
  badges?: string[];
  features?: string[];
}
