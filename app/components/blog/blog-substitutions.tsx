import type { BlogFrameProps } from "~/types/blog";
import { BlogFrame } from "./blog-frame";
import { BlogImage } from "./blog-image";

const ImageFrame = (props: BlogFrameProps): JSX.Element => (
  <BlogFrame {...props} />
);

const code = (props: React.HTMLAttributes<HTMLElement>): JSX.Element => (
  <code {...props} className="overflow-x-auto !bg-gray-light px-0.5" />
);

const pre = (props: React.HTMLAttributes<HTMLPreElement>): JSX.Element => (
  <pre
    {...props}
    className="grid [&>code]:mt-4 [&>code]:rounded-md [&>code]:p-4"
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
    className="mt-4 list-outside list-disc [&_li]:first-letter:uppercase"
  />
);

const h3 = (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
  <h3 {...props} className="mb-1 mt-4 text-lg font-semibold capitalize">
    {props.children}
  </h3>
);

const h2 = (props: React.HTMLAttributes<HTMLHeadingElement>): JSX.Element => (
  <h2 {...props} className="mb-1 mt-6 text-2xl font-semibold capitalize">
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
