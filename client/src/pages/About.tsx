import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import AboutSection from "@/components/sections/About";
import Skills from "@/components/sections/Skills";

export default function AboutPage() {
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
        <div className="pt-20">
          <div className="container mx-auto px-4 py-16 md:px-8 lg:px-16 xl:px-24">
            <h1 className="text-4xl md:text-5xl font-bold text-[#CCD6F6] mb-6">
              About Me
            </h1>
            <p className="text-[#8892B0] text-lg mb-12 max-w-2xl">
              Learn more about my background, skills, and the journey that led
              me to where I am today.
            </p>
          </div>
        </div>

        {/* We'll reuse the existing About component but without the section title */}
        <AboutSection standalone={true} />
        <Skills standalone={true} />
      </main>

      <Footer />
    </>
  );
}
