import type { Education } from "@prisma/client";
import type { SerializeFrom } from "@vercel/remix";
import type { StepOptions } from "./step";
import Step from "./step";

interface ExperienceEducationStepProps {
  education: SerializeFrom<Education>;
  options: StepOptions;
}

export default function ExperienceEducationStep({
  education,
  options,
}: ExperienceEducationStepProps) {
  return <Step data={education} options={options}></Step>;
}
