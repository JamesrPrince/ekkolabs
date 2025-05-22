import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useIntersectionObserver from "@/hooks/use-intersection-observer";
import { cn } from "@/lib/utils";
import { SERVICES } from "@/lib/constants";

export default function Services() {
  const { elementRef, isIntersecting } = useIntersectionObserver({
    triggerOnce: true,
  });

  return (
    <section id="services" ref={elementRef} className="py-24 bg-custom-primary">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2
          className={cn(
            "flex items-center text-2xl md:text-3xl font-bold text-custom-secondary mb-16 animate-in",
            isIntersecting && "show"
          )}
        >
          Services I Provide
          <span className="ml-4 h-px bg-custom-accent1 flex-grow"></span>
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div
              key={index}
              className={cn(
                "bg-custom-primary-lighter p-8 rounded-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-custom-accent3/5 animate-in",
                isIntersecting && "show"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-custom-accent3 text-3xl mb-6">
                <FontAwesomeIcon icon={service.icon as any} />
              </div>
              <h3 className="text-xl text-custom-secondary font-semibold mb-4">
                {service.title}
              </h3>
              <p className="text-custom-accent2 mb-6">{service.description}</p>
              <ul className="space-y-2 text-custom-accent2">
                {service.capabilities.map((capability, capIndex) => (
                  <li key={capIndex} className="flex items-start">
                    <span className="text-custom-accent3 mr-2 mt-1">▹</span>
                    <span>{capability}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
