import Tl, { jsxs as F, jsx as h, Fragment as At } from "react/jsx-runtime";
import * as T from "react";
import J, { forwardRef as bi, useCallback as Oe, useState as ce, useRef as St, useEffect as Ve, useLayoutEffect as ia, useMemo as ur } from "react";
import { getChaptersForBook as Nl, compareScrRefs as Qr, scrRefToBBBCCCVVV as _r, formatScrRef as Ar, split as Ol } from "platform-bible-utils";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Cl } from "@radix-ui/react-dropdown-menu";
import { ChevronRight as Sl, Check as vi, Circle as Rl, History as Pl, ArrowDownWideNarrow as $l, Clock as Ml, Bookmark as Il, ChevronDown as yi, ChevronUp as _l, ArrowLeftIcon as Al, ChevronLeftIcon as Dl, ChevronRightIcon as Bl, ArrowRightIcon as jl, FilterIcon as Ll, CircleCheckIcon as sa, CircleXIcon as la, CircleHelpIcon as ca, ArrowUpIcon as Vl, ArrowDownIcon as Fl, ArrowUpDownIcon as zl, LoaderCircle as go, Download as Ul } from "lucide-react";
import Ce, { clsx as Hl } from "clsx";
import { extendTailwindMerge as Gl } from "tailwind-merge";
import { useReactTable as wi, getCoreRowModel as xi, getPaginationRowModel as Wl, getSortedRowModel as Ei, getFilteredRowModel as Xl, flexRender as yn, getExpandedRowModel as ql, getGroupedRowModel as Yl } from "@tanstack/react-table";
import { Slot as Kl } from "@radix-ui/react-slot";
import { cva as bo } from "class-variance-authority";
import * as we from "@radix-ui/react-select";
import { Autocomplete as Jl, TextField as Zl, FormControlLabel as pa, FormLabel as Ql, Checkbox as ec, MenuItem as tc, ListItemText as nc, ListItemIcon as ki, Menu as rc, Grid as Ti, List as oc, IconButton as Ni, Drawer as ac, Slider as ic, Snackbar as sc, Switch as lc, AppBar as cc, Toolbar as pc } from "@mui/material";
import uc, { ThemeContext as dc, internal_processStyles as fc } from "@mui/styled-engine";
import * as mc from "react-dom";
import Un from "react-dom";
import * as Oi from "@radix-ui/react-label";
import * as Ae from "@radix-ui/react-tabs";
import * as hn from "@radix-ui/react-slider";
import * as eo from "@radix-ui/react-switch";
var hc = Object.defineProperty, gc = (e, t, n) => t in e ? hc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => gc(e, typeof t != "symbol" ? t + "" : t, n);
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
], vo = [
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
], Ci = [
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
], ua = Oc();
function en(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ua ? ua[e] : 0;
}
function yo(e) {
  return en(e) > 0;
}
function bc(e) {
  const t = typeof e == "string" ? en(e) : e;
  return t >= 40 && t <= 66;
}
function vc(e) {
  return (typeof e == "string" ? en(e) : e) <= 39;
}
function Si(e) {
  return e <= 66;
}
function yc(e) {
  const t = typeof e == "string" ? en(e) : e;
  return $i(t) && !Si(t);
}
function* wc() {
  for (let e = 1; e <= Pt.length; e++)
    yield e;
}
const xc = 1, Ri = Pt.length;
function Ec() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function wo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Pt.length ? t : Pt[n];
}
function Pi(e) {
  return e <= 0 || e > Ri ? "******" : Ci[e - 1];
}
function kc(e) {
  return Pi(en(e));
}
function $i(e) {
  const t = typeof e == "number" ? wo(e) : e;
  return yo(t) && !vo.includes(t);
}
function Tc(e) {
  const t = typeof e == "number" ? wo(e) : e;
  return yo(t) && vo.includes(t);
}
function Nc(e) {
  return Ci[e - 1].includes("*obsolete*");
}
function Oc() {
  const e = {};
  for (let t = 0; t < Pt.length; t++)
    e[Pt[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Pt,
  nonCanonicalIds: vo,
  bookIdToNumber: en,
  isBookIdValid: yo,
  isBookNT: bc,
  isBookOT: vc,
  isBookOTNT: Si,
  isBookDC: yc,
  allBookNumbers: wc,
  firstBook: xc,
  lastBook: Ri,
  extraBooks: Ec,
  bookNumberToId: wo,
  bookNumberToEnglishName: Pi,
  bookIdToEnglishName: kc,
  isCanonical: $i,
  isExtraMaterial: Tc,
  isObsolete: Nc
};
var Ke = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ke || {});
const je = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Ke[t]) : (this._type = t, this.name = Ke[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(je, "Original", new je(Ke.Original)), oe(je, "Septuagint", new je(Ke.Septuagint)), oe(je, "Vulgate", new je(Ke.Vulgate)), oe(je, "English", new je(Ke.English)), oe(je, "RussianProtestant", new je(Ke.RussianProtestant)), oe(je, "RussianOrthodox", new je(Ke.RussianOrthodox));
let Et = je;
function da(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Mi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Mi || {});
const Me = class le {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = n != null && n instanceof Et ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = n != null && n instanceof Et ? n : void 0;
        this.setEmpty(a), this._verseNum = t % le.chapterDigitShifter, this._chapterNum = Math.floor(
          t % le.bookDigitShifter / le.chapterDigitShifter
        ), this._bookNum = Math.floor(t / le.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof le) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof Et ? t : le.defaultVersification;
          this.setEmpty(a);
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
      if (r instanceof ln)
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
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = t, l = a || o.toString();
    let c;
    return i && (c = new Et(i)), n ? new le(n, r.toString(), l, c) : new le();
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
      throw new ln(
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
    this.versification = this.versification != null ? new Et(t) : void 0;
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
      const a = t.split("/");
      if (t = a[0], a.length > 1)
        try {
          const i = +a[1].trim();
          this.versification = new Et(Ke[i]);
        } catch {
          throw new ln("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new ln("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(r[1]))
      throw new ln("Invalid reference : " + t);
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
    const o = [], a = da(this._verse, r);
    for (const i of a.map((l) => da(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const u = this.clone();
        if (u.verse = i[1], !t)
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
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const i = o.BBBCCCVVV;
      if (r > i)
        return 3;
      if (r === i)
        return 4;
      r = i;
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
oe(Me, "defaultVersification", Et.English), oe(Me, "verseRangeSeparator", "-"), oe(Me, "verseSequenceIndicator", ","), oe(Me, "verseRangeSeparators", [Me.verseRangeSeparator]), oe(Me, "verseSequenceIndicators", [Me.verseSequenceIndicator]), oe(Me, "chapterDigitShifter", 1e3), oe(Me, "bookDigitShifter", Me.chapterDigitShifter * Me.chapterDigitShifter), oe(Me, "bcvMaxValue", Me.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Me, "ValidStatusType", Mi);
let ln = class extends Error {
};
const Cc = Gl({ prefix: "pr-" });
function H(...e) {
  return Cc(Hl(e));
}
const Ii = ge.Root, Sc = ge.Trigger, Kb = ge.Group, Jb = ge.Portal, Zb = ge.Sub, Qb = ge.RadioGroup, Rc = J.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ F(
  ge.SubTrigger,
  {
    ref: o,
    className: H(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ h(Sl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Rc.displayName = ge.SubTrigger.displayName;
const Pc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  ge.SubContent,
  {
    ref: n,
    className: H(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Pc.displayName = ge.SubContent.displayName;
const xo = J.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ h(ge.Portal, { children: /* @__PURE__ */ h(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: H(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
xo.displayName = ge.Content.displayName;
const _i = J.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ h(
  ge.Item,
  {
    ref: r,
    className: H(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
_i.displayName = ge.Item.displayName;
const Ai = J.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ F(
  ge.CheckboxItem,
  {
    ref: o,
    className: H(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ h("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ h(ge.ItemIndicator, { children: /* @__PURE__ */ h(vi, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Ai.displayName = ge.CheckboxItem.displayName;
const $c = J.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ F(
  ge.RadioItem,
  {
    ref: r,
    className: H(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ h("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ h(ge.ItemIndicator, { children: /* @__PURE__ */ h(Rl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
$c.displayName = ge.RadioItem.displayName;
const dr = J.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ h(
  ge.Label,
  {
    ref: r,
    className: H("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
dr.displayName = ge.Label.displayName;
const Eo = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  ge.Separator,
  {
    ref: n,
    className: H("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Eo.displayName = ge.Separator.displayName;
function Mc({ className: e, ...t }) {
  return /* @__PURE__ */ h(
    "span",
    {
      className: H("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Mc.displayName = "DropdownMenuShortcut";
const fr = J.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ h(
    "input",
    {
      type: t,
      className: H(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
fr.displayName = "Input";
const Ic = bi(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ F("div", { className: "pr-relative", children: [
    /* @__PURE__ */ h(
      fr,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && r(), t(i);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ h(
      Pl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
function _c({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), i = Oe(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ h("div", { className: H("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ h(
    "div",
    {
      className: H(
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
      onMouseMove: () => i(l),
      children: l
    },
    l
  )) });
}
const Ac = bi(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ F(
    _i,
    {
      ref: l,
      textValue: e,
      className: H("pr-font-normal pr-text-slate-700", {
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
            className: H(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: me.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ h("div", { children: i })
      ]
    },
    e
  )
);
function Dc({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ F(dr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ h("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ h(
        $l,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ h(
        Ml,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ h(
        Il,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const wn = me.allBookIds, Bc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, fa = ["OT", "NT", "DC"], jc = 32 + 32 + 32, Lc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Vc = (e) => ({
  OT: wn.filter((n) => me.isBookOT(n)),
  NT: wn.filter((n) => me.isBookNT(n)),
  DC: wn.filter((n) => me.isBookDC(n))
})[e], cn = (e) => Nl(me.bookIdToNumber(e));
function Fc() {
  return wn.map((t) => me.bookIdToEnglishName(t));
}
function zc(e) {
  return Fc().includes(e);
}
function Uc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (zc(t))
    return wn.find((r) => me.bookIdToEnglishName(r) === t);
}
function ev({ scrRef: e, handleSubmit: t }) {
  const [n, r] = ce(""), [o, a] = ce(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = ce(e.chapterNum ?? 0), [c, u] = ce(
    me.bookNumberToId(e.bookNum)
  ), [f, v] = ce(!1), [b, p] = ce(f), m = St(void 0), d = St(void 0), g = St(void 0), x = Oe(
    (k) => Vc(k).filter((O) => {
      const $ = me.bookIdToEnglishName(O).toLowerCase(), L = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(L) || // Match book name
      O.toLowerCase().includes(L);
    }),
    [n]
  ), P = (k) => {
    r(k);
  }, w = St(!1), E = Oe((k) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    v(k);
  }, []), y = Oe(
    (k, O, $, L) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), O || cn(k) === -1) {
        t({
          bookNum: me.bookIdToNumber(k),
          chapterNum: $ || 1,
          verseNum: L || 1
        }), v(!1), r("");
        return;
      }
      a(o !== k ? k : ""), v(!O);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), C = (k) => {
    k <= 0 || k > cn(o) || y(o, !0, k);
  }, N = Oe(() => {
    Lc.forEach((k) => {
      const O = n.match(k);
      if (O) {
        const [$, L = void 0, U = void 0] = O.slice(1), M = Uc($);
        (me.isBookIdValid($) || M) && y(
          M ?? $,
          !0,
          L ? parseInt(L, 10) : 1,
          U ? parseInt(U, 10) : 1
        );
      }
    });
  }, [y, n]), _ = Oe(
    (k) => {
      f ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null ? g.current.focus() : typeof d < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      d.current !== null && d.current.focus(), k.preventDefault()) : v(!0);
    },
    [f]
  ), D = (k) => {
    const { key: O } = k;
    O === "ArrowRight" || O === "ArrowLeft" || O === "ArrowDown" || O === "ArrowUp" || O === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: O })), m.current.focus());
  }, j = (k) => {
    const { key: O } = k;
    if (c === o) {
      if (O === "Enter") {
        k.preventDefault(), y(o, !0, i);
        return;
      }
      let $ = 0;
      if (O === "ArrowRight")
        if (i < cn(c))
          $ = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (O === "ArrowLeft")
        if (i > 1)
          $ = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        O === "ArrowDown" ? $ = 6 : O === "ArrowUp" && ($ = -6);
      i + $ <= 0 || i + $ > cn(c) ? l(0) : $ !== 0 && (l(i + $), k.preventDefault());
    }
  };
  return Ve(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), ia(() => {
    p(f);
  }, [f]), ia(() => {
    const k = setTimeout(() => {
      if (b && d.current && g.current) {
        const $ = g.current.offsetTop - jc;
        d.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [b]), /* @__PURE__ */ h("div", { className: "pr-flex", children: /* @__PURE__ */ F(Ii, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ h(Sc, { asChild: !0, children: /* @__PURE__ */ h(
      Ic,
      {
        ref: m,
        value: n,
        handleSearch: P,
        handleKeyDown: _,
        handleOnClick: () => {
          a(me.bookNumberToId(e.bookNum)), u(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), m.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: N,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ F(
      xo,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: d,
        children: [
          /* @__PURE__ */ h(
            Dc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          fa.map(
            (k, O) => x(k).length > 0 && /* @__PURE__ */ F("div", { children: [
              /* @__PURE__ */ h(dr, { className: "pr-font-semibold pr-text-slate-700", children: Bc[k] }),
              x(k).map(($) => /* @__PURE__ */ h("div", { children: /* @__PURE__ */ h(
                Ac,
                {
                  bookId: $,
                  handleSelectBook: () => y($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => u($),
                  handleKeyDown: j,
                  bookType: k,
                  ref: (L) => {
                    o === $ && (g.current = L);
                  },
                  children: /* @__PURE__ */ h(
                    _c,
                    {
                      handleSelectChapter: C,
                      endChapter: cn($),
                      activeChapter: e.bookNum === me.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (L) => {
                        l(L);
                      }
                    }
                  )
                }
              ) }, $)),
              fa.length - 1 !== O ? /* @__PURE__ */ h(Eo, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const mr = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ h(
    "table",
    {
      ref: n,
      className: H("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
mr.displayName = "Table";
const hr = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("thead", { ref: n, className: H("[&_tr]:pr-border-b", e), ...t }));
hr.displayName = "TableHeader";
const gr = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("tbody", { ref: n, className: H("[&_tr:last-child]:pr-border-0", e), ...t }));
gr.displayName = "TableBody";
const Hc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "tfoot",
  {
    ref: n,
    className: H("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Hc.displayName = "TableFooter";
const gt = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
    "tr",
    {
      ref: n,
      className: H(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
gt.displayName = "TableRow";
const Nn = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "th",
  {
    ref: n,
    className: H(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Nn.displayName = "TableHead";
const Xt = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "td",
  {
    ref: n,
    className: H("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Xt.displayName = "TableCell";
const Gc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  "caption",
  {
    ref: n,
    className: H("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Gc.displayName = "TableCaption";
const Wc = bo(
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
), ke = J.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ h(r ? Kl : "button", { className: H(Wc({ variant: t, size: n, className: e })), ref: a, ...o })
);
ke.displayName = "Button";
const tr = we.Root, Xc = we.Group, nr = we.Value, On = J.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ F(
  we.Trigger,
  {
    ref: r,
    className: H(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ h(we.Icon, { asChild: !0, children: /* @__PURE__ */ h(yi, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
On.displayName = we.Trigger.displayName;
const Di = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  we.ScrollUpButton,
  {
    ref: n,
    className: H("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ h(_l, { className: "pr-h-4 pr-w-4" })
  }
));
Di.displayName = we.ScrollUpButton.displayName;
const Bi = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  we.ScrollDownButton,
  {
    ref: n,
    className: H("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ h(yi, { className: "pr-h-4 pr-w-4" })
  }
));
Bi.displayName = we.ScrollDownButton.displayName;
const Cn = J.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ h(we.Portal, { children: /* @__PURE__ */ F(
  we.Content,
  {
    ref: o,
    className: H(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ h(Di, {}),
      /* @__PURE__ */ h(
        we.Viewport,
        {
          className: H(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ h(Bi, {})
    ]
  }
) }));
Cn.displayName = we.Content.displayName;
const qc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  we.Label,
  {
    ref: n,
    className: H("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
qc.displayName = we.Label.displayName;
const Ye = J.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ F(
  we.Item,
  {
    ref: r,
    className: H(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ h("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ h(we.ItemIndicator, { children: /* @__PURE__ */ h(vi, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ h(we.ItemText, { children: t })
    ]
  }
));
Ye.displayName = we.Item.displayName;
const Yc = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  we.Separator,
  {
    ref: n,
    className: H("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Yc.displayName = we.Separator.displayName;
function Kc({ table: e }) {
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
        tr,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ h(On, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ h(nr, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ h(Cn, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ h(Ye, { value: `${t}`, children: t }, t)) })
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
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ h(Al, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ F(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ h(Dl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ F(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ h(Bl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ F(
        ke,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ h("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ h(jl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
function Jc({ table: e }) {
  return /* @__PURE__ */ F(Ii, { children: [
    /* @__PURE__ */ h(Cl, { asChild: !0, children: /* @__PURE__ */ F(ke, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ h(Ll, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ F(xo, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ h(dr, { children: "Toggle columns" }),
      /* @__PURE__ */ h(Eo, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ h(
        Ai,
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
function Zc({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: a = () => {
  }
}) {
  var d;
  const [i, l] = ce([]), [c, u] = ce([]), [f, v] = ce({}), [b, p] = ce({}), m = wi({
    data: t,
    columns: e,
    getCoreRowModel: xi(),
    ...n && { getPaginationRowModel: Wl() },
    onSortingChange: l,
    getSortedRowModel: Ei(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Xl(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: p,
    state: {
      sorting: i,
      columnFilters: c,
      columnVisibility: f,
      rowSelection: b
    }
  });
  return /* @__PURE__ */ F("div", { children: [
    o && /* @__PURE__ */ h(Jc, { table: m }),
    /* @__PURE__ */ h("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ F(mr, { children: [
      /* @__PURE__ */ h(hr, { children: m.getHeaderGroups().map((g) => /* @__PURE__ */ h(gt, { children: g.headers.map((x) => /* @__PURE__ */ h(Nn, { children: x.isPlaceholder ? void 0 : yn(x.column.columnDef.header, x.getContext()) }, x.id)) }, g.id)) }),
      /* @__PURE__ */ h(gr, { children: (d = m.getRowModel().rows) != null && d.length ? m.getRowModel().rows.map((g) => /* @__PURE__ */ h(
        gt,
        {
          onClick: () => a(g, m),
          "data-state": g.getIsSelected() && "selected",
          children: g.getVisibleCells().map((x) => /* @__PURE__ */ h(Xt, { children: yn(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        g.id
      )) : /* @__PURE__ */ h(gt, { children: /* @__PURE__ */ h(Xt, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ F("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ h(
        ke,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.previousPage(),
          disabled: !m.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ h(
        ke,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.nextPage(),
          disabled: !m.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ h(Kc, { table: m })
  ] });
}
function ma({
  id: e,
  title: t,
  isDisabled: n = !1,
  isClearable: r = !0,
  hasError: o = !1,
  isFullWidth: a = !1,
  width: i,
  options: l = [],
  className: c,
  value: u,
  onChange: f,
  onFocus: v,
  onBlur: b,
  getOptionLabel: p
}) {
  return /* @__PURE__ */ h(
    Jl,
    {
      id: e,
      disablePortal: !0,
      disabled: n,
      disableClearable: !r,
      fullWidth: a,
      options: l,
      className: `papi-combo-box ${o ? "error" : ""} ${c ?? ""}`,
      value: u,
      onChange: f,
      onFocus: v,
      onBlur: b,
      getOptionLabel: p,
      renderInput: (m) => /* @__PURE__ */ h(
        Zl,
        {
          ...m,
          error: o,
          fullWidth: a,
          disabled: n,
          label: t,
          style: { width: i }
        }
      )
    }
  );
}
function tv({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, a] = ce(1), [i, l] = ce(r), [c, u] = ce(
    Array.from({ length: r }, (b, p) => p + 1)
  );
  Ve(() => {
    a(1), e(1), l(r), t(r), u(Array.from({ length: r }, (b, p) => p + 1));
  }, [r, t, e]);
  const f = (b, p) => {
    a(p), e(p), p > i && (l(p), t(p));
  }, v = (b, p) => {
    l(p), t(p), p < o && (a(p), e(p));
  };
  return /* @__PURE__ */ F(At, { children: [
    /* @__PURE__ */ h(
      pa,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
        control: /* @__PURE__ */ h(
          ma,
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
    /* @__PURE__ */ h(
      pa,
      {
        className: "book-selection-chapter-form-label end",
        disabled: n,
        control: /* @__PURE__ */ h(
          ma,
          {
            onChange: (b, p) => v(b, p),
            className: "book-selection-chapter",
            isClearable: !1,
            options: c,
            getOptionLabel: (b) => b.toString(),
            value: i,
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
var Ht = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Ht || {});
function Qc({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Ht.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const f = /* @__PURE__ */ h(
    ec,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: a,
      disabled: i,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: u
    }
  );
  let v;
  if (n) {
    const b = r === Ht.Before || r === Ht.Above, p = /* @__PURE__ */ h("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), m = r === Ht.Before || r === Ht.After, d = m ? p : /* @__PURE__ */ h("div", { children: p }), g = m ? f : /* @__PURE__ */ h("div", { children: f });
    v = /* @__PURE__ */ F(
      Ql,
      {
        className: `papi-checkbox ${r.toString()}`,
        disabled: i,
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
function nv({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ F("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ h("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ h(
      Qc,
      {
        className: "check-item",
        isChecked: o.includes(l),
        labelText: i ? i(l) : l,
        onChange: () => a(l)
      },
      l
    ))
  ] });
}
function he(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
function R() {
  return R = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, R.apply(this, arguments);
}
function ep(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function tp(e) {
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
var to = { exports: {} }, Hn = { exports: {} }, pe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ha;
function np() {
  if (ha)
    return pe;
  ha = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
  function w(y) {
    if (typeof y == "object" && y !== null) {
      var C = y.$$typeof;
      switch (C) {
        case t:
          switch (y = y.type, y) {
            case c:
            case u:
            case r:
            case a:
            case o:
            case v:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case l:
                case f:
                case m:
                case p:
                case i:
                  return y;
                default:
                  return C;
              }
          }
        case n:
          return C;
      }
    }
  }
  function E(y) {
    return w(y) === u;
  }
  return pe.AsyncMode = c, pe.ConcurrentMode = u, pe.ContextConsumer = l, pe.ContextProvider = i, pe.Element = t, pe.ForwardRef = f, pe.Fragment = r, pe.Lazy = m, pe.Memo = p, pe.Portal = n, pe.Profiler = a, pe.StrictMode = o, pe.Suspense = v, pe.isAsyncMode = function(y) {
    return E(y) || w(y) === c;
  }, pe.isConcurrentMode = E, pe.isContextConsumer = function(y) {
    return w(y) === l;
  }, pe.isContextProvider = function(y) {
    return w(y) === i;
  }, pe.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, pe.isForwardRef = function(y) {
    return w(y) === f;
  }, pe.isFragment = function(y) {
    return w(y) === r;
  }, pe.isLazy = function(y) {
    return w(y) === m;
  }, pe.isMemo = function(y) {
    return w(y) === p;
  }, pe.isPortal = function(y) {
    return w(y) === n;
  }, pe.isProfiler = function(y) {
    return w(y) === a;
  }, pe.isStrictMode = function(y) {
    return w(y) === o;
  }, pe.isSuspense = function(y) {
    return w(y) === v;
  }, pe.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === r || y === u || y === a || y === o || y === v || y === b || typeof y == "object" && y !== null && (y.$$typeof === m || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === f || y.$$typeof === g || y.$$typeof === x || y.$$typeof === P || y.$$typeof === d);
  }, pe.typeOf = w, pe;
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
var ga;
function rp() {
  return ga || (ga = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
    function w(B) {
      return typeof B == "string" || typeof B == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      B === r || B === u || B === a || B === o || B === v || B === b || typeof B == "object" && B !== null && (B.$$typeof === m || B.$$typeof === p || B.$$typeof === i || B.$$typeof === l || B.$$typeof === f || B.$$typeof === g || B.$$typeof === x || B.$$typeof === P || B.$$typeof === d);
    }
    function E(B) {
      if (typeof B == "object" && B !== null) {
        var ne = B.$$typeof;
        switch (ne) {
          case t:
            var A = B.type;
            switch (A) {
              case c:
              case u:
              case r:
              case a:
              case o:
              case v:
                return A;
              default:
                var se = A && A.$$typeof;
                switch (se) {
                  case l:
                  case f:
                  case m:
                  case p:
                  case i:
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
    var y = c, C = u, N = l, _ = i, D = t, j = f, k = r, O = m, $ = p, L = n, U = a, M = o, V = v, te = !1;
    function Q(B) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), S(B) || E(B) === c;
    }
    function S(B) {
      return E(B) === u;
    }
    function I(B) {
      return E(B) === l;
    }
    function z(B) {
      return E(B) === i;
    }
    function q(B) {
      return typeof B == "object" && B !== null && B.$$typeof === t;
    }
    function G(B) {
      return E(B) === f;
    }
    function W(B) {
      return E(B) === r;
    }
    function Y(B) {
      return E(B) === m;
    }
    function K(B) {
      return E(B) === p;
    }
    function X(B) {
      return E(B) === n;
    }
    function Z(B) {
      return E(B) === a;
    }
    function ee(B) {
      return E(B) === o;
    }
    function ie(B) {
      return E(B) === v;
    }
    ue.AsyncMode = y, ue.ConcurrentMode = C, ue.ContextConsumer = N, ue.ContextProvider = _, ue.Element = D, ue.ForwardRef = j, ue.Fragment = k, ue.Lazy = O, ue.Memo = $, ue.Portal = L, ue.Profiler = U, ue.StrictMode = M, ue.Suspense = V, ue.isAsyncMode = Q, ue.isConcurrentMode = S, ue.isContextConsumer = I, ue.isContextProvider = z, ue.isElement = q, ue.isForwardRef = G, ue.isFragment = W, ue.isLazy = Y, ue.isMemo = K, ue.isPortal = X, ue.isProfiler = Z, ue.isStrictMode = ee, ue.isSuspense = ie, ue.isValidElementType = w, ue.typeOf = E;
  }()), ue;
}
var ba;
function ji() {
  return ba || (ba = 1, process.env.NODE_ENV === "production" ? Hn.exports = np() : Hn.exports = rp()), Hn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Dr, va;
function op() {
  if (va)
    return Dr;
  va = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
  function r(a) {
    if (a == null)
      throw new TypeError("Object.assign cannot be called with null or undefined");
    return Object(a);
  }
  function o() {
    try {
      if (!Object.assign)
        return !1;
      var a = new String("abc");
      if (a[5] = "de", Object.getOwnPropertyNames(a)[0] === "5")
        return !1;
      for (var i = {}, l = 0; l < 10; l++)
        i["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(i).map(function(f) {
        return i[f];
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
  return Dr = o() ? Object.assign : function(a, i) {
    for (var l, c = r(a), u, f = 1; f < arguments.length; f++) {
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
  }, Dr;
}
var Br, ya;
function ko() {
  if (ya)
    return Br;
  ya = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Br = e, Br;
}
var jr, wa;
function Li() {
  return wa || (wa = 1, jr = Function.call.bind(Object.prototype.hasOwnProperty)), jr;
}
var Lr, xa;
function ap() {
  if (xa)
    return Lr;
  xa = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = ko(), n = {}, r = Li();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in a)
        if (r(a, f)) {
          var v;
          try {
            if (typeof a[f] != "function") {
              var b = Error(
                (c || "React class") + ": " + l + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            v = a[f](i, f, c, l, null, t);
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
  }, Lr = o, Lr;
}
var Vr, Ea;
function ip() {
  if (Ea)
    return Vr;
  Ea = 1;
  var e = ji(), t = op(), n = ko(), r = Li(), o = ap(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
    var c = "Warning: " + l;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return Vr = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(S) {
      var I = S && (u && S[u] || S[f]);
      if (typeof I == "function")
        return I;
    }
    var b = "<<anonymous>>", p = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: P(),
      arrayOf: w,
      element: E(),
      elementType: y(),
      instanceOf: C,
      node: j(),
      objectOf: _,
      oneOf: N,
      oneOfType: D,
      shape: O,
      exact: $
    };
    function m(S, I) {
      return S === I ? S !== 0 || 1 / S === 1 / I : S !== S && I !== I;
    }
    function d(S, I) {
      this.message = S, this.data = I && typeof I == "object" ? I : {}, this.stack = "";
    }
    d.prototype = Error.prototype;
    function g(S) {
      if (process.env.NODE_ENV !== "production")
        var I = {}, z = 0;
      function q(W, Y, K, X, Z, ee, ie) {
        if (X = X || b, ee = ee || K, ie !== n) {
          if (c) {
            var B = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw B.name = "Invariant Violation", B;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ne = X + ":" + K;
            !I[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            z < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + X + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), I[ne] = !0, z++);
          }
        }
        return Y[K] == null ? W ? Y[K] === null ? new d("The " + Z + " `" + ee + "` is marked as required " + ("in `" + X + "`, but its value is `null`.")) : new d("The " + Z + " `" + ee + "` is marked as required in " + ("`" + X + "`, but its value is `undefined`.")) : null : S(Y, K, X, Z, ee);
      }
      var G = q.bind(null, !1);
      return G.isRequired = q.bind(null, !0), G;
    }
    function x(S) {
      function I(z, q, G, W, Y, K) {
        var X = z[q], Z = M(X);
        if (Z !== S) {
          var ee = V(X);
          return new d(
            "Invalid " + W + " `" + Y + "` of type " + ("`" + ee + "` supplied to `" + G + "`, expected ") + ("`" + S + "`."),
            { expectedType: S }
          );
        }
        return null;
      }
      return g(I);
    }
    function P() {
      return g(i);
    }
    function w(S) {
      function I(z, q, G, W, Y) {
        if (typeof S != "function")
          return new d("Property `" + Y + "` of component `" + G + "` has invalid PropType notation inside arrayOf.");
        var K = z[q];
        if (!Array.isArray(K)) {
          var X = M(K);
          return new d("Invalid " + W + " `" + Y + "` of type " + ("`" + X + "` supplied to `" + G + "`, expected an array."));
        }
        for (var Z = 0; Z < K.length; Z++) {
          var ee = S(K, Z, G, W, Y + "[" + Z + "]", n);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return g(I);
    }
    function E() {
      function S(I, z, q, G, W) {
        var Y = I[z];
        if (!l(Y)) {
          var K = M(Y);
          return new d("Invalid " + G + " `" + W + "` of type " + ("`" + K + "` supplied to `" + q + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(S);
    }
    function y() {
      function S(I, z, q, G, W) {
        var Y = I[z];
        if (!e.isValidElementType(Y)) {
          var K = M(Y);
          return new d("Invalid " + G + " `" + W + "` of type " + ("`" + K + "` supplied to `" + q + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(S);
    }
    function C(S) {
      function I(z, q, G, W, Y) {
        if (!(z[q] instanceof S)) {
          var K = S.name || b, X = Q(z[q]);
          return new d("Invalid " + W + " `" + Y + "` of type " + ("`" + X + "` supplied to `" + G + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return g(I);
    }
    function N(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function I(z, q, G, W, Y) {
        for (var K = z[q], X = 0; X < S.length; X++)
          if (m(K, S[X]))
            return null;
        var Z = JSON.stringify(S, function(ie, B) {
          var ne = V(B);
          return ne === "symbol" ? String(B) : B;
        });
        return new d("Invalid " + W + " `" + Y + "` of value `" + String(K) + "` " + ("supplied to `" + G + "`, expected one of " + Z + "."));
      }
      return g(I);
    }
    function _(S) {
      function I(z, q, G, W, Y) {
        if (typeof S != "function")
          return new d("Property `" + Y + "` of component `" + G + "` has invalid PropType notation inside objectOf.");
        var K = z[q], X = M(K);
        if (X !== "object")
          return new d("Invalid " + W + " `" + Y + "` of type " + ("`" + X + "` supplied to `" + G + "`, expected an object."));
        for (var Z in K)
          if (r(K, Z)) {
            var ee = S(K, Z, G, W, Y + "." + Z, n);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return g(I);
    }
    function D(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var I = 0; I < S.length; I++) {
        var z = S[I];
        if (typeof z != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(z) + " at index " + I + "."
          ), i;
      }
      function q(G, W, Y, K, X) {
        for (var Z = [], ee = 0; ee < S.length; ee++) {
          var ie = S[ee], B = ie(G, W, Y, K, X, n);
          if (B == null)
            return null;
          B.data && r(B.data, "expectedType") && Z.push(B.data.expectedType);
        }
        var ne = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new d("Invalid " + K + " `" + X + "` supplied to " + ("`" + Y + "`" + ne + "."));
      }
      return g(q);
    }
    function j() {
      function S(I, z, q, G, W) {
        return L(I[z]) ? null : new d("Invalid " + G + " `" + W + "` supplied to " + ("`" + q + "`, expected a ReactNode."));
      }
      return g(S);
    }
    function k(S, I, z, q, G) {
      return new d(
        (S || "React class") + ": " + I + " type `" + z + "." + q + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + G + "`."
      );
    }
    function O(S) {
      function I(z, q, G, W, Y) {
        var K = z[q], X = M(K);
        if (X !== "object")
          return new d("Invalid " + W + " `" + Y + "` of type `" + X + "` " + ("supplied to `" + G + "`, expected `object`."));
        for (var Z in S) {
          var ee = S[Z];
          if (typeof ee != "function")
            return k(G, W, Y, Z, V(ee));
          var ie = ee(K, Z, G, W, Y + "." + Z, n);
          if (ie)
            return ie;
        }
        return null;
      }
      return g(I);
    }
    function $(S) {
      function I(z, q, G, W, Y) {
        var K = z[q], X = M(K);
        if (X !== "object")
          return new d("Invalid " + W + " `" + Y + "` of type `" + X + "` " + ("supplied to `" + G + "`, expected `object`."));
        var Z = t({}, z[q], S);
        for (var ee in Z) {
          var ie = S[ee];
          if (r(S, ee) && typeof ie != "function")
            return k(G, W, Y, ee, V(ie));
          if (!ie)
            return new d(
              "Invalid " + W + " `" + Y + "` key `" + ee + "` supplied to `" + G + "`.\nBad object: " + JSON.stringify(z[q], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(S), null, "  ")
            );
          var B = ie(K, ee, G, W, Y + "." + ee, n);
          if (B)
            return B;
        }
        return null;
      }
      return g(I);
    }
    function L(S) {
      switch (typeof S) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !S;
        case "object":
          if (Array.isArray(S))
            return S.every(L);
          if (S === null || l(S))
            return !0;
          var I = v(S);
          if (I) {
            var z = I.call(S), q;
            if (I !== S.entries) {
              for (; !(q = z.next()).done; )
                if (!L(q.value))
                  return !1;
            } else
              for (; !(q = z.next()).done; ) {
                var G = q.value;
                if (G && !L(G[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function U(S, I) {
      return S === "symbol" ? !0 : I ? I["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && I instanceof Symbol : !1;
    }
    function M(S) {
      var I = typeof S;
      return Array.isArray(S) ? "array" : S instanceof RegExp ? "object" : U(I, S) ? "symbol" : I;
    }
    function V(S) {
      if (typeof S > "u" || S === null)
        return "" + S;
      var I = M(S);
      if (I === "object") {
        if (S instanceof Date)
          return "date";
        if (S instanceof RegExp)
          return "regexp";
      }
      return I;
    }
    function te(S) {
      var I = V(S);
      switch (I) {
        case "array":
        case "object":
          return "an " + I;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + I;
        default:
          return I;
      }
    }
    function Q(S) {
      return !S.constructor || !S.constructor.name ? b : S.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Vr;
}
var Fr, ka;
function sp() {
  if (ka)
    return Fr;
  ka = 1;
  var e = ko();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Fr = function() {
    function r(i, l, c, u, f, v) {
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
    var a = {
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
    return a.PropTypes = a, a;
  }, Fr;
}
if (process.env.NODE_ENV !== "production") {
  var lp = ji(), cp = !0;
  to.exports = ip()(lp.isElement, cp);
} else
  to.exports = sp()();
var pp = to.exports;
const s = /* @__PURE__ */ ep(pp);
function tn(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function Ot(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Vi(e) {
  if (!Ot(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Vi(e[n]);
  }), t;
}
function at(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? R({}, e) : e;
  return Ot(e) && Ot(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Ot(t[o]) && o in e && Ot(e[o]) ? r[o] = at(e[o], t[o], n) : n.clone ? r[o] = Ot(t[o]) ? Vi(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
function up(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Fi(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !up(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const zi = tn(s.element, Fi);
zi.isRequired = tn(s.element.isRequired, Fi);
const In = zi;
function dp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function fp(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !dp(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const mp = tn(s.elementType, fp), hp = "exact-prop: ​";
function Ui(e) {
  return process.env.NODE_ENV === "production" ? e : R({}, e, {
    [hp]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function qt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var no = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ta;
function gp() {
  if (Ta)
    return de;
  Ta = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function d(g) {
    if (typeof g == "object" && g !== null) {
      var x = g.$$typeof;
      switch (x) {
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
                case i:
                case c:
                case b:
                case v:
                case a:
                  return g;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return de.ContextConsumer = i, de.ContextProvider = a, de.Element = e, de.ForwardRef = c, de.Fragment = n, de.Lazy = b, de.Memo = v, de.Portal = t, de.Profiler = o, de.StrictMode = r, de.Suspense = u, de.SuspenseList = f, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(g) {
    return d(g) === i;
  }, de.isContextProvider = function(g) {
    return d(g) === a;
  }, de.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, de.isForwardRef = function(g) {
    return d(g) === c;
  }, de.isFragment = function(g) {
    return d(g) === n;
  }, de.isLazy = function(g) {
    return d(g) === b;
  }, de.isMemo = function(g) {
    return d(g) === v;
  }, de.isPortal = function(g) {
    return d(g) === t;
  }, de.isProfiler = function(g) {
    return d(g) === o;
  }, de.isStrictMode = function(g) {
    return d(g) === r;
  }, de.isSuspense = function(g) {
    return d(g) === u;
  }, de.isSuspenseList = function(g) {
    return d(g) === f;
  }, de.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === n || g === o || g === r || g === u || g === f || g === p || typeof g == "object" && g !== null && (g.$$typeof === b || g.$$typeof === v || g.$$typeof === a || g.$$typeof === i || g.$$typeof === c || g.$$typeof === m || g.getModuleId !== void 0);
  }, de.typeOf = d, de;
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
var Na;
function bp() {
  return Na || (Na = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), m = !1, d = !1, g = !1, x = !1, P = !1, w;
    w = Symbol.for("react.module.reference");
    function E(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === n || A === o || P || A === r || A === u || A === f || x || A === p || m || d || g || typeof A == "object" && A !== null && (A.$$typeof === b || A.$$typeof === v || A.$$typeof === a || A.$$typeof === i || A.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      A.$$typeof === w || A.getModuleId !== void 0));
    }
    function y(A) {
      if (typeof A == "object" && A !== null) {
        var se = A.$$typeof;
        switch (se) {
          case e:
            var Te = A.type;
            switch (Te) {
              case n:
              case o:
              case r:
              case u:
              case f:
                return Te;
              default:
                var Pe = Te && Te.$$typeof;
                switch (Pe) {
                  case l:
                  case i:
                  case c:
                  case b:
                  case v:
                  case a:
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
    var C = i, N = a, _ = e, D = c, j = n, k = b, O = v, $ = t, L = o, U = r, M = u, V = f, te = !1, Q = !1;
    function S(A) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function I(A) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function z(A) {
      return y(A) === i;
    }
    function q(A) {
      return y(A) === a;
    }
    function G(A) {
      return typeof A == "object" && A !== null && A.$$typeof === e;
    }
    function W(A) {
      return y(A) === c;
    }
    function Y(A) {
      return y(A) === n;
    }
    function K(A) {
      return y(A) === b;
    }
    function X(A) {
      return y(A) === v;
    }
    function Z(A) {
      return y(A) === t;
    }
    function ee(A) {
      return y(A) === o;
    }
    function ie(A) {
      return y(A) === r;
    }
    function B(A) {
      return y(A) === u;
    }
    function ne(A) {
      return y(A) === f;
    }
    fe.ContextConsumer = C, fe.ContextProvider = N, fe.Element = _, fe.ForwardRef = D, fe.Fragment = j, fe.Lazy = k, fe.Memo = O, fe.Portal = $, fe.Profiler = L, fe.StrictMode = U, fe.Suspense = M, fe.SuspenseList = V, fe.isAsyncMode = S, fe.isConcurrentMode = I, fe.isContextConsumer = z, fe.isContextProvider = q, fe.isElement = G, fe.isForwardRef = W, fe.isFragment = Y, fe.isLazy = K, fe.isMemo = X, fe.isPortal = Z, fe.isProfiler = ee, fe.isStrictMode = ie, fe.isSuspense = B, fe.isSuspenseList = ne, fe.isValidElementType = E, fe.typeOf = y;
  }()), fe;
}
process.env.NODE_ENV === "production" ? no.exports = gp() : no.exports = bp();
var rr = no.exports;
const vp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function yp(e) {
  const t = `${e}`.match(vp);
  return t && t[1] || "";
}
function Hi(e, t = "") {
  return e.displayName || e.name || yp(e) || t;
}
function Oa(e, t, n) {
  const r = Hi(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function wp(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Hi(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case rr.ForwardRef:
          return Oa(e, e.render, "ForwardRef");
        case rr.Memo:
          return Oa(e, e.type, "memo");
        default:
          return;
      }
  }
}
function it(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const xp = s.oneOfType([s.func, s.object]), To = xp;
function Ze(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : qt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ro(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Gi(e, t = 166) {
  let n;
  function r(...o) {
    const a = () => {
      e.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(a, t);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function Ep(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function kp(e, t) {
  var n, r;
  return /* @__PURE__ */ T.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Se(e) {
  return e && e.ownerDocument || document;
}
function Yt(e) {
  return Se(e).defaultView || window;
}
function Tp(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? R({}, t.propTypes) : null;
  return (o) => (a, i, l, c, u, ...f) => {
    const v = u || i, b = n == null ? void 0 : n[v];
    if (b) {
      const p = b(a, i, l, c, u, ...f);
      if (p)
        return p;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function or(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Np = typeof window < "u" ? T.useLayoutEffect : T.useEffect, $t = Np;
let Ca = 0;
function Op(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && (Ca += 1, n(`mui-${Ca}`));
  }, [t]), r;
}
const Sa = T["useId".toString()];
function Wi(e) {
  if (Sa !== void 0) {
    const t = Sa();
    return e ?? t;
  }
  return Op(e);
}
function Cp(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function Xi({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [a, i] = T.useState(t), l = o ? e : a;
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
    o || i(u);
  }, []);
  return [l, c];
}
function Sn(e) {
  const t = T.useRef(e);
  return $t(() => {
    t.current = e;
  }), T.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function Ge(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      or(n, t);
    });
  }, e);
}
const Ra = {};
function Sp(e, t) {
  const n = T.useRef(Ra);
  return n.current === Ra && (n.current = e(t)), n;
}
const Rp = [];
function Pp(e) {
  T.useEffect(e, Rp);
}
class _n {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new _n();
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
function gn() {
  const e = Sp(_n.create).current;
  return Pp(e.disposeEffect), e;
}
let br = !0, oo = !1;
const $p = new _n(), Mp = {
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
function Ip(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && Mp[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function _p(e) {
  e.metaKey || e.altKey || e.ctrlKey || (br = !0);
}
function zr() {
  br = !1;
}
function Ap() {
  this.visibilityState === "hidden" && oo && (br = !0);
}
function Dp(e) {
  e.addEventListener("keydown", _p, !0), e.addEventListener("mousedown", zr, !0), e.addEventListener("pointerdown", zr, !0), e.addEventListener("touchstart", zr, !0), e.addEventListener("visibilitychange", Ap, !0);
}
function Bp(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return br || Ip(t);
}
function qi() {
  const e = T.useCallback((o) => {
    o != null && Dp(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? (oo = !0, $p.start(100, () => {
      oo = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Bp(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Yi(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function jp(e) {
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
function Lp(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Vp = Number.isInteger || Lp;
function Ki(e, t, n, r) {
  const o = e[t];
  if (o == null || !Vp(o)) {
    const a = jp(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function Ji(e, t, ...n) {
  return e[t] === void 0 ? null : Ki(e, t, ...n);
}
function ao() {
  return null;
}
Ji.isRequired = Ki;
ao.isRequired = ao;
const Zi = process.env.NODE_ENV === "production" ? ao : Ji;
function Qi(e, t) {
  const n = R({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = R({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = R({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = Qi(o[i], a[i]);
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
      r[o] = e[o].reduce((a, i) => {
        if (i) {
          const l = t(i);
          l !== "" && a.push(l), n && n[i] && a.push(n[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const Pa = (e) => e, Fp = () => {
  let e = Pa;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Pa;
    }
  };
}, zp = Fp(), es = zp, ts = {
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
  const r = ts[t];
  return r ? `${n}-${r}` : `${es.generate(e)}-${t}`;
}
function bt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = et(e, o, n);
  }), r;
}
function Up(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ns(e) {
  return typeof e == "string";
}
function bn(e, t, n) {
  return e === void 0 || ns(e) ? t : R({}, t, {
    ownerState: R({}, t.ownerState, n)
  });
}
const Hp = {
  disableDefaultClasses: !1
}, Gp = /* @__PURE__ */ T.createContext(Hp);
function Wp(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Gp);
  return (n) => t ? "" : e(n);
}
function rs(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Xp(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function $a(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function qp(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Ce(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = R({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), d = R({}, n, o, r);
    return p.length > 0 && (d.className = p), Object.keys(m).length > 0 && (d.style = m), {
      props: d,
      internalRef: void 0
    };
  }
  const i = rs(R({}, o, r)), l = $a(r), c = $a(o), u = t(i), f = Ce(u == null ? void 0 : u.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = R({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), b = R({}, u, n, c, l);
  return f.length > 0 && (b.className = f), Object.keys(v).length > 0 && (b.style = v), {
    props: b,
    internalRef: u.ref
  };
}
const Yp = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Mt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = he(e, Yp), l = a ? {} : Xp(r, o), {
    props: c,
    internalRef: u
  } = qp(R({}, i, {
    externalSlotProps: l
  })), f = Ge(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return bn(n, R({}, c, {
    ref: f
  }), o);
}
const os = "base";
function Kp(e) {
  return `${os}--${e}`;
}
function Jp(e, t) {
  return `${os}-${e}-${t}`;
}
function as(e, t) {
  const n = ts[t];
  return n ? Kp(n) : Jp(e, t);
}
function Zp(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = as(e, r);
  }), n;
}
const Qp = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function eu(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function tu(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function nu(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || tu(e));
}
function ru(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(Qp)).forEach((r, o) => {
    const a = eu(r);
    a === -1 || !nu(r) || (a === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: a,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function ou() {
  return !0;
}
function ar(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = ru,
    isEnabled: i = ou,
    open: l
  } = e, c = T.useRef(!1), u = T.useRef(null), f = T.useRef(null), v = T.useRef(null), b = T.useRef(null), p = T.useRef(!1), m = T.useRef(null), d = Ge(t.ref, m), g = T.useRef(null);
  T.useEffect(() => {
    !l || !m.current || (p.current = !n);
  }, [n, l]), T.useEffect(() => {
    if (!l || !m.current)
      return;
    const w = Se(m.current);
    return m.current.contains(w.activeElement) || (m.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), m.current.setAttribute("tabIndex", "-1")), p.current && m.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !m.current)
      return;
    const w = Se(m.current), E = (N) => {
      g.current = N, !(r || !i() || N.key !== "Tab") && w.activeElement === m.current && N.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const N = m.current;
      if (N === null)
        return;
      if (!w.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (N.contains(w.activeElement) || r && w.activeElement !== u.current && w.activeElement !== f.current)
        return;
      if (w.activeElement !== b.current)
        b.current = null;
      else if (b.current !== null)
        return;
      if (!p.current)
        return;
      let _ = [];
      if ((w.activeElement === u.current || w.activeElement === f.current) && (_ = a(m.current)), _.length > 0) {
        var D, j;
        const k = !!((D = g.current) != null && D.shiftKey && ((j = g.current) == null ? void 0 : j.key) === "Tab"), O = _[0], $ = _[_.length - 1];
        typeof O != "string" && typeof $ != "string" && (k ? $.focus() : O.focus());
      } else
        N.focus();
    };
    w.addEventListener("focusin", y), w.addEventListener("keydown", E, !0);
    const C = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(C), w.removeEventListener("focusin", y), w.removeEventListener("keydown", E, !0);
    };
  }, [n, r, o, i, l, a]);
  const x = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0, b.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, P = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ F(T.Fragment, {
    children: [/* @__PURE__ */ h("div", {
      tabIndex: l ? 0 : -1,
      onFocus: P,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: d,
      onFocus: x
    }), /* @__PURE__ */ h("div", {
      tabIndex: l ? 0 : -1,
      onFocus: P,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (ar.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: In,
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
process.env.NODE_ENV !== "production" && (ar["propTypes"] = Ui(ar.propTypes));
function au(e) {
  return typeof e == "function" ? e() : e;
}
const Rn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = T.useState(null), c = Ge(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if ($t(() => {
    a || l(au(o) || document.body);
  }, [o, a]), $t(() => {
    if (i && !a)
      return or(n, i), () => {
        or(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, u);
    }
    return /* @__PURE__ */ h(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ h(T.Fragment, {
    children: i && /* @__PURE__ */ mc.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (Rn.propTypes = {
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
process.env.NODE_ENV !== "production" && (Rn["propTypes"] = Ui(Rn.propTypes));
function iu(e) {
  const t = Se(e);
  return t.body === e ? Yt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function xn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function Ma(e) {
  return parseInt(Yt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function su(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Ia(e, t, n, r, o) {
  const a = [t, n, ...r];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !su(i);
    l && c && xn(i, o);
  });
}
function Ur(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function lu(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (iu(r)) {
      const i = Yi(Se(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${Ma(r) + i}px`;
      const l = Se(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${Ma(c) + i}px`;
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment)
      a = Se(r).body;
    else {
      const i = r.parentElement, l = Yt(r);
      a = (i == null ? void 0 : i.nodeName) === "HTML" && l.getComputedStyle(i).overflowY === "scroll" ? i : r;
    }
    n.push({
      value: a.style.overflow,
      property: "overflow",
      el: a
    }, {
      value: a.style.overflowX,
      property: "overflow-x",
      el: a
    }, {
      value: a.style.overflowY,
      property: "overflow-y",
      el: a
    }), a.style.overflow = "hidden";
  }
  return () => {
    n.forEach(({
      value: a,
      el: i,
      property: l
    }) => {
      a ? i.style.setProperty(l, a) : i.style.removeProperty(l);
    });
  };
}
function cu(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class pu {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && xn(t.modalRef, !1);
    const o = cu(n);
    Ia(n, t.mount, t.modalRef, o, !0);
    const a = Ur(this.containers, (i) => i.container === n);
    return a !== -1 ? (this.containers[a].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Ur(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = lu(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Ur(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && xn(t.modalRef, n), Ia(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && xn(i.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function uu(e) {
  return typeof e == "function" ? e() : e;
}
function du(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const fu = new pu();
function mu(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = fu,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: f,
    rootRef: v
  } = e, b = T.useRef({}), p = T.useRef(null), m = T.useRef(null), d = Ge(m, v), [g, x] = T.useState(!f), P = du(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const E = () => Se(p.current), y = () => (b.current.modalRef = m.current, b.current.mount = p.current, b.current), C = () => {
    o.mount(y(), {
      disableScrollLock: r
    }), m.current && (m.current.scrollTop = 0);
  }, N = Sn(() => {
    const M = uu(t) || E().body;
    o.add(y(), M), m.current && C();
  }), _ = T.useCallback(() => o.isTopModal(y()), [o]), D = Sn((M) => {
    p.current = M, M && (f && _() ? C() : m.current && xn(m.current, w));
  }), j = T.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    j();
  }, [j]), T.useEffect(() => {
    f ? N() : (!P || !a) && j();
  }, [f, j, P, a, N]);
  const k = (M) => (V) => {
    var te;
    (te = M.onKeyDown) == null || te.call(M, V), !(V.key !== "Escape" || V.which === 229 || // Wait until IME is settled.
    !_()) && (n || (V.stopPropagation(), u && u(V, "escapeKeyDown")));
  }, O = (M) => (V) => {
    var te;
    (te = M.onClick) == null || te.call(M, V), V.target === V.currentTarget && u && u(V, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const V = rs(e);
      delete V.onTransitionEnter, delete V.onTransitionExited;
      const te = R({}, V, M);
      return R({
        role: "presentation"
      }, te, {
        onKeyDown: k(te),
        ref: d
      });
    },
    getBackdropProps: (M = {}) => {
      const V = M;
      return R({
        "aria-hidden": !0
      }, V, {
        onClick: O(V),
        open: f
      });
    },
    getTransitionProps: () => {
      const M = () => {
        x(!1), i && i();
      }, V = () => {
        x(!0), l && l(), a && j();
      };
      return {
        onEnter: ro(M, c == null ? void 0 : c.props.onEnter),
        onExited: ro(V, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: d,
    portalRef: D,
    isTopModal: _,
    exited: g,
    hasTransition: P
  };
}
var Ie = "top", We = "bottom", Xe = "right", _e = "left", No = "auto", An = [Ie, We, Xe, _e], Kt = "start", Pn = "end", hu = "clippingParents", is = "viewport", pn = "popper", gu = "reference", _a = /* @__PURE__ */ An.reduce(function(e, t) {
  return e.concat([t + "-" + Kt, t + "-" + Pn]);
}, []), ss = /* @__PURE__ */ [].concat(An, [No]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Kt, t + "-" + Pn]);
}, []), bu = "beforeRead", vu = "read", yu = "afterRead", wu = "beforeMain", xu = "main", Eu = "afterMain", ku = "beforeWrite", Tu = "write", Nu = "afterWrite", Ou = [bu, vu, yu, wu, xu, Eu, ku, Tu, Nu];
function Qe(e) {
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
function It(e) {
  var t = Fe(e).Element;
  return e instanceof t || e instanceof Element;
}
function He(e) {
  var t = Fe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Oo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Fe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Cu(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !He(a) || !Qe(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Su(e) {
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
      var o = t.elements[r], a = t.attributes[r] || {}, i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = i.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !He(o) || !Qe(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Ru = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Cu,
  effect: Su,
  requires: ["computeStyles"]
};
function Je(e) {
  return e.split("-")[0];
}
var Rt = Math.max, ir = Math.min, Jt = Math.round;
function io() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ls() {
  return !/^((?!chrome|android).)*safari/i.test(io());
}
function Zt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && He(e) && (o = e.offsetWidth > 0 && Jt(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Jt(r.height) / e.offsetHeight || 1);
  var i = It(e) ? Fe(e) : window, l = i.visualViewport, c = !ls() && n, u = (r.left + (c && l ? l.offsetLeft : 0)) / o, f = (r.top + (c && l ? l.offsetTop : 0)) / a, v = r.width / o, b = r.height / a;
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
function Co(e) {
  var t = Zt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function cs(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Oo(n)) {
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
function Pu(e) {
  return ["table", "td", "th"].indexOf(Qe(e)) >= 0;
}
function vt(e) {
  return ((It(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function vr(e) {
  return Qe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Oo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    vt(e)
  );
}
function Aa(e) {
  return !He(e) || // https://github.com/popperjs/popper-core/issues/837
  st(e).position === "fixed" ? null : e.offsetParent;
}
function $u(e) {
  var t = /firefox/i.test(io()), n = /Trident/i.test(io());
  if (n && He(e)) {
    var r = st(e);
    if (r.position === "fixed")
      return null;
  }
  var o = vr(e);
  for (Oo(o) && (o = o.host); He(o) && ["html", "body"].indexOf(Qe(o)) < 0; ) {
    var a = st(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Dn(e) {
  for (var t = Fe(e), n = Aa(e); n && Pu(n) && st(n).position === "static"; )
    n = Aa(n);
  return n && (Qe(n) === "html" || Qe(n) === "body" && st(n).position === "static") ? t : n || $u(e) || t;
}
function So(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function En(e, t, n) {
  return Rt(e, ir(t, n));
}
function Mu(e, t, n) {
  var r = En(e, t, n);
  return r > n ? n : r;
}
function ps() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function us(e) {
  return Object.assign({}, ps(), e);
}
function ds(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Iu = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, us(typeof t != "number" ? t : ds(t, An));
};
function _u(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = Je(n.placement), c = So(l), u = [_e, Xe].indexOf(l) >= 0, f = u ? "height" : "width";
  if (!(!a || !i)) {
    var v = Iu(o.padding, n), b = Co(a), p = c === "y" ? Ie : _e, m = c === "y" ? We : Xe, d = n.rects.reference[f] + n.rects.reference[c] - i[c] - n.rects.popper[f], g = i[c] - n.rects.reference[c], x = Dn(a), P = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = d / 2 - g / 2, E = v[p], y = P - b[f] - v[m], C = P / 2 - b[f] / 2 + w, N = En(E, C, y), _ = c;
    n.modifiersData[r] = (t = {}, t[_] = N, t.centerOffset = N - C, t);
  }
}
function Au(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || cs(t.elements.popper, o) && (t.elements.arrow = o));
}
const Du = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: _u,
  effect: Au,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Qt(e) {
  return e.split("-")[1];
}
var Bu = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ju(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Jt(n * o) / o || 0,
    y: Jt(r * o) / o || 0
  };
}
function Da(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, f = e.roundOffsets, v = e.isFixed, b = i.x, p = b === void 0 ? 0 : b, m = i.y, d = m === void 0 ? 0 : m, g = typeof f == "function" ? f({
    x: p,
    y: d
  }) : {
    x: p,
    y: d
  };
  p = g.x, d = g.y;
  var x = i.hasOwnProperty("x"), P = i.hasOwnProperty("y"), w = _e, E = Ie, y = window;
  if (u) {
    var C = Dn(n), N = "clientHeight", _ = "clientWidth";
    if (C === Fe(n) && (C = vt(n), st(C).position !== "static" && l === "absolute" && (N = "scrollHeight", _ = "scrollWidth")), C = C, o === Ie || (o === _e || o === Xe) && a === Pn) {
      E = We;
      var D = v && C === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[N]
      );
      d -= D - r.height, d *= c ? 1 : -1;
    }
    if (o === _e || (o === Ie || o === We) && a === Pn) {
      w = Xe;
      var j = v && C === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[_]
      );
      p -= j - r.width, p *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, u && Bu), O = f === !0 ? ju({
    x: p,
    y: d
  }, Fe(n)) : {
    x: p,
    y: d
  };
  if (p = O.x, d = O.y, c) {
    var $;
    return Object.assign({}, k, ($ = {}, $[E] = P ? "0" : "", $[w] = x ? "0" : "", $.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + d + "px)" : "translate3d(" + p + "px, " + d + "px, 0)", $));
  }
  return Object.assign({}, k, (t = {}, t[E] = P ? d + "px" : "", t[w] = x ? p + "px" : "", t.transform = "", t));
}
function Lu(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Je(t.placement),
    variation: Qt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Da(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Da(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Vu = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Lu,
  data: {}
};
var Gn = {
  passive: !0
};
function Fu(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, c = Fe(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && u.forEach(function(f) {
    f.addEventListener("scroll", n.update, Gn);
  }), l && c.addEventListener("resize", n.update, Gn), function() {
    a && u.forEach(function(f) {
      f.removeEventListener("scroll", n.update, Gn);
    }), l && c.removeEventListener("resize", n.update, Gn);
  };
}
const zu = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Fu,
  data: {}
};
var Uu = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Kn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Uu[t];
  });
}
var Hu = {
  start: "end",
  end: "start"
};
function Ba(e) {
  return e.replace(/start|end/g, function(t) {
    return Hu[t];
  });
}
function Ro(e) {
  var t = Fe(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Po(e) {
  return Zt(vt(e)).left + Ro(e).scrollLeft;
}
function Gu(e, t) {
  var n = Fe(e), r = vt(e), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var u = ls();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Po(e),
    y: c
  };
}
function Wu(e) {
  var t, n = vt(e), r = Ro(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = Rt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Rt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Po(e), c = -r.scrollTop;
  return st(o || n).direction === "rtl" && (l += Rt(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function $o(e) {
  var t = st(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function fs(e) {
  return ["html", "body", "#document"].indexOf(Qe(e)) >= 0 ? e.ownerDocument.body : He(e) && $o(e) ? e : fs(vr(e));
}
function kn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = fs(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Fe(r), i = o ? [a].concat(a.visualViewport || [], $o(r) ? r : []) : r, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(kn(vr(i)))
  );
}
function so(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Xu(e, t) {
  var n = Zt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ja(e, t, n) {
  return t === is ? so(Gu(e, n)) : It(t) ? Xu(t, n) : so(Wu(vt(e)));
}
function qu(e) {
  var t = kn(vr(e)), n = ["absolute", "fixed"].indexOf(st(e).position) >= 0, r = n && He(e) ? Dn(e) : e;
  return It(r) ? t.filter(function(o) {
    return It(o) && cs(o, r) && Qe(o) !== "body";
  }) : [];
}
function Yu(e, t, n, r) {
  var o = t === "clippingParents" ? qu(e) : [].concat(t), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(c, u) {
    var f = ja(e, u, r);
    return c.top = Rt(f.top, c.top), c.right = ir(f.right, c.right), c.bottom = ir(f.bottom, c.bottom), c.left = Rt(f.left, c.left), c;
  }, ja(e, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function ms(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Je(r) : null, a = r ? Qt(r) : null, i = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ie:
      c = {
        x: i,
        y: t.y - n.height
      };
      break;
    case We:
      c = {
        x: i,
        y: t.y + t.height
      };
      break;
    case Xe:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case _e:
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
  var u = o ? So(o) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (a) {
      case Kt:
        c[u] = c[u] - (t[f] / 2 - n[f] / 2);
        break;
      case Pn:
        c[u] = c[u] + (t[f] / 2 - n[f] / 2);
        break;
    }
  }
  return c;
}
function $n(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, i = a === void 0 ? e.strategy : a, l = n.boundary, c = l === void 0 ? hu : l, u = n.rootBoundary, f = u === void 0 ? is : u, v = n.elementContext, b = v === void 0 ? pn : v, p = n.altBoundary, m = p === void 0 ? !1 : p, d = n.padding, g = d === void 0 ? 0 : d, x = us(typeof g != "number" ? g : ds(g, An)), P = b === pn ? gu : pn, w = e.rects.popper, E = e.elements[m ? P : b], y = Yu(It(E) ? E : E.contextElement || vt(e.elements.popper), c, f, i), C = Zt(e.elements.reference), N = ms({
    reference: C,
    element: w,
    strategy: "absolute",
    placement: o
  }), _ = so(Object.assign({}, w, N)), D = b === pn ? _ : C, j = {
    top: y.top - D.top + x.top,
    bottom: D.bottom - y.bottom + x.bottom,
    left: y.left - D.left + x.left,
    right: D.right - y.right + x.right
  }, k = e.modifiersData.offset;
  if (b === pn && k) {
    var O = k[o];
    Object.keys(j).forEach(function($) {
      var L = [Xe, We].indexOf($) >= 0 ? 1 : -1, U = [Ie, We].indexOf($) >= 0 ? "y" : "x";
      j[$] += O[U] * L;
    });
  }
  return j;
}
function Ku(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? ss : c, f = Qt(r), v = f ? l ? _a : _a.filter(function(m) {
    return Qt(m) === f;
  }) : An, b = v.filter(function(m) {
    return u.indexOf(m) >= 0;
  });
  b.length === 0 && (b = v);
  var p = b.reduce(function(m, d) {
    return m[d] = $n(e, {
      placement: d,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Je(d)], m;
  }, {});
  return Object.keys(p).sort(function(m, d) {
    return p[m] - p[d];
  });
}
function Ju(e) {
  if (Je(e) === No)
    return [];
  var t = Kn(e);
  return [Ba(e), t, Ba(t)];
}
function Zu(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, c = n.fallbackPlacements, u = n.padding, f = n.boundary, v = n.rootBoundary, b = n.altBoundary, p = n.flipVariations, m = p === void 0 ? !0 : p, d = n.allowedAutoPlacements, g = t.options.placement, x = Je(g), P = x === g, w = c || (P || !m ? [Kn(g)] : Ju(g)), E = [g].concat(w).reduce(function(G, W) {
      return G.concat(Je(W) === No ? Ku(t, {
        placement: W,
        boundary: f,
        rootBoundary: v,
        padding: u,
        flipVariations: m,
        allowedAutoPlacements: d
      }) : W);
    }, []), y = t.rects.reference, C = t.rects.popper, N = /* @__PURE__ */ new Map(), _ = !0, D = E[0], j = 0; j < E.length; j++) {
      var k = E[j], O = Je(k), $ = Qt(k) === Kt, L = [Ie, We].indexOf(O) >= 0, U = L ? "width" : "height", M = $n(t, {
        placement: k,
        boundary: f,
        rootBoundary: v,
        altBoundary: b,
        padding: u
      }), V = L ? $ ? Xe : _e : $ ? We : Ie;
      y[U] > C[U] && (V = Kn(V));
      var te = Kn(V), Q = [];
      if (a && Q.push(M[O] <= 0), l && Q.push(M[V] <= 0, M[te] <= 0), Q.every(function(G) {
        return G;
      })) {
        D = k, _ = !1;
        break;
      }
      N.set(k, Q);
    }
    if (_)
      for (var S = m ? 3 : 1, I = function(W) {
        var Y = E.find(function(K) {
          var X = N.get(K);
          if (X)
            return X.slice(0, W).every(function(Z) {
              return Z;
            });
        });
        if (Y)
          return D = Y, "break";
      }, z = S; z > 0; z--) {
        var q = I(z);
        if (q === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[r]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const Qu = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Zu,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function La(e, t, n) {
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
function Va(e) {
  return [Ie, Xe, We, _e].some(function(t) {
    return e[t] >= 0;
  });
}
function ed(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = $n(t, {
    elementContext: "reference"
  }), l = $n(t, {
    altBoundary: !0
  }), c = La(i, r), u = La(l, o, a), f = Va(c), v = Va(u);
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
const td = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ed
};
function nd(e, t, n) {
  var r = Je(e), o = [_e, Ie].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [_e, Xe].indexOf(r) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function rd(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = ss.reduce(function(f, v) {
    return f[v] = nd(v, t.rects, a), f;
  }, {}), l = i[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = i;
}
const od = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: rd
};
function ad(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = ms({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const id = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ad,
  data: {}
};
function sd(e) {
  return e === "x" ? "y" : "x";
}
function ld(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, c = n.boundary, u = n.rootBoundary, f = n.altBoundary, v = n.padding, b = n.tether, p = b === void 0 ? !0 : b, m = n.tetherOffset, d = m === void 0 ? 0 : m, g = $n(t, {
    boundary: c,
    rootBoundary: u,
    padding: v,
    altBoundary: f
  }), x = Je(t.placement), P = Qt(t.placement), w = !P, E = So(x), y = sd(E), C = t.modifiersData.popperOffsets, N = t.rects.reference, _ = t.rects.popper, D = typeof d == "function" ? d(Object.assign({}, t.rects, {
    placement: t.placement
  })) : d, j = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, O = {
    x: 0,
    y: 0
  };
  if (C) {
    if (a) {
      var $, L = E === "y" ? Ie : _e, U = E === "y" ? We : Xe, M = E === "y" ? "height" : "width", V = C[E], te = V + g[L], Q = V - g[U], S = p ? -_[M] / 2 : 0, I = P === Kt ? N[M] : _[M], z = P === Kt ? -_[M] : -N[M], q = t.elements.arrow, G = p && q ? Co(q) : {
        width: 0,
        height: 0
      }, W = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ps(), Y = W[L], K = W[U], X = En(0, N[M], G[M]), Z = w ? N[M] / 2 - S - X - Y - j.mainAxis : I - X - Y - j.mainAxis, ee = w ? -N[M] / 2 + S + X + K + j.mainAxis : z + X + K + j.mainAxis, ie = t.elements.arrow && Dn(t.elements.arrow), B = ie ? E === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, ne = ($ = k == null ? void 0 : k[E]) != null ? $ : 0, A = V + Z - ne - B, se = V + ee - ne, Te = En(p ? ir(te, A) : te, V, p ? Rt(Q, se) : Q);
      C[E] = Te, O[E] = Te - V;
    }
    if (l) {
      var Pe, xe = E === "x" ? Ie : _e, wt = E === "x" ? We : Xe, $e = C[y], tt = y === "y" ? "height" : "width", De = $e + g[xe], nt = $e - g[wt], Ne = [Ie, _e].indexOf(x) !== -1, Dt = (Pe = k == null ? void 0 : k[y]) != null ? Pe : 0, xt = Ne ? De : $e - N[tt] - _[tt] - Dt + j.altAxis, nn = Ne ? $e + N[tt] + _[tt] - Dt - j.altAxis : nt, Vn = p && Ne ? Mu(xt, $e, nn) : En(p ? xt : De, $e, p ? nn : nt);
      C[y] = Vn, O[y] = Vn - $e;
    }
    t.modifiersData[r] = O;
  }
}
const cd = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ld,
  requiresIfExists: ["offset"]
};
function pd(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function ud(e) {
  return e === Fe(e) || !He(e) ? Ro(e) : pd(e);
}
function dd(e) {
  var t = e.getBoundingClientRect(), n = Jt(t.width) / e.offsetWidth || 1, r = Jt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function fd(e, t, n) {
  n === void 0 && (n = !1);
  var r = He(t), o = He(t) && dd(t), a = vt(t), i = Zt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Qe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  $o(a)) && (l = ud(t)), He(t) ? (c = Zt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Po(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function md(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
      if (!n.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), r.push(a);
  }
  return e.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function hd(e) {
  var t = md(e);
  return Ou.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function gd(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function bd(e) {
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
var Fa = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function za() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function vd(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? Fa : o;
  return function(l, c, u) {
    u === void 0 && (u = a);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Fa, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, v = [], b = !1, p = {
      state: f,
      setOptions: function(x) {
        var P = typeof x == "function" ? x(f.options) : x;
        d(), f.options = Object.assign({}, a, f.options, P), f.scrollParents = {
          reference: It(l) ? kn(l) : l.contextElement ? kn(l.contextElement) : [],
          popper: kn(c)
        };
        var w = hd(bd([].concat(r, f.options.modifiers)));
        return f.orderedModifiers = w.filter(function(E) {
          return E.enabled;
        }), m(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var x = f.elements, P = x.reference, w = x.popper;
          if (za(P, w)) {
            f.rects = {
              reference: fd(P, Dn(w), f.options.strategy === "fixed"),
              popper: Co(w)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(j) {
              return f.modifiersData[j.name] = Object.assign({}, j.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], C = y.fn, N = y.options, _ = N === void 0 ? {} : N, D = y.name;
              typeof C == "function" && (f = C({
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
      update: gd(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(f);
        });
      }),
      destroy: function() {
        d(), b = !0;
      }
    };
    if (!za(l, c))
      return p;
    p.setOptions(u).then(function(g) {
      !b && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function m() {
      f.orderedModifiers.forEach(function(g) {
        var x = g.name, P = g.options, w = P === void 0 ? {} : P, E = g.effect;
        if (typeof E == "function") {
          var y = E({
            state: f,
            name: x,
            instance: p,
            options: w
          }), C = function() {
          };
          v.push(y || C);
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
var yd = [zu, id, Vu, Ru, od, Qu, cd, Du, td], wd = /* @__PURE__ */ vd({
  defaultModifiers: yd
});
const hs = "Popper";
function xd(e) {
  return as(hs, e);
}
Zp(hs, ["root"]);
const Ed = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], kd = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Td(e, t) {
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
function sr(e) {
  return typeof e == "function" ? e() : e;
}
function yr(e) {
  return e.nodeType !== void 0;
}
function Nd(e) {
  return !yr(e);
}
const Od = () => ct({
  root: ["root"]
}, Wp(xd)), Cd = {}, Sd = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: f,
    popperOptions: v,
    popperRef: b,
    slotProps: p = {},
    slots: m = {},
    TransitionProps: d
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, g = he(t, Ed), x = T.useRef(null), P = Ge(x, n), w = T.useRef(null), E = Ge(w, b), y = T.useRef(E);
  $t(() => {
    y.current = E;
  }, [E]), T.useImperativeHandle(b, () => w.current, []);
  const C = Td(f, i), [N, _] = T.useState(C), [D, j] = T.useState(sr(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && j(sr(o));
  }, [o]), $t(() => {
    if (!D || !u)
      return;
    const U = (te) => {
      _(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && yr(D) && D.nodeType === 1) {
      const te = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: te
      }) => {
        U(te);
      }
    }];
    c != null && (M = M.concat(c)), v && v.modifiers != null && (M = M.concat(v.modifiers));
    const V = wd(D, x.current, R({
      placement: C
    }, v, {
      modifiers: M
    }));
    return y.current(V), () => {
      V.destroy(), y.current(null);
    };
  }, [D, l, c, u, v, C]);
  const k = {
    placement: N
  };
  d !== null && (k.TransitionProps = d);
  const O = Od(), $ = (r = m.root) != null ? r : "div", L = Mt({
    elementType: $,
    externalSlotProps: p.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: P
    },
    ownerState: t,
    className: O.root
  });
  return /* @__PURE__ */ h($, R({}, L, {
    children: typeof a == "function" ? a(k) : a
  }));
}), gs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: f,
    placement: v = "bottom",
    popperOptions: b = Cd,
    popperRef: p,
    style: m,
    transition: d = !1,
    slotProps: g = {},
    slots: x = {}
  } = t, P = he(t, kd), [w, E] = T.useState(!0), y = () => {
    E(!1);
  }, C = () => {
    E(!0);
  };
  if (!c && !f && (!d || w))
    return null;
  let N;
  if (a)
    N = a;
  else if (r) {
    const j = sr(r);
    N = j && yr(j) ? Se(j).body : Se(null).body;
  }
  const _ = !f && c && (!d || w) ? "none" : void 0, D = d ? {
    in: f,
    onEnter: y,
    onExited: C
  } : void 0;
  return /* @__PURE__ */ h(Rn, {
    disablePortal: l,
    container: N,
    children: /* @__PURE__ */ h(Sd, R({
      anchorEl: r,
      direction: i,
      disablePortal: l,
      modifiers: u,
      ref: n,
      open: d ? !w : f,
      placement: v,
      popperOptions: b,
      popperRef: p,
      slotProps: g,
      slots: x
    }, P, {
      style: R({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: _
      }, m),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (gs.propTypes = {
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
  anchorEl: tn(s.oneOfType([it, s.object, s.func]), (e) => {
    if (e.open) {
      const t = sr(e.anchorEl);
      if (t && yr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Nd(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: To,
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
const Rd = ["values", "unit", "step"], Pd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => R({}, n, {
    [r.key]: r.val
  }), {});
};
function $d(e) {
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
  } = e, o = he(e, Rd), a = Pd(t), i = Object.keys(a);
  function l(b) {
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${n})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == "number" ? t[b] : b) - r / 100}${n})`;
  }
  function u(b, p) {
    const m = i.indexOf(p);
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${n}) and (max-width:${(m !== -1 && typeof t[i[m]] == "number" ? t[i[m]] : p) - r / 100}${n})`;
  }
  function f(b) {
    return i.indexOf(b) + 1 < i.length ? u(b, i[i.indexOf(b) + 1]) : l(b);
  }
  function v(b) {
    const p = i.indexOf(b);
    return p === 0 ? l(i[1]) : p === i.length - 1 ? c(i[p]) : u(b, i[i.indexOf(b) + 1]).replace("@media", "@media not all and");
  }
  return R({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: u,
    only: f,
    not: v,
    unit: n
  }, o);
}
const Md = {
  borderRadius: 4
}, Id = Md, _d = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, yt = _d;
function Tn(e, t) {
  return t ? at(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Mo = {
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
}, Ua = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Mo[e]}px)`
};
function lt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Ua;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || Ua;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Mo).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = n(t[l], l);
      } else {
        const c = l;
        i[c] = t[c];
      }
      return i;
    }, {});
  }
  return n(t);
}
function Ad(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Dd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function wr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function lr(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = wr(e, n) || r, t && (o = t(o, r, e)), o;
}
function Ee(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const l = i[t], c = i.theme, u = wr(c, r) || {};
    return lt(i, l, (v) => {
      let b = lr(u, o, v);
      return v === b && typeof v == "string" && (b = lr(u, o, `${t}${v === "default" ? "" : Ze(v)}`, v)), n === !1 ? b : {
        [n]: b
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: yt
  } : {}, a.filterProps = [t], a;
}
function Bd(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const jd = {
  m: "margin",
  p: "padding"
}, Ld = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ha = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Vd = Bd((e) => {
  if (e.length > 2)
    if (Ha[e])
      e = Ha[e];
    else
      return [e];
  const [t, n] = e.split(""), r = jd[t], o = Ld[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), xr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Er = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Fd = [...xr, ...Er];
function Bn(e, t, n, r) {
  var o;
  const a = (o = wr(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function bs(e) {
  return Bn(e, "spacing", 8, "spacing");
}
function jn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function zd(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = jn(t, n), r), {});
}
function Ud(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Vd(n), a = zd(o, r), i = e[n];
  return lt(e, i, a);
}
function vs(e, t) {
  const n = bs(e.theme);
  return Object.keys(e).map((r) => Ud(e, t, r, n)).reduce(Tn, {});
}
function ve(e) {
  return vs(e, xr);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? xr.reduce((e, t) => (e[t] = yt, e), {}) : {};
ve.filterProps = xr;
function ye(e) {
  return vs(e, Er);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Er.reduce((e, t) => (e[t] = yt, e), {}) : {};
ye.filterProps = Er;
process.env.NODE_ENV !== "production" && Fd.reduce((e, t) => (e[t] = yt, e), {});
function Hd(e = 8) {
  if (e.mui)
    return e;
  const t = bs({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function kr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? Tn(o, t[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function qe(e, t) {
  return Ee({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Gd = qe("border", Ue), Wd = qe("borderTop", Ue), Xd = qe("borderRight", Ue), qd = qe("borderBottom", Ue), Yd = qe("borderLeft", Ue), Kd = qe("borderColor"), Jd = qe("borderTopColor"), Zd = qe("borderRightColor"), Qd = qe("borderBottomColor"), ef = qe("borderLeftColor"), tf = qe("outline", Ue), nf = qe("outlineColor"), Tr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Bn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: jn(t, r)
    });
    return lt(e, e.borderRadius, n);
  }
  return null;
};
Tr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: yt
} : {};
Tr.filterProps = ["borderRadius"];
kr(Gd, Wd, Xd, qd, Yd, Kd, Jd, Zd, Qd, ef, Tr, tf, nf);
const Nr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Bn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: jn(t, r)
    });
    return lt(e, e.gap, n);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: yt
} : {};
Nr.filterProps = ["gap"];
const Or = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Bn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: jn(t, r)
    });
    return lt(e, e.columnGap, n);
  }
  return null;
};
Or.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: yt
} : {};
Or.filterProps = ["columnGap"];
const Cr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Bn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: jn(t, r)
    });
    return lt(e, e.rowGap, n);
  }
  return null;
};
Cr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: yt
} : {};
Cr.filterProps = ["rowGap"];
const rf = Ee({
  prop: "gridColumn"
}), of = Ee({
  prop: "gridRow"
}), af = Ee({
  prop: "gridAutoFlow"
}), sf = Ee({
  prop: "gridAutoColumns"
}), lf = Ee({
  prop: "gridAutoRows"
}), cf = Ee({
  prop: "gridTemplateColumns"
}), pf = Ee({
  prop: "gridTemplateRows"
}), uf = Ee({
  prop: "gridTemplateAreas"
}), df = Ee({
  prop: "gridArea"
});
kr(Nr, Or, Cr, rf, of, af, sf, lf, cf, pf, uf, df);
function Wt(e, t) {
  return t === "grey" ? t : e;
}
const ff = Ee({
  prop: "color",
  themeKey: "palette",
  transform: Wt
}), mf = Ee({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Wt
}), hf = Ee({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Wt
});
kr(ff, mf, hf);
function Le(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const gf = Ee({
  prop: "width",
  transform: Le
}), Io = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Mo[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Le(n)
      };
    };
    return lt(e, e.maxWidth, t);
  }
  return null;
};
Io.filterProps = ["maxWidth"];
const bf = Ee({
  prop: "minWidth",
  transform: Le
}), vf = Ee({
  prop: "height",
  transform: Le
}), yf = Ee({
  prop: "maxHeight",
  transform: Le
}), wf = Ee({
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
const xf = Ee({
  prop: "boxSizing"
});
kr(gf, Io, bf, vf, yf, wf, xf);
const Ef = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ue
  },
  borderTop: {
    themeKey: "borders",
    transform: Ue
  },
  borderRight: {
    themeKey: "borders",
    transform: Ue
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ue
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ue
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
    transform: Ue
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Tr
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
    style: Nr
  },
  rowGap: {
    style: Cr
  },
  columnGap: {
    style: Or
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
    style: Io
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
}, _o = Ef;
function kf(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Tf(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Nf() {
  function e(n, r, o, a) {
    const i = {
      [n]: r,
      theme: o
    }, l = a[n];
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
    const b = wr(o, u) || {};
    return v ? v(i) : lt(i, r, (m) => {
      let d = lr(b, f, m);
      return m === d && typeof m == "string" && (d = lr(b, f, `${n}${m === "default" ? "" : Ze(m)}`, m)), c === !1 ? d : {
        [c]: d
      };
    });
  }
  function t(n) {
    var r;
    const {
      sx: o,
      theme: a = {}
    } = n || {};
    if (!o)
      return null;
    const i = (r = a.unstable_sxConfig) != null ? r : _o;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(a);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const f = Ad(a.breakpoints), v = Object.keys(f);
      let b = f;
      return Object.keys(u).forEach((p) => {
        const m = Tf(u[p], a);
        if (m != null)
          if (typeof m == "object")
            if (i[p])
              b = Tn(b, e(p, m, a, i));
            else {
              const d = lt({
                theme: a
              }, m, (g) => ({
                [p]: g
              }));
              kf(d, m) ? b[p] = t({
                sx: m,
                theme: a
              }) : b = Tn(b, d);
            }
          else
            b = Tn(b, e(p, m, a, i));
      }), Dd(v, b);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const ys = Nf();
ys.filterProps = ["sx"];
const Ao = ys;
function Of(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Cf = ["breakpoints", "palette", "spacing", "shape"];
function Do(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, i = he(e, Cf), l = $d(n), c = Hd(o);
  let u = at({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: R({
      mode: "light"
    }, r),
    spacing: c,
    shape: R({}, Id, a)
  }, i);
  return u.applyStyles = Of, u = t.reduce((f, v) => at(f, v), u), u.unstable_sxConfig = R({}, _o, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Ao({
      sx: v,
      theme: this
    });
  }, u;
}
function Sf(e) {
  return Object.keys(e).length === 0;
}
function ws(e = null) {
  const t = T.useContext(dc);
  return !t || Sf(t) ? e : t;
}
const Rf = Do();
function xs(e = Rf) {
  return ws(e);
}
const Pf = ["ownerState"], $f = ["variants"], Mf = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function If(e) {
  return Object.keys(e).length === 0;
}
function _f(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Jn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Af = Do(), Ga = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Wn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return If(t) ? e : t[n] || t;
}
function Df(e) {
  return e ? (t, n) => n[e] : null;
}
function Zn(e, t) {
  let {
    ownerState: n
  } = t, r = he(t, Pf);
  const o = typeof e == "function" ? e(R({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => Zn(a, R({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = he(o, $f);
    return a.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(R({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((f) => {
        (n == null ? void 0 : n[f]) !== c.props[f] && r[f] !== c.props[f] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(R({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Bf(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Af,
    rootShouldForwardProp: r = Jn,
    slotShouldForwardProp: o = Jn
  } = e, a = (i) => Ao(R({}, i, {
    theme: Wn(R({}, i, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    fc(i, (y) => y.filter((C) => !(C != null && C.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: b = Df(Ga(u))
    } = l, p = he(l, Mf), m = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), d = v || !1;
    let g;
    process.env.NODE_ENV !== "production" && c && (g = `${c}-${Ga(u || "Root")}`);
    let x = Jn;
    u === "Root" || u === "root" ? x = r : u ? x = o : _f(i) && (x = void 0);
    const P = uc(i, R({
      shouldForwardProp: x,
      label: g
    }, p)), w = (y) => typeof y == "function" && y.__emotion_real !== y || Ot(y) ? (C) => Zn(y, R({}, C, {
      theme: Wn({
        theme: C.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : y, E = (y, ...C) => {
      let N = w(y);
      const _ = C ? C.map(w) : [];
      c && b && _.push((k) => {
        const O = Wn(R({}, k, {
          defaultTheme: n,
          themeId: t
        }));
        if (!O.components || !O.components[c] || !O.components[c].styleOverrides)
          return null;
        const $ = O.components[c].styleOverrides, L = {};
        return Object.entries($).forEach(([U, M]) => {
          L[U] = Zn(M, R({}, k, {
            theme: O
          }));
        }), b(k, L);
      }), c && !m && _.push((k) => {
        var O;
        const $ = Wn(R({}, k, {
          defaultTheme: n,
          themeId: t
        })), L = $ == null || (O = $.components) == null || (O = O[c]) == null ? void 0 : O.variants;
        return Zn({
          variants: L
        }, R({}, k, {
          theme: $
        }));
      }), d || _.push(a);
      const D = _.length - C.length;
      if (Array.isArray(y) && D > 0) {
        const k = new Array(D).fill("");
        N = [...y, ...k], N.raw = [...y.raw, ...k];
      }
      const j = P(N, ..._);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${Ze(u || "")}`), k === void 0 && (k = `Styled(${wp(i)})`), j.displayName = k;
      }
      return i.muiName && (j.muiName = i.muiName), j;
    };
    return P.withConfig && (E.withConfig = P.withConfig), E;
  };
}
function jf(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Qi(t.components[n].defaultProps, r);
}
function Lf({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = xs(n);
  return r && (o = o[r] || o), jf({
    theme: o,
    name: t,
    props: e
  });
}
function Bo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Up(e, t, n);
}
function Vf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function _t(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return _t(Vf(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : qt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : qt(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Sr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Ff(e) {
  e = _t(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), i = (u, f = (u + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Sr({
    type: l,
    values: c
  });
}
function Wa(e) {
  e = _t(e);
  let t = e.type === "hsl" || e.type === "hsla" ? _t(Ff(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Xa(e, t) {
  const n = Wa(e), r = Wa(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function cr(e, t) {
  return e = _t(e), t = Bo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Sr(e);
}
function zf(e, t) {
  if (e = _t(e), t = Bo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Sr(e);
}
function Uf(e, t) {
  if (e = _t(e), t = Bo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Sr(e);
}
function Hf(e, t) {
  return R({
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
const Gf = {
  black: "#000",
  white: "#fff"
}, Mn = Gf, Wf = {
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
}, Xf = Wf, qf = {
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
}, Bt = qf, Yf = {
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
}, jt = Yf, Kf = {
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
}, un = Kf, Jf = {
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
}, Lt = Jf, Zf = {
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
}, Vt = Zf, Qf = {
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
}, Ft = Qf, em = ["mode", "contrastThreshold", "tonalOffset"], qa = {
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
    paper: Mn.white,
    default: Mn.white
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
}, Hr = {
  text: {
    primary: Mn.white,
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
    active: Mn.white,
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
function Ya(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Uf(e.main, o) : t === "dark" && (e.dark = zf(e.main, a)));
}
function tm(e = "light") {
  return e === "dark" ? {
    main: Lt[200],
    light: Lt[50],
    dark: Lt[400]
  } : {
    main: Lt[700],
    light: Lt[400],
    dark: Lt[800]
  };
}
function nm(e = "light") {
  return e === "dark" ? {
    main: Bt[200],
    light: Bt[50],
    dark: Bt[400]
  } : {
    main: Bt[500],
    light: Bt[300],
    dark: Bt[700]
  };
}
function rm(e = "light") {
  return e === "dark" ? {
    main: jt[500],
    light: jt[300],
    dark: jt[700]
  } : {
    main: jt[700],
    light: jt[400],
    dark: jt[800]
  };
}
function om(e = "light") {
  return e === "dark" ? {
    main: Vt[400],
    light: Vt[300],
    dark: Vt[700]
  } : {
    main: Vt[700],
    light: Vt[500],
    dark: Vt[900]
  };
}
function am(e = "light") {
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
function im(e = "light") {
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
function sm(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = he(e, em), a = e.primary || tm(t), i = e.secondary || nm(t), l = e.error || rm(t), c = e.info || om(t), u = e.success || am(t), f = e.warning || im(t);
  function v(d) {
    const g = Xa(d, Hr.text.primary) >= n ? Hr.text.primary : qa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = Xa(d, g);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${g} on ${d}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const b = ({
    color: d,
    name: g,
    mainShade: x = 500,
    lightShade: P = 300,
    darkShade: w = 700
  }) => {
    if (d = R({}, d), !d.main && d[x] && (d.main = d[x]), !d.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : qt(11, g ? ` (${g})` : "", x));
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
} });` : qt(12, g ? ` (${g})` : "", JSON.stringify(d.main)));
    return Ya(d, "light", P, r), Ya(d, "dark", w, r), d.contrastText || (d.contrastText = v(d.main)), d;
  }, p = {
    dark: Hr,
    light: qa
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), at(R({
    // A collection of common colors.
    common: R({}, Mn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: b({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: b({
      color: i,
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
    grey: Xf,
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
const lm = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function cm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ka = {
  textTransform: "uppercase"
}, Ja = '"Roboto", "Helvetica", "Arial", sans-serif';
function pm(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Ja,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: v
  } = n, b = he(n, lm);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, m = v || ((x) => `${x / u * p}rem`), d = (x, P, w, E, y) => R({
    fontFamily: r,
    fontWeight: x,
    fontSize: m(P),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === Ja ? {
    letterSpacing: `${cm(E / P)}em`
  } : {}, y, f), g = {
    h1: d(a, 96, 1.167, -1.5),
    h2: d(a, 60, 1.2, -0.5),
    h3: d(i, 48, 1.167, 0),
    h4: d(i, 34, 1.235, 0.25),
    h5: d(i, 24, 1.334, 0),
    h6: d(l, 20, 1.6, 0.15),
    subtitle1: d(i, 16, 1.75, 0.15),
    subtitle2: d(l, 14, 1.57, 0.1),
    body1: d(i, 16, 1.5, 0.15),
    body2: d(i, 14, 1.43, 0.15),
    button: d(l, 14, 1.75, 0.4, Ka),
    caption: d(i, 12, 1.66, 0.4),
    overline: d(i, 12, 2.66, 1, Ka),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return at(R({
    htmlFontSize: u,
    pxToRem: m,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, g), b, {
    clone: !1
    // No need to clone deep
  });
}
const um = 0.2, dm = 0.14, fm = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${um})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${dm})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${fm})`].join(",");
}
const mm = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], hm = mm, gm = ["duration", "easing", "delay"], bm = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, vm = {
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
function Za(e) {
  return `${Math.round(e)}ms`;
}
function ym(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function wm(e) {
  const t = R({}, bm, e.easing), n = R({}, vm, e.duration);
  return R({
    getAutoHeightDuration: ym,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, u = he(a, gm);
      if (process.env.NODE_ENV !== "production") {
        const f = (b) => typeof b == "string", v = (b) => !isNaN(parseFloat(b));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : Za(i)} ${l} ${typeof c == "string" ? c : Za(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const xm = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Em = xm, km = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Tm(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = he(e, km);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : qt(18));
  const l = sm(r), c = Do(e);
  let u = at(c, {
    mixins: Hf(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: hm.slice(),
    typography: pm(l, a),
    transitions: wm(o),
    zIndex: R({}, Em)
  });
  if (u = at(u, i), u = t.reduce((f, v) => at(f, v), u), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (b, p) => {
      let m;
      for (m in b) {
        const d = b[m];
        if (f.indexOf(m) !== -1 && Object.keys(d).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = et("", m);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${m}\` internal state.`, "You can not override it like this: ", JSON.stringify(b, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: d
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          b[m] = {};
        }
      }
    };
    Object.keys(u.components).forEach((b) => {
      const p = u.components[b].styleOverrides;
      p && b.indexOf("Mui") === 0 && v(p, b);
    });
  }
  return u.unstable_sxConfig = R({}, _o, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Ao({
      sx: v,
      theme: this
    });
  }, u;
}
const Nm = Tm(), jo = Nm, Lo = "$$material", Es = (e) => Jn(e) && e !== "classes", Om = Bf({
  themeId: Lo,
  defaultTheme: jo,
  rootShouldForwardProp: Es
}), Re = Om;
function Ln() {
  const e = xs(jo);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Lo] || e;
}
function pt({
  props: e,
  name: t
}) {
  return Lf({
    props: e,
    name: t,
    defaultTheme: jo,
    themeId: Lo
  });
}
function lo(e, t) {
  return lo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, lo(e, t);
}
function Cm(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, lo(e, t);
}
const Qa = {
  disabled: !1
};
var Sm = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const ks = J.createContext(null);
var Rm = function(t) {
  return t.scrollTop;
}, vn = "unmounted", kt = "exited", Tt = "entering", Gt = "entered", co = "exiting", ut = /* @__PURE__ */ function(e) {
  Cm(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var i = o, l = i && !i.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = kt, a.appearStatus = Tt) : c = Gt : r.unmountOnExit || r.mountOnEnter ? c = vn : c = kt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === vn ? {
      status: kt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== Tt && i !== Gt && (a = Tt) : (i === Tt || i === Gt) && (a = co);
    }
    this.updateStatus(!1, a);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, a, i, l;
    return a = i = l = o, o != null && typeof o != "number" && (a = o.exit, i = o.enter, l = o.appear !== void 0 ? o.appear : i), {
      exit: a,
      enter: i,
      appear: l
    };
  }, n.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === Tt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Un.findDOMNode(this);
          i && Rm(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === kt && this.setState({
        status: vn
      });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Un.findDOMNode(this), l], u = c[0], f = c[1], v = this.getTimeouts(), b = l ? v.appear : v.enter;
    if (!o && !i || Qa.disabled) {
      this.safeSetState({
        status: Gt
      }, function() {
        a.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, f), this.safeSetState({
      status: Tt
    }, function() {
      a.props.onEntering(u, f), a.onTransitionEnd(b, function() {
        a.safeSetState({
          status: Gt
        }, function() {
          a.props.onEntered(u, f);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Un.findDOMNode(this);
    if (!a || Qa.disabled) {
      this.safeSetState({
        status: kt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: co
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: kt
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, a) {
    a = this.setNextCallback(a), this.setState(o, a);
  }, n.setNextCallback = function(o) {
    var a = this, i = !0;
    return this.nextCallback = function(l) {
      i && (i = !1, a.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var i = this.props.nodeRef ? this.props.nodeRef.current : Un.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], u = c[0], f = c[1];
      this.props.addEndListener(u, f);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === vn)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = he(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ J.createElement(ks.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : J.cloneElement(J.Children.only(i), l))
    );
  }, t;
}(J.Component);
ut.contextType = ks;
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
    current: typeof Element > "u" ? s.any : function(e, t, n, r, o, a) {
      var i = e[t];
      return s.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, a);
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
    var n = Sm;
    t.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      o[a - 1] = arguments[a];
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
function zt() {
}
ut.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: zt,
  onEntering: zt,
  onEntered: zt,
  onExit: zt,
  onExiting: zt,
  onExited: zt
};
ut.UNMOUNTED = vn;
ut.EXITED = kt;
ut.ENTERING = Tt;
ut.ENTERED = Gt;
ut.EXITING = co;
const Ts = ut, Ns = (e) => e.scrollTop;
function pr(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: i = {}
  } = e;
  return {
    duration: (n = i.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = i.transitionTimingFunction) != null ? r : typeof a == "object" ? a[t.mode] : a,
    delay: i.transitionDelay
  };
}
const Pm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function po(e) {
  return `scale(${e}, ${e ** 2})`;
}
const $m = {
  entering: {
    opacity: 1,
    transform: po(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Gr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Vo = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: f,
    onExit: v,
    onExited: b,
    onExiting: p,
    style: m,
    timeout: d = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = Ts
  } = t, x = he(t, Pm), P = gn(), w = T.useRef(), E = Ln(), y = T.useRef(null), C = Ge(y, a.ref, n), N = (U) => (M) => {
    if (U) {
      const V = y.current;
      M === void 0 ? U(V) : U(V, M);
    }
  }, _ = N(f), D = N((U, M) => {
    Ns(U);
    const {
      duration: V,
      delay: te,
      easing: Q
    } = pr({
      style: m,
      timeout: d,
      easing: i
    }, {
      mode: "enter"
    });
    let S;
    d === "auto" ? (S = E.transitions.getAutoHeightDuration(U.clientHeight), w.current = S) : S = V, U.style.transition = [E.transitions.create("opacity", {
      duration: S,
      delay: te
    }), E.transitions.create("transform", {
      duration: Gr ? S : S * 0.666,
      delay: te,
      easing: Q
    })].join(","), c && c(U, M);
  }), j = N(u), k = N(p), O = N((U) => {
    const {
      duration: M,
      delay: V,
      easing: te
    } = pr({
      style: m,
      timeout: d,
      easing: i
    }, {
      mode: "exit"
    });
    let Q;
    d === "auto" ? (Q = E.transitions.getAutoHeightDuration(U.clientHeight), w.current = Q) : Q = M, U.style.transition = [E.transitions.create("opacity", {
      duration: Q,
      delay: V
    }), E.transitions.create("transform", {
      duration: Gr ? Q : Q * 0.666,
      delay: Gr ? V : V || Q * 0.333,
      easing: te
    })].join(","), U.style.opacity = 0, U.style.transform = po(0.75), v && v(U);
  }), $ = N(b);
  return /* @__PURE__ */ h(g, R({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: j,
    onEntering: _,
    onExit: O,
    onExited: $,
    onExiting: k,
    addEndListener: (U) => {
      d === "auto" && P.start(w.current || 0, U), r && r(y.current, U);
    },
    timeout: d === "auto" ? null : d
  }, x, {
    children: (U, M) => /* @__PURE__ */ T.cloneElement(a, R({
      style: R({
        opacity: 0,
        transform: po(0.75),
        visibility: U === "exited" && !l ? "hidden" : void 0
      }, $m[U], m, a.props.style),
      ref: C
    }, M))
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
  children: In.isRequired,
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
Vo.muiSupportAuto = !0;
const uo = Vo, Mm = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ei = Mm, Im = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], _m = Re(gs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Os = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = ws(), a = pt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: u,
    container: f,
    disablePortal: v,
    keepMounted: b,
    modifiers: p,
    open: m,
    placement: d,
    popperOptions: g,
    popperRef: x,
    transition: P,
    slots: w,
    slotProps: E
  } = a, y = he(a, Im), C = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, N = R({
    anchorEl: i,
    container: f,
    disablePortal: v,
    keepMounted: b,
    modifiers: p,
    open: m,
    placement: d,
    popperOptions: g,
    popperRef: x,
    transition: P
  }, y);
  return /* @__PURE__ */ h(_m, R({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: C
    },
    slotProps: E ?? u
  }, N, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Os.propTypes = {
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
  popperRef: To,
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
const Cs = Os;
function Am(e) {
  return et("MuiTooltip", e);
}
const Dm = bt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), ht = Dm, Bm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function jm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Lm = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ze(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ct(i, Am, t);
}, Vm = Re(Cs, {
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
}) => R({
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
  [`&[data-popper-placement*="right"] .${ht.arrow}`]: R({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${ht.arrow}`]: R({}, t.isRtl ? {
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
})), Fm = Re("div", {
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
}) => R({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : cr(e.palette.grey[700], 0.92),
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
  lineHeight: `${jm(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${ht.popper}[data-popper-placement*="left"] &`]: R({
    transformOrigin: "right center"
  }, t.isRtl ? R({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : R({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${ht.popper}[data-popper-placement*="right"] &`]: R({
    transformOrigin: "left center"
  }, t.isRtl ? R({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : R({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${ht.popper}[data-popper-placement*="top"] &`]: R({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${ht.popper}[data-popper-placement*="bottom"] &`]: R({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), zm = Re("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : cr(e.palette.grey[700], 0.9),
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
let Xn = !1;
const ti = new _n();
let dn = {
  x: 0,
  y: 0
};
function qn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Ss = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a, i, l, c, u, f, v, b, p, m, d, g, x, P, w, E, y;
  const C = pt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: N = !1,
    children: _,
    components: D = {},
    componentsProps: j = {},
    describeChild: k = !1,
    disableFocusListener: O = !1,
    disableHoverListener: $ = !1,
    disableInteractive: L = !1,
    disableTouchListener: U = !1,
    enterDelay: M = 100,
    enterNextDelay: V = 0,
    enterTouchDelay: te = 700,
    followCursor: Q = !1,
    id: S,
    leaveDelay: I = 0,
    leaveTouchDelay: z = 1500,
    onClose: q,
    onOpen: G,
    open: W,
    placement: Y = "bottom",
    PopperComponent: K,
    PopperProps: X = {},
    slotProps: Z = {},
    slots: ee = {},
    title: ie,
    TransitionComponent: B = uo,
    TransitionProps: ne
  } = C, A = he(C, Bm), se = /* @__PURE__ */ T.isValidElement(_) ? _ : /* @__PURE__ */ h("span", {
    children: _
  }), Te = Ln(), Pe = Te.direction === "rtl", [xe, wt] = T.useState(), [$e, tt] = T.useState(null), De = T.useRef(!1), nt = L || Q, Ne = gn(), Dt = gn(), xt = gn(), nn = gn(), [Vn, Wo] = Xi({
    controlled: W,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let rt = Vn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = T.useRef(W !== void 0);
    T.useEffect(() => {
      xe && xe.disabled && !re && ie !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, xe, re]);
  }
  const Rr = Wi(S), rn = T.useRef(), Fn = Sn(() => {
    rn.current !== void 0 && (document.body.style.WebkitUserSelect = rn.current, rn.current = void 0), nn.clear();
  });
  T.useEffect(() => Fn, [Fn]);
  const Xo = (re) => {
    ti.clear(), Xn = !0, Wo(!0), G && !rt && G(re);
  }, zn = Sn(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      ti.start(800 + I, () => {
        Xn = !1;
      }), Wo(!1), q && rt && q(re), Ne.start(Te.transitions.duration.shortest, () => {
        De.current = !1;
      });
    }
  ), Pr = (re) => {
    De.current && re.type !== "touchstart" || (xe && xe.removeAttribute("title"), Dt.clear(), xt.clear(), M || Xn && V ? Dt.start(Xn ? V : M, () => {
      Xo(re);
    }) : Xo(re));
  }, qo = (re) => {
    Dt.clear(), xt.start(I, () => {
      zn(re);
    });
  }, {
    isFocusVisibleRef: Yo,
    onBlur: dl,
    onFocus: fl,
    ref: ml
  } = qi(), [, Ko] = T.useState(!1), Jo = (re) => {
    dl(re), Yo.current === !1 && (Ko(!1), qo(re));
  }, Zo = (re) => {
    xe || wt(re.currentTarget), fl(re), Yo.current === !0 && (Ko(!0), Pr(re));
  }, Qo = (re) => {
    De.current = !0;
    const Be = se.props;
    Be.onTouchStart && Be.onTouchStart(re);
  }, ea = Pr, ta = qo, hl = (re) => {
    Qo(re), xt.clear(), Ne.clear(), Fn(), rn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", nn.start(te, () => {
      document.body.style.WebkitUserSelect = rn.current, Pr(re);
    });
  }, gl = (re) => {
    se.props.onTouchEnd && se.props.onTouchEnd(re), Fn(), xt.start(z, () => {
      zn(re);
    });
  };
  T.useEffect(() => {
    if (!rt)
      return;
    function re(Be) {
      (Be.key === "Escape" || Be.key === "Esc") && zn(Be);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [zn, rt]);
  const bl = Ge(se.ref, ml, wt, n);
  !ie && ie !== 0 && (rt = !1);
  const $r = T.useRef(), vl = (re) => {
    const Be = se.props;
    Be.onMouseMove && Be.onMouseMove(re), dn = {
      x: re.clientX,
      y: re.clientY
    }, $r.current && $r.current.update();
  }, on = {}, Mr = typeof ie == "string";
  k ? (on.title = !rt && Mr && !$ ? ie : null, on["aria-describedby"] = rt ? Rr : null) : (on["aria-label"] = Mr ? ie : null, on["aria-labelledby"] = rt && !Mr ? Rr : null);
  const ze = R({}, on, A, se.props, {
    className: Ce(A.className, se.props.className),
    onTouchStart: Qo,
    ref: bl
  }, Q ? {
    onMouseMove: vl
  } : {});
  process.env.NODE_ENV !== "production" && (ze["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const an = {};
  U || (ze.onTouchStart = hl, ze.onTouchEnd = gl), $ || (ze.onMouseOver = qn(ea, ze.onMouseOver), ze.onMouseLeave = qn(ta, ze.onMouseLeave), nt || (an.onMouseOver = ea, an.onMouseLeave = ta)), O || (ze.onFocus = qn(Zo, ze.onFocus), ze.onBlur = qn(Jo, ze.onBlur), nt || (an.onFocus = Zo, an.onBlur = Jo)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const yl = T.useMemo(() => {
    var re;
    let Be = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (re = X.popperOptions) != null && re.modifiers && (Be = Be.concat(X.popperOptions.modifiers)), R({}, X.popperOptions, {
      modifiers: Be
    });
  }, [$e, X]), sn = R({}, C, {
    isRtl: Pe,
    arrow: N,
    disableInteractive: nt,
    placement: Y,
    PopperComponentProp: K,
    touch: De.current
  }), Ir = Lm(sn), na = (r = (o = ee.popper) != null ? o : D.Popper) != null ? r : Vm, ra = (a = (i = (l = ee.transition) != null ? l : D.Transition) != null ? i : B) != null ? a : uo, oa = (c = (u = ee.tooltip) != null ? u : D.Tooltip) != null ? c : Fm, aa = (f = (v = ee.arrow) != null ? v : D.Arrow) != null ? f : zm, wl = bn(na, R({}, X, (b = Z.popper) != null ? b : j.popper, {
    className: Ce(Ir.popper, X == null ? void 0 : X.className, (p = (m = Z.popper) != null ? m : j.popper) == null ? void 0 : p.className)
  }), sn), xl = bn(ra, R({}, ne, (d = Z.transition) != null ? d : j.transition), sn), El = bn(oa, R({}, (g = Z.tooltip) != null ? g : j.tooltip, {
    className: Ce(Ir.tooltip, (x = (P = Z.tooltip) != null ? P : j.tooltip) == null ? void 0 : x.className)
  }), sn), kl = bn(aa, R({}, (w = Z.arrow) != null ? w : j.arrow, {
    className: Ce(Ir.arrow, (E = (y = Z.arrow) != null ? y : j.arrow) == null ? void 0 : E.className)
  }), sn);
  return /* @__PURE__ */ F(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(se, ze), /* @__PURE__ */ h(na, R({
      as: K ?? Cs,
      placement: Y,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: dn.y,
          left: dn.x,
          right: dn.x,
          bottom: dn.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: $r,
      open: xe ? rt : !1,
      id: Rr,
      transition: !0
    }, an, wl, {
      popperOptions: yl,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ h(ra, R({
        timeout: Te.transitions.duration.shorter
      }, re, xl, {
        children: /* @__PURE__ */ F(oa, R({}, El, {
          children: [ie, N ? /* @__PURE__ */ h(aa, R({}, kl, {
            ref: tt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ss.propTypes = {
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
  children: In.isRequired,
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
const Um = Ss;
var Fo = {}, Rs = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Rs);
var Hm = Rs.exports, Wr = {};
function Gm(e) {
  return et("MuiSvgIcon", e);
}
bt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Wm = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Xm = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ze(t)}`, `fontSize${Ze(n)}`]
  };
  return ct(o, Gm, r);
}, qm = Re("svg", {
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
  var n, r, o, a, i, l, c, u, f, v, b, p, m;
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
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (f = u.pxToRem) == null ? void 0 : f.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (b = (e.vars || e).palette) == null || (b = b[t.color]) == null ? void 0 : b.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.disabled,
      inherit: void 0
    }[t.color]
  };
}), zo = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: f = !1,
    titleAccess: v,
    viewBox: b = "0 0 24 24"
  } = r, p = he(r, Wm), m = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", d = R({}, r, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: b,
    hasSvgAsChild: m
  }), g = {};
  f || (g.viewBox = b);
  const x = Xm(d);
  return /* @__PURE__ */ F(qm, R({
    as: l,
    className: Ce(x.root, a),
    focusable: "false",
    color: u,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: n
  }, g, p, m && o.props, {
    ownerState: d,
    children: [m ? o.props.children : o, v ? /* @__PURE__ */ h("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (zo.propTypes = {
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
zo.muiName = "SvgIcon";
const ni = zo;
function Ps(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ h(ni, R({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = ni.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const Ym = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), es.configure(e);
  }
}, Km = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ze,
  createChainedFunction: ro,
  createSvgIcon: Ps,
  debounce: Gi,
  deprecatedPropType: Ep,
  isMuiElement: kp,
  ownerDocument: Se,
  ownerWindow: Yt,
  requirePropFactory: Tp,
  setRef: or,
  unstable_ClassNameGenerator: Ym,
  unstable_useEnhancedEffect: $t,
  unstable_useId: Wi,
  unsupportedProp: Cp,
  useControlled: Xi,
  useEventCallback: Sn,
  useForkRef: Ge,
  useIsFocusVisible: qi
}, Symbol.toStringTag, { value: "Module" })), Jm = /* @__PURE__ */ tp(Km);
var ri;
function Zm() {
  return ri || (ri = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Jm;
  }(Wr)), Wr;
}
var Qm = Hm;
Object.defineProperty(Fo, "__esModule", {
  value: !0
});
var $s = Fo.default = void 0, eh = Qm(Zm()), th = Tl;
$s = Fo.default = (0, eh.default)(/* @__PURE__ */ (0, th.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function oi(e, t, n) {
  return e ? /* @__PURE__ */ h(ki, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ h("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ms(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: u = !1,
    isDense: f = !0,
    isSubMenuParent: v = !1,
    hasDisabledGutters: b = !1,
    hasDivider: p = !1,
    focusVisibleClassName: m,
    id: d,
    children: g
  } = e, x = /* @__PURE__ */ h(
    tc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: f,
      disableGutters: b,
      divider: p,
      focusVisibleClassName: m,
      onClick: t,
      id: d,
      children: n ? /* @__PURE__ */ F(At, { children: [
        oi(a, n, !0),
        /* @__PURE__ */ h(nc, { primary: n, inset: !a && o }),
        v ? /* @__PURE__ */ h(ki, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ h($s, {}) }) : oi(i, n, !1)
      ] }) : g
    }
  );
  return r ? /* @__PURE__ */ h(Um, { title: r, placement: "right", children: /* @__PURE__ */ h("div", { children: x }) }) : x;
}
function Is(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function nh(e) {
  const [t, n] = ce(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, i = (u) => {
    n(u.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let u = Is(a).filter((f) => "menuItem" in f.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === r.id
    ), /* @__PURE__ */ h(Uo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ F(At, { children: [
    /* @__PURE__ */ h(Ms, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ h(
      rc,
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
const rh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Uo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = ur(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Is(t).filter((m) => !("menuItem" in m.group))
    ), v = Object.values(f).sort(
      (m, d) => (m.group.order || 0) - (d.group.order || 0)
    ), b = [];
    v.forEach((m) => {
      rh(m.id, t.items).forEach(
        (d) => b.push({ item: d, isLastItemInGroup: !1 })
      ), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !0);
    }), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !1);
    const p = b.some(
      (m) => "iconPathBefore" in m.item && m.item.iconPathBefore
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
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ h("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ h("div", { role: "menu", "aria-label": u, children: a.map((f, v) => {
    const { item: b } = f, p = l(f);
    if ("command" in b) {
      const m = b.group + v;
      return /* @__PURE__ */ h(
        Ms,
        {
          onClick: (d) => {
            n == null || n(d), r(b);
          },
          ...p
        },
        m
      );
    }
    return /* @__PURE__ */ h(
      nh,
      {
        parentMenuItem: b,
        parentItemProps: p,
        ...e
      },
      u + b.id
    );
  }) }, u);
}
function oh(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ h(Uo, { ...e, includedGroups: a });
}
function ah({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ F(
    Ti,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ h("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ h(oc, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ h(
          oh,
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
function ih({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = ur(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? i.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${l} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ h(
    Ti,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, l) => /* @__PURE__ */ h(
        ah,
        {
          commandHandler: e,
          menuDefinition: n,
          ...i,
          className: t
        },
        l
      ))
    }
  );
}
const _s = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (_s.displayName = "ListContext");
const sh = _s;
function lh(e) {
  return et("MuiList", e);
}
bt("MuiList", ["root", "padding", "dense", "subheader"]);
const ch = ["children", "className", "component", "dense", "disablePadding", "subheader"], ph = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return ct({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, lh, t);
}, uh = Re("ul", {
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
}) => R({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), As = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = r, f = he(r, ch), v = T.useMemo(() => ({
    dense: l
  }), [l]), b = R({}, r, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = ph(b);
  return /* @__PURE__ */ h(sh.Provider, {
    value: v,
    children: /* @__PURE__ */ F(uh, R({
      as: i,
      className: Ce(p.root, a),
      ref: n,
      ownerState: b
    }, f, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (As.propTypes = {
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
const dh = As, fh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Xr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ai(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Ds(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function fn(e, t, n, r, o, a) {
  let i = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Ds(l, a) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Bs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: i,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: f,
    variant: v = "selectedMenu"
  } = t, b = he(t, fh), p = T.useRef(null), m = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  $t(() => {
    o && p.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, E) => {
      const y = !p.current.style.width;
      if (w.clientHeight < p.current.clientHeight && y) {
        const C = `${Yi(Se(w))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = C, p.current.style.width = `calc(100% + ${C})`;
      }
      return p.current;
    }
  }), []);
  const d = (w) => {
    const E = p.current, y = w.key, C = Se(E).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), fn(E, C, u, c, Xr);
    else if (y === "ArrowUp")
      w.preventDefault(), fn(E, C, u, c, ai);
    else if (y === "Home")
      w.preventDefault(), fn(E, null, u, c, Xr);
    else if (y === "End")
      w.preventDefault(), fn(E, null, u, c, ai);
    else if (y.length === 1) {
      const N = m.current, _ = y.toLowerCase(), D = performance.now();
      N.keys.length > 0 && (D - N.lastTime > 500 ? (N.keys = [], N.repeating = !0, N.previousKeyMatched = !0) : N.repeating && _ !== N.keys[0] && (N.repeating = !1)), N.lastTime = D, N.keys.push(_);
      const j = C && !N.repeating && Ds(C, N);
      N.previousKeyMatched && (j || fn(E, C, !1, c, Xr, N)) ? w.preventDefault() : N.previousKeyMatched = !1;
    }
    f && f(w);
  }, g = Ge(p, n);
  let x = -1;
  T.Children.forEach(i, (w, E) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      x === E && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && rr.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (v === "selectedMenu" && w.props.selected || x === -1) && (x = E), x === E && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const P = T.Children.map(i, (w, E) => {
    if (E === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ h(dh, R({
    role: "menu",
    ref: g,
    className: l,
    onKeyDown: d,
    tabIndex: o ? 0 : -1
  }, b, {
    children: P
  }));
});
process.env.NODE_ENV !== "production" && (Bs.propTypes = {
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
const mh = Bs, hh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], gh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, js = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = Ln(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: i = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: f,
    onEntered: v,
    onEntering: b,
    onExit: p,
    onExited: m,
    onExiting: d,
    style: g,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: P = Ts
  } = t, w = he(t, hh), E = T.useRef(null), y = Ge(E, l.ref, n), C = (L) => (U) => {
    if (L) {
      const M = E.current;
      U === void 0 ? L(M) : L(M, U);
    }
  }, N = C(b), _ = C((L, U) => {
    Ns(L);
    const M = pr({
      style: g,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    L.style.webkitTransition = r.transitions.create("opacity", M), L.style.transition = r.transitions.create("opacity", M), f && f(L, U);
  }), D = C(v), j = C(d), k = C((L) => {
    const U = pr({
      style: g,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    L.style.webkitTransition = r.transitions.create("opacity", U), L.style.transition = r.transitions.create("opacity", U), p && p(L);
  }), O = C(m);
  return /* @__PURE__ */ h(P, R({
    appear: i,
    in: u,
    nodeRef: E,
    onEnter: _,
    onEntered: D,
    onEntering: N,
    onExit: k,
    onExited: O,
    onExiting: j,
    addEndListener: (L) => {
      a && a(E.current, L);
    },
    timeout: x
  }, w, {
    children: (L, U) => /* @__PURE__ */ T.cloneElement(l, R({
      style: R({
        opacity: 0,
        visibility: L === "exited" && !u ? "hidden" : void 0
      }, gh[L], g, l.props.style),
      ref: y
    }, U))
  }));
});
process.env.NODE_ENV !== "production" && (js.propTypes = {
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
  children: In.isRequired,
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
const bh = js;
function vh(e) {
  return et("MuiBackdrop", e);
}
bt("MuiBackdrop", ["root", "invisible"]);
const yh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], wh = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return ct({
    root: ["root", n && "invisible"]
  }, vh, t);
}, xh = Re("div", {
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
}) => R({
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
})), Ls = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a;
  const i = pt({
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
    slotProps: m = {},
    slots: d = {},
    TransitionComponent: g = bh,
    transitionDuration: x
  } = i, P = he(i, yh), w = R({}, i, {
    component: u,
    invisible: b
  }), E = wh(w), y = (r = m.root) != null ? r : v.root;
  return /* @__PURE__ */ h(g, R({
    in: p,
    timeout: x
  }, P, {
    children: /* @__PURE__ */ h(xh, R({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = d.root) != null ? a : f.Root) != null ? o : u,
      className: Ce(E.root, c, y == null ? void 0 : y.className),
      ownerState: R({}, w, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: n,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ls.propTypes = {
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
const Eh = Ls;
function kh(e) {
  return et("MuiModal", e);
}
bt("MuiModal", ["root", "hidden", "backdrop"]);
const Th = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Nh = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return ct({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, kh, r);
}, Oh = Re("div", {
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
}) => R({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Ch = Re(Eh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Vs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a, i, l, c;
  const u = pt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = Ch,
    BackdropProps: v,
    className: b,
    closeAfterTransition: p = !1,
    children: m,
    container: d,
    component: g,
    components: x = {},
    componentsProps: P = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: C = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: _ = !1,
    hideBackdrop: D = !1,
    keepMounted: j = !1,
    onBackdropClick: k,
    open: O,
    slotProps: $,
    slots: L
    // eslint-disable-next-line react/prop-types
  } = u, U = he(u, Th), M = R({}, u, {
    closeAfterTransition: p,
    disableAutoFocus: w,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: C,
    disableRestoreFocus: N,
    disableScrollLock: _,
    hideBackdrop: D,
    keepMounted: j
  }), {
    getRootProps: V,
    getBackdropProps: te,
    getTransitionProps: Q,
    portalRef: S,
    isTopModal: I,
    exited: z,
    hasTransition: q
  } = mu(R({}, M, {
    rootRef: n
  })), G = R({}, M, {
    exited: z
  }), W = Nh(G), Y = {};
  if (m.props.tabIndex === void 0 && (Y.tabIndex = "-1"), q) {
    const {
      onEnter: ne,
      onExited: A
    } = Q();
    Y.onEnter = ne, Y.onExited = A;
  }
  const K = (r = (o = L == null ? void 0 : L.root) != null ? o : x.Root) != null ? r : Oh, X = (a = (i = L == null ? void 0 : L.backdrop) != null ? i : x.Backdrop) != null ? a : f, Z = (l = $ == null ? void 0 : $.root) != null ? l : P.root, ee = (c = $ == null ? void 0 : $.backdrop) != null ? c : P.backdrop, ie = Mt({
    elementType: K,
    externalSlotProps: Z,
    externalForwardedProps: U,
    getSlotProps: V,
    additionalProps: {
      ref: n,
      as: g
    },
    ownerState: G,
    className: Ce(b, Z == null ? void 0 : Z.className, W == null ? void 0 : W.root, !G.open && G.exited && (W == null ? void 0 : W.hidden))
  }), B = Mt({
    elementType: X,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (ne) => te(R({}, ne, {
      onClick: (A) => {
        k && k(A), ne != null && ne.onClick && ne.onClick(A);
      }
    })),
    className: Ce(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, W == null ? void 0 : W.backdrop),
    ownerState: G
  });
  return !j && !O && (!q || z) ? null : /* @__PURE__ */ h(Rn, {
    ref: S,
    container: d,
    disablePortal: C,
    children: /* @__PURE__ */ F(K, R({}, ie, {
      children: [!D && f ? /* @__PURE__ */ h(X, R({}, B)) : null, /* @__PURE__ */ h(ar, {
        disableEnforceFocus: E,
        disableAutoFocus: w,
        disableRestoreFocus: N,
        isEnabled: I,
        open: O,
        children: /* @__PURE__ */ T.cloneElement(m, Y)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Vs.propTypes = {
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
  children: In.isRequired,
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
const Sh = Vs;
function Rh(e) {
  return et("MuiPaper", e);
}
bt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Ph = ["className", "component", "elevation", "square", "variant"], $h = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, a = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return ct(a, Rh, o);
}, Mh = Re("div", {
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
  return R({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && R({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${cr("#fff", ei(t.elevation))}, ${cr("#fff", ei(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Fs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = pt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, u = he(r, Ph), f = R({}, r, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = $h(f);
  return process.env.NODE_ENV !== "production" && Ln().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ h(Mh, R({
    as: a,
    ownerState: f,
    className: Ce(v.root, o),
    ref: n
  }, u));
});
process.env.NODE_ENV !== "production" && (Fs.propTypes = {
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
  elevation: tn(Zi, (e) => {
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
const Ih = Fs;
function _h(e) {
  return et("MuiPopover", e);
}
bt("MuiPopover", ["root", "paper"]);
const Ah = ["onEntering"], Dh = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Bh = ["slotProps"];
function ii(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function si(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function li(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function Qn(e) {
  return typeof e == "function" ? e() : e;
}
const jh = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"]
  }, _h, t);
}, Lh = Re(Sh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), zs = Re(Ih, {
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
}), Us = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a;
  const i = pt({
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
    container: m,
    elevation: d = 8,
    marginThreshold: g = 16,
    open: x,
    PaperProps: P = {},
    slots: w,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: C = uo,
    transitionDuration: N = "auto",
    TransitionProps: {
      onEntering: _
    } = {},
    disableScrollLock: D = !1
  } = i, j = he(i.TransitionProps, Ah), k = he(i, Dh), O = (r = E == null ? void 0 : E.paper) != null ? r : P, $ = T.useRef(), L = Ge($, O.ref), U = R({}, i, {
    anchorOrigin: u,
    anchorReference: v,
    elevation: d,
    marginThreshold: g,
    externalPaperSlotProps: O,
    transformOrigin: y,
    TransitionComponent: C,
    transitionDuration: N,
    TransitionProps: j
  }), M = jh(U), V = T.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const ne = Qn(c), A = ne && ne.nodeType === 1 ? ne : Se($.current).body, se = A.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + ii(se, u.vertical),
      left: se.left + si(se, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, f, v]), te = T.useCallback((ne) => ({
    vertical: ii(ne, y.vertical),
    horizontal: si(ne, y.horizontal)
  }), [y.horizontal, y.vertical]), Q = T.useCallback((ne) => {
    const A = {
      width: ne.offsetWidth,
      height: ne.offsetHeight
    }, se = te(A);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: li(se)
      };
    const Te = V();
    let Pe = Te.top - se.vertical, xe = Te.left - se.horizontal;
    const wt = Pe + A.height, $e = xe + A.width, tt = Yt(Qn(c)), De = tt.innerHeight - g, nt = tt.innerWidth - g;
    if (g !== null && Pe < g) {
      const Ne = Pe - g;
      Pe -= Ne, se.vertical += Ne;
    } else if (g !== null && wt > De) {
      const Ne = wt - De;
      Pe -= Ne, se.vertical += Ne;
    }
    if (process.env.NODE_ENV !== "production" && A.height > De && A.height && De && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${A.height - De}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), g !== null && xe < g) {
      const Ne = xe - g;
      xe -= Ne, se.horizontal += Ne;
    } else if ($e > nt) {
      const Ne = $e - nt;
      xe -= Ne, se.horizontal += Ne;
    }
    return {
      top: `${Math.round(Pe)}px`,
      left: `${Math.round(xe)}px`,
      transformOrigin: li(se)
    };
  }, [c, v, V, te, g]), [S, I] = T.useState(x), z = T.useCallback(() => {
    const ne = $.current;
    if (!ne)
      return;
    const A = Q(ne);
    A.top !== null && (ne.style.top = A.top), A.left !== null && (ne.style.left = A.left), ne.style.transformOrigin = A.transformOrigin, I(!0);
  }, [Q]);
  T.useEffect(() => (D && window.addEventListener("scroll", z), () => window.removeEventListener("scroll", z)), [c, D, z]);
  const q = (ne, A) => {
    _ && _(ne, A), z();
  }, G = () => {
    I(!1);
  };
  T.useEffect(() => {
    x && z();
  }), T.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      z();
    }
  } : null, [x, z]), T.useEffect(() => {
    if (!x)
      return;
    const ne = Gi(() => {
      z();
    }), A = Yt(c);
    return A.addEventListener("resize", ne), () => {
      ne.clear(), A.removeEventListener("resize", ne);
    };
  }, [c, x, z]);
  let W = N;
  N === "auto" && !C.muiSupportAuto && (W = void 0);
  const Y = m || (c ? Se(Qn(c)).body : void 0), K = (o = w == null ? void 0 : w.root) != null ? o : Lh, X = (a = w == null ? void 0 : w.paper) != null ? a : zs, Z = Mt({
    elementType: X,
    externalSlotProps: R({}, O, {
      style: S ? O.style : R({}, O.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: d,
      ref: L
    },
    ownerState: U,
    className: Ce(M.paper, O == null ? void 0 : O.className)
  }), ee = Mt({
    elementType: K,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: k,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: Y,
      open: x
    },
    ownerState: U,
    className: Ce(M.root, p)
  }), {
    slotProps: ie
  } = ee, B = he(ee, Bh);
  return /* @__PURE__ */ h(K, R({}, B, !ns(K) && {
    slotProps: ie,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ h(C, R({
      appear: !0,
      in: x,
      onEntering: q,
      onExited: G,
      timeout: W
    }, j, {
      children: /* @__PURE__ */ h(X, R({}, Z, {
        children: b
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Us.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: To,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: tn(s.oneOfType([it, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = Qn(e.anchorEl);
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
  elevation: Zi,
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
    component: mp
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
const Vh = Us;
function Fh(e) {
  return et("MuiMenu", e);
}
bt("MuiMenu", ["root", "paper", "list"]);
const zh = ["onEntering"], Uh = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Hh = {
  vertical: "top",
  horizontal: "right"
}, Gh = {
  vertical: "top",
  horizontal: "left"
}, Wh = (e) => {
  const {
    classes: t
  } = e;
  return ct({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Fh, t);
}, Xh = Re(Vh, {
  shouldForwardProp: (e) => Es(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), qh = Re(zs, {
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
}), Yh = Re(mh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Hs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o;
  const a = pt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: f = {},
    onClose: v,
    open: b,
    PaperProps: p = {},
    PopoverClasses: m,
    transitionDuration: d = "auto",
    TransitionProps: {
      onEntering: g
    } = {},
    variant: x = "selectedMenu",
    slots: P = {},
    slotProps: w = {}
  } = a, E = he(a.TransitionProps, zh), y = he(a, Uh), C = Ln(), N = C.direction === "rtl", _ = R({}, a, {
    autoFocus: i,
    disableAutoFocusItem: u,
    MenuListProps: f,
    onEntering: g,
    PaperProps: p,
    transitionDuration: d,
    TransitionProps: E,
    variant: x
  }), D = Wh(_), j = i && !u && b, k = T.useRef(null), O = (Q, S) => {
    k.current && k.current.adjustStyleForScrollbar(Q, C), g && g(Q, S);
  }, $ = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), v && v(Q, "tabKeyDown"));
  };
  let L = -1;
  T.Children.map(l, (Q, S) => {
    /* @__PURE__ */ T.isValidElement(Q) && (process.env.NODE_ENV !== "production" && rr.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (x === "selectedMenu" && Q.props.selected || L === -1) && (L = S));
  });
  const U = (r = P.paper) != null ? r : qh, M = (o = w.paper) != null ? o : p, V = Mt({
    elementType: P.root,
    externalSlotProps: w.root,
    ownerState: _,
    className: [D.root, c]
  }), te = Mt({
    elementType: U,
    externalSlotProps: M,
    ownerState: _,
    className: D.paper
  });
  return /* @__PURE__ */ h(Xh, R({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: N ? "right" : "left"
    },
    transformOrigin: N ? Hh : Gh,
    slots: {
      paper: U,
      root: P.root
    },
    slotProps: {
      root: V,
      paper: te
    },
    open: b,
    ref: n,
    transitionDuration: d,
    TransitionProps: R({
      onEntering: O
    }, E),
    ownerState: _
  }, y, {
    classes: m,
    children: /* @__PURE__ */ h(Yh, R({
      onKeyDown: $,
      actions: k,
      autoFocus: i && (L === -1 || u),
      autoFocusItem: j,
      variant: x
    }, f, {
      className: Ce(D.list, f.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
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
const Kh = Hs;
function rv({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
}) {
  var u;
  const [o, a] = J.useState(void 0), i = Oe(
    (f) => {
      f.preventDefault(), a(
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
    a(void 0);
  }, []), c = ur(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = n == null ? void 0 : n.items) == null ? void 0 : u.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ F(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        r,
        /* @__PURE__ */ h(
          Kh,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ h(
              Uo,
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
const Jh = Ps(/* @__PURE__ */ h("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Zh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const fo = (e, t, n = {}) => {
  const r = St(t);
  r.current = t;
  const o = St(n);
  o.current = Zh(o.current);
  const [a, i] = ce(() => r.current), [l, c] = ce(!0);
  return Ve(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const f = await e();
        u && (i(() => f), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [e]), [a, l];
};
function Qh({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, u] = ce(!1), [f, v] = ce(!1), b = Oe(() => {
    c && u(!1), v(!1);
  }, [c]), p = Oe((E) => {
    E.stopPropagation(), u((y) => {
      const C = !y;
      return C && E.shiftKey ? v(!0) : C || v(!1), C;
    });
  }, []), m = Oe(
    (E) => (b(), r(E)),
    [r, b]
  ), [d, g] = ce({ top: 1, left: 1 });
  Ve(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), C = window.scrollY, N = window.scrollX, _ = y.top + C + E.clientHeight, D = y.left + N;
        g({ top: _, left: D });
      }
    }
  }, [c, o]);
  const [x] = fo(
    Oe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [P] = fo(
    Oe(async () => (e == null ? void 0 : e(!0)) ?? n ?? x, [e, n, x, c]),
    n ?? x
  ), w = f && P ? P : x;
  return /* @__PURE__ */ F(At, { children: [
    /* @__PURE__ */ h(
      Ni,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: p,
        children: l ?? /* @__PURE__ */ h(Jh, {})
      }
    ),
    /* @__PURE__ */ h(
      ac,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
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
        children: w ? /* @__PURE__ */ h(
          ih,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: m,
            multiColumnMenu: w
          }
        ) : void 0
      }
    )
  ] });
}
function ov({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ h(
    Ni,
    {
      id: e,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
const mt = "scrBook", eg = "scrRef", Nt = "source", tg = "details", ng = "Scripture Reference", rg = "Scripture Book", Gs = "Type", og = "Details";
function ag(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${me.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: mt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? ng,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === mt ? Ar(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Qr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Ar(r.start),
      id: eg,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Ar(o.start);
      },
      sortingFn: (r, o) => Qr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: Nt,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Gs : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: tg,
      header: (e == null ? void 0 : e.detailsColumnName) ?? og,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function av({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, u] = ce([]), [f, v] = ce([{ id: mt, desc: !1 }]), [b, p] = ce(() => e.flatMap((k) => {
    const O = k.source;
    return k.data.map(($) => ({
      ...$,
      source: O
    }));
  })), [m, d] = ce({});
  Ve(() => {
    p(() => e.flatMap((k) => {
      const O = k.source;
      return k.data.map(($) => ({
        ...$,
        source: O
      }));
    }));
  }, [e]);
  const g = ur(
    () => ag(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: i
      },
      n
    ),
    [r, a, i, n]
  );
  Ve(() => {
    c.includes(Nt) ? v([
      { id: Nt, desc: !1 },
      { id: mt, desc: !1 }
    ]) : v([{ id: mt, desc: !1 }]);
  }, [c]);
  const x = Oe(
    (k, O) => !O || Qr(k, O) === 0 ? `${_r(k)}` : `${_r(k)}-${_r(O)}`,
    []
  ), P = Oe(
    (k) => `${x(k.start, k.end)} ${k.source} ${k.detail}`,
    [x]
  ), w = wi({
    data: b,
    columns: g,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: m
    },
    onGroupingChange: u,
    onSortingChange: v,
    onRowSelectionChange: d,
    getExpandedRowModel: ql(),
    getGroupedRowModel: Yl(),
    getCoreRowModel: xi(),
    getSortedRowModel: Ei(),
    getRowId: P,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Ve(() => {
    if (l) {
      const k = w.getSelectedRowModel().rowsById, O = Object.keys(k);
      if (O.length === 1) {
        const $ = b.find((L) => P(L) === O[0]) || void 0;
        $ && l($);
      }
    }
  }, [m, b, P, l, w]);
  const E = o ?? rg, y = a ?? Gs, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${E}`, value: [mt] },
    { label: `Group by ${y}`, value: [Nt] },
    {
      label: `Group by ${E} and ${y}`,
      value: [mt, Nt]
    },
    {
      label: `Group by ${y} and ${E}`,
      value: [Nt, mt]
    }
  ], N = (k) => {
    u(JSON.parse(k));
  }, _ = (k, O) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(O);
  }, D = (k, O) => k.getIsGrouped() ? "" : H("banded-row", O % 2 === 0 ? "even" : "odd"), j = (k, O, $) => {
    if (!((k == null ? void 0 : k.length) === 0 || O.depth < $.column.getGroupedIndex())) {
      if (O.getIsGrouped())
        switch (O.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (O.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ F("div", { className: "pr-twp pr-w-full", children: [
    !t && /* @__PURE__ */ F(
      tr,
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          N(k);
        },
        children: [
          /* @__PURE__ */ h(On, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ h(nr, {}) }),
          /* @__PURE__ */ h(Cn, { position: "item-aligned", children: /* @__PURE__ */ h(Xc, { children: C.map((k) => /* @__PURE__ */ h(Ye, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ F(mr, { className: "pr-p-0", children: [
      t && /* @__PURE__ */ h(hr, { children: w.getHeaderGroups().map((k) => /* @__PURE__ */ h(gt, { children: k.headers.filter((O) => O.column.columnDef.header).map((O) => /* @__PURE__ */ h(Nn, { colSpan: O.colSpan, children: O.isPlaceholder ? void 0 : /* @__PURE__ */ F("div", { children: [
        O.column.getCanGroup() ? /* @__PURE__ */ h(
          ke,
          {
            variant: "ghost",
            title: `Toggle grouping by ${O.column.columnDef.header}`,
            onClick: O.column.getToggleGroupingHandler(),
            type: "button",
            children: O.column.getIsGrouped() ? `🛑(${O.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        yn(O.column.columnDef.header, O.getContext())
      ] }) }, O.id)) }, k.id)) }),
      /* @__PURE__ */ h(gr, { children: w.getRowModel().rows.map((k, O) => /* @__PURE__ */ h(
        gt,
        {
          "data-state": k.getIsSelected() ? "selected" : "",
          className: H(D(k, O)),
          onClick: ($) => _(k, $),
          children: k.getVisibleCells().map(($) => {
            if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== Nt || !n)))
              return /* @__PURE__ */ h(
                Xt,
                {
                  className: H(
                    $.column.columnDef.id,
                    "pr-p-[1px]",
                    j(c, k, $)
                  ),
                  children: (() => $.getIsGrouped() ? /* @__PURE__ */ F(
                    ke,
                    {
                      variant: "ghost",
                      onClick: k.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        k.getIsExpanded() ? "👇" : "👉",
                        " ",
                        yn($.column.columnDef.cell, $.getContext()),
                        " (",
                        k.subRows.length,
                        ")"
                      ]
                    }
                  ) : yn($.column.columnDef.cell, $.getContext()))()
                },
                $.id
              );
          })
        },
        k.id
      )) })
    ] })
  ] });
}
const ig = bo(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Ws = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(Oi.Root, { ref: n, className: H(ig(), e), ...t }));
Ws.displayName = Oi.Root.displayName;
function sg({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: u,
  value: f,
  onChange: v,
  onFocus: b,
  onBlur: p
}) {
  return /* @__PURE__ */ F("div", { className: H("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ h(
      Ws,
      {
        htmlFor: e,
        className: H({
          "pr-text-red-600": n,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ h(
      fr,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: H(c, { "pr-border-red-600": n }),
        defaultValue: u,
        value: f,
        onChange: v,
        onFocus: b,
        onBlur: p
      }
    ),
    /* @__PURE__ */ h("p", { className: H({ "pr-hidden": !o }), children: o })
  ] });
}
function iv({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = ce(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ h(
    sg,
    {
      isFullWidth: n,
      className: "search-bar-input",
      placeholder: t,
      value: r,
      onChange: (i) => a(i.target.value)
    }
  );
}
function sv({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: u = "off",
  className: f,
  onChange: v,
  onChangeCommitted: b
}) {
  return /* @__PURE__ */ h(
    ic,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: a,
      marks: i,
      defaultValue: l,
      value: c,
      valueLabelDisplay: u,
      className: `papi-slider ${n} ${f ?? ""}`,
      onChange: v,
      onChangeCommitted: b
    }
  );
}
function lv({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: i,
  children: l
}) {
  const c = {
    action: (i == null ? void 0 : i.action) || l,
    message: i == null ? void 0 : i.message,
    className: r
  };
  return /* @__PURE__ */ h(
    sc,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: a,
      id: t,
      ContentProps: c
    }
  );
}
function cv({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ h(
    lc,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function pv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = St(void 0);
  return /* @__PURE__ */ h("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ h(cc, { position: "static", id: r, children: /* @__PURE__ */ F(pc, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ h(
      Qh,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ h("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const uv = Ae.Root, lg = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.List,
  {
    ref: n,
    className: H(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
lg.displayName = Ae.List.displayName;
const cg = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Trigger,
  {
    ref: n,
    className: H(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
cg.displayName = Ae.Trigger.displayName;
const pg = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Content,
  {
    ref: n,
    className: H(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
pg.displayName = Ae.Content.displayName;
const ug = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Root,
  {
    orientation: "vertical",
    ref: n,
    className: H("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
ug.displayName = Ae.List.displayName;
const dg = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.List,
  {
    ref: n,
    className: H(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
dg.displayName = Ae.List.displayName;
const dv = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Trigger,
  {
    ref: n,
    ...t,
    className: H(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), fg = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  Ae.Content,
  {
    ref: n,
    className: H(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
fg.displayName = Ae.Content.displayName;
const Yn = (e) => e === "asc" ? /* @__PURE__ */ h(Vl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ h(Fl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ h(zl, { className: "pr-ml-2 pr-h-4 pr-w-4" }), mg = (e, t, n, r, o) => [
  {
    accessorKey: "character",
    header: ({ column: a }) => /* @__PURE__ */ F(ke, { onClick: () => a.toggleSorting(void 0), children: [
      e,
      Yn(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: a }) => /* @__PURE__ */ F(ke, { onClick: () => a.toggleSorting(void 0), children: [
      t,
      Yn(a.getIsSorted())
    ] }),
    cell: ({ row: a }) => a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: a }) => /* @__PURE__ */ F(ke, { onClick: () => a.toggleSorting(void 0), children: [
      n,
      Yn(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: a, table: i }) => {
      const l = i.getSelectedRowModel().rows, c = [];
      return l.forEach((u) => {
        c.push(u.getValue("character"));
      }), /* @__PURE__ */ F("div", { children: [
        /* @__PURE__ */ h("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ F(ke, { onClick: () => a.toggleSorting(void 0), children: [
          r,
          Yn(a.getIsSorted())
        ] }) }),
        /* @__PURE__ */ F("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ h(ke, { children: /* @__PURE__ */ h(
            sa,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ h(ke, { children: /* @__PURE__ */ h(
            la,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ h(ke, { children: /* @__PURE__ */ h(
            ca,
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
    cell: ({ row: a }) => {
      const i = a.getValue("status");
      return i === !0 ? /* @__PURE__ */ h(sa, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : i === !1 ? /* @__PURE__ */ h(la, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ h(ca, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function hg({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: n,
  localizedStrings: r
}) {
  const o = r["%webView_inventory_table_header_character%"], a = r["%webView_inventory_table_header_unicode_value%"], i = r["%webView_inventory_table_header_count%"], l = r["%webView_inventory_table_header_status%"], c = (u, f) => {
    f.toggleAllRowsSelected(!1), u.toggleSelected(void 0), n(u.getValue("character"));
  };
  return /* @__PURE__ */ h("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ h(
    Zc,
    {
      columns: mg(
        o,
        a,
        i,
        l,
        t
      ),
      data: e,
      onRowClickHandler: c
    }
  ) });
}
const ci = (e, t, n) => {
  if (!e || e === "" || t === "")
    return [];
  const r = [], o = e.split(`
`);
  let a = "0", i = "0", l = 0;
  return o.forEach((c) => {
    const u = c.split(/\s+/);
    c.startsWith("\\c") && ([, a] = u, i = "0"), c.startsWith("\\v") && ([, i] = u, a === "0" && (a = n.chapterNum.toString()));
    for (let f = 0; f < u.length; f++)
      if (u[f].includes(t)) {
        const v = Math.max(0, f - 2), b = Math.min(u.length, f + 3), p = u.slice(v, b).join(" "), m = {
          reference: { ...n, chapterNum: +a, verseNum: +i },
          snippet: p,
          key: l
        };
        l += 1, r.push(m);
      }
  }), r;
};
function gg({
  selectedCharacter: e,
  text: t,
  scriptureReference: n,
  setScriptureReference: r,
  localizedStrings: o
}) {
  const a = o["%webView_inventory_occurrences_table_header_reference%"], i = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = ce(
    ci(t, e, n)
  );
  return Ve(
    () => c(ci(t, e, n)),
    [t, e, n]
  ), /* @__PURE__ */ F(mr, { children: [
    /* @__PURE__ */ h(hr, { children: /* @__PURE__ */ F(gt, { children: [
      /* @__PURE__ */ h(Nn, { children: a }),
      /* @__PURE__ */ h(Nn, { children: i })
    ] }) }),
    /* @__PURE__ */ h(gr, { children: l.map((u) => /* @__PURE__ */ F(
      gt,
      {
        onClick: () => {
          r(u.reference);
        },
        children: [
          /* @__PURE__ */ h(Xt, { children: `${me.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}` }),
          /* @__PURE__ */ h(Xt, { children: u.snippet })
        ]
      },
      u.key
    )) })
  ] });
}
const bg = async (e, t, n, r, o) => {
  const a = [];
  return Ol(e, "").forEach((i) => {
    if (n !== "" && !i.includes(n))
      return;
    const l = a.find((c) => c.character === i);
    if (l)
      l.count += 1;
    else {
      let c;
      if (r.includes(i) && (c = !0), o.includes(i) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const u = {
          character: i,
          count: 1,
          status: c
        };
        a.push(u);
      }
    }
  }), a;
};
function fv({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  projectId: r,
  getSetting: o,
  setSetting: a,
  getText: i
}) {
  const l = n["%webView_characterInventory_characters_all%"], c = n["%webView_characterInventory_characters_approved%"], u = n["%webView_characterInventory_characters_unapproved%"], f = n["%webView_characterInventory_characters_unknown%"], v = n["%webView_inventory_scope_book%"], b = n["%webView_inventory_scope_chapter%"], p = n["%webView_inventory_scope_verse%"], m = n["%webView_inventory_filter_text%"], [d, g] = ce([]), [x, P] = ce([]), [w, E] = ce(void 0), [y, C] = ce("book"), [N, _] = ce("all"), [D, j] = ce(""), [k, O] = ce([]), [$, L] = ce(""), U = (M, V) => {
    O((te) => {
      let Q = [];
      return M.forEach((S) => {
        Q = te.map((I) => I.character === S && I.status !== V ? { ...I, status: V } : I);
      }), g((S) => {
        let I = [...S];
        return M.forEach((z) => {
          V === !0 ? I.includes(z) || I.push(z) : I = I.filter((q) => q !== z);
        }), a("validCharacters", r, I), I;
      }), P((S) => {
        let I = [...S];
        return M.forEach((z) => {
          V === !1 ? I.includes(z) || I.push(z) : I = I.filter(
            (q) => q !== z
          );
        }), a("invalidCharacters", r, I), I;
      }), Q;
    });
  };
  return Ve(() => {
    (async () => {
      try {
        g(await o("validCharacters", r)), P(await o("invalidCharacters", r));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [r, o]), Ve(() => {
    (async () => {
      try {
        const V = await i(r, e, y);
        E(V);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [r, e, y, i]), Ve(() => {
    if (!w) {
      O([]);
      return;
    }
    (async () => {
      try {
        O(
          await bg(w, N, D, d, x)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [d, x, w, N, D]), /* @__PURE__ */ F("div", { className: "pr-twp", children: [
    /* @__PURE__ */ F("div", { className: "pr-flex", children: [
      /* @__PURE__ */ F(
        tr,
        {
          onValueChange: (M) => _(M),
          defaultValue: N,
          children: [
            /* @__PURE__ */ h(On, { children: /* @__PURE__ */ h(nr, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ F(Cn, { children: [
              /* @__PURE__ */ h(Ye, { value: "all", children: l }),
              /* @__PURE__ */ h(Ye, { value: "approved", children: c }),
              /* @__PURE__ */ h(Ye, { value: "unapproved", children: u }),
              /* @__PURE__ */ h(Ye, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ F(tr, { onValueChange: (M) => C(M), defaultValue: y, children: [
        /* @__PURE__ */ h(On, { children: /* @__PURE__ */ h(nr, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ F(Cn, { children: [
          /* @__PURE__ */ h(Ye, { value: "book", children: v }),
          /* @__PURE__ */ h(Ye, { value: "chapter", children: b }),
          /* @__PURE__ */ h(Ye, { value: "verse", children: p })
        ] })
      ] }),
      /* @__PURE__ */ h(
        fr,
        {
          className: "pr-rounded-md pr-border",
          placeholder: m,
          value: D,
          onChange: (M) => {
            j(M.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ h(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${$ !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ h(
          hg,
          {
            tableData: k,
            onStatusChange: U,
            onSelectCharacter: (M) => {
              L(M);
            },
            localizedStrings: n
          }
        )
      }
    ),
    $ !== "" && /* @__PURE__ */ h("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ h(
      gg,
      {
        selectedCharacter: $,
        text: w,
        scriptureReference: e,
        setScriptureReference: (M) => t(M),
        localizedStrings: n
      }
    ) })
  ] });
}
function mv({
  isDownloading: e,
  handleClick: t,
  buttonText: n
}) {
  return /* @__PURE__ */ h(
    ke,
    {
      className: H(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600": !n,
          "pr-w-20": n
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ h(go, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ F(At, { children: [
        /* @__PURE__ */ h(Ul, { size: 25, className: "pr-h-4 pr-w-4" }),
        n
      ] })
    }
  );
}
function hv({ isRemoving: e, handleClick: t }) {
  return /* @__PURE__ */ h(
    ke,
    {
      className: H(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ F(At, { children: [
        /* @__PURE__ */ h(go, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Removing..."
      ] }) : "Remove"
    }
  );
}
function gv({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ h(
    ke,
    {
      className: H(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ F(At, { children: [
        /* @__PURE__ */ h(go, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Ct() {
  return Ct = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Ct.apply(this, arguments);
}
const vg = ["children", "options"], pi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), ui = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, yg = ["style", "script"], wg = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, xg = /mailto:/i, Eg = /\n{2,}$/, Xs = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, kg = /^ *> ?/gm, Tg = /^ {2,}\n/, Ng = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, qs = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Ys = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Og = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Cg = /^(?:\n *)*\n/, Sg = /\r\n?/g, Rg = /^\[\^([^\]]+)](:.*)\n/, Pg = /^\[\^([^\]]+)]/, $g = /\f/g, Mg = /^\s*?\[(x|\s)\]/, Ks = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Js = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Zs = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, mo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, Ig = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Qs = /^<!--[\s\S]*?(?:-->)/, _g = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, ho = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Ag = /^\{.*\}$/, Dg = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Bg = /^<([^ >]+@[^ >]+)>/, jg = /^<([^ >]+:\/[^ >]+)>/, Lg = /-([a-z])?/gi, el = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, Vg = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, Fg = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, zg = /^\[([^\]]*)\] ?\[([^\]]*)\]/, Ug = /(\[|\])/g, Hg = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, Gg = /\t/g, Wg = /^ *\| */, Xg = /(^ *\||\| *$)/g, qg = / *$/, Yg = /^ *:-+: *$/, Kg = /^ *:-+ *$/, Jg = /^ *-+: *$/, Zg = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, Qg = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, eb = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, tb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, nb = /^\\([^0-9A-Za-z\s])/, rb = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, ob = /^\n+/, ab = /^([ \t]*)/, ib = /\\([^\\])/g, di = / *\n+$/, sb = /(?:^|\n)( *)$/, Ho = "(?:\\d+\\.)", Go = "(?:[*+-])";
function tl(e) {
  return "( *)(" + (e === 1 ? Ho : Go) + ") +";
}
const nl = tl(1), rl = tl(2);
function ol(e) {
  return new RegExp("^" + (e === 1 ? nl : rl));
}
const lb = ol(1), cb = ol(2);
function al(e) {
  return new RegExp("^" + (e === 1 ? nl : rl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Ho : Go) + " )[^\\n]*)*(\\n|$)", "gm");
}
const il = al(1), sl = al(2);
function ll(e) {
  const t = e === 1 ? Ho : Go;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const cl = ll(1), pl = ll(2);
function fi(e, t) {
  const n = t === 1, r = n ? cl : pl, o = n ? il : sl, a = n ? lb : cb;
  return { t(i, l, c) {
    const u = sb.exec(c);
    return u && (l.o || !l._ && !l.u) ? r.exec(i = u[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const u = n ? +i[2] : void 0, f = i[0].replace(Eg, `
`).match(o);
    let v = !1;
    return { p: f.map(function(b, p) {
      const m = a.exec(b)[0].length, d = new RegExp("^ {1," + m + "}", "gm"), g = b.replace(d, "").replace(a, ""), x = p === f.length - 1, P = g.indexOf(`

`) !== -1 || x && v;
      v = P;
      const w = c._, E = c.o;
      let y;
      c.o = !0, P ? (c._ = !1, y = g.replace(di, `

`)) : (c._ = !0, y = g.replace(di, ""));
      const C = l(y, c);
      return c._ = w, c.o = E, C;
    }), m: n, g: u };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(u, f) {
    return e("li", { key: f }, l(u, c));
  })) };
}
const pb = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, ub = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, ul = [Xs, qs, Ys, Ks, Zs, Js, Qs, el, il, cl, sl, pl], db = [...ul, /^[^\n]+(?:  \n|\n{2,})/, mo, ho];
function fb(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function mb(e) {
  return Jg.test(e) ? "right" : Yg.test(e) ? "center" : Kg.test(e) ? "left" : null;
}
function mi(e, t, n) {
  const r = n.$;
  n.$ = !0;
  const o = t(e.trim(), n);
  n.$ = r;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(qg, "")), a[a.length - 1].push(i));
  }), a;
}
function hb(e, t, n) {
  n._ = !0;
  const r = mi(e[1], t, n), o = e[2].replace(Xg, "").split("|").map(mb), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(u) {
      return mi(u, l, c);
    });
  }(e[3], t, n);
  return n._ = !1, { S: o, A: a, L: r, type: "table" };
}
function hi(e, t) {
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
function ot(e) {
  return function(t, n) {
    return n._ || n.u ? null : e.exec(t);
  };
}
function mn(e) {
  return function(t) {
    return e.exec(t);
  };
}
function gb(e, t, n) {
  if (t._ || t.u || n && !n.endsWith(`
`))
    return null;
  let r = "";
  e.split(`
`).every((a) => !ul.some((i) => i.test(a)) && (r += a + `
`, a.trim()));
  const o = r.trimEnd();
  return o == "" ? null : [r, o];
}
function Ut(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function gi(e) {
  return e.replace(ib, "$1");
}
function er(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !0, n.u = !0;
  const a = e(t, n);
  return n._ = r, n.u = o, a;
}
function bb(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !1, n.u = !0;
  const a = e(t, n);
  return n._ = r, n.u = o, a;
}
function vb(e, t, n) {
  return n._ = !1, e(t, n);
}
const qr = (e, t, n) => ({ v: er(t, e[1], n) });
function Yr() {
  return {};
}
function Kr() {
  return null;
}
function yb(...e) {
  return e.filter(Boolean).join(" ");
}
function Jr(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (; o.length && (r = r[o[0]], r !== void 0); )
    o.shift();
  return r || n;
}
var ae;
function wb(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || fb, t.namedCodesToUnicode = t.namedCodesToUnicode ? Ct({}, ui, t.namedCodesToUnicode) : ui;
  const n = t.createElement || T.createElement;
  function r(p, m, ...d) {
    const g = Jr(t.overrides, `${p}.props`, {});
    return n(function(x, P) {
      const w = Jr(P, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : Jr(P, `${x}.component`, x) : x;
    }(p, t.overrides), Ct({}, m, g, { className: yb(m == null ? void 0 : m.className, g.className) || void 0 }), ...d);
  }
  function o(p) {
    let m = !1;
    t.forceInline ? m = !0 : t.forceBlock || (m = Hg.test(p) === !1);
    const d = f(u(m ? p : `${p.trimEnd().replace(ob, "")}

`, { _: m }));
    for (; typeof d[d.length - 1] == "string" && !d[d.length - 1].trim(); )
      d.pop();
    if (t.wrapper === null)
      return d;
    const g = t.wrapper || (m ? "span" : "div");
    let x;
    if (d.length > 1 || t.forceWrapper)
      x = d;
    else {
      if (d.length === 1)
        return x = d[0], typeof x == "string" ? r("span", { key: "outer" }, x) : x;
      x = null;
    }
    return T.createElement(g, { key: "outer" }, x);
  }
  function a(p) {
    const m = p.match(wg);
    return m ? m.reduce(function(d, g, x) {
      const P = g.indexOf("=");
      if (P !== -1) {
        const w = function(N) {
          return N.indexOf("-") !== -1 && N.match(_g) === null && (N = N.replace(Lg, function(_, D) {
            return D.toUpperCase();
          })), N;
        }(g.slice(0, P)).trim(), E = function(N) {
          const _ = N[0];
          return (_ === '"' || _ === "'") && N.length >= 2 && N[N.length - 1] === _ ? N.slice(1, -1) : N;
        }(g.slice(P + 1).trim()), y = pi[w] || w, C = d[y] = function(N, _) {
          return N === "style" ? _.split(/;\s?/).reduce(function(D, j) {
            const k = j.slice(0, j.indexOf(":"));
            return D[k.replace(/(-[a-z])/g, (O) => O[1].toUpperCase())] = j.slice(k.length + 1).trim(), D;
          }, {}) : N === "href" ? Ut(_) : (_.match(Ag) && (_ = _.slice(1, _.length - 1)), _ === "true" || _ !== "false" && _);
        }(w, E);
        typeof C == "string" && (mo.test(C) || ho.test(C)) && (d[y] = T.cloneElement(o(C.trim()), { key: x }));
      } else
        g !== "style" && (d[pi[g] || g] = !0);
      return d;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: ot(Xs), i: ae.HIGH, l: (p, m, d) => ({ v: m(p[0].replace(kg, ""), d) }), h: (p, m, d) => r("blockquote", { key: d.k }, m(p.v, d)) }, breakLine: { t: mn(Tg), i: ae.HIGH, l: Yr, h: (p, m, d) => r("br", { key: d.k }) }, breakThematic: { t: ot(Ng), i: ae.HIGH, l: Yr, h: (p, m, d) => r("hr", { key: d.k }) }, codeBlock: { t: ot(Ys), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, m, d) => r("pre", { key: d.k }, r("code", Ct({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: ot(qs), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: ft(Og), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, m, d) => r("code", { key: d.k }, p.v) }, footnote: { t: ot(Rg), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: Kr }, footnoteReference: { t: dt(Pg), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, m, d) => r("a", { key: d.k, href: Ut(p.B) }, r("sup", { key: d.k }, p.v)) }, gfmTask: { t: dt(Mg), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, m, d) => r("input", { checked: p.R, key: d.k, readOnly: !0, type: "checkbox" }) }, heading: { t: ot(t.enforceAtxHeadings ? Js : Ks), i: ae.HIGH, l: (p, m, d) => ({ v: er(m, p[2], d), T: t.slugify(p[2]), C: p[1].length }), h: (p, m, d) => r(`h${p.C}`, { id: p.T, key: d.k }, m(p.v, d)) }, headingSetext: { t: ot(Zs), i: ae.MAX, l: (p, m, d) => ({ v: er(m, p[1], d), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: mn(Qs), i: ae.HIGH, l: () => ({}), h: Kr }, image: { t: ft(ub), i: ae.HIGH, l: (p) => ({ D: p[1], B: gi(p[2]), F: p[3] }), h: (p, m, d) => r("img", { key: d.k, alt: p.D || void 0, title: p.F || void 0, src: Ut(p.B) }) }, link: { t: dt(pb), i: ae.LOW, l: (p, m, d) => ({ v: bb(m, p[1], d), B: gi(p[2]), F: p[3] }), h: (p, m, d) => r("a", { key: d.k, href: Ut(p.B), title: p.F }, m(p.v, d)) }, linkAngleBraceStyleDetector: { t: dt(jg), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, m) => m.N ? null : dt(Dg)(p, m), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: dt(Bg), i: ae.MAX, l(p) {
    let m = p[1], d = p[1];
    return xg.test(d) || (d = "mailto:" + d), { v: [{ v: m.replace("mailto:", ""), type: "text" }], B: d, type: "link" };
  } }, orderedList: fi(r, 1), unorderedList: fi(r, 2), newlineCoalescer: { t: ot(Cg), i: ae.LOW, l: Yr, h: () => `
` }, paragraph: { t: gb, i: ae.LOW, l: qr, h: (p, m, d) => r("p", { key: d.k }, m(p.v, d)) }, ref: { t: dt(Vg), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: Kr }, refImage: { t: ft(Fg), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, m, d) => r("img", { key: d.k, alt: p.D, src: Ut(l[p.P].B), title: l[p.P].F }) }, refLink: { t: dt(zg), i: ae.MAX, l: (p, m, d) => ({ v: m(p[1], d), Z: m(p[0].replace(Ug, "\\$1"), d), P: p[2] }), h: (p, m, d) => l[p.P] ? r("a", { key: d.k, href: Ut(l[p.P].B), title: l[p.P].F }, m(p.v, d)) : r("span", { key: d.k }, m(p.Z, d)) }, table: { t: ot(el), i: ae.HIGH, l: hb, h: (p, m, d) => r("table", { key: d.k }, r("thead", null, r("tr", null, p.L.map(function(g, x) {
    return r("th", { key: x, style: hi(p, x) }, m(g, d));
  }))), r("tbody", null, p.A.map(function(g, x) {
    return r("tr", { key: x }, g.map(function(P, w) {
      return r("td", { key: w, style: hi(p, w) }, m(P, d));
    }));
  }))) }, tableSeparator: { t: function(p, m) {
    return m.$ ? (m._ = !0, Wg.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: mn(rb), i: ae.MIN, l: (p) => ({ v: p[0].replace(Ig, (m, d) => t.namedCodesToUnicode[d] ? t.namedCodesToUnicode[d] : m) }), h: (p) => p.v }, textBolded: { t: ft(Zg), i: ae.MED, l: (p, m, d) => ({ v: m(p[2], d) }), h: (p, m, d) => r("strong", { key: d.k }, m(p.v, d)) }, textEmphasized: { t: ft(Qg), i: ae.LOW, l: (p, m, d) => ({ v: m(p[2], d) }), h: (p, m, d) => r("em", { key: d.k }, m(p.v, d)) }, textEscaped: { t: ft(nb), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: ft(eb), i: ae.LOW, l: qr, h: (p, m, d) => r("mark", { key: d.k }, m(p.v, d)) }, textStrikethroughed: { t: ft(tb), i: ae.LOW, l: qr, h: (p, m, d) => r("del", { key: d.k }, m(p.v, d)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: mn(mo), i: ae.HIGH, l(p, m, d) {
    const [, g] = p[3].match(ab), x = new RegExp(`^${g}`, "gm"), P = p[3].replace(x, ""), w = (E = P, db.some((_) => _.test(E)) ? vb : er);
    var E;
    const y = p[1].toLowerCase(), C = yg.indexOf(y) !== -1;
    d.N = d.N || y === "a";
    const N = C ? p[3] : w(m, P, d);
    return d.N = !1, { O: a(p[2]), v: N, G: C, H: C ? y : p[1] };
  }, h: (p, m, d) => r(p.H, Ct({ key: d.k }, p.O), p.G ? p.v : m(p.v, d)) }, c.htmlSelfClosing = { t: mn(ho), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, m, d) => r(p.H, Ct({}, p.O, { key: d.k })) });
  const u = function(p) {
    let m = Object.keys(p);
    function d(g, x) {
      let P = [], w = "";
      for (; g; ) {
        let E = 0;
        for (; E < m.length; ) {
          const y = m[E], C = p[y], N = C.t(g, x, w);
          if (N) {
            const _ = N[0];
            g = g.substring(_.length);
            const D = C.l(N, d, x);
            D.type == null && (D.type = y), P.push(D), w = _;
            break;
          }
          E++;
        }
      }
      return P;
    }
    return m.sort(function(g, x) {
      let P = p[g].i, w = p[x].i;
      return P !== w ? P - w : g < x ? -1 : 1;
    }), function(g, x) {
      return d(function(P) {
        return P.replace(Sg, `
`).replace($g, "").replace(Gg, "    ");
      }(g), x);
    };
  }(c), f = (v = function(p) {
    return function(m, d, g) {
      return p[m.type].h(m, d, g);
    };
  }(c), function p(m, d = {}) {
    if (Array.isArray(m)) {
      const g = d.k, x = [];
      let P = !1;
      for (let w = 0; w < m.length; w++) {
        d.k = w;
        const E = p(m[w], d), y = typeof E == "string";
        y && P ? x[x.length - 1] += E : E !== null && x.push(E), P = y;
      }
      return d.k = g, x;
    }
    return v(m, p, d);
  });
  var v;
  const b = o(e);
  return i.length ? r("div", null, b, r("footer", { key: "footer" }, i.map(function(p) {
    return r("div", { id: t.slugify(p.j), key: p.j }, p.j, f(u(p.I, { _: !0 })));
  }))) : b;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const xb = (e) => {
  let { children: t, options: n } = e, r = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      a.indexOf(i = u[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, vg);
  return T.cloneElement(wb(t, n), r);
};
function bv({ markdown: e }) {
  return /* @__PURE__ */ h("div", { className: "pr-prose", children: /* @__PURE__ */ h(xb, { children: e }) });
}
const vv = (e, t) => {
  Ve(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Zr = () => !1, yv = (e, t) => {
  const [n] = fo(
    Oe(async () => {
      if (!e)
        return Zr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Zr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ve(() => () => {
    n !== Zr && n();
  }, [n]);
}, Eb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
    "div",
    {
      ref: n,
      className: H(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Eb.displayName = "Card";
const kb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
    "div",
    {
      ref: n,
      className: H("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
kb.displayName = "CardHeader";
const Tb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h(
    "h3",
    {
      ref: n,
      className: H("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Tb.displayName = "CardTitle";
const Nb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("p", { ref: n, className: H("pr-text-sm pr-text-muted-foreground", e), ...t }));
Nb.displayName = "CardDescription";
const Ob = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { ref: n, className: H("pr-p-6 pr-pt-0", e), ...t })
);
Ob.displayName = "CardContent";
const Cb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { ref: n, className: H("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Cb.displayName = "CardFooter";
const Sb = bo(
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
), Rb = J.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ h("div", { ref: r, role: "alert", className: H(Sb({ variant: t }), e), ...n }));
Rb.displayName = "Alert";
const Pb = J.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ F(
    "h5",
    {
      ref: n,
      className: H("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Pb.displayName = "AlertTitle";
const $b = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h("div", { ref: n, className: H("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
$b.displayName = "AlertDescription";
const Mb = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ F(
  hn.Root,
  {
    ref: n,
    className: H(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ h(hn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ h(hn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ h(hn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Mb.displayName = hn.Root.displayName;
const Ib = J.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ h(
  eo.Root,
  {
    className: H(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ h(
      eo.Thumb,
      {
        className: H(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Ib.displayName = eo.Root.displayName;
function _b(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
_b(`/*
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
.pr-grid {
  display: grid;
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
.pr-w-\\[350px\\] {
  width: 350px;
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
.pr-max-w-lg {
  max-width: 32rem;
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
.pr-gap-4 {
  gap: 1rem;
}
.pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.pr-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
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
.pr-text-balance {
  text-wrap: balance;
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
.pr-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
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
.pr-ps-12 {
  padding-inline-start: 3rem;
}
.pr-ps-4 {
  padding-inline-start: 1rem;
}
.pr-ps-8 {
  padding-inline-start: 2rem;
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
.pr-leading-relaxed {
  line-height: 1.625;
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
.check-item {
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
`, "top");
export {
  Rb as Alert,
  $b as AlertDescription,
  Pb as AlertTitle,
  ev as BookChapterControl,
  ke as Button,
  Eb as Card,
  Ob as CardContent,
  Nb as CardDescription,
  Cb as CardFooter,
  kb as CardHeader,
  Tb as CardTitle,
  tv as ChapterRangeSelector,
  fv as CharacterInventory,
  Qc as Checkbox,
  nv as Checklist,
  ma as ComboBox,
  rv as ContextMenu,
  Zc as DataTable,
  mv as DownloadButton,
  Ii as DropdownMenu,
  Ai as DropdownMenuCheckboxItem,
  xo as DropdownMenuContent,
  Kb as DropdownMenuGroup,
  _i as DropdownMenuItem,
  dr as DropdownMenuLabel,
  Jb as DropdownMenuPortal,
  Qb as DropdownMenuRadioGroup,
  $c as DropdownMenuRadioItem,
  Eo as DropdownMenuSeparator,
  Mc as DropdownMenuShortcut,
  Zb as DropdownMenuSub,
  Pc as DropdownMenuSubContent,
  Rc as DropdownMenuSubTrigger,
  Sc as DropdownMenuTrigger,
  ih as GridMenu,
  Qh as HamburgerMenuButton,
  ov as IconButton,
  fr as Input,
  Ws as Label,
  Ht as LabelPosition,
  bv as MarkdownRenderer,
  Ms as MenuItem,
  hv as RemoveButton,
  av as ScriptureResultsViewer,
  iv as SearchBar,
  tr as Select,
  Cn as SelectContent,
  Xc as SelectGroup,
  Ye as SelectItem,
  qc as SelectLabel,
  Bi as SelectScrollDownButton,
  Di as SelectScrollUpButton,
  Yc as SelectSeparator,
  On as SelectTrigger,
  nr as SelectValue,
  Mb as ShadCnSlider,
  Ib as ShadCnSwitch,
  sv as Slider,
  lv as Snackbar,
  cv as Switch,
  mr as Table,
  gr as TableBody,
  Gc as TableCaption,
  Xt as TableCell,
  Hc as TableFooter,
  Nn as TableHead,
  hr as TableHeader,
  gt as TableRow,
  uv as Tabs,
  pg as TabsContent,
  lg as TabsList,
  cg as TabsTrigger,
  sg as TextField,
  pv as Toolbar,
  gv as UpdateButton,
  ug as VerticalTabs,
  fg as VerticalTabsContent,
  dg as VerticalTabsList,
  dv as VerticalTabsTrigger,
  Wc as buttonVariants,
  vv as useEvent,
  yv as useEventAsync,
  fo as usePromise
};
//# sourceMappingURL=index.js.map
