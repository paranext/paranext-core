var V = Object.defineProperty;
var j = (t, e, s) => e in t ? V(t, e, { enumerable: !0, configurable: !0, writable: !0, value: s }) : t[e] = s;
var O = (t, e, s) => j(t, typeof e != "symbol" ? e + "" : e, s);
import { Canon as N, VerseRef as $ } from "@sillsdev/scripture";
import { USJ_TYPE as X } from "@eten-tech-foundation/scripture-utilities";
import { toArray as w } from "stringz";
function be() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (t) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~t) * 65536 >> t).toString(16).padStart(4, "0")
    )
  );
}
function g(t) {
  return typeof t == "string" || t instanceof String;
}
function xe(t) {
  return JSON.parse(JSON.stringify(t));
}
const K = "Debounced function invocation was canceled";
function Oe(t, e = 300) {
  let s, r, a, n;
  const o = (...h) => (clearTimeout(s), r || (r = new Promise((l, f) => {
    a = l, n = f;
  })), s = setTimeout(async () => {
    try {
      a(await t(...h));
    } catch (l) {
      n(l);
    } finally {
      r = void 0;
    }
  }, e), r);
  return o.cancel = () => {
    clearTimeout(s), r && (n(new Error(K)), r = void 0);
  }, o;
}
function ye(t, e, s) {
  const r = /* @__PURE__ */ new Map();
  return t.forEach((a, n) => {
    const o = e(a, n), h = r.get(o), l = s ? s(a, o, n) : a;
    h ? h.push(l) : r.set(o, [l]);
  }), r;
}
function Z(t) {
  return typeof t == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  t !== null && "message" in t && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof t.message == "string";
}
function q(t) {
  if (Z(t)) return t;
  try {
    return new Error(JSON.stringify(t));
  } catch {
    return new Error(String(t));
  }
}
function D(t) {
  return q(t).message;
}
function U(t) {
  return new Promise((e) => setTimeout(e, t));
}
function we(t, e) {
  const s = U(e).then(() => {
  });
  return Promise.any([s, t()]);
}
async function Be(t, e, s) {
  const r = Math.max(1, (s == null ? void 0 : s.maxAttempts) ?? 3), a = (s == null ? void 0 : s.delayMs) ?? 0;
  let n = 1;
  for (; ; ) {
    const o = await t(n);
    if (e(o) || n >= r) return o;
    n += 1, await U(a);
  }
}
function Te(t, e = "obj") {
  const s = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(t).forEach((a) => {
    try {
      typeof t[a] == "function" && s.add(a);
    } catch {
    }
  });
  let r = Object.getPrototypeOf(t);
  for (; r && Object.getPrototypeOf(r); )
    Object.getOwnPropertyNames(r).forEach((a) => {
      try {
        typeof t[a] == "function" && s.add(a);
      } catch {
      }
    }), r = Object.getPrototypeOf(r);
  return s;
}
function Me(t, e = {}) {
  return new Proxy(e, {
    get(s, r) {
      return r in s ? s[r] : async (...a) => (await t())[r](...a);
    }
  });
}
function Ie(t) {
  const e = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return g(t) ? t.includes(e) : D(t).includes(e);
}
function ke(t) {
  const e = "401 Unauthorized error while getting shared projects.", s = "User registration is not valid. Cannot retrieve resources from DBL.", r = g(t) ? t : D(t);
  return r.includes(e) || r.includes(s);
}
const Y = 2 ** 32 - 1, B = 2 ** 20;
function C(t) {
  const e = Number(t);
  return Number.isNaN(e) ? 0 : e === 1 / 0 || e === -1 / 0 ? e : Math.trunc(e);
}
function T(t, e) {
  const s = C(t);
  return s === -1 / 0 ? 0 : s < 0 ? Math.max(e + s, 0) : Math.min(s, e);
}
function A(t, e) {
  const s = C(t);
  return s <= 0 ? 0 : Math.min(s, e);
}
function Q(t) {
  const e = C(t);
  return e <= 0 ? 0 : Math.min(e, Number.MAX_SAFE_INTEGER);
}
function W(t) {
  return t >>> 0;
}
class u {
  /**
   * Segment `string` into grapheme clusters once, up front. Every operation on the result reuses
   * that work rather than re-segmenting.
   *
   * @param string The raw string.
   */
  constructor(e) {
    /**
     * The raw string. Used for `toString`, the native scans behind search, and regex split. Not
     * `readonly` only because {@link fromSegmented} assigns it; treat it as immutable after
     * construction, since {@link offsetsCache} is derived from it.
     */
    O(this, "str");
    /**
     * Grapheme clusters — source of truth for indexing. Not `readonly` only because
     * {@link fromSegmented} assigns it; treat it as immutable after construction. Must always satisfy
     * `graphemes.join('') === str`, or every index, offset, and search result disagrees with the
     * text.
     */
    O(this, "graphemes");
    /** Lazily built cache behind {@link offsets}. */
    O(this, "offsetsCache");
    this.str = e, this.graphemes = e === "" ? [] : w(e);
  }
  /**
   * Number of grapheme clusters. Mirrors `String.prototype.length` in graphemes.
   *
   * @returns Count of grapheme clusters. 0 for the empty string.
   */
  get length() {
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
  static fromSegmented(e, s) {
    const r = new u("");
    return r.str = e, r.graphemes = s, r;
  }
  /**
   * The original raw string. Named `toString` rather than exposed as a property so an instance
   * drops straight into a template literal or `String(...)` without an accessor.
   *
   * @returns The raw string this instance was built from, unchanged.
   */
  toString() {
    return this.str;
  }
  /**
   * The grapheme clusters as an array. Returns a fresh copy, so mutating it cannot corrupt this
   * instance. Equivalent to spreading this instance, and to spreading a native string except that
   * native yields code points rather than clusters.
   *
   * @returns A new array of the grapheme clusters, in order. Empty for the empty string.
   */
  toArray() {
    return [...this.graphemes];
  }
  /**
   * Iterate the grapheme clusters, so `Array.from(...)` and spreading behave the way they do on a
   * native string — with clusters as the unit. Without this an instance would read as array-like,
   * and `Array.from` would silently produce a run of `undefined` instead of failing.
   *
   * @returns An iterator over the grapheme clusters, in order.
   */
  *[Symbol.iterator]() {
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
  formatReplacementToArray(e) {
    return se(this, e);
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
  formatReplacement(e) {
    return this.formatReplacementToArray(e).map((s) => `${s}`).join("");
  }
  /**
   * Mirrors `String.prototype.at`. The grapheme at `index`, or `undefined` if out of bounds.
   * Negative indexes count back from the end.
   *
   * @param index Grapheme index. Negative counts back from the end; fractional truncates toward
   *   zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `undefined` when out of bounds.
   */
  at(e) {
    const s = C(e), r = s < 0 ? s + this.graphemes.length : s;
    if (!(r < 0 || r >= this.graphemes.length))
      return this.graphemes[r];
  }
  /**
   * Mirrors `String.prototype.charAt`. The grapheme at `index`, or `''` if out of bounds. Like
   * native — and unlike {@link at} — a negative index is out of bounds rather than counted from the
   * end.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `''` when out of bounds.
   */
  charAt(e) {
    const s = C(e);
    return s < 0 || s >= this.graphemes.length ? "" : this.graphemes[s];
  }
  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The first code point of the grapheme at `index`, or `undefined` when out of bounds.
   */
  codePointAt(e) {
    const s = C(e);
    if (!(s < 0 || s >= this.graphemes.length))
      return this.graphemes[s].codePointAt(0);
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
  slice(e, s) {
    const { length: r } = this.graphemes, a = e === void 0 ? 0 : T(e, r), n = s === void 0 ? r : T(s, r);
    return this.derive(a, n);
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
  substring(e, s) {
    const { length: r } = this.graphemes, a = e === void 0 ? 0 : A(e, r), n = s === void 0 ? r : A(s, r);
    return this.derive(Math.min(a, n), Math.max(a, n));
  }
  /**
   * Mirrors `String.prototype.padStart`, padding by whole graphemes so the result is `targetLength`
   * graphemes long. Throws `RangeError` above {@link MAX_PADDING_LENGTH} — a lower ceiling than
   * native's, and the class's one deliberate departure from native behavior.
   *
   * The result is shorter than `targetLength` when the pad string fuses with the text at the seam —
   * a filler ending in a combining mark, for instance. The two cannot both hold, and an honest
   * segmentation wins: every index, search, and slice on the result depends on it.
   *
   * @param targetLength Desired length in graphemes. No padding is added when it is at or below the
   *   current length.
   * @param padString Text to repeat, truncated at a grapheme boundary. Defaults to a single space;
   *   an empty string adds no padding.
   * @returns A new padded instance, or this instance unchanged when no padding is needed. Shorter
   *   than `targetLength` when the padding fuses with the text at the seam.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added. An empty `padString` never pads, so it never throws.
   */
  padStart(e, s) {
    const r = this.buildPadding(e, s);
    return r.length === 0 ? this : new u(r.join("") + this.str);
  }
  /**
   * Mirrors `String.prototype.padEnd`. See {@link padStart}, including the `RangeError` ceiling and
   * the shorter-than-`targetLength` result when the padding fuses with the text at the seam.
   *
   * @param targetLength Desired length in graphemes.
   * @param padString Text to repeat. Defaults to a single space.
   * @returns A new padded instance, or this instance unchanged when no padding is needed. Shorter
   *   than `targetLength` when the padding fuses with the text at the seam.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added.
   */
  padEnd(e, s) {
    const r = this.buildPadding(e, s);
    return r.length === 0 ? this : new u(this.str + r.join(""));
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
  indexOf(e, s) {
    const r = b(e), a = A(s ?? 0, this.graphemes.length);
    return r === "" ? a : this.searchOnBoundaries(r, this.offsetAt(a), 1);
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
  lastIndexOf(e, s) {
    const r = b(e), { length: a } = this.graphemes, n = s === void 0 ? NaN : Number(s), o = Number.isNaN(n) ? a : A(n, a);
    return r === "" ? o : this.searchOnBoundaries(r, this.offsetAt(o), -1);
  }
  /**
   * Mirrors `String.prototype.includes`. See {@link indexOf} for `position` and boundary rules.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to start from. Defaults to 0; negative clamps to 0.
   * @returns `true` if `searchString` occurs on grapheme boundaries at or after `position`. An
   *   empty needle returns `true`.
   */
  includes(e, s) {
    return this.indexOf(e, s) !== -1;
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
  startsWith(e, s) {
    const r = b(e);
    if (r === "") return !0;
    const a = this.offsetAt(A(s ?? 0, this.graphemes.length));
    return this.str.startsWith(r, a) ? this.isBoundary(a + r.length) : !1;
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
  endsWith(e, s) {
    const r = b(e);
    if (r === "") return !0;
    const { length: a } = this.graphemes, n = this.offsetAt(s === void 0 ? a : A(s, a));
    return this.str.endsWith(r, n) ? this.isBoundary(n - r.length) : !1;
  }
  split(e, s) {
    const r = s === void 0 ? Y : W(s);
    return r === 0 ? [] : e === void 0 ? [this] : ee(e) ? this.splitOnRegExp(e, r) : this.splitOnString(b(e), r);
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
  searchOnBoundaries(e, s, r) {
    let a = s;
    for (; ; ) {
      const n = r === 1 ? this.str.indexOf(e, a) : this.str.lastIndexOf(e, a);
      if (n < 0) return -1;
      const o = this.graphemeIndexAtOffset(n);
      if (o >= 0 && this.isBoundary(n + e.length)) return o;
      if (r === -1 && n === 0) return -1;
      a = n + r;
    }
  }
  /** Split on a literal separator, in grapheme space. See {@link split}. */
  splitOnString(e, s) {
    const { length: r } = this.graphemes;
    if (e === "")
      return this.graphemes.slice(0, Math.min(s, r)).map((h) => u.fromSegmented(h, [h]));
    if (r === 0) return [this];
    const a = [];
    let n = 0, o = 0;
    for (; o < r; ) {
      const h = this.indexOf(e, o);
      if (h < 0) break;
      if (a.push(this.derive(n, h)), a.length === s) return a;
      n = h + this.graphemeSpan(h, e), o = n;
    }
    return a.push(this.derive(n, r)), a;
  }
  /**
   * Split on a regular expression, in grapheme space. Follows the same shape as the spec's
   * `RegExp.prototype[@@split]`, with two changes: positions advance by whole graphemes, and a
   * match that does not begin and end on grapheme boundaries is skipped as if it had not matched.
   */
  splitOnRegExp(e, s) {
    const { length: r } = this.graphemes, a = e.flags.replace("y", ""), n = new RegExp(e.source, a.includes("g") ? a : `${a}g`);
    if (r === 0) return n.test(this.str) ? [] : [this];
    const o = [];
    let h = 0, l = 0;
    for (; l < this.str.length; ) {
      n.lastIndex = l;
      const f = n.exec(this.str);
      if (!f) break;
      const m = f.index + f[0].length, i = this.graphemeIndexAtOffset(f.index), p = l + 1;
      if (i < 0 || !this.isBoundary(m))
        l = Math.max(f.index + 1, p);
      else {
        const S = m >= this.str.length ? r : this.graphemeIndexAtOffset(m);
        if (S === h) {
          if (i + 1 >= r) break;
          l = Math.max(this.offsets()[i + 1], p);
        } else {
          if (o.push(this.derive(h, i)), o.length === s) return o;
          for (let E = 1; E < f.length; E++) {
            const d = f[E];
            if (o.push(d === void 0 ? void 0 : new u(d)), o.length === s) return o;
          }
          h = S, l = Math.max(m, p);
        }
      }
    }
    return o.push(this.derive(h, r)), o;
  }
  /**
   * UTF-16 start offset of each grapheme, where `offsets.length === graphemes.length`.
   *
   * PERF: built on first use rather than in the constructor. Only the search and range methods need
   * it; `length`, the point accessors, and the padding methods do not, and those are both the
   * cheapest and the most frequent operations — building it eagerly taxes them for nothing.
   */
  offsets() {
    if (!this.offsetsCache) {
      const e = new Array(this.graphemes.length);
      let s = 0;
      for (let r = 0; r < this.graphemes.length; r++)
        e[r] = s, s += this.graphemes[r].length;
      this.offsetsCache = e;
    }
    return this.offsetsCache;
  }
  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  buildPadding(e, s) {
    const r = Q(e);
    if (r <= this.graphemes.length) return [];
    const a = s === void 0 ? " " : `${s}`, n = w(a);
    if (n.length === 0) return [];
    if (r > B)
      throw new RangeError(
        `Invalid string length: padding to ${r} graphemes exceeds the limit of ${B}`
      );
    const o = r - this.graphemes.length, h = new Array(o);
    for (let l = 0; l < o; l++) h[l] = n[l % n.length];
    return h;
  }
  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  offsetAt(e) {
    const s = this.offsets();
    return e < s.length ? s[e] : this.str.length;
  }
  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  graphemeSpan(e, s) {
    const r = this.offsets()[e] + s.length;
    return r >= this.str.length ? this.graphemes.length - e : this.graphemeIndexAtOffset(r) - e;
  }
  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  derive(e, s) {
    return e >= s ? new u("") : u.fromSegmented(
      this.str.substring(this.offsetAt(e), this.offsetAt(s)),
      this.graphemes.slice(e, s)
    );
  }
  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  graphemeIndexAtOffset(e) {
    const s = this.offsets();
    let r = 0, a = s.length - 1;
    for (; r <= a; ) {
      const n = Math.floor((r + a) / 2), o = s[n];
      if (o === e) return n;
      o < e ? r = n + 1 : a = n - 1;
    }
    return -1;
  }
  /** Whether a UTF-16 offset falls on a grapheme boundary (or the very end of the string). */
  isBoundary(e) {
    return e === this.str.length || this.graphemeIndexAtOffset(e) >= 0;
  }
}
function ee(t) {
  return Object.prototype.toString.call(t) === "[object RegExp]";
}
function b(t) {
  return typeof t == "string" ? t : `${t}`;
}
function te(t, e, s) {
  if (e < 0) return -1;
  if (s) {
    if (t.charAt(e) === "}" && t.charAt(e - 1) === "\\")
      return e;
    const n = t.indexOf("\\}", e);
    return n >= 0 ? n + 1 : n;
  }
  let r = e;
  const a = t.length;
  for (; r < a && (r = t.indexOf("}", r), !(r === -1 || t.charAt(r - 1) !== "\\")); )
    r += 1;
  return r >= a ? -1 : r;
}
function se(t, e) {
  const s = [];
  let r = 0, a = 0;
  function n(h, l, f) {
    const m = t.slice(a, l).toString(), i = s.length > 0 && g(s[s.length - 1]) ? `${s.pop()}${m}` : m;
    g(h) ? s.push(`${i}${h}`) : (i && s.push(i), s.push(h)), a = l + f;
  }
  const o = t.length;
  for (; r < o; ) {
    const h = t.charAt(r - 1);
    switch (t.charAt(r)) {
      case "{":
        if (h !== "\\") {
          const l = te(t, r, !1);
          if (l >= 0) {
            const f = t.slice(r + 1, l).toString(), m = Object.hasOwn(e, f) ? (
              // `Object.hasOwn` is a narrowing check; the cast is sound.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              e[f]
            ) : f;
            n(m, r, l + 1 - r), r = l;
          }
        } else
          n("{", r - 1, 2);
        break;
      case "}":
        h === "\\" && n("}", r - 1, 2);
        break;
    }
    r += 1;
  }
  if (a < o) {
    const h = t.slice(a).toString();
    s.push(
      s.length > 0 && g(s[s.length - 1]) ? `${s.pop()}${h}` : h
    );
  }
  return s;
}
function _(t) {
  return t ? Array.isArray(t) ? t : [t] : [];
}
function Pe(t, e) {
  return new u(t).at(e);
}
function ve(t, e) {
  return new u(t).charAt(e);
}
function Re(t, e) {
  return new u(t).codePointAt(e);
}
function Le(t, e, s) {
  return new u(t).endsWith(e, s);
}
function Je(t, e, s) {
  return new u(t).includes(e, s);
}
function $e(t, e, s) {
  return new u(t).indexOf(e, s);
}
function De(t, e, s) {
  return new u(t).lastIndexOf(e, s);
}
function Ue(t) {
  return new u(t).length;
}
function We(t, e) {
  const s = e.toUpperCase();
  return s === "NONE" ? t : t.normalize(s);
}
function _e(t, e, s) {
  return t.localeCompare(e, "en", s);
}
function Ge(t, e, s) {
  return new u(t).padEnd(e, s).toString();
}
function Fe(t, e, s) {
  return new u(t).padStart(e, s).toString();
}
function He(t, e, s) {
  return new u(t).slice(e, s).toString();
}
function M(t, e, s) {
  const r = new u(t);
  if (e === "") {
    const a = r.toArray();
    return s === void 0 ? a : a.slice(0, W(s));
  }
  return typeof e == "string" ? r.split(e, s).map((a) => a.toString()) : r.split(e, s).map((a) => (a == null ? void 0 : a.toString()) ?? "");
}
function G(t, e, s) {
  return new u(t).startsWith(e, s);
}
function ze(t, e, s) {
  return new u(t).substring(e, s).toString();
}
function Ve(t) {
  return new u(t).toArray();
}
function je(t, e) {
  return new u(t).formatReplacementToArray(e);
}
function Xe(t, e) {
  return new u(t).formatReplacement(e);
}
function Ke(t) {
  const e = new u(t);
  return e.startsWith("%") && e.endsWith("%");
}
function Ze(t) {
  if (typeof t != "string")
    throw new TypeError("Expected a string");
  return t.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function qe(t) {
  return t ? _(t).map(
    (r) => Array.isArray(r) ? r.map((a) => new RegExp(a)) : new RegExp(r)
  ) : [];
}
function Ye(t) {
  return t ? _(t).map((r) => new RegExp(r)) : [];
}
const re = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function x(t) {
  return re.test(t);
}
function Qe(t) {
  let e = "";
  for (let s = 0; s < t.length; s++) {
    const r = t[s];
    if (r === r.toUpperCase() && r !== r.toLowerCase()) {
      if (s > 0) {
        const n = t[s - 1];
        if (!(n === n.toUpperCase() && n !== n.toLowerCase()))
          e += "-";
        else if (s + 1 < t.length) {
          const h = t[s + 1];
          h === h.toLowerCase() && h !== h.toUpperCase() && (e += "-");
        }
      }
      e += r.toLowerCase();
    } else
      e += r;
  }
  return e;
}
function et(t, e) {
  const s = t.split(/\s+/);
  if (s.length <= e * 2 || e < 1)
    return t;
  const r = s.slice(0, e), a = s.slice(-e);
  return [...r, "[...]", ...a].join(" ");
}
const y = ["chapter", "book", "para", "row", "sidebar", X], ae = "​", F = [
  { shortName: "ERR", fullNames: ["ERROR"], chapters: -1 },
  { shortName: "GEN", fullNames: ["Genesis"], chapters: 50 },
  { shortName: "EXO", fullNames: ["Exodus"], chapters: 40 },
  { shortName: "LEV", fullNames: ["Leviticus"], chapters: 27 },
  { shortName: "NUM", fullNames: ["Numbers"], chapters: 36 },
  { shortName: "DEU", fullNames: ["Deuteronomy"], chapters: 34 },
  { shortName: "JOS", fullNames: ["Joshua"], chapters: 24 },
  { shortName: "JDG", fullNames: ["Judges"], chapters: 21 },
  { shortName: "RUT", fullNames: ["Ruth"], chapters: 4 },
  { shortName: "1SA", fullNames: ["1 Samuel"], chapters: 31 },
  { shortName: "2SA", fullNames: ["2 Samuel"], chapters: 24 },
  { shortName: "1KI", fullNames: ["1 Kings"], chapters: 22 },
  { shortName: "2KI", fullNames: ["2 Kings"], chapters: 25 },
  { shortName: "1CH", fullNames: ["1 Chronicles"], chapters: 29 },
  { shortName: "2CH", fullNames: ["2 Chronicles"], chapters: 36 },
  { shortName: "EZR", fullNames: ["Ezra"], chapters: 10 },
  { shortName: "NEH", fullNames: ["Nehemiah"], chapters: 13 },
  { shortName: "EST", fullNames: ["Esther"], chapters: 10 },
  { shortName: "JOB", fullNames: ["Job"], chapters: 42 },
  { shortName: "PSA", fullNames: ["Psalm", "Psalms"], chapters: 150 },
  { shortName: "PRO", fullNames: ["Proverbs"], chapters: 31 },
  { shortName: "ECC", fullNames: ["Ecclesiastes"], chapters: 12 },
  { shortName: "SNG", fullNames: ["Song of Solomon", "Song of Songs"], chapters: 8 },
  { shortName: "ISA", fullNames: ["Isaiah"], chapters: 66 },
  { shortName: "JER", fullNames: ["Jeremiah"], chapters: 52 },
  { shortName: "LAM", fullNames: ["Lamentations"], chapters: 5 },
  { shortName: "EZK", fullNames: ["Ezekiel"], chapters: 48 },
  { shortName: "DAN", fullNames: ["Daniel"], chapters: 12 },
  { shortName: "HOS", fullNames: ["Hosea"], chapters: 14 },
  { shortName: "JOL", fullNames: ["Joel"], chapters: 3 },
  { shortName: "AMO", fullNames: ["Amos"], chapters: 9 },
  { shortName: "OBA", fullNames: ["Obadiah"], chapters: 1 },
  { shortName: "JON", fullNames: ["Jonah"], chapters: 4 },
  { shortName: "MIC", fullNames: ["Micah"], chapters: 7 },
  { shortName: "NAM", fullNames: ["Nahum"], chapters: 3 },
  { shortName: "HAB", fullNames: ["Habakkuk"], chapters: 3 },
  { shortName: "ZEP", fullNames: ["Zephaniah"], chapters: 3 },
  { shortName: "HAG", fullNames: ["Haggai"], chapters: 2 },
  { shortName: "ZEC", fullNames: ["Zechariah"], chapters: 14 },
  { shortName: "MAL", fullNames: ["Malachi"], chapters: 4 },
  { shortName: "MAT", fullNames: ["Matthew"], chapters: 28 },
  { shortName: "MRK", fullNames: ["Mark"], chapters: 16 },
  { shortName: "LUK", fullNames: ["Luke"], chapters: 24 },
  { shortName: "JHN", fullNames: ["John"], chapters: 21 },
  { shortName: "ACT", fullNames: ["Acts"], chapters: 28 },
  { shortName: "ROM", fullNames: ["Romans"], chapters: 16 },
  { shortName: "1CO", fullNames: ["1 Corinthians"], chapters: 16 },
  { shortName: "2CO", fullNames: ["2 Corinthians"], chapters: 13 },
  { shortName: "GAL", fullNames: ["Galatians"], chapters: 6 },
  { shortName: "EPH", fullNames: ["Ephesians"], chapters: 6 },
  { shortName: "PHP", fullNames: ["Philippians"], chapters: 4 },
  { shortName: "COL", fullNames: ["Colossians"], chapters: 4 },
  { shortName: "1TH", fullNames: ["1 Thessalonians"], chapters: 5 },
  { shortName: "2TH", fullNames: ["2 Thessalonians"], chapters: 3 },
  { shortName: "1TI", fullNames: ["1 Timothy"], chapters: 6 },
  { shortName: "2TI", fullNames: ["2 Timothy"], chapters: 4 },
  { shortName: "TIT", fullNames: ["Titus"], chapters: 3 },
  { shortName: "PHM", fullNames: ["Philemon"], chapters: 1 },
  { shortName: "HEB", fullNames: ["Hebrews"], chapters: 13 },
  { shortName: "JAS", fullNames: ["James"], chapters: 5 },
  { shortName: "1PE", fullNames: ["1 Peter"], chapters: 5 },
  { shortName: "2PE", fullNames: ["2 Peter"], chapters: 3 },
  { shortName: "1JN", fullNames: ["1 John"], chapters: 5 },
  { shortName: "2JN", fullNames: ["2 John"], chapters: 1 },
  { shortName: "3JN", fullNames: ["3 John"], chapters: 1 },
  { shortName: "JUD", fullNames: ["Jude"], chapters: 1 },
  { shortName: "REV", fullNames: ["Revelation"], chapters: 22 },
  // DC and other - TJ got book names from Canon.ts and chapter numbers from finding the largest
  // number among all the `.vrs` files in `Paratext/My Paratext Projects`. There were a few books
  // that had varying chapter numbers, and some books that had skipped chapter numbers. This model
  // is just not good enough; we need versification to make a perfect model.
  { shortName: "TOB", fullNames: ["Tobit"], chapters: 14 },
  { shortName: "JDT", fullNames: ["Judith"], chapters: 16 },
  { shortName: "ESG", fullNames: ["Esther Greek"], chapters: 11 },
  { shortName: "WIS", fullNames: ["Wisdom of Solomon"], chapters: 19 },
  { shortName: "SIR", fullNames: ["Sirach (Ecclesiasticus)"], chapters: 52 },
  { shortName: "BAR", fullNames: ["Baruch"], chapters: 6 },
  { shortName: "LJE", fullNames: ["Letter of Jeremiah"], chapters: 1 },
  { shortName: "S3Y", fullNames: ["Song of 3 Young Men"], chapters: 1 },
  { shortName: "SUS", fullNames: ["Susanna"], chapters: 1 },
  { shortName: "BEL", fullNames: ["Bel and the Dragon"], chapters: 1 },
  { shortName: "1MA", fullNames: ["1 Maccabees"], chapters: 16 },
  { shortName: "2MA", fullNames: ["2 Maccabees"], chapters: 15 },
  { shortName: "3MA", fullNames: ["3 Maccabees"], chapters: 7 },
  { shortName: "4MA", fullNames: ["4 Maccabees"], chapters: 18 },
  { shortName: "1ES", fullNames: ["1 Esdras (Greek)"], chapters: 9 },
  { shortName: "2ES", fullNames: ["2 Esdras (Latin)"], chapters: 16 },
  { shortName: "MAN", fullNames: ["Prayer of Manasseh"], chapters: 1 },
  { shortName: "PS2", fullNames: ["Psalm 151"], chapters: 1 },
  { shortName: "ODA", fullNames: ["Odes"], chapters: 14 },
  { shortName: "PSS", fullNames: ["Psalms of Solomon"], chapters: 18 },
  { shortName: "JSA", fullNames: ["Joshua A. *obsolete*"], chapters: 24 },
  { shortName: "JDB", fullNames: ["Judges B. *obsolete*"], chapters: 21 },
  { shortName: "TBS", fullNames: ["Tobit S. *obsolete*"], chapters: 14 },
  { shortName: "SST", fullNames: ["Susanna Th. *obsolete*"], chapters: 1 },
  { shortName: "DNT", fullNames: ["Daniel Th. *obsolete*"], chapters: 12 },
  { shortName: "BLT", fullNames: ["Bel Th. *obsolete*"], chapters: 1 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "XXA", fullNames: ["Extra A"], chapters: 1 },
  { shortName: "XXB", fullNames: ["Extra B"], chapters: 1 },
  { shortName: "XXC", fullNames: ["Extra C"], chapters: 1 },
  { shortName: "XXD", fullNames: ["Extra D"], chapters: 1 },
  { shortName: "XXE", fullNames: ["Extra E"], chapters: 1 },
  { shortName: "XXF", fullNames: ["Extra F"], chapters: 1 },
  { shortName: "XXG", fullNames: ["Extra G"], chapters: 1 },
  { shortName: "FRT", fullNames: ["Front Matter"], chapters: 1 },
  { shortName: "BAK", fullNames: ["Back Matter"], chapters: 1 },
  { shortName: "OTH", fullNames: ["Other Matter"], chapters: 1 },
  { shortName: "3ES", fullNames: ["3 Ezra *obsolete*"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "EZA", fullNames: ["Apocalypse of Ezra"], chapters: 12 },
  { shortName: "5EZ", fullNames: ["5 Ezra (Latin Prologue)"], chapters: 2 },
  { shortName: "6EZ", fullNames: ["6 Ezra (Latin Epilogue)"], chapters: 12 },
  // TJ could not find a number of chapters for these books, so he just set it to 1
  { shortName: "INT", fullNames: ["Introduction"], chapters: 1 },
  { shortName: "CNC", fullNames: ["Concordance "], chapters: 1 },
  { shortName: "GLO", fullNames: ["Glossary "], chapters: 1 },
  { shortName: "TDX", fullNames: ["Topical Index"], chapters: 1 },
  { shortName: "NDX", fullNames: ["Names Index"], chapters: 1 },
  // End of books TJ set to 1 chapter
  { shortName: "DAG", fullNames: ["Daniel Greek"], chapters: 14 },
  { shortName: "PS3", fullNames: ["Psalms 152-155"], chapters: 4 },
  { shortName: "2BA", fullNames: ["2 Baruch (Apocalypse)"], chapters: 77 },
  { shortName: "LBA", fullNames: ["Letter of Baruch"], chapters: 86 },
  { shortName: "JUB", fullNames: ["Jubilees"], chapters: 34 },
  { shortName: "ENO", fullNames: ["Enoch"], chapters: 42 },
  { shortName: "1MQ", fullNames: ["1 Meqabyan"], chapters: 36 },
  { shortName: "2MQ", fullNames: ["2 Meqabyan"], chapters: 20 },
  { shortName: "3MQ", fullNames: ["3 Meqabyan"], chapters: 10 },
  { shortName: "REP", fullNames: ["Reproof (Proverbs 25-31)"], chapters: 6 },
  { shortName: "4BA", fullNames: ["4 Baruch (Rest of Baruch)"], chapters: 5 },
  { shortName: "LAO", fullNames: ["Laodiceans"], chapters: 1 }
], ne = 1, oe = F.length - 1, he = 1, le = 1, tt = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, ce = (t) => {
  var e;
  return ((e = F[t]) == null ? void 0 : e.chapters) ?? -1;
}, st = "";
function rt(t) {
  const e = [], s = Math.min(t.length, N.allBookIds.length);
  for (let r = 0; r < s; r += 1)
    t[r] === "1" && e.push(N.bookNumberToId(r + 1));
  return e;
}
const at = (t, e) => ({
  book: N.bookNumberToId(
    Math.max(
      ne,
      Math.min(N.bookIdToNumber(t.book) + e, oe)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), nt = (t, e) => ({
  ...t,
  chapterNum: Math.min(
    Math.max(he, t.chapterNum + e),
    ce(N.bookIdToNumber(t.book))
  ),
  verseNum: 1
}), ot = (t, e) => ({
  ...t,
  verseNum: Math.max(le, t.verseNum + e)
});
async function ht(t, e, s) {
  const r = N.bookNumberToId(t);
  if (!G(Intl.getCanonicalLocales(e)[0], "zh"))
    return s({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [e]
    });
  const a = await s({
    localizeKey: `Book.${r}`,
    languagesToSearch: [e]
  }), n = M(a, "-");
  return M(n[0], "（")[0].trim();
}
function lt(t) {
  return new $(N.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCC;
}
function I(t) {
  return new $(N.bookIdToNumber(t.book), t.chapterNum, t.verseNum).BBBCCCVVV;
}
function ue(t, e) {
  return I(t) - I(e);
}
function c(t) {
  return `%scrollGroup_${t}%`;
}
const ct = {
  [c("undefined")]: "Ø",
  [c(0)]: "A",
  [c(1)]: "B",
  [c(2)]: "C",
  [c(3)]: "D",
  [c(4)]: "E",
  [c(5)]: "F",
  [c(6)]: "G",
  [c(7)]: "H",
  [c(8)]: "I",
  [c(9)]: "J",
  [c(10)]: "K",
  [c(11)]: "L",
  [c(12)]: "M",
  [c(13)]: "N",
  [c(14)]: "O",
  [c(15)]: "P",
  [c(16)]: "Q",
  [c(17)]: "R",
  [c(18)]: "S",
  [c(19)]: "T",
  [c(20)]: "U",
  [c(21)]: "V",
  [c(22)]: "W",
  [c(23)]: "X",
  [c(24)]: "Y",
  [c(25)]: "Z"
};
function ut(t) {
  return t.map((e) => c(e));
}
function H(t, e) {
  switch (e) {
    case "English":
      return N.bookIdToEnglishName(t.book);
    case "id":
    case void 0:
      return t.book;
    default:
      return e;
  }
}
function ie(t, e) {
  const s = H(t, e == null ? void 0 : e.optionOrLocalizedBookName), r = (e == null ? void 0 : e.bookChapterSeparator) ?? " ", a = (e == null ? void 0 : e.chapterVerseSeparator) ?? ":";
  return `${s}${r}${t.chapterNum}${a}${t.verseNum}`;
}
function it(t, e, s, r) {
  return ie(t, {
    optionOrLocalizedBookName: e,
    chapterVerseSeparator: s,
    bookChapterSeparator: r
  });
}
function fe(t, e) {
  const s = t.verseNum < 0 ? "" : `${e ?? ":"}${t.verseNum}`;
  return t.chapterNum < 0 ? "" : `${t.chapterNum}${s}`;
}
function k(t, e) {
  const s = H(t, e == null ? void 0 : e.optionOrLocalizedBookName), r = fe(
    t,
    e == null ? void 0 : e.chapterVerseSeparator
  );
  return `${s}${s && r ? (e == null ? void 0 : e.bookChapterSeparator) ?? " " : ""}${r}`;
}
function ft(t, e, s) {
  const r = k(t, s);
  if (ue(t, e) === 0) return r;
  const a = t.book === e.book && !(s != null && s.repeatBookName) ? "" : (s == null ? void 0 : s.endRefOptionOrLocalizedBookName) ?? (s == null ? void 0 : s.optionOrLocalizedBookName), n = k(e, {
    ...s,
    optionOrLocalizedBookName: a
  });
  return `${r}${(s == null ? void 0 : s.rangeSeparator) ?? " - "}${n}`;
}
var me = /* @__PURE__ */ ((t) => (t.OT = "OT", t.NT = "NT", t.DC = "DC", t.Extra = "Extra", t))(me || {});
const mt = (t) => {
  if (N.isBookOT(t)) return "OT";
  if (N.isBookNT(t)) return "NT";
  if (N.isBookDC(t)) return "DC";
  if (N.isExtraMaterial(t)) return "Extra";
  throw new Error(`Unknown section for book: ${t}`);
}, Ne = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function P(t) {
  return Ne.test(t);
}
const pe = "‍       　​‌⁠‎‏", ge = new RegExp(
  `^[${pe}]+$`,
  "u"
);
function de(t) {
  return ge.test(t);
}
function v(t) {
  let e = "", s = !1, r = "\0";
  for (let a = 0; a < t.length; a += 1) {
    const n = t[a];
    n.charCodeAt(0) < 32 ? (s || (e += " "), s = !0) : !s && n === ae && a + 1 < t.length && P(t[a + 1]) || (P(n) ? (s || (e += n), s = !0) : de(n) && r === n || (e += n, s = !1)), r = n;
  }
  return e;
}
function R(t) {
  return !t || t.length === 0 ? !0 : t.length === 1 && (t[0] === void 0 || t[0] === "");
}
function L(t) {
  const { length: e } = t;
  let s = e;
  for (; s > 0 && x(t.charAt(s - 1)); ) s -= 1;
  return s === e ? t.toString() : t.slice(0, s).toString();
}
function J(t, e) {
  if (!e || !y.includes(e.type)) return !1;
  if (!e.content)
    throw new Error(
      `Parent ${JSON.stringify(e)} of ${JSON.stringify(t)} does not have a content array! This should not happen!`
    );
  return t === e.content[e.content.length - 1];
}
function z(t, e, s, r) {
  if (!t && !s) return !0;
  if (!t || !s) return !1;
  const a = g(t), n = g(s);
  if (a && n) {
    const o = v(t), h = v(s);
    if (o !== h) {
      const l = new u(o);
      let f;
      const m = () => (f ?? (f = new u(h)), f);
      if (!x(l.at(-1) ?? "") && !x(m().at(-1) ?? "") || !J(t, e) || !J(s, r) || L(l) !== L(m())) return !1;
    }
  } else if (!a && !n) {
    const o = t, h = s, l = Object.keys(o).filter(
      (i) => i !== "content"
    );
    if (l.length !== Object.keys(h).filter((i) => i !== "content").length || l.some((i) => !(i in h) || o[i] !== h[i])) return !1;
    const f = R(o.content), m = R(h.content);
    if (f !== m) return !1;
    if (!f && !m) {
      let i = o.content, p = h.content;
      const S = i[i.length - 1];
      y.includes(o.type) && g(S) && x(S) && (i = i.slice(0, -1));
      const E = p[p.length - 1];
      if (y.includes(h.type) && g(E) && x(E) && (p = p.slice(0, -1)), i.length !== p.length) return !1;
      for (let d = 0; d < i.length; d += 1)
        if (!z(i[d], o, p[d], h))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function Nt(t, e) {
  return z(t, void 0, e, void 0);
}
function pt(t) {
  const e = [], s = /* @__PURE__ */ new Set(), r = (a) => {
    a && a.forEach((n) => {
      if (g(n)) return;
      const { marker: o } = n;
      o && !G(o, "z") && !s.has(o) && (s.add(o), e.push(o)), r(n.content);
    });
  };
  return r(t == null ? void 0 : t.content), e;
}
export {
  Be as $,
  ut as A,
  ht as B,
  mt as C,
  K as D,
  ye as E,
  ne as F,
  u as G,
  Je as H,
  $e as I,
  Ie as J,
  ke as K,
  oe as L,
  B as M,
  Ke as N,
  de as O,
  x as P,
  De as Q,
  be as R,
  pe as S,
  We as T,
  v as U,
  at as V,
  nt as W,
  ot as X,
  _e as Y,
  Ge as Z,
  Fe as _,
  he as a,
  lt as a0,
  I as a1,
  He as a2,
  M as a3,
  G as a4,
  Ue as a5,
  ze as a6,
  Ve as a7,
  Qe as a8,
  Ye as a9,
  qe as aa,
  U as ab,
  we as ac,
  st as ad,
  ct as ae,
  rt as af,
  le as b,
  me as c,
  xe as d,
  Nt as e,
  Pe as f,
  ve as g,
  Re as h,
  g as i,
  et as j,
  pt as k,
  ue as l,
  Me as m,
  Oe as n,
  tt as o,
  Le as p,
  _ as q,
  Ze as r,
  Xe as s,
  je as t,
  it as u,
  ft as v,
  Te as w,
  ce as x,
  D as y,
  c as z
};
//# sourceMappingURL=scripture-util-80UGY6xJ.js.map
