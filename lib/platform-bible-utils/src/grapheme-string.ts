import { toArray as stringzToArray } from 'stringz';
import { isString } from './util';

/** Largest value `ToUint32` can produce — the limit native `String.prototype.split` uses by default. */
const MAX_UINT32 = 2 ** 32 - 1;

/**
 * Largest padding target the padding methods accept, in graphemes.
 *
 * This is the one place the class deliberately stops short of native. Native pads into a compact
 * character buffer and gives up only at V8's string limit (`2**29 - 24`); a `GraphemeString` holds
 * one string object per grapheme, so the same target costs roughly an order of magnitude more
 * memory and exhausts the heap well before reaching it. Measured on the padding path: `2**20` costs
 * ~9ms and ~9MB, `2**24` costs ~173ms and ~130MB, and V8's own limit cannot be reached at all.
 *
 * A million graphemes of padding is already far past any display or formatting use, so the limit is
 * set where the cost is still negligible rather than where the engine finally gives out. Exceeding
 * it throws `RangeError`, as native does for its own limit.
 */
export const MAX_PADDING_LENGTH = 2 ** 20;

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
  // `<= 0` rather than `< 0` so that `-0` clamps to `+0`. `Math.trunc(-0.5)` is `-0`, which is not
  // less than 0, so a `< 0` test would let the negative zero through to callers that return it.
  if (integer <= 0) return 0;
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
 * segmentation carries into the result instead of being recomputed. Call `toString()` for the
 * text.
 *
 * @example
 *
 * ```ts
 * // Segment once, then run as many operations as you like against that work.
 * const name = new GraphemeString('👨‍👩‍👧‍👦 Family');
 * name.length; // 8 — the family emoji counts as one
 * name.slice(0, 1).toString(); // '👨‍👩‍👧‍👦' — never cuts a cluster in half
 * name.indexOf('Family'); // 2
 * ```
 */
export class GraphemeString {
  /**
   * The raw string. Used for `toString`, the native scans behind search, and regex split. Not
   * `readonly` only because {@link fromSegmented} assigns it; treat it as immutable after
   * construction, since {@link offsetsCache} is derived from it.
   */
  private str: string;

  /**
   * Grapheme clusters — source of truth for indexing. Not `readonly` only because
   * {@link fromSegmented} assigns it; treat it as immutable after construction. Must always satisfy
   * `graphemes.join('') === str`, or every index, offset, and search result disagrees with the
   * text.
   */
  private graphemes: string[];

  /** Lazily built cache behind {@link offsets}. */
  private offsetsCache?: number[];

  /**
   * Segment `string` into grapheme clusters once, up front. Every operation on the result reuses
   * that work rather than re-segmenting.
   *
   * @param string The raw string.
   */
  constructor(string: string) {
    this.str = string;
    // PERF: stringz segmentation is the one expensive step, and the empty string never needs it.
    // This also makes the seed instance in `fromSegmented` free.
    this.graphemes = string === '' ? [] : stringzToArray(string);
  }

  /**
   * Number of grapheme clusters. Mirrors `String.prototype.length` in graphemes.
   *
   * @returns Count of grapheme clusters. 0 for the empty string.
   */
  get length(): number {
    return this.graphemes.length;
  }

  /**
   * Build an instance from text plus its already-computed segmentation, skipping stringz entirely.
   * This is how derived instances avoid re-parsing.
   *
   * Private on purpose: the two arguments carry an invariant that nothing validates —
   * `graphemes.join('') === string`. A mismatched pair yields an instance whose `length`, offsets,
   * and search results all silently disagree with its own text. Validating would cost an O(n) join
   * on every derive, which is exactly the work this class exists to avoid, so the invariant is
   * enforced by keeping the door shut instead.
   */
  private static fromSegmented(string: string, graphemes: string[]): GraphemeString {
    const segmented = new GraphemeString('');
    segmented.str = string;
    segmented.graphemes = graphemes;
    return segmented;
  }

