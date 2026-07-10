import { Canon as N, VerseRef as v } from "@sillsdev/scripture";
import { USJ_TYPE as V } from "@eten-tech-foundation/scripture-utilities";
import { indexOf as z, limit as $, length as W, substring as j, toArray as K, substr as X } from "stringz";
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
  return (...l) => (clearTimeout(a), r || (r = new Promise((o, c) => {
    s = o, n = c;
  })), a = setTimeout(async () => {
    try {
      s(await e(...l));
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
    const l = t(s, n), o = r.get(l), c = a ? a(s, l, n) : s;
    o ? o.push(c) : r.set(l, [c]);
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
function Le(e) {
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
function we(e, t) {
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
  const l = m(e);
  for (; r < l; ) {
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
  if (s < l) {
    const o = p(e, s);
    a.push(
      a.length > 0 && i(a[a.length - 1]) ? `${a.pop()}${o}` : o
    );
  }
  return a;
}
function xe(e, t) {
  return te(e, t).map((a) => `${a}`).join("");
}
function ae(e, t, a = 0) {
  const r = p(e, a);
  return d(r, t) !== -1;
}
function d(e, t, a = 0) {
  return z(e, t, a);
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
  let l = 0;
  if (!n) return [e];
  for (let o = 0; o < (a ? a - 1 : n.length); o++) {
    const c = d(e, n[o], l), f = m(n[o]);
    if (r.push(p(e, l, c)), l = c + f, a !== void 0 && r.length === a)
      break;
  }
  return r.push(p(e, l)), r;
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
function Fe(e) {
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
function He(e, t) {
  const a = e.split(/\s+/);
  if (a.length <= t * 2 || t < 1)
    return e;
  const r = a.slice(0, t), s = a.slice(-t);
  return [...r, "[...]", ...s].join(" ");
}
const T = ["chapter", "book", "para", "row", "sidebar", V], ne = "​", G = [
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
], ue = 1, le = G.length - 1, ce = 1, he = 1, Ve = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, me = (e) => {
  var t;
  return ((t = G[e]) == null ? void 0 : t.chapters) ?? -1;
}, ze = "";
function We(e) {
  return Array.from(e).reduce((t, a, r) => (a === "1" && t.push(N.bookNumberToId(r + 1)), t), []);
}
const je = (e, t) => ({
  book: N.bookNumberToId(
    Math.max(
      ue,
      Math.min(N.bookIdToNumber(e.book) + t, le)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Ke = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(ce, e.chapterNum + t),
    me(N.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), Xe = (e, t) => ({
  ...e,
  verseNum: Math.max(he, e.verseNum + t)
});
async function Ze(e, t, a) {
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
function qe(e) {
  return new v(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function I(e) {
  return new v(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function fe(e, t) {
  return I(e) - I(t);
}
function u(e) {
  return `%scrollGroup_${e}%`;
}
const Ye = {
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
function Qe(e) {
  return e.map((t) => u(t));
}
function F(e, t) {
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
  const a = F(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", s = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${a}${r}${e.chapterNum}${s}${e.verseNum}`;
}
function et(e, t, a, r) {
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
function L(e, t) {
  const a = F(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = ie(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${a}${a && r ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${r}`;
}
function tt(e, t, a) {
  const r = L(e, a);
  if (fe(e, t) === 0) return r;
  const s = e.book === t.book && !(a != null && a.repeatBookName) ? "" : (a == null ? void 0 : a.endRefOptionOrLocalizedBookName) ?? (a == null ? void 0 : a.optionOrLocalizedBookName), n = L(t, {
    ...a,
    optionOrLocalizedBookName: s
  });
  return `${r}${(a == null ? void 0 : a.rangeSeparator) ?? " - "}${n}`;
}
var pe = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(pe || {});
const at = (e) => {
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
function w(e) {
  return Ee.test(e);
}
const ge = "‍       　​‌⁠‎‏", Se = new RegExp(
  `^[${ge}]+$`,
  "u"
);
function Ce(e) {
  return Se.test(e);
}
function x(e) {
  let t = "", a = !1, r = "\0";
  for (let s = 0; s < e.length; s += 1) {
    const n = e[s];
    n.charCodeAt(0) < 32 ? (a || (t += " "), a = !0) : !a && n === ne && s + 1 < e.length && w(e[s + 1]) || (w(n) ? (a || (t += n), a = !0) : Ce(n) && r === n || (t += n, a = !1)), r = n;
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
function H(e, t, a, r) {
  if (!e && !a) return !0;
  if (!e || !a) return !1;
  const s = i(e), n = i(a);
  if (s && n) {
    const l = x(e), o = x(a);
    if (l !== o) {
      if (!g(A(l, -1) ?? "") && !g(A(o, -1) ?? "") || !J(e, t) || !J(a, r)) return !1;
      let c = l;
      for (; g(A(c, -1) ?? ""); ) c = P(c, 0, -1);
      let f = o;
      for (; g(A(f, -1) ?? ""); ) f = P(f, 0, -1);
      if (c !== f) return !1;
    }
  } else if (!s && !n) {
    const l = e, o = a, c = Object.keys(l).filter(
      (h) => h !== "content"
    );
    if (c.length !== Object.keys(o).filter((h) => h !== "content").length || c.some((h) => !(h in o) || l[h] !== o[h])) return !1;
    const f = R(l.content), C = R(o.content);
    if (f !== C) return !1;
    if (!f && !C) {
      let h = l.content, E = o.content;
      const O = h[h.length - 1];
      T.includes(l.type) && i(O) && g(O) && (h = h.slice(0, -1));
      const y = E[E.length - 1];
      if (T.includes(o.type) && i(y) && g(y) && (E = E.slice(0, -1)), h.length !== E.length) return !1;
      for (let b = 0; b < h.length; b += 1)
        if (!H(h[b], l, E[b], o))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function rt(e, t) {
  return H(e, void 0, t, void 0);
}
export {
  _ as $,
  Ze as A,
  at as B,
  ye as C,
  ae as D,
  d as E,
  ue as F,
  Ie as G,
  Le as H,
  De as I,
  Ce as J,
  g as K,
  le as L,
  re as M,
  Be as N,
  Re as O,
  x as P,
  je as Q,
  Ke as R,
  ge as S,
  Xe as T,
  Je as U,
  ve as V,
  $e as W,
  qe as X,
  I as Y,
  P as Z,
  M as _,
  ce as a,
  m as a0,
  p as a1,
  se as a2,
  Fe as a3,
  Ge as a4,
  _e as a5,
  Y as a6,
  ke as a7,
  ze as a8,
  Ye as a9,
  We as aa,
  he as b,
  pe as c,
  Te as d,
  rt as e,
  A as f,
  S as g,
  we as h,
  i,
  He as j,
  fe as k,
  Me as l,
  Oe as m,
  Ve as n,
  Q as o,
  U as p,
  Ue as q,
  xe as r,
  te as s,
  et as t,
  tt as u,
  Pe as v,
  me as w,
  D as x,
  u as y,
  Qe as z
};
//# sourceMappingURL=scripture-util-CbNDIqV0.js.map
