import type { Message } from "esbuild";
import type grayMatter from "gray-matter";

export interface Markdown<T extends Record<string, unknown>> {
  code: string;
  frontmatter: T;
  errors: Message[];
  matter: Omit<grayMatter.GrayMatterFile<string>, "data"> & {
    data: T;
  };
}
