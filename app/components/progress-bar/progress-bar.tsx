import type { ProgressBarProps } from "~/types/progress-bar";

export const ProgressBar = ({
  title,
  percentage,
}: ProgressBarProps): JSX.Element => (
  <div className="rounded-full bg-gray-light ">
    <div
      style={{ width: `${percentage}%` }}
      className={`flex items-center justify-between rounded-full bg-accent px-4 py-1 text-xs text-white`}
    >
      <span>{title}</span>
      <span>{percentage}%</span>
    </div>
  </div>
);

export default ProgressBar;
