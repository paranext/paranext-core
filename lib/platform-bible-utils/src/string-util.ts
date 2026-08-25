import { ensureArray } from './array-util';
import { LocalizeKey } from './extension-contributions/menus.model';
import { GraphemeString } from './grapheme-string-util';

/*
 * The functions below are thin wrappers over `GraphemeString`. Each mirrors the same-named method on
 * the JavaScript `String` object — including its behavior for negative, fractional, `NaN`, and
 * out-of-range arguments — but counts and indexes by Unicode grapheme cluster (what a reader would
 * call a character) rather than by UTF-16 code unit.
 *
 * Each one segments its input on every call, because a bare string is all it is given. Doing more
 * than one operation on the same string? Construct a single `GraphemeString` and call its methods:
 * segmentation then happens once instead of once per call, and derived values (`slice`, `substring`,
 * `split`, the padding methods) carry the parent's segmentation rather than recomputing it.
 *
 *     // Instead of this:
 *     const start = indexOf(text, '{');
 *     const end = indexOf(text, '}');
 *     const key = substring(text, start + 1, end);
 *
 *     // Prefer this:
 *     const graphemeText = new GraphemeString(text);
 *     const start = graphemeText.indexOf('{');
 *     const end = graphemeText.indexOf('}');
 *     const key = graphemeText.substring(start + 1, end).string;
 */

/**
 * This function mirrors the `at` function from the JavaScript Standard String object. It operates
 * on grapheme clusters instead of UTF-16 code units.
 *
 * Finds the grapheme cluster at the given index.
 *
 * @param string String to index
 * @param index Position of the grapheme cluster to return. Negative values count back from the end
 * @returns The grapheme cluster at the given index, or `undefined` if the index is out of bounds
 */
export function at(string: string, index: number): string | undefined {
  return new GraphemeString(string).at(index);
}

/**
 * This function mirrors the `charAt` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Returns the single grapheme cluster at the given index.
 *
 * @param string String to index
 * @param index Position of the grapheme cluster to return. Unlike {@link at}, a negative index is
 *   out of bounds rather than counted from the end
 * @returns The grapheme cluster at the given index, or an empty string if the index is out of
 *   bounds
 */
export function charAt(string: string, index: number): string {
  return new GraphemeString(string).charAt(index);
}

/**
 * This function mirrors the `codePointAt` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Returns the Unicode code point value of the grapheme cluster at the given index. For a cluster
 * built from several code points, this is the first code point only.
 *
 * @param string String to index
 * @param index Position of the grapheme cluster to read, in the range 0 to `stringLength(string)-1`
 * @returns The code point value, or `undefined` if the index is out of bounds
 */
export function codePointAt(string: string, index: number): number | undefined {
  return new GraphemeString(string).codePointAt(index);
}

/**
 * This function mirrors the `endsWith` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Determines whether a string ends with the characters of another string.
 *
 * @param string String to search through
 * @param searchString Characters to search for at the end of the string
 * @param endPosition End position where searchString is expected to be found. Default is
 *   `stringLength(string)`
 * @returns True if it ends with searchString, false if it does not
 */
export function endsWith(string: string, searchString: string, endPosition?: number): boolean {
  return new GraphemeString(string).endsWith(searchString, endPosition);
}

/**
 * This function mirrors the `includes` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Performs a case-sensitive search to determine if searchString is found in string.
 *
 * @param string String to search through
 * @param searchString String to search for
 * @param position Position within the string to start searching. Negative values clamp to `0`.
 *   Default is `0`
 * @returns True if the search string is found, false if it is not
 */
export function includes(string: string, searchString: string, position?: number): boolean {
  return new GraphemeString(string).includes(searchString, position);
}

/**
 * This function mirrors the `indexOf` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Returns the index of the first occurrence of a given string, or -1 if it is not found. Only an
 * occurrence that begins and ends on a grapheme cluster boundary counts as a match.
 *
 * @param string String to search through
 * @param searchString The string to search for
 * @param position Where to start searching. Negative values clamp to `0`. Default is `0`
 * @returns Index of the first occurrence of the given string, or -1
 */
export function indexOf(string: string, searchString: string, position?: number): number {
  return new GraphemeString(string).indexOf(searchString, position);
}

/**
 * This function mirrors the `lastIndexOf` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Returns the index of the last occurrence of the specified substring, or -1 if it is not found.
 *
 * @param string String to search through
 * @param searchString Substring to search for
 * @param position The index at or before which the occurrence must begin. If omitted, the whole
 *   string is searched. Negative values clamp to `0`
 * @returns Index of the last occurrence of searchString, or -1 if not found
 */
export function lastIndexOf(string: string, searchString: string, position?: number): number {
  return new GraphemeString(string).lastIndexOf(searchString, position);
}

