import { profile } from "@/data/profile";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface AboutProps {
  standalone?: boolean;
}

export default function About({ standalone = false }: AboutProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section id="about" ref={elementRef} className="py-24 bg-custom-primary">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {!standalone && (
          <h2
            className={cn(
              "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-12 animate-in",
              isIntersecting && "show"
            )}
          >
            <span className="text-custom-accent3 font-mono mr-2">01.</span>{" "}
            About Me
            <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
          </h2>
        )}

        <div className="grid md:grid-cols-5 gap-12">
          <div
            className={cn("md:col-span-3 animate-in", isIntersecting && "show")}
          >
            {profile.bio.map((paragraph, index) => (
              <p
                key={index}
                className="text-custom-accent2 leading-relaxed mb-4"
              >
                {paragraph}
              </p>
            ))}

            <p className="text-custom-accent2 mt-6">
              Here are some technologies I work with:
            </p>
            <div className="grid grid-cols-2 mt-4 gap-x-4 gap-y-2">
              {profile.skills.map((skill, index) => (
                <div key={index} className="flex items-center">
                  <span className="text-custom-accent3 mr-2">▹</span>
                  <span className="text-custom-secondary">{skill}</span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn("md:col-span-2 animate-in", isIntersecting && "show")}
            style={{ animationDelay: "0.2s" }}
          >
            <div className="relative mx-auto max-w-xs md:max-w-full group">
              <div className="relative z-10 rounded overflow-hidden border-2 border-custom-accent3">
                <img
                  src={profile.photo}
                  alt={`${profile.name} - Professional portrait`}
                  className="rounded w-full grayscale hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <div className="absolute inset-0 border-2 border-custom-accent3 rounded translate-x-5 translate-y-5 -z-10 group-hover:translate-x-4 group-hover:translate-y-4 transition-all duration-300"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
