/**
 * @file API Cache Hook Tests
 * @description Unit tests for the useApiCache hook
 */

import { renderHook, act } from '@testing-library/react-hooks';
import { useApiRequest } from '../hooks/use-api-cache';
import { apiRequest } from '../lib/queryClient';

// Mock the apiRequest function
jest.mock('../lib/queryClient', () => ({
  apiRequest: jest.fn(),
}));

describe('useApiCache Hook', () => {
  const mockResponse = {
    json: jest.fn().mockResolvedValue({ data: 'test data' }),
  };

  beforeEach(() => {
    // Reset mocks between tests
    jest.clearAllMocks();
    (apiRequest as jest.Mock).mockResolvedValue(mockResponse);
  });

  test('should fetch data on initial render', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest('/api/test')
    );

    // Initial state
    expect(result.current.isLoading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();

    // Wait for the request to complete
    await waitForNextUpdate();

    // After fetch completes
    expect(apiRequest).toHaveBeenCalledWith('GET', '/api/test', null, {});
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ data: 'test data' });
    expect(result.current.error).toBeNull();
  });

  test('should handle fetch errors', async () => {
    const testError = new Error('Test error');
    (apiRequest as jest.Mock).mockRejectedValueOnce(testError);

    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest('/api/test')
    );

    // Initial state
    expect(result.current.isLoading).toBe(true);

    // Wait for the request to complete
    await waitForNextUpdate();

    // After fetch fails
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toEqual(testError);
  });

  test('should refetch data when refetch is called', async () => {
    const { result, waitForNextUpdate } = renderHook(() =>
      useApiRequest('/api/test')
    );

    // Wait for the initial fetch to complete
    await waitForNextUpdate();
    expect(apiRequest).toHaveBeenCalledTimes(1);

    // Update mock to return different data
    mockResponse.json.mockResolvedValueOnce({ data: 'updated data' });

    // Call refetch
    act(() => {
      result.current.refetch();
    });

    // Should show loading again
    expect(result.current.isLoading).toBe(true);

    // Wait for the refetch to complete
    await waitForNextUpdate();

    // After refetch completes
    expect(apiRequest).toHaveBeenCalledTimes(2);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toEqual({ data: 'updated data' });
  });

  test('should use cached data when available and cache is enabled', async () => {
    // First render
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useApiRequest('/api/test', { cacheDuration: 5000 })
    );

    // Wait for the initial fetch to complete
    await waitForNextUpdate();
    expect(apiRequest).toHaveBeenCalledTimes(1);

    // Force a re-render (simulating a component update)
    rerender();

    // Should not make another API call
    expect(apiRequest).toHaveBeenCalledTimes(1);
    expect(result.current.data).toEqual({ data: 'test data' });
  });

  test('should bypass cache when enabled=false', async () => {
    // Render with cache disabled
    const { result, waitForNextUpdate, rerender } = renderHook(() =>
      useApiRequest('/api/test', { enabled: false })
    );

    // Wait for the initial fetch to complete
    await waitForNextUpdate();
    expect(apiRequest).toHaveBeenCalledTimes(1);

    // Mock for second response
    mockResponse.json.mockResolvedValueOnce({ data: 'new data' });

    // Force a re-render with cache still disabled
    rerender();
    
    // Should make another API call since cache is disabled
    await waitForNextUpdate();
    expect(apiRequest).toHaveBeenCalledTimes(2);
    expect(result.current.data).toEqual({ data: 'new data' });
  });
});
