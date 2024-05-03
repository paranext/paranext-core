/** Enables language-sensitive number formatting. Wraps Intl.NumberFormat */
export default class NumberFormat {
  private numberFormatter: Intl.NumberFormat;

  constructor(locales?: string | string[], options?: Intl.NumberFormatOptions) {
    this.numberFormatter = new Intl.NumberFormat(locales, options);
  }

  /**
   * Formats a number according to the locale and formatting options of this NumberFormat object
   *
   * @param value Number or BigInt to format
   * @returns String representing the given number formatted according to the locale and formatting
   *   options of this NumberFormat object
   */
  format(value: number | bigint): string {
    return this.numberFormatter.format(value);
  }

  /**
   * Formats a range of numbers according to the locale and formatting options of this NumberFormat
   * object
   *
   * @param startRange Number or bigint representing the start of the range
   * @param endRange Number or bigint representing the end of the range
   * @returns String representing the given range of numbers formatted according to the locale and
   *   formatting options of this NumberFormat object
   */
  formatRange(startRange: number | bigint, endRange: number | bigint): string {
    return this.numberFormatter.formatRange(startRange, endRange);
  }

  /**
   * Returns an array of objects containing the locale-specific tokens from which it is possible to
   * build custom strings while preserving the locale-specific parts.
   *
   * @param startRange Number or bigint representing start of the range
   * @param endRange Number or bigint representing end of the range
   * @returns Array of NumberRangeFormatPart objects containing the formatted range of numbers in
   *   parts
   */
  formatRangeToParts(
    startRange: number | bigint,
    endRange: number | bigint,
  ): Intl.NumberRangeFormatPart[] {
    return this.numberFormatter.formatRangeToParts(startRange, endRange);
  }

  /**
   * Allows locale-aware formatting of strings produced by this NumberFormat object
   *
   * @param value Number or bigint to format
   * @returns Array of NumberFormatPart objects containing the formatted number in parts
   */
  formatToParts(value: number | bigint): Intl.NumberFormatPart[] {
    return this.numberFormatter.formatToParts(value);
  }

  /**
   * Returns a new object with properties reflecting the locale and number formatting options
   * computed during initialization of this NumberFormat object
   *
   * @returns ResolvedNumberFormatOptions object
   */
  resolvedOptions(): Intl.ResolvedNumberFormatOptions {
    return this.numberFormatter.resolvedOptions();
  }
}
