import dl, { jsxs as ee, jsx as y, Fragment as ir } from "react/jsx-runtime";
import * as C from "react";
import jt, { forwardRef as ps, useCallback as $e, useState as Ee, useRef as Ct, useEffect as Rn, useLayoutEffect as si, useMemo as Kt } from "react";
import { getChaptersForBook as fs, offsetBook as ai, FIRST_SCR_BOOK_NUM as pl, offsetChapter as li, FIRST_SCR_CHAPTER_NUM as fl, offsetVerse as ui, FIRST_SCR_VERSE_NUM as gl } from "platform-bible-utils";
import * as we from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ml } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as hl, Check as gs, Circle as vl, History as bl, ArrowDownWideNarrow as yl, Clock as wl, Bookmark as xl, ChevronDown as ms, ChevronUp as Sl, ArrowLeftIcon as Cl, ChevronLeftIcon as El, ChevronRightIcon as Rl, ArrowRightIcon as Tl, FilterIcon as Pl } from "lucide-react";
import Te, { clsx as kl } from "clsx";
import { twMerge as Ol } from "tailwind-merge";
import { Button as _l, Autocomplete as Nl, TextField as hs, FormControlLabel as ci, FormLabel as $l, Checkbox as Il, MenuItem as Ml, ListItemText as Al, ListItemIcon as vs, Menu as Fl, Grid as bs, List as Dl, IconButton as ys, Drawer as Vl, Paper as Ll, Slider as Bl, Snackbar as jl, Switch as zl, AppBar as Hl, Toolbar as Gl } from "@mui/material";
import Ul, { ThemeContext as ql, internal_processStyles as Wl } from "@mui/styled-engine";
import * as Xl from "react-dom";
import Fn from "react-dom";
import Kl, { SelectColumn as Yl } from "react-data-grid";
import { Slot as Jl } from "@radix-ui/react-slot";
import { cva as Zl } from "class-variance-authority";
import * as ye from "@radix-ui/react-select";
var Ql = Object.defineProperty, eu = (e, t, n) => t in e ? Ql(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => (eu(e, typeof t != "symbol" ? t + "" : t, n), n);
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
], go = [
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
], ws = [
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
], di = cu();
function Yt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in di ? di[e] : 0;
}
function mo(e) {
  return Yt(e) > 0;
}
function tu(e) {
  const t = typeof e == "string" ? Yt(e) : e;
  return t >= 40 && t <= 66;
}
function nu(e) {
  return (typeof e == "string" ? Yt(e) : e) <= 39;
}
function xs(e) {
  return e <= 66;
}
function ru(e) {
  const t = typeof e == "string" ? Yt(e) : e;
  return Es(t) && !xs(t);
}
function* ou() {
  for (let e = 1; e <= Rt.length; e++)
    yield e;
}
const iu = 1, Ss = Rt.length;
function su() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function ho(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Rt.length ? t : Rt[n];
}
function Cs(e) {
  return e <= 0 || e > Ss ? "******" : ws[e - 1];
}
function au(e) {
  return Cs(Yt(e));
}
function Es(e) {
  const t = typeof e == "number" ? ho(e) : e;
  return mo(t) && !go.includes(t);
}
function lu(e) {
  const t = typeof e == "number" ? ho(e) : e;
  return mo(t) && go.includes(t);
}
function uu(e) {
  return ws[e - 1].includes("*obsolete*");
}
function cu() {
  const e = {};
  for (let t = 0; t < Rt.length; t++)
    e[Rt[t]] = t + 1;
  return e;
}
const fe = {
  allBookIds: Rt,
  nonCanonicalIds: go,
  bookIdToNumber: Yt,
  isBookIdValid: mo,
  isBookNT: tu,
  isBookOT: nu,
  isBookOTNT: xs,
  isBookDC: ru,
  allBookNumbers: ou,
  firstBook: iu,
  lastBook: Ss,
  extraBooks: su,
  bookNumberToId: ho,
  bookNumberToEnglishName: Cs,
  bookIdToEnglishName: au,
  isCanonical: Es,
  isExtraMaterial: lu,
  isObsolete: uu
};
var dt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(dt || {});
const De = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t != null)
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
oe(De, "Original", new De(dt.Original)), oe(De, "Septuagint", new De(dt.Septuagint)), oe(De, "Vulgate", new De(dt.Vulgate)), oe(De, "English", new De(dt.English)), oe(De, "RussianProtestant", new De(dt.RussianProtestant)), oe(De, "RussianOrthodox", new De(dt.RussianOrthodox));
let Vt = De;
function pi(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Rs = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Rs || {});
const Ne = class ae {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Vt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Vt ? n : void 0;
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
          const i = t instanceof Vt ? t : ae.defaultVersification;
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
      if (r instanceof rn)
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
    return fe.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = fe.bookIdToNumber(t);
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
    if (t <= 0 || t > fe.lastBook)
      throw new rn(
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
    this.versification = this.versification != null ? new Vt(t) : void 0;
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
          this.versification = new Vt(dt[s]);
        } catch {
          throw new rn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new rn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || fe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ae.isVerseParseable(r[1]))
      throw new rn("Invalid reference : " + t);
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
    const o = [], i = pi(this._verse, r);
    for (const s of i.map((a) => pi(a, n))) {
      const a = this.clone();
      a.verse = s[0];
      const u = a.verseNum;
      if (o.push(a), s.length > 1) {
        const c = this.clone();
        if (c.verse = s[1], !t)
          for (let d = u + 1; d < c.verseNum; d++) {
            const g = new ae(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(g);
          }
        o.push(c);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > fe.lastBook ? 2 : (fe.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ae.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = fe.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe(Ne, "defaultVersification", Vt.English), oe(Ne, "verseRangeSeparator", "-"), oe(Ne, "verseSequenceIndicator", ","), oe(Ne, "verseRangeSeparators", [Ne.verseRangeSeparator]), oe(Ne, "verseSequenceIndicators", [Ne.verseSequenceIndicator]), oe(Ne, "chapterDigitShifter", 1e3), oe(Ne, "bookDigitShifter", Ne.chapterDigitShifter * Ne.chapterDigitShifter), oe(Ne, "bcvMaxValue", Ne.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Ne, "ValidStatusType", Rs);
class rn extends Error {
}
function pe(...e) {
  return Ol(kl(e));
}
const vo = we.Root, Ts = we.Trigger, du = C.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ ee(
  we.SubTrigger,
  {
    ref: o,
    className: pe(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ y(hl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
du.displayName = we.SubTrigger.displayName;
const pu = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  we.SubContent,
  {
    ref: n,
    className: pe(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
pu.displayName = we.SubContent.displayName;
const sr = C.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ y(we.Portal, { children: /* @__PURE__ */ y(
  we.Content,
  {
    ref: r,
    sideOffset: t,
    className: pe(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
sr.displayName = we.Content.displayName;
const Ps = C.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  we.Item,
  {
    ref: r,
    className: pe(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Ps.displayName = we.Item.displayName;
const bo = C.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ ee(
  we.CheckboxItem,
  {
    ref: o,
    className: pe(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(we.ItemIndicator, { children: /* @__PURE__ */ y(gs, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
bo.displayName = we.CheckboxItem.displayName;
const fu = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ee(
  we.RadioItem,
  {
    ref: r,
    className: pe(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(we.ItemIndicator, { children: /* @__PURE__ */ y(vl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
fu.displayName = we.RadioItem.displayName;
const ar = C.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  we.Label,
  {
    ref: r,
    className: pe("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
ar.displayName = we.Label.displayName;
const yo = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  we.Separator,
  {
    ref: n,
    className: pe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
yo.displayName = we.Separator.displayName;
const wo = C.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ y(
    "input",
    {
      type: t,
      className: pe(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
wo.displayName = "Input";
const gu = ps(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ ee("div", { className: "pr-relative", children: [
    /* @__PURE__ */ y(
      wo,
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
    /* @__PURE__ */ y(
      bl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function mu({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (a, u) => u + 1), s = $e(
    (a) => {
      o(a);
    },
    [o]
  );
  return /* @__PURE__ */ y("div", { className: pe("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((a) => /* @__PURE__ */ y(
    "div",
    {
      className: pe(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": a === n,
          "pr-bg-amber-200": a === r
        }
      ),
      onClick: (u) => {
        u.preventDefault(), u.stopPropagation(), e(a);
      },
      role: "button",
      onKeyDown: (u) => {
        u.key === "Enter" && e(a);
      },
      tabIndex: 0,
      onMouseMove: () => s(a),
      children: a
    },
    a
  )) });
}
const hu = ps(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, a) => /* @__PURE__ */ ee(
    Ps,
    {
      ref: a,
      textValue: e,
      className: pe("pr-font-normal pr-text-slate-700", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": n
      }),
      onSelect: (u) => {
        u.preventDefault(), t();
      },
      onKeyDown: (u) => {
        o(u);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ y(
          "span",
          {
            className: pe(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: fe.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ y("div", { children: s })
      ]
    },
    e
  )
);
function vu({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ ee(ar, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ y("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ ee("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ y(
        yl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        wl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        xl,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const gn = fe.allBookIds, bu = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, fi = ["OT", "NT", "DC"], yu = 32 + 32 + 32, wu = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], xu = (e) => ({
  OT: gn.filter((n) => fe.isBookOT(n)),
  NT: gn.filter((n) => fe.isBookNT(n)),
  DC: gn.filter((n) => fe.isBookDC(n))
})[e], on = (e) => fs(fe.bookIdToNumber(e));
function Su() {
  return gn.map((t) => fe.bookIdToEnglishName(t));
}
function Cu(e) {
  return Su().includes(e);
}
function Eu(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Cu(t))
    return gn.find((r) => fe.bookIdToEnglishName(r) === t);
}
function Wh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ee(""), [o, i] = Ee(
    fe.bookNumberToId(e.bookNum)
  ), [s, a] = Ee(e.chapterNum ?? 0), [u, c] = Ee(
    fe.bookNumberToId(e.bookNum)
  ), [d, g] = Ee(!1), [f, p] = Ee(d), m = Ct(void 0), h = Ct(void 0), v = Ct(void 0), w = $e(
    (P) => xu(P).filter((N) => {
      const $ = fe.bookIdToEnglishName(N).toLowerCase(), B = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(B) || // Match book name
      N.toLowerCase().includes(B);
    }),
    [n]
  ), k = (P) => {
    r(P);
  }, x = Ct(!1), S = $e((P) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    g(P);
  }, []), b = $e(
    (P, N, $, B) => {
      if (a(
        fe.bookNumberToId(e.bookNum) !== P ? 1 : e.chapterNum
      ), N || on(P) === -1) {
        t({
          bookNum: fe.bookIdToNumber(P),
          chapterNum: $ || 1,
          verseNum: B || 1
        }), g(!1), r("");
        return;
      }
      i(o !== P ? P : ""), g(!N);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (P) => {
    P <= 0 || P > on(o) || b(o, !0, P);
  }, O = $e(() => {
    wu.forEach((P) => {
      const N = n.match(P);
      if (N) {
        const [$, B = void 0, F = void 0] = N.slice(1), I = Eu($);
        (fe.isBookIdValid($) || I) && b(
          I ?? $,
          !0,
          B ? parseInt(B, 10) : 1,
          F ? parseInt(F, 10) : 1
        );
      }
    });
  }, [b, n]), D = $e(
    (P) => {
      d ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null && h.current.focus(), P.preventDefault()) : g(!0);
    },
    [d]
  ), V = (P) => {
    const { key: N } = P;
    N === "ArrowRight" || N === "ArrowLeft" || N === "ArrowDown" || N === "ArrowUp" || N === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: N })), m.current.focus());
  }, L = (P) => {
    const { key: N } = P;
    if (u === o) {
      if (N === "Enter") {
        P.preventDefault(), b(o, !0, s);
        return;
      }
      let $ = 0;
      if (N === "ArrowRight")
        if (s < on(u))
          $ = 1;
        else {
          P.preventDefault();
          return;
        }
      else if (N === "ArrowLeft")
        if (s > 1)
          $ = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        N === "ArrowDown" ? $ = 6 : N === "ArrowUp" && ($ = -6);
      s + $ <= 0 || s + $ > on(u) ? a(0) : $ !== 0 && (a(s + $), P.preventDefault());
    }
  };
  return Rn(() => {
    o === u ? o === fe.bookNumberToId(e.bookNum) ? a(e.chapterNum) : a(1) : a(0);
  }, [u, e.bookNum, e.chapterNum, o]), si(() => {
    p(d);
  }, [d]), si(() => {
    const P = setTimeout(() => {
      if (f && h.current && v.current) {
        const $ = v.current.offsetTop - yu;
        h.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [f]), /* @__PURE__ */ y("div", { children: /* @__PURE__ */ ee(vo, { modal: !1, open: d, onOpenChange: S, children: [
    /* @__PURE__ */ y(Ts, { asChild: !0, children: /* @__PURE__ */ y(
      gu,
      {
        ref: m,
        value: n,
        handleSearch: k,
        handleKeyDown: D,
        handleOnClick: () => {
          i(fe.bookNumberToId(e.bookNum)), c(fe.bookNumberToId(e.bookNum)), a(e.chapterNum > 0 ? e.chapterNum : 0), g(!0), m.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: O,
        placeholder: `${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ ee(
      sr,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: V,
        align: "start",
        ref: h,
        children: [
          /* @__PURE__ */ y(
            vu,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          fi.map(
            (P, N) => w(P).length > 0 && /* @__PURE__ */ ee("div", { children: [
              /* @__PURE__ */ y(ar, { className: "pr-font-semibold pr-text-slate-700", children: bu[P] }),
              w(P).map(($) => /* @__PURE__ */ y("div", { children: /* @__PURE__ */ y(
                hu,
                {
                  bookId: $,
                  handleSelectBook: () => b($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => c($),
                  handleKeyDown: L,
                  bookType: P,
                  ref: (B) => {
                    o === $ && (v.current = B);
                  },
                  children: /* @__PURE__ */ y(
                    mu,
                    {
                      handleSelectChapter: T,
                      endChapter: on($),
                      activeChapter: e.bookNum === fe.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (B) => {
                        a(B);
                      }
                    }
                  )
                }
              ) }, $)),
              fi.length - 1 !== N ? /* @__PURE__ */ y(yo, {}) : void 0
            ] }, P)
          )
        ]
      }
    )
  ] }) });
}
function Nt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ y(
    _l,
    {
      id: e,
      disabled: t,
      className: `papi-button ${n ?? ""}`,
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function Xr({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: s,
  options: a = [],
  className: u,
  value: c,
  onChange: d,
  onFocus: g,
  onBlur: f,
  getOptionLabel: p
}) {
  return /* @__PURE__ */ y(
    Nl,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: a,
      className: `papi-combo-box ${o ? "error" : ""} ${u ?? ""}`,
      value: c,
      onChange: d,
      onFocus: g,
      onBlur: f,
      getOptionLabel: p,
      renderInput: (m) => /* @__PURE__ */ y(
        hs,
        {
          ...m,
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
function Xh({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const s = Kt(
    () => Array.from({ length: i }, (c, d) => d + 1),
    [i]
  ), a = (c, d) => {
    n(d), d > t && r(d);
  }, u = (c, d) => {
    r(d), d < e && n(d);
  };
  return /* @__PURE__ */ ee(ir, { children: [
    /* @__PURE__ */ y(
      ci,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ y(
          Xr,
          {
            onChange: (c, d) => a(c, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (c) => c.toString(),
            value: e,
            isDisabled: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ y(
      ci,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ y(
          Xr,
          {
            onChange: (c, d) => u(c, d),
            className: "book-selection-chapter",
            isClearable: !1,
            options: s,
            getOptionLabel: (c) => c.toString(),
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
var Lt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Lt || {});
function Ru({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Lt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: a = !1,
  className: u,
  onChange: c
}) {
  const d = /* @__PURE__ */ y(
    Il,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: s,
      className: `papi-checkbox ${a ? "error" : ""} ${u ?? ""}`,
      onChange: c
    }
  );
  let g;
  if (n) {
    const f = r === Lt.Before || r === Lt.Above, p = /* @__PURE__ */ y("span", { className: `papi-checkbox-label ${a ? "error" : ""} ${u ?? ""}`, children: n }), m = r === Lt.Before || r === Lt.After, h = m ? p : /* @__PURE__ */ y("div", { children: p }), v = m ? d : /* @__PURE__ */ y("div", { children: d });
    g = /* @__PURE__ */ ee(
      $l,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: a,
        children: [
          f && h,
          v,
          !f && h
        ]
      }
    );
  } else
    g = d;
  return g;
}
function ge(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function E() {
  return E = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, E.apply(this, arguments);
}
function Tu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Pu(e) {
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
var Kr = { exports: {} }, Dn = { exports: {} }, le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gi;
function ku() {
  if (gi)
    return le;
  gi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
  function x(b) {
    if (typeof b == "object" && b !== null) {
      var T = b.$$typeof;
      switch (T) {
        case t:
          switch (b = b.type, b) {
            case u:
            case c:
            case r:
            case i:
            case o:
            case g:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case a:
                case d:
                case m:
                case p:
                case s:
                  return b;
                default:
                  return T;
              }
          }
        case n:
          return T;
      }
    }
  }
  function S(b) {
    return x(b) === c;
  }
  return le.AsyncMode = u, le.ConcurrentMode = c, le.ContextConsumer = a, le.ContextProvider = s, le.Element = t, le.ForwardRef = d, le.Fragment = r, le.Lazy = m, le.Memo = p, le.Portal = n, le.Profiler = i, le.StrictMode = o, le.Suspense = g, le.isAsyncMode = function(b) {
    return S(b) || x(b) === u;
  }, le.isConcurrentMode = S, le.isContextConsumer = function(b) {
    return x(b) === a;
  }, le.isContextProvider = function(b) {
    return x(b) === s;
  }, le.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, le.isForwardRef = function(b) {
    return x(b) === d;
  }, le.isFragment = function(b) {
    return x(b) === r;
  }, le.isLazy = function(b) {
    return x(b) === m;
  }, le.isMemo = function(b) {
    return x(b) === p;
  }, le.isPortal = function(b) {
    return x(b) === n;
  }, le.isProfiler = function(b) {
    return x(b) === i;
  }, le.isStrictMode = function(b) {
    return x(b) === o;
  }, le.isSuspense = function(b) {
    return x(b) === g;
  }, le.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === c || b === i || b === o || b === g || b === f || typeof b == "object" && b !== null && (b.$$typeof === m || b.$$typeof === p || b.$$typeof === s || b.$$typeof === a || b.$$typeof === d || b.$$typeof === v || b.$$typeof === w || b.$$typeof === k || b.$$typeof === h);
  }, le.typeOf = x, le;
}
var ue = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var mi;
function Ou() {
  return mi || (mi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function x(M) {
      return typeof M == "string" || typeof M == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      M === r || M === c || M === i || M === o || M === g || M === f || typeof M == "object" && M !== null && (M.$$typeof === m || M.$$typeof === p || M.$$typeof === s || M.$$typeof === a || M.$$typeof === d || M.$$typeof === v || M.$$typeof === w || M.$$typeof === k || M.$$typeof === h);
    }
    function S(M) {
      if (typeof M == "object" && M !== null) {
        var Q = M.$$typeof;
        switch (Q) {
          case t:
            var _ = M.type;
            switch (_) {
              case u:
              case c:
              case r:
              case i:
              case o:
              case g:
                return _;
              default:
                var se = _ && _.$$typeof;
                switch (se) {
                  case a:
                  case d:
                  case m:
                  case p:
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
    var b = u, T = c, O = a, D = s, V = t, L = d, P = r, N = m, $ = p, B = n, F = i, I = o, j = g, ne = !1;
    function te(M) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), R(M) || S(M) === u;
    }
    function R(M) {
      return S(M) === c;
    }
    function A(M) {
      return S(M) === a;
    }
    function H(M) {
      return S(M) === s;
    }
    function X(M) {
      return typeof M == "object" && M !== null && M.$$typeof === t;
    }
    function z(M) {
      return S(M) === d;
    }
    function G(M) {
      return S(M) === r;
    }
    function q(M) {
      return S(M) === m;
    }
    function W(M) {
      return S(M) === p;
    }
    function U(M) {
      return S(M) === n;
    }
    function K(M) {
      return S(M) === i;
    }
    function Z(M) {
      return S(M) === o;
    }
    function ie(M) {
      return S(M) === g;
    }
    ue.AsyncMode = b, ue.ConcurrentMode = T, ue.ContextConsumer = O, ue.ContextProvider = D, ue.Element = V, ue.ForwardRef = L, ue.Fragment = P, ue.Lazy = N, ue.Memo = $, ue.Portal = B, ue.Profiler = F, ue.StrictMode = I, ue.Suspense = j, ue.isAsyncMode = te, ue.isConcurrentMode = R, ue.isContextConsumer = A, ue.isContextProvider = H, ue.isElement = X, ue.isForwardRef = z, ue.isFragment = G, ue.isLazy = q, ue.isMemo = W, ue.isPortal = U, ue.isProfiler = K, ue.isStrictMode = Z, ue.isSuspense = ie, ue.isValidElementType = x, ue.typeOf = S;
  }()), ue;
}
var hi;
function ks() {
  return hi || (hi = 1, process.env.NODE_ENV === "production" ? Dn.exports = ku() : Dn.exports = Ou()), Dn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Tr, vi;
function _u() {
  if (vi)
    return Tr;
  vi = 1;
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
      var u = Object.getOwnPropertyNames(s).map(function(d) {
        return s[d];
      });
      if (u.join("") !== "0123456789")
        return !1;
      var c = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        c[d] = d;
      }), Object.keys(Object.assign({}, c)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Tr = o() ? Object.assign : function(i, s) {
    for (var a, u = r(i), c, d = 1; d < arguments.length; d++) {
      a = Object(arguments[d]);
      for (var g in a)
        t.call(a, g) && (u[g] = a[g]);
      if (e) {
        c = e(a);
        for (var f = 0; f < c.length; f++)
          n.call(a, c[f]) && (u[c[f]] = a[c[f]]);
      }
    }
    return u;
  }, Tr;
}
var Pr, bi;
function xo() {
  if (bi)
    return Pr;
  bi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Pr = e, Pr;
}
var kr, yi;
function Os() {
  return yi || (yi = 1, kr = Function.call.bind(Object.prototype.hasOwnProperty)), kr;
}
var Or, wi;
function Nu() {
  if (wi)
    return Or;
  wi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = xo(), n = {}, r = Os();
    e = function(i) {
      var s = "Warning: " + i;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(i, s, a, u, c) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in i)
        if (r(i, d)) {
          var g;
          try {
            if (typeof i[d] != "function") {
              var f = Error(
                (u || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            g = i[d](s, d, u, a, null, t);
          } catch (m) {
            g = m;
          }
          if (g && !(g instanceof Error) && e(
            (u || "React class") + ": type specification of " + a + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof g + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), g instanceof Error && !(g.message in n)) {
            n[g.message] = !0;
            var p = c ? c() : "";
            e(
              "Failed " + a + " type: " + g.message + (p ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Or = o, Or;
}
var _r, xi;
function $u() {
  if (xi)
    return _r;
  xi = 1;
  var e = ks(), t = _u(), n = xo(), r = Os(), o = Nu(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(a) {
    var u = "Warning: " + a;
    typeof console < "u" && console.error(u);
    try {
      throw new Error(u);
    } catch {
    }
  });
  function s() {
    return null;
  }
  return _r = function(a, u) {
    var c = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function g(R) {
      var A = R && (c && R[c] || R[d]);
      if (typeof A == "function")
        return A;
    }
    var f = "<<anonymous>>", p = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: k(),
      arrayOf: x,
      element: S(),
      elementType: b(),
      instanceOf: T,
      node: L(),
      objectOf: D,
      oneOf: O,
      oneOfType: V,
      shape: N,
      exact: $
    };
    function m(R, A) {
      return R === A ? R !== 0 || 1 / R === 1 / A : R !== R && A !== A;
    }
    function h(R, A) {
      this.message = R, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function v(R) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, H = 0;
      function X(G, q, W, U, K, Z, ie) {
        if (U = U || f, Z = Z || W, ie !== n) {
          if (u) {
            var M = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw M.name = "Invariant Violation", M;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = U + ":" + W;
            !A[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[Q] = !0, H++);
          }
        }
        return q[W] == null ? G ? q[W] === null ? new h("The " + K + " `" + Z + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new h("The " + K + " `" + Z + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : R(q, W, U, K, Z);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function w(R) {
      function A(H, X, z, G, q, W) {
        var U = H[X], K = I(U);
        if (K !== R) {
          var Z = j(U);
          return new h(
            "Invalid " + G + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + z + "`, expected ") + ("`" + R + "`."),
            { expectedType: R }
          );
        }
        return null;
      }
      return v(A);
    }
    function k() {
      return v(s);
    }
    function x(R) {
      function A(H, X, z, G, q) {
        if (typeof R != "function")
          return new h("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var W = H[X];
        if (!Array.isArray(W)) {
          var U = I(W);
          return new h("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an array."));
        }
        for (var K = 0; K < W.length; K++) {
          var Z = R(W, K, z, G, q + "[" + K + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return v(A);
    }
    function S() {
      function R(A, H, X, z, G) {
        var q = A[H];
        if (!a(q)) {
          var W = I(q);
          return new h("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(R);
    }
    function b() {
      function R(A, H, X, z, G) {
        var q = A[H];
        if (!e.isValidElementType(q)) {
          var W = I(q);
          return new h("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(R);
    }
    function T(R) {
      function A(H, X, z, G, q) {
        if (!(H[X] instanceof R)) {
          var W = R.name || f, U = te(H[X]);
          return new h("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return v(A);
    }
    function O(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(H, X, z, G, q) {
        for (var W = H[X], U = 0; U < R.length; U++)
          if (m(W, R[U]))
            return null;
        var K = JSON.stringify(R, function(ie, M) {
          var Q = j(M);
          return Q === "symbol" ? String(M) : M;
        });
        return new h("Invalid " + G + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + z + "`, expected one of " + K + "."));
      }
      return v(A);
    }
    function D(R) {
      function A(H, X, z, G, q) {
        if (typeof R != "function")
          return new h("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var W = H[X], U = I(W);
        if (U !== "object")
          return new h("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an object."));
        for (var K in W)
          if (r(W, K)) {
            var Z = R(W, K, z, G, q + "." + K, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return v(A);
    }
    function V(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < R.length; A++) {
        var H = R[A];
        if (typeof H != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ne(H) + " at index " + A + "."
          ), s;
      }
      function X(z, G, q, W, U) {
        for (var K = [], Z = 0; Z < R.length; Z++) {
          var ie = R[Z], M = ie(z, G, q, W, U, n);
          if (M == null)
            return null;
          M.data && r(M.data, "expectedType") && K.push(M.data.expectedType);
        }
        var Q = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new h("Invalid " + W + " `" + U + "` supplied to " + ("`" + q + "`" + Q + "."));
      }
      return v(X);
    }
    function L() {
      function R(A, H, X, z, G) {
        return B(A[H]) ? null : new h("Invalid " + z + " `" + G + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return v(R);
    }
    function P(R, A, H, X, z) {
      return new h(
        (R || "React class") + ": " + A + " type `" + H + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function N(R) {
      function A(H, X, z, G, q) {
        var W = H[X], U = I(W);
        if (U !== "object")
          return new h("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var K in R) {
          var Z = R[K];
          if (typeof Z != "function")
            return P(z, G, q, K, j(Z));
          var ie = Z(W, K, z, G, q + "." + K, n);
          if (ie)
            return ie;
        }
        return null;
      }
      return v(A);
    }
    function $(R) {
      function A(H, X, z, G, q) {
        var W = H[X], U = I(W);
        if (U !== "object")
          return new h("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        var K = t({}, H[X], R);
        for (var Z in K) {
          var ie = R[Z];
          if (r(R, Z) && typeof ie != "function")
            return P(z, G, q, Z, j(ie));
          if (!ie)
            return new h(
              "Invalid " + G + " `" + q + "` key `" + Z + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(R), null, "  ")
            );
          var M = ie(W, Z, z, G, q + "." + Z, n);
          if (M)
            return M;
        }
        return null;
      }
      return v(A);
    }
    function B(R) {
      switch (typeof R) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !R;
        case "object":
          if (Array.isArray(R))
            return R.every(B);
          if (R === null || a(R))
            return !0;
          var A = g(R);
          if (A) {
            var H = A.call(R), X;
            if (A !== R.entries) {
              for (; !(X = H.next()).done; )
                if (!B(X.value))
                  return !1;
            } else
              for (; !(X = H.next()).done; ) {
                var z = X.value;
                if (z && !B(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function F(R, A) {
      return R === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function I(R) {
      var A = typeof R;
      return Array.isArray(R) ? "array" : R instanceof RegExp ? "object" : F(A, R) ? "symbol" : A;
    }
    function j(R) {
      if (typeof R > "u" || R === null)
        return "" + R;
      var A = I(R);
      if (A === "object") {
        if (R instanceof Date)
          return "date";
        if (R instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function ne(R) {
      var A = j(R);
      switch (A) {
        case "array":
        case "object":
          return "an " + A;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + A;
        default:
          return A;
      }
    }
    function te(R) {
      return !R.constructor || !R.constructor.name ? f : R.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, _r;
}
var Nr, Si;
function Iu() {
  if (Si)
    return Nr;
  Si = 1;
  var e = xo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Nr = function() {
    function r(s, a, u, c, d, g) {
      if (g !== e) {
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
  }, Nr;
}
if (process.env.NODE_ENV !== "production") {
  var Mu = ks(), Au = !0;
  Kr.exports = $u()(Mu.isElement, Au);
} else
  Kr.exports = Iu()();
var Fu = Kr.exports;
const l = /* @__PURE__ */ Tu(Fu);
function Jt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function St(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function _s(e) {
  if (!St(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = _s(e[n]);
  }), t;
}
function ot(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? E({}, e) : e;
  return St(e) && St(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (St(t[o]) && o in e && St(e[o]) ? r[o] = ot(e[o], t[o], n) : n.clone ? r[o] = St(t[o]) ? _s(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Du(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ns(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  const u = i.type;
  return typeof u == "function" && !Du(u) && (a = "Did you accidentally use a plain function component for an element instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const $s = Jt(l.element, Ns);
$s.isRequired = Jt(l.element.isRequired, Ns);
const Tn = $s;
function Vu(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Lu(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  return typeof i == "function" && !Vu(i) && (a = "Did you accidentally provide a plain function component instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Bu = Jt(l.elementType, Lu), ju = "exact-prop: ​";
function Is(e) {
  return process.env.NODE_ENV === "production" ? e : E({}, e, {
    [ju]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Ht(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Yr = { exports: {} }, ce = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ci;
function zu() {
  if (Ci)
    return ce;
  Ci = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function h(v) {
    if (typeof v == "object" && v !== null) {
      var w = v.$$typeof;
      switch (w) {
        case e:
          switch (v = v.type, v) {
            case n:
            case o:
            case r:
            case c:
            case d:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case a:
                case s:
                case u:
                case f:
                case g:
                case i:
                  return v;
                default:
                  return w;
              }
          }
        case t:
          return w;
      }
    }
  }
  return ce.ContextConsumer = s, ce.ContextProvider = i, ce.Element = e, ce.ForwardRef = u, ce.Fragment = n, ce.Lazy = f, ce.Memo = g, ce.Portal = t, ce.Profiler = o, ce.StrictMode = r, ce.Suspense = c, ce.SuspenseList = d, ce.isAsyncMode = function() {
    return !1;
  }, ce.isConcurrentMode = function() {
    return !1;
  }, ce.isContextConsumer = function(v) {
    return h(v) === s;
  }, ce.isContextProvider = function(v) {
    return h(v) === i;
  }, ce.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, ce.isForwardRef = function(v) {
    return h(v) === u;
  }, ce.isFragment = function(v) {
    return h(v) === n;
  }, ce.isLazy = function(v) {
    return h(v) === f;
  }, ce.isMemo = function(v) {
    return h(v) === g;
  }, ce.isPortal = function(v) {
    return h(v) === t;
  }, ce.isProfiler = function(v) {
    return h(v) === o;
  }, ce.isStrictMode = function(v) {
    return h(v) === r;
  }, ce.isSuspense = function(v) {
    return h(v) === c;
  }, ce.isSuspenseList = function(v) {
    return h(v) === d;
  }, ce.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === o || v === r || v === c || v === d || v === p || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === g || v.$$typeof === i || v.$$typeof === s || v.$$typeof === u || v.$$typeof === m || v.getModuleId !== void 0);
  }, ce.typeOf = h, ce;
}
var de = {};
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
function Hu() {
  return Ei || (Ei = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = !1, h = !1, v = !1, w = !1, k = !1, x;
    x = Symbol.for("react.module.reference");
    function S(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === n || _ === o || k || _ === r || _ === c || _ === d || w || _ === p || m || h || v || typeof _ == "object" && _ !== null && (_.$$typeof === f || _.$$typeof === g || _.$$typeof === i || _.$$typeof === s || _.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === x || _.getModuleId !== void 0));
    }
    function b(_) {
      if (typeof _ == "object" && _ !== null) {
        var se = _.$$typeof;
        switch (se) {
          case e:
            var Se = _.type;
            switch (Se) {
              case n:
              case o:
              case r:
              case c:
              case d:
                return Se;
              default:
                var Oe = Se && Se.$$typeof;
                switch (Oe) {
                  case a:
                  case s:
                  case u:
                  case f:
                  case g:
                  case i:
                    return Oe;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var T = s, O = i, D = e, V = u, L = n, P = f, N = g, $ = t, B = o, F = r, I = c, j = d, ne = !1, te = !1;
    function R(_) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(_) {
      return te || (te = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(_) {
      return b(_) === s;
    }
    function X(_) {
      return b(_) === i;
    }
    function z(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === e;
    }
    function G(_) {
      return b(_) === u;
    }
    function q(_) {
      return b(_) === n;
    }
    function W(_) {
      return b(_) === f;
    }
    function U(_) {
      return b(_) === g;
    }
    function K(_) {
      return b(_) === t;
    }
    function Z(_) {
      return b(_) === o;
    }
    function ie(_) {
      return b(_) === r;
    }
    function M(_) {
      return b(_) === c;
    }
    function Q(_) {
      return b(_) === d;
    }
    de.ContextConsumer = T, de.ContextProvider = O, de.Element = D, de.ForwardRef = V, de.Fragment = L, de.Lazy = P, de.Memo = N, de.Portal = $, de.Profiler = B, de.StrictMode = F, de.Suspense = I, de.SuspenseList = j, de.isAsyncMode = R, de.isConcurrentMode = A, de.isContextConsumer = H, de.isContextProvider = X, de.isElement = z, de.isForwardRef = G, de.isFragment = q, de.isLazy = W, de.isMemo = U, de.isPortal = K, de.isProfiler = Z, de.isStrictMode = ie, de.isSuspense = M, de.isSuspenseList = Q, de.isValidElementType = S, de.typeOf = b;
  }()), de;
}
process.env.NODE_ENV === "production" ? Yr.exports = zu() : Yr.exports = Hu();
var Yn = Yr.exports;
const Gu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Uu(e) {
  const t = `${e}`.match(Gu);
  return t && t[1] || "";
}
function Ms(e, t = "") {
  return e.displayName || e.name || Uu(e) || t;
}
function Ri(e, t, n) {
  const r = Ms(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function qu(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ms(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Yn.ForwardRef:
          return Ri(e, e.render, "ForwardRef");
        case Yn.Memo:
          return Ri(e, e.type, "memo");
        default:
          return;
      }
  }
}
function it(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Wu = l.oneOfType([l.func, l.object]), So = Wu;
function Ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ht(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Jr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function As(e, t = 166) {
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
function Xu(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const a = o || "<<anonymous>>", u = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`) : null;
  };
}
function Ku(e, t) {
  var n, r;
  return /* @__PURE__ */ C.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Pe(e) {
  return e && e.ownerDocument || document;
}
function Gt(e) {
  return Pe(e).defaultView || window;
}
function Yu(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? E({}, t.propTypes) : null;
  return (o) => (i, s, a, u, c, ...d) => {
    const g = c || s, f = n == null ? void 0 : n[g];
    if (f) {
      const p = f(i, s, a, u, c, ...d);
      if (p)
        return p;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Jn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Ju = typeof window < "u" ? C.useLayoutEffect : C.useEffect, Tt = Ju;
let Ti = 0;
function Zu(e) {
  const [t, n] = C.useState(e), r = e || t;
  return C.useEffect(() => {
    t == null && (Ti += 1, n(`mui-${Ti}`));
  }, [t]), r;
}
const Pi = C["useId".toString()];
function Fs(e) {
  if (Pi !== void 0) {
    const t = Pi();
    return e ?? t;
  }
  return Zu(e);
}
function Qu(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Ds({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = C.useRef(e !== void 0), [i, s] = C.useState(t), a = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    C.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: c
    } = C.useRef(t);
    C.useEffect(() => {
      !o && c !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const u = C.useCallback((c) => {
    o || s(c);
  }, []);
  return [a, u];
}
function wn(e) {
  const t = C.useRef(e);
  return Tt(() => {
    t.current = e;
  }), C.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ge(...e) {
  return C.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Jn(n, t);
    });
  }, e);
}
const ki = {};
function ec(e, t) {
  const n = C.useRef(ki);
  return n.current === ki && (n.current = e(t)), n;
}
const tc = [];
function nc(e) {
  C.useEffect(e, tc);
}
class Pn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Pn();
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
function dn() {
  const e = ec(Pn.create).current;
  return nc(e.disposeEffect), e;
}
let lr = !0, Zr = !1;
const rc = new Pn(), oc = {
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
function ic(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && oc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function sc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (lr = !0);
}
function $r() {
  lr = !1;
}
function ac() {
  this.visibilityState === "hidden" && Zr && (lr = !0);
}
function lc(e) {
  e.addEventListener("keydown", sc, !0), e.addEventListener("mousedown", $r, !0), e.addEventListener("pointerdown", $r, !0), e.addEventListener("touchstart", $r, !0), e.addEventListener("visibilitychange", ac, !0);
}
function uc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return lr || ic(t);
}
function Vs() {
  const e = C.useCallback((o) => {
    o != null && lc(o.ownerDocument);
  }, []), t = C.useRef(!1);
  function n() {
    return t.current ? (Zr = !0, rc.start(100, () => {
      Zr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return uc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Ls(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function cc(e) {
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
function dc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const pc = Number.isInteger || dc;
function Bs(e, t, n, r) {
  const o = e[t];
  if (o == null || !pc(o)) {
    const i = cc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function js(e, t, ...n) {
  return e[t] === void 0 ? null : Bs(e, t, ...n);
}
function Qr() {
  return null;
}
js.isRequired = Bs;
Qr.isRequired = Qr;
const zs = process.env.NODE_ENV === "production" ? Qr : js;
function Hs(e, t) {
  const n = E({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = E({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = E({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = Hs(o[s], i[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function lt(e, t, n = void 0) {
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
const Oi = (e) => e, fc = () => {
  let e = Oi;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Oi;
    }
  };
}, gc = fc(), Gs = gc, Us = {
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
  const r = Us[t];
  return r ? `${n}-${r}` : `${Gs.generate(e)}-${t}`;
}
function mt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ze(e, o, n);
  }), r;
}
function mc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function qs(e) {
  return typeof e == "string";
}
function pn(e, t, n) {
  return e === void 0 || qs(e) ? t : E({}, t, {
    ownerState: E({}, t.ownerState, n)
  });
}
const hc = {
  disableDefaultClasses: !1
}, vc = /* @__PURE__ */ C.createContext(hc);
function bc(e) {
  const {
    disableDefaultClasses: t
  } = C.useContext(vc);
  return (n) => t ? "" : e(n);
}
function Ws(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function yc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function _i(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function wc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const p = Te(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = E({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), h = E({}, n, o, r);
    return p.length > 0 && (h.className = p), Object.keys(m).length > 0 && (h.style = m), {
      props: h,
      internalRef: void 0
    };
  }
  const s = Ws(E({}, o, r)), a = _i(r), u = _i(o), c = t(s), d = Te(c == null ? void 0 : c.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), g = E({}, c == null ? void 0 : c.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = E({}, c, n, u, a);
  return d.length > 0 && (f.className = d), Object.keys(g).length > 0 && (f.style = g), {
    props: f,
    internalRef: c.ref
  };
}
const xc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Pt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ge(e, xc), a = i ? {} : yc(r, o), {
    props: u,
    internalRef: c
  } = wc(E({}, s, {
    externalSlotProps: a
  })), d = Ge(c, a == null ? void 0 : a.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return pn(n, E({}, u, {
    ref: d
  }), o);
}
const Xs = "base";
function Sc(e) {
  return `${Xs}--${e}`;
}
function Cc(e, t) {
  return `${Xs}-${e}-${t}`;
}
function Ks(e, t) {
  const n = Us[t];
  return n ? Sc(n) : Cc(e, t);
}
function Ec(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ks(e, r);
  }), n;
}
const Rc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Tc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Pc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function kc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Pc(e));
}
function Oc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Rc)).forEach((r, o) => {
    const i = Tc(r);
    i === -1 || !kc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function _c() {
  return !0;
}
function Zn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Oc,
    isEnabled: s = _c,
    open: a
  } = e, u = C.useRef(!1), c = C.useRef(null), d = C.useRef(null), g = C.useRef(null), f = C.useRef(null), p = C.useRef(!1), m = C.useRef(null), h = Ge(t.ref, m), v = C.useRef(null);
  C.useEffect(() => {
    !a || !m.current || (p.current = !n);
  }, [n, a]), C.useEffect(() => {
    if (!a || !m.current)
      return;
    const x = Pe(m.current);
    return m.current.contains(x.activeElement) || (m.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), m.current.setAttribute("tabIndex", "-1")), p.current && m.current.focus()), () => {
      o || (g.current && g.current.focus && (u.current = !0, g.current.focus()), g.current = null);
    };
  }, [a]), C.useEffect(() => {
    if (!a || !m.current)
      return;
    const x = Pe(m.current), S = (O) => {
      v.current = O, !(r || !s() || O.key !== "Tab") && x.activeElement === m.current && O.shiftKey && (u.current = !0, d.current && d.current.focus());
    }, b = () => {
      const O = m.current;
      if (O === null)
        return;
      if (!x.hasFocus() || !s() || u.current) {
        u.current = !1;
        return;
      }
      if (O.contains(x.activeElement) || r && x.activeElement !== c.current && x.activeElement !== d.current)
        return;
      if (x.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!p.current)
        return;
      let D = [];
      if ((x.activeElement === c.current || x.activeElement === d.current) && (D = i(m.current)), D.length > 0) {
        var V, L;
        const P = !!((V = v.current) != null && V.shiftKey && ((L = v.current) == null ? void 0 : L.key) === "Tab"), N = D[0], $ = D[D.length - 1];
        typeof N != "string" && typeof $ != "string" && (P ? $.focus() : N.focus());
      } else
        O.focus();
    };
    x.addEventListener("focusin", b), x.addEventListener("keydown", S, !0);
    const T = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(T), x.removeEventListener("focusin", b), x.removeEventListener("keydown", S, !0);
    };
  }, [n, r, o, s, a, i]);
  const w = (x) => {
    g.current === null && (g.current = x.relatedTarget), p.current = !0, f.current = x.target;
    const S = t.props.onFocus;
    S && S(x);
  }, k = (x) => {
    g.current === null && (g.current = x.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ ee(C.Fragment, {
    children: [/* @__PURE__ */ y("div", {
      tabIndex: a ? 0 : -1,
      onFocus: k,
      ref: c,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ C.cloneElement(t, {
      ref: h,
      onFocus: w
    }), /* @__PURE__ */ y("div", {
      tabIndex: a ? 0 : -1,
      onFocus: k,
      ref: d,
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
  children: Tn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: l.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: l.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: l.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: l.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: l.func,
  /**
   * If `true`, focus is locked.
   */
  open: l.bool.isRequired
});
process.env.NODE_ENV !== "production" && (Zn["propTypes"] = Is(Zn.propTypes));
function Nc(e) {
  return typeof e == "function" ? e() : e;
}
const xn = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, a] = C.useState(null), u = Ge(/* @__PURE__ */ C.isValidElement(r) ? r.ref : null, n);
  if (Tt(() => {
    i || a(Nc(o) || document.body);
  }, [o, i]), Tt(() => {
    if (s && !i)
      return Jn(n, s), () => {
        Jn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ C.isValidElement(r)) {
      const c = {
        ref: u
      };
      return /* @__PURE__ */ C.cloneElement(r, c);
    }
    return /* @__PURE__ */ y(C.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ y(C.Fragment, {
    children: s && /* @__PURE__ */ Xl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (xn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: l.node,
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
  container: l.oneOfType([it, l.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool
});
process.env.NODE_ENV !== "production" && (xn["propTypes"] = Is(xn.propTypes));
function $c(e) {
  const t = Pe(e);
  return t.body === e ? Gt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function mn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ni(e) {
  return parseInt(Gt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Ic(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function $i(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const a = i.indexOf(s) === -1, u = !Ic(s);
    a && u && mn(s, o);
  });
}
function Ir(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Mc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if ($c(r)) {
      const s = Ls(Pe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ni(r) + s}px`;
      const a = Pe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(a, (u) => {
        n.push({
          value: u.style.paddingRight,
          property: "padding-right",
          el: u
        }), u.style.paddingRight = `${Ni(u) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Pe(r).body;
    else {
      const s = r.parentElement, a = Gt(r);
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
function Ac(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Fc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && mn(t.modalRef, !1);
    const o = Ac(n);
    $i(n, t.mount, t.modalRef, o, !0);
    const i = Ir(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Ir(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Mc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Ir(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && mn(t.modalRef, n), $i(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && mn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Dc(e) {
  return typeof e == "function" ? e() : e;
}
function Vc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Lc = new Fc();
function Bc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Lc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: a,
    children: u,
    onClose: c,
    open: d,
    rootRef: g
  } = e, f = C.useRef({}), p = C.useRef(null), m = C.useRef(null), h = Ge(m, g), [v, w] = C.useState(!d), k = Vc(u);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const S = () => Pe(p.current), b = () => (f.current.modalRef = m.current, f.current.mount = p.current, f.current), T = () => {
    o.mount(b(), {
      disableScrollLock: r
    }), m.current && (m.current.scrollTop = 0);
  }, O = wn(() => {
    const I = Dc(t) || S().body;
    o.add(b(), I), m.current && T();
  }), D = C.useCallback(() => o.isTopModal(b()), [o]), V = wn((I) => {
    p.current = I, I && (d && D() ? T() : m.current && mn(m.current, x));
  }), L = C.useCallback(() => {
    o.remove(b(), x);
  }, [x, o]);
  C.useEffect(() => () => {
    L();
  }, [L]), C.useEffect(() => {
    d ? O() : (!k || !i) && L();
  }, [d, L, k, i, O]);
  const P = (I) => (j) => {
    var ne;
    (ne = I.onKeyDown) == null || ne.call(I, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !D()) && (n || (j.stopPropagation(), c && c(j, "escapeKeyDown")));
  }, N = (I) => (j) => {
    var ne;
    (ne = I.onClick) == null || ne.call(I, j), j.target === j.currentTarget && c && c(j, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const j = Ws(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const ne = E({}, j, I);
      return E({
        role: "presentation"
      }, ne, {
        onKeyDown: P(ne),
        ref: h
      });
    },
    getBackdropProps: (I = {}) => {
      const j = I;
      return E({
        "aria-hidden": !0
      }, j, {
        onClick: N(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const I = () => {
        w(!1), s && s();
      }, j = () => {
        w(!0), a && a(), i && L();
      };
      return {
        onEnter: Jr(I, u == null ? void 0 : u.props.onEnter),
        onExited: Jr(j, u == null ? void 0 : u.props.onExited)
      };
    },
    rootRef: h,
    portalRef: V,
    isTopModal: D,
    exited: v,
    hasTransition: k
  };
}
var Ie = "top", Ue = "bottom", qe = "right", Me = "left", Co = "auto", kn = [Ie, Ue, qe, Me], Ut = "start", Sn = "end", jc = "clippingParents", Ys = "viewport", sn = "popper", zc = "reference", Ii = /* @__PURE__ */ kn.reduce(function(e, t) {
  return e.concat([t + "-" + Ut, t + "-" + Sn]);
}, []), Js = /* @__PURE__ */ [].concat(kn, [Co]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ut, t + "-" + Sn]);
}, []), Hc = "beforeRead", Gc = "read", Uc = "afterRead", qc = "beforeMain", Wc = "main", Xc = "afterMain", Kc = "beforeWrite", Yc = "write", Jc = "afterWrite", Zc = [Hc, Gc, Uc, qc, Wc, Xc, Kc, Yc, Jc];
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
function kt(e) {
  var t = Le(e).Element;
  return e instanceof t || e instanceof Element;
}
function He(e) {
  var t = Le(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Eo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Le(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Qc(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !He(i) || !Je(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function ed(e) {
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
      var o = t.elements[r], i = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), a = s.reduce(function(u, c) {
        return u[c] = "", u;
      }, {});
      !He(o) || !Je(o) || (Object.assign(o.style, a), Object.keys(i).forEach(function(u) {
        o.removeAttribute(u);
      }));
    });
  };
}
const td = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Qc,
  effect: ed,
  requires: ["computeStyles"]
};
function Ke(e) {
  return e.split("-")[0];
}
var Et = Math.max, Qn = Math.min, qt = Math.round;
function eo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Zs() {
  return !/^((?!chrome|android).)*safari/i.test(eo());
}
function Wt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && He(e) && (o = e.offsetWidth > 0 && qt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && qt(r.height) / e.offsetHeight || 1);
  var s = kt(e) ? Le(e) : window, a = s.visualViewport, u = !Zs() && n, c = (r.left + (u && a ? a.offsetLeft : 0)) / o, d = (r.top + (u && a ? a.offsetTop : 0)) / i, g = r.width / o, f = r.height / i;
  return {
    width: g,
    height: f,
    top: d,
    right: c + g,
    bottom: d + f,
    left: c,
    x: c,
    y: d
  };
}
function Ro(e) {
  var t = Wt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Qs(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Eo(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function st(e) {
  return Le(e).getComputedStyle(e);
}
function nd(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function ht(e) {
  return ((kt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function ur(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Eo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ht(e)
  );
}
function Mi(e) {
  return !He(e) || // https://github.com/popperjs/popper-core/issues/837
  st(e).position === "fixed" ? null : e.offsetParent;
}
function rd(e) {
  var t = /firefox/i.test(eo()), n = /Trident/i.test(eo());
  if (n && He(e)) {
    var r = st(e);
    if (r.position === "fixed")
      return null;
  }
  var o = ur(e);
  for (Eo(o) && (o = o.host); He(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var i = st(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function On(e) {
  for (var t = Le(e), n = Mi(e); n && nd(n) && st(n).position === "static"; )
    n = Mi(n);
  return n && (Je(n) === "html" || Je(n) === "body" && st(n).position === "static") ? t : n || rd(e) || t;
}
function To(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function hn(e, t, n) {
  return Et(e, Qn(t, n));
}
function od(e, t, n) {
  var r = hn(e, t, n);
  return r > n ? n : r;
}
function ea() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ta(e) {
  return Object.assign({}, ea(), e);
}
function na(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var id = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, ta(typeof t != "number" ? t : na(t, kn));
};
function sd(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Ke(n.placement), u = To(a), c = [Me, qe].indexOf(a) >= 0, d = c ? "height" : "width";
  if (!(!i || !s)) {
    var g = id(o.padding, n), f = Ro(i), p = u === "y" ? Ie : Me, m = u === "y" ? Ue : qe, h = n.rects.reference[d] + n.rects.reference[u] - s[u] - n.rects.popper[d], v = s[u] - n.rects.reference[u], w = On(i), k = w ? u === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = h / 2 - v / 2, S = g[p], b = k - f[d] - g[m], T = k / 2 - f[d] / 2 + x, O = hn(S, T, b), D = u;
    n.modifiersData[r] = (t = {}, t[D] = O, t.centerOffset = O - T, t);
  }
}
function ad(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Qs(t.elements.popper, o) && (t.elements.arrow = o));
}
const ld = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: sd,
  effect: ad,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Xt(e) {
  return e.split("-")[1];
}
var ud = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function cd(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: qt(n * o) / o || 0,
    y: qt(r * o) / o || 0
  };
}
function Ai(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, u = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, g = e.isFixed, f = s.x, p = f === void 0 ? 0 : f, m = s.y, h = m === void 0 ? 0 : m, v = typeof d == "function" ? d({
    x: p,
    y: h
  }) : {
    x: p,
    y: h
  };
  p = v.x, h = v.y;
  var w = s.hasOwnProperty("x"), k = s.hasOwnProperty("y"), x = Me, S = Ie, b = window;
  if (c) {
    var T = On(n), O = "clientHeight", D = "clientWidth";
    if (T === Le(n) && (T = ht(n), st(T).position !== "static" && a === "absolute" && (O = "scrollHeight", D = "scrollWidth")), T = T, o === Ie || (o === Me || o === qe) && i === Sn) {
      S = Ue;
      var V = g && T === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[O]
      );
      h -= V - r.height, h *= u ? 1 : -1;
    }
    if (o === Me || (o === Ie || o === Ue) && i === Sn) {
      x = qe;
      var L = g && T === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[D]
      );
      p -= L - r.width, p *= u ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: a
  }, c && ud), N = d === !0 ? cd({
    x: p,
    y: h
  }, Le(n)) : {
    x: p,
    y: h
  };
  if (p = N.x, h = N.y, u) {
    var $;
    return Object.assign({}, P, ($ = {}, $[S] = k ? "0" : "", $[x] = w ? "0" : "", $.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + h + "px)" : "translate3d(" + p + "px, " + h + "px, 0)", $));
  }
  return Object.assign({}, P, (t = {}, t[S] = k ? h + "px" : "", t[x] = w ? p + "px" : "", t.transform = "", t));
}
function dd(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, u = a === void 0 ? !0 : a, c = {
    placement: Ke(t.placement),
    variation: Xt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ai(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ai(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const pd = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: dd,
  data: {}
};
var Vn = {
  passive: !0
};
function fd(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, u = Le(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && c.forEach(function(d) {
    d.addEventListener("scroll", n.update, Vn);
  }), a && u.addEventListener("resize", n.update, Vn), function() {
    i && c.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Vn);
    }), a && u.removeEventListener("resize", n.update, Vn);
  };
}
const gd = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: fd,
  data: {}
};
var md = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Un(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return md[t];
  });
}
var hd = {
  start: "end",
  end: "start"
};
function Fi(e) {
  return e.replace(/start|end/g, function(t) {
    return hd[t];
  });
}
function Po(e) {
  var t = Le(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function ko(e) {
  return Wt(ht(e)).left + Po(e).scrollLeft;
}
function vd(e, t) {
  var n = Le(e), r = ht(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, u = 0;
  if (o) {
    i = o.width, s = o.height;
    var c = Zs();
    (c || !c && t === "fixed") && (a = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + ko(e),
    y: u
  };
}
function bd(e) {
  var t, n = ht(e), r = Po(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Et(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Et(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + ko(e), u = -r.scrollTop;
  return st(o || n).direction === "rtl" && (a += Et(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: u
  };
}
function Oo(e) {
  var t = st(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function ra(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : He(e) && Oo(e) ? e : ra(ur(e));
}
function vn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = ra(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Le(r), s = o ? [i].concat(i.visualViewport || [], Oo(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(vn(ur(s)))
  );
}
function to(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function yd(e, t) {
  var n = Wt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Di(e, t, n) {
  return t === Ys ? to(vd(e, n)) : kt(t) ? yd(t, n) : to(bd(ht(e)));
}
function wd(e) {
  var t = vn(ur(e)), n = ["absolute", "fixed"].indexOf(st(e).position) >= 0, r = n && He(e) ? On(e) : e;
  return kt(r) ? t.filter(function(o) {
    return kt(o) && Qs(o, r) && Je(o) !== "body";
  }) : [];
}
function xd(e, t, n, r) {
  var o = t === "clippingParents" ? wd(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(u, c) {
    var d = Di(e, c, r);
    return u.top = Et(d.top, u.top), u.right = Qn(d.right, u.right), u.bottom = Qn(d.bottom, u.bottom), u.left = Et(d.left, u.left), u;
  }, Di(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function oa(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ke(r) : null, i = r ? Xt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, u;
  switch (o) {
    case Ie:
      u = {
        x: s,
        y: t.y - n.height
      };
      break;
    case Ue:
      u = {
        x: s,
        y: t.y + t.height
      };
      break;
    case qe:
      u = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Me:
      u = {
        x: t.x - n.width,
        y: a
      };
      break;
    default:
      u = {
        x: t.x,
        y: t.y
      };
  }
  var c = o ? To(o) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (i) {
      case Ut:
        u[c] = u[c] - (t[d] / 2 - n[d] / 2);
        break;
      case Sn:
        u[c] = u[c] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return u;
}
function Cn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, u = a === void 0 ? jc : a, c = n.rootBoundary, d = c === void 0 ? Ys : c, g = n.elementContext, f = g === void 0 ? sn : g, p = n.altBoundary, m = p === void 0 ? !1 : p, h = n.padding, v = h === void 0 ? 0 : h, w = ta(typeof v != "number" ? v : na(v, kn)), k = f === sn ? zc : sn, x = e.rects.popper, S = e.elements[m ? k : f], b = xd(kt(S) ? S : S.contextElement || ht(e.elements.popper), u, d, s), T = Wt(e.elements.reference), O = oa({
    reference: T,
    element: x,
    strategy: "absolute",
    placement: o
  }), D = to(Object.assign({}, x, O)), V = f === sn ? D : T, L = {
    top: b.top - V.top + w.top,
    bottom: V.bottom - b.bottom + w.bottom,
    left: b.left - V.left + w.left,
    right: V.right - b.right + w.right
  }, P = e.modifiersData.offset;
  if (f === sn && P) {
    var N = P[o];
    Object.keys(L).forEach(function($) {
      var B = [qe, Ue].indexOf($) >= 0 ? 1 : -1, F = [Ie, Ue].indexOf($) >= 0 ? "y" : "x";
      L[$] += N[F] * B;
    });
  }
  return L;
}
function Sd(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, u = n.allowedAutoPlacements, c = u === void 0 ? Js : u, d = Xt(r), g = d ? a ? Ii : Ii.filter(function(m) {
    return Xt(m) === d;
  }) : kn, f = g.filter(function(m) {
    return c.indexOf(m) >= 0;
  });
  f.length === 0 && (f = g);
  var p = f.reduce(function(m, h) {
    return m[h] = Cn(e, {
      placement: h,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ke(h)], m;
  }, {});
  return Object.keys(p).sort(function(m, h) {
    return p[m] - p[h];
  });
}
function Cd(e) {
  if (Ke(e) === Co)
    return [];
  var t = Un(e);
  return [Fi(e), t, Fi(t)];
}
function Ed(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, u = n.fallbackPlacements, c = n.padding, d = n.boundary, g = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, h = n.allowedAutoPlacements, v = t.options.placement, w = Ke(v), k = w === v, x = u || (k || !m ? [Un(v)] : Cd(v)), S = [v].concat(x).reduce(function(z, G) {
      return z.concat(Ke(G) === Co ? Sd(t, {
        placement: G,
        boundary: d,
        rootBoundary: g,
        padding: c,
        flipVariations: m,
        allowedAutoPlacements: h
      }) : G);
    }, []), b = t.rects.reference, T = t.rects.popper, O = /* @__PURE__ */ new Map(), D = !0, V = S[0], L = 0; L < S.length; L++) {
      var P = S[L], N = Ke(P), $ = Xt(P) === Ut, B = [Ie, Ue].indexOf(N) >= 0, F = B ? "width" : "height", I = Cn(t, {
        placement: P,
        boundary: d,
        rootBoundary: g,
        altBoundary: f,
        padding: c
      }), j = B ? $ ? qe : Me : $ ? Ue : Ie;
      b[F] > T[F] && (j = Un(j));
      var ne = Un(j), te = [];
      if (i && te.push(I[N] <= 0), a && te.push(I[j] <= 0, I[ne] <= 0), te.every(function(z) {
        return z;
      })) {
        V = P, D = !1;
        break;
      }
      O.set(P, te);
    }
    if (D)
      for (var R = m ? 3 : 1, A = function(G) {
        var q = S.find(function(W) {
          var U = O.get(W);
          if (U)
            return U.slice(0, G).every(function(K) {
              return K;
            });
        });
        if (q)
          return V = q, "break";
      }, H = R; H > 0; H--) {
        var X = A(H);
        if (X === "break")
          break;
      }
    t.placement !== V && (t.modifiersData[r]._skip = !0, t.placement = V, t.reset = !0);
  }
}
const Rd = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ed,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Vi(e, t, n) {
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
function Li(e) {
  return [Ie, qe, Ue, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function Td(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = Cn(t, {
    elementContext: "reference"
  }), a = Cn(t, {
    altBoundary: !0
  }), u = Vi(s, r), c = Vi(a, o, i), d = Li(u), g = Li(c);
  t.modifiersData[n] = {
    referenceClippingOffsets: u,
    popperEscapeOffsets: c,
    isReferenceHidden: d,
    hasPopperEscaped: g
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": g
  });
}
const Pd = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Td
};
function kd(e, t, n) {
  var r = Ke(e), o = [Me, Ie].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
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
function Od(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Js.reduce(function(d, g) {
    return d[g] = kd(g, t.rects, i), d;
  }, {}), a = s[t.placement], u = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = s;
}
const _d = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Od
};
function Nd(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = oa({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const $d = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Nd,
  data: {}
};
function Id(e) {
  return e === "x" ? "y" : "x";
}
function Md(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, u = n.boundary, c = n.rootBoundary, d = n.altBoundary, g = n.padding, f = n.tether, p = f === void 0 ? !0 : f, m = n.tetherOffset, h = m === void 0 ? 0 : m, v = Cn(t, {
    boundary: u,
    rootBoundary: c,
    padding: g,
    altBoundary: d
  }), w = Ke(t.placement), k = Xt(t.placement), x = !k, S = To(w), b = Id(S), T = t.modifiersData.popperOffsets, O = t.rects.reference, D = t.rects.popper, V = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, L = typeof V == "number" ? {
    mainAxis: V,
    altAxis: V
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, V), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, N = {
    x: 0,
    y: 0
  };
  if (T) {
    if (i) {
      var $, B = S === "y" ? Ie : Me, F = S === "y" ? Ue : qe, I = S === "y" ? "height" : "width", j = T[S], ne = j + v[B], te = j - v[F], R = p ? -D[I] / 2 : 0, A = k === Ut ? O[I] : D[I], H = k === Ut ? -D[I] : -O[I], X = t.elements.arrow, z = p && X ? Ro(X) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ea(), q = G[B], W = G[F], U = hn(0, O[I], z[I]), K = x ? O[I] / 2 - R - U - q - L.mainAxis : A - U - q - L.mainAxis, Z = x ? -O[I] / 2 + R + U + W + L.mainAxis : H + U + W + L.mainAxis, ie = t.elements.arrow && On(t.elements.arrow), M = ie ? S === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, Q = ($ = P == null ? void 0 : P[S]) != null ? $ : 0, _ = j + K - Q - M, se = j + Z - Q, Se = hn(p ? Qn(ne, _) : ne, j, p ? Et(te, se) : te);
      T[S] = Se, N[S] = Se - j;
    }
    if (a) {
      var Oe, be = S === "x" ? Ie : Me, bt = S === "x" ? Ue : qe, _e = T[b], Qe = b === "y" ? "height" : "width", Ae = _e + v[be], et = _e - v[bt], Ce = [Ie, Me].indexOf(w) !== -1, _t = (Oe = P == null ? void 0 : P[b]) != null ? Oe : 0, yt = Ce ? Ae : _e - O[Qe] - D[Qe] - _t + L.altAxis, Zt = Ce ? _e + O[Qe] + D[Qe] - _t - L.altAxis : et, In = p && Ce ? od(yt, _e, Zt) : hn(p ? yt : Ae, _e, p ? Zt : et);
      T[b] = In, N[b] = In - _e;
    }
    t.modifiersData[r] = N;
  }
}
const Ad = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Md,
  requiresIfExists: ["offset"]
};
function Fd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Dd(e) {
  return e === Le(e) || !He(e) ? Po(e) : Fd(e);
}
function Vd(e) {
  var t = e.getBoundingClientRect(), n = qt(t.width) / e.offsetWidth || 1, r = qt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Ld(e, t, n) {
  n === void 0 && (n = !1);
  var r = He(t), o = He(t) && Vd(t), i = ht(t), s = Wt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Oo(i)) && (a = Dd(t)), He(t) ? (u = Wt(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : i && (u.x = ko(i))), {
    x: s.left + a.scrollLeft - u.x,
    y: s.top + a.scrollTop - u.y,
    width: s.width,
    height: s.height
  };
}
function Bd(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var s = [].concat(i.requires || [], i.requiresIfExists || []);
    s.forEach(function(a) {
      if (!n.has(a)) {
        var u = t.get(a);
        u && o(u);
      }
    }), r.push(i);
  }
  return e.forEach(function(i) {
    n.has(i.name) || o(i);
  }), r;
}
function jd(e) {
  var t = Bd(e);
  return Zc.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function zd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Hd(e) {
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
var Bi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ji() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Gd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Bi : o;
  return function(a, u, c) {
    c === void 0 && (c = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Bi, i),
      modifiersData: {},
      elements: {
        reference: a,
        popper: u
      },
      attributes: {},
      styles: {}
    }, g = [], f = !1, p = {
      state: d,
      setOptions: function(w) {
        var k = typeof w == "function" ? w(d.options) : w;
        h(), d.options = Object.assign({}, i, d.options, k), d.scrollParents = {
          reference: kt(a) ? vn(a) : a.contextElement ? vn(a.contextElement) : [],
          popper: vn(u)
        };
        var x = jd(Hd([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = x.filter(function(S) {
          return S.enabled;
        }), m(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var w = d.elements, k = w.reference, x = w.popper;
          if (ji(k, x)) {
            d.rects = {
              reference: Ld(k, On(x), d.options.strategy === "fixed"),
              popper: Ro(x)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(L) {
              return d.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var S = 0; S < d.orderedModifiers.length; S++) {
              if (d.reset === !0) {
                d.reset = !1, S = -1;
                continue;
              }
              var b = d.orderedModifiers[S], T = b.fn, O = b.options, D = O === void 0 ? {} : O, V = b.name;
              typeof T == "function" && (d = T({
                state: d,
                options: D,
                name: V,
                instance: p
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: zd(function() {
        return new Promise(function(v) {
          p.forceUpdate(), v(d);
        });
      }),
      destroy: function() {
        h(), f = !0;
      }
    };
    if (!ji(a, u))
      return p;
    p.setOptions(c).then(function(v) {
      !f && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function m() {
      d.orderedModifiers.forEach(function(v) {
        var w = v.name, k = v.options, x = k === void 0 ? {} : k, S = v.effect;
        if (typeof S == "function") {
          var b = S({
            state: d,
            name: w,
            instance: p,
            options: x
          }), T = function() {
          };
          g.push(b || T);
        }
      });
    }
    function h() {
      g.forEach(function(v) {
        return v();
      }), g = [];
    }
    return p;
  };
}
var Ud = [gd, $d, pd, td, _d, Rd, Ad, ld, Pd], qd = /* @__PURE__ */ Gd({
  defaultModifiers: Ud
});
const ia = "Popper";
function Wd(e) {
  return Ks(ia, e);
}
Ec(ia, ["root"]);
const Xd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Kd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Yd(e, t) {
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
function cr(e) {
  return e.nodeType !== void 0;
}
function Jd(e) {
  return !cr(e);
}
const Zd = () => lt({
  root: ["root"]
}, bc(Wd)), Qd = {}, ep = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: a,
    modifiers: u,
    open: c,
    placement: d,
    popperOptions: g,
    popperRef: f,
    slotProps: p = {},
    slots: m = {},
    TransitionProps: h
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = ge(t, Xd), w = C.useRef(null), k = Ge(w, n), x = C.useRef(null), S = Ge(x, f), b = C.useRef(S);
  Tt(() => {
    b.current = S;
  }, [S]), C.useImperativeHandle(f, () => x.current, []);
  const T = Yd(d, s), [O, D] = C.useState(T), [V, L] = C.useState(er(o));
  C.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), C.useEffect(() => {
    o && L(er(o));
  }, [o]), Tt(() => {
    if (!V || !c)
      return;
    const F = (ne) => {
      D(ne.placement);
    };
    if (process.env.NODE_ENV !== "production" && V && cr(V) && V.nodeType === 1) {
      const ne = V.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ne.top === 0 && ne.left === 0 && ne.right === 0 && ne.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: ne
      }) => {
        F(ne);
      }
    }];
    u != null && (I = I.concat(u)), g && g.modifiers != null && (I = I.concat(g.modifiers));
    const j = qd(V, w.current, E({
      placement: T
    }, g, {
      modifiers: I
    }));
    return b.current(j), () => {
      j.destroy(), b.current(null);
    };
  }, [V, a, u, c, g, T]);
  const P = {
    placement: O
  };
  h !== null && (P.TransitionProps = h);
  const N = Zd(), $ = (r = m.root) != null ? r : "div", B = Pt({
    elementType: $,
    externalSlotProps: p.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: k
    },
    ownerState: t,
    className: N.root
  });
  return /* @__PURE__ */ y($, E({}, B, {
    children: typeof i == "function" ? i(P) : i
  }));
}), sa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: a = !1,
    keepMounted: u = !1,
    modifiers: c,
    open: d,
    placement: g = "bottom",
    popperOptions: f = Qd,
    popperRef: p,
    style: m,
    transition: h = !1,
    slotProps: v = {},
    slots: w = {}
  } = t, k = ge(t, Kd), [x, S] = C.useState(!0), b = () => {
    S(!1);
  }, T = () => {
    S(!0);
  };
  if (!u && !d && (!h || x))
    return null;
  let O;
  if (i)
    O = i;
  else if (r) {
    const L = er(r);
    O = L && cr(L) ? Pe(L).body : Pe(null).body;
  }
  const D = !d && u && (!h || x) ? "none" : void 0, V = h ? {
    in: d,
    onEnter: b,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ y(xn, {
    disablePortal: a,
    container: O,
    children: /* @__PURE__ */ y(ep, E({
      anchorEl: r,
      direction: s,
      disablePortal: a,
      modifiers: c,
      ref: n,
      open: h ? !x : d,
      placement: g,
      popperOptions: f,
      popperRef: p,
      slotProps: v,
      slots: w
    }, k, {
      style: E({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: D
      }, m),
      TransitionProps: V,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (sa.propTypes = {
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
  anchorEl: Jt(l.oneOfType([it, l.object, l.func]), (e) => {
    if (e.open) {
      const t = er(e.anchorEl);
      if (t && cr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Jd(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: l.oneOfType([l.node, l.func]),
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
  container: l.oneOfType([it, l.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: l.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: l.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: l.arrayOf(l.shape({
    data: l.object,
    effect: l.func,
    enabled: l.bool,
    fn: l.func,
    name: l.any,
    options: l.object,
    phase: l.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: l.arrayOf(l.string),
    requiresIfExists: l.arrayOf(l.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: l.shape({
    modifiers: l.array,
    onFirstUpdate: l.func,
    placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: l.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: So,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: l.shape({
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: l.shape({
    root: l.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: l.bool
});
const tp = ["values", "unit", "step"], np = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => E({}, n, {
    [r.key]: r.val
  }), {});
};
function rp(e) {
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
  } = e, o = ge(e, tp), i = np(t), s = Object.keys(i);
  function a(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n})`;
  }
  function u(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${n})`;
  }
  function c(f, p) {
    const m = s.indexOf(p);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n}) and (max-width:${(m !== -1 && typeof t[s[m]] == "number" ? t[s[m]] : p) - r / 100}${n})`;
  }
  function d(f) {
    return s.indexOf(f) + 1 < s.length ? c(f, s[s.indexOf(f) + 1]) : a(f);
  }
  function g(f) {
    const p = s.indexOf(f);
    return p === 0 ? a(s[1]) : p === s.length - 1 ? u(s[p]) : c(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return E({
    keys: s,
    values: i,
    up: a,
    down: u,
    between: c,
    only: d,
    not: g,
    unit: n
  }, o);
}
const op = {
  borderRadius: 4
}, ip = op, sp = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.string, l.object, l.array]) : {}, vt = sp;
function bn(e, t) {
  return t ? ot(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const _o = {
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
}, zi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${_o[e]}px)`
};
function at(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || zi;
    return t.reduce((s, a, u) => (s[i.up(i.keys[u])] = n(t[u]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || zi;
    return Object.keys(t).reduce((s, a) => {
      if (Object.keys(i.values || _o).indexOf(a) !== -1) {
        const u = i.up(a);
        s[u] = n(t[a], a);
      } else {
        const u = a;
        s[u] = t[u];
      }
      return s;
    }, {});
  }
  return n(t);
}
function ap(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function lp(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function dr(e, t, n = !0) {
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
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = dr(e, n) || r, t && (o = t(o, r, e)), o;
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
    const a = s[t], u = s.theme, c = dr(u, r) || {};
    return at(s, a, (g) => {
      let f = tr(c, o, g);
      return g === f && typeof g == "string" && (f = tr(c, o, `${t}${g === "default" ? "" : Ye(g)}`, g)), n === !1 ? f : {
        [n]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: vt
  } : {}, i.filterProps = [t], i;
}
function up(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const cp = {
  m: "margin",
  p: "padding"
}, dp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Hi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, pp = up((e) => {
  if (e.length > 2)
    if (Hi[e])
      e = Hi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = cp[t], o = dp[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), pr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], fr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], fp = [...pr, ...fr];
function _n(e, t, n, r) {
  var o;
  const i = (o = dr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function aa(e) {
  return _n(e, "spacing", 8, "spacing");
}
function Nn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function gp(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Nn(t, n), r), {});
}
function mp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = pp(n), i = gp(o, r), s = e[n];
  return at(e, s, i);
}
function la(e, t) {
  const n = aa(e.theme);
  return Object.keys(e).map((r) => mp(e, t, r, n)).reduce(bn, {});
}
function he(e) {
  return la(e, pr);
}
he.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, t) => (e[t] = vt, e), {}) : {};
he.filterProps = pr;
function ve(e) {
  return la(e, fr);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? fr.reduce((e, t) => (e[t] = vt, e), {}) : {};
ve.filterProps = fr;
process.env.NODE_ENV !== "production" && fp.reduce((e, t) => (e[t] = vt, e), {});
function hp(e = 8) {
  if (e.mui)
    return e;
  const t = aa({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function gr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? bn(o, t[i](r)) : o, {});
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
const vp = We("border", ze), bp = We("borderTop", ze), yp = We("borderRight", ze), wp = We("borderBottom", ze), xp = We("borderLeft", ze), Sp = We("borderColor"), Cp = We("borderTopColor"), Ep = We("borderRightColor"), Rp = We("borderBottomColor"), Tp = We("borderLeftColor"), Pp = We("outline", ze), kp = We("outlineColor"), mr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = _n(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Nn(t, r)
    });
    return at(e, e.borderRadius, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: vt
} : {};
mr.filterProps = ["borderRadius"];
gr(vp, bp, yp, wp, xp, Sp, Cp, Ep, Rp, Tp, mr, Pp, kp);
const hr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = _n(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Nn(t, r)
    });
    return at(e, e.gap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: vt
} : {};
hr.filterProps = ["gap"];
const vr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = _n(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Nn(t, r)
    });
    return at(e, e.columnGap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: vt
} : {};
vr.filterProps = ["columnGap"];
const br = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = _n(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Nn(t, r)
    });
    return at(e, e.rowGap, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: vt
} : {};
br.filterProps = ["rowGap"];
const Op = xe({
  prop: "gridColumn"
}), _p = xe({
  prop: "gridRow"
}), Np = xe({
  prop: "gridAutoFlow"
}), $p = xe({
  prop: "gridAutoColumns"
}), Ip = xe({
  prop: "gridAutoRows"
}), Mp = xe({
  prop: "gridTemplateColumns"
}), Ap = xe({
  prop: "gridTemplateRows"
}), Fp = xe({
  prop: "gridTemplateAreas"
}), Dp = xe({
  prop: "gridArea"
});
gr(hr, vr, br, Op, _p, Np, $p, Ip, Mp, Ap, Fp, Dp);
function zt(e, t) {
  return t === "grey" ? t : e;
}
const Vp = xe({
  prop: "color",
  themeKey: "palette",
  transform: zt
}), Lp = xe({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: zt
}), Bp = xe({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: zt
});
gr(Vp, Lp, Bp);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const jp = xe({
  prop: "width",
  transform: Ve
}), No = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || _o[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ve(n)
      };
    };
    return at(e, e.maxWidth, t);
  }
  return null;
};
No.filterProps = ["maxWidth"];
const zp = xe({
  prop: "minWidth",
  transform: Ve
}), Hp = xe({
  prop: "height",
  transform: Ve
}), Gp = xe({
  prop: "maxHeight",
  transform: Ve
}), Up = xe({
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
const qp = xe({
  prop: "boxSizing"
});
gr(jp, No, zp, Hp, Gp, Up, qp);
const Wp = {
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
    style: mr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: zt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: zt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: zt
  },
  // spacing
  p: {
    style: ve
  },
  pt: {
    style: ve
  },
  pr: {
    style: ve
  },
  pb: {
    style: ve
  },
  pl: {
    style: ve
  },
  px: {
    style: ve
  },
  py: {
    style: ve
  },
  padding: {
    style: ve
  },
  paddingTop: {
    style: ve
  },
  paddingRight: {
    style: ve
  },
  paddingBottom: {
    style: ve
  },
  paddingLeft: {
    style: ve
  },
  paddingX: {
    style: ve
  },
  paddingY: {
    style: ve
  },
  paddingInline: {
    style: ve
  },
  paddingInlineStart: {
    style: ve
  },
  paddingInlineEnd: {
    style: ve
  },
  paddingBlock: {
    style: ve
  },
  paddingBlockStart: {
    style: ve
  },
  paddingBlockEnd: {
    style: ve
  },
  m: {
    style: he
  },
  mt: {
    style: he
  },
  mr: {
    style: he
  },
  mb: {
    style: he
  },
  ml: {
    style: he
  },
  mx: {
    style: he
  },
  my: {
    style: he
  },
  margin: {
    style: he
  },
  marginTop: {
    style: he
  },
  marginRight: {
    style: he
  },
  marginBottom: {
    style: he
  },
  marginLeft: {
    style: he
  },
  marginX: {
    style: he
  },
  marginY: {
    style: he
  },
  marginInline: {
    style: he
  },
  marginInlineStart: {
    style: he
  },
  marginInlineEnd: {
    style: he
  },
  marginBlock: {
    style: he
  },
  marginBlockStart: {
    style: he
  },
  marginBlockEnd: {
    style: he
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
    style: hr
  },
  rowGap: {
    style: br
  },
  columnGap: {
    style: vr
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
    style: No
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
}, $o = Wp;
function Xp(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Kp(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Yp() {
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
      cssProperty: u = n,
      themeKey: c,
      transform: d,
      style: g
    } = a;
    if (r == null)
      return null;
    if (c === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const f = dr(o, c) || {};
    return g ? g(s) : at(s, r, (m) => {
      let h = tr(f, d, m);
      return m === h && typeof m == "string" && (h = tr(f, d, `${n}${m === "default" ? "" : Ye(m)}`, m)), u === !1 ? h : {
        [u]: h
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
    function a(u) {
      let c = u;
      if (typeof u == "function")
        c = u(i);
      else if (typeof u != "object")
        return u;
      if (!c)
        return null;
      const d = ap(i.breakpoints), g = Object.keys(d);
      let f = d;
      return Object.keys(c).forEach((p) => {
        const m = Kp(c[p], i);
        if (m != null)
          if (typeof m == "object")
            if (s[p])
              f = bn(f, e(p, m, i, s));
            else {
              const h = at({
                theme: i
              }, m, (v) => ({
                [p]: v
              }));
              Xp(h, m) ? f[p] = t({
                sx: m,
                theme: i
              }) : f = bn(f, h);
            }
          else
            f = bn(f, e(p, m, i, s));
      }), lp(g, f);
    }
    return Array.isArray(o) ? o.map(a) : a(o);
  }
  return t;
}
const ua = Yp();
ua.filterProps = ["sx"];
const Io = ua;
function Jp(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Zp = ["breakpoints", "palette", "spacing", "shape"];
function Mo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ge(e, Zp), a = rp(n), u = hp(o);
  let c = ot({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: E({
      mode: "light"
    }, r),
    spacing: u,
    shape: E({}, ip, i)
  }, s);
  return c.applyStyles = Jp, c = t.reduce((d, g) => ot(d, g), c), c.unstable_sxConfig = E({}, $o, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return Io({
      sx: g,
      theme: this
    });
  }, c;
}
function Qp(e) {
  return Object.keys(e).length === 0;
}
function ca(e = null) {
  const t = C.useContext(ql);
  return !t || Qp(t) ? e : t;
}
const ef = Mo();
function da(e = ef) {
  return ca(e);
}
const tf = ["ownerState"], nf = ["variants"], rf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function of(e) {
  return Object.keys(e).length === 0;
}
function sf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function qn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const af = Mo(), Gi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Ln({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return of(t) ? e : t[n] || t;
}
function lf(e) {
  return e ? (t, n) => n[e] : null;
}
function Wn(e, t) {
  let {
    ownerState: n
  } = t, r = ge(t, tf);
  const o = typeof e == "function" ? e(E({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Wn(i, E({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let a = ge(o, nf);
    return i.forEach((u) => {
      let c = !0;
      typeof u.props == "function" ? c = u.props(E({
        ownerState: n
      }, r, n)) : Object.keys(u.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== u.props[d] && r[d] !== u.props[d] && (c = !1);
      }), c && (Array.isArray(a) || (a = [a]), a.push(typeof u.style == "function" ? u.style(E({
        ownerState: n
      }, r, n)) : u.style));
    }), a;
  }
  return o;
}
function uf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = af,
    rootShouldForwardProp: r = qn,
    slotShouldForwardProp: o = qn
  } = e, i = (s) => Io(E({}, s, {
    theme: Ln(E({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, a = {}) => {
    Wl(s, (b) => b.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: d,
      skipSx: g,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = lf(Gi(c))
    } = a, p = ge(a, rf), m = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), h = g || !1;
    let v;
    process.env.NODE_ENV !== "production" && u && (v = `${u}-${Gi(c || "Root")}`);
    let w = qn;
    c === "Root" || c === "root" ? w = r : c ? w = o : sf(s) && (w = void 0);
    const k = Ul(s, E({
      shouldForwardProp: w,
      label: v
    }, p)), x = (b) => typeof b == "function" && b.__emotion_real !== b || St(b) ? (T) => Wn(b, E({}, T, {
      theme: Ln({
        theme: T.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : b, S = (b, ...T) => {
      let O = x(b);
      const D = T ? T.map(x) : [];
      u && f && D.push((P) => {
        const N = Ln(E({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        if (!N.components || !N.components[u] || !N.components[u].styleOverrides)
          return null;
        const $ = N.components[u].styleOverrides, B = {};
        return Object.entries($).forEach(([F, I]) => {
          B[F] = Wn(I, E({}, P, {
            theme: N
          }));
        }), f(P, B);
      }), u && !m && D.push((P) => {
        var N;
        const $ = Ln(E({}, P, {
          defaultTheme: n,
          themeId: t
        })), B = $ == null || (N = $.components) == null || (N = N[u]) == null ? void 0 : N.variants;
        return Wn({
          variants: B
        }, E({}, P, {
          theme: $
        }));
      }), h || D.push(i);
      const V = D.length - T.length;
      if (Array.isArray(b) && V > 0) {
        const P = new Array(V).fill("");
        O = [...b, ...P], O.raw = [...b.raw, ...P];
      }
      const L = k(O, ...D);
      if (process.env.NODE_ENV !== "production") {
        let P;
        u && (P = `${u}${Ye(c || "")}`), P === void 0 && (P = `Styled(${qu(s)})`), L.displayName = P;
      }
      return s.muiName && (L.muiName = s.muiName), L;
    };
    return k.withConfig && (S.withConfig = k.withConfig), S;
  };
}
function cf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Hs(t.components[n].defaultProps, r);
}
function df({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = da(n);
  return r && (o = o[r] || o), cf({
    theme: o,
    name: t,
    props: e
  });
}
function Ao(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), mc(e, t, n);
}
function pf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ot(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ot(pf(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ht(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ht(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function yr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function ff(e) {
  e = Ot(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (c, d = (c + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let a = "rgb";
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", u.push(t[3])), yr({
    type: a,
    values: u
  });
}
function Ui(e) {
  e = Ot(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ot(ff(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function qi(e, t) {
  const n = Ui(e), r = Ui(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function nr(e, t) {
  return e = Ot(e), t = Ao(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, yr(e);
}
function gf(e, t) {
  if (e = Ot(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return yr(e);
}
function mf(e, t) {
  if (e = Ot(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return yr(e);
}
function hf(e, t) {
  return E({
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
const vf = {
  black: "#000",
  white: "#fff"
}, En = vf, bf = {
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
}, yf = bf, wf = {
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
}, $t = wf, xf = {
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
}, It = xf, Sf = {
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
}, an = Sf, Cf = {
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
}, Mt = Cf, Ef = {
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
}, At = Ef, Rf = {
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
}, Ft = Rf, Tf = ["mode", "contrastThreshold", "tonalOffset"], Wi = {
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
    paper: En.white,
    default: En.white
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
    primary: En.white,
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
    active: En.white,
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
function Xi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = mf(e.main, o) : t === "dark" && (e.dark = gf(e.main, i)));
}
function Pf(e = "light") {
  return e === "dark" ? {
    main: Mt[200],
    light: Mt[50],
    dark: Mt[400]
  } : {
    main: Mt[700],
    light: Mt[400],
    dark: Mt[800]
  };
}
function kf(e = "light") {
  return e === "dark" ? {
    main: $t[200],
    light: $t[50],
    dark: $t[400]
  } : {
    main: $t[500],
    light: $t[300],
    dark: $t[700]
  };
}
function Of(e = "light") {
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
function _f(e = "light") {
  return e === "dark" ? {
    main: At[400],
    light: At[300],
    dark: At[700]
  } : {
    main: At[700],
    light: At[500],
    dark: At[900]
  };
}
function Nf(e = "light") {
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
function $f(e = "light") {
  return e === "dark" ? {
    main: an[400],
    light: an[300],
    dark: an[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: an[500],
    dark: an[900]
  };
}
function If(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ge(e, Tf), i = e.primary || Pf(t), s = e.secondary || kf(t), a = e.error || Of(t), u = e.info || _f(t), c = e.success || Nf(t), d = e.warning || $f(t);
  function g(h) {
    const v = qi(h, Mr.text.primary) >= n ? Mr.text.primary : Wi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = qi(h, v);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${v} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const f = ({
    color: h,
    name: v,
    mainShade: w = 500,
    lightShade: k = 300,
    darkShade: x = 700
  }) => {
    if (h = E({}, h), !h.main && h[w] && (h.main = h[w]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : Ht(11, v ? ` (${v})` : "", w));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ht(12, v ? ` (${v})` : "", JSON.stringify(h.main)));
    return Xi(h, "light", k, r), Xi(h, "dark", x, r), h.contrastText || (h.contrastText = g(h.main)), h;
  }, p = {
    dark: Mr,
    light: Wi
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), ot(E({
    // A collection of common colors.
    common: E({}, En),
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
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: u,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: yf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: g,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, p[t]), o);
}
const Mf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Af(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ki = {
  textTransform: "uppercase"
}, Yi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ff(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Yi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: a = 500,
    fontWeightBold: u = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: c = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: g
  } = n, f = ge(n, Mf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof c != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, m = g || ((w) => `${w / c * p}rem`), h = (w, k, x, S, b) => E({
    fontFamily: r,
    fontWeight: w,
    fontSize: m(k),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === Yi ? {
    letterSpacing: `${Af(S / k)}em`
  } : {}, b, d), v = {
    h1: h(i, 96, 1.167, -1.5),
    h2: h(i, 60, 1.2, -0.5),
    h3: h(s, 48, 1.167, 0),
    h4: h(s, 34, 1.235, 0.25),
    h5: h(s, 24, 1.334, 0),
    h6: h(a, 20, 1.6, 0.15),
    subtitle1: h(s, 16, 1.75, 0.15),
    subtitle2: h(a, 14, 1.57, 0.1),
    body1: h(s, 16, 1.5, 0.15),
    body2: h(s, 14, 1.43, 0.15),
    button: h(a, 14, 1.75, 0.4, Ki),
    caption: h(s, 12, 1.66, 0.4),
    overline: h(s, 12, 2.66, 1, Ki),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ot(E({
    htmlFontSize: c,
    pxToRem: m,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: u
  }, v), f, {
    clone: !1
    // No need to clone deep
  });
}
const Df = 0.2, Vf = 0.14, Lf = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Df})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Vf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Lf})`].join(",");
}
const Bf = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], jf = Bf, zf = ["duration", "easing", "delay"], Hf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Gf = {
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
function Ji(e) {
  return `${Math.round(e)}ms`;
}
function Uf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function qf(e) {
  const t = E({}, Hf, e.easing), n = E({}, Gf, e.duration);
  return E({
    getAutoHeightDuration: Uf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: u = 0
      } = i, c = ge(i, zf);
      if (process.env.NODE_ENV !== "production") {
        const d = (f) => typeof f == "string", g = (f) => !isNaN(parseFloat(f));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !g(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(a) || console.error('MUI: Argument "easing" must be a string.'), !g(u) && !d(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : Ji(s)} ${a} ${typeof u == "string" ? u : Ji(u)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Wf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Xf = Wf, Kf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Yf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ge(e, Kf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ht(18));
  const a = If(r), u = Mo(e);
  let c = ot(u, {
    mixins: hf(u.breakpoints, n),
    palette: a,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: jf.slice(),
    typography: Ff(a, i),
    transitions: qf(o),
    zIndex: E({}, Xf)
  });
  if (c = ot(c, s), c = t.reduce((d, g) => ot(d, g), c), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], g = (f, p) => {
      let m;
      for (m in f) {
        const h = f[m];
        if (d.indexOf(m) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = Ze("", m);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${m}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[m] = {};
        }
      }
    };
    Object.keys(c.components).forEach((f) => {
      const p = c.components[f].styleOverrides;
      p && f.indexOf("Mui") === 0 && g(p, f);
    });
  }
  return c.unstable_sxConfig = E({}, $o, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return Io({
      sx: g,
      theme: this
    });
  }, c;
}
const Jf = Yf(), Fo = Jf, Do = "$$material", pa = (e) => qn(e) && e !== "classes", Zf = uf({
  themeId: Do,
  defaultTheme: Fo,
  rootShouldForwardProp: pa
}), ke = Zf;
function $n() {
  const e = da(Fo);
  return process.env.NODE_ENV !== "production" && C.useDebugValue(e), e[Do] || e;
}
function ut({
  props: e,
  name: t
}) {
  return df({
    props: e,
    name: t,
    defaultTheme: Fo,
    themeId: Do
  });
}
function no(e, t) {
  return no = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, no(e, t);
}
function Qf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, no(e, t);
}
const Zi = {
  disabled: !1
};
var eg = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.shape({
  enter: l.number,
  exit: l.number,
  appear: l.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && l.oneOfType([l.string, l.shape({
  enter: l.string,
  exit: l.string,
  active: l.string
}), l.shape({
  enter: l.string,
  enterDone: l.string,
  enterActive: l.string,
  exit: l.string,
  exitDone: l.string,
  exitActive: l.string
})]);
const fa = jt.createContext(null);
var tg = function(t) {
  return t.scrollTop;
}, fn = "unmounted", wt = "exited", xt = "entering", Bt = "entered", ro = "exiting", ct = /* @__PURE__ */ function(e) {
  Qf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, a = s && !s.isMounting ? r.enter : r.appear, u;
    return i.appearStatus = null, r.in ? a ? (u = wt, i.appearStatus = xt) : u = Bt : r.unmountOnExit || r.mountOnEnter ? u = fn : u = wt, i.state = {
      status: u
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === fn ? {
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
      this.props.in ? s !== xt && s !== Bt && (i = xt) : (s === xt || s === Bt) && (i = ro);
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
          var s = this.props.nodeRef ? this.props.nodeRef.current : Fn.findDOMNode(this);
          s && tg(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === wt && this.setState({
        status: fn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, a = this.context ? this.context.isMounting : o, u = this.props.nodeRef ? [a] : [Fn.findDOMNode(this), a], c = u[0], d = u[1], g = this.getTimeouts(), f = a ? g.appear : g.enter;
    if (!o && !s || Zi.disabled) {
      this.safeSetState({
        status: Bt
      }, function() {
        i.props.onEntered(c);
      });
      return;
    }
    this.props.onEnter(c, d), this.safeSetState({
      status: xt
    }, function() {
      i.props.onEntering(c, d), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: Bt
        }, function() {
          i.props.onEntered(c, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), a = this.props.nodeRef ? void 0 : Fn.findDOMNode(this);
    if (!i || Zi.disabled) {
      this.safeSetState({
        status: wt
      }, function() {
        o.props.onExited(a);
      });
      return;
    }
    this.props.onExit(a), this.safeSetState({
      status: ro
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Fn.findDOMNode(this), a = o == null && !this.props.addEndListener;
    if (!s || a) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var u = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], c = u[0], d = u[1];
      this.props.addEndListener(c, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === fn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var a = ge(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ jt.createElement(fa.Provider, {
        value: null
      }, typeof s == "function" ? s(o, a) : jt.cloneElement(jt.Children.only(s), a))
    );
  }, t;
}(jt.Component);
ct.contextType = fa;
ct.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: l.shape({
    current: typeof Element > "u" ? l.any : function(e, t, n, r, o, i) {
      var s = e[t];
      return l.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
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
  children: l.oneOfType([l.func.isRequired, l.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: l.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: l.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: l.bool,
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
  appear: l.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: l.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: l.bool,
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
    var n = eg;
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
  addEndListener: l.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: l.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: l.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: l.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: l.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: l.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: l.func
} : {};
function Dt() {
}
ct.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Dt,
  onEntering: Dt,
  onEntered: Dt,
  onExit: Dt,
  onExiting: Dt,
  onExited: Dt
};
ct.UNMOUNTED = fn;
ct.EXITED = wt;
ct.ENTERING = xt;
ct.ENTERED = Bt;
ct.EXITING = ro;
const ga = ct, ma = (e) => e.scrollTop;
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
const ng = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function oo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const rg = {
  entering: {
    opacity: 1,
    transform: oo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Ar = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Vo = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: a,
    onEnter: u,
    onEntered: c,
    onEntering: d,
    onExit: g,
    onExited: f,
    onExiting: p,
    style: m,
    timeout: h = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = ga
  } = t, w = ge(t, ng), k = dn(), x = C.useRef(), S = $n(), b = C.useRef(null), T = Ge(b, i.ref, n), O = (F) => (I) => {
    if (F) {
      const j = b.current;
      I === void 0 ? F(j) : F(j, I);
    }
  }, D = O(d), V = O((F, I) => {
    ma(F);
    const {
      duration: j,
      delay: ne,
      easing: te
    } = rr({
      style: m,
      timeout: h,
      easing: s
    }, {
      mode: "enter"
    });
    let R;
    h === "auto" ? (R = S.transitions.getAutoHeightDuration(F.clientHeight), x.current = R) : R = j, F.style.transition = [S.transitions.create("opacity", {
      duration: R,
      delay: ne
    }), S.transitions.create("transform", {
      duration: Ar ? R : R * 0.666,
      delay: ne,
      easing: te
    })].join(","), u && u(F, I);
  }), L = O(c), P = O(p), N = O((F) => {
    const {
      duration: I,
      delay: j,
      easing: ne
    } = rr({
      style: m,
      timeout: h,
      easing: s
    }, {
      mode: "exit"
    });
    let te;
    h === "auto" ? (te = S.transitions.getAutoHeightDuration(F.clientHeight), x.current = te) : te = I, F.style.transition = [S.transitions.create("opacity", {
      duration: te,
      delay: j
    }), S.transitions.create("transform", {
      duration: Ar ? te : te * 0.666,
      delay: Ar ? j : j || te * 0.333,
      easing: ne
    })].join(","), F.style.opacity = 0, F.style.transform = oo(0.75), g && g(F);
  }), $ = O(f);
  return /* @__PURE__ */ y(v, E({
    appear: o,
    in: a,
    nodeRef: b,
    onEnter: V,
    onEntered: L,
    onEntering: D,
    onExit: N,
    onExited: $,
    onExiting: P,
    addEndListener: (F) => {
      h === "auto" && k.start(x.current || 0, F), r && r(b.current, F);
    },
    timeout: h === "auto" ? null : h
  }, w, {
    children: (F, I) => /* @__PURE__ */ C.cloneElement(i, E({
      style: E({
        opacity: 0,
        transform: oo(0.75),
        visibility: F === "exited" && !a ? "hidden" : void 0
      }, rg[F], m, i.props.style),
      ref: T
    }, I))
  }));
});
process.env.NODE_ENV !== "production" && (Vo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: l.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: l.bool,
  /**
   * A single child content element.
   */
  children: Tn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: l.oneOfType([l.shape({
    enter: l.string,
    exit: l.string
  }), l.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: l.bool,
  /**
   * @ignore
   */
  onEnter: l.func,
  /**
   * @ignore
   */
  onEntered: l.func,
  /**
   * @ignore
   */
  onEntering: l.func,
  /**
   * @ignore
   */
  onExit: l.func,
  /**
   * @ignore
   */
  onExited: l.func,
  /**
   * @ignore
   */
  onExiting: l.func,
  /**
   * @ignore
   */
  style: l.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: l.oneOfType([l.oneOf(["auto"]), l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })])
});
Vo.muiSupportAuto = !0;
const io = Vo, og = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Qi = og, ig = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], sg = ke(sa, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ha = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r;
  const o = ca(), i = ut({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    components: u,
    componentsProps: c,
    container: d,
    disablePortal: g,
    keepMounted: f,
    modifiers: p,
    open: m,
    placement: h,
    popperOptions: v,
    popperRef: w,
    transition: k,
    slots: x,
    slotProps: S
  } = i, b = ge(i, ig), T = (r = x == null ? void 0 : x.root) != null ? r : u == null ? void 0 : u.Root, O = E({
    anchorEl: s,
    container: d,
    disablePortal: g,
    keepMounted: f,
    modifiers: p,
    open: m,
    placement: h,
    popperOptions: v,
    popperRef: w,
    transition: k
  }, b);
  return /* @__PURE__ */ y(sg, E({
    as: a,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: T
    },
    slotProps: S ?? c
  }, O, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (ha.propTypes = {
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
  anchorEl: l.oneOfType([it, l.object, l.func]),
  /**
   * Popper render function or node.
   */
  children: l.oneOfType([l.node, l.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: l.shape({
    Root: l.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: l.shape({
    root: l.oneOfType([l.func, l.object])
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
  container: l.oneOfType([it, l.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: l.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: l.arrayOf(l.shape({
    data: l.object,
    effect: l.func,
    enabled: l.bool,
    fn: l.func,
    name: l.any,
    options: l.object,
    phase: l.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: l.arrayOf(l.string),
    requiresIfExists: l.arrayOf(l.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: l.shape({
    modifiers: l.array,
    onFirstUpdate: l.func,
    placement: l.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: l.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: So,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: l.shape({
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: l.shape({
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: l.bool
});
const va = ha;
function ag(e) {
  return Ze("MuiTooltip", e);
}
const lg = mt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), pt = lg, ug = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function cg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const dg = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ye(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return lt(s, ag, t);
}, pg = ke(va, {
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
}) => E({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${pt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${pt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${pt.arrow}`]: E({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${pt.arrow}`]: E({}, t.isRtl ? {
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
})), fg = ke("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ye(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => E({
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
  lineHeight: `${cg(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${pt.popper}[data-popper-placement*="left"] &`]: E({
    transformOrigin: "right center"
  }, t.isRtl ? E({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : E({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${pt.popper}[data-popper-placement*="right"] &`]: E({
    transformOrigin: "left center"
  }, t.isRtl ? E({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : E({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${pt.popper}[data-popper-placement*="top"] &`]: E({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${pt.popper}[data-popper-placement*="bottom"] &`]: E({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), gg = ke("span", {
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
const es = new Pn();
let ln = {
  x: 0,
  y: 0
};
function jn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const ba = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i, s, a, u, c, d, g, f, p, m, h, v, w, k, x, S, b;
  const T = ut({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: O = !1,
    children: D,
    components: V = {},
    componentsProps: L = {},
    describeChild: P = !1,
    disableFocusListener: N = !1,
    disableHoverListener: $ = !1,
    disableInteractive: B = !1,
    disableTouchListener: F = !1,
    enterDelay: I = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: ne = 700,
    followCursor: te = !1,
    id: R,
    leaveDelay: A = 0,
    leaveTouchDelay: H = 1500,
    onClose: X,
    onOpen: z,
    open: G,
    placement: q = "bottom",
    PopperComponent: W,
    PopperProps: U = {},
    slotProps: K = {},
    slots: Z = {},
    title: ie,
    TransitionComponent: M = io,
    TransitionProps: Q
  } = T, _ = ge(T, ug), se = /* @__PURE__ */ C.isValidElement(D) ? D : /* @__PURE__ */ y("span", {
    children: D
  }), Se = $n(), Oe = Se.direction === "rtl", [be, bt] = C.useState(), [_e, Qe] = C.useState(null), Ae = C.useRef(!1), et = B || te, Ce = dn(), _t = dn(), yt = dn(), Zt = dn(), [In, qo] = Ds({
    controlled: G,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = In;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = C.useRef(G !== void 0);
    C.useEffect(() => {
      be && be.disabled && !re && ie !== "" && be.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, be, re]);
  }
  const xr = Fs(R), Qt = C.useRef(), Mn = wn(() => {
    Qt.current !== void 0 && (document.body.style.WebkitUserSelect = Qt.current, Qt.current = void 0), Zt.clear();
  });
  C.useEffect(() => Mn, [Mn]);
  const Wo = (re) => {
    es.clear(), Bn = !0, qo(!0), z && !tt && z(re);
  }, An = wn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      es.start(800 + A, () => {
        Bn = !1;
      }), qo(!1), X && tt && X(re), Ce.start(Se.transitions.duration.shortest, () => {
        Ae.current = !1;
      });
    }
  ), Sr = (re) => {
    Ae.current && re.type !== "touchstart" || (be && be.removeAttribute("title"), _t.clear(), yt.clear(), I || Bn && j ? _t.start(Bn ? j : I, () => {
      Wo(re);
    }) : Wo(re));
  }, Xo = (re) => {
    _t.clear(), yt.start(A, () => {
      An(re);
    });
  }, {
    isFocusVisibleRef: Ko,
    onBlur: Qa,
    onFocus: el,
    ref: tl
  } = Vs(), [, Yo] = C.useState(!1), Jo = (re) => {
    Qa(re), Ko.current === !1 && (Yo(!1), Xo(re));
  }, Zo = (re) => {
    be || bt(re.currentTarget), el(re), Ko.current === !0 && (Yo(!0), Sr(re));
  }, Qo = (re) => {
    Ae.current = !0;
    const Fe = se.props;
    Fe.onTouchStart && Fe.onTouchStart(re);
  }, ei = Sr, ti = Xo, nl = (re) => {
    Qo(re), yt.clear(), Ce.clear(), Mn(), Qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Zt.start(ne, () => {
      document.body.style.WebkitUserSelect = Qt.current, Sr(re);
    });
  }, rl = (re) => {
    se.props.onTouchEnd && se.props.onTouchEnd(re), Mn(), yt.start(H, () => {
      An(re);
    });
  };
  C.useEffect(() => {
    if (!tt)
      return;
    function re(Fe) {
      (Fe.key === "Escape" || Fe.key === "Esc") && An(Fe);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [An, tt]);
  const ol = Ge(se.ref, tl, bt, n);
  !ie && ie !== 0 && (tt = !1);
  const Cr = C.useRef(), il = (re) => {
    const Fe = se.props;
    Fe.onMouseMove && Fe.onMouseMove(re), ln = {
      x: re.clientX,
      y: re.clientY
    }, Cr.current && Cr.current.update();
  }, en = {}, Er = typeof ie == "string";
  P ? (en.title = !tt && Er && !$ ? ie : null, en["aria-describedby"] = tt ? xr : null) : (en["aria-label"] = Er ? ie : null, en["aria-labelledby"] = tt && !Er ? xr : null);
  const je = E({}, en, _, se.props, {
    className: Te(_.className, se.props.className),
    onTouchStart: Qo,
    ref: ol
  }, te ? {
    onMouseMove: il
  } : {});
  process.env.NODE_ENV !== "production" && (je["data-mui-internal-clone-element"] = !0, C.useEffect(() => {
    be && !be.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [be]));
  const tn = {};
  F || (je.onTouchStart = nl, je.onTouchEnd = rl), $ || (je.onMouseOver = jn(ei, je.onMouseOver), je.onMouseLeave = jn(ti, je.onMouseLeave), et || (tn.onMouseOver = ei, tn.onMouseLeave = ti)), N || (je.onFocus = jn(Zo, je.onFocus), je.onBlur = jn(Jo, je.onBlur), et || (tn.onFocus = Zo, tn.onBlur = Jo)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const sl = C.useMemo(() => {
    var re;
    let Fe = [{
      name: "arrow",
      enabled: !!_e,
      options: {
        element: _e,
        padding: 4
      }
    }];
    return (re = U.popperOptions) != null && re.modifiers && (Fe = Fe.concat(U.popperOptions.modifiers)), E({}, U.popperOptions, {
      modifiers: Fe
    });
  }, [_e, U]), nn = E({}, T, {
    isRtl: Oe,
    arrow: O,
    disableInteractive: et,
    placement: q,
    PopperComponentProp: W,
    touch: Ae.current
  }), Rr = dg(nn), ni = (r = (o = Z.popper) != null ? o : V.Popper) != null ? r : pg, ri = (i = (s = (a = Z.transition) != null ? a : V.Transition) != null ? s : M) != null ? i : io, oi = (u = (c = Z.tooltip) != null ? c : V.Tooltip) != null ? u : fg, ii = (d = (g = Z.arrow) != null ? g : V.Arrow) != null ? d : gg, al = pn(ni, E({}, U, (f = K.popper) != null ? f : L.popper, {
    className: Te(Rr.popper, U == null ? void 0 : U.className, (p = (m = K.popper) != null ? m : L.popper) == null ? void 0 : p.className)
  }), nn), ll = pn(ri, E({}, Q, (h = K.transition) != null ? h : L.transition), nn), ul = pn(oi, E({}, (v = K.tooltip) != null ? v : L.tooltip, {
    className: Te(Rr.tooltip, (w = (k = K.tooltip) != null ? k : L.tooltip) == null ? void 0 : w.className)
  }), nn), cl = pn(ii, E({}, (x = K.arrow) != null ? x : L.arrow, {
    className: Te(Rr.arrow, (S = (b = K.arrow) != null ? b : L.arrow) == null ? void 0 : S.className)
  }), nn);
  return /* @__PURE__ */ ee(C.Fragment, {
    children: [/* @__PURE__ */ C.cloneElement(se, je), /* @__PURE__ */ y(ni, E({
      as: W ?? va,
      placement: q,
      anchorEl: te ? {
        getBoundingClientRect: () => ({
          top: ln.y,
          left: ln.x,
          right: ln.x,
          bottom: ln.y,
          width: 0,
          height: 0
        })
      } : be,
      popperRef: Cr,
      open: be ? tt : !1,
      id: xr,
      transition: !0
    }, tn, al, {
      popperOptions: sl,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ y(ri, E({
        timeout: Se.transitions.duration.shorter
      }, re, ll, {
        children: /* @__PURE__ */ ee(oi, E({}, ul, {
          children: [ie, O ? /* @__PURE__ */ y(ii, E({}, cl, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (ba.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: l.bool,
  /**
   * Tooltip reference element.
   */
  children: Tn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: l.shape({
    Arrow: l.elementType,
    Popper: l.elementType,
    Tooltip: l.elementType,
    Transition: l.elementType
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
  componentsProps: l.shape({
    arrow: l.object,
    popper: l.object,
    tooltip: l.object,
    transition: l.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: l.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: l.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: l.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: l.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: l.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: l.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: l.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: l.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: l.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: l.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: l.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: l.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: l.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: l.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: l.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: l.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: l.shape({
    arrow: l.object,
    popper: l.object,
    tooltip: l.object,
    transition: l.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: l.shape({
    arrow: l.elementType,
    popper: l.elementType,
    tooltip: l.elementType,
    transition: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: l.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: l.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: l.object
});
const mg = ba;
var Lo = {}, ya = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ya);
var hg = ya.exports, Fr = {};
function vg(e) {
  return Ze("MuiSvgIcon", e);
}
mt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const bg = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], yg = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ye(t)}`, `fontSize${Ye(n)}`]
  };
  return lt(o, vg, r);
}, wg = ke("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ye(n.color)}`], t[`fontSize${Ye(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, a, u, c, d, g, f, p, m;
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
      medium: ((a = e.typography) == null || (u = a.pxToRem) == null ? void 0 : u.call(a, 24)) || "1.5rem",
      large: ((c = e.typography) == null || (d = c.pxToRem) == null ? void 0 : d.call(c, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (g = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? g : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.disabled,
      inherit: void 0
    }[t.color]
  };
}), Bo = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = ut({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: s = "inherit",
    component: a = "svg",
    fontSize: u = "medium",
    htmlColor: c,
    inheritViewBox: d = !1,
    titleAccess: g,
    viewBox: f = "0 0 24 24"
  } = r, p = ge(r, bg), m = /* @__PURE__ */ C.isValidElement(o) && o.type === "svg", h = E({}, r, {
    color: s,
    component: a,
    fontSize: u,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: f,
    hasSvgAsChild: m
  }), v = {};
  d || (v.viewBox = f);
  const w = yg(h);
  return /* @__PURE__ */ ee(wg, E({
    as: a,
    className: Te(w.root, i),
    focusable: "false",
    color: c,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n
  }, v, p, m && o.props, {
    ownerState: h,
    children: [m ? o.props.children : o, g ? /* @__PURE__ */ y("title", {
      children: g
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Bo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: l.oneOfType([l.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), l.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: l.oneOfType([l.oneOf(["inherit", "large", "medium", "small"]), l.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: l.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: l.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: l.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: l.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: l.string
});
Bo.muiName = "SvgIcon";
const ts = Bo;
function wa(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ y(ts, E({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = ts.muiName, /* @__PURE__ */ C.memo(/* @__PURE__ */ C.forwardRef(n));
}
const xg = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Gs.configure(e);
  }
}, Sg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ye,
  createChainedFunction: Jr,
  createSvgIcon: wa,
  debounce: As,
  deprecatedPropType: Xu,
  isMuiElement: Ku,
  ownerDocument: Pe,
  ownerWindow: Gt,
  requirePropFactory: Yu,
  setRef: Jn,
  unstable_ClassNameGenerator: xg,
  unstable_useEnhancedEffect: Tt,
  unstable_useId: Fs,
  unsupportedProp: Qu,
  useControlled: Ds,
  useEventCallback: wn,
  useForkRef: Ge,
  useIsFocusVisible: Vs
}, Symbol.toStringTag, { value: "Module" })), Cg = /* @__PURE__ */ Pu(Sg);
var ns;
function Eg() {
  return ns || (ns = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Cg;
  }(Fr)), Fr;
}
var Rg = hg;
Object.defineProperty(Lo, "__esModule", {
  value: !0
});
var xa = Lo.default = void 0, Tg = Rg(Eg()), Pg = dl;
xa = Lo.default = (0, Tg.default)(/* @__PURE__ */ (0, Pg.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function rs(e, t, n) {
  return e ? /* @__PURE__ */ y(vs, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ y("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
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
    className: u,
    isDisabled: c = !1,
    isDense: d = !0,
    isSubMenuParent: g = !1,
    hasDisabledGutters: f = !1,
    hasDivider: p = !1,
    focusVisibleClassName: m,
    id: h,
    children: v
  } = e, w = /* @__PURE__ */ y(
    Ml,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: u,
      disabled: c,
      dense: d,
      disableGutters: f,
      divider: p,
      focusVisibleClassName: m,
      onClick: t,
      id: h,
      children: n ? /* @__PURE__ */ ee(ir, { children: [
        rs(i, n, !0),
        /* @__PURE__ */ y(Al, { primary: n, inset: !i && o }),
        g ? /* @__PURE__ */ y(vs, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ y(xa, {}) }) : rs(s, n, !1)
      ] }) : v
    }
  );
  return r ? /* @__PURE__ */ y(mg, { title: r, placement: "right", children: /* @__PURE__ */ y("div", { children: w }) }) : w;
}
function Ca(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function kg(e) {
  const [t, n] = Ee(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (c) => {
    n(c.currentTarget);
  }, a = () => {
    n(void 0);
  }, u = () => {
    let c = Ca(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return c = c.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ y(jo, { ...e, includedGroups: c });
  };
  return /* @__PURE__ */ ee(ir, { children: [
    /* @__PURE__ */ y(Sa, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ y(
      Fl,
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
        children: u()
      },
      r.id
    )
  ] });
}
const Og = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function jo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Kt(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ca(t).filter((m) => !("menuItem" in m.group))
    ), g = Object.values(d).sort(
      (m, h) => (m.group.order || 0) - (h.group.order || 0)
    ), f = [];
    g.forEach((m) => {
      Og(m.id, t.items).forEach(
        (h) => f.push({ item: h, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const p = f.some(
      (m) => "iconPathBefore" in m.item && m.item.iconPathBefore
    );
    return { items: f, allowForLeadingIcons: p };
  }, [o, t]), a = ({ item: d, isLastItemInGroup: g }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: g,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [u] = i;
  if (!u)
    return /* @__PURE__ */ y("div", {});
  const c = u.item.group;
  return /* @__PURE__ */ y("div", { role: "menu", "aria-label": c, children: i.map((d, g) => {
    const { item: f } = d, p = a(d);
    if ("command" in f) {
      const m = f.group + g;
      return /* @__PURE__ */ y(
        Sa,
        {
          onClick: (h) => {
            n == null || n(h), r(f);
          },
          ...p
        },
        m
      );
    }
    return /* @__PURE__ */ y(
      kg,
      {
        parentMenuItem: f,
        parentItemProps: p,
        ...e
      },
      c + f.id
    );
  }) }, c);
}
function _g(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, a]) => ({ id: s, group: a })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ y(jo, { ...e, includedGroups: i });
}
function Ng({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ ee(
    bs,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ y("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ y(Dl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ y(
          _g,
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
function $g({
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
      const u = a, c = o[u];
      typeof c == "object" && typeof c.order == "number" && !Number.isNaN(c.order) ? s.set(c.order, { id: u, metadata: c }) : console.warn(
        `Property ${a} (${typeof c}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((a, u) => (a.metadata.order || 0) - (u.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ y(
    bs,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, a) => /* @__PURE__ */ y(
        Ng,
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
const Ea = /* @__PURE__ */ C.createContext({});
process.env.NODE_ENV !== "production" && (Ea.displayName = "ListContext");
const Ig = Ea;
function Mg(e) {
  return Ze("MuiList", e);
}
mt("MuiList", ["root", "padding", "dense", "subheader"]);
const Ag = ["children", "className", "component", "dense", "disablePadding", "subheader"], Fg = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return lt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Mg, t);
}, Dg = ke("ul", {
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
}) => E({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Ra = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = ut({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: a = !1,
    disablePadding: u = !1,
    subheader: c
  } = r, d = ge(r, Ag), g = C.useMemo(() => ({
    dense: a
  }), [a]), f = E({}, r, {
    component: s,
    dense: a,
    disablePadding: u
  }), p = Fg(f);
  return /* @__PURE__ */ y(Ig.Provider, {
    value: g,
    children: /* @__PURE__ */ ee(Dg, E({
      as: s,
      className: Te(p.root, i),
      ref: n,
      ownerState: f
    }, d, {
      children: [c, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ra.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: l.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: l.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: l.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object])
});
const Vg = Ra, Lg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Dr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function os(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ta(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function un(e, t, n, r, o, i) {
  let s = !1, a = o(e, t, t ? n : !1);
  for (; a; ) {
    if (a === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const u = r ? !1 : a.disabled || a.getAttribute("aria-disabled") === "true";
    if (!a.hasAttribute("tabindex") || !Ta(a, i) || u)
      a = o(e, a, n);
    else
      return a.focus(), !0;
  }
  return !1;
}
const Pa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: s,
    className: a,
    disabledItemsFocusable: u = !1,
    disableListWrap: c = !1,
    onKeyDown: d,
    variant: g = "selectedMenu"
  } = t, f = ge(t, Lg), p = C.useRef(null), m = C.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Tt(() => {
    o && p.current.focus();
  }, [o]), C.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (x, S) => {
      const b = !p.current.style.width;
      if (x.clientHeight < p.current.clientHeight && b) {
        const T = `${Ls(Pe(x))}px`;
        p.current.style[S.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, p.current.style.width = `calc(100% + ${T})`;
      }
      return p.current;
    }
  }), []);
  const h = (x) => {
    const S = p.current, b = x.key, T = Pe(S).activeElement;
    if (b === "ArrowDown")
      x.preventDefault(), un(S, T, c, u, Dr);
    else if (b === "ArrowUp")
      x.preventDefault(), un(S, T, c, u, os);
    else if (b === "Home")
      x.preventDefault(), un(S, null, c, u, Dr);
    else if (b === "End")
      x.preventDefault(), un(S, null, c, u, os);
    else if (b.length === 1) {
      const O = m.current, D = b.toLowerCase(), V = performance.now();
      O.keys.length > 0 && (V - O.lastTime > 500 ? (O.keys = [], O.repeating = !0, O.previousKeyMatched = !0) : O.repeating && D !== O.keys[0] && (O.repeating = !1)), O.lastTime = V, O.keys.push(D);
      const L = T && !O.repeating && Ta(T, O);
      O.previousKeyMatched && (L || un(S, T, !1, u, Dr, O)) ? x.preventDefault() : O.previousKeyMatched = !1;
    }
    d && d(x);
  }, v = Ge(p, n);
  let w = -1;
  C.Children.forEach(s, (x, S) => {
    if (!/* @__PURE__ */ C.isValidElement(x)) {
      w === S && (w += 1, w >= s.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Yn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (g === "selectedMenu" && x.props.selected || w === -1) && (w = S), w === S && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= s.length && (w = -1));
  });
  const k = C.Children.map(s, (x, S) => {
    if (S === w) {
      const b = {};
      return i && (b.autoFocus = !0), x.props.tabIndex === void 0 && g === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ C.cloneElement(x, b);
    }
    return x;
  });
  return /* @__PURE__ */ y(Vg, E({
    role: "menu",
    ref: v,
    className: a,
    onKeyDown: h,
    tabIndex: o ? 0 : -1
  }, f, {
    children: k
  }));
});
process.env.NODE_ENV !== "production" && (Pa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: l.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: l.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: l.node,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: l.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: l.bool,
  /**
   * @ignore
   */
  onKeyDown: l.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: l.oneOf(["menu", "selectedMenu"])
});
const Bg = Pa, jg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], zg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, ka = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = $n(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: a,
    easing: u,
    in: c,
    onEnter: d,
    onEntered: g,
    onEntering: f,
    onExit: p,
    onExited: m,
    onExiting: h,
    style: v,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: k = ga
  } = t, x = ge(t, jg), S = C.useRef(null), b = Ge(S, a.ref, n), T = (B) => (F) => {
    if (B) {
      const I = S.current;
      F === void 0 ? B(I) : B(I, F);
    }
  }, O = T(f), D = T((B, F) => {
    ma(B);
    const I = rr({
      style: v,
      timeout: w,
      easing: u
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = r.transitions.create("opacity", I), B.style.transition = r.transitions.create("opacity", I), d && d(B, F);
  }), V = T(g), L = T(h), P = T((B) => {
    const F = rr({
      style: v,
      timeout: w,
      easing: u
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = r.transitions.create("opacity", F), B.style.transition = r.transitions.create("opacity", F), p && p(B);
  }), N = T(m);
  return /* @__PURE__ */ y(k, E({
    appear: s,
    in: c,
    nodeRef: S,
    onEnter: D,
    onEntered: V,
    onEntering: O,
    onExit: P,
    onExited: N,
    onExiting: L,
    addEndListener: (B) => {
      i && i(S.current, B);
    },
    timeout: w
  }, x, {
    children: (B, F) => /* @__PURE__ */ C.cloneElement(a, E({
      style: E({
        opacity: 0,
        visibility: B === "exited" && !c ? "hidden" : void 0
      }, zg[B], v, a.props.style),
      ref: b
    }, F))
  }));
});
process.env.NODE_ENV !== "production" && (ka.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: l.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: l.bool,
  /**
   * A single child content element.
   */
  children: Tn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: l.oneOfType([l.shape({
    enter: l.string,
    exit: l.string
  }), l.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: l.bool,
  /**
   * @ignore
   */
  onEnter: l.func,
  /**
   * @ignore
   */
  onEntered: l.func,
  /**
   * @ignore
   */
  onEntering: l.func,
  /**
   * @ignore
   */
  onExit: l.func,
  /**
   * @ignore
   */
  onExited: l.func,
  /**
   * @ignore
   */
  onExiting: l.func,
  /**
   * @ignore
   */
  style: l.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: l.oneOfType([l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })])
});
const Hg = ka;
function Gg(e) {
  return Ze("MuiBackdrop", e);
}
mt("MuiBackdrop", ["root", "invisible"]);
const Ug = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], qg = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return lt({
    root: ["root", n && "invisible"]
  }, Gg, t);
}, Wg = ke("div", {
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
}) => E({
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
})), Oa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i;
  const s = ut({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: a,
    className: u,
    component: c = "div",
    components: d = {},
    componentsProps: g = {},
    invisible: f = !1,
    open: p,
    slotProps: m = {},
    slots: h = {},
    TransitionComponent: v = Hg,
    transitionDuration: w
  } = s, k = ge(s, Ug), x = E({}, s, {
    component: c,
    invisible: f
  }), S = qg(x), b = (r = m.root) != null ? r : g.root;
  return /* @__PURE__ */ y(v, E({
    in: p,
    timeout: w
  }, k, {
    children: /* @__PURE__ */ y(Wg, E({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = h.root) != null ? i : d.Root) != null ? o : c,
      className: Te(S.root, u, b == null ? void 0 : b.className),
      ownerState: E({}, x, b == null ? void 0 : b.ownerState),
      classes: S,
      ref: n,
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: l.shape({
    Root: l.elementType
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
  componentsProps: l.shape({
    root: l.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: l.bool,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: l.shape({
    root: l.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: l.shape({
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: l.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: l.oneOfType([l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })])
});
const Xg = Oa;
function Kg(e) {
  return Ze("MuiModal", e);
}
mt("MuiModal", ["root", "hidden", "backdrop"]);
const Yg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Jg = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return lt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Kg, r);
}, Zg = ke("div", {
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
}) => E({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Qg = ke(Xg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), _a = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i, s, a, u;
  const c = ut({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = Qg,
    BackdropProps: g,
    className: f,
    closeAfterTransition: p = !1,
    children: m,
    container: h,
    component: v,
    components: w = {},
    componentsProps: k = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: S = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: T = !1,
    disableRestoreFocus: O = !1,
    disableScrollLock: D = !1,
    hideBackdrop: V = !1,
    keepMounted: L = !1,
    onBackdropClick: P,
    open: N,
    slotProps: $,
    slots: B
    // eslint-disable-next-line react/prop-types
  } = c, F = ge(c, Yg), I = E({}, c, {
    closeAfterTransition: p,
    disableAutoFocus: x,
    disableEnforceFocus: S,
    disableEscapeKeyDown: b,
    disablePortal: T,
    disableRestoreFocus: O,
    disableScrollLock: D,
    hideBackdrop: V,
    keepMounted: L
  }), {
    getRootProps: j,
    getBackdropProps: ne,
    getTransitionProps: te,
    portalRef: R,
    isTopModal: A,
    exited: H,
    hasTransition: X
  } = Bc(E({}, I, {
    rootRef: n
  })), z = E({}, I, {
    exited: H
  }), G = Jg(z), q = {};
  if (m.props.tabIndex === void 0 && (q.tabIndex = "-1"), X) {
    const {
      onEnter: Q,
      onExited: _
    } = te();
    q.onEnter = Q, q.onExited = _;
  }
  const W = (r = (o = B == null ? void 0 : B.root) != null ? o : w.Root) != null ? r : Zg, U = (i = (s = B == null ? void 0 : B.backdrop) != null ? s : w.Backdrop) != null ? i : d, K = (a = $ == null ? void 0 : $.root) != null ? a : k.root, Z = (u = $ == null ? void 0 : $.backdrop) != null ? u : k.backdrop, ie = Pt({
    elementType: W,
    externalSlotProps: K,
    externalForwardedProps: F,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: v
    },
    ownerState: z,
    className: Te(f, K == null ? void 0 : K.className, G == null ? void 0 : G.root, !z.open && z.exited && (G == null ? void 0 : G.hidden))
  }), M = Pt({
    elementType: U,
    externalSlotProps: Z,
    additionalProps: g,
    getSlotProps: (Q) => ne(E({}, Q, {
      onClick: (_) => {
        P && P(_), Q != null && Q.onClick && Q.onClick(_);
      }
    })),
    className: Te(Z == null ? void 0 : Z.className, g == null ? void 0 : g.className, G == null ? void 0 : G.backdrop),
    ownerState: z
  });
  return !L && !N && (!X || H) ? null : /* @__PURE__ */ y(xn, {
    ref: R,
    container: h,
    disablePortal: T,
    children: /* @__PURE__ */ ee(W, E({}, ie, {
      children: [!V && d ? /* @__PURE__ */ y(U, E({}, M)) : null, /* @__PURE__ */ y(Zn, {
        disableEnforceFocus: S,
        disableAutoFocus: x,
        disableRestoreFocus: O,
        isEnabled: A,
        open: N,
        children: /* @__PURE__ */ C.cloneElement(m, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (_a.propTypes = {
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
  BackdropComponent: l.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: l.object,
  /**
   * A single child content element.
   */
  children: Tn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: l.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: l.shape({
    Backdrop: l.elementType,
    Root: l.elementType
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
  componentsProps: l.shape({
    backdrop: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
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
  container: l.oneOfType([it, l.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: l.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: l.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: l.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: l.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: l.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: l.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: l.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: l.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: l.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: l.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: l.shape({
    backdrop: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: l.shape({
    backdrop: l.elementType,
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object])
});
const em = _a;
function tm(e) {
  return Ze("MuiPaper", e);
}
mt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const nm = ["className", "component", "elevation", "square", "variant"], rm = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return lt(i, tm, o);
}, om = ke("div", {
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
  return E({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && E({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${nr("#fff", Qi(t.elevation))}, ${nr("#fff", Qi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Na = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = ut({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: a = !1,
    variant: u = "elevation"
  } = r, c = ge(r, nm), d = E({}, r, {
    component: i,
    elevation: s,
    square: a,
    variant: u
  }), g = rm(d);
  return process.env.NODE_ENV !== "production" && $n().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ y(om, E({
    as: i,
    ownerState: d,
    className: Te(g.root, o),
    ref: n
  }, c));
});
process.env.NODE_ENV !== "production" && (Na.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: l.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Jt(zs, (e) => {
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
  square: l.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: l.oneOfType([l.oneOf(["elevation", "outlined"]), l.string])
});
const im = Na;
function sm(e) {
  return Ze("MuiPopover", e);
}
mt("MuiPopover", ["root", "paper"]);
const am = ["onEntering"], lm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], um = ["slotProps"];
function is(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function ss(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function as(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Xn(e) {
  return typeof e == "function" ? e() : e;
}
const cm = (e) => {
  const {
    classes: t
  } = e;
  return lt({
    root: ["root"],
    paper: ["paper"]
  }, sm, t);
}, dm = ke(em, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), $a = ke(im, {
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
}), Ia = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i;
  const s = ut({
    props: t,
    name: "MuiPopover"
  }), {
    action: a,
    anchorEl: u,
    anchorOrigin: c = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: d,
    anchorReference: g = "anchorEl",
    children: f,
    className: p,
    container: m,
    elevation: h = 8,
    marginThreshold: v = 16,
    open: w,
    PaperProps: k = {},
    slots: x,
    slotProps: S,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = io,
    transitionDuration: O = "auto",
    TransitionProps: {
      onEntering: D
    } = {},
    disableScrollLock: V = !1
  } = s, L = ge(s.TransitionProps, am), P = ge(s, lm), N = (r = S == null ? void 0 : S.paper) != null ? r : k, $ = C.useRef(), B = Ge($, N.ref), F = E({}, s, {
    anchorOrigin: c,
    anchorReference: g,
    elevation: h,
    marginThreshold: v,
    externalPaperSlotProps: N,
    transformOrigin: b,
    TransitionComponent: T,
    transitionDuration: O,
    TransitionProps: L
  }), I = cm(F), j = C.useCallback(() => {
    if (g === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const Q = Xn(u), _ = Q && Q.nodeType === 1 ? Q : Pe($.current).body, se = _.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Se = _.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Se.top === 0 && Se.left === 0 && Se.right === 0 && Se.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + is(se, c.vertical),
      left: se.left + ss(se, c.horizontal)
    };
  }, [u, c.horizontal, c.vertical, d, g]), ne = C.useCallback((Q) => ({
    vertical: is(Q, b.vertical),
    horizontal: ss(Q, b.horizontal)
  }), [b.horizontal, b.vertical]), te = C.useCallback((Q) => {
    const _ = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, se = ne(_);
    if (g === "none")
      return {
        top: null,
        left: null,
        transformOrigin: as(se)
      };
    const Se = j();
    let Oe = Se.top - se.vertical, be = Se.left - se.horizontal;
    const bt = Oe + _.height, _e = be + _.width, Qe = Gt(Xn(u)), Ae = Qe.innerHeight - v, et = Qe.innerWidth - v;
    if (v !== null && Oe < v) {
      const Ce = Oe - v;
      Oe -= Ce, se.vertical += Ce;
    } else if (v !== null && bt > Ae) {
      const Ce = bt - Ae;
      Oe -= Ce, se.vertical += Ce;
    }
    if (process.env.NODE_ENV !== "production" && _.height > Ae && _.height && Ae && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${_.height - Ae}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && be < v) {
      const Ce = be - v;
      be -= Ce, se.horizontal += Ce;
    } else if (_e > et) {
      const Ce = _e - et;
      be -= Ce, se.horizontal += Ce;
    }
    return {
      top: `${Math.round(Oe)}px`,
      left: `${Math.round(be)}px`,
      transformOrigin: as(se)
    };
  }, [u, g, j, ne, v]), [R, A] = C.useState(w), H = C.useCallback(() => {
    const Q = $.current;
    if (!Q)
      return;
    const _ = te(Q);
    _.top !== null && (Q.style.top = _.top), _.left !== null && (Q.style.left = _.left), Q.style.transformOrigin = _.transformOrigin, A(!0);
  }, [te]);
  C.useEffect(() => (V && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [u, V, H]);
  const X = (Q, _) => {
    D && D(Q, _), H();
  }, z = () => {
    A(!1);
  };
  C.useEffect(() => {
    w && H();
  }), C.useImperativeHandle(a, () => w ? {
    updatePosition: () => {
      H();
    }
  } : null, [w, H]), C.useEffect(() => {
    if (!w)
      return;
    const Q = As(() => {
      H();
    }), _ = Gt(u);
    return _.addEventListener("resize", Q), () => {
      Q.clear(), _.removeEventListener("resize", Q);
    };
  }, [u, w, H]);
  let G = O;
  O === "auto" && !T.muiSupportAuto && (G = void 0);
  const q = m || (u ? Pe(Xn(u)).body : void 0), W = (o = x == null ? void 0 : x.root) != null ? o : dm, U = (i = x == null ? void 0 : x.paper) != null ? i : $a, K = Pt({
    elementType: U,
    externalSlotProps: E({}, N, {
      style: R ? N.style : E({}, N.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: h,
      ref: B
    },
    ownerState: F,
    className: Te(I.paper, N == null ? void 0 : N.className)
  }), Z = Pt({
    elementType: W,
    externalSlotProps: (S == null ? void 0 : S.root) || {},
    externalForwardedProps: P,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: w
    },
    ownerState: F,
    className: Te(I.root, p)
  }), {
    slotProps: ie
  } = Z, M = ge(Z, um);
  return /* @__PURE__ */ y(W, E({}, M, !qs(W) && {
    slotProps: ie,
    disableScrollLock: V
  }, {
    children: /* @__PURE__ */ y(T, E({
      appear: !0,
      in: w,
      onEntering: X,
      onExited: z,
      timeout: G
    }, L, {
      children: /* @__PURE__ */ y(U, E({}, K, {
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
  action: So,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Jt(l.oneOfType([it, l.func]), (e) => {
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
  anchorOrigin: l.shape({
    horizontal: l.oneOfType([l.oneOf(["center", "left", "right"]), l.number]).isRequired,
    vertical: l.oneOfType([l.oneOf(["bottom", "center", "top"]), l.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: l.shape({
    left: l.number.isRequired,
    top: l.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: l.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: l.oneOfType([it, l.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: l.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: zs,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: l.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: l.shape({
    component: Bu
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: l.shape({
    paper: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: l.shape({
    paper: l.elementType,
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
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
  transformOrigin: l.shape({
    horizontal: l.oneOfType([l.oneOf(["center", "left", "right"]), l.number]).isRequired,
    vertical: l.oneOfType([l.oneOf(["bottom", "center", "top"]), l.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: l.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: l.oneOfType([l.oneOf(["auto"]), l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: l.object
});
const pm = Ia;
function fm(e) {
  return Ze("MuiMenu", e);
}
mt("MuiMenu", ["root", "paper", "list"]);
const gm = ["onEntering"], mm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], hm = {
  vertical: "top",
  horizontal: "right"
}, vm = {
  vertical: "top",
  horizontal: "left"
}, bm = (e) => {
  const {
    classes: t
  } = e;
  return lt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, fm, t);
}, ym = ke(pm, {
  shouldForwardProp: (e) => pa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), wm = ke($a, {
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
}), xm = ke(Bg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Ma = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o;
  const i = ut({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: a,
    className: u,
    disableAutoFocusItem: c = !1,
    MenuListProps: d = {},
    onClose: g,
    open: f,
    PaperProps: p = {},
    PopoverClasses: m,
    transitionDuration: h = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: w = "selectedMenu",
    slots: k = {},
    slotProps: x = {}
  } = i, S = ge(i.TransitionProps, gm), b = ge(i, mm), T = $n(), O = T.direction === "rtl", D = E({}, i, {
    autoFocus: s,
    disableAutoFocusItem: c,
    MenuListProps: d,
    onEntering: v,
    PaperProps: p,
    transitionDuration: h,
    TransitionProps: S,
    variant: w
  }), V = bm(D), L = s && !c && f, P = C.useRef(null), N = (te, R) => {
    P.current && P.current.adjustStyleForScrollbar(te, T), v && v(te, R);
  }, $ = (te) => {
    te.key === "Tab" && (te.preventDefault(), g && g(te, "tabKeyDown"));
  };
  let B = -1;
  C.Children.map(a, (te, R) => {
    /* @__PURE__ */ C.isValidElement(te) && (process.env.NODE_ENV !== "production" && Yn.isFragment(te) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), te.props.disabled || (w === "selectedMenu" && te.props.selected || B === -1) && (B = R));
  });
  const F = (r = k.paper) != null ? r : wm, I = (o = x.paper) != null ? o : p, j = Pt({
    elementType: k.root,
    externalSlotProps: x.root,
    ownerState: D,
    className: [V.root, u]
  }), ne = Pt({
    elementType: F,
    externalSlotProps: I,
    ownerState: D,
    className: V.paper
  });
  return /* @__PURE__ */ y(ym, E({
    onClose: g,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: O ? "right" : "left"
    },
    transformOrigin: O ? hm : vm,
    slots: {
      paper: F,
      root: k.root
    },
    slotProps: {
      root: j,
      paper: ne
    },
    open: f,
    ref: n,
    transitionDuration: h,
    TransitionProps: E({
      onEntering: N
    }, S),
    ownerState: D
  }, b, {
    classes: m,
    children: /* @__PURE__ */ y(xm, E({
      onKeyDown: $,
      actions: P,
      autoFocus: s && (B === -1 || c),
      autoFocusItem: L,
      variant: w
    }, d, {
      className: Te(V.list, d.className),
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ma.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: l.oneOfType([it, l.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: l.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: l.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: l.object,
  /**
   * @ignore
   */
  className: l.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: l.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: l.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: l.func,
  /**
   * If `true`, the component is shown.
   */
  open: l.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: l.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: l.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: l.shape({
    paper: l.oneOfType([l.func, l.object]),
    root: l.oneOfType([l.func, l.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: l.shape({
    paper: l.elementType,
    root: l.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: l.oneOfType([l.arrayOf(l.oneOfType([l.func, l.object, l.bool])), l.func, l.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: l.oneOfType([l.oneOf(["auto"]), l.number, l.shape({
    appear: l.number,
    enter: l.number,
    exit: l.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: l.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: l.oneOf(["menu", "selectedMenu"])
});
const Sm = Ma;
function Kh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var c;
  const [o, i] = jt.useState(void 0), s = $e(
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
  ), a = $e(() => {
    i(void 0);
  }, []), u = Kt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((c = n == null ? void 0 : n.items) == null ? void 0 : c.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ ee(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ y(
          Sm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: a,
            anchorReference: "anchorPosition",
            anchorPosition: u,
            children: /* @__PURE__ */ y(
              jo,
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
const Cm = wa(/* @__PURE__ */ y("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Em(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const so = (e, t, n = {}) => {
  const r = Ct(t);
  r.current = t;
  const o = Ct(n);
  o.current = Em(o.current);
  const [i, s] = Ee(() => r.current), [a, u] = Ee(!0);
  return Rn(() => {
    let c = !0;
    return u(!!e), (async () => {
      if (e) {
        const d = await e();
        c && (s(() => d), u(!1));
      }
    })(), () => {
      c = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [i, a];
};
function Rm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: a
}) {
  const [u, c] = Ee(!1), [d, g] = Ee(!1), f = $e(() => {
    u && c(!1), g(!1);
  }, [u]), p = $e((S) => {
    S.stopPropagation(), c((b) => {
      const T = !b;
      return T && S.shiftKey ? g(!0) : T || g(!1), T;
    });
  }, []), m = $e(
    (S) => (f(), r(S)),
    [r, f]
  ), [h, v] = Ee({ top: 1, left: 1 });
  Rn(() => {
    if (u) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const b = S.getBoundingClientRect(), T = window.scrollY, O = window.scrollX, D = b.top + T + S.clientHeight, V = b.left + O;
        v({ top: D, left: V });
      }
    }
  }, [u, o]);
  const [w] = so(
    $e(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, u]),
    t
  ), [k] = so(
    $e(async () => (e == null ? void 0 : e(!0)) ?? n ?? w, [e, n, w, u]),
    n ?? w
  ), x = d && k ? k : w;
  return /* @__PURE__ */ ee(ir, { children: [
    /* @__PURE__ */ y(
      ys,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: p,
        children: a ?? /* @__PURE__ */ y(Cm, {})
      }
    ),
    /* @__PURE__ */ y(
      Vl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: u,
        onClose: f,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: h.top,
            left: h.left
          }
        },
        children: x ? /* @__PURE__ */ y(
          $g,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: m,
            multiColumnMenu: x
          }
        ) : void 0
      }
    )
  ] });
}
function Yh({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: s = "medium",
  className: a,
  onClick: u,
  children: c
}) {
  return /* @__PURE__ */ y(
    ys,
    {
      id: e,
      disabled: n,
      edge: i,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${a ?? ""}`,
      onClick: u,
      children: c
    }
  );
}
function or({
  variant: e = "outlined",
  id: t,
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: a,
  isRequired: u = !1,
  className: c,
  defaultValue: d,
  value: g,
  onChange: f,
  onFocus: p,
  onBlur: m
}) {
  return /* @__PURE__ */ y(
    hs,
    {
      variant: e,
      id: t,
      disabled: n,
      error: r,
      fullWidth: o,
      helperText: i,
      label: s,
      placeholder: a,
      required: u,
      className: `papi-textfield ${c ?? ""}`,
      defaultValue: d,
      value: g,
      onChange: f,
      onFocus: p,
      onBlur: m
    }
  );
}
let Vr;
const Lr = () => (Vr || (Vr = fe.allBookIds.map((e) => ({
  bookId: e,
  label: fe.bookIdToEnglishName(e)
}))), Vr);
function Jh({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (u) => {
    t(u);
  }, o = (u, c) => {
    const g = { bookNum: fe.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
    r(g);
  }, i = (u) => {
    t({ ...e, chapterNum: +u.target.value });
  }, s = (u) => {
    t({ ...e, verseNum: +u.target.value });
  }, a = Kt(() => Lr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ee("span", { id: n, children: [
    /* @__PURE__ */ y(
      Xr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: a,
        options: Lr(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ y(
      Nt,
      {
        onClick: () => r(ai(e, -1)),
        isDisabled: e.bookNum <= pl,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      Nt,
      {
        onClick: () => r(ai(e, 1)),
        isDisabled: e.bookNum >= Lr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      or,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ y(
      Nt,
      {
        onClick: () => t(li(e, -1)),
        isDisabled: e.chapterNum <= fl,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(
      Nt,
      {
        onClick: () => t(li(e, 1)),
        isDisabled: e.chapterNum >= fs(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ y(
      or,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ y(
      Nt,
      {
        onClick: () => t(ui(e, -1)),
        isDisabled: e.verseNum <= gl,
        children: "<"
      }
    ),
    /* @__PURE__ */ y(Nt, { onClick: () => t(ui(e, 1)), children: ">" })
  ] });
}
function Zh({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ee(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ y(Ll, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ y(
    or,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  ) });
}
function Qh({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: s = !1,
  defaultValue: a,
  value: u,
  valueLabelDisplay: c = "off",
  className: d,
  onChange: g,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ y(
    Bl,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: s,
      defaultValue: a,
      value: u,
      valueLabelDisplay: c,
      className: `papi-slider ${n} ${d ?? ""}`,
      onChange: g,
      onChangeCommitted: f
    }
  );
}
function ev({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: s,
  children: a
}) {
  const u = {
    action: (s == null ? void 0 : s.action) || a,
    message: s == null ? void 0 : s.message,
    className: r
  };
  return /* @__PURE__ */ y(
    jl,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: i,
      id: t,
      ContentProps: u
    }
  );
}
function tv({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ y(
    zl,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function ls({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ y(or, { defaultValue: t[n.key], onChange: r });
}
const Tm = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ y(
  Ru,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function nv({
  columns: e,
  sortColumns: t,
  onSortColumnsChange: n,
  onColumnResize: r,
  defaultColumnWidth: o,
  defaultColumnMinWidth: i,
  defaultColumnMaxWidth: s,
  defaultColumnSortable: a = !0,
  defaultColumnResizable: u = !0,
  rows: c,
  enableSelectColumn: d,
  selectColumnWidth: g = 50,
  rowKeyGetter: f,
  rowHeight: p = 35,
  headerRowHeight: m = 35,
  selectedRows: h,
  onSelectedRowsChange: v,
  onRowsChange: w,
  onCellClick: k,
  onCellDoubleClick: x,
  onCellContextMenu: S,
  onCellKeyDown: b,
  direction: T = "ltr",
  enableVirtualization: O = !0,
  onCopy: D,
  onPaste: V,
  onScroll: L,
  className: P,
  "data-testid": N
}) {
  const $ = Kt(() => {
    const B = e.map((F) => typeof F.editable == "function" ? {
      ...F,
      editable: (j) => !!F.editable(j),
      renderEditCell: F.renderEditCell || ls
    } : F.editable && !F.renderEditCell ? { ...F, renderEditCell: ls } : F.renderEditCell && !F.editable ? { ...F, editable: !1 } : F);
    return d ? [{ ...Yl, minWidth: g }, ...B] : B;
  }, [e, d, g]);
  return /* @__PURE__ */ y(
    Kl,
    {
      columns: $,
      defaultColumnOptions: {
        width: o,
        minWidth: i,
        maxWidth: s,
        sortable: a,
        resizable: u
      },
      sortColumns: t,
      onSortColumnsChange: n,
      onColumnResize: r,
      rows: c,
      rowKeyGetter: f,
      rowHeight: p,
      headerRowHeight: m,
      selectedRows: h,
      onSelectedRowsChange: v,
      onRowsChange: w,
      onCellClick: k,
      onCellDoubleClick: x,
      onCellContextMenu: S,
      onCellKeyDown: b,
      direction: T,
      enableVirtualization: O,
      onCopy: D,
      onPaste: V,
      onScroll: L,
      renderers: { renderCheckbox: Tm },
      className: `papi-table ${P ?? "rdg-light"}`,
      "data-testid": N
    }
  );
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
function ft(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Be(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: ft(n, r[e])
    }));
  };
}
function wr(e) {
  return e instanceof Function;
}
function Pm(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function km(e, t) {
  const n = [], r = (o) => {
    o.forEach((i) => {
      n.push(i);
      const s = t(i);
      s != null && s.length && r(s);
    });
  };
  return r(e), n;
}
function Y(e, t, n) {
  let r = [], o;
  return (i) => {
    let s;
    n.key && n.debug && (s = Date.now());
    const a = e(i);
    if (!(a.length !== r.length || a.some((d, g) => r[g] !== d)))
      return o;
    r = a;
    let c;
    if (n.key && n.debug && (c = Date.now()), o = t(...a), n == null || n.onChange == null || n.onChange(o), n.key && n.debug && n != null && n.debug()) {
      const d = Math.round((Date.now() - s) * 100) / 100, g = Math.round((Date.now() - c) * 100) / 100, f = g / 16, p = (m, h) => {
        for (m = String(m); m.length < h; )
          m = " " + m;
        return m;
      };
      console.info(`%c⏱ ${p(g, 5)} /${p(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * f, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
    }
    return o;
  };
}
function J(e, t, n, r) {
  return {
    debug: () => {
      var o;
      return (o = e == null ? void 0 : e.debugAll) != null ? o : e[t];
    },
    key: process.env.NODE_ENV === "development" && n,
    onChange: r
  };
}
function Om(e, t, n, r) {
  const o = () => {
    var s;
    return (s = i.getValue()) != null ? s : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: Y(() => [e, n, t, i], (s, a, u, c) => ({
      table: s,
      column: a,
      row: u,
      cell: c,
      getValue: c.getValue,
      renderValue: c.renderValue
    }), J(e.options, "debugCells", "cell.getContext"))
  };
  return e._features.forEach((s) => {
    s.createCell == null || s.createCell(i, n, t, e);
  }, {}), i;
}
function _m(e, t, n, r) {
  var o, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...t
  }, u = a.accessorKey;
  let c = (o = (i = a.id) != null ? i : u ? u.replace(".", "_") : void 0) != null ? o : typeof a.header == "string" ? a.header : void 0, d;
  if (a.accessorFn ? d = a.accessorFn : u && (u.includes(".") ? d = (f) => {
    let p = f;
    for (const h of u.split(".")) {
      var m;
      p = (m = p) == null ? void 0 : m[h], process.env.NODE_ENV !== "production" && p === void 0 && console.warn(`"${h}" in deeply nested key "${u}" returned undefined.`);
    }
    return p;
  } : d = (f) => f[a.accessorKey]), !c)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let g = {
    id: `${String(c)}`,
    accessorFn: d,
    parent: r,
    depth: n,
    columnDef: a,
    columns: [],
    getFlatColumns: Y(() => [!0], () => {
      var f;
      return [g, ...(f = g.columns) == null ? void 0 : f.flatMap((p) => p.getFlatColumns())];
    }, J(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: Y(() => [e._getOrderColumnsFn()], (f) => {
      var p;
      if ((p = g.columns) != null && p.length) {
        let m = g.columns.flatMap((h) => h.getLeafColumns());
        return f(m);
      }
      return [g];
    }, J(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const f of e._features)
    f.createColumn == null || f.createColumn(g, e);
  return g;
}
const Re = "debugHeaders";
function us(e, t, n) {
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
      const s = [], a = (u) => {
        u.subHeaders && u.subHeaders.length && u.subHeaders.map(a), s.push(u);
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
const Nm = {
  createTable: (e) => {
    e.getHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, s;
      const a = (i = r == null ? void 0 : r.map((g) => n.find((f) => f.id === g)).filter(Boolean)) != null ? i : [], u = (s = o == null ? void 0 : o.map((g) => n.find((f) => f.id === g)).filter(Boolean)) != null ? s : [], c = n.filter((g) => !(r != null && r.includes(g.id)) && !(o != null && o.includes(g.id)));
      return zn(t, [...a, ...c, ...u], e);
    }, J(e.options, Re, "getHeaderGroups")), e.getCenterHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), zn(t, n, e, "center")), J(e.options, Re, "getCenterHeaderGroups")), e.getLeftHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return zn(t, i, e, "left");
    }, J(e.options, Re, "getLeftHeaderGroups")), e.getRightHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return zn(t, i, e, "right");
    }, J(e.options, Re, "getRightHeaderGroups")), e.getFooterGroups = Y(() => [e.getHeaderGroups()], (t) => [...t].reverse(), J(e.options, Re, "getFooterGroups")), e.getLeftFooterGroups = Y(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), J(e.options, Re, "getLeftFooterGroups")), e.getCenterFooterGroups = Y(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), J(e.options, Re, "getCenterFooterGroups")), e.getRightFooterGroups = Y(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), J(e.options, Re, "getRightFooterGroups")), e.getFlatHeaders = Y(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, Re, "getFlatHeaders")), e.getLeftFlatHeaders = Y(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, Re, "getLeftFlatHeaders")), e.getCenterFlatHeaders = Y(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, Re, "getCenterFlatHeaders")), e.getRightFlatHeaders = Y(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, Re, "getRightFlatHeaders")), e.getCenterLeafHeaders = Y(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), J(e.options, Re, "getCenterLeafHeaders")), e.getLeftLeafHeaders = Y(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), J(e.options, Re, "getLeftLeafHeaders")), e.getRightLeafHeaders = Y(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), J(e.options, Re, "getRightLeafHeaders")), e.getLeafHeaders = Y(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, s, a, u, c;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(s = (a = n[0]) == null ? void 0 : a.headers) != null ? s : [], ...(u = (c = r[0]) == null ? void 0 : c.headers) != null ? u : []].map((d) => d.getLeafHeaders()).flat();
    }, J(e.options, Re, "getLeafHeaders"));
  }
};
function zn(e, t, n, r) {
  var o, i;
  let s = 0;
  const a = function(f, p) {
    p === void 0 && (p = 1), s = Math.max(s, p), f.filter((m) => m.getIsVisible()).forEach((m) => {
      var h;
      (h = m.columns) != null && h.length && a(m.columns, p + 1);
    }, 0);
  };
  a(e);
  let u = [];
  const c = (f, p) => {
    const m = {
      depth: p,
      id: [r, `${p}`].filter(Boolean).join("_"),
      headers: []
    }, h = [];
    f.forEach((v) => {
      const w = [...h].reverse()[0], k = v.column.depth === m.depth;
      let x, S = !1;
      if (k && v.column.parent ? x = v.column.parent : (x = v.column, S = !0), w && (w == null ? void 0 : w.column) === x)
        w.subHeaders.push(v);
      else {
        const b = us(n, x, {
          id: [r, p, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: S,
          placeholderId: S ? `${h.filter((T) => T.column === x).length}` : void 0,
          depth: p,
          index: h.length
        });
        b.subHeaders.push(v), h.push(b);
      }
      m.headers.push(v), v.headerGroup = m;
    }), u.push(m), p > 0 && c(h, p - 1);
  }, d = t.map((f, p) => us(n, f, {
    depth: s,
    index: p
  }));
  c(d, s - 1), u.reverse();
  const g = (f) => f.filter((m) => m.column.getIsVisible()).map((m) => {
    let h = 0, v = 0, w = [0];
    m.subHeaders && m.subHeaders.length ? (w = [], g(m.subHeaders).forEach((x) => {
      let {
        colSpan: S,
        rowSpan: b
      } = x;
      h += S, w.push(b);
    })) : h = 1;
    const k = Math.min(...w);
    return v = v + k, m.colSpan = h, m.rowSpan = v, {
      colSpan: h,
      rowSpan: v
    };
  });
  return g((o = (i = u[0]) == null ? void 0 : i.headers) != null ? o : []), u;
}
const zo = (e, t, n, r, o, i, s) => {
  let a = {
    id: t,
    index: r,
    original: n,
    depth: o,
    parentId: s,
    _valuesCache: {},
    _uniqueValuesCache: {},
    getValue: (u) => {
      if (a._valuesCache.hasOwnProperty(u))
        return a._valuesCache[u];
      const c = e.getColumn(u);
      if (c != null && c.accessorFn)
        return a._valuesCache[u] = c.accessorFn(a.original, r), a._valuesCache[u];
    },
    getUniqueValues: (u) => {
      if (a._uniqueValuesCache.hasOwnProperty(u))
        return a._uniqueValuesCache[u];
      const c = e.getColumn(u);
      if (c != null && c.accessorFn)
        return c.columnDef.getUniqueValues ? (a._uniqueValuesCache[u] = c.columnDef.getUniqueValues(a.original, r), a._uniqueValuesCache[u]) : (a._uniqueValuesCache[u] = [a.getValue(u)], a._uniqueValuesCache[u]);
    },
    renderValue: (u) => {
      var c;
      return (c = a.getValue(u)) != null ? c : e.options.renderFallbackValue;
    },
    subRows: i ?? [],
    getLeafRows: () => km(a.subRows, (u) => u.subRows),
    getParentRow: () => a.parentId ? e.getRow(a.parentId, !0) : void 0,
    getParentRows: () => {
      let u = [], c = a;
      for (; ; ) {
        const d = c.getParentRow();
        if (!d)
          break;
        u.push(d), c = d;
      }
      return u.reverse();
    },
    getAllCells: Y(() => [e.getAllLeafColumns()], (u) => u.map((c) => Om(e, a, c, c.id)), J(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: Y(() => [a.getAllCells()], (u) => u.reduce((c, d) => (c[d.column.id] = d, c), {}), J(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let u = 0; u < e._features.length; u++) {
    const c = e._features[u];
    c == null || c.createRow == null || c.createRow(a, e);
  }
  return a;
}, $m = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, Aa = (e, t, n) => {
  var r;
  const o = n.toLowerCase();
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(o));
};
Aa.autoRemove = (e) => Xe(e);
const Fa = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Fa.autoRemove = (e) => Xe(e);
const Da = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Da.autoRemove = (e) => Xe(e);
const Va = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Va.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const La = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
La.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Ba = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Ba.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const ja = (e, t, n) => e.getValue(t) === n;
ja.autoRemove = (e) => Xe(e);
const za = (e, t, n) => e.getValue(t) == n;
za.autoRemove = (e) => Xe(e);
const Ho = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
Ho.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, s = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const a = i;
    i = s, s = a;
  }
  return [i, s];
};
Ho.autoRemove = (e) => Xe(e) || Xe(e[0]) && Xe(e[1]);
const nt = {
  includesString: Aa,
  includesStringSensitive: Fa,
  equalsString: Da,
  arrIncludes: Va,
  arrIncludesAll: La,
  arrIncludesSome: Ba,
  equals: ja,
  weakEquals: za,
  inNumberRange: Ho
};
function Xe(e) {
  return e == null || e === "";
}
const Im = {
  getDefaultColumnDef: () => ({
    filterFn: "auto"
  }),
  getInitialState: (e) => ({
    columnFilters: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnFiltersChange: Be("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? nt.includesString : typeof r == "number" ? nt.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? nt.equals : Array.isArray(r) ? nt.arrIncludes : nt.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return wr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : nt[e.columnDef.filterFn]
      );
    }, e.getCanFilter = () => {
      var n, r, o;
      return ((n = e.columnDef.enableColumnFilter) != null ? n : !0) && ((r = t.options.enableColumnFilters) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && !!e.accessorFn;
    }, e.getIsFiltered = () => e.getFilterIndex() > -1, e.getFilterValue = () => {
      var n;
      return (n = t.getState().columnFilters) == null || (n = n.find((r) => r.id === e.id)) == null ? void 0 : n.value;
    }, e.getFilterIndex = () => {
      var n, r;
      return (n = (r = t.getState().columnFilters) == null ? void 0 : r.findIndex((o) => o.id === e.id)) != null ? n : -1;
    }, e.setFilterValue = (n) => {
      t.setColumnFilters((r) => {
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((d) => d.id === e.id), s = ft(n, i ? i.value : void 0);
        if (cs(o, s, e)) {
          var a;
          return (a = r == null ? void 0 : r.filter((d) => d.id !== e.id)) != null ? a : [];
        }
        const u = {
          id: e.id,
          value: s
        };
        if (i) {
          var c;
          return (c = r == null ? void 0 : r.map((d) => d.id === e.id ? u : d)) != null ? c : [];
        }
        return r != null && r.length ? [...r, u] : [u];
      });
    };
  },
  createRow: (e, t) => {
    e.columnFilters = {}, e.columnFiltersMeta = {};
  },
  createTable: (e) => {
    e.setColumnFilters = (t) => {
      const n = e.getAllLeafColumns(), r = (o) => {
        var i;
        return (i = ft(t, o)) == null ? void 0 : i.filter((s) => {
          const a = n.find((u) => u.id === s.id);
          if (a) {
            const u = a.getFilterFn();
            if (cs(u, s.value, a))
              return !1;
          }
          return !0;
        });
      };
      e.options.onColumnFiltersChange == null || e.options.onColumnFiltersChange(r);
    }, e.resetColumnFilters = (t) => {
      var n, r;
      e.setColumnFilters(t ? [] : (n = (r = e.initialState) == null ? void 0 : r.columnFilters) != null ? n : []);
    }, e.getPreFilteredRowModel = () => e.getCoreRowModel(), e.getFilteredRowModel = () => (!e._getFilteredRowModel && e.options.getFilteredRowModel && (e._getFilteredRowModel = e.options.getFilteredRowModel(e)), e.options.manualFiltering || !e._getFilteredRowModel ? e.getPreFilteredRowModel() : e._getFilteredRowModel());
  }
};
function cs(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Mm = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), Am = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Fm = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, Dm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Vm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n)
    return r / n;
}, Lm = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Pm(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, s) => i - s);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Bm = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), jm = (e, t) => new Set(t.map((n) => n.getValue(e))).size, zm = (e, t) => t.length, Br = {
  sum: Mm,
  min: Am,
  max: Fm,
  extent: Dm,
  mean: Vm,
  median: Lm,
  unique: Bm,
  uniqueCount: jm,
  count: zm
}, Hm = {
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
      var n, r;
      return ((n = e.columnDef.enableGrouping) != null ? n : !0) && ((r = t.options.enableGrouping) != null ? r : !0) && (!!e.accessorFn || !!e.columnDef.getGroupingValue);
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
        return Br.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Br.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return wr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : Br[e.columnDef.aggregationFn];
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
function Gm(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const Um = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Be("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = Y((n) => [yn(t, n)], (n) => n.findIndex((r) => r.id === e.id), J(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = yn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = yn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = Y(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
      let i = [];
      if (!(t != null && t.length))
        i = o;
      else {
        const s = [...t], a = [...o];
        for (; a.length && s.length; ) {
          const u = s.shift(), c = a.findIndex((d) => d.id === u);
          c > -1 && i.push(a.splice(c, 1)[0]);
        }
        i = [...i, ...a];
      }
      return Gm(i, n, r);
    }, J(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, jr = () => ({
  left: [],
  right: []
}), qm = {
  getInitialState: (e) => ({
    columnPinning: jr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: Be("columnPinning", e)
  }),
  createColumn: (e, t) => {
    e.pin = (n) => {
      const r = e.getLeafColumns().map((o) => o.id).filter(Boolean);
      t.setColumnPinning((o) => {
        var i, s;
        if (n === "right") {
          var a, u;
          return {
            left: ((a = o == null ? void 0 : o.left) != null ? a : []).filter((g) => !(r != null && r.includes(g))),
            right: [...((u = o == null ? void 0 : o.right) != null ? u : []).filter((g) => !(r != null && r.includes(g))), ...r]
          };
        }
        if (n === "left") {
          var c, d;
          return {
            left: [...((c = o == null ? void 0 : o.left) != null ? c : []).filter((g) => !(r != null && r.includes(g))), ...r],
            right: ((d = o == null ? void 0 : o.right) != null ? d : []).filter((g) => !(r != null && r.includes(g)))
          };
        }
        return {
          left: ((i = o == null ? void 0 : o.left) != null ? i : []).filter((g) => !(r != null && r.includes(g))),
          right: ((s = o == null ? void 0 : o.right) != null ? s : []).filter((g) => !(r != null && r.includes(g)))
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
    e.getCenterVisibleCells = Y(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((s) => !i.includes(s.column.id));
    }, J(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = Y(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), J(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = Y(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "right"
    })), J(t.options, "debugRows", "getRightVisibleCells"));
  },
  createTable: (e) => {
    e.setColumnPinning = (t) => e.options.onColumnPinningChange == null ? void 0 : e.options.onColumnPinningChange(t), e.resetColumnPinning = (t) => {
      var n, r;
      return e.setColumnPinning(t ? jr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : jr());
    }, e.getIsSomeColumnsPinned = (t) => {
      var n;
      const r = e.getState().columnPinning;
      if (!t) {
        var o, i;
        return !!((o = r.left) != null && o.length || (i = r.right) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e.getLeftLeafColumns = Y(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), J(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = Y(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), J(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = Y(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, J(e.options, "debugColumns", "getCenterLeafColumns"));
  }
}, Hn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, zr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), Wm = {
  getDefaultColumnDef: () => Hn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: zr(),
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
    }, e.getStart = Y((n) => [n, yn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), J(t.options, "debugColumns", "getStart")), e.getAfter = Y((n) => [n, yn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), J(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!r || !o || (i.persist == null || i.persist(), Hr(i) && i.touches && i.touches.length > 1))
          return;
        const s = e.getSize(), a = e ? e.getLeafHeaders().map((w) => [w.column.id, w.column.getSize()]) : [[r.id, r.getSize()]], u = Hr(i) ? Math.round(i.touches[0].clientX) : i.clientX, c = {}, d = (w, k) => {
          typeof k == "number" && (t.setColumnSizingInfo((x) => {
            var S, b;
            const T = t.options.columnResizeDirection === "rtl" ? -1 : 1, O = (k - ((S = x == null ? void 0 : x.startOffset) != null ? S : 0)) * T, D = Math.max(O / ((b = x == null ? void 0 : x.startSize) != null ? b : 0), -0.999999);
            return x.columnSizingStart.forEach((V) => {
              let [L, P] = V;
              c[L] = Math.round(Math.max(P + P * D, 0) * 100) / 100;
            }), {
              ...x,
              deltaOffset: O,
              deltaPercentage: D
            };
          }), (t.options.columnResizeMode === "onChange" || w === "end") && t.setColumnSizing((x) => ({
            ...x,
            ...c
          })));
        }, g = (w) => d("move", w), f = (w) => {
          d("end", w), t.setColumnSizingInfo((k) => ({
            ...k,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, p = n || typeof document < "u" ? document : null, m = {
          moveHandler: (w) => g(w.clientX),
          upHandler: (w) => {
            p == null || p.removeEventListener("mousemove", m.moveHandler), p == null || p.removeEventListener("mouseup", m.upHandler), f(w.clientX);
          }
        }, h = {
          moveHandler: (w) => (w.cancelable && (w.preventDefault(), w.stopPropagation()), g(w.touches[0].clientX), !1),
          upHandler: (w) => {
            var k;
            p == null || p.removeEventListener("touchmove", h.moveHandler), p == null || p.removeEventListener("touchend", h.upHandler), w.cancelable && (w.preventDefault(), w.stopPropagation()), f((k = w.touches[0]) == null ? void 0 : k.clientX);
          }
        }, v = Xm() ? {
          passive: !1
        } : !1;
        Hr(i) ? (p == null || p.addEventListener("touchmove", h.moveHandler, v), p == null || p.addEventListener("touchend", h.upHandler, v)) : (p == null || p.addEventListener("mousemove", m.moveHandler, v), p == null || p.addEventListener("mouseup", m.upHandler, v)), t.setColumnSizingInfo((w) => ({
          ...w,
          startOffset: u,
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
      e.setColumnSizingInfo(t ? zr() : (n = e.initialState.columnSizingInfo) != null ? n : zr());
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
function Xm() {
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
function Hr(e) {
  return e.type === "touchstart";
}
const Km = {
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
      const o = e.columns;
      return (n = o.length ? o.some((i) => i.getIsVisible()) : (r = t.getState().columnVisibility) == null ? void 0 : r[e.id]) != null ? n : !0;
    }, e.getCanHide = () => {
      var n, r;
      return ((n = e.columnDef.enableHiding) != null ? n : !0) && ((r = t.options.enableHiding) != null ? r : !0);
    }, e.getToggleVisibilityHandler = () => (n) => {
      e.toggleVisibility == null || e.toggleVisibility(n.target.checked);
    };
  },
  createRow: (e, t) => {
    e._getAllVisibleCells = Y(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), J(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = Y(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], J(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => Y(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), J(e.options, "debugColumns", n));
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
};
function yn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Ym = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Jm = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: Be("globalFilter", e),
    globalFilterFn: "auto",
    getColumnCanGlobalFilter: (t) => {
      var n;
      const r = (n = e.getCoreRowModel().flatRows[0]) == null || (n = n._getAllCellsByColumnId()[t.id]) == null ? void 0 : n.getValue();
      return typeof r == "string" || typeof r == "number";
    }
  }),
  createColumn: (e, t) => {
    e.getCanGlobalFilter = () => {
      var n, r, o, i;
      return ((n = e.columnDef.enableGlobalFilter) != null ? n : !0) && ((r = t.options.enableGlobalFilter) != null ? r : !0) && ((o = t.options.enableFilters) != null ? o : !0) && ((i = t.options.getColumnCanGlobalFilter == null ? void 0 : t.options.getColumnCanGlobalFilter(e)) != null ? i : !0) && !!e.accessorFn;
    };
  },
  createTable: (e) => {
    e.getGlobalAutoFilterFn = () => nt.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return wr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : nt[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Zm = {
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
            ...u
          } = s;
          return u;
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
}, ao = 0, lo = 10, Gr = () => ({
  pageIndex: ao,
  pageSize: lo
}), Qm = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Gr(),
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
      const o = (i) => ft(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Gr() : (o = e.initialState.pagination) != null ? o : Gr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = ft(r, o.pageIndex);
        const s = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, s)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? ao : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : ao);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? lo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : lo);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, ft(r, o.pageSize)), s = o.pageSize * o.pageIndex, a = Math.floor(s / i);
        return {
          ...o,
          pageIndex: a,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let s = ft(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof s == "number" && (s = Math.max(-1, s)), {
        ...o,
        pageCount: s
      };
    }), e.getPageOptions = Y(() => [e.getPageCount()], (r) => {
      let o = [];
      return r && r > 0 && (o = [...new Array(r)].fill(null).map((i, s) => s)), o;
    }, J(e.options, "debugTable", "getPageOptions")), e.getCanPreviousPage = () => e.getState().pagination.pageIndex > 0, e.getCanNextPage = () => {
      const {
        pageIndex: r
      } = e.getState().pagination, o = e.getPageCount();
      return o === -1 ? !0 : o === 0 ? !1 : r < o - 1;
    }, e.previousPage = () => e.setPageIndex((r) => r - 1), e.nextPage = () => e.setPageIndex((r) => r + 1), e.firstPage = () => e.setPageIndex(0), e.lastPage = () => e.setPageIndex(e.getPageCount() - 1), e.getPrePaginationRowModel = () => e.getExpandedRowModel(), e.getPaginationRowModel = () => (!e._getPaginationRowModel && e.options.getPaginationRowModel && (e._getPaginationRowModel = e.options.getPaginationRowModel(e)), e.options.manualPagination || !e._getPaginationRowModel ? e.getPrePaginationRowModel() : e._getPaginationRowModel()), e.getPageCount = () => {
      var r;
      return (r = e.options.pageCount) != null ? r : Math.ceil(e.getRowCount() / e.getState().pagination.pageSize);
    }, e.getRowCount = () => {
      var r;
      return (r = e.options.rowCount) != null ? r : e.getPrePaginationRowModel().rows.length;
    };
  }
}, Ur = () => ({
  top: [],
  bottom: []
}), eh = {
  getInitialState: (e) => ({
    rowPinning: Ur(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: Be("rowPinning", e)
  }),
  createRow: (e, t) => {
    e.pin = (n, r, o) => {
      const i = r ? e.getLeafRows().map((u) => {
        let {
          id: c
        } = u;
        return c;
      }) : [], s = o ? e.getParentRows().map((u) => {
        let {
          id: c
        } = u;
        return c;
      }) : [], a = /* @__PURE__ */ new Set([...s, e.id, ...i]);
      t.setRowPinning((u) => {
        var c, d;
        if (n === "bottom") {
          var g, f;
          return {
            top: ((g = u == null ? void 0 : u.top) != null ? g : []).filter((h) => !(a != null && a.has(h))),
            bottom: [...((f = u == null ? void 0 : u.bottom) != null ? f : []).filter((h) => !(a != null && a.has(h))), ...Array.from(a)]
          };
        }
        if (n === "top") {
          var p, m;
          return {
            top: [...((p = u == null ? void 0 : u.top) != null ? p : []).filter((h) => !(a != null && a.has(h))), ...Array.from(a)],
            bottom: ((m = u == null ? void 0 : u.bottom) != null ? m : []).filter((h) => !(a != null && a.has(h)))
          };
        }
        return {
          top: ((c = u == null ? void 0 : u.top) != null ? c : []).filter((h) => !(a != null && a.has(h))),
          bottom: ((d = u == null ? void 0 : u.bottom) != null ? d : []).filter((h) => !(a != null && a.has(h)))
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
    };
  },
  createTable: (e) => {
    e.setRowPinning = (t) => e.options.onRowPinningChange == null ? void 0 : e.options.onRowPinningChange(t), e.resetRowPinning = (t) => {
      var n, r;
      return e.setRowPinning(t ? Ur() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Ur());
    }, e.getIsSomeRowsPinned = (t) => {
      var n;
      const r = e.getState().rowPinning;
      if (!t) {
        var o, i;
        return !!((o = r.top) != null && o.length || (i = r.bottom) != null && i.length);
      }
      return !!((n = r[t]) != null && n.length);
    }, e._getPinnedRows = Y((t) => [e.getRowModel().rows, e.getState().rowPinning[t], t], (t, n, r) => {
      var o;
      return ((o = e.options.keepPinnedRows) == null || o ? (
        //get all rows that are pinned even if they would not be otherwise visible
        //account for expanded parent rows, but not pagination or filtering
        (n ?? []).map((s) => {
          const a = e.getRow(s, !0);
          return a.getIsAllParentsExpanded() ? a : null;
        })
      ) : (
        //else get only visible rows that are pinned
        (n ?? []).map((s) => t.find((a) => a.id === s))
      )).filter(Boolean).map((s) => ({
        ...s,
        position: r
      }));
    }, J(e.options, "debugRows", "_getPinnedRows")), e.getTopRows = () => e._getPinnedRows("top"), e.getBottomRows = () => e._getPinnedRows("bottom"), e.getCenterRows = Y(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, J(e.options, "debugRows", "getCenterRows"));
  }
}, th = {
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
        uo(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = Y(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = Y(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = Y(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getGroupedSelectedRowModel")), e.getIsAllRowsSelected = () => {
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
        return uo(a, e.id, n, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, t), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Go(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return co(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return co(e, n) === "all";
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
}, uo = (e, t, n, r, o) => {
  var i;
  const s = o.getRow(t, !0);
  n ? (s.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), s.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((a) => uo(e, a.id, n, r, o));
};
function qr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(s, a) {
    return s.map((u) => {
      var c;
      const d = Go(u, n);
      if (d && (r.push(u), o[u.id] = u), (c = u.subRows) != null && c.length && (u = {
        ...u,
        subRows: i(u.subRows)
      }), d)
        return u;
    }).filter(Boolean);
  };
  return {
    rows: i(t.rows),
    flatRows: r,
    rowsById: o
  };
}
function Go(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function co(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length))
    return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (Go(s, t) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const a = co(s, t);
      a === "all" ? i = !0 : (a === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const po = /([0-9]+)/gm, nh = (e, t, n) => Ha(gt(e.getValue(n)).toLowerCase(), gt(t.getValue(n)).toLowerCase()), rh = (e, t, n) => Ha(gt(e.getValue(n)), gt(t.getValue(n))), oh = (e, t, n) => Uo(gt(e.getValue(n)).toLowerCase(), gt(t.getValue(n)).toLowerCase()), ih = (e, t, n) => Uo(gt(e.getValue(n)), gt(t.getValue(n))), sh = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, ah = (e, t, n) => Uo(e.getValue(n), t.getValue(n));
function Uo(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function gt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Ha(e, t) {
  const n = e.split(po).filter(Boolean), r = t.split(po).filter(Boolean);
  for (; n.length && r.length; ) {
    const o = n.shift(), i = r.shift(), s = parseInt(o, 10), a = parseInt(i, 10), u = [s, a].sort();
    if (isNaN(u[0])) {
      if (o > i)
        return 1;
      if (i > o)
        return -1;
      continue;
    }
    if (isNaN(u[1]))
      return isNaN(s) ? -1 : 1;
    if (s > a)
      return 1;
    if (a > s)
      return -1;
  }
  return n.length - r.length;
}
const cn = {
  alphanumeric: nh,
  alphanumericCaseSensitive: rh,
  text: oh,
  textCaseSensitive: ih,
  datetime: sh,
  basic: ah
}, lh = {
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
          return cn.datetime;
        if (typeof i == "string" && (r = !0, i.split(po).length > 1))
          return cn.alphanumeric;
      }
      return r ? cn.text : cn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return wr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : cn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((s) => {
        const a = s == null ? void 0 : s.find((p) => p.id === e.id), u = s == null ? void 0 : s.findIndex((p) => p.id === e.id);
        let c = [], d, g = i ? n : o === "desc";
        if (s != null && s.length && e.getCanMultiSort() && r ? a ? d = "toggle" : d = "add" : s != null && s.length && u !== s.length - 1 ? d = "replace" : a ? d = "toggle" : d = "replace", d === "toggle" && (i || o || (d = "remove")), d === "add") {
          var f;
          c = [...s, {
            id: e.id,
            desc: g
          }], c.splice(0, c.length - ((f = t.options.maxMultiSortColCount) != null ? f : Number.MAX_SAFE_INTEGER));
        } else
          d === "toggle" ? c = s.map((p) => p.id === e.id ? {
            ...p,
            desc: g
          } : p) : d === "remove" ? c = s.filter((p) => p.id !== e.id) : c = [{
            id: e.id,
            desc: g
          }];
        return c;
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
}, uh = [
  Nm,
  Km,
  Um,
  qm,
  $m,
  Im,
  Ym,
  //depends on ColumnFaceting
  Jm,
  //depends on ColumnFiltering
  lh,
  Hm,
  //depends on RowSorting
  Zm,
  Qm,
  eh,
  th,
  Wm
];
function ch(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...uh, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((f, p) => Object.assign(f, p.getDefaultOptions == null ? void 0 : p.getDefaultOptions(o)), {}), s = (f) => o.options.mergeOptions ? o.options.mergeOptions(i, f) : {
    ...i,
    ...f
  };
  let u = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((f) => {
    var p;
    u = (p = f.getInitialState == null ? void 0 : f.getInitialState(u)) != null ? p : u;
  });
  const c = [];
  let d = !1;
  const g = {
    _features: r,
    options: {
      ...i,
      ...e
    },
    initialState: u,
    _queue: (f) => {
      c.push(f), d || (d = !0, Promise.resolve().then(() => {
        for (; c.length; )
          c.shift()();
        d = !1;
      }).catch((p) => setTimeout(() => {
        throw p;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (f) => {
      const p = ft(f, o.options);
      o.options = s(p);
    },
    getState: () => o.options.state,
    setState: (f) => {
      o.options.onStateChange == null || o.options.onStateChange(f);
    },
    _getRowId: (f, p, m) => {
      var h;
      return (h = o.options.getRowId == null ? void 0 : o.options.getRowId(f, p, m)) != null ? h : `${m ? [m.id, p].join(".") : p}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (f, p) => {
      let m = (p ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[f];
      if (!m && (m = o.getCoreRowModel().rowsById[f], !m))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${f}`) : new Error();
      return m;
    },
    _getDefaultColumnDef: Y(() => [o.options.defaultColumn], (f) => {
      var p;
      return f = (p = f) != null ? p : {}, {
        header: (m) => {
          const h = m.header.column.columnDef;
          return h.accessorKey ? h.accessorKey : h.accessorFn ? h.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (m) => {
          var h, v;
          return (h = (v = m.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? h : null;
        },
        ...o._features.reduce((m, h) => Object.assign(m, h.getDefaultColumnDef == null ? void 0 : h.getDefaultColumnDef()), {}),
        ...f
      };
    }, J(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: Y(() => [o._getColumnDefs()], (f) => {
      const p = function(m, h, v) {
        return v === void 0 && (v = 0), m.map((w) => {
          const k = _m(o, w, v, h), x = w;
          return k.columns = x.columns ? p(x.columns, k, v + 1) : [], k;
        });
      };
      return p(f);
    }, J(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: Y(() => [o.getAllColumns()], (f) => f.flatMap((p) => p.getFlatColumns()), J(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: Y(() => [o.getAllFlatColumns()], (f) => f.reduce((p, m) => (p[m.id] = m, p), {}), J(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: Y(() => [o.getAllColumns(), o._getOrderColumnsFn()], (f, p) => {
      let m = f.flatMap((h) => h.getLeafColumns());
      return p(m);
    }, J(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (f) => {
      const p = o._getAllFlatColumnsById()[f];
      return process.env.NODE_ENV !== "production" && !p && console.error(`[Table] Column with id '${f}' does not exist.`), p;
    }
  };
  Object.assign(o, g);
  for (let f = 0; f < o._features.length; f++) {
    const p = o._features[f];
    p == null || p.createTable == null || p.createTable(o);
  }
  return o;
}
function dh() {
  return (e) => Y(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const a = [];
      for (let c = 0; c < o.length; c++) {
        const d = zo(e, e._getRowId(o[c], c, s), o[c], c, i, void 0, s == null ? void 0 : s.id);
        if (n.flatRows.push(d), n.rowsById[d.id] = d, a.push(d), e.options.getSubRows) {
          var u;
          d.originalSubRows = e.options.getSubRows(o[c], c), (u = d.originalSubRows) != null && u.length && (d.subRows = r(d.originalSubRows, i + 1, d));
        }
      }
      return a;
    };
    return n.rows = r(t), n;
  }, J(e.options, "debugTable", "getRowModel", () => e._autoResetPageIndex()));
}
function ph(e) {
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
function fh(e, t, n) {
  return n.options.filterFromLeafRows ? gh(e, t, n) : mh(e, t, n);
}
function gh(e, t, n) {
  var r;
  const o = [], i = {}, s = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, a = function(u, c) {
    c === void 0 && (c = 0);
    const d = [];
    for (let f = 0; f < u.length; f++) {
      var g;
      let p = u[f];
      const m = zo(n, p.id, p.original, p.index, p.depth, void 0, p.parentId);
      if (m.columnFilters = p.columnFilters, (g = p.subRows) != null && g.length && c < s) {
        if (m.subRows = a(p.subRows, c + 1), p = m, t(p) && !m.subRows.length) {
          d.push(p), i[p.id] = p, o.push(p);
          continue;
        }
        if (t(p) || m.subRows.length) {
          d.push(p), i[p.id] = p, o.push(p);
          continue;
        }
      } else
        p = m, t(p) && (d.push(p), i[p.id] = p, o.push(p));
    }
    return d;
  };
  return {
    rows: a(e),
    flatRows: o,
    rowsById: i
  };
}
function mh(e, t, n) {
  var r;
  const o = [], i = {}, s = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, a = function(u, c) {
    c === void 0 && (c = 0);
    const d = [];
    for (let f = 0; f < u.length; f++) {
      let p = u[f];
      if (t(p)) {
        var g;
        if ((g = p.subRows) != null && g.length && c < s) {
          const h = zo(n, p.id, p.original, p.index, p.depth, void 0, p.parentId);
          h.subRows = a(p.subRows, c + 1), p = h;
        }
        d.push(p), o.push(p), i[p.id] = p;
      }
    }
    return d;
  };
  return {
    rows: a(e),
    flatRows: o,
    rowsById: i
  };
}
function hh() {
  return (e) => Y(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
    if (!t.rows.length || !(n != null && n.length) && !r) {
      for (let f = 0; f < t.flatRows.length; f++)
        t.flatRows[f].columnFilters = {}, t.flatRows[f].columnFiltersMeta = {};
      return t;
    }
    const o = [], i = [];
    (n ?? []).forEach((f) => {
      var p;
      const m = e.getColumn(f.id);
      if (!m)
        return;
      const h = m.getFilterFn();
      if (!h) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${m.id}.`);
        return;
      }
      o.push({
        id: f.id,
        filterFn: h,
        resolvedValue: (p = h.resolveFilterValue == null ? void 0 : h.resolveFilterValue(f.value)) != null ? p : f.value
      });
    });
    const s = n.map((f) => f.id), a = e.getGlobalFilterFn(), u = e.getAllLeafColumns().filter((f) => f.getCanGlobalFilter());
    r && a && u.length && (s.push("__global__"), u.forEach((f) => {
      var p;
      i.push({
        id: f.id,
        filterFn: a,
        resolvedValue: (p = a.resolveFilterValue == null ? void 0 : a.resolveFilterValue(r)) != null ? p : r
      });
    }));
    let c, d;
    for (let f = 0; f < t.flatRows.length; f++) {
      const p = t.flatRows[f];
      if (p.columnFilters = {}, o.length)
        for (let m = 0; m < o.length; m++) {
          c = o[m];
          const h = c.id;
          p.columnFilters[h] = c.filterFn(p, h, c.resolvedValue, (v) => {
            p.columnFiltersMeta[h] = v;
          });
        }
      if (i.length) {
        for (let m = 0; m < i.length; m++) {
          d = i[m];
          const h = d.id;
          if (d.filterFn(p, h, d.resolvedValue, (v) => {
            p.columnFiltersMeta[h] = v;
          })) {
            p.columnFilters.__global__ = !0;
            break;
          }
        }
        p.columnFilters.__global__ !== !0 && (p.columnFilters.__global__ = !1);
      }
    }
    const g = (f) => {
      for (let p = 0; p < s.length; p++)
        if (f.columnFilters[s[p]] === !1)
          return !1;
      return !0;
    };
    return fh(t.rows, g, e);
  }, J(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function vh(e) {
  return (t) => Y(() => [t.getState().pagination, t.getPrePaginationRowModel(), t.options.paginateExpandedRows ? void 0 : t.getState().expanded], (n, r) => {
    if (!r.rows.length)
      return r;
    const {
      pageSize: o,
      pageIndex: i
    } = n;
    let {
      rows: s,
      flatRows: a,
      rowsById: u
    } = r;
    const c = o * i, d = c + o;
    s = s.slice(c, d);
    let g;
    t.options.paginateExpandedRows ? g = {
      rows: s,
      flatRows: a,
      rowsById: u
    } : g = ph({
      rows: s,
      flatRows: a,
      rowsById: u
    }), g.flatRows = [];
    const f = (p) => {
      g.flatRows.push(p), p.subRows.length && p.subRows.forEach(f);
    };
    return g.rows.forEach(f), g;
  }, J(t.options, "debugTable", "getPaginationRowModel"));
}
function bh() {
  return (e) => Y(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
    if (!n.rows.length || !(t != null && t.length))
      return n;
    const r = e.getState().sorting, o = [], i = r.filter((u) => {
      var c;
      return (c = e.getColumn(u.id)) == null ? void 0 : c.getCanSort();
    }), s = {};
    i.forEach((u) => {
      const c = e.getColumn(u.id);
      c && (s[u.id] = {
        sortUndefined: c.columnDef.sortUndefined,
        invertSorting: c.columnDef.invertSorting,
        sortingFn: c.getSortingFn()
      });
    });
    const a = (u) => {
      const c = u.map((d) => ({
        ...d
      }));
      return c.sort((d, g) => {
        for (let p = 0; p < i.length; p += 1) {
          var f;
          const m = i[p], h = s[m.id], v = h.sortUndefined, w = (f = m == null ? void 0 : m.desc) != null ? f : !1;
          let k = 0;
          if (v) {
            const x = d.getValue(m.id), S = g.getValue(m.id), b = x === void 0, T = S === void 0;
            if (b || T) {
              if (v === "first")
                return b ? -1 : 1;
              if (v === "last")
                return b ? 1 : -1;
              k = b && T ? 0 : b ? v : -v;
            }
          }
          if (k === 0 && (k = h.sortingFn(d, g, m.id)), k !== 0)
            return w && (k *= -1), h.invertSorting && (k *= -1), k;
        }
        return d.index - g.index;
      }), c.forEach((d) => {
        var g;
        o.push(d), (g = d.subRows) != null && g.length && (d.subRows = a(d.subRows));
      }), c;
    };
    return {
      rows: a(n.rows),
      flatRows: o,
      rowsById: n.rowsById
    };
  }, J(e.options, "debugTable", "getSortedRowModel", () => e._autoResetPageIndex()));
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
function ds(e, t) {
  return e ? yh(e) ? /* @__PURE__ */ C.createElement(e, t) : e : null;
}
function yh(e) {
  return wh(e) || typeof e == "function" || xh(e);
}
function wh(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function xh(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function Sh(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = C.useState(() => ({
    current: ch(t)
  })), [r, o] = C.useState(() => n.current.initialState);
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
const Ga = C.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ y(
    "table",
    {
      ref: n,
      className: pe("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Ga.displayName = "Table";
const Ua = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y("thead", { ref: n, className: pe("[&_tr]:pr-border-b", e), ...t }));
Ua.displayName = "TableHeader";
const qa = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y("tbody", { ref: n, className: pe("[&_tr:last-child]:pr-border-0", e), ...t }));
qa.displayName = "TableBody";
const Ch = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "tfoot",
  {
    ref: n,
    className: pe("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Ch.displayName = "TableFooter";
const Kn = C.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y(
    "tr",
    {
      ref: n,
      className: pe(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Kn.displayName = "TableRow";
const Wa = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "th",
  {
    ref: n,
    className: pe(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Wa.displayName = "TableHead";
const fo = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "td",
  {
    ref: n,
    className: pe("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
fo.displayName = "TableCell";
const Eh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "caption",
  {
    ref: n,
    className: pe("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Eh.displayName = "TableCaption";
const Rh = Zl(
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
), rt = C.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ y(r ? Jl : "button", { className: pe(Rh({ variant: t, size: n, className: e })), ref: i, ...o })
);
rt.displayName = "Button";
const Th = ye.Root, Ph = ye.Value, Xa = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ee(
  ye.Trigger,
  {
    ref: r,
    className: pe(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ y(ye.Icon, { asChild: !0, children: /* @__PURE__ */ y(ms, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Xa.displayName = ye.Trigger.displayName;
const Ka = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.ScrollUpButton,
  {
    ref: n,
    className: pe("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ y(Sl, { className: "pr-h-4 pr-w-4" })
  }
));
Ka.displayName = ye.ScrollUpButton.displayName;
const Ya = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.ScrollDownButton,
  {
    ref: n,
    className: pe("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ y(ms, { className: "pr-h-4 pr-w-4" })
  }
));
Ya.displayName = ye.ScrollDownButton.displayName;
const Ja = C.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ y(ye.Portal, { children: /* @__PURE__ */ ee(
  ye.Content,
  {
    ref: o,
    className: pe(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ y(Ka, {}),
      /* @__PURE__ */ y(
        ye.Viewport,
        {
          className: pe(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ y(Ya, {})
    ]
  }
) }));
Ja.displayName = ye.Content.displayName;
const kh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.Label,
  {
    ref: n,
    className: pe("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
kh.displayName = ye.Label.displayName;
const Za = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ee(
  ye.Item,
  {
    ref: r,
    className: pe(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(ye.ItemIndicator, { children: /* @__PURE__ */ y(gs, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ y(ye.ItemText, { children: t })
    ]
  }
));
Za.displayName = ye.Item.displayName;
const Oh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.Separator,
  {
    ref: n,
    className: pe("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Oh.displayName = ye.Separator.displayName;
function _h({ table: e }) {
  return /* @__PURE__ */ ee("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2", children: [
    /* @__PURE__ */ ee("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected."
    ] }),
    /* @__PURE__ */ ee("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
      /* @__PURE__ */ ee("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
        /* @__PURE__ */ y("p", { className: "pr-text-sm pr-font-medium", children: "Rows per page" }),
        /* @__PURE__ */ ee(
          Th,
          {
            value: `${e.getState().pagination.pageSize}`,
            onValueChange: (t) => {
              e.setPageSize(Number(t));
            },
            children: [
              /* @__PURE__ */ y(Xa, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ y(Ph, { placeholder: e.getState().pagination.pageSize }) }),
              /* @__PURE__ */ y(Ja, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ y(Za, { value: `${t}`, children: t }, t)) })
            ]
          }
        )
      ] }),
      /* @__PURE__ */ ee("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
        "Page ",
        e.getState().pagination.pageIndex + 1,
        " of ",
        e.getPageCount()
      ] }),
      /* @__PURE__ */ ee("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
        /* @__PURE__ */ ee(
          rt,
          {
            variant: "outline",
            className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
            onClick: () => e.setPageIndex(0),
            disabled: !e.getCanPreviousPage(),
            children: [
              /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to first page" }),
              /* @__PURE__ */ y(Cl, { className: "pr-h-4 pr-w-4" })
            ]
          }
        ),
        /* @__PURE__ */ ee(
          rt,
          {
            variant: "outline",
            className: "pr-h-8 pr-w-8 pr-p-0",
            onClick: () => e.previousPage(),
            disabled: !e.getCanPreviousPage(),
            children: [
              /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to previous page" }),
              /* @__PURE__ */ y(El, { className: "pr-h-4 pr-w-4" })
            ]
          }
        ),
        /* @__PURE__ */ ee(
          rt,
          {
            variant: "outline",
            className: "pr-h-8 pr-w-8 pr-p-0",
            onClick: () => e.nextPage(),
            disabled: !e.getCanNextPage(),
            children: [
              /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to next page" }),
              /* @__PURE__ */ y(Rl, { className: "pr-h-4 pr-w-4" })
            ]
          }
        ),
        /* @__PURE__ */ ee(
          rt,
          {
            variant: "outline",
            className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
            onClick: () => e.setPageIndex(e.getPageCount() - 1),
            disabled: !e.getCanNextPage(),
            children: [
              /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to last page" }),
              /* @__PURE__ */ y(Tl, { className: "pr-h-4 pr-w-4" })
            ]
          }
        )
      ] })
    ] })
  ] });
}
function Nh({ table: e }) {
  return /* @__PURE__ */ ee(vo, { children: [
    /* @__PURE__ */ y(ml, { asChild: !0, children: /* @__PURE__ */ ee(rt, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ y(Pl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ ee(sr, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ y(ar, { children: "Toggle columns" }),
      /* @__PURE__ */ y(yo, {}),
      e.getAllColumns().filter((t) => typeof t.accessorFn < "u" && t.getCanHide()).map((t) => /* @__PURE__ */ y(
        bo,
        {
          className: "pr-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (n) => t.toggleVisibility(!!n),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
function rv({ columns: e, data: t }) {
  var g, f;
  const [n, r] = Ee([]), [o, i] = Ee([]), [s, a] = Ee({}), [u, c] = Ee({}), d = Sh({
    data: t,
    columns: e,
    getCoreRowModel: dh(),
    getPaginationRowModel: vh(),
    onSortingChange: r,
    getSortedRowModel: bh(),
    onColumnFiltersChange: i,
    getFilteredRowModel: hh(),
    onColumnVisibilityChange: a,
    onRowSelectionChange: c,
    state: {
      sorting: n,
      columnFilters: o,
      columnVisibility: s,
      rowSelection: u
    }
  });
  return /* @__PURE__ */ ee("div", { children: [
    /* @__PURE__ */ y("div", { className: "pr-flex pr-items-center pr-py-4", children: /* @__PURE__ */ y(
      wo,
      {
        placeholder: "Filter emails...",
        value: ((g = d.getColumn("email")) == null ? void 0 : g.getFilterValue()) ?? "",
        onChange: (p) => {
          var m;
          return (m = d.getColumn("email")) == null ? void 0 : m.setFilterValue(p.target.value);
        },
        className: "pr-max-w-sm"
      }
    ) }),
    /* @__PURE__ */ ee(vo, { children: [
      /* @__PURE__ */ y(Ts, { asChild: !0, children: /* @__PURE__ */ y(rt, { variant: "outline", className: "pr-ml-auto", children: "Columns" }) }),
      /* @__PURE__ */ y(sr, { align: "end", children: d.getAllColumns().filter((p) => p.getCanHide()).map((p) => /* @__PURE__ */ y(
        bo,
        {
          className: "pr-capitalize",
          checked: p.getIsVisible(),
          onCheckedChange: (m) => p.toggleVisibility(!!m),
          children: p.id
        },
        p.id
      )) })
    ] }),
    /* @__PURE__ */ y("div", { className: "pr-rounded-md pr-border", children: /* @__PURE__ */ ee(Ga, { children: [
      /* @__PURE__ */ y(Ua, { children: d.getHeaderGroups().map((p) => /* @__PURE__ */ y(Kn, { children: p.headers.map((m) => /* @__PURE__ */ y(Wa, { children: m.isPlaceholder ? (
        // Library component uses null
        // eslint-disable-next-line no-null/no-null
        null
      ) : ds(m.column.columnDef.header, m.getContext()) }, m.id)) }, p.id)) }),
      /* @__PURE__ */ y(qa, { children: (f = d.getRowModel().rows) != null && f.length ? d.getRowModel().rows.map((p) => /* @__PURE__ */ y(Kn, { "data-state": p.getIsSelected() && "selected", children: p.getVisibleCells().map((m) => /* @__PURE__ */ y(fo, { children: ds(m.column.columnDef.cell, m.getContext()) }, m.id)) }, p.id)) : /* @__PURE__ */ y(Kn, { children: /* @__PURE__ */ y(fo, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    /* @__PURE__ */ ee("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ y(
        rt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => d.previousPage(),
          disabled: !d.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ y(
        rt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => d.nextPage(),
          disabled: !d.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    /* @__PURE__ */ y(_h, { table: d }),
    /* @__PURE__ */ y(Nh, { table: d })
  ] });
}
function ov({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = Ct(void 0);
  return /* @__PURE__ */ y("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ y(Hl, { position: "static", id: r, children: /* @__PURE__ */ ee(Gl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ y(
      Rm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ y("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const iv = (e, t) => {
  Rn(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Wr = () => !1, sv = (e, t) => {
  const [n] = so(
    $e(async () => {
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
  Rn(() => () => {
    n !== Wr && n();
  }, [n]);
};
function $h(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
$h(`.papi-switch {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
}
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.pr-m-10 {
    margin: 2.5rem;
}
.pr-m-3 {
    margin: 0.75rem;
}
.pr--mx-1 {
    margin-left: -0.25rem;
    margin-right: -0.25rem;
}
.pr-my-1 {
    margin-top: 0.25rem;
    margin-bottom: 0.25rem;
}
.pr-ml-2 {
    margin-left: 0.5rem;
}
.pr-ml-3 {
    margin-left: 0.75rem;
}
.pr-ml-auto {
    margin-left: auto;
}
.pr-mr-2 {
    margin-right: 0.5rem;
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
.pr-h-24 {
    height: 6rem;
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
.pr-h-\\[400px\\] {
    height: 400px;
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
.pr-w-8 {
    width: 2rem;
}
.pr-w-\\[100px\\] {
    width: 100px;
}
.pr-w-\\[150px\\] {
    width: 150px;
}
.pr-w-\\[70px\\] {
    width: 70px;
}
.pr-w-\\[800px\\] {
    width: 800px;
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
.pr-max-w-sm {
    max-width: 24rem;
}
.pr-flex-1 {
    flex: 1 1 0%;
}
.pr-shrink-0 {
    flex-shrink: 0;
}
.pr-caption-bottom {
    caption-side: bottom;
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
.pr-space-x-6 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(1.5rem * var(--tw-space-x-reverse));
    margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-border-primary {
    border-color: hsl(var(--primary));
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
.pr-py-4 {
    padding-top: 1rem;
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
.pr-text-left {
    text-align: left;
}
.pr-text-center {
    text-align: center;
}
.pr-text-right {
    text-align: right;
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
.pr-capitalize {
    text-transform: capitalize;
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
.pr-text-current {
    color: currentColor;
}
.pr-text-destructive-foreground {
    color: hsl(var(--destructive-foreground));
}
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-muted-foreground {
    color: hsl(var(--muted-foreground));
}
.pr-text-muted-foreground\\/70 {
    color: hsl(var(--muted-foreground) / 0.7);
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
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state=checked] {
    background-color: hsl(var(--primary));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state=open] {
    background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state=selected] {
    background-color: hsl(var(--muted));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
    color: hsl(var(--primary-foreground));
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
@media (min-width: 1024px) {
    .lg\\:pr-flex {
        display: flex;
    }
    .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
        --tw-space-x-reverse: 0;
        margin-right: calc(2rem * var(--tw-space-x-reverse));
        margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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
  Wh as BookChapterControl,
  Nt as Button,
  Xh as ChapterRangeSelector,
  Ru as Checkbox,
  Xr as ComboBox,
  Kh as ContextMenu,
  rv as DataTable,
  $g as GridMenu,
  Rm as HamburgerMenuButton,
  Yh as IconButton,
  Lt as LabelPosition,
  Sa as MenuItem,
  Jh as RefSelector,
  Zh as SearchBar,
  Qh as Slider,
  ev as Snackbar,
  tv as Switch,
  nv as Table,
  or as TextField,
  ov as Toolbar,
  iv as useEvent,
  sv as useEventAsync,
  so as usePromise
};
//# sourceMappingURL=index.js.map
