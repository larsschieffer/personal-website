import { useLoaderData } from "@remix-run/react";
import type { V2_ServerRuntimeMetaArgs } from "@remix-run/server-runtime";
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
import { useIntl } from "react-intl";
import invariant from "tiny-invariant";
import { BlogFeedback } from "~/components/blog/blog-feedback";
import { blogSubstitutionComponents } from "~/components/blog/blog-substitutions";
import { BoxContent } from "~/components/box/box-content";
import { WEBSITE_URL } from "~/constants/sitemap";
import { metaFunctionFactory } from "~/services/meta";
import { bundleFileMarkdown } from "~/services/server/markdown.server";
import type { BlogFrontmatter } from "~/types/blog";
import type { ContentBlogPostDate } from "~/types/content";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: highlightjs },
];

export const meta: V2_MetaFunction = (args: V2_ServerRuntimeMetaArgs) => {
  const {
    post: { frontmatter },
  } = args.data as { post: { frontmatter: BlogFrontmatter } };

  const meta = {
    url: `${WEBSITE_URL}${args.location.pathname.substring(1)}`,
    location: frontmatter.title,
    description: frontmatter.description,
    ...(frontmatter.thumbnail && { imageUrl: frontmatter.thumbnail }),
  };

  return metaFunctionFactory(meta)(args);
};

export const loader = async ({
  params,
}: LoaderArgs): Promise<TypedResponse<ContentBlogPostDate>> => {
  invariant(params.slug, "PostId is required");

  const post = await bundleFileMarkdown<BlogFrontmatter>(
    `en/blog/${params.slug}.mdx`
  );

  if (!post) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json(`Blog post ${params.slug} not found`, 404);
  }

  const feedback = await bundleFileMarkdown<BlogFrontmatter>(`en/feedback.mdx`);
  invariant(feedback, "Feedback markdown is missing");

  return json({ post, feedback });
};

export const Post = (): JSX.Element => {
  const {
    post: {
      code: postContent,
      frontmatter: { title, description, thumbnail },
    },
    feedback: { code: feedbackContent },
  } = useLoaderData<typeof loader>();
  const PostContent = useMemo(
    () => getMDXComponent(postContent),
    [postContent]
  );

  const intl = useIntl();

  useEffect((): void => {
    hljs.configure({ languages: ["html", "javascript", "typescript"] });
    hljs.highlightAll();
  }, []);

  return (
    <BoxContent headline={title} options={{ position: "center" }}>
      <section className="text-justify xs:mx-6 sm:mx-0 lg:mx-8 [&>*:last-child]:mb-0 [&_table]:my-4 [&_table]:w-full  [&_table]:table-auto [&_table_tr:nth-child(even)]:bg-gray-lighter [&_table_tr:nth-child(odd)]:bg-gray-light [&_table_tr_td:not(:first-child)]:text-center [&_table_tr_td]:p-1 [&_table_tr_th:not(:first-child)]:text-center [&_table_tr_th]:p-1">
        <p className="mb-6 text-justify text-sm font-semibold [text-align-last:center]">
          {description}
        </p>
        {thumbnail != undefined ? (
          <img
            className="my-6 w-full rounded-sm"
            src={thumbnail}
            alt={`${intl.formatMessage({
              id: "blog.thumbnailLabel",
            })} ${title}`}
          ></img>
        ) : null}
        <PostContent components={blogSubstitutionComponents} />
        <div className="mx-auto my-8 h-0.5 w-24 bg-gray-dark"></div>
        <BlogFeedback content={feedbackContent}></BlogFeedback>
      </section>
    </BoxContent>
  );
};

export default Post;
