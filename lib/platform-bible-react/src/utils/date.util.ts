/**
 * Formats a date relative to today, showing "Today" or "Yesterday" when applicable, otherwise
 * returns the date in the specified format
 *
 * @param date The date to format
 * @param locale The locale to use for date formatting (defaults to user's locale)
 * @param options The Intl.DateTimeFormatOptions to use for date formatting when not today/yesterday
 */
export function formatRelativeDate(
  date: Date,
  todayString: string,
  yesterdayString: string,
  locale?: string,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  },
): string {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  const isToday =
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear();

  const isYesterday =
    date.getDate() === yesterday.getDate() &&
    date.getMonth() === yesterday.getMonth() &&
    date.getFullYear() === yesterday.getFullYear();

  if (isToday) {
    return todayString;
  }
  if (isYesterday) {
    return yesterdayString;
  }

  return date.toLocaleString(locale, options);
}
