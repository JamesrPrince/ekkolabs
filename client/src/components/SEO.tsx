/**
 * @file SEO Component
 * @description A component for managing and injecting SEO metadata into the document head
 * @author EkkoLabs Team
 * @version 1.0.0
 */

import React from "react";

/**
 * Props for the SEO component
 * @interface SEOProps
 */
interface SEOProps {
  /** Page title (will be set as document.title) */
  title: string;
  
  /** Page description */
  description: string;
  
  /** Canonical URL for the page */
  canonical?: string;
  
  /** Open Graph metadata for social sharing */
  openGraph?: {
    /** The type of your content (e.g., "website", "article") */
    type?: string;
    
    /** The title to display when shared on social media */
    title?: string;
    
    /** The description to display when shared on social media */
    description?: string;
    
    /** The URL of the image to display when shared on social media */
    image?: string;
    
    /** The URL of the page being shared */
    url?: string;
  };
  
  /** Twitter Card metadata for Twitter sharing */
  twitter?: {
    /** The type of Twitter card to use */
    card?: "summary" | "summary_large_image" | "app" | "player";
    
    /** @twitter handle for the site */
    site?: string;
    
    /** The title to display when shared on Twitter */
    title?: string;
    
    /** The description to display when shared on Twitter */
    description?: string;
    
    /** The URL of the image to display when shared on Twitter */
    image?: string;
  };
  
  /** Additional meta tags to include */
  additionalMetaTags?: Array<{
    /** The name attribute of the meta tag */
    name?: string;
    
    /** The property attribute of the meta tag (for Open Graph) */
    property?: string;
    
    /** The content attribute of the meta tag */
    content: string;
  }>;
  
  /** Whether to tell search engines not to index this page */
  noindex?: boolean;
  
  /** Whether to tell search engines not to follow links on this page */
  nofollow?: boolean;
}

/**
 * SEO component for managing page metadata
 * 
 * This component:
 * - Sets the document title
 * - Injects meta tags for search engines and social media sharing
 * - Handles canonical URLs
 * - Configures robots directives (noindex, nofollow)
 * - Supports Open Graph and Twitter Card metadata
 * - Allows for custom additional meta tags
 * 
 * @example
 * ```tsx
 * // Basic usage
 * <SEO
 *   title="My Page"
 *   description="This is my awesome page"
 * />
 * 
 * // Full usage example
 * <SEO
 *   title="My Page"
 *   description="This is my awesome page"
 *   canonical="https://example.com/my-page"
 *   openGraph={{
 *     type: "article",
 *     title: "Awesome Article",
 *     image: "https://example.com/image.jpg"
 *   }}
 *   twitter={{
 *     card: "summary_large_image",
 *     site: "@myhandle"
 *   }}
 *   additionalMetaTags={[
 *     { name: "keywords", content: "web, development" }
 *   ]}
 * />
 * ```
 */
export default function SEO({
  title,
  description,
  canonical,
  openGraph,
  twitter,
  additionalMetaTags = [],
  noindex = false,
  nofollow = false,
}: SEOProps) {
  const currentUrl = typeof window !== "undefined" ? window.location.href : "";
  const ogTitle = openGraph?.title || title;
  const ogDescription = openGraph?.description || description;

  // Set the document title
  React.useEffect(() => {
    document.title = title;
  }, [title]);

  // Create and inject meta tags
  React.useEffect(() => {
    // Helper function to create or update a meta tag
    const setMeta = (name: string, content: string, property?: string) => {
      let element = document.querySelector(
        property
          ? `meta[property="${property}"]`
          : `meta[name="${name}"]`
      ) as HTMLMetaElement;

      if (!element) {
        element = document.createElement("meta");
        if (property) {
          element.setAttribute("property", property);
        } else {
          element.setAttribute("name", name);
        }
        document.head.appendChild(element);
      }

      element.setAttribute("content", content);
    };

    // Basic meta tags
    setMeta("description", description);
    
    // Robots meta tags
    const robots = [
      ...(noindex ? ["noindex"] : ["index"]),
      ...(nofollow ? ["nofollow"] : ["follow"]),
    ].join(", ");
    setMeta("robots", robots);

    // Open Graph meta tags
    if (openGraph) {
      setMeta("og:type", openGraph.type || "website", "og:type");
      setMeta("og:title", ogTitle, "og:title");
      setMeta("og:description", ogDescription, "og:description");
      if (openGraph.image) {
        setMeta("og:image", openGraph.image, "og:image");
      }
      setMeta("og:url", openGraph.url || canonical || currentUrl, "og:url");
    }

    // Twitter meta tags
    if (twitter) {
      setMeta("twitter:card", twitter.card || "summary", "twitter:card");
      if (twitter.site) {
        setMeta("twitter:site", twitter.site, "twitter:site");
      }
      setMeta("twitter:title", twitter.title || ogTitle, "twitter:title");
      setMeta(
        "twitter:description",
        twitter.description || ogDescription,
        "twitter:description"
      );
      if (twitter.image) {
        setMeta("twitter:image", twitter.image, "twitter:image");
      }
    }

    // Canonical link
    if (canonical) {
      let canonicalLink = document.querySelector('link[rel="canonical"]');
      
      if (!canonicalLink) {
        canonicalLink = document.createElement("link");
        canonicalLink.setAttribute("rel", "canonical");
        document.head.appendChild(canonicalLink);
      }
      
      canonicalLink.setAttribute("href", canonical);
    }

    // Additional meta tags
    additionalMetaTags.forEach((tag) => {
      if (tag.name) {
        setMeta(tag.name, tag.content);
      } else if (tag.property) {
        setMeta("", tag.content, tag.property);
      }
    });
  }, [
    title,
    description,
    canonical,
    openGraph,
    twitter,
    additionalMetaTags,
    noindex,
    nofollow,
    currentUrl,
    ogTitle,
    ogDescription,
  ]);

  return null;
}
