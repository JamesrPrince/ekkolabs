import { prisma } from "../server/db";
import { Request, Response } from "express";

// Get all blog posts
export async function getPosts(req: Request, res: Response) {
  try {
    // Parse query parameters
    const page = parseInt((req.query.page as string) || "1");
    const limit = parseInt((req.query.limit as string) || "10");
    const categorySlug = req.query.category as string | undefined;
    const tagSlug = req.query.tag as string | undefined;

    // Calculate offset
    const skip = (page - 1) * limit;

    // Build where conditions
    const where: any = { published: true };

    if (categorySlug) {
      where.category = { slug: categorySlug };
    }

    if (tagSlug) {
      where.tags = { some: { slug: tagSlug } };
    }

    // Get posts with pagination
    const posts = await prisma.post.findMany({
      where,
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        category: true,
        tags: true,
      },
      orderBy: { createdAt: "desc" },
      skip,
      take: limit,
    });

    // Get total count for pagination
    const total = await prisma.post.count({ where });

    return res.status(200).json({
      data: posts,
      meta: {
        currentPage: page,
        pageSize: limit,
        totalItems: total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({
      error: "Failed to fetch blog posts",
    });
  }
}

// Get a single blog post by slug
export async function getPostBySlug(req: Request, res: Response) {
  try {
    const { slug } = req.params;

    const post = await prisma.post.findUnique({
      where: { slug },
      include: {
        author: {
          select: {
            id: true,
            username: true,
            name: true,
            avatar: true,
          },
        },
        category: true,
        tags: true,
      },
    });

    if (!post) {
      return res.status(404).json({
        error: "Blog post not found",
      });
    }

    return res.status(200).json({ data: post });
  } catch (error) {
    console.error("Error fetching post by slug:", error);
    return res.status(500).json({
      error: "Failed to fetch blog post",
    });
  }
}

// Create a new blog post (protected route - would need authentication)
export async function createPost(req: Request, res: Response) {
  try {
    const { title, slug, content, excerpt, published, categoryId, tags } =
      req.body;

    // In a real app, you'd get the author ID from the authenticated user
    const authorId = 1; // Using the admin user created in seed

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt,
        published: published ?? false,
        author: { connect: { id: authorId } },
        category: categoryId ? { connect: { id: categoryId } } : undefined,
        tags: tags
          ? {
              connectOrCreate: tags.map((tag: string) => ({
                where: { name: tag },
                create: {
                  name: tag,
                  slug: tag.toLowerCase().replace(/\s+/g, "-"),
                },
              })),
            }
          : undefined,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });

    return res.status(201).json({ data: post });
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({
      error: "Failed to create blog post",
    });
  }
}
