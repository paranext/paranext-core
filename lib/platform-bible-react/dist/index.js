var vl = Object.defineProperty;
var bl = (e, t, n) => t in e ? vl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var $t = (e, t, n) => (bl(e, typeof t != "symbol" ? t + "" : t, n), n);
import yl, { jsxs as oe, jsx as w, Fragment as sr } from "react/jsx-runtime";
import * as S from "react";
import he, { forwardRef as cs, useCallback as Re, useState as Ee, useRef as St, useEffect as ft, useLayoutEffect as oi, useMemo as Kt } from "react";
import { getChaptersForBook as ds, offsetBook as ii, FIRST_SCR_BOOK_NUM as wl, offsetChapter as si, FIRST_SCR_CHAPTER_NUM as xl, offsetVerse as ai, FIRST_SCR_VERSE_NUM as El, compare as Xr, format as Cr } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Sl, Check as ps, Circle as Cl, History as Rl, ArrowDownWideNarrow as kl, Clock as Tl, Bookmark as Ol, ChevronDown as fs, ChevronUp as Nl } from "lucide-react";
import ke, { clsx as Pl } from "clsx";
import { twMerge as $l } from "tailwind-merge";
import { Slot as _l } from "@radix-ui/react-slot";
import { cva as gs } from "class-variance-authority";
import { Autocomplete as Ml, TextField as Il, FormControlLabel as li, FormLabel as Al, Checkbox as Dl, MenuItem as Fl, ListItemText as Vl, ListItemIcon as ms, Menu as Ll, Grid as hs, List as Bl, IconButton as vs, Drawer as jl, Paper as zl, Slider as Hl, Snackbar as Gl, Switch as Ul, AppBar as ql, Toolbar as Wl } from "@mui/material";
import Xl, { ThemeContext as Yl, internal_processStyles as Kl } from "@mui/styled-engine";
import * as Jl from "react-dom";
import Dn from "react-dom";
import * as bs from "@radix-ui/react-label";
import * as ye from "@radix-ui/react-select";
import Zl, { SelectColumn as Ql } from "react-data-grid";
import * as Ie from "@radix-ui/react-tabs";
var eu = Object.defineProperty, tu = (e, t, n) => t in e ? eu(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, re = (e, t, n) => (tu(e, typeof t != "symbol" ? t + "" : t, n), n);
const Rt = [
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
], mo = [
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
], ys = [
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
], ui = du();
function Jt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ui ? ui[e] : 0;
}
function ho(e) {
  return Jt(e) > 0;
}
function nu(e) {
  const t = typeof e == "string" ? Jt(e) : e;
  return t >= 40 && t <= 66;
}
function ru(e) {
  return (typeof e == "string" ? Jt(e) : e) <= 39;
}
function ws(e) {
  return e <= 66;
}
function ou(e) {
  const t = typeof e == "string" ? Jt(e) : e;
  return Ss(t) && !ws(t);
}
function* iu() {
  for (let e = 1; e <= Rt.length; e++)
    yield e;
}
const su = 1, xs = Rt.length;
function au() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function vo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Rt.length ? t : Rt[n];
}
function Es(e) {
  return e <= 0 || e > xs ? "******" : ys[e - 1];
}
function lu(e) {
  return Es(Jt(e));
}
function Ss(e) {
  const t = typeof e == "number" ? vo(e) : e;
  return ho(t) && !mo.includes(t);
}
function uu(e) {
  const t = typeof e == "number" ? vo(e) : e;
  return ho(t) && mo.includes(t);
}
function cu(e) {
  return ys[e - 1].includes("*obsolete*");
}
function du() {
  const e = {};
  for (let t = 0; t < Rt.length; t++)
    e[Rt[t]] = t + 1;
  return e;
}
const le = {
  allBookIds: Rt,
  nonCanonicalIds: mo,
  bookIdToNumber: Jt,
  isBookIdValid: ho,
  isBookNT: nu,
  isBookOT: ru,
  isBookOTNT: ws,
  isBookDC: ou,
  allBookNumbers: iu,
  firstBook: su,
  lastBook: xs,
  extraBooks: au,
  bookNumberToId: vo,
  bookNumberToEnglishName: Es,
  bookIdToEnglishName: lu,
  isCanonical: Ss,
  isExtraMaterial: uu,
  isObsolete: cu
};
var ct = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ct || {});
const Fe = class {
  // private versInfo: Versification;
  constructor(t) {
    if (re(this, "name"), re(this, "fullPath"), re(this, "isPresent"), re(this, "hasVerseSegments"), re(this, "isCustomized"), re(this, "baseVersification"), re(this, "scriptureBooks"), re(this, "_type"), t != null)
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
re(Fe, "Original", new Fe(ct.Original)), re(Fe, "Septuagint", new Fe(ct.Septuagint)), re(Fe, "Vulgate", new Fe(ct.Vulgate)), re(Fe, "English", new Fe(ct.English)), re(Fe, "RussianProtestant", new Fe(ct.RussianProtestant)), re(Fe, "RussianOrthodox", new Fe(ct.RussianOrthodox));
let Lt = Fe;
function ci(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Cs = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Cs || {});
const $e = class ae {
  constructor(t, n, r, o) {
    if (re(this, "firstChapter"), re(this, "lastChapter"), re(this, "lastVerse"), re(this, "hasSegmentsDefined"), re(this, "text"), re(this, "BBBCCCVVVS"), re(this, "longHashCode"), re(this, "versification"), re(this, "rtlMark", "‏"), re(this, "_bookNum", 0), re(this, "_chapterNum", 0), re(this, "_verseNum", 0), re(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Lt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Lt ? n : void 0;
        this.setEmpty(i), this._verseNum = t % ae.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ae.bookDigitShifter / ae.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ae.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof ae) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof Lt ? t : ae.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ae.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, n = ae.defaultVersification) {
    const r = new ae(n);
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
      return n = ae.parse(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof on)
        return n = new ae(), { success: !1, verseRef: n };
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
    return t % ae.bcvMaxValue * ae.bookDigitShifter + (n >= 0 ? n % ae.bcvMaxValue * ae.chapterDigitShifter : 0) + (r >= 0 ? r % ae.bcvMaxValue : 0);
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
      if (n = n * 10 + +r - +"0", n > ae.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ae.verseRangeSeparator) || this._verse.includes(ae.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return le.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = le.bookIdToNumber(t);
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
    const { success: n, vNum: r } = ae.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ae.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > le.lastBook)
      throw new on(
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
    this.versification = this.versification != null ? new Lt(t) : void 0;
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
    return this.validateVerse(ae.verseRangeSeparators, ae.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ae.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ae.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Lt(ct[s]);
        } catch {
          throw new on("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new on("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || le.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ae.isVerseParseable(r[1]))
      throw new on("Invalid reference : " + t);
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
    return new ae(this);
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
    return t instanceof ae ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && t.versification != null && this.versification != null && t.versification.equals(this.versification) : !1;
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
  allVerses(t = !1, n = ae.verseRangeSeparators, r = ae.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = ci(this._verse, r);
    for (const s of i.map((a) => ci(a, n))) {
      const a = this.clone();
      a.verse = s[0];
      const l = a.verseNum;
      if (o.push(a), s.length > 1) {
        const d = this.clone();
        if (d.verse = s[1], !t)
          for (let c = l + 1; c < d.verseNum; c++) {
            const p = new ae(
              this._bookNum,
              this._chapterNum,
              c,
              this.versification
            );
            this.isExcluded || o.push(p);
          }
        o.push(d);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > le.lastBook ? 2 : (le.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ae.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = le.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
re($e, "defaultVersification", Lt.English), re($e, "verseRangeSeparator", "-"), re($e, "verseSequenceIndicator", ","), re($e, "verseRangeSeparators", [$e.verseRangeSeparator]), re($e, "verseSequenceIndicators", [$e.verseSequenceIndicator]), re($e, "chapterDigitShifter", 1e3), re($e, "bookDigitShifter", $e.chapterDigitShifter * $e.chapterDigitShifter), re($e, "bcvMaxValue", $e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
re($e, "ValidStatusType", Cs);
class on extends Error {
}
function te(...e) {
  return $l(Pl(e));
}
const pu = ge.Root, fu = ge.Trigger, nv = ge.Group, rv = ge.Portal, ov = ge.Sub, iv = ge.RadioGroup, gu = he.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ oe(
  ge.SubTrigger,
  {
    ref: o,
    className: te(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ w(Sl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
gu.displayName = ge.SubTrigger.displayName;
const mu = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ge.SubContent,
  {
    ref: n,
    className: te(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
mu.displayName = ge.SubContent.displayName;
const Rs = he.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ w(ge.Portal, { children: /* @__PURE__ */ w(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: te(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Rs.displayName = ge.Content.displayName;
const ks = he.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ w(
  ge.Item,
  {
    ref: r,
    className: te(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
ks.displayName = ge.Item.displayName;
const hu = he.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ oe(
  ge.CheckboxItem,
  {
    ref: o,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(ge.ItemIndicator, { children: /* @__PURE__ */ w(ps, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
hu.displayName = ge.CheckboxItem.displayName;
const vu = he.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ oe(
  ge.RadioItem,
  {
    ref: r,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(ge.ItemIndicator, { children: /* @__PURE__ */ w(Cl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
vu.displayName = ge.RadioItem.displayName;
const bo = he.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ w(
  ge.Label,
  {
    ref: r,
    className: te("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
bo.displayName = ge.Label.displayName;
const Ts = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ge.Separator,
  {
    ref: n,
    className: te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ts.displayName = ge.Separator.displayName;
function bu({ className: e, ...t }) {
  return /* @__PURE__ */ w(
    "span",
    {
      className: te("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
bu.displayName = "DropdownMenuShortcut";
const yo = he.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ w(
    "input",
    {
      type: t,
      className: te(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
yo.displayName = "Input";
const yu = cs(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ oe("div", { className: "pr-relative", children: [
    /* @__PURE__ */ w(
      yo,
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
    /* @__PURE__ */ w(
      Rl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function wu({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (a, l) => l + 1), s = Re(
    (a) => {
      o(a);
    },
    [o]
  );
  return /* @__PURE__ */ w("div", { className: te("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((a) => /* @__PURE__ */ w(
    "div",
    {
      className: te(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": a === n,
          "pr-bg-amber-200": a === r
        }
      ),
      onClick: (l) => {
        l.preventDefault(), l.stopPropagation(), e(a);
      },
      role: "button",
      onKeyDown: (l) => {
        l.key === "Enter" && e(a);
      },
      tabIndex: 0,
      onMouseMove: () => s(a),
      children: a
    },
    a
  )) });
}
const xu = cs(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, a) => /* @__PURE__ */ oe(
    ks,
    {
      ref: a,
      textValue: e,
      className: te("pr-font-normal pr-text-slate-700", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": n
      }),
      onSelect: (l) => {
        l.preventDefault(), t();
      },
      onKeyDown: (l) => {
        o(l);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ w(
          "span",
          {
            className: te(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: le.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ w("div", { children: s })
      ]
    },
    e
  )
);
function Eu({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ oe(bo, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ w("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ oe("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ w(
        kl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ w(
        Tl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ w(
        Ol,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const hn = le.allBookIds, Su = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, di = ["OT", "NT", "DC"], Cu = 32 + 32 + 32, Ru = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], ku = (e) => ({
  OT: hn.filter((n) => le.isBookOT(n)),
  NT: hn.filter((n) => le.isBookNT(n)),
  DC: hn.filter((n) => le.isBookDC(n))
})[e], sn = (e) => ds(le.bookIdToNumber(e));
function Tu() {
  return hn.map((t) => le.bookIdToEnglishName(t));
}
function Ou(e) {
  return Tu().includes(e);
}
function Nu(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Ou(t))
    return hn.find((r) => le.bookIdToEnglishName(r) === t);
}
function sv({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ee(""), [o, i] = Ee(
    le.bookNumberToId(e.bookNum)
  ), [s, a] = Ee(e.chapterNum ?? 0), [l, d] = Ee(
    le.bookNumberToId(e.bookNum)
  ), [c, p] = Ee(!1), [f, g] = Ee(c), h = St(void 0), m = St(void 0), v = St(void 0), y = Re(
    (N) => ku(N).filter((C) => {
      const k = le.bookIdToEnglishName(C).toLowerCase(), _ = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return k.includes(_) || // Match book name
      C.toLowerCase().includes(_);
    }),
    [n]
  ), $ = (N) => {
    r(N);
  }, x = St(!1), E = Re((N) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    p(N);
  }, []), b = Re(
    (N, C, k, _) => {
      if (a(
        le.bookNumberToId(e.bookNum) !== N ? 1 : e.chapterNum
      ), C || sn(N) === -1) {
        t({
          bookNum: le.bookIdToNumber(N),
          chapterNum: k || 1,
          verseNum: _ || 1
        }), p(!1), r("");
        return;
      }
      i(o !== N ? N : ""), p(!C);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), R = (N) => {
    N <= 0 || N > sn(o) || b(o, !0, N);
  }, P = Re(() => {
    Ru.forEach((N) => {
      const C = n.match(N);
      if (C) {
        const [k, _ = void 0, A = void 0] = C.slice(1), I = Nu(k);
        (le.isBookIdValid(k) || I) && b(
          I ?? k,
          !0,
          _ ? parseInt(_, 10) : 1,
          A ? parseInt(A, 10) : 1
        );
      }
    });
  }, [b, n]), D = Re(
    (N) => {
      c ? (N.key === "ArrowDown" || N.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null && m.current.focus(), N.preventDefault()) : p(!0);
    },
    [c]
  ), F = (N) => {
    const { key: C } = N;
    C === "ArrowRight" || C === "ArrowLeft" || C === "ArrowDown" || C === "ArrowUp" || C === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: C })), h.current.focus());
  }, B = (N) => {
    const { key: C } = N;
    if (l === o) {
      if (C === "Enter") {
        N.preventDefault(), b(o, !0, s);
        return;
      }
      let k = 0;
      if (C === "ArrowRight")
        if (s < sn(l))
          k = 1;
        else {
          N.preventDefault();
          return;
        }
      else if (C === "ArrowLeft")
        if (s > 1)
          k = -1;
        else {
          N.preventDefault();
          return;
        }
      else
        C === "ArrowDown" ? k = 6 : C === "ArrowUp" && (k = -6);
      s + k <= 0 || s + k > sn(l) ? a(0) : k !== 0 && (a(s + k), N.preventDefault());
    }
  };
  return ft(() => {
    o === l ? o === le.bookNumberToId(e.bookNum) ? a(e.chapterNum) : a(1) : a(0);
  }, [l, e.bookNum, e.chapterNum, o]), oi(() => {
    g(c);
  }, [c]), oi(() => {
    const N = setTimeout(() => {
      if (f && m.current && v.current) {
        const k = v.current.offsetTop - Cu;
        m.current.scrollTo({ top: k, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(N);
    };
  }, [f]), /* @__PURE__ */ w("div", { children: /* @__PURE__ */ oe(pu, { modal: !1, open: c, onOpenChange: E, children: [
    /* @__PURE__ */ w(fu, { asChild: !0, children: /* @__PURE__ */ w(
      yu,
      {
        ref: h,
        value: n,
        handleSearch: $,
        handleKeyDown: D,
        handleOnClick: () => {
          i(le.bookNumberToId(e.bookNum)), d(le.bookNumberToId(e.bookNum)), a(e.chapterNum > 0 ? e.chapterNum : 0), p(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: P,
        placeholder: `${le.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ oe(
      Rs,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: F,
        align: "start",
        ref: m,
        children: [
          /* @__PURE__ */ w(
            Eu,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          di.map(
            (N, C) => y(N).length > 0 && /* @__PURE__ */ oe("div", { children: [
              /* @__PURE__ */ w(bo, { className: "pr-font-semibold pr-text-slate-700", children: Su[N] }),
              y(N).map((k) => /* @__PURE__ */ w("div", { children: /* @__PURE__ */ w(
                xu,
                {
                  bookId: k,
                  handleSelectBook: () => b(k, !1),
                  isSelected: o === k,
                  handleHighlightBook: () => d(k),
                  handleKeyDown: B,
                  bookType: N,
                  ref: (_) => {
                    o === k && (v.current = _);
                  },
                  children: /* @__PURE__ */ w(
                    wu,
                    {
                      handleSelectChapter: R,
                      endChapter: sn(k),
                      activeChapter: e.bookNum === le.bookIdToNumber(k) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (_) => {
                        a(_);
                      }
                    }
                  )
                }
              ) }, k)),
              di.length - 1 !== C ? /* @__PURE__ */ w(Ts, {}) : void 0
            ] }, N)
          )
        ]
      }
    )
  ] }) });
}
const Pu = gs(
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
), Yn = he.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ w(r ? _l : "button", { className: te(Pu({ variant: t, size: n, className: e })), ref: i, ...o })
);
Yn.displayName = "Button";
function _t({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ w(
    Yn,
    {
      id: e,
      disabled: t,
      className: te("papi-button", n),
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function Yr({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: a = [],
  className: l,
  value: d,
  onChange: c,
  onFocus: p,
  onBlur: f,
  getOptionLabel: g
}) {
  return /* @__PURE__ */ w(
    Ml,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: a,
      className: `papi-combo-box ${o ? "error" : ""} ${l ?? ""}`,
      value: d,
      onChange: c,
      onFocus: p,
      onBlur: f,
      getOptionLabel: g,
      renderInput: (h) => /* @__PURE__ */ w(
        Il,
        {
          ...h,
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
function av({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = Ee(1), [s, a] = Ee(r), [l, d] = Ee(
    Array.from({ length: r }, (f, g) => g + 1)
  );
  ft(() => {
    i(1), e(1), a(r), t(r), d(Array.from({ length: r }, (f, g) => g + 1));
  }, [r, t, e]);
  const c = (f, g) => {
    i(g), e(g), g > s && (a(g), t(g));
  }, p = (f, g) => {
    a(g), t(g), g < o && (i(g), e(g));
  };
  return /* @__PURE__ */ oe(sr, { children: [
    /* @__PURE__ */ w(
      li,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ w(
          Yr,
          {
            onChange: (f, g) => c(f, g),
            className: "book-selection-chapter",
            isClearable: !1,
            options: l,
            getOptionLabel: (f) => f.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ w(
      li,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ w(
          Yr,
          {
            onChange: (f, g) => p(f, g),
            className: "book-selection-chapter",
            isClearable: !1,
            options: l,
            getOptionLabel: (f) => f.toString(),
            value: s,
            isDisabled: n
          },
          "end chapter"
        ),
        label: "to",
        labelPlacement: "start"
      }
    )
  ] });
}
var Bt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Bt || {});
function Os({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Bt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: a = !1,
  className: l,
  onChange: d
}) {
  const c = /* @__PURE__ */ w(
    Dl,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${a ? "error" : ""} ${l ?? ""}`,
      onChange: d
    }
  );
  let p;
  if (n) {
    const f = r === Bt.Before || r === Bt.Above, g = /* @__PURE__ */ w("span", { className: `papi-checkbox-label ${a ? "error" : ""} ${l ?? ""}`, children: n }), h = r === Bt.Before || r === Bt.After, m = h ? g : /* @__PURE__ */ w("div", { children: g }), v = h ? c : /* @__PURE__ */ w("div", { children: c });
    p = /* @__PURE__ */ oe(
      Al,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: a,
        children: [
          f && m,
          v,
          !f && m
        ]
      }
    );
  } else
    p = c;
  return p;
}
function lv({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ oe("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ w("legend", { children: n }),
    r.map((a) => /* @__PURE__ */ w(
      Os,
      {
        className: "check-item",
        isChecked: o.includes(a),
        labelText: s ? s(a) : a,
        onChange: () => i(a)
      },
      a
    ))
  ] });
}
function fe(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function T() {
  return T = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, T.apply(this, arguments);
}
function $u(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function _u(e) {
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
var Kr = { exports: {} }, Fn = { exports: {} }, ue = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pi;
function Mu() {
  if (pi)
    return ue;
  pi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, c = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
  function x(b) {
    if (typeof b == "object" && b !== null) {
      var R = b.$$typeof;
      switch (R) {
        case t:
          switch (b = b.type, b) {
            case l:
            case d:
            case r:
            case i:
            case o:
            case p:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case a:
                case c:
                case h:
                case g:
                case s:
                  return b;
                default:
                  return R;
              }
          }
        case n:
          return R;
      }
    }
  }
  function E(b) {
    return x(b) === d;
  }
  return ue.AsyncMode = l, ue.ConcurrentMode = d, ue.ContextConsumer = a, ue.ContextProvider = s, ue.Element = t, ue.ForwardRef = c, ue.Fragment = r, ue.Lazy = h, ue.Memo = g, ue.Portal = n, ue.Profiler = i, ue.StrictMode = o, ue.Suspense = p, ue.isAsyncMode = function(b) {
    return E(b) || x(b) === l;
  }, ue.isConcurrentMode = E, ue.isContextConsumer = function(b) {
    return x(b) === a;
  }, ue.isContextProvider = function(b) {
    return x(b) === s;
  }, ue.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, ue.isForwardRef = function(b) {
    return x(b) === c;
  }, ue.isFragment = function(b) {
    return x(b) === r;
  }, ue.isLazy = function(b) {
    return x(b) === h;
  }, ue.isMemo = function(b) {
    return x(b) === g;
  }, ue.isPortal = function(b) {
    return x(b) === n;
  }, ue.isProfiler = function(b) {
    return x(b) === i;
  }, ue.isStrictMode = function(b) {
    return x(b) === o;
  }, ue.isSuspense = function(b) {
    return x(b) === p;
  }, ue.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === d || b === i || b === o || b === p || b === f || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === g || b.$$typeof === s || b.$$typeof === a || b.$$typeof === c || b.$$typeof === v || b.$$typeof === y || b.$$typeof === $ || b.$$typeof === m);
  }, ue.typeOf = x, ue;
}
var ce = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fi;
function Iu() {
  return fi || (fi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, c = e ? Symbol.for("react.forward_ref") : 60112, p = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, g = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, $ = e ? Symbol.for("react.scope") : 60119;
    function x(V) {
      return typeof V == "string" || typeof V == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      V === r || V === d || V === i || V === o || V === p || V === f || typeof V == "object" && V !== null && (V.$$typeof === h || V.$$typeof === g || V.$$typeof === s || V.$$typeof === a || V.$$typeof === c || V.$$typeof === v || V.$$typeof === y || V.$$typeof === $ || V.$$typeof === m);
    }
    function E(V) {
      if (typeof V == "object" && V !== null) {
        var Q = V.$$typeof;
        switch (Q) {
          case t:
            var M = V.type;
            switch (M) {
              case l:
              case d:
              case r:
              case i:
              case o:
              case p:
                return M;
              default:
                var se = M && M.$$typeof;
                switch (se) {
                  case a:
                  case c:
                  case h:
                  case g:
                  case s:
                    return se;
                  default:
                    return Q;
                }
            }
          case n:
            return Q;
        }
      }
    }
    var b = l, R = d, P = a, D = s, F = t, B = c, N = r, C = h, k = g, _ = n, A = i, I = o, j = p, K = !1;
    function Z(V) {
      return K || (K = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(V) || E(V) === l;
    }
    function O(V) {
      return E(V) === d;
    }
    function L(V) {
      return E(V) === a;
    }
    function H(V) {
      return E(V) === s;
    }
    function X(V) {
      return typeof V == "object" && V !== null && V.$$typeof === t;
    }
    function z(V) {
      return E(V) === c;
    }
    function G(V) {
      return E(V) === r;
    }
    function q(V) {
      return E(V) === h;
    }
    function W(V) {
      return E(V) === g;
    }
    function U(V) {
      return E(V) === n;
    }
    function Y(V) {
      return E(V) === i;
    }
    function J(V) {
      return E(V) === o;
    }
    function ie(V) {
      return E(V) === p;
    }
    ce.AsyncMode = b, ce.ConcurrentMode = R, ce.ContextConsumer = P, ce.ContextProvider = D, ce.Element = F, ce.ForwardRef = B, ce.Fragment = N, ce.Lazy = C, ce.Memo = k, ce.Portal = _, ce.Profiler = A, ce.StrictMode = I, ce.Suspense = j, ce.isAsyncMode = Z, ce.isConcurrentMode = O, ce.isContextConsumer = L, ce.isContextProvider = H, ce.isElement = X, ce.isForwardRef = z, ce.isFragment = G, ce.isLazy = q, ce.isMemo = W, ce.isPortal = U, ce.isProfiler = Y, ce.isStrictMode = J, ce.isSuspense = ie, ce.isValidElementType = x, ce.typeOf = E;
  }()), ce;
}
var gi;
function Ns() {
  return gi || (gi = 1, process.env.NODE_ENV === "production" ? Fn.exports = Mu() : Fn.exports = Iu()), Fn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Rr, mi;
function Au() {
  if (mi)
    return Rr;
  mi = 1;
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
      for (var s = {}, a = 0; a < 10; a++)
        s["_" + String.fromCharCode(a)] = a;
      var l = Object.getOwnPropertyNames(s).map(function(c) {
        return s[c];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(c) {
        d[c] = c;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Rr = o() ? Object.assign : function(i, s) {
    for (var a, l = r(i), d, c = 1; c < arguments.length; c++) {
      a = Object(arguments[c]);
      for (var p in a)
        t.call(a, p) && (l[p] = a[p]);
      if (e) {
        d = e(a);
        for (var f = 0; f < d.length; f++)
          n.call(a, d[f]) && (l[d[f]] = a[d[f]]);
      }
    }
    return l;
  }, Rr;
}
var kr, hi;
function wo() {
  if (hi)
    return kr;
  hi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return kr = e, kr;
}
var Tr, vi;
function Ps() {
  return vi || (vi = 1, Tr = Function.call.bind(Object.prototype.hasOwnProperty)), Tr;
}
var Or, bi;
function Du() {
  if (bi)
    return Or;
  bi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = wo(), n = {}, r = Ps();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, a, l, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var c in i)
        if (r(i, c)) {
          var p;
          try {
            if (typeof i[c] != "function") {
              var f = Error(
                (l || "React class") + ": " + a + " type `" + c + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[c] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            p = i[c](s, c, l, a, null, t);
          } catch (h) {
            p = h;
          }
          if (p && !(p instanceof Error) && e(
            (l || "React class") + ": type specification of " + a + " `" + c + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof p + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), p instanceof Error && !(p.message in n)) {
            n[p.message] = !0;
            var g = d ? d() : "";
            e(
              "Failed " + a + " type: " + p.message + (g ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Or = o, Or;
}
var Nr, yi;
function Fu() {
  if (yi)
    return Nr;
  yi = 1;
  var e = Ns(), t = Au(), n = wo(), r = Ps(), o = Du(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(a) {
    var l = "Warning: " + a;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return Nr = function(a, l) {
    var d = typeof Symbol == "function" && Symbol.iterator, c = "@@iterator";
    function p(O) {
      var L = O && (d && O[d] || O[c]);
      if (typeof L == "function")
        return L;
    }
    var f = "<<anonymous>>", g = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: $(),
      arrayOf: x,
      element: E(),
      elementType: b(),
      instanceOf: R,
      node: B(),
      objectOf: D,
      oneOf: P,
      oneOfType: F,
      shape: C,
      exact: k
    };
    function h(O, L) {
      return O === L ? O !== 0 || 1 / O === 1 / L : O !== O && L !== L;
    }
    function m(O, L) {
      this.message = O, this.data = L && typeof L == "object" ? L : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(O) {
      if (process.env.NODE_ENV !== "production")
        var L = {}, H = 0;
      function X(G, q, W, U, Y, J, ie) {
        if (U = U || f, J = J || W, ie !== n) {
          if (l) {
            var V = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw V.name = "Invariant Violation", V;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = U + ":" + W;
            !L[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + J + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), L[Q] = !0, H++);
          }
        }
        return q[W] == null ? G ? q[W] === null ? new m("The " + Y + " `" + J + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new m("The " + Y + " `" + J + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : O(q, W, U, Y, J);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function y(O) {
      function L(H, X, z, G, q, W) {
        var U = H[X], Y = I(U);
        if (Y !== O) {
          var J = j(U);
          return new m(
            "Invalid " + G + " `" + q + "` of type " + ("`" + J + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return v(L);
    }
    function $() {
      return v(s);
    }
    function x(O) {
      function L(H, X, z, G, q) {
        if (typeof O != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var W = H[X];
        if (!Array.isArray(W)) {
          var U = I(W);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an array."));
        }
        for (var Y = 0; Y < W.length; Y++) {
          var J = O(W, Y, z, G, q + "[" + Y + "]", n);
          if (J instanceof Error)
            return J;
        }
        return null;
      }
      return v(L);
    }
    function E() {
      function O(L, H, X, z, G) {
        var q = L[H];
        if (!a(q)) {
          var W = I(q);
          return new m("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(O);
    }
    function b() {
      function O(L, H, X, z, G) {
        var q = L[H];
        if (!e.isValidElementType(q)) {
          var W = I(q);
          return new m("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(O);
    }
    function R(O) {
      function L(H, X, z, G, q) {
        if (!(H[X] instanceof O)) {
          var W = O.name || f, U = Z(H[X]);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return v(L);
    }
    function P(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function L(H, X, z, G, q) {
        for (var W = H[X], U = 0; U < O.length; U++)
          if (h(W, O[U]))
            return null;
        var Y = JSON.stringify(O, function(ie, V) {
          var Q = j(V);
          return Q === "symbol" ? String(V) : V;
        });
        return new m("Invalid " + G + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + z + "`, expected one of " + Y + "."));
      }
      return v(L);
    }
    function D(O) {
      function L(H, X, z, G, q) {
        if (typeof O != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var W = H[X], U = I(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an object."));
        for (var Y in W)
          if (r(W, Y)) {
            var J = O(W, Y, z, G, q + "." + Y, n);
            if (J instanceof Error)
              return J;
          }
        return null;
      }
      return v(L);
    }
    function F(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var L = 0; L < O.length; L++) {
        var H = O[L];
        if (typeof H != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + K(H) + " at index " + L + "."
          ), s;
      }
      function X(z, G, q, W, U) {
        for (var Y = [], J = 0; J < O.length; J++) {
          var ie = O[J], V = ie(z, G, q, W, U, n);
          if (V == null)
            return null;
          V.data && r(V.data, "expectedType") && Y.push(V.data.expectedType);
        }
        var Q = Y.length > 0 ? ", expected one of type [" + Y.join(", ") + "]" : "";
        return new m("Invalid " + W + " `" + U + "` supplied to " + ("`" + q + "`" + Q + "."));
      }
      return v(X);
    }
    function B() {
      function O(L, H, X, z, G) {
        return _(L[H]) ? null : new m("Invalid " + z + " `" + G + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return v(O);
    }
    function N(O, L, H, X, z) {
      return new m(
        (O || "React class") + ": " + L + " type `" + H + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function C(O) {
      function L(H, X, z, G, q) {
        var W = H[X], U = I(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var Y in O) {
          var J = O[Y];
          if (typeof J != "function")
            return N(z, G, q, Y, j(J));
          var ie = J(W, Y, z, G, q + "." + Y, n);
          if (ie)
            return ie;
        }
        return null;
      }
      return v(L);
    }
    function k(O) {
      function L(H, X, z, G, q) {
        var W = H[X], U = I(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        var Y = t({}, H[X], O);
        for (var J in Y) {
          var ie = O[J];
          if (r(O, J) && typeof ie != "function")
            return N(z, G, q, J, j(ie));
          if (!ie)
            return new m(
              "Invalid " + G + " `" + q + "` key `" + J + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var V = ie(W, J, z, G, q + "." + J, n);
          if (V)
            return V;
        }
        return null;
      }
      return v(L);
    }
    function _(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(_);
          if (O === null || a(O))
            return !0;
          var L = p(O);
          if (L) {
            var H = L.call(O), X;
            if (L !== O.entries) {
              for (; !(X = H.next()).done; )
                if (!_(X.value))
                  return !1;
            } else
              for (; !(X = H.next()).done; ) {
                var z = X.value;
                if (z && !_(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function A(O, L) {
      return O === "symbol" ? !0 : L ? L["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && L instanceof Symbol : !1;
    }
    function I(O) {
      var L = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : A(L, O) ? "symbol" : L;
    }
    function j(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var L = I(O);
      if (L === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return L;
    }
    function K(O) {
      var L = j(O);
      switch (L) {
        case "array":
        case "object":
          return "an " + L;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + L;
        default:
          return L;
      }
    }
    function Z(O) {
      return !O.constructor || !O.constructor.name ? f : O.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, Nr;
}
var Pr, wi;
function Vu() {
  if (wi)
    return Pr;
  wi = 1;
  var e = wo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Pr = function() {
    function r(s, a, l, d, c, p) {
      if (p !== e) {
        var f = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw f.name = "Invariant Violation", f;
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
  }, Pr;
}
if (process.env.NODE_ENV !== "production") {
  var Lu = Ns(), Bu = !0;
  Kr.exports = Fu()(Lu.isElement, Bu);
} else
  Kr.exports = Vu()();
var ju = Kr.exports;
const u = /* @__PURE__ */ $u(ju);
function Zt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Et(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function $s(e) {
  if (!Et(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = $s(e[n]);
  }), t;
}
function rt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? T({}, e) : e;
  return Et(e) && Et(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Et(t[o]) && o in e && Et(e[o]) ? r[o] = rt(e[o], t[o], n) : n.clone ? r[o] = Et(t[o]) ? $s(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function zu(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function _s(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  const l = i.type;
  return typeof l == "function" && !zu(l) && (a = "Did you accidentally use a plain function component for an element instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ms = Zt(u.element, _s);
Ms.isRequired = Zt(u.element.isRequired, _s);
const kn = Ms;
function Hu(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Gu(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  return typeof i == "function" && !Hu(i) && (a = "Did you accidentally provide a plain function component instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Uu = Zt(u.elementType, Gu), qu = "exact-prop: ​";
function Is(e) {
  return process.env.NODE_ENV === "production" ? e : T({}, e, {
    [qu]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Gt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Jr = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xi;
function Wu() {
  if (xi)
    return de;
  xi = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function m(v) {
    if (typeof v == "object" && v !== null) {
      var y = v.$$typeof;
      switch (y) {
        case e:
          switch (v = v.type, v) {
            case n:
            case o:
            case r:
            case d:
            case c:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case a:
                case s:
                case l:
                case f:
                case p:
                case i:
                  return v;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return de.ContextConsumer = s, de.ContextProvider = i, de.Element = e, de.ForwardRef = l, de.Fragment = n, de.Lazy = f, de.Memo = p, de.Portal = t, de.Profiler = o, de.StrictMode = r, de.Suspense = d, de.SuspenseList = c, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(v) {
    return m(v) === s;
  }, de.isContextProvider = function(v) {
    return m(v) === i;
  }, de.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, de.isForwardRef = function(v) {
    return m(v) === l;
  }, de.isFragment = function(v) {
    return m(v) === n;
  }, de.isLazy = function(v) {
    return m(v) === f;
  }, de.isMemo = function(v) {
    return m(v) === p;
  }, de.isPortal = function(v) {
    return m(v) === t;
  }, de.isProfiler = function(v) {
    return m(v) === o;
  }, de.isStrictMode = function(v) {
    return m(v) === r;
  }, de.isSuspense = function(v) {
    return m(v) === d;
  }, de.isSuspenseList = function(v) {
    return m(v) === c;
  }, de.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === o || v === r || v === d || v === c || v === g || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === p || v.$$typeof === i || v.$$typeof === s || v.$$typeof === l || v.$$typeof === h || v.getModuleId !== void 0);
  }, de.typeOf = m, de;
}
var pe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ei;
function Xu() {
  return Ei || (Ei = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), c = Symbol.for("react.suspense_list"), p = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), h = !1, m = !1, v = !1, y = !1, $ = !1, x;
    x = Symbol.for("react.module.reference");
    function E(M) {
      return !!(typeof M == "string" || typeof M == "function" || M === n || M === o || $ || M === r || M === d || M === c || y || M === g || h || m || v || typeof M == "object" && M !== null && (M.$$typeof === f || M.$$typeof === p || M.$$typeof === i || M.$$typeof === s || M.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      M.$$typeof === x || M.getModuleId !== void 0));
    }
    function b(M) {
      if (typeof M == "object" && M !== null) {
        var se = M.$$typeof;
        switch (se) {
          case e:
            var Se = M.type;
            switch (Se) {
              case n:
              case o:
              case r:
              case d:
              case c:
                return Se;
              default:
                var Ne = Se && Se.$$typeof;
                switch (Ne) {
                  case a:
                  case s:
                  case l:
                  case f:
                  case p:
                  case i:
                    return Ne;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var R = s, P = i, D = e, F = l, B = n, N = f, C = p, k = t, _ = o, A = r, I = d, j = c, K = !1, Z = !1;
    function O(M) {
      return K || (K = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function L(M) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(M) {
      return b(M) === s;
    }
    function X(M) {
      return b(M) === i;
    }
    function z(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function G(M) {
      return b(M) === l;
    }
    function q(M) {
      return b(M) === n;
    }
    function W(M) {
      return b(M) === f;
    }
    function U(M) {
      return b(M) === p;
    }
    function Y(M) {
      return b(M) === t;
    }
    function J(M) {
      return b(M) === o;
    }
    function ie(M) {
      return b(M) === r;
    }
    function V(M) {
      return b(M) === d;
    }
    function Q(M) {
      return b(M) === c;
    }
    pe.ContextConsumer = R, pe.ContextProvider = P, pe.Element = D, pe.ForwardRef = F, pe.Fragment = B, pe.Lazy = N, pe.Memo = C, pe.Portal = k, pe.Profiler = _, pe.StrictMode = A, pe.Suspense = I, pe.SuspenseList = j, pe.isAsyncMode = O, pe.isConcurrentMode = L, pe.isContextConsumer = H, pe.isContextProvider = X, pe.isElement = z, pe.isForwardRef = G, pe.isFragment = q, pe.isLazy = W, pe.isMemo = U, pe.isPortal = Y, pe.isProfiler = J, pe.isStrictMode = ie, pe.isSuspense = V, pe.isSuspenseList = Q, pe.isValidElementType = E, pe.typeOf = b;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Jr.exports = Wu() : Jr.exports = Xu();
var Kn = Jr.exports;
const Yu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Ku(e) {
  const t = `${e}`.match(Yu);
  return t && t[1] || "";
}
function As(e, t = "") {
  return e.displayName || e.name || Ku(e) || t;
}
function Si(e, t, n) {
  const r = As(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Ju(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return As(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Kn.ForwardRef:
          return Si(e, e.render, "ForwardRef");
        case Kn.Memo:
          return Si(e, e.type, "memo");
        default:
          return;
      }
  }
}
function ot(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Zu = u.oneOfType([u.func, u.object]), xo = Zu;
function Ke(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Gt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Zr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ds(e, t = 166) {
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
function Qu(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const a = o || "<<anonymous>>", l = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${l}\` of \`${a}\` is deprecated. ${t}`) : null;
  };
}
function ec(e, t) {
  var n, r;
  return /* @__PURE__ */ S.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Te(e) {
  return e && e.ownerDocument || document;
}
function Ut(e) {
  return Te(e).defaultView || window;
}
function tc(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? T({}, t.propTypes) : null;
  return (o) => (i, s, a, l, d, ...c) => {
    const p = d || s, f = n == null ? void 0 : n[p];
    if (f) {
      const g = f(i, s, a, l, d, ...c);
      if (g)
        return g;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${p}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Jn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const nc = typeof window < "u" ? S.useLayoutEffect : S.useEffect, kt = nc;
let Ci = 0;
function rc(e) {
  const [t, n] = S.useState(e), r = e || t;
  return S.useEffect(() => {
    t == null && (Ci += 1, n(`mui-${Ci}`));
  }, [t]), r;
}
const Ri = S["useId".toString()];
function Fs(e) {
  if (Ri !== void 0) {
    const t = Ri();
    return e ?? t;
  }
  return rc(e);
}
function oc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Vs({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = S.useRef(e !== void 0), [i, s] = S.useState(t), a = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    S.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: d
    } = S.useRef(t);
    S.useEffect(() => {
      !o && d !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const l = S.useCallback((d) => {
    o || s(d);
  }, []);
  return [a, l];
}
function xn(e) {
  const t = S.useRef(e);
  return kt(() => {
    t.current = e;
  }), S.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ge(...e) {
  return S.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Jn(n, t);
    });
  }, e);
}
const ki = {};
function ic(e, t) {
  const n = S.useRef(ki);
  return n.current === ki && (n.current = e(t)), n;
}
const sc = [];
function ac(e) {
  S.useEffect(e, sc);
}
class Tn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Tn();
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
function pn() {
  const e = ic(Tn.create).current;
  return ac(e.disposeEffect), e;
}
let ar = !0, Qr = !1;
const lc = new Tn(), uc = {
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
function cc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && uc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function dc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ar = !0);
}
function $r() {
  ar = !1;
}
function pc() {
  this.visibilityState === "hidden" && Qr && (ar = !0);
}
function fc(e) {
  e.addEventListener("keydown", dc, !0), e.addEventListener("mousedown", $r, !0), e.addEventListener("pointerdown", $r, !0), e.addEventListener("touchstart", $r, !0), e.addEventListener("visibilitychange", pc, !0);
}
function gc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return ar || cc(t);
}
function Ls() {
  const e = S.useCallback((o) => {
    o != null && fc(o.ownerDocument);
  }, []), t = S.useRef(!1);
  function n() {
    return t.current ? (Qr = !0, lc.start(100, () => {
      Qr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return gc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Bs(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function mc(e) {
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
function hc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const vc = Number.isInteger || hc;
function js(e, t, n, r) {
  const o = e[t];
  if (o == null || !vc(o)) {
    const i = mc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function zs(e, t, ...n) {
  return e[t] === void 0 ? null : js(e, t, ...n);
}
function eo() {
  return null;
}
zs.isRequired = js;
eo.isRequired = eo;
const Hs = process.env.NODE_ENV === "production" ? eo : zs;
function Gs(e, t) {
  const n = T({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = T({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = T({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = Gs(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function at(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((i, s) => {
        if (s) {
          const a = t(s);
          a !== "" && i.push(a), n && n[s] && i.push(n[s]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const Ti = (e) => e, bc = () => {
  let e = Ti;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ti;
    }
  };
}, yc = bc(), Us = yc, qs = {
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
function Ze(e, t, n = "Mui") {
  const r = qs[t];
  return r ? `${n}-${r}` : `${Us.generate(e)}-${t}`;
}
function mt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ze(e, o, n);
  }), r;
}
function wc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ws(e) {
  return typeof e == "string";
}
function fn(e, t, n) {
  return e === void 0 || Ws(e) ? t : T({}, t, {
    ownerState: T({}, t.ownerState, n)
  });
}
const xc = {
  disableDefaultClasses: !1
}, Ec = /* @__PURE__ */ S.createContext(xc);
function Sc(e) {
  const {
    disableDefaultClasses: t
  } = S.useContext(Ec);
  return (n) => t ? "" : e(n);
}
function Xs(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Cc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Oi(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Rc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const g = ke(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = T({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = T({}, n, o, r);
    return g.length > 0 && (m.className = g), Object.keys(h).length > 0 && (m.style = h), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Xs(T({}, o, r)), a = Oi(r), l = Oi(o), d = t(s), c = ke(d == null ? void 0 : d.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), p = T({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = T({}, d, n, l, a);
  return c.length > 0 && (f.className = c), Object.keys(p).length > 0 && (f.style = p), {
    props: f,
    internalRef: d.ref
  };
}
const kc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Tt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = fe(e, kc), a = i ? {} : Cc(r, o), {
    props: l,
    internalRef: d
  } = Rc(T({}, s, {
    externalSlotProps: a
  })), c = Ge(d, a == null ? void 0 : a.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return fn(n, T({}, l, {
    ref: c
  }), o);
}
const Ys = "base";
function Tc(e) {
  return `${Ys}--${e}`;
}
function Oc(e, t) {
  return `${Ys}-${e}-${t}`;
}
function Ks(e, t) {
  const n = qs[t];
  return n ? Tc(n) : Oc(e, t);
}
function Nc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ks(e, r);
  }), n;
}
const Pc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function $c(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function _c(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Mc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || _c(e));
}
function Ic(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Pc)).forEach((r, o) => {
    const i = $c(r);
    i === -1 || !Mc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Ac() {
  return !0;
}
function Zn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Ic,
    isEnabled: s = Ac,
    open: a
  } = e, l = S.useRef(!1), d = S.useRef(null), c = S.useRef(null), p = S.useRef(null), f = S.useRef(null), g = S.useRef(!1), h = S.useRef(null), m = Ge(t.ref, h), v = S.useRef(null);
  S.useEffect(() => {
    !a || !h.current || (g.current = !n);
  }, [n, a]), S.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Te(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), g.current && h.current.focus()), () => {
      o || (p.current && p.current.focus && (l.current = !0, p.current.focus()), p.current = null);
    };
  }, [a]), S.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Te(h.current), E = (P) => {
      v.current = P, !(r || !s() || P.key !== "Tab") && x.activeElement === h.current && P.shiftKey && (l.current = !0, c.current && c.current.focus());
    }, b = () => {
      const P = h.current;
      if (P === null)
        return;
      if (!x.hasFocus() || !s() || l.current) {
        l.current = !1;
        return;
      }
      if (P.contains(x.activeElement) || r && x.activeElement !== d.current && x.activeElement !== c.current)
        return;
      if (x.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!g.current)
        return;
      let D = [];
      if ((x.activeElement === d.current || x.activeElement === c.current) && (D = i(h.current)), D.length > 0) {
        var F, B;
        const N = !!((F = v.current) != null && F.shiftKey && ((B = v.current) == null ? void 0 : B.key) === "Tab"), C = D[0], k = D[D.length - 1];
        typeof C != "string" && typeof k != "string" && (N ? k.focus() : C.focus());
      } else
        P.focus();
    };
    x.addEventListener("focusin", b), x.addEventListener("keydown", E, !0);
    const R = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(R), x.removeEventListener("focusin", b), x.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, s, a, i]);
  const y = (x) => {
    p.current === null && (p.current = x.relatedTarget), g.current = !0, f.current = x.target;
    const E = t.props.onFocus;
    E && E(x);
  }, $ = (x) => {
    p.current === null && (p.current = x.relatedTarget), g.current = !0;
  };
  return /* @__PURE__ */ oe(S.Fragment, {
    children: [/* @__PURE__ */ w("div", {
      tabIndex: a ? 0 : -1,
      onFocus: $,
      ref: d,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ S.cloneElement(t, {
      ref: m,
      onFocus: y
    }), /* @__PURE__ */ w("div", {
      tabIndex: a ? 0 : -1,
      onFocus: $,
      ref: c,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Zn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: kn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: u.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: u.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: u.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: u.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: u.func,
  /**
   * If `true`, focus is locked.
   */
  open: u.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Zn["propTypes"] = Is(Zn.propTypes));
function Dc(e) {
  return typeof e == "function" ? e() : e;
}
const En = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, a] = S.useState(null), l = Ge(/* @__PURE__ */ S.isValidElement(r) ? r.ref : null, n);
  if (kt(() => {
    i || a(Dc(o) || document.body);
  }, [o, i]), kt(() => {
    if (s && !i)
      return Jn(n, s), () => {
        Jn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ S.isValidElement(r)) {
      const d = {
        ref: l
      };
      return /* @__PURE__ */ S.cloneElement(r, d);
    }
    return /* @__PURE__ */ w(S.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ w(S.Fragment, {
    children: s && /* @__PURE__ */ Jl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (En.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: u.node,
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
  container: u.oneOfType([ot, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
process.env.NODE_ENV !== "production" && (En["propTypes"] = Is(En.propTypes));
function Fc(e) {
  const t = Te(e);
  return t.body === e ? Ut(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function vn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ni(e) {
  return parseInt(Ut(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Vc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Pi(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const a = i.indexOf(s) === -1, l = !Vc(s);
    a && l && vn(s, o);
  });
}
function _r(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Lc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Fc(r)) {
      const s = Bs(Te(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ni(r) + s}px`;
      const a = Te(r).querySelectorAll(".mui-fixed");
      [].forEach.call(a, (l) => {
        n.push({
          value: l.style.paddingRight,
          property: "padding-right",
          el: l
        }), l.style.paddingRight = `${Ni(l) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Te(r).body;
    else {
      const s = r.parentElement, a = Ut(r);
      i = (s == null ? void 0 : s.nodeName) === "HTML" && a.getComputedStyle(s).overflowY === "scroll" ? s : r;
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
      property: a
    }) => {
      i ? s.style.setProperty(a, i) : s.style.removeProperty(a);
    });
  };
}
function Bc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class jc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && vn(t.modalRef, !1);
    const o = Bc(n);
    Pi(n, t.mount, t.modalRef, o, !0);
    const i = _r(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = _r(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Lc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = _r(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && vn(t.modalRef, n), Pi(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && vn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function zc(e) {
  return typeof e == "function" ? e() : e;
}
function Hc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Gc = new jc();
function Uc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Gc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: a,
    children: l,
    onClose: d,
    open: c,
    rootRef: p
  } = e, f = S.useRef({}), g = S.useRef(null), h = S.useRef(null), m = Ge(h, p), [v, y] = S.useState(!c), $ = Hc(l);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const E = () => Te(g.current), b = () => (f.current.modalRef = h.current, f.current.mount = g.current, f.current), R = () => {
    o.mount(b(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, P = xn(() => {
    const I = zc(t) || E().body;
    o.add(b(), I), h.current && R();
  }), D = S.useCallback(() => o.isTopModal(b()), [o]), F = xn((I) => {
    g.current = I, I && (c && D() ? R() : h.current && vn(h.current, x));
  }), B = S.useCallback(() => {
    o.remove(b(), x);
  }, [x, o]);
  S.useEffect(() => () => {
    B();
  }, [B]), S.useEffect(() => {
    c ? P() : (!$ || !i) && B();
  }, [c, B, $, i, P]);
  const N = (I) => (j) => {
    var K;
    (K = I.onKeyDown) == null || K.call(I, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !D()) && (n || (j.stopPropagation(), d && d(j, "escapeKeyDown")));
  }, C = (I) => (j) => {
    var K;
    (K = I.onClick) == null || K.call(I, j), j.target === j.currentTarget && d && d(j, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const j = Xs(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const K = T({}, j, I);
      return T({
        role: "presentation"
      }, K, {
        onKeyDown: N(K),
        ref: m
      });
    },
    getBackdropProps: (I = {}) => {
      const j = I;
      return T({
        "aria-hidden": !0
      }, j, {
        onClick: C(j),
        open: c
      });
    },
    getTransitionProps: () => {
      const I = () => {
        y(!1), s && s();
      }, j = () => {
        y(!0), a && a(), i && B();
      };
      return {
        onEnter: Zr(I, l == null ? void 0 : l.props.onEnter),
        onExited: Zr(j, l == null ? void 0 : l.props.onExited)
      };
    },
    rootRef: m,
    portalRef: F,
    isTopModal: D,
    exited: v,
    hasTransition: $
  };
}
var _e = "top", Ue = "bottom", qe = "right", Me = "left", Eo = "auto", On = [_e, Ue, qe, Me], qt = "start", Sn = "end", qc = "clippingParents", Js = "viewport", an = "popper", Wc = "reference", $i = /* @__PURE__ */ On.reduce(function(e, t) {
  return e.concat([t + "-" + qt, t + "-" + Sn]);
}, []), Zs = /* @__PURE__ */ [].concat(On, [Eo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + qt, t + "-" + Sn]);
}, []), Xc = "beforeRead", Yc = "read", Kc = "afterRead", Jc = "beforeMain", Zc = "main", Qc = "afterMain", ed = "beforeWrite", td = "write", nd = "afterWrite", rd = [Xc, Yc, Kc, Jc, Zc, Qc, ed, td, nd];
function Je(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Le(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Ot(e) {
  var t = Le(e).Element;
  return e instanceof t || e instanceof Element;
}
function He(e) {
  var t = Le(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function So(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Le(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function od(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !He(i) || !Je(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function id(e) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = s.reduce(function(l, d) {
        return l[d] = "", l;
      }, {});
      !He(o) || !Je(o) || (Object.assign(o.style, a), Object.keys(i).forEach(function(l) {
        o.removeAttribute(l);
      }));
    });
  };
}
const sd = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: od,
  effect: id,
  requires: ["computeStyles"]
};
function Ye(e) {
  return e.split("-")[0];
}
var Ct = Math.max, Qn = Math.min, Wt = Math.round;
function to() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Qs() {
  return !/^((?!chrome|android).)*safari/i.test(to());
}
function Xt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && He(e) && (o = e.offsetWidth > 0 && Wt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Wt(r.height) / e.offsetHeight || 1);
  var s = Ot(e) ? Le(e) : window, a = s.visualViewport, l = !Qs() && n, d = (r.left + (l && a ? a.offsetLeft : 0)) / o, c = (r.top + (l && a ? a.offsetTop : 0)) / i, p = r.width / o, f = r.height / i;
  return {
    width: p,
    height: f,
    top: c,
    right: d + p,
    bottom: c + f,
    left: d,
    x: d,
    y: c
  };
}
function Co(e) {
  var t = Xt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ea(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && So(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function it(e) {
  return Le(e).getComputedStyle(e);
}
function ad(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function ht(e) {
  return ((Ot(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function lr(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (So(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ht(e)
  );
}
function _i(e) {
  return !He(e) || // https://github.com/popperjs/popper-core/issues/837
  it(e).position === "fixed" ? null : e.offsetParent;
}
function ld(e) {
  var t = /firefox/i.test(to()), n = /Trident/i.test(to());
  if (n && He(e)) {
    var r = it(e);
    if (r.position === "fixed")
      return null;
  }
  var o = lr(e);
  for (So(o) && (o = o.host); He(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var i = it(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Nn(e) {
  for (var t = Le(e), n = _i(e); n && ad(n) && it(n).position === "static"; )
    n = _i(n);
  return n && (Je(n) === "html" || Je(n) === "body" && it(n).position === "static") ? t : n || ld(e) || t;
}
function Ro(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function bn(e, t, n) {
  return Ct(e, Qn(t, n));
}
function ud(e, t, n) {
  var r = bn(e, t, n);
  return r > n ? n : r;
}
function ta() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function na(e) {
  return Object.assign({}, ta(), e);
}
function ra(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var cd = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, na(typeof t != "number" ? t : ra(t, On));
};
function dd(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Ye(n.placement), l = Ro(a), d = [Me, qe].indexOf(a) >= 0, c = d ? "height" : "width";
  if (!(!i || !s)) {
    var p = cd(o.padding, n), f = Co(i), g = l === "y" ? _e : Me, h = l === "y" ? Ue : qe, m = n.rects.reference[c] + n.rects.reference[l] - s[l] - n.rects.popper[c], v = s[l] - n.rects.reference[l], y = Nn(i), $ = y ? l === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, x = m / 2 - v / 2, E = p[g], b = $ - f[c] - p[h], R = $ / 2 - f[c] / 2 + x, P = bn(E, R, b), D = l;
    n.modifiersData[r] = (t = {}, t[D] = P, t.centerOffset = P - R, t);
  }
}
function pd(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ea(t.elements.popper, o) && (t.elements.arrow = o));
}
const fd = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: dd,
  effect: pd,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Yt(e) {
  return e.split("-")[1];
}
var gd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function md(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Wt(n * o) / o || 0,
    y: Wt(r * o) / o || 0
  };
}
function Mi(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, l = e.gpuAcceleration, d = e.adaptive, c = e.roundOffsets, p = e.isFixed, f = s.x, g = f === void 0 ? 0 : f, h = s.y, m = h === void 0 ? 0 : h, v = typeof c == "function" ? c({
    x: g,
    y: m
  }) : {
    x: g,
    y: m
  };
  g = v.x, m = v.y;
  var y = s.hasOwnProperty("x"), $ = s.hasOwnProperty("y"), x = Me, E = _e, b = window;
  if (d) {
    var R = Nn(n), P = "clientHeight", D = "clientWidth";
    if (R === Le(n) && (R = ht(n), it(R).position !== "static" && a === "absolute" && (P = "scrollHeight", D = "scrollWidth")), R = R, o === _e || (o === Me || o === qe) && i === Sn) {
      E = Ue;
      var F = p && R === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        R[P]
      );
      m -= F - r.height, m *= l ? 1 : -1;
    }
    if (o === Me || (o === _e || o === Ue) && i === Sn) {
      x = qe;
      var B = p && R === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        R[D]
      );
      g -= B - r.width, g *= l ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: a
  }, d && gd), C = c === !0 ? md({
    x: g,
    y: m
  }, Le(n)) : {
    x: g,
    y: m
  };
  if (g = C.x, m = C.y, l) {
    var k;
    return Object.assign({}, N, (k = {}, k[E] = $ ? "0" : "", k[x] = y ? "0" : "", k.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", k));
  }
  return Object.assign({}, N, (t = {}, t[E] = $ ? m + "px" : "", t[x] = y ? g + "px" : "", t.transform = "", t));
}
function hd(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, l = a === void 0 ? !0 : a, d = {
    placement: Ye(t.placement),
    variation: Yt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Mi(Object.assign({}, d, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: l
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Mi(Object.assign({}, d, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const vd = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: hd,
  data: {}
};
var Vn = {
  passive: !0
};
function bd(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, l = Le(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && d.forEach(function(c) {
    c.addEventListener("scroll", n.update, Vn);
  }), a && l.addEventListener("resize", n.update, Vn), function() {
    i && d.forEach(function(c) {
      c.removeEventListener("scroll", n.update, Vn);
    }), a && l.removeEventListener("resize", n.update, Vn);
  };
}
const yd = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: bd,
  data: {}
};
var wd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Un(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return wd[t];
  });
}
var xd = {
  start: "end",
  end: "start"
};
function Ii(e) {
  return e.replace(/start|end/g, function(t) {
    return xd[t];
  });
}
function ko(e) {
  var t = Le(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function To(e) {
  return Xt(ht(e)).left + ko(e).scrollLeft;
}
function Ed(e, t) {
  var n = Le(e), r = ht(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, l = 0;
  if (o) {
    i = o.width, s = o.height;
    var d = Qs();
    (d || !d && t === "fixed") && (a = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + To(e),
    y: l
  };
}
function Sd(e) {
  var t, n = ht(e), r = ko(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Ct(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Ct(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + To(e), l = -r.scrollTop;
  return it(o || n).direction === "rtl" && (a += Ct(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: l
  };
}
function Oo(e) {
  var t = it(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function oa(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : He(e) && Oo(e) ? e : oa(lr(e));
}
function yn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = oa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Le(r), s = o ? [i].concat(i.visualViewport || [], Oo(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(yn(lr(s)))
  );
}
function no(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Cd(e, t) {
  var n = Xt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ai(e, t, n) {
  return t === Js ? no(Ed(e, n)) : Ot(t) ? Cd(t, n) : no(Sd(ht(e)));
}
function Rd(e) {
  var t = yn(lr(e)), n = ["absolute", "fixed"].indexOf(it(e).position) >= 0, r = n && He(e) ? Nn(e) : e;
  return Ot(r) ? t.filter(function(o) {
    return Ot(o) && ea(o, r) && Je(o) !== "body";
  }) : [];
}
function kd(e, t, n, r) {
  var o = t === "clippingParents" ? Rd(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(l, d) {
    var c = Ai(e, d, r);
    return l.top = Ct(c.top, l.top), l.right = Qn(c.right, l.right), l.bottom = Qn(c.bottom, l.bottom), l.left = Ct(c.left, l.left), l;
  }, Ai(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function ia(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ye(r) : null, i = r ? Yt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, l;
  switch (o) {
    case _e:
      l = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Ue:
      l = {
        x: s,
        y: t.y + t.height
      };
      break;
    case qe:
      l = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Me:
      l = {
        x: t.x - n.width,
        y: a
      };
      break;
    default:
      l = {
        x: t.x,
        y: t.y
      };
  }
  var d = o ? Ro(o) : null;
  if (d != null) {
    var c = d === "y" ? "height" : "width";
    switch (i) {
      case qt:
        l[d] = l[d] - (t[c] / 2 - n[c] / 2);
        break;
      case Sn:
        l[d] = l[d] + (t[c] / 2 - n[c] / 2);
        break;
    }
  }
  return l;
}
function Cn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, l = a === void 0 ? qc : a, d = n.rootBoundary, c = d === void 0 ? Js : d, p = n.elementContext, f = p === void 0 ? an : p, g = n.altBoundary, h = g === void 0 ? !1 : g, m = n.padding, v = m === void 0 ? 0 : m, y = na(typeof v != "number" ? v : ra(v, On)), $ = f === an ? Wc : an, x = e.rects.popper, E = e.elements[h ? $ : f], b = kd(Ot(E) ? E : E.contextElement || ht(e.elements.popper), l, c, s), R = Xt(e.elements.reference), P = ia({
    reference: R,
    element: x,
    strategy: "absolute",
    placement: o
  }), D = no(Object.assign({}, x, P)), F = f === an ? D : R, B = {
    top: b.top - F.top + y.top,
    bottom: F.bottom - b.bottom + y.bottom,
    left: b.left - F.left + y.left,
    right: F.right - b.right + y.right
  }, N = e.modifiersData.offset;
  if (f === an && N) {
    var C = N[o];
    Object.keys(B).forEach(function(k) {
      var _ = [qe, Ue].indexOf(k) >= 0 ? 1 : -1, A = [_e, Ue].indexOf(k) >= 0 ? "y" : "x";
      B[k] += C[A] * _;
    });
  }
  return B;
}
function Td(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, l = n.allowedAutoPlacements, d = l === void 0 ? Zs : l, c = Yt(r), p = c ? a ? $i : $i.filter(function(h) {
    return Yt(h) === c;
  }) : On, f = p.filter(function(h) {
    return d.indexOf(h) >= 0;
  });
  f.length === 0 && (f = p);
  var g = f.reduce(function(h, m) {
    return h[m] = Cn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ye(m)], h;
  }, {});
  return Object.keys(g).sort(function(h, m) {
    return g[h] - g[m];
  });
}
function Od(e) {
  if (Ye(e) === Eo)
    return [];
  var t = Un(e);
  return [Ii(e), t, Ii(t)];
}
function Nd(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, l = n.fallbackPlacements, d = n.padding, c = n.boundary, p = n.rootBoundary, f = n.altBoundary, g = n.flipVariations, h = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, v = t.options.placement, y = Ye(v), $ = y === v, x = l || ($ || !h ? [Un(v)] : Od(v)), E = [v].concat(x).reduce(function(z, G) {
      return z.concat(Ye(G) === Eo ? Td(t, {
        placement: G,
        boundary: c,
        rootBoundary: p,
        padding: d,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : G);
    }, []), b = t.rects.reference, R = t.rects.popper, P = /* @__PURE__ */ new Map(), D = !0, F = E[0], B = 0; B < E.length; B++) {
      var N = E[B], C = Ye(N), k = Yt(N) === qt, _ = [_e, Ue].indexOf(C) >= 0, A = _ ? "width" : "height", I = Cn(t, {
        placement: N,
        boundary: c,
        rootBoundary: p,
        altBoundary: f,
        padding: d
      }), j = _ ? k ? qe : Me : k ? Ue : _e;
      b[A] > R[A] && (j = Un(j));
      var K = Un(j), Z = [];
      if (i && Z.push(I[C] <= 0), a && Z.push(I[j] <= 0, I[K] <= 0), Z.every(function(z) {
        return z;
      })) {
        F = N, D = !1;
        break;
      }
      P.set(N, Z);
    }
    if (D)
      for (var O = h ? 3 : 1, L = function(G) {
        var q = E.find(function(W) {
          var U = P.get(W);
          if (U)
            return U.slice(0, G).every(function(Y) {
              return Y;
            });
        });
        if (q)
          return F = q, "break";
      }, H = O; H > 0; H--) {
        var X = L(H);
        if (X === "break")
          break;
      }
    t.placement !== F && (t.modifiersData[r]._skip = !0, t.placement = F, t.reset = !0);
  }
}
const Pd = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Nd,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Di(e, t, n) {
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
function Fi(e) {
  return [_e, qe, Ue, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function $d(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = Cn(t, {
    elementContext: "reference"
  }), a = Cn(t, {
    altBoundary: !0
  }), l = Di(s, r), d = Di(a, o, i), c = Fi(l), p = Fi(d);
  t.modifiersData[n] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: d,
    isReferenceHidden: c,
    hasPopperEscaped: p
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": c,
    "data-popper-escaped": p
  });
}
const _d = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: $d
};
function Md(e, t, n) {
  var r = Ye(e), o = [Me, _e].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * o, [Me, qe].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function Id(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Zs.reduce(function(c, p) {
    return c[p] = Md(p, t.rects, i), c;
  }, {}), a = s[t.placement], l = a.x, d = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += l, t.modifiersData.popperOffsets.y += d), t.modifiersData[r] = s;
}
const Ad = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Id
};
function Dd(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ia({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Fd = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Dd,
  data: {}
};
function Vd(e) {
  return e === "x" ? "y" : "x";
}
function Ld(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, l = n.boundary, d = n.rootBoundary, c = n.altBoundary, p = n.padding, f = n.tether, g = f === void 0 ? !0 : f, h = n.tetherOffset, m = h === void 0 ? 0 : h, v = Cn(t, {
    boundary: l,
    rootBoundary: d,
    padding: p,
    altBoundary: c
  }), y = Ye(t.placement), $ = Yt(t.placement), x = !$, E = Ro(y), b = Vd(E), R = t.modifiersData.popperOffsets, P = t.rects.reference, D = t.rects.popper, F = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, B = typeof F == "number" ? {
    mainAxis: F,
    altAxis: F
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, F), N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, C = {
    x: 0,
    y: 0
  };
  if (R) {
    if (i) {
      var k, _ = E === "y" ? _e : Me, A = E === "y" ? Ue : qe, I = E === "y" ? "height" : "width", j = R[E], K = j + v[_], Z = j - v[A], O = g ? -D[I] / 2 : 0, L = $ === qt ? P[I] : D[I], H = $ === qt ? -D[I] : -P[I], X = t.elements.arrow, z = g && X ? Co(X) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ta(), q = G[_], W = G[A], U = bn(0, P[I], z[I]), Y = x ? P[I] / 2 - O - U - q - B.mainAxis : L - U - q - B.mainAxis, J = x ? -P[I] / 2 + O + U + W + B.mainAxis : H + U + W + B.mainAxis, ie = t.elements.arrow && Nn(t.elements.arrow), V = ie ? E === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, Q = (k = N == null ? void 0 : N[E]) != null ? k : 0, M = j + Y - Q - V, se = j + J - Q, Se = bn(g ? Qn(K, M) : K, j, g ? Ct(Z, se) : Z);
      R[E] = Se, C[E] = Se - j;
    }
    if (a) {
      var Ne, we = E === "x" ? _e : Me, bt = E === "x" ? Ue : qe, Pe = R[b], Qe = b === "y" ? "height" : "width", Ae = Pe + v[we], et = Pe - v[bt], Ce = [_e, Me].indexOf(y) !== -1, Pt = (Ne = N == null ? void 0 : N[b]) != null ? Ne : 0, yt = Ce ? Ae : Pe - P[Qe] - D[Qe] - Pt + B.altAxis, Qt = Ce ? Pe + P[Qe] + D[Qe] - Pt - B.altAxis : et, Mn = g && Ce ? ud(yt, Pe, Qt) : bn(g ? yt : Ae, Pe, g ? Qt : et);
      R[b] = Mn, C[b] = Mn - Pe;
    }
    t.modifiersData[r] = C;
  }
}
const Bd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ld,
  requiresIfExists: ["offset"]
};
function jd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function zd(e) {
  return e === Le(e) || !He(e) ? ko(e) : jd(e);
}
function Hd(e) {
  var t = e.getBoundingClientRect(), n = Wt(t.width) / e.offsetWidth || 1, r = Wt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Gd(e, t, n) {
  n === void 0 && (n = !1);
  var r = He(t), o = He(t) && Hd(t), i = ht(t), s = Xt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Oo(i)) && (a = zd(t)), He(t) ? (l = Xt(t, !0), l.x += t.clientLeft, l.y += t.clientTop) : i && (l.x = To(i))), {
    x: s.left + a.scrollLeft - l.x,
    y: s.top + a.scrollTop - l.y,
    width: s.width,
    height: s.height
  };
}
function Ud(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var l = t.get(a);
        l && o(l);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function qd(e) {
  var t = Ud(e);
  return rd.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Wd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Xd(e) {
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
var Vi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Li() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Yd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Vi : o;
  return function(a, l, d) {
    d === void 0 && (d = i);
    var c = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Vi, i),
      modifiersData: {},
      elements: {
        reference: a,
        popper: l
      },
      attributes: {},
      styles: {}
    }, p = [], f = !1, g = {
      state: c,
      setOptions: function(y) {
        var $ = typeof y == "function" ? y(c.options) : y;
        m(), c.options = Object.assign({}, i, c.options, $), c.scrollParents = {
          reference: Ot(a) ? yn(a) : a.contextElement ? yn(a.contextElement) : [],
          popper: yn(l)
        };
        var x = qd(Xd([].concat(r, c.options.modifiers)));
        return c.orderedModifiers = x.filter(function(E) {
          return E.enabled;
        }), h(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var y = c.elements, $ = y.reference, x = y.popper;
          if (Li($, x)) {
            c.rects = {
              reference: Gd($, Nn(x), c.options.strategy === "fixed"),
              popper: Co(x)
            }, c.reset = !1, c.placement = c.options.placement, c.orderedModifiers.forEach(function(B) {
              return c.modifiersData[B.name] = Object.assign({}, B.data);
            });
            for (var E = 0; E < c.orderedModifiers.length; E++) {
              if (c.reset === !0) {
                c.reset = !1, E = -1;
                continue;
              }
              var b = c.orderedModifiers[E], R = b.fn, P = b.options, D = P === void 0 ? {} : P, F = b.name;
              typeof R == "function" && (c = R({
                state: c,
                options: D,
                name: F,
                instance: g
              }) || c);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Wd(function() {
        return new Promise(function(v) {
          g.forceUpdate(), v(c);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Li(a, l))
      return g;
    g.setOptions(d).then(function(v) {
      !f && d.onFirstUpdate && d.onFirstUpdate(v);
    });
    function h() {
      c.orderedModifiers.forEach(function(v) {
        var y = v.name, $ = v.options, x = $ === void 0 ? {} : $, E = v.effect;
        if (typeof E == "function") {
          var b = E({
            state: c,
            name: y,
            instance: g,
            options: x
          }), R = function() {
          };
          p.push(b || R);
        }
      });
    }
    function m() {
      p.forEach(function(v) {
        return v();
      }), p = [];
    }
    return g;
  };
}
var Kd = [yd, Fd, vd, sd, Ad, Pd, Bd, fd, _d], Jd = /* @__PURE__ */ Yd({
  defaultModifiers: Kd
});
const sa = "Popper";
function Zd(e) {
  return Ks(sa, e);
}
Nc(sa, ["root"]);
const Qd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], ep = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function tp(e, t) {
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
function er(e) {
  return typeof e == "function" ? e() : e;
}
function ur(e) {
  return e.nodeType !== void 0;
}
function np(e) {
  return !ur(e);
}
const rp = () => at({
  root: ["root"]
}, Sc(Zd)), op = {}, ip = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: a,
    modifiers: l,
    open: d,
    placement: c,
    popperOptions: p,
    popperRef: f,
    slotProps: g = {},
    slots: h = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = fe(t, Qd), y = S.useRef(null), $ = Ge(y, n), x = S.useRef(null), E = Ge(x, f), b = S.useRef(E);
  kt(() => {
    b.current = E;
  }, [E]), S.useImperativeHandle(f, () => x.current, []);
  const R = tp(c, s), [P, D] = S.useState(R), [F, B] = S.useState(er(o));
  S.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), S.useEffect(() => {
    o && B(er(o));
  }, [o]), kt(() => {
    if (!F || !d)
      return;
    const A = (K) => {
      D(K.placement);
    };
    if (process.env.NODE_ENV !== "production" && F && ur(F) && F.nodeType === 1) {
      const K = F.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && K.top === 0 && K.left === 0 && K.right === 0 && K.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let I = [{
      name: "preventOverflow",
      options: {
        altBoundary: a
      }
    }, {
      name: "flip",
      options: {
        altBoundary: a
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: K
      }) => {
        A(K);
      }
    }];
    l != null && (I = I.concat(l)), p && p.modifiers != null && (I = I.concat(p.modifiers));
    const j = Jd(F, y.current, T({
      placement: R
    }, p, {
      modifiers: I
    }));
    return b.current(j), () => {
      j.destroy(), b.current(null);
    };
  }, [F, a, l, d, p, R]);
  const N = {
    placement: P
  };
  m !== null && (N.TransitionProps = m);
  const C = rp(), k = (r = h.root) != null ? r : "div", _ = Tt({
    elementType: k,
    externalSlotProps: g.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: $
    },
    ownerState: t,
    className: C.root
  });
  return /* @__PURE__ */ w(k, T({}, _, {
    children: typeof i == "function" ? i(N) : i
  }));
}), aa = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: a = !1,
    keepMounted: l = !1,
    modifiers: d,
    open: c,
    placement: p = "bottom",
    popperOptions: f = op,
    popperRef: g,
    style: h,
    transition: m = !1,
    slotProps: v = {},
    slots: y = {}
  } = t, $ = fe(t, ep), [x, E] = S.useState(!0), b = () => {
    E(!1);
  }, R = () => {
    E(!0);
  };
  if (!l && !c && (!m || x))
    return null;
  let P;
  if (i)
    P = i;
  else if (r) {
    const B = er(r);
    P = B && ur(B) ? Te(B).body : Te(null).body;
  }
  const D = !c && l && (!m || x) ? "none" : void 0, F = m ? {
    in: c,
    onEnter: b,
    onExited: R
  } : void 0;
  return /* @__PURE__ */ w(En, {
    disablePortal: a,
    container: P,
    children: /* @__PURE__ */ w(ip, T({
      anchorEl: r,
      direction: s,
      disablePortal: a,
      modifiers: d,
      ref: n,
      open: m ? !x : c,
      placement: p,
      popperOptions: f,
      popperRef: g,
      slotProps: v,
      slots: y
    }, $, {
      style: T({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: D
      }, h),
      TransitionProps: F,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (aa.propTypes = {
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
  anchorEl: Zt(u.oneOfType([ot, u.object, u.func]), (e) => {
    if (e.open) {
      const t = er(e.anchorEl);
      if (t && ur(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || np(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: u.oneOfType([u.node, u.func]),
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
  container: u.oneOfType([ot, u.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: u.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: u.arrayOf(u.shape({
    data: u.object,
    effect: u.func,
    enabled: u.bool,
    fn: u.func,
    name: u.any,
    options: u.object,
    phase: u.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: u.arrayOf(u.string),
    requiresIfExists: u.arrayOf(u.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: u.shape({
    modifiers: u.array,
    onFirstUpdate: u.func,
    placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: u.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: xo,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: u.shape({
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: u.bool
});
const sp = ["values", "unit", "step"], ap = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => T({}, n, {
    [r.key]: r.val
  }), {});
};
function lp(e) {
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
  } = e, o = fe(e, sp), i = ap(t), s = Object.keys(i);
  function a(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n})`;
  }
  function l(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${n})`;
  }
  function d(f, g) {
    const h = s.indexOf(g);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n}) and (max-width:${(h !== -1 && typeof t[s[h]] == "number" ? t[s[h]] : g) - r / 100}${n})`;
  }
  function c(f) {
    return s.indexOf(f) + 1 < s.length ? d(f, s[s.indexOf(f) + 1]) : a(f);
  }
  function p(f) {
    const g = s.indexOf(f);
    return g === 0 ? a(s[1]) : g === s.length - 1 ? l(s[g]) : d(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return T({
    keys: s,
    values: i,
    up: a,
    down: l,
    between: d,
    only: c,
    not: p,
    unit: n
  }, o);
}
const up = {
  borderRadius: 4
}, cp = up, dp = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {}, vt = dp;
function wn(e, t) {
  return t ? rt(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const No = {
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
}, Bi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${No[e]}px)`
};
function st(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Bi;
    return t.reduce((s, a, l) => (s[i.up(i.keys[l])] = n(t[l]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Bi;
    return Object.keys(t).reduce((s, a) => {
      if (Object.keys(i.values || No).indexOf(a) !== -1) {
        const l = i.up(a);
        s[l] = n(t[a], a);
      } else {
        const l = a;
        s[l] = t[l];
      }
      return s;
    }, {});
  }
  return n(t);
}
function pp(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function fp(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function cr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function tr(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = cr(e, n) || r, t && (o = t(o, r, e)), o;
}
function xe(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const a = s[t], l = s.theme, d = cr(l, r) || {};
    return st(s, a, (p) => {
      let f = tr(d, o, p);
      return p === f && typeof p == "string" && (f = tr(d, o, `${t}${p === "default" ? "" : Ke(p)}`, p)), n === !1 ? f : {
        [n]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: vt
  } : {}, i.filterProps = [t], i;
}
function gp(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const mp = {
  m: "margin",
  p: "padding"
}, hp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ji = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, vp = gp((e) => {
  if (e.length > 2)
    if (ji[e])
      e = ji[e];
    else
      return [e];
  const [t, n] = e.split(""), r = mp[t], o = hp[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), dr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], pr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], bp = [...dr, ...pr];
function Pn(e, t, n, r) {
  var o;
  const i = (o = cr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function la(e) {
  return Pn(e, "spacing", 8, "spacing");
}
function $n(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function yp(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = $n(t, n), r), {});
}
function wp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = vp(n), i = yp(o, r), s = e[n];
  return st(e, s, i);
}
function ua(e, t) {
  const n = la(e.theme);
  return Object.keys(e).map((r) => wp(e, t, r, n)).reduce(wn, {});
}
function ve(e) {
  return ua(e, dr);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? dr.reduce((e, t) => (e[t] = vt, e), {}) : {};
ve.filterProps = dr;
function be(e) {
  return ua(e, pr);
}
be.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, t) => (e[t] = vt, e), {}) : {};
be.filterProps = pr;
process.env.NODE_ENV !== "production" && bp.reduce((e, t) => (e[t] = vt, e), {});
function xp(e = 8) {
  if (e.mui)
    return e;
  const t = la({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function fr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? wn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function ze(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function We(e, t) {
  return xe({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Ep = We("border", ze), Sp = We("borderTop", ze), Cp = We("borderRight", ze), Rp = We("borderBottom", ze), kp = We("borderLeft", ze), Tp = We("borderColor"), Op = We("borderTopColor"), Np = We("borderRightColor"), Pp = We("borderBottomColor"), $p = We("borderLeftColor"), _p = We("outline", ze), Mp = We("outlineColor"), gr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Pn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: $n(t, r)
    });
    return st(e, e.borderRadius, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: vt
} : {};
gr.filterProps = ["borderRadius"];
fr(Ep, Sp, Cp, Rp, kp, Tp, Op, Np, Pp, $p, gr, _p, Mp);
const mr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Pn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: $n(t, r)
    });
    return st(e, e.gap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: vt
} : {};
mr.filterProps = ["gap"];
const hr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Pn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: $n(t, r)
    });
    return st(e, e.columnGap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: vt
} : {};
hr.filterProps = ["columnGap"];
const vr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Pn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: $n(t, r)
    });
    return st(e, e.rowGap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: vt
} : {};
vr.filterProps = ["rowGap"];
const Ip = xe({
  prop: "gridColumn"
}), Ap = xe({
  prop: "gridRow"
}), Dp = xe({
  prop: "gridAutoFlow"
}), Fp = xe({
  prop: "gridAutoColumns"
}), Vp = xe({
  prop: "gridAutoRows"
}), Lp = xe({
  prop: "gridTemplateColumns"
}), Bp = xe({
  prop: "gridTemplateRows"
}), jp = xe({
  prop: "gridTemplateAreas"
}), zp = xe({
  prop: "gridArea"
});
fr(mr, hr, vr, Ip, Ap, Dp, Fp, Vp, Lp, Bp, jp, zp);
function Ht(e, t) {
  return t === "grey" ? t : e;
}
const Hp = xe({
  prop: "color",
  themeKey: "palette",
  transform: Ht
}), Gp = xe({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ht
}), Up = xe({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ht
});
fr(Hp, Gp, Up);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const qp = xe({
  prop: "width",
  transform: Ve
}), Po = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || No[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ve(n)
      };
    };
    return st(e, e.maxWidth, t);
  }
  return null;
};
Po.filterProps = ["maxWidth"];
const Wp = xe({
  prop: "minWidth",
  transform: Ve
}), Xp = xe({
  prop: "height",
  transform: Ve
}), Yp = xe({
  prop: "maxHeight",
  transform: Ve
}), Kp = xe({
  prop: "minHeight",
  transform: Ve
});
xe({
  prop: "size",
  cssProperty: "width",
  transform: Ve
});
xe({
  prop: "size",
  cssProperty: "height",
  transform: Ve
});
const Jp = xe({
  prop: "boxSizing"
});
fr(qp, Po, Wp, Xp, Yp, Kp, Jp);
const Zp = {
  // borders
  border: {
    themeKey: "borders",
    transform: ze
  },
  borderTop: {
    themeKey: "borders",
    transform: ze
  },
  borderRight: {
    themeKey: "borders",
    transform: ze
  },
  borderBottom: {
    themeKey: "borders",
    transform: ze
  },
  borderLeft: {
    themeKey: "borders",
    transform: ze
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
    transform: ze
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: gr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ht
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ht
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ht
  },
  // spacing
  p: {
    style: be
  },
  pt: {
    style: be
  },
  pr: {
    style: be
  },
  pb: {
    style: be
  },
  pl: {
    style: be
  },
  px: {
    style: be
  },
  py: {
    style: be
  },
  padding: {
    style: be
  },
  paddingTop: {
    style: be
  },
  paddingRight: {
    style: be
  },
  paddingBottom: {
    style: be
  },
  paddingLeft: {
    style: be
  },
  paddingX: {
    style: be
  },
  paddingY: {
    style: be
  },
  paddingInline: {
    style: be
  },
  paddingInlineStart: {
    style: be
  },
  paddingInlineEnd: {
    style: be
  },
  paddingBlock: {
    style: be
  },
  paddingBlockStart: {
    style: be
  },
  paddingBlockEnd: {
    style: be
  },
  m: {
    style: ve
  },
  mt: {
    style: ve
  },
  mr: {
    style: ve
  },
  mb: {
    style: ve
  },
  ml: {
    style: ve
  },
  mx: {
    style: ve
  },
  my: {
    style: ve
  },
  margin: {
    style: ve
  },
  marginTop: {
    style: ve
  },
  marginRight: {
    style: ve
  },
  marginBottom: {
    style: ve
  },
  marginLeft: {
    style: ve
  },
  marginX: {
    style: ve
  },
  marginY: {
    style: ve
  },
  marginInline: {
    style: ve
  },
  marginInlineStart: {
    style: ve
  },
  marginInlineEnd: {
    style: ve
  },
  marginBlock: {
    style: ve
  },
  marginBlockStart: {
    style: ve
  },
  marginBlockEnd: {
    style: ve
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
    style: mr
  },
  rowGap: {
    style: vr
  },
  columnGap: {
    style: hr
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
    transform: Ve
  },
  maxWidth: {
    style: Po
  },
  minWidth: {
    transform: Ve
  },
  height: {
    transform: Ve
  },
  maxHeight: {
    transform: Ve
  },
  minHeight: {
    transform: Ve
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
}, $o = Zp;
function Qp(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function ef(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function tf() {
  function e(n, r, o, i) {
    const s = {
      [n]: r,
      theme: o
    }, a = i[n];
    if (!a)
      return {
        [n]: r
      };
    const {
      cssProperty: l = n,
      themeKey: d,
      transform: c,
      style: p
    } = a;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const f = cr(o, d) || {};
    return p ? p(s) : st(s, r, (h) => {
      let m = tr(f, c, h);
      return h === m && typeof h == "string" && (m = tr(f, c, `${n}${h === "default" ? "" : Ke(h)}`, h)), l === !1 ? m : {
        [l]: m
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
    const s = (r = i.unstable_sxConfig) != null ? r : $o;
    function a(l) {
      let d = l;
      if (typeof l == "function")
        d = l(i);
      else if (typeof l != "object")
        return l;
      if (!d)
        return null;
      const c = pp(i.breakpoints), p = Object.keys(c);
      let f = c;
      return Object.keys(d).forEach((g) => {
        const h = ef(d[g], i);
        if (h != null)
          if (typeof h == "object")
            if (s[g])
              f = wn(f, e(g, h, i, s));
            else {
              const m = st({
                theme: i
              }, h, (v) => ({
                [g]: v
              }));
              Qp(m, h) ? f[g] = t({
                sx: h,
                theme: i
              }) : f = wn(f, m);
            }
          else
            f = wn(f, e(g, h, i, s));
      }), fp(p, f);
    }
    return Array.isArray(o) ? o.map(a) : a(o);
  }
  return t;
}
const ca = tf();
ca.filterProps = ["sx"];
const _o = ca;
function nf(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const rf = ["breakpoints", "palette", "spacing", "shape"];
function Mo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = fe(e, rf), a = lp(n), l = xp(o);
  let d = rt({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: T({
      mode: "light"
    }, r),
    spacing: l,
    shape: T({}, cp, i)
  }, s);
  return d.applyStyles = nf, d = t.reduce((c, p) => rt(c, p), d), d.unstable_sxConfig = T({}, $o, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(p) {
    return _o({
      sx: p,
      theme: this
    });
  }, d;
}
function of(e) {
  return Object.keys(e).length === 0;
}
function da(e = null) {
  const t = S.useContext(Yl);
  return !t || of(t) ? e : t;
}
const sf = Mo();
function pa(e = sf) {
  return da(e);
}
const af = ["ownerState"], lf = ["variants"], uf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function cf(e) {
  return Object.keys(e).length === 0;
}
function df(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function qn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const pf = Mo(), zi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ln({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return cf(t) ? e : t[n] || t;
}
function ff(e) {
  return e ? (t, n) => n[e] : null;
}
function Wn(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, af);
  const o = typeof e == "function" ? e(T({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Wn(i, T({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let a = fe(o, lf);
    return i.forEach((l) => {
      let d = !0;
      typeof l.props == "function" ? d = l.props(T({
        ownerState: n
      }, r, n)) : Object.keys(l.props).forEach((c) => {
        (n == null ? void 0 : n[c]) !== l.props[c] && r[c] !== l.props[c] && (d = !1);
      }), d && (Array.isArray(a) || (a = [a]), a.push(typeof l.style == "function" ? l.style(T({
        ownerState: n
      }, r, n)) : l.style));
    }), a;
  }
  return o;
}
function gf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = pf,
    rootShouldForwardProp: r = qn,
    slotShouldForwardProp: o = qn
  } = e, i = (s) => _o(T({}, s, {
    theme: Ln(T({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, a = {}) => {
    Kl(s, (b) => b.filter((R) => !(R != null && R.__mui_systemSx)));
    const {
      name: l,
      slot: d,
      skipVariantsResolver: c,
      skipSx: p,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = ff(zi(d))
    } = a, g = fe(a, uf), h = c !== void 0 ? c : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), m = p || !1;
    let v;
    process.env.NODE_ENV !== "production" && l && (v = `${l}-${zi(d || "Root")}`);
    let y = qn;
    d === "Root" || d === "root" ? y = r : d ? y = o : df(s) && (y = void 0);
    const $ = Xl(s, T({
      shouldForwardProp: y,
      label: v
    }, g)), x = (b) => typeof b == "function" && b.__emotion_real !== b || Et(b) ? (R) => Wn(b, T({}, R, {
      theme: Ln({
        theme: R.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : b, E = (b, ...R) => {
      let P = x(b);
      const D = R ? R.map(x) : [];
      l && f && D.push((N) => {
        const C = Ln(T({}, N, {
          defaultTheme: n,
          themeId: t
        }));
        if (!C.components || !C.components[l] || !C.components[l].styleOverrides)
          return null;
        const k = C.components[l].styleOverrides, _ = {};
        return Object.entries(k).forEach(([A, I]) => {
          _[A] = Wn(I, T({}, N, {
            theme: C
          }));
        }), f(N, _);
      }), l && !h && D.push((N) => {
        var C;
        const k = Ln(T({}, N, {
          defaultTheme: n,
          themeId: t
        })), _ = k == null || (C = k.components) == null || (C = C[l]) == null ? void 0 : C.variants;
        return Wn({
          variants: _
        }, T({}, N, {
          theme: k
        }));
      }), m || D.push(i);
      const F = D.length - R.length;
      if (Array.isArray(b) && F > 0) {
        const N = new Array(F).fill("");
        P = [...b, ...N], P.raw = [...b.raw, ...N];
      }
      const B = $(P, ...D);
      if (process.env.NODE_ENV !== "production") {
        let N;
        l && (N = `${l}${Ke(d || "")}`), N === void 0 && (N = `Styled(${Ju(s)})`), B.displayName = N;
      }
      return s.muiName && (B.muiName = s.muiName), B;
    };
    return $.withConfig && (E.withConfig = $.withConfig), E;
  };
}
function mf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Gs(t.components[n].defaultProps, r);
}
function hf({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = pa(n);
  return r && (o = o[r] || o), mf({
    theme: o,
    name: t,
    props: e
  });
}
function Io(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), wc(e, t, n);
}
function vf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Nt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Nt(vf(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Gt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Gt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function br(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function bf(e) {
  e = Nt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (d, c = (d + n / 30) % 12) => o - i * Math.max(Math.min(c - 3, 9 - c, 1), -1);
  let a = "rgb";
  const l = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", l.push(t[3])), br({
    type: a,
    values: l
  });
}
function Hi(e) {
  e = Nt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Nt(bf(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Gi(e, t) {
  const n = Hi(e), r = Hi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function nr(e, t) {
  return e = Nt(e), t = Io(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, br(e);
}
function yf(e, t) {
  if (e = Nt(e), t = Io(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return br(e);
}
function wf(e, t) {
  if (e = Nt(e), t = Io(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return br(e);
}
function xf(e, t) {
  return T({
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
const Ef = {
  black: "#000",
  white: "#fff"
}, Rn = Ef, Sf = {
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
}, Cf = Sf, Rf = {
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
}, Mt = Rf, kf = {
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
}, It = kf, Tf = {
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
}, ln = Tf, Of = {
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
}, At = Of, Nf = {
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
}, Dt = Nf, Pf = {
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
}, Ft = Pf, $f = ["mode", "contrastThreshold", "tonalOffset"], Ui = {
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
    paper: Rn.white,
    default: Rn.white
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
}, Mr = {
  text: {
    primary: Rn.white,
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
    active: Rn.white,
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
function qi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = wf(e.main, o) : t === "dark" && (e.dark = yf(e.main, i)));
}
function _f(e = "light") {
  return e === "dark" ? {
    main: At[200],
    light: At[50],
    dark: At[400]
  } : {
    main: At[700],
    light: At[400],
    dark: At[800]
  };
}
function Mf(e = "light") {
  return e === "dark" ? {
    main: Mt[200],
    light: Mt[50],
    dark: Mt[400]
  } : {
    main: Mt[500],
    light: Mt[300],
    dark: Mt[700]
  };
}
function If(e = "light") {
  return e === "dark" ? {
    main: It[500],
    light: It[300],
    dark: It[700]
  } : {
    main: It[700],
    light: It[400],
    dark: It[800]
  };
}
function Af(e = "light") {
  return e === "dark" ? {
    main: Dt[400],
    light: Dt[300],
    dark: Dt[700]
  } : {
    main: Dt[700],
    light: Dt[500],
    dark: Dt[900]
  };
}
function Df(e = "light") {
  return e === "dark" ? {
    main: Ft[400],
    light: Ft[300],
    dark: Ft[700]
  } : {
    main: Ft[800],
    light: Ft[500],
    dark: Ft[900]
  };
}
function Ff(e = "light") {
  return e === "dark" ? {
    main: ln[400],
    light: ln[300],
    dark: ln[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ln[500],
    dark: ln[900]
  };
}
function Vf(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, $f), i = e.primary || _f(t), s = e.secondary || Mf(t), a = e.error || If(t), l = e.info || Af(t), d = e.success || Df(t), c = e.warning || Ff(t);
  function p(m) {
    const v = Gi(m, Mr.text.primary) >= n ? Mr.text.primary : Ui.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = Gi(m, v);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const f = ({
    color: m,
    name: v,
    mainShade: y = 500,
    lightShade: $ = 300,
    darkShade: x = 700
  }) => {
    if (m = T({}, m), !m.main && m[y] && (m.main = m[y]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : Gt(11, v ? ` (${v})` : "", y));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Gt(12, v ? ` (${v})` : "", JSON.stringify(m.main)));
    return qi(m, "light", $, r), qi(m, "dark", x, r), m.contrastText || (m.contrastText = p(m.main)), m;
  }, g = {
    dark: Mr,
    light: Ui
  };
  return process.env.NODE_ENV !== "production" && (g[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), rt(T({
    // A collection of common colors.
    common: T({}, Rn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: f({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: f({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: f({
      color: a,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: c,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: d,
      name: "success"
    }),
    // The grey colors.
    grey: Cf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: p,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, g[t]), o);
}
const Lf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Bf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Wi = {
  textTransform: "uppercase"
}, Xi = '"Roboto", "Helvetica", "Arial", sans-serif';
function jf(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Xi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: l = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: c,
    pxToRem: p
  } = n, f = fe(n, Lf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, h = p || ((y) => `${y / d * g}rem`), m = (y, $, x, E, b) => T({
    fontFamily: r,
    fontWeight: y,
    fontSize: h($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === Xi ? {
    letterSpacing: `${Bf(E / $)}em`
  } : {}, b, c), v = {
    h1: m(i, 96, 1.167, -1.5),
    h2: m(i, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(a, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(a, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(a, 14, 1.75, 0.4, Wi),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Wi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return rt(T({
    htmlFontSize: d,
    pxToRem: h,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: l
  }, v), f, {
    clone: !1
    // No need to clone deep
  });
}
const zf = 0.2, Hf = 0.14, Gf = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${zf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Hf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Gf})`].join(",");
}
const Uf = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], qf = Uf, Wf = ["duration", "easing", "delay"], Xf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Yf = {
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
function Yi(e) {
  return `${Math.round(e)}ms`;
}
function Kf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Jf(e) {
  const t = T({}, Xf, e.easing), n = T({}, Yf, e.duration);
  return T({
    getAutoHeightDuration: Kf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: l = 0
      } = i, d = fe(i, Wf);
      if (process.env.NODE_ENV !== "production") {
        const c = (f) => typeof f == "string", p = (f) => !isNaN(parseFloat(f));
        !c(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !p(s) && !c(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), c(a) || console.error('MUI: Argument "easing" must be a string.'), !p(l) && !c(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((c) => `${c} ${typeof s == "string" ? s : Yi(s)} ${a} ${typeof l == "string" ? l : Yi(l)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Zf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Qf = Zf, eg = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function tg(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = fe(e, eg);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Gt(18));
  const a = Vf(r), l = Mo(e);
  let d = rt(l, {
    mixins: xf(l.breakpoints, n),
    palette: a,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: qf.slice(),
    typography: jf(a, i),
    transitions: Jf(o),
    zIndex: T({}, Qf)
  });
  if (d = rt(d, s), d = t.reduce((c, p) => rt(c, p), d), process.env.NODE_ENV !== "production") {
    const c = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], p = (f, g) => {
      let h;
      for (h in f) {
        const m = f[h];
        if (c.indexOf(h) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = Ze("", h);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[h] = {};
        }
      }
    };
    Object.keys(d.components).forEach((f) => {
      const g = d.components[f].styleOverrides;
      g && f.indexOf("Mui") === 0 && p(g, f);
    });
  }
  return d.unstable_sxConfig = T({}, $o, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(p) {
    return _o({
      sx: p,
      theme: this
    });
  }, d;
}
const ng = tg(), Ao = ng, Do = "$$material", fa = (e) => qn(e) && e !== "classes", rg = gf({
  themeId: Do,
  defaultTheme: Ao,
  rootShouldForwardProp: fa
}), Oe = rg;
function _n() {
  const e = pa(Ao);
  return process.env.NODE_ENV !== "production" && S.useDebugValue(e), e[Do] || e;
}
function lt({
  props: e,
  name: t
}) {
  return hf({
    props: e,
    name: t,
    defaultTheme: Ao,
    themeId: Do
  });
}
function ro(e, t) {
  return ro = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, ro(e, t);
}
function og(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ro(e, t);
}
const Ki = {
  disabled: !1
};
var ig = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
  enter: u.number,
  exit: u.number,
  appear: u.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && u.oneOfType([u.string, u.shape({
  enter: u.string,
  exit: u.string,
  active: u.string
}), u.shape({
  enter: u.string,
  enterDone: u.string,
  enterActive: u.string,
  exit: u.string,
  exitDone: u.string,
  exitActive: u.string
})]);
const ga = he.createContext(null);
var sg = function(t) {
  return t.scrollTop;
}, gn = "unmounted", wt = "exited", xt = "entering", jt = "entered", oo = "exiting", ut = /* @__PURE__ */ function(e) {
  og(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, a = s && !s.isMounting ? r.enter : r.appear, l;
    return i.appearStatus = null, r.in ? a ? (l = wt, i.appearStatus = xt) : l = jt : r.unmountOnExit || r.mountOnEnter ? l = gn : l = wt, i.state = {
      status: l
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === gn ? {
      status: wt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== xt && s !== jt && (i = xt) : (s === xt || s === jt) && (i = oo);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, s, a;
    return i = s = a = o, o != null && typeof o != "number" && (i = o.exit, s = o.enter, a = o.appear !== void 0 ? o.appear : s), {
      exit: i,
      enter: s,
      appear: a
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === xt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Dn.findDOMNode(this);
          s && sg(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === wt && this.setState({
        status: gn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, a = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [a] : [Dn.findDOMNode(this), a], d = l[0], c = l[1], p = this.getTimeouts(), f = a ? p.appear : p.enter;
    if (!o && !s || Ki.disabled) {
      this.safeSetState({
        status: jt
      }, function() {
        i.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, c), this.safeSetState({
      status: xt
    }, function() {
      i.props.onEntering(d, c), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: jt
        }, function() {
          i.props.onEntered(d, c);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), a = this.props.nodeRef ? void 0 : Dn.findDOMNode(this);
    if (!i || Ki.disabled) {
      this.safeSetState({
        status: wt
      }, function() {
        o.props.onExited(a);
      });
      return;
    }
    this.props.onExit(a), this.safeSetState({
      status: oo
    }, function() {
      o.props.onExiting(a), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: wt
        }, function() {
          o.props.onExited(a);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, i) {
    i = this.setNextCallback(i), this.setState(o, i);
  }, n.setNextCallback = function(o) {
    var i = this, s = !0;
    return this.nextCallback = function(a) {
      s && (s = !1, i.nextCallback = null, o(a));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Dn.findDOMNode(this), a = o == null && !this.props.addEndListener;
    if (!s || a) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], d = l[0], c = l[1];
      this.props.addEndListener(d, c);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === gn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var a = fe(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ he.createElement(ga.Provider, {
        value: null
      }, typeof s == "function" ? s(o, a) : he.cloneElement(he.Children.only(s), a))
    );
  }, t;
}(he.Component);
ut.contextType = ga;
ut.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: u.shape({
    current: typeof Element > "u" ? u.any : function(e, t, n, r, o, i) {
      var s = e[t];
      return u.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
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
  children: u.oneOfType([u.func.isRequired, u.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: u.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: u.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: u.bool,
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
  appear: u.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: u.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: u.bool,
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
    var n = ig;
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
  addEndListener: u.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: u.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: u.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: u.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: u.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: u.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: u.func
} : {};
function Vt() {
}
ut.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Vt,
  onEntering: Vt,
  onEntered: Vt,
  onExit: Vt,
  onExiting: Vt,
  onExited: Vt
};
ut.UNMOUNTED = gn;
ut.EXITED = wt;
ut.ENTERING = xt;
ut.ENTERED = jt;
ut.EXITING = oo;
const ma = ut, ha = (e) => e.scrollTop;
function rr(e, t) {
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
const ag = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function io(e) {
  return `scale(${e}, ${e ** 2})`;
}
const lg = {
  entering: {
    opacity: 1,
    transform: io(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Ir = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Fo = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: a,
    onEnter: l,
    onEntered: d,
    onEntering: c,
    onExit: p,
    onExited: f,
    onExiting: g,
    style: h,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = ma
  } = t, y = fe(t, ag), $ = pn(), x = S.useRef(), E = _n(), b = S.useRef(null), R = Ge(b, i.ref, n), P = (A) => (I) => {
    if (A) {
      const j = b.current;
      I === void 0 ? A(j) : A(j, I);
    }
  }, D = P(c), F = P((A, I) => {
    ha(A);
    const {
      duration: j,
      delay: K,
      easing: Z
    } = rr({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = E.transitions.getAutoHeightDuration(A.clientHeight), x.current = O) : O = j, A.style.transition = [E.transitions.create("opacity", {
      duration: O,
      delay: K
    }), E.transitions.create("transform", {
      duration: Ir ? O : O * 0.666,
      delay: K,
      easing: Z
    })].join(","), l && l(A, I);
  }), B = P(d), N = P(g), C = P((A) => {
    const {
      duration: I,
      delay: j,
      easing: K
    } = rr({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    m === "auto" ? (Z = E.transitions.getAutoHeightDuration(A.clientHeight), x.current = Z) : Z = I, A.style.transition = [E.transitions.create("opacity", {
      duration: Z,
      delay: j
    }), E.transitions.create("transform", {
      duration: Ir ? Z : Z * 0.666,
      delay: Ir ? j : j || Z * 0.333,
      easing: K
    })].join(","), A.style.opacity = 0, A.style.transform = io(0.75), p && p(A);
  }), k = P(f);
  return /* @__PURE__ */ w(v, T({
    appear: o,
    in: a,
    nodeRef: b,
    onEnter: F,
    onEntered: B,
    onEntering: D,
    onExit: C,
    onExited: k,
    onExiting: N,
    addEndListener: (A) => {
      m === "auto" && $.start(x.current || 0, A), r && r(b.current, A);
    },
    timeout: m === "auto" ? null : m
  }, y, {
    children: (A, I) => /* @__PURE__ */ S.cloneElement(i, T({
      style: T({
        opacity: 0,
        transform: io(0.75),
        visibility: A === "exited" && !a ? "hidden" : void 0
      }, lg[A], h, i.props.style),
      ref: R
    }, I))
  }));
});
process.env.NODE_ENV !== "production" && (Fo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: u.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: u.bool,
  /**
   * A single child content element.
   */
  children: kn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: u.oneOfType([u.shape({
    enter: u.string,
    exit: u.string
  }), u.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: u.bool,
  /**
   * @ignore
   */
  onEnter: u.func,
  /**
   * @ignore
   */
  onEntered: u.func,
  /**
   * @ignore
   */
  onEntering: u.func,
  /**
   * @ignore
   */
  onExit: u.func,
  /**
   * @ignore
   */
  onExited: u.func,
  /**
   * @ignore
   */
  onExiting: u.func,
  /**
   * @ignore
   */
  style: u.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: u.oneOfType([u.oneOf(["auto"]), u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })])
});
Fo.muiSupportAuto = !0;
const so = Fo, ug = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Ji = ug, cg = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], dg = Oe(aa, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), va = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r;
  const o = da(), i = lt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    components: l,
    componentsProps: d,
    container: c,
    disablePortal: p,
    keepMounted: f,
    modifiers: g,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: y,
    transition: $,
    slots: x,
    slotProps: E
  } = i, b = fe(i, cg), R = (r = x == null ? void 0 : x.root) != null ? r : l == null ? void 0 : l.Root, P = T({
    anchorEl: s,
    container: c,
    disablePortal: p,
    keepMounted: f,
    modifiers: g,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: y,
    transition: $
  }, b);
  return /* @__PURE__ */ w(dg, T({
    as: a,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: R
    },
    slotProps: E ?? d
  }, P, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (va.propTypes = {
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
  anchorEl: u.oneOfType([ot, u.object, u.func]),
  /**
   * Popper render function or node.
   */
  children: u.oneOfType([u.node, u.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: u.shape({
    Root: u.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: u.shape({
    root: u.oneOfType([u.func, u.object])
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
  container: u.oneOfType([ot, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: u.arrayOf(u.shape({
    data: u.object,
    effect: u.func,
    enabled: u.bool,
    fn: u.func,
    name: u.any,
    options: u.object,
    phase: u.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: u.arrayOf(u.string),
    requiresIfExists: u.arrayOf(u.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: u.shape({
    modifiers: u.array,
    onFirstUpdate: u.func,
    placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: u.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: xo,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: u.shape({
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: u.bool
});
const ba = va;
function pg(e) {
  return Ze("MuiTooltip", e);
}
const fg = mt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), dt = fg, gg = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function mg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const hg = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ke(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return at(s, pg, t);
}, vg = Oe(ba, {
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
}) => T({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${dt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${dt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${dt.arrow}`]: T({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${dt.arrow}`]: T({}, t.isRtl ? {
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
})), bg = Oe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ke(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => T({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : nr(e.palette.grey[700], 0.92),
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
  lineHeight: `${mg(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${dt.popper}[data-popper-placement*="left"] &`]: T({
    transformOrigin: "right center"
  }, t.isRtl ? T({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : T({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${dt.popper}[data-popper-placement*="right"] &`]: T({
    transformOrigin: "left center"
  }, t.isRtl ? T({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : T({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${dt.popper}[data-popper-placement*="top"] &`]: T({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${dt.popper}[data-popper-placement*="bottom"] &`]: T({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), yg = Oe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : nr(e.palette.grey[700], 0.9),
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
let Bn = !1;
const Zi = new Tn();
let un = {
  x: 0,
  y: 0
};
function jn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const ya = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r, o, i, s, a, l, d, c, p, f, g, h, m, v, y, $, x, E, b;
  const R = lt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: P = !1,
    children: D,
    components: F = {},
    componentsProps: B = {},
    describeChild: N = !1,
    disableFocusListener: C = !1,
    disableHoverListener: k = !1,
    disableInteractive: _ = !1,
    disableTouchListener: A = !1,
    enterDelay: I = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: K = 700,
    followCursor: Z = !1,
    id: O,
    leaveDelay: L = 0,
    leaveTouchDelay: H = 1500,
    onClose: X,
    onOpen: z,
    open: G,
    placement: q = "bottom",
    PopperComponent: W,
    PopperProps: U = {},
    slotProps: Y = {},
    slots: J = {},
    title: ie,
    TransitionComponent: V = so,
    TransitionProps: Q
  } = R, M = fe(R, gg), se = /* @__PURE__ */ S.isValidElement(D) ? D : /* @__PURE__ */ w("span", {
    children: D
  }), Se = _n(), Ne = Se.direction === "rtl", [we, bt] = S.useState(), [Pe, Qe] = S.useState(null), Ae = S.useRef(!1), et = _ || Z, Ce = pn(), Pt = pn(), yt = pn(), Qt = pn(), [Mn, Go] = Vs({
    controlled: G,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = Mn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = S.useRef(G !== void 0);
    S.useEffect(() => {
      we && we.disabled && !ne && ie !== "" && we.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, we, ne]);
  }
  const yr = Fs(O), en = S.useRef(), In = xn(() => {
    en.current !== void 0 && (document.body.style.WebkitUserSelect = en.current, en.current = void 0), Qt.clear();
  });
  S.useEffect(() => In, [In]);
  const Uo = (ne) => {
    Zi.clear(), Bn = !0, Go(!0), z && !tt && z(ne);
  }, An = xn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      Zi.start(800 + L, () => {
        Bn = !1;
      }), Go(!1), X && tt && X(ne), Ce.start(Se.transitions.duration.shortest, () => {
        Ae.current = !1;
      });
    }
  ), wr = (ne) => {
    Ae.current && ne.type !== "touchstart" || (we && we.removeAttribute("title"), Pt.clear(), yt.clear(), I || Bn && j ? Pt.start(Bn ? j : I, () => {
      Uo(ne);
    }) : Uo(ne));
  }, qo = (ne) => {
    Pt.clear(), yt.start(L, () => {
      An(ne);
    });
  }, {
    isFocusVisibleRef: Wo,
    onBlur: il,
    onFocus: sl,
    ref: al
  } = Ls(), [, Xo] = S.useState(!1), Yo = (ne) => {
    il(ne), Wo.current === !1 && (Xo(!1), qo(ne));
  }, Ko = (ne) => {
    we || bt(ne.currentTarget), sl(ne), Wo.current === !0 && (Xo(!0), wr(ne));
  }, Jo = (ne) => {
    Ae.current = !0;
    const De = se.props;
    De.onTouchStart && De.onTouchStart(ne);
  }, Zo = wr, Qo = qo, ll = (ne) => {
    Jo(ne), yt.clear(), Ce.clear(), In(), en.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Qt.start(K, () => {
      document.body.style.WebkitUserSelect = en.current, wr(ne);
    });
  }, ul = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), In(), yt.start(H, () => {
      An(ne);
    });
  };
  S.useEffect(() => {
    if (!tt)
      return;
    function ne(De) {
      (De.key === "Escape" || De.key === "Esc") && An(De);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [An, tt]);
  const cl = Ge(se.ref, al, bt, n);
  !ie && ie !== 0 && (tt = !1);
  const xr = S.useRef(), dl = (ne) => {
    const De = se.props;
    De.onMouseMove && De.onMouseMove(ne), un = {
      x: ne.clientX,
      y: ne.clientY
    }, xr.current && xr.current.update();
  }, tn = {}, Er = typeof ie == "string";
  N ? (tn.title = !tt && Er && !k ? ie : null, tn["aria-describedby"] = tt ? yr : null) : (tn["aria-label"] = Er ? ie : null, tn["aria-labelledby"] = tt && !Er ? yr : null);
  const je = T({}, tn, M, se.props, {
    className: ke(M.className, se.props.className),
    onTouchStart: Jo,
    ref: cl
  }, Z ? {
    onMouseMove: dl
  } : {});
  process.env.NODE_ENV !== "production" && (je["data-mui-internal-clone-element"] = !0, S.useEffect(() => {
    we && !we.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [we]));
  const nn = {};
  A || (je.onTouchStart = ll, je.onTouchEnd = ul), k || (je.onMouseOver = jn(Zo, je.onMouseOver), je.onMouseLeave = jn(Qo, je.onMouseLeave), et || (nn.onMouseOver = Zo, nn.onMouseLeave = Qo)), C || (je.onFocus = jn(Ko, je.onFocus), je.onBlur = jn(Yo, je.onBlur), et || (nn.onFocus = Ko, nn.onBlur = Yo)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const pl = S.useMemo(() => {
    var ne;
    let De = [{
      name: "arrow",
      enabled: !!Pe,
      options: {
        element: Pe,
        padding: 4
      }
    }];
    return (ne = U.popperOptions) != null && ne.modifiers && (De = De.concat(U.popperOptions.modifiers)), T({}, U.popperOptions, {
      modifiers: De
    });
  }, [Pe, U]), rn = T({}, R, {
    isRtl: Ne,
    arrow: P,
    disableInteractive: et,
    placement: q,
    PopperComponentProp: W,
    touch: Ae.current
  }), Sr = hg(rn), ei = (r = (o = J.popper) != null ? o : F.Popper) != null ? r : vg, ti = (i = (s = (a = J.transition) != null ? a : F.Transition) != null ? s : V) != null ? i : so, ni = (l = (d = J.tooltip) != null ? d : F.Tooltip) != null ? l : bg, ri = (c = (p = J.arrow) != null ? p : F.Arrow) != null ? c : yg, fl = fn(ei, T({}, U, (f = Y.popper) != null ? f : B.popper, {
    className: ke(Sr.popper, U == null ? void 0 : U.className, (g = (h = Y.popper) != null ? h : B.popper) == null ? void 0 : g.className)
  }), rn), gl = fn(ti, T({}, Q, (m = Y.transition) != null ? m : B.transition), rn), ml = fn(ni, T({}, (v = Y.tooltip) != null ? v : B.tooltip, {
    className: ke(Sr.tooltip, (y = ($ = Y.tooltip) != null ? $ : B.tooltip) == null ? void 0 : y.className)
  }), rn), hl = fn(ri, T({}, (x = Y.arrow) != null ? x : B.arrow, {
    className: ke(Sr.arrow, (E = (b = Y.arrow) != null ? b : B.arrow) == null ? void 0 : E.className)
  }), rn);
  return /* @__PURE__ */ oe(S.Fragment, {
    children: [/* @__PURE__ */ S.cloneElement(se, je), /* @__PURE__ */ w(ei, T({
      as: W ?? ba,
      placement: q,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: un.y,
          left: un.x,
          right: un.x,
          bottom: un.y,
          width: 0,
          height: 0
        })
      } : we,
      popperRef: xr,
      open: we ? tt : !1,
      id: yr,
      transition: !0
    }, nn, fl, {
      popperOptions: pl,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ w(ti, T({
        timeout: Se.transitions.duration.shorter
      }, ne, gl, {
        children: /* @__PURE__ */ oe(ni, T({}, ml, {
          children: [ie, P ? /* @__PURE__ */ w(ri, T({}, hl, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (ya.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: u.bool,
  /**
   * Tooltip reference element.
   */
  children: kn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: u.shape({
    Arrow: u.elementType,
    Popper: u.elementType,
    Tooltip: u.elementType,
    Transition: u.elementType
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
  componentsProps: u.shape({
    arrow: u.object,
    popper: u.object,
    tooltip: u.object,
    transition: u.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: u.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: u.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: u.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: u.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: u.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: u.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: u.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: u.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: u.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: u.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: u.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: u.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: u.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: u.func,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: u.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: u.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: u.shape({
    arrow: u.object,
    popper: u.object,
    tooltip: u.object,
    transition: u.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: u.shape({
    arrow: u.elementType,
    popper: u.elementType,
    tooltip: u.elementType,
    transition: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: u.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: u.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: u.object
});
const wg = ya;
var Vo = {}, wa = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(wa);
var xg = wa.exports, Ar = {};
function Eg(e) {
  return Ze("MuiSvgIcon", e);
}
mt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Sg = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Cg = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ke(t)}`, `fontSize${Ke(n)}`]
  };
  return at(o, Eg, r);
}, Rg = Oe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ke(n.color)}`], t[`fontSize${Ke(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, a, l, d, c, p, f, g, h;
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
      medium: ((a = e.typography) == null || (l = a.pxToRem) == null ? void 0 : l.call(a, 24)) || "1.5rem",
      large: ((d = e.typography) == null || (c = d.pxToRem) == null ? void 0 : c.call(d, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (p = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? p : {
      action: (g = (e.vars || e).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Lo = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: a = "svg",
    fontSize: l = "medium",
    htmlColor: d,
    inheritViewBox: c = !1,
    titleAccess: p,
    viewBox: f = "0 0 24 24"
  } = r, g = fe(r, Sg), h = /* @__PURE__ */ S.isValidElement(o) && o.type === "svg", m = T({}, r, {
    color: s,
    component: a,
    fontSize: l,
    instanceFontSize: t.fontSize,
    inheritViewBox: c,
    viewBox: f,
    hasSvgAsChild: h
  }), v = {};
  c || (v.viewBox = f);
  const y = Cg(m);
  return /* @__PURE__ */ oe(Rg, T({
    as: a,
    className: ke(y.root, i),
    focusable: "false",
    color: d,
    "aria-hidden": p ? void 0 : !0,
    role: p ? "img" : void 0,
    ref: n
  }, v, g, h && o.props, {
    ownerState: m,
    children: [h ? o.props.children : o, p ? /* @__PURE__ */ w("title", {
      children: p
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Lo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: u.oneOfType([u.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), u.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: u.oneOfType([u.oneOf(["inherit", "large", "medium", "small"]), u.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: u.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: u.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: u.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: u.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: u.string
});
Lo.muiName = "SvgIcon";
const Qi = Lo;
function xa(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ w(Qi, T({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Qi.muiName, /* @__PURE__ */ S.memo(/* @__PURE__ */ S.forwardRef(n));
}
const kg = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Us.configure(e);
  }
}, Tg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ke,
  createChainedFunction: Zr,
  createSvgIcon: xa,
  debounce: Ds,
  deprecatedPropType: Qu,
  isMuiElement: ec,
  ownerDocument: Te,
  ownerWindow: Ut,
  requirePropFactory: tc,
  setRef: Jn,
  unstable_ClassNameGenerator: kg,
  unstable_useEnhancedEffect: kt,
  unstable_useId: Fs,
  unsupportedProp: oc,
  useControlled: Vs,
  useEventCallback: xn,
  useForkRef: Ge,
  useIsFocusVisible: Ls
}, Symbol.toStringTag, { value: "Module" })), Og = /* @__PURE__ */ _u(Tg);
var es;
function Ng() {
  return es || (es = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Og;
  }(Ar)), Ar;
}
var Pg = xg;
Object.defineProperty(Vo, "__esModule", {
  value: !0
});
var Ea = Vo.default = void 0, $g = Pg(Ng()), _g = yl;
Ea = Vo.default = (0, $g.default)(/* @__PURE__ */ (0, _g.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ts(e, t, n) {
  return e ? /* @__PURE__ */ w(ms, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ w("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Sa(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: a = !1,
    className: l,
    isDisabled: d = !1,
    isDense: c = !0,
    isSubMenuParent: p = !1,
    hasDisabledGutters: f = !1,
    hasDivider: g = !1,
    focusVisibleClassName: h,
    id: m,
    children: v
  } = e, y = /* @__PURE__ */ w(
    Fl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: l,
      disabled: d,
      dense: c,
      disableGutters: f,
      divider: g,
      focusVisibleClassName: h,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ oe(sr, { children: [
        ts(i, n, !0),
        /* @__PURE__ */ w(Vl, { primary: n, inset: !i && o }),
        p ? /* @__PURE__ */ w(ms, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ w(Ea, {}) }) : ts(s, n, !1)
      ] }) : v
    }
  );
  return r ? /* @__PURE__ */ w(wg, { title: r, placement: "right", children: /* @__PURE__ */ w("div", { children: y }) }) : y;
}
function Ca(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Mg(e) {
  const [t, n] = Ee(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (d) => {
    n(d.currentTarget);
  }, a = () => {
    n(void 0);
  }, l = () => {
    let d = Ca(i).filter((c) => "menuItem" in c.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (c) => "menuItem" in c.group && c.group.menuItem === r.id
    ), /* @__PURE__ */ w(Bo, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ oe(sr, { children: [
    /* @__PURE__ */ w(Sa, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ w(
      Ll,
      {
        anchorEl: t,
        open: !!t,
        onClose: a,
        anchorOrigin: {
          vertical: "top",
          horizontal: "right"
        },
        transformOrigin: {
          vertical: "top",
          horizontal: "left"
        },
        children: l()
      },
      r.id
    )
  ] });
}
const Ig = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Bo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Kt(() => {
    const c = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ca(t).filter((h) => !("menuItem" in h.group))
    ), p = Object.values(c).sort(
      (h, m) => (h.group.order || 0) - (m.group.order || 0)
    ), f = [];
    p.forEach((h) => {
      Ig(h.id, t.items).forEach(
        (m) => f.push({ item: m, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const g = f.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: f, allowForLeadingIcons: g };
  }, [o, t]), a = ({ item: c, isLastItemInGroup: p }) => ({
    className: "papi-menu-item",
    label: c.label,
    tooltip: c.tooltip,
    iconPathBefore: "iconPathBefore" in c ? c.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in c ? c.iconPathAfter : void 0,
    hasDivider: p,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [l] = i;
  if (!l)
    return /* @__PURE__ */ w("div", {});
  const d = l.item.group;
  return /* @__PURE__ */ w("div", { role: "menu", "aria-label": d, children: i.map((c, p) => {
    const { item: f } = c, g = a(c);
    if ("command" in f) {
      const h = f.group + p;
      return /* @__PURE__ */ w(
        Sa,
        {
          onClick: (m) => {
            n == null || n(m), r(f);
          },
          ...g
        },
        h
      );
    }
    return /* @__PURE__ */ w(
      Mg,
      {
        parentMenuItem: f,
        parentItemProps: g,
        ...e
      },
      d + f.id
    );
  }) }, d);
}
function Ag(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, a]) => ({ id: s, group: a })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ w(Bo, { ...e, includedGroups: i });
}
function Dg({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ oe(
    hs,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ w("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ w(Bl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ w(
          Ag,
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
function Fg({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Kt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((a) => {
      if (a === "isExtensible")
        return;
      const l = a, d = o[l];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? s.set(d.order, { id: l, metadata: d }) : console.warn(
        `Property ${a} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((a, l) => (a.metadata.order || 0) - (l.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ w(
    hs,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, a) => /* @__PURE__ */ w(
        Dg,
        {
          commandHandler: e,
          menuDefinition: n,
          ...s,
          className: t
        },
        a
      ))
    }
  );
}
const Ra = /* @__PURE__ */ S.createContext({});
process.env.NODE_ENV !== "production" && (Ra.displayName = "ListContext");
const Vg = Ra;
function Lg(e) {
  return Ze("MuiList", e);
}
mt("MuiList", ["root", "padding", "dense", "subheader"]);
const Bg = ["children", "className", "component", "dense", "disablePadding", "subheader"], jg = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return at({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Lg, t);
}, zg = Oe("ul", {
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
}) => T({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), ka = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: a = !1,
    disablePadding: l = !1,
    subheader: d
  } = r, c = fe(r, Bg), p = S.useMemo(() => ({
    dense: a
  }), [a]), f = T({}, r, {
    component: s,
    dense: a,
    disablePadding: l
  }), g = jg(f);
  return /* @__PURE__ */ w(Vg.Provider, {
    value: p,
    children: /* @__PURE__ */ oe(zg, T({
      as: s,
      className: ke(g.root, i),
      ref: n,
      ownerState: f
    }, c, {
      children: [d, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ka.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: u.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: u.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: u.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object])
});
const Hg = ka, Gg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Dr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ns(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ta(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function cn(e, t, n, r, o, i) {
  let s = !1, a = o(e, t, t ? n : !1);
  for (; a; ) {
    if (a === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const l = r ? !1 : a.disabled || a.getAttribute("aria-disabled") === "true";
    if (!a.hasAttribute("tabindex") || !Ta(a, i) || l)
      a = o(e, a, n);
    else
      return a.focus(), !0;
  }
  return !1;
}
const Oa = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: a,
    disabledItemsFocusable: l = !1,
    disableListWrap: d = !1,
    onKeyDown: c,
    variant: p = "selectedMenu"
  } = t, f = fe(t, Gg), g = S.useRef(null), h = S.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  kt(() => {
    o && g.current.focus();
  }, [o]), S.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (x, E) => {
      const b = !g.current.style.width;
      if (x.clientHeight < g.current.clientHeight && b) {
        const R = `${Bs(Te(x))}px`;
        g.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = R, g.current.style.width = `calc(100% + ${R})`;
      }
      return g.current;
    }
  }), []);
  const m = (x) => {
    const E = g.current, b = x.key, R = Te(E).activeElement;
    if (b === "ArrowDown")
      x.preventDefault(), cn(E, R, d, l, Dr);
    else if (b === "ArrowUp")
      x.preventDefault(), cn(E, R, d, l, ns);
    else if (b === "Home")
      x.preventDefault(), cn(E, null, d, l, Dr);
    else if (b === "End")
      x.preventDefault(), cn(E, null, d, l, ns);
    else if (b.length === 1) {
      const P = h.current, D = b.toLowerCase(), F = performance.now();
      P.keys.length > 0 && (F - P.lastTime > 500 ? (P.keys = [], P.repeating = !0, P.previousKeyMatched = !0) : P.repeating && D !== P.keys[0] && (P.repeating = !1)), P.lastTime = F, P.keys.push(D);
      const B = R && !P.repeating && Ta(R, P);
      P.previousKeyMatched && (B || cn(E, R, !1, l, Dr, P)) ? x.preventDefault() : P.previousKeyMatched = !1;
    }
    c && c(x);
  }, v = Ge(g, n);
  let y = -1;
  S.Children.forEach(s, (x, E) => {
    if (!/* @__PURE__ */ S.isValidElement(x)) {
      y === E && (y += 1, y >= s.length && (y = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Kn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (p === "selectedMenu" && x.props.selected || y === -1) && (y = E), y === E && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (y += 1, y >= s.length && (y = -1));
  });
  const $ = S.Children.map(s, (x, E) => {
    if (E === y) {
      const b = {};
      return i && (b.autoFocus = !0), x.props.tabIndex === void 0 && p === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ S.cloneElement(x, b);
    }
    return x;
  });
  return /* @__PURE__ */ w(Hg, T({
    role: "menu",
    ref: v,
    className: a,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, f, {
    children: $
  }));
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: u.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: u.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: u.node,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: u.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: u.bool,
  /**
   * @ignore
   */
  onKeyDown: u.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: u.oneOf(["menu", "selectedMenu"])
});
const Ug = Oa, qg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Wg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Na = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const r = _n(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: a,
    easing: l,
    in: d,
    onEnter: c,
    onEntered: p,
    onEntering: f,
    onExit: g,
    onExited: h,
    onExiting: m,
    style: v,
    timeout: y = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: $ = ma
  } = t, x = fe(t, qg), E = S.useRef(null), b = Ge(E, a.ref, n), R = (_) => (A) => {
    if (_) {
      const I = E.current;
      A === void 0 ? _(I) : _(I, A);
    }
  }, P = R(f), D = R((_, A) => {
    ha(_);
    const I = rr({
      style: v,
      timeout: y,
      easing: l
    }, {
      mode: "enter"
    });
    _.style.webkitTransition = r.transitions.create("opacity", I), _.style.transition = r.transitions.create("opacity", I), c && c(_, A);
  }), F = R(p), B = R(m), N = R((_) => {
    const A = rr({
      style: v,
      timeout: y,
      easing: l
    }, {
      mode: "exit"
    });
    _.style.webkitTransition = r.transitions.create("opacity", A), _.style.transition = r.transitions.create("opacity", A), g && g(_);
  }), C = R(h);
  return /* @__PURE__ */ w($, T({
    appear: s,
    in: d,
    nodeRef: E,
    onEnter: D,
    onEntered: F,
    onEntering: P,
    onExit: N,
    onExited: C,
    onExiting: B,
    addEndListener: (_) => {
      i && i(E.current, _);
    },
    timeout: y
  }, x, {
    children: (_, A) => /* @__PURE__ */ S.cloneElement(a, T({
      style: T({
        opacity: 0,
        visibility: _ === "exited" && !d ? "hidden" : void 0
      }, Wg[_], v, a.props.style),
      ref: b
    }, A))
  }));
});
process.env.NODE_ENV !== "production" && (Na.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: u.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: u.bool,
  /**
   * A single child content element.
   */
  children: kn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: u.oneOfType([u.shape({
    enter: u.string,
    exit: u.string
  }), u.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: u.bool,
  /**
   * @ignore
   */
  onEnter: u.func,
  /**
   * @ignore
   */
  onEntered: u.func,
  /**
   * @ignore
   */
  onEntering: u.func,
  /**
   * @ignore
   */
  onExit: u.func,
  /**
   * @ignore
   */
  onExited: u.func,
  /**
   * @ignore
   */
  onExiting: u.func,
  /**
   * @ignore
   */
  style: u.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: u.oneOfType([u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })])
});
const Xg = Na;
function Yg(e) {
  return Ze("MuiBackdrop", e);
}
mt("MuiBackdrop", ["root", "invisible"]);
const Kg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Jg = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return at({
    root: ["root", n && "invisible"]
  }, Yg, t);
}, Zg = Oe("div", {
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
}) => T({
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
})), Pa = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r, o, i;
  const s = lt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: a,
    className: l,
    component: d = "div",
    components: c = {},
    componentsProps: p = {},
    invisible: f = !1,
    open: g,
    slotProps: h = {},
    slots: m = {},
    TransitionComponent: v = Xg,
    transitionDuration: y
  } = s, $ = fe(s, Kg), x = T({}, s, {
    component: d,
    invisible: f
  }), E = Jg(x), b = (r = h.root) != null ? r : p.root;
  return /* @__PURE__ */ w(v, T({
    in: g,
    timeout: y
  }, $, {
    children: /* @__PURE__ */ w(Zg, T({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = m.root) != null ? i : c.Root) != null ? o : d,
      className: ke(E.root, l, b == null ? void 0 : b.className),
      ownerState: T({}, x, b == null ? void 0 : b.ownerState),
      classes: E,
      ref: n,
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Pa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: u.shape({
    Root: u.elementType
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
  componentsProps: u.shape({
    root: u.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: u.bool,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: u.shape({
    root: u.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: u.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: u.oneOfType([u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })])
});
const Qg = Pa;
function em(e) {
  return Ze("MuiModal", e);
}
mt("MuiModal", ["root", "hidden", "backdrop"]);
const tm = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], nm = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return at({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, em, r);
}, rm = Oe("div", {
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
}) => T({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), om = Oe(Qg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), $a = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r, o, i, s, a, l;
  const d = lt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: c = om,
    BackdropProps: p,
    className: f,
    closeAfterTransition: g = !1,
    children: h,
    container: m,
    component: v,
    components: y = {},
    componentsProps: $ = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: R = !1,
    disableRestoreFocus: P = !1,
    disableScrollLock: D = !1,
    hideBackdrop: F = !1,
    keepMounted: B = !1,
    onBackdropClick: N,
    open: C,
    slotProps: k,
    slots: _
    // eslint-disable-next-line react/prop-types
  } = d, A = fe(d, tm), I = T({}, d, {
    closeAfterTransition: g,
    disableAutoFocus: x,
    disableEnforceFocus: E,
    disableEscapeKeyDown: b,
    disablePortal: R,
    disableRestoreFocus: P,
    disableScrollLock: D,
    hideBackdrop: F,
    keepMounted: B
  }), {
    getRootProps: j,
    getBackdropProps: K,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: L,
    exited: H,
    hasTransition: X
  } = Uc(T({}, I, {
    rootRef: n
  })), z = T({}, I, {
    exited: H
  }), G = nm(z), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), X) {
    const {
      onEnter: Q,
      onExited: M
    } = Z();
    q.onEnter = Q, q.onExited = M;
  }
  const W = (r = (o = _ == null ? void 0 : _.root) != null ? o : y.Root) != null ? r : rm, U = (i = (s = _ == null ? void 0 : _.backdrop) != null ? s : y.Backdrop) != null ? i : c, Y = (a = k == null ? void 0 : k.root) != null ? a : $.root, J = (l = k == null ? void 0 : k.backdrop) != null ? l : $.backdrop, ie = Tt({
    elementType: W,
    externalSlotProps: Y,
    externalForwardedProps: A,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: v
    },
    ownerState: z,
    className: ke(f, Y == null ? void 0 : Y.className, G == null ? void 0 : G.root, !z.open && z.exited && (G == null ? void 0 : G.hidden))
  }), V = Tt({
    elementType: U,
    externalSlotProps: J,
    additionalProps: p,
    getSlotProps: (Q) => K(T({}, Q, {
      onClick: (M) => {
        N && N(M), Q != null && Q.onClick && Q.onClick(M);
      }
    })),
    className: ke(J == null ? void 0 : J.className, p == null ? void 0 : p.className, G == null ? void 0 : G.backdrop),
    ownerState: z
  });
  return !B && !C && (!X || H) ? null : /* @__PURE__ */ w(En, {
    ref: O,
    container: m,
    disablePortal: R,
    children: /* @__PURE__ */ oe(W, T({}, ie, {
      children: [!F && c ? /* @__PURE__ */ w(U, T({}, V)) : null, /* @__PURE__ */ w(Zn, {
        disableEnforceFocus: E,
        disableAutoFocus: x,
        disableRestoreFocus: P,
        isEnabled: L,
        open: C,
        children: /* @__PURE__ */ S.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && ($a.propTypes = {
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
  BackdropComponent: u.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: u.object,
  /**
   * A single child content element.
   */
  children: kn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: u.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: u.shape({
    Backdrop: u.elementType,
    Root: u.elementType
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
  componentsProps: u.shape({
    backdrop: u.oneOfType([u.func, u.object]),
    root: u.oneOfType([u.func, u.object])
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
  container: u.oneOfType([ot, u.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: u.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: u.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: u.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: u.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: u.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: u.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: u.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: u.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: u.func,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: u.shape({
    backdrop: u.oneOfType([u.func, u.object]),
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    backdrop: u.elementType,
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object])
});
const im = $a;
function sm(e) {
  return Ze("MuiPaper", e);
}
mt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const am = ["className", "component", "elevation", "square", "variant"], lm = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return at(i, sm, o);
}, um = Oe("div", {
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
  return T({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && T({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${nr("#fff", Ji(t.elevation))}, ${nr("#fff", Ji(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), _a = /* @__PURE__ */ S.forwardRef(function(t, n) {
  const r = lt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: a = !1,
    variant: l = "elevation"
  } = r, d = fe(r, am), c = T({}, r, {
    component: i,
    elevation: s,
    square: a,
    variant: l
  }), p = lm(c);
  return process.env.NODE_ENV !== "production" && _n().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ w(um, T({
    as: i,
    ownerState: c,
    className: ke(p.root, o),
    ref: n
  }, d));
});
process.env.NODE_ENV !== "production" && (_a.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Zt(Hs, (e) => {
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
  square: u.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: u.oneOfType([u.oneOf(["elevation", "outlined"]), u.string])
});
const cm = _a;
function dm(e) {
  return Ze("MuiPopover", e);
}
mt("MuiPopover", ["root", "paper"]);
const pm = ["onEntering"], fm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], gm = ["slotProps"];
function rs(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function os(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function is(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Xn(e) {
  return typeof e == "function" ? e() : e;
}
const mm = (e) => {
  const {
    classes: t
  } = e;
  return at({
    root: ["root"],
    paper: ["paper"]
  }, dm, t);
}, hm = Oe(im, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ma = Oe(cm, {
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
}), Ia = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r, o, i;
  const s = lt({
    props: t,
    name: "MuiPopover"
  }), {
    action: a,
    anchorEl: l,
    anchorOrigin: d = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: c,
    anchorReference: p = "anchorEl",
    children: f,
    className: g,
    container: h,
    elevation: m = 8,
    marginThreshold: v = 16,
    open: y,
    PaperProps: $ = {},
    slots: x,
    slotProps: E,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: R = so,
    transitionDuration: P = "auto",
    TransitionProps: {
      onEntering: D
    } = {},
    disableScrollLock: F = !1
  } = s, B = fe(s.TransitionProps, pm), N = fe(s, fm), C = (r = E == null ? void 0 : E.paper) != null ? r : $, k = S.useRef(), _ = Ge(k, C.ref), A = T({}, s, {
    anchorOrigin: d,
    anchorReference: p,
    elevation: m,
    marginThreshold: v,
    externalPaperSlotProps: C,
    transformOrigin: b,
    TransitionComponent: R,
    transitionDuration: P,
    TransitionProps: B
  }), I = mm(A), j = S.useCallback(() => {
    if (p === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (c || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), c;
    const Q = Xn(l), M = Q && Q.nodeType === 1 ? Q : Te(k.current).body, se = M.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Se = M.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Se.top === 0 && Se.left === 0 && Se.right === 0 && Se.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + rs(se, d.vertical),
      left: se.left + os(se, d.horizontal)
    };
  }, [l, d.horizontal, d.vertical, c, p]), K = S.useCallback((Q) => ({
    vertical: rs(Q, b.vertical),
    horizontal: os(Q, b.horizontal)
  }), [b.horizontal, b.vertical]), Z = S.useCallback((Q) => {
    const M = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, se = K(M);
    if (p === "none")
      return {
        top: null,
        left: null,
        transformOrigin: is(se)
      };
    const Se = j();
    let Ne = Se.top - se.vertical, we = Se.left - se.horizontal;
    const bt = Ne + M.height, Pe = we + M.width, Qe = Ut(Xn(l)), Ae = Qe.innerHeight - v, et = Qe.innerWidth - v;
    if (v !== null && Ne < v) {
      const Ce = Ne - v;
      Ne -= Ce, se.vertical += Ce;
    } else if (v !== null && bt > Ae) {
      const Ce = bt - Ae;
      Ne -= Ce, se.vertical += Ce;
    }
    if (process.env.NODE_ENV !== "production" && M.height > Ae && M.height && Ae && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${M.height - Ae}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && we < v) {
      const Ce = we - v;
      we -= Ce, se.horizontal += Ce;
    } else if (Pe > et) {
      const Ce = Pe - et;
      we -= Ce, se.horizontal += Ce;
    }
    return {
      top: `${Math.round(Ne)}px`,
      left: `${Math.round(we)}px`,
      transformOrigin: is(se)
    };
  }, [l, p, j, K, v]), [O, L] = S.useState(y), H = S.useCallback(() => {
    const Q = k.current;
    if (!Q)
      return;
    const M = Z(Q);
    M.top !== null && (Q.style.top = M.top), M.left !== null && (Q.style.left = M.left), Q.style.transformOrigin = M.transformOrigin, L(!0);
  }, [Z]);
  S.useEffect(() => (F && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [l, F, H]);
  const X = (Q, M) => {
    D && D(Q, M), H();
  }, z = () => {
    L(!1);
  };
  S.useEffect(() => {
    y && H();
  }), S.useImperativeHandle(a, () => y ? {
    updatePosition: () => {
      H();
    }
  } : null, [y, H]), S.useEffect(() => {
    if (!y)
      return;
    const Q = Ds(() => {
      H();
    }), M = Ut(l);
    return M.addEventListener("resize", Q), () => {
      Q.clear(), M.removeEventListener("resize", Q);
    };
  }, [l, y, H]);
  let G = P;
  P === "auto" && !R.muiSupportAuto && (G = void 0);
  const q = h || (l ? Te(Xn(l)).body : void 0), W = (o = x == null ? void 0 : x.root) != null ? o : hm, U = (i = x == null ? void 0 : x.paper) != null ? i : Ma, Y = Tt({
    elementType: U,
    externalSlotProps: T({}, C, {
      style: O ? C.style : T({}, C.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: _
    },
    ownerState: A,
    className: ke(I.paper, C == null ? void 0 : C.className)
  }), J = Tt({
    elementType: W,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: N,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: y
    },
    ownerState: A,
    className: ke(I.root, g)
  }), {
    slotProps: ie
  } = J, V = fe(J, gm);
  return /* @__PURE__ */ w(W, T({}, V, !Ws(W) && {
    slotProps: ie,
    disableScrollLock: F
  }, {
    children: /* @__PURE__ */ w(R, T({
      appear: !0,
      in: y,
      onEntering: X,
      onExited: z,
      timeout: G
    }, B, {
      children: /* @__PURE__ */ w(U, T({}, Y, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ia.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: xo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Zt(u.oneOfType([ot, u.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Xn(e.anchorEl);
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
  anchorOrigin: u.shape({
    horizontal: u.oneOfType([u.oneOf(["center", "left", "right"]), u.number]).isRequired,
    vertical: u.oneOfType([u.oneOf(["bottom", "center", "top"]), u.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: u.shape({
    left: u.number.isRequired,
    top: u.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: u.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: u.oneOfType([ot, u.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: u.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Hs,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: u.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: u.func,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: u.shape({
    component: Uu
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: u.shape({
    paper: u.oneOfType([u.func, u.object]),
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: u.shape({
    paper: u.elementType,
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
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
  transformOrigin: u.shape({
    horizontal: u.oneOfType([u.oneOf(["center", "left", "right"]), u.number]).isRequired,
    vertical: u.oneOfType([u.oneOf(["bottom", "center", "top"]), u.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: u.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: u.oneOfType([u.oneOf(["auto"]), u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: u.object
});
const vm = Ia;
function bm(e) {
  return Ze("MuiMenu", e);
}
mt("MuiMenu", ["root", "paper", "list"]);
const ym = ["onEntering"], wm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], xm = {
  vertical: "top",
  horizontal: "right"
}, Em = {
  vertical: "top",
  horizontal: "left"
}, Sm = (e) => {
  const {
    classes: t
  } = e;
  return at({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, bm, t);
}, Cm = Oe(vm, {
  shouldForwardProp: (e) => fa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Rm = Oe(Ma, {
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
}), km = Oe(Ug, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Aa = /* @__PURE__ */ S.forwardRef(function(t, n) {
  var r, o;
  const i = lt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: a,
    className: l,
    disableAutoFocusItem: d = !1,
    MenuListProps: c = {},
    onClose: p,
    open: f,
    PaperProps: g = {},
    PopoverClasses: h,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: y = "selectedMenu",
    slots: $ = {},
    slotProps: x = {}
  } = i, E = fe(i.TransitionProps, ym), b = fe(i, wm), R = _n(), P = R.direction === "rtl", D = T({}, i, {
    autoFocus: s,
    disableAutoFocusItem: d,
    MenuListProps: c,
    onEntering: v,
    PaperProps: g,
    transitionDuration: m,
    TransitionProps: E,
    variant: y
  }), F = Sm(D), B = s && !d && f, N = S.useRef(null), C = (Z, O) => {
    N.current && N.current.adjustStyleForScrollbar(Z, R), v && v(Z, O);
  }, k = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), p && p(Z, "tabKeyDown"));
  };
  let _ = -1;
  S.Children.map(a, (Z, O) => {
    /* @__PURE__ */ S.isValidElement(Z) && (process.env.NODE_ENV !== "production" && Kn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (y === "selectedMenu" && Z.props.selected || _ === -1) && (_ = O));
  });
  const A = (r = $.paper) != null ? r : Rm, I = (o = x.paper) != null ? o : g, j = Tt({
    elementType: $.root,
    externalSlotProps: x.root,
    ownerState: D,
    className: [F.root, l]
  }), K = Tt({
    elementType: A,
    externalSlotProps: I,
    ownerState: D,
    className: F.paper
  });
  return /* @__PURE__ */ w(Cm, T({
    onClose: p,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: P ? "right" : "left"
    },
    transformOrigin: P ? xm : Em,
    slots: {
      paper: A,
      root: $.root
    },
    slotProps: {
      root: j,
      paper: K
    },
    open: f,
    ref: n,
    transitionDuration: m,
    TransitionProps: T({
      onEntering: C
    }, E),
    ownerState: D
  }, b, {
    classes: h,
    children: /* @__PURE__ */ w(km, T({
      onKeyDown: k,
      actions: N,
      autoFocus: s && (_ === -1 || d),
      autoFocusItem: B,
      variant: y
    }, c, {
      className: ke(F.list, c.className),
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Aa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: u.oneOfType([ot, u.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: u.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: u.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: u.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: u.func,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: u.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: u.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: u.shape({
    paper: u.oneOfType([u.func, u.object]),
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: u.shape({
    paper: u.elementType,
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: u.oneOfType([u.oneOf(["auto"]), u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: u.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: u.oneOf(["menu", "selectedMenu"])
});
const Tm = Aa;
function uv({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var d;
  const [o, i] = he.useState(void 0), s = Re(
    (c) => {
      c.preventDefault(), i(
        o === void 0 ? {
          mouseX: c.clientX + 2,
          mouseY: c.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), a = Re(() => {
    i(void 0);
  }, []), l = Kt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((d = n == null ? void 0 : n.items) == null ? void 0 : d.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ oe(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ w(
          Tm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: a,
            anchorReference: "anchorPosition",
            anchorPosition: l,
            children: /* @__PURE__ */ w(
              Bo,
              {
                menuDefinition: n,
                commandHandler: t,
                onClick: a
              }
            )
          }
        )
      ]
    }
  );
}
const Om = xa(/* @__PURE__ */ w("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Nm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const ao = (e, t, n = {}) => {
  const r = St(t);
  r.current = t;
  const o = St(n);
  o.current = Nm(o.current);
  const [i, s] = Ee(() => r.current), [a, l] = Ee(!0);
  return ft(() => {
    let d = !0;
    return l(!!e), (async () => {
      if (e) {
        const c = await e();
        d && (s(() => c), l(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, a];
};
function Pm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: a
}) {
  const [l, d] = Ee(!1), [c, p] = Ee(!1), f = Re(() => {
    l && d(!1), p(!1);
  }, [l]), g = Re((E) => {
    E.stopPropagation(), d((b) => {
      const R = !b;
      return R && E.shiftKey ? p(!0) : R || p(!1), R;
    });
  }, []), h = Re(
    (E) => (f(), r(E)),
    [r, f]
  ), [m, v] = Ee({ top: 1, left: 1 });
  ft(() => {
    if (l) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const b = E.getBoundingClientRect(), R = window.scrollY, P = window.scrollX, D = b.top + R + E.clientHeight, F = b.left + P;
        v({ top: D, left: F });
      }
    }
  }, [l, o]);
  const [y] = ao(
    Re(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, l]),
    t
  ), [$] = ao(
    Re(async () => (e == null ? void 0 : e(!0)) ?? n ?? y, [e, n, y, l]),
    n ?? y
  ), x = c && $ ? $ : y;
  return /* @__PURE__ */ oe(sr, { children: [
    /* @__PURE__ */ w(
      vs,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: g,
        children: a ?? /* @__PURE__ */ w(Om, {})
      }
    ),
    /* @__PURE__ */ w(
      jl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: l,
        onClose: f,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: x ? /* @__PURE__ */ w(
          Fg,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: x
          }
        ) : void 0
      }
    )
  ] });
}
function cv({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: a,
  onClick: l,
  children: d
}) {
  return /* @__PURE__ */ w(
    vs,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${a ?? ""}`,
      onClick: l,
      children: d
    }
  );
}
const $m = gs(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Da = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(bs.Root, { ref: n, className: te($m(), e), ...t }));
Da.displayName = bs.Root.displayName;
function or({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  helperText: r,
  label: o,
  placeholder: i,
  isRequired: s = !1,
  className: a,
  defaultValue: l,
  value: d,
  onChange: c,
  onFocus: p,
  onBlur: f
}) {
  return /* @__PURE__ */ oe("div", { className: "pr-inline-grid pr-items-center pr-gap-1.5", children: [
    /* @__PURE__ */ w(
      Da,
      {
        htmlFor: e,
        className: te({
          "pr-text-red-600": n,
          "pr-hidden": !o
        }),
        children: `${o}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ w(
      yo,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: s,
        className: te(a, { "pr-border-red-600": n }),
        defaultValue: l,
        value: d,
        onChange: c,
        onFocus: p,
        onBlur: f
      }
    ),
    /* @__PURE__ */ w("p", { className: te({ "pr-hidden": !r }), children: r })
  ] });
}
let Fr;
const Vr = () => (Fr || (Fr = le.allBookIds.map((e) => ({
  bookId: e,
  label: le.bookIdToEnglishName(e)
}))), Fr);
function dv({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (l) => {
    t(l);
  }, o = (l, d) => {
    const p = { bookNum: le.bookIdToNumber(d.bookId), chapterNum: 1, verseNum: 1 };
    r(p);
  }, i = (l) => {
    t({ ...e, chapterNum: +l.target.value });
  }, s = (l) => {
    t({ ...e, verseNum: +l.target.value });
  }, a = Kt(() => Vr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ oe("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ w(
      Yr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: a,
        options: Vr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ w(
      _t,
      {
        onClick: () => r(ii(e, -1)),
        isDisabled: e.bookNum <= wl,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(
      _t,
      {
        onClick: () => r(ii(e, 1)),
        isDisabled: e.bookNum >= Vr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ w(
      or,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ w(
      _t,
      {
        onClick: () => t(si(e, -1)),
        isDisabled: e.chapterNum <= xl,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(
      _t,
      {
        onClick: () => t(si(e, 1)),
        isDisabled: e.chapterNum >= ds(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ w(
      or,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ w(
      _t,
      {
        onClick: () => t(ai(e, -1)),
        isDisabled: e.verseNum <= El,
        children: "<"
      }
    ),
    /* @__PURE__ */ w(_t, { onClick: () => t(ai(e, 1)), children: ">" })
  ] });
}
class _m {
  constructor() {
    $t(this, "listeners", {});
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
class pv {
  constructor(t, n, r) {
    $t(this, "id");
    $t(this, "checkDefinition");
    $t(this, "data");
    $t(this, "resultsUpdated");
    if (r)
      this.id = r.id, this.checkDefinition = r;
    else {
      if (!n)
        throw new Error("Either 'id' or 'checkDefinition' must be provided.");
      this.id = n;
    }
    this.data = t, this.resultsUpdated = new _m();
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
/**
   * table-core
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function pt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Be(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: pt(n, r[e])
    }));
  };
}
function ir(e) {
  return e instanceof Function;
}
function Mm(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Fa(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const s = t(i);
      s != null && s.length && r(s);
    });
  };
  return r(e), n;
}
function ee(e, t, n) {
  let r = [], o;
  return () => {
    let i;
    n.key && n.debug && (i = Date.now());
    const s = e();
    if (!(s.length !== r.length || s.some((d, c) => r[c] !== d)))
      return o;
    r = s;
    let l;
    if (n.key && n.debug && (l = Date.now()), o = t(...s), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const d = Math.round((Date.now() - i) * 100) / 100, c = Math.round((Date.now() - l) * 100) / 100, p = c / 16, f = (g, h) => {
        for (g = String(g); g.length < h; )
          g = " " + g;
        return g;
      };
      console.info(`%c⏱ ${f(c, 5)} /${f(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * p, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function Im(e, t, n, r) {
  var o, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...t
  }, l = a.accessorKey;
  let d = (o = (i = a.id) != null ? i : l ? l.replace(".", "_") : void 0) != null ? o : typeof a.header == "string" ? a.header : void 0, c;
  if (a.accessorFn ? c = a.accessorFn : l && (l.includes(".") ? c = (f) => {
    let g = f;
    for (const m of l.split(".")) {
      var h;
      g = (h = g) == null ? void 0 : h[m], process.env.NODE_ENV !== "production" && g === void 0 && console.warn(`"${m}" in deeply nested key "${l}" returned undefined.`);
    }
    return g;
  } : c = (f) => f[a.accessorKey]), !d)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let p = {
    id: `${String(d)}`,
    accessorFn: c,
    parent: r,
    depth: n,
    columnDef: a,
    columns: [],
    getFlatColumns: ee(() => [!0], () => {
      var f;
      return [p, ...(f = p.columns) == null ? void 0 : f.flatMap((g) => g.getFlatColumns())];
    }, {
      key: process.env.NODE_ENV === "production" && "column.getFlatColumns",
      debug: () => {
        var f;
        return (f = e.options.debugAll) != null ? f : e.options.debugColumns;
      }
    }),
    getLeafColumns: ee(() => [e._getOrderColumnsFn()], (f) => {
      var g;
      if ((g = p.columns) != null && g.length) {
        let h = p.columns.flatMap((m) => m.getLeafColumns());
        return f(h);
      }
      return [p];
    }, {
      key: process.env.NODE_ENV === "production" && "column.getLeafColumns",
      debug: () => {
        var f;
        return (f = e.options.debugAll) != null ? f : e.options.debugColumns;
      }
    })
  };
  for (const f of e._features)
    f.createColumn == null || f.createColumn(p, e);
  return p;
}
function ss(e, t, n) {
  var r;
  let i = {
    id: (r = n.id) != null ? r : t.id,
    column: t,
    index: n.index,
    isPlaceholder: !!n.isPlaceholder,
    placeholderId: n.placeholderId,
    depth: n.depth,
    subHeaders: [],
    colSpan: 0,
    rowSpan: 0,
    headerGroup: null,
    getLeafHeaders: () => {
      const s = [], a = (l) => {
        l.subHeaders && l.subHeaders.length && l.subHeaders.map(a), s.push(l);
      };
      return a(i), s;
    },
    getContext: () => ({
      table: e,
      header: i,
      column: t
    })
  };
  return e._features.forEach((s) => {
    s.createHeader == null || s.createHeader(i, e);
  }), i;
}
const Am = {
  createTable: (e) => {
    e.getHeaderGroups = ee(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, s;
      const a = (i = r == null ? void 0 : r.map((p) => n.find((f) => f.id === p)).filter(Boolean)) != null ? i : [], l = (s = o == null ? void 0 : o.map((p) => n.find((f) => f.id === p)).filter(Boolean)) != null ? s : [], d = n.filter((p) => !(r != null && r.includes(p.id)) && !(o != null && o.includes(p.id)));
      return zn(t, [...a, ...d, ...l], e);
    }, {
      key: process.env.NODE_ENV === "development" && "getHeaderGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getCenterHeaderGroups = ee(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), zn(t, n, e, "center")), {
      key: process.env.NODE_ENV === "development" && "getCenterHeaderGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getLeftHeaderGroups = ee(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return zn(t, i, e, "left");
    }, {
      key: process.env.NODE_ENV === "development" && "getLeftHeaderGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getRightHeaderGroups = ee(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return zn(t, i, e, "right");
    }, {
      key: process.env.NODE_ENV === "development" && "getRightHeaderGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getFooterGroups = ee(() => [e.getHeaderGroups()], (t) => [...t].reverse(), {
      key: process.env.NODE_ENV === "development" && "getFooterGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getLeftFooterGroups = ee(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), {
      key: process.env.NODE_ENV === "development" && "getLeftFooterGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getCenterFooterGroups = ee(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), {
      key: process.env.NODE_ENV === "development" && "getCenterFooterGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getRightFooterGroups = ee(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), {
      key: process.env.NODE_ENV === "development" && "getRightFooterGroups",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getFlatHeaders = ee(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), {
      key: process.env.NODE_ENV === "development" && "getFlatHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getLeftFlatHeaders = ee(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), {
      key: process.env.NODE_ENV === "development" && "getLeftFlatHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getCenterFlatHeaders = ee(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), {
      key: process.env.NODE_ENV === "development" && "getCenterFlatHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getRightFlatHeaders = ee(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), {
      key: process.env.NODE_ENV === "development" && "getRightFlatHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getCenterLeafHeaders = ee(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), {
      key: process.env.NODE_ENV === "development" && "getCenterLeafHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getLeftLeafHeaders = ee(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), {
      key: process.env.NODE_ENV === "development" && "getLeftLeafHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getRightLeafHeaders = ee(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), {
      key: process.env.NODE_ENV === "development" && "getRightLeafHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    }), e.getLeafHeaders = ee(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, s, a, l, d;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(s = (a = n[0]) == null ? void 0 : a.headers) != null ? s : [], ...(l = (d = r[0]) == null ? void 0 : d.headers) != null ? l : []].map((c) => c.getLeafHeaders()).flat();
    }, {
      key: process.env.NODE_ENV === "development" && "getLeafHeaders",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugHeaders;
      }
    });
  }
};
function zn(e, t, n, r) {
  var o, i;
  let s = 0;
  const a = function(f, g) {
    g === void 0 && (g = 1), s = Math.max(s, g), f.filter((h) => h.getIsVisible()).forEach((h) => {
      var m;
      (m = h.columns) != null && m.length && a(h.columns, g + 1);
    }, 0);
  };
  a(e);
  let l = [];
  const d = (f, g) => {
    const h = {
      depth: g,
      id: [r, `${g}`].filter(Boolean).join("_"),
      headers: []
    }, m = [];
    f.forEach((v) => {
      const y = [...m].reverse()[0], $ = v.column.depth === h.depth;
      let x, E = !1;
      if ($ && v.column.parent ? x = v.column.parent : (x = v.column, E = !0), y && (y == null ? void 0 : y.column) === x)
        y.subHeaders.push(v);
      else {
        const b = ss(n, x, {
          id: [r, g, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: E,
          placeholderId: E ? `${m.filter((R) => R.column === x).length}` : void 0,
          depth: g,
          index: m.length
        });
        b.subHeaders.push(v), m.push(b);
      }
      h.headers.push(v), v.headerGroup = h;
    }), l.push(h), g > 0 && d(m, g - 1);
  }, c = t.map((f, g) => ss(n, f, {
    depth: s,
    index: g
  }));
  d(c, s - 1), l.reverse();
  const p = (f) => f.filter((h) => h.column.getIsVisible()).map((h) => {
    let m = 0, v = 0, y = [0];
    h.subHeaders && h.subHeaders.length ? (y = [], p(h.subHeaders).forEach((x) => {
      let {
        colSpan: E,
        rowSpan: b
      } = x;
      m += E, y.push(b);
    })) : m = 1;
    const $ = Math.min(...y);
    return v = v + $, h.colSpan = m, h.rowSpan = v, {
      colSpan: m,
      rowSpan: v
    };
  });
  return p((o = (i = l[0]) == null ? void 0 : i.headers) != null ? o : []), l;
}
const Hn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Lr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Dm = {
  getDefaultColumnDef: () => Hn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Lr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: Be("columnSizing", e),
    onColumnSizingInfoChange: Be("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Hn.minSize, (r = i ?? e.columnDef.size) != null ? r : Hn.size), (o = e.columnDef.maxSize) != null ? o : Hn.maxSize);
    }, e.getStart = (n) => {
      const r = n ? n === "left" ? t.getLeftVisibleLeafColumns() : t.getRightVisibleLeafColumns() : t.getVisibleLeafColumns(), o = r.findIndex((i) => i.id === e.id);
      if (o > 0) {
        const i = r[o - 1];
        return i.getStart(n) + i.getSize();
      }
      return 0;
    }, e.resetSize = () => {
      t.setColumnSizing((n) => {
        let {
          [e.id]: r,
          ...o
        } = n;
        return o;
      });
    }, e.getCanResize = () => {
      var n, r;
      return ((n = e.columnDef.enableResizing) != null ? n : !0) && ((r = t.options.enableColumnResizing) != null ? r : !0);
    }, e.getIsResizing = () => t.getState().columnSizingInfo.isResizingColumn === e.id;
  },
  createHeader: (e, t) => {
    e.getSize = () => {
      let n = 0;
      const r = (o) => {
        if (o.subHeaders.length)
          o.subHeaders.forEach(r);
        else {
          var i;
          n += (i = o.column.getSize()) != null ? i : 0;
        }
      };
      return r(e), n;
    }, e.getStart = () => {
      if (e.index > 0) {
        const n = e.headerGroup.headers[e.index - 1];
        return n.getStart() + n.getSize();
      }
      return 0;
    }, e.getResizeHandler = (n) => {
      const r = t.getColumn(e.column.id), o = r == null ? void 0 : r.getCanResize();
      return (i) => {
        if (!r || !o || (i.persist == null || i.persist(), Br(i) && i.touches && i.touches.length > 1))
          return;
        const s = e.getSize(), a = e ? e.getLeafHeaders().map((y) => [y.column.id, y.column.getSize()]) : [[r.id, r.getSize()]], l = Br(i) ? Math.round(i.touches[0].clientX) : i.clientX, d = {}, c = (y, $) => {
          typeof $ == "number" && (t.setColumnSizingInfo((x) => {
            var E, b;
            const R = t.options.columnResizeDirection === "rtl" ? -1 : 1, P = ($ - ((E = x == null ? void 0 : x.startOffset) != null ? E : 0)) * R, D = Math.max(P / ((b = x == null ? void 0 : x.startSize) != null ? b : 0), -0.999999);
            return x.columnSizingStart.forEach((F) => {
              let [B, N] = F;
              d[B] = Math.round(Math.max(N + N * D, 0) * 100) / 100;
            }), {
              ...x,
              deltaOffset: P,
              deltaPercentage: D
            };
          }), (t.options.columnResizeMode === "onChange" || y === "end") && t.setColumnSizing((x) => ({
            ...x,
            ...d
          })));
        }, p = (y) => c("move", y), f = (y) => {
          c("end", y), t.setColumnSizingInfo(($) => ({
            ...$,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, g = n || typeof document < "u" ? document : null, h = {
          moveHandler: (y) => p(y.clientX),
          upHandler: (y) => {
            g == null || g.removeEventListener("mousemove", h.moveHandler), g == null || g.removeEventListener("mouseup", h.upHandler), f(y.clientX);
          }
        }, m = {
          moveHandler: (y) => (y.cancelable && (y.preventDefault(), y.stopPropagation()), p(y.touches[0].clientX), !1),
          upHandler: (y) => {
            var $;
            g == null || g.removeEventListener("touchmove", m.moveHandler), g == null || g.removeEventListener("touchend", m.upHandler), y.cancelable && (y.preventDefault(), y.stopPropagation()), f(($ = y.touches[0]) == null ? void 0 : $.clientX);
          }
        }, v = Fm() ? {
          passive: !1
        } : !1;
        Br(i) ? (g == null || g.addEventListener("touchmove", m.moveHandler, v), g == null || g.addEventListener("touchend", m.upHandler, v)) : (g == null || g.addEventListener("mousemove", h.moveHandler, v), g == null || g.addEventListener("mouseup", h.upHandler, v)), t.setColumnSizingInfo((y) => ({
          ...y,
          startOffset: l,
          startSize: s,
          deltaOffset: 0,
          deltaPercentage: 0,
          columnSizingStart: a,
          isResizingColumn: r.id
        }));
      };
    };
  },
  createTable: (e) => {
    e.setColumnSizing = (t) => e.options.onColumnSizingChange == null ? void 0 : e.options.onColumnSizingChange(t), e.setColumnSizingInfo = (t) => e.options.onColumnSizingInfoChange == null ? void 0 : e.options.onColumnSizingInfoChange(t), e.resetColumnSizing = (t) => {
      var n;
      e.setColumnSizing(t ? {} : (n = e.initialState.columnSizing) != null ? n : {});
    }, e.resetHeaderSizeInfo = (t) => {
      var n;
      e.setColumnSizingInfo(t ? Lr() : (n = e.initialState.columnSizingInfo) != null ? n : Lr());
    }, e.getTotalSize = () => {
      var t, n;
      return (t = (n = e.getHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getLeftTotalSize = () => {
      var t, n;
      return (t = (n = e.getLeftHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getCenterTotalSize = () => {
      var t, n;
      return (t = (n = e.getCenterHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    }, e.getRightTotalSize = () => {
      var t, n;
      return (t = (n = e.getRightHeaderGroups()[0]) == null ? void 0 : n.headers.reduce((r, o) => r + o.getSize(), 0)) != null ? t : 0;
    };
  }
};
let Gn = null;
function Fm() {
  if (typeof Gn == "boolean")
    return Gn;
  let e = !1;
  try {
    const t = {
      get passive() {
        return e = !0, !1;
      }
    }, n = () => {
    };
    window.addEventListener("test", n, t), window.removeEventListener("test", n);
  } catch {
    e = !1;
  }
  return Gn = e, Gn;
}
function Br(e) {
  return e.type === "touchstart";
}
const Vm = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: Be("expanded", e),
    paginateExpandedRows: !0
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetExpanded = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetExpanded) != null ? r : !e.options.manualExpanding) {
        if (n)
          return;
        n = !0, e._queue(() => {
          e.resetExpanded(), n = !1;
        });
      }
    }, e.setExpanded = (r) => e.options.onExpandedChange == null ? void 0 : e.options.onExpandedChange(r), e.toggleAllRowsExpanded = (r) => {
      r ?? !e.getIsAllRowsExpanded() ? e.setExpanded(!0) : e.setExpanded({});
    }, e.resetExpanded = (r) => {
      var o, i;
      e.setExpanded(r ? {} : (o = (i = e.initialState) == null ? void 0 : i.expanded) != null ? o : {});
    }, e.getCanSomeRowsExpand = () => e.getPrePaginationRowModel().flatRows.some((r) => r.getCanExpand()), e.getToggleAllRowsExpandedHandler = () => (r) => {
      r.persist == null || r.persist(), e.toggleAllRowsExpanded();
    }, e.getIsSomeRowsExpanded = () => {
      const r = e.getState().expanded;
      return r === !0 || Object.values(r).some(Boolean);
    }, e.getIsAllRowsExpanded = () => {
      const r = e.getState().expanded;
      return typeof r == "boolean" ? r === !0 : !(!Object.keys(r).length || e.getRowModel().flatRows.some((o) => !o.getIsExpanded()));
    }, e.getExpandedDepth = () => {
      let r = 0;
      return (e.getState().expanded === !0 ? Object.keys(e.getRowModel().rowsById) : Object.keys(e.getState().expanded)).forEach((i) => {
        const s = i.split(".");
        r = Math.max(r, s.length);
      }), r;
    }, e.getPreExpandedRowModel = () => e.getSortedRowModel(), e.getExpandedRowModel = () => (!e._getExpandedRowModel && e.options.getExpandedRowModel && (e._getExpandedRowModel = e.options.getExpandedRowModel(e)), e.options.manualExpanding || !e._getExpandedRowModel ? e.getPreExpandedRowModel() : e._getExpandedRowModel());
  },
  createRow: (e, t) => {
    e.toggleExpanded = (n) => {
      t.setExpanded((r) => {
        var o;
        const i = r === !0 ? !0 : !!(r != null && r[e.id]);
        let s = {};
        if (r === !0 ? Object.keys(t.getRowModel().rowsById).forEach((a) => {
          s[a] = !0;
        }) : s = r, n = (o = n) != null ? o : !i, !i && n)
          return {
            ...s,
            [e.id]: !0
          };
        if (i && !n) {
          const {
            [e.id]: a,
            ...l
          } = s;
          return l;
        }
        return r;
      });
    }, e.getIsExpanded = () => {
      var n;
      const r = t.getState().expanded;
      return !!((n = t.options.getIsRowExpanded == null ? void 0 : t.options.getIsRowExpanded(e)) != null ? n : r === !0 || r != null && r[e.id]);
    }, e.getCanExpand = () => {
      var n, r, o;
      return (n = t.options.getRowCanExpand == null ? void 0 : t.options.getRowCanExpand(e)) != null ? n : ((r = t.options.enableExpanding) != null ? r : !0) && !!((o = e.subRows) != null && o.length);
    }, e.getIsAllParentsExpanded = () => {
      let n = !0, r = e;
      for (; n && r.parentId; )
        r = t.getRow(r.parentId, !0), n = r.getIsExpanded();
      return n;
    }, e.getToggleExpandedHandler = () => {
      const n = e.getCanExpand();
      return () => {
        n && e.toggleExpanded();
      };
    };
  }
}, Va = (e, t, n) => {
  var r;
  const o = n.toLowerCase();
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(o));
};
Va.autoRemove = (e) => Xe(e);
const La = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
La.autoRemove = (e) => Xe(e);
const Ba = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Ba.autoRemove = (e) => Xe(e);
const ja = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
ja.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const za = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
za.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Ha = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Ha.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Ga = (e, t, n) => e.getValue(t) === n;
Ga.autoRemove = (e) => Xe(e);
const Ua = (e, t, n) => e.getValue(t) == n;
Ua.autoRemove = (e) => Xe(e);
const jo = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
jo.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, s = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const a = i;
    i = s, s = a;
  }
  return [i, s];
};
jo.autoRemove = (e) => Xe(e) || Xe(e[0]) && Xe(e[1]);
const nt = {
  includesString: Va,
  includesStringSensitive: La,
  equalsString: Ba,
  arrIncludes: ja,
  arrIncludesAll: za,
  arrIncludesSome: Ha,
  equals: Ga,
  weakEquals: Ua,
  inNumberRange: jo
};
function Xe(e) {
  return e == null || e === "";
}
const Lm = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    globalFilter: void 0,
    // filtersProgress: 1,
    // facetProgress: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Be("columnFilters", e),
    onGlobalFilterChange: Be("globalFilter", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100,
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? nt.includesString : typeof r == "number" ? nt.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? nt.equals : Array.isArray(r) ? nt.arrIncludes : nt.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return ir(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : nt[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, r, o;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((r = t.options.enableColumnFilters) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && !!e.accessorFn;
    }, e.getCanGlobalFilter = () => {
      var n, r, o, i;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((r = t.options.enableGlobalFilter) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && ((i = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((r) => r.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, r;
      return (n = (r = t.getState().columnFilters) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((r) => {
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((c) => c.id === e.id), s = pt(n, i ? i.value : void 0);
        if (as(o, s, e)) {
          var a;
          return (a = r == null ? void 0 : r.filter((c) => c.id !== e.id)) != null ? a : [];
        }
        const l = {
          id: e.id,
          value: s
        };
        if (i) {
          var d;
          return (d = r == null ? void 0 : r.map((c) => c.id === e.id ? l : c)) != null ? d : [];
        }
        return r != null && r.length ? [...r, l] : [l];
      });
    }, e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => nt.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return ir(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (
        // @ts-ignore
        (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : nt[r]
      );
    }, e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), r = (o) => {
        var i;
        return (i = pt(t, o)) == null ? void 0 : i.filter((s) => {
          const a = n.find((l) => l.id === s.id);
          if (a) {
            const l = a.getFilterFn();
            if (as(l, s.value, a))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    }, e.resetColumnFilters = (t) => {
      var n, r;
      e.setColumnFilters(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel()), e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
};
function as(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Bm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), jm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, zm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Hm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Gm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n)
    return r / n;
}, Um = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Mm(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, s) => i - s);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, qm = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Wm = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Xm = (e, t) => t.length, jr = {
  sum: Bm,
  min: jm,
  max: zm,
  extent: Hm,
  mean: Gm,
  median: Um,
  unique: qm,
  uniqueCount: Wm,
  count: Xm
}, Ym = {
  getDefaultColumnDef: () => ({
    aggregatedCell: (e) => {
      var t, n;
      return (t = (n = e.getValue()) == null || n.toString == null ? void 0 : n.toString()) != null ? t : null;
    },
    aggregationFn: "auto"
  }),
  getInitialState: (e) => ({
    grouping: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGroupingChange: Be("grouping", e),
    groupedColumnMode: "reorder"
  }),
  createColumn: (e, t) => {
    e.toggleGrouping = () => {
      t.setGrouping((n) => n != null && n.includes(e.id) ? n.filter((r) => r !== e.id) : [...n ?? [], e.id]);
    }, e.getCanGroup = () => {
      var n, r, o, i;
      return (n = (r = (o = (i = e.columnDef.enableGrouping) != null ? i : !0) != null ? o : t.options.enableGrouping) != null ? r : !0) != null ? n : !!e.accessorFn;
    }, e.getIsGrouped = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.includes(e.id);
    }, e.getGroupedIndex = () => {
      var n;
      return (n = t.getState().grouping) == null ? void 0 : n.indexOf(e.id);
    }, e.getToggleGroupingHandler = () => {
      const n = e.getCanGroup();
      return () => {
        n && e.toggleGrouping();
      };
    }, e.getAutoAggregationFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      if (typeof r == "number")
        return jr.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return jr.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return ir(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : jr[e.columnDef.aggregationFn];
    };
  },
  createTable: (e) => {
    e.setGrouping = (t) => e.options.onGroupingChange == null ? void 0 : e.options.onGroupingChange(t), e.resetGrouping = (t) => {
      var n, r;
      e.setGrouping(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.grouping) != null ? n : []);
    }, e.getPreGroupedRowModel = () => e.getFilteredRowModel(), e.getGroupedRowModel = () => (!e._getGroupedRowModel && e.options.getGroupedRowModel && (e._getGroupedRowModel = e.options.getGroupedRowModel(e)), e.options.manualGrouping || !e._getGroupedRowModel ? e.getPreGroupedRowModel() : e._getGroupedRowModel());
  },
  createRow: (e, t) => {
    e.getIsGrouped = () => !!e.groupingColumnId, e.getGroupingValue = (n) => {
      if (e._groupingValuesCache.hasOwnProperty(n))
        return e._groupingValuesCache[n];
      const r = t.getColumn(n);
      return r != null && r.columnDef.getGroupingValue ? (e._groupingValuesCache[n] = r.columnDef.getGroupingValue(e.original), e._groupingValuesCache[n]) : e.getValue(n);
    }, e._groupingValuesCache = {};
  },
  createCell: (e, t, n, r) => {
    e.getIsGrouped = () => t.getIsGrouped() && t.id === n.groupingColumnId, e.getIsPlaceholder = () => !e.getIsGrouped() && t.getIsGrouped(), e.getIsAggregated = () => {
      var o;
      return !e.getIsGrouped() && !e.getIsPlaceholder() && !!((o = n.subRows) != null && o.length);
    };
  }
};
function Km(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const Jm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Be("columnOrder", e)
  }),
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = ee(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const s = [...t], a = [...o];
        for (; a.length && s.length; ) {
          const l = s.shift(), d = a.findIndex((c) => c.id === l);
          d > -1 && i.push(a.splice(d, 1)[0]);
        }
        i = [...i, ...a];
      }
      return Km(i, n, r);
    }, {
      key: process.env.NODE_ENV === "development" && "getOrderColumnsFn"
      // debug: () => table.options.debugAll ?? table.options.debugTable,
    });
  }
}, lo = 0, uo = 10, zr = () => ({
  pageIndex: lo,
  pageSize: uo
}), Zm = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...zr(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: Be("pagination", e)
  }),
  createTable: (e) => {
    let t = !1, n = !1;
    e._autoResetPageIndex = () => {
      var r, o;
      if (!t) {
        e._queue(() => {
          t = !0;
        });
        return;
      }
      if ((r = (o = e.options.autoResetAll) != null ? o : e.options.autoResetPageIndex) != null ? r : !e.options.manualPagination) {
        if (n)
          return;
        n = !0, e._queue(() => {
          e.resetPageIndex(), n = !1;
        });
      }
    }, e.setPagination = (r) => {
      const o = (i) => pt(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? zr() : (o = e.initialState.pagination) != null ? o : zr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = pt(r, o.pageIndex);
        const s = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, s)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? lo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : lo);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? uo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : uo);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, pt(r, o.pageSize)), s = o.pageSize * o.pageIndex, a = Math.floor(s / i);
        return {
          ...o,
          pageIndex: a,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let s = pt(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof s == "number" && (s = Math.max(-1, s)), {
        ...o,
        pageCount: s
      };
    }), e.getPageOptions = ee(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, s) => s)), o;
    }, {
      key: process.env.NODE_ENV === "development" && "getPageOptions",
      debug: () => {
        var r;
        return (r = e.options.debugAll) != null ? r : e.options.debugTable;
      }
    }), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, o = e.getPageCount();
      return o === -1 ? !0 : o === 0 ? !1 : r < o - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getPrePaginationRowModel().rows.length / e.getState().pagination.pageSize);
    };
  }
}, Hr = () => ({
  left: [],
  right: []
}), Gr = () => ({
  top: [],
  bottom: []
}), Qm = {
  getInitialState: (e) => ({
    columnPinning: Hr(),
    rowPinning: Gr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Be("columnPinning", e),
    onRowPinningChange: Be("rowPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, s;
        if (n === "right") {
          var a, l;
          return {
            left: ((a = o == null ? void 0 : o.left) != null ? a : []).filter((p) => !(r != null && r.includes(p))),
            right: [...((l = o == null ? void 0 : o.right) != null ? l : []).filter((p) => !(r != null && r.includes(p))), ...r]
          };
        }
        if (n === "left") {
          var d, c;
          return {
            left: [...((d = o == null ? void 0 : o.left) != null ? d : []).filter((p) => !(r != null && r.includes(p))), ...r],
            right: ((c = o == null ? void 0 : o.right) != null ? c : []).filter((p) => !(r != null && r.includes(p)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((p) => !(r != null && r.includes(p))),
          right: ((s = o == null ? void 0 : o.right) != null ? s : []).filter((p) => !(r != null && r.includes(p)))
        };
      });
    }, e.getCanPin = () => e.getLeafColumns().some((r) => {
      var o, i, s;
      return ((o = r.columnDef.enablePinning) != null ? o : !0) && ((i = (s = t.options.enableColumnPinning) != null ? s : t.options.enablePinning) != null ? i : !0);
    }), e.getIsPinned = () => {
      const n = e.getLeafColumns().map((a) => a.id), {
        left: r,
        right: o
      } = t.getState().columnPinning, i = n.some((a) => r == null ? void 0 : r.includes(a)), s = n.some((a) => o == null ? void 0 : o.includes(a));
      return i ? "left" : s ? "right" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      return o ? (n = (r = t.getState().columnPinning) == null || (r = r[o]) == null ? void 0 : r.indexOf(e.id)) != null ? n : -1 : 0;
    };
  },
  createRow: (e, t) => {
    e.pin = (n, r, o) => {
      const i = r ? e.getLeafRows().map((l) => {
        let {
          id: d
        } = l;
        return d;
      }) : [], s = o ? e.getParentRows().map((l) => {
        let {
          id: d
        } = l;
        return d;
      }) : [], a = /* @__PURE__ */ new Set([...s, e.id, ...i]);
      t.setRowPinning((l) => {
        var d, c;
        if (n === "bottom") {
          var p, f;
          return {
            top: ((p = l == null ? void 0 : l.top) != null ? p : []).filter((m) => !(a != null && a.has(m))),
            bottom: [...((f = l == null ? void 0 : l.bottom) != null ? f : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)]
          };
        }
        if (n === "top") {
          var g, h;
          return {
            top: [...((g = l == null ? void 0 : l.top) != null ? g : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)],
            bottom: ((h = l == null ? void 0 : l.bottom) != null ? h : []).filter((m) => !(a != null && a.has(m)))
          };
        }
        return {
          top: ((d = l == null ? void 0 : l.top) != null ? d : []).filter((m) => !(a != null && a.has(m))),
          bottom: ((c = l == null ? void 0 : l.bottom) != null ? c : []).filter((m) => !(a != null && a.has(m)))
        };
      });
    }, e.getCanPin = () => {
      var n;
      const {
        enableRowPinning: r,
        enablePinning: o
      } = t.options;
      return typeof r == "function" ? r(e) : (n = r ?? o) != null ? n : !0;
    }, e.getIsPinned = () => {
      const n = [e.id], {
        top: r,
        bottom: o
      } = t.getState().rowPinning, i = n.some((a) => r == null ? void 0 : r.includes(a)), s = n.some((a) => o == null ? void 0 : o.includes(a));
      return i ? "top" : s ? "bottom" : !1;
    }, e.getPinnedIndex = () => {
      var n, r;
      const o = e.getIsPinned();
      if (!o)
        return -1;
      const i = (n = t._getPinnedRows(o)) == null ? void 0 : n.map((s) => {
        let {
          id: a
        } = s;
        return a;
      });
      return (r = i == null ? void 0 : i.indexOf(e.id)) != null ? r : -1;
    }, e.getCenterVisibleCells = ee(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((s) => !i.includes(s.column.id));
    }, {
      key: process.env.NODE_ENV === "development" && "row.getCenterVisibleCells",
      debug: () => {
        var n;
        return (n = t.options.debugAll) != null ? n : t.options.debugRows;
      }
    }), e.getLeftVisibleCells = ee(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, ,], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), {
      key: process.env.NODE_ENV === "development" && "row.getLeftVisibleCells",
      debug: () => {
        var n;
        return (n = t.options.debugAll) != null ? n : t.options.debugRows;
      }
    }), e.getRightVisibleCells = ee(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), {
      key: process.env.NODE_ENV === "development" && "row.getRightVisibleCells",
      debug: () => {
        var n;
        return (n = t.options.debugAll) != null ? n : t.options.debugRows;
      }
    });
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? Hr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Hr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = ee(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), {
      key: process.env.NODE_ENV === "development" && "getLeftLeafColumns",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugColumns;
      }
    }), e.getRightLeafColumns = ee(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), {
      key: process.env.NODE_ENV === "development" && "getRightLeafColumns",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugColumns;
      }
    }), e.getCenterLeafColumns = ee(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, {
      key: process.env.NODE_ENV === "development" && "getCenterLeafColumns",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugColumns;
      }
    }), e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, r;
      return e.setRowPinning(t ? Gr() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Gr());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = (t) => ee(() => [e.getRowModel().rows, e.getState().rowPinning[t]], (n, r) => {
      var o;
      return ((o = e.options.keepPinnedRows) == null || o ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (r ?? []).map((s) => {
          const a = e.getRow(s, !0);
          return a.getIsAllParentsExpanded() ? a : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (r ?? []).map((s) => n.find((a) => a.id === s))
      )).filter(Boolean).map((s) => ({
        ...s,
        position: t
      }));
    }, {
      key: process.env.NODE_ENV === "development" && `row.get${t === "top" ? "Top" : "Bottom"}Rows`,
      debug: () => {
        var n;
        return (n = e.options.debugAll) != null ? n : e.options.debugRows;
      }
    })(), e.getTopRows = () => e._getPinnedRows("top"), e.getBottomRows = () => e._getPinnedRows("bottom"), e.getCenterRows = ee(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, {
      key: process.env.NODE_ENV === "development" && "row.getCenterRows",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugRows;
      }
    });
  }
}, eh = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: Be("rowSelection", e),
    enableRowSelection: !0,
    enableMultiRowSelection: !0,
    enableSubRowSelection: !0
    // enableGroupingRowSelection: false,
    // isAdditiveSelectEvent: (e: unknown) => !!e.metaKey,
    // isInclusiveSelectEvent: (e: unknown) => !!e.shiftKey,
  }),
  createTable: (e) => {
    e.setRowSelection = (t) => e.options.onRowSelectionChange == null ? void 0 : e.options.onRowSelectionChange(t), e.resetRowSelection = (t) => {
      var n;
      return e.setRowSelection(t ? {} : (n = e.initialState.rowSelection) != null ? n : {});
    }, e.toggleAllRowsSelected = (t) => {
      e.setRowSelection((n) => {
        t = typeof t < "u" ? t : !e.getIsAllRowsSelected();
        const r = {
          ...n
        }, o = e.getPreGroupedRowModel().flatRows;
        return t ? o.forEach((i) => {
          i.getCanSelect() && (r[i.id] = !0);
        }) : o.forEach((i) => {
          delete r[i.id];
        }), r;
      });
    }, e.toggleAllPageRowsSelected = (t) => e.setRowSelection((n) => {
      const r = typeof t < "u" ? t : !e.getIsAllPageRowsSelected(), o = {
        ...n
      };
      return e.getRowModel().rows.forEach((i) => {
        co(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = ee(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? Ur(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, {
      key: process.env.NODE_ENV === "development" && "getSelectedRowModel",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugTable;
      }
    }), e.getFilteredSelectedRowModel = ee(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? Ur(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, {
      key: process.env.NODE_ENV === "production" && "getFilteredSelectedRowModel",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugTable;
      }
    }), e.getGroupedSelectedRowModel = ee(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? Ur(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, {
      key: process.env.NODE_ENV === "production" && "getGroupedSelectedRowModel",
      debug: () => {
        var t;
        return (t = e.options.debugAll) != null ? t : e.options.debugTable;
      }
    }), e.getIsAllRowsSelected = () => {
      const t = e.getFilteredRowModel().flatRows, {
        rowSelection: n
      } = e.getState();
      let r = !!(t.length && Object.keys(n).length);
      return r && t.some((o) => o.getCanSelect() && !n[o.id]) && (r = !1), r;
    }, e.getIsAllPageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows.filter((o) => o.getCanSelect()), {
        rowSelection: n
      } = e.getState();
      let r = !!t.length;
      return r && t.some((o) => !n[o.id]) && (r = !1), r;
    }, e.getIsSomeRowsSelected = () => {
      var t;
      const n = Object.keys((t = e.getState().rowSelection) != null ? t : {}).length;
      return n > 0 && n < e.getFilteredRowModel().flatRows.length;
    }, e.getIsSomePageRowsSelected = () => {
      const t = e.getPaginationRowModel().flatRows;
      return e.getIsAllPageRowsSelected() ? !1 : t.filter((n) => n.getCanSelect()).some((n) => n.getIsSelected() || n.getIsSomeSelected());
    }, e.getToggleAllRowsSelectedHandler = () => (t) => {
      e.toggleAllRowsSelected(t.target.checked);
    }, e.getToggleAllPageRowsSelectedHandler = () => (t) => {
      e.toggleAllPageRowsSelected(t.target.checked);
    };
  },
  createRow: (e, t) => {
    e.toggleSelected = (n, r) => {
      const o = e.getIsSelected();
      t.setRowSelection((i) => {
        var s;
        if (n = typeof n < "u" ? n : !o, e.getCanSelect() && o === n)
          return i;
        const a = {
          ...i
        };
        return co(a, e.id, n, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, t), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return zo(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return po(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return po(e, n) === "all";
    }, e.getCanSelect = () => {
      var n;
      return typeof t.options.enableRowSelection == "function" ? t.options.enableRowSelection(e) : (n = t.options.enableRowSelection) != null ? n : !0;
    }, e.getCanSelectSubRows = () => {
      var n;
      return typeof t.options.enableSubRowSelection == "function" ? t.options.enableSubRowSelection(e) : (n = t.options.enableSubRowSelection) != null ? n : !0;
    }, e.getCanMultiSelect = () => {
      var n;
      return typeof t.options.enableMultiRowSelection == "function" ? t.options.enableMultiRowSelection(e) : (n = t.options.enableMultiRowSelection) != null ? n : !0;
    }, e.getToggleSelectedHandler = () => {
      const n = e.getCanSelect();
      return (r) => {
        var o;
        n && e.toggleSelected((o = r.target) == null ? void 0 : o.checked);
      };
    };
  }
}, co = (e, t, n, r, o) => {
  var i;
  const s = o.getRow(t, !0);
  n ? (s.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), s.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((a) => co(e, a.id, n, r, o));
};
function Ur(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(s, a) {
    return s.map((l) => {
      var d;
      const c = zo(l, n);
      if (c && (r.push(l), o[l.id] = l), (d = l.subRows) != null && d.length && (l = {
        ...l,
        subRows: i(l.subRows)
      }), c)
        return l;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function zo(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function po(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length))
    return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (zo(s, t) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const a = po(s, t);
      a === "all" ? i = !0 : (a === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const fo = /([0-9]+)/gm, th = (e, t, n) => qa(gt(e.getValue(n)).toLowerCase(), gt(t.getValue(n)).toLowerCase()), nh = (e, t, n) => qa(gt(e.getValue(n)), gt(t.getValue(n))), rh = (e, t, n) => Ho(gt(e.getValue(n)).toLowerCase(), gt(t.getValue(n)).toLowerCase()), oh = (e, t, n) => Ho(gt(e.getValue(n)), gt(t.getValue(n))), ih = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, sh = (e, t, n) => Ho(e.getValue(n), t.getValue(n));
function Ho(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function gt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function qa(e, t) {
  const n = e.split(fo).filter(Boolean), r = t.split(fo).filter(Boolean);
  for (; n.length && r.length; ) {
    const o = n.shift(), i = r.shift(), s = parseInt(o, 10), a = parseInt(i, 10), l = [s, a].sort();
    if (isNaN(l[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(l[1]))
      return isNaN(s) ? -1 : 1;
    if (s > a)
      return 1;
    if (a > s)
      return -1;
  }
  return n.length - r.length;
}
const dn = {
  alphanumeric: th,
  alphanumericCaseSensitive: nh,
  text: rh,
  textCaseSensitive: oh,
  datetime: ih,
  basic: sh
}, ah = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: Be("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return dn.datetime;
        if (typeof i == "string" && (r = !0, i.split(fo).length > 1))
          return dn.alphanumeric;
      }
      return r ? dn.text : dn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return ir(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : dn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((s) => {
        const a = s == null ? void 0 : s.find((g) => g.id === e.id), l = s == null ? void 0 : s.findIndex((g) => g.id === e.id);
        let d = [], c, p = i ? n : o === "desc";
        if (s != null && s.length && e.getCanMultiSort() && r ? a ? c = "toggle" : c = "add" : s != null && s.length && l !== s.length - 1 ? c = "replace" : a ? c = "toggle" : c = "replace", c === "toggle" && (i || o || (c = "remove")), c === "add") {
          var f;
          d = [...s, {
            id: e.id,
            desc: p
          }], d.splice(0, d.length - ((f = t.options.maxMultiSortColCount) != null ? f : Number.MAX_SAFE_INTEGER));
        } else
          c === "toggle" ? d = s.map((g) => g.id === e.id ? {
            ...g,
            desc: p
          } : g) : c === "remove" ? d = s.filter((g) => g.id !== e.id) : d = [{
            id: e.id,
            desc: p
          }];
        return d;
      });
    }, e.getFirstSortDir = () => {
      var n, r;
      return ((n = (r = e.columnDef.sortDescFirst) != null ? r : t.options.sortDescFirst) != null ? n : e.getAutoSortDir() === "desc") ? "desc" : "asc";
    }, e.getNextSortingOrder = (n) => {
      var r, o;
      const i = e.getFirstSortDir(), s = e.getIsSorted();
      return s ? s !== i && ((r = t.options.enableSortingRemoval) == null || r) && // If enableSortRemove, enable in general
      (!(n && (o = t.options.enableMultiRemove) != null) || o) ? !1 : s === "desc" ? "asc" : "desc" : i;
    }, e.getCanSort = () => {
      var n, r;
      return ((n = e.columnDef.enableSorting) != null ? n : !0) && ((r = t.options.enableSorting) != null ? r : !0) && !!e.accessorFn;
    }, e.getCanMultiSort = () => {
      var n, r;
      return (n = (r = e.columnDef.enableMultiSort) != null ? r : t.options.enableMultiSort) != null ? n : !!e.accessorFn;
    }, e.getIsSorted = () => {
      var n;
      const r = (n = t.getState().sorting) == null ? void 0 : n.find((o) => o.id === e.id);
      return r ? r.desc ? "desc" : "asc" : !1;
    }, e.getSortIndex = () => {
      var n, r;
      return (n = (r = t.getState().sorting) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.clearSorting = () => {
      t.setSorting((n) => n != null && n.length ? n.filter((r) => r.id !== e.id) : []);
    }, e.getToggleSortingHandler = () => {
      const n = e.getCanSort();
      return (r) => {
        n && (r.persist == null || r.persist(), e.toggleSorting == null || e.toggleSorting(void 0, e.getCanMultiSort() ? t.options.isMultiSortEvent == null ? void 0 : t.options.isMultiSortEvent(r) : !1));
      };
    };
  },
  createTable: (e) => {
    e.setSorting = (t) => e.options.onSortingChange == null ? void 0 : e.options.onSortingChange(t), e.resetSorting = (t) => {
      var n, r;
      e.setSorting(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.sorting) != null ? n : []);
    }, e.getPreSortedRowModel = () => e.getGroupedRowModel(), e.getSortedRowModel = () => (!e._getSortedRowModel && e.options.getSortedRowModel && (e._getSortedRowModel = e.options.getSortedRowModel(e)), e.options.manualSorting || !e._getSortedRowModel ? e.getPreSortedRowModel() : e._getSortedRowModel());
  }
}, lh = {
  getInitialState: (e) => ({
    columnVisibility: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnVisibilityChange: Be("columnVisibility", e)
  }),
  createColumn: (e, t) => {
    e.toggleVisibility = (n) => {
      e.getCanHide() && t.setColumnVisibility((r) => ({
        ...r,
        [e.id]: n ?? !e.getIsVisible()
      }));
    }, e.getIsVisible = () => {
      var n, r;
      return (n = (r = t.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, r;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((r = t.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = ee(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), {
      key: process.env.NODE_ENV === "production" && "row._getAllVisibleCells",
      debug: () => {
        var n;
        return (n = t.options.debugAll) != null ? n : t.options.debugRows;
      }
    }), e.getVisibleCells = ee(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], {
      key: process.env.NODE_ENV === "development" && "row.getVisibleCells",
      debug: () => {
        var n;
        return (n = t.options.debugAll) != null ? n : t.options.debugRows;
      }
    });
  },
  createTable: (e) => {
    const t = (n, r) => ee(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), {
      key: n,
      debug: () => {
        var o;
        return (o = e.options.debugAll) != null ? o : e.options.debugColumns;
      }
    });
    e.getVisibleFlatColumns = t("getVisibleFlatColumns", () => e.getAllFlatColumns()), e.getVisibleLeafColumns = t("getVisibleLeafColumns", () => e.getAllLeafColumns()), e.getLeftVisibleLeafColumns = t("getLeftVisibleLeafColumns", () => e.getLeftLeafColumns()), e.getRightVisibleLeafColumns = t("getRightVisibleLeafColumns", () => e.getRightLeafColumns()), e.getCenterVisibleLeafColumns = t("getCenterVisibleLeafColumns", () => e.getCenterLeafColumns()), e.setColumnVisibility = (n) => e.options.onColumnVisibilityChange == null ? void 0 : e.options.onColumnVisibilityChange(n), e.resetColumnVisibility = (n) => {
      var r;
      e.setColumnVisibility(n ? {} : (r = e.initialState.columnVisibility) != null ? r : {});
    }, e.toggleAllColumnsVisible = (n) => {
      var r;
      n = (r = n) != null ? r : !e.getIsAllColumnsVisible(), e.setColumnVisibility(e.getAllLeafColumns().reduce((o, i) => ({
        ...o,
        [i.id]: n || !(i.getCanHide != null && i.getCanHide())
      }), {}));
    }, e.getIsAllColumnsVisible = () => !e.getAllLeafColumns().some((n) => !(n.getIsVisible != null && n.getIsVisible())), e.getIsSomeColumnsVisible = () => e.getAllLeafColumns().some((n) => n.getIsVisible == null ? void 0 : n.getIsVisible()), e.getToggleAllColumnsVisibilityHandler = () => (n) => {
      var r;
      e.toggleAllColumnsVisible((r = n.target) == null ? void 0 : r.checked);
    };
  }
}, ls = [Am, lh, Jm, Qm, Lm, ah, Ym, Vm, Zm, eh, Dm];
function uh(e) {
  var t;
  (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  let n = {
    _features: ls
  };
  const r = n._features.reduce((c, p) => Object.assign(c, p.getDefaultOptions == null ? void 0 : p.getDefaultOptions(n)), {}), o = (c) => n.options.mergeOptions ? n.options.mergeOptions(r, c) : {
    ...r,
    ...c
  };
  let s = {
    ...{},
    ...(t = e.initialState) != null ? t : {}
  };
  n._features.forEach((c) => {
    var p;
    s = (p = c.getInitialState == null ? void 0 : c.getInitialState(s)) != null ? p : s;
  });
  const a = [];
  let l = !1;
  const d = {
    _features: ls,
    options: {
      ...r,
      ...e
    },
    initialState: s,
    _queue: (c) => {
      a.push(c), l || (l = !0, Promise.resolve().then(() => {
        for (; a.length; )
          a.shift()();
        l = !1;
      }).catch((p) => setTimeout(() => {
        throw p;
      })));
    },
    reset: () => {
      n.setState(n.initialState);
    },
    setOptions: (c) => {
      const p = pt(c, n.options);
      n.options = o(p);
    },
    getState: () => n.options.state,
    setState: (c) => {
      n.options.onStateChange == null || n.options.onStateChange(c);
    },
    _getRowId: (c, p, f) => {
      var g;
      return (g = n.options.getRowId == null ? void 0 : n.options.getRowId(c, p, f)) != null ? g : `${f ? [f.id, p].join(".") : p}`;
    },
    getCoreRowModel: () => (n._getCoreRowModel || (n._getCoreRowModel = n.options.getCoreRowModel(n)), n._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => n.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (c, p) => {
      let f = (p ? n.getPrePaginationRowModel() : n.getRowModel()).rowsById[c];
      if (!f && (f = n.getCoreRowModel().rowsById[c], !f))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${c}`) : new Error();
      return f;
    },
    _getDefaultColumnDef: ee(() => [n.options.defaultColumn], (c) => {
      var p;
      return c = (p = c) != null ? p : {}, {
        header: (f) => {
          const g = f.header.column.columnDef;
          return g.accessorKey ? g.accessorKey : g.accessorFn ? g.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (f) => {
          var g, h;
          return (g = (h = f.renderValue()) == null || h.toString == null ? void 0 : h.toString()) != null ? g : null;
        },
        ...n._features.reduce((f, g) => Object.assign(f, g.getDefaultColumnDef == null ? void 0 : g.getDefaultColumnDef()), {}),
        ...c
      };
    }, {
      debug: () => {
        var c;
        return (c = n.options.debugAll) != null ? c : n.options.debugColumns;
      },
      key: process.env.NODE_ENV === "development" && "getDefaultColumnDef"
    }),
    _getColumnDefs: () => n.options.columns,
    getAllColumns: ee(() => [n._getColumnDefs()], (c) => {
      const p = function(f, g, h) {
        return h === void 0 && (h = 0), f.map((m) => {
          const v = Im(n, m, h, g), y = m;
          return v.columns = y.columns ? p(y.columns, v, h + 1) : [], v;
        });
      };
      return p(c);
    }, {
      key: process.env.NODE_ENV === "development" && "getAllColumns",
      debug: () => {
        var c;
        return (c = n.options.debugAll) != null ? c : n.options.debugColumns;
      }
    }),
    getAllFlatColumns: ee(() => [n.getAllColumns()], (c) => c.flatMap((p) => p.getFlatColumns()), {
      key: process.env.NODE_ENV === "development" && "getAllFlatColumns",
      debug: () => {
        var c;
        return (c = n.options.debugAll) != null ? c : n.options.debugColumns;
      }
    }),
    _getAllFlatColumnsById: ee(() => [n.getAllFlatColumns()], (c) => c.reduce((p, f) => (p[f.id] = f, p), {}), {
      key: process.env.NODE_ENV === "development" && "getAllFlatColumnsById",
      debug: () => {
        var c;
        return (c = n.options.debugAll) != null ? c : n.options.debugColumns;
      }
    }),
    getAllLeafColumns: ee(() => [n.getAllColumns(), n._getOrderColumnsFn()], (c, p) => {
      let f = c.flatMap((g) => g.getLeafColumns());
      return p(f);
    }, {
      key: process.env.NODE_ENV === "development" && "getAllLeafColumns",
      debug: () => {
        var c;
        return (c = n.options.debugAll) != null ? c : n.options.debugColumns;
      }
    }),
    getColumn: (c) => {
      const p = n._getAllFlatColumnsById()[c];
      return process.env.NODE_ENV !== "production" && !p && console.error(`[Table] Column with id '${c}' does not exist.`), p;
    }
  };
  Object.assign(n, d);
  for (let c = 0; c < n._features.length; c++) {
    const p = n._features[c];
    p == null || p.createTable == null || p.createTable(n);
  }
  return n;
}
function ch(e, t, n, r) {
  const o = () => {
    var s;
    return (s = i.getValue()) != null ? s : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: ee(() => [e, n, t, i], (s, a, l, d) => ({
      table: s,
      column: a,
      row: l,
      cell: d,
      getValue: d.getValue,
      renderValue: d.renderValue
    }), {
      key: process.env.NODE_ENV === "development" && "cell.getContext",
      debug: () => e.options.debugAll
    })
  };
  return e._features.forEach((s) => {
    s.createCell == null || s.createCell(i, n, t, e);
  }, {}), i;
}
const Wa = (e, t, n, r, o, i, s) => {
  let a = {
    id: t,
    index: r,
    original: n,
    depth: o,
    parentId: s,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (l) => {
      if (a._valuesCache.hasOwnProperty(l))
        return a._valuesCache[l];
      const d = e.getColumn(l);
      if (d != null && d.accessorFn)
        return a._valuesCache[l] = d.accessorFn(a.original, r), a._valuesCache[l];
    },
    getUniqueValues: (l) => {
      if (a._uniqueValuesCache.hasOwnProperty(l))
        return a._uniqueValuesCache[l];
      const d = e.getColumn(l);
      if (d != null && d.accessorFn)
        return d.columnDef.getUniqueValues ? (a._uniqueValuesCache[l] = d.columnDef.getUniqueValues(a.original, r), a._uniqueValuesCache[l]) : (a._uniqueValuesCache[l] = [a.getValue(l)], a._uniqueValuesCache[l]);
    },
    renderValue: (l) => {
      var d;
      return (d = a.getValue(l)) != null ? d : e.options.renderFallbackValue;
    },
    subRows: i ?? [],
    getLeafRows: () => Fa(a.subRows, (l) => l.subRows),
    getParentRow: () => a.parentId ? e.getRow(a.parentId, !0) : void 0,
    getParentRows: () => {
      let l = [], d = a;
      for (; ; ) {
        const c = d.getParentRow();
        if (!c)
          break;
        l.push(c), d = c;
      }
      return l.reverse();
    },
    getAllCells: ee(() => [e.getAllLeafColumns()], (l) => l.map((d) => ch(e, a, d, d.id)), {
      key: process.env.NODE_ENV === "development" && "row.getAllCells",
      debug: () => {
        var l;
        return (l = e.options.debugAll) != null ? l : e.options.debugRows;
      }
    }),
    _getAllCellsByColumnId: ee(() => [a.getAllCells()], (l) => l.reduce((d, c) => (d[c.column.id] = c, d), {}), {
      key: process.env.NODE_ENV === "production" && "row.getAllCellsByColumnId",
      debug: () => {
        var l;
        return (l = e.options.debugAll) != null ? l : e.options.debugRows;
      }
    })
  };
  for (let l = 0; l < e._features.length; l++) {
    const d = e._features[l];
    d == null || d.createRow == null || d.createRow(a, e);
  }
  return a;
};
function dh() {
  return (e) => ee(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const a = [];
      for (let d = 0; d < o.length; d++) {
        const c = Wa(e, e._getRowId(o[d], d, s), o[d], d, i, void 0, s == null ? void 0 : s.id);
        if (n.flatRows.push(c), n.rowsById[c.id] = c, a.push(c), e.options.getSubRows) {
          var l;
          c.originalSubRows = e.options.getSubRows(o[d], d), (l = c.originalSubRows) != null && l.length && (c.subRows = r(c.originalSubRows, i + 1, c));
        }
      }
      return a;
    };
    return n.rows = r(t), n;
  }, {
    key: process.env.NODE_ENV === "development" && "getRowModel",
    debug: () => {
      var t;
      return (t = e.options.debugAll) != null ? t : e.options.debugTable;
    },
    onChange: () => {
      e._autoResetPageIndex();
    }
  });
}
function ph() {
  return (e) => ee(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, o = [], i = r.filter((l) => {
      var d;
      return (d = e.getColumn(l.id)) == null ? void 0 : d.getCanSort();
    }), s = {};
    i.forEach((l) => {
      const d = e.getColumn(l.id);
      d && (s[l.id] = {
        sortUndefined: d.columnDef.sortUndefined,
        invertSorting: d.columnDef.invertSorting,
        sortingFn: d.getSortingFn()
      });
    });
    const a = (l) => {
      const d = l.map((c) => ({
        ...c
      }));
      return d.sort((c, p) => {
        for (let g = 0; g < i.length; g += 1) {
          var f;
          const h = i[g], m = s[h.id], v = (f = h == null ? void 0 : h.desc) != null ? f : !1;
          let y = 0;
          if (m.sortUndefined) {
            const $ = c.getValue(h.id), x = p.getValue(h.id), E = $ === void 0, b = x === void 0;
            (E || b) && (y = E && b ? 0 : E ? m.sortUndefined : -m.sortUndefined);
          }
          if (y === 0 && (y = m.sortingFn(c, p, h.id)), y !== 0)
            return v && (y *= -1), m.invertSorting && (y *= -1), y;
        }
        return c.index - p.index;
      }), d.forEach((c) => {
        var p;
        o.push(c), (p = c.subRows) != null && p.length && (c.subRows = a(c.subRows));
      }), d;
    };
    return {
      rows: a(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, {
    key: process.env.NODE_ENV === "development" && "getSortedRowModel",
    debug: () => {
      var t;
      return (t = e.options.debugAll) != null ? t : e.options.debugTable;
    },
    onChange: () => {
      e._autoResetPageIndex();
    }
  });
}
function fh() {
  return (e) => ee(() => [e.getState().grouping, e.getPreGroupedRowModel()], (t, n) => {
    if (!n.rows.length || !t.length)
      return n;
    const r = t.filter((l) => e.getColumn(l)), o = [], i = {}, s = function(l, d, c) {
      if (d === void 0 && (d = 0), d >= r.length)
        return l.map((h) => (h.depth = d, o.push(h), i[h.id] = h, h.subRows && (h.subRows = s(h.subRows, d + 1, h.id)), h));
      const p = r[d], f = gh(l, p);
      return Array.from(f.entries()).map((h, m) => {
        let [v, y] = h, $ = `${p}:${v}`;
        $ = c ? `${c}>${$}` : $;
        const x = s(y, d + 1, $), E = d ? Fa(y, (R) => R.subRows) : y, b = Wa(e, $, E[0].original, m, d, void 0, c);
        return Object.assign(b, {
          groupingColumnId: p,
          groupingValue: v,
          subRows: x,
          leafRows: E,
          getValue: (R) => {
            if (r.includes(R)) {
              if (b._valuesCache.hasOwnProperty(R))
                return b._valuesCache[R];
              if (y[0]) {
                var P;
                b._valuesCache[R] = (P = y[0].getValue(R)) != null ? P : void 0;
              }
              return b._valuesCache[R];
            }
            if (b._groupingValuesCache.hasOwnProperty(R))
              return b._groupingValuesCache[R];
            const D = e.getColumn(R), F = D == null ? void 0 : D.getAggregationFn();
            if (F)
              return b._groupingValuesCache[R] = F(R, E, y), b._groupingValuesCache[R];
          }
        }), x.forEach((R) => {
          o.push(R), i[R.id] = R;
        }), b;
      });
    }, a = s(n.rows, 0);
    return a.forEach((l) => {
      o.push(l), i[l.id] = l;
    }), {
      rows: a,
      flatRows: o,
      rowsById: i
    };
  }, {
    key: process.env.NODE_ENV === "development" && "getGroupedRowModel",
    debug: () => {
      var t;
      return (t = e.options.debugAll) != null ? t : e.options.debugTable;
    },
    onChange: () => {
      e._queue(() => {
        e._autoResetExpanded(), e._autoResetPageIndex();
      });
    }
  });
}
function gh(e, t) {
  const n = /* @__PURE__ */ new Map();
  return e.reduce((r, o) => {
    const i = `${o.getGroupingValue(t)}`, s = r.get(i);
    return s ? s.push(o) : r.set(i, [o]), r;
  }, n);
}
function mh() {
  return (e) => ee(() => [e.getState().expanded, e.getPreExpandedRowModel(), e.options.paginateExpandedRows], (t, n, r) => !n.rows.length || t !== !0 && !Object.keys(t ?? {}).length || !r ? n : hh(n), {
    key: process.env.NODE_ENV === "development" && "getExpandedRowModel",
    debug: () => {
      var t;
      return (t = e.options.debugAll) != null ? t : e.options.debugTable;
    }
  });
}
function hh(e) {
  const t = [], n = (r) => {
    var o;
    t.push(r), (o = r.subRows) != null && o.length && r.getIsExpanded() && r.subRows.forEach(n);
  };
  return e.rows.forEach(n), {
    rows: t,
    flatRows: e.flatRows,
    rowsById: e.rowsById
  };
}
/**
   * react-table
   *
   * Copyright (c) TanStack
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE.md file in the root directory of this source tree.
   *
   * @license MIT
   */
function qr(e, t) {
  return e ? vh(e) ? /* @__PURE__ */ S.createElement(e, t) : e : null;
}
function vh(e) {
  return bh(e) || typeof e == "function" || yh(e);
}
function bh(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function yh(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function wh(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = S.useState(() => ({
    current: uh(t)
  })), [r, o] = S.useState(() => n.current.initialState);
  return n.current.setOptions((i) => ({
    ...i,
    ...e,
    state: {
      ...r,
      ...e.state
    },
    // Similarly, we'll maintain both our internal state and any user-provided
    // state.
    onStateChange: (s) => {
      o(s), e.onStateChange == null || e.onStateChange(s);
    }
  })), n.current;
}
const xh = ye.Root, Eh = ye.Group, Sh = ye.Value, Xa = S.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ oe(
  ye.Trigger,
  {
    ref: r,
    className: te(
      /* The default installed version of SelectTrigger included pr-w-full, but UX (Alex) says that's not desirable. */
      "pr-flex pr-h-10 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ w(ye.Icon, { asChild: !0, children: /* @__PURE__ */ w(fs, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Xa.displayName = ye.Trigger.displayName;
const Ya = S.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.ScrollUpButton,
  {
    ref: n,
    className: te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ w(Nl, { className: "pr-h-4 pr-w-4" })
  }
));
Ya.displayName = ye.ScrollUpButton.displayName;
const Ka = S.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.ScrollDownButton,
  {
    ref: n,
    className: te("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ w(fs, { className: "pr-h-4 pr-w-4" })
  }
));
Ka.displayName = ye.ScrollDownButton.displayName;
const Ja = S.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ w(ye.Portal, { children: /* @__PURE__ */ oe(
  ye.Content,
  {
    ref: o,
    className: te(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ w(Ya, {}),
      /* @__PURE__ */ w(
        ye.Viewport,
        {
          className: te(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ w(Ka, {})
    ]
  }
) }));
Ja.displayName = ye.Content.displayName;
const Ch = S.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.Label,
  {
    ref: n,
    className: te("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Ch.displayName = ye.Label.displayName;
const Za = S.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ oe(
  ye.Item,
  {
    ref: r,
    className: te(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ w("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ w(ye.ItemIndicator, { children: /* @__PURE__ */ w(ps, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ w(ye.ItemText, { children: t })
    ]
  }
));
Za.displayName = ye.Item.displayName;
const Rh = S.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  ye.Separator,
  {
    ref: n,
    className: te("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Rh.displayName = ye.Separator.displayName;
const Qa = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ w(
    "table",
    {
      ref: n,
      className: te("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Qa.displayName = "Table";
const el = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w("thead", { ref: n, className: te("[&_tr]:pr-border-b", e), ...t })
);
el.displayName = "TableHeader";
const tl = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w("tbody", { ref: n, className: te("[&_tr:last-child]:pr-border-0", e), ...t })
);
tl.displayName = "TableBody";
const kh = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "tfoot",
    {
      ref: n,
      className: te(
        "pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0",
        e
      ),
      ...t
    }
  )
);
kh.displayName = "TableFooter";
const go = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "tr",
    {
      ref: n,
      className: te(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
go.displayName = "TableRow";
const nl = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "th",
    {
      ref: n,
      className: te(
        "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
        e
      ),
      ...t
    }
  )
);
nl.displayName = "TableHead";
const rl = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "td",
    {
      ref: n,
      className: te("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
      ...t
    }
  )
);
rl.displayName = "TableCell";
const Th = S.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ w(
    "caption",
    {
      ref: n,
      className: te("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
      ...t
    }
  )
);
Th.displayName = "TableCaption";
const zt = "scrBook", Oh = "scrRef", mn = "source", Nh = "details", Ph = "Scripture Reference", $h = "Scripture Book", ol = "Type", _h = "Details";
function Mh(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${le.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: zt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Ph,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? le.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === zt ? Cr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Xr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Cr(r.start),
      id: Oh,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Cr(o.start);
      },
      sortingFn: (r, o) => Xr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => typeof r.source == "object" && "displayName" in r.source ? r.source.displayName : r.source,
      id: mn,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? ol : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Nh,
      header: (e == null ? void 0 : e.detailsColumnName) ?? _h,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function fv({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: a
}) {
  const [l, d] = Ee([]), [c, p] = Ee([{ id: zt, desc: !1 }]), [f, g] = Ee(() => e.flatMap((C) => {
    const k = C.checkDefinition ?? C.id;
    return C.data.map((_) => ({
      ..._,
      source: k
    }));
  })), [h, m] = Ee({});
  ft(() => {
    const C = (k) => {
      const { detail: _ } = k, A = _, I = A.checkDefinition ?? A.id, j = A.data.map((K) => ({
        ...K,
        source: I
      }));
      _ !== void 0 && g((K) => [...K.filter((O) => O.source !== I), ...j]);
    };
    return e.forEach((k) => {
      k.resultsUpdated.addEventListener("resultsUpdated", C);
    }), () => {
      e.forEach((k) => {
        k.resultsUpdated.removeEventListener("resultsUpdated", C);
      });
    };
  }, [e]);
  const v = Kt(
    () => Mh(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [r, i, s, n]
  );
  function y(C) {
    return C.bookNum * 1e6 + C.chapterNum * 1e3 + C.verseNum;
  }
  const $ = Re(
    (C, k) => !k || Xr(C, k) === 0 ? `${y(C)}` : `${y(C)}-${y(k)}`,
    []
  ), x = Re(
    (C) => `${$(C.start, C.end)} ${C.source} ${C.detail}`,
    [$]
  ), E = wh({
    data: f,
    columns: v,
    state: {
      grouping: l,
      sorting: c,
      rowSelection: h
    },
    onGroupingChange: d,
    onSortingChange: p,
    onRowSelectionChange: m,
    getExpandedRowModel: mh(),
    getGroupedRowModel: fh(),
    getCoreRowModel: dh(),
    getSortedRowModel: ph(),
    getRowId: x,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  ft(() => {
    if (a) {
      const C = E.getSelectedRowModel().rowsById, k = Object.keys(C);
      if (k.length === 1) {
        const _ = f.find((A) => x(A) === k[0]) || void 0;
        _ && a(_);
      }
    }
  }, [h, f, x, a, E]);
  const b = o ?? $h, R = i ?? ol, P = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${b}`, value: [zt] },
    { label: `Group by ${R}`, value: [mn] },
    {
      label: `Group by ${b} and ${R}`,
      value: [zt, mn]
    },
    {
      label: `Group by ${R} and ${b}`,
      value: [mn, zt]
    }
  ], D = (C) => {
    d(JSON.parse(C));
  }, F = (C, k) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(k);
  }, B = (C, k) => C.getIsGrouped() ? "" : te("banded-row", k % 2 === 0 ? "even" : "odd"), N = (C, k, _) => {
    if ((C == null ? void 0 : C.length) !== 0)
      return k.depth >= _.column.getGroupedIndex() ? ` pr-px-${k.depth * 4}` : void 0;
  };
  return /* @__PURE__ */ oe("div", { className: "pr-twp pr-w-full", children: [
    !t && /* @__PURE__ */ oe(
      xh,
      {
        value: JSON.stringify(l),
        onValueChange: (C) => {
          D(C);
        },
        children: [
          /* @__PURE__ */ w(Xa, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ w(Sh, {}) }),
          /* @__PURE__ */ w(Ja, { position: "item-aligned", children: /* @__PURE__ */ w(Eh, { children: P.map((C) => /* @__PURE__ */ w(Za, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ oe(Qa, { className: "pr-p-0", children: [
      t && /* @__PURE__ */ w(el, { children: E.getHeaderGroups().map((C) => /* @__PURE__ */ w(go, { children: C.headers.filter((k) => k.column.columnDef.header).map((k) => /* @__PURE__ */ w(nl, { colSpan: k.colSpan, children: k.isPlaceholder ? void 0 : /* @__PURE__ */ oe("div", { children: [
        k.column.getCanGroup() ? /* @__PURE__ */ w(
          Yn,
          {
            title: `Toggle grouping by ${k.column.columnDef.header}`,
            onClick: k.column.getToggleGroupingHandler(),
            style: { cursor: "pointer" },
            type: "button",
            children: k.column.getIsGrouped() ? `🛑(${k.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        qr(k.column.columnDef.header, k.getContext())
      ] }) }, k.id)) }, C.id)) }),
      /* @__PURE__ */ w(tl, { children: E.getRowModel().rows.map((C, k) => /* @__PURE__ */ w(
        go,
        {
          "data-state": C.getIsSelected() ? "selected" : "",
          className: te(B(C, k)),
          onClick: (_) => F(C, _),
          children: C.getVisibleCells().map((_) => {
            if (!(_.getIsPlaceholder() || _.column.columnDef.enableGrouping && !_.getIsGrouped() && (_.column.columnDef.id !== mn || !n)))
              return /* @__PURE__ */ w(
                rl,
                {
                  className: te(
                    _.column.columnDef.id,
                    "pr-p-[1px]",
                    N(l, C, _)
                  ),
                  children: (() => _.getIsGrouped() ? /* @__PURE__ */ oe(
                    Yn,
                    {
                      onClick: C.getToggleExpandedHandler(),
                      style: {
                        cursor: C.getCanExpand() ? "pointer" : "normal"
                      },
                      type: "button",
                      children: [
                        C.getIsExpanded() ? "👇" : "👉",
                        " ",
                        qr(_.column.columnDef.cell, _.getContext()),
                        " (",
                        C.subRows.length,
                        ")"
                      ]
                    }
                  ) : qr(_.column.columnDef.cell, _.getContext()))()
                },
                _.id
              );
          })
        },
        C.id
      )) })
    ] })
  ] });
}
function gv({ onSearch: e, placeholder: t }) {
  const [n, r] = Ee(""), o = (i) => {
    r(i), e(i);
  };
  return /* @__PURE__ */ w(zl, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ w(
    or,
    {
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => o(i.target.value)
    }
  ) });
}
function mv({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: a,
  value: l,
  valueLabelDisplay: d = "off",
  className: c,
  onChange: p,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ w(
    Hl,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: a,
      value: l,
      valueLabelDisplay: d,
      className: `papi-slider ${n} ${c ?? ""}`,
      onChange: p,
      onChangeCommitted: f
    }
  );
}
function hv({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: a
}) {
  const l = {
    action: (s == null ? void 0 : s.action) || a,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ w(
    Gl,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: i,
      id: t,
      ContentProps: l
    }
  );
}
function vv({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ w(
    Ul,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function us({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ w(or, { defaultValue: t[n.key], onChange: r })
  );
}
const Ih = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ w(
  Os,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function bv({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: a = !0,
  defaultColumnResizable: l = !0,
  rows: d,
  enableSelectColumn: c,
  selectColumnWidth: p = 50,
  rowKeyGetter: f,
  rowHeight: g = 35,
  headerRowHeight: h = 35,
  selectedRows: m,
  onSelectedRowsChange: v,
  onRowsChange: y,
  onCellClick: $,
  onCellDoubleClick: x,
  onCellContextMenu: E,
  onCellKeyDown: b,
  direction: R = "ltr",
  enableVirtualization: P = !0,
  onCopy: D,
  onPaste: F,
  onScroll: B,
  className: N,
  "data-testid": C
}) {
  const k = Kt(() => {
    const _ = e.map((A) => typeof A.editable == "function" ? {
      ...A,
      editable: (j) => !!A.editable(j),
      renderEditCell: A.renderEditCell || us
    } : A.editable && !A.renderEditCell ? { ...A, renderEditCell: us } : A.renderEditCell && !A.editable ? { ...A, editable: !1 } : A);
    return c ? [{ ...Ql, minWidth: p }, ..._] : _;
  }, [e, c, p]);
  return /* @__PURE__ */ w(
    Zl,
    {
      columns: k,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: s,
        sortable: a,
        resizable: l
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: d,
      rowKeyGetter: f,
      rowHeight: g,
      headerRowHeight: h,
      selectedRows: m,
      onSelectedRowsChange: v,
      onRowsChange: y,
      onCellClick: $,
      onCellDoubleClick: x,
      onCellContextMenu: E,
      onCellKeyDown: b,
      direction: R,
      enableVirtualization: P,
      onCopy: D,
      onPaste: F,
      onScroll: B,
      renderers: { renderCheckbox: Ih },
      className: `papi-table ${N ?? "rdg-light"}`,
      "data-testid": C
    }
  );
}
function yv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = St(void 0);
  return /* @__PURE__ */ w("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ w(ql, { position: "static", id: r, children: /* @__PURE__ */ oe(Wl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ w(
      Pm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ w("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const wv = (e, t) => {
  ft(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Wr = () => !1, xv = (e, t) => {
  const [n] = ao(
    Re(async () => {
      if (!e)
        return Wr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Wr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  ft(() => () => {
    n !== Wr && n();
  }, [n]);
}, Ev = Ie.Root, Ah = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.List,
  {
    ref: n,
    className: te(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ah.displayName = Ie.List.displayName;
const Dh = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.Trigger,
  {
    ref: n,
    className: te(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Dh.displayName = Ie.Trigger.displayName;
const Fh = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.Content,
  {
    ref: n,
    className: te(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Fh.displayName = Ie.Content.displayName;
const Vh = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.Root,
  {
    orientation: "vertical",
    ref: n,
    className: te("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Vh.displayName = Ie.List.displayName;
const Lh = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.List,
  {
    ref: n,
    className: te(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Lh.displayName = Ie.List.displayName;
const Sv = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.Trigger,
  {
    ref: n,
    ...t,
    className: te(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    children: /* @__PURE__ */ w("div", { className: "pr-flex pr-flex-col pr-justify-center", children: /* @__PURE__ */ w("div", { children: t.value }) })
  }
)), Bh = he.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ w(
  Ie.Content,
  {
    ref: n,
    className: te(
      "mt-2 pr-ml-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Bh.displayName = Ie.Content.displayName;
function jh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
jh(`.papi-checkbox {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.papi-button {
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
/*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*:where(.pr-twp,.pr-twp *),
::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before:where(.pr-twp,.pr-twp *),
::after:where(.pr-twp,.pr-twp *) {
  --tw-content: '';
}

/*
1. Use a consistent sensible line-height in all browsers.
2. Prevent adjustments of font size after orientation changes in iOS.
3. Use a more readable tab size.
4. Use the user's configured \`sans\` font-family by default.
5. Use the user's configured \`sans\` font-feature-settings by default.
6. Use the user's configured \`sans\` font-variation-settings by default.
7. Disable tap highlights on iOS
*/

html:where(.pr-twp,.pr-twp *),
:host:where(.pr-twp,.pr-twp *) {
  line-height: 1.5; /* 1 */
  -webkit-text-size-adjust: 100%; /* 2 */ /* 3 */
  tab-size: 4; /* 3 */
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"; /* 4 */
  font-feature-settings: normal; /* 5 */
  font-variation-settings: normal; /* 6 */
  -webkit-tap-highlight-color: transparent; /* 7 */
}

/*
1. Remove the margin in all browsers.
2. Inherit line-height from \`html\` so users can set them as a class directly on the \`html\` element.
*/

body:where(.pr-twp,.pr-twp *) {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr:where(.pr-twp,.pr-twp *) {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]):where(.pr-twp,.pr-twp *) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *) {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a:where(.pr-twp,.pr-twp *) {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b:where(.pr-twp,.pr-twp *),
strong:where(.pr-twp,.pr-twp *) {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code:where(.pr-twp,.pr-twp *),
kbd:where(.pr-twp,.pr-twp *),
samp:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small:where(.pr-twp,.pr-twp *) {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub:where(.pr-twp,.pr-twp *),
sup:where(.pr-twp,.pr-twp *) {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub:where(.pr-twp,.pr-twp *) {
  bottom: -0.25em;
}

sup:where(.pr-twp,.pr-twp *) {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table:where(.pr-twp,.pr-twp *) {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button:where(.pr-twp,.pr-twp *),
input:where(.pr-twp,.pr-twp *),
optgroup:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *),
textarea:where(.pr-twp,.pr-twp *) {
  font-family: inherit; /* 1 */
  font-feature-settings: inherit; /* 1 */
  font-variation-settings: inherit; /* 1 */
  font-size: 100%; /* 1 */
  font-weight: inherit; /* 1 */
  line-height: inherit; /* 1 */
  letter-spacing: inherit; /* 1 */
  color: inherit; /* 1 */
  margin: 0; /* 2 */
  padding: 0; /* 3 */
}

/*
Remove the inheritance of text transform in Edge and Firefox.
*/

button:where(.pr-twp,.pr-twp *),
select:where(.pr-twp,.pr-twp *) {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button:where(.pr-twp,.pr-twp *),
input:where([type='button']):where(.pr-twp,.pr-twp *),
input:where([type='reset']):where(.pr-twp,.pr-twp *),
input:where([type='submit']):where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring:where(.pr-twp,.pr-twp *) {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid:where(.pr-twp,.pr-twp *) {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress:where(.pr-twp,.pr-twp *) {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button:where(.pr-twp,.pr-twp *),
::-webkit-outer-spin-button:where(.pr-twp,.pr-twp *) {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search']:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button:where(.pr-twp,.pr-twp *) {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary:where(.pr-twp,.pr-twp *) {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote:where(.pr-twp,.pr-twp *),
dl:where(.pr-twp,.pr-twp *),
dd:where(.pr-twp,.pr-twp *),
h1:where(.pr-twp,.pr-twp *),
h2:where(.pr-twp,.pr-twp *),
h3:where(.pr-twp,.pr-twp *),
h4:where(.pr-twp,.pr-twp *),
h5:where(.pr-twp,.pr-twp *),
h6:where(.pr-twp,.pr-twp *),
hr:where(.pr-twp,.pr-twp *),
figure:where(.pr-twp,.pr-twp *),
p:where(.pr-twp,.pr-twp *),
pre:where(.pr-twp,.pr-twp *) {
  margin: 0;
}

fieldset:where(.pr-twp,.pr-twp *) {
  margin: 0;
  padding: 0;
}

legend:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

ol:where(.pr-twp,.pr-twp *),
ul:where(.pr-twp,.pr-twp *),
menu:where(.pr-twp,.pr-twp *) {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog:where(.pr-twp,.pr-twp *) {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea:where(.pr-twp,.pr-twp *) {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder:where(.pr-twp,.pr-twp *),
textarea::placeholder:where(.pr-twp,.pr-twp *) {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button:where(.pr-twp,.pr-twp *),
[role="button"]:where(.pr-twp,.pr-twp *) {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled:where(.pr-twp,.pr-twp *) {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img:where(.pr-twp,.pr-twp *),
svg:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *),
canvas:where(.pr-twp,.pr-twp *),
audio:where(.pr-twp,.pr-twp *),
iframe:where(.pr-twp,.pr-twp *),
embed:where(.pr-twp,.pr-twp *),
object:where(.pr-twp,.pr-twp *) {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img:where(.pr-twp,.pr-twp *),
video:where(.pr-twp,.pr-twp *) {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden]:where(.pr-twp,.pr-twp *) {
  display: none;
}
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

  .dark {
    --background: 222.2 84% 4.9%;
    --foreground: 210 40% 98%;

    --card: 222.2 84% 4.9%;
    --card-foreground: 210 40% 98%;

    --popover: 222.2 84% 4.9%;
    --popover-foreground: 210 40% 98%;

    --primary: 210 40% 98%;
    --primary-foreground: 222.2 47.4% 11.2%;

    --secondary: 217.2 32.6% 17.5%;
    --secondary-foreground: 210 40% 98%;

    --muted: 217.2 32.6% 17.5%;
    --muted-foreground: 215 20.2% 65.1%;

    --accent: 217.2 32.6% 17.5%;
    --accent-foreground: 210 40% 98%;

    --destructive: 0 62.8% 30.6%;
    --destructive-foreground: 210 40% 98%;

    --border: 217.2 32.6% 17.5%;
    --input: 217.2 32.6% 17.5%;
    --ring: 212.7 26.8% 83.9%;
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
.pr-sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
.pr-fixed {
  position: fixed;
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
.pr-right-4 {
  right: 1rem;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-4 {
  top: 1rem;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.pr-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.pr-mb-1 {
  margin-bottom: 0.25rem;
}
.pr-ml-5 {
  margin-left: 1.25rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mt-2 {
  margin-top: 0.5rem;
}
.pr-mt-4 {
  margin-top: 1rem;
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
.pr-h-12 {
  height: 3rem;
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
.pr-h-8 {
  height: 2rem;
}
.pr-h-9 {
  height: 2.25rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-96 {
  max-height: 24rem;
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
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
}
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.pr-flex-grow {
  flex-grow: 1;
}
.pr-grow {
  flex-grow: 1;
}
.pr-caption-bottom {
  caption-side: bottom;
}
.pr--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
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
.pr-flex-row {
  flex-direction: row;
}
.pr-flex-col {
  flex-direction: column;
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
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-self-stretch {
  align-self: stretch;
}
.pr-overflow-auto {
  overflow: auto;
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
.pr-break-words {
  overflow-wrap: break-word;
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
.pr-border-0 {
  border-width: 0px;
}
.pr-border-2 {
  border-width: 2px;
}
.pr-border-b {
  border-bottom-width: 1px;
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
.pr-border-t {
  border-top-width: 1px;
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
.pr-border-muted {
  border-color: hsl(var(--muted));
}
.pr-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.pr-border-transparent {
  border-color: transparent;
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
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
.pr-p-0 {
  padding: 0px;
}
.pr-p-1 {
  padding: 0.25rem;
}
.pr-p-2 {
  padding: 0.5rem;
}
.pr-p-4 {
  padding: 1rem;
}
.pr-p-\\[1px\\] {
  padding: 1px;
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
.pr-pb-4 {
  padding-bottom: 1rem;
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
.pr-pt-4 {
  padding-top: 1rem;
}
.pr-text-left {
  text-align: left;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
.pr-text-5xl {
  font-size: 3rem;
  line-height: 1;
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
.pr-uppercase {
  text-transform: uppercase;
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
.pr-text-foreground {
  color: hsl(var(--foreground));
}
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-inherit {
  color: inherit;
}
.pr-text-muted-foreground {
  color: hsl(var(--muted-foreground));
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
.pr-opacity-50 {
  opacity: 0.5;
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
.pr-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.hover\\:pr-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
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
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
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
.focus\\:pr-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.focus\\:pr-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.focus\\:pr-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}
.focus\\:pr-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
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
.focus-visible\\:pr-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
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
.data-\\[side\\=bottom\\]\\:pr-translate-y-1[data-side=bottom] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:pr--translate-x-1[data-side=left] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:pr-translate-x-1[data-side=right] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:pr--translate-y-1[data-side=top] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=active\\]\\:pr-shadow-sm[data-state=active] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
@media (prefers-color-scheme: dark) {

  .dark\\:pr--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:pr-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }
}
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pr-0:has([role=checkbox]) {
  padding-right: 0px;
}
.\\[\\&\\>span\\]\\:pr-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
  sv as BookChapterControl,
  _t as Button,
  av as ChapterRangeSelector,
  Os as Checkbox,
  lv as Checklist,
  Yr as ComboBox,
  uv as ContextMenu,
  pu as DropdownMenu,
  hu as DropdownMenuCheckboxItem,
  Rs as DropdownMenuContent,
  nv as DropdownMenuGroup,
  ks as DropdownMenuItem,
  bo as DropdownMenuLabel,
  rv as DropdownMenuPortal,
  iv as DropdownMenuRadioGroup,
  vu as DropdownMenuRadioItem,
  Ts as DropdownMenuSeparator,
  bu as DropdownMenuShortcut,
  ov as DropdownMenuSub,
  mu as DropdownMenuSubContent,
  gu as DropdownMenuSubTrigger,
  fu as DropdownMenuTrigger,
  Fg as GridMenu,
  Pm as HamburgerMenuButton,
  cv as IconButton,
  yo as Input,
  Da as Label,
  Bt as LabelPosition,
  Sa as MenuItem,
  dv as RefSelector,
  pv as ResultsSource,
  fv as ScriptureRefKeyedList,
  gv as SearchBar,
  mv as Slider,
  hv as Snackbar,
  vv as Switch,
  bv as Table,
  Ev as Tabs,
  Fh as TabsContent,
  Ah as TabsList,
  Dh as TabsTrigger,
  or as TextField,
  yv as Toolbar,
  Vh as VerticalTabs,
  Bh as VerticalTabsContent,
  Lh as VerticalTabsList,
  Sv as VerticalTabsTrigger,
  wv as useEvent,
  xv as useEventAsync,
  ao as usePromise
};
//# sourceMappingURL=index.js.map
