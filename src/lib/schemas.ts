import { z } from 'zod';

export const newsEditSchema = z.object({
  title: z.string().min(1, { message: 'please enter a news title' }),
  category: z.string().min(1, { message: 'please enter a valid news category' }),
  content: z.string()
    .min(10, { message: 'Content must be at least 10 characters' })
    .min(160, { message: 'Message length must be 160 char' }),
  language: z.string().min(1, { message: 'please enter a valid language' }),
  direction: z.string()
    .min(3, { message: 'please enter a valid text direction' })
    .max(3, { message: 'Direction length must be 3 char' })
    .default('ltr'),
  clients: z.array(z.string()).min(1, { message: 'please select a valid client' }),
  mediums: z.array(z.string()).min(1, { message: 'please select a valid medium' }),
  sourceURL: z.string().url({ message: 'Please enter a valid URL' })
});

export const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' })
});

export const registerSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  passwordConfirm: z.string().min(6, { message: 'Password must be at least 6 characters' }),
  name: z.string().min(2, { message: 'Name must be at least 2 characters' })
}).refine((data) => data.password === data.passwordConfirm, {
  message: "Passwords don't match",
  path: ["passwordConfirm"],
});

export type NewsEditForm = z.infer<typeof newsEditSchema>;
export type LoginForm = z.infer<typeof loginSchema>;
export type RegisterForm = z.infer<typeof registerSchema>;