import type { BlogFrameProps } from "~/types/blog";
import { BlogFrame } from "./blog-frame";
import { BlogImage } from "./blog-image";

const ImageFrame = (props: BlogFrameProps): JSX.Element => (
  <BlogFrame {...props} />
);

const code = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => (
  <code {...props} className="!bg-gray-light px-0.5 overflow-x-auto" />
);

const pre = (props: React.HTMLAttributes<HTMLPreElement>): JSX.Element => (
  <pre
    {...props}
    className="grid [&>code]:p-4 [&>code]:mt-4 [&>code]:rounded-md"
  ></pre>
);

const a = (
  props: React.AnchorHTMLAttributes<HTMLAnchorElement>
): JSX.Element => (
  <a {...props} className="text-accent hover:underline" target="_blank">
    {props.children}
  </a>
);

const ul = (props: React.HTMLAttributes<HTMLUListElement>): JSX.Element => (
  <ul
    {...props}
    className="list-disc list-outside mt-4 [&_li]:first-letter:uppercase"
  />
);

const h3 = (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
  <h3 {...props} className="mt-4 font-semibold text-lg capitalize mb-1">
    {props.children}
  </h3>
);

const h2 = (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
  <h2 {...props} className="mt-6 font-semibold text-2xl capitalize mb-1">
    {props.children}
  </h2>
);

export const blogSubstitutionComponents = {
  h2,
  h3,
  ul,
  a,
  pre,
  code,
  ImageFrame,
  BlogImage,
};
