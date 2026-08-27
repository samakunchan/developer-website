import type { ReactNode } from 'react';
import { Suspense } from 'react';
import { QueryClient } from '@tanstack/react-query';
import { Outlet, createRootRouteWithContext, HeadContent, Scripts } from '@tanstack/react-router';
import { QueryClientProvider } from '@tanstack/react-query';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';
import { i18n } from '@lingui/core';
import { t } from '@lingui/core/macro';
import { I18nProvider } from '@lingui/react';
import '../styles/main.css';

import { ErrorComponent, ErrorType } from '../components/ErrorComponent';

import { SessionType, getSession } from '../features/auth';
import { getTheme, ThemeType } from '../features/theme';
import { supportedLocales, fetchServerLocale } from '../features/l10n';

interface RootLoaderData {
  locale: string;
  isI18nReady: boolean;
  session: SessionType | null;
  theme: ThemeType;
}

async function getInitialLocale(): Promise<string> {
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

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
}>()({
  notFoundComponent: () => <ErrorComponent type={ErrorType.NotFound} />,
  beforeLoad: async (): Promise<RootLoaderData> => {
    const locale: string = await getInitialLocale();
    const theme: ThemeType = await getTheme();
    const session: SessionType | null = await getSession();

    try {
      const { messages } = await import(`../locales/${locale}/messages.po`);
      i18n.load(locale, messages);
      i18n.activate(locale);
      return { locale, isI18nReady: true, session, theme };
    } catch (e) {
      console.error('Failed to load locale in beforeLoad', e);
      return { locale, isI18nReady: false, session, theme };
    }
  },
  loader: async ({ context }) => {
    return {
      locale: context.locale,
      isI18nReady: context.isI18nReady,
      session: context.session,
      theme: context.theme,
    };
  },
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
        { title: t`Samakunchan Technology` },
        {
          name: 'description',
          content: t`Default description of the website`,
        },
        { name: 'robots', content: 'index, follow' },
        { property: 'og:title', content: t`Samakunchan Technology` },
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
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider i18n={i18n}>
        <RootDocument>
          <Outlet />
          <Suspense fallback={null}>
            <TanStackRouterDevtools />
          </Suspense>
        </RootDocument>
      </I18nProvider>
    </QueryClientProvider>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  const { locale, theme }: RootLoaderData = Route.useRouteContext();

  return (
    <html lang={locale} className={theme}>
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
