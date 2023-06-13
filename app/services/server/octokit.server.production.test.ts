import { describe, expect, it, vi } from "vitest";

const clearOctokitClient = (): void => {
  global.__octokit = undefined;
};

const setProductionEnvironment = (): void => {
  vi.stubEnv("NODE_ENV", "production");
};

describe("oktokit", () => {
  it("should create oktokit client", async () => {
    clearOctokitClient();
    setProductionEnvironment();

    const { octokit } = await import("./octokit.server");

    expect(octokit).toBeDefined();
    expect(global.__octokit == undefined).toBeTruthy();
  });
});
