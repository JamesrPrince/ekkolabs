import {
  faDownload,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";

import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutSection from "@/components/sections/About";
import Education from "@/components/sections/Education";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import SocialLinks from "@/components/SocialLinks";
import { Button } from "@/components/ui/button";
import { profile } from "@/data/profile";
import { RESUME_URL } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Define the tabs for the about page
const tabs = [
  { id: "overview", label: "Overview" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
];

export default function AboutPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [expanded, setExpanded] = useState(false);

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

  // Navigate to a specific tab section
  const navigateToSection = (tabId: string) => {
    setActiveTab(tabId);
    const element = document.getElementById(tabId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main>
        <div className="pt-20 bg-custom-primary">
          <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
            <div className="md:flex items-end justify-between mb-12">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-custom-secondary mb-4 animate-in show">
                  About Me
                </h1>
                <p
                  className="text-custom-accent2 text-lg mb-6 max-w-2xl animate-in show"
                  style={{ animationDelay: "0.1s" }}
                >
                  Learn more about my background, skills, and the journey that
                  led me to where I am today.
                </p>
              </div>

              <Button
                variant="outline"
                className="border border-custom-accent3 text-custom-accent3 hover:bg-custom-accent3/10 px-8 py-2 animate-in show"
                style={{ animationDelay: "0.2s" }}
                onClick={() => window.open(RESUME_URL, "_blank")}
              >
                <FontAwesomeIcon icon={faDownload} className="mr-2" />
                Download Resume
              </Button>
            </div>

            {/* Tab navigation for larger screens */}
            <div
              className="hidden md:flex space-x-6 border-b border-custom-accent1 mb-12 animate-in show"
              style={{ animationDelay: "0.3s" }}
            >
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={cn(
                    "pb-4 px-2 relative font-medium transition-colors",
                    activeTab === tab.id
                      ? "text-custom-accent3"
                      : "text-custom-accent2 hover:text-custom-secondary"
                  )}
                  onClick={() => navigateToSection(tab.id)}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-custom-accent3"></span>
                  )}
                </button>
              ))}
            </div>

            {/* Mobile accordion intro */}
            <div className="md:hidden mb-8 bg-custom-primary-lighter p-4 rounded-lg animate-in show">
              <div
                className="flex justify-between items-center"
                onClick={() => setExpanded(!expanded)}
              >
                <h3 className="text-lg font-bold text-custom-secondary">
                  Quick Profile
                </h3>
                <FontAwesomeIcon
                  icon={expanded ? faChevronUp : faChevronDown}
                  className="text-custom-accent3"
                />
              </div>

              {expanded && (
                <div className="mt-4 text-custom-accent2">
                  <p className="mb-4">{profile.intro}</p>
                  <div className="flex justify-between">
                    <div>
                      <p className="text-xs text-custom-secondary mb-1">
                        Based in
                      </p>
                      <p className="text-sm">{profile.title}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-custom-accent3 hover:bg-custom-accent3/10 text-xs"
                      onClick={() => window.open(RESUME_URL, "_blank")}
                    >
                      <FontAwesomeIcon icon={faDownload} className="mr-1" />
                      Resume
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div id="overview">
          <AboutSection standalone={true} />
        </div>

        <div id="skills">
          <Skills standalone={true} />
        </div>

        <div id="experience">
          <Timeline standalone={true} />
        </div>

        <div id="education">
          <Education standalone={true} />
        </div>
      </main>

      <Footer />
    </>
  );
}
