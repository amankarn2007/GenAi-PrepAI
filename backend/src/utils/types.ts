import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3).max(20),
    email: z.string(),
    password: z.string().min(3),
})

export const loginSchema = z.object({
    email: z.string(),
    password: z.string().min(3),
})