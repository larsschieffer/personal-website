import { WEBSITE_PATHS, WEBSITE_URL } from "~/constants/sitemap";
import { getMetaDataOfFilesAtPath } from "~/services/server/github-api.server";
import type { SitemapUrl } from "~/types/sitemap";

const createLocation = ({ url, changefreq, priority }: SitemapUrl): string => {
  return `<url>
  <loc>${WEBSITE_URL}${url}</loc>
  <changefreq>${changefreq}</changefreq>
  <priority>${priority}</priority>
  </url>`;
};

export const loader = async (): Promise<Response> => {
  const posts = await getMetaDataOfFilesAtPath("en/blog");

  const staticPages = WEBSITE_PATHS.map((url: SitemapUrl): string =>
    createLocation(url),
  ).join("");

  const dynamicPages = posts
    .map(({ name }: { name: string }): string =>
      createLocation({
        url: `blog/posts/${name.replace(".mdx", "")}`,
        changefreq: "weekly",
        priority: 0.7,
      }),
    )
    .join("");

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${staticPages}
  ${dynamicPages}
  </urlset>`;

  return new Response(sitemap, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "x-content-type-options": "nosniff",
      "Cache-Control": `public, max-age=${60 * 10}, s-maxage=${60 * 60 * 24}`,
    },
  });
};
