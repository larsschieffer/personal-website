import { Octokit } from "@octokit/rest";
import { describe, expect, it } from "vitest";

const initOctokitClient = (): Octokit => {
  global.__octokit = new Octokit();

  return global.__octokit;
};

describe("db", () => {
  it("should reuse oktokit client", async () => {
    const octokitClient = initOctokitClient();
    const { octokit } = await import("./octokit.server");

    expect(octokit == octokitClient).toBeTruthy();
  });
});
