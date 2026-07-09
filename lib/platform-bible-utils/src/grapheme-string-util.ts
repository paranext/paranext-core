import { toArray as stringzToArray } from 'stringz';
import { isString } from './util';

/**
 * A string pre-segmented into Unicode grapheme clusters. Segmentation happens once in the
 * constructor (the expensive step); every other operation reuses it. Derived values
 * (substring/slice/etc.) reuse the parent grapheme slice and never re-segment.
 */
export class GraphemeString {
  /** The raw string. Used for `.string`, `normalize`, `ordinalCompare`, regex split. */
  private readonly str: string;

  /** Grapheme clusters — source of truth for indexing. Treat as read-only. */
  private readonly graphemes: string[];

  /** UTF-16 start offset of each grapheme. `offsets.length === graphemes.length`. */
  private readonly offsets: number[];

  /**
   * @param string The raw string.
   * @param graphemes Optional precomputed grapheme array. When provided, segmentation is skipped
   *   entirely — this is how derived instances avoid re-parsing.
   */
  constructor(string: string, graphemes?: string[]) {
    this.str = string;
    // PERF: stringz segmentation is the one expensive step. Skip it when a caller
    // already has the grapheme array (e.g. a substring reusing the parent's slice).
    this.graphemes = graphemes ?? stringzToArray(string);
    // PERF: computing offsets is a cheap O(k) linear pass, NOT segmentation.
    const offsets: number[] = new Array(this.graphemes.length);
    let offset = 0;
    for (let i = 0; i < this.graphemes.length; i++) {
      offsets[i] = offset;
      offset += this.graphemes[i].length;
    }
    this.offsets = offsets;
  }

  /** The original raw string. */
  get string(): string {
    return this.str;
  }

  /** Number of grapheme clusters. */
  get length(): number {
    return this.graphemes.length;
  }

  /** The grapheme clusters as an array. Treat the result as read-only. */
  toArray(): string[] {
    return this.graphemes;
  }

  /**
   * The grapheme at `index`, or `undefined` if out of bounds. Negative indexes count from the end
   * (`-1` is the last grapheme). No wraparound: an index outside `[-length, length-1]` returns
   * `undefined`.
   */
  at(index: number): string | undefined {
    const i = index < 0 ? index + this.graphemes.length : index;
    if (i < 0 || i >= this.graphemes.length) return undefined;
    return this.graphemes[i];
  }

  /** Like {@link at} but returns `''` (not `undefined`) when out of bounds. */
  charAt(index: number): string {
    return this.at(index) ?? '';
  }

  /**
   * The Unicode code point of the first code point of the grapheme at `index`, or `undefined` if
   * out of bounds. For multi-code-point graphemes this is only the first code point.
   */
  codePointAt(index: number): number | undefined {
    return this.at(index)?.codePointAt(0);
  }

  /**
   * A grapheme-accurate substring. Negative indexes count from the end; indexes are clamped to
   * bounds (no wraparound); `begin >= end` yields an empty result (no argument swapping, unlike JS
   * `String.substring`). Returns a new GraphemeString.
   */
  substring(begin: number, end: number = this.graphemes.length): GraphemeString {
    return this.derive(this.resolveRangeIndex(begin), this.resolveRangeIndex(end));
  }

  /**
   * Alias-shaped companion to {@link substring}. Under this class's uniform indexing rules `slice`
   * and `substring` behave identically. Returns a new GraphemeString.
   */
  slice(indexStart: number, indexEnd?: number): GraphemeString {
    return this.substring(indexStart, indexEnd);
  }

  /**
   * Pad the start to reach `targetLength` graphemes. If `targetLength <= length`, returns this
   * instance unchanged. Returns a new GraphemeString.
   */
  padStart(targetLength: number, padString: string = ' '): GraphemeString {
    if (targetLength <= this.graphemes.length) return this;
    const pad = buildPad(targetLength - this.graphemes.length, padString);
    if (pad.length === 0) return this;
    return new GraphemeString(pad.join('') + this.str, pad.concat(this.graphemes));
  }

