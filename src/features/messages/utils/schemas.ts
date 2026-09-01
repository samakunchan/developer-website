import { z } from 'zod';

export const serviceEnumSchema = z.enum(['web', 'mobile', 'mvp', 'ai', 'api', 'other']);

export const serviceTypeSchema = z.object({
  id: serviceEnumSchema,
  icon: z.string(),
  label: z.string(),
});

export const priceRangeTypeSchema = z.object({
  id: z.string(),
  currency: z.string(),
  label: z.string(),
});

export const contactFormSchema = z.object({
  fullName: z.string().min(2, 'Name is too short'),
  email: z.email('Invalid email address'),
  serviceType: serviceTypeSchema,
  priceRangeType: priceRangeTypeSchema,
  projectBrief: z.string().min(10, 'Please provide a bit more detail about your project'),
  recaptchaToken: z.string().min(1, 'Captcha token is required'),
});

export type ContactFormInput = z.infer<typeof contactFormSchema>;
