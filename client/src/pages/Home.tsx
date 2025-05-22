import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Hero from "@/components/sections/Hero";
import AboutSnippet from "@/components/sections/AboutSnippet"; // New About Snippet
import Skills from "@/components/sections/Skills";
import Experience from "@/components/sections/Experience";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Testimonials from "@/components/sections/Testimonials"; // Added Testimonials
import RecentBlogPosts from "@/components/sections/RecentBlogPosts"; // Added RecentBlogPosts
import Contact from "@/components/sections/Contact";
import Footer from "@/components/Footer";

export default function Home() {
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
        <Hero />
        <AboutSnippet /> {/* Added About Snippet */}
        <Skills />
        <Experience />
        <Projects />
        {/* <FeaturedPages /> */}
        {/* Temporarily commented out as per design focus */}
        <Services />
        <Testimonials /> {/* Added Testimonials */}
        <RecentBlogPosts /> {/* Added RecentBlogPosts */}
        <Contact />
      </main>

      <Footer />
    </>
  );
}
