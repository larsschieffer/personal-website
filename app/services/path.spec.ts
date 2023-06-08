import { describe, expect, it } from "vitest";
import type { TestCaseFor } from "../../__tests__/common/given";
import { isLinkTargetingPathname } from "./path";

const linkTarget = "blog";
const pathname = `/${linkTarget}/posts`;

describe("isLinkTargetingPathname", () => {
  it.each<TestCaseFor<typeof isLinkTargetingPathname>>([
    { parameters: [undefined, linkTarget], expectedReturn: false },
    { parameters: [pathname, undefined], expectedReturn: false },
    { parameters: [pathname, linkTarget], expectedReturn: true },
    { parameters: [pathname, pathname.substring(1)], expectedReturn: true },
    {
      parameters: [pathname, `${pathname.substring(1)}/diff`],
      expectedReturn: false,
    },
    { parameters: [pathname, `diff/${linkTarget}`], expectedReturn: false },
  ])(
    "should return $expectedReturn for pathname $parameters.0 and linkTarget $parameters.1",
    ({
      parameters: [pathname, linkTarget],
      expectedReturn,
    }: TestCaseFor<typeof isLinkTargetingPathname>) => {
      const actualReturn = isLinkTargetingPathname(pathname, linkTarget);
      expect(actualReturn).toBe(expectedReturn);
    }
  );
});
