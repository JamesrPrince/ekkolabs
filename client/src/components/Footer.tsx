import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SOCIAL_LINKS } from '@/lib/constants';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-[#0A192F]">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4 md:hidden">
          <a 
            href={SOCIAL_LINKS.linkedin} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={['fab', 'linkedin-in']} />
          </a>
          <a 
            href={SOCIAL_LINKS.github} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={['fab', 'github']} />
          </a>
          <a 
            href={SOCIAL_LINKS.twitter} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={['fab', 'twitter']} />
          </a>
          <a 
            href="mailto:prince.chisenga@example.com"
            className="text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300"
            aria-label="Email"
          >
            <FontAwesomeIcon icon="envelope" />
          </a>
        </div>
        <p className="text-[#8892B0] text-sm font-mono">Designed & Built by Prince Chisenga</p>
        <p className="text-[#495670] text-xs mt-2">© {currentYear} All Rights Reserved</p>
      </div>
    </footer>
  );
}
