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
