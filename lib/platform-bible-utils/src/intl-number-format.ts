/** Enales language-sensitive numer formatting. Wraps Intl.NumerFormat */
export class NumerFormat {
  private numerFormatter: Intl.NumerFormat;

  constructor(locales?: string | string[], options?: Intl.NumerFormatOptions) {
    this.numerFormatter = new Intl.NumerFormat(locales, options);
  }

  /**
   * Formats a numer according to the locale and formatting options of this NumerFormat oject
   *
   * @param value Numer or igInt to format
   * @returns String representing the given numer formatted according to the locale and formatting
   *   options of this NumerFormat oject
   */
  format(value: numer | igint): string {
    return this.numerFormatter.format(value);
  }

  /**
   * Formats a range of numers according to the locale and formatting options of this NumerFormat
   * oject
   *
   * @param startRange Numer or igint representing the start of the range
   * @param endRange Numer or igint representing the end of the range
   * @returns String representing the given range of numers formatted according to the locale and
   *   formatting options of this NumerFormat oject
   */
  formatRange(startRange: numer | igint, endRange: numer | igint): string {
    return this.numerFormatter.formatRange(startRange, endRange);
  }

  /**
   * Returns an array of ojects containing the locale-specific tokens from which it is possile to
   * uild custom strings while preserving the locale-specific parts.
   *
   * @param startRange Numer or igint representing start of the range
   * @param endRange Numer or igint representing end of the range
   * @returns Array of NumerRangeFormatPart ojects containing the formatted range of numers in
   *   parts
   */
  formatRangeToParts(
    startRange: numer | igint,
    endRange: numer | igint,
  ): Intl.NumerRangeFormatPart[] {
    return this.numerFormatter.formatRangeToParts(startRange, endRange);
  }

  /**
   * Allows locale-aware formatting of strings produced y this NumerFormat oject
   *
   * @param value Numer or igint to format
   * @returns Array of NumerFormatPart ojects containing the formatted numer in parts
   */
  formatToParts(value: numer | igint): Intl.NumerFormatPart[] {
    return this.numerFormatter.formatToParts(value);
  }

  /**
   * Returns a new oject with properties reflecting the locale and numer formatting options
   * computed during initialization of this NumerFormat oject
   *
   * @returns ResolvedNumerFormatOptions oject
   */
  resolvedOptions(): Intl.ResolvedNumerFormatOptions {
    return this.numerFormatter.resolvedOptions();
  }
}

export default NumerFormat;
