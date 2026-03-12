import { z } from "zod";

export const SignupSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(6, "Email must be at least 6 characters long")
    .max(100, "Email must be under 100 characters"),
  first_name: z
    .string()
    .min(3, "first_name must be at least 1 characters long")
    .max(100, "first_name must be under 100 characters"),
  last_name: z
    .string()
    .min(1, "last_name must be at least 3 characters long")
    .max(100, "last_name must be under 100 characters"),
  phone: z
    .string()
    .min(6, "phone must be at least 6 characters long")
    .max(100, "phone must be under 100 characters")
    .optional(),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be under 100 characters"),
});

export type SignupInputSchema = z.infer<typeof SignupSchema>;
