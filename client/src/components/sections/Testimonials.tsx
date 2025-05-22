import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";

// Updated testimonials data with more varied and realistic placeholder data
const testimonials = [
  {
    quote:
      "Prince's analytical prowess and strategic thinking were instrumental in optimizing our sales pipeline. We saw a 25% increase in conversion rates within six months of implementing his recommendations.",
    name: "Sarah Chen",
    title: "VP of Sales, TechSolutions Inc.",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    quote:
      "The clarity and depth of Prince's market analysis reports are exceptional. He has a unique ability to distill complex data into actionable business intelligence. A true asset to any team.",
    name: "David Miller",
    title: "Chief Operating Officer, GlobalLogistics Co.",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote:
      "We engaged Prince for a critical data migration project, and his meticulous planning and execution ensured a seamless transition with zero downtime. His project management skills are top-notch.",
    name: "Aisha Khan",
    title: "IT Director, HealthBridge Corp.",
    image: "https://randomuser.me/api/portraits/women/67.jpg",
  },
  {
    quote:
      "Prince developed a custom BI dashboard that has revolutionized how we track our KPIs. It's intuitive, powerful, and has given us unprecedented visibility into our operations.",
    name: "Michael B. Jordan",
    title: "Founder, InnovateStartups LLC",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
  },
];

export default function Testimonials() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section
      id="testimonials"
      ref={elementRef}
      className="py-24 bg-custom-primary"
    >
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-16 animate-in",
            isIntersecting && "show"
          )}
        >
          Valuable feedback from my client
          <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
        </h2>

        <div className="grid md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className={cn(
                "bg-custom-primary-lighter p-8 rounded-lg shadow-lg animate-in",
                isIntersecting && "show"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <FontAwesomeIcon
                icon={faQuoteLeft}
                className="text-custom-accent3 text-4xl mb-6"
              />
              <p className="text-custom-accent2 italic mb-6 text-lg">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                {/* Optional: Add image if available 
                {testimonial.image && (
                  <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full mr-4" />
                )}
                */}
                <div>
                  <h4 className="text-custom-secondary font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-custom-accent1 text-sm">
                    {testimonial.title}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
