import type { V2_MetaFunction } from "@vercel/remix";

export type MetaFunctionFactory = (
  meta?:
    | { location: string; description: string }
    | { locationKey: string; descriptionKey: string }
    | { location: string }
    | { locationKey: string }
    | { description: string }
    | { descriptionKey: string }
) => V2_MetaFunction;
