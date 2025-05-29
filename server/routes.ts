import type { Express } from "express";
import { createServer, type Server } from "http";
import {
  createTransport,
  createTestAccount,
  getTestMessageUrl,
} from "nodemailer";
import type { SendMailOptions, SentMessageInfo } from "nodemailer";

import { prisma } from "./db";
import { storage } from "./storage";
import { getPosts, getPostBySlug, createPost } from "../api/blog";

// Email transporter based on environment
const getEmailTransporter = async () => {
  // Check if we have SMTP settings in environment variables
  if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
    return createTransport({
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
    const testAccount = await createTestAccount();
    return createTransport({
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
      sendMail: async (options: SendMailOptions) => {
        console.log("Email would be sent:", options);
        return { messageId: "mock-id" } as SentMessageInfo;
      },
    };
  }
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Basic validation
      const { name, email, subject, message } = req.body;
      if (!name || !email || !subject || !message) {
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }

      // Save to database
      const contactData = { name, email, subject, message };
      await storage.saveContactMessage(contactData);

      // Send email notification (if configured)
      const transporter = await getEmailTransporter();
      const info = await transporter.sendMail({
        from: '"Contact Form" <contact@ekkolabs.com>',
        to: process.env.CONTACT_EMAIL || "admin@ekkolabs.com",
        subject: `New Contact Form: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `<p><strong>Name:</strong> ${name}</p>
               <p><strong>Email:</strong> ${email}</p>
               <p><strong>Message:</strong> ${message}</p>`,
      });

      console.log("Message sent: %s", info.messageId);

      // For test accounts, log the URL where the message can be viewed
      if (process.env.NODE_ENV === "development") {
        try {
          // Using type assertion as a workaround since we know the structure is compatible
          const url = getTestMessageUrl(info as unknown as SentMessageInfo);
          if (url) {
            console.log("Preview URL:", url);
          }
        } catch (err) {
          console.log("Could not get test message URL");
        }
      }

      res.status(200).json({
        success: true,
        message: "Thank you for your message. We'll be in touch soon!",
      });
    } catch (error) {
      console.error("Error processing contact form:", error);
      res.status(500).json({
        success: false,
        message:
          "Sorry, we couldn't process your message. Please try again later.",
      });
    }
  });

  // Blog API routes
  app.get("/api/blog/posts", getPosts);
  app.get("/api/blog/posts/:slug", getPostBySlug);
  app.post("/api/blog/posts", createPost);

  // Add blog category routes
  app.get("/api/blog/categories", async (_req, res) => {
    try {
      const categories = await prisma.category.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
      });

      res.status(200).json({ data: categories });
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ error: "Failed to fetch categories" });
    }
  });

  // Add blog tags routes
  app.get("/api/blog/tags", async (_req, res) => {
    try {
      const tags = await prisma.tag.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
      });

      res.status(200).json({ data: tags });
    } catch (error) {
      console.error("Error fetching tags:", error);
      res.status(500).json({ error: "Failed to fetch tags" });
    }
  });

  // Create HTTP server for the Express app
  return createServer(app);
}
