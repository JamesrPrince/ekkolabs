import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn, scrollToSection } from "@/lib/utils";
import { profile } from "@/data/profile";
import { Link } from "wouter";

export default function Hero() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section
      id="hero"
      ref={elementRef}
      className="min-h-screen flex flex-col items-center justify-between pt-16 pb-8 relative"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 flex-grow flex items-center">
        <div>
          <p
            className={cn(
              "text-[#64FFDA] font-mono mb-4 animate-in",
              isIntersecting && "show"
            )}
          >
            Hello, my name is
          </p>

          <h1
            className={cn(
              "text-4xl md:text-6xl lg:text-7xl font-bold text-[#CCD6F6] mb-4 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            {profile.name}
          </h1>

          <h2
            className={cn(
              "text-3xl md:text-5xl lg:text-6xl font-bold text-[#8892B0] mb-6 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {profile.title}
          </h2>

          <p
            className={cn(
              "max-w-2xl text-[#8892B0] text-lg leading-relaxed mb-12 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            {profile.intro}
          </p>

          <div
            className={cn(
              "animate-in flex flex-wrap gap-4",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="inline-block border border-[#64FFDA] text-[#64FFDA] px-6 py-4 rounded font-mono hover:bg-[#64FFDA]/10 transition-colors duration-300"
            >
              View My Work
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="inline-block text-[#8892B0] hover:text-[#64FFDA] hover:bg-[#64FFDA]/5 transition-colors duration-300"
            >
              <Link href="/about">
                <span className="cursor-pointer">About Me</span>
              </Link>
            </Button>
            <Button
              variant="ghost"
              size="lg"
              className="inline-block text-[#8892B0] hover:text-[#64FFDA] hover:bg-[#64FFDA]/5 transition-colors duration-300"
            >
              <Link href="/blog">
                <span className="cursor-pointer">Read My Blog</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={cn(
          "animate-bounce text-[#64FFDA] mb-8 mt-4 cursor-pointer",
          isIntersecting && "opacity-100",
          !isIntersecting && "opacity-0"
        )}
        onClick={() => scrollToSection("about")}
        style={{ animationDelay: "1s" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M12 5v14M5 12l7 7 7-7" />
        </svg>
      </div>
    </section>
  );
}
