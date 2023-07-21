import type { Education } from "@prisma/client";
import { FcElectronics } from "@react-icons/all-files/fc/FcElectronics";
import type { SerializeFrom } from "@remix-run/node";
import { useIntl } from "react-intl";
import { Experiences } from "~/components/experience/experiences";
import type { ExperienceEducationProps } from "~/types/experience";
import { ExperienceOfEducation } from "./experience-education";

export const ExperiencesEducation = ({
  educations,
}: ExperienceEducationProps): JSX.Element => {
  const intl = useIntl();
  return (
    <Experiences
      icon={<FcElectronics />}
      headline={intl.formatMessage({
        id: "headline.educationAndCertification",
      })}
    >
      {educations.map(
        (
          education: SerializeFrom<Education>,
          index: number,
          arr: SerializeFrom<Education>[],
        ) => (
          <ExperienceOfEducation
            key={education.id}
            education={education}
            options={{
              isFirstInColumn: index == 0,
              isLastInColumn: index == arr.length - 1,
            }}
          />
        ),
      )}
    </Experiences>
  );
};

export default ExperiencesEducation;
