import { useIntl } from "react-intl";

export function StepDate({
  start,
  end,
}: {
  start: string;
  end: string | null;
}) {
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
