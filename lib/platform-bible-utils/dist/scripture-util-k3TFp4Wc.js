import { Canon as i, VerseRef as $ } from "@sillsdev/scripture";
import { USJ_TYPE as V } from "@eten-tech-foundation/scripture-utilities";
import { indexOf as W, limit as D, length as K, substring as X, toArray as j, substr as Z } from "stringz";
function Te() {
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
function Oe(e) {
  return JSON.parse(JSON.stringify(e));
}
const q = "Debounced function invocation was canceled";
function ye(e, t = 300) {
  let a, r, s, o, n;
  const l = async (m) => {
    const N = r, h = s, E = o;
    try {
      h(await e(...m));
    } catch (b) {
      E(b);
    } finally {
      r === N && (r = void 0);
    }
  }, c = (...m) => (clearTimeout(a), r || (r = new Promise((N, h) => {
    s = N, o = h;
  })), n = m, a = setTimeout(() => {
    const N = n;
    n = void 0, N && l(N);
  }, t), r);
  return c.cancel = () => {
    clearTimeout(a), n = void 0, r && (o(new Error(q)), r = void 0);
  }, c.flush = () => {
    if (n === void 0) return;
    clearTimeout(a);
    const m = n;
    n = void 0;
    const N = r;
    return r = void 0, l(m), N;
  }, c;
}
function ke(e, t, a) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((s, o) => {
    const n = t(s, o), l = r.get(n), c = a ? a(s, n, o) : s;
    l ? l.push(c) : r.set(n, [c]);
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
function U(e) {
  return Q(e).message;
}
function _(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Pe(e, t) {
  const a = _(t).then(() => {
  });
  return Promise.any([a, e()]);
}
async function Me(e, t, a) {
  const r = Math.max(1, (a == null ? void 0 : a.maxAttempts) ?? 3), s = (a == null ? void 0 : a.delayMs) ?? 0;
  let o = 1;
  for (; ; ) {
    const n = await e(o);
    if (t(n) || o >= r) return n;
    o += 1, await _(s);
  }
}
function Ie(e, t = "obj") {
  const a = /* @__PURE__ */ new Set();
  Object.getOwnPropertyNames(e).forEach((s) => {
    try {
      typeof e[s] == "function" && a.add(s);
    } catch {
    }
  });
  let r = Object.getPrototypeOf(e);
  for (; r && Object.getPrototypeOf(r); )
    Object.getOwnPropertyNames(r).forEach((s) => {
      try {
        typeof e[s] == "function" && a.add(s);
      } catch {
      }
    }), r = Object.getPrototypeOf(r);
  return a;
}
function ve(e, t = {}) {
  return new Proxy(t, {
    get(a, r) {
      return r in a ? a[r] : async (...s) => (await e())[r](...s);
    }
  });
}
function we(e) {
  const t = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return p(e) ? e.includes(t) : U(e).includes(t);
}
function xe(e) {
  const t = "401 Unauthorized error while getting shared projects.", a = "User registration is not valid. Cannot retrieve resources from DBL.", r = p(e) ? e : U(e);
  return r.includes(t) || r.includes(a);
}
function G(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function B(e, t) {
  if (!(t > f(e) || t < -f(e)))
    return T(e, t, 1);
}
function S(e, t) {
  return t < 0 || t > f(e) - 1 ? "" : T(e, t, 1);
}
function Le(e, t) {
  if (!(t < 0 || t > f(e) - 1))
    return T(e, t, 1).codePointAt(0);
}
function ee(e, t, a = f(e)) {
  const r = se(e, t);
  return !(r === -1 || r + f(t) !== a);
}
function te(e, t, a) {
  if (t < 0) return -1;
  if (a) {
    if (S(e, t) === "}" && S(e, t - 1) === "\\") return t;
    const o = C(e, "\\}", t);
    return o >= 0 ? o + 1 : o;
  }
  let r = t;
  const s = f(e);
  for (; r < s && (r = C(e, "}", r), !(r === -1 || S(e, r - 1) !== "\\")); )
    r += 1;
  return r >= s ? -1 : r;
}
function ae(e, t) {
  const a = [];
  let r = 0, s = 0;
  function o(l, c, m) {
    const N = d(e, s, c), h = a.length > 0 && p(a[a.length - 1]) ? `${a.pop()}${N}` : N;
    p(l) ? a.push(`${h}${l}`) : (h && a.push(h), a.push(l)), s = c + m;
  }
  const n = f(e);
  for (; r < n; ) {
    switch (S(e, r)) {
      case "{":
        if (S(e, r - 1) !== "\\") {
          const l = te(e, r, !1);
          if (l >= 0) {
            const c = d(e, r + 1, l), m = c in t ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[c]
            ) : c;
            o(m, r, l + 1 - r), r = l, s = l + 1;
          }
        } else
          o("{", r - 1, 2);
        break;
      case "}":
        S(e, r - 1) !== "\\" || o("}", r - 1, 2);
        break;
    }
    r += 1;
  }
  if (s < n) {
    const l = d(e, s);
    a.push(
      a.length > 0 && p(a[a.length - 1]) ? `${a.pop()}${l}` : l
    );
  }
  return a;
}
function Re(e, t) {
  return ae(e, t).map((a) => `${a}`).join("");
}
function re(e, t, a = 0) {
  const r = d(e, a);
  return C(r, t) !== -1;
}
function C(e, t, a = 0) {
  return W(e, t, a);
}
function se(e, t, a) {
  let r = a === void 0 ? f(e) : a;
  r < 0 ? r = 0 : r >= f(e) && (r = f(e) - 1);
  for (let s = r; s >= 0; s--)
    if (T(e, s, f(t)) === t)
      return s;
  return -1;
}
function f(e) {
  return K(e);
}
function Je(e, t) {
  const a = t.toUpperCase();
  return a === "NONE" ? e : e.normalize(a);
}
function $e(e, t, a) {
  return e.localeCompare(t, "en", a);
}
function De(e, t, a = " ") {
  return t <= f(e) ? e : D(e, t, a, "right");
}
function Ue(e, t, a = " ") {
  return t <= f(e) ? e : D(e, t, a, "left");
}
function P(e, t) {
  return t > e ? e : t < -e ? 0 : t < 0 ? t + e : t;
}
function M(e, t, a) {
  const r = f(e);
  if (t > r || a && (t > a && !(t >= 0 && t < r && a < 0 && a > -r) || a < -r))
    return "";
  const s = P(r, t), o = a ? P(r, a) : void 0;
  return d(e, s, o);
}
function I(e, t, a) {
  const r = [];
  if (a !== void 0 && a <= 0)
    return [e];
  if (t === "") return oe(e).slice(0, a);
  let s = t;
  (typeof t == "string" || t instanceof RegExp && !re(t.flags, "g")) && (s = new RegExp(t, "g"));
  const o = e.match(s);
  let n = 0;
  if (!o) return [e];
  for (let l = 0; l < (a ? a - 1 : o.length); l++) {
    const c = C(e, o[l], n), m = f(o[l]);
    if (r.push(d(e, n, c)), n = c + m, a !== void 0 && r.length === a)
      break;
  }
  return r.push(d(e, n)), r;
}
function y(e, t, a = 0) {
  return C(e, t, a) === a;
}
function T(e, t = 0, a = f(e) - t) {
  return Z(e, t, a);
}
function d(e, t, a = f(e)) {
  return X(e, t, a);
}
function oe(e) {
  return j(e);
}
function _e(e) {
  return y(e, "%") && ee(e, "%");
}
function Ge(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function Fe(e) {
  return e ? G(e).map(
    (r) => Array.isArray(r) ? r.map((s) => new RegExp(s)) : new RegExp(r)
  ) : [];
}
function ze(e) {
  return e ? G(e).map((r) => new RegExp(r)) : [];
}
const ne = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function g(e) {
  return ne.test(e);
}
function He(e) {
  let t = "";
  for (let a = 0; a < e.length; a++) {
    const r = e[a];
    if (r === r.toUpperCase() && r !== r.toLowerCase()) {
      if (a > 0) {
        const o = e[a - 1];
        if (!(o === o.toUpperCase() && o !== o.toLowerCase()))
          t += "-";
        else if (a + 1 < e.length) {
          const l = e[a + 1];
          l === l.toLowerCase() && l !== l.toUpperCase() && (t += "-");
        }
      }
      t += r.toLowerCase();
    } else
      t += r;
  }
  return t;
}
function Ve(e, t) {
  const a = e.split(/\s+/);
  if (a.length <= t * 2 || t < 1)
    return e;
  const r = a.slice(0, t), s = a.slice(-t);
  return [...r, "[...]", ...s].join(" ");
}
const O = ["chapter", "book", "para", "row", "sidebar", V], le = "​", F = [
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
], ue = 1, ce = F.length - 1, he = 1, me = 1, We = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, fe = (e) => {
  var t;
  return ((t = F[e]) == null ? void 0 : t.chapters) ?? -1;
}, Ke = "";
function Xe(e) {
  const t = [], a = Math.min(e.length, i.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    e[r] === "1" && t.push(i.bookNumberToId(r + 1));
  return t;
}
const je = (e, t) => ({
  book: i.bookNumberToId(
    Math.max(
      ue,
      Math.min(i.bookIdToNumber(e.book) + t, ce)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Ze = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(he, e.chapterNum + t),
    fe(i.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), qe = (e, t) => ({
  ...e,
  verseNum: Math.max(me, e.verseNum + t)
});
async function Ye(e, t, a) {
  const r = i.bookNumberToId(e);
  if (!y(Intl.getCanonicalLocales(t)[0], "zh"))
    return a({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [t]
    });
  const s = await a({
    localizeKey: `Book.${r}`,
    languagesToSearch: [t]
  }), o = I(s, "-");
  return I(o[0], "ÿ08")[0].trim();
}
function Qe(e) {
  return new $(i.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function v(e) {
  return new $(i.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function Ne(e, t) {
  return v(e) - v(t);
}
function u(e) {
  return `%scrollGroup_${e}%`;
}
const et = {
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
function tt(e) {
  return e.map((t) => u(t));
}
function z(e, t) {
  switch (t) {
    case "English":
      return i.bookIdToEnglishName(e.book);
    case "id":
    case void 0:
      return e.book;
    default:
      return t;
  }
}
function ie(e, t) {
  const a = z(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", s = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${a}${r}${e.chapterNum}${s}${e.verseNum}`;
}
function at(e, t, a, r) {
  return ie(e, {
    optionOrLocalizedBookName: t,
    chapterVerseSeparator: a,
    bookChapterSeparator: r
  });
}
function pe(e, t) {
  const a = e.verseNum < 0 ? "" : `${t ?? ":"}${e.verseNum}`;
  return e.chapterNum < 0 ? "" : `${e.chapterNum}${a}`;
}
function w(e, t) {
  const a = z(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = pe(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${a}${a && r ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${r}`;
}
function rt(e, t, a) {
  const r = w(e, a);
  if (Ne(e, t) === 0) return r;
  const s = e.book === t.book && !(a != null && a.repeatBookName) ? "" : (a == null ? void 0 : a.endRefOptionOrLocalizedBookName) ?? (a == null ? void 0 : a.optionOrLocalizedBookName), o = w(t, {
    ...a,
    optionOrLocalizedBookName: s
  });
  return `${r}${(a == null ? void 0 : a.rangeSeparator) ?? " - "}${o}`;
}
var Ee = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(Ee || {});
const st = (e) => {
  if (i.isBookOT(e)) return "OT";
  if (i.isBookNT(e)) return "NT";
  if (i.isBookDC(e)) return "DC";
  if (i.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, de = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function x(e) {
  return de.test(e);
}
const ge = "‍       　​‌⁠‎‏", Se = new RegExp(
  `^[${ge}]+$`,
  "u"
);
function Ce(e) {
  return Se.test(e);
}
function L(e) {
  let t = "", a = !1, r = "\0";
  for (let s = 0; s < e.length; s += 1) {
    const o = e[s];
    o.charCodeAt(0) < 32 ? (a || (t += " "), a = !0) : !a && o === le && s + 1 < e.length && x(e[s + 1]) || (x(o) ? (a || (t += o), a = !0) : Ce(o) && r === o || (t += o, a = !1)), r = o;
  }
  return t;
}
function R(e) {
  return !e || e.length === 0 ? !0 : e.length === 1 && (e[0] === void 0 || e[0] === "");
}
function J(e, t) {
  if (!t || !O.includes(t.type)) return !1;
  if (!t.content)
    throw new Error(
      `Parent ${JSON.stringify(t)} of ${JSON.stringify(e)} does not have a content array! This should not happen!`
    );
  return e === t.content[t.content.length - 1];
}
function H(e, t, a, r) {
  if (!e && !a) return !0;
  if (!e || !a) return !1;
  const s = p(e), o = p(a);
  if (s && o) {
    const n = L(e), l = L(a);
    if (n !== l) {
      if (!g(B(n, -1) ?? "") && !g(B(l, -1) ?? "") || !J(e, t) || !J(a, r)) return !1;
      let c = n;
      for (; g(B(c, -1) ?? ""); ) c = M(c, 0, -1);
      let m = l;
      for (; g(B(m, -1) ?? ""); ) m = M(m, 0, -1);
      if (c !== m) return !1;
    }
  } else if (!s && !o) {
    const n = e, l = a, c = Object.keys(n).filter(
      (h) => h !== "content"
    );
    if (c.length !== Object.keys(l).filter((h) => h !== "content").length || c.some((h) => !(h in l) || n[h] !== l[h])) return !1;
    const m = R(n.content), N = R(l.content);
    if (m !== N) return !1;
    if (!m && !N) {
      let h = n.content, E = l.content;
      const b = h[h.length - 1];
      O.includes(n.type) && p(b) && g(b) && (h = h.slice(0, -1));
      const k = E[E.length - 1];
      if (O.includes(l.type) && p(k) && g(k) && (E = E.slice(0, -1)), h.length !== E.length) return !1;
      for (let A = 0; A < h.length; A += 1)
        if (!H(h[A], n, E[A], l))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function ot(e, t) {
  return H(e, void 0, t, void 0);
}
function nt(e) {
  const t = [], a = /* @__PURE__ */ new Set(), r = (s) => {
    s && s.forEach((o) => {
      if (p(o)) return;
      const { marker: n } = o;
      n && !y(n, "z") && !a.has(n) && (a.add(n), t.push(n)), r(o.content);
    });
  };
  return r(e == null ? void 0 : e.content), t;
}
export {
  v as $,
  tt as A,
  Ye as B,
  st as C,
  q as D,
  ke as E,
  ue as F,
  re as G,
  C as H,
  we as I,
  xe as J,
  _e as K,
  ce as L,
  Ce as M,
  g as N,
  se as O,
  Te as P,
  Je as Q,
  L as R,
  ge as S,
  je as T,
  Ze as U,
  qe as V,
  $e as W,
  De as X,
  Ue as Y,
  Me as Z,
  Qe as _,
  he as a,
  M as a0,
  I as a1,
  y as a2,
  f as a3,
  d as a4,
  oe as a5,
  He as a6,
  ze as a7,
  Fe as a8,
  _ as a9,
  Pe as aa,
  Ke as ab,
  et as ac,
  Xe as ad,
  me as b,
  Ee as c,
  Oe as d,
  ot as e,
  B as f,
  S as g,
  Le as h,
  p as i,
  Ve as j,
  nt as k,
  Ne as l,
  ve as m,
  ye as n,
  We as o,
  ee as p,
  G as q,
  Ge as r,
  Re as s,
  ae as t,
  at as u,
  rt as v,
  Ie as w,
  fe as x,
  U as y,
  u as z
};
//# sourceMappingURL=scripture-util-k3TFp4Wc.js.map
