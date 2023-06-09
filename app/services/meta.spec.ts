import type { V2_MetaFunction } from "@vercel/remix";
import { describe, expect, it } from "vitest";
import { Given, type TestCaseFor } from "../../__tests__/common/given";
import translation from "../../public/assets/i18n/en.json";
import { metaFunctionFactory } from "./meta";

const expectedMetaFunction = (
  description: string,
  title: string
): V2_MetaFunction => {
  return () => [
    {
      name: "description",
      content: description,
    },
    {
      title,
    },
  ];
};

const description = translation.navigation.resume.description;
const descriptionKey = "navigation.blog.description";
const descriptionKeyTranslation = translation.navigation.blog.description;
const defaultDescription = translation.navigation.aboutMe.description;
const location = translation.navigation.resume.title;
const locationKey = "navigation.blog.title";
const locationKeyTranslation = translation.navigation.blog.title;

describe("metaFunctionFactory", () => {
  it.each<TestCaseFor<typeof metaFunctionFactory>>([
    {
      parameters: [],
      expectedReturn: expectedMetaFunction(
        defaultDescription,
        "Lars Schieffer"
      ),
    },
    {
      parameters: [{ location, description }],
      expectedReturn: expectedMetaFunction(
        description,
        `${location} | Lars Schieffer`
      ),
    },
    {
      parameters: [{ location }],
      expectedReturn: expectedMetaFunction(
        defaultDescription,
        `${location} | Lars Schieffer`
      ),
    },
    {
      parameters: [{ description }],
      expectedReturn: expectedMetaFunction(description, `Lars Schieffer`),
    },
    {
      parameters: [{ locationKey, descriptionKey }],
      expectedReturn: expectedMetaFunction(
        descriptionKeyTranslation,
        `${locationKeyTranslation} | Lars Schieffer`
      ),
    },
    {
      parameters: [{ locationKey }],
      expectedReturn: expectedMetaFunction(
        defaultDescription,
        `${locationKeyTranslation} | Lars Schieffer`
      ),
    },
    {
      parameters: [{ descriptionKey }],
      expectedReturn: expectedMetaFunction(
        descriptionKeyTranslation,
        `Lars Schieffer`
      ),
    },
  ])(
    "should return MetaFunction for $parameters.0",
    ({
      parameters,
      expectedReturn,
    }: TestCaseFor<typeof metaFunctionFactory>) => {
      const args = Given.getServerRuntimeMetaArgs();

      const actualReturn = metaFunctionFactory(...parameters);

      expect(actualReturn(args)).toStrictEqual(
        expectedReturn(Given.getServerRuntimeMetaArgs())
      );
    }
  );
});
