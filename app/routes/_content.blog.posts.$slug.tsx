import { useLoaderData } from "@remix-run/react";

import type { LinksFunction, LoaderArgs, V2_MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import hljs from "highlight.js";
import highlightjs from "highlight.js/styles/github.css";
import { getMDXComponent } from "mdx-bundler/client";
import type { PropsWithChildren } from "react";
import { useEffect, useMemo } from "react";
import invariant from "tiny-invariant";
import Feedback from "~/components/blog/feedback";
import ContentBox from "~/components/box/content-box";
import type { BlogFrontmatter } from "~/types/blog/blog-frontmatter";
import { bundleFileMarkdown } from "~/utils/markdown.server";
import { metaFunctionFactory } from "~/utils/meta";

export const links: LinksFunction = () => [
  { rel: "stylesheet", href: highlightjs },
];

const substitutions = {
  h2: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h2 {...props} className="mt-6 font-semibold text-2xl capitalize mb-1" />
  ),
  h3: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLHeadingElement>,
      HTMLHeadingElement
    >
  ) => (
    // eslint-disable-next-line jsx-a11y/heading-has-content
    <h3 {...props} className="mt-4 font-semibold text-lg capitalize mb-1" />
  ),
  ul: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLUListElement>,
      HTMLUListElement
    >
  ) => (
    <ul
      {...props}
      className="list-disc list-outside mt-4 [&_li]:first-letter:uppercase"
    />
  ),
  a: (
    props: React.DetailedHTMLProps<
      React.AnchorHTMLAttributes<HTMLAnchorElement>,
      HTMLAnchorElement
    >
    // eslint-disable-next-line jsx-a11y/anchor-has-content
  ) => <a {...props} className="text-accent hover:underline" target="_blank" />,
  pre: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLPreElement>,
      HTMLPreElement
    >
  ) => (
    <pre
      {...props}
      className="grid [&>code]:p-4 [&>code]:mt-4 [&>code]:rounded-md"
    ></pre>
  ),
  code: (
    props: React.DetailedHTMLProps<
      React.HTMLAttributes<HTMLElement>,
      HTMLElement
    >
  ) => (
    <code {...props} className="!bg-gray-light px-0.5 overflow-x-auto"></code>
  ),
  ImageFrame: function ImageFrame({
    children,
    alignment = "vertical",
  }: PropsWithChildren<{
    alignment: "vertical" | "horizontal";
  }>) {
    return (
      <div
        className={`grid ${
          alignment === "vertical"
            ? "grid-flow-row grid-cols-1"
            : "grid-flow-col"
        } gap-2 my-4 justify-center`}
      >
        {children}
      </div>
    );
  },
  BlogImage: function BlogImage({ src, alt }: { src: string; alt: string }) {
    return <img src={src} alt={alt} className="object-fit w-full" />;
  },
};

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

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, "PostId is required");

  const post = await bundleFileMarkdown(`en/blog/${params.slug}.mdx`);
  const feedback = await bundleFileMarkdown(`en/feedback.mdx`);

  return json({ post, feedback });
}

export default function Post() {
  const {
    post: { code: postContent, frontmatter },
    feedback: { code: feedbackContent },
  } = useLoaderData<typeof loader>();
  const PostContent = useMemo(
    () => getMDXComponent(postContent),
    [postContent]
  );

  useEffect(() => {
    hljs.highlightAll();
  }, []);

  return (
    <ContentBox headline={frontmatter.title} options={{ position: "center" }}>
      <section className="[&>*:last-child]:mb-0 xs:mx-6 sm:mx-0 lg:mx-8 text-justify [&_table_tr:nth-child(even)]:bg-gray-lighter [&_table_tr:nth-child(odd)]:bg-gray-light  [&_table]:table-auto [&_table]:w-full [&_table]:my-4 [&_table_tr_th:not(:first-child)]:text-center [&_table_tr_td:not(:first-child)]:text-center [&_table_tr_td]:p-1 [&_table_tr_th]:p-1">
        <PostContent components={substitutions} />
        <div className="h-0.5 bg-gray-dark w-24 mx-auto my-8"></div>
        <Feedback content={feedbackContent}></Feedback>
      </section>
    </ContentBox>
  );
}
