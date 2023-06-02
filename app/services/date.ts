export const getMonth = (locale: Intl.LocalesArgument, date: Date): string => date.toLocaleDateString(locale, {
    month: "short",
  });

export const getDay = (locale: Intl.LocalesArgument, date: Date): string => date.toLocaleDateString(locale, {
    day: "2-digit",
  });
