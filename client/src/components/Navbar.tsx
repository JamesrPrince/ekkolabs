import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useEffect, memo } from "react";
import { Link, useLocation } from "wouter";

import { useTheme } from "@/components/ThemeProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useTrackedCallback } from "@/hooks/use-memo-callback";
import { a11y } from "@/lib/a11y";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";


const Navbar = memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [location] = useLocation();
  const { user, isAuthenticated, isAdmin, logout } = useAuth();

  // Get user initials for avatar fallback
  const getUserInitials = () => {
    if (!user || !user.name) return "U";

    const nameParts = user.name.split(" ");
    if (nameParts.length === 1) return nameParts[0].charAt(0).toUpperCase();

    return (
      nameParts[0].charAt(0) + nameParts[nameParts.length - 1].charAt(0)
    ).toUpperCase();
  };

  // Handle scroll events to update navbar styling
  useEffect(() => {
    const handleScroll = () => {
      // Update navbar background on scroll
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = useTrackedCallback(
    () => {
      setIsMenuOpen(!isMenuOpen);
    },
    [isMenuOpen],
    "toggleMenu"
  );

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

        {/* Right side actions */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleTheme}
            className="text-custom-secondary hover:text-custom-accent3 hover:bg-transparent" // Use new theme colors
            {...a11y.button({
              "aria-label":
                theme === "dark"
                  ? "Switch to light mode"
                  : "Switch to dark mode",
            })}
          >
            <FontAwesomeIcon
              icon={theme === "dark" ? "sun" : "moon"}
              className="h-5 w-5"
              aria-hidden="true"
            />
          </Button>

          {/* Authentication */}
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-8 w-8 rounded-full"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage
                      src={user?.image || ""}
                      alt={user?.name || "User"}
                    />
                    <AvatarFallback>{getUserInitials()}</AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user?.name}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user?.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin">Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={logout}
                  className="text-red-600 cursor-pointer"
                >
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link href="/login">Log in</Link>
              </Button>
              <Button variant="default" asChild>
                <Link href="/register">Sign up</Link>
              </Button>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMenu}
          className="md:hidden text-custom-secondary hover:text-custom-accent3 hover:bg-transparent" // Use new theme colors
          {...a11y.button({
            "aria-label": isMenuOpen ? "Close menu" : "Open menu",
            "aria-expanded": isMenuOpen,
            "aria-controls": "mobile-menu",
          })}
        >
          <FontAwesomeIcon icon="bars" className="h-5 w-5" aria-hidden="true" />
        </Button>
      </div>

      {/* Mobile Menu */}
      <div
        id="mobile-menu"
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMenuOpen}
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
});

export default Navbar;
