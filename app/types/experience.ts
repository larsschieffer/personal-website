import type { Education, Experience, Skill } from "@prisma/client";
import type { SerializeFrom } from "@vercel/remix";
import type { PropsWithChildren, ReactNode } from "react";

export type ExperienceWithSkills = SerializeFrom<
  Experience & {
    skills: Skill[];
  }
>;

export interface ExperienceOfEducationProps {
  education: SerializeFrom<Education>;
  options: StepOptions;
}

export interface ExperienceOfWorkProps {
  experience: ExperienceWithSkills;
  options: StepOptions;
}

export interface StepOptions {
  isFirstInColumn?: boolean;
  isLastInColumn?: boolean;
}

export interface StepData {
  title: string;
  organisation: string | null;
  start: string;
  end: string | null;
  description: string | null;
}

export interface StepProps {
  data: StepData;
  options: StepOptions;
}

export interface ExperiencesProps extends PropsWithChildren {
  headline: string;
  icon: ReactNode;
}

export interface ExperienceEducationProps {
  educations: SerializeFrom<Education>[];
}

export interface ExperiencesWorkProps {
  experiences: ExperienceWithSkills[];
}
