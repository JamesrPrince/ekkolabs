# Vercel Deployment Troubleshooting Guide

This document provides solutions for common issues you might encounter when deploying this portfolio site to Vercel.

## Common Issues and Solutions

### 1. API Routes Not Working

**Symptoms:** Contact form submissions fail, API endpoints return 404 errors.

**Solutions:**

- Verify your Vercel project is configured with the correct framework preset (Node.js)
- Check that the `/api` directory is at the root of your project
- Ensure all API files export a default function with the correct signature:
  ```typescript
  export default function handler(req: VercelRequest, res: VercelResponse) {
    // Your handler code
  }
  ```
- Check rewrites in vercel.json to ensure API routes are correctly handled:
  ```json
  "rewrites": [
    { "source": "/api/(.*)", "destination": "/api/$1" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
  ```
- Fix type mismatches between VercelRequest and Express.Request types using type casting:
  ```typescript
  app(req as any, res as any, () => {
    resolve(undefined);
  });
  ```
- Check for API route errors in the Vercel Function Logs
- Test your API endpoint directly: `https://your-site.vercel.app/api/health`

### 2. Database Connection Issues

**Symptoms:** API calls that require database access fail with 500 errors.

**Solutions:**

- Make sure your DATABASE_URL environment variable is set in the Vercel project settings
- Check that the database is accessible from Vercel's servers (not localhost or behind a firewall)
- Ensure your PostgreSQL database allows external connections
- Check your database connection string format: `postgresql://username:password@hostname:port/database`
- Use the serverless-optimized database clients (like @neondatabase/serverless)

### 3. Environment Variables Not Available

**Symptoms:** Features that depend on environment variables don't work.

**Solutions:**

- Add all required environment variables in Vercel's project settings:
  - DATABASE_URL
  - SMTP_HOST, SMTP_USER, SMTP_PASS (for email functionality)
- Make sure you're not using `.env` files in production (Vercel doesn't use these)
- Prefix client-side environment variables with `VITE_` (e.g., `VITE_API_URL`)

### 4. Build Failures

**Symptoms:** Deployment fails during the build process.

**Solutions:**

- Check Vercel build logs for specific errors
- Make sure all dependencies are correctly listed in package.json
- Verify that your build script in package.json is correct
- Run `npm run build` locally to test before deploying
- Check that you're not exceeding Vercel's build limitations

### 5. Static Assets Not Loading

**Symptoms:** Images, CSS, or other assets fail to load.

**Solutions:**

- Make sure assets are imported correctly in your code
- For images, use relative imports or the public directory
- Check file paths and case sensitivity
- Verify that the assets are being included in the build output

## Testing Deployment Locally

Before deploying to Vercel, you can test your production build locally:

```bash
# Build the project
npm run build

# Serve the production build
npx serve -s dist
```

## Getting Support

If you continue to experience issues, you can:

1. Check the Vercel documentation: https://vercel.com/docs
2. Review Vercel's function logs in your project dashboard
3. Use the Vercel CLI for more detailed debugging: `vercel logs`
