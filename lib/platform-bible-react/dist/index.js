import sl, { jsxs as te, jsx as y, Fragment as nr } from "react/jsx-runtime";
import * as C from "react";
import Bt, { forwardRef as rs, useCallback as Ne, useState as Se, useRef as Ct, useEffect as Xt, useLayoutEffect as Qo, useMemo as rr } from "react";
import { getChaptersForBook as al } from "platform-bible-utils";
import * as we from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ll } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as ul, Check as os, Circle as cl, History as dl, ArrowDownWideNarrow as pl, Clock as fl, Bookmark as gl, ChevronDown as is, ChevronUp as ml, ArrowLeftIcon as hl, ChevronLeftIcon as vl, ChevronRightIcon as bl, ArrowRightIcon as yl, FilterIcon as wl } from "lucide-react";
import Te, { clsx as xl } from "clsx";
import { twMerge as Sl } from "tailwind-merge";
import { Slot as Cl } from "@radix-ui/react-slot";
import { cva as ss } from "class-variance-authority";
import { Autocomplete as El, TextField as Rl, FormControlLabel as ei, FormLabel as Tl, Checkbox as Pl, MenuItem as kl, ListItemText as Ol, ListItemIcon as as, Menu as _l, Grid as ls, List as $l, IconButton as us, Drawer as Nl, Paper as Ml, Slider as Il, Snackbar as Al, Switch as Fl, AppBar as Dl, Toolbar as Vl } from "@mui/material";
import Ll, { ThemeContext as Bl, internal_processStyles as jl } from "@mui/styled-engine";
import * as zl from "react-dom";
import In from "react-dom";
import * as cs from "@radix-ui/react-label";
import Hl, { SelectColumn as Gl } from "react-data-grid";
import * as ye from "@radix-ui/react-select";
var Ul = Object.defineProperty, ql = (e, t, n) => t in e ? Ul(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => (ql(e, typeof t != "symbol" ? t + "" : t, n), n);
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
], ao = [
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
], ds = [
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
], ti = nu();
function Kt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ti ? ti[e] : 0;
}
function lo(e) {
  return Kt(e) > 0;
}
function Wl(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return t >= 40 && t <= 66;
}
function Xl(e) {
  return (typeof e == "string" ? Kt(e) : e) <= 39;
}
function ps(e) {
  return e <= 66;
}
function Kl(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return ms(t) && !ps(t);
}
function* Yl() {
  for (let e = 1; e <= Rt.length; e++)
    yield e;
}
const Jl = 1, fs = Rt.length;
function Zl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function uo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Rt.length ? t : Rt[n];
}
function gs(e) {
  return e <= 0 || e > fs ? "******" : ds[e - 1];
}
function Ql(e) {
  return gs(Kt(e));
}
function ms(e) {
  const t = typeof e == "number" ? uo(e) : e;
  return lo(t) && !ao.includes(t);
}
function eu(e) {
  const t = typeof e == "number" ? uo(e) : e;
  return lo(t) && ao.includes(t);
}
function tu(e) {
  return ds[e - 1].includes("*obsolete*");
}
function nu() {
  const e = {};
  for (let t = 0; t < Rt.length; t++)
    e[Rt[t]] = t + 1;
  return e;
}
const ge = {
  allBookIds: Rt,
  nonCanonicalIds: ao,
  bookIdToNumber: Kt,
  isBookIdValid: lo,
  isBookNT: Wl,
  isBookOT: Xl,
  isBookOTNT: ps,
  isBookDC: Kl,
  allBookNumbers: Yl,
  firstBook: Jl,
  lastBook: fs,
  extraBooks: Zl,
  bookNumberToId: uo,
  bookNumberToEnglishName: gs,
  bookIdToEnglishName: Ql,
  isCanonical: ms,
  isExtraMaterial: eu,
  isObsolete: tu
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
let Dt = De;
function ni(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var hs = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(hs || {});
const $e = class le {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Dt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Dt ? n : void 0;
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
          const i = t instanceof Dt ? t : le.defaultVersification;
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
      if (r instanceof nn)
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
    return ge.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = ge.bookIdToNumber(t);
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
    if (t <= 0 || t > ge.lastBook)
      throw new nn(
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
    this.versification = this.versification != null ? new Dt(t) : void 0;
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
          this.versification = new Dt(dt[s]);
        } catch {
          throw new nn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new nn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ge.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(r[1]))
      throw new nn("Invalid reference : " + t);
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
    const o = [], i = ni(this._verse, r);
    for (const s of i.map((a) => ni(a, n))) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ge.lastBook ? 2 : (ge.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = ge.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe($e, "defaultVersification", Dt.English), oe($e, "verseRangeSeparator", "-"), oe($e, "verseSequenceIndicator", ","), oe($e, "verseRangeSeparators", [$e.verseRangeSeparator]), oe($e, "verseSequenceIndicators", [$e.verseSequenceIndicator]), oe($e, "chapterDigitShifter", 1e3), oe($e, "bookDigitShifter", $e.chapterDigitShifter * $e.chapterDigitShifter), oe($e, "bcvMaxValue", $e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe($e, "ValidStatusType", hs);
class nn extends Error {
}
function ie(...e) {
  return Sl(xl(e));
}
const vs = we.Root, ru = we.Trigger, ou = C.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ te(
  we.SubTrigger,
  {
    ref: o,
    className: ie(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ y(ul, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
ou.displayName = we.SubTrigger.displayName;
const iu = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  we.SubContent,
  {
    ref: n,
    className: ie(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
iu.displayName = we.SubContent.displayName;
const co = C.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ y(we.Portal, { children: /* @__PURE__ */ y(
  we.Content,
  {
    ref: r,
    sideOffset: t,
    className: ie(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
co.displayName = we.Content.displayName;
const bs = C.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  we.Item,
  {
    ref: r,
    className: ie(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
bs.displayName = we.Item.displayName;
const ys = C.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ te(
  we.CheckboxItem,
  {
    ref: o,
    className: ie(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(we.ItemIndicator, { children: /* @__PURE__ */ y(os, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
ys.displayName = we.CheckboxItem.displayName;
const su = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ te(
  we.RadioItem,
  {
    ref: r,
    className: ie(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(we.ItemIndicator, { children: /* @__PURE__ */ y(cl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
su.displayName = we.RadioItem.displayName;
const or = C.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ y(
  we.Label,
  {
    ref: r,
    className: ie("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
or.displayName = we.Label.displayName;
const po = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  we.Separator,
  {
    ref: n,
    className: ie("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
po.displayName = we.Separator.displayName;
const fo = C.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ y(
    "input",
    {
      type: t,
      className: ie(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
fo.displayName = "Input";
const au = rs(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ te("div", { className: "pr-relative", children: [
    /* @__PURE__ */ y(
      fo,
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
      dl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function lu({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (a, u) => u + 1), s = Ne(
    (a) => {
      o(a);
    },
    [o]
  );
  return /* @__PURE__ */ y("div", { className: ie("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((a) => /* @__PURE__ */ y(
    "div",
    {
      className: ie(
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
const uu = rs(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, a) => /* @__PURE__ */ te(
    bs,
    {
      ref: a,
      textValue: e,
      className: ie("pr-font-normal pr-text-slate-700", {
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
            className: ie(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: ge.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ y("div", { children: s })
      ]
    },
    e
  )
);
function cu({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ te(or, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ y("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ y(
        pl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        fl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ y(
        gl,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const fn = ge.allBookIds, du = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ri = ["OT", "NT", "DC"], pu = 32 + 32 + 32, fu = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], gu = (e) => ({
  OT: fn.filter((n) => ge.isBookOT(n)),
  NT: fn.filter((n) => ge.isBookNT(n)),
  DC: fn.filter((n) => ge.isBookDC(n))
})[e], rn = (e) => al(ge.bookIdToNumber(e));
function mu() {
  return fn.map((t) => ge.bookIdToEnglishName(t));
}
function hu(e) {
  return mu().includes(e);
}
function vu(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (hu(t))
    return fn.find((r) => ge.bookIdToEnglishName(r) === t);
}
function Bh({ scrRef: e, handleSubmit: t }) {
  const [n, r] = Se(""), [o, i] = Se(
    ge.bookNumberToId(e.bookNum)
  ), [s, a] = Se(e.chapterNum ?? 0), [u, c] = Se(
    ge.bookNumberToId(e.bookNum)
  ), [d, g] = Se(!1), [f, p] = Se(d), h = Ct(void 0), m = Ct(void 0), v = Ct(void 0), w = Ne(
    (P) => gu(P).filter(($) => {
      const N = ge.bookIdToEnglishName($).toLowerCase(), B = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return N.includes(B) || // Match book name
      $.toLowerCase().includes(B);
    }),
    [n]
  ), k = (P) => {
    r(P);
  }, x = Ct(!1), S = Ne((P) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    g(P);
  }, []), b = Ne(
    (P, $, N, B) => {
      if (a(
        ge.bookNumberToId(e.bookNum) !== P ? 1 : e.chapterNum
      ), $ || rn(P) === -1) {
        t({
          bookNum: ge.bookIdToNumber(P),
          chapterNum: N || 1,
          verseNum: B || 1
        }), g(!1), r("");
        return;
      }
      i(o !== P ? P : ""), g(!$);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (P) => {
    P <= 0 || P > rn(o) || b(o, !0, P);
  }, O = Ne(() => {
    fu.forEach((P) => {
      const $ = n.match(P);
      if ($) {
        const [N, B = void 0, F = void 0] = $.slice(1), M = vu(N);
        (ge.isBookIdValid(N) || M) && b(
          M ?? N,
          !0,
          B ? parseInt(B, 10) : 1,
          F ? parseInt(F, 10) : 1
        );
      }
    });
  }, [b, n]), D = Ne(
    (P) => {
      d ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null && m.current.focus(), P.preventDefault()) : g(!0);
    },
    [d]
  ), V = (P) => {
    const { key: $ } = P;
    $ === "ArrowRight" || $ === "ArrowLeft" || $ === "ArrowDown" || $ === "ArrowUp" || $ === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: $ })), h.current.focus());
  }, L = (P) => {
    const { key: $ } = P;
    if (u === o) {
      if ($ === "Enter") {
        P.preventDefault(), b(o, !0, s);
        return;
      }
      let N = 0;
      if ($ === "ArrowRight")
        if (s < rn(u))
          N = 1;
        else {
          P.preventDefault();
          return;
        }
      else if ($ === "ArrowLeft")
        if (s > 1)
          N = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        $ === "ArrowDown" ? N = 6 : $ === "ArrowUp" && (N = -6);
      s + N <= 0 || s + N > rn(u) ? a(0) : N !== 0 && (a(s + N), P.preventDefault());
    }
  };
  return Xt(() => {
    o === u ? o === ge.bookNumberToId(e.bookNum) ? a(e.chapterNum) : a(1) : a(0);
  }, [u, e.bookNum, e.chapterNum, o]), Qo(() => {
    p(d);
  }, [d]), Qo(() => {
    const P = setTimeout(() => {
      if (f && m.current && v.current) {
        const N = v.current.offsetTop - pu;
        m.current.scrollTo({ top: N, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [f]), /* @__PURE__ */ y("div", { children: /* @__PURE__ */ te(vs, { modal: !1, open: d, onOpenChange: S, children: [
    /* @__PURE__ */ y(ru, { asChild: !0, children: /* @__PURE__ */ y(
      au,
      {
        ref: h,
        value: n,
        handleSearch: k,
        handleKeyDown: D,
        handleOnClick: () => {
          i(ge.bookNumberToId(e.bookNum)), c(ge.bookNumberToId(e.bookNum)), a(e.chapterNum > 0 ? e.chapterNum : 0), g(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: O,
        placeholder: `${ge.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ te(
      co,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: V,
        align: "start",
        ref: m,
        children: [
          /* @__PURE__ */ y(
            cu,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ri.map(
            (P, $) => w(P).length > 0 && /* @__PURE__ */ te("div", { children: [
              /* @__PURE__ */ y(or, { className: "pr-font-semibold pr-text-slate-700", children: du[P] }),
              w(P).map((N) => /* @__PURE__ */ y("div", { children: /* @__PURE__ */ y(
                uu,
                {
                  bookId: N,
                  handleSelectBook: () => b(N, !1),
                  isSelected: o === N,
                  handleHighlightBook: () => c(N),
                  handleKeyDown: L,
                  bookType: P,
                  ref: (B) => {
                    o === N && (v.current = B);
                  },
                  children: /* @__PURE__ */ y(
                    lu,
                    {
                      handleSelectChapter: T,
                      endChapter: rn(N),
                      activeChapter: e.bookNum === ge.bookIdToNumber(N) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (B) => {
                        a(B);
                      }
                    }
                  )
                }
              ) }, N)),
              ri.length - 1 !== $ ? /* @__PURE__ */ y(po, {}) : void 0
            ] }, P)
          )
        ]
      }
    )
  ] }) });
}
const bu = ss(
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
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ y(r ? Cl : "button", { className: ie(bu({ variant: t, size: n, className: e })), ref: i, ...o })
);
rt.displayName = "Button";
function jh({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ y(
    rt,
    {
      id: e,
      disabled: t,
      className: ie("papi-button", n),
      onClick: r,
      onContextMenu: o,
      children: i
    }
  );
}
function oi({
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
    El,
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
      renderInput: (h) => /* @__PURE__ */ y(
        Rl,
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
function zh({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = Se(1), [s, a] = Se(r), [u, c] = Se(
    Array.from({ length: r }, (f, p) => p + 1)
  );
  Xt(() => {
    i(1), e(1), a(r), t(r), c(Array.from({ length: r }, (f, p) => p + 1));
  }, [r, t, e]);
  const d = (f, p) => {
    i(p), e(p), p > s && (a(p), t(p));
  }, g = (f, p) => {
    a(p), t(p), p < o && (i(p), e(p));
  };
  return /* @__PURE__ */ te(nr, { children: [
    /* @__PURE__ */ y(
      ei,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ y(
          oi,
          {
            onChange: (f, p) => d(f, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: u,
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
    /* @__PURE__ */ y(
      ei,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ y(
          oi,
          {
            onChange: (f, p) => g(f, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: u,
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
var Vt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Vt || {});
function ws({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Vt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: a = !1,
  className: u,
  onChange: c
}) {
  const d = /* @__PURE__ */ y(
    Pl,
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
    const f = r === Vt.Before || r === Vt.Above, p = /* @__PURE__ */ y("span", { className: `papi-checkbox-label ${a ? "error" : ""} ${u ?? ""}`, children: n }), h = r === Vt.Before || r === Vt.After, m = h ? p : /* @__PURE__ */ y("div", { children: p }), v = h ? d : /* @__PURE__ */ y("div", { children: d });
    g = /* @__PURE__ */ te(
      Tl,
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
    g = d;
  return g;
}
function Hh({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: s
}) {
  return /* @__PURE__ */ te("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ y("legend", { children: n }),
    r.map((a) => /* @__PURE__ */ y(
      ws,
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
function yu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function wu(e) {
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
var Hr = { exports: {} }, An = { exports: {} }, ue = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ii;
function xu() {
  if (ii)
    return ue;
  ii = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
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
                case h:
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
  return ue.AsyncMode = u, ue.ConcurrentMode = c, ue.ContextConsumer = a, ue.ContextProvider = s, ue.Element = t, ue.ForwardRef = d, ue.Fragment = r, ue.Lazy = h, ue.Memo = p, ue.Portal = n, ue.Profiler = i, ue.StrictMode = o, ue.Suspense = g, ue.isAsyncMode = function(b) {
    return S(b) || x(b) === u;
  }, ue.isConcurrentMode = S, ue.isContextConsumer = function(b) {
    return x(b) === a;
  }, ue.isContextProvider = function(b) {
    return x(b) === s;
  }, ue.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === t;
  }, ue.isForwardRef = function(b) {
    return x(b) === d;
  }, ue.isFragment = function(b) {
    return x(b) === r;
  }, ue.isLazy = function(b) {
    return x(b) === h;
  }, ue.isMemo = function(b) {
    return x(b) === p;
  }, ue.isPortal = function(b) {
    return x(b) === n;
  }, ue.isProfiler = function(b) {
    return x(b) === i;
  }, ue.isStrictMode = function(b) {
    return x(b) === o;
  }, ue.isSuspense = function(b) {
    return x(b) === g;
  }, ue.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === c || b === i || b === o || b === g || b === f || typeof b == "object" && b !== null && (b.$$typeof === h || b.$$typeof === p || b.$$typeof === s || b.$$typeof === a || b.$$typeof === d || b.$$typeof === v || b.$$typeof === w || b.$$typeof === k || b.$$typeof === m);
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
var si;
function Su() {
  return si || (si = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, a = e ? Symbol.for("react.context") : 60110, u = e ? Symbol.for("react.async_mode") : 60111, c = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, g = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, m = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, k = e ? Symbol.for("react.scope") : 60119;
    function x(I) {
      return typeof I == "string" || typeof I == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      I === r || I === c || I === i || I === o || I === g || I === f || typeof I == "object" && I !== null && (I.$$typeof === h || I.$$typeof === p || I.$$typeof === s || I.$$typeof === a || I.$$typeof === d || I.$$typeof === v || I.$$typeof === w || I.$$typeof === k || I.$$typeof === m);
    }
    function S(I) {
      if (typeof I == "object" && I !== null) {
        var Q = I.$$typeof;
        switch (Q) {
          case t:
            var _ = I.type;
            switch (_) {
              case u:
              case c:
              case r:
              case i:
              case o:
              case g:
                return _;
              default:
                var ae = _ && _.$$typeof;
                switch (ae) {
                  case a:
                  case d:
                  case h:
                  case p:
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
    var b = u, T = c, O = a, D = s, V = t, L = d, P = r, $ = h, N = p, B = n, F = i, M = o, j = g, ne = !1;
    function ee(I) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), R(I) || S(I) === u;
    }
    function R(I) {
      return S(I) === c;
    }
    function A(I) {
      return S(I) === a;
    }
    function H(I) {
      return S(I) === s;
    }
    function X(I) {
      return typeof I == "object" && I !== null && I.$$typeof === t;
    }
    function z(I) {
      return S(I) === d;
    }
    function G(I) {
      return S(I) === r;
    }
    function q(I) {
      return S(I) === h;
    }
    function W(I) {
      return S(I) === p;
    }
    function U(I) {
      return S(I) === n;
    }
    function K(I) {
      return S(I) === i;
    }
    function Z(I) {
      return S(I) === o;
    }
    function se(I) {
      return S(I) === g;
    }
    ce.AsyncMode = b, ce.ConcurrentMode = T, ce.ContextConsumer = O, ce.ContextProvider = D, ce.Element = V, ce.ForwardRef = L, ce.Fragment = P, ce.Lazy = $, ce.Memo = N, ce.Portal = B, ce.Profiler = F, ce.StrictMode = M, ce.Suspense = j, ce.isAsyncMode = ee, ce.isConcurrentMode = R, ce.isContextConsumer = A, ce.isContextProvider = H, ce.isElement = X, ce.isForwardRef = z, ce.isFragment = G, ce.isLazy = q, ce.isMemo = W, ce.isPortal = U, ce.isProfiler = K, ce.isStrictMode = Z, ce.isSuspense = se, ce.isValidElementType = x, ce.typeOf = S;
  }()), ce;
}
var ai;
function xs() {
  return ai || (ai = 1, process.env.NODE_ENV === "production" ? An.exports = xu() : An.exports = Su()), An.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Cr, li;
function Cu() {
  if (li)
    return Cr;
  li = 1;
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
  return Cr = o() ? Object.assign : function(i, s) {
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
  }, Cr;
}
var Er, ui;
function go() {
  if (ui)
    return Er;
  ui = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Er = e, Er;
}
var Rr, ci;
function Ss() {
  return ci || (ci = 1, Rr = Function.call.bind(Object.prototype.hasOwnProperty)), Rr;
}
var Tr, di;
function Eu() {
  if (di)
    return Tr;
  di = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = go(), n = {}, r = Ss();
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
          } catch (h) {
            g = h;
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
  }, Tr = o, Tr;
}
var Pr, pi;
function Ru() {
  if (pi)
    return Pr;
  pi = 1;
  var e = xs(), t = Cu(), n = go(), r = Ss(), o = Eu(), i = function() {
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
  return Pr = function(a, u) {
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
      shape: $,
      exact: N
    };
    function h(R, A) {
      return R === A ? R !== 0 || 1 / R === 1 / A : R !== R && A !== A;
    }
    function m(R, A) {
      this.message = R, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function v(R) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, H = 0;
      function X(G, q, W, U, K, Z, se) {
        if (U = U || f, Z = Z || W, se !== n) {
          if (u) {
            var I = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw I.name = "Invariant Violation", I;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Q = U + ":" + W;
            !A[Q] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + U + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[Q] = !0, H++);
          }
        }
        return q[W] == null ? G ? q[W] === null ? new m("The " + K + " `" + Z + "` is marked as required " + ("in `" + U + "`, but its value is `null`.")) : new m("The " + K + " `" + Z + "` is marked as required in " + ("`" + U + "`, but its value is `undefined`.")) : null : R(q, W, U, K, Z);
      }
      var z = X.bind(null, !1);
      return z.isRequired = X.bind(null, !0), z;
    }
    function w(R) {
      function A(H, X, z, G, q, W) {
        var U = H[X], K = M(U);
        if (K !== R) {
          var Z = j(U);
          return new m(
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
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var W = H[X];
        if (!Array.isArray(W)) {
          var U = M(W);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an array."));
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
          var W = M(q);
          return new m("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(R);
    }
    function b() {
      function R(A, H, X, z, G) {
        var q = A[H];
        if (!e.isValidElementType(q)) {
          var W = M(q);
          return new m("Invalid " + z + " `" + G + "` of type " + ("`" + W + "` supplied to `" + X + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(R);
    }
    function T(R) {
      function A(H, X, z, G, q) {
        if (!(H[X] instanceof R)) {
          var W = R.name || f, U = ee(H[X]);
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected ") + ("instance of `" + W + "`."));
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
          if (h(W, R[U]))
            return null;
        var K = JSON.stringify(R, function(se, I) {
          var Q = j(I);
          return Q === "symbol" ? String(I) : I;
        });
        return new m("Invalid " + G + " `" + q + "` of value `" + String(W) + "` " + ("supplied to `" + z + "`, expected one of " + K + "."));
      }
      return v(A);
    }
    function D(R) {
      function A(H, X, z, G, q) {
        if (typeof R != "function")
          return new m("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var W = H[X], U = M(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type " + ("`" + U + "` supplied to `" + z + "`, expected an object."));
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
          var se = R[Z], I = se(z, G, q, W, U, n);
          if (I == null)
            return null;
          I.data && r(I.data, "expectedType") && K.push(I.data.expectedType);
        }
        var Q = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new m("Invalid " + W + " `" + U + "` supplied to " + ("`" + q + "`" + Q + "."));
      }
      return v(X);
    }
    function L() {
      function R(A, H, X, z, G) {
        return B(A[H]) ? null : new m("Invalid " + z + " `" + G + "` supplied to " + ("`" + X + "`, expected a ReactNode."));
      }
      return v(R);
    }
    function P(R, A, H, X, z) {
      return new m(
        (R || "React class") + ": " + A + " type `" + H + "." + X + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function $(R) {
      function A(H, X, z, G, q) {
        var W = H[X], U = M(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var K in R) {
          var Z = R[K];
          if (typeof Z != "function")
            return P(z, G, q, K, j(Z));
          var se = Z(W, K, z, G, q + "." + K, n);
          if (se)
            return se;
        }
        return null;
      }
      return v(A);
    }
    function N(R) {
      function A(H, X, z, G, q) {
        var W = H[X], U = M(W);
        if (U !== "object")
          return new m("Invalid " + G + " `" + q + "` of type `" + U + "` " + ("supplied to `" + z + "`, expected `object`."));
        var K = t({}, H[X], R);
        for (var Z in K) {
          var se = R[Z];
          if (r(R, Z) && typeof se != "function")
            return P(z, G, q, Z, j(se));
          if (!se)
            return new m(
              "Invalid " + G + " `" + q + "` key `" + Z + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[X], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(R), null, "  ")
            );
          var I = se(W, Z, z, G, q + "." + Z, n);
          if (I)
            return I;
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
    function M(R) {
      var A = typeof R;
      return Array.isArray(R) ? "array" : R instanceof RegExp ? "object" : F(A, R) ? "symbol" : A;
    }
    function j(R) {
      if (typeof R > "u" || R === null)
        return "" + R;
      var A = M(R);
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
    function ee(R) {
      return !R.constructor || !R.constructor.name ? f : R.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Pr;
}
var kr, fi;
function Tu() {
  if (fi)
    return kr;
  fi = 1;
  var e = go();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, kr = function() {
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
  }, kr;
}
if (process.env.NODE_ENV !== "production") {
  var Pu = xs(), ku = !0;
  Hr.exports = Ru()(Pu.isElement, ku);
} else
  Hr.exports = Tu()();
var Ou = Hr.exports;
const l = /* @__PURE__ */ yu(Ou);
function Yt(e, t) {
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
function Cs(e) {
  if (!St(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Cs(e[n]);
  }), t;
}
function ot(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? E({}, e) : e;
  return St(e) && St(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (St(t[o]) && o in e && St(e[o]) ? r[o] = ot(e[o], t[o], n) : n.clone ? r[o] = St(t[o]) ? Cs(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function _u(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Es(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  const u = i.type;
  return typeof u == "function" && !_u(u) && (a = "Did you accidentally use a plain function component for an element instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Rs = Yt(l.element, Es);
Rs.isRequired = Yt(l.element.isRequired, Es);
const En = Rs;
function $u(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Nu(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let a;
  return typeof i == "function" && !$u(i) && (a = "Did you accidentally provide a plain function component instead?"), a !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${a} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Mu = Yt(l.elementType, Nu), Iu = "exact-prop: ​";
function Ts(e) {
  return process.env.NODE_ENV === "production" ? e : E({}, e, {
    [Iu]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function zt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Gr = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var gi;
function Au() {
  if (gi)
    return de;
  gi = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
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
  return de.ContextConsumer = s, de.ContextProvider = i, de.Element = e, de.ForwardRef = u, de.Fragment = n, de.Lazy = f, de.Memo = g, de.Portal = t, de.Profiler = o, de.StrictMode = r, de.Suspense = c, de.SuspenseList = d, de.isAsyncMode = function() {
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
    return m(v) === u;
  }, de.isFragment = function(v) {
    return m(v) === n;
  }, de.isLazy = function(v) {
    return m(v) === f;
  }, de.isMemo = function(v) {
    return m(v) === g;
  }, de.isPortal = function(v) {
    return m(v) === t;
  }, de.isProfiler = function(v) {
    return m(v) === o;
  }, de.isStrictMode = function(v) {
    return m(v) === r;
  }, de.isSuspense = function(v) {
    return m(v) === c;
  }, de.isSuspenseList = function(v) {
    return m(v) === d;
  }, de.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === n || v === o || v === r || v === c || v === d || v === p || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === g || v.$$typeof === i || v.$$typeof === s || v.$$typeof === u || v.$$typeof === h || v.getModuleId !== void 0);
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
var mi;
function Fu() {
  return mi || (mi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), a = Symbol.for("react.server_context"), u = Symbol.for("react.forward_ref"), c = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), g = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, m = !1, v = !1, w = !1, k = !1, x;
    x = Symbol.for("react.module.reference");
    function S(_) {
      return !!(typeof _ == "string" || typeof _ == "function" || _ === n || _ === o || k || _ === r || _ === c || _ === d || w || _ === p || h || m || v || typeof _ == "object" && _ !== null && (_.$$typeof === f || _.$$typeof === g || _.$$typeof === i || _.$$typeof === s || _.$$typeof === u || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      _.$$typeof === x || _.getModuleId !== void 0));
    }
    function b(_) {
      if (typeof _ == "object" && _ !== null) {
        var ae = _.$$typeof;
        switch (ae) {
          case e:
            var Ce = _.type;
            switch (Ce) {
              case n:
              case o:
              case r:
              case c:
              case d:
                return Ce;
              default:
                var Oe = Ce && Ce.$$typeof;
                switch (Oe) {
                  case a:
                  case s:
                  case u:
                  case f:
                  case g:
                  case i:
                    return Oe;
                  default:
                    return ae;
                }
            }
          case t:
            return ae;
        }
      }
    }
    var T = s, O = i, D = e, V = u, L = n, P = f, $ = g, N = t, B = o, F = r, M = c, j = d, ne = !1, ee = !1;
    function R(_) {
      return ne || (ne = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(_) {
      return ee || (ee = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
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
    function se(_) {
      return b(_) === r;
    }
    function I(_) {
      return b(_) === c;
    }
    function Q(_) {
      return b(_) === d;
    }
    pe.ContextConsumer = T, pe.ContextProvider = O, pe.Element = D, pe.ForwardRef = V, pe.Fragment = L, pe.Lazy = P, pe.Memo = $, pe.Portal = N, pe.Profiler = B, pe.StrictMode = F, pe.Suspense = M, pe.SuspenseList = j, pe.isAsyncMode = R, pe.isConcurrentMode = A, pe.isContextConsumer = H, pe.isContextProvider = X, pe.isElement = z, pe.isForwardRef = G, pe.isFragment = q, pe.isLazy = W, pe.isMemo = U, pe.isPortal = K, pe.isProfiler = Z, pe.isStrictMode = se, pe.isSuspense = I, pe.isSuspenseList = Q, pe.isValidElementType = S, pe.typeOf = b;
  }()), pe;
}
process.env.NODE_ENV === "production" ? Gr.exports = Au() : Gr.exports = Fu();
var Xn = Gr.exports;
const Du = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Vu(e) {
  const t = `${e}`.match(Du);
  return t && t[1] || "";
}
function Ps(e, t = "") {
  return e.displayName || e.name || Vu(e) || t;
}
function hi(e, t, n) {
  const r = Ps(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Lu(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ps(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Xn.ForwardRef:
          return hi(e, e.render, "ForwardRef");
        case Xn.Memo:
          return hi(e, e.type, "memo");
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
const Bu = l.oneOfType([l.func, l.object]), mo = Bu;
function Ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : zt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Ur(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function ks(e, t = 166) {
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
function ju(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const a = o || "<<anonymous>>", u = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${u}\` of \`${a}\` is deprecated. ${t}`) : null;
  };
}
function zu(e, t) {
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
function Ht(e) {
  return Pe(e).defaultView || window;
}
function Hu(e, t) {
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
function Kn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Gu = typeof window < "u" ? C.useLayoutEffect : C.useEffect, Tt = Gu;
let vi = 0;
function Uu(e) {
  const [t, n] = C.useState(e), r = e || t;
  return C.useEffect(() => {
    t == null && (vi += 1, n(`mui-${vi}`));
  }, [t]), r;
}
const bi = C["useId".toString()];
function Os(e) {
  if (bi !== void 0) {
    const t = bi();
    return e ?? t;
  }
  return Uu(e);
}
function qu(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function _s({
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
function yn(e) {
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
      Kn(n, t);
    });
  }, e);
}
const yi = {};
function Wu(e, t) {
  const n = C.useRef(yi);
  return n.current === yi && (n.current = e(t)), n;
}
const Xu = [];
function Ku(e) {
  C.useEffect(e, Xu);
}
class Rn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Rn();
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
function cn() {
  const e = Wu(Rn.create).current;
  return Ku(e.disposeEffect), e;
}
let ir = !0, qr = !1;
const Yu = new Rn(), Ju = {
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
function Zu(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Ju[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Qu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (ir = !0);
}
function Or() {
  ir = !1;
}
function ec() {
  this.visibilityState === "hidden" && qr && (ir = !0);
}
function tc(e) {
  e.addEventListener("keydown", Qu, !0), e.addEventListener("mousedown", Or, !0), e.addEventListener("pointerdown", Or, !0), e.addEventListener("touchstart", Or, !0), e.addEventListener("visibilitychange", ec, !0);
}
function nc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return ir || Zu(t);
}
function $s() {
  const e = C.useCallback((o) => {
    o != null && tc(o.ownerDocument);
  }, []), t = C.useRef(!1);
  function n() {
    return t.current ? (qr = !0, Yu.start(100, () => {
      qr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return nc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Ns(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function rc(e) {
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
function oc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const ic = Number.isInteger || oc;
function Ms(e, t, n, r) {
  const o = e[t];
  if (o == null || !ic(o)) {
    const i = rc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Is(e, t, ...n) {
  return e[t] === void 0 ? null : Ms(e, t, ...n);
}
function Wr() {
  return null;
}
Is.isRequired = Ms;
Wr.isRequired = Wr;
const As = process.env.NODE_ENV === "production" ? Wr : Is;
function Fs(e, t) {
  const n = E({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = E({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = E({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = Fs(o[s], i[s]);
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
const wi = (e) => e, sc = () => {
  let e = wi;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = wi;
    }
  };
}, ac = sc(), Ds = ac, Vs = {
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
  const r = Vs[t];
  return r ? `${n}-${r}` : `${Ds.generate(e)}-${t}`;
}
function mt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ze(e, o, n);
  }), r;
}
function lc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ls(e) {
  return typeof e == "string";
}
function dn(e, t, n) {
  return e === void 0 || Ls(e) ? t : E({}, t, {
    ownerState: E({}, t.ownerState, n)
  });
}
const uc = {
  disableDefaultClasses: !1
}, cc = /* @__PURE__ */ C.createContext(uc);
function dc(e) {
  const {
    disableDefaultClasses: t
  } = C.useContext(cc);
  return (n) => t ? "" : e(n);
}
function Bs(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function pc(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function xi(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function fc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const p = Te(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = E({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = E({}, n, o, r);
    return p.length > 0 && (m.className = p), Object.keys(h).length > 0 && (m.style = h), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Bs(E({}, o, r)), a = xi(r), u = xi(o), c = t(s), d = Te(c == null ? void 0 : c.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), g = E({}, c == null ? void 0 : c.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = E({}, c, n, u, a);
  return d.length > 0 && (f.className = d), Object.keys(g).length > 0 && (f.style = g), {
    props: f,
    internalRef: c.ref
  };
}
const gc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Pt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = fe(e, gc), a = i ? {} : pc(r, o), {
    props: u,
    internalRef: c
  } = fc(E({}, s, {
    externalSlotProps: a
  })), d = Ge(c, a == null ? void 0 : a.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return dn(n, E({}, u, {
    ref: d
  }), o);
}
const js = "base";
function mc(e) {
  return `${js}--${e}`;
}
function hc(e, t) {
  return `${js}-${e}-${t}`;
}
function zs(e, t) {
  const n = Vs[t];
  return n ? mc(n) : hc(e, t);
}
function vc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = zs(e, r);
  }), n;
}
const bc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function yc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function wc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function xc(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || wc(e));
}
function Sc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(bc)).forEach((r, o) => {
    const i = yc(r);
    i === -1 || !xc(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Cc() {
  return !0;
}
function Yn(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Sc,
    isEnabled: s = Cc,
    open: a
  } = e, u = C.useRef(!1), c = C.useRef(null), d = C.useRef(null), g = C.useRef(null), f = C.useRef(null), p = C.useRef(!1), h = C.useRef(null), m = Ge(t.ref, h), v = C.useRef(null);
  C.useEffect(() => {
    !a || !h.current || (p.current = !n);
  }, [n, a]), C.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Pe(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (g.current && g.current.focus && (u.current = !0, g.current.focus()), g.current = null);
    };
  }, [a]), C.useEffect(() => {
    if (!a || !h.current)
      return;
    const x = Pe(h.current), S = (O) => {
      v.current = O, !(r || !s() || O.key !== "Tab") && x.activeElement === h.current && O.shiftKey && (u.current = !0, d.current && d.current.focus());
    }, b = () => {
      const O = h.current;
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
      if ((x.activeElement === c.current || x.activeElement === d.current) && (D = i(h.current)), D.length > 0) {
        var V, L;
        const P = !!((V = v.current) != null && V.shiftKey && ((L = v.current) == null ? void 0 : L.key) === "Tab"), $ = D[0], N = D[D.length - 1];
        typeof $ != "string" && typeof N != "string" && (P ? N.focus() : $.focus());
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
  return /* @__PURE__ */ te(C.Fragment, {
    children: [/* @__PURE__ */ y("div", {
      tabIndex: a ? 0 : -1,
      onFocus: k,
      ref: c,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ C.cloneElement(t, {
      ref: m,
      onFocus: w
    }), /* @__PURE__ */ y("div", {
      tabIndex: a ? 0 : -1,
      onFocus: k,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Yn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: En,
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
process.env.NODE_ENV !== "production" && (Yn["propTypes"] = Ts(Yn.propTypes));
function Ec(e) {
  return typeof e == "function" ? e() : e;
}
const wn = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, a] = C.useState(null), u = Ge(/* @__PURE__ */ C.isValidElement(r) ? r.ref : null, n);
  if (Tt(() => {
    i || a(Ec(o) || document.body);
  }, [o, i]), Tt(() => {
    if (s && !i)
      return Kn(n, s), () => {
        Kn(n, null);
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
    children: s && /* @__PURE__ */ zl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (wn.propTypes = {
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
process.env.NODE_ENV !== "production" && (wn["propTypes"] = Ts(wn.propTypes));
function Rc(e) {
  const t = Pe(e);
  return t.body === e ? Ht(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function gn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Si(e) {
  return parseInt(Ht(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Tc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Ci(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const a = i.indexOf(s) === -1, u = !Tc(s);
    a && u && gn(s, o);
  });
}
function _r(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Pc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Rc(r)) {
      const s = Ns(Pe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Si(r) + s}px`;
      const a = Pe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(a, (u) => {
        n.push({
          value: u.style.paddingRight,
          property: "padding-right",
          el: u
        }), u.style.paddingRight = `${Si(u) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Pe(r).body;
    else {
      const s = r.parentElement, a = Ht(r);
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
function kc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Oc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && gn(t.modalRef, !1);
    const o = kc(n);
    Ci(n, t.mount, t.modalRef, o, !0);
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
    o.restore || (o.restore = Pc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = _r(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && gn(t.modalRef, n), Ci(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && gn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function _c(e) {
  return typeof e == "function" ? e() : e;
}
function $c(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Nc = new Oc();
function Mc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Nc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: a,
    children: u,
    onClose: c,
    open: d,
    rootRef: g
  } = e, f = C.useRef({}), p = C.useRef(null), h = C.useRef(null), m = Ge(h, g), [v, w] = C.useState(!d), k = $c(u);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const S = () => Pe(p.current), b = () => (f.current.modalRef = h.current, f.current.mount = p.current, f.current), T = () => {
    o.mount(b(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, O = yn(() => {
    const M = _c(t) || S().body;
    o.add(b(), M), h.current && T();
  }), D = C.useCallback(() => o.isTopModal(b()), [o]), V = yn((M) => {
    p.current = M, M && (d && D() ? T() : h.current && gn(h.current, x));
  }), L = C.useCallback(() => {
    o.remove(b(), x);
  }, [x, o]);
  C.useEffect(() => () => {
    L();
  }, [L]), C.useEffect(() => {
    d ? O() : (!k || !i) && L();
  }, [d, L, k, i, O]);
  const P = (M) => (j) => {
    var ne;
    (ne = M.onKeyDown) == null || ne.call(M, j), !(j.key !== "Escape" || j.which === 229 || // Wait until IME is settled.
    !D()) && (n || (j.stopPropagation(), c && c(j, "escapeKeyDown")));
  }, $ = (M) => (j) => {
    var ne;
    (ne = M.onClick) == null || ne.call(M, j), j.target === j.currentTarget && c && c(j, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const j = Bs(e);
      delete j.onTransitionEnter, delete j.onTransitionExited;
      const ne = E({}, j, M);
      return E({
        role: "presentation"
      }, ne, {
        onKeyDown: P(ne),
        ref: m
      });
    },
    getBackdropProps: (M = {}) => {
      const j = M;
      return E({
        "aria-hidden": !0
      }, j, {
        onClick: $(j),
        open: d
      });
    },
    getTransitionProps: () => {
      const M = () => {
        w(!1), s && s();
      }, j = () => {
        w(!0), a && a(), i && L();
      };
      return {
        onEnter: Ur(M, u == null ? void 0 : u.props.onEnter),
        onExited: Ur(j, u == null ? void 0 : u.props.onExited)
      };
    },
    rootRef: m,
    portalRef: V,
    isTopModal: D,
    exited: v,
    hasTransition: k
  };
}
var Me = "top", Ue = "bottom", qe = "right", Ie = "left", ho = "auto", Tn = [Me, Ue, qe, Ie], Gt = "start", xn = "end", Ic = "clippingParents", Hs = "viewport", on = "popper", Ac = "reference", Ei = /* @__PURE__ */ Tn.reduce(function(e, t) {
  return e.concat([t + "-" + Gt, t + "-" + xn]);
}, []), Gs = /* @__PURE__ */ [].concat(Tn, [ho]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Gt, t + "-" + xn]);
}, []), Fc = "beforeRead", Dc = "read", Vc = "afterRead", Lc = "beforeMain", Bc = "main", jc = "afterMain", zc = "beforeWrite", Hc = "write", Gc = "afterWrite", Uc = [Fc, Dc, Vc, Lc, Bc, jc, zc, Hc, Gc];
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
function vo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Le(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function qc(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !He(i) || !Je(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var a = o[s];
      a === !1 ? i.removeAttribute(s) : i.setAttribute(s, a === !0 ? "" : a);
    }));
  });
}
function Wc(e) {
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
const Xc = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: qc,
  effect: Wc,
  requires: ["computeStyles"]
};
function Ke(e) {
  return e.split("-")[0];
}
var Et = Math.max, Jn = Math.min, Ut = Math.round;
function Xr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Us() {
  return !/^((?!chrome|android).)*safari/i.test(Xr());
}
function qt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && He(e) && (o = e.offsetWidth > 0 && Ut(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Ut(r.height) / e.offsetHeight || 1);
  var s = kt(e) ? Le(e) : window, a = s.visualViewport, u = !Us() && n, c = (r.left + (u && a ? a.offsetLeft : 0)) / o, d = (r.top + (u && a ? a.offsetTop : 0)) / i, g = r.width / o, f = r.height / i;
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
function bo(e) {
  var t = qt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function qs(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && vo(n)) {
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
function Kc(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function ht(e) {
  return ((kt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function sr(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (vo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ht(e)
  );
}
function Ri(e) {
  return !He(e) || // https://github.com/popperjs/popper-core/issues/837
  st(e).position === "fixed" ? null : e.offsetParent;
}
function Yc(e) {
  var t = /firefox/i.test(Xr()), n = /Trident/i.test(Xr());
  if (n && He(e)) {
    var r = st(e);
    if (r.position === "fixed")
      return null;
  }
  var o = sr(e);
  for (vo(o) && (o = o.host); He(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var i = st(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Pn(e) {
  for (var t = Le(e), n = Ri(e); n && Kc(n) && st(n).position === "static"; )
    n = Ri(n);
  return n && (Je(n) === "html" || Je(n) === "body" && st(n).position === "static") ? t : n || Yc(e) || t;
}
function yo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function mn(e, t, n) {
  return Et(e, Jn(t, n));
}
function Jc(e, t, n) {
  var r = mn(e, t, n);
  return r > n ? n : r;
}
function Ws() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Xs(e) {
  return Object.assign({}, Ws(), e);
}
function Ks(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Zc = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Xs(typeof t != "number" ? t : Ks(t, Tn));
};
function Qc(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, a = Ke(n.placement), u = yo(a), c = [Ie, qe].indexOf(a) >= 0, d = c ? "height" : "width";
  if (!(!i || !s)) {
    var g = Zc(o.padding, n), f = bo(i), p = u === "y" ? Me : Ie, h = u === "y" ? Ue : qe, m = n.rects.reference[d] + n.rects.reference[u] - s[u] - n.rects.popper[d], v = s[u] - n.rects.reference[u], w = Pn(i), k = w ? u === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = m / 2 - v / 2, S = g[p], b = k - f[d] - g[h], T = k / 2 - f[d] / 2 + x, O = mn(S, T, b), D = u;
    n.modifiersData[r] = (t = {}, t[D] = O, t.centerOffset = O - T, t);
  }
}
function ed(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || qs(t.elements.popper, o) && (t.elements.arrow = o));
}
const td = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Qc,
  effect: ed,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Wt(e) {
  return e.split("-")[1];
}
var nd = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function rd(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Ut(n * o) / o || 0,
    y: Ut(r * o) / o || 0
  };
}
function Ti(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, a = e.position, u = e.gpuAcceleration, c = e.adaptive, d = e.roundOffsets, g = e.isFixed, f = s.x, p = f === void 0 ? 0 : f, h = s.y, m = h === void 0 ? 0 : h, v = typeof d == "function" ? d({
    x: p,
    y: m
  }) : {
    x: p,
    y: m
  };
  p = v.x, m = v.y;
  var w = s.hasOwnProperty("x"), k = s.hasOwnProperty("y"), x = Ie, S = Me, b = window;
  if (c) {
    var T = Pn(n), O = "clientHeight", D = "clientWidth";
    if (T === Le(n) && (T = ht(n), st(T).position !== "static" && a === "absolute" && (O = "scrollHeight", D = "scrollWidth")), T = T, o === Me || (o === Ie || o === qe) && i === xn) {
      S = Ue;
      var V = g && T === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[O]
      );
      m -= V - r.height, m *= u ? 1 : -1;
    }
    if (o === Ie || (o === Me || o === Ue) && i === xn) {
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
  }, c && nd), $ = d === !0 ? rd({
    x: p,
    y: m
  }, Le(n)) : {
    x: p,
    y: m
  };
  if (p = $.x, m = $.y, u) {
    var N;
    return Object.assign({}, P, (N = {}, N[S] = k ? "0" : "", N[x] = w ? "0" : "", N.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + m + "px)" : "translate3d(" + p + "px, " + m + "px, 0)", N));
  }
  return Object.assign({}, P, (t = {}, t[S] = k ? m + "px" : "", t[x] = w ? p + "px" : "", t.transform = "", t));
}
function od(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, a = n.roundOffsets, u = a === void 0 ? !0 : a, c = {
    placement: Ke(t.placement),
    variation: Wt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ti(Object.assign({}, c, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: u
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ti(Object.assign({}, c, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: u
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const id = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: od,
  data: {}
};
var Fn = {
  passive: !0
};
function sd(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, a = s === void 0 ? !0 : s, u = Le(t.elements.popper), c = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && c.forEach(function(d) {
    d.addEventListener("scroll", n.update, Fn);
  }), a && u.addEventListener("resize", n.update, Fn), function() {
    i && c.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Fn);
    }), a && u.removeEventListener("resize", n.update, Fn);
  };
}
const ad = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: sd,
  data: {}
};
var ld = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Hn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return ld[t];
  });
}
var ud = {
  start: "end",
  end: "start"
};
function Pi(e) {
  return e.replace(/start|end/g, function(t) {
    return ud[t];
  });
}
function wo(e) {
  var t = Le(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function xo(e) {
  return qt(ht(e)).left + wo(e).scrollLeft;
}
function cd(e, t) {
  var n = Le(e), r = ht(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, a = 0, u = 0;
  if (o) {
    i = o.width, s = o.height;
    var c = Us();
    (c || !c && t === "fixed") && (a = o.offsetLeft, u = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: a + xo(e),
    y: u
  };
}
function dd(e) {
  var t, n = ht(e), r = wo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Et(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Et(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), a = -r.scrollLeft + xo(e), u = -r.scrollTop;
  return st(o || n).direction === "rtl" && (a += Et(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: a,
    y: u
  };
}
function So(e) {
  var t = st(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ys(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : He(e) && So(e) ? e : Ys(sr(e));
}
function hn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Ys(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Le(r), s = o ? [i].concat(i.visualViewport || [], So(r) ? r : []) : r, a = t.concat(s);
  return o ? a : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    a.concat(hn(sr(s)))
  );
}
function Kr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function pd(e, t) {
  var n = qt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ki(e, t, n) {
  return t === Hs ? Kr(cd(e, n)) : kt(t) ? pd(t, n) : Kr(dd(ht(e)));
}
function fd(e) {
  var t = hn(sr(e)), n = ["absolute", "fixed"].indexOf(st(e).position) >= 0, r = n && He(e) ? Pn(e) : e;
  return kt(r) ? t.filter(function(o) {
    return kt(o) && qs(o, r) && Je(o) !== "body";
  }) : [];
}
function gd(e, t, n, r) {
  var o = t === "clippingParents" ? fd(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], a = i.reduce(function(u, c) {
    var d = ki(e, c, r);
    return u.top = Et(d.top, u.top), u.right = Jn(d.right, u.right), u.bottom = Jn(d.bottom, u.bottom), u.left = Et(d.left, u.left), u;
  }, ki(e, s, r));
  return a.width = a.right - a.left, a.height = a.bottom - a.top, a.x = a.left, a.y = a.top, a;
}
function Js(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ke(r) : null, i = r ? Wt(r) : null, s = t.x + t.width / 2 - n.width / 2, a = t.y + t.height / 2 - n.height / 2, u;
  switch (o) {
    case Me:
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
    case Ie:
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
  var c = o ? yo(o) : null;
  if (c != null) {
    var d = c === "y" ? "height" : "width";
    switch (i) {
      case Gt:
        u[c] = u[c] - (t[d] / 2 - n[d] / 2);
        break;
      case xn:
        u[c] = u[c] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return u;
}
function Sn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, a = n.boundary, u = a === void 0 ? Ic : a, c = n.rootBoundary, d = c === void 0 ? Hs : c, g = n.elementContext, f = g === void 0 ? on : g, p = n.altBoundary, h = p === void 0 ? !1 : p, m = n.padding, v = m === void 0 ? 0 : m, w = Xs(typeof v != "number" ? v : Ks(v, Tn)), k = f === on ? Ac : on, x = e.rects.popper, S = e.elements[h ? k : f], b = gd(kt(S) ? S : S.contextElement || ht(e.elements.popper), u, d, s), T = qt(e.elements.reference), O = Js({
    reference: T,
    element: x,
    strategy: "absolute",
    placement: o
  }), D = Kr(Object.assign({}, x, O)), V = f === on ? D : T, L = {
    top: b.top - V.top + w.top,
    bottom: V.bottom - b.bottom + w.bottom,
    left: b.left - V.left + w.left,
    right: V.right - b.right + w.right
  }, P = e.modifiersData.offset;
  if (f === on && P) {
    var $ = P[o];
    Object.keys(L).forEach(function(N) {
      var B = [qe, Ue].indexOf(N) >= 0 ? 1 : -1, F = [Me, Ue].indexOf(N) >= 0 ? "y" : "x";
      L[N] += $[F] * B;
    });
  }
  return L;
}
function md(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, a = n.flipVariations, u = n.allowedAutoPlacements, c = u === void 0 ? Gs : u, d = Wt(r), g = d ? a ? Ei : Ei.filter(function(h) {
    return Wt(h) === d;
  }) : Tn, f = g.filter(function(h) {
    return c.indexOf(h) >= 0;
  });
  f.length === 0 && (f = g);
  var p = f.reduce(function(h, m) {
    return h[m] = Sn(e, {
      placement: m,
      boundary: o,
      rootBoundary: i,
      padding: s
    })[Ke(m)], h;
  }, {});
  return Object.keys(p).sort(function(h, m) {
    return p[h] - p[m];
  });
}
function hd(e) {
  if (Ke(e) === ho)
    return [];
  var t = Hn(e);
  return [Pi(e), t, Pi(t)];
}
function vd(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !0 : s, u = n.fallbackPlacements, c = n.padding, d = n.boundary, g = n.rootBoundary, f = n.altBoundary, p = n.flipVariations, h = p === void 0 ? !0 : p, m = n.allowedAutoPlacements, v = t.options.placement, w = Ke(v), k = w === v, x = u || (k || !h ? [Hn(v)] : hd(v)), S = [v].concat(x).reduce(function(z, G) {
      return z.concat(Ke(G) === ho ? md(t, {
        placement: G,
        boundary: d,
        rootBoundary: g,
        padding: c,
        flipVariations: h,
        allowedAutoPlacements: m
      }) : G);
    }, []), b = t.rects.reference, T = t.rects.popper, O = /* @__PURE__ */ new Map(), D = !0, V = S[0], L = 0; L < S.length; L++) {
      var P = S[L], $ = Ke(P), N = Wt(P) === Gt, B = [Me, Ue].indexOf($) >= 0, F = B ? "width" : "height", M = Sn(t, {
        placement: P,
        boundary: d,
        rootBoundary: g,
        altBoundary: f,
        padding: c
      }), j = B ? N ? qe : Ie : N ? Ue : Me;
      b[F] > T[F] && (j = Hn(j));
      var ne = Hn(j), ee = [];
      if (i && ee.push(M[$] <= 0), a && ee.push(M[j] <= 0, M[ne] <= 0), ee.every(function(z) {
        return z;
      })) {
        V = P, D = !1;
        break;
      }
      O.set(P, ee);
    }
    if (D)
      for (var R = h ? 3 : 1, A = function(G) {
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
const bd = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: vd,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Oi(e, t, n) {
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
function _i(e) {
  return [Me, qe, Ue, Ie].some(function(t) {
    return e[t] >= 0;
  });
}
function yd(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = Sn(t, {
    elementContext: "reference"
  }), a = Sn(t, {
    altBoundary: !0
  }), u = Oi(s, r), c = Oi(a, o, i), d = _i(u), g = _i(c);
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
const wd = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: yd
};
function xd(e, t, n) {
  var r = Ke(e), o = [Ie, Me].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], a = i[1];
  return s = s || 0, a = (a || 0) * o, [Ie, qe].indexOf(r) >= 0 ? {
    x: a,
    y: s
  } : {
    x: s,
    y: a
  };
}
function Sd(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = Gs.reduce(function(d, g) {
    return d[g] = xd(g, t.rects, i), d;
  }, {}), a = s[t.placement], u = a.x, c = a.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += u, t.modifiersData.popperOffsets.y += c), t.modifiersData[r] = s;
}
const Cd = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Sd
};
function Ed(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Js({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Rd = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ed,
  data: {}
};
function Td(e) {
  return e === "x" ? "y" : "x";
}
function Pd(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, a = s === void 0 ? !1 : s, u = n.boundary, c = n.rootBoundary, d = n.altBoundary, g = n.padding, f = n.tether, p = f === void 0 ? !0 : f, h = n.tetherOffset, m = h === void 0 ? 0 : h, v = Sn(t, {
    boundary: u,
    rootBoundary: c,
    padding: g,
    altBoundary: d
  }), w = Ke(t.placement), k = Wt(t.placement), x = !k, S = yo(w), b = Td(S), T = t.modifiersData.popperOffsets, O = t.rects.reference, D = t.rects.popper, V = typeof m == "function" ? m(Object.assign({}, t.rects, {
    placement: t.placement
  })) : m, L = typeof V == "number" ? {
    mainAxis: V,
    altAxis: V
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, V), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, $ = {
    x: 0,
    y: 0
  };
  if (T) {
    if (i) {
      var N, B = S === "y" ? Me : Ie, F = S === "y" ? Ue : qe, M = S === "y" ? "height" : "width", j = T[S], ne = j + v[B], ee = j - v[F], R = p ? -D[M] / 2 : 0, A = k === Gt ? O[M] : D[M], H = k === Gt ? -D[M] : -O[M], X = t.elements.arrow, z = p && X ? bo(X) : {
        width: 0,
        height: 0
      }, G = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ws(), q = G[B], W = G[F], U = mn(0, O[M], z[M]), K = x ? O[M] / 2 - R - U - q - L.mainAxis : A - U - q - L.mainAxis, Z = x ? -O[M] / 2 + R + U + W + L.mainAxis : H + U + W + L.mainAxis, se = t.elements.arrow && Pn(t.elements.arrow), I = se ? S === "y" ? se.clientTop || 0 : se.clientLeft || 0 : 0, Q = (N = P == null ? void 0 : P[S]) != null ? N : 0, _ = j + K - Q - I, ae = j + Z - Q, Ce = mn(p ? Jn(ne, _) : ne, j, p ? Et(ee, ae) : ee);
      T[S] = Ce, $[S] = Ce - j;
    }
    if (a) {
      var Oe, be = S === "x" ? Me : Ie, bt = S === "x" ? Ue : qe, _e = T[b], Qe = b === "y" ? "height" : "width", Ae = _e + v[be], et = _e - v[bt], Ee = [Me, Ie].indexOf(w) !== -1, _t = (Oe = P == null ? void 0 : P[b]) != null ? Oe : 0, yt = Ee ? Ae : _e - O[Qe] - D[Qe] - _t + L.altAxis, Jt = Ee ? _e + O[Qe] + D[Qe] - _t - L.altAxis : et, $n = p && Ee ? Jc(yt, _e, Jt) : mn(p ? yt : Ae, _e, p ? Jt : et);
      T[b] = $n, $[b] = $n - _e;
    }
    t.modifiersData[r] = $;
  }
}
const kd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Pd,
  requiresIfExists: ["offset"]
};
function Od(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function _d(e) {
  return e === Le(e) || !He(e) ? wo(e) : Od(e);
}
function $d(e) {
  var t = e.getBoundingClientRect(), n = Ut(t.width) / e.offsetWidth || 1, r = Ut(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Nd(e, t, n) {
  n === void 0 && (n = !1);
  var r = He(t), o = He(t) && $d(t), i = ht(t), s = qt(e, o, n), a = {
    scrollLeft: 0,
    scrollTop: 0
  }, u = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  So(i)) && (a = _d(t)), He(t) ? (u = qt(t, !0), u.x += t.clientLeft, u.y += t.clientTop) : i && (u.x = xo(i))), {
    x: s.left + a.scrollLeft - u.x,
    y: s.top + a.scrollTop - u.y,
    width: s.width,
    height: s.height
  };
}
function Md(e) {
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
function Id(e) {
  var t = Md(e);
  return Uc.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Ad(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Fd(e) {
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
var $i = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ni() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Dd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? $i : o;
  return function(a, u, c) {
    c === void 0 && (c = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, $i, i),
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
        m(), d.options = Object.assign({}, i, d.options, k), d.scrollParents = {
          reference: kt(a) ? hn(a) : a.contextElement ? hn(a.contextElement) : [],
          popper: hn(u)
        };
        var x = Id(Fd([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = x.filter(function(S) {
          return S.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var w = d.elements, k = w.reference, x = w.popper;
          if (Ni(k, x)) {
            d.rects = {
              reference: Nd(k, Pn(x), d.options.strategy === "fixed"),
              popper: bo(x)
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
      update: Ad(function() {
        return new Promise(function(v) {
          p.forceUpdate(), v(d);
        });
      }),
      destroy: function() {
        m(), f = !0;
      }
    };
    if (!Ni(a, u))
      return p;
    p.setOptions(c).then(function(v) {
      !f && c.onFirstUpdate && c.onFirstUpdate(v);
    });
    function h() {
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
    function m() {
      g.forEach(function(v) {
        return v();
      }), g = [];
    }
    return p;
  };
}
var Vd = [ad, Rd, id, Xc, Cd, bd, kd, td, wd], Ld = /* @__PURE__ */ Dd({
  defaultModifiers: Vd
});
const Zs = "Popper";
function Bd(e) {
  return zs(Zs, e);
}
vc(Zs, ["root"]);
const jd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], zd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Hd(e, t) {
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
function Zn(e) {
  return typeof e == "function" ? e() : e;
}
function ar(e) {
  return e.nodeType !== void 0;
}
function Gd(e) {
  return !ar(e);
}
const Ud = () => lt({
  root: ["root"]
}, dc(Bd)), qd = {}, Wd = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    slots: h = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = fe(t, jd), w = C.useRef(null), k = Ge(w, n), x = C.useRef(null), S = Ge(x, f), b = C.useRef(S);
  Tt(() => {
    b.current = S;
  }, [S]), C.useImperativeHandle(f, () => x.current, []);
  const T = Hd(d, s), [O, D] = C.useState(T), [V, L] = C.useState(Zn(o));
  C.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), C.useEffect(() => {
    o && L(Zn(o));
  }, [o]), Tt(() => {
    if (!V || !c)
      return;
    const F = (ne) => {
      D(ne.placement);
    };
    if (process.env.NODE_ENV !== "production" && V && ar(V) && V.nodeType === 1) {
      const ne = V.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ne.top === 0 && ne.left === 0 && ne.right === 0 && ne.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let M = [{
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
    u != null && (M = M.concat(u)), g && g.modifiers != null && (M = M.concat(g.modifiers));
    const j = Ld(V, w.current, E({
      placement: T
    }, g, {
      modifiers: M
    }));
    return b.current(j), () => {
      j.destroy(), b.current(null);
    };
  }, [V, a, u, c, g, T]);
  const P = {
    placement: O
  };
  m !== null && (P.TransitionProps = m);
  const $ = Ud(), N = (r = h.root) != null ? r : "div", B = Pt({
    elementType: N,
    externalSlotProps: p.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: k
    },
    ownerState: t,
    className: $.root
  });
  return /* @__PURE__ */ y(N, E({}, B, {
    children: typeof i == "function" ? i(P) : i
  }));
}), Qs = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    popperOptions: f = qd,
    popperRef: p,
    style: h,
    transition: m = !1,
    slotProps: v = {},
    slots: w = {}
  } = t, k = fe(t, zd), [x, S] = C.useState(!0), b = () => {
    S(!1);
  }, T = () => {
    S(!0);
  };
  if (!u && !d && (!m || x))
    return null;
  let O;
  if (i)
    O = i;
  else if (r) {
    const L = Zn(r);
    O = L && ar(L) ? Pe(L).body : Pe(null).body;
  }
  const D = !d && u && (!m || x) ? "none" : void 0, V = m ? {
    in: d,
    onEnter: b,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ y(wn, {
    disablePortal: a,
    container: O,
    children: /* @__PURE__ */ y(Wd, E({
      anchorEl: r,
      direction: s,
      disablePortal: a,
      modifiers: c,
      ref: n,
      open: m ? !x : d,
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
      }, h),
      TransitionProps: V,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Qs.propTypes = {
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
  anchorEl: Yt(l.oneOfType([it, l.object, l.func]), (e) => {
    if (e.open) {
      const t = Zn(e.anchorEl);
      if (t && ar(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Gd(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: mo,
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
const Xd = ["values", "unit", "step"], Kd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => E({}, n, {
    [r.key]: r.val
  }), {});
};
function Yd(e) {
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
  } = e, o = fe(e, Xd), i = Kd(t), s = Object.keys(i);
  function a(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n})`;
  }
  function u(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${n})`;
  }
  function c(f, p) {
    const h = s.indexOf(p);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n}) and (max-width:${(h !== -1 && typeof t[s[h]] == "number" ? t[s[h]] : p) - r / 100}${n})`;
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
const Jd = {
  borderRadius: 4
}, Zd = Jd, Qd = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.string, l.object, l.array]) : {}, vt = Qd;
function vn(e, t) {
  return t ? ot(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Co = {
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
}, Mi = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Co[e]}px)`
};
function at(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Mi;
    return t.reduce((s, a, u) => (s[i.up(i.keys[u])] = n(t[u]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Mi;
    return Object.keys(t).reduce((s, a) => {
      if (Object.keys(i.values || Co).indexOf(a) !== -1) {
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
function ep(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function tp(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function lr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Qn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = lr(e, n) || r, t && (o = t(o, r, e)), o;
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
    const a = s[t], u = s.theme, c = lr(u, r) || {};
    return at(s, a, (g) => {
      let f = Qn(c, o, g);
      return g === f && typeof g == "string" && (f = Qn(c, o, `${t}${g === "default" ? "" : Ye(g)}`, g)), n === !1 ? f : {
        [n]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: vt
  } : {}, i.filterProps = [t], i;
}
function np(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const rp = {
  m: "margin",
  p: "padding"
}, op = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ii = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, ip = np((e) => {
  if (e.length > 2)
    if (Ii[e])
      e = Ii[e];
    else
      return [e];
  const [t, n] = e.split(""), r = rp[t], o = op[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), ur = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], cr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], sp = [...ur, ...cr];
function kn(e, t, n, r) {
  var o;
  const i = (o = lr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ea(e) {
  return kn(e, "spacing", 8, "spacing");
}
function On(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function ap(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = On(t, n), r), {});
}
function lp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = ip(n), i = ap(o, r), s = e[n];
  return at(e, s, i);
}
function ta(e, t) {
  const n = ea(e.theme);
  return Object.keys(e).map((r) => lp(e, t, r, n)).reduce(vn, {});
}
function he(e) {
  return ta(e, ur);
}
he.propTypes = process.env.NODE_ENV !== "production" ? ur.reduce((e, t) => (e[t] = vt, e), {}) : {};
he.filterProps = ur;
function ve(e) {
  return ta(e, cr);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? cr.reduce((e, t) => (e[t] = vt, e), {}) : {};
ve.filterProps = cr;
process.env.NODE_ENV !== "production" && sp.reduce((e, t) => (e[t] = vt, e), {});
function up(e = 8) {
  if (e.mui)
    return e;
  const t = ea({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function dr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? vn(o, t[i](r)) : o, {});
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
const cp = We("border", ze), dp = We("borderTop", ze), pp = We("borderRight", ze), fp = We("borderBottom", ze), gp = We("borderLeft", ze), mp = We("borderColor"), hp = We("borderTopColor"), vp = We("borderRightColor"), bp = We("borderBottomColor"), yp = We("borderLeftColor"), wp = We("outline", ze), xp = We("outlineColor"), pr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = kn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: On(t, r)
    });
    return at(e, e.borderRadius, n);
  }
  return null;
};
pr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: vt
} : {};
pr.filterProps = ["borderRadius"];
dr(cp, dp, pp, fp, gp, mp, hp, vp, bp, yp, pr, wp, xp);
const fr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = kn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: On(t, r)
    });
    return at(e, e.gap, n);
  }
  return null;
};
fr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: vt
} : {};
fr.filterProps = ["gap"];
const gr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = kn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: On(t, r)
    });
    return at(e, e.columnGap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: vt
} : {};
gr.filterProps = ["columnGap"];
const mr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = kn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: On(t, r)
    });
    return at(e, e.rowGap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: vt
} : {};
mr.filterProps = ["rowGap"];
const Sp = xe({
  prop: "gridColumn"
}), Cp = xe({
  prop: "gridRow"
}), Ep = xe({
  prop: "gridAutoFlow"
}), Rp = xe({
  prop: "gridAutoColumns"
}), Tp = xe({
  prop: "gridAutoRows"
}), Pp = xe({
  prop: "gridTemplateColumns"
}), kp = xe({
  prop: "gridTemplateRows"
}), Op = xe({
  prop: "gridTemplateAreas"
}), _p = xe({
  prop: "gridArea"
});
dr(fr, gr, mr, Sp, Cp, Ep, Rp, Tp, Pp, kp, Op, _p);
function jt(e, t) {
  return t === "grey" ? t : e;
}
const $p = xe({
  prop: "color",
  themeKey: "palette",
  transform: jt
}), Np = xe({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: jt
}), Mp = xe({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: jt
});
dr($p, Np, Mp);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ip = xe({
  prop: "width",
  transform: Ve
}), Eo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Co[n];
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
Eo.filterProps = ["maxWidth"];
const Ap = xe({
  prop: "minWidth",
  transform: Ve
}), Fp = xe({
  prop: "height",
  transform: Ve
}), Dp = xe({
  prop: "maxHeight",
  transform: Ve
}), Vp = xe({
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
const Lp = xe({
  prop: "boxSizing"
});
dr(Ip, Eo, Ap, Fp, Dp, Vp, Lp);
const Bp = {
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
    style: pr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: jt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: jt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: jt
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
    style: fr
  },
  rowGap: {
    style: mr
  },
  columnGap: {
    style: gr
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
    style: Eo
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
}, Ro = Bp;
function jp(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function zp(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Hp() {
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
    const f = lr(o, c) || {};
    return g ? g(s) : at(s, r, (h) => {
      let m = Qn(f, d, h);
      return h === m && typeof h == "string" && (m = Qn(f, d, `${n}${h === "default" ? "" : Ye(h)}`, h)), u === !1 ? m : {
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
    const s = (r = i.unstable_sxConfig) != null ? r : Ro;
    function a(u) {
      let c = u;
      if (typeof u == "function")
        c = u(i);
      else if (typeof u != "object")
        return u;
      if (!c)
        return null;
      const d = ep(i.breakpoints), g = Object.keys(d);
      let f = d;
      return Object.keys(c).forEach((p) => {
        const h = zp(c[p], i);
        if (h != null)
          if (typeof h == "object")
            if (s[p])
              f = vn(f, e(p, h, i, s));
            else {
              const m = at({
                theme: i
              }, h, (v) => ({
                [p]: v
              }));
              jp(m, h) ? f[p] = t({
                sx: h,
                theme: i
              }) : f = vn(f, m);
            }
          else
            f = vn(f, e(p, h, i, s));
      }), tp(g, f);
    }
    return Array.isArray(o) ? o.map(a) : a(o);
  }
  return t;
}
const na = Hp();
na.filterProps = ["sx"];
const To = na;
function Gp(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Up = ["breakpoints", "palette", "spacing", "shape"];
function Po(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = fe(e, Up), a = Yd(n), u = up(o);
  let c = ot({
    breakpoints: a,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: E({
      mode: "light"
    }, r),
    spacing: u,
    shape: E({}, Zd, i)
  }, s);
  return c.applyStyles = Gp, c = t.reduce((d, g) => ot(d, g), c), c.unstable_sxConfig = E({}, Ro, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return To({
      sx: g,
      theme: this
    });
  }, c;
}
function qp(e) {
  return Object.keys(e).length === 0;
}
function ra(e = null) {
  const t = C.useContext(Bl);
  return !t || qp(t) ? e : t;
}
const Wp = Po();
function oa(e = Wp) {
  return ra(e);
}
const Xp = ["ownerState"], Kp = ["variants"], Yp = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Jp(e) {
  return Object.keys(e).length === 0;
}
function Zp(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Gn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Qp = Po(), Ai = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Dn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Jp(t) ? e : t[n] || t;
}
function ef(e) {
  return e ? (t, n) => n[e] : null;
}
function Un(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, Xp);
  const o = typeof e == "function" ? e(E({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Un(i, E({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let a = fe(o, Kp);
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
function tf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Qp,
    rootShouldForwardProp: r = Gn,
    slotShouldForwardProp: o = Gn
  } = e, i = (s) => To(E({}, s, {
    theme: Dn(E({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, a = {}) => {
    jl(s, (b) => b.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: u,
      slot: c,
      skipVariantsResolver: d,
      skipSx: g,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = ef(Ai(c))
    } = a, p = fe(a, Yp), h = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      c && c !== "Root" && c !== "root" || !1
    ), m = g || !1;
    let v;
    process.env.NODE_ENV !== "production" && u && (v = `${u}-${Ai(c || "Root")}`);
    let w = Gn;
    c === "Root" || c === "root" ? w = r : c ? w = o : Zp(s) && (w = void 0);
    const k = Ll(s, E({
      shouldForwardProp: w,
      label: v
    }, p)), x = (b) => typeof b == "function" && b.__emotion_real !== b || St(b) ? (T) => Un(b, E({}, T, {
      theme: Dn({
        theme: T.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : b, S = (b, ...T) => {
      let O = x(b);
      const D = T ? T.map(x) : [];
      u && f && D.push((P) => {
        const $ = Dn(E({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        if (!$.components || !$.components[u] || !$.components[u].styleOverrides)
          return null;
        const N = $.components[u].styleOverrides, B = {};
        return Object.entries(N).forEach(([F, M]) => {
          B[F] = Un(M, E({}, P, {
            theme: $
          }));
        }), f(P, B);
      }), u && !h && D.push((P) => {
        var $;
        const N = Dn(E({}, P, {
          defaultTheme: n,
          themeId: t
        })), B = N == null || ($ = N.components) == null || ($ = $[u]) == null ? void 0 : $.variants;
        return Un({
          variants: B
        }, E({}, P, {
          theme: N
        }));
      }), m || D.push(i);
      const V = D.length - T.length;
      if (Array.isArray(b) && V > 0) {
        const P = new Array(V).fill("");
        O = [...b, ...P], O.raw = [...b.raw, ...P];
      }
      const L = k(O, ...D);
      if (process.env.NODE_ENV !== "production") {
        let P;
        u && (P = `${u}${Ye(c || "")}`), P === void 0 && (P = `Styled(${Lu(s)})`), L.displayName = P;
      }
      return s.muiName && (L.muiName = s.muiName), L;
    };
    return k.withConfig && (S.withConfig = k.withConfig), S;
  };
}
function nf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Fs(t.components[n].defaultProps, r);
}
function rf({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = oa(n);
  return r && (o = o[r] || o), nf({
    theme: o,
    name: t,
    props: e
  });
}
function ko(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), lc(e, t, n);
}
function of(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ot(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ot(of(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : zt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : zt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function hr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function sf(e) {
  e = Ot(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (c, d = (c + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let a = "rgb";
  const u = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (a += "a", u.push(t[3])), hr({
    type: a,
    values: u
  });
}
function Fi(e) {
  e = Ot(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ot(sf(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Di(e, t) {
  const n = Fi(e), r = Fi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function er(e, t) {
  return e = Ot(e), t = ko(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, hr(e);
}
function af(e, t) {
  if (e = Ot(e), t = ko(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return hr(e);
}
function lf(e, t) {
  if (e = Ot(e), t = ko(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return hr(e);
}
function uf(e, t) {
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
const cf = {
  black: "#000",
  white: "#fff"
}, Cn = cf, df = {
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
}, pf = df, ff = {
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
}, $t = ff, gf = {
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
}, Nt = gf, mf = {
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
}, sn = mf, hf = {
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
}, Mt = hf, vf = {
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
}, It = vf, bf = {
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
}, At = bf, yf = ["mode", "contrastThreshold", "tonalOffset"], Vi = {
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
    paper: Cn.white,
    default: Cn.white
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
}, $r = {
  text: {
    primary: Cn.white,
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
    active: Cn.white,
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
function Li(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = lf(e.main, o) : t === "dark" && (e.dark = af(e.main, i)));
}
function wf(e = "light") {
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
function xf(e = "light") {
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
function Sf(e = "light") {
  return e === "dark" ? {
    main: Nt[500],
    light: Nt[300],
    dark: Nt[700]
  } : {
    main: Nt[700],
    light: Nt[400],
    dark: Nt[800]
  };
}
function Cf(e = "light") {
  return e === "dark" ? {
    main: It[400],
    light: It[300],
    dark: It[700]
  } : {
    main: It[700],
    light: It[500],
    dark: It[900]
  };
}
function Ef(e = "light") {
  return e === "dark" ? {
    main: At[400],
    light: At[300],
    dark: At[700]
  } : {
    main: At[800],
    light: At[500],
    dark: At[900]
  };
}
function Rf(e = "light") {
  return e === "dark" ? {
    main: sn[400],
    light: sn[300],
    dark: sn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: sn[500],
    dark: sn[900]
  };
}
function Tf(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, yf), i = e.primary || wf(t), s = e.secondary || xf(t), a = e.error || Sf(t), u = e.info || Cf(t), c = e.success || Ef(t), d = e.warning || Rf(t);
  function g(m) {
    const v = Di(m, $r.text.primary) >= n ? $r.text.primary : Vi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = Di(m, v);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${v} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const f = ({
    color: m,
    name: v,
    mainShade: w = 500,
    lightShade: k = 300,
    darkShade: x = 700
  }) => {
    if (m = E({}, m), !m.main && m[w] && (m.main = m[w]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : zt(11, v ? ` (${v})` : "", w));
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
} });` : zt(12, v ? ` (${v})` : "", JSON.stringify(m.main)));
    return Li(m, "light", k, r), Li(m, "dark", x, r), m.contrastText || (m.contrastText = g(m.main)), m;
  }, p = {
    dark: $r,
    light: Vi
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), ot(E({
    // A collection of common colors.
    common: E({}, Cn),
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
    grey: pf,
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
const Pf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function kf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Bi = {
  textTransform: "uppercase"
}, ji = '"Roboto", "Helvetica", "Arial", sans-serif';
function Of(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = ji,
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
  } = n, f = fe(n, Pf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof c != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = g || ((w) => `${w / c * p}rem`), m = (w, k, x, S, b) => E({
    fontFamily: r,
    fontWeight: w,
    fontSize: h(k),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === ji ? {
    letterSpacing: `${kf(S / k)}em`
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
    button: m(a, 14, 1.75, 0.4, Bi),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Bi),
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
    pxToRem: h,
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
const _f = 0.2, $f = 0.14, Nf = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${_f})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${$f})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Nf})`].join(",");
}
const Mf = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], If = Mf, Af = ["duration", "easing", "delay"], Ff = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Df = {
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
function zi(e) {
  return `${Math.round(e)}ms`;
}
function Vf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Lf(e) {
  const t = E({}, Ff, e.easing), n = E({}, Df, e.duration);
  return E({
    getAutoHeightDuration: Vf,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: a = t.easeInOut,
        delay: u = 0
      } = i, c = fe(i, Af);
      if (process.env.NODE_ENV !== "production") {
        const d = (f) => typeof f == "string", g = (f) => !isNaN(parseFloat(f));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !g(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(a) || console.error('MUI: Argument "easing" must be a string.'), !g(u) && !d(u) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(c).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(c).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : zi(s)} ${a} ${typeof u == "string" ? u : zi(u)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Bf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, jf = Bf, zf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Hf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = fe(e, zf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : zt(18));
  const a = Tf(r), u = Po(e);
  let c = ot(u, {
    mixins: uf(u.breakpoints, n),
    palette: a,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: If.slice(),
    typography: Of(a, i),
    transitions: Lf(o),
    zIndex: E({}, jf)
  });
  if (c = ot(c, s), c = t.reduce((d, g) => ot(d, g), c), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], g = (f, p) => {
      let h;
      for (h in f) {
        const m = f[h];
        if (d.indexOf(h) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = Ze("", h);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
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
    Object.keys(c.components).forEach((f) => {
      const p = c.components[f].styleOverrides;
      p && f.indexOf("Mui") === 0 && g(p, f);
    });
  }
  return c.unstable_sxConfig = E({}, Ro, s == null ? void 0 : s.unstable_sxConfig), c.unstable_sx = function(g) {
    return To({
      sx: g,
      theme: this
    });
  }, c;
}
const Gf = Hf(), Oo = Gf, _o = "$$material", ia = (e) => Gn(e) && e !== "classes", Uf = tf({
  themeId: _o,
  defaultTheme: Oo,
  rootShouldForwardProp: ia
}), ke = Uf;
function _n() {
  const e = oa(Oo);
  return process.env.NODE_ENV !== "production" && C.useDebugValue(e), e[_o] || e;
}
function ut({
  props: e,
  name: t
}) {
  return rf({
    props: e,
    name: t,
    defaultTheme: Oo,
    themeId: _o
  });
}
function Yr(e, t) {
  return Yr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Yr(e, t);
}
function qf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Yr(e, t);
}
const Hi = {
  disabled: !1
};
var Wf = process.env.NODE_ENV !== "production" ? l.oneOfType([l.number, l.shape({
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
const sa = Bt.createContext(null);
var Xf = function(t) {
  return t.scrollTop;
}, pn = "unmounted", wt = "exited", xt = "entering", Lt = "entered", Jr = "exiting", ct = /* @__PURE__ */ function(e) {
  qf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, a = s && !s.isMounting ? r.enter : r.appear, u;
    return i.appearStatus = null, r.in ? a ? (u = wt, i.appearStatus = xt) : u = Lt : r.unmountOnExit || r.mountOnEnter ? u = pn : u = wt, i.state = {
      status: u
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var s = o.in;
    return s && i.status === pn ? {
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
      this.props.in ? s !== xt && s !== Lt && (i = xt) : (s === xt || s === Lt) && (i = Jr);
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
          var s = this.props.nodeRef ? this.props.nodeRef.current : In.findDOMNode(this);
          s && Xf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === wt && this.setState({
        status: pn
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, a = this.context ? this.context.isMounting : o, u = this.props.nodeRef ? [a] : [In.findDOMNode(this), a], c = u[0], d = u[1], g = this.getTimeouts(), f = a ? g.appear : g.enter;
    if (!o && !s || Hi.disabled) {
      this.safeSetState({
        status: Lt
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
          status: Lt
        }, function() {
          i.props.onEntered(c, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), a = this.props.nodeRef ? void 0 : In.findDOMNode(this);
    if (!i || Hi.disabled) {
      this.safeSetState({
        status: wt
      }, function() {
        o.props.onExited(a);
      });
      return;
    }
    this.props.onExit(a), this.safeSetState({
      status: Jr
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : In.findDOMNode(this), a = o == null && !this.props.addEndListener;
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
    if (o === pn)
      return null;
    var i = this.props, s = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var a = fe(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Bt.createElement(sa.Provider, {
        value: null
      }, typeof s == "function" ? s(o, a) : Bt.cloneElement(Bt.Children.only(s), a))
    );
  }, t;
}(Bt.Component);
ct.contextType = sa;
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
    var n = Wf;
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
function Ft() {
}
ct.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ft,
  onEntering: Ft,
  onEntered: Ft,
  onExit: Ft,
  onExiting: Ft,
  onExited: Ft
};
ct.UNMOUNTED = pn;
ct.EXITED = wt;
ct.ENTERING = xt;
ct.ENTERED = Lt;
ct.EXITING = Jr;
const aa = ct, la = (e) => e.scrollTop;
function tr(e, t) {
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
const Kf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Zr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Yf = {
  entering: {
    opacity: 1,
    transform: Zr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Nr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), $o = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    style: h,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = aa
  } = t, w = fe(t, Kf), k = cn(), x = C.useRef(), S = _n(), b = C.useRef(null), T = Ge(b, i.ref, n), O = (F) => (M) => {
    if (F) {
      const j = b.current;
      M === void 0 ? F(j) : F(j, M);
    }
  }, D = O(d), V = O((F, M) => {
    la(F);
    const {
      duration: j,
      delay: ne,
      easing: ee
    } = tr({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let R;
    m === "auto" ? (R = S.transitions.getAutoHeightDuration(F.clientHeight), x.current = R) : R = j, F.style.transition = [S.transitions.create("opacity", {
      duration: R,
      delay: ne
    }), S.transitions.create("transform", {
      duration: Nr ? R : R * 0.666,
      delay: ne,
      easing: ee
    })].join(","), u && u(F, M);
  }), L = O(c), P = O(p), $ = O((F) => {
    const {
      duration: M,
      delay: j,
      easing: ne
    } = tr({
      style: h,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let ee;
    m === "auto" ? (ee = S.transitions.getAutoHeightDuration(F.clientHeight), x.current = ee) : ee = M, F.style.transition = [S.transitions.create("opacity", {
      duration: ee,
      delay: j
    }), S.transitions.create("transform", {
      duration: Nr ? ee : ee * 0.666,
      delay: Nr ? j : j || ee * 0.333,
      easing: ne
    })].join(","), F.style.opacity = 0, F.style.transform = Zr(0.75), g && g(F);
  }), N = O(f);
  return /* @__PURE__ */ y(v, E({
    appear: o,
    in: a,
    nodeRef: b,
    onEnter: V,
    onEntered: L,
    onEntering: D,
    onExit: $,
    onExited: N,
    onExiting: P,
    addEndListener: (F) => {
      m === "auto" && k.start(x.current || 0, F), r && r(b.current, F);
    },
    timeout: m === "auto" ? null : m
  }, w, {
    children: (F, M) => /* @__PURE__ */ C.cloneElement(i, E({
      style: E({
        opacity: 0,
        transform: Zr(0.75),
        visibility: F === "exited" && !a ? "hidden" : void 0
      }, Yf[F], h, i.props.style),
      ref: T
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && ($o.propTypes = {
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
  children: En.isRequired,
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
$o.muiSupportAuto = !0;
const Qr = $o, Jf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Gi = Jf, Zf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Qf = ke(Qs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ua = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r;
  const o = ra(), i = ut({
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
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: w,
    transition: k,
    slots: x,
    slotProps: S
  } = i, b = fe(i, Zf), T = (r = x == null ? void 0 : x.root) != null ? r : u == null ? void 0 : u.Root, O = E({
    anchorEl: s,
    container: d,
    disablePortal: g,
    keepMounted: f,
    modifiers: p,
    open: h,
    placement: m,
    popperOptions: v,
    popperRef: w,
    transition: k
  }, b);
  return /* @__PURE__ */ y(Qf, E({
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
process.env.NODE_ENV !== "production" && (ua.propTypes = {
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
  popperRef: mo,
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
const ca = ua;
function eg(e) {
  return Ze("MuiTooltip", e);
}
const tg = mt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), pt = tg, ng = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function rg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const og = (e) => {
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
  return lt(s, eg, t);
}, ig = ke(ca, {
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
})), sg = ke("div", {
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
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : er(e.palette.grey[700], 0.92),
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
  lineHeight: `${rg(16 / 14)}em`,
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
})), ag = ke("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : er(e.palette.grey[700], 0.9),
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
let Vn = !1;
const Ui = new Rn();
let an = {
  x: 0,
  y: 0
};
function Ln(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const da = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i, s, a, u, c, d, g, f, p, h, m, v, w, k, x, S, b;
  const T = ut({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: O = !1,
    children: D,
    components: V = {},
    componentsProps: L = {},
    describeChild: P = !1,
    disableFocusListener: $ = !1,
    disableHoverListener: N = !1,
    disableInteractive: B = !1,
    disableTouchListener: F = !1,
    enterDelay: M = 100,
    enterNextDelay: j = 0,
    enterTouchDelay: ne = 700,
    followCursor: ee = !1,
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
    title: se,
    TransitionComponent: I = Qr,
    TransitionProps: Q
  } = T, _ = fe(T, ng), ae = /* @__PURE__ */ C.isValidElement(D) ? D : /* @__PURE__ */ y("span", {
    children: D
  }), Ce = _n(), Oe = Ce.direction === "rtl", [be, bt] = C.useState(), [_e, Qe] = C.useState(null), Ae = C.useRef(!1), et = B || ee, Ee = cn(), _t = cn(), yt = cn(), Jt = cn(), [$n, Lo] = _s({
    controlled: G,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = $n;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = C.useRef(G !== void 0);
    C.useEffect(() => {
      be && be.disabled && !re && se !== "" && be.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [se, be, re]);
  }
  const br = Os(R), Zt = C.useRef(), Nn = yn(() => {
    Zt.current !== void 0 && (document.body.style.WebkitUserSelect = Zt.current, Zt.current = void 0), Jt.clear();
  });
  C.useEffect(() => Nn, [Nn]);
  const Bo = (re) => {
    Ui.clear(), Vn = !0, Lo(!0), z && !tt && z(re);
  }, Mn = yn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      Ui.start(800 + A, () => {
        Vn = !1;
      }), Lo(!1), X && tt && X(re), Ee.start(Ce.transitions.duration.shortest, () => {
        Ae.current = !1;
      });
    }
  ), yr = (re) => {
    Ae.current && re.type !== "touchstart" || (be && be.removeAttribute("title"), _t.clear(), yt.clear(), M || Vn && j ? _t.start(Vn ? j : M, () => {
      Bo(re);
    }) : Bo(re));
  }, jo = (re) => {
    _t.clear(), yt.start(A, () => {
      Mn(re);
    });
  }, {
    isFocusVisibleRef: zo,
    onBlur: Xa,
    onFocus: Ka,
    ref: Ya
  } = $s(), [, Ho] = C.useState(!1), Go = (re) => {
    Xa(re), zo.current === !1 && (Ho(!1), jo(re));
  }, Uo = (re) => {
    be || bt(re.currentTarget), Ka(re), zo.current === !0 && (Ho(!0), yr(re));
  }, qo = (re) => {
    Ae.current = !0;
    const Fe = ae.props;
    Fe.onTouchStart && Fe.onTouchStart(re);
  }, Wo = yr, Xo = jo, Ja = (re) => {
    qo(re), yt.clear(), Ee.clear(), Nn(), Zt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Jt.start(ne, () => {
      document.body.style.WebkitUserSelect = Zt.current, yr(re);
    });
  }, Za = (re) => {
    ae.props.onTouchEnd && ae.props.onTouchEnd(re), Nn(), yt.start(H, () => {
      Mn(re);
    });
  };
  C.useEffect(() => {
    if (!tt)
      return;
    function re(Fe) {
      (Fe.key === "Escape" || Fe.key === "Esc") && Mn(Fe);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [Mn, tt]);
  const Qa = Ge(ae.ref, Ya, bt, n);
  !se && se !== 0 && (tt = !1);
  const wr = C.useRef(), el = (re) => {
    const Fe = ae.props;
    Fe.onMouseMove && Fe.onMouseMove(re), an = {
      x: re.clientX,
      y: re.clientY
    }, wr.current && wr.current.update();
  }, Qt = {}, xr = typeof se == "string";
  P ? (Qt.title = !tt && xr && !N ? se : null, Qt["aria-describedby"] = tt ? br : null) : (Qt["aria-label"] = xr ? se : null, Qt["aria-labelledby"] = tt && !xr ? br : null);
  const je = E({}, Qt, _, ae.props, {
    className: Te(_.className, ae.props.className),
    onTouchStart: qo,
    ref: Qa
  }, ee ? {
    onMouseMove: el
  } : {});
  process.env.NODE_ENV !== "production" && (je["data-mui-internal-clone-element"] = !0, C.useEffect(() => {
    be && !be.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [be]));
  const en = {};
  F || (je.onTouchStart = Ja, je.onTouchEnd = Za), N || (je.onMouseOver = Ln(Wo, je.onMouseOver), je.onMouseLeave = Ln(Xo, je.onMouseLeave), et || (en.onMouseOver = Wo, en.onMouseLeave = Xo)), $ || (je.onFocus = Ln(Uo, je.onFocus), je.onBlur = Ln(Go, je.onBlur), et || (en.onFocus = Uo, en.onBlur = Go)), process.env.NODE_ENV !== "production" && ae.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ae.props.title}\` or the Tooltip component.`].join(`
`));
  const tl = C.useMemo(() => {
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
  }, [_e, U]), tn = E({}, T, {
    isRtl: Oe,
    arrow: O,
    disableInteractive: et,
    placement: q,
    PopperComponentProp: W,
    touch: Ae.current
  }), Sr = og(tn), Ko = (r = (o = Z.popper) != null ? o : V.Popper) != null ? r : ig, Yo = (i = (s = (a = Z.transition) != null ? a : V.Transition) != null ? s : I) != null ? i : Qr, Jo = (u = (c = Z.tooltip) != null ? c : V.Tooltip) != null ? u : sg, Zo = (d = (g = Z.arrow) != null ? g : V.Arrow) != null ? d : ag, nl = dn(Ko, E({}, U, (f = K.popper) != null ? f : L.popper, {
    className: Te(Sr.popper, U == null ? void 0 : U.className, (p = (h = K.popper) != null ? h : L.popper) == null ? void 0 : p.className)
  }), tn), rl = dn(Yo, E({}, Q, (m = K.transition) != null ? m : L.transition), tn), ol = dn(Jo, E({}, (v = K.tooltip) != null ? v : L.tooltip, {
    className: Te(Sr.tooltip, (w = (k = K.tooltip) != null ? k : L.tooltip) == null ? void 0 : w.className)
  }), tn), il = dn(Zo, E({}, (x = K.arrow) != null ? x : L.arrow, {
    className: Te(Sr.arrow, (S = (b = K.arrow) != null ? b : L.arrow) == null ? void 0 : S.className)
  }), tn);
  return /* @__PURE__ */ te(C.Fragment, {
    children: [/* @__PURE__ */ C.cloneElement(ae, je), /* @__PURE__ */ y(Ko, E({
      as: W ?? ca,
      placement: q,
      anchorEl: ee ? {
        getBoundingClientRect: () => ({
          top: an.y,
          left: an.x,
          right: an.x,
          bottom: an.y,
          width: 0,
          height: 0
        })
      } : be,
      popperRef: wr,
      open: be ? tt : !1,
      id: br,
      transition: !0
    }, en, nl, {
      popperOptions: tl,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ y(Yo, E({
        timeout: Ce.transitions.duration.shorter
      }, re, rl, {
        children: /* @__PURE__ */ te(Jo, E({}, ol, {
          children: [se, O ? /* @__PURE__ */ y(Zo, E({}, il, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (da.propTypes = {
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
  children: En.isRequired,
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
const lg = da;
var No = {}, pa = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(pa);
var ug = pa.exports, Mr = {};
function cg(e) {
  return Ze("MuiSvgIcon", e);
}
mt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const dg = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], pg = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ye(t)}`, `fontSize${Ye(n)}`]
  };
  return lt(o, cg, r);
}, fg = ke("svg", {
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
  var n, r, o, i, s, a, u, c, d, g, f, p, h;
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
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Mo = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
  } = r, p = fe(r, dg), h = /* @__PURE__ */ C.isValidElement(o) && o.type === "svg", m = E({}, r, {
    color: s,
    component: a,
    fontSize: u,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: f,
    hasSvgAsChild: h
  }), v = {};
  d || (v.viewBox = f);
  const w = pg(m);
  return /* @__PURE__ */ te(fg, E({
    as: a,
    className: Te(w.root, i),
    focusable: "false",
    color: c,
    "aria-hidden": g ? void 0 : !0,
    role: g ? "img" : void 0,
    ref: n
  }, v, p, h && o.props, {
    ownerState: m,
    children: [h ? o.props.children : o, g ? /* @__PURE__ */ y("title", {
      children: g
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Mo.propTypes = {
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
Mo.muiName = "SvgIcon";
const qi = Mo;
function fa(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ y(qi, E({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = qi.muiName, /* @__PURE__ */ C.memo(/* @__PURE__ */ C.forwardRef(n));
}
const gg = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ds.configure(e);
  }
}, mg = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ye,
  createChainedFunction: Ur,
  createSvgIcon: fa,
  debounce: ks,
  deprecatedPropType: ju,
  isMuiElement: zu,
  ownerDocument: Pe,
  ownerWindow: Ht,
  requirePropFactory: Hu,
  setRef: Kn,
  unstable_ClassNameGenerator: gg,
  unstable_useEnhancedEffect: Tt,
  unstable_useId: Os,
  unsupportedProp: qu,
  useControlled: _s,
  useEventCallback: yn,
  useForkRef: Ge,
  useIsFocusVisible: $s
}, Symbol.toStringTag, { value: "Module" })), hg = /* @__PURE__ */ wu(mg);
var Wi;
function vg() {
  return Wi || (Wi = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = hg;
  }(Mr)), Mr;
}
var bg = ug;
Object.defineProperty(No, "__esModule", {
  value: !0
});
var ga = No.default = void 0, yg = bg(vg()), wg = sl;
ga = No.default = (0, yg.default)(/* @__PURE__ */ (0, wg.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Xi(e, t, n) {
  return e ? /* @__PURE__ */ y(as, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ y("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ma(e) {
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
    focusVisibleClassName: h,
    id: m,
    children: v
  } = e, w = /* @__PURE__ */ y(
    kl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: a,
      className: u,
      disabled: c,
      dense: d,
      disableGutters: f,
      divider: p,
      focusVisibleClassName: h,
      onClick: t,
      id: m,
      children: n ? /* @__PURE__ */ te(nr, { children: [
        Xi(i, n, !0),
        /* @__PURE__ */ y(Ol, { primary: n, inset: !i && o }),
        g ? /* @__PURE__ */ y(as, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ y(ga, {}) }) : Xi(s, n, !1)
      ] }) : v
    }
  );
  return r ? /* @__PURE__ */ y(lg, { title: r, placement: "right", children: /* @__PURE__ */ y("div", { children: w }) }) : w;
}
function ha(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function xg(e) {
  const [t, n] = Se(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (c) => {
    n(c.currentTarget);
  }, a = () => {
    n(void 0);
  }, u = () => {
    let c = ha(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return c = c.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ y(Io, { ...e, includedGroups: c });
  };
  return /* @__PURE__ */ te(nr, { children: [
    /* @__PURE__ */ y(ma, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ y(
      _l,
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
const Sg = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Io(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = rr(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      ha(t).filter((h) => !("menuItem" in h.group))
    ), g = Object.values(d).sort(
      (h, m) => (h.group.order || 0) - (m.group.order || 0)
    ), f = [];
    g.forEach((h) => {
      Sg(h.id, t.items).forEach(
        (m) => f.push({ item: m, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const p = f.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
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
      const h = f.group + g;
      return /* @__PURE__ */ y(
        ma,
        {
          onClick: (m) => {
            n == null || n(m), r(f);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ y(
      xg,
      {
        parentMenuItem: f,
        parentItemProps: p,
        ...e
      },
      c + f.id
    );
  }) }, c);
}
function Cg(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, a]) => ({ id: s, group: a })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ y(Io, { ...e, includedGroups: i });
}
function Eg({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ te(
    ls,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ y("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ y($l, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ y(
          Cg,
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
function Rg({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = rr(() => {
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
    ls,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, a) => /* @__PURE__ */ y(
        Eg,
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
const va = /* @__PURE__ */ C.createContext({});
process.env.NODE_ENV !== "production" && (va.displayName = "ListContext");
const Tg = va;
function Pg(e) {
  return Ze("MuiList", e);
}
mt("MuiList", ["root", "padding", "dense", "subheader"]);
const kg = ["children", "className", "component", "dense", "disablePadding", "subheader"], Og = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return lt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Pg, t);
}, _g = ke("ul", {
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
})), ba = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
  } = r, d = fe(r, kg), g = C.useMemo(() => ({
    dense: a
  }), [a]), f = E({}, r, {
    component: s,
    dense: a,
    disablePadding: u
  }), p = Og(f);
  return /* @__PURE__ */ y(Tg.Provider, {
    value: g,
    children: /* @__PURE__ */ te(_g, E({
      as: s,
      className: Te(p.root, i),
      ref: n,
      ownerState: f
    }, d, {
      children: [c, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ba.propTypes = {
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
const $g = ba, Ng = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Ir(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Ki(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function ya(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function ln(e, t, n, r, o, i) {
  let s = !1, a = o(e, t, t ? n : !1);
  for (; a; ) {
    if (a === e.firstChild) {
      if (s)
        return !1;
      s = !0;
    }
    const u = r ? !1 : a.disabled || a.getAttribute("aria-disabled") === "true";
    if (!a.hasAttribute("tabindex") || !ya(a, i) || u)
      a = o(e, a, n);
    else
      return a.focus(), !0;
  }
  return !1;
}
const wa = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
  } = t, f = fe(t, Ng), p = C.useRef(null), h = C.useRef({
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
        const T = `${Ns(Pe(x))}px`;
        p.current.style[S.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, p.current.style.width = `calc(100% + ${T})`;
      }
      return p.current;
    }
  }), []);
  const m = (x) => {
    const S = p.current, b = x.key, T = Pe(S).activeElement;
    if (b === "ArrowDown")
      x.preventDefault(), ln(S, T, c, u, Ir);
    else if (b === "ArrowUp")
      x.preventDefault(), ln(S, T, c, u, Ki);
    else if (b === "Home")
      x.preventDefault(), ln(S, null, c, u, Ir);
    else if (b === "End")
      x.preventDefault(), ln(S, null, c, u, Ki);
    else if (b.length === 1) {
      const O = h.current, D = b.toLowerCase(), V = performance.now();
      O.keys.length > 0 && (V - O.lastTime > 500 ? (O.keys = [], O.repeating = !0, O.previousKeyMatched = !0) : O.repeating && D !== O.keys[0] && (O.repeating = !1)), O.lastTime = V, O.keys.push(D);
      const L = T && !O.repeating && ya(T, O);
      O.previousKeyMatched && (L || ln(S, T, !1, u, Ir, O)) ? x.preventDefault() : O.previousKeyMatched = !1;
    }
    d && d(x);
  }, v = Ge(p, n);
  let w = -1;
  C.Children.forEach(s, (x, S) => {
    if (!/* @__PURE__ */ C.isValidElement(x)) {
      w === S && (w += 1, w >= s.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Xn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (g === "selectedMenu" && x.props.selected || w === -1) && (w = S), w === S && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= s.length && (w = -1));
  });
  const k = C.Children.map(s, (x, S) => {
    if (S === w) {
      const b = {};
      return i && (b.autoFocus = !0), x.props.tabIndex === void 0 && g === "selectedMenu" && (b.tabIndex = 0), /* @__PURE__ */ C.cloneElement(x, b);
    }
    return x;
  });
  return /* @__PURE__ */ y($g, E({
    role: "menu",
    ref: v,
    className: a,
    onKeyDown: m,
    tabIndex: o ? 0 : -1
  }, f, {
    children: k
  }));
});
process.env.NODE_ENV !== "production" && (wa.propTypes = {
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
const Mg = wa, Ig = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Ag = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, xa = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = _n(), o = {
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
    onExited: h,
    onExiting: m,
    style: v,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: k = aa
  } = t, x = fe(t, Ig), S = C.useRef(null), b = Ge(S, a.ref, n), T = (B) => (F) => {
    if (B) {
      const M = S.current;
      F === void 0 ? B(M) : B(M, F);
    }
  }, O = T(f), D = T((B, F) => {
    la(B);
    const M = tr({
      style: v,
      timeout: w,
      easing: u
    }, {
      mode: "enter"
    });
    B.style.webkitTransition = r.transitions.create("opacity", M), B.style.transition = r.transitions.create("opacity", M), d && d(B, F);
  }), V = T(g), L = T(m), P = T((B) => {
    const F = tr({
      style: v,
      timeout: w,
      easing: u
    }, {
      mode: "exit"
    });
    B.style.webkitTransition = r.transitions.create("opacity", F), B.style.transition = r.transitions.create("opacity", F), p && p(B);
  }), $ = T(h);
  return /* @__PURE__ */ y(k, E({
    appear: s,
    in: c,
    nodeRef: S,
    onEnter: D,
    onEntered: V,
    onEntering: O,
    onExit: P,
    onExited: $,
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
      }, Ag[B], v, a.props.style),
      ref: b
    }, F))
  }));
});
process.env.NODE_ENV !== "production" && (xa.propTypes = {
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
  children: En.isRequired,
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
const Fg = xa;
function Dg(e) {
  return Ze("MuiBackdrop", e);
}
mt("MuiBackdrop", ["root", "invisible"]);
const Vg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Lg = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return lt({
    root: ["root", n && "invisible"]
  }, Dg, t);
}, Bg = ke("div", {
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
})), Sa = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    slotProps: h = {},
    slots: m = {},
    TransitionComponent: v = Fg,
    transitionDuration: w
  } = s, k = fe(s, Vg), x = E({}, s, {
    component: c,
    invisible: f
  }), S = Lg(x), b = (r = h.root) != null ? r : g.root;
  return /* @__PURE__ */ y(v, E({
    in: p,
    timeout: w
  }, k, {
    children: /* @__PURE__ */ y(Bg, E({
      "aria-hidden": !0
    }, b, {
      as: (o = (i = m.root) != null ? i : d.Root) != null ? o : c,
      className: Te(S.root, u, b == null ? void 0 : b.className),
      ownerState: E({}, x, b == null ? void 0 : b.ownerState),
      classes: S,
      ref: n,
      children: a
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Sa.propTypes = {
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
const jg = Sa;
function zg(e) {
  return Ze("MuiModal", e);
}
mt("MuiModal", ["root", "hidden", "backdrop"]);
const Hg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Gg = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return lt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, zg, r);
}, Ug = ke("div", {
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
})), qg = ke(jg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ca = /* @__PURE__ */ C.forwardRef(function(t, n) {
  var r, o, i, s, a, u;
  const c = ut({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = qg,
    BackdropProps: g,
    className: f,
    closeAfterTransition: p = !1,
    children: h,
    container: m,
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
    open: $,
    slotProps: N,
    slots: B
    // eslint-disable-next-line react/prop-types
  } = c, F = fe(c, Hg), M = E({}, c, {
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
    getTransitionProps: ee,
    portalRef: R,
    isTopModal: A,
    exited: H,
    hasTransition: X
  } = Mc(E({}, M, {
    rootRef: n
  })), z = E({}, M, {
    exited: H
  }), G = Gg(z), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), X) {
    const {
      onEnter: Q,
      onExited: _
    } = ee();
    q.onEnter = Q, q.onExited = _;
  }
  const W = (r = (o = B == null ? void 0 : B.root) != null ? o : w.Root) != null ? r : Ug, U = (i = (s = B == null ? void 0 : B.backdrop) != null ? s : w.Backdrop) != null ? i : d, K = (a = N == null ? void 0 : N.root) != null ? a : k.root, Z = (u = N == null ? void 0 : N.backdrop) != null ? u : k.backdrop, se = Pt({
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
  }), I = Pt({
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
  return !L && !$ && (!X || H) ? null : /* @__PURE__ */ y(wn, {
    ref: R,
    container: m,
    disablePortal: T,
    children: /* @__PURE__ */ te(W, E({}, se, {
      children: [!V && d ? /* @__PURE__ */ y(U, E({}, I)) : null, /* @__PURE__ */ y(Yn, {
        disableEnforceFocus: S,
        disableAutoFocus: x,
        disableRestoreFocus: O,
        isEnabled: A,
        open: $,
        children: /* @__PURE__ */ C.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ca.propTypes = {
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
  children: En.isRequired,
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
const Wg = Ca;
function Xg(e) {
  return Ze("MuiPaper", e);
}
mt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Kg = ["className", "component", "elevation", "square", "variant"], Yg = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return lt(i, Xg, o);
}, Jg = ke("div", {
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
    backgroundImage: `linear-gradient(${er("#fff", Gi(t.elevation))}, ${er("#fff", Gi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Ea = /* @__PURE__ */ C.forwardRef(function(t, n) {
  const r = ut({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: a = !1,
    variant: u = "elevation"
  } = r, c = fe(r, Kg), d = E({}, r, {
    component: i,
    elevation: s,
    square: a,
    variant: u
  }), g = Yg(d);
  return process.env.NODE_ENV !== "production" && _n().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ y(Jg, E({
    as: i,
    ownerState: d,
    className: Te(g.root, o),
    ref: n
  }, c));
});
process.env.NODE_ENV !== "production" && (Ea.propTypes = {
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
  elevation: Yt(As, (e) => {
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
const Zg = Ea;
function Qg(e) {
  return Ze("MuiPopover", e);
}
mt("MuiPopover", ["root", "paper"]);
const em = ["onEntering"], tm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], nm = ["slotProps"];
function Yi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Ji(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Zi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function qn(e) {
  return typeof e == "function" ? e() : e;
}
const rm = (e) => {
  const {
    classes: t
  } = e;
  return lt({
    root: ["root"],
    paper: ["paper"]
  }, Qg, t);
}, om = ke(Wg, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ra = ke(Zg, {
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
}), Ta = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    container: h,
    elevation: m = 8,
    marginThreshold: v = 16,
    open: w,
    PaperProps: k = {},
    slots: x,
    slotProps: S,
    transformOrigin: b = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = Qr,
    transitionDuration: O = "auto",
    TransitionProps: {
      onEntering: D
    } = {},
    disableScrollLock: V = !1
  } = s, L = fe(s.TransitionProps, em), P = fe(s, tm), $ = (r = S == null ? void 0 : S.paper) != null ? r : k, N = C.useRef(), B = Ge(N, $.ref), F = E({}, s, {
    anchorOrigin: c,
    anchorReference: g,
    elevation: m,
    marginThreshold: v,
    externalPaperSlotProps: $,
    transformOrigin: b,
    TransitionComponent: T,
    transitionDuration: O,
    TransitionProps: L
  }), M = rm(F), j = C.useCallback(() => {
    if (g === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const Q = qn(u), _ = Q && Q.nodeType === 1 ? Q : Pe(N.current).body, ae = _.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ce = _.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ce.top === 0 && Ce.left === 0 && Ce.right === 0 && Ce.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: ae.top + Yi(ae, c.vertical),
      left: ae.left + Ji(ae, c.horizontal)
    };
  }, [u, c.horizontal, c.vertical, d, g]), ne = C.useCallback((Q) => ({
    vertical: Yi(Q, b.vertical),
    horizontal: Ji(Q, b.horizontal)
  }), [b.horizontal, b.vertical]), ee = C.useCallback((Q) => {
    const _ = {
      width: Q.offsetWidth,
      height: Q.offsetHeight
    }, ae = ne(_);
    if (g === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Zi(ae)
      };
    const Ce = j();
    let Oe = Ce.top - ae.vertical, be = Ce.left - ae.horizontal;
    const bt = Oe + _.height, _e = be + _.width, Qe = Ht(qn(u)), Ae = Qe.innerHeight - v, et = Qe.innerWidth - v;
    if (v !== null && Oe < v) {
      const Ee = Oe - v;
      Oe -= Ee, ae.vertical += Ee;
    } else if (v !== null && bt > Ae) {
      const Ee = bt - Ae;
      Oe -= Ee, ae.vertical += Ee;
    }
    if (process.env.NODE_ENV !== "production" && _.height > Ae && _.height && Ae && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${_.height - Ae}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && be < v) {
      const Ee = be - v;
      be -= Ee, ae.horizontal += Ee;
    } else if (_e > et) {
      const Ee = _e - et;
      be -= Ee, ae.horizontal += Ee;
    }
    return {
      top: `${Math.round(Oe)}px`,
      left: `${Math.round(be)}px`,
      transformOrigin: Zi(ae)
    };
  }, [u, g, j, ne, v]), [R, A] = C.useState(w), H = C.useCallback(() => {
    const Q = N.current;
    if (!Q)
      return;
    const _ = ee(Q);
    _.top !== null && (Q.style.top = _.top), _.left !== null && (Q.style.left = _.left), Q.style.transformOrigin = _.transformOrigin, A(!0);
  }, [ee]);
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
    const Q = ks(() => {
      H();
    }), _ = Ht(u);
    return _.addEventListener("resize", Q), () => {
      Q.clear(), _.removeEventListener("resize", Q);
    };
  }, [u, w, H]);
  let G = O;
  O === "auto" && !T.muiSupportAuto && (G = void 0);
  const q = h || (u ? Pe(qn(u)).body : void 0), W = (o = x == null ? void 0 : x.root) != null ? o : om, U = (i = x == null ? void 0 : x.paper) != null ? i : Ra, K = Pt({
    elementType: U,
    externalSlotProps: E({}, $, {
      style: R ? $.style : E({}, $.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: m,
      ref: B
    },
    ownerState: F,
    className: Te(M.paper, $ == null ? void 0 : $.className)
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
    className: Te(M.root, p)
  }), {
    slotProps: se
  } = Z, I = fe(Z, nm);
  return /* @__PURE__ */ y(W, E({}, I, !Ls(W) && {
    slotProps: se,
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
process.env.NODE_ENV !== "production" && (Ta.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: mo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Yt(l.oneOfType([it, l.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = qn(e.anchorEl);
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
  elevation: As,
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
    component: Mu
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
const im = Ta;
function sm(e) {
  return Ze("MuiMenu", e);
}
mt("MuiMenu", ["root", "paper", "list"]);
const am = ["onEntering"], lm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], um = {
  vertical: "top",
  horizontal: "right"
}, cm = {
  vertical: "top",
  horizontal: "left"
}, dm = (e) => {
  const {
    classes: t
  } = e;
  return lt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, sm, t);
}, pm = ke(im, {
  shouldForwardProp: (e) => ia(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), fm = ke(Ra, {
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
}), gm = ke(Mg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Pa = /* @__PURE__ */ C.forwardRef(function(t, n) {
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
    PopoverClasses: h,
    transitionDuration: m = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: w = "selectedMenu",
    slots: k = {},
    slotProps: x = {}
  } = i, S = fe(i.TransitionProps, am), b = fe(i, lm), T = _n(), O = T.direction === "rtl", D = E({}, i, {
    autoFocus: s,
    disableAutoFocusItem: c,
    MenuListProps: d,
    onEntering: v,
    PaperProps: p,
    transitionDuration: m,
    TransitionProps: S,
    variant: w
  }), V = dm(D), L = s && !c && f, P = C.useRef(null), $ = (ee, R) => {
    P.current && P.current.adjustStyleForScrollbar(ee, T), v && v(ee, R);
  }, N = (ee) => {
    ee.key === "Tab" && (ee.preventDefault(), g && g(ee, "tabKeyDown"));
  };
  let B = -1;
  C.Children.map(a, (ee, R) => {
    /* @__PURE__ */ C.isValidElement(ee) && (process.env.NODE_ENV !== "production" && Xn.isFragment(ee) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), ee.props.disabled || (w === "selectedMenu" && ee.props.selected || B === -1) && (B = R));
  });
  const F = (r = k.paper) != null ? r : fm, M = (o = x.paper) != null ? o : p, j = Pt({
    elementType: k.root,
    externalSlotProps: x.root,
    ownerState: D,
    className: [V.root, u]
  }), ne = Pt({
    elementType: F,
    externalSlotProps: M,
    ownerState: D,
    className: V.paper
  });
  return /* @__PURE__ */ y(pm, E({
    onClose: g,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: O ? "right" : "left"
    },
    transformOrigin: O ? um : cm,
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
    transitionDuration: m,
    TransitionProps: E({
      onEntering: $
    }, S),
    ownerState: D
  }, b, {
    classes: h,
    children: /* @__PURE__ */ y(gm, E({
      onKeyDown: N,
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
process.env.NODE_ENV !== "production" && (Pa.propTypes = {
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
const mm = Pa;
function Gh({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var c;
  const [o, i] = Bt.useState(void 0), s = Ne(
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
  ), a = Ne(() => {
    i(void 0);
  }, []), u = rr(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((c = n == null ? void 0 : n.items) == null ? void 0 : c.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ te(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: s,
      children: [
        r,
        /* @__PURE__ */ y(
          mm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: a,
            anchorReference: "anchorPosition",
            anchorPosition: u,
            children: /* @__PURE__ */ y(
              Io,
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
const hm = fa(/* @__PURE__ */ y("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function vm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const eo = (e, t, n = {}) => {
  const r = Ct(t);
  r.current = t;
  const o = Ct(n);
  o.current = vm(o.current);
  const [i, s] = Se(() => r.current), [a, u] = Se(!0);
  return Xt(() => {
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
function bm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: a
}) {
  const [u, c] = Se(!1), [d, g] = Se(!1), f = Ne(() => {
    u && c(!1), g(!1);
  }, [u]), p = Ne((S) => {
    S.stopPropagation(), c((b) => {
      const T = !b;
      return T && S.shiftKey ? g(!0) : T || g(!1), T;
    });
  }, []), h = Ne(
    (S) => (f(), r(S)),
    [r, f]
  ), [m, v] = Se({ top: 1, left: 1 });
  Xt(() => {
    if (u) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const b = S.getBoundingClientRect(), T = window.scrollY, O = window.scrollX, D = b.top + T + S.clientHeight, V = b.left + O;
        v({ top: D, left: V });
      }
    }
  }, [u, o]);
  const [w] = eo(
    Ne(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, u]),
    t
  ), [k] = eo(
    Ne(async () => (e == null ? void 0 : e(!0)) ?? n ?? w, [e, n, w, u]),
    n ?? w
  ), x = d && k ? k : w;
  return /* @__PURE__ */ te(nr, { children: [
    /* @__PURE__ */ y(
      us,
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
        children: a ?? /* @__PURE__ */ y(hm, {})
      }
    ),
    /* @__PURE__ */ y(
      Nl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: u,
        onClose: f,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: x ? /* @__PURE__ */ y(
          Rg,
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
function Uh({
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
    us,
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
const ym = ss(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), ka = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(cs.Root, { ref: n, className: ie(ym(), e), ...t }));
ka.displayName = cs.Root.displayName;
function Oa({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  helperText: r,
  label: o,
  placeholder: i,
  isRequired: s = !1,
  className: a,
  defaultValue: u,
  value: c,
  onChange: d,
  onFocus: g,
  onBlur: f
}) {
  return /* @__PURE__ */ te("div", { className: "pr-inline-grid pr-items-center pr-gap-1.5", children: [
    /* @__PURE__ */ y(
      ka,
      {
        htmlFor: e,
        className: ie({
          "pr-text-red-600": n,
          "pr-hidden": !o
        }),
        children: `${o}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ y(
      fo,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: s,
        className: ie(a, { "pr-border-red-600": n }),
        defaultValue: u,
        value: c,
        onChange: d,
        onFocus: g,
        onBlur: f
      }
    ),
    /* @__PURE__ */ y("p", { className: ie({ "pr-hidden": !r }), children: r })
  ] });
}
function qh({ onSearch: e, placeholder: t }) {
  const [n, r] = Se(""), o = (i) => {
    r(i), e(i);
  };
  return /* @__PURE__ */ y(Ml, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ y(
    Oa,
    {
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => o(i.target.value)
    }
  ) });
}
function Wh({
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
    Il,
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
function Xh({
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
    Al,
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
function Kh({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ y(
    Fl,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Qi({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return (
    // `as keyof R` reminds TypeScript of what it actually is
    // `as string` is just asserting that the input is a string because this is the default editor
    // used for all values. It will probably break on non-strings
    // eslint-disable-next-line no-type-assertion/no-type-assertion
    /* @__PURE__ */ y(Oa, { defaultValue: t[n.key], onChange: r })
  );
}
const wm = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ y(
  ws,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function Yh({
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
  headerRowHeight: h = 35,
  selectedRows: m,
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
  "data-testid": $
}) {
  const N = rr(() => {
    const B = e.map((F) => typeof F.editable == "function" ? {
      ...F,
      editable: (j) => !!F.editable(j),
      renderEditCell: F.renderEditCell || Qi
    } : F.editable && !F.renderEditCell ? { ...F, renderEditCell: Qi } : F.renderEditCell && !F.editable ? { ...F, editable: !1 } : F);
    return d ? [{ ...Gl, minWidth: g }, ...B] : B;
  }, [e, d, g]);
  return /* @__PURE__ */ y(
    Hl,
    {
      columns: N,
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
      headerRowHeight: h,
      selectedRows: m,
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
      renderers: { renderCheckbox: wm },
      className: `papi-table ${P ?? "rdg-light"}`,
      "data-testid": $
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
function vr(e) {
  return e instanceof Function;
}
function xm(e) {
  return Array.isArray(e) && e.every((t) => typeof t == "number");
}
function Sm(e, t) {
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
      const d = Math.round((Date.now() - s) * 100) / 100, g = Math.round((Date.now() - c) * 100) / 100, f = g / 16, p = (h, m) => {
        for (h = String(h); h.length < m; )
          h = " " + h;
        return h;
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
function Cm(e, t, n, r) {
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
function Em(e, t, n, r) {
  var o, i;
  const a = {
    ...e._getDefaultColumnDef(),
    ...t
  }, u = a.accessorKey;
  let c = (o = (i = a.id) != null ? i : u ? u.replace(".", "_") : void 0) != null ? o : typeof a.header == "string" ? a.header : void 0, d;
  if (a.accessorFn ? d = a.accessorFn : u && (u.includes(".") ? d = (f) => {
    let p = f;
    for (const m of u.split(".")) {
      var h;
      p = (h = p) == null ? void 0 : h[m], process.env.NODE_ENV !== "production" && p === void 0 && console.warn(`"${m}" in deeply nested key "${u}" returned undefined.`);
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
        let h = g.columns.flatMap((m) => m.getLeafColumns());
        return f(h);
      }
      return [g];
    }, J(e.options, "debugColumns", "column.getLeafColumns"))
  };
  for (const f of e._features)
    f.createColumn == null || f.createColumn(g, e);
  return g;
}
const Re = "debugHeaders";
function es(e, t, n) {
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
const Rm = {
  createTable: (e) => {
    e.getHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => {
      var i, s;
      const a = (i = r == null ? void 0 : r.map((g) => n.find((f) => f.id === g)).filter(Boolean)) != null ? i : [], u = (s = o == null ? void 0 : o.map((g) => n.find((f) => f.id === g)).filter(Boolean)) != null ? s : [], c = n.filter((g) => !(r != null && r.includes(g.id)) && !(o != null && o.includes(g.id)));
      return Bn(t, [...a, ...c, ...u], e);
    }, J(e.options, Re, "getHeaderGroups")), e.getCenterHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left, e.getState().columnPinning.right], (t, n, r, o) => (n = n.filter((i) => !(r != null && r.includes(i.id)) && !(o != null && o.includes(i.id))), Bn(t, n, e, "center")), J(e.options, Re, "getCenterHeaderGroups")), e.getLeftHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.left], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Bn(t, i, e, "left");
    }, J(e.options, Re, "getLeftHeaderGroups")), e.getRightHeaderGroups = Y(() => [e.getAllColumns(), e.getVisibleLeafColumns(), e.getState().columnPinning.right], (t, n, r) => {
      var o;
      const i = (o = r == null ? void 0 : r.map((s) => n.find((a) => a.id === s)).filter(Boolean)) != null ? o : [];
      return Bn(t, i, e, "right");
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
function Bn(e, t, n, r) {
  var o, i;
  let s = 0;
  const a = function(f, p) {
    p === void 0 && (p = 1), s = Math.max(s, p), f.filter((h) => h.getIsVisible()).forEach((h) => {
      var m;
      (m = h.columns) != null && m.length && a(h.columns, p + 1);
    }, 0);
  };
  a(e);
  let u = [];
  const c = (f, p) => {
    const h = {
      depth: p,
      id: [r, `${p}`].filter(Boolean).join("_"),
      headers: []
    }, m = [];
    f.forEach((v) => {
      const w = [...m].reverse()[0], k = v.column.depth === h.depth;
      let x, S = !1;
      if (k && v.column.parent ? x = v.column.parent : (x = v.column, S = !0), w && (w == null ? void 0 : w.column) === x)
        w.subHeaders.push(v);
      else {
        const b = es(n, x, {
          id: [r, p, x.id, v == null ? void 0 : v.id].filter(Boolean).join("_"),
          isPlaceholder: S,
          placeholderId: S ? `${m.filter((T) => T.column === x).length}` : void 0,
          depth: p,
          index: m.length
        });
        b.subHeaders.push(v), m.push(b);
      }
      h.headers.push(v), v.headerGroup = h;
    }), u.push(h), p > 0 && c(m, p - 1);
  }, d = t.map((f, p) => es(n, f, {
    depth: s,
    index: p
  }));
  c(d, s - 1), u.reverse();
  const g = (f) => f.filter((h) => h.column.getIsVisible()).map((h) => {
    let m = 0, v = 0, w = [0];
    h.subHeaders && h.subHeaders.length ? (w = [], g(h.subHeaders).forEach((x) => {
      let {
        colSpan: S,
        rowSpan: b
      } = x;
      m += S, w.push(b);
    })) : m = 1;
    const k = Math.min(...w);
    return v = v + k, h.colSpan = m, h.rowSpan = v, {
      colSpan: m,
      rowSpan: v
    };
  });
  return g((o = (i = u[0]) == null ? void 0 : i.headers) != null ? o : []), u;
}
const Ao = (e, t, n, r, o, i, s) => {
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
    getLeafRows: () => Sm(a.subRows, (u) => u.subRows),
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
    getAllCells: Y(() => [e.getAllLeafColumns()], (u) => u.map((c) => Cm(e, a, c, c.id)), J(e.options, "debugRows", "getAllCells")),
    _getAllCellsByColumnId: Y(() => [a.getAllCells()], (u) => u.reduce((c, d) => (c[d.column.id] = d, c), {}), J(e.options, "debugRows", "getAllCellsByColumnId"))
  };
  for (let u = 0; u < e._features.length; u++) {
    const c = e._features[u];
    c == null || c.createRow == null || c.createRow(a, e);
  }
  return a;
}, Tm = {
  createColumn: (e, t) => {
    e._getFacetedRowModel = t.options.getFacetedRowModel && t.options.getFacetedRowModel(t, e.id), e.getFacetedRowModel = () => e._getFacetedRowModel ? e._getFacetedRowModel() : t.getPreFilteredRowModel(), e._getFacetedUniqueValues = t.options.getFacetedUniqueValues && t.options.getFacetedUniqueValues(t, e.id), e.getFacetedUniqueValues = () => e._getFacetedUniqueValues ? e._getFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getFacetedMinMaxValues = t.options.getFacetedMinMaxValues && t.options.getFacetedMinMaxValues(t, e.id), e.getFacetedMinMaxValues = () => {
      if (e._getFacetedMinMaxValues)
        return e._getFacetedMinMaxValues();
    };
  }
}, _a = (e, t, n) => {
  var r;
  const o = n.toLowerCase();
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null || (r = r.toLowerCase()) == null) && r.includes(o));
};
_a.autoRemove = (e) => Xe(e);
const $a = (e, t, n) => {
  var r;
  return !!(!((r = e.getValue(t)) == null || (r = r.toString()) == null) && r.includes(n));
};
$a.autoRemove = (e) => Xe(e);
const Na = (e, t, n) => {
  var r;
  return ((r = e.getValue(t)) == null || (r = r.toString()) == null ? void 0 : r.toLowerCase()) === (n == null ? void 0 : n.toLowerCase());
};
Na.autoRemove = (e) => Xe(e);
const Ma = (e, t, n) => {
  var r;
  return (r = e.getValue(t)) == null ? void 0 : r.includes(n);
};
Ma.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Ia = (e, t, n) => !n.some((r) => {
  var o;
  return !((o = e.getValue(t)) != null && o.includes(r));
});
Ia.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Aa = (e, t, n) => n.some((r) => {
  var o;
  return (o = e.getValue(t)) == null ? void 0 : o.includes(r);
});
Aa.autoRemove = (e) => Xe(e) || !(e != null && e.length);
const Fa = (e, t, n) => e.getValue(t) === n;
Fa.autoRemove = (e) => Xe(e);
const Da = (e, t, n) => e.getValue(t) == n;
Da.autoRemove = (e) => Xe(e);
const Fo = (e, t, n) => {
  let [r, o] = n;
  const i = e.getValue(t);
  return i >= r && i <= o;
};
Fo.resolveFilterValue = (e) => {
  let [t, n] = e, r = typeof t != "number" ? parseFloat(t) : t, o = typeof n != "number" ? parseFloat(n) : n, i = t === null || Number.isNaN(r) ? -1 / 0 : r, s = n === null || Number.isNaN(o) ? 1 / 0 : o;
  if (i > s) {
    const a = i;
    i = s, s = a;
  }
  return [i, s];
};
Fo.autoRemove = (e) => Xe(e) || Xe(e[0]) && Xe(e[1]);
const nt = {
  includesString: _a,
  includesStringSensitive: $a,
  equalsString: Na,
  arrIncludes: Ma,
  arrIncludesAll: Ia,
  arrIncludesSome: Aa,
  equals: Fa,
  weakEquals: Da,
  inNumberRange: Fo
};
function Xe(e) {
  return e == null || e === "";
}
const Pm = {
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
      return vr(e.columnDef.filterFn) ? e.columnDef.filterFn : e.columnDef.filterFn === "auto" ? e.getAutoFilterFn() : (
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
        if (ts(o, s, e)) {
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
            if (ts(u, s.value, a))
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
function ts(e, t, n) {
  return (e && e.autoRemove ? e.autoRemove(t, n) : !1) || typeof t > "u" || typeof t == "string" && !t;
}
const km = (e, t, n) => n.reduce((r, o) => {
  const i = o.getValue(e);
  return r + (typeof i == "number" ? i : 0);
}, 0), Om = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r > i || r === void 0 && i >= i) && (r = i);
  }), r;
}, _m = (e, t, n) => {
  let r;
  return n.forEach((o) => {
    const i = o.getValue(e);
    i != null && (r < i || r === void 0 && i >= i) && (r = i);
  }), r;
}, $m = (e, t, n) => {
  let r, o;
  return n.forEach((i) => {
    const s = i.getValue(e);
    s != null && (r === void 0 ? s >= s && (r = o = s) : (r > s && (r = s), o < s && (o = s)));
  }), [r, o];
}, Nm = (e, t) => {
  let n = 0, r = 0;
  if (t.forEach((o) => {
    let i = o.getValue(e);
    i != null && (i = +i) >= i && (++n, r += i);
  }), n)
    return r / n;
}, Mm = (e, t) => {
  if (!t.length)
    return;
  const n = t.map((i) => i.getValue(e));
  if (!xm(n))
    return;
  if (n.length === 1)
    return n[0];
  const r = Math.floor(n.length / 2), o = n.sort((i, s) => i - s);
  return n.length % 2 !== 0 ? o[r] : (o[r - 1] + o[r]) / 2;
}, Im = (e, t) => Array.from(new Set(t.map((n) => n.getValue(e))).values()), Am = (e, t) => new Set(t.map((n) => n.getValue(e))).size, Fm = (e, t) => t.length, Ar = {
  sum: km,
  min: Om,
  max: _m,
  extent: $m,
  mean: Nm,
  median: Mm,
  unique: Im,
  uniqueCount: Am,
  count: Fm
}, Dm = {
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
        return Ar.sum;
      if (Object.prototype.toString.call(r) === "[object Date]")
        return Ar.extent;
    }, e.getAggregationFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return vr(e.columnDef.aggregationFn) ? e.columnDef.aggregationFn : e.columnDef.aggregationFn === "auto" ? e.getAutoAggregationFn() : (n = (r = t.options.aggregationFns) == null ? void 0 : r[e.columnDef.aggregationFn]) != null ? n : Ar[e.columnDef.aggregationFn];
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
function Vm(e, t, n) {
  if (!(t != null && t.length) || !n)
    return e;
  const r = e.filter((i) => !t.includes(i.id));
  return n === "remove" ? r : [...t.map((i) => e.find((s) => s.id === i)).filter(Boolean), ...r];
}
const Lm = {
  getInitialState: (e) => ({
    columnOrder: [],
    ...e
  }),
  getDefaultOptions: (e) => ({
    onColumnOrderChange: Be("columnOrder", e)
  }),
  createColumn: (e, t) => {
    e.getIndex = Y((n) => [bn(t, n)], (n) => n.findIndex((r) => r.id === e.id), J(t.options, "debugColumns", "getIndex")), e.getIsFirstColumn = (n) => {
      var r;
      return ((r = bn(t, n)[0]) == null ? void 0 : r.id) === e.id;
    }, e.getIsLastColumn = (n) => {
      var r;
      const o = bn(t, n);
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
      return Vm(i, n, r);
    }, J(e.options, "debugTable", "_getOrderColumnsFn"));
  }
}, Fr = () => ({
  left: [],
  right: []
}), Bm = {
  getInitialState: (e) => ({
    columnPinning: Fr(),
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
      return e.setColumnPinning(t ? Fr() : (n = (r = e.initialState) == null ? void 0 : r.columnPinning) != null ? n : Fr());
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
}, jn = {
  size: 150,
  minSize: 20,
  maxSize: Number.MAX_SAFE_INTEGER
}, Dr = () => ({
  startOffset: null,
  startSize: null,
  deltaOffset: null,
  deltaPercentage: null,
  isResizingColumn: !1,
  columnSizingStart: []
}), jm = {
  getDefaultColumnDef: () => jn,
  getInitialState: (e) => ({
    columnSizing: {},
    columnSizingInfo: Dr(),
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
      return Math.min(Math.max((n = e.columnDef.minSize) != null ? n : jn.minSize, (r = i ?? e.columnDef.size) != null ? r : jn.size), (o = e.columnDef.maxSize) != null ? o : jn.maxSize);
    }, e.getStart = Y((n) => [n, bn(t, n), t.getState().columnSizing], (n, r) => r.slice(0, e.getIndex(n)).reduce((o, i) => o + i.getSize(), 0), J(t.options, "debugColumns", "getStart")), e.getAfter = Y((n) => [n, bn(t, n), t.getState().columnSizing], (n, r) => r.slice(e.getIndex(n) + 1).reduce((o, i) => o + i.getSize(), 0), J(t.options, "debugColumns", "getAfter")), e.resetSize = () => {
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
        if (!r || !o || (i.persist == null || i.persist(), Vr(i) && i.touches && i.touches.length > 1))
          return;
        const s = e.getSize(), a = e ? e.getLeafHeaders().map((w) => [w.column.id, w.column.getSize()]) : [[r.id, r.getSize()]], u = Vr(i) ? Math.round(i.touches[0].clientX) : i.clientX, c = {}, d = (w, k) => {
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
        }, p = n || typeof document < "u" ? document : null, h = {
          moveHandler: (w) => g(w.clientX),
          upHandler: (w) => {
            p == null || p.removeEventListener("mousemove", h.moveHandler), p == null || p.removeEventListener("mouseup", h.upHandler), f(w.clientX);
          }
        }, m = {
          moveHandler: (w) => (w.cancelable && (w.preventDefault(), w.stopPropagation()), g(w.touches[0].clientX), !1),
          upHandler: (w) => {
            var k;
            p == null || p.removeEventListener("touchmove", m.moveHandler), p == null || p.removeEventListener("touchend", m.upHandler), w.cancelable && (w.preventDefault(), w.stopPropagation()), f((k = w.touches[0]) == null ? void 0 : k.clientX);
          }
        }, v = zm() ? {
          passive: !1
        } : !1;
        Vr(i) ? (p == null || p.addEventListener("touchmove", m.moveHandler, v), p == null || p.addEventListener("touchend", m.upHandler, v)) : (p == null || p.addEventListener("mousemove", h.moveHandler, v), p == null || p.addEventListener("mouseup", h.upHandler, v)), t.setColumnSizingInfo((w) => ({
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
      e.setColumnSizingInfo(t ? Dr() : (n = e.initialState.columnSizingInfo) != null ? n : Dr());
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
let zn = null;
function zm() {
  if (typeof zn == "boolean")
    return zn;
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
  return zn = e, zn;
}
function Vr(e) {
  return e.type === "touchstart";
}
const Hm = {
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
function bn(e, t) {
  return t ? t === "center" ? e.getCenterVisibleLeafColumns() : t === "left" ? e.getLeftVisibleLeafColumns() : e.getRightVisibleLeafColumns() : e.getVisibleLeafColumns();
}
const Gm = {
  createTable: (e) => {
    e._getGlobalFacetedRowModel = e.options.getFacetedRowModel && e.options.getFacetedRowModel(e, "__global__"), e.getGlobalFacetedRowModel = () => e.options.manualFiltering || !e._getGlobalFacetedRowModel ? e.getPreFilteredRowModel() : e._getGlobalFacetedRowModel(), e._getGlobalFacetedUniqueValues = e.options.getFacetedUniqueValues && e.options.getFacetedUniqueValues(e, "__global__"), e.getGlobalFacetedUniqueValues = () => e._getGlobalFacetedUniqueValues ? e._getGlobalFacetedUniqueValues() : /* @__PURE__ */ new Map(), e._getGlobalFacetedMinMaxValues = e.options.getFacetedMinMaxValues && e.options.getFacetedMinMaxValues(e, "__global__"), e.getGlobalFacetedMinMaxValues = () => {
      if (e._getGlobalFacetedMinMaxValues)
        return e._getGlobalFacetedMinMaxValues();
    };
  }
}, Um = {
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
      return vr(r) ? r : r === "auto" ? e.getGlobalAutoFilterFn() : (t = (n = e.options.filterFns) == null ? void 0 : n[r]) != null ? t : nt[r];
    }, e.setGlobalFilter = (t) => {
      e.options.onGlobalFilterChange == null || e.options.onGlobalFilterChange(t);
    }, e.resetGlobalFilter = (t) => {
      e.setGlobalFilter(t ? void 0 : e.initialState.globalFilter);
    };
  }
}, qm = {
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
}, to = 0, no = 10, Lr = () => ({
  pageIndex: to,
  pageSize: no
}), Wm = {
  getInitialState: (e) => ({
    ...e,
    pagination: {
      ...Lr(),
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
      e.setPagination(r ? Lr() : (o = e.initialState.pagination) != null ? o : Lr());
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
      e.setPageIndex(r ? to : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageIndex) != null ? o : to);
    }, e.resetPageSize = (r) => {
      var o, i;
      e.setPageSize(r ? no : (o = (i = e.initialState) == null || (i = i.pagination) == null ? void 0 : i.pageSize) != null ? o : no);
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
}, Br = () => ({
  top: [],
  bottom: []
}), Xm = {
  getInitialState: (e) => ({
    rowPinning: Br(),
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
            top: ((g = u == null ? void 0 : u.top) != null ? g : []).filter((m) => !(a != null && a.has(m))),
            bottom: [...((f = u == null ? void 0 : u.bottom) != null ? f : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)]
          };
        }
        if (n === "top") {
          var p, h;
          return {
            top: [...((p = u == null ? void 0 : u.top) != null ? p : []).filter((m) => !(a != null && a.has(m))), ...Array.from(a)],
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
      return e.setRowPinning(t ? Br() : (n = (r = e.initialState) == null ? void 0 : r.rowPinning) != null ? n : Br());
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
}, Km = {
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
        ro(o, i.id, r, !0, e);
      }), o;
    }), e.getPreSelectedRowModel = () => e.getCoreRowModel(), e.getSelectedRowModel = Y(() => [e.getState().rowSelection, e.getCoreRowModel()], (t, n) => Object.keys(t).length ? jr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getSelectedRowModel")), e.getFilteredSelectedRowModel = Y(() => [e.getState().rowSelection, e.getFilteredRowModel()], (t, n) => Object.keys(t).length ? jr(e, n) : {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, J(e.options, "debugTable", "getFilteredSelectedRowModel")), e.getGroupedSelectedRowModel = Y(() => [e.getState().rowSelection, e.getSortedRowModel()], (t, n) => Object.keys(t).length ? jr(e, n) : {
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
        return ro(a, e.id, n, (s = r == null ? void 0 : r.selectChildren) != null ? s : !0, t), a;
      });
    }, e.getIsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return Do(e, n);
    }, e.getIsSomeSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return oo(e, n) === "some";
    }, e.getIsAllSubRowsSelected = () => {
      const {
        rowSelection: n
      } = t.getState();
      return oo(e, n) === "all";
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
}, ro = (e, t, n, r, o) => {
  var i;
  const s = o.getRow(t, !0);
  n ? (s.getCanMultiSelect() || Object.keys(e).forEach((a) => delete e[a]), s.getCanSelect() && (e[t] = !0)) : delete e[t], r && (i = s.subRows) != null && i.length && s.getCanSelectSubRows() && s.subRows.forEach((a) => ro(e, a.id, n, r, o));
};
function jr(e, t) {
  const n = e.getState().rowSelection, r = [], o = {}, i = function(s, a) {
    return s.map((u) => {
      var c;
      const d = Do(u, n);
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
function Do(e, t) {
  var n;
  return (n = t[e.id]) != null ? n : !1;
}
function oo(e, t, n) {
  var r;
  if (!((r = e.subRows) != null && r.length))
    return !1;
  let o = !0, i = !1;
  return e.subRows.forEach((s) => {
    if (!(i && !o) && (s.getCanSelect() && (Do(s, t) ? i = !0 : o = !1), s.subRows && s.subRows.length)) {
      const a = oo(s, t);
      a === "all" ? i = !0 : (a === "some" && (i = !0), o = !1);
    }
  }), o ? "all" : i ? "some" : !1;
}
const io = /([0-9]+)/gm, Ym = (e, t, n) => Va(gt(e.getValue(n)).toLowerCase(), gt(t.getValue(n)).toLowerCase()), Jm = (e, t, n) => Va(gt(e.getValue(n)), gt(t.getValue(n))), Zm = (e, t, n) => Vo(gt(e.getValue(n)).toLowerCase(), gt(t.getValue(n)).toLowerCase()), Qm = (e, t, n) => Vo(gt(e.getValue(n)), gt(t.getValue(n))), eh = (e, t, n) => {
  const r = e.getValue(n), o = t.getValue(n);
  return r > o ? 1 : r < o ? -1 : 0;
}, th = (e, t, n) => Vo(e.getValue(n), t.getValue(n));
function Vo(e, t) {
  return e === t ? 0 : e > t ? 1 : -1;
}
function gt(e) {
  return typeof e == "number" ? isNaN(e) || e === 1 / 0 || e === -1 / 0 ? "" : String(e) : typeof e == "string" ? e : "";
}
function Va(e, t) {
  const n = e.split(io).filter(Boolean), r = t.split(io).filter(Boolean);
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
const un = {
  alphanumeric: Ym,
  alphanumericCaseSensitive: Jm,
  text: Zm,
  textCaseSensitive: Qm,
  datetime: eh,
  basic: th
}, nh = {
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
          return un.datetime;
        if (typeof i == "string" && (r = !0, i.split(io).length > 1))
          return un.alphanumeric;
      }
      return r ? un.text : un.basic;
    }, e.getAutoSortDir = () => {
      const n = t.getFilteredRowModel().flatRows[0];
      return typeof (n == null ? void 0 : n.getValue(e.id)) == "string" ? "asc" : "desc";
    }, e.getSortingFn = () => {
      var n, r;
      if (!e)
        throw new Error();
      return vr(e.columnDef.sortingFn) ? e.columnDef.sortingFn : e.columnDef.sortingFn === "auto" ? e.getAutoSortingFn() : (n = (r = t.options.sortingFns) == null ? void 0 : r[e.columnDef.sortingFn]) != null ? n : un[e.columnDef.sortingFn];
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
}, rh = [
  Rm,
  Hm,
  Lm,
  Bm,
  Tm,
  Pm,
  Gm,
  //depends on ColumnFaceting
  Um,
  //depends on ColumnFiltering
  nh,
  Dm,
  //depends on RowSorting
  qm,
  Wm,
  Xm,
  Km,
  jm
];
function oh(e) {
  var t, n;
  process.env.NODE_ENV !== "production" && (e.debugAll || e.debugTable) && console.info("Creating Table Instance...");
  const r = [...rh, ...(t = e._features) != null ? t : []];
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
    _getRowId: (f, p, h) => {
      var m;
      return (m = o.options.getRowId == null ? void 0 : o.options.getRowId(f, p, h)) != null ? m : `${h ? [h.id, p].join(".") : p}`;
    },
    getCoreRowModel: () => (o._getCoreRowModel || (o._getCoreRowModel = o.options.getCoreRowModel(o)), o._getCoreRowModel()),
    // The final calls start at the bottom of the model,
    // expanded rows, which then work their way up
    getRowModel: () => o.getPaginationRowModel(),
    //in next version, we should just pass in the row model as the optional 2nd arg
    getRow: (f, p) => {
      let h = (p ? o.getPrePaginationRowModel() : o.getRowModel()).rowsById[f];
      if (!h && (h = o.getCoreRowModel().rowsById[f], !h))
        throw process.env.NODE_ENV !== "production" ? new Error(`getRow could not find row with ID: ${f}`) : new Error();
      return h;
    },
    _getDefaultColumnDef: Y(() => [o.options.defaultColumn], (f) => {
      var p;
      return f = (p = f) != null ? p : {}, {
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
        ...f
      };
    }, J(e, "debugColumns", "_getDefaultColumnDef")),
    _getColumnDefs: () => o.options.columns,
    getAllColumns: Y(() => [o._getColumnDefs()], (f) => {
      const p = function(h, m, v) {
        return v === void 0 && (v = 0), h.map((w) => {
          const k = Em(o, w, v, m), x = w;
          return k.columns = x.columns ? p(x.columns, k, v + 1) : [], k;
        });
      };
      return p(f);
    }, J(e, "debugColumns", "getAllColumns")),
    getAllFlatColumns: Y(() => [o.getAllColumns()], (f) => f.flatMap((p) => p.getFlatColumns()), J(e, "debugColumns", "getAllFlatColumns")),
    _getAllFlatColumnsById: Y(() => [o.getAllFlatColumns()], (f) => f.reduce((p, h) => (p[h.id] = h, p), {}), J(e, "debugColumns", "getAllFlatColumnsById")),
    getAllLeafColumns: Y(() => [o.getAllColumns(), o._getOrderColumnsFn()], (f, p) => {
      let h = f.flatMap((m) => m.getLeafColumns());
      return p(h);
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
function ih() {
  return (e) => Y(() => [e.options.data], (t) => {
    const n = {
      rows: [],
      flatRows: [],
      rowsById: {}
    }, r = function(o, i, s) {
      i === void 0 && (i = 0);
      const a = [];
      for (let c = 0; c < o.length; c++) {
        const d = Ao(e, e._getRowId(o[c], c, s), o[c], c, i, void 0, s == null ? void 0 : s.id);
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
function sh(e) {
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
function ah(e, t, n) {
  return n.options.filterFromLeafRows ? lh(e, t, n) : uh(e, t, n);
}
function lh(e, t, n) {
  var r;
  const o = [], i = {}, s = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, a = function(u, c) {
    c === void 0 && (c = 0);
    const d = [];
    for (let f = 0; f < u.length; f++) {
      var g;
      let p = u[f];
      const h = Ao(n, p.id, p.original, p.index, p.depth, void 0, p.parentId);
      if (h.columnFilters = p.columnFilters, (g = p.subRows) != null && g.length && c < s) {
        if (h.subRows = a(p.subRows, c + 1), p = h, t(p) && !h.subRows.length) {
          d.push(p), i[p.id] = p, o.push(p);
          continue;
        }
        if (t(p) || h.subRows.length) {
          d.push(p), i[p.id] = p, o.push(p);
          continue;
        }
      } else
        p = h, t(p) && (d.push(p), i[p.id] = p, o.push(p));
    }
    return d;
  };
  return {
    rows: a(e),
    flatRows: o,
    rowsById: i
  };
}
function uh(e, t, n) {
  var r;
  const o = [], i = {}, s = (r = n.options.maxLeafRowFilterDepth) != null ? r : 100, a = function(u, c) {
    c === void 0 && (c = 0);
    const d = [];
    for (let f = 0; f < u.length; f++) {
      let p = u[f];
      if (t(p)) {
        var g;
        if ((g = p.subRows) != null && g.length && c < s) {
          const m = Ao(n, p.id, p.original, p.index, p.depth, void 0, p.parentId);
          m.subRows = a(p.subRows, c + 1), p = m;
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
function ch() {
  return (e) => Y(() => [e.getPreFilteredRowModel(), e.getState().columnFilters, e.getState().globalFilter], (t, n, r) => {
    if (!t.rows.length || !(n != null && n.length) && !r) {
      for (let f = 0; f < t.flatRows.length; f++)
        t.flatRows[f].columnFilters = {}, t.flatRows[f].columnFiltersMeta = {};
      return t;
    }
    const o = [], i = [];
    (n ?? []).forEach((f) => {
      var p;
      const h = e.getColumn(f.id);
      if (!h)
        return;
      const m = h.getFilterFn();
      if (!m) {
        process.env.NODE_ENV !== "production" && console.warn(`Could not find a valid 'column.filterFn' for column with the ID: ${h.id}.`);
        return;
      }
      o.push({
        id: f.id,
        filterFn: m,
        resolvedValue: (p = m.resolveFilterValue == null ? void 0 : m.resolveFilterValue(f.value)) != null ? p : f.value
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
        for (let h = 0; h < o.length; h++) {
          c = o[h];
          const m = c.id;
          p.columnFilters[m] = c.filterFn(p, m, c.resolvedValue, (v) => {
            p.columnFiltersMeta[m] = v;
          });
        }
      if (i.length) {
        for (let h = 0; h < i.length; h++) {
          d = i[h];
          const m = d.id;
          if (d.filterFn(p, m, d.resolvedValue, (v) => {
            p.columnFiltersMeta[m] = v;
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
    return ah(t.rows, g, e);
  }, J(e.options, "debugTable", "getFilteredRowModel", () => e._autoResetPageIndex()));
}
function dh(e) {
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
    } : g = sh({
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
function ph() {
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
          const h = i[p], m = s[h.id], v = m.sortUndefined, w = (f = h == null ? void 0 : h.desc) != null ? f : !1;
          let k = 0;
          if (v) {
            const x = d.getValue(h.id), S = g.getValue(h.id), b = x === void 0, T = S === void 0;
            if (b || T) {
              if (v === "first")
                return b ? -1 : 1;
              if (v === "last")
                return b ? 1 : -1;
              k = b && T ? 0 : b ? v : -v;
            }
          }
          if (k === 0 && (k = m.sortingFn(d, g, h.id)), k !== 0)
            return w && (k *= -1), m.invertSorting && (k *= -1), k;
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
function ns(e, t) {
  return e ? fh(e) ? /* @__PURE__ */ C.createElement(e, t) : e : null;
}
function fh(e) {
  return gh(e) || typeof e == "function" || mh(e);
}
function gh(e) {
  return typeof e == "function" && (() => {
    const t = Object.getPrototypeOf(e);
    return t.prototype && t.prototype.isReactComponent;
  })();
}
function mh(e) {
  return typeof e == "object" && typeof e.$$typeof == "symbol" && ["react.memo", "react.forward_ref"].includes(e.$$typeof.description);
}
function hh(e) {
  const t = {
    state: {},
    // Dummy state
    onStateChange: () => {
    },
    // noop
    renderFallbackValue: null,
    ...e
  }, [n] = C.useState(() => ({
    current: oh(t)
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
const La = C.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ y(
    "table",
    {
      ref: n,
      className: ie("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
La.displayName = "Table";
const Ba = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y("thead", { ref: n, className: ie("[&_tr]:pr-border-b", e), ...t }));
Ba.displayName = "TableHeader";
const ja = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y("tbody", { ref: n, className: ie("[&_tr:last-child]:pr-border-0", e), ...t }));
ja.displayName = "TableBody";
const vh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "tfoot",
  {
    ref: n,
    className: ie("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
vh.displayName = "TableFooter";
const Wn = C.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ y(
    "tr",
    {
      ref: n,
      className: ie(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Wn.displayName = "TableRow";
const za = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "th",
  {
    ref: n,
    className: ie(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
za.displayName = "TableHead";
const so = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "td",
  {
    ref: n,
    className: ie("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
so.displayName = "TableCell";
const bh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  "caption",
  {
    ref: n,
    className: ie("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
bh.displayName = "TableCaption";
const yh = ye.Root, wh = ye.Value, Ha = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ te(
  ye.Trigger,
  {
    ref: r,
    className: ie(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ y(ye.Icon, { asChild: !0, children: /* @__PURE__ */ y(is, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Ha.displayName = ye.Trigger.displayName;
const Ga = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.ScrollUpButton,
  {
    ref: n,
    className: ie("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ y(ml, { className: "pr-h-4 pr-w-4" })
  }
));
Ga.displayName = ye.ScrollUpButton.displayName;
const Ua = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.ScrollDownButton,
  {
    ref: n,
    className: ie("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ y(is, { className: "pr-h-4 pr-w-4" })
  }
));
Ua.displayName = ye.ScrollDownButton.displayName;
const qa = C.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ y(ye.Portal, { children: /* @__PURE__ */ te(
  ye.Content,
  {
    ref: o,
    className: ie(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ y(Ga, {}),
      /* @__PURE__ */ y(
        ye.Viewport,
        {
          className: ie(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ y(Ua, {})
    ]
  }
) }));
qa.displayName = ye.Content.displayName;
const xh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.Label,
  {
    ref: n,
    className: ie("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
xh.displayName = ye.Label.displayName;
const Wa = C.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ te(
  ye.Item,
  {
    ref: r,
    className: ie(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ y("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ y(ye.ItemIndicator, { children: /* @__PURE__ */ y(os, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ y(ye.ItemText, { children: t })
    ]
  }
));
Wa.displayName = ye.Item.displayName;
const Sh = C.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ y(
  ye.Separator,
  {
    ref: n,
    className: ie("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Sh.displayName = ye.Separator.displayName;
function Ch({ table: e }) {
  return /* @__PURE__ */ y("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ te("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ y("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ te(
        yh,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ y(Ha, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ y(wh, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ y(qa, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ y(Wa, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ te(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ y(hl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ te(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ y(vl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ te(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ y(bl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ te(
        rt,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ y("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ y(yl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Eh({ table: e }) {
  return /* @__PURE__ */ te(vs, { children: [
    /* @__PURE__ */ y(ll, { asChild: !0, children: /* @__PURE__ */ te(rt, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ y(wl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ te(co, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ y(or, { children: "Toggle columns" }),
      /* @__PURE__ */ y(po, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ y(
        ys,
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
function Jh({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  onRowClickHandler: i = (s, a) => {
  }
}) {
  var m;
  const [s, a] = Se([]), [u, c] = Se([]), [d, g] = Se({}), [f, p] = Se({}), h = hh({
    data: t,
    columns: e,
    getCoreRowModel: ih(),
    ...n && { getPaginationRowModel: dh() },
    onSortingChange: a,
    getSortedRowModel: ph(),
    onColumnFiltersChange: c,
    getFilteredRowModel: ch(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: p,
    state: {
      sorting: s,
      columnFilters: u,
      columnVisibility: d,
      rowSelection: f
    }
  });
  return /* @__PURE__ */ te("div", { children: [
    o && /* @__PURE__ */ y(Eh, { table: h }),
    /* @__PURE__ */ y("div", { className: "pr-rounded-md pr-border", children: /* @__PURE__ */ te(La, { children: [
      /* @__PURE__ */ y(Ba, { children: h.getHeaderGroups().map((v) => /* @__PURE__ */ y(Wn, { children: v.headers.map((w) => /* @__PURE__ */ y(za, { children: w.isPlaceholder ? void 0 : ns(w.column.columnDef.header, w.getContext()) }, w.id)) }, v.id)) }),
      /* @__PURE__ */ y(ja, { children: (m = h.getRowModel().rows) != null && m.length ? h.getRowModel().rows.map((v) => /* @__PURE__ */ y(
        Wn,
        {
          onClick: () => i(h, v),
          "data-state": v.getIsSelected() && "selected",
          children: v.getVisibleCells().map((w) => /* @__PURE__ */ y(so, { children: ns(w.column.columnDef.cell, w.getContext()) }, w.id))
        },
        v.id
      )) : /* @__PURE__ */ y(Wn, { children: /* @__PURE__ */ y(so, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ te("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ y(
        rt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ y(
        rt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ y(Ch, { table: h })
  ] });
}
function Zh({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = Ct(void 0);
  return /* @__PURE__ */ y("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ y(Dl, { position: "static", id: r, children: /* @__PURE__ */ te(Vl, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ y(
      bm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ y("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Qh = (e, t) => {
  Xt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, zr = () => !1, ev = (e, t) => {
  const [n] = eo(
    Ne(async () => {
      if (!e)
        return zr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    zr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Xt(() => () => {
    n !== zr && n();
  }, [n]);
};
function Rh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Rh(`.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
/*
! tailwindcss v3.4.3 | MIT License | https://tailwindcss.com
*//*
1. Prevent padding and border from affecting element width. (https://github.com/mozdevs/cssremedy/issues/4)
2. Allow adding a border to an element by just adding a border-width. (https://github.com/tailwindcss/tailwindcss/pull/116)
*/

*,
::before,
::after {
  box-sizing: border-box; /* 1 */
  border-width: 0; /* 2 */
  border-style: solid; /* 2 */
  border-color: #e5e7eb; /* 2 */
}

::before,
::after {
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

html,
:host {
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

body {
  margin: 0; /* 1 */
  line-height: inherit; /* 2 */
}

/*
1. Add the correct height in Firefox.
2. Correct the inheritance of border color in Firefox. (https://bugzilla.mozilla.org/show_bug.cgi?id=190655)
3. Ensure horizontal rules are visible by default.
*/

hr {
  height: 0; /* 1 */
  color: inherit; /* 2 */
  border-top-width: 1px; /* 3 */
}

/*
Add the correct text decoration in Chrome, Edge, and Safari.
*/

abbr:where([title]) {
  text-decoration: underline dotted;
}

/*
Remove the default font size and weight for headings.
*/

h1,
h2,
h3,
h4,
h5,
h6 {
  font-size: inherit;
  font-weight: inherit;
}

/*
Reset links to optimize for opt-in styling instead of opt-out.
*/

a {
  color: inherit;
  text-decoration: inherit;
}

/*
Add the correct font weight in Edge and Safari.
*/

b,
strong {
  font-weight: bolder;
}

/*
1. Use the user's configured \`mono\` font-family by default.
2. Use the user's configured \`mono\` font-feature-settings by default.
3. Use the user's configured \`mono\` font-variation-settings by default.
4. Correct the odd \`em\` font sizing in all browsers.
*/

code,
kbd,
samp,
pre {
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; /* 1 */
  font-feature-settings: normal; /* 2 */
  font-variation-settings: normal; /* 3 */
  font-size: 1em; /* 4 */
}

/*
Add the correct font size in all browsers.
*/

small {
  font-size: 80%;
}

/*
Prevent \`sub\` and \`sup\` elements from affecting the line height in all browsers.
*/

sub,
sup {
  font-size: 75%;
  line-height: 0;
  position: relative;
  vertical-align: baseline;
}

sub {
  bottom: -0.25em;
}

sup {
  top: -0.5em;
}

/*
1. Remove text indentation from table contents in Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=999088, https://bugs.webkit.org/show_bug.cgi?id=201297)
2. Correct table border color inheritance in all Chrome and Safari. (https://bugs.chromium.org/p/chromium/issues/detail?id=935729, https://bugs.webkit.org/show_bug.cgi?id=195016)
3. Remove gaps between table borders by default.
*/

table {
  text-indent: 0; /* 1 */
  border-color: inherit; /* 2 */
  border-collapse: collapse; /* 3 */
}

/*
1. Change the font styles in all browsers.
2. Remove the margin in Firefox and Safari.
3. Remove default padding in all browsers.
*/

button,
input,
optgroup,
select,
textarea {
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

button,
select {
  text-transform: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Remove default button styles.
*/

button,
input:where([type='button']),
input:where([type='reset']),
input:where([type='submit']) {
  -webkit-appearance: button; /* 1 */
  background-color: transparent; /* 2 */
  background-image: none; /* 2 */
}

/*
Use the modern Firefox focus style for all focusable elements.
*/

:-moz-focusring {
  outline: auto;
}

/*
Remove the additional \`:invalid\` styles in Firefox. (https://github.com/mozilla/gecko-dev/blob/2f9eacd9d3d995c937b4251a5557d95d494c9be1/layout/style/res/forms.css#L728-L737)
*/

:-moz-ui-invalid {
  box-shadow: none;
}

/*
Add the correct vertical alignment in Chrome and Firefox.
*/

progress {
  vertical-align: baseline;
}

/*
Correct the cursor style of increment and decrement buttons in Safari.
*/

::-webkit-inner-spin-button,
::-webkit-outer-spin-button {
  height: auto;
}

/*
1. Correct the odd appearance in Chrome and Safari.
2. Correct the outline style in Safari.
*/

[type='search'] {
  -webkit-appearance: textfield; /* 1 */
  outline-offset: -2px; /* 2 */
}

/*
Remove the inner padding in Chrome and Safari on macOS.
*/

::-webkit-search-decoration {
  -webkit-appearance: none;
}

/*
1. Correct the inability to style clickable types in iOS and Safari.
2. Change font properties to \`inherit\` in Safari.
*/

::-webkit-file-upload-button {
  -webkit-appearance: button; /* 1 */
  font: inherit; /* 2 */
}

/*
Add the correct display in Chrome and Safari.
*/

summary {
  display: list-item;
}

/*
Removes the default spacing and border for appropriate elements.
*/

blockquote,
dl,
dd,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
figure,
p,
pre {
  margin: 0;
}

fieldset {
  margin: 0;
  padding: 0;
}

legend {
  padding: 0;
}

ol,
ul,
menu {
  list-style: none;
  margin: 0;
  padding: 0;
}

/*
Reset default styling for dialogs.
*/
dialog {
  padding: 0;
}

/*
Prevent resizing textareas horizontally by default.
*/

textarea {
  resize: vertical;
}

/*
1. Reset the default placeholder opacity in Firefox. (https://github.com/tailwindlabs/tailwindcss/issues/3300)
2. Set the default placeholder color to the user's configured gray 400 color.
*/

input::placeholder,
textarea::placeholder {
  opacity: 1; /* 1 */
  color: #9ca3af; /* 2 */
}

/*
Set the default cursor for buttons.
*/

button,
[role="button"] {
  cursor: pointer;
}

/*
Make sure disabled buttons don't get the pointer cursor.
*/
:disabled {
  cursor: default;
}

/*
1. Make replaced elements \`display: block\` by default. (https://github.com/mozdevs/cssremedy/issues/14)
2. Add \`vertical-align: middle\` to align replaced elements more sensibly by default. (https://github.com/jensimmons/cssremedy/issues/14#issuecomment-634934210)
   This can trigger a poorly considered lint error in some tools but is included by design.
*/

img,
svg,
video,
canvas,
audio,
iframe,
embed,
object {
  display: block; /* 1 */
  vertical-align: middle; /* 2 */
}

/*
Constrain images and videos to the parent width and preserve their intrinsic aspect ratio. (https://github.com/mozdevs/cssremedy/issues/14)
*/

img,
video {
  max-width: 100%;
  height: auto;
}

/* Make elements with the HTML hidden attribute stay hidden by default */
[hidden] {
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
.pr-w-full {
  width: 100%;
}
.pr-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.pr-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
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
.pr-flex-col {
  flex-direction: column;
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
.pr-text-nowrap {
  text-wrap: nowrap;
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
.pr-pb-3 {
  padding-bottom: 0.75rem;
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
.pr-pt-3 {
  padding-top: 0.75rem;
}
.pr-text-left {
  text-align: left;
}
.pr-text-center {
  text-align: center;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
  Bh as BookChapterControl,
  jh as Button,
  zh as ChapterRangeSelector,
  ws as Checkbox,
  Hh as Checklist,
  oi as ComboBox,
  Gh as ContextMenu,
  Jh as DataTable,
  Rg as GridMenu,
  bm as HamburgerMenuButton,
  Uh as IconButton,
  Vt as LabelPosition,
  ma as MenuItem,
  qh as SearchBar,
  Wh as Slider,
  Xh as Snackbar,
  Kh as Switch,
  Yh as Table,
  Oa as TextField,
  Zh as Toolbar,
  Qh as useEvent,
  ev as useEventAsync,
  eo as usePromise
};
//# sourceMappingURL=index.js.map
