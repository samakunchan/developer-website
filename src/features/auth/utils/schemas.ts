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
