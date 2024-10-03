import bp, { jsx as l, jsxs as E, Fragment as cr } from "react/jsx-runtime";
import * as D from "react";
import M, { forwardRef as nn, useCallback as Se, useState as fe, useRef as kr, useEffect as Xe, useLayoutEffect as aa, useMemo as lr } from "react";
import { History as wp, ChevronRight as di, Check as on, Circle as ui, ArrowDownWideNarrow as yp, Clock as xp, Bookmark as kp, X as Np, Search as Ep, ChevronsUpDown as Tp, FilterIcon as Sp, ChevronDown as an, ChevronUp as Cp, ArrowLeftIcon as Op, ChevronLeftIcon as Rp, ChevronRightIcon as Pp, ArrowRightIcon as $p, ArrowUpIcon as _p, ArrowDownIcon as Ip, ArrowUpDownIcon as Ap, CircleCheckIcon as Dp, CircleXIcon as Mp, CircleHelpIcon as Bp, ChevronLeft as jp, LoaderCircle as Vp, Download as Lp, Filter as zp, User as Fp, Link as Up, CircleHelp as Gp } from "lucide-react";
import Nr, { clsx as Hp } from "clsx";
import { extendTailwindMerge as Xp } from "tailwind-merge";
import * as me from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Wp } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Yp, formatScrRef as In, compareScrRefs as Zn, scrRefToBBBCCCVVV as An, getLocalizeKeyForScrollGroupId as ue, NumberFormat as qp, formatBytes as Kp } from "platform-bible-utils";
import { Slot as Jp } from "@radix-ui/react-slot";
import { cva as sn } from "class-variance-authority";
import * as fi from "@radix-ui/react-label";
import * as vt from "@radix-ui/react-radio-group";
import * as bt from "@radix-ui/react-popover";
import { Command as Re } from "cmdk";
import * as We from "@radix-ui/react-dialog";
import { useReactTable as mi, getCoreRowModel as hi, getPaginationRowModel as Zp, getSortedRowModel as gi, getFilteredRowModel as Qp, flexRender as ut, getExpandedRowModel as el, getGroupedRowModel as rl } from "@tanstack/react-table";
import * as be from "@radix-ui/react-select";
import * as pn from "@radix-ui/react-toggle-group";
import * as vi from "@radix-ui/react-toggle";
import * as Pe from "@radix-ui/react-tabs";
import * as bi from "@radix-ui/react-separator";
import * as Qn from "@radix-ui/react-checkbox";
import tl, { ThemeContext as nl, internal_processStyles as ol } from "@mui/styled-engine";
import { MenuItem as al, ListItemText as il, ListItemIcon as wi, Menu as sl, Grid as yi, List as pl, IconButton as xi, Drawer as ll, AppBar as cl, Toolbar as dl } from "@mui/material";
import * as ul from "react-dom";
import Vt from "react-dom";
import { Toaster as fl } from "sonner";
import { toast as F0 } from "sonner";
import * as pt from "@radix-ui/react-slider";
import * as eo from "@radix-ui/react-switch";
const ml = Xp({ prefix: "pr-" });
function R(...e) {
  return ml(Hp(e));
}
const St = M.forwardRef(
  ({ className: e, type: r, ...t }, n) => /* @__PURE__ */ l(
    "input",
    {
      type: r,
      className: R(
        "pr-twp pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...t
    }
  )
);
St.displayName = "Input";
const hl = nn(
  ({ handleSearch: e, handleKeyDown: r, handleOnClick: t, handleSubmit: n, ...o }, a) => /* @__PURE__ */ E("div", { className: "pr-relative", children: [
    /* @__PURE__ */ l(
      St,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && n(), r(i);
        },
        onClick: t,
        ref: a
      }
    ),
    /* @__PURE__ */ l(
      wp,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var gl = Object.defineProperty, vl = (e, r, t) => r in e ? gl(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t, ne = (e, r, t) => vl(e, typeof r != "symbol" ? r + "" : r, t);
const Tr = [
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
], ki = [
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
], ia = Cl();
function Kr(e, r = !0) {
  return r && (e = e.toUpperCase()), e in ia ? ia[e] : 0;
}
function go(e) {
  return Kr(e) > 0;
}
function bl(e) {
  const r = typeof e == "string" ? Kr(e) : e;
  return r >= 40 && r <= 66;
}
function wl(e) {
  return (typeof e == "string" ? Kr(e) : e) <= 39;
}
function Ni(e) {
  return e <= 66;
}
function yl(e) {
  const r = typeof e == "string" ? Kr(e) : e;
  return Si(r) && !Ni(r);
}
function* xl() {
  for (let e = 1; e <= Tr.length; e++)
    yield e;
}
const kl = 1, Ei = Tr.length;
function Nl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function vo(e, r = "***") {
  const t = e - 1;
  return t < 0 || t >= Tr.length ? r : Tr[t];
}
function Ti(e) {
  return e <= 0 || e > Ei ? "******" : ki[e - 1];
}
function El(e) {
  return Ti(Kr(e));
}
function Si(e) {
  const r = typeof e == "number" ? vo(e) : e;
  return go(r) && !ho.includes(r);
}
function Tl(e) {
  const r = typeof e == "number" ? vo(e) : e;
  return go(r) && ho.includes(r);
}
function Sl(e) {
  return ki[e - 1].includes("*obsolete*");
}
function Cl() {
  const e = {};
  for (let r = 0; r < Tr.length; r++)
    e[Tr[r]] = r + 1;
  return e;
}
const ce = {
  allBookIds: Tr,
  nonCanonicalIds: ho,
  bookIdToNumber: Kr,
  isBookIdValid: go,
  isBookNT: bl,
  isBookOT: wl,
  isBookOTNT: Ni,
  isBookDC: yl,
  allBookNumbers: xl,
  firstBook: kl,
  lastBook: Ei,
  extraBooks: Nl,
  bookNumberToId: vo,
  bookNumberToEnglishName: Ti,
  bookIdToEnglishName: El,
  isCanonical: Si,
  isExtraMaterial: Tl,
  isObsolete: Sl
};
var Ge = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ge || {});
const _e = class {
  // private versInfo: Versification;
  constructor(r) {
    if (ne(this, "name"), ne(this, "fullPath"), ne(this, "isPresent"), ne(this, "hasVerseSegments"), ne(this, "isCustomized"), ne(this, "baseVersification"), ne(this, "scriptureBooks"), ne(this, "_type"), r == null)
      throw new Error("Argument undefined");
    typeof r == "string" ? (this.name = r, this._type = Ge[r]) : (this._type = r, this.name = Ge[r]);
  }
  get type() {
    return this._type;
  }
  equals(r) {
    return !r.type || !this.type ? !1 : r.type === this.type;
  }
};
ne(_e, "Original", new _e(Ge.Original)), ne(_e, "Septuagint", new _e(Ge.Septuagint)), ne(_e, "Vulgate", new _e(Ge.Vulgate)), ne(_e, "English", new _e(Ge.English)), ne(_e, "RussianProtestant", new _e(Ge.RussianProtestant)), ne(_e, "RussianOrthodox", new _e(Ge.RussianOrthodox));
let gr = _e;
function sa(e, r) {
  const t = r[0];
  for (let n = 1; n < r.length; n++)
    e = e.split(r[n]).join(t);
  return e.split(t);
}
var Ci = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ci || {});
const Te = class oe {
  constructor(r, t, n, o) {
    if (ne(this, "firstChapter"), ne(this, "lastChapter"), ne(this, "lastVerse"), ne(this, "hasSegmentsDefined"), ne(this, "text"), ne(this, "BBBCCCVVVS"), ne(this, "longHashCode"), ne(this, "versification"), ne(this, "rtlMark", "‏"), ne(this, "_bookNum", 0), ne(this, "_chapterNum", 0), ne(this, "_verseNum", 0), ne(this, "_verse"), n == null && o == null)
      if (r != null && typeof r == "string") {
        const a = r, i = t != null && t instanceof gr ? t : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (r != null && typeof r == "number") {
        const a = t != null && t instanceof gr ? t : void 0;
        this.setEmpty(a), this._verseNum = r % oe.chapterDigitShifter, this._chapterNum = Math.floor(
          r % oe.bookDigitShifter / oe.chapterDigitShifter
        ), this._bookNum = Math.floor(r / oe.bookDigitShifter);
      } else if (t == null)
        if (r != null && r instanceof oe) {
          const a = r;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (r == null)
            return;
          const a = r instanceof gr ? r : oe.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (r != null && t != null && n != null)
      if (typeof r == "string" && typeof t == "string" && typeof n == "string")
        this.setEmpty(o), this.updateInternal(r, t, n);
      else if (typeof r == "number" && typeof t == "number" && typeof n == "number")
        this._bookNum = r, this._chapterNum = t, this._verseNum = n, this.versification = o ?? oe.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(r) {
    return r.length > 0 && "0123456789".includes(r[0]) && !r.endsWith(this.verseRangeSeparator) && !r.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(r) {
    let t;
    try {
      return t = new oe(r), { success: !0, verseRef: t };
    } catch (n) {
      if (n instanceof tt)
        return t = new oe(), { success: !1, verseRef: t };
      throw n;
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
  static getBBBCCCVVV(r, t, n) {
    return r % oe.bcvMaxValue * oe.bookDigitShifter + (t >= 0 ? t % oe.bcvMaxValue * oe.chapterDigitShifter : 0) + (n >= 0 ? n % oe.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(r) {
    const { book: t, chapterNum: n, verseNum: o, verse: a, versificationStr: i } = r, s = a || o.toString();
    let c;
    return i && (c = new gr(i)), t ? new oe(t, n.toString(), s, c) : new oe();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(r) {
    let t;
    if (!r)
      return t = -1, { success: !0, vNum: t };
    t = 0;
    let n;
    for (let o = 0; o < r.length; o++) {
      if (n = r[o], n < "0" || n > "9")
        return o === 0 && (t = -1), { success: !1, vNum: t };
      if (t = t * 10 + +n - 0, t > oe.bcvMaxValue)
        return t = -1, { success: !1, vNum: t };
    }
    return { success: !0, vNum: t };
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
    return ce.bookNumberToId(this.bookNum, "");
  }
  set book(r) {
    this.bookNum = ce.bookIdToNumber(r);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(r) {
    const t = +r;
    this._chapterNum = Number.isInteger(t) ? t : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(r) {
    const { success: t, vNum: n } = oe.tryGetVerseNum(r);
    this._verse = t ? void 0 : r.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = oe.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(r) {
    if (r <= 0 || r > ce.lastBook)
      throw new tt(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = r;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(r) {
    this.chapterNum = r;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(r) {
    this._verseNum = r;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var r;
    return (r = this.versification) == null ? void 0 : r.name;
  }
  set versificationStr(r) {
    this.versification = this.versification != null ? new gr(r) : void 0;
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
  parse(r) {
    if (r = r.replace(this.rtlMark, ""), r.includes("/")) {
      const a = r.split("/");
      if (r = a[0], a.length > 1)
        try {
          const i = +a[1].trim();
          this.versification = new gr(Ge[i]);
        } catch {
          throw new tt("Invalid reference : " + r);
        }
    }
    const t = r.trim().split(" ");
    if (t.length !== 2)
      throw new tt("Invalid reference : " + r);
    const n = t[1].split(":"), o = +n[0];
    if (n.length !== 2 || ce.bookIdToNumber(t[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(n[1]))
      throw new tt("Invalid reference : " + r);
    this.updateInternal(t[0], n[0], n[1]);
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
    const r = this.book;
    return r === "" ? "" : `${r} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let r = this.verse;
    (r === "" || r === this.verseNum.toString()) && (r = void 0);
    const t = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: r,
      versificationStr: this.versificationStr
    };
    return r || delete t.verse, t;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(r) {
    return r instanceof oe ? r._bookNum === this._bookNum && r._chapterNum === this._chapterNum && r._verseNum === this._verseNum && r.verse === this.verse && (r.versification == null && this.versification == null || r.versification != null && this.versification != null && r.versification.equals(this.versification)) : !1;
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
  allVerses(r = !1, t = oe.verseRangeSeparators, n = oe.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = sa(this._verse, n);
    for (const i of a.map((s) => sa(s, t))) {
      const s = this.clone();
      s.verse = i[0];
      const c = s.verseNum;
      if (o.push(s), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !r)
          for (let u = c + 1; u < d.verseNum; u++) {
            const b = new oe(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(b);
          }
        o.push(d);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(r, t) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const o of this.allVerses(!0, r, t)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
      const i = o.BBBCCCVVV;
      if (n > i)
        return 3;
      if (n === i)
        return 4;
      n = i;
    }
    return 0;
  }
  /**
   * Gets whether a single verse reference is valid.
   */
  get internalValid() {
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ce.lastBook ? 2 : (ce.isCanonical(this._bookNum), 0);
  }
  setEmpty(r = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = r;
  }
  updateInternal(r, t, n) {
    this.bookNum = ce.bookIdToNumber(r), this.chapter = t, this.verse = n;
  }
};
ne(Te, "defaultVersification", gr.English), ne(Te, "verseRangeSeparator", "-"), ne(Te, "verseSequenceIndicator", ","), ne(Te, "verseRangeSeparators", [Te.verseRangeSeparator]), ne(Te, "verseSequenceIndicators", [Te.verseSequenceIndicator]), ne(Te, "chapterDigitShifter", 1e3), ne(Te, "bookDigitShifter", Te.chapterDigitShifter * Te.chapterDigitShifter), ne(Te, "bcvMaxValue", Te.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ne(Te, "ValidStatusType", Ci);
let tt = class extends Error {
};
const bo = me.Root, Oi = me.Trigger, Ol = me.Group, i0 = me.Portal, s0 = me.Sub, p0 = me.RadioGroup, Rl = M.forwardRef(({ className: e, inset: r, children: t, ...n }, o) => /* @__PURE__ */ E(
  me.SubTrigger,
  {
    ref: o,
    className: R(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      r && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ l(di, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Rl.displayName = me.SubTrigger.displayName;
const Pl = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  me.SubContent,
  {
    ref: t,
    className: R(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
));
Pl.displayName = me.SubContent.displayName;
const ln = M.forwardRef(({ className: e, sideOffset: r = 4, ...t }, n) => /* @__PURE__ */ l(me.Portal, { children: /* @__PURE__ */ l(
  me.Content,
  {
    ref: n,
    sideOffset: r,
    className: R(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
) }));
ln.displayName = me.Content.displayName;
const Ri = M.forwardRef(({ className: e, inset: r, ...t }, n) => /* @__PURE__ */ l(
  me.Item,
  {
    ref: n,
    className: R(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      r && "pr-pl-8",
      e
    ),
    ...t
  }
));
Ri.displayName = me.Item.displayName;
const wo = M.forwardRef(({ className: e, children: r, checked: t, ...n }, o) => /* @__PURE__ */ E(
  me.CheckboxItem,
  {
    ref: o,
    className: R(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: t,
    ...n,
    children: [
      /* @__PURE__ */ l("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ l(me.ItemIndicator, { children: /* @__PURE__ */ l(on, { className: "pr-h-4 pr-w-4" }) }) }),
      r
    ]
  }
));
wo.displayName = me.CheckboxItem.displayName;
const Pi = M.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ E(
  me.RadioItem,
  {
    ref: n,
    className: R(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ l("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ l(me.ItemIndicator, { children: /* @__PURE__ */ l(ui, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      r
    ]
  }
));
Pi.displayName = me.RadioItem.displayName;
const Ct = M.forwardRef(({ className: e, inset: r, ...t }, n) => /* @__PURE__ */ l(
  me.Label,
  {
    ref: n,
    className: R("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", r && "pr-pl-8", e),
    ...t
  }
));
Ct.displayName = me.Label.displayName;
const cn = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  me.Separator,
  {
    ref: t,
    className: R("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...r
  }
));
cn.displayName = me.Separator.displayName;
function $l({ className: e, ...r }) {
  return /* @__PURE__ */ l(
    "span",
    {
      className: R("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...r
    }
  );
}
$l.displayName = "DropdownMenuShortcut";
const _l = nn(
  ({
    bookId: e,
    handleSelectBook: r,
    isSelected: t,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, s) => /* @__PURE__ */ E(
    Ri,
    {
      ref: s,
      textValue: e,
      className: R("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": t
      }),
      onSelect: (c) => {
        c.preventDefault(), r();
      },
      onKeyDown: (c) => {
        o(c);
      },
      onFocus: n,
      onMouseMove: n,
      children: [
        /* @__PURE__ */ l(
          "span",
          {
            className: R(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": t,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: ce.bookIdToEnglishName(e)
          }
        ),
        t && /* @__PURE__ */ l("div", { children: i })
      ]
    },
    e
  )
);
function Il({
  handleSelectChapter: e,
  endChapter: r,
  activeChapter: t,
  highlightedChapter: n,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: r }, (s, c) => c + 1), i = Se(
    (s) => {
      o(s);
    },
    [o]
  );
  return /* @__PURE__ */ l("div", { className: R("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((s) => /* @__PURE__ */ l(
    "div",
    {
      className: R(
        "pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": s === t,
          "pr-bg-amber-200": s === n
        }
      ),
      onClick: (c) => {
        c.preventDefault(), c.stopPropagation(), e(s);
      },
      role: "button",
      onKeyDown: (c) => {
        c.key === "Enter" && e(s);
      },
      tabIndex: 0,
      onMouseMove: () => i(s),
      children: s
    },
    s
  )) });
}
function Al({ handleSort: e, handleLocationHistory: r, handleBookmarks: t }) {
  return /* @__PURE__ */ E(Ct, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ l("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ l(
        yp,
        {
          onClick: e,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ l(
        xp,
        {
          onClick: r,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ l(
        kp,
        {
          onClick: t,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      )
    ] })
  ] });
}
const ft = ce.allBookIds, Dl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, pa = ["OT", "NT", "DC"], Ml = 32 + 32 + 32, Bl = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], jl = (e) => ({
  OT: ft.filter((t) => ce.isBookOT(t)),
  NT: ft.filter((t) => ce.isBookNT(t)),
  DC: ft.filter((t) => ce.isBookDC(t))
})[e], nt = (e) => Yp(ce.bookIdToNumber(e));
function Vl() {
  return ft.map((r) => ce.bookIdToEnglishName(r));
}
function Ll(e) {
  return Vl().includes(e);
}
function zl(e) {
  const r = e.toLowerCase().replace(/^\w/, (t) => t.toUpperCase());
  if (Ll(r))
    return ft.find((n) => ce.bookIdToEnglishName(n) === r);
}
function l0({ scrRef: e, handleSubmit: r }) {
  const [t, n] = fe(""), [o, a] = fe(
    ce.bookNumberToId(e.bookNum)
  ), [i, s] = fe(e.chapterNum ?? 0), [c, d] = fe(
    ce.bookNumberToId(e.bookNum)
  ), [u, b] = fe(!1), [p, h] = fe(u), f = kr(void 0), g = kr(void 0), v = kr(void 0), y = Se(
    (k) => jl(k).filter((j) => {
      const B = ce.bookIdToEnglishName(j).toLowerCase(), Z = t.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return B.includes(Z) || // Match book name
      j.toLowerCase().includes(Z);
    }),
    [t]
  ), C = (k) => {
    n(k);
  }, T = kr(!1), x = Se((k) => {
    if (T.current) {
      T.current = !1;
      return;
    }
    b(k);
  }, []), w = Se(
    (k, j, B, Z) => {
      if (s(
        ce.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), j || nt(k) === -1) {
        r({
          bookNum: ce.bookIdToNumber(k),
          chapterNum: B || 1,
          verseNum: Z || 1
        }), b(!1), n("");
        return;
      }
      a(o !== k ? k : ""), b(!j);
    },
    [r, e.bookNum, e.chapterNum, o]
  ), O = (k) => {
    k <= 0 || k > nt(o) || w(o, !0, k);
  }, P = Se(() => {
    Bl.forEach((k) => {
      const j = t.match(k);
      if (j) {
        const [B, Z = void 0, J = void 0] = j.slice(1), X = zl(B);
        (ce.isBookIdValid(B) || X) && w(
          X ?? B,
          !0,
          Z ? parseInt(Z, 10) : 1,
          J ? parseInt(J, 10) : 1
        );
      }
    });
  }, [w, t]), V = Se(
    (k) => {
      u ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null && g.current.focus(), k.preventDefault()) : b(!0);
    },
    [u]
  ), S = (k) => {
    const { key: j } = k;
    j === "ArrowRight" || j === "ArrowLeft" || j === "ArrowDown" || j === "ArrowUp" || j === "Enter" || (f.current.dispatchEvent(new KeyboardEvent("keydown", { key: j })), f.current.focus());
  }, $ = (k) => {
    const { key: j } = k;
    if (c === o) {
      if (j === "Enter") {
        k.preventDefault(), w(o, !0, i);
        return;
      }
      let B = 0;
      if (j === "ArrowRight")
        if (i < nt(c))
          B = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (j === "ArrowLeft")
        if (i > 1)
          B = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        j === "ArrowDown" ? B = 6 : j === "ArrowUp" && (B = -6);
      i + B <= 0 || i + B > nt(c) ? s(0) : B !== 0 && (s(i + B), k.preventDefault());
    }
  };
  return Xe(() => {
    o === c ? o === ce.bookNumberToId(e.bookNum) ? s(e.chapterNum) : s(1) : s(0);
  }, [c, e.bookNum, e.chapterNum, o]), aa(() => {
    h(u);
  }, [u]), aa(() => {
    const k = setTimeout(() => {
      if (p && g.current && v.current) {
        const B = v.current.offsetTop - Ml;
        g.current.scrollTo({ top: B, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [p]), /* @__PURE__ */ l("div", { className: "pr-twp pr-flex", children: /* @__PURE__ */ E(bo, { modal: !1, open: u, onOpenChange: x, children: [
    /* @__PURE__ */ l(Oi, { asChild: !0, children: /* @__PURE__ */ l(
      hl,
      {
        ref: f,
        value: t,
        handleSearch: C,
        handleKeyDown: V,
        handleOnClick: () => {
          a(ce.bookNumberToId(e.bookNum)), d(ce.bookNumberToId(e.bookNum)), s(e.chapterNum > 0 ? e.chapterNum : 0), b(!0), f.current.focus();
        },
        onFocus: () => {
          T.current = !0;
        },
        handleSubmit: P,
        placeholder: `${ce.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ E(
      ln,
      {
        className: "pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: S,
        align: "start",
        ref: g,
        children: [
          /* @__PURE__ */ l(
            Al,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          pa.map(
            (k, j) => y(k).length > 0 && /* @__PURE__ */ E("div", { children: [
              /* @__PURE__ */ l(Ct, { className: "pr-font-semibold pr-text-foreground/80", children: Dl[k] }),
              y(k).map((B) => /* @__PURE__ */ l("div", { children: /* @__PURE__ */ l(
                _l,
                {
                  bookId: B,
                  handleSelectBook: () => w(B, !1),
                  isSelected: o === B,
                  handleHighlightBook: () => d(B),
                  handleKeyDown: $,
                  bookType: k,
                  ref: (Z) => {
                    o === B && (v.current = Z);
                  },
                  children: /* @__PURE__ */ l(
                    Il,
                    {
                      handleSelectChapter: O,
                      endChapter: nt(B),
                      activeChapter: e.bookNum === ce.bookIdToNumber(B) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (Z) => {
                        s(Z);
                      }
                    }
                  )
                }
              ) }, B)),
              pa.length - 1 !== j ? /* @__PURE__ */ l(cn, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const Fl = sn(
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
), ye = M.forwardRef(
  ({ className: e, variant: r, size: t, asChild: n = !1, ...o }, a) => /* @__PURE__ */ l(n ? Jp : "button", { className: R(Fl({ variant: r, size: t, className: e })), ref: a, ...o })
);
ye.displayName = "Button";
const Ul = sn(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Ze = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(fi.Root, { ref: t, className: R("pr-twp", Ul(), e), ...r }));
Ze.displayName = fi.Root.displayName;
const $i = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  vt.Root,
  {
    className: R("pr-twp pr-grid pr-gap-2", e),
    ...r,
    ref: t
  }
));
$i.displayName = vt.Root.displayName;
const ro = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  vt.Item,
  {
    ref: t,
    className: R(
      "pr-twp pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
      e
    ),
    ...r,
    children: /* @__PURE__ */ l(vt.Indicator, { className: "pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ l(ui, { className: "pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current" }) })
  }
));
ro.displayName = vt.Item.displayName;
const Gl = bt.Root, Hl = bt.Trigger, _i = M.forwardRef(({ className: e, align: r = "center", sideOffset: t = 4, ...n }, o) => /* @__PURE__ */ l(bt.Portal, { children: /* @__PURE__ */ l(
  bt.Content,
  {
    ref: o,
    align: r,
    sideOffset: t,
    className: R(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
_i.displayName = bt.Content.displayName;
const Xl = We.Portal, Ii = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  We.Overlay,
  {
    ref: t,
    className: R(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...r
  }
));
Ii.displayName = We.Overlay.displayName;
const Wl = M.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ E(Xl, { children: [
  /* @__PURE__ */ l(Ii, {}),
  /* @__PURE__ */ E(
    We.Content,
    {
      ref: n,
      className: R(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...t,
      children: [
        r,
        /* @__PURE__ */ E(We.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ l(Np, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ l("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Wl.displayName = We.Content.displayName;
const Yl = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  We.Title,
  {
    ref: t,
    className: R("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...r
  }
));
Yl.displayName = We.Title.displayName;
const ql = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  We.Description,
  {
    ref: t,
    className: R("pr-text-sm pr-text-muted-foreground", e),
    ...r
  }
));
ql.displayName = We.Description.displayName;
const Ai = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Re,
  {
    ref: t,
    className: R(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...r
  }
));
Ai.displayName = Re.displayName;
const Di = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ l(Ep, { className: "pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ l(
    Re.Input,
    {
      ref: t,
      className: R(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...r
    }
  )
] }));
Di.displayName = Re.Input.displayName;
const Mi = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Re.List,
  {
    ref: t,
    className: R("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...r
  }
));
Mi.displayName = Re.List.displayName;
const Bi = M.forwardRef((e, r) => /* @__PURE__ */ l(Re.Empty, { ref: r, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Bi.displayName = Re.Empty.displayName;
const Kl = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Re.Group,
  {
    ref: t,
    className: R(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...r
  }
));
Kl.displayName = Re.Group.displayName;
const Jl = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Re.Separator,
  {
    ref: t,
    className: R("pr--mx-1 pr-h-px pr-bg-border", e),
    ...r
  }
));
Jl.displayName = Re.Separator.displayName;
const ji = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Re.Item,
  {
    ref: t,
    className: R(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...r
  }
));
ji.displayName = Re.Item.displayName;
function Zl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function la({
  id: e,
  options: r = [],
  className: t,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = Zl,
  buttonPlaceholder: i = "",
  textPlaceholder: s = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: d = "outline",
  dir: u = "ltr",
  isDisabled: b = !1,
  ...p
}) {
  const [h, f] = fe(!1);
  return /* @__PURE__ */ E(Gl, { open: h, onOpenChange: f, ...p, children: [
    /* @__PURE__ */ l(Hl, { asChild: !0, children: /* @__PURE__ */ E(
      ye,
      {
        variant: d,
        role: "combobox",
        "aria-expanded": h,
        id: e,
        className: R("pr-w-[200px] pr-justify-between", t),
        disabled: b,
        children: [
          /* @__PURE__ */ l("span", { className: "pr-overflow-hidden pr-text-ellipsis pr-whitespace-nowrap", children: n ? a(n) : i }),
          /* @__PURE__ */ l(Tp, { className: "pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ l(_i, { className: "pr-w-[200px] pr-p-0", dir: u, children: /* @__PURE__ */ E(Ai, { children: [
      /* @__PURE__ */ l(Di, { dir: u, placeholder: s, className: "pr-text-inherit" }),
      /* @__PURE__ */ l(Bi, { children: c }),
      /* @__PURE__ */ l(Mi, { children: r.map((g) => /* @__PURE__ */ E(
        ji,
        {
          value: a(g),
          onSelect: () => {
            o(g), f(!1);
          },
          children: [
            /* @__PURE__ */ l(
              on,
              {
                className: R("pr-me-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !n || a(n) !== a(g)
                })
              }
            ),
            a(g)
          ]
        },
        a(g)
      )) })
    ] }) })
  ] });
}
function Ql({
  startChapter: e,
  endChapter: r,
  handleSelectStartChapter: t,
  handleSelectEndChapter: n,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = lr(
    () => Array.from({ length: a }, (d, u) => u + 1),
    [a]
  );
  return /* @__PURE__ */ E(cr, { children: [
    /* @__PURE__ */ l(Ze, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ l(
      la,
      {
        isDisabled: o,
        onChange: (d) => {
          t(d), d > r && n(d);
        },
        className: "pr-ml-2 pr-mr-2 pr-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ l(Ze, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ l(
      la,
      {
        isDisabled: o,
        onChange: (d) => {
          n(d), d < e && t(d);
        },
        className: "pr-ml-2 pr-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: r
      },
      "end chapter"
    )
  ] });
}
var ec = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(ec || {});
const c0 = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Dn = (e, r) => e[r] ?? r;
function d0({
  handleBookSelectionModeChange: e,
  currentBookName: r,
  onSelectBooks: t,
  selectedBookIds: n,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: s,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const u = Dn(d, "%webView_bookSelector_currentBook%"), b = Dn(d, "%webView_bookSelector_choose%"), p = Dn(d, "%webView_bookSelector_chooseBooks%"), [h, f] = fe(
    "current book"
    /* CURRENT_BOOK */
  ), g = (v) => {
    f(v), e(v);
  };
  return /* @__PURE__ */ l(
    $i,
    {
      className: "pr-twp pr-flex",
      value: h,
      onValueChange: (v) => g(v),
      children: /* @__PURE__ */ E("div", { className: "pr-flex pr-w-full pr-flex-col pr-gap-4", children: [
        /* @__PURE__ */ E("div", { className: "pr-grid pr-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center", children: [
            /* @__PURE__ */ l(ro, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ l(Ze, { className: "pr-ml-1", children: u })
          ] }),
          /* @__PURE__ */ l(Ze, { className: "pr-flex pr-items-center", children: r }),
          /* @__PURE__ */ l("div", { className: "pr-flex pr-items-center pr-justify-end", children: /* @__PURE__ */ l(
            Ql,
            {
              isDisabled: h === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: s,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ E("div", { className: "pr-grid pr-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center", children: [
            /* @__PURE__ */ l(ro, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ l(Ze, { className: "pr-ml-1", children: p })
          ] }),
          /* @__PURE__ */ l(Ze, { className: "pr-flex pr-items-center", children: n.map((v) => ce.bookIdToEnglishName(v)).join(", ") }),
          /* @__PURE__ */ l(
            ye,
            {
              disabled: h === "current book",
              onClick: () => t(),
              children: b
            }
          )
        ] })
      ] })
    }
  );
}
function rc({ table: e }) {
  return /* @__PURE__ */ E(bo, { children: [
    /* @__PURE__ */ l(Wp, { asChild: !0, children: /* @__PURE__ */ E(ye, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ l(Sp, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ E(ln, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ l(Ct, { children: "Toggle columns" }),
      /* @__PURE__ */ l(cn, {}),
      e.getAllColumns().filter((r) => r.getCanHide()).map((r) => /* @__PURE__ */ l(
        wo,
        {
          className: "pr-capitalize",
          checked: r.getIsVisible(),
          onCheckedChange: (t) => r.toggleVisibility(!!t),
          children: r.id
        },
        r.id
      ))
    ] })
  ] });
}
const wt = be.Root, tc = be.Group, yt = be.Value, zr = M.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ E(
  be.Trigger,
  {
    ref: n,
    className: R(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...t,
    children: [
      r,
      /* @__PURE__ */ l(be.Icon, { asChild: !0, children: /* @__PURE__ */ l(an, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
zr.displayName = be.Trigger.displayName;
const Vi = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  be.ScrollUpButton,
  {
    ref: t,
    className: R("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...r,
    children: /* @__PURE__ */ l(Cp, { className: "pr-h-4 pr-w-4" })
  }
));
Vi.displayName = be.ScrollUpButton.displayName;
const Li = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  be.ScrollDownButton,
  {
    ref: t,
    className: R("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...r,
    children: /* @__PURE__ */ l(an, { className: "pr-h-4 pr-w-4" })
  }
));
Li.displayName = be.ScrollDownButton.displayName;
const Fr = M.forwardRef(({ className: e, children: r, position: t = "popper", ...n }, o) => /* @__PURE__ */ l(be.Portal, { children: /* @__PURE__ */ E(
  be.Content,
  {
    ref: o,
    className: R(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      t === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: t,
    ...n,
    children: [
      /* @__PURE__ */ l(Vi, {}),
      /* @__PURE__ */ l(
        be.Viewport,
        {
          className: R(
            "pr-p-1",
            t === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ l(Li, {})
    ]
  }
) }));
Fr.displayName = be.Content.displayName;
const nc = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  be.Label,
  {
    ref: t,
    className: R("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...r
  }
));
nc.displayName = be.Label.displayName;
const Ue = M.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ E(
  be.Item,
  {
    ref: n,
    className: R(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ l("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ l(be.ItemIndicator, { children: /* @__PURE__ */ l(on, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ l(be.ItemText, { children: r })
    ]
  }
));
Ue.displayName = be.Item.displayName;
const oc = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  be.Separator,
  {
    ref: t,
    className: R("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...r
  }
));
oc.displayName = be.Separator.displayName;
function ac({ table: e }) {
  return /* @__PURE__ */ l("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ E("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ l("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ E(
        wt,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (r) => {
            e.setPageSize(Number(r));
          },
          children: [
            /* @__PURE__ */ l(zr, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ l(yt, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ l(Fr, { side: "top", children: [10, 20, 30, 40, 50].map((r) => /* @__PURE__ */ l(Ue, { value: `${r}`, children: r }, r)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ E("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ E(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ l(Op, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ E(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ l(Rp, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ E(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ l(Pp, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ E(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ l($p, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const dn = M.forwardRef(({ className: e, stickyHeader: r, ...t }, n) => /* @__PURE__ */ l("div", { className: R("pr-twp pr-relative pr-w-full", { "pr-overflow-auto": !r }), children: /* @__PURE__ */ l(
  "table",
  {
    ref: n,
    className: R("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...t
  }
) }));
dn.displayName = "Table";
const un = M.forwardRef(({ className: e, stickyHeader: r, ...t }, n) => /* @__PURE__ */ l(
  "thead",
  {
    ref: n,
    className: R(
      { "pr-sticky pr-top-0 pr-bg-muted": r },
      "[&_tr]:pr-border-b",
      e
    ),
    ...t
  }
));
un.displayName = "TableHeader";
const fn = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l("tbody", { ref: t, className: R("[&_tr:last-child]:pr-border-0", e), ...r }));
fn.displayName = "TableBody";
const ic = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  "tfoot",
  {
    ref: t,
    className: R("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...r
  }
));
ic.displayName = "TableFooter";
const pr = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ l(
    "tr",
    {
      ref: t,
      className: R(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...r
    }
  )
);
pr.displayName = "TableRow";
const xt = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  "th",
  {
    ref: t,
    className: R(
      "pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",
      e
    ),
    ...r
  }
));
xt.displayName = "TableHead";
const Ur = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  "td",
  {
    ref: t,
    className: R("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0", e),
    ...r
  }
));
Ur.displayName = "TableCell";
const sc = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  "caption",
  {
    ref: t,
    className: R("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...r
  }
));
sc.displayName = "TableCaption";
function pc({
  columns: e,
  data: r,
  enablePagination: t = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var v;
  const [s, c] = fe([]), [d, u] = fe([]), [b, p] = fe({}), [h, f] = fe({}), g = mi({
    data: r,
    columns: e,
    getCoreRowModel: hi(),
    ...t && { getPaginationRowModel: Zp() },
    onSortingChange: c,
    getSortedRowModel: gi(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Qp(),
    onColumnVisibilityChange: p,
    onRowSelectionChange: f,
    state: {
      sorting: s,
      columnFilters: d,
      columnVisibility: b,
      rowSelection: h
    }
  });
  return /* @__PURE__ */ E("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ l(rc, { table: g }),
    /* @__PURE__ */ E(dn, { stickyHeader: a, children: [
      /* @__PURE__ */ l(un, { stickyHeader: a, children: g.getHeaderGroups().map((y) => /* @__PURE__ */ l(pr, { children: y.headers.map((C) => /* @__PURE__ */ l(xt, { children: C.isPlaceholder ? void 0 : ut(C.column.columnDef.header, C.getContext()) }, C.id)) }, y.id)) }),
      /* @__PURE__ */ l(fn, { children: (v = g.getRowModel().rows) != null && v.length ? g.getRowModel().rows.map((y) => /* @__PURE__ */ l(
        pr,
        {
          onClick: () => i(y, g),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((C) => /* @__PURE__ */ l(Ur, { children: ut(C.column.columnDef.cell, C.getContext()) }, C.id))
        },
        y.id
      )) : /* @__PURE__ */ l(pr, { children: /* @__PURE__ */ l(Ur, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    t && /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ l(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => g.previousPage(),
          disabled: !g.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ l(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => g.nextPage(),
          disabled: !g.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    t && n && /* @__PURE__ */ l(ac, { table: g })
  ] });
}
const lc = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ca = (e) => {
  const r = /^\\[vc]\s+(\d+)/, t = e.match(r);
  if (t)
    return +t[1];
}, da = (e, r, t, n) => {
  if (!e || e === "" || r === "")
    return [];
  const o = [], a = lc(e);
  let i = n.chapterNum, s = n.verseNum, c = 0;
  return a.forEach((d) => {
    d.startsWith("\\id") && (i = 0, s = 0), d.startsWith("\\c") && (i = ca(d), s = 0), d.startsWith("\\v") && (s = ca(d), i === 0 && (i = n.chapterNum));
    const u = t(d, r);
    for (let b = 0; b < u.length; b++) {
      const p = {
        reference: {
          ...n,
          chapterNum: i !== void 0 ? +i : -1,
          verseNum: s !== void 0 ? +s : -1
        },
        snippet: d,
        key: c
      };
      c += 1, o.push(p);
    }
  }), o;
};
function cc({
  selectedItem: e,
  text: r,
  extractItems: t,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], s = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, d] = fe(
    da(r, e, t, n)
  );
  return Xe(
    () => d(da(r, e, t, n)),
    [r, e, n, t]
  ), /* @__PURE__ */ E(dn, { stickyHeader: !0, children: [
    /* @__PURE__ */ l(un, { stickyHeader: !0, children: /* @__PURE__ */ E(pr, { children: [
      /* @__PURE__ */ l(xt, { children: i }),
      /* @__PURE__ */ l(xt, { children: s })
    ] }) }),
    /* @__PURE__ */ l(fn, { children: c.map((u) => /* @__PURE__ */ E(
      pr,
      {
        onClick: () => {
          o(u.reference);
        },
        children: [
          /* @__PURE__ */ l(Ur, { children: `${ce.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}` }),
          /* @__PURE__ */ l(Ur, { children: u.snippet })
        ]
      },
      u.key
    )) })
  ] });
}
const u0 = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_inventory_scope_currentBook%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%"
]), yo = (e) => e === "asc" ? /* @__PURE__ */ l(_p, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ l(Ip, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ l(Ap, { className: "pr-ms-2 pr-h-4 pr-w-4" }), dc = (e, r, t) => {
  let n = e;
  return r !== "all" && (n = n.filter(
    (o) => r === "approved" && o.status === "approved" || r === "unapproved" && o.status === "unapproved" || r === "unknown" && o.status === "unknown"
  )), t !== "" && (n = n.filter((o) => o.item.includes(t))), n;
}, uc = (e, r, t) => {
  const n = [], o = r(e);
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = n.find((c) => c.item === i);
    if (s)
      s.count += 1;
    else {
      const c = {
        item: i,
        count: 1,
        status: t(i)
      };
      n.push(c);
    }
  }
  return n;
}, nr = (e, r) => e[r] ?? r;
function f0({
  scriptureReference: e,
  setScriptureReference: r,
  localizedStrings: t,
  extractItems: n,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: s,
  text: c,
  scope: d,
  onScopeChange: u,
  getColumns: b
}) {
  const p = nr(t, "%webView_inventory_all%"), h = nr(t, "%webView_inventory_approved%"), f = nr(t, "%webView_inventory_unapproved%"), g = nr(t, "%webView_inventory_unknown%"), v = nr(t, "%webView_inventory_scope_currentBook%"), y = nr(t, "%webView_inventory_scope_chapter%"), C = nr(t, "%webView_inventory_scope_verse%"), T = nr(t, "%webView_inventory_filter_text%"), [x, w] = fe([]), [O, P] = fe("all"), [V, S] = fe(""), [$, k] = fe(""), j = Se(
    (z, N) => {
      w((U) => {
        let F = [];
        return z.forEach((q) => {
          F = U.map((G) => G.item === q && G.status !== N ? { ...G, status: N } : G);
        }), F;
      });
      let I = [...o];
      z.forEach((U) => {
        N === "approved" ? I.includes(U) || I.push(U) : I = I.filter((F) => F !== U);
      }), a(I);
      let W = [...i];
      z.forEach((U) => {
        N === "unapproved" ? W.includes(U) || W.push(U) : W = W.filter(
          (F) => F !== U
        );
      }), s(W);
    },
    [o, a, i, s]
  ), B = Se(
    (z) => o.includes(z) ? "approved" : i.includes(z) ? "unapproved" : "unknown",
    [o, i]
  );
  Xe(() => {
    c && w(uc(c, n, B));
  }, [n, c, B]);
  const Z = lr(() => dc(x, O, V), [x, O, V]);
  Xe(() => {
    k("");
  }, [Z]);
  const J = (z, N) => {
    N.toggleAllRowsSelected(!1), z.toggleSelected(void 0), k(z.getValue("item"));
  }, X = lr(() => b(j), [b, j]), te = (z) => {
    if (z === "book" || z === "chapter" || z === "verse")
      u(z);
    else
      throw new Error(`Invalid scope value: ${z}`);
  }, ae = (z) => {
    if (z === "all" || z === "approved" || z === "unapproved" || z === "unknown")
      P(z);
    else
      throw new Error(`Invalid status filter value: ${z}`);
  };
  return /* @__PURE__ */ E("div", { className: "pr-twp pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ E("div", { className: "pr-flex", children: [
      /* @__PURE__ */ E(
        wt,
        {
          onValueChange: (z) => ae(z),
          defaultValue: O,
          children: [
            /* @__PURE__ */ l(zr, { className: "pr-m-1", children: /* @__PURE__ */ l(yt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ E(Fr, { children: [
              /* @__PURE__ */ l(Ue, { value: "all", children: p }),
              /* @__PURE__ */ l(Ue, { value: "approved", children: h }),
              /* @__PURE__ */ l(Ue, { value: "unapproved", children: f }),
              /* @__PURE__ */ l(Ue, { value: "unknown", children: g })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ E(wt, { onValueChange: (z) => te(z), defaultValue: d, children: [
        /* @__PURE__ */ l(zr, { className: "pr-m-1", children: /* @__PURE__ */ l(yt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ E(Fr, { children: [
          /* @__PURE__ */ l(Ue, { value: "book", children: v }),
          /* @__PURE__ */ l(Ue, { value: "chapter", children: y }),
          /* @__PURE__ */ l(Ue, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ l(
        St,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: T,
          value: V,
          onChange: (z) => {
            S(z.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ l(
      pc,
      {
        columns: X,
        data: Z,
        onRowClickHandler: J,
        stickyHeader: !0
      }
    ) }),
    $ !== "" && /* @__PURE__ */ l("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ l(
      cc,
      {
        selectedItem: $,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (z) => r(z),
        localizedStrings: t
      }
    ) })
  ] });
}
const zi = sn(
  "pr-twp pr-inline-flex pr-items-center pr-justify-center pr-rounded-md pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-muted hover:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=on]:pr-bg-accent data-[state=on]:pr-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "pr-bg-transparent",
        outline: "pr-border pr-border-input pr-bg-transparent hover:pr-bg-accent hover:pr-text-accent-foreground"
      },
      size: {
        default: "pr-h-10 pr-px-3",
        sm: "pr-h-9 pr-px-2.5",
        lg: "pr-h-11 pr-px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), fc = M.forwardRef(({ className: e, variant: r, size: t, ...n }, o) => /* @__PURE__ */ l(
  vi.Root,
  {
    ref: o,
    className: R(zi({ variant: r, size: t, className: e })),
    ...n
  }
));
fc.displayName = vi.Root.displayName;
const Fi = M.createContext({
  size: "default",
  variant: "default"
}), Ui = M.forwardRef(({ className: e, variant: r, size: t, children: n, ...o }, a) => /* @__PURE__ */ l(
  pn.Root,
  {
    ref: a,
    className: R("pr-twp pr-flex pr-items-center pr-justify-center pr-gap-1", e),
    ...o,
    children: /* @__PURE__ */ l(
      Fi.Provider,
      {
        value: { variant: r, size: t },
        children: n
      }
    )
  }
));
Ui.displayName = pn.Root.displayName;
const Xt = M.forwardRef(({ className: e, children: r, variant: t, size: n, ...o }, a) => {
  const i = M.useContext(Fi);
  return /* @__PURE__ */ l(
    pn.Item,
    {
      ref: a,
      className: R(
        zi({
          variant: i.variant || t,
          size: i.size || n
        }),
        e
      ),
      ...o,
      children: r
    }
  );
});
Xt.displayName = pn.Item.displayName;
const m0 = (e) => ({
  accessorKey: "item",
  header: ({ column: r }) => /* @__PURE__ */ E(ye, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    e,
    yo(r.getIsSorted())
  ] })
}), h0 = (e) => ({
  accessorKey: "count",
  header: ({ column: r }) => /* @__PURE__ */ l("div", { className: "pr-flex pr-justify-end pr-tabular-nums", children: /* @__PURE__ */ E(ye, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    e,
    yo(r.getIsSorted())
  ] }) }),
  cell: ({ row: r }) => /* @__PURE__ */ l("div", { className: "pr-flex pr-justify-end", children: r.getValue("count") })
}), g0 = (e, r) => ({
  accessorKey: "status",
  header: ({ column: t }) => /* @__PURE__ */ l("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ E(ye, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    yo(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => {
    const n = t.getValue("status"), o = t.getValue("item");
    return /* @__PURE__ */ E(Ui, { value: n, variant: "outline", type: "single", children: [
      /* @__PURE__ */ l(Xt, { onClick: () => r([o], "approved"), value: "approved", children: /* @__PURE__ */ l(Dp, {}) }),
      /* @__PURE__ */ l(
        Xt,
        {
          onClick: () => r([o], "unapproved"),
          value: "unapproved",
          children: /* @__PURE__ */ l(Mp, {})
        }
      ),
      /* @__PURE__ */ l(Xt, { onClick: () => r([o], "unknown"), value: "unknown", children: /* @__PURE__ */ l(Bp, {}) })
    ] });
  }
});
function mc({ onSearch: e, placeholder: r, isFullWidth: t }) {
  const [n, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ l(
    St,
    {
      className: R(
        "pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        { "pr-w-full": t }
      ),
      placeholder: r,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
const Gi = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.Root,
  {
    orientation: "vertical",
    ref: t,
    className: R("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...r
  }
));
Gi.displayName = Pe.List.displayName;
const Hi = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.List,
  {
    ref: t,
    className: R(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...r
  }
));
Hi.displayName = Pe.List.displayName;
const hc = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.Trigger,
  {
    ref: t,
    ...r,
    className: R(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Xi = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.Content,
  {
    ref: t,
    className: R(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...r
  }
));
Xi.displayName = Pe.Content.displayName;
function v0({
  tabList: e,
  onSearch: r,
  searchPlaceholder: t,
  headerTitle: n,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ E("div", { className: "pr-twp", children: [
    /* @__PURE__ */ E("div", { className: "pr-sticky pr-top-0 pr-space-y-2 pr-pb-2", children: [
      n ? /* @__PURE__ */ l("h1", { children: n }) : "",
      /* @__PURE__ */ l(
        mc,
        {
          isFullWidth: o,
          onSearch: r,
          placeholder: t
        }
      )
    ] }),
    /* @__PURE__ */ E(Gi, { dir: a, children: [
      /* @__PURE__ */ l(Hi, { children: e.map((i) => /* @__PURE__ */ l(hc, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ l(Xi, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const ir = "scrBook", gc = "scrRef", vr = "source", vc = "details", bc = "Scripture Reference", wc = "Scripture Book", Wi = "Type", yc = "Details";
function xc(e, r) {
  const t = r ?? !1;
  return [
    {
      accessorFn: (n) => `${ce.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: ir,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? bc,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? ce.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === ir ? In(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => Zn(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => In(n.start),
      id: gc,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : In(o.start);
      },
      sortingFn: (n, o) => Zn(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: vr,
      header: t ? (e == null ? void 0 : e.typeColumnName) ?? Wi : void 0,
      cell: (n) => t || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: vc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? yc,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const kc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: r } = e.start;
  let t = 0;
  return e.end && ({ offset: t } = e.end), !e.end || Zn(e.start, e.end) === 0 ? `${An(e.start)}+${r}` : `${An(e.start)}+${r}-${An(e.end)}+${t}`;
}, ua = (e) => `${kc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function b0({
  sources: e,
  showColumnHeaders: r = !1,
  showSourceColumn: t = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: s,
  direction: c = "ltr"
}) {
  const [d, u] = fe([]), [b, p] = fe([{ id: ir, desc: !1 }]), [h, f] = fe({}), g = lr(
    () => e.flatMap((S) => S.data.map(($) => ({
      ...$,
      source: S.source
    }))),
    [e]
  ), v = lr(
    () => xc(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      t
    ),
    [n, a, i, t]
  );
  Xe(() => {
    d.includes(vr) ? p([
      { id: vr, desc: !1 },
      { id: ir, desc: !1 }
    ]) : p([{ id: ir, desc: !1 }]);
  }, [d]);
  const y = mi({
    data: g,
    columns: v,
    state: {
      grouping: d,
      sorting: b,
      rowSelection: h
    },
    onGroupingChange: u,
    onSortingChange: p,
    onRowSelectionChange: f,
    getExpandedRowModel: el(),
    getGroupedRowModel: rl(),
    getCoreRowModel: hi(),
    getSortedRowModel: gi(),
    getRowId: ua,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Xe(() => {
    if (s) {
      const S = y.getSelectedRowModel().rowsById, $ = Object.keys(S);
      if ($.length === 1) {
        const k = g.find((j) => ua(j) === $[0]) || void 0;
        k && s(k);
      }
    }
  }, [h, g, s, y]);
  const C = o ?? wc, T = a ?? Wi, x = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [ir] },
    { label: `Group by ${T}`, value: [vr] },
    {
      label: `Group by ${C} and ${T}`,
      value: [ir, vr]
    },
    {
      label: `Group by ${T} and ${C}`,
      value: [vr, ir]
    }
  ], w = (S) => {
    u(JSON.parse(S));
  }, O = (S, $) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()($);
  }, P = (S, $) => S.getIsGrouped() ? "" : R("banded-row", $ % 2 === 0 ? "even" : "odd"), V = (S, $, k) => {
    if (!((S == null ? void 0 : S.length) === 0 || $.depth < k.column.getGroupedIndex())) {
      if ($.getIsGrouped())
        switch ($.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch ($.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ E("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !r && /* @__PURE__ */ E(
      wt,
      {
        value: JSON.stringify(d),
        onValueChange: (S) => {
          w(S);
        },
        children: [
          /* @__PURE__ */ l(zr, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ l(yt, {}) }),
          /* @__PURE__ */ l(Fr, { position: "item-aligned", children: /* @__PURE__ */ l(tc, { children: x.map((S) => /* @__PURE__ */ l(Ue, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ E(dn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      r && /* @__PURE__ */ l(un, { children: y.getHeaderGroups().map((S) => /* @__PURE__ */ l(pr, { children: S.headers.filter(($) => $.column.columnDef.header).map(($) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ l(xt, { colSpan: $.colSpan, className: "top-0 pr-sticky", children: $.isPlaceholder ? void 0 : /* @__PURE__ */ E("div", { children: [
          $.column.getCanGroup() ? /* @__PURE__ */ l(
            ye,
            {
              variant: "ghost",
              title: `Toggle grouping by ${$.column.columnDef.header}`,
              onClick: $.column.getToggleGroupingHandler(),
              type: "button",
              children: $.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          ut($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, S.id)) }),
      /* @__PURE__ */ l(fn, { children: y.getRowModel().rows.map((S, $) => /* @__PURE__ */ l(
        pr,
        {
          "data-state": S.getIsSelected() ? "selected" : "",
          className: R(P(S, $)),
          onClick: (k) => O(S, k),
          children: S.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== vr || !t)))
              return /* @__PURE__ */ l(
                Ur,
                {
                  className: R(
                    k.column.columnDef.id,
                    "pr-p-[1px]",
                    V(d, S, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ E(
                    ye,
                    {
                      variant: "link",
                      onClick: S.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        S.getIsExpanded() && /* @__PURE__ */ l(an, {}),
                        !S.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ l(di, {}) : /* @__PURE__ */ l(jp, {})),
                        " ",
                        ut(k.column.columnDef.cell, k.getContext()),
                        " (",
                        S.subRows.length,
                        ")"
                      ]
                    }
                  ) : ut(k.column.columnDef.cell, k.getContext()))()
                },
                k.id
              );
          })
        },
        S.id
      )) })
    ] })
  ] });
}
const Mn = {
  [ue("undefined")]: "Ø",
  [ue(0)]: "A",
  [ue(1)]: "B",
  [ue(2)]: "C",
  [ue(3)]: "D",
  [ue(4)]: "E",
  [ue(5)]: "F",
  [ue(6)]: "G",
  [ue(7)]: "H",
  [ue(8)]: "I",
  [ue(9)]: "J",
  [ue(10)]: "K",
  [ue(11)]: "L",
  [ue(12)]: "M",
  [ue(13)]: "N",
  [ue(14)]: "O",
  [ue(15)]: "P",
  [ue(16)]: "Q",
  [ue(17)]: "R",
  [ue(18)]: "S",
  [ue(19)]: "T",
  [ue(20)]: "U",
  [ue(21)]: "V",
  [ue(22)]: "W",
  [ue(23)]: "X",
  [ue(24)]: "Y",
  [ue(25)]: "Z"
};
function w0({
  availableScrollGroupIds: e,
  scrollGroupId: r,
  onChangeScrollGroupId: t,
  localizedStrings: n = {}
}) {
  const o = {
    ...Mn,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([a, i]) => [
          a,
          a === i && a in Mn ? Mn[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ E(
    wt,
    {
      value: `${r}`,
      onValueChange: (a) => t(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ l(zr, { className: "pr-twp pr-w-auto", children: /* @__PURE__ */ l(
          yt,
          {
            placeholder: o[ue(r)] ?? r
          }
        ) }),
        /* @__PURE__ */ l(
          Fr,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ l(Ue, { value: `${a}`, children: o[ue(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const Yi = M.forwardRef(({ className: e, orientation: r = "horizontal", decorative: t = !0, ...n }, o) => /* @__PURE__ */ l(
  bi.Root,
  {
    ref: o,
    decorative: t,
    orientation: r,
    className: R(
      "pr-twp pr-shrink-0 pr-bg-border",
      r === "horizontal" ? "pr-h-[1px] pr-w-full" : "pr-h-full pr-w-[1px]",
      e
    ),
    ...n
  }
));
Yi.displayName = bi.Root.displayName;
function y0({ children: e }) {
  return /* @__PURE__ */ l("div", { className: "pr-twp pr-grid", children: e });
}
function x0({
  primary: e,
  secondary: r,
  children: t,
  isLoading: n = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ l("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ l("p", { className: "pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground", children: r })
    ] }),
    n ? /* @__PURE__ */ l("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : /* @__PURE__ */ l("div", { children: t })
  ] });
}
function k0({
  primary: e,
  secondary: r,
  includeSeparator: t = !1
}) {
  return /* @__PURE__ */ E("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ l("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ l("p", { className: "pr-text-sm pr-text-muted-foreground", children: r })
    ] }),
    t ? /* @__PURE__ */ l(Yi, {}) : ""
  ] });
}
const qi = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Qn.Root,
  {
    ref: t,
    className: R(
      "pr-peer pr-twp pr-h-4 pr-w-4 pr-shrink-0 pr-rounded-sm pr-border pr-border-primary pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=checked]:pr-text-primary-foreground",
      e
    ),
    ...r,
    children: /* @__PURE__ */ l(
      Qn.Indicator,
      {
        className: R("pr-flex pr-items-center pr-justify-center pr-text-current"),
        children: /* @__PURE__ */ l(on, { className: "pr-h-4 pr-w-4" })
      }
    )
  }
));
qi.displayName = Qn.Root.displayName;
function N0({
  id: e,
  className: r,
  listItems: t,
  selectedListItems: n,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ l("div", { id: e, className: r, children: t.map((i) => /* @__PURE__ */ E("div", { className: "pr-m-2 pr-flex pr-items-center", children: [
    /* @__PURE__ */ l(
      qi,
      {
        className: "pr-mr-2 pr-align-middle",
        checked: n.includes(i),
        onCheckedChange: (s) => o(i, s)
      }
    ),
    /* @__PURE__ */ l(Ze, { children: a ? a(i) : i })
  ] }, i)) });
}
function Nc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ec(e) {
  if (e.__esModule)
    return e;
  var r = e.default;
  if (typeof r == "function") {
    var t = function n() {
      return this instanceof n ? Reflect.construct(r, arguments, this.constructor) : r.apply(this, arguments);
    };
    t.prototype = r.prototype;
  } else
    t = {};
  return Object.defineProperty(t, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(t, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), t;
}
var xo = {}, Ki = { exports: {} };
(function(e) {
  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ki);
var Tc = Ki.exports, Bn = {};
function ko(e, r) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || r(...n);
  };
}
function _() {
  return _ = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, _.apply(this, arguments);
}
function yr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const r = Object.getPrototypeOf(e);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ji(e) {
  if (!yr(e))
    return e;
  const r = {};
  return Object.keys(e).forEach((t) => {
    r[t] = Ji(e[t]);
  }), r;
}
function Qe(e, r, t = {
  clone: !0
}) {
  const n = t.clone ? _({}, e) : e;
  return yr(e) && yr(r) && Object.keys(r).forEach((o) => {
    o !== "__proto__" && (yr(r[o]) && o in e && yr(e[o]) ? n[o] = Qe(e[o], r[o], t) : t.clone ? n[o] = yr(r[o]) ? Ji(r[o]) : r[o] : n[o] = r[o]);
  }), n;
}
var to = { exports: {} }, Lt = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fa;
function Sc() {
  if (fa)
    return ie;
  fa = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, f = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function T(w) {
    if (typeof w == "object" && w !== null) {
      var O = w.$$typeof;
      switch (O) {
        case r:
          switch (w = w.type, w) {
            case c:
            case d:
            case n:
            case a:
            case o:
            case b:
              return w;
            default:
              switch (w = w && w.$$typeof, w) {
                case s:
                case u:
                case f:
                case h:
                case i:
                  return w;
                default:
                  return O;
              }
          }
        case t:
          return O;
      }
    }
  }
  function x(w) {
    return T(w) === d;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = d, ie.ContextConsumer = s, ie.ContextProvider = i, ie.Element = r, ie.ForwardRef = u, ie.Fragment = n, ie.Lazy = f, ie.Memo = h, ie.Portal = t, ie.Profiler = a, ie.StrictMode = o, ie.Suspense = b, ie.isAsyncMode = function(w) {
    return x(w) || T(w) === c;
  }, ie.isConcurrentMode = x, ie.isContextConsumer = function(w) {
    return T(w) === s;
  }, ie.isContextProvider = function(w) {
    return T(w) === i;
  }, ie.isElement = function(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r;
  }, ie.isForwardRef = function(w) {
    return T(w) === u;
  }, ie.isFragment = function(w) {
    return T(w) === n;
  }, ie.isLazy = function(w) {
    return T(w) === f;
  }, ie.isMemo = function(w) {
    return T(w) === h;
  }, ie.isPortal = function(w) {
    return T(w) === t;
  }, ie.isProfiler = function(w) {
    return T(w) === a;
  }, ie.isStrictMode = function(w) {
    return T(w) === o;
  }, ie.isSuspense = function(w) {
    return T(w) === b;
  }, ie.isValidElementType = function(w) {
    return typeof w == "string" || typeof w == "function" || w === n || w === d || w === a || w === o || w === b || w === p || typeof w == "object" && w !== null && (w.$$typeof === f || w.$$typeof === h || w.$$typeof === i || w.$$typeof === s || w.$$typeof === u || w.$$typeof === v || w.$$typeof === y || w.$$typeof === C || w.$$typeof === g);
  }, ie.typeOf = T, ie;
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
var ma;
function Cc() {
  return ma || (ma = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, p = e ? Symbol.for("react.suspense_list") : 60120, h = e ? Symbol.for("react.memo") : 60115, f = e ? Symbol.for("react.lazy") : 60116, g = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function T(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === n || A === d || A === a || A === o || A === b || A === p || typeof A == "object" && A !== null && (A.$$typeof === f || A.$$typeof === h || A.$$typeof === i || A.$$typeof === s || A.$$typeof === u || A.$$typeof === v || A.$$typeof === y || A.$$typeof === C || A.$$typeof === g);
    }
    function x(A) {
      if (typeof A == "object" && A !== null) {
        var ke = A.$$typeof;
        switch (ke) {
          case r:
            var L = A.type;
            switch (L) {
              case c:
              case d:
              case n:
              case a:
              case o:
              case b:
                return L;
              default:
                var xe = L && L.$$typeof;
                switch (xe) {
                  case s:
                  case u:
                  case f:
                  case h:
                  case i:
                    return xe;
                  default:
                    return ke;
                }
            }
          case t:
            return ke;
        }
      }
    }
    var w = c, O = d, P = s, V = i, S = r, $ = u, k = n, j = f, B = h, Z = t, J = a, X = o, te = b, ae = !1;
    function z(A) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(A) || x(A) === c;
    }
    function N(A) {
      return x(A) === d;
    }
    function I(A) {
      return x(A) === s;
    }
    function W(A) {
      return x(A) === i;
    }
    function U(A) {
      return typeof A == "object" && A !== null && A.$$typeof === r;
    }
    function F(A) {
      return x(A) === u;
    }
    function q(A) {
      return x(A) === n;
    }
    function G(A) {
      return x(A) === f;
    }
    function K(A) {
      return x(A) === h;
    }
    function Y(A) {
      return x(A) === t;
    }
    function Q(A) {
      return x(A) === a;
    }
    function ee(A) {
      return x(A) === o;
    }
    function de(A) {
      return x(A) === b;
    }
    se.AsyncMode = w, se.ConcurrentMode = O, se.ContextConsumer = P, se.ContextProvider = V, se.Element = S, se.ForwardRef = $, se.Fragment = k, se.Lazy = j, se.Memo = B, se.Portal = Z, se.Profiler = J, se.StrictMode = X, se.Suspense = te, se.isAsyncMode = z, se.isConcurrentMode = N, se.isContextConsumer = I, se.isContextProvider = W, se.isElement = U, se.isForwardRef = F, se.isFragment = q, se.isLazy = G, se.isMemo = K, se.isPortal = Y, se.isProfiler = Q, se.isStrictMode = ee, se.isSuspense = de, se.isValidElementType = T, se.typeOf = x;
  }()), se;
}
var ha;
function Zi() {
  return ha || (ha = 1, process.env.NODE_ENV === "production" ? Lt.exports = Sc() : Lt.exports = Cc()), Lt.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var jn, ga;
function Oc() {
  if (ga)
    return jn;
  ga = 1;
  var e = Object.getOwnPropertySymbols, r = Object.prototype.hasOwnProperty, t = Object.prototype.propertyIsEnumerable;
  function n(a) {
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
      for (var i = {}, s = 0; s < 10; s++)
        i["_" + String.fromCharCode(s)] = s;
      var c = Object.getOwnPropertyNames(i).map(function(u) {
        return i[u];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        d[u] = u;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return jn = o() ? Object.assign : function(a, i) {
    for (var s, c = n(a), d, u = 1; u < arguments.length; u++) {
      s = Object(arguments[u]);
      for (var b in s)
        r.call(s, b) && (c[b] = s[b]);
      if (e) {
        d = e(s);
        for (var p = 0; p < d.length; p++)
          t.call(s, d[p]) && (c[d[p]] = s[d[p]]);
      }
    }
    return c;
  }, jn;
}
var Vn, va;
function No() {
  if (va)
    return Vn;
  va = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Vn = e, Vn;
}
var Ln, ba;
function Qi() {
  return ba || (ba = 1, Ln = Function.call.bind(Object.prototype.hasOwnProperty)), Ln;
}
var zn, wa;
function Rc() {
  if (wa)
    return zn;
  wa = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = No(), t = {}, n = Qi();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, s, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in a)
        if (n(a, u)) {
          var b;
          try {
            if (typeof a[u] != "function") {
              var p = Error(
                (c || "React class") + ": " + s + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw p.name = "Invariant Violation", p;
            }
            b = a[u](i, u, c, s, null, r);
          } catch (f) {
            b = f;
          }
          if (b && !(b instanceof Error) && e(
            (c || "React class") + ": type specification of " + s + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof b + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), b instanceof Error && !(b.message in t)) {
            t[b.message] = !0;
            var h = d ? d() : "";
            e(
              "Failed " + s + " type: " + b.message + (h ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, zn = o, zn;
}
var Fn, ya;
function Pc() {
  if (ya)
    return Fn;
  ya = 1;
  var e = Zi(), r = Oc(), t = No(), n = Qi(), o = Rc(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(s) {
    var c = "Warning: " + s;
    typeof console < "u" && console.error(c);
    try {
      throw new Error(c);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return Fn = function(s, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function b(N) {
      var I = N && (d && N[d] || N[u]);
      if (typeof I == "function")
        return I;
    }
    var p = "<<anonymous>>", h = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: C(),
      arrayOf: T,
      element: x(),
      elementType: w(),
      instanceOf: O,
      node: $(),
      objectOf: V,
      oneOf: P,
      oneOfType: S,
      shape: j,
      exact: B
    };
    function f(N, I) {
      return N === I ? N !== 0 || 1 / N === 1 / I : N !== N && I !== I;
    }
    function g(N, I) {
      this.message = N, this.data = I && typeof I == "object" ? I : {}, this.stack = "";
    }
    g.prototype = Error.prototype;
    function v(N) {
      if (process.env.NODE_ENV !== "production")
        var I = {}, W = 0;
      function U(q, G, K, Y, Q, ee, de) {
        if (Y = Y || p, ee = ee || K, de !== t) {
          if (c) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ke = Y + ":" + K;
            !I[ke] && // Avoid spamming the console because they are often not actionable except for lib authors
            W < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), I[ke] = !0, W++);
          }
        }
        return G[K] == null ? q ? G[K] === null ? new g("The " + Q + " `" + ee + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new g("The " + Q + " `" + ee + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : N(G, K, Y, Q, ee);
      }
      var F = U.bind(null, !1);
      return F.isRequired = U.bind(null, !0), F;
    }
    function y(N) {
      function I(W, U, F, q, G, K) {
        var Y = W[U], Q = X(Y);
        if (Q !== N) {
          var ee = te(Y);
          return new g(
            "Invalid " + q + " `" + G + "` of type " + ("`" + ee + "` supplied to `" + F + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return v(I);
    }
    function C() {
      return v(i);
    }
    function T(N) {
      function I(W, U, F, q, G) {
        if (typeof N != "function")
          return new g("Property `" + G + "` of component `" + F + "` has invalid PropType notation inside arrayOf.");
        var K = W[U];
        if (!Array.isArray(K)) {
          var Y = X(K);
          return new g("Invalid " + q + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected an array."));
        }
        for (var Q = 0; Q < K.length; Q++) {
          var ee = N(K, Q, F, q, G + "[" + Q + "]", t);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return v(I);
    }
    function x() {
      function N(I, W, U, F, q) {
        var G = I[W];
        if (!s(G)) {
          var K = X(G);
          return new g("Invalid " + F + " `" + q + "` of type " + ("`" + K + "` supplied to `" + U + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(N);
    }
    function w() {
      function N(I, W, U, F, q) {
        var G = I[W];
        if (!e.isValidElementType(G)) {
          var K = X(G);
          return new g("Invalid " + F + " `" + q + "` of type " + ("`" + K + "` supplied to `" + U + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(N);
    }
    function O(N) {
      function I(W, U, F, q, G) {
        if (!(W[U] instanceof N)) {
          var K = N.name || p, Y = z(W[U]);
          return new g("Invalid " + q + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return v(I);
    }
    function P(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function I(W, U, F, q, G) {
        for (var K = W[U], Y = 0; Y < N.length; Y++)
          if (f(K, N[Y]))
            return null;
        var Q = JSON.stringify(N, function(de, A) {
          var ke = te(A);
          return ke === "symbol" ? String(A) : A;
        });
        return new g("Invalid " + q + " `" + G + "` of value `" + String(K) + "` " + ("supplied to `" + F + "`, expected one of " + Q + "."));
      }
      return v(I);
    }
    function V(N) {
      function I(W, U, F, q, G) {
        if (typeof N != "function")
          return new g("Property `" + G + "` of component `" + F + "` has invalid PropType notation inside objectOf.");
        var K = W[U], Y = X(K);
        if (Y !== "object")
          return new g("Invalid " + q + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected an object."));
        for (var Q in K)
          if (n(K, Q)) {
            var ee = N(K, Q, F, q, G + "." + Q, t);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return v(I);
    }
    function S(N) {
      if (!Array.isArray(N))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var I = 0; I < N.length; I++) {
        var W = N[I];
        if (typeof W != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ae(W) + " at index " + I + "."
          ), i;
      }
      function U(F, q, G, K, Y) {
        for (var Q = [], ee = 0; ee < N.length; ee++) {
          var de = N[ee], A = de(F, q, G, K, Y, t);
          if (A == null)
            return null;
          A.data && n(A.data, "expectedType") && Q.push(A.data.expectedType);
        }
        var ke = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new g("Invalid " + K + " `" + Y + "` supplied to " + ("`" + G + "`" + ke + "."));
      }
      return v(U);
    }
    function $() {
      function N(I, W, U, F, q) {
        return Z(I[W]) ? null : new g("Invalid " + F + " `" + q + "` supplied to " + ("`" + U + "`, expected a ReactNode."));
      }
      return v(N);
    }
    function k(N, I, W, U, F) {
      return new g(
        (N || "React class") + ": " + I + " type `" + W + "." + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + F + "`."
      );
    }
    function j(N) {
      function I(W, U, F, q, G) {
        var K = W[U], Y = X(K);
        if (Y !== "object")
          return new g("Invalid " + q + " `" + G + "` of type `" + Y + "` " + ("supplied to `" + F + "`, expected `object`."));
        for (var Q in N) {
          var ee = N[Q];
          if (typeof ee != "function")
            return k(F, q, G, Q, te(ee));
          var de = ee(K, Q, F, q, G + "." + Q, t);
          if (de)
            return de;
        }
        return null;
      }
      return v(I);
    }
    function B(N) {
      function I(W, U, F, q, G) {
        var K = W[U], Y = X(K);
        if (Y !== "object")
          return new g("Invalid " + q + " `" + G + "` of type `" + Y + "` " + ("supplied to `" + F + "`, expected `object`."));
        var Q = r({}, W[U], N);
        for (var ee in Q) {
          var de = N[ee];
          if (n(N, ee) && typeof de != "function")
            return k(F, q, G, ee, te(de));
          if (!de)
            return new g(
              "Invalid " + q + " `" + G + "` key `" + ee + "` supplied to `" + F + "`.\nBad object: " + JSON.stringify(W[U], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var A = de(K, ee, F, q, G + "." + ee, t);
          if (A)
            return A;
        }
        return null;
      }
      return v(I);
    }
    function Z(N) {
      switch (typeof N) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !N;
        case "object":
          if (Array.isArray(N))
            return N.every(Z);
          if (N === null || s(N))
            return !0;
          var I = b(N);
          if (I) {
            var W = I.call(N), U;
            if (I !== N.entries) {
              for (; !(U = W.next()).done; )
                if (!Z(U.value))
                  return !1;
            } else
              for (; !(U = W.next()).done; ) {
                var F = U.value;
                if (F && !Z(F[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function J(N, I) {
      return N === "symbol" ? !0 : I ? I["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && I instanceof Symbol : !1;
    }
    function X(N) {
      var I = typeof N;
      return Array.isArray(N) ? "array" : N instanceof RegExp ? "object" : J(I, N) ? "symbol" : I;
    }
    function te(N) {
      if (typeof N > "u" || N === null)
        return "" + N;
      var I = X(N);
      if (I === "object") {
        if (N instanceof Date)
          return "date";
        if (N instanceof RegExp)
          return "regexp";
      }
      return I;
    }
    function ae(N) {
      var I = te(N);
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
    function z(N) {
      return !N.constructor || !N.constructor.name ? p : N.constructor.name;
    }
    return h.checkPropTypes = o, h.resetWarningCache = o.resetWarningCache, h.PropTypes = h, h;
  }, Fn;
}
var Un, xa;
function $c() {
  if (xa)
    return Un;
  xa = 1;
  var e = No();
  function r() {
  }
  function t() {
  }
  return t.resetWarningCache = r, Un = function() {
    function n(i, s, c, d, u, b) {
      if (b !== e) {
        var p = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw p.name = "Invariant Violation", p;
      }
    }
    n.isRequired = n;
    function o() {
      return n;
    }
    var a = {
      array: n,
      bigint: n,
      bool: n,
      func: n,
      number: n,
      object: n,
      string: n,
      symbol: n,
      any: n,
      arrayOf: o,
      element: n,
      elementType: n,
      instanceOf: o,
      node: n,
      objectOf: o,
      oneOf: o,
      oneOfType: o,
      shape: o,
      exact: o,
      checkPropTypes: t,
      resetWarningCache: r
    };
    return a.PropTypes = a, a;
  }, Un;
}
if (process.env.NODE_ENV !== "production") {
  var _c = Zi(), Ic = !0;
  to.exports = Pc()(_c.isElement, Ic);
} else
  to.exports = $c()();
var Ac = to.exports;
const m = /* @__PURE__ */ Nc(Ac);
function Dc(e) {
  const {
    prototype: r = {}
  } = e;
  return !!r.isReactComponent;
}
function es(e, r, t, n, o) {
  const a = e[r], i = o || r;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let s;
  const c = a.type;
  return typeof c == "function" && !Dc(c) && (s = "Did you accidentally use a plain function component for an element instead?"), s !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${s} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const rs = ko(m.element, es);
rs.isRequired = ko(m.element.isRequired, es);
const ts = rs, Mc = "exact-prop: ​";
function Bc(e) {
  return process.env.NODE_ENV === "production" ? e : _({}, e, {
    [Mc]: (r) => {
      const t = Object.keys(r).filter((n) => !e.hasOwnProperty(n));
      return t.length > 0 ? new Error(`The following props are not supported: ${t.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Gr(e) {
  let r = "https://mui.com/production-error/?code=" + e;
  for (let t = 1; t < arguments.length; t += 1)
    r += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified MUI error #" + e + "; visit " + r + " for the full message.";
}
var no = { exports: {} }, pe = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ka;
function jc() {
  if (ka)
    return pe;
  ka = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), f;
  f = Symbol.for("react.module.reference");
  function g(v) {
    if (typeof v == "object" && v !== null) {
      var y = v.$$typeof;
      switch (y) {
        case e:
          switch (v = v.type, v) {
            case t:
            case o:
            case n:
            case d:
            case u:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case s:
                case i:
                case c:
                case p:
                case b:
                case a:
                  return v;
                default:
                  return y;
              }
          }
        case r:
          return y;
      }
    }
  }
  return pe.ContextConsumer = i, pe.ContextProvider = a, pe.Element = e, pe.ForwardRef = c, pe.Fragment = t, pe.Lazy = p, pe.Memo = b, pe.Portal = r, pe.Profiler = o, pe.StrictMode = n, pe.Suspense = d, pe.SuspenseList = u, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(v) {
    return g(v) === i;
  }, pe.isContextProvider = function(v) {
    return g(v) === a;
  }, pe.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, pe.isForwardRef = function(v) {
    return g(v) === c;
  }, pe.isFragment = function(v) {
    return g(v) === t;
  }, pe.isLazy = function(v) {
    return g(v) === p;
  }, pe.isMemo = function(v) {
    return g(v) === b;
  }, pe.isPortal = function(v) {
    return g(v) === r;
  }, pe.isProfiler = function(v) {
    return g(v) === o;
  }, pe.isStrictMode = function(v) {
    return g(v) === n;
  }, pe.isSuspense = function(v) {
    return g(v) === d;
  }, pe.isSuspenseList = function(v) {
    return g(v) === u;
  }, pe.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === t || v === o || v === n || v === d || v === u || v === h || typeof v == "object" && v !== null && (v.$$typeof === p || v.$$typeof === b || v.$$typeof === a || v.$$typeof === i || v.$$typeof === c || v.$$typeof === f || v.getModuleId !== void 0);
  }, pe.typeOf = g, pe;
}
var le = {};
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
function Vc() {
  return Na || (Na = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), p = Symbol.for("react.lazy"), h = Symbol.for("react.offscreen"), f = !1, g = !1, v = !1, y = !1, C = !1, T;
    T = Symbol.for("react.module.reference");
    function x(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === t || L === o || C || L === n || L === d || L === u || y || L === h || f || g || v || typeof L == "object" && L !== null && (L.$$typeof === p || L.$$typeof === b || L.$$typeof === a || L.$$typeof === i || L.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === T || L.getModuleId !== void 0));
    }
    function w(L) {
      if (typeof L == "object" && L !== null) {
        var xe = L.$$typeof;
        switch (xe) {
          case e:
            var ze = L.type;
            switch (ze) {
              case t:
              case o:
              case n:
              case d:
              case u:
                return ze;
              default:
                var fr = ze && ze.$$typeof;
                switch (fr) {
                  case s:
                  case i:
                  case c:
                  case p:
                  case b:
                  case a:
                    return fr;
                  default:
                    return xe;
                }
            }
          case r:
            return xe;
        }
      }
    }
    var O = i, P = a, V = e, S = c, $ = t, k = p, j = b, B = r, Z = o, J = n, X = d, te = u, ae = !1, z = !1;
    function N(L) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function I(L) {
      return z || (z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(L) {
      return w(L) === i;
    }
    function U(L) {
      return w(L) === a;
    }
    function F(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function q(L) {
      return w(L) === c;
    }
    function G(L) {
      return w(L) === t;
    }
    function K(L) {
      return w(L) === p;
    }
    function Y(L) {
      return w(L) === b;
    }
    function Q(L) {
      return w(L) === r;
    }
    function ee(L) {
      return w(L) === o;
    }
    function de(L) {
      return w(L) === n;
    }
    function A(L) {
      return w(L) === d;
    }
    function ke(L) {
      return w(L) === u;
    }
    le.ContextConsumer = O, le.ContextProvider = P, le.Element = V, le.ForwardRef = S, le.Fragment = $, le.Lazy = k, le.Memo = j, le.Portal = B, le.Profiler = Z, le.StrictMode = J, le.Suspense = X, le.SuspenseList = te, le.isAsyncMode = N, le.isConcurrentMode = I, le.isContextConsumer = W, le.isContextProvider = U, le.isElement = F, le.isForwardRef = q, le.isFragment = G, le.isLazy = K, le.isMemo = Y, le.isPortal = Q, le.isProfiler = ee, le.isStrictMode = de, le.isSuspense = A, le.isSuspenseList = ke, le.isValidElementType = x, le.typeOf = w;
  }()), le;
}
process.env.NODE_ENV === "production" ? no.exports = jc() : no.exports = Vc();
var Ea = no.exports;
const Lc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function zc(e) {
  const r = `${e}`.match(Lc);
  return r && r[1] || "";
}
function ns(e, r = "") {
  return e.displayName || e.name || zc(e) || r;
}
function Ta(e, r, t) {
  const n = ns(r);
  return e.displayName || (n !== "" ? `${t}(${n})` : t);
}
function Fc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ns(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ea.ForwardRef:
          return Ta(e, e.render, "ForwardRef");
        case Ea.Memo:
          return Ta(e, e.type, "memo");
        default:
          return;
      }
  }
}
function kt(e, r, t, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[r], i = o || r;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an HTMLElement.`) : null;
}
const Uc = m.oneOfType([m.func, m.object]), os = Uc;
function Ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Gr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Gc(...e) {
  return e.reduce((r, t) => t == null ? r : function(...o) {
    r.apply(this, o), t.apply(this, o);
  }, () => {
  });
}
function Hc(e, r = 166) {
  let t;
  function n(...o) {
    const a = () => {
      e.apply(this, o);
    };
    clearTimeout(t), t = setTimeout(a, r);
  }
  return n.clear = () => {
    clearTimeout(t);
  }, n;
}
function Xc(e, r) {
  return process.env.NODE_ENV === "production" ? () => null : (t, n, o, a, i) => {
    const s = o || "<<anonymous>>", c = i || n;
    return typeof t[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${s}\` is deprecated. ${r}`) : null;
  };
}
function Wc(e, r) {
  var t, n;
  return /* @__PURE__ */ D.isValidElement(e) && r.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (t = e.type.muiName) != null ? t : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function Jt(e) {
  return e && e.ownerDocument || document;
}
function Yc(e) {
  return Jt(e).defaultView || window;
}
function qc(e, r) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const t = r ? _({}, r.propTypes) : null;
  return (o) => (a, i, s, c, d, ...u) => {
    const b = d || i, p = t == null ? void 0 : t[b];
    if (p) {
      const h = p(a, i, s, c, d, ...u);
      if (h)
        return h;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Zt(e, r) {
  typeof e == "function" ? e(r) : e && (e.current = r);
}
const Kc = typeof window < "u" ? D.useLayoutEffect : D.useEffect, Hr = Kc;
let Sa = 0;
function Jc(e) {
  const [r, t] = D.useState(e), n = e || r;
  return D.useEffect(() => {
    r == null && (Sa += 1, t(`mui-${Sa}`));
  }, [r]), n;
}
const Ca = D["useId".toString()];
function as(e) {
  if (Ca !== void 0) {
    const r = Ca();
    return e ?? r;
  }
  return Jc(e);
}
function Zc(e, r, t, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || r;
  return typeof e[r] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function is({
  controlled: e,
  default: r,
  name: t,
  state: n = "value"
}) {
  const {
    current: o
  } = D.useRef(e !== void 0), [a, i] = D.useState(r), s = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    D.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${t} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${t} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, t, e]);
    const {
      current: d
    } = D.useRef(r);
    D.useEffect(() => {
      !o && d !== r && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${t} after being initialized. To suppress this warning opt to use a controlled ${t}.`].join(`
`));
    }, [JSON.stringify(r)]);
  }
  const c = D.useCallback((d) => {
    o || i(d);
  }, []);
  return [s, c];
}
function oo(e) {
  const r = D.useRef(e);
  return Hr(() => {
    r.current = e;
  }), D.useRef((...t) => (
    // @ts-expect-error hide `this`
    (0, r.current)(...t)
  )).current;
}
function Sr(...e) {
  return D.useMemo(() => e.every((r) => r == null) ? null : (r) => {
    e.forEach((t) => {
      Zt(t, r);
    });
  }, e);
}
const Oa = {};
function Qc(e, r) {
  const t = D.useRef(Oa);
  return t.current === Oa && (t.current = e(r)), t;
}
const ed = [];
function rd(e) {
  D.useEffect(e, ed);
}
class Ot {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Ot();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(r, t) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, t();
    }, r);
  }
}
function lt() {
  const e = Qc(Ot.create).current;
  return rd(e.disposeEffect), e;
}
let mn = !0, ao = !1;
const td = new Ot(), nd = {
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
function od(e) {
  const {
    type: r,
    tagName: t
  } = e;
  return !!(t === "INPUT" && nd[r] && !e.readOnly || t === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function ad(e) {
  e.metaKey || e.altKey || e.ctrlKey || (mn = !0);
}
function Gn() {
  mn = !1;
}
function id() {
  this.visibilityState === "hidden" && ao && (mn = !0);
}
function sd(e) {
  e.addEventListener("keydown", ad, !0), e.addEventListener("mousedown", Gn, !0), e.addEventListener("pointerdown", Gn, !0), e.addEventListener("touchstart", Gn, !0), e.addEventListener("visibilitychange", id, !0);
}
function pd(e) {
  const {
    target: r
  } = e;
  try {
    return r.matches(":focus-visible");
  } catch {
  }
  return mn || od(r);
}
function ss() {
  const e = D.useCallback((o) => {
    o != null && sd(o.ownerDocument);
  }, []), r = D.useRef(!1);
  function t() {
    return r.current ? (ao = !0, td.start(100, () => {
      ao = !1;
    }), r.current = !1, !0) : !1;
  }
  function n(o) {
    return pd(o) ? (r.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: r,
    onFocus: n,
    onBlur: t,
    ref: e
  };
}
function ps(e, r) {
  const t = _({}, r);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      t[n] = _({}, e[n], t[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = r[n];
      t[n] = {}, !a || !Object.keys(a) ? t[n] = o : !o || !Object.keys(o) ? t[n] = a : (t[n] = _({}, a), Object.keys(o).forEach((i) => {
        t[n][i] = ps(o[i], a[i]);
      }));
    } else
      t[n] === void 0 && (t[n] = e[n]);
  }), t;
}
function Eo(e, r, t = void 0) {
  const n = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      n[o] = e[o].reduce((a, i) => {
        if (i) {
          const s = r(i);
          s !== "" && a.push(s), t && t[i] && a.push(t[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), n;
}
const Ra = (e) => e, ld = () => {
  let e = Ra;
  return {
    configure(r) {
      e = r;
    },
    generate(r) {
      return e(r);
    },
    reset() {
      e = Ra;
    }
  };
}, cd = ld(), ls = cd, cs = {
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
function hn(e, r, t = "Mui") {
  const n = cs[r];
  return n ? `${t}-${n}` : `${ls.generate(e)}-${r}`;
}
function ds(e, r, t = "Mui") {
  const n = {};
  return r.forEach((o) => {
    n[o] = hn(e, o, t);
  }), n;
}
function dd(e, r = Number.MIN_SAFE_INTEGER, t = Number.MAX_SAFE_INTEGER) {
  return Math.max(r, Math.min(e, t));
}
function Ne(e, r) {
  if (e == null)
    return {};
  var t = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(r.indexOf(o) >= 0) && (t[o] = e[o]);
  return t;
}
const ud = ["values", "unit", "step"], fd = (e) => {
  const r = Object.keys(e).map((t) => ({
    key: t,
    val: e[t]
  })) || [];
  return r.sort((t, n) => t.val - n.val), r.reduce((t, n) => _({}, t, {
    [n.key]: n.val
  }), {});
};
function md(e) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: r = {
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
    unit: t = "px",
    step: n = 5
  } = e, o = Ne(e, ud), a = fd(r), i = Object.keys(a);
  function s(p) {
    return `@media (min-width:${typeof r[p] == "number" ? r[p] : p}${t})`;
  }
  function c(p) {
    return `@media (max-width:${(typeof r[p] == "number" ? r[p] : p) - n / 100}${t})`;
  }
  function d(p, h) {
    const f = i.indexOf(h);
    return `@media (min-width:${typeof r[p] == "number" ? r[p] : p}${t}) and (max-width:${(f !== -1 && typeof r[i[f]] == "number" ? r[i[f]] : h) - n / 100}${t})`;
  }
  function u(p) {
    return i.indexOf(p) + 1 < i.length ? d(p, i[i.indexOf(p) + 1]) : s(p);
  }
  function b(p) {
    const h = i.indexOf(p);
    return h === 0 ? s(i[1]) : h === i.length - 1 ? c(i[h]) : d(p, i[i.indexOf(p) + 1]).replace("@media", "@media not all and");
  }
  return _({
    keys: i,
    values: a,
    up: s,
    down: c,
    between: d,
    only: u,
    not: b,
    unit: t
  }, o);
}
const hd = {
  borderRadius: 4
}, gd = hd, vd = process.env.NODE_ENV !== "production" ? m.oneOfType([m.number, m.string, m.object, m.array]) : {}, dr = vd;
function mt(e, r) {
  return r ? Qe(e, r, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const To = {
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
}, Pa = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${To[e]}px)`
};
function er(e, r, t) {
  const n = e.theme || {};
  if (Array.isArray(r)) {
    const a = n.breakpoints || Pa;
    return r.reduce((i, s, c) => (i[a.up(a.keys[c])] = t(r[c]), i), {});
  }
  if (typeof r == "object") {
    const a = n.breakpoints || Pa;
    return Object.keys(r).reduce((i, s) => {
      if (Object.keys(a.values || To).indexOf(s) !== -1) {
        const c = a.up(s);
        i[c] = t(r[s], s);
      } else {
        const c = s;
        i[c] = r[c];
      }
      return i;
    }, {});
  }
  return t(r);
}
function bd(e = {}) {
  var r;
  return ((r = e.keys) == null ? void 0 : r.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function wd(e, r) {
  return e.reduce((t, n) => {
    const o = t[n];
    return (!o || Object.keys(o).length === 0) && delete t[n], t;
  }, r);
}
function gn(e, r, t = !0) {
  if (!r || typeof r != "string")
    return null;
  if (e && e.vars && t) {
    const n = `vars.${r}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return r.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function Qt(e, r, t, n = t) {
  let o;
  return typeof e == "function" ? o = e(t) : Array.isArray(e) ? o = e[t] || n : o = gn(e, t) || n, r && (o = r(o, n, e)), o;
}
function we(e) {
  const {
    prop: r,
    cssProperty: t = e.prop,
    themeKey: n,
    transform: o
  } = e, a = (i) => {
    if (i[r] == null)
      return null;
    const s = i[r], c = i.theme, d = gn(c, n) || {};
    return er(i, s, (b) => {
      let p = Qt(d, o, b);
      return b === p && typeof b == "string" && (p = Qt(d, o, `${r}${b === "default" ? "" : Ye(b)}`, b)), t === !1 ? p : {
        [t]: p
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [r]: dr
  } : {}, a.filterProps = [r], a;
}
function yd(e) {
  const r = {};
  return (t) => (r[t] === void 0 && (r[t] = e(t)), r[t]);
}
const xd = {
  m: "margin",
  p: "padding"
}, kd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, $a = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Nd = yd((e) => {
  if (e.length > 2)
    if ($a[e])
      e = $a[e];
    else
      return [e];
  const [r, t] = e.split(""), n = xd[r], o = kd[t] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), vn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], bn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Ed = [...vn, ...bn];
function Rt(e, r, t, n) {
  var o;
  const a = (o = gn(e, r, !1)) != null ? o : t;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function us(e) {
  return Rt(e, "spacing", 8, "spacing");
}
function Pt(e, r) {
  if (typeof r == "string" || r == null)
    return r;
  const t = Math.abs(r), n = e(t);
  return r >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Td(e, r) {
  return (t) => e.reduce((n, o) => (n[o] = Pt(r, t), n), {});
}
function Sd(e, r, t, n) {
  if (r.indexOf(t) === -1)
    return null;
  const o = Nd(t), a = Td(o, n), i = e[t];
  return er(e, i, a);
}
function fs(e, r) {
  const t = us(e.theme);
  return Object.keys(e).map((n) => Sd(e, r, n, t)).reduce(mt, {});
}
function ge(e) {
  return fs(e, vn);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? vn.reduce((e, r) => (e[r] = dr, e), {}) : {};
ge.filterProps = vn;
function ve(e) {
  return fs(e, bn);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? bn.reduce((e, r) => (e[r] = dr, e), {}) : {};
ve.filterProps = bn;
process.env.NODE_ENV !== "production" && Ed.reduce((e, r) => (e[r] = dr, e), {});
function Cd(e = 8) {
  if (e.mui)
    return e;
  const r = us({
    spacing: e
  }), t = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = r(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return t.mui = !0, t;
}
function wn(...e) {
  const r = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), t = (n) => Object.keys(n).reduce((o, a) => r[a] ? mt(o, r[a](n)) : o, {});
  return t.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, t.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), t;
}
function Me(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Le(e, r) {
  return we({
    prop: e,
    themeKey: "borders",
    transform: r
  });
}
const Od = Le("border", Me), Rd = Le("borderTop", Me), Pd = Le("borderRight", Me), $d = Le("borderBottom", Me), _d = Le("borderLeft", Me), Id = Le("borderColor"), Ad = Le("borderTopColor"), Dd = Le("borderRightColor"), Md = Le("borderBottomColor"), Bd = Le("borderLeftColor"), jd = Le("outline", Me), Vd = Le("outlineColor"), yn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const r = Rt(e.theme, "shape.borderRadius", 4, "borderRadius"), t = (n) => ({
      borderRadius: Pt(r, n)
    });
    return er(e, e.borderRadius, t);
  }
  return null;
};
yn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: dr
} : {};
yn.filterProps = ["borderRadius"];
wn(Od, Rd, Pd, $d, _d, Id, Ad, Dd, Md, Bd, yn, jd, Vd);
const xn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = Rt(e.theme, "spacing", 8, "gap"), t = (n) => ({
      gap: Pt(r, n)
    });
    return er(e, e.gap, t);
  }
  return null;
};
xn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: dr
} : {};
xn.filterProps = ["gap"];
const kn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = Rt(e.theme, "spacing", 8, "columnGap"), t = (n) => ({
      columnGap: Pt(r, n)
    });
    return er(e, e.columnGap, t);
  }
  return null;
};
kn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: dr
} : {};
kn.filterProps = ["columnGap"];
const Nn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = Rt(e.theme, "spacing", 8, "rowGap"), t = (n) => ({
      rowGap: Pt(r, n)
    });
    return er(e, e.rowGap, t);
  }
  return null;
};
Nn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: dr
} : {};
Nn.filterProps = ["rowGap"];
const Ld = we({
  prop: "gridColumn"
}), zd = we({
  prop: "gridRow"
}), Fd = we({
  prop: "gridAutoFlow"
}), Ud = we({
  prop: "gridAutoColumns"
}), Gd = we({
  prop: "gridAutoRows"
}), Hd = we({
  prop: "gridTemplateColumns"
}), Xd = we({
  prop: "gridTemplateRows"
}), Wd = we({
  prop: "gridTemplateAreas"
}), Yd = we({
  prop: "gridArea"
});
wn(xn, kn, Nn, Ld, zd, Fd, Ud, Gd, Hd, Xd, Wd, Yd);
function Lr(e, r) {
  return r === "grey" ? r : e;
}
const qd = we({
  prop: "color",
  themeKey: "palette",
  transform: Lr
}), Kd = we({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Lr
}), Jd = we({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Lr
});
wn(qd, Kd, Jd);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Zd = we({
  prop: "width",
  transform: Ie
}), So = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const r = (t) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[t]) || To[t];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ie(t)
      };
    };
    return er(e, e.maxWidth, r);
  }
  return null;
};
So.filterProps = ["maxWidth"];
const Qd = we({
  prop: "minWidth",
  transform: Ie
}), eu = we({
  prop: "height",
  transform: Ie
}), ru = we({
  prop: "maxHeight",
  transform: Ie
}), tu = we({
  prop: "minHeight",
  transform: Ie
});
we({
  prop: "size",
  cssProperty: "width",
  transform: Ie
});
we({
  prop: "size",
  cssProperty: "height",
  transform: Ie
});
const nu = we({
  prop: "boxSizing"
});
wn(Zd, So, Qd, eu, ru, tu, nu);
const ou = {
  // borders
  border: {
    themeKey: "borders",
    transform: Me
  },
  borderTop: {
    themeKey: "borders",
    transform: Me
  },
  borderRight: {
    themeKey: "borders",
    transform: Me
  },
  borderBottom: {
    themeKey: "borders",
    transform: Me
  },
  borderLeft: {
    themeKey: "borders",
    transform: Me
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
    transform: Me
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: yn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Lr
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Lr
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Lr
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
    style: ge
  },
  mt: {
    style: ge
  },
  mr: {
    style: ge
  },
  mb: {
    style: ge
  },
  ml: {
    style: ge
  },
  mx: {
    style: ge
  },
  my: {
    style: ge
  },
  margin: {
    style: ge
  },
  marginTop: {
    style: ge
  },
  marginRight: {
    style: ge
  },
  marginBottom: {
    style: ge
  },
  marginLeft: {
    style: ge
  },
  marginX: {
    style: ge
  },
  marginY: {
    style: ge
  },
  marginInline: {
    style: ge
  },
  marginInlineStart: {
    style: ge
  },
  marginInlineEnd: {
    style: ge
  },
  marginBlock: {
    style: ge
  },
  marginBlockStart: {
    style: ge
  },
  marginBlockEnd: {
    style: ge
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
    style: xn
  },
  rowGap: {
    style: Nn
  },
  columnGap: {
    style: kn
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
    style: So
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
}, Co = ou;
function au(...e) {
  const r = e.reduce((n, o) => n.concat(Object.keys(o)), []), t = new Set(r);
  return e.every((n) => t.size === Object.keys(n).length);
}
function iu(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function su() {
  function e(t, n, o, a) {
    const i = {
      [t]: n,
      theme: o
    }, s = a[t];
    if (!s)
      return {
        [t]: n
      };
    const {
      cssProperty: c = t,
      themeKey: d,
      transform: u,
      style: b
    } = s;
    if (n == null)
      return null;
    if (d === "typography" && n === "inherit")
      return {
        [t]: n
      };
    const p = gn(o, d) || {};
    return b ? b(i) : er(i, n, (f) => {
      let g = Qt(p, u, f);
      return f === g && typeof f == "string" && (g = Qt(p, u, `${t}${f === "default" ? "" : Ye(f)}`, f)), c === !1 ? g : {
        [c]: g
      };
    });
  }
  function r(t) {
    var n;
    const {
      sx: o,
      theme: a = {}
    } = t || {};
    if (!o)
      return null;
    const i = (n = a.unstable_sxConfig) != null ? n : Co;
    function s(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const u = bd(a.breakpoints), b = Object.keys(u);
      let p = u;
      return Object.keys(d).forEach((h) => {
        const f = iu(d[h], a);
        if (f != null)
          if (typeof f == "object")
            if (i[h])
              p = mt(p, e(h, f, a, i));
            else {
              const g = er({
                theme: a
              }, f, (v) => ({
                [h]: v
              }));
              au(g, f) ? p[h] = r({
                sx: f,
                theme: a
              }) : p = mt(p, g);
            }
          else
            p = mt(p, e(h, f, a, i));
      }), wd(b, p);
    }
    return Array.isArray(o) ? o.map(s) : s(o);
  }
  return r;
}
const ms = su();
ms.filterProps = ["sx"];
const Oo = ms;
function pu(e, r) {
  const t = this;
  return t.vars && typeof t.getColorSchemeSelector == "function" ? {
    [t.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: r
  } : t.palette.mode === e ? r : {};
}
const lu = ["breakpoints", "palette", "spacing", "shape"];
function Ro(e = {}, ...r) {
  const {
    breakpoints: t = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = Ne(e, lu), s = md(t), c = Cd(o);
  let d = Qe({
    breakpoints: s,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _({
      mode: "light"
    }, n),
    spacing: c,
    shape: _({}, gd, a)
  }, i);
  return d.applyStyles = pu, d = r.reduce((u, b) => Qe(u, b), d), d.unstable_sxConfig = _({}, Co, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(b) {
    return Oo({
      sx: b,
      theme: this
    });
  }, d;
}
function cu(e) {
  return Object.keys(e).length === 0;
}
function hs(e = null) {
  const r = D.useContext(nl);
  return !r || cu(r) ? e : r;
}
const du = Ro();
function gs(e = du) {
  return hs(e);
}
const uu = ["ownerState"], fu = ["variants"], mu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function hu(e) {
  return Object.keys(e).length === 0;
}
function gu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Wt(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const vu = Ro(), _a = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function zt({
  defaultTheme: e,
  theme: r,
  themeId: t
}) {
  return hu(r) ? e : r[t] || r;
}
function bu(e) {
  return e ? (r, t) => t[e] : null;
}
function Yt(e, r) {
  let {
    ownerState: t
  } = r, n = Ne(r, uu);
  const o = typeof e == "function" ? e(_({
    ownerState: t
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => Yt(a, _({
      ownerState: t
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let s = Ne(o, fu);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(_({
        ownerState: t
      }, n, t)) : Object.keys(c.props).forEach((u) => {
        (t == null ? void 0 : t[u]) !== c.props[u] && n[u] !== c.props[u] && (d = !1);
      }), d && (Array.isArray(s) || (s = [s]), s.push(typeof c.style == "function" ? c.style(_({
        ownerState: t
      }, n, t)) : c.style));
    }), s;
  }
  return o;
}
function wu(e = {}) {
  const {
    themeId: r,
    defaultTheme: t = vu,
    rootShouldForwardProp: n = Wt,
    slotShouldForwardProp: o = Wt
  } = e, a = (i) => Oo(_({}, i, {
    theme: zt(_({}, i, {
      defaultTheme: t,
      themeId: r
    }))
  }));
  return a.__mui_systemSx = !0, (i, s = {}) => {
    ol(i, (w) => w.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: u,
      skipSx: b,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: p = bu(_a(d))
    } = s, h = Ne(s, mu), f = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), g = b || !1;
    let v;
    process.env.NODE_ENV !== "production" && c && (v = `${c}-${_a(d || "Root")}`);
    let y = Wt;
    d === "Root" || d === "root" ? y = n : d ? y = o : gu(i) && (y = void 0);
    const C = tl(i, _({
      shouldForwardProp: y,
      label: v
    }, h)), T = (w) => typeof w == "function" && w.__emotion_real !== w || yr(w) ? (O) => Yt(w, _({}, O, {
      theme: zt({
        theme: O.theme,
        defaultTheme: t,
        themeId: r
      })
    })) : w, x = (w, ...O) => {
      let P = T(w);
      const V = O ? O.map(T) : [];
      c && p && V.push((k) => {
        const j = zt(_({}, k, {
          defaultTheme: t,
          themeId: r
        }));
        if (!j.components || !j.components[c] || !j.components[c].styleOverrides)
          return null;
        const B = j.components[c].styleOverrides, Z = {};
        return Object.entries(B).forEach(([J, X]) => {
          Z[J] = Yt(X, _({}, k, {
            theme: j
          }));
        }), p(k, Z);
      }), c && !f && V.push((k) => {
        var j;
        const B = zt(_({}, k, {
          defaultTheme: t,
          themeId: r
        })), Z = B == null || (j = B.components) == null || (j = j[c]) == null ? void 0 : j.variants;
        return Yt({
          variants: Z
        }, _({}, k, {
          theme: B
        }));
      }), g || V.push(a);
      const S = V.length - O.length;
      if (Array.isArray(w) && S > 0) {
        const k = new Array(S).fill("");
        P = [...w, ...k], P.raw = [...w.raw, ...k];
      }
      const $ = C(P, ...V);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${Ye(d || "")}`), k === void 0 && (k = `Styled(${Fc(i)})`), $.displayName = k;
      }
      return i.muiName && ($.muiName = i.muiName), $;
    };
    return C.withConfig && (x.withConfig = C.withConfig), x;
  };
}
function yu(e) {
  const {
    theme: r,
    name: t,
    props: n
  } = e;
  return !r || !r.components || !r.components[t] || !r.components[t].defaultProps ? n : ps(r.components[t].defaultProps, n);
}
function xu({
  props: e,
  name: r,
  defaultTheme: t,
  themeId: n
}) {
  let o = gs(t);
  return n && (o = o[n] || o), yu({
    theme: o,
    name: r,
    props: e
  });
}
function Po(e, r = 0, t = 1) {
  return process.env.NODE_ENV !== "production" && (e < r || e > t) && console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`), dd(e, r, t);
}
function ku(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let t = e.match(r);
  return t && t[0].length === 1 && (t = t.map((n) => n + n)), t ? `rgb${t.length === 4 ? "a" : ""}(${t.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Cr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Cr(ku(e));
  const r = e.indexOf("("), t = e.substring(0, r);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(t) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Gr(9, e));
  let n = e.substring(r + 1, e.length - 1), o;
  if (t === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Gr(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: t,
    values: n,
    colorSpace: o
  };
}
function En(e) {
  const {
    type: r,
    colorSpace: t
  } = e;
  let {
    values: n
  } = e;
  return r.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : r.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), r.indexOf("color") !== -1 ? n = `${t} ${n.join(" ")}` : n = `${n.join(", ")}`, `${r}(${n})`;
}
function Nu(e) {
  e = Cr(e);
  const {
    values: r
  } = e, t = r[0], n = r[1] / 100, o = r[2] / 100, a = n * Math.min(o, 1 - o), i = (d, u = (d + t / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let s = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (s += "a", c.push(r[3])), En({
    type: s,
    values: c
  });
}
function Ia(e) {
  e = Cr(e);
  let r = e.type === "hsl" || e.type === "hsla" ? Cr(Nu(e)).values : e.values;
  return r = r.map((t) => (e.type !== "color" && (t /= 255), t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4)), Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3));
}
function Aa(e, r) {
  const t = Ia(e), n = Ia(r);
  return (Math.max(t, n) + 0.05) / (Math.min(t, n) + 0.05);
}
function vs(e, r) {
  return e = Cr(e), r = Po(r), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${r}` : e.values[3] = r, En(e);
}
function Eu(e, r) {
  if (e = Cr(e), r = Po(r), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - r;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] *= 1 - r;
  return En(e);
}
function Tu(e, r) {
  if (e = Cr(e), r = Po(r), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf("rgb") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (255 - e.values[t]) * r;
  else if (e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (1 - e.values[t]) * r;
  return En(e);
}
function Su(e, r) {
  return _({
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
  }, r);
}
const Cu = {
  black: "#000",
  white: "#fff"
}, Nt = Cu, Ou = {
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
}, Ru = Ou, Pu = {
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
}, Ir = Pu, $u = {
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
}, Ar = $u, _u = {
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
}, ot = _u, Iu = {
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
}, Dr = Iu, Au = {
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
}, Mr = Au, Du = {
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
}, Br = Du, Mu = ["mode", "contrastThreshold", "tonalOffset"], Da = {
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
    paper: Nt.white,
    default: Nt.white
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
}, Hn = {
  text: {
    primary: Nt.white,
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
    active: Nt.white,
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
function Ma(e, r, t, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[r] || (e.hasOwnProperty(t) ? e[r] = e[t] : r === "light" ? e.light = Tu(e.main, o) : r === "dark" && (e.dark = Eu(e.main, a)));
}
function Bu(e = "light") {
  return e === "dark" ? {
    main: Dr[200],
    light: Dr[50],
    dark: Dr[400]
  } : {
    main: Dr[700],
    light: Dr[400],
    dark: Dr[800]
  };
}
function ju(e = "light") {
  return e === "dark" ? {
    main: Ir[200],
    light: Ir[50],
    dark: Ir[400]
  } : {
    main: Ir[500],
    light: Ir[300],
    dark: Ir[700]
  };
}
function Vu(e = "light") {
  return e === "dark" ? {
    main: Ar[500],
    light: Ar[300],
    dark: Ar[700]
  } : {
    main: Ar[700],
    light: Ar[400],
    dark: Ar[800]
  };
}
function Lu(e = "light") {
  return e === "dark" ? {
    main: Mr[400],
    light: Mr[300],
    dark: Mr[700]
  } : {
    main: Mr[700],
    light: Mr[500],
    dark: Mr[900]
  };
}
function zu(e = "light") {
  return e === "dark" ? {
    main: Br[400],
    light: Br[300],
    dark: Br[700]
  } : {
    main: Br[800],
    light: Br[500],
    dark: Br[900]
  };
}
function Fu(e = "light") {
  return e === "dark" ? {
    main: ot[400],
    light: ot[300],
    dark: ot[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ot[500],
    dark: ot[900]
  };
}
function Uu(e) {
  const {
    mode: r = "light",
    contrastThreshold: t = 3,
    tonalOffset: n = 0.2
  } = e, o = Ne(e, Mu), a = e.primary || Bu(r), i = e.secondary || ju(r), s = e.error || Vu(r), c = e.info || Lu(r), d = e.success || zu(r), u = e.warning || Fu(r);
  function b(g) {
    const v = Aa(g, Hn.text.primary) >= t ? Hn.text.primary : Da.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = Aa(g, v);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${v} on ${g}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const p = ({
    color: g,
    name: v,
    mainShade: y = 500,
    lightShade: C = 300,
    darkShade: T = 700
  }) => {
    if (g = _({}, g), !g.main && g[y] && (g.main = g[y]), !g.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : Gr(11, v ? ` (${v})` : "", y));
    if (typeof g.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(g.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Gr(12, v ? ` (${v})` : "", JSON.stringify(g.main)));
    return Ma(g, "light", C, n), Ma(g, "dark", T, n), g.contrastText || (g.contrastText = b(g.main)), g;
  }, h = {
    dark: Hn,
    light: Da
  };
  return process.env.NODE_ENV !== "production" && (h[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)), Qe(_({
    // A collection of common colors.
    common: _({}, Nt),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: r,
    // The colors used to represent primary interface elements for a user.
    primary: p({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: p({
      color: i,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: p({
      color: s,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: p({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: p({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: p({
      color: d,
      name: "success"
    }),
    // The grey colors.
    grey: Ru,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: t,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: b,
    // Generate a rich color object.
    augmentColor: p,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, h[r]), o);
}
const Gu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Hu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ba = {
  textTransform: "uppercase"
}, ja = '"Roboto", "Helvetica", "Arial", sans-serif';
function Xu(e, r) {
  const t = typeof r == "function" ? r(e) : r, {
    fontFamily: n = ja,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: s = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: b
  } = t, p = Ne(t, Gu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const h = o / 14, f = b || ((y) => `${y / d * h}rem`), g = (y, C, T, x, w) => _({
    fontFamily: n,
    fontWeight: y,
    fontSize: f(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: T
  }, n === ja ? {
    letterSpacing: `${Hu(x / C)}em`
  } : {}, w, u), v = {
    h1: g(a, 96, 1.167, -1.5),
    h2: g(a, 60, 1.2, -0.5),
    h3: g(i, 48, 1.167, 0),
    h4: g(i, 34, 1.235, 0.25),
    h5: g(i, 24, 1.334, 0),
    h6: g(s, 20, 1.6, 0.15),
    subtitle1: g(i, 16, 1.75, 0.15),
    subtitle2: g(s, 14, 1.57, 0.1),
    body1: g(i, 16, 1.5, 0.15),
    body2: g(i, 14, 1.43, 0.15),
    button: g(s, 14, 1.75, 0.4, Ba),
    caption: g(i, 12, 1.66, 0.4),
    overline: g(i, 12, 2.66, 1, Ba),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Qe(_({
    htmlFontSize: d,
    pxToRem: f,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: s,
    fontWeightBold: c
  }, v), p, {
    clone: !1
    // No need to clone deep
  });
}
const Wu = 0.2, Yu = 0.14, qu = 0.12;
function he(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wu})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Yu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qu})`].join(",");
}
const Ku = ["none", he(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), he(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), he(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), he(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), he(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), he(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), he(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), he(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), he(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), he(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), he(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), he(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), he(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), he(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), he(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), he(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), he(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), he(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), he(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), he(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), he(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), he(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), he(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), he(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ju = Ku, Zu = ["duration", "easing", "delay"], Qu = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ef = {
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
function Va(e) {
  return `${Math.round(e)}ms`;
}
function rf(e) {
  if (!e)
    return 0;
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function tf(e) {
  const r = _({}, Qu, e.easing), t = _({}, ef, e.duration);
  return _({
    getAutoHeightDuration: rf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = t.standard,
        easing: s = r.easeInOut,
        delay: c = 0
      } = a, d = Ne(a, Zu);
      if (process.env.NODE_ENV !== "production") {
        const u = (p) => typeof p == "string", b = (p) => !isNaN(parseFloat(p));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !b(i) && !u(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), u(s) || console.error('MUI: Argument "easing" must be a string.'), !b(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof i == "string" ? i : Va(i)} ${s} ${typeof c == "string" ? c : Va(c)}`).join(",");
    }
  }, e, {
    easing: r,
    duration: t
  });
}
const nf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, of = nf, af = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function sf(e = {}, ...r) {
  const {
    mixins: t = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = Ne(e, af);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Gr(18));
  const s = Uu(n), c = Ro(e);
  let d = Qe(c, {
    mixins: Su(c.breakpoints, t),
    palette: s,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ju.slice(),
    typography: Xu(s, a),
    transitions: tf(o),
    zIndex: _({}, of)
  });
  if (d = Qe(d, i), d = r.reduce((u, b) => Qe(u, b), d), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], b = (p, h) => {
      let f;
      for (f in p) {
        const g = p[f];
        if (u.indexOf(f) !== -1 && Object.keys(g).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = hn("", f);
            console.error([`MUI: The \`${h}\` component increases the CSS specificity of the \`${f}\` internal state.`, "You can not override it like this: ", JSON.stringify(p, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: g
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          p[f] = {};
        }
      }
    };
    Object.keys(d.components).forEach((p) => {
      const h = d.components[p].styleOverrides;
      h && p.indexOf("Mui") === 0 && b(h, p);
    });
  }
  return d.unstable_sxConfig = _({}, Co, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(b) {
    return Oo({
      sx: b,
      theme: this
    });
  }, d;
}
const pf = sf(), $o = pf, _o = "$$material";
function Io({
  props: e,
  name: r
}) {
  return xu({
    props: e,
    name: r,
    defaultTheme: $o,
    themeId: _o
  });
}
const lf = (e) => Wt(e) && e !== "classes", cf = wu({
  themeId: _o,
  defaultTheme: $o,
  rootShouldForwardProp: lf
}), $t = cf;
function df(e) {
  return hn("MuiSvgIcon", e);
}
ds("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const uf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ff = (e) => {
  const {
    color: r,
    fontSize: t,
    classes: n
  } = e, o = {
    root: ["root", r !== "inherit" && `color${Ye(r)}`, `fontSize${Ye(t)}`]
  };
  return Eo(o, df, n);
}, mf = $t("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
    const {
      ownerState: t
    } = e;
    return [r.root, t.color !== "inherit" && r[`color${Ye(t.color)}`], r[`fontSize${Ye(t.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => {
  var t, n, o, a, i, s, c, d, u, b, p, h, f;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: r.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (t = e.transitions) == null || (n = t.create) == null ? void 0 : n.call(t, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((s = e.typography) == null || (c = s.pxToRem) == null ? void 0 : c.call(s, 24)) || "1.5rem",
      large: ((d = e.typography) == null || (u = d.pxToRem) == null ? void 0 : u.call(d, 35)) || "2.1875rem"
    }[r.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (b = (p = (e.vars || e).palette) == null || (p = p[r.color]) == null ? void 0 : p.main) != null ? b : {
      action: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.active,
      disabled: (f = (e.vars || e).palette) == null || (f = f.action) == null ? void 0 : f.disabled,
      inherit: void 0
    }[r.color]
  };
}), Ao = /* @__PURE__ */ D.forwardRef(function(r, t) {
  const n = Io({
    props: r,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: s = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: u = !1,
    titleAccess: b,
    viewBox: p = "0 0 24 24"
  } = n, h = Ne(n, uf), f = /* @__PURE__ */ D.isValidElement(o) && o.type === "svg", g = _({}, n, {
    color: i,
    component: s,
    fontSize: c,
    instanceFontSize: r.fontSize,
    inheritViewBox: u,
    viewBox: p,
    hasSvgAsChild: f
  }), v = {};
  u || (v.viewBox = p);
  const y = ff(g);
  return /* @__PURE__ */ E(mf, _({
    as: s,
    className: Nr(y.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": b ? void 0 : !0,
    role: b ? "img" : void 0,
    ref: t
  }, v, h, f && o.props, {
    ownerState: g,
    children: [f ? o.props.children : o, b ? /* @__PURE__ */ l("title", {
      children: b
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Ao.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: m.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: m.object,
  /**
   * @ignore
   */
  className: m.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: m.oneOfType([m.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), m.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: m.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: m.oneOfType([m.oneOf(["inherit", "large", "medium", "small"]), m.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: m.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: m.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: m.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: m.oneOfType([m.arrayOf(m.oneOfType([m.func, m.object, m.bool])), m.func, m.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: m.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: m.string
});
Ao.muiName = "SvgIcon";
const La = Ao;
function bs(e, r) {
  function t(n, o) {
    return /* @__PURE__ */ l(La, _({
      "data-testid": `${r}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (t.displayName = `${r}Icon`), t.muiName = La.muiName, /* @__PURE__ */ D.memo(/* @__PURE__ */ D.forwardRef(t));
}
const hf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ls.configure(e);
  }
}, gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ye,
  createChainedFunction: Gc,
  createSvgIcon: bs,
  debounce: Hc,
  deprecatedPropType: Xc,
  isMuiElement: Wc,
  ownerDocument: Jt,
  ownerWindow: Yc,
  requirePropFactory: qc,
  setRef: Zt,
  unstable_ClassNameGenerator: hf,
  unstable_useEnhancedEffect: Hr,
  unstable_useId: as,
  unsupportedProp: Zc,
  useControlled: is,
  useEventCallback: oo,
  useForkRef: Sr,
  useIsFocusVisible: ss
}, Symbol.toStringTag, { value: "Module" })), vf = /* @__PURE__ */ Ec(gf);
var za;
function bf() {
  return za || (za = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return r.createSvgIcon;
      }
    });
    var r = vf;
  }(Bn)), Bn;
}
var wf = Tc;
Object.defineProperty(xo, "__esModule", {
  value: !0
});
var ws = xo.default = void 0, yf = wf(bf()), xf = bp;
ws = xo.default = (0, yf.default)(/* @__PURE__ */ (0, xf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function kf(e) {
  return typeof e == "string";
}
function ct(e, r, t) {
  return e === void 0 || kf(e) ? r : _({}, r, {
    ownerState: _({}, r.ownerState, t)
  });
}
const Nf = {
  disableDefaultClasses: !1
}, Ef = /* @__PURE__ */ D.createContext(Nf);
function Tf(e) {
  const {
    disableDefaultClasses: r
  } = D.useContext(Ef);
  return (t) => r ? "" : e(t);
}
function Sf(e, r = []) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !r.includes(n)).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Cf(e, r, t) {
  return typeof e == "function" ? e(r, t) : e;
}
function Fa(e) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((t) => !(t.match(/^on[A-Z]/) && typeof e[t] == "function")).forEach((t) => {
    r[t] = e[t];
  }), r;
}
function Of(e) {
  const {
    getSlotProps: r,
    additionalProps: t,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!r) {
    const h = Nr(t == null ? void 0 : t.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), f = _({}, t == null ? void 0 : t.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = _({}, t, o, n);
    return h.length > 0 && (g.className = h), Object.keys(f).length > 0 && (g.style = f), {
      props: g,
      internalRef: void 0
    };
  }
  const i = Sf(_({}, o, n)), s = Fa(n), c = Fa(o), d = r(i), u = Nr(d == null ? void 0 : d.className, t == null ? void 0 : t.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), b = _({}, d == null ? void 0 : d.style, t == null ? void 0 : t.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), p = _({}, d, t, c, s);
  return u.length > 0 && (p.className = u), Object.keys(b).length > 0 && (p.style = b), {
    props: p,
    internalRef: d.ref
  };
}
const Rf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Pf(e) {
  var r;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = Ne(e, Rf), s = a ? {} : Cf(n, o), {
    props: c,
    internalRef: d
  } = Of(_({}, i, {
    externalSlotProps: s
  })), u = Sr(d, s == null ? void 0 : s.ref, (r = e.additionalProps) == null ? void 0 : r.ref);
  return ct(t, _({}, c, {
    ref: u
  }), o);
}
const ys = "base";
function $f(e) {
  return `${ys}--${e}`;
}
function _f(e, r) {
  return `${ys}-${e}-${r}`;
}
function xs(e, r) {
  const t = cs[r];
  return t ? $f(t) : _f(e, r);
}
function If(e, r) {
  const t = {};
  return r.forEach((n) => {
    t[n] = xs(e, n);
  }), t;
}
function Af(e) {
  return typeof e == "function" ? e() : e;
}
const en = /* @__PURE__ */ D.forwardRef(function(r, t) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = r, [i, s] = D.useState(null), c = Sr(/* @__PURE__ */ D.isValidElement(n) ? n.ref : null, t);
  if (Hr(() => {
    a || s(Af(o) || document.body);
  }, [o, a]), Hr(() => {
    if (i && !a)
      return Zt(t, i), () => {
        Zt(t, null);
      };
  }, [t, i, a]), a) {
    if (/* @__PURE__ */ D.isValidElement(n)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ D.cloneElement(n, d);
    }
    return /* @__PURE__ */ l(D.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ l(D.Fragment, {
    children: i && /* @__PURE__ */ ul.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (en.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: m.node,
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
  container: m.oneOfType([kt, m.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: m.bool
});
process.env.NODE_ENV !== "production" && (en["propTypes"] = Bc(en.propTypes));
var Ce = "top", je = "bottom", Ve = "right", Oe = "left", Do = "auto", _t = [Ce, je, Ve, Oe], Xr = "start", Et = "end", Df = "clippingParents", ks = "viewport", at = "popper", Mf = "reference", Ua = /* @__PURE__ */ _t.reduce(function(e, r) {
  return e.concat([r + "-" + Xr, r + "-" + Et]);
}, []), Ns = /* @__PURE__ */ [].concat(_t, [Do]).reduce(function(e, r) {
  return e.concat([r, r + "-" + Xr, r + "-" + Et]);
}, []), Bf = "beforeRead", jf = "read", Vf = "afterRead", Lf = "beforeMain", zf = "main", Ff = "afterMain", Uf = "beforeWrite", Gf = "write", Hf = "afterWrite", Xf = [Bf, jf, Vf, Lf, zf, Ff, Uf, Gf, Hf];
function qe(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ae(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var r = e.ownerDocument;
    return r && r.defaultView || window;
  }
  return e;
}
function Or(e) {
  var r = Ae(e).Element;
  return e instanceof r || e instanceof Element;
}
function Be(e) {
  var r = Ae(e).HTMLElement;
  return e instanceof r || e instanceof HTMLElement;
}
function Mo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var r = Ae(e).ShadowRoot;
  return e instanceof r || e instanceof ShadowRoot;
}
function Wf(e) {
  var r = e.state;
  Object.keys(r.elements).forEach(function(t) {
    var n = r.styles[t] || {}, o = r.attributes[t] || {}, a = r.elements[t];
    !Be(a) || !qe(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var s = o[i];
      s === !1 ? a.removeAttribute(i) : a.setAttribute(i, s === !0 ? "" : s);
    }));
  });
}
function Yf(e) {
  var r = e.state, t = {
    popper: {
      position: r.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(r.elements.popper.style, t.popper), r.styles = t, r.elements.arrow && Object.assign(r.elements.arrow.style, t.arrow), function() {
    Object.keys(r.elements).forEach(function(n) {
      var o = r.elements[n], a = r.attributes[n] || {}, i = Object.keys(r.styles.hasOwnProperty(n) ? r.styles[n] : t[n]), s = i.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Be(o) || !qe(o) || (Object.assign(o.style, s), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const qf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Wf,
  effect: Yf,
  requires: ["computeStyles"]
};
function He(e) {
  return e.split("-")[0];
}
var Er = Math.max, rn = Math.min, Wr = Math.round;
function io() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(r) {
    return r.brand + "/" + r.version;
  }).join(" ") : navigator.userAgent;
}
function Es() {
  return !/^((?!chrome|android).)*safari/i.test(io());
}
function Yr(e, r, t) {
  r === void 0 && (r = !1), t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  r && Be(e) && (o = e.offsetWidth > 0 && Wr(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Wr(n.height) / e.offsetHeight || 1);
  var i = Or(e) ? Ae(e) : window, s = i.visualViewport, c = !Es() && t, d = (n.left + (c && s ? s.offsetLeft : 0)) / o, u = (n.top + (c && s ? s.offsetTop : 0)) / a, b = n.width / o, p = n.height / a;
  return {
    width: b,
    height: p,
    top: u,
    right: d + b,
    bottom: u + p,
    left: d,
    x: d,
    y: u
  };
}
function Bo(e) {
  var r = Yr(e), t = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(r.width - t) <= 1 && (t = r.width), Math.abs(r.height - n) <= 1 && (n = r.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: t,
    height: n
  };
}
function Ts(e, r) {
  var t = r.getRootNode && r.getRootNode();
  if (e.contains(r))
    return !0;
  if (t && Mo(t)) {
    var n = r;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function rr(e) {
  return Ae(e).getComputedStyle(e);
}
function Kf(e) {
  return ["table", "td", "th"].indexOf(qe(e)) >= 0;
}
function ur(e) {
  return ((Or(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Tn(e) {
  return qe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Mo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ur(e)
  );
}
function Ga(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  rr(e).position === "fixed" ? null : e.offsetParent;
}
function Jf(e) {
  var r = /firefox/i.test(io()), t = /Trident/i.test(io());
  if (t && Be(e)) {
    var n = rr(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Tn(e);
  for (Mo(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(qe(o)) < 0; ) {
    var a = rr(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || r && a.willChange === "filter" || r && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function It(e) {
  for (var r = Ae(e), t = Ga(e); t && Kf(t) && rr(t).position === "static"; )
    t = Ga(t);
  return t && (qe(t) === "html" || qe(t) === "body" && rr(t).position === "static") ? r : t || Jf(e) || r;
}
function jo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function ht(e, r, t) {
  return Er(e, rn(r, t));
}
function Zf(e, r, t) {
  var n = ht(e, r, t);
  return n > t ? t : n;
}
function Ss() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Cs(e) {
  return Object.assign({}, Ss(), e);
}
function Os(e, r) {
  return r.reduce(function(t, n) {
    return t[n] = e, t;
  }, {});
}
var Qf = function(r, t) {
  return r = typeof r == "function" ? r(Object.assign({}, t.rects, {
    placement: t.placement
  })) : r, Cs(typeof r != "number" ? r : Os(r, _t));
};
function em(e) {
  var r, t = e.state, n = e.name, o = e.options, a = t.elements.arrow, i = t.modifiersData.popperOffsets, s = He(t.placement), c = jo(s), d = [Oe, Ve].indexOf(s) >= 0, u = d ? "height" : "width";
  if (!(!a || !i)) {
    var b = Qf(o.padding, t), p = Bo(a), h = c === "y" ? Ce : Oe, f = c === "y" ? je : Ve, g = t.rects.reference[u] + t.rects.reference[c] - i[c] - t.rects.popper[u], v = i[c] - t.rects.reference[c], y = It(a), C = y ? c === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, T = g / 2 - v / 2, x = b[h], w = C - p[u] - b[f], O = C / 2 - p[u] / 2 + T, P = ht(x, O, w), V = c;
    t.modifiersData[n] = (r = {}, r[V] = P, r.centerOffset = P - O, r);
  }
}
function rm(e) {
  var r = e.state, t = e.options, n = t.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = r.elements.popper.querySelector(o), !o) || Ts(r.elements.popper, o) && (r.elements.arrow = o));
}
const tm = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: em,
  effect: rm,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function qr(e) {
  return e.split("-")[1];
}
var nm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function om(e, r) {
  var t = e.x, n = e.y, o = r.devicePixelRatio || 1;
  return {
    x: Wr(t * o) / o || 0,
    y: Wr(n * o) / o || 0
  };
}
function Ha(e) {
  var r, t = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, s = e.position, c = e.gpuAcceleration, d = e.adaptive, u = e.roundOffsets, b = e.isFixed, p = i.x, h = p === void 0 ? 0 : p, f = i.y, g = f === void 0 ? 0 : f, v = typeof u == "function" ? u({
    x: h,
    y: g
  }) : {
    x: h,
    y: g
  };
  h = v.x, g = v.y;
  var y = i.hasOwnProperty("x"), C = i.hasOwnProperty("y"), T = Oe, x = Ce, w = window;
  if (d) {
    var O = It(t), P = "clientHeight", V = "clientWidth";
    if (O === Ae(t) && (O = ur(t), rr(O).position !== "static" && s === "absolute" && (P = "scrollHeight", V = "scrollWidth")), O = O, o === Ce || (o === Oe || o === Ve) && a === Et) {
      x = je;
      var S = b && O === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[P]
      );
      g -= S - n.height, g *= c ? 1 : -1;
    }
    if (o === Oe || (o === Ce || o === je) && a === Et) {
      T = Ve;
      var $ = b && O === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[V]
      );
      h -= $ - n.width, h *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: s
  }, d && nm), j = u === !0 ? om({
    x: h,
    y: g
  }, Ae(t)) : {
    x: h,
    y: g
  };
  if (h = j.x, g = j.y, c) {
    var B;
    return Object.assign({}, k, (B = {}, B[x] = C ? "0" : "", B[T] = y ? "0" : "", B.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + h + "px, " + g + "px)" : "translate3d(" + h + "px, " + g + "px, 0)", B));
  }
  return Object.assign({}, k, (r = {}, r[x] = C ? g + "px" : "", r[T] = y ? h + "px" : "", r.transform = "", r));
}
function am(e) {
  var r = e.state, t = e.options, n = t.gpuAcceleration, o = n === void 0 ? !0 : n, a = t.adaptive, i = a === void 0 ? !0 : a, s = t.roundOffsets, c = s === void 0 ? !0 : s, d = {
    placement: He(r.placement),
    variation: qr(r.placement),
    popper: r.elements.popper,
    popperRect: r.rects.popper,
    gpuAcceleration: o,
    isFixed: r.options.strategy === "fixed"
  };
  r.modifiersData.popperOffsets != null && (r.styles.popper = Object.assign({}, r.styles.popper, Ha(Object.assign({}, d, {
    offsets: r.modifiersData.popperOffsets,
    position: r.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), r.modifiersData.arrow != null && (r.styles.arrow = Object.assign({}, r.styles.arrow, Ha(Object.assign({}, d, {
    offsets: r.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), r.attributes.popper = Object.assign({}, r.attributes.popper, {
    "data-popper-placement": r.placement
  });
}
const im = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: am,
  data: {}
};
var Ft = {
  passive: !0
};
function sm(e) {
  var r = e.state, t = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, s = i === void 0 ? !0 : i, c = Ae(r.elements.popper), d = [].concat(r.scrollParents.reference, r.scrollParents.popper);
  return a && d.forEach(function(u) {
    u.addEventListener("scroll", t.update, Ft);
  }), s && c.addEventListener("resize", t.update, Ft), function() {
    a && d.forEach(function(u) {
      u.removeEventListener("scroll", t.update, Ft);
    }), s && c.removeEventListener("resize", t.update, Ft);
  };
}
const pm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: sm,
  data: {}
};
var lm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function qt(e) {
  return e.replace(/left|right|bottom|top/g, function(r) {
    return lm[r];
  });
}
var cm = {
  start: "end",
  end: "start"
};
function Xa(e) {
  return e.replace(/start|end/g, function(r) {
    return cm[r];
  });
}
function Vo(e) {
  var r = Ae(e), t = r.pageXOffset, n = r.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: n
  };
}
function Lo(e) {
  return Yr(ur(e)).left + Vo(e).scrollLeft;
}
function dm(e, r) {
  var t = Ae(e), n = ur(e), o = t.visualViewport, a = n.clientWidth, i = n.clientHeight, s = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = Es();
    (d || !d && r === "fixed") && (s = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s + Lo(e),
    y: c
  };
}
function um(e) {
  var r, t = ur(e), n = Vo(e), o = (r = e.ownerDocument) == null ? void 0 : r.body, a = Er(t.scrollWidth, t.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Er(t.scrollHeight, t.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -n.scrollLeft + Lo(e), c = -n.scrollTop;
  return rr(o || t).direction === "rtl" && (s += Er(t.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: s,
    y: c
  };
}
function zo(e) {
  var r = rr(e), t = r.overflow, n = r.overflowX, o = r.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + o + n);
}
function Rs(e) {
  return ["html", "body", "#document"].indexOf(qe(e)) >= 0 ? e.ownerDocument.body : Be(e) && zo(e) ? e : Rs(Tn(e));
}
function gt(e, r) {
  var t;
  r === void 0 && (r = []);
  var n = Rs(e), o = n === ((t = e.ownerDocument) == null ? void 0 : t.body), a = Ae(n), i = o ? [a].concat(a.visualViewport || [], zo(n) ? n : []) : n, s = r.concat(i);
  return o ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(gt(Tn(i)))
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
function fm(e, r) {
  var t = Yr(e, !1, r === "fixed");
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Wa(e, r, t) {
  return r === ks ? so(dm(e, t)) : Or(r) ? fm(r, t) : so(um(ur(e)));
}
function mm(e) {
  var r = gt(Tn(e)), t = ["absolute", "fixed"].indexOf(rr(e).position) >= 0, n = t && Be(e) ? It(e) : e;
  return Or(n) ? r.filter(function(o) {
    return Or(o) && Ts(o, n) && qe(o) !== "body";
  }) : [];
}
function hm(e, r, t, n) {
  var o = r === "clippingParents" ? mm(e) : [].concat(r), a = [].concat(o, [t]), i = a[0], s = a.reduce(function(c, d) {
    var u = Wa(e, d, n);
    return c.top = Er(u.top, c.top), c.right = rn(u.right, c.right), c.bottom = rn(u.bottom, c.bottom), c.left = Er(u.left, c.left), c;
  }, Wa(e, i, n));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function Ps(e) {
  var r = e.reference, t = e.element, n = e.placement, o = n ? He(n) : null, a = n ? qr(n) : null, i = r.x + r.width / 2 - t.width / 2, s = r.y + r.height / 2 - t.height / 2, c;
  switch (o) {
    case Ce:
      c = {
        x: i,
        y: r.y - t.height
      };
      break;
    case je:
      c = {
        x: i,
        y: r.y + r.height
      };
      break;
    case Ve:
      c = {
        x: r.x + r.width,
        y: s
      };
      break;
    case Oe:
      c = {
        x: r.x - t.width,
        y: s
      };
      break;
    default:
      c = {
        x: r.x,
        y: r.y
      };
  }
  var d = o ? jo(o) : null;
  if (d != null) {
    var u = d === "y" ? "height" : "width";
    switch (a) {
      case Xr:
        c[d] = c[d] - (r[u] / 2 - t[u] / 2);
        break;
      case Et:
        c[d] = c[d] + (r[u] / 2 - t[u] / 2);
        break;
    }
  }
  return c;
}
function Tt(e, r) {
  r === void 0 && (r = {});
  var t = r, n = t.placement, o = n === void 0 ? e.placement : n, a = t.strategy, i = a === void 0 ? e.strategy : a, s = t.boundary, c = s === void 0 ? Df : s, d = t.rootBoundary, u = d === void 0 ? ks : d, b = t.elementContext, p = b === void 0 ? at : b, h = t.altBoundary, f = h === void 0 ? !1 : h, g = t.padding, v = g === void 0 ? 0 : g, y = Cs(typeof v != "number" ? v : Os(v, _t)), C = p === at ? Mf : at, T = e.rects.popper, x = e.elements[f ? C : p], w = hm(Or(x) ? x : x.contextElement || ur(e.elements.popper), c, u, i), O = Yr(e.elements.reference), P = Ps({
    reference: O,
    element: T,
    strategy: "absolute",
    placement: o
  }), V = so(Object.assign({}, T, P)), S = p === at ? V : O, $ = {
    top: w.top - S.top + y.top,
    bottom: S.bottom - w.bottom + y.bottom,
    left: w.left - S.left + y.left,
    right: S.right - w.right + y.right
  }, k = e.modifiersData.offset;
  if (p === at && k) {
    var j = k[o];
    Object.keys($).forEach(function(B) {
      var Z = [Ve, je].indexOf(B) >= 0 ? 1 : -1, J = [Ce, je].indexOf(B) >= 0 ? "y" : "x";
      $[B] += j[J] * Z;
    });
  }
  return $;
}
function gm(e, r) {
  r === void 0 && (r = {});
  var t = r, n = t.placement, o = t.boundary, a = t.rootBoundary, i = t.padding, s = t.flipVariations, c = t.allowedAutoPlacements, d = c === void 0 ? Ns : c, u = qr(n), b = u ? s ? Ua : Ua.filter(function(f) {
    return qr(f) === u;
  }) : _t, p = b.filter(function(f) {
    return d.indexOf(f) >= 0;
  });
  p.length === 0 && (p = b);
  var h = p.reduce(function(f, g) {
    return f[g] = Tt(e, {
      placement: g,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[He(g)], f;
  }, {});
  return Object.keys(h).sort(function(f, g) {
    return h[f] - h[g];
  });
}
function vm(e) {
  if (He(e) === Do)
    return [];
  var r = qt(e);
  return [Xa(e), r, Xa(r)];
}
function bm(e) {
  var r = e.state, t = e.options, n = e.name;
  if (!r.modifiersData[n]._skip) {
    for (var o = t.mainAxis, a = o === void 0 ? !0 : o, i = t.altAxis, s = i === void 0 ? !0 : i, c = t.fallbackPlacements, d = t.padding, u = t.boundary, b = t.rootBoundary, p = t.altBoundary, h = t.flipVariations, f = h === void 0 ? !0 : h, g = t.allowedAutoPlacements, v = r.options.placement, y = He(v), C = y === v, T = c || (C || !f ? [qt(v)] : vm(v)), x = [v].concat(T).reduce(function(F, q) {
      return F.concat(He(q) === Do ? gm(r, {
        placement: q,
        boundary: u,
        rootBoundary: b,
        padding: d,
        flipVariations: f,
        allowedAutoPlacements: g
      }) : q);
    }, []), w = r.rects.reference, O = r.rects.popper, P = /* @__PURE__ */ new Map(), V = !0, S = x[0], $ = 0; $ < x.length; $++) {
      var k = x[$], j = He(k), B = qr(k) === Xr, Z = [Ce, je].indexOf(j) >= 0, J = Z ? "width" : "height", X = Tt(r, {
        placement: k,
        boundary: u,
        rootBoundary: b,
        altBoundary: p,
        padding: d
      }), te = Z ? B ? Ve : Oe : B ? je : Ce;
      w[J] > O[J] && (te = qt(te));
      var ae = qt(te), z = [];
      if (a && z.push(X[j] <= 0), s && z.push(X[te] <= 0, X[ae] <= 0), z.every(function(F) {
        return F;
      })) {
        S = k, V = !1;
        break;
      }
      P.set(k, z);
    }
    if (V)
      for (var N = f ? 3 : 1, I = function(q) {
        var G = x.find(function(K) {
          var Y = P.get(K);
          if (Y)
            return Y.slice(0, q).every(function(Q) {
              return Q;
            });
        });
        if (G)
          return S = G, "break";
      }, W = N; W > 0; W--) {
        var U = I(W);
        if (U === "break")
          break;
      }
    r.placement !== S && (r.modifiersData[n]._skip = !0, r.placement = S, r.reset = !0);
  }
}
const wm = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: bm,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ya(e, r, t) {
  return t === void 0 && (t = {
    x: 0,
    y: 0
  }), {
    top: e.top - r.height - t.y,
    right: e.right - r.width + t.x,
    bottom: e.bottom - r.height + t.y,
    left: e.left - r.width - t.x
  };
}
function qa(e) {
  return [Ce, Ve, je, Oe].some(function(r) {
    return e[r] >= 0;
  });
}
function ym(e) {
  var r = e.state, t = e.name, n = r.rects.reference, o = r.rects.popper, a = r.modifiersData.preventOverflow, i = Tt(r, {
    elementContext: "reference"
  }), s = Tt(r, {
    altBoundary: !0
  }), c = Ya(i, n), d = Ya(s, o, a), u = qa(c), b = qa(d);
  r.modifiersData[t] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: b
  }, r.attributes.popper = Object.assign({}, r.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": b
  });
}
const xm = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: ym
};
function km(e, r, t) {
  var n = He(e), o = [Oe, Ce].indexOf(n) >= 0 ? -1 : 1, a = typeof t == "function" ? t(Object.assign({}, r, {
    placement: e
  })) : t, i = a[0], s = a[1];
  return i = i || 0, s = (s || 0) * o, [Oe, Ve].indexOf(n) >= 0 ? {
    x: s,
    y: i
  } : {
    x: i,
    y: s
  };
}
function Nm(e) {
  var r = e.state, t = e.options, n = e.name, o = t.offset, a = o === void 0 ? [0, 0] : o, i = Ns.reduce(function(u, b) {
    return u[b] = km(b, r.rects, a), u;
  }, {}), s = i[r.placement], c = s.x, d = s.y;
  r.modifiersData.popperOffsets != null && (r.modifiersData.popperOffsets.x += c, r.modifiersData.popperOffsets.y += d), r.modifiersData[n] = i;
}
const Em = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Nm
};
function Tm(e) {
  var r = e.state, t = e.name;
  r.modifiersData[t] = Ps({
    reference: r.rects.reference,
    element: r.rects.popper,
    strategy: "absolute",
    placement: r.placement
  });
}
const Sm = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Tm,
  data: {}
};
function Cm(e) {
  return e === "x" ? "y" : "x";
}
function Om(e) {
  var r = e.state, t = e.options, n = e.name, o = t.mainAxis, a = o === void 0 ? !0 : o, i = t.altAxis, s = i === void 0 ? !1 : i, c = t.boundary, d = t.rootBoundary, u = t.altBoundary, b = t.padding, p = t.tether, h = p === void 0 ? !0 : p, f = t.tetherOffset, g = f === void 0 ? 0 : f, v = Tt(r, {
    boundary: c,
    rootBoundary: d,
    padding: b,
    altBoundary: u
  }), y = He(r.placement), C = qr(r.placement), T = !C, x = jo(y), w = Cm(x), O = r.modifiersData.popperOffsets, P = r.rects.reference, V = r.rects.popper, S = typeof g == "function" ? g(Object.assign({}, r.rects, {
    placement: r.placement
  })) : g, $ = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), k = r.modifiersData.offset ? r.modifiersData.offset[r.placement] : null, j = {
    x: 0,
    y: 0
  };
  if (O) {
    if (a) {
      var B, Z = x === "y" ? Ce : Oe, J = x === "y" ? je : Ve, X = x === "y" ? "height" : "width", te = O[x], ae = te + v[Z], z = te - v[J], N = h ? -V[X] / 2 : 0, I = C === Xr ? P[X] : V[X], W = C === Xr ? -V[X] : -P[X], U = r.elements.arrow, F = h && U ? Bo(U) : {
        width: 0,
        height: 0
      }, q = r.modifiersData["arrow#persistent"] ? r.modifiersData["arrow#persistent"].padding : Ss(), G = q[Z], K = q[J], Y = ht(0, P[X], F[X]), Q = T ? P[X] / 2 - N - Y - G - $.mainAxis : I - Y - G - $.mainAxis, ee = T ? -P[X] / 2 + N + Y + K + $.mainAxis : W + Y + K + $.mainAxis, de = r.elements.arrow && It(r.elements.arrow), A = de ? x === "y" ? de.clientTop || 0 : de.clientLeft || 0 : 0, ke = (B = k == null ? void 0 : k[x]) != null ? B : 0, L = te + Q - ke - A, xe = te + ee - ke, ze = ht(h ? rn(ae, L) : ae, te, h ? Er(z, xe) : z);
      O[x] = ze, j[x] = ze - te;
    }
    if (s) {
      var fr, Ee = x === "x" ? Ce : Oe, Dt = x === "x" ? je : Ve, Fe = O[w], Rr = w === "y" ? "height" : "width", mr = Fe + v[Ee], Pr = Fe - v[Dt], $r = [Ce, Oe].indexOf(y) !== -1, _r = (fr = k == null ? void 0 : k[w]) != null ? fr : 0, hr = $r ? mr : Fe - P[Rr] - V[Rr] - _r + $.altAxis, Jr = $r ? Fe + P[Rr] + V[Rr] - _r - $.altAxis : Pr, Mt = h && $r ? Zf(hr, Fe, Jr) : ht(h ? hr : mr, Fe, h ? Jr : Pr);
      O[w] = Mt, j[w] = Mt - Fe;
    }
    r.modifiersData[n] = j;
  }
}
const Rm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Om,
  requiresIfExists: ["offset"]
};
function Pm(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function $m(e) {
  return e === Ae(e) || !Be(e) ? Vo(e) : Pm(e);
}
function _m(e) {
  var r = e.getBoundingClientRect(), t = Wr(r.width) / e.offsetWidth || 1, n = Wr(r.height) / e.offsetHeight || 1;
  return t !== 1 || n !== 1;
}
function Im(e, r, t) {
  t === void 0 && (t = !1);
  var n = Be(r), o = Be(r) && _m(r), a = ur(r), i = Yr(e, o, t), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !t) && ((qe(r) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  zo(a)) && (s = $m(r)), Be(r) ? (c = Yr(r, !0), c.x += r.clientLeft, c.y += r.clientTop) : a && (c.x = Lo(a))), {
    x: i.left + s.scrollLeft - c.x,
    y: i.top + s.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Am(e) {
  var r = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(a) {
    r.set(a.name, a);
  });
  function o(a) {
    t.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(s) {
      if (!t.has(s)) {
        var c = r.get(s);
        c && o(c);
      }
    }), n.push(a);
  }
  return e.forEach(function(a) {
    t.has(a.name) || o(a);
  }), n;
}
function Dm(e) {
  var r = Am(e);
  return Xf.reduce(function(t, n) {
    return t.concat(r.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Mm(e) {
  var r;
  return function() {
    return r || (r = new Promise(function(t) {
      Promise.resolve().then(function() {
        r = void 0, t(e());
      });
    })), r;
  };
}
function Bm(e) {
  var r = e.reduce(function(t, n) {
    var o = t[n.name];
    return t[n.name] = o ? Object.assign({}, o, n, {
      options: Object.assign({}, o.options, n.options),
      data: Object.assign({}, o.data, n.data)
    }) : n, t;
  }, {});
  return Object.keys(r).map(function(t) {
    return r[t];
  });
}
var Ka = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ja() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  return !r.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function jm(e) {
  e === void 0 && (e = {});
  var r = e, t = r.defaultModifiers, n = t === void 0 ? [] : t, o = r.defaultOptions, a = o === void 0 ? Ka : o;
  return function(s, c, d) {
    d === void 0 && (d = a);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ka, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: c
      },
      attributes: {},
      styles: {}
    }, b = [], p = !1, h = {
      state: u,
      setOptions: function(y) {
        var C = typeof y == "function" ? y(u.options) : y;
        g(), u.options = Object.assign({}, a, u.options, C), u.scrollParents = {
          reference: Or(s) ? gt(s) : s.contextElement ? gt(s.contextElement) : [],
          popper: gt(c)
        };
        var T = Dm(Bm([].concat(n, u.options.modifiers)));
        return u.orderedModifiers = T.filter(function(x) {
          return x.enabled;
        }), f(), h.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!p) {
          var y = u.elements, C = y.reference, T = y.popper;
          if (Ja(C, T)) {
            u.rects = {
              reference: Im(C, It(T), u.options.strategy === "fixed"),
              popper: Bo(T)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function($) {
              return u.modifiersData[$.name] = Object.assign({}, $.data);
            });
            for (var x = 0; x < u.orderedModifiers.length; x++) {
              if (u.reset === !0) {
                u.reset = !1, x = -1;
                continue;
              }
              var w = u.orderedModifiers[x], O = w.fn, P = w.options, V = P === void 0 ? {} : P, S = w.name;
              typeof O == "function" && (u = O({
                state: u,
                options: V,
                name: S,
                instance: h
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Mm(function() {
        return new Promise(function(v) {
          h.forceUpdate(), v(u);
        });
      }),
      destroy: function() {
        g(), p = !0;
      }
    };
    if (!Ja(s, c))
      return h;
    h.setOptions(d).then(function(v) {
      !p && d.onFirstUpdate && d.onFirstUpdate(v);
    });
    function f() {
      u.orderedModifiers.forEach(function(v) {
        var y = v.name, C = v.options, T = C === void 0 ? {} : C, x = v.effect;
        if (typeof x == "function") {
          var w = x({
            state: u,
            name: y,
            instance: h,
            options: T
          }), O = function() {
          };
          b.push(w || O);
        }
      });
    }
    function g() {
      b.forEach(function(v) {
        return v();
      }), b = [];
    }
    return h;
  };
}
var Vm = [pm, Sm, im, qf, Em, wm, Rm, tm, xm], Lm = /* @__PURE__ */ jm({
  defaultModifiers: Vm
});
const $s = "Popper";
function zm(e) {
  return xs($s, e);
}
If($s, ["root"]);
const Fm = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Um = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Gm(e, r) {
  if (r === "ltr")
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
function tn(e) {
  return typeof e == "function" ? e() : e;
}
function Sn(e) {
  return e.nodeType !== void 0;
}
function Hm(e) {
  return !Sn(e);
}
const Xm = () => Eo({
  root: ["root"]
}, Tf(zm)), Wm = {}, Ym = /* @__PURE__ */ D.forwardRef(function(r, t) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: s,
    modifiers: c,
    open: d,
    placement: u,
    popperOptions: b,
    popperRef: p,
    slotProps: h = {},
    slots: f = {},
    TransitionProps: g
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = r, v = Ne(r, Fm), y = D.useRef(null), C = Sr(y, t), T = D.useRef(null), x = Sr(T, p), w = D.useRef(x);
  Hr(() => {
    w.current = x;
  }, [x]), D.useImperativeHandle(p, () => T.current, []);
  const O = Gm(u, i), [P, V] = D.useState(O), [S, $] = D.useState(tn(o));
  D.useEffect(() => {
    T.current && T.current.forceUpdate();
  }), D.useEffect(() => {
    o && $(tn(o));
  }, [o]), Hr(() => {
    if (!S || !d)
      return;
    const J = (ae) => {
      V(ae.placement);
    };
    if (process.env.NODE_ENV !== "production" && S && Sn(S) && S.nodeType === 1) {
      const ae = S.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ae.top === 0 && ae.left === 0 && ae.right === 0 && ae.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let X = [{
      name: "preventOverflow",
      options: {
        altBoundary: s
      }
    }, {
      name: "flip",
      options: {
        altBoundary: s
      }
    }, {
      name: "onUpdate",
      enabled: !0,
      phase: "afterWrite",
      fn: ({
        state: ae
      }) => {
        J(ae);
      }
    }];
    c != null && (X = X.concat(c)), b && b.modifiers != null && (X = X.concat(b.modifiers));
    const te = Lm(S, y.current, _({
      placement: O
    }, b, {
      modifiers: X
    }));
    return w.current(te), () => {
      te.destroy(), w.current(null);
    };
  }, [S, s, c, d, b, O]);
  const k = {
    placement: P
  };
  g !== null && (k.TransitionProps = g);
  const j = Xm(), B = (n = f.root) != null ? n : "div", Z = Pf({
    elementType: B,
    externalSlotProps: h.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: C
    },
    ownerState: r,
    className: j.root
  });
  return /* @__PURE__ */ l(B, _({}, Z, {
    children: typeof a == "function" ? a(k) : a
  }));
}), _s = /* @__PURE__ */ D.forwardRef(function(r, t) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: s = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: u,
    placement: b = "bottom",
    popperOptions: p = Wm,
    popperRef: h,
    style: f,
    transition: g = !1,
    slotProps: v = {},
    slots: y = {}
  } = r, C = Ne(r, Um), [T, x] = D.useState(!0), w = () => {
    x(!1);
  }, O = () => {
    x(!0);
  };
  if (!c && !u && (!g || T))
    return null;
  let P;
  if (a)
    P = a;
  else if (n) {
    const $ = tn(n);
    P = $ && Sn($) ? Jt($).body : Jt(null).body;
  }
  const V = !u && c && (!g || T) ? "none" : void 0, S = g ? {
    in: u,
    onEnter: w,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ l(en, {
    disablePortal: s,
    container: P,
    children: /* @__PURE__ */ l(Ym, _({
      anchorEl: n,
      direction: i,
      disablePortal: s,
      modifiers: d,
      ref: t,
      open: g ? !T : u,
      placement: b,
      popperOptions: p,
      popperRef: h,
      slotProps: v,
      slots: y
    }, C, {
      style: _({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: V
      }, f),
      TransitionProps: S,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (_s.propTypes = {
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
  anchorEl: ko(m.oneOfType([kt, m.object, m.func]), (e) => {
    if (e.open) {
      const r = tn(e.anchorEl);
      if (r && Sn(r) && r.nodeType === 1) {
        const t = r.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && t.top === 0 && t.left === 0 && t.right === 0 && t.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!r || typeof r.getBoundingClientRect != "function" || Hm(r) && r.contextElement != null && r.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: m.oneOfType([m.node, m.func]),
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
  container: m.oneOfType([kt, m.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: m.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: m.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: m.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: m.arrayOf(m.shape({
    data: m.object,
    effect: m.func,
    enabled: m.bool,
    fn: m.func,
    name: m.any,
    options: m.object,
    phase: m.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: m.arrayOf(m.string),
    requiresIfExists: m.arrayOf(m.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: m.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: m.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: m.shape({
    modifiers: m.array,
    onFirstUpdate: m.func,
    placement: m.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: m.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: os,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: m.shape({
    root: m.oneOfType([m.func, m.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: m.shape({
    root: m.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: m.bool
});
function Is() {
  const e = gs($o);
  return process.env.NODE_ENV !== "production" && D.useDebugValue(e), e[_o] || e;
}
function po(e, r) {
  return po = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, po(e, r);
}
function qm(e, r) {
  e.prototype = Object.create(r.prototype), e.prototype.constructor = e, po(e, r);
}
const Za = {
  disabled: !1
};
var Km = process.env.NODE_ENV !== "production" ? m.oneOfType([m.number, m.shape({
  enter: m.number,
  exit: m.number,
  appear: m.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && m.oneOfType([m.string, m.shape({
  enter: m.string,
  exit: m.string,
  active: m.string
}), m.shape({
  enter: m.string,
  enterDone: m.string,
  enterActive: m.string,
  exit: m.string,
  exitDone: m.string,
  exitActive: m.string
})]);
const As = M.createContext(null);
var Jm = function(r) {
  return r.scrollTop;
}, dt = "unmounted", br = "exited", wr = "entering", Vr = "entered", lo = "exiting", tr = /* @__PURE__ */ function(e) {
  qm(r, e);
  function r(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, s = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? s ? (c = br, a.appearStatus = wr) : c = Vr : n.unmountOnExit || n.mountOnEnter ? c = dt : c = br, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  r.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === dt ? {
      status: br
    } : null;
  };
  var t = r.prototype;
  return t.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, t.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== wr && i !== Vr && (a = wr) : (i === wr || i === Vr) && (a = lo);
    }
    this.updateStatus(!1, a);
  }, t.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, t.getTimeouts = function() {
    var o = this.props.timeout, a, i, s;
    return a = i = s = o, o != null && typeof o != "number" && (a = o.exit, i = o.enter, s = o.appear !== void 0 ? o.appear : i), {
      exit: a,
      enter: i,
      appear: s
    };
  }, t.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === wr) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Vt.findDOMNode(this);
          i && Jm(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === br && this.setState({
        status: dt
      });
  }, t.performEnter = function(o) {
    var a = this, i = this.props.enter, s = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [s] : [Vt.findDOMNode(this), s], d = c[0], u = c[1], b = this.getTimeouts(), p = s ? b.appear : b.enter;
    if (!o && !i || Za.disabled) {
      this.safeSetState({
        status: Vr
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, u), this.safeSetState({
      status: wr
    }, function() {
      a.props.onEntering(d, u), a.onTransitionEnd(p, function() {
        a.safeSetState({
          status: Vr
        }, function() {
          a.props.onEntered(d, u);
        });
      });
    });
  }, t.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : Vt.findDOMNode(this);
    if (!a || Za.disabled) {
      this.safeSetState({
        status: br
      }, function() {
        o.props.onExited(s);
      });
      return;
    }
    this.props.onExit(s), this.safeSetState({
      status: lo
    }, function() {
      o.props.onExiting(s), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: br
        }, function() {
          o.props.onExited(s);
        });
      });
    });
  }, t.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, t.safeSetState = function(o, a) {
    a = this.setNextCallback(a), this.setState(o, a);
  }, t.setNextCallback = function(o) {
    var a = this, i = !0;
    return this.nextCallback = function(s) {
      i && (i = !1, a.nextCallback = null, o(s));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, t.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var i = this.props.nodeRef ? this.props.nodeRef.current : Vt.findDOMNode(this), s = o == null && !this.props.addEndListener;
    if (!i || s) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], d = c[0], u = c[1];
      this.props.addEndListener(d, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, t.render = function() {
    var o = this.state.status;
    if (o === dt)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var s = Ne(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ M.createElement(As.Provider, {
        value: null
      }, typeof i == "function" ? i(o, s) : M.cloneElement(M.Children.only(i), s))
    );
  }, r;
}(M.Component);
tr.contextType = As;
tr.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: m.shape({
    current: typeof Element > "u" ? m.any : function(e, r, t, n, o, a) {
      var i = e[r];
      return m.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(e, r, t, n, o, a);
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
  children: m.oneOfType([m.func.isRequired, m.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: m.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: m.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: m.bool,
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
  appear: m.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: m.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: m.bool,
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
  timeout: function(r) {
    var t = Km;
    r.addEndListener || (t = t.isRequired);
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
      o[a - 1] = arguments[a];
    return t.apply(void 0, [r].concat(o));
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
  addEndListener: m.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: m.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: m.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: m.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: m.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: m.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: m.func
} : {};
function jr() {
}
tr.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: jr,
  onEntering: jr,
  onEntered: jr,
  onExit: jr,
  onExiting: jr,
  onExited: jr
};
tr.UNMOUNTED = dt;
tr.EXITED = br;
tr.ENTERING = wr;
tr.ENTERED = Vr;
tr.EXITING = lo;
const Zm = tr, Qm = (e) => e.scrollTop;
function Qa(e, r) {
  var t, n;
  const {
    timeout: o,
    easing: a,
    style: i = {}
  } = e;
  return {
    duration: (t = i.transitionDuration) != null ? t : typeof o == "number" ? o : o[r.mode] || 0,
    easing: (n = i.transitionTimingFunction) != null ? n : typeof a == "object" ? a[r.mode] : a,
    delay: i.transitionDelay
  };
}
const eh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function co(e) {
  return `scale(${e}, ${e ** 2})`;
}
const rh = {
  entering: {
    opacity: 1,
    transform: co(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Xn = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Fo = /* @__PURE__ */ D.forwardRef(function(r, t) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: s,
    onEnter: c,
    onEntered: d,
    onEntering: u,
    onExit: b,
    onExited: p,
    onExiting: h,
    style: f,
    timeout: g = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = Zm
  } = r, y = Ne(r, eh), C = lt(), T = D.useRef(), x = Is(), w = D.useRef(null), O = Sr(w, a.ref, t), P = (J) => (X) => {
    if (J) {
      const te = w.current;
      X === void 0 ? J(te) : J(te, X);
    }
  }, V = P(u), S = P((J, X) => {
    Qm(J);
    const {
      duration: te,
      delay: ae,
      easing: z
    } = Qa({
      style: f,
      timeout: g,
      easing: i
    }, {
      mode: "enter"
    });
    let N;
    g === "auto" ? (N = x.transitions.getAutoHeightDuration(J.clientHeight), T.current = N) : N = te, J.style.transition = [x.transitions.create("opacity", {
      duration: N,
      delay: ae
    }), x.transitions.create("transform", {
      duration: Xn ? N : N * 0.666,
      delay: ae,
      easing: z
    })].join(","), c && c(J, X);
  }), $ = P(d), k = P(h), j = P((J) => {
    const {
      duration: X,
      delay: te,
      easing: ae
    } = Qa({
      style: f,
      timeout: g,
      easing: i
    }, {
      mode: "exit"
    });
    let z;
    g === "auto" ? (z = x.transitions.getAutoHeightDuration(J.clientHeight), T.current = z) : z = X, J.style.transition = [x.transitions.create("opacity", {
      duration: z,
      delay: te
    }), x.transitions.create("transform", {
      duration: Xn ? z : z * 0.666,
      delay: Xn ? te : te || z * 0.333,
      easing: ae
    })].join(","), J.style.opacity = 0, J.style.transform = co(0.75), b && b(J);
  }), B = P(p);
  return /* @__PURE__ */ l(v, _({
    appear: o,
    in: s,
    nodeRef: w,
    onEnter: S,
    onEntered: $,
    onEntering: V,
    onExit: j,
    onExited: B,
    onExiting: k,
    addEndListener: (J) => {
      g === "auto" && C.start(T.current || 0, J), n && n(w.current, J);
    },
    timeout: g === "auto" ? null : g
  }, y, {
    children: (J, X) => /* @__PURE__ */ D.cloneElement(a, _({
      style: _({
        opacity: 0,
        transform: co(0.75),
        visibility: J === "exited" && !s ? "hidden" : void 0
      }, rh[J], f, a.props.style),
      ref: O
    }, X))
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
  addEndListener: m.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: m.bool,
  /**
   * A single child content element.
   */
  children: ts.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: m.oneOfType([m.shape({
    enter: m.string,
    exit: m.string
  }), m.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: m.bool,
  /**
   * @ignore
   */
  onEnter: m.func,
  /**
   * @ignore
   */
  onEntered: m.func,
  /**
   * @ignore
   */
  onEntering: m.func,
  /**
   * @ignore
   */
  onExit: m.func,
  /**
   * @ignore
   */
  onExited: m.func,
  /**
   * @ignore
   */
  onExiting: m.func,
  /**
   * @ignore
   */
  style: m.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: m.oneOfType([m.oneOf(["auto"]), m.number, m.shape({
    appear: m.number,
    enter: m.number,
    exit: m.number
  })])
});
Fo.muiSupportAuto = !0;
const ei = Fo, th = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], nh = $t(_s, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, r) => r.root
})({}), Ds = /* @__PURE__ */ D.forwardRef(function(r, t) {
  var n;
  const o = hs(), a = Io({
    props: r,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: s,
    components: c,
    componentsProps: d,
    container: u,
    disablePortal: b,
    keepMounted: p,
    modifiers: h,
    open: f,
    placement: g,
    popperOptions: v,
    popperRef: y,
    transition: C,
    slots: T,
    slotProps: x
  } = a, w = Ne(a, th), O = (n = T == null ? void 0 : T.root) != null ? n : c == null ? void 0 : c.Root, P = _({
    anchorEl: i,
    container: u,
    disablePortal: b,
    keepMounted: p,
    modifiers: h,
    open: f,
    placement: g,
    popperOptions: v,
    popperRef: y,
    transition: C
  }, w);
  return /* @__PURE__ */ l(nh, _({
    as: s,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: x ?? d
  }, P, {
    ref: t
  }));
});
process.env.NODE_ENV !== "production" && (Ds.propTypes = {
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
  anchorEl: m.oneOfType([kt, m.object, m.func]),
  /**
   * Popper render function or node.
   */
  children: m.oneOfType([m.node, m.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: m.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: m.shape({
    Root: m.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: m.shape({
    root: m.oneOfType([m.func, m.object])
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
  container: m.oneOfType([kt, m.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: m.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: m.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: m.arrayOf(m.shape({
    data: m.object,
    effect: m.func,
    enabled: m.bool,
    fn: m.func,
    name: m.any,
    options: m.object,
    phase: m.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: m.arrayOf(m.string),
    requiresIfExists: m.arrayOf(m.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: m.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: m.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: m.shape({
    modifiers: m.array,
    onFirstUpdate: m.func,
    placement: m.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: m.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: os,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: m.shape({
    root: m.oneOfType([m.func, m.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: m.shape({
    root: m.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: m.oneOfType([m.arrayOf(m.oneOfType([m.func, m.object, m.bool])), m.func, m.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: m.bool
});
const Ms = Ds;
function oh(e) {
  return hn("MuiTooltip", e);
}
const ah = ds("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), sr = ah, ih = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function sh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ph = (e) => {
  const {
    classes: r,
    disableInteractive: t,
    arrow: n,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !t && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${Ye(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Eo(i, oh, r);
}, lh = $t(Ms, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, r) => {
    const {
      ownerState: t
    } = e;
    return [r.popper, !t.disableInteractive && r.popperInteractive, t.arrow && r.popperArrow, !t.open && r.popperClose];
  }
})(({
  theme: e,
  ownerState: r,
  open: t
}) => _({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !r.disableInteractive && {
  pointerEvents: "auto"
}, !t && {
  pointerEvents: "none"
}, r.arrow && {
  [`&[data-popper-placement*="bottom"] .${sr.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${sr.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${sr.arrow}`]: _({}, r.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${sr.arrow}`]: _({}, r.isRtl ? {
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
})), ch = $t("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, r) => {
    const {
      ownerState: t
    } = e;
    return [r.tooltip, t.touch && r.touch, t.arrow && r.tooltipArrow, r[`tooltipPlacement${Ye(t.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => _({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : vs(e.palette.grey[700], 0.92),
  borderRadius: (e.vars || e).shape.borderRadius,
  color: (e.vars || e).palette.common.white,
  fontFamily: e.typography.fontFamily,
  padding: "4px 8px",
  fontSize: e.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: e.typography.fontWeightMedium
}, r.arrow && {
  position: "relative",
  margin: 0
}, r.touch && {
  padding: "8px 16px",
  fontSize: e.typography.pxToRem(14),
  lineHeight: `${sh(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${sr.popper}[data-popper-placement*="left"] &`]: _({
    transformOrigin: "right center"
  }, r.isRtl ? _({
    marginLeft: "14px"
  }, r.touch && {
    marginLeft: "24px"
  }) : _({
    marginRight: "14px"
  }, r.touch && {
    marginRight: "24px"
  })),
  [`.${sr.popper}[data-popper-placement*="right"] &`]: _({
    transformOrigin: "left center"
  }, r.isRtl ? _({
    marginRight: "14px"
  }, r.touch && {
    marginRight: "24px"
  }) : _({
    marginLeft: "14px"
  }, r.touch && {
    marginLeft: "24px"
  })),
  [`.${sr.popper}[data-popper-placement*="top"] &`]: _({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, r.touch && {
    marginBottom: "24px"
  }),
  [`.${sr.popper}[data-popper-placement*="bottom"] &`]: _({
    transformOrigin: "center top",
    marginTop: "14px"
  }, r.touch && {
    marginTop: "24px"
  })
})), dh = $t("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (e, r) => r.arrow
})(({
  theme: e
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: e.vars ? e.vars.palette.Tooltip.bg : vs(e.palette.grey[700], 0.9),
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
let Ut = !1;
const ri = new Ot();
let it = {
  x: 0,
  y: 0
};
function Gt(e, r) {
  return (t) => {
    r && r(t), e(t);
  };
}
const Bs = /* @__PURE__ */ D.forwardRef(function(r, t) {
  var n, o, a, i, s, c, d, u, b, p, h, f, g, v, y, C, T, x, w;
  const O = Io({
    props: r,
    name: "MuiTooltip"
  }), {
    arrow: P = !1,
    children: V,
    components: S = {},
    componentsProps: $ = {},
    describeChild: k = !1,
    disableFocusListener: j = !1,
    disableHoverListener: B = !1,
    disableInteractive: Z = !1,
    disableTouchListener: J = !1,
    enterDelay: X = 100,
    enterNextDelay: te = 0,
    enterTouchDelay: ae = 700,
    followCursor: z = !1,
    id: N,
    leaveDelay: I = 0,
    leaveTouchDelay: W = 1500,
    onClose: U,
    onOpen: F,
    open: q,
    placement: G = "bottom",
    PopperComponent: K,
    PopperProps: Y = {},
    slotProps: Q = {},
    slots: ee = {},
    title: de,
    TransitionComponent: A = ei,
    TransitionProps: ke
  } = O, L = Ne(O, ih), xe = /* @__PURE__ */ D.isValidElement(V) ? V : /* @__PURE__ */ l("span", {
    children: V
  }), ze = Is(), fr = ze.direction === "rtl", [Ee, Dt] = D.useState(), [Fe, Rr] = D.useState(null), mr = D.useRef(!1), Pr = Z || z, $r = lt(), _r = lt(), hr = lt(), Jr = lt(), [Mt, Ho] = is({
    controlled: q,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ke = Mt;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = D.useRef(q !== void 0);
    D.useEffect(() => {
      Ee && Ee.disabled && !re && de !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [de, Ee, re]);
  }
  const On = as(N), Zr = D.useRef(), Bt = oo(() => {
    Zr.current !== void 0 && (document.body.style.WebkitUserSelect = Zr.current, Zr.current = void 0), Jr.clear();
  });
  D.useEffect(() => Bt, [Bt]);
  const Xo = (re) => {
    ri.clear(), Ut = !0, Ho(!0), F && !Ke && F(re);
  }, jt = oo(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      ri.start(800 + I, () => {
        Ut = !1;
      }), Ho(!1), U && Ke && U(re), $r.start(ze.transitions.duration.shortest, () => {
        mr.current = !1;
      });
    }
  ), Rn = (re) => {
    mr.current && re.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), _r.clear(), hr.clear(), X || Ut && te ? _r.start(Ut ? te : X, () => {
      Xo(re);
    }) : Xo(re));
  }, Wo = (re) => {
    _r.clear(), hr.start(I, () => {
      jt(re);
    });
  }, {
    isFocusVisibleRef: Yo,
    onBlur: ip,
    onFocus: sp,
    ref: pp
  } = ss(), [, qo] = D.useState(!1), Ko = (re) => {
    ip(re), Yo.current === !1 && (qo(!1), Wo(re));
  }, Jo = (re) => {
    Ee || Dt(re.currentTarget), sp(re), Yo.current === !0 && (qo(!0), Rn(re));
  }, Zo = (re) => {
    mr.current = !0;
    const $e = xe.props;
    $e.onTouchStart && $e.onTouchStart(re);
  }, Qo = Rn, ea = Wo, lp = (re) => {
    Zo(re), hr.clear(), $r.clear(), Bt(), Zr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Jr.start(ae, () => {
      document.body.style.WebkitUserSelect = Zr.current, Rn(re);
    });
  }, cp = (re) => {
    xe.props.onTouchEnd && xe.props.onTouchEnd(re), Bt(), hr.start(W, () => {
      jt(re);
    });
  };
  D.useEffect(() => {
    if (!Ke)
      return;
    function re($e) {
      ($e.key === "Escape" || $e.key === "Esc") && jt($e);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [jt, Ke]);
  const dp = Sr(xe.ref, pp, Dt, t);
  !de && de !== 0 && (Ke = !1);
  const Pn = D.useRef(), up = (re) => {
    const $e = xe.props;
    $e.onMouseMove && $e.onMouseMove(re), it = {
      x: re.clientX,
      y: re.clientY
    }, Pn.current && Pn.current.update();
  }, Qr = {}, $n = typeof de == "string";
  k ? (Qr.title = !Ke && $n && !B ? de : null, Qr["aria-describedby"] = Ke ? On : null) : (Qr["aria-label"] = $n ? de : null, Qr["aria-labelledby"] = Ke && !$n ? On : null);
  const De = _({}, Qr, L, xe.props, {
    className: Nr(L.className, xe.props.className),
    onTouchStart: Zo,
    ref: dp
  }, z ? {
    onMouseMove: up
  } : {});
  process.env.NODE_ENV !== "production" && (De["data-mui-internal-clone-element"] = !0, D.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const et = {};
  J || (De.onTouchStart = lp, De.onTouchEnd = cp), B || (De.onMouseOver = Gt(Qo, De.onMouseOver), De.onMouseLeave = Gt(ea, De.onMouseLeave), Pr || (et.onMouseOver = Qo, et.onMouseLeave = ea)), j || (De.onFocus = Gt(Jo, De.onFocus), De.onBlur = Gt(Ko, De.onBlur), Pr || (et.onFocus = Jo, et.onBlur = Ko)), process.env.NODE_ENV !== "production" && xe.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));
  const fp = D.useMemo(() => {
    var re;
    let $e = [{
      name: "arrow",
      enabled: !!Fe,
      options: {
        element: Fe,
        padding: 4
      }
    }];
    return (re = Y.popperOptions) != null && re.modifiers && ($e = $e.concat(Y.popperOptions.modifiers)), _({}, Y.popperOptions, {
      modifiers: $e
    });
  }, [Fe, Y]), rt = _({}, O, {
    isRtl: fr,
    arrow: P,
    disableInteractive: Pr,
    placement: G,
    PopperComponentProp: K,
    touch: mr.current
  }), _n = ph(rt), ra = (n = (o = ee.popper) != null ? o : S.Popper) != null ? n : lh, ta = (a = (i = (s = ee.transition) != null ? s : S.Transition) != null ? i : A) != null ? a : ei, na = (c = (d = ee.tooltip) != null ? d : S.Tooltip) != null ? c : ch, oa = (u = (b = ee.arrow) != null ? b : S.Arrow) != null ? u : dh, mp = ct(ra, _({}, Y, (p = Q.popper) != null ? p : $.popper, {
    className: Nr(_n.popper, Y == null ? void 0 : Y.className, (h = (f = Q.popper) != null ? f : $.popper) == null ? void 0 : h.className)
  }), rt), hp = ct(ta, _({}, ke, (g = Q.transition) != null ? g : $.transition), rt), gp = ct(na, _({}, (v = Q.tooltip) != null ? v : $.tooltip, {
    className: Nr(_n.tooltip, (y = (C = Q.tooltip) != null ? C : $.tooltip) == null ? void 0 : y.className)
  }), rt), vp = ct(oa, _({}, (T = Q.arrow) != null ? T : $.arrow, {
    className: Nr(_n.arrow, (x = (w = Q.arrow) != null ? w : $.arrow) == null ? void 0 : x.className)
  }), rt);
  return /* @__PURE__ */ E(D.Fragment, {
    children: [/* @__PURE__ */ D.cloneElement(xe, De), /* @__PURE__ */ l(ra, _({
      as: K ?? Ms,
      placement: G,
      anchorEl: z ? {
        getBoundingClientRect: () => ({
          top: it.y,
          left: it.x,
          right: it.x,
          bottom: it.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Pn,
      open: Ee ? Ke : !1,
      id: On,
      transition: !0
    }, et, mp, {
      popperOptions: fp,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ l(ta, _({
        timeout: ze.transitions.duration.shorter
      }, re, hp, {
        children: /* @__PURE__ */ E(na, _({}, gp, {
          children: [de, P ? /* @__PURE__ */ l(oa, _({}, vp, {
            ref: Rr
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Bs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: m.bool,
  /**
   * Tooltip reference element.
   */
  children: ts.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: m.object,
  /**
   * @ignore
   */
  className: m.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: m.shape({
    Arrow: m.elementType,
    Popper: m.elementType,
    Tooltip: m.elementType,
    Transition: m.elementType
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
  componentsProps: m.shape({
    arrow: m.object,
    popper: m.object,
    tooltip: m.object,
    transition: m.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: m.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: m.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: m.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: m.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: m.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: m.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: m.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: m.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: m.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: m.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: m.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: m.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: m.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: m.func,
  /**
   * If `true`, the component is shown.
   */
  open: m.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: m.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: m.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: m.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: m.shape({
    arrow: m.object,
    popper: m.object,
    tooltip: m.object,
    transition: m.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: m.shape({
    arrow: m.elementType,
    popper: m.elementType,
    tooltip: m.elementType,
    transition: m.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: m.oneOfType([m.arrayOf(m.oneOfType([m.func, m.object, m.bool])), m.func, m.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: m.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: m.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: m.object
});
const uh = Bs;
function ti(e, r, t) {
  return e ? /* @__PURE__ */ l(wi, { className: `papi-menu-icon-${t ? "leading" : "trailing"}`, children: /* @__PURE__ */ l("img", { src: e, alt: `${t ? "Leading" : "Trailing"} icon for ${r}` }) }) : void 0;
}
function js(e) {
  const {
    onClick: r,
    label: t,
    tooltip: n,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: s = !1,
    className: c,
    isDisabled: d = !1,
    isDense: u = !0,
    isSubMenuParent: b = !1,
    hasDisabledGutters: p = !1,
    hasDivider: h = !1,
    focusVisibleClassName: f,
    id: g,
    children: v
  } = e, y = /* @__PURE__ */ l(
    al,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: s,
      className: c,
      disabled: d,
      dense: u,
      disableGutters: p,
      divider: h,
      focusVisibleClassName: f,
      onClick: r,
      id: g,
      children: t ? /* @__PURE__ */ E(cr, { children: [
        ti(a, t, !0),
        /* @__PURE__ */ l(il, { primary: t, inset: !a && o }),
        b ? /* @__PURE__ */ l(wi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ l(ws, {}) }) : ti(i, t, !1)
      ] }) : v
    }
  );
  return n ? /* @__PURE__ */ l(uh, { title: n, placement: "right", children: /* @__PURE__ */ l("div", { children: y }) }) : y;
}
function Vs(e) {
  return Object.entries(e.groups).map(([t, n]) => ({ id: t, group: n }));
}
function fh(e) {
  const [r, t] = fe(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (d) => {
    t(d.currentTarget);
  }, s = () => {
    t(void 0);
  }, c = () => {
    let d = Vs(a).filter((u) => "menuItem" in u.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === n.id
    ), /* @__PURE__ */ l(Ls, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ E(cr, { children: [
    /* @__PURE__ */ l(js, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ l(
      sl,
      {
        anchorEl: r,
        open: !!r,
        onClose: s,
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
      n.id
    )
  ] });
}
const mh = (e, r) => r.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Ls(e) {
  const { menuDefinition: r, onClick: t, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = lr(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Vs(r).filter((f) => !("menuItem" in f.group))
    ), b = Object.values(u).sort(
      (f, g) => (f.group.order || 0) - (g.group.order || 0)
    ), p = [];
    b.forEach((f) => {
      mh(f.id, r.items).forEach(
        (g) => p.push({ item: g, isLastItemInGroup: !1 })
      ), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !0);
    }), p.length > 0 && (p[p.length - 1].isLastItemInGroup = !1);
    const h = p.some(
      (f) => "iconPathBefore" in f.item && f.item.iconPathBefore
    );
    return { items: p, allowForLeadingIcons: h };
  }, [o, r]), s = ({ item: u, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ l("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ l("div", { role: "menu", "aria-label": d, children: a.map((u, b) => {
    const { item: p } = u, h = s(u);
    if ("command" in p) {
      const f = p.group + b;
      return /* @__PURE__ */ l(
        js,
        {
          onClick: (g) => {
            t == null || t(g), n(p);
          },
          ...h
        },
        f
      );
    }
    return /* @__PURE__ */ l(
      fh,
      {
        parentMenuItem: p,
        parentItemProps: h,
        ...e
      },
      d + p.id
    );
  }) }, d);
}
function hh(e) {
  const { menuDefinition: r, columnId: t } = e;
  let a = Object.entries(r.groups).map(([i, s]) => ({ id: i, group: s })).filter((i) => "column" in i.group);
  return t && "columns" in r && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  r.columns[t] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === t
  )), /* @__PURE__ */ l(Ls, { ...e, includedGroups: a });
}
function gh({
  commandHandler: e,
  menuDefinition: r,
  id: t,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ E(
    yi,
    {
      id: t,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": t,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ l("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ l(pl, { id: t, dense: !0, className: a ?? "", children: /* @__PURE__ */ l(
          hh,
          {
            commandHandler: e,
            menuDefinition: r,
            columnId: t,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function vh({
  commandHandler: e,
  className: r,
  multiColumnMenu: t,
  id: n
}) {
  const { columns: o } = t, a = lr(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((s) => {
      if (s === "isExtensible")
        return;
      const c = s, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? i.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${s} (${typeof d}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((s, c) => (s.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, n]);
  return /* @__PURE__ */ l(
    yi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${r ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, s) => /* @__PURE__ */ l(
        gh,
        {
          commandHandler: e,
          menuDefinition: t,
          ...i,
          className: r
        },
        s
      ))
    }
  );
}
function bh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const uo = (e, r, t = {}) => {
  const n = kr(r);
  n.current = r;
  const o = kr(t);
  o.current = bh(o.current);
  const [a, i] = fe(() => n.current), [s, c] = fe(!0);
  return Xe(() => {
    let d = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        d && (i(() => u), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || i(() => n.current);
    };
  }, [e]), [a, s];
}, wh = bs(/* @__PURE__ */ l("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function yh({
  menuProvider: e,
  normalMenu: r,
  fullMenu: t,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: s
}) {
  const [c, d] = fe(!1), [u, b] = fe(!1), p = Se(() => {
    c && d(!1), b(!1);
  }, [c]), h = Se((x) => {
    x.stopPropagation(), d((w) => {
      const O = !w;
      return O && x.shiftKey ? b(!0) : O || b(!1), O;
    });
  }, []), f = Se(
    (x) => (p(), n(x)),
    [n, p]
  ), [g, v] = fe({ top: 1, left: 1 });
  Xe(() => {
    if (c) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const w = x.getBoundingClientRect(), O = window.scrollY, P = window.scrollX, V = w.top + O + x.clientHeight, S = w.left + P;
        v({ top: V, left: S });
      }
    }
  }, [c, o]);
  const [y] = uo(
    Se(async () => (e == null ? void 0 : e(!1)) ?? r, [e, r, c]),
    r
  ), [C] = uo(
    Se(async () => (e == null ? void 0 : e(!0)) ?? t ?? y, [e, t, y, c]),
    t ?? y
  ), T = u && C ? C : y;
  return /* @__PURE__ */ E(cr, { children: [
    /* @__PURE__ */ l(
      xi,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: h,
        children: s ?? /* @__PURE__ */ l(wh, {})
      }
    ),
    /* @__PURE__ */ l(
      ll,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
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
        children: T ? /* @__PURE__ */ l(
          vh,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: f,
            multiColumnMenu: T
          }
        ) : void 0
      }
    )
  ] });
}
function E0({
  id: e,
  label: r,
  isDisabled: t = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: s,
  onClick: c,
  children: d
}) {
  return /* @__PURE__ */ l(
    xi,
    {
      id: e,
      disabled: t,
      edge: a,
      size: i,
      "aria-label": r,
      title: o ? void 0 : n ?? r,
      className: `papi-icon-button ${s ?? ""}`,
      onClick: c,
      children: d
    }
  );
}
const At = nn(({ className: e, ...r }, t) => /* @__PURE__ */ l(Vp, { size: 35, className: R("pr-animate-spin", e), ...r, ref: t }));
At.displayName = "Spinner";
function T0({
  id: e,
  isDisabled: r = !1,
  hasError: t = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: s = !1,
  className: c,
  defaultValue: d,
  value: u,
  onChange: b,
  onFocus: p,
  onBlur: h
}) {
  return /* @__PURE__ */ E("div", { className: R("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ l(
      Ze,
      {
        htmlFor: e,
        className: R({
          "pr-text-red-600": t,
          "pr-hidden": !a
        }),
        children: `${a}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ l(
      St,
      {
        id: e,
        disabled: r,
        placeholder: i,
        required: s,
        className: R(c, { "pr-border-red-600": t }),
        defaultValue: d,
        value: u,
        onChange: b,
        onFocus: p,
        onBlur: h
      }
    ),
    /* @__PURE__ */ l("p", { className: R({ "pr-hidden": !o }), children: o })
  ] });
}
function S0({
  menuProvider: e,
  commandHandler: r,
  className: t,
  id: n,
  children: o
}) {
  const a = kr(void 0);
  return /* @__PURE__ */ l("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ l(cl, { position: "static", id: n, children: /* @__PURE__ */ E(
    dl,
    {
      className: R("pr-bg-muted pr-text-muted-foreground", t),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ l(
          yh,
          {
            commandHandler: r,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ l("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const xh = sn(
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
), kh = M.forwardRef(({ className: e, variant: r, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, role: "alert", className: R(xh({ variant: r }), e), ...t }));
kh.displayName = "Alert";
const Nh = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ E(
    "h5",
    {
      ref: t,
      className: R("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...r,
      children: [
        r.children,
        " "
      ]
    }
  )
);
Nh.displayName = "AlertTitle";
const Eh = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l("div", { ref: t, className: R("pr-text-sm [&_p]:pr-leading-relaxed", e), ...r }));
Eh.displayName = "AlertDescription";
const Th = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ l(
    "div",
    {
      ref: t,
      className: R(
        "pr-twp pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...r
    }
  )
);
Th.displayName = "Card";
const Sh = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ l(
    "div",
    {
      ref: t,
      className: R("pr-twp pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...r
    }
  )
);
Sh.displayName = "CardHeader";
const Ch = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ l(
    "h3",
    {
      ref: t,
      className: R(
        "pr-twp pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight",
        e
      ),
      ...r,
      children: r.children
    }
  )
);
Ch.displayName = "CardTitle";
const Oh = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l("p", { ref: t, className: R("pr-twp pr-text-sm pr-text-muted-foreground", e), ...r }));
Oh.displayName = "CardDescription";
const Rh = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ l("div", { ref: t, className: R("pr-twp pr-p-6 pr-pt-0", e), ...r })
);
Rh.displayName = "CardContent";
const Ph = M.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ l(
    "div",
    {
      ref: t,
      className: R("pr-twp pr-flex pr-items-center pr-p-6 pr-pt-0", e),
      ...r
    }
  )
);
Ph.displayName = "CardFooter";
function C0({ ...e }) {
  return /* @__PURE__ */ l(
    fl,
    {
      className: "pr-toaster pr-group",
      toastOptions: {
        classNames: {
          toast: "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton: "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton: "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground"
        }
      },
      ...e
    }
  );
}
const $h = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ E(
  pt.Root,
  {
    ref: t,
    className: R(
      "pr-twp pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ l(pt.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ l(pt.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ l(pt.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
$h.displayName = pt.Root.displayName;
const _h = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  eo.Root,
  {
    className: R(
      "pr-peer pr-twp pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...r,
    ref: t,
    children: /* @__PURE__ */ l(
      eo.Thumb,
      {
        className: R(
          "pr-twp pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
_h.displayName = eo.Root.displayName;
const O0 = Pe.Root, Ih = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.List,
  {
    ref: t,
    className: R(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...r
  }
));
Ih.displayName = Pe.List.displayName;
const Ah = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.Trigger,
  {
    ref: t,
    className: R(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...r
  }
));
Ah.displayName = Pe.Trigger.displayName;
const Dh = M.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ l(
  Pe.Content,
  {
    ref: t,
    className: R(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...r
  }
));
Dh.displayName = Pe.Content.displayName;
function R0({
  isInstalling: e,
  handleClick: r,
  buttonText: t,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ l(
    ye,
    {
      className: R(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600 hover:pr-text-white": !t,
          "pr-w-20": t
        },
        n
      ),
      onClick: r,
      ...o,
      children: e ? /* @__PURE__ */ l(At, { size: 15 }) : /* @__PURE__ */ E(cr, { children: [
        /* @__PURE__ */ l(Lp, { size: 25, className: R("pr-h-4 pr-w-4", { "pr-mr-1": t }) }),
        t
      ] })
    }
  );
}
function P0({
  isEnabling: e,
  handleClick: r,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    ye,
    {
      className: R(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        t
      ),
      onClick: r,
      ...n,
      children: e ? /* @__PURE__ */ E(cr, { children: [
        /* @__PURE__ */ l(At, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function $0({
  isDisabling: e,
  handleClick: r,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    ye,
    {
      className: R(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        },
        t
      ),
      onClick: r,
      ...n,
      children: e ? /* @__PURE__ */ E(cr, { children: [
        /* @__PURE__ */ l(At, { size: 15, className: "pr-mr-1 pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function _0({
  isUpdating: e,
  handleClick: r,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ l(
    ye,
    {
      className: R(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        t
      ),
      onClick: r,
      ...n,
      children: e ? /* @__PURE__ */ E(cr, { children: [
        /* @__PURE__ */ l(At, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function xr() {
  return xr = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, xr.apply(this, arguments);
}
const Mh = ["children", "options"], H = { blockQuote: "0", breakLine: "1", breakThematic: "2", codeBlock: "3", codeFenced: "4", codeInline: "5", footnote: "6", footnoteReference: "7", gfmTask: "8", heading: "9", headingSetext: "10", htmlBlock: "11", htmlComment: "12", htmlSelfClosing: "13", image: "14", link: "15", linkAngleBraceStyleDetector: "16", linkBareUrlDetector: "17", linkMailtoDetector: "18", newlineCoalescer: "19", orderedList: "20", paragraph: "21", ref: "22", refImage: "23", refLink: "24", table: "25", tableSeparator: "26", text: "27", textBolded: "28", textEmphasized: "29", textEscaped: "30", textMarked: "31", textStrikethroughed: "32", unorderedList: "33" };
var ni;
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ni || (ni = {}));
const oi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, r) => (e[r.toLowerCase()] = r, e), { for: "htmlFor" }), ai = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Bh = ["style", "script"], jh = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Vh = /mailto:/i, Lh = /\n{2,}$/, zs = /^(\s*>[\s\S]*?)(?=\n{2,})/, zh = /^ *> ?/gm, Fh = /^ {2,}\n/, Uh = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Fs = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Us = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Gh = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Hh = /^(?:\n *)*\n/, Xh = /\r\n?/g, Wh = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, Yh = /^\[\^([^\]]+)]/, qh = /\f/g, Kh = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, Jh = /^\s*?\[(x|\s)\]/, Gs = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Hs = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Xs = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, fo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, Zh = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Ws = /^<!--[\s\S]*?(?:-->)/, Qh = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, mo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, eg = /^\{.*\}$/, rg = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, tg = /^<([^ >]+@[^ >]+)>/, ng = /^<([^ >]+:\/[^ >]+)>/, og = /-([a-z])?/gi, Ys = /^(.*\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, ag = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, ig = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, sg = /^\[([^\]]*)\] ?\[([^\]]*)\]/, pg = /(\[|\])/g, lg = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, cg = /\t/g, dg = /(^ *\||\| *$)/g, ug = /^ *:-+: *$/, fg = /^ *:-+ *$/, mg = /^ *-+: *$/, Cn = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)", hg = new RegExp(`^([*_])\\1${Cn}\\1\\1(?!\\1)`), gg = new RegExp(`^([*_])${Cn}\\1(?!\\1|\\w)`), vg = new RegExp(`^==${Cn}==`), bg = new RegExp(`^~~${Cn}~~`), wg = /^\\([^0-9A-Za-z\s])/, yg = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, xg = /^\n+/, kg = /^([ \t]*)/, Ng = /\\([^\\])/g, ii = / *\n+$/, Eg = /(?:^|\n)( *)$/, Uo = "(?:\\d+\\.)", Go = "(?:[*+-])";
function qs(e) {
  return "( *)(" + (e === 1 ? Uo : Go) + ") +";
}
const Ks = qs(1), Js = qs(2);
function Zs(e) {
  return new RegExp("^" + (e === 1 ? Ks : Js));
}
const Tg = Zs(1), Sg = Zs(2);
function Qs(e) {
  return new RegExp("^" + (e === 1 ? Ks : Js) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Uo : Go) + " )[^\\n]*)*(\\n|$)", "gm");
}
const ep = Qs(1), rp = Qs(2);
function tp(e) {
  const r = e === 1 ? Uo : Go;
  return new RegExp("^( *)(" + r + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + r + " (?!" + r + " ))\\n*|\\s*\\n*$)");
}
const np = tp(1), op = tp(2);
function si(e, r) {
  const t = r === 1, n = t ? np : op, o = t ? ep : rp, a = t ? Tg : Sg;
  return { match(i, s, c) {
    const d = Eg.exec(c);
    return d && (s.list || !s.inline && !s.simple) ? n.exec(i = d[1] + i) : null;
  }, order: 1, parse(i, s, c) {
    const d = t ? +i[2] : void 0, u = i[0].replace(Lh, `
`).match(o);
    let b = !1;
    return { items: u.map(function(p, h) {
      const f = a.exec(p)[0].length, g = new RegExp("^ {1," + f + "}", "gm"), v = p.replace(g, "").replace(a, ""), y = h === u.length - 1, C = v.indexOf(`

`) !== -1 || y && b;
      b = C;
      const T = c.inline, x = c.list;
      let w;
      c.list = !0, C ? (c.inline = !1, w = v.replace(ii, `

`)) : (c.inline = !0, w = v.replace(ii, ""));
      const O = s(w, c);
      return c.inline = T, c.list = x, O;
    }), ordered: t, start: d };
  }, render: (i, s, c) => e(i.ordered ? "ol" : "ul", { key: c.key, start: i.type === H.orderedList ? i.start : void 0 }, i.items.map(function(d, u) {
    return e("li", { key: u }, s(d, c));
  })) };
}
const Cg = new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), Og = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, ap = [zs, Fs, Us, Gs, Xs, Hs, Ws, Ys, ep, np, rp, op], Rg = [...ap, /^[^\n]+(?:  \n|\n{2,})/, fo, mo];
function Ht(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Pg(e) {
  return mg.test(e) ? "right" : ug.test(e) ? "center" : fg.test(e) ? "left" : null;
}
function pi(e, r, t, n) {
  const o = t.inTable;
  t.inTable = !0;
  let a = e.trim().split(/( *(?:`[^`]*`|<.*?>.*?<\/.*?>(?!<\/.*?>)|\\\||\|) *)/).reduce((s, c) => (c.trim() === "|" ? s.push(n ? { type: H.tableSeparator } : { type: H.text, text: c }) : c !== "" && s.push.apply(s, r(c, t)), s), []);
  t.inTable = o;
  let i = [[]];
  return a.forEach(function(s, c) {
    s.type === H.tableSeparator ? c !== 0 && c !== a.length - 1 && i.push([]) : (s.type !== H.text || a[c + 1] != null && a[c + 1].type !== H.tableSeparator || (s.text = s.text.trimEnd()), i[i.length - 1].push(s));
  }), i;
}
function $g(e, r, t) {
  t.inline = !0;
  const n = e[2] ? e[2].replace(dg, "").split("|").map(Pg) : [], o = e[3] ? function(i, s, c) {
    return i.trim().split(`
`).map(function(d) {
      return pi(d, s, c, !0);
    });
  }(e[3], r, t) : [], a = pi(e[1], r, t, !!o.length);
  return t.inline = !1, o.length ? { align: n, cells: o, header: a, type: H.table } : { children: a, type: H.paragraph };
}
function li(e, r) {
  return e.align[r] == null ? {} : { textAlign: e.align[r] };
}
function or(e) {
  return function(r, t) {
    return t.inline ? e.exec(r) : null;
  };
}
function ar(e) {
  return function(r, t) {
    return t.inline || t.simple ? e.exec(r) : null;
  };
}
function Je(e) {
  return function(r, t) {
    return t.inline || t.simple ? null : e.exec(r);
  };
}
function st(e) {
  return function(r) {
    return e.exec(r);
  };
}
function _g(e, r, t) {
  if (r.inline || r.simple || t && !t.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !ap.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function Ig(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return null;
  } catch {
    return null;
  }
  return e;
}
function ci(e) {
  return e.replace(Ng, "$1");
}
function Kt(e, r, t) {
  const n = t.inline || !1, o = t.simple || !1;
  t.inline = !0, t.simple = !0;
  const a = e(r, t);
  return t.inline = n, t.simple = o, a;
}
function Ag(e, r, t) {
  const n = t.inline || !1, o = t.simple || !1;
  t.inline = !1, t.simple = !0;
  const a = e(r, t);
  return t.inline = n, t.simple = o, a;
}
function Dg(e, r, t) {
  const n = t.inline || !1;
  t.inline = !1;
  const o = e(r, t);
  return t.inline = n, o;
}
const Wn = (e, r, t) => ({ children: Kt(r, e[1], t) });
function Yn() {
  return {};
}
function qn() {
  return null;
}
function Mg(...e) {
  return e.filter(Boolean).join(" ");
}
function Kn(e, r, t) {
  let n = e;
  const o = r.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || t;
}
function Bg(e = "", r = {}) {
  function t(p, h, ...f) {
    const g = Kn(r.overrides, `${p}.props`, {});
    return r.createElement(function(v, y) {
      const C = Kn(y, v);
      return C ? typeof C == "function" || typeof C == "object" && "render" in C ? C : Kn(y, `${v}.component`, v) : v;
    }(p, r.overrides), xr({}, h, g, { className: Mg(h == null ? void 0 : h.className, g.className) || void 0 }), ...f);
  }
  function n(p) {
    p = p.replace(Kh, "");
    let h = !1;
    r.forceInline ? h = !0 : r.forceBlock || (h = lg.test(p) === !1);
    const f = d(c(h ? p : `${p.trimEnd().replace(xg, "")}

`, { inline: h }));
    for (; typeof f[f.length - 1] == "string" && !f[f.length - 1].trim(); )
      f.pop();
    if (r.wrapper === null)
      return f;
    const g = r.wrapper || (h ? "span" : "div");
    let v;
    if (f.length > 1 || r.forceWrapper)
      v = f;
    else {
      if (f.length === 1)
        return v = f[0], typeof v == "string" ? t("span", { key: "outer" }, v) : v;
      v = null;
    }
    return D.createElement(g, { key: "outer" }, v);
  }
  function o(p, h) {
    const f = h.match(jh);
    return f ? f.reduce(function(g, v, y) {
      const C = v.indexOf("=");
      if (C !== -1) {
        const T = function(P) {
          return P.indexOf("-") !== -1 && P.match(Qh) === null && (P = P.replace(og, function(V, S) {
            return S.toUpperCase();
          })), P;
        }(v.slice(0, C)).trim(), x = function(P) {
          const V = P[0];
          return (V === '"' || V === "'") && P.length >= 2 && P[P.length - 1] === V ? P.slice(1, -1) : P;
        }(v.slice(C + 1).trim()), w = oi[T] || T, O = g[w] = function(P, V, S, $) {
          return V === "style" ? S.split(/;\s?/).reduce(function(k, j) {
            const B = j.slice(0, j.indexOf(":"));
            return k[B.trim().replace(/(-[a-z])/g, (Z) => Z[1].toUpperCase())] = j.slice(B.length + 1).trim(), k;
          }, {}) : V === "href" || V === "src" ? $(S, P, V) : (S.match(eg) && (S = S.slice(1, S.length - 1)), S === "true" || S !== "false" && S);
        }(p, T, x, r.sanitizer);
        typeof O == "string" && (fo.test(O) || mo.test(O)) && (g[w] = D.cloneElement(n(O.trim()), { key: y }));
      } else
        v !== "style" && (g[oi[v] || v] = !0);
      return g;
    }, {}) : null;
  }
  r.overrides = r.overrides || {}, r.sanitizer = r.sanitizer || Ig, r.slugify = r.slugify || Ht, r.namedCodesToUnicode = r.namedCodesToUnicode ? xr({}, ai, r.namedCodesToUnicode) : ai, r.createElement = r.createElement || D.createElement;
  const a = [], i = {}, s = { [H.blockQuote]: { match: Je(zs), order: 1, parse: (p, h, f) => ({ children: h(p[0].replace(zh, ""), f) }), render: (p, h, f) => t("blockquote", { key: f.key }, h(p.children, f)) }, [H.breakLine]: { match: st(Fh), order: 1, parse: Yn, render: (p, h, f) => t("br", { key: f.key }) }, [H.breakThematic]: { match: Je(Uh), order: 1, parse: Yn, render: (p, h, f) => t("hr", { key: f.key }) }, [H.codeBlock]: { match: Je(Us), order: 0, parse: (p) => ({ lang: void 0, text: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, "") }), render: (p, h, f) => t("pre", { key: f.key }, t("code", xr({}, p.attrs, { className: p.lang ? `lang-${p.lang}` : "" }), p.text)) }, [H.codeFenced]: { match: Je(Fs), order: 0, parse: (p) => ({ attrs: o("code", p[3] || ""), lang: p[2] || void 0, text: p[4], type: H.codeBlock }) }, [H.codeInline]: { match: ar(Gh), order: 3, parse: (p) => ({ text: p[2] }), render: (p, h, f) => t("code", { key: f.key }, p.text) }, [H.footnote]: { match: Je(Wh), order: 0, parse: (p) => (a.push({ footnote: p[2], identifier: p[1] }), {}), render: qn }, [H.footnoteReference]: { match: or(Yh), order: 1, parse: (p) => ({ target: `#${r.slugify(p[1], Ht)}`, text: p[1] }), render: (p, h, f) => t("a", { key: f.key, href: r.sanitizer(p.target, "a", "href") }, t("sup", { key: f.key }, p.text)) }, [H.gfmTask]: { match: or(Jh), order: 1, parse: (p) => ({ completed: p[1].toLowerCase() === "x" }), render: (p, h, f) => t("input", { checked: p.completed, key: f.key, readOnly: !0, type: "checkbox" }) }, [H.heading]: { match: Je(r.enforceAtxHeadings ? Hs : Gs), order: 1, parse: (p, h, f) => ({ children: Kt(h, p[2], f), id: r.slugify(p[2], Ht), level: p[1].length }), render: (p, h, f) => t(`h${p.level}`, { id: p.id, key: f.key }, h(p.children, f)) }, [H.headingSetext]: { match: Je(Xs), order: 0, parse: (p, h, f) => ({ children: Kt(h, p[1], f), level: p[2] === "=" ? 1 : 2, type: H.heading }) }, [H.htmlBlock]: { match: st(fo), order: 1, parse(p, h, f) {
    const [, g] = p[3].match(kg), v = new RegExp(`^${g}`, "gm"), y = p[3].replace(v, ""), C = (T = y, Rg.some((V) => V.test(T)) ? Dg : Kt);
    var T;
    const x = p[1].toLowerCase(), w = Bh.indexOf(x) !== -1, O = (w ? x : p[1]).trim(), P = { attrs: o(O, p[2]), noInnerParse: w, tag: O };
    return f.inAnchor = f.inAnchor || x === "a", w ? P.text = p[3] : P.children = C(h, y, f), f.inAnchor = !1, P;
  }, render: (p, h, f) => t(p.tag, xr({ key: f.key }, p.attrs), p.text || h(p.children, f)) }, [H.htmlSelfClosing]: { match: st(mo), order: 1, parse(p) {
    const h = p[1].trim();
    return { attrs: o(h, p[2] || ""), tag: h };
  }, render: (p, h, f) => t(p.tag, xr({}, p.attrs, { key: f.key })) }, [H.htmlComment]: { match: st(Ws), order: 1, parse: () => ({}), render: qn }, [H.image]: { match: ar(Og), order: 1, parse: (p) => ({ alt: p[1], target: ci(p[2]), title: p[3] }), render: (p, h, f) => t("img", { key: f.key, alt: p.alt || void 0, title: p.title || void 0, src: r.sanitizer(p.target, "img", "src") }) }, [H.link]: { match: or(Cg), order: 3, parse: (p, h, f) => ({ children: Ag(h, p[1], f), target: ci(p[2]), title: p[3] }), render: (p, h, f) => t("a", { key: f.key, href: r.sanitizer(p.target, "a", "href"), title: p.title }, h(p.children, f)) }, [H.linkAngleBraceStyleDetector]: { match: or(ng), order: 0, parse: (p) => ({ children: [{ text: p[1], type: H.text }], target: p[1], type: H.link }) }, [H.linkBareUrlDetector]: { match: (p, h) => h.inAnchor ? null : or(rg)(p, h), order: 0, parse: (p) => ({ children: [{ text: p[1], type: H.text }], target: p[1], title: void 0, type: H.link }) }, [H.linkMailtoDetector]: { match: or(tg), order: 0, parse(p) {
    let h = p[1], f = p[1];
    return Vh.test(f) || (f = "mailto:" + f), { children: [{ text: h.replace("mailto:", ""), type: H.text }], target: f, type: H.link };
  } }, [H.orderedList]: si(t, 1), [H.unorderedList]: si(t, 2), [H.newlineCoalescer]: { match: Je(Hh), order: 3, parse: Yn, render: () => `
` }, [H.paragraph]: { match: _g, order: 3, parse: Wn, render: (p, h, f) => t("p", { key: f.key }, h(p.children, f)) }, [H.ref]: { match: or(ag), order: 0, parse: (p) => (i[p[1]] = { target: p[2], title: p[4] }, {}), render: qn }, [H.refImage]: { match: ar(ig), order: 0, parse: (p) => ({ alt: p[1] || void 0, ref: p[2] }), render: (p, h, f) => i[p.ref] ? t("img", { key: f.key, alt: p.alt, src: r.sanitizer(i[p.ref].target, "img", "src"), title: i[p.ref].title }) : null }, [H.refLink]: { match: or(sg), order: 0, parse: (p, h, f) => ({ children: h(p[1], f), fallbackChildren: h(p[0].replace(pg, "\\$1"), f), ref: p[2] }), render: (p, h, f) => i[p.ref] ? t("a", { key: f.key, href: r.sanitizer(i[p.ref].target, "a", "href"), title: i[p.ref].title }, h(p.children, f)) : t("span", { key: f.key }, h(p.fallbackChildren, f)) }, [H.table]: { match: Je(Ys), order: 1, parse: $g, render(p, h, f) {
    const g = p;
    return t("table", { key: f.key }, t("thead", null, t("tr", null, g.header.map(function(v, y) {
      return t("th", { key: y, style: li(g, y) }, h(v, f));
    }))), t("tbody", null, g.cells.map(function(v, y) {
      return t("tr", { key: y }, v.map(function(C, T) {
        return t("td", { key: T, style: li(g, T) }, h(C, f));
      }));
    })));
  } }, [H.text]: { match: st(yg), order: 4, parse: (p) => ({ text: p[0].replace(Zh, (h, f) => r.namedCodesToUnicode[f] ? r.namedCodesToUnicode[f] : h) }), render: (p) => p.text }, [H.textBolded]: { match: ar(hg), order: 2, parse: (p, h, f) => ({ children: h(p[2], f) }), render: (p, h, f) => t("strong", { key: f.key }, h(p.children, f)) }, [H.textEmphasized]: { match: ar(gg), order: 3, parse: (p, h, f) => ({ children: h(p[2], f) }), render: (p, h, f) => t("em", { key: f.key }, h(p.children, f)) }, [H.textEscaped]: { match: ar(wg), order: 1, parse: (p) => ({ text: p[1], type: H.text }) }, [H.textMarked]: { match: ar(vg), order: 3, parse: Wn, render: (p, h, f) => t("mark", { key: f.key }, h(p.children, f)) }, [H.textStrikethroughed]: { match: ar(bg), order: 3, parse: Wn, render: (p, h, f) => t("del", { key: f.key }, h(p.children, f)) } };
  r.disableParsingRawHTML === !0 && (delete s[H.htmlBlock], delete s[H.htmlSelfClosing]);
  const c = function(p) {
    let h = Object.keys(p);
    function f(g, v) {
      let y = [], C = "";
      for (; g; ) {
        let T = 0;
        for (; T < h.length; ) {
          const x = h[T], w = p[x], O = w.match(g, v, C);
          if (O) {
            const P = O[0];
            g = g.substring(P.length);
            const V = w.parse(O, f, v);
            V.type == null && (V.type = x), y.push(V), C = P;
            break;
          }
          T++;
        }
      }
      return y;
    }
    return h.sort(function(g, v) {
      let y = p[g].order, C = p[v].order;
      return y !== C ? y - C : g < v ? -1 : 1;
    }), function(g, v) {
      return f(function(y) {
        return y.replace(Xh, `
`).replace(qh, "").replace(cg, "    ");
      }(g), v);
    };
  }(s), d = (u = function(p, h) {
    return function(f, g, v) {
      const y = p[f.type].render;
      return h ? h(() => y(f, g, v), f, g, v) : y(f, g, v);
    };
  }(s, r.renderRule), function p(h, f = {}) {
    if (Array.isArray(h)) {
      const g = f.key, v = [];
      let y = !1;
      for (let C = 0; C < h.length; C++) {
        f.key = C;
        const T = p(h[C], f), x = typeof T == "string";
        x && y ? v[v.length - 1] += T : T !== null && v.push(T), y = x;
      }
      return f.key = g, v;
    }
    return u(h, p, f);
  });
  var u;
  const b = n(e);
  return a.length ? t("div", null, b, t("footer", { key: "footer" }, a.map(function(p) {
    return t("div", { id: r.slugify(p.identifier, Ht), key: p.identifier }, p.identifier, d(c(p.footnote, { inline: !0 })));
  }))) : b;
}
const jg = (e) => {
  let { children: r = "", options: t } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, s, c = {}, d = Object.keys(o);
    for (s = 0; s < d.length; s++)
      a.indexOf(i = d[s]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Mh);
  return D.cloneElement(Bg(r, t), n);
};
function I0({ id: e, markdown: r }) {
  return /* @__PURE__ */ l("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ l(jg, { children: r }) });
}
const Vg = nn((e, r) => /* @__PURE__ */ E(
  ye,
  {
    ref: r,
    className: "pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ l(zp, { size: 16, className: "pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ l(
        an,
        {
          size: 16,
          className: "pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
        }
      )
    ]
  }
));
var Lg = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Lg || {});
function A0({ id: e, groups: r }) {
  return /* @__PURE__ */ l("div", { id: e, children: /* @__PURE__ */ E(bo, { children: [
    /* @__PURE__ */ l(Oi, { asChild: !0, children: /* @__PURE__ */ l(Vg, {}) }),
    /* @__PURE__ */ l(ln, { children: r.map((t) => /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ l(Ct, { children: t.label }),
      /* @__PURE__ */ l(Ol, { children: t.items.map((n) => /* @__PURE__ */ l("div", { children: n.itemType === 0 ? /* @__PURE__ */ l(wo, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ l(Pi, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ l(cn, {})
    ] }, t.label)) })
  ] }) });
}
function D0({ id: e, message: r }) {
  return /* @__PURE__ */ l("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ l("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ l("p", { className: "pr-text-lg pr-text-gray-800", children: r }) }) });
}
function M0({
  id: e,
  category: r,
  downloads: t,
  languages: n,
  moreInfoUrl: o
}) {
  const a = new qp("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(t).reduce((s, c) => s + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ E(
    "div",
    {
      id: e,
      className: "pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",
      children: [
        /* @__PURE__ */ E("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ l("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: /* @__PURE__ */ l("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: r }) }),
          /* @__PURE__ */ l("span", { className: "pr-text-xs pr-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ l("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ E("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ E("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: [
            /* @__PURE__ */ l(Fp, { className: "pr-mr-1 pr-h-4 pr-w-4" }),
            /* @__PURE__ */ l("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ l("span", { className: "pr-text-xs pr-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ E("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ l("div", { className: "pr-flex pr-items-center", children: n.slice(0, 3).map((s) => /* @__PURE__ */ l(
            "span",
            {
              className: "pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",
              children: s.toUpperCase()
            },
            s
          )) }),
          n.length > 3 && /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              onClick: () => i(),
              className: "pr-text-xs pr-text-gray-500 pr-underline",
              children: [
                "+",
                n.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ l("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ E("div", { className: "pr-ml-auto pr-flex pr-flex-col pr-space-y-2", children: [
          /* @__PURE__ */ E(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Website",
                /* @__PURE__ */ l(Up, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ E(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Support",
                /* @__PURE__ */ l(Gp, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function zg({ id: e, versionHistory: r }) {
  const [t, n] = fe(!1), o = /* @__PURE__ */ new Date();
  function a(s) {
    const c = new Date(s), d = new Date(o.getTime() - c.getTime()), u = d.getUTCFullYear() - 1970, b = d.getUTCMonth(), p = d.getUTCDate() - 1;
    let h = "";
    return u > 0 ? h = `${u.toString()} year${u === 1 ? "" : "s"} ago` : b > 0 ? h = `${b.toString()} month${b === 1 ? "" : "s"} ago` : p === 0 ? h = "today" : h = `${p.toString()} day${p === 1 ? "" : "s"} ago`, h;
  }
  const i = Object.entries(r).sort((s, c) => c[0].localeCompare(s[0]));
  return /* @__PURE__ */ E("div", { id: e, children: [
    /* @__PURE__ */ l("h3", { className: "pr-text-md pr-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ l("ul", { className: "pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600", children: (t ? i : i.slice(0, 5)).map((s) => /* @__PURE__ */ E("div", { className: "pr-mt-3 pr-flex pr-justify-between", children: [
      /* @__PURE__ */ l("div", { className: "pr-text-gray-600", children: /* @__PURE__ */ l("li", { className: "pr-prose pr-text-xs", children: /* @__PURE__ */ l("span", { children: s[1].description }) }) }),
      /* @__PURE__ */ E("div", { className: "pr-justify-end pr-text-right", children: [
        /* @__PURE__ */ E("div", { children: [
          "Version ",
          s[0]
        ] }),
        /* @__PURE__ */ l("div", { children: a(s[1].date) })
      ] })
    ] }, s[0])) }),
    i.length > 5 && /* @__PURE__ */ l(
      "button",
      {
        type: "button",
        onClick: () => n(!t),
        className: "pr-text-xs pr-text-gray-500 pr-underline",
        children: t ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function B0({
  id: e,
  publisherDisplayName: r,
  fileSize: t,
  locales: n,
  versionHistory: o
}) {
  const a = lr(() => Kp(t), [t]), s = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((u) => d.of(u));
  })(n);
  return /* @__PURE__ */ l("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ E("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ l(zg, { versionHistory: o }),
    /* @__PURE__ */ l("div", { className: "pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300" }),
    /* @__PURE__ */ E("div", { className: "pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3", children: [
      /* @__PURE__ */ l("h2", { className: "pr-text-md pr-font-semibold", children: "Information" }),
      /* @__PURE__ */ E("div", { className: "pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600", children: [
        /* @__PURE__ */ E("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ l("span", { className: "pr-mb-2", children: "Publisher" }),
          /* @__PURE__ */ l("span", { className: "pr-font-semibold", children: r }),
          /* @__PURE__ */ l("span", { className: "pr-mb-2 pr-mt-4", children: "Size" }),
          /* @__PURE__ */ l("span", { className: "pr-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ l("div", { className: "pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600", children: /* @__PURE__ */ E("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ l("span", { className: "pr-mb-2", children: "Languages" }),
          /* @__PURE__ */ l("span", { className: "pr-font-semibold", children: s.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const j0 = (e, r) => {
  Xe(() => {
    if (!e)
      return () => {
      };
    const t = e(r);
    return () => {
      t();
    };
  }, [e, r]);
}, Jn = () => !1, V0 = (e, r) => {
  const [t] = uo(
    Se(async () => {
      if (!e)
        return Jn;
      const n = await Promise.resolve(e(r));
      return async () => n();
    }, [r, e]),
    Jn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Xe(() => () => {
    t !== Jn && t();
  }, [t]);
};
function Fg(e, r = "top") {
  if (!e || typeof document > "u")
    return;
  const t = document.head || document.querySelector("head"), n = t.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), r === "top" && n ? t.insertBefore(o, n) : t.appendChild(o);
}
Fg(`.papi-menu-item {
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
    --background: 0 0% 100%;
    --foreground: 0 0% 0%;
    --muted: 33.9 32.4% 86.1%;
    --muted-foreground: 15.5 13.2% 53.9%;
    --popover: 0 0% 100%;
    --popover-foreground: 0 0% 0%;
    --card: 0 0% 100%;
    --card-foreground: 0 0% 0%;
    --border: 220 13% 91%;
    --input: 161.3 26.7% 88.2%;
    --primary: 173.4 82.1% 15.3%;
    --primary-foreground: 40 85.7% 97.3%;
    --secondary: 161.3 26.7% 88.2%;
    --secondary-foreground: 173.4 82.1% 15.3%;
    --accent: 161.3 26.7% 88.2%;
    --accent-foreground: 173.4 82.1% 15.3%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
  }

  .paratext-dark {
    --background: 0 0% 0%;
    --foreground: 0 0% 100%;
    --muted: 15.5 13.2% 53.9%;
    --muted-foreground: 33.9 32.4% 86.1%;
    --popover: 180 71.4% 5%;
    --popover-foreground: 0 0% 100%;
    --card: 0 0% 0%;
    --card-foreground: 0 0% 100%;
    --border: 220 13% 20%;
    --input: 220 13% 20%;
    --primary: 161.3 26.7% 88.2%;
    --primary-foreground: 173.4 82.1% 15.3%;
    --secondary: 180 71.4% 11%;
    --secondary-foreground: 161.3 26.7% 88.2%;
    --accent: 180 71.4% 11%;
    --accent-foreground: 161.3 26.7% 88.2%;
    --destructive: 0 60% 51%;
    --destructive-foreground: 210 20% 98%;
    --ring: 13.5 13.2% 53.9%;
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
.pr-sticky {
  position: sticky;
}
.pr-inset-0 {
  inset: 0px;
}
.pr-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.pr-bottom-2 {
  bottom: 0.5rem;
}
.pr-left-2 {
  left: 0.5rem;
}
.pr-left-2\\.5 {
  left: 0.625rem;
}
.pr-left-\\[50\\%\\] {
  left: 50%;
}
.pr-right-3 {
  right: 0.75rem;
}
.pr-right-4 {
  right: 1rem;
}
.pr-top-0 {
  top: 0px;
}
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-2 {
  top: 0.5rem;
}
.pr-top-2\\.5 {
  top: 0.625rem;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
}
.pr-z-10 {
  z-index: 10;
}
.pr-z-30 {
  z-index: 30;
}
.pr-z-50 {
  z-index: 50;
}
.pr-col-span-2 {
  grid-column: span 2 / span 2;
}
.pr-m-1 {
  margin: 0.25rem;
}
.pr-m-2 {
  margin: 0.5rem;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.pr-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
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
.pr-mb-20 {
  margin-bottom: 5rem;
}
.pr-me-2 {
  margin-inline-end: 0.5rem;
}
.pr-ml-1 {
  margin-left: 0.25rem;
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
.pr-ms-auto {
  margin-inline-start: auto;
}
.pr-mt-2 {
  margin-top: 0.5rem;
}
.pr-mt-20 {
  margin-top: 5rem;
}
.pr-mt-3 {
  margin-top: 0.75rem;
}
.pr-mt-4 {
  margin-top: 1rem;
}
.pr-mt-auto {
  margin-top: auto;
}
.pr-box-border {
  box-sizing: border-box;
}
.pr-box-content {
  box-sizing: content-box;
}
.pr-block {
  display: block;
}
.pr-inline-block {
  display: inline-block;
}
.pr-inline {
  display: inline;
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
.pr-aspect-square {
  aspect-ratio: 1 / 1;
}
.pr-h-1\\/2 {
  height: 50%;
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
.pr-h-2\\.5 {
  height: 0.625rem;
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
.pr-h-96 {
  height: 24rem;
}
.pr-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.pr-h-\\[100\\%\\] {
  height: 100%;
}
.pr-h-\\[1px\\] {
  height: 1px;
}
.pr-h-\\[405px\\] {
  height: 405px;
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
.pr-max-h-\\[300px\\] {
  max-height: 300px;
}
.pr-w-0 {
  width: 0px;
}
.pr-w-1\\/3 {
  width: 33.333333%;
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
.pr-w-2\\.5 {
  width: 0.625rem;
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
.pr-w-3\\/4 {
  width: 75%;
}
.pr-w-4 {
  width: 1rem;
}
.pr-w-5 {
  width: 1.25rem;
}
.pr-w-6 {
  width: 1.5rem;
}
.pr-w-72 {
  width: 18rem;
}
.pr-w-8 {
  width: 2rem;
}
.pr-w-9 {
  width: 2.25rem;
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
.pr-w-\\[1px\\] {
  width: 1px;
}
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-\\[350px\\] {
  width: 350px;
}
.pr-w-\\[70px\\] {
  width: 70px;
}
.pr-w-auto {
  width: auto;
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
.pr-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.pr-translate-y-\\[-50\\%\\] {
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
.pr-list-disc {
  list-style-type: disc;
}
.pr-columns-2 {
  columns: 2;
}
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.pr-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.pr-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.pr-flex-row {
  flex-direction: row;
}
.pr-flex-col {
  flex-direction: column;
}
.pr-flex-col-reverse {
  flex-direction: column-reverse;
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
.pr-gap-0 {
  gap: 0px;
}
.pr-gap-0\\.5 {
  gap: 0.125rem;
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
.pr-gap-3 {
  gap: 0.75rem;
}
.pr-gap-4 {
  gap: 1rem;
}
.pr-gap-6 {
  gap: 1.5rem;
}
.pr-gap-x-4 {
  column-gap: 1rem;
}
.pr-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
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
.pr-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.pr-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.pr-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
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
.pr-overflow-x-hidden {
  overflow-x: hidden;
}
.pr-overflow-y-hidden {
  overflow-y: hidden;
}
.pr-text-ellipsis {
  text-overflow: ellipsis;
}
.pr-whitespace-normal {
  white-space: normal;
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
.pr-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
}
.pr-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
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
.pr-border-e {
  border-inline-end-width: 1px;
}
.pr-border-l {
  border-left-width: 1px;
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
.pr-border-dashed {
  border-style: dashed;
}
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.pr-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.pr-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
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
.pr-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
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
.pr-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
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
.pr-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
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
.pr-bg-transparent {
  background-color: transparent;
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
.pr-p-8 {
  padding: 2rem;
}
.pr-p-\\[1px\\] {
  padding: 1px;
}
.pr-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.pr-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.pr-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.pr-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.pr-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.pr-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
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
.pr-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.pr-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.pr-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.pr-pb-2 {
  padding-bottom: 0.5rem;
}
.pr-pb-3 {
  padding-bottom: 0.75rem;
}
.pr-pb-4 {
  padding-bottom: 1rem;
}
.pr-pe-2 {
  padding-inline-end: 0.5rem;
}
.pr-pl-4 {
  padding-left: 1rem;
}
.pr-pl-5 {
  padding-left: 1.25rem;
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
.pr-pr-4 {
  padding-right: 1rem;
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
.pr-text-center {
  text-align: center;
}
.pr-text-right {
  text-align: right;
}
.pr-text-start {
  text-align: start;
}
.pr-text-end {
  text-align: end;
}
.pr-align-middle {
  vertical-align: middle;
}
.pr-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.pr-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.pr-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.pr-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
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
.pr-not-italic {
  font-style: normal;
}
.pr-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.pr-leading-9 {
  line-height: 2.25rem;
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
.pr-text-accent-foreground {
  color: hsl(var(--accent-foreground));
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
.pr-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.pr-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.pr-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.pr-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
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
.pr-underline {
  text-decoration-line: underline;
}
.pr-underline-offset-4 {
  text-underline-offset: 4px;
}
.pr-opacity-0 {
  opacity: 0;
}
.pr-opacity-50 {
  opacity: 0.5;
}
.pr-opacity-60 {
  opacity: 0.6;
}
.pr-opacity-70 {
  opacity: 0.7;
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
.pr-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.pr-duration-200 {
  transition-duration: 200ms;
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
.pr-duration-200 {
  animation-duration: 200ms;
}
.pr-duration-300 {
  animation-duration: 300ms;
}
.pr-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.\\*\\:pr-m-4 > * {
  margin: 1rem;
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
.hover\\:pr-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}
.hover\\:pr-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.hover\\:pr-bg-muted:hover {
  background-color: hsl(var(--muted));
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
.hover\\:pr-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}
.hover\\:pr-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.hover\\:pr-text-foreground:hover {
  color: hsl(var(--foreground));
}
.hover\\:pr-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}
.hover\\:pr-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.hover\\:pr-underline:hover {
  text-decoration-line: underline;
}
.hover\\:pr-opacity-100:hover {
  opacity: 1;
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
.pr-group:hover .group-hover\\:pr-opacity-100 {
  opacity: 1;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-cursor-not-allowed {
  cursor: not-allowed;
}
.pr-peer:disabled ~ .peer-disabled\\:pr-opacity-70 {
  opacity: 0.7;
}
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled=true] {
  pointer-events: none;
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
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state=checked] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=on\\]\\:pr-bg-accent[data-state=on] {
  background-color: hsl(var(--accent));
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
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=on\\]\\:pr-text-accent-foreground[data-state=on] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=open\\]\\:pr-text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:pr-opacity-50[data-disabled=true] {
  opacity: 0.5;
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
.data-\\[state\\=closed\\]\\:pr-slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%;
}
@media (min-width: 640px) {

  .sm\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:pr-static {
    position: static;
  }

  .sm\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:pr-flex {
    display: flex;
  }

  .sm\\:pr-table-cell {
    display: table-cell;
  }

  .sm\\:pr-hidden {
    display: none;
  }

  .sm\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-gap-4 {
    gap: 1rem;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-border-0 {
    border-width: 0px;
  }

  .sm\\:pr-bg-transparent {
    background-color: transparent;
  }

  .sm\\:pr-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:pr-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:pr-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:pr-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:pr-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:pr-text-left {
    text-align: left;
  }
}
@media (min-width: 768px) {

  .md\\:pr-inline {
    display: inline;
  }

  .md\\:pr-flex {
    display: flex;
  }

  .md\\:pr-table-cell {
    display: table-cell;
  }

  .md\\:pr-h-8 {
    height: 2rem;
  }

  .md\\:pr-w-8 {
    width: 2rem;
  }

  .md\\:pr-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:pr-grow-0 {
    flex-grow: 0;
  }

  .md\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:pr-gap-8 {
    gap: 2rem;
  }

  .md\\:pr-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}
@media (min-width: 1024px) {

  .lg\\:pr-sr-only {
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

  .lg\\:pr-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:pr-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}
@media (min-width: 1280px) {

  .xl\\:pr-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:pr-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:pr-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:pr-whitespace-nowrap {
    white-space: nowrap;
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
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
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
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-font-medium [cmdk-group-heading] {
  font-weight: 500;
}
.\\[\\&_\\[cmdk-group-heading\\]\\]\\:pr-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}
.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:pr-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}
.\\[\\&_\\[cmdk-group\\]\\]\\:pr-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:pr-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}
.\\[\\&_\\[cmdk-input\\]\\]\\:pr-h-12 [cmdk-input] {
  height: 3rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.\\[\\&_\\[cmdk-item\\]\\]\\:pr-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-h-5 [cmdk-item] svg {
  height: 1.25rem;
}
.\\[\\&_\\[cmdk-item\\]_svg\\]\\:pr-w-5 [cmdk-item] svg {
  width: 1.25rem;
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
}
`, "top");
export {
  kh as Alert,
  Eh as AlertDescription,
  Nh as AlertTitle,
  c0 as BOOK_SELECTOR_STRING_KEYS,
  l0 as BookChapterControl,
  ec as BookSelectionMode,
  d0 as BookSelector,
  ye as Button,
  Th as Card,
  Rh as CardContent,
  Oh as CardDescription,
  Ph as CardFooter,
  Sh as CardHeader,
  Ch as CardTitle,
  Ql as ChapterRangeSelector,
  qi as Checkbox,
  N0 as Checklist,
  la as ComboBox,
  pc as DataTable,
  $0 as DisableButton,
  bo as DropdownMenu,
  wo as DropdownMenuCheckboxItem,
  ln as DropdownMenuContent,
  Ol as DropdownMenuGroup,
  Ri as DropdownMenuItem,
  Lg as DropdownMenuItemType,
  Ct as DropdownMenuLabel,
  i0 as DropdownMenuPortal,
  p0 as DropdownMenuRadioGroup,
  Pi as DropdownMenuRadioItem,
  cn as DropdownMenuSeparator,
  $l as DropdownMenuShortcut,
  s0 as DropdownMenuSub,
  Pl as DropdownMenuSubContent,
  Rl as DropdownMenuSubTrigger,
  Oi as DropdownMenuTrigger,
  P0 as EnableButton,
  Vg as FilterButton,
  A0 as FilterDropdown,
  B0 as Footer,
  vh as GridMenu,
  yh as HamburgerMenuButton,
  u0 as INVENTORY_STRING_KEYS,
  E0 as IconButton,
  St as Input,
  R0 as InstallButton,
  f0 as Inventory,
  Ze as Label,
  I0 as MarkdownRenderer,
  js as MenuItem,
  M0 as MoreInfo,
  v0 as NavigationContentSearch,
  D0 as NoExtensionsFound,
  $i as RadioGroup,
  ro as RadioGroupItem,
  b0 as ScriptureResultsViewer,
  w0 as ScrollGroupSelector,
  mc as SearchBar,
  wt as Select,
  Fr as SelectContent,
  tc as SelectGroup,
  Ue as SelectItem,
  nc as SelectLabel,
  Li as SelectScrollDownButton,
  Vi as SelectScrollUpButton,
  oc as SelectSeparator,
  zr as SelectTrigger,
  yt as SelectValue,
  Yi as Separator,
  y0 as SettingsList,
  k0 as SettingsListHeader,
  x0 as SettingsListItem,
  $h as Slider,
  C0 as Sonner,
  At as Spinner,
  _h as Switch,
  dn as Table,
  fn as TableBody,
  sc as TableCaption,
  Ur as TableCell,
  ic as TableFooter,
  xt as TableHead,
  un as TableHeader,
  pr as TableRow,
  O0 as Tabs,
  Dh as TabsContent,
  Ih as TabsList,
  Ah as TabsTrigger,
  T0 as TextField,
  Ui as ToggleGroup,
  Xt as ToggleGroupItem,
  S0 as Toolbar,
  _0 as UpdateButton,
  zg as VersionHistory,
  Gi as VerticalTabs,
  Xi as VerticalTabsContent,
  Hi as VerticalTabsList,
  hc as VerticalTabsTrigger,
  Fl as buttonVariants,
  yo as getSortingIcon,
  h0 as inventoryCountColumn,
  m0 as inventoryItemColumn,
  g0 as inventoryStatusColumn,
  F0 as sonner,
  j0 as useEvent,
  V0 as useEventAsync,
  uo as usePromise
};
//# sourceMappingURL=index.js.map
