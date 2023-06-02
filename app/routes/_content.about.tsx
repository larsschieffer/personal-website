import { useLoaderData } from "@remix-run/react";
import type { TypedResponse } from "@vercel/remix";
import { json } from "@vercel/remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import { useIntl } from "react-intl";
import { BoxContent } from "~/components/box/box-content";
import { ExperiencesWork } from "~/components/experience/experiences-work";
import { db } from "~/services/server/db.server";
import { bundleFileMarkdown } from "~/services/server/markdown.server";
import type { ContentAbout } from "~/types/content";

export const loader = async (): Promise<TypedResponse<ContentAbout>> => {
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
};

export const About = (): JSX.Element => {
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
        <ExperiencesWork experiences={experiences}></ExperiencesWork>
      </section>
    </BoxContent>
  );
};

export default About;
