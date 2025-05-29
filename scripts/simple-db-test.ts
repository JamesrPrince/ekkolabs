// Load environment variables from .env
import * as dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

async function main() {
  try {
    console.log("Testing Prisma connection...");
    console.log(
      `DATABASE_URL is ${process.env.DATABASE_URL ? "set" : "not set"}`
    );

    // Initialize Prisma client with Accelerate
    const prisma = new PrismaClient().$extends(withAccelerate());

    // Get user count
    const userCount = await prisma.user.count();
    console.log(`User count: ${userCount}`);

    // Get all categories
    const categories = await prisma.category.findMany();
    console.log(`Categories: ${categories.length}`);
    categories.forEach((c) => console.log(`- ${c.name}`));

    console.log("Database connection successful!");
  } catch (error) {
    console.error("Error connecting to database:", error);
  }
}

main();
