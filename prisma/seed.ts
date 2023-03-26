import { PrismaClient, Resume } from "@prisma/client";
const db = new PrismaClient();

async function seed() {
  await Promise.all(
    getResumes().map((resume) => {
      return db.resume.create({ data: resume });
    })
  );
}

seed();

function getResumes() {
  const resume: Omit<Resume, "id"> = {
    path: "cv/lebenslauf.pdf",
  };
  return [resume];
}
