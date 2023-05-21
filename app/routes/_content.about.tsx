import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import ContentBox from "~/components/box/content-box";
import { db } from "~/utils/db.server";
import { bundleFileMarkdown } from "~/utils/markdown.server";

import type { V2_MetaFunction } from "@vercel/remix";
import { useIntl } from "react-intl";
import { ExperienceWork } from "~/components/experience/experiences-work";
import { metaFunctionFactory } from "~/utils/meta";

export const meta: V2_MetaFunction = metaFunctionFactory("About Me");

export async function loader() {
  const experiences = await db.experience.findMany({
    include: { skills: true },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  const { code } = await bundleFileMarkdown("en/about-me.mdx");

  return json({ experiences, code });
}

export default function About() {
  const { experiences, code } = useLoaderData<typeof loader>();
  const intl = useIntl();
  const AboutMeText = useMemo(() => getMDXComponent(code), [code]);

  return (
    <ContentBox headline={intl.formatMessage({ id: "headline.aboutMe" })}>
      <section className="flex flex-col gap-4">
        <AboutMeText />
      </section>
      <section>
        <ExperienceWork experiences={experiences}></ExperienceWork>
      </section>
    </ContentBox>
  );
}
