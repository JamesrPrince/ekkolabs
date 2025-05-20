import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/profile";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  standalone?: boolean;
  featuredOnly?: boolean; // Added featuredOnly prop
  itemLimit?: number; // Optional: to limit items for homepage
}

export default function Projects({
  standalone = false,
  featuredOnly = false,
  itemLimit,
}: ProjectsProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  // Show all is true by default if not standalone, to prevent button initially showing for featured section
  const [showAll, setShowAll] = useState(standalone ? false : true);

  // Initial filter based on featuredOnly prop
  let projectsToDisplay = featuredOnly
    ? projects.filter((project) => project.featured)
    : projects;

  // Further filter by selected category if not featuredOnly view
  if (!featuredOnly) {
    projectsToDisplay =
      selectedCategory === "All"
        ? projectsToDisplay
        : projectsToDisplay.filter(
            (project) => project.category === selectedCategory
          );
  }

  // Apply itemLimit if provided (primarily for featuredOnly on homepage)
  if (itemLimit && projectsToDisplay.length > itemLimit) {
    projectsToDisplay = projectsToDisplay.slice(0, itemLimit);
  }

  // Determine visible projects based on showAll state (only relevant if not featuredOnly and more than 6)
  const visibleProjects =
    !featuredOnly && !showAll && projectsToDisplay.length > 6
      ? projectsToDisplay.slice(0, 6)
      : projectsToDisplay;

  return (
    <section
      id="projects"
      ref={elementRef}
      className={cn(
        "py-16 md:py-24",
        standalone ? "bg-[#112240]" : "bg-[#0A192F]"
      )}
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-3xl md:text-4xl font-bold text-[#CCD6F6] mb-12 animate-in",
            isIntersecting && "show",
            featuredOnly ? "justify-center" : ""
          )}
          style={{ animationDelay: "0.1s" }}
        >
          {/* Conditional rendering for title based on context */}
          {!standalone && !featuredOnly && (
            <span className="text-[#64FFDA] font-mono mr-2">03.</span>
          )}
          {featuredOnly
            ? "Featured Projects"
            : standalone
            ? "All Projects"
            : "Some Things I’ve Built"}
          {!standalone && !featuredOnly && (
            <span className="ml-4 h-px bg-[#233554] flex-grow"></span>
          )}
        </h2>

        {/* Category filters: Only show if standalone and not featuredOnly */}
        {standalone && !featuredOnly && (
          <div
            className={cn(
              "flex flex-wrap justify-center gap-2 md:gap-4 mb-12 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.2s" }}
          >
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={cn(
                  "px-3 py-1 md:px-4 md:py-2 rounded text-sm md:text-base",
                  selectedCategory === category
                    ? "text-[#64FFDA] bg-[#64FFDA]/10"
                    : "text-[#8892B0] hover:text-[#64FFDA] hover:bg-[#64FFDA]/10"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        )}

        {/* Project Grid */}
        <div
          className={cn(
            "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in",
            isIntersecting && "show"
          )}
        >
          {visibleProjects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "project-card bg-[#112240] rounded-lg overflow-hidden shadow-lg border border-[#1E3A5F] relative group animate-in",
                // Add a subtle hover effect
                "hover:shadow-teal-glow transition-all duration-300 transform hover:-translate-y-1",
                isIntersecting && "show"
              )}
              style={{ animationDelay: `0.2s` }}
            >
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
              />
              {/* Overlay can be removed or simplified if not desired for homepage featured projects */}
              {/* <div className=\"project-overlay absolute inset-0 bg-[#0A192F]/70 transition-opacity duration-300 group-hover:opacity-0\"></div> */}

              <div className="p-6">
                <div className="flex justify-between items-center mb-3">
                  <p className="text-[#64FFDA] font-mono text-xs">
                    {project.featured && !standalone
                      ? "Featured Project"
                      : project.category}
                  </p>
                  <div className="flex gap-3">
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A8B2D1] hover:text-[#64FFDA] transition-colors duration-300"
                        aria-label={`View ${project.title} GitHub repository`}
                      >
                        <FontAwesomeIcon icon={["fab", "github"]} size="lg" />
                      </a>
                    )}
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#A8B2D1] hover:text-[#64FFDA] transition-colors duration-300"
                        aria-label={`View ${project.title} live site`}
                      >
                        <FontAwesomeIcon icon="external-link-alt" size="lg" />
                      </a>
                    )}
                  </div>
                </div>
                <h3 className="text-[#CCD6F6] text-xl font-bold mb-2 group-hover:text-[#64FFDA] transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-[#8892B0] text-sm mb-4 h-20 overflow-hidden">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="text-xs font-mono py-1 px-2 rounded-full bg-[#233554] text-[#64FFDA]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* "Show All/Less" Button: Only if standalone, not featuredOnly, and more than 6 projects */}
        {standalone && !featuredOnly && projectsToDisplay.length > 6 && (
          <div
            className={cn(
              "text-center mt-12 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              variant="outline"
              className="border border-[#64FFDA] text-[#64FFDA] px-8 py-3 rounded font-mono hover:bg-[#64FFDA]/10 transition-colors duration-300 text-sm"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less Projects" : "Show More Projects"}
            </Button>
          </div>
        )}

        {/* "View All Projects" Button: Only if featuredOnly and on homepage */}
        {featuredOnly && !standalone && (
          <div
            className={cn(
              "text-center mt-12 animate-in",
              isIntersecting && "show"
            )}
            style={{ animationDelay: "0.5s" }}
          >
            <a
              href="/projects" // Link to the standalone projects page
              className="text-[#64FFDA] border border-[#64FFDA] rounded-md px-8 py-3 hover:bg-[#64FFDA]/10 transition-colors duration-300 font-mono text-sm"
              onClick={(e) => {
                e.preventDefault();
                // Assuming wouter is used for navigation
                // Replace with actual wouter navigation if setLocation is available here
                // For now, using history API as a placeholder
                window.dispatchEvent(new PopStateEvent("popstate"));
                window.history.pushState({}, "", "/projects");
              }}
            >
              View All Projects
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
