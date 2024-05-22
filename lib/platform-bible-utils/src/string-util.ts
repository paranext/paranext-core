import {
  indexOf as stringzIndexOf,
  substring as stringzSubstring,
  length as stringzLength,
  toArray as stringzToArray,
  limit as stringzLimit,
  substr as stringzSubstr,
} from 'stringz';

/**
 * This function mirrors the `at` function from the JavaScript Standard String object. It handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * Finds the Unicode code point at the given index.
 *
 * @param string String to index
 * @param index Position of the character to be returned in range of -length(string) to
 *   length(string)
 * @returns New string consisting of the Unicode code point located at the specified offset,
 *   undefined if index is out of bounds
 */
export function at(string: string, index: number): string | undefined {
  if (index > stringLength(string) || index < -stringLength(string)) return undefined;
  return substr(string, index, 1);
}

/**
 * This function mirrors the `charAt` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a new string consisting of the single unicode code point at the given index.
 *
 * @param string String to index
 * @param index Position of the string character to be returned, in the range of 0 to
 *   length(string)-1
 * @returns New string consisting of the Unicode code point located at the specified offset, empty
 *   string if index is out of bounds
 */
export function charAt(string: string, index: number): string {
  if (index < 0 || index > stringLength(string) - 1) return '';
  return substr(string, index, 1);
}

/**
 * This function mirrors the `codePointAt` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a non-negative integer that is the Unicode code point value of the character starting at
 * the given index.
 *
 * @param string String to index
 * @param index Position of the string character to be returned, in the range of 0 to
 *   length(string)-1
 * @returns Non-negative integer representing the code point value of the character at the given
 *   index, or undefined if there is no element at that position
 */
export function codePointAt(string: string, index: number): number | undefined {
  if (index < 0 || index > stringLength(string) - 1) return undefined;
  return substr(string, index, 1).codePointAt(0);
}

/**
 * This function mirrors the `endsWith` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Determines whether a string ends with the characters of this string.
 *
 * @param string String to search through
 * @param searchString Characters to search for at the end of the string
 * @param endPosition End position where searchString is expected to be found. Default is
 *   `length(string)`
 * @returns True if it ends with searchString, false if it does not
 */
export function endsWith(
  string: string,
  searchString: string,
  endPosition: number = stringLength(string),
): boolean {
  const lastIndexOfSearchString = lastIndexOf(string, searchString);
  if (lastIndexOfSearchString === -1) return false;
  if (lastIndexOfSearchString + stringLength(searchString) !== endPosition) return false;
  return true;
}

/**
 * This function executes a regex and applies a function to each match found in the search string.
 *
 * @param regex The regular expression that will be used to search the string for matches
 * @param searchString The string to search for regex matches in
 * @param functionToApply A function with logic to apply to every regex match found in the search
 *   string
 * @returns The searchString with found matches modified according to the specifications in
 *   functionToApply. E.g. a search string of 'abcabc' with a regex that matches on 'a's and a
 *   function that replaces 'a' with 'b' would return 'bbcbbc'
 */
export function applyToRegexMatches(
  regex: RegExp,
  searchString: string,
  functionToApply: (result: RegExpExecArray) => string,
): string {
  let result = regex.exec(searchString);
  let modifiedStr = searchString;
  // Regex explicitly returns null, so need to check for that in this case
  // eslint-disable-next-line no-null/no-null
  while (result !== null) {
    modifiedStr = functionToApply(result);
    result = regex.exec(modifiedStr);
  }
  return modifiedStr;
}

/**
 * Formats a string, replacing {localization key} with the localization (or multiple localizations
 * if there are multiple in the string). Will also remove \ before curly braces if curly braces are
 * escaped in order to preserve the curly braces. E.g. 'Hi, this is {name}! I like {curly braces}!
 * would become Hi, this is Jim! I like {curly braces}!
 *
 * If the key in unescaped braces is not found, just return the key without the braces. Empty
 * unescaped curly braces will just return a string without the braces e.g. ('I am {Nemo}', {
 * 'name': 'Jim'}) would return 'I am Nemo'.
 *
 * @param str String to format
 * @returns Formatted string
 */
