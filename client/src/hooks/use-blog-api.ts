import { useApiRequest } from "./use-api-cache";

// Define types for the options parameter
interface RequestOptions {
  cacheDuration?: number;
  enabled?: boolean;
  [key: string]: unknown;
}

// Blog post API hooks
export function useBlogPosts(options: RequestOptions = {}) {
  const response = useApiRequest("/api/blog/posts", {
    ...options,
    cacheDuration: 60000, // 1 minute cache to prevent excessive requests
  });

  // Add logging for debugging purposes
  if (response.error) {
    console.error("Blog API Error:", response.error);
  }

  return response;
}

export function useBlogPost(
  slug: string | null | undefined,
  options: RequestOptions = {}
) {
  const url = slug ? `/api/blog/posts/${slug}` : null;
  return useApiRequest(url, options);
}

export function useBlogCategories(options: RequestOptions = {}) {
  return useApiRequest("/api/blog/categories", options);
}

export function useBlogTags(options: RequestOptions = {}) {
  return useApiRequest("/api/blog/tags", options);
}
