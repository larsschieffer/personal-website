import { useLoaderData } from "@remix-run/react";
import type { TypedResponse } from "@vercel/remix";
import { json } from "@vercel/remix";
import { useIntl } from "react-intl";
import BoxContent from "~/components/box/box-content";
import { ExperienceEducation } from "~/components/experience/experiences-education";
import { ExperienceWork } from "~/components/experience/experiences-work";
import { ProgressBarColumn } from "~/components/progress-bar/progress-bar-column";
import {
  backendSkills,
  cloudSkills,
  frontendSkills,
  securitySkills,
} from "~/constants/skill-percentages";
import { db } from "~/services/server/db.server";
import type { ContentResumeData } from "~/types/content";

export async function loader(): Promise<TypedResponse<ContentResumeData>> {
  const experiences = await db.experience.findMany({
    include: { skills: true },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  const educations = await db.education.findMany({
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  return json({ educations, experiences });
}

export default function About(): JSX.Element {
  const { educations, experiences } = useLoaderData<typeof loader>();
  const intl = useIntl();

  return (
    <BoxContent headline={intl.formatMessage({ id: "headline.resume" })}>
      <section>
        <ExperienceWork experiences={experiences}></ExperienceWork>
      </section>
      <section>
        <ExperienceEducation educations={educations}></ExperienceEducation>
      </section>
      <section>
        <h2 className="mb-4 text-2xl font-semibold">My Skills</h2>
        <div className="grid grid-cols-1 gap-2 rounded-4xl bg-gray-lighter p-8 pt-0 lg:grid-cols-2 lg:gap-4">
          <ProgressBarColumn
            headline={intl.formatMessage({ id: "skills.headline.frontend" })}
            progressBarItems={frontendSkills}
          ></ProgressBarColumn>
          <ProgressBarColumn
            headline={intl.formatMessage({
              id: "skills.headline.backendAndCloud",
            })}
            progressBarItems={[
              ...backendSkills,
              ...cloudSkills,
              ...securitySkills,
            ]}
          ></ProgressBarColumn>
        </div>
      </section>
    </BoxContent>
  );
}
