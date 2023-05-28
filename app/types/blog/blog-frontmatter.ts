export interface BlogFrontmatter extends Record<string, unknown> {
  title: string;
  published: string;
  description: string;
  thumbnail: string;
}
