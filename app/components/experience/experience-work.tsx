import type { Skill } from "@prisma/client";
import { useIntl } from "react-intl";
import type { ExperienceOfWorkProps, StepData } from "~/types/experience";
import { ExperienceStep } from "./experience-step";

export const ExperienceOfWork = ({
  experience: { title, organisation, start, end, skills },
  options,
}: ExperienceOfWorkProps): JSX.Element => {
  const intl = useIntl();
  const description =
    skills.length > 0
      ? `${intl.formatMessage({ id: "experience.skills" })}: ${skills
          .map((skill: Skill) => skill.title)
          .join(" · ")}`
      : "";
  const data: StepData = {
    title,
    organisation,
    start,
    end,
    description,
  };

  return <ExperienceStep data={data} options={options}></ExperienceStep>;
};

export default ExperienceOfWork;
