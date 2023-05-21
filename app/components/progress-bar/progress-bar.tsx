import type { ProgressBarItem } from "~/types/progress-bar-item";

export function ProgressBar({ title, percentage }: ProgressBarItem) {
  return (
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
}
