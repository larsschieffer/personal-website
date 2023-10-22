// @vitest-environment node
import { Given } from "tests/common/given";
import { describe, expect, it } from "vitest";
import { bundleFileMarkdown } from "./markdown.server";

describe("bundleFileMarkdown", () => {
  it("should return bundled markdown", async () => {
    const actual = await bundleFileMarkdown(Given.nameOfMarkdownFile());

    expect(actual).toBeDefined();
  });

  it("should not create bundle for not existing markdown file", async () => {
    const actual = await bundleFileMarkdown(
      Given.sameOfNotExistingMarkdownFile(),
    );

    expect(actual).toBeUndefined();
  });
});
