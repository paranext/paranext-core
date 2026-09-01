var ee = Object.defineProperty;
var te = (e, t, r) => t in e ? ee(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r;
var y = (e, t, r) => te(e, typeof t != "symbol" ? t + "" : t, r);
import { Canon as N, VerseRef as J } from "@sillsdev/scripture";
import { USJ_TYPE as re } from "@eten-tech-foundation/scripture-utilities";
function Je() {
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
function _e(e) {
  return JSON.parse(JSON.stringify(e));
}
const se = "Debounced function invocation was canceled";
function $e(e, t = 300) {
  let r, s, a, n, o;
  const h = () => (s || (s = new Promise((u, l) => {
    a = u, n = l;
  })), s), i = async (u) => {
    const l = a, b = n;
    s = void 0;
    try {
      l(await e(...u));
    } catch (g) {
      b(g);
    }
  }, c = (...u) => {
    clearTimeout(r);
    const l = h();
    return o = u, r = setTimeout(() => {
      const b = o;
      o = void 0, b && i(b);
    }, t), l;
  };
  return c.cancel = () => {
    clearTimeout(r), o = void 0, s && (n(new Error(se)), s = void 0);
  }, c.flush = () => {
    if (o === void 0) return;
    clearTimeout(r);
    const u = o;
    o = void 0;
    const l = h();
    return i(u), l;
  }, c;
}
function Ge(e, t, r) {
  const s = /* @__PURE__ */ new Map();
  return e.forEach((a, n) => {
    const o = t(a, n), h = s.get(o), i = r ? r(a, o, n) : a;
    h ? h.push(i) : s.set(o, [i]);
  }), s;
}
function ae(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function ne(e) {
  if (ae(e)) return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function _(e) {
  return ne(e).message;
}
function $(e) {
  return new Promise((t) => setTimeout(t, e));
}
function We(e, t) {
  const r = $(t).then(() => {
  });
  return Promise.any([r, e()]);
}
async function ze(e, t, r) {
  const s = Math.max(1, (r == null ? void 0 : r.maxAttempts) ?? 3), a = (r == null ? void 0 : r.delayMs) ?? 0;
  let n = 1;
  for (; ; ) {
    const o = await e(n);
    if (t(o) || n >= s) return o;
    n += 1, await $(a);
  }
}
function He(e, t = "obj") {
  const r = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(e).forEach((a) => {
    try {
      typeof e[a] == "function" && r.add(a);
    } catch {
    }
  });
  let s = Object.getPrototypeOf(e);
  for (; s && Object.getPrototypeOf(s); )
    Object.getOwnPropertyNames(s).forEach((a) => {
      try {
        typeof e[a] == "function" && r.add(a);
      } catch {
      }
    }), s = Object.getPrototypeOf(s);
  return r;
}
function qe(e, t = {}) {
  return new Proxy(t, {
    get(r, s) {
      return s in r ? r[s] : async (...a) => (await e())[s](...a);
    }
  });
}
function Xe(e) {
  const t = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return p(e) ? e.includes(t) : _(e).includes(t);
}
function Ke(e) {
  const t = "401 Unauthorized error while getting shared projects.", r = "User registration is not valid. Cannot retrieve resources from DBL.", s = p(e) ? e : _(e);
  return s.includes(t) || s.includes(r);
}
function oe(e, t, r) {
  let s = e.length, a = 0, n = 0, o = -1, h = () => {
    let i = 0, c = 0, u;
    do
      u = parseInt(e[a++], 36), i += (u & 15) << c, c += 4;
    while (u & 16);
    return i;
  };
  for (; a < s; ) {
    let i = o + 1 + h();
    r(i, o = i + h(), parseInt(t[n++], 36));
  }
}
function he(e, t, r) {
  let s = 0, a = t.length - 1;
  for (; s <= a; ) {
    let n = s + a >>> 1, o = r[n];
    if (e < t[n]) a = n - 1;
    else if (e > o >>> 5) s = n + 1;
    else return o & 31;
  }
  return 0;
}
const ie = (
  /** @type {UnicodeDataEncoding} */
  "090001000h1v5g2903000hl2v6jh16ng1s210111110o35aa10u2k1g10l6600152113h2010u1q1r5aq3890o13181214r22k3158q2n1000v100h1k20000001207030001160721k171001h1j11610332010010321210090411021c1c02100o301201412230u1130b100h1j116111420120411001100k11l10051001h1j11611142011000321210072411021d0g10r3000000132120090o200200g1j11f2012031213711271t1001o301001000001121371b1f0c101h1l2011001031212000080a1t1001m40400102101600i11t301006c7i601008b6p41r10101041h3d0004115a1j290p3q223000511010100g1501010302003172030c0010016000e0i6v50n40n5tl12ir33s12t11u11cj30100060700010a90t220000l71i20m7203010241000502rd101004k300000006101027050920g3t22bk1300616g209030207u18c1000t10003010501b2o20000102000004g37070101o921c000640602001mcv3rg20000001o16d0c0m1fg6g2h30m10q55f1vm11c0ma0p1a42nc0ne1a090q3314902021204020112030318250105bb1201110i1021i15101131502141b15120511011k1155132040202510201010603060a1f02040104210b1g3290e0e0kn11vs12j11j3040pp12t80g6v1qi2500c0r51ktl7319g21g51gh103040n11010040j51i3f01q1h1d0m27p1a0000cs13200523j200010301010100v140018a4q2501010101c08000i1f12601011g3012215110u1a0001015000pcq181000100011000iji5fvc0u91g5bhg20ie0l94lo6002115303121s12240la1tj23h44tj11t45m4ah33q700000l3ep2021a200t220301012040a0i320j2040007f00100r20c100g3208000011531000s520201036020t900207l1101n311000000321210090a12634b910201l22001051020120011020000e1i520701020000n10h5001050000010000010001re0010323010001r11i520701000001q6000000107l600000230004gg12080001lc62027111n1000411230000000000t820321030030r10090n205001380800501020n2050c0001mc00002000000nc006150000i5l1100600010001q753011160000i441111000000rl11019100000c1h201043102n10ltk1f006eoss2b0202gs94r36si2033ku101m373h50b1rqs4113sli1t22m1uh2435070726u13k92rr7m34h380e0m141egl561g1261114k60ga6nn10t33sv13uf1jf0207150qt16t66pr60n23k6bf1f0e1l29g71c1e029j1n30p11ea0k1028139m16rb2v621122i52213040tf1u3b51n17127c0232041d120819052c28220104060306l5g3l4572g130152cqdl2c3o37a5o27u11c32d9m2cu2191obo57eh9gg1tv3"
), le = "262122424333333393233393339333333333393393bf3b3b3b3b3f3f3bffff33b3bb33ff3f33b3b3333333bffff3b33bb33f33bffff33b3bb33ff3f33b3bbb333b3ff33b333f33b3b3b3b3333b3bf33b3bb39333b33b33b3b3b333b333333b3b33333f3b33b3ffb3f3fff3f3b33f35dc33333f3b3b3b33323333b3bb3b33b3fb3b3333b33333bff3b3f33bfb3b3ff3b3b3b3b3b333b333b3323e224423444444444444444444444444444444444444444444444444444444444444444444444444444444433334433333333b3b3bb33333b353bff3b3b3b3f3ff3b3b333bfff3f33333fb3bb3fb3b3bb33232333f333fff333333333b3b3333bb3b39393f3b3fbf33bb3b393b3b3b3333b33b33b3bbb33b33ffff3b3333bb3933b3b3b333b3b3b3b3b33b3b3b33b3b3b33b3b33b33b3b3b3fffff3bb39b9b3b33b3bf3f3b33f3b3f93b33b3b3bb33b33b3b3b3333393b3b3b33b39bffb3b332333b333dd3b3333233332333333333333333333333333333444444444444a4444444444444344444444444444444444444444444444444444444444", ue = "0001000000010010000000100000000000000000000000000001000000010018000100000001001000010101100101100000000000000000000100000001111000010000000110101001110111111111000100000021001000010000000100100001000000011010000100000001111000014000000100180001000000010010", G = new Uint8Array(12448), W = new Uint8Array(1440), z = new Uint8Array(2816);
let H, q;
{
  let e = (a, n, o, h, i) => {
    let c = h - n + 1, u = a.length;
    c > 0 && o - n < u && a.fill(i, o > n ? o - n : 0, c > u ? u : c);
  }, t = new Uint32Array(320), r = new Uint32Array(320), s = 0;
  oe(ie, le, (a, n, o) => {
    e(G, 0, a, n, o), e(W, 42592, a, n, o), e(z, 126976, a, n, o), n >= 65040 && !(a >= 126976 && n <= 129791) && (t[s] = a, r[s++] = n << 5 | o);
  }), H = t.slice(0, s), q = r.slice(0, s);
}
function O(e) {
  return e < 12448 ? G[e] : e < 42592 ? e === 12951 || e === 12953 ? 4 : 0 : e < 44032 ? W[e - 42592] : e < 55204 ? (e - 44032) % 28 ? 8 : 7 : e >= 126976 && e < 129792 ? z[e - 126976] : e >>> 4 === 4064 ? 3 : ce(e);
}
function ce(e) {
  return e < 57344 ? e <= 55238 ? e >= 55216 ? 13 : 0 : e >= 55243 && e <= 55291 ? 12 : 0 : e < 65024 ? e === 64286 ? 3 : 0 : e >= 917504 ? e > 921599 ? 0 : e >= 917536 && e < 917632 || e >= 917760 && e < 918e3 ? 3 : 2 : he(e, H, q);
}
const fe = Uint8Array.from(ue);
function me(e) {
  return e === 2381 || e === 2509 || e === 2765 || e === 2893 || e === 3149 || e === 3405 || e === 4153 || e === 6098 || e === 6752 || e === 6980 || e === 7083 || e === 43456 || e === 43766 || e === 68159 || e === 69939 || e === 70608 || e === 71998 || e === 72263 || e === 72345 || e === 73538;
}
function Ne(e, t) {
  return t === 8204 ? e & 21 : e & 8 || me(t) ? e & 21 | 40 : e & 21 | 32;
}
function w(e, t, r) {
  return t === 3 ? e & 32 ? Ne(e, r) : e & 21 : t === 4 ? 17 : t === 10 ? e & 2 ^ 3 : t === 14 ? (e & 16) >> 2 | e & 41 : t === 15 ? 33 : 1;
}
function* k(e) {
  let t = e.length;
  if (t === 0) return;
  let r = (
    /** @type {number} */
    e.codePointAt(0)
  ), s = r > 65535 ? 2 : 1, a = O(r), n = w(1, a, r), o = 0;
  for (; s < t; ) {
    r = /** @type {number} */
    e.codePointAt(s);
    let h = O(r), i = !(n & fe[a << 4 | h]);
    n = w(n, h, r), i && (yield e.slice(o, s), o = s), s += r > 65535 ? 2 : 1, a = h;
  }
  yield e.slice(o);
}
const be = 2 ** 32 - 1, T = 2 ** 20;
function A(e) {
  const t = Number(e);
  return Number.isNaN(t) ? 0 : t === 1 / 0 || t === -1 / 0 ? t : Math.trunc(t);
}
function v(e, t) {
  const r = A(e);
  return r < 0 ? Math.max(t + r, 0) : Math.min(r, t);
}
function x(e, t) {
  const r = A(e);
  return r <= 0 ? 0 : Math.min(r, t);
}
function pe(e) {
  const t = A(e);
  return t <= 0 ? 0 : Math.min(t, Number.MAX_SAFE_INTEGER);
}
function X(e) {
  return e >>> 0;
}
const I = /* @__PURE__ */ new WeakMap();
class m {
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
    y(this, "str");
    /**
     * Grapheme clusters — source of truth for indexing. Not `readonly` only because
     * {@link fromSegmented} assigns it; treat it as immutable after construction. Must always satisfy
     * `graphemes.join('') === str`, or every index, offset, and search result disagrees with the
     * text.
     */
    y(this, "graphemes");
    this.str = t, this.graphemes = t === "" ? [] : Array.from(k(t));
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
   * Build an instance from text plus its already-computed segmentation, skipping the segmenter
   * entirely. This is how derived instances avoid re-parsing.
   *
   * Private on purpose: the two arguments carry an invariant that nothing validates —
   * `graphemes.join('') === string`. A mismatched pair yields an instance whose `length`, offsets,
   * and search results all silently disagree with its own text. Validating would cost an O(n) join
   * on every derive, which is exactly the work this class exists to avoid, so the invariant is
   * enforced by keeping the door shut instead.
   */
  static fromSegmented(t, r) {
    const s = new m("");
    return s.str = t, s.graphemes = r, s;
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
   *   non-string replacer is always its own entry. A template with no placeholders yields a single
   *   string entry; only the empty string yields an empty array.
   */
  formatReplacementToArray(t) {
    return xe(this, t);
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
    return this.formatReplacementToArray(t).map(ge).join("");
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
    const r = A(t), s = r < 0 ? r + this.graphemes.length : r;
    if (!(s < 0 || s >= this.graphemes.length))
      return this.graphemes[s];
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
    const r = A(t);
    return r < 0 || r >= this.graphemes.length ? "" : this.graphemes[r];
  }
  /**
   * Mirrors `String.prototype.codePointAt`, indexed by grapheme. For a grapheme built from several
   * code points this reports only the first one.
   *
   * @param index Grapheme index. Fractional truncates toward zero and `NaN` becomes 0.
   * @returns The first code point of the grapheme at `index`, or `undefined` when out of bounds.
   */
  codePointAt(t) {
    const r = A(t);
    if (!(r < 0 || r >= this.graphemes.length))
      return this.graphemes[r].codePointAt(0);
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
  slice(t, r) {
    const { length: s } = this.graphemes, a = t === void 0 ? 0 : v(t, s), n = r === void 0 ? s : v(r, s);
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
  substring(t, r) {
    const { length: s } = this.graphemes, a = t === void 0 ? 0 : x(t, s), n = r === void 0 ? s : x(r, s);
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
  padStart(t, r) {
    const s = this.buildPadding(t, r);
    return s.length === 0 ? this.str : s.join("") + this.str;
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
  padEnd(t, r) {
    const s = this.buildPadding(t, r);
    return s.length === 0 ? this.str : this.str + s.join("");
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
  indexOf(t, r) {
    const s = C(t), a = x(r ?? 0, this.graphemes.length);
    return s === "" ? a : this.searchOnBoundaries(s, this.offsetAt(a), 1);
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
  lastIndexOf(t, r) {
    const s = C(t), { length: a } = this.graphemes, n = r === void 0 ? NaN : Number(r), o = Number.isNaN(n) ? a : x(n, a);
    return s === "" ? o : this.searchOnBoundaries(s, this.offsetAt(o), -1);
  }
  /**
   * Mirrors `String.prototype.includes`. See {@link indexOf} for `position` and boundary rules.
   *
   * @param searchString Needle to find. Used raw and never segmented.
   * @param position Grapheme index to start from. Defaults to 0; negative clamps to 0.
   * @returns `true` if `searchString` occurs on grapheme boundaries at or after `position`. An
   *   empty needle returns `true`.
   */
  includes(t, r) {
    return this.indexOf(t, r) !== -1;
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
  startsWith(t, r) {
    const s = C(t);
    if (s === "") return !0;
    const a = this.offsetAt(x(r ?? 0, this.graphemes.length));
    return this.str.startsWith(s, a) ? this.isBoundary(a + s.length) : !1;
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
  endsWith(t, r) {
    const s = C(t);
    if (s === "") return !0;
    const { length: a } = this.graphemes, n = this.offsetAt(r === void 0 ? a : x(r, a));
    return this.str.endsWith(s, n) ? this.isBoundary(n - s.length) : !1;
  }
  split(t, r) {
    const s = r === void 0 ? be : X(r);
    return s === 0 ? [] : t === void 0 ? [this] : de(t) ? this.splitOnRegExp(t, s) : this.splitOnString(C(t), s);
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
  searchOnBoundaries(t, r, s) {
    let a = r;
    for (; ; ) {
      const n = s === 1 ? this.str.indexOf(t, a) : this.str.lastIndexOf(t, a);
      if (n < 0) return -1;
      const o = this.graphemeIndexAtOffset(n);
      if (o >= 0 && this.isBoundary(n + t.length)) return o;
      if (s === -1 && n === 0) return -1;
      a = n + s;
    }
  }
  /** Split on a literal separator, in grapheme space. See {@link split}. */
  splitOnString(t, r) {
    const { length: s } = this.graphemes;
    if (t === "")
      return this.graphemes.slice(0, Math.min(r, s)).map((h) => m.fromSegmented(h, [h]));
    if (s === 0) return [this];
    const a = [];
    let n = 0, o = 0;
    for (; o < s; ) {
      const h = this.indexOf(t, o);
      if (h < 0) break;
      if (a.push(this.derive(n, h)), a.length === r) return a;
      n = h + this.graphemeSpan(h, t), o = n;
    }
    return a.push(this.derive(n, s)), a;
  }
  /**
   * Split on a regular expression, in grapheme space. Follows the same shape as the spec's
   * `RegExp.prototype[@@split]`, with two changes: positions advance by whole graphemes, and a
   * match that does not begin and end on grapheme boundaries is skipped as if it had not matched.
   */
  splitOnRegExp(t, r) {
    const { length: s } = this.graphemes, a = t.flags.replace("y", ""), n = new RegExp(t.source, a.includes("g") ? a : `${a}g`);
    if (s === 0) return n.test(this.str) ? [] : [this];
    const o = [];
    let h = 0, i = 0;
    for (; i < this.str.length; ) {
      n.lastIndex = i;
      const c = n.exec(this.str);
      if (!c) break;
      const u = c.index + c[0].length, l = this.graphemeIndexAtOffset(c.index), b = i + 1;
      if (l < 0 || !this.isBoundary(u))
        i = Math.max(c.index + 1, b);
      else {
        const g = u >= this.str.length ? s : this.graphemeIndexAtOffset(u);
        if (g === h) {
          if (l + 1 >= s) break;
          i = Math.max(this.offsets()[l + 1], b);
        } else {
          if (o.push(this.derive(h, l)), o.length === r) return o;
          for (let E = 1; E < c.length; E++) {
            const d = c[E];
            if (o.push(d === void 0 ? void 0 : new m(d)), o.length === r) return o;
          }
          h = g, i = Math.max(u, b);
        }
      }
    }
    return o.push(this.derive(h, s)), o;
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
    const r = new Array(this.graphemes.length);
    let s = 0;
    for (let a = 0; a < this.graphemes.length; a++)
      r[a] = s, s += this.graphemes[a].length;
    return I.set(this, r), r;
  }
  /** Build the grapheme array a padding method should prepend/append, empty when none is needed. */
  buildPadding(t, r) {
    const s = pe(t);
    if (s <= this.graphemes.length) return [];
    const a = r === void 0 ? " " : `${r}`, n = Array.from(k(a));
    if (n.length === 0) return [];
    if (s > T)
      throw new RangeError(
        `Invalid string length: padding to ${s} graphemes exceeds the limit of ${T}`
      );
    const o = s - this.graphemes.length, h = new Array(o);
    for (let i = 0; i < o; i++) h[i] = n[i % n.length];
    return h;
  }
  /** UTF-16 offset where grapheme `index` starts, or the end of the string for `index === length`. */
  offsetAt(t) {
    return t <= 0 ? 0 : t >= this.graphemes.length ? this.str.length : this.offsets()[t];
  }
  /**
   * How many graphemes a boundary-aligned occurrence of `needle` starting at grapheme `index`
   * occupies.
   */
  graphemeSpan(t, r) {
    const s = this.offsets()[t] + r.length;
    return s >= this.str.length ? this.graphemes.length - t : this.graphemeIndexAtOffset(s) - t;
  }
  /** Build a child from a resolved, clamped grapheme range `[begin, end)`. */
  derive(t, r) {
    return t >= r ? new m("") : m.fromSegmented(
      this.str.substring(this.offsetAt(t), this.offsetAt(r)),
      this.graphemes.slice(t, r)
    );
  }
  /**
   * Binary search `offsets` for a UTF-16 offset. Returns its grapheme index if the offset is a
   * grapheme boundary, else -1. `offsets` is strictly increasing.
   */
  graphemeIndexAtOffset(t) {
    const r = this.offsets();
    let s = 0, a = r.length - 1;
    for (; s <= a; ) {
      const n = Math.floor((s + a) / 2), o = r[n];
      if (o === t) return n;
      o < t ? s = n + 1 : a = n - 1;
    }
    return -1;
  }
  /** Whether a UTF-16 offset falls on a grapheme boundary (or the very end of the string). */
  isBoundary(t) {
    return t === this.str.length || this.graphemeIndexAtOffset(t) >= 0;
  }
}
function ge(e) {
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
function de(e) {
  return Object.prototype.toString.call(e) === "[object RegExp]";
}
function C(e) {
  return typeof e == "string" ? e : `${e}`;
}
function Ee(e, t, r) {
  if (t < 0) return -1;
  if (r) {
    if (e.charAt(t) === "}" && e.charAt(t - 1) === "\\")
      return t;
    const n = e.indexOf("\\}", t);
    return n >= 0 ? n + 1 : n;
  }
  let s = t;
  const a = e.length;
  for (; s < a && (s = e.indexOf("}", s), !(s === -1 || e.charAt(s - 1) !== "\\")); )
    s += 1;
  return s >= a ? -1 : s;
}
function xe(e, t) {
  const r = [];
  let s = 0, a = 0;
  function n(h, i, c) {
    const u = e.slice(a, i).toString(), l = r.length > 0 && p(r[r.length - 1]) ? `${r.pop()}${u}` : u;
    p(h) ? r.push(`${l}${h}`) : (l && r.push(l), r.push(h)), a = i + c;
  }
  const o = e.length;
  for (; s < o; ) {
    const h = e.charAt(s - 1);
    switch (e.charAt(s)) {
      case "{":
        if (h !== "\\") {
          const i = Ee(e, s, !1);
          if (i >= 0) {
            const c = e.slice(s + 1, i).toString(), u = Object.hasOwn(t, c) ? (
              // `Object.hasOwn` is a narrowing check; the cast is sound.
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[c]
            ) : c;
            n(u, s, i + 1 - s), s = i;
          }
        } else
          n("{", s - 1, 2);
        break;
      case "}":
        h === "\\" && n("}", s - 1, 2);
        break;
    }
    s += 1;
  }
  if (a < o) {
    const h = e.slice(a).toString();
    r.push(
      r.length > 0 && p(r[r.length - 1]) ? `${r.pop()}${h}` : h
    );
  }
  return r;
}
function K(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function Ve(e, t) {
  return new m(e).at(t);
}
function Ze(e, t) {
  return new m(e).charAt(t);
}
function Ye(e, t) {
  return new m(e).codePointAt(t);
}
function Qe(e, t, r) {
  return new m(e).endsWith(t, r);
}
function et(e, t, r) {
  return new m(e).includes(t, r);
}
function tt(e, t, r) {
  return new m(e).indexOf(t, r);
}
function rt(e, t, r) {
  return new m(e).lastIndexOf(t, r);
}
function st(e) {
  return new m(e).length;
}
function at(e, t) {
  const r = t.toUpperCase();
  return r === "NONE" ? e : e.normalize(r);
}
function nt(e, t, r) {
  return e.localeCompare(t, "en", r);
}
function ot(e, t, r) {
  return new m(e).padEnd(t, r);
}
function ht(e, t, r) {
  return new m(e).padStart(t, r);
}
function it(e, t, r) {
  return new m(e).slice(t, r).toString();
}
function lt(e, t, r) {
  const s = new m(e);
  if (t === "") {
    const a = s.toArray();
    return r === void 0 ? a : a.slice(0, X(r));
  }
  return typeof t == "string" ? s.split(t, r).map((a) => a.toString()) : s.split(t, r).map((a) => (a == null ? void 0 : a.toString()) ?? "");
}
function V(e, t, r) {
  return new m(e).startsWith(t, r);
}
function ut(e, t, r) {
  return new m(e).substring(t, r).toString();
}
function ct(e) {
  return new m(e).toArray();
}
function ft(e, t) {
  return new m(e).formatReplacementToArray(t);
}
function mt(e, t) {
  return new m(e).formatReplacement(t);
}
function Nt(e) {
  const t = new m(e);
  return t.startsWith("%") && t.endsWith("%");
}
function bt(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function pt(e) {
  return e ? K(e).map(
    (s) => Array.isArray(s) ? s.map((a) => new RegExp(a)) : new RegExp(s)
  ) : [];
}
function gt(e) {
  return e ? K(e).map((s) => new RegExp(s)) : [];
}
const Ae = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function S(e) {
  return Ae.test(e);
}
function dt(e) {
  let t = "";
  for (let r = 0; r < e.length; r++) {
    const s = e[r];
    if (s === s.toUpperCase() && s !== s.toLowerCase()) {
      if (r > 0) {
        const n = e[r - 1];
        if (!(n === n.toUpperCase() && n !== n.toLowerCase()))
          t += "-";
        else if (r + 1 < e.length) {
          const h = e[r + 1];
          h === h.toLowerCase() && h !== h.toUpperCase() && (t += "-");
        }
      }
      t += s.toLowerCase();
    } else
      t += s;
  }
  return t;
}
function Et(e, t) {
  const r = e.split(/\s+/);
  if (r.length <= t * 2 || t < 1)
    return e;
  const s = r.slice(0, t), a = r.slice(-t);
  return [...s, "[...]", ...a].join(" ");
}
const B = ["chapter", "book", "para", "row", "sidebar", re], Ce = "​", M = " ", Z = [
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
], Se = 1, ye = Z.length - 1, Be = 1, Oe = 1, xt = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, we = (e) => {
  var t;
  return ((t = Z[e]) == null ? void 0 : t.chapters) ?? -1;
}, At = "", Ct = N.allBookIds.filter(
  (e) => !N.isObsolete(N.bookIdToNumber(e))
);
function St(e) {
  const t = [], r = Math.min(e.length, N.allBookIds.length);
  for (let s = 0; s < r; s += 1)
    e[s] === "1" && t.push(N.bookNumberToId(s + 1));
  return t;
}
const yt = (e, t) => ({
  book: N.bookNumberToId(
    Math.max(
      Se,
      Math.min(N.bookIdToNumber(e.book) + t, ye)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Bt = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(Be, e.chapterNum + t),
    we(N.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), Ot = (e, t) => ({
  ...e,
  verseNum: Math.max(Oe, e.verseNum + t)
});
async function wt(e, t, r) {
  const s = N.bookNumberToId(e);
  if (!V(Intl.getCanonicalLocales(t)[0], "zh"))
    return r({
      localizeKey: `LocalizedId.${s}`,
      languagesToSearch: [t]
    });
  const a = await r({
    localizeKey: `Book.${s}`,
    languagesToSearch: [t]
  });
  return new m(a).split("-")[0].split("（")[0].toString().trim();
}
function kt(e) {
  return new J(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function P(e) {
  return new J(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function ke(e, t) {
  return P(e) - P(t);
}
function f(e) {
  return `%scrollGroup_${e}%`;
}
const Tt = {
  [f("undefined")]: "Ø",
  [f(0)]: "A",
  [f(1)]: "B",
  [f(2)]: "C",
  [f(3)]: "D",
  [f(4)]: "E",
  [f(5)]: "F",
  [f(6)]: "G",
  [f(7)]: "H",
  [f(8)]: "I",
  [f(9)]: "J",
  [f(10)]: "K",
  [f(11)]: "L",
  [f(12)]: "M",
  [f(13)]: "N",
  [f(14)]: "O",
  [f(15)]: "P",
  [f(16)]: "Q",
  [f(17)]: "R",
  [f(18)]: "S",
  [f(19)]: "T",
  [f(20)]: "U",
  [f(21)]: "V",
  [f(22)]: "W",
  [f(23)]: "X",
  [f(24)]: "Y",
  [f(25)]: "Z"
};
function vt(e) {
  return e.map((t) => f(t));
}
function Y(e, t) {
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
function Te(e, t) {
  const r = Y(e, t == null ? void 0 : t.optionOrLocalizedBookName), s = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", a = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${r}${s}${e.chapterNum}${a}${e.verseNum}`;
}
function It(e, t, r, s) {
  return Te(e, {
    optionOrLocalizedBookName: t,
    chapterVerseSeparator: r,
    bookChapterSeparator: s
  });
}
function ve(e, t) {
  const r = e.verseNum < 0 ? "" : `${t ?? ":"}${e.verseNum}`;
  return e.chapterNum < 0 ? "" : `${e.chapterNum}${r}`;
}
function R(e, t) {
  const r = Y(e, t == null ? void 0 : t.optionOrLocalizedBookName), s = ve(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${r}${r && s ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${s}`;
}
function Mt(e, t, r) {
  const s = R(e, r);
  if (ke(e, t) === 0) return s;
  const a = e.book === t.book && !(r != null && r.repeatBookName) ? "" : (r == null ? void 0 : r.endRefOptionOrLocalizedBookName) ?? (r == null ? void 0 : r.optionOrLocalizedBookName), n = R(t, {
    ...r,
    optionOrLocalizedBookName: a
  });
  return `${s}${(r == null ? void 0 : r.rangeSeparator) ?? " - "}${n}`;
}
var Ie = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(Ie || {});
const Pt = (e) => {
  if (N.isBookOT(e)) return "OT";
  if (N.isBookNT(e)) return "NT";
  if (N.isBookDC(e)) return "DC";
  if (N.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, Me = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function L(e) {
  return Me.test(e);
}
const Pe = "‍       　​‌⁠‎‏", Re = new RegExp(
  `^[${Pe}]+$`,
  "u"
);
function Le(e) {
  return Re.test(e);
}
function Fe(e) {
  let t = "", r = !1, s = "\0";
  for (let a = 0; a < e.length; a += 1) {
    const n = e[a];
    n.charCodeAt(0) < 32 ? (r || (t += " "), r = !0) : !r && n === Ce && a + 1 < e.length && L(e[a + 1]) || (L(n) ? (r || (t += n), r = !0) : Le(n) && s === n || (t += n, r = !1)), s = n;
  }
  return t;
}
function F(e) {
  return !e || e.length === 0 ? !0 : e.length === 1 && (e[0] === void 0 || e[0] === "");
}
function D(e) {
  const { length: t } = e;
  let r = t;
  for (; r > 0 && S(e.charAt(r - 1)); ) r -= 1;
  return r === t ? e.toString() : e.slice(0, r).toString();
}
function U(e, t) {
  if (!t || !B.includes(t.type)) return !1;
  if (!t.content)
    throw new Error(
      `Parent ${JSON.stringify(t)} of ${JSON.stringify(e)} does not have a content array! This should not happen!`
    );
  return e === t.content[t.content.length - 1];
}
function j(e) {
  return e.split(M).map(Fe).join(M);
}
function Q(e, t, r, s) {
  if (!e && !r) return !0;
  if (!e || !r) return !1;
  const a = p(e), n = p(r);
  if (a && n) {
    const o = j(e), h = j(r);
    if (o !== h) {
      const i = new m(o);
      let c;
      const u = () => (c ?? (c = new m(h)), c);
      if (!S(i.at(-1) ?? "") && !S(u().at(-1) ?? "") || !U(e, t) || !U(r, s) || D(i) !== D(u())) return !1;
    }
  } else if (!a && !n) {
    const o = e, h = r, i = Object.keys(o).filter(
      (l) => l !== "content"
    );
    if (i.length !== Object.keys(h).filter((l) => l !== "content").length || i.some((l) => !(l in h) || o[l] !== h[l])) return !1;
    const c = F(o.content), u = F(h.content);
    if (c !== u) return !1;
    if (!c && !u) {
      let l = o.content, b = h.content;
      const g = l[l.length - 1];
      B.includes(o.type) && p(g) && S(g) && (l = l.slice(0, -1));
      const E = b[b.length - 1];
      if (B.includes(h.type) && p(E) && S(E) && (b = b.slice(0, -1)), l.length !== b.length) return !1;
      for (let d = 0; d < l.length; d += 1)
        if (!Q(l[d], o, b[d], h))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function Rt(e, t) {
  return Q(e, void 0, t, void 0);
}
function Lt(e) {
  const t = [], r = /* @__PURE__ */ new Set(), s = (a) => {
    a && a.forEach((n) => {
      if (p(n)) return;
      const { marker: o } = n;
      o && !V(o, "z") && !r.has(o) && (r.add(o), t.push(o)), s(n.content);
    });
  };
  return s(e == null ? void 0 : e.content), t;
}
export {
  ze as $,
  vt as A,
  wt as B,
  Pt as C,
  se as D,
  Ge as E,
  Se as F,
  m as G,
  et as H,
  tt as I,
  Xe as J,
  Ke as K,
  ye as L,
  T as M,
  Nt as N,
  Le as O,
  S as P,
  rt as Q,
  Je as R,
  Pe as S,
  at as T,
  Fe as U,
  yt as V,
  Bt as W,
  Ot as X,
  nt as Y,
  ot as Z,
  ht as _,
  Be as a,
  kt as a0,
  P as a1,
  it as a2,
  lt as a3,
  V as a4,
  st as a5,
  ut as a6,
  ct as a7,
  dt as a8,
  gt as a9,
  pt as aa,
  $ as ab,
  We as ac,
  Ct as ad,
  At as ae,
  Tt as af,
  St as ag,
  Oe as b,
  Ie as c,
  _e as d,
  Rt as e,
  Ve as f,
  Ze as g,
  Ye as h,
  p as i,
  Et as j,
  Lt as k,
  ke as l,
  qe as m,
  $e as n,
  xt as o,
  Qe as p,
  K as q,
  bt as r,
  mt as s,
  ft as t,
  It as u,
  Mt as v,
  He as w,
  we as x,
  _ as y,
  f as z
};
//# sourceMappingURL=scripture-util-DFuBu-By.js.map
