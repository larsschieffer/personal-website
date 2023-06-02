import { FcBriefcase } from "@react-icons/all-files/fc/FcBriefcase";
import { useIntl } from "react-intl";
import Experiences from "~/components/experience/experiences";
import type { ExperiencesWorkProps } from "~/types/experience";
import ExperienceOfWork from "./experience-work";

export function ExperienceWork({ experiences }: ExperiencesWorkProps) {
  const intl = useIntl();

  return (
    <Experiences
      icon={<FcBriefcase />}
      headline={intl.formatMessage({ id: "headline.experience" })}
    >
      {experiences.map((experience, index, arr) => (
        <ExperienceOfWork
          key={experience.id}
          experience={experience}
          options={{
            isFirstInColumn: index == 0,
            isLastInColumn: index == arr.length - 1,
          }}
        />
      ))}
    </Experiences>
  );
}
