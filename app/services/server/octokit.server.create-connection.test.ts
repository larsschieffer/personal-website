import { describe, expect, it } from "vitest";

const clearOctokitClient = (): void => {
  global.__octokit = undefined;
};

describe("oktokit", () => {
  it("should create oktokit client", async () => {
    clearOctokitClient();
    const { octokit } = await import("./octokit.server");

    expect(octokit).toBeDefined();
    expect(global.__octokit == octokit).toBeTruthy();
  });
});
