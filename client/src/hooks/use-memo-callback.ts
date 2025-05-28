import { useMemo, useCallback, useState, useRef, useEffect, DependencyList } from 'react';

/**
 * Enhanced useMemo that logs re-computations in development mode
 * @param factory - The factory function to memoize
 * @param deps - The dependency array
 * @param debugName - Optional name for debugging
 * @returns The memoized value
 */
export function useTrackedMemo<T>(
  factory: () => T, 
  deps: DependencyList,
  debugName?: string
): T {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV !== 'production' && debugName && renderCount.current > 1) {
      console.log(`[useTrackedMemo] "${debugName}" recalculated (${renderCount.current})`);
    }
  }, deps);
  
  return useMemo(factory, deps);
}

/**
 * Enhanced useCallback that logs re-creations in development mode
 * @param callback - The callback function to memoize
 * @param deps - The dependency array
 * @param debugName - Optional name for debugging
 * @returns The memoized callback
 */
export function useTrackedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: DependencyList,
  debugName?: string
): T {
  const renderCount = useRef(0);
  
  useEffect(() => {
    renderCount.current += 1;
    
    if (process.env.NODE_ENV !== 'production' && debugName && renderCount.current > 1) {
      console.log(`[useTrackedCallback] "${debugName}" recreated (${renderCount.current})`);
    }
  }, deps);
  
  return useCallback(callback, deps);
}

/**
 * Custom hook to debounce a value
 * @param value - The value to debounce
 * @param delay - The debounce delay in milliseconds
 * @returns The debounced value
 */
export function useDebounce<T>(value: T, delay = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

/**
 * Custom hook to throttle a value
 * @param value - The value to throttle
 * @param limit - The throttle limit in milliseconds
 * @returns The throttled value
 */
export function useThrottle<T>(value: T, limit = 200): T {
  const [throttledValue, setThrottledValue] = useState<T>(value);
  const lastRan = useRef(Date.now());
  
  useEffect(() => {
    const handler = setTimeout(() => {
      if (Date.now() - lastRan.current >= limit) {
        setThrottledValue(value);
        lastRan.current = Date.now();
      }
    }, limit - (Date.now() - lastRan.current));
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, limit]);
  
  return throttledValue;
}

/**
 * Custom hook to prevent rerenders if deep equal objects
 * @param value - The value to track
 * @returns A stable reference that only changes when deep comparison detects changes
 */
export function useDeepCompareMemo<T>(value: T): T {
  const ref = useRef<T>(value);
  
  // Only update if deep comparison shows a change
  const stableValue = useMemo(() => {
    // Simple deep comparison for common objects
    // For production use, consider using a library like fast-deep-equal
    function deepEqual(obj1: any, obj2: any): boolean {
      if (obj1 === obj2) return true;
      
      if (
        typeof obj1 !== 'object' || 
        typeof obj2 !== 'object' || 
        obj1 === null || 
        obj2 === null
      ) {
        return obj1 === obj2;
      }
      
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);
      
      if (keys1.length !== keys2.length) return false;
      
      for (const key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
      }
      
      return true;
    }
    
    if (!deepEqual(value, ref.current)) {
      ref.current = value;
    }
    
    return ref.current;
  }, [value]);
  
  return stableValue;
}