export function formatReplacementString(str: string, replacers: { [key: string]: string }): string {
  const keyRegex = /[{}\\]*((\\){0}\{([^{}\\]*)(\\){0}\})/g;
  let updatedStr = str;
  updatedStr = applyToRegexMatches(keyRegex, str, (result: RegExpExecArray) => {
    if (result.length > 3) {
      const replacementKey = result[3];
      let replacement = '';
      if (replacementKey?.length > 0) replacement = replacers[replacementKey] ?? replacementKey;
      const replacementKeyWithBraces = result[0];
      updatedStr = updatedStr.replace(replacementKeyWithBraces, replacement);
      return updatedStr;
    }
    return str;
  });

  const backslashRegex = /[{}\\]*(\\)+\{[^{}\\]*(\\)+\}/g;
  updatedStr = applyToRegexMatches(backslashRegex, updatedStr, (result: RegExpExecArray) => {
    updatedStr = updatedStr.replace(result[1], ''); // slashes before opening curly brace
    updatedStr = updatedStr.replace(result[2], ''); // slashes before closing curly brace
    return updatedStr;
  });

  return updatedStr;
}
/**
 * This function mirrors the `includes` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Performs a case-sensitive search to determine if searchString is found in string.
 *
 * @param string String to search through
 * @param searchString String to search for
 * @param position Position within the string to start searching for searchString. Default is `0`
 * @returns True if search string is found, false if it is not
 */
export function includes(string: string, searchString: string, position: number = 0): boolean {
  const partialString = substring(string, position);
  const indexOfSearchString = indexOf(partialString, searchString);
  if (indexOfSearchString === -1) return false;
  return true;
}

/**
 * This function mirrors the `indexOf` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns the index of the first occurrence of a given string.
 *
 * @param string String to search through
 * @param searchString The string to search for
 * @param position Start of searching. Default is `0`
 * @returns Index of the first occurrence of a given string
 */
export function indexOf(
  string: string,
  searchString: string,
  position: number | undefined = 0,
): number {
  return stringzIndexOf(string, searchString, position);
}

/**
 * This function mirrors the `lastIndexOf` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Searches this string and returns the index of the last occurrence of the specified substring.
 *
 * @param string String to search through
 * @param searchString Substring to search for
 * @param position The index at which to begin searching. If omitted, the search begins at the end
 *   of the string. Default is `undefined`
 * @returns Index of the last occurrence of searchString found, or -1 if not found.
 */
export function lastIndexOf(string: string, searchString: string, position?: number): number {
  let validatedPosition = position === undefined ? stringLength(string) : position;

  if (validatedPosition < 0) {
    validatedPosition = 0;
  } else if (validatedPosition >= stringLength(string)) {
    validatedPosition = stringLength(string) - 1;
  }

  for (let index = validatedPosition; index >= 0; index--) {
    if (substr(string, index, stringLength(searchString)) === searchString) {
      return index;
    }
  }

  return -1;
}

/**
 * This function mirrors the `length` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes. Since `length` appears to be a
 * reserved keyword, the function was renamed to `stringLength`
 *
 * Returns the length of a string.
 *
 * @param string String to return the length for
 * @returns Number that is length of the starting string
 */
export function stringLength(string: string): number {
  return stringzLength(string);
}

/**
 * This function mirrors the `normalize` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns the Unicode Normalization Form of this string.
 *
 * @param string The starting string
 * @param form Form specifying the Unicode Normalization Form. Default is `'NFC'`
 * @returns A string containing the Unicode Normalization Form of the given string.
 */
