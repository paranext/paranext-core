const MILLISECONDS_PER_SECOND = 1000;
const SECONDS_PER_MINUTE = 60;
const SECONDS_PER_HOUR = SECONDS_PER_MINUTE * 60;
const SECONDS_PER_DAY = SECONDS_PER_HOUR * 24;

/**
 * Get a localized string representation of the time between two dates
 *
 * @example
 *
 * `since` = 3 Aug 2024 8:00 AM
 *
 * `to` = 5 Aug 2024 8:000 AM
 *
 * Returns: "two days ago"
 *
 * @param since "Destination" time. time against which to get the time span.
 * @param to "Starting" time. Time span will be formatted relative to `to`. Defaults to `new Date()`
 * @returns Time span in words from `to` to `since`
 */
export function formatTimeSpan(
  relativeTimeFormatter: Intl.RelativeTimeFormat,
  since: Date,
  to = new Date(),
) {
  if (Number.isNaN(since.valueOf())) return '';

  const spanSeconds = Math.floor((since.getTime() - to.getTime()) / MILLISECONDS_PER_SECOND);

  const totalDays = Math.round(spanSeconds / SECONDS_PER_DAY);
  if (Math.abs(totalDays) >= 1) return relativeTimeFormatter.format(totalDays, 'day');

  const totalHours = Math.round(spanSeconds / SECONDS_PER_HOUR);
  if (Math.abs(totalHours) >= 1) return relativeTimeFormatter.format(totalHours, 'hour');

  const totalMinutes = Math.round(spanSeconds / SECONDS_PER_MINUTE);
  if (Math.abs(totalMinutes) >= 1) return relativeTimeFormatter.format(totalMinutes, 'minute');

  return relativeTimeFormatter.format(spanSeconds, 'second');
}

/**
 * Formats a date relative to today, showing "Today" or "Yesterday" when applicable, otherwise
 * returns the date in the specified format
 *
 * @param date The date to format
 * @param todayString The string to display when the date is today
 * @param yesterdayString The string to display when the date is yesterday
 * @param locale The locale to use for date formatting (defaults to user's locale)
 * @param options The Intl.DateTimeFormatOptions to use for date formatting when not
 *   today/yesterday. Defaults to `{ year: 'numeric', month: 'short', day: 'numeric' }` which
 *   produces formats like "Nov 9, 2025"
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
