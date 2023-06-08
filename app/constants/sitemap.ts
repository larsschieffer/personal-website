import type { SitemapUrl } from "~/types/sitemap";

export const DOMAINE = "larsschieffer.de";
export const WEBSITE_URL = `https://${DOMAINE}/`;
export const WEBSITE_PATHS: SitemapUrl[] = [
  { url: "about", changefreq: "yearly", priority: 0.5 },
  { url: "resume", changefreq: "monthly", priority: 0.5 },
  { url: "blog", changefreq: "weekly", priority: 0.8 },
];
