import { createServerFn } from '@tanstack/react-start';
import {
  getLegalMentionsInternal,
  saveLegalMentionsInternal,
  getCGUInternal,
  saveCGUInternal,
  getPrivacyPolicyInternal,
  savePrivacyPolicyInternal,
  getCookiePolicyInternal,
  saveCookiePolicyInternal,
} from './rich-text-actions.server';
import { zodValidator } from '@tanstack/zod-adapter';
import { z } from 'zod';

const legalSchema = z.object({
  title: z.string(),
  content: z.any(), // Lexical editor state JSON
});

export const getLegalMentions = createServerFn({ method: 'GET' }).handler(async () => {
  return await getLegalMentionsInternal();
});

export const saveLegalMentions = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(legalSchema))
  .handler(async ({ data }) => {
    return await saveLegalMentionsInternal(data.title, data.content);
  });

export const getCGU = createServerFn({ method: 'GET' }).handler(async () => {
  return await getCGUInternal();
});

export const saveCGU = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(legalSchema))
  .handler(async ({ data }) => {
    return await saveCGUInternal(data.title, data.content);
  });

export const getPrivacyPolicy = createServerFn({ method: 'GET' }).handler(async () => {
  return await getPrivacyPolicyInternal();
});

export const savePrivacyPolicy = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(legalSchema))
  .handler(async ({ data }) => {
    return await savePrivacyPolicyInternal(data.title, data.content);
  });

export const getCookiePolicy = createServerFn({ method: 'GET' }).handler(async () => {
  return await getCookiePolicyInternal();
});

export const saveCookiePolicy = createServerFn({ method: 'POST' })
  .inputValidator(zodValidator(legalSchema))
  .handler(async ({ data }) => {
    return await saveCookiePolicyInternal(data.title, data.content);
  });
