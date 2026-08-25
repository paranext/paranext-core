import { toArray as stringzToArray } from 'stringz';
import { isString } from './util';

/** Largest value `ToUint32` can produce — the limit native `String.prototype.split` uses by default. */
const MAX_UINT32 = 2 ** 32 - 1;

/**
 * The ECMAScript `ToIntegerOrInfinity` abstract operation: `NaN` becomes 0, infinities are
 * preserved, and everything else truncates toward zero. Every index argument native `String`
 * accepts passes through this, which is why `'abc'.slice(1.7)` is `'bc'` and `'abc'.charAt(NaN)` is
 * `'a'`.
 */
function toIntegerOrInfinity(value: number): number {
  const number = Number(value);
  if (Number.isNaN(number)) return 0;
  if (number === Infinity || number === -Infinity) return number;
  return Math.trunc(number);
}

/**
 * Resolve a relative index the way `slice` does: negative counts back from the end, then clamp into
 * `[0, length]`.
 */
function relativeIndex(index: number, length: number): number {
  const integer = toIntegerOrInfinity(index);
  if (integer === -Infinity) return 0;
  if (integer < 0) return Math.max(length + integer, 0);
  return Math.min(integer, length);
}

/**
 * Clamp an index into `[0, length]` with no negative-from-end handling — what `substring` and every
 * search position argument do. This is why `'abcab'.indexOf('a', -2)` is 0 and not 3.
 */
function clampIndex(index: number, length: number): number {
  const integer = toIntegerOrInfinity(index);
  if (integer < 0) return 0;
  return Math.min(integer, length);
}

/** The ECMAScript `ToLength` abstract operation, used for the padding methods' target length. */
function toLength(value: number): number {
  const integer = toIntegerOrInfinity(value);
  if (integer <= 0) return 0;
  return Math.min(integer, Number.MAX_SAFE_INTEGER);
}

/**
 * The ECMAScript `ToUint32` abstract operation, used for `split`'s limit. Note the consequences
 * this has in native: a limit of `-1` becomes 4294967295 (effectively no limit), while `NaN` and
 * `Infinity` both become 0 (an empty result).
 */
function toUint32(value: number): number {
  // `>>> 0` IS the ToUint32 operation. Spelling it out arithmetically (modulo 2**32, with sign and
  // non-finite handling) is longer and easier to get wrong than the single idiom the spec itself is
  // defined in terms of.
  // eslint-disable-next-line no-bitwise
  return value >>> 0;
}

/**
 * A string pre-segmented into Unicode grapheme clusters. Segmentation happens once in the
 * constructor (the expensive step); every other operation reuses it. Derived values
 * (substring/slice/etc.) reuse the parent grapheme slice and never re-segment.
 *
 * Every method mirrors its `String.prototype` counterpart exactly — including the edge cases around
 * negative, fractional, `NaN`, and out-of-range arguments — with one substitution: the unit of
 * indexing and length is the grapheme cluster rather than the UTF-16 code unit. So `length` counts
 * what a reader would call characters, `slice` never cuts a cluster in half, and a search only
 * reports a hit that begins and ends on cluster boundaries.
 *
 * The surface is limited to operations that actually need the segmentation: {@link toArray} and
 * {@link formatReplacement} have no native counterpart but do need it, while `normalize` and
 * `ordinalCompare` are deliberately absent, because neither reads the string as characters — they
 * live with the plain string helpers in `string-util` instead.
 *
 * Range and padding methods return a `GraphemeString` rather than a `string` so the parent's
 * segmentation carries into the result instead of being recomputed. Call `.string` for the text.
 */
export class GraphemeString {
  /** The raw string. Used for `.string`, the native scans behind search, and regex split. */
  private readonly str: string;

  /** Grapheme clusters — source of truth for indexing. Treat as read-only. */
  private readonly graphemes: string[];

