import { AriaAttributes } from "react";

// Types for ARIA attributes commonly used in UI components
export interface AriaProps extends Partial<AriaAttributes> {
  /**
   * Defines a string value that labels the current element
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-label
   */
  'aria-label'?: string;
  
  /**
   * Identifies the element (or elements) that labels the current element
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-labelledby
   */
  'aria-labelledby'?: string;
  
  /**
   * Identifies the element (or elements) that describes the object
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-describedby
   */
  'aria-describedby'?: string;
  
  /**
   * Indicates whether the element is expanded
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-expanded
   */
  'aria-expanded'?: boolean;
  
  /**
   * Indicates the availability and type of interactive popup element
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-haspopup
   */
  'aria-haspopup'?: boolean | 'menu' | 'listbox' | 'tree' | 'grid' | 'dialog';
  
  /**
   * Indicates the current "selected" state of elements
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-selected
   */
  'aria-selected'?: boolean;
  
  /**
   * Indicates whether the element is currently hidden
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-hidden
   */
  'aria-hidden'?: boolean;
  
  /**
   * Indicates whether the element is checked
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-checked
   */
  'aria-checked'?: boolean | 'mixed';
  
  /**
   * Indicates the element's current value
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuenow
   */
  'aria-valuenow'?: number;
  
  /**
   * Defines the minimum allowed value
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemin
   */
  'aria-valuemin'?: number;
  
  /**
   * Defines the maximum allowed value
   * @see https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Attributes/aria-valuemax
   */
  'aria-valuemax'?: number;
}

// Common roles for UI components
export type AriaRole = 
  | 'alert'
  | 'alertdialog'
  | 'application'
  | 'article'
  | 'banner'
  | 'button'
  | 'cell'
  | 'checkbox'
  | 'columnheader'
  | 'combobox'
  | 'complementary'
  | 'contentinfo'
  | 'definition'
  | 'dialog'
  | 'directory'
  | 'document'
  | 'feed'
  | 'figure'
  | 'form'
  | 'grid'
  | 'gridcell'
  | 'group'
  | 'heading'
  | 'img'
  | 'link'
  | 'list'
  | 'listbox'
  | 'listitem'
  | 'log'
  | 'main'
  | 'marquee'
  | 'math'
  | 'menu'
  | 'menubar'
  | 'menuitem'
  | 'menuitemcheckbox'
  | 'menuitemradio'
  | 'navigation'
  | 'none'
  | 'note'
  | 'option'
  | 'presentation'
  | 'progressbar'
  | 'radio'
  | 'radiogroup'
  | 'region'
  | 'row'
  | 'rowgroup'
  | 'rowheader'
  | 'scrollbar'
  | 'search'
  | 'searchbox'
  | 'separator'
  | 'slider'
  | 'spinbutton'
  | 'status'
  | 'switch'
  | 'tab'
  | 'table'
  | 'tablist'
  | 'tabpanel'
  | 'term'
  | 'textbox'
  | 'timer'
  | 'toolbar'
  | 'tooltip'
  | 'tree'
  | 'treegrid'
  | 'treeitem';

/**
 * Generate ARIA props for different UI component types 
 */
export const a11y = {
  /**
   * Button ARIA props
   * @param props - Custom ARIA props to override defaults
   */
  button: (props?: AriaProps) => ({
    role: 'button' as AriaRole,
    tabIndex: 0,
    ...props,
  }),

  /**
   * Toggle or switch ARIA props
   * @param isChecked - Whether the toggle is checked
   * @param props - Custom ARIA props to override defaults
   */
  toggle: (isChecked: boolean, props?: AriaProps) => ({
    role: 'switch' as AriaRole,
    'aria-checked': isChecked,
    tabIndex: 0,
    ...props,
  }),

  /**
   * Dialog ARIA props
   * @param props - Custom ARIA props to override defaults
   */
  dialog: (props?: AriaProps) => ({
    role: 'dialog' as AriaRole,
    'aria-modal': true,
    tabIndex: -1,
    ...props,
  }),

  /**
   * Dropdown or menu ARIA props
   * @param isOpen - Whether the dropdown is open
   * @param props - Custom ARIA props to override defaults
   */
  dropdown: (isOpen: boolean, props?: AriaProps) => ({
    'aria-haspopup': true,
    'aria-expanded': isOpen,
    ...props,
  }),

  /**
   * Tab ARIA props
   * @param isSelected - Whether the tab is selected
   * @param props - Custom ARIA props to override defaults
   */
  tab: (isSelected: boolean, props?: AriaProps) => ({
    role: 'tab' as AriaRole,
    'aria-selected': isSelected,
    tabIndex: isSelected ? 0 : -1,
    ...props,
  }),

  /**
   * Tab panel ARIA props
   * @param tabId - ID of the associated tab
   * @param props - Custom ARIA props to override defaults
   */
  tabPanel: (tabId: string, props?: AriaProps) => ({
    role: 'tabpanel' as AriaRole,
    'aria-labelledby': tabId,
    tabIndex: 0,
    ...props,
  }),

  /**
   * Accordion ARIA props
   * @param isExpanded - Whether the accordion is expanded
   * @param props - Custom ARIA props to override defaults
   */
  accordion: (isExpanded: boolean, props?: AriaProps) => ({
    'aria-expanded': isExpanded,
    ...props,
  }),

  /**
   * Status or toast ARIA props
   * @param props - Custom ARIA props to override defaults
   */
  status: (props?: AriaProps) => ({
    role: 'status' as AriaRole,
    'aria-live': 'polite',
    ...props,
  }),

  /**
   * Alert ARIA props
   * @param props - Custom ARIA props to override defaults
   */
  alert: (props?: AriaProps) => ({
    role: 'alert' as AriaRole,
    'aria-live': 'assertive',
    ...props,
  }),

  /**
   * Progressbar ARIA props
   * @param value - Current value
   * @param min - Minimum value
   * @param max - Maximum value
   * @param props - Custom ARIA props to override defaults
   */
  progressbar: (value: number, min: number = 0, max: number = 100, props?: AriaProps) => ({
    role: 'progressbar' as AriaRole,
    'aria-valuenow': value,
    'aria-valuemin': min,
    'aria-valuemax': max,
    ...props,
  }),
};
