import { db } from '../../database/server/db.server';
import { ContactFormInput, MessageOutput } from './schemas';
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
    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY;
    if (recaptchaSecret) {
      const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
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

/**
 * Fetch messages from the database with pagination and filters.
 */
export async function getMessagesInternal(params: {
  page: number;
  pageSize: number;
  filter: 'all' | 'read' | 'unread';
  search?: string;
}): Promise<{ messages: MessageOutput[]; total: number; totalPages: number; currentPage: number }> {
  const { page, pageSize, filter, search } = params;
  const skip = (page - 1) * pageSize;

  const where: Prisma.MessageWhereInput = {};

  if (filter === 'read') {
    where.isRead = true;
  } else if (filter === 'unread') {
    where.isRead = false;
  }

  if (search) {
    where.OR = [
      { fullName: { contains: search, mode: 'insensitive' } },
      { email: { contains: search, mode: 'insensitive' } },
      { projectBrief: { contains: search, mode: 'insensitive' } },
    ];
  }

  const [messages, total] = await Promise.all([
    db.message.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      skip,
      take: pageSize,
    }),
    db.message.count({ where }),
  ]);

  return {
    messages: messages.map((m) => ({
      ...m,
      createdAt: m.createdAt.toISOString(),
      updatedAt: m.updatedAt.toISOString(),
    })) as MessageOutput[],
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
  };
}

/**
 * Toggle the read status of a message.
 */
export async function toggleMessageReadInternal(id: number, isRead: boolean): Promise<boolean> {
  try {
    await db.message.update({
      where: { id },
      data: { isRead },
    });
    return true;
  } catch (error) {
    console.error('Error toggling message read status:', error);
    return false;
  }
}

/**
 * Get the total count of unread messages.
 */
export async function getUnreadMessagesCountInternal(): Promise<number> {
  try {
    return await db.message.count({
      where: { isRead: false },
    });
  } catch (error) {
    console.error('Error fetching unread count:', error);
    return 0;
  }
}
