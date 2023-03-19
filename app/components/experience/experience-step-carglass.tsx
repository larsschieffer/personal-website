import ExperienceStep, { ExperienceStepOptions } from "./experience-step";

export default function ExperienceStepCarglass(options: ExperienceStepOptions) {
  const skills = [
    "Angular",
    "NgRx",
    "RxJS",
    "Nx",
    "TypeScript",
    "Tailwind CSS",
    "Contentsquare",
    "Storybook",
    "Jest",
    "Playwright",
  ];
  return (
    <ExperienceStep
      jobTitle="Frontend software developer as external consultant"
      employer="Carglass® Germany"
      start={new Date("2022-12-15")}
      skills={skills}
      options={options}
    />
  );
}
