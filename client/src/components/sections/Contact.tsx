import { cn } from "@/lib/utils";
import { CONTACT_EMAIL } from "@/lib/constants";
import useIntersectionObserver from "@/hooks/use-intersection-observer";

export default function Contact() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section
      id="contact" // Keep id for potential navigation from Hero button
      ref={elementRef}
      className="py-24 md:py-32 bg-[#0A192F] text-center" // Adjusted padding and background
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 max-w-2xl">
        {/* Removed section number prefix "04." */}
        <h2
          className={cn(
            "text-2xl md:text-3xl font-mono text-[#64FFDA] mb-4 animate-in", // Styling for "What's Next?" title
            isIntersecting && "show"
          )}
          style={{ animationDelay: "0.1s" }}
        >
          What's Next?
        </h2>

        {/* Removed the main title "Get In Touch" */}

        <div
          className={cn("animate-in", isIntersecting && "show")}
          style={{ animationDelay: "0.2s" }}
        >
          <p className="text-[#8892B0] text-base md:text-lg leading-relaxed mb-8">
            Although I’m not currently looking for any new opportunities, my
            inbox is always open. Whether you have a question or just want to
            say hi, I’ll try my best to get back to you!
          </p>
          <a
            href={`mailto:${CONTACT_EMAIL}`} // Make sure CONTACT_EMAIL is correctly imported/defined
            className="inline-block border border-[#64FFDA] text-[#64FFDA] px-8 py-4 rounded font-mono text-sm hover:bg-[#64FFDA]/10 transition-colors duration-300"
            // Adjusted padding and text size
          >
            Get In Touch
          </a>
        </div>

        {/* The original contact form and detailed contact info are removed for this CTA version */}
        {/* If a full contact page is needed elsewhere, that would be a separate component or a conditional render */}
      </div>
    </section>
  );
}
