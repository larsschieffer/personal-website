import { describe, expect, it } from "vitest";
import type { TestCaseFor } from "../../tests/common/given";
import { Given } from "../../tests/common/given";
import { getDay, getMonth } from "./date";

describe("getMonth", () => {
  it.each<TestCaseFor<typeof getMonth>>([
    { parameters: ["de", Given.getDate()], expectedReturn: "Dez" },
    { parameters: ["en", Given.getDate()], expectedReturn: "Dec" },
  ])(
    "should return $expectedReturn for locale $parameters.0 and date $parameters.1",
    ({
      parameters: [locale, date],
      expectedReturn,
    }: TestCaseFor<typeof getMonth>) => {
      const actualReturn = getMonth(locale, date);
      expect(actualReturn).toBe(expectedReturn);
    }
  );
});

describe("getDay", () => {
  it.each<TestCaseFor<typeof getDay>>([
    { parameters: [Given.getDate()], expectedReturn: "06" },
    { parameters: [new Date(2017, 6, 17)], expectedReturn: "17" },
  ])(
    "should return $expectedReturn for date $parameters.0",
    ({ parameters: [date], expectedReturn }: TestCaseFor<typeof getDay>) => {
      const actualReturn = getDay(date);
      expect(actualReturn).toBe(expectedReturn);
    }
  );
});
