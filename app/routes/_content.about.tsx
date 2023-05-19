import type { Skill } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { FormattedMessage } from "react-intl";
import ExperienceStep from "~/components/experience-step";
import RoundedBox from "~/components/rounded-box";
import { db } from "~/utils/db.server";
import { bundleFileMarkdown } from "~/utils/markdown.server";

export async function loader() {
  const experiences = await db.experience.findMany({
    include: { skills: true },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  const mdx = await bundleFileMarkdown("about-me.mdx");

  return json({ experiences, mdx });
}

export default function About() {
  const { experiences, mdx } = useLoaderData<typeof loader>();
  const { code } = mdx;

  const Component = useMemo(() => getMDXComponent(code), [code]);

  return (
    <RoundedBox>
      <div className="bg-white px-10 pb-6 pt-9">
        <h1 className="pb-2 text-3xl font-bold after:block after:h-1 after:w-12 after:rounded-md after:bg-accent after:content-['']">
          <FormattedMessage id="headline.aboutMe"></FormattedMessage>
        </h1>
        <div className="[&>p]:mt-4">
          <Component />
        </div>
      </div>
      <div className="bg-gray-lighter px-10 pb-9 pt-6">
        <h2 className="text-3xl font-bold">
          <FormattedMessage id="headline.experience"></FormattedMessage>
        </h2>
        <div className="mt-6">
          {experiences.map((experience, index, arr) => (
            <ExperienceStep
              key={experience.id}
              jobTitle={experience.jobTitle}
              employer={experience.employer}
              start={new Date(experience.start)}
              end={
                experience.end != null ? new Date(experience.end) : undefined
              }
              skills={experience.skills.map((skill: Skill) => skill.title)}
              options={{
                isFirstInColumn: index == 0,
                isLastInColumn: index == arr.length - 1,
              }}
            />
          ))}
        </div>
      </div>
    </RoundedBox>
  );
}
