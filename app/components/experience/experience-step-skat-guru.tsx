import ExperienceStep, { ExperienceStepOptions } from "./experience-step";

export default function ExperienceStepSkatGuru(options: ExperienceStepOptions) {
  const skills = [
    "Angular",
    "NgRx",
    "RxJS",
    "TypeScript",
    "WebSocket",
    "Apache Kafka",
    "Keycloak",
    "Spring Boot",
    "Docker",
  ];
  return (
    <ExperienceStep
      jobTitle="Full-Stack software developer as external consultant"
      employer="SMD Innovations GmbH"
      start={new Date("2021-06-15")}
      end={new Date("2022-09-30")}
      skills={skills}
      options={options}
    />
  );
}
