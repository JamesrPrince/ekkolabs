import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGraduationCap,
  faCertificate,
  faAward,
} from "@fortawesome/free-solid-svg-icons";

interface EducationProps {
  standalone?: boolean;
}

// Sample education data - in a real application, this would come from profile.ts
const educationData = [
  {
    degree: "Master of Science in Data Science",
    institution: "University of Zambia",
    period: "2018 - 2020",
    description:
      "Specialized in statistical modeling and machine learning applications for business intelligence. Graduated with distinction.",
    icon: faGraduationCap,
  },
  {
    degree: "Bachelor of Computer Science",
    institution: "University of Zambia",
    period: "2014 - 2018",
    description:
      "Focused on software engineering and database systems. Received honors for outstanding academic performance.",
    icon: faGraduationCap,
  },
];

const certifications = [
  {
    name: "Microsoft Certified: Data Analyst Associate",
    issuer: "Microsoft",
    date: "2023",
    icon: faCertificate,
  },
  {
    name: "AWS Certified Data Analytics - Specialty",
    issuer: "Amazon Web Services",
    date: "2022",
    icon: faCertificate,
  },
  {
    name: "Certified Business Intelligence Professional",
    issuer: "TDWI",
    date: "2021",
    icon: faCertificate,
  },
  {
    name: "Project Management Professional (PMP)",
    issuer: "Project Management Institute",
    date: "2020",
    icon: faCertificate,
  },
];

const awards = [
  {
    name: "Top Data Analyst Award",
    issuer: "African Data Science Association",
    year: "2024",
    icon: faAward,
  },
  {
    name: "Innovation in Technology Award",
    issuer: "Zambia Information and Communications Technology Authority",
    year: "2022",
    icon: faAward,
  },
];

export default function Education({ standalone = false }: EducationProps) {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section id="education" ref={elementRef} className="py-24 bg-[#112240]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        {!standalone && (
          <h2
            className={cn(
              "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-12 animate-in",
              isIntersecting && "show"
            )}
          >
            <span className="text-[#64FFDA] font-mono mr-2">04.</span> Education
            & Certifications
            <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
          </h2>
        )}

        <div className="grid md:grid-cols-2 gap-12">
          {/* Education & Awards Column */}
          <div
            className={cn("space-y-12 animate-in", isIntersecting && "show")}
          >
            {/* Education Section */}
            <div>
              <h3 className="text-xl text-[#CCD6F6] font-semibold mb-6 flex items-center">
                <FontAwesomeIcon
                  icon={faGraduationCap}
                  className="text-[#64FFDA] mr-3"
                />
                Academic Background
              </h3>

              <div className="space-y-8">
                {educationData.map((edu, index) => (
                  <div
                    key={index}
                    className="bg-[#0A192F] p-6 rounded-lg border border-[#1E3A5F] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="text-sm text-[#64FFDA] mb-2 font-mono">
                      {edu.period}
                    </div>
                    <h4 className="text-[#CCD6F6] font-bold mb-1">
                      {edu.degree}
                    </h4>
                    <div className="text-sm text-[#8892B0] mb-3">
                      {edu.institution}
                    </div>
                    <p className="text-sm text-[#8892B0]">{edu.description}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Awards Section */}
            <div>
              <h3 className="text-xl text-[#CCD6F6] font-semibold mb-6 flex items-center">
                <FontAwesomeIcon
                  icon={faAward}
                  className="text-[#64FFDA] mr-3"
                />
                Awards & Recognition
              </h3>

              <div className="space-y-4">
                {awards.map((award, index) => (
                  <div
                    key={index}
                    className="bg-[#0A192F] p-4 rounded-lg border border-[#1E3A5F] flex items-center transition-all duration-300 hover:-translate-x-1 hover:border-[#64FFDA]"
                  >
                    <div className="w-12 h-12 bg-[#112240] rounded-full flex items-center justify-center mr-4 text-[#64FFDA]">
                      <FontAwesomeIcon icon={award.icon} />
                    </div>
                    <div>
                      <h4 className="text-[#CCD6F6] font-bold">{award.name}</h4>
                      <div className="text-xs text-[#8892B0]">
                        {award.issuer} • {award.year}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Certifications Column */}
          <div
            className={cn("animate-in", isIntersecting && "show")}
            style={{ animationDelay: "0.2s" }}
          >
            <h3 className="text-xl text-[#CCD6F6] font-semibold mb-6 flex items-center">
              <FontAwesomeIcon
                icon={faCertificate}
                className="text-[#64FFDA] mr-3"
              />
              Professional Certifications
            </h3>

            <div className="grid gap-6">
              {certifications.map((cert, index) => (
                <div
                  key={index}
                  className="bg-[#0A192F] p-6 rounded-lg border border-[#1E3A5F] transition-all duration-300 hover:scale-105 hover:shadow-lg flex"
                >
                  <div className="w-16 h-16 bg-[#112240] rounded-lg flex items-center justify-center mr-4 text-[#64FFDA] text-2xl flex-shrink-0">
                    <FontAwesomeIcon icon={cert.icon} />
                  </div>
                  <div>
                    <h4 className="text-[#CCD6F6] font-bold mb-1">
                      {cert.name}
                    </h4>
                    <div className="text-sm text-[#8892B0] mb-1">
                      Issued by {cert.issuer}
                    </div>
                    <div className="text-xs text-[#64FFDA] font-mono">
                      Obtained in {cert.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 bg-[#1E3A5F] p-4 rounded-lg">
              <p className="text-[#CCD6F6] text-sm italic text-center">
                "Continuous learning and professional development are core to
                staying relevant in the rapidly evolving data landscape."
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
