import { Canon as N, VerseRef as v } from "@sillsdev/scripture";
import { USJ_TYPE as z } from "@eten-tech-foundation/scripture-utilities";
import { indexOf as F, limit as $, length as W, substring as j, toArray as K, substr as X } from "stringz";
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
function i(e) {
  return typeof e == "string" || e instanceof String;
}
function Te(e) {
  return JSON.parse(JSON.stringify(e));
}
function Oe(e, t = 300) {
  let a, r, s, n;
  return (...u) => (clearTimeout(a), r || (r = new Promise((o, c) => {
    s = o, n = c;
  })), a = setTimeout(async () => {
    try {
      s(await e(...u));
    } catch (o) {
      n(o);
    } finally {
      r = void 0;
    }
  }, t), r);
}
function ye(e, t, a) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((s, n) => {
    const u = t(s, n), o = r.get(u), c = a ? a(s, u, n) : s;
    o ? o.push(c) : r.set(u, [c]);
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
function Y(e) {
  return new Promise((t) => setTimeout(t, e));
}
function ke(e, t) {
  const a = Y(t).then(() => {
  });
  return Promise.any([a, e()]);
}
function Pe(e, t = "obj") {
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
function Me(e, t = {}) {
  return new Proxy(t, {
    get(a, r) {
      return r in a ? a[r] : async (...s) => (await e())[r](...s);
    }
  });
}
function Ie(e) {
  const t = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return i(e) ? e.includes(t) : D(e).includes(t);
}
function we(e) {
  const t = "401 Unauthorized error while getting shared projects.", a = "User registration is not valid. Cannot retrieve resources from DBL.", r = i(e) ? e : D(e);
  return r.includes(t) || r.includes(a);
}
function U(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function A(e, t) {
  if (!(t > m(e) || t < -m(e)))
    return B(e, t, 1);
}
function S(e, t) {
  return t < 0 || t > m(e) - 1 ? "" : B(e, t, 1);
}
function xe(e, t) {
  if (!(t < 0 || t > m(e) - 1))
    return B(e, t, 1).codePointAt(0);
}
function Q(e, t, a = m(e)) {
  const r = re(e, t);
  return !(r === -1 || r + m(t) !== a);
}
function ee(e, t, a) {
  if (t < 0) return -1;
  if (a) {
    if (S(e, t) === "}" && S(e, t - 1) === "\\") return t;
    const n = d(e, "\\}", t);
    return n >= 0 ? n + 1 : n;
  }
  let r = t;
  const s = m(e);
  for (; r < s && (r = d(e, "}", r), !(r === -1 || S(e, r - 1) !== "\\")); )
    r += 1;
  return r >= s ? -1 : r;
}
function te(e, t) {
  const a = [];
  let r = 0, s = 0;
  function n(o, c, f) {
    const C = p(e, s, c), h = a.length > 0 && i(a[a.length - 1]) ? `${a.pop()}${C}` : C;
    i(o) ? a.push(`${h}${o}`) : (h && a.push(h), a.push(o)), s = c + f;
  }
  const u = m(e);
  for (; r < u; ) {
    switch (S(e, r)) {
      case "{":
        if (S(e, r - 1) !== "\\") {
          const o = ee(e, r, !1);
          if (o >= 0) {
            const c = p(e, r + 1, o), f = c in t ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[c]
            ) : c;
            n(f, r, o + 1 - r), r = o, s = o + 1;
          }
        } else
          n("{", r - 1, 2);
        break;
      case "}":
        S(e, r - 1) !== "\\" || n("}", r - 1, 2);
        break;
    }
    r += 1;
  }
  if (s < u) {
    const o = p(e, s);
    a.push(
      a.length > 0 && i(a[a.length - 1]) ? `${a.pop()}${o}` : o
    );
  }
  return a;
}
function Le(e, t) {
  return te(e, t).map((a) => `${a}`).join("");
}
function ae(e, t, a = 0) {
  const r = p(e, a);
  return d(r, t) !== -1;
}
function d(e, t, a = 0) {
  return F(e, t, a);
}
function re(e, t, a) {
  let r = a === void 0 ? m(e) : a;
  r < 0 ? r = 0 : r >= m(e) && (r = m(e) - 1);
  for (let s = r; s >= 0; s--)
    if (B(e, s, m(t)) === t)
      return s;
  return -1;
}
function m(e) {
  return W(e);
}
function Re(e, t) {
  const a = t.toUpperCase();
  return a === "NONE" ? e : e.normalize(a);
}
function Je(e, t, a) {
  return e.localeCompare(t, "en", a);
}
function ve(e, t, a = " ") {
  return t <= m(e) ? e : $(e, t, a, "right");
}
function $e(e, t, a = " ") {
  return t <= m(e) ? e : $(e, t, a, "left");
}
function k(e, t) {
  return t > e ? e : t < -e ? 0 : t < 0 ? t + e : t;
}
function P(e, t, a) {
  const r = m(e);
  if (t > r || a && (t > a && !(t >= 0 && t < r && a < 0 && a > -r) || a < -r))
    return "";
  const s = k(r, t), n = a ? k(r, a) : void 0;
  return p(e, s, n);
}
function M(e, t, a) {
  const r = [];
  if (a !== void 0 && a <= 0)
    return [e];
  if (t === "") return se(e).slice(0, a);
  let s = t;
  (typeof t == "string" || t instanceof RegExp && !ae(t.flags, "g")) && (s = new RegExp(t, "g"));
  const n = e.match(s);
  let u = 0;
  if (!n) return [e];
  for (let o = 0; o < (a ? a - 1 : n.length); o++) {
    const c = d(e, n[o], u), f = m(n[o]);
    if (r.push(p(e, u, c)), u = c + f, a !== void 0 && r.length === a)
      break;
  }
  return r.push(p(e, u)), r;
}
function _(e, t, a = 0) {
  return d(e, t, a) === a;
}
function B(e, t = 0, a = m(e) - t) {
  return X(e, t, a);
}
function p(e, t, a = m(e)) {
  return j(e, t, a);
}
function se(e) {
  return K(e);
}
function De(e) {
  return _(e, "%") && Q(e, "%");
}
function Ue(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function _e(e) {
  return e ? U(e).map(
    (r) => Array.isArray(r) ? r.map((s) => new RegExp(s)) : new RegExp(r)
  ) : [];
}
function Ge(e) {
  return e ? U(e).map((r) => new RegExp(r)) : [];
}
const oe = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function g(e) {
  return oe.test(e);
}
function He(e) {
  let t = "";
  for (let a = 0; a < e.length; a++) {
    const r = e[a];
    if (r === r.toUpperCase() && r !== r.toLowerCase()) {
      if (a > 0) {
        const n = e[a - 1];
        if (!(n === n.toUpperCase() && n !== n.toLowerCase()))
          t += "-";
        else if (a + 1 < e.length) {
          const o = e[a + 1];
          o === o.toLowerCase() && o !== o.toUpperCase() && (t += "-");
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
const T = ["chapter", "book", "para", "row", "sidebar", z], ne = "​", G = [
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
], le = 1, ue = G.length - 1, ce = 1, he = 1, ze = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, me = (e) => {
  var t;
  return ((t = G[e]) == null ? void 0 : t.chapters) ?? -1;
}, Fe = (e, t) => ({
  book: N.bookNumberToId(
    Math.max(
      le,
      Math.min(N.bookIdToNumber(e.book) + t, ue)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), We = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(ce, e.chapterNum + t),
    me(N.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), je = (e, t) => ({
  ...e,
  verseNum: Math.max(he, e.verseNum + t)
});
async function Ke(e, t, a) {
  const r = N.bookNumberToId(e);
  if (!_(Intl.getCanonicalLocales(t)[0], "zh"))
    return a({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [t]
    });
  const s = await a({
    localizeKey: `Book.${r}`,
    languagesToSearch: [t]
  }), n = M(s, "-");
  return M(n[0], "ÿ08")[0].trim();
}
function Xe(e) {
  return new v(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function I(e) {
  return new v(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function fe(e, t) {
  return I(e) - I(t);
}
function l(e) {
  return `%scrollGroup_${e}%`;
}
const Ze = {
  [l("undefined")]: "Ø",
  [l(0)]: "A",
  [l(1)]: "B",
  [l(2)]: "C",
  [l(3)]: "D",
  [l(4)]: "E",
  [l(5)]: "F",
  [l(6)]: "G",
  [l(7)]: "H",
  [l(8)]: "I",
  [l(9)]: "J",
  [l(10)]: "K",
  [l(11)]: "L",
  [l(12)]: "M",
  [l(13)]: "N",
  [l(14)]: "O",
  [l(15)]: "P",
  [l(16)]: "Q",
  [l(17)]: "R",
  [l(18)]: "S",
  [l(19)]: "T",
  [l(20)]: "U",
  [l(21)]: "V",
  [l(22)]: "W",
  [l(23)]: "X",
  [l(24)]: "Y",
  [l(25)]: "Z"
};
function qe(e) {
  return e.map((t) => l(t));
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
  const a = H(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", s = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${a}${r}${e.chapterNum}${s}${e.verseNum}`;
}
function Ye(e, t, a, r) {
  return Ne(e, {
    optionOrLocalizedBookName: t,
    chapterVerseSeparator: a,
    bookChapterSeparator: r
  });
}
function ie(e, t) {
  const a = e.verseNum < 0 ? "" : `${t ?? ":"}${e.verseNum}`;
  return e.chapterNum < 0 ? "" : `${e.chapterNum}${a}`;
}
function w(e, t) {
  const a = H(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = ie(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${a}${a && r ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${r}`;
}
function Qe(e, t, a) {
  const r = w(e, a);
  if (fe(e, t) === 0) return r;
  const s = e.book === t.book && !(a != null && a.repeatBookName) ? "" : (a == null ? void 0 : a.endRefOptionOrLocalizedBookName) ?? (a == null ? void 0 : a.optionOrLocalizedBookName), n = w(t, {
    ...a,
    optionOrLocalizedBookName: s
  });
  return `${r}${(a == null ? void 0 : a.rangeSeparator) ?? " - "}${n}`;
}
var pe = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(pe || {});
const et = (e) => {
  if (N.isBookOT(e)) return "OT";
  if (N.isBookNT(e)) return "NT";
  if (N.isBookDC(e)) return "DC";
  if (N.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, Ee = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function x(e) {
  return Ee.test(e);
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
    const n = e[s];
    n.charCodeAt(0) < 32 ? (a || (t += " "), a = !0) : !a && n === ne && s + 1 < e.length && x(e[s + 1]) || (x(n) ? (a || (t += n), a = !0) : Ce(n) && r === n || (t += n, a = !1)), r = n;
  }
  return t;
}
function R(e) {
  return !e || e.length === 0 ? !0 : e.length === 1 && (e[0] === void 0 || e[0] === "");
}
function J(e, t) {
  if (!t || !T.includes(t.type)) return !1;
  if (!t.content)
    throw new Error(
      `Parent ${JSON.stringify(t)} of ${JSON.stringify(e)} does not have a content array! This should not happen!`
    );
  return e === t.content[t.content.length - 1];
}
function V(e, t, a, r) {
  if (!e && !a) return !0;
  if (!e || !a) return !1;
  const s = i(e), n = i(a);
  if (s && n) {
    const u = L(e), o = L(a);
    if (u !== o) {
      if (!g(A(u, -1) ?? "") && !g(A(o, -1) ?? "") || !J(e, t) || !J(a, r)) return !1;
      let c = u;
      for (; g(A(c, -1) ?? ""); ) c = P(c, 0, -1);
      let f = o;
      for (; g(A(f, -1) ?? ""); ) f = P(f, 0, -1);
      if (c !== f) return !1;
    }
  } else if (!s && !n) {
    const u = e, o = a, c = Object.keys(u).filter(
      (h) => h !== "content"
    );
    if (c.length !== Object.keys(o).filter((h) => h !== "content").length || c.some((h) => !(h in o) || u[h] !== o[h])) return !1;
    const f = R(u.content), C = R(o.content);
    if (f !== C) return !1;
    if (!f && !C) {
      let h = u.content, E = o.content;
      const O = h[h.length - 1];
      T.includes(u.type) && i(O) && g(O) && (h = h.slice(0, -1));
      const y = E[E.length - 1];
      if (T.includes(o.type) && i(y) && g(y) && (E = E.slice(0, -1)), h.length !== E.length) return !1;
      for (let b = 0; b < h.length; b += 1)
        if (!V(h[b], u, E[b], o))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function tt(e, t) {
  return V(e, void 0, t, void 0);
}
export {
  M as $,
  Ke as A,
  et as B,
  ye as C,
  Ze as D,
  ae as E,
  le as F,
  d as G,
  Ie as H,
  we as I,
  De as J,
  Ce as K,
  ue as L,
  g as M,
  re as N,
  Be as O,
  Re as P,
  L as Q,
  Fe as R,
  ge as S,
  We as T,
  je as U,
  Je as V,
  ve as W,
  $e as X,
  Xe as Y,
  I as Z,
  P as _,
  ce as a,
  _ as a0,
  m as a1,
  p as a2,
  se as a3,
  He as a4,
  Ge as a5,
  _e as a6,
  Y as a7,
  ke as a8,
  he as b,
  pe as c,
  Te as d,
  tt as e,
  A as f,
  S as g,
  xe as h,
  i,
  Ve as j,
  fe as k,
  Me as l,
  Oe as m,
  ze as n,
  Q as o,
  U as p,
  Ue as q,
  Le as r,
  te as s,
  Ye as t,
  Qe as u,
  Pe as v,
  me as w,
  D as x,
  l as y,
  qe as z
};
//# sourceMappingURL=scripture-util-CIEEBU92.js.map
