import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCalendarAlt,
  faTag,
  faClock,
  faSearch,
  faTimes,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import Newsletter from "@/components/sections/Newsletter";
import FeaturedPost from "@/components/sections/FeaturedPost";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

// Sample blog data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "Building a Portfolio Website with React and Tailwind",
    excerpt:
      "A step-by-step guide to creating a modern portfolio website using React, Tailwind CSS, and deploying it to Vercel.",
    date: "2025-05-15",
    category: "Web Development",
    image: "https://placehold.co/600x400/0a0908/c84630?text=Portfolio+Website",
    readTime: "5 min read",
    featured: true,
  },
  {
    id: 2,
    title: "The Power of Serverless Functions for Small Projects",
    excerpt:
      "Learn how serverless functions can simplify your backend architecture and reduce operational overhead for small to medium-sized projects.",
    date: "2025-05-10",
    category: "Backend",
    image: "https://placehold.co/600x400/0a0908/c84630?text=Serverless",
    readTime: "8 min read",
    featured: false,
  },
  {
    id: 3,
    title: "Creating Responsive Animations with Framer Motion",
    excerpt:
      "Discover how to build beautiful, responsive animations that enhance user experience using Framer Motion and React.",
    date: "2025-05-05",
    category: "Animation",
    image: "https://placehold.co/600x400/0a0908/c84630?text=Animations",
    readTime: "6 min read",
    featured: false,
  },
  {
    id: 4,
    title: "Optimizing React Performance",
    excerpt:
      "Tips and tricks for measuring and improving the performance of your React applications.",
    date: "2025-04-28",
    category: "Performance",
    image: "https://placehold.co/600x400/0a0908/c84630?text=React+Performance",
    readTime: "7 min read",
    featured: false,
  },
  {
    id: 5,
    title: "Using TypeScript with React: Best Practices",
    excerpt:
      "How to leverage TypeScript to create more maintainable and error-free React applications.",
    date: "2025-04-20",
    category: "TypeScript",
    image: "https://placehold.co/600x400/0a0908/c84630?text=TypeScript",
    readTime: "9 min read",
    featured: false,
  },
  {
    id: 6,
    title: "The JAMstack Approach to Web Development",
    excerpt:
      "Understanding the JAMstack architecture and how it changes the way we build websites.",
    date: "2025-04-15",
    category: "Architecture",
    image: "https://placehold.co/600x400/0a0908/c84630?text=JAMstack",
    readTime: "5 min read",
    featured: false,
  },
];

// Popular tags for blog posts
const popularTags = [
  "React",
  "TypeScript",
  "JavaScript",
  "Web Development",
  "Performance",
  "UI/UX",
  "Data",
  "Analytics",
  "Architecture",
];

