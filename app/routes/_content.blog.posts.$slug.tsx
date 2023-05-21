import { useLoaderData } from "@remix-run/react";

import type { LoaderArgs, V2_MetaFunction } from "@vercel/remix";
import { json } from "@vercel/remix";
import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import invariant from "tiny-invariant";
import ContentBox from "~/components/box/content-box";
import { bundleFileMarkdown } from "~/utils/markdown.server";
import { metaFunctionFactory } from "~/utils/meta";

export const meta: V2_MetaFunction = metaFunctionFactory("Blog");

export async function loader({ params }: LoaderArgs) {
  invariant(params.slug, "PostId is required");

  const mdx = await bundleFileMarkdown(`en/blog/${params.slug}.mdx`);

  return json({ mdx });
}

export default function Post() {
  const {
    mdx: { code, frontmatter },
  } = useLoaderData<typeof loader>();
  const PostContent = useMemo(() => getMDXComponent(code), [code]);

  return (
    <ContentBox headline={frontmatter.title}>
      <section>
        <PostContent />
      </section>
    </ContentBox>
  );
}
