import { useIntl } from "react-intl";
import type { DateRangeProps } from "~/types/date-range";

export const DateRange = ({ start, end }: DateRangeProps): JSX.Element => {
  const intl = useIntl();

  const displayDate = (date: string): string =>
    new Date(date).toLocaleDateString(intl.locale, {
      month: "short",
      year: "numeric",
    });

  const visibleStartDate = displayDate(start);
  const visibleEndDate =
    end == null ? intl.formatMessage({ id: "time.present" }) : displayDate(end);

  return (
    <span>
      {visibleStartDate == visibleEndDate
        ? visibleStartDate
        : `${visibleStartDate} - ${visibleEndDate}`}
    </span>
  );
};

export default DateRange;
