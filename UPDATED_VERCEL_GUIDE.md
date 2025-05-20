# Updated Vercel Deployment Guide

This document provides updated solutions for deploying the portfolio site to Vercel, including recent fixes for common issues.

## Key Configuration Changes Made

### 1. Fixed TypeScript Type Mismatch in API Handler

We had an issue where the Express app couldn't process the Vercel Request/Response types. This was fixed by using type casting:

```typescript
// In api/index.ts
export default function handler(req: VercelRequest, res: VercelResponse) {
  return new Promise((resolve) => {
    // Cast to 'any' to work around type incompatibility
    app(req as any, res as any, () => {
      resolve(undefined);
    });
  });
}
```

### 2. Updated Rewrites in vercel.json

We improved API routing in vercel.json by prioritizing API routes:

```json
"rewrites": [
  { "source": "/api/(.*)", "destination": "/api/$1" },
  { "source": "/(.*)", "destination": "/index.html" }
]
```

### 3. Fixed Build Output Directory

Vite configuration was updated to output directly to `dist` instead of `dist/public`:

```typescript
// In vite.config.ts
build: {
  outDir: path.resolve(import.meta.dirname, "dist"),  // Changed from "dist/public"
  emptyOutDir: true,
}
```

### 4. Added Serverless-optimized Database Connection

We created a serverless-friendly database handler that works in Vercel Functions:

```typescript
// In api/_db.ts
export const serverlessStorage = {
  async saveContactMessage(message: any) {
    // Implementation with memory fallback
  },
};
```

### 5. Updated Client API Requests

Client-side API requests were updated to work correctly in both development and production:

```typescript
// Get the base URL for API calls
const baseUrl =
  process.env.NODE_ENV === "production"
    ? window.location.origin // Use the deployed site's origin in production
    : ""; // Use relative URLs in development
```

## Debugging Tips

1. **Check API Endpoints**: Use the `/api/health` endpoint to verify serverless functions are working.

2. **Enhanced Deployment Script**: Use our improved deploy-vercel.sh script which now includes:

   - Type checking of API handlers
   - Local build verification
   - Environment variable copying

3. **Vercel Function Logs**: Check the Function Logs in your Vercel dashboard for detailed error information.

4. **Database Connectivity**: Make sure your NeonDB instance allows connections from Vercel's IP ranges.

## Deployment Process

1. Make sure all changes are committed to GitHub
2. Run the deployment script: `./deploy-vercel.sh`
3. Check the Vercel deployment logs for any issues
4. Test the deployed site, especially API endpoints
5. Verify environment variables are set correctly in Vercel

## Common Issues After Deployment

1. **405 Method Not Allowed**: Check API method handling (GET vs POST)
2. **CORS Errors**: Make sure your CORS headers are set correctly in vercel.json
3. **Database Timeouts**: The serverless environment may have connection limitations

If you encounter other issues, refer to the Vercel documentation or check our VERCEL_TROUBLESHOOTING.md file for more solutions.
