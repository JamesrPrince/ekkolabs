import "dotenv/config";
import express from "express";
import { registerRoutes } from "../server/routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Handle CORS for API requests
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  return next();
});

// Processing middleware for logging
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;

  res.on("finish", () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${path} ${res.statusCode} in ${duration}ms`);
  });

  next();
});

// Initialize routes
registerRoutes(app)
  .then(() => {
    console.log("API routes registered");
  })
  .catch((error) => {
    console.error("Failed to register API routes:", error);
  });

// Error handling
app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    console.error(err);
    res.status(status).json({ message });
  }
);

// Create a serverless function handler for Vercel
import type { VercelRequest, VercelResponse } from "@vercel/node";

// Export for Vercel serverless function
export default function handler(req: VercelRequest, res: VercelResponse) {
  // Forward the request to our Express app
  return new Promise((resolve) => {
    // TypeScript is strict about types, but Express can handle the Vercel request object
    // We need to cast it to 'any' since the types are compatible at runtime but not at compile time
    app(req as any, res as any, () => {
      resolve(undefined);
    });
  });
}
