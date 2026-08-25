import nodemailer from "nodemailer";
import type { ContactInput } from "./contact-schema";

export async function saveContactMessage(input: ContactInput) {
  const gmailUser = process.env.GMAIL_USER || "gurleensingh1608@gmail.com";
  const gmailAppPass = process.env.GMAIL_APP_PASS;

  if (!gmailAppPass) {
    console.error("[contact] GMAIL_APP_PASS is missing in environment variables.");
    throw new Error(
      "Email service is currently awaiting configuration (GMAIL_APP_PASS). Please email gurleensingh1608@gmail.com directly in the meantime.",
    );
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: gmailUser,
      pass: gmailAppPass,
    },
  });

  const serviceContext = input.service
    ? `<p><strong>Service Enquiry:</strong> ${input.service}</p>`
    : "";

  const mailOptions = {
    from: `"Portfolio Contact Form" <${gmailUser}>`,
    to: gmailUser,
    replyTo: `"${input.name}" <${input.email}>`,
    subject: `[Portfolio Inquiry] Message from ${input.name}${input.service ? ` (${input.service})` : ""}`,
    text: `New message from portfolio contact form:\n\nName: ${input.name}\nEmail: ${input.email}\nService: ${input.service || "N/A"}\n\nMessage:\n${input.message}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #e0e0e0; border-radius: 8px;">
        <h2 style="color: #2563eb; margin-top: 0;">New Contact Form Submission</h2>
        <p><strong>Sender Name:</strong> ${input.name}</p>
        <p><strong>Sender Email:</strong> <a href="mailto:${input.email}">${input.email}</a></p>
        ${serviceContext}
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        <p><strong>Message:</strong></p>
        <div style="background-color: #f8fafc; padding: 15px; border-radius: 6px; white-space: pre-wrap; font-size: 15px; color: #334155;">${input.message}</div>
        <hr style="border: none; border-top: 1px solid #eeeeee; margin: 20px 0;" />
        <p style="font-size: 12px; color: #94a3b8;">Sent via Gurleen Singh's AI Studio Portfolio Website</p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { ok: true as const };
  } catch (error) {
    console.error("[contact] Failed to send email via Gmail SMTP:", error);
    throw new Error(
      "Failed to send message via email. Please email gurleensingh1608@gmail.com directly.",
    );
  }
}
