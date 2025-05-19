import "dotenv/config";
import { VercelRequest, VercelResponse } from "@vercel/node";
import { serverlessStorage } from "./_db";
import { insertContactMessageSchema } from "../shared/schema";
import nodemailer from "nodemailer";

// Email transporter based on environment
const getEmailTransporter = async () => {
  // Check if we have SMTP settings in environment variables
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: process.env.SMTP_SECURE === "true",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }

  // For development, we'll use a test account
  try {
    const testAccount = await nodemailer.createTestAccount();
    return nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false,
      auth: {
        user: testAccount.user,
        pass: testAccount.pass,
      },
    });
  } catch (error) {
    console.error("Failed to create test email account:", error);
    // Return a placeholder transporter that logs instead of sending
    return {
      sendMail: async (options: any) => {
        console.log("Email would be sent:", options);
        return { messageId: "mock-id" };
      },
    } as any;
  }
};

// Handle the contact form submission
export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({
      success: false,
      message: "Method not allowed, only POST requests are accepted",
    });
  }

  try {
    // Validate incoming data
    const validatedData = insertContactMessageSchema.parse(req.body);

    // Store the message
    const savedMessage = await serverlessStorage.saveContactMessage(
      validatedData
    );

    try {
      // Send email notification
      const transporter = await getEmailTransporter();

      // Send email
      const info = await transporter.sendMail({
        from: '"Portfolio Website" <contact@example.com>',
        to: "prince.chisenga@example.com", // recipient email
        subject: `New contact request: ${validatedData.subject}`,
        text: `
          Name: ${validatedData.name}
          Email: ${validatedData.email}
          Subject: ${validatedData.subject}
          
          Message:
          ${validatedData.message}
        `,
        html: `
          <h2>New Contact Request</h2>
          <p><strong>Name:</strong> ${validatedData.name}</p>
          <p><strong>Email:</strong> ${validatedData.email}</p>
          <p><strong>Subject:</strong> ${validatedData.subject}</p>
          <p><strong>Message:</strong></p>
          <p>${validatedData.message.replace(/\n/g, "<br>")}</p>
        `,
      });

      console.log("Email sent:", info.messageId);
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
      // Continue anyway - we've stored the message
    }

    return res.status(201).json({
      success: true,
      message: "Message received successfully",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return res.status(400).json({
      success: false,
      message: "Invalid form data. Please check your inputs and try again.",
    });
  }
}
