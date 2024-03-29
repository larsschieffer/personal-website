import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "./tests/*"],
    coverage: {
      100: true,
    },
    globals: true,
    setupFiles: [
      "./tests/setup/environment.ts",
      "./tests/setup/mock-api-node.ts",
      "./tests/setup/dom.ts",
    ],
  },
});
