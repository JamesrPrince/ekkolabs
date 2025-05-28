import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./client/src/__tests__/setup.ts"],
    include: ["./client/src/__tests__/**/*.test.{ts,tsx}"],
    coverage: {
      reporter: ["text", "json", "html"],
      exclude: [
        "node_modules/",
        "client/src/__tests__/",
        "**/*.d.ts",
        "**/*.test.{ts,tsx}",
        "**/types.ts",
      ],
    },
    deps: {
      inline: ["@testing-library/react", "@testing-library/jest-dom"],
    },
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./client/src"),
    },
  },
});
