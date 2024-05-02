/**
 * Retrieves the current locale of the user's environment.
 *
 * @returns A string representing the current locale. If the locale cannot be determined, the
 *   function returns an empty string.
 */
export function getCurrentLocale(): string {
  // Use navigator when available
  if (typeof navigator !== 'undefined' && navigator.languages) {
    return navigator.languages[0];
  }
  // For Node.js
  return Intl.DateTimeFormat().resolvedOptions().locale;
}

/**
 * Compares two strings using an ordinal comparison approach based on the specified collation
 * options. This function uses the built-in `localeCompare` method with the 'en' locale and the
 * provided collation options to compare the strings.
 *
 * @param string1 The first string to compare.
 * @param string2 The second string to compare.
 * @param options Optional. The collation options used for comparison.
 * @returns A number indicating the result of the comparison: - Negative value if string1 precedes
 *   string2 in sorting order. - Zero if string1 and string2 are equivalent in sorting order. -
 *   Positive value if string1 follows string2 in sorting order.
 */
export function ordinalCompare(
  string1: string,
  string2: string,
  options?: Intl.CollatorOptions,
): number {
  return string1.localeCompare(string2, 'en', options);
}
