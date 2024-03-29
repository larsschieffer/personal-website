import { FcBriefcase } from "@react-icons/all-files/fc/FcBriefcase";
import { useIntl } from "react-intl";
import { Experiences } from "~/components/experience/experiences";
import type {
  ExperienceWithSkills,
  ExperiencesWorkProps,
} from "~/types/experience";
import { ExperienceOfWork } from "./experience-work";

export const ExperiencesWork = ({
  experiences,
}: ExperiencesWorkProps): JSX.Element => {
  const intl = useIntl();

  return (
    <Experiences
      icon={<FcBriefcase />}
      headline={intl.formatMessage({ id: "headline.experience" })}
    >
      {experiences.map(
        (
          experience: ExperienceWithSkills,
          index: number,
          arr: ExperienceWithSkills[],
        ) => (
          <ExperienceOfWork
            key={experience.id}
            experience={experience}
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

export default ExperiencesWork;
