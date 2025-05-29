import { prisma } from "../server/db"; // Import prisma instance from server/db.ts

// Create a simplified storage interface for serverless functions
export const serverlessStorage = {
  async saveContactMessage(message: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    try {
      const result = await prisma.contactMessages.create({
        data: {
          ...message,
          // createdAt is handled by @default(now()) in schema.prisma
        },
      });
      return result;
    } catch (error) {
      console.error("Error saving contact message:", error);
      // Consider how to handle errors. Re-throwing or returning a specific error object might be better.
      // For now, returning a similar structure to the old fallback for consistency, but with an error flag.
      return {
        ...message,
        id: 0, // Indicate failure or a non-persistent state
        createdAt: new Date().toISOString(), // Or null, or omit
        _error: "Failed to save to database.",
        _originalError: error instanceof Error ? error.message : String(error),
      };
    }
  },
};
