/**
 * @file Error Boundary Component Tests
 * @description Unit tests for the ErrorBoundary component
 */

import { render, screen } from "@testing-library/react";
import React from "react";
import { describe, test, expect, beforeAll, afterAll, vi } from "vitest";

import ErrorBoundary from "../components/ErrorBoundary";

// Component that throws an error
const ErrorThrowingComponent = ({ shouldThrow = false }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

// Mock console.error to avoid test output pollution
const originalConsoleError = console.error;
beforeAll(() => {
  console.error = vi.fn();
});

afterAll(() => {
  console.error = originalConsoleError;
});

describe("ErrorBoundary Component", () => {
  test("renders children when no error is thrown", () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Test Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId("child")).toBeInTheDocument();
  });

  test("renders default fallback UI when an error is thrown", () => {
    // Suppress React's error boundary warning in test
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
    expect(screen.getByText("Test error")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /refresh/i })
    ).toBeInTheDocument();

    spy.mockRestore();
  });

  test("renders custom fallback component when provided", () => {
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => {});

    render(
      <ErrorBoundary
        fallback={<div data-testid="custom-fallback">Custom Fallback</div>}
      >
        <ErrorThrowingComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("custom-fallback")).toBeInTheDocument();

    spy.mockRestore();
  });

  test("calls onError callback when an error is thrown", () => {
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => {});

    const mockOnError = vi.fn();

    render(
      <ErrorBoundary onError={mockOnError}>
        <ErrorThrowingComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(mockOnError).toHaveBeenCalledTimes(1);
    expect(mockOnError).toHaveBeenCalledWith(
      expect.objectContaining({ message: "Test error" }),
      expect.anything()
    );

    spy.mockRestore();
  });

  test("renders function fallback with the error", () => {
    const spy = vi.spyOn(console, "error");
    spy.mockImplementation(() => {});

    const ErrorFallback = ({ error }: { error: Error }) => (
      <div data-testid="function-fallback">Error: {error.message}</div>
    );

    render(
      <ErrorBoundary fallback={(error) => <ErrorFallback error={error} />}>
        <ErrorThrowingComponent shouldThrow />
      </ErrorBoundary>
    );

    expect(screen.getByTestId("function-fallback")).toBeInTheDocument();
    expect(screen.getByText("Error: Test error")).toBeInTheDocument();

    spy.mockRestore();
  });
});
