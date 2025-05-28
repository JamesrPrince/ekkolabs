/**
 * @file Memoization Utilities
 * @description Utilities for optimizing component rendering through memoization
 * @author EkkoLabs Team
 * @version 1.0.0
 */

import React from "react";

/**
 * A higher-order component that memoizes a component with custom props comparison
 *
 * @template P - Component props type
 * @param {React.ComponentType<P>} Component - The component to memoize
 * @param {(prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean} [areEqual] - Custom comparison function
 * @returns {React.MemoExoticComponent<React.ComponentType<P>>} Memoized component
 */
export function memoWithCustomCompare<P extends object>(
  Component: React.ComponentType<P>,
  areEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): React.MemoExoticComponent<React.ComponentType<P>> {
  return React.memo(Component, areEqual);
}

/**
 * Creates a deep equality comparison function for component props
 *
 * @param {string[]} [ignoredProps] - Props to ignore in the comparison
 * @returns {(prevProps: Readonly<any>, nextProps: Readonly<any>) => boolean} Comparison function
 */
export function createDeepPropsCompare(
  ignoredProps: string[] = []
): (prevProps: Readonly<any>, nextProps: Readonly<any>) => boolean {
  return (prevProps, nextProps) => {
    // Get all keys from both objects
    const allKeys = Array.from(
      new Set([...Object.keys(prevProps), ...Object.keys(nextProps)])
    );

    for (const key of allKeys) {
      // Skip ignored props
      if (ignoredProps.includes(key)) {
        continue;
      }

      // Deep compare the props
      if (!deepEqual(prevProps[key], nextProps[key])) {
        return false;
      }
    }

    return true;
  };
}

/**
 * Deep equality comparison of two values
 *
 * @param {any} a - First value
 * @param {any} b - Second value
 * @returns {boolean} Whether the values are deeply equal
 */
function deepEqual(a: any, b: any): boolean {
  // Same reference or primitive equality
  if (a === b) return true;

  // One is null/undefined but not the other
  if (a == null || b == null) return a === b;

  // Different types
  if (typeof a !== typeof b) return false;

  // Handle dates
  if (a instanceof Date && b instanceof Date) {
    return a.getTime() === b.getTime();
  }

  // Handle arrays
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (!deepEqual(a[i], b[i])) return false;
    }
    return true;
  }

  // Handle objects
  if (typeof a === "object" && typeof b === "object") {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);

    if (keysA.length !== keysB.length) return false;

    for (const key of keysA) {
      if (!Object.prototype.hasOwnProperty.call(b, key)) return false;
      if (!deepEqual(a[key], b[key])) return false;
    }

    return true;
  }

  return false;
}

/**
 * A higher-order component that enhances a component with display name for better debugging
 *
 * @template P - Component props type
 * @param {React.ComponentType<P>} Component - The component to enhance
 * @param {string} name - The display name to set
 * @returns {React.ComponentType<P>} Enhanced component
 */
export function withDisplayName<P>(
  Component: React.ComponentType<P>,
  name: string
): React.ComponentType<P> {
  Component.displayName = name;
  return Component;
}

/**
 * A higher-order component that memoizes a component and adds a display name
 *
 * @template P - Component props type
 * @param {React.ComponentType<P>} Component - The component to memoize
 * @param {string} name - The display name to set
 * @param {(prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean} [areEqual] - Custom comparison function
 * @returns {React.MemoExoticComponent<React.ComponentType<P>>} Memoized component with display name
 *
 * @example
 * ```tsx
 * const MemoizedCard = memoWithName(Card, 'Card');
 *
 * // With custom comparison
 * const MemoizedList = memoWithName(
 *   List,
 *   'List',
 *   (prev, next) => prev.items.length === next.items.length
 * );
 * ```
 */
export function memoWithName<P extends object>(
  Component: React.ComponentType<P>,
  name: string,
  areEqual?: (prevProps: Readonly<P>, nextProps: Readonly<P>) => boolean
): React.MemoExoticComponent<React.ComponentType<P>> {
  const MemoizedComponent = React.memo(Component, areEqual);
  MemoizedComponent.displayName = `Memo(${name})`;
  return MemoizedComponent;
}
