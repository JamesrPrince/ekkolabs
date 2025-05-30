import { VercelRequest, VercelResponse } from "@vercel/node";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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
      // Parse query parameters
      const page = parseInt((req.query.page as string) || "1");
      const limit = parseInt((req.query.limit as string) || "10");
      const categorySlug = req.query.category as string | undefined;
      const tagSlug = req.query.tag as string | undefined;

      // Calculate offset
      const skip = (page - 1) * limit;

      // Build where conditions
      const where: {
        published: boolean;
        category?: { slug: string };
        tags?: { some: { slug: string } };
      } = { published: true };

      if (categorySlug) {
        where.category = { slug: categorySlug };
      }

      if (tagSlug) {
        where.tags = { some: { slug: tagSlug } };
      }

      // Get posts with pagination
      const [posts, total] = await Promise.all([
        prisma.post.findMany({
          where,
          include: {
            author: true,
            category: true,
            tags: true,
          },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.post.count({ where }),
      ]);

      return res.status(200).json({
        data: posts,
        pagination: {
          currentPage: page,
          totalPages: Math.ceil(total / limit),
          totalCount: total,
          hasNextPage: page < Math.ceil(total / limit),
          hasPreviousPage: page > 1,
        },
      });
    } catch (error) {
      console.error("Error fetching posts:", error);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
