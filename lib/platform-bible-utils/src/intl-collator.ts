/** Enables language-sensitive string comparison. Wraps Intl.Collator */
export default class Collator {
  private collator: Intl.Collator;

  constructor(locales?: string | string[], options?: Intl.CollatorOptions) {
    this.collator = new Intl.Collator(locales, options);
  }

  /**
   * Compares two strings according to the sort order of this Collator object
   *
   * @param string1 String to compare
   * @param string2 String to compare
   * @returns A number indicating how string1 and string2 compare to each other according to the
   *   sort order of this Collator object. Negative value if string1 comes before string2. Positive
   *   value if string1 comes after string2. 0 if they are considered equal.
   */
  compare(string1: string, string2: string): number {
    return this.collator.compare(string1, string2);
  }

  /**
   * Returns a new object with properties reflecting the locale and collation options computed
   * during initialization of this collator object.
   *
   * @returns ResolvedCollatorOptions object
   */
  resolvedOptions(): Intl.ResolvedCollatorOptions {
    return this.collator.resolvedOptions();
  }
}
