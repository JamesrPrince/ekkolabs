import { VercelRequest, VercelResponse } from "@vercel/node";
import { prisma } from "../../server/db";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const tags = await prisma.tag.findMany({
        include: {
          _count: {
            select: { posts: true },
          },
        },
      });

      return res.status(200).json({ data: tags });
    } catch (error) {
      console.error("Error fetching tags:", error);
      return res.status(500).json({ error: "Failed to fetch tags" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
