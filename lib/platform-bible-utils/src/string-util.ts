import {
  indexOf as stringzIndexOf,
  substring as stringzSubstring,
  length as stringzLength,
  toArray as stringzToArray,
  limit,
  substr,
} from 'stringz';

// TODO: Note in each JSDOC that we are dealing with Unicode code points instead of UTF-16 character codes
// TODO: Overloads

/**
 * Returns the index of the first occurrence of a given string
 *
 * @param string String to index
 * @param searchString String to search for
 * @param position The starting position
 * @returns Index of the first occurrence of a given string
 */
export function indexOf(
  string: string,
  searchString: string,
  position?: number | undefined,
): number {
  return stringzIndexOf(string, searchString, position);
}

/**
 * Returns a substring by providing start and end position
 *
 * @param string String from which substring will be extracted
 * @param begin Starting position
 * @param end Ending position
 * @returns Substring of the starting string
 */
export function substring(
  string: string,
  begin?: number | undefined,
  end?: number | undefined,
): string {
  return stringzSubstring(string, begin, end);
}

/**
 * Returns the length of a string
 *
 * @param string String from which size will be calculated
 * @returns Number that is length of the starting string
 */
export function length(string: string): number {
  return stringzLength(string);
}

/**
 * Converts a string to an array of string characters
 *
 * @param string String to turn into array
 * @returns An array of characters from the starting string
 */
export function toArray(string: string): string[] {
  return stringzToArray(string);
}

/**
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the start of this string.
 *
 * @param string String to add padding too
 * @param targetLength The length of the resulting string once the starting string has been padded
 * @param padString The string to pad the current string with
 * @returns String with appropriate padding at the start
 */
export function padStart(string: string, targetLength: number, padString?: string): string {
  return limit(string, targetLength, padString, 'left');
}

/**
 * Pads this string with another string (multiple times, if needed) until the resulting string
 * reaches the given length. The padding is applied from the end of this string.
 *
 * @param string String to add padding too
 * @param targetLength The length of the resulting string once the starting string has been padded
 * @param padString The string to pad the current string with
 * @returns String with appropriate padding at the end
 */
export function padEnd(string: string, targetLength: number, padString?: string): string {
  return limit(string, targetLength, padString, 'right');
}

// TODO: Want to override, but getting an error that it isn't compatible
// export function normalize(string: string, form?: string): string;
export function normalize(string: string, form: 'NFC' | 'NFD' | 'none' = 'NFC'): string {
  const upperCaseForm = form.toUpperCase();
  if (upperCaseForm === 'NONE') {
    return string;
  }
  return string.normalize(upperCaseForm);
}

/**
 * Always indexes string as a sequence of Unicode code points
 *
 * @param string String to index
 * @param index Position of the string character to be returned
 * @returns New string consisting of the Unicode code point located at the specified offset
 */
export function at(string: string, index: number): string {
  return substr(string, index, 1);
}

// TODO: Is this all we need to do here?
/**
 * Always indexes string as a sequence of Unicode code points
 *
 * @param string String to index
 * @param index Position of the string character to be returned
 * @returns New string consisting of the Unicode code point located at the specified offset
 */
export function charAt(string: string, index: number): string {
  return at(string, index);
}

// TODO: Is this all we need to do here?
/**
 * @param string String to index
 * @param index Position of the string character to be returned
 * @returns New string consisting of the Unicode code point located at the specified offset
 */
export function codePointAt(string: string, index: number) {
  return at(string, index);
}

/**
 * Determines whether a string ends with the characters of this string
 *
 * @param string String to search through
 * @param searchString Characters to search for at the end of the string
 * @param endPosition [length(string)] End position where searchString is expected to be found
 * @returns True if it ends with searchString, false if it does not
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
 * Case-sensitive search to determine if searchString is found in string
 *
 * @param string String to search through
 * @param searchString String to search for, cannot be regex
 * @param position [0] position within the string to start searching for searchString
 * @returns True if search string is found, false if it is not
 */
export function includes(string: string, searchString: string, position: number = 0): boolean {
  const partialString = substring(string, position);
  const indexOfSearchString = indexOf(partialString, searchString);
  if (indexOfSearchString === -1) return false;
  return true;
}

/**
 * @param string String to index
 * @param searchString Substring to search for.
 * @param position
 * @returns The index of the last occurrence of searchString found, or -1 if not found.
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
 * @param indexStart The index of the first character to include in the returned substring.
 * @param indexEnd The index of the first character to exclude from the returned substring
 * @returns A new string containing the extracted section of the string.
 */
export function slice(string: string, indexStart: number, indexEnd?: number): string {
  return substring(string, indexStart, indexEnd);
}

// TODO: Fix separator type, implement
// export function split(separator: string, limit: number): string {
//   return '';
// }

// TODO: Implement
/**
 * @param string String to search through
 * @param searchString The characters to be searched for at the start of this string.
 * @param position [0] The start position at which searchString is expected to be found (the index
 *   of searchString's first character).
 * @returns True if the given characters are found at the beginning of the string, including when
 *   searchString is an empty string; otherwise, false.
 */
// export function startsWith(string: string, searchString: string, position: number = 0): boolean {
//   return true;
// }
