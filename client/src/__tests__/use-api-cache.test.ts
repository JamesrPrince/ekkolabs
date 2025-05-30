/**
 * @file API Request Hook Tests
 * @description Unit tests for the useApiRequest hook
 */

import { renderHook } from "@testing-library/react";
import { act, waitFor } from "@testing-library/react";
import { describe, test, expect, beforeEach, vi } from "vitest";
import { useApiRequest } from "../hooks/use-api-cache";
import { apiRequest } from "../lib/queryClient";

// Mock the apiRequest function
vi.mock("../lib/queryClient", () => ({
  apiRequest: vi.fn(),
}));

describe("useApiRequest Hook", () => {
  const mockResponse = {
    json: vi.fn().mockResolvedValue({ data: "test data" }),
  };

  beforeEach(() => {
    // Reset mocks between tests
    vi.clearAllMocks();
    // Reset cache between tests by clearing module cache
    vi.resetModules();

    // Mock implementation - make sure it matches the actual signature
    (apiRequest as any).mockImplementation(() => {
      return Promise.resolve(mockResponse);
    });
  });

  test("should fetch data on initial render", async () => {
    const { result } = renderHook(() => useApiRequest("/api/test"));

    // Initial state check
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for async operations to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Verify API was called
    expect(apiRequest).toHaveBeenCalledTimes(1);
    expect(apiRequest).toHaveBeenCalledWith("GET", "/api/test", null);

    // Verify data was set correctly
    expect(result.current.data).toEqual({ data: "test data" });
    expect(result.current.error).toBeNull();
  });

  test("should handle fetch errors", async () => {
    // Setup the mock to reject
    const testError = new Error("Test error");
    vi.clearAllMocks();
    (apiRequest as any).mockRejectedValueOnce(testError);

    const { result } = renderHook(() => useApiRequest("/api/test-error"));

    // Wait for async operations to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Verify error handling
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(testError);
  });

  // TODO: Fix this test in a future update
  test.skip("should refetch data when refetch is called", async () => {
    // Setup completely fresh test with sequence of responses
    vi.clearAllMocks();

    // Create separate response objects for initial and updated data
    const initialResponse = {
      json: vi.fn().mockResolvedValue({ data: "test data" }),
    };
    const updatedResponse = {
      json: vi.fn().mockResolvedValue({ data: "updated data" }),
    };

    // Configure mock to return different responses in sequence
    (apiRequest as any)
      .mockResolvedValueOnce(initialResponse)
      .mockResolvedValueOnce(updatedResponse);

    // Render hook with unique URL to avoid cache interference
    const { result } = renderHook(() => useApiRequest("/api/test-sequence"));

    // Wait for initial data to load
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Clear any pending promises
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Manually trigger refetch
    await act(async () => {
      await result.current.refetch();
    });

    // Verify data was updated (should be from second response)
    expect(apiRequest).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual({ data: "updated data" });
  });

  // TODO: Fix this test in a future update
  test.skip("should use cached data when available and cache is enabled", async () => {
    // Clear existing state and setup fresh mocks
    vi.clearAllMocks();

    // Mock implementation for this test
    const cacheResponse = {
      json: vi.fn().mockResolvedValue({ data: "cached data" }),
    };
    (apiRequest as any).mockImplementation(() =>
      Promise.resolve(cacheResponse)
    );

    // Unique URL for this test
    const url = "/api/test-cache-special";

    // First render - will fetch and cache data
    const { result, rerender } = renderHook(() =>
      useApiRequest(url, { cacheDuration: 5000 })
    );

    // Wait for initial fetch to complete
    await waitFor(() => expect(result.current.isLoading).toBe(false));

    // Ensure data was fetched and matches our mock
    expect(result.current.data).toEqual({ data: "cached data" });

    // Clear mocks to verify no more API calls happen
    vi.clearAllMocks();

    // Set up new mock that should NOT be used
    const updatedResponse = {
      json: vi.fn().mockResolvedValue({ data: "should not be used" }),
    };
    (apiRequest as any).mockImplementation(() =>
      Promise.resolve(updatedResponse)
    );

    // Force a rerender - should use cached data
    rerender();

    // Cached data should still be used, no new API calls
    expect(result.current.data).toEqual({ data: "cached data" });
    expect(apiRequest).not.toHaveBeenCalled();
  });

  test("should bypass cache when enabled=false", async () => {
    // First render with cache disabled
    const { result } = renderHook(() =>
      useApiRequest("/api/test-nocache", { enabled: false })
    );

    // Wait for initial fetch
    await waitFor(() => expect(result.current.isLoading).toBe(false));
    expect(apiRequest).toHaveBeenCalledTimes(1);

    // Set up mock for second fetch
    mockResponse.json.mockResolvedValueOnce({ data: "new data" });

    // Trigger refetch
    await act(async () => {
      await result.current.refetch();
    });

    // Verify second API call was made
    expect(apiRequest).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual({ data: "new data" });
  });
});
