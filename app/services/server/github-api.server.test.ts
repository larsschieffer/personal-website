import { Given } from "tests/common/given";
import { describe, expect, it } from "vitest";
import { createIssue, getMetaDataOfFilesAtPath } from "./github-api.server";

describe("getMetaDataOfFilesAtPath", () => {
  it("should return meta data files", async () => {
    const actual = await getMetaDataOfFilesAtPath(Given.contentPath());

    expect(actual).toStrictEqual([Given.fileMetaData()]);
  });
});

describe("createIssue", () => {
  it("should return id of created issue", async () => {
    const expectedTitle = "My example title";
    const actual = await createIssue(expectedTitle);

    expect(actual).toContain({ title: expectedTitle });
  });
});
