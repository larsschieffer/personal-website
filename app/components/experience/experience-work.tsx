import { useIntl } from "react-intl";

import { FcBriefcase } from "@react-icons/all-files/fc/FcBriefcase";
import ExperienceSection from "~/components/experience/experience-section";
import type { ExperienceWithSkills } from "~/types/experience";

export function ExperienceWork({
  experiences,
}: {
  experiences: ExperienceWithSkills[];
}) {
  const intl = useIntl();
  return (
    <ExperienceSection
      icon={<FcBriefcase />}
      headline={intl.formatMessage({ id: "headline.experience" })}
      experiences={experiences}
    ></ExperienceSection>
  );
}
