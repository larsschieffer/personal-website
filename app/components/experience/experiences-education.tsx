import { useIntl } from "react-intl";

import type { Education } from "@prisma/client";
import { FcElectronics } from "@react-icons/all-files/fc/FcElectronics";
import type { SerializeFrom } from "@vercel/remix";
import StepsSection from "~/components/experience/steps-section";
import ExperienceEducationStep from "./experience-education-step";

export function ExperienceEducation({
  educations,
}: {
  educations: SerializeFrom<Education>[];
}) {
  const intl = useIntl();
  return (
    <StepsSection
      icon={<FcElectronics />}
      headline={intl.formatMessage({
        id: "headline.educationAndCertification",
      })}
    >
      {educations.map((education, index, arr) => (
        <ExperienceEducationStep
          key={education.id}
          education={education}
          options={{
            isFirstInColumn: index == 0,
            isLastInColumn: index == arr.length - 1,
          }}
        />
      ))}
    </StepsSection>
  );
}
