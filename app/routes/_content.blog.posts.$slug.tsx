import { useLoaderData } from "@remix-run/react";
import type {
  LinksFunction,
  LoaderArgs,
  TypedResponse,
  V2_MetaFunction,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import hljs from "highlight.js";
import highlightjs from "highlight.js/styles/github.css";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo } from "react";
import invariant from "tiny-invariant";
import BlogFeedback from "~/components/blog/blog-feedback";
import { blogSubstitutionComponents } from "~/components/blog/blog-substitutions";
import BoxContent from "~/components/box/box-content";
import { metaFunctionFactory } from "~/services/meta";
import { bundleFileMarkdown } from "~/services/server/markdown.server";
import type { BlogFrontmatter } from "~/types/blog";
import type { ContentBlogPostDate } from "~/types/content";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: highlightjs },
];

export const meta: V2_MetaFunction = (args) => {
  const {
    post: { frontmatter },
  } = args.data as { post: { frontmatter: BlogFrontmatter } };

  const meta = {
    location: frontmatter.title,
    description: frontmatter.description,
  };

  return metaFunctionFactory(meta)(args);
};

export async function loader({
  params,
}: LoaderArgs): Promise<TypedResponse<ContentBlogPostDate>> {
  invariant(params.slug, "PostId is required");

  const post = await bundleFileMarkdown(`en/blog/${params.slug}.mdx`);
  const feedback = await bundleFileMarkdown(`en/feedback.mdx`);

  return json({ post, feedback });
}

export default function Post(): JSX.Element {
  const {
    post: { code: postContent, frontmatter },
    feedback: { code: feedbackContent },
  } = useLoaderData<typeof loader>();
  const PostContent = useMemo(
    () => getMDXComponent(postContent),
    [postContent]
  );

  useEffect((): void => {
    hljs.highlightAll();
  }, []);

  return (
    <BoxContent headline={frontmatter.title} options={{ position: "center" }}>
      <section className="[&>*:last-child]:mb-0 xs:mx-6 sm:mx-0 lg:mx-8 text-justify [&_table_tr:nth-child(even)]:bg-gray-lighter [&_table_tr:nth-child(odd)]:bg-gray-light  [&_table]:table-auto [&_table]:w-full [&_table]:my-4 [&_table_tr_th:not(:first-child)]:text-center [&_table_tr_td:not(:first-child)]:text-center [&_table_tr_td]:p-1 [&_table_tr_th]:p-1">
        <PostContent components={blogSubstitutionComponents} />
        <div className="h-0.5 bg-gray-dark w-24 mx-auto my-8"></div>
        <BlogFeedback content={feedbackContent}></BlogFeedback>
      </section>
    </BoxContent>
  );
}
