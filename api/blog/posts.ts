import { VercelRequest, VercelResponse } from "@vercel/node";
import { getPosts } from "../blog";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    return getPosts(req as any, res as any);
  }

  return res.status(405).json({ error: "Method not allowed" });
}
