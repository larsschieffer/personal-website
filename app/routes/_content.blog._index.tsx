import { useLoaderData } from "@remix-run/react";
import { json } from "@vercel/remix";
import { useIntl } from "react-intl";
import ContentBox from "~/components/box/content-box";

import type { SerializeFrom } from "@vercel/remix";
import invariant from "tiny-invariant";
import { PostThumbnailWithDescription } from "~/components/blog/post-thumbnail-with-description";
import type { BlogFrontmatter } from "~/types/blog/blog-frontmatter";
import type { PostThumbnailType } from "~/types/blog/post-thumbnail";
import type { GithubMetaFile } from "~/types/github/github-meta-file";
import { bundleFileMarkdown } from "~/utils/markdown.server";

const byDateDesc = (
  { frontmatter: { published: a } }: { frontmatter: BlogFrontmatter },
  { frontmatter: { published: b } }: { frontmatter: BlogFrontmatter }
) => new Date(b).getTime() - new Date(a).getTime();

const onlyAlreadyPublished = ({
  frontmatter: { published },
}: {
  frontmatter: BlogFrontmatter;
}) => new Date(published) < new Date();

export async function loader() {
  const api = process.env.CONTENT_API_LOCATION;
  invariant(api, "Environment variable CONTENT_API_LOCATION is missing");

  const files = await fetch(`${api}en/blog`, {
    headers: {
      Authorization: process.env.GITHUB_TOKEN ?? "",
      Accept: "application/vnd.github+json",
    },
  });
  const filesData = (await files.json()) as GithubMetaFile[];

  let posts = await Promise.all(
    filesData.map(async (file: GithubMetaFile) => {
      const { frontmatter } = await bundleFileMarkdown<BlogFrontmatter>(
        file.path
      );

      return {
        id: file.sha,
        slug: file.name.replace(/.mdx/g, ""),
        frontmatter,
      };
    })
  );
  posts = posts.sort(byDateDesc).filter(onlyAlreadyPublished);

  return json({
    posts,
  });
}

export default function About() {
  const intl = useIntl();
  const { posts } = useLoaderData<typeof loader>();

  return (
    <ContentBox headline={intl.formatMessage({ id: "navigation.blog" })}>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {posts.map(
          ({ id, slug, frontmatter }: SerializeFrom<PostThumbnailType>) => (
            <PostThumbnailWithDescription
              key={id}
              slug={slug}
              frontMatter={frontmatter}
            ></PostThumbnailWithDescription>
          )
        )}
      </section>
    </ContentBox>
  );
}