  /** Pad the end to reach `targetLength` graphemes. See {@link padStart}. */
  padEnd(targetLength: number, padString: string = ' '): GraphemeString {
    if (targetLength <= this.graphemes.length) return this;
    const pad = buildPad(targetLength - this.graphemes.length, padString);
    if (pad.length === 0) return this;
    return new GraphemeString(this.str + pad.join(''), this.graphemes.concat(pad));
  }

  /**
   * First grapheme index at/after `position` where `searchString` occurs, or -1. Case-sensitive.
   * Negative `position` counts from the end; positions past the end yield -1. An empty needle
   * yields -1. Accepts a raw string or a GraphemeString; the needle is used raw (never segmented).
   */
  indexOf(searchString: string | GraphemeString, position: number = 0): number {
    const needle = rawNeedle(searchString);
    if (needle === '') return -1;
    let p = position < 0 ? position + this.graphemes.length : position;
    if (p < 0) p = 0;
    if (p >= this.graphemes.length) return -1;
    // PERF (candidate A): delegate scanning to native String.indexOf (C++), then validate that
    // the hit begins AND ends on grapheme boundaries.
    let from = this.offsets[p];
    for (;;) {
      const idx = this.str.indexOf(needle, from);
      if (idx < 0) return -1;
      const g = this.graphemeIndexAtOffset(idx);
      if (g >= 0 && this.isBoundary(idx + needle.length)) return g;
      from = idx + 1;
    }
  }

  /**
   * Last grapheme index at/before `position` where `searchString` occurs, or -1. Defaults to
   * searching the whole string. Negative `position` counts from the end. See {@link indexOf}.
   */
  lastIndexOf(searchString: string | GraphemeString, position?: number): number {
    const needle = rawNeedle(searchString);
    if (needle === '' || this.graphemes.length === 0) return -1;
    let p = position === undefined ? this.graphemes.length - 1 : position;
    if (p < 0) p += this.graphemes.length;
    if (p < 0) return -1;
    if (p >= this.graphemes.length) p = this.graphemes.length - 1;
    // PERF (candidate A): native String.lastIndexOf scanning backward + boundary check.
    let from = this.offsets[p];
    for (;;) {
      const idx = this.str.lastIndexOf(needle, from);
      if (idx < 0) return -1;
      const g = this.graphemeIndexAtOffset(idx);
      if (g >= 0 && this.isBoundary(idx + needle.length)) return g;
      if (idx === 0) return -1;
      from = idx - 1;
    }
  }

  /** Case-sensitive containment. See {@link indexOf} for `position` semantics. */
  includes(searchString: string | GraphemeString, position: number = 0): boolean {
    return this.indexOf(searchString, position) !== -1;
  }

  /**
   * Whether the grapheme at `position` begins an occurrence of `searchString`. Negative `position`
   * counts from the end. An empty needle returns `true`.
   */
  startsWith(searchString: string | GraphemeString, position: number = 0): boolean {
    const needle = rawNeedle(searchString);
    if (needle === '') return true;
    const p = this.resolveRangeIndex(position);
    const from = p < this.offsets.length ? this.offsets[p] : this.str.length;
    if (!this.str.startsWith(needle, from)) return false;
    return this.isBoundary(from + needle.length);
  }

  /**
   * Whether `searchString` ends exactly at grapheme `endPosition` (default: the end). Negative
   * `endPosition` counts from the end. An empty needle returns `true`.
   */
  endsWith(
    searchString: string | GraphemeString,
    endPosition: number = this.graphemes.length,
  ): boolean {
    const needle = rawNeedle(searchString);
    if (needle === '') return true;
    const p = this.resolveRangeIndex(endPosition);
    const end = p < this.offsets.length ? this.offsets[p] : this.str.length;
    if (!this.str.endsWith(needle, end)) return false;
    return this.isBoundary(end - needle.length);
  }

  /**
   * Unicode normalization of the raw string. `'none'` returns it unchanged; otherwise delegates to
   * `String.prototype.normalize`.
   */
  normalize(form: 'NFC' | 'NFD' | 'NFKC' | 'NFKD' | 'none'): string {
    if (form === 'none') return this.str;
    return this.str.normalize(form);
  }

  /** Ordinal comparison against another raw string using `localeCompare('en', ...)`. */
  ordinalCompare(otherString: string, options?: Intl.CollatorOptions): number {
    return this.str.localeCompare(otherString, 'en', options);
  }

