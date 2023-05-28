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
import type { BlogFrontmatter } from "~/types/blog/blog-frontmatter";
import { metaFunctionFactory } from "~/utils/meta";

export const meta: V2_MetaFunction = (args) => {
  const {
    aboutMe: { frontmatter },
  } = args.data as { aboutMe: { frontmatter: BlogFrontmatter } };

  const meta = {
    location: frontmatter.title,
    description: frontmatter.description,
  };

  return metaFunctionFactory(meta)(args);
};

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
      <section>
        <AboutMeText />
      </section>
      <section>
        <ExperienceWork experiences={experiences}></ExperienceWork>
      </section>
    </ContentBox>
  );
}
