var X = Object.defineProperty;
var K = (e, t, s) => t in e ? X(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var x = (e, t, s) => K(e, typeof t != "symbol" ? t + "" : t, s);
import { Canon as N, VerseRef as U } from "@sillsdev/scripture";
import { USJ_TYPE as Z } from "@eten-tech-foundation/scripture-utilities";
import { toArray as B } from "stringz";
function Be() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function g(e) {
  return typeof e == "string" || e instanceof String;
}
function we(e) {
  return JSON.parse(JSON.stringify(e));
}
const q = "Debounced function invocation was canceled";
function Te(e, t = 300) {
  let s, r, a, n, o;
  const h = () => (r || (r = new Promise((m, l) => {
    a = m, n = l;
  })), r), c = async (m) => {
    const l = a, p = n;
    r = void 0;
    try {
      l(await e(...m));
    } catch (d) {
      p(d);
    }
  }, f = (...m) => {
    clearTimeout(s);
    const l = h();
    return o = m, s = setTimeout(() => {
      const p = o;
      o = void 0, p && c(p);
    }, t), l;
  };
  return f.cancel = () => {
    clearTimeout(s), o = void 0, r && (n(new Error(q)), r = void 0);
  }, f.flush = () => {
    if (o === void 0) return;
    clearTimeout(s);
    const m = o;
    o = void 0;
    const l = h();
    return c(m), l;
  }, f;
}
function Ie(e, t, s) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((a, n) => {
    const o = t(a, n), h = r.get(o), c = s ? s(a, o, n) : a;
    h ? h.push(c) : r.set(o, [c]);
  }), r;
}
function Y(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function Q(e) {
  if (Y(e)) return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function _(e) {
  return Q(e).message;
}
function W(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Me(e, t) {
  const s = W(t).then(() => {
  });
  return Promise.any([s, e()]);
}
async function ke(e, t, s) {
  const r = Math.max(1, (s == null ? void 0 : s.maxAttempts) ?? 3), a = (s == null ? void 0 : s.delayMs) ?? 0;
  let n = 1;
  for (; ; ) {
    const o = await e(n);
    if (t(o) || n >= r) return o;
    n += 1, await W(a);
  }
}
function ve(e, t = "obj") {
  const s = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(e).forEach((a) => {
    try {
      typeof e[a] == "function" && s.add(a);
    } catch {
    }
  });
  let r = Object.getPrototypeOf(e);
  for (; r && Object.getPrototypeOf(r); )
    Object.getOwnPropertyNames(r).forEach((a) => {
      try {
        typeof e[a] == "function" && s.add(a);
      } catch {
      }
    }), r = Object.getPrototypeOf(r);
  return s;
}
function Pe(e, t = {}) {
  return new Proxy(t, {
    get(s, r) {
      return r in s ? s[r] : async (...a) => (await e())[r](...a);
    }
  });
}
function Re(e) {
  const t = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return g(e) ? e.includes(t) : _(e).includes(t);
}
function Le(e) {
  const t = "401 Unauthorized error while getting shared projects.", s = "User registration is not valid. Cannot retrieve resources from DBL.", r = g(e) ? e : _(e);
  return r.includes(t) || r.includes(s);
}
const ee = 2 ** 32 - 1, w = 2 ** 20;
function b(e) {
  const t = Number(e);
  return Number.isNaN(t) ? 0 : t === 1 / 0 || t === -1 / 0 ? t : Math.trunc(t);
}
function T(e, t) {
  const s = b(e);
  return s === -1 / 0 ? 0 : s < 0 ? Math.max(t + s, 0) : Math.min(s, t);
}
function S(e, t) {
  const s = b(e);
  return s <= 0 ? 0 : Math.min(s, t);
}
function te(e) {
  const t = b(e);
  return t <= 0 ? 0 : Math.min(t, Number.MAX_SAFE_INTEGER);
}
function G(e) {
  return e >>> 0;
}
const I = /* @__PURE__ */ new WeakMap();
class i {
  /**
   * Segment `string` into grapheme clusters once, up front. Every operation on the result reuses
   * that work rather than re-segmenting.
   *
   * @param string The raw string.
   */
  constructor(t) {
    /**
     * The raw string. Used for `toString`, the native scans behind search, and regex split. Not
     * `readonly` only because {@link fromSegmented} assigns it; treat it as immutable after
     * construction, since the cached offsets behind {@link offsets} are derived from it.
     */
    x(this, "str");
    /**
     * Grapheme clusters — source of truth for indexing. Not `readonly` only because
     * {@link fromSegmented} assigns it; treat it as immutable after construction. Must always satisfy
     * `graphemes.join('') === str`, or every index, offset, and search result disagrees with the
     * text.
     */
    x(this, "graphemes");
    this.str = t, this.graphemes = t === "" ? [] : B(t);
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
  static fromSegmented(t, s) {
    const r = new i("");
    return r.str = t, r.graphemes = s, r;
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
   * The text, for `JSON.stringify`. Without this an instance would serialize its internals — the
   * raw string and the grapheme array beside it — at roughly twice the size of the text, and the
   * result would not read back as anything useful.
   *
   * Note that this makes serialization one-way: what comes off the wire is a plain string, not a
   * `GraphemeString`. The class is a local segmentation cache rather than a transferable value, so
   * a receiver that wants one constructs it from the text.
   *
   * @returns The raw string this instance was built from, unchanged.
   */
  toJSON() {
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
  formatReplacementToArray(t) {
    return ne(this, t);
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
   * A replacer that cannot be converted to a string degrades to a placeholder rather than throwing,
   * because the template is a localized string and the replacers are caller-supplied values — one
   * bad value must not take down the whole call. Use {@link formatReplacementToArray} to keep a
   * non-string replacer intact instead of coerced.
   *
   * @param replacers Map from key text to its replacement. A key absent from the map is replaced by
   *   the key text itself.
   * @returns The formatted string. `''` if this string is empty. A replacer that cannot be
   *   converted becomes `[object Object]`, or `[object Unknown]` if even that inspection throws.
   */
  formatReplacement(t) {
    return this.formatReplacementToArray(t).map(se).join("");
  }
  /**
   * Mirrors `String.prototype.at`. The grapheme at `index`, or `undefined` if out of bounds.
   * Negative indexes count back from the end.
   *
   * @param index Grapheme index. Negative counts back from the end; fractional truncates toward
   *   zero and `NaN` becomes 0.
   * @returns The grapheme cluster at `index`, or `undefined` when out of bounds.
   */
  at(t) {
    const s = b(t), r = s < 0 ? s + this.graphemes.length : s;
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
  charAt(t) {
    const s = b(t);
    return s < 0 || s >= this.graphemes.length ? "" : this.graphemes[s];
  }
  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The first code point of the grapheme at `index`, or `undefined` when out of bounds.
   */
  codePointAt(t) {
    const s = b(t);
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
  slice(t, s) {
    const { length: r } = this.graphemes, a = t === void 0 ? 0 : T(t, r), n = s === void 0 ? r : T(s, r);
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
  substring(t, s) {
    const { length: r } = this.graphemes, a = t === void 0 ? 0 : S(t, r), n = s === void 0 ? r : S(s, r);
    return this.derive(Math.min(a, n), Math.max(a, n));
  }
  /**
   * Mirrors `String.prototype.padStart`, choosing whole graphemes as filler so the result is
   * `targetLength` graphemes long — where native fills UTF-16 slots and can leave a broken half of
   * a cluster at the seam. Throws `RangeError` above {@link MAX_PADDING_LENGTH}, a lower ceiling
   * than native's and the class's one deliberate departure from native behavior.
   *
   * Returns text rather than a `GraphemeString`, unlike the range methods. Those only ever remove
   * clusters, so a range of an honest segmentation is still honest and can be carried into the
   * result for free. Padding adds text at a seam, and added text can fuse with what is already
   * there — a filler ending in a combining mark joins the character it lands against — so there is
   * no segmentation to carry. Constructing one here would mean either re-segmenting on every call
   * or handing back an instance whose cluster array disagrees with its own text.
   *
   * @param targetLength Desired length in graphemes. No padding is added when it is at or below the
   *   current length.
   * @param padString Text to repeat, truncated at a grapheme boundary. Defaults to a single space;
   *   an empty string adds no padding.
   * @returns The padded text, or this instance's text unchanged when no padding is needed.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added. An empty `padString` never pads, so it never throws.
   */
  padStart(t, s) {
    const r = this.buildPadding(t, s);
    return r.length === 0 ? this.str : r.join("") + this.str;
  }
  /**
   * Mirrors `String.prototype.padEnd`. See {@link padStart}, including the `RangeError` ceiling and
   * why this returns text rather than a `GraphemeString`.
   *
   * @param targetLength Desired length in graphemes.
   * @param padString Text to repeat. Defaults to a single space.
   * @returns The padded text, or this instance's text unchanged when no padding is needed.
   * @throws `RangeError` when `targetLength` exceeds {@link MAX_PADDING_LENGTH} and padding would
   *   actually be added.
   */
  padEnd(t, s) {
    const r = this.buildPadding(t, s);
    return r.length === 0 ? this.str : this.str + r.join("");
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
  indexOf(t, s) {
    const r = C(t), a = S(s ?? 0, this.graphemes.length);
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
  lastIndexOf(t, s) {
    const r = C(t), { length: a } = this.graphemes, n = s === void 0 ? NaN : Number(s), o = Number.isNaN(n) ? a : S(n, a);
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
  includes(t, s) {
    return this.indexOf(t, s) !== -1;
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
  startsWith(t, s) {
    const r = C(t);
    if (r === "") return !0;
    const a = this.offsetAt(S(s ?? 0, this.graphemes.length));
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
  endsWith(t, s) {
    const r = C(t);
    if (r === "") return !0;
    const { length: a } = this.graphemes, n = this.offsetAt(s === void 0 ? a : S(s, a));
    return this.str.endsWith(r, n) ? this.isBoundary(n - r.length) : !1;
  }
  split(t, s) {
    const r = s === void 0 ? ee : G(s);
    return r === 0 ? [] : t === void 0 ? [this] : re(t) ? this.splitOnRegExp(t, r) : this.splitOnString(C(t), r);
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
  searchOnBoundaries(t, s, r) {
    let a = s;
    for (; ; ) {
      const n = r === 1 ? this.str.indexOf(t, a) : this.str.lastIndexOf(t, a);
      if (n < 0) return -1;
      const o = this.graphemeIndexAtOffset(n);
      if (o >= 0 && this.isBoundary(n + t.length)) return o;
      if (r === -1 && n === 0) return -1;
      a = n + r;
    }
  }
  /** Split on a literal separator, in grapheme space. See {@link split}. */
  splitOnString(t, s) {
    const { length: r } = this.graphemes;
    if (t === "")
      return this.graphemes.slice(0, Math.min(s, r)).map((h) => i.fromSegmented(h, [h]));
    if (r === 0) return [this];
    const a = [];
    let n = 0, o = 0;
    for (; o < r; ) {
      const h = this.indexOf(t, o);
      if (h < 0) break;
      if (a.push(this.derive(n, h)), a.length === s) return a;
      n = h + this.graphemeSpan(h, t), o = n;
    }
    return a.push(this.derive(n, r)), a;
  }
  /**
   * Split on a regular expression, in grapheme space. Follows the same shape as the spec's
   * `RegExp.prototype[@@split]`, with two changes: positions advance by whole graphemes, and a
   * match that does not begin and end on grapheme boundaries is skipped as if it had not matched.
   */
  splitOnRegExp(t, s) {
    const { length: r } = this.graphemes, a = t.flags.replace("y", ""), n = new RegExp(t.source, a.includes("g") ? a : `${a}g`);
    if (r === 0) return n.test(this.str) ? [] : [this];
    const o = [];
    let h = 0, c = 0;
    for (; c < this.str.length; ) {
      n.lastIndex = c;
      const f = n.exec(this.str);
      if (!f) break;
      const m = f.index + f[0].length, l = this.graphemeIndexAtOffset(f.index), p = c + 1;
      if (l < 0 || !this.isBoundary(m))
        c = Math.max(f.index + 1, p);
      else {
        const d = m >= this.str.length ? r : this.graphemeIndexAtOffset(m);
        if (d === h) {
          if (l + 1 >= r) break;
          c = Math.max(this.offsets()[l + 1], p);
        } else {
          if (o.push(this.derive(h, l)), o.length === s) return o;
          for (let A = 1; A < f.length; A++) {
            const E = f[A];
            if (o.push(E === void 0 ? void 0 : new i(E)), o.length === s) return o;
          }
          h = d, c = Math.max(m, p);
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
   * cheapest and the most frequent operations — building it eagerly taxes them for nothing. That
   * matters most for derived instances: `split` alone produces one per piece, and most are never
   * indexed into. Cached in {@link offsetsByInstance} rather than on the instance.
   */
  offsets() {
    const t = I.get(this);
    if (t) return t;
    const s = new Array(this.graphemes.length);
    let r = 0;
    for (let a = 0; a < this.graphemes.length; a++)
      s[a] = r, r += this.graphemes[a].length;
    return I.set(this, s), s;
  }
  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  buildPadding(t, s) {
    const r = te(t);
    if (r <= this.graphemes.length) return [];
    const a = s === void 0 ? " " : `${s}`, n = B(a);
    if (n.length === 0) return [];
    if (r > w)
      throw new RangeError(
        `Invalid string length: padding to ${r} graphemes exceeds the limit of ${w}`
      );
    const o = r - this.graphemes.length, h = new Array(o);
    for (let c = 0; c < o; c++) h[c] = n[c % n.length];
    return h;
  }
  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  offsetAt(t) {
    const s = this.offsets();
    return t < s.length ? s[t] : this.str.length;
  }
  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  graphemeSpan(t, s) {
    const r = this.offsets()[t] + s.length;
    return r >= this.str.length ? this.graphemes.length - t : this.graphemeIndexAtOffset(r) - t;
  }
  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  derive(t, s) {
    return t >= s ? new i("") : i.fromSegmented(
      this.str.substring(this.offsetAt(t), this.offsetAt(s)),
      this.graphemes.slice(t, s)
    );
  }
  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  graphemeIndexAtOffset(t) {
    const s = this.offsets();
    let r = 0, a = s.length - 1;
    for (; r <= a; ) {
      const n = Math.floor((r + a) / 2), o = s[n];
      if (o === t) return n;
      o < t ? r = n + 1 : a = n - 1;
    }
    return -1;
  }
  /** Whether a UTF-16 offset falls on a grapheme boundary (or the very end of the string). */
  isBoundary(t) {
    return t === this.str.length || this.graphemeIndexAtOffset(t) >= 0;
  }
}
function se(e) {
  try {
    return String(e);
  } catch {
    try {
      return Object.prototype.toString.call(e);
    } catch {
      return "[object Unknown]";
    }
  }
}
function re(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function C(e) {
  return typeof e == "string" ? e : `${e}`;
}
function ae(e, t, s) {
  if (t < 0) return -1;
  if (s) {
    if (e.charAt(t) === "}" && e.charAt(t - 1) === "\\")
      return t;
    const n = e.indexOf("\\}", t);
    return n >= 0 ? n + 1 : n;
  }
  let r = t;
  const a = e.length;
  for (; r < a && (r = e.indexOf("}", r), !(r === -1 || e.charAt(r - 1) !== "\\")); )
    r += 1;
  return r >= a ? -1 : r;
}
function ne(e, t) {
  const s = [];
  let r = 0, a = 0;
  function n(h, c, f) {
    const m = e.slice(a, c).toString(), l = s.length > 0 && g(s[s.length - 1]) ? `${s.pop()}${m}` : m;
    g(h) ? s.push(`${l}${h}`) : (l && s.push(l), s.push(h)), a = c + f;
  }
  const o = e.length;
  for (; r < o; ) {
    const h = e.charAt(r - 1);
    switch (e.charAt(r)) {
      case "{":
        if (h !== "\\") {
          const c = ae(e, r, !1);
          if (c >= 0) {
            const f = e.slice(r + 1, c).toString(), m = Object.hasOwn(t, f) ? (
              // `Object.hasOwn` is a narrowing check; the cast is sound.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[f]
            ) : f;
            n(m, r, c + 1 - r), r = c;
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
    const h = e.slice(a).toString();
    s.push(
      s.length > 0 && g(s[s.length - 1]) ? `${s.pop()}${h}` : h
    );
  }
  return s;
}
function F(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function Je(e, t) {
  return new i(e).at(t);
}
function $e(e, t) {
  return new i(e).charAt(t);
}
function De(e, t) {
  return new i(e).codePointAt(t);
}
function Ue(e, t, s) {
  return new i(e).endsWith(t, s);
}
function _e(e, t, s) {
  return new i(e).includes(t, s);
}
function We(e, t, s) {
  return new i(e).indexOf(t, s);
}
function Ge(e, t, s) {
  return new i(e).lastIndexOf(t, s);
}
function Fe(e) {
  return new i(e).length;
}
function je(e, t) {
  const s = t.toUpperCase();
  return s === "NONE" ? e : e.normalize(s);
}
function ze(e, t, s) {
  return e.localeCompare(t, "en", s);
}
function He(e, t, s) {
  return new i(e).padEnd(t, s);
}
function Ve(e, t, s) {
  return new i(e).padStart(t, s);
}
function Xe(e, t, s) {
  return new i(e).slice(t, s).toString();
}
function M(e, t, s) {
  const r = new i(e);
  if (t === "") {
    const a = r.toArray();
    return s === void 0 ? a : a.slice(0, G(s));
  }
  return typeof t == "string" ? r.split(t, s).map((a) => a.toString()) : r.split(t, s).map((a) => (a == null ? void 0 : a.toString()) ?? "");
}
function j(e, t, s) {
  return new i(e).startsWith(t, s);
}
function Ke(e, t, s) {
  return new i(e).substring(t, s).toString();
}
function Ze(e) {
  return new i(e).toArray();
}
function qe(e, t) {
  return new i(e).formatReplacementToArray(t);
}
function Ye(e, t) {
  return new i(e).formatReplacement(t);
}
function Qe(e) {
  const t = new i(e);
  return t.startsWith("%") && t.endsWith("%");
}
function et(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function tt(e) {
  return e ? F(e).map(
    (r) => Array.isArray(r) ? r.map((a) => new RegExp(a)) : new RegExp(r)
  ) : [];
}
function st(e) {
  return e ? F(e).map((r) => new RegExp(r)) : [];
}
const oe = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function O(e) {
  return oe.test(e);
}
function rt(e) {
  let t = "";
  for (let s = 0; s < e.length; s++) {
    const r = e[s];
    if (r === r.toUpperCase() && r !== r.toLowerCase()) {
      if (s > 0) {
        const n = e[s - 1];
        if (!(n === n.toUpperCase() && n !== n.toLowerCase()))
          t += "-";
        else if (s + 1 < e.length) {
          const h = e[s + 1];
          h === h.toLowerCase() && h !== h.toUpperCase() && (t += "-");
        }
      }
      t += r.toLowerCase();
    } else
      t += r;
  }
  return t;
}
function at(e, t) {
  const s = e.split(/\s+/);
  if (s.length <= t * 2 || t < 1)
    return e;
  const r = s.slice(0, t), a = s.slice(-t);
  return [...r, "[...]", ...a].join(" ");
}
const y = ["chapter", "book", "para", "row", "sidebar", Z], he = "​", k = " ", z = [
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
], ce = 1, le = z.length - 1, ue = 1, ie = 1, nt = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, fe = (e) => {
  var t;
  return ((t = z[e]) == null ? void 0 : t.chapters) ?? -1;
}, ot = "", ht = N.allBookIds.filter(
  (e) => !N.isObsolete(N.bookIdToNumber(e))
);
function ct(e) {
  const t = [], s = Math.min(e.length, N.allBookIds.length);
  for (let r = 0; r < s; r += 1)
    e[r] === "1" && t.push(N.bookNumberToId(r + 1));
  return t;
}
const lt = (e, t) => ({
  book: N.bookNumberToId(
    Math.max(
      ce,
      Math.min(N.bookIdToNumber(e.book) + t, le)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), ut = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(ue, e.chapterNum + t),
    fe(N.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), it = (e, t) => ({
  ...e,
  verseNum: Math.max(ie, e.verseNum + t)
});
async function ft(e, t, s) {
  const r = N.bookNumberToId(e);
  if (!j(Intl.getCanonicalLocales(t)[0], "zh"))
    return s({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [t]
    });
  const a = await s({
    localizeKey: `Book.${r}`,
    languagesToSearch: [t]
  }), n = M(a, "-");
  return M(n[0], "（")[0].trim();
}
function mt(e) {
  return new U(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function v(e) {
  return new U(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function me(e, t) {
  return v(e) - v(t);
}
function u(e) {
  return `%scrollGroup_${e}%`;
}
const Nt = {
  [u("undefined")]: "Ø",
  [u(0)]: "A",
  [u(1)]: "B",
  [u(2)]: "C",
  [u(3)]: "D",
  [u(4)]: "E",
  [u(5)]: "F",
  [u(6)]: "G",
  [u(7)]: "H",
  [u(8)]: "I",
  [u(9)]: "J",
  [u(10)]: "K",
  [u(11)]: "L",
  [u(12)]: "M",
  [u(13)]: "N",
  [u(14)]: "O",
  [u(15)]: "P",
  [u(16)]: "Q",
  [u(17)]: "R",
  [u(18)]: "S",
  [u(19)]: "T",
  [u(20)]: "U",
  [u(21)]: "V",
  [u(22)]: "W",
  [u(23)]: "X",
  [u(24)]: "Y",
  [u(25)]: "Z"
};
function pt(e) {
  return e.map((t) => u(t));
}
function H(e, t) {
  switch (t) {
    case "English":
      return N.bookIdToEnglishName(e.book);
    case "id":
    case void 0:
      return e.book;
    default:
      return t;
  }
}
function Ne(e, t) {
  const s = H(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", a = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${s}${r}${e.chapterNum}${a}${e.verseNum}`;
}
function gt(e, t, s, r) {
  return Ne(e, {
    optionOrLocalizedBookName: t,
    chapterVerseSeparator: s,
    bookChapterSeparator: r
  });
}
function pe(e, t) {
  const s = e.verseNum < 0 ? "" : `${t ?? ":"}${e.verseNum}`;
  return e.chapterNum < 0 ? "" : `${e.chapterNum}${s}`;
}
function P(e, t) {
  const s = H(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = pe(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${s}${s && r ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${r}`;
}
function dt(e, t, s) {
  const r = P(e, s);
  if (me(e, t) === 0) return r;
  const a = e.book === t.book && !(s != null && s.repeatBookName) ? "" : (s == null ? void 0 : s.endRefOptionOrLocalizedBookName) ?? (s == null ? void 0 : s.optionOrLocalizedBookName), n = P(t, {
    ...s,
    optionOrLocalizedBookName: a
  });
  return `${r}${(s == null ? void 0 : s.rangeSeparator) ?? " - "}${n}`;
}
var ge = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(ge || {});
const Et = (e) => {
  if (N.isBookOT(e)) return "OT";
  if (N.isBookNT(e)) return "NT";
  if (N.isBookDC(e)) return "DC";
  if (N.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, de = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function R(e) {
  return de.test(e);
}
const Ee = "‍       　​‌⁠‎‏", Ae = new RegExp(
  `^[${Ee}]+$`,
  "u"
);
function Se(e) {
  return Ae.test(e);
}
function be(e) {
  let t = "", s = !1, r = "\0";
  for (let a = 0; a < e.length; a += 1) {
    const n = e[a];
    n.charCodeAt(0) < 32 ? (s || (t += " "), s = !0) : !s && n === he && a + 1 < e.length && R(e[a + 1]) || (R(n) ? (s || (t += n), s = !0) : Se(n) && r === n || (t += n, s = !1)), r = n;
  }
  return t;
}
function L(e) {
  return !e || e.length === 0 ? !0 : e.length === 1 && (e[0] === void 0 || e[0] === "");
}
function J(e) {
  const { length: t } = e;
  let s = t;
  for (; s > 0 && O(e.charAt(s - 1)); ) s -= 1;
  return s === t ? e.toString() : e.slice(0, s).toString();
}
function $(e, t) {
  if (!t || !y.includes(t.type)) return !1;
  if (!t.content)
    throw new Error(
      `Parent ${JSON.stringify(t)} of ${JSON.stringify(e)} does not have a content array! This should not happen!`
    );
  return e === t.content[t.content.length - 1];
}
function D(e) {
  return e.split(k).map(be).join(k);
}
function V(e, t, s, r) {
  if (!e && !s) return !0;
  if (!e || !s) return !1;
  const a = g(e), n = g(s);
  if (a && n) {
    const o = D(e), h = D(s);
    if (o !== h) {
      const c = new i(o);
      let f;
      const m = () => (f ?? (f = new i(h)), f);
      if (!O(c.at(-1) ?? "") && !O(m().at(-1) ?? "") || !$(e, t) || !$(s, r) || J(c) !== J(m())) return !1;
    }
  } else if (!a && !n) {
    const o = e, h = s, c = Object.keys(o).filter(
      (l) => l !== "content"
    );
    if (c.length !== Object.keys(h).filter((l) => l !== "content").length || c.some((l) => !(l in h) || o[l] !== h[l])) return !1;
    const f = L(o.content), m = L(h.content);
    if (f !== m) return !1;
    if (!f && !m) {
      let l = o.content, p = h.content;
      const d = l[l.length - 1];
      y.includes(o.type) && g(d) && O(d) && (l = l.slice(0, -1));
      const A = p[p.length - 1];
      if (y.includes(h.type) && g(A) && O(A) && (p = p.slice(0, -1)), l.length !== p.length) return !1;
      for (let E = 0; E < l.length; E += 1)
        if (!V(l[E], o, p[E], h))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function At(e, t) {
  return V(e, void 0, t, void 0);
}
function St(e) {
  const t = [], s = /* @__PURE__ */ new Set(), r = (a) => {
    a && a.forEach((n) => {
      if (g(n)) return;
      const { marker: o } = n;
      o && !j(o, "z") && !s.has(o) && (s.add(o), t.push(o)), r(n.content);
    });
  };
  return r(e == null ? void 0 : e.content), t;
}
export {
  ke as $,
  pt as A,
  ft as B,
  Et as C,
  q as D,
  Ie as E,
  ce as F,
  i as G,
  _e as H,
  We as I,
  Re as J,
  Le as K,
  le as L,
  w as M,
  Qe as N,
  Se as O,
  O as P,
  Ge as Q,
  Be as R,
  Ee as S,
  je as T,
  be as U,
  lt as V,
  ut as W,
  it as X,
  ze as Y,
  He as Z,
  Ve as _,
  ue as a,
  mt as a0,
  v as a1,
  Xe as a2,
  M as a3,
  j as a4,
  Fe as a5,
  Ke as a6,
  Ze as a7,
  rt as a8,
  st as a9,
  tt as aa,
  W as ab,
  Me as ac,
  ht as ad,
  ot as ae,
  Nt as af,
  ct as ag,
  ie as b,
  ge as c,
  we as d,
  At as e,
  Je as f,
  $e as g,
  De as h,
  g as i,
  at as j,
  St as k,
  me as l,
  Pe as m,
  Te as n,
  nt as o,
  Ue as p,
  F as q,
  et as r,
  Ye as s,
  qe as t,
  gt as u,
  dt as v,
  ve as w,
  fe as x,
  _ as y,
  u as z
};
//# sourceMappingURL=scripture-util-Bb3DBo20.js.map
