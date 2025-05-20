import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import SocialLinks from "@/components/SocialLinks";
import EmailLink from "@/components/EmailLink";
import Footer from "@/components/Footer";

// Import section components
import Hero from "@/components/sections/Hero";
// We'll create a new AboutSnippet component or adapt the existing About section
// For now, let's assume a new component:
// import AboutSnippet from "@/components/sections/AboutSnippet";
import Projects from "@/components/sections/Projects"; // This will be adapted for "Featured Projects"
import Skills from "@/components/sections/Skills";
// We'll create a new RecentBlogPosts component
// import RecentBlogPosts from "@/components/sections/RecentBlogPosts";
import Contact from "@/components/sections/Contact"; // This will be adapted for the "What's Next?" CTA

// Placeholder for AboutSnippet - to be created in a separate file
const AboutSnippet = () => (
  <section
    id="about-snippet"
    className="py-16 md:py-24 bg-[#0A192F] text-center animate-in show"
  >
    <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
      <h2
        className="text-3xl md:text-4xl font-bold text-[#CCD6F6] mb-6 animate-in show"
        style={{ animationDelay: "0.1s" }}
      >
        A Little About Me
      </h2>
      <p
        className="text-[#8892B0] text-lg md:text-xl max-w-2xl mx-auto mb-8 animate-in show"
        style={{ animationDelay: "0.2s" }}
      >
        I'm a passionate full-stack developer with a knack for creating elegant
        and efficient solutions. I thrive on turning complex problems into
        beautiful, intuitive digital experiences. My journey in tech is driven
        by a constant desire to learn and innovate.
      </p>
      <a
        href="/about"
        className="text-[#64FFDA] border border-[#64FFDA] rounded-md px-8 py-3 hover:bg-[#64FFDA]/10 transition-colors duration-300 animate-in show"
        style={{ animationDelay: "0.3s" }}
        onClick={(e) => {
          e.preventDefault();
          // Assuming wouter is used globally, otherwise need to import useLocation
          // For simplicity, direct navigation attribute is used. Proper SPA navigation should be ensured.
          window.dispatchEvent(new PopStateEvent("popstate")); // Trigger router update if needed by wouter
          window.history.pushState({}, "", "/about");
        }}
      >
        More About Me
      </a>
    </div>
  </section>
);

// Placeholder for RecentBlogPosts - to be created in a separate file
const RecentBlogPosts = () => {
  // Sample data - replace with actual data fetching
  const posts = [
    {
      id: 1,
      title: "Building a Portfolio with React",
      date: "May 15, 2025",
      excerpt: "A step-by-step guide...",
      link: "/blog/1",
    },
    {
      id: 2,
      title: "Serverless Functions Guide",
      date: "May 10, 2025",
      excerpt: "Learn about serverless...",
      link: "/blog/2",
    },
    {
      id: 3,
      title: "Animations with Framer Motion",
      date: "May 5, 2025",
      excerpt: "Create responsive animations...",
      link: "/blog/3",
    },
  ];

  return (
    <section
      id="recent-blog"
      className="py-16 md:py-24 bg-[#0A192F] animate-in show"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className="text-3xl md:text-4xl font-bold text-[#CCD6F6] mb-12 text-center animate-in show"
          style={{ animationDelay: "0.1s" }}
        >
          From the Blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="bg-[#112240] p-6 rounded-lg shadow-lg border border-[#1E3A5F] hover:shadow-teal-glow transition-shadow duration-300 animate-in show"
              style={{ animationDelay: `0.2 + index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold text-[#CCD6F6] mb-2">
                {post.title}
              </h3>
              <p className="text-sm text-[#8892B0] mb-3">{post.date}</p>
              <p className="text-[#8892B0] mb-4 text-sm">{post.excerpt}</p>
              <a
                href={post.link}
                className="text-[#64FFDA] hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  window.dispatchEvent(new PopStateEvent("popstate"));
                  window.history.pushState({}, "", post.link);
                }}
              >
                Read More &rarr;
              </a>
            </div>
          ))}
        </div>
        <div
          className="text-center mt-12 animate-in show"
          style={{ animationDelay: `0.2 + posts.length * 0.1}s` }}
        >
          <a
            href="/blog"
            className="text-[#64FFDA] border border-[#64FFDA] rounded-md px-8 py-3 hover:bg-[#64FFDA]/10 transition-colors duration-300"
            onClick={(e) => {
              e.preventDefault();
              window.dispatchEvent(new PopStateEvent("popstate"));
              window.history.pushState({}, "", "/blog");
            }}
          >
            View All Posts
          </a>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  // Scroll animation logic (can be kept or refactored into a custom hook if used widely)
  useEffect(() => {
    const handleScroll = () => {
      const animateElements = document.querySelectorAll(
        ".animate-in:not(.show)"
      );
      animateElements.forEach((el) => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150; // Adjust this value based on when you want the animation to trigger
        if (elementTop < window.innerHeight - elementVisible) {
          el.classList.add("show");
        }
      });
    };
    handleScroll(); // Initial check
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <SocialLinks />
      <EmailLink />

      <main className="bg-[#0A192F]">
        {" "}
        {/* Ensure main background is consistent */}
        <Hero />
        {/* Content for Hero needs to be updated: 
            "Hi, I'm Ekko." 
            "I build things for the web."
            Short bio.
            "Get In Touch" button.
        */}
        <AboutSnippet />
        <Projects featuredOnly={true} itemLimit={3} />
        {/* 
          The Projects component needs to be adapted:
          1. Accept a prop like \`featuredOnly={true}\` or \`itemLimit={3}\`.
          2. If \`featuredOnly\`, filter projects that have a 'featured: true' flag in their data.
          3. Update styling/layout if needed to match the "Featured Projects" design.
          4. Add a "View All Projects" button linking to the main projects page.
        */}
        <Skills />
        {/* Skills section might need a content/style update to "Skills Overview" */}
        <RecentBlogPosts />
        <Contact />
        {/* 
          The Contact section needs to be adapted for the "What's Next?" CTA:
          - Title: "What's Next?"
          - Text: "Although I’m not currently looking for any new opportunities, my inbox is always open. Whether you have a question or just want to say hi, I’ll try my best to get back to you!"
          - Button: "Get In Touch" (linking to contact options or a contact form)
        */}
      </main>

      <Footer />
    </>
  );
}
