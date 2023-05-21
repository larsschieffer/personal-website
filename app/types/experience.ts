import type { Experience, Skill } from "@prisma/client";
import type { SerializeFrom } from "@vercel/remix";

export type ExperienceWithSkills = SerializeFrom<
  Experience & {
    skills: Skill[];
  }
>;
