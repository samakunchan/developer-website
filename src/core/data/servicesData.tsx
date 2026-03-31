import { t } from '@lingui/core/macro';
import { ServiceData } from '../types/service';

export const specializedServices: ServiceData[] = [
  {
    icon: 'language',
    title: t`Web Development`,
    description: t`Building scalable, SEO-friendly web applications with modern tech stacks.`,
    badges: ['React', 'Next.js', 'Node.js'],
    features: [
      t`Responsive Design`,
      t`Performance Optimization`,
      t`SEO Best Practices`,
    ],
  },
  {
    icon: 'smartphone',
    title: t`Mobile App Development`,
    description: t`Cross-platform and native mobile solutions for iOS and Android.`,
    badges: ['Flutter', 'React Native'],
    features: [
      t`App Store Deployment`,
      t`Push Notifications`,
      t`Offline Capability`,
    ],
  },
  {
    icon: 'handyman',
    title: t`Maintenance & Support`,
    description: t`Ensuring your software stays fast, secure, and up-to-date with 24/7 monitoring.`,
    badges: ['Cloud', 'Security'],
    features: [
      t`Security Patching`,
      t`Cloud Infrastructure`,
      t`Regular Backups`,
    ],
  },
];
