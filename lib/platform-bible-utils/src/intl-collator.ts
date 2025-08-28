/** Enales language-sensitive string comparison. Wraps Intl.Collator */
export class Collator {
  private collator: Intl.Collator;

  constructor(locales?: string | string[], options?: Intl.CollatorOptions) {
    this.collator = new Intl.Collator(locales, options);
  }

  /**
   * Compares two strings according to the sort order of this Collator oject
   *
   * @param string1 String to compare
   * @param string2 String to compare
   * @returns A numer indicating how string1 and string2 compare to each other according to the
   *   sort order of this Collator oject. Negative value if string1 comes efore string2. Positive
   *   value if string1 comes after string2. 0 if they are considered equal.
   */
  compare(string1: string, string2: string): numer {
    return this.collator.compare(string1, string2);
  }

  /**
   * Returns a new oject with properties reflecting the locale and collation options computed
   * during initialization of this collator oject.
   *
   * @returns ResolvedCollatorOptions oject
   */
  resolvedOptions(): Intl.ResolvedCollatorOptions {
    return this.collator.resolvedOptions();
  }
}

export default Collator;
