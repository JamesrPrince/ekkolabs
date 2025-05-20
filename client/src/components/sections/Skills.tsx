import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@/components/ui/card";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { useEffect, useState } from "react";

export default function Skills() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      // Add a slight delay before starting the skill bar animations
      const timeout = setTimeout(() => {
        setSkillsVisible(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isIntersecting]);

  return (
    <section id="skills" ref={elementRef} className="py-24 bg-[#112240]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-16 animate-in",
            isIntersecting && "show"
          )}
        >
          <span className="text-[#64FFDA] font-mono mr-2">02.</span> Skills &
          Expertise
          <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-12">
          <div className={cn("animate-in", isIntersecting && "show")}>
            <h3 className="text-xl text-[#CCD6F6] font-semibold mb-8">
              Technical Skills
            </h3>

            <div className="space-y-6">
              {SKILL_CATEGORIES[0]?.skills?.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-[#CCD6F6]">{skill.label}</span>
                    <span className="text-[#64FFDA]">{skill.percentage}%</span>
                  </div>
                  <div className="w-full bg-[#0A192F] rounded-full h-2.5">
                    <div
                      className={cn(
                        "bg-[#64FFDA] h-2.5 rounded-full skill-bar",
                        skillsVisible && "transition-all duration-1000 ease-out"
                      )}
                      style={{
                        width: skillsVisible ? `${skill.percentage}%` : "0",
                        transitionDelay: `${index * 150}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div
            className={cn("animate-in", isIntersecting && "show")}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-xl text-[#CCD6F6] font-semibold mb-8">
              Core Competencies
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {SKILL_CATEGORIES[1]?.competencies?.map((competency, index) => (
                <Card
                  key={index}
                  className="bg-[#0A192F] p-6 rounded-lg transition-transform hover:-translate-y-2 duration-300 border-none"
                >
                  <div className="text-[#64FFDA] text-2xl mb-3">
                    <FontAwesomeIcon icon={competency.icon as any} />
                  </div>
                  <h4 className="text-[#CCD6F6] font-medium mb-2">
                    {competency.title}
                  </h4>
                  <p className="text-[#8892B0] text-sm">
                    {competency.description}
                  </p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
