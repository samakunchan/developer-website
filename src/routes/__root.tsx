import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { Outlet, createRootRoute, HeadContent, Scripts } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { i18n } from '@lingui/core';
import { t } from '@lingui/core/macro';
import { I18nProvider } from '@lingui/react';
import '../styles/main.css';

import { createServerFn } from '@tanstack/react-start';
import { ErrorComponent, ErrorType } from '../components/ErrorComponent';

import { SessionType } from '../features/auth/utils/schemas';
import { getSession } from '../features/auth/utils/auth-actions.functions';

interface RootLoaderData {
  locale: string;
  isI18nReady: boolean;
  session: SessionType | null;
}
const supportedLocales: string[] = ['en-US', 'fr-FR', 'es-ES', 'zh-CN', 'ar-SA'];

const fetchServerLocale = createServerFn({ method: 'GET' }).handler(async () => {
  try {
    const { getRequestHeader } = await import('@tanstack/react-start/server');

    const acceptLang: string | undefined = getRequestHeader('accept-language');
    if (acceptLang) {
      const parsed: string = acceptLang.split(',')[0].split(';')[0].trim();
      if (supportedLocales.includes(parsed)) return parsed;
      const base: string = parsed.split('-')[0];
      const matchLocale: string | undefined = supportedLocales.find((l) => l.startsWith(base + '-'));
      if (matchLocale) return matchLocale;
    }
  } catch {
    // getRequestHeader might not be available or imported
  }
  return 'en-US';
});

async function getInitialLocale() {
  if (typeof document !== 'undefined') {
    // Client-side detection
    const navigatorLocale: string = navigator.language;
    if (supportedLocales.includes(navigatorLocale)) return navigatorLocale;
    const browserBase: string = navigatorLocale.split('-')[0];
    const matchLocale: string | undefined = supportedLocales.find((l) => l.startsWith(browserBase + '-'));
    return matchLocale || 'en-US';
  }

  // Server-side detection via RPC function
  return await fetchServerLocale();
}

export const Route = createRootRoute({
  notFoundComponent: () => <ErrorComponent type={ErrorType.NotFound} />,
  beforeLoad: async (): Promise<RootLoaderData> => {
    const locale: string = await getInitialLocale();
    const session: SessionType | null = await getSession();

    try {
      const { messages } = await import(`../locales/${locale}/messages.po`);
      i18n.load(locale, messages);
      i18n.activate(locale);
      return { locale, isI18nReady: true, session };
    } catch (e) {
      console.error('Failed to load locale in beforeLoad', e);
      return { locale, isI18nReady: false, session };
    }
  },
  loader: async ({ context }) => context,
  component: RootComponent,
  head: (params) => {
    const loaderData = params.loaderData as RootLoaderData | undefined;
    if (!loaderData?.isI18nReady) {
      return {
        meta: [
          { charSet: 'utf-8' },
          { name: 'viewport', content: 'width=device-width, initial-scale=1' },
          { title: 'Loading...' },
        ],
      };
    }
    return {
      meta: [
        { charSet: 'utf-8' },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, viewport-fit=cover, maximum-scale=5',
        },
        { title: t`Developer Website` },
        {
          name: 'description',
          content: t`Default description of the website`,
        },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: t`Developer Website` },
        {
          property: 'og:description',
          content: t`Default description of the website`,
        },
        { property: 'og:type', content: 'website' },
      ],
      links: [],
    };
  },
});

function RootComponent() {
  return (
    <I18nProvider i18n={i18n}>
      <RootDocument>
        <Outlet />
        <Suspense fallback={null}>
          <TanStackRouterDevtools />
        </Suspense>
      </RootDocument>
    </I18nProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { locale }: { locale: string } = Route.useRouteContext();

  return (
    <html lang={locale} className="nature">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
