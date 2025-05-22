import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/profile";
import { PROJECT_CATEGORIES } from "@/lib/constants";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

interface ProjectsProps {
  standalone?: boolean;
}

export default function Projects({ standalone = false }: ProjectsProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const visibleProjects = showAll
    ? filteredProjects
    : filteredProjects.slice(0, 6);

  return (
    <section id="projects" ref={elementRef} className="py-24 bg-custom-primary">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {!standalone && (
          <h2
            className={cn(
              "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-8 animate-in",
              isIntersecting && "show"
            )}
          >
            My recently completed projects
            <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
          </h2>
        )}

        <div className="mb-12">
          <div
            className={cn(
              "flex flex-wrap justify-center gap-4 mb-12 animate-in",
              isIntersecting && "show"
            )}
          >
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={cn(
                  "px-4 py-2 rounded",
                  selectedCategory === category
                    ? "text-custom-secondary bg-custom-primary-lighter hover:bg-custom-accent3/10"
                    : "text-custom-accent2 hover:text-custom-secondary hover:bg-custom-accent3/10"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, index) => (
              <div
                key={index}
                className={cn(
                  "project-card bg-custom-primary-lighter rounded-lg overflow-hidden relative group animate-in",
                  isIntersecting && "show"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover"
                />

                <div className="project-overlay absolute inset-0 bg-custom-primary/80 transition-opacity duration-300"></div>

                <div className="project-details absolute inset-0 p-6 flex flex-col justify-between transform translate-y-8 transition-transform duration-300">
                  <div>
                    <p className="text-custom-accent3 font-mono text-sm mb-2">
                      {project.featured ? "Featured Project" : project.category}
                    </p>
                    <h3 className="text-custom-secondary text-xl font-semibold mb-4">
                      {project.title}
                    </h3>
                    <p className="text-custom-accent2 text-sm mb-4">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="text-xs font-mono py-1 px-2 rounded-full bg-custom-primary text-custom-accent3"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-4">
                    {project.links.live && (
                      <a
                        href={project.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-custom-secondary hover:text-custom-accent3"
                        aria-label={`View ${project.title} live site`}
                      >
                        <FontAwesomeIcon icon="external-link-alt" />
                      </a>
                    )}
                    {project.links.github && (
                      <a
                        href={project.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-custom-secondary hover:text-custom-accent3"
                        aria-label={`View ${project.title} GitHub repository`}
                      >
                        <FontAwesomeIcon icon={["fab", "github"]} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {filteredProjects.length > 6 && (
          <div
            className={cn("text-center animate-in", isIntersecting && "show")}
            style={{ animationDelay: "0.5s" }}
          >
            <Button
              variant="outline"
              className="inline-block border border-custom-accent3 text-custom-accent3 px-6 py-4 rounded font-mono hover:bg-custom-accent3/10 transition-colors duration-300"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "Show More"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
