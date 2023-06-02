export function getMonth(locale: Intl.LocalesArgument, date: Date) {
  return date.toLocaleDateString(locale, {
    month: "short",
  });
}

export function getDay(locale: Intl.LocalesArgument, date: Date) {
  return date.toLocaleDateString(locale, {
    day: "2-digit",
  });
}
