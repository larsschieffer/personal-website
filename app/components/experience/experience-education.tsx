import type { ExperienceOfEducationProps } from "~/types/experience";
import ExperienceStep from "./experience-step";

export default function ExperienceOfEducation({
  education,
  options,
}: ExperienceOfEducationProps): JSX.Element {
  return <ExperienceStep data={education} options={options}></ExperienceStep>;
}
