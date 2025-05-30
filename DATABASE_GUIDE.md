# Database Management Guide for Ekko Labs

This guide explains how to manage and troubleshoot database configuration for the Ekko Labs portfolio website.

## Database Configuration Overview

The project uses PostgreSQL with Prisma ORM for database management. The configuration includes:

1. **Development**: Local PostgreSQL database
2. **Production**: PostgreSQL database on Neon or similar platform with optional Prisma Accelerate

## Environment Configuration

The database connection is configured through environment variables:

### Local Development

For local development, use a `.env` file with:

```
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ekkolabs"
NODE_ENV=development
```

### Production Environment

For production, configure the environment variables in Vercel:

```
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY_HERE"
NODE_ENV=production
```

Or for direct PostgreSQL connection:

```
DATABASE_URL="postgresql://username:password@hostname:port/database"
NODE_ENV=production
```

## Database Setup

1. Install PostgreSQL locally or use a Docker container
2. Create a database called `ekkolabs`
3. Run the setup script:

```bash
./scripts/setup-database.sh
```

## Prisma Commands

### Generate Prisma Client

After making changes to the schema:

```bash
npx prisma generate
```

### Create Migrations

When you change your schema:

```bash
npx prisma migrate dev --name your-migration-name
```

### Apply Migrations

To apply migrations to your database:

```bash
npx prisma migrate deploy
```

### Seed the Database

```bash
npx tsx prisma/seed.ts
```

### View Database with Prisma Studio

```bash
npx prisma studio
```

## Using Prisma Accelerate (Recommended for Production)

Prisma Accelerate provides connection pooling and caching for better performance with serverless functions.

1. Sign up at [https://cloud.prisma.io](https://cloud.prisma.io)
2. Create a new project and get your API key
3. Set your DATABASE_URL to:
   ```
   DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY_HERE"
   ```
4. Use the `withAccelerate()` extension in your Prisma client:
   ```typescript
   const prisma = new PrismaClient().$extends(withAccelerate());
   ```

## Common Issues and Solutions

### Connection Issues

If you can't connect to the database:

1. Verify that the database URL is correct
2. Check that the database service is running
3. Ensure the database user has proper permissions
4. Verify network connectivity (especially for cloud databases)

### Migration Issues

If migrations fail:

1. Check for schema conflicts with existing data
2. Try running `npx prisma migrate reset` to reset the database (caution: this deletes all data)
3. Check the Prisma migration history for inconsistencies

### Vercel Deployment Issues

For database issues in Vercel:

1. Verify environment variables are set correctly in Vercel dashboard
2. Use Prisma Accelerate to handle connection pooling with serverless functions
3. Check Vercel function logs for specific database errors

## Testing the Database Connection

Run the test script to verify your connection:

```bash
npx tsx scripts/simple-db-test.ts
```

This will verify that your DATABASE_URL is correctly configured and that the database is accessible.
