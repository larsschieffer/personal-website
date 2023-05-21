import type { BlogFrontmatter } from "./blog-frontmatter";

export interface PostThumbnailType {
  id: string;
  slug: string;
  frontmatter: BlogFrontmatter;
}
