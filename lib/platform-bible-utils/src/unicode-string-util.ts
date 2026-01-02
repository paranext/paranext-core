import { LocalizeKey } from 'extension-contributions/menus.model';
import { limit as stringzLimit, toArray as stringzToArray } from 'stringz';
import { ensureArray } from './array-util';
import { isString } from './util';

/*
 * TODO(mattg): This is a comment on the state of this branch, and where it needs
 * to go in the future.
 *
 * CURRENT STATE OF THIS BRANCH:
 * As of 2026/01/02, I, Matthew Getgen, have finished re-writing:
 * - toArray
 * - at
 * - charAt
 * - codePointAt
 * - substring
 * - slice
 * - split
 * - indexOf
 * - lastIndexOf
 * - includes
 * - normalize
 * - ordinalCompare
 * - startsWith
 * - endsWith
 * - padStart
 * - padEnd
 * And I still need to re-write:
 * - isLocalizedKey
 * - isWhiteSpace
 * - toKebabCase
 * - formatRepalcementStringToArray
 * - formatReplacementString
 * - escapeStringRegexp
 * - transformAndEnsureRegExpRegExpArray
 * - transformAndEnsureRegExpArray
 * These functions are apart of the `UnicodeString` TypeScript class, which moves
 * away from the previous `SegmentedString` struct methods that I wrote for this before.
 *
 * TODOS:
 * - Finish re-writing all functions for the UnicodeString class.
 * - Finish re-writing all tests for the UnicodeString class.
 * - Finish re-writing all perf tests for the UnicodeString class, ensuring all
 *   functions perform better (stored at `~/repos/test/platform-bible-utils-perf`
 *   on Matt G's machine).
 * - Decide whether to match the JS Stdlib for index patterns, or standardize them
 *   for all functions (I prefer standardizing myself, since the stdlib is weird).
 * - Add comments above the functions, ensuring updated documentation.
 * - Mark previous functions as deprecated.
 */
export class UnicodeString {
  private readonly str: string;
  private readonly graphemes: string[];
  private readonly indecies: number[];

  constructor(string: string, graphemes?: string[] | undefined) {
    this.str = string;
    this.graphemes = graphemes !== undefined ? graphemes : stringzToArray(this.str);
    this.indecies = [];

    let index: number = 0;
    this.graphemes.forEach((grapheme) => {
      this.indecies.push(index);
      index += grapheme.length;
    });
  }

  get string(): string {
    return this.str;
  }

  get length(): number {
    return this.graphemes.length;
  }

  toArray(): string[] {
    return this.graphemes;
  }

  at(index: number): string | undefined {
    return this.graphemes.at(index);
  }

  charAt(index: number): string {
    if (index < 0 || index >= this.length) return '';
    return this.graphemes.at(index) ?? '';
  }

  codePointAt(index: number): number | undefined {
    if (index < 0 || index >= this.length) return undefined;
    return this.graphemes.at(index)?.codePointAt(0);
  }

  substring(begin: number, end: number = this.length): string {
    if (begin < 0 || begin >= this.length) return '';
    // NOTE(mattg): `>` instead of `>=` is intentional
    if (end < 0 || end > this.length || end < begin) return '';

    const start = this.indecies.at(begin);
    const stop = this.indecies.at(end);
    if (start === undefined) {
      return '';
    }
    return this.str.substring(start, stop);
  }

  slice(indexStart: number, indexEnd?: number): string {
    // TODO(mattg): refactor these checks
    if (indexStart > this.length) return '';
    if (indexEnd) {
      if (
        (indexStart > indexEnd &&
          !(
            indexStart >= 0 &&
            indexStart < this.length &&
            indexEnd < 0 &&
            indexEnd > -this.length
          )) ||
        indexEnd < -this.length
      )
        return '';
    }

    const newStart = this.correctSliceIndex(indexStart);
    const newEnd = indexEnd ? this.correctSliceIndex(indexEnd) : undefined;
    return this.substring(newStart, newEnd);
  }

