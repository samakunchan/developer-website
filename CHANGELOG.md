# CHANGELOG developer-website

## 🚀 0.11.0 - 30/03/2026

### Added

- **Animations**: Integrated `react-intersection-observer` to enable premium scroll-triggered entrance animations across key sections.
- **Component**:
  - `Hero`: Added smooth fade-in and slide-up animations when entering the viewport.
  - `CTA`: Implemented intersection-based visibility for call-to-action sections.
  - `Process`: Integrated scroll-triggered animations for the terminal mockup and workflow steps.
- **Dependencies**: Added `react-intersection-observer` to the project's core dependencies.

### Changed

- **Versioning**: Bumped project version to 0.11.0.
- **Git**: Updated `.gitignore` to better handle environment and build-specific files like `.tanstack`.

### Fixed

- **Styles**: Fixed social icon color inheritance in the `About` component (GitHub, LinkedIn, and Upwork icons now correctly use `fill-current` and hover states).
- **Types**: Resolved minor TypeScript type inconsistencies in component props.

## 🚀 0.10.0 - 26/03/2026

### Added

- **route**: New `/projects` route for the projects page.
- **Component**:
  - `Projects` component with responsive grid and premium glassmorphism design.
  - `ProjectCard` component with support for icons, badges, and features list.
- **Localization**: Full internationalization for the Projects page UI (Hero, Header, and CTA sections).
- **Localization**: Added missing translations for French (fr-FR), Spanish (es-ES), Chinese (zh-CN), and Arabic (ar-SA).

### Changed

- **Navigation**: Updated Header menu items to "Projects", "About", and "Service&pricing" for a more professional look.
- **Versioning**: Bumped project version to 0.10.0.
- **I18n**: Compiled all message catalogs with the latest Projects page content using LinguiJS.

### Fixed

- No fixes.

## 🚀 0.9.0 - 25/03/2026

### Added

- **Route**: New `/about` route for the developer profile and technical expertise.
- **Component**:
  - `About` component featuring structured "About Me", "Technical Proficiency", and "Connect with me" sections.
  - Premium developer illustration with background fading and glow effects for a high-end visual experience.
- **Localization**: Full translation of the About page for all 5 supported locales (en-US, fr-FR, es-ES, zh-CN, ar-SA).

### Changed

- **Navigation**: Updated Header menu to include a direct link to the About page.
- **Versioning**: Bumped project version to 0.9.0.
- **I18n**: Compiled all message catalogs (fr-FR, es-ES, zh-CN, ar-SA) with the latest About page content.

### Fixed

- No fixes.

## 🚀 0.8.0 - 24/03/2026

### Added

- **Route**: New `/services` route providing detailed information about specialized services and pricing.
- **Component**:
  - `Pricing` component with 3-tier support (Basic, Pro, Enterprise), featuring glassmorphism and modern CTAs.
  - `Services` grid section within the services page for categorical expertise display.
- **Localization**: Full translation of the Service & Pricing page for all 5 supported locales (en-US, fr-FR, es-ES, zh-CN, ar-SA).

### Changed

- **Component**:
  - Refactored `Hero` component to support optional images and center-aligned layouts for text-only pages.
  - Standardized "Contact me" CTA strings across all components for unified translation management.
- **Localization**: Improved structural phrasing for "Flexible Plans" in all languages (e.g., `<0>Planes Flexibles</0>`, `<0>Plans Flexibles</0>`) to ensure consistent premium styling.
- **Styles**: Integrated `_pricing.css` into the core design system.
- **Versioning**: Bumped project version to 0.8.0.

### Fixed

- **I18n**: Resolved a localized string rendering issue on the Services page that caused some translations to be ignored.

## 🚀 0.7.0 - 24/03/2026

### Added

- No addes.

### Changed

- **Navigation**: Updated Header menu items to "Projects", "About", and "Service&pricing" for a more professional look.
- **Localization**: Updated translation catalogs for all supported locales (en-US, fr-FR, es-ES, zh-CN, ar-SA).
- **Versioning**: Bumped project version to 0.7.0.

### Fixed

- No fixes.

## 🚀 0.6.0 - 24/03/2026

### Added

- **Component**:
  - New `Process` section component featuring a premium terminal mockup with syntax highlighting.
  - New `CTA` (Call to Action) section with gradient glow effects and glassmorphism.
  - New `Footer` component with brand logo, copyright, and social media links.
- **Localization**: Added full translations for the new `Process`, `CTA`, and `Footer` sections in Arabic (ar-SA), Spanish (es-ES), French (fr-FR), and Chinese (zh-CN).
- **Localization**: Updated translations for the `Maintenance & Support` section in `index.tsx`.

### Changed

- **Versioning**: Bumped project version to 0.6.0.
- **I18n**: Ran `yarn extract` and `yarn compile` to update all message catalogs.
- **Styles**:
  - Added `_process.css` to the main design system.
  - Added `_cta_.css` to the main design system.
  - Added `_footer_.css` to the main design system.

### Fixed

- **I18n**: Resolved missing translations for workflow and service descriptions across all supported locales.

## 🚀 0.5.0 - 20/03/2026

### Added

- **Component**: New `Services` component with responsive grid and premium glassmorphism design.
- **Component**: Reusable `ServiceCard` component with support for icons, badges, and features list.
- **Accessibility**: ARIA labels, semantic roles, and improved heading hierarchy (`h2`) for the `Services` component.
- **Localization**: Full translations for the `Services` component in Spanish (es-ES), French (fr-FR), Arabic (ar-SA), and Chinese (zh-CN).
- **Component**: New `Hero` component with customizable layout (image position left/right).
- **Accessibility**: ARIA labels and roles for the `Hero` component and status badge.
- **Localization**: Added support and translations for Chinese (zh-CN), Arabic (ar-SA), and Spanish (es-ES).

### Changed

- **SEO**: Updated `Services` title from `h3` to `h2` for better SEO structure.
- **Styles**: Added `_services.css` for component-specific styling and integrated into core design system.
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
