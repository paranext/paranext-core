import bl, { jsxs as F, jsx as h, Fragment as It } from "react/jsx-runtime";
import * as k from "react";
import Q, { forwardRef as fa, useCallback as Oe, useState as he, useRef as Nt, useEffect as mt, useLayoutEffect as ri, useMemo as cr } from "react";
import { getChaptersForBook as vl, split as yl } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as wl } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as xl, Check as ma, Circle as El, History as kl, ArrowDownWideNarrow as Tl, Clock as Nl, Bookmark as Ol, ChevronDown as ha, ChevronUp as Sl, ArrowLeftIcon as Cl, ChevronLeftIcon as Pl, ChevronRightIcon as Rl, ArrowRightIcon as $l, FilterIcon as _l, ArrowUpIcon as Il, ArrowDownIcon as Ml, ArrowUpDownIcon as Al, CircleCheckIcon as Yn, CircleXIcon as Kn, CircleHelpIcon as Jn, LoaderCircle as co, Download as Dl } from "lucide-react";
import Se, { clsx as jl } from "clsx";
import { extendTailwindMerge as Bl } from "tailwind-merge";
import { useReactTable as Ll, getCoreRowModel as Vl, getPaginationRowModel as Fl, getSortedRowModel as zl, getFilteredRowModel as Ul, flexRender as oi } from "@tanstack/react-table";
import { Slot as Hl } from "@radix-ui/react-slot";
import { cva as po } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import { Autocomplete as Wl, TextField as Xl, FormControlLabel as ii, FormLabel as Gl, Checkbox as ql, MenuItem as Yl, ListItemText as Kl, ListItemIcon as ga, Menu as Jl, Grid as ba, List as Zl, IconButton as va, Drawer as Ql, Slider as ec, Snackbar as tc, Switch as nc, AppBar as rc, Toolbar as oc } from "@mui/material";
import ic, { ThemeContext as ac, internal_processStyles as sc } from "@mui/styled-engine";
import * as lc from "react-dom";
import Bn from "react-dom";
import * as ya from "@radix-ui/react-label";
import * as Ae from "@radix-ui/react-tabs";
import * as fn from "@radix-ui/react-slider";
import * as Xr from "@radix-ui/react-switch";
var cc = Object.defineProperty, pc = (e, t, n) => t in e ? cc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => pc(e, typeof t != "symbol" ? t + "" : t, n);
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
], uo = [
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
], wa = [
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
], ai = wc();
function Zt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ai ? ai[e] : 0;
}
function fo(e) {
  return Zt(e) > 0;
}
function uc(e) {
  const t = typeof e == "string" ? Zt(e) : e;
  return t >= 40 && t <= 66;
}
function dc(e) {
  return (typeof e == "string" ? Zt(e) : e) <= 39;
}
function xa(e) {
  return e <= 66;
}
function fc(e) {
  const t = typeof e == "string" ? Zt(e) : e;
  return Ta(t) && !xa(t);
}
function* mc() {
  for (let e = 1; e <= Ct.length; e++)
    yield e;
}
const hc = 1, Ea = Ct.length;
function gc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function mo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Ct.length ? t : Ct[n];
}
function ka(e) {
  return e <= 0 || e > Ea ? "******" : wa[e - 1];
}
function bc(e) {
  return ka(Zt(e));
}
function Ta(e) {
  const t = typeof e == "number" ? mo(e) : e;
  return fo(t) && !uo.includes(t);
}
function vc(e) {
  const t = typeof e == "number" ? mo(e) : e;
  return fo(t) && uo.includes(t);
}
function yc(e) {
  return wa[e - 1].includes("*obsolete*");
}
function wc() {
  const e = {};
  for (let t = 0; t < Ct.length; t++)
    e[Ct[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Ct,
  nonCanonicalIds: uo,
  bookIdToNumber: Zt,
  isBookIdValid: fo,
  isBookNT: uc,
  isBookOT: dc,
  isBookOTNT: xa,
  isBookDC: fc,
  allBookNumbers: mc,
  firstBook: hc,
  lastBook: Ea,
  extraBooks: gc,
  bookNumberToId: mo,
  bookNumberToEnglishName: ka,
  bookIdToEnglishName: bc,
  isCanonical: Ta,
  isExtraMaterial: vc,
  isObsolete: yc
};
var qe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(qe || {});
const Be = class {
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
oe(Be, "Original", new Be(qe.Original)), oe(Be, "Septuagint", new Be(qe.Septuagint)), oe(Be, "Vulgate", new Be(qe.Vulgate)), oe(Be, "English", new Be(qe.English)), oe(Be, "RussianProtestant", new Be(qe.RussianProtestant)), oe(Be, "RussianOrthodox", new Be(qe.RussianOrthodox));
let wt = Be;
function si(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Na = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Na || {});
const _e = class le {
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
      if (r instanceof an)
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
      throw new an(
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
          throw new an("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new an("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(r[1]))
      throw new an("Invalid reference : " + t);
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
    (t === "" || t === this.verseNum.toString()) && (t = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: t,
      versificationStr: this.versificationStr
    };
    return t || delete n.verse, n;
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
oe(_e, "defaultVersification", wt.English), oe(_e, "verseRangeSeparator", "-"), oe(_e, "verseSequenceIndicator", ","), oe(_e, "verseRangeSeparators", [_e.verseRangeSeparator]), oe(_e, "verseSequenceIndicators", [_e.verseSequenceIndicator]), oe(_e, "chapterDigitShifter", 1e3), oe(_e, "bookDigitShifter", _e.chapterDigitShifter * _e.chapterDigitShifter), oe(_e, "bcvMaxValue", _e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(_e, "ValidStatusType", Na);
let an = class extends Error {
};
const xc = Bl({ prefix: "pr-" });
function W(...e) {
  return xc(jl(e));
}
const Oa = ge.Root, Ec = ge.Trigger, Fb = ge.Group, zb = ge.Portal, Ub = ge.Sub, Hb = ge.RadioGroup, kc = Q.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ F(
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
      /* @__PURE__ */ h(xl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
kc.displayName = ge.SubTrigger.displayName;
const Tc = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Tc.displayName = ge.SubContent.displayName;
const ho = Q.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ h(ge.Portal, { children: /* @__PURE__ */ h(
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
ho.displayName = ge.Content.displayName;
const Sa = Q.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ h(
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
Sa.displayName = ge.Item.displayName;
const Ca = Q.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ F(
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
      /* @__PURE__ */ h("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ h(ge.ItemIndicator, { children: /* @__PURE__ */ h(ma, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Ca.displayName = ge.CheckboxItem.displayName;
const Nc = Q.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ F(
  ge.RadioItem,
  {
    ref: r,
    className: W(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ h("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ h(ge.ItemIndicator, { children: /* @__PURE__ */ h(El, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Nc.displayName = ge.RadioItem.displayName;
const pr = Q.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ h(
  ge.Label,
  {
    ref: r,
    className: W("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
pr.displayName = ge.Label.displayName;
const go = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  ge.Separator,
  {
    ref: n,
    className: W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
go.displayName = ge.Separator.displayName;
function Oc({ className: e, ...t }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: W("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Oc.displayName = "DropdownMenuShortcut";
const ur = Q.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ h(
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
ur.displayName = "Input";
const Sc = fa(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, i) => /* @__PURE__ */ F("div", { className: "pr-relative", children: [
    /* @__PURE__ */ h(
      ur,
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
    /* @__PURE__ */ h(
      kl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function Cc({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const i = Array.from({ length: t }, (l, c) => c + 1), a = Oe(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ h("div", { className: W("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: i.map((l) => /* @__PURE__ */ h(
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
const Pc = fa(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: i,
    children: a
  }, l) => /* @__PURE__ */ F(
    Sa,
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
        /* @__PURE__ */ h(
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
        n && /* @__PURE__ */ h("div", { children: a })
      ]
    },
    e
  )
);
function Rc({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ F(pr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ h("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ h(
        Tl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ h(
        Nl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ h(
        Ol,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const bn = me.allBookIds, $c = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, li = ["OT", "NT", "DC"], _c = 32 + 32 + 32, Ic = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Mc = (e) => ({
  OT: bn.filter((n) => me.isBookOT(n)),
  NT: bn.filter((n) => me.isBookNT(n)),
  DC: bn.filter((n) => me.isBookDC(n))
})[e], sn = (e) => vl(me.bookIdToNumber(e));
function Ac() {
  return bn.map((t) => me.bookIdToEnglishName(t));
}
function Dc(e) {
  return Ac().includes(e);
}
function jc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Dc(t))
    return bn.find((r) => me.bookIdToEnglishName(r) === t);
}
function Wb({ scrRef: e, handleSubmit: t }) {
  const [n, r] = he(""), [o, i] = he(
    me.bookNumberToId(e.bookNum)
  ), [a, l] = he(e.chapterNum ?? 0), [c, u] = he(
    me.bookNumberToId(e.bookNum)
  ), [f, v] = he(!1), [g, p] = he(f), m = Nt(void 0), d = Nt(void 0), b = Nt(void 0), w = Oe(
    (P) => Mc(P).filter((I) => {
      const M = me.bookIdToEnglishName(I).toLowerCase(), V = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return M.includes(V) || // Match book name
      I.toLowerCase().includes(V);
    }),
    [n]
  ), C = (P) => {
    r(P);
  }, x = Nt(!1), E = Oe((P) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    v(P);
  }, []), y = Oe(
    (P, I, M, V) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== P ? 1 : e.chapterNum
      ), I || sn(P) === -1) {
        t({
          bookNum: me.bookIdToNumber(P),
          chapterNum: M || 1,
          verseNum: V || 1
        }), v(!1), r("");
        return;
      }
      i(o !== P ? P : ""), v(!I);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (P) => {
    P <= 0 || P > sn(o) || y(o, !0, P);
  }, O = Oe(() => {
    Ic.forEach((P) => {
      const I = n.match(P);
      if (I) {
        const [M, V = void 0, D = void 0] = I.slice(1), _ = jc(M);
        (me.isBookIdValid(M) || _) && y(
          _ ?? M,
          !0,
          V ? parseInt(V, 10) : 1,
          D ? parseInt(D, 10) : 1
        );
      }
    });
  }, [y, n]), R = Oe(
    (P) => {
      f ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof d < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      d.current !== null && d.current.focus(), P.preventDefault()) : v(!0);
    },
    [f]
  ), A = (P) => {
    const { key: I } = P;
    I === "ArrowRight" || I === "ArrowLeft" || I === "ArrowDown" || I === "ArrowUp" || I === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: I })), m.current.focus());
  }, L = (P) => {
    const { key: I } = P;
    if (c === o) {
      if (I === "Enter") {
        P.preventDefault(), y(o, !0, a);
        return;
      }
      let M = 0;
      if (I === "ArrowRight")
        if (a < sn(c))
          M = 1;
        else {
          P.preventDefault();
          return;
        }
      else if (I === "ArrowLeft")
        if (a > 1)
          M = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        I === "ArrowDown" ? M = 6 : I === "ArrowUp" && (M = -6);
      a + M <= 0 || a + M > sn(c) ? l(0) : M !== 0 && (l(a + M), P.preventDefault());
    }
  };
  return mt(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), ri(() => {
    p(f);
  }, [f]), ri(() => {
    const P = setTimeout(() => {
      if (g && d.current && b.current) {
        const M = b.current.offsetTop - _c;
        d.current.scrollTo({ top: M, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [g]), /* @__PURE__ */ h("div", { className: "pr-flex", children: /* @__PURE__ */ F(Oa, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ h(Ec, { asChild: !0, children: /* @__PURE__ */ h(
      Sc,
      {
        ref: m,
        value: n,
        handleSearch: C,
        handleKeyDown: R,
        handleOnClick: () => {
          i(me.bookNumberToId(e.bookNum)), u(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), m.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: O,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ F(
      ho,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: A,
        align: "start",
        ref: d,
        children: [
          /* @__PURE__ */ h(
            Rc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          li.map(
            (P, I) => w(P).length > 0 && /* @__PURE__ */ F("div", { children: [
              /* @__PURE__ */ h(pr, { className: "pr-font-semibold pr-text-slate-700", children: $c[P] }),
              w(P).map((M) => /* @__PURE__ */ h("div", { children: /* @__PURE__ */ h(
                Pc,
                {
                  bookId: M,
                  handleSelectBook: () => y(M, !1),
                  isSelected: o === M,
                  handleHighlightBook: () => u(M),
                  handleKeyDown: L,
                  bookType: P,
                  ref: (V) => {
                    o === M && (b.current = V);
                  },
                  children: /* @__PURE__ */ h(
                    Cc,
                    {
                      handleSelectChapter: T,
                      endChapter: sn(M),
                      activeChapter: e.bookNum === me.bookIdToNumber(M) ? e.chapterNum : 0,
                      highlightedChapter: a,
                      handleHighlightedChapter: (V) => {
                        l(V);
                      }
                    }
                  )
                }
              ) }, M)),
              li.length - 1 !== I ? /* @__PURE__ */ h(go, {}) : void 0
            ] }, P)
          )
        ]
      }
    )
  ] }) });
}
const bo = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ h(
    "table",
    {
      ref: n,
      className: W("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
bo.displayName = "Table";
const vo = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("thead", { ref: n, className: W("[&_tr]:pr-border-b", e), ...t }));
vo.displayName = "TableHeader";
const yo = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("tbody", { ref: n, className: W("[&_tr:last-child]:pr-border-0", e), ...t }));
yo.displayName = "TableBody";
const Bc = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "tfoot",
  {
    ref: n,
    className: W("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Bc.displayName = "TableFooter";
const Ht = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Ht.displayName = "TableRow";
const Zn = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Zn.displayName = "TableHead";
const En = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "td",
  {
    ref: n,
    className: W("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
En.displayName = "TableCell";
const Lc = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "caption",
  {
    ref: n,
    className: W("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Lc.displayName = "TableCaption";
const Vc = po(
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
), ve = Q.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, i) => /* @__PURE__ */ h(r ? Hl : "button", { className: W(Vc({ variant: t, size: n, className: e })), ref: i, ...o })
);
ve.displayName = "Button";
const Gr = xe.Root, Xb = xe.Group, qr = xe.Value, Qn = Q.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ F(
  xe.Trigger,
  {
    ref: r,
    className: W(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ h(xe.Icon, { asChild: !0, children: /* @__PURE__ */ h(ha, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Qn.displayName = xe.Trigger.displayName;
const Pa = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  xe.ScrollUpButton,
  {
    ref: n,
    className: W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ h(Sl, { className: "pr-h-4 pr-w-4" })
  }
));
Pa.displayName = xe.ScrollUpButton.displayName;
const Ra = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  xe.ScrollDownButton,
  {
    ref: n,
    className: W("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ h(ha, { className: "pr-h-4 pr-w-4" })
  }
));
Ra.displayName = xe.ScrollDownButton.displayName;
const er = Q.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ h(xe.Portal, { children: /* @__PURE__ */ F(
  xe.Content,
  {
    ref: o,
    className: W(
      "pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ h(Pa, {}),
      /* @__PURE__ */ h(
        xe.Viewport,
        {
          className: W(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ h(Ra, {})
    ]
  }
) }));
er.displayName = xe.Content.displayName;
const Fc = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  xe.Label,
  {
    ref: n,
    className: W("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Fc.displayName = xe.Label.displayName;
const rt = Q.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ F(
  xe.Item,
  {
    ref: r,
    className: W(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ h("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ h(xe.ItemIndicator, { children: /* @__PURE__ */ h(ma, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ h(xe.ItemText, { children: t })
    ]
  }
));
rt.displayName = xe.Item.displayName;
const zc = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  xe.Separator,
  {
    ref: n,
    className: W("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
zc.displayName = xe.Separator.displayName;
function Uc({ table: e }) {
  return /* @__PURE__ */ h("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ F("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ h("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ F(
        Gr,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ h(Qn, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ h(qr, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ h(er, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ h(rt, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ F("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ F(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ h(Cl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ F(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ h(Pl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ F(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ h(Rl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ F(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ h($l, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Hc({ table: e }) {
  return /* @__PURE__ */ F(Oa, { children: [
    /* @__PURE__ */ h(wl, { asChild: !0, children: /* @__PURE__ */ F(ve, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ h(_l, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ F(ho, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ h(pr, { children: "Toggle columns" }),
      /* @__PURE__ */ h(go, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ h(
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
function Wc({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var d;
  const [a, l] = he([]), [c, u] = he([]), [f, v] = he({}), [g, p] = he({}), m = Ll({
    data: t,
    columns: e,
    getCoreRowModel: Vl(),
    ...n && { getPaginationRowModel: Fl() },
    onSortingChange: l,
    getSortedRowModel: zl(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Ul(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: p,
    state: {
      sorting: a,
      columnFilters: c,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ F("div", { children: [
    o && /* @__PURE__ */ h(Hc, { table: m }),
    /* @__PURE__ */ h("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ F(bo, { children: [
      /* @__PURE__ */ h(vo, { children: m.getHeaderGroups().map((b) => /* @__PURE__ */ h(Ht, { children: b.headers.map((w) => /* @__PURE__ */ h(Zn, { children: w.isPlaceholder ? void 0 : oi(w.column.columnDef.header, w.getContext()) }, w.id)) }, b.id)) }),
      /* @__PURE__ */ h(yo, { children: (d = m.getRowModel().rows) != null && d.length ? m.getRowModel().rows.map((b) => /* @__PURE__ */ h(
        Ht,
        {
          onClick: () => i(b, m),
          "data-state": b.getIsSelected() && "selected",
          children: b.getVisibleCells().map((w) => /* @__PURE__ */ h(En, { children: oi(w.column.columnDef.cell, w.getContext()) }, w.id))
        },
        b.id
      )) : /* @__PURE__ */ h(Ht, { children: /* @__PURE__ */ h(En, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ h(
        ve,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.previousPage(),
          disabled: !m.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ h(
        ve,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.nextPage(),
          disabled: !m.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ h(Uc, { table: m })
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
  onBlur: g,
  getOptionLabel: p
}) {
  return /* @__PURE__ */ h(
    Wl,
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
      onBlur: g,
      getOptionLabel: p,
      renderInput: (m) => /* @__PURE__ */ h(
        Xl,
        {
          ...m,
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
function Gb({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, i] = he(1), [a, l] = he(r), [c, u] = he(
    Array.from({ length: r }, (g, p) => p + 1)
  );
  mt(() => {
    i(1), e(1), l(r), t(r), u(Array.from({ length: r }, (g, p) => p + 1));
  }, [r, t, e]);
  const f = (g, p) => {
    i(p), e(p), p > a && (l(p), t(p));
  }, v = (g, p) => {
    l(p), t(p), p < o && (i(p), e(p));
  };
  return /* @__PURE__ */ F(It, { children: [
    /* @__PURE__ */ h(
      ii,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ h(
          ci,
          {
            onChange: (g, p) => f(g, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (g) => g.toString(),
            value: o,
            isDisabled: n
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ h(
      ii,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ h(
          ci,
          {
            onChange: (g, p) => v(g, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (g) => g.toString(),
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
var zt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(zt || {});
function Xc({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = zt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: i,
  isDisabled: a = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const f = /* @__PURE__ */ h(
    ql,
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
    const g = r === zt.Before || r === zt.Above, p = /* @__PURE__ */ h("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), m = r === zt.Before || r === zt.After, d = m ? p : /* @__PURE__ */ h("div", { children: p }), b = m ? f : /* @__PURE__ */ h("div", { children: f });
    v = /* @__PURE__ */ F(
      Gl,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: a,
        error: l,
        children: [
          g && d,
          b,
          !g && d
        ]
      }
    );
  } else
    v = f;
  return v;
}
function qb({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: i,
  createLabel: a
}) {
  return /* @__PURE__ */ F("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ h("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ h(
      Xc,
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
function fe(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, i;
  for (i = 0; i < r.length; i++)
    o = r[i], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function S() {
  return S = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, S.apply(this, arguments);
}
function Gc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function qc(e) {
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
var Yr = { exports: {} }, Ln = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var pi;
function Yc() {
  if (pi)
    return ce;
  pi = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function x(y) {
    if (typeof y == "object" && y !== null) {
      var T = y.$$typeof;
      switch (T) {
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
                case m:
                case p:
                case a:
                  return y;
                default:
                  return T;
              }
          }
        case n:
          return T;
      }
    }
  }
  function E(y) {
    return x(y) === u;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = u, ce.ContextConsumer = l, ce.ContextProvider = a, ce.Element = t, ce.ForwardRef = f, ce.Fragment = r, ce.Lazy = m, ce.Memo = p, ce.Portal = n, ce.Profiler = i, ce.StrictMode = o, ce.Suspense = v, ce.isAsyncMode = function(y) {
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
    return x(y) === m;
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
    return typeof y == "string" || typeof y == "function" || y === r || y === u || y === i || y === o || y === v || y === g || typeof y == "object" && y !== null && (y.$$typeof === m || y.$$typeof === p || y.$$typeof === a || y.$$typeof === l || y.$$typeof === f || y.$$typeof === b || y.$$typeof === w || y.$$typeof === C || y.$$typeof === d);
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
function Kc() {
  return ui || (ui = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, i = e ? Symbol.for("react.profiler") : 60114, a = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function x(B) {
      return typeof B == "string" || typeof B == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      B === r || B === u || B === i || B === o || B === v || B === g || typeof B == "object" && B !== null && (B.$$typeof === m || B.$$typeof === p || B.$$typeof === a || B.$$typeof === l || B.$$typeof === f || B.$$typeof === b || B.$$typeof === w || B.$$typeof === C || B.$$typeof === d);
    }
    function E(B) {
      if (typeof B == "object" && B !== null) {
        var ne = B.$$typeof;
        switch (ne) {
          case t:
            var $ = B.type;
            switch ($) {
              case c:
              case u:
              case r:
              case i:
              case o:
              case v:
                return $;
              default:
                var se = $ && $.$$typeof;
                switch (se) {
                  case l:
                  case f:
                  case m:
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
    var y = c, T = u, O = l, R = a, A = t, L = f, P = r, I = m, M = p, V = n, D = i, _ = o, z = v, Z = !1;
    function q(B) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(B) || E(B) === c;
    }
    function N(B) {
      return E(B) === u;
    }
    function j(B) {
      return E(B) === l;
    }
    function U(B) {
      return E(B) === a;
    }
    function J(B) {
      return typeof B == "object" && B !== null && B.$$typeof === t;
    }
    function H(B) {
      return E(B) === f;
    }
    function X(B) {
      return E(B) === r;
    }
    function Y(B) {
      return E(B) === m;
    }
    function K(B) {
      return E(B) === p;
    }
    function G(B) {
      return E(B) === n;
    }
    function ee(B) {
      return E(B) === i;
    }
    function te(B) {
      return E(B) === o;
    }
    function ae(B) {
      return E(B) === v;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = T, pe.ContextConsumer = O, pe.ContextProvider = R, pe.Element = A, pe.ForwardRef = L, pe.Fragment = P, pe.Lazy = I, pe.Memo = M, pe.Portal = V, pe.Profiler = D, pe.StrictMode = _, pe.Suspense = z, pe.isAsyncMode = q, pe.isConcurrentMode = N, pe.isContextConsumer = j, pe.isContextProvider = U, pe.isElement = J, pe.isForwardRef = H, pe.isFragment = X, pe.isLazy = Y, pe.isMemo = K, pe.isPortal = G, pe.isProfiler = ee, pe.isStrictMode = te, pe.isSuspense = ae, pe.isValidElementType = x, pe.typeOf = E;
  }()), pe;
}
var di;
function $a() {
  return di || (di = 1, process.env.NODE_ENV === "production" ? Ln.exports = Yc() : Ln.exports = Kc()), Ln.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Pr, fi;
function Jc() {
  if (fi)
    return Pr;
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
  return Pr = o() ? Object.assign : function(i, a) {
    for (var l, c = r(i), u, f = 1; f < arguments.length; f++) {
      l = Object(arguments[f]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        u = e(l);
        for (var g = 0; g < u.length; g++)
          n.call(l, u[g]) && (c[u[g]] = l[u[g]]);
      }
    }
    return c;
  }, Pr;
}
var Rr, mi;
function wo() {
  if (mi)
    return Rr;
  mi = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Rr = e, Rr;
}
var $r, hi;
function _a() {
  return hi || (hi = 1, $r = Function.call.bind(Object.prototype.hasOwnProperty)), $r;
}
var _r, gi;
function Zc() {
  if (gi)
    return _r;
  gi = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = wo(), n = {}, r = _a();
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
              var g = Error(
                (c || "React class") + ": " + l + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof i[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw g.name = "Invariant Violation", g;
            }
            v = i[f](a, f, c, l, null, t);
          } catch (m) {
            v = m;
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
  }, _r = o, _r;
}
var Ir, bi;
function Qc() {
  if (bi)
    return Ir;
  bi = 1;
  var e = $a(), t = Jc(), n = wo(), r = _a(), o = Zc(), i = function() {
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
  return Ir = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(N) {
      var j = N && (u && N[u] || N[f]);
      if (typeof j == "function")
        return j;
    }
    var g = "<<anonymous>>", p = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: C(),
      arrayOf: x,
      element: E(),
      elementType: y(),
      instanceOf: T,
      node: L(),
      objectOf: R,
      oneOf: O,
      oneOfType: A,
      shape: I,
      exact: M
    };
    function m(N, j) {
      return N === j ? N !== 0 || 1 / N === 1 / j : N !== N && j !== j;
    }
    function d(N, j) {
      this.message = N, this.data = j && typeof j == "object" ? j : {}, this.stack = "";
    }
    d.prototype = Error.prototype;
    function b(N) {
      if (process.env.NODE_ENV !== "production")
        var j = {}, U = 0;
      function J(X, Y, K, G, ee, te, ae) {
        if (G = G || g, te = te || K, ae !== n) {
          if (c) {
            var B = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw B.name = "Invariant Violation", B;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ne = G + ":" + K;
            !j[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (i(
              "You are manually calling a React.PropTypes validation function for the `" + te + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), j[ne] = !0, U++);
          }
        }
        return Y[K] == null ? X ? Y[K] === null ? new d("The " + ee + " `" + te + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new d("The " + ee + " `" + te + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : N(Y, K, G, ee, te);
      }
      var H = J.bind(null, !1);
      return H.isRequired = J.bind(null, !0), H;
    }
    function w(N) {
      function j(U, J, H, X, Y, K) {
        var G = U[J], ee = _(G);
        if (ee !== N) {
          var te = z(G);
          return new d(
            "Invalid " + X + " `" + Y + "` of type " + ("`" + te + "` supplied to `" + H + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return b(j);
    }
    function C() {
      return b(a);
    }
    function x(N) {
      function j(U, J, H, X, Y) {
        if (typeof N != "function")
          return new d("Property `" + Y + "` of component `" + H + "` has invalid PropType notation inside arrayOf.");
        var K = U[J];
        if (!Array.isArray(K)) {
          var G = _(K);
          return new d("Invalid " + X + " `" + Y + "` of type " + ("`" + G + "` supplied to `" + H + "`, expected an array."));
        }
        for (var ee = 0; ee < K.length; ee++) {
          var te = N(K, ee, H, X, Y + "[" + ee + "]", n);
          if (te instanceof Error)
            return te;
        }
        return null;
      }
      return b(j);
    }
    function E() {
      function N(j, U, J, H, X) {
        var Y = j[U];
        if (!l(Y)) {
          var K = _(Y);
          return new d("Invalid " + H + " `" + X + "` of type " + ("`" + K + "` supplied to `" + J + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(N);
    }
    function y() {
      function N(j, U, J, H, X) {
        var Y = j[U];
        if (!e.isValidElementType(Y)) {
          var K = _(Y);
          return new d("Invalid " + H + " `" + X + "` of type " + ("`" + K + "` supplied to `" + J + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(N);
    }
    function T(N) {
      function j(U, J, H, X, Y) {
        if (!(U[J] instanceof N)) {
          var K = N.name || g, G = q(U[J]);
          return new d("Invalid " + X + " `" + Y + "` of type " + ("`" + G + "` supplied to `" + H + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return b(j);
    }
    function O(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? i(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : i("Invalid argument supplied to oneOf, expected an array.")), a;
      function j(U, J, H, X, Y) {
        for (var K = U[J], G = 0; G < N.length; G++)
          if (m(K, N[G]))
            return null;
        var ee = JSON.stringify(N, function(ae, B) {
          var ne = z(B);
          return ne === "symbol" ? String(B) : B;
        });
        return new d("Invalid " + X + " `" + Y + "` of value `" + String(K) + "` " + ("supplied to `" + H + "`, expected one of " + ee + "."));
      }
      return b(j);
    }
    function R(N) {
      function j(U, J, H, X, Y) {
        if (typeof N != "function")
          return new d("Property `" + Y + "` of component `" + H + "` has invalid PropType notation inside objectOf.");
        var K = U[J], G = _(K);
        if (G !== "object")
          return new d("Invalid " + X + " `" + Y + "` of type " + ("`" + G + "` supplied to `" + H + "`, expected an object."));
        for (var ee in K)
          if (r(K, ee)) {
            var te = N(K, ee, H, X, Y + "." + ee, n);
            if (te instanceof Error)
              return te;
          }
        return null;
      }
      return b(j);
    }
    function A(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && i("Invalid argument supplied to oneOfType, expected an instance of array."), a;
      for (var j = 0; j < N.length; j++) {
        var U = N[j];
        if (typeof U != "function")
          return i(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(U) + " at index " + j + "."
          ), a;
      }
      function J(H, X, Y, K, G) {
        for (var ee = [], te = 0; te < N.length; te++) {
          var ae = N[te], B = ae(H, X, Y, K, G, n);
          if (B == null)
            return null;
          B.data && r(B.data, "expectedType") && ee.push(B.data.expectedType);
        }
        var ne = ee.length > 0 ? ", expected one of type [" + ee.join(", ") + "]" : "";
        return new d("Invalid " + K + " `" + G + "` supplied to " + ("`" + Y + "`" + ne + "."));
      }
      return b(J);
    }
    function L() {
      function N(j, U, J, H, X) {
        return V(j[U]) ? null : new d("Invalid " + H + " `" + X + "` supplied to " + ("`" + J + "`, expected a ReactNode."));
      }
      return b(N);
    }
    function P(N, j, U, J, H) {
      return new d(
        (N || "React class") + ": " + j + " type `" + U + "." + J + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + H + "`."
      );
    }
    function I(N) {
      function j(U, J, H, X, Y) {
        var K = U[J], G = _(K);
        if (G !== "object")
          return new d("Invalid " + X + " `" + Y + "` of type `" + G + "` " + ("supplied to `" + H + "`, expected `object`."));
        for (var ee in N) {
          var te = N[ee];
          if (typeof te != "function")
            return P(H, X, Y, ee, z(te));
          var ae = te(K, ee, H, X, Y + "." + ee, n);
          if (ae)
            return ae;
        }
        return null;
      }
      return b(j);
    }
    function M(N) {
      function j(U, J, H, X, Y) {
        var K = U[J], G = _(K);
        if (G !== "object")
          return new d("Invalid " + X + " `" + Y + "` of type `" + G + "` " + ("supplied to `" + H + "`, expected `object`."));
        var ee = t({}, U[J], N);
        for (var te in ee) {
          var ae = N[te];
          if (r(N, te) && typeof ae != "function")
            return P(H, X, Y, te, z(ae));
          if (!ae)
            return new d(
              "Invalid " + X + " `" + Y + "` key `" + te + "` supplied to `" + H + "`.\nBad object: " + JSON.stringify(U[J], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var B = ae(K, te, H, X, Y + "." + te, n);
          if (B)
            return B;
        }
        return null;
      }
      return b(j);
    }
    function V(N) {
      switch (typeof N) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !N;
        case "object":
          if (Array.isArray(N))
            return N.every(V);
          if (N === null || l(N))
            return !0;
          var j = v(N);
          if (j) {
            var U = j.call(N), J;
            if (j !== N.entries) {
              for (; !(J = U.next()).done; )
                if (!V(J.value))
                  return !1;
            } else
              for (; !(J = U.next()).done; ) {
                var H = J.value;
                if (H && !V(H[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function D(N, j) {
      return N === "symbol" ? !0 : j ? j["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && j instanceof Symbol : !1;
    }
    function _(N) {
      var j = typeof N;
      return Array.isArray(N) ? "array" : N instanceof RegExp ? "object" : D(j, N) ? "symbol" : j;
    }
    function z(N) {
      if (typeof N > "u" || N === null)
        return "" + N;
      var j = _(N);
      if (j === "object") {
        if (N instanceof Date)
          return "date";
        if (N instanceof RegExp)
          return "regexp";
      }
      return j;
    }
    function Z(N) {
      var j = z(N);
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
    function q(N) {
      return !N.constructor || !N.constructor.name ? g : N.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Ir;
}
var Mr, vi;
function ep() {
  if (vi)
    return Mr;
  vi = 1;
  var e = wo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Mr = function() {
    function r(a, l, c, u, f, v) {
      if (v !== e) {
        var g = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw g.name = "Invariant Violation", g;
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
  }, Mr;
}
if (process.env.NODE_ENV !== "production") {
  var tp = $a(), np = !0;
  Yr.exports = Qc()(tp.isElement, np);
} else
  Yr.exports = ep()();
var rp = Yr.exports;
const s = /* @__PURE__ */ Gc(rp);
function Qt(e, t) {
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
function Ia(e) {
  if (!kt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ia(e[n]);
  }), t;
}
function ot(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? S({}, e) : e;
  return kt(e) && kt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (kt(t[o]) && o in e && kt(e[o]) ? r[o] = ot(e[o], t[o], n) : n.clone ? r[o] = kt(t[o]) ? Ia(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function op(e) {
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
  return typeof c == "function" && !op(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Aa = Qt(s.element, Ma);
Aa.isRequired = Qt(s.element.isRequired, Ma);
const Cn = Aa;
function ip(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ap(e, t, n, r, o) {
  const i = e[t], a = o || t;
  if (i == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof i == "function" && !ip(i) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const sp = Qt(s.elementType, ap), lp = "exact-prop: ​";
function Da(e) {
  return process.env.NODE_ENV === "production" ? e : S({}, e, {
    [lp]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Xt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Kr = { exports: {} }, ue = {};
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
function cp() {
  if (yi)
    return ue;
  yi = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function d(b) {
    if (typeof b == "object" && b !== null) {
      var w = b.$$typeof;
      switch (w) {
        case e:
          switch (b = b.type, b) {
            case n:
            case o:
            case r:
            case u:
            case f:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case a:
                case c:
                case g:
                case v:
                case i:
                  return b;
                default:
                  return w;
              }
          }
        case t:
          return w;
      }
    }
  }
  return ue.ContextConsumer = a, ue.ContextProvider = i, ue.Element = e, ue.ForwardRef = c, ue.Fragment = n, ue.Lazy = g, ue.Memo = v, ue.Portal = t, ue.Profiler = o, ue.StrictMode = r, ue.Suspense = u, ue.SuspenseList = f, ue.isAsyncMode = function() {
    return !1;
  }, ue.isConcurrentMode = function() {
    return !1;
  }, ue.isContextConsumer = function(b) {
    return d(b) === a;
  }, ue.isContextProvider = function(b) {
    return d(b) === i;
  }, ue.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, ue.isForwardRef = function(b) {
    return d(b) === c;
  }, ue.isFragment = function(b) {
    return d(b) === n;
  }, ue.isLazy = function(b) {
    return d(b) === g;
  }, ue.isMemo = function(b) {
    return d(b) === v;
  }, ue.isPortal = function(b) {
    return d(b) === t;
  }, ue.isProfiler = function(b) {
    return d(b) === o;
  }, ue.isStrictMode = function(b) {
    return d(b) === r;
  }, ue.isSuspense = function(b) {
    return d(b) === u;
  }, ue.isSuspenseList = function(b) {
    return d(b) === f;
  }, ue.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === o || b === r || b === u || b === f || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === i || b.$$typeof === a || b.$$typeof === c || b.$$typeof === m || b.getModuleId !== void 0);
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
function pp() {
  return wi || (wi = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), i = Symbol.for("react.provider"), a = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = !1, d = !1, b = !1, w = !1, C = !1, x;
    x = Symbol.for("react.module.reference");
    function E($) {
      return !!(typeof $ == "string" || typeof $ == "function" || $ === n || $ === o || C || $ === r || $ === u || $ === f || w || $ === p || m || d || b || typeof $ == "object" && $ !== null && ($.$$typeof === g || $.$$typeof === v || $.$$typeof === i || $.$$typeof === a || $.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      $.$$typeof === x || $.getModuleId !== void 0));
    }
    function y($) {
      if (typeof $ == "object" && $ !== null) {
        var se = $.$$typeof;
        switch (se) {
          case e:
            var Te = $.type;
            switch (Te) {
              case n:
              case o:
              case r:
              case u:
              case f:
                return Te;
              default:
                var Re = Te && Te.$$typeof;
                switch (Re) {
                  case l:
                  case a:
                  case c:
                  case g:
                  case v:
                  case i:
                    return Re;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var T = a, O = i, R = e, A = c, L = n, P = g, I = v, M = t, V = o, D = r, _ = u, z = f, Z = !1, q = !1;
    function N($) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function j($) {
      return q || (q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U($) {
      return y($) === a;
    }
    function J($) {
      return y($) === i;
    }
    function H($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === e;
    }
    function X($) {
      return y($) === c;
    }
    function Y($) {
      return y($) === n;
    }
    function K($) {
      return y($) === g;
    }
    function G($) {
      return y($) === v;
    }
    function ee($) {
      return y($) === t;
    }
    function te($) {
      return y($) === o;
    }
    function ae($) {
      return y($) === r;
    }
    function B($) {
      return y($) === u;
    }
    function ne($) {
      return y($) === f;
    }
    de.ContextConsumer = T, de.ContextProvider = O, de.Element = R, de.ForwardRef = A, de.Fragment = L, de.Lazy = P, de.Memo = I, de.Portal = M, de.Profiler = V, de.StrictMode = D, de.Suspense = _, de.SuspenseList = z, de.isAsyncMode = N, de.isConcurrentMode = j, de.isContextConsumer = U, de.isContextProvider = J, de.isElement = H, de.isForwardRef = X, de.isFragment = Y, de.isLazy = K, de.isMemo = G, de.isPortal = ee, de.isProfiler = te, de.isStrictMode = ae, de.isSuspense = B, de.isSuspenseList = ne, de.isValidElementType = E, de.typeOf = y;
  }()), de;
}
process.env.NODE_ENV === "production" ? Kr.exports = cp() : Kr.exports = pp();
var tr = Kr.exports;
const up = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function dp(e) {
  const t = `${e}`.match(up);
  return t && t[1] || "";
}
function ja(e, t = "") {
  return e.displayName || e.name || dp(e) || t;
}
function xi(e, t, n) {
  const r = ja(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function fp(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ja(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case tr.ForwardRef:
          return xi(e, e.render, "ForwardRef");
        case tr.Memo:
          return xi(e, e.type, "memo");
        default:
          return;
      }
  }
}
function it(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = e[t], a = o || t;
  return i == null ? null : i && i.nodeType !== 1 ? new Error(`Invalid ${r} \`${a}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const mp = s.oneOfType([s.func, s.object]), xo = mp;
function Ke(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Xt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Jr(...e) {
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
function hp(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, i, a) => {
    const l = o || "<<anonymous>>", c = a || r;
    return typeof n[r] < "u" ? new Error(`The ${i} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function gp(e, t) {
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
function Gt(e) {
  return Ce(e).defaultView || window;
}
function bp(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? S({}, t.propTypes) : null;
  return (o) => (i, a, l, c, u, ...f) => {
    const v = u || a, g = n == null ? void 0 : n[v];
    if (g) {
      const p = g(i, a, l, c, u, ...f);
      if (p)
        return p;
    }
    return typeof i[a] < "u" && !i[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function nr(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const vp = typeof window < "u" ? k.useLayoutEffect : k.useEffect, Pt = vp;
let Ei = 0;
function yp(e) {
  const [t, n] = k.useState(e), r = e || t;
  return k.useEffect(() => {
    t == null && (Ei += 1, n(`mui-${Ei}`));
  }, [t]), r;
}
const ki = k["useId".toString()];
function La(e) {
  if (ki !== void 0) {
    const t = ki();
    return e ?? t;
  }
  return yp(e);
}
function wp(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const i = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${i}\` is not supported. Please remove it.`) : null;
}
function Va({
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
function kn(e) {
  const t = k.useRef(e);
  return Pt(() => {
    t.current = e;
  }), k.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function He(...e) {
  return k.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      nr(n, t);
    });
  }, e);
}
const Ti = {};
function xp(e, t) {
  const n = k.useRef(Ti);
  return n.current === Ti && (n.current = e(t)), n;
}
const Ep = [];
function kp(e) {
  k.useEffect(e, Ep);
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
function mn() {
  const e = xp(Pn.create).current;
  return kp(e.disposeEffect), e;
}
let dr = !0, Zr = !1;
const Tp = new Pn(), Np = {
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
function Op(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Np[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Sp(e) {
  e.metaKey || e.altKey || e.ctrlKey || (dr = !0);
}
function Ar() {
  dr = !1;
}
function Cp() {
  this.visibilityState === "hidden" && Zr && (dr = !0);
}
function Pp(e) {
  e.addEventListener("keydown", Sp, !0), e.addEventListener("mousedown", Ar, !0), e.addEventListener("pointerdown", Ar, !0), e.addEventListener("touchstart", Ar, !0), e.addEventListener("visibilitychange", Cp, !0);
}
function Rp(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return dr || Op(t);
}
function Fa() {
  const e = k.useCallback((o) => {
    o != null && Pp(o.ownerDocument);
  }, []), t = k.useRef(!1);
  function n() {
    return t.current ? (Zr = !0, Tp.start(100, () => {
      Zr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Rp(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function za(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function $p(e) {
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
function _p(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Ip = Number.isInteger || _p;
function Ua(e, t, n, r) {
  const o = e[t];
  if (o == null || !Ip(o)) {
    const i = $p(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${i}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Ha(e, t, ...n) {
  return e[t] === void 0 ? null : Ua(e, t, ...n);
}
function Qr() {
  return null;
}
Ha.isRequired = Ua;
Qr.isRequired = Qr;
const Wa = process.env.NODE_ENV === "production" ? Qr : Ha;
function Xa(e, t) {
  const n = S({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = S({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, i = t[r];
      n[r] = {}, !i || !Object.keys(i) ? n[r] = o : !o || !Object.keys(o) ? n[r] = i : (n[r] = S({}, i), Object.keys(o).forEach((a) => {
        n[r][a] = Xa(o[a], i[a]);
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
const Ni = (e) => e, Mp = () => {
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
}, Ap = Mp(), Ga = Ap, qa = {
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
  const r = qa[t];
  return r ? `${n}-${r}` : `${Ga.generate(e)}-${t}`;
}
function ht(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = Ze(e, o, n);
  }), r;
}
function Dp(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ya(e) {
  return typeof e == "string";
}
function hn(e, t, n) {
  return e === void 0 || Ya(e) ? t : S({}, t, {
    ownerState: S({}, t.ownerState, n)
  });
}
const jp = {
  disableDefaultClasses: !1
}, Bp = /* @__PURE__ */ k.createContext(jp);
function Lp(e) {
  const {
    disableDefaultClasses: t
  } = k.useContext(Bp);
  return (n) => t ? "" : e(n);
}
function Ka(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Vp(e, t, n) {
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
function Fp(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: i
  } = e;
  if (!t) {
    const p = Se(n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = S({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = S({}, n, o, r);
    return p.length > 0 && (d.className = p), Object.keys(m).length > 0 && (d.style = m), {
      props: d,
      internalRef: void 0
    };
  }
  const a = Ka(S({}, o, r)), l = Oi(r), c = Oi(o), u = t(a), f = Se(u == null ? void 0 : u.className, n == null ? void 0 : n.className, i, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = S({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = S({}, u, n, c, l);
  return f.length > 0 && (g.className = f), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: u.ref
  };
}
const zp = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Rt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: i = !1
  } = e, a = fe(e, zp), l = i ? {} : Vp(r, o), {
    props: c,
    internalRef: u
  } = Fp(S({}, a, {
    externalSlotProps: l
  })), f = He(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return hn(n, S({}, c, {
    ref: f
  }), o);
}
const Ja = "base";
function Up(e) {
  return `${Ja}--${e}`;
}
function Hp(e, t) {
  return `${Ja}-${e}-${t}`;
}
function Za(e, t) {
  const n = qa[t];
  return n ? Up(n) : Hp(e, t);
}
function Wp(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Za(e, r);
  }), n;
}
const Xp = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Gp(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function qp(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Yp(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || qp(e));
}
function Kp(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Xp)).forEach((r, o) => {
    const i = Gp(r);
    i === -1 || !Yp(r) || (i === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: i,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Jp() {
  return !0;
}
function rr(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: i = Kp,
    isEnabled: a = Jp,
    open: l
  } = e, c = k.useRef(!1), u = k.useRef(null), f = k.useRef(null), v = k.useRef(null), g = k.useRef(null), p = k.useRef(!1), m = k.useRef(null), d = He(t.ref, m), b = k.useRef(null);
  k.useEffect(() => {
    !l || !m.current || (p.current = !n);
  }, [n, l]), k.useEffect(() => {
    if (!l || !m.current)
      return;
    const x = Ce(m.current);
    return m.current.contains(x.activeElement) || (m.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), m.current.setAttribute("tabIndex", "-1")), p.current && m.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), k.useEffect(() => {
    if (!l || !m.current)
      return;
    const x = Ce(m.current), E = (O) => {
      b.current = O, !(r || !a() || O.key !== "Tab") && x.activeElement === m.current && O.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const O = m.current;
      if (O === null)
        return;
      if (!x.hasFocus() || !a() || c.current) {
        c.current = !1;
        return;
      }
      if (O.contains(x.activeElement) || r && x.activeElement !== u.current && x.activeElement !== f.current)
        return;
      if (x.activeElement !== g.current)
        g.current = null;
      else if (g.current !== null)
        return;
      if (!p.current)
        return;
      let R = [];
      if ((x.activeElement === u.current || x.activeElement === f.current) && (R = i(m.current)), R.length > 0) {
        var A, L;
        const P = !!((A = b.current) != null && A.shiftKey && ((L = b.current) == null ? void 0 : L.key) === "Tab"), I = R[0], M = R[R.length - 1];
        typeof I != "string" && typeof M != "string" && (P ? M.focus() : I.focus());
      } else
        O.focus();
    };
    x.addEventListener("focusin", y), x.addEventListener("keydown", E, !0);
    const T = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(T), x.removeEventListener("focusin", y), x.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, a, l, i]);
  const w = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0, g.current = x.target;
    const E = t.props.onFocus;
    E && E(x);
  }, C = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ F(k.Fragment, {
    children: [/* @__PURE__ */ h("div", {
      tabIndex: l ? 0 : -1,
      onFocus: C,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ k.cloneElement(t, {
      ref: d,
      onFocus: w
    }), /* @__PURE__ */ h("div", {
      tabIndex: l ? 0 : -1,
      onFocus: C,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (rr.propTypes = {
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
process.env.NODE_ENV !== "production" && (rr["propTypes"] = Da(rr.propTypes));
function Zp(e) {
  return typeof e == "function" ? e() : e;
}
const Tn = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: i = !1
  } = t, [a, l] = k.useState(null), c = He(/* @__PURE__ */ k.isValidElement(r) ? r.ref : null, n);
  if (Pt(() => {
    i || l(Zp(o) || document.body);
  }, [o, i]), Pt(() => {
    if (a && !i)
      return nr(n, a), () => {
        nr(n, null);
      };
  }, [n, a, i]), i) {
    if (/* @__PURE__ */ k.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ k.cloneElement(r, u);
    }
    return /* @__PURE__ */ h(k.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ h(k.Fragment, {
    children: a && /* @__PURE__ */ lc.createPortal(r, a)
  });
});
process.env.NODE_ENV !== "production" && (Tn.propTypes = {
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
  container: s.oneOfType([it, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (Tn["propTypes"] = Da(Tn.propTypes));
function Qp(e) {
  const t = Ce(e);
  return t.body === e ? Gt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function vn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Si(e) {
  return parseInt(Gt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function eu(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Ci(e, t, n, r, o) {
  const i = [t, n, ...r];
  [].forEach.call(e.children, (a) => {
    const l = i.indexOf(a) === -1, c = !eu(a);
    l && c && vn(a, o);
  });
}
function Dr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function tu(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Qp(r)) {
      const a = za(Ce(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Si(r) + a}px`;
      const l = Ce(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Si(c) + a}px`;
      });
    }
    let i;
    if (r.parentNode instanceof DocumentFragment)
      i = Ce(r).body;
    else {
      const a = r.parentElement, l = Gt(r);
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
function nu(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class ru {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && vn(t.modalRef, !1);
    const o = nu(n);
    Ci(n, t.mount, t.modalRef, o, !0);
    const i = Dr(this.containers, (a) => a.container === n);
    return i !== -1 ? (this.containers[i].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Dr(this.containers, (i) => i.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = tu(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Dr(this.containers, (a) => a.modals.indexOf(t) !== -1), i = this.containers[o];
    if (i.modals.splice(i.modals.indexOf(t), 1), this.modals.splice(r, 1), i.modals.length === 0)
      i.restore && i.restore(), t.modalRef && vn(t.modalRef, n), Ci(i.container, t.mount, t.modalRef, i.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const a = i.modals[i.modals.length - 1];
      a.modalRef && vn(a.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function ou(e) {
  return typeof e == "function" ? e() : e;
}
function iu(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const au = new ru();
function su(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = au,
    closeAfterTransition: i = !1,
    onTransitionEnter: a,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: f,
    rootRef: v
  } = e, g = k.useRef({}), p = k.useRef(null), m = k.useRef(null), d = He(m, v), [b, w] = k.useState(!f), C = iu(c);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const E = () => Ce(p.current), y = () => (g.current.modalRef = m.current, g.current.mount = p.current, g.current), T = () => {
    o.mount(y(), {
      disableScrollLock: r
    }), m.current && (m.current.scrollTop = 0);
  }, O = kn(() => {
    const _ = ou(t) || E().body;
    o.add(y(), _), m.current && T();
  }), R = k.useCallback(() => o.isTopModal(y()), [o]), A = kn((_) => {
    p.current = _, _ && (f && R() ? T() : m.current && vn(m.current, x));
  }), L = k.useCallback(() => {
    o.remove(y(), x);
  }, [x, o]);
  k.useEffect(() => () => {
    L();
  }, [L]), k.useEffect(() => {
    f ? O() : (!C || !i) && L();
  }, [f, L, C, i, O]);
  const P = (_) => (z) => {
    var Z;
    (Z = _.onKeyDown) == null || Z.call(_, z), !(z.key !== "Escape" || z.which === 229 || // Wait until IME is settled.
    !R()) && (n || (z.stopPropagation(), u && u(z, "escapeKeyDown")));
  }, I = (_) => (z) => {
    var Z;
    (Z = _.onClick) == null || Z.call(_, z), z.target === z.currentTarget && u && u(z, "backdropClick");
  };
  return {
    getRootProps: (_ = {}) => {
      const z = Ka(e);
      delete z.onTransitionEnter, delete z.onTransitionExited;
      const Z = S({}, z, _);
      return S({
        role: "presentation"
      }, Z, {
        onKeyDown: P(Z),
        ref: d
      });
    },
    getBackdropProps: (_ = {}) => {
      const z = _;
      return S({
        "aria-hidden": !0
      }, z, {
        onClick: I(z),
        open: f
      });
    },
    getTransitionProps: () => {
      const _ = () => {
        w(!1), a && a();
      }, z = () => {
        w(!0), l && l(), i && L();
      };
      return {
        onEnter: Jr(_, c == null ? void 0 : c.props.onEnter),
        onExited: Jr(z, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: d,
    portalRef: A,
    isTopModal: R,
    exited: b,
    hasTransition: C
  };
}
var Ie = "top", We = "bottom", Xe = "right", Me = "left", Eo = "auto", Rn = [Ie, We, Xe, Me], qt = "start", Nn = "end", lu = "clippingParents", Qa = "viewport", ln = "popper", cu = "reference", Pi = /* @__PURE__ */ Rn.reduce(function(e, t) {
  return e.concat([t + "-" + qt, t + "-" + Nn]);
}, []), es = /* @__PURE__ */ [].concat(Rn, [Eo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + qt, t + "-" + Nn]);
}, []), pu = "beforeRead", uu = "read", du = "afterRead", fu = "beforeMain", mu = "main", hu = "afterMain", gu = "beforeWrite", bu = "write", vu = "afterWrite", yu = [pu, uu, du, fu, mu, hu, gu, bu, vu];
function Je(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ve(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function $t(e) {
  var t = Ve(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ue(e) {
  var t = Ve(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ko(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ve(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function wu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, i = t.elements[n];
    !Ue(i) || !Je(i) || (Object.assign(i.style, r), Object.keys(o).forEach(function(a) {
      var l = o[a];
      l === !1 ? i.removeAttribute(a) : i.setAttribute(a, l === !0 ? "" : l);
    }));
  });
}
function xu(e) {
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
      !Ue(o) || !Je(o) || (Object.assign(o.style, l), Object.keys(i).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Eu = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: wu,
  effect: xu,
  requires: ["computeStyles"]
};
function Ye(e) {
  return e.split("-")[0];
}
var St = Math.max, or = Math.min, Yt = Math.round;
function eo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ts() {
  return !/^((?!chrome|android).)*safari/i.test(eo());
}
function Kt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, i = 1;
  t && Ue(e) && (o = e.offsetWidth > 0 && Yt(r.width) / e.offsetWidth || 1, i = e.offsetHeight > 0 && Yt(r.height) / e.offsetHeight || 1);
  var a = $t(e) ? Ve(e) : window, l = a.visualViewport, c = !ts() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, f = (r.top + (c && l ? l.offsetTop : 0)) / i, v = r.width / o, g = r.height / i;
  return {
    width: v,
    height: g,
    top: f,
    right: u + v,
    bottom: f + g,
    left: u,
    x: u,
    y: f
  };
}
function To(e) {
  var t = Kt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ns(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && ko(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function at(e) {
  return Ve(e).getComputedStyle(e);
}
function ku(e) {
  return ["table", "td", "th"].indexOf(Je(e)) >= 0;
}
function gt(e) {
  return (($t(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function fr(e) {
  return Je(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ko(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    gt(e)
  );
}
function Ri(e) {
  return !Ue(e) || // https://github.com/popperjs/popper-core/issues/837
  at(e).position === "fixed" ? null : e.offsetParent;
}
function Tu(e) {
  var t = /firefox/i.test(eo()), n = /Trident/i.test(eo());
  if (n && Ue(e)) {
    var r = at(e);
    if (r.position === "fixed")
      return null;
  }
  var o = fr(e);
  for (ko(o) && (o = o.host); Ue(o) && ["html", "body"].indexOf(Je(o)) < 0; ) {
    var i = at(o);
    if (i.transform !== "none" || i.perspective !== "none" || i.contain === "paint" || ["transform", "perspective"].indexOf(i.willChange) !== -1 || t && i.willChange === "filter" || t && i.filter && i.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function $n(e) {
  for (var t = Ve(e), n = Ri(e); n && ku(n) && at(n).position === "static"; )
    n = Ri(n);
  return n && (Je(n) === "html" || Je(n) === "body" && at(n).position === "static") ? t : n || Tu(e) || t;
}
function No(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function yn(e, t, n) {
  return St(e, or(t, n));
}
function Nu(e, t, n) {
  var r = yn(e, t, n);
  return r > n ? n : r;
}
function rs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function os(e) {
  return Object.assign({}, rs(), e);
}
function is(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Ou = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, os(typeof t != "number" ? t : is(t, Rn));
};
function Su(e) {
  var t, n = e.state, r = e.name, o = e.options, i = n.elements.arrow, a = n.modifiersData.popperOffsets, l = Ye(n.placement), c = No(l), u = [Me, Xe].indexOf(l) >= 0, f = u ? "height" : "width";
  if (!(!i || !a)) {
    var v = Ou(o.padding, n), g = To(i), p = c === "y" ? Ie : Me, m = c === "y" ? We : Xe, d = n.rects.reference[f] + n.rects.reference[c] - a[c] - n.rects.popper[f], b = a[c] - n.rects.reference[c], w = $n(i), C = w ? c === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = d / 2 - b / 2, E = v[p], y = C - g[f] - v[m], T = C / 2 - g[f] / 2 + x, O = yn(E, T, y), R = c;
    n.modifiersData[r] = (t = {}, t[R] = O, t.centerOffset = O - T, t);
  }
}
function Cu(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ns(t.elements.popper, o) && (t.elements.arrow = o));
}
const Pu = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Su,
  effect: Cu,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Jt(e) {
  return e.split("-")[1];
}
var Ru = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function $u(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Yt(n * o) / o || 0,
    y: Yt(r * o) / o || 0
  };
}
function $i(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, i = e.variation, a = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, f = e.roundOffsets, v = e.isFixed, g = a.x, p = g === void 0 ? 0 : g, m = a.y, d = m === void 0 ? 0 : m, b = typeof f == "function" ? f({
    x: p,
    y: d
  }) : {
    x: p,
    y: d
  };
  p = b.x, d = b.y;
  var w = a.hasOwnProperty("x"), C = a.hasOwnProperty("y"), x = Me, E = Ie, y = window;
  if (u) {
    var T = $n(n), O = "clientHeight", R = "clientWidth";
    if (T === Ve(n) && (T = gt(n), at(T).position !== "static" && l === "absolute" && (O = "scrollHeight", R = "scrollWidth")), T = T, o === Ie || (o === Me || o === Xe) && i === Nn) {
      E = We;
      var A = v && T === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[O]
      );
      d -= A - r.height, d *= c ? 1 : -1;
    }
    if (o === Me || (o === Ie || o === We) && i === Nn) {
      x = Xe;
      var L = v && T === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[R]
      );
      p -= L - r.width, p *= c ? 1 : -1;
    }
  }
  var P = Object.assign({
    position: l
  }, u && Ru), I = f === !0 ? $u({
    x: p,
    y: d
  }, Ve(n)) : {
    x: p,
    y: d
  };
  if (p = I.x, d = I.y, c) {
    var M;
    return Object.assign({}, P, (M = {}, M[E] = C ? "0" : "", M[x] = w ? "0" : "", M.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + d + "px)" : "translate3d(" + p + "px, " + d + "px, 0)", M));
  }
  return Object.assign({}, P, (t = {}, t[E] = C ? d + "px" : "", t[x] = w ? p + "px" : "", t.transform = "", t));
}
function _u(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, i = n.adaptive, a = i === void 0 ? !0 : i, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ye(t.placement),
    variation: Jt(t.placement),
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
const Iu = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: _u,
  data: {}
};
var Vn = {
  passive: !0
};
function Mu(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, i = o === void 0 ? !0 : o, a = r.resize, l = a === void 0 ? !0 : a, c = Ve(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return i && u.forEach(function(f) {
    f.addEventListener("scroll", n.update, Vn);
  }), l && c.addEventListener("resize", n.update, Vn), function() {
    i && u.forEach(function(f) {
      f.removeEventListener("scroll", n.update, Vn);
    }), l && c.removeEventListener("resize", n.update, Vn);
  };
}
const Au = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Mu,
  data: {}
};
var Du = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Hn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Du[t];
  });
}
var ju = {
  start: "end",
  end: "start"
};
function _i(e) {
  return e.replace(/start|end/g, function(t) {
    return ju[t];
  });
}
function Oo(e) {
  var t = Ve(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function So(e) {
  return Kt(gt(e)).left + Oo(e).scrollLeft;
}
function Bu(e, t) {
  var n = Ve(e), r = gt(e), o = n.visualViewport, i = r.clientWidth, a = r.clientHeight, l = 0, c = 0;
  if (o) {
    i = o.width, a = o.height;
    var u = ts();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: i,
    height: a,
    x: l + So(e),
    y: c
  };
}
function Lu(e) {
  var t, n = gt(e), r = Oo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, i = St(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), a = St(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + So(e), c = -r.scrollTop;
  return at(o || n).direction === "rtl" && (l += St(n.clientWidth, o ? o.clientWidth : 0) - i), {
    width: i,
    height: a,
    x: l,
    y: c
  };
}
function Co(e) {
  var t = at(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function as(e) {
  return ["html", "body", "#document"].indexOf(Je(e)) >= 0 ? e.ownerDocument.body : Ue(e) && Co(e) ? e : as(fr(e));
}
function wn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = as(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), i = Ve(r), a = o ? [i].concat(i.visualViewport || [], Co(r) ? r : []) : r, l = t.concat(a);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(wn(fr(a)))
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
function Vu(e, t) {
  var n = Kt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ii(e, t, n) {
  return t === Qa ? to(Bu(e, n)) : $t(t) ? Vu(t, n) : to(Lu(gt(e)));
}
function Fu(e) {
  var t = wn(fr(e)), n = ["absolute", "fixed"].indexOf(at(e).position) >= 0, r = n && Ue(e) ? $n(e) : e;
  return $t(r) ? t.filter(function(o) {
    return $t(o) && ns(o, r) && Je(o) !== "body";
  }) : [];
}
function zu(e, t, n, r) {
  var o = t === "clippingParents" ? Fu(e) : [].concat(t), i = [].concat(o, [n]), a = i[0], l = i.reduce(function(c, u) {
    var f = Ii(e, u, r);
    return c.top = St(f.top, c.top), c.right = or(f.right, c.right), c.bottom = or(f.bottom, c.bottom), c.left = St(f.left, c.left), c;
  }, Ii(e, a, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function ss(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ye(r) : null, i = r ? Jt(r) : null, a = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ie:
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
    case Me:
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
  var u = o ? No(o) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (i) {
      case qt:
        c[u] = c[u] - (t[f] / 2 - n[f] / 2);
        break;
      case Nn:
        c[u] = c[u] + (t[f] / 2 - n[f] / 2);
        break;
    }
  }
  return c;
}
function On(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, i = n.strategy, a = i === void 0 ? e.strategy : i, l = n.boundary, c = l === void 0 ? lu : l, u = n.rootBoundary, f = u === void 0 ? Qa : u, v = n.elementContext, g = v === void 0 ? ln : v, p = n.altBoundary, m = p === void 0 ? !1 : p, d = n.padding, b = d === void 0 ? 0 : d, w = os(typeof b != "number" ? b : is(b, Rn)), C = g === ln ? cu : ln, x = e.rects.popper, E = e.elements[m ? C : g], y = zu($t(E) ? E : E.contextElement || gt(e.elements.popper), c, f, a), T = Kt(e.elements.reference), O = ss({
    reference: T,
    element: x,
    strategy: "absolute",
    placement: o
  }), R = to(Object.assign({}, x, O)), A = g === ln ? R : T, L = {
    top: y.top - A.top + w.top,
    bottom: A.bottom - y.bottom + w.bottom,
    left: y.left - A.left + w.left,
    right: A.right - y.right + w.right
  }, P = e.modifiersData.offset;
  if (g === ln && P) {
    var I = P[o];
    Object.keys(L).forEach(function(M) {
      var V = [Xe, We].indexOf(M) >= 0 ? 1 : -1, D = [Ie, We].indexOf(M) >= 0 ? "y" : "x";
      L[M] += I[D] * V;
    });
  }
  return L;
}
function Uu(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, i = n.rootBoundary, a = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? es : c, f = Jt(r), v = f ? l ? Pi : Pi.filter(function(m) {
    return Jt(m) === f;
  }) : Rn, g = v.filter(function(m) {
    return u.indexOf(m) >= 0;
  });
  g.length === 0 && (g = v);
  var p = g.reduce(function(m, d) {
    return m[d] = On(e, {
      placement: d,
      boundary: o,
      rootBoundary: i,
      padding: a
    })[Ye(d)], m;
  }, {});
  return Object.keys(p).sort(function(m, d) {
    return p[m] - p[d];
  });
}
function Hu(e) {
  if (Ye(e) === Eo)
    return [];
  var t = Hn(e);
  return [_i(e), t, _i(t)];
}
function Wu(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !0 : a, c = n.fallbackPlacements, u = n.padding, f = n.boundary, v = n.rootBoundary, g = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, d = n.allowedAutoPlacements, b = t.options.placement, w = Ye(b), C = w === b, x = c || (C || !m ? [Hn(b)] : Hu(b)), E = [b].concat(x).reduce(function(H, X) {
      return H.concat(Ye(X) === Eo ? Uu(t, {
        placement: X,
        boundary: f,
        rootBoundary: v,
        padding: u,
        flipVariations: m,
        allowedAutoPlacements: d
      }) : X);
    }, []), y = t.rects.reference, T = t.rects.popper, O = /* @__PURE__ */ new Map(), R = !0, A = E[0], L = 0; L < E.length; L++) {
      var P = E[L], I = Ye(P), M = Jt(P) === qt, V = [Ie, We].indexOf(I) >= 0, D = V ? "width" : "height", _ = On(t, {
        placement: P,
        boundary: f,
        rootBoundary: v,
        altBoundary: g,
        padding: u
      }), z = V ? M ? Xe : Me : M ? We : Ie;
      y[D] > T[D] && (z = Hn(z));
      var Z = Hn(z), q = [];
      if (i && q.push(_[I] <= 0), l && q.push(_[z] <= 0, _[Z] <= 0), q.every(function(H) {
        return H;
      })) {
        A = P, R = !1;
        break;
      }
      O.set(P, q);
    }
    if (R)
      for (var N = m ? 3 : 1, j = function(X) {
        var Y = E.find(function(K) {
          var G = O.get(K);
          if (G)
            return G.slice(0, X).every(function(ee) {
              return ee;
            });
        });
        if (Y)
          return A = Y, "break";
      }, U = N; U > 0; U--) {
        var J = j(U);
        if (J === "break")
          break;
      }
    t.placement !== A && (t.modifiersData[r]._skip = !0, t.placement = A, t.reset = !0);
  }
}
const Xu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Wu,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Mi(e, t, n) {
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
  return [Ie, Xe, We, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function Gu(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, i = t.modifiersData.preventOverflow, a = On(t, {
    elementContext: "reference"
  }), l = On(t, {
    altBoundary: !0
  }), c = Mi(a, r), u = Mi(l, o, i), f = Ai(c), v = Ai(u);
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
const qu = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Gu
};
function Yu(e, t, n) {
  var r = Ye(e), o = [Me, Ie].indexOf(r) >= 0 ? -1 : 1, i = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, a = i[0], l = i[1];
  return a = a || 0, l = (l || 0) * o, [Me, Xe].indexOf(r) >= 0 ? {
    x: l,
    y: a
  } : {
    x: a,
    y: l
  };
}
function Ku(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, i = o === void 0 ? [0, 0] : o, a = es.reduce(function(f, v) {
    return f[v] = Yu(v, t.rects, i), f;
  }, {}), l = a[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = a;
}
const Ju = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Ku
};
function Zu(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ss({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Qu = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Zu,
  data: {}
};
function ed(e) {
  return e === "x" ? "y" : "x";
}
function td(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, i = o === void 0 ? !0 : o, a = n.altAxis, l = a === void 0 ? !1 : a, c = n.boundary, u = n.rootBoundary, f = n.altBoundary, v = n.padding, g = n.tether, p = g === void 0 ? !0 : g, m = n.tetherOffset, d = m === void 0 ? 0 : m, b = On(t, {
    boundary: c,
    rootBoundary: u,
    padding: v,
    altBoundary: f
  }), w = Ye(t.placement), C = Jt(t.placement), x = !C, E = No(w), y = ed(E), T = t.modifiersData.popperOffsets, O = t.rects.reference, R = t.rects.popper, A = typeof d == "function" ? d(Object.assign({}, t.rects, {
    placement: t.placement
  })) : d, L = typeof A == "number" ? {
    mainAxis: A,
    altAxis: A
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, A), P = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, I = {
    x: 0,
    y: 0
  };
  if (T) {
    if (i) {
      var M, V = E === "y" ? Ie : Me, D = E === "y" ? We : Xe, _ = E === "y" ? "height" : "width", z = T[E], Z = z + b[V], q = z - b[D], N = p ? -R[_] / 2 : 0, j = C === qt ? O[_] : R[_], U = C === qt ? -R[_] : -O[_], J = t.elements.arrow, H = p && J ? To(J) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : rs(), Y = X[V], K = X[D], G = yn(0, O[_], H[_]), ee = x ? O[_] / 2 - N - G - Y - L.mainAxis : j - G - Y - L.mainAxis, te = x ? -O[_] / 2 + N + G + K + L.mainAxis : U + G + K + L.mainAxis, ae = t.elements.arrow && $n(t.elements.arrow), B = ae ? E === "y" ? ae.clientTop || 0 : ae.clientLeft || 0 : 0, ne = (M = P == null ? void 0 : P[E]) != null ? M : 0, $ = z + ee - ne - B, se = z + te - ne, Te = yn(p ? or(Z, $) : Z, z, p ? St(q, se) : q);
      T[E] = Te, I[E] = Te - z;
    }
    if (l) {
      var Re, Ee = E === "x" ? Ie : Me, vt = E === "x" ? We : Xe, $e = T[y], Qe = y === "y" ? "height" : "width", De = $e + b[Ee], et = $e - b[vt], Ne = [Ie, Me].indexOf(w) !== -1, Mt = (Re = P == null ? void 0 : P[y]) != null ? Re : 0, yt = Ne ? De : $e - O[Qe] - R[Qe] - Mt + L.altAxis, en = Ne ? $e + O[Qe] + R[Qe] - Mt - L.altAxis : et, An = p && Ne ? Nu(yt, $e, en) : yn(p ? yt : De, $e, p ? en : et);
      T[y] = An, I[y] = An - $e;
    }
    t.modifiersData[r] = I;
  }
}
const nd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: td,
  requiresIfExists: ["offset"]
};
function rd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function od(e) {
  return e === Ve(e) || !Ue(e) ? Oo(e) : rd(e);
}
function id(e) {
  var t = e.getBoundingClientRect(), n = Yt(t.width) / e.offsetWidth || 1, r = Yt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function ad(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ue(t), o = Ue(t) && id(t), i = gt(t), a = Kt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Je(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Co(i)) && (l = od(t)), Ue(t) ? (c = Kt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : i && (c.x = So(i))), {
    x: a.left + l.scrollLeft - c.x,
    y: a.top + l.scrollTop - c.y,
    width: a.width,
    height: a.height
  };
}
function sd(e) {
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
function ld(e) {
  var t = sd(e);
  return yu.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function cd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function pd(e) {
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
function ji() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function ud(e) {
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
    }, v = [], g = !1, p = {
      state: f,
      setOptions: function(w) {
        var C = typeof w == "function" ? w(f.options) : w;
        d(), f.options = Object.assign({}, i, f.options, C), f.scrollParents = {
          reference: $t(l) ? wn(l) : l.contextElement ? wn(l.contextElement) : [],
          popper: wn(c)
        };
        var x = ld(pd([].concat(r, f.options.modifiers)));
        return f.orderedModifiers = x.filter(function(E) {
          return E.enabled;
        }), m(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var w = f.elements, C = w.reference, x = w.popper;
          if (ji(C, x)) {
            f.rects = {
              reference: ad(C, $n(x), f.options.strategy === "fixed"),
              popper: To(x)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(L) {
              return f.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], T = y.fn, O = y.options, R = O === void 0 ? {} : O, A = y.name;
              typeof T == "function" && (f = T({
                state: f,
                options: R,
                name: A,
                instance: p
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: cd(function() {
        return new Promise(function(b) {
          p.forceUpdate(), b(f);
        });
      }),
      destroy: function() {
        d(), g = !0;
      }
    };
    if (!ji(l, c))
      return p;
    p.setOptions(u).then(function(b) {
      !g && u.onFirstUpdate && u.onFirstUpdate(b);
    });
    function m() {
      f.orderedModifiers.forEach(function(b) {
        var w = b.name, C = b.options, x = C === void 0 ? {} : C, E = b.effect;
        if (typeof E == "function") {
          var y = E({
            state: f,
            name: w,
            instance: p,
            options: x
          }), T = function() {
          };
          v.push(y || T);
        }
      });
    }
    function d() {
      v.forEach(function(b) {
        return b();
      }), v = [];
    }
    return p;
  };
}
var dd = [Au, Qu, Iu, Eu, Ju, Xu, nd, Pu, qu], fd = /* @__PURE__ */ ud({
  defaultModifiers: dd
});
const ls = "Popper";
function md(e) {
  return Za(ls, e);
}
Wp(ls, ["root"]);
const hd = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], gd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function bd(e, t) {
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
function ir(e) {
  return typeof e == "function" ? e() : e;
}
function mr(e) {
  return e.nodeType !== void 0;
}
function vd(e) {
  return !mr(e);
}
const yd = () => lt({
  root: ["root"]
}, Lp(md)), wd = {}, xd = /* @__PURE__ */ k.forwardRef(function(t, n) {
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
    popperRef: g,
    slotProps: p = {},
    slots: m = {},
    TransitionProps: d
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, b = fe(t, hd), w = k.useRef(null), C = He(w, n), x = k.useRef(null), E = He(x, g), y = k.useRef(E);
  Pt(() => {
    y.current = E;
  }, [E]), k.useImperativeHandle(g, () => x.current, []);
  const T = bd(f, a), [O, R] = k.useState(T), [A, L] = k.useState(ir(o));
  k.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), k.useEffect(() => {
    o && L(ir(o));
  }, [o]), Pt(() => {
    if (!A || !u)
      return;
    const D = (Z) => {
      R(Z.placement);
    };
    if (process.env.NODE_ENV !== "production" && A && mr(A) && A.nodeType === 1) {
      const Z = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Z.top === 0 && Z.left === 0 && Z.right === 0 && Z.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let _ = [{
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
        state: Z
      }) => {
        D(Z);
      }
    }];
    c != null && (_ = _.concat(c)), v && v.modifiers != null && (_ = _.concat(v.modifiers));
    const z = fd(A, w.current, S({
      placement: T
    }, v, {
      modifiers: _
    }));
    return y.current(z), () => {
      z.destroy(), y.current(null);
    };
  }, [A, l, c, u, v, T]);
  const P = {
    placement: O
  };
  d !== null && (P.TransitionProps = d);
  const I = yd(), M = (r = m.root) != null ? r : "div", V = Rt({
    elementType: M,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: C
    },
    ownerState: t,
    className: I.root
  });
  return /* @__PURE__ */ h(M, S({}, V, {
    children: typeof i == "function" ? i(P) : i
  }));
}), cs = /* @__PURE__ */ k.forwardRef(function(t, n) {
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
    popperOptions: g = wd,
    popperRef: p,
    style: m,
    transition: d = !1,
    slotProps: b = {},
    slots: w = {}
  } = t, C = fe(t, gd), [x, E] = k.useState(!0), y = () => {
    E(!1);
  }, T = () => {
    E(!0);
  };
  if (!c && !f && (!d || x))
    return null;
  let O;
  if (i)
    O = i;
  else if (r) {
    const L = ir(r);
    O = L && mr(L) ? Ce(L).body : Ce(null).body;
  }
  const R = !f && c && (!d || x) ? "none" : void 0, A = d ? {
    in: f,
    onEnter: y,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ h(Tn, {
    disablePortal: l,
    container: O,
    children: /* @__PURE__ */ h(xd, S({
      anchorEl: r,
      direction: a,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: d ? !x : f,
      placement: v,
      popperOptions: g,
      popperRef: p,
      slotProps: b,
      slots: w
    }, C, {
      style: S({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: R
      }, m),
      TransitionProps: A,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (cs.propTypes = {
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
  anchorEl: Qt(s.oneOfType([it, s.object, s.func]), (e) => {
    if (e.open) {
      const t = ir(e.anchorEl);
      if (t && mr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || vd(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: s.oneOfType([it, s.func]),
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
  popperRef: xo,
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
const Ed = ["values", "unit", "step"], kd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => S({}, n, {
    [r.key]: r.val
  }), {});
};
function Td(e) {
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
  } = e, o = fe(e, Ed), i = kd(t), a = Object.keys(i);
  function l(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${n})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - r / 100}${n})`;
  }
  function u(g, p) {
    const m = a.indexOf(p);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${n}) and (max-width:${(m !== -1 && typeof t[a[m]] == "number" ? t[a[m]] : p) - r / 100}${n})`;
  }
  function f(g) {
    return a.indexOf(g) + 1 < a.length ? u(g, a[a.indexOf(g) + 1]) : l(g);
  }
  function v(g) {
    const p = a.indexOf(g);
    return p === 0 ? l(a[1]) : p === a.length - 1 ? c(a[p]) : u(g, a[a.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return S({
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
const Nd = {
  borderRadius: 4
}, Od = Nd, Sd = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, bt = Sd;
function xn(e, t) {
  return t ? ot(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Po = {
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
  up: (e) => `@media (min-width:${Po[e]}px)`
};
function st(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const i = r.breakpoints || Bi;
    return t.reduce((a, l, c) => (a[i.up(i.keys[c])] = n(t[c]), a), {});
  }
  if (typeof t == "object") {
    const i = r.breakpoints || Bi;
    return Object.keys(t).reduce((a, l) => {
      if (Object.keys(i.values || Po).indexOf(l) !== -1) {
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
function Cd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const i = e.up(o);
    return r[i] = {}, r;
  }, {})) || {};
}
function Pd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function hr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, i) => o && o[i] ? o[i] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function ar(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = hr(e, n) || r, t && (o = t(o, r, e)), o;
}
function ke(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, i = (a) => {
    if (a[t] == null)
      return null;
    const l = a[t], c = a.theme, u = hr(c, r) || {};
    return st(a, l, (v) => {
      let g = ar(u, o, v);
      return v === g && typeof v == "string" && (g = ar(u, o, `${t}${v === "default" ? "" : Ke(v)}`, v)), n === !1 ? g : {
        [n]: g
      };
    });
  };
  return i.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: bt
  } : {}, i.filterProps = [t], i;
}
function Rd(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const $d = {
  m: "margin",
  p: "padding"
}, _d = {
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
}, Id = Rd((e) => {
  if (e.length > 2)
    if (Li[e])
      e = Li[e];
    else
      return [e];
  const [t, n] = e.split(""), r = $d[t], o = _d[n] || "";
  return Array.isArray(o) ? o.map((i) => r + i) : [r + o];
}), gr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], br = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Md = [...gr, ...br];
function _n(e, t, n, r) {
  var o;
  const i = (o = hr(e, t, !1)) != null ? o : n;
  return typeof i == "number" ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && typeof a != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${a}.`), i * a) : Array.isArray(i) ? (a) => typeof a == "string" ? a : (process.env.NODE_ENV !== "production" && (Number.isInteger(a) ? a > i.length - 1 && console.error([`MUI: The value provided (${a}) overflows.`, `The supported values are: ${JSON.stringify(i)}.`, `${a} > ${i.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), i[a]) : typeof i == "function" ? i : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${i}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ps(e) {
  return _n(e, "spacing", 8, "spacing");
}
function In(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Ad(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = In(t, n), r), {});
}
function Dd(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Id(n), i = Ad(o, r), a = e[n];
  return st(e, a, i);
}
function us(e, t) {
  const n = ps(e.theme);
  return Object.keys(e).map((r) => Dd(e, t, r, n)).reduce(xn, {});
}
function ye(e) {
  return us(e, gr);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? gr.reduce((e, t) => (e[t] = bt, e), {}) : {};
ye.filterProps = gr;
function we(e) {
  return us(e, br);
}
we.propTypes = process.env.NODE_ENV !== "production" ? br.reduce((e, t) => (e[t] = bt, e), {}) : {};
we.filterProps = br;
process.env.NODE_ENV !== "production" && Md.reduce((e, t) => (e[t] = bt, e), {});
function jd(e = 8) {
  if (e.mui)
    return e;
  const t = ps({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((i) => {
    const a = t(i);
    return typeof a == "number" ? `${a}px` : a;
  }).join(" "));
  return n.mui = !0, n;
}
function vr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((i) => {
    r[i] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, i) => t[i] ? xn(o, t[i](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function ze(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ge(e, t) {
  return ke({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Bd = Ge("border", ze), Ld = Ge("borderTop", ze), Vd = Ge("borderRight", ze), Fd = Ge("borderBottom", ze), zd = Ge("borderLeft", ze), Ud = Ge("borderColor"), Hd = Ge("borderTopColor"), Wd = Ge("borderRightColor"), Xd = Ge("borderBottomColor"), Gd = Ge("borderLeftColor"), qd = Ge("outline", ze), Yd = Ge("outlineColor"), yr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = _n(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: In(t, r)
    });
    return st(e, e.borderRadius, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: bt
} : {};
yr.filterProps = ["borderRadius"];
vr(Bd, Ld, Vd, Fd, zd, Ud, Hd, Wd, Xd, Gd, yr, qd, Yd);
const wr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = _n(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: In(t, r)
    });
    return st(e, e.gap, n);
  }
  return null;
};
wr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: bt
} : {};
wr.filterProps = ["gap"];
const xr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = _n(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: In(t, r)
    });
    return st(e, e.columnGap, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: bt
} : {};
xr.filterProps = ["columnGap"];
const Er = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = _n(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: In(t, r)
    });
    return st(e, e.rowGap, n);
  }
  return null;
};
Er.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: bt
} : {};
Er.filterProps = ["rowGap"];
const Kd = ke({
  prop: "gridColumn"
}), Jd = ke({
  prop: "gridRow"
}), Zd = ke({
  prop: "gridAutoFlow"
}), Qd = ke({
  prop: "gridAutoColumns"
}), ef = ke({
  prop: "gridAutoRows"
}), tf = ke({
  prop: "gridTemplateColumns"
}), nf = ke({
  prop: "gridTemplateRows"
}), rf = ke({
  prop: "gridTemplateAreas"
}), of = ke({
  prop: "gridArea"
});
vr(wr, xr, Er, Kd, Jd, Zd, Qd, ef, tf, nf, rf, of);
function Wt(e, t) {
  return t === "grey" ? t : e;
}
const af = ke({
  prop: "color",
  themeKey: "palette",
  transform: Wt
}), sf = ke({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Wt
}), lf = ke({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Wt
});
vr(af, sf, lf);
function Le(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const cf = ke({
  prop: "width",
  transform: Le
}), Ro = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const i = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Po[n];
      return i ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${i}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: i
      } : {
        maxWidth: Le(n)
      };
    };
    return st(e, e.maxWidth, t);
  }
  return null;
};
Ro.filterProps = ["maxWidth"];
const pf = ke({
  prop: "minWidth",
  transform: Le
}), uf = ke({
  prop: "height",
  transform: Le
}), df = ke({
  prop: "maxHeight",
  transform: Le
}), ff = ke({
  prop: "minHeight",
  transform: Le
});
ke({
  prop: "size",
  cssProperty: "width",
  transform: Le
});
ke({
  prop: "size",
  cssProperty: "height",
  transform: Le
});
const mf = ke({
  prop: "boxSizing"
});
vr(cf, Ro, pf, uf, df, ff, mf);
const hf = {
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
    style: yr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Wt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Wt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Wt
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
    style: ye
  },
  mt: {
    style: ye
  },
  mr: {
    style: ye
  },
  mb: {
    style: ye
  },
  ml: {
    style: ye
  },
  mx: {
    style: ye
  },
  my: {
    style: ye
  },
  margin: {
    style: ye
  },
  marginTop: {
    style: ye
  },
  marginRight: {
    style: ye
  },
  marginBottom: {
    style: ye
  },
  marginLeft: {
    style: ye
  },
  marginX: {
    style: ye
  },
  marginY: {
    style: ye
  },
  marginInline: {
    style: ye
  },
  marginInlineStart: {
    style: ye
  },
  marginInlineEnd: {
    style: ye
  },
  marginBlock: {
    style: ye
  },
  marginBlockStart: {
    style: ye
  },
  marginBlockEnd: {
    style: ye
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
    style: wr
  },
  rowGap: {
    style: Er
  },
  columnGap: {
    style: xr
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
    style: Ro
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
}, $o = hf;
function gf(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function bf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vf() {
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
    const g = hr(o, u) || {};
    return v ? v(a) : st(a, r, (m) => {
      let d = ar(g, f, m);
      return m === d && typeof m == "string" && (d = ar(g, f, `${n}${m === "default" ? "" : Ke(m)}`, m)), c === !1 ? d : {
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
    const a = (r = i.unstable_sxConfig) != null ? r : $o;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(i);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const f = Cd(i.breakpoints), v = Object.keys(f);
      let g = f;
      return Object.keys(u).forEach((p) => {
        const m = bf(u[p], i);
        if (m != null)
          if (typeof m == "object")
            if (a[p])
              g = xn(g, e(p, m, i, a));
            else {
              const d = st({
                theme: i
              }, m, (b) => ({
                [p]: b
              }));
              gf(d, m) ? g[p] = t({
                sx: m,
                theme: i
              }) : g = xn(g, d);
            }
          else
            g = xn(g, e(p, m, i, a));
      }), Pd(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const ds = vf();
ds.filterProps = ["sx"];
const _o = ds;
function yf(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const wf = ["breakpoints", "palette", "spacing", "shape"];
function Io(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: i = {}
  } = e, a = fe(e, wf), l = Td(n), c = jd(o);
  let u = ot({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: S({
      mode: "light"
    }, r),
    spacing: c,
    shape: S({}, Od, i)
  }, a);
  return u.applyStyles = yf, u = t.reduce((f, v) => ot(f, v), u), u.unstable_sxConfig = S({}, $o, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(v) {
    return _o({
      sx: v,
      theme: this
    });
  }, u;
}
function xf(e) {
  return Object.keys(e).length === 0;
}
function fs(e = null) {
  const t = k.useContext(ac);
  return !t || xf(t) ? e : t;
}
const Ef = Io();
function ms(e = Ef) {
  return fs(e);
}
const kf = ["ownerState"], Tf = ["variants"], Nf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Of(e) {
  return Object.keys(e).length === 0;
}
function Sf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Wn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Cf = Io(), Vi = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Fn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return Of(t) ? e : t[n] || t;
}
function Pf(e) {
  return e ? (t, n) => n[e] : null;
}
function Xn(e, t) {
  let {
    ownerState: n
  } = t, r = fe(t, kf);
  const o = typeof e == "function" ? e(S({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((i) => Xn(i, S({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: i = []
    } = o;
    let l = fe(o, Tf);
    return i.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(S({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((f) => {
        (n == null ? void 0 : n[f]) !== c.props[f] && r[f] !== c.props[f] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(S({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Rf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Cf,
    rootShouldForwardProp: r = Wn,
    slotShouldForwardProp: o = Wn
  } = e, i = (a) => _o(S({}, a, {
    theme: Fn(S({}, a, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return i.__mui_systemSx = !0, (a, l = {}) => {
    sc(a, (y) => y.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = Pf(Vi(u))
    } = l, p = fe(l, Nf), m = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), d = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${Vi(u || "Root")}`);
    let w = Wn;
    u === "Root" || u === "root" ? w = r : u ? w = o : Sf(a) && (w = void 0);
    const C = ic(a, S({
      shouldForwardProp: w,
      label: b
    }, p)), x = (y) => typeof y == "function" && y.__emotion_real !== y || kt(y) ? (T) => Xn(y, S({}, T, {
      theme: Fn({
        theme: T.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : y, E = (y, ...T) => {
      let O = x(y);
      const R = T ? T.map(x) : [];
      c && g && R.push((P) => {
        const I = Fn(S({}, P, {
          defaultTheme: n,
          themeId: t
        }));
        if (!I.components || !I.components[c] || !I.components[c].styleOverrides)
          return null;
        const M = I.components[c].styleOverrides, V = {};
        return Object.entries(M).forEach(([D, _]) => {
          V[D] = Xn(_, S({}, P, {
            theme: I
          }));
        }), g(P, V);
      }), c && !m && R.push((P) => {
        var I;
        const M = Fn(S({}, P, {
          defaultTheme: n,
          themeId: t
        })), V = M == null || (I = M.components) == null || (I = I[c]) == null ? void 0 : I.variants;
        return Xn({
          variants: V
        }, S({}, P, {
          theme: M
        }));
      }), d || R.push(i);
      const A = R.length - T.length;
      if (Array.isArray(y) && A > 0) {
        const P = new Array(A).fill("");
        O = [...y, ...P], O.raw = [...y.raw, ...P];
      }
      const L = C(O, ...R);
      if (process.env.NODE_ENV !== "production") {
        let P;
        c && (P = `${c}${Ke(u || "")}`), P === void 0 && (P = `Styled(${fp(a)})`), L.displayName = P;
      }
      return a.muiName && (L.muiName = a.muiName), L;
    };
    return C.withConfig && (E.withConfig = C.withConfig), E;
  };
}
function $f(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Xa(t.components[n].defaultProps, r);
}
function _f({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ms(n);
  return r && (o = o[r] || o), $f({
    theme: o,
    name: t,
    props: e
  });
}
function Mo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Dp(e, t, n);
}
function If(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function _t(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return _t(If(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Xt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Xt(10, o));
  } else
    r = r.split(",");
  return r = r.map((i) => parseFloat(i)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function kr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, i) => i < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Mf(e) {
  e = _t(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, i = r * Math.min(o, 1 - o), a = (u, f = (u + n / 30) % 12) => o - i * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(a(0) * 255), Math.round(a(8) * 255), Math.round(a(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), kr({
    type: l,
    values: c
  });
}
function Fi(e) {
  e = _t(e);
  let t = e.type === "hsl" || e.type === "hsla" ? _t(Mf(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function zi(e, t) {
  const n = Fi(e), r = Fi(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function sr(e, t) {
  return e = _t(e), t = Mo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, kr(e);
}
function Af(e, t) {
  if (e = _t(e), t = Mo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return kr(e);
}
function Df(e, t) {
  if (e = _t(e), t = Mo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return kr(e);
}
function jf(e, t) {
  return S({
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
const Bf = {
  black: "#000",
  white: "#fff"
}, Sn = Bf, Lf = {
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
}, Vf = Lf, Ff = {
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
}, At = Ff, zf = {
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
}, Dt = zf, Uf = {
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
}, cn = Uf, Hf = {
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
}, jt = Hf, Wf = {
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
}, Bt = Wf, Xf = {
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
}, Lt = Xf, Gf = ["mode", "contrastThreshold", "tonalOffset"], Ui = {
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
    paper: Sn.white,
    default: Sn.white
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
}, jr = {
  text: {
    primary: Sn.white,
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
    active: Sn.white,
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
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Df(e.main, o) : t === "dark" && (e.dark = Af(e.main, i)));
}
function qf(e = "light") {
  return e === "dark" ? {
    main: jt[200],
    light: jt[50],
    dark: jt[400]
  } : {
    main: jt[700],
    light: jt[400],
    dark: jt[800]
  };
}
function Yf(e = "light") {
  return e === "dark" ? {
    main: At[200],
    light: At[50],
    dark: At[400]
  } : {
    main: At[500],
    light: At[300],
    dark: At[700]
  };
}
function Kf(e = "light") {
  return e === "dark" ? {
    main: Dt[500],
    light: Dt[300],
    dark: Dt[700]
  } : {
    main: Dt[700],
    light: Dt[400],
    dark: Dt[800]
  };
}
function Jf(e = "light") {
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
function Zf(e = "light") {
  return e === "dark" ? {
    main: Lt[400],
    light: Lt[300],
    dark: Lt[700]
  } : {
    main: Lt[800],
    light: Lt[500],
    dark: Lt[900]
  };
}
function Qf(e = "light") {
  return e === "dark" ? {
    main: cn[400],
    light: cn[300],
    dark: cn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: cn[500],
    dark: cn[900]
  };
}
function em(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = fe(e, Gf), i = e.primary || qf(t), a = e.secondary || Yf(t), l = e.error || Kf(t), c = e.info || Jf(t), u = e.success || Zf(t), f = e.warning || Qf(t);
  function v(d) {
    const b = zi(d, jr.text.primary) >= n ? jr.text.primary : Ui.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = zi(d, b);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${d}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return b;
  }
  const g = ({
    color: d,
    name: b,
    mainShade: w = 500,
    lightShade: C = 300,
    darkShade: x = 700
  }) => {
    if (d = S({}, d), !d.main && d[w] && (d.main = d[w]), !d.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : Xt(11, b ? ` (${b})` : "", w));
    if (typeof d.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(d.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Xt(12, b ? ` (${b})` : "", JSON.stringify(d.main)));
    return Hi(d, "light", C, r), Hi(d, "dark", x, r), d.contrastText || (d.contrastText = v(d.main)), d;
  }, p = {
    dark: jr,
    light: Ui
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), ot(S({
    // A collection of common colors.
    common: S({}, Sn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: g({
      color: i,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: g({
      color: a,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: g({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: g({
      color: f,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: g({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: g({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: Vf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: v,
    // Generate a rich color object.
    augmentColor: g,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, p[t]), o);
}
const tm = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function nm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Wi = {
  textTransform: "uppercase"
}, Xi = '"Roboto", "Helvetica", "Arial", sans-serif';
function rm(e, t) {
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
  } = n, g = fe(n, tm);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, m = v || ((w) => `${w / u * p}rem`), d = (w, C, x, E, y) => S({
    fontFamily: r,
    fontWeight: w,
    fontSize: m(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, r === Xi ? {
    letterSpacing: `${nm(E / C)}em`
  } : {}, y, f), b = {
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
  return ot(S({
    htmlFontSize: u,
    pxToRem: m,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: i,
    fontWeightRegular: a,
    fontWeightMedium: l,
    fontWeightBold: c
  }, b), g, {
    clone: !1
    // No need to clone deep
  });
}
const om = 0.2, im = 0.14, am = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${om})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${im})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${am})`].join(",");
}
const sm = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], lm = sm, cm = ["duration", "easing", "delay"], pm = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, um = {
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
function dm(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function fm(e) {
  const t = S({}, pm, e.easing), n = S({}, um, e.duration);
  return S({
    getAutoHeightDuration: dm,
    create: (o = ["all"], i = {}) => {
      const {
        duration: a = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = i, u = fe(i, cm);
      if (process.env.NODE_ENV !== "production") {
        const f = (g) => typeof g == "string", v = (g) => !isNaN(parseFloat(g));
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
const mm = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, hm = mm, gm = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function bm(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: i = {}
  } = e, a = fe(e, gm);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Xt(18));
  const l = em(r), c = Io(e);
  let u = ot(c, {
    mixins: jf(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: lm.slice(),
    typography: rm(l, i),
    transitions: fm(o),
    zIndex: S({}, hm)
  });
  if (u = ot(u, a), u = t.reduce((f, v) => ot(f, v), u), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (g, p) => {
      let m;
      for (m in g) {
        const d = g[m];
        if (f.indexOf(m) !== -1 && Object.keys(d).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const b = Ze("", m);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${m}\` internal state.`, "You can not override it like this: ", JSON.stringify(g, null, 2), "", `Instead, you need to use the '&.${b}' syntax:`, JSON.stringify({
              root: {
                [`&.${b}`]: d
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          g[m] = {};
        }
      }
    };
    Object.keys(u.components).forEach((g) => {
      const p = u.components[g].styleOverrides;
      p && g.indexOf("Mui") === 0 && v(p, g);
    });
  }
  return u.unstable_sxConfig = S({}, $o, a == null ? void 0 : a.unstable_sxConfig), u.unstable_sx = function(v) {
    return _o({
      sx: v,
      theme: this
    });
  }, u;
}
const vm = bm(), Ao = vm, Do = "$$material", hs = (e) => Wn(e) && e !== "classes", ym = Rf({
  themeId: Do,
  defaultTheme: Ao,
  rootShouldForwardProp: hs
}), Pe = ym;
function Mn() {
  const e = ms(Ao);
  return process.env.NODE_ENV !== "production" && k.useDebugValue(e), e[Do] || e;
}
function ct({
  props: e,
  name: t
}) {
  return _f({
    props: e,
    name: t,
    defaultTheme: Ao,
    themeId: Do
  });
}
function no(e, t) {
  return no = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, no(e, t);
}
function wm(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, no(e, t);
}
const qi = {
  disabled: !1
};
var xm = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const gs = Q.createContext(null);
var Em = function(t) {
  return t.scrollTop;
}, gn = "unmounted", xt = "exited", Et = "entering", Ut = "entered", ro = "exiting", pt = /* @__PURE__ */ function(e) {
  wm(t, e);
  function t(r, o) {
    var i;
    i = e.call(this, r, o) || this;
    var a = o, l = a && !a.isMounting ? r.enter : r.appear, c;
    return i.appearStatus = null, r.in ? l ? (c = xt, i.appearStatus = Et) : c = Ut : r.unmountOnExit || r.mountOnEnter ? c = gn : c = xt, i.state = {
      status: c
    }, i.nextCallback = null, i;
  }
  t.getDerivedStateFromProps = function(o, i) {
    var a = o.in;
    return a && i.status === gn ? {
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
      this.props.in ? a !== Et && a !== Ut && (i = Et) : (a === Et || a === Ut) && (i = ro);
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
          a && Em(a);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === xt && this.setState({
        status: gn
      });
  }, n.performEnter = function(o) {
    var i = this, a = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Bn.findDOMNode(this), l], u = c[0], f = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
    if (!o && !a || qi.disabled) {
      this.safeSetState({
        status: Ut
      }, function() {
        i.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, f), this.safeSetState({
      status: Et
    }, function() {
      i.props.onEntering(u, f), i.onTransitionEnd(g, function() {
        i.safeSetState({
          status: Ut
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
      status: ro
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
    if (o === gn)
      return null;
    var i = this.props, a = i.children;
    i.in, i.mountOnEnter, i.unmountOnExit, i.appear, i.enter, i.exit, i.timeout, i.addEndListener, i.onEnter, i.onEntering, i.onEntered, i.onExit, i.onExiting, i.onExited, i.nodeRef;
    var l = fe(i, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ Q.createElement(gs.Provider, {
        value: null
      }, typeof a == "function" ? a(o, l) : Q.cloneElement(Q.Children.only(a), l))
    );
  }, t;
}(Q.Component);
pt.contextType = gs;
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
    var n = xm;
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
function Vt() {
}
pt.defaultProps = {
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
pt.UNMOUNTED = gn;
pt.EXITED = xt;
pt.ENTERING = Et;
pt.ENTERED = Ut;
pt.EXITING = ro;
const bs = pt, vs = (e) => e.scrollTop;
function lr(e, t) {
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
const km = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function oo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Tm = {
  entering: {
    opacity: 1,
    transform: oo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Br = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), jo = /* @__PURE__ */ k.forwardRef(function(t, n) {
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
    onExited: g,
    onExiting: p,
    style: m,
    timeout: d = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: b = bs
  } = t, w = fe(t, km), C = mn(), x = k.useRef(), E = Mn(), y = k.useRef(null), T = He(y, i.ref, n), O = (D) => (_) => {
    if (D) {
      const z = y.current;
      _ === void 0 ? D(z) : D(z, _);
    }
  }, R = O(f), A = O((D, _) => {
    vs(D);
    const {
      duration: z,
      delay: Z,
      easing: q
    } = lr({
      style: m,
      timeout: d,
      easing: a
    }, {
      mode: "enter"
    });
    let N;
    d === "auto" ? (N = E.transitions.getAutoHeightDuration(D.clientHeight), x.current = N) : N = z, D.style.transition = [E.transitions.create("opacity", {
      duration: N,
      delay: Z
    }), E.transitions.create("transform", {
      duration: Br ? N : N * 0.666,
      delay: Z,
      easing: q
    })].join(","), c && c(D, _);
  }), L = O(u), P = O(p), I = O((D) => {
    const {
      duration: _,
      delay: z,
      easing: Z
    } = lr({
      style: m,
      timeout: d,
      easing: a
    }, {
      mode: "exit"
    });
    let q;
    d === "auto" ? (q = E.transitions.getAutoHeightDuration(D.clientHeight), x.current = q) : q = _, D.style.transition = [E.transitions.create("opacity", {
      duration: q,
      delay: z
    }), E.transitions.create("transform", {
      duration: Br ? q : q * 0.666,
      delay: Br ? z : z || q * 0.333,
      easing: Z
    })].join(","), D.style.opacity = 0, D.style.transform = oo(0.75), v && v(D);
  }), M = O(g);
  return /* @__PURE__ */ h(b, S({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: A,
    onEntered: L,
    onEntering: R,
    onExit: I,
    onExited: M,
    onExiting: P,
    addEndListener: (D) => {
      d === "auto" && C.start(x.current || 0, D), r && r(y.current, D);
    },
    timeout: d === "auto" ? null : d
  }, w, {
    children: (D, _) => /* @__PURE__ */ k.cloneElement(i, S({
      style: S({
        opacity: 0,
        transform: oo(0.75),
        visibility: D === "exited" && !l ? "hidden" : void 0
      }, Tm[D], m, i.props.style),
      ref: T
    }, _))
  }));
});
process.env.NODE_ENV !== "production" && (jo.propTypes = {
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
jo.muiSupportAuto = !0;
const io = jo, Nm = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, Yi = Nm, Om = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Sm = Pe(cs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ys = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r;
  const o = fs(), i = ct({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: a,
    component: l,
    components: c,
    componentsProps: u,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: m,
    placement: d,
    popperOptions: b,
    popperRef: w,
    transition: C,
    slots: x,
    slotProps: E
  } = i, y = fe(i, Om), T = (r = x == null ? void 0 : x.root) != null ? r : c == null ? void 0 : c.Root, O = S({
    anchorEl: a,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: m,
    placement: d,
    popperOptions: b,
    popperRef: w,
    transition: C
  }, y);
  return /* @__PURE__ */ h(Sm, S({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: T
    },
    slotProps: E ?? u
  }, O, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (ys.propTypes = {
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
  anchorEl: s.oneOfType([it, s.object, s.func]),
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
  container: s.oneOfType([it, s.func]),
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
  popperRef: xo,
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
const ws = ys;
function Cm(e) {
  return Ze("MuiTooltip", e);
}
const Pm = ht("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ft = Pm, Rm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function $m(e) {
  return Math.round(e * 1e5) / 1e5;
}
const _m = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: i
  } = e, a = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ke(i.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return lt(a, Cm, t);
}, Im = Pe(ws, {
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
}) => S({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${ft.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${ft.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${ft.arrow}`]: S({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ft.arrow}`]: S({}, t.isRtl ? {
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
})), Mm = Pe("div", {
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
}) => S({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : sr(e.palette.grey[700], 0.92),
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
  lineHeight: `${$m(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ft.popper}[data-popper-placement*="left"] &`]: S({
    transformOrigin: "right center"
  }, t.isRtl ? S({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : S({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${ft.popper}[data-popper-placement*="right"] &`]: S({
    transformOrigin: "left center"
  }, t.isRtl ? S({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : S({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${ft.popper}[data-popper-placement*="top"] &`]: S({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ft.popper}[data-popper-placement*="bottom"] &`]: S({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Am = Pe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : sr(e.palette.grey[700], 0.9),
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
const Ki = new Pn();
let pn = {
  x: 0,
  y: 0
};
function Un(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const xs = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, a, l, c, u, f, v, g, p, m, d, b, w, C, x, E, y;
  const T = ct({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: O = !1,
    children: R,
    components: A = {},
    componentsProps: L = {},
    describeChild: P = !1,
    disableFocusListener: I = !1,
    disableHoverListener: M = !1,
    disableInteractive: V = !1,
    disableTouchListener: D = !1,
    enterDelay: _ = 100,
    enterNextDelay: z = 0,
    enterTouchDelay: Z = 700,
    followCursor: q = !1,
    id: N,
    leaveDelay: j = 0,
    leaveTouchDelay: U = 1500,
    onClose: J,
    onOpen: H,
    open: X,
    placement: Y = "bottom",
    PopperComponent: K,
    PopperProps: G = {},
    slotProps: ee = {},
    slots: te = {},
    title: ae,
    TransitionComponent: B = io,
    TransitionProps: ne
  } = T, $ = fe(T, Rm), se = /* @__PURE__ */ k.isValidElement(R) ? R : /* @__PURE__ */ h("span", {
    children: R
  }), Te = Mn(), Re = Te.direction === "rtl", [Ee, vt] = k.useState(), [$e, Qe] = k.useState(null), De = k.useRef(!1), et = V || q, Ne = mn(), Mt = mn(), yt = mn(), en = mn(), [An, Uo] = Va({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let tt = An;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = k.useRef(X !== void 0);
    k.useEffect(() => {
      Ee && Ee.disabled && !re && ae !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ae, Ee, re]);
  }
  const Tr = La(N), tn = k.useRef(), Dn = kn(() => {
    tn.current !== void 0 && (document.body.style.WebkitUserSelect = tn.current, tn.current = void 0), en.clear();
  });
  k.useEffect(() => Dn, [Dn]);
  const Ho = (re) => {
    Ki.clear(), zn = !0, Uo(!0), H && !tt && H(re);
  }, jn = kn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      Ki.start(800 + j, () => {
        zn = !1;
      }), Uo(!1), J && tt && J(re), Ne.start(Te.transitions.duration.shortest, () => {
        De.current = !1;
      });
    }
  ), Nr = (re) => {
    De.current && re.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), Mt.clear(), yt.clear(), _ || zn && z ? Mt.start(zn ? z : _, () => {
      Ho(re);
    }) : Ho(re));
  }, Wo = (re) => {
    Mt.clear(), yt.start(j, () => {
      jn(re);
    });
  }, {
    isFocusVisibleRef: Xo,
    onBlur: il,
    onFocus: al,
    ref: sl
  } = Fa(), [, Go] = k.useState(!1), qo = (re) => {
    il(re), Xo.current === !1 && (Go(!1), Wo(re));
  }, Yo = (re) => {
    Ee || vt(re.currentTarget), al(re), Xo.current === !0 && (Go(!0), Nr(re));
  }, Ko = (re) => {
    De.current = !0;
    const je = se.props;
    je.onTouchStart && je.onTouchStart(re);
  }, Jo = Nr, Zo = Wo, ll = (re) => {
    Ko(re), yt.clear(), Ne.clear(), Dn(), tn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", en.start(Z, () => {
      document.body.style.WebkitUserSelect = tn.current, Nr(re);
    });
  }, cl = (re) => {
    se.props.onTouchEnd && se.props.onTouchEnd(re), Dn(), yt.start(U, () => {
      jn(re);
    });
  };
  k.useEffect(() => {
    if (!tt)
      return;
    function re(je) {
      (je.key === "Escape" || je.key === "Esc") && jn(je);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [jn, tt]);
  const pl = He(se.ref, sl, vt, n);
  !ae && ae !== 0 && (tt = !1);
  const Or = k.useRef(), ul = (re) => {
    const je = se.props;
    je.onMouseMove && je.onMouseMove(re), pn = {
      x: re.clientX,
      y: re.clientY
    }, Or.current && Or.current.update();
  }, nn = {}, Sr = typeof ae == "string";
  P ? (nn.title = !tt && Sr && !M ? ae : null, nn["aria-describedby"] = tt ? Tr : null) : (nn["aria-label"] = Sr ? ae : null, nn["aria-labelledby"] = tt && !Sr ? Tr : null);
  const Fe = S({}, nn, $, se.props, {
    className: Se($.className, se.props.className),
    onTouchStart: Ko,
    ref: pl
  }, q ? {
    onMouseMove: ul
  } : {});
  process.env.NODE_ENV !== "production" && (Fe["data-mui-internal-clone-element"] = !0, k.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const rn = {};
  D || (Fe.onTouchStart = ll, Fe.onTouchEnd = cl), M || (Fe.onMouseOver = Un(Jo, Fe.onMouseOver), Fe.onMouseLeave = Un(Zo, Fe.onMouseLeave), et || (rn.onMouseOver = Jo, rn.onMouseLeave = Zo)), I || (Fe.onFocus = Un(Yo, Fe.onFocus), Fe.onBlur = Un(qo, Fe.onBlur), et || (rn.onFocus = Yo, rn.onBlur = qo)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const dl = k.useMemo(() => {
    var re;
    let je = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (re = G.popperOptions) != null && re.modifiers && (je = je.concat(G.popperOptions.modifiers)), S({}, G.popperOptions, {
      modifiers: je
    });
  }, [$e, G]), on = S({}, T, {
    isRtl: Re,
    arrow: O,
    disableInteractive: et,
    placement: Y,
    PopperComponentProp: K,
    touch: De.current
  }), Cr = _m(on), Qo = (r = (o = te.popper) != null ? o : A.Popper) != null ? r : Im, ei = (i = (a = (l = te.transition) != null ? l : A.Transition) != null ? a : B) != null ? i : io, ti = (c = (u = te.tooltip) != null ? u : A.Tooltip) != null ? c : Mm, ni = (f = (v = te.arrow) != null ? v : A.Arrow) != null ? f : Am, fl = hn(Qo, S({}, G, (g = ee.popper) != null ? g : L.popper, {
    className: Se(Cr.popper, G == null ? void 0 : G.className, (p = (m = ee.popper) != null ? m : L.popper) == null ? void 0 : p.className)
  }), on), ml = hn(ei, S({}, ne, (d = ee.transition) != null ? d : L.transition), on), hl = hn(ti, S({}, (b = ee.tooltip) != null ? b : L.tooltip, {
    className: Se(Cr.tooltip, (w = (C = ee.tooltip) != null ? C : L.tooltip) == null ? void 0 : w.className)
  }), on), gl = hn(ni, S({}, (x = ee.arrow) != null ? x : L.arrow, {
    className: Se(Cr.arrow, (E = (y = ee.arrow) != null ? y : L.arrow) == null ? void 0 : E.className)
  }), on);
  return /* @__PURE__ */ F(k.Fragment, {
    children: [/* @__PURE__ */ k.cloneElement(se, Fe), /* @__PURE__ */ h(Qo, S({
      as: K ?? ws,
      placement: Y,
      anchorEl: q ? {
        getBoundingClientRect: () => ({
          top: pn.y,
          left: pn.x,
          right: pn.x,
          bottom: pn.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Or,
      open: Ee ? tt : !1,
      id: Tr,
      transition: !0
    }, rn, fl, {
      popperOptions: dl,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ h(ei, S({
        timeout: Te.transitions.duration.shorter
      }, re, ml, {
        children: /* @__PURE__ */ F(ti, S({}, hl, {
          children: [ae, O ? /* @__PURE__ */ h(ni, S({}, gl, {
            ref: Qe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (xs.propTypes = {
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
const Dm = xs;
var Bo = {}, Es = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Es);
var jm = Es.exports, Lr = {};
function Bm(e) {
  return Ze("MuiSvgIcon", e);
}
ht("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Lm = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Vm = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ke(t)}`, `fontSize${Ke(n)}`]
  };
  return lt(o, Bm, r);
}, Fm = Pe("svg", {
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
  var n, r, o, i, a, l, c, u, f, v, g, p, m;
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
    color: (v = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.disabled,
      inherit: void 0
    }[t.color]
  };
}), Lo = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = ct({
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
    viewBox: g = "0 0 24 24"
  } = r, p = fe(r, Lm), m = /* @__PURE__ */ k.isValidElement(o) && o.type === "svg", d = S({}, r, {
    color: a,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: g,
    hasSvgAsChild: m
  }), b = {};
  f || (b.viewBox = g);
  const w = Vm(d);
  return /* @__PURE__ */ F(Fm, S({
    as: l,
    className: Se(w.root, i),
    focusable: "false",
    color: u,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: n
  }, b, p, m && o.props, {
    ownerState: d,
    children: [m ? o.props.children : o, v ? /* @__PURE__ */ h("title", {
      children: v
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
Lo.muiName = "SvgIcon";
const Ji = Lo;
function ks(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ h(Ji, S({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ji.muiName, /* @__PURE__ */ k.memo(/* @__PURE__ */ k.forwardRef(n));
}
const zm = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ga.configure(e);
  }
}, Um = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ke,
  createChainedFunction: Jr,
  createSvgIcon: ks,
  debounce: Ba,
  deprecatedPropType: hp,
  isMuiElement: gp,
  ownerDocument: Ce,
  ownerWindow: Gt,
  requirePropFactory: bp,
  setRef: nr,
  unstable_ClassNameGenerator: zm,
  unstable_useEnhancedEffect: Pt,
  unstable_useId: La,
  unsupportedProp: wp,
  useControlled: Va,
  useEventCallback: kn,
  useForkRef: He,
  useIsFocusVisible: Fa
}, Symbol.toStringTag, { value: "Module" })), Hm = /* @__PURE__ */ qc(Um);
var Zi;
function Wm() {
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
    var t = Hm;
  }(Lr)), Lr;
}
var Xm = jm;
Object.defineProperty(Bo, "__esModule", {
  value: !0
});
var Ts = Bo.default = void 0, Gm = Xm(Wm()), qm = bl;
Ts = Bo.default = (0, Gm.default)(/* @__PURE__ */ (0, qm.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Qi(e, t, n) {
  return e ? /* @__PURE__ */ h(ga, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ h("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ns(e) {
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
    hasDisabledGutters: g = !1,
    hasDivider: p = !1,
    focusVisibleClassName: m,
    id: d,
    children: b
  } = e, w = /* @__PURE__ */ h(
    Yl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: f,
      disableGutters: g,
      divider: p,
      focusVisibleClassName: m,
      onClick: t,
      id: d,
      children: n ? /* @__PURE__ */ F(It, { children: [
        Qi(i, n, !0),
        /* @__PURE__ */ h(Kl, { primary: n, inset: !i && o }),
        v ? /* @__PURE__ */ h(ga, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ h(Ts, {}) }) : Qi(a, n, !1)
      ] }) : b
    }
  );
  return r ? /* @__PURE__ */ h(Dm, { title: r, placement: "right", children: /* @__PURE__ */ h("div", { children: w }) }) : w;
}
function Os(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Ym(e) {
  const [t, n] = he(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: i } = e, a = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Os(i).filter((f) => "menuItem" in f.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === r.id
    ), /* @__PURE__ */ h(Vo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ F(It, { children: [
    /* @__PURE__ */ h(Ns, { onClick: a, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ h(
      Jl,
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
const Km = (e, t) => t.filter((o) => o.group === e).sort((o, i) => (o.order || 0) - (i.order || 0));
function Vo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: i, allowForLeadingIcons: a } = cr(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Os(t).filter((m) => !("menuItem" in m.group))
    ), v = Object.values(f).sort(
      (m, d) => (m.group.order || 0) - (d.group.order || 0)
    ), g = [];
    v.forEach((m) => {
      Km(m.id, t.items).forEach(
        (d) => g.push({ item: d, isLastItemInGroup: !1 })
      ), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !0);
    }), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !1);
    const p = g.some(
      (m) => "iconPathBefore" in m.item && m.item.iconPathBefore
    );
    return { items: g, allowForLeadingIcons: p };
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
    return /* @__PURE__ */ h("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ h("div", { role: "menu", "aria-label": u, children: i.map((f, v) => {
    const { item: g } = f, p = l(f);
    if ("command" in g) {
      const m = g.group + v;
      return /* @__PURE__ */ h(
        Ns,
        {
          onClick: (d) => {
            n == null || n(d), r(g);
          },
          ...p
        },
        m
      );
    }
    return /* @__PURE__ */ h(
      Ym,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      u + g.id
    );
  }) }, u);
}
function Jm(e) {
  const { menuDefinition: t, columnId: n } = e;
  let i = Object.entries(t.groups).map(([a, l]) => ({ id: a, group: l })).filter((a) => "column" in a.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (i = i.filter(
    (a) => "column" in a.group && a.group.column === n
  )), /* @__PURE__ */ h(Vo, { ...e, includedGroups: i });
}
function Zm({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: i
}) {
  return /* @__PURE__ */ F(
    ba,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${i ?? ""}`,
      children: [
        /* @__PURE__ */ h("h3", { "aria-label": r.label, className: `papi-menu-column-header ${i ?? ""}`, children: r.label }),
        /* @__PURE__ */ h(Zl, { id: n, dense: !0, className: i ?? "", children: /* @__PURE__ */ h(
          Jm,
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
function Qm({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, i = cr(() => {
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
  return /* @__PURE__ */ h(
    ba,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: i.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: i.map((a, l) => /* @__PURE__ */ h(
        Zm,
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
const Ss = /* @__PURE__ */ k.createContext({});
process.env.NODE_ENV !== "production" && (Ss.displayName = "ListContext");
const eh = Ss;
function th(e) {
  return Ze("MuiList", e);
}
ht("MuiList", ["root", "padding", "dense", "subheader"]);
const nh = ["children", "className", "component", "dense", "disablePadding", "subheader"], rh = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return lt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, th, t);
}, oh = Pe("ul", {
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
}) => S({
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
  const r = ct({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: i,
    component: a = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, f = fe(r, nh), v = k.useMemo(() => ({
    dense: l
  }), [l]), g = S({}, r, {
    component: a,
    dense: l,
    disablePadding: c
  }), p = rh(g);
  return /* @__PURE__ */ h(eh.Provider, {
    value: v,
    children: /* @__PURE__ */ F(oh, S({
      as: a,
      className: Se(p.root, i),
      ref: n,
      ownerState: g
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
const ih = Cs, ah = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Vr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ea(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ps(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function un(e, t, n, r, o, i) {
  let a = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (a)
        return !1;
      a = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Ps(l, i) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Rs = /* @__PURE__ */ k.forwardRef(function(t, n) {
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
  } = t, g = fe(t, ah), p = k.useRef(null), m = k.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Pt(() => {
    o && p.current.focus();
  }, [o]), k.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (x, E) => {
      const y = !p.current.style.width;
      if (x.clientHeight < p.current.clientHeight && y) {
        const T = `${za(Ce(x))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, p.current.style.width = `calc(100% + ${T})`;
      }
      return p.current;
    }
  }), []);
  const d = (x) => {
    const E = p.current, y = x.key, T = Ce(E).activeElement;
    if (y === "ArrowDown")
      x.preventDefault(), un(E, T, u, c, Vr);
    else if (y === "ArrowUp")
      x.preventDefault(), un(E, T, u, c, ea);
    else if (y === "Home")
      x.preventDefault(), un(E, null, u, c, Vr);
    else if (y === "End")
      x.preventDefault(), un(E, null, u, c, ea);
    else if (y.length === 1) {
      const O = m.current, R = y.toLowerCase(), A = performance.now();
      O.keys.length > 0 && (A - O.lastTime > 500 ? (O.keys = [], O.repeating = !0, O.previousKeyMatched = !0) : O.repeating && R !== O.keys[0] && (O.repeating = !1)), O.lastTime = A, O.keys.push(R);
      const L = T && !O.repeating && Ps(T, O);
      O.previousKeyMatched && (L || un(E, T, !1, c, Vr, O)) ? x.preventDefault() : O.previousKeyMatched = !1;
    }
    f && f(x);
  }, b = He(p, n);
  let w = -1;
  k.Children.forEach(a, (x, E) => {
    if (!/* @__PURE__ */ k.isValidElement(x)) {
      w === E && (w += 1, w >= a.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && tr.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (v === "selectedMenu" && x.props.selected || w === -1) && (w = E), w === E && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= a.length && (w = -1));
  });
  const C = k.Children.map(a, (x, E) => {
    if (E === w) {
      const y = {};
      return i && (y.autoFocus = !0), x.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ k.cloneElement(x, y);
    }
    return x;
  });
  return /* @__PURE__ */ h(ih, S({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: d,
    tabIndex: o ? 0 : -1
  }, g, {
    children: C
  }));
});
process.env.NODE_ENV !== "production" && (Rs.propTypes = {
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
const sh = Rs, lh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], ch = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, $s = /* @__PURE__ */ k.forwardRef(function(t, n) {
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
    onEntering: g,
    onExit: p,
    onExited: m,
    onExiting: d,
    style: b,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: C = bs
  } = t, x = fe(t, lh), E = k.useRef(null), y = He(E, l.ref, n), T = (V) => (D) => {
    if (V) {
      const _ = E.current;
      D === void 0 ? V(_) : V(_, D);
    }
  }, O = T(g), R = T((V, D) => {
    vs(V);
    const _ = lr({
      style: b,
      timeout: w,
      easing: c
    }, {
      mode: "enter"
    });
    V.style.webkitTransition = r.transitions.create("opacity", _), V.style.transition = r.transitions.create("opacity", _), f && f(V, D);
  }), A = T(v), L = T(d), P = T((V) => {
    const D = lr({
      style: b,
      timeout: w,
      easing: c
    }, {
      mode: "exit"
    });
    V.style.webkitTransition = r.transitions.create("opacity", D), V.style.transition = r.transitions.create("opacity", D), p && p(V);
  }), I = T(m);
  return /* @__PURE__ */ h(C, S({
    appear: a,
    in: u,
    nodeRef: E,
    onEnter: R,
    onEntered: A,
    onEntering: O,
    onExit: P,
    onExited: I,
    onExiting: L,
    addEndListener: (V) => {
      i && i(E.current, V);
    },
    timeout: w
  }, x, {
    children: (V, D) => /* @__PURE__ */ k.cloneElement(l, S({
      style: S({
        opacity: 0,
        visibility: V === "exited" && !u ? "hidden" : void 0
      }, ch[V], b, l.props.style),
      ref: y
    }, D))
  }));
});
process.env.NODE_ENV !== "production" && ($s.propTypes = {
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
const ph = $s;
function uh(e) {
  return Ze("MuiBackdrop", e);
}
ht("MuiBackdrop", ["root", "invisible"]);
const dh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], fh = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return lt({
    root: ["root", n && "invisible"]
  }, uh, t);
}, mh = Pe("div", {
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
}) => S({
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
})), _s = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const a = ct({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: f = {},
    componentsProps: v = {},
    invisible: g = !1,
    open: p,
    slotProps: m = {},
    slots: d = {},
    TransitionComponent: b = ph,
    transitionDuration: w
  } = a, C = fe(a, dh), x = S({}, a, {
    component: u,
    invisible: g
  }), E = fh(x), y = (r = m.root) != null ? r : v.root;
  return /* @__PURE__ */ h(b, S({
    in: p,
    timeout: w
  }, C, {
    children: /* @__PURE__ */ h(mh, S({
      "aria-hidden": !0
    }, y, {
      as: (o = (i = d.root) != null ? i : f.Root) != null ? o : u,
      className: Se(E.root, c, y == null ? void 0 : y.className),
      ownerState: S({}, x, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (_s.propTypes = {
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
const hh = _s;
function gh(e) {
  return Ze("MuiModal", e);
}
ht("MuiModal", ["root", "hidden", "backdrop"]);
const bh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], vh = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return lt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, gh, r);
}, yh = Pe("div", {
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
}) => S({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), wh = Pe(hh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Is = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i, a, l, c;
  const u = ct({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = wh,
    BackdropProps: v,
    className: g,
    closeAfterTransition: p = !1,
    children: m,
    container: d,
    component: b,
    components: w = {},
    componentsProps: C = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: T = !1,
    disableRestoreFocus: O = !1,
    disableScrollLock: R = !1,
    hideBackdrop: A = !1,
    keepMounted: L = !1,
    onBackdropClick: P,
    open: I,
    slotProps: M,
    slots: V
    // eslint-disable-next-line react/prop-types
  } = u, D = fe(u, bh), _ = S({}, u, {
    closeAfterTransition: p,
    disableAutoFocus: x,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: T,
    disableRestoreFocus: O,
    disableScrollLock: R,
    hideBackdrop: A,
    keepMounted: L
  }), {
    getRootProps: z,
    getBackdropProps: Z,
    getTransitionProps: q,
    portalRef: N,
    isTopModal: j,
    exited: U,
    hasTransition: J
  } = su(S({}, _, {
    rootRef: n
  })), H = S({}, _, {
    exited: U
  }), X = vh(H), Y = {};
  if (m.props.tabIndex === void 0 && (Y.tabIndex = "-1"), J) {
    const {
      onEnter: ne,
      onExited: $
    } = q();
    Y.onEnter = ne, Y.onExited = $;
  }
  const K = (r = (o = V == null ? void 0 : V.root) != null ? o : w.Root) != null ? r : yh, G = (i = (a = V == null ? void 0 : V.backdrop) != null ? a : w.Backdrop) != null ? i : f, ee = (l = M == null ? void 0 : M.root) != null ? l : C.root, te = (c = M == null ? void 0 : M.backdrop) != null ? c : C.backdrop, ae = Rt({
    elementType: K,
    externalSlotProps: ee,
    externalForwardedProps: D,
    getSlotProps: z,
    additionalProps: {
      ref: n,
      as: b
    },
    ownerState: H,
    className: Se(g, ee == null ? void 0 : ee.className, X == null ? void 0 : X.root, !H.open && H.exited && (X == null ? void 0 : X.hidden))
  }), B = Rt({
    elementType: G,
    externalSlotProps: te,
    additionalProps: v,
    getSlotProps: (ne) => Z(S({}, ne, {
      onClick: ($) => {
        P && P($), ne != null && ne.onClick && ne.onClick($);
      }
    })),
    className: Se(te == null ? void 0 : te.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: H
  });
  return !L && !I && (!J || U) ? null : /* @__PURE__ */ h(Tn, {
    ref: N,
    container: d,
    disablePortal: T,
    children: /* @__PURE__ */ F(K, S({}, ae, {
      children: [!A && f ? /* @__PURE__ */ h(G, S({}, B)) : null, /* @__PURE__ */ h(rr, {
        disableEnforceFocus: E,
        disableAutoFocus: x,
        disableRestoreFocus: O,
        isEnabled: j,
        open: I,
        children: /* @__PURE__ */ k.cloneElement(m, Y)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Is.propTypes = {
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
  container: s.oneOfType([it, s.func]),
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
const xh = Is;
function Eh(e) {
  return Ze("MuiPaper", e);
}
ht("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const kh = ["className", "component", "elevation", "square", "variant"], Th = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, i = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return lt(i, Eh, o);
}, Nh = Pe("div", {
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
  return S({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && S({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${sr("#fff", Yi(t.elevation))}, ${sr("#fff", Yi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Ms = /* @__PURE__ */ k.forwardRef(function(t, n) {
  const r = ct({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: i = "div",
    elevation: a = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = fe(r, kh), f = S({}, r, {
    component: i,
    elevation: a,
    square: l,
    variant: c
  }), v = Th(f);
  return process.env.NODE_ENV !== "production" && Mn().shadows[a] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${a}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${a}]\` is defined.`].join(`
`)), /* @__PURE__ */ h(Nh, S({
    as: i,
    ownerState: f,
    className: Se(v.root, o),
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
  elevation: Qt(Wa, (e) => {
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
const Oh = Ms;
function Sh(e) {
  return Ze("MuiPopover", e);
}
ht("MuiPopover", ["root", "paper"]);
const Ch = ["onEntering"], Ph = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Rh = ["slotProps"];
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
const $h = (e) => {
  const {
    classes: t
  } = e;
  return lt({
    root: ["root"],
    paper: ["paper"]
  }, Sh, t);
}, _h = Pe(xh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), As = Pe(Oh, {
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
}), Ds = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o, i;
  const a = ct({
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
    children: g,
    className: p,
    container: m,
    elevation: d = 8,
    marginThreshold: b = 16,
    open: w,
    PaperProps: C = {},
    slots: x,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = io,
    transitionDuration: O = "auto",
    TransitionProps: {
      onEntering: R
    } = {},
    disableScrollLock: A = !1
  } = a, L = fe(a.TransitionProps, Ch), P = fe(a, Ph), I = (r = E == null ? void 0 : E.paper) != null ? r : C, M = k.useRef(), V = He(M, I.ref), D = S({}, a, {
    anchorOrigin: u,
    anchorReference: v,
    elevation: d,
    marginThreshold: b,
    externalPaperSlotProps: I,
    transformOrigin: y,
    TransitionComponent: T,
    transitionDuration: O,
    TransitionProps: L
  }), _ = $h(D), z = k.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const ne = Gn(c), $ = ne && ne.nodeType === 1 ? ne : Ce(M.current).body, se = $.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = $.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + ta(se, u.vertical),
      left: se.left + na(se, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, f, v]), Z = k.useCallback((ne) => ({
    vertical: ta(ne, y.vertical),
    horizontal: na(ne, y.horizontal)
  }), [y.horizontal, y.vertical]), q = k.useCallback((ne) => {
    const $ = {
      width: ne.offsetWidth,
      height: ne.offsetHeight
    }, se = Z($);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ra(se)
      };
    const Te = z();
    let Re = Te.top - se.vertical, Ee = Te.left - se.horizontal;
    const vt = Re + $.height, $e = Ee + $.width, Qe = Gt(Gn(c)), De = Qe.innerHeight - b, et = Qe.innerWidth - b;
    if (b !== null && Re < b) {
      const Ne = Re - b;
      Re -= Ne, se.vertical += Ne;
    } else if (b !== null && vt > De) {
      const Ne = vt - De;
      Re -= Ne, se.vertical += Ne;
    }
    if (process.env.NODE_ENV !== "production" && $.height > De && $.height && De && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${$.height - De}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), b !== null && Ee < b) {
      const Ne = Ee - b;
      Ee -= Ne, se.horizontal += Ne;
    } else if ($e > et) {
      const Ne = $e - et;
      Ee -= Ne, se.horizontal += Ne;
    }
    return {
      top: `${Math.round(Re)}px`,
      left: `${Math.round(Ee)}px`,
      transformOrigin: ra(se)
    };
  }, [c, v, z, Z, b]), [N, j] = k.useState(w), U = k.useCallback(() => {
    const ne = M.current;
    if (!ne)
      return;
    const $ = q(ne);
    $.top !== null && (ne.style.top = $.top), $.left !== null && (ne.style.left = $.left), ne.style.transformOrigin = $.transformOrigin, j(!0);
  }, [q]);
  k.useEffect(() => (A && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, A, U]);
  const J = (ne, $) => {
    R && R(ne, $), U();
  }, H = () => {
    j(!1);
  };
  k.useEffect(() => {
    w && U();
  }), k.useImperativeHandle(l, () => w ? {
    updatePosition: () => {
      U();
    }
  } : null, [w, U]), k.useEffect(() => {
    if (!w)
      return;
    const ne = Ba(() => {
      U();
    }), $ = Gt(c);
    return $.addEventListener("resize", ne), () => {
      ne.clear(), $.removeEventListener("resize", ne);
    };
  }, [c, w, U]);
  let X = O;
  O === "auto" && !T.muiSupportAuto && (X = void 0);
  const Y = m || (c ? Ce(Gn(c)).body : void 0), K = (o = x == null ? void 0 : x.root) != null ? o : _h, G = (i = x == null ? void 0 : x.paper) != null ? i : As, ee = Rt({
    elementType: G,
    externalSlotProps: S({}, I, {
      style: N ? I.style : S({}, I.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: d,
      ref: V
    },
    ownerState: D,
    className: Se(_.paper, I == null ? void 0 : I.className)
  }), te = Rt({
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
    ownerState: D,
    className: Se(_.root, p)
  }), {
    slotProps: ae
  } = te, B = fe(te, Rh);
  return /* @__PURE__ */ h(K, S({}, B, !Ya(K) && {
    slotProps: ae,
    disableScrollLock: A
  }, {
    children: /* @__PURE__ */ h(T, S({
      appear: !0,
      in: w,
      onEntering: J,
      onExited: H,
      timeout: X
    }, L, {
      children: /* @__PURE__ */ h(G, S({}, ee, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ds.propTypes = {
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
  anchorEl: Qt(s.oneOfType([it, s.func]), (e) => {
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
  container: s.oneOfType([it, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Wa,
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
    component: sp
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
const Ih = Ds;
function Mh(e) {
  return Ze("MuiMenu", e);
}
ht("MuiMenu", ["root", "paper", "list"]);
const Ah = ["onEntering"], Dh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], jh = {
  vertical: "top",
  horizontal: "right"
}, Bh = {
  vertical: "top",
  horizontal: "left"
}, Lh = (e) => {
  const {
    classes: t
  } = e;
  return lt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Mh, t);
}, Vh = Pe(Ih, {
  shouldForwardProp: (e) => hs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Fh = Pe(As, {
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
}), zh = Pe(sh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), js = /* @__PURE__ */ k.forwardRef(function(t, n) {
  var r, o;
  const i = ct({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: a = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: f = {},
    onClose: v,
    open: g,
    PaperProps: p = {},
    PopoverClasses: m,
    transitionDuration: d = "auto",
    TransitionProps: {
      onEntering: b
    } = {},
    variant: w = "selectedMenu",
    slots: C = {},
    slotProps: x = {}
  } = i, E = fe(i.TransitionProps, Ah), y = fe(i, Dh), T = Mn(), O = T.direction === "rtl", R = S({}, i, {
    autoFocus: a,
    disableAutoFocusItem: u,
    MenuListProps: f,
    onEntering: b,
    PaperProps: p,
    transitionDuration: d,
    TransitionProps: E,
    variant: w
  }), A = Lh(R), L = a && !u && g, P = k.useRef(null), I = (q, N) => {
    P.current && P.current.adjustStyleForScrollbar(q, T), b && b(q, N);
  }, M = (q) => {
    q.key === "Tab" && (q.preventDefault(), v && v(q, "tabKeyDown"));
  };
  let V = -1;
  k.Children.map(l, (q, N) => {
    /* @__PURE__ */ k.isValidElement(q) && (process.env.NODE_ENV !== "production" && tr.isFragment(q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), q.props.disabled || (w === "selectedMenu" && q.props.selected || V === -1) && (V = N));
  });
  const D = (r = C.paper) != null ? r : Fh, _ = (o = x.paper) != null ? o : p, z = Rt({
    elementType: C.root,
    externalSlotProps: x.root,
    ownerState: R,
    className: [A.root, c]
  }), Z = Rt({
    elementType: D,
    externalSlotProps: _,
    ownerState: R,
    className: A.paper
  });
  return /* @__PURE__ */ h(Vh, S({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: O ? "right" : "left"
    },
    transformOrigin: O ? jh : Bh,
    slots: {
      paper: D,
      root: C.root
    },
    slotProps: {
      root: z,
      paper: Z
    },
    open: g,
    ref: n,
    transitionDuration: d,
    TransitionProps: S({
      onEntering: I
    }, E),
    ownerState: R
  }, y, {
    classes: m,
    children: /* @__PURE__ */ h(zh, S({
      onKeyDown: M,
      actions: P,
      autoFocus: a && (V === -1 || u),
      autoFocusItem: L,
      variant: w
    }, f, {
      className: Se(A.list, f.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (js.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([it, s.func]),
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
const Uh = js;
function Yb({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, i] = Q.useState(void 0), a = Oe(
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
  ), l = Oe(() => {
    i(void 0);
  }, []), c = cr(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ F(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: a,
      children: [
        r,
        /* @__PURE__ */ h(
          Uh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ h(
              Vo,
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
const Hh = ks(/* @__PURE__ */ h("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Wh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const ao = (e, t, n = {}) => {
  const r = Nt(t);
  r.current = t;
  const o = Nt(n);
  o.current = Wh(o.current);
  const [i, a] = he(() => r.current), [l, c] = he(!0);
  return mt(() => {
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
function Xh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: i,
  ariaLabelPrefix: a,
  children: l
}) {
  const [c, u] = he(!1), [f, v] = he(!1), g = Oe(() => {
    c && u(!1), v(!1);
  }, [c]), p = Oe((E) => {
    E.stopPropagation(), u((y) => {
      const T = !y;
      return T && E.shiftKey ? v(!0) : T || v(!1), T;
    });
  }, []), m = Oe(
    (E) => (g(), r(E)),
    [r, g]
  ), [d, b] = he({ top: 1, left: 1 });
  mt(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), T = window.scrollY, O = window.scrollX, R = y.top + T + E.clientHeight, A = y.left + O;
        b({ top: R, left: A });
      }
    }
  }, [c, o]);
  const [w] = ao(
    Oe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [C] = ao(
    Oe(async () => (e == null ? void 0 : e(!0)) ?? n ?? w, [e, n, w, c]),
    n ?? w
  ), x = f && C ? C : w;
  return /* @__PURE__ */ F(It, { children: [
    /* @__PURE__ */ h(
      va,
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
        children: l ?? /* @__PURE__ */ h(Hh, {})
      }
    ),
    /* @__PURE__ */ h(
      Ql,
      {
        className: `papi-menu-drawer ${i ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: g,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: d.top,
            left: d.left
          }
        },
        children: x ? /* @__PURE__ */ h(
          Qm,
          {
            className: i,
            id: `${a ?? ""} main menu`,
            commandHandler: m,
            multiColumnMenu: x
          }
        ) : void 0
      }
    )
  ] });
}
function Kb({
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
  return /* @__PURE__ */ h(
    va,
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
const Gh = po(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Bs = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(ya.Root, { ref: n, className: W(Gh(), e), ...t }));
Bs.displayName = ya.Root.displayName;
function qh({
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
  onFocus: g,
  onBlur: p
}) {
  return /* @__PURE__ */ F("div", { className: W("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ h(
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
    /* @__PURE__ */ h(
      ur,
      {
        id: e,
        disabled: t,
        placeholder: a,
        required: l,
        className: W(c, { "pr-border-red-600": n }),
        defaultValue: u,
        value: f,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ h("p", { className: W({ "pr-hidden": !o }), children: o })
  ] });
}
function Jb({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = he(""), i = (a) => {
    o(a), e(a);
  };
  return /* @__PURE__ */ h(
    qh,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (a) => i(a.target.value)
    }
  );
}
function Zb({
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
  onChangeCommitted: g
}) {
  return /* @__PURE__ */ h(
    ec,
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
      onChangeCommitted: g
    }
  );
}
function Qb({
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
  return /* @__PURE__ */ h(
    tc,
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
function ev({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: i
}) {
  return /* @__PURE__ */ h(
    nc,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: i
    }
  );
}
function tv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const i = Nt(void 0);
  return /* @__PURE__ */ h("div", { ref: i, style: { position: "relative" }, children: /* @__PURE__ */ h(rc, { position: "static", id: r, children: /* @__PURE__ */ F(oc, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ h(
      Xh,
      {
        commandHandler: t,
        containerRef: i,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ h("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const nv = Ae.Root, Yh = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Yh.displayName = Ae.List.displayName;
const Kh = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Kh.displayName = Ae.Trigger.displayName;
const Jh = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Jh.displayName = Ae.Content.displayName;
const Zh = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Root,
  {
    orientation: "vertical",
    ref: n,
    className: W("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Zh.displayName = Ae.List.displayName;
const Qh = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
Qh.displayName = Ae.List.displayName;
const rv = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Trigger,
  {
    ref: n,
    ...t,
    className: W(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), eg = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
eg.displayName = Ae.Content.displayName;
function tg({ columns: e, tableData: t, onSelectItem: n }) {
  return /* @__PURE__ */ h("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ h(Wc, { columns: e, data: t, onRowClickHandler: (o, i) => {
    i.toggleAllRowsSelected(!1), o.toggleSelected(void 0), n(o.getValue("item"));
  } }) });
}
const oa = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  return n ? +n[1] : 0;
}, ia = (e, t, n, r) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], i = e.split(`
`);
  let a = r.chapterNum, l = r.verseNum, c = 0;
  return i.forEach((u) => {
    u.startsWith("\\id") && (a = 0, l = 0), u.startsWith("\\c") && (a = oa(u), l = 0), u.startsWith("\\v") && (l = oa(u), a === 0 && (a = r.chapterNum));
    const f = n(u, t);
    for (let v = 0; v < f.length; v++) {
      const g = {
        reference: { ...r, chapterNum: +a, verseNum: +l },
        snippet: u,
        key: c
      };
      c += 1, o.push(g);
    }
  }), o;
};
function ng({
  selectedItem: e,
  text: t,
  extractItems: n,
  scriptureReference: r,
  setScriptureReference: o,
  localizedStrings: i
}) {
  const a = i["%webView_inventory_occurrences_table_header_reference%"], l = i["%webView_inventory_occurrences_table_header_occurrence%"], [c, u] = he(
    ia(t, e, n, r)
  );
  return mt(
    () => u(ia(t, e, n, r)),
    [t, e, r, n]
  ), /* @__PURE__ */ F(bo, { children: [
    /* @__PURE__ */ h(vo, { children: /* @__PURE__ */ F(Ht, { children: [
      /* @__PURE__ */ h(Zn, { children: a }),
      /* @__PURE__ */ h(Zn, { children: l })
    ] }) }),
    /* @__PURE__ */ h(yo, { children: c.map((f) => /* @__PURE__ */ F(
      Ht,
      {
        onClick: () => {
          o(f.reference);
        },
        children: [
          /* @__PURE__ */ h(En, { children: `${me.bookNumberToEnglishName(f.reference.bookNum)} ${f.reference.chapterNum}:${f.reference.verseNum}` }),
          /* @__PURE__ */ h(En, { children: f.snippet })
        ]
      },
      f.key
    )) })
  ] });
}
const rg = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (o) => t === "approved" && o.status === !0 || t === "unapproved" && o.status === !1 || t === "unknown" && o.status === void 0
  )), n !== "" && (r = r.filter((o) => o.item.includes(n))), console.log("filtered data:", r), r;
}, og = (e, t, n) => {
  const r = [], o = t(e);
  for (let i = 0; i < o.length; i++) {
    const a = o[i], l = r.find((c) => c.item === a);
    if (l)
      l.count += 1;
    else {
      const c = {
        item: a,
        count: 1,
        status: n(a)
      };
      r.push(c);
    }
  }
  return r;
};
function Ls({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  extractItems: r,
  approvedItems: o,
  onApprovedItemsChange: i,
  unapprovedItems: a,
  onUnapprovedItemsChange: l,
  text: c,
  scope: u,
  onScopeChange: f,
  columns: v
}) {
  const g = n["%webView_inventory_all%"], p = n["%webView_inventory_approved%"], m = n["%webView_inventory_unapproved%"], d = n["%webView_inventory_unknown%"], b = n["%webView_inventory_scope_book%"], w = n["%webView_inventory_scope_chapter%"], C = n["%webView_inventory_scope_verse%"], x = n["%webView_inventory_filter_text%"], [E, y] = he([]), [T, O] = he("all"), [R, A] = he(""), [L, P] = he(""), I = (D, _) => {
    y((q) => {
      let N = [];
      return D.forEach((j) => {
        N = q.map((U) => U.item === j && U.status !== _ ? { ...U, status: _ } : U);
      }), N;
    });
    let z = [...o];
    D.forEach((q) => {
      _ === !0 ? z.includes(q) || z.push(q) : z = z.filter((N) => N !== q);
    }), i(z);
    let Z = [...a];
    D.forEach((q) => {
      _ === !1 ? Z.includes(q) || Z.push(q) : Z = Z.filter((N) => N !== q);
    }), l(Z);
  }, M = Oe(
    (D) => {
      if (o.includes(D))
        return !0;
      if (a.includes(D))
        return !1;
    },
    [o, a]
  );
  mt(() => {
    c && (console.log("Updating itemData"), y(og(c, r, M)));
  }, [r, e, c, M]);
  const V = cr(() => rg(E, T, R), [E, T, R]);
  return /* @__PURE__ */ F("div", { className: "pr-twp pr-font-sans", children: [
    /* @__PURE__ */ F("div", { className: "pr-flex", children: [
      /* @__PURE__ */ F(Gr, { onValueChange: (D) => O(D), defaultValue: T, children: [
        /* @__PURE__ */ h(Qn, { children: /* @__PURE__ */ h(qr, { placeholder: "Select filter" }) }),
        /* @__PURE__ */ F(er, { className: "pr-font-sans", children: [
          /* @__PURE__ */ h(rt, { value: "all", children: g }),
          /* @__PURE__ */ h(rt, { value: "approved", children: p }),
          /* @__PURE__ */ h(rt, { value: "unapproved", children: m }),
          /* @__PURE__ */ h(rt, { value: "unknown", children: d })
        ] })
      ] }),
      /* @__PURE__ */ F(Gr, { onValueChange: (D) => f(D), defaultValue: u, children: [
        /* @__PURE__ */ h(Qn, { children: /* @__PURE__ */ h(qr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ F(er, { className: "pr-font-sans", children: [
          /* @__PURE__ */ h(rt, { value: "book", children: b }),
          /* @__PURE__ */ h(rt, { value: "chapter", children: w }),
          /* @__PURE__ */ h(rt, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ h(
        ur,
        {
          className: "pr-rounded-md pr-border",
          placeholder: x,
          value: R,
          onChange: (D) => {
            A(D.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ h(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${L !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ h(
          tg,
          {
            columns: v(I),
            tableData: V,
            onSelectItem: (D) => {
              P(D);
            }
          }
        )
      }
    ),
    L !== "" && /* @__PURE__ */ h("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ h(
      ng,
      {
        selectedItem: L,
        text: c,
        extractItems: r,
        scriptureReference: e,
        setScriptureReference: (D) => t(D),
        localizedStrings: n
      }
    ) })
  ] });
}
const Ot = (e) => e === "asc" ? /* @__PURE__ */ h(Il, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ h(Ml, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ h(Al, { className: "pr-ml-2 pr-h-4 pr-w-4" }), ig = (e, t, n, r, o) => [
  {
    accessorKey: "item",
    header: ({ column: i }) => /* @__PURE__ */ F(ve, { onClick: () => i.toggleSorting(void 0), children: [
      e,
      Ot(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: i }) => /* @__PURE__ */ F(ve, { onClick: () => i.toggleSorting(void 0), children: [
      t,
      Ot(i.getIsSorted())
    ] }),
    cell: ({ row: i }) => i.getValue("item").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: i }) => /* @__PURE__ */ F(ve, { onClick: () => i.toggleSorting(void 0), children: [
      n,
      Ot(i.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: i, table: a }) => {
      const l = a.getSelectedRowModel().rows, c = [];
      return l.forEach((u) => {
        c.push(u.getValue("item"));
      }), /* @__PURE__ */ F("div", { children: [
        /* @__PURE__ */ h("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ F(ve, { onClick: () => i.toggleSorting(void 0), children: [
          r,
          Ot(i.getIsSorted())
        ] }) }),
        /* @__PURE__ */ F("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ h(ve, { children: /* @__PURE__ */ h(
            Yn,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ h(ve, { children: /* @__PURE__ */ h(
            Kn,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ h(ve, { children: /* @__PURE__ */ h(
            Jn,
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
      return a === !0 ? /* @__PURE__ */ h(Yn, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : a === !1 ? /* @__PURE__ */ h(Kn, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ h(Jn, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
], ag = (e, t = void 0) => {
  let n = yl(e, "");
  return t && (n = n.filter((r) => r === t)), n;
};
function ov({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  approvedItems: r,
  onApprovedItemsChange: o,
  unapprovedItems: i,
  onUnapprovedItemsChange: a,
  text: l,
  scope: c,
  onScopeChange: u
}) {
  const f = n["%webView_inventory_table_header_character%"], v = n["%webView_inventory_table_header_unicode_value%"], g = n["%webView_inventory_table_header_count%"], p = n["%webView_inventory_table_header_status%"];
  return /* @__PURE__ */ h("div", { className: "pr-twp", children: /* @__PURE__ */ h(
    Ls,
    {
      scriptureReference: e,
      setScriptureReference: t,
      localizedStrings: n,
      extractItems: ag,
      approvedItems: r,
      onApprovedItemsChange: o,
      unapprovedItems: i,
      onUnapprovedItemsChange: a,
      text: l,
      scope: c,
      onScopeChange: u,
      columns: (d) => ig(f, v, g, p, d)
    }
  ) });
}
const sg = (e, t, n, r) => [
  {
    accessorKey: "item",
    header: ({ column: o }) => /* @__PURE__ */ F(ve, { onClick: () => o.toggleSorting(void 0), children: [
      e,
      Ot(o.getIsSorted())
    ] })
  },
  {
    accessorKey: "count",
    header: ({ column: o }) => /* @__PURE__ */ F(ve, { onClick: () => o.toggleSorting(void 0), children: [
      t,
      Ot(o.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: o, table: i }) => {
      const a = i.getSelectedRowModel().rows, l = [];
      return a.forEach((c) => {
        l.push(c.getValue("item"));
      }), /* @__PURE__ */ F("div", { children: [
        /* @__PURE__ */ h("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ F(ve, { onClick: () => o.toggleSorting(void 0), children: [
          n,
          Ot(o.getIsSorted())
        ] }) }),
        /* @__PURE__ */ F("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ h(ve, { children: /* @__PURE__ */ h(
            Yn,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                r(l, !0);
              }
            }
          ) }),
          /* @__PURE__ */ h(ve, { children: /* @__PURE__ */ h(
            Kn,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                r(l, !1);
              }
            }
          ) }),
          /* @__PURE__ */ h(ve, { children: /* @__PURE__ */ h(
            Jn,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                r(l, void 0);
              }
            }
          ) })
        ] })
      ] });
    },
    cell: ({ row: o }) => {
      const i = o.getValue("status");
      return i === !0 ? /* @__PURE__ */ h(Yn, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : i === !1 ? /* @__PURE__ */ h(Kn, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ h(Jn, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
], lg = (e, t = void 0) => {
  const n = [];
  return e.split(/[\s]+/).forEach((o, i, a) => {
    t && o !== t || i + 1 < a.length && o === a[i + 1] && n.push(o);
  }), n;
};
function iv({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  approvedItems: r,
  onApprovedItemsChange: o,
  unapprovedItems: i,
  onUnapprovedItemsChange: a,
  text: l,
  scope: c,
  onScopeChange: u
}) {
  const f = n["%webView_inventory_table_header_repeated_words%"], v = n["%webView_inventory_table_header_count%"], g = n["%webView_inventory_table_header_status%"];
  return /* @__PURE__ */ h("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ h(
    Ls,
    {
      scriptureReference: e,
      setScriptureReference: t,
      localizedStrings: n,
      extractItems: lg,
      approvedItems: r,
      onApprovedItemsChange: o,
      unapprovedItems: i,
      onUnapprovedItemsChange: a,
      text: l,
      scope: c,
      onScopeChange: u,
      columns: (m) => sg(f, v, g, m)
    }
  ) });
}
function av({
  isDownloading: e,
  handleClick: t,
  buttonText: n
}) {
  return /* @__PURE__ */ h(
    ve,
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
      children: e ? /* @__PURE__ */ h(co, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ F(It, { children: [
        /* @__PURE__ */ h(Dl, { size: 25, className: "pr-h-4 pr-w-4" }),
        n
      ] })
    }
  );
}
function sv({ isRemoving: e, handleClick: t }) {
  return /* @__PURE__ */ h(
    ve,
    {
      className: W(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ F(It, { children: [
        /* @__PURE__ */ h(co, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Removing..."
      ] }) : "Remove"
    }
  );
}
function lv({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ h(
    ve,
    {
      className: W(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ F(It, { children: [
        /* @__PURE__ */ h(co, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
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
const cg = ["children", "options"], aa = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), sa = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, pg = ["style", "script"], ug = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, dg = /mailto:/i, fg = /\n{2,}$/, Vs = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, mg = /^ *> ?/gm, hg = /^ {2,}\n/, gg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Fs = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, zs = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, bg = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, vg = /^(?:\n *)*\n/, yg = /\r\n?/g, wg = /^\[\^([^\]]+)](:.*)\n/, xg = /^\[\^([^\]]+)]/, Eg = /\f/g, kg = /^\s*?\[(x|\s)\]/, Us = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Hs = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Ws = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, so = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, Tg = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Xs = /^<!--[\s\S]*?(?:-->)/, Ng = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, lo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Og = /^\{.*\}$/, Sg = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Cg = /^<([^ >]+@[^ >]+)>/, Pg = /^<([^ >]+:\/[^ >]+)>/, Rg = /-([a-z])?/gi, Gs = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, $g = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, _g = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, Ig = /^\[([^\]]*)\] ?\[([^\]]*)\]/, Mg = /(\[|\])/g, Ag = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, Dg = /\t/g, jg = /^ *\| */, Bg = /(^ *\||\| *$)/g, Lg = / *$/, Vg = /^ *:-+: *$/, Fg = /^ *:-+ *$/, zg = /^ *-+: *$/, Ug = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, Hg = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, Wg = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Xg = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Gg = /^\\([^0-9A-Za-z\s])/, qg = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, Yg = /^\n+/, Kg = /^([ \t]*)/, Jg = /\\([^\\])/g, la = / *\n+$/, Zg = /(?:^|\n)( *)$/, Fo = "(?:\\d+\\.)", zo = "(?:[*+-])";
function qs(e) {
  return "( *)(" + (e === 1 ? Fo : zo) + ") +";
}
const Ys = qs(1), Ks = qs(2);
function Js(e) {
  return new RegExp("^" + (e === 1 ? Ys : Ks));
}
const Qg = Js(1), eb = Js(2);
function Zs(e) {
  return new RegExp("^" + (e === 1 ? Ys : Ks) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Fo : zo) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Qs = Zs(1), el = Zs(2);
function tl(e) {
  const t = e === 1 ? Fo : zo;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const nl = tl(1), rl = tl(2);
function ca(e, t) {
  const n = t === 1, r = n ? nl : rl, o = n ? Qs : el, i = n ? Qg : eb;
  return { t(a, l, c) {
    const u = Zg.exec(c);
    return u && (l.o || !l._ && !l.u) ? r.exec(a = u[1] + a) : null;
  }, i: ie.HIGH, l(a, l, c) {
    const u = n ? +a[2] : void 0, f = a[0].replace(fg, `
`).match(o);
    let v = !1;
    return { p: f.map(function(g, p) {
      const m = i.exec(g)[0].length, d = new RegExp("^ {1," + m + "}", "gm"), b = g.replace(d, "").replace(i, ""), w = p === f.length - 1, C = b.indexOf(`

`) !== -1 || w && v;
      v = C;
      const x = c._, E = c.o;
      let y;
      c.o = !0, C ? (c._ = !1, y = b.replace(la, `

`)) : (c._ = !0, y = b.replace(la, ""));
      const T = l(y, c);
      return c._ = x, c.o = E, T;
    }), m: n, g: u };
  }, h: (a, l, c) => e(a.m ? "ol" : "ul", { key: c.k, start: a.g }, a.p.map(function(u, f) {
    return e("li", { key: f }, l(u, c));
  })) };
}
const tb = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, nb = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, ol = [Vs, Fs, zs, Us, Ws, Hs, Xs, Gs, Qs, nl, el, rl], rb = [...ol, /^[^\n]+(?:  \n|\n{2,})/, so, lo];
function ob(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function ib(e) {
  return zg.test(e) ? "right" : Vg.test(e) ? "center" : Fg.test(e) ? "left" : null;
}
function pa(e, t, n) {
  const r = n.$;
  n.$ = !0;
  const o = t(e.trim(), n);
  n.$ = r;
  let i = [[]];
  return o.forEach(function(a, l) {
    a.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && i.push([]) : (a.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (a.v = a.v.replace(Lg, "")), i[i.length - 1].push(a));
  }), i;
}
function ab(e, t, n) {
  n._ = !0;
  const r = pa(e[1], t, n), o = e[2].replace(Bg, "").split("|").map(ib), i = function(a, l, c) {
    return a.trim().split(`
`).map(function(u) {
      return pa(u, l, c);
    });
  }(e[3], t, n);
  return n._ = !1, { S: o, A: i, L: r, type: "table" };
}
function ua(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function ut(e) {
  return function(t, n) {
    return n._ ? e.exec(t) : null;
  };
}
function dt(e) {
  return function(t, n) {
    return n._ || n.u ? e.exec(t) : null;
  };
}
function nt(e) {
  return function(t, n) {
    return n._ || n.u ? null : e.exec(t);
  };
}
function dn(e) {
  return function(t) {
    return e.exec(t);
  };
}
function sb(e, t, n) {
  if (t._ || t.u || n && !n.endsWith(`
`))
    return null;
  let r = "";
  e.split(`
`).every((i) => !ol.some((a) => a.test(i)) && (r += i + `
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
function da(e) {
  return e.replace(Jg, "$1");
}
function qn(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !0, n.u = !0;
  const i = e(t, n);
  return n._ = r, n.u = o, i;
}
function lb(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !1, n.u = !0;
  const i = e(t, n);
  return n._ = r, n.u = o, i;
}
function cb(e, t, n) {
  return n._ = !1, e(t, n);
}
const Fr = (e, t, n) => ({ v: qn(t, e[1], n) });
function zr() {
  return {};
}
function Ur() {
  return null;
}
function pb(...e) {
  return e.filter(Boolean).join(" ");
}
function Hr(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (; o.length && (r = r[o[0]], r !== void 0); )
    o.shift();
  return r || n;
}
var ie;
function ub(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || ob, t.namedCodesToUnicode = t.namedCodesToUnicode ? Tt({}, sa, t.namedCodesToUnicode) : sa;
  const n = t.createElement || k.createElement;
  function r(p, m, ...d) {
    const b = Hr(t.overrides, `${p}.props`, {});
    return n(function(w, C) {
      const x = Hr(C, w);
      return x ? typeof x == "function" || typeof x == "object" && "render" in x ? x : Hr(C, `${w}.component`, w) : w;
    }(p, t.overrides), Tt({}, m, b, { className: pb(m == null ? void 0 : m.className, b.className) || void 0 }), ...d);
  }
  function o(p) {
    let m = !1;
    t.forceInline ? m = !0 : t.forceBlock || (m = Ag.test(p) === !1);
    const d = f(u(m ? p : `${p.trimEnd().replace(Yg, "")}

`, { _: m }));
    for (; typeof d[d.length - 1] == "string" && !d[d.length - 1].trim(); )
      d.pop();
    if (t.wrapper === null)
      return d;
    const b = t.wrapper || (m ? "span" : "div");
    let w;
    if (d.length > 1 || t.forceWrapper)
      w = d;
    else {
      if (d.length === 1)
        return w = d[0], typeof w == "string" ? r("span", { key: "outer" }, w) : w;
      w = null;
    }
    return k.createElement(b, { key: "outer" }, w);
  }
  function i(p) {
    const m = p.match(ug);
    return m ? m.reduce(function(d, b, w) {
      const C = b.indexOf("=");
      if (C !== -1) {
        const x = function(O) {
          return O.indexOf("-") !== -1 && O.match(Ng) === null && (O = O.replace(Rg, function(R, A) {
            return A.toUpperCase();
          })), O;
        }(b.slice(0, C)).trim(), E = function(O) {
          const R = O[0];
          return (R === '"' || R === "'") && O.length >= 2 && O[O.length - 1] === R ? O.slice(1, -1) : O;
        }(b.slice(C + 1).trim()), y = aa[x] || x, T = d[y] = function(O, R) {
          return O === "style" ? R.split(/;\s?/).reduce(function(A, L) {
            const P = L.slice(0, L.indexOf(":"));
            return A[P.replace(/(-[a-z])/g, (I) => I[1].toUpperCase())] = L.slice(P.length + 1).trim(), A;
          }, {}) : O === "href" ? Ft(R) : (R.match(Og) && (R = R.slice(1, R.length - 1)), R === "true" || R !== "false" && R);
        }(x, E);
        typeof T == "string" && (so.test(T) || lo.test(T)) && (d[y] = k.cloneElement(o(T.trim()), { key: w }));
      } else
        b !== "style" && (d[aa[b] || b] = !0);
      return d;
    }, {}) : null;
  }
  const a = [], l = {}, c = { blockQuote: { t: nt(Vs), i: ie.HIGH, l: (p, m, d) => ({ v: m(p[0].replace(mg, ""), d) }), h: (p, m, d) => r("blockquote", { key: d.k }, m(p.v, d)) }, breakLine: { t: dn(hg), i: ie.HIGH, l: zr, h: (p, m, d) => r("br", { key: d.k }) }, breakThematic: { t: nt(gg), i: ie.HIGH, l: zr, h: (p, m, d) => r("hr", { key: d.k }) }, codeBlock: { t: nt(zs), i: ie.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, m, d) => r("pre", { key: d.k }, r("code", Tt({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: nt(Fs), i: ie.MAX, l: (p) => ({ O: i(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: dt(bg), i: ie.LOW, l: (p) => ({ v: p[2] }), h: (p, m, d) => r("code", { key: d.k }, p.v) }, footnote: { t: nt(wg), i: ie.MAX, l: (p) => (a.push({ I: p[2], j: p[1] }), {}), h: Ur }, footnoteReference: { t: ut(xg), i: ie.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, m, d) => r("a", { key: d.k, href: Ft(p.B) }, r("sup", { key: d.k }, p.v)) }, gfmTask: { t: ut(kg), i: ie.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, m, d) => r("input", { checked: p.R, key: d.k, readOnly: !0, type: "checkbox" }) }, heading: { t: nt(t.enforceAtxHeadings ? Hs : Us), i: ie.HIGH, l: (p, m, d) => ({ v: qn(m, p[2], d), T: t.slugify(p[2]), C: p[1].length }), h: (p, m, d) => r(`h${p.C}`, { id: p.T, key: d.k }, m(p.v, d)) }, headingSetext: { t: nt(Ws), i: ie.MAX, l: (p, m, d) => ({ v: qn(m, p[1], d), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: dn(Xs), i: ie.HIGH, l: () => ({}), h: Ur }, image: { t: dt(nb), i: ie.HIGH, l: (p) => ({ D: p[1], B: da(p[2]), F: p[3] }), h: (p, m, d) => r("img", { key: d.k, alt: p.D || void 0, title: p.F || void 0, src: Ft(p.B) }) }, link: { t: ut(tb), i: ie.LOW, l: (p, m, d) => ({ v: lb(m, p[1], d), B: da(p[2]), F: p[3] }), h: (p, m, d) => r("a", { key: d.k, href: Ft(p.B), title: p.F }, m(p.v, d)) }, linkAngleBraceStyleDetector: { t: ut(Pg), i: ie.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, m) => m.N ? null : ut(Sg)(p, m), i: ie.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: ut(Cg), i: ie.MAX, l(p) {
    let m = p[1], d = p[1];
    return dg.test(d) || (d = "mailto:" + d), { v: [{ v: m.replace("mailto:", ""), type: "text" }], B: d, type: "link" };
  } }, orderedList: ca(r, 1), unorderedList: ca(r, 2), newlineCoalescer: { t: nt(vg), i: ie.LOW, l: zr, h: () => `
` }, paragraph: { t: sb, i: ie.LOW, l: Fr, h: (p, m, d) => r("p", { key: d.k }, m(p.v, d)) }, ref: { t: ut($g), i: ie.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: Ur }, refImage: { t: dt(_g), i: ie.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, m, d) => r("img", { key: d.k, alt: p.D, src: Ft(l[p.P].B), title: l[p.P].F }) }, refLink: { t: ut(Ig), i: ie.MAX, l: (p, m, d) => ({ v: m(p[1], d), Z: m(p[0].replace(Mg, "\\$1"), d), P: p[2] }), h: (p, m, d) => l[p.P] ? r("a", { key: d.k, href: Ft(l[p.P].B), title: l[p.P].F }, m(p.v, d)) : r("span", { key: d.k }, m(p.Z, d)) }, table: { t: nt(Gs), i: ie.HIGH, l: ab, h: (p, m, d) => r("table", { key: d.k }, r("thead", null, r("tr", null, p.L.map(function(b, w) {
    return r("th", { key: w, style: ua(p, w) }, m(b, d));
  }))), r("tbody", null, p.A.map(function(b, w) {
    return r("tr", { key: w }, b.map(function(C, x) {
      return r("td", { key: x, style: ua(p, x) }, m(C, d));
    }));
  }))) }, tableSeparator: { t: function(p, m) {
    return m.$ ? (m._ = !0, jg.exec(p)) : null;
  }, i: ie.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: dn(qg), i: ie.MIN, l: (p) => ({ v: p[0].replace(Tg, (m, d) => t.namedCodesToUnicode[d] ? t.namedCodesToUnicode[d] : m) }), h: (p) => p.v }, textBolded: { t: dt(Ug), i: ie.MED, l: (p, m, d) => ({ v: m(p[2], d) }), h: (p, m, d) => r("strong", { key: d.k }, m(p.v, d)) }, textEmphasized: { t: dt(Hg), i: ie.LOW, l: (p, m, d) => ({ v: m(p[2], d) }), h: (p, m, d) => r("em", { key: d.k }, m(p.v, d)) }, textEscaped: { t: dt(Gg), i: ie.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: dt(Wg), i: ie.LOW, l: Fr, h: (p, m, d) => r("mark", { key: d.k }, m(p.v, d)) }, textStrikethroughed: { t: dt(Xg), i: ie.LOW, l: Fr, h: (p, m, d) => r("del", { key: d.k }, m(p.v, d)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: dn(so), i: ie.HIGH, l(p, m, d) {
    const [, b] = p[3].match(Kg), w = new RegExp(`^${b}`, "gm"), C = p[3].replace(w, ""), x = (E = C, rb.some((R) => R.test(E)) ? cb : qn);
    var E;
    const y = p[1].toLowerCase(), T = pg.indexOf(y) !== -1;
    d.N = d.N || y === "a";
    const O = T ? p[3] : x(m, C, d);
    return d.N = !1, { O: i(p[2]), v: O, G: T, H: T ? y : p[1] };
  }, h: (p, m, d) => r(p.H, Tt({ key: d.k }, p.O), p.G ? p.v : m(p.v, d)) }, c.htmlSelfClosing = { t: dn(lo), i: ie.HIGH, l: (p) => ({ O: i(p[2] || ""), H: p[1] }), h: (p, m, d) => r(p.H, Tt({}, p.O, { key: d.k })) });
  const u = function(p) {
    let m = Object.keys(p);
    function d(b, w) {
      let C = [], x = "";
      for (; b; ) {
        let E = 0;
        for (; E < m.length; ) {
          const y = m[E], T = p[y], O = T.t(b, w, x);
          if (O) {
            const R = O[0];
            b = b.substring(R.length);
            const A = T.l(O, d, w);
            A.type == null && (A.type = y), C.push(A), x = R;
            break;
          }
          E++;
        }
      }
      return C;
    }
    return m.sort(function(b, w) {
      let C = p[b].i, x = p[w].i;
      return C !== x ? C - x : b < w ? -1 : 1;
    }), function(b, w) {
      return d(function(C) {
        return C.replace(yg, `
`).replace(Eg, "").replace(Dg, "    ");
      }(b), w);
    };
  }(c), f = (v = function(p) {
    return function(m, d, b) {
      return p[m.type].h(m, d, b);
    };
  }(c), function p(m, d = {}) {
    if (Array.isArray(m)) {
      const b = d.k, w = [];
      let C = !1;
      for (let x = 0; x < m.length; x++) {
        d.k = x;
        const E = p(m[x], d), y = typeof E == "string";
        y && C ? w[w.length - 1] += E : E !== null && w.push(E), C = y;
      }
      return d.k = b, w;
    }
    return v(m, p, d);
  });
  var v;
  const g = o(e);
  return a.length ? r("div", null, g, r("footer", { key: "footer" }, a.map(function(p) {
    return r("div", { id: t.slugify(p.j), key: p.j }, p.j, f(u(p.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ie || (ie = {}));
const db = (e) => {
  let { children: t, options: n } = e, r = function(o, i) {
    if (o == null)
      return {};
    var a, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      i.indexOf(a = u[l]) >= 0 || (c[a] = o[a]);
    return c;
  }(e, cg);
  return k.cloneElement(ub(t, n), r);
};
function cv({ markdown: e }) {
  return /* @__PURE__ */ h("div", { className: "pr-prose", children: /* @__PURE__ */ h(db, { children: e }) });
}
const pv = (e, t) => {
  mt(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Wr = () => !1, uv = (e, t) => {
  const [n] = ao(
    Oe(async () => {
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
  mt(() => () => {
    n !== Wr && n();
  }, [n]);
}, fb = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
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
fb.displayName = "Card";
const mb = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
    "div",
    {
      ref: n,
      className: W("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
mb.displayName = "CardHeader";
const hb = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
    "h3",
    {
      ref: n,
      className: W("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
hb.displayName = "CardTitle";
const gb = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("p", { ref: n, className: W("pr-text-sm pr-text-muted-foreground", e), ...t }));
gb.displayName = "CardDescription";
const bb = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { ref: n, className: W("pr-p-6 pr-pt-0", e), ...t })
);
bb.displayName = "CardContent";
const vb = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { ref: n, className: W("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
vb.displayName = "CardFooter";
const yb = po(
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
), wb = Q.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ h("div", { ref: r, role: "alert", className: W(yb({ variant: t }), e), ...n }));
wb.displayName = "Alert";
const xb = Q.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ F(
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
xb.displayName = "AlertTitle";
const Eb = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { ref: n, className: W("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
Eb.displayName = "AlertDescription";
const kb = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ F(
  fn.Root,
  {
    ref: n,
    className: W(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ h(fn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ h(fn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ h(fn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
kb.displayName = fn.Root.displayName;
const Tb = Q.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Xr.Root,
  {
    className: W(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ h(
      Xr.Thumb,
      {
        className: W(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Tb.displayName = Xr.Root.displayName;
function Nb(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Nb(`/*
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
.pr-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
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
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
`, "top");
export {
  wb as Alert,
  Eb as AlertDescription,
  xb as AlertTitle,
  Wb as BookChapterControl,
  ve as Button,
  fb as Card,
  bb as CardContent,
  gb as CardDescription,
  vb as CardFooter,
  mb as CardHeader,
  hb as CardTitle,
  Gb as ChapterRangeSelector,
  ov as CharacterInventory,
  Xc as Checkbox,
  qb as Checklist,
  ci as ComboBox,
  Yb as ContextMenu,
  Wc as DataTable,
  av as DownloadButton,
  Oa as DropdownMenu,
  Ca as DropdownMenuCheckboxItem,
  ho as DropdownMenuContent,
  Fb as DropdownMenuGroup,
  Sa as DropdownMenuItem,
  pr as DropdownMenuLabel,
  zb as DropdownMenuPortal,
  Hb as DropdownMenuRadioGroup,
  Nc as DropdownMenuRadioItem,
  go as DropdownMenuSeparator,
  Oc as DropdownMenuShortcut,
  Ub as DropdownMenuSub,
  Tc as DropdownMenuSubContent,
  kc as DropdownMenuSubTrigger,
  Ec as DropdownMenuTrigger,
  Qm as GridMenu,
  Xh as HamburgerMenuButton,
  Kb as IconButton,
  ur as Input,
  zt as LabelPosition,
  cv as MarkdownRenderer,
  Ns as MenuItem,
  sv as RemoveButton,
  iv as RepeatedWordsInventory,
  Jb as SearchBar,
  Gr as Select,
  er as SelectContent,
  Xb as SelectGroup,
  rt as SelectItem,
  Fc as SelectLabel,
  Ra as SelectScrollDownButton,
  Pa as SelectScrollUpButton,
  zc as SelectSeparator,
  Qn as SelectTrigger,
  qr as SelectValue,
  kb as ShadCnSlider,
  Tb as ShadCnSwitch,
  Zb as Slider,
  Qb as Snackbar,
  ev as Switch,
  bo as Table,
  yo as TableBody,
  Lc as TableCaption,
  En as TableCell,
  Bc as TableFooter,
  Zn as TableHead,
  vo as TableHeader,
  Ht as TableRow,
  nv as Tabs,
  Jh as TabsContent,
  Yh as TabsList,
  Kh as TabsTrigger,
  qh as TextField,
  tv as Toolbar,
  lv as UpdateButton,
  Zh as VerticalTabs,
  eg as VerticalTabsContent,
  Qh as VerticalTabsList,
  rv as VerticalTabsTrigger,
  Vc as buttonVariants,
  pv as useEvent,
  uv as useEventAsync,
  ao as usePromise
};
//# sourceMappingURL=index.js.map
