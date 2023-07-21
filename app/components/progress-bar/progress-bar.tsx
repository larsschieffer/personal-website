import type { ProgressBarProps } from "~/types/progress-bar";

export const ProgressBar = ({
  title,
  percentage,
}: ProgressBarProps): JSX.Element => (
  <div className="rounded-full bg-gray-light ">
    <div
      data-testid="progress-bar"
      style={{ width: `${Math.min(Math.max(percentage, 0), 100)}%` }}
      className={`flex items-center justify-between rounded-full bg-accent px-4 py-1 text-xs text-white`}
    >
      <span>{title}</span>
      {percentage >= 0 && percentage <= 100 ? <span>{percentage}%</span> : null}
    </div>
  </div>
);

export default ProgressBar;
