import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { experience } from "@/data/profile";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

export default function Experience() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [showAll, setShowAll] = useState(false);

  const visibleExperiences = showAll ? experience : experience.slice(0, 3); // Show 3 by default

  return (
    <section
      id="experience"
      ref={elementRef}
      className="py-24 bg-custom-primary text-custom-secondary"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold mb-16 animate-in",
            isIntersecting && "show"
          )}
        >
          <span className="text-custom-accent3 font-mono mr-3">03.</span> My
          Career Journey
          <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-custom-accent1"></div>

            {visibleExperiences.map((job, index) => (
              <div
                key={index}
                className={cn(
                  "relative mb-12 pl-10",
                  "md:ml-0 md:pl-12", // All items to the right of the timeline on larger screens
                  "animate-in",
                  isIntersecting && "show"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div
                  className={cn(
                    "absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-custom-primary border-2 border-custom-accent3 transform -translate-x-1/2 flex items-center justify-center",
                    // Adjust icon position for single-sided timeline
                    "md:left-0 md:-translate-x-1/2"
                  )}
                >
                  <FontAwesomeIcon
                    icon={job.icon as any}
                    className="text-custom-accent3 text-sm"
                  />
                </div>

                <div
                  className={cn(
                    "p-6 bg-custom-primary-lighter rounded-lg shadow-lg", // Added shadow for depth
                    "md:ml-8" // Consistent margin for all items
                  )}
                >
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl text-custom-secondary font-semibold">
                        {job.title}
                      </h3>
                      <p className="text-custom-accent3">{job.company}</p>
                    </div>
                    <div className="text-custom-accent2 text-sm mt-1 md:mt-0">
                      {job.period}
                    </div>
                  </div>
                  <p className="text-custom-accent2 mb-4 text-sm">
                    {job.location} · {job.type}
                  </p>
                  <ul className="space-y-2 text-custom-accent2">
                    {job.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex text-sm">
                        <span className="text-custom-accent3 mr-2">▹</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, skillIndex) => (
                      <span
                        key={skillIndex}
                        className="text-xs font-mono py-1 px-3 rounded-full bg-custom-primary text-custom-accent3"
                      >
                        {skill}
                      </span>
                    ))}
                    \
                  </div>
                </div>
              </div>
            ))}

            {/* View More/Less Button */}
            {experience.length > 3 && (
              <div
                className={cn(
                  "flex justify-center mt-12 animate-in", // Added margin-top
                  isIntersecting && "show"
                )}
                style={{ animationDelay: "0.5s" }}
              >
                <Button
                  variant="outline"
                  className="border border-custom-accent3 text-custom-accent3 px-6 py-3 rounded font-mono text-sm hover:bg-custom-accent3 hover:text-custom-primary transition-colors duration-300"
                  onClick={() => setShowAll(!showAll)}
                >
                  {showAll ? "Show Less Experiences" : "View More Experiences"}
                </Button>
              </div>
            )}
            {/* Removed the "View Full Resume" button */}
          </div>
        </div>
      </div>
    </section>
  );
}
