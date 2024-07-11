import vl, { jsxs as ie, jsx as x, Fragment as sr } from "react/jsx-runtime";
import * as C from "react";
import ve, { forwardRef as cs, useCallback as Te, useState as Ce, useRef as kt, useEffect as ht, useLayoutEffect as ii, useMemo as Jt } from "react";
import { getChaptersForBook as ds, offsetBook as si, FIRST_SCR_BOOK_NUM as bl, offsetChapter as ai, FIRST_SCR_CHAPTER_NUM as wl, offsetVerse as li, FIRST_SCR_VERSE_NUM as yl, compare as Yr, format as Rr } from "platform-bible-utils";
import * as me from "@radix-ui/react-dropdown-menu";
import { ChevronRight as xl, Check as ps, Circle as Sl, History as Cl, ArrowDownWideNarrow as El, Clock as Rl, Bookmark as kl, ChevronDown as fs, ChevronUp as Tl } from "lucide-react";
import Pe, { clsx as Pl } from "clsx";
import { twMerge as Ol } from "tailwind-merge";
import { Slot as Nl } from "@radix-ui/react-slot";
import { cva as gs } from "class-variance-authority";
import { Autocomplete as $l, TextField as _l, FormControlLabel as ui, FormLabel as Ml, Checkbox as Il, MenuItem as Al, ListItemText as Dl, ListItemIcon as ms, Menu as Fl, Grid as hs, List as Vl, IconButton as vs, Drawer as Ll, Slider as Bl, Snackbar as jl, Switch as zl, AppBar as Hl, Toolbar as Gl } from "@mui/material";
import Ul, { ThemeContext as ql, internal_processStyles as Wl } from "@mui/styled-engine";
import * as Xl from "react-dom";
import Vn from "react-dom";
import * as bs from "@radix-ui/react-label";
import * as ye from "@radix-ui/react-select";
import Yl, { SelectColumn as Kl } from "react-data-grid";
import * as De from "@radix-ui/react-tabs";
var Jl = Object.defineProperty, Zl = (e, t, n) => t in e ? Jl(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => (Zl(e, typeof t != "symbol" ? t + "" : t, n), n);
const Pt = [
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
], ho = [
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
], ci = lu();
function Zt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ci ? ci[e] : 0;
}
function vo(e) {
  return Zt(e) > 0;
}
function Ql(e) {
  const t = typeof e == "string" ? Zt(e) : e;
  return t >= 40 && t <= 66;
}
function eu(e) {
  return (typeof e == "string" ? Zt(e) : e) <= 39;
}
function ys(e) {
  return e <= 66;
}
function tu(e) {
  const t = typeof e == "string" ? Zt(e) : e;
  return Cs(t) && !ys(t);
}
function* nu() {
  for (let e = 1; e <= Pt.length; e++)
    yield e;
}
const ru = 1, xs = Pt.length;
function ou() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function bo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Pt.length ? t : Pt[n];
}
function Ss(e) {
  return e <= 0 || e > xs ? "******" : ws[e - 1];
}
function iu(e) {
  return Ss(Zt(e));
}
function Cs(e) {
  const t = typeof e == "number" ? bo(e) : e;
  return vo(t) && !ho.includes(t);
}
function su(e) {
  const t = typeof e == "number" ? bo(e) : e;
  return vo(t) && ho.includes(t);
}
function au(e) {
  return ws[e - 1].includes("*obsolete*");
}
function lu() {
  const e = {};
  for (let t = 0; t < Pt.length; t++)
    e[Pt[t]] = t + 1;
  return e;
}
const ue = {
  allBookIds: Pt,
  nonCanonicalIds: ho,
  bookIdToNumber: Zt,
  isBookIdValid: vo,
  isBookNT: Ql,
  isBookOT: eu,
  isBookOTNT: ys,
  isBookDC: tu,
  allBookNumbers: nu,
  firstBook: ru,
  lastBook: xs,
  extraBooks: ou,
  bookNumberToId: bo,
  bookNumberToEnglishName: Ss,
  bookIdToEnglishName: iu,
  isCanonical: Cs,
  isExtraMaterial: su,
  isObsolete: au
};
var ft = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(ft || {});
const Le = class {
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
oe(Le, "Original", new Le(ft.Original)), oe(Le, "Septuagint", new Le(ft.Septuagint)), oe(Le, "Vulgate", new Le(ft.Vulgate)), oe(Le, "English", new Le(ft.English)), oe(Le, "RussianProtestant", new Le(ft.RussianProtestant)), oe(Le, "RussianOrthodox", new Le(ft.RussianOrthodox));
let Bt = Le;
function di(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Es = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Es || {});
const Me = class le {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Bt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Bt ? n : void 0;
        this.setEmpty(i), this._verseNum = t % le.chapterDigitShifter, this._chapterNum = Math.floor(
          t % le.bookDigitShifter / le.chapterDigitShifter
        ), this._bookNum = Math.floor(t / le.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof le) {
          const i = t;
          this._bookNum = i.bookNum, this._chapterNum = i.chapterNum, this._verseNum = i.verseNum, this._verse = i.verse, this.versification = i.versification;
        } else {
          if (t == null)
            return;
          const i = t instanceof Bt ? t : le.defaultVersification;
          this.setEmpty(i);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? le.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * @deprecated Will be removed in v2. Replace `VerseRef.parse('...')` with `new VerseRef('...')`
   * or refactor to use `VerseRef.tryParse('...')` which has a different return type.
   */
  static parse(t, n = le.defaultVersification) {
    const r = new le(n);
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
      return n = le.parse(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof sn)
        return n = new le(), { success: !1, verseRef: n };
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
    return t % le.bcvMaxValue * le.bookDigitShifter + (n >= 0 ? n % le.bcvMaxValue * le.chapterDigitShifter : 0) + (r >= 0 ? r % le.bcvMaxValue : 0);
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
      if (n = n * 10 + +r - +"0", n > le.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(le.verseRangeSeparator) || this._verse.includes(le.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ue.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = ue.bookIdToNumber(t);
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
    const { success: n, vNum: r } = le.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = le.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > ue.lastBook)
      throw new sn(
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
    this.versification = this.versification != null ? new Bt(t) : void 0;
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
    return this.validateVerse(le.verseRangeSeparators, le.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return le.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return le.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Bt(ft[s]);
        } catch {
          throw new sn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new sn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ue.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(r[1]))
      throw new sn("Invalid reference : " + t);
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
    return new le(this);
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
    return t instanceof le ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && t.versification != null && this.versification != null && t.versification.equals(this.versification) : !1;
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
  allVerses(t = !1, n = le.verseRangeSeparators, r = le.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], i = di(this._verse, r);
    for (const s of i.map((a) => di(a, n))) {
      const a = this.clone();
      a.verse = s[0];
      const u = a.verseNum;
      if (o.push(a), s.length > 1) {
        const c = this.clone();
        if (c.verse = s[1], !t)
          for (let d = u + 1; d < c.verseNum; d++) {
            const g = new le(
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ue.lastBook ? 2 : (ue.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ue.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe(Me, "defaultVersification", Bt.English), oe(Me, "verseRangeSeparator", "-"), oe(Me, "verseSequenceIndicator", ","), oe(Me, "verseRangeSeparators", [Me.verseRangeSeparator]), oe(Me, "verseSequenceIndicators", [Me.verseSequenceIndicator]), oe(Me, "chapterDigitShifter", 1e3), oe(Me, "bookDigitShifter", Me.chapterDigitShifter * Me.chapterDigitShifter), oe(Me, "bcvMaxValue", Me.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Me, "ValidStatusType", Es);
class sn extends Error {
}
function ee(...e) {
  return Ol(Pl(e));
}
const uu = me.Root, cu = me.Trigger, nv = me.Group, rv = me.Portal, ov = me.Sub, iv = me.RadioGroup, du = ve.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ ie(
  me.SubTrigger,
  {
    ref: o,
    className: ee(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ x(xl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
du.displayName = me.SubTrigger.displayName;
const pu = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  me.SubContent,
  {
    ref: n,
    className: ee(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
pu.displayName = me.SubContent.displayName;
const Rs = ve.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ x(me.Portal, { children: /* @__PURE__ */ x(
  me.Content,
  {
    ref: r,
    sideOffset: t,
    className: ee(
      /* pr-font-sans is added to mitigate issue introduced by scopedPreflightStyles */
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-font-sans pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Rs.displayName = me.Content.displayName;
const ks = ve.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ x(
  me.Item,
  {
    ref: r,
    className: ee(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
ks.displayName = me.Item.displayName;
const fu = ve.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ ie(
  me.CheckboxItem,
  {
    ref: o,
    className: ee(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(me.ItemIndicator, { children: /* @__PURE__ */ x(ps, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
fu.displayName = me.CheckboxItem.displayName;
const gu = ve.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ie(
  me.RadioItem,
  {
    ref: r,
    className: ee(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(me.ItemIndicator, { children: /* @__PURE__ */ x(Sl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
gu.displayName = me.RadioItem.displayName;
const wo = ve.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ x(
  me.Label,
  {
    ref: r,
    className: ee("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
wo.displayName = me.Label.displayName;
const Ts = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  me.Separator,
  {
    ref: n,
    className: ee("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ts.displayName = me.Separator.displayName;
function mu({ className: e, ...t }) {
  return /* @__PURE__ */ x(
    "span",
    {
      className: ee("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
mu.displayName = "DropdownMenuShortcut";
const yo = ve.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ x(
    "input",
    {
      type: t,
      className: ee(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
yo.displayName = "Input";
const hu = cs(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ ie("div", { className: "pr-relative", children: [
    /* @__PURE__ */ x(
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
    /* @__PURE__ */ x(
      Cl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function vu({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (a, u) => u + 1), s = Te(
    (a) => {
      o(a);
    },
    [o]
  );
  return /* @__PURE__ */ x("div", { className: ee("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((a) => /* @__PURE__ */ x(
    "div",
    {
      className: ee(
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
const bu = cs(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, a) => /* @__PURE__ */ ie(
    ks,
    {
      ref: a,
      textValue: e,
      className: ee("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ x(
          "span",
          {
            className: ee(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: ue.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ x("div", { children: s })
      ]
    },
    e
  )
);
function wu({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ ie(wo, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ x("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ ie("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ x(
        El,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ x(
        Rl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ x(
        kl,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const vn = ue.allBookIds, yu = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, pi = ["OT", "NT", "DC"], xu = 32 + 32 + 32, Su = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Cu = (e) => ({
  OT: vn.filter((n) => ue.isBookOT(n)),
  NT: vn.filter((n) => ue.isBookNT(n)),
  DC: vn.filter((n) => ue.isBookDC(n))
})[e], an = (e) => ds(ue.bookIdToNumber(e));
function Eu() {
  return vn.map((t) => ue.bookIdToEnglishName(t));
}
function Ru(e) {
  return Eu().includes(e);
}
function ku(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Ru(t))
    return vn.find((r) => ue.bookIdToEnglishName(r) === t);
}
function sv({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Ce(""), [o, i] = Ce(
    ue.bookNumberToId(e.bookNum)
  ), [s, a] = Ce(e.chapterNum ?? 0), [u, c] = Ce(
    ue.bookNumberToId(e.bookNum)
  ), [d, g] = Ce(!1), [p, f] = Ce(d), h = kt(void 0), m = kt(void 0), v = kt(void 0), w = Te(
    (N) => Cu(N).filter((R) => {
      const k = ue.bookIdToEnglishName(R).toLowerCase(), _ = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return k.includes(_) || // Match book name
      R.toLowerCase().includes(_);
    }),
    [n]
  ), P = (N) => {
    r(N);
  }, y = kt(!1), S = Te((N) => {
    if (y.current) {
      y.current = !1;
      return;
    }
    g(N);
  }, []), b = Te(
    (N, R, k, _) => {
      if (a(
        ue.bookNumberToId(e.bookNum) !== N ? 1 : e.chapterNum
      ), R || an(N) === -1) {
        t({
          bookNum: ue.bookIdToNumber(N),
          chapterNum: k || 1,
          verseNum: _ || 1
        }), g(!1), r("");
        return;
      }
      i(o !== N ? N : ""), g(!R);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), E = (N) => {
    N <= 0 || N > an(o) || b(o, !0, N);
  }, $ = Te(() => {
    Su.forEach((N) => {
      const R = n.match(N);
      if (R) {
        const [k, _ = void 0, V = void 0] = R.slice(1), I = ku(k);
        (ue.isBookIdValid(k) || I) && b(
          I ?? k,
          !0,
          _ ? parseInt(_, 10) : 1,
          V ? parseInt(V, 10) : 1
        );
      }
    });
  }, [b, n]), A = Te(
    (N) => {
      d ? (N.key === "ArrowDown" || N.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null && m.current.focus(), N.preventDefault()) : g(!0);
    },
    [d]
  ), D = (N) => {
    const { key: R } = N;
    R === "ArrowRight" || R === "ArrowLeft" || R === "ArrowDown" || R === "ArrowUp" || R === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: R })), h.current.focus());
  }, B = (N) => {
    const { key: R } = N;
    if (u === o) {
      if (R === "Enter") {
        N.preventDefault(), b(o, !0, s);
        return;
      }
      let k = 0;
      if (R === "ArrowRight")
        if (s < an(u))
          k = 1;
        else {
          N.preventDefault();
          return;
        }
      else if (R === "ArrowLeft")
        if (s > 1)
          k = -1;
        else {
          N.preventDefault();
          return;
        }
      else
        R === "ArrowDown" ? k = 6 : R === "ArrowUp" && (k = -6);
      s + k <= 0 || s + k > an(u) ? a(0) : k !== 0 && (a(s + k), N.preventDefault());
    }
  };
  return ht(() => {
    o === u ? o === ue.bookNumberToId(e.bookNum) ? a(e.chapterNum) : a(1) : a(0);
  }, [u, e.bookNum, e.chapterNum, o]), ii(() => {
    f(d);
  }, [d]), ii(() => {
    const N = setTimeout(() => {
      if (p && m.current && v.current) {
        const k = v.current.offsetTop - xu;
        m.current.scrollTo({ top: k, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(N);
    };
  }, [p]), /* @__PURE__ */ x("div", { className: "pr-flex", children: /* @__PURE__ */ ie(uu, { modal: !1, open: d, onOpenChange: S, children: [
    /* @__PURE__ */ x(cu, { asChild: !0, children: /* @__PURE__ */ x(
      hu,
      {
        ref: h,
        value: n,
        handleSearch: P,
        handleKeyDown: A,
        handleOnClick: () => {
          i(ue.bookNumberToId(e.bookNum)), c(ue.bookNumberToId(e.bookNum)), a(e.chapterNum > 0 ? e.chapterNum : 0), g(!0), h.current.focus();
        },
        onFocus: () => {
          y.current = !0;
        },
        handleSubmit: $,
        placeholder: `${ue.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ ie(
      Rs,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: m,
        children: [
          /* @__PURE__ */ x(
            wu,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          pi.map(
            (N, R) => w(N).length > 0 && /* @__PURE__ */ ie("div", { children: [
              /* @__PURE__ */ x(wo, { className: "pr-font-semibold pr-text-slate-700", children: yu[N] }),
              w(N).map((k) => /* @__PURE__ */ x("div", { children: /* @__PURE__ */ x(
                bu,
                {
                  bookId: k,
                  handleSelectBook: () => b(k, !1),
                  isSelected: o === k,
                  handleHighlightBook: () => c(k),
                  handleKeyDown: B,
                  bookType: N,
                  ref: (_) => {
                    o === k && (v.current = _);
                  },
                  children: /* @__PURE__ */ x(
                    vu,
                    {
                      handleSelectChapter: E,
                      endChapter: an(k),
                      activeChapter: e.bookNum === ue.bookIdToNumber(k) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (_) => {
                        a(_);
                      }
                    }
                  )
                }
              ) }, k)),
              pi.length - 1 !== R ? /* @__PURE__ */ x(Ts, {}) : void 0
            ] }, N)
          )
        ]
      }
    )
  ] }) });
}
const Tu = gs(
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
), it = ve.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ x(r ? Nl : "button", { className: ee(Tu({ variant: t, size: n, className: e })), ref: i, ...o })
);
it.displayName = "Button";
function Kr({
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
  onBlur: p,
  getOptionLabel: f
}) {
  return /* @__PURE__ */ x(
    $l,
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
      onBlur: p,
      getOptionLabel: f,
      renderInput: (h) => /* @__PURE__ */ x(
        _l,
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
  const [o, i] = Ce(1), [s, a] = Ce(r), [u, c] = Ce(
    Array.from({ length: r }, (p, f) => f + 1)
  );
  ht(() => {
    i(1), e(1), a(r), t(r), c(Array.from({ length: r }, (p, f) => f + 1));
  }, [r, t, e]);
  const d = (p, f) => {
    i(f), e(f), f > s && (a(f), t(f));
  }, g = (p, f) => {
    a(f), t(f), f < o && (i(f), e(f));
  };
  return /* @__PURE__ */ ie(sr, { children: [
    /* @__PURE__ */ x(
      ui,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ x(
          Kr,
          {
            onChange: (p, f) => d(p, f),
            className: "book-selection-chapter",
            isClearable: !1,
            options: u,
            getOptionLabel: (p) => p.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ x(
      ui,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ x(
          Kr,
          {
            onChange: (p, f) => g(p, f),
            className: "book-selection-chapter",
            isClearable: !1,
            options: u,
            getOptionLabel: (p) => p.toString(),
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
var jt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(jt || {});
function Ps({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = jt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: a = !1,
  className: u,
  onChange: c
}) {
  const d = /* @__PURE__ */ x(
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
    const p = r === jt.Before || r === jt.Above, f = /* @__PURE__ */ x("span", { className: `papi-checkbox-label ${a ? "error" : ""} ${u ?? ""}`, children: n }), h = r === jt.Before || r === jt.After, m = h ? f : /* @__PURE__ */ x("div", { children: f }), v = h ? d : /* @__PURE__ */ x("div", { children: d });
    g = /* @__PURE__ */ ie(
      Ml,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: a,
        children: [
          p && m,
          v,
          !p && m
        ]
      }
    );
  } else
    g = d;
  return g;
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
  return /* @__PURE__ */ ie("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ x("legend", { children: n }),
    r.map((a) => /* @__PURE__ */ x(
      Ps,
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
function ge(e, t) {
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
function Pu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ou(e) {
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
var Jr = { exports: {} }, Ln = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fi;
function Nu() {
  if (fi)
    return ce;
  fi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
  function y(b) {
    if (typeof b == "object" && b !== null) {
      var E = b.$$typeof;
      switch (E) {
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
                case h:
                case f:
                case s:
                  return b;
                default:
                  return E;
              }
          }
        case n:
          return E;
      }
    }
  }
  function S(b) {
    return y(b) === c;
  }
  return ce.AsyncMode = u, ce.ConcurrentMode = c, ce.ContextConsumer = a, ce.ContextProvider = s, ce.Element = t, ce.ForwardRef = d, ce.Fragment = r, ce.Lazy = h, ce.Memo = f, ce.Portal = n, ce.Profiler = i, ce.StrictMode = o, ce.Suspense = g, ce.isAsyncMode = function(b) {
    return S(b) || y(b) === u;
  }, ce.isConcurrentMode = S, ce.isContextConsumer = function(b) {
    return y(b) === a;
  }, ce.isContextProvider = function(b) {
    return y(b) === s;
  }, ce.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, ce.isForwardRef = function(b) {
    return y(b) === d;
  }, ce.isFragment = function(b) {
    return y(b) === r;
  }, ce.isLazy = function(b) {
    return y(b) === h;
  }, ce.isMemo = function(b) {
    return y(b) === f;
  }, ce.isPortal = function(b) {
    return y(b) === n;
  }, ce.isProfiler = function(b) {
    return y(b) === i;
  }, ce.isStrictMode = function(b) {
    return y(b) === o;
  }, ce.isSuspense = function(b) {
    return y(b) === g;
  }, ce.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === c || b === i || b === o || b === g || b === p || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === f || b.$$typeof === s || b.$$typeof === a || b.$$typeof === d || b.$$typeof === v || b.$$typeof === w || b.$$typeof === P || b.$$typeof === m);
  }, ce.typeOf = y, ce;
}
var de = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gi;
function $u() {
  return gi || (gi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, f = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
    function y(F) {
      return typeof F == "string" || typeof F == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      F === r || F === c || F === i || F === o || F === g || F === p || typeof F == "object" && F !== null && (F.$$typeof === h || F.$$typeof === f || F.$$typeof === s || F.$$typeof === a || F.$$typeof === d || F.$$typeof === v || F.$$typeof === w || F.$$typeof === P || F.$$typeof === m);
    }
    function S(F) {
      if (typeof F == "object" && F !== null) {
        var Q = F.$$typeof;
        switch (Q) {
          case t:
            var M = F.type;
            switch (M) {
              case u:
              case c:
              case r:
              case i:
              case o:
              case g:
                return M;
              default:
                var ae = M && M.$$typeof;
                switch (ae) {
                  case a:
                  case d:
                  case h:
                  case f:
                  case s:
                    return ae;
                  default:
                    return Q;
                }
            }
          case n:
            return Q;
        }
      }
    }
    var b = u, E = c, $ = a, A = s, D = t, B = d, N = r, R = h, k = f, _ = n, V = i, I = o, j = g, ne = !1;
    function te(F) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(F) || S(F) === u;
    }
    function O(F) {
      return S(F) === c;
    }
    function L(F) {
      return S(F) === a;
    }
    function H(F) {
      return S(F) === s;
    }
    function X(F) {
      return typeof F == "object" && F !== null && F.$$typeof === t;
    }
    function z(F) {
      return S(F) === d;
    }
    function G(F) {
      return S(F) === r;
    }
    function q(F) {
      return S(F) === h;
    }
    function W(F) {
      return S(F) === f;
    }
    function U(F) {
      return S(F) === n;
    }
    function Y(F) {
      return S(F) === i;
    }
    function Z(F) {
      return S(F) === o;
    }
    function se(F) {
      return S(F) === g;
    }
    de.AsyncMode = b, de.ConcurrentMode = E, de.ContextConsumer = $, de.ContextProvider = A, de.Element = D, de.ForwardRef = B, de.Fragment = N, de.Lazy = R, de.Memo = k, de.Portal = _, de.Profiler = V, de.StrictMode = I, de.Suspense = j, de.isAsyncMode = te, de.isConcurrentMode = O, de.isContextConsumer = L, de.isContextProvider = H, de.isElement = X, de.isForwardRef = z, de.isFragment = G, de.isLazy = q, de.isMemo = W, de.isPortal = U, de.isProfiler = Y, de.isStrictMode = Z, de.isSuspense = se, de.isValidElementType = y, de.typeOf = S;
  }()), de;
}
var mi;
function Os() {
  return mi || (mi = 1, process.env.NODE_ENV === "production" ? Ln.exports = Nu() : Ln.exports = $u()), Ln.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var kr, hi;
function _u() {
  if (hi)
    return kr;
  hi = 1;
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
  return kr = o() ? Object.assign : function(i, s) {
    for (var a, u = r(i), c, d = 1; d < arguments.length; d++) {
      a = Object(arguments[d]);
      for (var g in a)
        t.call(a, g) && (u[g] = a[g]);
      if (e) {
        c = e(a);
        for (var p = 0; p < c.length; p++)
          n.call(a, c[p]) && (u[c[p]] = a[c[p]]);
      }
    }
    return u;
  }, kr;
}
var Tr, vi;
function xo() {
  if (vi)
    return Tr;
  vi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Tr = e, Tr;
}
var Pr, bi;
function Ns() {
  return bi || (bi = 1, Pr = Function.call.bind(Object.prototype.hasOwnProperty)), Pr;
}
var Or, wi;
function Mu() {
  if (wi)
    return Or;
  wi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = xo(), n = {}, r = Ns();
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
              var p = Error(
                (u || "React class") + ": " + a + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            g = i[d](s, d, u, a, null, t);
          } catch (h) {
            g = h;
          }
          if (g && !(g instanceof Error) && e(
            (u || "React class") + ": type specification of " + a + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof g + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), g instanceof Error && !(g.message in n)) {
            n[g.message] = !0;
            var f = c ? c() : "";
            e(
              "Failed " + a + " type: " + g.message + (f ?? "")
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
function Iu() {
  if (yi)
    return Nr;
  yi = 1;
  var e = Os(), t = _u(), n = xo(), r = Ns(), o = Mu(), i = function() {
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
  return Nr = function(a, u) {
    var c = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function g(O) {
      var L = O && (c && O[c] || O[d]);
      if (typeof L == "function")
        return L;
    }
    var p = "<<anonymous>>", f = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: P(),
      arrayOf: y,
      element: S(),
      elementType: b(),
      instanceOf: E,
      node: B(),
      objectOf: A,
      oneOf: $,
      oneOfType: D,
      shape: R,
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
      function X(G, q, W, U, Y, Z, se) {
        if (U = U || p, Z = Z || W, se !== n) {
          if (u) {
            var F = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw F.name = "Invariant Violation", F;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = U + ":" + W;
            !L[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), L[Q] = !0, H++);
          }
        }
        return q[W] == null ? G ? q[W] === null ? new m("The " + Y + " `" + Z + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new m("The " + Y + " `" + Z + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : O(q, W, U, Y, Z);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function w(O) {
      function L(H, X, z, G, q, W) {
        var U = H[X], Y = I(U);
        if (Y !== O) {
          var Z = j(U);
          return new m(
            "Invalid " + G + " `" + q + "` of type " + ("`" + Z + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return v(L);
    }
    function P() {
      return v(s);
    }
    function y(O) {
      function L(H, X, z, G, q) {
        if (typeof O != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var W = H[X];
        if (!Array.isArray(W)) {
          var U = I(W);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an array."));
        }
        for (var Y = 0; Y < W.length; Y++) {
          var Z = O(W, Y, z, G, q + "[" + Y + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return v(L);
    }
    function S() {
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
    function E(O) {
      function L(H, X, z, G, q) {
        if (!(H[X] instanceof O)) {
          var W = O.name || p, U = te(H[X]);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return v(L);
    }
    function $(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function L(H, X, z, G, q) {
        for (var W = H[X], U = 0; U < O.length; U++)
          if (h(W, O[U]))
            return null;
        var Y = JSON.stringify(O, function(se, F) {
          var Q = j(F);
          return Q === "symbol" ? String(F) : F;
        });
        return new m("Invalid " + G + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + z + "`, expected one of " + Y + "."));
      }
      return v(L);
    }
    function A(O) {
      function L(H, X, z, G, q) {
        if (typeof O != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var W = H[X], U = I(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an object."));
        for (var Y in W)
          if (r(W, Y)) {
            var Z = O(W, Y, z, G, q + "." + Y, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return v(L);
    }
    function D(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var L = 0; L < O.length; L++) {
        var H = O[L];
        if (typeof H != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ne(H) + " at index " + L + "."
          ), s;
      }
      function X(z, G, q, W, U) {
        for (var Y = [], Z = 0; Z < O.length; Z++) {
          var se = O[Z], F = se(z, G, q, W, U, n);
          if (F == null)
            return null;
          F.data && r(F.data, "expectedType") && Y.push(F.data.expectedType);
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
    function R(O) {
      function L(H, X, z, G, q) {
        var W = H[X], U = I(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var Y in O) {
          var Z = O[Y];
          if (typeof Z != "function")
            return N(z, G, q, Y, j(Z));
          var se = Z(W, Y, z, G, q + "." + Y, n);
          if (se)
            return se;
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
        for (var Z in Y) {
          var se = O[Z];
          if (r(O, Z) && typeof se != "function")
            return N(z, G, q, Z, j(se));
          if (!se)
            return new m(
              "Invalid " + G + " `" + q + "` key `" + Z + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var F = se(W, Z, z, G, q + "." + Z, n);
          if (F)
            return F;
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
          var L = g(O);
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
    function V(O, L) {
      return O === "symbol" ? !0 : L ? L["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && L instanceof Symbol : !1;
    }
    function I(O) {
      var L = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : V(L, O) ? "symbol" : L;
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
    function ne(O) {
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
    function te(O) {
      return !O.constructor || !O.constructor.name ? p : O.constructor.name;
    }
    return f.checkPropTypes = o, f.resetWarningCache = o.resetWarningCache, f.PropTypes = f, f;
  }, Nr;
}
var $r, xi;
function Au() {
  if (xi)
    return $r;
  xi = 1;
  var e = xo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, $r = function() {
    function r(s, a, u, c, d, g) {
      if (g !== e) {
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
  }, $r;
}
if (process.env.NODE_ENV !== "production") {
  var Du = Os(), Fu = !0;
  Jr.exports = Iu()(Du.isElement, Fu);
} else
  Jr.exports = Au()();
var Vu = Jr.exports;
const l = /* @__PURE__ */ Pu(Vu);
function Qt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Rt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function $s(e) {
  if (!Rt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = $s(e[n]);
  }), t;
}
function st(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? T({}, e) : e;
  return Rt(e) && Rt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Rt(t[o]) && o in e && Rt(e[o]) ? r[o] = st(e[o], t[o], n) : n.clone ? r[o] = Rt(t[o]) ? $s(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Lu(e) {
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
  const u = i.type;
  return typeof u == "function" && !Lu(u) && (a = "Did you accidentally use a plain function component for an element instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ms = Qt(l.element, _s);
Ms.isRequired = Qt(l.element.isRequired, _s);
const Pn = Ms;
function Bu(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ju(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  return typeof i == "function" && !Bu(i) && (a = "Did you accidentally provide a plain function component instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const zu = Qt(l.elementType, ju), Hu = "exact-prop: ​";
function Is(e) {
  return process.env.NODE_ENV === "production" ? e : T({}, e, {
    [Hu]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Ut(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Zr = { exports: {} }, pe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Si;
function Gu() {
  if (Si)
    return pe;
  Si = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function m(v) {
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
                case p:
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
  return pe.ContextConsumer = s, pe.ContextProvider = i, pe.Element = e, pe.ForwardRef = u, pe.Fragment = n, pe.Lazy = p, pe.Memo = g, pe.Portal = t, pe.Profiler = o, pe.StrictMode = r, pe.Suspense = c, pe.SuspenseList = d, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(v) {
    return m(v) === s;
  }, pe.isContextProvider = function(v) {
    return m(v) === i;
  }, pe.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, pe.isForwardRef = function(v) {
    return m(v) === u;
  }, pe.isFragment = function(v) {
    return m(v) === n;
  }, pe.isLazy = function(v) {
    return m(v) === p;
  }, pe.isMemo = function(v) {
    return m(v) === g;
  }, pe.isPortal = function(v) {
    return m(v) === t;
  }, pe.isProfiler = function(v) {
    return m(v) === o;
  }, pe.isStrictMode = function(v) {
    return m(v) === r;
  }, pe.isSuspense = function(v) {
    return m(v) === c;
  }, pe.isSuspenseList = function(v) {
    return m(v) === d;
  }, pe.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === o || v === r || v === c || v === d || v === f || typeof v == "object" && v !== null && (v.$$typeof === p || v.$$typeof === g || v.$$typeof === i || v.$$typeof === s || v.$$typeof === u || v.$$typeof === h || v.getModuleId !== void 0);
  }, pe.typeOf = m, pe;
}
var fe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ci;
function Uu() {
  return Ci || (Ci = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), f = Symbol.for("react.offscreen"), h = !1, m = !1, v = !1, w = !1, P = !1, y;
    y = Symbol.for("react.module.reference");
    function S(M) {
      return !!(typeof M == "string" || typeof M == "function" || M === n || M === o || P || M === r || M === c || M === d || w || M === f || h || m || v || typeof M == "object" && M !== null && (M.$$typeof === p || M.$$typeof === g || M.$$typeof === i || M.$$typeof === s || M.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      M.$$typeof === y || M.getModuleId !== void 0));
    }
    function b(M) {
      if (typeof M == "object" && M !== null) {
        var ae = M.$$typeof;
        switch (ae) {
          case e:
            var Ee = M.type;
            switch (Ee) {
              case n:
              case o:
              case r:
              case c:
              case d:
                return Ee;
              default:
                var $e = Ee && Ee.$$typeof;
                switch ($e) {
                  case a:
                  case s:
                  case u:
                  case p:
                  case g:
                  case i:
                    return $e;
                  default:
                    return ae;
                }
            }
          case t:
            return ae;
        }
      }
    }
    var E = s, $ = i, A = e, D = u, B = n, N = p, R = g, k = t, _ = o, V = r, I = c, j = d, ne = !1, te = !1;
    function O(M) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function L(M) {
      return te || (te = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
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
      return b(M) === u;
    }
    function q(M) {
      return b(M) === n;
    }
    function W(M) {
      return b(M) === p;
    }
    function U(M) {
      return b(M) === g;
    }
    function Y(M) {
      return b(M) === t;
    }
    function Z(M) {
      return b(M) === o;
    }
    function se(M) {
      return b(M) === r;
    }
    function F(M) {
      return b(M) === c;
    }
    function Q(M) {
      return b(M) === d;
    }
    fe.ContextConsumer = E, fe.ContextProvider = $, fe.Element = A, fe.ForwardRef = D, fe.Fragment = B, fe.Lazy = N, fe.Memo = R, fe.Portal = k, fe.Profiler = _, fe.StrictMode = V, fe.Suspense = I, fe.SuspenseList = j, fe.isAsyncMode = O, fe.isConcurrentMode = L, fe.isContextConsumer = H, fe.isContextProvider = X, fe.isElement = z, fe.isForwardRef = G, fe.isFragment = q, fe.isLazy = W, fe.isMemo = U, fe.isPortal = Y, fe.isProfiler = Z, fe.isStrictMode = se, fe.isSuspense = F, fe.isSuspenseList = Q, fe.isValidElementType = S, fe.typeOf = b;
  }()), fe;
}
process.env.NODE_ENV === "production" ? Zr.exports = Gu() : Zr.exports = Uu();
var Jn = Zr.exports;
const qu = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Wu(e) {
  const t = `${e}`.match(qu);
  return t && t[1] || "";
}
function As(e, t = "") {
  return e.displayName || e.name || Wu(e) || t;
}
function Ei(e, t, n) {
  const r = As(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Xu(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return As(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Jn.ForwardRef:
          return Ei(e, e.render, "ForwardRef");
        case Jn.Memo:
          return Ei(e, e.type, "memo");
        default:
          return;
      }
  }
}
function at(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], s = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Yu = l.oneOfType([l.func, l.object]), So = Yu;
function Ze(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ut(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Qr(...e) {
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
function Ku(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const a = o || "<<anonymous>>", u = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`) : null;
  };
}
function Ju(e, t) {
  var n, r;
  return /* @__PURE__ */ C.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Oe(e) {
  return e && e.ownerDocument || document;
}
function qt(e) {
  return Oe(e).defaultView || window;
}
function Zu(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? T({}, t.propTypes) : null;
  return (o) => (i, s, a, u, c, ...d) => {
    const g = c || s, p = n == null ? void 0 : n[g];
    if (p) {
      const f = p(i, s, a, u, c, ...d);
      if (f)
        return f;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${g}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Zn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Qu = typeof window < "u" ? C.useLayoutEffect : C.useEffect, Ot = Qu;
let Ri = 0;
function ec(e) {
  const [t, n] = C.useState(e), r = e || t;
  return C.useEffect(() => {
    t == null && (Ri += 1, n(`mui-${Ri}`));
  }, [t]), r;
}
const ki = C["useId".toString()];
function Fs(e) {
  if (ki !== void 0) {
    const t = ki();
    return e ?? t;
  }
  return ec(e);
}
function tc(e, t, n, r, o) {
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
function Cn(e) {
  const t = C.useRef(e);
  return Ot(() => {
    t.current = e;
  }), C.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function qe(...e) {
  return C.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Zn(n, t);
    });
  }, e);
}
const Ti = {};
function nc(e, t) {
  const n = C.useRef(Ti);
  return n.current === Ti && (n.current = e(t)), n;
}
const rc = [];
function oc(e) {
  C.useEffect(e, rc);
}
class On {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new On();
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
function fn() {
  const e = nc(On.create).current;
  return oc(e.disposeEffect), e;
}
let ar = !0, eo = !1;
const ic = new On(), sc = {
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
function ac(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && sc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function lc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ar = !0);
}
function _r() {
  ar = !1;
}
function uc() {
  this.visibilityState === "hidden" && eo && (ar = !0);
}
function cc(e) {
  e.addEventListener("keydown", lc, !0), e.addEventListener("mousedown", _r, !0), e.addEventListener("pointerdown", _r, !0), e.addEventListener("touchstart", _r, !0), e.addEventListener("visibilitychange", uc, !0);
}
function dc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return ar || ac(t);
}
function Ls() {
  const e = C.useCallback((o) => {
    o != null && cc(o.ownerDocument);
  }, []), t = C.useRef(!1);
  function n() {
    return t.current ? (eo = !0, ic.start(100, () => {
      eo = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return dc(o) ? (t.current = !0, !0) : !1;
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
function pc(e) {
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
function fc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const gc = Number.isInteger || fc;
function js(e, t, n, r) {
  const o = e[t];
  if (o == null || !gc(o)) {
    const i = pc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function zs(e, t, ...n) {
  return e[t] === void 0 ? null : js(e, t, ...n);
}
function to() {
  return null;
}
zs.isRequired = js;
to.isRequired = to;
const Hs = process.env.NODE_ENV === "production" ? to : zs;
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
function ct(e, t, n = void 0) {
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
const Pi = (e) => e, mc = () => {
  let e = Pi;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Pi;
    }
  };
}, hc = mc(), Us = hc, qs = {
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
function et(e, t, n = "Mui") {
  const r = qs[t];
  return r ? `${n}-${r}` : `${Us.generate(e)}-${t}`;
}
function bt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = et(e, o, n);
  }), r;
}
function vc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ws(e) {
  return typeof e == "string";
}
function gn(e, t, n) {
  return e === void 0 || Ws(e) ? t : T({}, t, {
    ownerState: T({}, t.ownerState, n)
  });
}
const bc = {
  disableDefaultClasses: !1
}, wc = /* @__PURE__ */ C.createContext(bc);
function yc(e) {
  const {
    disableDefaultClasses: t
  } = C.useContext(wc);
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
function xc(e, t, n) {
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
function Sc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const f = Pe(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = T({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = T({}, n, o, r);
    return f.length > 0 && (m.className = f), Object.keys(h).length > 0 && (m.style = h), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Xs(T({}, o, r)), a = Oi(r), u = Oi(o), c = t(s), d = Pe(c == null ? void 0 : c.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), g = T({}, c == null ? void 0 : c.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = T({}, c, n, u, a);
  return d.length > 0 && (p.className = d), Object.keys(g).length > 0 && (p.style = g), {
    props: p,
    internalRef: c.ref
  };
}
const Cc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Nt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = ge(e, Cc), a = i ? {} : xc(r, o), {
    props: u,
    internalRef: c
  } = Sc(T({}, s, {
    externalSlotProps: a
  })), d = qe(c, a == null ? void 0 : a.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return gn(n, T({}, u, {
    ref: d
  }), o);
}
const Ys = "base";
function Ec(e) {
  return `${Ys}--${e}`;
}
function Rc(e, t) {
  return `${Ys}-${e}-${t}`;
}
function Ks(e, t) {
  const n = qs[t];
  return n ? Ec(n) : Rc(e, t);
}
function kc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ks(e, r);
  }), n;
}
const Tc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Pc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Oc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Nc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Oc(e));
}
function $c(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Tc)).forEach((r, o) => {
    const i = Pc(r);
    i === -1 || !Nc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function _c() {
  return !0;
}
function Qn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = $c,
    isEnabled: s = _c,
    open: a
  } = e, u = C.useRef(!1), c = C.useRef(null), d = C.useRef(null), g = C.useRef(null), p = C.useRef(null), f = C.useRef(!1), h = C.useRef(null), m = qe(t.ref, h), v = C.useRef(null);
  C.useEffect(() => {
    !a || !h.current || (f.current = !n);
  }, [n, a]), C.useEffect(() => {
    if (!a || !h.current)
      return;
    const y = Oe(h.current);
    return h.current.contains(y.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), f.current && h.current.focus()), () => {
      o || (g.current && g.current.focus && (u.current = !0, g.current.focus()), g.current = null);
    };
  }, [a]), C.useEffect(() => {
    if (!a || !h.current)
      return;
    const y = Oe(h.current), S = ($) => {
      v.current = $, !(r || !s() || $.key !== "Tab") && y.activeElement === h.current && $.shiftKey && (u.current = !0, d.current && d.current.focus());
    }, b = () => {
      const $ = h.current;
      if ($ === null)
        return;
      if (!y.hasFocus() || !s() || u.current) {
        u.current = !1;
        return;
      }
      if ($.contains(y.activeElement) || r && y.activeElement !== c.current && y.activeElement !== d.current)
        return;
      if (y.activeElement !== p.current)
        p.current = null;
      else if (p.current !== null)
        return;
      if (!f.current)
        return;
      let A = [];
      if ((y.activeElement === c.current || y.activeElement === d.current) && (A = i(h.current)), A.length > 0) {
        var D, B;
        const N = !!((D = v.current) != null && D.shiftKey && ((B = v.current) == null ? void 0 : B.key) === "Tab"), R = A[0], k = A[A.length - 1];
        typeof R != "string" && typeof k != "string" && (N ? k.focus() : R.focus());
      } else
        $.focus();
    };
    y.addEventListener("focusin", b), y.addEventListener("keydown", S, !0);
    const E = setInterval(() => {
      y.activeElement && y.activeElement.tagName === "BODY" && b();
    }, 50);
    return () => {
      clearInterval(E), y.removeEventListener("focusin", b), y.removeEventListener("keydown", S, !0);
    };
  }, [n, r, o, s, a, i]);
  const w = (y) => {
    g.current === null && (g.current = y.relatedTarget), f.current = !0, p.current = y.target;
    const S = t.props.onFocus;
    S && S(y);
  }, P = (y) => {
    g.current === null && (g.current = y.relatedTarget), f.current = !0;
  };
  return /* @__PURE__ */ ie(C.Fragment, {
    children: [/* @__PURE__ */ x("div", {
      tabIndex: a ? 0 : -1,
      onFocus: P,
      ref: c,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ C.cloneElement(t, {
      ref: m,
      onFocus: w
    }), /* @__PURE__ */ x("div", {
      tabIndex: a ? 0 : -1,
      onFocus: P,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Qn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Pn,
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
process.env.NODE_ENV !== "production" && (Qn["propTypes"] = Is(Qn.propTypes));
function Mc(e) {
  return typeof e == "function" ? e() : e;
}
const En = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, a] = C.useState(null), u = qe(/* @__PURE__ */ C.isValidElement(r) ? r.ref : null, n);
  if (Ot(() => {
    i || a(Mc(o) || document.body);
  }, [o, i]), Ot(() => {
    if (s && !i)
      return Zn(n, s), () => {
        Zn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ C.isValidElement(r)) {
      const c = {
        ref: u
      };
      return /* @__PURE__ */ C.cloneElement(r, c);
    }
    return /* @__PURE__ */ x(C.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ x(C.Fragment, {
    children: s && /* @__PURE__ */ Xl.createPortal(r, s)
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
  container: l.oneOfType([at, l.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: l.bool
});
process.env.NODE_ENV !== "production" && (En["propTypes"] = Is(En.propTypes));
function Ic(e) {
  const t = Oe(e);
  return t.body === e ? qt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function bn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ni(e) {
  return parseInt(qt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Ac(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function $i(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const a = i.indexOf(s) === -1, u = !Ac(s);
    a && u && bn(s, o);
  });
}
function Mr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Dc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Ic(r)) {
      const s = Bs(Oe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ni(r) + s}px`;
      const a = Oe(r).querySelectorAll(".mui-fixed");
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
      i = Oe(r).body;
    else {
      const s = r.parentElement, a = qt(r);
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
function Fc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Vc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && bn(t.modalRef, !1);
    const o = Fc(n);
    $i(n, t.mount, t.modalRef, o, !0);
    const i = Mr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Mr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Dc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Mr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && bn(t.modalRef, n), $i(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && bn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Lc(e) {
  return typeof e == "function" ? e() : e;
}
function Bc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const jc = new Vc();
function zc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = jc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: a,
    children: u,
    onClose: c,
    open: d,
    rootRef: g
  } = e, p = C.useRef({}), f = C.useRef(null), h = C.useRef(null), m = qe(h, g), [v, w] = C.useState(!d), P = Bc(u);
  let y = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (y = !1);
  const S = () => Oe(f.current), b = () => (p.current.modalRef = h.current, p.current.mount = f.current, p.current), E = () => {
    o.mount(b(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, $ = Cn(() => {
    const I = Lc(t) || S().body;
    o.add(b(), I), h.current && E();
  }), A = C.useCallback(() => o.isTopModal(b()), [o]), D = Cn((I) => {
    f.current = I, I && (d && A() ? E() : h.current && bn(h.current, y));
  }), B = C.useCallback(() => {
    o.remove(b(), y);
  }, [y, o]);
  C.useEffect(() => () => {
    B();
  }, [B]), C.useEffect(() => {
    d ? $() : (!P || !i) && B();
  }, [d, B, P, i, $]);
  const N = (I) => (j) => {
    var ne;
    (ne = I.onKeyDown) == null || ne.call(I, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !A()) && (n || (j.stopPropagation(), c && c(j, "escapeKeyDown")));
  }, R = (I) => (j) => {
    var ne;
    (ne = I.onClick) == null || ne.call(I, j), j.target === j.currentTarget && c && c(j, "backdropClick");
  };
  return {
    getRootProps: (I = {}) => {
      const j = Xs(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const ne = T({}, j, I);
      return T({
        role: "presentation"
      }, ne, {
        onKeyDown: N(ne),
        ref: m
      });
    },
    getBackdropProps: (I = {}) => {
      const j = I;
      return T({
        "aria-hidden": !0
      }, j, {
        onClick: R(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const I = () => {
        w(!1), s && s();
      }, j = () => {
        w(!0), a && a(), i && B();
      };
      return {
        onEnter: Qr(I, u == null ? void 0 : u.props.onEnter),
        onExited: Qr(j, u == null ? void 0 : u.props.onExited)
      };
    },
    rootRef: m,
    portalRef: D,
    isTopModal: A,
    exited: v,
    hasTransition: P
  };
}
var Ie = "top", We = "bottom", Xe = "right", Ae = "left", Co = "auto", Nn = [Ie, We, Xe, Ae], Wt = "start", Rn = "end", Hc = "clippingParents", Js = "viewport", ln = "popper", Gc = "reference", _i = /* @__PURE__ */ Nn.reduce(function(e, t) {
  return e.concat([t + "-" + Wt, t + "-" + Rn]);
}, []), Zs = /* @__PURE__ */ [].concat(Nn, [Co]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Wt, t + "-" + Rn]);
}, []), Uc = "beforeRead", qc = "read", Wc = "afterRead", Xc = "beforeMain", Yc = "main", Kc = "afterMain", Jc = "beforeWrite", Zc = "write", Qc = "afterWrite", ed = [Uc, qc, Wc, Xc, Yc, Kc, Jc, Zc, Qc];
function Qe(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function je(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function $t(e) {
  var t = je(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ue(e) {
  var t = je(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Eo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = je(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function td(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ue(i) || !Qe(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function nd(e) {
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
      !Ue(o) || !Qe(o) || (Object.assign(o.style, a), Object.keys(i).forEach(function(u) {
        o.removeAttribute(u);
      }));
    });
  };
}
const rd = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: td,
  effect: nd,
  requires: ["computeStyles"]
};
function Je(e) {
  return e.split("-")[0];
}
var Tt = Math.max, er = Math.min, Xt = Math.round;
function no() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Qs() {
  return !/^((?!chrome|android).)*safari/i.test(no());
}
function Yt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ue(e) && (o = e.offsetWidth > 0 && Xt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Xt(r.height) / e.offsetHeight || 1);
  var s = $t(e) ? je(e) : window, a = s.visualViewport, u = !Qs() && n, c = (r.left + (u && a ? a.offsetLeft : 0)) / o, d = (r.top + (u && a ? a.offsetTop : 0)) / i, g = r.width / o, p = r.height / i;
  return {
    width: g,
    height: p,
    top: d,
    right: c + g,
    bottom: d + p,
    left: c,
    x: c,
    y: d
  };
}
function Ro(e) {
  var t = Yt(e), n = e.offsetWidth, r = e.offsetHeight;
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
function lt(e) {
  return je(e).getComputedStyle(e);
}
function od(e) {
  return ["table", "td", "th"].indexOf(Qe(e)) >= 0;
}
function wt(e) {
  return (($t(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function lr(e) {
  return Qe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Eo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    wt(e)
  );
}
function Mi(e) {
  return !Ue(e) || // https://github.com/popperjs/popper-core/issues/837
  lt(e).position === "fixed" ? null : e.offsetParent;
}
function id(e) {
  var t = /firefox/i.test(no()), n = /Trident/i.test(no());
  if (n && Ue(e)) {
    var r = lt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = lr(e);
  for (Eo(o) && (o = o.host); Ue(o) && ["html", "body"].indexOf(Qe(o)) < 0; ) {
    var i = lt(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function $n(e) {
  for (var t = je(e), n = Mi(e); n && od(n) && lt(n).position === "static"; )
    n = Mi(n);
  return n && (Qe(n) === "html" || Qe(n) === "body" && lt(n).position === "static") ? t : n || id(e) || t;
}
function ko(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function wn(e, t, n) {
  return Tt(e, er(t, n));
}
function sd(e, t, n) {
  var r = wn(e, t, n);
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
var ad = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, na(typeof t != "number" ? t : ra(t, Nn));
};
function ld(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Je(n.placement), u = ko(a), c = [Ae, Xe].indexOf(a) >= 0, d = c ? "height" : "width";
  if (!(!i || !s)) {
    var g = ad(o.padding, n), p = Ro(i), f = u === "y" ? Ie : Ae, h = u === "y" ? We : Xe, m = n.rects.reference[d] + n.rects.reference[u] - s[u] - n.rects.popper[d], v = s[u] - n.rects.reference[u], w = $n(i), P = w ? u === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, y = m / 2 - v / 2, S = g[f], b = P - p[d] - g[h], E = P / 2 - p[d] / 2 + y, $ = wn(S, E, b), A = u;
    n.modifiersData[r] = (t = {}, t[A] = $, t.centerOffset = $ - E, t);
  }
}
function ud(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ea(t.elements.popper, o) && (t.elements.arrow = o));
}
const cd = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ld,
  effect: ud,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Kt(e) {
  return e.split("-")[1];
}
var dd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function pd(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Xt(n * o) / o || 0,
    y: Xt(r * o) / o || 0
  };
}
function Ii(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, u = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, g = e.isFixed, p = s.x, f = p === void 0 ? 0 : p, h = s.y, m = h === void 0 ? 0 : h, v = typeof d == "function" ? d({
    x: f,
    y: m
  }) : {
    x: f,
    y: m
  };
  f = v.x, m = v.y;
  var w = s.hasOwnProperty("x"), P = s.hasOwnProperty("y"), y = Ae, S = Ie, b = window;
  if (c) {
    var E = $n(n), $ = "clientHeight", A = "clientWidth";
    if (E === je(n) && (E = wt(n), lt(E).position !== "static" && a === "absolute" && ($ = "scrollHeight", A = "scrollWidth")), E = E, o === Ie || (o === Ae || o === Xe) && i === Rn) {
      S = We;
      var D = g && E === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        E[$]
      );
      m -= D - r.height, m *= u ? 1 : -1;
    }
    if (o === Ae || (o === Ie || o === We) && i === Rn) {
      y = Xe;
      var B = g && E === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        E[A]
      );
      f -= B - r.width, f *= u ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: a
  }, c && dd), R = d === !0 ? pd({
    x: f,
    y: m
  }, je(n)) : {
    x: f,
    y: m
  };
  if (f = R.x, m = R.y, u) {
    var k;
    return Object.assign({}, N, (k = {}, k[S] = P ? "0" : "", k[y] = w ? "0" : "", k.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + f + "px, " + m + "px)" : "translate3d(" + f + "px, " + m + "px, 0)", k));
  }
  return Object.assign({}, N, (t = {}, t[S] = P ? m + "px" : "", t[y] = w ? f + "px" : "", t.transform = "", t));
}
function fd(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, u = a === void 0 ? !0 : a, c = {
    placement: Je(t.placement),
    variation: Kt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ii(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ii(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const gd = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: fd,
  data: {}
};
var Bn = {
  passive: !0
};
function md(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, u = je(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && c.forEach(function(d) {
    d.addEventListener("scroll", n.update, Bn);
  }), a && u.addEventListener("resize", n.update, Bn), function() {
    i && c.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Bn);
    }), a && u.removeEventListener("resize", n.update, Bn);
  };
}
const hd = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: md,
  data: {}
};
var vd = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Wn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return vd[t];
  });
}
var bd = {
  start: "end",
  end: "start"
};
function Ai(e) {
  return e.replace(/start|end/g, function(t) {
    return bd[t];
  });
}
function To(e) {
  var t = je(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Po(e) {
  return Yt(wt(e)).left + To(e).scrollLeft;
}
function wd(e, t) {
  var n = je(e), r = wt(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, u = 0;
  if (o) {
    i = o.width, s = o.height;
    var c = Qs();
    (c || !c && t === "fixed") && (a = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + Po(e),
    y: u
  };
}
function yd(e) {
  var t, n = wt(e), r = To(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Tt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Tt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + Po(e), u = -r.scrollTop;
  return lt(o || n).direction === "rtl" && (a += Tt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: u
  };
}
function Oo(e) {
  var t = lt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function oa(e) {
  return ["html", "body", "#document"].indexOf(Qe(e)) >= 0 ? e.ownerDocument.body : Ue(e) && Oo(e) ? e : oa(lr(e));
}
function yn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = oa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = je(r), s = o ? [i].concat(i.visualViewport || [], Oo(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(yn(lr(s)))
  );
}
function ro(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function xd(e, t) {
  var n = Yt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Di(e, t, n) {
  return t === Js ? ro(wd(e, n)) : $t(t) ? xd(t, n) : ro(yd(wt(e)));
}
function Sd(e) {
  var t = yn(lr(e)), n = ["absolute", "fixed"].indexOf(lt(e).position) >= 0, r = n && Ue(e) ? $n(e) : e;
  return $t(r) ? t.filter(function(o) {
    return $t(o) && ea(o, r) && Qe(o) !== "body";
  }) : [];
}
function Cd(e, t, n, r) {
  var o = t === "clippingParents" ? Sd(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(u, c) {
    var d = Di(e, c, r);
    return u.top = Tt(d.top, u.top), u.right = er(d.right, u.right), u.bottom = er(d.bottom, u.bottom), u.left = Tt(d.left, u.left), u;
  }, Di(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function ia(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Je(r) : null, i = r ? Kt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, u;
  switch (o) {
    case Ie:
      u = {
        x: s,
        y: t.y - n.height
      };
      break;
    case We:
      u = {
        x: s,
        y: t.y + t.height
      };
      break;
    case Xe:
      u = {
        x: t.x + t.width,
        y: a
      };
      break;
    case Ae:
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
  var c = o ? ko(o) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (i) {
      case Wt:
        u[c] = u[c] - (t[d] / 2 - n[d] / 2);
        break;
      case Rn:
        u[c] = u[c] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return u;
}
function kn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, u = a === void 0 ? Hc : a, c = n.rootBoundary, d = c === void 0 ? Js : c, g = n.elementContext, p = g === void 0 ? ln : g, f = n.altBoundary, h = f === void 0 ? !1 : f, m = n.padding, v = m === void 0 ? 0 : m, w = na(typeof v != "number" ? v : ra(v, Nn)), P = p === ln ? Gc : ln, y = e.rects.popper, S = e.elements[h ? P : p], b = Cd($t(S) ? S : S.contextElement || wt(e.elements.popper), u, d, s), E = Yt(e.elements.reference), $ = ia({
    reference: E,
    element: y,
    strategy: "absolute",
    placement: o
  }), A = ro(Object.assign({}, y, $)), D = p === ln ? A : E, B = {
    top: b.top - D.top + w.top,
    bottom: D.bottom - b.bottom + w.bottom,
    left: b.left - D.left + w.left,
    right: D.right - b.right + w.right
  }, N = e.modifiersData.offset;
  if (p === ln && N) {
    var R = N[o];
    Object.keys(B).forEach(function(k) {
      var _ = [Xe, We].indexOf(k) >= 0 ? 1 : -1, V = [Ie, We].indexOf(k) >= 0 ? "y" : "x";
      B[k] += R[V] * _;
    });
  }
  return B;
}
function Ed(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, u = n.allowedAutoPlacements, c = u === void 0 ? Zs : u, d = Kt(r), g = d ? a ? _i : _i.filter(function(h) {
    return Kt(h) === d;
  }) : Nn, p = g.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  p.length === 0 && (p = g);
  var f = p.reduce(function(h, m) {
    return h[m] = kn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Je(m)], h;
  }, {});
  return Object.keys(f).sort(function(h, m) {
    return f[h] - f[m];
  });
}
function Rd(e) {
  if (Je(e) === Co)
    return [];
  var t = Wn(e);
  return [Ai(e), t, Ai(t)];
}
function kd(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, u = n.fallbackPlacements, c = n.padding, d = n.boundary, g = n.rootBoundary, p = n.altBoundary, f = n.flipVariations, h = f === void 0 ? !0 : f, m = n.allowedAutoPlacements, v = t.options.placement, w = Je(v), P = w === v, y = u || (P || !h ? [Wn(v)] : Rd(v)), S = [v].concat(y).reduce(function(z, G) {
      return z.concat(Je(G) === Co ? Ed(t, {
        placement: G,
        boundary: d,
        rootBoundary: g,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : G);
    }, []), b = t.rects.reference, E = t.rects.popper, $ = /* @__PURE__ */ new Map(), A = !0, D = S[0], B = 0; B < S.length; B++) {
      var N = S[B], R = Je(N), k = Kt(N) === Wt, _ = [Ie, We].indexOf(R) >= 0, V = _ ? "width" : "height", I = kn(t, {
        placement: N,
        boundary: d,
        rootBoundary: g,
        altBoundary: p,
        padding: c
      }), j = _ ? k ? Xe : Ae : k ? We : Ie;
      b[V] > E[V] && (j = Wn(j));
      var ne = Wn(j), te = [];
      if (i && te.push(I[R] <= 0), a && te.push(I[j] <= 0, I[ne] <= 0), te.every(function(z) {
        return z;
      })) {
        D = N, A = !1;
        break;
      }
      $.set(N, te);
    }
    if (A)
      for (var O = h ? 3 : 1, L = function(G) {
        var q = S.find(function(W) {
          var U = $.get(W);
          if (U)
            return U.slice(0, G).every(function(Y) {
              return Y;
            });
        });
        if (q)
          return D = q, "break";
      }, H = O; H > 0; H--) {
        var X = L(H);
        if (X === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const Td = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: kd,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Fi(e, t, n) {
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
function Vi(e) {
  return [Ie, Xe, We, Ae].some(function(t) {
    return e[t] >= 0;
  });
}
function Pd(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = kn(t, {
    elementContext: "reference"
  }), a = kn(t, {
    altBoundary: !0
  }), u = Fi(s, r), c = Fi(a, o, i), d = Vi(u), g = Vi(c);
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
const Od = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Pd
};
function Nd(e, t, n) {
  var r = Je(e), o = [Ae, Ie].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * o, [Ae, Xe].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function $d(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Zs.reduce(function(d, g) {
    return d[g] = Nd(g, t.rects, i), d;
  }, {}), a = s[t.placement], u = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = s;
}
const _d = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: $d
};
function Md(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ia({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Id = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Md,
  data: {}
};
function Ad(e) {
  return e === "x" ? "y" : "x";
}
function Dd(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, u = n.boundary, c = n.rootBoundary, d = n.altBoundary, g = n.padding, p = n.tether, f = p === void 0 ? !0 : p, h = n.tetherOffset, m = h === void 0 ? 0 : h, v = kn(t, {
    boundary: u,
    rootBoundary: c,
    padding: g,
    altBoundary: d
  }), w = Je(t.placement), P = Kt(t.placement), y = !P, S = ko(w), b = Ad(S), E = t.modifiersData.popperOffsets, $ = t.rects.reference, A = t.rects.popper, D = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, B = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (E) {
    if (i) {
      var k, _ = S === "y" ? Ie : Ae, V = S === "y" ? We : Xe, I = S === "y" ? "height" : "width", j = E[S], ne = j + v[_], te = j - v[V], O = f ? -A[I] / 2 : 0, L = P === Wt ? $[I] : A[I], H = P === Wt ? -A[I] : -$[I], X = t.elements.arrow, z = f && X ? Ro(X) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ta(), q = G[_], W = G[V], U = wn(0, $[I], z[I]), Y = y ? $[I] / 2 - O - U - q - B.mainAxis : L - U - q - B.mainAxis, Z = y ? -$[I] / 2 + O + U + W + B.mainAxis : H + U + W + B.mainAxis, se = t.elements.arrow && $n(t.elements.arrow), F = se ? S === "y" ? se.clientTop || 0 : se.clientLeft || 0 : 0, Q = (k = N == null ? void 0 : N[S]) != null ? k : 0, M = j + Y - Q - F, ae = j + Z - Q, Ee = wn(f ? er(ne, M) : ne, j, f ? Tt(te, ae) : te);
      E[S] = Ee, R[S] = Ee - j;
    }
    if (a) {
      var $e, xe = S === "x" ? Ie : Ae, xt = S === "x" ? We : Xe, _e = E[b], tt = b === "y" ? "height" : "width", Fe = _e + v[xe], nt = _e - v[xt], Re = [Ie, Ae].indexOf(w) !== -1, Mt = ($e = N == null ? void 0 : N[b]) != null ? $e : 0, St = Re ? Fe : _e - $[tt] - A[tt] - Mt + B.altAxis, en = Re ? _e + $[tt] + A[tt] - Mt - B.altAxis : nt, An = f && Re ? sd(St, _e, en) : wn(f ? St : Fe, _e, f ? en : nt);
      E[b] = An, R[b] = An - _e;
    }
    t.modifiersData[r] = R;
  }
}
const Fd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Dd,
  requiresIfExists: ["offset"]
};
function Vd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Ld(e) {
  return e === je(e) || !Ue(e) ? To(e) : Vd(e);
}
function Bd(e) {
  var t = e.getBoundingClientRect(), n = Xt(t.width) / e.offsetWidth || 1, r = Xt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function jd(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ue(t), o = Ue(t) && Bd(t), i = wt(t), s = Yt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Qe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Oo(i)) && (a = Ld(t)), Ue(t) ? (u = Yt(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : i && (u.x = Po(i))), {
    x: s.left + a.scrollLeft - u.x,
    y: s.top + a.scrollTop - u.y,
    width: s.width,
    height: s.height
  };
}
function zd(e) {
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
function Hd(e) {
  var t = zd(e);
  return ed.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Gd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Ud(e) {
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
var Li = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Bi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function qd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Li : o;
  return function(a, u, c) {
    c === void 0 && (c = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Li, i),
      modifiersData: {},
      elements: {
        reference: a,
        popper: u
      },
      attributes: {},
      styles: {}
    }, g = [], p = !1, f = {
      state: d,
      setOptions: function(w) {
        var P = typeof w == "function" ? w(d.options) : w;
        m(), d.options = Object.assign({}, i, d.options, P), d.scrollParents = {
          reference: $t(a) ? yn(a) : a.contextElement ? yn(a.contextElement) : [],
          popper: yn(u)
        };
        var y = Hd(Ud([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = y.filter(function(S) {
          return S.enabled;
        }), h(), f.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var w = d.elements, P = w.reference, y = w.popper;
          if (Bi(P, y)) {
            d.rects = {
              reference: jd(P, $n(y), d.options.strategy === "fixed"),
              popper: Ro(y)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(B) {
              return d.modifiersData[B.name] = Object.assign({}, B.data);
            });
            for (var S = 0; S < d.orderedModifiers.length; S++) {
              if (d.reset === !0) {
                d.reset = !1, S = -1;
                continue;
              }
              var b = d.orderedModifiers[S], E = b.fn, $ = b.options, A = $ === void 0 ? {} : $, D = b.name;
              typeof E == "function" && (d = E({
                state: d,
                options: A,
                name: D,
                instance: f
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Gd(function() {
        return new Promise(function(v) {
          f.forceUpdate(), v(d);
        });
      }),
      destroy: function() {
        m(), p = !0;
      }
    };
    if (!Bi(a, u))
      return f;
    f.setOptions(c).then(function(v) {
      !p && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function h() {
      d.orderedModifiers.forEach(function(v) {
        var w = v.name, P = v.options, y = P === void 0 ? {} : P, S = v.effect;
        if (typeof S == "function") {
          var b = S({
            state: d,
            name: w,
            instance: f,
            options: y
          }), E = function() {
          };
          g.push(b || E);
        }
      });
    }
    function m() {
      g.forEach(function(v) {
        return v();
      }), g = [];
    }
    return f;
  };
}
var Wd = [hd, Id, gd, rd, _d, Td, Fd, cd, Od], Xd = /* @__PURE__ */ qd({
  defaultModifiers: Wd
});
const sa = "Popper";
function Yd(e) {
  return Ks(sa, e);
}
kc(sa, ["root"]);
const Kd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Jd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Zd(e, t) {
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
function tr(e) {
  return typeof e == "function" ? e() : e;
}
function ur(e) {
  return e.nodeType !== void 0;
}
function Qd(e) {
  return !ur(e);
}
const ep = () => ct({
  root: ["root"]
}, yc(Yd)), tp = {}, np = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    popperRef: p,
    slotProps: f = {},
    slots: h = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = ge(t, Kd), w = C.useRef(null), P = qe(w, n), y = C.useRef(null), S = qe(y, p), b = C.useRef(S);
  Ot(() => {
    b.current = S;
  }, [S]), C.useImperativeHandle(p, () => y.current, []);
  const E = Zd(d, s), [$, A] = C.useState(E), [D, B] = C.useState(tr(o));
  C.useEffect(() => {
    y.current && y.current.forceUpdate();
  }), C.useEffect(() => {
    o && B(tr(o));
  }, [o]), Ot(() => {
    if (!D || !c)
      return;
    const V = (ne) => {
      A(ne.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && ur(D) && D.nodeType === 1) {
      const ne = D.getBoundingClientRect();
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
        V(ne);
      }
    }];
    u != null && (I = I.concat(u)), g && g.modifiers != null && (I = I.concat(g.modifiers));
    const j = Xd(D, w.current, T({
      placement: E
    }, g, {
      modifiers: I
    }));
    return b.current(j), () => {
      j.destroy(), b.current(null);
    };
  }, [D, a, u, c, g, E]);
  const N = {
    placement: $
  };
  m !== null && (N.TransitionProps = m);
  const R = ep(), k = (r = h.root) != null ? r : "div", _ = Nt({
    elementType: k,
    externalSlotProps: f.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: P
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ x(k, T({}, _, {
    children: typeof i == "function" ? i(N) : i
  }));
}), aa = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    popperOptions: p = tp,
    popperRef: f,
    style: h,
    transition: m = !1,
    slotProps: v = {},
    slots: w = {}
  } = t, P = ge(t, Jd), [y, S] = C.useState(!0), b = () => {
    S(!1);
  }, E = () => {
    S(!0);
  };
  if (!u && !d && (!m || y))
    return null;
  let $;
  if (i)
    $ = i;
  else if (r) {
    const B = tr(r);
    $ = B && ur(B) ? Oe(B).body : Oe(null).body;
  }
  const A = !d && u && (!m || y) ? "none" : void 0, D = m ? {
    in: d,
    onEnter: b,
    onExited: E
  } : void 0;
  return /* @__PURE__ */ x(En, {
    disablePortal: a,
    container: $,
    children: /* @__PURE__ */ x(np, T({
      anchorEl: r,
      direction: s,
      disablePortal: a,
      modifiers: c,
      ref: n,
      open: m ? !y : d,
      placement: g,
      popperOptions: p,
      popperRef: f,
      slotProps: v,
      slots: w
    }, P, {
      style: T({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: A
      }, h),
      TransitionProps: D,
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
  anchorEl: Qt(l.oneOfType([at, l.object, l.func]), (e) => {
    if (e.open) {
      const t = tr(e.anchorEl);
      if (t && ur(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Qd(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: l.oneOfType([at, l.func]),
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
const rp = ["values", "unit", "step"], op = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => T({}, n, {
    [r.key]: r.val
  }), {});
};
function ip(e) {
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
  } = e, o = ge(e, rp), i = op(t), s = Object.keys(i);
  function a(p) {
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n})`;
  }
  function u(p) {
    return `@media (max-width:${(typeof t[p] == "number" ? t[p] : p) - r / 100}${n})`;
  }
  function c(p, f) {
    const h = s.indexOf(f);
    return `@media (min-width:${typeof t[p] == "number" ? t[p] : p}${n}) and (max-width:${(h !== -1 && typeof t[s[h]] == "number" ? t[s[h]] : f) - r / 100}${n})`;
  }
  function d(p) {
    return s.indexOf(p) + 1 < s.length ? c(p, s[s.indexOf(p) + 1]) : a(p);
  }
  function g(p) {
    const f = s.indexOf(p);
    return f === 0 ? a(s[1]) : f === s.length - 1 ? u(s[f]) : c(p, s[s.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return T({
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
const sp = {
  borderRadius: 4
}, ap = sp, lp = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.string, l.object, l.array]) : {}, yt = lp;
function xn(e, t) {
  return t ? st(e, t, {
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
}, ji = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${No[e]}px)`
};
function ut(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || ji;
    return t.reduce((s, a, u) => (s[i.up(i.keys[u])] = n(t[u]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || ji;
    return Object.keys(t).reduce((s, a) => {
      if (Object.keys(i.values || No).indexOf(a) !== -1) {
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
function up(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function cp(e, t) {
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
function nr(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = cr(e, n) || r, t && (o = t(o, r, e)), o;
}
function Se(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (s) => {
    if (s[t] == null)
      return null;
    const a = s[t], u = s.theme, c = cr(u, r) || {};
    return ut(s, a, (g) => {
      let p = nr(c, o, g);
      return g === p && typeof g == "string" && (p = nr(c, o, `${t}${g === "default" ? "" : Ze(g)}`, g)), n === !1 ? p : {
        [n]: p
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: yt
  } : {}, i.filterProps = [t], i;
}
function dp(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const pp = {
  m: "margin",
  p: "padding"
}, fp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, zi = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, gp = dp((e) => {
  if (e.length > 2)
    if (zi[e])
      e = zi[e];
    else
      return [e];
  const [t, n] = e.split(""), r = pp[t], o = fp[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), dr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], pr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], mp = [...dr, ...pr];
function _n(e, t, n, r) {
  var o;
  const i = (o = cr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function la(e) {
  return _n(e, "spacing", 8, "spacing");
}
function Mn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function hp(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Mn(t, n), r), {});
}
function vp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = gp(n), i = hp(o, r), s = e[n];
  return ut(e, s, i);
}
function ua(e, t) {
  const n = la(e.theme);
  return Object.keys(e).map((r) => vp(e, t, r, n)).reduce(xn, {});
}
function be(e) {
  return ua(e, dr);
}
be.propTypes = process.env.NODE_ENV !== "production" ? dr.reduce((e, t) => (e[t] = yt, e), {}) : {};
be.filterProps = dr;
function we(e) {
  return ua(e, pr);
}
we.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, t) => (e[t] = yt, e), {}) : {};
we.filterProps = pr;
process.env.NODE_ENV !== "production" && mp.reduce((e, t) => (e[t] = yt, e), {});
function bp(e = 8) {
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
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? xn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ge(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ye(e, t) {
  return Se({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const wp = Ye("border", Ge), yp = Ye("borderTop", Ge), xp = Ye("borderRight", Ge), Sp = Ye("borderBottom", Ge), Cp = Ye("borderLeft", Ge), Ep = Ye("borderColor"), Rp = Ye("borderTopColor"), kp = Ye("borderRightColor"), Tp = Ye("borderBottomColor"), Pp = Ye("borderLeftColor"), Op = Ye("outline", Ge), Np = Ye("outlineColor"), gr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = _n(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Mn(t, r)
    });
    return ut(e, e.borderRadius, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: yt
} : {};
gr.filterProps = ["borderRadius"];
fr(wp, yp, xp, Sp, Cp, Ep, Rp, kp, Tp, Pp, gr, Op, Np);
const mr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = _n(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Mn(t, r)
    });
    return ut(e, e.gap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: yt
} : {};
mr.filterProps = ["gap"];
const hr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = _n(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Mn(t, r)
    });
    return ut(e, e.columnGap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: yt
} : {};
hr.filterProps = ["columnGap"];
const vr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = _n(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Mn(t, r)
    });
    return ut(e, e.rowGap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: yt
} : {};
vr.filterProps = ["rowGap"];
const $p = Se({
  prop: "gridColumn"
}), _p = Se({
  prop: "gridRow"
}), Mp = Se({
  prop: "gridAutoFlow"
}), Ip = Se({
  prop: "gridAutoColumns"
}), Ap = Se({
  prop: "gridAutoRows"
}), Dp = Se({
  prop: "gridTemplateColumns"
}), Fp = Se({
  prop: "gridTemplateRows"
}), Vp = Se({
  prop: "gridTemplateAreas"
}), Lp = Se({
  prop: "gridArea"
});
fr(mr, hr, vr, $p, _p, Mp, Ip, Ap, Dp, Fp, Vp, Lp);
function Gt(e, t) {
  return t === "grey" ? t : e;
}
const Bp = Se({
  prop: "color",
  themeKey: "palette",
  transform: Gt
}), jp = Se({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Gt
}), zp = Se({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Gt
});
fr(Bp, jp, zp);
function Be(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Hp = Se({
  prop: "width",
  transform: Be
}), $o = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || No[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Be(n)
      };
    };
    return ut(e, e.maxWidth, t);
  }
  return null;
};
$o.filterProps = ["maxWidth"];
const Gp = Se({
  prop: "minWidth",
  transform: Be
}), Up = Se({
  prop: "height",
  transform: Be
}), qp = Se({
  prop: "maxHeight",
  transform: Be
}), Wp = Se({
  prop: "minHeight",
  transform: Be
});
Se({
  prop: "size",
  cssProperty: "width",
  transform: Be
});
Se({
  prop: "size",
  cssProperty: "height",
  transform: Be
});
const Xp = Se({
  prop: "boxSizing"
});
fr(Hp, $o, Gp, Up, qp, Wp, Xp);
const Yp = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ge
  },
  borderTop: {
    themeKey: "borders",
    transform: Ge
  },
  borderRight: {
    themeKey: "borders",
    transform: Ge
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ge
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ge
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
    transform: Ge
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
    transform: Gt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Gt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Gt
  },
  // spacing
  p: {
    style: we
  },
  pt: {
    style: we
  },
  pr: {
    style: we
  },
  pb: {
    style: we
  },
  pl: {
    style: we
  },
  px: {
    style: we
  },
  py: {
    style: we
  },
  padding: {
    style: we
  },
  paddingTop: {
    style: we
  },
  paddingRight: {
    style: we
  },
  paddingBottom: {
    style: we
  },
  paddingLeft: {
    style: we
  },
  paddingX: {
    style: we
  },
  paddingY: {
    style: we
  },
  paddingInline: {
    style: we
  },
  paddingInlineStart: {
    style: we
  },
  paddingInlineEnd: {
    style: we
  },
  paddingBlock: {
    style: we
  },
  paddingBlockStart: {
    style: we
  },
  paddingBlockEnd: {
    style: we
  },
  m: {
    style: be
  },
  mt: {
    style: be
  },
  mr: {
    style: be
  },
  mb: {
    style: be
  },
  ml: {
    style: be
  },
  mx: {
    style: be
  },
  my: {
    style: be
  },
  margin: {
    style: be
  },
  marginTop: {
    style: be
  },
  marginRight: {
    style: be
  },
  marginBottom: {
    style: be
  },
  marginLeft: {
    style: be
  },
  marginX: {
    style: be
  },
  marginY: {
    style: be
  },
  marginInline: {
    style: be
  },
  marginInlineStart: {
    style: be
  },
  marginInlineEnd: {
    style: be
  },
  marginBlock: {
    style: be
  },
  marginBlockStart: {
    style: be
  },
  marginBlockEnd: {
    style: be
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
    transform: Be
  },
  maxWidth: {
    style: $o
  },
  minWidth: {
    transform: Be
  },
  height: {
    transform: Be
  },
  maxHeight: {
    transform: Be
  },
  minHeight: {
    transform: Be
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
}, _o = Yp;
function Kp(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Jp(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Zp() {
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
    const p = cr(o, c) || {};
    return g ? g(s) : ut(s, r, (h) => {
      let m = nr(p, d, h);
      return h === m && typeof h == "string" && (m = nr(p, d, `${n}${h === "default" ? "" : Ze(h)}`, h)), u === !1 ? m : {
        [u]: m
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
    const s = (r = i.unstable_sxConfig) != null ? r : _o;
    function a(u) {
      let c = u;
      if (typeof u == "function")
        c = u(i);
      else if (typeof u != "object")
        return u;
      if (!c)
        return null;
      const d = up(i.breakpoints), g = Object.keys(d);
      let p = d;
      return Object.keys(c).forEach((f) => {
        const h = Jp(c[f], i);
        if (h != null)
          if (typeof h == "object")
            if (s[f])
              p = xn(p, e(f, h, i, s));
            else {
              const m = ut({
                theme: i
              }, h, (v) => ({
                [f]: v
              }));
              Kp(m, h) ? p[f] = t({
                sx: h,
                theme: i
              }) : p = xn(p, m);
            }
          else
            p = xn(p, e(f, h, i, s));
      }), cp(g, p);
    }
    return Array.isArray(o) ? o.map(a) : a(o);
  }
  return t;
}
const ca = Zp();
ca.filterProps = ["sx"];
const Mo = ca;
function Qp(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const ef = ["breakpoints", "palette", "spacing", "shape"];
function Io(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = ge(e, ef), a = ip(n), u = bp(o);
  let c = st({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: T({
      mode: "light"
    }, r),
    spacing: u,
    shape: T({}, ap, i)
  }, s);
  return c.applyStyles = Qp, c = t.reduce((d, g) => st(d, g), c), c.unstable_sxConfig = T({}, _o, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return Mo({
      sx: g,
      theme: this
    });
  }, c;
}
function tf(e) {
  return Object.keys(e).length === 0;
}
function da(e = null) {
  const t = C.useContext(ql);
  return !t || tf(t) ? e : t;
}
const nf = Io();
function pa(e = nf) {
  return da(e);
}
const rf = ["ownerState"], of = ["variants"], sf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function af(e) {
  return Object.keys(e).length === 0;
}
function lf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Xn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const uf = Io(), Hi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function jn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return af(t) ? e : t[n] || t;
}
function cf(e) {
  return e ? (t, n) => n[e] : null;
}
function Yn(e, t) {
  let {
    ownerState: n
  } = t, r = ge(t, rf);
  const o = typeof e == "function" ? e(T({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Yn(i, T({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let a = ge(o, of);
    return i.forEach((u) => {
      let c = !0;
      typeof u.props == "function" ? c = u.props(T({
        ownerState: n
      }, r, n)) : Object.keys(u.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== u.props[d] && r[d] !== u.props[d] && (c = !1);
      }), c && (Array.isArray(a) || (a = [a]), a.push(typeof u.style == "function" ? u.style(T({
        ownerState: n
      }, r, n)) : u.style));
    }), a;
  }
  return o;
}
function df(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = uf,
    rootShouldForwardProp: r = Xn,
    slotShouldForwardProp: o = Xn
  } = e, i = (s) => Mo(T({}, s, {
    theme: jn(T({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, a = {}) => {
    Wl(s, (b) => b.filter((E) => !(E != null && E.__mui_systemSx)));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: d,
      skipSx: g,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = cf(Hi(c))
    } = a, f = ge(a, sf), h = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), m = g || !1;
    let v;
    process.env.NODE_ENV !== "production" && u && (v = `${u}-${Hi(c || "Root")}`);
    let w = Xn;
    c === "Root" || c === "root" ? w = r : c ? w = o : lf(s) && (w = void 0);
    const P = Ul(s, T({
      shouldForwardProp: w,
      label: v
    }, f)), y = (b) => typeof b == "function" && b.__emotion_real !== b || Rt(b) ? (E) => Yn(b, T({}, E, {
      theme: jn({
        theme: E.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : b, S = (b, ...E) => {
      let $ = y(b);
      const A = E ? E.map(y) : [];
      u && p && A.push((N) => {
        const R = jn(T({}, N, {
          defaultTheme: n,
          themeId: t
        }));
        if (!R.components || !R.components[u] || !R.components[u].styleOverrides)
          return null;
        const k = R.components[u].styleOverrides, _ = {};
        return Object.entries(k).forEach(([V, I]) => {
          _[V] = Yn(I, T({}, N, {
            theme: R
          }));
        }), p(N, _);
      }), u && !h && A.push((N) => {
        var R;
        const k = jn(T({}, N, {
          defaultTheme: n,
          themeId: t
        })), _ = k == null || (R = k.components) == null || (R = R[u]) == null ? void 0 : R.variants;
        return Yn({
          variants: _
        }, T({}, N, {
          theme: k
        }));
      }), m || A.push(i);
      const D = A.length - E.length;
      if (Array.isArray(b) && D > 0) {
        const N = new Array(D).fill("");
        $ = [...b, ...N], $.raw = [...b.raw, ...N];
      }
      const B = P($, ...A);
      if (process.env.NODE_ENV !== "production") {
        let N;
        u && (N = `${u}${Ze(c || "")}`), N === void 0 && (N = `Styled(${Xu(s)})`), B.displayName = N;
      }
      return s.muiName && (B.muiName = s.muiName), B;
    };
    return P.withConfig && (S.withConfig = P.withConfig), S;
  };
}
function pf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Gs(t.components[n].defaultProps, r);
}
function ff({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = pa(n);
  return r && (o = o[r] || o), pf({
    theme: o,
    name: t,
    props: e
  });
}
function Ao(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), vc(e, t, n);
}
function gf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function _t(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return _t(gf(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ut(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ut(10, o));
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
function mf(e) {
  e = _t(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (c, d = (c + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let a = "rgb";
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", u.push(t[3])), br({
    type: a,
    values: u
  });
}
function Gi(e) {
  e = _t(e);
  let t = e.type === "hsl" || e.type === "hsla" ? _t(mf(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ui(e, t) {
  const n = Gi(e), r = Gi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function rr(e, t) {
  return e = _t(e), t = Ao(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, br(e);
}
function hf(e, t) {
  if (e = _t(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return br(e);
}
function vf(e, t) {
  if (e = _t(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return br(e);
}
function bf(e, t) {
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
const wf = {
  black: "#000",
  white: "#fff"
}, Tn = wf, yf = {
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
}, xf = yf, Sf = {
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
}, It = Sf, Cf = {
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
}, At = Cf, Ef = {
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
}, un = Ef, Rf = {
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
}, Dt = Rf, kf = {
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
}, Ft = kf, Tf = {
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
}, Vt = Tf, Pf = ["mode", "contrastThreshold", "tonalOffset"], qi = {
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
    paper: Tn.white,
    default: Tn.white
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
}, Ir = {
  text: {
    primary: Tn.white,
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
    active: Tn.white,
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
function Wi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = vf(e.main, o) : t === "dark" && (e.dark = hf(e.main, i)));
}
function Of(e = "light") {
  return e === "dark" ? {
    main: Dt[200],
    light: Dt[50],
    dark: Dt[400]
  } : {
    main: Dt[700],
    light: Dt[400],
    dark: Dt[800]
  };
}
function Nf(e = "light") {
  return e === "dark" ? {
    main: It[200],
    light: It[50],
    dark: It[400]
  } : {
    main: It[500],
    light: It[300],
    dark: It[700]
  };
}
function $f(e = "light") {
  return e === "dark" ? {
    main: At[500],
    light: At[300],
    dark: At[700]
  } : {
    main: At[700],
    light: At[400],
    dark: At[800]
  };
}
function _f(e = "light") {
  return e === "dark" ? {
    main: Ft[400],
    light: Ft[300],
    dark: Ft[700]
  } : {
    main: Ft[700],
    light: Ft[500],
    dark: Ft[900]
  };
}
function Mf(e = "light") {
  return e === "dark" ? {
    main: Vt[400],
    light: Vt[300],
    dark: Vt[700]
  } : {
    main: Vt[800],
    light: Vt[500],
    dark: Vt[900]
  };
}
function If(e = "light") {
  return e === "dark" ? {
    main: un[400],
    light: un[300],
    dark: un[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: un[500],
    dark: un[900]
  };
}
function Af(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ge(e, Pf), i = e.primary || Of(t), s = e.secondary || Nf(t), a = e.error || $f(t), u = e.info || _f(t), c = e.success || Mf(t), d = e.warning || If(t);
  function g(m) {
    const v = Ui(m, Ir.text.primary) >= n ? Ir.text.primary : qi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = Ui(m, v);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${v} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const p = ({
    color: m,
    name: v,
    mainShade: w = 500,
    lightShade: P = 300,
    darkShade: y = 700
  }) => {
    if (m = T({}, m), !m.main && m[w] && (m.main = m[w]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : Ut(11, v ? ` (${v})` : "", w));
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
} });` : Ut(12, v ? ` (${v})` : "", JSON.stringify(m.main)));
    return Wi(m, "light", P, r), Wi(m, "dark", y, r), m.contrastText || (m.contrastText = g(m.main)), m;
  }, f = {
    dark: Ir,
    light: qi
  };
  return process.env.NODE_ENV !== "production" && (f[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), st(T({
    // A collection of common colors.
    common: T({}, Tn),
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
      color: a,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: u,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: c,
      name: "success"
    }),
    // The grey colors.
    grey: xf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: g,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, f[t]), o);
}
const Df = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Ff(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Xi = {
  textTransform: "uppercase"
}, Yi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Vf(e, t) {
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
  } = n, p = ge(n, Df);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof c != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const f = o / 14, h = g || ((w) => `${w / c * f}rem`), m = (w, P, y, S, b) => T({
    fontFamily: r,
    fontWeight: w,
    fontSize: h(P),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: y
  }, r === Yi ? {
    letterSpacing: `${Ff(S / P)}em`
  } : {}, b, d), v = {
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
    button: m(a, 14, 1.75, 0.4, Xi),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Xi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return st(T({
    htmlFontSize: c,
    pxToRem: h,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: a,
    fontWeightBold: u
  }, v), p, {
    clone: !1
    // No need to clone deep
  });
}
const Lf = 0.2, Bf = 0.14, jf = 0.12;
function he(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Lf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Bf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${jf})`].join(",");
}
const zf = ["none", he(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), he(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), he(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), he(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), he(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), he(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), he(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), he(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), he(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), he(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), he(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), he(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), he(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), he(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), he(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), he(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), he(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), he(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), he(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), he(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), he(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), he(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), he(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), he(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Hf = zf, Gf = ["duration", "easing", "delay"], Uf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, qf = {
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
function Ki(e) {
  return `${Math.round(e)}ms`;
}
function Wf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Xf(e) {
  const t = T({}, Uf, e.easing), n = T({}, qf, e.duration);
  return T({
    getAutoHeightDuration: Wf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: u = 0
      } = i, c = ge(i, Gf);
      if (process.env.NODE_ENV !== "production") {
        const d = (p) => typeof p == "string", g = (p) => !isNaN(parseFloat(p));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !g(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(a) || console.error('MUI: Argument "easing" must be a string.'), !g(u) && !d(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : Ki(s)} ${a} ${typeof u == "string" ? u : Ki(u)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Yf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Kf = Yf, Jf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Zf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = ge(e, Jf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ut(18));
  const a = Af(r), u = Io(e);
  let c = st(u, {
    mixins: bf(u.breakpoints, n),
    palette: a,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Hf.slice(),
    typography: Vf(a, i),
    transitions: Xf(o),
    zIndex: T({}, Kf)
  });
  if (c = st(c, s), c = t.reduce((d, g) => st(d, g), c), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], g = (p, f) => {
      let h;
      for (h in p) {
        const m = p[h];
        if (d.indexOf(h) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = et("", h);
            console.error([`MUI: The \`${f}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[h] = {};
        }
      }
    };
    Object.keys(c.components).forEach((p) => {
      const f = c.components[p].styleOverrides;
      f && p.indexOf("Mui") === 0 && g(f, p);
    });
  }
  return c.unstable_sxConfig = T({}, _o, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return Mo({
      sx: g,
      theme: this
    });
  }, c;
}
const Qf = Zf(), Do = Qf, Fo = "$$material", fa = (e) => Xn(e) && e !== "classes", eg = df({
  themeId: Fo,
  defaultTheme: Do,
  rootShouldForwardProp: fa
}), Ne = eg;
function In() {
  const e = pa(Do);
  return process.env.NODE_ENV !== "production" && C.useDebugValue(e), e[Fo] || e;
}
function dt({
  props: e,
  name: t
}) {
  return ff({
    props: e,
    name: t,
    defaultTheme: Do,
    themeId: Fo
  });
}
function oo(e, t) {
  return oo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, oo(e, t);
}
function tg(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, oo(e, t);
}
const Ji = {
  disabled: !1
};
var ng = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.shape({
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
const ga = ve.createContext(null);
var rg = function(t) {
  return t.scrollTop;
}, mn = "unmounted", Ct = "exited", Et = "entering", zt = "entered", io = "exiting", pt = /* @__PURE__ */ function(e) {
  tg(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, a = s && !s.isMounting ? r.enter : r.appear, u;
    return i.appearStatus = null, r.in ? a ? (u = Ct, i.appearStatus = Et) : u = zt : r.unmountOnExit || r.mountOnEnter ? u = mn : u = Ct, i.state = {
      status: u
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === mn ? {
      status: Ct
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== Et && s !== zt && (i = Et) : (s === Et || s === zt) && (i = io);
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
      if (this.cancelNextCallback(), i === Et) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Vn.findDOMNode(this);
          s && rg(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ct && this.setState({
        status: mn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, a = this.context ? this.context.isMounting : o, u = this.props.nodeRef ? [a] : [Vn.findDOMNode(this), a], c = u[0], d = u[1], g = this.getTimeouts(), p = a ? g.appear : g.enter;
    if (!o && !s || Ji.disabled) {
      this.safeSetState({
        status: zt
      }, function() {
        i.props.onEntered(c);
      });
      return;
    }
    this.props.onEnter(c, d), this.safeSetState({
      status: Et
    }, function() {
      i.props.onEntering(c, d), i.onTransitionEnd(p, function() {
        i.safeSetState({
          status: zt
        }, function() {
          i.props.onEntered(c, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), a = this.props.nodeRef ? void 0 : Vn.findDOMNode(this);
    if (!i || Ji.disabled) {
      this.safeSetState({
        status: Ct
      }, function() {
        o.props.onExited(a);
      });
      return;
    }
    this.props.onExit(a), this.safeSetState({
      status: io
    }, function() {
      o.props.onExiting(a), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: Ct
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Vn.findDOMNode(this), a = o == null && !this.props.addEndListener;
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
    if (o === mn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var a = ge(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ ve.createElement(ga.Provider, {
        value: null
      }, typeof s == "function" ? s(o, a) : ve.cloneElement(ve.Children.only(s), a))
    );
  }, t;
}(ve.Component);
pt.contextType = ga;
pt.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = ng;
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
function Lt() {
}
pt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Lt,
  onEntering: Lt,
  onEntered: Lt,
  onExit: Lt,
  onExiting: Lt,
  onExited: Lt
};
pt.UNMOUNTED = mn;
pt.EXITED = Ct;
pt.ENTERING = Et;
pt.ENTERED = zt;
pt.EXITING = io;
const ma = pt, ha = (e) => e.scrollTop;
function or(e, t) {
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
const og = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function so(e) {
  return `scale(${e}, ${e ** 2})`;
}
const ig = {
  entering: {
    opacity: 1,
    transform: so(1)
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
    onExited: p,
    onExiting: f,
    style: h,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = ma
  } = t, w = ge(t, og), P = fn(), y = C.useRef(), S = In(), b = C.useRef(null), E = qe(b, i.ref, n), $ = (V) => (I) => {
    if (V) {
      const j = b.current;
      I === void 0 ? V(j) : V(j, I);
    }
  }, A = $(d), D = $((V, I) => {
    ha(V);
    const {
      duration: j,
      delay: ne,
      easing: te
    } = or({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    m === "auto" ? (O = S.transitions.getAutoHeightDuration(V.clientHeight), y.current = O) : O = j, V.style.transition = [S.transitions.create("opacity", {
      duration: O,
      delay: ne
    }), S.transitions.create("transform", {
      duration: Ar ? O : O * 0.666,
      delay: ne,
      easing: te
    })].join(","), u && u(V, I);
  }), B = $(c), N = $(f), R = $((V) => {
    const {
      duration: I,
      delay: j,
      easing: ne
    } = or({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let te;
    m === "auto" ? (te = S.transitions.getAutoHeightDuration(V.clientHeight), y.current = te) : te = I, V.style.transition = [S.transitions.create("opacity", {
      duration: te,
      delay: j
    }), S.transitions.create("transform", {
      duration: Ar ? te : te * 0.666,
      delay: Ar ? j : j || te * 0.333,
      easing: ne
    })].join(","), V.style.opacity = 0, V.style.transform = so(0.75), g && g(V);
  }), k = $(p);
  return /* @__PURE__ */ x(v, T({
    appear: o,
    in: a,
    nodeRef: b,
    onEnter: D,
    onEntered: B,
    onEntering: A,
    onExit: R,
    onExited: k,
    onExiting: N,
    addEndListener: (V) => {
      m === "auto" && P.start(y.current || 0, V), r && r(b.current, V);
    },
    timeout: m === "auto" ? null : m
  }, w, {
    children: (V, I) => /* @__PURE__ */ C.cloneElement(i, T({
      style: T({
        opacity: 0,
        transform: so(0.75),
        visibility: V === "exited" && !a ? "hidden" : void 0
      }, ig[V], h, i.props.style),
      ref: E
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
  children: Pn.isRequired,
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
const ao = Vo, sg = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Zi = sg, ag = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], lg = Ne(aa, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), va = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r;
  const o = da(), i = dt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: a,
    components: u,
    componentsProps: c,
    container: d,
    disablePortal: g,
    keepMounted: p,
    modifiers: f,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: w,
    transition: P,
    slots: y,
    slotProps: S
  } = i, b = ge(i, ag), E = (r = y == null ? void 0 : y.root) != null ? r : u == null ? void 0 : u.Root, $ = T({
    anchorEl: s,
    container: d,
    disablePortal: g,
    keepMounted: p,
    modifiers: f,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: w,
    transition: P
  }, b);
  return /* @__PURE__ */ x(lg, T({
    as: a,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: E
    },
    slotProps: S ?? c
  }, $, {
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
  anchorEl: l.oneOfType([at, l.object, l.func]),
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
  container: l.oneOfType([at, l.func]),
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
const ba = va;
function ug(e) {
  return et("MuiTooltip", e);
}
const cg = bt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), gt = cg, dg = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function pg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const fg = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ze(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ct(s, ug, t);
}, gg = Ne(ba, {
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
  [`&[data-popper-placement*="bottom"] .${gt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${gt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${gt.arrow}`]: T({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${gt.arrow}`]: T({}, t.isRtl ? {
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
})), mg = Ne("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Ze(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => T({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : rr(e.palette.grey[700], 0.92),
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
  lineHeight: `${pg(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${gt.popper}[data-popper-placement*="left"] &`]: T({
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
  [`.${gt.popper}[data-popper-placement*="right"] &`]: T({
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
  [`.${gt.popper}[data-popper-placement*="top"] &`]: T({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${gt.popper}[data-popper-placement*="bottom"] &`]: T({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), hg = Ne("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : rr(e.palette.grey[700], 0.9),
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
let zn = !1;
const Qi = new On();
let cn = {
  x: 0,
  y: 0
};
function Hn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const wa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i, s, a, u, c, d, g, p, f, h, m, v, w, P, y, S, b;
  const E = dt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: $ = !1,
    children: A,
    components: D = {},
    componentsProps: B = {},
    describeChild: N = !1,
    disableFocusListener: R = !1,
    disableHoverListener: k = !1,
    disableInteractive: _ = !1,
    disableTouchListener: V = !1,
    enterDelay: I = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: ne = 700,
    followCursor: te = !1,
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
    slots: Z = {},
    title: se,
    TransitionComponent: F = ao,
    TransitionProps: Q
  } = E, M = ge(E, dg), ae = /* @__PURE__ */ C.isValidElement(A) ? A : /* @__PURE__ */ x("span", {
    children: A
  }), Ee = In(), $e = Ee.direction === "rtl", [xe, xt] = C.useState(), [_e, tt] = C.useState(null), Fe = C.useRef(!1), nt = _ || te, Re = fn(), Mt = fn(), St = fn(), en = fn(), [An, Uo] = Vs({
    controlled: G,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let rt = An;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = C.useRef(G !== void 0);
    C.useEffect(() => {
      xe && xe.disabled && !re && se !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [se, xe, re]);
  }
  const yr = Fs(O), tn = C.useRef(), Dn = Cn(() => {
    tn.current !== void 0 && (document.body.style.WebkitUserSelect = tn.current, tn.current = void 0), en.clear();
  });
  C.useEffect(() => Dn, [Dn]);
  const qo = (re) => {
    Qi.clear(), zn = !0, Uo(!0), z && !rt && z(re);
  }, Fn = Cn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      Qi.start(800 + L, () => {
        zn = !1;
      }), Uo(!1), X && rt && X(re), Re.start(Ee.transitions.duration.shortest, () => {
        Fe.current = !1;
      });
    }
  ), xr = (re) => {
    Fe.current && re.type !== "touchstart" || (xe && xe.removeAttribute("title"), Mt.clear(), St.clear(), I || zn && j ? Mt.start(zn ? j : I, () => {
      qo(re);
    }) : qo(re));
  }, Wo = (re) => {
    Mt.clear(), St.start(L, () => {
      Fn(re);
    });
  }, {
    isFocusVisibleRef: Xo,
    onBlur: il,
    onFocus: sl,
    ref: al
  } = Ls(), [, Yo] = C.useState(!1), Ko = (re) => {
    il(re), Xo.current === !1 && (Yo(!1), Wo(re));
  }, Jo = (re) => {
    xe || xt(re.currentTarget), sl(re), Xo.current === !0 && (Yo(!0), xr(re));
  }, Zo = (re) => {
    Fe.current = !0;
    const Ve = ae.props;
    Ve.onTouchStart && Ve.onTouchStart(re);
  }, Qo = xr, ei = Wo, ll = (re) => {
    Zo(re), St.clear(), Re.clear(), Dn(), tn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", en.start(ne, () => {
      document.body.style.WebkitUserSelect = tn.current, xr(re);
    });
  }, ul = (re) => {
    ae.props.onTouchEnd && ae.props.onTouchEnd(re), Dn(), St.start(H, () => {
      Fn(re);
    });
  };
  C.useEffect(() => {
    if (!rt)
      return;
    function re(Ve) {
      (Ve.key === "Escape" || Ve.key === "Esc") && Fn(Ve);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [Fn, rt]);
  const cl = qe(ae.ref, al, xt, n);
  !se && se !== 0 && (rt = !1);
  const Sr = C.useRef(), dl = (re) => {
    const Ve = ae.props;
    Ve.onMouseMove && Ve.onMouseMove(re), cn = {
      x: re.clientX,
      y: re.clientY
    }, Sr.current && Sr.current.update();
  }, nn = {}, Cr = typeof se == "string";
  N ? (nn.title = !rt && Cr && !k ? se : null, nn["aria-describedby"] = rt ? yr : null) : (nn["aria-label"] = Cr ? se : null, nn["aria-labelledby"] = rt && !Cr ? yr : null);
  const He = T({}, nn, M, ae.props, {
    className: Pe(M.className, ae.props.className),
    onTouchStart: Zo,
    ref: cl
  }, te ? {
    onMouseMove: dl
  } : {});
  process.env.NODE_ENV !== "production" && (He["data-mui-internal-clone-element"] = !0, C.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const rn = {};
  V || (He.onTouchStart = ll, He.onTouchEnd = ul), k || (He.onMouseOver = Hn(Qo, He.onMouseOver), He.onMouseLeave = Hn(ei, He.onMouseLeave), nt || (rn.onMouseOver = Qo, rn.onMouseLeave = ei)), R || (He.onFocus = Hn(Jo, He.onFocus), He.onBlur = Hn(Ko, He.onBlur), nt || (rn.onFocus = Jo, rn.onBlur = Ko)), process.env.NODE_ENV !== "production" && ae.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));
  const pl = C.useMemo(() => {
    var re;
    let Ve = [{
      name: "arrow",
      enabled: !!_e,
      options: {
        element: _e,
        padding: 4
      }
    }];
    return (re = U.popperOptions) != null && re.modifiers && (Ve = Ve.concat(U.popperOptions.modifiers)), T({}, U.popperOptions, {
      modifiers: Ve
    });
  }, [_e, U]), on = T({}, E, {
    isRtl: $e,
    arrow: $,
    disableInteractive: nt,
    placement: q,
    PopperComponentProp: W,
    touch: Fe.current
  }), Er = fg(on), ti = (r = (o = Z.popper) != null ? o : D.Popper) != null ? r : gg, ni = (i = (s = (a = Z.transition) != null ? a : D.Transition) != null ? s : F) != null ? i : ao, ri = (u = (c = Z.tooltip) != null ? c : D.Tooltip) != null ? u : mg, oi = (d = (g = Z.arrow) != null ? g : D.Arrow) != null ? d : hg, fl = gn(ti, T({}, U, (p = Y.popper) != null ? p : B.popper, {
    className: Pe(Er.popper, U == null ? void 0 : U.className, (f = (h = Y.popper) != null ? h : B.popper) == null ? void 0 : f.className)
  }), on), gl = gn(ni, T({}, Q, (m = Y.transition) != null ? m : B.transition), on), ml = gn(ri, T({}, (v = Y.tooltip) != null ? v : B.tooltip, {
    className: Pe(Er.tooltip, (w = (P = Y.tooltip) != null ? P : B.tooltip) == null ? void 0 : w.className)
  }), on), hl = gn(oi, T({}, (y = Y.arrow) != null ? y : B.arrow, {
    className: Pe(Er.arrow, (S = (b = Y.arrow) != null ? b : B.arrow) == null ? void 0 : S.className)
  }), on);
  return /* @__PURE__ */ ie(C.Fragment, {
    children: [/* @__PURE__ */ C.cloneElement(ae, He), /* @__PURE__ */ x(ti, T({
      as: W ?? ba,
      placement: q,
      anchorEl: te ? {
        getBoundingClientRect: () => ({
          top: cn.y,
          left: cn.x,
          right: cn.x,
          bottom: cn.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: Sr,
      open: xe ? rt : !1,
      id: yr,
      transition: !0
    }, rn, fl, {
      popperOptions: pl,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ x(ni, T({
        timeout: Ee.transitions.duration.shorter
      }, re, gl, {
        children: /* @__PURE__ */ ie(ri, T({}, ml, {
          children: [se, $ ? /* @__PURE__ */ x(oi, T({}, hl, {
            ref: tt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (wa.propTypes = {
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
  children: Pn.isRequired,
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
const vg = wa;
var Lo = {}, ya = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ya);
var bg = ya.exports, Dr = {};
function wg(e) {
  return et("MuiSvgIcon", e);
}
bt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const yg = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], xg = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ze(t)}`, `fontSize${Ze(n)}`]
  };
  return ct(o, wg, r);
}, Sg = Ne("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Ze(n.color)}`], t[`fontSize${Ze(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, s, a, u, c, d, g, p, f, h;
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
    color: (g = (p = (e.vars || e).palette) == null || (p = p[t.color]) == null ? void 0 : p.main) != null ? g : {
      action: (f = (e.vars || e).palette) == null || (f = f.action) == null ? void 0 : f.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Bo = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = dt({
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
    viewBox: p = "0 0 24 24"
  } = r, f = ge(r, yg), h = /* @__PURE__ */ C.isValidElement(o) && o.type === "svg", m = T({}, r, {
    color: s,
    component: a,
    fontSize: u,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: p,
    hasSvgAsChild: h
  }), v = {};
  d || (v.viewBox = p);
  const w = xg(m);
  return /* @__PURE__ */ ie(Sg, T({
    as: a,
    className: Pe(w.root, i),
    focusable: "false",
    color: c,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n
  }, v, f, h && o.props, {
    ownerState: m,
    children: [h ? o.props.children : o, g ? /* @__PURE__ */ x("title", {
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
const es = Bo;
function xa(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ x(es, T({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = es.muiName, /* @__PURE__ */ C.memo(/* @__PURE__ */ C.forwardRef(n));
}
const Cg = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Us.configure(e);
  }
}, Eg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ze,
  createChainedFunction: Qr,
  createSvgIcon: xa,
  debounce: Ds,
  deprecatedPropType: Ku,
  isMuiElement: Ju,
  ownerDocument: Oe,
  ownerWindow: qt,
  requirePropFactory: Zu,
  setRef: Zn,
  unstable_ClassNameGenerator: Cg,
  unstable_useEnhancedEffect: Ot,
  unstable_useId: Fs,
  unsupportedProp: tc,
  useControlled: Vs,
  useEventCallback: Cn,
  useForkRef: qe,
  useIsFocusVisible: Ls
}, Symbol.toStringTag, { value: "Module" })), Rg = /* @__PURE__ */ Ou(Eg);
var ts;
function kg() {
  return ts || (ts = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Rg;
  }(Dr)), Dr;
}
var Tg = bg;
Object.defineProperty(Lo, "__esModule", {
  value: !0
});
var Sa = Lo.default = void 0, Pg = Tg(kg()), Og = vl;
Sa = Lo.default = (0, Pg.default)(/* @__PURE__ */ (0, Og.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ns(e, t, n) {
  return e ? /* @__PURE__ */ x(ms, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ x("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ca(e) {
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
    hasDisabledGutters: p = !1,
    hasDivider: f = !1,
    focusVisibleClassName: h,
    id: m,
    children: v
  } = e, w = /* @__PURE__ */ x(
    Al,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: u,
      disabled: c,
      dense: d,
      disableGutters: p,
      divider: f,
      focusVisibleClassName: h,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ ie(sr, { children: [
        ns(i, n, !0),
        /* @__PURE__ */ x(Dl, { primary: n, inset: !i && o }),
        g ? /* @__PURE__ */ x(ms, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ x(Sa, {}) }) : ns(s, n, !1)
      ] }) : v
    }
  );
  return r ? /* @__PURE__ */ x(vg, { title: r, placement: "right", children: /* @__PURE__ */ x("div", { children: w }) }) : w;
}
function Ea(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Ng(e) {
  const [t, n] = Ce(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (c) => {
    n(c.currentTarget);
  }, a = () => {
    n(void 0);
  }, u = () => {
    let c = Ea(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return c = c.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ x(jo, { ...e, includedGroups: c });
  };
  return /* @__PURE__ */ ie(sr, { children: [
    /* @__PURE__ */ x(Ca, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ x(
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
const $g = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function jo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = Jt(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ea(t).filter((h) => !("menuItem" in h.group))
    ), g = Object.values(d).sort(
      (h, m) => (h.group.order || 0) - (m.group.order || 0)
    ), p = [];
    g.forEach((h) => {
      $g(h.id, t.items).forEach(
        (m) => p.push({ item: m, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const f = p.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: f };
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
    return /* @__PURE__ */ x("div", {});
  const c = u.item.group;
  return /* @__PURE__ */ x("div", { role: "menu", "aria-label": c, children: i.map((d, g) => {
    const { item: p } = d, f = a(d);
    if ("command" in p) {
      const h = p.group + g;
      return /* @__PURE__ */ x(
        Ca,
        {
          onClick: (m) => {
            n == null || n(m), r(p);
          },
          ...f
        },
        h
      );
    }
    return /* @__PURE__ */ x(
      Ng,
      {
        parentMenuItem: p,
        parentItemProps: f,
        ...e
      },
      c + p.id
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
  )), /* @__PURE__ */ x(jo, { ...e, includedGroups: i });
}
function Mg({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ ie(
    hs,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ x("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ x(Vl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ x(
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
function Ig({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = Jt(() => {
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
  return /* @__PURE__ */ x(
    hs,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, a) => /* @__PURE__ */ x(
        Mg,
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
const Ra = /* @__PURE__ */ C.createContext({});
process.env.NODE_ENV !== "production" && (Ra.displayName = "ListContext");
const Ag = Ra;
function Dg(e) {
  return et("MuiList", e);
}
bt("MuiList", ["root", "padding", "dense", "subheader"]);
const Fg = ["children", "className", "component", "dense", "disablePadding", "subheader"], Vg = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return ct({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Dg, t);
}, Lg = Ne("ul", {
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
})), ka = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = dt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: s = "ul",
    dense: a = !1,
    disablePadding: u = !1,
    subheader: c
  } = r, d = ge(r, Fg), g = C.useMemo(() => ({
    dense: a
  }), [a]), p = T({}, r, {
    component: s,
    dense: a,
    disablePadding: u
  }), f = Vg(p);
  return /* @__PURE__ */ x(Ag.Provider, {
    value: g,
    children: /* @__PURE__ */ ie(Lg, T({
      as: s,
      className: Pe(f.root, i),
      ref: n,
      ownerState: p
    }, d, {
      children: [c, o]
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
const Bg = ka, jg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Fr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function rs(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ta(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function dn(e, t, n, r, o, i) {
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
  } = t, p = ge(t, jg), f = C.useRef(null), h = C.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Ot(() => {
    o && f.current.focus();
  }, [o]), C.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (y, S) => {
      const b = !f.current.style.width;
      if (y.clientHeight < f.current.clientHeight && b) {
        const E = `${Bs(Oe(y))}px`;
        f.current.style[S.direction === "rtl" ? "paddingLeft" : "paddingRight"] = E, f.current.style.width = `calc(100% + ${E})`;
      }
      return f.current;
    }
  }), []);
  const m = (y) => {
    const S = f.current, b = y.key, E = Oe(S).activeElement;
    if (b === "ArrowDown")
      y.preventDefault(), dn(S, E, c, u, Fr);
    else if (b === "ArrowUp")
      y.preventDefault(), dn(S, E, c, u, rs);
    else if (b === "Home")
      y.preventDefault(), dn(S, null, c, u, Fr);
    else if (b === "End")
      y.preventDefault(), dn(S, null, c, u, rs);
    else if (b.length === 1) {
      const $ = h.current, A = b.toLowerCase(), D = performance.now();
      $.keys.length > 0 && (D - $.lastTime > 500 ? ($.keys = [], $.repeating = !0, $.previousKeyMatched = !0) : $.repeating && A !== $.keys[0] && ($.repeating = !1)), $.lastTime = D, $.keys.push(A);
      const B = E && !$.repeating && Ta(E, $);
      $.previousKeyMatched && (B || dn(S, E, !1, u, Fr, $)) ? y.preventDefault() : $.previousKeyMatched = !1;
    }
    d && d(y);
  }, v = qe(f, n);
  let w = -1;
  C.Children.forEach(s, (y, S) => {
    if (!/* @__PURE__ */ C.isValidElement(y)) {
      w === S && (w += 1, w >= s.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Jn.isFragment(y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), y.props.disabled || (g === "selectedMenu" && y.props.selected || w === -1) && (w = S), w === S && (y.props.disabled || y.props.muiSkipListHighlight || y.type.muiSkipListHighlight) && (w += 1, w >= s.length && (w = -1));
  });
  const P = C.Children.map(s, (y, S) => {
    if (S === w) {
      const b = {};
      return i && (b.autoFocus = !0), y.props.tabIndex === void 0 && g === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ C.cloneElement(y, b);
    }
    return y;
  });
  return /* @__PURE__ */ x(Bg, T({
    role: "menu",
    ref: v,
    className: a,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, p, {
    children: P
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
const zg = Pa, Hg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Gg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Oa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = In(), o = {
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
    onEntering: p,
    onExit: f,
    onExited: h,
    onExiting: m,
    style: v,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: P = ma
  } = t, y = ge(t, Hg), S = C.useRef(null), b = qe(S, a.ref, n), E = (_) => (V) => {
    if (_) {
      const I = S.current;
      V === void 0 ? _(I) : _(I, V);
    }
  }, $ = E(p), A = E((_, V) => {
    ha(_);
    const I = or({
      style: v,
      timeout: w,
      easing: u
    }, {
      mode: "enter"
    });
    _.style.webkitTransition = r.transitions.create("opacity", I), _.style.transition = r.transitions.create("opacity", I), d && d(_, V);
  }), D = E(g), B = E(m), N = E((_) => {
    const V = or({
      style: v,
      timeout: w,
      easing: u
    }, {
      mode: "exit"
    });
    _.style.webkitTransition = r.transitions.create("opacity", V), _.style.transition = r.transitions.create("opacity", V), f && f(_);
  }), R = E(h);
  return /* @__PURE__ */ x(P, T({
    appear: s,
    in: c,
    nodeRef: S,
    onEnter: A,
    onEntered: D,
    onEntering: $,
    onExit: N,
    onExited: R,
    onExiting: B,
    addEndListener: (_) => {
      i && i(S.current, _);
    },
    timeout: w
  }, y, {
    children: (_, V) => /* @__PURE__ */ C.cloneElement(a, T({
      style: T({
        opacity: 0,
        visibility: _ === "exited" && !c ? "hidden" : void 0
      }, Gg[_], v, a.props.style),
      ref: b
    }, V))
  }));
});
process.env.NODE_ENV !== "production" && (Oa.propTypes = {
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
  children: Pn.isRequired,
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
const Ug = Oa;
function qg(e) {
  return et("MuiBackdrop", e);
}
bt("MuiBackdrop", ["root", "invisible"]);
const Wg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Xg = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return ct({
    root: ["root", n && "invisible"]
  }, qg, t);
}, Yg = Ne("div", {
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
})), Na = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i;
  const s = dt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: a,
    className: u,
    component: c = "div",
    components: d = {},
    componentsProps: g = {},
    invisible: p = !1,
    open: f,
    slotProps: h = {},
    slots: m = {},
    TransitionComponent: v = Ug,
    transitionDuration: w
  } = s, P = ge(s, Wg), y = T({}, s, {
    component: c,
    invisible: p
  }), S = Xg(y), b = (r = h.root) != null ? r : g.root;
  return /* @__PURE__ */ x(v, T({
    in: f,
    timeout: w
  }, P, {
    children: /* @__PURE__ */ x(Yg, T({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = m.root) != null ? i : d.Root) != null ? o : c,
      className: Pe(S.root, u, b == null ? void 0 : b.className),
      ownerState: T({}, y, b == null ? void 0 : b.ownerState),
      classes: S,
      ref: n,
      children: a
    }))
  }));
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
const Kg = Na;
function Jg(e) {
  return et("MuiModal", e);
}
bt("MuiModal", ["root", "hidden", "backdrop"]);
const Zg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Qg = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return ct({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Jg, r);
}, em = Ne("div", {
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
})), tm = Ne(Kg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), $a = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i, s, a, u;
  const c = dt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = tm,
    BackdropProps: g,
    className: p,
    closeAfterTransition: f = !1,
    children: h,
    container: m,
    component: v,
    components: w = {},
    componentsProps: P = {},
    disableAutoFocus: y = !1,
    disableEnforceFocus: S = !1,
    disableEscapeKeyDown: b = !1,
    disablePortal: E = !1,
    disableRestoreFocus: $ = !1,
    disableScrollLock: A = !1,
    hideBackdrop: D = !1,
    keepMounted: B = !1,
    onBackdropClick: N,
    open: R,
    slotProps: k,
    slots: _
    // eslint-disable-next-line react/prop-types
  } = c, V = ge(c, Zg), I = T({}, c, {
    closeAfterTransition: f,
    disableAutoFocus: y,
    disableEnforceFocus: S,
    disableEscapeKeyDown: b,
    disablePortal: E,
    disableRestoreFocus: $,
    disableScrollLock: A,
    hideBackdrop: D,
    keepMounted: B
  }), {
    getRootProps: j,
    getBackdropProps: ne,
    getTransitionProps: te,
    portalRef: O,
    isTopModal: L,
    exited: H,
    hasTransition: X
  } = zc(T({}, I, {
    rootRef: n
  })), z = T({}, I, {
    exited: H
  }), G = Qg(z), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), X) {
    const {
      onEnter: Q,
      onExited: M
    } = te();
    q.onEnter = Q, q.onExited = M;
  }
  const W = (r = (o = _ == null ? void 0 : _.root) != null ? o : w.Root) != null ? r : em, U = (i = (s = _ == null ? void 0 : _.backdrop) != null ? s : w.Backdrop) != null ? i : d, Y = (a = k == null ? void 0 : k.root) != null ? a : P.root, Z = (u = k == null ? void 0 : k.backdrop) != null ? u : P.backdrop, se = Nt({
    elementType: W,
    externalSlotProps: Y,
    externalForwardedProps: V,
    getSlotProps: j,
    additionalProps: {
      ref: n,
      as: v
    },
    ownerState: z,
    className: Pe(p, Y == null ? void 0 : Y.className, G == null ? void 0 : G.root, !z.open && z.exited && (G == null ? void 0 : G.hidden))
  }), F = Nt({
    elementType: U,
    externalSlotProps: Z,
    additionalProps: g,
    getSlotProps: (Q) => ne(T({}, Q, {
      onClick: (M) => {
        N && N(M), Q != null && Q.onClick && Q.onClick(M);
      }
    })),
    className: Pe(Z == null ? void 0 : Z.className, g == null ? void 0 : g.className, G == null ? void 0 : G.backdrop),
    ownerState: z
  });
  return !B && !R && (!X || H) ? null : /* @__PURE__ */ x(En, {
    ref: O,
    container: m,
    disablePortal: E,
    children: /* @__PURE__ */ ie(W, T({}, se, {
      children: [!D && d ? /* @__PURE__ */ x(U, T({}, F)) : null, /* @__PURE__ */ x(Qn, {
        disableEnforceFocus: S,
        disableAutoFocus: y,
        disableRestoreFocus: $,
        isEnabled: L,
        open: R,
        children: /* @__PURE__ */ C.cloneElement(h, q)
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
  BackdropComponent: l.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: l.object,
  /**
   * A single child content element.
   */
  children: Pn.isRequired,
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
  container: l.oneOfType([at, l.func]),
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
const nm = $a;
function rm(e) {
  return et("MuiPaper", e);
}
bt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const om = ["className", "component", "elevation", "square", "variant"], im = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return ct(i, rm, o);
}, sm = Ne("div", {
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
    backgroundImage: `linear-gradient(${rr("#fff", Zi(t.elevation))}, ${rr("#fff", Zi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), _a = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = dt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: a = !1,
    variant: u = "elevation"
  } = r, c = ge(r, om), d = T({}, r, {
    component: i,
    elevation: s,
    square: a,
    variant: u
  }), g = im(d);
  return process.env.NODE_ENV !== "production" && In().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ x(sm, T({
    as: i,
    ownerState: d,
    className: Pe(g.root, o),
    ref: n
  }, c));
});
process.env.NODE_ENV !== "production" && (_a.propTypes = {
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
  elevation: Qt(Hs, (e) => {
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
const am = _a;
function lm(e) {
  return et("MuiPopover", e);
}
bt("MuiPopover", ["root", "paper"]);
const um = ["onEntering"], cm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], dm = ["slotProps"];
function os(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function is(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ss(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Kn(e) {
  return typeof e == "function" ? e() : e;
}
const pm = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"]
  }, lm, t);
}, fm = Ne(nm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ma = Ne(am, {
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
  const s = dt({
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
    children: p,
    className: f,
    container: h,
    elevation: m = 8,
    marginThreshold: v = 16,
    open: w,
    PaperProps: P = {},
    slots: y,
    slotProps: S,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: E = ao,
    transitionDuration: $ = "auto",
    TransitionProps: {
      onEntering: A
    } = {},
    disableScrollLock: D = !1
  } = s, B = ge(s.TransitionProps, um), N = ge(s, cm), R = (r = S == null ? void 0 : S.paper) != null ? r : P, k = C.useRef(), _ = qe(k, R.ref), V = T({}, s, {
    anchorOrigin: c,
    anchorReference: g,
    elevation: m,
    marginThreshold: v,
    externalPaperSlotProps: R,
    transformOrigin: b,
    TransitionComponent: E,
    transitionDuration: $,
    TransitionProps: B
  }), I = pm(V), j = C.useCallback(() => {
    if (g === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const Q = Kn(u), M = Q && Q.nodeType === 1 ? Q : Oe(k.current).body, ae = M.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ee = M.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ee.top === 0 && Ee.left === 0 && Ee.right === 0 && Ee.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ae.top + os(ae, c.vertical),
      left: ae.left + is(ae, c.horizontal)
    };
  }, [u, c.horizontal, c.vertical, d, g]), ne = C.useCallback((Q) => ({
    vertical: os(Q, b.vertical),
    horizontal: is(Q, b.horizontal)
  }), [b.horizontal, b.vertical]), te = C.useCallback((Q) => {
    const M = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, ae = ne(M);
    if (g === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ss(ae)
      };
    const Ee = j();
    let $e = Ee.top - ae.vertical, xe = Ee.left - ae.horizontal;
    const xt = $e + M.height, _e = xe + M.width, tt = qt(Kn(u)), Fe = tt.innerHeight - v, nt = tt.innerWidth - v;
    if (v !== null && $e < v) {
      const Re = $e - v;
      $e -= Re, ae.vertical += Re;
    } else if (v !== null && xt > Fe) {
      const Re = xt - Fe;
      $e -= Re, ae.vertical += Re;
    }
    if (process.env.NODE_ENV !== "production" && M.height > Fe && M.height && Fe && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${M.height - Fe}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && xe < v) {
      const Re = xe - v;
      xe -= Re, ae.horizontal += Re;
    } else if (_e > nt) {
      const Re = _e - nt;
      xe -= Re, ae.horizontal += Re;
    }
    return {
      top: `${Math.round($e)}px`,
      left: `${Math.round(xe)}px`,
      transformOrigin: ss(ae)
    };
  }, [u, g, j, ne, v]), [O, L] = C.useState(w), H = C.useCallback(() => {
    const Q = k.current;
    if (!Q)
      return;
    const M = te(Q);
    M.top !== null && (Q.style.top = M.top), M.left !== null && (Q.style.left = M.left), Q.style.transformOrigin = M.transformOrigin, L(!0);
  }, [te]);
  C.useEffect(() => (D && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [u, D, H]);
  const X = (Q, M) => {
    A && A(Q, M), H();
  }, z = () => {
    L(!1);
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
    const Q = Ds(() => {
      H();
    }), M = qt(u);
    return M.addEventListener("resize", Q), () => {
      Q.clear(), M.removeEventListener("resize", Q);
    };
  }, [u, w, H]);
  let G = $;
  $ === "auto" && !E.muiSupportAuto && (G = void 0);
  const q = h || (u ? Oe(Kn(u)).body : void 0), W = (o = y == null ? void 0 : y.root) != null ? o : fm, U = (i = y == null ? void 0 : y.paper) != null ? i : Ma, Y = Nt({
    elementType: U,
    externalSlotProps: T({}, R, {
      style: O ? R.style : T({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: _
    },
    ownerState: V,
    className: Pe(I.paper, R == null ? void 0 : R.className)
  }), Z = Nt({
    elementType: W,
    externalSlotProps: (S == null ? void 0 : S.root) || {},
    externalForwardedProps: N,
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
    ownerState: V,
    className: Pe(I.root, f)
  }), {
    slotProps: se
  } = Z, F = ge(Z, dm);
  return /* @__PURE__ */ x(W, T({}, F, !Ws(W) && {
    slotProps: se,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ x(E, T({
      appear: !0,
      in: w,
      onEntering: X,
      onExited: z,
      timeout: G
    }, B, {
      children: /* @__PURE__ */ x(U, T({}, Y, {
        children: p
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
  anchorEl: Qt(l.oneOfType([at, l.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Kn(e.anchorEl);
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
  container: l.oneOfType([at, l.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: l.bool,
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
    component: zu
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
const gm = Ia;
function mm(e) {
  return et("MuiMenu", e);
}
bt("MuiMenu", ["root", "paper", "list"]);
const hm = ["onEntering"], vm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], bm = {
  vertical: "top",
  horizontal: "right"
}, wm = {
  vertical: "top",
  horizontal: "left"
}, ym = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, mm, t);
}, xm = Ne(gm, {
  shouldForwardProp: (e) => fa(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Sm = Ne(Ma, {
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
}), Cm = Ne(zg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Aa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o;
  const i = dt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: s = !0,
    children: a,
    className: u,
    disableAutoFocusItem: c = !1,
    MenuListProps: d = {},
    onClose: g,
    open: p,
    PaperProps: f = {},
    PopoverClasses: h,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: w = "selectedMenu",
    slots: P = {},
    slotProps: y = {}
  } = i, S = ge(i.TransitionProps, hm), b = ge(i, vm), E = In(), $ = E.direction === "rtl", A = T({}, i, {
    autoFocus: s,
    disableAutoFocusItem: c,
    MenuListProps: d,
    onEntering: v,
    PaperProps: f,
    transitionDuration: m,
    TransitionProps: S,
    variant: w
  }), D = ym(A), B = s && !c && p, N = C.useRef(null), R = (te, O) => {
    N.current && N.current.adjustStyleForScrollbar(te, E), v && v(te, O);
  }, k = (te) => {
    te.key === "Tab" && (te.preventDefault(), g && g(te, "tabKeyDown"));
  };
  let _ = -1;
  C.Children.map(a, (te, O) => {
    /* @__PURE__ */ C.isValidElement(te) && (process.env.NODE_ENV !== "production" && Jn.isFragment(te) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), te.props.disabled || (w === "selectedMenu" && te.props.selected || _ === -1) && (_ = O));
  });
  const V = (r = P.paper) != null ? r : Sm, I = (o = y.paper) != null ? o : f, j = Nt({
    elementType: P.root,
    externalSlotProps: y.root,
    ownerState: A,
    className: [D.root, u]
  }), ne = Nt({
    elementType: V,
    externalSlotProps: I,
    ownerState: A,
    className: D.paper
  });
  return /* @__PURE__ */ x(xm, T({
    onClose: g,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: $ ? "right" : "left"
    },
    transformOrigin: $ ? bm : wm,
    slots: {
      paper: V,
      root: P.root
    },
    slotProps: {
      root: j,
      paper: ne
    },
    open: p,
    ref: n,
    transitionDuration: m,
    TransitionProps: T({
      onEntering: R
    }, S),
    ownerState: A
  }, b, {
    classes: h,
    children: /* @__PURE__ */ x(Cm, T({
      onKeyDown: k,
      actions: N,
      autoFocus: s && (_ === -1 || c),
      autoFocusItem: B,
      variant: w
    }, d, {
      className: Pe(D.list, d.className),
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
  anchorEl: l.oneOfType([at, l.func]),
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
const Em = Aa;
function uv({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var c;
  const [o, i] = ve.useState(void 0), s = Te(
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
  ), a = Te(() => {
    i(void 0);
  }, []), u = Jt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((c = n == null ? void 0 : n.items) == null ? void 0 : c.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ ie(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ x(
          Em,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: a,
            anchorReference: "anchorPosition",
            anchorPosition: u,
            children: /* @__PURE__ */ x(
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
const Rm = xa(/* @__PURE__ */ x("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function km(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const lo = (e, t, n = {}) => {
  const r = kt(t);
  r.current = t;
  const o = kt(n);
  o.current = km(o.current);
  const [i, s] = Ce(() => r.current), [a, u] = Ce(!0);
  return ht(() => {
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
function Tm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: a
}) {
  const [u, c] = Ce(!1), [d, g] = Ce(!1), p = Te(() => {
    u && c(!1), g(!1);
  }, [u]), f = Te((S) => {
    S.stopPropagation(), c((b) => {
      const E = !b;
      return E && S.shiftKey ? g(!0) : E || g(!1), E;
    });
  }, []), h = Te(
    (S) => (p(), r(S)),
    [r, p]
  ), [m, v] = Ce({ top: 1, left: 1 });
  ht(() => {
    if (u) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const b = S.getBoundingClientRect(), E = window.scrollY, $ = window.scrollX, A = b.top + E + S.clientHeight, D = b.left + $;
        v({ top: A, left: D });
      }
    }
  }, [u, o]);
  const [w] = lo(
    Te(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, u]),
    t
  ), [P] = lo(
    Te(async () => (e == null ? void 0 : e(!0)) ?? n ?? w, [e, n, w, u]),
    n ?? w
  ), y = d && P ? P : w;
  return /* @__PURE__ */ ie(sr, { children: [
    /* @__PURE__ */ x(
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
        onClick: f,
        children: a ?? /* @__PURE__ */ x(Rm, {})
      }
    ),
    /* @__PURE__ */ x(
      Ll,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: u,
        onClose: p,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: y ? /* @__PURE__ */ x(
          Ig,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: y
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
  onClick: u,
  children: c
}) {
  return /* @__PURE__ */ x(
    vs,
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
const Pm = gs(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Da = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(bs.Root, { ref: n, className: ee(Pm(), e), ...t }));
Da.displayName = bs.Root.displayName;
function ir({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: i,
  placeholder: s,
  isRequired: a = !1,
  className: u,
  defaultValue: c,
  value: d,
  onChange: g,
  onFocus: p,
  onBlur: f
}) {
  return /* @__PURE__ */ ie("div", { className: ee("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ x(
      Da,
      {
        htmlFor: e,
        className: ee({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${a ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ x(
      yo,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: a,
        className: ee(u, { "pr-border-red-600": n }),
        defaultValue: c,
        value: d,
        onChange: g,
        onFocus: p,
        onBlur: f
      }
    ),
    /* @__PURE__ */ x("p", { className: ee({ "pr-hidden": !o }), children: o })
  ] });
}
let Vr;
const Lr = () => (Vr || (Vr = ue.allBookIds.map((e) => ({
  bookId: e,
  label: ue.bookIdToEnglishName(e)
}))), Vr);
function dv({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (u) => {
    t(u);
  }, o = (u, c) => {
    const g = { bookNum: ue.bookIdToNumber(c.bookId), chapterNum: 1, verseNum: 1 };
    r(g);
  }, i = (u) => {
    t({ ...e, chapterNum: +u.target.value });
  }, s = (u) => {
    t({ ...e, verseNum: +u.target.value });
  }, a = Jt(() => Lr()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ie("span", { id: n, className: "pr-flex pr-place-items-center", children: [
    /* @__PURE__ */ x(
      Kr,
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
    /* @__PURE__ */ x(
      it,
      {
        onClick: () => r(si(e, -1)),
        disabled: e.bookNum <= bl,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(
      it,
      {
        onClick: () => r(si(e, 1)),
        disabled: e.bookNum >= Lr().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ x(
      ir,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ x(
      it,
      {
        onClick: () => t(ai(e, -1)),
        disabled: e.chapterNum <= wl,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(
      it,
      {
        onClick: () => t(ai(e, 1)),
        disabled: e.chapterNum >= ds(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ x(
      ir,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ x(
      it,
      {
        onClick: () => t(li(e, -1)),
        disabled: e.verseNum <= yl,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(it, { onClick: () => t(li(e, 1)), children: ">" })
  ] });
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
function mt(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ze(e, t) {
  return (n) => {
    t.setState((r) => ({
      ...r,
      [e]: mt(n, r[e])
    }));
  };
}
function wr(e) {
  return e instanceof Function;
}
function Om(e) {
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
function K(e, t, n) {
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
      const d = Math.round((Date.now() - s) * 100) / 100, g = Math.round((Date.now() - c) * 100) / 100, p = g / 16, f = (h, m) => {
        for (h = String(h); h.length < m; )
          h = " " + h;
        return h;
      };
      console.info(`%c⏱ ${f(g, 5)} /${f(d, 5)} ms`, `
            font-size: .6rem;
            font-weight: bold;
            color: hsl(${Math.max(0, Math.min(120 - 120 * p, 120))}deg 100% 31%);`, n == null ? void 0 : n.key);
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
function Nm(e, t, n, r) {
  const o = () => {
    var s;
    return (s = i.getValue()) != null ? s : e.options.renderFallbackValue;
  }, i = {
    id: `${t.id}_${n.id}`,
    row: t,
    column: n,
    getValue: () => t.getValue(r),
    renderValue: o,
    getContext: K(() => [e, n, t, i], (s, a, u, c) => ({
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
function $m(e, t, n, r) {
  var o, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...t
  }, u = a.accessorKey;
  let c = (o = (i = a.id) != null ? i : u ? u.replace(".", "_") : void 0) != null ? o : typeof a.header == "string" ? a.header : void 0, d;
  if (a.accessorFn ? d = a.accessorFn : u && (u.includes(".") ? d = (p) => {
    let f = p;
    for (const m of u.split(".")) {
      var h;
      f = (h = f) == null ? void 0 : h[m], process.env.NODE_ENV !== "production" && f === void 0 && console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`);
    }
    return f;
  } : d = (p) => p[a.accessorKey]), !c)
    throw process.env.NODE_ENV !== "production" ? new Error(a.accessorFn ? "Columns require an id when using an accessorFn" : "Columns require an id when using a non-string header") : new Error();
  let g = {
    id: `${String(c)}`,
    accessorFn: d,
    parent: r,
    depth: n,
    columnDef: a,
    columns: [],
    getFlatColumns: K(() => [!0], () => {
      var p;
      return [g, ...(p = g.columns) == null ? void 0 : p.flatMap((f) => f.getFlatColumns())];
    }, J(e.options, "debugColumns", "column.getFlatColumns")),
    getLeafColumns: K(() => [e._getOrderColumnsFn()], (p) => {
      var f;
      if ((f = g.columns) != null && f.length) {
        let h = g.columns.flatMap((m) => m.getLeafColumns());
        return p(h);
      }
      return [g];
    }, J(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const p of e._features)
    p.createColumn == null || p.createColumn(g, e);
  return g;
}
const ke = "debugHeaders";
function as(e, t, n) {
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
const _m = {
  createTable: (e) => {
    e.getHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, s;
      const a = (i = r == null ? void 0 : r.map((g) => n.find((p) => p.id === g)).filter(Boolean)) != null ? i : [], u = (s = o == null ? void 0 : o.map((g) => n.find((p) => p.id === g)).filter(Boolean)) != null ? s : [], c = n.filter((g) => !(r != null && r.includes(g.id)) && !(o != null && o.includes(g.id)));
      return Gn(t, [...a, ...c, ...u], e);
    }, J(e.options, ke, "getHeaderGroups")), e.getCenterHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Gn(t, n, e, "center")), J(e.options, ke, "getCenterHeaderGroups")), e.getLeftHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Gn(t, i, e, "left");
    }, J(e.options, ke, "getLeftHeaderGroups")), e.getRightHeaderGroups = K(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Gn(t, i, e, "right");
    }, J(e.options, ke, "getRightHeaderGroups")), e.getFooterGroups = K(() => [e.getHeaderGroups()], (t) => [...t].reverse(), J(e.options, ke, "getFooterGroups")), e.getLeftFooterGroups = K(() => [e.getLeftHeaderGroups()], (t) => [...t].reverse(), J(e.options, ke, "getLeftFooterGroups")), e.getCenterFooterGroups = K(() => [e.getCenterHeaderGroups()], (t) => [...t].reverse(), J(e.options, ke, "getCenterFooterGroups")), e.getRightFooterGroups = K(() => [e.getRightHeaderGroups()], (t) => [...t].reverse(), J(e.options, ke, "getRightFooterGroups")), e.getFlatHeaders = K(() => [e.getHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, ke, "getFlatHeaders")), e.getLeftFlatHeaders = K(() => [e.getLeftHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, ke, "getLeftFlatHeaders")), e.getCenterFlatHeaders = K(() => [e.getCenterHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, ke, "getCenterFlatHeaders")), e.getRightFlatHeaders = K(() => [e.getRightHeaderGroups()], (t) => t.map((n) => n.headers).flat(), J(e.options, ke, "getRightFlatHeaders")), e.getCenterLeafHeaders = K(() => [e.getCenterFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), J(e.options, ke, "getCenterLeafHeaders")), e.getLeftLeafHeaders = K(() => [e.getLeftFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), J(e.options, ke, "getLeftLeafHeaders")), e.getRightLeafHeaders = K(() => [e.getRightFlatHeaders()], (t) => t.filter((n) => {
      var r;
      return !((r = n.subHeaders) != null && r.length);
    }), J(e.options, ke, "getRightLeafHeaders")), e.getLeafHeaders = K(() => [e.getLeftHeaderGroups(), e.getCenterHeaderGroups(), e.getRightHeaderGroups()], (t, n, r) => {
      var o, i, s, a, u, c;
      return [...(o = (i = t[0]) == null ? void 0 : i.headers) != null ? o : [], ...(s = (a = n[0]) == null ? void 0 : a.headers) != null ? s : [], ...(u = (c = r[0]) == null ? void 0 : c.headers) != null ? u : []].map((d) => d.getLeafHeaders()).flat();
    }, J(e.options, ke, "getLeafHeaders"));
  }
};
function Gn(e, t, n, r) {
  var o, i;
  let s = 0;
  const a = function(p, f) {
    f === void 0 && (f = 1), s = Math.max(s, f), p.filter((h) => h.getIsVisible()).forEach((h) => {
      var m;
      (m = h.columns) != null && m.length && a(h.columns, f + 1);
    }, 0);
  };
  a(e);
  let u = [];
  const c = (p, f) => {
    const h = {
      depth: f,
      id: [r, `${f}`].filter(Boolean).join("_"),
      headers: []
    }, m = [];
    p.forEach((v) => {
      const w = [...m].reverse()[0], P = v.column.depth === h.depth;
      let y, S = !1;
      if (P && v.column.parent ? y = v.column.parent : (y = v.column, S = !0), w && (w == null ? void 0 : w.column) === y)
        w.subHeaders.push(v);
      else {
        const b = as(n, y, {
          id: [r, f, y.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: S,
          placeholderId: S ? `${m.filter((E) => E.column === y).length}` : void 0,
          depth: f,
          index: m.length
        });
        b.subHeaders.push(v), m.push(b);
      }
      h.headers.push(v), v.headerGroup = h;
    }), u.push(h), f > 0 && c(m, f - 1);
  }, d = t.map((p, f) => as(n, p, {
    depth: s,
    index: f
  }));
  c(d, s - 1), u.reverse();
  const g = (p) => p.filter((h) => h.column.getIsVisible()).map((h) => {
    let m = 0, v = 0, w = [0];
    h.subHeaders && h.subHeaders.length ? (w = [], g(h.subHeaders).forEach((y) => {
      let {
        colSpan: S,
        rowSpan: b
      } = y;
      m += S, w.push(b);
    })) : m = 1;
    const P = Math.min(...w);
    return v = v + P, h.colSpan = m, h.rowSpan = v, {
      colSpan: m,
      rowSpan: v
    };
  });
  return g((o = (i = u[0]) == null ? void 0 : i.headers) != null ? o : []), u;
}
const Va = (e, t, n, r, o, i, s) => {
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
    getLeafRows: () => Fa(a.subRows, (u) => u.subRows),
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
    getAllCells: K(() => [e.getAllLeafColumns()], (u) => u.map((c) => Nm(e, a, c, c.id)), J(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: K(() => [a.getAllCells()], (u) => u.reduce((c, d) => (c[d.column.id] = d, c), {}), J(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let u = 0; u < e._features.length; u++) {
    const c = e._features[u];
    c == null || c.createRow == null || c.createRow(a, e);
  }
  return a;
}, Mm = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, La = (e, t, n) => {
  var r;
  const o = n.toLowerCase();
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(o));
};
La.autoRemove = (e) => Ke(e);
const Ba = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
Ba.autoRemove = (e) => Ke(e);
const ja = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
ja.autoRemove = (e) => Ke(e);
const za = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
za.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Ha = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Ha.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Ga = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Ga.autoRemove = (e) => Ke(e) || !(e != null && e.length);
const Ua = (e, t, n) => e.getValue(t) === n;
Ua.autoRemove = (e) => Ke(e);
const qa = (e, t, n) => e.getValue(t) == n;
qa.autoRemove = (e) => Ke(e);
const zo = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
zo.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, s = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const a = i;
    i = s, s = a;
  }
  return [i, s];
};
zo.autoRemove = (e) => Ke(e) || Ke(e[0]) && Ke(e[1]);
const ot = {
  includesString: La,
  includesStringSensitive: Ba,
  equalsString: ja,
  arrIncludes: za,
  arrIncludesAll: Ha,
  arrIncludesSome: Ga,
  equals: Ua,
  weakEquals: qa,
  inNumberRange: zo
};
function Ke(e) {
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
    onColumnFiltersChange: ze("columnFilters", e),
    filterFromLeafRows: !1,
    maxLeafRowFilterDepth: 100
  }),
  createColumn: (e, t) => {
    e.getAutoFilterFn = () => {
      const n = t.getCoreRowModel().flatRows[0], r = n == null ? void 0 : n.getValue(e.id);
      return typeof r == "string" ? ot.includesString : typeof r == "number" ? ot.inNumberRange : typeof r == "boolean" || r !== null && typeof r == "object" ? ot.equals : Array.isArray(r) ? ot.arrIncludes : ot.weakEquals;
    }, e.getFilterFn = () => {
      var n, r;
      return wr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
        // @ts-ignore
        (n = (r = t.options.filterFns) == null ? void 0 : r[e.columnDef.filterFn]) != null ? n : ot[e.columnDef.filterFn]
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
        const o = e.getFilterFn(), i = r == null ? void 0 : r.find((d) => d.id === e.id), s = mt(n, i ? i.value : void 0);
        if (ls(o, s, e)) {
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
        return (i = mt(t, o)) == null ? void 0 : i.filter((s) => {
          const a = n.find((u) => u.id === s.id);
          if (a) {
            const u = a.getFilterFn();
            if (ls(u, s.value, a))
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
function ls(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const Am = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), Dm = (e, t, n) => {
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
}, Vm = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Lm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n)
    return r / n;
}, Bm = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!Om(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, s) => i - s);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, jm = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), zm = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Hm = (e, t) => t.length, Br = {
  sum: Am,
  min: Dm,
  max: Fm,
  extent: Vm,
  mean: Lm,
  median: Bm,
  unique: jm,
  uniqueCount: zm,
  count: Hm
}, Gm = {
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
    onGroupingChange: ze("grouping", e),
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
function Um(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const qm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: ze("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = K((n) => [Sn(t, n)], (n) => n.findIndex((r) => r.id === e.id), J(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = Sn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = Sn(t, n);
      return ((r = o[o.length - 1]) == null ? void 0 : r.id) === e.id;
    };
  },
  createTable: (e) => {
    e.setColumnOrder = (t) => e.options.onColumnOrderChange == null ? void 0 : e.options.onColumnOrderChange(t), e.resetColumnOrder = (t) => {
      var n;
      e.setColumnOrder(t ? [] : (n = e.initialState.columnOrder) != null ? n : []);
    }, e._getOrderColumnsFn = K(() => [e.getState().columnOrder, e.getState().grouping, e.options.groupedColumnMode], (t, n, r) => (o) => {
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
      return Um(i, n, r);
    }, J(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, jr = () => ({
  left: [],
  right: []
}), Wm = {
  getInitialState: (e) => ({
    columnPinning: jr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnPinningChange: ze("columnPinning", e)
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
    e.getCenterVisibleCells = K(() => [e._getAllVisibleCells(), t.getState().columnPinning.left, t.getState().columnPinning.right], (n, r, o) => {
      const i = [...r ?? [], ...o ?? []];
      return n.filter((s) => !i.includes(s.column.id));
    }, J(t.options, "debugRows", "getCenterVisibleCells")), e.getLeftVisibleCells = K(() => [e._getAllVisibleCells(), t.getState().columnPinning.left], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
      ...i,
      position: "left"
    })), J(t.options, "debugRows", "getLeftVisibleCells")), e.getRightVisibleCells = K(() => [e._getAllVisibleCells(), t.getState().columnPinning.right], (n, r) => (r ?? []).map((i) => n.find((s) => s.column.id === i)).filter(Boolean).map((i) => ({
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
    }, e.getLeftLeafColumns = K(() => [e.getAllLeafColumns(), e.getState().columnPinning.left], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), J(e.options, "debugColumns", "getLeftLeafColumns")), e.getRightLeafColumns = K(() => [e.getAllLeafColumns(), e.getState().columnPinning.right], (t, n) => (n ?? []).map((r) => t.find((o) => o.id === r)).filter(Boolean), J(e.options, "debugColumns", "getRightLeafColumns")), e.getCenterLeafColumns = K(() => [e.getAllLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r) => {
      const o = [...n ?? [], ...r ?? []];
      return t.filter((i) => !o.includes(i.id));
    }, J(e.options, "debugColumns", "getCenterLeafColumns"));
  }
}, Un = {
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
}), Xm = {
  getDefaultColumnDef: () => Un,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: zr(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    columnResizeMode: "onEnd",
    columnResizeDirection: "ltr",
    onColumnSizingChange: ze("columnSizing", e),
    onColumnSizingInfoChange: ze("columnSizingInfo", e)
  }),
  createColumn: (e, t) => {
    e.getSize = () => {
      var n, r, o;
      const i = t.getState().columnSizing[e.id];
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : Un.minSize, (r = i ?? e.columnDef.size) != null ? r : Un.size), (o = e.columnDef.maxSize) != null ? o : Un.maxSize);
    }, e.getStart = K((n) => [n, Sn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), J(t.options, "debugColumns", "getStart")), e.getAfter = K((n) => [n, Sn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), J(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        const s = e.getSize(), a = e ? e.getLeafHeaders().map((w) => [w.column.id, w.column.getSize()]) : [[r.id, r.getSize()]], u = Hr(i) ? Math.round(i.touches[0].clientX) : i.clientX, c = {}, d = (w, P) => {
          typeof P == "number" && (t.setColumnSizingInfo((y) => {
            var S, b;
            const E = t.options.columnResizeDirection === "rtl" ? -1 : 1, $ = (P - ((S = y == null ? void 0 : y.startOffset) != null ? S : 0)) * E, A = Math.max($ / ((b = y == null ? void 0 : y.startSize) != null ? b : 0), -0.999999);
            return y.columnSizingStart.forEach((D) => {
              let [B, N] = D;
              c[B] = Math.round(Math.max(N + N * A, 0) * 100) / 100;
            }), {
              ...y,
              deltaOffset: $,
              deltaPercentage: A
            };
          }), (t.options.columnResizeMode === "onChange" || w === "end") && t.setColumnSizing((y) => ({
            ...y,
            ...c
          })));
        }, g = (w) => d("move", w), p = (w) => {
          d("end", w), t.setColumnSizingInfo((P) => ({
            ...P,
            isResizingColumn: !1,
            startOffset: null,
            startSize: null,
            deltaOffset: null,
            deltaPercentage: null,
            columnSizingStart: []
          }));
        }, f = n || typeof document < "u" ? document : null, h = {
          moveHandler: (w) => g(w.clientX),
          upHandler: (w) => {
            f == null || f.removeEventListener("mousemove", h.moveHandler), f == null || f.removeEventListener("mouseup", h.upHandler), p(w.clientX);
          }
        }, m = {
          moveHandler: (w) => (w.cancelable && (w.preventDefault(), w.stopPropagation()), g(w.touches[0].clientX), !1),
          upHandler: (w) => {
            var P;
            f == null || f.removeEventListener("touchmove", m.moveHandler), f == null || f.removeEventListener("touchend", m.upHandler), w.cancelable && (w.preventDefault(), w.stopPropagation()), p((P = w.touches[0]) == null ? void 0 : P.clientX);
          }
        }, v = Ym() ? {
          passive: !1
        } : !1;
        Hr(i) ? (f == null || f.addEventListener("touchmove", m.moveHandler, v), f == null || f.addEventListener("touchend", m.upHandler, v)) : (f == null || f.addEventListener("mousemove", h.moveHandler, v), f == null || f.addEventListener("mouseup", h.upHandler, v)), t.setColumnSizingInfo((w) => ({
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
let qn = null;
function Ym() {
  if (typeof qn == "boolean")
    return qn;
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
  return qn = e, qn;
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
    onColumnVisibilityChange: ze("columnVisibility", e)
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
    e._getAllVisibleCells = K(() => [e.getAllCells(), t.getState().columnVisibility], (n) => n.filter((r) => r.column.getIsVisible()), J(t.options, "debugRows", "_getAllVisibleCells")), e.getVisibleCells = K(() => [e.getLeftVisibleCells(), e.getCenterVisibleCells(), e.getRightVisibleCells()], (n, r, o) => [...n, ...r, ...o], J(t.options, "debugRows", "getVisibleCells"));
  },
  createTable: (e) => {
    const t = (n, r) => K(() => [r(), r().filter((o) => o.getIsVisible()).map((o) => o.id).join("_")], (o) => o.filter((i) => i.getIsVisible == null ? void 0 : i.getIsVisible()), J(e.options, "debugColumns", n));
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
function Sn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Jm = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Zm = {
  getInitialState: (e) => ({
    globalFilter: void 0,
    ...e
  }),
  getDefaultOptions: (e) => ({
    onGlobalFilterChange: ze("globalFilter", e),
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
    e.getGlobalAutoFilterFn = () => ot.includesString, e.getGlobalFilterFn = () => {
      var t, n;
      const {
        globalFilterFn: r
      } = e.options;
      return wr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : ot[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, Qm = {
  getInitialState: (e) => ({
    expanded: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onExpandedChange: ze("expanded", e),
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
}, uo = 0, co = 10, Gr = () => ({
  pageIndex: uo,
  pageSize: co
}), eh = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Gr(),
      ...e == null ? void 0 : e.pagination
    }
  }),
  getDefaultOptions: (e) => ({
    onPaginationChange: ze("pagination", e)
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
      const o = (i) => mt(r, i);
      return e.options.onPaginationChange == null ? void 0 : e.options.onPaginationChange(o);
    }, e.resetPagination = (r) => {
      var o;
      e.setPagination(r ? Gr() : (o = e.initialState.pagination) != null ? o : Gr());
    }, e.setPageIndex = (r) => {
      e.setPagination((o) => {
        let i = mt(r, o.pageIndex);
        const s = typeof e.options.pageCount > "u" || e.options.pageCount === -1 ? Number.MAX_SAFE_INTEGER : e.options.pageCount - 1;
        return i = Math.max(0, Math.min(i, s)), {
          ...o,
          pageIndex: i
        };
      });
    }, e.resetPageIndex = (r) => {
      var o, i;
      e.setPageIndex(r ? uo : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : uo);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? co : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : co);
    }, e.setPageSize = (r) => {
      e.setPagination((o) => {
        const i = Math.max(1, mt(r, o.pageSize)), s = o.pageSize * o.pageIndex, a = Math.floor(s / i);
        return {
          ...o,
          pageIndex: a,
          pageSize: i
        };
      });
    }, e.setPageCount = (r) => e.setPagination((o) => {
      var i;
      let s = mt(r, (i = e.options.pageCount) != null ? i : -1);
      return typeof s == "number" && (s = Math.max(-1, s)), {
        ...o,
        pageCount: s
      };
    }), e.getPageOptions = K(() => [e.getPageCount()], (r) => {
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
}), th = {
  getInitialState: (e) => ({
    rowPinning: Ur(),
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowPinningChange: ze("rowPinning", e)
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
          var g, p;
          return {
            top: ((g = u == null ? void 0 : u.top) != null ? g : []).filter((m) => !(a != null && a.has(m))),
            bottom: [...((p = u == null ? void 0 : u.bottom) != null ? p : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)]
          };
        }
        if (n === "top") {
          var f, h;
          return {
            top: [...((f = u == null ? void 0 : u.top) != null ? f : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)],
            bottom: ((h = u == null ? void 0 : u.bottom) != null ? h : []).filter((m) => !(a != null && a.has(m)))
          };
        }
        return {
          top: ((c = u == null ? void 0 : u.top) != null ? c : []).filter((m) => !(a != null && a.has(m))),
          bottom: ((d = u == null ? void 0 : u.bottom) != null ? d : []).filter((m) => !(a != null && a.has(m)))
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
    }, e._getPinnedRows = K((t) => [e.getRowModel().rows, e.getState().rowPinning[t], t], (t, n, r) => {
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
    }, J(e.options, "debugRows", "_getPinnedRows")), e.getTopRows = () => e._getPinnedRows("top"), e.getBottomRows = () => e._getPinnedRows("bottom"), e.getCenterRows = K(() => [e.getRowModel().rows, e.getState().rowPinning.top, e.getState().rowPinning.bottom], (t, n, r) => {
      const o = /* @__PURE__ */ new Set([...n ?? [], ...r ?? []]);
      return t.filter((i) => !o.has(i.id));
    }, J(e.options, "debugRows", "getCenterRows"));
  }
}, nh = {
  getInitialState: (e) => ({
    rowSelection: {},
    ...e
  }),
  getDefaultOptions: (e) => ({
    onRowSelectionChange: ze("rowSelection", e),
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
        po(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = K(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = K(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = K(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? qr(e, n) : {
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
        return po(a, e.id, n, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, t), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Ho(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return fo(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return fo(e, n) === "all";
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
}, po = (e, t, n, r, o) => {
  var i;
  const s = o.getRow(t, !0);
  n ? (s.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), s.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((a) => po(e, a.id, n, r, o));
};
function qr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(s, a) {
    return s.map((u) => {
      var c;
      const d = Ho(u, n);
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
function Ho(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function fo(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length))
    return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (Ho(s, t) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const a = fo(s, t);
      a === "all" ? i = !0 : (a === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const go = /([0-9]+)/gm, rh = (e, t, n) => Wa(vt(e.getValue(n)).toLowerCase(), vt(t.getValue(n)).toLowerCase()), oh = (e, t, n) => Wa(vt(e.getValue(n)), vt(t.getValue(n))), ih = (e, t, n) => Go(vt(e.getValue(n)).toLowerCase(), vt(t.getValue(n)).toLowerCase()), sh = (e, t, n) => Go(vt(e.getValue(n)), vt(t.getValue(n))), ah = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, lh = (e, t, n) => Go(e.getValue(n), t.getValue(n));
function Go(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function vt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Wa(e, t) {
  const n = e.split(go).filter(Boolean), r = t.split(go).filter(Boolean);
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
const pn = {
  alphanumeric: rh,
  alphanumericCaseSensitive: oh,
  text: ih,
  textCaseSensitive: sh,
  datetime: ah,
  basic: lh
}, uh = {
  getInitialState: (e) => ({
    sorting: [],
    ...e
  }),
  getDefaultColumnDef: () => ({
    sortingFn: "auto",
    sortUndefined: 1
  }),
  getDefaultOptions: (e) => ({
    onSortingChange: ze("sorting", e),
    isMultiSortEvent: (t) => t.shiftKey
  }),
  createColumn: (e, t) => {
    e.getAutoSortingFn = () => {
      const n = t.getFilteredRowModel().flatRows.slice(10);
      let r = !1;
      for (const o of n) {
        const i = o == null ? void 0 : o.getValue(e.id);
        if (Object.prototype.toString.call(i) === "[object Date]")
          return pn.datetime;
        if (typeof i == "string" && (r = !0, i.split(go).length > 1))
          return pn.alphanumeric;
      }
      return r ? pn.text : pn.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return wr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : pn[e.columnDef.sortingFn];
    }, e.toggleSorting = (n, r) => {
      const o = e.getNextSortingOrder(), i = typeof n < "u" && n !== null;
      t.setSorting((s) => {
        const a = s == null ? void 0 : s.find((f) => f.id === e.id), u = s == null ? void 0 : s.findIndex((f) => f.id === e.id);
        let c = [], d, g = i ? n : o === "desc";
        if (s != null && s.length && e.getCanMultiSort() && r ? a ? d = "toggle" : d = "add" : s != null && s.length && u !== s.length - 1 ? d = "replace" : a ? d = "toggle" : d = "replace", d === "toggle" && (i || o || (d = "remove")), d === "add") {
          var p;
          c = [...s, {
            id: e.id,
            desc: g
          }], c.splice(0, c.length - ((p = t.options.maxMultiSortColCount) != null ? p : Number.MAX_SAFE_INTEGER));
        } else
          d === "toggle" ? c = s.map((f) => f.id === e.id ? {
            ...f,
            desc: g
          } : f) : d === "remove" ? c = s.filter((f) => f.id !== e.id) : c = [{
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
}, ch = [
  _m,
  Km,
  qm,
  Wm,
  Mm,
  Im,
  Jm,
  //depends on ColumnFaceting
  Zm,
  //depends on ColumnFiltering
  uh,
  Gm,
  //depends on RowSorting
  Qm,
  eh,
  th,
  nh,
  Xm
];
function dh(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...ch, ...(t = e._features) != null ? t : []];
  let o = {
    _features: r
  };
  const i = o._features.reduce((p, f) => Object.assign(p, f.getDefaultOptions == null ? void 0 : f.getDefaultOptions(o)), {}), s = (p) => o.options.mergeOptions ? o.options.mergeOptions(i, p) : {
    ...i,
    ...p
  };
  let u = {
    ...{},
    ...(n = e.initialState) != null ? n : {}
  };
  o._features.forEach((p) => {
    var f;
    u = (f = p.getInitialState == null ? void 0 : p.getInitialState(u)) != null ? f : u;
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
    _queue: (p) => {
      c.push(p), d || (d = !0, Promise.resolve().then(() => {
        for (; c.length; )
          c.shift()();
        d = !1;
      }).catch((f) => setTimeout(() => {
        throw f;
      })));
    },
    reset: () => {
      o.setState(o.initialState);
    },
    setOptions: (p) => {
      const f = mt(p, o.options);
      o.options = s(f);
    },
    getState: () => o.options.state,
    setState: (p) => {
      o.options.onStateChange == null || o.options.onStateChange(p);
    },
    _getRowId: (p, f, h) => {
      var m;
      return (m = o.options.getRowId == null ? void 0 : o.options.getRowId(p, f, h)) != null ? m : `${h ? [h.id, f].join(".") : f}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (p, f) => {
      let h = (f ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[p];
      if (!h && (h = o.getCoreRowModel().rowsById[p], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${p}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: K(() => [o.options.defaultColumn], (p) => {
      var f;
      return p = (f = p) != null ? f : {}, {
        header: (h) => {
          const m = h.header.column.columnDef;
          return m.accessorKey ? m.accessorKey : m.accessorFn ? m.id : null;
        },
        // footer: props => props.header.column.id,
        cell: (h) => {
          var m, v;
          return (m = (v = h.renderValue()) == null || v.toString == null ? void 0 : v.toString()) != null ? m : null;
        },
        ...o._features.reduce((h, m) => Object.assign(h, m.getDefaultColumnDef == null ? void 0 : m.getDefaultColumnDef()), {}),
        ...p
      };
    }, J(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: K(() => [o._getColumnDefs()], (p) => {
      const f = function(h, m, v) {
        return v === void 0 && (v = 0), h.map((w) => {
          const P = $m(o, w, v, m), y = w;
          return P.columns = y.columns ? f(y.columns, P, v + 1) : [], P;
        });
      };
      return f(p);
    }, J(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: K(() => [o.getAllColumns()], (p) => p.flatMap((f) => f.getFlatColumns()), J(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: K(() => [o.getAllFlatColumns()], (p) => p.reduce((f, h) => (f[h.id] = h, f), {}), J(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: K(() => [o.getAllColumns(), o._getOrderColumnsFn()], (p, f) => {
      let h = p.flatMap((m) => m.getLeafColumns());
      return f(h);
    }, J(e, "debugColumns", "getAllLeafColumns")),
    getColumn: (p) => {
      const f = o._getAllFlatColumnsById()[p];
      return process.env.NODE_ENV !== "production" && !f && console.error(`[Table] Column with id '${p}' does not exist.`), f;
    }
  };
  Object.assign(o, g);
  for (let p = 0; p < o._features.length; p++) {
    const f = o._features[p];
    f == null || f.createTable == null || f.createTable(o);
  }
  return o;
}
function ph() {
  return (e) => K(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const a = [];
      for (let c = 0; c < o.length; c++) {
        const d = Va(e, e._getRowId(o[c], c, s), o[c], c, i, void 0, s == null ? void 0 : s.id);
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
function fh() {
  return (e) => K(() => [e.getState().expanded, e.getPreExpandedRowModel(), e.options.paginateExpandedRows], (t, n, r) => !n.rows.length || t !== !0 && !Object.keys(t ?? {}).length || !r ? n : gh(n), J(e.options, "debugTable", "getExpandedRowModel"));
}
function gh(e) {
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
function mh() {
  return (e) => K(() => [e.getState().grouping, e.getPreGroupedRowModel()], (t, n) => {
    if (!n.rows.length || !t.length)
      return n;
    const r = t.filter((u) => e.getColumn(u)), o = [], i = {}, s = function(u, c, d) {
      if (c === void 0 && (c = 0), c >= r.length)
        return u.map((h) => (h.depth = c, o.push(h), i[h.id] = h, h.subRows && (h.subRows = s(h.subRows, c + 1, h.id)), h));
      const g = r[c], p = hh(u, g);
      return Array.from(p.entries()).map((h, m) => {
        let [v, w] = h, P = `${g}:${v}`;
        P = d ? `${d}>${P}` : P;
        const y = s(w, c + 1, P), S = c ? Fa(w, (E) => E.subRows) : w, b = Va(e, P, S[0].original, m, c, void 0, d);
        return Object.assign(b, {
          groupingColumnId: g,
          groupingValue: v,
          subRows: y,
          leafRows: S,
          getValue: (E) => {
            if (r.includes(E)) {
              if (b._valuesCache.hasOwnProperty(E))
                return b._valuesCache[E];
              if (w[0]) {
                var $;
                b._valuesCache[E] = ($ = w[0].getValue(E)) != null ? $ : void 0;
              }
              return b._valuesCache[E];
            }
            if (b._groupingValuesCache.hasOwnProperty(E))
              return b._groupingValuesCache[E];
            const A = e.getColumn(E), D = A == null ? void 0 : A.getAggregationFn();
            if (D)
              return b._groupingValuesCache[E] = D(E, S, w), b._groupingValuesCache[E];
          }
        }), y.forEach((E) => {
          o.push(E), i[E.id] = E;
        }), b;
      });
    }, a = s(n.rows, 0);
    return a.forEach((u) => {
      o.push(u), i[u.id] = u;
    }), {
      rows: a,
      flatRows: o,
      rowsById: i
    };
  }, J(e.options, "debugTable", "getGroupedRowModel", () => {
    e._queue(() => {
      e._autoResetExpanded(), e._autoResetPageIndex();
    });
  }));
}
function hh(e, t) {
  const n = /* @__PURE__ */ new Map();
  return e.reduce((r, o) => {
    const i = `${o.getGroupingValue(t)}`, s = r.get(i);
    return s ? s.push(o) : r.set(i, [o]), r;
  }, n);
}
function vh() {
  return (e) => K(() => [e.getState().sorting, e.getPreSortedRowModel()], (t, n) => {
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
        for (let f = 0; f < i.length; f += 1) {
          var p;
          const h = i[f], m = s[h.id], v = m.sortUndefined, w = (p = h == null ? void 0 : h.desc) != null ? p : !1;
          let P = 0;
          if (v) {
            const y = d.getValue(h.id), S = g.getValue(h.id), b = y === void 0, E = S === void 0;
            if (b || E) {
              if (v === "first")
                return b ? -1 : 1;
              if (v === "last")
                return b ? 1 : -1;
              P = b && E ? 0 : b ? v : -v;
            }
          }
          if (P === 0 && (P = m.sortingFn(d, g, h.id)), P !== 0)
            return w && (P *= -1), m.invertSorting && (P *= -1), P;
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
function Wr(e, t) {
  return e ? bh(e) ? /* @__PURE__ */ C.createElement(e, t) : e : null;
}
function bh(e) {
  return wh(e) || typeof e == "function" || yh(e);
}
function wh(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function yh(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function xh(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = C.useState(() => ({
    current: dh(t)
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
const Sh = ye.Root, Ch = ye.Group, Eh = ye.Value, Xa = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ie(
  ye.Trigger,
  {
    ref: r,
    className: ee(
      /* The default installed version of SelectTrigger included pr-w-full, but UX (Alex) says that's not desirable. */
      "pr-flex pr-h-10 pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ x(ye.Icon, { asChild: !0, children: /* @__PURE__ */ x(fs, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Xa.displayName = ye.Trigger.displayName;
const Ya = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ye.ScrollUpButton,
  {
    ref: n,
    className: ee("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ x(Tl, { className: "pr-h-4 pr-w-4" })
  }
));
Ya.displayName = ye.ScrollUpButton.displayName;
const Ka = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ye.ScrollDownButton,
  {
    ref: n,
    className: ee("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ x(fs, { className: "pr-h-4 pr-w-4" })
  }
));
Ka.displayName = ye.ScrollDownButton.displayName;
const Ja = C.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ x(ye.Portal, { children: /* @__PURE__ */ ie(
  ye.Content,
  {
    ref: o,
    className: ee(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ x(Ya, {}),
      /* @__PURE__ */ x(
        ye.Viewport,
        {
          className: ee(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ x(Ka, {})
    ]
  }
) }));
Ja.displayName = ye.Content.displayName;
const Rh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ye.Label,
  {
    ref: n,
    className: ee("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Rh.displayName = ye.Label.displayName;
const Za = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ie(
  ye.Item,
  {
    ref: r,
    className: ee(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(ye.ItemIndicator, { children: /* @__PURE__ */ x(ps, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ x(ye.ItemText, { children: t })
    ]
  }
));
Za.displayName = ye.Item.displayName;
const kh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ye.Separator,
  {
    ref: n,
    className: ee("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
kh.displayName = ye.Separator.displayName;
const Qa = C.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ x("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ x(
    "table",
    {
      ref: n,
      className: ee("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Qa.displayName = "Table";
const el = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x("thead", { ref: n, className: ee("[&_tr]:pr-border-b", e), ...t }));
el.displayName = "TableHeader";
const tl = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x("tbody", { ref: n, className: ee("[&_tr:last-child]:pr-border-0", e), ...t }));
tl.displayName = "TableBody";
const Th = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  "tfoot",
  {
    ref: n,
    className: ee("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Th.displayName = "TableFooter";
const mo = C.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ x(
    "tr",
    {
      ref: n,
      className: ee(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
mo.displayName = "TableRow";
const nl = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  "th",
  {
    ref: n,
    className: ee(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
nl.displayName = "TableHead";
const rl = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  "td",
  {
    ref: n,
    className: ee("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
rl.displayName = "TableCell";
const Ph = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  "caption",
  {
    ref: n,
    className: ee("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Ph.displayName = "TableCaption";
const Ht = "scrBook", Oh = "scrRef", hn = "source", Nh = "details", $h = "Scripture Reference", _h = "Scripture Book", ol = "Type", Mh = "Details";
function Ih(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${ue.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: Ht,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? $h,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ue.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === Ht ? Rr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Yr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Rr(r.start),
      id: Oh,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Rr(o.start);
      },
      sortingFn: (r, o) => Yr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => typeof r.source == "object" && "displayName" in r.source ? r.source.displayName : r.source,
      id: hn,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? ol : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Nh,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Mh,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function pv({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: s,
  onRowSelected: a
}) {
  const [u, c] = Ce([]), [d, g] = Ce([{ id: Ht, desc: !1 }]), [p, f] = Ce(() => e.flatMap((R) => {
    const k = R.src;
    return R.data.map((_) => ({
      ..._,
      source: k
    }));
  })), [h, m] = Ce({});
  ht(() => {
    f(() => e.flatMap((R) => {
      const k = R.src;
      return R.data.map((_) => ({
        ..._,
        source: k
      }));
    }));
  }, [e]);
  const v = Jt(
    () => Ih(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [r, i, s, n]
  );
  function w(R) {
    return R.bookNum * 1e6 + R.chapterNum * 1e3 + R.verseNum;
  }
  const P = Te(
    (R, k) => !k || Yr(R, k) === 0 ? `${w(R)}` : `${w(R)}-${w(k)}`,
    []
  ), y = Te(
    (R) => `${P(R.start, R.end)} ${R.source} ${R.detail}`,
    [P]
  ), S = xh({
    data: p,
    columns: v,
    state: {
      grouping: u,
      sorting: d,
      rowSelection: h
    },
    onGroupingChange: c,
    onSortingChange: g,
    onRowSelectionChange: m,
    getExpandedRowModel: fh(),
    getGroupedRowModel: mh(),
    getCoreRowModel: ph(),
    getSortedRowModel: vh(),
    getRowId: y,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  ht(() => {
    if (a) {
      const R = S.getSelectedRowModel().rowsById, k = Object.keys(R);
      if (k.length === 1) {
        const _ = p.find((V) => y(V) === k[0]) || void 0;
        _ && a(_);
      }
    }
  }, [h, p, y, a, S]);
  const b = o ?? _h, E = i ?? ol, $ = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${b}`, value: [Ht] },
    { label: `Group by ${E}`, value: [hn] },
    {
      label: `Group by ${b} and ${E}`,
      value: [Ht, hn]
    },
    {
      label: `Group by ${E} and ${b}`,
      value: [hn, Ht]
    }
  ], A = (R) => {
    c(JSON.parse(R));
  }, D = (R, k) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(k);
  }, B = (R, k) => R.getIsGrouped() ? "" : ee("banded-row", k % 2 === 0 ? "even" : "odd"), N = (R, k, _) => {
    if (!((R == null ? void 0 : R.length) === 0 || k.depth < _.column.getGroupedIndex())) {
      if (k.getIsGrouped())
        switch (k.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (k.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ ie("div", { className: "pr-twp pr-w-full", children: [
    !t && /* @__PURE__ */ ie(
      Sh,
      {
        value: JSON.stringify(u),
        onValueChange: (R) => {
          A(R);
        },
        children: [
          /* @__PURE__ */ x(Xa, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ x(Eh, {}) }),
          /* @__PURE__ */ x(Ja, { position: "item-aligned", children: /* @__PURE__ */ x(Ch, { children: $.map((R) => /* @__PURE__ */ x(Za, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ ie(Qa, { className: "pr-p-0", children: [
      t && /* @__PURE__ */ x(el, { children: S.getHeaderGroups().map((R) => /* @__PURE__ */ x(mo, { children: R.headers.filter((k) => k.column.columnDef.header).map((k) => /* @__PURE__ */ x(nl, { colSpan: k.colSpan, children: k.isPlaceholder ? void 0 : /* @__PURE__ */ ie("div", { children: [
        k.column.getCanGroup() ? /* @__PURE__ */ x(
          it,
          {
            variant: "ghost",
            title: `Toggle grouping by ${k.column.columnDef.header}`,
            onClick: k.column.getToggleGroupingHandler(),
            type: "button",
            children: k.column.getIsGrouped() ? `🛑(${k.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        Wr(k.column.columnDef.header, k.getContext())
      ] }) }, k.id)) }, R.id)) }),
      /* @__PURE__ */ x(tl, { children: S.getRowModel().rows.map((R, k) => /* @__PURE__ */ x(
        mo,
        {
          "data-state": R.getIsSelected() ? "selected" : "",
          className: ee(B(R, k)),
          onClick: (_) => D(R, _),
          children: R.getVisibleCells().map((_) => {
            if (!(_.getIsPlaceholder() || _.column.columnDef.enableGrouping && !_.getIsGrouped() && (_.column.columnDef.id !== hn || !n)))
              return /* @__PURE__ */ x(
                rl,
                {
                  className: ee(
                    _.column.columnDef.id,
                    "pr-p-[1px]",
                    N(u, R, _)
                  ),
                  children: (() => _.getIsGrouped() ? /* @__PURE__ */ ie(
                    it,
                    {
                      variant: "ghost",
                      onClick: R.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        R.getIsExpanded() ? "👇" : "👉",
                        " ",
                        Wr(_.column.columnDef.cell, _.getContext()),
                        " (",
                        R.subRows.length,
                        ")"
                      ]
                    }
                  ) : Wr(_.column.columnDef.cell, _.getContext()))()
                },
                _.id
              );
          })
        },
        R.id
      )) })
    ] })
  ] });
}
function fv({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = Ce(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ x(
    ir,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  );
}
function gv({
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
  onChangeCommitted: p
}) {
  return /* @__PURE__ */ x(
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
      onChangeCommitted: p
    }
  );
}
function mv({
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
  return /* @__PURE__ */ x(
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
function hv({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ x(
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
function us({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ x(ir, { defaultValue: t[n.key], onChange: r })
  );
}
const Ah = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ x(
  Ps,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function vv({
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
  rowKeyGetter: p,
  rowHeight: f = 35,
  headerRowHeight: h = 35,
  selectedRows: m,
  onSelectedRowsChange: v,
  onRowsChange: w,
  onCellClick: P,
  onCellDoubleClick: y,
  onCellContextMenu: S,
  onCellKeyDown: b,
  direction: E = "ltr",
  enableVirtualization: $ = !0,
  onCopy: A,
  onPaste: D,
  onScroll: B,
  className: N,
  "data-testid": R
}) {
  const k = Jt(() => {
    const _ = e.map((V) => typeof V.editable == "function" ? {
      ...V,
      editable: (j) => !!V.editable(j),
      renderEditCell: V.renderEditCell || us
    } : V.editable && !V.renderEditCell ? { ...V, renderEditCell: us } : V.renderEditCell && !V.editable ? { ...V, editable: !1 } : V);
    return d ? [{ ...Kl, minWidth: g }, ..._] : _;
  }, [e, d, g]);
  return /* @__PURE__ */ x(
    Yl,
    {
      columns: k,
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
      rowKeyGetter: p,
      rowHeight: f,
      headerRowHeight: h,
      selectedRows: m,
      onSelectedRowsChange: v,
      onRowsChange: w,
      onCellClick: P,
      onCellDoubleClick: y,
      onCellContextMenu: S,
      onCellKeyDown: b,
      direction: E,
      enableVirtualization: $,
      onCopy: A,
      onPaste: D,
      onScroll: B,
      renderers: { renderCheckbox: Ah },
      className: `papi-table ${N ?? "rdg-light"}`,
      "data-testid": R
    }
  );
}
function bv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = kt(void 0);
  return /* @__PURE__ */ x("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ x(Hl, { position: "static", id: r, children: /* @__PURE__ */ ie(Gl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ x(
      Tm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ x("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const wv = (e, t) => {
  ht(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Xr = () => !1, yv = (e, t) => {
  const [n] = lo(
    Te(async () => {
      if (!e)
        return Xr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Xr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  ht(() => () => {
    n !== Xr && n();
  }, [n]);
}, xv = De.Root, Dh = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.List,
  {
    ref: n,
    className: ee(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Dh.displayName = De.List.displayName;
const Fh = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.Trigger,
  {
    ref: n,
    className: ee(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Fh.displayName = De.Trigger.displayName;
const Vh = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.Content,
  {
    ref: n,
    className: ee(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Vh.displayName = De.Content.displayName;
const Lh = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.Root,
  {
    orientation: "vertical",
    ref: n,
    className: ee("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Lh.displayName = De.List.displayName;
const Bh = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.List,
  {
    ref: n,
    className: ee(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Bh.displayName = De.List.displayName;
const Sv = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.Trigger,
  {
    ref: n,
    ...t,
    className: ee(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), jh = ve.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  De.Content,
  {
    ref: n,
    className: ee(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
jh.displayName = De.Content.displayName;
function zh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
zh(`.papi-snackbar {
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.papi-table.paratext {
  background-color: darkgreen;
  color: greenyellow;
}

.papi-table.paratext.bright {
  color: darkgreen;
  background-color: greenyellow;
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

  /* using color palette https://supercolorpalette.com/?scp=G0-hsl-99827A-E7DDD0-FEF4E7-FEFAF1-FFFFFF-D8E9E3-719892-07463D-0A433D-083030-041616-000000-85DBB8-F2F52E-CD3737 */
  .paratext-light {
    --background: 0, 0%, 100%;
    --foreground: 0, 0%, 0%;
    --muted: 33.9, 32.4%, 86.1%;
    --muted-foreground: 15.5, 13.2%, 53.9%;
    --popover: 0, 0%, 100%;
    --popover-foreground: 0, 0%, 0%;
    --card: 0 0% 100%;
    --card-foreground: 0, 0%, 0%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
    --primary: 173.4, 82.1%, 15.3%;
    --primary-foreground: 40, 85.7%, 97.3%;
    --secondary: 161.3, 26.7%, 88.2%;
    --secondary-foreground: 173.4, 82.1%, 15.3%;
    --accent: 161.3, 26.7%, 88.2%;
    --accent-foreground: 173.4, 82.1%, 15.3%;
    --destructive: 0, 60%, 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5, 13.2%, 53.9%;

    /* work around for hsl(var(--xx) / 0.y) not working */
    /* stylelint-disable selector-class-pattern */
    .hover\\:pr-bg-primary\\/90:hover {
      background-color: hsl(173, 82%, 15%, 0.9);
    }

    .hover\\:pr-bg-secondary\\/80:hover {
      background-color: hsl(161, 26%, 88%, 0.8);
    }

    .hover\\:pr-bg-destructive\\/90:hover {
      background-color: hsl(0, 60%, 51%, 0.9);
    }

    .pr-bg-muted\\/50,
    .hover\\:pr-bg-muted\\/50:hover {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.5);
    }
  }

  .paratext-dark {
    --background: 0, 0%, 0%;
    --foreground: 0, 0%, 100%;
    --muted: 15.5, 13.2%, 53.9%;
    --muted-foreground: 33.9, 32.4%, 86.1%;
    --popover: 180, 71.4%, 5%;
    --popover-foreground: 0, 0%, 100%;
    --card: 0 0% 100%;
    --card-foreground: 224 71.4% 4.1%;
    --border: 220 13% 91%;
    --input: 161.3, 26.7%, 88.2%;
    --primary: 161.3, 26.7%, 88.2%;
    --primary-foreground: 173.4, 82.1%, 15.3%;
    --secondary: 180, 71.4%, 11%;
    --secondary-foreground: 161.3, 26.7%, 88.2%;
    --accent: 180, 71.4%, 11%;
    --accent-foreground: 161.3, 26.7%, 88.2%;
    --destructive: 0, 60%, 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5, 13.2%, 53.9%;

    /* work around for hsl(var(--xx) / 0.y) not working */
    .hover\\:pr-bg-primary\\/90:hover {
      background-color: hsl(161.3, 26.7%, 88.2%, 0.9);
    }

    .hover\\:pr-bg-secondary\\/80:hover {
      background-color: hsl(180, 71.4%, 11%, 0.8);
    }

    .hover\\:pr-bg-destructive\\/90:hover {
      background-color: hsl(0, 60%, 51%, 0.9);
    }

    .pr-bg-muted\\/50,
    .hover\\:pr-bg-muted\\/50:hover {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.5);
    }
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
.pr-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
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
.pr-mb-2 {
  margin-bottom: 0.5rem;
}
.pr-me-2 {
  margin-inline-end: 0.5rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-2 {
  margin-right: 0.5rem;
}
.pr-ms-5 {
  margin-inline-start: 1.25rem;
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
.pr-ps-12 {
  padding-inline-start: 3rem;
}
.pr-ps-4 {
  padding-inline-start: 1rem;
}
.pr-ps-8 {
  padding-inline-start: 2rem;
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
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
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
.pr-underline {
  text-decoration-line: underline;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
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
  it as Button,
  av as ChapterRangeSelector,
  Ps as Checkbox,
  lv as Checklist,
  Kr as ComboBox,
  uv as ContextMenu,
  uu as DropdownMenu,
  fu as DropdownMenuCheckboxItem,
  Rs as DropdownMenuContent,
  nv as DropdownMenuGroup,
  ks as DropdownMenuItem,
  wo as DropdownMenuLabel,
  rv as DropdownMenuPortal,
  iv as DropdownMenuRadioGroup,
  gu as DropdownMenuRadioItem,
  Ts as DropdownMenuSeparator,
  mu as DropdownMenuShortcut,
  ov as DropdownMenuSub,
  pu as DropdownMenuSubContent,
  du as DropdownMenuSubTrigger,
  cu as DropdownMenuTrigger,
  Ig as GridMenu,
  Tm as HamburgerMenuButton,
  cv as IconButton,
  yo as Input,
  Da as Label,
  jt as LabelPosition,
  Ca as MenuItem,
  dv as RefSelector,
  pv as ScriptureResultsViewer,
  fv as SearchBar,
  gv as Slider,
  mv as Snackbar,
  hv as Switch,
  vv as Table,
  xv as Tabs,
  Vh as TabsContent,
  Dh as TabsList,
  Fh as TabsTrigger,
  ir as TextField,
  bv as Toolbar,
  Lh as VerticalTabs,
  jh as VerticalTabsContent,
  Bh as VerticalTabsList,
  Sv as VerticalTabsTrigger,
  Tu as buttonVariants,
  wv as useEvent,
  yv as useEventAsync,
  lo as usePromise
};
//# sourceMappingURL=index.js.map
