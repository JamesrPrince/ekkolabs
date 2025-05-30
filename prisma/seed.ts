import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs"; // Use bcryptjs instead of @node-rs/bcrypt

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("Seeding database...");

    // Create admin user if it doesn't exist
    const adminExists = await prisma.user.findUnique({
      where: { email: "admin@ekkolabs.com" },
    });

    if (!adminExists) {
      console.log("Creating admin user...");
      await prisma.user.create({
        data: {
          username: "admin",
          password: await bcrypt.hash("Admin123!", 10), // Change this in production!
          name: "Admin User",
          email: "admin@ekkolabs.com",
          role: "ADMIN",
        },
      });
      console.log("Admin user created");
    }

    // Create regular user for testing
    const testUserExists = await prisma.user.findUnique({
      where: { email: "user@example.com" },
    });

    if (!testUserExists) {
      console.log("Creating test user...");
      await prisma.user.create({
        data: {
          username: "testuser",
          password: await bcrypt.hash("Password123!", 10),
          name: "Test User",
          email: "user@example.com",
          role: "USER",
        },
      });
      console.log("Test user created");
    }

    // Create categories
    const categories = [
      {
        name: "Data Analysis",
        slug: "data-analysis",
        description: "Articles about data analysis techniques and tools",
      },
      {
        name: "Business Consulting",
        slug: "business-consulting",
        description: "Articles about business consulting and strategy",
      },
      {
        name: "Technology",
        slug: "technology",
        description: "Articles about technology trends and innovations",
      },
    ];

    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category,
      });
    }
    console.log("Categories created");

    // Create some initial tags
    const tags = [
      { name: "JavaScript", slug: "javascript" },
      { name: "TypeScript", slug: "typescript" },
      { name: "React", slug: "react" },
      { name: "Node.js", slug: "nodejs" },
      { name: "SQL", slug: "sql" },
    ];

    for (const tag of tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag,
      });
    }
    console.log("Tags created");

    // Create some sample blog posts if they don't exist
    const adminUser = await prisma.user.findUnique({
      where: { email: "admin@ekkolabs.com" },
    });

    if (adminUser) {
      const dataAnalysisCategory = await prisma.category.findUnique({
        where: { slug: "data-analysis" },
      });

      const technologyCategory = await prisma.category.findUnique({
        where: { slug: "technology" },
      });

      // Sample post 1
      const post1Exists = await prisma.post.findUnique({
        where: { slug: "getting-started-with-data-analysis" },
      });

      if (!post1Exists) {
        console.log("Creating sample blog post 1...");
        await prisma.post.create({
          data: {
            title: "Getting Started with Data Analysis",
            slug: "getting-started-with-data-analysis",
            excerpt: "A beginner's guide to data analysis with modern tools.",
            content:
              "# Getting Started with Data Analysis\n\nData analysis is the process of inspecting, cleansing, transforming, and modeling data with the goal of discovering useful information, informing conclusions, and supporting decision-making.\n\n## Key Steps in Data Analysis\n\n1. **Data Collection**: Gather data from relevant sources\n2. **Data Cleaning**: Remove errors and inconsistencies\n3. **Data Exploration**: Understand patterns and relationships\n4. **Data Modeling**: Apply statistical models\n5. **Interpretation**: Draw conclusions from results\n\n## Essential Tools\n\n- Python (with pandas, numpy, matplotlib)\n- R Programming Language\n- SQL for database queries\n- Tableau or Power BI for visualization\n\nLearning these tools will set you on the path to becoming a proficient data analyst.",
            published: true,
            authorId: adminUser.id,
            categoryId: dataAnalysisCategory?.id || undefined,
            tags: {
              connect: [{ slug: "sql" }],
            },
          },
        });
      }

      // Sample post 2
      const post2Exists = await prisma.post.findUnique({
        where: { slug: "modern-web-development-with-react" },
      });

      if (!post2Exists) {
        console.log("Creating sample blog post 2...");
        await prisma.post.create({
          data: {
            title: "Modern Web Development with React",
            slug: "modern-web-development-with-react",
            excerpt:
              "Learn how to build modern web applications with React and TypeScript.",
            content:
              "# Modern Web Development with React\n\nReact has revolutionized the way we build web applications, making them more maintainable, scalable and performant.\n\n## Why React?\n\n- Component-based architecture\n- Virtual DOM for efficient updates\n- Rich ecosystem and community\n- Great developer experience\n\n## Getting Started\n\nFirst, create a new React app with TypeScript:\n\n```bash\nnpx create-react-app my-app --template typescript\n```\n\n## Key Concepts\n\n- Components and Props\n- State Management\n- Hooks (useState, useEffect, useContext)\n- Routing with React Router\n\nMastering these concepts will help you build powerful web applications that users love.",
            published: true,
            authorId: adminUser.id,
            categoryId: technologyCategory?.id || undefined,
            tags: {
              connect: [
                { slug: "react" },
                { slug: "javascript" },
                { slug: "typescript" },
              ],
            },
          },
        });
      }
    }

    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