  /**
   * Split into an array of GraphemeStrings on `separator` (string or RegExp). An empty-string
   * separator splits into individual graphemes. `splitLimit`, if given, splits at most `splitLimit
   *
   * - 1`times and returns at most`splitLimit`pieces, where the final piece is the unsplit remainder
   *   of the string (this differs from native`String.split`, which discards the remainder).
   */
  split(separator: string | RegExp, splitLimit?: number): GraphemeString[] {
    if (splitLimit !== undefined && splitLimit <= 0) return [this];

    if (separator === '') {
      const arr = splitLimit === undefined ? this.graphemes : this.graphemes.slice(0, splitLimit);
      return arr.map((g) => new GraphemeString(g, [g]));
    }

    let regexSeparator = separator;
    if (typeof separator === 'string' || !separator.flags.includes('g')) {
      regexSeparator = new RegExp(separator, 'g');
    }
    const matches = this.str.match(regexSeparator);
    if (!matches) return [this];

    const result: GraphemeString[] = [];
    let current = 0;
    // Bound by matches.length so a splitLimit larger than the match count never indexes past
    // `matches` (which would pass `undefined` to indexOf and throw).
    const limit = Math.min(splitLimit ? splitLimit - 1 : matches.length, matches.length);
    for (let i = 0; i < limit; i++) {
      const matchIndex = this.indexOf(matches[i], current);
      if (matchIndex < 0) break;
      result.push(this.substring(current, matchIndex));
      current = matchIndex + stringzToArray(matches[i]).length;
      if (splitLimit !== undefined && result.length === splitLimit) break;
    }
    result.push(this.substring(current));
    return result;
  }

  /**
   * Resolve a range index: negative counts from the end, then clamp into `[0, length]`. Never
   * wraps. `length` (one past the last grapheme) is a valid result meaning "the end".
   */
  private resolveRangeIndex(index: number): number {
    let i = index < 0 ? index + this.graphemes.length : index;
    // Normalize NaN to 0 explicitly so the clamp below is deterministic rather than
    // relying on NaN comparisons falling through and coercing later.
    if (Number.isNaN(i)) i = 0;
    if (i < 0) i = 0;
    if (i > this.graphemes.length) i = this.graphemes.length;
    return i;
  }

  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  private derive(begin: number, end: number): GraphemeString {
    if (begin >= end) return new GraphemeString('', []);
    // PERF: slice the parent string via cached offsets (single native call) and reuse
    // the parent grapheme slice, so the child never re-segments.
    const startOffset = this.offsets[begin];
    const endOffset = end < this.offsets.length ? this.offsets[end] : this.str.length;
    return new GraphemeString(
      this.str.substring(startOffset, endOffset),
      this.graphemes.slice(begin, end),
    );
  }

  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  private graphemeIndexAtOffset(utf16Offset: number): number {
    const { offsets } = this;
    let lo = 0;
    let hi = offsets.length - 1;
    while (lo <= hi) {
      const mid = Math.floor((lo + hi) / 2);
      const value = offsets[mid];
      if (value === utf16Offset) return mid;
      if (value < utf16Offset) lo = mid + 1;
      else hi = mid - 1;
    }
    return -1;
  }

  /** Whether a UTF-16 offset falls on a grapheme boundary (or the very end of the string). */
  private isBoundary(utf16Offset: number): boolean {
    return utf16Offset === this.str.length || this.graphemeIndexAtOffset(utf16Offset) >= 0;
  }
}

/** Extract the raw string form of a search needle (string or GraphemeString). */
function rawNeedle(searchString: string | GraphemeString): string {
  return typeof searchString === 'string' ? searchString : searchString.string;
}

/** Build a pad grapheme array of exactly `count` graphemes from `padString`. */
function buildPad(count: number, padString: string): string[] {
  // Documented exception to "strict GraphemeString args": padString is segmented here.
  // It is tiny and never a hot-loop culprit, so accepting a raw string is the ergonomic choice.
  const padGraphemes = stringzToArray(padString);
  if (padGraphemes.length === 0) return [];
  const pad: string[] = new Array(count);
  for (let i = 0; i < count; i++) pad[i] = padGraphemes[i % padGraphemes.length];
  return pad;
}

