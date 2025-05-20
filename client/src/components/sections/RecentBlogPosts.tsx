import { useLocation, Link } from "wouter";
import { cn } from "@/lib/utils";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

// Sample data - in a real app, this would come from an API or CMS
const posts = [
  {
    id: 1,
    title: "Building a Portfolio with React & Tailwind",
    date: "May 15, 2025",
    excerpt: "A step-by-step guide to creating a modern portfolio website...",
    slug: "/blog/building-portfolio-react-tailwind", // Example slug
  },
  {
    id: 2,
    title: "The Power of Serverless Functions",
    date: "May 10, 2025",
    excerpt:
      "Learn how serverless functions can simplify your backend architecture...",
    slug: "/blog/power-serverless-functions",
  },
  {
    id: 3,
    title: "Animations with Framer Motion in React",
    date: "May 5, 2025",
    excerpt: "Discover how to build beautiful, responsive animations...",
    slug: "/blog/animations-framer-motion-react",
  },
];

export default function RecentBlogPosts() {
  const [, setLocation] = useLocation();
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigateToBlog = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLocation("/blog");
  };

  return (
    <section
      id="recent-blog"
      ref={elementRef}
      className="py-16 md:py-24 bg-[#0A192F]"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-[var(--color-lightest-slate)] mb-12 text-center animate-in",
            isIntersecting && "show"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          From the Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <Link key={post.id} href={post.slug}>
              <a
                className={cn(
                  "project-card p-6 block animate-in", // Reusing project-card style for consistency
                  isIntersecting && "show"
                )}
                style={{ animationDelay: `${0.2 + index * 0.1}s` }}
              >
                <h3 className="text-xl font-semibold text-[var(--color-lightest-slate)] mb-2 group-hover:text-[var(--color-teal)] transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-sm text-[var(--color-slate)] mb-3">
                  {post.date}
                </p>
                <p className="text-[var(--color-slate)] mb-4 text-sm leading-relaxed h-20 overflow-hidden">
                  {post.excerpt}
                </p>
                <span className="text-[var(--color-teal)] hover:underline text-sm font-mono">
                  Read More &rarr;
                </span>
              </a>
            </Link>
          ))}
        </div>
        <div
          className={cn(
            "text-center mt-12 animate-in",
            isIntersecting && "show"
          )}
          style={{ animationDelay: `${0.2 + posts.length * 0.1}s` }}
        >
          <a
            href="/blog"
            onClick={navigateToBlog}
            className="btn-outline" // Using the new btn-outline class
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
}
