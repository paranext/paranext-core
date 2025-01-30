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
function formatTimeSpan(
  relativeTimeFormatter: Intl.RelativeTimeFormat,
  since: Date,
  to = new Date(),
) {
  const spanSeconds = Math.floor((since.getTime() - to.getTime()) / MILLISECONDS_PER_SECOND);

  const totalDays = Math.round(spanSeconds / SECONDS_PER_DAY);
  if (Math.abs(totalDays) >= 1) return relativeTimeFormatter.format(totalDays, 'day');

  const totalHours = Math.round(spanSeconds / SECONDS_PER_HOUR);
  if (Math.abs(totalHours) >= 1) return relativeTimeFormatter.format(totalHours, 'hour');

  const totalMinutes = Math.round(spanSeconds / SECONDS_PER_MINUTE);
  if (Math.abs(totalMinutes) >= 1) return relativeTimeFormatter.format(totalMinutes, 'minute');

  return relativeTimeFormatter.format(spanSeconds, 'second');
}

export default formatTimeSpan;
