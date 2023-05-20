import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { useIntl } from "react-intl";
import ContentBox from "~/components/content-box";
import { db } from "~/utils/db.server";

import type { V2_MetaFunction } from "@vercel/remix";
import { ExperienceEducation } from "~/components/experience/experience-education";
import { ExperienceWork } from "~/components/experience/experience-work";
import { metaFunctionFactory } from "~/utils/meta";

export const meta: V2_MetaFunction = metaFunctionFactory("Resume");

export async function loader() {
  const experiences = await db.experience.findMany({
    include: { skills: true },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  return json({ experiences });
}

export default function About() {
  const { experiences } = useLoaderData<typeof loader>();
  const intl = useIntl();

  return (
    <ContentBox headline={intl.formatMessage({ id: "headline.resume" })}>
      <section>
        <ExperienceWork experiences={experiences}></ExperienceWork>
      </section>
      <section>
        <ExperienceEducation
          experiences={experiences.slice(0, 2)}
        ></ExperienceEducation>
      </section>
      <section>
        <h2 className="text-2xl font-semibold">My Skills</h2>
      </section>
    </ContentBox>
  );
}
