/**
 * @file Focus Trap Hook
 * @description A custom React hook for trapping keyboard focus within a container
 * @author EkkoLabs Team
 * @version 1.0.0
 */

import { useEffect, useRef } from "react";

/**
 * Configuration options for the useFocusTrap hook
 * @interface FocusTrapOptions
 */
type FocusTrapOptions = {
  /**
   * Whether the focus trap is currently active
   */
  active: boolean;
  
  /**
   * Whether to automatically focus the first focusable element when activated
   * @default true
   */
  autoFocus?: boolean;
};

/**
 * A hook that traps keyboard focus within a container for improved accessibility
 * 
 * This is particularly useful for:
 * - Modal dialogs
 * - Dropdown menus
 * - Any UI element that should constrain focus for keyboard users
 * 
 * The hook handles:
 * - Keeping focus within the container when using Tab navigation
 * - Automatic focus of the first element when activated (optional)
 * - Restoring focus to the previous element when deactivated
 * 
 * @template T - The HTML element type of the container (defaults to HTMLElement)
 * @param {FocusTrapOptions} options - Configuration options
 * @returns {React.RefObject<T>} A ref to apply to the container element
 * 
 * @example
 * ```tsx
 * function Modal({ isOpen, onClose }) {
 *   const modalRef = useFocusTrap({ active: isOpen });
 *   
 *   return (
 *     <div ref={modalRef} className="modal">
 *       <button>Focus me first</button>
 *       <button>Another button</button>
 *       <button onClick={onClose}>Close</button>
 *     </div>
 *   );
 * }
 * ```
 */
export function useFocusTrap<T extends HTMLElement = HTMLElement>(
  options: FocusTrapOptions
) {
  const { active, autoFocus = true } = options;
  const rootRef = useRef<T>(null);

  useEffect(() => {
    if (!active || !rootRef.current) {
      return;
    }

    // Save the element that had focus before we trap it
    const previousActiveElement = document.activeElement as HTMLElement | null;

    // Collect all focusable elements within the container
    const focusableElements = rootRef.current.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    // Auto focus the first focusable element if enabled
    if (autoFocus && firstElement) {
      firstElement.focus();
    }

    // Handle tab key navigation
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") {
        return;
      }

      // If shift + tab and we're on the first element, move to the last
      if (event.shiftKey && document.activeElement === firstElement) {
        lastElement.focus();
        event.preventDefault();
      }
      // If tab and we're on the last element, move to the first
      else if (!event.shiftKey && document.activeElement === lastElement) {
        firstElement.focus();
        event.preventDefault();
      }
    };

    // Set up the event listener
    rootRef.current.addEventListener("keydown", handleKeyDown);

    return () => {
      // Clean up the event listener
      rootRef.current?.removeEventListener("keydown", handleKeyDown);
      
      // Restore focus to where it was before
      if (previousActiveElement) {
        previousActiveElement.focus();
      }
    };
  }, [active, autoFocus]);

  return rootRef;
}
