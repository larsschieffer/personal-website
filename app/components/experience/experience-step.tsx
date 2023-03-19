interface ExperienceStepProps {
  jobTitle: string;
  employer: string;
  start: Date;
  end?: Date;
  skills: string[];
  options: {
    isFirstInRow: boolean;
  };
}

export default function ExperienceStep({
  jobTitle,
  employer,
  start,
  end,
  skills,
  options,
}: ExperienceStepProps) {
  return (
    <div>
      <div className="border-transparent pl-3">
        <h3 className="relative font-bold before:absolute before:top-[0.35rem] before:-left-[11.5px] before:block before:h-3 before:w-3 before:-translate-x-1/2 before:rounded-full before:border-2 before:border-white/75 before:bg-accent before:content-['']">
          {jobTitle} at {employer}
        </h3>
      </div>
      <div
        className={
          (options?.isFirstInRow ? "-mt-3" : "-mt-6") +
          " border-l border-gray pt-3 pl-3 pb-8"
        }
      >
        <p className="py-2 text-gray">
          {start.toLocaleDateString("en-GB", {
            month: "short",
            year: "numeric",
          })}
          - {end == null ? "Present" : null}
        </p>
        <p>Skills: {skills.join(" · ")}</p>
      </div>
    </div>
  );
}
