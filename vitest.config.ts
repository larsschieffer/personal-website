import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "./tests/*"],
    coverage: {
      thresholdAutoUpdate: true,
      perFile: true,
      all: true,
      lines: 0,
      functions: 0,
      branches: 0,
      statements: 0,
      include: [
        "app/**/*.ts",
        "app/**/*.tsx"
      ],
      exclude: [
        // Defaults from remix
        "app/entry.client.tsx",
        "app/entry.server.tsx",
        // Types needn't be unit tested
        "app/types/**",
      ]
    },
    globals: true,
    setupFiles: [
      "./tests/setup/environment.ts",
      "./tests/setup/mock-api-node.ts",
      "./tests/setup/dom.ts",
    ],
  },
});
