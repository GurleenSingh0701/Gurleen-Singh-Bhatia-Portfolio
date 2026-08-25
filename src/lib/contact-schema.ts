import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(1, "Please tell me your name").max(100, "That name is too long"),
  email: z
    .string()
    .trim()
    .email("That email doesn't look right")
    .max(255, "That email is too long"),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail helps — at least 10 characters")
    .max(5000, "Please keep it under 5000 characters"),
  service: z.string().trim().max(80).optional().nullable(),
});

export type ContactInput = z.infer<typeof contactSchema>;
