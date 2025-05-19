import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// Handle database connection based on environment
const isDevelopment = process.env.NODE_ENV === "development";
const isServerless = process.env.VERCEL === "1";

// For Vercel environment or any other serverless platform
const databaseUrl = process.env.DATABASE_URL;

// Only throw error if not in development and no DATABASE_URL
if (!databaseUrl && !isDevelopment) {
  console.error("Missing DATABASE_URL in production environment");
  // In serverless, we don't want to crash the entire app
  if (!isServerless) {
    throw new Error(
      "DATABASE_URL must be set in production. Did you forget to provision a database?"
    );
  }
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
