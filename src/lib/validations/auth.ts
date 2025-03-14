import { z } from 'zod';
import { SignInFormInput, SignUpFormInput } from '@/lib/types/auth';

export const signInSchema = z.object({
  email: z.string().email({ message: 'Email harus valid' }),
  password: z.string().min(6, { message: 'Password minimal 6 karakter' }),
}) satisfies z.ZodType<SignInFormInput>;


export const signUpSchema = z.object({
  nama: z.string().min(2, {
    message: "Nama minimal 2 karakter",
  }),
  username: z.string().min(3, {
    message: "Username minimal 3 karakter",
  }),
  email: z.string().email({
    message: "Email harus valid",
  }),
  password: z.string().min(6, {
    message: "Password minimal 6 karakter",
  }),
  confirmPassword: z.string().min(6, {
    message: "Password minimal 6 karakter",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords tidak sama",
  path: ["confirmPassword"],
}) satisfies z.ZodType<SignUpFormInput>;

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;