  split(separator: string | RegExp, splitLimit?: number): string[] {
    const result: string[] = [];

    if (splitLimit !== undefined && splitLimit <= 0) {
      return [this.string];
    }

    if (separator === '') return this.toArray().slice(0, splitLimit);

    let regexSeparator = separator;
    if (
      typeof separator === 'string' ||
      (separator instanceof RegExp && !includes(separator.flags, 'g'))
    ) {
      regexSeparator = new RegExp(separator, 'g');
    }

    const matches: RegExpMatchArray | null = this.string.match(regexSeparator);

    if (!matches) return [this.string];

    let currentIndex = 0;
    for (let index = 0; index < (splitLimit ? splitLimit - 1 : matches.length); index++) {
      const matchString: UnicodeString = new UnicodeString(matches[index]);
      const matchIndex = this.indexOf(matchString, currentIndex);

      result.push(this.substring(currentIndex, matchIndex));
      currentIndex = matchIndex + matchString.length;

      if (splitLimit !== undefined && result.length === splitLimit) {
        break;
      }
    }

    result.push(this.substring(currentIndex));

    return result;
  }

  indexOf(searchString: UnicodeString, position: number = 0): number {
    if (searchString.length === 0) return -1;

    const maxSearchIndex: number = this.length - searchString.length;
    if (maxSearchIndex < 0) return -1;
    let cleanPosition = position;
    if (cleanPosition < 0) cleanPosition = 0;
    if (cleanPosition > maxSearchIndex) return -1;

    for (let index = cleanPosition; index <= maxSearchIndex; index++) {
      if (this.charAt(index) === searchString.charAt(0)) {
        if (searchString.length === 1) {
          // charAt did the comparison, we can stop now.
          return index;
        }
        if (this.substr(index, searchString.length) === searchString.string) {
          return index;
        }
      }
    }
    return -1;
  }

  lastIndexOf(searchString: UnicodeString, position?: number): number {
    if (searchString.length === 0) return -1;

    const maxSearchableIndex: number = this.length - searchString.length;
    if (maxSearchableIndex < 0) return -1;

    let cleanPosition = position === undefined ? maxSearchableIndex : position;
    if (cleanPosition < 0) cleanPosition = 0;
    else if (cleanPosition >= this.length) cleanPosition = this.length - 1;

    for (let index = cleanPosition; index >= 0; index--) {
      if (this.charAt(index) === searchString.charAt(0)) {
        if (searchString.length === 1) {
          // charAt did the comparison, we can stop now.
          return index;
        }
        if (this.substr(index, searchString.length) === searchString.string) {
          return index;
        }
      }
    }

    return -1;
  }

  includes(searchString: UnicodeString, position: number = 0): boolean {
    return !(this.indexOf(searchString, position) === -1);
  }

  normalize(form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD' | 'none'): string {
    const upperCaseForm = form.toUpperCase();
    if (upperCaseForm === 'NONE') {
      return this.string;
    }
    return this.string.normalize(upperCaseForm);
  }

  ordinalCompare(otherString: string, options?: Intl.CollatorOptions): number {
    return this.string.localeCompare(otherString, 'en', options);
  }

  startsWith(searchString: UnicodeString, position: number = 0): boolean {
    // NOTE(mattg): substr checks the bounds
    return this.substr(position, searchString.length) === searchString.string;
  }

  endsWith(searchString: UnicodeString, position: number = this.length): boolean {
    const index = position - searchString.length;
    if (index < 0) return false;
    // NOTE(mattg): substr checks the bounds
    return this.substr(index, searchString.length) === searchString.string;
  }

  padStart(targetLength: number, padString: string = ' '): string {
    if (targetLength <= this.length) return this.string;

    const targetDifference: number = targetLength - this.length;
    if (targetDifference === 0) {
      return this.string;
    }
    if (targetDifference < 0) {
      return this.substring(0, targetLength);
    }
    const repeatString = padString
      .repeat(Math.ceil(targetDifference / padString.length))
      .slice(0, targetDifference);
    return repeatString + this.string;
  }

  padEnd(targetLength: number, padString: string = ' '): string {
    if (targetLength <= this.length) return this.string;

    const targetDifference: number = targetLength - this.length;
    if (targetDifference === 0) {
      return this.string;
    }
    if (targetDifference < 0) {
      return this.substring(0, targetLength);
    }
    const repeatString = padString
      .repeat(Math.ceil(targetDifference / padString.length))
      .slice(0, targetDifference);
    return this.string + repeatString;
  }

  // TODO(mattg): finish this function
  // NOTE(mattg): this may not need to be apart of the class
  // isLocalizeKey() {}

