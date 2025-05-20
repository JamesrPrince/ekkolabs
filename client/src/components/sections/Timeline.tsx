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
    <section id="timeline" ref={elementRef} className="py-24 bg-[#0A192F]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {!standalone && (
          <h2
            className={cn(
              "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-12 animate-in",
              isIntersecting && "show"
            )}
          >
            <span className="text-[#64FFDA] font-mono mr-2">03.</span> Journey
            <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
          </h2>
        )}

        <div className="relative">
          {/* Timeline center line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-[#1E3A5F] transform md:-translate-x-1/2"></div>

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
                <div className="absolute left-4 md:left-1/2 w-8 h-8 bg-[#112240] rounded-full border-2 border-[#64FFDA] transform -translate-x-1/2 flex items-center justify-center z-20">
                  <FontAwesomeIcon
                    icon={item.icon as any}
                    className="text-[#64FFDA] text-sm"
                  />
                </div>

                {/* Content container */}
                <div className="relative ml-12 md:ml-0 md:w-1/2 md:px-8">
                  <div
                    className={cn(
                      "bg-[#112240] p-6 rounded-lg border border-[#1E3A5F] shadow-lg transform transition-all duration-300 hover:-translate-y-1 hover:shadow-xl",
                      isIntersecting && "show"
                    )}
                  >
                    <div className="flex flex-col h-full">
                      {/* Header */}
                      <div>
                        <div className="mb-1 text-xs text-[#64FFDA] font-mono">
                          {item.period}
                        </div>
                        <h3 className="text-xl text-[#CCD6F6] font-bold mb-1">
                          {item.title}
                        </h3>
                        <div className="text-[#8892B0] mb-3">
                          {item.company} • {item.type}
                        </div>
                        <div className="text-sm text-[#8892B0] mb-4">
                          {item.location}
                        </div>
                      </div>

                      {/* Body */}
                      <div className="flex-grow">
                        <ul className="space-y-2">
                          {item.responsibilities.map((resp, i) => (
                            <li
                              key={i}
                              className="text-sm text-[#8892B0] flex items-start"
                            >
                              <span className="text-[#64FFDA] mr-2 mt-1">▹</span>
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
                            className="text-xs bg-[#1E3A5F] text-[#64FFDA] px-2 py-1 rounded"
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
