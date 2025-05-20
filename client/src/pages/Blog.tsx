import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarAlt, faTag } from "@fortawesome/free-solid-svg-icons";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

// Sample blog data - in a real app, this would come from an API or CMS
const blogPosts = [
  {
    id: 1,
    title: "Building a Portfolio Website with React and Tailwind",
    excerpt:
      "A step-by-step guide to creating a modern portfolio website using React, Tailwind CSS, and deploying it to Vercel.",
    date: "2025-05-15",
    category: "Web Development",
    image: "https://placehold.co/600x400/112240/64FFDA?text=Portfolio+Website",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "The Power of Serverless Functions for Small Projects",
    excerpt:
      "Learn how serverless functions can simplify your backend architecture and reduce operational overhead for small to medium-sized projects.",
    date: "2025-05-10",
    category: "Backend",
    image: "https://placehold.co/600x400/112240/64FFDA?text=Serverless",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "Creating Responsive Animations with Framer Motion",
    excerpt:
      "Discover how to build beautiful, responsive animations that enhance user experience using Framer Motion and React.",
    date: "2025-05-05",
    category: "Animation",
    image: "https://placehold.co/600x400/112240/64FFDA?text=Animations",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Optimizing React Performance",
    excerpt:
      "Tips and tricks for measuring and improving the performance of your React applications.",
    date: "2025-04-28",
    category: "Performance",
    image: "https://placehold.co/600x400/112240/64FFDA?text=React+Performance",
    readTime: "7 min read",
  },
  {
    id: 5,
    title: "Using TypeScript with React: Best Practices",
    excerpt:
      "How to leverage TypeScript to create more maintainable and error-free React applications.",
    date: "2025-04-20",
    category: "TypeScript",
    image: "https://placehold.co/600x400/112240/64FFDA?text=TypeScript",
    readTime: "9 min read",
  },
  {
    id: 6,
    title: "The JAMstack Approach to Web Development",
    excerpt:
      "Understanding the JAMstack architecture and how it changes the way we build websites.",
    date: "2025-04-15",
    category: "Architecture",
    image: "https://placehold.co/600x400/112240/64FFDA?text=JAMstack",
    readTime: "5 min read",
  },
];

export default function BlogPage() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Get unique categories
  const categories = [
    "All",
    ...new Set(blogPosts.map((post) => post.category)),
  ];

  // Filter posts by category
  const filteredPosts =
    selectedCategory === "All"
      ? blogPosts
      : blogPosts.filter((post) => post.category === selectedCategory);

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
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <>
      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main>
        <div className="pt-20">
          <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
            <h1 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-6">
              Blog
            </h1>
            <p className="text-[#8892B0] text-lg mb-12 max-w-2xl">
              Thoughts, stories, and ideas about web development, design, and
              technology.
            </p>

            {/* Category Filter */}
            <div className="mb-12 flex flex-wrap gap-3" ref={elementRef}>
              {categories.map((category) => (
                <Button
                  key={category}
                  variant="ghost"
                  className={cn(
                    "px-4 py-2 rounded",
                    selectedCategory === category
                      ? "text-[#CCD6F6] bg-[#0A192F] hover:bg-[#64FFDA]/10"
                      : "text-[#8892B0] hover:text-[#CCD6F6] hover:bg-[#64FFDA]/10"
                  )}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Blog Posts */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post, index) => (
                <Card
                  key={post.id}
                  className={cn(
                    "overflow-hidden bg-[#0A192F] border-none transition-all duration-300 hover:-translate-y-2 animate-in",
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
                      <div className="flex items-center text-[#64FFDA] text-sm">
                        <FontAwesomeIcon
                          icon={faCalendarAlt}
                          className="mr-2"
                        />
                        {formatDate(post.date)}
                      </div>
                      <span className="text-[#8892B0] text-sm">
                        {post.readTime}
                      </span>
                    </div>

                    <h3 className="text-[#CCD6F6] text-xl font-bold mb-3 line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-[#8892B0] mb-4 text-sm line-clamp-3">
                      {post.excerpt}
                    </p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center text-[#64FFDA] text-xs">
                        <FontAwesomeIcon icon={faTag} className="mr-2" />
                        {post.category}
                      </div>
                      <Button
                        variant="link"
                        className="text-[#64FFDA] p-0 hover:text-[#CCD6F6]"
                      >
                        Read More
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