  // TODO(mattg): finish this function
  // NOTE(mattg): this may not need to be apart of the class
  // isWhiteSpace() {}

  // TODO(mattg): finish this function
  // NOTE(mattg): this may not need to be apart of the class
  // toKebabCase() {}

  // TODO(mattg): finish this function
  // private _indexOfClosestClosingCurlyBrace() {}

  // TODO(mattg): finish this function
  // formatReplacementStringToArray() {}

  // TODO(mattg): finish this function
  // formatReplacementString() {}

  // TODO(mattg): finish this function
  // escapeStringRegexp() {}

  // TODO(mattg): finish this function
  // transformAndEnsureRegExpRegExpArray() {}

  // TODO(mattg): finish this function
  // transformAndEnsureRegExpArray() {}

  private substr(begin: number = 0, len: number = this.length - begin): string {
    let cleanBegin = begin;
    if (cleanBegin >= this.length) return '';
    if (cleanBegin < 0) cleanBegin += this.length;
    if (cleanBegin < 0) cleanBegin = 0;

    let cleanLen = len;
    if (cleanLen > this.length) cleanLen = this.length;
    if (cleanLen < 0) return '';

    const start = this.indecies.at(cleanBegin);
    const end =
      cleanBegin === this.length - 1 ? this.length : this.indecies.at(cleanBegin + cleanLen);
    if (start === undefined) {
      return '';
    }
    return this.string.substring(start, end);
  }

  private correctSliceIndex(index: number): number {
    if (index > this.length) return this.length;
    if (index < -this.length) return 0;
    if (index < 0) return index + this.length;
    return index;
  }
}

// DecomposedString or GraphemeString
type SegmentedString = {
  string: string;
  segments: string[];
  indecies: number[];
};

export function segmentString(string: string): SegmentedString {
  const ss: SegmentedString = {
    string,
    segments: [],
    indecies: [],
  };

  ss.segments = stringzToArray(ss.string);
  let index = 0;
  ss.segments.forEach((segment) => {
    ss.indecies.push(index);
    index += segment.length;
  });
  return ss;
}

