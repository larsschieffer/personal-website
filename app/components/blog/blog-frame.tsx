import type { BlogFrameProps } from "~/types/blog";

export default function BlogFrame({
  children,
  alignment = "vertical",
}: BlogFrameProps): JSX.Element {
  return (
    <div
      className={`grid ${
        alignment === "vertical" ? "grid-flow-row grid-cols-1" : "grid-flow-col"
      } gap-2 my-4 justify-center`}
    >
      {children}
    </div>
  );
}
