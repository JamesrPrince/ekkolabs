import { useEffect } from "react";

import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AboutSnippet from "@/components/sections/AboutSnippet"; // New About Snippet
import Contact from "@/components/sections/Contact";
import Experience from "@/components/sections/Experience";
import Hero from "@/components/sections/Hero";
import Projects from "@/components/sections/Projects";
import RecentBlogPosts from "@/components/sections/RecentBlogPosts"; // Added RecentBlogPosts
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Testimonials from "@/components/sections/Testimonials"; // Added Testimonials
import SocialLinks from "@/components/SocialLinks";

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
