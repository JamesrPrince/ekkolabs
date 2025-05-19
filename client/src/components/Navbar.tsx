import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTheme } from '@/components/ThemeProvider';
import { NAV_LINKS } from '@/lib/constants';
import { cn, scrollToSection } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Handle scroll events to update active section and navbar styling
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      setScrolled(window.scrollY > 20);
      
      // Update active section based on scroll position
      const sections = NAV_LINKS.map(link => link.href.substring(1));
      
      // Include hero section in the sections to track
      const allSections = ['hero', ...sections];
      
      // Find the current active section
      for (let i = allSections.length - 1; i >= 0; i--) {
        const section = document.getElementById(allSections[i]);
        if (section) {
          const rect = section.getBoundingClientRect();
          if (rect.top <= 100) {
            setActiveSection(allSections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (href: string) => {
    const sectionId = href.substring(1); // Remove the # from href
    scrollToSection(sectionId);
    setIsMenuOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300",
      scrolled ? "bg-[#0A192F]/90 backdrop-blur-sm py-3 shadow-md" : "bg-transparent py-4"
    )}>
      <div className="container mx-auto px-4 flex justify-between items-center">
        <a href="#" className="text-[#64FFDA] font-mono text-2xl font-bold">PC</a>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:block">
          <ul className="flex space-x-8">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <button 
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "text-[#8892B0] hover:text-[#64FFDA] transition-colors duration-300 text-sm",
                    activeSection === link.href.substring(1) && "text-[#64FFDA]"
                  )}
                >
                  <span className="text-[#64FFDA] font-mono mr-1">{`0${index + 1}.`}</span>
                  {link.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        {/* Theme Toggle */}
        <Button 
          variant="ghost" 
          size="icon"
          onClick={toggleTheme}
          className="hidden md:flex text-[#8892B0] hover:text-[#64FFDA] hover:bg-transparent"
        >
          <FontAwesomeIcon icon={theme === 'dark' ? 'sun' : 'moon'} className="h-5 w-5" />
        </Button>
        
        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden text-[#8892B0] hover:text-[#64FFDA] hover:bg-transparent"
        >
          <FontAwesomeIcon icon="bars" className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Mobile Menu */}
      <div className={cn(
        "md:hidden bg-[#112240] absolute w-full transform transition-transform duration-300",
        isMenuOpen ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0"
      )}>
        <nav className="container mx-auto px-4 py-6">
          <ul className="space-y-4">
            {NAV_LINKS.map((link, index) => (
              <li key={link.href}>
                <button 
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "block w-full text-left py-2 pl-4 border-l-2 border-transparent",
                    activeSection === link.href.substring(1) 
                      ? "text-[#64FFDA] border-l-[#64FFDA]" 
                      : "text-[#8892B0] hover:text-[#64FFDA] hover:border-l-[#64FFDA]"
                  )}
                >
                  <span className="text-[#64FFDA] font-mono mr-2">{`0${index + 1}.`}</span>
                  {link.label}
                </button>
              </li>
            ))}
            <li className="pt-4">
              <Button 
                variant="ghost" 
                size="sm"
                onClick={toggleTheme}
                className="text-[#8892B0] hover:text-[#64FFDA] hover:bg-transparent"
              >
                <FontAwesomeIcon icon={theme === 'dark' ? 'sun' : 'moon'} className="h-4 w-4 mr-2" />
                {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
              </Button>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
