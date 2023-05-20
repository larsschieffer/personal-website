import type { Skill } from "@prisma/client";
import { useIntl } from "react-intl";
import type { ExperienceWithSkills } from "~/types/experience";
import type { StepData, StepOptions } from "./step";
import Step from "./step";

interface ExperienceWorkProps {
  experience: ExperienceWithSkills;
  options: StepOptions;
}

export default function ExperienceWorkStep({
  experience: { title, organisation, start, end, skills },
  options,
}: ExperienceWorkProps) {
  const intl = useIntl();
  const data: StepData = {
    title,
    organisation,
    start,
    end,
    description: `${intl.formatMessage({ id: "experience.skills" })}: ${skills
      .map((skill: Skill) => skill.title)
      .join(" · ")}`,
  };

  return <Step data={data} options={options}></Step>;
}
