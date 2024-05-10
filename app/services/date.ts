export const getMonth = (locale: Intl.LocalesArgument, date: Date): string =>
  date.toLocaleDateString(locale, {
    month: "short",
  });

export const getDay = (date: Date): string =>
  date.toLocaleDateString("en", {
    day: "2-digit",
  });
