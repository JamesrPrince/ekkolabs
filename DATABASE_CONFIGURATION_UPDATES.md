# Database Configuration Update

This document explains the updates made to the database configuration for the Ekko Labs project.

## Configuration Overview

The project now has a standardized database configuration that works seamlessly between development and production environments:

1. **Development**: Local PostgreSQL database
2. **Production**: PostgreSQL with optional Prisma Accelerate for better serverless performance

## Key Files

The following files have been updated or created:

1. **`.env`** - Local development configuration with PostgreSQL
2. **`.env.production`** - Production configuration with Prisma Accelerate
3. **`.vercelenv`** - Build-time placeholder environment variables for Vercel
4. **`server/db.ts`** - Updated to conditionally use Prisma Accelerate
5. **`scripts/validate-db-connection.sh`** - New script to validate database connections

## Using Prisma Accelerate

Prisma Accelerate is now conditionally used based on your connection string:

- If your `DATABASE_URL` starts with `prisma+postgres://`, Prisma Accelerate is automatically used
- If your `DATABASE_URL` starts with `postgresql://`, a direct connection is used

## Environment Setup

### Local Development

```bash
# Use local PostgreSQL
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/ekkolabs"
NODE_ENV=development
```

### Production Environment

```bash
# Use Prisma Accelerate (recommended for serverless)
DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=YOUR_API_KEY_HERE"
NODE_ENV=production
```

## Vercel Deployment

When deploying to Vercel:

1. Set `DATABASE_URL` in the Vercel environment variables (Settings > Environment Variables)
2. Use the Prisma Accelerate URL format for better serverless performance
3. The `.vercelenv` file is only used during build time, not at runtime

## Database Validation

You can validate your database connection using:

```bash
./scripts/validate-db-connection.sh
```

This script will:

- Check that your DATABASE_URL is properly formatted
- Test the database connection
- Provide troubleshooting steps if the connection fails

## Troubleshooting

If you encounter database connection issues:

1. Verify that PostgreSQL is running locally for development
2. Check that your database credentials are correct
3. For Prisma Accelerate, verify your API key is valid
4. Run the validation script to diagnose issues
