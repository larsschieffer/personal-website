import type { ProgressBarItem } from "~/types/progress-bar-item";
import { ProgressBar } from "./progress-bar";

export function ProgressBarColumn({
  progressBarItems,
  headline,
}: {
  progressBarItems: ProgressBarItem[];
  headline: string;
}) {
  return (
    <div>
      <h3 className="pb-2 pt-4 text-xl">{headline}</h3>
      <div className="flex flex-col gap-4">
        {progressBarItems.map(
          ({ title, percentage }: ProgressBarItem, index: number) => (
            <ProgressBar
              percentage={percentage}
              title={title}
              key={index}
            ></ProgressBar>
          )
        )}
      </div>
    </div>
  );
}
