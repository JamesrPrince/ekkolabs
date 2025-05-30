import { useApiRequest } from "./use-api-cache";

// Blog post API hooks
export function useBlogPosts(options = {}) {
  const response = useApiRequest("/api/blog/posts", options);
  return response;
}

export function useBlogPost(slug, options = {}) {
  const url = slug ? `/api/blog/posts/${slug}` : null;
  return useApiRequest(url, options);
}

export function useBlogCategories(options = {}) {
  return useApiRequest("/api/blog/categories", options);
}

export function useBlogTags(options = {}) {
  return useApiRequest("/api/blog/tags", options);
}
