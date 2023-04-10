import {
  Experience,
  PrismaClient,
  Resume,
  Skill,
  SkillArea,
} from "@prisma/client";
const db = new PrismaClient();

enum SkillId {
  NGRX = "e0f7d1b4-9cab-49f0-9b34-597f63512440",
  CONTENTSQUARE = "32c40b1c-8e73-4440-9593-dba04e6d12a3",
  ANGULAR = "72ee1fc2-3257-4edd-8b18-07e794f81680",
  KEYCLOAK = "38d6d307-ea17-4ce4-a021-d1228bce4456",
  JAVA = "fd0d9765-efaa-4a5c-a0d9-c4922b5c3581",
  APACHE_KAFKA = "f2645ad3-d86e-4dc3-a6aa-97447dabd21e",
  NX = "10b8d29e-7d53-4c14-8056-008a89b0840c",
  SPRING_BOOT = "f40a0584-fe00-4815-b6c4-5183c322cba2",
  STORYBOOK = "e2312e09-9447-4a2f-8959-52b04ee220b9",
  DOCKER = "aca7e97b-df93-4b0f-8854-336bb3597ff4",
  JEST = "443c0839-f9f8-46fc-9adf-4f182ee5a5fe",
  WEBSOCKET = "851ae48c-4c32-4390-b992-ecb9cf47ada7",
  PLAYWRIGHT = "94c96ac3-ceec-4385-a99a-3ef077cdc625",
  AWS = "4501c16e-945f-46cd-a34b-3f3b57ca0e40",
  RXJS = "2987f8d3-2bf6-4f3e-84a0-9e5a4c67a741",
  SQL = "9802fb35-3e22-4b51-84fc-a8eff4c1175c",
  TYPESCRIPT = "0c13157f-9d19-4dc3-88bd-6d20bc823598",
  TAILWIND_CSS = "6d1def26-b083-4a85-9ab9-c318411492f3",
}

function getResumes(): Omit<Resume, "id">[] {
  return [
    {
      path: "cv/lebenslauf.pdf",
    },
  ];
}

function getExperiences(): {
  experience: Omit<Experience, "id">;
  skillIds: string[];
}[] {
  return [
    {
      experience: {
        jobTitle: "IT Consultant",
        employer: "detim IT Consulting GmbH",
        start: new Date("2021-01-01"),
        end: null,
      },
      skillIds: [
        SkillId.ANGULAR,
        SkillId.NGRX,
        SkillId.RXJS,
        SkillId.AWS,
        SkillId.TYPESCRIPT,
        SkillId.APACHE_KAFKA,
        SkillId.SPRING_BOOT,
        SkillId.JAVA,
        SkillId.SQL,
      ],
    },
    {
      experience: {
        jobTitle: "Frontend software developer as external consultant",
        employer: "Carglass® Germany",
        start: new Date("2022-12-15"),
        end: null,
      },
      skillIds: [
        SkillId.ANGULAR,
        SkillId.NGRX,
        SkillId.RXJS,
        SkillId.NX,
        SkillId.TYPESCRIPT,
        SkillId.TAILWIND_CSS,
        SkillId.CONTENTSQUARE,
        SkillId.STORYBOOK,
        SkillId.JEST,
        SkillId.PLAYWRIGHT,
      ],
    },
    {
      experience: {
        jobTitle: "Full-Stack software developer as external consultant",
        employer: "SMD Innovations GmbH",
        start: new Date("2021-06-15"),
        end: new Date("2022-09-30"),
      },
      skillIds: [
        SkillId.ANGULAR,
        SkillId.NGRX,
        SkillId.RXJS,
        SkillId.TYPESCRIPT,
        SkillId.WEBSOCKET,
        SkillId.APACHE_KAFKA,
        SkillId.KEYCLOAK,
        SkillId.SPRING_BOOT,
        SkillId.DOCKER,
      ],
    },
  ];
}

function getSkills(): Skill[] {
  return [
    {
      id: SkillId.ANGULAR,
      title: "Angular",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.NGRX,
      title: "NgRx",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.RXJS,
      title: "RxJS",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.TYPESCRIPT,
      title: "TypeScript",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.WEBSOCKET,
      title: "WebSocket",
      area: SkillArea.None,
    },
    {
      id: SkillId.APACHE_KAFKA,
      title: "Apache Kafka",
      area: SkillArea.Cloud,
    },
    {
      id: SkillId.KEYCLOAK,
      title: "Keycloak",
      area: SkillArea.Cloud,
    },
    {
      id: SkillId.SPRING_BOOT,
      title: "Spring Boot",
      area: SkillArea.Backend,
    },
    {
      id: SkillId.DOCKER,
      title: "Docker",
      area: SkillArea.Cloud,
    },
    {
      id: SkillId.NX,
      title: "Nx",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.TAILWIND_CSS,
      title: "Tailwind CSS",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.CONTENTSQUARE,
      title: "Contentsquare",
      area: SkillArea.None,
    },
    {
      id: SkillId.STORYBOOK,
      title: "Storybook",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.JEST,
      title: "Jest",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.PLAYWRIGHT,
      title: "Playwright",
      area: SkillArea.Frontend,
    },
    {
      id: SkillId.AWS,
      title: "AWS",
      area: SkillArea.Cloud,
    },
    {
      id: SkillId.JAVA,
      title: "Java",
      area: SkillArea.Backend,
    },
    {
      id: SkillId.SQL,
      title: "SQL",
      area: SkillArea.Backend,
    },
  ];
}

async function seed() {
  await Promise.all(
    getResumes().map((resume) => {
      return db.resume.create({ data: resume });
    })
  );

  await Promise.all(
    getSkills().map((skill: Skill) => {
      return db.skill.create({ data: skill });
    })
  );

  await Promise.all(
    getExperiences().map((experienceData) => {
      return db.experience.create({
        data: {
          ...experienceData.experience,
          skills: {
            connect: experienceData.skillIds.map((id: string) => ({ id })),
          },
        },
      });
    })
  );
}

seed();
