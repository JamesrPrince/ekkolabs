import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn, scrollToSection } from "@/lib/utils";

export default function Hero() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section
      id="hero"
      ref={elementRef}
      className="min-h-screen flex flex-col justify-center pt-24 pb-16 bg-[#0A192F] text-left"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <div>
          <p
            className={cn(
              "text-[#64FFDA] font-mono mb-4 text-base md:text-lg animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            Hi, I'm Ekko.
          </p>

          <h1
            className={cn(
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-[#CCD6F6] mb-5 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            I build things for the web.
          </h1>

          <p
            className={cn(
              "max-w-xl text-[#8892B0] text-base md:text-lg leading-relaxed mb-10 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            I'm a software engineer specializing in building (and occasionally
            designing) exceptional digital experiences. Currently, I'm focused
            on building accessible, human-centered products at Upstatement.
            {/* This is a placeholder bio, update with actual content if available */}
          </p>

          <div
            className={cn("animate-in", isIntersecting && "show")}
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("contact")}
              className="border border-[#64FFDA] text-[#64FFDA] px-8 py-4 rounded font-mono text-base hover:bg-[#64FFDA]/10 transition-colors duration-300"
            >
              Get In Touch
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
