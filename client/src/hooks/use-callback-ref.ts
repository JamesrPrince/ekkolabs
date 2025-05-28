/**
 * @file Callback Ref Hook
 * @description A custom React hook for stable callback references
 * @author EkkoLabs Team
 * @version 1.0.0
 */

import { useRef, useCallback, useEffect, DependencyList } from 'react';

/**
 * Returns a stable callback that has access to the latest state/props
 * without causing a component to re-render when the callback changes.
 * 
 * This is useful for:
 * - Event handlers that need access to the latest state
 * - Callbacks passed to child components where you want to avoid re-renders
 * - Callbacks used in useEffect dependencies
 * 
 * @template T - The function type
 * @param {T} callback - The callback function to stabilize
 * @returns {T} A stable callback that won't change between renders
 * 
 * @example
 * ```tsx
 * // Basic usage with state
 * const [count, setCount] = useState(0);
 * const handleClick = useStableCallback(() => {
 *   console.log(`Current count: ${count}`);
 *   setCount(count + 1);
 * });
 * 
 * // The handleClick function reference will be stable across renders
 * // but will always have access to the latest count value
 * ```
 */
export function useStableCallback<T extends (...args: any[]) => any>(callback: T): T {
  const callbackRef = useRef<T>(callback);
  
  // Update the ref with the latest callback
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  
  // Return a stable function that calls the current callback
  return useCallback(
    ((...args: any[]) => callbackRef.current(...args)) as T,
    []
  );
}

/**
 * A hook similar to useCallback but that also tracks the previous callback arguments
 * and return value for potential memoization/caching.
 * 
 * This is useful for expensive calculations where you want to:
 * - Keep a stable callback reference
 * - Cache previous results for performance
 * 
 * @template T - The function type
 * @param {T} callback - The callback function
 * @param {DependencyList} dependencies - Dependencies for refreshing the cache
 * @param {number} [cacheSize=1] - Number of previous results to cache
 * @returns {T} A stable callback with result caching
 * 
 * @example
 * ```tsx
 * // Cache the results of an expensive calculation
 * const calculateTotal = useMemoizedCallback(
 *   (items) => {
 *     console.log('Calculating total...');
 *     return items.reduce((sum, item) => sum + item.price, 0);
 *   },
 *   [/* dependencies */],
 *   10 // Cache size
 * );
 * ```
 */
export function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  dependencies: DependencyList,
  cacheSize: number = 1
): T {
  type CacheKey = string;
  type CacheEntry = { args: any[]; result: ReturnType<T> };
  
  // Cache of previous results
  const cache = useRef<Map<CacheKey, CacheEntry>>(new Map());
  
  // Current callback with dependencies
  const memoizedCallback = useCallback(callback, dependencies);
  
  // Create a wrapper function that checks the cache before calling the callback
  const wrappedCallback = useCallback(
    ((...args: any[]) => {
      // Generate a cache key from the arguments
      const cacheKey = JSON.stringify(args);
      
      // Check if we have a cached result
      if (cache.current.has(cacheKey)) {
        return cache.current.get(cacheKey)!.result;
      }
      
      // Call the actual callback
      const result = memoizedCallback(...args);
      
      // Cache the result
      cache.current.set(cacheKey, { args, result });
      
      // Limit cache size
      if (cache.current.size > cacheSize) {
        const firstKey = cache.current.keys().next().value;
        cache.current.delete(firstKey);
      }
      
      return result;
    }) as T,
    [memoizedCallback, cacheSize]
  );
  
  // Clear the cache when dependencies change
  useEffect(() => {
    cache.current.clear();
  }, dependencies);
  
  return wrappedCallback;
}

/**
 * A hook that returns a ref and a callback for setting that ref.
 * Useful for imperative interaction with child components/elements.
 * 
 * @template T - The ref value type
 * @param {(value: T) => void} [onSet] - Optional callback to run when the ref is set
 * @returns {[T | null, (node: T) => void]} A tuple with the ref value and a setter function
 * 
 * @example
 * ```tsx
 * // Basic usage
 * const [inputElement, setInputRef] = useCallbackRef<HTMLInputElement>();
 * 
 * // Focus the input element when it becomes available
 * useEffect(() => {
 *   if (inputElement) {
 *     inputElement.focus();
 *   }
 * }, [inputElement]);
 * 
 * return <input ref={setInputRef} />;
 * ```
 */
export function useCallbackRef<T>(onSet?: (value: T) => void): [T | null, (node: T) => void] {
  const ref = useRef<T | null>(null);
  const setRef = useCallback((node: T) => {
    ref.current = node;
    if (onSet) onSet(node);
  }, [onSet]);
  
  return [ref.current, setRef];
}
