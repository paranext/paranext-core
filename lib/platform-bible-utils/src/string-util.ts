import {
  indexOf as stringzIndexOf,
  substring as stringzSubstring,
  length as stringzLength,
  toArray as stringzToArray,
  limit as stringzLimit,
  substr as stringzSubstr,
} from 'stringz';

/**
 * Finds the Unicode code point at the given index
 *
 * @param {string} string String to index
 * @param {number} index Position of the character to be returned in range of 0 to -length(string)
 * @returns {string} New string consisting of the Unicode code point located at the specified
 *   offset, undefined if index is out of bounds
 */
export function at(string: string, index: number): string | undefined {
  if (index > length(string) || index < -length(string)) return undefined;
  return substr(string, index, 1);
}

/**
 * Always indexes string as a sequence of Unicode code points
 *
 * @param string String to index
 * @param index Position of the string character to be returned, in the range of 0 to
 *   length(string)-1
 * @returns {string} New string consisting of the Unicode code point located at the specified
 *   offset, empty string if index is out of bounds
 */
export function charAt(string: string, index: number): string {
  if (index < 0 || index > length(string) - 1) return '';
  return substr(string, index, 1);
}

/**
 * Returns a non-negative integer that is the Unicode code point value of the character starting at
 * the given index. This function handles Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string String to index
 * @param {number} index Position of the string character to be returned, in the range of 0 to
 *   length(string)-1
 * @returns {number | undefined} Non-negative integer representing the code point value of the
 *   character at the given index, or undefined if there is no element at that position
 */
export function codePointAt(string: string, index: number): number | undefined {
  if (index < 0 || index > length(string) - 1) return undefined;
  return substr(string, index, 1).codePointAt(0);
}

/**
 * Determines whether a string ends with the characters of this string. This function handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string String to search through
 * @param {string} searchString Characters to search for at the end of the string
 * @param {number} [endPosition=length(string)] End position where searchString is expected to be
 *   found. Default is `length(string)`
 * @returns {boolean} True if it ends with searchString, false if it does not
 */
export function endsWith(
  string: string,
  searchString: string,
  endPosition: number = length(string),
): boolean {
  const lastIndexOfSearchString = lastIndexOf(string, searchString);
  if (lastIndexOfSearchString === -1) return false;
  if (lastIndexOfSearchString + length(searchString) !== endPosition) return false;
  return true;
}

/**
 * Performs a case-sensitive search to determine if searchString is found in string. This function
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string String to search through
 * @param {string} searchString String to search for
 * @param {string} [position=0] Position within the string to start searching for searchString.
 *   Default is `0`
 * @returns {boolean} True if search string is found, false if it is not
 */
export function includes(string: string, searchString: string, position: number = 0): boolean {
  const partialString = substring(string, position);
  const indexOfSearchString = indexOf(partialString, searchString);
  if (indexOfSearchString === -1) return false;
  return true;
}

/**
 * Returns the index of the first occurrence of a given string. This function handles Unicode code
 * points instead of UTF-16 character codes.
 *
 * @param {string} string String to search through
 * @param {string} searchString The string to search for
 * @param {number} [position=0] Start of searching. Default is `0`
 * @returns {number} Index of the first occurrence of a given string
 */
export function indexOf(
  string: string,
  searchString: string,
  position: number | undefined = 0,
): number {
  return stringzIndexOf(string, searchString, position);
}

/**
 * Searches this string and returns the index of the last occurrence of the specified substring.
 * This function handles Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string String to search through
 * @param {string} searchString Substring to search for
 * @param {number} [position=+Infinity] The method returns the index of the last occurrence of the
 *   specified substring at a position less than or equal to position. . Default is `+Infinity`
 * @returns {number} Index of the last occurrence of searchString found, or -1 if not found.
 */
export function lastIndexOf(
  string: string,
  searchString: string,
  position: number = +Infinity,
): number {
  let validatedPosition = position;

  if (validatedPosition < 0) {
    validatedPosition = 0;
  } else if (validatedPosition >= length(string)) {
    validatedPosition = length(string) - 1;
  }

  for (let index = validatedPosition; index >= 0; index--) {
    if (substr(string, index, length(searchString)) === searchString) {
      return index;
    }
  }

  return -1;
}

/**
 * Returns the length of a string. This function handles Unicode code points instead of UTF-16
 * character codes.
 *
 * @param {string} string String to return the length for
 * @returns Number that is length of the starting string
 */
export function length(string: string): number {
  return stringzLength(string);
}

/**
 * Returns the Unicode Normalization Form of this string.
 *
 * @param {string} string The starting string
 * @param {'NFC' | 'NFD' | 'NFKC' | 'NFKD' | 'none'} [form='NFC'] Form specifying the Unicode
 *   Normalization Form. Default is `'NFC'`
 * @returns {string} A string containing the Unicode Normalization Form of the given string.
 */
export function normalize(string: string, form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD' | 'none'): string {
  const upperCaseForm = form.toUpperCase();
  if (upperCaseForm === 'NONE') {
    return string;
  }
  return string.normalize(upperCaseForm);
}

/**
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the end of this string. This function
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string String to add padding too
 * @param {number} targetLength The length of the resulting string once the starting string has been
 *   padded. If value is less than or equal to length(string), then string is returned as is.
 * @param {string} [padString=" "] The string to pad the current string with. If padString is too
 *   long to stay within targetLength, it will be truncated. Default is `" "`
 * @returns {string} String with appropriate padding at the end
 */
// Note: Limit with padString only works when length(padString) = 1, will be fixed with https://github.com/sallar/stringz/pull/59
export function padEnd(string: string, targetLength: number, padString: string = ' '): string {
  if (targetLength <= length(string)) return string;
  return stringzLimit(string, targetLength, padString, 'right');
}

