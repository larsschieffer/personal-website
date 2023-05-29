import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import ContentBox from "~/components/box/content-box";
import { db } from "~/utils/db.server";
import { bundleFileMarkdown } from "~/utils/markdown.server";

import { useIntl } from "react-intl";
import { ExperienceWork } from "~/components/experience/experiences-work";

export async function loader() {
  const experiences = await db.experience.findMany({
    include: { skills: true },
    orderBy: [
      {
        start: "desc",
      },
    ],
  });

  const { code, frontmatter } = await bundleFileMarkdown(
    "en/blog/about-me.mdx"
  );

  return json({ experiences, aboutMe: { code, frontmatter } });
}

export default function About() {
  const {
    experiences,
    aboutMe: { code },
  } = useLoaderData<typeof loader>();
  const intl = useIntl();
  const AboutMeText = useMemo(() => getMDXComponent(code), [code]);

  return (
    <ContentBox headline={intl.formatMessage({ id: "headline.aboutMe" })}>
      <section className="text-justify">
        <AboutMeText />
      </section>
      <section>
        <ExperienceWork experiences={experiences}></ExperienceWork>
      </section>
    </ContentBox>
  );
}
