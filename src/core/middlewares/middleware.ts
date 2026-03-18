import { createMiddleware } from '@tanstack/react-start';

export const localeTzMiddleware = createMiddleware().server(
  async ({ next, request }) => {
    const cookieHeader = request.headers.get('cookie');
    let locale = 'en-US';
    let timeZone = 'UTC';

    if (cookieHeader) {
      const cookies = Object.fromEntries(
        cookieHeader.split('; ').map((c) => c.split('=')),
      );
      if (cookies.locale) locale = cookies.locale;
      if (cookies.tz) timeZone = cookies.tz;
    }

    return next({
      context: {
        locale,
        timeZone,
      },
    });
  },
);
