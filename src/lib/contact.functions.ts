import { createServerFn } from "@tanstack/react-start";
import { contactSchema } from "./contact-schema";
import { saveContactMessage } from "./contact.server";

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }) => saveContactMessage(data));
