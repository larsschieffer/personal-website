export interface ExperienceStepOptions {
  isFirstInColumn?: boolean;
  isLastInColumn?: boolean;
}
interface ExperienceStepProps {
  jobTitle: string;
  employer: string;
  start: Date;
  end?: Date;
  skills: string[];
  options: ExperienceStepOptions;
}

export default function ExperienceStep({
  jobTitle,
  employer,
  start,
  end,
  skills,
  options,
}: ExperienceStepProps) {
  function displayDate(date: Date): string {
    return date.toLocaleDateString("en-GB", {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="border-l border-gray-light">
      <div className="pl-3">
        <h3 className="relative font-bold before:absolute before:top-[0.35rem] before:-left-[12.5px] before:block before:h-3 before:w-3 before:-translate-x-1/2 before:rounded-full before:border-2 before:border-white/75 before:bg-accent before:content-['']">
          {jobTitle} at {employer}
        </h3>
      </div>
      <div className={`pl-3 ${options.isLastInColumn ? "pb-1" : "pb-6"}`}>
        <p className="py-2 text-gray">
          {displayDate(start)} - {end == null ? "Present" : displayDate(end)}
        </p>
        <p>Skills: {skills.join(" · ")}</p>
      </div>
    </div>
  );
}