  /** Lazily built cache behind {@link offsets}. */
  private offsetsCache?: number[];

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
  }

  /** The original raw string. */
  get string(): string {
    return this.str;
  }

  /** Number of grapheme clusters. Mirrors `String.prototype.length` in graphemes. */
  get length(): number {
    return this.graphemes.length;
  }

  /**
   * UTF-16 start offset of each grapheme, where `offsets.length === graphemes.length`.
   *
   * PERF: built on first use rather than in the constructor. Only the search and range methods need
   * it; `length`, the point accessors, and the padding methods do not, and those are both the
   * cheapest and the most frequent operations — building it eagerly taxes them for nothing.
   */
  private get offsets(): number[] {
    if (!this.offsetsCache) {
      const offsets: number[] = new Array(this.graphemes.length);
      let offset = 0;
      for (let i = 0; i < this.graphemes.length; i++) {
        offsets[i] = offset;
        offset += this.graphemes[i].length;
      }
      this.offsetsCache = offsets;
    }
    return this.offsetsCache;
  }

  /** The grapheme clusters as an array. Treat the result as read-only. No native equivalent. */
  toArray(): string[] {
    return this.graphemes;
  }

  /**
   * Replace each `{key}` in this string with `replacers[key]` and unescape `\{`/`\}`. An unknown
   * key is replaced by the key text itself. Adjacent strings are concatenated, so a replacer that
   * is not a string stays its own entry — which is how a React element survives being substituted
   * in.
   *
   * No native counterpart, but it walks the string character by character, so it belongs here
   * rather than beside the plain string helpers: an instance built once from a template can be
   * formatted repeatedly without re-segmenting it.
   */
  formatReplacementToArray<T = unknown>(
    replacers: { [key: string | number]: T } | object,
  ): (string | T)[] {
    return buildReplacementParts(this, replacers);
  }

  /** {@link formatReplacementToArray} with every part coerced to a string and joined. */
  formatReplacement(replacers: { [key: string | number]: string | unknown } | object): string {
    return buildReplacementParts(this, replacers)
      .map((content) => `${content}`)
      .join('');
  }

  /**
   * Mirrors `String.prototype.at`. The grapheme at `index`, or `undefined` if out of bounds.
   * Negative indexes count back from the end.
   */
  at(index: number): string | undefined {
    const integer = toIntegerOrInfinity(index);
    const position = integer < 0 ? integer + this.graphemes.length : integer;
    if (position < 0 || position >= this.graphemes.length) return undefined;
    return this.graphemes[position];
  }

  /**
   * Mirrors `String.prototype.charAt`. The grapheme at `index`, or `''` if out of bounds. Like
   * native — and unlike {@link at} — a negative index is out of bounds rather than counted from the
   * end.
   */
  charAt(index: number): string {
    const position = toIntegerOrInfinity(index);
    if (position < 0 || position >= this.graphemes.length) return '';
    return this.graphemes[position];
  }

  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   */
  codePointAt(index: number): number | undefined {
    const position = toIntegerOrInfinity(index);
    if (position < 0 || position >= this.graphemes.length) return undefined;
    return this.graphemes[position].codePointAt(0);
  }

  /**
   * Mirrors `String.prototype.slice`. Negative indexes count back from the end and a backwards
   * range yields an empty result.
   */
  slice(indexStart?: number, indexEnd?: number): GraphemeString {
    const { length } = this.graphemes;
    const from = indexStart === undefined ? 0 : relativeIndex(indexStart, length);
    const to = indexEnd === undefined ? length : relativeIndex(indexEnd, length);
    return this.derive(from, to);
  }

  /**
   * Mirrors `String.prototype.substring`. Negative indexes clamp to 0 rather than counting from the
   * end, and — as in native — the arguments are swapped when `begin` is greater than `end`.
   */
  substring(begin?: number, end?: number): GraphemeString {
    const { length } = this.graphemes;
    const first = begin === undefined ? 0 : clampIndex(begin, length);
    const second = end === undefined ? length : clampIndex(end, length);
    return this.derive(Math.min(first, second), Math.max(first, second));
  }

  /**
   * Mirrors `String.prototype.padStart`, padding by whole graphemes so the result is exactly
   * `targetLength` graphemes long.
   */
  padStart(targetLength: number, padString?: string): GraphemeString {
    const padding = this.buildPadding(targetLength, padString);
    if (padding.length === 0) return this;
    return new GraphemeString(padding.join('') + this.str, padding.concat(this.graphemes));
  }

  /** Mirrors `String.prototype.padEnd`. See {@link padStart}. */
  padEnd(targetLength: number, padString?: string): GraphemeString {
    const padding = this.buildPadding(targetLength, padString);
    if (padding.length === 0) return this;
    return new GraphemeString(this.str + padding.join(''), this.graphemes.concat(padding));
  }

  /**
   * Mirrors `String.prototype.indexOf`: the first grapheme index at or after `position` where
   * `searchString` occurs, or -1. A negative `position` clamps to 0, and an empty needle reports
   * the clamped `position` itself. Only a hit that begins and ends on a grapheme boundary counts,
   * so searching for a single emoji that forms part of a larger cluster reports -1 rather than
   * matching inside it.
   *
   * Accepts a raw string or a GraphemeString; the needle is used raw and is never segmented.
   */
  indexOf(searchString: string | GraphemeString, position?: number): number {
    const needle = rawNeedle(searchString);
    const start = clampIndex(position ?? 0, this.graphemes.length);
    if (needle === '') return start;
    // PERF: delegate scanning to native String.indexOf (C++), then validate that the hit begins
    // AND ends on grapheme boundaries.
    let from = this.offsetAt(start);
    for (;;) {
      const index = this.str.indexOf(needle, from);
      if (index < 0) return -1;
      const graphemeIndex = this.graphemeIndexAtOffset(index);
      if (graphemeIndex >= 0 && this.isBoundary(index + needle.length)) return graphemeIndex;
      from = index + 1;
    }
  }

  /**
   * Mirrors `String.prototype.lastIndexOf`: the last grapheme index at or before `position` where
   * `searchString` occurs, or -1. As in native, an omitted or `NaN` position searches the whole
   * string while a negative one clamps to 0. See {@link indexOf} for the boundary rule.
   */
  lastIndexOf(searchString: string | GraphemeString, position?: number): number {
    const needle = rawNeedle(searchString);
    const { length } = this.graphemes;
    // Native converts the position with ToNumber and treats NaN as +Infinity here (not as 0, the way
    // every other position argument does), which is what makes an omitted position search it all.
    const numeric = position === undefined ? NaN : Number(position);
    const start = Number.isNaN(numeric) ? length : clampIndex(numeric, length);
    if (needle === '') return start;
    // PERF: native String.lastIndexOf scanning backward + boundary check.
    let from = this.offsetAt(start);
    for (;;) {
      const index = this.str.lastIndexOf(needle, from);
      if (index < 0) return -1;
      const graphemeIndex = this.graphemeIndexAtOffset(index);
      if (graphemeIndex >= 0 && this.isBoundary(index + needle.length)) return graphemeIndex;
      if (index === 0) return -1;
      from = index - 1;
    }
  }

  /** Mirrors `String.prototype.includes`. See {@link indexOf} for `position` and boundary rules. */
  includes(searchString: string | GraphemeString, position?: number): boolean {
    return this.indexOf(searchString, position) !== -1;
  }

  /**
   * Mirrors `String.prototype.startsWith`: whether an occurrence of `searchString` begins at
   * `position`. A negative `position` clamps to 0 and an empty needle returns `true`. The match
   * must end on a grapheme boundary, so a prefix ending mid-cluster is rejected.
   */
  startsWith(searchString: string | GraphemeString, position?: number): boolean {
    const needle = rawNeedle(searchString);
    if (needle === '') return true;
    const from = this.offsetAt(clampIndex(position ?? 0, this.graphemes.length));
    if (!this.str.startsWith(needle, from)) return false;
    return this.isBoundary(from + needle.length);
  }

  /**
   * Mirrors `String.prototype.endsWith`: whether an occurrence of `searchString` ends exactly at
   * `endPosition` (default: the end of the string). A negative `endPosition` clamps to 0 and an
   * empty needle returns `true`. The match must begin on a grapheme boundary.
   */
  endsWith(searchString: string | GraphemeString, endPosition?: number): boolean {
    const needle = rawNeedle(searchString);
    if (needle === '') return true;
    const { length } = this.graphemes;
    const end = this.offsetAt(endPosition === undefined ? length : clampIndex(endPosition, length));
    if (!this.str.endsWith(needle, end)) return false;
    return this.isBoundary(end - needle.length);
  }

  /**
   * Mirrors `String.prototype.split`, including the parts that surprise people: a `splitLimit`
   * discards everything past the limit rather than keeping it as a final piece, the limit is
   * converted with `ToUint32` (so `-1` means "no limit" while `NaN` and `Infinity` mean "empty
   * result"), an omitted separator yields the whole string, and a regular expression's capture
   * groups are interleaved into the result.
   *
   * The grapheme substitutions: an empty separator splits into graphemes rather than UTF-16 units,
   * and a separator only matches where it begins and ends on grapheme boundaries.
   *
   * Entries are `undefined` exactly where native produces `undefined` — a capture group that did
   * not participate in the match.
   */
  split(separator?: string | RegExp, splitLimit?: number): (GraphemeString | undefined)[] {
    const limit = splitLimit === undefined ? MAX_UINT32 : toUint32(splitLimit);
    if (limit === 0) return [];
    if (separator === undefined) return [this];
    if (typeof separator === 'string') return this.splitOnString(separator, limit);
    return this.splitOnRegExp(separator, limit);
  }

  /** Split on a literal separator, in grapheme space. See {@link split}. */
  private splitOnString(separator: string, limit: number): GraphemeString[] {
    const { length } = this.graphemes;
    if (separator === '') {
      return this.graphemes
        .slice(0, Math.min(limit, length))
        .map((grapheme) => new GraphemeString(grapheme, [grapheme]));
    }
    if (length === 0) return [this];

    const result: GraphemeString[] = [];
    let pieceStart = 0;
    let searchFrom = 0;
    while (searchFrom < length) {
      const matchIndex = this.indexOf(separator, searchFrom);
      if (matchIndex < 0) break;
      result.push(this.derive(pieceStart, matchIndex));
      if (result.length === limit) return result;
      pieceStart = matchIndex + this.graphemeSpan(matchIndex, separator);
      searchFrom = pieceStart;
    }
    result.push(this.derive(pieceStart, length));
    return result;
  }

  /**
   * Split on a regular expression, in grapheme space. Follows the same shape as the spec's
   * `RegExp.prototype[@@split]`, with two changes: positions advance by whole graphemes, and a
   * match that does not begin and end on grapheme boundaries is skipped as if it had not matched.
   */
  private splitOnRegExp(separator: RegExp, limit: number): (GraphemeString | undefined)[] {
    const { length } = this.graphemes;
    // The spec matches stickily at each position in turn; scanning globally finds the same leftmost
    // match far more cheaply, so a caller's `y` flag is dropped and `g` is ensured.
    const flags = separator.flags.replace('y', '');
    const scanner = new RegExp(separator.source, flags.includes('g') ? flags : `${flags}g`);

    if (length === 0) return scanner.test(this.str) ? [] : [this];

    const result: (GraphemeString | undefined)[] = [];
    let pieceStart = 0;
    let searchOffset = 0;
    while (searchOffset < this.str.length) {
      scanner.lastIndex = searchOffset;
      const match = scanner.exec(this.str);
      if (!match) break;

      const matchEndOffset = match.index + match[0].length;
      const matchStart = this.graphemeIndexAtOffset(match.index);
      if (matchStart < 0 || !this.isBoundary(matchEndOffset)) {
        // Straddles a grapheme boundary, so it cannot split a grapheme-indexed string.
        searchOffset = match.index + 1;
      } else {
        const matchEnd =
          matchEndOffset >= this.str.length ? length : this.graphemeIndexAtOffset(matchEndOffset);
        if (matchEnd === pieceStart) {
          // A zero-width match at the piece start would make no progress; skip one grapheme.
          if (matchStart + 1 >= length) break;
          searchOffset = this.offsets[matchStart + 1];
        } else {
          result.push(this.derive(pieceStart, matchStart));
          if (result.length === limit) return result;
          for (let group = 1; group < match.length; group++) {
            const capture = match[group];
            result.push(capture === undefined ? undefined : new GraphemeString(capture));
            if (result.length === limit) return result;
          }
          pieceStart = matchEnd;
          searchOffset = matchEndOffset;
        }
      }
    }
    result.push(this.derive(pieceStart, length));
    return result;
  }

  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  private buildPadding(targetLength: number, padString?: string): string[] {
    const maxLength = toLength(targetLength);
    if (maxLength <= this.graphemes.length) return [];
    const filler = padString === undefined ? ' ' : padString;
    // Documented exception to "strict GraphemeString args": the pad string is segmented here. It is
    // tiny and never a hot-loop culprit, so accepting a raw string is the ergonomic choice.
    const fillGraphemes = stringzToArray(filler);
    if (fillGraphemes.length === 0) return [];
    const count = maxLength - this.graphemes.length;
    const padding: string[] = new Array(count);
    for (let i = 0; i < count; i++) padding[i] = fillGraphemes[i % fillGraphemes.length];
    return padding;
  }

  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  private offsetAt(index: number): number {
    return index < this.offsets.length ? this.offsets[index] : this.str.length;
  }

  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  private graphemeSpan(index: number, needle: string): number {
    const endOffset = this.offsets[index] + needle.length;
    if (endOffset >= this.str.length) return this.graphemes.length - index;
    return this.graphemeIndexAtOffset(endOffset) - index;
  }

  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  private derive(begin: number, end: number): GraphemeString {
    if (begin >= end) return new GraphemeString('', []);
    // PERF: slice the parent string via cached offsets (single native call) and reuse
    // the parent grapheme slice, so the child never re-segments.
    return new GraphemeString(
      this.str.substring(this.offsetAt(begin), this.offsetAt(end)),
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
    if (gs.charAt(index) === '}' && gs.charAt(index - 1) === '\\') return index;
    const closeIndex = gs.indexOf('\\}', index);
    return closeIndex >= 0 ? closeIndex + 1 : closeIndex;
  }

  let i = index;
  const len = gs.length;
  while (i < len) {
    i = gs.indexOf('}', i);
    if (i === -1 || gs.charAt(i - 1) !== '\\') break;
    i += 1;
  }
  return i >= len ? -1 : i;
}

