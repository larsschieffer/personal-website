import { FormattedMessage, useIntl } from "react-intl";

export interface StepOptions {
  isFirstInColumn?: boolean;
  isLastInColumn?: boolean;
}

export interface StepData {
  title: string;
  organisation: string | null;
  start: string;
  end: string | null;
  description: string | null;
}

interface StepProps {
  data: StepData;
  options: StepOptions;
}

export default function Step({
  data: { title, organisation, start, end, description },
  options,
}: StepProps) {
  const intl = useIntl();

  function displayDate(date: string): string {
    return new Date(date).toLocaleDateString(intl.locale, {
      month: "short",
      year: "numeric",
    });
  }

  return (
    <div className="border-l border-gray-light">
      <div className="pl-3">
        <h3 className="relative font-bold before:absolute before:-left-[12.5px] before:top-[0.35rem] before:block before:h-3 before:w-3 before:-translate-x-1/2 before:rounded-full before:border-2 before:border-white/75 before:bg-accent before:content-['']">
          {`${title}${
            organisation
              ? ` ${intl.formatMessage({ id: "at" })} ${organisation}`
              : ""
          }`}
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
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
}
