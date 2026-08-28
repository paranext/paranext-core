import { Canon as N, VerseRef as D } from "@sillsdev/scripture";
import { USJ_TYPE as W } from "@eten-tech-foundation/scripture-utilities";
import { indexOf as K, limit as U, length as j, substring as X, toArray as Z, substr as q } from "stringz";
function ke() {
  return "00-0-4-1-000".replace(
    /[^-]/g,
    (e) => (
      // @ts-expect-error ts(2363) this works fine
      // eslint-disable-next-line no-bitwise
      ((Math.random() + ~~e) * 65536 >> e).toString(16).padStart(4, "0")
    )
  );
}
function E(e) {
  return typeof e == "string" || e instanceof String;
}
function ye(e) {
  return JSON.parse(JSON.stringify(e));
}
const Y = "Debounced function invocation was canceled";
function Pe(e, t = 300) {
  let a, r, s, o, n;
  const l = () => (r || (r = new Promise((i, c) => {
    s = i, o = c;
  })), r), h = async (i) => {
    const c = s, p = o;
    r = void 0;
    try {
      c(await e(...i));
    } catch (b) {
      p(b);
    }
  }, f = (...i) => {
    clearTimeout(a);
    const c = l();
    return n = i, a = setTimeout(() => {
      const p = n;
      n = void 0, p && h(p);
    }, t), c;
  };
  return f.cancel = () => {
    clearTimeout(a), n = void 0, r && (o(new Error(Y)), r = void 0);
  }, f.flush = () => {
    if (n === void 0) return;
    clearTimeout(a);
    const i = n;
    n = void 0;
    const c = l();
    return h(i), c;
  }, f;
}
function Ie(e, t, a) {
  const r = /* @__PURE__ */ new Map();
  return e.forEach((s, o) => {
    const n = t(s, o), l = r.get(n), h = a ? a(s, n, o) : s;
    l ? l.push(h) : r.set(n, [h]);
  }), r;
}
function Q(e) {
  return typeof e == "object" && // We're potentially dealing with objects we didn't create, so they might contain `null`
  // eslint-disable-next-line no-null/no-null
  e !== null && "message" in e && // Type assert `error` to check it's `message`.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  typeof e.message == "string";
}
function ee(e) {
  if (Q(e)) return e;
  try {
    return new Error(JSON.stringify(e));
  } catch {
    return new Error(String(e));
  }
}
function _(e) {
  return ee(e).message;
}
function G(e) {
  return new Promise((t) => setTimeout(t, e));
}
function Me(e, t) {
  const a = G(t).then(() => {
  });
  return Promise.any([a, e()]);
}
async function we(e, t, a) {
  const r = Math.max(1, (a == null ? void 0 : a.maxAttempts) ?? 3), s = (a == null ? void 0 : a.delayMs) ?? 0;
  let o = 1;
  for (; ; ) {
    const n = await e(o);
    if (t(n) || o >= r) return n;
    o += 1, await G(s);
  }
}
function ve(e, t = "obj") {
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
function xe(e, t = {}) {
  return new Proxy(t, {
    get(a, r) {
      return r in a ? a[r] : async (...s) => (await e())[r](...s);
    }
  });
}
function Le(e) {
  const t = "Bug in Paratext caused attempted access to Internet. Request has been blocked.";
  return E(e) ? e.includes(t) : _(e).includes(t);
}
function Re(e) {
  const t = "401 Unauthorized error while getting shared projects.", a = "User registration is not valid. Cannot retrieve resources from DBL.", r = E(e) ? e : _(e);
  return r.includes(t) || r.includes(a);
}
function F(e) {
  return e ? Array.isArray(e) ? e : [e] : [];
}
function B(e, t) {
  if (!(t > m(e) || t < -m(e)))
    return T(e, t, 1);
}
function S(e, t) {
  return t < 0 || t > m(e) - 1 ? "" : T(e, t, 1);
}
function Je(e, t) {
  if (!(t < 0 || t > m(e) - 1))
    return T(e, t, 1).codePointAt(0);
}
function te(e, t, a = m(e)) {
  const r = oe(e, t);
  return !(r === -1 || r + m(t) !== a);
}
function ae(e, t, a) {
  if (t < 0) return -1;
  if (a) {
    if (S(e, t) === "}" && S(e, t - 1) === "\\") return t;
    const o = C(e, "\\}", t);
    return o >= 0 ? o + 1 : o;
  }
  let r = t;
  const s = m(e);
  for (; r < s && (r = C(e, "}", r), !(r === -1 || S(e, r - 1) !== "\\")); )
    r += 1;
  return r >= s ? -1 : r;
}
function re(e, t) {
  const a = [];
  let r = 0, s = 0;
  function o(l, h, f) {
    const i = d(e, s, h), c = a.length > 0 && E(a[a.length - 1]) ? `${a.pop()}${i}` : i;
    E(l) ? a.push(`${c}${l}`) : (c && a.push(c), a.push(l)), s = h + f;
  }
  const n = m(e);
  for (; r < n; ) {
    switch (S(e, r)) {
      case "{":
        if (S(e, r - 1) !== "\\") {
          const l = ae(e, r, !1);
          if (l >= 0) {
            const h = d(e, r + 1, l), f = h in t ? (
              // Just checked that the key is in the object
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              t[h]
            ) : h;
            o(f, r, l + 1 - r), r = l, s = l + 1;
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
      a.length > 0 && E(a[a.length - 1]) ? `${a.pop()}${l}` : l
    );
  }
  return a;
}
function $e(e, t) {
  return re(e, t).map((a) => `${a}`).join("");
}
function se(e, t, a = 0) {
  const r = d(e, a);
  return C(r, t) !== -1;
}
function C(e, t, a = 0) {
  return K(e, t, a);
}
function oe(e, t, a) {
  let r = a === void 0 ? m(e) : a;
  r < 0 ? r = 0 : r >= m(e) && (r = m(e) - 1);
  for (let s = r; s >= 0; s--)
    if (T(e, s, m(t)) === t)
      return s;
  return -1;
}
function m(e) {
  return j(e);
}
function De(e, t) {
  const a = t.toUpperCase();
  return a === "NONE" ? e : e.normalize(a);
}
function Ue(e, t, a) {
  return e.localeCompare(t, "en", a);
}
function _e(e, t, a = " ") {
  return t <= m(e) ? e : U(e, t, a, "right");
}
function Ge(e, t, a = " ") {
  return t <= m(e) ? e : U(e, t, a, "left");
}
function P(e, t) {
  return t > e ? e : t < -e ? 0 : t < 0 ? t + e : t;
}
function I(e, t, a) {
  const r = m(e);
  if (t > r || a && (t > a && !(t >= 0 && t < r && a < 0 && a > -r) || a < -r))
    return "";
  const s = P(r, t), o = a ? P(r, a) : void 0;
  return d(e, s, o);
}
function M(e, t, a) {
  const r = [];
  if (a !== void 0 && a <= 0)
    return [e];
  if (t === "") return ne(e).slice(0, a);
  let s = t;
  (typeof t == "string" || t instanceof RegExp && !se(t.flags, "g")) && (s = new RegExp(t, "g"));
  const o = e.match(s);
  let n = 0;
  if (!o) return [e];
  for (let l = 0; l < (a ? a - 1 : o.length); l++) {
    const h = C(e, o[l], n), f = m(o[l]);
    if (r.push(d(e, n, h)), n = h + f, a !== void 0 && r.length === a)
      break;
  }
  return r.push(d(e, n)), r;
}
function k(e, t, a = 0) {
  return C(e, t, a) === a;
}
function T(e, t = 0, a = m(e) - t) {
  return q(e, t, a);
}
function d(e, t, a = m(e)) {
  return X(e, t, a);
}
function ne(e) {
  return Z(e);
}
function Fe(e) {
  return k(e, "%") && te(e, "%");
}
function ze(e) {
  if (typeof e != "string")
    throw new TypeError("Expected a string");
  return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
}
function He(e) {
  return e ? F(e).map(
    (r) => Array.isArray(r) ? r.map((s) => new RegExp(s)) : new RegExp(r)
  ) : [];
}
function Ve(e) {
  return e ? F(e).map((r) => new RegExp(r)) : [];
}
const le = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\u0085]+$/
);
function g(e) {
  return le.test(e);
}
function We(e) {
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
function Ke(e, t) {
  const a = e.split(/\s+/);
  if (a.length <= t * 2 || t < 1)
    return e;
  const r = a.slice(0, t), s = a.slice(-t);
  return [...r, "[...]", ...s].join(" ");
}
const O = ["chapter", "book", "para", "row", "sidebar", W], ue = "​", w = " ", z = [
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
], ce = 1, he = z.length - 1, me = 1, fe = 1, je = {
  book: "GEN",
  chapterNum: 1,
  verseNum: 1
}, Ne = (e) => {
  var t;
  return ((t = z[e]) == null ? void 0 : t.chapters) ?? -1;
}, Xe = "", Ze = N.allBookIds.filter(
  (e) => !N.isObsolete(N.bookIdToNumber(e))
);
function qe(e) {
  const t = [], a = Math.min(e.length, N.allBookIds.length);
  for (let r = 0; r < a; r += 1)
    e[r] === "1" && t.push(N.bookNumberToId(r + 1));
  return t;
}
const Ye = (e, t) => ({
  book: N.bookNumberToId(
    Math.max(
      ce,
      Math.min(N.bookIdToNumber(e.book) + t, he)
    )
  ),
  chapterNum: 1,
  verseNum: 1
}), Qe = (e, t) => ({
  ...e,
  chapterNum: Math.min(
    Math.max(me, e.chapterNum + t),
    Ne(N.bookIdToNumber(e.book))
  ),
  verseNum: 1
}), et = (e, t) => ({
  ...e,
  verseNum: Math.max(fe, e.verseNum + t)
});
async function tt(e, t, a) {
  const r = N.bookNumberToId(e);
  if (!k(Intl.getCanonicalLocales(t)[0], "zh"))
    return a({
      localizeKey: `LocalizedId.${r}`,
      languagesToSearch: [t]
    });
  const s = await a({
    localizeKey: `Book.${r}`,
    languagesToSearch: [t]
  }), o = M(s, "-");
  return M(o[0], "ÿ08")[0].trim();
}
function at(e) {
  return new D(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCC;
}
function v(e) {
  return new D(N.bookIdToNumber(e.book), e.chapterNum, e.verseNum).BBBCCCVVV;
}
function ie(e, t) {
  return v(e) - v(t);
}
function u(e) {
  return `%scrollGroup_${e}%`;
}
const rt = {
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
function st(e) {
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
function pe(e, t) {
  const a = H(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = (t == null ? void 0 : t.bookChapterSeparator) ?? " ", s = (t == null ? void 0 : t.chapterVerseSeparator) ?? ":";
  return `${a}${r}${e.chapterNum}${s}${e.verseNum}`;
}
function ot(e, t, a, r) {
  return pe(e, {
    optionOrLocalizedBookName: t,
    chapterVerseSeparator: a,
    bookChapterSeparator: r
  });
}
function Ee(e, t) {
  const a = e.verseNum < 0 ? "" : `${t ?? ":"}${e.verseNum}`;
  return e.chapterNum < 0 ? "" : `${e.chapterNum}${a}`;
}
function x(e, t) {
  const a = H(e, t == null ? void 0 : t.optionOrLocalizedBookName), r = Ee(
    e,
    t == null ? void 0 : t.chapterVerseSeparator
  );
  return `${a}${a && r ? (t == null ? void 0 : t.bookChapterSeparator) ?? " " : ""}${r}`;
}
function nt(e, t, a) {
  const r = x(e, a);
  if (ie(e, t) === 0) return r;
  const s = e.book === t.book && !(a != null && a.repeatBookName) ? "" : (a == null ? void 0 : a.endRefOptionOrLocalizedBookName) ?? (a == null ? void 0 : a.optionOrLocalizedBookName), o = x(t, {
    ...a,
    optionOrLocalizedBookName: s
  });
  return `${r}${(a == null ? void 0 : a.rangeSeparator) ?? " - "}${o}`;
}
var de = /* @__PURE__ */ ((e) => (e.OT = "OT", e.NT = "NT", e.DC = "DC", e.Extra = "Extra", e))(de || {});
const lt = (e) => {
  if (N.isBookOT(e)) return "OT";
  if (N.isBookNT(e)) return "NT";
  if (N.isBookDC(e)) return "DC";
  if (N.isExtraMaterial(e)) return "Extra";
  throw new Error(`Unknown section for book: ${e}`);
}, ge = (
  // Using unicode control characters to be very explicit about which characters we are using.
  // The first 6 characters are the control characters \f\n\r\t\v.
  // eslint-disable-next-line no-control-regex
  /^[\u000C\u000A\u000D\u0009\u000B\u0020\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u200B\u0085]+$/
);
function L(e) {
  return ge.test(e);
}
const Se = "‍       　​‌⁠‎‏", Ce = new RegExp(
  `^[${Se}]+$`,
  "u"
);
function be(e) {
  return Ce.test(e);
}
function Ae(e) {
  let t = "", a = !1, r = "\0";
  for (let s = 0; s < e.length; s += 1) {
    const o = e[s];
    o.charCodeAt(0) < 32 ? (a || (t += " "), a = !0) : !a && o === ue && s + 1 < e.length && L(e[s + 1]) || (L(o) ? (a || (t += o), a = !0) : be(o) && r === o || (t += o, a = !1)), r = o;
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
function $(e) {
  return e.split(w).map(Ae).join(w);
}
function V(e, t, a, r) {
  if (!e && !a) return !0;
  if (!e || !a) return !1;
  const s = E(e), o = E(a);
  if (s && o) {
    const n = $(e), l = $(a);
    if (n !== l) {
      if (!g(B(n, -1) ?? "") && !g(B(l, -1) ?? "") || !J(e, t) || !J(a, r)) return !1;
      let h = n;
      for (; g(B(h, -1) ?? ""); ) h = I(h, 0, -1);
      let f = l;
      for (; g(B(f, -1) ?? ""); ) f = I(f, 0, -1);
      if (h !== f) return !1;
    }
  } else if (!s && !o) {
    const n = e, l = a, h = Object.keys(n).filter(
      (c) => c !== "content"
    );
    if (h.length !== Object.keys(l).filter((c) => c !== "content").length || h.some((c) => !(c in l) || n[c] !== l[c])) return !1;
    const f = R(n.content), i = R(l.content);
    if (f !== i) return !1;
    if (!f && !i) {
      let c = n.content, p = l.content;
      const b = c[c.length - 1];
      O.includes(n.type) && E(b) && g(b) && (c = c.slice(0, -1));
      const y = p[p.length - 1];
      if (O.includes(l.type) && E(y) && g(y) && (p = p.slice(0, -1)), c.length !== p.length) return !1;
      for (let A = 0; A < c.length; A += 1)
        if (!V(c[A], n, p[A], l))
          return !1;
    }
  } else
    return !1;
  return !0;
}
function ut(e, t) {
  return V(e, void 0, t, void 0);
}
function ct(e) {
  const t = [], a = /* @__PURE__ */ new Set(), r = (s) => {
    s && s.forEach((o) => {
      if (E(o)) return;
      const { marker: n } = o;
      n && !k(n, "z") && !a.has(n) && (a.add(n), t.push(n)), r(o.content);
    });
  };
  return r(e == null ? void 0 : e.content), t;
}
export {
  v as $,
  st as A,
  tt as B,
  lt as C,
  Y as D,
  Ie as E,
  ce as F,
  se as G,
  C as H,
  Le as I,
  Re as J,
  Fe as K,
  he as L,
  be as M,
  g as N,
  oe as O,
  ke as P,
  De as Q,
  Ae as R,
  Se as S,
  Ye as T,
  Qe as U,
  et as V,
  Ue as W,
  _e as X,
  Ge as Y,
  we as Z,
  at as _,
  me as a,
  I as a0,
  M as a1,
  k as a2,
  m as a3,
  d as a4,
  ne as a5,
  We as a6,
  Ve as a7,
  He as a8,
  G as a9,
  Me as aa,
  Ze as ab,
  Xe as ac,
  rt as ad,
  qe as ae,
  fe as b,
  de as c,
  ye as d,
  ut as e,
  B as f,
  S as g,
  Je as h,
  E as i,
  Ke as j,
  ct as k,
  ie as l,
  xe as m,
  Pe as n,
  je as o,
  te as p,
  F as q,
  ze as r,
  $e as s,
  re as t,
  ot as u,
  nt as v,
  ve as w,
  Ne as x,
  _ as y,
  u as z
};
//# sourceMappingURL=scripture-util-CtZM3RsL.js.map
