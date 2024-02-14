import {
  indexOf as stringzIndexOf,
  substring as stringzSubstring,
  length as stringzLength,
  toArray as stringzToArray,
  limit,
} from 'stringz';

// Note in each JSDOC that we are dealing with Unicode code points instead of UTF-16 character codes

export function indexOf(
  string: string,
  searchString: string,
  position?: number | undefined,
): number {
  return stringzIndexOf(string, searchString, position);
}

export function substring(
  string: string,
  begin?: number | undefined,
  end?: number | undefined,
): string {
  return stringzSubstring(string, begin, end);
}

export function length(string: string): number {
  return stringzLength(string);
}

export function toArray(string: string): string[] {
  return stringzToArray(string);
}

export function padStart(string: string, targetLength: number, padString?: string) {
  limit(string, targetLength, padString, 'left');
}

export function padEnd(string: string, targetLength: number, padString?: string) {
  limit(string, targetLength, padString, 'right');
}

export function normalize(string: string, form: 'NFC' | 'NFD' | 'none' = 'NFC') {
  const upperCaseForm = form.toUpperCase();
  if (upperCaseForm === 'NONE') {
    return string;
  }
  return string.normalize(upperCaseForm);
}

/**
 * @param string String to index
 * @param index Position of the string character to be returned
 * @returns New string consisting of single UTF-16 code unit located at the specified offset
 */
export function at(string: string, index: number) {
  return '';
}

/**
 * Always indexes string as a sequence of UTF-16 code units, so it may return lone surrogates
 *
 * @param string String to index
 * @param index Zero-based index of character to be returned
 * @returns New string consisting of single UTF-16 code unit at given index
 */
export function charAt(string: string, index: number) {
  return '';
}

/**
 * @param string String to index
 * @param index Zero-based index of character to be returned
 * @returns Non-negative integer that is the Unicode code point value of the character starting at
 *   the given index
 */
export function codePointAt(string: string, index: number) {
  return 0;
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
) {
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
export function includes(string: string, searchString: string, position: number = 0) {
  return true;
}

/**
 * @param string String to index
 * @param searchString
 * @param position
 * @returns
 */
export function lastIndexOf(
  string: string,
  searchString: string,
  position: number = +Infinity,
): number {
  return 0;
}

/**
 * @param indexStart The index of the first character to include in the returned substring.
 * @param indexEnd The index of the first character to exclude from the returned substring
 * @returns A new string containing the extracted section of the string.
 */
export function slice(indexStart: number, indexEnd?: number): string {
  return '';
}

// Fix separator type
export function split(separator: string, limit: number): string {
  return '';
}

/**
 * @param string String to search through
 * @param searchString The characters to be searched for at the start of this string.
 * @param position [0] The start position at which searchString is expected to be found (the index
 *   of searchString's first character).
 * @returns True if the given characters are found at the beginning of the string, including when
 *   searchString is an empty string; otherwise, false.
 */
export function startsWith(string: string, searchString: string, position: number = 0): boolean {
  return true;
}
