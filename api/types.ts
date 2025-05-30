/**
 * Type definitions for the Blog API
 */

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt?: string | null;
  content: string;
  published: boolean;
  authorId: string;
  categoryId: number | null;
  createdAt: Date;
  updatedAt: Date;
  author: {
    id: string;
    username?: string | null;
    name: string;
    image?: string | null;
  };
  category?: {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
  } | null;
  tags: {
    id: number;
    name: string;
    slug: string;
  }[];
  readTime?: string;
}

export interface BlogComment {
  id: number;
  content: string;
  authorId?: string | null;
  postId: string;
  parentId?: number | null;
  createdAt: Date;
  updatedAt: Date;
  author?: {
    id: string;
    username?: string | null;
    name: string;
    image?: string | null;
  } | null;
  replies?: BlogComment[];
}

export interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string | null;
  _count?: {
    posts: number;
  };
}

export interface BlogTag {
  id: number;
  name: string;
  slug: string;
  _count?: {
    posts: number;
  };
}

export interface PaginationMeta {
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

export interface BlogApiResponse<T> {
  data: T;
  meta?: PaginationMeta;
}
