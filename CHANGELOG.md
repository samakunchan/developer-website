# CHANGELOG developer-website

## 🚀 0.17.0 - 09/04/2026

### Added

- **Type Safety**: Introduced a dedicated `src/features/theme/utils/theme.types.ts` file to isolate shared types from server-only logic, enabling secure cross-environment type sharing.

### Changed

- **Architecture**: Refactored `theme-actions` and `times-actions` features to strictly adhere to TanStack Start's environment isolation patterns, decoupling RPC bridges from internal server implementations.

### Fixed

- **Import Protection**: Resolved `[import-protection]` warnings triggered in client-side bundles (notably in `__root.tsx`, `admin.settings.themes.tsx`, and `admin.dashboard.tsx`) by eliminating direct imports from restricted `*.server.ts` files.
- **Bug Fix**: Corrected a misaligned database client relative import path in `auth-actions.server.ts`.
- **Cleanup**: Removed redundant debug `console.log` statements from administrative layout files.

## 🚀 0.16.0 - 07/04/2026

### Added

- **Authentication System**: Implemented a custom manual authentication system using **HTTP-Only Cookies** and **JWT (jose)**.
- **Security Hardening**:
  - **Brute-Force Protection**: Added account lockout logic (5 failed attempts = 15-minute lockout) with database persistence.
  - **Open Redirect Protection**: Implemented URL validation to prevent malicious redirects after login.
  - **Environment Security**: Enforced strict `SESSION_SECRET` presence in production environments.
- **Session Management**: Integrated global hydration of session state into the TanStack Router context.

### Changed

- **UI Integration**: Updated `Header` and `login` components to dynamically reflect authentication state and handle secure redirects.
- **Database Schema**: Expanded `User` model in `schema.prisma` with `failedLoginAttempts` and `lockoutUntil` fields.

### Fixed

- **Type Safety**: Resolved Prisma type inconsistencies following the schema migration.

## 🚀 0.15.0 - 04/04/2026

### Added

- **Styling Architecture**: Comprehensive refactoring from hardcoded colors to semantic design tokens in `src/styles/abstracts/_variables.css`.
- **Theme Support**: Implemented deep support for **Default (Teal)**, **Dark**, and **Nature** themes using functional CSS variables.

### Changed

- **Component Refactoring**: Updated all major UI components to consume semantic tokens:
  - `Hero`, `Services`, `Pricing`, `Projects`, `About`, `Process`, `CTA`, `Footer`, `Project Detail`, `Input`, and `Button`.
- **Design System**: Centralized all brand colors, background states, and UI interactions into a cohesive variable-driven system for enhanced maintainability.

### Fixed

- No fixes.

## 🚀 0.14.0 - 01/04/2026

### Added

- **Deployment**: Updated `Dockerfile` to support Nitro build and runtime stages.
- **Server**: Configured production runner stage to execute the application using `node .output/server/index.mjs`.

### Changed

- **Build Pipeline**: Optimized Docker multi-stage build process for smaller production images.
- **Versioning**: Bumped project version to 0.14.0.

### Fixed

- No fixes.

## 🚀 0.13.0 - 31/03/2026

### Added

- **Data Architecture & Modularity**:
  - Established a centralized data layer in `src/core/data` and `src/core/types` to decouple content from UI logic.
  - Defined comprehensive TypeScript interfaces for `Service`, `PricingTier`, `Project`, and `About` data.
- **Components Refactoring**:
  - **Services & Pricing**: Refactored to dynamically render content via `.map()` loops from `servicesData.tsx` and `pricingData.tsx`.
  - **About Page**: Successfully externalized skills and social links into `aboutData.tsx`, streamlining the `About.tsx` component.
  - **Projects Page**:
    - Extracted `ProjectCard` into its own reusable component file.
    - Centralized project category filtering logic in `projectsData.tsx`.

### Changed

- **Code Maintainability**: Significantly reduced component file size and complexity by externalizing static data and sub-components.
- **Versioning**: Bumped project version to 0.13.0.

### Fixed

- **Linting**: Addressed numerous formatting and unused import warnings across the codebase during refactoring.

## 🚀 0.12.0 - 31/03/2026

### Added

- **Project Detail**: Implemented a modern, split-screen layout for project pages.
  - Sticky visual anchor for project images with a pulsing system status badge.
  - Scrollable narrative column featuring technical architecture and functional requirements.
  - Bento-style feature grid with unique icon mapping for each requirement.
- **Data Architecture**:
  - Expanded `Project` interface with `caseStudyNumber`, `techStack`, and detailed `features` metadata.
  - Centralized and enriched project data in `src/data/projects.ts` with comprehensive technical and functional details.
- **Styling**: Created `_project_detail.css` with premium design tokens and integrated it into the core design system for deep project insights.

### Changed

- **Data Management**: Refactored project lists to use English-only content for static metadata while maintaining full UI internationalization.
- **Routing**: Optimized dynamic routing for project case studies using TanStack Router for a more robust experience.
- **Versioning**: Bumped project version to 0.12.0.

### Fixed

- No fixes.

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
