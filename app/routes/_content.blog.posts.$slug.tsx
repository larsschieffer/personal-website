import { FaGithub } from "@react-icons/all-files/fa/FaGithub";
import { FaLinkedinIn } from "@react-icons/all-files/fa/FaLinkedinIn";
import { FaXing } from "@react-icons/all-files/fa/FaXing";
import { useLoaderData } from "@remix-run/react";
import type { ServerRuntimeMetaArgs } from "@remix-run/server-runtime";
import type {
  LinksFunction,
  TypedResponse,
  MetaFunction,
  LoaderFunctionArgs,
} from "@vercel/remix";
import { json } from "@vercel/remix";
import hljs from "highlight.js";
import highlightjs from "highlight.js/styles/github.css";
import { getMDXComponent } from "mdx-bundler/client";
import { useEffect, useMemo, useState } from "react";
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

export const meta: MetaFunction = (
  args: ServerRuntimeMetaArgs,
) => {
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
  params: { slug },
}: LoaderFunctionArgs): Promise<TypedResponse<ContentBlogPostDate>> => {
  invariant(slug, "PostId is required");

  const post = await bundleFileMarkdown<BlogFrontmatter>(`en/blog/${slug}.mdx`);

  if (!post) {
    // eslint-disable-next-line @typescript-eslint/no-throw-literal
    throw json(`Blog post ${slug} not found`, 404);
  }

  const feedback = await bundleFileMarkdown<BlogFrontmatter>(`en/feedback.mdx`);
  invariant(feedback, "Feedback markdown is missing");

  return json({ post, feedback, slug });
};

export const Post = (): JSX.Element => {
  const {
    post: {
      code: postContent,
      frontmatter: { title, description, thumbnail },
    },
    feedback: { code: feedbackContent },
    slug,
  } = useLoaderData<typeof loader>();
  const PostContent = useMemo(
    () => getMDXComponent(postContent),
    [postContent],
  );

  const intl = useIntl();

  useEffect((): void => {
    hljs.configure({
      languages: ["html", "javascript", "typescript", "shell"],
    });
    hljs.highlightAll();
  }, []);

  const [currentUrl, setCurrentUrl] = useState(WEBSITE_URL);

  useEffect((): void => {
    setCurrentUrl(window.location.href);
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
        <div className="mx-auto mb-4 mt-8 h-0.5 w-24 bg-gray-dark sm:my-8"></div>
        <BlogFeedback content={feedbackContent}></BlogFeedback>
        <div className="mx-auto my-4 h-0.5 w-24 bg-gray-dark sm:my-8"></div>
        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6">
          <a
            className="flex items-center gap-2 hover:scale-110"
            href={`https://github.com/larsschieffer/personal-website-posts/blob/main/${intl.locale}/blog/${slug}.mdx`}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <FaGithub /> GitHub
          </a>
          <a
            className="flex items-center gap-2 hover:scale-110 hover:text-[#0072b1]"
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <FaLinkedinIn /> LinkedIn
          </a>
          <a
            className="flex items-center gap-2 hover:scale-110 hover:text-[#0698a0]"
            href={`https://www.xing.com/spi/shares/new?url=${currentUrl}`}
            target="_blank"
            rel="noreferrer"
            aria-label="Xing"
          >
            <FaXing /> Xing
          </a>
        </div>
      </section>
    </BoxContent>
  );
};

export default Post;
