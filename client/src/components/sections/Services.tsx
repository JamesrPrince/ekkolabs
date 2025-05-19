import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useIntersectionObserver from '@/hooks/use-intersection-observer';
import { cn } from '@/lib/utils';
import { SERVICES } from '@/lib/constants';

export default function Services() {
  const { elementRef, isIntersecting } = useIntersectionObserver({ triggerOnce: true });

  return (
    <section id="services" ref={elementRef} className="py-24">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24">
        <h2 className={cn(
          "flex items-center text-2xl md:text-3xl font-bold text-[#CCD6F6] mb-16 animate-in",
          isIntersecting && "show"
        )}>
          <span className="text-[#64FFDA] font-mono mr-2">05.</span> Services Offered
          <span className="ml-4 h-px bg-[#495670] flex-grow"></span>
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => (
            <div 
              key={index} 
              className={cn(
                "bg-[#112240] p-8 rounded-lg transition-all duration-300 hover:translate-y-[-10px] hover:shadow-lg hover:shadow-[#64FFDA]/5 animate-in",
                isIntersecting && "show"
              )}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-[#64FFDA] text-3xl mb-6">
                <FontAwesomeIcon icon={service.icon as any} />
              </div>
              <h3 className="text-xl text-[#CCD6F6] font-semibold mb-4">{service.title}</h3>
              <p className="text-[#8892B0] mb-6">{service.description}</p>
              <ul className="space-y-2 text-[#8892B0]">
                {service.capabilities.map((capability, capIndex) => (
                  <li key={capIndex} className="flex items-start">
                    <span className="text-[#64FFDA] mr-2 mt-1">▹</span>
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
