export interface BlogFeedbackProps {
  content: string;
}

export interface BlogFrontmatter extends Record<string, unknown> {
  title: string;
  published: string;
  description: string;
  thumbnail: string;
}

export interface BlogPostThumbnailProps {
  slug: string;
  frontMatter: BlogFrontmatter;
}

export interface PostThumbnailType {
  id: string;
  slug: string;
  frontmatter: BlogFrontmatter;
}
