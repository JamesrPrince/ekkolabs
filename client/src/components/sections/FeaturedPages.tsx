import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { NAV_LINKS } from "@/lib/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconName } from "@fortawesome/fontawesome-svg-core";
import { Link } from "wouter";

// Icons for each page type
const pageIcons: Record<string, IconName> = {
  Projects: "laptop-code" as IconName,
  About: "user" as IconName,
  Blog: "newspaper" as IconName,
};

const pageDescriptions: Record<string, string> = {
  Projects:
    "Explore my featured projects and case studies. See how I've helped organizations solve complex problems through data analysis and strategic planning.",
  About:
    "Learn more about my background, expertise, and approach to data analytics and business consulting. Discover what drives my passion for data-driven decision making.",
  Blog: "Read my latest thoughts and insights on data analytics, business intelligence, and industry trends. Stay updated with the latest methodologies and tools.",
};

export default function FeaturedPages() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
  });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section
      id="featured-pages"
      ref={elementRef}
      className="py-20 bg-[#112240]"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-12 animate-in",
            isIntersecting && "show"
          )}
        >
          <span className="text-[#64FFDA] font-mono mr-2">★</span> Explore More
          <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {NAV_LINKS.map((link, index) => (
            <div
              key={link.href}
              className={cn(
                "bg-[#1D293A] p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-[#212D40] group animate-in",
                isIntersecting && "show"
              )}
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-[#64FFDA]/10 flex items-center justify-center text-[#64FFDA] mr-4">
                  {mounted && (
                    <FontAwesomeIcon
                      icon={pageIcons[link.label] || ("circle" as IconName)}
                      className="text-xl"
                    />
                  )}
                </div>
                <h3 className="text-xl font-bold text-[#CCD6F6] group-hover:text-[#64FFDA] transition-colors duration-300">
                  {link.label}
                </h3>
              </div>

              <p className="text-[#8892B0] mb-6 min-h-[80px]">
                {pageDescriptions[link.label] ||
                  `Learn more about my ${link.label.toLowerCase()}.`}
              </p>

              <Button
                variant="ghost"
                className="text-[#64FFDA] hover:bg-[#64FFDA]/10 border border-[#64FFDA] group-hover:bg-[#64FFDA]/10 transition-all duration-300"
              >
                <Link href={link.href}>
                  <span className="cursor-pointer">
                    Explore {link.label} <span className="ml-2">→</span>
                  </span>
                </Link>
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