/**
 * Implementation behind {@link GraphemeString.formatReplacementToArray}. Replaces `{key}` with
 * `replacers[key]` and unescapes `\{`/`\}`, walking a string that is already segmented. Adjacent
 * strings are concatenated into one array entry.
 */
function buildReplacementParts<T = unknown>(
  gs: GraphemeString,
  replacers: { [key: string | number]: T } | object,
): (string | T)[] {
  const contents: (string | T)[] = [];
  let i = 0;
  let nextIntermediateStartIndex = 0;

  function addToContents(
    newContent: string | T,
    newContentIndex: number,
    newContentLength: number,
  ) {
    // `slice`, not `substring`: these indexes are always in order, and slice's no-argument-swapping
    // rule keeps a degenerate range empty instead of silently widening it.
    const intermediateContent = gs.slice(nextIntermediateStartIndex, newContentIndex).string;
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
    const prev = gs.charAt(i - 1);
    switch (gs.charAt(i)) {
      case '{':
        if (prev !== '\\') {
          const closeCurlyBraceIndex = indexOfClosestClosingCurlyBrace(gs, i, false);
          if (closeCurlyBraceIndex >= 0) {
            const replacerKey = gs.slice(i + 1, closeCurlyBraceIndex).string;
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
    const endContent = gs.slice(nextIntermediateStartIndex).string;
    contents.push(
      contents.length > 0 && isString(contents[contents.length - 1])
        ? `${contents.pop()}${endContent}`
        : endContent,
    );
  }
  return contents;
}

/** Internal-only export for testing. Do not use in application code. */
export const testingGraphemeStringUtils = {
  indexOfClosestClosingCurlyBrace,
};
