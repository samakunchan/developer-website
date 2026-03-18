import type { LinguiConfig } from '@lingui/conf';

const config: LinguiConfig = {
  locales: ['en-US', 'fr-FR', 'es-ES', 'zh-CN', 'ar-SA'],
  sourceLocale: 'en-US',
  catalogs: [
    {
      path: '<rootDir>/src/locales/{locale}/messages',
      include: ['<rootDir>/src'],
      exclude: ['**/node_modules/**', '**/src/generated/**', '**/*.d.ts'],
    },
  ],
};
export default config;
