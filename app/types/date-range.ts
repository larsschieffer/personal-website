import type { Experience } from "@prisma/client";
import type { SerializeFrom } from "@vercel/remix";

export type DateRangeProps = SerializeFrom<Pick<Experience, "start" | "end">>;
