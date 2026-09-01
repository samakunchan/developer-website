import { db } from '../../database/server/db.server';

export async function getLegalMentionsInternal() {
  try {
    return await db.legalMentions.findFirst();
  } catch (error) {
    console.error('Failed to fetch legal mentions:', error);
    return null;
  }
}

// Similar functions for other models
export async function getCGUInternal() {
  return await db.cGU.findFirst();
}

export async function getPrivacyPolicyInternal() {
  return await db.privacyPolicy.findFirst();
}

export async function getCookiePolicyInternal() {
  return await db.cookiePolicy.findFirst();
}
