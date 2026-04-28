# CHANGELOG developer-website

## 🚀 0.27.0 - 29/04/2026

### Added

- No new features.

### Changed

- **Page About**:
  - Display user profile data.
  - Display user tech stacks.
  - Display user social links.
- **Data & Source Management**:
  - Migrated project and about data to a new source management utility.
  - Updated configurations across environment compose files.
- **Locale Optimization**:
  - Enhanced readability of locale message files by standardizing whitespace and indentation formatting.

### Fixed

- No fixes.

## 🚀 0.26.0 - 28/04/2026

### Added

- **Dynamic Versioning**:
  - Integrated dynamic version retrieval from `package.json` into the admin sidebar.
  - Added environment mode detection (Dev/Production) to the version display.

### Changed

- **Internationalization & Localization**:
  - Completed missing translations across all supported locales (`fr-FR`, `es-ES`, `zh-CN`, `ar-SA`).
  - Refactored `AdminSidebarPrimary`, `admin.settings`, and `admin.profiles` routes to utilize Lingui macros (`<Trans>`, `t`) for comprehensive coverage.
- **Admin Navigation UX**:
  - Migrated the "Admin Dashboard" navigation from a standard link to a styled action button in the main `Header`.
  - Streamlined public visibility by hiding legacy login paths from primary header actions.

### Fixed

- No fixes.

## 🚀 0.25.0 - 28/04/2026

### Added

- **Session Revocation Architecture**:
  - Implemented the Stateful Hybrid Session Revocation strategy to prevent unauthorized reuse of compromised tokens.
  - Added a nullable `currentSessionId` field to the Prisma `User` model.
  - Extended `PayloadSessionType` in `schemas.ts` to enforce continuous UUID tracking.

### Changed

- **Authentication Logic**:
  - Configured `signInInternal` to securely map distinct lifecycle identifiers.
  - Hardened token verification parameters.
  - Refactored data transfer objects leveraging `UserInputDto` protocols.

### Fixed

- No fixes.

## 🚀 0.24.0 - 26/04/2026

### Added

- **Standalone `pictures` Feature**:
  - Created an isolated image management architecture for centralized uploading, scaling, and purging.
  - Introduced multi-tier image payload dimension handling (e.g. `tiny`, `medium`, and `raw` optimizations).

### Changed

- **Modular Delegations**:
  - Overhauled the `projects` feature to route data through standard `uploadPicture` abstractions.
  - Refactored the `profiles` backend, migrating offline asset transformations over to dedicated tools.
- **Proxy & Docker Infrastructure**:
  - Updated configurations across proxy vectors (`vite.config.ts`, `nginx.conf`) enabling dynamic directory parameters (`/cdn/projects/*`, `/cdn/me/*`).
  - Optimized continuous Docker runtime parameters for standardized cache isolation.

### Fixed

- Eliminated obsolete legacy module definitions (`sharp`, `path`, `fs`) to maintain strict bundle constraints.

## 🚀 0.23.0 - 23/04/2026

### Added

- **Global Search System**:
  - Implemented an advanced hybrid search system combining semantic vector similarity (pgvector) with keyword matching (ILIKE).
  - Integrated local vector inference using `Xenova/all-MiniLM-L6-v2` for privacy-first, server-side embedding generation.
  - Added support for deep indexing of tech stacks for both projects (JSONB arrays) and users (relational tables).
  - Implemented category-aware search and filtering (e.g., "Project - Web", "User - admin").
  - Added real-time database triggers for automatic search index synchronization across `projects`, `users`, and `tech_stacks` tables.

### Changed

- **Admin UI**:
  - Enhanced the `AdminSearchbar` with a premium dark-themed results panel, including sticky headers and category labeling.
  - Implemented interactive search results with direct navigation to project editors.
  - Optimized search input with debouncing and click-outside dismissal logic.
- **Backend Infrastructure**:
  - Upgraded search utilities to support background embedding regeneration via content change detection.
  - Refactored server actions to ensure strict environment isolation and RPC security.

### Fixed

- **Search Accuracy**: Resolved issues with partial keyword matches by implementing a hybrid scoring system.
- **Real-time Sync**: Fixed a synchronization lag where tech stack updates were not immediately reflected in the global search index.

## 🚀 0.22.0 - 18/04/2026

### Added

- **UI/UX Refinements**:
  - Integrated a loading spinner during project image uploads to provide visual feedback on asynchronous operations.
  - Implemented a "Project List Empty" widget with skeletal card placeholders for improved empty state aesthetics in the admin panel.
  - Added dynamic user data (name and avatar) to the `AdminToolbar` with real-time refresh capabilities.
- **TanStack Query Integration**:
  - Installed and configured `@tanstack/react-query` to manage server state and caching.
  - Implemented `QueryClientProvider` at the root level and integrated it with TanStack Router context for seamless data fetching.
- **Documentation**:
  - Created `react-query.md` reference guide to centralize TanStack Query best practices and image synchronization patterns.

### Changed

- **CSS Architecture**:
  - Finalized the migration of all remaining hardcoded inline styles to a modular, BEM-compliant CSS structure across all administrative routes.
  - Standardized component styling using CSS variables (`--color-background`, `--color-card`) for consistent theme support.
