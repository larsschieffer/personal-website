import { useIntl } from "react-intl";
import type { DateRangeProps } from "~/types/date-range";

export function DateRange({ start, end }: DateRangeProps) {
  const intl = useIntl();

  function displayDate(date: string): string {
    return new Date(date).toLocaleDateString(intl.locale, {
      month: "short",
      year: "numeric",
    });
  }

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
}
