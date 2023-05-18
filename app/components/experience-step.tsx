import { FormattedMessage, useIntl } from "react-intl";

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
  const intl = useIntl();

  function displayDate(date: Date): string {
    return date.toLocaleDateString(intl.locale, {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="border-l border-gray-light">
      <div className="pl-3">
        <h3 className="relative font-bold before:absolute before:-left-[12.5px] before:top-[0.35rem] before:block before:h-3 before:w-3 before:-translate-x-1/2 before:rounded-full before:border-2 before:border-white/75 before:bg-accent before:content-['']">
          {jobTitle} <FormattedMessage id="at"></FormattedMessage> {employer}
        </h3>
      </div>
      <div className={`pl-3 ${options.isLastInColumn ? "pb-1" : "pb-6"}`}>
        <p className="py-2 text-gray">
          {displayDate(start)} -{" "}
          {end == null ? (
            <FormattedMessage id="time.present"></FormattedMessage>
          ) : (
            displayDate(end)
          )}
        </p>
        <p>Skills: {skills.join(" · ")}</p>
      </div>
    </div>
  );
}
