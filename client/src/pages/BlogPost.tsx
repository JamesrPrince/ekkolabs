import {
  faCalendarAlt,
  faTag,
  faClock,
  faArrowLeft,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { marked } from "marked";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useRoute, useLocation } from "wouter";

import CommentSection from "@/components/CommentSection";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/sections/Newsletter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useApiRequest } from "@/hooks/use-api-cache";


interface Post {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  slug: string;
  published: boolean;
  featured: boolean;
  coverImage?: string;
  readTime?: string;
  authorId: string;
  categoryId: string;
  category: {
    id: string;
    name: string;
    slug: string;
  };
  tags: {
    id: string;
    name: string;
    slug: string;
  }[];
  author: {
    id: string;
    name: string;
    email: string;
    image?: string;
  };
}

interface APIResponse {
  data: Post;
}

export default function BlogPost() {
  const [, setLocation] = useLocation();
  const [match, params] = useRoute<{ slug: string }>("/blog/:slug");

  // If we don't have a slug parameter, redirect to the blog list
  if (!match) {
    useEffect(() => {
      setLocation("/blog");
    }, [setLocation]);
    return null;
  }

  const slug = params?.slug;
  const { data, error, isLoading } = useApiRequest<APIResponse>(
    slug ? `/api/blog/posts/${slug}` : null
  );

  const post = data?.data;

  // Parse markdown content to HTML
  const htmlContent = post?.content ? marked.parse(post.content) : "";

  // Format date for display
  const formattedDate = post?.createdAt
    ? format(new Date(post.createdAt), "MMMM dd, yyyy")
    : "";

  return (
    <>
      <Helmet>
        <title>
          {post?.title ? `${post.title} | Ekko Labs Blog` : "Loading..."}
        </title>
        <meta
          name="description"
          content={post?.excerpt || "Loading blog post..."}
        />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />

        <main className="container mx-auto px-4 py-8 max-w-5xl">
          {/* Back to blog button */}
          <Button
            variant="ghost"
            onClick={() => setLocation("/blog")}
            className="mb-6 group"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="mr-2 transition-transform group-hover:-translate-x-1"
            />
            Back to all posts
          </Button>

          {isLoading ? (
            <PostSkeleton />
          ) : error ? (
            <ErrorDisplay error={error} slug={slug} setLocation={setLocation} />
          ) : post ? (
            <article className="space-y-8">
              {/* Post header */}
              <header className="space-y-4">
                {post.coverImage && (
                  <div className="w-full h-96 overflow-hidden rounded-lg">
                    <img
                      src={post.coverImage}
                      alt={post.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}

                <div className="space-y-2">
                  {post.category && (
                    <Badge variant="outline" className="font-medium">
                      {post.category.name}
                    </Badge>
                  )}
                  <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
                    {post.title}
                  </h1>
                </div>

                {/* Post meta */}
                <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                    {formattedDate}
                  </div>

                  {post.readTime && (
                    <div className="flex items-center">
                      <FontAwesomeIcon icon={faClock} className="mr-2" />
                      {post.readTime}
                    </div>
                  )}

                  {post.author && (
                    <div className="flex items-center">
                      {post.author.image ? (
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="h-6 w-6 rounded-full mr-2"
                        />
                      ) : (
                        <div className="h-6 w-6 rounded-full bg-primary/20 mr-2" />
                      )}
                      {post.author.name}
                    </div>
                  )}
                </div>
              </header>

              {/* Post content */}
              <div
                className="prose prose-lg max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Tags */}
              {post.tags && post.tags.length > 0 && (
                <div className="pt-6 border-t">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">
                    Tagged with:
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag.id} variant="secondary">
                        <FontAwesomeIcon
                          icon={faTag}
                          className="mr-1 text-xs"
                        />
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
            </article>
          ) : (
            <p className="text-center py-16 text-muted-foreground">
              Post not found
            </p>
          )}

          {/* Comments section */}
          {post && (
            <div className="mt-12">
              <CommentSection postId={post.id} />
            </div>
          )}

          {/* Newsletter section */}
          <div className="mt-16">
            <Newsletter />
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

// Loading skeleton
function PostSkeleton() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-96 w-full rounded-lg" />
        <Skeleton className="h-8 w-24" />
        <Skeleton className="h-12 w-full" />
        <div className="flex gap-4">
          <Skeleton className="h-5 w-32" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <div className="space-y-4">
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <Skeleton className="h-6 w-4/5" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-3/4" />
      </div>
    </div>
  );
}

// Error display
function ErrorDisplay({
  error,
  slug,
  setLocation,
}: {
  error: Error;
  slug: string;
  setLocation: (to: string) => void;
}) {
  return (
    <Card className="p-8 text-center">
      <h2 className="text-2xl font-bold mb-4">Failed to load post</h2>
      <p className="text-muted-foreground mb-6">
        We couldn&apos;t load the blog post &quot;{slug}&quot;. The post may not
        exist or there might be a server error.
      </p>
      <p className="text-sm text-red-500 mb-6">Error: {error.message}</p>
      <Button onClick={() => setLocation("/blog")}>Return to all posts</Button>
    </Card>
  );
}
