import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "../shared/schema";

// Configure Neon for serverless environments
neonConfig.webSocketConstructor = ws;

// Create a simple memory storage as a fallback
const memoryStore: { [key: string]: any[] } = {
  messages: [],
};

// Get database URL from environment variables
const databaseUrl = process.env.DATABASE_URL;

// Initialize database connection if URL is available
let pool: Pool | null = null;
let db: ReturnType<typeof drizzle> | null = null;

if (databaseUrl) {
  try {
    pool = new Pool({ connectionString: databaseUrl });
    db = drizzle({ client: pool, schema });
    console.log("Database connection established");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

// Create a simplified storage interface for serverless functions
export const serverlessStorage = {
  async saveContactMessage(message: any) {
    try {
      if (db) {
        // Use database if available
        const now = new Date().toISOString();
        const messageWithTimestamp = { ...message, createdAt: now };
        const results = await db
          .insert(schema.contactMessages)
          .values(messageWithTimestamp)
          .returning();
        return results[0];
      } else {
        // Fallback to memory storage
        const id = memoryStore.messages.length + 1;
        const newMessage = {
          id,
          ...message,
          createdAt: new Date().toISOString(),
        };
        memoryStore.messages.push(newMessage);
        return newMessage;
      }
    } catch (error) {
      console.error("Error saving message:", error);
      // Always return something to prevent the function from failing
      return {
        id: 0,
        ...message,
        createdAt: new Date().toISOString(),
        _error: "Failed to save to database, but message was received",
      };
    }
  },
};
