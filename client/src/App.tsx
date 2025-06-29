import { useState, useEffect, Suspense, lazy } from "react";
import { Switch, Route } from "wouter";
import { HelmetProvider } from "react-helmet-async";

// Import our enhanced Analytics components
import { Analytics, PageViewTracker } from "./lib/analytics";

import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";
import LoadingIndicator from "@/components/LoadingIndicator";
import ErrorBoundary from "@/components/ErrorBoundary";
import { AuthProvider } from "@/contexts/AuthContext";

// Lazy load page components
const NotFound = lazy(() => import("@/pages/not-found"));
const Home = lazy(() => import("@/pages/Home"));
const ProjectsPage = lazy(() => import("@/pages/Projects"));
const AboutPage = lazy(() => import("@/pages/About"));
const BlogPage = lazy(() => import("@/pages/Blog"));
const BlogListPage = lazy(() => import("@/pages/BlogList")); // New Blog List page
const BlogPostPage = lazy(() => import("@/pages/BlogPost")); // New Blog Post detail page
const CreateArticlePage = lazy(() => import("@/pages/CreateArticle"));
const LoginPage = lazy(() => import("@/pages/Login"));
const RegisterPage = lazy(() => import("@/pages/Register"));
const AdminDashboardPage = lazy(() => import("@/pages/AdminDashboard"));

// Fallback loading component for route transitions
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center bg-custom-primary">
    <div className="w-16 h-16 border-4 border-t-custom-accent3 border-custom-primary-lighter rounded-full animate-spin"></div>
  </div>
);

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/projects" component={ProjectsPage} />
        <Route path="/about" component={AboutPage} />
        <Route path="/blog" component={BlogListPage} />
        <Route path="/blog/:slug" component={BlogPostPage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/create-article" component={CreateArticlePage} />
        <Route path="/admin" component={AdminDashboardPage} />
        <Route path="/admin/edit-article/:slug" component={CreateArticlePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading indicator after everything is loaded
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  // Error handler for logging errors to analytics or monitoring service
  const handleError = (error: Error, errorInfo: React.ErrorInfo) => {
    // In production, you could log to a service like Sentry
    console.error("Application error:", error, errorInfo);

    // Track error in analytics using our utility
    import("./lib/analytics")
      .then((analytics) => {
        analytics.analyticsUtils.trackEvent({
          name: "application_error",
          properties: {
            message: error.message,
            ...(process.env.NODE_ENV === "production"
              ? {}
              : { stack: error.stack || "" }),
          },
        });
      })
      .catch((err) => {
        console.error("Failed to load analytics for error tracking:", err);
      });
  };

  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider>
            <TooltipProvider>
              {loading && <LoadingIndicator isLoading={loading} />}
              <ErrorBoundary onError={handleError}>
                <PageViewTracker debug={process.env.NODE_ENV !== "production"}>
                  <Router />
                </PageViewTracker>
              </ErrorBoundary>
              <Toaster />
              <Analytics debug={process.env.NODE_ENV !== "production"} />
            </TooltipProvider>
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}

export default App;
