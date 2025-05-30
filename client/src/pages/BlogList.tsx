import {
  faCalendarAlt,
  faTag,
  faClock,
  faSearch,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";

import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Newsletter from "@/components/sections/Newsletter";
import SocialLinks from "@/components/SocialLinks";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  useBlogPosts,
  useBlogCategories,
  useBlogTags,
} from "@/hooks/use-blog-api";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { normalizePost } from "@/lib/blog-utils";
import { cn } from "@/lib/utils";

// Types for blog data
interface BlogAuthor {
  id?: string;
  name: string;
  image?: string | null;
  username?: string;
}

interface BlogCategory {
  id: number;
  name: string;
  slug: string;
  description?: string;
}

interface BlogTag {
  id: number;
  name: string;
  slug: string;
}

interface Post {
  id?: string;
  title: string;
  excerpt: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
  published: boolean;
  author: BlogAuthor;
  category: BlogCategory;
  tags: BlogTag[];
  readTime: string;
  content?: string;
  featured?: boolean;
  coverImage?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  _count: {
    posts: number;
  };
}

interface Tag {
  id: string;
  name: string;
  slug: string;
  _count: {
    posts: number;
  };
}

// Main Blog page component
export default function BlogList() {
  const [, setLocation] = useLocation();
  const { elementRef: _elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Fetch blog posts data from the API using our specialized hook
  const {
    data: postsResponse,
    isLoading: isLoadingPosts,
    error: postsError,
  } = useBlogPosts();

  // Fetch categories
  const { data: categoriesResponse } = useBlogCategories();

  // Fetch tags
  const { data: tagsResponse } = useBlogTags();

  const blogPosts = useMemo(() => postsResponse?.data || [], [postsResponse]);
  const categories = useMemo(
    () => categoriesResponse?.data || [],
    [categoriesResponse]
  );
  const tags = useMemo(() => tagsResponse?.data || [], [tagsResponse]);

  const isLoading = isLoadingPosts;
  const error = postsError;

  // Get unique categories for filter
  const uniqueCategories = [
    "All",
    ...(Array.isArray(categories)
      ? categories.map((cat: Category) => cat.name)
      : []),
  ];

  // Ensure normalizedPosts is defined before featuredPost and regularPosts
  const normalizedPosts = useMemo(() => {
    if (!blogPosts || !Array.isArray(blogPosts)) return [];
    try {
      return blogPosts
        .map((post) => {
          try {
            return normalizePost(post);
          } catch (error) {
            console.error("Error normalizing post:", error);
            return {
              ...post,
              title: post.title || "Untitled Post",
              excerpt: post.excerpt || "No excerpt available",
              slug: post.slug || "untitled-post",
              createdAt: post.createdAt || new Date().toISOString(),
              updatedAt:
                post.updatedAt || post.createdAt || new Date().toISOString(),
              published:
                typeof post.published === "boolean" ? post.published : true,
              author: post.author || { name: "Anonymous" },
              category: post.category || {
                name: "Uncategorized",
                slug: "uncategorized",
              },
              tags: Array.isArray(post.tags) ? post.tags : [],
              readTime:
                post.readTime ||
                (post.content
                  ? `${Math.max(1, Math.ceil(post.content.trim().split(/\s+/).length / 225))} min read`
                  : "2 min read"),
            };
          }
        })
        .filter(Boolean) as Post[];
    } catch (error) {
      console.error("Error processing blog posts:", error);
      return [];
    }
  }, [blogPosts]);

  const featuredPost = useMemo(() => {
    if (!normalizedPosts.length) return null;
    return normalizedPosts.find((post) => post.featured) || normalizedPosts[0];
  }, [normalizedPosts]);

  const regularPosts = useMemo(() => {
    if (!normalizedPosts.length) return [];
    if (!featuredPost) {
      return normalizedPosts.filter((post) => !post.featured);
    }
    return normalizedPosts.filter(
      (post) => post.id !== featuredPost.id && !post.featured
    );
  }, [normalizedPosts, featuredPost]);

  // Filter posts by category and search query
  const filteredPosts = useMemo(() => {
    if (!regularPosts) return [];
    return regularPosts.filter((post: Post) => {
      if (!post) return false;
      const matchesCategory =
        selectedCategory !== "All"
          ? post.category && post.category.name === selectedCategory
          : true;
      const matchesTags = activeTags.length
        ? post.tags &&
          post.tags.some((tag: BlogTag) => activeTags.includes(tag.name))
        : true;
      const matchesSearch = searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          (post.excerpt &&
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) ||
          (post.content &&
            post.content.toLowerCase().includes(searchQuery.toLowerCase()))
        : true;
      return matchesCategory && matchesTags && matchesSearch;
    });
  }, [regularPosts, selectedCategory, activeTags, searchQuery]);

  // Add scroll animations for elements with animate-in class
  useEffect(() => {
    const handleScroll = () => {
      const animateElements = document.querySelectorAll(
        ".animate-in:not(.show)"
      );

      animateElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add("show");
        }
      });
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle tag selection
  const toggleTag = (tagName: string) => {
    if (activeTags.includes(tagName)) {
      setActiveTags(activeTags.filter((t) => t !== tagName));
    } else {
      setActiveTags([...activeTags, tagName]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setActiveTags([]);
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), "MMMM dd, yyyy");
  };

  // Navigation to post detail page
  const navigateToPost = (slug: string) => {
    setLocation(`/blog/${slug}`);
  };

  // If data is still loading, show skeleton placeholders
  if (isLoading) {
    return (
      <>
        <Helmet>
          <title>Blog | Ekko Labs</title>
          <meta
            name="description"
            content="Read the latest articles on web development, tech, and more."
          />
        </Helmet>

        <Navbar />
        <SocialLinks />
        <EmailLink />

        <main className="pt-20 bg-background">
          <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
            <div className="text-center mb-16">
              <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog</h1>
              <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
                Thoughts on web development, tech, and life.
              </p>
              <Button
                variant="outline"
                className="mt-6"
                onClick={() => setLocation("/create-article")}
              >
                <FontAwesomeIcon icon={faPlus} className="mr-2" />
                Write Article
              </Button>
            </div>

            <Card className="mb-12">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  <Skeleton className="h-64 md:h-full w-full" />
                </div>
                <div className="p-6 md:w-1/2 space-y-4">
                  <Skeleton className="h-6 w-24" />
                  <Skeleton className="h-12 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-4 w-2/3" />
                  <div className="flex items-center gap-4 mt-4">
                    <Skeleton className="h-8 w-24" />
                    <Skeleton className="h-8 w-24" />
                  </div>
                </div>
              </div>
            </Card>

            <div className="mb-12">
              <div className="relative mb-4">
                <Skeleton className="h-10 w-full" />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-8 w-16" />
                  ))}
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Skeleton key={i} className="h-6 w-12" />
                  ))}
                </div>
              </div>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2">
                <div className="grid md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4].map((i) => (
                    <Card key={i} className="overflow-hidden bg-card">
                      <Skeleton className="h-48 w-full" />
                      <div className="p-6 space-y-3">
                        <div className="flex justify-between">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-6 w-full" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-5/6" />
                        <div className="flex justify-between pt-2">
                          <Skeleton className="h-4 w-16" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <div className="space-y-8">
                <Card className="p-6 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                  <Skeleton className="h-8 w-full" />
                </Card>
                <Card className="p-6 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="flex flex-wrap gap-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Skeleton key={i} className="h-6 w-12" />
                    ))}
                  </div>
                </Card>
                <Card className="p-6 space-y-4">
                  <Skeleton className="h-6 w-32" />
                  <div className="space-y-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex gap-3">
                        <Skeleton className="w-16 h-16" />
                        <div className="flex-1 space-y-2">
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  // If there's an error, show an error message
  if (error) {
    console.error("BlogList Error:", error);

    return (
      <>
        <Helmet>
          <title>Error | Blog | Ekko Labs</title>
        </Helmet>

        <Navbar />
        <SocialLinks />
        <EmailLink />

        <main className="pt-20 bg-background">
          <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Oops! Something went wrong.
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                We couldn&apos;t load the blog posts. Please try again later.
              </p>
              <p className="text-sm text-muted-foreground bg-red-50 p-2 rounded mb-8 max-w-lg mx-auto">
                Error: {error.message || "Unknown error loading blog posts"}
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Retry
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    localStorage.removeItem("api-cache:/api/blog/posts");
                    window.location.reload();
                  }}
                >
                  Clear Cache & Retry
                </Button>
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </>
    );
  }

  return (
    <>
      <Helmet>
        <title>Blog | Ekko Labs</title>
        <meta
          name="description"
          content="Read the latest articles on web development, tech, and more."
        />
      </Helmet>

      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main className="pt-20 bg-background">
        <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
          <div
            className="text-center mb-16 animate-in show"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Blog</h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Thoughts on web development, tech, and life.
            </p>
            <Button
              variant="outline"
              className="mt-6"
              style={{ animationDelay: "0.2s" }}
              onClick={() => setLocation("/create-article")}
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Write Article
            </Button>
          </div>

          {featuredPost && (
            <Card
              className="mb-12 overflow-hidden animate-in show border shadow-md"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2">
                  {featuredPost.coverImage ? (
                    <img
                      src={featuredPost.coverImage}
                      alt={featuredPost.title}
                      className="h-64 md:h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-64 md:h-full w-full bg-muted flex items-center justify-center">
                      <p className="text-muted-foreground">
                        No image available
                      </p>
                    </div>
                  )}
                </div>
                <div className="p-6 md:w-1/2 flex flex-col justify-between">
                  <div>
                    <div className="mb-2">
                      <Badge variant="outline" className="bg-muted/50">
                        Featured
                      </Badge>
                      {featuredPost.category && (
                        <Badge variant="secondary" className="ml-2">
                          {featuredPost.category.name}
                        </Badge>
                      )}
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold mb-3 hover:text-primary transition-colors">
                      {featuredPost.title}
                    </h2>

                    <p className="text-muted-foreground line-clamp-3 md:line-clamp-4">
                      {featuredPost.excerpt}
                    </p>
                  </div>

                  <div className="mt-6 flex flex-wrap justify-between items-center">
                    <div className="flex items-center text-sm text-muted-foreground mb-4 md:mb-0">
                      <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                      {formatDate(featuredPost.createdAt)}

                      {featuredPost.readTime && (
                        <span className="ml-4 flex items-center">
                          <FontAwesomeIcon icon={faClock} className="mr-2" />
                          {featuredPost.readTime}
                        </span>
                      )}
                    </div>

                    <Button
                      variant="outline"
                      onClick={() => navigateToPost(featuredPost.slug)}
                    >
                      Read Article
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          )}

          <div
            className="mb-12 animate-in show"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search articles..."
                className="pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => setSearchQuery("")}
                aria-label={searchQuery ? "Clear search" : "Search"}
              >
                <FontAwesomeIcon icon={searchQuery ? faTimes : faSearch} />
              </button>
            </div>

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-wrap gap-2">
                {uniqueCategories.map((category) => (
                  <Button
                    key={category}
                    variant={
                      selectedCategory === category ? "secondary" : "outline"
                    }
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {Array.isArray(tags) && tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {tags.slice(0, 5).map((tag: Tag) => (
                    <Badge
                      key={tag.id}
                      variant={
                        activeTags.includes(tag.name) ? "default" : "outline"
                      }
                      className="cursor-pointer"
                      onClick={() => toggleTag(tag.name)}
                    >
                      <FontAwesomeIcon icon={faTag} className="mr-1 text-xs" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              )}

              {(selectedCategory !== "All" ||
                searchQuery ||
                activeTags.length > 0) && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-muted-foreground"
                >
                  <FontAwesomeIcon icon={faTimes} className="mr-1" />
                  Clear filters
                </Button>
              )}
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredPosts.map((post: Post, index: number) => (
                    <Card
                      key={post.id}
                      className={cn(
                        "overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-md animate-in",
                        isIntersecting && "show"
                      )}
                      style={{ animationDelay: `${0.4 + index * 0.1}s` }}
                      onClick={() => navigateToPost(post.slug)}
                    >
                      <div className="relative h-48 overflow-hidden">
                        {post.coverImage ? (
                          <img
                            src={post.coverImage}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                          />
                        ) : (
                          <div className="h-48 w-full bg-muted flex items-center justify-center">
                            <p className="text-muted-foreground">
                              No image available
                            </p>
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center text-sm text-muted-foreground">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="mr-2"
                            />
                            {formatDate(post.createdAt)}
                          </div>
                          {post.readTime && (
                            <span className="text-xs text-muted-foreground flex items-center">
                              <FontAwesomeIcon
                                icon={faClock}
                                className="mr-2"
                              />
                              {post.readTime}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl font-bold mb-3 line-clamp-2 hover:text-primary transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-muted-foreground mb-4 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex justify-between items-center">
                          {post.category && (
                            <Badge variant="outline">
                              {post.category.name}
                            </Badge>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-primary hover:text-primary/80"
                          >
                            Read More
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-muted/20 rounded-lg border">
                  <p className="text-muted-foreground mb-4">
                    No articles found matching your criteria.
                  </p>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            <div className="space-y-8">
              <Newsletter />

              {Array.isArray(tags) && tags.length > 0 && (
                <Card
                  className="p-6 animate-in"
                  style={{ animationDelay: "0.5s" }}
                >
                  <h3 className="text-lg font-bold mb-4">Popular Topics</h3>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: Tag) => (
                      <Badge
                        key={tag.id}
                        variant={
                          activeTags.includes(tag.name) ? "default" : "outline"
                        }
                        className="cursor-pointer"
                        onClick={() => toggleTag(tag.name)}
                      >
                        {tag.name}
                        {tag._count.posts > 0 && (
                          <span className="ml-1 text-xs opacity-70">
                            ({tag._count.posts})
                          </span>
                        )}
                      </Badge>
                    ))}
                  </div>
                </Card>
              )}

              <Card
                className="p-6 animate-in"
                style={{ animationDelay: "0.6s" }}
              >
                <h3 className="text-lg font-bold mb-4">Recent Posts</h3>
                <div className="space-y-4">
                  {Array.isArray(blogPosts) &&
                    blogPosts.slice(0, 3).map((post: Post) => (
                      <div
                        key={post.id}
                        className="flex gap-3 items-start cursor-pointer"
                        onClick={() => navigateToPost(post.slug)}
                      >
                        <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded bg-muted">
                          {post.coverImage ? (
                            <img
                              src={post.coverImage}
                              alt={post.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <p className="text-xs text-muted-foreground">
                                No image
                              </p>
                            </div>
                          )}
                        </div>
                        <div>
                          <h4 className="font-medium text-sm line-clamp-2 hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <div className="text-muted-foreground text-xs mt-1">
                            {formatDate(post.createdAt)}
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
