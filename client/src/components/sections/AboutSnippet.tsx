// filepath: /Users/ekko/Developer/ekkolabs/client/src/components/sections/AboutSnippet.tsx
import { profile } from "@/data/profile";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faBriefcase } from "@fortawesome/free-solid-svg-icons";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { experience } from "@/data/profile"; // Import experience

export default function AboutSnippet() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  // Calculate years of experience from the most recent job
  // This is a simplified calculation. For more accuracy, consider specific start/end dates.
  let yearsOfExperience = "0+"; // Default
  if (experience && experience.length > 0) {
    const latestExperience = experience[0];
    if (latestExperience.period.includes("Present")) {
      const startDateMatch = latestExperience.period.match(/(\w{3})\s(\d{4})/);
      if (startDateMatch) {
        const startMonthStr = startDateMatch[1];
        const startYear = parseInt(startDateMatch[2], 10);
        const monthMap: { [key: string]: number } = {
          Jan: 0,
          Feb: 1,
          Mar: 2,
          Apr: 3,
          May: 4,
          Jun: 5,
          Jul: 6,
          Aug: 7,
          Sep: 8,
          Oct: 9,
          Nov: 10,
          Dec: 11,
        };
        const startMonth = monthMap[startMonthStr];

        if (startMonth !== undefined) {
          const startDate = new Date(startYear, startMonth);
          const currentDate = new Date();
          let years = currentDate.getFullYear() - startDate.getFullYear();
          const m = currentDate.getMonth() - startDate.getMonth();
          if (
            m < 0 ||
            (m === 0 && currentDate.getDate() < startDate.getDate())
          ) {
            years--;
          }
          yearsOfExperience = `${years}+`;
        }
      } else if (latestExperience.duration) {
        // Fallback to duration if period parsing fails
        const yearMatch = latestExperience.duration.match(/(\d+)\syr/);
        if (yearMatch && yearMatch[1]) {
          yearsOfExperience = `${yearMatch[1]}+`;
        }
      }
    }
  }

  return (
    <section
      id="about-snippet"
      ref={elementRef}
      className="py-20 md:py-28 bg-custom-accent3 text-custom-primary"
    >
      <div
        className={cn(
          "container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 animate-in",
          isIntersecting && "show"
        )}
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="md:pr-8">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">About Me</h2>
            <p className="text-lg mb-6 leading-relaxed">
              {profile.bio.length > 0
                ? profile.bio[0]
                : "A brief introduction about yourself."}
            </p>
            <p className="text-lg mb-8 leading-relaxed">
              {profile.bio.length > 1
                ? profile.bio[1]
                : "More details about your background and expertise."}
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
              <Button
                asChild
                size="lg"
                className="bg-custom-primary text-custom-accent3 hover:bg-custom-primary/90 transition-colors duration-300 text-base font-semibold py-3 px-8 rounded-lg shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <a href="/images/cv-prince-chisenga.pdf" download>
                  <FontAwesomeIcon icon={faDownload} className="mr-3" />
                  Download CV
                </a>
              </Button>
            </div>
          </div>
          <div className="mt-10 md:mt-0">
            <div className="bg-custom-primary text-custom-secondary p-8 rounded-xl shadow-2xl">
              <div className="flex items-center mb-6">
                <FontAwesomeIcon
                  icon={faBriefcase}
                  className="text-custom-accent3 text-3xl mr-4"
                />
                <div>
                  <h3 className="text-2xl font-bold text-custom-secondary">
                    Years of Experience
                  </h3>
                  <p className="text-5xl font-extrabold text-custom-accent3">
                    {yearsOfExperience}
                  </p>
                </div>
              </div>
              <h4 className="text-xl font-semibold text-custom-secondary mb-3">
                My Core Skills Include:
              </h4>
              <ul className="space-y-2">
                {profile.skills.slice(0, 4).map((skill, index) => (
                  <li
                    key={index}
                    className="flex items-center text-custom-accent2"
                  >
                    <span className="text-custom-accent3 mr-2 text-lg">✓</span>
                    {skill}
                  </li>
                ))}
              </ul>
              {profile.skills.length > 4 && (
                <p className="text-custom-accent1 mt-3 text-sm">...and more.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
