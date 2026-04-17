import { db } from '../../database/server/db.server';

export async function getLegalMentionsInternal() {
  try {
    return await db.legalMentions.findFirst();
  } catch (error) {
    console.error('Failed to fetch legal mentions:', error);
    return null;
  }
}

export async function saveLegalMentionsInternal(title: string, content: string) {
  try {
    // We assume there is only one record for legal mentions for now
    const first = await db.legalMentions.findFirst();
    if (first) {
      return await db.legalMentions.update({
        where: { id: first.id },
        data: { title, content },
      });
    } else {
      return await db.legalMentions.create({
        data: { title, content },
      });
    }
  } catch (error) {
    console.error('Failed to save legal mentions:', error);
    throw error;
  }
}

// Similar functions for other models
export async function getCGUInternal() {
  return await db.cGU.findFirst();
}

export async function saveCGUInternal(title: string, content: string) {
  const first = await db.cGU.findFirst();
  if (first) {
    return await db.cGU.update({ where: { id: first.id }, data: { title, content } });
  }
  return await db.cGU.create({ data: { title, content } });
}

export async function getPrivacyPolicyInternal() {
  return await db.privacyPolicy.findFirst();
}

export async function savePrivacyPolicyInternal(title: string, content: string) {
  const first = await db.privacyPolicy.findFirst();
  if (first) {
    return await db.privacyPolicy.update({ where: { id: first.id }, data: { title, content } });
  }
  return await db.privacyPolicy.create({ data: { title, content } });
}

export async function getCookiePolicyInternal() {
  return await db.cookiePolicy.findFirst();
}

export async function saveCookiePolicyInternal(title: string, content: string) {
  const first = await db.cookiePolicy.findFirst();
  if (first) {
    return await db.cookiePolicy.update({ where: { id: first.id }, data: { title, content } });
  }
  return await db.cookiePolicy.create({ data: { title, content } });
}