- **State Management**:
  - Optimized the mutation flow for profile and project images by implementing explicit cache invalidation, ensuring immediate UI updates without manual reloads.
- **Feature Refactoring**:
  - Completed the migration of administration modules (`profiles`, `settings`, `analytics`) into a strictly-typed, feature-based architecture within `src/features`.
  - Standardized component entry points and internal folder structures to improve maintainability and architectural clarity.

### Fixed

- **Data Synchronization**: Resolved a bug where profile and project image changes were not reflected in the UI until a manual page refresh.
- **Code Quality**: Fixed multiple linting and formatting issues introduced during the CSS refactoring process.

## 🚀 0.21.0 - 17/04/2026

### Added

- **Project Editor Refactor**:
  - Split the monolithic `ProjectEditor.tsx` into specialized components: `ProjectCreateForm` (guided 3-step stepper) and `ProjectEditForm` (dashboard-style editor).
  - Introduced `ProjectFormSections.tsx` to centralize shared form UI and logic.
  - Added `AdminSidebarImage` to the Project Edit view for enhanced visual management of project assets.
- **Routing**:
  - Refined administrative routes (`admin.projects.new` and `admin.projects.$projectId.edit`) to consume specialized form components.

### Changed

- **Data Flow & UX**:
  - Integrated `router.invalidate()` across project form mutations to ensure immediate UI synchronization after create/update operations.
  - Improved form validation feedback using `useForm` with integrated Zod schema.

### Fixed

- **Type Safety**: Eliminated "Unexpected any" linting errors in `projects-actions.server.ts` by defining explicit types for project updates.
- **Data Integrity**: Resolved a Zod validation bug by correctly initializing `techIcons` as an empty array, preventing submission failures.
- **Image Handling**: Fixed an edge case in the project update flow where new images were not properly persistent after being moved from the temporary folder.

## 🚀 0.20.0 - 13/04/2026

### Added

- **Profiles**: Added profiles image upload feature with specific path to "public/shared/me" and added "public/shared/seed" for default images.
- **Feature Modularization**: Established centralized entry points (`index.ts`) for all major features (`auth`, `database`, `profiles`, `rich-text`, `theme`, `times`) to improve architectural boundaries.
- **Environment Isolation**: Refactored the database feature to isolate `db.server.ts` into a dedicated server-only directory, improving security and preventing client-side leaks.

### Changed

- **Toolbar**: Updated the toolbar to display the new profile image.
- **About Page**: Updated the about page to display the new profile image.
- **Infrastructure**: Completed the migration to **Yarn** by removing legacy `package-lock.json`.
- **Profiles Feature**: Significantly updated the profile management system, including refined schemas and enhanced server-side validation logic.
- **Admin Dashboard**: Updated the administrative interface and profile overview routes to support the new feature-based architecture.

### Fixed

- **Developer Experience**: Resolved a package name collision with a code-pruning tool by explicitly using `@tanstack/router-cli` for route generation.
- **Bug Fixes**: Corrected server-side import paths and resolved TanStack router hydration issues across multiple administrative routes.

## 🚀 0.19.0 - 12/04/2026

### Added

- **Profiles**: Added profiles feature (routes, components, actions, schemas).
- **CSS Modularization**: Refactored the monolithic `admin-profiles.css` into a suite of modular component stylesheets (`_visual_identity.css`, `_social_links.css`, `_tech_stack.css`, `_profile_avatar_card.css`, and `_quick_settings_card.css`) for better separation of concerns.
- **Layout System**: Introduced shared layout utilities (`_grid.css`) and reusable admin profile classes (`.admin-profiles__v-stack`, `.admin-profiles__empty-state`) to unify dashboard design patterns.

### Changed

- **Code Hardening**: Performed a global audit of profile form components to eliminate hardcoded inline styles, replacing them with semantic, design-token-based CSS classes.
- **Refactoring**: Consolidated profile management logic and updated internal import paths to reflect the new feature-based structure.
- **Efficiency**: Optimized the `admin-profiles.css` page stylesheet by removing unused legacy classes and duplicate CSS rules.

### Fixed

- **UI Consistency**: Standardized the visual presentation of "Empty State" dashboards and form action buttons across all administrative modules.

## 🚀 0.18.0 - 09/04/2026

### Added

- **Rich-Text Editor**: Integrated the **Lexical** rich-text editor framework for managing complex legal documents.
- **Admin Features**:
  - Implemented new administration routes for **CGU** and **Cookie Policy** management.
  - Added dedicated sidebar navigation links for all legal document types.
- **Persistence Layer**: Established server functions for automated saving of Lexical editor states (JSON) into the Prisma database.

### Changed

- **Architecture**: Generalized the `legal` feature into a reusable `rich-text` feature directory to support future rich-text requirements.
- **Refactoring**: Renamed `LegalEditor` to `RichTextEditor` and updated all internal component logic to be model-agnostic.
- **UI/UX**: Refined the editor's design system integration by replacing ad-hoc styles with design tokens (input background, border variables).
- **Component Styling**: Migrated the editor save button to the centralized `Button` component for visual consistency.

### Fixed

- **Assets**: Corrected relative image and font paths in `_fonts.css` to properly resolve assets from the `public` directory.
- **Type Safety**: Replaced generic `any` types with the official Lexical `EditorState` class in the `RichTextEditor` component.

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
