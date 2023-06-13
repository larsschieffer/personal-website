import { describe, expect, it } from "vitest";
import { getValueEnvironmentFromVariable } from "./environment.server";

describe("getValueEnvironmentFromVariable", () => {
  it("should return value of environment variable", () => {
    const actual = getValueEnvironmentFromVariable("NODE_ENV");
    expect(actual).toBe("test");
  });
  it("should throw on missing environment variable", () => {
    expect(() => getValueEnvironmentFromVariable("NOT_EXISTING")).toThrow(
      Error
    );
  });
});
