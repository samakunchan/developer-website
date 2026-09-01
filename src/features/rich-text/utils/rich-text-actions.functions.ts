import { createServerFn } from '@tanstack/react-start';
import {
  getLegalMentionsInternal,
  getCGUInternal,
  getPrivacyPolicyInternal,
  getCookiePolicyInternal,
} from './rich-text-actions.server';

export const getLegalMentions = createServerFn({ method: 'GET' }).handler(async () => {
  return await getLegalMentionsInternal();
});

export const getCGU = createServerFn({ method: 'GET' }).handler(async () => {
  return await getCGUInternal();
});

export const getPrivacyPolicy = createServerFn({ method: 'GET' }).handler(async () => {
  return await getPrivacyPolicyInternal();
});

export const getCookiePolicy = createServerFn({ method: 'GET' }).handler(async () => {
  return await getCookiePolicyInternal();
});
