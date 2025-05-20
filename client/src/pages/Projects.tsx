import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import ProjectsSection from "@/components/sections/Projects";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cn } from "@/lib/utils";
import { projects } from "@/data/profile";

export default function ProjectsPage() {
  const [featuredProject, setFeaturedProject] = useState(
    projects.find((p) => p.featured)
  );

  // Add scroll animations for elements with animate-in class
  useEffect(() => {
    const handleScroll = () => {
      const animateElements = document.querySelectorAll(
        ".animate-in:not(.show)"
      );

      animateElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add("show");
        }
      });
    };

    // Check on initial load in case some elements are already in view
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Clean up
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main>
        <div className="pt-20 bg-[#0A192F] bg-opacity-90">
          <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
            <h1 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-6 animate-in">
              Projects
            </h1>
            <p
              className="text-[#8892B0] text-lg mb-12 max-w-2xl animate-in"
              style={{ animationDelay: "0.1s" }}
            >
              Explore my recent projects and see how I approach problem-solving
              through data analysis, visualization, and strategic
              implementation.
            </p>

            {featuredProject && (
              <div
                className="mb-20 animate-in"
                style={{ animationDelay: "0.2s" }}
              >
                <h2 className="text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-4">
                  <span className="text-[#64FFDA]">Featured:</span>{" "}
                  {featuredProject.title}
                </h2>
                <Card className="bg-[#112240] border border-[#1E3A5F] overflow-hidden hover:shadow-lg transition-all duration-300">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="overflow-hidden">
                      <img
                        src={featuredProject.image}
                        alt={featuredProject.title}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {featuredProject.technologies.map((tech, i) => (
                            <span
                              key={i}
                              className="text-xs bg-[#1E3A5F] text-[#64FFDA] px-2 py-1 rounded"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                        <p className="text-[#8892B0] mb-6">
                          {featuredProject.description}
                        </p>
                      </div>
                      <div className="flex gap-4">
                        {featuredProject.links.github && (
                          <Button
                            variant="ghost"
                            className="border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
                            onClick={() =>
                              window.open(
                                featuredProject.links.github,
                                "_blank"
                              )
                            }
                          >
                            <FontAwesomeIcon
                              icon={["fab", "github"]}
                              className="mr-2"
                            />
                            Source Code
                          </Button>
                        )}
                        {featuredProject.links.live && (
                          <Button
                            variant="outline"
                            className="border border-[#64FFDA] text-[#64FFDA] hover:bg-[#64FFDA]/10"
                            onClick={() =>
                              window.open(featuredProject.links.live, "_blank")
                            }
                          >
                            <FontAwesomeIcon
                              icon="external-link-alt"
                              className="mr-2"
                            />
                            Live Demo
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        </div>

        {/* Project timeline line */}
        <div className="relative py-16 bg-[#0A192F]">
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#1E3A5F] transform -translate-x-1/2 hidden md:block"></div>

          <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
            <h2 className="text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-12 text-center animate-in">
              Project Timeline
            </h2>

            <div className="relative z-10">
              {projects.slice(0, 3).map((project, index) => (
                <div
                  key={index}
                  className={cn(
                    "mb-16 md:flex items-center animate-in",
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  )}
                  style={{ animationDelay: `${0.1 * (index + 1)}s` }}
                >
                  <div
                    className={cn(
                      "w-full md:w-1/2 p-4",
                      index % 2 === 0
                        ? "md:text-right md:pr-12"
                        : "md:text-left md:pl-12"
                    )}
                  >
                    <h3 className="text-xl font-bold text-[#CCD6F6] mb-2">
                      {project.title}
                    </h3>
                    <p className="text-[#64FFDA] text-sm mb-2">
                      {project.category}
                    </p>
                    <p className="text-[#8892B0] mb-4">{project.description}</p>
                    <div
                      className={cn(
                        "flex flex-wrap gap-2 mb-4",
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      )}
                    >
                      {project.technologies.map((tech, i) => (
                        <span
                          key={i}
                          className="text-xs bg-[#1E3A5F] text-[#64FFDA] px-2 py-1 rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div
                      className={cn(
                        "flex gap-4",
                        index % 2 === 0 ? "justify-end" : "justify-start"
                      )}
                    >
                      {project.links.github && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#64FFDA] hover:bg-[#64FFDA]/10"
                          onClick={() =>
                            window.open(project.links.github, "_blank")
                          }
                        >
                          <FontAwesomeIcon
                            icon={["fab", "github"]}
                            className="mr-2"
                          />
                          Source
                        </Button>
                      )}
                      {project.links.live && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-[#64FFDA] hover:bg-[#64FFDA]/10"
                          onClick={() =>
                            window.open(project.links.live, "_blank")
                          }
                        >
                          <FontAwesomeIcon
                            icon="external-link-alt"
                            className="mr-2"
                          />
                          Demo
                        </Button>
                      )}
                    </div>
                  </div>

                  {/* Timeline dot */}
                  <div className="hidden md:block absolute left-1/2 w-5 h-5 bg-[#64FFDA] rounded-full transform -translate-x-1/2 shadow-lg shadow-[#64FFDA]/20"></div>

                  {/* Image section */}
                  <div className="w-full md:w-1/2 p-4">
                    <div className="overflow-hidden rounded shadow-lg">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-48 md:h-64 object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* All projects grid */}
        <ProjectsSection standalone={true} />
      </main>

      <Footer />
    </>
  );
}
