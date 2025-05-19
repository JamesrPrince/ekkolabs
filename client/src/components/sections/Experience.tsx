import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button } from '@/components/ui/button';
import { experience } from '@/data/profile';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { RESUME_URL } from '@/lib/constants';

export default function Experience() {
  const { elementRef, isIntersecting } = useIntersectionObserver({ triggerOnce: true });
  const [showAll, setShowAll] = useState(false);
  
  // Show only the first 4 experiences by default
  const visibleExperiences = showAll ? experience : experience.slice(0, 4);

  return (
    <section id="experience" ref={elementRef} className="py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2 className={cn(
          "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-16 animate-in",
          isIntersecting && "show"
        )}>
          <span className="text-[#64FFDA] font-mono mr-2">03.</span> Work Experience
          <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
        </h2>
        
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 h-full w-px bg-[#495670]"></div>
            
            {visibleExperiences.map((job, index) => (
              <div key={index} className={cn(
                "relative mb-12 pl-10",
                index % 2 === 0 
                  ? "md:ml-0 md:pl-12" 
                  : "md:mr-1/2 md:pr-12 md:pl-0",
                "animate-in",
                isIntersecting && "show"
              )} style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="absolute left-0 md:left-1/2 top-0 w-8 h-8 rounded-full bg-[#0A192F] border-2 border-[#64FFDA] transform -translate-x-1/2 flex items-center justify-center">
                  <FontAwesomeIcon icon={job.icon as any} className="text-[#64FFDA] text-xs" />
                </div>
                
                <div className={cn(
                  "p-6 bg-[#112240] rounded-lg",
                  index % 2 === 0 ? "md:ml-8" : "md:mr-8"
                )}>
                  <div className="flex flex-wrap justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl text-[#CCD6F6] font-semibold">{job.title}</h3>
                      <p className="text-[#64FFDA]">{job.company}</p>
                    </div>
                    <div className="text-[#8892B0] text-sm mt-1 md:mt-0">
                      {job.period}
                    </div>
                  </div>
                  <p className="text-[#8892B0] mb-4">{job.location} · {job.type}</p>
                  <ul className="space-y-2 text-[#8892B0]">
                    {job.responsibilities.map((responsibility, respIndex) => (
                      <li key={respIndex} className="flex">
                        <span className="text-[#64FFDA] mr-2">▹</span>
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {job.skills.map((skill, skillIndex) => (
                      <span 
                        key={skillIndex} 
                        className="text-xs font-mono py-1 px-3 rounded-full bg-[#0A192F] text-[#64FFDA]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            
            {/* Resume Download Button */}
            <div className={cn(
              "flex justify-center animate-in",
              isIntersecting && "show"
            )} style={{ animationDelay: "0.5s" }}>
              {experience.length > 4 && !showAll ? (
                <Button
                  variant="outline"
                  className="border border-[#64FFDA] text-[#64FFDA] px-4 py-2 rounded font-mono text-sm hover:bg-[#64FFDA]/10 transition-colors duration-300"
                  onClick={() => setShowAll(true)}
                >
                  View More Experiences
                </Button>
              ) : (
                <Button
                  variant="outline"
                  className="border border-[#64FFDA] text-[#64FFDA] px-4 py-2 rounded font-mono text-sm hover:bg-[#64FFDA]/10 transition-colors duration-300"
                  asChild
                >
                  <a href={RESUME_URL} target="_blank" rel="noopener noreferrer">
                    View Full Resume
                  </a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
