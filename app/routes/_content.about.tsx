import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { useIntl } from "react-intl";
import BoxContent from "~/components/box/box-content";
import { ExperienceWork } from "~/components/experience/experiences-work";
import { db } from "~/services/server/db.server";
import { bundleFileMarkdown } from "~/services/server/markdown.server";

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
    <BoxContent headline={intl.formatMessage({ id: "headline.aboutMe" })}>
      <section className="text-justify">
        <AboutMeText />
      </section>
      <section>
        <ExperienceWork experiences={experiences}></ExperienceWork>
      </section>
    </BoxContent>
  );
}
