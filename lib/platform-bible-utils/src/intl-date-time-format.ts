/** Enables language-sensitive data and time formatting. Wraps Intl.DateTimeFormat */
export class DateTimeFormat {
  private dateTimeFormatter: Intl.DateTimeFormat;

  constructor(locales?: string | string[], options?: Intl.DateTimeFormatOptions) {
    this.dateTimeFormatter = new Intl.DateTimeFormat(locales, options);
  }

  /**
   * Formats a date according to the locale and formatting option for this DateTimeFormat object
   *
   * @param date The date to format
   * @returns String representing the given date formatted according to the locale and formatting
   *   options of this DateTimeFormat object
   */
  format(date: Date): string {
    return this.dateTimeFormatter.format(date);
  }

  /**
   * Formats a date range in the most concise way based on the locales and options provided when
   * instantiating this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns String representing the given date range formatted according to the locale and
   *   formatting options of this DateTimeFormat object
   */
  formatRange(startDate: Date, endDate: Date): string {
    return this.dateTimeFormatter.formatRange(startDate, endDate);
  }

  /**
   * Returns an array of locale-specific tokens representing each part of the formatted date range
   * produced by this DateTimeFormat object
   *
   * @param startDate Date object representing start of the date range
   * @param endDate Date object representing the end of the date range
   * @returns Array of DateTimeRangeFormatPart objects
   */
  formatRangeToParts(startDate: Date, endDate: Date): Intl.DateTimeRangeFormatPart[] {
    return this.dateTimeFormatter.formatRangeToParts(startDate, endDate);
  }

  /**
   * Allows locale-aware formatting of strings produced by this DateTimeFormat object
   *
   * @param date The date to format
   * @returns Array of DateTimeFormatPart objects
   */
  formatToParts(date: Date): Intl.DateTimeFormatPart[] {
    return this.dateTimeFormatter.formatToParts(date);
  }

  /**
   * Returns a new object with properties reflecting the locale and date and time formatting options
   * computed during initialization of this DateTimeFormat object
   *
   * @returns ResolvedDateTimeFormatOptions object
   */
  resolvedOptions(): Intl.ResolvedDateTimeFormatOptions {
    return this.dateTimeFormatter.resolvedOptions();
  }
}

export default DateTimeFormat;
