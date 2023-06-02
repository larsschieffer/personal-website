import type { V2_MetaFunction } from "@vercel/remix";

export const metaFunctionFactory = ({
  location,
  description = "My personal website to show my experience as a Software Developer",
}: {
  location?: string;
  description?: string;
} = {}): V2_MetaFunction => () => [
    {
      title: `Lars Schieffer${location ? ` | ${location}` : ""}`,
    },
    {
      name: "description",
      content: description,
    },
  ];