function ensureSegmentedString(string: string | SegmentedString): SegmentedString {
  return typeof string === 'string' ? segmentString(string) : string;
}

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
export function at(string: string | SegmentedString, index: number): string | undefined {
  const ss: SegmentedString = ensureSegmentedString(string);
  return ss.segments.at(index);
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
export function charAt(string: string | SegmentedString, index: number): string {
  const ss: SegmentedString = ensureSegmentedString(string);
  if (index < 0 || index >= stringLength(ss)) return '';

  return ss.segments.at(index) ?? '';
}

/**
 * This function mirrors the `codePointAt` function from the JavaScript Standard String object. It
 * handles Unicode code points instead of UTF-16 character codes.
 *
 * Returns a non-negative integer that is the Unicode code point value of the character starting at
 * the given index. Usage Warning: This function only takes the first code point in a multi-code
 * point grapheme.
 *
 * @param string String to index
 * @param index Position of the string character to be returned, in the range of 0 to
 *   length(string)-1
 * @returns Non-negative integer representing the code point value of the character at the given
 *   index, or undefined if there is no element at that position
 */
export function codePointAt(string: string | SegmentedString, index: number): number | undefined {
  const ss: SegmentedString = ensureSegmentedString(string);
  if (index < 0 || index > stringLength(string) - 1) return undefined;
  return ss.segments.at(index)?.codePointAt(0);
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
  string: string | SegmentedString,
  searchString: string | SegmentedString,
  endPosition: number | undefined = undefined,
): boolean {
  const segString = ensureSegmentedString(string);
  const segSearchString = ensureSegmentedString(searchString);
  const searchStringLen = stringLength(segSearchString);
  const cleanEndPosition: number =
    endPosition === undefined ? stringLength(segString) : endPosition;
  const index = cleanEndPosition - searchStringLen;
  if (index < 0) return false;
  return substr(segString, index, searchStringLen) === searchString;
}

/**
 * Get the index of the closest closing curly brace in a string.
 *
 * Note: when escaped, gets the index of the curly brace, not the backslash before it.
 *
 * @param str String to search
 * @param index Index at which to start searching. Inclusive of this index
 * @param escaped Whether to search for an escaped or an unescaped closing curly brace
 * @returns Index of closest closing curly brace or -1 if not found
 */
function indexOfClosestClosingCurlyBrace(str: string, index: number, escaped: boolean) {
  if (index < 0) return -1;
  if (escaped) {
    if (charAt(str, index) === '}' && charAt(str, index - 1) === '\\') return index;
    const closeCurlyBraceIndex = indexOf(str, '\\}', index);
    return closeCurlyBraceIndex >= 0 ? closeCurlyBraceIndex + 1 : closeCurlyBraceIndex;
  }

  let i = index;
  const strLength = stringLength(str);
  while (i < strLength) {
    i = indexOf(str, '}', i);

    if (i === -1 || charAt(str, i - 1) !== '\\') break;

    // Didn't find an un-escaped close brace, so keep looking
    i += 1;
  }

  return i >= strLength ? -1 : i;
}

/**
 * Formats a string into an array of objects (adjacent strings are concatenated in one array entry),
 * replacing `{replacer key}` with the value in the `replacers` at that replacer key (or multiple
 * replacer values if there are multiple in the string). Will also remove \ before curly braces if
 * curly braces are escaped with a backslash in order to preserve the curly braces. E.g. 'Hi, this
 * is {name}! I like `\{curly braces\}`! would become Hi, this is Jim! I like {curly braces}!
 *
 * If the key in unescaped braces is not found, returns the key without the braces. Empty unescaped
 * curly braces will just return a string without the braces e.g. ('I am {Nemo}', { 'name': 'Jim'})
 * would return 'I am Nemo'.
 *
 * Note: React elements can be used as replacer values.
 *
 * @example
 *
 * ```tsx
 * <p>
 *   {formatReplacementStringToArray('Hi {other}! I am {name}.', {
 *     other: 'Billy',
 *     name: <span className="tw-text-red-500">Jim</span>,
 *   })}
 * </p>
 * ```
 *
 * @example
 *
 * ```typescript
 * formatReplacementStringToArray(
 *   'Hi, this is {name}! I like \{curly braces\}! I have a {carInfo} car. My favorite food is {food}.',
 *   { name: ['Bill'], carInfo: { year: 2015, color: 'blue' } }
 * );
 *
 * =>
 *
 * ['Hi, this is ', ['Bill'], '! I like {curly braces}! I have a ', { year: 2015, color: 'blue' }, ' car. My favorite food is food.']
 * ```
 *
 * @param str String to format and break out into an array of objects
 * @param replacers Object whose keys are replacer keys and whose values are the values with which
 *   to replace `{replacer key}`s found in the string to format. If the replacer value is a string,
 *   it will be concatenated into existing strings in the array. Otherwise, the replacer value will
 *   be added as a new entry in the array
 * @returns Array of formatted strings and replaced objects
 */
export function formatReplacementStringToArray<T = unknown>(
  str: string,
  replacers: { [key: string | number]: T } | object,
): (string | T)[] {
  /** The compiled list of contents with replacers replaced appropriately */
  const contents: (string | T)[] = [];

  // current index in the string as we go through it
  let i = 0;
  // first index of characters to include in the next plain string added to the content
  let nextIntermediateStartIndex = 0;

  /**
   * Adds some content to the array of contents that is being built and also add the intermediate
   * string between the last added content and this added content
   *
   * @param newContent Content to add
   * @param newContentIndex Position in string where newContent starts
   * @param newContentLength Length in the string of the representation of this newContent
   */
  function addToContents(
    newContent: string | T,
    newContentIndex: number,
    newContentLength: number,
  ) {
    // Get the string content between the last new content and this new content
    const intermediateContent = substring(str, nextIntermediateStartIndex, newContentIndex);

    // If the last item in contents is a string, pull it out and add intermediateContent to
    // it. Otherwise stick with just intermediateContent
    const baseSubstring =
      contents.length > 0 && isString(contents[contents.length - 1])
        ? `${contents.pop()}${intermediateContent}`
        : intermediateContent;

    if (isString(newContent)) {
      // If the new content is a string, add it all together
      contents.push(`${baseSubstring}${newContent}`);
    } else {
      // New content is not a string. Add the base string if it exists (don't add an
      // empty string between added contents), then add the new content separately
      if (baseSubstring) contents.push(baseSubstring);
      contents.push(newContent);
    }

    // Set the intermediate start index to right after the new content so whatever
    // string content is between replacers gets added
    nextIntermediateStartIndex = newContentIndex + newContentLength;
  }

  const strLength = stringLength(str);
  while (i < strLength) {
    switch (charAt(str, i)) {
      case '{':
        if (charAt(str, i - 1) !== '\\') {
          // This character is an un-escaped open curly brace. Try to match and replace
          const closeCurlyBraceIndex = indexOfClosestClosingCurlyBrace(str, i, false);
          if (closeCurlyBraceIndex >= 0) {
            // We have matching open and close indices. Try to replace the contents
            const replacerKey = substring(str, i + 1, closeCurlyBraceIndex);

            // Replace with the replacer or just remove the curly braces
            const replacerContent =
              replacerKey in replacers
                ? // Just checked that the key is in the object
                  // eslint-disable-next-line no-type-assertion/no-type-assertion
                  replacers[replacerKey as keyof typeof replacers]
                : replacerKey;

            addToContents(replacerContent, i, closeCurlyBraceIndex + 1 - i);

            // Put our index at the closing brace to keep processing the string after it
            i = closeCurlyBraceIndex;
            // Set the intermediate start index to right after our closing curly brace so whatever
            // string content is between replacers gets added
            nextIntermediateStartIndex = closeCurlyBraceIndex + 1;
          } else {
            // This is an unexpected un-escaped open curly brace with no matching closing curly
            // brace. Just ignore, I guess
          }
        } else {
          // This character is an escaped open curly brace. Add the curly brace but skip over the
          // escape backslash
          addToContents('{', i - 1, 2);
        }
        break;
      case '}':
        if (charAt(str, i - 1) !== '\\') {
          // This character is an un-escaped closing curly brace with no matching open curly
          // brace. Just ignore, I guess
        } else {
          // This character is an escaped closing curly brace. Add the curly brace but skip over
          // the escape backslash
          addToContents('}', i - 1, 2);
        }
        break;
      default:
        // No need to do anything with other characters at this point
        break;
    }

    i += 1;
  }

  // Now we are through the whole string and need to add the string content after all replacers if
  // there is anything left
  if (nextIntermediateStartIndex < strLength) {
    // Get the string content between the last new content and this new content
    const endContent = substring(str, nextIntermediateStartIndex);

    // If the last item in contents is a string, pull it out and add endContent to
    // it. Then put it in the contents array
    contents.push(
      contents.length > 0 && isString(contents[contents.length - 1])
        ? `${contents.pop()}${endContent}`
        : endContent,
    );
  }

  return contents;
}

/**
 * Formats a string, replacing `{replacer key}` with the value in the `replacers` at that replacer
 * key (or multiple replacer values if there are multiple in the string). Will also remove \ before
 * curly braces if curly braces are escaped with a backslash in order to preserve the curly braces.
 * E.g. 'Hi, this is {name}! I like `\{curly braces\}`! would become Hi, this is Jim! I like {curly
 * braces}!
 *
 * If the key in unescaped braces is not found, returns the key without the braces. Empty unescaped
 * curly braces will just return a string without the braces e.g. ('I am {Nemo}', { 'name': 'Jim'})
 * would return 'I am Nemo'.
 *
 * @example
 *
 * ```typescript
 * formatReplacementString(
 *   'Hi, this is {name}! I like \{curly braces\}! I have a {carColor} car. My favorite food is {food}.',
 *   { name: 'Bill', carColor: 'blue' }
 * );
 *
 * =>
 *
 * 'Hi, this is Bill! I like {curly braces}! I have a blue car. My favorite food is food.'
 * ```
 *
 * @param str String to format
 * @param replacers Object whose keys are replacer keys and whose values are the values with which
 *   to replace `{replacer key}`s found in the string to format. Will be coerced to strings using
 *   `${replacerValue}`
 * @returns Formatted string
 */
export function formatReplacementString(
  str: string,
  replacers: { [key: string | number]: string | unknown } | object,
): string {
  return formatReplacementStringToArray(str, replacers)
    .map((content) => `${content}`)
    .join('');
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
export function includes(
  string: string | SegmentedString,
  searchString: string | SegmentedString,
  position: number = 0,
): boolean {
  // const partialString = substring(string, position);
  const indexOfSearchString = indexOf(string, searchString, position);
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
  string: string | SegmentedString,
  searchString: string | SegmentedString,
  position: number = 0,
): number {
  const segString: SegmentedString = ensureSegmentedString(string);
  const segSearchString: SegmentedString = ensureSegmentedString(searchString);
  const stringLen: number = stringLength(segString);
  const searchStringLen: number = stringLength(segSearchString);

  if (searchStringLen === 0) return -1;

  const searchableIndex: number = stringLen - searchStringLen;
  if (searchableIndex < 0) return -1;
  let cleanPosition = position;
  if (cleanPosition < 0) cleanPosition = 0;
  if (cleanPosition > searchableIndex) return -1;

  for (let index = cleanPosition; index <= searchableIndex; index++) {
    if (charAt(segString, index) === charAt(segSearchString, 0)) {
      if (searchStringLen === 1) {
        // charAt did the work, we can exit now.
        return index;
      }
      if (substr(segString, index, searchStringLen) === segSearchString.string) {
        return index;
      }
    }
  }
  return -1;
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
export function lastIndexOf(
  string: string | SegmentedString,
  searchString: string | SegmentedString,
  position?: number,
): number {
  const segString: SegmentedString = ensureSegmentedString(string);
  const segSearchString: SegmentedString = ensureSegmentedString(searchString);
  const stringLen: number = stringLength(segString);
  const searchStringLen: number = stringLength(segSearchString);

  if (searchStringLen === 0) return -1;

  const searchableIndex: number = stringLen - searchStringLen;
  if (searchableIndex < 0) return -1;

  let validatedPosition = position === undefined ? searchableIndex : position;

  if (validatedPosition < 0) {
    validatedPosition = 0;
  } else if (validatedPosition >= stringLen) {
    validatedPosition = stringLen - 1;
  }

  for (let index = validatedPosition; index >= 0; index--) {
    if (charAt(segString, index) === charAt(segSearchString, 0)) {
      if (searchStringLen === 1) {
        // charAt did the work, we can exit now.
        return index;
      }
      if (substr(segString, index, searchStringLen) === segSearchString.string) {
        return index;
      }
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
export function stringLength(string: string | SegmentedString): number {
  const ss: SegmentedString = ensureSegmentedString(string);
  return ss.segments.length;
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
  string: string | SegmentedString,
  begin: number = 0,
  len: number | undefined = undefined,
): string {
  const ss: SegmentedString = ensureSegmentedString(string);
  const stringLen: number = stringLength(ss);
  let cleanBegin = begin;
  if (cleanBegin >= stringLen) return '';
  if (cleanBegin < 0) cleanBegin += stringLen;
  if (cleanBegin < 0) cleanBegin = 0;

  let cleanLen = len;
  if (cleanLen === undefined) cleanLen = stringLen - cleanBegin;
  if (cleanLen > stringLen) cleanLen = stringLen;
  if (cleanLen < 0) return '';

  const start = ss.indecies.at(cleanBegin);
  const end =
    cleanBegin === stringLength(ss) - 1 ? ss.string.length : ss.indecies.at(cleanBegin + cleanLen);
  if (start === undefined || end === undefined) {
    return '';
  }
  return ss.string.substring(start, end);
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
  string: string | SegmentedString,
  begin: number,
  end: number | undefined = undefined,
): string {
  const ss: SegmentedString = ensureSegmentedString(string);
  const stringLen: number = stringLength(ss);
  const cleanEnd: number = end === undefined ? stringLen : end;
  if (begin < 0 || begin >= stringLen) return '';
  // NOTE(mattg): end is inclusive I guess?
  if (cleanEnd < 0 || cleanEnd > stringLen) return '';
  if (cleanEnd < begin) return '';

  const start = ss.indecies.at(begin);
  const newEnd = ss.indecies.at(cleanEnd);
  if (start === undefined || newEnd === undefined) {
    return '';
  }
  return ss.string.substring(start, newEnd);
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

/** Determine whether the string is a `LocalizeKey` meant to be localized in Platform.Bible. */
export function isLocalizeKey(str: string): str is LocalizeKey {
  return startsWith(str, '%') && endsWith(str, '%');
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

/** This is an internal-only export for testing purposes and should not be used in development */
export const testingStringUtils = {
  indexOfClosestClosingCurlyBrace,
  substr,
};
