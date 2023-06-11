import { describe, expect, it } from "vitest";
import { notImplementedYet } from "./under-construction";

describe("notImplementedYet", () => {
  it("should return id for toast message", () => {
    const expectedReturn = "1";

    const actualReturn = notImplementedYet();

    expect(actualReturn).toBe(expectedReturn);
  });
});
