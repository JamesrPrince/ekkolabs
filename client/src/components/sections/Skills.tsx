import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@/components/ui/card";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { SKILL_CATEGORIES } from "@/lib/constants";
import { useEffect, useState } from "react";

interface SkillsProps {
  standalone?: boolean;
}

export default function Skills({ standalone = false }: SkillsProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });
  const [skillsVisible, setSkillsVisible] = useState(false);

  useEffect(() => {
    if (isIntersecting) {
      const timeout = setTimeout(() => {
        setSkillsVisible(true);
      }, 500);

      return () => clearTimeout(timeout);
    }
  }, [isIntersecting]);

  return (
    <section id="skills" ref={elementRef} className="py-24 bg-custom-primary">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {!standalone && (
          <h2
            className={cn(
              "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-16 animate-in",
              isIntersecting && "show"
            )}
          >
            My expert areas
            <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
          </h2>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          <div className={cn("animate-in", isIntersecting && "show")}>
            <h3 className="text-xl text-custom-secondary font-semibold mb-8">
              Technical Skills
            </h3>

            <div className="space-y-6">
              {SKILL_CATEGORIES[0]?.skills?.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between mb-2">
                    <span className="text-custom-secondary">{skill.label}</span>
                    <span className="text-custom-accent3">
                      {skill.percentage}%
                    </span>
                  </div>
                  <div className="w-full bg-custom-accent1/30 rounded-full h-2.5">
                    <div
                      className={cn(
                        "bg-custom-accent3 h-2.5 rounded-full skill-bar",
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
            <h3 className="text-xl text-custom-secondary font-semibold mb-8">
              Core Competencies
            </h3>

            <div className="grid grid-cols-2 gap-6">
              {SKILL_CATEGORIES[1]?.competencies?.map((competency, index) => (
                <Card
                  key={index}
                  className="bg-custom-primary-lighter p-6 rounded-lg transition-transform hover:-translate-y-2 duration-300 border-none"
                >
                  <div className="text-custom-accent3 text-2xl mb-3">
                    <FontAwesomeIcon icon={competency.icon as any} />
                  </div>
                  <h4 className="text-custom-secondary font-medium mb-2">
                    {competency.title}
                  </h4>
                  <p className="text-custom-accent2 text-sm">
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
