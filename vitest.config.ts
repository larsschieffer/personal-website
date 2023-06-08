import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults, defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    environment: "happy-dom",
    exclude: [...configDefaults.exclude, "**/__tests__/common/*"],
    coverage: {
      100: true,
    },
  },
});