/**
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the start of this string. This function
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string String to add padding too
 * @param {number} targetLength The length of the resulting string once the starting string has been
 *   padded. If value is less than or equal to length(string), then string is returned as is.
 * @param {string} [padString=" "] The string to pad the current string with. If padString is too
 *   long to stay within the targetLength, it will be truncated from the end. Default is `" "`
 * @returns String with of specified targetLength with padString applied from the start
 */
// Note: Limit with padString only works when length(padString) = 1, will be fixed with https://github.com/sallar/stringz/pull/59
export function padStart(string: string, targetLength: number, padString: string = ' '): string {
  if (targetLength <= length(string)) return string;
  return stringzLimit(string, targetLength, padString, 'left');
}

function correctSliceIndex(stringLength: number, index: number) {
  if (index > stringLength) return stringLength;
  if (index < -stringLength) return 0;
  if (index < 0) return index + stringLength;
  return index;
}

/**
 * Extracts a section of this string and returns it as a new string, without modifying the original
 * string. This function handles Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string The starting string
 * @param {number} indexStart The index of the first character to include in the returned substring.
 * @param {number} indexEnd The index of the first character to exclude from the returned substring.
 * @returns {string} A new string containing the extracted section of the string.
 */
export function slice(string: string, indexStart: number, indexEnd?: number): string {
  const stringLength: number = length(string);
  if (
    indexStart > stringLength ||
    (indexEnd &&
      ((indexStart > indexEnd &&
        !(
          indexStart > 0 &&
          indexStart < stringLength &&
          indexEnd < 0 &&
          indexEnd > -stringLength
        )) ||
        indexEnd < -stringLength ||
        (indexStart < 0 && indexStart > -stringLength && indexEnd > 0)))
  )
    return '';

  const newStart = correctSliceIndex(stringLength, indexStart);
  const newEnd = indexEnd ? correctSliceIndex(stringLength, indexEnd) : undefined;

  return substring(string, newStart, newEnd);
}

/**
 * Takes a pattern and divides the string into an ordered list of substrings by searching for the
 * pattern, puts these substrings into an array, and returns the array. This function handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * @param {string} string The string to split
 * @param {string | RegExp} separator The pattern describing where each split should occur
 * @param {number} splitLimit Limit on the number of substrings to be included in the array. Splits
 *   the string at each occurrence of specified separator, but stops when limit entries have been
 *   placed in the array.
 * @returns {string[] | undefined} An array of strings, split at each point where separator occurs
 *   in the starting string. Returns undefined if separator is not found in string.
 */
export function split(string: string, separator: string | RegExp, splitLimit?: number): string[] {
  const result: string[] = [];

  if (splitLimit !== undefined && splitLimit <= 0) {
    return [string];
  }

  if (separator === '') return toArray(string).slice(0, splitLimit);

  let regexSeparator = separator;
  if (
    typeof separator === 'string' ||
    (separator instanceof RegExp && !includes(separator.flags, 'g'))
  ) {
    regexSeparator = new RegExp(separator, 'g');
  }

  const matches: RegExpMatchArray | null = string.match(regexSeparator);

  let currentIndex = 0;

  if (!matches) return [string];

  for (let index = 0; index < (splitLimit ? splitLimit - 1 : matches.length); index++) {
    const matchIndex = indexOf(string, matches[index], currentIndex);
    const matchLength = length(matches[index]);

    result.push(substring(string, currentIndex, matchIndex));
    currentIndex = matchIndex + matchLength;

    if (splitLimit !== undefined && result.length === splitLimit) {
      break;
    }
  }

  result.push(substring(string, currentIndex));

  return result;
}

/**
 * Determines whether the string begins with the characters of a specified string, returning true or
 * false as appropriate. This function handles Unicode code points instead of UTF-16 character
 * codes.
 *
 * @param {string} string String to search through
 * @param {string} searchString The characters to be searched for at the start of this string.
 * @param {number} [position=0] The start position at which searchString is expected to be found
 *   (the index of searchString's first character). Default is `0`
 * @returns {boolean} True if the given characters are found at the beginning of the string,
 *   including when searchString is an empty string; otherwise, false.
 */
export function startsWith(string: string, searchString: string, position: number = 0): boolean {
  const indexOfSearchString = indexOf(string, searchString, position);
  if (indexOfSearchString !== position) return false;
  return true;
}

/**
 * Returns a substring by providing start and length. This function handles Unicode code points
 * instead of UTF-16 character codes. This function is not exported because it is considered
 * deprecated, however it is still useful as a local helper function.
 *
 * @param {string} string String to be divided
 * @param {number} [begin=Start of string] Start position. Default is `Start of string`
 * @param {number} [len=String length minus start parameter] Length of result. Default is `String
 *   length minus start parameter`. Default is `String length minus start parameter`
 * @returns {string} Substring from starting string
 */
function substr(string: string, begin: number = 0, len: number = length(string) - begin): string {
  return stringzSubstr(string, begin, len);
}

/**
 * Returns a substring by providing start and end position. This function handles Unicode code
 * points instead of UTF-16 character codes.
 *
 * @param {string} string String to be divided
 * @param {string} begin Start position
 * @param {number} [end=End of string] End position. Default is `End of string`
 * @returns {string} Substring from starting string
 */
export function substring(
  string: string,
  begin?: number | undefined,
  end: number | undefined = length(string),
): string {
  return stringzSubstring(string, begin, end);
}

/**
 * Converts a string to an array of string characters. This function handles Unicode code points
 * instead of UTF-16 character codes.
 *
 * @param {string} string String to convert to array
 * @returns {string[]} An array of characters from the starting string
 */
export function toArray(string: string): string[] {
  return stringzToArray(string);
}
