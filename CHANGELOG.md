# CHANGELOG developer-website

## 🚀 0.5.0 - 20/03/2026

### Added

- **Component**: New `Services` component with responsive grid and premium glassmorphism design.
- **Component**: Reusable `ServiceCard` component with support for icons, badges, and features list.
- **Accessibility**: ARIA labels, semantic roles, and improved heading hierarchy (`h2`) for the `Services` component.
- **Localization**: Full translations for the `Services` component in Spanish (es-ES), French (fr-FR), Arabic (ar-SA), and Chinese (zh-CN).

### Changed

- **SEO**: Updated `Services` title from `h3` to `h2` for better SEO structure.
- **Styles**: Added `_services.css` for component-specific styling and integrated into core design system.

### Fixed

- No fixes

### Added

- **Component**: New `Hero` component with customizable layout (image position left/right).
- **Accessibility**: ARIA labels and roles for the `Hero` component and status badge.
- **Localization**: Added support and translations for Chinese (zh-CN), Arabic (ar-SA), and Spanish (es-ES).

### Changed

- **I18n**: Refactored `Hero` component strings to use LinguiJS `t` and `Trans` macros.
- **Hero**: Enhanced `Hero` component with gradient glow effects and pulsing animations.

### Fixed

- No fixes

## 🚀 0.3.0 - 20/03/2026

### Added

- **Localization**: Translation of website title and description using LinguiJS.
- **Internationalization**: Implementation of `<Trans>` macros for navigation links.
- **Localization**: Translation of website aria-label header using LinguiJS.

### Changed

- **Aesthetics**: Full transition from Tailwind CSS to Vanilla CSS for a premium and flexible design system.
- **Style**: Refactored components to use vanilla CSS modules and global styles.

### Fixed

- **SSR**: Resolved infinite reload loop during server-side rendering in `__root.tsx`.
- **Linting**: Enforced semicolon usage in TypeScript files via `@typescript-eslint/semi`.
- **Locale**: Fixed detection and synchronization of i18n between client and server.

## 🚀 0.2.0 - 12/03/2026

### Added

- **SEO**: Comprehensive meta tag implementation (Open Graph, description, robots) across all routes.
- **API**: Image optimization endpoint (`/api/optimize-image`) leveraging `sharp`.

### Changed

- **CORS**: Fixed cross-origin resource sharing issues for project assets.

## 🚀 0.1.0 - 05/03/2026

### Added

- Initial project initialization with TanStack Start.
- Metadata configuration (author: Samakunchan).
- Basic project structure and routing setup.
