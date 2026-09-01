import { db } from '../../database/server/db.server';
import { ContactFormInput } from './schemas';
import { Prisma } from '@prisma/client';
import { getRequestHeaders } from '@tanstack/react-start/server';

/**
 * Submit a new contact message to the database.
 */
export async function submitMessageInternal(data: ContactFormInput): Promise<{ success: boolean; messageId?: number }> {
  const headers = getRequestHeaders();
  const origin = headers.get('origin');
  const host = headers.get('host');

  if (process.env.NODE_ENV === 'production' && origin && host && !origin.includes(host)) {
    console.error('Potential CSRF detected:', { origin, host });
    return { success: false };
  }

  // reCAPTCHA verification
  try {
    const recaptchaSecret: string | undefined = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      const response: Response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${data.recaptchaToken}`,
      });

      const recaptchaData = await response.json();

      if (!recaptchaData.success || recaptchaData.score < 0.5) {
        console.error('reCAPTCHA verification failed:', recaptchaData);
        return { success: false };
      }
    }
  } catch (error) {
    console.error('Error verifying reCAPTCHA:', error);
    return { success: false };
  }

  try {
    const newMessage = await db.message.create({
      data: {
        fullName: data.fullName,
        email: data.email,
        serviceType: data.serviceType as Prisma.InputJsonValue,
        priceRangeType: data.priceRangeType as Prisma.InputJsonValue,
        projectBrief: data.projectBrief,
      },
    });

    return { success: true, messageId: newMessage.id };
  } catch (error) {
    console.error('Error submitting message:', error);
    return { success: false };
  }
}