export default function BlogPage() {
  const [, setLocation] = useLocation();
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTags, setActiveTags] = useState<string[]>([]);

  // Get unique categories
  const uniqueCategories = Array.from(
    new Set(blogPosts.map((post) => post.category))
  );
  const categories = ["All", ...uniqueCategories];

  // Get featured post
  const featuredPost = blogPosts.find((post) => post.featured);

  // Filter posts by category and search query
  const filteredPosts = blogPosts
    .filter((post) => !post.featured) // Exclude featured post from the grid
    .filter(
      (post) =>
        (selectedCategory === "All" || post.category === selectedCategory) &&
        (searchQuery === "" ||
          post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (activeTags.length === 0 ||
          activeTags.some(
            (tag) =>
              post.title.includes(tag) ||
              post.excerpt.includes(tag) ||
              post.category.includes(tag)
          ))
    );

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

    // Check on initial load in case some elements are already in view
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Toggle tag selection
  const toggleTag = (tag: string) => {
    if (activeTags.includes(tag)) {
      setActiveTags(activeTags.filter((t) => t !== tag));
    } else {
      setActiveTags([...activeTags, tag]);
    }
  };

  // Clear all filters
  const clearFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
    setActiveTags([]);
  };

  return (
    <>
      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main className="pt-20 bg-custom-primary">
        <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
          {/* Header Section */}
          <div
            className="text-center mb-16 animate-in show"
            style={{ animationDelay: "0.1s" }}
          >
            <h1 className="text-5xl md:text-6xl font-bold text-custom-secondary mb-4">
              Ekko's Blog
            </h1>
            <p className="text-lg md:text-xl text-custom-accent2 max-w-2xl mx-auto">
              Thoughts on web development, tech, and life.
            </p>
            <Button
              variant="outline"
              className="mt-6 bg-transparent border-custom-accent3 text-custom-accent3 hover:bg-custom-accent3 hover:text-custom-primary transition-colors animate-in show"
              style={{ animationDelay: "0.2s" }}
              onClick={() => setLocation("/create-article")} // Updated navigation
            >
              <FontAwesomeIcon icon={faPlus} className="mr-2" />
              Write Article
            </Button>
          </div>

          {/* Featured Post Section */}
          {featuredPost && (
            <div className="mb-12 animate-in show">
              <FeaturedPost post={featuredPost} />
            </div>
          )}

          {/* Search and Filter Section */}
          <div className="mb-12 animate-in show">
            {/* Search Bar */}
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Search articles..."
                className="bg-custom-primary-lighter border-custom-accent1 text-custom-secondary focus:border-custom-accent3 pr-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-custom-accent2">
                <FontAwesomeIcon
                  icon={searchQuery ? faTimes : faSearch}
                  onClick={() => searchQuery && setSearchQuery("")}
                />
              </span>
            </div>

            {/* Filter by Category and Tags */}
            <div className="flex flex-wrap gap-4">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="ghost"
                    className={cn(
                      "px-4 py-2 rounded",
                      selectedCategory === category
                        ? "text-custom-accent3 bg-custom-primary-lighter hover:bg-custom-accent3/10"
                        : "text-custom-accent2 hover:text-custom-secondary hover:bg-custom-primary-lighter"
                    )}
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>

              {/* Tags Filter */}
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag) => (
                  <Button
                    key={tag}
                    variant="ghost"
                    size="sm"
                    className={cn(
                      "text-xs px-3 py-1 border",
                      activeTags.includes(tag)
                        ? "bg-custom-accent3/10 text-custom-accent3 border-custom-accent3"
                        : "text-custom-accent2 border-custom-accent1 hover:text-custom-accent3 hover:border-custom-accent3"
                    )}
                    onClick={() => toggleTag(tag)}
                  >
                    {tag}
                  </Button>
                ))}
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Posts Section */}
            <div className="lg:col-span-2">
              {filteredPosts.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-8">
                  {filteredPosts.map((post, index) => (
                    <Card
                      key={post.id}
                      className={cn(
                        "overflow-hidden bg-custom-primary-lighter border-none transition-all duration-300 hover:-translate-y-2 animate-in",
                        isIntersecting && "show"
                      )}
                      style={{ animationDelay: `${index * 0.1}s` }}
                    >
                      <div className="relative h-48 overflow-hidden">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <div className="flex justify-between items-center mb-3">
                          <div className="flex items-center text-custom-accent3 text-xs">
                            <FontAwesomeIcon
                              icon={faCalendarAlt}
                              className="mr-2"
                            />
                            {formatDate(post.date)}
                          </div>
                          <span className="text-custom-accent2 text-xs flex items-center">
                            <FontAwesomeIcon icon={faClock} className="mr-2" />
                            {post.readTime}
                          </span>
                        </div>

                        <h3 className="text-custom-secondary text-xl font-bold mb-3 line-clamp-2 hover:text-custom-accent3 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-custom-accent2 mb-4 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>

                        <div className="flex justify-between items-center">
                          <div className="flex items-center text-custom-accent3 text-xs">
                            <FontAwesomeIcon icon={faTag} className="mr-2" />
                            {post.category}
                          </div>
                          <Button
                            variant="link"
                            className="text-custom-accent3 p-0 hover:text-custom-secondary"
                          >
                            Read More
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-custom-primary-lighter rounded-lg border border-custom-accent1">
                  <p className="text-custom-accent2 mb-4">
                    No articles found matching your criteria.
                  </p>
                  <Button
                    variant="outline"
                    className="border border-custom-accent3 text-custom-accent3 hover:bg-custom-accent3/10"
                    onClick={clearFilters}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Newsletter subscription */}
              <Newsletter />

              {/* Popular tags */}
              <div
                className="bg-custom-primary-lighter rounded-lg p-6 border border-custom-accent1 animate-in"
                style={{ animationDelay: "0.3s" }}
              >
                <h3 className="text-lg font-bold text-custom-secondary mb-4">
                  Popular Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag) => (
                    <Button
                      key={tag}
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "text-xs px-3 py-1 border",
                        activeTags.includes(tag)
                          ? "bg-custom-accent3/10 text-custom-accent3 border-custom-accent3"
                          : "text-custom-accent2 border-custom-accent1 hover:text-custom-accent3 hover:border-custom-accent3"
                      )}
                      onClick={() => toggleTag(tag)}
                    >
                      {tag}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Recent posts - simplified version */}
              <div
                className="bg-custom-primary-lighter rounded-lg p-6 border border-custom-accent1 animate-in"
                style={{ animationDelay: "0.4s" }}
              >
                <h3 className="text-lg font-bold text-custom-secondary mb-4">
                  Recent Posts
                </h3>
                <div className="space-y-4">
                  {blogPosts.slice(0, 3).map((post) => (
                    <div key={post.id} className="flex gap-3 items-start">
                      <div className="w-16 h-16 flex-shrink-0 overflow-hidden rounded">
                        <img
                          src={post.image}
                          alt={post.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <h4 className="text-custom-secondary font-medium text-sm line-clamp-2 hover:text-custom-accent3 transition-colors cursor-pointer">
                          {post.title}
                        </h4>
                        <div className="text-custom-accent2 text-xs mt-1">
                          {formatDate(post.date)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
