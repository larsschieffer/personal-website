import ExperienceStep, { ExperienceStepOptions } from "./experience-step";

export default function ExperienceStepDetim(options: ExperienceStepOptions) {
  const skills = [
    "Angular",
    "NgRx",
    "RxJS",
    "AWS",
    "TypeScript",
    "Apache Kafka",
    "Spring Boot",
    "Java",
    "SQL",
  ];
  return (
    <ExperienceStep
      jobTitle="IT Consultant"
      employer="detim IT Consulting GmbH"
      start={new Date("2021-01-01")}
      skills={skills}
      options={options}
    />
  );
}
