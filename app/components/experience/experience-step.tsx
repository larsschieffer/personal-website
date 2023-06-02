import { useIntl } from "react-intl";
import type { StepProps } from "~/types/experience";
import { DateRange } from "../date-range";

export const ExperienceStep = ({
  data: { title, organisation, start, end, description },
  options,
}: StepProps): JSX.Element => {
  const intl = useIntl();

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
          <DateRange start={start} end={end}></DateRange>
        </p>
        {description ? <p>{description}</p> : null}
      </div>
    </div>
  );
};

export default ExperienceStep;