  /**
   * The original raw string. Named `toString` rather than exposed as a property so an instance
   * drops straight into a template literal or `String(...)` without an accessor.
   *
   * @returns The raw string this instance was built from, unchanged.
   */
  toString(): string {
    return this.str;
  }

  /**
   * The grapheme clusters as an array. Returns a fresh copy, so mutating it cannot corrupt this
   * instance. Equivalent to spreading this instance, and to spreading a native string except that
   * native yields code points rather than clusters.
   *
   * @returns A new array of the grapheme clusters, in order. Empty for the empty string.
   */
  toArray(): string[] {
    return [...this.graphemes];
  }

  /**
   * Iterate the grapheme clusters, so `Array.from(...)` and spreading behave the way they do on a
   * native string — with clusters as the unit. Without this an instance would read as array-like,
   * and `Array.from` would silently produce a run of `undefined` instead of failing.
   *
   * @returns An iterator over the grapheme clusters, in order.
   */
  *[Symbol.iterator](): IterableIterator<string> {
    yield* this.graphemes;
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
   *
   * @example
   *
   * ```tsx
   * new GraphemeString('Hi, {name}! I like \\{curly braces\\}!').formatReplacementToArray({
   *   name: <b>Alice</b>,
   * });
   * // ['Hi, ', <b>Alice</b>, '! I like {curly braces}!']
   * ```
   *
   * @param replacers Map from key text to its replacement. A key absent from the map is replaced by
   *   the key text itself rather than treated as an error.
   * @returns The formatted parts in order. Adjacent strings are merged into one entry, so a
   *   non-string replacer is always its own entry. Never empty — an unmatched template yields a
   *   single string entry.
   */
  formatReplacementToArray<T = unknown>(
    replacers: { [key: string | number]: T } | object,
  ): (string | T)[] {
    return buildReplacementParts(this, replacers);
  }

  /**
   * {@link formatReplacementToArray} with every part coerced to a string and joined.
   *
   * @example
   *
   * ```ts
   * new GraphemeString('a{n}b').formatReplacement({ n: 9000 }); // 'a9000b'
   * ```
   *
   * @param replacers Map from key text to its replacement. A key absent from the map is replaced by
   *   the key text itself.
   * @returns The formatted string. `''` if this string is empty.
   */
  formatReplacement(replacers: { [key: string | number]: unknown } | object): string {
    return this.formatReplacementToArray(replacers)
      .map((content) => `${content}`)
      .join('');
  }

  /**
   * Mirrors `String.prototype.at`. The grapheme at `index`, or `undefined` if out of bounds.
   * Negative indexes count back from the end.
   *
   * @param index Grapheme index. Negative counts back from the end; fractional truncates toward
   *   zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `undefined` when out of bounds.
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
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `''` when out of bounds.
   */
  charAt(index: number): string {
    const position = toIntegerOrInfinity(index);
    if (position < 0 || position >= this.graphemes.length) return '';
    return this.graphemes[position];
  }

  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The first code point of the grapheme at `index`, or `undefined` when out of bounds.
   */
  codePointAt(index: number): number | undefined {
    const position = toIntegerOrInfinity(index);
    if (position < 0 || position >= this.graphemes.length) return undefined;
    return this.graphemes[position].codePointAt(0);
  }

  /**
   * Mirrors `String.prototype.slice`. Negative indexes count back from the end and a backwards
   * range yields an empty result.
   *
   * @param indexStart First grapheme to include. Defaults to 0; negative counts back from the end.
   * @param indexEnd First grapheme to exclude. Defaults to the end; negative counts back from the
   *   end.
   * @returns A new instance over `[indexStart, indexEnd)`, reusing this instance's segmentation.
   *   Empty when the range is backwards or empty.
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
   *
   * @param begin First grapheme to include. Defaults to 0; negative clamps to 0.
   * @param end First grapheme to exclude. Defaults to the end; negative clamps to 0.
   * @returns A new instance over the range, reusing this instance's segmentation. Empty when
   *   `begin` and `end` resolve to the same index.
   */
  substring(begin?: number, end?: number): GraphemeString {
    const { length } = this.graphemes;
    const first = begin === undefined ? 0 : clampIndex(begin, length);
    const second = end === undefined ? length : clampIndex(end, length);
    return this.derive(Math.min(first, second), Math.max(first, second));
  }

  /**
   * Mirrors `String.prototype.padStart`, padding by whole graphemes so the result is exactly
   * `targetLength` graphemes long. Throws `RangeError` above {@link MAX_PADDING_LENGTH} — a lower
   * ceiling than native's, and the class's one deliberate departure from native behavior.
   *
   * @param targetLength Desired length in graphemes. No padding is added when it is at or below the
   *   current length.
   * @param padString Text to repeat, truncated at a grapheme boundary to hit `targetLength`
   *   exactly. Defaults to a single space; an empty string adds no padding.
   * @returns A new padded instance, or this instance unchanged when no padding is needed.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added. An empty `padString` never pads, so it never throws.
   */
  padStart(targetLength: number, padString?: string): GraphemeString {
    const padding = this.buildPadding(targetLength, padString);
    if (padding.length === 0) return this;
    return GraphemeString.fromSegmented(
      padding.join('') + this.str,
      padding.concat(this.graphemes),
    );
  }

  /**
   * Mirrors `String.prototype.padEnd`. See {@link padStart}, including the `RangeError` ceiling.
   *
   * @param targetLength Desired length in graphemes.
   * @param padString Text to repeat. Defaults to a single space.
   * @returns A new padded instance, or this instance unchanged when no padding is needed.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added.
   */
  padEnd(targetLength: number, padString?: string): GraphemeString {
    const padding = this.buildPadding(targetLength, padString);
    if (padding.length === 0) return this;
    return GraphemeString.fromSegmented(
      this.str + padding.join(''),
      this.graphemes.concat(padding),
    );
  }

  /**
   * Mirrors `String.prototype.indexOf`: the first grapheme index at or after `position` where
   * `searchString` occurs, or -1. A negative `position` clamps to 0, and an empty needle reports
   * the clamped `position` itself. Only a hit that begins and ends on a grapheme boundary counts,
   * so searching for a single emoji that forms part of a larger cluster reports -1 rather than
   * matching inside it.
   *
   * Accepts a raw string or a GraphemeString; the needle is used raw and is never segmented.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to start from. Defaults to 0; negative clamps to 0.
   * @returns The grapheme index of the first match, or `-1` if there is none. An empty needle
   *   returns the clamped `position`.
   */
  indexOf(searchString: string | GraphemeString, position?: number): number {
    const needle = rawNeedle(searchString);
    const start = clampIndex(position ?? 0, this.graphemes.length);
    if (needle === '') return start;
    return this.searchOnBoundaries(needle, this.offsetAt(start), 1);
  }

  /**
   * Mirrors `String.prototype.lastIndexOf`: the last grapheme index at or before `position` where
   * `searchString` occurs, or -1. As in native, an omitted or `NaN` position searches the whole
   * string while a negative one clamps to 0. See {@link indexOf} for the boundary rule.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to search at or before. Omitted or `NaN` searches the whole
   *   string; negative clamps to 0.
   * @returns The grapheme index of the last match, or `-1` if there is none. An empty needle
   *   returns the clamped `position`.
   */
  lastIndexOf(searchString: string | GraphemeString, position?: number): number {
    const needle = rawNeedle(searchString);
    const { length } = this.graphemes;
    // Native converts the position with ToNumber and treats NaN as +Infinity here (not as 0, the way
    // every other position argument does), which is what makes an omitted position search it all.
    const numeric = position === undefined ? NaN : Number(position);
    const start = Number.isNaN(numeric) ? length : clampIndex(numeric, length);
    if (needle === '') return start;
    return this.searchOnBoundaries(needle, this.offsetAt(start), -1);
  }

  /**
   * Mirrors `String.prototype.includes`. See {@link indexOf} for `position` and boundary rules.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to start from. Defaults to 0; negative clamps to 0.
   * @returns `true` if `searchString` occurs on grapheme boundaries at or after `position`. An
   *   empty needle returns `true`.
   */
  includes(searchString: string | GraphemeString, position?: number): boolean {
    return this.indexOf(searchString, position) !== -1;
  }

  /**
   * Mirrors `String.prototype.startsWith`: whether an occurrence of `searchString` begins at
   * `position`. A negative `position` clamps to 0 and an empty needle returns `true`. The match
   * must end on a grapheme boundary, so a prefix ending mid-cluster is rejected.
   *
   * @param searchString Needle to look for. Used raw and never segmented.
   * @param position Grapheme index the match must begin at. Defaults to 0; negative clamps to 0.
   * @returns `true` if `searchString` begins at `position` and ends on a grapheme boundary. An
   *   empty needle returns `true`.
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
   *
   * @param searchString Needle to look for. Used raw and never segmented.
   * @param endPosition Grapheme index the match must end at. Defaults to the end of the string;
   *   negative clamps to 0.
   * @returns `true` if `searchString` ends exactly at `endPosition` and begins on a grapheme
   *   boundary. An empty needle returns `true`.
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
   *
   * @param separator Literal string to split on, raw or as a GraphemeString. Omitted yields the
   *   whole string as a single piece; `''` splits into individual graphemes.
   * @param splitLimit Maximum number of entries to return, converted with `ToUint32`. Anything past
   *   the limit is discarded rather than kept as a final piece. Omitted means no limit.
   * @returns The pieces in order. Empty when `splitLimit` resolves to 0. Never contains `undefined`
   *   — only a capture group can produce one, and a literal separator has none.
   */
  split(separator?: string | GraphemeString, splitLimit?: number): GraphemeString[];
  /**
   * Splitting on a regular expression. See the string overload for the shared rules.
   *
   * @param separator Regular expression to split on. Its capture groups are interleaved into the
   *   result.
   * @param splitLimit Maximum number of entries to return, converted with `ToUint32`.
   * @returns The pieces in order. An entry is `undefined` exactly where a capture group did not
   *   participate in its match, as native does.
   */
  split(separator: RegExp, splitLimit?: number): (GraphemeString | undefined)[];
  split(
    separator?: string | GraphemeString | RegExp,
    splitLimit?: number,
  ): (GraphemeString | undefined)[] {
    const limit = splitLimit === undefined ? MAX_UINT32 : toUint32(splitLimit);
    if (limit === 0) return [];
    if (separator === undefined) return [this];
    if (isRegExp(separator)) return this.splitOnRegExp(separator, limit);
    return this.splitOnString(rawNeedle(separator), limit);
  }

  /**
   * The scan behind {@link indexOf} and {@link lastIndexOf}.
   *
   * PERF: native `String.indexOf`/`lastIndexOf` do the scanning (C++); this only validates that a
   * hit begins AND ends on grapheme boundaries, and steps one UTF-16 unit past a rejected hit to
   * resume. That rejection is what keeps a needle matching inside a cluster from counting.
   *
   * @param needle Raw, already-unwrapped needle. Never empty — both callers handle that first.
   * @param startOffset UTF-16 offset to begin scanning from.
   * @param direction `1` to scan forward, `-1` to scan backward.
   * @returns The grapheme index of the first hit on boundaries, or `-1`.
   */
  private searchOnBoundaries(needle: string, startOffset: number, direction: 1 | -1): number {
    let from = startOffset;
    for (;;) {
      const index =
        direction === 1 ? this.str.indexOf(needle, from) : this.str.lastIndexOf(needle, from);
      if (index < 0) return -1;
      const graphemeIndex = this.graphemeIndexAtOffset(index);
      if (graphemeIndex >= 0 && this.isBoundary(index + needle.length)) return graphemeIndex;
      // Scanning backward from offset 0 has nowhere left to go; forward is bounded by native.
      if (direction === -1 && index === 0) return -1;
      from = index + direction;
    }
  }

  /** Split on a literal separator, in grapheme space. See {@link split}. */
  private splitOnString(separator: string, limit: number): GraphemeString[] {
    const { length } = this.graphemes;
    if (separator === '') {
      return this.graphemes
        .slice(0, Math.min(limit, length))
        .map((grapheme) => GraphemeString.fromSegmented(grapheme, [grapheme]));
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
    // The spec matches stickily at each position in turn; scanning globally is far cheaper, so a
    // caller's `y` flag is dropped and `g` is ensured. The two are not equivalent, though: a `u`/`v`
    // regex rounds a `lastIndex` that lands inside a surrogate pair back to the pair's start, so the
    // scan can be handed a match that begins *before* where it resumed. Left unchecked that pins a
    // CPU core, which is why every `searchOffset` assignment below forces forward progress instead
    // of trusting `match.index`.
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
      // Each `searchOffset` assignment below is floored at `searchOffset + 1` so the scan always
      // moves forward. A match reported before where this pass resumed was already considered by an
      // earlier pass, so nothing is skipped by refusing to go back to it.
      const minimumNextOffset = searchOffset + 1;
      if (matchStart < 0 || !this.isBoundary(matchEndOffset)) {
        // Straddles a grapheme boundary, so it cannot split a grapheme-indexed string.
        searchOffset = Math.max(match.index + 1, minimumNextOffset);
      } else {
        const matchEnd =
          matchEndOffset >= this.str.length ? length : this.graphemeIndexAtOffset(matchEndOffset);
        if (matchEnd === pieceStart) {
          // A zero-width match at the piece start would make no progress; skip one grapheme.
          if (matchStart + 1 >= length) break;
          searchOffset = Math.max(this.offsets()[matchStart + 1], minimumNextOffset);
        } else {
          result.push(this.derive(pieceStart, matchStart));
          if (result.length === limit) return result;
          for (let group = 1; group < match.length; group++) {
            const capture = match[group];
            result.push(capture === undefined ? undefined : new GraphemeString(capture));
            if (result.length === limit) return result;
          }
          pieceStart = matchEnd;
          searchOffset = Math.max(matchEndOffset, minimumNextOffset);
        }
      }
    }
    result.push(this.derive(pieceStart, length));
    return result;
  }

  /**
   * UTF-16 start offset of each grapheme, where `offsets.length === graphemes.length`.
   *
   * PERF: built on first use rather than in the constructor. Only the search and range methods need
   * it; `length`, the point accessors, and the padding methods do not, and those are both the
   * cheapest and the most frequent operations — building it eagerly taxes them for nothing.
   */
  private offsets(): number[] {
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

  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  private buildPadding(targetLength: number, padString?: string): string[] {
    const maxLength = toLength(targetLength);
    if (maxLength <= this.graphemes.length) return [];
    // A non-string filler is coerced exactly as native's `ToString` does, before it reaches stringz
    // — which otherwise throws a bare "A string is expected as input" naming neither method nor
    // argument.
    const filler = padString === undefined ? ' ' : `${padString}`;
    // The pad string is segmented here rather than taken pre-segmented: it is tiny and never a
    // hot-loop culprit, so accepting a raw string is the ergonomic choice.
    const fillGraphemes = stringzToArray(filler);
    // An empty filler pads nothing at any target, as native's `StringPad` does. Answered before the
    // ceiling below, which exists to bound an allocation this path never makes.
    if (fillGraphemes.length === 0) return [];
    // Check before allocating, so an out-of-range target fails immediately instead of grinding
    // through — or dying on — a multi-million-element array first.
    if (maxLength > MAX_PADDING_LENGTH)
      throw new RangeError(
        `Invalid string length: padding to ${maxLength} graphemes exceeds the limit of ${MAX_PADDING_LENGTH}`,
      );
    const count = maxLength - this.graphemes.length;
    const padding: string[] = new Array(count);
    for (let i = 0; i < count; i++) padding[i] = fillGraphemes[i % fillGraphemes.length];
    return padding;
  }

  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  private offsetAt(index: number): number {
    const offsets = this.offsets();
    return index < offsets.length ? offsets[index] : this.str.length;
  }

  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  private graphemeSpan(index: number, needle: string): number {
    const endOffset = this.offsets()[index] + needle.length;
    if (endOffset >= this.str.length) return this.graphemes.length - index;
    return this.graphemeIndexAtOffset(endOffset) - index;
  }

  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  private derive(begin: number, end: number): GraphemeString {
    if (begin >= end) return new GraphemeString('');
    // PERF: slice the parent string via cached offsets (single native call) and reuse
    // the parent grapheme slice, so the child never re-segments.
    return GraphemeString.fromSegmented(
      this.str.substring(this.offsetAt(begin), this.offsetAt(end)),
      this.graphemes.slice(begin, end),
    );
  }

  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  private graphemeIndexAtOffset(utf16Offset: number): number {
    const offsets = this.offsets();
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

/**
 * Whether a value is a `RegExp`, including one built in another realm. Electron runs the renderer,
 * the extension host, and each WebView iframe in separate realms, and this package is loaded into
 * all of them, so `instanceof RegExp` would silently mistake a foreign regex for a literal string.
 */
function isRegExp(value: unknown): value is RegExp {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * Extract the raw string form of a search needle (string or GraphemeString). A non-string is
 * coerced exactly as native's `ToString` does — including throwing on a `Symbol` — so an untyped JS
 * caller sees native's behavior rather than a `TypeError` about a missing method.
 */
function rawNeedle(searchString: string | GraphemeString): string {
  return typeof searchString === 'string' ? searchString : `${searchString}`;
}

/**
 * Index of the closest closing curly brace at/after `index`, or -1. When `escaped`, targets `\}`
 * and returns the index of the brace (not the backslash).
 */
function indexOfClosestClosingCurlyBrace(
  graphemeString: GraphemeString,
  index: number,
  escaped: boolean,
): number {
  if (index < 0) return -1;
  if (escaped) {
    if (graphemeString.charAt(index) === '}' && graphemeString.charAt(index - 1) === '\\')
      return index;
    const closeIndex = graphemeString.indexOf('\\}', index);
    return closeIndex >= 0 ? closeIndex + 1 : closeIndex;
  }

  let i = index;
  const len = graphemeString.length;
  while (i < len) {
    i = graphemeString.indexOf('}', i);
    if (i === -1 || graphemeString.charAt(i - 1) !== '\\') break;
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
  graphemeString: GraphemeString,
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
    const intermediateContent = graphemeString
      .slice(nextIntermediateStartIndex, newContentIndex)
      .toString();
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

  const strLength = graphemeString.length;
  while (i < strLength) {
    const prev = graphemeString.charAt(i - 1);
    switch (graphemeString.charAt(i)) {
      case '{':
        if (prev !== '\\') {
          const closeCurlyBraceIndex = indexOfClosestClosingCurlyBrace(graphemeString, i, false);
          if (closeCurlyBraceIndex >= 0) {
            const replacerKey = graphemeString.slice(i + 1, closeCurlyBraceIndex).toString();
            // Own properties only. `in` would walk the prototype chain, so `{toString}` in a
            // localized template would substitute `Object.prototype.toString`'s source text
            // instead of being left as the unknown key it is.
            const replacerContent = Object.hasOwn(replacers, replacerKey)
              ? // `Object.hasOwn` is a narrowing check; the cast is sound.
                // eslint-disable-next-line no-type-assertion/no-type-assertion
                replacers[replacerKey as keyof typeof replacers]
              : replacerKey;
            addToContents(replacerContent, i, closeCurlyBraceIndex + 1 - i);
            i = closeCurlyBraceIndex;
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
    const endContent = graphemeString.slice(nextIntermediateStartIndex).toString();
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
