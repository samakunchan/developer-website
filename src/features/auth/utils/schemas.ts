import { z } from 'zod';

export const signInSchema = z.object({
  email: z.email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export type SessionType = {
  user: {
    id: number;
    email: string;
    name: string | null;
    role: string;
  };
};

export type SignInInput = z.infer<typeof signInSchema>;

export type PayloadSessionType = {
  sub: string;
  email: string;
  role: string;
  name: string | null;
  sessionId: string;
} | null;

export type UserInputDto = { id: number; email: string; role: string; name: string | null };

export const forgotPasswordSchema = z.object({
  email: z.email('Invalid email address'),
});

export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;

export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, 'Token is required'),
    password: z.string().min(8, 'Password must be at least 8 characters long'),
    confirmPassword: z.string().min(8, 'Confirm password must be at least 8 characters long'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
