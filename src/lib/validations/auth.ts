import { z } from 'zod';
import { SignInFormInput, SignUpFormInput } from '@/types/auth';

export const signInSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
}) satisfies z.ZodType<SignInFormInput>;


export const signUpSchema = z.object({
  nama: z.string().min(3, {
    message: "Nama must be at least 3 characters long",
  }),
  username: z.string().min(3, {
    message: "Username must be at least 3 characters long",
  }),
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters long",
  }),
  confirmPassword: z.string().min(6, {
    message: "Confirm password must be at least 6 characters long",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
}) satisfies z.ZodType<SignUpFormInput>;

export type SignInSchemaType = z.infer<typeof signInSchema>;
export type SignUpSchemaType = z.infer<typeof signUpSchema>;