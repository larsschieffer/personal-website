import { FcElectronics } from "@react-icons/all-files/fc/FcElectronics";
import { useIntl } from "react-intl";
import Experiences from "~/components/experience/experiences";
import type { ExperienceEducationProps } from "~/types/experience";
import ExperienceOfEducation from "./experience-education";

export function ExperienceEducation({ educations }: ExperienceEducationProps) {
  const intl = useIntl();
  return (
    <Experiences
      icon={<FcElectronics />}
      headline={intl.formatMessage({
        id: "headline.educationAndCertification",
      })}
    >
      {educations.map((education, index, arr) => (
        <ExperienceOfEducation
          key={education.id}
          education={education}
          options={{
            isFirstInColumn: index == 0,
            isLastInColumn: index == arr.length - 1,
          }}
        />
      ))}
    </Experiences>
  );
}
