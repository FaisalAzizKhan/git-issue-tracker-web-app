import { z } from "zod";

export const AuthSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be under 100 characters"),
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long")
    .max(100, "Password must be under 100 characters"),
});

export type AuthInputSchema = z.infer<typeof AuthSchema>;
