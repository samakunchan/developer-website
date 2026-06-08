# 🌐 Developer Website

A modern, highly performant, type-safe full-stack developer website built on **TanStack Start** (React 19), styled with **Material UI**, and integrated with **OpenBao** for secure, dynamic secret management.

---

## 🚀 Key Features

- **Full-Stack TanStack Start**: Highly optimized SSR/SPA hybrid architecture powered by React 19, Vite, and Nitro.
- **100% Type-Safe Routing**: Seamless navigations and type safety across all pages using **TanStack Router**.
- **Modern UI & Rich Editing**: Premium component design via **Material UI (MUI)** and Emotion, paired with a custom **Lexical Editor** rich-text environment.
- **Internationalization**: Fully localized application with translation support for 5 different languages powered by **Lingui**.
- **Secure Database Access**: PostgreSQL backend connected with type-safe queries through **Prisma ORM**.
- **Enterprise Secret Management**: Dynamic fetching of sensitive environment variables using **OpenBao AppRole** authentication.
- **Offline AI/ML**: In-browser client-side model running capabilities via `@xenova/transformers`.

---

## 🛠️ Main Technologies & Requirements

### Tech Stack

- **Frontend/Backend**: React 19, TypeScript, TanStack Start (Router + Query)
- **Styling**: Material UI (MUI), Emotion
- **Rich Text**: Lexical Editor
- **Localization**: Lingui v5
- **Database & ORM**: PostgreSQL, Prisma
- **Security & Auth**: Jose (JWT), BcryptJS, reCAPTCHA v3
- **Secret Management**: OpenBao AppRole
- **Task Runner / Build Tools**: Vite, Yarn

### System Requirements

- **Node.js**: v18.x or higher
- **Package Manager**: Yarn (Mandatory, `npm`/`npx` is not supported)
- **Database**: PostgreSQL instance (or Docker)
- **Secrets**: OpenBao server instance

---

## 🔒 OpenBao Secret Management

The application delegates secret management to **OpenBao** (community fork of HashiCorp Vault). Sensitive credentials (such as DB credentials, SMTP settings, etc.) are fetched dynamically at startup/runtime using **AppRole** authentication.

### Required Environment Variables

You must define the following OpenBao coordinates in your local `.env` file:

```bash
# OpenBao Server Coordinates
BAO_ADDR=                 # The address of your OpenBao server (e.g., http://localhost:8200)
BAO_ROLE_ID=              # The AppRole Role ID for authentication
BAO_SECRET_ID=            # The AppRole Secret ID for authentication
BAO_PATH=                 # The key-value store path to fetch (e.g., secret/data/developer-website)

# Application Configuration
ADMIN_EMAIL=               # The email of the admin
ADMIN_PASSWORD=            # The password of the admin
ADMIN_ROLE=                # The role of the admin
ADMIN_USER_NAME=           # The name of the admin
APP_PORT=                  # The port of the application
APP_URL_PROD=              # The URL of the application in production
APP_URL_STAGING=           # The URL of the application in staging
CHOKIDAR_USEPOLLING=       # The polling mode for chokidar
DATABASE_URL=              # The URL of the database
NODE_ENV=                  # The environment of the application
POSTGRES_DB=               # The database name
POSTGRES_HOST=             # The database host
POSTGRES_PASSWORD=         # The password of the database user
POSTGRES_PORT_EXTERNAL=    # The external port of the database
POSTGRES_PORT_INTERNAL=    # The internal port of the database
POSTGRES_USER=             # The username of the database user
POSTGRES_USER_ENCODED=     # The encoded username of the database user
RECAPTCHA_SECRET_KEY=      # The secret key of reCAPTCHA
SESSION_SECRET=           # The secret key of the session
VITE_RECAPTCHA_SITE_KEY=   # The public key of reCAPTCHA
```

> [!NOTE]
> _At startup, the server uses `BAO_ROLE_ID` and `BAO_SECRET_ID` to authenticate against `BAO_ADDR`, obtaining a token to securely fetch application configurations from `BAO_PATH`._

---

## 🌐 Languages Supported

The project uses `@lingui` for localization. It currently supports compilation and translations for:

| Locale Code | Language             | Layout Direction    |
| :---------- | :------------------- | :------------------ |
| **`en-US`** | English              | Left-to-Right (LTR) |
| **`fr-FR`** | French               | Left-to-Right (LTR) |
| **`es-ES`** | Spanish              | Left-to-Right (LTR) |
| **`zh-CN`** | Chinese (Simplified) | Left-to-Right (LTR) |
| **`ar-SA`** | Arabic               | Right-to-Left (RTL) |

---

## ⚙️ Installation & Setup

Ensure your local PostgreSQL and OpenBao servers are running, then follow these steps:

### 1. Install Dependencies

```bash
yarn install
```

### 2. Configure Environment Variables

Copy the template configuration file:

```bash
cp .env.bak .env
```

Open `.env` and fill in your custom credentials (such as your **OpenBao** and local configuration variables).

### 3. Generate Type-Safe Routing

Compile routes using the TanStack Router CLI:

```bash
yarn genroutes
```

### 4. Compile Translations

Extract and compile localization catalogs:

```bash
yarn extract
yarn compile
```

### 5. Database Setup & Prisma Client

Apply database migrations and generate the client:

```bash
yarn prisma db push
yarn prisma generate
```

### 6. Run the Development Server

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) to view the website.

---

## 🧰 Useful Scripts Reference

Run any of the following tasks using `yarn <script>`:

- **`yarn dev`**: Starts the Vite dev server with Hot Module Replacement (HMR).
- **`yarn build`**: Compiles and builds the production bundle.
- **`yarn start`**: Launches the built production server.
- **`yarn genroutes`**: Triggers the TanStack Router code generator.
- **`yarn extract`**: Scans the source code for new text to translate.
- **`yarn compile`**: Compiles translation catalog messages into optimized JS packages.
- **`yarn format`**: Formats all files inside the workspace using Prettier.
- **`yarn lint`**: Lints the codebase using ESLint to enforce best practices.
