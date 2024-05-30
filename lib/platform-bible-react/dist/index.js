var xs = Object.defineProperty;
var Es = (e, t, n) => t in e ? xs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Tt = (e, t, n) => (Es(e, typeof t != "symbol" ? t + "" : t, n), n);
import Ts, { jsxs as ue, jsx as x, Fragment as Kn } from "react/jsx-runtime";
import * as k from "react";
import _t, { forwardRef as Xn, useCallback as Ee, useState as xe, useRef as ft, useEffect as mt, useLayoutEffect as Io, Children as sn, isValidElement as Bn, createElement as Rr, cloneElement as Di, Fragment as ks, useMemo as xt } from "react";
import { getChaptersForBook as ji, offsetBook as _o, FIRST_SCR_BOOK_NUM as Os, offsetChapter as Ao, FIRST_SCR_CHAPTER_NUM as Ss, offsetVerse as Do, FIRST_SCR_VERSE_NUM as Cs, compare as $r, format as fr } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Ns, Check as Ps, Circle as Rs, History as $s, ArrowDownWideNarrow as Ms, Clock as Is, Bookmark as _s } from "lucide-react";
import Te, { clsx as As } from "clsx";
import { twMerge as Ds } from "tailwind-merge";
import { cva as Bi } from "class-variance-authority";
import { Autocomplete as js, TextField as Bs, FormControlLabel as jo, FormLabel as Ls, Checkbox as Fs, MenuItem as Vs, ListItemText as zs, ListItemIcon as Li, Menu as Us, Grid as Fi, List as Hs, IconButton as Vi, Drawer as Ws, Paper as Gs, Slider as qs, Snackbar as Ks, Switch as Xs, AppBar as Ys, Toolbar as Js } from "@mui/material";
import Zs, { ThemeContext as Qs, internal_processStyles as el } from "@mui/styled-engine";
import * as tl from "react-dom";
import Nn from "react-dom";
import * as zi from "@radix-ui/react-label";
import { useReactTable as nl, getExpandedRowModel as rl, getGroupedRowModel as ol, getCoreRowModel as il, getSortedRowModel as al, flexRender as hr } from "@tanstack/react-table";
import sl, { SelectColumn as ll } from "react-data-grid";
var cl = Object.defineProperty, ul = (e, t, n) => t in e ? cl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (ul(e, typeof t != "symbol" ? t + "" : t, n), n);
const gt = [
  "GEN",
  "EXO",
  "LEV",
  "NUM",
  "DEU",
  "JOS",
  "JDG",
  "RUT",
  "1SA",
  "2SA",
  // 10
  "1KI",
  "2KI",
  "1CH",
  "2CH",
  "EZR",
  "NEH",
  "EST",
  "JOB",
  "PSA",
  "PRO",
  // 20
  "ECC",
  "SNG",
  "ISA",
  "JER",
  "LAM",
  "EZK",
  "DAN",
  "HOS",
  "JOL",
  "AMO",
  // 30
  "OBA",
  "JON",
  "MIC",
  "NAM",
  "HAB",
  "ZEP",
  "HAG",
  "ZEC",
  "MAL",
  "MAT",
  // 40
  "MRK",
  "LUK",
  "JHN",
  "ACT",
  "ROM",
  "1CO",
  "2CO",
  "GAL",
  "EPH",
  "PHP",
  // 50
  "COL",
  "1TH",
  "2TH",
  "1TI",
  "2TI",
  "TIT",
  "PHM",
  "HEB",
  "JAS",
  "1PE",
  // 60
  "2PE",
  "1JN",
  "2JN",
  "3JN",
  "JUD",
  "REV",
  "TOB",
  "JDT",
  "ESG",
  "WIS",
  // 70
  "SIR",
  "BAR",
  "LJE",
  "S3Y",
  "SUS",
  "BEL",
  "1MA",
  "2MA",
  "3MA",
  "4MA",
  // 80
  "1ES",
  "2ES",
  "MAN",
  "PS2",
  "ODA",
  "PSS",
  "JSA",
  // actual variant text for JOS, now in LXA text
  "JDB",
  // actual variant text for JDG, now in LXA text
  "TBS",
  // actual variant text for TOB, now in LXA text
  "SST",
  // actual variant text for SUS, now in LXA text // 90
  "DNT",
  // actual variant text for DAN, now in LXA text
  "BLT",
  // actual variant text for BEL, now in LXA text
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  // 100
  "BAK",
  "OTH",
  "3ES",
  // Used previously but really should be 2ES
  "EZA",
  // Used to be called 4ES, but not actually in any known project
  "5EZ",
  // Used to be called 5ES, but not actually in any known project
  "6EZ",
  // Used to be called 6ES, but not actually in any known project
  "INT",
  "CNC",
  "GLO",
  "TDX",
  // 110
  "NDX",
  "DAG",
  "PS3",
  "2BA",
  "LBA",
  "JUB",
  "ENO",
  "1MQ",
  "2MQ",
  "3MQ",
  // 120
  "REP",
  "4BA",
  "LAO"
], Gr = [
  "XXA",
  "XXB",
  "XXC",
  "XXD",
  "XXE",
  "XXF",
  "XXG",
  "FRT",
  "BAK",
  "OTH",
  "INT",
  "CNC",
  "GLO",
  "TDX",
  "NDX"
], Ui = [
  "Genesis",
  "Exodus",
  "Leviticus",
  "Numbers",
  "Deuteronomy",
  "Joshua",
  "Judges",
  "Ruth",
  "1 Samuel",
  "2 Samuel",
  "1 Kings",
  "2 Kings",
  "1 Chronicles",
  "2 Chronicles",
  "Ezra",
  "Nehemiah",
  "Esther (Hebrew)",
  "Job",
  "Psalms",
  "Proverbs",
  "Ecclesiastes",
  "Song of Songs",
  "Isaiah",
  "Jeremiah",
  "Lamentations",
  "Ezekiel",
  "Daniel (Hebrew)",
  "Hosea",
  "Joel",
  "Amos",
  "Obadiah",
  "Jonah",
  "Micah",
  "Nahum",
  "Habakkuk",
  "Zephaniah",
  "Haggai",
  "Zechariah",
  "Malachi",
  "Matthew",
  "Mark",
  "Luke",
  "John",
  "Acts",
  "Romans",
  "1 Corinthians",
  "2 Corinthians",
  "Galatians",
  "Ephesians",
  "Philippians",
  "Colossians",
  "1 Thessalonians",
  "2 Thessalonians",
  "1 Timothy",
  "2 Timothy",
  "Titus",
  "Philemon",
  "Hebrews",
  "James",
  "1 Peter",
  "2 Peter",
  "1 John",
  "2 John",
  "3 John",
  "Jude",
  "Revelation",
  "Tobit",
  "Judith",
  "Esther Greek",
  "Wisdom of Solomon",
  "Sirach (Ecclesiasticus)",
  "Baruch",
  "Letter of Jeremiah",
  "Song of 3 Young Men",
  "Susanna",
  "Bel and the Dragon",
  "1 Maccabees",
  "2 Maccabees",
  "3 Maccabees",
  "4 Maccabees",
  "1 Esdras (Greek)",
  "2 Esdras (Latin)",
  "Prayer of Manasseh",
  "Psalm 151",
  "Odes",
  "Psalms of Solomon",
  // WARNING, if you change the spelling of the *obsolete* tag be sure to update
  // IsObsolete routine
  "Joshua A. *obsolete*",
  "Judges B. *obsolete*",
  "Tobit S. *obsolete*",
  "Susanna Th. *obsolete*",
  "Daniel Th. *obsolete*",
  "Bel Th. *obsolete*",
  "Extra A",
  "Extra B",
  "Extra C",
  "Extra D",
  "Extra E",
  "Extra F",
  "Extra G",
  "Front Matter",
  "Back Matter",
  "Other Matter",
  "3 Ezra *obsolete*",
  "Apocalypse of Ezra",
  "5 Ezra (Latin Prologue)",
  "6 Ezra (Latin Epilogue)",
  "Introduction",
  "Concordance ",
  "Glossary ",
  "Topical Index",
  "Names Index",
  "Daniel Greek",
  "Psalms 152-155",
  "2 Baruch (Apocalypse)",
  "Letter of Baruch",
  "Jubilees",
  "Enoch",
  "1 Meqabyan",
  "2 Meqabyan",
  "3 Meqabyan",
  "Reproof (Proverbs 25-31)",
  "4 Baruch (Rest of Baruch)",
  "Laodiceans"
], Bo = wl();
function Ut(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Bo ? Bo[e] : 0;
}
function qr(e) {
  return Ut(e) > 0;
}
function dl(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return t >= 40 && t <= 66;
}
function pl(e) {
  return (typeof e == "string" ? Ut(e) : e) <= 39;
}
function Hi(e) {
  return e <= 66;
}
function fl(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return qi(t) && !Hi(t);
}
function* hl() {
  for (let e = 1; e <= gt.length; e++)
    yield e;
}
const ml = 1, Wi = gt.length;
function gl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Kr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= gt.length ? t : gt[n];
}
function Gi(e) {
  return e <= 0 || e > Wi ? "******" : Ui[e - 1];
}
function bl(e) {
  return Gi(Ut(e));
}
function qi(e) {
  const t = typeof e == "number" ? Kr(e) : e;
  return qr(t) && !Gr.includes(t);
}
function vl(e) {
  const t = typeof e == "number" ? Kr(e) : e;
  return qr(t) && Gr.includes(t);
}
function yl(e) {
  return Ui[e - 1].includes("*obsolete*");
}
function wl() {
  const e = {};
  for (let t = 0; t < gt.length; t++)
    e[gt[t]] = t + 1;
  return e;
}
const ie = {
  allBookIds: gt,
  nonCanonicalIds: Gr,
  bookIdToNumber: Ut,
  isBookIdValid: qr,
  isBookNT: dl,
  isBookOT: pl,
  isBookOTNT: Hi,
  isBookDC: fl,
  allBookNumbers: hl,
  firstBook: ml,
  lastBook: Wi,
  extraBooks: gl,
  bookNumberToId: Kr,
  bookNumberToEnglishName: Gi,
  bookIdToEnglishName: bl,
  isCanonical: qi,
  isExtraMaterial: vl,
  isObsolete: yl
};
var rt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(rt || {});
const Ie = class {
  // private versInfo: Versification;
  constructor(t) {
    if (te(this, "name"), te(this, "fullPath"), te(this, "isPresent"), te(this, "hasVerseSegments"), te(this, "isCustomized"), te(this, "baseVersification"), te(this, "scriptureBooks"), te(this, "_type"), t != null)
      typeof t == "string" ? this.name = t : this._type = t;
    else
      throw new Error("Argument null");
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
te(Ie, "Original", new Ie(rt.Original)), te(Ie, "Septuagint", new Ie(rt.Septuagint)), te(Ie, "Vulgate", new Ie(rt.Vulgate)), te(Ie, "English", new Ie(rt.English)), te(Ie, "RussianProtestant", new Ie(rt.RussianProtestant)), te(Ie, "RussianOrthodox", new Ie(rt.RussianOrthodox));
let $t = Ie;
function Lo(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Ki = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ki || {});
const Ne = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof $t ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof $t ? n : void 0;
        this.setEmpty(i), this._verseNum = t % oe.chapterDigitShifter, this._chapterNum = Math.floor(
          t % oe.bookDigitShifter / oe.chapterDigitShifter
        ), this._bookNum = Math.floor(t / oe.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof oe) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof $t ? t : oe.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? oe.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, n = oe.defaultVersification) {
    const r = new oe(n);
    return r.parse(t), r;
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(t) {
    return t.length > 0 && "0123456789".includes(t[0]) && !t.endsWith(this.verseRangeSeparator) && !t.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(t) {
    let n;
    try {
      return n = oe.parse(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Yt)
        return n = new oe(), { success: !1, verseRef: n };
      throw r;
    }
  }
  /**
   * Gets the reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   * @param bookNum - Book number (this is 1-based, not an index).
   * @param chapterNum - Chapter number.
   * @param verseNum - Verse number.
   * @returns The reference as a comparable integer where the book, chapter, and verse each occupy 3
   * digits.
   */
  static getBBBCCCVVV(t, n, r) {
    return t % oe.bcvMaxValue * oe.bookDigitShifter + (n >= 0 ? n % oe.bcvMaxValue * oe.chapterDigitShifter : 0) + (r >= 0 ? r % oe.bcvMaxValue : 0);
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(t) {
    let n;
    if (!t)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let r;
    for (let o = 0; o < t.length; o++) {
      if (r = t[o], r < "0" || r > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - +"0", n > oe.bcvMaxValue)
        return n = -1, { success: !1, vNum: n };
    }
    return { success: !0, vNum: n };
  }
  /**
   * Checks to see if a VerseRef hasn't been set - all values are the default.
   */
  get isDefault() {
    return this.bookNum === 0 && this.chapterNum === 0 && this.verseNum === 0 && this.versification == null;
  }
  /**
   * Gets whether the verse contains multiple verses.
   */
  get hasMultiple() {
    return this._verse != null && (this._verse.includes(oe.verseRangeSeparator) || this._verse.includes(oe.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ie.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = ie.bookIdToNumber(t);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(t) {
    const n = +t;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(t) {
    const { success: n, vNum: r } = oe.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = oe.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > ie.lastBook)
      throw new Yt(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = t;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(t) {
    this.chapterNum = t;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(t) {
    this._verseNum = t;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var t;
    return (t = this.versification) == null ? void 0 : t.name;
  }
  set versificationStr(t) {
    this.versification = this.versification != null ? new $t(t) : void 0;
  }
  /**
   * Determines if the reference is valid.
   */
  get valid() {
    return this.validStatus === 0;
  }
  /**
   * Get the valid status for this reference.
   */
  get validStatus() {
    return this.validateVerse(oe.verseRangeSeparators, oe.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return oe.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
  }
  /**
   * Gets whether the verse is defined as an excluded verse in the versification.
   * Does not handle verse ranges.
   */
  // eslint-disable-next-line @typescript-eslint/class-literal-property-style
  get isExcluded() {
    return !1;
  }
  /**
   * Parses the reference in the specified string.
   * Optionally versification can follow reference as in GEN 3:11/4
   * Throw an exception if
   * - invalid book name
   * - chapter number is missing or not a number
   * - verse number is missing or does not start with a number
   * - versification is invalid
   * @param verseStr - string to parse e.g. 'MAT 3:11'
   */
  parse(t) {
    if (t = t.replace(this.rtlMark, ""), t.includes("/")) {
      const i = t.split("/");
      if (t = i[0], i.length > 1)
        try {
          const s = +i[1].trim();
          this.versification = new $t(rt[s]);
        } catch {
          throw new Yt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Yt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ie.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
      throw new Yt("Invalid reference : " + t);
    this.updateInternal(n[0], r[0], r[1]);
  }
  /**
   * Simplifies this verse ref so that it has no bridging of verses or
   * verse segments like `'1a'`.
   */
  simplify() {
    this._verse = void 0;
  }
  /**
   * Makes a clone of the reference.
   *
   * @returns The cloned VerseRef.
   */
  clone() {
    return new oe(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied on, `false` otherwise.
   */
  equals(t) {
    return t instanceof oe ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && t.versification != null && this.versification != null && t.versification.equals(this.versification) : !1;
  }
  /**
   * Enumerate all individual verses contained in a VerseRef.
   * Verse ranges are indicated by "-" and consecutive verses by ","s.
   * Examples:
   * GEN 1:2 returns GEN 1:2
   * GEN 1:1a-3b,5 returns GEN 1:1a, GEN 1:2, GEN 1:3b, GEN 1:5
   * GEN 1:2a-2c returns //! ??????
   *
   * @param specifiedVersesOnly - if set to <c>true</c> return only verses that are
   * explicitly specified only, not verses within a range. Defaults to `false`.
   * @param verseRangeSeparators - Verse range separators.
   * Defaults to `VerseRef.verseRangeSeparators`.
   * @param verseSequenceSeparators - Verse sequence separators.
   * Defaults to `VerseRef.verseSequenceIndicators`.
   * @returns An array of all single verse references in this VerseRef.
   */
  allVerses(t = !1, n = oe.verseRangeSeparators, r = oe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = Lo(this._verse, r);
    for (const s of i.map((l) => Lo(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const u = this.clone();
        if (u.verse = s[1], !t)
          for (let d = c + 1; d < u.verseNum; d++) {
            const f = new oe(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(f);
          }
        o.push(u);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(t, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const o of this.allVerses(!0, t, n)) {
      const i = o.internalValid;
      if (i !== 0)
        return i;
      const s = o.BBBCCCVVV;
      if (r > s)
        return 3;
      if (r === s)
        return 4;
      r = s;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ie.lastBook ? 2 : (ie.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ie.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(Ne, "defaultVersification", $t.English), te(Ne, "verseRangeSeparator", "-"), te(Ne, "verseSequenceIndicator", ","), te(Ne, "verseRangeSeparators", [Ne.verseRangeSeparator]), te(Ne, "verseSequenceIndicators", [Ne.verseSequenceIndicator]), te(Ne, "chapterDigitShifter", 1e3), te(Ne, "bookDigitShifter", Ne.chapterDigitShifter * Ne.chapterDigitShifter), te(Ne, "bcvMaxValue", Ne.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Ne, "ValidStatusType", Ki);
class Yt extends Error {
}
function ye(...e) {
  return Ds(As(e));
}
const xl = ge.Root, El = ge.Trigger, Tl = k.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ ue(
  ge.SubTrigger,
  {
    ref: o,
    className: ye(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ x(Ns, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Tl.displayName = ge.SubTrigger.displayName;
const kl = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ge.SubContent,
  {
    ref: n,
    className: ye(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
kl.displayName = ge.SubContent.displayName;
const Xi = k.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ x(ge.Portal, { children: /* @__PURE__ */ x(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: ye(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Xi.displayName = ge.Content.displayName;
const Yi = k.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ x(
  ge.Item,
  {
    ref: r,
    className: ye(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Yi.displayName = ge.Item.displayName;
const Ol = k.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ ue(
  ge.CheckboxItem,
  {
    ref: o,
    className: ye(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(ge.ItemIndicator, { children: /* @__PURE__ */ x(Ps, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Ol.displayName = ge.CheckboxItem.displayName;
const Sl = k.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ue(
  ge.RadioItem,
  {
    ref: r,
    className: ye(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(ge.ItemIndicator, { children: /* @__PURE__ */ x(Rs, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Sl.displayName = ge.RadioItem.displayName;
const Xr = k.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ x(
  ge.Label,
  {
    ref: r,
    className: ye("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Xr.displayName = ge.Label.displayName;
const Ji = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ge.Separator,
  {
    ref: n,
    className: ye("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ji.displayName = ge.Separator.displayName;
const Yr = k.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ x(
    "input",
    {
      type: t,
      className: ye(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Yr.displayName = "Input";
const Cl = Xn(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ ue("div", { className: "pr-relative", children: [
    /* @__PURE__ */ x(
      Yr,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (s) => e(s.target.value),
        onKeyDown: (s) => {
          s.key === "Enter" && r(), t(s);
        },
        onClick: n,
        ref: i
      }
    ),
    /* @__PURE__ */ x(
      $s,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function Nl({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), s = Ee(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ x("div", { className: ye("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ x(
    "div",
    {
      className: ye(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": l === n,
          "pr-bg-amber-200": l === r
        }
      ),
      onClick: (c) => {
        c.preventDefault(), c.stopPropagation(), e(l);
      },
      role: "button",
      onKeyDown: (c) => {
        c.key === "Enter" && e(l);
      },
      tabIndex: 0,
      onMouseMove: () => s(l),
      children: l
    },
    l
  )) });
}
const Pl = Xn(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => /* @__PURE__ */ ue(
    Yi,
    {
      ref: l,
      textValue: e,
      className: ye("pr-font-normal pr-text-slate-700", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": n
      }),
      onSelect: (c) => {
        c.preventDefault(), t();
      },
      onKeyDown: (c) => {
        o(c);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ x(
          "span",
          {
            className: ye(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: ie.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ x("div", { children: s })
      ]
    },
    e
  )
);
function Rl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ ue(Xr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ x("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ ue("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ x(
        Ms,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ x(
        Is,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ x(
        _s,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const ln = ie.allBookIds, $l = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Fo = ["OT", "NT", "DC"], Ml = 32 + 32 + 32, Il = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], _l = (e) => ({
  OT: ln.filter((n) => ie.isBookOT(n)),
  NT: ln.filter((n) => ie.isBookNT(n)),
  DC: ln.filter((n) => ie.isBookDC(n))
})[e], Jt = (e) => ji(ie.bookIdToNumber(e));
function Al() {
  return ln.map((t) => ie.bookIdToEnglishName(t));
}
function Dl(e) {
  return Al().includes(e);
}
function jl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Dl(t))
    return ln.find((r) => ie.bookIdToEnglishName(r) === t);
}
function mm({ scrRef: e, handleSubmit: t }) {
  const [n, r] = xe(""), [o, i] = xe(
    ie.bookNumberToId(e.bookNum)
  ), [s, l] = xe(e.chapterNum ?? 0), [c, u] = xe(
    ie.bookNumberToId(e.bookNum)
  ), [d, f] = xe(!1), [p, b] = xe(d), v = ft(void 0), g = ft(void 0), m = ft(void 0), E = Ee(
    (P) => _l(P).filter((T) => {
      const S = ie.bookIdToEnglishName(T).toLowerCase(), $ = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return S.includes($) || // Match book name
      T.toLowerCase().includes($);
    }),
    [n]
  ), _ = (P) => {
    r(P);
  }, y = ft(!1), w = Ee((P) => {
    if (y.current) {
      y.current = !1;
      return;
    }
    f(P);
  }, []), h = Ee(
    (P, T, S, $) => {
      if (l(
        ie.bookNumberToId(e.bookNum) !== P ? 1 : e.chapterNum
      ), T || Jt(P) === -1) {
        t({
          bookNum: ie.bookIdToNumber(P),
          chapterNum: S || 1,
          verseNum: $ || 1
        }), f(!1), r("");
        return;
      }
      i(o !== P ? P : ""), f(!T);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), N = (P) => {
    P <= 0 || P > Jt(o) || h(o, !0, P);
  }, R = Ee(() => {
    Il.forEach((P) => {
      const T = n.match(P);
      if (T) {
        const [S, $ = void 0, A = void 0] = T.slice(1), I = jl(S);
        (ie.isBookIdValid(S) || I) && h(
          I ?? S,
          !0,
          $ ? parseInt($, 10) : 1,
          A ? parseInt(A, 10) : 1
        );
      }
    });
  }, [h, n]), L = Ee(
    (P) => {
      d ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null && g.current.focus(), P.preventDefault()) : f(!0);
    },
    [d]
  ), B = (P) => {
    const { key: T } = P;
    T === "ArrowRight" || T === "ArrowLeft" || T === "ArrowDown" || T === "ArrowUp" || T === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: T })), v.current.focus());
  }, F = (P) => {
    const { key: T } = P;
    if (c === o) {
      if (T === "Enter") {
        P.preventDefault(), h(o, !0, s);
        return;
      }
      let S = 0;
      if (T === "ArrowRight")
        if (s < Jt(c))
          S = 1;
        else {
          P.preventDefault();
          return;
        }
      else if (T === "ArrowLeft")
        if (s > 1)
          S = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        T === "ArrowDown" ? S = 6 : T === "ArrowUp" && (S = -6);
      s + S <= 0 || s + S > Jt(c) ? l(0) : S !== 0 && (l(s + S), P.preventDefault());
    }
  };
  return mt(() => {
    o === c ? o === ie.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), Io(() => {
    b(d);
  }, [d]), Io(() => {
    const P = setTimeout(() => {
      if (p && g.current && m.current) {
        const S = m.current.offsetTop - Ml;
        g.current.scrollTo({ top: S, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [p]), /* @__PURE__ */ x("div", { children: /* @__PURE__ */ ue(xl, { modal: !1, open: d, onOpenChange: w, children: [
    /* @__PURE__ */ x(El, { asChild: !0, children: /* @__PURE__ */ x(
      Cl,
      {
        ref: v,
        value: n,
        handleSearch: _,
        handleKeyDown: L,
        handleOnClick: () => {
          i(ie.bookNumberToId(e.bookNum)), u(ie.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), f(!0), v.current.focus();
        },
        onFocus: () => {
          y.current = !0;
        },
        handleSubmit: R,
        placeholder: `${ie.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ ue(
      Xi,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: B,
        align: "start",
        ref: g,
        children: [
          /* @__PURE__ */ x(
            Rl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Fo.map(
            (P, T) => E(P).length > 0 && /* @__PURE__ */ ue("div", { children: [
              /* @__PURE__ */ x(Xr, { className: "pr-font-semibold pr-text-slate-700", children: $l[P] }),
              E(P).map((S) => /* @__PURE__ */ x("div", { children: /* @__PURE__ */ x(
                Pl,
                {
                  bookId: S,
                  handleSelectBook: () => h(S, !1),
                  isSelected: o === S,
                  handleHighlightBook: () => u(S),
                  handleKeyDown: F,
                  bookType: P,
                  ref: ($) => {
                    o === S && (m.current = $);
                  },
                  children: /* @__PURE__ */ x(
                    Nl,
                    {
                      handleSelectChapter: N,
                      endChapter: Jt(S),
                      activeChapter: e.bookNum === ie.bookIdToNumber(S) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: ($) => {
                        l($);
                      }
                    }
                  )
                }
              ) }, S)),
              Fo.length - 1 !== T ? /* @__PURE__ */ x(Ji, {}) : void 0
            ] }, P)
          )
        ]
      }
    )
  ] }) });
}
function O() {
  return O = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, O.apply(this, arguments);
}
function Bl(e, t) {
  typeof e == "function" ? e(t) : e != null && (e.current = t);
}
function Ll(...e) {
  return (t) => e.forEach(
    (n) => Bl(n, t)
  );
}
const Zi = /* @__PURE__ */ Xn((e, t) => {
  const { children: n, ...r } = e, o = sn.toArray(n), i = o.find(Vl);
  if (i) {
    const s = i.props.children, l = o.map((c) => c === i ? sn.count(s) > 1 ? sn.only(null) : /* @__PURE__ */ Bn(s) ? s.props.children : null : c);
    return /* @__PURE__ */ Rr(Mr, O({}, r, {
      ref: t
    }), /* @__PURE__ */ Bn(s) ? /* @__PURE__ */ Di(s, void 0, l) : null);
  }
  return /* @__PURE__ */ Rr(Mr, O({}, r, {
    ref: t
  }), n);
});
Zi.displayName = "Slot";
const Mr = /* @__PURE__ */ Xn((e, t) => {
  const { children: n, ...r } = e;
  return /* @__PURE__ */ Bn(n) ? /* @__PURE__ */ Di(n, {
    ...zl(r, n.props),
    ref: t ? Ll(t, n.ref) : n.ref
  }) : sn.count(n) > 1 ? sn.only(null) : null;
});
Mr.displayName = "SlotClone";
const Fl = ({ children: e }) => /* @__PURE__ */ Rr(ks, null, e);
function Vl(e) {
  return /* @__PURE__ */ Bn(e) && e.type === Fl;
}
function zl(e, t) {
  const n = {
    ...t
  };
  for (const r in t) {
    const o = e[r], i = t[r];
    /^on[A-Z]/.test(r) ? o && i ? n[r] = (...l) => {
      i(...l), o(...l);
    } : o && (n[r] = o) : r === "style" ? n[r] = {
      ...o,
      ...i
    } : r === "className" && (n[r] = [
      o,
      i
    ].filter(Boolean).join(" "));
  }
  return {
    ...e,
    ...n
  };
}
const Ul = Bi(
  "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",
  {
    variants: {
      variant: {
        default: "pr-bg-primary pr-text-primary-foreground hover:pr-bg-primary/90",
        destructive: "pr-bg-destructive pr-text-destructive-foreground hover:pr-bg-destructive/90",
        outline: "pr-border pr-border-input pr-bg-background hover:pr-bg-accent hover:pr-text-accent-foreground",
        secondary: "pr-bg-secondary pr-text-secondary-foreground hover:pr-bg-secondary/80",
        ghost: "hover:pr-bg-accent hover:pr-text-accent-foreground",
        link: "pr-text-primary pr-underline-offset-4 hover:pr-underline"
      },
      size: {
        default: "pr-h-10 pr-px-4 pr-py-2",
        sm: "pr-h-9 pr-rounded-md pr-px-3",
        lg: "pr-h-11 pr-rounded-md pr-px-8",
        icon: "pr-h-10 pr-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Qi = k.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ x(r ? Zi : "button", { className: ye(Ul({ variant: t, size: n, className: e })), ref: i, ...o })
);
Qi.displayName = "Button";
function kt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ x(
    Qi,
    {
      id: e,
      disabled: t,
      className: ye("papi-button", n),
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function Ir({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: l = [],
  className: c,
  value: u,
  onChange: d,
  onFocus: f,
  onBlur: p,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ x(
    js,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: d,
      onFocus: f,
      onBlur: p,
      getOptionLabel: b,
      renderInput: (v) => /* @__PURE__ */ x(
        Bs,
        {
          ...v,
          error: o,
          fullWidth: i,
          disabled: n,
          label: t,
          style: { width: s }
        }
      )
    }
  );
}
function gm({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const s = xt(
    () => Array.from({ length: i }, (u, d) => d + 1),
    [i]
  ), l = (u, d) => {
    n(d), d > t && r(d);
  }, c = (u, d) => {
    r(d), d < e && n(d);
  };
  return /* @__PURE__ */ ue(Kn, { children: [
    /* @__PURE__ */ x(
      jo,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ x(
          Ir,
          {
            onChange: (u, d) => l(u, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (u) => u.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ x(
      jo,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ x(
          Ir,
          {
            onChange: (u, d) => c(u, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (u) => u.toString(),
            value: t,
            isDisabled: o
          },
          "end chapter"
        ),
        label: "to",
        labelPlacement: "start"
      }
    )
  ] });
}
var Mt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Mt || {});
function Hl({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Mt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const d = /* @__PURE__ */ x(
    Fs,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: u
    }
  );
  let f;
  if (n) {
    const p = r === Mt.Before || r === Mt.Above, b = /* @__PURE__ */ x("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === Mt.Before || r === Mt.After, g = v ? b : /* @__PURE__ */ x("div", { children: b }), m = v ? d : /* @__PURE__ */ x("div", { children: d });
    f = /* @__PURE__ */ ue(
      Ls,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          p && g,
          m,
          !p && g
        ]
      }
    );
  } else
    f = d;
  return f;
}
function de(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function Wl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Gl(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    n.prototype = t.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(e).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(e, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[r];
      }
    });
  }), n;
}
var _r = { exports: {} }, Pn = { exports: {} }, ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vo;
function ql() {
  if (Vo)
    return ae;
  Vo = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
  function y(h) {
    if (typeof h == "object" && h !== null) {
      var N = h.$$typeof;
      switch (N) {
        case t:
          switch (h = h.type, h) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case f:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case d:
                case v:
                case b:
                case s:
                  return h;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function w(h) {
    return y(h) === u;
  }
  return ae.AsyncMode = c, ae.ConcurrentMode = u, ae.ContextConsumer = l, ae.ContextProvider = s, ae.Element = t, ae.ForwardRef = d, ae.Fragment = r, ae.Lazy = v, ae.Memo = b, ae.Portal = n, ae.Profiler = i, ae.StrictMode = o, ae.Suspense = f, ae.isAsyncMode = function(h) {
    return w(h) || y(h) === c;
  }, ae.isConcurrentMode = w, ae.isContextConsumer = function(h) {
    return y(h) === l;
  }, ae.isContextProvider = function(h) {
    return y(h) === s;
  }, ae.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, ae.isForwardRef = function(h) {
    return y(h) === d;
  }, ae.isFragment = function(h) {
    return y(h) === r;
  }, ae.isLazy = function(h) {
    return y(h) === v;
  }, ae.isMemo = function(h) {
    return y(h) === b;
  }, ae.isPortal = function(h) {
    return y(h) === n;
  }, ae.isProfiler = function(h) {
    return y(h) === i;
  }, ae.isStrictMode = function(h) {
    return y(h) === o;
  }, ae.isSuspense = function(h) {
    return y(h) === f;
  }, ae.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === r || h === u || h === i || h === o || h === f || h === p || typeof h == "object" && h !== null && (h.$$typeof === v || h.$$typeof === b || h.$$typeof === s || h.$$typeof === l || h.$$typeof === d || h.$$typeof === m || h.$$typeof === E || h.$$typeof === _ || h.$$typeof === g);
  }, ae.typeOf = y, ae;
}
var se = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zo;
function Kl() {
  return zo || (zo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, f = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, _ = e ? Symbol.for("react.scope") : 60119;
    function y(D) {
      return typeof D == "string" || typeof D == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      D === r || D === u || D === i || D === o || D === f || D === p || typeof D == "object" && D !== null && (D.$$typeof === v || D.$$typeof === b || D.$$typeof === s || D.$$typeof === l || D.$$typeof === d || D.$$typeof === m || D.$$typeof === E || D.$$typeof === _ || D.$$typeof === g);
    }
    function w(D) {
      if (typeof D == "object" && D !== null) {
        var Q = D.$$typeof;
        switch (Q) {
          case t:
            var M = D.type;
            switch (M) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case f:
                return M;
              default:
                var re = M && M.$$typeof;
                switch (re) {
                  case l:
                  case d:
                  case v:
                  case b:
                  case s:
                    return re;
                  default:
                    return Q;
                }
            }
          case n:
            return Q;
        }
      }
    }
    var h = c, N = u, R = l, L = s, B = t, F = d, P = r, T = v, S = b, $ = n, A = i, I = o, V = f, Y = !1;
    function Z(D) {
      return Y || (Y = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(D) || w(D) === c;
    }
    function C(D) {
      return w(D) === u;
    }
    function j(D) {
      return w(D) === l;
    }
    function U(D) {
      return w(D) === s;
    }
    function K(D) {
      return typeof D == "object" && D !== null && D.$$typeof === t;
    }
    function z(D) {
      return w(D) === d;
    }
    function H(D) {
      return w(D) === r;
    }
    function G(D) {
      return w(D) === v;
    }
    function q(D) {
      return w(D) === b;
    }
    function W(D) {
      return w(D) === n;
    }
    function X(D) {
      return w(D) === i;
    }
    function J(D) {
      return w(D) === o;
    }
    function ne(D) {
      return w(D) === f;
    }
    se.AsyncMode = h, se.ConcurrentMode = N, se.ContextConsumer = R, se.ContextProvider = L, se.Element = B, se.ForwardRef = F, se.Fragment = P, se.Lazy = T, se.Memo = S, se.Portal = $, se.Profiler = A, se.StrictMode = I, se.Suspense = V, se.isAsyncMode = Z, se.isConcurrentMode = C, se.isContextConsumer = j, se.isContextProvider = U, se.isElement = K, se.isForwardRef = z, se.isFragment = H, se.isLazy = G, se.isMemo = q, se.isPortal = W, se.isProfiler = X, se.isStrictMode = J, se.isSuspense = ne, se.isValidElementType = y, se.typeOf = w;
  }()), se;
}
var Uo;
function ea() {
  return Uo || (Uo = 1, process.env.NODE_ENV === "production" ? Pn.exports = ql() : Pn.exports = Kl()), Pn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var mr, Ho;
function Xl() {
  if (Ho)
    return mr;
  Ho = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(i) {
    if (i == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(i);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var i = new String("abc");
      if (i[5] = "de", Object.getOwnPropertyNames(i)[0] === "5")
        return !1;
      for (var s = {}, l = 0; l < 10; l++)
        s["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(s).map(function(d) {
        return s[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        u[d] = d;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return mr = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), u, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var f in l)
        t.call(l, f) && (c[f] = l[f]);
      if (e) {
        u = e(l);
        for (var p = 0; p < u.length; p++)
          n.call(l, u[p]) && (c[u[p]] = l[u[p]]);
      }
    }
    return c;
  }, mr;
}
var gr, Wo;
function Jr() {
  if (Wo)
    return gr;
  Wo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return gr = e, gr;
}
var br, Go;
function ta() {
  return Go || (Go = 1, br = Function.call.bind(Object.prototype.hasOwnProperty)), br;
}
var vr, qo;
function Yl() {
  if (qo)
    return vr;
  qo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Jr(), n = {}, r = ta();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, l, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (r(i, d)) {
          var f;
          try {
            if (typeof i[d] != "function") {
              var p = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            f = i[d](s, d, c, l, null, t);
          } catch (v) {
            f = v;
          }
          if (f && !(f instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var b = u ? u() : "";
            e(
              "Failed " + l + " type: " + f.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, vr = o, vr;
}
var yr, Ko;
function Jl() {
  if (Ko)
    return yr;
  Ko = 1;
  var e = ea(), t = Xl(), n = Jr(), r = ta(), o = Yl(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return yr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function f(C) {
      var j = C && (u && C[u] || C[d]);
      if (typeof j == "function")
        return j;
    }
    var p = "<<anonymous>>", b = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: _(),
      arrayOf: y,
      element: w(),
      elementType: h(),
      instanceOf: N,
      node: F(),
      objectOf: L,
      oneOf: R,
      oneOfType: B,
      shape: T,
      exact: S
    };
    function v(C, j) {
      return C === j ? C !== 0 || 1 / C === 1 / j : C !== C && j !== j;
    }
    function g(C, j) {
      this.message = C, this.data = j && typeof j == "object" ? j : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function m(C) {
      if (process.env.NODE_ENV !== "production")
        var j = {}, U = 0;
      function K(H, G, q, W, X, J, ne) {
        if (W = W || p, J = J || q, ne !== n) {
          if (c) {
            var D = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw D.name = "Invariant Violation", D;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = W + ":" + q;
            !j[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + J + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), j[Q] = !0, U++);
          }
        }
        return G[q] == null ? H ? G[q] === null ? new g("The " + X + " `" + J + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + X + " `" + J + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : C(G, q, W, X, J);
      }
      var z = K.bind(null, !1);
      return z.isRequired = K.bind(null, !0), z;
    }
    function E(C) {
      function j(U, K, z, H, G, q) {
        var W = U[K], X = I(W);
        if (X !== C) {
          var J = V(W);
          return new g(
            "Invalid " + H + " `" + G + "` of type " + ("`" + J + "` supplied to `" + z + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return m(j);
    }
    function _() {
      return m(s);
    }
    function y(C) {
      function j(U, K, z, H, G) {
        if (typeof C != "function")
          return new g("Property `" + G + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var q = U[K];
        if (!Array.isArray(q)) {
          var W = I(q);
          return new g("Invalid " + H + " `" + G + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var X = 0; X < q.length; X++) {
          var J = C(q, X, z, H, G + "[" + X + "]", n);
          if (J instanceof Error)
            return J;
        }
        return null;
      }
      return m(j);
    }
    function w() {
      function C(j, U, K, z, H) {
        var G = j[U];
        if (!l(G)) {
          var q = I(G);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + q + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(C);
    }
    function h() {
      function C(j, U, K, z, H) {
        var G = j[U];
        if (!e.isValidElementType(G)) {
          var q = I(G);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + q + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(C);
    }
    function N(C) {
      function j(U, K, z, H, G) {
        if (!(U[K] instanceof C)) {
          var q = C.name || p, W = Z(U[K]);
          return new g("Invalid " + H + " `" + G + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return m(j);
    }
    function R(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function j(U, K, z, H, G) {
        for (var q = U[K], W = 0; W < C.length; W++)
          if (v(q, C[W]))
            return null;
        var X = JSON.stringify(C, function(ne, D) {
          var Q = V(D);
          return Q === "symbol" ? String(D) : D;
        });
        return new g("Invalid " + H + " `" + G + "` of value `" + String(q) + "` " + ("supplied to `" + z + "`, expected one of " + X + "."));
      }
      return m(j);
    }
    function L(C) {
      function j(U, K, z, H, G) {
        if (typeof C != "function")
          return new g("Property `" + G + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var q = U[K], W = I(q);
        if (W !== "object")
          return new g("Invalid " + H + " `" + G + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var X in q)
          if (r(q, X)) {
            var J = C(q, X, z, H, G + "." + X, n);
            if (J instanceof Error)
              return J;
          }
        return null;
      }
      return m(j);
    }
    function B(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var j = 0; j < C.length; j++) {
        var U = C[j];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Y(U) + " at index " + j + "."
          ), s;
      }
      function K(z, H, G, q, W) {
        for (var X = [], J = 0; J < C.length; J++) {
          var ne = C[J], D = ne(z, H, G, q, W, n);
          if (D == null)
            return null;
          D.data && r(D.data, "expectedType") && X.push(D.data.expectedType);
        }
        var Q = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new g("Invalid " + q + " `" + W + "` supplied to " + ("`" + G + "`" + Q + "."));
      }
      return m(K);
    }
    function F() {
      function C(j, U, K, z, H) {
        return $(j[U]) ? null : new g("Invalid " + z + " `" + H + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return m(C);
    }
    function P(C, j, U, K, z) {
      return new g(
        (C || "React class") + ": " + j + " type `" + U + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function T(C) {
      function j(U, K, z, H, G) {
        var q = U[K], W = I(q);
        if (W !== "object")
          return new g("Invalid " + H + " `" + G + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var X in C) {
          var J = C[X];
          if (typeof J != "function")
            return P(z, H, G, X, V(J));
          var ne = J(q, X, z, H, G + "." + X, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return m(j);
    }
    function S(C) {
      function j(U, K, z, H, G) {
        var q = U[K], W = I(q);
        if (W !== "object")
          return new g("Invalid " + H + " `" + G + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var X = t({}, U[K], C);
        for (var J in X) {
          var ne = C[J];
          if (r(C, J) && typeof ne != "function")
            return P(z, H, G, J, V(ne));
          if (!ne)
            return new g(
              "Invalid " + H + " `" + G + "` key `" + J + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var D = ne(q, J, z, H, G + "." + J, n);
          if (D)
            return D;
        }
        return null;
      }
      return m(j);
    }
    function $(C) {
      switch (typeof C) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !C;
        case "object":
          if (Array.isArray(C))
            return C.every($);
          if (C === null || l(C))
            return !0;
          var j = f(C);
          if (j) {
            var U = j.call(C), K;
            if (j !== C.entries) {
              for (; !(K = U.next()).done; )
                if (!$(K.value))
                  return !1;
            } else
              for (; !(K = U.next()).done; ) {
                var z = K.value;
                if (z && !$(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function A(C, j) {
      return C === "symbol" ? !0 : j ? j["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && j instanceof Symbol : !1;
    }
    function I(C) {
      var j = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : A(j, C) ? "symbol" : j;
    }
    function V(C) {
      if (typeof C > "u" || C === null)
        return "" + C;
      var j = I(C);
      if (j === "object") {
        if (C instanceof Date)
          return "date";
        if (C instanceof RegExp)
          return "regexp";
      }
      return j;
    }
    function Y(C) {
      var j = V(C);
      switch (j) {
        case "array":
        case "object":
          return "an " + j;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + j;
        default:
          return j;
      }
    }
    function Z(C) {
      return !C.constructor || !C.constructor.name ? p : C.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, yr;
}
var wr, Xo;
function Zl() {
  if (Xo)
    return wr;
  Xo = 1;
  var e = Jr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, wr = function() {
    function r(s, l, c, u, d, f) {
      if (f !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
      }
    }
    r.isRequired = r;
    function o() {
      return r;
    }
    var i = {
      array: r,
      bigint: r,
      bool: r,
      func: r,
      number: r,
      object: r,
      string: r,
      symbol: r,
      any: r,
      arrayOf: o,
      element: r,
      elementType: r,
      instanceOf: o,
      node: r,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: n,
      resetWarningCache: t
    };
    return i.PropTypes = i, i;
  }, wr;
}
if (process.env.NODE_ENV !== "production") {
  var Ql = ea(), ec = !0;
  _r.exports = Jl()(Ql.isElement, ec);
} else
  _r.exports = Zl()();
var tc = _r.exports;
const a = /* @__PURE__ */ Wl(tc);
function Ht(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function pt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function na(e) {
  if (!pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = na(e[n]);
  }), t;
}
function Ye(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? O({}, e) : e;
  return pt(e) && pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (pt(t[o]) && o in e && pt(e[o]) ? r[o] = Ye(e[o], t[o], n) : n.clone ? r[o] = pt(t[o]) ? na(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function nc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ra(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !nc(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const oa = Ht(a.element, ra);
oa.isRequired = Ht(a.element.isRequired, ra);
const vn = oa;
function rc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function oc(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !rc(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ic = Ht(a.elementType, oc), ac = "exact-prop: ​";
function ia(e) {
  return process.env.NODE_ENV === "production" ? e : O({}, e, {
    [ac]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function jt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Ar = { exports: {} }, le = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Yo;
function sc() {
  if (Yo)
    return le;
  Yo = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function g(m) {
    if (typeof m == "object" && m !== null) {
      var E = m.$$typeof;
      switch (E) {
        case e:
          switch (m = m.type, m) {
            case n:
            case o:
            case r:
            case u:
            case d:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case s:
                case c:
                case p:
                case f:
                case i:
                  return m;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return le.ContextConsumer = s, le.ContextProvider = i, le.Element = e, le.ForwardRef = c, le.Fragment = n, le.Lazy = p, le.Memo = f, le.Portal = t, le.Profiler = o, le.StrictMode = r, le.Suspense = u, le.SuspenseList = d, le.isAsyncMode = function() {
    return !1;
  }, le.isConcurrentMode = function() {
    return !1;
  }, le.isContextConsumer = function(m) {
    return g(m) === s;
  }, le.isContextProvider = function(m) {
    return g(m) === i;
  }, le.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, le.isForwardRef = function(m) {
    return g(m) === c;
  }, le.isFragment = function(m) {
    return g(m) === n;
  }, le.isLazy = function(m) {
    return g(m) === p;
  }, le.isMemo = function(m) {
    return g(m) === f;
  }, le.isPortal = function(m) {
    return g(m) === t;
  }, le.isProfiler = function(m) {
    return g(m) === o;
  }, le.isStrictMode = function(m) {
    return g(m) === r;
  }, le.isSuspense = function(m) {
    return g(m) === u;
  }, le.isSuspenseList = function(m) {
    return g(m) === d;
  }, le.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === u || m === d || m === b || typeof m == "object" && m !== null && (m.$$typeof === p || m.$$typeof === f || m.$$typeof === i || m.$$typeof === s || m.$$typeof === c || m.$$typeof === v || m.getModuleId !== void 0);
  }, le.typeOf = g, le;
}
var ce = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Jo;
function lc() {
  return Jo || (Jo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, g = !1, m = !1, E = !1, _ = !1, y;
    y = Symbol.for("react.module.reference");
    function w(M) {
      return !!(typeof M == "string" || typeof M == "function" || M === n || M === o || _ || M === r || M === u || M === d || E || M === b || v || g || m || typeof M == "object" && M !== null && (M.$$typeof === p || M.$$typeof === f || M.$$typeof === i || M.$$typeof === s || M.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      M.$$typeof === y || M.getModuleId !== void 0));
    }
    function h(M) {
      if (typeof M == "object" && M !== null) {
        var re = M.$$typeof;
        switch (re) {
          case e:
            var ve = M.type;
            switch (ve) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return ve;
              default:
                var Se = ve && ve.$$typeof;
                switch (Se) {
                  case l:
                  case s:
                  case c:
                  case p:
                  case f:
                  case i:
                    return Se;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var N = s, R = i, L = e, B = c, F = n, P = p, T = f, S = t, $ = o, A = r, I = u, V = d, Y = !1, Z = !1;
    function C(M) {
      return Y || (Y = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function j(M) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(M) {
      return h(M) === s;
    }
    function K(M) {
      return h(M) === i;
    }
    function z(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function H(M) {
      return h(M) === c;
    }
    function G(M) {
      return h(M) === n;
    }
    function q(M) {
      return h(M) === p;
    }
    function W(M) {
      return h(M) === f;
    }
    function X(M) {
      return h(M) === t;
    }
    function J(M) {
      return h(M) === o;
    }
    function ne(M) {
      return h(M) === r;
    }
    function D(M) {
      return h(M) === u;
    }
    function Q(M) {
      return h(M) === d;
    }
    ce.ContextConsumer = N, ce.ContextProvider = R, ce.Element = L, ce.ForwardRef = B, ce.Fragment = F, ce.Lazy = P, ce.Memo = T, ce.Portal = S, ce.Profiler = $, ce.StrictMode = A, ce.Suspense = I, ce.SuspenseList = V, ce.isAsyncMode = C, ce.isConcurrentMode = j, ce.isContextConsumer = U, ce.isContextProvider = K, ce.isElement = z, ce.isForwardRef = H, ce.isFragment = G, ce.isLazy = q, ce.isMemo = W, ce.isPortal = X, ce.isProfiler = J, ce.isStrictMode = ne, ce.isSuspense = D, ce.isSuspenseList = Q, ce.isValidElementType = w, ce.typeOf = h;
  }()), ce;
}
process.env.NODE_ENV === "production" ? Ar.exports = sc() : Ar.exports = lc();
var Ln = Ar.exports;
const cc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function uc(e) {
  const t = `${e}`.match(cc);
  return t && t[1] || "";
}
function aa(e, t = "") {
  return e.displayName || e.name || uc(e) || t;
}
function Zo(e, t, n) {
  const r = aa(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function dc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return aa(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ln.ForwardRef:
          return Zo(e, e.render, "ForwardRef");
        case Ln.Memo:
          return Zo(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Je(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const pc = a.oneOfType([a.func, a.object]), Zr = pc;
function He(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : jt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Dr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function sa(e, t = 166) {
  let n;
  function r(...o) {
    const i = () => {
      e.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(i, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function fc(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function hc(e, t) {
  var n, r;
  return /* @__PURE__ */ k.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function ke(e) {
  return e && e.ownerDocument || document;
}
function Bt(e) {
  return ke(e).defaultView || window;
}
function mc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? O({}, t.propTypes) : null;
  return (o) => (i, s, l, c, u, ...d) => {
    const f = u || s, p = n == null ? void 0 : n[f];
    if (p) {
      const b = p(i, s, l, c, u, ...d);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${f}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Fn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const gc = typeof window < "u" ? k.useLayoutEffect : k.useEffect, bt = gc;
let Qo = 0;
function bc(e) {
  const [t, n] = k.useState(e), r = e || t;
  return k.useEffect(() => {
    t == null && (Qo += 1, n(`mui-${Qo}`));
  }, [t]), r;
}
const ei = k["useId".toString()];
function la(e) {
  if (ei !== void 0) {
    const t = ei();
    return e ?? t;
  }
  return bc(e);
}
function vc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function ca({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = k.useRef(e !== void 0), [i, s] = k.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    k.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = k.useRef(t);
    k.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = k.useCallback((u) => {
    o || s(u);
  }, []);
  return [l, c];
}
function fn(e) {
  const t = k.useRef(e);
  return bt(() => {
    t.current = e;
  }), k.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Le(...e) {
  return k.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Fn(n, t);
    });
  }, e);
}
const ti = {};
function yc(e, t) {
  const n = k.useRef(ti);
  return n.current === ti && (n.current = e(t)), n;
}
const wc = [];
function xc(e) {
  k.useEffect(e, wc);
}
class yn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new yn();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, t);
  }
}
function nn() {
  const e = yc(yn.create).current;
  return xc(e.disposeEffect), e;
}
let Yn = !0, jr = !1;
const Ec = new yn(), Tc = {
  text: !0,
  search: !0,
  url: !0,
  tel: !0,
  email: !0,
  password: !0,
  number: !0,
  date: !0,
  month: !0,
  week: !0,
  time: !0,
  datetime: !0,
  "datetime-local": !0
};
function kc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Tc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Oc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Yn = !0);
}
function xr() {
  Yn = !1;
}
function Sc() {
  this.visibilityState === "hidden" && jr && (Yn = !0);
}
function Cc(e) {
  e.addEventListener("keydown", Oc, !0), e.addEventListener("mousedown", xr, !0), e.addEventListener("pointerdown", xr, !0), e.addEventListener("touchstart", xr, !0), e.addEventListener("visibilitychange", Sc, !0);
}
function Nc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Yn || kc(t);
}
function ua() {
  const e = k.useCallback((o) => {
    o != null && Cc(o.ownerDocument);
  }, []), t = k.useRef(!1);
  function n() {
    return t.current ? (jr = !0, Ec.start(100, () => {
      jr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Nc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function da(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Pc(e) {
  const t = typeof e;
  switch (t) {
    case "number":
      return Number.isNaN(e) ? "NaN" : Number.isFinite(e) ? e !== Math.floor(e) ? "float" : "number" : "Infinity";
    case "object":
      return e === null ? "null" : e.constructor.name;
    default:
      return t;
  }
}
function Rc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const $c = Number.isInteger || Rc;
function pa(e, t, n, r) {
  const o = e[t];
  if (o == null || !$c(o)) {
    const i = Pc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function fa(e, t, ...n) {
  return e[t] === void 0 ? null : pa(e, t, ...n);
}
function Br() {
  return null;
}
fa.isRequired = pa;
Br.isRequired = Br;
const ha = process.env.NODE_ENV === "production" ? Br : fa;
function ma(e, t) {
  const n = O({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = O({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = O({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = ma(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function et(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, s) => {
        if (s) {
          const l = t(s);
          l !== "" && i.push(l), n && n[s] && i.push(n[s]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const ni = (e) => e, Mc = () => {
  let e = ni;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = ni;
    }
  };
}, Ic = Mc(), ga = Ic, ba = {
  active: "active",
  checked: "checked",
  completed: "completed",
  disabled: "disabled",
  error: "error",
  expanded: "expanded",
  focused: "focused",
  focusVisible: "focusVisible",
  open: "open",
  readOnly: "readOnly",
  required: "required",
  selected: "selected"
};
function Ge(e, t, n = "Mui") {
  const r = ba[t];
  return r ? `${n}-${r}` : `${ga.generate(e)}-${t}`;
}
function it(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ge(e, o, n);
  }), r;
}
function _c(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function va(e) {
  return typeof e == "string";
}
function rn(e, t, n) {
  return e === void 0 || va(e) ? t : O({}, t, {
    ownerState: O({}, t.ownerState, n)
  });
}
const Ac = {
  disableDefaultClasses: !1
}, Dc = /* @__PURE__ */ k.createContext(Ac);
function jc(e) {
  const {
    disableDefaultClasses: t
  } = k.useContext(Dc);
  return (n) => t ? "" : e(n);
}
function ya(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Bc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function ri(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Lc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = Te(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = O({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = O({}, n, o, r);
    return b.length > 0 && (g.className = b), Object.keys(v).length > 0 && (g.style = v), {
      props: g,
      internalRef: void 0
    };
  }
  const s = ya(O({}, o, r)), l = ri(r), c = ri(o), u = t(s), d = Te(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = O({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = O({}, u, n, c, l);
  return d.length > 0 && (p.className = d), Object.keys(f).length > 0 && (p.style = f), {
    props: p,
    internalRef: u.ref
  };
}
const Fc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function vt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = de(e, Fc), l = i ? {} : Bc(r, o), {
    props: c,
    internalRef: u
  } = Lc(O({}, s, {
    externalSlotProps: l
  })), d = Le(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return rn(n, O({}, c, {
    ref: d
  }), o);
}
const wa = "base";
function Vc(e) {
  return `${wa}--${e}`;
}
function zc(e, t) {
  return `${wa}-${e}-${t}`;
}
function xa(e, t) {
  const n = ba[t];
  return n ? Vc(n) : zc(e, t);
}
function Uc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = xa(e, r);
  }), n;
}
const Hc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Wc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Gc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function qc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Gc(e));
}
function Kc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Hc)).forEach((r, o) => {
    const i = Wc(r);
    i === -1 || !qc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Xc() {
  return !0;
}
function Vn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Kc,
    isEnabled: s = Xc,
    open: l
  } = e, c = k.useRef(!1), u = k.useRef(null), d = k.useRef(null), f = k.useRef(null), p = k.useRef(null), b = k.useRef(!1), v = k.useRef(null), g = Le(t.ref, v), m = k.useRef(null);
  k.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), k.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = ke(v.current);
    return v.current.contains(y.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (f.current && f.current.focus && (c.current = !0, f.current.focus()), f.current = null);
    };
  }, [l]), k.useEffect(() => {
    if (!l || !v.current)
      return;
    const y = ke(v.current), w = (R) => {
      m.current = R, !(r || !s() || R.key !== "Tab") && y.activeElement === v.current && R.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, h = () => {
      const R = v.current;
      if (R === null)
        return;
      if (!y.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (R.contains(y.activeElement) || r && y.activeElement !== u.current && y.activeElement !== d.current)
        return;
      if (y.activeElement !== p.current)
        p.current = null;
      else if (p.current !== null)
        return;
      if (!b.current)
        return;
      let L = [];
      if ((y.activeElement === u.current || y.activeElement === d.current) && (L = i(v.current)), L.length > 0) {
        var B, F;
        const P = !!((B = m.current) != null && B.shiftKey && ((F = m.current) == null ? void 0 : F.key) === "Tab"), T = L[0], S = L[L.length - 1];
        typeof T != "string" && typeof S != "string" && (P ? S.focus() : T.focus());
      } else
        R.focus();
    };
    y.addEventListener("focusin", h), y.addEventListener("keydown", w, !0);
    const N = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && h();
    }, 50);
    return () => {
      clearInterval(N), y.removeEventListener("focusin", h), y.removeEventListener("keydown", w, !0);
    };
  }, [n, r, o, s, l, i]);
  const E = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0, p.current = y.target;
    const w = t.props.onFocus;
    w && w(y);
  }, _ = (y) => {
    f.current === null && (f.current = y.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ ue(k.Fragment, {
    children: [/* @__PURE__ */ x("div", {
      tabIndex: l ? 0 : -1,
      onFocus: _,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ k.cloneElement(t, {
      ref: g,
      onFocus: E
    }), /* @__PURE__ */ x("div", {
      tabIndex: l ? 0 : -1,
      onFocus: _,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Vn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: vn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: a.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: a.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: a.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: a.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: a.func,
  /**
   * If `true`, focus is locked.
   */
  open: a.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Vn["propTypes"] = ia(Vn.propTypes));
function Yc(e) {
  return typeof e == "function" ? e() : e;
}
const hn = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = k.useState(null), c = Le(/* @__PURE__ */ k.isValidElement(r) ? r.ref : null, n);
  if (bt(() => {
    i || l(Yc(o) || document.body);
  }, [o, i]), bt(() => {
    if (s && !i)
      return Fn(n, s), () => {
        Fn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ k.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ k.cloneElement(r, u);
    }
    return /* @__PURE__ */ x(k.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ x(k.Fragment, {
    children: s && /* @__PURE__ */ tl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (hn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: a.node,
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([Je, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool
});
process.env.NODE_ENV !== "production" && (hn["propTypes"] = ia(hn.propTypes));
function Jc(e) {
  const t = ke(e);
  return t.body === e ? Bt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function cn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function oi(e) {
  return parseInt(Bt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Zc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function ii(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !Zc(s);
    l && c && cn(s, o);
  });
}
function Er(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Qc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Jc(r)) {
      const s = da(ke(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${oi(r) + s}px`;
      const l = ke(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${oi(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = ke(r).body;
    else {
      const s = r.parentElement, l = Bt(r);
      i = (s == null ? void 0 : s.nodeName) === "HTML" && l.getComputedStyle(s).overflowY === "scroll" ? s : r;
    }
    n.push({
      value: i.style.overflow,
      property: "overflow",
      el: i
    }, {
      value: i.style.overflowX,
      property: "overflow-x",
      el: i
    }, {
      value: i.style.overflowY,
      property: "overflow-y",
      el: i
    }), i.style.overflow = "hidden";
  }
  return () => {
    n.forEach(({
      value: i,
      el: s,
      property: l
    }) => {
      i ? s.style.setProperty(l, i) : s.style.removeProperty(l);
    });
  };
}
function eu(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class tu {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && cn(t.modalRef, !1);
    const o = eu(n);
    ii(n, t.mount, t.modalRef, o, !0);
    const i = Er(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Er(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Qc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Er(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && cn(t.modalRef, n), ii(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && cn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function nu(e) {
  return typeof e == "function" ? e() : e;
}
function ru(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const ou = new tu();
function iu(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = ou,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: f
  } = e, p = k.useRef({}), b = k.useRef(null), v = k.useRef(null), g = Le(v, f), [m, E] = k.useState(!d), _ = ru(c);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const w = () => ke(b.current), h = () => (p.current.modalRef = v.current, p.current.mount = b.current, p.current), N = () => {
    o.mount(h(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, R = fn(() => {
    const I = nu(t) || w().body;
    o.add(h(), I), v.current && N();
  }), L = k.useCallback(() => o.isTopModal(h()), [o]), B = fn((I) => {
    b.current = I, I && (d && L() ? N() : v.current && cn(v.current, y));
  }), F = k.useCallback(() => {
    o.remove(h(), y);
  }, [y, o]);
  k.useEffect(() => () => {
    F();
  }, [F]), k.useEffect(() => {
    d ? R() : (!_ || !i) && F();
  }, [d, F, _, i, R]);
  const P = (I) => (V) => {
    var Y;
    (Y = I.onKeyDown) == null || Y.call(I, V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !L()) && (n || (V.stopPropagation(), u && u(V, "escapeKeyDown")));
  }, T = (I) => (V) => {
    var Y;
    (Y = I.onClick) == null || Y.call(I, V), V.target === V.currentTarget && u && u(V, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const V = ya(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const Y = O({}, V, I);
      return O({
        role: "presentation"
      }, Y, {
        onKeyDown: P(Y),
        ref: g
      });
    },
    getBackdropProps: (I = {}) => {
      const V = I;
      return O({
        "aria-hidden": !0
      }, V, {
        onClick: T(V),
        open: d
      });
    },
    getTransitionProps: () => {
      const I = () => {
        E(!1), s && s();
      }, V = () => {
        E(!0), l && l(), i && F();
      };
      return {
        onEnter: Dr(I, c == null ? void 0 : c.props.onEnter),
        onExited: Dr(V, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: B,
    isTopModal: L,
    exited: m,
    hasTransition: _
  };
}
var Pe = "top", Fe = "bottom", Ve = "right", Re = "left", Qr = "auto", wn = [Pe, Fe, Ve, Re], Lt = "start", mn = "end", au = "clippingParents", Ea = "viewport", Zt = "popper", su = "reference", ai = /* @__PURE__ */ wn.reduce(function(e, t) {
  return e.concat([t + "-" + Lt, t + "-" + mn]);
}, []), Ta = /* @__PURE__ */ [].concat(wn, [Qr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Lt, t + "-" + mn]);
}, []), lu = "beforeRead", cu = "read", uu = "afterRead", du = "beforeMain", pu = "main", fu = "afterMain", hu = "beforeWrite", mu = "write", gu = "afterWrite", bu = [lu, cu, uu, du, pu, fu, hu, mu, gu];
function We(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ae(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function yt(e) {
  var t = Ae(e).Element;
  return e instanceof t || e instanceof Element;
}
function Be(e) {
  var t = Ae(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function eo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ae(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function vu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Be(i) || !We(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function yu(e) {
  var t = e.state, n = {
    popper: {
      position: t.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(t.elements.popper.style, n.popper), t.styles = n, t.elements.arrow && Object.assign(t.elements.arrow.style, n.arrow), function() {
    Object.keys(t.elements).forEach(function(r) {
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = s.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Be(o) || !We(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const wu = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: vu,
  effect: yu,
  requires: ["computeStyles"]
};
function Ue(e) {
  return e.split("-")[0];
}
var ht = Math.max, zn = Math.min, Ft = Math.round;
function Lr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ka() {
  return !/^((?!chrome|android).)*safari/i.test(Lr());
}
function Vt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && Ft(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Ft(r.height) / e.offsetHeight || 1);
  var s = yt(e) ? Ae(e) : window, l = s.visualViewport, c = !ka() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / i, f = r.width / o, p = r.height / i;
  return {
    width: f,
    height: p,
    top: d,
    right: u + f,
    bottom: d + p,
    left: u,
    x: u,
    y: d
  };
}
function to(e) {
  var t = Vt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Oa(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && eo(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function Ze(e) {
  return Ae(e).getComputedStyle(e);
}
function xu(e) {
  return ["table", "td", "th"].indexOf(We(e)) >= 0;
}
function at(e) {
  return ((yt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Jn(e) {
  return We(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (eo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    at(e)
  );
}
function si(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  Ze(e).position === "fixed" ? null : e.offsetParent;
}
function Eu(e) {
  var t = /firefox/i.test(Lr()), n = /Trident/i.test(Lr());
  if (n && Be(e)) {
    var r = Ze(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Jn(e);
  for (eo(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(We(o)) < 0; ) {
    var i = Ze(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function xn(e) {
  for (var t = Ae(e), n = si(e); n && xu(n) && Ze(n).position === "static"; )
    n = si(n);
  return n && (We(n) === "html" || We(n) === "body" && Ze(n).position === "static") ? t : n || Eu(e) || t;
}
function no(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function un(e, t, n) {
  return ht(e, zn(t, n));
}
function Tu(e, t, n) {
  var r = un(e, t, n);
  return r > n ? n : r;
}
function Sa() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ca(e) {
  return Object.assign({}, Sa(), e);
}
function Na(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var ku = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Ca(typeof t != "number" ? t : Na(t, wn));
};
function Ou(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Ue(n.placement), c = no(l), u = [Re, Ve].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!i || !s)) {
    var f = ku(o.padding, n), p = to(i), b = c === "y" ? Pe : Re, v = c === "y" ? Fe : Ve, g = n.rects.reference[d] + n.rects.reference[c] - s[c] - n.rects.popper[d], m = s[c] - n.rects.reference[c], E = xn(i), _ = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, y = g / 2 - m / 2, w = f[b], h = _ - p[d] - f[v], N = _ / 2 - p[d] / 2 + y, R = un(w, N, h), L = c;
    n.modifiersData[r] = (t = {}, t[L] = R, t.centerOffset = R - N, t);
  }
}
function Su(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Oa(t.elements.popper, o) && (t.elements.arrow = o));
}
const Cu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Ou,
  effect: Su,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function zt(e) {
  return e.split("-")[1];
}
var Nu = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Pu(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Ft(n * o) / o || 0,
    y: Ft(r * o) / o || 0
  };
}
function li(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, f = e.isFixed, p = s.x, b = p === void 0 ? 0 : p, v = s.y, g = v === void 0 ? 0 : v, m = typeof d == "function" ? d({
    x: b,
    y: g
  }) : {
    x: b,
    y: g
  };
  b = m.x, g = m.y;
  var E = s.hasOwnProperty("x"), _ = s.hasOwnProperty("y"), y = Re, w = Pe, h = window;
  if (u) {
    var N = xn(n), R = "clientHeight", L = "clientWidth";
    if (N === Ae(n) && (N = at(n), Ze(N).position !== "static" && l === "absolute" && (R = "scrollHeight", L = "scrollWidth")), N = N, o === Pe || (o === Re || o === Ve) && i === mn) {
      w = Fe;
      var B = f && N === h && h.visualViewport ? h.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[R]
      );
      g -= B - r.height, g *= c ? 1 : -1;
    }
    if (o === Re || (o === Pe || o === Fe) && i === mn) {
      y = Ve;
      var F = f && N === h && h.visualViewport ? h.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[L]
      );
      b -= F - r.width, b *= c ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: l
  }, u && Nu), T = d === !0 ? Pu({
    x: b,
    y: g
  }, Ae(n)) : {
    x: b,
    y: g
  };
  if (b = T.x, g = T.y, c) {
    var S;
    return Object.assign({}, P, (S = {}, S[w] = _ ? "0" : "", S[y] = E ? "0" : "", S.transform = (h.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + g + "px)" : "translate3d(" + b + "px, " + g + "px, 0)", S));
  }
  return Object.assign({}, P, (t = {}, t[w] = _ ? g + "px" : "", t[y] = E ? b + "px" : "", t.transform = "", t));
}
function Ru(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ue(t.placement),
    variation: zt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, li(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, li(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const $u = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ru,
  data: {}
};
var Rn = {
  passive: !0
};
function Mu(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Ae(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, Rn);
  }), l && c.addEventListener("resize", n.update, Rn), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Rn);
    }), l && c.removeEventListener("resize", n.update, Rn);
  };
}
const Iu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Mu,
  data: {}
};
var _u = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function _n(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return _u[t];
  });
}
var Au = {
  start: "end",
  end: "start"
};
function ci(e) {
  return e.replace(/start|end/g, function(t) {
    return Au[t];
  });
}
function ro(e) {
  var t = Ae(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function oo(e) {
  return Vt(at(e)).left + ro(e).scrollLeft;
}
function Du(e, t) {
  var n = Ae(e), r = at(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = ka();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + oo(e),
    y: c
  };
}
function ju(e) {
  var t, n = at(e), r = ro(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = ht(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = ht(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + oo(e), c = -r.scrollTop;
  return Ze(o || n).direction === "rtl" && (l += ht(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function io(e) {
  var t = Ze(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Pa(e) {
  return ["html", "body", "#document"].indexOf(We(e)) >= 0 ? e.ownerDocument.body : Be(e) && io(e) ? e : Pa(Jn(e));
}
function dn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Pa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Ae(r), s = o ? [i].concat(i.visualViewport || [], io(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(dn(Jn(s)))
  );
}
function Fr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Bu(e, t) {
  var n = Vt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ui(e, t, n) {
  return t === Ea ? Fr(Du(e, n)) : yt(t) ? Bu(t, n) : Fr(ju(at(e)));
}
function Lu(e) {
  var t = dn(Jn(e)), n = ["absolute", "fixed"].indexOf(Ze(e).position) >= 0, r = n && Be(e) ? xn(e) : e;
  return yt(r) ? t.filter(function(o) {
    return yt(o) && Oa(o, r) && We(o) !== "body";
  }) : [];
}
function Fu(e, t, n, r) {
  var o = t === "clippingParents" ? Lu(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, u) {
    var d = ui(e, u, r);
    return c.top = ht(d.top, c.top), c.right = zn(d.right, c.right), c.bottom = zn(d.bottom, c.bottom), c.left = ht(d.left, c.left), c;
  }, ui(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ra(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ue(r) : null, i = r ? zt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Pe:
      c = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Fe:
      c = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Ve:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Re:
      c = {
        x: t.x - n.width,
        y: l
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var u = o ? no(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case Lt:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case mn:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function gn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? au : l, u = n.rootBoundary, d = u === void 0 ? Ea : u, f = n.elementContext, p = f === void 0 ? Zt : f, b = n.altBoundary, v = b === void 0 ? !1 : b, g = n.padding, m = g === void 0 ? 0 : g, E = Ca(typeof m != "number" ? m : Na(m, wn)), _ = p === Zt ? su : Zt, y = e.rects.popper, w = e.elements[v ? _ : p], h = Fu(yt(w) ? w : w.contextElement || at(e.elements.popper), c, d, s), N = Vt(e.elements.reference), R = Ra({
    reference: N,
    element: y,
    strategy: "absolute",
    placement: o
  }), L = Fr(Object.assign({}, y, R)), B = p === Zt ? L : N, F = {
    top: h.top - B.top + E.top,
    bottom: B.bottom - h.bottom + E.bottom,
    left: h.left - B.left + E.left,
    right: B.right - h.right + E.right
  }, P = e.modifiersData.offset;
  if (p === Zt && P) {
    var T = P[o];
    Object.keys(F).forEach(function(S) {
      var $ = [Ve, Fe].indexOf(S) >= 0 ? 1 : -1, A = [Pe, Fe].indexOf(S) >= 0 ? "y" : "x";
      F[S] += T[A] * $;
    });
  }
  return F;
}
function Vu(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? Ta : c, d = zt(r), f = d ? l ? ai : ai.filter(function(v) {
    return zt(v) === d;
  }) : wn, p = f.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  p.length === 0 && (p = f);
  var b = p.reduce(function(v, g) {
    return v[g] = gn(e, {
      placement: g,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ue(g)], v;
  }, {});
  return Object.keys(b).sort(function(v, g) {
    return b[v] - b[g];
  });
}
function zu(e) {
  if (Ue(e) === Qr)
    return [];
  var t = _n(e);
  return [ci(e), t, ci(t)];
}
function Uu(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, u = n.padding, d = n.boundary, f = n.rootBoundary, p = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, g = n.allowedAutoPlacements, m = t.options.placement, E = Ue(m), _ = E === m, y = c || (_ || !v ? [_n(m)] : zu(m)), w = [m].concat(y).reduce(function(z, H) {
      return z.concat(Ue(H) === Qr ? Vu(t, {
        placement: H,
        boundary: d,
        rootBoundary: f,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: g
      }) : H);
    }, []), h = t.rects.reference, N = t.rects.popper, R = /* @__PURE__ */ new Map(), L = !0, B = w[0], F = 0; F < w.length; F++) {
      var P = w[F], T = Ue(P), S = zt(P) === Lt, $ = [Pe, Fe].indexOf(T) >= 0, A = $ ? "width" : "height", I = gn(t, {
        placement: P,
        boundary: d,
        rootBoundary: f,
        altBoundary: p,
        padding: u
      }), V = $ ? S ? Ve : Re : S ? Fe : Pe;
      h[A] > N[A] && (V = _n(V));
      var Y = _n(V), Z = [];
      if (i && Z.push(I[T] <= 0), l && Z.push(I[V] <= 0, I[Y] <= 0), Z.every(function(z) {
        return z;
      })) {
        B = P, L = !1;
        break;
      }
      R.set(P, Z);
    }
    if (L)
      for (var C = v ? 3 : 1, j = function(H) {
        var G = w.find(function(q) {
          var W = R.get(q);
          if (W)
            return W.slice(0, H).every(function(X) {
              return X;
            });
        });
        if (G)
          return B = G, "break";
      }, U = C; U > 0; U--) {
        var K = j(U);
        if (K === "break")
          break;
      }
    t.placement !== B && (t.modifiersData[r]._skip = !0, t.placement = B, t.reset = !0);
  }
}
const Hu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Uu,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function di(e, t, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - n.y,
    right: e.right - t.width + n.x,
    bottom: e.bottom - t.height + n.y,
    left: e.left - t.width - n.x
  };
}
function pi(e) {
  return [Pe, Ve, Fe, Re].some(function(t) {
    return e[t] >= 0;
  });
}
function Wu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = gn(t, {
    elementContext: "reference"
  }), l = gn(t, {
    altBoundary: !0
  }), c = di(s, r), u = di(l, o, i), d = pi(c), f = pi(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: f
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": f
  });
}
const Gu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Wu
};
function qu(e, t, n) {
  var r = Ue(e), o = [Re, Pe].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [Re, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Ku(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Ta.reduce(function(d, f) {
    return d[f] = qu(f, t.rects, i), d;
  }, {}), l = s[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const Xu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ku
};
function Yu(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ra({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ju = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Yu,
  data: {}
};
function Zu(e) {
  return e === "x" ? "y" : "x";
}
function Qu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, f = n.padding, p = n.tether, b = p === void 0 ? !0 : p, v = n.tetherOffset, g = v === void 0 ? 0 : v, m = gn(t, {
    boundary: c,
    rootBoundary: u,
    padding: f,
    altBoundary: d
  }), E = Ue(t.placement), _ = zt(t.placement), y = !_, w = no(E), h = Zu(w), N = t.modifiersData.popperOffsets, R = t.rects.reference, L = t.rects.popper, B = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, F = typeof B == "number" ? {
    mainAxis: B,
    altAxis: B
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, B), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, T = {
    x: 0,
    y: 0
  };
  if (N) {
    if (i) {
      var S, $ = w === "y" ? Pe : Re, A = w === "y" ? Fe : Ve, I = w === "y" ? "height" : "width", V = N[w], Y = V + m[$], Z = V - m[A], C = b ? -L[I] / 2 : 0, j = _ === Lt ? R[I] : L[I], U = _ === Lt ? -L[I] : -R[I], K = t.elements.arrow, z = b && K ? to(K) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Sa(), G = H[$], q = H[A], W = un(0, R[I], z[I]), X = y ? R[I] / 2 - C - W - G - F.mainAxis : j - W - G - F.mainAxis, J = y ? -R[I] / 2 + C + W + q + F.mainAxis : U + W + q + F.mainAxis, ne = t.elements.arrow && xn(t.elements.arrow), D = ne ? w === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, Q = (S = P == null ? void 0 : P[w]) != null ? S : 0, M = V + X - Q - D, re = V + J - Q, ve = un(b ? zn(Y, M) : Y, V, b ? ht(Z, re) : Z);
      N[w] = ve, T[w] = ve - V;
    }
    if (l) {
      var Se, me = w === "x" ? Pe : Re, lt = w === "x" ? Fe : Ve, Ce = N[h], qe = h === "y" ? "height" : "width", $e = Ce + m[me], Ke = Ce - m[lt], we = [Pe, Re].indexOf(E) !== -1, Et = (Se = P == null ? void 0 : P[h]) != null ? Se : 0, ct = we ? $e : Ce - R[qe] - L[qe] - Et + F.altAxis, Wt = we ? Ce + R[qe] + L[qe] - Et - F.altAxis : Ke, On = b && we ? Tu(ct, Ce, Wt) : un(b ? ct : $e, Ce, b ? Wt : Ke);
      N[h] = On, T[h] = On - Ce;
    }
    t.modifiersData[r] = T;
  }
}
const ed = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Qu,
  requiresIfExists: ["offset"]
};
function td(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function nd(e) {
  return e === Ae(e) || !Be(e) ? ro(e) : td(e);
}
function rd(e) {
  var t = e.getBoundingClientRect(), n = Ft(t.width) / e.offsetWidth || 1, r = Ft(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function od(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && rd(t), i = at(t), s = Vt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((We(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  io(i)) && (l = nd(t)), Be(t) ? (c = Vt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = oo(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function id(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(l) {
      if (!n.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function ad(e) {
  var t = id(e);
  return bu.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function sd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function ld(e) {
  var t = e.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(t).map(function(n) {
    return t[n];
  });
}
var fi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function hi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function cd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? fi : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, fi, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, f = [], p = !1, b = {
      state: d,
      setOptions: function(E) {
        var _ = typeof E == "function" ? E(d.options) : E;
        g(), d.options = Object.assign({}, i, d.options, _), d.scrollParents = {
          reference: yt(l) ? dn(l) : l.contextElement ? dn(l.contextElement) : [],
          popper: dn(c)
        };
        var y = ad(ld([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = y.filter(function(w) {
          return w.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var E = d.elements, _ = E.reference, y = E.popper;
          if (hi(_, y)) {
            d.rects = {
              reference: od(_, xn(y), d.options.strategy === "fixed"),
              popper: to(y)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(F) {
              return d.modifiersData[F.name] = Object.assign({}, F.data);
            });
            for (var w = 0; w < d.orderedModifiers.length; w++) {
              if (d.reset === !0) {
                d.reset = !1, w = -1;
                continue;
              }
              var h = d.orderedModifiers[w], N = h.fn, R = h.options, L = R === void 0 ? {} : R, B = h.name;
              typeof N == "function" && (d = N({
                state: d,
                options: L,
                name: B,
                instance: b
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: sd(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(d);
        });
      }),
      destroy: function() {
        g(), p = !0;
      }
    };
    if (!hi(l, c))
      return b;
    b.setOptions(u).then(function(m) {
      !p && u.onFirstUpdate && u.onFirstUpdate(m);
    });
    function v() {
      d.orderedModifiers.forEach(function(m) {
        var E = m.name, _ = m.options, y = _ === void 0 ? {} : _, w = m.effect;
        if (typeof w == "function") {
          var h = w({
            state: d,
            name: E,
            instance: b,
            options: y
          }), N = function() {
          };
          f.push(h || N);
        }
      });
    }
    function g() {
      f.forEach(function(m) {
        return m();
      }), f = [];
    }
    return b;
  };
}
var ud = [Iu, Ju, $u, wu, Xu, Hu, ed, Cu, Gu], dd = /* @__PURE__ */ cd({
  defaultModifiers: ud
});
const $a = "Popper";
function pd(e) {
  return xa($a, e);
}
Uc($a, ["root"]);
const fd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], hd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function md(e, t) {
  if (t === "ltr")
    return e;
  switch (e) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return e;
  }
}
function Un(e) {
  return typeof e == "function" ? e() : e;
}
function Zn(e) {
  return e.nodeType !== void 0;
}
function gd(e) {
  return !Zn(e);
}
const bd = () => et({
  root: ["root"]
}, jc(pd)), vd = {}, yd = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: d,
    popperOptions: f,
    popperRef: p,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = de(t, fd), E = k.useRef(null), _ = Le(E, n), y = k.useRef(null), w = Le(y, p), h = k.useRef(w);
  bt(() => {
    h.current = w;
  }, [w]), k.useImperativeHandle(p, () => y.current, []);
  const N = md(d, s), [R, L] = k.useState(N), [B, F] = k.useState(Un(o));
  k.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), k.useEffect(() => {
    o && F(Un(o));
  }, [o]), bt(() => {
    if (!B || !u)
      return;
    const A = (Y) => {
      L(Y.placement);
    };
    if (process.env.NODE_ENV !== "production" && B && Zn(B) && B.nodeType === 1) {
      const Y = B.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Y.top === 0 && Y.left === 0 && Y.right === 0 && Y.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let I = [{
      name: "preventOverflow",
      options: {
        altBoundary: l
      }
    }, {
      name: "flip",
      options: {
        altBoundary: l
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: Y
      }) => {
        A(Y);
      }
    }];
    c != null && (I = I.concat(c)), f && f.modifiers != null && (I = I.concat(f.modifiers));
    const V = dd(B, E.current, O({
      placement: N
    }, f, {
      modifiers: I
    }));
    return h.current(V), () => {
      V.destroy(), h.current(null);
    };
  }, [B, l, c, u, f, N]);
  const P = {
    placement: R
  };
  g !== null && (P.TransitionProps = g);
  const T = bd(), S = (r = v.root) != null ? r : "div", $ = vt({
    elementType: S,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: _
    },
    ownerState: t,
    className: T.root
  });
  return /* @__PURE__ */ x(S, O({}, $, {
    children: typeof i == "function" ? i(P) : i
  }));
}), Ma = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: d,
    placement: f = "bottom",
    popperOptions: p = vd,
    popperRef: b,
    style: v,
    transition: g = !1,
    slotProps: m = {},
    slots: E = {}
  } = t, _ = de(t, hd), [y, w] = k.useState(!0), h = () => {
    w(!1);
  }, N = () => {
    w(!0);
  };
  if (!c && !d && (!g || y))
    return null;
  let R;
  if (i)
    R = i;
  else if (r) {
    const F = Un(r);
    R = F && Zn(F) ? ke(F).body : ke(null).body;
  }
  const L = !d && c && (!g || y) ? "none" : void 0, B = g ? {
    in: d,
    onEnter: h,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ x(hn, {
    disablePortal: l,
    container: R,
    children: /* @__PURE__ */ x(yd, O({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: g ? !y : d,
      placement: f,
      popperOptions: p,
      popperRef: b,
      slotProps: m,
      slots: E
    }, _, {
      style: O({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: L
      }, v),
      TransitionProps: B,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ma.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: Ht(a.oneOfType([Je, a.object, a.func]), (e) => {
    if (e.open) {
      const t = Un(e.anchorEl);
      if (t && Zn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || gd(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: a.oneOfType([a.node, a.func]),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([Je, a.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: a.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: a.arrayOf(a.shape({
    data: a.object,
    effect: a.func,
    enabled: a.bool,
    fn: a.func,
    name: a.any,
    options: a.object,
    phase: a.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: a.arrayOf(a.string),
    requiresIfExists: a.arrayOf(a.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: a.shape({
    modifiers: a.array,
    onFirstUpdate: a.func,
    placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: a.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: Zr,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: a.bool
});
const wd = ["values", "unit", "step"], xd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => O({}, n, {
    [r.key]: r.val
  }), {});
};
function Ed(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: t = {
      xs: 0,
      // phone
      sm: 600,
      // tablet
      md: 900,
      // small laptop
      lg: 1200,
      // desktop
      xl: 1536
      // large screen
    },
    unit: n = "px",
    step: r = 5
  } = e, o = de(e, wd), i = xd(t), s = Object.keys(i);
  function l(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function c(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function u(p, b) {
    const v = s.indexOf(b);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : b) - r / 100}${n})`;
  }
  function d(p) {
    return s.indexOf(p) + 1 < s.length ? u(p, s[s.indexOf(p) + 1]) : l(p);
  }
  function f(p) {
    const b = s.indexOf(p);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : u(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return O({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: u,
    only: d,
    not: f,
    unit: n
  }, o);
}
const Td = {
  borderRadius: 4
}, kd = Td, Od = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, st = Od;
function pn(e, t) {
  return t ? Ye(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const ao = {
  xs: 0,
  // phone
  sm: 600,
  // tablet
  md: 900,
  // small laptop
  lg: 1200,
  // desktop
  xl: 1536
  // large screen
}, mi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${ao[e]}px)`
};
function Qe(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || mi;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || mi;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || ao).indexOf(l) !== -1) {
        const c = i.up(l);
        s[c] = n(t[l], l);
      } else {
        const c = l;
        s[c] = t[c];
      }
      return s;
    }, {});
  }
  return n(t);
}
function Sd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Cd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Qn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Hn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Qn(e, n) || r, t && (o = t(o, r, e)), o;
}
function be(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, u = Qn(c, r) || {};
    return Qe(s, l, (f) => {
      let p = Hn(u, o, f);
      return f === p && typeof f == "string" && (p = Hn(u, o, `${t}${f === "default" ? "" : He(f)}`, f)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: st
  } : {}, i.filterProps = [t], i;
}
function Nd(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Pd = {
  m: "margin",
  p: "padding"
}, Rd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, gi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, $d = Nd((e) => {
  if (e.length > 2)
    if (gi[e])
      e = gi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Pd[t], o = Rd[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), er = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], tr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Md = [...er, ...tr];
function En(e, t, n, r) {
  var o;
  const i = (o = Qn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Ia(e) {
  return En(e, "spacing", 8, "spacing");
}
function Tn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Id(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Tn(t, n), r), {});
}
function _d(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = $d(n), i = Id(o, r), s = e[n];
  return Qe(e, s, i);
}
function _a(e, t) {
  const n = Ia(e.theme);
  return Object.keys(e).map((r) => _d(e, t, r, n)).reduce(pn, {});
}
function fe(e) {
  return _a(e, er);
}
fe.propTypes = process.env.NODE_ENV !== "production" ? er.reduce((e, t) => (e[t] = st, e), {}) : {};
fe.filterProps = er;
function he(e) {
  return _a(e, tr);
}
he.propTypes = process.env.NODE_ENV !== "production" ? tr.reduce((e, t) => (e[t] = st, e), {}) : {};
he.filterProps = tr;
process.env.NODE_ENV !== "production" && Md.reduce((e, t) => (e[t] = st, e), {});
function Ad(e = 8) {
  if (e.mui)
    return e;
  const t = Ia({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function nr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? pn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function je(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function ze(e, t) {
  return be({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Dd = ze("border", je), jd = ze("borderTop", je), Bd = ze("borderRight", je), Ld = ze("borderBottom", je), Fd = ze("borderLeft", je), Vd = ze("borderColor"), zd = ze("borderTopColor"), Ud = ze("borderRightColor"), Hd = ze("borderBottomColor"), Wd = ze("borderLeftColor"), Gd = ze("outline", je), qd = ze("outlineColor"), rr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = En(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Tn(t, r)
    });
    return Qe(e, e.borderRadius, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: st
} : {};
rr.filterProps = ["borderRadius"];
nr(Dd, jd, Bd, Ld, Fd, Vd, zd, Ud, Hd, Wd, rr, Gd, qd);
const or = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = En(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Tn(t, r)
    });
    return Qe(e, e.gap, n);
  }
  return null;
};
or.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: st
} : {};
or.filterProps = ["gap"];
const ir = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = En(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Tn(t, r)
    });
    return Qe(e, e.columnGap, n);
  }
  return null;
};
ir.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: st
} : {};
ir.filterProps = ["columnGap"];
const ar = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = En(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Tn(t, r)
    });
    return Qe(e, e.rowGap, n);
  }
  return null;
};
ar.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: st
} : {};
ar.filterProps = ["rowGap"];
const Kd = be({
  prop: "gridColumn"
}), Xd = be({
  prop: "gridRow"
}), Yd = be({
  prop: "gridAutoFlow"
}), Jd = be({
  prop: "gridAutoColumns"
}), Zd = be({
  prop: "gridAutoRows"
}), Qd = be({
  prop: "gridTemplateColumns"
}), ep = be({
  prop: "gridTemplateRows"
}), tp = be({
  prop: "gridTemplateAreas"
}), np = be({
  prop: "gridArea"
});
nr(or, ir, ar, Kd, Xd, Yd, Jd, Zd, Qd, ep, tp, np);
function Dt(e, t) {
  return t === "grey" ? t : e;
}
const rp = be({
  prop: "color",
  themeKey: "palette",
  transform: Dt
}), op = be({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Dt
}), ip = be({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Dt
});
nr(rp, op, ip);
function _e(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const ap = be({
  prop: "width",
  transform: _e
}), so = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || ao[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: _e(n)
      };
    };
    return Qe(e, e.maxWidth, t);
  }
  return null;
};
so.filterProps = ["maxWidth"];
const sp = be({
  prop: "minWidth",
  transform: _e
}), lp = be({
  prop: "height",
  transform: _e
}), cp = be({
  prop: "maxHeight",
  transform: _e
}), up = be({
  prop: "minHeight",
  transform: _e
});
be({
  prop: "size",
  cssProperty: "width",
  transform: _e
});
be({
  prop: "size",
  cssProperty: "height",
  transform: _e
});
const dp = be({
  prop: "boxSizing"
});
nr(ap, so, sp, lp, cp, up, dp);
const pp = {
  // borders
  border: {
    themeKey: "borders",
    transform: je
  },
  borderTop: {
    themeKey: "borders",
    transform: je
  },
  borderRight: {
    themeKey: "borders",
    transform: je
  },
  borderBottom: {
    themeKey: "borders",
    transform: je
  },
  borderLeft: {
    themeKey: "borders",
    transform: je
  },
  borderColor: {
    themeKey: "palette"
  },
  borderTopColor: {
    themeKey: "palette"
  },
  borderRightColor: {
    themeKey: "palette"
  },
  borderBottomColor: {
    themeKey: "palette"
  },
  borderLeftColor: {
    themeKey: "palette"
  },
  outline: {
    themeKey: "borders",
    transform: je
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: rr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Dt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Dt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Dt
  },
  // spacing
  p: {
    style: he
  },
  pt: {
    style: he
  },
  pr: {
    style: he
  },
  pb: {
    style: he
  },
  pl: {
    style: he
  },
  px: {
    style: he
  },
  py: {
    style: he
  },
  padding: {
    style: he
  },
  paddingTop: {
    style: he
  },
  paddingRight: {
    style: he
  },
  paddingBottom: {
    style: he
  },
  paddingLeft: {
    style: he
  },
  paddingX: {
    style: he
  },
  paddingY: {
    style: he
  },
  paddingInline: {
    style: he
  },
  paddingInlineStart: {
    style: he
  },
  paddingInlineEnd: {
    style: he
  },
  paddingBlock: {
    style: he
  },
  paddingBlockStart: {
    style: he
  },
  paddingBlockEnd: {
    style: he
  },
  m: {
    style: fe
  },
  mt: {
    style: fe
  },
  mr: {
    style: fe
  },
  mb: {
    style: fe
  },
  ml: {
    style: fe
  },
  mx: {
    style: fe
  },
  my: {
    style: fe
  },
  margin: {
    style: fe
  },
  marginTop: {
    style: fe
  },
  marginRight: {
    style: fe
  },
  marginBottom: {
    style: fe
  },
  marginLeft: {
    style: fe
  },
  marginX: {
    style: fe
  },
  marginY: {
    style: fe
  },
  marginInline: {
    style: fe
  },
  marginInlineStart: {
    style: fe
  },
  marginInlineEnd: {
    style: fe
  },
  marginBlock: {
    style: fe
  },
  marginBlockStart: {
    style: fe
  },
  marginBlockEnd: {
    style: fe
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (e) => ({
      "@media print": {
        display: e
      }
    })
  },
  display: {},
  overflow: {},
  textOverflow: {},
  visibility: {},
  whiteSpace: {},
  // flexbox
  flexBasis: {},
  flexDirection: {},
  flexWrap: {},
  justifyContent: {},
  alignItems: {},
  alignContent: {},
  order: {},
  flex: {},
  flexGrow: {},
  flexShrink: {},
  alignSelf: {},
  justifyItems: {},
  justifySelf: {},
  // grid
  gap: {
    style: or
  },
  rowGap: {
    style: ar
  },
  columnGap: {
    style: ir
  },
  gridColumn: {},
  gridRow: {},
  gridAutoFlow: {},
  gridAutoColumns: {},
  gridAutoRows: {},
  gridTemplateColumns: {},
  gridTemplateRows: {},
  gridTemplateAreas: {},
  gridArea: {},
  // positions
  position: {},
  zIndex: {
    themeKey: "zIndex"
  },
  top: {},
  right: {},
  bottom: {},
  left: {},
  // shadows
  boxShadow: {
    themeKey: "shadows"
  },
  // sizing
  width: {
    transform: _e
  },
  maxWidth: {
    style: so
  },
  minWidth: {
    transform: _e
  },
  height: {
    transform: _e
  },
  maxHeight: {
    transform: _e
  },
  minHeight: {
    transform: _e
  },
  boxSizing: {},
  // typography
  fontFamily: {
    themeKey: "typography"
  },
  fontSize: {
    themeKey: "typography"
  },
  fontStyle: {
    themeKey: "typography"
  },
  fontWeight: {
    themeKey: "typography"
  },
  letterSpacing: {},
  textTransform: {},
  lineHeight: {},
  textAlign: {},
  typography: {
    cssProperty: !1,
    themeKey: "typography"
  }
}, lo = pp;
function fp(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function hp(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function mp() {
  function e(n, r, o, i) {
    const s = {
      [n]: r,
      theme: o
    }, l = i[n];
    if (!l)
      return {
        [n]: r
      };
    const {
      cssProperty: c = n,
      themeKey: u,
      transform: d,
      style: f
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const p = Qn(o, u) || {};
    return f ? f(s) : Qe(s, r, (v) => {
      let g = Hn(p, d, v);
      return v === g && typeof v == "string" && (g = Hn(p, d, `${n}${v === "default" ? "" : He(v)}`, v)), c === !1 ? g : {
        [c]: g
      };
    });
  }
  function t(n) {
    var r;
    const {
      sx: o,
      theme: i = {}
    } = n || {};
    if (!o)
      return null;
    const s = (r = i.unstable_sxConfig) != null ? r : lo;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = Sd(i.breakpoints), f = Object.keys(d);
      let p = d;
      return Object.keys(u).forEach((b) => {
        const v = hp(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (s[b])
              p = pn(p, e(b, v, i, s));
            else {
              const g = Qe({
                theme: i
              }, v, (m) => ({
                [b]: m
              }));
              fp(g, v) ? p[b] = t({
                sx: v,
                theme: i
              }) : p = pn(p, g);
            }
          else
            p = pn(p, e(b, v, i, s));
      }), Cd(f, p);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Aa = mp();
Aa.filterProps = ["sx"];
const co = Aa;
function gp(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const bp = ["breakpoints", "palette", "spacing", "shape"];
function uo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = de(e, bp), l = Ed(n), c = Ad(o);
  let u = Ye({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: O({
      mode: "light"
    }, r),
    spacing: c,
    shape: O({}, kd, i)
  }, s);
  return u.applyStyles = gp, u = t.reduce((d, f) => Ye(d, f), u), u.unstable_sxConfig = O({}, lo, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return co({
      sx: f,
      theme: this
    });
  }, u;
}
function vp(e) {
  return Object.keys(e).length === 0;
}
function Da(e = null) {
  const t = k.useContext(Qs);
  return !t || vp(t) ? e : t;
}
const yp = uo();
function ja(e = yp) {
  return Da(e);
}
const wp = ["ownerState"], xp = ["variants"], Ep = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Tp(e) {
  return Object.keys(e).length === 0;
}
function kp(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function An(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Op = uo(), bi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function $n({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Tp(t) ? e : t[n] || t;
}
function Sp(e) {
  return e ? (t, n) => n[e] : null;
}
function Dn(e, t) {
  let {
    ownerState: n
  } = t, r = de(t, wp);
  const o = typeof e == "function" ? e(O({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Dn(i, O({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = de(o, xp);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(O({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(O({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Cp(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Op,
    rootShouldForwardProp: r = An,
    slotShouldForwardProp: o = An
  } = e, i = (s) => co(O({}, s, {
    theme: $n(O({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    el(s, (h) => h.filter((N) => !(N != null && N.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = Sp(bi(u))
    } = l, b = de(l, Ep), v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = f || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${bi(u || "Root")}`);
    let E = An;
    u === "Root" || u === "root" ? E = r : u ? E = o : kp(s) && (E = void 0);
    const _ = Zs(s, O({
      shouldForwardProp: E,
      label: m
    }, b)), y = (h) => typeof h == "function" && h.__emotion_real !== h || pt(h) ? (N) => Dn(h, O({}, N, {
      theme: $n({
        theme: N.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : h, w = (h, ...N) => {
      let R = y(h);
      const L = N ? N.map(y) : [];
      c && p && L.push((P) => {
        const T = $n(O({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        if (!T.components || !T.components[c] || !T.components[c].styleOverrides)
          return null;
        const S = T.components[c].styleOverrides, $ = {};
        return Object.entries(S).forEach(([A, I]) => {
          $[A] = Dn(I, O({}, P, {
            theme: T
          }));
        }), p(P, $);
      }), c && !v && L.push((P) => {
        var T;
        const S = $n(O({}, P, {
          defaultTheme: n,
          themeId: t
        })), $ = S == null || (T = S.components) == null || (T = T[c]) == null ? void 0 : T.variants;
        return Dn({
          variants: $
        }, O({}, P, {
          theme: S
        }));
      }), g || L.push(i);
      const B = L.length - N.length;
      if (Array.isArray(h) && B > 0) {
        const P = new Array(B).fill("");
        R = [...h, ...P], R.raw = [...h.raw, ...P];
      }
      const F = _(R, ...L);
      if (process.env.NODE_ENV !== "production") {
        let P;
        c && (P = `${c}${He(u || "")}`), P === void 0 && (P = `Styled(${dc(s)})`), F.displayName = P;
      }
      return s.muiName && (F.muiName = s.muiName), F;
    };
    return _.withConfig && (w.withConfig = _.withConfig), w;
  };
}
function Np(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ma(t.components[n].defaultProps, r);
}
function Pp({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ja(n);
  return r && (o = o[r] || o), Np({
    theme: o,
    name: t,
    props: e
  });
}
function po(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), _c(e, t, n);
}
function Rp(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function wt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return wt(Rp(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : jt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : jt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function sr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function $p(e) {
  e = wt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), sr({
    type: l,
    values: c
  });
}
function vi(e) {
  e = wt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? wt($p(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function yi(e, t) {
  const n = vi(e), r = vi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Wn(e, t) {
  return e = wt(e), t = po(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, sr(e);
}
function Mp(e, t) {
  if (e = wt(e), t = po(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return sr(e);
}
function Ip(e, t) {
  if (e = wt(e), t = po(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return sr(e);
}
function _p(e, t) {
  return O({
    toolbar: {
      minHeight: 56,
      [e.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [e.up("sm")]: {
        minHeight: 64
      }
    }
  }, t);
}
const Ap = {
  black: "#000",
  white: "#fff"
}, bn = Ap, Dp = {
  50: "#fafafa",
  100: "#f5f5f5",
  200: "#eeeeee",
  300: "#e0e0e0",
  400: "#bdbdbd",
  500: "#9e9e9e",
  600: "#757575",
  700: "#616161",
  800: "#424242",
  900: "#212121",
  A100: "#f5f5f5",
  A200: "#eeeeee",
  A400: "#bdbdbd",
  A700: "#616161"
}, jp = Dp, Bp = {
  50: "#f3e5f5",
  100: "#e1bee7",
  200: "#ce93d8",
  300: "#ba68c8",
  400: "#ab47bc",
  500: "#9c27b0",
  600: "#8e24aa",
  700: "#7b1fa2",
  800: "#6a1b9a",
  900: "#4a148c",
  A100: "#ea80fc",
  A200: "#e040fb",
  A400: "#d500f9",
  A700: "#aa00ff"
}, Ot = Bp, Lp = {
  50: "#ffebee",
  100: "#ffcdd2",
  200: "#ef9a9a",
  300: "#e57373",
  400: "#ef5350",
  500: "#f44336",
  600: "#e53935",
  700: "#d32f2f",
  800: "#c62828",
  900: "#b71c1c",
  A100: "#ff8a80",
  A200: "#ff5252",
  A400: "#ff1744",
  A700: "#d50000"
}, St = Lp, Fp = {
  50: "#fff3e0",
  100: "#ffe0b2",
  200: "#ffcc80",
  300: "#ffb74d",
  400: "#ffa726",
  500: "#ff9800",
  600: "#fb8c00",
  700: "#f57c00",
  800: "#ef6c00",
  900: "#e65100",
  A100: "#ffd180",
  A200: "#ffab40",
  A400: "#ff9100",
  A700: "#ff6d00"
}, Qt = Fp, Vp = {
  50: "#e3f2fd",
  100: "#bbdefb",
  200: "#90caf9",
  300: "#64b5f6",
  400: "#42a5f5",
  500: "#2196f3",
  600: "#1e88e5",
  700: "#1976d2",
  800: "#1565c0",
  900: "#0d47a1",
  A100: "#82b1ff",
  A200: "#448aff",
  A400: "#2979ff",
  A700: "#2962ff"
}, Ct = Vp, zp = {
  50: "#e1f5fe",
  100: "#b3e5fc",
  200: "#81d4fa",
  300: "#4fc3f7",
  400: "#29b6f6",
  500: "#03a9f4",
  600: "#039be5",
  700: "#0288d1",
  800: "#0277bd",
  900: "#01579b",
  A100: "#80d8ff",
  A200: "#40c4ff",
  A400: "#00b0ff",
  A700: "#0091ea"
}, Nt = zp, Up = {
  50: "#e8f5e9",
  100: "#c8e6c9",
  200: "#a5d6a7",
  300: "#81c784",
  400: "#66bb6a",
  500: "#4caf50",
  600: "#43a047",
  700: "#388e3c",
  800: "#2e7d32",
  900: "#1b5e20",
  A100: "#b9f6ca",
  A200: "#69f0ae",
  A400: "#00e676",
  A700: "#00c853"
}, Pt = Up, Hp = ["mode", "contrastThreshold", "tonalOffset"], wi = {
  // The colors used to style the text.
  text: {
    // The most important text.
    primary: "rgba(0, 0, 0, 0.87)",
    // Secondary text.
    secondary: "rgba(0, 0, 0, 0.6)",
    // Disabled text have even lower visual prominence.
    disabled: "rgba(0, 0, 0, 0.38)"
  },
  // The color used to divide different elements.
  divider: "rgba(0, 0, 0, 0.12)",
  // The background colors used to style the surfaces.
  // Consistency between these values is important.
  background: {
    paper: bn.white,
    default: bn.white
  },
  // The colors used to style the action elements.
  action: {
    // The color of an active action like an icon button.
    active: "rgba(0, 0, 0, 0.54)",
    // The color of an hovered action.
    hover: "rgba(0, 0, 0, 0.04)",
    hoverOpacity: 0.04,
    // The color of a selected action.
    selected: "rgba(0, 0, 0, 0.08)",
    selectedOpacity: 0.08,
    // The color of a disabled action.
    disabled: "rgba(0, 0, 0, 0.26)",
    // The background color of a disabled action.
    disabledBackground: "rgba(0, 0, 0, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(0, 0, 0, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.12
  }
}, Tr = {
  text: {
    primary: bn.white,
    secondary: "rgba(255, 255, 255, 0.7)",
    disabled: "rgba(255, 255, 255, 0.5)",
    icon: "rgba(255, 255, 255, 0.5)"
  },
  divider: "rgba(255, 255, 255, 0.12)",
  background: {
    paper: "#121212",
    default: "#121212"
  },
  action: {
    active: bn.white,
    hover: "rgba(255, 255, 255, 0.08)",
    hoverOpacity: 0.08,
    selected: "rgba(255, 255, 255, 0.16)",
    selectedOpacity: 0.16,
    disabled: "rgba(255, 255, 255, 0.3)",
    disabledBackground: "rgba(255, 255, 255, 0.12)",
    disabledOpacity: 0.38,
    focus: "rgba(255, 255, 255, 0.12)",
    focusOpacity: 0.12,
    activatedOpacity: 0.24
  }
};
function xi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Ip(e.main, o) : t === "dark" && (e.dark = Mp(e.main, i)));
}
function Wp(e = "light") {
  return e === "dark" ? {
    main: Ct[200],
    light: Ct[50],
    dark: Ct[400]
  } : {
    main: Ct[700],
    light: Ct[400],
    dark: Ct[800]
  };
}
function Gp(e = "light") {
  return e === "dark" ? {
    main: Ot[200],
    light: Ot[50],
    dark: Ot[400]
  } : {
    main: Ot[500],
    light: Ot[300],
    dark: Ot[700]
  };
}
function qp(e = "light") {
  return e === "dark" ? {
    main: St[500],
    light: St[300],
    dark: St[700]
  } : {
    main: St[700],
    light: St[400],
    dark: St[800]
  };
}
function Kp(e = "light") {
  return e === "dark" ? {
    main: Nt[400],
    light: Nt[300],
    dark: Nt[700]
  } : {
    main: Nt[700],
    light: Nt[500],
    dark: Nt[900]
  };
}
function Xp(e = "light") {
  return e === "dark" ? {
    main: Pt[400],
    light: Pt[300],
    dark: Pt[700]
  } : {
    main: Pt[800],
    light: Pt[500],
    dark: Pt[900]
  };
}
function Yp(e = "light") {
  return e === "dark" ? {
    main: Qt[400],
    light: Qt[300],
    dark: Qt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Qt[500],
    dark: Qt[900]
  };
}
function Jp(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = de(e, Hp), i = e.primary || Wp(t), s = e.secondary || Gp(t), l = e.error || qp(t), c = e.info || Kp(t), u = e.success || Xp(t), d = e.warning || Yp(t);
  function f(g) {
    const m = yi(g, Tr.text.primary) >= n ? Tr.text.primary : wi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = yi(g, m);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${m} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const p = ({
    color: g,
    name: m,
    mainShade: E = 500,
    lightShade: _ = 300,
    darkShade: y = 700
  }) => {
    if (g = O({}, g), !g.main && g[E] && (g.main = g[E]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : jt(11, m ? ` (${m})` : "", E));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : jt(12, m ? ` (${m})` : "", JSON.stringify(g.main)));
    return xi(g, "light", _, r), xi(g, "dark", y, r), g.contrastText || (g.contrastText = f(g.main)), g;
  }, b = {
    dark: Tr,
    light: wi
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ye(O({
    // A collection of common colors.
    common: O({}, bn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: jp,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const Zp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Qp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ei = {
  textTransform: "uppercase"
}, Ti = '"Roboto", "Helvetica", "Arial", sans-serif';
function ef(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Ti,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: f
  } = n, p = de(n, Zp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = f || ((E) => `${E / u * b}rem`), g = (E, _, y, w, h) => O({
    fontFamily: r,
    fontWeight: E,
    fontSize: v(_),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === Ti ? {
    letterSpacing: `${Qp(w / _)}em`
  } : {}, h, d), m = {
    h1: g(i, 96, 1.167, -1.5),
    h2: g(i, 60, 1.2, -0.5),
    h3: g(s, 48, 1.167, 0),
    h4: g(s, 34, 1.235, 0.25),
    h5: g(s, 24, 1.334, 0),
    h6: g(l, 20, 1.6, 0.15),
    subtitle1: g(s, 16, 1.75, 0.15),
    subtitle2: g(l, 14, 1.57, 0.1),
    body1: g(s, 16, 1.5, 0.15),
    body2: g(s, 14, 1.43, 0.15),
    button: g(l, 14, 1.75, 0.4, Ei),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, Ei),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ye(O({
    htmlFontSize: u,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, m), p, {
    clone: !1
    // No need to clone deep
  });
}
const tf = 0.2, nf = 0.14, rf = 0.12;
function pe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${tf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${nf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${rf})`].join(",");
}
const of = ["none", pe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), pe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), pe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), pe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), pe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), pe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), pe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), pe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), pe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), pe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), pe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), pe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), pe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), pe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), pe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), pe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), pe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), pe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), pe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), pe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), pe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), pe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), pe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), pe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], af = of, sf = ["duration", "easing", "delay"], lf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, cf = {
  shortest: 150,
  shorter: 200,
  short: 250,
  // most basic recommended timing
  standard: 300,
  // this is to be used in complex animations
  complex: 375,
  // recommended when something is entering screen
  enteringScreen: 225,
  // recommended when something is leaving screen
  leavingScreen: 195
};
function ki(e) {
  return `${Math.round(e)}ms`;
}
function uf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function df(e) {
  const t = O({}, lf, e.easing), n = O({}, cf, e.duration);
  return O({
    getAutoHeightDuration: uf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = de(i, sf);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", f = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : ki(s)} ${l} ${typeof c == "string" ? c : ki(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const pf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, ff = pf, hf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function mf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = de(e, hf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : jt(18));
  const l = Jp(r), c = uo(e);
  let u = Ye(c, {
    mixins: _p(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: af.slice(),
    typography: ef(l, i),
    transitions: df(o),
    zIndex: O({}, ff)
  });
  if (u = Ye(u, s), u = t.reduce((d, f) => Ye(d, f), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (p, b) => {
      let v;
      for (v in p) {
        const g = p[v];
        if (d.indexOf(v) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = Ge("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${m}' syntax:`, JSON.stringify({
              root: {
                [`&.${m}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[v] = {};
        }
      }
    };
    Object.keys(u.components).forEach((p) => {
      const b = u.components[p].styleOverrides;
      b && p.indexOf("Mui") === 0 && f(b, p);
    });
  }
  return u.unstable_sxConfig = O({}, lo, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(f) {
    return co({
      sx: f,
      theme: this
    });
  }, u;
}
const gf = mf(), fo = gf, ho = "$$material", Ba = (e) => An(e) && e !== "classes", bf = Cp({
  themeId: ho,
  defaultTheme: fo,
  rootShouldForwardProp: Ba
}), Oe = bf;
function kn() {
  const e = ja(fo);
  return process.env.NODE_ENV !== "production" && k.useDebugValue(e), e[ho] || e;
}
function tt({
  props: e,
  name: t
}) {
  return Pp({
    props: e,
    name: t,
    defaultTheme: fo,
    themeId: ho
  });
}
function Vr(e, t) {
  return Vr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Vr(e, t);
}
function vf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Vr(e, t);
}
const Oi = {
  disabled: !1
};
var yf = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
  enter: a.number,
  exit: a.number,
  appear: a.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && a.oneOfType([a.string, a.shape({
  enter: a.string,
  exit: a.string,
  active: a.string
}), a.shape({
  enter: a.string,
  enterDone: a.string,
  enterActive: a.string,
  exit: a.string,
  exitDone: a.string,
  exitActive: a.string
})]);
const La = _t.createContext(null);
var wf = function(t) {
  return t.scrollTop;
}, on = "unmounted", ut = "exited", dt = "entering", It = "entered", zr = "exiting", nt = /* @__PURE__ */ function(e) {
  vf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = ut, i.appearStatus = dt) : c = It : r.unmountOnExit || r.mountOnEnter ? c = on : c = ut, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === on ? {
      status: ut
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== dt && s !== It && (i = dt) : (s === dt || s === It) && (i = zr);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, s, l;
    return i = s = l = o, o != null && typeof o != "number" && (i = o.exit, s = o.enter, l = o.appear !== void 0 ? o.appear : s), {
      exit: i,
      enter: s,
      appear: l
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === dt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Nn.findDOMNode(this);
          s && wf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ut && this.setState({
        status: on
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Nn.findDOMNode(this), l], u = c[0], d = c[1], f = this.getTimeouts(), p = l ? f.appear : f.enter;
    if (!o && !s || Oi.disabled) {
      this.safeSetState({
        status: It
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: dt
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(p, function() {
        i.safeSetState({
          status: It
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Nn.findDOMNode(this);
    if (!i || Oi.disabled) {
      this.safeSetState({
        status: ut
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: zr
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ut
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, s = !0;
    return this.nextCallback = function(l) {
      s && (s = !1, i.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Nn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], u = c[0], d = c[1];
      this.props.addEndListener(u, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === on)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = de(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ _t.createElement(La.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : _t.cloneElement(_t.Children.only(s), l))
    );
  }, t;
}(_t.Component);
nt.contextType = La;
nt.propTypes = process.env.NODE_ENV !== "production" ? {
  /**
   * A React reference to DOM element that need to transition:
   * https://stackoverflow.com/a/51127130/4671932
   *
   *   - When `nodeRef` prop is used, `node` is not passed to callback functions
   *      (e.g. `onEnter`) because user already has direct access to the node.
   *   - When changing `key` prop of `Transition` in a `TransitionGroup` a new
   *     `nodeRef` need to be provided to `Transition` with changed `key` prop
   *     (see
   *     [test/CSSTransition-test.js](https://github.com/reactjs/react-transition-group/blob/13435f897b3ab71f6e19d724f145596f5910581c/test/CSSTransition-test.js#L362-L437)).
   */
  nodeRef: a.shape({
    current: typeof Element > "u" ? a.any : function(e, t, n, r, o, i) {
      var s = e[t];
      return a.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
    }
  }),
  /**
   * A `function` child can be used instead of a React element. This function is
   * called with the current transition status (`'entering'`, `'entered'`,
   * `'exiting'`, `'exited'`), which can be used to apply context
   * specific props to a component.
   *
   * ```jsx
   * <Transition in={this.state.in} timeout={150}>
   *   {state => (
   *     <MyComponent className={`fade fade-${state}`} />
   *   )}
   * </Transition>
   * ```
   */
  children: a.oneOfType([a.func.isRequired, a.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: a.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: a.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: a.bool,
  /**
   * By default the child component does not perform the enter transition when
   * it first mounts, regardless of the value of `in`. If you want this
   * behavior, set both `appear` and `in` to `true`.
   *
   * > **Note**: there are no special appear states like `appearing`/`appeared`, this prop
   * > only adds an additional enter transition. However, in the
   * > `<CSSTransition>` component that first enter transition does result in
   * > additional `.appear-*` classes, that way you can choose to style it
   * > differently.
   */
  appear: a.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: a.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: a.bool,
  /**
   * The duration of the transition, in milliseconds.
   * Required unless `addEndListener` is provided.
   *
   * You may specify a single timeout for all transitions:
   *
   * ```jsx
   * timeout={500}
   * ```
   *
   * or individually:
   *
   * ```jsx
   * timeout={{
   *  appear: 500,
   *  enter: 300,
   *  exit: 500,
   * }}
   * ```
   *
   * - `appear` defaults to the value of `enter`
   * - `enter` defaults to `0`
   * - `exit` defaults to `0`
   *
   * @type {number | { enter?: number, exit?: number, appear?: number }}
   */
  timeout: function(t) {
    var n = yf;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), i = 1; i < r; i++)
      o[i - 1] = arguments[i];
    return n.apply(void 0, [t].concat(o));
  },
  /**
   * Add a custom transition end trigger. Called with the transitioning
   * DOM node and a `done` callback. Allows for more fine grained transition end
   * logic. Timeouts are still used as a fallback if provided.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * ```jsx
   * addEndListener={(node, done) => {
   *   // use the css transitionend event to mark the finish of a transition
   *   node.addEventListener('transitionend', done, false);
   * }}
   * ```
   */
  addEndListener: a.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: a.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: a.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: a.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: a.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: a.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: a.func
} : {};
function Rt() {
}
nt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Rt,
  onEntering: Rt,
  onEntered: Rt,
  onExit: Rt,
  onExiting: Rt,
  onExited: Rt
};
nt.UNMOUNTED = on;
nt.EXITED = ut;
nt.ENTERING = dt;
nt.ENTERED = It;
nt.EXITING = zr;
const Fa = nt, Va = (e) => e.scrollTop;
function Gn(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: i,
    style: s = {}
  } = e;
  return {
    duration: (n = s.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof i == "object" ? i[t.mode] : i,
    delay: s.transitionDelay
  };
}
const xf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Ur(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Ef = {
  entering: {
    opacity: 1,
    transform: Ur(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, kr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), mo = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: d,
    onExit: f,
    onExited: p,
    onExiting: b,
    style: v,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = Fa
  } = t, E = de(t, xf), _ = nn(), y = k.useRef(), w = kn(), h = k.useRef(null), N = Le(h, i.ref, n), R = (A) => (I) => {
    if (A) {
      const V = h.current;
      I === void 0 ? A(V) : A(V, I);
    }
  }, L = R(d), B = R((A, I) => {
    Va(A);
    const {
      duration: V,
      delay: Y,
      easing: Z
    } = Gn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let C;
    g === "auto" ? (C = w.transitions.getAutoHeightDuration(A.clientHeight), y.current = C) : C = V, A.style.transition = [w.transitions.create("opacity", {
      duration: C,
      delay: Y
    }), w.transitions.create("transform", {
      duration: kr ? C : C * 0.666,
      delay: Y,
      easing: Z
    })].join(","), c && c(A, I);
  }), F = R(u), P = R(b), T = R((A) => {
    const {
      duration: I,
      delay: V,
      easing: Y
    } = Gn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    g === "auto" ? (Z = w.transitions.getAutoHeightDuration(A.clientHeight), y.current = Z) : Z = I, A.style.transition = [w.transitions.create("opacity", {
      duration: Z,
      delay: V
    }), w.transitions.create("transform", {
      duration: kr ? Z : Z * 0.666,
      delay: kr ? V : V || Z * 0.333,
      easing: Y
    })].join(","), A.style.opacity = 0, A.style.transform = Ur(0.75), f && f(A);
  }), S = R(p);
  return /* @__PURE__ */ x(m, O({
    appear: o,
    in: l,
    nodeRef: h,
    onEnter: B,
    onEntered: F,
    onEntering: L,
    onExit: T,
    onExited: S,
    onExiting: P,
    addEndListener: (A) => {
      g === "auto" && _.start(y.current || 0, A), r && r(h.current, A);
    },
    timeout: g === "auto" ? null : g
  }, E, {
    children: (A, I) => /* @__PURE__ */ k.cloneElement(i, O({
      style: O({
        opacity: 0,
        transform: Ur(0.75),
        visibility: A === "exited" && !l ? "hidden" : void 0
      }, Ef[A], v, i.props.style),
      ref: N
    }, I))
  }));
});
process.env.NODE_ENV !== "production" && (mo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: vn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
mo.muiSupportAuto = !0;
const Hr = mo, Tf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Si = Tf, kf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Of = Oe(Ma, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), za = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const o = Da(), i = tt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: u,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: m,
    popperRef: E,
    transition: _,
    slots: y,
    slotProps: w
  } = i, h = de(i, kf), N = (r = y == null ? void 0 : y.root) != null ? r : c == null ? void 0 : c.Root, R = O({
    anchorEl: s,
    container: d,
    disablePortal: f,
    keepMounted: p,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: m,
    popperRef: E,
    transition: _
  }, h);
  return /* @__PURE__ */ x(Of, O({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: N
    },
    slotProps: w ?? u
  }, R, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (za.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, [virtualElement](https://popper.js.org/docs/v2/virtual-elements/),
   * or a function that returns either.
   * It's used to set the position of the popper.
   * The return value will passed as the reference object of the Popper instance.
   */
  anchorEl: a.oneOfType([Je, a.object, a.func]),
  /**
   * Popper render function or node.
   */
  children: a.oneOfType([a.node, a.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: a.shape({
    Root: a.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([Je, a.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: a.arrayOf(a.shape({
    data: a.object,
    effect: a.func,
    enabled: a.bool,
    fn: a.func,
    name: a.any,
    options: a.object,
    phase: a.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: a.arrayOf(a.string),
    requiresIfExists: a.arrayOf(a.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: a.shape({
    modifiers: a.array,
    onFirstUpdate: a.func,
    placement: a.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: a.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: Zr,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: a.shape({
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: a.bool
});
const Ua = za;
function Sf(e) {
  return Ge("MuiTooltip", e);
}
const Cf = it("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ot = Cf, Nf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Pf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Rf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${He(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return et(s, Sf, t);
}, $f = Oe(Ua, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.popper, !n.disableInteractive && t.popperInteractive, n.arrow && t.popperArrow, !n.open && t.popperClose];
  }
})(({
  theme: e,
  ownerState: t,
  open: n
}) => O({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${ot.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ot.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ot.arrow}`]: O({}, t.isRtl ? {
    right: 0,
    marginRight: "-0.71em"
  } : {
    left: 0,
    marginLeft: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "100% 100%"
    }
  }),
  [`&[data-popper-placement*="left"] .${ot.arrow}`]: O({}, t.isRtl ? {
    left: 0,
    marginLeft: "-0.71em"
  } : {
    right: 0,
    marginRight: "-0.71em"
  }, {
    height: "1em",
    width: "0.71em",
    "&::before": {
      transformOrigin: "0 0"
    }
  })
})), Mf = Oe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${He(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => O({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Wn(e.palette.grey[700], 0.92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium
}, t.arrow && {
  position: "relative",
  margin: 0
}, t.touch && {
  padding: "8px 16px",
  fontSize: e.typography.pxToRem(14),
  lineHeight: `${Pf(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ot.popper}[data-popper-placement*="left"] &`]: O({
    transformOrigin: "right center"
  }, t.isRtl ? O({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : O({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${ot.popper}[data-popper-placement*="right"] &`]: O({
    transformOrigin: "left center"
  }, t.isRtl ? O({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : O({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${ot.popper}[data-popper-placement*="top"] &`]: O({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ot.popper}[data-popper-placement*="bottom"] &`]: O({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), If = Oe("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (e, t) => t.arrow
})(({
  theme: e
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : Wn(e.palette.grey[700], 0.9),
  "&::before": {
    content: '""',
    margin: "auto",
    display: "block",
    width: "100%",
    height: "100%",
    backgroundColor: "currentColor",
    transform: "rotate(45deg)"
  }
}));
let Mn = !1;
const Ci = new yn();
let en = {
  x: 0,
  y: 0
};
function In(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Ha = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, s, l, c, u, d, f, p, b, v, g, m, E, _, y, w, h;
  const N = tt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: R = !1,
    children: L,
    components: B = {},
    componentsProps: F = {},
    describeChild: P = !1,
    disableFocusListener: T = !1,
    disableHoverListener: S = !1,
    disableInteractive: $ = !1,
    disableTouchListener: A = !1,
    enterDelay: I = 100,
    enterNextDelay: V = 0,
    enterTouchDelay: Y = 700,
    followCursor: Z = !1,
    id: C,
    leaveDelay: j = 0,
    leaveTouchDelay: U = 1500,
    onClose: K,
    onOpen: z,
    open: H,
    placement: G = "bottom",
    PopperComponent: q,
    PopperProps: W = {},
    slotProps: X = {},
    slots: J = {},
    title: ne,
    TransitionComponent: D = Hr,
    TransitionProps: Q
  } = N, M = de(N, Nf), re = /* @__PURE__ */ k.isValidElement(L) ? L : /* @__PURE__ */ x("span", {
    children: L
  }), ve = kn(), Se = ve.direction === "rtl", [me, lt] = k.useState(), [Ce, qe] = k.useState(null), $e = k.useRef(!1), Ke = $ || Z, we = nn(), Et = nn(), ct = nn(), Wt = nn(), [On, yo] = ca({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Xe = On;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = k.useRef(H !== void 0);
    k.useEffect(() => {
      me && me.disabled && !ee && ne !== "" && me.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, me, ee]);
  }
  const lr = la(C), Gt = k.useRef(), Sn = fn(() => {
    Gt.current !== void 0 && (document.body.style.WebkitUserSelect = Gt.current, Gt.current = void 0), Wt.clear();
  });
  k.useEffect(() => Sn, [Sn]);
  const wo = (ee) => {
    Ci.clear(), Mn = !0, yo(!0), z && !Xe && z(ee);
  }, Cn = fn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      Ci.start(800 + j, () => {
        Mn = !1;
      }), yo(!1), K && Xe && K(ee), we.start(ve.transitions.duration.shortest, () => {
        $e.current = !1;
      });
    }
  ), cr = (ee) => {
    $e.current && ee.type !== "touchstart" || (me && me.removeAttribute("title"), Et.clear(), ct.clear(), I || Mn && V ? Et.start(Mn ? V : I, () => {
      wo(ee);
    }) : wo(ee));
  }, xo = (ee) => {
    Et.clear(), ct.start(j, () => {
      Cn(ee);
    });
  }, {
    isFocusVisibleRef: Eo,
    onBlur: cs,
    onFocus: us,
    ref: ds
  } = ua(), [, To] = k.useState(!1), ko = (ee) => {
    cs(ee), Eo.current === !1 && (To(!1), xo(ee));
  }, Oo = (ee) => {
    me || lt(ee.currentTarget), us(ee), Eo.current === !0 && (To(!0), cr(ee));
  }, So = (ee) => {
    $e.current = !0;
    const Me = re.props;
    Me.onTouchStart && Me.onTouchStart(ee);
  }, Co = cr, No = xo, ps = (ee) => {
    So(ee), ct.clear(), we.clear(), Sn(), Gt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Wt.start(Y, () => {
      document.body.style.WebkitUserSelect = Gt.current, cr(ee);
    });
  }, fs = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), Sn(), ct.start(U, () => {
      Cn(ee);
    });
  };
  k.useEffect(() => {
    if (!Xe)
      return;
    function ee(Me) {
      (Me.key === "Escape" || Me.key === "Esc") && Cn(Me);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [Cn, Xe]);
  const hs = Le(re.ref, ds, lt, n);
  !ne && ne !== 0 && (Xe = !1);
  const ur = k.useRef(), ms = (ee) => {
    const Me = re.props;
    Me.onMouseMove && Me.onMouseMove(ee), en = {
      x: ee.clientX,
      y: ee.clientY
    }, ur.current && ur.current.update();
  }, qt = {}, dr = typeof ne == "string";
  P ? (qt.title = !Xe && dr && !S ? ne : null, qt["aria-describedby"] = Xe ? lr : null) : (qt["aria-label"] = dr ? ne : null, qt["aria-labelledby"] = Xe && !dr ? lr : null);
  const De = O({}, qt, M, re.props, {
    className: Te(M.className, re.props.className),
    onTouchStart: So,
    ref: hs
  }, Z ? {
    onMouseMove: ms
  } : {});
  process.env.NODE_ENV !== "production" && (De["data-mui-internal-clone-element"] = !0, k.useEffect(() => {
    me && !me.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [me]));
  const Kt = {};
  A || (De.onTouchStart = ps, De.onTouchEnd = fs), S || (De.onMouseOver = In(Co, De.onMouseOver), De.onMouseLeave = In(No, De.onMouseLeave), Ke || (Kt.onMouseOver = Co, Kt.onMouseLeave = No)), T || (De.onFocus = In(Oo, De.onFocus), De.onBlur = In(ko, De.onBlur), Ke || (Kt.onFocus = Oo, Kt.onBlur = ko)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const gs = k.useMemo(() => {
    var ee;
    let Me = [{
      name: "arrow",
      enabled: !!Ce,
      options: {
        element: Ce,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && (Me = Me.concat(W.popperOptions.modifiers)), O({}, W.popperOptions, {
      modifiers: Me
    });
  }, [Ce, W]), Xt = O({}, N, {
    isRtl: Se,
    arrow: R,
    disableInteractive: Ke,
    placement: G,
    PopperComponentProp: q,
    touch: $e.current
  }), pr = Rf(Xt), Po = (r = (o = J.popper) != null ? o : B.Popper) != null ? r : $f, Ro = (i = (s = (l = J.transition) != null ? l : B.Transition) != null ? s : D) != null ? i : Hr, $o = (c = (u = J.tooltip) != null ? u : B.Tooltip) != null ? c : Mf, Mo = (d = (f = J.arrow) != null ? f : B.Arrow) != null ? d : If, bs = rn(Po, O({}, W, (p = X.popper) != null ? p : F.popper, {
    className: Te(pr.popper, W == null ? void 0 : W.className, (b = (v = X.popper) != null ? v : F.popper) == null ? void 0 : b.className)
  }), Xt), vs = rn(Ro, O({}, Q, (g = X.transition) != null ? g : F.transition), Xt), ys = rn($o, O({}, (m = X.tooltip) != null ? m : F.tooltip, {
    className: Te(pr.tooltip, (E = (_ = X.tooltip) != null ? _ : F.tooltip) == null ? void 0 : E.className)
  }), Xt), ws = rn(Mo, O({}, (y = X.arrow) != null ? y : F.arrow, {
    className: Te(pr.arrow, (w = (h = X.arrow) != null ? h : F.arrow) == null ? void 0 : w.className)
  }), Xt);
  return /* @__PURE__ */ ue(k.Fragment, {
    children: [/* @__PURE__ */ k.cloneElement(re, De), /* @__PURE__ */ x(Po, O({
      as: q ?? Ua,
      placement: G,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: en.y,
          left: en.x,
          right: en.x,
          bottom: en.y,
          width: 0,
          height: 0
        })
      } : me,
      popperRef: ur,
      open: me ? Xe : !1,
      id: lr,
      transition: !0
    }, Kt, bs, {
      popperOptions: gs,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ x(Ro, O({
        timeout: ve.transitions.duration.shorter
      }, ee, vs, {
        children: /* @__PURE__ */ ue($o, O({}, ys, {
          children: [ne, R ? /* @__PURE__ */ x(Mo, O({}, ws, {
            ref: qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ha.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: a.bool,
  /**
   * Tooltip reference element.
   */
  children: vn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Arrow: a.elementType,
    Popper: a.elementType,
    Tooltip: a.elementType,
    Transition: a.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: a.shape({
    arrow: a.object,
    popper: a.object,
    tooltip: a.object,
    transition: a.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: a.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: a.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: a.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: a.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: a.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: a.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: a.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: a.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: a.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: a.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: a.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: a.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: a.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: a.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: a.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: a.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: a.shape({
    arrow: a.object,
    popper: a.object,
    tooltip: a.object,
    transition: a.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: a.shape({
    arrow: a.elementType,
    popper: a.elementType,
    tooltip: a.elementType,
    transition: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: a.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: a.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: a.object
});
const _f = Ha;
var go = {}, Wa = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Wa);
var Af = Wa.exports, Or = {};
function Df(e) {
  return Ge("MuiSvgIcon", e);
}
it("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const jf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Bf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${He(t)}`, `fontSize${He(n)}`]
  };
  return et(o, Df, r);
}, Lf = Oe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${He(n.color)}`], t[`fontSize${He(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, l, c, u, d, f, p, b, v;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (n = e.transitions) == null || (r = n.create) == null ? void 0 : r.call(n, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((i = e.typography) == null || (s = i.pxToRem) == null ? void 0 : s.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (d = u.pxToRem) == null ? void 0 : d.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (f = (p = (e.vars || e).palette) == null || (p = p[t.color]) == null ? void 0 : p.main) != null ? f : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), bo = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: d = !1,
    titleAccess: f,
    viewBox: p = "0 0 24 24"
  } = r, b = de(r, jf), v = /* @__PURE__ */ k.isValidElement(o) && o.type === "svg", g = O({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: v
  }), m = {};
  d || (m.viewBox = p);
  const E = Bf(g);
  return /* @__PURE__ */ ue(Lf, O({
    as: l,
    className: Te(E.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, m, b, v && o.props, {
    ownerState: g,
    children: [v ? o.props.children : o, f ? /* @__PURE__ */ x("title", {
      children: f
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (bo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: a.oneOfType([a.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), a.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: a.oneOfType([a.oneOf(["inherit", "large", "medium", "small"]), a.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: a.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: a.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: a.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: a.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: a.string
});
bo.muiName = "SvgIcon";
const Ni = bo;
function Ga(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ x(Ni, O({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ni.muiName, /* @__PURE__ */ k.memo(/* @__PURE__ */ k.forwardRef(n));
}
const Ff = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ga.configure(e);
  }
}, Vf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: He,
  createChainedFunction: Dr,
  createSvgIcon: Ga,
  debounce: sa,
  deprecatedPropType: fc,
  isMuiElement: hc,
  ownerDocument: ke,
  ownerWindow: Bt,
  requirePropFactory: mc,
  setRef: Fn,
  unstable_ClassNameGenerator: Ff,
  unstable_useEnhancedEffect: bt,
  unstable_useId: la,
  unsupportedProp: vc,
  useControlled: ca,
  useEventCallback: fn,
  useForkRef: Le,
  useIsFocusVisible: ua
}, Symbol.toStringTag, { value: "Module" })), zf = /* @__PURE__ */ Gl(Vf);
var Pi;
function Uf() {
  return Pi || (Pi = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = zf;
  }(Or)), Or;
}
var Hf = Af;
Object.defineProperty(go, "__esModule", {
  value: !0
});
var qa = go.default = void 0, Wf = Hf(Uf()), Gf = Ts;
qa = go.default = (0, Wf.default)(/* @__PURE__ */ (0, Gf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Ri(e, t, n) {
  return e ? /* @__PURE__ */ x(Li, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ x("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ka(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: u = !1,
    isDense: d = !0,
    isSubMenuParent: f = !1,
    hasDisabledGutters: p = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: g,
    children: m
  } = e, E = /* @__PURE__ */ x(
    Vs,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: d,
      disableGutters: p,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: g,
      children: n ? /* @__PURE__ */ ue(Kn, { children: [
        Ri(i, n, !0),
        /* @__PURE__ */ x(zs, { primary: n, inset: !i && o }),
        f ? /* @__PURE__ */ x(Li, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ x(qa, {}) }) : Ri(s, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ x(_f, { title: r, placement: "right", children: /* @__PURE__ */ x("div", { children: E }) }) : E;
}
function Xa(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function qf(e) {
  const [t, n] = xe(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Xa(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ x(vo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ ue(Kn, { children: [
    /* @__PURE__ */ x(Ka, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ x(
      Us,
      {
        anchorEl: t,
        open: !!t,
        onClose: l,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        children: c()
      },
      r.id
    )
  ] });
}
const Kf = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function vo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = xt(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Xa(t).filter((v) => !("menuItem" in v.group))
    ), f = Object.values(d).sort(
      (v, g) => (v.group.order || 0) - (g.group.order || 0)
    ), p = [];
    f.forEach((v) => {
      Kf(v.id, t.items).forEach(
        (g) => p.push({ item: g, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const b = p.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: d, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ x("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ x("div", { role: "menu", "aria-label": u, children: i.map((d, f) => {
    const { item: p } = d, b = l(d);
    if ("command" in p) {
      const v = p.group + f;
      return /* @__PURE__ */ x(
        Ka,
        {
          onClick: (g) => {
            n == null || n(g), r(p);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ x(
      qf,
      {
        parentMenuItem: p,
        parentItemProps: b,
        ...e
      },
      u + p.id
    );
  }) }, u);
}
function Xf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ x(vo, { ...e, includedGroups: i });
}
function Yf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ ue(
    Fi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ x("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ x(Hs, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ x(
          Xf,
          {
            commandHandler: e,
            menuDefinition: t,
            columnId: n,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function Jf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = xt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? s.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ x(
    Fi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ x(
        Yf,
        {
          commandHandler: e,
          menuDefinition: n,
          ...s,
          className: t
        },
        l
      ))
    }
  );
}
const Ya = /* @__PURE__ */ k.createContext({});
process.env.NODE_ENV !== "production" && (Ya.displayName = "ListContext");
const Zf = Ya;
function Qf(e) {
  return Ge("MuiList", e);
}
it("MuiList", ["root", "padding", "dense", "subheader"]);
const eh = ["children", "className", "component", "dense", "disablePadding", "subheader"], th = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return et({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Qf, t);
}, nh = Oe("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disablePadding && t.padding, n.dense && t.dense, n.subheader && t.subheader];
  }
})(({
  ownerState: e
}) => O({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Ja = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, d = de(r, eh), f = k.useMemo(() => ({
    dense: l
  }), [l]), p = O({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = th(p);
  return /* @__PURE__ */ x(Zf.Provider, {
    value: f,
    children: /* @__PURE__ */ ue(nh, O({
      as: s,
      className: Te(b.root, i),
      ref: n,
      ownerState: p
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: a.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: a.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: a.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const rh = Ja, oh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Sr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function $i(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Za(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function tn(e, t, n, r, o, i) {
  let s = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Za(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Qa = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: d,
    variant: f = "selectedMenu"
  } = t, p = de(t, oh), b = k.useRef(null), v = k.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  bt(() => {
    o && b.current.focus();
  }, [o]), k.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, w) => {
      const h = !b.current.style.width;
      if (y.clientHeight < b.current.clientHeight && h) {
        const N = `${da(ke(y))}px`;
        b.current.style[w.direction === "rtl" ? "paddingLeft" : "paddingRight"] = N, b.current.style.width = `calc(100% + ${N})`;
      }
      return b.current;
    }
  }), []);
  const g = (y) => {
    const w = b.current, h = y.key, N = ke(w).activeElement;
    if (h === "ArrowDown")
      y.preventDefault(), tn(w, N, u, c, Sr);
    else if (h === "ArrowUp")
      y.preventDefault(), tn(w, N, u, c, $i);
    else if (h === "Home")
      y.preventDefault(), tn(w, null, u, c, Sr);
    else if (h === "End")
      y.preventDefault(), tn(w, null, u, c, $i);
    else if (h.length === 1) {
      const R = v.current, L = h.toLowerCase(), B = performance.now();
      R.keys.length > 0 && (B - R.lastTime > 500 ? (R.keys = [], R.repeating = !0, R.previousKeyMatched = !0) : R.repeating && L !== R.keys[0] && (R.repeating = !1)), R.lastTime = B, R.keys.push(L);
      const F = N && !R.repeating && Za(N, R);
      R.previousKeyMatched && (F || tn(w, N, !1, c, Sr, R)) ? y.preventDefault() : R.previousKeyMatched = !1;
    }
    d && d(y);
  }, m = Le(b, n);
  let E = -1;
  k.Children.forEach(s, (y, w) => {
    if (!/* @__PURE__ */ k.isValidElement(y)) {
      E === w && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Ln.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (f === "selectedMenu" && y.props.selected || E === -1) && (E = w), E === w && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const _ = k.Children.map(s, (y, w) => {
    if (w === E) {
      const h = {};
      return i && (h.autoFocus = !0), y.props.tabIndex === void 0 && f === "selectedMenu" && (h.tabIndex = 0), /* @__PURE__ */ k.cloneElement(y, h);
    }
    return y;
  });
  return /* @__PURE__ */ x(rh, O({
    role: "menu",
    ref: m,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, p, {
    children: _
  }));
});
process.env.NODE_ENV !== "production" && (Qa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: a.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: a.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: a.node,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: a.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: a.bool,
  /**
   * @ignore
   */
  onKeyDown: a.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const ih = Qa, ah = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], sh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, es = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = kn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: d,
    onEntered: f,
    onEntering: p,
    onExit: b,
    onExited: v,
    onExiting: g,
    style: m,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: _ = Fa
  } = t, y = de(t, ah), w = k.useRef(null), h = Le(w, l.ref, n), N = ($) => (A) => {
    if ($) {
      const I = w.current;
      A === void 0 ? $(I) : $(I, A);
    }
  }, R = N(p), L = N(($, A) => {
    Va($);
    const I = Gn({
      style: m,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    $.style.webkitTransition = r.transitions.create("opacity", I), $.style.transition = r.transitions.create("opacity", I), d && d($, A);
  }), B = N(f), F = N(g), P = N(($) => {
    const A = Gn({
      style: m,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    $.style.webkitTransition = r.transitions.create("opacity", A), $.style.transition = r.transitions.create("opacity", A), b && b($);
  }), T = N(v);
  return /* @__PURE__ */ x(_, O({
    appear: s,
    in: u,
    nodeRef: w,
    onEnter: L,
    onEntered: B,
    onEntering: R,
    onExit: P,
    onExited: T,
    onExiting: F,
    addEndListener: ($) => {
      i && i(w.current, $);
    },
    timeout: E
  }, y, {
    children: ($, A) => /* @__PURE__ */ k.cloneElement(l, O({
      style: O({
        opacity: 0,
        visibility: $ === "exited" && !u ? "hidden" : void 0
      }, sh[$], m, l.props.style),
      ref: h
    }, A))
  }));
});
process.env.NODE_ENV !== "production" && (es.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: a.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: a.bool,
  /**
   * A single child content element.
   */
  children: vn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: a.oneOfType([a.shape({
    enter: a.string,
    exit: a.string
  }), a.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: a.bool,
  /**
   * @ignore
   */
  onEnter: a.func,
  /**
   * @ignore
   */
  onEntered: a.func,
  /**
   * @ignore
   */
  onEntering: a.func,
  /**
   * @ignore
   */
  onExit: a.func,
  /**
   * @ignore
   */
  onExited: a.func,
  /**
   * @ignore
   */
  onExiting: a.func,
  /**
   * @ignore
   */
  style: a.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: a.oneOfType([a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
const lh = es;
function ch(e) {
  return Ge("MuiBackdrop", e);
}
it("MuiBackdrop", ["root", "invisible"]);
const uh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], dh = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return et({
    root: ["root", n && "invisible"]
  }, ch, t);
}, ph = Oe("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.invisible && t.invisible];
  }
})(({
  ownerState: e
}) => O({
  position: "fixed",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  right: 0,
  bottom: 0,
  top: 0,
  left: 0,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  WebkitTapHighlightColor: "transparent"
}, e.invisible && {
  backgroundColor: "transparent"
})), ts = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const s = tt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: f = {},
    invisible: p = !1,
    open: b,
    slotProps: v = {},
    slots: g = {},
    TransitionComponent: m = lh,
    transitionDuration: E
  } = s, _ = de(s, uh), y = O({}, s, {
    component: u,
    invisible: p
  }), w = dh(y), h = (r = v.root) != null ? r : f.root;
  return /* @__PURE__ */ x(m, O({
    in: b,
    timeout: E
  }, _, {
    children: /* @__PURE__ */ x(ph, O({
      "aria-hidden": !0
    }, h, {
      as: (o = (i = g.root) != null ? i : d.Root) != null ? o : u,
      className: Te(w.root, c, h == null ? void 0 : h.className),
      ownerState: O({}, y, h == null ? void 0 : h.ownerState),
      classes: w,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ts.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Root: a.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: a.shape({
    root: a.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: a.bool,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: a.shape({
    root: a.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: a.shape({
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: a.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: a.oneOfType([a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })])
});
const fh = ts;
function hh(e) {
  return Ge("MuiModal", e);
}
it("MuiModal", ["root", "hidden", "backdrop"]);
const mh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], gh = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return et({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, hh, r);
}, bh = Oe("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.open && n.exited && t.hidden];
  }
})(({
  theme: e,
  ownerState: t
}) => O({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), vh = Oe(fh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), ns = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const u = tt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = vh,
    BackdropProps: f,
    className: p,
    closeAfterTransition: b = !1,
    children: v,
    container: g,
    component: m,
    components: E = {},
    componentsProps: _ = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: w = !1,
    disableEscapeKeyDown: h = !1,
    disablePortal: N = !1,
    disableRestoreFocus: R = !1,
    disableScrollLock: L = !1,
    hideBackdrop: B = !1,
    keepMounted: F = !1,
    onBackdropClick: P,
    open: T,
    slotProps: S,
    slots: $
    // eslint-disable-next-line react/prop-types
  } = u, A = de(u, mh), I = O({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: y,
    disableEnforceFocus: w,
    disableEscapeKeyDown: h,
    disablePortal: N,
    disableRestoreFocus: R,
    disableScrollLock: L,
    hideBackdrop: B,
    keepMounted: F
  }), {
    getRootProps: V,
    getBackdropProps: Y,
    getTransitionProps: Z,
    portalRef: C,
    isTopModal: j,
    exited: U,
    hasTransition: K
  } = iu(O({}, I, {
    rootRef: n
  })), z = O({}, I, {
    exited: U
  }), H = gh(z), G = {};
  if (v.props.tabIndex === void 0 && (G.tabIndex = "-1"), K) {
    const {
      onEnter: Q,
      onExited: M
    } = Z();
    G.onEnter = Q, G.onExited = M;
  }
  const q = (r = (o = $ == null ? void 0 : $.root) != null ? o : E.Root) != null ? r : bh, W = (i = (s = $ == null ? void 0 : $.backdrop) != null ? s : E.Backdrop) != null ? i : d, X = (l = S == null ? void 0 : S.root) != null ? l : _.root, J = (c = S == null ? void 0 : S.backdrop) != null ? c : _.backdrop, ne = vt({
    elementType: q,
    externalSlotProps: X,
    externalForwardedProps: A,
    getSlotProps: V,
    additionalProps: {
      ref: n,
      as: m
    },
    ownerState: z,
    className: Te(p, X == null ? void 0 : X.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), D = vt({
    elementType: W,
    externalSlotProps: J,
    additionalProps: f,
    getSlotProps: (Q) => Y(O({}, Q, {
      onClick: (M) => {
        P && P(M), Q != null && Q.onClick && Q.onClick(M);
      }
    })),
    className: Te(J == null ? void 0 : J.className, f == null ? void 0 : f.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !F && !T && (!K || U) ? null : /* @__PURE__ */ x(hn, {
    ref: C,
    container: g,
    disablePortal: N,
    children: /* @__PURE__ */ ue(q, O({}, ne, {
      children: [!B && d ? /* @__PURE__ */ x(W, O({}, D)) : null, /* @__PURE__ */ x(Vn, {
        disableEnforceFocus: w,
        disableAutoFocus: y,
        disableRestoreFocus: R,
        isEnabled: j,
        open: T,
        children: /* @__PURE__ */ k.cloneElement(v, G)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ns.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A backdrop component. This prop enables custom backdrop rendering.
   * @deprecated Use `slots.backdrop` instead. While this prop currently works, it will be removed in the next major version.
   * Use the `slots.backdrop` prop to make your application ready for the next version of Material UI.
   * @default styled(Backdrop, {
   *   name: 'MuiModal',
   *   slot: 'Backdrop',
   *   overridesResolver: (props, styles) => {
   *     return styles.backdrop;
   *   },
   * })({
   *   zIndex: -1,
   * })
   */
  BackdropComponent: a.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: a.object,
  /**
   * A single child content element.
   */
  children: vn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: a.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: a.shape({
    Backdrop: a.elementType,
    Root: a.elementType
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `slotProps` prop.
   * It's recommended to use the `slotProps` prop instead, as `componentsProps` will be deprecated in the future.
   *
   * @default {}
   */
  componentsProps: a.shape({
    backdrop: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * An HTML element or function that returns one.
   * The `container` will have the portal children appended to it.
   *
   * You can also provide a callback, which is called in a React layout effect.
   * This lets you set the container from a ref, and also makes server-side rendering possible.
   *
   * By default, it uses the body of the top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([Je, a.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: a.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: a.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: a.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: a.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: a.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: a.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: a.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: a.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: a.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: a.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: a.shape({
    backdrop: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: a.shape({
    backdrop: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object])
});
const yh = ns;
function wh(e) {
  return Ge("MuiPaper", e);
}
it("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const xh = ["className", "component", "elevation", "square", "variant"], Eh = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return et(i, wh, o);
}, Th = Oe("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], !n.square && t.rounded, n.variant === "elevation" && t[`elevation${n.elevation}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n;
  return O({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && O({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${Wn("#fff", Si(t.elevation))}, ${Wn("#fff", Si(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), rs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = de(r, xh), d = O({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), f = Eh(d);
  return process.env.NODE_ENV !== "production" && kn().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ x(Th, O({
    as: i,
    ownerState: d,
    className: Te(f.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (rs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: a.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Ht(ha, (e) => {
    const {
      elevation: t,
      variant: n
    } = e;
    return t > 0 && n === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
  }),
  /**
   * If `true`, rounded corners are disabled.
   * @default false
   */
  square: a.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: a.oneOfType([a.oneOf(["elevation", "outlined"]), a.string])
});
const kh = rs;
function Oh(e) {
  return Ge("MuiPopover", e);
}
it("MuiPopover", ["root", "paper"]);
const Sh = ["onEntering"], Ch = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Nh = ["slotProps"];
function Mi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Ii(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function _i(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function jn(e) {
  return typeof e == "function" ? e() : e;
}
const Ph = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"]
  }, Oh, t);
}, Rh = Oe(yh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), os = Oe(kh, {
  name: "MuiPopover",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  position: "absolute",
  overflowY: "auto",
  overflowX: "hidden",
  // So we see the popover when it's empty.
  // It's most likely on issue on userland.
  minWidth: 16,
  minHeight: 16,
  maxWidth: "calc(100% - 32px)",
  maxHeight: "calc(100% - 32px)",
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), is = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const s = tt({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: f = "anchorEl",
    children: p,
    className: b,
    container: v,
    elevation: g = 8,
    marginThreshold: m = 16,
    open: E,
    PaperProps: _ = {},
    slots: y,
    slotProps: w,
    transformOrigin: h = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: N = Hr,
    transitionDuration: R = "auto",
    TransitionProps: {
      onEntering: L
    } = {},
    disableScrollLock: B = !1
  } = s, F = de(s.TransitionProps, Sh), P = de(s, Ch), T = (r = w == null ? void 0 : w.paper) != null ? r : _, S = k.useRef(), $ = Le(S, T.ref), A = O({}, s, {
    anchorOrigin: u,
    anchorReference: f,
    elevation: g,
    marginThreshold: m,
    externalPaperSlotProps: T,
    transformOrigin: h,
    TransitionComponent: N,
    transitionDuration: R,
    TransitionProps: F
  }), I = Ph(A), V = k.useCallback(() => {
    if (f === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const Q = jn(c), M = Q && Q.nodeType === 1 ? Q : ke(S.current).body, re = M.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ve = M.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ve.top === 0 && ve.left === 0 && ve.right === 0 && ve.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + Mi(re, u.vertical),
      left: re.left + Ii(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, f]), Y = k.useCallback((Q) => ({
    vertical: Mi(Q, h.vertical),
    horizontal: Ii(Q, h.horizontal)
  }), [h.horizontal, h.vertical]), Z = k.useCallback((Q) => {
    const M = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, re = Y(M);
    if (f === "none")
      return {
        top: null,
        left: null,
        transformOrigin: _i(re)
      };
    const ve = V();
    let Se = ve.top - re.vertical, me = ve.left - re.horizontal;
    const lt = Se + M.height, Ce = me + M.width, qe = Bt(jn(c)), $e = qe.innerHeight - m, Ke = qe.innerWidth - m;
    if (m !== null && Se < m) {
      const we = Se - m;
      Se -= we, re.vertical += we;
    } else if (m !== null && lt > $e) {
      const we = lt - $e;
      Se -= we, re.vertical += we;
    }
    if (process.env.NODE_ENV !== "production" && M.height > $e && M.height && $e && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${M.height - $e}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), m !== null && me < m) {
      const we = me - m;
      me -= we, re.horizontal += we;
    } else if (Ce > Ke) {
      const we = Ce - Ke;
      me -= we, re.horizontal += we;
    }
    return {
      top: `${Math.round(Se)}px`,
      left: `${Math.round(me)}px`,
      transformOrigin: _i(re)
    };
  }, [c, f, V, Y, m]), [C, j] = k.useState(E), U = k.useCallback(() => {
    const Q = S.current;
    if (!Q)
      return;
    const M = Z(Q);
    M.top !== null && (Q.style.top = M.top), M.left !== null && (Q.style.left = M.left), Q.style.transformOrigin = M.transformOrigin, j(!0);
  }, [Z]);
  k.useEffect(() => (B && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, B, U]);
  const K = (Q, M) => {
    L && L(Q, M), U();
  }, z = () => {
    j(!1);
  };
  k.useEffect(() => {
    E && U();
  }), k.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      U();
    }
  } : null, [E, U]), k.useEffect(() => {
    if (!E)
      return;
    const Q = sa(() => {
      U();
    }), M = Bt(c);
    return M.addEventListener("resize", Q), () => {
      Q.clear(), M.removeEventListener("resize", Q);
    };
  }, [c, E, U]);
  let H = R;
  R === "auto" && !N.muiSupportAuto && (H = void 0);
  const G = v || (c ? ke(jn(c)).body : void 0), q = (o = y == null ? void 0 : y.root) != null ? o : Rh, W = (i = y == null ? void 0 : y.paper) != null ? i : os, X = vt({
    elementType: W,
    externalSlotProps: O({}, T, {
      style: C ? T.style : O({}, T.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: $
    },
    ownerState: A,
    className: Te(I.paper, T == null ? void 0 : T.className)
  }), J = vt({
    elementType: q,
    externalSlotProps: (w == null ? void 0 : w.root) || {},
    externalForwardedProps: P,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: G,
      open: E
    },
    ownerState: A,
    className: Te(I.root, b)
  }), {
    slotProps: ne
  } = J, D = de(J, Nh);
  return /* @__PURE__ */ x(q, O({}, D, !va(q) && {
    slotProps: ne,
    disableScrollLock: B
  }, {
    children: /* @__PURE__ */ x(N, O({
      appear: !0,
      in: E,
      onEntering: K,
      onExited: z,
      timeout: H
    }, F, {
      children: /* @__PURE__ */ x(W, O({}, X, {
        children: p
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (is.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Zr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Ht(a.oneOfType([Je, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = jn(e.anchorEl);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", `It should be an Element or PopoverVirtualElement instance but it's \`${t}\` instead.`].join(`
`));
    }
    return null;
  }),
  /**
   * This is the point on the anchor where the popover's
   * `anchorEl` will attach to. This is not used when the
   * anchorReference is 'anchorPosition'.
   *
   * Options:
   * vertical: [top, center, bottom];
   * horizontal: [left, center, right].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  anchorOrigin: a.shape({
    horizontal: a.oneOfType([a.oneOf(["center", "left", "right"]), a.number]).isRequired,
    vertical: a.oneOfType([a.oneOf(["bottom", "center", "top"]), a.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: a.shape({
    left: a.number.isRequired,
    top: a.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: a.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: a.oneOfType([Je, a.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: a.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: ha,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: a.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: a.shape({
    component: ic
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: a.shape({
    paper: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: a.shape({
    paper: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * This is the point on the popover which
   * will attach to the anchor's origin.
   *
   * Options:
   * vertical: [top, center, bottom, x(px)];
   * horizontal: [left, center, right, x(px)].
   * @default {
   *   vertical: 'top',
   *   horizontal: 'left',
   * }
   */
  transformOrigin: a.shape({
    horizontal: a.oneOfType([a.oneOf(["center", "left", "right"]), a.number]).isRequired,
    vertical: a.oneOfType([a.oneOf(["bottom", "center", "top"]), a.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: a.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object
});
const $h = is;
function Mh(e) {
  return Ge("MuiMenu", e);
}
it("MuiMenu", ["root", "paper", "list"]);
const Ih = ["onEntering"], _h = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Ah = {
  vertical: "top",
  horizontal: "right"
}, Dh = {
  vertical: "top",
  horizontal: "left"
}, jh = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Mh, t);
}, Bh = Oe($h, {
  shouldForwardProp: (e) => Ba(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Lh = Oe(os, {
  name: "MuiMenu",
  slot: "Paper",
  overridesResolver: (e, t) => t.paper
})({
  // specZ: The maximum height of a simple menu should be one or more rows less than the view
  // height. This ensures a tappable area outside of the simple menu with which to dismiss
  // the menu.
  maxHeight: "calc(100% - 96px)",
  // Add iOS momentum scrolling for iOS < 13.0
  WebkitOverflowScrolling: "touch"
}), Fh = Oe(ih, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), as = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o;
  const i = tt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: d = {},
    onClose: f,
    open: p,
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: m
    } = {},
    variant: E = "selectedMenu",
    slots: _ = {},
    slotProps: y = {}
  } = i, w = de(i.TransitionProps, Ih), h = de(i, _h), N = kn(), R = N.direction === "rtl", L = O({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: m,
    PaperProps: b,
    transitionDuration: g,
    TransitionProps: w,
    variant: E
  }), B = jh(L), F = s && !u && p, P = k.useRef(null), T = (Z, C) => {
    P.current && P.current.adjustStyleForScrollbar(Z, N), m && m(Z, C);
  }, S = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), f && f(Z, "tabKeyDown"));
  };
  let $ = -1;
  k.Children.map(l, (Z, C) => {
    /* @__PURE__ */ k.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Ln.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (E === "selectedMenu" && Z.props.selected || $ === -1) && ($ = C));
  });
  const A = (r = _.paper) != null ? r : Lh, I = (o = y.paper) != null ? o : b, V = vt({
    elementType: _.root,
    externalSlotProps: y.root,
    ownerState: L,
    className: [B.root, c]
  }), Y = vt({
    elementType: A,
    externalSlotProps: I,
    ownerState: L,
    className: B.paper
  });
  return /* @__PURE__ */ x(Bh, O({
    onClose: f,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: R ? "right" : "left"
    },
    transformOrigin: R ? Ah : Dh,
    slots: {
      paper: A,
      root: _.root
    },
    slotProps: {
      root: V,
      paper: Y
    },
    open: p,
    ref: n,
    transitionDuration: g,
    TransitionProps: O({
      onEntering: T
    }, w),
    ownerState: L
  }, h, {
    classes: v,
    children: /* @__PURE__ */ x(Fh, O({
      onKeyDown: S,
      actions: P,
      autoFocus: s && ($ === -1 || u),
      autoFocusItem: F,
      variant: E
    }, d, {
      className: Te(B.list, d.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (as.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: a.oneOfType([Je, a.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: a.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: a.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: a.object,
  /**
   * @ignore
   */
  className: a.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: a.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: a.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: a.func,
  /**
   * If `true`, the component is shown.
   */
  open: a.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: a.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: a.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: a.shape({
    paper: a.oneOfType([a.func, a.object]),
    root: a.oneOfType([a.func, a.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: a.shape({
    paper: a.elementType,
    root: a.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: a.oneOfType([a.arrayOf(a.oneOfType([a.func, a.object, a.bool])), a.func, a.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: a.oneOfType([a.oneOf(["auto"]), a.number, a.shape({
    appear: a.number,
    enter: a.number,
    exit: a.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: a.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: a.oneOf(["menu", "selectedMenu"])
});
const Vh = as;
function bm({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = _t.useState(void 0), s = Ee(
    (d) => {
      d.preventDefault(), i(
        o === void 0 ? {
          mouseX: d.clientX + 2,
          mouseY: d.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = Ee(() => {
    i(void 0);
  }, []), c = xt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ ue(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ x(
          Vh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ x(
              vo,
              {
                menuDefinition: n,
                commandHandler: t,
                onClick: l
              }
            )
          }
        )
      ]
    }
  );
}
const zh = Ga(/* @__PURE__ */ x("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Uh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Wr = (e, t, n = {}) => {
  const r = ft(t);
  r.current = t;
  const o = ft(n);
  o.current = Uh(o.current);
  const [i, s] = xe(() => r.current), [l, c] = xe(!0);
  return mt(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const d = await e();
        u && (s(() => d), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, l];
};
function Hh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, u] = xe(!1), [d, f] = xe(!1), p = Ee(() => {
    c && u(!1), f(!1);
  }, [c]), b = Ee((w) => {
    w.stopPropagation(), u((h) => {
      const N = !h;
      return N && w.shiftKey ? f(!0) : N || f(!1), N;
    });
  }, []), v = Ee(
    (w) => (p(), r(w)),
    [r, p]
  ), [g, m] = xe({ top: 1, left: 1 });
  mt(() => {
    if (c) {
      const w = o == null ? void 0 : o.current;
      if (w) {
        const h = w.getBoundingClientRect(), N = window.scrollY, R = window.scrollX, L = h.top + N + w.clientHeight, B = h.left + R;
        m({ top: L, left: B });
      }
    }
  }, [c, o]);
  const [E] = Wr(
    Ee(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [_] = Wr(
    Ee(async () => (e == null ? void 0 : e(!0)) ?? n ?? E, [e, n, E, c]),
    n ?? E
  ), y = d && _ ? _ : E;
  return /* @__PURE__ */ ue(Kn, { children: [
    /* @__PURE__ */ x(
      Vi,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: b,
        children: l ?? /* @__PURE__ */ x(zh, {})
      }
    ),
    /* @__PURE__ */ x(
      Ws,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: p,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: g.top,
            left: g.left
          }
        },
        children: y ? /* @__PURE__ */ x(
          Jf,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: y
          }
        ) : void 0
      }
    )
  ] });
}
function vm({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ x(
    Vi,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
const Wh = Bi(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), ss = k.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(zi.Root, { ref: n, className: ye(Wh(), e), ...t }));
ss.displayName = zi.Root.displayName;
function qn({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  helperText: r,
  label: o,
  placeholder: i,
  isRequired: s = !1,
  className: l,
  defaultValue: c,
  value: u,
  onChange: d,
  onFocus: f,
  onBlur: p
}) {
  return /* @__PURE__ */ ue("div", { className: "pr-inline-grid pr-items-center pr-gap-1.5", children: [
    /* @__PURE__ */ x(
      ss,
      {
        htmlFor: e,
        className: ye({
          "pr-text-red-600": n,
          "pr-hidden": !o
        }),
        children: `${o}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ x(
      Yr,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: s,
        className: ye(l, { "pr-border-red-600": n }),
        defaultValue: c,
        value: u,
        onChange: d,
        onFocus: f,
        onBlur: p
      }
    ),
    /* @__PURE__ */ x("p", { className: ye({ "pr-hidden": !r }), children: r })
  ] });
}
let Cr;
const Nr = () => (Cr || (Cr = ie.allBookIds.map((e) => ({
  bookId: e,
  label: ie.bookIdToEnglishName(e)
}))), Cr);
function ym({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const f = { bookNum: ie.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(f);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = xt(() => Nr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ue("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ x(
      Ir,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: Nr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ x(
      kt,
      {
        onClick: () => r(_o(e, -1)),
        isDisabled: e.bookNum <= Os,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(
      kt,
      {
        onClick: () => r(_o(e, 1)),
        isDisabled: e.bookNum >= Nr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ x(
      qn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ x(
      kt,
      {
        onClick: () => t(Ao(e, -1)),
        isDisabled: e.chapterNum <= Ss,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(
      kt,
      {
        onClick: () => t(Ao(e, 1)),
        isDisabled: e.chapterNum >= ji(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ x(
      qn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ x(
      kt,
      {
        onClick: () => t(Do(e, -1)),
        isDisabled: e.verseNum <= Cs,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(kt, { onClick: () => t(Do(e, 1)), children: ">" })
  ] });
}
class Gh {
  constructor() {
    Tt(this, "listeners", {});
  }
  addEventListener(t, n) {
    this.listeners[t] || (this.listeners[t] = []), this.listeners[t].push(n);
  }
  removeEventListener(t, n) {
    var o;
    const r = (o = this.listeners[t]) == null ? void 0 : o.indexOf(n);
    r !== void 0 && r !== -1 && this.listeners[t].splice(r, 1);
  }
  dispatchEvent(t) {
    const n = this.listeners[t.type];
    n && n.forEach((r) => r(t));
  }
}
class wm {
  constructor(t, n, r) {
    Tt(this, "id");
    Tt(this, "checkDefinition");
    Tt(this, "data");
    Tt(this, "resultsUpdated");
    if (r)
      this.id = r.id, this.checkDefinition = r;
    else {
      if (!n)
        throw new Error("Either 'id' or 'checkDefinition' must be provided.");
      this.id = n;
    }
    this.data = t, this.resultsUpdated = new Gh();
  }
  updateData(t) {
    this.data = t;
    const n = new CustomEvent("resultsUpdated", {
      detail: this
    });
    this.resultsUpdated.dispatchEvent(n);
  }
  addEventListener(t, n) {
    this.resultsUpdated.addEventListener(t, n);
  }
  removeEventListener(t, n) {
    this.resultsUpdated.removeEventListener(t, n);
  }
}
const At = "scrBook", qh = "scrRef", an = "source", Kh = "details", Xh = "Scripture Reference", Yh = "Scripture Book", ls = "Type", Jh = "Details";
function Zh(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${ie.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: At,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Xh,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ie.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === At ? fr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => $r(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => fr(r.start),
      id: qh,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : fr(o.start);
      },
      sortingFn: (r, o) => $r(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => typeof r.source == "object" && "displayName" in r.source ? r.source.displayName : r.source,
      id: an,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? ls : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Kh,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Jh,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function xm({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: l
}) {
  const [c, u] = xe([]), [d, f] = xe([{ id: At, desc: !1 }]), [p, b] = xe(() => e.flatMap((T) => {
    const S = T.checkDefinition ?? T.id;
    return T.data.map(($) => ({
      ...$,
      source: S
    }));
  })), [v, g] = xe({});
  mt(() => {
    const T = (S) => {
      const { detail: $ } = S, A = $, I = A.checkDefinition ?? A.id, V = A.data.map((Y) => ({
        ...Y,
        source: I
      }));
      $ !== void 0 && b((Y) => [...Y.filter((C) => C.source !== I), ...V]);
    };
    return e.forEach((S) => {
      S.resultsUpdated.addEventListener("resultsUpdated", T);
    }), () => {
      e.forEach((S) => {
        S.resultsUpdated.removeEventListener("resultsUpdated", T);
      });
    };
  }, [e]);
  const m = xt(
    () => Zh(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [r, i, s, n]
  );
  function E(T) {
    return T.bookNum * 1e6 + T.chapterNum * 1e3 + T.verseNum;
  }
  const _ = Ee(
    (T, S) => !S || $r(T, S) === 0 ? `${E(T)}` : `${E(T)}-${E(S)}`,
    []
  ), y = Ee(
    (T) => `${_(T.start, T.end)} ${T.source} ${T.detail}`,
    [_]
  ), w = nl({
    data: p,
    columns: m,
    state: {
      grouping: c,
      sorting: d,
      rowSelection: v
    },
    onGroupingChange: u,
    onSortingChange: f,
    onRowSelectionChange: g,
    getExpandedRowModel: rl(),
    getGroupedRowModel: ol(),
    getCoreRowModel: il(),
    getSortedRowModel: al(),
    getRowId: y,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  mt(() => {
    if (l) {
      const T = w.getSelectedRowModel().rowsById, S = Object.keys(T);
      if (S.length === 1) {
        const $ = p.find((A) => y(A) === S[0]) || void 0;
        $ && l($);
      }
    }
  }, [v, p, y, l, w]);
  const h = o ?? Yh, N = i ?? ls, R = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${h}`, value: [At] },
    { label: `Group by ${N}`, value: [an] },
    {
      label: `Group by ${h} and ${N}`,
      value: [At, an]
    },
    {
      label: `Group by ${N} and ${h}`,
      value: [an, At]
    }
  ], L = (T) => {
    const S = JSON.parse(T.target.value);
    u(S);
  }, B = (T, S) => {
    !T.getIsGrouped() && !T.getIsSelected() && T.getToggleSelectedHandler()(S);
  }, F = (T, S) => T.getIsGrouped() ? "" : S % 2 === 0 ? "banded-row-even" : "banded-row-odd", P = (T, S) => T.depth >= S.column.getIndex() ? ` indent${T.depth}` : "";
  return /* @__PURE__ */ ue("div", { className: "p-2", children: [
    /* @__PURE__ */ x("div", { className: "h-2" }),
    !t && /* @__PURE__ */ x("select", { value: JSON.stringify(c), onChange: L, children: R.map((T) => /* @__PURE__ */ x("option", { value: JSON.stringify(T.value), children: T.label }, T.label)) }),
    /* @__PURE__ */ ue("table", { children: [
      t && /* @__PURE__ */ x("thead", { children: w.getHeaderGroups().map((T) => /* @__PURE__ */ x("tr", { children: T.headers.map((S) => /* @__PURE__ */ x("th", { colSpan: S.colSpan, children: S.isPlaceholder ? void 0 : /* @__PURE__ */ ue("div", { children: [
        S.column.getCanGroup() ? /* @__PURE__ */ x(
          "button",
          {
            title: `Toggle grouping by ${S.column.columnDef.header}`,
            onClick: S.column.getToggleGroupingHandler(),
            style: { cursor: "pointer" },
            type: "button",
            children: S.column.getIsGrouped() ? `🛑(${S.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        hr(S.column.columnDef.header, S.getContext())
      ] }) }, S.id)) }, T.id)) }),
      /* @__PURE__ */ x("tbody", { children: w.getRowModel().rows.map((T, S) => /* @__PURE__ */ x(
        "tr",
        {
          className: `${T.getIsSelected() ? "selected " : ""} ${F(T, S)}`,
          onClick: ($) => B(T, $),
          children: T.getVisibleCells().map(($) => {
            if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== an || !n)))
              return /* @__PURE__ */ x(
                "td",
                {
                  className: `${$.column.columnDef.id}${P(T, $)}`,
                  children: (() => $.getIsGrouped() ? /* @__PURE__ */ ue(
                    "button",
                    {
                      onClick: T.getToggleExpandedHandler(),
                      style: {
                        cursor: T.getCanExpand() ? "pointer" : "normal"
                      },
                      type: "button",
                      children: [
                        T.getIsExpanded() ? "👇" : "👉",
                        " ",
                        hr($.column.columnDef.cell, $.getContext()),
                        " (",
                        T.subRows.length,
                        ")"
                      ]
                    }
                  ) : hr($.column.columnDef.cell, $.getContext()))()
                },
                $.id
              );
          })
        },
        T.id
      )) })
    ] })
  ] });
}
function Em({ onSearch: e, placeholder: t }) {
  const [n, r] = xe(""), o = (i) => {
    r(i), e(i);
  };
  return /* @__PURE__ */ x(Gs, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ x(
    qn,
    {
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => o(i.target.value)
    }
  ) });
}
function Tm({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: u = "off",
  className: d,
  onChange: f,
  onChangeCommitted: p
}) {
  return /* @__PURE__ */ x(
    qs,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: l,
      value: c,
      valueLabelDisplay: u,
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: f,
      onChangeCommitted: p
    }
  );
}
function km({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: l
}) {
  const c = {
    action: (s == null ? void 0 : s.action) || l,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ x(
    Ks,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: i,
      id: t,
      ContentProps: c
    }
  );
}
function Om({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ x(
    Xs,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Ai({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ x(qn, { defaultValue: t[n.key], onChange: r })
  );
}
const Qh = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ x(
  Hl,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Sm({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: l = !0,
  defaultColumnResizable: c = !0,
  rows: u,
  enableSelectColumn: d,
  selectColumnWidth: f = 50,
  rowKeyGetter: p,
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: g,
  onSelectedRowsChange: m,
  onRowsChange: E,
  onCellClick: _,
  onCellDoubleClick: y,
  onCellContextMenu: w,
  onCellKeyDown: h,
  direction: N = "ltr",
  enableVirtualization: R = !0,
  onCopy: L,
  onPaste: B,
  onScroll: F,
  className: P,
  "data-testid": T
}) {
  const S = xt(() => {
    const $ = e.map((A) => typeof A.editable == "function" ? {
      ...A,
      editable: (V) => !!A.editable(V),
      renderEditCell: A.renderEditCell || Ai
    } : A.editable && !A.renderEditCell ? { ...A, renderEditCell: Ai } : A.renderEditCell && !A.editable ? { ...A, editable: !1 } : A);
    return d ? [{ ...ll, minWidth: f }, ...$] : $;
  }, [e, d, f]);
  return /* @__PURE__ */ x(
    sl,
    {
      columns: S,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: s,
        sortable: l,
        resizable: c
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: u,
      rowKeyGetter: p,
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: g,
      onSelectedRowsChange: m,
      onRowsChange: E,
      onCellClick: _,
      onCellDoubleClick: y,
      onCellContextMenu: w,
      onCellKeyDown: h,
      direction: N,
      enableVirtualization: R,
      onCopy: L,
      onPaste: B,
      onScroll: F,
      renderers: { renderCheckbox: Qh },
      className: `papi-table ${P ?? "rdg-light"}`,
      "data-testid": T
    }
  );
}
function Cm({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = ft(void 0);
  return /* @__PURE__ */ x("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ x(Ys, { position: "static", id: r, children: /* @__PURE__ */ ue(Js, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ x(
      Hh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ x("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Nm = (e, t) => {
  mt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Pr = () => !1, Pm = (e, t) => {
  const [n] = Wr(
    Ee(async () => {
      if (!e)
        return Pr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Pr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  mt(() => () => {
    n !== Pr && n();
  }, [n]);
};
function em(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
em(`.papi-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
  font-family: 'Nunito Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-weight: 700;
  line-height: 1;
}

.papi-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-button.secondary {
  background-color: transparent;
  box-shadow: rgba(0, 0, 0, 0.15) 0 0 0 1px inset;
  color: #333;
}

.papi-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-button.video {
  background-color: red;
  color: white;
}

.papi-button.video a,
.papi-button.video a:visited {
  color: white;
  text-decoration: none;
}

.papi-button.video a:hover {
  color: white;
  text-decoration: underline;
}
.papi-switch {
  background-color: transparent;
}

.papi-switch.primary {
  background-color: #1ea7fd;
}

.papi-switch.secondary {
  background-color: #6fc8ff;
}

.papi-switch.error {
  background-color: #f00;
}

.papi-switch.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-switch.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-snackbar {
  font-family: Arial, Helvetica, sans-serif;
}

.papi-snackbar.primary {
  background: #1ea7fd;
  color: white;
}

.papi-snackbar.external {
  background-color: lightsteelblue;
  border-color: white;
  border-style: dotted;
  padding: 2%;
  width: 30%;
}

.papi-snackbar.secondary {
  background: transparent;
  color: #333;
}

.papi-snackbar.alert {
  background: lightcoral;
}

.papi-snackbar.paratext {
  background: darkgreen;
  color: greenyellow;
}

.papi-snackbar.bright {
  background: greenyellow;
  color: darkgreen;
}
.papi-menu-item {
  background-color: transparent;
}

.papi-menu-icon-trailing {
  margin-left: 10px;
  place-content: flex-end;
}

.papi-menu-item img {
  max-width: 24px;
  max-height: 24px;
}
.papi-combo-box {
  background-color: transparent;
}

.papi-combo-box.fullwidth {
  width: 100%;
}

.papi-combo-box.error {
  background-color: #f00;
}

.papi-combo-box.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-combo-box.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-context-menu-target {
  white-space: nowrap;
  cursor: context-menu;
}

.papi-context-menu-target * {
  white-space: normal;
}

.papi-context-menu-target:hover {
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext:hover {
  box-shadow: 0 0 10px rgba(0, 100, 0, 0.07); /* Faint shadowy background */
}

.papi-context-menu-target.paratext.bright:hover {
  box-shadow: 0 0 10px rgba(173, 255, 47, 0.07); /* Faint shadowy background */
}

.papi-context-menu.paratext ul {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-context-menu.paratext.bright ul {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
}
.papi-slider {
  background-color: transparent;
  color: #1ea7fd;
}

.papi-slider.vertical {
  min-height: 200px;
}

.papi-slider.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-slider.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-checkbox {
  background-color: transparent;
}

.papi-checkbox.error {
  color: #f00;
}

.papi-checkbox.error:hover {
  background-color: rgba(255, 0, 0, 0.2);
}

.papi-checkbox.paratext {
  color: greenyellow;
}

.papi-checkbox-label.paratext {
  color: darkgreen;
}

.papi-checkbox.paratext:hover {
  background-color: rgba(0, 100, 0, 0.3);
}

.papi-checkbox.paratext.bright {
  color: darkgreen;
}

.papi-checkbox-label.paratext.bright {
  background-color: greenyellow;
}

.papi-checkbox.paratext.bright:hover {
  background-color: rgba(173, 255, 47, 0.3);
}

.papi-checkbox.below,
.papi-checkbox.above {
  text-align: center;
}
.papi-icon-button {
  border: 0;
  border-radius: 3em;
  cursor: pointer;
  display: inline-block;
}

.papi-icon-button.primary {
  background-color: #1ea7fd;
  color: white;
}

.papi-icon-button.secondary {
  background-color: transparent;
  color: #333;
}

.papi-icon-button.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-icon-button.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.papi-multi-column-menu {
  background-color: rgb(222, 222, 222);
  display: flex;
  flex-direction: column;
  padding-left: 3px;
  padding-right: 3px;
}

.papi-menu-column {
  font-size: 11pt;
  font-weight: 600;
  padding-bottom: 2px;
}

.papi-menu-column ul {
  padding-top: 0;
}

.papi-menu-column-header {
  background-color: rgb(181, 181, 181);
  padding-left: 24px;
  margin-top: 0;
  margin-bottom: 0;
}

.papi-multi-column-menu.paratext {
  background-color: rgb(76, 106, 76);
  color: rgb(214, 255, 152);
}

.papi-multi-column-menu.paratext.bright {
  color: rgb(76, 106, 76);
  background-color: rgb(214, 255, 152);
}
.basic-list-table {
  overflow: auto;

  .table-header {
    text-align: left;
  }
}

table {
  border-spacing: 1px;
}

td {
  padding-left: 3px;
  padding-right: 3px;
}

.basic-list-expand-button {
  cursor: pointer;
}

.indent1 {
  padding-left: 20px;
}

.indent2 {
  padding-left: 40px;
}

.banded-row-even {
  background-color: lightgrey;
}

.selected {
  background-color: bisque;
}

.banded-row-even:hover,.banded-row-odd:hover {
  background-color: lightcyan;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Subtle shadow */
  cursor: pointer;
}

.selected:hover {
  cursor: default;
}
.papi-toolbar {
  background-color: #eee;
  color: black;
}

.papi-toolbar.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-toolbar.paratext.bright {
  background-color: greenyellow;
  color: darkgreen;
}

.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  position: relative;
}
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

/*
Remove the default font size and weight for headings.
*/

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

/*
Add the correct font weight in Edge and Safari.
*/

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

/*
Add the correct font size in all browsers.
*/

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

/*
Use the modern Firefox focus style for all focusable elements.
*/

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

/*
Add the correct display in Chrome and Safari.
*/

/*
Removes the default spacing and border for appropriate elements.
*/

/*
Reset default styling for dialogs.
*/

/*
Prevent resizing textareas horizontally by default.
*/

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

/*
Set the default cursor for buttons.
*/

/*
Make sure disabled buttons don't get the pointer cursor.
*/

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

/* Make elements with the HTML hidden attribute stay hidden by default */
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  :root {
    --background: 0 0% 100%;
    --foreground: 222.2 84% 4.9%;

    --card: 0 0% 100%;
    --card-foreground: 222.2 84% 4.9%;

    --popover: 0 0% 100%;
    --popover-foreground: 222.2 84% 4.9%;

    --primary: 222.2 47.4% 11.2%;
    --primary-foreground: 210 40% 98%;

    --secondary: 210 40% 96.1%;
    --secondary-foreground: 222.2 47.4% 11.2%;

    --muted: 210 40% 96.1%;
    --muted-foreground: 215.4 16.3% 46.9%;

    --accent: 210 40% 96.1%;
    --accent-foreground: 222.2 47.4% 11.2%;

    --destructive: 0 84.2% 60.2%;
    --destructive-foreground: 210 40% 98%;

    --border: 214.3 31.8% 91.4%;
    --input: 214.3 31.8% 91.4%;
    --ring: 222.2 84% 4.9%;

    --radius: 0.5rem;
  }
  * {
    border-color: hsl(var(--border));
}

  body {
    background-color: hsl(var(--background));
    color: hsl(var(--foreground));
}
*, ::before, ::after {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x:  ;
    --tw-pan-y:  ;
    --tw-pinch-zoom:  ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position:  ;
    --tw-gradient-via-position:  ;
    --tw-gradient-to-position:  ;
    --tw-ordinal:  ;
    --tw-slashed-zero:  ;
    --tw-numeric-figure:  ;
    --tw-numeric-spacing:  ;
    --tw-numeric-fraction:  ;
    --tw-ring-inset:  ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur:  ;
    --tw-brightness:  ;
    --tw-contrast:  ;
    --tw-grayscale:  ;
    --tw-hue-rotate:  ;
    --tw-invert:  ;
    --tw-saturate:  ;
    --tw-sepia:  ;
    --tw-drop-shadow:  ;
    --tw-backdrop-blur:  ;
    --tw-backdrop-brightness:  ;
    --tw-backdrop-contrast:  ;
    --tw-backdrop-grayscale:  ;
    --tw-backdrop-hue-rotate:  ;
    --tw-backdrop-invert:  ;
    --tw-backdrop-opacity:  ;
    --tw-backdrop-saturate:  ;
    --tw-backdrop-sepia:  ;
    --tw-contain-size:  ;
    --tw-contain-layout:  ;
    --tw-contain-paint:  ;
    --tw-contain-style:  ;
}
::backdrop {
    --tw-border-spacing-x: 0;
    --tw-border-spacing-y: 0;
    --tw-translate-x: 0;
    --tw-translate-y: 0;
    --tw-rotate: 0;
    --tw-skew-x: 0;
    --tw-skew-y: 0;
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    --tw-pan-x:  ;
    --tw-pan-y:  ;
    --tw-pinch-zoom:  ;
    --tw-scroll-snap-strictness: proximity;
    --tw-gradient-from-position:  ;
    --tw-gradient-via-position:  ;
    --tw-gradient-to-position:  ;
    --tw-ordinal:  ;
    --tw-slashed-zero:  ;
    --tw-numeric-figure:  ;
    --tw-numeric-spacing:  ;
    --tw-numeric-fraction:  ;
    --tw-ring-inset:  ;
    --tw-ring-offset-width: 0px;
    --tw-ring-offset-color: #fff;
    --tw-ring-color: rgb(59 130 246 / 0.5);
    --tw-ring-offset-shadow: 0 0 #0000;
    --tw-ring-shadow: 0 0 #0000;
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    --tw-blur:  ;
    --tw-brightness:  ;
    --tw-contrast:  ;
    --tw-grayscale:  ;
    --tw-hue-rotate:  ;
    --tw-invert:  ;
    --tw-saturate:  ;
    --tw-sepia:  ;
    --tw-drop-shadow:  ;
    --tw-backdrop-blur:  ;
    --tw-backdrop-brightness:  ;
    --tw-backdrop-contrast:  ;
    --tw-backdrop-grayscale:  ;
    --tw-backdrop-hue-rotate:  ;
    --tw-backdrop-invert:  ;
    --tw-backdrop-opacity:  ;
    --tw-backdrop-saturate:  ;
    --tw-backdrop-sepia:  ;
    --tw-contain-size:  ;
    --tw-contain-layout:  ;
    --tw-contain-paint:  ;
    --tw-contain-style:  ;
}
.pr-absolute {
    position: absolute;
}
.pr-relative {
    position: relative;
}
.pr-left-2 {
    left: 0.5rem;
}
.pr-right-3 {
    right: 0.75rem;
}
.pr-top-1\\/2 {
    top: 50%;
}
.pr-z-50 {
    z-index: 50;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-box-border {
    box-sizing: border-box;
}
.pr-inline-block {
    display: inline-block;
}
.pr-flex {
    display: flex;
}
.pr-inline-flex {
    display: inline-flex;
}
.pr-inline-grid {
    display: inline-grid;
}
.pr-hidden {
    display: none;
}
.pr-h-10 {
    height: 2.5rem;
}
.pr-h-11 {
    height: 2.75rem;
}
.pr-h-2 {
    height: 0.5rem;
}
.pr-h-3 {
    height: 0.75rem;
}
.pr-h-3\\.5 {
    height: 0.875rem;
}
.pr-h-4 {
    height: 1rem;
}
.pr-h-9 {
    height: 2.25rem;
}
.pr-h-px {
    height: 1px;
}
.pr-w-10 {
    width: 2.5rem;
}
.pr-w-2 {
    width: 0.5rem;
}
.pr-w-3 {
    width: 0.75rem;
}
.pr-w-3\\.5 {
    width: 0.875rem;
}
.pr-w-4 {
    width: 1rem;
}
.pr-min-w-\\[8rem\\] {
    min-width: 8rem;
}
.pr--translate-y-1\\/2 {
    --tw-translate-y: -50%;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-transform {
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-cursor-default {
    cursor: default;
}
.pr-cursor-pointer {
    cursor: pointer;
}
.pr-select-none {
    user-select: none;
}
.pr-flex-wrap {
    flex-wrap: wrap;
}
.pr-place-items-center {
    place-items: center;
}
.pr-items-start {
    align-items: flex-start;
}
.pr-items-center {
    align-items: center;
}
.pr-justify-start {
    justify-content: flex-start;
}
.pr-justify-end {
    justify-content: flex-end;
}
.pr-justify-center {
    justify-content: center;
}
.pr-justify-between {
    justify-content: space-between;
}
.pr-gap-1 {
    gap: 0.25rem;
}
.pr-gap-1\\.5 {
    gap: 0.375rem;
}
.pr-gap-2 {
    gap: 0.5rem;
}
.pr-gap-2\\.5 {
    gap: 0.625rem;
}
.pr-self-stretch {
    align-self: stretch;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-overflow-y-auto {
    overflow-y: auto;
}
.pr-whitespace-nowrap {
    white-space: nowrap;
}
.pr-rounded-lg {
    border-radius: var(--radius);
}
.pr-rounded-md {
    border-radius: calc(var(--radius) - 2px);
}
.pr-rounded-sm {
    border-radius: calc(var(--radius) - 4px);
}
.pr-border {
    border-width: 1px;
}
.pr-border-b-0 {
    border-bottom-width: 0px;
}
.pr-border-l-2 {
    border-left-width: 2px;
}
.pr-border-r-0 {
    border-right-width: 0px;
}
.pr-border-t-0 {
    border-top-width: 0px;
}
.pr-border-solid {
    border-style: solid;
}
.pr-border-black {
    --tw-border-opacity: 1;
    border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-input {
    border-color: hsl(var(--input));
}
.pr-border-red-600 {
    --tw-border-opacity: 1;
    border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.pr-border-l-indigo-200 {
    --tw-border-opacity: 1;
    border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.pr-border-l-purple-200 {
    --tw-border-opacity: 1;
    border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.pr-border-l-red-200 {
    --tw-border-opacity: 1;
    border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.pr-bg-amber-100 {
    --tw-bg-opacity: 1;
    background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.pr-bg-amber-200 {
    --tw-bg-opacity: 1;
    background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.pr-bg-amber-50 {
    --tw-bg-opacity: 1;
    background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.pr-bg-background {
    background-color: hsl(var(--background));
}
.pr-bg-destructive {
    background-color: hsl(var(--destructive));
}
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
}
.pr-bg-primary {
    background-color: hsl(var(--primary));
}
.pr-bg-secondary {
    background-color: hsl(var(--secondary));
}
.pr-bg-white {
    --tw-bg-opacity: 1;
    background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.pr-fill-current {
    fill: currentColor;
}
.pr-p-1 {
    padding: 0.25rem;
}
.pr-p-2 {
    padding: 0.5rem;
}
.pr-px-2 {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
}
.pr-px-3 {
    padding-left: 0.75rem;
    padding-right: 0.75rem;
}
.pr-px-4 {
    padding-left: 1rem;
    padding-right: 1rem;
}
.pr-px-8 {
    padding-left: 2rem;
    padding-right: 2rem;
}
.pr-py-1 {
    padding-top: 0.25rem;
    padding-bottom: 0.25rem;
}
.pr-py-1\\.5 {
    padding-top: 0.375rem;
    padding-bottom: 0.375rem;
}
.pr-py-2 {
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
}
.pr-pl-4 {
    padding-left: 1rem;
}
.pr-pl-8 {
    padding-left: 2rem;
}
.pr-pr-2 {
    padding-right: 0.5rem;
}
.pr-pr-3 {
    padding-right: 0.75rem;
}
.pr-align-middle {
    vertical-align: middle;
}
.pr-text-sm {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.pr-text-xs {
    font-size: 0.75rem;
    line-height: 1rem;
}
.pr-font-bold {
    font-weight: 700;
}
.pr-font-medium {
    font-weight: 500;
}
.pr-font-normal {
    font-weight: 400;
}
.pr-font-semibold {
    font-weight: 600;
}
.pr-leading-none {
    line-height: 1;
}
.pr-tracking-widest {
    letter-spacing: 0.1em;
}
.pr-text-amber-800 {
    --tw-text-opacity: 1;
    color: rgb(146 64 14 / var(--tw-text-opacity));
}
.pr-text-amber-900 {
    --tw-text-opacity: 1;
    color: rgb(120 53 15 / var(--tw-text-opacity));
}
.pr-text-destructive-foreground {
    color: hsl(var(--destructive-foreground));
}
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
}
.pr-text-primary {
    color: hsl(var(--primary));
}
.pr-text-primary-foreground {
    color: hsl(var(--primary-foreground));
}
.pr-text-red-600 {
    --tw-text-opacity: 1;
    color: rgb(220 38 38 / var(--tw-text-opacity));
}
.pr-text-secondary-foreground {
    color: hsl(var(--secondary-foreground));
}
.pr-text-slate-700 {
    --tw-text-opacity: 1;
    color: rgb(51 65 85 / var(--tw-text-opacity));
}
.pr-text-slate-900 {
    --tw-text-opacity: 1;
    color: rgb(15 23 42 / var(--tw-text-opacity));
}
.pr-text-yellow-900 {
    --tw-text-opacity: 1;
    color: rgb(113 63 18 / var(--tw-text-opacity));
}
.pr-underline-offset-4 {
    text-underline-offset: 4px;
}
.pr-opacity-60 {
    opacity: 0.6;
}
.pr-shadow-lg {
    --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-md {
    --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-shadow-none {
    --tw-shadow: 0 0 #0000;
    --tw-shadow-colored: 0 0 #0000;
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.pr-ring-offset-background {
    --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition-colors {
    transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
}
@keyframes enter {
    from {
        opacity: var(--tw-enter-opacity, 1);
        transform: translate3d(var(--tw-enter-translate-x, 0), var(--tw-enter-translate-y, 0), 0) scale3d(var(--tw-enter-scale, 1), var(--tw-enter-scale, 1), var(--tw-enter-scale, 1)) rotate(var(--tw-enter-rotate, 0));
    }
}
@keyframes exit {
    to {
        opacity: var(--tw-exit-opacity, 1);
        transform: translate3d(var(--tw-exit-translate-x, 0), var(--tw-exit-translate-y, 0), 0) scale3d(var(--tw-exit-scale, 1), var(--tw-exit-scale, 1), var(--tw-exit-scale, 1)) rotate(var(--tw-exit-rotate, 0));
    }
}
.file\\:pr-border-0::file-selector-button {
    border-width: 0px;
}
.file\\:pr-bg-transparent::file-selector-button {
    background-color: transparent;
}
.file\\:pr-text-sm::file-selector-button {
    font-size: 0.875rem;
    line-height: 1.25rem;
}
.file\\:pr-font-medium::file-selector-button {
    font-weight: 500;
}
.placeholder\\:pr-text-muted-foreground::placeholder {
    color: hsl(var(--muted-foreground));
}
.hover\\:pr-bg-accent:hover {
    background-color: hsl(var(--accent));
}
.hover\\:pr-bg-destructive\\/90:hover {
    background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:pr-bg-primary\\/90:hover {
    background-color: hsl(var(--primary) / 0.9);
}
.hover\\:pr-bg-secondary\\/80:hover {
    background-color: hsl(var(--secondary) / 0.8);
}
.hover\\:pr-text-accent-foreground:hover {
    color: hsl(var(--accent-foreground));
}
.hover\\:pr-underline:hover {
    text-decoration-line: underline;
}
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
}
.focus-visible\\:pr-outline-none:focus-visible {
    outline: 2px solid transparent;
    outline-offset: 2px;
}
.focus-visible\\:pr-ring-2:focus-visible {
    --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
    --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
    box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus-visible\\:pr-ring-ring:focus-visible {
    --tw-ring-color: hsl(var(--ring));
}
.focus-visible\\:pr-ring-offset-2:focus-visible {
    --tw-ring-offset-width: 2px;
}
.disabled\\:pr-pointer-events-none:disabled {
    pointer-events: none;
}
.disabled\\:pr-cursor-not-allowed:disabled {
    cursor: not-allowed;
}
.disabled\\:pr-opacity-50:disabled {
    opacity: 0.5;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
    cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
    opacity: 0.7;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
    pointer-events: none;
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
    --tw-bg-opacity: 1;
    background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
    opacity: 0.5;
}
.data-\\[state\\=open\\]\\:pr-animate-in[data-state=open] {
    animation-name: enter;
    animation-duration: 150ms;
    --tw-enter-opacity: initial;
    --tw-enter-scale: initial;
    --tw-enter-rotate: initial;
    --tw-enter-translate-x: initial;
    --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-animate-out[data-state=closed] {
    animation-name: exit;
    animation-duration: 150ms;
    --tw-exit-opacity: initial;
    --tw-exit-scale: initial;
    --tw-exit-rotate: initial;
    --tw-exit-translate-x: initial;
    --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-fade-out-0[data-state=closed] {
    --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:pr-fade-in-0[data-state=open] {
    --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:pr-zoom-out-95[data-state=closed] {
    --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:pr-zoom-in-95[data-state=open] {
    --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:pr-slide-in-from-top-2[data-side=bottom] {
    --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:pr-slide-in-from-right-2[data-side=left] {
    --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:pr-slide-in-from-left-2[data-side=right] {
    --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:pr-slide-in-from-bottom-2[data-side=top] {
    --tw-enter-translate-y: 0.5rem;
}
@layer rdg {
  @layer Defaults,
    FocusSink,
    CheckboxInput,
    CheckboxIcon,
    CheckboxLabel,
    Cell,
    HeaderCell,
    SummaryCell,
    EditCell,
    Row,
    HeaderRow,
    SummaryRow,
    GroupedRow,
    Root;
}

.mlln6zg7-0-0-beta-42 {
  @layer rdg.MeasuringCell {
    contain: strict;
    grid-row: 1;
    visibility: hidden;
  }
}


.cj343x07-0-0-beta-42 {
  @layer rdg.Cell {
    /* max-content does not work with size containment
     * dynamically switching between different containment styles incurs a heavy relayout penalty
     * Chromium bug: at odd zoom levels or subpixel positioning,
     * layout/paint/style containment can make cell borders disappear
     *   https://bugs.chromium.org/p/chromium/issues/detail?id=1326946
     */
    position: relative; /* needed for absolute positioning to work */
    padding-block: 0;
    padding-inline: 8px;
    border-inline-end: 1px solid var(--rdg-border-color);
    border-block-end: 1px solid var(--rdg-border-color);
    grid-row-start: var(--rdg-grid-row-start);
    background-color: inherit;

    white-space: nowrap;
    overflow: clip;
    text-overflow: ellipsis;
    outline: none;

    &[aria-selected='true'] {
      outline: 2px solid var(--rdg-selection-color);
      outline-offset: -2px;
    }
  }
}

.csofj7r7-0-0-beta-42 {
  @layer rdg.Cell {
    position: sticky;
    /* Should have a higher value than 0 to show up above unfrozen cells */
    z-index: 1;
  }
}

.ch2wcw87-0-0-beta-42 {
  @layer rdg.Cell {
    box-shadow: calc(2px * var(--rdg-sign)) 0 5px -2px rgba(136, 136, 136, 0.3);
  }
}


.c1bn88vv7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    inset: 0;
    margin-inline-end: 1px; /* align checkbox in row group cell */
  }
}

.c1qt073l7-0-0-beta-42 {
  @layer rdg.CheckboxInput {
    all: unset;
  }
}

.cf71kmq7-0-0-beta-42 {
  @layer rdg.CheckboxIcon {
    content: '';
    inline-size: 20px;
    block-size: 20px;
    border: 2px solid var(--rdg-border-color);
    background-color: var(--rdg-background-color);

    .c1qt073l7-0-0-beta-42:checked + & {
      background-color: var(--rdg-checkbox-color);
      outline: 4px solid var(--rdg-background-color);
      outline-offset: -6px;
    }

    .c1qt073l7-0-0-beta-42:focus + & {
      border-color: var(--rdg-checkbox-focus-color);
    }
  }
}

.c1lwve4p7-0-0-beta-42 {
  @layer rdg.CheckboxLabel {
    cursor: default;

    .cf71kmq7-0-0-beta-42 {
      border-color: var(--rdg-checkbox-disabled-border-color);
      background-color: var(--rdg-checkbox-disabled-background-color);
    }
  }
}


.g1s9ylgp7-0-0-beta-42 {
  @layer rdg.GroupCellContent {
    outline: none;
  }
}

.cz54e4y7-0-0-beta-42 {
  @layer rdg.GroupCellCaret {
    margin-inline-start: 4px;
    stroke: currentColor;
    stroke-width: 1.5px;
    fill: transparent;
    vertical-align: middle;

    > path {
      transition: d 0.1s;
    }
  }
}


.c1w9bbhr7-0-0-beta-42 {
  @layer rdg.DragHandle {
    --rdg-drag-handle-size: 8px;
    z-index: 0;
    cursor: move;
    inline-size: var(--rdg-drag-handle-size);
    block-size: var(--rdg-drag-handle-size);
    background-color: var(--rdg-selection-color);
    place-self: end;

    &:hover {
      --rdg-drag-handle-size: 16px;
      border: 2px solid var(--rdg-selection-color);
      background-color: var(--rdg-background-color);
    }
  }
}

.c1creorc7-0-0-beta-42 {
  @layer rdg.DragHandle {
    z-index: 1;
    position: sticky;
  }
}


.cis5rrm7-0-0-beta-42 {
  @layer rdg.EditCell {
    padding: 0;
  }
}


.h44jtk67-0-0-beta-42 {
  @layer rdg.SortableHeaderCell {
    display: flex;
  }
}

.hcgkhxz7-0-0-beta-42 {
  @layer rdg.SortableHeaderCellName {
    flex-grow: 1;
    overflow: clip;
    text-overflow: ellipsis;
  }
}


.c6l2wv17-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: pointer;
  }
}

.c1kqdw7y7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    touch-action: none;
  }
}

.r1y6ywlx7-0-0-beta-42 {
  @layer rdg.HeaderCell {
    cursor: col-resize;
    position: absolute;
    inset-block-start: 0;
    inset-inline-end: 0;
    inset-block-end: 0;
    inline-size: 10px;
  }
}

.c1bezg5o7-0-0-beta-42 {
  opacity: 0.5;
}

.c1vc96037-0-0-beta-42 {
  background-color: var(--rdg-header-draggable-background-color);
}


.r1upfr807-0-0-beta-42 {
  @layer rdg.Row {
    display: contents;
    line-height: var(--rdg-row-height);
    background-color: var(--rdg-background-color);

    &:hover {
      background-color: var(--rdg-row-hover-background-color);
    }

    &[aria-selected='true'] {
      background-color: var(--rdg-row-selected-background-color);

      &:hover {
        background-color: var(--rdg-row-selected-hover-background-color);
      }
    }
  }
}

.r190mhd37-0-0-beta-42 {
  @layer rdg.FocusSink {
    outline: 2px solid var(--rdg-selection-color);
    outline-offset: -2px;
  }
}

.r139qu9m7-0-0-beta-42 {
  @layer rdg.FocusSink {
    &::before {
      content: '';
      display: inline-block;
      height: 100%;
      position: sticky;
      inset-inline-start: 0;
      border-inline-start: 2px solid var(--rdg-selection-color);
    }
  }
}


.h10tskcx7-0-0-beta-42 {
  @layer rdg.HeaderRow {
    display: contents;
    line-height: var(--rdg-header-row-height);
    background-color: var(--rdg-header-background-color);
    font-weight: bold;

    & > .cj343x07-0-0-beta-42 {
      /* Should have a higher value than 1 to show up above regular cells and the focus sink */
      z-index: 2;
      position: sticky;
    }

    & > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}


.c6ra8a37-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;
  }
}

.cq910m07-0-0-beta-42 {
  @layer rdg.Cell {
    background-color: #ccccff;

    &.c6ra8a37-0-0-beta-42 {
      background-color: #9999ff;
    }
  }
}


.a3ejtar7-0-0-beta-42 {
  @layer rdg.SortIcon {
    fill: currentColor;

    > path {
      transition: d 0.1s;
    }
  }
}


.rnvodz57-0-0-beta-42 {
  @layer rdg.Defaults {
    *,
    *::before,
    *::after {
      box-sizing: inherit;
    }
  }

  @layer rdg.Root {
    --rdg-color: #000;   --rdg-border-color: #ddd;   --rdg-summary-border-color: #aaa;   --rdg-background-color: hsl(0deg 0% 100%);   --rdg-header-background-color: hsl(0deg 0% 97.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 90.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 96%);   --rdg-row-selected-background-color: hsl(207deg 76% 92%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 88%);   --rdg-checkbox-color: hsl(207deg 100% 29%);   --rdg-checkbox-focus-color: hsl(207deg 100% 69%);   --rdg-checkbox-disabled-border-color: #ccc;   --rdg-checkbox-disabled-background-color: #ddd;
    --rdg-selection-color: #66afe9;
    --rdg-font-size: 14px;

    display: grid;

    color-scheme: var(--rdg-color-scheme, light dark);

    /* https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Positioning/Understanding_z_index/The_stacking_context */
    /* We set a stacking context so internal elements don't render on top of external elements. */
    /* size containment is not used as it could break "width: min-content" for example, and the grid would infinitely resize on Chromium browsers */
    contain: content;
    content-visibility: auto;
    block-size: 350px;
    border: 1px solid var(--rdg-border-color);
    box-sizing: border-box;
    overflow: auto;
    background-color: var(--rdg-background-color);
    color: var(--rdg-color);
    font-size: var(--rdg-font-size);

    /* needed on Firefox to fix scrollbars */
    &::before {
      content: '';
      grid-column: 1/-1;
      grid-row: 1/-1;
    }

    &.rdg-dark {
      --rdg-color-scheme: dark;
      --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
    }

    &.rdg-light {
      --rdg-color-scheme: light;
    }

    @media (prefers-color-scheme: dark) {
      &:not(.rdg-light) {
        --rdg-color: #ddd;   --rdg-border-color: #444;   --rdg-summary-border-color: #555;   --rdg-background-color: hsl(0deg 0% 13%);   --rdg-header-background-color: hsl(0deg 0% 10.5%);   --rdg-header-draggable-background-color: hsl(0deg 0% 17.5%);   --rdg-row-hover-background-color: hsl(0deg 0% 9%);   --rdg-row-selected-background-color: hsl(207deg 76% 42%);   --rdg-row-selected-hover-background-color: hsl(207deg 76% 38%);   --rdg-checkbox-color: hsl(207deg 100% 79%);   --rdg-checkbox-focus-color: hsl(207deg 100% 89%);   --rdg-checkbox-disabled-border-color: #000;   --rdg-checkbox-disabled-background-color: #333;
      }
    }
  }
}

.vlqv91k7-0-0-beta-42 {
  @layer rdg.Root {
    user-select: none;

    & .r1upfr807-0-0-beta-42 {
      cursor: move;
    }
  }
}

.f1lsfrzw7-0-0-beta-42 {
  @layer rdg.FocusSink {
    grid-column: 1/-1;
    pointer-events: none;
    /* Should have a higher value than 1 to show up above regular frozen cells */
    z-index: 1;
  }
}

.f1cte0lg7-0-0-beta-42 {
  @layer rdg.FocusSink {
    /* Should have a higher value than 3 to show up above header and summary rows */
    z-index: 3;
  }
}


.s8wc6fl7-0-0-beta-42 {
  @layer rdg.SummaryCell {
    inset-block-start: var(--rdg-summary-row-top);
    inset-block-end: var(--rdg-summary-row-bottom);
  }
}


.skuhp557-0-0-beta-42 {
  @layer rdg.SummaryRow {
    line-height: var(--rdg-summary-row-height);

    > .cj343x07-0-0-beta-42 {
      position: sticky;
    }
  }
}

.tf8l5ub7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      z-index: 2;
    }

    > .csofj7r7-0-0-beta-42 {
      z-index: 3;
    }
  }
}

.tb9ughf7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-end: 2px solid var(--rdg-summary-border-color);
    }
  }
}

.b1yssfnt7-0-0-beta-42 {
  @layer rdg.SummaryRow {
    > .cj343x07-0-0-beta-42 {
      border-block-start: 2px solid var(--rdg-summary-border-color);
    }
  }
}


.g1yxluv37-0-0-beta-42 {
  @layer rdg.GroupedRow {
    &:not([aria-selected='true']) {
      background-color: var(--rdg-header-background-color);
    }

    > .cj343x07-0-0-beta-42:not(:last-child):not(.ch2wcw87-0-0-beta-42) {
      border-inline-end: none;
    }
  }
}


.t7vyx3i7-0-0-beta-42 {
  @layer rdg.TextEditor {
    appearance: none;

    box-sizing: border-box;
    inline-size: 100%;
    block-size: 100%;
    padding-block: 0;
    padding-inline: 6px;
    border: 2px solid #ccc;
    vertical-align: top;
    color: var(--rdg-color);
    background-color: var(--rdg-background-color);

    font-family: inherit;
    font-size: var(--rdg-font-size);

    &:focus {
      border-color: var(--rdg-selection-color);
      outline: none;
    }

    &::placeholder {
      color: #999;
      opacity: 1;
    }
  }
}

`, "top");
export {
  mm as BookChapterControl,
  kt as Button,
  gm as ChapterRangeSelector,
  Hl as Checkbox,
  Ir as ComboBox,
  bm as ContextMenu,
  Jf as GridMenu,
  Hh as HamburgerMenuButton,
  vm as IconButton,
  Mt as LabelPosition,
  Ka as MenuItem,
  ym as RefSelector,
  wm as ResultsSource,
  xm as ScriptureRefKeyedList,
  Em as SearchBar,
  Tm as Slider,
  km as Snackbar,
  Om as Switch,
  Sm as Table,
  qn as TextField,
  Cm as Toolbar,
  Nm as useEvent,
  Pm as useEventAsync,
  Wr as usePromise
};
//# sourceMappingURL=index.js.map
