// filepath: /Users/ekko/Developer/ekkolabs/client/src/components/sections/RecentBlogPosts.tsx
import { Link } from "wouter";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

// Placeholder data - replace with actual blog post data or fetch from an API
const recentPosts = [
  {
    id: "1",
    title: "The Evolving Landscape of Predictive Analytics in 2025",
    date: "May 15, 2025",
    excerpt:
      "A look into the latest advancements in predictive modeling and how businesses are leveraging them for a competitive edge.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Placeholder image
    slug: "/blog/predictive-analytics-2025", // Example slug
  },
  {
    id: "2",
    title: "Data-Driven Decision Making: A Practical Guide for SMEs",
    date: "April 28, 2025",
    excerpt:
      "Small and medium enterprises can unlock significant growth by adopting a data-first approach. This guide shows you how.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Placeholder image
    slug: "/blog/data-driven-smes",
  },
  {
    id: "3",
    title: "Ethical Considerations in AI and Machine Learning Projects",
    date: "March 10, 2025",
    excerpt:
      "Navigating the complex ethical terrain of AI/ML is crucial. We explore key considerations for responsible AI development.",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400", // Placeholder image
    slug: "/blog/ethical-ai-ml",
  },
];

export default function RecentBlogPosts() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section
      id="recent-blog"
      ref={elementRef}
      className="py-24 bg-custom-primary"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-16 animate-in",
            isIntersecting && "show"
          )}
        >
          From my blog post
          <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {recentPosts.map((post, index) => (
            <Link key={post.id} href={post.slug}>
              <a
                className={cn(
                  "block bg-custom-primary-lighter p-6 rounded-lg shadow-lg hover:shadow-custom-accent3/20 transition-shadow duration-300 animate-in",
                  isIntersecting && "show"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {post.image && (
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover rounded-md mb-6"
                  />
                )}
                <h3 className="text-xl text-custom-secondary font-semibold mb-2 hover:text-custom-accent3 transition-colors duration-300">
                  {post.title}
                </h3>
                <p className="text-custom-accent1 text-sm mb-3">{post.date}</p>
                <p className="text-custom-accent2 mb-4">{post.excerpt}</p>
                <span className="text-custom-accent3 font-semibold hover:underline">
                  Read More »
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
          style={{ animationDelay: "0.3s" }}
        >
          <Link href="/blog">
            <a className="inline-block border border-custom-accent3 text-custom-accent3 px-8 py-3 rounded font-mono hover:bg-custom-accent3/10 transition-colors duration-300">
              View All Posts
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
