import { describe, expect, it } from "vitest";
import { createUserGeneratedIssue } from "./user-error.server";

describe("createUserGeneratedIssue", () => {
  it("should create user error", async () => {
    await expect(
      createUserGeneratedIssue("/PAGE-WITH-ERROR")
    ).resolves.not.toThrow();
  });
});
