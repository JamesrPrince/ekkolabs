import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { projects } from '@/data/profile';
import { PROJECT_CATEGORIES } from '@/lib/constants';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';

export default function Projects() {
  const { elementRef, isIntersecting } = useIntersectionObserver({ triggerOnce: true });
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAll, setShowAll] = useState(false);

  // Filter projects based on selected category
  const filteredProjects = selectedCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === selectedCategory);
  
  // Show only 6 projects initially if we have more
  const visibleProjects = showAll ? filteredProjects : filteredProjects.slice(0, 6);

  return (
    <section id="projects" ref={elementRef} className="py-24 bg-[#112240]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2 className={cn(
          "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-8 animate-in",
          isIntersecting && "show"
        )}>
          <span className="text-[#64FFDA] font-mono mr-2">04.</span> Featured Projects
          <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
        </h2>
        
        <div className="mb-12">
          {/* Project Categories */}
          <div className={cn(
            "flex flex-wrap justify-center gap-4 mb-12 animate-in",
            isIntersecting && "show"
          )}>
            {PROJECT_CATEGORIES.map((category) => (
              <Button
                key={category}
                variant="ghost"
                className={cn(
                  "px-4 py-2 rounded",
                  selectedCategory === category 
                    ? "text-[#CCD6F6] bg-[#0A192F] hover:bg-[#64FFDA]/10" 
                    : "text-[#8892B0] hover:text-[#CCD6F6] hover:bg-[#64FFDA]/10"
                )}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
          
          {/* Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleProjects.map((project, index) => (
              <div 
                key={index}
                className={cn(
                  "project-card bg-[#0A192F] rounded-lg overflow-hidden relative group animate-in",
                  isIntersecting && "show"
                )}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-64 object-cover" 
                />
                
                <div className="project-overlay absolute inset-0 bg-[#0A192F]/80 transition-opacity duration-300"></div>
                
                <div className="project-details absolute inset-0 p-6 flex flex-col justify-between transform translate-y-8 transition-transform duration-300">
                  <div>
                    <p className="text-[#64FFDA] font-mono text-sm mb-2">
                      {project.featured ? "Featured Project" : project.category}
                    </p>
                    <h3 className="text-[#CCD6F6] text-xl font-semibold mb-4">{project.title}</h3>
                    <p className="text-[#8892B0] text-sm mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.map((tech, techIndex) => (
                        <span 
                          key={techIndex} 
                          className="text-xs font-mono py-1 px-2 rounded-full bg-[#020C1B] text-[#64FFDA]"
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
                        className="text-[#CCD6F6] hover:text-[#64FFDA]"
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
                        className="text-[#CCD6F6] hover:text-[#64FFDA]"
                        aria-label={`View ${project.title} GitHub repository`}
                      >
                        <FontAwesomeIcon icon={['fab', 'github']} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Show All Projects Button */}
        {filteredProjects.length > 6 && (
          <div className={cn(
            "text-center animate-in",
            isIntersecting && "show"
          )} style={{ animationDelay: "0.5s" }}>
            <Button
              variant="outline"
              className="inline-block border border-[#64FFDA] text-[#64FFDA] px-6 py-4 rounded font-mono hover:bg-[#64FFDA]/10 transition-colors duration-300"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll ? "Show Less" : "View All Projects"}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
