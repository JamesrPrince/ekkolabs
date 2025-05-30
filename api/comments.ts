import { prisma } from "../server/db";
import type { Request, Response } from "express";
import { authenticate } from "./auth";

// Get comments for a specific post
export const getCommentsForPost = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        postId,
        parentId: null, // Only top-level comments
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
        replies: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                email: true,
                image: true,
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    res.status(200).json({ data: comments });
  } catch (error) {
    console.error("Error fetching post comments:", error);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

// Add a new comment to a post
export const addComment = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { content, parentId } = req.body;
    const userId = req.user?.id || null;

    // Validate post exists
    const post = await prisma.post.findUnique({
      where: { id: postId },
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    // Validate parent comment if provided
    if (parentId) {
      const parentComment = await prisma.comment.findUnique({
        where: { id: Number(parentId) },
      });

      if (!parentComment) {
        return res.status(404).json({ error: "Parent comment not found" });
      }
    }

    // Create the comment
    const newComment = await prisma.comment.create({
      data: {
        content,
        postId,
        authorId: userId,
        parentId: parentId ? Number(parentId) : null,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    res.status(201).json({ data: newComment });
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

// Update a comment
export const updateComment = async (req: Request, res: Response) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const userId = req.user?.id;

    // Find the comment to verify ownership
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user owns this comment or is an admin
    if (comment.authorId !== userId && req.user?.role !== "ADMIN") {
      return res.status(403).json({
        error: "You don't have permission to update this comment",
      });
    }

    // Update the comment
    const updatedComment = await prisma.comment.update({
      where: { id: parseInt(commentId) },
      data: { content, updatedAt: new Date() },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
          },
        },
      },
    });

    res.status(200).json({ data: updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ error: "Failed to update comment" });
  }
};

// Delete a comment
export async function deleteComment(req: Request, res: Response) {
  try {
    const { commentId } = req.params;
    const userId = req.user?.id;

    // Find the comment to verify ownership
    const comment = await prisma.comment.findUnique({
      where: { id: parseInt(commentId) },
    });

    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }

    // Check if the user owns this comment or is an admin
    if (comment.authorId !== userId && req.user?.role !== "ADMIN") {
      return res.status(403).json({
        error: "You don't have permission to delete this comment",
      });
    }

    // Delete any replies first
    await prisma.comment.deleteMany({
      where: {
        parentId: parseInt(commentId),
      },
    });

    // Then delete the comment itself
    await prisma.comment.delete({
      where: { id: parseInt(commentId) },
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ error: "Failed to delete comment" });
  }
}
