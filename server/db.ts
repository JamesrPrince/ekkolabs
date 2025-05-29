import { PrismaClient } from "@prisma/client/edge"; // Import from @prisma/client/edge for Vercel
import { withAccelerate } from "@prisma/extension-accelerate";

// Initialize Prisma Client with Accelerate
// The connection URL is loaded from the DATABASE_URL environment variable
const prisma = new PrismaClient().$extends(withAccelerate());

export { prisma };

// Optional: Add a connection test or health check
async function testConnection() {
  try {
    await prisma.$connect();
    console.log(
      "Successfully connected to the database using Prisma Accelerate."
    );
    await prisma.$disconnect();
  } catch (error) {
    console.error("Failed to connect to the database:", error);
  }
}

// You might call this during app startup in development, or rely on Prisma's lazy connection
if (process.env.NODE_ENV === "development") {
  // testConnection(); // Uncomment to test connection on startup
}
