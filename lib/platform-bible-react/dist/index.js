import ml, { jsxs as U, jsx as m, Fragment as _t } from "react/jsx-runtime";
import * as k from "react";
import J, { forwardRef as da, useCallback as _e, useState as fe, useRef as Nt, useEffect as Ye, useLayoutEffect as ei, useMemo as io } from "react";
import { getChaptersForBook as gl, split as bl } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as vl } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as yl, Check as fa, Circle as wl, History as xl, ArrowDownWideNarrow as El, Clock as kl, Bookmark as Tl, ChevronDown as ha, ChevronUp as Nl, ArrowLeftIcon as Ol, ChevronLeftIcon as Cl, ChevronRightIcon as Sl, ArrowRightIcon as Pl, FilterIcon as Rl, CircleCheckIcon as ti, CircleXIcon as ni, CircleHelpIcon as ri, ArrowUpIcon as $l, ArrowDownIcon as _l, ArrowUpDownIcon as Ml, LoaderCircle as ao, Download as Il } from "lucide-react";
import Oe, { clsx as Al } from "clsx";
import { extendTailwindMerge as Dl } from "tailwind-merge";
import { useReactTable as Bl, getCoreRowModel as jl, getPaginationRowModel as Ll, getSortedRowModel as Fl, getFilteredRowModel as Vl, flexRender as oi } from "@tanstack/react-table";
import { Slot as zl } from "@radix-ui/react-slot";
import { cva as so } from "class-variance-authority";
import * as we from "@radix-ui/react-select";
import { Autocomplete as Ul, TextField as Hl, FormControlLabel as ii, FormLabel as Wl, Checkbox as Xl, MenuItem as Gl, ListItemText as ql, ListItemIcon as ma, Menu as Yl, Grid as ga, List as Kl, IconButton as ba, Drawer as Jl, Slider as Zl, Snackbar as Ql, Switch as ec, AppBar as tc, Toolbar as nc } from "@mui/material";
import rc, { ThemeContext as oc, internal_processStyles as ic } from "@mui/styled-engine";
import * as ac from "react-dom";
import Bn from "react-dom";
import * as va from "@radix-ui/react-label";
import * as Ae from "@radix-ui/react-tabs";
import * as dn from "@radix-ui/react-slider";
import * as zr from "@radix-ui/react-switch";
var sc = Object.defineProperty, lc = (e, t, n) => t in e ? sc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => lc(e, typeof t != "symbol" ? t + "" : t, n);
const Ct = [
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
], lo = [
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
], ya = [
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
], ai = vc();
function Jt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ai ? ai[e] : 0;
}
function co(e) {
  return Jt(e) > 0;
}
function cc(e) {
  const t = typeof e == "string" ? Jt(e) : e;
  return t >= 40 && t <= 66;
}
function pc(e) {
  return (typeof e == "string" ? Jt(e) : e) <= 39;
}
function wa(e) {
  return e <= 66;
}
function uc(e) {
  const t = typeof e == "string" ? Jt(e) : e;
  return ka(t) && !wa(t);
}
function* dc() {
  for (let e = 1; e <= Ct.length; e++)
    yield e;
}
const fc = 1, xa = Ct.length;
function hc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function po(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Ct.length ? t : Ct[n];
}
function Ea(e) {
  return e <= 0 || e > xa ? "******" : ya[e - 1];
}
function mc(e) {
  return Ea(Jt(e));
}
function ka(e) {
  const t = typeof e == "number" ? po(e) : e;
  return co(t) && !lo.includes(t);
}
function gc(e) {
  const t = typeof e == "number" ? po(e) : e;
  return co(t) && lo.includes(t);
}
function bc(e) {
  return ya[e - 1].includes("*obsolete*");
}
function vc() {
  const e = {};
  for (let t = 0; t < Ct.length; t++)
    e[Ct[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Ct,
  nonCanonicalIds: lo,
  bookIdToNumber: Jt,
  isBookIdValid: co,
  isBookNT: cc,
  isBookOT: pc,
  isBookOTNT: wa,
  isBookDC: uc,
  allBookNumbers: dc,
  firstBook: fc,
  lastBook: xa,
  extraBooks: hc,
  bookNumberToId: po,
  bookNumberToEnglishName: Ea,
  bookIdToEnglishName: mc,
  isCanonical: ka,
  isExtraMaterial: gc,
  isObsolete: bc
};
var qe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(qe || {});
const je = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = qe[t]) : (this._type = t, this.name = qe[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(je, "Original", new je(qe.Original)), oe(je, "Septuagint", new je(qe.Septuagint)), oe(je, "Vulgate", new je(qe.Vulgate)), oe(je, "English", new je(qe.English)), oe(je, "RussianProtestant", new je(qe.RussianProtestant)), oe(je, "RussianOrthodox", new je(qe.RussianOrthodox));
let wt = je;
function si(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Ta = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ta || {});
const $e = class le {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const i = t, a = n != null && n instanceof wt ? n : void 0;
        this.setEmpty(a), this.parse(i);
      } else if (t != null && typeof t == "number") {
        const i = n != null && n instanceof wt ? n : void 0;
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
          const i = t instanceof wt ? t : le.defaultVersification;
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
      return n = new le(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof on)
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
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: i, versificationStr: a } = t, l = i || o.toString();
    let c;
    return a && (c = new wt(a)), n ? new le(n, r.toString(), l, c) : new le();
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
      if (n = n * 10 + +r - 0, n > le.bcvMaxValue)
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
    return me.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = me.bookIdToNumber(t);
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
    if (t <= 0 || t > me.lastBook)
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
    this.versification = this.versification != null ? new wt(t) : void 0;
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
          const a = +i[1].trim();
          this.versification = new wt(qe[a]);
        } catch {
          throw new on("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new on("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(r[1]))
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
    return new le(this);
  }
  toString() {
    const t = this.book;
    return t === "" ? "" : `${t} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let t = this.verse;
    return (t === "" || t === this.verseNum.toString()) && (t = void 0), {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: t,
      versificationStr: this.versificationStr
    };
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(t) {
    return t instanceof le ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
    const o = [], i = si(this._verse, r);
    for (const a of i.map((l) => si(l, n))) {
      const l = this.clone();
      l.verse = a[0];
      const c = l.verseNum;
      if (o.push(l), a.length > 1) {
        const u = this.clone();
        if (u.verse = a[1], !t)
          for (let f = c + 1; f < u.verseNum; f++) {
            const v = new le(
              this._bookNum,
              this._chapterNum,
              f,
              this.versification
            );
            this.isExcluded || o.push(v);
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
      const a = o.BBBCCCVVV;
      if (r > a)
        return 3;
      if (r === a)
        return 4;
      r = a;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe($e, "defaultVersification", wt.English), oe($e, "verseRangeSeparator", "-"), oe($e, "verseSequenceIndicator", ","), oe($e, "verseRangeSeparators", [$e.verseRangeSeparator]), oe($e, "verseSequenceIndicators", [$e.verseSequenceIndicator]), oe($e, "chapterDigitShifter", 1e3), oe($e, "bookDigitShifter", $e.chapterDigitShifter * $e.chapterDigitShifter), oe($e, "bcvMaxValue", $e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe($e, "ValidStatusType", Ta);
let on = class extends Error {
};
const yc = Dl({ prefix: "pr-" });
function W(...e) {
  return yc(Al(e));
}
const Na = ge.Root, wc = ge.Trigger, Ab = ge.Group, Db = ge.Portal, Bb = ge.Sub, jb = ge.RadioGroup, xc = J.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ U(
  ge.SubTrigger,
  {
    ref: o,
    className: W(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ m(yl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
xc.displayName = ge.SubTrigger.displayName;
const Ec = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  ge.SubContent,
  {
    ref: n,
    className: W(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Ec.displayName = ge.SubContent.displayName;
const uo = J.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ m(ge.Portal, { children: /* @__PURE__ */ m(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: W(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
uo.displayName = ge.Content.displayName;
const Oa = J.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ m(
  ge.Item,
  {
    ref: r,
    className: W(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
Oa.displayName = ge.Item.displayName;
const Ca = J.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ U(
  ge.CheckboxItem,
  {
    ref: o,
    className: W(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(ge.ItemIndicator, { children: /* @__PURE__ */ m(fa, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Ca.displayName = ge.CheckboxItem.displayName;
const kc = J.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ U(
  ge.RadioItem,
  {
    ref: r,
    className: W(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(ge.ItemIndicator, { children: /* @__PURE__ */ m(wl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
kc.displayName = ge.RadioItem.displayName;
const ar = J.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ m(
  ge.Label,
  {
    ref: r,
    className: W("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
ar.displayName = ge.Label.displayName;
const fo = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  ge.Separator,
  {
    ref: n,
    className: W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
fo.displayName = ge.Separator.displayName;
function Tc({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: W("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Tc.displayName = "DropdownMenuShortcut";
const sr = J.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ m(
    "input",
    {
      type: t,
      className: W(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
sr.displayName = "Input";
const Nc = da(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ U("div", { className: "pr-relative", children: [
    /* @__PURE__ */ m(
      sr,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (a) => e(a.target.value),
        onKeyDown: (a) => {
          a.key === "Enter" && r(), t(a);
        },
        onClick: n,
        ref: i
      }
    ),
    /* @__PURE__ */ m(
      xl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function Oc({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), a = _e(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ m("div", { className: W("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ m(
    "div",
    {
      className: W(
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
      onMouseMove: () => a(l),
      children: l
    },
    l
  )) });
}
const Cc = da(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: a
  }, l) => /* @__PURE__ */ U(
    Oa,
    {
      ref: l,
      textValue: e,
      className: W("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ m(
          "span",
          {
            className: W(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": i.toLowerCase() === "ot",
                "pr-border-l-purple-200": i.toLowerCase() === "nt",
                "pr-border-l-indigo-200": i.toLowerCase() === "dc"
              }
            ),
            children: me.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ m("div", { children: a })
      ]
    },
    e
  )
);
function Sc({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ U(ar, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ m("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ m(
        El,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        kl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        Tl,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const gn = me.allBookIds, Pc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, li = ["OT", "NT", "DC"], Rc = 32 + 32 + 32, $c = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], _c = (e) => ({
  OT: gn.filter((n) => me.isBookOT(n)),
  NT: gn.filter((n) => me.isBookNT(n)),
  DC: gn.filter((n) => me.isBookDC(n))
})[e], an = (e) => gl(me.bookIdToNumber(e));
function Mc() {
  return gn.map((t) => me.bookIdToEnglishName(t));
}
function Ic(e) {
  return Mc().includes(e);
}
function Ac(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Ic(t))
    return gn.find((r) => me.bookIdToEnglishName(r) === t);
}
function Lb({ scrRef: e, handleSubmit: t }) {
  const [n, r] = fe(""), [o, i] = fe(
    me.bookNumberToId(e.bookNum)
  ), [a, l] = fe(e.chapterNum ?? 0), [c, u] = fe(
    me.bookNumberToId(e.bookNum)
  ), [f, v] = fe(!1), [b, p] = fe(f), h = Nt(void 0), d = Nt(void 0), g = Nt(void 0), w = _e(
    (P) => _c(P).filter((I) => {
      const A = me.bookIdToEnglishName(I).toLowerCase(), F = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return A.includes(F) || // Match book name
      I.toLowerCase().includes(F);
    }),
    [n]
  ), S = (P) => {
    r(P);
  }, x = Nt(!1), E = _e((P) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    v(P);
  }, []), y = _e(
    (P, I, A, F) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== P ? 1 : e.chapterNum
      ), I || an(P) === -1) {
        t({
          bookNum: me.bookIdToNumber(P),
          chapterNum: A || 1,
          verseNum: F || 1
        }), v(!1), r("");
        return;
      }
      i(o !== P ? P : ""), v(!I);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), N = (P) => {
    P <= 0 || P > an(o) || y(o, !0, P);
  }, T = _e(() => {
    $c.forEach((P) => {
      const I = n.match(P);
      if (I) {
        const [A, F = void 0, z = void 0] = I.slice(1), R = Ac(A);
        (me.isBookIdValid(A) || R) && y(
          R ?? A,
          !0,
          F ? parseInt(F, 10) : 1,
          z ? parseInt(z, 10) : 1
        );
      }
    });
  }, [y, n]), _ = _e(
    (P) => {
      f ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null ? g.current.focus() : typeof d < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      d.current !== null && d.current.focus(), P.preventDefault()) : v(!0);
    },
    [f]
  ), D = (P) => {
    const { key: I } = P;
    I === "ArrowRight" || I === "ArrowLeft" || I === "ArrowDown" || I === "ArrowUp" || I === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: I })), h.current.focus());
  }, j = (P) => {
    const { key: I } = P;
    if (c === o) {
      if (I === "Enter") {
        P.preventDefault(), y(o, !0, a);
        return;
      }
      let A = 0;
      if (I === "ArrowRight")
        if (a < an(c))
          A = 1;
        else {
          P.preventDefault();
          return;
        }
      else if (I === "ArrowLeft")
        if (a > 1)
          A = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        I === "ArrowDown" ? A = 6 : I === "ArrowUp" && (A = -6);
      a + A <= 0 || a + A > an(c) ? l(0) : A !== 0 && (l(a + A), P.preventDefault());
    }
  };
  return Ye(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), ei(() => {
    p(f);
  }, [f]), ei(() => {
    const P = setTimeout(() => {
      if (b && d.current && g.current) {
        const A = g.current.offsetTop - Rc;
        d.current.scrollTo({ top: A, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [b]), /* @__PURE__ */ m("div", { className: "pr-flex", children: /* @__PURE__ */ U(Na, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ m(wc, { asChild: !0, children: /* @__PURE__ */ m(
      Nc,
      {
        ref: h,
        value: n,
        handleSearch: S,
        handleKeyDown: _,
        handleOnClick: () => {
          i(me.bookNumberToId(e.bookNum)), u(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: T,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ U(
      uo,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: d,
        children: [
          /* @__PURE__ */ m(
            Sc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          li.map(
            (P, I) => w(P).length > 0 && /* @__PURE__ */ U("div", { children: [
              /* @__PURE__ */ m(ar, { className: "pr-font-semibold pr-text-slate-700", children: Pc[P] }),
              w(P).map((A) => /* @__PURE__ */ m("div", { children: /* @__PURE__ */ m(
                Cc,
                {
                  bookId: A,
                  handleSelectBook: () => y(A, !1),
                  isSelected: o === A,
                  handleHighlightBook: () => u(A),
                  handleKeyDown: j,
                  bookType: P,
                  ref: (F) => {
                    o === A && (g.current = F);
                  },
                  children: /* @__PURE__ */ m(
                    Oc,
                    {
                      handleSelectChapter: N,
                      endChapter: an(A),
                      activeChapter: e.bookNum === me.bookIdToNumber(A) ? e.chapterNum : 0,
                      highlightedChapter: a,
                      handleHighlightedChapter: (F) => {
                        l(F);
                      }
                    }
                  )
                }
              ) }, A)),
              li.length - 1 !== I ? /* @__PURE__ */ m(fo, {}) : void 0
            ] }, P)
          )
        ]
      }
    )
  ] }) });
}
const ho = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ m(
    "table",
    {
      ref: n,
      className: W("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
ho.displayName = "Table";
const mo = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("thead", { ref: n, className: W("[&_tr]:pr-border-b", e), ...t }));
mo.displayName = "TableHeader";
const go = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("tbody", { ref: n, className: W("[&_tr:last-child]:pr-border-0", e), ...t }));
go.displayName = "TableBody";
const Dc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "tfoot",
  {
    ref: n,
    className: W("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Dc.displayName = "TableFooter";
const Ut = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "tr",
    {
      ref: n,
      className: W(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Ut.displayName = "TableRow";
const Yn = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "th",
  {
    ref: n,
    className: W(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Yn.displayName = "TableHead";
const xn = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "td",
  {
    ref: n,
    className: W("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
xn.displayName = "TableCell";
const Bc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "caption",
  {
    ref: n,
    className: W("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Bc.displayName = "TableCaption";
const jc = so(
  "pr-twp pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50",
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
), Ne = J.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ m(r ? zl : "button", { className: W(jc({ variant: t, size: n, className: e })), ref: i, ...o })
);
Ne.displayName = "Button";
const Ur = we.Root, Fb = we.Group, Hr = we.Value, Kn = J.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ U(
  we.Trigger,
  {
    ref: r,
    className: W(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ m(we.Icon, { asChild: !0, children: /* @__PURE__ */ m(ha, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Kn.displayName = we.Trigger.displayName;
const Sa = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  we.ScrollUpButton,
  {
    ref: n,
    className: W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(Nl, { className: "pr-h-4 pr-w-4" })
  }
));
Sa.displayName = we.ScrollUpButton.displayName;
const Pa = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  we.ScrollDownButton,
  {
    ref: n,
    className: W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(ha, { className: "pr-h-4 pr-w-4" })
  }
));
Pa.displayName = we.ScrollDownButton.displayName;
const Jn = J.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ m(we.Portal, { children: /* @__PURE__ */ U(
  we.Content,
  {
    ref: o,
    className: W(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ m(Sa, {}),
      /* @__PURE__ */ m(
        we.Viewport,
        {
          className: W(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ m(Pa, {})
    ]
  }
) }));
Jn.displayName = we.Content.displayName;
const Lc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  we.Label,
  {
    ref: n,
    className: W("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Lc.displayName = we.Label.displayName;
const ot = J.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ U(
  we.Item,
  {
    ref: r,
    className: W(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(we.ItemIndicator, { children: /* @__PURE__ */ m(fa, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ m(we.ItemText, { children: t })
    ]
  }
));
ot.displayName = we.Item.displayName;
const Fc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  we.Separator,
  {
    ref: n,
    className: W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Fc.displayName = we.Separator.displayName;
function Vc({ table: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ U("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ m("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ U(
        Ur,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ m(Kn, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ m(Hr, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ m(Jn, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ m(ot, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ U(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ m(Ol, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ U(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ m(Cl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ U(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ m(Sl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ U(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ m(Pl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function zc({ table: e }) {
  return /* @__PURE__ */ U(Na, { children: [
    /* @__PURE__ */ m(vl, { asChild: !0, children: /* @__PURE__ */ U(Ne, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ m(Rl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ U(uo, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ m(ar, { children: "Toggle columns" }),
      /* @__PURE__ */ m(fo, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ m(
        Ca,
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
function Uc({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var d;
  const [a, l] = fe([]), [c, u] = fe([]), [f, v] = fe({}), [b, p] = fe({}), h = Bl({
    data: t,
    columns: e,
    getCoreRowModel: jl(),
    ...n && { getPaginationRowModel: Ll() },
    onSortingChange: l,
    getSortedRowModel: Fl(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Vl(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: p,
    state: {
      sorting: a,
      columnFilters: c,
      columnVisibility: f,
      rowSelection: b
    }
  });
  return /* @__PURE__ */ U("div", { children: [
    o && /* @__PURE__ */ m(zc, { table: h }),
    /* @__PURE__ */ m("div", { className: "pr-twp", children: /* @__PURE__ */ U(ho, { children: [
      /* @__PURE__ */ m(mo, { children: h.getHeaderGroups().map((g) => /* @__PURE__ */ m(Ut, { children: g.headers.map((w) => /* @__PURE__ */ m(Yn, { children: w.isPlaceholder ? void 0 : oi(w.column.columnDef.header, w.getContext()) }, w.id)) }, g.id)) }),
      /* @__PURE__ */ m(go, { children: (d = h.getRowModel().rows) != null && d.length ? h.getRowModel().rows.map((g) => /* @__PURE__ */ m(
        Ut,
        {
          onClick: () => i(g, h),
          "data-state": g.getIsSelected() && "selected",
          children: g.getVisibleCells().map((w) => /* @__PURE__ */ m(xn, { children: oi(w.column.columnDef.cell, w.getContext()) }, w.id))
        },
        g.id
      )) : /* @__PURE__ */ m(Ut, { children: /* @__PURE__ */ m(xn, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ U("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ m(
        Ne,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ m(
        Ne,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ m(Vc, { table: h })
  ] });
}
function ci({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: i = !1,
  width: a,
  options: l = [],
  className: c,
  value: u,
  onChange: f,
  onFocus: v,
  onBlur: b,
  getOptionLabel: p
}) {
  return /* @__PURE__ */ m(
    Ul,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: i,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: f,
      onFocus: v,
      onBlur: b,
      getOptionLabel: p,
      renderInput: (h) => /* @__PURE__ */ m(
        Hl,
        {
          ...h,
          error: o,
          fullWidth: i,
          disabled: n,
          label: t,
          style: { width: a }
        }
      )
    }
  );
}
function Vb({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = fe(1), [a, l] = fe(r), [c, u] = fe(
    Array.from({ length: r }, (b, p) => p + 1)
  );
  Ye(() => {
    i(1), e(1), l(r), t(r), u(Array.from({ length: r }, (b, p) => p + 1));
  }, [r, t, e]);
  const f = (b, p) => {
    i(p), e(p), p > a && (l(p), t(p));
  }, v = (b, p) => {
    l(p), t(p), p < o && (i(p), e(p));
  };
  return /* @__PURE__ */ U(_t, { children: [
    /* @__PURE__ */ m(
      ii,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ m(
          ci,
          {
            onChange: (b, p) => f(b, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (b) => b.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ m(
      ii,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ m(
          ci,
          {
            onChange: (b, p) => v(b, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (b) => b.toString(),
            value: a,
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
function Hc({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Vt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const f = /* @__PURE__ */ m(
    Xl,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: i,
      disabled: a,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: u
    }
  );
  let v;
  if (n) {
    const b = r === Vt.Before || r === Vt.Above, p = /* @__PURE__ */ m("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), h = r === Vt.Before || r === Vt.After, d = h ? p : /* @__PURE__ */ m("div", { children: p }), g = h ? f : /* @__PURE__ */ m("div", { children: f });
    v = /* @__PURE__ */ U(
      Wl,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: a,
        error: l,
        children: [
          b && d,
          g,
          !b && d
        ]
      }
    );
  } else
    v = f;
  return v;
}
function zb({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: a
}) {
  return /* @__PURE__ */ U("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ m("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ m(
      Hc,
      {
        className: "check-item",
        isChecked: o.includes(l),
        labelText: a ? a(l) : l,
        onChange: () => i(l)
      },
      l
    ))
  ] });
}
function he(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function C() {
  return C = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, C.apply(this, arguments);
}
function Wc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Xc(e) {
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
var Wr = { exports: {} }, jn = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pi;
function Gc() {
  if (pi)
    return ce;
  pi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
  function x(y) {
    if (typeof y == "object" && y !== null) {
      var N = y.$$typeof;
      switch (N) {
        case t:
          switch (y = y.type, y) {
            case c:
            case u:
            case r:
            case i:
            case o:
            case v:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case l:
                case f:
                case h:
                case p:
                case a:
                  return y;
                default:
                  return N;
              }
          }
        case n:
          return N;
      }
    }
  }
  function E(y) {
    return x(y) === u;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = u, ce.ContextConsumer = l, ce.ContextProvider = a, ce.Element = t, ce.ForwardRef = f, ce.Fragment = r, ce.Lazy = h, ce.Memo = p, ce.Portal = n, ce.Profiler = i, ce.StrictMode = o, ce.Suspense = v, ce.isAsyncMode = function(y) {
    return E(y) || x(y) === c;
  }, ce.isConcurrentMode = E, ce.isContextConsumer = function(y) {
    return x(y) === l;
  }, ce.isContextProvider = function(y) {
    return x(y) === a;
  }, ce.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, ce.isForwardRef = function(y) {
    return x(y) === f;
  }, ce.isFragment = function(y) {
    return x(y) === r;
  }, ce.isLazy = function(y) {
    return x(y) === h;
  }, ce.isMemo = function(y) {
    return x(y) === p;
  }, ce.isPortal = function(y) {
    return x(y) === n;
  }, ce.isProfiler = function(y) {
    return x(y) === i;
  }, ce.isStrictMode = function(y) {
    return x(y) === o;
  }, ce.isSuspense = function(y) {
    return x(y) === v;
  }, ce.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === r || y === u || y === i || y === o || y === v || y === b || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === a || y.$$typeof === l || y.$$typeof === f || y.$$typeof === g || y.$$typeof === w || y.$$typeof === S || y.$$typeof === d);
  }, ce.typeOf = x, ce;
}
var pe = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ui;
function qc() {
  return ui || (ui = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
    function x(B) {
      return typeof B == "string" || typeof B == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      B === r || B === u || B === i || B === o || B === v || B === b || typeof B == "object" && B !== null && (B.$$typeof === h || B.$$typeof === p || B.$$typeof === a || B.$$typeof === l || B.$$typeof === f || B.$$typeof === g || B.$$typeof === w || B.$$typeof === S || B.$$typeof === d);
    }
    function E(B) {
      if (typeof B == "object" && B !== null) {
        var ne = B.$$typeof;
        switch (ne) {
          case t:
            var M = B.type;
            switch (M) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case v:
                return M;
              default:
                var se = M && M.$$typeof;
                switch (se) {
                  case l:
                  case f:
                  case h:
                  case p:
                  case a:
                    return se;
                  default:
                    return ne;
                }
            }
          case n:
            return ne;
        }
      }
    }
    var y = c, N = u, T = l, _ = a, D = t, j = f, P = r, I = h, A = p, F = n, z = i, R = o, L = v, te = !1;
    function Q(B) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(B) || E(B) === c;
    }
    function O(B) {
      return E(B) === u;
    }
    function $(B) {
      return E(B) === l;
    }
    function V(B) {
      return E(B) === a;
    }
    function q(B) {
      return typeof B == "object" && B !== null && B.$$typeof === t;
    }
    function H(B) {
      return E(B) === f;
    }
    function X(B) {
      return E(B) === r;
    }
    function Y(B) {
      return E(B) === h;
    }
    function K(B) {
      return E(B) === p;
    }
    function G(B) {
      return E(B) === n;
    }
    function Z(B) {
      return E(B) === i;
    }
    function ee(B) {
      return E(B) === o;
    }
    function ae(B) {
      return E(B) === v;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = N, pe.ContextConsumer = T, pe.ContextProvider = _, pe.Element = D, pe.ForwardRef = j, pe.Fragment = P, pe.Lazy = I, pe.Memo = A, pe.Portal = F, pe.Profiler = z, pe.StrictMode = R, pe.Suspense = L, pe.isAsyncMode = Q, pe.isConcurrentMode = O, pe.isContextConsumer = $, pe.isContextProvider = V, pe.isElement = q, pe.isForwardRef = H, pe.isFragment = X, pe.isLazy = Y, pe.isMemo = K, pe.isPortal = G, pe.isProfiler = Z, pe.isStrictMode = ee, pe.isSuspense = ae, pe.isValidElementType = x, pe.typeOf = E;
  }()), pe;
}
var di;
function Ra() {
  return di || (di = 1, process.env.NODE_ENV === "production" ? jn.exports = Gc() : jn.exports = qc()), jn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Nr, fi;
function Yc() {
  if (fi)
    return Nr;
  fi = 1;
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
      for (var a = {}, l = 0; l < 10; l++)
        a["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(a).map(function(f) {
        return a[f];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        u[f] = f;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Nr = o() ? Object.assign : function(i, a) {
    for (var l, c = r(i), u, f = 1; f < arguments.length; f++) {
      l = Object(arguments[f]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        u = e(l);
        for (var b = 0; b < u.length; b++)
          n.call(l, u[b]) && (c[u[b]] = l[u[b]]);
      }
    }
    return c;
  }, Nr;
}
var Or, hi;
function bo() {
  if (hi)
    return Or;
  hi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Or = e, Or;
}
var Cr, mi;
function $a() {
  return mi || (mi = 1, Cr = Function.call.bind(Object.prototype.hasOwnProperty)), Cr;
}
var Sr, gi;
function Kc() {
  if (gi)
    return Sr;
  gi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = bo(), n = {}, r = $a();
    e = function(i) {
      var a = "Warning: " + i;
      typeof console < "u" && console.error(a);
      try {
        throw new Error(a);
      } catch {
      }
    };
  }
  function o(i, a, l, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in i)
        if (r(i, f)) {
          var v;
          try {
            if (typeof i[f] != "function") {
              var b = Error(
                (c || "React class") + ": " + l + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            v = i[f](a, f, c, l, null, t);
          } catch (h) {
            v = h;
          }
          if (v && !(v instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof v + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), v instanceof Error && !(v.message in n)) {
            n[v.message] = !0;
            var p = u ? u() : "";
            e(
              "Failed " + l + " type: " + v.message + (p ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Sr = o, Sr;
}
var Pr, bi;
function Jc() {
  if (bi)
    return Pr;
  bi = 1;
  var e = Ra(), t = Yc(), n = bo(), r = $a(), o = Kc(), i = function() {
  };
  process.env.NODE_ENV !== "production" && (i = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function a() {
    return null;
  }
  return Pr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(O) {
      var $ = O && (u && O[u] || O[f]);
      if (typeof $ == "function")
        return $;
    }
    var b = "<<anonymous>>", p = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: S(),
      arrayOf: x,
      element: E(),
      elementType: y(),
      instanceOf: N,
      node: j(),
      objectOf: _,
      oneOf: T,
      oneOfType: D,
      shape: I,
      exact: A
    };
    function h(O, $) {
      return O === $ ? O !== 0 || 1 / O === 1 / $ : O !== O && $ !== $;
    }
    function d(O, $) {
      this.message = O, this.data = $ && typeof $ == "object" ? $ : {}, this.stack = "";
    }
    d.prototype = Error.prototype;
    function g(O) {
      if (process.env.NODE_ENV !== "production")
        var $ = {}, V = 0;
      function q(X, Y, K, G, Z, ee, ae) {
        if (G = G || b, ee = ee || K, ae !== n) {
          if (c) {
            var B = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw B.name = "Invariant Violation", B;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ne = G + ":" + K;
            !$[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            V < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), $[ne] = !0, V++);
          }
        }
        return Y[K] == null ? X ? Y[K] === null ? new d("The " + Z + " `" + ee + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new d("The " + Z + " `" + ee + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : O(Y, K, G, Z, ee);
      }
      var H = q.bind(null, !1);
      return H.isRequired = q.bind(null, !0), H;
    }
    function w(O) {
      function $(V, q, H, X, Y, K) {
        var G = V[q], Z = R(G);
        if (Z !== O) {
          var ee = L(G);
          return new d(
            "Invalid " + X + " `" + Y + "` of type " + ("`" + ee + "` supplied to `" + H + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return g($);
    }
    function S() {
      return g(a);
    }
    function x(O) {
      function $(V, q, H, X, Y) {
        if (typeof O != "function")
          return new d("Property `" + Y + "` of component `" + H + "` has invalid PropType notation inside arrayOf.");
        var K = V[q];
        if (!Array.isArray(K)) {
          var G = R(K);
          return new d("Invalid " + X + " `" + Y + "` of type " + ("`" + G + "` supplied to `" + H + "`, expected an array."));
        }
        for (var Z = 0; Z < K.length; Z++) {
          var ee = O(K, Z, H, X, Y + "[" + Z + "]", n);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return g($);
    }
    function E() {
      function O($, V, q, H, X) {
        var Y = $[V];
        if (!l(Y)) {
          var K = R(Y);
          return new d("Invalid " + H + " `" + X + "` of type " + ("`" + K + "` supplied to `" + q + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(O);
    }
    function y() {
      function O($, V, q, H, X) {
        var Y = $[V];
        if (!e.isValidElementType(Y)) {
          var K = R(Y);
          return new d("Invalid " + H + " `" + X + "` of type " + ("`" + K + "` supplied to `" + q + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(O);
    }
    function N(O) {
      function $(V, q, H, X, Y) {
        if (!(V[q] instanceof O)) {
          var K = O.name || b, G = Q(V[q]);
          return new d("Invalid " + X + " `" + Y + "` of type " + ("`" + G + "` supplied to `" + H + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return g($);
    }
    function T(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function $(V, q, H, X, Y) {
        for (var K = V[q], G = 0; G < O.length; G++)
          if (h(K, O[G]))
            return null;
        var Z = JSON.stringify(O, function(ae, B) {
          var ne = L(B);
          return ne === "symbol" ? String(B) : B;
        });
        return new d("Invalid " + X + " `" + Y + "` of value `" + String(K) + "` " + ("supplied to `" + H + "`, expected one of " + Z + "."));
      }
      return g($);
    }
    function _(O) {
      function $(V, q, H, X, Y) {
        if (typeof O != "function")
          return new d("Property `" + Y + "` of component `" + H + "` has invalid PropType notation inside objectOf.");
        var K = V[q], G = R(K);
        if (G !== "object")
          return new d("Invalid " + X + " `" + Y + "` of type " + ("`" + G + "` supplied to `" + H + "`, expected an object."));
        for (var Z in K)
          if (r(K, Z)) {
            var ee = O(K, Z, H, X, Y + "." + Z, n);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return g($);
    }
    function D(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var $ = 0; $ < O.length; $++) {
        var V = O[$];
        if (typeof V != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(V) + " at index " + $ + "."
          ), a;
      }
      function q(H, X, Y, K, G) {
        for (var Z = [], ee = 0; ee < O.length; ee++) {
          var ae = O[ee], B = ae(H, X, Y, K, G, n);
          if (B == null)
            return null;
          B.data && r(B.data, "expectedType") && Z.push(B.data.expectedType);
        }
        var ne = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new d("Invalid " + K + " `" + G + "` supplied to " + ("`" + Y + "`" + ne + "."));
      }
      return g(q);
    }
    function j() {
      function O($, V, q, H, X) {
        return F($[V]) ? null : new d("Invalid " + H + " `" + X + "` supplied to " + ("`" + q + "`, expected a ReactNode."));
      }
      return g(O);
    }
    function P(O, $, V, q, H) {
      return new d(
        (O || "React class") + ": " + $ + " type `" + V + "." + q + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + H + "`."
      );
    }
    function I(O) {
      function $(V, q, H, X, Y) {
        var K = V[q], G = R(K);
        if (G !== "object")
          return new d("Invalid " + X + " `" + Y + "` of type `" + G + "` " + ("supplied to `" + H + "`, expected `object`."));
        for (var Z in O) {
          var ee = O[Z];
          if (typeof ee != "function")
            return P(H, X, Y, Z, L(ee));
          var ae = ee(K, Z, H, X, Y + "." + Z, n);
          if (ae)
            return ae;
        }
        return null;
      }
      return g($);
    }
    function A(O) {
      function $(V, q, H, X, Y) {
        var K = V[q], G = R(K);
        if (G !== "object")
          return new d("Invalid " + X + " `" + Y + "` of type `" + G + "` " + ("supplied to `" + H + "`, expected `object`."));
        var Z = t({}, V[q], O);
        for (var ee in Z) {
          var ae = O[ee];
          if (r(O, ee) && typeof ae != "function")
            return P(H, X, Y, ee, L(ae));
          if (!ae)
            return new d(
              "Invalid " + X + " `" + Y + "` key `" + ee + "` supplied to `" + H + "`.\nBad object: " + JSON.stringify(V[q], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var B = ae(K, ee, H, X, Y + "." + ee, n);
          if (B)
            return B;
        }
        return null;
      }
      return g($);
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
          var $ = v(O);
          if ($) {
            var V = $.call(O), q;
            if ($ !== O.entries) {
              for (; !(q = V.next()).done; )
                if (!F(q.value))
                  return !1;
            } else
              for (; !(q = V.next()).done; ) {
                var H = q.value;
                if (H && !F(H[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function z(O, $) {
      return O === "symbol" ? !0 : $ ? $["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && $ instanceof Symbol : !1;
    }
    function R(O) {
      var $ = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : z($, O) ? "symbol" : $;
    }
    function L(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var $ = R(O);
      if ($ === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return $;
    }
    function te(O) {
      var $ = L(O);
      switch ($) {
        case "array":
        case "object":
          return "an " + $;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + $;
        default:
          return $;
      }
    }
    function Q(O) {
      return !O.constructor || !O.constructor.name ? b : O.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Pr;
}
var Rr, vi;
function Zc() {
  if (vi)
    return Rr;
  vi = 1;
  var e = bo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Rr = function() {
    function r(a, l, c, u, f, v) {
      if (v !== e) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
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
  }, Rr;
}
if (process.env.NODE_ENV !== "production") {
  var Qc = Ra(), ep = !0;
  Wr.exports = Jc()(Qc.isElement, ep);
} else
  Wr.exports = Zc()();
var tp = Wr.exports;
const s = /* @__PURE__ */ Wc(tp);
function Zt(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function kt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function _a(e) {
  if (!kt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = _a(e[n]);
  }), t;
}
function it(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? C({}, e) : e;
  return kt(e) && kt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (kt(t[o]) && o in e && kt(e[o]) ? r[o] = it(e[o], t[o], n) : n.clone ? r[o] = kt(t[o]) ? _a(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function np(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ma(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = i.type;
  return typeof c == "function" && !np(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ia = Zt(s.element, Ma);
Ia.isRequired = Zt(s.element.isRequired, Ma);
const Cn = Ia;
function rp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function op(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !rp(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ip = Zt(s.elementType, op), ap = "exact-prop: ​";
function Aa(e) {
  return process.env.NODE_ENV === "production" ? e : C({}, e, {
    [ap]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Wt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Xr = { exports: {} }, ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var yi;
function sp() {
  if (yi)
    return ue;
  yi = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function d(g) {
    if (typeof g == "object" && g !== null) {
      var w = g.$$typeof;
      switch (w) {
        case e:
          switch (g = g.type, g) {
            case n:
            case o:
            case r:
            case u:
            case f:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case a:
                case c:
                case b:
                case v:
                case i:
                  return g;
                default:
                  return w;
              }
          }
        case t:
          return w;
      }
    }
  }
  return ue.ContextConsumer = a, ue.ContextProvider = i, ue.Element = e, ue.ForwardRef = c, ue.Fragment = n, ue.Lazy = b, ue.Memo = v, ue.Portal = t, ue.Profiler = o, ue.StrictMode = r, ue.Suspense = u, ue.SuspenseList = f, ue.isAsyncMode = function() {
    return !1;
  }, ue.isConcurrentMode = function() {
    return !1;
  }, ue.isContextConsumer = function(g) {
    return d(g) === a;
  }, ue.isContextProvider = function(g) {
    return d(g) === i;
  }, ue.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, ue.isForwardRef = function(g) {
    return d(g) === c;
  }, ue.isFragment = function(g) {
    return d(g) === n;
  }, ue.isLazy = function(g) {
    return d(g) === b;
  }, ue.isMemo = function(g) {
    return d(g) === v;
  }, ue.isPortal = function(g) {
    return d(g) === t;
  }, ue.isProfiler = function(g) {
    return d(g) === o;
  }, ue.isStrictMode = function(g) {
    return d(g) === r;
  }, ue.isSuspense = function(g) {
    return d(g) === u;
  }, ue.isSuspenseList = function(g) {
    return d(g) === f;
  }, ue.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === n || g === o || g === r || g === u || g === f || g === p || typeof g == "object" && g !== null && (g.$$typeof === b || g.$$typeof === v || g.$$typeof === i || g.$$typeof === a || g.$$typeof === c || g.$$typeof === h || g.getModuleId !== void 0);
  }, ue.typeOf = d, ue;
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
var wi;
function lp() {
  return wi || (wi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, d = !1, g = !1, w = !1, S = !1, x;
    x = Symbol.for("react.module.reference");
    function E(M) {
      return !!(typeof M == "string" || typeof M == "function" || M === n || M === o || S || M === r || M === u || M === f || w || M === p || h || d || g || typeof M == "object" && M !== null && (M.$$typeof === b || M.$$typeof === v || M.$$typeof === i || M.$$typeof === a || M.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      M.$$typeof === x || M.getModuleId !== void 0));
    }
    function y(M) {
      if (typeof M == "object" && M !== null) {
        var se = M.$$typeof;
        switch (se) {
          case e:
            var ke = M.type;
            switch (ke) {
              case n:
              case o:
              case r:
              case u:
              case f:
                return ke;
              default:
                var Pe = ke && ke.$$typeof;
                switch (Pe) {
                  case l:
                  case a:
                  case c:
                  case b:
                  case v:
                  case i:
                    return Pe;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var N = a, T = i, _ = e, D = c, j = n, P = b, I = v, A = t, F = o, z = r, R = u, L = f, te = !1, Q = !1;
    function O(M) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function $(M) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function V(M) {
      return y(M) === a;
    }
    function q(M) {
      return y(M) === i;
    }
    function H(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function X(M) {
      return y(M) === c;
    }
    function Y(M) {
      return y(M) === n;
    }
    function K(M) {
      return y(M) === b;
    }
    function G(M) {
      return y(M) === v;
    }
    function Z(M) {
      return y(M) === t;
    }
    function ee(M) {
      return y(M) === o;
    }
    function ae(M) {
      return y(M) === r;
    }
    function B(M) {
      return y(M) === u;
    }
    function ne(M) {
      return y(M) === f;
    }
    de.ContextConsumer = N, de.ContextProvider = T, de.Element = _, de.ForwardRef = D, de.Fragment = j, de.Lazy = P, de.Memo = I, de.Portal = A, de.Profiler = F, de.StrictMode = z, de.Suspense = R, de.SuspenseList = L, de.isAsyncMode = O, de.isConcurrentMode = $, de.isContextConsumer = V, de.isContextProvider = q, de.isElement = H, de.isForwardRef = X, de.isFragment = Y, de.isLazy = K, de.isMemo = G, de.isPortal = Z, de.isProfiler = ee, de.isStrictMode = ae, de.isSuspense = B, de.isSuspenseList = ne, de.isValidElementType = E, de.typeOf = y;
  }()), de;
}
process.env.NODE_ENV === "production" ? Xr.exports = sp() : Xr.exports = lp();
var Zn = Xr.exports;
const cp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function pp(e) {
  const t = `${e}`.match(cp);
  return t && t[1] || "";
}
function Da(e, t = "") {
  return e.displayName || e.name || pp(e) || t;
}
function xi(e, t, n) {
  const r = Da(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function up(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Da(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Zn.ForwardRef:
          return xi(e, e.render, "ForwardRef");
        case Zn.Memo:
          return xi(e, e.type, "memo");
        default:
          return;
      }
  }
}
function at(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const dp = s.oneOfType([s.func, s.object]), vo = dp;
function Je(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Wt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Gr(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Ba(e, t = 166) {
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
function fp(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, a) => {
    const l = o || "<<anonymous>>", c = a || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function hp(e, t) {
  var n, r;
  return /* @__PURE__ */ k.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Ce(e) {
  return e && e.ownerDocument || document;
}
function Xt(e) {
  return Ce(e).defaultView || window;
}
function mp(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? C({}, t.propTypes) : null;
  return (o) => (i, a, l, c, u, ...f) => {
    const v = u || a, b = n == null ? void 0 : n[v];
    if (b) {
      const p = b(i, a, l, c, u, ...f);
      if (p)
        return p;
    }
    return typeof i[a] < "u" && !i[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Qn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const gp = typeof window < "u" ? k.useLayoutEffect : k.useEffect, St = gp;
let Ei = 0;
function bp(e) {
  const [t, n] = k.useState(e), r = e || t;
  return k.useEffect(() => {
    t == null && (Ei += 1, n(`mui-${Ei}`));
  }, [t]), r;
}
const ki = k["useId".toString()];
function ja(e) {
  if (ki !== void 0) {
    const t = ki();
    return e ?? t;
  }
  return bp(e);
}
function vp(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function La({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = k.useRef(e !== void 0), [i, a] = k.useState(t), l = o ? e : i;
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
    o || a(u);
  }, []);
  return [l, c];
}
function En(e) {
  const t = k.useRef(e);
  return St(() => {
    t.current = e;
  }), k.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function He(...e) {
  return k.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Qn(n, t);
    });
  }, e);
}
const Ti = {};
function yp(e, t) {
  const n = k.useRef(Ti);
  return n.current === Ti && (n.current = e(t)), n;
}
const wp = [];
function xp(e) {
  k.useEffect(e, wp);
}
class Sn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Sn();
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
  const e = yp(Sn.create).current;
  return xp(e.disposeEffect), e;
}
let lr = !0, qr = !1;
const Ep = new Sn(), kp = {
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
function Tp(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && kp[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Np(e) {
  e.metaKey || e.altKey || e.ctrlKey || (lr = !0);
}
function $r() {
  lr = !1;
}
function Op() {
  this.visibilityState === "hidden" && qr && (lr = !0);
}
function Cp(e) {
  e.addEventListener("keydown", Np, !0), e.addEventListener("mousedown", $r, !0), e.addEventListener("pointerdown", $r, !0), e.addEventListener("touchstart", $r, !0), e.addEventListener("visibilitychange", Op, !0);
}
function Sp(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return lr || Tp(t);
}
function Fa() {
  const e = k.useCallback((o) => {
    o != null && Cp(o.ownerDocument);
  }, []), t = k.useRef(!1);
  function n() {
    return t.current ? (qr = !0, Ep.start(100, () => {
      qr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Sp(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Va(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Pp(e) {
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
function Rp(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const $p = Number.isInteger || Rp;
function za(e, t, n, r) {
  const o = e[t];
  if (o == null || !$p(o)) {
    const i = Pp(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Ua(e, t, ...n) {
  return e[t] === void 0 ? null : za(e, t, ...n);
}
function Yr() {
  return null;
}
Ua.isRequired = za;
Yr.isRequired = Yr;
const Ha = process.env.NODE_ENV === "production" ? Yr : Ua;
function Wa(e, t) {
  const n = C({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = C({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = C({}, i), Object.keys(o).forEach((a) => {
        n[r][a] = Wa(o[a], i[a]);
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
      r[o] = e[o].reduce((i, a) => {
        if (a) {
          const l = t(a);
          l !== "" && i.push(l), n && n[a] && i.push(n[a]);
        }
        return i;
      }, []).join(" ");
    }
  ), r;
}
const Ni = (e) => e, _p = () => {
  let e = Ni;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ni;
    }
  };
}, Mp = _p(), Xa = Mp, Ga = {
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
function Qe(e, t, n = "Mui") {
  const r = Ga[t];
  return r ? `${n}-${r}` : `${Xa.generate(e)}-${t}`;
}
function mt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Qe(e, o, n);
  }), r;
}
function Ip(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function qa(e) {
  return typeof e == "string";
}
function hn(e, t, n) {
  return e === void 0 || qa(e) ? t : C({}, t, {
    ownerState: C({}, t.ownerState, n)
  });
}
const Ap = {
  disableDefaultClasses: !1
}, Dp = /* @__PURE__ */ k.createContext(Ap);
function Bp(e) {
  const {
    disableDefaultClasses: t
  } = k.useContext(Dp);
  return (n) => t ? "" : e(n);
}
function Ya(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function jp(e, t, n) {
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
function Lp(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const p = Oe(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = C({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = C({}, n, o, r);
    return p.length > 0 && (d.className = p), Object.keys(h).length > 0 && (d.style = h), {
      props: d,
      internalRef: void 0
    };
  }
  const a = Ya(C({}, o, r)), l = Oi(r), c = Oi(o), u = t(a), f = Oe(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = C({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), b = C({}, u, n, c, l);
  return f.length > 0 && (b.className = f), Object.keys(v).length > 0 && (b.style = v), {
    props: b,
    internalRef: u.ref
  };
}
const Fp = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Pt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = he(e, Fp), l = i ? {} : jp(r, o), {
    props: c,
    internalRef: u
  } = Lp(C({}, a, {
    externalSlotProps: l
  })), f = He(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return hn(n, C({}, c, {
    ref: f
  }), o);
}
const Ka = "base";
function Vp(e) {
  return `${Ka}--${e}`;
}
function zp(e, t) {
  return `${Ka}-${e}-${t}`;
}
function Ja(e, t) {
  const n = Ga[t];
  return n ? Vp(n) : zp(e, t);
}
function Up(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ja(e, r);
  }), n;
}
const Hp = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Wp(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Xp(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Gp(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Xp(e));
}
function qp(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Hp)).forEach((r, o) => {
    const i = Wp(r);
    i === -1 || !Gp(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Yp() {
  return !0;
}
function er(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = qp,
    isEnabled: a = Yp,
    open: l
  } = e, c = k.useRef(!1), u = k.useRef(null), f = k.useRef(null), v = k.useRef(null), b = k.useRef(null), p = k.useRef(!1), h = k.useRef(null), d = He(t.ref, h), g = k.useRef(null);
  k.useEffect(() => {
    !l || !h.current || (p.current = !n);
  }, [n, l]), k.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Ce(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), k.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Ce(h.current), E = (T) => {
      g.current = T, !(r || !a() || T.key !== "Tab") && x.activeElement === h.current && T.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const T = h.current;
      if (T === null)
        return;
      if (!x.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (T.contains(x.activeElement) || r && x.activeElement !== u.current && x.activeElement !== f.current)
        return;
      if (x.activeElement !== b.current)
        b.current = null;
      else if (b.current !== null)
        return;
      if (!p.current)
        return;
      let _ = [];
      if ((x.activeElement === u.current || x.activeElement === f.current) && (_ = i(h.current)), _.length > 0) {
        var D, j;
        const P = !!((D = g.current) != null && D.shiftKey && ((j = g.current) == null ? void 0 : j.key) === "Tab"), I = _[0], A = _[_.length - 1];
        typeof I != "string" && typeof A != "string" && (P ? A.focus() : I.focus());
      } else
        T.focus();
    };
    x.addEventListener("focusin", y), x.addEventListener("keydown", E, !0);
    const N = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(N), x.removeEventListener("focusin", y), x.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, a, l, i]);
  const w = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0, b.current = x.target;
    const E = t.props.onFocus;
    E && E(x);
  }, S = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ U(k.Fragment, {
    children: [/* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: S,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ k.cloneElement(t, {
      ref: d,
      onFocus: w
    }), /* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: S,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (er.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Cn,
  /**
   * If `true`, the focus trap will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any focus trap children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the focus trap will not prevent focus from leaving the focus trap while open.
   *
   * Generally this should never be set to `true` as it makes the focus trap less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, the focus trap will not restore focus to previously focused element once
   * focus trap is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Returns an array of ordered tabbable nodes (i.e. in tab order) within the root.
   * For instance, you can provide the "tabbable" npm dependency.
   * @param {HTMLElement} root
   */
  getTabbable: s.func,
  /**
   * This prop extends the `open` prop.
   * It allows to toggle the open state without having to wait for a rerender when changing the `open` prop.
   * This prop should be memoized.
   * It can be used to support multiple focus trap mounted at the same time.
   * @default function defaultIsEnabled(): boolean {
   *   return true;
   * }
   */
  isEnabled: s.func,
  /**
   * If `true`, focus is locked.
   */
  open: s.bool.isRequired
});
process.env.NODE_ENV !== "production" && (er["propTypes"] = Aa(er.propTypes));
function Kp(e) {
  return typeof e == "function" ? e() : e;
}
const kn = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = k.useState(null), c = He(/* @__PURE__ */ k.isValidElement(r) ? r.ref : null, n);
  if (St(() => {
    i || l(Kp(o) || document.body);
  }, [o, i]), St(() => {
    if (a && !i)
      return Qn(n, a), () => {
        Qn(n, null);
      };
  }, [n, a, i]), i) {
    if (/* @__PURE__ */ k.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ k.cloneElement(r, u);
    }
    return /* @__PURE__ */ m(k.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ m(k.Fragment, {
    children: a && /* @__PURE__ */ ac.createPortal(r, a)
  });
});
process.env.NODE_ENV !== "production" && (kn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: s.node,
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
  container: s.oneOfType([at, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (kn["propTypes"] = Aa(kn.propTypes));
function Jp(e) {
  const t = Ce(e);
  return t.body === e ? Xt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function bn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ci(e) {
  return parseInt(Xt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Zp(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Si(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !Zp(a);
    l && c && bn(a, o);
  });
}
function _r(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Qp(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Jp(r)) {
      const a = Va(Ce(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ci(r) + a}px`;
      const l = Ce(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Ci(c) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Ce(r).body;
    else {
      const a = r.parentElement, l = Xt(r);
      i = (a == null ? void 0 : a.nodeName) === "HTML" && l.getComputedStyle(a).overflowY === "scroll" ? a : r;
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
      el: a,
      property: l
    }) => {
      i ? a.style.setProperty(l, i) : a.style.removeProperty(l);
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
    r = this.modals.length, this.modals.push(t), t.modalRef && bn(t.modalRef, !1);
    const o = eu(n);
    Si(n, t.mount, t.modalRef, o, !0);
    const i = _r(this.containers, (a) => a.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = _r(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Qp(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = _r(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && bn(t.modalRef, n), Si(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && bn(a.modalRef, !1);
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
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: f,
    rootRef: v
  } = e, b = k.useRef({}), p = k.useRef(null), h = k.useRef(null), d = He(h, v), [g, w] = k.useState(!f), S = ru(c);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const E = () => Ce(p.current), y = () => (b.current.modalRef = h.current, b.current.mount = p.current, b.current), N = () => {
    o.mount(y(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, T = En(() => {
    const R = nu(t) || E().body;
    o.add(y(), R), h.current && N();
  }), _ = k.useCallback(() => o.isTopModal(y()), [o]), D = En((R) => {
    p.current = R, R && (f && _() ? N() : h.current && bn(h.current, x));
  }), j = k.useCallback(() => {
    o.remove(y(), x);
  }, [x, o]);
  k.useEffect(() => () => {
    j();
  }, [j]), k.useEffect(() => {
    f ? T() : (!S || !i) && j();
  }, [f, j, S, i, T]);
  const P = (R) => (L) => {
    var te;
    (te = R.onKeyDown) == null || te.call(R, L), !(L.key !== "Escape" || L.which === 229 || // Wait until IME is settled.
    !_()) && (n || (L.stopPropagation(), u && u(L, "escapeKeyDown")));
  }, I = (R) => (L) => {
    var te;
    (te = R.onClick) == null || te.call(R, L), L.target === L.currentTarget && u && u(L, "backdropClick");
  };
  return {
    getRootProps: (R = {}) => {
      const L = Ya(e);
      delete L.onTransitionEnter, delete L.onTransitionExited;
      const te = C({}, L, R);
      return C({
        role: "presentation"
      }, te, {
        onKeyDown: P(te),
        ref: d
      });
    },
    getBackdropProps: (R = {}) => {
      const L = R;
      return C({
        "aria-hidden": !0
      }, L, {
        onClick: I(L),
        open: f
      });
    },
    getTransitionProps: () => {
      const R = () => {
        w(!1), a && a();
      }, L = () => {
        w(!0), l && l(), i && j();
      };
      return {
        onEnter: Gr(R, c == null ? void 0 : c.props.onEnter),
        onExited: Gr(L, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: d,
    portalRef: D,
    isTopModal: _,
    exited: g,
    hasTransition: S
  };
}
var Me = "top", We = "bottom", Xe = "right", Ie = "left", yo = "auto", Pn = [Me, We, Xe, Ie], Gt = "start", Tn = "end", au = "clippingParents", Za = "viewport", sn = "popper", su = "reference", Pi = /* @__PURE__ */ Pn.reduce(function(e, t) {
  return e.concat([t + "-" + Gt, t + "-" + Tn]);
}, []), Qa = /* @__PURE__ */ [].concat(Pn, [yo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Gt, t + "-" + Tn]);
}, []), lu = "beforeRead", cu = "read", pu = "afterRead", uu = "beforeMain", du = "main", fu = "afterMain", hu = "beforeWrite", mu = "write", gu = "afterWrite", bu = [lu, cu, pu, uu, du, fu, hu, mu, gu];
function Ze(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Fe(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Rt(e) {
  var t = Fe(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ue(e) {
  var t = Fe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function wo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Fe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function vu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ue(i) || !Ze(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
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
      var o = t.elements[r], i = t.attributes[r] || {}, a = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = a.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Ue(o) || !Ze(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
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
function Ke(e) {
  return e.split("-")[0];
}
var Ot = Math.max, tr = Math.min, qt = Math.round;
function Kr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function es() {
  return !/^((?!chrome|android).)*safari/i.test(Kr());
}
function Yt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ue(e) && (o = e.offsetWidth > 0 && qt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && qt(r.height) / e.offsetHeight || 1);
  var a = Rt(e) ? Fe(e) : window, l = a.visualViewport, c = !es() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, f = (r.top + (c && l ? l.offsetTop : 0)) / i, v = r.width / o, b = r.height / i;
  return {
    width: v,
    height: b,
    top: f,
    right: u + v,
    bottom: f + b,
    left: u,
    x: u,
    y: f
  };
}
function xo(e) {
  var t = Yt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ts(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && wo(n)) {
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
  return Fe(e).getComputedStyle(e);
}
function xu(e) {
  return ["table", "td", "th"].indexOf(Ze(e)) >= 0;
}
function gt(e) {
  return ((Rt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function cr(e) {
  return Ze(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (wo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    gt(e)
  );
}
function Ri(e) {
  return !Ue(e) || // https://github.com/popperjs/popper-core/issues/837
  st(e).position === "fixed" ? null : e.offsetParent;
}
function Eu(e) {
  var t = /firefox/i.test(Kr()), n = /Trident/i.test(Kr());
  if (n && Ue(e)) {
    var r = st(e);
    if (r.position === "fixed")
      return null;
  }
  var o = cr(e);
  for (wo(o) && (o = o.host); Ue(o) && ["html", "body"].indexOf(Ze(o)) < 0; ) {
    var i = st(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Rn(e) {
  for (var t = Fe(e), n = Ri(e); n && xu(n) && st(n).position === "static"; )
    n = Ri(n);
  return n && (Ze(n) === "html" || Ze(n) === "body" && st(n).position === "static") ? t : n || Eu(e) || t;
}
function Eo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function vn(e, t, n) {
  return Ot(e, tr(t, n));
}
function ku(e, t, n) {
  var r = vn(e, t, n);
  return r > n ? n : r;
}
function ns() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function rs(e) {
  return Object.assign({}, ns(), e);
}
function os(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Tu = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, rs(typeof t != "number" ? t : os(t, Pn));
};
function Nu(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, l = Ke(n.placement), c = Eo(l), u = [Ie, Xe].indexOf(l) >= 0, f = u ? "height" : "width";
  if (!(!i || !a)) {
    var v = Tu(o.padding, n), b = xo(i), p = c === "y" ? Me : Ie, h = c === "y" ? We : Xe, d = n.rects.reference[f] + n.rects.reference[c] - a[c] - n.rects.popper[f], g = a[c] - n.rects.reference[c], w = Rn(i), S = w ? c === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = d / 2 - g / 2, E = v[p], y = S - b[f] - v[h], N = S / 2 - b[f] / 2 + x, T = vn(E, N, y), _ = c;
    n.modifiersData[r] = (t = {}, t[_] = T, t.centerOffset = T - N, t);
  }
}
function Ou(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ts(t.elements.popper, o) && (t.elements.arrow = o));
}
const Cu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Nu,
  effect: Ou,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Kt(e) {
  return e.split("-")[1];
}
var Su = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Pu(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: qt(n * o) / o || 0,
    y: qt(r * o) / o || 0
  };
}
function $i(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, f = e.roundOffsets, v = e.isFixed, b = a.x, p = b === void 0 ? 0 : b, h = a.y, d = h === void 0 ? 0 : h, g = typeof f == "function" ? f({
    x: p,
    y: d
  }) : {
    x: p,
    y: d
  };
  p = g.x, d = g.y;
  var w = a.hasOwnProperty("x"), S = a.hasOwnProperty("y"), x = Ie, E = Me, y = window;
  if (u) {
    var N = Rn(n), T = "clientHeight", _ = "clientWidth";
    if (N === Fe(n) && (N = gt(n), st(N).position !== "static" && l === "absolute" && (T = "scrollHeight", _ = "scrollWidth")), N = N, o === Me || (o === Ie || o === Xe) && i === Tn) {
      E = We;
      var D = v && N === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[T]
      );
      d -= D - r.height, d *= c ? 1 : -1;
    }
    if (o === Ie || (o === Me || o === We) && i === Tn) {
      x = Xe;
      var j = v && N === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[_]
      );
      p -= j - r.width, p *= c ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: l
  }, u && Su), I = f === !0 ? Pu({
    x: p,
    y: d
  }, Fe(n)) : {
    x: p,
    y: d
  };
  if (p = I.x, d = I.y, c) {
    var A;
    return Object.assign({}, P, (A = {}, A[E] = S ? "0" : "", A[x] = w ? "0" : "", A.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + d + "px)" : "translate3d(" + p + "px, " + d + "px, 0)", A));
  }
  return Object.assign({}, P, (t = {}, t[E] = S ? d + "px" : "", t[x] = w ? p + "px" : "", t.transform = "", t));
}
function Ru(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, a = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ke(t.placement),
    variation: Kt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, $i(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: a,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, $i(Object.assign({}, u, {
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
var Ln = {
  passive: !0
};
function _u(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, c = Fe(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(f) {
    f.addEventListener("scroll", n.update, Ln);
  }), l && c.addEventListener("resize", n.update, Ln), function() {
    i && u.forEach(function(f) {
      f.removeEventListener("scroll", n.update, Ln);
    }), l && c.removeEventListener("resize", n.update, Ln);
  };
}
const Mu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: _u,
  data: {}
};
var Iu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Hn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Iu[t];
  });
}
var Au = {
  start: "end",
  end: "start"
};
function _i(e) {
  return e.replace(/start|end/g, function(t) {
    return Au[t];
  });
}
function ko(e) {
  var t = Fe(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function To(e) {
  return Yt(gt(e)).left + ko(e).scrollLeft;
}
function Du(e, t) {
  var n = Fe(e), r = gt(e), o = n.visualViewport, i = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    var u = es();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + To(e),
    y: c
  };
}
function Bu(e) {
  var t, n = gt(e), r = ko(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = Ot(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = Ot(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + To(e), c = -r.scrollTop;
  return st(o || n).direction === "rtl" && (l += Ot(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function No(e) {
  var t = st(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function is(e) {
  return ["html", "body", "#document"].indexOf(Ze(e)) >= 0 ? e.ownerDocument.body : Ue(e) && No(e) ? e : is(cr(e));
}
function yn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = is(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Fe(r), a = o ? [i].concat(i.visualViewport || [], No(r) ? r : []) : r, l = t.concat(a);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(yn(cr(a)))
  );
}
function Jr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function ju(e, t) {
  var n = Yt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Mi(e, t, n) {
  return t === Za ? Jr(Du(e, n)) : Rt(t) ? ju(t, n) : Jr(Bu(gt(e)));
}
function Lu(e) {
  var t = yn(cr(e)), n = ["absolute", "fixed"].indexOf(st(e).position) >= 0, r = n && Ue(e) ? Rn(e) : e;
  return Rt(r) ? t.filter(function(o) {
    return Rt(o) && ts(o, r) && Ze(o) !== "body";
  }) : [];
}
function Fu(e, t, n, r) {
  var o = t === "clippingParents" ? Lu(e) : [].concat(t), i = [].concat(o, [n]), a = i[0], l = i.reduce(function(c, u) {
    var f = Mi(e, u, r);
    return c.top = Ot(f.top, c.top), c.right = tr(f.right, c.right), c.bottom = tr(f.bottom, c.bottom), c.left = Ot(f.left, c.left), c;
  }, Mi(e, a, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function as(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ke(r) : null, i = r ? Kt(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Me:
      c = {
        x: a,
        y: t.y - n.height
      };
      break;
    case We:
      c = {
        x: a,
        y: t.y + t.height
      };
      break;
    case Xe:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Ie:
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
  var u = o ? Eo(o) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (i) {
      case Gt:
        c[u] = c[u] - (t[f] / 2 - n[f] / 2);
        break;
      case Tn:
        c[u] = c[u] + (t[f] / 2 - n[f] / 2);
        break;
    }
  }
  return c;
}
function Nn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, a = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? au : l, u = n.rootBoundary, f = u === void 0 ? Za : u, v = n.elementContext, b = v === void 0 ? sn : v, p = n.altBoundary, h = p === void 0 ? !1 : p, d = n.padding, g = d === void 0 ? 0 : d, w = rs(typeof g != "number" ? g : os(g, Pn)), S = b === sn ? su : sn, x = e.rects.popper, E = e.elements[h ? S : b], y = Fu(Rt(E) ? E : E.contextElement || gt(e.elements.popper), c, f, a), N = Yt(e.elements.reference), T = as({
    reference: N,
    element: x,
    strategy: "absolute",
    placement: o
  }), _ = Jr(Object.assign({}, x, T)), D = b === sn ? _ : N, j = {
    top: y.top - D.top + w.top,
    bottom: D.bottom - y.bottom + w.bottom,
    left: y.left - D.left + w.left,
    right: D.right - y.right + w.right
  }, P = e.modifiersData.offset;
  if (b === sn && P) {
    var I = P[o];
    Object.keys(j).forEach(function(A) {
      var F = [Xe, We].indexOf(A) >= 0 ? 1 : -1, z = [Me, We].indexOf(A) >= 0 ? "y" : "x";
      j[A] += I[z] * F;
    });
  }
  return j;
}
function Vu(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? Qa : c, f = Kt(r), v = f ? l ? Pi : Pi.filter(function(h) {
    return Kt(h) === f;
  }) : Pn, b = v.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  b.length === 0 && (b = v);
  var p = b.reduce(function(h, d) {
    return h[d] = Nn(e, {
      placement: d,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[Ke(d)], h;
  }, {});
  return Object.keys(p).sort(function(h, d) {
    return p[h] - p[d];
  });
}
function zu(e) {
  if (Ke(e) === yo)
    return [];
  var t = Hn(e);
  return [_i(e), t, _i(t)];
}
function Uu(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, c = n.fallbackPlacements, u = n.padding, f = n.boundary, v = n.rootBoundary, b = n.altBoundary, p = n.flipVariations, h = p === void 0 ? !0 : p, d = n.allowedAutoPlacements, g = t.options.placement, w = Ke(g), S = w === g, x = c || (S || !h ? [Hn(g)] : zu(g)), E = [g].concat(x).reduce(function(H, X) {
      return H.concat(Ke(X) === yo ? Vu(t, {
        placement: X,
        boundary: f,
        rootBoundary: v,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: d
      }) : X);
    }, []), y = t.rects.reference, N = t.rects.popper, T = /* @__PURE__ */ new Map(), _ = !0, D = E[0], j = 0; j < E.length; j++) {
      var P = E[j], I = Ke(P), A = Kt(P) === Gt, F = [Me, We].indexOf(I) >= 0, z = F ? "width" : "height", R = Nn(t, {
        placement: P,
        boundary: f,
        rootBoundary: v,
        altBoundary: b,
        padding: u
      }), L = F ? A ? Xe : Ie : A ? We : Me;
      y[z] > N[z] && (L = Hn(L));
      var te = Hn(L), Q = [];
      if (i && Q.push(R[I] <= 0), l && Q.push(R[L] <= 0, R[te] <= 0), Q.every(function(H) {
        return H;
      })) {
        D = P, _ = !1;
        break;
      }
      T.set(P, Q);
    }
    if (_)
      for (var O = h ? 3 : 1, $ = function(X) {
        var Y = E.find(function(K) {
          var G = T.get(K);
          if (G)
            return G.slice(0, X).every(function(Z) {
              return Z;
            });
        });
        if (Y)
          return D = Y, "break";
      }, V = O; V > 0; V--) {
        var q = $(V);
        if (q === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
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
function Ii(e, t, n) {
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
function Ai(e) {
  return [Me, Xe, We, Ie].some(function(t) {
    return e[t] >= 0;
  });
}
function Wu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = Nn(t, {
    elementContext: "reference"
  }), l = Nn(t, {
    altBoundary: !0
  }), c = Ii(a, r), u = Ii(l, o, i), f = Ai(c), v = Ai(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: f,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": v
  });
}
const Xu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Wu
};
function Gu(e, t, n) {
  var r = Ke(e), o = [Ie, Me].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [Ie, Xe].indexOf(r) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function qu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = Qa.reduce(function(f, v) {
    return f[v] = Gu(v, t.rects, i), f;
  }, {}), l = a[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const Yu = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: qu
};
function Ku(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = as({
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
  fn: Ku,
  data: {}
};
function Zu(e) {
  return e === "x" ? "y" : "x";
}
function Qu(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, c = n.boundary, u = n.rootBoundary, f = n.altBoundary, v = n.padding, b = n.tether, p = b === void 0 ? !0 : b, h = n.tetherOffset, d = h === void 0 ? 0 : h, g = Nn(t, {
    boundary: c,
    rootBoundary: u,
    padding: v,
    altBoundary: f
  }), w = Ke(t.placement), S = Kt(t.placement), x = !S, E = Eo(w), y = Zu(E), N = t.modifiersData.popperOffsets, T = t.rects.reference, _ = t.rects.popper, D = typeof d == "function" ? d(Object.assign({}, t.rects, {
    placement: t.placement
  })) : d, j = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, I = {
    x: 0,
    y: 0
  };
  if (N) {
    if (i) {
      var A, F = E === "y" ? Me : Ie, z = E === "y" ? We : Xe, R = E === "y" ? "height" : "width", L = N[E], te = L + g[F], Q = L - g[z], O = p ? -_[R] / 2 : 0, $ = S === Gt ? T[R] : _[R], V = S === Gt ? -_[R] : -T[R], q = t.elements.arrow, H = p && q ? xo(q) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ns(), Y = X[F], K = X[z], G = vn(0, T[R], H[R]), Z = x ? T[R] / 2 - O - G - Y - j.mainAxis : $ - G - Y - j.mainAxis, ee = x ? -T[R] / 2 + O + G + K + j.mainAxis : V + G + K + j.mainAxis, ae = t.elements.arrow && Rn(t.elements.arrow), B = ae ? E === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, ne = (A = P == null ? void 0 : P[E]) != null ? A : 0, M = L + Z - ne - B, se = L + ee - ne, ke = vn(p ? tr(te, M) : te, L, p ? Ot(Q, se) : Q);
      N[E] = ke, I[E] = ke - L;
    }
    if (l) {
      var Pe, xe = E === "x" ? Me : Ie, vt = E === "x" ? We : Xe, Re = N[y], et = y === "y" ? "height" : "width", De = Re + g[xe], tt = Re - g[vt], Te = [Me, Ie].indexOf(w) !== -1, Mt = (Pe = P == null ? void 0 : P[y]) != null ? Pe : 0, yt = Te ? De : Re - T[et] - _[et] - Mt + j.altAxis, Qt = Te ? Re + T[et] + _[et] - Mt - j.altAxis : tt, In = p && Te ? ku(yt, Re, Qt) : vn(p ? yt : De, Re, p ? Qt : tt);
      N[y] = In, I[y] = In - Re;
    }
    t.modifiersData[r] = I;
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
  return e === Fe(e) || !Ue(e) ? ko(e) : td(e);
}
function rd(e) {
  var t = e.getBoundingClientRect(), n = qt(t.width) / e.offsetWidth || 1, r = qt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function od(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ue(t), o = Ue(t) && rd(t), i = gt(t), a = Yt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Ze(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  No(i)) && (l = nd(t)), Ue(t) ? (c = Yt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = To(i))), {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function id(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(i) {
    t.set(i.name, i);
  });
  function o(i) {
    n.add(i.name);
    var a = [].concat(i.requires || [], i.requiresIfExists || []);
    a.forEach(function(l) {
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
var Di = {
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
function cd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, i = o === void 0 ? Di : o;
  return function(l, c, u) {
    u === void 0 && (u = i);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Di, i),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, v = [], b = !1, p = {
      state: f,
      setOptions: function(w) {
        var S = typeof w == "function" ? w(f.options) : w;
        d(), f.options = Object.assign({}, i, f.options, S), f.scrollParents = {
          reference: Rt(l) ? yn(l) : l.contextElement ? yn(l.contextElement) : [],
          popper: yn(c)
        };
        var x = ad(ld([].concat(r, f.options.modifiers)));
        return f.orderedModifiers = x.filter(function(E) {
          return E.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var w = f.elements, S = w.reference, x = w.popper;
          if (Bi(S, x)) {
            f.rects = {
              reference: od(S, Rn(x), f.options.strategy === "fixed"),
              popper: xo(x)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(j) {
              return f.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], N = y.fn, T = y.options, _ = T === void 0 ? {} : T, D = y.name;
              typeof N == "function" && (f = N({
                state: f,
                options: _,
                name: D,
                instance: p
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: sd(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(f);
        });
      }),
      destroy: function() {
        d(), b = !0;
      }
    };
    if (!Bi(l, c))
      return p;
    p.setOptions(u).then(function(g) {
      !b && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function h() {
      f.orderedModifiers.forEach(function(g) {
        var w = g.name, S = g.options, x = S === void 0 ? {} : S, E = g.effect;
        if (typeof E == "function") {
          var y = E({
            state: f,
            name: w,
            instance: p,
            options: x
          }), N = function() {
          };
          v.push(y || N);
        }
      });
    }
    function d() {
      v.forEach(function(g) {
        return g();
      }), v = [];
    }
    return p;
  };
}
var pd = [Mu, Ju, $u, wu, Yu, Hu, ed, Cu, Xu], ud = /* @__PURE__ */ cd({
  defaultModifiers: pd
});
const ss = "Popper";
function dd(e) {
  return Ja(ss, e);
}
Up(ss, ["root"]);
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
function nr(e) {
  return typeof e == "function" ? e() : e;
}
function pr(e) {
  return e.nodeType !== void 0;
}
function gd(e) {
  return !pr(e);
}
const bd = () => ct({
  root: ["root"]
}, Bp(dd)), vd = {}, yd = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: i,
    direction: a,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: f,
    popperOptions: v,
    popperRef: b,
    slotProps: p = {},
    slots: h = {},
    TransitionProps: d
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, g = he(t, fd), w = k.useRef(null), S = He(w, n), x = k.useRef(null), E = He(x, b), y = k.useRef(E);
  St(() => {
    y.current = E;
  }, [E]), k.useImperativeHandle(b, () => x.current, []);
  const N = md(f, a), [T, _] = k.useState(N), [D, j] = k.useState(nr(o));
  k.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), k.useEffect(() => {
    o && j(nr(o));
  }, [o]), St(() => {
    if (!D || !u)
      return;
    const z = (te) => {
      _(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && pr(D) && D.nodeType === 1) {
      const te = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let R = [{
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
        state: te
      }) => {
        z(te);
      }
    }];
    c != null && (R = R.concat(c)), v && v.modifiers != null && (R = R.concat(v.modifiers));
    const L = ud(D, w.current, C({
      placement: N
    }, v, {
      modifiers: R
    }));
    return y.current(L), () => {
      L.destroy(), y.current(null);
    };
  }, [D, l, c, u, v, N]);
  const P = {
    placement: T
  };
  d !== null && (P.TransitionProps = d);
  const I = bd(), A = (r = h.root) != null ? r : "div", F = Pt({
    elementType: A,
    externalSlotProps: p.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: S
    },
    ownerState: t,
    className: I.root
  });
  return /* @__PURE__ */ m(A, C({}, F, {
    children: typeof i == "function" ? i(P) : i
  }));
}), ls = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: i,
    direction: a = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: f,
    placement: v = "bottom",
    popperOptions: b = vd,
    popperRef: p,
    style: h,
    transition: d = !1,
    slotProps: g = {},
    slots: w = {}
  } = t, S = he(t, hd), [x, E] = k.useState(!0), y = () => {
    E(!1);
  }, N = () => {
    E(!0);
  };
  if (!c && !f && (!d || x))
    return null;
  let T;
  if (i)
    T = i;
  else if (r) {
    const j = nr(r);
    T = j && pr(j) ? Ce(j).body : Ce(null).body;
  }
  const _ = !f && c && (!d || x) ? "none" : void 0, D = d ? {
    in: f,
    onEnter: y,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ m(kn, {
    disablePortal: l,
    container: T,
    children: /* @__PURE__ */ m(yd, C({
      anchorEl: r,
      direction: a,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: d ? !x : f,
      placement: v,
      popperOptions: b,
      popperRef: p,
      slotProps: g,
      slots: w
    }, S, {
      style: C({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: _
      }, h),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (ls.propTypes = {
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
  anchorEl: Zt(s.oneOfType([at, s.object, s.func]), (e) => {
    if (e.open) {
      const t = nr(e.anchorEl);
      if (t && pr(t) && t.nodeType === 1) {
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
  children: s.oneOfType([s.node, s.func]),
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
  container: s.oneOfType([at, s.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: s.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: s.arrayOf(s.shape({
    data: s.object,
    effect: s.func,
    enabled: s.bool,
    fn: s.func,
    name: s.any,
    options: s.object,
    phase: s.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: s.arrayOf(s.string),
    requiresIfExists: s.arrayOf(s.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: s.shape({
    modifiers: s.array,
    onFirstUpdate: s.func,
    placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: s.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: vo,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: s.bool
});
const wd = ["values", "unit", "step"], xd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => C({}, n, {
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
  } = e, o = he(e, wd), i = xd(t), a = Object.keys(i);
  function l(b) {
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${n})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == "number" ? t[b] : b) - r / 100}${n})`;
  }
  function u(b, p) {
    const h = a.indexOf(p);
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${n}) and (max-width:${(h !== -1 && typeof t[a[h]] == "number" ? t[a[h]] : p) - r / 100}${n})`;
  }
  function f(b) {
    return a.indexOf(b) + 1 < a.length ? u(b, a[a.indexOf(b) + 1]) : l(b);
  }
  function v(b) {
    const p = a.indexOf(b);
    return p === 0 ? l(a[1]) : p === a.length - 1 ? c(a[p]) : u(b, a[a.indexOf(b) + 1]).replace("@media", "@media not all and");
  }
  return C({
    keys: a,
    values: i,
    up: l,
    down: c,
    between: u,
    only: f,
    not: v,
    unit: n
  }, o);
}
const kd = {
  borderRadius: 4
}, Td = kd, Nd = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, bt = Nd;
function wn(e, t) {
  return t ? it(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Oo = {
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
  up: (e) => `@media (min-width:${Oo[e]}px)`
};
function lt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || ji;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = n(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || ji;
    return Object.keys(t).reduce((a, l) => {
      if (Object.keys(i.values || Oo).indexOf(l) !== -1) {
        const c = i.up(l);
        a[c] = n(t[l], l);
      } else {
        const c = l;
        a[c] = t[c];
      }
      return a;
    }, {});
  }
  return n(t);
}
function Od(e = {}) {
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
function ur(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function rr(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = ur(e, n) || r, t && (o = t(o, r, e)), o;
}
function Ee(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (a) => {
    if (a[t] == null)
      return null;
    const l = a[t], c = a.theme, u = ur(c, r) || {};
    return lt(a, l, (v) => {
      let b = rr(u, o, v);
      return v === b && typeof v == "string" && (b = rr(u, o, `${t}${v === "default" ? "" : Je(v)}`, v)), n === !1 ? b : {
        [n]: b
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: bt
  } : {}, i.filterProps = [t], i;
}
function Sd(e) {
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
}, Li = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, $d = Sd((e) => {
  if (e.length > 2)
    if (Li[e])
      e = Li[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Pd[t], o = Rd[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), dr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], fr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], _d = [...dr, ...fr];
function $n(e, t, n, r) {
  var o;
  const i = (o = ur(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function cs(e) {
  return $n(e, "spacing", 8, "spacing");
}
function _n(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Md(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = _n(t, n), r), {});
}
function Id(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = $d(n), i = Md(o, r), a = e[n];
  return lt(e, a, i);
}
function ps(e, t) {
  const n = cs(e.theme);
  return Object.keys(e).map((r) => Id(e, t, r, n)).reduce(wn, {});
}
function ve(e) {
  return ps(e, dr);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? dr.reduce((e, t) => (e[t] = bt, e), {}) : {};
ve.filterProps = dr;
function ye(e) {
  return ps(e, fr);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? fr.reduce((e, t) => (e[t] = bt, e), {}) : {};
ye.filterProps = fr;
process.env.NODE_ENV !== "production" && _d.reduce((e, t) => (e[t] = bt, e), {});
function Ad(e = 8) {
  if (e.mui)
    return e;
  const t = cs({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const a = t(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return n.mui = !0, n;
}
function hr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? wn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function ze(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ge(e, t) {
  return Ee({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Dd = Ge("border", ze), Bd = Ge("borderTop", ze), jd = Ge("borderRight", ze), Ld = Ge("borderBottom", ze), Fd = Ge("borderLeft", ze), Vd = Ge("borderColor"), zd = Ge("borderTopColor"), Ud = Ge("borderRightColor"), Hd = Ge("borderBottomColor"), Wd = Ge("borderLeftColor"), Xd = Ge("outline", ze), Gd = Ge("outlineColor"), mr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = $n(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: _n(t, r)
    });
    return lt(e, e.borderRadius, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: bt
} : {};
mr.filterProps = ["borderRadius"];
hr(Dd, Bd, jd, Ld, Fd, Vd, zd, Ud, Hd, Wd, mr, Xd, Gd);
const gr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = $n(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: _n(t, r)
    });
    return lt(e, e.gap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: bt
} : {};
gr.filterProps = ["gap"];
const br = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = $n(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: _n(t, r)
    });
    return lt(e, e.columnGap, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: bt
} : {};
br.filterProps = ["columnGap"];
const vr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = $n(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: _n(t, r)
    });
    return lt(e, e.rowGap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: bt
} : {};
vr.filterProps = ["rowGap"];
const qd = Ee({
  prop: "gridColumn"
}), Yd = Ee({
  prop: "gridRow"
}), Kd = Ee({
  prop: "gridAutoFlow"
}), Jd = Ee({
  prop: "gridAutoColumns"
}), Zd = Ee({
  prop: "gridAutoRows"
}), Qd = Ee({
  prop: "gridTemplateColumns"
}), ef = Ee({
  prop: "gridTemplateRows"
}), tf = Ee({
  prop: "gridTemplateAreas"
}), nf = Ee({
  prop: "gridArea"
});
hr(gr, br, vr, qd, Yd, Kd, Jd, Zd, Qd, ef, tf, nf);
function Ht(e, t) {
  return t === "grey" ? t : e;
}
const rf = Ee({
  prop: "color",
  themeKey: "palette",
  transform: Ht
}), of = Ee({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ht
}), af = Ee({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ht
});
hr(rf, of, af);
function Le(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const sf = Ee({
  prop: "width",
  transform: Le
}), Co = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Oo[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Le(n)
      };
    };
    return lt(e, e.maxWidth, t);
  }
  return null;
};
Co.filterProps = ["maxWidth"];
const lf = Ee({
  prop: "minWidth",
  transform: Le
}), cf = Ee({
  prop: "height",
  transform: Le
}), pf = Ee({
  prop: "maxHeight",
  transform: Le
}), uf = Ee({
  prop: "minHeight",
  transform: Le
});
Ee({
  prop: "size",
  cssProperty: "width",
  transform: Le
});
Ee({
  prop: "size",
  cssProperty: "height",
  transform: Le
});
const df = Ee({
  prop: "boxSizing"
});
hr(sf, Co, lf, cf, pf, uf, df);
const ff = {
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
    style: ye
  },
  pt: {
    style: ye
  },
  pr: {
    style: ye
  },
  pb: {
    style: ye
  },
  pl: {
    style: ye
  },
  px: {
    style: ye
  },
  py: {
    style: ye
  },
  padding: {
    style: ye
  },
  paddingTop: {
    style: ye
  },
  paddingRight: {
    style: ye
  },
  paddingBottom: {
    style: ye
  },
  paddingLeft: {
    style: ye
  },
  paddingX: {
    style: ye
  },
  paddingY: {
    style: ye
  },
  paddingInline: {
    style: ye
  },
  paddingInlineStart: {
    style: ye
  },
  paddingInlineEnd: {
    style: ye
  },
  paddingBlock: {
    style: ye
  },
  paddingBlockStart: {
    style: ye
  },
  paddingBlockEnd: {
    style: ye
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
    style: gr
  },
  rowGap: {
    style: vr
  },
  columnGap: {
    style: br
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
    transform: Le
  },
  maxWidth: {
    style: Co
  },
  minWidth: {
    transform: Le
  },
  height: {
    transform: Le
  },
  maxHeight: {
    transform: Le
  },
  minHeight: {
    transform: Le
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
}, So = ff;
function hf(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function mf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function gf() {
  function e(n, r, o, i) {
    const a = {
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
      transform: f,
      style: v
    } = l;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const b = ur(o, u) || {};
    return v ? v(a) : lt(a, r, (h) => {
      let d = rr(b, f, h);
      return h === d && typeof h == "string" && (d = rr(b, f, `${n}${h === "default" ? "" : Je(h)}`, h)), c === !1 ? d : {
        [c]: d
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
    const a = (r = i.unstable_sxConfig) != null ? r : So;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const f = Od(i.breakpoints), v = Object.keys(f);
      let b = f;
      return Object.keys(u).forEach((p) => {
        const h = mf(u[p], i);
        if (h != null)
          if (typeof h == "object")
            if (a[p])
              b = wn(b, e(p, h, i, a));
            else {
              const d = lt({
                theme: i
              }, h, (g) => ({
                [p]: g
              }));
              hf(d, h) ? b[p] = t({
                sx: h,
                theme: i
              }) : b = wn(b, d);
            }
          else
            b = wn(b, e(p, h, i, a));
      }), Cd(v, b);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const us = gf();
us.filterProps = ["sx"];
const Po = us;
function bf(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const vf = ["breakpoints", "palette", "spacing", "shape"];
function Ro(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, a = he(e, vf), l = Ed(n), c = Ad(o);
  let u = it({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: C({
      mode: "light"
    }, r),
    spacing: c,
    shape: C({}, Td, i)
  }, a);
  return u.applyStyles = bf, u = t.reduce((f, v) => it(f, v), u), u.unstable_sxConfig = C({}, So, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(v) {
    return Po({
      sx: v,
      theme: this
    });
  }, u;
}
function yf(e) {
  return Object.keys(e).length === 0;
}
function ds(e = null) {
  const t = k.useContext(oc);
  return !t || yf(t) ? e : t;
}
const wf = Ro();
function fs(e = wf) {
  return ds(e);
}
const xf = ["ownerState"], Ef = ["variants"], kf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Tf(e) {
  return Object.keys(e).length === 0;
}
function Nf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Wn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Of = Ro(), Fi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Fn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Tf(t) ? e : t[n] || t;
}
function Cf(e) {
  return e ? (t, n) => n[e] : null;
}
function Xn(e, t) {
  let {
    ownerState: n
  } = t, r = he(t, xf);
  const o = typeof e == "function" ? e(C({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Xn(i, C({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = he(o, Ef);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(C({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((f) => {
        (n == null ? void 0 : n[f]) !== c.props[f] && r[f] !== c.props[f] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(C({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Sf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Of,
    rootShouldForwardProp: r = Wn,
    slotShouldForwardProp: o = Wn
  } = e, i = (a) => Po(C({}, a, {
    theme: Fn(C({}, a, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    ic(a, (y) => y.filter((N) => !(N != null && N.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: b = Cf(Fi(u))
    } = l, p = he(l, kf), h = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), d = v || !1;
    let g;
    process.env.NODE_ENV !== "production" && c && (g = `${c}-${Fi(u || "Root")}`);
    let w = Wn;
    u === "Root" || u === "root" ? w = r : u ? w = o : Nf(a) && (w = void 0);
    const S = rc(a, C({
      shouldForwardProp: w,
      label: g
    }, p)), x = (y) => typeof y == "function" && y.__emotion_real !== y || kt(y) ? (N) => Xn(y, C({}, N, {
      theme: Fn({
        theme: N.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : y, E = (y, ...N) => {
      let T = x(y);
      const _ = N ? N.map(x) : [];
      c && b && _.push((P) => {
        const I = Fn(C({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        if (!I.components || !I.components[c] || !I.components[c].styleOverrides)
          return null;
        const A = I.components[c].styleOverrides, F = {};
        return Object.entries(A).forEach(([z, R]) => {
          F[z] = Xn(R, C({}, P, {
            theme: I
          }));
        }), b(P, F);
      }), c && !h && _.push((P) => {
        var I;
        const A = Fn(C({}, P, {
          defaultTheme: n,
          themeId: t
        })), F = A == null || (I = A.components) == null || (I = I[c]) == null ? void 0 : I.variants;
        return Xn({
          variants: F
        }, C({}, P, {
          theme: A
        }));
      }), d || _.push(i);
      const D = _.length - N.length;
      if (Array.isArray(y) && D > 0) {
        const P = new Array(D).fill("");
        T = [...y, ...P], T.raw = [...y.raw, ...P];
      }
      const j = S(T, ..._);
      if (process.env.NODE_ENV !== "production") {
        let P;
        c && (P = `${c}${Je(u || "")}`), P === void 0 && (P = `Styled(${up(a)})`), j.displayName = P;
      }
      return a.muiName && (j.muiName = a.muiName), j;
    };
    return S.withConfig && (E.withConfig = S.withConfig), E;
  };
}
function Pf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Wa(t.components[n].defaultProps, r);
}
function Rf({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = fs(n);
  return r && (o = o[r] || o), Pf({
    theme: o,
    name: t,
    props: e
  });
}
function $o(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Ip(e, t, n);
}
function $f(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function $t(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return $t($f(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Wt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Wt(10, o));
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
function _f(e) {
  e = $t(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), a = (u, f = (u + n / 30) % 12) => o - i * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), yr({
    type: l,
    values: c
  });
}
function Vi(e) {
  e = $t(e);
  let t = e.type === "hsl" || e.type === "hsla" ? $t(_f(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function zi(e, t) {
  const n = Vi(e), r = Vi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function or(e, t) {
  return e = $t(e), t = $o(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, yr(e);
}
function Mf(e, t) {
  if (e = $t(e), t = $o(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return yr(e);
}
function If(e, t) {
  if (e = $t(e), t = $o(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return yr(e);
}
function Af(e, t) {
  return C({
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
const Df = {
  black: "#000",
  white: "#fff"
}, On = Df, Bf = {
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
}, jf = Bf, Lf = {
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
}, It = Lf, Ff = {
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
}, At = Ff, Vf = {
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
}, ln = Vf, zf = {
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
}, Dt = zf, Uf = {
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
}, Bt = Uf, Hf = {
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
}, jt = Hf, Wf = ["mode", "contrastThreshold", "tonalOffset"], Ui = {
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
    paper: On.white,
    default: On.white
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
    primary: On.white,
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
    active: On.white,
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
function Hi(e, t, n, r) {
  const o = r.light || r, i = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = If(e.main, o) : t === "dark" && (e.dark = Mf(e.main, i)));
}
function Xf(e = "light") {
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
function Gf(e = "light") {
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
function qf(e = "light") {
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
function Yf(e = "light") {
  return e === "dark" ? {
    main: Bt[400],
    light: Bt[300],
    dark: Bt[700]
  } : {
    main: Bt[700],
    light: Bt[500],
    dark: Bt[900]
  };
}
function Kf(e = "light") {
  return e === "dark" ? {
    main: jt[400],
    light: jt[300],
    dark: jt[700]
  } : {
    main: jt[800],
    light: jt[500],
    dark: jt[900]
  };
}
function Jf(e = "light") {
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
function Zf(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = he(e, Wf), i = e.primary || Xf(t), a = e.secondary || Gf(t), l = e.error || qf(t), c = e.info || Yf(t), u = e.success || Kf(t), f = e.warning || Jf(t);
  function v(d) {
    const g = zi(d, Mr.text.primary) >= n ? Mr.text.primary : Ui.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = zi(d, g);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${g} on ${d}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const b = ({
    color: d,
    name: g,
    mainShade: w = 500,
    lightShade: S = 300,
    darkShade: x = 700
  }) => {
    if (d = C({}, d), !d.main && d[w] && (d.main = d[w]), !d.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : Wt(11, g ? ` (${g})` : "", w));
    if (typeof d.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(d.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Wt(12, g ? ` (${g})` : "", JSON.stringify(d.main)));
    return Hi(d, "light", S, r), Hi(d, "dark", x, r), d.contrastText || (d.contrastText = v(d.main)), d;
  }, p = {
    dark: Mr,
    light: Ui
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), it(C({
    // A collection of common colors.
    common: C({}, On),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: b({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: b({
      color: a,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: b({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: b({
      color: f,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: b({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: b({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: jf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: v,
    // Generate a rich color object.
    augmentColor: b,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, p[t]), o);
}
const Qf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function eh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Wi = {
  textTransform: "uppercase"
}, Xi = '"Roboto", "Helvetica", "Arial", sans-serif';
function th(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Xi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: i = 300,
    fontWeightRegular: a = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: v
  } = n, b = he(n, Qf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((w) => `${w / u * p}rem`), d = (w, S, x, E, y) => C({
    fontFamily: r,
    fontWeight: w,
    fontSize: h(S),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === Xi ? {
    letterSpacing: `${eh(E / S)}em`
  } : {}, y, f), g = {
    h1: d(i, 96, 1.167, -1.5),
    h2: d(i, 60, 1.2, -0.5),
    h3: d(a, 48, 1.167, 0),
    h4: d(a, 34, 1.235, 0.25),
    h5: d(a, 24, 1.334, 0),
    h6: d(l, 20, 1.6, 0.15),
    subtitle1: d(a, 16, 1.75, 0.15),
    subtitle2: d(l, 14, 1.57, 0.1),
    body1: d(a, 16, 1.5, 0.15),
    body2: d(a, 14, 1.43, 0.15),
    button: d(l, 14, 1.75, 0.4, Wi),
    caption: d(a, 12, 1.66, 0.4),
    overline: d(a, 12, 2.66, 1, Wi),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return it(C({
    htmlFontSize: u,
    pxToRem: h,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, g), b, {
    clone: !1
    // No need to clone deep
  });
}
const nh = 0.2, rh = 0.14, oh = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${nh})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${rh})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${oh})`].join(",");
}
const ih = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], ah = ih, sh = ["duration", "easing", "delay"], lh = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ch = {
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
function Gi(e) {
  return `${Math.round(e)}ms`;
}
function ph(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function uh(e) {
  const t = C({}, lh, e.easing), n = C({}, ch, e.duration);
  return C({
    getAutoHeightDuration: ph,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = he(i, sh);
      if (process.env.NODE_ENV !== "production") {
        const f = (b) => typeof b == "string", v = (b) => !isNaN(parseFloat(b));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(a) && !f(a) && console.error(`MUI: Argument "duration" must be a number or a string but found ${a}.`), f(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof i != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof a == "string" ? a : Gi(a)} ${l} ${typeof c == "string" ? c : Gi(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const dh = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, fh = dh, hh = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function mh(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = he(e, hh);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Wt(18));
  const l = Zf(r), c = Ro(e);
  let u = it(c, {
    mixins: Af(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: ah.slice(),
    typography: th(l, i),
    transitions: uh(o),
    zIndex: C({}, fh)
  });
  if (u = it(u, a), u = t.reduce((f, v) => it(f, v), u), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (b, p) => {
      let h;
      for (h in b) {
        const d = b[h];
        if (f.indexOf(h) !== -1 && Object.keys(d).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = Qe("", h);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(b, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: d
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          b[h] = {};
        }
      }
    };
    Object.keys(u.components).forEach((b) => {
      const p = u.components[b].styleOverrides;
      p && b.indexOf("Mui") === 0 && v(p, b);
    });
  }
  return u.unstable_sxConfig = C({}, So, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(v) {
    return Po({
      sx: v,
      theme: this
    });
  }, u;
}
const gh = mh(), _o = gh, Mo = "$$material", hs = (e) => Wn(e) && e !== "classes", bh = Sf({
  themeId: Mo,
  defaultTheme: _o,
  rootShouldForwardProp: hs
}), Se = bh;
function Mn() {
  const e = fs(_o);
  return process.env.NODE_ENV !== "production" && k.useDebugValue(e), e[Mo] || e;
}
function pt({
  props: e,
  name: t
}) {
  return Rf({
    props: e,
    name: t,
    defaultTheme: _o,
    themeId: Mo
  });
}
function Zr(e, t) {
  return Zr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Zr(e, t);
}
function vh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Zr(e, t);
}
const qi = {
  disabled: !1
};
var yh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
  enter: s.number,
  exit: s.number,
  appear: s.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && s.oneOfType([s.string, s.shape({
  enter: s.string,
  exit: s.string,
  active: s.string
}), s.shape({
  enter: s.string,
  enterDone: s.string,
  enterActive: s.string,
  exit: s.string,
  exitDone: s.string,
  exitActive: s.string
})]);
const ms = J.createContext(null);
var wh = function(t) {
  return t.scrollTop;
}, mn = "unmounted", xt = "exited", Et = "entering", zt = "entered", Qr = "exiting", ut = /* @__PURE__ */ function(e) {
  vh(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, l = a && !a.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = xt, i.appearStatus = Et) : c = zt : r.unmountOnExit || r.mountOnEnter ? c = mn : c = xt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === mn ? {
      status: xt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var i = null;
    if (o !== this.props) {
      var a = this.state.status;
      this.props.in ? a !== Et && a !== zt && (i = Et) : (a === Et || a === zt) && (i = Qr);
    }
    this.updateStatus(!1, i);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, i, a, l;
    return i = a = l = o, o != null && typeof o != "number" && (i = o.exit, a = o.enter, l = o.appear !== void 0 ? o.appear : a), {
      exit: i,
      enter: a,
      appear: l
    };
  }, n.updateStatus = function(o, i) {
    if (o === void 0 && (o = !1), i !== null)
      if (this.cancelNextCallback(), i === Et) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var a = this.props.nodeRef ? this.props.nodeRef.current : Bn.findDOMNode(this);
          a && wh(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === xt && this.setState({
        status: mn
      });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Bn.findDOMNode(this), l], u = c[0], f = c[1], v = this.getTimeouts(), b = l ? v.appear : v.enter;
    if (!o && !a || qi.disabled) {
      this.safeSetState({
        status: zt
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, f), this.safeSetState({
      status: Et
    }, function() {
      i.props.onEntering(u, f), i.onTransitionEnd(b, function() {
        i.safeSetState({
          status: zt
        }, function() {
          i.props.onEntered(u, f);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, i = this.props.exit, a = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Bn.findDOMNode(this);
    if (!i || qi.disabled) {
      this.safeSetState({
        status: xt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Qr
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(a.exit, function() {
        o.safeSetState({
          status: xt
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
    var i = this, a = !0;
    return this.nextCallback = function(l) {
      a && (a = !1, i.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      a = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, i) {
    this.setNextCallback(i);
    var a = this.props.nodeRef ? this.props.nodeRef.current : Bn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!a || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [a, this.nextCallback], u = c[0], f = c[1];
      this.props.addEndListener(u, f);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === mn)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = he(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ J.createElement(ms.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : J.cloneElement(J.Children.only(a), l))
    );
  }, t;
}(J.Component);
ut.contextType = ms;
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
  nodeRef: s.shape({
    current: typeof Element > "u" ? s.any : function(e, t, n, r, o, i) {
      var a = e[t];
      return s.instanceOf(a && "ownerDocument" in a ? a.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, i);
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
  children: s.oneOfType([s.func.isRequired, s.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: s.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: s.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: s.bool,
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
  appear: s.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: s.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: s.bool,
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
    var n = yh;
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
  addEndListener: s.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: s.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: s.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: s.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: s.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: s.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: s.func
} : {};
function Lt() {
}
ut.defaultProps = {
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
ut.UNMOUNTED = mn;
ut.EXITED = xt;
ut.ENTERING = Et;
ut.ENTERED = zt;
ut.EXITING = Qr;
const gs = ut, bs = (e) => e.scrollTop;
function ir(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: i,
    style: a = {}
  } = e;
  return {
    duration: (n = a.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = a.transitionTimingFunction) != null ? r : typeof i == "object" ? i[t.mode] : i,
    delay: a.transitionDelay
  };
}
const xh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function eo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Eh = {
  entering: {
    opacity: 1,
    transform: eo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Ir = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Io = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: i,
    easing: a,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: f,
    onExit: v,
    onExited: b,
    onExiting: p,
    style: h,
    timeout: d = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = gs
  } = t, w = he(t, xh), S = fn(), x = k.useRef(), E = Mn(), y = k.useRef(null), N = He(y, i.ref, n), T = (z) => (R) => {
    if (z) {
      const L = y.current;
      R === void 0 ? z(L) : z(L, R);
    }
  }, _ = T(f), D = T((z, R) => {
    bs(z);
    const {
      duration: L,
      delay: te,
      easing: Q
    } = ir({
      style: h,
      timeout: d,
      easing: a
    }, {
      mode: "enter"
    });
    let O;
    d === "auto" ? (O = E.transitions.getAutoHeightDuration(z.clientHeight), x.current = O) : O = L, z.style.transition = [E.transitions.create("opacity", {
      duration: O,
      delay: te
    }), E.transitions.create("transform", {
      duration: Ir ? O : O * 0.666,
      delay: te,
      easing: Q
    })].join(","), c && c(z, R);
  }), j = T(u), P = T(p), I = T((z) => {
    const {
      duration: R,
      delay: L,
      easing: te
    } = ir({
      style: h,
      timeout: d,
      easing: a
    }, {
      mode: "exit"
    });
    let Q;
    d === "auto" ? (Q = E.transitions.getAutoHeightDuration(z.clientHeight), x.current = Q) : Q = R, z.style.transition = [E.transitions.create("opacity", {
      duration: Q,
      delay: L
    }), E.transitions.create("transform", {
      duration: Ir ? Q : Q * 0.666,
      delay: Ir ? L : L || Q * 0.333,
      easing: te
    })].join(","), z.style.opacity = 0, z.style.transform = eo(0.75), v && v(z);
  }), A = T(b);
  return /* @__PURE__ */ m(g, C({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: j,
    onEntering: _,
    onExit: I,
    onExited: A,
    onExiting: P,
    addEndListener: (z) => {
      d === "auto" && S.start(x.current || 0, z), r && r(y.current, z);
    },
    timeout: d === "auto" ? null : d
  }, w, {
    children: (z, R) => /* @__PURE__ */ k.cloneElement(i, C({
      style: C({
        opacity: 0,
        transform: eo(0.75),
        visibility: z === "exited" && !l ? "hidden" : void 0
      }, Eh[z], h, i.props.style),
      ref: N
    }, R))
  }));
});
process.env.NODE_ENV !== "production" && (Io.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: Cn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
Io.muiSupportAuto = !0;
const to = Io, kh = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Yi = kh, Th = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Nh = Se(ls, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), vs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const o = ds(), i = pt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: a,
    component: l,
    components: c,
    componentsProps: u,
    container: f,
    disablePortal: v,
    keepMounted: b,
    modifiers: p,
    open: h,
    placement: d,
    popperOptions: g,
    popperRef: w,
    transition: S,
    slots: x,
    slotProps: E
  } = i, y = he(i, Th), N = (r = x == null ? void 0 : x.root) != null ? r : c == null ? void 0 : c.Root, T = C({
    anchorEl: a,
    container: f,
    disablePortal: v,
    keepMounted: b,
    modifiers: p,
    open: h,
    placement: d,
    popperOptions: g,
    popperRef: w,
    transition: S
  }, y);
  return /* @__PURE__ */ m(Nh, C({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: N
    },
    slotProps: E ?? u
  }, T, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (vs.propTypes = {
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
  anchorEl: s.oneOfType([at, s.object, s.func]),
  /**
   * Popper render function or node.
   */
  children: s.oneOfType([s.node, s.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: s.shape({
    root: s.oneOfType([s.func, s.object])
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
  container: s.oneOfType([at, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: s.arrayOf(s.shape({
    data: s.object,
    effect: s.func,
    enabled: s.bool,
    fn: s.func,
    name: s.any,
    options: s.object,
    phase: s.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: s.arrayOf(s.string),
    requiresIfExists: s.arrayOf(s.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: s.shape({
    modifiers: s.array,
    onFirstUpdate: s.func,
    placement: s.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: s.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: vo,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: s.shape({
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: s.bool
});
const ys = vs;
function Oh(e) {
  return Qe("MuiTooltip", e);
}
const Ch = mt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ht = Ch, Sh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Ph(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Rh = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Je(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ct(a, Oh, t);
}, $h = Se(ys, {
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
}) => C({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${ht.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ht.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ht.arrow}`]: C({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ht.arrow}`]: C({}, t.isRtl ? {
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
})), _h = Se("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${Je(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => C({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : or(e.palette.grey[700], 0.92),
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
  lineHeight: `${Ph(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ht.popper}[data-popper-placement*="left"] &`]: C({
    transformOrigin: "right center"
  }, t.isRtl ? C({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : C({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${ht.popper}[data-popper-placement*="right"] &`]: C({
    transformOrigin: "left center"
  }, t.isRtl ? C({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : C({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${ht.popper}[data-popper-placement*="top"] &`]: C({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ht.popper}[data-popper-placement*="bottom"] &`]: C({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Mh = Se("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : or(e.palette.grey[700], 0.9),
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
const Ki = new Sn();
let cn = {
  x: 0,
  y: 0
};
function zn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const ws = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, a, l, c, u, f, v, b, p, h, d, g, w, S, x, E, y;
  const N = pt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: T = !1,
    children: _,
    components: D = {},
    componentsProps: j = {},
    describeChild: P = !1,
    disableFocusListener: I = !1,
    disableHoverListener: A = !1,
    disableInteractive: F = !1,
    disableTouchListener: z = !1,
    enterDelay: R = 100,
    enterNextDelay: L = 0,
    enterTouchDelay: te = 700,
    followCursor: Q = !1,
    id: O,
    leaveDelay: $ = 0,
    leaveTouchDelay: V = 1500,
    onClose: q,
    onOpen: H,
    open: X,
    placement: Y = "bottom",
    PopperComponent: K,
    PopperProps: G = {},
    slotProps: Z = {},
    slots: ee = {},
    title: ae,
    TransitionComponent: B = to,
    TransitionProps: ne
  } = N, M = he(N, Sh), se = /* @__PURE__ */ k.isValidElement(_) ? _ : /* @__PURE__ */ m("span", {
    children: _
  }), ke = Mn(), Pe = ke.direction === "rtl", [xe, vt] = k.useState(), [Re, et] = k.useState(null), De = k.useRef(!1), tt = F || Q, Te = fn(), Mt = fn(), yt = fn(), Qt = fn(), [In, Fo] = La({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let nt = In;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = k.useRef(X !== void 0);
    k.useEffect(() => {
      xe && xe.disabled && !re && ae !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ae, xe, re]);
  }
  const wr = ja(O), en = k.useRef(), An = En(() => {
    en.current !== void 0 && (document.body.style.WebkitUserSelect = en.current, en.current = void 0), Qt.clear();
  });
  k.useEffect(() => An, [An]);
  const Vo = (re) => {
    Ki.clear(), Vn = !0, Fo(!0), H && !nt && H(re);
  }, Dn = En(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      Ki.start(800 + $, () => {
        Vn = !1;
      }), Fo(!1), q && nt && q(re), Te.start(ke.transitions.duration.shortest, () => {
        De.current = !1;
      });
    }
  ), xr = (re) => {
    De.current && re.type !== "touchstart" || (xe && xe.removeAttribute("title"), Mt.clear(), yt.clear(), R || Vn && L ? Mt.start(Vn ? L : R, () => {
      Vo(re);
    }) : Vo(re));
  }, zo = (re) => {
    Mt.clear(), yt.start($, () => {
      Dn(re);
    });
  }, {
    isFocusVisibleRef: Uo,
    onBlur: rl,
    onFocus: ol,
    ref: il
  } = Fa(), [, Ho] = k.useState(!1), Wo = (re) => {
    rl(re), Uo.current === !1 && (Ho(!1), zo(re));
  }, Xo = (re) => {
    xe || vt(re.currentTarget), ol(re), Uo.current === !0 && (Ho(!0), xr(re));
  }, Go = (re) => {
    De.current = !0;
    const Be = se.props;
    Be.onTouchStart && Be.onTouchStart(re);
  }, qo = xr, Yo = zo, al = (re) => {
    Go(re), yt.clear(), Te.clear(), An(), en.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Qt.start(te, () => {
      document.body.style.WebkitUserSelect = en.current, xr(re);
    });
  }, sl = (re) => {
    se.props.onTouchEnd && se.props.onTouchEnd(re), An(), yt.start(V, () => {
      Dn(re);
    });
  };
  k.useEffect(() => {
    if (!nt)
      return;
    function re(Be) {
      (Be.key === "Escape" || Be.key === "Esc") && Dn(Be);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [Dn, nt]);
  const ll = He(se.ref, il, vt, n);
  !ae && ae !== 0 && (nt = !1);
  const Er = k.useRef(), cl = (re) => {
    const Be = se.props;
    Be.onMouseMove && Be.onMouseMove(re), cn = {
      x: re.clientX,
      y: re.clientY
    }, Er.current && Er.current.update();
  }, tn = {}, kr = typeof ae == "string";
  P ? (tn.title = !nt && kr && !A ? ae : null, tn["aria-describedby"] = nt ? wr : null) : (tn["aria-label"] = kr ? ae : null, tn["aria-labelledby"] = nt && !kr ? wr : null);
  const Ve = C({}, tn, M, se.props, {
    className: Oe(M.className, se.props.className),
    onTouchStart: Go,
    ref: ll
  }, Q ? {
    onMouseMove: cl
  } : {});
  process.env.NODE_ENV !== "production" && (Ve["data-mui-internal-clone-element"] = !0, k.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const nn = {};
  z || (Ve.onTouchStart = al, Ve.onTouchEnd = sl), A || (Ve.onMouseOver = zn(qo, Ve.onMouseOver), Ve.onMouseLeave = zn(Yo, Ve.onMouseLeave), tt || (nn.onMouseOver = qo, nn.onMouseLeave = Yo)), I || (Ve.onFocus = zn(Xo, Ve.onFocus), Ve.onBlur = zn(Wo, Ve.onBlur), tt || (nn.onFocus = Xo, nn.onBlur = Wo)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const pl = k.useMemo(() => {
    var re;
    let Be = [{
      name: "arrow",
      enabled: !!Re,
      options: {
        element: Re,
        padding: 4
      }
    }];
    return (re = G.popperOptions) != null && re.modifiers && (Be = Be.concat(G.popperOptions.modifiers)), C({}, G.popperOptions, {
      modifiers: Be
    });
  }, [Re, G]), rn = C({}, N, {
    isRtl: Pe,
    arrow: T,
    disableInteractive: tt,
    placement: Y,
    PopperComponentProp: K,
    touch: De.current
  }), Tr = Rh(rn), Ko = (r = (o = ee.popper) != null ? o : D.Popper) != null ? r : $h, Jo = (i = (a = (l = ee.transition) != null ? l : D.Transition) != null ? a : B) != null ? i : to, Zo = (c = (u = ee.tooltip) != null ? u : D.Tooltip) != null ? c : _h, Qo = (f = (v = ee.arrow) != null ? v : D.Arrow) != null ? f : Mh, ul = hn(Ko, C({}, G, (b = Z.popper) != null ? b : j.popper, {
    className: Oe(Tr.popper, G == null ? void 0 : G.className, (p = (h = Z.popper) != null ? h : j.popper) == null ? void 0 : p.className)
  }), rn), dl = hn(Jo, C({}, ne, (d = Z.transition) != null ? d : j.transition), rn), fl = hn(Zo, C({}, (g = Z.tooltip) != null ? g : j.tooltip, {
    className: Oe(Tr.tooltip, (w = (S = Z.tooltip) != null ? S : j.tooltip) == null ? void 0 : w.className)
  }), rn), hl = hn(Qo, C({}, (x = Z.arrow) != null ? x : j.arrow, {
    className: Oe(Tr.arrow, (E = (y = Z.arrow) != null ? y : j.arrow) == null ? void 0 : E.className)
  }), rn);
  return /* @__PURE__ */ U(k.Fragment, {
    children: [/* @__PURE__ */ k.cloneElement(se, Ve), /* @__PURE__ */ m(Ko, C({
      as: K ?? ys,
      placement: Y,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: cn.y,
          left: cn.x,
          right: cn.x,
          bottom: cn.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: Er,
      open: xe ? nt : !1,
      id: wr,
      transition: !0
    }, nn, ul, {
      popperOptions: pl,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ m(Jo, C({
        timeout: ke.transitions.duration.shorter
      }, re, dl, {
        children: /* @__PURE__ */ U(Zo, C({}, fl, {
          children: [ae, T ? /* @__PURE__ */ m(Qo, C({}, hl, {
            ref: et
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (ws.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: s.bool,
  /**
   * Tooltip reference element.
   */
  children: Cn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Arrow: s.elementType,
    Popper: s.elementType,
    Tooltip: s.elementType,
    Transition: s.elementType
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
  componentsProps: s.shape({
    arrow: s.object,
    popper: s.object,
    tooltip: s.object,
    transition: s.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: s.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: s.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: s.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: s.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: s.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: s.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: s.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: s.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: s.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: s.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: s.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: s.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: s.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: s.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: s.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: s.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    arrow: s.object,
    popper: s.object,
    tooltip: s.object,
    transition: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    arrow: s.elementType,
    popper: s.elementType,
    tooltip: s.elementType,
    transition: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: s.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: s.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: s.object
});
const Ih = ws;
var Ao = {}, xs = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(xs);
var Ah = xs.exports, Ar = {};
function Dh(e) {
  return Qe("MuiSvgIcon", e);
}
mt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Bh = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], jh = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Je(t)}`, `fontSize${Je(n)}`]
  };
  return ct(o, Dh, r);
}, Lh = Se("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${Je(n.color)}`], t[`fontSize${Je(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, i, a, l, c, u, f, v, b, p, h;
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
      small: ((i = e.typography) == null || (a = i.pxToRem) == null ? void 0 : a.call(i, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (f = u.pxToRem) == null ? void 0 : f.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (b = (e.vars || e).palette) == null || (b = b[t.color]) == null ? void 0 : b.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Do = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: i,
    color: a = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: f = !1,
    titleAccess: v,
    viewBox: b = "0 0 24 24"
  } = r, p = he(r, Bh), h = /* @__PURE__ */ k.isValidElement(o) && o.type === "svg", d = C({}, r, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: b,
    hasSvgAsChild: h
  }), g = {};
  f || (g.viewBox = b);
  const w = jh(d);
  return /* @__PURE__ */ U(Lh, C({
    as: l,
    className: Oe(w.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: n
  }, g, p, h && o.props, {
    ownerState: d,
    children: [h ? o.props.children : o, v ? /* @__PURE__ */ m("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Do.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: s.oneOfType([s.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), s.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: s.oneOfType([s.oneOf(["inherit", "large", "medium", "small"]), s.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: s.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: s.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: s.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: s.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: s.string
});
Do.muiName = "SvgIcon";
const Ji = Do;
function Es(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ m(Ji, C({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ji.muiName, /* @__PURE__ */ k.memo(/* @__PURE__ */ k.forwardRef(n));
}
const Fh = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Xa.configure(e);
  }
}, Vh = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Je,
  createChainedFunction: Gr,
  createSvgIcon: Es,
  debounce: Ba,
  deprecatedPropType: fp,
  isMuiElement: hp,
  ownerDocument: Ce,
  ownerWindow: Xt,
  requirePropFactory: mp,
  setRef: Qn,
  unstable_ClassNameGenerator: Fh,
  unstable_useEnhancedEffect: St,
  unstable_useId: ja,
  unsupportedProp: vp,
  useControlled: La,
  useEventCallback: En,
  useForkRef: He,
  useIsFocusVisible: Fa
}, Symbol.toStringTag, { value: "Module" })), zh = /* @__PURE__ */ Xc(Vh);
var Zi;
function Uh() {
  return Zi || (Zi = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = zh;
  }(Ar)), Ar;
}
var Hh = Ah;
Object.defineProperty(Ao, "__esModule", {
  value: !0
});
var ks = Ao.default = void 0, Wh = Hh(Uh()), Xh = ml;
ks = Ao.default = (0, Wh.default)(/* @__PURE__ */ (0, Xh.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Qi(e, t, n) {
  return e ? /* @__PURE__ */ m(ma, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ m("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ts(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: i = void 0,
    iconPathAfter: a = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: u = !1,
    isDense: f = !0,
    isSubMenuParent: v = !1,
    hasDisabledGutters: b = !1,
    hasDivider: p = !1,
    focusVisibleClassName: h,
    id: d,
    children: g
  } = e, w = /* @__PURE__ */ m(
    Gl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: f,
      disableGutters: b,
      divider: p,
      focusVisibleClassName: h,
      onClick: t,
      id: d,
      children: n ? /* @__PURE__ */ U(_t, { children: [
        Qi(i, n, !0),
        /* @__PURE__ */ m(ql, { primary: n, inset: !i && o }),
        v ? /* @__PURE__ */ m(ma, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ m(ks, {}) }) : Qi(a, n, !1)
      ] }) : g
    }
  );
  return r ? /* @__PURE__ */ m(Ih, { title: r, placement: "right", children: /* @__PURE__ */ m("div", { children: w }) }) : w;
}
function Ns(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Gh(e) {
  const [t, n] = fe(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, a = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Ns(i).filter((f) => "menuItem" in f.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === r.id
    ), /* @__PURE__ */ m(Bo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ U(_t, { children: [
    /* @__PURE__ */ m(Ts, { onClick: a, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ m(
      Yl,
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
const qh = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Bo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: a } = io(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ns(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(f).sort(
      (h, d) => (h.group.order || 0) - (d.group.order || 0)
    ), b = [];
    v.forEach((h) => {
      qh(h.id, t.items).forEach(
        (d) => b.push({ item: d, isLastItemInGroup: !1 })
      ), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !0);
    }), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !1);
    const p = b.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: b, allowForLeadingIcons: p };
  }, [o, t]), l = ({ item: f, isLastItemInGroup: v }) => ({
    className: "papi-menu-item",
    label: f.label,
    tooltip: f.tooltip,
    iconPathBefore: "iconPathBefore" in f ? f.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in f ? f.iconPathAfter : void 0,
    hasDivider: v,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: a
  }), [c] = i;
  if (!c)
    return /* @__PURE__ */ m("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ m("div", { role: "menu", "aria-label": u, children: i.map((f, v) => {
    const { item: b } = f, p = l(f);
    if ("command" in b) {
      const h = b.group + v;
      return /* @__PURE__ */ m(
        Ts,
        {
          onClick: (d) => {
            n == null || n(d), r(b);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ m(
      Gh,
      {
        parentMenuItem: b,
        parentItemProps: p,
        ...e
      },
      u + b.id
    );
  }) }, u);
}
function Yh(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([a, l]) => ({ id: a, group: l })).filter((a) => "column" in a.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (a) => "column" in a.group && a.group.column === n
  )), /* @__PURE__ */ m(Bo, { ...e, includedGroups: i });
}
function Kh({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ U(
    ga,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ m("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ m(Kl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ m(
          Yh,
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
function Jh({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = io(() => {
    const a = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? a.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(a.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ m(
    ga,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((a, l) => /* @__PURE__ */ m(
        Kh,
        {
          commandHandler: e,
          menuDefinition: n,
          ...a,
          className: t
        },
        l
      ))
    }
  );
}
const Os = /* @__PURE__ */ k.createContext({});
process.env.NODE_ENV !== "production" && (Os.displayName = "ListContext");
const Zh = Os;
function Qh(e) {
  return Qe("MuiList", e);
}
mt("MuiList", ["root", "padding", "dense", "subheader"]);
const em = ["children", "className", "component", "dense", "disablePadding", "subheader"], tm = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return ct({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Qh, t);
}, nm = Se("ul", {
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
}) => C({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Cs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, f = he(r, em), v = k.useMemo(() => ({
    dense: l
  }), [l]), b = C({}, r, {
    component: a,
    dense: l,
    disablePadding: c
  }), p = tm(b);
  return /* @__PURE__ */ m(Zh.Provider, {
    value: v,
    children: /* @__PURE__ */ U(nm, C({
      as: a,
      className: Oe(p.root, i),
      ref: n,
      ownerState: b
    }, f, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Cs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * If `true`, compact vertical padding designed for keyboard and mouse input is used for
   * the list and list items.
   * The prop is available to descendant components as the `dense` context.
   * @default false
   */
  dense: s.bool,
  /**
   * If `true`, vertical padding is removed from the list.
   * @default false
   */
  disablePadding: s.bool,
  /**
   * The content of the subheader, normally `ListSubheader`.
   */
  subheader: s.node,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const rm = Cs, om = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Dr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ea(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ss(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function pn(e, t, n, r, o, i) {
  let a = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Ss(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Ps = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: i = !1,
    children: a,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: f,
    variant: v = "selectedMenu"
  } = t, b = he(t, om), p = k.useRef(null), h = k.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  St(() => {
    o && p.current.focus();
  }, [o]), k.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (x, E) => {
      const y = !p.current.style.width;
      if (x.clientHeight < p.current.clientHeight && y) {
        const N = `${Va(Ce(x))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = N, p.current.style.width = `calc(100% + ${N})`;
      }
      return p.current;
    }
  }), []);
  const d = (x) => {
    const E = p.current, y = x.key, N = Ce(E).activeElement;
    if (y === "ArrowDown")
      x.preventDefault(), pn(E, N, u, c, Dr);
    else if (y === "ArrowUp")
      x.preventDefault(), pn(E, N, u, c, ea);
    else if (y === "Home")
      x.preventDefault(), pn(E, null, u, c, Dr);
    else if (y === "End")
      x.preventDefault(), pn(E, null, u, c, ea);
    else if (y.length === 1) {
      const T = h.current, _ = y.toLowerCase(), D = performance.now();
      T.keys.length > 0 && (D - T.lastTime > 500 ? (T.keys = [], T.repeating = !0, T.previousKeyMatched = !0) : T.repeating && _ !== T.keys[0] && (T.repeating = !1)), T.lastTime = D, T.keys.push(_);
      const j = N && !T.repeating && Ss(N, T);
      T.previousKeyMatched && (j || pn(E, N, !1, c, Dr, T)) ? x.preventDefault() : T.previousKeyMatched = !1;
    }
    f && f(x);
  }, g = He(p, n);
  let w = -1;
  k.Children.forEach(a, (x, E) => {
    if (!/* @__PURE__ */ k.isValidElement(x)) {
      w === E && (w += 1, w >= a.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && Zn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (v === "selectedMenu" && x.props.selected || w === -1) && (w = E), w === E && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= a.length && (w = -1));
  });
  const S = k.Children.map(a, (x, E) => {
    if (E === w) {
      const y = {};
      return i && (y.autoFocus = !0), x.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ k.cloneElement(x, y);
    }
    return x;
  });
  return /* @__PURE__ */ m(rm, C({
    role: "menu",
    ref: g,
    className: l,
    onKeyDown: d,
    tabIndex: o ? 0 : -1
  }, b, {
    children: S
  }));
});
process.env.NODE_ENV !== "production" && (Ps.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, will focus the `[role="menu"]` container and move into tab order.
   * @default false
   */
  autoFocus: s.bool,
  /**
   * If `true`, will focus the first menuitem if `variant="menu"` or selected item
   * if `variant="selectedMenu"`.
   * @default false
   */
  autoFocusItem: s.bool,
  /**
   * MenuList contents, normally `MenuItem`s.
   */
  children: s.node,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * If `true`, will allow focus on disabled items.
   * @default false
   */
  disabledItemsFocusable: s.bool,
  /**
   * If `true`, the menu items will not wrap focus.
   * @default false
   */
  disableListWrap: s.bool,
  /**
   * @ignore
   */
  onKeyDown: s.func,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus
   * and the vertical alignment relative to the anchor element.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const im = Ps, am = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], sm = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Rs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = Mn(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: i,
    appear: a = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: f,
    onEntered: v,
    onEntering: b,
    onExit: p,
    onExited: h,
    onExiting: d,
    style: g,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: S = gs
  } = t, x = he(t, am), E = k.useRef(null), y = He(E, l.ref, n), N = (F) => (z) => {
    if (F) {
      const R = E.current;
      z === void 0 ? F(R) : F(R, z);
    }
  }, T = N(b), _ = N((F, z) => {
    bs(F);
    const R = ir({
      style: g,
      timeout: w,
      easing: c
    }, {
      mode: "enter"
    });
    F.style.webkitTransition = r.transitions.create("opacity", R), F.style.transition = r.transitions.create("opacity", R), f && f(F, z);
  }), D = N(v), j = N(d), P = N((F) => {
    const z = ir({
      style: g,
      timeout: w,
      easing: c
    }, {
      mode: "exit"
    });
    F.style.webkitTransition = r.transitions.create("opacity", z), F.style.transition = r.transitions.create("opacity", z), p && p(F);
  }), I = N(h);
  return /* @__PURE__ */ m(S, C({
    appear: a,
    in: u,
    nodeRef: E,
    onEnter: _,
    onEntered: D,
    onEntering: T,
    onExit: P,
    onExited: I,
    onExiting: j,
    addEndListener: (F) => {
      i && i(E.current, F);
    },
    timeout: w
  }, x, {
    children: (F, z) => /* @__PURE__ */ k.cloneElement(l, C({
      style: C({
        opacity: 0,
        visibility: F === "exited" && !u ? "hidden" : void 0
      }, sm[F], g, l.props.style),
      ref: y
    }, z))
  }));
});
process.env.NODE_ENV !== "production" && (Rs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: s.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: s.bool,
  /**
   * A single child content element.
   */
  children: Cn.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: s.oneOfType([s.shape({
    enter: s.string,
    exit: s.string
  }), s.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: s.bool,
  /**
   * @ignore
   */
  onEnter: s.func,
  /**
   * @ignore
   */
  onEntered: s.func,
  /**
   * @ignore
   */
  onEntering: s.func,
  /**
   * @ignore
   */
  onExit: s.func,
  /**
   * @ignore
   */
  onExited: s.func,
  /**
   * @ignore
   */
  onExiting: s.func,
  /**
   * @ignore
   */
  style: s.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   * @default {
   *   enter: theme.transitions.duration.enteringScreen,
   *   exit: theme.transitions.duration.leavingScreen,
   * }
   */
  timeout: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
const lm = Rs;
function cm(e) {
  return Qe("MuiBackdrop", e);
}
mt("MuiBackdrop", ["root", "invisible"]);
const pm = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], um = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return ct({
    root: ["root", n && "invisible"]
  }, cm, t);
}, dm = Se("div", {
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
}) => C({
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
})), $s = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const a = pt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: f = {},
    componentsProps: v = {},
    invisible: b = !1,
    open: p,
    slotProps: h = {},
    slots: d = {},
    TransitionComponent: g = lm,
    transitionDuration: w
  } = a, S = he(a, pm), x = C({}, a, {
    component: u,
    invisible: b
  }), E = um(x), y = (r = h.root) != null ? r : v.root;
  return /* @__PURE__ */ m(g, C({
    in: p,
    timeout: w
  }, S, {
    children: /* @__PURE__ */ m(dm, C({
      "aria-hidden": !0
    }, y, {
      as: (o = (i = d.root) != null ? i : f.Root) != null ? o : u,
      className: Oe(E.root, c, y == null ? void 0 : y.className),
      ownerState: C({}, x, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && ($s.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Root: s.elementType
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
  componentsProps: s.shape({
    root: s.object
  }),
  /**
   * If `true`, the backdrop is invisible.
   * It can be used when rendering a popover or a custom select component.
   * @default false
   */
  invisible: s.bool,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: s.shape({
    root: s.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: s.shape({
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Fade
   */
  TransitionComponent: s.elementType,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   */
  transitionDuration: s.oneOfType([s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })])
});
const fm = $s;
function hm(e) {
  return Qe("MuiModal", e);
}
mt("MuiModal", ["root", "hidden", "backdrop"]);
const mm = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], gm = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return ct({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, hm, r);
}, bm = Se("div", {
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
}) => C({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), vm = Se(fm, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), _s = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, a, l, c;
  const u = pt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = vm,
    BackdropProps: v,
    className: b,
    closeAfterTransition: p = !1,
    children: h,
    container: d,
    component: g,
    components: w = {},
    componentsProps: S = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: N = !1,
    disableRestoreFocus: T = !1,
    disableScrollLock: _ = !1,
    hideBackdrop: D = !1,
    keepMounted: j = !1,
    onBackdropClick: P,
    open: I,
    slotProps: A,
    slots: F
    // eslint-disable-next-line react/prop-types
  } = u, z = he(u, mm), R = C({}, u, {
    closeAfterTransition: p,
    disableAutoFocus: x,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: N,
    disableRestoreFocus: T,
    disableScrollLock: _,
    hideBackdrop: D,
    keepMounted: j
  }), {
    getRootProps: L,
    getBackdropProps: te,
    getTransitionProps: Q,
    portalRef: O,
    isTopModal: $,
    exited: V,
    hasTransition: q
  } = iu(C({}, R, {
    rootRef: n
  })), H = C({}, R, {
    exited: V
  }), X = gm(H), Y = {};
  if (h.props.tabIndex === void 0 && (Y.tabIndex = "-1"), q) {
    const {
      onEnter: ne,
      onExited: M
    } = Q();
    Y.onEnter = ne, Y.onExited = M;
  }
  const K = (r = (o = F == null ? void 0 : F.root) != null ? o : w.Root) != null ? r : bm, G = (i = (a = F == null ? void 0 : F.backdrop) != null ? a : w.Backdrop) != null ? i : f, Z = (l = A == null ? void 0 : A.root) != null ? l : S.root, ee = (c = A == null ? void 0 : A.backdrop) != null ? c : S.backdrop, ae = Pt({
    elementType: K,
    externalSlotProps: Z,
    externalForwardedProps: z,
    getSlotProps: L,
    additionalProps: {
      ref: n,
      as: g
    },
    ownerState: H,
    className: Oe(b, Z == null ? void 0 : Z.className, X == null ? void 0 : X.root, !H.open && H.exited && (X == null ? void 0 : X.hidden))
  }), B = Pt({
    elementType: G,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (ne) => te(C({}, ne, {
      onClick: (M) => {
        P && P(M), ne != null && ne.onClick && ne.onClick(M);
      }
    })),
    className: Oe(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: H
  });
  return !j && !I && (!q || V) ? null : /* @__PURE__ */ m(kn, {
    ref: O,
    container: d,
    disablePortal: N,
    children: /* @__PURE__ */ U(K, C({}, ae, {
      children: [!D && f ? /* @__PURE__ */ m(G, C({}, B)) : null, /* @__PURE__ */ m(er, {
        disableEnforceFocus: E,
        disableAutoFocus: x,
        disableRestoreFocus: T,
        isEnabled: $,
        open: I,
        children: /* @__PURE__ */ k.cloneElement(h, Y)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (_s.propTypes = {
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
  BackdropComponent: s.elementType,
  /**
   * Props applied to the [`Backdrop`](/material-ui/api/backdrop/) element.
   * @deprecated Use `slotProps.backdrop` instead.
   */
  BackdropProps: s.object,
  /**
   * A single child content element.
   */
  children: Cn.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When set to true the Modal waits until a nested Transition is completed before closing.
   * @default false
   */
  closeAfterTransition: s.bool,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: s.shape({
    Backdrop: s.elementType,
    Root: s.elementType
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
  componentsProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
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
  container: s.oneOfType([at, s.func]),
  /**
   * If `true`, the modal will not automatically shift focus to itself when it opens, and
   * replace it to the last focused element when it closes.
   * This also works correctly with any modal children that have the `disableAutoFocus` prop.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableAutoFocus: s.bool,
  /**
   * If `true`, the modal will not prevent focus from leaving the modal while open.
   *
   * Generally this should never be set to `true` as it makes the modal less
   * accessible to assistive technologies, like screen readers.
   * @default false
   */
  disableEnforceFocus: s.bool,
  /**
   * If `true`, hitting escape will not fire the `onClose` callback.
   * @default false
   */
  disableEscapeKeyDown: s.bool,
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool,
  /**
   * If `true`, the modal will not restore focus to previously focused element once
   * modal is hidden or unmounted.
   * @default false
   */
  disableRestoreFocus: s.bool,
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * If `true`, the backdrop is not rendered.
   * @default false
   */
  hideBackdrop: s.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Modal.
   * @default false
   */
  keepMounted: s.bool,
  /**
   * Callback fired when the backdrop is clicked.
   * @deprecated Use the `onClose` prop with the `reason` argument to handle the `backdropClick` events.
   */
  onBackdropClick: s.func,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`.
   */
  onClose: s.func,
  /**
   * A function called when a transition enters.
   */
  onTransitionEnter: s.func,
  /**
   * A function called when a transition has exited.
   */
  onTransitionExited: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * The props used for each slot inside the Modal.
   * @default {}
   */
  slotProps: s.shape({
    backdrop: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside the Modal.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: s.shape({
    backdrop: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object])
});
const ym = _s;
function wm(e) {
  return Qe("MuiPaper", e);
}
mt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const xm = ["className", "component", "elevation", "square", "variant"], Em = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return ct(i, wm, o);
}, km = Se("div", {
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
  return C({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && C({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${or("#fff", Yi(t.elevation))}, ${or("#fff", Yi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Ms = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = he(r, xm), f = C({}, r, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), v = Em(f);
  return process.env.NODE_ENV !== "production" && Mn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ m(km, C({
    as: i,
    ownerState: f,
    className: Oe(v.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (Ms.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: s.elementType,
  /**
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: Zt(Ha, (e) => {
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
  square: s.bool,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The variant to use.
   * @default 'elevation'
   */
  variant: s.oneOfType([s.oneOf(["elevation", "outlined"]), s.string])
});
const Tm = Ms;
function Nm(e) {
  return Qe("MuiPopover", e);
}
mt("MuiPopover", ["root", "paper"]);
const Om = ["onEntering"], Cm = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Sm = ["slotProps"];
function ta(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function na(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ra(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Gn(e) {
  return typeof e == "function" ? e() : e;
}
const Pm = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"]
  }, Nm, t);
}, Rm = Se(ym, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Is = Se(Tm, {
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
}), As = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const a = pt({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: f,
    anchorReference: v = "anchorEl",
    children: b,
    className: p,
    container: h,
    elevation: d = 8,
    marginThreshold: g = 16,
    open: w,
    PaperProps: S = {},
    slots: x,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: N = to,
    transitionDuration: T = "auto",
    TransitionProps: {
      onEntering: _
    } = {},
    disableScrollLock: D = !1
  } = a, j = he(a.TransitionProps, Om), P = he(a, Cm), I = (r = E == null ? void 0 : E.paper) != null ? r : S, A = k.useRef(), F = He(A, I.ref), z = C({}, a, {
    anchorOrigin: u,
    anchorReference: v,
    elevation: d,
    marginThreshold: g,
    externalPaperSlotProps: I,
    transformOrigin: y,
    TransitionComponent: N,
    transitionDuration: T,
    TransitionProps: j
  }), R = Pm(z), L = k.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const ne = Gn(c), M = ne && ne.nodeType === 1 ? ne : Ce(A.current).body, se = M.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const ke = M.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ke.top === 0 && ke.left === 0 && ke.right === 0 && ke.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + ta(se, u.vertical),
      left: se.left + na(se, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, f, v]), te = k.useCallback((ne) => ({
    vertical: ta(ne, y.vertical),
    horizontal: na(ne, y.horizontal)
  }), [y.horizontal, y.vertical]), Q = k.useCallback((ne) => {
    const M = {
      width: ne.offsetWidth,
      height: ne.offsetHeight
    }, se = te(M);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ra(se)
      };
    const ke = L();
    let Pe = ke.top - se.vertical, xe = ke.left - se.horizontal;
    const vt = Pe + M.height, Re = xe + M.width, et = Xt(Gn(c)), De = et.innerHeight - g, tt = et.innerWidth - g;
    if (g !== null && Pe < g) {
      const Te = Pe - g;
      Pe -= Te, se.vertical += Te;
    } else if (g !== null && vt > De) {
      const Te = vt - De;
      Pe -= Te, se.vertical += Te;
    }
    if (process.env.NODE_ENV !== "production" && M.height > De && M.height && De && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${M.height - De}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), g !== null && xe < g) {
      const Te = xe - g;
      xe -= Te, se.horizontal += Te;
    } else if (Re > tt) {
      const Te = Re - tt;
      xe -= Te, se.horizontal += Te;
    }
    return {
      top: `${Math.round(Pe)}px`,
      left: `${Math.round(xe)}px`,
      transformOrigin: ra(se)
    };
  }, [c, v, L, te, g]), [O, $] = k.useState(w), V = k.useCallback(() => {
    const ne = A.current;
    if (!ne)
      return;
    const M = Q(ne);
    M.top !== null && (ne.style.top = M.top), M.left !== null && (ne.style.left = M.left), ne.style.transformOrigin = M.transformOrigin, $(!0);
  }, [Q]);
  k.useEffect(() => (D && window.addEventListener("scroll", V), () => window.removeEventListener("scroll", V)), [c, D, V]);
  const q = (ne, M) => {
    _ && _(ne, M), V();
  }, H = () => {
    $(!1);
  };
  k.useEffect(() => {
    w && V();
  }), k.useImperativeHandle(l, () => w ? {
    updatePosition: () => {
      V();
    }
  } : null, [w, V]), k.useEffect(() => {
    if (!w)
      return;
    const ne = Ba(() => {
      V();
    }), M = Xt(c);
    return M.addEventListener("resize", ne), () => {
      ne.clear(), M.removeEventListener("resize", ne);
    };
  }, [c, w, V]);
  let X = T;
  T === "auto" && !N.muiSupportAuto && (X = void 0);
  const Y = h || (c ? Ce(Gn(c)).body : void 0), K = (o = x == null ? void 0 : x.root) != null ? o : Rm, G = (i = x == null ? void 0 : x.paper) != null ? i : Is, Z = Pt({
    elementType: G,
    externalSlotProps: C({}, I, {
      style: O ? I.style : C({}, I.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: d,
      ref: F
    },
    ownerState: z,
    className: Oe(R.paper, I == null ? void 0 : I.className)
  }), ee = Pt({
    elementType: K,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: P,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: Y,
      open: w
    },
    ownerState: z,
    className: Oe(R.root, p)
  }), {
    slotProps: ae
  } = ee, B = he(ee, Sm);
  return /* @__PURE__ */ m(K, C({}, B, !qa(K) && {
    slotProps: ae,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ m(N, C({
      appear: !0,
      in: w,
      onEntering: q,
      onExited: H,
      timeout: X
    }, j, {
      children: /* @__PURE__ */ m(G, C({}, Z, {
        children: b
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (As.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: vo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: Zt(s.oneOfType([at, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Gn(e.anchorEl);
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
  anchorOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * This is the position that may be used to set the position of the popover.
   * The coordinates are relative to the application's client area.
   */
  anchorPosition: s.shape({
    left: s.number.isRequired,
    top: s.number.isRequired
  }),
  /**
   * This determines which anchor prop to refer to when setting
   * the position of the popover.
   * @default 'anchorEl'
   */
  anchorReference: s.oneOf(["anchorEl", "anchorPosition", "none"]),
  /**
   * The content of the component.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * An HTML element, component instance, or function that returns either.
   * The `container` will passed to the Modal component.
   *
   * By default, it uses the body of the anchorEl's top-level document object,
   * so it's simply `document.body` most of the time.
   */
  container: s.oneOfType([at, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Ha,
  /**
   * Specifies how close to the edge of the window the popover can appear.
   * If null, the popover will not be constrained by the window.
   * @default 16
   */
  marginThreshold: s.number,
  /**
   * Callback fired when the component requests to be closed.
   * The `reason` parameter can optionally be used to control the response to `onClose`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * Props applied to the [`Paper`](/material-ui/api/paper/) element.
   *
   * This prop is an alias for `slotProps.paper` and will be overriden by it if both are used.
   * @deprecated Use `slotProps.paper` instead.
   *
   * @default {}
   */
  PaperProps: s.shape({
    component: ip
  }),
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
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
  transformOrigin: s.shape({
    horizontal: s.oneOfType([s.oneOf(["center", "left", "right"]), s.number]).isRequired,
    vertical: s.oneOfType([s.oneOf(["bottom", "center", "top"]), s.number]).isRequired
  }),
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: s.elementType,
  /**
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object
});
const $m = As;
function _m(e) {
  return Qe("MuiMenu", e);
}
mt("MuiMenu", ["root", "paper", "list"]);
const Mm = ["onEntering"], Im = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Am = {
  vertical: "top",
  horizontal: "right"
}, Dm = {
  vertical: "top",
  horizontal: "left"
}, Bm = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, _m, t);
}, jm = Se($m, {
  shouldForwardProp: (e) => hs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Lm = Se(Is, {
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
}), Fm = Se(im, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Ds = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o;
  const i = pt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: f = {},
    onClose: v,
    open: b,
    PaperProps: p = {},
    PopoverClasses: h,
    transitionDuration: d = "auto",
    TransitionProps: {
      onEntering: g
    } = {},
    variant: w = "selectedMenu",
    slots: S = {},
    slotProps: x = {}
  } = i, E = he(i.TransitionProps, Mm), y = he(i, Im), N = Mn(), T = N.direction === "rtl", _ = C({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: f,
    onEntering: g,
    PaperProps: p,
    transitionDuration: d,
    TransitionProps: E,
    variant: w
  }), D = Bm(_), j = a && !u && b, P = k.useRef(null), I = (Q, O) => {
    P.current && P.current.adjustStyleForScrollbar(Q, N), g && g(Q, O);
  }, A = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), v && v(Q, "tabKeyDown"));
  };
  let F = -1;
  k.Children.map(l, (Q, O) => {
    /* @__PURE__ */ k.isValidElement(Q) && (process.env.NODE_ENV !== "production" && Zn.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (w === "selectedMenu" && Q.props.selected || F === -1) && (F = O));
  });
  const z = (r = S.paper) != null ? r : Lm, R = (o = x.paper) != null ? o : p, L = Pt({
    elementType: S.root,
    externalSlotProps: x.root,
    ownerState: _,
    className: [D.root, c]
  }), te = Pt({
    elementType: z,
    externalSlotProps: R,
    ownerState: _,
    className: D.paper
  });
  return /* @__PURE__ */ m(jm, C({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: T ? "right" : "left"
    },
    transformOrigin: T ? Am : Dm,
    slots: {
      paper: z,
      root: S.root
    },
    slotProps: {
      root: L,
      paper: te
    },
    open: b,
    ref: n,
    transitionDuration: d,
    TransitionProps: C({
      onEntering: I
    }, E),
    ownerState: _
  }, y, {
    classes: h,
    children: /* @__PURE__ */ m(Fm, C({
      onKeyDown: A,
      actions: P,
      autoFocus: a && (F === -1 || u),
      autoFocusItem: j,
      variant: w
    }, f, {
      className: Oe(D.list, f.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ds.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([at, s.func]),
  /**
   * If `true` (Default) will focus the `[role="menu"]` if no focusable child is found. Disabled
   * children are not focusable. If you set this prop to `false` focus will be placed
   * on the parent modal container. This has severe accessibility implications
   * and should only be considered if you manage focus otherwise.
   * @default true
   */
  autoFocus: s.bool,
  /**
   * Menu contents, normally `MenuItem`s.
   */
  children: s.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: s.object,
  /**
   * @ignore
   */
  className: s.string,
  /**
   * When opening the menu will not focus the active item but the `[role="menu"]`
   * unless `autoFocus` is also set to `false`. Not using the default means not
   * following WAI-ARIA authoring practices. Please be considerate about possible
   * accessibility implications.
   * @default false
   */
  disableAutoFocusItem: s.bool,
  /**
   * Props applied to the [`MenuList`](/material-ui/api/menu-list/) element.
   * @default {}
   */
  MenuListProps: s.object,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {object} event The event source of the callback.
   * @param {string} reason Can be: `"escapeKeyDown"`, `"backdropClick"`, `"tabKeyDown"`.
   */
  onClose: s.func,
  /**
   * If `true`, the component is shown.
   */
  open: s.bool.isRequired,
  /**
   * @ignore
   */
  PaperProps: s.object,
  /**
   * `classes` prop applied to the [`Popover`](/material-ui/api/popover/) element.
   */
  PopoverClasses: s.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * @default {}
   */
  slotProps: s.shape({
    paper: s.oneOfType([s.func, s.object]),
    root: s.oneOfType([s.func, s.object])
  }),
  /**
   * The components used for each slot inside.
   *
   * @default {}
   */
  slots: s.shape({
    paper: s.elementType,
    root: s.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: s.oneOfType([s.arrayOf(s.oneOfType([s.func, s.object, s.bool])), s.func, s.object]),
  /**
   * The length of the transition in `ms`, or 'auto'
   * @default 'auto'
   */
  transitionDuration: s.oneOfType([s.oneOf(["auto"]), s.number, s.shape({
    appear: s.number,
    enter: s.number,
    exit: s.number
  })]),
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const Vm = Ds;
function Ub({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = J.useState(void 0), a = _e(
    (f) => {
      f.preventDefault(), i(
        o === void 0 ? {
          mouseX: f.clientX + 2,
          mouseY: f.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = _e(() => {
    i(void 0);
  }, []), c = io(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ U(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: a,
      children: [
        r,
        /* @__PURE__ */ m(
          Vm,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ m(
              Bo,
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
const zm = Es(/* @__PURE__ */ m("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Um(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const no = (e, t, n = {}) => {
  const r = Nt(t);
  r.current = t;
  const o = Nt(n);
  o.current = Um(o.current);
  const [i, a] = fe(() => r.current), [l, c] = fe(!0);
  return Ye(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const f = await e();
        u && (a(() => f), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || a(() => r.current);
    };
  }, [e]), [i, l];
};
function Hm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: a,
  children: l
}) {
  const [c, u] = fe(!1), [f, v] = fe(!1), b = _e(() => {
    c && u(!1), v(!1);
  }, [c]), p = _e((E) => {
    E.stopPropagation(), u((y) => {
      const N = !y;
      return N && E.shiftKey ? v(!0) : N || v(!1), N;
    });
  }, []), h = _e(
    (E) => (b(), r(E)),
    [r, b]
  ), [d, g] = fe({ top: 1, left: 1 });
  Ye(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), N = window.scrollY, T = window.scrollX, _ = y.top + N + E.clientHeight, D = y.left + T;
        g({ top: _, left: D });
      }
    }
  }, [c, o]);
  const [w] = no(
    _e(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [S] = no(
    _e(async () => (e == null ? void 0 : e(!0)) ?? n ?? w, [e, n, w, c]),
    n ?? w
  ), x = f && S ? S : w;
  return /* @__PURE__ */ U(_t, { children: [
    /* @__PURE__ */ m(
      ba,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${i ?? ""}`,
        color: "inherit",
        "aria-label": `${a ?? ""} menu button`,
        onClick: p,
        children: l ?? /* @__PURE__ */ m(zm, {})
      }
    ),
    /* @__PURE__ */ m(
      Jl,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: b,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: d.top,
            left: d.left
          }
        },
        children: x ? /* @__PURE__ */ m(
          Jh,
          {
            className: i,
            id: `${a ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: x
          }
        ) : void 0
      }
    )
  ] });
}
function Hb({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: i = !1,
  size: a = "medium",
  className: l,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ m(
    ba,
    {
      id: e,
      disabled: n,
      edge: i,
      size: a,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
const Wm = so(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Bs = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(va.Root, { ref: n, className: W(Wm(), e), ...t }));
Bs.displayName = va.Root.displayName;
function Xm({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: i,
  placeholder: a,
  isRequired: l = !1,
  className: c,
  defaultValue: u,
  value: f,
  onChange: v,
  onFocus: b,
  onBlur: p
}) {
  return /* @__PURE__ */ U("div", { className: W("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ m(
      Bs,
      {
        htmlFor: e,
        className: W({
          "pr-text-red-600": n,
          "pr-hidden": !i
        }),
        children: `${i}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ m(
      sr,
      {
        id: e,
        disabled: t,
        placeholder: a,
        required: l,
        className: W(c, { "pr-border-red-600": n }),
        defaultValue: u,
        value: f,
        onChange: v,
        onFocus: b,
        onBlur: p
      }
    ),
    /* @__PURE__ */ m("p", { className: W({ "pr-hidden": !o }), children: o })
  ] });
}
function Wb({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = fe(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ m(
    Xm,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (a) => i(a.target.value)
    }
  );
}
function Xb({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: i = 1,
  showMarks: a = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: u = "off",
  className: f,
  onChange: v,
  onChangeCommitted: b
}) {
  return /* @__PURE__ */ m(
    Zl,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: i,
      marks: a,
      defaultValue: l,
      value: c,
      valueLabelDisplay: u,
      className: `papi-slider ${n} ${f ?? ""}`,
      onChange: v,
      onChangeCommitted: b
    }
  );
}
function Gb({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: i = { vertical: "bottom", horizontal: "left" },
  ContentProps: a,
  children: l
}) {
  const c = {
    action: (a == null ? void 0 : a.action) || l,
    message: a == null ? void 0 : a.message,
    className: r
  };
  return /* @__PURE__ */ m(
    Ql,
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
function qb({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ m(
    ec,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function Yb({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = Nt(void 0);
  return /* @__PURE__ */ m("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ m(tc, { position: "static", id: r, children: /* @__PURE__ */ U(nc, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ m(
      Hm,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ m("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Kb = Ae.Root, Gm = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: n,
    className: W(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Gm.displayName = Ae.List.displayName;
const qm = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Trigger,
  {
    ref: n,
    className: W(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
qm.displayName = Ae.Trigger.displayName;
const Ym = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Content,
  {
    ref: n,
    className: W(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Ym.displayName = Ae.Content.displayName;
const Km = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Root,
  {
    orientation: "vertical",
    ref: n,
    className: W("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Km.displayName = Ae.List.displayName;
const Jm = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: n,
    className: W(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Jm.displayName = Ae.List.displayName;
const Jb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Trigger,
  {
    ref: n,
    ...t,
    className: W(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Zm = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Content,
  {
    ref: n,
    className: W(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Zm.displayName = Ae.Content.displayName;
const Un = (e) => e === "asc" ? /* @__PURE__ */ m($l, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ m(_l, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ m(Ml, { className: "pr-ml-2 pr-h-4 pr-w-4" }), Qm = (e, t, n, r, o) => [
  {
    accessorKey: "character",
    header: ({ column: i }) => /* @__PURE__ */ U(Ne, { onClick: () => i.toggleSorting(void 0), children: [
      e,
      Un(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: i }) => /* @__PURE__ */ U(Ne, { onClick: () => i.toggleSorting(void 0), children: [
      t,
      Un(i.getIsSorted())
    ] }),
    cell: ({ row: i }) => i.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: i }) => /* @__PURE__ */ U(Ne, { onClick: () => i.toggleSorting(void 0), children: [
      n,
      Un(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: i, table: a }) => {
      const l = a.getSelectedRowModel().rows, c = [];
      return l.forEach((u) => {
        c.push(u.getValue("character"));
      }), /* @__PURE__ */ U("div", { children: [
        /* @__PURE__ */ m("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ U(Ne, { onClick: () => i.toggleSorting(void 0), children: [
          r,
          Un(i.getIsSorted())
        ] }) }),
        /* @__PURE__ */ U("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ m(Ne, { children: /* @__PURE__ */ m(
            ti,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ m(Ne, { children: /* @__PURE__ */ m(
            ni,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ m(Ne, { children: /* @__PURE__ */ m(
            ri,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, void 0);
              }
            }
          ) })
        ] })
      ] });
    },
    cell: ({ row: i }) => {
      const a = i.getValue("status");
      return a === !0 ? /* @__PURE__ */ m(ti, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : a === !1 ? /* @__PURE__ */ m(ni, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ m(ri, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function eg({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: n,
  localizedStrings: r
}) {
  const o = r["%webView_inventory_table_header_character%"], i = r["%webView_inventory_table_header_unicode_value%"], a = r["%webView_inventory_table_header_count%"], l = r["%webView_inventory_table_header_status%"], c = (u, f) => {
    f.toggleAllRowsSelected(!1), u.toggleSelected(void 0), n(u.getValue("character"));
  };
  return /* @__PURE__ */ m("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ m(
    Uc,
    {
      columns: Qm(
        o,
        i,
        a,
        l,
        t
      ),
      data: e,
      onRowClickHandler: c
    }
  ) });
}
const oa = (e, t, n) => {
  if (!e || e === "" || t === "")
    return [];
  const r = [], o = e.split(`
`);
  let i = "0", a = "0", l = 0;
  return o.forEach((c) => {
    const u = c.split(/\s+/);
    c.startsWith("\\c") && ([, i] = u, a = "0"), c.startsWith("\\v") && ([, a] = u, i === "0" && (i = n.chapterNum.toString()));
    for (let f = 0; f < u.length; f++)
      if (u[f].includes(t)) {
        const v = Math.max(0, f - 2), b = Math.min(u.length, f + 3), p = u.slice(v, b).join(" "), h = {
          reference: { ...n, chapterNum: +i, verseNum: +a },
          snippet: p,
          key: l
        };
        l += 1, r.push(h);
      }
  }), r;
};
function tg({
  selectedCharacter: e,
  text: t,
  scriptureReference: n,
  setScriptureReference: r,
  localizedStrings: o
}) {
  const i = o["%webView_inventory_occurrences_table_header_reference%"], a = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = fe(
    oa(t, e, n)
  );
  return Ye(
    () => c(oa(t, e, n)),
    [t, e, n]
  ), /* @__PURE__ */ U(ho, { children: [
    /* @__PURE__ */ m(mo, { children: /* @__PURE__ */ U(Ut, { children: [
      /* @__PURE__ */ m(Yn, { children: i }),
      /* @__PURE__ */ m(Yn, { children: a })
    ] }) }),
    /* @__PURE__ */ m(go, { children: l.map((u) => /* @__PURE__ */ U(
      Ut,
      {
        onClick: () => {
          r(u.reference);
        },
        children: [
          /* @__PURE__ */ m(xn, { children: `${me.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}` }),
          /* @__PURE__ */ m(xn, { children: u.snippet })
        ]
      },
      u.key
    )) })
  ] });
}
const ng = async (e, t, n, r, o) => {
  const i = [];
  return bl(e, "").forEach((a) => {
    if (n !== "" && !a.includes(n))
      return;
    const l = i.find((c) => c.character === a);
    if (l)
      l.count += 1;
    else {
      let c;
      if (r.includes(a) && (c = !0), o.includes(a) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const u = {
          character: a,
          count: 1,
          status: c
        };
        i.push(u);
      }
    }
  }), i;
};
function Zb({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  projectId: r,
  getSetting: o,
  setSetting: i,
  getText: a
}) {
  const l = n["%webView_characterInventory_characters_all%"], c = n["%webView_characterInventory_characters_approved%"], u = n["%webView_characterInventory_characters_unapproved%"], f = n["%webView_characterInventory_characters_unknown%"], v = n["%webView_inventory_scope_book%"], b = n["%webView_inventory_scope_chapter%"], p = n["%webView_inventory_scope_verse%"], h = n["%webView_inventory_filter_text%"], [d, g] = fe([]), [w, S] = fe([]), [x, E] = fe(void 0), [y, N] = fe("book"), [T, _] = fe("all"), [D, j] = fe(""), [P, I] = fe([]), [A, F] = fe(""), z = (R, L) => {
    I((te) => {
      let Q = [];
      return R.forEach((O) => {
        Q = te.map(($) => $.character === O && $.status !== L ? { ...$, status: L } : $);
      }), g((O) => {
        let $ = [...O];
        return R.forEach((V) => {
          L === !0 ? $.includes(V) || $.push(V) : $ = $.filter((q) => q !== V);
        }), i("validCharacters", r, $), $;
      }), S((O) => {
        let $ = [...O];
        return R.forEach((V) => {
          L === !1 ? $.includes(V) || $.push(V) : $ = $.filter(
            (q) => q !== V
          );
        }), i("invalidCharacters", r, $), $;
      }), Q;
    });
  };
  return Ye(() => {
    (async () => {
      try {
        g(await o("validCharacters", r)), S(await o("invalidCharacters", r));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [r, o]), Ye(() => {
    (async () => {
      try {
        const L = await a(r, e, y);
        E(L);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [r, e, y, a]), Ye(() => {
    if (!x) {
      I([]);
      return;
    }
    (async () => {
      try {
        I(
          await ng(x, T, D, d, w)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [d, w, x, T, D]), /* @__PURE__ */ U("div", { className: "pr-twp", children: [
    /* @__PURE__ */ U("div", { className: "pr-flex", children: [
      /* @__PURE__ */ U(
        Ur,
        {
          onValueChange: (R) => _(R),
          defaultValue: T,
          children: [
            /* @__PURE__ */ m(Kn, { children: /* @__PURE__ */ m(Hr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ U(Jn, { children: [
              /* @__PURE__ */ m(ot, { value: "all", children: l }),
              /* @__PURE__ */ m(ot, { value: "approved", children: c }),
              /* @__PURE__ */ m(ot, { value: "unapproved", children: u }),
              /* @__PURE__ */ m(ot, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ U(Ur, { onValueChange: (R) => N(R), defaultValue: y, children: [
        /* @__PURE__ */ m(Kn, { children: /* @__PURE__ */ m(Hr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ U(Jn, { children: [
          /* @__PURE__ */ m(ot, { value: "book", children: v }),
          /* @__PURE__ */ m(ot, { value: "chapter", children: b }),
          /* @__PURE__ */ m(ot, { value: "verse", children: p })
        ] })
      ] }),
      /* @__PURE__ */ m(
        sr,
        {
          className: "pr-rounded-md pr-border",
          placeholder: h,
          value: D,
          onChange: (R) => {
            j(R.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ m(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${A !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ m(
          eg,
          {
            tableData: P,
            onStatusChange: z,
            onSelectCharacter: (R) => {
              F(R);
            },
            localizedStrings: n
          }
        )
      }
    ),
    A !== "" && /* @__PURE__ */ m("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ m(
      tg,
      {
        selectedCharacter: A,
        text: x,
        scriptureReference: e,
        setScriptureReference: (R) => t(R),
        localizedStrings: n
      }
    ) })
  ] });
}
function Qb({
  isDownloading: e,
  handleClick: t,
  buttonText: n
}) {
  return /* @__PURE__ */ m(
    Ne,
    {
      className: W(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600": !n,
          "pr-w-20": n
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ m(ao, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ U(_t, { children: [
        /* @__PURE__ */ m(Il, { size: 25, className: "pr-h-4 pr-w-4" }),
        n
      ] })
    }
  );
}
function ev({ isRemoving: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    Ne,
    {
      className: W(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ U(_t, { children: [
        /* @__PURE__ */ m(ao, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Removing..."
      ] }) : "Remove"
    }
  );
}
function tv({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    Ne,
    {
      className: W(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ U(_t, { children: [
        /* @__PURE__ */ m(ao, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Tt() {
  return Tt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Tt.apply(this, arguments);
}
const rg = ["children", "options"], ia = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), aa = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, og = ["style", "script"], ig = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, ag = /mailto:/i, sg = /\n{2,}$/, js = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, lg = /^ *> ?/gm, cg = /^ {2,}\n/, pg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Ls = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Fs = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, ug = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, dg = /^(?:\n *)*\n/, fg = /\r\n?/g, hg = /^\[\^([^\]]+)](:.*)\n/, mg = /^\[\^([^\]]+)]/, gg = /\f/g, bg = /^\s*?\[(x|\s)\]/, Vs = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, zs = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Us = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, ro = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, vg = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Hs = /^<!--[\s\S]*?(?:-->)/, yg = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, oo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, wg = /^\{.*\}$/, xg = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Eg = /^<([^ >]+@[^ >]+)>/, kg = /^<([^ >]+:\/[^ >]+)>/, Tg = /-([a-z])?/gi, Ws = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, Ng = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, Og = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, Cg = /^\[([^\]]*)\] ?\[([^\]]*)\]/, Sg = /(\[|\])/g, Pg = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, Rg = /\t/g, $g = /^ *\| */, _g = /(^ *\||\| *$)/g, Mg = / *$/, Ig = /^ *:-+: *$/, Ag = /^ *:-+ *$/, Dg = /^ *-+: *$/, Bg = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, jg = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, Lg = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Fg = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Vg = /^\\([^0-9A-Za-z\s])/, zg = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, Ug = /^\n+/, Hg = /^([ \t]*)/, Wg = /\\([^\\])/g, sa = / *\n+$/, Xg = /(?:^|\n)( *)$/, jo = "(?:\\d+\\.)", Lo = "(?:[*+-])";
function Xs(e) {
  return "( *)(" + (e === 1 ? jo : Lo) + ") +";
}
const Gs = Xs(1), qs = Xs(2);
function Ys(e) {
  return new RegExp("^" + (e === 1 ? Gs : qs));
}
const Gg = Ys(1), qg = Ys(2);
function Ks(e) {
  return new RegExp("^" + (e === 1 ? Gs : qs) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? jo : Lo) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Js = Ks(1), Zs = Ks(2);
function Qs(e) {
  const t = e === 1 ? jo : Lo;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const el = Qs(1), tl = Qs(2);
function la(e, t) {
  const n = t === 1, r = n ? el : tl, o = n ? Js : Zs, i = n ? Gg : qg;
  return { t(a, l, c) {
    const u = Xg.exec(c);
    return u && (l.o || !l._ && !l.u) ? r.exec(a = u[1] + a) : null;
  }, i: ie.HIGH, l(a, l, c) {
    const u = n ? +a[2] : void 0, f = a[0].replace(sg, `
`).match(o);
    let v = !1;
    return { p: f.map(function(b, p) {
      const h = i.exec(b)[0].length, d = new RegExp("^ {1," + h + "}", "gm"), g = b.replace(d, "").replace(i, ""), w = p === f.length - 1, S = g.indexOf(`

`) !== -1 || w && v;
      v = S;
      const x = c._, E = c.o;
      let y;
      c.o = !0, S ? (c._ = !1, y = g.replace(sa, `

`)) : (c._ = !0, y = g.replace(sa, ""));
      const N = l(y, c);
      return c._ = x, c.o = E, N;
    }), m: n, g: u };
  }, h: (a, l, c) => e(a.m ? "ol" : "ul", { key: c.k, start: a.g }, a.p.map(function(u, f) {
    return e("li", { key: f }, l(u, c));
  })) };
}
const Yg = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Kg = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, nl = [js, Ls, Fs, Vs, Us, zs, Hs, Ws, Js, el, Zs, tl], Jg = [...nl, /^[^\n]+(?:  \n|\n{2,})/, ro, oo];
function Zg(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Qg(e) {
  return Dg.test(e) ? "right" : Ig.test(e) ? "center" : Ag.test(e) ? "left" : null;
}
function ca(e, t, n) {
  const r = n.$;
  n.$ = !0;
  const o = t(e.trim(), n);
  n.$ = r;
  let i = [[]];
  return o.forEach(function(a, l) {
    a.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && i.push([]) : (a.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (a.v = a.v.replace(Mg, "")), i[i.length - 1].push(a));
  }), i;
}
function eb(e, t, n) {
  n._ = !0;
  const r = ca(e[1], t, n), o = e[2].replace(_g, "").split("|").map(Qg), i = function(a, l, c) {
    return a.trim().split(`
`).map(function(u) {
      return ca(u, l, c);
    });
  }(e[3], t, n);
  return n._ = !1, { S: o, A: i, L: r, type: "table" };
}
function pa(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function dt(e) {
  return function(t, n) {
    return n._ ? e.exec(t) : null;
  };
}
function ft(e) {
  return function(t, n) {
    return n._ || n.u ? e.exec(t) : null;
  };
}
function rt(e) {
  return function(t, n) {
    return n._ || n.u ? null : e.exec(t);
  };
}
function un(e) {
  return function(t) {
    return e.exec(t);
  };
}
function tb(e, t, n) {
  if (t._ || t.u || n && !n.endsWith(`
`))
    return null;
  let r = "";
  e.split(`
`).every((i) => !nl.some((a) => a.test(i)) && (r += i + `
`, i.trim()));
  const o = r.trimEnd();
  return o == "" ? null : [r, o];
}
function Ft(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function ua(e) {
  return e.replace(Wg, "$1");
}
function qn(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !0, n.u = !0;
  const i = e(t, n);
  return n._ = r, n.u = o, i;
}
function nb(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !1, n.u = !0;
  const i = e(t, n);
  return n._ = r, n.u = o, i;
}
function rb(e, t, n) {
  return n._ = !1, e(t, n);
}
const Br = (e, t, n) => ({ v: qn(t, e[1], n) });
function jr() {
  return {};
}
function Lr() {
  return null;
}
function ob(...e) {
  return e.filter(Boolean).join(" ");
}
function Fr(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (; o.length && (r = r[o[0]], r !== void 0); )
    o.shift();
  return r || n;
}
var ie;
function ib(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Zg, t.namedCodesToUnicode = t.namedCodesToUnicode ? Tt({}, aa, t.namedCodesToUnicode) : aa;
  const n = t.createElement || k.createElement;
  function r(p, h, ...d) {
    const g = Fr(t.overrides, `${p}.props`, {});
    return n(function(w, S) {
      const x = Fr(S, w);
      return x ? typeof x == "function" || typeof x == "object" && "render" in x ? x : Fr(S, `${w}.component`, w) : w;
    }(p, t.overrides), Tt({}, h, g, { className: ob(h == null ? void 0 : h.className, g.className) || void 0 }), ...d);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = Pg.test(p) === !1);
    const d = f(u(h ? p : `${p.trimEnd().replace(Ug, "")}

`, { _: h }));
    for (; typeof d[d.length - 1] == "string" && !d[d.length - 1].trim(); )
      d.pop();
    if (t.wrapper === null)
      return d;
    const g = t.wrapper || (h ? "span" : "div");
    let w;
    if (d.length > 1 || t.forceWrapper)
      w = d;
    else {
      if (d.length === 1)
        return w = d[0], typeof w == "string" ? r("span", { key: "outer" }, w) : w;
      w = null;
    }
    return k.createElement(g, { key: "outer" }, w);
  }
  function i(p) {
    const h = p.match(ig);
    return h ? h.reduce(function(d, g, w) {
      const S = g.indexOf("=");
      if (S !== -1) {
        const x = function(T) {
          return T.indexOf("-") !== -1 && T.match(yg) === null && (T = T.replace(Tg, function(_, D) {
            return D.toUpperCase();
          })), T;
        }(g.slice(0, S)).trim(), E = function(T) {
          const _ = T[0];
          return (_ === '"' || _ === "'") && T.length >= 2 && T[T.length - 1] === _ ? T.slice(1, -1) : T;
        }(g.slice(S + 1).trim()), y = ia[x] || x, N = d[y] = function(T, _) {
          return T === "style" ? _.split(/;\s?/).reduce(function(D, j) {
            const P = j.slice(0, j.indexOf(":"));
            return D[P.replace(/(-[a-z])/g, (I) => I[1].toUpperCase())] = j.slice(P.length + 1).trim(), D;
          }, {}) : T === "href" ? Ft(_) : (_.match(wg) && (_ = _.slice(1, _.length - 1)), _ === "true" || _ !== "false" && _);
        }(x, E);
        typeof N == "string" && (ro.test(N) || oo.test(N)) && (d[y] = k.cloneElement(o(N.trim()), { key: w }));
      } else
        g !== "style" && (d[ia[g] || g] = !0);
      return d;
    }, {}) : null;
  }
  const a = [], l = {}, c = { blockQuote: { t: rt(js), i: ie.HIGH, l: (p, h, d) => ({ v: h(p[0].replace(lg, ""), d) }), h: (p, h, d) => r("blockquote", { key: d.k }, h(p.v, d)) }, breakLine: { t: un(cg), i: ie.HIGH, l: jr, h: (p, h, d) => r("br", { key: d.k }) }, breakThematic: { t: rt(pg), i: ie.HIGH, l: jr, h: (p, h, d) => r("hr", { key: d.k }) }, codeBlock: { t: rt(Fs), i: ie.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, d) => r("pre", { key: d.k }, r("code", Tt({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: rt(Ls), i: ie.MAX, l: (p) => ({ O: i(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: ft(ug), i: ie.LOW, l: (p) => ({ v: p[2] }), h: (p, h, d) => r("code", { key: d.k }, p.v) }, footnote: { t: rt(hg), i: ie.MAX, l: (p) => (a.push({ I: p[2], j: p[1] }), {}), h: Lr }, footnoteReference: { t: dt(mg), i: ie.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, d) => r("a", { key: d.k, href: Ft(p.B) }, r("sup", { key: d.k }, p.v)) }, gfmTask: { t: dt(bg), i: ie.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, d) => r("input", { checked: p.R, key: d.k, readOnly: !0, type: "checkbox" }) }, heading: { t: rt(t.enforceAtxHeadings ? zs : Vs), i: ie.HIGH, l: (p, h, d) => ({ v: qn(h, p[2], d), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, d) => r(`h${p.C}`, { id: p.T, key: d.k }, h(p.v, d)) }, headingSetext: { t: rt(Us), i: ie.MAX, l: (p, h, d) => ({ v: qn(h, p[1], d), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: un(Hs), i: ie.HIGH, l: () => ({}), h: Lr }, image: { t: ft(Kg), i: ie.HIGH, l: (p) => ({ D: p[1], B: ua(p[2]), F: p[3] }), h: (p, h, d) => r("img", { key: d.k, alt: p.D || void 0, title: p.F || void 0, src: Ft(p.B) }) }, link: { t: dt(Yg), i: ie.LOW, l: (p, h, d) => ({ v: nb(h, p[1], d), B: ua(p[2]), F: p[3] }), h: (p, h, d) => r("a", { key: d.k, href: Ft(p.B), title: p.F }, h(p.v, d)) }, linkAngleBraceStyleDetector: { t: dt(kg), i: ie.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : dt(xg)(p, h), i: ie.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: dt(Eg), i: ie.MAX, l(p) {
    let h = p[1], d = p[1];
    return ag.test(d) || (d = "mailto:" + d), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: d, type: "link" };
  } }, orderedList: la(r, 1), unorderedList: la(r, 2), newlineCoalescer: { t: rt(dg), i: ie.LOW, l: jr, h: () => `
` }, paragraph: { t: tb, i: ie.LOW, l: Br, h: (p, h, d) => r("p", { key: d.k }, h(p.v, d)) }, ref: { t: dt(Ng), i: ie.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: Lr }, refImage: { t: ft(Og), i: ie.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, d) => r("img", { key: d.k, alt: p.D, src: Ft(l[p.P].B), title: l[p.P].F }) }, refLink: { t: dt(Cg), i: ie.MAX, l: (p, h, d) => ({ v: h(p[1], d), Z: h(p[0].replace(Sg, "\\$1"), d), P: p[2] }), h: (p, h, d) => l[p.P] ? r("a", { key: d.k, href: Ft(l[p.P].B), title: l[p.P].F }, h(p.v, d)) : r("span", { key: d.k }, h(p.Z, d)) }, table: { t: rt(Ws), i: ie.HIGH, l: eb, h: (p, h, d) => r("table", { key: d.k }, r("thead", null, r("tr", null, p.L.map(function(g, w) {
    return r("th", { key: w, style: pa(p, w) }, h(g, d));
  }))), r("tbody", null, p.A.map(function(g, w) {
    return r("tr", { key: w }, g.map(function(S, x) {
      return r("td", { key: x, style: pa(p, x) }, h(S, d));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, $g.exec(p)) : null;
  }, i: ie.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: un(zg), i: ie.MIN, l: (p) => ({ v: p[0].replace(vg, (h, d) => t.namedCodesToUnicode[d] ? t.namedCodesToUnicode[d] : h) }), h: (p) => p.v }, textBolded: { t: ft(Bg), i: ie.MED, l: (p, h, d) => ({ v: h(p[2], d) }), h: (p, h, d) => r("strong", { key: d.k }, h(p.v, d)) }, textEmphasized: { t: ft(jg), i: ie.LOW, l: (p, h, d) => ({ v: h(p[2], d) }), h: (p, h, d) => r("em", { key: d.k }, h(p.v, d)) }, textEscaped: { t: ft(Vg), i: ie.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: ft(Lg), i: ie.LOW, l: Br, h: (p, h, d) => r("mark", { key: d.k }, h(p.v, d)) }, textStrikethroughed: { t: ft(Fg), i: ie.LOW, l: Br, h: (p, h, d) => r("del", { key: d.k }, h(p.v, d)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: un(ro), i: ie.HIGH, l(p, h, d) {
    const [, g] = p[3].match(Hg), w = new RegExp(`^${g}`, "gm"), S = p[3].replace(w, ""), x = (E = S, Jg.some((_) => _.test(E)) ? rb : qn);
    var E;
    const y = p[1].toLowerCase(), N = og.indexOf(y) !== -1;
    d.N = d.N || y === "a";
    const T = N ? p[3] : x(h, S, d);
    return d.N = !1, { O: i(p[2]), v: T, G: N, H: N ? y : p[1] };
  }, h: (p, h, d) => r(p.H, Tt({ key: d.k }, p.O), p.G ? p.v : h(p.v, d)) }, c.htmlSelfClosing = { t: un(oo), i: ie.HIGH, l: (p) => ({ O: i(p[2] || ""), H: p[1] }), h: (p, h, d) => r(p.H, Tt({}, p.O, { key: d.k })) });
  const u = function(p) {
    let h = Object.keys(p);
    function d(g, w) {
      let S = [], x = "";
      for (; g; ) {
        let E = 0;
        for (; E < h.length; ) {
          const y = h[E], N = p[y], T = N.t(g, w, x);
          if (T) {
            const _ = T[0];
            g = g.substring(_.length);
            const D = N.l(T, d, w);
            D.type == null && (D.type = y), S.push(D), x = _;
            break;
          }
          E++;
        }
      }
      return S;
    }
    return h.sort(function(g, w) {
      let S = p[g].i, x = p[w].i;
      return S !== x ? S - x : g < w ? -1 : 1;
    }), function(g, w) {
      return d(function(S) {
        return S.replace(fg, `
`).replace(gg, "").replace(Rg, "    ");
      }(g), w);
    };
  }(c), f = (v = function(p) {
    return function(h, d, g) {
      return p[h.type].h(h, d, g);
    };
  }(c), function p(h, d = {}) {
    if (Array.isArray(h)) {
      const g = d.k, w = [];
      let S = !1;
      for (let x = 0; x < h.length; x++) {
        d.k = x;
        const E = p(h[x], d), y = typeof E == "string";
        y && S ? w[w.length - 1] += E : E !== null && w.push(E), S = y;
      }
      return d.k = g, w;
    }
    return v(h, p, d);
  });
  var v;
  const b = o(e);
  return a.length ? r("div", null, b, r("footer", { key: "footer" }, a.map(function(p) {
    return r("div", { id: t.slugify(p.j), key: p.j }, p.j, f(u(p.I, { _: !0 })));
  }))) : b;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ie || (ie = {}));
const ab = (e) => {
  let { children: t, options: n } = e, r = function(o, i) {
    if (o == null)
      return {};
    var a, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      i.indexOf(a = u[l]) >= 0 || (c[a] = o[a]);
    return c;
  }(e, rg);
  return k.cloneElement(ib(t, n), r);
};
function nv({ markdown: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-prose", children: /* @__PURE__ */ m(ab, { children: e }) });
}
const rv = (e, t) => {
  Ye(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Vr = () => !1, ov = (e, t) => {
  const [n] = no(
    _e(async () => {
      if (!e)
        return Vr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Vr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ye(() => () => {
    n !== Vr && n();
  }, [n]);
}, sb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "div",
    {
      ref: n,
      className: W(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
sb.displayName = "Card";
const lb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "div",
    {
      ref: n,
      className: W("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
lb.displayName = "CardHeader";
const cb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "h3",
    {
      ref: n,
      className: W("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
cb.displayName = "CardTitle";
const pb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("p", { ref: n, className: W("pr-text-sm pr-text-muted-foreground", e), ...t }));
pb.displayName = "CardDescription";
const ub = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: W("pr-p-6 pr-pt-0", e), ...t })
);
ub.displayName = "CardContent";
const db = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: W("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
db.displayName = "CardFooter";
const fb = so(
  "pr-relative pr-w-full pr-rounded-lg pr-border pr-p-4 [&>svg~*]:pr-pl-7 [&>svg+div]:pr-translate-y-[-3px] [&>svg]:pr-absolute [&>svg]:pr-left-4 [&>svg]:pr-top-4 [&>svg]:pr-text-foreground",
  {
    variants: {
      variant: {
        default: "pr-bg-background pr-text-foreground",
        destructive: "pr-border-destructive/50 pr-text-destructive dark:pr-border-destructive [&>svg]:pr-text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), hb = J.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ m("div", { ref: r, role: "alert", className: W(fb({ variant: t }), e), ...n }));
hb.displayName = "Alert";
const mb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ U(
    "h5",
    {
      ref: n,
      className: W("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
mb.displayName = "AlertTitle";
const gb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: W("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
gb.displayName = "AlertDescription";
const bb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ U(
  dn.Root,
  {
    ref: n,
    className: W(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ m(dn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ m(dn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ m(dn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
bb.displayName = dn.Root.displayName;
const vb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  zr.Root,
  {
    className: W(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ m(
      zr.Thumb,
      {
        className: W(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
vb.displayName = zr.Root.displayName;
function yb(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
yb(`.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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

  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds pr-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
    --card: 0 0% 0%;
    --card-foreground: 0, 0%, 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
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
.pr-pointer-events-none {
  pointer-events: none;
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
.pr-m-2 {
  margin: 0.5rem;
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
.pr-ml-2 {
  margin-left: 0.5rem;
}
.pr-ml-auto {
  margin-left: auto;
}
.pr-mr-1 {
  margin-right: 0.25rem;
}
.pr-mr-2 {
  margin-right: 0.5rem;
}
.pr-ms-2 {
  margin-inline-start: 0.5rem;
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
.pr-block {
  display: block;
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
.pr-h-14 {
  height: 3.5rem;
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
.pr-h-5 {
  height: 1.25rem;
}
.pr-h-6 {
  height: 1.5rem;
}
.pr-h-7 {
  height: 1.75rem;
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
.pr-h-full {
  height: 100%;
}
.pr-h-px {
  height: 1px;
}
.pr-max-h-96 {
  max-height: 24rem;
}
.pr-w-0 {
  width: 0px;
}
.pr-w-10 {
  width: 2.5rem;
}
.pr-w-11 {
  width: 2.75rem;
}
.pr-w-14 {
  width: 3.5rem;
}
.pr-w-2 {
  width: 0.5rem;
}
.pr-w-20 {
  width: 5rem;
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
.pr-w-5 {
  width: 1.25rem;
}
.pr-w-8 {
  width: 2rem;
}
.pr-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.pr-w-\\[100px\\] {
  width: 100px;
}
.pr-w-\\[116px\\] {
  width: 116px;
}
.pr-w-\\[124px\\] {
  width: 124px;
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
.pr-max-w-64 {
  max-width: 16rem;
}
.pr-flex-1 {
  flex: 1 1 0%;
}
.pr-shrink-0 {
  flex-shrink: 0;
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
@keyframes pr-spin {

  to {
    transform: rotate(360deg);
  }
}
.pr-animate-spin {
  animation: pr-spin 1s linear infinite;
}
.pr-cursor-default {
  cursor: default;
}
.pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-cursor-pointer {
  cursor: pointer;
}
.pr-touch-none {
  touch-action: none;
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
.pr-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.pr-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
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
.pr-break-words {
  overflow-wrap: break-word;
}
.pr-rounded-full {
  border-radius: 9999px;
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
.pr-rounded-b-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
}
.pr-rounded-t-none {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
}
.pr-rounded-ss-none {
  border-start-start-radius: 0px;
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
.pr-border-border {
  border-color: hsl(var(--border));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
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
.pr-bg-accent {
  background-color: hsl(var(--accent));
}
.pr-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
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
.pr-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.pr-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.pr-bg-border {
  background-color: hsl(var(--border));
}
.pr-bg-card {
  background-color: hsl(var(--card));
}
.pr-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.pr-bg-destructive {
  background-color: hsl(var(--destructive));
}
.pr-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.pr-bg-foreground {
  background-color: hsl(var(--foreground));
}
.pr-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.pr-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.pr-bg-input {
  background-color: hsl(var(--input));
}
.pr-bg-muted {
  background-color: hsl(var(--muted));
}
.pr-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.pr-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.pr-bg-popover {
  background-color: hsl(var(--popover));
}
.pr-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.pr-bg-primary {
  background-color: hsl(var(--primary));
}
.pr-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.pr-bg-ring {
  background-color: hsl(var(--ring));
}
.pr-bg-secondary {
  background-color: hsl(var(--secondary));
}
.pr-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
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
.pr-p-6 {
  padding: 1.5rem;
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
.pr-pt-0 {
  padding-top: 0px;
}
.pr-pt-3 {
  padding-top: 0.75rem;
}
.pr-pt-4 {
  padding-top: 1rem;
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
.pr-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
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
.pr-capitalize {
  text-transform: capitalize;
}
.pr-leading-none {
  line-height: 1;
}
.pr-tracking-tight {
  letter-spacing: -0.025em;
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
.pr-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.pr-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.pr-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.pr-text-current {
  color: currentColor;
}
.pr-text-destructive {
  color: hsl(var(--destructive));
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
.pr-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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
.pr-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.pr-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.pr-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.pr-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.pr-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
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
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-duration-300 {
  transition-duration: 300ms;
}
.pr-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.pr-duration-300 {
  animation-duration: 300ms;
}
.pr-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
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
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
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
.focus-visible\\:pr-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
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
.data-\\[state\\=checked\\]\\:pr-translate-x-5[data-state=checked] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:pr-translate-x-0[data-state=unchecked] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
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
.data-\\[state\\=unchecked\\]\\:pr-bg-input[data-state=unchecked] {
  background-color: hsl(var(--input));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
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

  .dark\\:pr-border-destructive {
    border-color: hsl(var(--destructive));
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
.\\[\\&\\>svg\\+div\\]\\:pr-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.\\[\\&\\>svg\\]\\:pr-absolute>svg {
  position: absolute;
}
.\\[\\&\\>svg\\]\\:pr-left-4>svg {
  left: 1rem;
}
.\\[\\&\\>svg\\]\\:pr-top-4>svg {
  top: 1rem;
}
.\\[\\&\\>svg\\]\\:pr-text-destructive>svg {
  color: hsl(var(--destructive));
}
.\\[\\&\\>svg\\]\\:pr-text-foreground>svg {
  color: hsl(var(--foreground));
}
.\\[\\&\\>svg\\~\\*\\]\\:pr-pl-7>svg~* {
  padding-left: 1.75rem;
}
.\\[\\&\\>tr\\]\\:last\\:pr-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}
.\\[\\&_p\\]\\:pr-leading-relaxed p {
  line-height: 1.625;
}
.\\[\\&_tr\\:last-child\\]\\:pr-border-0 tr:last-child {
  border-width: 0px;
}
.\\[\\&_tr\\]\\:pr-border-b tr {
  border-bottom-width: 1px;
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
`, "top");
export {
  hb as Alert,
  gb as AlertDescription,
  mb as AlertTitle,
  Lb as BookChapterControl,
  Ne as Button,
  sb as Card,
  ub as CardContent,
  pb as CardDescription,
  db as CardFooter,
  lb as CardHeader,
  cb as CardTitle,
  Vb as ChapterRangeSelector,
  Zb as CharacterInventory,
  Hc as Checkbox,
  zb as Checklist,
  ci as ComboBox,
  Ub as ContextMenu,
  Uc as DataTable,
  Qb as DownloadButton,
  Na as DropdownMenu,
  Ca as DropdownMenuCheckboxItem,
  uo as DropdownMenuContent,
  Ab as DropdownMenuGroup,
  Oa as DropdownMenuItem,
  ar as DropdownMenuLabel,
  Db as DropdownMenuPortal,
  jb as DropdownMenuRadioGroup,
  kc as DropdownMenuRadioItem,
  fo as DropdownMenuSeparator,
  Tc as DropdownMenuShortcut,
  Bb as DropdownMenuSub,
  Ec as DropdownMenuSubContent,
  xc as DropdownMenuSubTrigger,
  wc as DropdownMenuTrigger,
  Jh as GridMenu,
  Hm as HamburgerMenuButton,
  Hb as IconButton,
  sr as Input,
  Vt as LabelPosition,
  nv as MarkdownRenderer,
  Ts as MenuItem,
  ev as RemoveButton,
  Wb as SearchBar,
  Ur as Select,
  Jn as SelectContent,
  Fb as SelectGroup,
  ot as SelectItem,
  Lc as SelectLabel,
  Pa as SelectScrollDownButton,
  Sa as SelectScrollUpButton,
  Fc as SelectSeparator,
  Kn as SelectTrigger,
  Hr as SelectValue,
  bb as ShadCnSlider,
  vb as ShadCnSwitch,
  Xb as Slider,
  Gb as Snackbar,
  qb as Switch,
  ho as Table,
  go as TableBody,
  Bc as TableCaption,
  xn as TableCell,
  Dc as TableFooter,
  Yn as TableHead,
  mo as TableHeader,
  Ut as TableRow,
  Kb as Tabs,
  Ym as TabsContent,
  Gm as TabsList,
  qm as TabsTrigger,
  Xm as TextField,
  Yb as Toolbar,
  tv as UpdateButton,
  Km as VerticalTabs,
  Zm as VerticalTabsContent,
  Jm as VerticalTabsList,
  Jb as VerticalTabsTrigger,
  jc as buttonVariants,
  rv as useEvent,
  ov as useEventAsync,
  no as usePromise
};
//# sourceMappingURL=index.js.map
