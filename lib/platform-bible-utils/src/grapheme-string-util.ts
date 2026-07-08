import { toArray as stringzToArray } from 'stringz';

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
