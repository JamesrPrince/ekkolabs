import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { profile } from "@/data/profile";
import { SOCIAL_LINKS } from "@/lib/constants";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-6 bg-custom-primary border-t border-border">
      {" "}
      {/* Use new theme colors */}
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center space-x-6 mb-4 md:hidden">
          <a
            href={SOCIAL_LINKS.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300" // Use new theme colors
            aria-label="LinkedIn"
          >
            <FontAwesomeIcon icon={["fab", "linkedin-in"]} />
          </a>
          <a
            href={SOCIAL_LINKS.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300" // Use new theme colors
            aria-label="GitHub"
          >
            <FontAwesomeIcon icon={["fab", "github"]} />
          </a>
          <a
            href={SOCIAL_LINKS.twitter}
            target="_blank"
            rel="noopener noreferrer"
            className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300" // Use new theme colors
            aria-label="Twitter"
          >
            <FontAwesomeIcon icon={["fab", "twitter"]} />
          </a>
          <a
            href={`mailto:your-email@example.com`} // Placeholder email
            className="text-custom-secondary hover:text-custom-accent3 transition-colors duration-300" // Use new theme colors
            aria-label="Email"
          >
            <FontAwesomeIcon icon="envelope" />
          </a>
        </div>
        <p className="text-custom-accent1 text-sm font-mono">
          Designed & Built by {profile.name}
        </p>{" "}
        {/* Use profile data and new theme color */}
        <p className="text-custom-accent2 text-xs mt-2">
          © {currentYear} All Rights Reserved
        </p>{" "}
        {/* Use new theme color */}
      </div>
    </footer>
  );
}
