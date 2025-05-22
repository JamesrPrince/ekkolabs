import { experience } from "@/data/profile";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface TimelineProps {
  standalone?: boolean;
}

export default function Timeline({ standalone = false }: TimelineProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="timeline" ref={elementRef} className="py-24 bg-custom-primary">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {!standalone && (
          <h2
            className={cn(
              "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-12 animate-in",
              isIntersecting && "show"
            )}
          >
            <span className="text-custom-accent3 font-mono mr-2">03.</span>{" "}
            Journey
            <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
          </h2>
        )}

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-custom-accent1 transform md:-translate-x-1/2"></div>

          {/* Timeline items */}
          <div className="relative z-10">
            {experience.map((item, index) => (
              <div
                key={index}
                className={cn(
                  "mb-12 relative md:flex items-stretch animate-in",
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-custom-primary-lighter rounded-full border-2 border-custom-accent3 transform -translate-x-1/2 flex items-center justify-center z-20">
                  <FontAwesomeIcon
                    icon={item.icon as any}
                    className="text-custom-accent3 text-sm"
                  />
                </div>

                {/* Content container */}
                <div className="relative ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div
                    className={cn(
                      "bg-custom-primary-lighter p-6 rounded-lg border border-custom-accent1 shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      isIntersecting && "show"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div>
                        <div className="mb-1 text-xs text-custom-accent3 font-mono">
                          {item.period}
                        </div>
                        <h3 className="text-xl text-custom-secondary font-bold mb-1">
                          {item.title}
                        </h3>
                        <div className="text-custom-accent2 mb-3">
                          {item.company} • {item.type}
                        </div>
                        <div className="text-sm text-custom-accent2 mb-4">
                          {item.location}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-grow">
                        <ul className="space-y-2">
                          {item.responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="text-sm text-custom-accent2 flex items-start"
                            >
                              <span className="text-custom-accent3 mr-2 mt-1">
                                ▹
                              </span>
                              <span>{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Footer */}
                      <div className="mt-4 flex flex-wrap gap-2">
                        {item.skills.map((skill, i) => (
                          <span
                            key={i}
                            className="text-xs bg-custom-primary text-custom-accent3 px-2 py-1 rounded"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
