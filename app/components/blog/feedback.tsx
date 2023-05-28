import { getMDXComponent } from "mdx-bundler/client";
import { useMemo } from "react";

export default function Feedback({ content }: { content: string }) {
  const FeedbackContent = useMemo(() => getMDXComponent(content), [content]);

  return (
    <div className="[&_a:hover]:underline [&_a]:text-accent">
      <FeedbackContent />
    </div>
  );
}
