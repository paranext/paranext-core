var V = Object.defineProperty;
var X = (e, t, s) => t in e ? V(e, t, { enumerable: !0, configurable: !0, writable: !0, value: s }) : e[t] = s;
var x = (e, t, s) => X(e, typeof t != "symbol" ? t + "" : t, s);
import { Canon as m, VerseRef as U } from "@sillsdev/scripture";
import { USJ_TYPE as K } from "@eten-tech-foundation/scripture-utilities";
import { toArray as B } from "stringz";
function Se() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function p(e) {
  return typeof e == "string" || e instanceof String;
}
function be(e) {
  return JSON.parse(JSON.stringify(e));
}
const j = "Debounced function invocation was canceled";
function xe(e, t = 300) {
  let s, r, a, n;
  const o = (...h) => (clearTimeout(s), r || (r = new Promise((l, c) => {
    a = l, n = c;
  })), s = setTimeout(async () => {
    try {
      a(await e(...h));
    } catch (l) {
      n(l);
    } finally {
      r = void 0;
    }
  }, t), r);
  return o.cancel = () => {
    clearTimeout(s), r && (n(new Error(j)), r = void 0);
  }, o;
}
function ye(e, t, s) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((a, n) => {
    const o = t(a, n), h = r.get(o), l = s ? s(a, o, n) : a;
    h ? h.push(l) : r.set(o, [l]);
  }), r;
}
function Z(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function q(e) {
  if (Z(e)) return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function D(e) {
  return q(e).message;
}
function W(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Oe(e, t) {
  const s = W(t).then(() => {
  });
  return Promise.any([s, e()]);
}
async function we(e, t, s) {
  const r = Math.max(1, (s == null ? void 0 : s.maxAttempts) ?? 3), a = (s == null ? void 0 : s.delayMs) ?? 0;
  let n = 1;
  for (; ; ) {
    const o = await e(n);
    if (t(o) || n >= r) return o;
    n += 1, await W(a);
  }
}
function Be(e, t = "obj") {
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
function Te(e, t = {}) {
  return new Proxy(t, {
    get(s, r) {
      return r in s ? s[r] : async (...a) => (await e())[r](...a);
    }
  });
}
function Ie(e) {
  const t = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return p(e) ? e.includes(t) : D(e).includes(t);
}
function Me(e) {
  const t = "401 Unauthorized error while getting shared projects.", s = "User registration is not valid. Cannot retrieve resources from DBL.", r = p(e) ? e : D(e);
  return r.includes(t) || r.includes(s);
}
const Y = 2 ** 32 - 1;
function C(e) {
  const t = Number(e);
  return Number.isNaN(t) ? 0 : t === 1 / 0 || t === -1 / 0 ? t : Math.trunc(t);
}
function T(e, t) {
  const s = C(e);
  return s === -1 / 0 ? 0 : s < 0 ? Math.max(t + s, 0) : Math.min(s, t);
}
function E(e, t) {
  const s = C(e);
  return s < 0 ? 0 : Math.min(s, t);
}
function Q(e) {
  const t = C(e);
  return t <= 0 ? 0 : Math.min(t, Number.MAX_SAFE_INTEGER);
}
function ee(e) {
  return e >>> 0;
}
class u {
  /**
   * @param string The raw string.
   * @param graphemes Optional precomputed grapheme array. When provided, segmentation is skipped
   *   entirely — this is how derived instances avoid re-parsing.
   */
  constructor(t, s) {
    /** The raw string. Used for `.string`, the native scans behind search, and regex split. */
    x(this, "str");
    /** Grapheme clusters — source of truth for indexing. Treat as read-only. */
    x(this, "graphemes");
    /** Lazily built cache behind {@link offsets}. */
    x(this, "offsetsCache");
    this.str = t, this.graphemes = s ?? B(t);
  }
  /** The original raw string. */
  get string() {
    return this.str;
  }
  /** Number of grapheme clusters. Mirrors `String.prototype.length` in graphemes. */
  get length() {
    return this.graphemes.length;
  }
  /**
   * UTF-16 start offset of each grapheme, where `offsets.length === graphemes.length`.
   *
   * PERF: built on first use rather than in the constructor. Only the search and range methods need
   * it; `length`, the point accessors, and the padding methods do not, and those are both the
   * cheapest and the most frequent operations — building it eagerly taxes them for nothing.
   */
  get offsets() {
    if (!this.offsetsCache) {
      const t = new Array(this.graphemes.length);
      let s = 0;
      for (let r = 0; r < this.graphemes.length; r++)
        t[r] = s, s += this.graphemes[r].length;
      this.offsetsCache = t;
    }
    return this.offsetsCache;
  }
  /** The grapheme clusters as an array. Treat the result as read-only. No native equivalent. */
  toArray() {
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
  formatReplacementToArray(t) {
    return I(this, t);
  }
  /** {@link formatReplacementToArray} with every part coerced to a string and joined. */
  formatReplacement(t) {
    return I(this, t).map((s) => `${s}`).join("");
  }
  /**
   * Mirrors `String.prototype.at`. The grapheme at `index`, or `undefined` if out of bounds.
   * Negative indexes count back from the end.
   */
  at(t) {
    const s = C(t), r = s < 0 ? s + this.graphemes.length : s;
    if (!(r < 0 || r >= this.graphemes.length))
      return this.graphemes[r];
  }
  /**
   * Mirrors `String.prototype.charAt`. The grapheme at `index`, or `''` if out of bounds. Like
   * native — and unlike {@link at} — a negative index is out of bounds rather than counted from the
   * end.
   */
  charAt(t) {
    const s = C(t);
    return s < 0 || s >= this.graphemes.length ? "" : this.graphemes[s];
  }
  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   */
  codePointAt(t) {
    const s = C(t);
    if (!(s < 0 || s >= this.graphemes.length))
      return this.graphemes[s].codePointAt(0);
  }
  /**
   * Mirrors `String.prototype.slice`. Negative indexes count back from the end and a backwards
   * range yields an empty result.
   */
  slice(t, s) {
    const { length: r } = this.graphemes, a = t === void 0 ? 0 : T(t, r), n = s === void 0 ? r : T(s, r);
    return this.derive(a, n);
  }
  /**
   * Mirrors `String.prototype.substring`. Negative indexes clamp to 0 rather than counting from the
   * end, and — as in native — the arguments are swapped when `begin` is greater than `end`.
   */
  substring(t, s) {
    const { length: r } = this.graphemes, a = t === void 0 ? 0 : E(t, r), n = s === void 0 ? r : E(s, r);
    return this.derive(Math.min(a, n), Math.max(a, n));
  }
  /**
   * Mirrors `String.prototype.padStart`, padding by whole graphemes so the result is exactly
   * `targetLength` graphemes long.
   */
  padStart(t, s) {
    const r = this.buildPadding(t, s);
    return r.length === 0 ? this : new u(r.join("") + this.str, r.concat(this.graphemes));
  }
  /** Mirrors `String.prototype.padEnd`. See {@link padStart}. */
  padEnd(t, s) {
    const r = this.buildPadding(t, s);
    return r.length === 0 ? this : new u(this.str + r.join(""), this.graphemes.concat(r));
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
  indexOf(t, s) {
    const r = y(t), a = E(s ?? 0, this.graphemes.length);
    if (r === "") return a;
    let n = this.offsetAt(a);
    for (; ; ) {
      const o = this.str.indexOf(r, n);
      if (o < 0) return -1;
      const h = this.graphemeIndexAtOffset(o);
      if (h >= 0 && this.isBoundary(o + r.length)) return h;
      n = o + 1;
    }
  }
  /**
   * Mirrors `String.prototype.lastIndexOf`: the last grapheme index at or before `position` where
   * `searchString` occurs, or -1. As in native, an omitted or `NaN` position searches the whole
   * string while a negative one clamps to 0. See {@link indexOf} for the boundary rule.
   */
  lastIndexOf(t, s) {
    const r = y(t), { length: a } = this.graphemes, n = s === void 0 ? NaN : Number(s), o = Number.isNaN(n) ? a : E(n, a);
    if (r === "") return o;
    let h = this.offsetAt(o);
    for (; ; ) {
      const l = this.str.lastIndexOf(r, h);
      if (l < 0) return -1;
      const c = this.graphemeIndexAtOffset(l);
      if (c >= 0 && this.isBoundary(l + r.length)) return c;
      if (l === 0) return -1;
      h = l - 1;
    }
  }
  /** Mirrors `String.prototype.includes`. See {@link indexOf} for `position` and boundary rules. */
  includes(t, s) {
    return this.indexOf(t, s) !== -1;
  }
  /**
   * Mirrors `String.prototype.startsWith`: whether an occurrence of `searchString` begins at
   * `position`. A negative `position` clamps to 0 and an empty needle returns `true`. The match
   * must end on a grapheme boundary, so a prefix ending mid-cluster is rejected.
   */
  startsWith(t, s) {
    const r = y(t);
    if (r === "") return !0;
    const a = this.offsetAt(E(s ?? 0, this.graphemes.length));
    return this.str.startsWith(r, a) ? this.isBoundary(a + r.length) : !1;
  }
  /**
   * Mirrors `String.prototype.endsWith`: whether an occurrence of `searchString` ends exactly at
   * `endPosition` (default: the end of the string). A negative `endPosition` clamps to 0 and an
   * empty needle returns `true`. The match must begin on a grapheme boundary.
   */
  endsWith(t, s) {
    const r = y(t);
    if (r === "") return !0;
    const { length: a } = this.graphemes, n = this.offsetAt(s === void 0 ? a : E(s, a));
    return this.str.endsWith(r, n) ? this.isBoundary(n - r.length) : !1;
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
  split(t, s) {
    const r = s === void 0 ? Y : ee(s);
    return r === 0 ? [] : t === void 0 ? [this] : typeof t == "string" ? this.splitOnString(t, r) : this.splitOnRegExp(t, r);
  }
  /** Split on a literal separator, in grapheme space. See {@link split}. */
  splitOnString(t, s) {
    const { length: r } = this.graphemes;
    if (t === "")
      return this.graphemes.slice(0, Math.min(s, r)).map((h) => new u(h, [h]));
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
    let h = 0, l = 0;
    for (; l < this.str.length; ) {
      n.lastIndex = l;
      const c = n.exec(this.str);
      if (!c) break;
      const N = c.index + c[0].length, f = this.graphemeIndexAtOffset(c.index);
      if (f < 0 || !this.isBoundary(N))
        l = c.index + 1;
      else {
        const g = N >= this.str.length ? r : this.graphemeIndexAtOffset(N);
        if (g === h) {
          if (f + 1 >= r) break;
          l = this.offsets[f + 1];
        } else {
          if (o.push(this.derive(h, f)), o.length === s) return o;
          for (let d = 1; d < c.length; d++) {
            const S = c[d];
            if (o.push(S === void 0 ? void 0 : new u(S)), o.length === s) return o;
          }
          h = g, l = N;
        }
      }
    }
    return o.push(this.derive(h, r)), o;
  }
  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  buildPadding(t, s) {
    const r = Q(t);
    if (r <= this.graphemes.length) return [];
    const n = B(s === void 0 ? " " : s);
    if (n.length === 0) return [];
    const o = r - this.graphemes.length, h = new Array(o);
    for (let l = 0; l < o; l++) h[l] = n[l % n.length];
    return h;
  }
  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  offsetAt(t) {
    return t < this.offsets.length ? this.offsets[t] : this.str.length;
  }
  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  graphemeSpan(t, s) {
    const r = this.offsets[t] + s.length;
    return r >= this.str.length ? this.graphemes.length - t : this.graphemeIndexAtOffset(r) - t;
  }
  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  derive(t, s) {
    return t >= s ? new u("", []) : new u(
      this.str.substring(this.offsetAt(t), this.offsetAt(s)),
      this.graphemes.slice(t, s)
    );
  }
  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  graphemeIndexAtOffset(t) {
    const { offsets: s } = this;
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
function y(e) {
  return typeof e == "string" ? e : e.string;
}
function te(e, t, s) {
  if (t < 0) return -1;
  if (s) {
    if (e.charAt(t) === "}" && e.charAt(t - 1) === "\\") return t;
    const n = e.indexOf("\\}", t);
    return n >= 0 ? n + 1 : n;
  }
  let r = t;
  const a = e.length;
  for (; r < a && (r = e.indexOf("}", r), !(r === -1 || e.charAt(r - 1) !== "\\")); )
    r += 1;
  return r >= a ? -1 : r;
}
function I(e, t) {
  const s = [];
  let r = 0, a = 0;
  function n(h, l, c) {
    const N = e.slice(a, l).string, f = s.length > 0 && p(s[s.length - 1]) ? `${s.pop()}${N}` : N;
    p(h) ? s.push(`${f}${h}`) : (f && s.push(f), s.push(h)), a = l + c;
  }
  const o = e.length;
  for (; r < o; ) {
    const h = e.charAt(r - 1);
    switch (e.charAt(r)) {
      case "{":
        if (h !== "\\") {
          const l = te(e, r, !1);
          if (l >= 0) {
            const c = e.slice(r + 1, l).string, N = c in t ? (
              // `replacerKey in replacers` is a narrowing check; the cast is sound.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[c]
            ) : c;
            n(N, r, l + 1 - r), r = l, a = l + 1;
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
    const h = e.slice(a).string;
    s.push(
      s.length > 0 && p(s[s.length - 1]) ? `${s.pop()}${h}` : h
    );
  }
  return s;
}
function _(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function O(e, t) {
  return new u(e).at(t);
}
function ke(e, t) {
  return new u(e).charAt(t);
}
function Pe(e, t) {
  return new u(e).codePointAt(t);
}
function ve(e, t, s) {
  return new u(e).endsWith(t, s);
}
function Le(e, t, s) {
  return new u(e).includes(t, s);
}
function Re(e, t, s) {
  return new u(e).indexOf(t, s);
}
function Je(e, t, s) {
  return new u(e).lastIndexOf(t, s);
}
function $e(e) {
  return new u(e).length;
}
function Ue(e, t) {
  const s = t.toUpperCase();
  return s === "NONE" ? e : e.normalize(s);
}
function De(e, t, s) {
  return e.localeCompare(t, "en", s);
}
function We(e, t, s) {
  return new u(e).padEnd(t, s).string;
}
function _e(e, t, s) {
  return new u(e).padStart(t, s).string;
}
function M(e, t, s) {
  return new u(e).slice(t, s).string;
}
function k(e, t, s) {
  return new u(e).split(t, s).map((a) => a == null ? void 0 : a.string);
}
function F(e, t, s) {
  return new u(e).startsWith(t, s);
}
function Fe(e, t, s) {
  return new u(e).substring(t, s).string;
}
function ze(e) {
  return new u(e).toArray();
}
function Ge(e, t) {
  return new u(e).formatReplacementToArray(t);
}
function He(e, t) {
  return new u(e).formatReplacement(t);
}
function Ve(e) {
  const t = new u(e);
  return t.startsWith("%") && t.endsWith("%");
}
function Xe(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Ke(e) {
  return e ? _(e).map(
    (r) => Array.isArray(r) ? r.map((a) => new RegExp(a)) : new RegExp(r)
  ) : [];
}
function je(e) {
  return e ? _(e).map((r) => new RegExp(r)) : [];
}
const se = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function A(e) {
  return se.test(e);
}
function Ze(e) {
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
function qe(e, t) {
  const s = e.split(/\s+/);
  if (s.length <= t * 2 || t < 1)
    return e;
  const r = s.slice(0, t), a = s.slice(-t);
  return [...r, "[...]", ...a].join(" ");
}
const w = ["chapter", "book", "para", "row", "sidebar", K], re = "​", z = [
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
], ae = 1, ne = z.length - 1, oe = 1, he = 1, Ye = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, le = (e) => {
  var t;
  return ((t = z[e]) == null ? void 0 : t.chapters) ?? -1;
}, Qe = "";
function et(e) {
  const t = [], s = Math.min(e.length, m.allBookIds.length);
  for (let r = 0; r < s; r += 1)
    e[r] === "1" && t.push(m.bookNumberToId(r + 1));
  return t;
}
const tt = (e, t) => ({
  book: m.bookNumberToId(
    Math.max(
      ae,
      Math.min(m.bookIdToNumber(e.book) + t, ne)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), st = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(oe, e.chapterNum + t),
    le(m.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), rt = (e, t) => ({
  ...e,
  verseNum: Math.max(he, e.verseNum + t)
});
async function at(e, t, s) {
  const r = m.bookNumberToId(e);
  if (!F(Intl.getCanonicalLocales(t)[0], "zh"))
    return s({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [t]
    });
  const a = await s({
    localizeKey: `Book.${r}`,
    languagesToSearch: [t]
  }), n = k(a, "-");
  return k(n[0], "ÿ08")[0].trim();
}
function nt(e) {
  return new U(m.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function P(e) {
  return new U(m.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function ie(e, t) {
  return P(e) - P(t);
}
function i(e) {
  return `%scrollGroup_${e}%`;
}
const ot = {
  [i("undefined")]: "Ø",
  [i(0)]: "A",
  [i(1)]: "B",
  [i(2)]: "C",
  [i(3)]: "D",
  [i(4)]: "E",
  [i(5)]: "F",
  [i(6)]: "G",
  [i(7)]: "H",
  [i(8)]: "I",
  [i(9)]: "J",
  [i(10)]: "K",
  [i(11)]: "L",
  [i(12)]: "M",
  [i(13)]: "N",
  [i(14)]: "O",
  [i(15)]: "P",
  [i(16)]: "Q",
  [i(17)]: "R",
  [i(18)]: "S",
  [i(19)]: "T",
  [i(20)]: "U",
  [i(21)]: "V",
  [i(22)]: "W",
  [i(23)]: "X",
  [i(24)]: "Y",
  [i(25)]: "Z"
};
function ht(e) {
  return e.map((t) => i(t));
}
function G(e, t) {
  switch (t) {
    case "English":
      return m.bookIdToEnglishName(e.book);
    case "id":
    case void 0:
      return e.book;
    default:
      return t;
  }
}
function ce(e, t) {
  const s = G(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", a = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${s}${r}${e.chapterNum}${a}${e.verseNum}`;
}
function lt(e, t, s, r) {
  return ce(e, {
    optionOrLocalizedBookName: t,
    chapterVerseSeparator: s,
    bookChapterSeparator: r
  });
}
function ue(e, t) {
  const s = e.verseNum < 0 ? "" : `${t ?? ":"}${e.verseNum}`;
  return e.chapterNum < 0 ? "" : `${e.chapterNum}${s}`;
}
function v(e, t) {
  const s = G(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = ue(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${s}${s && r ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${r}`;
}
function it(e, t, s) {
  const r = v(e, s);
  if (ie(e, t) === 0) return r;
  const a = e.book === t.book && !(s != null && s.repeatBookName) ? "" : (s == null ? void 0 : s.endRefOptionOrLocalizedBookName) ?? (s == null ? void 0 : s.optionOrLocalizedBookName), n = v(t, {
    ...s,
    optionOrLocalizedBookName: a
  });
  return `${r}${(s == null ? void 0 : s.rangeSeparator) ?? " - "}${n}`;
}
var fe = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(fe || {});
const ct = (e) => {
  if (m.isBookOT(e)) return "OT";
  if (m.isBookNT(e)) return "NT";
  if (m.isBookDC(e)) return "DC";
  if (m.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, me = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function L(e) {
  return me.test(e);
}
const Ne = "‍       　​‌⁠‎‏", pe = new RegExp(
  `^[${Ne}]+$`,
  "u"
);
function ge(e) {
  return pe.test(e);
}
function R(e) {
  let t = "", s = !1, r = "\0";
  for (let a = 0; a < e.length; a += 1) {
    const n = e[a];
    n.charCodeAt(0) < 32 ? (s || (t += " "), s = !0) : !s && n === re && a + 1 < e.length && L(e[a + 1]) || (L(n) ? (s || (t += n), s = !0) : ge(n) && r === n || (t += n, s = !1)), r = n;
  }
  return t;
}
function J(e) {
  return !e || e.length === 0 ? !0 : e.length === 1 && (e[0] === void 0 || e[0] === "");
}
function $(e, t) {
  if (!t || !w.includes(t.type)) return !1;
  if (!t.content)
    throw new Error(
      `Parent ${JSON.stringify(t)} of ${JSON.stringify(e)} does not have a content array! This should not happen!`
    );
  return e === t.content[t.content.length - 1];
}
function H(e, t, s, r) {
  if (!e && !s) return !0;
  if (!e || !s) return !1;
  const a = p(e), n = p(s);
  if (a && n) {
    const o = R(e), h = R(s);
    if (o !== h) {
      if (!A(O(o, -1) ?? "") && !A(O(h, -1) ?? "") || !$(e, t) || !$(s, r)) return !1;
      let l = o;
      for (; A(O(l, -1) ?? ""); ) l = M(l, 0, -1);
      let c = h;
      for (; A(O(c, -1) ?? ""); ) c = M(c, 0, -1);
      if (l !== c) return !1;
    }
  } else if (!a && !n) {
    const o = e, h = s, l = Object.keys(o).filter(
      (f) => f !== "content"
    );
    if (l.length !== Object.keys(h).filter((f) => f !== "content").length || l.some((f) => !(f in h) || o[f] !== h[f])) return !1;
    const c = J(o.content), N = J(h.content);
    if (c !== N) return !1;
    if (!c && !N) {
      let f = o.content, g = h.content;
      const d = f[f.length - 1];
      w.includes(o.type) && p(d) && A(d) && (f = f.slice(0, -1));
      const S = g[g.length - 1];
      if (w.includes(h.type) && p(S) && A(S) && (g = g.slice(0, -1)), f.length !== g.length) return !1;
      for (let b = 0; b < f.length; b += 1)
        if (!H(f[b], o, g[b], h))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function ut(e, t) {
  return H(e, void 0, t, void 0);
}
function ft(e) {
  const t = [], s = /* @__PURE__ */ new Set(), r = (a) => {
    a && a.forEach((n) => {
      if (p(n)) return;
      const { marker: o } = n;
      o && !F(o, "z") && !s.has(o) && (s.add(o), t.push(o)), r(n.content);
    });
  };
  return r(e == null ? void 0 : e.content), t;
}
export {
  nt as $,
  ht as A,
  at as B,
  ct as C,
  j as D,
  ye as E,
  ae as F,
  u as G,
  Le as H,
  Re as I,
  Ie as J,
  Me as K,
  ne as L,
  Ve as M,
  ge as N,
  A as O,
  Je as P,
  Se as Q,
  Ue as R,
  Ne as S,
  R as T,
  tt as U,
  st as V,
  rt as W,
  De as X,
  We as Y,
  _e as Z,
  we as _,
  oe as a,
  P as a0,
  M as a1,
  k as a2,
  F as a3,
  $e as a4,
  Fe as a5,
  ze as a6,
  Ze as a7,
  je as a8,
  Ke as a9,
  W as aa,
  Oe as ab,
  Qe as ac,
  ot as ad,
  et as ae,
  he as b,
  fe as c,
  be as d,
  ut as e,
  O as f,
  ke as g,
  Pe as h,
  p as i,
  qe as j,
  ft as k,
  ie as l,
  Te as m,
  xe as n,
  Ye as o,
  ve as p,
  _ as q,
  Xe as r,
  He as s,
  Ge as t,
  lt as u,
  it as v,
  Be as w,
  le as x,
  D as y,
  i as z
};
//# sourceMappingURL=scripture-util-BQz1Flin.js.map
