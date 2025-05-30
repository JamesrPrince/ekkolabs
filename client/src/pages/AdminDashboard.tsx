import {
  faPlus,
  faEdit,
  faTrash,
  faEye,
  faSearch,
  faTimes,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { format } from "date-fns";
import { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "wouter";


import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/contexts/AuthContext";
import { useApiRequest } from "@/hooks/use-api-cache";


interface Post {
  id: string;
  title: string;
  excerpt: string;
  slug: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  category: {
    name: string;
  };
  author: {
    name: string;
  };
}

interface APIResponse {
  data: Post[];
}

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const { isAuthenticated, isAdmin } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState<
    "all" | "published" | "draft"
  >("all");

  const { data, isLoading, error, refetch } = useApiRequest<APIResponse>(
    "/api/blog/posts?admin=true"
  );

  const posts = data?.data || [];

  // If not authenticated or not admin, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      setLocation("/login");
    } else if (!isAdmin) {
      setLocation("/"); // Redirect non-admins to home page
    }
  }, [isAuthenticated, isAdmin, setLocation]);

  // Filter posts based on search term and status
  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.slug.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      selectedStatus === "all" ||
      (selectedStatus === "published" && post.published) ||
      (selectedStatus === "draft" && !post.published);

    return matchesSearch && matchesStatus;
  });

  // Handle post deletion
  const handleDeletePost = async (slug: string) => {
    if (
      !confirm(
        "Are you sure you want to delete this post? This action cannot be undone."
      )
    ) {
      return;
    }

    try {
      const response = await fetch(`/api/blog/posts/${slug}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ekkolabs_auth_token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to delete post");
      }

      // Refetch posts after deletion
      refetch();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post. Please try again.");
    }
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), "MMM dd, yyyy");
  };

  if (!isAuthenticated || !isAdmin) {
    return null; // Will be redirected by useEffect
  }

  return (
    <>
      <Helmet>
        <title>Admin Dashboard | Ekko Labs</title>
      </Helmet>

      <div className="min-h-screen flex flex-col bg-background">
        <Navbar />

        <main className="flex-grow container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold">Blog Admin Dashboard</h1>
              <p className="text-muted-foreground">
                Manage your blog posts, categories, and tags
              </p>
            </div>

            <Button onClick={() => setLocation("/create-article")}>
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              New Post
            </Button>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertDescription>
                Failed to load blog posts. Please try refreshing the page.
              </AlertDescription>
            </Alert>
          )}

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Blog Posts</CardTitle>
              <CardDescription>View and manage all blog posts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-grow">
                  <Input
                    placeholder="Search posts..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pr-10"
                  />
                  <button
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground"
                    onClick={() => setSearchTerm("")}
                    aria-label={searchTerm ? "Clear search" : "Search"}
                  >
                    <FontAwesomeIcon icon={searchTerm ? faTimes : faSearch} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={selectedStatus === "all" ? "default" : "outline"}
                    onClick={() => setSelectedStatus("all")}
                    size="sm"
                  >
                    All
                  </Button>
                  <Button
                    variant={
                      selectedStatus === "published" ? "default" : "outline"
                    }
                    onClick={() => setSelectedStatus("published")}
                    size="sm"
                  >
                    Published
                  </Button>
                  <Button
                    variant={selectedStatus === "draft" ? "default" : "outline"}
                    onClick={() => setSelectedStatus("draft")}
                    size="sm"
                  >
                    Drafts
                  </Button>
                </div>
              </div>

              {isLoading ? (
                <div className="space-y-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <Skeleton className="h-6 w-1/3" />
                      <Skeleton className="h-6 w-1/4" />
                      <Skeleton className="h-6 w-1/6" />
                      <Skeleton className="h-6 w-1/6" />
                      <Skeleton className="h-6 w-1/6" />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="rounded-md border">
                  <Table>
                    <TableCaption>
                      {filteredPosts.length === 0
                        ? "No posts found matching your criteria."
                        : `Showing ${filteredPosts.length} of ${posts.length} posts`}
                    </TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[300px]">Title</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Category</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead>Author</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredPosts.length === 0 ? (
                        <TableRow>
                          <TableCell
                            colSpan={6}
                            className="text-center py-8 text-muted-foreground"
                          >
                            No posts found matching your criteria.
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredPosts.map((post) => (
                          <TableRow key={post.id}>
                            <TableCell className="font-medium">
                              <div className="line-clamp-1">{post.title}</div>
                              <div className="text-xs text-muted-foreground mt-1">
                                <code className="text-xs bg-muted px-1 py-0.5 rounded">
                                  {post.slug}
                                </code>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  post.published ? "default" : "secondary"
                                }
                              >
                                {post.published ? "Published" : "Draft"}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              {post.category?.name || "Uncategorized"}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <FontAwesomeIcon
                                  icon={faCalendarAlt}
                                  className="mr-2 text-xs text-muted-foreground"
                                />
                                {formatDate(post.createdAt)}
                              </div>
                            </TableCell>
                            <TableCell>
                              {post.author?.name || "Unknown"}
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setLocation(`/blog/${post.slug}`)
                                  }
                                >
                                  <FontAwesomeIcon icon={faEye} />
                                  <span className="sr-only">View</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    setLocation(`/edit-article/${post.slug}`)
                                  }
                                >
                                  <FontAwesomeIcon icon={faEdit} />
                                  <span className="sr-only">Edit</span>
                                </Button>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="text-destructive hover:bg-destructive/10"
                                  onClick={() => handleDeletePost(post.slug)}
                                >
                                  <FontAwesomeIcon icon={faTrash} />
                                  <span className="sr-only">Delete</span>
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Additional admin sections could go here: categories management, user management, etc. */}
        </main>

        <Footer />
      </div>
    </>
  );
}