/**
 * This function mirrors the `length` property from the JavaScript Standard String object. It counts
 * grapheme clusters instead of UTF-16 code units. Since `length` appears to be a reserved keyword,
 * the function was renamed to `stringLength`.
 *
 * @param string String to return the length for
 * @returns Number of grapheme clusters in the string
 */
export function stringLength(string: string): number {
  return new GraphemeString(string).length;
}

/**
 * This function mirrors the `normalize` function from the JavaScript Standard String object, with
 * one addition: `'none'` returns the string unchanged, where native throws a `RangeError`.
 *
 * Note this deliberately does not go through {@link GraphemeString}: normalization reads the whole
 * string and never needs it segmented, so routing it through the class would add segmentation cost
 * for no benefit.
 *
 * @param string The starting string
 * @param form Form specifying the Unicode Normalization Form, or `'none'` to return the string
 *   as-is
 * @returns A string containing the Unicode Normalization Form of the given string
 */
export function normalize(string: string, form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD' | 'none'): string {
  // The declared parameter type is upper case, but this has always tolerated any casing at runtime.
  const upperCaseForm = form.toUpperCase();
  if (upperCaseForm === 'NONE') {
    return string;
  }
  return string.normalize(upperCaseForm);
}

/**
 * Compares two strings using an ordinal comparison approach based on the specified collation
 * options. This function uses the built-in `localeCompare` method with the 'en' locale and the
 * provided collation options to compare the strings.
 *
 * Note this deliberately does not go through {@link GraphemeString}: collation reads the whole
 * string and never needs it segmented, so routing it through the class would add segmentation cost
 * for no benefit.
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

/**
 * This function mirrors the `padEnd` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Pads the string with another string (multiple times, if needed) until the result is
 * `targetLength` grapheme clusters long. The padding is applied at the end.
 *
 * @param string String to add padding to
 * @param targetLength Length of the result, in grapheme clusters. If it is less than or equal to
 *   `stringLength(string)`, the string is returned as is
 * @param padString The string to pad with, truncated to fit `targetLength`. Default is `" "`
 * @returns String with the appropriate padding at the end
 */
export function padEnd(string: string, targetLength: number, padString?: string): string {
  return new GraphemeString(string).padEnd(targetLength, padString).string;
}

/**
 * This function mirrors the `padStart` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Pads the string with another string (multiple times, if needed) until the result is
 * `targetLength` grapheme clusters long. The padding is applied at the start.
 *
 * @param string String to add padding to
 * @param targetLength Length of the result, in grapheme clusters. If it is less than or equal to
 *   `stringLength(string)`, the string is returned as is
 * @param padString The string to pad with, truncated to fit `targetLength`. Default is `" "`
 * @returns String with the appropriate padding at the start
 */
export function padStart(string: string, targetLength: number, padString?: string): string {
  return new GraphemeString(string).padStart(targetLength, padString).string;
}

/**
 * This function mirrors the `slice` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Extracts a section of the string and returns it as a new string, without modifying the original.
 *
 * @param string The starting string
 * @param indexStart The index of the first grapheme cluster to include. Negative values count back
 *   from the end
 * @param indexEnd The index of the first grapheme cluster to exclude. Negative values count back
 *   from the end. A range that ends before it starts yields an empty string
 * @returns A new string containing the extracted section of the string
 */
export function slice(string: string, indexStart: number, indexEnd?: number): string {
  return new GraphemeString(string).slice(indexStart, indexEnd).string;
}

/**
 * This function mirrors the `split` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Divides the string into an ordered list of substrings by searching for a pattern, and returns
 * them as an array.
 *
 * @param string The string to split
 * @param separator The pattern describing where each split should occur. An empty string splits
 *   into individual grapheme clusters
 * @param splitLimit Maximum number of substrings to return. As in native, anything past the limit
 *   is discarded, and the limit is converted with `ToUint32` — so `-1` means "no limit" while `NaN`
 *   and `Infinity` yield an empty array
 * @returns An array of strings, split at each point where separator occurs in the starting string
 */
export function split(string: string, separator: string | RegExp, splitLimit?: number): string[] {
  const parts = new GraphemeString(string).split(separator, splitLimit).map((part) => part?.string);
  // A capture group that did not participate in the match yields `undefined`, exactly as native
  // `String.prototype.split` does at runtime — and, as in native's own type declaration, that is not
  // reflected in the `string[]` return type. Only a capturing regular expression separator can
  // produce one, so widening this signature would break every existing caller's types for a case
  // none of them hit.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  return parts as string[];
}

/**
 * This function mirrors the `startsWith` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Determines whether the string begins with the characters of a specified string.
 *
 * @param string String to search through
 * @param searchString The characters to search for at the start of the string
 * @param position The position at which searchString is expected to begin. Negative values clamp to
 *   `0`. Default is `0`
 * @returns True if the given characters are found at the beginning of the string, including when
 *   searchString is an empty string; otherwise, false
 */
