# CHANGELOG developer-website
<!-- markdownlint-configure-file { "MD024": { "siblings_only": true } } -->

## 🚀 0.38.0 - 21/07/2026

### Added

- **Rich Text Editor Styles**:
  - Added support for list styling (`ul` with disc, `ol` with decimal) and list item margins in `RichTextEditor.css`.
  - Added CSS classes and integration for inline text formatting styles (`bold`, `italic`, `underline`, `strikethrough`, `underlineStrikethrough`, `code`) in `RichTextEditor.tsx` and `RichTextReadOnly.tsx`.
- **Linter Adjustments**:
  - Configured markdownlint exceptions (`MD024: siblings_only`) inside `CHANGELOG.md`.

### Changed

- **Database Separation**:
  - Extracted database management, schema definitions, and seeding routines into the new dedicated `developer-website-db` repository.
  - Removed database initialization, seeding commands, and schema sync actions (`yarn prisma db push`) from `docker-entrypoint-prod.sh`.
  - Cleaned up VPS compose configurations (`compose-stage.yml`, `compose-prod.yml`) by removing obsolete `postgresdb` service containers and volumes.
  - Adjusted shell scripts (`start-app.sh`, `stop-app.sh`) and environment setup helper (`env-bao.sh`) to eliminate local development database container management, shifting focus to staging/production.
- **Card Design Refactoring**:
  - Replaced `.card--light` styled containers with a dedicated `.card--admin` styling across all profile forms, bento layouts, and project edit panels.
  - Updated card component stylesheet (`card.css`) to define shadow depth on admin cards and updated glassmorphism CTA background settings.

### Fixed

- **Route Configuration**:
  - Corrected administrative routing definitions to point to the `/admin/settings/privacy-policy` endpoint instead of the old `/admin/settings/privacy` route name in `routes-name.ts` and `admin.settings.tsx`.

## 🚀 0.37.0 - 09/06/2026

### Added

- **Prism Preloader for SSR**:
  - Introduced `register-prism.js` to initialize and bind `Prism` globally at Node.js startup.
  - Implemented the `--import ./register-prism.js` flag inside `docker-entrypoint-prod.sh` to prevent `ReferenceError: Prism is not defined` during server-side rendering (SSR) of code highlighting modules.
  - Added `lexical-code-wrapper.ts` to enforce correct bundle evaluation order on both server and client.
  - Copied `register-prism.js` in the `runner` stage of the `Dockerfile`.

### Changed

- N/A

### Fixed

