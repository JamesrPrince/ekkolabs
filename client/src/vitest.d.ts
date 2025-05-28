/// <reference types="vitest" />
/// <reference types="@testing-library/jest-dom" />

import "@testing-library/jest-dom";

declare global {
  namespace Vi {
    interface JestAssertion {
      toBeInTheDocument(): void;
      toHaveTextContent(text: string): void;
      toHaveAttribute(name: string, value?: string): void;
      toBeVisible(): void;
      toBeChecked(): void;
      toBeDisabled(): void;
      toHaveClass(className: string): void;
      toHaveStyle(style: Record<string, any>): void;
      toHaveFocus(): void;
      toHaveValue(value: any): void;
    }
  }
}
