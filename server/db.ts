import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// Initialize Prisma Client
// The connection URL is loaded from the DATABASE_URL environment variable
const prisma = new PrismaClient({
  log:
    process.env.NODE_ENV === "development"
      ? ["query", "error", "warn"]
      : ["error"],
});

// Temporarily disable Accelerate to fix TypeScript issues
// Use Prisma Accelerate conditionally based on connection URL
// Only use it when DATABASE_URL starts with prisma+postgres://
// const prisma = process.env.DATABASE_URL?.startsWith("prisma+postgres://")
//   ? prismaBase.$extends(withAccelerate())
//   : prismaBase;

export { prisma };

// Optional: Add a connection test or health check
async function testConnection() {
  try {
    await prisma.$connect();
    console.log("Successfully connected to the database using Prisma Client.");
    await prisma.$disconnect();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

// You might call this during app startup in development, or rely on Prisma's lazy connection
if (process.env.NODE_ENV === "development") {
  testConnection(); // Test connection on startup in development
}
