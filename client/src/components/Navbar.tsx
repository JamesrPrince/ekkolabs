import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@/components/ThemeProvider";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "wouter";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();

  // Handle scroll events to update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background/90 backdrop-blur-sm py-3 shadow-md border-b border-border" // Use new theme colors
          : "bg-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/">
          {/* Use accent3 for the logo text color for vibrancy */}
          <span className="text-custom-accent3 font-mono text-2xl font-bold cursor-pointer">
            PC
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={cn(
                      "text-custom-secondary hover:text-custom-accent3 transition-colors duration-300 text-sm cursor-pointer", // Use new theme colors
                      location === link.href && "text-custom-accent3" // Active link color
                    )}
                  >
                    <span className="text-custom-accent3 font-mono mr-1">{`0${
                      index + 1
                    }.`}</span>
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="hidden md:flex text-custom-secondary hover:text-custom-accent3 hover:bg-transparent" // Use new theme colors
        >
          <FontAwesomeIcon
            icon={theme === "dark" ? "sun" : "moon"}
            className="h-5 w-5"
          />
        </Button>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden text-custom-secondary hover:text-custom-accent3 hover:bg-transparent" // Use new theme colors
        >
          <FontAwesomeIcon icon="bars" className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden bg-custom-primary absolute w-full transform transition-transform duration-300 border-b border-border", // Use new theme colors
          isMenuOpen
            ? "translate-y-0 opacity-100"
            : "-translate-y-full opacity-0"
        )}
      >
        <nav className="container mx-auto px-4 py-6">
          <ul className="space-y-4">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <Link href={link.href}>
                  <span
                    className={cn(
                      "block w-full text-left py-2 pl-4 border-l-2 border-transparent cursor-pointer",
                      location === link.href
                        ? "text-custom-accent3 border-l-custom-accent3" // Active link color
                        : "text-custom-secondary hover:text-custom-accent3 hover:border-l-custom-accent3" // Use new theme colors
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <span className="text-custom-accent3 font-mono mr-2">{`0${
                      index + 1
                    }.`}</span>
                    {link.label}
                  </span>
                </Link>
              </li>
            ))}
            <li className="pt-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleTheme}
                className="text-custom-secondary hover:text-custom-accent3 hover:bg-transparent" // Use new theme colors
              >
                <FontAwesomeIcon
                  icon={theme === "dark" ? "sun" : "moon"}
                  className="h-4 w-4 mr-2"
                />
                {theme === "dark" ? "Light Mode" : "Dark Mode"}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