/**
 * Index of the closest closing curly brace at/after `index`, or -1. When `escaped`, targets `\}`
 * and returns the index of the brace (not the backslash).
 */
function indexOfClosestClosingCurlyBrace(
  gs: GraphemeString,
  index: number,
  escaped: boolean,
): number {
  if (index < 0) return -1;
  if (escaped) {
    // Guard i-1: charAt(-1) would return the LAST grapheme under uniform indexing.
    const prev = index > 0 ? gs.charAt(index - 1) : '';
    if (gs.charAt(index) === '}' && prev === '\\') return index;
    const closeIndex = gs.indexOf('\\}', index);
    return closeIndex >= 0 ? closeIndex + 1 : closeIndex;
  }

  let i = index;
  const len = gs.length;
  while (i < len) {
    i = gs.indexOf('}', i);
    const prev = i > 0 ? gs.charAt(i - 1) : '';
    if (i === -1 || prev !== '\\') break;
    i += 1;
  }
  return i >= len ? -1 : i;
}

/**
 * Grapheme-accurate version of `formatReplacementStringToArray`. Segments the input once, then
 * walks it. Replaces `{key}` with `replacers[key]`; unescapes `\{`/`\}`. Adjacent strings are
 * concatenated into one array entry.
 */
export function formatReplacementStringToArray<T = unknown>(
  str: string,
  replacers: { [key: string | number]: T } | object,
): (string | T)[] {
  const gs = new GraphemeString(str);
  const contents: (string | T)[] = [];
  let i = 0;
  let nextIntermediateStartIndex = 0;

  function addToContents(
    newContent: string | T,
    newContentIndex: number,
    newContentLength: number,
  ) {
    const intermediateContent = gs.substring(nextIntermediateStartIndex, newContentIndex).string;
    const baseSubstring =
      contents.length > 0 && isString(contents[contents.length - 1])
        ? `${contents.pop()}${intermediateContent}`
        : intermediateContent;
    if (isString(newContent)) {
      contents.push(`${baseSubstring}${newContent}`);
    } else {
      if (baseSubstring) contents.push(baseSubstring);
      contents.push(newContent);
    }
    nextIntermediateStartIndex = newContentIndex + newContentLength;
  }

  const strLength = gs.length;
  while (i < strLength) {
    const prev = i > 0 ? gs.charAt(i - 1) : '';
    switch (gs.charAt(i)) {
      case '{':
        if (prev !== '\\') {
          const closeCurlyBraceIndex = indexOfClosestClosingCurlyBrace(gs, i, false);
          if (closeCurlyBraceIndex >= 0) {
            const replacerKey = gs.substring(i + 1, closeCurlyBraceIndex).string;
            const replacerContent =
              replacerKey in replacers
                ? // `replacerKey in replacers` is a narrowing check; the cast is sound.
                  // eslint-disable-next-line no-type-assertion/no-type-assertion
                  replacers[replacerKey as keyof typeof replacers]
                : replacerKey;
            addToContents(replacerContent, i, closeCurlyBraceIndex + 1 - i);
            i = closeCurlyBraceIndex;
            nextIntermediateStartIndex = closeCurlyBraceIndex + 1;
          }
        } else {
          addToContents('{', i - 1, 2);
        }
        break;
      case '}':
        if (prev === '\\') addToContents('}', i - 1, 2);
        break;
      default:
        break;
    }
    i += 1;
  }

  if (nextIntermediateStartIndex < strLength) {
    const endContent = gs.substring(nextIntermediateStartIndex).string;
    contents.push(
      contents.length > 0 && isString(contents[contents.length - 1])
        ? `${contents.pop()}${endContent}`
        : endContent,
    );
  }
  return contents;
}

/** Grapheme-accurate `formatReplacementString`: coerces all parts to strings and joins. */
export function formatReplacementString(
  str: string,
  replacers: { [key: string | number]: string | unknown } | object,
): string {
  return formatReplacementStringToArray(str, replacers)
    .map((content) => `${content}`)
    .join('');
}

/** Internal-only export for testing. Do not use in application code. */
export const testingGraphemeStringUtils = {
  indexOfClosestClosingCurlyBrace,
};
