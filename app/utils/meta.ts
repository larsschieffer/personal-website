import type { V2_MetaFunction } from "@vercel/remix";

export function metaFunctionFactory(
  locationDescription?: string
): V2_MetaFunction {
  return () => [
    {
      title: `Lars Schieffer${
        locationDescription ? ` | ${locationDescription}` : ""
      }`,
    },
    {
      name: "description",
      content:
        "My personal website to show my experience as a Software Developer",
    },
  ];
}
