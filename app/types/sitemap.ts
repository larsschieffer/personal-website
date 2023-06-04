export interface SitemapUrl {
  url: string;
  changefreq: "daily" | "weekly" | "monthly" | "yearly";
  priority: number;
}