export function startsWith(string: string, searchString: string, position?: number): boolean {
  return new GraphemeString(string).startsWith(searchString, position);
}

/**
 * This function mirrors the `substring` function from the JavaScript Standard String object. It
 * operates on grapheme clusters instead of UTF-16 code units.
 *
 * Returns the part of the string between a start and an end index.
 *
 * @param string String to be divided
 * @param begin Start position. Negative values clamp to `0` rather than counting from the end
 * @param end End position. Default is the end of the string. As in native, the two arguments are
 *   swapped when `begin` is greater than `end`
 * @returns Substring from the starting string
 */
export function substring(string: string, begin: number, end?: number): string {
  return new GraphemeString(string).substring(begin, end).string;
}

/**
 * Converts a string to an array of its grapheme clusters. Mirrors spreading a native string, except
 * that native yields code points rather than grapheme clusters.
 *
 * @param string String to convert to an array
 * @returns An array of the string's grapheme clusters
 */
export function toArray(string: string): string[] {
  return new GraphemeString(string).toArray();
}

/**
 * Replaces each `{key}` in `str` with `replacers[key]`, and unescapes `\{`/`\}`. An unknown key is
 * replaced by the key text itself. Adjacent strings are concatenated into one array entry, so a
 * replacer that is not a string stays its own entry — which is how a React element survives being
 * substituted into a localized template.
 *
 * @param str String containing `{key}` placeholders
 * @param replacers Object whose keys are placeholder names and whose values are the replacements
 * @returns Array of the string's pieces interleaved with the replacements
 */
export function formatReplacementStringToArray<T = unknown>(
  str: string,
  replacers: { [key: string | number]: T } | object,
): (string | T)[] {
  return new GraphemeString(str).formatReplacementToArray(replacers);
}

/**
 * Replaces each `{key}` in `str` with `replacers[key]`, coerces every part to a string, and joins
 * them. See {@link formatReplacementStringToArray} to keep non-string replacers intact.
 *
 * @param str String containing `{key}` placeholders
 * @param replacers Object whose keys are placeholder names and whose values are the replacements
 * @returns The formatted string
 */
export function formatReplacementString(
  str: string,
  replacers: { [key: string | number]: string | unknown } | object,
): string {
  return new GraphemeString(str).formatReplacement(replacers);
}

/** Determine whether the string is a `LocalizeKey` meant to be localized in Platform.Bible. */
export function isLocalizeKey(str: string): str is LocalizeKey {
  // Two operations on one string, so segment it once rather than once per call.
  const graphemeString = new GraphemeString(str);
  return graphemeString.startsWith('%') && graphemeString.endsWith('%');
}

/**
 * Escape RegExp special characters.
 *
 * You can also use this to escape a string that is inserted into the middle of a regex, for
 * example, into a character class.
 *
 * All credit to [`escape-string-regexp`](https://www.npmjs.com/package/escape-string-regexp) - this
 * function is simply copied directly from there to allow a common js export
 *
 * @example
 *
 *     import escapeStringRegexp from 'platform-bible-utils';
 *
 *     const escapedString = escapeStringRegexp('How much $ for a 🦄?');
 *     //=> 'How much \\$ for a 🦄\\?'
 *
 *     new RegExp(escapedString);
 */
export function escapeStringRegexp(string: string): string {
  if (typeof string !== 'string') {
    throw new TypeError('Expected a string');
  }

  // Escape characters with special meaning either inside or outside character sets.
  // Use a simple backslash escape when it’s always valid, and a `\xnn` escape when the simpler form would be disallowed by Unicode patterns’ stricter grammar.
  return string.replace(/[|\\{}()[\]^$+*?.]/g, '\\$&').replace(/-/g, '\\x2d');
}

/**
 * Transforms a string or an array of strings into an array of regular expressions, ensuring that
 * the result is always an array.
 *
 * This function accepts a value that may be a single string, an array of strings, or `undefined`.
 * It then:
 *
 * - Converts each string into a `RegExp` object.
 * - If the input is an array containing nested arrays, it converts each string in the nested arrays
 *   into `RegExp` objects.
 * - Ensures that the result is always an array of `RegExp` objects or arrays of `RegExp` objects.
 *
 * @param stringStringMaybeArray - The value to be transformed, which can be a single string, an
 *   array of strings or arrays of strings, or `undefined`.
 * @returns An array of `RegExp` objects or arrays of `RegExp` objects. If the input is `undefined`,
 *   an empty array is returned.
 */
