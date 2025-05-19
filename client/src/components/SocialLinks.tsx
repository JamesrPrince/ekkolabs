import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SOCIAL_LINKS, CONTACT_EMAIL } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface SocialLinksProps {
  className?: string;
  iconSize?: string;
  vertical?: boolean;
}

export default function SocialLinks({ 
  className,
  iconSize = "lg",
  vertical = true
}: SocialLinksProps) {
  return (
    <div className={cn(
      "fixed left-8 bottom-0 hidden lg:block",
      className
    )}>
      <ul className={cn(
        "flex items-center after:content-[''] after:block after:w-px after:h-24 after:mx-auto after:bg-[#8892B0]",
        vertical 
          ? "flex-col space-y-6" 
          : "flex-row space-x-6 after:hidden"
      )}>
        <li>
          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-all duration-300 hover:-translate-y-1 inline-block"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} size={iconSize as any} />
          </a>
        </li>
        <li>
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-all duration-300 hover:-translate-y-1 inline-block"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={['fab', 'github']} size={iconSize as any} />
          </a>
        </li>
        <li>
          <a 
            href={SOCIAL_LINKS.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-all duration-300 hover:-translate-y-1 inline-block"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} size={iconSize as any} />
          </a>
        </li>
        <li>
          <a 
            href={`mailto:${CONTACT_EMAIL}`}
            className="text-[#8892B0] hover:text-[#64FFDA] transition-all duration-300 hover:-translate-y-1 inline-block"
            aria-label="Email"
          >
            <FontAwesomeIcon icon="envelope" size={iconSize as any} />
          </a>
        </li>
      </ul>
    </div>
  );
}
