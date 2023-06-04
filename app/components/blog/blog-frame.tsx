import type { BlogFrameProps } from "~/types/blog";

export const BlogFrame = ({
  children,
  alignment = "vertical",
}: BlogFrameProps): JSX.Element => {
  return (
    <div
      className={`grid ${
        alignment === "vertical" ? "grid-flow-row grid-cols-1" : "grid-flow-col"
      } my-4 justify-center gap-2`}
    >
      {children}
    </div>
  );
};
export default BlogFrame;