export function normalize(string: string, form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD' | 'none'): string {
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
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the end of this string.
 *
 * @param string String to add padding too
 * @param targetLength The length of the resulting string once the starting string has been padded.
 *   If value is less than or equal to length(string), then string is returned as is.
 * @param padString The string to pad the current string with. If padString is too long to stay
 *   within targetLength, it will be truncated. Default is `" "`
 * @returns String with appropriate padding at the end
 */
// Note: Limit with padString only works when length(padString) = 1, will be fixed with https://github.com/sallar/stringz/pull/59
export function padEnd(string: string, targetLength: number, padString: string = ' '): string {
  if (targetLength <= stringLength(string)) return string;
  return stringzLimit(string, targetLength, padString, 'right');
}

/**
 * This function mirrors the `padStart` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the start of this string.
 *
 * @param string String to add padding too
 * @param targetLength The length of the resulting string once the starting string has been padded.
 *   If value is less than or equal to length(string), then string is returned as is.
 * @param padString The string to pad the current string with. If padString is too long to stay
 *   within the targetLength, it will be truncated from the end. Default is `" "`
 * @returns String with of specified targetLength with padString applied from the start
 */
// Note: Limit with padString only works when length(padString) = 1, will be fixed with https://github.com/sallar/stringz/pull/59
export function padStart(string: string, targetLength: number, padString: string = ' '): string {
  if (targetLength <= stringLength(string)) return string;
  return stringzLimit(string, targetLength, padString, 'left');
}

// This is a helper function that performs a correction on the slice index to make sure it
// cannot go out of bounds
function correctSliceIndex(length: number, index: number) {
  if (index > length) return length;
  if (index < -length) return 0;
  if (index < 0) return index + length;
  return index;
}

/**
 * This function mirrors the `slice` function from the JavaScript Standard String object. It handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * Extracts a section of this string and returns it as a new string, without modifying the original
 * string.
 *
 * @param string The starting string
 * @param indexStart The index of the first character to include in the returned substring.
 * @param indexEnd The index of the first character to exclude from the returned substring.
 * @returns A new string containing the extracted section of the string.
 */
export function slice(string: string, indexStart: number, indexEnd?: number): string {
  const length: number = stringLength(string);
  if (
    indexStart > length ||
    (indexEnd &&
      ((indexStart > indexEnd &&
        !(indexStart >= 0 && indexStart < length && indexEnd < 0 && indexEnd > -length)) ||
        indexEnd < -length))
  )
    return '';

  const newStart = correctSliceIndex(length, indexStart);
  const newEnd = indexEnd ? correctSliceIndex(length, indexEnd) : undefined;

  return substring(string, newStart, newEnd);
}

/**
 * This function mirrors the `split` function from the JavaScript Standard String object. It handles
 * Unicode code points instead of UTF-16 character codes.
 *
 * Takes a pattern and divides the string into an ordered list of substrings by searching for the
 * pattern, puts these substrings into an array, and returns the array.
 *
 * @param string The string to split
 * @param separator The pattern describing where each split should occur
 * @param splitLimit Limit on the number of substrings to be included in the array. Splits the
 *   string at each occurrence of specified separator, but stops when limit entries have been placed
 *   in the array.
 * @returns An array of strings, split at each point where separator occurs in the starting string.
 *   Returns undefined if separator is not found in string.
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
    const matchLength = stringLength(matches[index]);

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
 * This function mirrors the `startsWith` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Determines whether the string begins with the characters of a specified string, returning true or
 * false as appropriate.
 *
 * @param string String to search through
 * @param searchString The characters to be searched for at the start of this string.
 * @param position The start position at which searchString is expected to be found (the index of
 *   searchString's first character). Default is `0`
 * @returns True if the given characters are found at the beginning of the string, including when
 *   searchString is an empty string; otherwise, false.
 */
export function startsWith(string: string, searchString: string, position: number = 0): boolean {
  const indexOfSearchString = indexOf(string, searchString, position);
  if (indexOfSearchString !== position) return false;
  return true;
}

/**
 * This function mirrors the `substr` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a substring by providing start and length. This function is not exported because it is
 * considered deprecated, however it is still useful as a local helper function.
 *
 * @param string String to be divided
 * @param begin Start position. Default is `Start of string`
 * @param len Length of result. Default is `String length minus start parameter`. Default is `String
 *   length minus start parameter`
 * @returns Substring from starting string
 */
function substr(
  string: string,
  begin: number = 0,
  len: number = stringLength(string) - begin,
): string {
  return stringzSubstr(string, begin, len);
}

/**
 * This function mirrors the `substring` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a substring by providing start and end position.
 *
 * @param string String to be divided
 * @param begin Start position
 * @param end End position. Default is `End of string`
 * @returns Substring from starting string
 */
export function substring(
  string: string,
  begin: number,
  end: number = stringLength(string),
): string {
  return stringzSubstring(string, begin, end);
}

/**
 * This function mirrors the `toArray` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Converts a string to an array of string characters.
 *
 * @param string String to convert to array
 * @returns An array of characters from the starting string
 */
export function toArray(string: string): string[] {
  return stringzToArray(string);
}
