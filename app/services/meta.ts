import type { V2_MetaFunction } from "@vercel/remix";

export const metaFunctionFactory =
  ({
    location,
    description,
  }: {
    location?: string;
    description?: string;
  } = {}): V2_MetaFunction =>
  () => {
    const meta = [];
    if (description != null) {
      meta.push({
        name: "description",
        content: description,
      });
    }

    meta.unshift({
      title: `Lars Schieffer${location ? ` | ${location}` : ""}`,
    });

    return meta;
  };
