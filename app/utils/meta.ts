import type { V2_MetaFunction } from "@vercel/remix";

export function metaFunctionFactory({
  location,
  description = "My personal website to show my experience as a Software Developer",
}: {
  location?: string;
  description?: string;
} = {}): V2_MetaFunction {
  return () => [
    {
      title: `Lars Schieffer${location ? ` | ${location}` : ""}`,
    },
    {
      name: "description",
      content: description,
    },
  ];
}
