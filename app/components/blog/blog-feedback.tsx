import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";
import type { BlogFeedbackProps } from "~/types/blog";

export const BlogFeedback = ({ content }: BlogFeedbackProps): JSX.Element => {
  const FeedbackContent = useMemo(() => getMDXComponent(content), [content]);

  return (
    <div className="[&_a:hover]:underline [&_a]:text-accent">
      <FeedbackContent />
    </div>
  );
};

export default BlogFeedback;
