import { Feed } from "feed";
import invariant from "tiny-invariant";
import { ASSETS_LOCATION } from "~/constants/assets-location";
import { DOMAINE, WEBSITE_URL } from "~/constants/sitemap";
import { getMetaDataOfFilesAtPath } from "~/services/server/github-api.server";
import { bundleFileMarkdown } from "~/services/server/markdown.server";
import type { BlogFrontmatter, PostThumbnailType } from "~/types/blog";

const byDateDesc = (
  { frontmatter: { published: a } }: { frontmatter: BlogFrontmatter },
  { frontmatter: { published: b } }: { frontmatter: BlogFrontmatter },
): number => new Date(b).getTime() - new Date(a).getTime();

const onlyAlreadyPublished = ({
  frontmatter: { published },
}: {
  frontmatter: BlogFrontmatter;
}): boolean => new Date(published) < new Date();

const contactDetails = {
  name: "Lars Schieffer",
  email: `contact@${DOMAINE}`,
  link: WEBSITE_URL,
};

export const loader = async (): Promise<Response> => {
  const feed = new Feed({
    title: "Lars Schieffers Blog",
    description: "The Lars Schieffers Blog",
    id: `${WEBSITE_URL}blog`,
    link: `${WEBSITE_URL}blog`,
    language: "en",
    image: `${ASSETS_LOCATION}portrait.webp`,
    favicon: `${WEBSITE_URL}favicon.ico`,
    copyright: `All rights reserved ${new Date().getUTCFullYear()}, Lars Schieffer`,
    generator: "Lars Schieffer",
    author: contactDetails,
  });
  const files = await getMetaDataOfFilesAtPath("en/blog");

  let posts = await Promise.all(
    files.map(
      async ({
        path,
        sha,
        name,
      }: {
        path: string;
        sha: string;
        name: string;
      }) => {
        const markdown = await bundleFileMarkdown<BlogFrontmatter>(path);
        invariant(markdown);

        const { frontmatter } = markdown;

        return {
          id: sha,
          slug: name.replace(/.mdx/g, ""),
          frontmatter,
        };
      },
    ),
  );
  posts = posts.sort(byDateDesc).filter(onlyAlreadyPublished);

  posts.forEach(
    ({
      frontmatter: { title, description, published, thumbnail },
      slug,
    }: PostThumbnailType) => {
      feed.addItem({
        title,
        id: `${WEBSITE_URL}blog/posts/${slug}`,
        link: `${WEBSITE_URL}blog/posts/${slug}`,
        description,
        date: new Date(new Date(published).setHours(10, 0, 0, 0)),
        author: [contactDetails],
        image: thumbnail,
      });
    },
  );

  feed.addCategory("Technologie");

  feed.addContributor(contactDetails);

  return new Response(feed.rss2(), {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
    },
  });
};
