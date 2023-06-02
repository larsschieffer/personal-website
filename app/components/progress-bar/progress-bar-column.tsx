import type {
  ProgressBarColumnProps,
  ProgressBarProps,
} from "~/types/progress-bar";
import { ProgressBar } from "./progress-bar";

export function ProgressBarColumn({
  progressBarItems,
  headline,
}: ProgressBarColumnProps): JSX.Element {
  return (
    <div>
      <h3 className="pb-2 pt-4 text-xl">{headline}</h3>
      <div className="flex flex-col gap-4">
        {progressBarItems.map(
          ({ title, percentage }: ProgressBarProps, index: number) => (
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
