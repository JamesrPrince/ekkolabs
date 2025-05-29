import { PrismaClient } from '@prisma/client';
import { hash } from '@node-rs/bcrypt'; // Using @node-rs/bcrypt for better cross-platform support

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Seeding database...');
    
    // Create admin user if it doesn't exist
    const adminExists = await prisma.user.findUnique({
      where: { username: 'admin' }
    });
    
    if (!adminExists) {
      console.log('Creating admin user...');
      await prisma.user.create({
        data: {
          username: 'admin',
          password: await hash('Admin123!', 10), // Change this in production!
          name: 'Admin User',
          email: 'admin@ekkolabs.com'
        }
      });
      console.log('Admin user created');
    }
    
    // Create categories
    const categories = [
      {
        name: 'Data Analysis',
        slug: 'data-analysis',
        description: 'Articles about data analysis techniques and tools'
      },
      {
        name: 'Business Consulting',
        slug: 'business-consulting',
        description: 'Articles about business consulting and strategy'
      },
      {
        name: 'Technology',
        slug: 'technology',
        description: 'Articles about technology trends and innovations'
      }
    ];
    
    for (const category of categories) {
      await prisma.category.upsert({
        where: { slug: category.slug },
        update: {},
        create: category
      });
    }
    console.log('Categories created');
    
    // Create some initial tags
    const tags = [
      { name: 'JavaScript', slug: 'javascript' },
      { name: 'TypeScript', slug: 'typescript' },
      { name: 'React', slug: 'react' },
      { name: 'Node.js', slug: 'nodejs' },
      { name: 'SQL', slug: 'sql' }
    ];
    
    for (const tag of tags) {
      await prisma.tag.upsert({
        where: { slug: tag.slug },
        update: {},
        create: tag
      });
    }
    console.log('Tags created');
    
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