- **SSR Suspense Error (Minified React Error #419)**:
  - Resolved page rendering crashes on `/visitor/cgu` by fixing the underlying Prism runtime ReferenceError on the server.

## 🚀 0.36.0 - 09/06/2026

### Added

- **Database Schema Sync**:
  - Synchronized `schema.prisma` with `developer-website-api` by adding `currentApiSessionId String?` to the `User` model to support database-backed token revocation in API authentication.
  - Regenerated local Prisma client bindings.

### Changed

- N/A

### Fixed

- N/A

## 🚀 0.35.0 - 08/06/2026

### Added

- **Documentation**:
  - Added a comprehensive `README.md` file outlining application architecture, main technologies (React 19, TanStack Start/Query, Lingui, Prisma), system requirements, OpenBao secret management, localization setups, installation guides, and useful script references.
- **Project Typing**:
  - Created a new model-level filter type `ProjectFilter` in `src/core/types/project.ts`.

### Changed

- **Theme Refactoring & Seeding**:
  - Updated default theme fallback behavior to resolve to `light` mode (previously `nature`) if no custom DB configuration is found.
  - Removed the deprecated `nature` option from `ThemeType` definitions.
  - Added automatic theme database seeding (`light` theme setting) across production, staging, and development seed routines.
- **Development Script**:
  - Configured the local `yarn dev` script inside `package.json` to pre-load development environment variables securely using the OpenBao setup script (`. ./shells/env-bao.sh dev`).

## 🚀 0.34.0 - 19/05/2026

### Added

- **Staging Database Seeding (`seed-stage.ts`)**:
  - Created a dedicated `seed-stage.ts` file to handle database seed data in the staging environment, leaving the production seed intact.

### Changed

- **Header Internationalization**:
  - Added translations for missing navigation accessibility controls (`Close menu`, `Open menu`, `Mobile navigation`) in Spanish (`es-ES`), Chinese (`zh-CN`), and Arabic (`ar-SA`).
  - Compiled and generated updated locales catalogs using `yarn compile`.

### Fixed

- **Staging/Production Environment Actions**:
  - Corrected image CDN URL resolver logic in `pictures-actions.server.ts` and password reset callback URLs in `auth-actions.server.ts` to properly inspect staging vs. production environment URLs at runtime.
- **VPS OpenBao Startup Variables**:
  - Resolved environment mapping issues inside `./shells/start-app.sh` so OpenBao credentials resolve correctly in staging.
- **Isometric Background Image 404 & Cleanup**:
  - Resolved relative CSS path bundling issues by consolidating and moving `isometric-concept-design-for-dev.webp` to `public/assets/`.
  - Updated standard style background rules inside `_about.css` to use absolute `/assets/...` paths, eliminating dev-mode and staging compilation path bugs.
  - Removed duplicate root `/assets` directory.

## 🚀 0.33.0 - 13/05/2026

### Added

- **Infrastructure Overhaul (NPM Migration)**:
  - Migrated to an **Nginx Proxy Manager (NPM)** based architecture, enabling seamless hosting of multiple web projects on a single VPS.
  - Refactored production and staging Docker configurations (`compose-prod.yml`, `compose-stage.yml`) with optimized internal networking.
  - Added dedicated `nginx-prod.conf` for high-performance production routing.
  - Introduced automated deployment scripts (`docker-build-stage.sh`) and enhanced unified service management (`start-app.sh`, `stop-app.sh`).
- **SEO & Indexation**:
  - Added `robots.txt` to control search engine crawler behavior and optimize site indexation.

### Changed

- **UI & Accessibility**:
  - Resolved the `APP_NAME` hydration mismatch bug by correctly exposing and utilizing `VITE_APP_NAME`.
  - Significantly overhauled the **Header** component for better responsiveness, accessibility, and interactive design.
  - Refactored the theme system: Renamed 'Nature' to **'Forest'** for clarity and added 'guardian' and 'aegis' variants.
  - Enhanced the **Admin Theme Settings** with logical categorization (Light, Dark, Nature) and real-time active status indicators.
- **Infrastructure**:
  - Updated `env-bao.sh` to centralize OpenBao authentication logic for administrative scripts.

### Fixed

- **Responsive Design**:
  - Fixed multiple layout issues on the front page to ensure a premium experience across all device sizes.
  - Resolved navigation inconsistencies in the header across different locales.
- **Localization**:
  - Refreshed all translation catalogs (`en-US`, `fr-FR`, `es-ES`, `zh-CN`, `ar-SA`) to include the latest UI enhancements.

## 🚀 0.32.0 - 06/05/2026

### Added

- **OpenBao Integration**:
  - Migrated all sensitive credentials (Postgres, Admin, Auth, API Keys) from static `.env` files to a secure **OpenBao (Vault)** instance.
  - Implemented a custom runtime secret loader (`bao.server.ts`) with AppRole authentication.
  - Added support for dynamic secret injection across both development and production environments.
- **Infrastructure Overhaul**:
  - **Modular Docker Orchestration**: Split configuration into `compose.yml` (base), `compose-dev.yml` (dev), and `compose-prod.yml` (prod).
  - **New Bootstrap System**: Created `shells/start-app.sh` and `shells/stop-app.sh` for unified, environment-aware service management.
  - **Shared Helpers**: Created `shells/env-bao.sh` to centralize OpenBao fetching logic for all administrative shell scripts.
- **Themes**:
  - Added support for new 'guardian' and 'aegis' themes.
  - Updated theme selection logic to default to 'light' mode.

### Changed

- **Development Workflow**:
  - Refactored dev mode to a "hybrid" model: Docker manages only the database (on port 5435), while the application runs natively on the host Mac via `yarn dev`.
  - Removed redundant environment variables from base `compose.yml` and dev overrides.
- **Database Tooling**:
  - Updated `prisma-seed.sh`, `prisma-reset-database.sh`, and `prisma-gen-push-force.sh` to be fully OpenBao-native.
- **Security**:
  - Cleaned up local `.env`, `docker.env`, and `docker-prod.env` files, leaving only empty templates.
  - Updated `.gitignore` to protect against accidental commits of legacy environment files.

### Fixed

- **Docker Production Build**:
  - Resolved `sharp` module architecture conflicts by implementing a Linux-native build step in the `Dockerfile`.
  - Fixed database connection issues in production by ensuring all necessary environment variables are correctly inherited from OpenBao.
  - Resolved "empty host in database URL" errors in production containers.
- **Cleanup**:
  - Removed redundant volumes and services from the base `compose.yml`.
  - Standardized healthcheck logic across environments.

## 🚀 0.31.0 - 05/05/2026

### Added

- **Password Reset System**:
  - Implemented a complete "Forgot Password" and "Reset Password" flow for enhanced account security.
  - Integrated **Nodemailer** for professional email delivery via SMTP.
  - Added a "Smart Transporter" with automatic **Ethereal Email** support for zero-configuration development testing.
  - Created dedicated routes: `/forgot-password` (Dev only) and `/reset-password`.
  - Built premium MUI-based UI components for reset requests and secure password updates.
- **Security**:
  - Implemented secure 32-byte random token generation with a 1-hour expiration window.
  - Protection against user enumeration by providing generic success feedback.
  - Token validation logic ensures tokens are one-time use and expire correctly.

### Changed

- **Login UX**:
  - Integrated "Forgot password?" actions directly into the login form.
  - Optimized production workflow: In production, the "Forgot password?" link triggers an automatic reset email to the admin, streamlining the process for single-user portfolios.
- **Email Branding**:
  - Standardized the "From" address and branding for all automated system emails.

### Fixed

- **Styles**:
  - Fixed minor padding and formatting inconsistencies in the message workspace.
  - Cleaned up unused `useState` imports and refined TypeScript event types (`React.SubmitEvent`).

## 🚀 0.30.0 - 03/05/2026

### Added

- **Admin Message Workspace**:
  - Redesigned the admin messages dashboard into a professional, three-pane workspace inspired by "DevMail".
  - Implemented real-time search filtering for messages by name, email, or project brief.
  - Added message navigation arrows and position counters (e.g., "Message 1 of 42").
  - Integrated unread message status tracking in the database and sidebar UI.
- **Localization**:
  - Implemented full localization for the `ContactMe.tsx` component.
  - Added multi-language support for success states ("Message Sent!") and placeholders.
  - Completed translation catalogs for `fr-FR`, `es-ES`, `zh-CN`, and `ar-SA`.
- **Infrastructure**:
  - Added `react-google-recaptcha-v3` for future contact form security.
  - Created a robust `prisma-seed.sh` shell script for environment-aware database seeding and trigger management.
  - Added `seed-test-messages.ts` for high-volume message testing (100+ messages).

### Changed

- **Theme System**:
  - Refactored themes into a "Nature" family: `Nature (Forest)`, `Nature (Ocean)`, `Nature (Desert)`.
  - Standardized theme naming across the admin settings and footer.
- **Admin UX**:
  - Refactored administrative components to use a centralized `Button` component for styling consistency.
  - Optimized real-time counter synchronization using TanStack Query invalidation.
  - Enhanced `DetailPane` and `ListPane` with improved glassmorphism and layout logic.

### Fixed

- **Styles**:
  - Fixed search input alignment and formatting in `_admin_search.css`.
  - Corrected padding and border inconsistencies in the admin sidebar.
- **Data Flow**:
  - Resolved synchronization lag where the unread message counter didn't update immediately after marking as read.

## 🚀 0.29.0 - 01/05/2026

### Added

- **Themes**:
  - Added new `ocean` theme.
  - Added new `light` theme.
  - Added new `desert` theme.
- **Routing**:
  - Implemented new routes and added redirection to projects.
- **UI/UX**:
  - Added new loading components and states.
- **Component**
  - Added a simple loading component for the front page.

### Changed

- **About Page**:
  - Updated the About page section.
- **Footer**:
  - Updated the Footer component to include links to the new themes.
- **Routes naming**:
  - Added route names variables to avoid repetition and make it easier to maintain.

### Fixed

- **Styles**:
  - Fixed card hover effect in `nature` mode.
- **About page**:
  - Fix login requirement to see the about front page.

## 🚀 0.28.0 - 29/04/2026

### Added

- **Legal Documents & Visitor Routes**:
  - Created public routes for `visitor.cgu`, `visitor.privacy-policy`, `visitor.cookie-policy`, and `visitor.legal-mentions`.
  - Integrated data fetching from the database to dynamically display these policies.
- **Admin Management**:
  - Added administrative interfaces for updating legal documents.

### Changed

- **Footer Navigation**:
  - Updated the global `Footer` component to include accessible links to all visitor legal routes.

### Fixed

- No fixes.

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
