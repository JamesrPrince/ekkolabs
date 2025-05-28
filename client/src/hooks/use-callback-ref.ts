/**
 * @file Callback Ref Hook
 * @description A custom React hook for stable callback references
 * @author EkkoLabs Team
 * @version 1.0.0
 */

import { useRef, useCallback, useEffect, DependencyList } from "react";

/**
 * Returns a stable callback that has access to the latest state/props
 * without causing a component to re-render when the callback changes.
 *
 * This is useful for:
 * - Event handlers that need access to the latest state
 * - Callbacks passed to child components where you want to avoid re-renders
 * - Callbacks used in useEffect dependencies
 *
 * Example usage:
 *   // Basic usage with state
 *   const [count, setCount] = useState(0);
 *   const handleClick = useStableCallback(() => {
 *     console.log(`Current count: ${count}`);
 *     setCount(count + 1);
 *   });
 *   // The handleClick function reference will be stable across renders
 *   // but will always have access to the latest count value
 */
export function useStableCallback<T extends (...args: unknown[]) => unknown>(
  callback: T
): T {
  const callbackRef = useRef<T>(callback);
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);
  // Inline function to avoid dependency warning
  return useCallback(
    (...args: unknown[]) => callbackRef.current(...(args as Parameters<T>)),
    []
  ) as T;
}

/**
 * A hook similar to useCallback but that also tracks the previous callback arguments
 * and return value for potential memoization/caching.
 *
 * This is useful for expensive calculations where you want to:
 * - Keep a stable callback reference
 * - Cache previous results for performance
 *
 * Example usage:
 *   Cache the results of an expensive calculation:
 *     const calculateTotal = useMemoizedCallback(
 *       (items) => items.reduce((sum, item) => sum + item.price, 0),
 *       [cart],
 *       10 // Cache size
 *     );
 */
export function useMemoizedCallback<T extends (...args: unknown[]) => unknown>(
  callback: T,
  dependencies: DependencyList,
  cacheSize: number = 1
): T {
  type CacheKey = string;
  type CacheEntry = { args: unknown[]; result: unknown };
  const cache = useRef<Map<CacheKey, CacheEntry>>(new Map());
  // Inline function for useCallback
  const memoizedCallback = useCallback(
    (...args: unknown[]) => callback(...(args as Parameters<T>)),
    [callback, ...dependencies]
  );
  const wrappedCallback = useCallback(
    (...args: unknown[]) => {
      const cacheKey = JSON.stringify(args);
      if (cache.current.has(cacheKey)) {
        return cache.current.get(cacheKey)!.result as ReturnType<T>;
      }
      const result = memoizedCallback(...args) as ReturnType<T>;
      cache.current.set(cacheKey, { args, result });
      if (cache.current.size > cacheSize) {
        const firstKey = cache.current.keys().next().value;
        if (typeof firstKey === "string") {
          cache.current.delete(firstKey);
        }
      }
      return result;
    },
    [memoizedCallback, cacheSize]
  );
  useEffect(() => {
    cache.current.clear();
  }, [dependencies]);
  return wrappedCallback as T;
}

/**
 * A hook that returns a ref and a callback for setting that ref.
 * Useful for imperative interaction with child components/elements.
 *
 * Example usage:
 *   // Basic usage
 *   const [inputElement, setInputRef] = useCallbackRef<HTMLInputElement>();
 *   // Focus the input element when it becomes available
 *   useEffect(() => {
 *     if (inputElement) {
 *       inputElement.focus();
 *     }
 *   }, [inputElement]);
 *   return <input ref={setInputRef} />;
 */
export function useCallbackRef<T>(
  onSet?: (value: T) => void
): [T | null, (node: T) => void] {
  const ref = useRef<T | null>(null);
  const setRef = useCallback(
    (node: T) => {
      ref.current = node;
      if (onSet) onSet(node);
    },
    [onSet]
  );

  return [ref.current, setRef];
}