export function transformAndEnsureRegExpRegExpArray(
  stringStringMaybeArray: string | (string | string[])[] | undefined,
): (RegExp | RegExp[])[] {
  if (!stringStringMaybeArray) return [];

  const stringStringArray = ensureArray(stringStringMaybeArray);

  const regExpRegExpArray = stringStringArray.map((stringMaybeStringArray: string | string[]) =>
    Array.isArray(stringMaybeStringArray)
      ? stringMaybeStringArray.map((str) => new RegExp(str))
      : new RegExp(stringMaybeStringArray),
  );

  return regExpRegExpArray;
}

/**
 * Transforms a string or an array of strings into an array of regular expressions.
 *
 * This function accepts a value that may be a single string, an array of strings, or `undefined`.
 * It then:
 *
 * - Converts each string into a `RegExp` object.
 * - Ensures that the result is always an array of `RegExp` objects.
 *
 * @param stringMaybeArray - The value to be transformed, which can be a single string, an array of
 *   strings, or `undefined`.
 * @returns An array of `RegExp` objects. If the input is `undefined`, an empty array is returned.
 */
export function transformAndEnsureRegExpArray(
  stringMaybeArray: string | string[] | undefined,
): RegExp[] {
  if (!stringMaybeArray) return [];

  const stringArray = ensureArray(stringMaybeArray);

  const regExpArray = stringArray.map((str: string) => new RegExp(str));

  return regExpArray;
}

const whiteSpaceRegex =
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/;
/**
 * Determines whether a string contains one or more white space characters and no other characters.
 *
 * This implementation uses [dotnet's `Char.IsWhiteSpace` definition of white
 * space](https://learn.microsoft.com/en-us/dotnet/api/system.char.iswhitespace?view=net-9.0):
 *
 * ```ts
 * /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/.test(
 *   ch,
 * );
 * ```
 *
 * Note: This differs from
 * [`/\s/.test(ch)`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions/Character_classes#:~:text=Matches%20a%20single%20white%20space%20character%2C%20including%20space)
 * (usually considered the determiner of what is white space in JavaScript) in that it does not
 * include ZWNBSP (U+FEFF) but rather includes NEXT LINE (U+0085)
 *
 * @param ch Single character or a string of characters
 * @returns `true` if the string consists of one or more white space characters and no other
 *   characters, `false` otherwise
 */
export function isWhiteSpace(ch: string) {
  return whiteSpaceRegex.test(ch);
}

/**
 * Converts PascalCase or camelCase string to kebab-case. To detect upper- and lower-case
 * characters, uses `.toUpperCase` and `.toLowerCase` to be locale-independent.
 *
 * Current implementation supports only UTF-16.
 *
 * Thanks to ChatGPT https://chatgpt.com/share/67c8aa44-e054-800c-8068-e1e6630081f7
 */
export function toKebabCase(input: string): string {
  let result = '';

  for (let i = 0; i < input.length; i++) {
    const char = input[i];
    const isUpper = char === char.toUpperCase() && char !== char.toLowerCase();

    if (isUpper) {
      if (i > 0) {
        const prevChar = input[i - 1];
        const isPrevUpper =
          prevChar === prevChar.toUpperCase() && prevChar !== prevChar.toLowerCase();

        // If previous is not uppercase, always insert dash.
        if (!isPrevUpper) {
          result += '-';
        } else if (i + 1 < input.length) {
          // Deal with initialisms and acronyms as if they are whole words ("APIFinder" -> "api-finder")
          // Previous was uppercase; insert dash only if the next character exists and is lowercase.
          const nextChar = input[i + 1];
          const isNextLower =
            nextChar === nextChar.toLowerCase() && nextChar !== nextChar.toUpperCase();
          if (isNextLower) {
            result += '-';
          }
        }
      }
      result += char.toLowerCase();
    } else {
      result += char;
    }
  }

  return result;
}

/**
 * Shortens text by splitting by space, removing tokens from the middle and replacing them with
 * `[...]`
 *
 * @param text The input text
 * @param numberOfTokensToKeepBeforeAndAfter Count of space separated tokens to keep at the
 *   beginning and end of the text
 * @returns The full text if shorter than tokens to keep for beginning plus end, otherwise the first
 *   x tokens, followed by `[...]` and the last x tokens
 */
export function collapseMiddleWords(
  text: string,
  numberOfTokensToKeepBeforeAndAfter: number,
): string {
  const tokens = text.split(/\s+/);

  // If the text is too short to truncate, return as-is
  if (
    tokens.length <= numberOfTokensToKeepBeforeAndAfter * 2 ||
    numberOfTokensToKeepBeforeAndAfter < 1
  ) {
    return text;
  }

  const startTokens = tokens.slice(0, numberOfTokensToKeepBeforeAndAfter);
  const endTokens = tokens.slice(-numberOfTokensToKeepBeforeAndAfter);

  return [...startTokens, `[...]`, ...endTokens].join(' ');
}
