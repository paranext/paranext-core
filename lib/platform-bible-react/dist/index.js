var ps = Object.defineProperty;
var fs = (e, t, n) => t in e ? ps(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n;
var Et = (e, t, n) => (fs(e, typeof t != "symbol" ? t + "" : t, n), n);
import ms, { jsxs as ue, jsx as x, Fragment as qn } from "react/jsx-runtime";
import * as T from "react";
import It, { forwardRef as Ri, useCallback as Ce, useState as we, useRef as ft, useEffect as zt, useLayoutEffect as So, useMemo as wt } from "react";
import { getChaptersForBook as $i, offsetBook as Co, FIRST_SCR_BOOK_NUM as hs, offsetChapter as No, FIRST_SCR_CHAPTER_NUM as gs, offsetVerse as Po, FIRST_SCR_VERSE_NUM as bs, format as ur, compare as Ro } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { ChevronRight as vs, Check as ys, Circle as ws, History as xs, ArrowDownWideNarrow as Es, Clock as Ts, Bookmark as ks } from "lucide-react";
import xe, { clsx as Os } from "clsx";
import { twMerge as Ss } from "tailwind-merge";
import { Button as Cs, Autocomplete as Ns, TextField as Mi, FormControlLabel as $o, FormLabel as Ps, Checkbox as Rs, MenuItem as $s, ListItemText as Ms, ListItemIcon as Ii, Menu as Is, Grid as _i, List as _s, IconButton as Ai, Drawer as As, Paper as Ds, Slider as js, Snackbar as Bs, Switch as Ls, AppBar as Fs, Toolbar as Vs } from "@mui/material";
import zs, { ThemeContext as Us, internal_processStyles as Hs } from "@mui/styled-engine";
import * as Ws from "react-dom";
import Sn from "react-dom";
import { useReactTable as qs, getExpandedRowModel as Gs, getGroupedRowModel as Ks, getCoreRowModel as Xs, getSortedRowModel as Ys, flexRender as dr } from "@tanstack/react-table";
import Js, { SelectColumn as Zs } from "react-data-grid";
var Qs = Object.defineProperty, el = (e, t, n) => t in e ? Qs(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => (el(e, typeof t != "symbol" ? t + "" : t, n), n);
const ht = [
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
], Fr = [
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
], Di = [
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
], Mo = ul();
function Ut(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Mo ? Mo[e] : 0;
}
function Vr(e) {
  return Ut(e) > 0;
}
function tl(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return t >= 40 && t <= 66;
}
function nl(e) {
  return (typeof e == "string" ? Ut(e) : e) <= 39;
}
function ji(e) {
  return e <= 66;
}
function rl(e) {
  const t = typeof e == "string" ? Ut(e) : e;
  return Fi(t) && !ji(t);
}
function* ol() {
  for (let e = 1; e <= ht.length; e++)
    yield e;
}
const il = 1, Bi = ht.length;
function al() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function zr(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= ht.length ? t : ht[n];
}
function Li(e) {
  return e <= 0 || e > Bi ? "******" : Di[e - 1];
}
function sl(e) {
  return Li(Ut(e));
}
function Fi(e) {
  const t = typeof e == "number" ? zr(e) : e;
  return Vr(t) && !Fr.includes(t);
}
function ll(e) {
  const t = typeof e == "number" ? zr(e) : e;
  return Vr(t) && Fr.includes(t);
}
function cl(e) {
  return Di[e - 1].includes("*obsolete*");
}
function ul() {
  const e = {};
  for (let t = 0; t < ht.length; t++)
    e[ht[t]] = t + 1;
  return e;
}
const ie = {
  allBookIds: ht,
  nonCanonicalIds: Fr,
  bookIdToNumber: Ut,
  isBookIdValid: Vr,
  isBookNT: tl,
  isBookOT: nl,
  isBookOTNT: ji,
  isBookDC: rl,
  allBookNumbers: ol,
  firstBook: il,
  lastBook: Bi,
  extraBooks: al,
  bookNumberToId: zr,
  bookNumberToEnglishName: Li,
  bookIdToEnglishName: sl,
  isCanonical: Fi,
  isExtraMaterial: ll,
  isObsolete: cl
};
var rt = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(rt || {});
const Me = class {
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
te(Me, "Original", new Me(rt.Original)), te(Me, "Septuagint", new Me(rt.Septuagint)), te(Me, "Vulgate", new Me(rt.Vulgate)), te(Me, "English", new Me(rt.English)), te(Me, "RussianProtestant", new Me(rt.RussianProtestant)), te(Me, "RussianOrthodox", new Me(rt.RussianOrthodox));
let Rt = Me;
function Io(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Vi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Vi || {});
const Se = class oe {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, s = n != null && n instanceof Rt ? n : void 0;
        this.setEmpty(s), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof Rt ? n : void 0;
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
          const i = t instanceof Rt ? t : oe.defaultVersification;
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
    this.versification = this.versification != null ? new Rt(t) : void 0;
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
          this.versification = new Rt(rt[s]);
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
    const o = [], i = Io(this._verse, r);
    for (const s of i.map((l) => Io(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const u = this.clone();
        if (u.verse = s[1], !t)
          for (let d = c + 1; d < u.verseNum; d++) {
            const m = new oe(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(m);
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
te(Se, "defaultVersification", Rt.English), te(Se, "verseRangeSeparator", "-"), te(Se, "verseSequenceIndicator", ","), te(Se, "verseRangeSeparators", [Se.verseRangeSeparator]), te(Se, "verseSequenceIndicators", [Se.verseSequenceIndicator]), te(Se, "chapterDigitShifter", 1e3), te(Se, "bookDigitShifter", Se.chapterDigitShifter * Se.chapterDigitShifter), te(Se, "bcvMaxValue", Se.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Se, "ValidStatusType", Vi);
class Yt extends Error {
}
function _e(...e) {
  return Ss(Os(e));
}
const dl = ge.Root, pl = ge.Trigger, fl = T.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ ue(
  ge.SubTrigger,
  {
    ref: o,
    className: _e(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ x(vs, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
fl.displayName = ge.SubTrigger.displayName;
const ml = T.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ge.SubContent,
  {
    ref: n,
    className: _e(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
ml.displayName = ge.SubContent.displayName;
const zi = T.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ x(ge.Portal, { children: /* @__PURE__ */ x(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: _e(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
zi.displayName = ge.Content.displayName;
const Ui = T.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ x(
  ge.Item,
  {
    ref: r,
    className: _e(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Ui.displayName = ge.Item.displayName;
const hl = T.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ ue(
  ge.CheckboxItem,
  {
    ref: o,
    className: _e(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(ge.ItemIndicator, { children: /* @__PURE__ */ x(ys, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
hl.displayName = ge.CheckboxItem.displayName;
const gl = T.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ ue(
  ge.RadioItem,
  {
    ref: r,
    className: _e(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ x("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ x(ge.ItemIndicator, { children: /* @__PURE__ */ x(ws, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
gl.displayName = ge.RadioItem.displayName;
const Ur = T.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ x(
  ge.Label,
  {
    ref: r,
    className: _e("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
Ur.displayName = ge.Label.displayName;
const Hi = T.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ge.Separator,
  {
    ref: n,
    className: _e("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Hi.displayName = ge.Separator.displayName;
const Wi = T.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ x(
    "input",
    {
      type: t,
      className: _e(
        "pr-flex pr-h-10 pr-w-full pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Wi.displayName = "Input";
const bl = Ri(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ ue("div", { className: "pr-relative", children: [
    /* @__PURE__ */ x(
      Wi,
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
      xs,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function vl({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), s = Ce(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ x("div", { className: _e("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ x(
    "div",
    {
      className: _e(
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
const yl = Ri(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: s
  }, l) => /* @__PURE__ */ ue(
    Ui,
    {
      ref: l,
      textValue: e,
      className: _e("pr-font-normal pr-text-slate-700", {
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
            className: _e(
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
function wl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ ue(Ur, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ x("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ ue("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ x(
        Es,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ x(
        Ts,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ x(
        ks,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const an = ie.allBookIds, xl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, _o = ["OT", "NT", "DC"], El = 32 + 32 + 32, Tl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], kl = (e) => ({
  OT: an.filter((n) => ie.isBookOT(n)),
  NT: an.filter((n) => ie.isBookNT(n)),
  DC: an.filter((n) => ie.isBookDC(n))
})[e], Jt = (e) => $i(ie.bookIdToNumber(e));
function Ol() {
  return an.map((t) => ie.bookIdToEnglishName(t));
}
function Sl(e) {
  return Ol().includes(e);
}
function Cl(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Sl(t))
    return an.find((r) => ie.bookIdToEnglishName(r) === t);
}
function Jm({ scrRef: e, handleSubmit: t }) {
  const [n, r] = we(""), [o, i] = we(
    ie.bookNumberToId(e.bookNum)
  ), [s, l] = we(e.chapterNum ?? 0), [c, u] = we(
    ie.bookNumberToId(e.bookNum)
  ), [d, m] = we(!1), [f, b] = we(d), v = ft(void 0), g = ft(void 0), h = ft(void 0), E = Ce(
    (C) => kl(C).filter((R) => {
      const $ = ie.bookIdToEnglishName(R).toLowerCase(), F = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(F) || // Match book name
      R.toLowerCase().includes(F);
    }),
    [n]
  ), I = (C) => {
    r(C);
  }, w = ft(!1), y = Ce((C) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    m(C);
  }, []), p = Ce(
    (C, R, $, F) => {
      if (l(
        ie.bookNumberToId(e.bookNum) !== C ? 1 : e.chapterNum
      ), R || Jt(C) === -1) {
        t({
          bookNum: ie.bookIdToNumber(C),
          chapterNum: $ || 1,
          verseNum: F || 1
        }), m(!1), r("");
        return;
      }
      i(o !== C ? C : ""), m(!R);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), S = (C) => {
    C <= 0 || C > Jt(o) || p(o, !0, C);
  }, N = Ce(() => {
    Tl.forEach((C) => {
      const R = n.match(C);
      if (R) {
        const [$, F = void 0, D = void 0] = R.slice(1), M = Cl($);
        (ie.isBookIdValid($) || M) && p(
          M ?? $,
          !0,
          F ? parseInt(F, 10) : 1,
          D ? parseInt(D, 10) : 1
        );
      }
    });
  }, [p, n]), B = Ce(
    (C) => {
      d ? (C.key === "ArrowDown" || C.key === "ArrowUp") && (typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null ? h.current.focus() : typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null && g.current.focus(), C.preventDefault()) : m(!0);
    },
    [d]
  ), L = (C) => {
    const { key: R } = C;
    R === "ArrowRight" || R === "ArrowLeft" || R === "ArrowDown" || R === "ArrowUp" || R === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: R })), v.current.focus());
  }, j = (C) => {
    const { key: R } = C;
    if (c === o) {
      if (R === "Enter") {
        C.preventDefault(), p(o, !0, s);
        return;
      }
      let $ = 0;
      if (R === "ArrowRight")
        if (s < Jt(c))
          $ = 1;
        else {
          C.preventDefault();
          return;
        }
      else if (R === "ArrowLeft")
        if (s > 1)
          $ = -1;
        else {
          C.preventDefault();
          return;
        }
      else
        R === "ArrowDown" ? $ = 6 : R === "ArrowUp" && ($ = -6);
      s + $ <= 0 || s + $ > Jt(c) ? l(0) : $ !== 0 && (l(s + $), C.preventDefault());
    }
  };
  return zt(() => {
    o === c ? o === ie.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), So(() => {
    b(d);
  }, [d]), So(() => {
    const C = setTimeout(() => {
      if (f && g.current && h.current) {
        const $ = h.current.offsetTop - El;
        g.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(C);
    };
  }, [f]), /* @__PURE__ */ x("div", { children: /* @__PURE__ */ ue(dl, { modal: !1, open: d, onOpenChange: y, children: [
    /* @__PURE__ */ x(pl, { asChild: !0, children: /* @__PURE__ */ x(
      bl,
      {
        ref: v,
        value: n,
        handleSearch: I,
        handleKeyDown: B,
        handleOnClick: () => {
          i(ie.bookNumberToId(e.bookNum)), u(ie.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), m(!0), v.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: N,
        placeholder: `${ie.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ ue(
      zi,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: L,
        align: "start",
        ref: g,
        children: [
          /* @__PURE__ */ x(
            wl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          _o.map(
            (C, R) => E(C).length > 0 && /* @__PURE__ */ ue("div", { children: [
              /* @__PURE__ */ x(Ur, { className: "pr-font-semibold pr-text-slate-700", children: xl[C] }),
              E(C).map(($) => /* @__PURE__ */ x("div", { children: /* @__PURE__ */ x(
                yl,
                {
                  bookId: $,
                  handleSelectBook: () => p($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => u($),
                  handleKeyDown: j,
                  bookType: C,
                  ref: (F) => {
                    o === $ && (h.current = F);
                  },
                  children: /* @__PURE__ */ x(
                    vl,
                    {
                      handleSelectChapter: S,
                      endChapter: Jt($),
                      activeChapter: e.bookNum === ie.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (F) => {
                        l(F);
                      }
                    }
                  )
                }
              ) }, $)),
              _o.length - 1 !== R ? /* @__PURE__ */ x(Hi, {}) : void 0
            ] }, C)
          )
        ]
      }
    )
  ] }) });
}
function Tt({
  id: e,
  isDisabled: t = !1,
  className: n,
  onClick: r,
  onContextMenu: o,
  children: i
}) {
  return /* @__PURE__ */ x(
    Cs,
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
function Cr({
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
  onFocus: m,
  onBlur: f,
  getOptionLabel: b
}) {
  return /* @__PURE__ */ x(
    Ns,
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
      onFocus: m,
      onBlur: f,
      getOptionLabel: b,
      renderInput: (v) => /* @__PURE__ */ x(
        Mi,
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
function Zm({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o,
  chapterCount: i
}) {
  const s = wt(
    () => Array.from({ length: i }, (u, d) => d + 1),
    [i]
  ), l = (u, d) => {
    n(d), d > t && r(d);
  }, c = (u, d) => {
    r(d), d < e && n(d);
  };
  return /* @__PURE__ */ ue(qn, { children: [
    /* @__PURE__ */ x(
      $o,
      {
        className: "book-selection-chapter-form-label start",
        disabled: o,
        control: /* @__PURE__ */ x(
          Cr,
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
      $o,
      {
        className: "book-selection-chapter-form-label end",
        disabled: o,
        control: /* @__PURE__ */ x(
          Cr,
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
var $t = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))($t || {});
function Nl({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = $t.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: s = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const d = /* @__PURE__ */ x(
    Rs,
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
  let m;
  if (n) {
    const f = r === $t.Before || r === $t.Above, b = /* @__PURE__ */ x("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), v = r === $t.Before || r === $t.After, g = v ? b : /* @__PURE__ */ x("div", { children: b }), h = v ? d : /* @__PURE__ */ x("div", { children: d });
    m = /* @__PURE__ */ ue(
      Ps,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: s,
        error: l,
        children: [
          f && g,
          h,
          !f && g
        ]
      }
    );
  } else
    m = d;
  return m;
}
function de(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function k() {
  return k = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, k.apply(this, arguments);
}
function Pl(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Rl(e) {
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
var Nr = { exports: {} }, Cn = { exports: {} }, ae = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ao;
function $l() {
  if (Ao)
    return ae;
  Ao = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function w(p) {
    if (typeof p == "object" && p !== null) {
      var S = p.$$typeof;
      switch (S) {
        case t:
          switch (p = p.type, p) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case m:
              return p;
            default:
              switch (p = p && p.$$typeof, p) {
                case l:
                case d:
                case v:
                case b:
                case s:
                  return p;
                default:
                  return S;
              }
          }
        case n:
          return S;
      }
    }
  }
  function y(p) {
    return w(p) === u;
  }
  return ae.AsyncMode = c, ae.ConcurrentMode = u, ae.ContextConsumer = l, ae.ContextProvider = s, ae.Element = t, ae.ForwardRef = d, ae.Fragment = r, ae.Lazy = v, ae.Memo = b, ae.Portal = n, ae.Profiler = i, ae.StrictMode = o, ae.Suspense = m, ae.isAsyncMode = function(p) {
    return y(p) || w(p) === c;
  }, ae.isConcurrentMode = y, ae.isContextConsumer = function(p) {
    return w(p) === l;
  }, ae.isContextProvider = function(p) {
    return w(p) === s;
  }, ae.isElement = function(p) {
    return typeof p == "object" && p !== null && p.$$typeof === t;
  }, ae.isForwardRef = function(p) {
    return w(p) === d;
  }, ae.isFragment = function(p) {
    return w(p) === r;
  }, ae.isLazy = function(p) {
    return w(p) === v;
  }, ae.isMemo = function(p) {
    return w(p) === b;
  }, ae.isPortal = function(p) {
    return w(p) === n;
  }, ae.isProfiler = function(p) {
    return w(p) === i;
  }, ae.isStrictMode = function(p) {
    return w(p) === o;
  }, ae.isSuspense = function(p) {
    return w(p) === m;
  }, ae.isValidElementType = function(p) {
    return typeof p == "string" || typeof p == "function" || p === r || p === u || p === i || p === o || p === m || p === f || typeof p == "object" && p !== null && (p.$$typeof === v || p.$$typeof === b || p.$$typeof === s || p.$$typeof === l || p.$$typeof === d || p.$$typeof === h || p.$$typeof === E || p.$$typeof === I || p.$$typeof === g);
  }, ae.typeOf = w, ae;
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
var Do;
function Ml() {
  return Do || (Do = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, d = e ? Symbol.for("react.forward_ref") : 60112, m = e ? Symbol.for("react.suspense") : 60113, f = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, E = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function w(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === r || _ === u || _ === i || _ === o || _ === m || _ === f || typeof _ == "object" && _ !== null && (_.$$typeof === v || _.$$typeof === b || _.$$typeof === s || _.$$typeof === l || _.$$typeof === d || _.$$typeof === h || _.$$typeof === E || _.$$typeof === I || _.$$typeof === g);
    }
    function y(_) {
      if (typeof _ == "object" && _ !== null) {
        var J = _.$$typeof;
        switch (J) {
          case t:
            var P = _.type;
            switch (P) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case m:
                return P;
              default:
                var re = P && P.$$typeof;
                switch (re) {
                  case l:
                  case d:
                  case v:
                  case b:
                  case s:
                    return re;
                  default:
                    return J;
                }
            }
          case n:
            return J;
        }
      }
    }
    var p = c, S = u, N = l, B = s, L = t, j = d, C = r, R = v, $ = b, F = n, D = i, M = o, V = m, Q = !1;
    function Z(_) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(_) || y(_) === c;
    }
    function O(_) {
      return y(_) === u;
    }
    function A(_) {
      return y(_) === l;
    }
    function U(_) {
      return y(_) === s;
    }
    function K(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === t;
    }
    function z(_) {
      return y(_) === d;
    }
    function H(_) {
      return y(_) === r;
    }
    function q(_) {
      return y(_) === v;
    }
    function G(_) {
      return y(_) === b;
    }
    function W(_) {
      return y(_) === n;
    }
    function X(_) {
      return y(_) === i;
    }
    function Y(_) {
      return y(_) === o;
    }
    function ne(_) {
      return y(_) === m;
    }
    se.AsyncMode = p, se.ConcurrentMode = S, se.ContextConsumer = N, se.ContextProvider = B, se.Element = L, se.ForwardRef = j, se.Fragment = C, se.Lazy = R, se.Memo = $, se.Portal = F, se.Profiler = D, se.StrictMode = M, se.Suspense = V, se.isAsyncMode = Z, se.isConcurrentMode = O, se.isContextConsumer = A, se.isContextProvider = U, se.isElement = K, se.isForwardRef = z, se.isFragment = H, se.isLazy = q, se.isMemo = G, se.isPortal = W, se.isProfiler = X, se.isStrictMode = Y, se.isSuspense = ne, se.isValidElementType = w, se.typeOf = y;
  }()), se;
}
var jo;
function qi() {
  return jo || (jo = 1, process.env.NODE_ENV === "production" ? Cn.exports = $l() : Cn.exports = Ml()), Cn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var pr, Bo;
function Il() {
  if (Bo)
    return pr;
  Bo = 1;
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
  return pr = o() ? Object.assign : function(i, s) {
    for (var l, c = r(i), u, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var m in l)
        t.call(l, m) && (c[m] = l[m]);
      if (e) {
        u = e(l);
        for (var f = 0; f < u.length; f++)
          n.call(l, u[f]) && (c[u[f]] = l[u[f]]);
      }
    }
    return c;
  }, pr;
}
var fr, Lo;
function Hr() {
  if (Lo)
    return fr;
  Lo = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return fr = e, fr;
}
var mr, Fo;
function Gi() {
  return Fo || (Fo = 1, mr = Function.call.bind(Object.prototype.hasOwnProperty)), mr;
}
var hr, Vo;
function _l() {
  if (Vo)
    return hr;
  Vo = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Hr(), n = {}, r = Gi();
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
          var m;
          try {
            if (typeof i[d] != "function") {
              var f = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw f.name = "Invariant Violation", f;
            }
            m = i[d](s, d, c, l, null, t);
          } catch (v) {
            m = v;
          }
          if (m && !(m instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in n)) {
            n[m.message] = !0;
            var b = u ? u() : "";
            e(
              "Failed " + l + " type: " + m.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, hr = o, hr;
}
var gr, zo;
function Al() {
  if (zo)
    return gr;
  zo = 1;
  var e = qi(), t = Il(), n = Hr(), r = Gi(), o = _l(), i = function() {
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
  return gr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function m(O) {
      var A = O && (u && O[u] || O[d]);
      if (typeof A == "function")
        return A;
    }
    var f = "<<anonymous>>", b = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: I(),
      arrayOf: w,
      element: y(),
      elementType: p(),
      instanceOf: S,
      node: j(),
      objectOf: B,
      oneOf: N,
      oneOfType: L,
      shape: R,
      exact: $
    };
    function v(O, A) {
      return O === A ? O !== 0 || 1 / O === 1 / A : O !== O && A !== A;
    }
    function g(O, A) {
      this.message = O, this.data = A && typeof A == "object" ? A : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function h(O) {
      if (process.env.NODE_ENV !== "production")
        var A = {}, U = 0;
      function K(H, q, G, W, X, Y, ne) {
        if (W = W || f, Y = Y || G, ne !== n) {
          if (c) {
            var _ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw _.name = "Invariant Violation", _;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var J = W + ":" + G;
            !A[J] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + Y + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), A[J] = !0, U++);
          }
        }
        return q[G] == null ? H ? q[G] === null ? new g("The " + X + " `" + Y + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new g("The " + X + " `" + Y + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : O(q, G, W, X, Y);
      }
      var z = K.bind(null, !1);
      return z.isRequired = K.bind(null, !0), z;
    }
    function E(O) {
      function A(U, K, z, H, q, G) {
        var W = U[K], X = M(W);
        if (X !== O) {
          var Y = V(W);
          return new g(
            "Invalid " + H + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return h(A);
    }
    function I() {
      return h(s);
    }
    function w(O) {
      function A(U, K, z, H, q) {
        if (typeof O != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var G = U[K];
        if (!Array.isArray(G)) {
          var W = M(G);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var X = 0; X < G.length; X++) {
          var Y = O(G, X, z, H, q + "[" + X + "]", n);
          if (Y instanceof Error)
            return Y;
        }
        return null;
      }
      return h(A);
    }
    function y() {
      function O(A, U, K, z, H) {
        var q = A[U];
        if (!l(q)) {
          var G = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + G + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(O);
    }
    function p() {
      function O(A, U, K, z, H) {
        var q = A[U];
        if (!e.isValidElementType(q)) {
          var G = M(q);
          return new g("Invalid " + z + " `" + H + "` of type " + ("`" + G + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(O);
    }
    function S(O) {
      function A(U, K, z, H, q) {
        if (!(U[K] instanceof O)) {
          var G = O.name || f, W = Z(U[K]);
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + G + "`."));
        }
        return null;
      }
      return h(A);
    }
    function N(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), s;
      function A(U, K, z, H, q) {
        for (var G = U[K], W = 0; W < O.length; W++)
          if (v(G, O[W]))
            return null;
        var X = JSON.stringify(O, function(ne, _) {
          var J = V(_);
          return J === "symbol" ? String(_) : _;
        });
        return new g("Invalid " + H + " `" + q + "` of value `" + String(G) + "` " + ("supplied to `" + z + "`, expected one of " + X + "."));
      }
      return h(A);
    }
    function B(O) {
      function A(U, K, z, H, q) {
        if (typeof O != "function")
          return new g("Property `" + q + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var G = U[K], W = M(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var X in G)
          if (r(G, X)) {
            var Y = O(G, X, z, H, q + "." + X, n);
            if (Y instanceof Error)
              return Y;
          }
        return null;
      }
      return h(A);
    }
    function L(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var A = 0; A < O.length; A++) {
        var U = O[A];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(U) + " at index " + A + "."
          ), s;
      }
      function K(z, H, q, G, W) {
        for (var X = [], Y = 0; Y < O.length; Y++) {
          var ne = O[Y], _ = ne(z, H, q, G, W, n);
          if (_ == null)
            return null;
          _.data && r(_.data, "expectedType") && X.push(_.data.expectedType);
        }
        var J = X.length > 0 ? ", expected one of type [" + X.join(", ") + "]" : "";
        return new g("Invalid " + G + " `" + W + "` supplied to " + ("`" + q + "`" + J + "."));
      }
      return h(K);
    }
    function j() {
      function O(A, U, K, z, H) {
        return F(A[U]) ? null : new g("Invalid " + z + " `" + H + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return h(O);
    }
    function C(O, A, U, K, z) {
      return new g(
        (O || "React class") + ": " + A + " type `" + U + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function R(O) {
      function A(U, K, z, H, q) {
        var G = U[K], W = M(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var X in O) {
          var Y = O[X];
          if (typeof Y != "function")
            return C(z, H, q, X, V(Y));
          var ne = Y(G, X, z, H, q + "." + X, n);
          if (ne)
            return ne;
        }
        return null;
      }
      return h(A);
    }
    function $(O) {
      function A(U, K, z, H, q) {
        var G = U[K], W = M(G);
        if (W !== "object")
          return new g("Invalid " + H + " `" + q + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var X = t({}, U[K], O);
        for (var Y in X) {
          var ne = O[Y];
          if (r(O, Y) && typeof ne != "function")
            return C(z, H, q, Y, V(ne));
          if (!ne)
            return new g(
              "Invalid " + H + " `" + q + "` key `" + Y + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(U[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var _ = ne(G, Y, z, H, q + "." + Y, n);
          if (_)
            return _;
        }
        return null;
      }
      return h(A);
    }
    function F(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(F);
          if (O === null || l(O))
            return !0;
          var A = m(O);
          if (A) {
            var U = A.call(O), K;
            if (A !== O.entries) {
              for (; !(K = U.next()).done; )
                if (!F(K.value))
                  return !1;
            } else
              for (; !(K = U.next()).done; ) {
                var z = K.value;
                if (z && !F(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function D(O, A) {
      return O === "symbol" ? !0 : A ? A["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && A instanceof Symbol : !1;
    }
    function M(O) {
      var A = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : D(A, O) ? "symbol" : A;
    }
    function V(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var A = M(O);
      if (A === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return A;
    }
    function Q(O) {
      var A = V(O);
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
    function Z(O) {
      return !O.constructor || !O.constructor.name ? f : O.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, gr;
}
var br, Uo;
function Dl() {
  if (Uo)
    return br;
  Uo = 1;
  var e = Hr();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, br = function() {
    function r(s, l, c, u, d, m) {
      if (m !== e) {
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
  }, br;
}
if (process.env.NODE_ENV !== "production") {
  var jl = qi(), Bl = !0;
  Nr.exports = Al()(jl.isElement, Bl);
} else
  Nr.exports = Dl()();
var Ll = Nr.exports;
const a = /* @__PURE__ */ Pl(Ll);
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
function Ki(e) {
  if (!pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ki(e[n]);
  }), t;
}
function Ye(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? k({}, e) : e;
  return pt(e) && pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (pt(t[o]) && o in e && pt(e[o]) ? r[o] = Ye(e[o], t[o], n) : n.clone ? r[o] = pt(t[o]) ? Ki(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function Fl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Xi(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !Fl(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Yi = Ht(a.element, Xi);
Yi.isRequired = Ht(a.element.isRequired, Xi);
const gn = Yi;
function Vl(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function zl(e, t, n, r, o) {
  const i = e[t], s = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !Vl(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ul = Ht(a.elementType, zl), Hl = "exact-prop: ​";
function Ji(e) {
  return process.env.NODE_ENV === "production" ? e : k({}, e, {
    [Hl]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Dt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Pr = { exports: {} }, le = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ho;
function Wl() {
  if (Ho)
    return le;
  Ho = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function g(h) {
    if (typeof h == "object" && h !== null) {
      var E = h.$$typeof;
      switch (E) {
        case e:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case u:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case s:
                case c:
                case f:
                case m:
                case i:
                  return h;
                default:
                  return E;
              }
          }
        case t:
          return E;
      }
    }
  }
  return le.ContextConsumer = s, le.ContextProvider = i, le.Element = e, le.ForwardRef = c, le.Fragment = n, le.Lazy = f, le.Memo = m, le.Portal = t, le.Profiler = o, le.StrictMode = r, le.Suspense = u, le.SuspenseList = d, le.isAsyncMode = function() {
    return !1;
  }, le.isConcurrentMode = function() {
    return !1;
  }, le.isContextConsumer = function(h) {
    return g(h) === s;
  }, le.isContextProvider = function(h) {
    return g(h) === i;
  }, le.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, le.isForwardRef = function(h) {
    return g(h) === c;
  }, le.isFragment = function(h) {
    return g(h) === n;
  }, le.isLazy = function(h) {
    return g(h) === f;
  }, le.isMemo = function(h) {
    return g(h) === m;
  }, le.isPortal = function(h) {
    return g(h) === t;
  }, le.isProfiler = function(h) {
    return g(h) === o;
  }, le.isStrictMode = function(h) {
    return g(h) === r;
  }, le.isSuspense = function(h) {
    return g(h) === u;
  }, le.isSuspenseList = function(h) {
    return g(h) === d;
  }, le.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === u || h === d || h === b || typeof h == "object" && h !== null && (h.$$typeof === f || h.$$typeof === m || h.$$typeof === i || h.$$typeof === s || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
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
var Wo;
function ql() {
  return Wo || (Wo = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), f = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, g = !1, h = !1, E = !1, I = !1, w;
    w = Symbol.for("react.module.reference");
    function y(P) {
      return !!(typeof P == "string" || typeof P == "function" || P === n || P === o || I || P === r || P === u || P === d || E || P === b || v || g || h || typeof P == "object" && P !== null && (P.$$typeof === f || P.$$typeof === m || P.$$typeof === i || P.$$typeof === s || P.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      P.$$typeof === w || P.getModuleId !== void 0));
    }
    function p(P) {
      if (typeof P == "object" && P !== null) {
        var re = P.$$typeof;
        switch (re) {
          case e:
            var ve = P.type;
            switch (ve) {
              case n:
              case o:
              case r:
              case u:
              case d:
                return ve;
              default:
                var ke = ve && ve.$$typeof;
                switch (ke) {
                  case l:
                  case s:
                  case c:
                  case f:
                  case m:
                  case i:
                    return ke;
                  default:
                    return re;
                }
            }
          case t:
            return re;
        }
      }
    }
    var S = s, N = i, B = e, L = c, j = n, C = f, R = m, $ = t, F = o, D = r, M = u, V = d, Q = !1, Z = !1;
    function O(P) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function A(P) {
      return Z || (Z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(P) {
      return p(P) === s;
    }
    function K(P) {
      return p(P) === i;
    }
    function z(P) {
      return typeof P == "object" && P !== null && P.$$typeof === e;
    }
    function H(P) {
      return p(P) === c;
    }
    function q(P) {
      return p(P) === n;
    }
    function G(P) {
      return p(P) === f;
    }
    function W(P) {
      return p(P) === m;
    }
    function X(P) {
      return p(P) === t;
    }
    function Y(P) {
      return p(P) === o;
    }
    function ne(P) {
      return p(P) === r;
    }
    function _(P) {
      return p(P) === u;
    }
    function J(P) {
      return p(P) === d;
    }
    ce.ContextConsumer = S, ce.ContextProvider = N, ce.Element = B, ce.ForwardRef = L, ce.Fragment = j, ce.Lazy = C, ce.Memo = R, ce.Portal = $, ce.Profiler = F, ce.StrictMode = D, ce.Suspense = M, ce.SuspenseList = V, ce.isAsyncMode = O, ce.isConcurrentMode = A, ce.isContextConsumer = U, ce.isContextProvider = K, ce.isElement = z, ce.isForwardRef = H, ce.isFragment = q, ce.isLazy = G, ce.isMemo = W, ce.isPortal = X, ce.isProfiler = Y, ce.isStrictMode = ne, ce.isSuspense = _, ce.isSuspenseList = J, ce.isValidElementType = y, ce.typeOf = p;
  }()), ce;
}
process.env.NODE_ENV === "production" ? Pr.exports = Wl() : Pr.exports = ql();
var jn = Pr.exports;
const Gl = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Kl(e) {
  const t = `${e}`.match(Gl);
  return t && t[1] || "";
}
function Zi(e, t = "") {
  return e.displayName || e.name || Kl(e) || t;
}
function qo(e, t, n) {
  const r = Zi(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Xl(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Zi(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case jn.ForwardRef:
          return qo(e, e.render, "ForwardRef");
        case jn.Memo:
          return qo(e, e.type, "memo");
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
const Yl = a.oneOfType([a.func, a.object]), Wr = Yl;
function He(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Dt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Rr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Qi(e, t = 166) {
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
function Jl(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Zl(e, t) {
  var n, r;
  return /* @__PURE__ */ T.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Ee(e) {
  return e && e.ownerDocument || document;
}
function jt(e) {
  return Ee(e).defaultView || window;
}
function Ql(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? k({}, t.propTypes) : null;
  return (o) => (i, s, l, c, u, ...d) => {
    const m = u || s, f = n == null ? void 0 : n[m];
    if (f) {
      const b = f(i, s, l, c, u, ...d);
      if (b)
        return b;
    }
    return typeof i[s] < "u" && !i[o] ? new Error(`The prop \`${m}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Bn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const ec = typeof window < "u" ? T.useLayoutEffect : T.useEffect, gt = ec;
let Go = 0;
function tc(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && (Go += 1, n(`mui-${Go}`));
  }, [t]), r;
}
const Ko = T["useId".toString()];
function ea(e) {
  if (Ko !== void 0) {
    const t = Ko();
    return e ?? t;
  }
  return tc(e);
}
function nc(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function ta({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [i, s] = T.useState(t), l = o ? e : i;
  if (process.env.NODE_ENV !== "production") {
    T.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = T.useRef(t);
    T.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((u) => {
    o || s(u);
  }, []);
  return [l, c];
}
function dn(e) {
  const t = T.useRef(e);
  return gt(() => {
    t.current = e;
  }), T.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Le(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Bn(n, t);
    });
  }, e);
}
const Xo = {};
function rc(e, t) {
  const n = T.useRef(Xo);
  return n.current === Xo && (n.current = e(t)), n;
}
const oc = [];
function ic(e) {
  T.useEffect(e, oc);
}
class bn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new bn();
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
  const e = rc(bn.create).current;
  return ic(e.disposeEffect), e;
}
let Gn = !0, $r = !1;
const ac = new bn(), sc = {
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
function lc(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && sc[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function cc(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Gn = !0);
}
function vr() {
  Gn = !1;
}
function uc() {
  this.visibilityState === "hidden" && $r && (Gn = !0);
}
function dc(e) {
  e.addEventListener("keydown", cc, !0), e.addEventListener("mousedown", vr, !0), e.addEventListener("pointerdown", vr, !0), e.addEventListener("touchstart", vr, !0), e.addEventListener("visibilitychange", uc, !0);
}
function pc(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Gn || lc(t);
}
function na() {
  const e = T.useCallback((o) => {
    o != null && dc(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? ($r = !0, ac.start(100, () => {
      $r = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return pc(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function ra(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function fc(e) {
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
function mc(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const hc = Number.isInteger || mc;
function oa(e, t, n, r) {
  const o = e[t];
  if (o == null || !hc(o)) {
    const i = fc(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function ia(e, t, ...n) {
  return e[t] === void 0 ? null : oa(e, t, ...n);
}
function Mr() {
  return null;
}
ia.isRequired = oa;
Mr.isRequired = Mr;
const aa = process.env.NODE_ENV === "production" ? Mr : ia;
function sa(e, t) {
  const n = k({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = k({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = k({}, i), Object.keys(o).forEach((s) => {
        n[r][s] = sa(o[s], i[s]);
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
const Yo = (e) => e, gc = () => {
  let e = Yo;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Yo;
    }
  };
}, bc = gc(), la = bc, ca = {
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
function qe(e, t, n = "Mui") {
  const r = ca[t];
  return r ? `${n}-${r}` : `${la.generate(e)}-${t}`;
}
function it(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = qe(e, o, n);
  }), r;
}
function vc(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ua(e) {
  return typeof e == "string";
}
function rn(e, t, n) {
  return e === void 0 || ua(e) ? t : k({}, t, {
    ownerState: k({}, t.ownerState, n)
  });
}
const yc = {
  disableDefaultClasses: !1
}, wc = /* @__PURE__ */ T.createContext(yc);
function xc(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(wc);
  return (n) => t ? "" : e(n);
}
function da(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Ec(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Jo(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Tc(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const b = xe(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = k({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = k({}, n, o, r);
    return b.length > 0 && (g.className = b), Object.keys(v).length > 0 && (g.style = v), {
      props: g,
      internalRef: void 0
    };
  }
  const s = da(k({}, o, r)), l = Jo(r), c = Jo(o), u = t(s), d = xe(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = k({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = k({}, u, n, c, l);
  return d.length > 0 && (f.className = d), Object.keys(m).length > 0 && (f.style = m), {
    props: f,
    internalRef: u.ref
  };
}
const kc = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function bt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, s = de(e, kc), l = i ? {} : Ec(r, o), {
    props: c,
    internalRef: u
  } = Tc(k({}, s, {
    externalSlotProps: l
  })), d = Le(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return rn(n, k({}, c, {
    ref: d
  }), o);
}
const pa = "base";
function Oc(e) {
  return `${pa}--${e}`;
}
function Sc(e, t) {
  return `${pa}-${e}-${t}`;
}
function fa(e, t) {
  const n = ca[t];
  return n ? Oc(n) : Sc(e, t);
}
function Cc(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = fa(e, r);
  }), n;
}
const Nc = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Pc(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Rc(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function $c(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Rc(e));
}
function Mc(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Nc)).forEach((r, o) => {
    const i = Pc(r);
    i === -1 || !$c(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Ic() {
  return !0;
}
function Ln(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Mc,
    isEnabled: s = Ic,
    open: l
  } = e, c = T.useRef(!1), u = T.useRef(null), d = T.useRef(null), m = T.useRef(null), f = T.useRef(null), b = T.useRef(!1), v = T.useRef(null), g = Le(t.ref, v), h = T.useRef(null);
  T.useEffect(() => {
    !l || !v.current || (b.current = !n);
  }, [n, l]), T.useEffect(() => {
    if (!l || !v.current)
      return;
    const w = Ee(v.current);
    return v.current.contains(w.activeElement) || (v.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), v.current.setAttribute("tabIndex", "-1")), b.current && v.current.focus()), () => {
      o || (m.current && m.current.focus && (c.current = !0, m.current.focus()), m.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !v.current)
      return;
    const w = Ee(v.current), y = (N) => {
      h.current = N, !(r || !s() || N.key !== "Tab") && w.activeElement === v.current && N.shiftKey && (c.current = !0, d.current && d.current.focus());
    }, p = () => {
      const N = v.current;
      if (N === null)
        return;
      if (!w.hasFocus() || !s() || c.current) {
        c.current = !1;
        return;
      }
      if (N.contains(w.activeElement) || r && w.activeElement !== u.current && w.activeElement !== d.current)
        return;
      if (w.activeElement !== f.current)
        f.current = null;
      else if (f.current !== null)
        return;
      if (!b.current)
        return;
      let B = [];
      if ((w.activeElement === u.current || w.activeElement === d.current) && (B = i(v.current)), B.length > 0) {
        var L, j;
        const C = !!((L = h.current) != null && L.shiftKey && ((j = h.current) == null ? void 0 : j.key) === "Tab"), R = B[0], $ = B[B.length - 1];
        typeof R != "string" && typeof $ != "string" && (C ? $.focus() : R.focus());
      } else
        N.focus();
    };
    w.addEventListener("focusin", p), w.addEventListener("keydown", y, !0);
    const S = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && p();
    }, 50);
    return () => {
      clearInterval(S), w.removeEventListener("focusin", p), w.removeEventListener("keydown", y, !0);
    };
  }, [n, r, o, s, l, i]);
  const E = (w) => {
    m.current === null && (m.current = w.relatedTarget), b.current = !0, f.current = w.target;
    const y = t.props.onFocus;
    y && y(w);
  }, I = (w) => {
    m.current === null && (m.current = w.relatedTarget), b.current = !0;
  };
  return /* @__PURE__ */ ue(T.Fragment, {
    children: [/* @__PURE__ */ x("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: g,
      onFocus: E
    }), /* @__PURE__ */ x("div", {
      tabIndex: l ? 0 : -1,
      onFocus: I,
      ref: d,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (Ln.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: gn,
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
process.env.NODE_ENV !== "production" && (Ln["propTypes"] = Ji(Ln.propTypes));
function _c(e) {
  return typeof e == "function" ? e() : e;
}
const pn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [s, l] = T.useState(null), c = Le(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if (gt(() => {
    i || l(_c(o) || document.body);
  }, [o, i]), gt(() => {
    if (s && !i)
      return Bn(n, s), () => {
        Bn(n, null);
      };
  }, [n, s, i]), i) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, u);
    }
    return /* @__PURE__ */ x(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ x(T.Fragment, {
    children: s && /* @__PURE__ */ Ws.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (pn.propTypes = {
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
process.env.NODE_ENV !== "production" && (pn["propTypes"] = Ji(pn.propTypes));
function Ac(e) {
  const t = Ee(e);
  return t.body === e ? jt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function sn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Zo(e) {
  return parseInt(jt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Dc(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Qo(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (s) => {
    const l = i.indexOf(s) === -1, c = !Dc(s);
    l && c && sn(s, o);
  });
}
function yr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function jc(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Ac(r)) {
      const s = ra(Ee(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Zo(r) + s}px`;
      const l = Ee(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Zo(c) + s}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Ee(r).body;
    else {
      const s = r.parentElement, l = jt(r);
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
function Bc(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Lc {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && sn(t.modalRef, !1);
    const o = Bc(n);
    Qo(n, t.mount, t.modalRef, o, !0);
    const i = yr(this.containers, (s) => s.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = yr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = jc(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = yr(this.containers, (s) => s.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && sn(t.modalRef, n), Qo(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const s = i.modals[i.modals.length - 1];
      s.modalRef && sn(s.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Fc(e) {
  return typeof e == "function" ? e() : e;
}
function Vc(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const zc = new Lc();
function Uc(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = zc,
    closeAfterTransition: i = !1,
    onTransitionEnter: s,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: d,
    rootRef: m
  } = e, f = T.useRef({}), b = T.useRef(null), v = T.useRef(null), g = Le(v, m), [h, E] = T.useState(!d), I = Vc(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const y = () => Ee(b.current), p = () => (f.current.modalRef = v.current, f.current.mount = b.current, f.current), S = () => {
    o.mount(p(), {
      disableScrollLock: r
    }), v.current && (v.current.scrollTop = 0);
  }, N = dn(() => {
    const M = Fc(t) || y().body;
    o.add(p(), M), v.current && S();
  }), B = T.useCallback(() => o.isTopModal(p()), [o]), L = dn((M) => {
    b.current = M, M && (d && B() ? S() : v.current && sn(v.current, w));
  }), j = T.useCallback(() => {
    o.remove(p(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    j();
  }, [j]), T.useEffect(() => {
    d ? N() : (!I || !i) && j();
  }, [d, j, I, i, N]);
  const C = (M) => (V) => {
    var Q;
    (Q = M.onKeyDown) == null || Q.call(M, V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !B()) && (n || (V.stopPropagation(), u && u(V, "escapeKeyDown")));
  }, R = (M) => (V) => {
    var Q;
    (Q = M.onClick) == null || Q.call(M, V), V.target === V.currentTarget && u && u(V, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const V = da(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const Q = k({}, V, M);
      return k({
        role: "presentation"
      }, Q, {
        onKeyDown: C(Q),
        ref: g
      });
    },
    getBackdropProps: (M = {}) => {
      const V = M;
      return k({
        "aria-hidden": !0
      }, V, {
        onClick: R(V),
        open: d
      });
    },
    getTransitionProps: () => {
      const M = () => {
        E(!1), s && s();
      }, V = () => {
        E(!0), l && l(), i && j();
      };
      return {
        onEnter: Rr(M, c == null ? void 0 : c.props.onEnter),
        onExited: Rr(V, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: g,
    portalRef: L,
    isTopModal: B,
    exited: h,
    hasTransition: I
  };
}
var Ne = "top", Fe = "bottom", Ve = "right", Pe = "left", qr = "auto", vn = [Ne, Fe, Ve, Pe], Bt = "start", fn = "end", Hc = "clippingParents", ma = "viewport", Zt = "popper", Wc = "reference", ei = /* @__PURE__ */ vn.reduce(function(e, t) {
  return e.concat([t + "-" + Bt, t + "-" + fn]);
}, []), ha = /* @__PURE__ */ [].concat(vn, [qr]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Bt, t + "-" + fn]);
}, []), qc = "beforeRead", Gc = "read", Kc = "afterRead", Xc = "beforeMain", Yc = "main", Jc = "afterMain", Zc = "beforeWrite", Qc = "write", eu = "afterWrite", tu = [qc, Gc, Kc, Xc, Yc, Jc, Zc, Qc, eu];
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
function vt(e) {
  var t = Ae(e).Element;
  return e instanceof t || e instanceof Element;
}
function Be(e) {
  var t = Ae(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Gr(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ae(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function nu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Be(i) || !We(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? i.removeAttribute(s) : i.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function ru(e) {
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
const ou = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: nu,
  effect: ru,
  requires: ["computeStyles"]
};
function Ue(e) {
  return e.split("-")[0];
}
var mt = Math.max, Fn = Math.min, Lt = Math.round;
function Ir() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ga() {
  return !/^((?!chrome|android).)*safari/i.test(Ir());
}
function Ft(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && Lt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Lt(r.height) / e.offsetHeight || 1);
  var s = vt(e) ? Ae(e) : window, l = s.visualViewport, c = !ga() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / i, m = r.width / o, f = r.height / i;
  return {
    width: m,
    height: f,
    top: d,
    right: u + m,
    bottom: d + f,
    left: u,
    x: u,
    y: d
  };
}
function Kr(e) {
  var t = Ft(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ba(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Gr(n)) {
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
function iu(e) {
  return ["table", "td", "th"].indexOf(We(e)) >= 0;
}
function at(e) {
  return ((vt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Kn(e) {
  return We(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Gr(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    at(e)
  );
}
function ti(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  Ze(e).position === "fixed" ? null : e.offsetParent;
}
function au(e) {
  var t = /firefox/i.test(Ir()), n = /Trident/i.test(Ir());
  if (n && Be(e)) {
    var r = Ze(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Kn(e);
  for (Gr(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(We(o)) < 0; ) {
    var i = Ze(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function yn(e) {
  for (var t = Ae(e), n = ti(e); n && iu(n) && Ze(n).position === "static"; )
    n = ti(n);
  return n && (We(n) === "html" || We(n) === "body" && Ze(n).position === "static") ? t : n || au(e) || t;
}
function Xr(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ln(e, t, n) {
  return mt(e, Fn(t, n));
}
function su(e, t, n) {
  var r = ln(e, t, n);
  return r > n ? n : r;
}
function va() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function ya(e) {
  return Object.assign({}, va(), e);
}
function wa(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var lu = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, ya(typeof t != "number" ? t : wa(t, vn));
};
function cu(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Ue(n.placement), c = Xr(l), u = [Pe, Ve].indexOf(l) >= 0, d = u ? "height" : "width";
  if (!(!i || !s)) {
    var m = lu(o.padding, n), f = Kr(i), b = c === "y" ? Ne : Pe, v = c === "y" ? Fe : Ve, g = n.rects.reference[d] + n.rects.reference[c] - s[c] - n.rects.popper[d], h = s[c] - n.rects.reference[c], E = yn(i), I = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, w = g / 2 - h / 2, y = m[b], p = I - f[d] - m[v], S = I / 2 - f[d] / 2 + w, N = ln(y, S, p), B = c;
    n.modifiersData[r] = (t = {}, t[B] = N, t.centerOffset = N - S, t);
  }
}
function uu(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ba(t.elements.popper, o) && (t.elements.arrow = o));
}
const du = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: cu,
  effect: uu,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Vt(e) {
  return e.split("-")[1];
}
var pu = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function fu(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Lt(n * o) / o || 0,
    y: Lt(r * o) / o || 0
  };
}
function ni(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, d = e.roundOffsets, m = e.isFixed, f = s.x, b = f === void 0 ? 0 : f, v = s.y, g = v === void 0 ? 0 : v, h = typeof d == "function" ? d({
    x: b,
    y: g
  }) : {
    x: b,
    y: g
  };
  b = h.x, g = h.y;
  var E = s.hasOwnProperty("x"), I = s.hasOwnProperty("y"), w = Pe, y = Ne, p = window;
  if (u) {
    var S = yn(n), N = "clientHeight", B = "clientWidth";
    if (S === Ae(n) && (S = at(n), Ze(S).position !== "static" && l === "absolute" && (N = "scrollHeight", B = "scrollWidth")), S = S, o === Ne || (o === Pe || o === Ve) && i === fn) {
      y = Fe;
      var L = m && S === p && p.visualViewport ? p.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        S[N]
      );
      g -= L - r.height, g *= c ? 1 : -1;
    }
    if (o === Pe || (o === Ne || o === Fe) && i === fn) {
      w = Ve;
      var j = m && S === p && p.visualViewport ? p.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        S[B]
      );
      b -= j - r.width, b *= c ? 1 : -1;
    }
  }
  var C = Object.assign({
    position: l
  }, u && pu), R = d === !0 ? fu({
    x: b,
    y: g
  }, Ae(n)) : {
    x: b,
    y: g
  };
  if (b = R.x, g = R.y, c) {
    var $;
    return Object.assign({}, C, ($ = {}, $[y] = I ? "0" : "", $[w] = E ? "0" : "", $.transform = (p.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + g + "px)" : "translate3d(" + b + "px, " + g + "px, 0)", $));
  }
  return Object.assign({}, C, (t = {}, t[y] = I ? g + "px" : "", t[w] = E ? b + "px" : "", t.transform = "", t));
}
function mu(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, s = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ue(t.placement),
    variation: Vt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ni(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ni(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const hu = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: mu,
  data: {}
};
var Nn = {
  passive: !0
};
function gu(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Ae(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(d) {
    d.addEventListener("scroll", n.update, Nn);
  }), l && c.addEventListener("resize", n.update, Nn), function() {
    i && u.forEach(function(d) {
      d.removeEventListener("scroll", n.update, Nn);
    }), l && c.removeEventListener("resize", n.update, Nn);
  };
}
const bu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: gu,
  data: {}
};
var vu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Mn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return vu[t];
  });
}
var yu = {
  start: "end",
  end: "start"
};
function ri(e) {
  return e.replace(/start|end/g, function(t) {
    return yu[t];
  });
}
function Yr(e) {
  var t = Ae(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Jr(e) {
  return Ft(at(e)).left + Yr(e).scrollLeft;
}
function wu(e, t) {
  var n = Ae(e), r = at(e), o = n.visualViewport, i = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, s = o.height;
    var u = ga();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: s,
    x: l + Jr(e),
    y: c
  };
}
function xu(e) {
  var t, n = at(e), r = Yr(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = mt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = mt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Jr(e), c = -r.scrollTop;
  return Ze(o || n).direction === "rtl" && (l += mt(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: s,
    x: l,
    y: c
  };
}
function Zr(e) {
  var t = Ze(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function xa(e) {
  return ["html", "body", "#document"].indexOf(We(e)) >= 0 ? e.ownerDocument.body : Be(e) && Zr(e) ? e : xa(Kn(e));
}
function cn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = xa(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Ae(r), s = o ? [i].concat(i.visualViewport || [], Zr(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(cn(Kn(s)))
  );
}
function _r(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Eu(e, t) {
  var n = Ft(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function oi(e, t, n) {
  return t === ma ? _r(wu(e, n)) : vt(t) ? Eu(t, n) : _r(xu(at(e)));
}
function Tu(e) {
  var t = cn(Kn(e)), n = ["absolute", "fixed"].indexOf(Ze(e).position) >= 0, r = n && Be(e) ? yn(e) : e;
  return vt(r) ? t.filter(function(o) {
    return vt(o) && ba(o, r) && We(o) !== "body";
  }) : [];
}
function ku(e, t, n, r) {
  var o = t === "clippingParents" ? Tu(e) : [].concat(t), i = [].concat(o, [n]), s = i[0], l = i.reduce(function(c, u) {
    var d = oi(e, u, r);
    return c.top = mt(d.top, c.top), c.right = Fn(d.right, c.right), c.bottom = Fn(d.bottom, c.bottom), c.left = mt(d.left, c.left), c;
  }, oi(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ea(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ue(r) : null, i = r ? Vt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ne:
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
    case Pe:
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
  var u = o ? Xr(o) : null;
  if (u != null) {
    var d = u === "y" ? "height" : "width";
    switch (i) {
      case Bt:
        c[u] = c[u] - (t[d] / 2 - n[d] / 2);
        break;
      case fn:
        c[u] = c[u] + (t[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function mn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, s = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? Hc : l, u = n.rootBoundary, d = u === void 0 ? ma : u, m = n.elementContext, f = m === void 0 ? Zt : m, b = n.altBoundary, v = b === void 0 ? !1 : b, g = n.padding, h = g === void 0 ? 0 : g, E = ya(typeof h != "number" ? h : wa(h, vn)), I = f === Zt ? Wc : Zt, w = e.rects.popper, y = e.elements[v ? I : f], p = ku(vt(y) ? y : y.contextElement || at(e.elements.popper), c, d, s), S = Ft(e.elements.reference), N = Ea({
    reference: S,
    element: w,
    strategy: "absolute",
    placement: o
  }), B = _r(Object.assign({}, w, N)), L = f === Zt ? B : S, j = {
    top: p.top - L.top + E.top,
    bottom: L.bottom - p.bottom + E.bottom,
    left: p.left - L.left + E.left,
    right: L.right - p.right + E.right
  }, C = e.modifiersData.offset;
  if (f === Zt && C) {
    var R = C[o];
    Object.keys(j).forEach(function($) {
      var F = [Ve, Fe].indexOf($) >= 0 ? 1 : -1, D = [Ne, Fe].indexOf($) >= 0 ? "y" : "x";
      j[$] += R[D] * F;
    });
  }
  return j;
}
function Ou(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ha : c, d = Vt(r), m = d ? l ? ei : ei.filter(function(v) {
    return Vt(v) === d;
  }) : vn, f = m.filter(function(v) {
    return u.indexOf(v) >= 0;
  });
  f.length === 0 && (f = m);
  var b = f.reduce(function(v, g) {
    return v[g] = mn(e, {
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
function Su(e) {
  if (Ue(e) === qr)
    return [];
  var t = Mn(e);
  return [ri(e), t, ri(t)];
}
function Cu(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, u = n.padding, d = n.boundary, m = n.rootBoundary, f = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, g = n.allowedAutoPlacements, h = t.options.placement, E = Ue(h), I = E === h, w = c || (I || !v ? [Mn(h)] : Su(h)), y = [h].concat(w).reduce(function(z, H) {
      return z.concat(Ue(H) === qr ? Ou(t, {
        placement: H,
        boundary: d,
        rootBoundary: m,
        padding: u,
        flipVariations: v,
        allowedAutoPlacements: g
      }) : H);
    }, []), p = t.rects.reference, S = t.rects.popper, N = /* @__PURE__ */ new Map(), B = !0, L = y[0], j = 0; j < y.length; j++) {
      var C = y[j], R = Ue(C), $ = Vt(C) === Bt, F = [Ne, Fe].indexOf(R) >= 0, D = F ? "width" : "height", M = mn(t, {
        placement: C,
        boundary: d,
        rootBoundary: m,
        altBoundary: f,
        padding: u
      }), V = F ? $ ? Ve : Pe : $ ? Fe : Ne;
      p[D] > S[D] && (V = Mn(V));
      var Q = Mn(V), Z = [];
      if (i && Z.push(M[R] <= 0), l && Z.push(M[V] <= 0, M[Q] <= 0), Z.every(function(z) {
        return z;
      })) {
        L = C, B = !1;
        break;
      }
      N.set(C, Z);
    }
    if (B)
      for (var O = v ? 3 : 1, A = function(H) {
        var q = y.find(function(G) {
          var W = N.get(G);
          if (W)
            return W.slice(0, H).every(function(X) {
              return X;
            });
        });
        if (q)
          return L = q, "break";
      }, U = O; U > 0; U--) {
        var K = A(U);
        if (K === "break")
          break;
      }
    t.placement !== L && (t.modifiersData[r]._skip = !0, t.placement = L, t.reset = !0);
  }
}
const Nu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Cu,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ii(e, t, n) {
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
function ai(e) {
  return [Ne, Ve, Fe, Pe].some(function(t) {
    return e[t] >= 0;
  });
}
function Pu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, s = mn(t, {
    elementContext: "reference"
  }), l = mn(t, {
    altBoundary: !0
  }), c = ii(s, r), u = ii(l, o, i), d = ai(c), m = ai(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: d,
    hasPopperEscaped: m
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": m
  });
}
const Ru = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Pu
};
function $u(e, t, n) {
  var r = Ue(e), o = [Pe, Ne].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = i[0], l = i[1];
  return s = s || 0, l = (l || 0) * o, [Pe, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Mu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, s = ha.reduce(function(d, m) {
    return d[m] = $u(m, t.rects, i), d;
  }, {}), l = s[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = s;
}
const Iu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Mu
};
function _u(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ea({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Au = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: _u,
  data: {}
};
function Du(e) {
  return e === "x" ? "y" : "x";
}
function ju(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, u = n.rootBoundary, d = n.altBoundary, m = n.padding, f = n.tether, b = f === void 0 ? !0 : f, v = n.tetherOffset, g = v === void 0 ? 0 : v, h = mn(t, {
    boundary: c,
    rootBoundary: u,
    padding: m,
    altBoundary: d
  }), E = Ue(t.placement), I = Vt(t.placement), w = !I, y = Xr(E), p = Du(y), S = t.modifiersData.popperOffsets, N = t.rects.reference, B = t.rects.popper, L = typeof g == "function" ? g(Object.assign({}, t.rects, {
    placement: t.placement
  })) : g, j = typeof L == "number" ? {
    mainAxis: L,
    altAxis: L
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, L), C = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (S) {
    if (i) {
      var $, F = y === "y" ? Ne : Pe, D = y === "y" ? Fe : Ve, M = y === "y" ? "height" : "width", V = S[y], Q = V + h[F], Z = V - h[D], O = b ? -B[M] / 2 : 0, A = I === Bt ? N[M] : B[M], U = I === Bt ? -B[M] : -N[M], K = t.elements.arrow, z = b && K ? Kr(K) : {
        width: 0,
        height: 0
      }, H = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : va(), q = H[F], G = H[D], W = ln(0, N[M], z[M]), X = w ? N[M] / 2 - O - W - q - j.mainAxis : A - W - q - j.mainAxis, Y = w ? -N[M] / 2 + O + W + G + j.mainAxis : U + W + G + j.mainAxis, ne = t.elements.arrow && yn(t.elements.arrow), _ = ne ? y === "y" ? ne.clientTop || 0 : ne.clientLeft || 0 : 0, J = ($ = C == null ? void 0 : C[y]) != null ? $ : 0, P = V + X - J - _, re = V + Y - J, ve = ln(b ? Fn(Q, P) : Q, V, b ? mt(Z, re) : Z);
      S[y] = ve, R[y] = ve - V;
    }
    if (l) {
      var ke, he = y === "x" ? Ne : Pe, lt = y === "x" ? Fe : Ve, Oe = S[p], Ge = p === "y" ? "height" : "width", Re = Oe + h[he], Ke = Oe - h[lt], ye = [Ne, Pe].indexOf(E) !== -1, xt = (ke = C == null ? void 0 : C[p]) != null ? ke : 0, ct = ye ? Re : Oe - N[Ge] - B[Ge] - xt + j.altAxis, Wt = ye ? Oe + N[Ge] + B[Ge] - xt - j.altAxis : Ke, Tn = b && ye ? su(ct, Oe, Wt) : ln(b ? ct : Re, Oe, b ? Wt : Ke);
      S[p] = Tn, R[p] = Tn - Oe;
    }
    t.modifiersData[r] = R;
  }
}
const Bu = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ju,
  requiresIfExists: ["offset"]
};
function Lu(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Fu(e) {
  return e === Ae(e) || !Be(e) ? Yr(e) : Lu(e);
}
function Vu(e) {
  var t = e.getBoundingClientRect(), n = Lt(t.width) / e.offsetWidth || 1, r = Lt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function zu(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && Vu(t), i = at(t), s = Ft(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((We(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Zr(i)) && (l = Fu(t)), Be(t) ? (c = Ft(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = Jr(i))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Uu(e) {
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
function Hu(e) {
  var t = Uu(e);
  return tu.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Wu(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function qu(e) {
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
var si = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function li() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Gu(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? si : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, si, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, m = [], f = !1, b = {
      state: d,
      setOptions: function(E) {
        var I = typeof E == "function" ? E(d.options) : E;
        g(), d.options = Object.assign({}, i, d.options, I), d.scrollParents = {
          reference: vt(l) ? cn(l) : l.contextElement ? cn(l.contextElement) : [],
          popper: cn(c)
        };
        var w = Hu(qu([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = w.filter(function(y) {
          return y.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!f) {
          var E = d.elements, I = E.reference, w = E.popper;
          if (li(I, w)) {
            d.rects = {
              reference: zu(I, yn(w), d.options.strategy === "fixed"),
              popper: Kr(w)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function(j) {
              return d.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var y = 0; y < d.orderedModifiers.length; y++) {
              if (d.reset === !0) {
                d.reset = !1, y = -1;
                continue;
              }
              var p = d.orderedModifiers[y], S = p.fn, N = p.options, B = N === void 0 ? {} : N, L = p.name;
              typeof S == "function" && (d = S({
                state: d,
                options: B,
                name: L,
                instance: b
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Wu(function() {
        return new Promise(function(h) {
          b.forceUpdate(), h(d);
        });
      }),
      destroy: function() {
        g(), f = !0;
      }
    };
    if (!li(l, c))
      return b;
    b.setOptions(u).then(function(h) {
      !f && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function v() {
      d.orderedModifiers.forEach(function(h) {
        var E = h.name, I = h.options, w = I === void 0 ? {} : I, y = h.effect;
        if (typeof y == "function") {
          var p = y({
            state: d,
            name: E,
            instance: b,
            options: w
          }), S = function() {
          };
          m.push(p || S);
        }
      });
    }
    function g() {
      m.forEach(function(h) {
        return h();
      }), m = [];
    }
    return b;
  };
}
var Ku = [bu, Au, hu, ou, Iu, Nu, Bu, du, Ru], Xu = /* @__PURE__ */ Gu({
  defaultModifiers: Ku
});
const Ta = "Popper";
function Yu(e) {
  return fa(Ta, e);
}
Cc(Ta, ["root"]);
const Ju = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Zu = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Qu(e, t) {
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
function Vn(e) {
  return typeof e == "function" ? e() : e;
}
function Xn(e) {
  return e.nodeType !== void 0;
}
function ed(e) {
  return !Xn(e);
}
const td = () => et({
  root: ["root"]
}, xc(Yu)), nd = {}, rd = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: d,
    popperOptions: m,
    popperRef: f,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = de(t, Ju), E = T.useRef(null), I = Le(E, n), w = T.useRef(null), y = Le(w, f), p = T.useRef(y);
  gt(() => {
    p.current = y;
  }, [y]), T.useImperativeHandle(f, () => w.current, []);
  const S = Qu(d, s), [N, B] = T.useState(S), [L, j] = T.useState(Vn(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && j(Vn(o));
  }, [o]), gt(() => {
    if (!L || !u)
      return;
    const D = (Q) => {
      B(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && L && Xn(L) && L.nodeType === 1) {
      const Q = L.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let M = [{
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
        state: Q
      }) => {
        D(Q);
      }
    }];
    c != null && (M = M.concat(c)), m && m.modifiers != null && (M = M.concat(m.modifiers));
    const V = Xu(L, E.current, k({
      placement: S
    }, m, {
      modifiers: M
    }));
    return p.current(V), () => {
      V.destroy(), p.current(null);
    };
  }, [L, l, c, u, m, S]);
  const C = {
    placement: N
  };
  g !== null && (C.TransitionProps = g);
  const R = td(), $ = (r = v.root) != null ? r : "div", F = bt({
    elementType: $,
    externalSlotProps: b.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: I
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ x($, k({}, F, {
    children: typeof i == "function" ? i(C) : i
  }));
}), ka = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: d,
    placement: m = "bottom",
    popperOptions: f = nd,
    popperRef: b,
    style: v,
    transition: g = !1,
    slotProps: h = {},
    slots: E = {}
  } = t, I = de(t, Zu), [w, y] = T.useState(!0), p = () => {
    y(!1);
  }, S = () => {
    y(!0);
  };
  if (!c && !d && (!g || w))
    return null;
  let N;
  if (i)
    N = i;
  else if (r) {
    const j = Vn(r);
    N = j && Xn(j) ? Ee(j).body : Ee(null).body;
  }
  const B = !d && c && (!g || w) ? "none" : void 0, L = g ? {
    in: d,
    onEnter: p,
    onExited: S
  } : void 0;
  return /* @__PURE__ */ x(pn, {
    disablePortal: l,
    container: N,
    children: /* @__PURE__ */ x(rd, k({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: g ? !w : d,
      placement: m,
      popperOptions: f,
      popperRef: b,
      slotProps: h,
      slots: E
    }, I, {
      style: k({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: B
      }, v),
      TransitionProps: L,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ka.propTypes = {
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
      const t = Vn(e.anchorEl);
      if (t && Xn(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || ed(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: Wr,
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
const od = ["values", "unit", "step"], id = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => k({}, n, {
    [r.key]: r.val
  }), {});
};
function ad(e) {
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
  } = e, o = de(e, od), i = id(t), s = Object.keys(i);
  function l(f) {
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n})`;
  }
  function c(f) {
    return `@media (max-width:${(typeof t[f] == "number" ? t[f] : f) - r / 100}${n})`;
  }
  function u(f, b) {
    const v = s.indexOf(b);
    return `@media (min-width:${typeof t[f] == "number" ? t[f] : f}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : b) - r / 100}${n})`;
  }
  function d(f) {
    return s.indexOf(f) + 1 < s.length ? u(f, s[s.indexOf(f) + 1]) : l(f);
  }
  function m(f) {
    const b = s.indexOf(f);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : u(f, s[s.indexOf(f) + 1]).replace("@media", "@media not all and");
  }
  return k({
    keys: s,
    values: i,
    up: l,
    down: c,
    between: u,
    only: d,
    not: m,
    unit: n
  }, o);
}
const sd = {
  borderRadius: 4
}, ld = sd, cd = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.string, a.object, a.array]) : {}, st = cd;
function un(e, t) {
  return t ? Ye(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Qr = {
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
}, ci = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Qr[e]}px)`
};
function Qe(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || ci;
    return t.reduce((s, l, c) => (s[i.up(i.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || ci;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(i.values || Qr).indexOf(l) !== -1) {
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
function ud(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function dd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Yn(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function zn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Yn(e, n) || r, t && (o = t(o, r, e)), o;
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
    const l = s[t], c = s.theme, u = Yn(c, r) || {};
    return Qe(s, l, (m) => {
      let f = zn(u, o, m);
      return m === f && typeof m == "string" && (f = zn(u, o, `${t}${m === "default" ? "" : He(m)}`, m)), n === !1 ? f : {
        [n]: f
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: st
  } : {}, i.filterProps = [t], i;
}
function pd(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const fd = {
  m: "margin",
  p: "padding"
}, md = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, ui = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, hd = pd((e) => {
  if (e.length > 2)
    if (ui[e])
      e = ui[e];
    else
      return [e];
  const [t, n] = e.split(""), r = fd[t], o = md[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), Jn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Zn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], gd = [...Jn, ...Zn];
function wn(e, t, n, r) {
  var o;
  const i = (o = Yn(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), i * s) : Array.isArray(i) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > i.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${s} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[s]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Oa(e) {
  return wn(e, "spacing", 8, "spacing");
}
function xn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function bd(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = xn(t, n), r), {});
}
function vd(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = hd(n), i = bd(o, r), s = e[n];
  return Qe(e, s, i);
}
function Sa(e, t) {
  const n = Oa(e.theme);
  return Object.keys(e).map((r) => vd(e, t, r, n)).reduce(un, {});
}
function fe(e) {
  return Sa(e, Jn);
}
fe.propTypes = process.env.NODE_ENV !== "production" ? Jn.reduce((e, t) => (e[t] = st, e), {}) : {};
fe.filterProps = Jn;
function me(e) {
  return Sa(e, Zn);
}
me.propTypes = process.env.NODE_ENV !== "production" ? Zn.reduce((e, t) => (e[t] = st, e), {}) : {};
me.filterProps = Zn;
process.env.NODE_ENV !== "production" && gd.reduce((e, t) => (e[t] = st, e), {});
function yd(e = 8) {
  if (e.mui)
    return e;
  const t = Oa({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const s = t(i);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function Qn(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? un(o, t[i](r)) : o, {});
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
const wd = ze("border", je), xd = ze("borderTop", je), Ed = ze("borderRight", je), Td = ze("borderBottom", je), kd = ze("borderLeft", je), Od = ze("borderColor"), Sd = ze("borderTopColor"), Cd = ze("borderRightColor"), Nd = ze("borderBottomColor"), Pd = ze("borderLeftColor"), Rd = ze("outline", je), $d = ze("outlineColor"), er = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = wn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: xn(t, r)
    });
    return Qe(e, e.borderRadius, n);
  }
  return null;
};
er.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: st
} : {};
er.filterProps = ["borderRadius"];
Qn(wd, xd, Ed, Td, kd, Od, Sd, Cd, Nd, Pd, er, Rd, $d);
const tr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = wn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: xn(t, r)
    });
    return Qe(e, e.gap, n);
  }
  return null;
};
tr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: st
} : {};
tr.filterProps = ["gap"];
const nr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = wn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: xn(t, r)
    });
    return Qe(e, e.columnGap, n);
  }
  return null;
};
nr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: st
} : {};
nr.filterProps = ["columnGap"];
const rr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = wn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: xn(t, r)
    });
    return Qe(e, e.rowGap, n);
  }
  return null;
};
rr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: st
} : {};
rr.filterProps = ["rowGap"];
const Md = be({
  prop: "gridColumn"
}), Id = be({
  prop: "gridRow"
}), _d = be({
  prop: "gridAutoFlow"
}), Ad = be({
  prop: "gridAutoColumns"
}), Dd = be({
  prop: "gridAutoRows"
}), jd = be({
  prop: "gridTemplateColumns"
}), Bd = be({
  prop: "gridTemplateRows"
}), Ld = be({
  prop: "gridTemplateAreas"
}), Fd = be({
  prop: "gridArea"
});
Qn(tr, nr, rr, Md, Id, _d, Ad, Dd, jd, Bd, Ld, Fd);
function At(e, t) {
  return t === "grey" ? t : e;
}
const Vd = be({
  prop: "color",
  themeKey: "palette",
  transform: At
}), zd = be({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: At
}), Ud = be({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: At
});
Qn(Vd, zd, Ud);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Hd = be({
  prop: "width",
  transform: Ie
}), eo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Qr[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Ie(n)
      };
    };
    return Qe(e, e.maxWidth, t);
  }
  return null;
};
eo.filterProps = ["maxWidth"];
const Wd = be({
  prop: "minWidth",
  transform: Ie
}), qd = be({
  prop: "height",
  transform: Ie
}), Gd = be({
  prop: "maxHeight",
  transform: Ie
}), Kd = be({
  prop: "minHeight",
  transform: Ie
});
be({
  prop: "size",
  cssProperty: "width",
  transform: Ie
});
be({
  prop: "size",
  cssProperty: "height",
  transform: Ie
});
const Xd = be({
  prop: "boxSizing"
});
Qn(Hd, eo, Wd, qd, Gd, Kd, Xd);
const Yd = {
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
    style: er
  },
  // palette
  color: {
    themeKey: "palette",
    transform: At
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: At
  },
  backgroundColor: {
    themeKey: "palette",
    transform: At
  },
  // spacing
  p: {
    style: me
  },
  pt: {
    style: me
  },
  pr: {
    style: me
  },
  pb: {
    style: me
  },
  pl: {
    style: me
  },
  px: {
    style: me
  },
  py: {
    style: me
  },
  padding: {
    style: me
  },
  paddingTop: {
    style: me
  },
  paddingRight: {
    style: me
  },
  paddingBottom: {
    style: me
  },
  paddingLeft: {
    style: me
  },
  paddingX: {
    style: me
  },
  paddingY: {
    style: me
  },
  paddingInline: {
    style: me
  },
  paddingInlineStart: {
    style: me
  },
  paddingInlineEnd: {
    style: me
  },
  paddingBlock: {
    style: me
  },
  paddingBlockStart: {
    style: me
  },
  paddingBlockEnd: {
    style: me
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
    style: tr
  },
  rowGap: {
    style: rr
  },
  columnGap: {
    style: nr
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
    transform: Ie
  },
  maxWidth: {
    style: eo
  },
  minWidth: {
    transform: Ie
  },
  height: {
    transform: Ie
  },
  maxHeight: {
    transform: Ie
  },
  minHeight: {
    transform: Ie
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
}, to = Yd;
function Jd(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Zd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Qd() {
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
      style: m
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const f = Yn(o, u) || {};
    return m ? m(s) : Qe(s, r, (v) => {
      let g = zn(f, d, v);
      return v === g && typeof v == "string" && (g = zn(f, d, `${n}${v === "default" ? "" : He(v)}`, v)), c === !1 ? g : {
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
    const s = (r = i.unstable_sxConfig) != null ? r : to;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const d = ud(i.breakpoints), m = Object.keys(d);
      let f = d;
      return Object.keys(u).forEach((b) => {
        const v = Zd(u[b], i);
        if (v != null)
          if (typeof v == "object")
            if (s[b])
              f = un(f, e(b, v, i, s));
            else {
              const g = Qe({
                theme: i
              }, v, (h) => ({
                [b]: h
              }));
              Jd(g, v) ? f[b] = t({
                sx: v,
                theme: i
              }) : f = un(f, g);
            }
          else
            f = un(f, e(b, v, i, s));
      }), dd(m, f);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ca = Qd();
Ca.filterProps = ["sx"];
const no = Ca;
function ep(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const tp = ["breakpoints", "palette", "spacing", "shape"];
function ro(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, s = de(e, tp), l = ad(n), c = yd(o);
  let u = Ye({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: k({
      mode: "light"
    }, r),
    spacing: c,
    shape: k({}, ld, i)
  }, s);
  return u.applyStyles = ep, u = t.reduce((d, m) => Ye(d, m), u), u.unstable_sxConfig = k({}, to, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(m) {
    return no({
      sx: m,
      theme: this
    });
  }, u;
}
function np(e) {
  return Object.keys(e).length === 0;
}
function Na(e = null) {
  const t = T.useContext(Us);
  return !t || np(t) ? e : t;
}
const rp = ro();
function Pa(e = rp) {
  return Na(e);
}
const op = ["ownerState"], ip = ["variants"], ap = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function sp(e) {
  return Object.keys(e).length === 0;
}
function lp(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function In(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const cp = ro(), di = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Pn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return sp(t) ? e : t[n] || t;
}
function up(e) {
  return e ? (t, n) => n[e] : null;
}
function _n(e, t) {
  let {
    ownerState: n
  } = t, r = de(t, op);
  const o = typeof e == "function" ? e(k({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => _n(i, k({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = de(o, ip);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(k({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(k({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function dp(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = cp,
    rootShouldForwardProp: r = In,
    slotShouldForwardProp: o = In
  } = e, i = (s) => no(k({}, s, {
    theme: Pn(k({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (s, l = {}) => {
    Hs(s, (p) => p.filter((S) => !(S != null && S.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: d,
      skipSx: m,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: f = up(di(u))
    } = l, b = de(l, ap), v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), g = m || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${di(u || "Root")}`);
    let E = In;
    u === "Root" || u === "root" ? E = r : u ? E = o : lp(s) && (E = void 0);
    const I = zs(s, k({
      shouldForwardProp: E,
      label: h
    }, b)), w = (p) => typeof p == "function" && p.__emotion_real !== p || pt(p) ? (S) => _n(p, k({}, S, {
      theme: Pn({
        theme: S.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : p, y = (p, ...S) => {
      let N = w(p);
      const B = S ? S.map(w) : [];
      c && f && B.push((C) => {
        const R = Pn(k({}, C, {
          defaultTheme: n,
          themeId: t
        }));
        if (!R.components || !R.components[c] || !R.components[c].styleOverrides)
          return null;
        const $ = R.components[c].styleOverrides, F = {};
        return Object.entries($).forEach(([D, M]) => {
          F[D] = _n(M, k({}, C, {
            theme: R
          }));
        }), f(C, F);
      }), c && !v && B.push((C) => {
        var R;
        const $ = Pn(k({}, C, {
          defaultTheme: n,
          themeId: t
        })), F = $ == null || (R = $.components) == null || (R = R[c]) == null ? void 0 : R.variants;
        return _n({
          variants: F
        }, k({}, C, {
          theme: $
        }));
      }), g || B.push(i);
      const L = B.length - S.length;
      if (Array.isArray(p) && L > 0) {
        const C = new Array(L).fill("");
        N = [...p, ...C], N.raw = [...p.raw, ...C];
      }
      const j = I(N, ...B);
      if (process.env.NODE_ENV !== "production") {
        let C;
        c && (C = `${c}${He(u || "")}`), C === void 0 && (C = `Styled(${Xl(s)})`), j.displayName = C;
      }
      return s.muiName && (j.muiName = s.muiName), j;
    };
    return I.withConfig && (y.withConfig = I.withConfig), y;
  };
}
function pp(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : sa(t.components[n].defaultProps, r);
}
function fp({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Pa(n);
  return r && (o = o[r] || o), pp({
    theme: o,
    name: t,
    props: e
  });
}
function oo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), vc(e, t, n);
}
function mp(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function yt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return yt(mp(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Dt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Dt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function or(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function hp(e) {
  e = yt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), s = (u, d = (u + n / 30) % 12) => o - i * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), or({
    type: l,
    values: c
  });
}
function pi(e) {
  e = yt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? yt(hp(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function fi(e, t) {
  const n = pi(e), r = pi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Un(e, t) {
  return e = yt(e), t = oo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, or(e);
}
function gp(e, t) {
  if (e = yt(e), t = oo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return or(e);
}
function bp(e, t) {
  if (e = yt(e), t = oo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return or(e);
}
function vp(e, t) {
  return k({
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
const yp = {
  black: "#000",
  white: "#fff"
}, hn = yp, wp = {
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
}, xp = wp, Ep = {
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
}, kt = Ep, Tp = {
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
}, Ot = Tp, kp = {
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
}, Qt = kp, Op = {
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
}, St = Op, Sp = {
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
}, Ct = Sp, Cp = {
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
}, Nt = Cp, Np = ["mode", "contrastThreshold", "tonalOffset"], mi = {
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
    paper: hn.white,
    default: hn.white
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
}, wr = {
  text: {
    primary: hn.white,
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
    active: hn.white,
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
function hi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = bp(e.main, o) : t === "dark" && (e.dark = gp(e.main, i)));
}
function Pp(e = "light") {
  return e === "dark" ? {
    main: St[200],
    light: St[50],
    dark: St[400]
  } : {
    main: St[700],
    light: St[400],
    dark: St[800]
  };
}
function Rp(e = "light") {
  return e === "dark" ? {
    main: kt[200],
    light: kt[50],
    dark: kt[400]
  } : {
    main: kt[500],
    light: kt[300],
    dark: kt[700]
  };
}
function $p(e = "light") {
  return e === "dark" ? {
    main: Ot[500],
    light: Ot[300],
    dark: Ot[700]
  } : {
    main: Ot[700],
    light: Ot[400],
    dark: Ot[800]
  };
}
function Mp(e = "light") {
  return e === "dark" ? {
    main: Ct[400],
    light: Ct[300],
    dark: Ct[700]
  } : {
    main: Ct[700],
    light: Ct[500],
    dark: Ct[900]
  };
}
function Ip(e = "light") {
  return e === "dark" ? {
    main: Nt[400],
    light: Nt[300],
    dark: Nt[700]
  } : {
    main: Nt[800],
    light: Nt[500],
    dark: Nt[900]
  };
}
function _p(e = "light") {
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
function Ap(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = de(e, Np), i = e.primary || Pp(t), s = e.secondary || Rp(t), l = e.error || $p(t), c = e.info || Mp(t), u = e.success || Ip(t), d = e.warning || _p(t);
  function m(g) {
    const h = fi(g, wr.text.primary) >= n ? wr.text.primary : mi.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = fi(g, h);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const f = ({
    color: g,
    name: h,
    mainShade: E = 500,
    lightShade: I = 300,
    darkShade: w = 700
  }) => {
    if (g = k({}, g), !g.main && g[E] && (g.main = g[E]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : Dt(11, h ? ` (${h})` : "", E));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Dt(12, h ? ` (${h})` : "", JSON.stringify(g.main)));
    return hi(g, "light", I, r), hi(g, "dark", w, r), g.contrastText || (g.contrastText = m(g.main)), g;
  }, b = {
    dark: wr,
    light: mi
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ye(k({
    // A collection of common colors.
    common: k({}, hn),
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
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: f({
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: f({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: f({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: xp,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: m,
    // Generate a rich color object.
    augmentColor: f,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const Dp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function jp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const gi = {
  textTransform: "uppercase"
}, bi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Bp(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = bi,
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
    pxToRem: m
  } = n, f = de(n, Dp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = m || ((E) => `${E / u * b}rem`), g = (E, I, w, y, p) => k({
    fontFamily: r,
    fontWeight: E,
    fontSize: v(I),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === bi ? {
    letterSpacing: `${jp(y / I)}em`
  } : {}, p, d), h = {
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
    button: g(l, 14, 1.75, 0.4, gi),
    caption: g(s, 12, 1.66, 0.4),
    overline: g(s, 12, 2.66, 1, gi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ye(k({
    htmlFontSize: u,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), f, {
    clone: !1
    // No need to clone deep
  });
}
const Lp = 0.2, Fp = 0.14, Vp = 0.12;
function pe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Lp})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Fp})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Vp})`].join(",");
}
const zp = ["none", pe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), pe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), pe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), pe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), pe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), pe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), pe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), pe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), pe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), pe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), pe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), pe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), pe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), pe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), pe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), pe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), pe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), pe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), pe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), pe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), pe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), pe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), pe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), pe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Up = zp, Hp = ["duration", "easing", "delay"], Wp = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, qp = {
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
function vi(e) {
  return `${Math.round(e)}ms`;
}
function Gp(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Kp(e) {
  const t = k({}, Wp, e.easing), n = k({}, qp, e.duration);
  return k({
    getAutoHeightDuration: Gp,
    create: (o = ["all"], i = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = de(i, Hp);
      if (process.env.NODE_ENV !== "production") {
        const d = (f) => typeof f == "string", m = (f) => !isNaN(parseFloat(f));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !m(s) && !d(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !m(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof s == "string" ? s : vi(s)} ${l} ${typeof c == "string" ? c : vi(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const Xp = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Yp = Xp, Jp = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Zp(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, s = de(e, Jp);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Dt(18));
  const l = Ap(r), c = ro(e);
  let u = Ye(c, {
    mixins: vp(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Up.slice(),
    typography: Bp(l, i),
    transitions: Kp(o),
    zIndex: k({}, Yp)
  });
  if (u = Ye(u, s), u = t.reduce((d, m) => Ye(d, m), u), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (f, b) => {
      let v;
      for (v in f) {
        const g = f[v];
        if (d.indexOf(v) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = qe("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(f, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          f[v] = {};
        }
      }
    };
    Object.keys(u.components).forEach((f) => {
      const b = u.components[f].styleOverrides;
      b && f.indexOf("Mui") === 0 && m(b, f);
    });
  }
  return u.unstable_sxConfig = k({}, to, s == null ? void 0 : s.unstable_sxConfig), u.unstable_sx = function(m) {
    return no({
      sx: m,
      theme: this
    });
  }, u;
}
const Qp = Zp(), io = Qp, ao = "$$material", Ra = (e) => In(e) && e !== "classes", ef = dp({
  themeId: ao,
  defaultTheme: io,
  rootShouldForwardProp: Ra
}), Te = ef;
function En() {
  const e = Pa(io);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[ao] || e;
}
function tt({
  props: e,
  name: t
}) {
  return fp({
    props: e,
    name: t,
    defaultTheme: io,
    themeId: ao
  });
}
function Ar(e, t) {
  return Ar = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Ar(e, t);
}
function tf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Ar(e, t);
}
const yi = {
  disabled: !1
};
var nf = process.env.NODE_ENV !== "production" ? a.oneOfType([a.number, a.shape({
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
const $a = It.createContext(null);
var rf = function(t) {
  return t.scrollTop;
}, on = "unmounted", ut = "exited", dt = "entering", Mt = "entered", Dr = "exiting", nt = /* @__PURE__ */ function(e) {
  tf(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = ut, i.appearStatus = dt) : c = Mt : r.unmountOnExit || r.mountOnEnter ? c = on : c = ut, i.state = {
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
      this.props.in ? s !== dt && s !== Mt && (i = dt) : (s === dt || s === Mt) && (i = Dr);
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
          var s = this.props.nodeRef ? this.props.nodeRef.current : Sn.findDOMNode(this);
          s && rf(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ut && this.setState({
        status: on
      });
  }, n.performEnter = function(o) {
    var i = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Sn.findDOMNode(this), l], u = c[0], d = c[1], m = this.getTimeouts(), f = l ? m.appear : m.enter;
    if (!o && !s || yi.disabled) {
      this.safeSetState({
        status: Mt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, d), this.safeSetState({
      status: dt
    }, function() {
      i.props.onEntering(u, d), i.onTransitionEnd(f, function() {
        i.safeSetState({
          status: Mt
        }, function() {
          i.props.onEntered(u, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Sn.findDOMNode(this);
    if (!i || yi.disabled) {
      this.safeSetState({
        status: ut
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Dr
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Sn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
      /* @__PURE__ */ It.createElement($a.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : It.cloneElement(It.Children.only(s), l))
    );
  }, t;
}(It.Component);
nt.contextType = $a;
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
    var n = nf;
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
function Pt() {
}
nt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Pt,
  onEntering: Pt,
  onEntered: Pt,
  onExit: Pt,
  onExiting: Pt,
  onExited: Pt
};
nt.UNMOUNTED = on;
nt.EXITED = ut;
nt.ENTERING = dt;
nt.ENTERED = Mt;
nt.EXITING = Dr;
const Ma = nt, Ia = (e) => e.scrollTop;
function Hn(e, t) {
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
const of = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function jr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const af = {
  entering: {
    opacity: 1,
    transform: jr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, xr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), so = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: d,
    onExit: m,
    onExited: f,
    onExiting: b,
    style: v,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = Ma
  } = t, E = de(t, of), I = nn(), w = T.useRef(), y = En(), p = T.useRef(null), S = Le(p, i.ref, n), N = (D) => (M) => {
    if (D) {
      const V = p.current;
      M === void 0 ? D(V) : D(V, M);
    }
  }, B = N(d), L = N((D, M) => {
    Ia(D);
    const {
      duration: V,
      delay: Q,
      easing: Z
    } = Hn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "enter"
    });
    let O;
    g === "auto" ? (O = y.transitions.getAutoHeightDuration(D.clientHeight), w.current = O) : O = V, D.style.transition = [y.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), y.transitions.create("transform", {
      duration: xr ? O : O * 0.666,
      delay: Q,
      easing: Z
    })].join(","), c && c(D, M);
  }), j = N(u), C = N(b), R = N((D) => {
    const {
      duration: M,
      delay: V,
      easing: Q
    } = Hn({
      style: v,
      timeout: g,
      easing: s
    }, {
      mode: "exit"
    });
    let Z;
    g === "auto" ? (Z = y.transitions.getAutoHeightDuration(D.clientHeight), w.current = Z) : Z = M, D.style.transition = [y.transitions.create("opacity", {
      duration: Z,
      delay: V
    }), y.transitions.create("transform", {
      duration: xr ? Z : Z * 0.666,
      delay: xr ? V : V || Z * 0.333,
      easing: Q
    })].join(","), D.style.opacity = 0, D.style.transform = jr(0.75), m && m(D);
  }), $ = N(f);
  return /* @__PURE__ */ x(h, k({
    appear: o,
    in: l,
    nodeRef: p,
    onEnter: L,
    onEntered: j,
    onEntering: B,
    onExit: R,
    onExited: $,
    onExiting: C,
    addEndListener: (D) => {
      g === "auto" && I.start(w.current || 0, D), r && r(p.current, D);
    },
    timeout: g === "auto" ? null : g
  }, E, {
    children: (D, M) => /* @__PURE__ */ T.cloneElement(i, k({
      style: k({
        opacity: 0,
        transform: jr(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, af[D], v, i.props.style),
      ref: S
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (so.propTypes = {
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
  children: gn.isRequired,
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
so.muiSupportAuto = !0;
const Br = so, sf = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, wi = sf, lf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], cf = Te(ka, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), _a = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = Na(), i = tt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: u,
    container: d,
    disablePortal: m,
    keepMounted: f,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: h,
    popperRef: E,
    transition: I,
    slots: w,
    slotProps: y
  } = i, p = de(i, lf), S = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, N = k({
    anchorEl: s,
    container: d,
    disablePortal: m,
    keepMounted: f,
    modifiers: b,
    open: v,
    placement: g,
    popperOptions: h,
    popperRef: E,
    transition: I
  }, p);
  return /* @__PURE__ */ x(cf, k({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: S
    },
    slotProps: y ?? u
  }, N, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (_a.propTypes = {
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
  popperRef: Wr,
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
const Aa = _a;
function uf(e) {
  return qe("MuiTooltip", e);
}
const df = it("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ot = df, pf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function ff(e) {
  return Math.round(e * 1e5) / 1e5;
}
const mf = (e) => {
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
  return et(s, uf, t);
}, hf = Te(Aa, {
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
}) => k({
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
  [`&[data-popper-placement*="right"] .${ot.arrow}`]: k({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ot.arrow}`]: k({}, t.isRtl ? {
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
})), gf = Te("div", {
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
}) => k({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Un(e.palette.grey[700], 0.92),
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
  lineHeight: `${ff(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ot.popper}[data-popper-placement*="left"] &`]: k({
    transformOrigin: "right center"
  }, t.isRtl ? k({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : k({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${ot.popper}[data-popper-placement*="right"] &`]: k({
    transformOrigin: "left center"
  }, t.isRtl ? k({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : k({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${ot.popper}[data-popper-placement*="top"] &`]: k({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ot.popper}[data-popper-placement*="bottom"] &`]: k({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), bf = Te("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Un(e.palette.grey[700], 0.9),
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
let Rn = !1;
const xi = new bn();
let en = {
  x: 0,
  y: 0
};
function $n(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Da = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, s, l, c, u, d, m, f, b, v, g, h, E, I, w, y, p;
  const S = tt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: N = !1,
    children: B,
    components: L = {},
    componentsProps: j = {},
    describeChild: C = !1,
    disableFocusListener: R = !1,
    disableHoverListener: $ = !1,
    disableInteractive: F = !1,
    disableTouchListener: D = !1,
    enterDelay: M = 100,
    enterNextDelay: V = 0,
    enterTouchDelay: Q = 700,
    followCursor: Z = !1,
    id: O,
    leaveDelay: A = 0,
    leaveTouchDelay: U = 1500,
    onClose: K,
    onOpen: z,
    open: H,
    placement: q = "bottom",
    PopperComponent: G,
    PopperProps: W = {},
    slotProps: X = {},
    slots: Y = {},
    title: ne,
    TransitionComponent: _ = Br,
    TransitionProps: J
  } = S, P = de(S, pf), re = /* @__PURE__ */ T.isValidElement(B) ? B : /* @__PURE__ */ x("span", {
    children: B
  }), ve = En(), ke = ve.direction === "rtl", [he, lt] = T.useState(), [Oe, Ge] = T.useState(null), Re = T.useRef(!1), Ke = F || Z, ye = nn(), xt = nn(), ct = nn(), Wt = nn(), [Tn, po] = ta({
    controlled: H,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Xe = Tn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = T.useRef(H !== void 0);
    T.useEffect(() => {
      he && he.disabled && !ee && ne !== "" && he.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ne, he, ee]);
  }
  const ir = ea(O), qt = T.useRef(), kn = dn(() => {
    qt.current !== void 0 && (document.body.style.WebkitUserSelect = qt.current, qt.current = void 0), Wt.clear();
  });
  T.useEffect(() => kn, [kn]);
  const fo = (ee) => {
    xi.clear(), Rn = !0, po(!0), z && !Xe && z(ee);
  }, On = dn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      xi.start(800 + A, () => {
        Rn = !1;
      }), po(!1), K && Xe && K(ee), ye.start(ve.transitions.duration.shortest, () => {
        Re.current = !1;
      });
    }
  ), ar = (ee) => {
    Re.current && ee.type !== "touchstart" || (he && he.removeAttribute("title"), xt.clear(), ct.clear(), M || Rn && V ? xt.start(Rn ? V : M, () => {
      fo(ee);
    }) : fo(ee));
  }, mo = (ee) => {
    xt.clear(), ct.start(A, () => {
      On(ee);
    });
  }, {
    isFocusVisibleRef: ho,
    onBlur: es,
    onFocus: ts,
    ref: ns
  } = na(), [, go] = T.useState(!1), bo = (ee) => {
    es(ee), ho.current === !1 && (go(!1), mo(ee));
  }, vo = (ee) => {
    he || lt(ee.currentTarget), ts(ee), ho.current === !0 && (go(!0), ar(ee));
  }, yo = (ee) => {
    Re.current = !0;
    const $e = re.props;
    $e.onTouchStart && $e.onTouchStart(ee);
  }, wo = ar, xo = mo, rs = (ee) => {
    yo(ee), ct.clear(), ye.clear(), kn(), qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Wt.start(Q, () => {
      document.body.style.WebkitUserSelect = qt.current, ar(ee);
    });
  }, os = (ee) => {
    re.props.onTouchEnd && re.props.onTouchEnd(ee), kn(), ct.start(U, () => {
      On(ee);
    });
  };
  T.useEffect(() => {
    if (!Xe)
      return;
    function ee($e) {
      ($e.key === "Escape" || $e.key === "Esc") && On($e);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [On, Xe]);
  const is = Le(re.ref, ns, lt, n);
  !ne && ne !== 0 && (Xe = !1);
  const sr = T.useRef(), as = (ee) => {
    const $e = re.props;
    $e.onMouseMove && $e.onMouseMove(ee), en = {
      x: ee.clientX,
      y: ee.clientY
    }, sr.current && sr.current.update();
  }, Gt = {}, lr = typeof ne == "string";
  C ? (Gt.title = !Xe && lr && !$ ? ne : null, Gt["aria-describedby"] = Xe ? ir : null) : (Gt["aria-label"] = lr ? ne : null, Gt["aria-labelledby"] = Xe && !lr ? ir : null);
  const De = k({}, Gt, P, re.props, {
    className: xe(P.className, re.props.className),
    onTouchStart: yo,
    ref: is
  }, Z ? {
    onMouseMove: as
  } : {});
  process.env.NODE_ENV !== "production" && (De["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    he && !he.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [he]));
  const Kt = {};
  D || (De.onTouchStart = rs, De.onTouchEnd = os), $ || (De.onMouseOver = $n(wo, De.onMouseOver), De.onMouseLeave = $n(xo, De.onMouseLeave), Ke || (Kt.onMouseOver = wo, Kt.onMouseLeave = xo)), R || (De.onFocus = $n(vo, De.onFocus), De.onBlur = $n(bo, De.onBlur), Ke || (Kt.onFocus = vo, Kt.onBlur = bo)), process.env.NODE_ENV !== "production" && re.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${re.props.title}\` or the Tooltip component.`].join(`
`));
  const ss = T.useMemo(() => {
    var ee;
    let $e = [{
      name: "arrow",
      enabled: !!Oe,
      options: {
        element: Oe,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && ($e = $e.concat(W.popperOptions.modifiers)), k({}, W.popperOptions, {
      modifiers: $e
    });
  }, [Oe, W]), Xt = k({}, S, {
    isRtl: ke,
    arrow: N,
    disableInteractive: Ke,
    placement: q,
    PopperComponentProp: G,
    touch: Re.current
  }), cr = mf(Xt), Eo = (r = (o = Y.popper) != null ? o : L.Popper) != null ? r : hf, To = (i = (s = (l = Y.transition) != null ? l : L.Transition) != null ? s : _) != null ? i : Br, ko = (c = (u = Y.tooltip) != null ? u : L.Tooltip) != null ? c : gf, Oo = (d = (m = Y.arrow) != null ? m : L.Arrow) != null ? d : bf, ls = rn(Eo, k({}, W, (f = X.popper) != null ? f : j.popper, {
    className: xe(cr.popper, W == null ? void 0 : W.className, (b = (v = X.popper) != null ? v : j.popper) == null ? void 0 : b.className)
  }), Xt), cs = rn(To, k({}, J, (g = X.transition) != null ? g : j.transition), Xt), us = rn(ko, k({}, (h = X.tooltip) != null ? h : j.tooltip, {
    className: xe(cr.tooltip, (E = (I = X.tooltip) != null ? I : j.tooltip) == null ? void 0 : E.className)
  }), Xt), ds = rn(Oo, k({}, (w = X.arrow) != null ? w : j.arrow, {
    className: xe(cr.arrow, (y = (p = X.arrow) != null ? p : j.arrow) == null ? void 0 : y.className)
  }), Xt);
  return /* @__PURE__ */ ue(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(re, De), /* @__PURE__ */ x(Eo, k({
      as: G ?? Aa,
      placement: q,
      anchorEl: Z ? {
        getBoundingClientRect: () => ({
          top: en.y,
          left: en.x,
          right: en.x,
          bottom: en.y,
          width: 0,
          height: 0
        })
      } : he,
      popperRef: sr,
      open: he ? Xe : !1,
      id: ir,
      transition: !0
    }, Kt, ls, {
      popperOptions: ss,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ x(To, k({
        timeout: ve.transitions.duration.shorter
      }, ee, cs, {
        children: /* @__PURE__ */ ue(ko, k({}, us, {
          children: [ne, N ? /* @__PURE__ */ x(Oo, k({}, ds, {
            ref: Ge
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Da.propTypes = {
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
  children: gn.isRequired,
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
const vf = Da;
var lo = {}, ja = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ja);
var yf = ja.exports, Er = {};
function wf(e) {
  return qe("MuiSvgIcon", e);
}
it("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const xf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ef = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${He(t)}`, `fontSize${He(n)}`]
  };
  return et(o, wf, r);
}, Tf = Te("svg", {
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
  var n, r, o, i, s, l, c, u, d, m, f, b, v;
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
    color: (m = (f = (e.vars || e).palette) == null || (f = f[t.color]) == null ? void 0 : f.main) != null ? m : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), co = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    titleAccess: m,
    viewBox: f = "0 0 24 24"
  } = r, b = de(r, xf), v = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", g = k({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: d,
    viewBox: f,
    hasSvgAsChild: v
  }), h = {};
  d || (h.viewBox = f);
  const E = Ef(g);
  return /* @__PURE__ */ ue(Tf, k({
    as: l,
    className: xe(E.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": m ? void 0 : !0,
    role: m ? "img" : void 0,
    ref: n
  }, h, b, v && o.props, {
    ownerState: g,
    children: [v ? o.props.children : o, m ? /* @__PURE__ */ x("title", {
      children: m
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (co.propTypes = {
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
co.muiName = "SvgIcon";
const Ei = co;
function Ba(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ x(Ei, k({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ei.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const kf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), la.configure(e);
  }
}, Of = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: He,
  createChainedFunction: Rr,
  createSvgIcon: Ba,
  debounce: Qi,
  deprecatedPropType: Jl,
  isMuiElement: Zl,
  ownerDocument: Ee,
  ownerWindow: jt,
  requirePropFactory: Ql,
  setRef: Bn,
  unstable_ClassNameGenerator: kf,
  unstable_useEnhancedEffect: gt,
  unstable_useId: ea,
  unsupportedProp: nc,
  useControlled: ta,
  useEventCallback: dn,
  useForkRef: Le,
  useIsFocusVisible: na
}, Symbol.toStringTag, { value: "Module" })), Sf = /* @__PURE__ */ Rl(Of);
var Ti;
function Cf() {
  return Ti || (Ti = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Sf;
  }(Er)), Er;
}
var Nf = yf;
Object.defineProperty(lo, "__esModule", {
  value: !0
});
var La = lo.default = void 0, Pf = Nf(Cf()), Rf = ms;
La = lo.default = (0, Pf.default)(/* @__PURE__ */ (0, Rf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ki(e, t, n) {
  return e ? /* @__PURE__ */ x(Ii, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ x("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Fa(e) {
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
    isSubMenuParent: m = !1,
    hasDisabledGutters: f = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: g,
    children: h
  } = e, E = /* @__PURE__ */ x(
    $s,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: d,
      disableGutters: f,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: g,
      children: n ? /* @__PURE__ */ ue(qn, { children: [
        ki(i, n, !0),
        /* @__PURE__ */ x(Ms, { primary: n, inset: !i && o }),
        m ? /* @__PURE__ */ x(Ii, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ x(La, {}) }) : ki(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ x(vf, { title: r, placement: "right", children: /* @__PURE__ */ x("div", { children: E }) }) : E;
}
function Va(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function $f(e) {
  const [t, n] = we(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, s = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Va(i).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ x(uo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ ue(qn, { children: [
    /* @__PURE__ */ x(Fa, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ x(
      Is,
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
const Mf = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function uo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: s } = wt(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Va(t).filter((v) => !("menuItem" in v.group))
    ), m = Object.values(d).sort(
      (v, g) => (v.group.order || 0) - (g.group.order || 0)
    ), f = [];
    m.forEach((v) => {
      Mf(v.id, t.items).forEach(
        (g) => f.push({ item: g, isLastItemInGroup: !1 })
      ), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !0);
    }), f.length > 0 && (f[f.length - 1].isLastItemInGroup = !1);
    const b = f.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: f, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: d, isLastItemInGroup: m }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: m,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ x("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ x("div", { role: "menu", "aria-label": u, children: i.map((d, m) => {
    const { item: f } = d, b = l(d);
    if ("command" in f) {
      const v = f.group + m;
      return /* @__PURE__ */ x(
        Fa,
        {
          onClick: (g) => {
            n == null || n(g), r(f);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ x(
      $f,
      {
        parentMenuItem: f,
        parentItemProps: b,
        ...e
      },
      u + f.id
    );
  }) }, u);
}
function If(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ x(uo, { ...e, includedGroups: i });
}
function _f({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ ue(
    _i,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ x("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ x(_s, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ x(
          If,
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
function Af({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = wt(() => {
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
    _i,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((s, l) => /* @__PURE__ */ x(
        _f,
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
const za = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (za.displayName = "ListContext");
const Df = za;
function jf(e) {
  return qe("MuiList", e);
}
it("MuiList", ["root", "padding", "dense", "subheader"]);
const Bf = ["children", "className", "component", "dense", "disablePadding", "subheader"], Lf = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return et({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, jf, t);
}, Ff = Te("ul", {
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
}) => k({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Ua = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
  } = r, d = de(r, Bf), m = T.useMemo(() => ({
    dense: l
  }), [l]), f = k({}, r, {
    component: s,
    dense: l,
    disablePadding: c
  }), b = Lf(f);
  return /* @__PURE__ */ x(Df.Provider, {
    value: m,
    children: /* @__PURE__ */ ue(Ff, k({
      as: s,
      className: xe(b.root, i),
      ref: n,
      ownerState: f
    }, d, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ua.propTypes = {
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
const Vf = Ua, zf = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Tr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function Oi(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ha(e, t) {
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
    if (!l.hasAttribute("tabindex") || !Ha(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Wa = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    variant: m = "selectedMenu"
  } = t, f = de(t, zf), b = T.useRef(null), v = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  gt(() => {
    o && b.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, y) => {
      const p = !b.current.style.width;
      if (w.clientHeight < b.current.clientHeight && p) {
        const S = `${ra(Ee(w))}px`;
        b.current.style[y.direction === "rtl" ? "paddingLeft" : "paddingRight"] = S, b.current.style.width = `calc(100% + ${S})`;
      }
      return b.current;
    }
  }), []);
  const g = (w) => {
    const y = b.current, p = w.key, S = Ee(y).activeElement;
    if (p === "ArrowDown")
      w.preventDefault(), tn(y, S, u, c, Tr);
    else if (p === "ArrowUp")
      w.preventDefault(), tn(y, S, u, c, Oi);
    else if (p === "Home")
      w.preventDefault(), tn(y, null, u, c, Tr);
    else if (p === "End")
      w.preventDefault(), tn(y, null, u, c, Oi);
    else if (p.length === 1) {
      const N = v.current, B = p.toLowerCase(), L = performance.now();
      N.keys.length > 0 && (L - N.lastTime > 500 ? (N.keys = [], N.repeating = !0, N.previousKeyMatched = !0) : N.repeating && B !== N.keys[0] && (N.repeating = !1)), N.lastTime = L, N.keys.push(B);
      const j = S && !N.repeating && Ha(S, N);
      N.previousKeyMatched && (j || tn(y, S, !1, c, Tr, N)) ? w.preventDefault() : N.previousKeyMatched = !1;
    }
    d && d(w);
  }, h = Le(b, n);
  let E = -1;
  T.Children.forEach(s, (w, y) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      E === y && (E += 1, E >= s.length && (E = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && jn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (m === "selectedMenu" && w.props.selected || E === -1) && (E = y), E === y && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (E += 1, E >= s.length && (E = -1));
  });
  const I = T.Children.map(s, (w, y) => {
    if (y === E) {
      const p = {};
      return i && (p.autoFocus = !0), w.props.tabIndex === void 0 && m === "selectedMenu" && (p.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, p);
    }
    return w;
  });
  return /* @__PURE__ */ x(Vf, k({
    role: "menu",
    ref: h,
    className: l,
    onKeyDown: g,
    tabIndex: o ? 0 : -1
  }, f, {
    children: I
  }));
});
process.env.NODE_ENV !== "production" && (Wa.propTypes = {
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
const Uf = Wa, Hf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Wf = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, qa = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = En(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: s = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: d,
    onEntered: m,
    onEntering: f,
    onExit: b,
    onExited: v,
    onExiting: g,
    style: h,
    timeout: E = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: I = Ma
  } = t, w = de(t, Hf), y = T.useRef(null), p = Le(y, l.ref, n), S = (F) => (D) => {
    if (F) {
      const M = y.current;
      D === void 0 ? F(M) : F(M, D);
    }
  }, N = S(f), B = S((F, D) => {
    Ia(F);
    const M = Hn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "enter"
    });
    F.style.webkitTransition = r.transitions.create("opacity", M), F.style.transition = r.transitions.create("opacity", M), d && d(F, D);
  }), L = S(m), j = S(g), C = S((F) => {
    const D = Hn({
      style: h,
      timeout: E,
      easing: c
    }, {
      mode: "exit"
    });
    F.style.webkitTransition = r.transitions.create("opacity", D), F.style.transition = r.transitions.create("opacity", D), b && b(F);
  }), R = S(v);
  return /* @__PURE__ */ x(I, k({
    appear: s,
    in: u,
    nodeRef: y,
    onEnter: B,
    onEntered: L,
    onEntering: N,
    onExit: C,
    onExited: R,
    onExiting: j,
    addEndListener: (F) => {
      i && i(y.current, F);
    },
    timeout: E
  }, w, {
    children: (F, D) => /* @__PURE__ */ T.cloneElement(l, k({
      style: k({
        opacity: 0,
        visibility: F === "exited" && !u ? "hidden" : void 0
      }, Wf[F], h, l.props.style),
      ref: p
    }, D))
  }));
});
process.env.NODE_ENV !== "production" && (qa.propTypes = {
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
  children: gn.isRequired,
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
const qf = qa;
function Gf(e) {
  return qe("MuiBackdrop", e);
}
it("MuiBackdrop", ["root", "invisible"]);
const Kf = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Xf = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return et({
    root: ["root", n && "invisible"]
  }, Gf, t);
}, Yf = Te("div", {
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
}) => k({
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
})), Ga = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i;
  const s = tt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: d = {},
    componentsProps: m = {},
    invisible: f = !1,
    open: b,
    slotProps: v = {},
    slots: g = {},
    TransitionComponent: h = qf,
    transitionDuration: E
  } = s, I = de(s, Kf), w = k({}, s, {
    component: u,
    invisible: f
  }), y = Xf(w), p = (r = v.root) != null ? r : m.root;
  return /* @__PURE__ */ x(h, k({
    in: b,
    timeout: E
  }, I, {
    children: /* @__PURE__ */ x(Yf, k({
      "aria-hidden": !0
    }, p, {
      as: (o = (i = g.root) != null ? i : d.Root) != null ? o : u,
      className: xe(y.root, c, p == null ? void 0 : p.className),
      ownerState: k({}, w, p == null ? void 0 : p.ownerState),
      classes: y,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ga.propTypes = {
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
const Jf = Ga;
function Zf(e) {
  return qe("MuiModal", e);
}
it("MuiModal", ["root", "hidden", "backdrop"]);
const Qf = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], em = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return et({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, Zf, r);
}, tm = Te("div", {
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
}) => k({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), nm = Te(Jf, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ka = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, i, s, l, c;
  const u = tt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: d = nm,
    BackdropProps: m,
    className: f,
    closeAfterTransition: b = !1,
    children: v,
    container: g,
    component: h,
    components: E = {},
    componentsProps: I = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: y = !1,
    disableEscapeKeyDown: p = !1,
    disablePortal: S = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: B = !1,
    hideBackdrop: L = !1,
    keepMounted: j = !1,
    onBackdropClick: C,
    open: R,
    slotProps: $,
    slots: F
    // eslint-disable-next-line react/prop-types
  } = u, D = de(u, Qf), M = k({}, u, {
    closeAfterTransition: b,
    disableAutoFocus: w,
    disableEnforceFocus: y,
    disableEscapeKeyDown: p,
    disablePortal: S,
    disableRestoreFocus: N,
    disableScrollLock: B,
    hideBackdrop: L,
    keepMounted: j
  }), {
    getRootProps: V,
    getBackdropProps: Q,
    getTransitionProps: Z,
    portalRef: O,
    isTopModal: A,
    exited: U,
    hasTransition: K
  } = Uc(k({}, M, {
    rootRef: n
  })), z = k({}, M, {
    exited: U
  }), H = em(z), q = {};
  if (v.props.tabIndex === void 0 && (q.tabIndex = "-1"), K) {
    const {
      onEnter: J,
      onExited: P
    } = Z();
    q.onEnter = J, q.onExited = P;
  }
  const G = (r = (o = F == null ? void 0 : F.root) != null ? o : E.Root) != null ? r : tm, W = (i = (s = F == null ? void 0 : F.backdrop) != null ? s : E.Backdrop) != null ? i : d, X = (l = $ == null ? void 0 : $.root) != null ? l : I.root, Y = (c = $ == null ? void 0 : $.backdrop) != null ? c : I.backdrop, ne = bt({
    elementType: G,
    externalSlotProps: X,
    externalForwardedProps: D,
    getSlotProps: V,
    additionalProps: {
      ref: n,
      as: h
    },
    ownerState: z,
    className: xe(f, X == null ? void 0 : X.className, H == null ? void 0 : H.root, !z.open && z.exited && (H == null ? void 0 : H.hidden))
  }), _ = bt({
    elementType: W,
    externalSlotProps: Y,
    additionalProps: m,
    getSlotProps: (J) => Q(k({}, J, {
      onClick: (P) => {
        C && C(P), J != null && J.onClick && J.onClick(P);
      }
    })),
    className: xe(Y == null ? void 0 : Y.className, m == null ? void 0 : m.className, H == null ? void 0 : H.backdrop),
    ownerState: z
  });
  return !j && !R && (!K || U) ? null : /* @__PURE__ */ x(pn, {
    ref: O,
    container: g,
    disablePortal: S,
    children: /* @__PURE__ */ ue(G, k({}, ne, {
      children: [!L && d ? /* @__PURE__ */ x(W, k({}, _)) : null, /* @__PURE__ */ x(Ln, {
        disableEnforceFocus: y,
        disableAutoFocus: w,
        disableRestoreFocus: N,
        isEnabled: A,
        open: R,
        children: /* @__PURE__ */ T.cloneElement(v, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ka.propTypes = {
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
  children: gn.isRequired,
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
const rm = Ka;
function om(e) {
  return qe("MuiPaper", e);
}
it("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const im = ["className", "component", "elevation", "square", "variant"], am = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return et(i, om, o);
}, sm = Te("div", {
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
  return k({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && k({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${Un("#fff", wi(t.elevation))}, ${Un("#fff", wi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Xa = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = tt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: s = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = de(r, im), d = k({}, r, {
    component: i,
    elevation: s,
    square: l,
    variant: c
  }), m = am(d);
  return process.env.NODE_ENV !== "production" && En().shadows[s] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${s}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${s}]\` is defined.`].join(`
`)), /* @__PURE__ */ x(sm, k({
    as: i,
    ownerState: d,
    className: xe(m.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (Xa.propTypes = {
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
  elevation: Ht(aa, (e) => {
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
const lm = Xa;
function cm(e) {
  return qe("MuiPopover", e);
}
it("MuiPopover", ["root", "paper"]);
const um = ["onEntering"], dm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], pm = ["slotProps"];
function Si(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function Ci(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function Ni(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function An(e) {
  return typeof e == "function" ? e() : e;
}
const fm = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"]
  }, cm, t);
}, mm = Te(rm, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ya = Te(lm, {
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
}), Ja = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    anchorReference: m = "anchorEl",
    children: f,
    className: b,
    container: v,
    elevation: g = 8,
    marginThreshold: h = 16,
    open: E,
    PaperProps: I = {},
    slots: w,
    slotProps: y,
    transformOrigin: p = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: S = Br,
    transitionDuration: N = "auto",
    TransitionProps: {
      onEntering: B
    } = {},
    disableScrollLock: L = !1
  } = s, j = de(s.TransitionProps, um), C = de(s, dm), R = (r = y == null ? void 0 : y.paper) != null ? r : I, $ = T.useRef(), F = Le($, R.ref), D = k({}, s, {
    anchorOrigin: u,
    anchorReference: m,
    elevation: g,
    marginThreshold: h,
    externalPaperSlotProps: R,
    transformOrigin: p,
    TransitionComponent: S,
    transitionDuration: N,
    TransitionProps: j
  }), M = fm(D), V = T.useCallback(() => {
    if (m === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (d || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), d;
    const J = An(c), P = J && J.nodeType === 1 ? J : Ee($.current).body, re = P.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ve = P.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ve.top === 0 && ve.left === 0 && ve.right === 0 && ve.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: re.top + Si(re, u.vertical),
      left: re.left + Ci(re, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, d, m]), Q = T.useCallback((J) => ({
    vertical: Si(J, p.vertical),
    horizontal: Ci(J, p.horizontal)
  }), [p.horizontal, p.vertical]), Z = T.useCallback((J) => {
    const P = {
      width: J.offsetWidth,
      height: J.offsetHeight
    }, re = Q(P);
    if (m === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ni(re)
      };
    const ve = V();
    let ke = ve.top - re.vertical, he = ve.left - re.horizontal;
    const lt = ke + P.height, Oe = he + P.width, Ge = jt(An(c)), Re = Ge.innerHeight - h, Ke = Ge.innerWidth - h;
    if (h !== null && ke < h) {
      const ye = ke - h;
      ke -= ye, re.vertical += ye;
    } else if (h !== null && lt > Re) {
      const ye = lt - Re;
      ke -= ye, re.vertical += ye;
    }
    if (process.env.NODE_ENV !== "production" && P.height > Re && P.height && Re && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${P.height - Re}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), h !== null && he < h) {
      const ye = he - h;
      he -= ye, re.horizontal += ye;
    } else if (Oe > Ke) {
      const ye = Oe - Ke;
      he -= ye, re.horizontal += ye;
    }
    return {
      top: `${Math.round(ke)}px`,
      left: `${Math.round(he)}px`,
      transformOrigin: Ni(re)
    };
  }, [c, m, V, Q, h]), [O, A] = T.useState(E), U = T.useCallback(() => {
    const J = $.current;
    if (!J)
      return;
    const P = Z(J);
    P.top !== null && (J.style.top = P.top), P.left !== null && (J.style.left = P.left), J.style.transformOrigin = P.transformOrigin, A(!0);
  }, [Z]);
  T.useEffect(() => (L && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, L, U]);
  const K = (J, P) => {
    B && B(J, P), U();
  }, z = () => {
    A(!1);
  };
  T.useEffect(() => {
    E && U();
  }), T.useImperativeHandle(l, () => E ? {
    updatePosition: () => {
      U();
    }
  } : null, [E, U]), T.useEffect(() => {
    if (!E)
      return;
    const J = Qi(() => {
      U();
    }), P = jt(c);
    return P.addEventListener("resize", J), () => {
      J.clear(), P.removeEventListener("resize", J);
    };
  }, [c, E, U]);
  let H = N;
  N === "auto" && !S.muiSupportAuto && (H = void 0);
  const q = v || (c ? Ee(An(c)).body : void 0), G = (o = w == null ? void 0 : w.root) != null ? o : mm, W = (i = w == null ? void 0 : w.paper) != null ? i : Ya, X = bt({
    elementType: W,
    externalSlotProps: k({}, R, {
      style: O ? R.style : k({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: g,
      ref: F
    },
    ownerState: D,
    className: xe(M.paper, R == null ? void 0 : R.className)
  }), Y = bt({
    elementType: G,
    externalSlotProps: (y == null ? void 0 : y.root) || {},
    externalForwardedProps: C,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: E
    },
    ownerState: D,
    className: xe(M.root, b)
  }), {
    slotProps: ne
  } = Y, _ = de(Y, pm);
  return /* @__PURE__ */ x(G, k({}, _, !ua(G) && {
    slotProps: ne,
    disableScrollLock: L
  }, {
    children: /* @__PURE__ */ x(S, k({
      appear: !0,
      in: E,
      onEntering: K,
      onExited: z,
      timeout: H
    }, j, {
      children: /* @__PURE__ */ x(W, k({}, X, {
        children: f
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ja.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Wr,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Ht(a.oneOfType([Je, a.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = An(e.anchorEl);
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
  elevation: aa,
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
    component: Ul
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
const hm = Ja;
function gm(e) {
  return qe("MuiMenu", e);
}
it("MuiMenu", ["root", "paper", "list"]);
const bm = ["onEntering"], vm = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], ym = {
  vertical: "top",
  horizontal: "right"
}, wm = {
  vertical: "top",
  horizontal: "left"
}, xm = (e) => {
  const {
    classes: t
  } = e;
  return et({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, gm, t);
}, Em = Te(hm, {
  shouldForwardProp: (e) => Ra(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Tm = Te(Ya, {
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
}), km = Te(Uf, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Za = /* @__PURE__ */ T.forwardRef(function(t, n) {
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
    onClose: m,
    open: f,
    PaperProps: b = {},
    PopoverClasses: v,
    transitionDuration: g = "auto",
    TransitionProps: {
      onEntering: h
    } = {},
    variant: E = "selectedMenu",
    slots: I = {},
    slotProps: w = {}
  } = i, y = de(i.TransitionProps, bm), p = de(i, vm), S = En(), N = S.direction === "rtl", B = k({}, i, {
    autoFocus: s,
    disableAutoFocusItem: u,
    MenuListProps: d,
    onEntering: h,
    PaperProps: b,
    transitionDuration: g,
    TransitionProps: y,
    variant: E
  }), L = xm(B), j = s && !u && f, C = T.useRef(null), R = (Z, O) => {
    C.current && C.current.adjustStyleForScrollbar(Z, S), h && h(Z, O);
  }, $ = (Z) => {
    Z.key === "Tab" && (Z.preventDefault(), m && m(Z, "tabKeyDown"));
  };
  let F = -1;
  T.Children.map(l, (Z, O) => {
    /* @__PURE__ */ T.isValidElement(Z) && (process.env.NODE_ENV !== "production" && jn.isFragment(Z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Z.props.disabled || (E === "selectedMenu" && Z.props.selected || F === -1) && (F = O));
  });
  const D = (r = I.paper) != null ? r : Tm, M = (o = w.paper) != null ? o : b, V = bt({
    elementType: I.root,
    externalSlotProps: w.root,
    ownerState: B,
    className: [L.root, c]
  }), Q = bt({
    elementType: D,
    externalSlotProps: M,
    ownerState: B,
    className: L.paper
  });
  return /* @__PURE__ */ x(Em, k({
    onClose: m,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: N ? "right" : "left"
    },
    transformOrigin: N ? ym : wm,
    slots: {
      paper: D,
      root: I.root
    },
    slotProps: {
      root: V,
      paper: Q
    },
    open: f,
    ref: n,
    transitionDuration: g,
    TransitionProps: k({
      onEntering: R
    }, y),
    ownerState: B
  }, p, {
    classes: v,
    children: /* @__PURE__ */ x(km, k({
      onKeyDown: $,
      actions: C,
      autoFocus: s && (F === -1 || u),
      autoFocusItem: j,
      variant: E
    }, d, {
      className: xe(L.list, d.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Za.propTypes = {
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
const Om = Za;
function Qm({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = It.useState(void 0), s = Ce(
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
  ), l = Ce(() => {
    i(void 0);
  }, []), c = wt(() => {
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
          Om,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ x(
              uo,
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
const Sm = Ba(/* @__PURE__ */ x("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Cm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Lr = (e, t, n = {}) => {
  const r = ft(t);
  r.current = t;
  const o = ft(n);
  o.current = Cm(o.current);
  const [i, s] = we(() => r.current), [l, c] = we(!0);
  return zt(() => {
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
function Nm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, u] = we(!1), [d, m] = we(!1), f = Ce(() => {
    c && u(!1), m(!1);
  }, [c]), b = Ce((y) => {
    y.stopPropagation(), u((p) => {
      const S = !p;
      return S && y.shiftKey ? m(!0) : S || m(!1), S;
    });
  }, []), v = Ce(
    (y) => (f(), r(y)),
    [r, f]
  ), [g, h] = we({ top: 1, left: 1 });
  zt(() => {
    if (c) {
      const y = o == null ? void 0 : o.current;
      if (y) {
        const p = y.getBoundingClientRect(), S = window.scrollY, N = window.scrollX, B = p.top + S + y.clientHeight, L = p.left + N;
        h({ top: B, left: L });
      }
    }
  }, [c, o]);
  const [E] = Lr(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [I] = Lr(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? n ?? E, [e, n, E, c]),
    n ?? E
  ), w = d && I ? I : E;
  return /* @__PURE__ */ ue(qn, { children: [
    /* @__PURE__ */ x(
      Ai,
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
        children: l ?? /* @__PURE__ */ x(Sm, {})
      }
    ),
    /* @__PURE__ */ x(
      As,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: f,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: g.top,
            left: g.left
          }
        },
        children: w ? /* @__PURE__ */ x(
          Af,
          {
            className: i,
            id: `${s ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: w
          }
        ) : void 0
      }
    )
  ] });
}
function eh({
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
    Ai,
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
function Wn({
  variant: e = "outlined",
  id: t,
  isDisabled: n = !1,
  hasError: r = !1,
  isFullWidth: o = !1,
  helperText: i,
  label: s,
  placeholder: l,
  isRequired: c = !1,
  className: u,
  defaultValue: d,
  value: m,
  onChange: f,
  onFocus: b,
  onBlur: v
}) {
  return /* @__PURE__ */ x(
    Mi,
    {
      variant: e,
      id: t,
      disabled: n,
      error: r,
      fullWidth: o,
      helperText: i,
      label: s,
      placeholder: l,
      required: c,
      className: `papi-textfield ${u ?? ""}`,
      defaultValue: d,
      value: m,
      onChange: f,
      onFocus: b,
      onBlur: v
    }
  );
}
let kr;
const Or = () => (kr || (kr = ie.allBookIds.map((e) => ({
  bookId: e,
  label: ie.bookIdToEnglishName(e)
}))), kr);
function th({ scrRef: e, handleSubmit: t, id: n }) {
  const r = (c) => {
    t(c);
  }, o = (c, u) => {
    const m = { bookNum: ie.bookIdToNumber(u.bookId), chapterNum: 1, verseNum: 1 };
    r(m);
  }, i = (c) => {
    t({ ...e, chapterNum: +c.target.value });
  }, s = (c) => {
    t({ ...e, verseNum: +c.target.value });
  }, l = wt(() => Or()[e.bookNum - 1], [e.bookNum]);
  return /* @__PURE__ */ ue("span", { id: n, children: [
    /* @__PURE__ */ x(
      Cr,
      {
        title: "Book",
        className: "papi-ref-selector book",
        value: l,
        options: Or(),
        onChange: o,
        isClearable: !1,
        width: 200
      }
    ),
    /* @__PURE__ */ x(
      Tt,
      {
        onClick: () => r(Co(e, -1)),
        isDisabled: e.bookNum <= hs,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(
      Tt,
      {
        onClick: () => r(Co(e, 1)),
        isDisabled: e.bookNum >= Or().length,
        children: ">"
      }
    ),
    /* @__PURE__ */ x(
      Wn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Chapter",
        value: e.chapterNum,
        onChange: i
      }
    ),
    /* @__PURE__ */ x(
      Tt,
      {
        onClick: () => t(No(e, -1)),
        isDisabled: e.chapterNum <= gs,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(
      Tt,
      {
        onClick: () => t(No(e, 1)),
        isDisabled: e.chapterNum >= $i(e.bookNum),
        children: ">"
      }
    ),
    /* @__PURE__ */ x(
      Wn,
      {
        className: "papi-ref-selector chapter-verse",
        label: "Verse",
        value: e.verseNum,
        onChange: s
      }
    ),
    /* @__PURE__ */ x(
      Tt,
      {
        onClick: () => t(Po(e, -1)),
        isDisabled: e.verseNum <= bs,
        children: "<"
      }
    ),
    /* @__PURE__ */ x(Tt, { onClick: () => t(Po(e, 1)), children: ">" })
  ] });
}
class Pm {
  constructor() {
    Et(this, "listeners", {});
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
class nh {
  constructor(t, n, r) {
    Et(this, "id");
    Et(this, "checkDefinition");
    Et(this, "data");
    Et(this, "resultsUpdated");
    if (r)
      this.id = r.id, this.checkDefinition = r;
    else {
      if (!n)
        throw new Error("Either 'id' or 'checkDefinition' must be provided.");
      this.id = n;
    }
    this.data = t, this.resultsUpdated = new Pm();
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
const _t = "scrBook", Rm = "scrRef", Dn = "source", $m = "details", Mm = "Scripture Reference", Im = "Scripture Book", Qa = "Type", _m = "Details";
function Am(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${ie.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: _t,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Mm,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ie.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === _t ? ur(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Ro(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => ur(r.start),
      id: Rm,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : ur(o.start);
      },
      sortingFn: (r, o) => Ro(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => typeof r.source == "object" && "displayName" in r.source ? r.source.displayName : r.source,
      id: Dn,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Qa : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: $m,
      header: (e == null ? void 0 : e.detailsColumnName) ?? _m,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function rh({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: i,
  detailsColumnName: s
}) {
  const [l, c] = we([]), [u, d] = we([{ id: _t, desc: !1 }]), [m, f] = we(() => e.flatMap((y) => {
    const p = y.checkDefinition ?? y.id;
    return y.data.map((S) => ({
      ...S,
      source: p
    }));
  }));
  zt(() => {
    const y = (p) => {
      const { detail: S } = p, N = S, B = N.checkDefinition ?? N.id, L = N.data.map((j) => ({
        ...j,
        source: B
      }));
      S !== void 0 && f((j) => [...j.filter((R) => R.source !== B), ...L]);
    };
    return e.forEach((p) => {
      p.resultsUpdated.addEventListener("resultsUpdated", y);
    }), () => {
      e.forEach((p) => {
        p.resultsUpdated.removeEventListener("resultsUpdated", y);
      });
    };
  }, [e]);
  const b = wt(
    () => Am(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: i,
        detailsColumnName: s
      },
      n
    ),
    [r, i, s, n]
  ), v = qs({
    data: m,
    columns: b,
    state: {
      grouping: l,
      sorting: u
    },
    onGroupingChange: c,
    onSortingChange: d,
    getExpandedRowModel: Gs(),
    getGroupedRowModel: Ks(),
    getCoreRowModel: Xs(),
    getSortedRowModel: Ys()
  }), g = o ?? Im, h = i ?? Qa, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${g}`, value: [_t] },
    { label: `Group by ${h}`, value: [Dn] },
    {
      label: `Group by ${g} and ${h}`,
      value: [_t, Dn]
    },
    {
      label: `Group by ${h} and ${g}`,
      value: [Dn, _t]
    }
  ], I = (y) => {
    const p = JSON.parse(y.target.value);
    c(p);
  }, w = (y, p) => y.depth >= p.column.getIndex() ? ` indent${y.depth}` : "";
  return /* @__PURE__ */ ue("div", { className: "p-2", children: [
    /* @__PURE__ */ x("div", { className: "h-2" }),
    !t && /* @__PURE__ */ x("select", { onChange: I, children: E.map((y) => /* @__PURE__ */ x("option", { value: JSON.stringify(y.value), children: y.label }, y.label)) }),
    /* @__PURE__ */ ue("table", { children: [
      t && /* @__PURE__ */ x("thead", { children: v.getHeaderGroups().map((y) => /* @__PURE__ */ x("tr", { children: y.headers.map((p) => /* @__PURE__ */ x("th", { colSpan: p.colSpan, children: p.isPlaceholder ? void 0 : /* @__PURE__ */ ue("div", { children: [
        p.column.getCanGroup() ? /* @__PURE__ */ x(
          "button",
          {
            title: `Toggle grouping by ${p.column.columnDef.header}`,
            onClick: p.column.getToggleGroupingHandler(),
            style: { cursor: "pointer" },
            type: "button",
            children: p.column.getIsGrouped() ? `🛑(${p.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        dr(p.column.columnDef.header, p.getContext())
      ] }) }, p.id)) }, y.id)) }),
      /* @__PURE__ */ x("tbody", { children: v.getRowModel().rows.map((y) => /* @__PURE__ */ x("tr", { children: y.getVisibleCells().map((p) => {
        if (!(p.getIsPlaceholder() || p.column.columnDef.enableGrouping && !p.getIsGrouped()))
          return /* @__PURE__ */ x(
            "td",
            {
              className: `${p.column.columnDef.id}${w(y, p)}`,
              children: (() => p.getIsGrouped() ? /* @__PURE__ */ ue(
                "button",
                {
                  onClick: y.getToggleExpandedHandler(),
                  style: {
                    cursor: y.getCanExpand() ? "pointer" : "normal"
                  },
                  type: "button",
                  children: [
                    y.getIsExpanded() ? "👇" : "👉",
                    " ",
                    dr(p.column.columnDef.cell, p.getContext()),
                    " (",
                    y.subRows.length,
                    ")"
                  ]
                }
              ) : dr(p.column.columnDef.cell, p.getContext()))()
            },
            p.id
          );
      }) }, y.id)) })
    ] })
  ] });
}
function oh({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = we(""), i = (s) => {
    o(s), e(s);
  };
  return /* @__PURE__ */ x(Ds, { component: "form", className: "search-bar-paper", children: /* @__PURE__ */ x(
    Wn,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (s) => i(s.target.value)
    }
  ) });
}
function ih({
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
  onChange: m,
  onChangeCommitted: f
}) {
  return /* @__PURE__ */ x(
    js,
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
      onChange: m,
      onChangeCommitted: f
    }
  );
}
function ah({
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
    Bs,
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
function sh({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ x(
    Ls,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Pi({ onRowChange: e, row: t, column: n }) {
  const r = (o) => {
    e({ ...t, [n.key]: o.target.value });
  };
  return /* @__PURE__ */ x(Wn, { defaultValue: t[n.key], onChange: r });
}
const Dm = ({ onChange: e, disabled: t, checked: n, ...r }) => /* @__PURE__ */ x(
  Nl,
  {
    ...r,
    isChecked: n,
    isDisabled: t,
    onChange: (i) => {
      e(i.target.checked, i.nativeEvent.shiftKey);
    }
  }
);
function lh({
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
  selectColumnWidth: m = 50,
  rowKeyGetter: f,
  rowHeight: b = 35,
  headerRowHeight: v = 35,
  selectedRows: g,
  onSelectedRowsChange: h,
  onRowsChange: E,
  onCellClick: I,
  onCellDoubleClick: w,
  onCellContextMenu: y,
  onCellKeyDown: p,
  direction: S = "ltr",
  enableVirtualization: N = !0,
  onCopy: B,
  onPaste: L,
  onScroll: j,
  className: C,
  "data-testid": R
}) {
  const $ = wt(() => {
    const F = e.map((D) => typeof D.editable == "function" ? {
      ...D,
      editable: (V) => !!D.editable(V),
      renderEditCell: D.renderEditCell || Pi
    } : D.editable && !D.renderEditCell ? { ...D, renderEditCell: Pi } : D.renderEditCell && !D.editable ? { ...D, editable: !1 } : D);
    return d ? [{ ...Zs, minWidth: m }, ...F] : F;
  }, [e, d, m]);
  return /* @__PURE__ */ x(
    Js,
    {
      columns: $,
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
      rowKeyGetter: f,
      rowHeight: b,
      headerRowHeight: v,
      selectedRows: g,
      onSelectedRowsChange: h,
      onRowsChange: E,
      onCellClick: I,
      onCellDoubleClick: w,
      onCellContextMenu: y,
      onCellKeyDown: p,
      direction: S,
      enableVirtualization: N,
      onCopy: B,
      onPaste: L,
      onScroll: j,
      renderers: { renderCheckbox: Dm },
      className: `papi-table ${C ?? "rdg-light"}`,
      "data-testid": R
    }
  );
}
function ch({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = ft(void 0);
  return /* @__PURE__ */ x("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ x(Fs, { position: "static", id: r, children: /* @__PURE__ */ ue(Vs, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ x(
      Nm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ x("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const uh = (e, t) => {
  zt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Sr = () => !1, dh = (e, t) => {
  const [n] = Lr(
    Ce(async () => {
      if (!e)
        return Sr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Sr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  zt(() => () => {
    n !== Sr && n();
  }, [n]);
};
function jm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
jm(`.papi-snackbar {
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
.papi-ref-selector.book {
  display: inline-block;
  vertical-align: middle;
}

.papi-ref-selector.chapter-verse {
  width: 75px;
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
.search-bar-paper {
  display: flex;
  align-items: center;
}

.search-button {
  padding: 10px;
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
.basic-list-table {
  overflow: auto;

  .table-header {
    text-align: left;
  }
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
.pr-h-10 {
    height: 2.5rem;
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
.pr-h-px {
    height: 1px;
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
.pr-w-full {
    width: 100%;
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
.pr-self-stretch {
    align-self: stretch;
}
.pr-overflow-hidden {
    overflow: hidden;
}
.pr-overflow-y-auto {
    overflow-y: auto;
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
.pr-bg-muted {
    background-color: hsl(var(--muted));
}
.pr-bg-popover {
    background-color: hsl(var(--popover));
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
.pr-text-gray-500 {
    --tw-text-opacity: 1;
    color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-popover-foreground {
    color: hsl(var(--popover-foreground));
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
.focus\\:pr-bg-accent:focus {
    background-color: hsl(var(--accent));
}
.focus\\:pr-text-accent-foreground:focus {
    color: hsl(var(--accent-foreground));
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
  Jm as BookChapterControl,
  Tt as Button,
  Zm as ChapterRangeSelector,
  Nl as Checkbox,
  Cr as ComboBox,
  Qm as ContextMenu,
  Af as GridMenu,
  Nm as HamburgerMenuButton,
  eh as IconButton,
  $t as LabelPosition,
  Fa as MenuItem,
  th as RefSelector,
  nh as ResultsSource,
  rh as ScriptureRefKeyedList,
  oh as SearchBar,
  ih as Slider,
  ah as Snackbar,
  sh as Switch,
  lh as Table,
  Wn as TextField,
  ch as Toolbar,
  uh as useEvent,
  dh as useEventAsync,
  Lr as usePromise
};
//# sourceMappingURL=index.js.map
