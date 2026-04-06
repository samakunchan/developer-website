import { createStartHandler, defaultRenderHandler } from '@tanstack/react-start/server';
import { i18n } from '@lingui/core';

export default createStartHandler({
  handler: async (ctx) => {
    console.log('🚀 SERVEUR : Initialisation Lingui...');
    // 1. Recover the locale matched by the router
    // This locale is resolved in __root.tsx's beforeLoad and stored in context
    // dire a antigravity de savoir comment utiliser ce code pour voir si ça marhce
    const locale = (ctx.router.state.matches[0]?.context as { locale?: string })?.locale || 'en-US';
    console.log('SERVER LOCAL', locale);

    try {
      // 2. Pre-load Lingui messages for the current request
      const { messages } = await import(`./locales/${locale}/messages.po`);
      i18n.load(locale, messages);
      i18n.activate(locale);
    } catch (e) {
      console.error('Error loading i18n in SSR', e);
    }

    // 3. Render the application
    return defaultRenderHandler(ctx);
  },
});
