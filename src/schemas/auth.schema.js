import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "Username Required",
  }),
  email: z
    .string({ required_error: "Email Required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password Required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});

export const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid Email" }),
  password: z
    .string({ required_error: "Password is required" })
    .min(6, { message: "Password must be at least 6 characters" }),
});
