import { createMiddleware } from '@tanstack/react-start';

export const localeTzMiddleware = createMiddleware().server(async ({ next, request }) => {
  // Detect locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language');
  let locale = 'en-US';

  if (acceptLanguage) {
    // Basic extraction of the first locale entry
    const match = acceptLanguage.split(',')[0].split(';')[0].trim();
    if (match) locale = match;
  }

  // Since browsers don't send a standard timezone header,
  // we default to UTC or allow a custom header if provided.
  const timeZone = request.headers.get('x-timezone') || 'UTC';

  return next({
    context: {
      locale,
      timeZone,
    },
  });
});
