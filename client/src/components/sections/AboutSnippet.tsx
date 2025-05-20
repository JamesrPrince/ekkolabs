import { useLocation } from "wouter";
import { cn } from "@/lib/utils";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

export default function AboutSnippet() {
  const [, setLocation] = useLocation();
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  const navigateToAbout = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setLocation("/about");
  };

  return (
    <section
      id="about-snippet"
      ref={elementRef}
      className="py-16 md:py-24 bg-[#0A192F] text-center"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "text-3xl md:text-4xl font-bold text-[var(--color-lightest-slate)] mb-6 animate-in",
            isIntersecting && "show"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          A Little About Me
        </h2>
        <p
          className={cn(
            "text-[var(--color-slate)] text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-in",
            isIntersecting && "show"
          )}
          style={{ animationDelay: "0.2s" }}
        >
          I'm a passionate full-stack developer with a knack for creating
          elegant and efficient solutions. I thrive on turning complex problems
          into beautiful, intuitive digital experiences. My journey in tech is
          driven by a constant desire to learn and innovate.
        </p>
        <a
          href="/about"
          onClick={navigateToAbout}
          className={cn(
            "btn-outline animate-in", // Using the new btn-outline class from index.css
            isIntersecting && "show"
          )}
          style={{ animationDelay: "0.3s" }}
        >
          More About Me
        </a>
      </div>
    </section>
  );
}
