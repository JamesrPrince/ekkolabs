/**
 * Blog utility functions
 */

import { readingTime } from "./utils";

// Define Post interface to replace 'any' types
export interface BlogPost {
  id?: string;
  title?: string;
  excerpt?: string | null;
  content?: string;
  createdAt?: string;
  updatedAt?: string;
  slug?: string;
  published?: boolean;
  author?: BlogAuthor | null;
  category?: BlogCategory | null;
  tags?: BlogTag[];
  readTime?: string;
}

export interface BlogAuthor {
  id?: string;
  name?: string;
  image?: string | null;
  avatar?: string | null;
}

export interface BlogCategory {
  id?: string | number;
  name?: string;
  slug?: string;
}

export interface BlogTag {
  id?: string | number;
  name?: string;
  slug?: string;
}

/**
 * Normalizes a blog post by ensuring all required fields have values
 * and providing fallbacks for optional fields that might be missing
 *
 * @param post The blog post to normalize
 * @returns Normalized blog post with all required fields
 */
export function normalizePost(post: BlogPost | null | undefined) {
  if (!post) return null;

  return {
    ...post,
    // Ensure required fields exist with defaults if missing
    title: post.title || "Untitled Post",
    excerpt:
      post.excerpt ||
      extractExcerptFromContent(post.content) ||
      "No excerpt available",
    slug: post.slug || "untitled-post",
    createdAt: post.createdAt || new Date().toISOString(),
    updatedAt: post.updatedAt || post.createdAt || new Date().toISOString(),
    published: typeof post.published === "boolean" ? post.published : true,

    // Handle author data correctly
    author: normalizeAuthor(post.author),

    // Ensure category data is normalized
    category: post.category || {
      id: "uncategorized",
      name: "Uncategorized",
      slug: "uncategorized",
    },

    // Ensure tags is always an array
    tags: Array.isArray(post.tags) ? post.tags : [],

    // Calculate read time if not provided
    readTime:
      post.readTime ||
      (post.content ? calculateReadTime(post.content) : "2 min read"),
  };
}

/**
 * Normalizes author data, ensuring avatar/image consistency
 */
function normalizeAuthor(author: BlogAuthor | null | undefined): BlogAuthor {
  if (!author) {
    return {
      id: "anonymous",
      name: "Anonymous",
      image: null,
    };
  }

  return {
    ...author,
    name: author.name || "Anonymous",
    // Use image field if available, otherwise use avatar
    image: author.image || author.avatar || null,
  };
}

/**
 * Extracts a short excerpt from content if none is provided
 */
function extractExcerptFromContent(content: string): string | null {
  if (!content) return null;

  // Strip markdown headings and formatting
  const plainText = content
    .replace(/#{1,6}\s+/g, "") // Remove headings
    .replace(/(\*\*|__)(.*?)\1/g, "$2") // Remove bold
    .replace(/(\*|_)(.*?)\1/g, "$2") // Remove italic
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Remove links but keep text
    .replace(/```[\s\S]*?```/g, "") // Remove code blocks
    .replace(/`([^`]+)`/g, "$1"); // Remove inline code

  // Get first paragraph or first 150 characters
  const firstParagraph = plainText.split("\n\n")[0];
  if (firstParagraph && firstParagraph.length > 20) {
    return firstParagraph.length > 150
      ? firstParagraph.substring(0, 147) + "..."
      : firstParagraph;
  }

  // Fallback to first 150 chars
  return plainText.length > 150
    ? plainText.substring(0, 147) + "..."
    : plainText;
}

/**
 * Calculates estimated read time for an article
 */
export function calculateReadTime(content: string): string {
  if (!content) return "2 min read";

  // Use the existing readingTime function if available
  try {
    return readingTime(content);
  } catch (e) {
    // Fallback calculation: average reading speed of 200-250 words per minute
    const words = content.split(/\s+/).length;
    const minutes = Math.ceil(words / 225);
    return `${minutes} min read`;
  }
}
