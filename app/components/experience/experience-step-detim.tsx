import ExperienceStep from "./experience-step";

export default function ExperienceStepDetim() {
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
      options={{ isFirstInRow: true }}
    />
  );
}
