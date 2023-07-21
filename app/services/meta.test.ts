import type { V2_MetaFunction } from "@vercel/remix";
import { describe, expect, it } from "vitest";
import { ASSETS_LOCATION } from "~/constants/assets-location";
import { WEBSITE_URL } from "~/constants/sitemap";
import translation from "../../public/assets/i18n/en.json";
import { Given, type TestCaseFor } from "../../tests/common/given";
import { metaFunctionFactory } from "./meta";

const expectedMetaFunction = (
  description: string,
  title: string,
  imageUrl: string,
  url: string,
): V2_MetaFunction => {
  return () => [
    {
      name: "description",
      content: description,
    },
    {
      title,
    },
    { property: "og:title", content: title },
    {
      property: "og:image",
      content: imageUrl,
    },
    { property: "og:description", content: description },
    { property: "og:url", content: url },
  ];
};

const description = translation.navigation.resume.description;
const descriptionKey = "navigation.blog.description";
const descriptionKeyTranslation = translation.navigation.blog.description;
const defaultDescription = translation.navigation.aboutMe.description;
const location = translation.navigation.resume.title;
const locationKey = "navigation.blog.title";
const locationKeyTranslation = translation.navigation.blog.title;
const defaultImageUrl = `${ASSETS_LOCATION}portrait.webp`;
const url = `${WEBSITE_URL}blog/posts/ng-container`;
const imageUrl = `${ASSETS_LOCATION}blog/thumbnails/containers.webpp`;

describe("metaFunctionFactory", () => {
  it.each<TestCaseFor<typeof metaFunctionFactory>>([
    {
      parameters: [],
      expectedReturn: expectedMetaFunction(
        defaultDescription,
        "Lars Schieffer",
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ location, description }],
      expectedReturn: expectedMetaFunction(
        description,
        `${location} | Lars Schieffer`,
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ location }],
      expectedReturn: expectedMetaFunction(
        defaultDescription,
        `${location} | Lars Schieffer`,
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ description }],
      expectedReturn: expectedMetaFunction(
        description,
        `Lars Schieffer`,
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ locationKey, descriptionKey }],
      expectedReturn: expectedMetaFunction(
        descriptionKeyTranslation,
        `${locationKeyTranslation} | Lars Schieffer`,
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ locationKey }],
      expectedReturn: expectedMetaFunction(
        defaultDescription,
        `${locationKeyTranslation} | Lars Schieffer`,
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ descriptionKey }],
      expectedReturn: expectedMetaFunction(
        descriptionKeyTranslation,
        `Lars Schieffer`,
        defaultImageUrl,
        WEBSITE_URL,
      ),
    },
    {
      parameters: [{ descriptionKey, url, imageUrl }],
      expectedReturn: expectedMetaFunction(
        descriptionKeyTranslation,
        `Lars Schieffer`,
        imageUrl,
        url,
      ),
    },
  ])(
    "should return MetaFunction for $parameters.0",
    ({
      parameters,
      expectedReturn,
    }: TestCaseFor<typeof metaFunctionFactory>) => {
      const args = Given.serverRuntimeMetaArgs();

      const actualReturn = metaFunctionFactory(...parameters);

      expect(actualReturn(args)).toStrictEqual(
        expectedReturn(Given.serverRuntimeMetaArgs()),
      );
    },
  );
});
