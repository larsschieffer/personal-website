import { useIntl } from "react-intl";

import { FcBriefcase } from "@react-icons/all-files/fc/FcBriefcase";
import StepsSection from "~/components/experience/steps-section";
import type { ExperienceWithSkills } from "~/types/experience";
import ExperienceWorkStep from "./experience-work-step";

export function ExperienceWork({
  experiences,
}: {
  experiences: ExperienceWithSkills[];
}) {
  const intl = useIntl();

  return (
    <StepsSection
      icon={<FcBriefcase />}
      headline={intl.formatMessage({ id: "headline.experience" })}
    >
      {experiences.map((experience, index, arr) => (
        <ExperienceWorkStep
          key={experience.id}
          experience={experience}
          options={{
            isFirstInColumn: index == 0,
            isLastInColumn: index == arr.length - 1,
          }}
        />
      ))}
    </StepsSection>
  );
}
