import z from 'zod';

export const registerSchema = z
  .object({
    username: z.string().min(5).max(50),
    email: z.email(),
    password: z.string().min(8).max(50),
    confirmPassword: z.string().min(8).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'], // error diarahkan ke field ini
  });

export type RegisterReponse = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8).max(50),
});

export type LoginReponse = z.infer<typeof loginSchema>;
