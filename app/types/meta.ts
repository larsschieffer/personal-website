import type { MetaFunction } from "@vercel/remix";

export type MetaFunctionFactory = (
  meta?:
    | { location: string; description: string; url: string; imageUrl: string }
    | {
      locationKey: string;
      descriptionKey: string;
      url: string;
      imageUrl: string;
    }
    | { location: string; url: string; imageUrl: string }
    | { locationKey: string; url: string; imageUrl: string }
    | { description: string; url: string; imageUrl: string }
    | { descriptionKey: string; url: string; imageUrl: string }
    | { location: string; description: string; url: string }
    | { locationKey: string; descriptionKey: string; url: string }
    | { location: string; url: string }
    | { locationKey: string; url: string }
    | { description: string; url: string }
    | { descriptionKey: string; url: string }
    | { url: string; imageUrl: string }
    | { location: string; description: string }
    | { locationKey: string; descriptionKey: string }
    | { location: string }
    | { locationKey: string }
    | { description: string }
    | { descriptionKey: string }
    | { url: string },
) => MetaFunction;
