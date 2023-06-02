import { useLoaderData } from "@remix-run/react";
import type { SerializeFrom, TypedResponse } from "@vercel/remix";
import { json } from "@vercel/remix";
import { useIntl } from "react-intl";
import invariant from "tiny-invariant";
import { BlogPostThumbnail } from "~/components/blog/blog-post-thumbnail";
import { BoxContent } from "~/components/box/box-content";
import { bundleFileMarkdown } from "~/services/server/markdown.server";
import type { BlogFrontmatter, PostThumbnailType } from "~/types/blog";
import type { ContentBlogData } from "~/types/content";
import type { GithubMetaFile } from "~/types/github";

const byDateDesc = (
  { frontmatter: { published: a } }: { frontmatter: BlogFrontmatter },
  { frontmatter: { published: b } }: { frontmatter: BlogFrontmatter }
): number => new Date(b).getTime() - new Date(a).getTime();

const onlyAlreadyPublished = ({
  frontmatter: { published },
}: {
  frontmatter: BlogFrontmatter;
}): boolean => new Date(published) < new Date();

export const loader = async (): Promise<TypedResponse<ContentBlogData>> => {
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
};

export const Blog = (): JSX.Element => {
  const intl = useIntl();
  const { posts } = useLoaderData<typeof loader>();

  return (
    <BoxContent headline={intl.formatMessage({ id: "navigation.blog" })}>
      <section className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {posts.map(
          ({ id, slug, frontmatter }: SerializeFrom<PostThumbnailType>) => (
            <BlogPostThumbnail
              key={id}
              slug={slug}
              frontMatter={frontmatter}
            ></BlogPostThumbnail>
          )
        )}
      </section>
    </BoxContent>
  );
};

export default Blog;
