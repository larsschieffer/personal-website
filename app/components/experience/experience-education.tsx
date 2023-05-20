import { useIntl } from "react-intl";

import { FcElectronics } from "@react-icons/all-files/fc/FcElectronics";
import ExperienceSection from "~/components/experience/experience-section";
import type { ExperienceWithSkills } from "~/types/experience";

export function ExperienceEducation({
  experiences,
}: {
  experiences: ExperienceWithSkills[];
}) {
  const intl = useIntl();
  return (
    <ExperienceSection
      icon={<FcElectronics />}
      headline={intl.formatMessage({ id: "headline.education" })}
      experiences={experiences}
    ></ExperienceSection>
  );
}
