import type { Skill } from "@prisma/client";
import type { ExperienceWithSkills } from "~/types/experience";
import ExperienceStep from "./experience-step";

export default function ExperienceSection({
  experiences,
  headline,
  icon,
}: {
  experiences: ExperienceWithSkills[];
  headline: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="pl-[17px]">
      <div className="-ml-[17px] mb-4 flex flex-row items-center gap-3">
        <div className="-mt-1 text-4xl">{icon}</div>
        <h2 className="text-2xl font-semibold leading-6">{headline}</h2>
      </div>
      {experiences.map((experience, index, arr) => (
        <ExperienceStep
          key={experience.id}
          jobTitle={experience.jobTitle}
          employer={experience.employer}
          start={new Date(experience.start)}
          end={experience.end != null ? new Date(experience.end) : undefined}
          skills={experience.skills.map((skill: Skill) => skill.title)}
          options={{
            isFirstInColumn: index == 0,
            isLastInColumn: index == arr.length - 1,
          }}
        />
      ))}
    </div>
  );
}
