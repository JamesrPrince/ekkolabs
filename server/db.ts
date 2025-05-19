import { Pool, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// In development mode, use a mock database connection if DATABASE_URL is not set
const isDevelopment = process.env.NODE_ENV === "development";
const databaseUrl =
  process.env.DATABASE_URL ||
  (isDevelopment
    ? "postgresql://user:password@localhost:5432/mydb"
    : undefined);

if (!databaseUrl) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?"
  );
}

export const pool = new Pool({ connectionString: databaseUrl });
export const db = drizzle({ client: pool, schema });
