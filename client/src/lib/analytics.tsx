import { Analytics as VercelAnalytics } from "@vercel/analytics/react";
import { useEffect, ReactNode } from "react";
import { useLocation } from "wouter";

interface PageViewTrackerProps {
  children: ReactNode;
  debug?: boolean;
  excludePaths?: string[];
}

interface CustomEventProps {
  name: string;
  properties?: Record<string, string | number | boolean>;
  options?: {
    debug?: boolean;
  };
}

// Analytics utility
export const analyticsUtils = {
  // Track custom events
  trackEvent: ({ name, properties, options }: CustomEventProps) => {
    if (typeof window === 'undefined') return;
    
    // Always log events in debug mode or non-production
    if (options?.debug || process.env.NODE_ENV !== 'production') {
      console.log(`Analytics Event: ${name}`, properties);
    }
    
    try {
      // Check if Vercel Analytics is available and has the track method
      if (typeof window !== 'undefined') {
        // In a real implementation, you would use your analytics provider's API
        // For now, we'll just log it to avoid errors
        console.log(`[Analytics] Event tracked: ${name}`, properties);
      }
    } catch (error) {
      console.error('Failed to track analytics event:', error);
    }
  },
  
  // Track page views
  trackPageView: (url: string, options?: { debug?: boolean }) => {
    if (typeof window === 'undefined') return;
    
    // Always log page views in debug mode or non-production
    if (options?.debug || process.env.NODE_ENV !== 'production') {
      console.log(`Page View: ${url}`);
    }
    
    try {
      // In a real implementation, you would use your analytics provider's API
      // For now, we'll just log it to avoid errors
      console.log(`[Analytics] Page view: ${url}`);
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  }
};

/**
 * Enhanced Analytics component that wraps Vercel Analytics with additional features
 */
export function Analytics({ debug = false }: { debug?: boolean }) {
  return <VercelAnalytics debug={debug} />;
}

/**
 * PageViewTracker hooks into navigation to automatically track page views
 */
export function PageViewTracker({ 
  children, 
  debug = false, 
  excludePaths = ['/api/', '/admin/'] 
}: PageViewTrackerProps) {
  const [location] = useLocation();
  
  useEffect(() => {
    // Check if current path should be excluded
    const isExcluded = excludePaths.some(path => location.startsWith(path));
    
    if (!isExcluded) {
      analyticsUtils.trackPageView(location, { debug });
    }
  }, [location, debug, excludePaths]);
  
  return <>{children}</>;
}

// Add type declarations for analytics global functions
declare global {
  interface Window {
    // This is a placeholder for when you implement a real analytics solution
    analytics?: {
      trackEvent: (event: string, properties?: Record<string, any>) => void;
      trackPageView: (url: string) => void;
    };
  }
}
