import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactMessageSchema } from "@shared/schema";
import nodemailer from "nodemailer";

// For development, we'll use a test account
const getTestTransporter = async () => {
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
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Contact form submission endpoint
  app.post("/api/contact", async (req, res) => {
    try {
      // Validate incoming data
      const validatedData = insertContactMessageSchema.parse(req.body);
      
      // Store the message
      const savedMessage = await storage.saveContactMessage(validatedData);
      
      try {
        // Send email notification (in real production this would use real SMTP credentials)
        const transporter = await getTestTransporter();
        
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
            <p>${validatedData.message.replace(/\n/g, '<br>')}</p>
          `,
        });
        
        console.log("Email sent:", info.messageId);
        console.log("Preview URL:", nodemailer.getTestMessageUrl(info));
      } catch (emailError) {
        console.error("Error sending email notification:", emailError);
        // Continue anyway - we've stored the message
      }
      
      res.status(201).json({ success: true, message: "Message received successfully" });
    } catch (error) {
      console.error("Contact form error:", error);
      res.status(400).json({ 
        success: false, 
        message: "Invalid form data. Please check your inputs and try again." 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
