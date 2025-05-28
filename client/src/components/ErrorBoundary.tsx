/**
 * @file Error Boundary Component
 * @description A React component that catches JavaScript errors in its child component tree
 * @author EkkoLabs Team
 * @version 1.0.0
 */

import React, { Component, ErrorInfo, ReactNode } from "react";

/**
 * Props for the ErrorBoundary component
 * @interface ErrorBoundaryProps
 */
interface ErrorBoundaryProps {
  /** The child components to be rendered and monitored for errors */
  children: ReactNode;

  /**
   * Custom UI to show when an error occurs.
   * Can be a React node or a function that receives the error and returns a React node
   */
  fallback?: ReactNode | ((error: Error) => ReactNode);

  /**
   * Optional callback function that will be called when an error is caught
   * Useful for logging to analytics or monitoring services
   */
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

/**
 * State interface for the ErrorBoundary component
 * @interface ErrorBoundaryState
 */
interface ErrorBoundaryState {
  /** Whether an error has been caught */
  hasError: boolean;

  /** The error object that was caught, or null if no error */
  error: Error | null;
}

/**
 * Error Boundary component to catch JavaScript errors in child components,
 * log those errors, and display a fallback UI instead of crashing.
 *
 * This component:
 * - Prevents the entire app from crashing when there's an error
 * - Provides a way to display user-friendly error messages
 * - Enables error logging and monitoring
 * - Allows for custom fallback UI
 *
 * @example
 * ```tsx
 * // Basic usage
 * <ErrorBoundary>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With custom fallback UI
 * <ErrorBoundary fallback={<div>Something went wrong</div>}>
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With dynamic fallback based on the error
 * <ErrorBoundary
 *   fallback={(error) => (
 *     <div>Error: {error.message}</div>
 *   )}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 *
 * // With error logging
 * <ErrorBoundary
 *   onError={(error, errorInfo) => {
 *     logErrorToService(error, errorInfo);
 *   }}
 * >
 *   <MyComponent />
 * </ErrorBoundary>
 * ```
 */
class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log the error to an error reporting service
    console.error("Error caught by ErrorBoundary:", error, errorInfo);

    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }
  }

  render(): ReactNode {
    if (this.state.hasError) {
      if (this.props.fallback) {
        if (typeof this.props.fallback === "function" && this.state.error) {
          // If fallback is a function, call it with the error
          return (this.props.fallback as (error: Error) => ReactNode)(
            this.state.error
          );
        }
        // Only render fallback if it is a valid ReactNode (not a function)
        if (typeof this.props.fallback !== "function") {
          return this.props.fallback;
        }
      }

      // Default fallback UI
      return (
        <div className="min-h-screen bg-custom-primary flex items-center justify-center p-4">
          <div className="bg-custom-primary-lighter border border-custom-accent3 rounded-md p-6 max-w-md w-full text-center">
            <div className="text-custom-accent3 text-6xl mb-4">
              <span role="img" aria-label="Error">
                ⚠️
              </span>
            </div>
            <h2 className="text-xl font-bold text-custom-secondary mb-4">
              Something went wrong
            </h2>
            <p className="text-custom-accent2 mb-6">
              {this.state.error?.message || "An unexpected error occurred"}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-custom-accent3 text-white rounded hover:bg-opacity-90 transition-colors"
            >
              Refresh the page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
