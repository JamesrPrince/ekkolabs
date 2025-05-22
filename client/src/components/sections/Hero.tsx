import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn, scrollToSection } from "@/lib/utils";
import { profile } from "@/data/profile";
import { Link } from "wouter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Hero() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section
      id="hero"
      ref={elementRef}
      className="min-h-screen flex flex-col items-center justify-center pt-24 pb-12 bg-custom-primary text-custom-secondary relative overflow-hidden"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 flex flex-col md:flex-row items-center gap-8 z-10">
        {/* Left Column: Text Content */}
        <div className="md:w-3/5 text-center md:text-left">
          <p
            className={cn(
              "text-custom-accent3 font-mono mb-3 text-lg animate-in",
              isIntersecting && "show"
            )}
          >
            Hi, my name is
          </p>

          <h1
            className={cn(
              "text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-in", // White for max contrast on dark primary
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.1s" }}
          >
            {profile.name}.
          </h1>

          <h2
            className={cn(
              "text-3xl md:text-4xl lg:text-5xl font-bold text-custom-accent1 mb-6 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            I build things for the web.
          </h2>

          <p
            className={cn(
              "max-w-xl text-custom-accent2 text-lg leading-relaxed mb-10 animate-in mx-auto md:mx-0",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.3s" }}
          >
            {profile.intro}
          </p>

          <div
            className={cn(
              "animate-in flex flex-col sm:flex-row gap-4 items-center justify-center md:justify-start",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              size="lg"
              onClick={() => scrollToSection("contact")} // Changed to contact section
              className="bg-custom-accent3 text-white hover:bg-opacity-90 px-8 py-3 rounded font-semibold transition-colors duration-300 w-full sm:w-auto"
            >
              Say Hello
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="border-custom-accent3 text-custom-accent3 hover:bg-custom-accent3 hover:text-white px-8 py-3 rounded font-semibold transition-colors duration-300 w-full sm:w-auto"
            >
              My Work
            </Button>
          </div>

          {/* Social Links - adapted from design */}
          <div
            className={cn(
              "mt-10 flex items-center justify-center md:justify-start space-x-6 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            <p className="text-custom-accent2 font-mono">Follow me:</p>
            {/* Assuming SocialLinks component is updated or use direct links */}
            {/* This part can be replaced with your existing SocialLinks component if styled appropriately */}
            <a
              href="#"
              className="text-custom-secondary hover:text-custom-accent3"
            >
              <FontAwesomeIcon icon={["fab", "behance"]} size="lg" />
            </a>
            <a
              href="#"
              className="text-custom-secondary hover:text-custom-accent3"
            >
              <FontAwesomeIcon icon={["fab", "linkedin-in"]} size="lg" />
            </a>
            <a
              href="#"
              className="text-custom-secondary hover:text-custom-accent3"
            >
              <FontAwesomeIcon icon={["fab", "dribbble"]} size="lg" />
            </a>
          </div>
        </div>

        {/* Right Column: Image - adapted from design */}
        <div className="md:w-2/5 mt-10 md:mt-0 flex justify-center relative animate-in">
          <div className="relative w-72 h-72 md:w-80 md:h-80 lg:w-96 lg:h-96">
            <div className="absolute inset-0 bg-custom-accent3 rounded-full transform scale-105 blur-xl opacity-30"></div>{" "}
            {/* Decorative shape */}
            <img
              src={profile.photo}
              alt={profile.name}
              className="relative rounded-full w-full h-full object-cover shadow-2xl border-4 border-custom-accent2/50 z-10"
            />
            {/* Decorative elements from design (simplified) */}
            <div className="absolute -top-4 -left-4 w-16 h-16 border-2 border-custom-accent3 rounded-full opacity-50 z-0"></div>
            <div className="absolute -bottom-4 -right-4 w-20 h-20 border-2 border-custom-accent3 rounded-tl-full rounded-br-full opacity-50 z-0"></div>
          </div>
        </div>
      </div>

      {/* Optional: Scroll indicator if needed, styled for new theme */}
      {/* <div ... /> */}
    </section>
  );
}
