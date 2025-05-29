import { PrismaClient } from "@prisma/client";
import { withAccelerate } from "@prisma/extension-accelerate";

async function main() {
  console.log("Testing database connection...");

  const prisma = new PrismaClient().$extends(withAccelerate());

  try {
    // Test the connection with a simple query
    console.log("Checking for database connectivity...");
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log("Connection successful!", result);

    // Count users
    const userCount = await prisma.user.count();
    console.log(`Found ${userCount} users in the database`);

    // Count contact messages
    const messageCount = await prisma.contactMessages.count();
    console.log(`Found ${messageCount} contact messages in the database`);

    // Count blog posts
    const postCount = await prisma.post.count();
    console.log(`Found ${postCount} blog posts in the database`);

    // Get all categories
    const categories = await prisma.category.findMany();
    console.log(`Found ${categories.length} categories:`);
    categories.forEach((category) => {
      console.log(`  - ${category.name} (${category.slug})`);
    });

    // Get all tags
    const tags = await prisma.tag.findMany();
    console.log(`Found ${tags.length} tags:`);
    tags.forEach((tag) => {
      console.log(`  - ${tag.name}`);
    });
  } catch (error) {
    console.error("Error connecting to the database:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
