import { initPrism } from './core/utils/prism-init';
initPrism();
import { hydrateRoot } from 'react-dom/client';
import { StartClient } from '@tanstack/react-start/client';
import { i18n } from '@lingui/core';

// 1. Extraire la logique de chargement
async function initI18n() {
  // On récupère le locale (ex: cookie, ou lang de l'html envoyé par le serveur)
  const locale = document.documentElement.lang || 'en-US';
  const { messages } = await import(`./locales/${locale}/messages.po`);
  console.log('CLIENT locals ', locale);
  i18n.load(locale, messages);
  i18n.activate(locale);
}

// 2. Attendre l'initialisation avant l'hydratation
initI18n().then(() => {
  hydrateRoot(document, <StartClient />);
});
