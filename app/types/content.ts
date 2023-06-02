import type { Education, Experience, Skill } from "@prisma/client";
import type { BlogFrontmatter } from "./blog";
import type { Markdown } from "./markdown";

export interface ContentData {
  copyright: {
    start: string;
    end: number;
  };
}

export interface ContentResumeData {
  educations: Education[];
  experiences: (Experience & {
    skills: Skill[];
  })[];
}

export interface ContentBlogPostDate {
  post: Markdown<Record<string, unknown>>;
  feedback: Markdown<Record<string, unknown>>;
}

export interface ContentBlogData {
  posts: {
    id: string;
    slug: string;
    frontmatter: BlogFrontmatter;
  }[];
}

export interface ContentAbout {
  experiences: (Experience & {
    skills: Skill[];
  })[];
  aboutMe: {
    code: string;
    frontmatter: Record<string, unknown>;
  };
}
