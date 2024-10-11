import bl, { jsx as c, jsxs as E, Fragment as dt } from "react/jsx-runtime";
import * as D from "react";
import M, { forwardRef as or, useCallback as Se, useState as fe, useRef as kt, useEffect as Xe, useLayoutEffect as aa, useMemo as ct } from "react";
import { History as vl, ChevronRight as pi, Check as ar, Circle as ui, ArrowDownWideNarrow as yl, Clock as xl, Bookmark as kl, X as Nl, Search as El, ChevronsUpDown as Tl, FilterIcon as Sl, ChevronDown as ir, ChevronUp as Cl, ArrowLeftIcon as Ol, ChevronLeftIcon as Rl, ChevronRightIcon as Pl, ArrowRightIcon as $l, ArrowUpIcon as _l, ArrowDownIcon as Il, ArrowUpDownIcon as Al, CircleCheckIcon as Dl, CircleXIcon as Ml, CircleHelpIcon as Bl, ChevronLeft as jl, LoaderCircle as Vl, Download as Ll, Filter as zl, User as Fl, Link as Ul, CircleHelp as Gl } from "lucide-react";
import Nt, { clsx as Hl } from "clsx";
import { extendTailwindMerge as Xl } from "tailwind-merge";
import * as we from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Wl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Yl, formatScrRef as Ar, compareScrRefs as Qr, scrRefToBBBCCCVVV as Dr, getLocalizeKeyForScrollGroupId as ue, NumberFormat as ql, formatBytes as Kl } from "platform-bible-utils";
import { Slot as Jl } from "@radix-ui/react-slot";
import { cva as sr } from "class-variance-authority";
import * as fi from "@radix-ui/react-label";
import * as bn from "@radix-ui/react-radio-group";
import * as vn from "@radix-ui/react-popover";
import { Command as Re } from "cmdk";
import * as We from "@radix-ui/react-dialog";
import { useReactTable as wi, getCoreRowModel as mi, getPaginationRowModel as Zl, getSortedRowModel as hi, getFilteredRowModel as Ql, flexRender as fn, getExpandedRowModel as ec, getGroupedRowModel as tc } from "@tanstack/react-table";
import * as be from "@radix-ui/react-select";
import * as lr from "@radix-ui/react-toggle-group";
import * as gi from "@radix-ui/react-toggle";
import * as Pe from "@radix-ui/react-tabs";
import * as bi from "@radix-ui/react-separator";
import * as eo from "@radix-ui/react-checkbox";
import nc, { ThemeContext as rc, internal_processStyles as oc } from "@mui/styled-engine";
import { MenuItem as ac, ListItemText as ic, ListItemIcon as vi, Menu as sc, Grid as yi, List as lc, IconButton as xi, Drawer as cc, AppBar as dc, Toolbar as pc } from "@mui/material";
import * as uc from "react-dom";
import Ln from "react-dom";
import { Toaster as fc } from "sonner";
import { toast as Ug } from "sonner";
import * as cn from "@radix-ui/react-slider";
import * as to from "@radix-ui/react-switch";
const wc = Xl({ prefix: "tw-" });
function R(...e) {
  return wc(Hl(e));
}
const Cn = M.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ c(
    "input",
    {
      type: t,
      className: R(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Cn.displayName = "Input";
const mc = or(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ E("div", { className: "tw-relative", children: [
    /* @__PURE__ */ c(
      Cn,
      {
        ...o,
        type: "text",
        className: "tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && r(), t(i);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ c(
      vl,
      {
        className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var hc = Object.defineProperty, gc = (e, t, n) => t in e ? hc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, re = (e, t, n) => gc(e, typeof t != "symbol" ? t + "" : t, n);
const Tt = [
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
], ia = Cc();
function Kt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ia ? ia[e] : 0;
}
function go(e) {
  return Kt(e) > 0;
}
function bc(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return t >= 40 && t <= 66;
}
function vc(e) {
  return (typeof e == "string" ? Kt(e) : e) <= 39;
}
function Ni(e) {
  return e <= 66;
}
function yc(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return Si(t) && !Ni(t);
}
function* xc() {
  for (let e = 1; e <= Tt.length; e++)
    yield e;
}
const kc = 1, Ei = Tt.length;
function Nc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function bo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Tt.length ? t : Tt[n];
}
function Ti(e) {
  return e <= 0 || e > Ei ? "******" : ki[e - 1];
}
function Ec(e) {
  return Ti(Kt(e));
}
function Si(e) {
  const t = typeof e == "number" ? bo(e) : e;
  return go(t) && !ho.includes(t);
}
function Tc(e) {
  const t = typeof e == "number" ? bo(e) : e;
  return go(t) && ho.includes(t);
}
function Sc(e) {
  return ki[e - 1].includes("*obsolete*");
}
function Cc() {
  const e = {};
  for (let t = 0; t < Tt.length; t++)
    e[Tt[t]] = t + 1;
  return e;
}
const de = {
  allBookIds: Tt,
  nonCanonicalIds: ho,
  bookIdToNumber: Kt,
  isBookIdValid: go,
  isBookNT: bc,
  isBookOT: vc,
  isBookOTNT: Ni,
  isBookDC: yc,
  allBookNumbers: xc,
  firstBook: kc,
  lastBook: Ei,
  extraBooks: Nc,
  bookNumberToId: bo,
  bookNumberToEnglishName: Ti,
  bookIdToEnglishName: Ec,
  isCanonical: Si,
  isExtraMaterial: Tc,
  isObsolete: Sc
};
var Ge = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ge || {});
const _e = class {
  // private versInfo: Versification;
  constructor(t) {
    if (re(this, "name"), re(this, "fullPath"), re(this, "isPresent"), re(this, "hasVerseSegments"), re(this, "isCustomized"), re(this, "baseVersification"), re(this, "scriptureBooks"), re(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Ge[t]) : (this._type = t, this.name = Ge[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
re(_e, "Original", new _e(Ge.Original)), re(_e, "Septuagint", new _e(Ge.Septuagint)), re(_e, "Vulgate", new _e(Ge.Vulgate)), re(_e, "English", new _e(Ge.English)), re(_e, "RussianProtestant", new _e(Ge.RussianProtestant)), re(_e, "RussianOrthodox", new _e(Ge.RussianOrthodox));
let ht = _e;
function sa(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Ci = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ci || {});
const Te = class oe {
  constructor(t, n, r, o) {
    if (re(this, "firstChapter"), re(this, "lastChapter"), re(this, "lastVerse"), re(this, "hasSegmentsDefined"), re(this, "text"), re(this, "BBBCCCVVVS"), re(this, "longHashCode"), re(this, "versification"), re(this, "rtlMark", "‏"), re(this, "_bookNum", 0), re(this, "_chapterNum", 0), re(this, "_verseNum", 0), re(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = n != null && n instanceof ht ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = n != null && n instanceof ht ? n : void 0;
        this.setEmpty(a), this._verseNum = t % oe.chapterDigitShifter, this._chapterNum = Math.floor(
          t % oe.bookDigitShifter / oe.chapterDigitShifter
        ), this._bookNum = Math.floor(t / oe.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof oe) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof ht ? t : oe.defaultVersification;
          this.setEmpty(a);
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
      return n = new oe(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof nn)
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
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = t, l = a || o.toString();
    let d;
    return i && (d = new ht(i)), n ? new oe(n, r.toString(), l, d) : new oe();
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
      if (n = n * 10 + +r - 0, n > oe.bcvMaxValue)
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
    return de.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = de.bookIdToNumber(t);
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
    if (t <= 0 || t > de.lastBook)
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
    this.versification = this.versification != null ? new ht(t) : void 0;
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
      const a = t.split("/");
      if (t = a[0], a.length > 1)
        try {
          const i = +a[1].trim();
          this.versification = new ht(Ge[i]);
        } catch {
          throw new nn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new nn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || de.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
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
    return new oe(this);
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
    return t instanceof oe ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
    const o = [], a = sa(this._verse, r);
    for (const i of a.map((l) => sa(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const d = l.verseNum;
      if (o.push(l), i.length > 1) {
        const p = this.clone();
        if (p.verse = i[1], !t)
          for (let u = d + 1; u < p.verseNum; u++) {
            const b = new oe(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(b);
          }
        o.push(p);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > de.lastBook ? 2 : (de.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = de.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
re(Te, "defaultVersification", ht.English), re(Te, "verseRangeSeparator", "-"), re(Te, "verseSequenceIndicator", ","), re(Te, "verseRangeSeparators", [Te.verseRangeSeparator]), re(Te, "verseSequenceIndicators", [Te.verseSequenceIndicator]), re(Te, "chapterDigitShifter", 1e3), re(Te, "bookDigitShifter", Te.chapterDigitShifter * Te.chapterDigitShifter), re(Te, "bcvMaxValue", Te.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
re(Te, "ValidStatusType", Ci);
let nn = class extends Error {
};
const vo = we.Root, Oi = we.Trigger, Oc = we.Group, ig = we.Portal, sg = we.Sub, lg = we.RadioGroup, Rc = M.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ E(
  we.SubTrigger,
  {
    ref: o,
    className: R(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      t && "tw-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ c(pi, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Rc.displayName = we.SubTrigger.displayName;
const Pc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  we.SubContent,
  {
    ref: n,
    className: R(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Pc.displayName = we.SubContent.displayName;
const cr = M.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ c(we.Portal, { children: /* @__PURE__ */ c(
  we.Content,
  {
    ref: r,
    sideOffset: t,
    className: R(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
cr.displayName = we.Content.displayName;
const Ri = M.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ c(
  we.Item,
  {
    ref: r,
    className: R(
      // removed: tw-relative tw-flex focus:tw-text-accent-foreground
      "tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
Ri.displayName = we.Item.displayName;
const yo = M.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ E(
  we.CheckboxItem,
  {
    ref: o,
    className: R(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ c("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ c(we.ItemIndicator, { children: /* @__PURE__ */ c(ar, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
yo.displayName = we.CheckboxItem.displayName;
const Pi = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ E(
  we.RadioItem,
  {
    ref: r,
    className: R(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ c("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ c(we.ItemIndicator, { children: /* @__PURE__ */ c(ui, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
Pi.displayName = we.RadioItem.displayName;
const On = M.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ c(
  we.Label,
  {
    ref: r,
    className: R("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
On.displayName = we.Label.displayName;
const dr = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  we.Separator,
  {
    ref: n,
    className: R("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
dr.displayName = we.Separator.displayName;
function $c({ className: e, ...t }) {
  return /* @__PURE__ */ c(
    "span",
    {
      className: R("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
$c.displayName = "DropdownMenuShortcut";
const _c = or(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ E(
    Ri,
    {
      ref: l,
      textValue: e,
      className: R("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": n
      }),
      onSelect: (d) => {
        d.preventDefault(), t();
      },
      onKeyDown: (d) => {
        o(d);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ c(
          "span",
          {
            className: R(
              "tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-l-red-200": a.toLowerCase() === "ot",
                "tw-border-l-purple-200": a.toLowerCase() === "nt",
                "tw-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: de.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ c("div", { children: i })
      ]
    },
    e
  )
);
function Ic({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, d) => d + 1), i = Se(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ c("div", { className: R("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ c(
    "div",
    {
      className: R(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": l === n,
          "tw-bg-amber-200": l === r
        }
      ),
      onClick: (d) => {
        d.preventDefault(), d.stopPropagation(), e(l);
      },
      role: "button",
      onKeyDown: (d) => {
        d.key === "Enter" && e(l);
      },
      tabIndex: 0,
      onMouseMove: () => i(l),
      children: l
    },
    l
  )) });
}
function Ac({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ E(On, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ c("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ c(
        yl,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ c(
        xl,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ c(
        kl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const wn = de.allBookIds, Dc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, la = ["OT", "NT", "DC"], Mc = 32 + 32 + 32, Bc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], jc = (e) => ({
  OT: wn.filter((n) => de.isBookOT(n)),
  NT: wn.filter((n) => de.isBookNT(n)),
  DC: wn.filter((n) => de.isBookDC(n))
})[e], rn = (e) => Yl(de.bookIdToNumber(e));
function Vc() {
  return wn.map((t) => de.bookIdToEnglishName(t));
}
function Lc(e) {
  return Vc().includes(e);
}
function zc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Lc(t))
    return wn.find((r) => de.bookIdToEnglishName(r) === t);
}
function cg({ scrRef: e, handleSubmit: t }) {
  const [n, r] = fe(""), [o, a] = fe(
    de.bookNumberToId(e.bookNum)
  ), [i, l] = fe(e.chapterNum ?? 0), [d, p] = fe(
    de.bookNumberToId(e.bookNum)
  ), [u, b] = fe(!1), [s, m] = fe(u), f = kt(void 0), h = kt(void 0), g = kt(void 0), y = Se(
    (k) => jc(k).filter((j) => {
      const B = de.bookIdToEnglishName(j).toLowerCase(), Z = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return B.includes(Z) || // Match book name
      j.toLowerCase().includes(Z);
    }),
    [n]
  ), C = (k) => {
    r(k);
  }, T = kt(!1), x = Se((k) => {
    if (T.current) {
      T.current = !1;
      return;
    }
    b(k);
  }, []), v = Se(
    (k, j, B, Z) => {
      if (l(
        de.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), j || rn(k) === -1) {
        t({
          bookNum: de.bookIdToNumber(k),
          chapterNum: B || 1,
          verseNum: Z || 1
        }), b(!1), r("");
        return;
      }
      a(o !== k ? k : ""), b(!j);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (k) => {
    k <= 0 || k > rn(o) || v(o, !0, k);
  }, P = Se(() => {
    Bc.forEach((k) => {
      const j = n.match(k);
      if (j) {
        const [B, Z = void 0, J = void 0] = j.slice(1), X = zc(B);
        (de.isBookIdValid(B) || X) && v(
          X ?? B,
          !0,
          Z ? parseInt(Z, 10) : 1,
          J ? parseInt(J, 10) : 1
        );
      }
    });
  }, [v, n]), V = Se(
    (k) => {
      u ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null ? g.current.focus() : typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null && h.current.focus(), k.preventDefault()) : b(!0);
    },
    [u]
  ), S = (k) => {
    const { key: j } = k;
    j === "ArrowRight" || j === "ArrowLeft" || j === "ArrowDown" || j === "ArrowUp" || j === "Enter" || (f.current.dispatchEvent(new KeyboardEvent("keydown", { key: j })), f.current.focus());
  }, $ = (k) => {
    const { key: j } = k;
    if (d === o) {
      if (j === "Enter") {
        k.preventDefault(), v(o, !0, i);
        return;
      }
      let B = 0;
      if (j === "ArrowRight")
        if (i < rn(d))
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
      i + B <= 0 || i + B > rn(d) ? l(0) : B !== 0 && (l(i + B), k.preventDefault());
    }
  };
  return Xe(() => {
    o === d ? o === de.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [d, e.bookNum, e.chapterNum, o]), aa(() => {
    m(u);
  }, [u]), aa(() => {
    const k = setTimeout(() => {
      if (s && h.current && g.current) {
        const B = g.current.offsetTop - Mc;
        h.current.scrollTo({ top: B, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [s]), /* @__PURE__ */ c("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ E(vo, { modal: !1, open: u, onOpenChange: x, children: [
    /* @__PURE__ */ c(Oi, { asChild: !0, children: /* @__PURE__ */ c(
      mc,
      {
        ref: f,
        value: n,
        handleSearch: C,
        handleKeyDown: V,
        handleOnClick: () => {
          a(de.bookNumberToId(e.bookNum)), p(de.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), b(!0), f.current.focus();
        },
        onFocus: () => {
          T.current = !0;
        },
        handleSubmit: P,
        placeholder: `${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ E(
      cr,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: S,
        align: "start",
        ref: h,
        children: [
          /* @__PURE__ */ c(
            Ac,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          la.map(
            (k, j) => y(k).length > 0 && /* @__PURE__ */ E("div", { children: [
              /* @__PURE__ */ c(On, { className: "tw-font-semibold tw-text-foreground/80", children: Dc[k] }),
              y(k).map((B) => /* @__PURE__ */ c("div", { children: /* @__PURE__ */ c(
                _c,
                {
                  bookId: B,
                  handleSelectBook: () => v(B, !1),
                  isSelected: o === B,
                  handleHighlightBook: () => p(B),
                  handleKeyDown: $,
                  bookType: k,
                  ref: (Z) => {
                    o === B && (g.current = Z);
                  },
                  children: /* @__PURE__ */ c(
                    Ic,
                    {
                      handleSelectChapter: O,
                      endChapter: rn(B),
                      activeChapter: e.bookNum === de.bookIdToNumber(B) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (Z) => {
                        l(Z);
                      }
                    }
                  )
                }
              ) }, B)),
              la.length - 1 !== j ? /* @__PURE__ */ c(dr, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const Fc = sr(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50",
  {
    variants: {
      variant: {
        default: "tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/90",
        destructive: "tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/90",
        outline: "tw-border tw-border-input tw-bg-background hover:tw-bg-accent hover:tw-text-accent-foreground",
        secondary: "tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        ghost: "hover:tw-bg-accent hover:tw-text-accent-foreground",
        link: "tw-text-primary tw-underline-offset-4 hover:tw-underline"
      },
      size: {
        default: "tw-h-10 tw-px-4 tw-py-2",
        sm: "tw-h-9 tw-rounded-md tw-px-3",
        lg: "tw-h-11 tw-rounded-md tw-px-8",
        icon: "tw-h-10 tw-w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), ve = M.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ c(r ? Jl : "button", { className: R(Fc({ variant: t, size: n, className: e })), ref: a, ...o })
);
ve.displayName = "Button";
const Uc = sr(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Ze = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(fi.Root, { ref: n, className: R("pr-twp", Uc(), e), ...t }));
Ze.displayName = fi.Root.displayName;
const $i = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  bn.Root,
  {
    className: R("pr-twp tw-grid tw-gap-2", e),
    ...t,
    ref: n
  }
));
$i.displayName = bn.Root.displayName;
const no = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  bn.Item,
  {
    ref: n,
    className: R(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ c(bn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ c(ui, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
no.displayName = bn.Item.displayName;
const Gc = vn.Root, Hc = vn.Trigger, _i = M.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ c(vn.Portal, { children: /* @__PURE__ */ c(
  vn.Content,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: R(
      "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
_i.displayName = vn.Content.displayName;
const Xc = We.Portal, Ii = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  We.Overlay,
  {
    ref: n,
    className: R(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
Ii.displayName = We.Overlay.displayName;
const Wc = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ E(Xc, { children: [
  /* @__PURE__ */ c(Ii, {}),
  /* @__PURE__ */ E(
    We.Content,
    {
      ref: r,
      className: R(
        "tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ E(We.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ c(Nl, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ c("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Wc.displayName = We.Content.displayName;
const Yc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  We.Title,
  {
    ref: n,
    className: R("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Yc.displayName = We.Title.displayName;
const qc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  We.Description,
  {
    ref: n,
    className: R("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
qc.displayName = We.Description.displayName;
const Ai = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Re,
  {
    ref: n,
    className: R(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
Ai.displayName = Re.displayName;
const Di = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ c(El, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ c(
    Re.Input,
    {
      ref: n,
      className: R(
        "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Di.displayName = Re.Input.displayName;
const Mi = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Re.List,
  {
    ref: n,
    className: R("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
Mi.displayName = Re.List.displayName;
const Bi = M.forwardRef((e, t) => /* @__PURE__ */ c(Re.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
Bi.displayName = Re.Empty.displayName;
const Kc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Re.Group,
  {
    ref: n,
    className: R(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Kc.displayName = Re.Group.displayName;
const Jc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Re.Separator,
  {
    ref: n,
    className: R("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
Jc.displayName = Re.Separator.displayName;
const ji = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Re.Item,
  {
    ref: n,
    className: R(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
ji.displayName = Re.Item.displayName;
function Zc(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function ca({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: a = Zc,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: d = "No option found",
  buttonVariant: p = "outline",
  dir: u = "ltr",
  isDisabled: b = !1,
  ...s
}) {
  const [m, f] = fe(!1);
  return /* @__PURE__ */ E(Gc, { open: m, onOpenChange: f, ...s, children: [
    /* @__PURE__ */ c(Hc, { asChild: !0, children: /* @__PURE__ */ E(
      ve,
      {
        variant: p,
        role: "combobox",
        "aria-expanded": m,
        id: e,
        className: R("tw-w-[200px] tw-justify-between", n),
        disabled: b,
        children: [
          /* @__PURE__ */ c("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: r ? a(r) : i }),
          /* @__PURE__ */ c(Tl, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ c(_i, { className: "tw-w-[200px] tw-p-0", dir: u, children: /* @__PURE__ */ E(Ai, { children: [
      /* @__PURE__ */ c(Di, { dir: u, placeholder: l, className: "tw-text-inherit" }),
      /* @__PURE__ */ c(Bi, { children: d }),
      /* @__PURE__ */ c(Mi, { children: t.map((h) => /* @__PURE__ */ E(
        ji,
        {
          value: a(h),
          onSelect: () => {
            o(h), f(!1);
          },
          children: [
            /* @__PURE__ */ c(
              ar,
              {
                className: R("tw-me-2 tw-h-4 tw-w-4", {
                  "tw-opacity-0": !r || a(r) !== a(h)
                })
              }
            ),
            a(h)
          ]
        },
        a(h)
      )) })
    ] }) })
  ] });
}
function Qc({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = ct(
    () => Array.from({ length: a }, (p, u) => u + 1),
    [a]
  );
  return /* @__PURE__ */ E(dt, { children: [
    /* @__PURE__ */ c(Ze, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ c(
      ca,
      {
        isDisabled: o,
        onChange: (p) => {
          n(p), p > t && r(p);
        },
        className: "tw-ml-2 tw-mr-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ c(Ze, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ c(
      ca,
      {
        isDisabled: o,
        onChange: (p) => {
          r(p), p < e && n(p);
        },
        className: "tw-ml-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var ed = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(ed || {});
const dg = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Mr = (e, t) => e[t] ?? t;
function pg({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: d,
  localizedStrings: p
}) {
  const u = Mr(p, "%webView_bookSelector_currentBook%"), b = Mr(p, "%webView_bookSelector_choose%"), s = Mr(p, "%webView_bookSelector_chooseBooks%"), [m, f] = fe(
    "current book"
    /* CURRENT_BOOK */
  ), h = (g) => {
    f(g), e(g);
  };
  return /* @__PURE__ */ c(
    $i,
    {
      className: "pr-twp tw-flex",
      value: m,
      onValueChange: (g) => h(g),
      children: /* @__PURE__ */ E("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ E("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ c(no, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ c(Ze, { className: "tw-ml-1", children: u })
          ] }),
          /* @__PURE__ */ c(Ze, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ c("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ c(
            Qc,
            {
              isDisabled: m === "choose books",
              handleSelectStartChapter: d,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ E("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ c(no, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ c(Ze, { className: "tw-ml-1", children: s })
          ] }),
          /* @__PURE__ */ c(Ze, { className: "tw-flex tw-items-center", children: r.map((g) => de.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ c(
            ve,
            {
              disabled: m === "current book",
              onClick: () => n(),
              children: b
            }
          )
        ] })
      ] })
    }
  );
}
function td({ table: e }) {
  return /* @__PURE__ */ E(vo, { children: [
    /* @__PURE__ */ c(Wl, { asChild: !0, children: /* @__PURE__ */ E(ve, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ c(Sl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ E(cr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ c(On, { children: "Toggle columns" }),
      /* @__PURE__ */ c(dr, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ c(
        yo,
        {
          className: "tw-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (n) => t.toggleVisibility(!!n),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
const yn = be.Root, nd = be.Group, xn = be.Value, zt = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ E(
  be.Trigger,
  {
    ref: r,
    className: R(
      "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ c(be.Icon, { asChild: !0, children: /* @__PURE__ */ c(ir, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
zt.displayName = be.Trigger.displayName;
const Vi = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  be.ScrollUpButton,
  {
    ref: n,
    className: R("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ c(Cl, { className: "tw-h-4 tw-w-4" })
  }
));
Vi.displayName = be.ScrollUpButton.displayName;
const Li = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  be.ScrollDownButton,
  {
    ref: n,
    className: R("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ c(ir, { className: "tw-h-4 tw-w-4" })
  }
));
Li.displayName = be.ScrollDownButton.displayName;
const Ft = M.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ c(be.Portal, { children: /* @__PURE__ */ E(
  be.Content,
  {
    ref: o,
    className: R(
      "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ c(Vi, {}),
      /* @__PURE__ */ c(
        be.Viewport,
        {
          className: R(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ c(Li, {})
    ]
  }
) }));
Ft.displayName = be.Content.displayName;
const rd = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  be.Label,
  {
    ref: n,
    className: R("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
rd.displayName = be.Label.displayName;
const Ue = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ E(
  be.Item,
  {
    ref: r,
    className: R(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ c("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ c(be.ItemIndicator, { children: /* @__PURE__ */ c(ar, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ c(be.ItemText, { children: t })
    ]
  }
));
Ue.displayName = be.Item.displayName;
const od = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  be.Separator,
  {
    ref: n,
    className: R("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
od.displayName = be.Separator.displayName;
function ad({ table: e }) {
  return /* @__PURE__ */ c("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ E("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ c("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ E(
        yn,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ c(zt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ c(xn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ c(Ft, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ c(Ue, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ E("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ E(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ c("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ c(Ol, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ E(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ c("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ c(Rl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ E(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ c("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ c(Pl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ E(
        ve,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ c("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ c($l, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const pr = M.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ c("div", { className: R("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !t }), children: /* @__PURE__ */ c(
  "table",
  {
    ref: r,
    className: R("tw-w-full tw-caption-bottom tw-text-sm", e),
    ...n
  }
) }));
pr.displayName = "Table";
const ur = M.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ c(
  "thead",
  {
    ref: r,
    className: R(
      { "tw-sticky tw-top-0 tw-bg-muted": t },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
ur.displayName = "TableHeader";
const fr = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c("tbody", { ref: n, className: R("[&_tr:last-child]:tw-border-0", e), ...t }));
fr.displayName = "TableBody";
const id = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  "tfoot",
  {
    ref: n,
    className: R("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
id.displayName = "TableFooter";
const lt = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ c(
    "tr",
    {
      ref: n,
      className: R(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        e
      ),
      ...t
    }
  )
);
lt.displayName = "TableRow";
const kn = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  "th",
  {
    ref: n,
    className: R(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
kn.displayName = "TableHead";
const Ut = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  "td",
  {
    ref: n,
    className: R("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
Ut.displayName = "TableCell";
const sd = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  "caption",
  {
    ref: n,
    className: R("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
sd.displayName = "TableCaption";
function ld({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var g;
  const [l, d] = fe([]), [p, u] = fe([]), [b, s] = fe({}), [m, f] = fe({}), h = wi({
    data: t,
    columns: e,
    getCoreRowModel: mi(),
    ...n && { getPaginationRowModel: Zl() },
    onSortingChange: d,
    getSortedRowModel: hi(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Ql(),
    onColumnVisibilityChange: s,
    onRowSelectionChange: f,
    state: {
      sorting: l,
      columnFilters: p,
      columnVisibility: b,
      rowSelection: m
    }
  });
  return /* @__PURE__ */ E("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ c(td, { table: h }),
    /* @__PURE__ */ E(pr, { stickyHeader: a, children: [
      /* @__PURE__ */ c(ur, { stickyHeader: a, children: h.getHeaderGroups().map((y) => /* @__PURE__ */ c(lt, { children: y.headers.map((C) => /* @__PURE__ */ c(kn, { children: C.isPlaceholder ? void 0 : fn(C.column.columnDef.header, C.getContext()) }, C.id)) }, y.id)) }),
      /* @__PURE__ */ c(fr, { children: (g = h.getRowModel().rows) != null && g.length ? h.getRowModel().rows.map((y) => /* @__PURE__ */ c(
        lt,
        {
          onClick: () => i(y, h),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((C) => /* @__PURE__ */ c(Ut, { children: fn(C.column.columnDef.cell, C.getContext()) }, C.id))
        },
        y.id
      )) : /* @__PURE__ */ c(lt, { children: /* @__PURE__ */ c(Ut, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ c(
        ve,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ c(
        ve,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ c(ad, { table: h })
  ] });
}
const cd = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), da = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, pa = (e, t, n, r) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = cd(e);
  let i = r.chapterNum, l = r.verseNum, d = 0;
  return a.forEach((p) => {
    p.startsWith("\\id") && (i = 0, l = 0), p.startsWith("\\c") && (i = da(p), l = 0), p.startsWith("\\v") && (l = da(p), i === 0 && (i = r.chapterNum));
    const u = Array.from(new Set(n)), b = [];
    u.forEach((s) => {
      const m = new RegExp(s, "g"), f = p.match(m);
      f && b.push(...f);
    });
    for (let s = 0; s < b.length; s++) {
      const m = {
        reference: {
          ...r,
          chapterNum: i !== void 0 ? +i : -1,
          verseNum: l !== void 0 ? +l : -1
        },
        snippet: p,
        key: d
      };
      d += 1, o.push(m);
    }
  }), o;
};
function dd({
  selectedItem: e,
  text: t,
  items: n,
  scriptureReference: r,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], l = a["%webView_inventory_occurrences_table_header_occurrence%"], [d, p] = fe(
    pa(t, e, n, r)
  );
  return Xe(
    () => p(pa(t, e, n, r)),
    [t, e, r, n]
  ), /* @__PURE__ */ E(pr, { stickyHeader: !0, children: [
    /* @__PURE__ */ c(ur, { stickyHeader: !0, children: /* @__PURE__ */ E(lt, { children: [
      /* @__PURE__ */ c(kn, { children: i }),
      /* @__PURE__ */ c(kn, { children: l })
    ] }) }),
    /* @__PURE__ */ c(fr, { children: d.map((u) => /* @__PURE__ */ E(
      lt,
      {
        onClick: () => {
          o(u.reference);
        },
        children: [
          /* @__PURE__ */ c(Ut, { children: `${de.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}` }),
          /* @__PURE__ */ c(Ut, { children: u.snippet })
        ]
      },
      u.key
    )) })
  ] });
}
const ug = Object.freeze([
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
]), wr = (e) => e === "asc" ? /* @__PURE__ */ c(_l, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ c(Il, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ c(Al, { className: "tw-ms-2 tw-h-4 tw-w-4" }), pd = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.item.includes(n))), r;
}, ud = (e, t) => {
  const n = [];
  for (let r = 0; r < e.length; r++) {
    const o = e[r], a = n.find((i) => i.item === o.item && i.relatedItem === o.relatedItem);
    if (a)
      a.count += 1;
    else {
      const i = {
        item: o.item,
        relatedItem: o.relatedItem,
        count: 1,
        status: t(o.item)
      };
      n.push(i);
    }
  }
  return n;
}, rt = (e, t) => e[t] ?? t;
function fg({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  items: r,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: l,
  text: d,
  scope: p,
  onScopeChange: u,
  getColumns: b
}) {
  const s = rt(n, "%webView_inventory_all%"), m = rt(n, "%webView_inventory_approved%"), f = rt(n, "%webView_inventory_unapproved%"), h = rt(n, "%webView_inventory_unknown%"), g = rt(n, "%webView_inventory_scope_currentBook%"), y = rt(n, "%webView_inventory_scope_chapter%"), C = rt(n, "%webView_inventory_scope_verse%"), T = rt(n, "%webView_inventory_filter_text%"), [x, v] = fe([]), [O, P] = fe("all"), [V, S] = fe(""), [$, k] = fe(""), j = Se(
    (z, N) => {
      v((U) => {
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
      }), l(W);
    },
    [o, a, i, l]
  ), B = Se(
    (z) => o.includes(z) ? "approved" : i.includes(z) ? "unapproved" : "unknown",
    [o, i]
  );
  Xe(() => {
    d && v(ud(r, B));
  }, [r, d, B]);
  const Z = ct(() => pd(x, O, V), [x, O, V]);
  Xe(() => {
    k("");
  }, [Z]);
  const J = (z, N) => {
    N.toggleAllRowsSelected(!1), z.toggleSelected(void 0), k(z.getValue("item"));
  }, X = ct(() => b(j), [b, j]), ne = (z) => {
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
  return /* @__PURE__ */ E("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ E("div", { className: "tw-flex", children: [
      /* @__PURE__ */ E(
        yn,
        {
          onValueChange: (z) => ae(z),
          defaultValue: O,
          children: [
            /* @__PURE__ */ c(zt, { className: "tw-m-1", children: /* @__PURE__ */ c(xn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ E(Ft, { children: [
              /* @__PURE__ */ c(Ue, { value: "all", children: s }),
              /* @__PURE__ */ c(Ue, { value: "approved", children: m }),
              /* @__PURE__ */ c(Ue, { value: "unapproved", children: f }),
              /* @__PURE__ */ c(Ue, { value: "unknown", children: h })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ E(yn, { onValueChange: (z) => ne(z), defaultValue: p, children: [
        /* @__PURE__ */ c(zt, { className: "tw-m-1", children: /* @__PURE__ */ c(xn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ E(Ft, { children: [
          /* @__PURE__ */ c(Ue, { value: "book", children: g }),
          /* @__PURE__ */ c(Ue, { value: "chapter", children: y }),
          /* @__PURE__ */ c(Ue, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ c(
        Cn,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: T,
          value: V,
          onChange: (z) => {
            S(z.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ c("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ c(
      ld,
      {
        columns: X,
        data: Z,
        onRowClickHandler: J,
        stickyHeader: !0
      }
    ) }),
    $ !== "" && /* @__PURE__ */ c("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ c(
      dd,
      {
        selectedItem: $,
        text: d,
        items: [],
        scriptureReference: e,
        setScriptureReference: (z) => t(z),
        localizedStrings: n
      }
    ) })
  ] });
}
const zi = sr(
  "pr-twp tw-inline-flex tw-items-center tw-justify-center tw-rounded-md tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-colors hover:tw-bg-muted hover:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=on]:tw-bg-accent data-[state=on]:tw-text-accent-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-transparent",
        outline: "tw-border tw-border-input tw-bg-transparent hover:tw-bg-accent hover:tw-text-accent-foreground"
      },
      size: {
        default: "tw-h-10 tw-px-3",
        sm: "tw-h-9 tw-px-2.5",
        lg: "tw-h-11 tw-px-5"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), fd = M.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ c(
  gi.Root,
  {
    ref: o,
    className: R(zi({ variant: t, size: n, className: e })),
    ...r
  }
));
fd.displayName = gi.Root.displayName;
const Fi = M.createContext({
  size: "default",
  variant: "default"
}), Ui = M.forwardRef(({ className: e, variant: t, size: n, children: r, ...o }, a) => /* @__PURE__ */ c(
  lr.Root,
  {
    ref: a,
    className: R("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
    ...o,
    children: /* @__PURE__ */ c(
      Fi.Provider,
      {
        value: { variant: t, size: n },
        children: r
      }
    )
  }
));
Ui.displayName = lr.Root.displayName;
const Wn = M.forwardRef(({ className: e, children: t, variant: n, size: r, ...o }, a) => {
  const i = M.useContext(Fi);
  return /* @__PURE__ */ c(
    lr.Item,
    {
      ref: a,
      className: R(
        zi({
          variant: i.variant || n,
          size: i.size || r
        }),
        e
      ),
      ...o,
      children: t
    }
  );
});
Wn.displayName = lr.Item.displayName;
const wg = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ E(ve, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    wr(t.getIsSorted())
  ] })
}), mg = (e) => ({
  accessorKey: "relatedItem",
  header: ({ column: t }) => /* @__PURE__ */ E(ve, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    wr(t.getIsSorted())
  ] })
}), hg = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ c("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ E(ve, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    wr(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ c("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), gg = (e, t) => ({
  accessorKey: "status",
  header: ({ column: n }) => /* @__PURE__ */ c("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ E(ve, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    wr(n.getIsSorted())
  ] }) }),
  cell: ({ row: n }) => {
    const r = n.getValue("status"), o = n.getValue("item");
    return /* @__PURE__ */ E(Ui, { value: r, variant: "outline", type: "single", children: [
      /* @__PURE__ */ c(Wn, { onClick: () => t([o], "approved"), value: "approved", children: /* @__PURE__ */ c(Dl, {}) }),
      /* @__PURE__ */ c(
        Wn,
        {
          onClick: () => t([o], "unapproved"),
          value: "unapproved",
          children: /* @__PURE__ */ c(Ml, {})
        }
      ),
      /* @__PURE__ */ c(Wn, { onClick: () => t([o], "unknown"), value: "unknown", children: /* @__PURE__ */ c(Bl, {}) })
    ] });
  }
});
function wd({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ c(
    Cn,
    {
      className: R(
        "tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        { "tw-w-full": n }
      ),
      placeholder: t,
      value: r,
      onChange: (i) => a(i.target.value)
    }
  );
}
const Gi = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.Root,
  {
    orientation: "vertical",
    ref: n,
    className: R("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
    ...t
  }
));
Gi.displayName = Pe.List.displayName;
const Hi = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.List,
  {
    ref: n,
    className: R(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Hi.displayName = Pe.List.displayName;
const md = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.Trigger,
  {
    ref: n,
    ...t,
    className: R(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), Xi = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.Content,
  {
    ref: n,
    className: R(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Xi.displayName = Pe.Content.displayName;
function bg({
  tabList: e,
  onSearch: t,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ E("div", { className: "pr-twp", children: [
    /* @__PURE__ */ E("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ c("h1", { children: r }) : "",
      /* @__PURE__ */ c(
        wd,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ E(Gi, { dir: a, children: [
      /* @__PURE__ */ c(Hi, { children: e.map((i) => /* @__PURE__ */ c(md, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ c(Xi, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const it = "scrBook", hd = "scrRef", gt = "source", gd = "details", bd = "Scripture Reference", vd = "Scripture Book", Wi = "Type", yd = "Details";
function xd(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${de.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: it,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? bd,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? de.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === it ? Ar(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Qr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Ar(r.start),
      id: hd,
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
      id: gt,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Wi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: gd,
      header: (e == null ? void 0 : e.detailsColumnName) ?? yd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const kd = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Qr(e.start, e.end) === 0 ? `${Dr(e.start)}+${t}` : `${Dr(e.start)}+${t}-${Dr(e.end)}+${n}`;
}, ua = (e) => `${kd({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function vg({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l,
  direction: d = "ltr"
}) {
  const [p, u] = fe([]), [b, s] = fe([{ id: it, desc: !1 }]), [m, f] = fe({}), h = ct(
    () => e.flatMap((S) => S.data.map(($) => ({
      ...$,
      source: S.source
    }))),
    [e]
  ), g = ct(
    () => xd(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: i
      },
      n
    ),
    [r, a, i, n]
  );
  Xe(() => {
    p.includes(gt) ? s([
      { id: gt, desc: !1 },
      { id: it, desc: !1 }
    ]) : s([{ id: it, desc: !1 }]);
  }, [p]);
  const y = wi({
    data: h,
    columns: g,
    state: {
      grouping: p,
      sorting: b,
      rowSelection: m
    },
    onGroupingChange: u,
    onSortingChange: s,
    onRowSelectionChange: f,
    getExpandedRowModel: ec(),
    getGroupedRowModel: tc(),
    getCoreRowModel: mi(),
    getSortedRowModel: hi(),
    getRowId: ua,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Xe(() => {
    if (l) {
      const S = y.getSelectedRowModel().rowsById, $ = Object.keys(S);
      if ($.length === 1) {
        const k = h.find((j) => ua(j) === $[0]) || void 0;
        k && l(k);
      }
    }
  }, [m, h, l, y]);
  const C = o ?? vd, T = a ?? Wi, x = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [it] },
    { label: `Group by ${T}`, value: [gt] },
    {
      label: `Group by ${C} and ${T}`,
      value: [it, gt]
    },
    {
      label: `Group by ${T} and ${C}`,
      value: [gt, it]
    }
  ], v = (S) => {
    u(JSON.parse(S));
  }, O = (S, $) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()($);
  }, P = (S, $) => S.getIsGrouped() ? "" : R("banded-row", $ % 2 === 0 ? "even" : "odd"), V = (S, $, k) => {
    if (!((S == null ? void 0 : S.length) === 0 || $.depth < k.column.getGroupedIndex())) {
      if ($.getIsGrouped())
        switch ($.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch ($.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ E("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ E(
      yn,
      {
        value: JSON.stringify(p),
        onValueChange: (S) => {
          v(S);
        },
        children: [
          /* @__PURE__ */ c(zt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ c(xn, {}) }),
          /* @__PURE__ */ c(Ft, { position: "item-aligned", children: /* @__PURE__ */ c(nd, { children: x.map((S) => /* @__PURE__ */ c(Ue, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ E(pr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ c(ur, { children: y.getHeaderGroups().map((S) => /* @__PURE__ */ c(lt, { children: S.headers.filter(($) => $.column.columnDef.header).map(($) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ c(kn, { colSpan: $.colSpan, className: "top-0 tw-sticky", children: $.isPlaceholder ? void 0 : /* @__PURE__ */ E("div", { children: [
          $.column.getCanGroup() ? /* @__PURE__ */ c(
            ve,
            {
              variant: "ghost",
              title: `Toggle grouping by ${$.column.columnDef.header}`,
              onClick: $.column.getToggleGroupingHandler(),
              type: "button",
              children: $.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          fn($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, S.id)) }),
      /* @__PURE__ */ c(fr, { children: y.getRowModel().rows.map((S, $) => /* @__PURE__ */ c(
        lt,
        {
          "data-state": S.getIsSelected() ? "selected" : "",
          className: R(P(S, $)),
          onClick: (k) => O(S, k),
          children: S.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== gt || !n)))
              return /* @__PURE__ */ c(
                Ut,
                {
                  className: R(
                    k.column.columnDef.id,
                    "tw-p-[1px]",
                    V(p, S, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ E(
                    ve,
                    {
                      variant: "link",
                      onClick: S.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        S.getIsExpanded() && /* @__PURE__ */ c(ir, {}),
                        !S.getIsExpanded() && (d === "ltr" ? /* @__PURE__ */ c(pi, {}) : /* @__PURE__ */ c(jl, {})),
                        " ",
                        fn(k.column.columnDef.cell, k.getContext()),
                        " (",
                        S.subRows.length,
                        ")"
                      ]
                    }
                  ) : fn(k.column.columnDef.cell, k.getContext()))()
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
const Br = {
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
function yg({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Br,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([a, i]) => [
          a,
          a === i && a in Br ? Br[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ E(
    yn,
    {
      value: `${t}`,
      onValueChange: (a) => n(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ c(zt, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ c(
          xn,
          {
            placeholder: o[ue(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ c(
          Ft,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ c(Ue, { value: `${a}`, children: o[ue(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const Yi = M.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ c(
  bi.Root,
  {
    ref: o,
    decorative: n,
    orientation: t,
    className: R(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...r
  }
));
Yi.displayName = bi.Root.displayName;
function xg({ children: e }) {
  return /* @__PURE__ */ c("div", { className: "pr-twp tw-grid", children: e });
}
function kg({
  primary: e,
  secondary: t,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ c("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ c("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ c("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ c("div", { children: n })
  ] });
}
function Ng({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ E("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ c("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ c("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ c(Yi, {}) : ""
  ] });
}
const qi = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  eo.Root,
  {
    ref: n,
    className: R(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ c(
      eo.Indicator,
      {
        className: R("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ c(ar, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
qi.displayName = eo.Root.displayName;
function Eg({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ c("div", { id: e, className: t, children: n.map((i) => /* @__PURE__ */ E("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ c(
      qi,
      {
        className: "tw-mr-2 tw-align-middle",
        checked: r.includes(i),
        onCheckedChange: (l) => o(i, l)
      }
    ),
    /* @__PURE__ */ c(Ze, { children: a ? a(i) : i })
  ] }, i)) });
}
function Nd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ed(e) {
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
var xo = {}, Ki = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ki);
var Td = Ki.exports, jr = {};
function ko(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function _() {
  return _ = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, _.apply(this, arguments);
}
function yt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ji(e) {
  if (!yt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ji(e[n]);
  }), t;
}
function Qe(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? _({}, e) : e;
  return yt(e) && yt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (yt(t[o]) && o in e && yt(e[o]) ? r[o] = Qe(e[o], t[o], n) : n.clone ? r[o] = yt(t[o]) ? Ji(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
var ro = { exports: {} }, zn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fa;
function Sd() {
  if (fa)
    return ie;
  fa = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, d = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, s = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, f = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function T(v) {
    if (typeof v == "object" && v !== null) {
      var O = v.$$typeof;
      switch (O) {
        case t:
          switch (v = v.type, v) {
            case d:
            case p:
            case r:
            case a:
            case o:
            case b:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case l:
                case u:
                case f:
                case m:
                case i:
                  return v;
                default:
                  return O;
              }
          }
        case n:
          return O;
      }
    }
  }
  function x(v) {
    return T(v) === p;
  }
  return ie.AsyncMode = d, ie.ConcurrentMode = p, ie.ContextConsumer = l, ie.ContextProvider = i, ie.Element = t, ie.ForwardRef = u, ie.Fragment = r, ie.Lazy = f, ie.Memo = m, ie.Portal = n, ie.Profiler = a, ie.StrictMode = o, ie.Suspense = b, ie.isAsyncMode = function(v) {
    return x(v) || T(v) === d;
  }, ie.isConcurrentMode = x, ie.isContextConsumer = function(v) {
    return T(v) === l;
  }, ie.isContextProvider = function(v) {
    return T(v) === i;
  }, ie.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === t;
  }, ie.isForwardRef = function(v) {
    return T(v) === u;
  }, ie.isFragment = function(v) {
    return T(v) === r;
  }, ie.isLazy = function(v) {
    return T(v) === f;
  }, ie.isMemo = function(v) {
    return T(v) === m;
  }, ie.isPortal = function(v) {
    return T(v) === n;
  }, ie.isProfiler = function(v) {
    return T(v) === a;
  }, ie.isStrictMode = function(v) {
    return T(v) === o;
  }, ie.isSuspense = function(v) {
    return T(v) === b;
  }, ie.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === p || v === a || v === o || v === b || v === s || typeof v == "object" && v !== null && (v.$$typeof === f || v.$$typeof === m || v.$$typeof === i || v.$$typeof === l || v.$$typeof === u || v.$$typeof === g || v.$$typeof === y || v.$$typeof === C || v.$$typeof === h);
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
var wa;
function Cd() {
  return wa || (wa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, d = e ? Symbol.for("react.async_mode") : 60111, p = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, s = e ? Symbol.for("react.suspense_list") : 60120, m = e ? Symbol.for("react.memo") : 60115, f = e ? Symbol.for("react.lazy") : 60116, h = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function T(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === r || A === p || A === a || A === o || A === b || A === s || typeof A == "object" && A !== null && (A.$$typeof === f || A.$$typeof === m || A.$$typeof === i || A.$$typeof === l || A.$$typeof === u || A.$$typeof === g || A.$$typeof === y || A.$$typeof === C || A.$$typeof === h);
    }
    function x(A) {
      if (typeof A == "object" && A !== null) {
        var ke = A.$$typeof;
        switch (ke) {
          case t:
            var L = A.type;
            switch (L) {
              case d:
              case p:
              case r:
              case a:
              case o:
              case b:
                return L;
              default:
                var xe = L && L.$$typeof;
                switch (xe) {
                  case l:
                  case u:
                  case f:
                  case m:
                  case i:
                    return xe;
                  default:
                    return ke;
                }
            }
          case n:
            return ke;
        }
      }
    }
    var v = d, O = p, P = l, V = i, S = t, $ = u, k = r, j = f, B = m, Z = n, J = a, X = o, ne = b, ae = !1;
    function z(A) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), N(A) || x(A) === d;
    }
    function N(A) {
      return x(A) === p;
    }
    function I(A) {
      return x(A) === l;
    }
    function W(A) {
      return x(A) === i;
    }
    function U(A) {
      return typeof A == "object" && A !== null && A.$$typeof === t;
    }
    function F(A) {
      return x(A) === u;
    }
    function q(A) {
      return x(A) === r;
    }
    function G(A) {
      return x(A) === f;
    }
    function K(A) {
      return x(A) === m;
    }
    function Y(A) {
      return x(A) === n;
    }
    function Q(A) {
      return x(A) === a;
    }
    function ee(A) {
      return x(A) === o;
    }
    function pe(A) {
      return x(A) === b;
    }
    se.AsyncMode = v, se.ConcurrentMode = O, se.ContextConsumer = P, se.ContextProvider = V, se.Element = S, se.ForwardRef = $, se.Fragment = k, se.Lazy = j, se.Memo = B, se.Portal = Z, se.Profiler = J, se.StrictMode = X, se.Suspense = ne, se.isAsyncMode = z, se.isConcurrentMode = N, se.isContextConsumer = I, se.isContextProvider = W, se.isElement = U, se.isForwardRef = F, se.isFragment = q, se.isLazy = G, se.isMemo = K, se.isPortal = Y, se.isProfiler = Q, se.isStrictMode = ee, se.isSuspense = pe, se.isValidElementType = T, se.typeOf = x;
  }()), se;
}
var ma;
function Zi() {
  return ma || (ma = 1, process.env.NODE_ENV === "production" ? zn.exports = Sd() : zn.exports = Cd()), zn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Vr, ha;
function Od() {
  if (ha)
    return Vr;
  ha = 1;
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
      var d = Object.getOwnPropertyNames(i).map(function(u) {
        return i[u];
      });
      if (d.join("") !== "0123456789")
        return !1;
      var p = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(u) {
        p[u] = u;
      }), Object.keys(Object.assign({}, p)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Vr = o() ? Object.assign : function(a, i) {
    for (var l, d = r(a), p, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var b in l)
        t.call(l, b) && (d[b] = l[b]);
      if (e) {
        p = e(l);
        for (var s = 0; s < p.length; s++)
          n.call(l, p[s]) && (d[p[s]] = l[p[s]]);
      }
    }
    return d;
  }, Vr;
}
var Lr, ga;
function No() {
  if (ga)
    return Lr;
  ga = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Lr = e, Lr;
}
var zr, ba;
function Qi() {
  return ba || (ba = 1, zr = Function.call.bind(Object.prototype.hasOwnProperty)), zr;
}
var Fr, va;
function Rd() {
  if (va)
    return Fr;
  va = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = No(), n = {}, r = Qi();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, d, p) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in a)
        if (r(a, u)) {
          var b;
          try {
            if (typeof a[u] != "function") {
              var s = Error(
                (d || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw s.name = "Invariant Violation", s;
            }
            b = a[u](i, u, d, l, null, t);
          } catch (f) {
            b = f;
          }
          if (b && !(b instanceof Error) && e(
            (d || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof b + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), b instanceof Error && !(b.message in n)) {
            n[b.message] = !0;
            var m = p ? p() : "";
            e(
              "Failed " + l + " type: " + b.message + (m ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Fr = o, Fr;
}
var Ur, ya;
function Pd() {
  if (ya)
    return Ur;
  ya = 1;
  var e = Zi(), t = Od(), n = No(), r = Qi(), o = Rd(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
    var d = "Warning: " + l;
    typeof console < "u" && console.error(d);
    try {
      throw new Error(d);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return Ur = function(l, d) {
    var p = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function b(N) {
      var I = N && (p && N[p] || N[u]);
      if (typeof I == "function")
        return I;
    }
    var s = "<<anonymous>>", m = {
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
      elementType: v(),
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
    function h(N, I) {
      this.message = N, this.data = I && typeof I == "object" ? I : {}, this.stack = "";
    }
    h.prototype = Error.prototype;
    function g(N) {
      if (process.env.NODE_ENV !== "production")
        var I = {}, W = 0;
      function U(q, G, K, Y, Q, ee, pe) {
        if (Y = Y || s, ee = ee || K, pe !== n) {
          if (d) {
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
        return G[K] == null ? q ? G[K] === null ? new h("The " + Q + " `" + ee + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new h("The " + Q + " `" + ee + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : N(G, K, Y, Q, ee);
      }
      var F = U.bind(null, !1);
      return F.isRequired = U.bind(null, !0), F;
    }
    function y(N) {
      function I(W, U, F, q, G, K) {
        var Y = W[U], Q = X(Y);
        if (Q !== N) {
          var ee = ne(Y);
          return new h(
            "Invalid " + q + " `" + G + "` of type " + ("`" + ee + "` supplied to `" + F + "`, expected ") + ("`" + N + "`."),
            { expectedType: N }
          );
        }
        return null;
      }
      return g(I);
    }
    function C() {
      return g(i);
    }
    function T(N) {
      function I(W, U, F, q, G) {
        if (typeof N != "function")
          return new h("Property `" + G + "` of component `" + F + "` has invalid PropType notation inside arrayOf.");
        var K = W[U];
        if (!Array.isArray(K)) {
          var Y = X(K);
          return new h("Invalid " + q + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected an array."));
        }
        for (var Q = 0; Q < K.length; Q++) {
          var ee = N(K, Q, F, q, G + "[" + Q + "]", n);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return g(I);
    }
    function x() {
      function N(I, W, U, F, q) {
        var G = I[W];
        if (!l(G)) {
          var K = X(G);
          return new h("Invalid " + F + " `" + q + "` of type " + ("`" + K + "` supplied to `" + U + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(N);
    }
    function v() {
      function N(I, W, U, F, q) {
        var G = I[W];
        if (!e.isValidElementType(G)) {
          var K = X(G);
          return new h("Invalid " + F + " `" + q + "` of type " + ("`" + K + "` supplied to `" + U + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(N);
    }
    function O(N) {
      function I(W, U, F, q, G) {
        if (!(W[U] instanceof N)) {
          var K = N.name || s, Y = z(W[U]);
          return new h("Invalid " + q + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return g(I);
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
        var Q = JSON.stringify(N, function(pe, A) {
          var ke = ne(A);
          return ke === "symbol" ? String(A) : A;
        });
        return new h("Invalid " + q + " `" + G + "` of value `" + String(K) + "` " + ("supplied to `" + F + "`, expected one of " + Q + "."));
      }
      return g(I);
    }
    function V(N) {
      function I(W, U, F, q, G) {
        if (typeof N != "function")
          return new h("Property `" + G + "` of component `" + F + "` has invalid PropType notation inside objectOf.");
        var K = W[U], Y = X(K);
        if (Y !== "object")
          return new h("Invalid " + q + " `" + G + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected an object."));
        for (var Q in K)
          if (r(K, Q)) {
            var ee = N(K, Q, F, q, G + "." + Q, n);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return g(I);
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
          var pe = N[ee], A = pe(F, q, G, K, Y, n);
          if (A == null)
            return null;
          A.data && r(A.data, "expectedType") && Q.push(A.data.expectedType);
        }
        var ke = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new h("Invalid " + K + " `" + Y + "` supplied to " + ("`" + G + "`" + ke + "."));
      }
      return g(U);
    }
    function $() {
      function N(I, W, U, F, q) {
        return Z(I[W]) ? null : new h("Invalid " + F + " `" + q + "` supplied to " + ("`" + U + "`, expected a ReactNode."));
      }
      return g(N);
    }
    function k(N, I, W, U, F) {
      return new h(
        (N || "React class") + ": " + I + " type `" + W + "." + U + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + F + "`."
      );
    }
    function j(N) {
      function I(W, U, F, q, G) {
        var K = W[U], Y = X(K);
        if (Y !== "object")
          return new h("Invalid " + q + " `" + G + "` of type `" + Y + "` " + ("supplied to `" + F + "`, expected `object`."));
        for (var Q in N) {
          var ee = N[Q];
          if (typeof ee != "function")
            return k(F, q, G, Q, ne(ee));
          var pe = ee(K, Q, F, q, G + "." + Q, n);
          if (pe)
            return pe;
        }
        return null;
      }
      return g(I);
    }
    function B(N) {
      function I(W, U, F, q, G) {
        var K = W[U], Y = X(K);
        if (Y !== "object")
          return new h("Invalid " + q + " `" + G + "` of type `" + Y + "` " + ("supplied to `" + F + "`, expected `object`."));
        var Q = t({}, W[U], N);
        for (var ee in Q) {
          var pe = N[ee];
          if (r(N, ee) && typeof pe != "function")
            return k(F, q, G, ee, ne(pe));
          if (!pe)
            return new h(
              "Invalid " + q + " `" + G + "` key `" + ee + "` supplied to `" + F + "`.\nBad object: " + JSON.stringify(W[U], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(N), null, "  ")
            );
          var A = pe(K, ee, F, q, G + "." + ee, n);
          if (A)
            return A;
        }
        return null;
      }
      return g(I);
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
          if (N === null || l(N))
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
    function ne(N) {
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
      var I = ne(N);
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
      return !N.constructor || !N.constructor.name ? s : N.constructor.name;
    }
    return m.checkPropTypes = o, m.resetWarningCache = o.resetWarningCache, m.PropTypes = m, m;
  }, Ur;
}
var Gr, xa;
function $d() {
  if (xa)
    return Gr;
  xa = 1;
  var e = No();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Gr = function() {
    function r(i, l, d, p, u, b) {
      if (b !== e) {
        var s = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw s.name = "Invariant Violation", s;
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
  }, Gr;
}
if (process.env.NODE_ENV !== "production") {
  var _d = Zi(), Id = !0;
  ro.exports = Pd()(_d.isElement, Id);
} else
  ro.exports = $d()();
var Ad = ro.exports;
const w = /* @__PURE__ */ Nd(Ad);
function Dd(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function es(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const d = a.type;
  return typeof d == "function" && !Dd(d) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ts = ko(w.element, es);
ts.isRequired = ko(w.element.isRequired, es);
const ns = ts, Md = "exact-prop: ​";
function Bd(e) {
  return process.env.NODE_ENV === "production" ? e : _({}, e, {
    [Md]: (t) => {
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
var oo = { exports: {} }, le = {};
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
function jd() {
  if (ka)
    return le;
  ka = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), s = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), f;
  f = Symbol.for("react.module.reference");
  function h(g) {
    if (typeof g == "object" && g !== null) {
      var y = g.$$typeof;
      switch (y) {
        case e:
          switch (g = g.type, g) {
            case n:
            case o:
            case r:
            case p:
            case u:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case i:
                case d:
                case s:
                case b:
                case a:
                  return g;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return le.ContextConsumer = i, le.ContextProvider = a, le.Element = e, le.ForwardRef = d, le.Fragment = n, le.Lazy = s, le.Memo = b, le.Portal = t, le.Profiler = o, le.StrictMode = r, le.Suspense = p, le.SuspenseList = u, le.isAsyncMode = function() {
    return !1;
  }, le.isConcurrentMode = function() {
    return !1;
  }, le.isContextConsumer = function(g) {
    return h(g) === i;
  }, le.isContextProvider = function(g) {
    return h(g) === a;
  }, le.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, le.isForwardRef = function(g) {
    return h(g) === d;
  }, le.isFragment = function(g) {
    return h(g) === n;
  }, le.isLazy = function(g) {
    return h(g) === s;
  }, le.isMemo = function(g) {
    return h(g) === b;
  }, le.isPortal = function(g) {
    return h(g) === t;
  }, le.isProfiler = function(g) {
    return h(g) === o;
  }, le.isStrictMode = function(g) {
    return h(g) === r;
  }, le.isSuspense = function(g) {
    return h(g) === p;
  }, le.isSuspenseList = function(g) {
    return h(g) === u;
  }, le.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === n || g === o || g === r || g === p || g === u || g === m || typeof g == "object" && g !== null && (g.$$typeof === s || g.$$typeof === b || g.$$typeof === a || g.$$typeof === i || g.$$typeof === d || g.$$typeof === f || g.getModuleId !== void 0);
  }, le.typeOf = h, le;
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
var Na;
function Vd() {
  return Na || (Na = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), d = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), s = Symbol.for("react.lazy"), m = Symbol.for("react.offscreen"), f = !1, h = !1, g = !1, y = !1, C = !1, T;
    T = Symbol.for("react.module.reference");
    function x(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === n || L === o || C || L === r || L === p || L === u || y || L === m || f || h || g || typeof L == "object" && L !== null && (L.$$typeof === s || L.$$typeof === b || L.$$typeof === a || L.$$typeof === i || L.$$typeof === d || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === T || L.getModuleId !== void 0));
    }
    function v(L) {
      if (typeof L == "object" && L !== null) {
        var xe = L.$$typeof;
        switch (xe) {
          case e:
            var ze = L.type;
            switch (ze) {
              case n:
              case o:
              case r:
              case p:
              case u:
                return ze;
              default:
                var ft = ze && ze.$$typeof;
                switch (ft) {
                  case l:
                  case i:
                  case d:
                  case s:
                  case b:
                  case a:
                    return ft;
                  default:
                    return xe;
                }
            }
          case t:
            return xe;
        }
      }
    }
    var O = i, P = a, V = e, S = d, $ = n, k = s, j = b, B = t, Z = o, J = r, X = p, ne = u, ae = !1, z = !1;
    function N(L) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function I(L) {
      return z || (z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(L) {
      return v(L) === i;
    }
    function U(L) {
      return v(L) === a;
    }
    function F(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function q(L) {
      return v(L) === d;
    }
    function G(L) {
      return v(L) === n;
    }
    function K(L) {
      return v(L) === s;
    }
    function Y(L) {
      return v(L) === b;
    }
    function Q(L) {
      return v(L) === t;
    }
    function ee(L) {
      return v(L) === o;
    }
    function pe(L) {
      return v(L) === r;
    }
    function A(L) {
      return v(L) === p;
    }
    function ke(L) {
      return v(L) === u;
    }
    ce.ContextConsumer = O, ce.ContextProvider = P, ce.Element = V, ce.ForwardRef = S, ce.Fragment = $, ce.Lazy = k, ce.Memo = j, ce.Portal = B, ce.Profiler = Z, ce.StrictMode = J, ce.Suspense = X, ce.SuspenseList = ne, ce.isAsyncMode = N, ce.isConcurrentMode = I, ce.isContextConsumer = W, ce.isContextProvider = U, ce.isElement = F, ce.isForwardRef = q, ce.isFragment = G, ce.isLazy = K, ce.isMemo = Y, ce.isPortal = Q, ce.isProfiler = ee, ce.isStrictMode = pe, ce.isSuspense = A, ce.isSuspenseList = ke, ce.isValidElementType = x, ce.typeOf = v;
  }()), ce;
}
process.env.NODE_ENV === "production" ? oo.exports = jd() : oo.exports = Vd();
var Ea = oo.exports;
const Ld = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function zd(e) {
  const t = `${e}`.match(Ld);
  return t && t[1] || "";
}
function rs(e, t = "") {
  return e.displayName || e.name || zd(e) || t;
}
function Ta(e, t, n) {
  const r = rs(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Fd(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return rs(e, "Component");
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
function Nn(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Ud = w.oneOfType([w.func, w.object]), os = Ud;
function Ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Gt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Gd(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Hd(e, t = 166) {
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
function Xd(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", d = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${d}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Wd(e, t) {
  var n, r;
  return /* @__PURE__ */ D.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Zn(e) {
  return e && e.ownerDocument || document;
}
function Yd(e) {
  return Zn(e).defaultView || window;
}
function qd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? _({}, t.propTypes) : null;
  return (o) => (a, i, l, d, p, ...u) => {
    const b = p || i, s = n == null ? void 0 : n[b];
    if (s) {
      const m = s(a, i, l, d, p, ...u);
      if (m)
        return m;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Qn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Kd = typeof window < "u" ? D.useLayoutEffect : D.useEffect, Ht = Kd;
let Sa = 0;
function Jd(e) {
  const [t, n] = D.useState(e), r = e || t;
  return D.useEffect(() => {
    t == null && (Sa += 1, n(`mui-${Sa}`));
  }, [t]), r;
}
const Ca = D["useId".toString()];
function as(e) {
  if (Ca !== void 0) {
    const t = Ca();
    return e ?? t;
  }
  return Jd(e);
}
function Zd(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function is({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = D.useRef(e !== void 0), [a, i] = D.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    D.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: p
    } = D.useRef(t);
    D.useEffect(() => {
      !o && p !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const d = D.useCallback((p) => {
    o || i(p);
  }, []);
  return [l, d];
}
function ao(e) {
  const t = D.useRef(e);
  return Ht(() => {
    t.current = e;
  }), D.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function St(...e) {
  return D.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Qn(n, t);
    });
  }, e);
}
const Oa = {};
function Qd(e, t) {
  const n = D.useRef(Oa);
  return n.current === Oa && (n.current = e(t)), n;
}
const ep = [];
function tp(e) {
  D.useEffect(e, ep);
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
function dn() {
  const e = Qd(Rn.create).current;
  return tp(e.disposeEffect), e;
}
let mr = !0, io = !1;
const np = new Rn(), rp = {
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
function op(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && rp[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function ap(e) {
  e.metaKey || e.altKey || e.ctrlKey || (mr = !0);
}
function Hr() {
  mr = !1;
}
function ip() {
  this.visibilityState === "hidden" && io && (mr = !0);
}
function sp(e) {
  e.addEventListener("keydown", ap, !0), e.addEventListener("mousedown", Hr, !0), e.addEventListener("pointerdown", Hr, !0), e.addEventListener("touchstart", Hr, !0), e.addEventListener("visibilitychange", ip, !0);
}
function lp(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return mr || op(t);
}
function ss() {
  const e = D.useCallback((o) => {
    o != null && sp(o.ownerDocument);
  }, []), t = D.useRef(!1);
  function n() {
    return t.current ? (io = !0, np.start(100, () => {
      io = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return lp(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function ls(e, t) {
  const n = _({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = _({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = _({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = ls(o[i], a[i]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function Eo(e, t, n = void 0) {
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
const Ra = (e) => e, cp = () => {
  let e = Ra;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ra;
    }
  };
}, dp = cp(), cs = dp, ds = {
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
function hr(e, t, n = "Mui") {
  const r = ds[t];
  return r ? `${n}-${r}` : `${cs.generate(e)}-${t}`;
}
function ps(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = hr(e, o, n);
  }), r;
}
function pp(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function Ne(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const up = ["values", "unit", "step"], fp = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => _({}, n, {
    [r.key]: r.val
  }), {});
};
function wp(e) {
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
  } = e, o = Ne(e, up), a = fp(t), i = Object.keys(a);
  function l(s) {
    return `@media (min-width:${typeof t[s] == "number" ? t[s] : s}${n})`;
  }
  function d(s) {
    return `@media (max-width:${(typeof t[s] == "number" ? t[s] : s) - r / 100}${n})`;
  }
  function p(s, m) {
    const f = i.indexOf(m);
    return `@media (min-width:${typeof t[s] == "number" ? t[s] : s}${n}) and (max-width:${(f !== -1 && typeof t[i[f]] == "number" ? t[i[f]] : m) - r / 100}${n})`;
  }
  function u(s) {
    return i.indexOf(s) + 1 < i.length ? p(s, i[i.indexOf(s) + 1]) : l(s);
  }
  function b(s) {
    const m = i.indexOf(s);
    return m === 0 ? l(i[1]) : m === i.length - 1 ? d(i[m]) : p(s, i[i.indexOf(s) + 1]).replace("@media", "@media not all and");
  }
  return _({
    keys: i,
    values: a,
    up: l,
    down: d,
    between: p,
    only: u,
    not: b,
    unit: n
  }, o);
}
const mp = {
  borderRadius: 4
}, hp = mp, gp = process.env.NODE_ENV !== "production" ? w.oneOfType([w.number, w.string, w.object, w.array]) : {}, pt = gp;
function mn(e, t) {
  return t ? Qe(e, t, {
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
function et(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Pa;
    return t.reduce((i, l, d) => (i[a.up(a.keys[d])] = n(t[d]), i), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || Pa;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || To).indexOf(l) !== -1) {
        const d = a.up(l);
        i[d] = n(t[l], l);
      } else {
        const d = l;
        i[d] = t[d];
      }
      return i;
    }, {});
  }
  return n(t);
}
function bp(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function vp(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function gr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function er(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = gr(e, n) || r, t && (o = t(o, r, e)), o;
}
function ye(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const l = i[t], d = i.theme, p = gr(d, r) || {};
    return et(i, l, (b) => {
      let s = er(p, o, b);
      return b === s && typeof b == "string" && (s = er(p, o, `${t}${b === "default" ? "" : Ye(b)}`, b)), n === !1 ? s : {
        [n]: s
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: pt
  } : {}, a.filterProps = [t], a;
}
function yp(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const xp = {
  m: "margin",
  p: "padding"
}, kp = {
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
}, Np = yp((e) => {
  if (e.length > 2)
    if ($a[e])
      e = $a[e];
    else
      return [e];
  const [t, n] = e.split(""), r = xp[t], o = kp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), br = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], vr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Ep = [...br, ...vr];
function Pn(e, t, n, r) {
  var o;
  const a = (o = gr(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function us(e) {
  return Pn(e, "spacing", 8, "spacing");
}
function $n(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Tp(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = $n(t, n), r), {});
}
function Sp(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Np(n), a = Tp(o, r), i = e[n];
  return et(e, i, a);
}
function fs(e, t) {
  const n = us(e.theme);
  return Object.keys(e).map((r) => Sp(e, t, r, n)).reduce(mn, {});
}
function he(e) {
  return fs(e, br);
}
he.propTypes = process.env.NODE_ENV !== "production" ? br.reduce((e, t) => (e[t] = pt, e), {}) : {};
he.filterProps = br;
function ge(e) {
  return fs(e, vr);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? vr.reduce((e, t) => (e[t] = pt, e), {}) : {};
ge.filterProps = vr;
process.env.NODE_ENV !== "production" && Ep.reduce((e, t) => (e[t] = pt, e), {});
function Cp(e = 8) {
  if (e.mui)
    return e;
  const t = us({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function yr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? mn(o, t[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Me(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Le(e, t) {
  return ye({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Op = Le("border", Me), Rp = Le("borderTop", Me), Pp = Le("borderRight", Me), $p = Le("borderBottom", Me), _p = Le("borderLeft", Me), Ip = Le("borderColor"), Ap = Le("borderTopColor"), Dp = Le("borderRightColor"), Mp = Le("borderBottomColor"), Bp = Le("borderLeftColor"), jp = Le("outline", Me), Vp = Le("outlineColor"), xr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Pn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: $n(t, r)
    });
    return et(e, e.borderRadius, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: pt
} : {};
xr.filterProps = ["borderRadius"];
yr(Op, Rp, Pp, $p, _p, Ip, Ap, Dp, Mp, Bp, xr, jp, Vp);
const kr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Pn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: $n(t, r)
    });
    return et(e, e.gap, n);
  }
  return null;
};
kr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: pt
} : {};
kr.filterProps = ["gap"];
const Nr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Pn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: $n(t, r)
    });
    return et(e, e.columnGap, n);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: pt
} : {};
Nr.filterProps = ["columnGap"];
const Er = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Pn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: $n(t, r)
    });
    return et(e, e.rowGap, n);
  }
  return null;
};
Er.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: pt
} : {};
Er.filterProps = ["rowGap"];
const Lp = ye({
  prop: "gridColumn"
}), zp = ye({
  prop: "gridRow"
}), Fp = ye({
  prop: "gridAutoFlow"
}), Up = ye({
  prop: "gridAutoColumns"
}), Gp = ye({
  prop: "gridAutoRows"
}), Hp = ye({
  prop: "gridTemplateColumns"
}), Xp = ye({
  prop: "gridTemplateRows"
}), Wp = ye({
  prop: "gridTemplateAreas"
}), Yp = ye({
  prop: "gridArea"
});
yr(kr, Nr, Er, Lp, zp, Fp, Up, Gp, Hp, Xp, Wp, Yp);
function Lt(e, t) {
  return t === "grey" ? t : e;
}
const qp = ye({
  prop: "color",
  themeKey: "palette",
  transform: Lt
}), Kp = ye({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Lt
}), Jp = ye({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Lt
});
yr(qp, Kp, Jp);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Zp = ye({
  prop: "width",
  transform: Ie
}), So = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || To[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ie(n)
      };
    };
    return et(e, e.maxWidth, t);
  }
  return null;
};
So.filterProps = ["maxWidth"];
const Qp = ye({
  prop: "minWidth",
  transform: Ie
}), eu = ye({
  prop: "height",
  transform: Ie
}), tu = ye({
  prop: "maxHeight",
  transform: Ie
}), nu = ye({
  prop: "minHeight",
  transform: Ie
});
ye({
  prop: "size",
  cssProperty: "width",
  transform: Ie
});
ye({
  prop: "size",
  cssProperty: "height",
  transform: Ie
});
const ru = ye({
  prop: "boxSizing"
});
yr(Zp, So, Qp, eu, tu, nu, ru);
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
    style: xr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Lt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Lt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Lt
  },
  // spacing
  p: {
    style: ge
  },
  pt: {
    style: ge
  },
  pr: {
    style: ge
  },
  pb: {
    style: ge
  },
  pl: {
    style: ge
  },
  px: {
    style: ge
  },
  py: {
    style: ge
  },
  padding: {
    style: ge
  },
  paddingTop: {
    style: ge
  },
  paddingRight: {
    style: ge
  },
  paddingBottom: {
    style: ge
  },
  paddingLeft: {
    style: ge
  },
  paddingX: {
    style: ge
  },
  paddingY: {
    style: ge
  },
  paddingInline: {
    style: ge
  },
  paddingInlineStart: {
    style: ge
  },
  paddingInlineEnd: {
    style: ge
  },
  paddingBlock: {
    style: ge
  },
  paddingBlockStart: {
    style: ge
  },
  paddingBlockEnd: {
    style: ge
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
    style: kr
  },
  rowGap: {
    style: Er
  },
  columnGap: {
    style: Nr
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
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function iu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function su() {
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
      cssProperty: d = n,
      themeKey: p,
      transform: u,
      style: b
    } = l;
    if (r == null)
      return null;
    if (p === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const s = gr(o, p) || {};
    return b ? b(i) : et(i, r, (f) => {
      let h = er(s, u, f);
      return f === h && typeof f == "string" && (h = er(s, u, `${n}${f === "default" ? "" : Ye(f)}`, f)), d === !1 ? h : {
        [d]: h
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
    const i = (r = a.unstable_sxConfig) != null ? r : Co;
    function l(d) {
      let p = d;
      if (typeof d == "function")
        p = d(a);
      else if (typeof d != "object")
        return d;
      if (!p)
        return null;
      const u = bp(a.breakpoints), b = Object.keys(u);
      let s = u;
      return Object.keys(p).forEach((m) => {
        const f = iu(p[m], a);
        if (f != null)
          if (typeof f == "object")
            if (i[m])
              s = mn(s, e(m, f, a, i));
            else {
              const h = et({
                theme: a
              }, f, (g) => ({
                [m]: g
              }));
              au(h, f) ? s[m] = t({
                sx: f,
                theme: a
              }) : s = mn(s, h);
            }
          else
            s = mn(s, e(m, f, a, i));
      }), vp(b, s);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const ws = su();
ws.filterProps = ["sx"];
const Oo = ws;
function lu(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const cu = ["breakpoints", "palette", "spacing", "shape"];
function Ro(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, i = Ne(e, cu), l = wp(n), d = Cp(o);
  let p = Qe({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: _({
      mode: "light"
    }, r),
    spacing: d,
    shape: _({}, hp, a)
  }, i);
  return p.applyStyles = lu, p = t.reduce((u, b) => Qe(u, b), p), p.unstable_sxConfig = _({}, Co, i == null ? void 0 : i.unstable_sxConfig), p.unstable_sx = function(b) {
    return Oo({
      sx: b,
      theme: this
    });
  }, p;
}
function du(e) {
  return Object.keys(e).length === 0;
}
function ms(e = null) {
  const t = D.useContext(rc);
  return !t || du(t) ? e : t;
}
const pu = Ro();
function hs(e = pu) {
  return ms(e);
}
const uu = ["ownerState"], fu = ["variants"], wu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function mu(e) {
  return Object.keys(e).length === 0;
}
function hu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Yn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const gu = Ro(), _a = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Fn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return mu(t) ? e : t[n] || t;
}
function bu(e) {
  return e ? (t, n) => n[e] : null;
}
function qn(e, t) {
  let {
    ownerState: n
  } = t, r = Ne(t, uu);
  const o = typeof e == "function" ? e(_({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => qn(a, _({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = Ne(o, fu);
    return a.forEach((d) => {
      let p = !0;
      typeof d.props == "function" ? p = d.props(_({
        ownerState: n
      }, r, n)) : Object.keys(d.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== d.props[u] && r[u] !== d.props[u] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof d.style == "function" ? d.style(_({
        ownerState: n
      }, r, n)) : d.style));
    }), l;
  }
  return o;
}
function vu(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = gu,
    rootShouldForwardProp: r = Yn,
    slotShouldForwardProp: o = Yn
  } = e, a = (i) => Oo(_({}, i, {
    theme: Fn(_({}, i, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    oc(i, (v) => v.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: d,
      slot: p,
      skipVariantsResolver: u,
      skipSx: b,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: s = bu(_a(p))
    } = l, m = Ne(l, wu), f = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), h = b || !1;
    let g;
    process.env.NODE_ENV !== "production" && d && (g = `${d}-${_a(p || "Root")}`);
    let y = Yn;
    p === "Root" || p === "root" ? y = r : p ? y = o : hu(i) && (y = void 0);
    const C = nc(i, _({
      shouldForwardProp: y,
      label: g
    }, m)), T = (v) => typeof v == "function" && v.__emotion_real !== v || yt(v) ? (O) => qn(v, _({}, O, {
      theme: Fn({
        theme: O.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : v, x = (v, ...O) => {
      let P = T(v);
      const V = O ? O.map(T) : [];
      d && s && V.push((k) => {
        const j = Fn(_({}, k, {
          defaultTheme: n,
          themeId: t
        }));
        if (!j.components || !j.components[d] || !j.components[d].styleOverrides)
          return null;
        const B = j.components[d].styleOverrides, Z = {};
        return Object.entries(B).forEach(([J, X]) => {
          Z[J] = qn(X, _({}, k, {
            theme: j
          }));
        }), s(k, Z);
      }), d && !f && V.push((k) => {
        var j;
        const B = Fn(_({}, k, {
          defaultTheme: n,
          themeId: t
        })), Z = B == null || (j = B.components) == null || (j = j[d]) == null ? void 0 : j.variants;
        return qn({
          variants: Z
        }, _({}, k, {
          theme: B
        }));
      }), h || V.push(a);
      const S = V.length - O.length;
      if (Array.isArray(v) && S > 0) {
        const k = new Array(S).fill("");
        P = [...v, ...k], P.raw = [...v.raw, ...k];
      }
      const $ = C(P, ...V);
      if (process.env.NODE_ENV !== "production") {
        let k;
        d && (k = `${d}${Ye(p || "")}`), k === void 0 && (k = `Styled(${Fd(i)})`), $.displayName = k;
      }
      return i.muiName && ($.muiName = i.muiName), $;
    };
    return C.withConfig && (x.withConfig = C.withConfig), x;
  };
}
function yu(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ls(t.components[n].defaultProps, r);
}
function xu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = hs(n);
  return r && (o = o[r] || o), yu({
    theme: o,
    name: t,
    props: e
  });
}
function Po(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), pp(e, t, n);
}
function ku(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ct(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ct(ku(e));
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
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Tr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Nu(e) {
  e = Ct(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), i = (p, u = (p + n / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const d = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", d.push(t[3])), Tr({
    type: l,
    values: d
  });
}
function Ia(e) {
  e = Ct(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ct(Nu(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Aa(e, t) {
  const n = Ia(e), r = Ia(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function gs(e, t) {
  return e = Ct(e), t = Po(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Tr(e);
}
function Eu(e, t) {
  if (e = Ct(e), t = Po(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Tr(e);
}
function Tu(e, t) {
  if (e = Ct(e), t = Po(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Tr(e);
}
function Su(e, t) {
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
  }, t);
}
const Cu = {
  black: "#000",
  white: "#fff"
}, En = Cu, Ou = {
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
}, It = Pu, $u = {
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
}, At = $u, _u = {
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
}, on = _u, Iu = {
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
}, Dt = Iu, Au = {
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
}, Mt = Au, Du = {
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
}, Bt = Du, Mu = ["mode", "contrastThreshold", "tonalOffset"], Da = {
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
}, Xr = {
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
function Ma(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Tu(e.main, o) : t === "dark" && (e.dark = Eu(e.main, a)));
}
function Bu(e = "light") {
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
function ju(e = "light") {
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
function Vu(e = "light") {
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
function Lu(e = "light") {
  return e === "dark" ? {
    main: Mt[400],
    light: Mt[300],
    dark: Mt[700]
  } : {
    main: Mt[700],
    light: Mt[500],
    dark: Mt[900]
  };
}
function zu(e = "light") {
  return e === "dark" ? {
    main: Bt[400],
    light: Bt[300],
    dark: Bt[700]
  } : {
    main: Bt[800],
    light: Bt[500],
    dark: Bt[900]
  };
}
function Fu(e = "light") {
  return e === "dark" ? {
    main: on[400],
    light: on[300],
    dark: on[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: on[500],
    dark: on[900]
  };
}
function Uu(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = Ne(e, Mu), a = e.primary || Bu(t), i = e.secondary || ju(t), l = e.error || Vu(t), d = e.info || Lu(t), p = e.success || zu(t), u = e.warning || Fu(t);
  function b(h) {
    const g = Aa(h, Xr.text.primary) >= n ? Xr.text.primary : Da.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = Aa(h, g);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${g} on ${h}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const s = ({
    color: h,
    name: g,
    mainShade: y = 500,
    lightShade: C = 300,
    darkShade: T = 700
  }) => {
    if (h = _({}, h), !h.main && h[y] && (h.main = h[y]), !h.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : Gt(11, g ? ` (${g})` : "", y));
    if (typeof h.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(h.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Gt(12, g ? ` (${g})` : "", JSON.stringify(h.main)));
    return Ma(h, "light", C, r), Ma(h, "dark", T, r), h.contrastText || (h.contrastText = b(h.main)), h;
  }, m = {
    dark: Xr,
    light: Da
  };
  return process.env.NODE_ENV !== "production" && (m[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Qe(_({
    // A collection of common colors.
    common: _({}, En),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: s({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: s({
      color: i,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: s({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: s({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: s({
      color: d,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: s({
      color: p,
      name: "success"
    }),
    // The grey colors.
    grey: Ru,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: b,
    // Generate a rich color object.
    augmentColor: s,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, m[t]), o);
}
const Gu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Hu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ba = {
  textTransform: "uppercase"
}, ja = '"Roboto", "Helvetica", "Arial", sans-serif';
function Xu(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = ja,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: d = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: p = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: b
  } = n, s = Ne(n, Gu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const m = o / 14, f = b || ((y) => `${y / p * m}rem`), h = (y, C, T, x, v) => _({
    fontFamily: r,
    fontWeight: y,
    fontSize: f(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: T
  }, r === ja ? {
    letterSpacing: `${Hu(x / C)}em`
  } : {}, v, u), g = {
    h1: h(a, 96, 1.167, -1.5),
    h2: h(a, 60, 1.2, -0.5),
    h3: h(i, 48, 1.167, 0),
    h4: h(i, 34, 1.235, 0.25),
    h5: h(i, 24, 1.334, 0),
    h6: h(l, 20, 1.6, 0.15),
    subtitle1: h(i, 16, 1.75, 0.15),
    subtitle2: h(l, 14, 1.57, 0.1),
    body1: h(i, 16, 1.5, 0.15),
    body2: h(i, 14, 1.43, 0.15),
    button: h(l, 14, 1.75, 0.4, Ba),
    caption: h(i, 12, 1.66, 0.4),
    overline: h(i, 12, 2.66, 1, Ba),
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
    htmlFontSize: p,
    pxToRem: f,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: d
  }, g), s, {
    clone: !1
    // No need to clone deep
  });
}
const Wu = 0.2, Yu = 0.14, qu = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wu})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Yu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qu})`].join(",");
}
const Ku = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ju = Ku, Zu = ["duration", "easing", "delay"], Qu = {
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
function tf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function nf(e) {
  const t = _({}, Qu, e.easing), n = _({}, ef, e.duration);
  return _({
    getAutoHeightDuration: tf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = t.easeInOut,
        delay: d = 0
      } = a, p = Ne(a, Zu);
      if (process.env.NODE_ENV !== "production") {
        const u = (s) => typeof s == "string", b = (s) => !isNaN(parseFloat(s));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !b(i) && !u(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !b(d) && !u(d) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof i == "string" ? i : Va(i)} ${l} ${typeof d == "string" ? d : Va(d)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const rf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, of = rf, af = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function sf(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = Ne(e, af);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Gt(18));
  const l = Uu(r), d = Ro(e);
  let p = Qe(d, {
    mixins: Su(d.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ju.slice(),
    typography: Xu(l, a),
    transitions: nf(o),
    zIndex: _({}, of)
  });
  if (p = Qe(p, i), p = t.reduce((u, b) => Qe(u, b), p), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], b = (s, m) => {
      let f;
      for (f in s) {
        const h = s[f];
        if (u.indexOf(f) !== -1 && Object.keys(h).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = hr("", f);
            console.error([`MUI: The \`${m}\` component increases the CSS specificity of the \`${f}\` internal state.`, "You can not override it like this: ", JSON.stringify(s, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: h
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          s[f] = {};
        }
      }
    };
    Object.keys(p.components).forEach((s) => {
      const m = p.components[s].styleOverrides;
      m && s.indexOf("Mui") === 0 && b(m, s);
    });
  }
  return p.unstable_sxConfig = _({}, Co, i == null ? void 0 : i.unstable_sxConfig), p.unstable_sx = function(b) {
    return Oo({
      sx: b,
      theme: this
    });
  }, p;
}
const lf = sf(), $o = lf, _o = "$$material";
function Io({
  props: e,
  name: t
}) {
  return xu({
    props: e,
    name: t,
    defaultTheme: $o,
    themeId: _o
  });
}
const cf = (e) => Yn(e) && e !== "classes", df = vu({
  themeId: _o,
  defaultTheme: $o,
  rootShouldForwardProp: cf
}), _n = df;
function pf(e) {
  return hr("MuiSvgIcon", e);
}
ps("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const uf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ff = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ye(t)}`, `fontSize${Ye(n)}`]
  };
  return Eo(o, pf, r);
}, wf = _n("svg", {
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
  var n, r, o, a, i, l, d, p, u, b, s, m, f;
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
      medium: ((l = e.typography) == null || (d = l.pxToRem) == null ? void 0 : d.call(l, 24)) || "1.5rem",
      large: ((p = e.typography) == null || (u = p.pxToRem) == null ? void 0 : u.call(p, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (b = (s = (e.vars || e).palette) == null || (s = s[t.color]) == null ? void 0 : s.main) != null ? b : {
      action: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.active,
      disabled: (f = (e.vars || e).palette) == null || (f = f.action) == null ? void 0 : f.disabled,
      inherit: void 0
    }[t.color]
  };
}), Ao = /* @__PURE__ */ D.forwardRef(function(t, n) {
  const r = Io({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: d = "medium",
    htmlColor: p,
    inheritViewBox: u = !1,
    titleAccess: b,
    viewBox: s = "0 0 24 24"
  } = r, m = Ne(r, uf), f = /* @__PURE__ */ D.isValidElement(o) && o.type === "svg", h = _({}, r, {
    color: i,
    component: l,
    fontSize: d,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: s,
    hasSvgAsChild: f
  }), g = {};
  u || (g.viewBox = s);
  const y = ff(h);
  return /* @__PURE__ */ E(wf, _({
    as: l,
    className: Nt(y.root, a),
    focusable: "false",
    color: p,
    "aria-hidden": b ? void 0 : !0,
    role: b ? "img" : void 0,
    ref: n
  }, g, m, f && o.props, {
    ownerState: h,
    children: [f ? o.props.children : o, b ? /* @__PURE__ */ c("title", {
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
  children: w.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: w.object,
  /**
   * @ignore
   */
  className: w.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: w.oneOfType([w.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), w.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: w.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: w.oneOfType([w.oneOf(["inherit", "large", "medium", "small"]), w.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: w.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: w.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: w.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: w.oneOfType([w.arrayOf(w.oneOfType([w.func, w.object, w.bool])), w.func, w.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: w.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: w.string
});
Ao.muiName = "SvgIcon";
const La = Ao;
function bs(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ c(La, _({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = La.muiName, /* @__PURE__ */ D.memo(/* @__PURE__ */ D.forwardRef(n));
}
const mf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), cs.configure(e);
  }
}, hf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ye,
  createChainedFunction: Gd,
  createSvgIcon: bs,
  debounce: Hd,
  deprecatedPropType: Xd,
  isMuiElement: Wd,
  ownerDocument: Zn,
  ownerWindow: Yd,
  requirePropFactory: qd,
  setRef: Qn,
  unstable_ClassNameGenerator: mf,
  unstable_useEnhancedEffect: Ht,
  unstable_useId: as,
  unsupportedProp: Zd,
  useControlled: is,
  useEventCallback: ao,
  useForkRef: St,
  useIsFocusVisible: ss
}, Symbol.toStringTag, { value: "Module" })), gf = /* @__PURE__ */ Ed(hf);
var za;
function bf() {
  return za || (za = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = gf;
  }(jr)), jr;
}
var vf = Td;
Object.defineProperty(xo, "__esModule", {
  value: !0
});
var vs = xo.default = void 0, yf = vf(bf()), xf = bl;
vs = xo.default = (0, yf.default)(/* @__PURE__ */ (0, xf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function kf(e) {
  return typeof e == "string";
}
function pn(e, t, n) {
  return e === void 0 || kf(e) ? t : _({}, t, {
    ownerState: _({}, t.ownerState, n)
  });
}
const Nf = {
  disableDefaultClasses: !1
}, Ef = /* @__PURE__ */ D.createContext(Nf);
function Tf(e) {
  const {
    disableDefaultClasses: t
  } = D.useContext(Ef);
  return (n) => t ? "" : e(n);
}
function Sf(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Cf(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Fa(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Of(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const m = Nt(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = _({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), h = _({}, n, o, r);
    return m.length > 0 && (h.className = m), Object.keys(f).length > 0 && (h.style = f), {
      props: h,
      internalRef: void 0
    };
  }
  const i = Sf(_({}, o, r)), l = Fa(r), d = Fa(o), p = t(i), u = Nt(p == null ? void 0 : p.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), b = _({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), s = _({}, p, n, d, l);
  return u.length > 0 && (s.className = u), Object.keys(b).length > 0 && (s.style = b), {
    props: s,
    internalRef: p.ref
  };
}
const Rf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Pf(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = Ne(e, Rf), l = a ? {} : Cf(r, o), {
    props: d,
    internalRef: p
  } = Of(_({}, i, {
    externalSlotProps: l
  })), u = St(p, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return pn(n, _({}, d, {
    ref: u
  }), o);
}
const ys = "base";
function $f(e) {
  return `${ys}--${e}`;
}
function _f(e, t) {
  return `${ys}-${e}-${t}`;
}
function xs(e, t) {
  const n = ds[t];
  return n ? $f(n) : _f(e, t);
}
function If(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = xs(e, r);
  }), n;
}
function Af(e) {
  return typeof e == "function" ? e() : e;
}
const tr = /* @__PURE__ */ D.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = D.useState(null), d = St(/* @__PURE__ */ D.isValidElement(r) ? r.ref : null, n);
  if (Ht(() => {
    a || l(Af(o) || document.body);
  }, [o, a]), Ht(() => {
    if (i && !a)
      return Qn(n, i), () => {
        Qn(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ D.isValidElement(r)) {
      const p = {
        ref: d
      };
      return /* @__PURE__ */ D.cloneElement(r, p);
    }
    return /* @__PURE__ */ c(D.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ c(D.Fragment, {
    children: i && /* @__PURE__ */ uc.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (tr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: w.node,
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
  container: w.oneOfType([Nn, w.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: w.bool
});
process.env.NODE_ENV !== "production" && (tr["propTypes"] = Bd(tr.propTypes));
var Ce = "top", je = "bottom", Ve = "right", Oe = "left", Do = "auto", In = [Ce, je, Ve, Oe], Xt = "start", Tn = "end", Df = "clippingParents", ks = "viewport", an = "popper", Mf = "reference", Ua = /* @__PURE__ */ In.reduce(function(e, t) {
  return e.concat([t + "-" + Xt, t + "-" + Tn]);
}, []), Ns = /* @__PURE__ */ [].concat(In, [Do]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Xt, t + "-" + Tn]);
}, []), Bf = "beforeRead", jf = "read", Vf = "afterRead", Lf = "beforeMain", zf = "main", Ff = "afterMain", Uf = "beforeWrite", Gf = "write", Hf = "afterWrite", Xf = [Bf, jf, Vf, Lf, zf, Ff, Uf, Gf, Hf];
function qe(e) {
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
function Ot(e) {
  var t = Ae(e).Element;
  return e instanceof t || e instanceof Element;
}
function Be(e) {
  var t = Ae(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Mo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ae(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Wf(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Be(a) || !qe(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Yf(e) {
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
      var o = t.elements[r], a = t.attributes[r] || {}, i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = i.reduce(function(d, p) {
        return d[p] = "", d;
      }, {});
      !Be(o) || !qe(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(d) {
        o.removeAttribute(d);
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
var Et = Math.max, nr = Math.min, Wt = Math.round;
function so() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Es() {
  return !/^((?!chrome|android).)*safari/i.test(so());
}
function Yt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && Wt(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Wt(r.height) / e.offsetHeight || 1);
  var i = Ot(e) ? Ae(e) : window, l = i.visualViewport, d = !Es() && n, p = (r.left + (d && l ? l.offsetLeft : 0)) / o, u = (r.top + (d && l ? l.offsetTop : 0)) / a, b = r.width / o, s = r.height / a;
  return {
    width: b,
    height: s,
    top: u,
    right: p + b,
    bottom: u + s,
    left: p,
    x: p,
    y: u
  };
}
function Bo(e) {
  var t = Yt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Ts(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Mo(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function tt(e) {
  return Ae(e).getComputedStyle(e);
}
function Kf(e) {
  return ["table", "td", "th"].indexOf(qe(e)) >= 0;
}
function ut(e) {
  return ((Ot(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Sr(e) {
  return qe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Mo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    ut(e)
  );
}
function Ga(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  tt(e).position === "fixed" ? null : e.offsetParent;
}
function Jf(e) {
  var t = /firefox/i.test(so()), n = /Trident/i.test(so());
  if (n && Be(e)) {
    var r = tt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Sr(e);
  for (Mo(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(qe(o)) < 0; ) {
    var a = tt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function An(e) {
  for (var t = Ae(e), n = Ga(e); n && Kf(n) && tt(n).position === "static"; )
    n = Ga(n);
  return n && (qe(n) === "html" || qe(n) === "body" && tt(n).position === "static") ? t : n || Jf(e) || t;
}
function jo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function hn(e, t, n) {
  return Et(e, nr(t, n));
}
function Zf(e, t, n) {
  var r = hn(e, t, n);
  return r > n ? n : r;
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
function Os(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Qf = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Cs(typeof t != "number" ? t : Os(t, In));
};
function ew(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = He(n.placement), d = jo(l), p = [Oe, Ve].indexOf(l) >= 0, u = p ? "height" : "width";
  if (!(!a || !i)) {
    var b = Qf(o.padding, n), s = Bo(a), m = d === "y" ? Ce : Oe, f = d === "y" ? je : Ve, h = n.rects.reference[u] + n.rects.reference[d] - i[d] - n.rects.popper[u], g = i[d] - n.rects.reference[d], y = An(a), C = y ? d === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, T = h / 2 - g / 2, x = b[m], v = C - s[u] - b[f], O = C / 2 - s[u] / 2 + T, P = hn(x, O, v), V = d;
    n.modifiersData[r] = (t = {}, t[V] = P, t.centerOffset = P - O, t);
  }
}
function tw(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Ts(t.elements.popper, o) && (t.elements.arrow = o));
}
const nw = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ew,
  effect: tw,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function qt(e) {
  return e.split("-")[1];
}
var rw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ow(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Wt(n * o) / o || 0,
    y: Wt(r * o) / o || 0
  };
}
function Ha(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, d = e.gpuAcceleration, p = e.adaptive, u = e.roundOffsets, b = e.isFixed, s = i.x, m = s === void 0 ? 0 : s, f = i.y, h = f === void 0 ? 0 : f, g = typeof u == "function" ? u({
    x: m,
    y: h
  }) : {
    x: m,
    y: h
  };
  m = g.x, h = g.y;
  var y = i.hasOwnProperty("x"), C = i.hasOwnProperty("y"), T = Oe, x = Ce, v = window;
  if (p) {
    var O = An(n), P = "clientHeight", V = "clientWidth";
    if (O === Ae(n) && (O = ut(n), tt(O).position !== "static" && l === "absolute" && (P = "scrollHeight", V = "scrollWidth")), O = O, o === Ce || (o === Oe || o === Ve) && a === Tn) {
      x = je;
      var S = b && O === v && v.visualViewport ? v.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[P]
      );
      h -= S - r.height, h *= d ? 1 : -1;
    }
    if (o === Oe || (o === Ce || o === je) && a === Tn) {
      T = Ve;
      var $ = b && O === v && v.visualViewport ? v.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[V]
      );
      m -= $ - r.width, m *= d ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, p && rw), j = u === !0 ? ow({
    x: m,
    y: h
  }, Ae(n)) : {
    x: m,
    y: h
  };
  if (m = j.x, h = j.y, d) {
    var B;
    return Object.assign({}, k, (B = {}, B[x] = C ? "0" : "", B[T] = y ? "0" : "", B.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + m + "px, " + h + "px)" : "translate3d(" + m + "px, " + h + "px, 0)", B));
  }
  return Object.assign({}, k, (t = {}, t[x] = C ? h + "px" : "", t[T] = y ? m + "px" : "", t.transform = "", t));
}
function aw(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, d = l === void 0 ? !0 : l, p = {
    placement: He(t.placement),
    variation: qt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ha(Object.assign({}, p, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: d
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ha(Object.assign({}, p, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: d
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const iw = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: aw,
  data: {}
};
var Un = {
  passive: !0
};
function sw(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, d = Ae(t.elements.popper), p = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && p.forEach(function(u) {
    u.addEventListener("scroll", n.update, Un);
  }), l && d.addEventListener("resize", n.update, Un), function() {
    a && p.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Un);
    }), l && d.removeEventListener("resize", n.update, Un);
  };
}
const lw = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: sw,
  data: {}
};
var cw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Kn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return cw[t];
  });
}
var dw = {
  start: "end",
  end: "start"
};
function Xa(e) {
  return e.replace(/start|end/g, function(t) {
    return dw[t];
  });
}
function Vo(e) {
  var t = Ae(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Lo(e) {
  return Yt(ut(e)).left + Vo(e).scrollLeft;
}
function pw(e, t) {
  var n = Ae(e), r = ut(e), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, d = 0;
  if (o) {
    a = o.width, i = o.height;
    var p = Es();
    (p || !p && t === "fixed") && (l = o.offsetLeft, d = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Lo(e),
    y: d
  };
}
function uw(e) {
  var t, n = ut(e), r = Vo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = Et(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Et(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Lo(e), d = -r.scrollTop;
  return tt(o || n).direction === "rtl" && (l += Et(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: d
  };
}
function zo(e) {
  var t = tt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Rs(e) {
  return ["html", "body", "#document"].indexOf(qe(e)) >= 0 ? e.ownerDocument.body : Be(e) && zo(e) ? e : Rs(Sr(e));
}
function gn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Rs(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Ae(r), i = o ? [a].concat(a.visualViewport || [], zo(r) ? r : []) : r, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(gn(Sr(i)))
  );
}
function lo(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function fw(e, t) {
  var n = Yt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Wa(e, t, n) {
  return t === ks ? lo(pw(e, n)) : Ot(t) ? fw(t, n) : lo(uw(ut(e)));
}
function ww(e) {
  var t = gn(Sr(e)), n = ["absolute", "fixed"].indexOf(tt(e).position) >= 0, r = n && Be(e) ? An(e) : e;
  return Ot(r) ? t.filter(function(o) {
    return Ot(o) && Ts(o, r) && qe(o) !== "body";
  }) : [];
}
function mw(e, t, n, r) {
  var o = t === "clippingParents" ? ww(e) : [].concat(t), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(d, p) {
    var u = Wa(e, p, r);
    return d.top = Et(u.top, d.top), d.right = nr(u.right, d.right), d.bottom = nr(u.bottom, d.bottom), d.left = Et(u.left, d.left), d;
  }, Wa(e, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ps(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? He(r) : null, a = r ? qt(r) : null, i = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, d;
  switch (o) {
    case Ce:
      d = {
        x: i,
        y: t.y - n.height
      };
      break;
    case je:
      d = {
        x: i,
        y: t.y + t.height
      };
      break;
    case Ve:
      d = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Oe:
      d = {
        x: t.x - n.width,
        y: l
      };
      break;
    default:
      d = {
        x: t.x,
        y: t.y
      };
  }
  var p = o ? jo(o) : null;
  if (p != null) {
    var u = p === "y" ? "height" : "width";
    switch (a) {
      case Xt:
        d[p] = d[p] - (t[u] / 2 - n[u] / 2);
        break;
      case Tn:
        d[p] = d[p] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return d;
}
function Sn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, i = a === void 0 ? e.strategy : a, l = n.boundary, d = l === void 0 ? Df : l, p = n.rootBoundary, u = p === void 0 ? ks : p, b = n.elementContext, s = b === void 0 ? an : b, m = n.altBoundary, f = m === void 0 ? !1 : m, h = n.padding, g = h === void 0 ? 0 : h, y = Cs(typeof g != "number" ? g : Os(g, In)), C = s === an ? Mf : an, T = e.rects.popper, x = e.elements[f ? C : s], v = mw(Ot(x) ? x : x.contextElement || ut(e.elements.popper), d, u, i), O = Yt(e.elements.reference), P = Ps({
    reference: O,
    element: T,
    strategy: "absolute",
    placement: o
  }), V = lo(Object.assign({}, T, P)), S = s === an ? V : O, $ = {
    top: v.top - S.top + y.top,
    bottom: S.bottom - v.bottom + y.bottom,
    left: v.left - S.left + y.left,
    right: S.right - v.right + y.right
  }, k = e.modifiersData.offset;
  if (s === an && k) {
    var j = k[o];
    Object.keys($).forEach(function(B) {
      var Z = [Ve, je].indexOf(B) >= 0 ? 1 : -1, J = [Ce, je].indexOf(B) >= 0 ? "y" : "x";
      $[B] += j[J] * Z;
    });
  }
  return $;
}
function hw(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, d = n.allowedAutoPlacements, p = d === void 0 ? Ns : d, u = qt(r), b = u ? l ? Ua : Ua.filter(function(f) {
    return qt(f) === u;
  }) : In, s = b.filter(function(f) {
    return p.indexOf(f) >= 0;
  });
  s.length === 0 && (s = b);
  var m = s.reduce(function(f, h) {
    return f[h] = Sn(e, {
      placement: h,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[He(h)], f;
  }, {});
  return Object.keys(m).sort(function(f, h) {
    return m[f] - m[h];
  });
}
function gw(e) {
  if (He(e) === Do)
    return [];
  var t = Kn(e);
  return [Xa(e), t, Xa(t)];
}
function bw(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, d = n.fallbackPlacements, p = n.padding, u = n.boundary, b = n.rootBoundary, s = n.altBoundary, m = n.flipVariations, f = m === void 0 ? !0 : m, h = n.allowedAutoPlacements, g = t.options.placement, y = He(g), C = y === g, T = d || (C || !f ? [Kn(g)] : gw(g)), x = [g].concat(T).reduce(function(F, q) {
      return F.concat(He(q) === Do ? hw(t, {
        placement: q,
        boundary: u,
        rootBoundary: b,
        padding: p,
        flipVariations: f,
        allowedAutoPlacements: h
      }) : q);
    }, []), v = t.rects.reference, O = t.rects.popper, P = /* @__PURE__ */ new Map(), V = !0, S = x[0], $ = 0; $ < x.length; $++) {
      var k = x[$], j = He(k), B = qt(k) === Xt, Z = [Ce, je].indexOf(j) >= 0, J = Z ? "width" : "height", X = Sn(t, {
        placement: k,
        boundary: u,
        rootBoundary: b,
        altBoundary: s,
        padding: p
      }), ne = Z ? B ? Ve : Oe : B ? je : Ce;
      v[J] > O[J] && (ne = Kn(ne));
      var ae = Kn(ne), z = [];
      if (a && z.push(X[j] <= 0), l && z.push(X[ne] <= 0, X[ae] <= 0), z.every(function(F) {
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
    t.placement !== S && (t.modifiersData[r]._skip = !0, t.placement = S, t.reset = !0);
  }
}
const vw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: bw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ya(e, t, n) {
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
function qa(e) {
  return [Ce, Ve, je, Oe].some(function(t) {
    return e[t] >= 0;
  });
}
function yw(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Sn(t, {
    elementContext: "reference"
  }), l = Sn(t, {
    altBoundary: !0
  }), d = Ya(i, r), p = Ya(l, o, a), u = qa(d), b = qa(p);
  t.modifiersData[n] = {
    referenceClippingOffsets: d,
    popperEscapeOffsets: p,
    isReferenceHidden: u,
    hasPopperEscaped: b
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": b
  });
}
const xw = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: yw
};
function kw(e, t, n) {
  var r = He(e), o = [Oe, Ce].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Oe, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Nw(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = Ns.reduce(function(u, b) {
    return u[b] = kw(b, t.rects, a), u;
  }, {}), l = i[t.placement], d = l.x, p = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += d, t.modifiersData.popperOffsets.y += p), t.modifiersData[r] = i;
}
const Ew = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Nw
};
function Tw(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Ps({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Sw = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Tw,
  data: {}
};
function Cw(e) {
  return e === "x" ? "y" : "x";
}
function Ow(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, d = n.boundary, p = n.rootBoundary, u = n.altBoundary, b = n.padding, s = n.tether, m = s === void 0 ? !0 : s, f = n.tetherOffset, h = f === void 0 ? 0 : f, g = Sn(t, {
    boundary: d,
    rootBoundary: p,
    padding: b,
    altBoundary: u
  }), y = He(t.placement), C = qt(t.placement), T = !C, x = jo(y), v = Cw(x), O = t.modifiersData.popperOffsets, P = t.rects.reference, V = t.rects.popper, S = typeof h == "function" ? h(Object.assign({}, t.rects, {
    placement: t.placement
  })) : h, $ = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, j = {
    x: 0,
    y: 0
  };
  if (O) {
    if (a) {
      var B, Z = x === "y" ? Ce : Oe, J = x === "y" ? je : Ve, X = x === "y" ? "height" : "width", ne = O[x], ae = ne + g[Z], z = ne - g[J], N = m ? -V[X] / 2 : 0, I = C === Xt ? P[X] : V[X], W = C === Xt ? -V[X] : -P[X], U = t.elements.arrow, F = m && U ? Bo(U) : {
        width: 0,
        height: 0
      }, q = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ss(), G = q[Z], K = q[J], Y = hn(0, P[X], F[X]), Q = T ? P[X] / 2 - N - Y - G - $.mainAxis : I - Y - G - $.mainAxis, ee = T ? -P[X] / 2 + N + Y + K + $.mainAxis : W + Y + K + $.mainAxis, pe = t.elements.arrow && An(t.elements.arrow), A = pe ? x === "y" ? pe.clientTop || 0 : pe.clientLeft || 0 : 0, ke = (B = k == null ? void 0 : k[x]) != null ? B : 0, L = ne + Q - ke - A, xe = ne + ee - ke, ze = hn(m ? nr(ae, L) : ae, ne, m ? Et(z, xe) : z);
      O[x] = ze, j[x] = ze - ne;
    }
    if (l) {
      var ft, Ee = x === "x" ? Ce : Oe, Mn = x === "x" ? je : Ve, Fe = O[v], Rt = v === "y" ? "height" : "width", wt = Fe + g[Ee], Pt = Fe - g[Mn], $t = [Ce, Oe].indexOf(y) !== -1, _t = (ft = k == null ? void 0 : k[v]) != null ? ft : 0, mt = $t ? wt : Fe - P[Rt] - V[Rt] - _t + $.altAxis, Jt = $t ? Fe + P[Rt] + V[Rt] - _t - $.altAxis : Pt, Bn = m && $t ? Zf(mt, Fe, Jt) : hn(m ? mt : wt, Fe, m ? Jt : Pt);
      O[v] = Bn, j[v] = Bn - Fe;
    }
    t.modifiersData[r] = j;
  }
}
const Rw = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ow,
  requiresIfExists: ["offset"]
};
function Pw(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function $w(e) {
  return e === Ae(e) || !Be(e) ? Vo(e) : Pw(e);
}
function _w(e) {
  var t = e.getBoundingClientRect(), n = Wt(t.width) / e.offsetWidth || 1, r = Wt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Iw(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && _w(t), a = ut(t), i = Yt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, d = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((qe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  zo(a)) && (l = $w(t)), Be(t) ? (d = Yt(t, !0), d.x += t.clientLeft, d.y += t.clientTop) : a && (d.x = Lo(a))), {
    x: i.left + l.scrollLeft - d.x,
    y: i.top + l.scrollTop - d.y,
    width: i.width,
    height: i.height
  };
}
function Aw(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
      if (!n.has(l)) {
        var d = t.get(l);
        d && o(d);
      }
    }), r.push(a);
  }
  return e.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function Dw(e) {
  var t = Aw(e);
  return Xf.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Mw(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Bw(e) {
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
var Ka = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ja() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function jw(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? Ka : o;
  return function(l, d, p) {
    p === void 0 && (p = a);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ka, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: d
      },
      attributes: {},
      styles: {}
    }, b = [], s = !1, m = {
      state: u,
      setOptions: function(y) {
        var C = typeof y == "function" ? y(u.options) : y;
        h(), u.options = Object.assign({}, a, u.options, C), u.scrollParents = {
          reference: Ot(l) ? gn(l) : l.contextElement ? gn(l.contextElement) : [],
          popper: gn(d)
        };
        var T = Dw(Bw([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = T.filter(function(x) {
          return x.enabled;
        }), f(), m.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!s) {
          var y = u.elements, C = y.reference, T = y.popper;
          if (Ja(C, T)) {
            u.rects = {
              reference: Iw(C, An(T), u.options.strategy === "fixed"),
              popper: Bo(T)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function($) {
              return u.modifiersData[$.name] = Object.assign({}, $.data);
            });
            for (var x = 0; x < u.orderedModifiers.length; x++) {
              if (u.reset === !0) {
                u.reset = !1, x = -1;
                continue;
              }
              var v = u.orderedModifiers[x], O = v.fn, P = v.options, V = P === void 0 ? {} : P, S = v.name;
              typeof O == "function" && (u = O({
                state: u,
                options: V,
                name: S,
                instance: m
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Mw(function() {
        return new Promise(function(g) {
          m.forceUpdate(), g(u);
        });
      }),
      destroy: function() {
        h(), s = !0;
      }
    };
    if (!Ja(l, d))
      return m;
    m.setOptions(p).then(function(g) {
      !s && p.onFirstUpdate && p.onFirstUpdate(g);
    });
    function f() {
      u.orderedModifiers.forEach(function(g) {
        var y = g.name, C = g.options, T = C === void 0 ? {} : C, x = g.effect;
        if (typeof x == "function") {
          var v = x({
            state: u,
            name: y,
            instance: m,
            options: T
          }), O = function() {
          };
          b.push(v || O);
        }
      });
    }
    function h() {
      b.forEach(function(g) {
        return g();
      }), b = [];
    }
    return m;
  };
}
var Vw = [lw, Sw, iw, qf, Ew, vw, Rw, nw, xw], Lw = /* @__PURE__ */ jw({
  defaultModifiers: Vw
});
const $s = "Popper";
function zw(e) {
  return xs($s, e);
}
If($s, ["root"]);
const Fw = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Uw = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Gw(e, t) {
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
function rr(e) {
  return typeof e == "function" ? e() : e;
}
function Cr(e) {
  return e.nodeType !== void 0;
}
function Hw(e) {
  return !Cr(e);
}
const Xw = () => Eo({
  root: ["root"]
}, Tf(zw)), Ww = {}, Yw = /* @__PURE__ */ D.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: d,
    open: p,
    placement: u,
    popperOptions: b,
    popperRef: s,
    slotProps: m = {},
    slots: f = {},
    TransitionProps: h
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, g = Ne(t, Fw), y = D.useRef(null), C = St(y, n), T = D.useRef(null), x = St(T, s), v = D.useRef(x);
  Ht(() => {
    v.current = x;
  }, [x]), D.useImperativeHandle(s, () => T.current, []);
  const O = Gw(u, i), [P, V] = D.useState(O), [S, $] = D.useState(rr(o));
  D.useEffect(() => {
    T.current && T.current.forceUpdate();
  }), D.useEffect(() => {
    o && $(rr(o));
  }, [o]), Ht(() => {
    if (!S || !p)
      return;
    const J = (ae) => {
      V(ae.placement);
    };
    if (process.env.NODE_ENV !== "production" && S && Cr(S) && S.nodeType === 1) {
      const ae = S.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ae.top === 0 && ae.left === 0 && ae.right === 0 && ae.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let X = [{
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
        state: ae
      }) => {
        J(ae);
      }
    }];
    d != null && (X = X.concat(d)), b && b.modifiers != null && (X = X.concat(b.modifiers));
    const ne = Lw(S, y.current, _({
      placement: O
    }, b, {
      modifiers: X
    }));
    return v.current(ne), () => {
      ne.destroy(), v.current(null);
    };
  }, [S, l, d, p, b, O]);
  const k = {
    placement: P
  };
  h !== null && (k.TransitionProps = h);
  const j = Xw(), B = (r = f.root) != null ? r : "div", Z = Pf({
    elementType: B,
    externalSlotProps: m.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: C
    },
    ownerState: t,
    className: j.root
  });
  return /* @__PURE__ */ c(B, _({}, Z, {
    children: typeof a == "function" ? a(k) : a
  }));
}), _s = /* @__PURE__ */ D.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: d = !1,
    modifiers: p,
    open: u,
    placement: b = "bottom",
    popperOptions: s = Ww,
    popperRef: m,
    style: f,
    transition: h = !1,
    slotProps: g = {},
    slots: y = {}
  } = t, C = Ne(t, Uw), [T, x] = D.useState(!0), v = () => {
    x(!1);
  }, O = () => {
    x(!0);
  };
  if (!d && !u && (!h || T))
    return null;
  let P;
  if (a)
    P = a;
  else if (r) {
    const $ = rr(r);
    P = $ && Cr($) ? Zn($).body : Zn(null).body;
  }
  const V = !u && d && (!h || T) ? "none" : void 0, S = h ? {
    in: u,
    onEnter: v,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ c(tr, {
    disablePortal: l,
    container: P,
    children: /* @__PURE__ */ c(Yw, _({
      anchorEl: r,
      direction: i,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: h ? !T : u,
      placement: b,
      popperOptions: s,
      popperRef: m,
      slotProps: g,
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
  anchorEl: ko(w.oneOfType([Nn, w.object, w.func]), (e) => {
    if (e.open) {
      const t = rr(e.anchorEl);
      if (t && Cr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Hw(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: w.oneOfType([w.node, w.func]),
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
  container: w.oneOfType([Nn, w.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: w.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: w.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: w.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: w.arrayOf(w.shape({
    data: w.object,
    effect: w.func,
    enabled: w.bool,
    fn: w.func,
    name: w.any,
    options: w.object,
    phase: w.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: w.arrayOf(w.string),
    requiresIfExists: w.arrayOf(w.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: w.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: w.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: w.shape({
    modifiers: w.array,
    onFirstUpdate: w.func,
    placement: w.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: w.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: os,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: w.shape({
    root: w.oneOfType([w.func, w.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: w.shape({
    root: w.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: w.bool
});
function Is() {
  const e = hs($o);
  return process.env.NODE_ENV !== "production" && D.useDebugValue(e), e[_o] || e;
}
function co(e, t) {
  return co = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, co(e, t);
}
function qw(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, co(e, t);
}
const Za = {
  disabled: !1
};
var Kw = process.env.NODE_ENV !== "production" ? w.oneOfType([w.number, w.shape({
  enter: w.number,
  exit: w.number,
  appear: w.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && w.oneOfType([w.string, w.shape({
  enter: w.string,
  exit: w.string,
  active: w.string
}), w.shape({
  enter: w.string,
  enterDone: w.string,
  enterActive: w.string,
  exit: w.string,
  exitDone: w.string,
  exitActive: w.string
})]);
const As = M.createContext(null);
var Jw = function(t) {
  return t.scrollTop;
}, un = "unmounted", bt = "exited", vt = "entering", Vt = "entered", po = "exiting", nt = /* @__PURE__ */ function(e) {
  qw(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var i = o, l = i && !i.isMounting ? r.enter : r.appear, d;
    return a.appearStatus = null, r.in ? l ? (d = bt, a.appearStatus = vt) : d = Vt : r.unmountOnExit || r.mountOnEnter ? d = un : d = bt, a.state = {
      status: d
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === un ? {
      status: bt
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== vt && i !== Vt && (a = vt) : (i === vt || i === Vt) && (a = po);
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
      if (this.cancelNextCallback(), a === vt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Ln.findDOMNode(this);
          i && Jw(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === bt && this.setState({
        status: un
      });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, d = this.props.nodeRef ? [l] : [Ln.findDOMNode(this), l], p = d[0], u = d[1], b = this.getTimeouts(), s = l ? b.appear : b.enter;
    if (!o && !i || Za.disabled) {
      this.safeSetState({
        status: Vt
      }, function() {
        a.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, u), this.safeSetState({
      status: vt
    }, function() {
      a.props.onEntering(p, u), a.onTransitionEnd(s, function() {
        a.safeSetState({
          status: Vt
        }, function() {
          a.props.onEntered(p, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Ln.findDOMNode(this);
    if (!a || Za.disabled) {
      this.safeSetState({
        status: bt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: po
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: bt
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Ln.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var d = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], p = d[0], u = d[1];
      this.props.addEndListener(p, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === un)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = Ne(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ M.createElement(As.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : M.cloneElement(M.Children.only(i), l))
    );
  }, t;
}(M.Component);
nt.contextType = As;
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
  nodeRef: w.shape({
    current: typeof Element > "u" ? w.any : function(e, t, n, r, o, a) {
      var i = e[t];
      return w.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, a);
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
  children: w.oneOfType([w.func.isRequired, w.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: w.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: w.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: w.bool,
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
  appear: w.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: w.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: w.bool,
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
    var n = Kw;
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
  addEndListener: w.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: w.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: w.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: w.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: w.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: w.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: w.func
} : {};
function jt() {
}
nt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: jt,
  onEntering: jt,
  onEntered: jt,
  onExit: jt,
  onExiting: jt,
  onExited: jt
};
nt.UNMOUNTED = un;
nt.EXITED = bt;
nt.ENTERING = vt;
nt.ENTERED = Vt;
nt.EXITING = po;
const Zw = nt, Qw = (e) => e.scrollTop;
function Qa(e, t) {
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
const em = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function uo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const tm = {
  entering: {
    opacity: 1,
    transform: uo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Wr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Fo = /* @__PURE__ */ D.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: d,
    onEntered: p,
    onEntering: u,
    onExit: b,
    onExited: s,
    onExiting: m,
    style: f,
    timeout: h = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = Zw
  } = t, y = Ne(t, em), C = dn(), T = D.useRef(), x = Is(), v = D.useRef(null), O = St(v, a.ref, n), P = (J) => (X) => {
    if (J) {
      const ne = v.current;
      X === void 0 ? J(ne) : J(ne, X);
    }
  }, V = P(u), S = P((J, X) => {
    Qw(J);
    const {
      duration: ne,
      delay: ae,
      easing: z
    } = Qa({
      style: f,
      timeout: h,
      easing: i
    }, {
      mode: "enter"
    });
    let N;
    h === "auto" ? (N = x.transitions.getAutoHeightDuration(J.clientHeight), T.current = N) : N = ne, J.style.transition = [x.transitions.create("opacity", {
      duration: N,
      delay: ae
    }), x.transitions.create("transform", {
      duration: Wr ? N : N * 0.666,
      delay: ae,
      easing: z
    })].join(","), d && d(J, X);
  }), $ = P(p), k = P(m), j = P((J) => {
    const {
      duration: X,
      delay: ne,
      easing: ae
    } = Qa({
      style: f,
      timeout: h,
      easing: i
    }, {
      mode: "exit"
    });
    let z;
    h === "auto" ? (z = x.transitions.getAutoHeightDuration(J.clientHeight), T.current = z) : z = X, J.style.transition = [x.transitions.create("opacity", {
      duration: z,
      delay: ne
    }), x.transitions.create("transform", {
      duration: Wr ? z : z * 0.666,
      delay: Wr ? ne : ne || z * 0.333,
      easing: ae
    })].join(","), J.style.opacity = 0, J.style.transform = uo(0.75), b && b(J);
  }), B = P(s);
  return /* @__PURE__ */ c(g, _({
    appear: o,
    in: l,
    nodeRef: v,
    onEnter: S,
    onEntered: $,
    onEntering: V,
    onExit: j,
    onExited: B,
    onExiting: k,
    addEndListener: (J) => {
      h === "auto" && C.start(T.current || 0, J), r && r(v.current, J);
    },
    timeout: h === "auto" ? null : h
  }, y, {
    children: (J, X) => /* @__PURE__ */ D.cloneElement(a, _({
      style: _({
        opacity: 0,
        transform: uo(0.75),
        visibility: J === "exited" && !l ? "hidden" : void 0
      }, tm[J], f, a.props.style),
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
  addEndListener: w.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: w.bool,
  /**
   * A single child content element.
   */
  children: ns.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: w.oneOfType([w.shape({
    enter: w.string,
    exit: w.string
  }), w.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: w.bool,
  /**
   * @ignore
   */
  onEnter: w.func,
  /**
   * @ignore
   */
  onEntered: w.func,
  /**
   * @ignore
   */
  onEntering: w.func,
  /**
   * @ignore
   */
  onExit: w.func,
  /**
   * @ignore
   */
  onExited: w.func,
  /**
   * @ignore
   */
  onExiting: w.func,
  /**
   * @ignore
   */
  style: w.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: w.oneOfType([w.oneOf(["auto"]), w.number, w.shape({
    appear: w.number,
    enter: w.number,
    exit: w.number
  })])
});
Fo.muiSupportAuto = !0;
const ei = Fo, nm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], rm = _n(_s, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ds = /* @__PURE__ */ D.forwardRef(function(t, n) {
  var r;
  const o = ms(), a = Io({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: d,
    componentsProps: p,
    container: u,
    disablePortal: b,
    keepMounted: s,
    modifiers: m,
    open: f,
    placement: h,
    popperOptions: g,
    popperRef: y,
    transition: C,
    slots: T,
    slotProps: x
  } = a, v = Ne(a, nm), O = (r = T == null ? void 0 : T.root) != null ? r : d == null ? void 0 : d.Root, P = _({
    anchorEl: i,
    container: u,
    disablePortal: b,
    keepMounted: s,
    modifiers: m,
    open: f,
    placement: h,
    popperOptions: g,
    popperRef: y,
    transition: C
  }, v);
  return /* @__PURE__ */ c(rm, _({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: x ?? p
  }, P, {
    ref: n
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
  anchorEl: w.oneOfType([Nn, w.object, w.func]),
  /**
   * Popper render function or node.
   */
  children: w.oneOfType([w.node, w.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: w.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: w.shape({
    Root: w.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: w.shape({
    root: w.oneOfType([w.func, w.object])
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
  container: w.oneOfType([Nn, w.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: w.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: w.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: w.arrayOf(w.shape({
    data: w.object,
    effect: w.func,
    enabled: w.bool,
    fn: w.func,
    name: w.any,
    options: w.object,
    phase: w.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: w.arrayOf(w.string),
    requiresIfExists: w.arrayOf(w.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: w.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: w.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: w.shape({
    modifiers: w.array,
    onFirstUpdate: w.func,
    placement: w.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: w.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: os,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: w.shape({
    root: w.oneOfType([w.func, w.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: w.shape({
    root: w.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: w.oneOfType([w.arrayOf(w.oneOfType([w.func, w.object, w.bool])), w.func, w.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: w.bool
});
const Ms = Ds;
function om(e) {
  return hr("MuiTooltip", e);
}
const am = ps("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), st = am, im = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function sm(e) {
  return Math.round(e * 1e5) / 1e5;
}
const lm = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ye(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Eo(i, om, t);
}, cm = _n(Ms, {
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
}) => _({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${st.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${st.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${st.arrow}`]: _({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${st.arrow}`]: _({}, t.isRtl ? {
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
})), dm = _n("div", {
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
}) => _({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : gs(e.palette.grey[700], 0.92),
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
  lineHeight: `${sm(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${st.popper}[data-popper-placement*="left"] &`]: _({
    transformOrigin: "right center"
  }, t.isRtl ? _({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : _({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${st.popper}[data-popper-placement*="right"] &`]: _({
    transformOrigin: "left center"
  }, t.isRtl ? _({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : _({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${st.popper}[data-popper-placement*="top"] &`]: _({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${st.popper}[data-popper-placement*="bottom"] &`]: _({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), pm = _n("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : gs(e.palette.grey[700], 0.9),
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
let Gn = !1;
const ti = new Rn();
let sn = {
  x: 0,
  y: 0
};
function Hn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Bs = /* @__PURE__ */ D.forwardRef(function(t, n) {
  var r, o, a, i, l, d, p, u, b, s, m, f, h, g, y, C, T, x, v;
  const O = Io({
    props: t,
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
    enterNextDelay: ne = 0,
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
    title: pe,
    TransitionComponent: A = ei,
    TransitionProps: ke
  } = O, L = Ne(O, im), xe = /* @__PURE__ */ D.isValidElement(V) ? V : /* @__PURE__ */ c("span", {
    children: V
  }), ze = Is(), ft = ze.direction === "rtl", [Ee, Mn] = D.useState(), [Fe, Rt] = D.useState(null), wt = D.useRef(!1), Pt = Z || z, $t = dn(), _t = dn(), mt = dn(), Jt = dn(), [Bn, Ho] = is({
    controlled: q,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ke = Bn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: te
    } = D.useRef(q !== void 0);
    D.useEffect(() => {
      Ee && Ee.disabled && !te && pe !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [pe, Ee, te]);
  }
  const Rr = as(N), Zt = D.useRef(), jn = ao(() => {
    Zt.current !== void 0 && (document.body.style.WebkitUserSelect = Zt.current, Zt.current = void 0), Jt.clear();
  });
  D.useEffect(() => jn, [jn]);
  const Xo = (te) => {
    ti.clear(), Gn = !0, Ho(!0), F && !Ke && F(te);
  }, Vn = ao(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (te) => {
      ti.start(800 + I, () => {
        Gn = !1;
      }), Ho(!1), U && Ke && U(te), $t.start(ze.transitions.duration.shortest, () => {
        wt.current = !1;
      });
    }
  ), Pr = (te) => {
    wt.current && te.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), _t.clear(), mt.clear(), X || Gn && ne ? _t.start(Gn ? ne : X, () => {
      Xo(te);
    }) : Xo(te));
  }, Wo = (te) => {
    _t.clear(), mt.start(I, () => {
      Vn(te);
    });
  }, {
    isFocusVisibleRef: Yo,
    onBlur: il,
    onFocus: sl,
    ref: ll
  } = ss(), [, qo] = D.useState(!1), Ko = (te) => {
    il(te), Yo.current === !1 && (qo(!1), Wo(te));
  }, Jo = (te) => {
    Ee || Mn(te.currentTarget), sl(te), Yo.current === !0 && (qo(!0), Pr(te));
  }, Zo = (te) => {
    wt.current = !0;
    const $e = xe.props;
    $e.onTouchStart && $e.onTouchStart(te);
  }, Qo = Pr, ea = Wo, cl = (te) => {
    Zo(te), mt.clear(), $t.clear(), jn(), Zt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Jt.start(ae, () => {
      document.body.style.WebkitUserSelect = Zt.current, Pr(te);
    });
  }, dl = (te) => {
    xe.props.onTouchEnd && xe.props.onTouchEnd(te), jn(), mt.start(W, () => {
      Vn(te);
    });
  };
  D.useEffect(() => {
    if (!Ke)
      return;
    function te($e) {
      ($e.key === "Escape" || $e.key === "Esc") && Vn($e);
    }
    return document.addEventListener("keydown", te), () => {
      document.removeEventListener("keydown", te);
    };
  }, [Vn, Ke]);
  const pl = St(xe.ref, ll, Mn, n);
  !pe && pe !== 0 && (Ke = !1);
  const $r = D.useRef(), ul = (te) => {
    const $e = xe.props;
    $e.onMouseMove && $e.onMouseMove(te), sn = {
      x: te.clientX,
      y: te.clientY
    }, $r.current && $r.current.update();
  }, Qt = {}, _r = typeof pe == "string";
  k ? (Qt.title = !Ke && _r && !B ? pe : null, Qt["aria-describedby"] = Ke ? Rr : null) : (Qt["aria-label"] = _r ? pe : null, Qt["aria-labelledby"] = Ke && !_r ? Rr : null);
  const De = _({}, Qt, L, xe.props, {
    className: Nt(L.className, xe.props.className),
    onTouchStart: Zo,
    ref: pl
  }, z ? {
    onMouseMove: ul
  } : {});
  process.env.NODE_ENV !== "production" && (De["data-mui-internal-clone-element"] = !0, D.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const en = {};
  J || (De.onTouchStart = cl, De.onTouchEnd = dl), B || (De.onMouseOver = Hn(Qo, De.onMouseOver), De.onMouseLeave = Hn(ea, De.onMouseLeave), Pt || (en.onMouseOver = Qo, en.onMouseLeave = ea)), j || (De.onFocus = Hn(Jo, De.onFocus), De.onBlur = Hn(Ko, De.onBlur), Pt || (en.onFocus = Jo, en.onBlur = Ko)), process.env.NODE_ENV !== "production" && xe.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));
  const fl = D.useMemo(() => {
    var te;
    let $e = [{
      name: "arrow",
      enabled: !!Fe,
      options: {
        element: Fe,
        padding: 4
      }
    }];
    return (te = Y.popperOptions) != null && te.modifiers && ($e = $e.concat(Y.popperOptions.modifiers)), _({}, Y.popperOptions, {
      modifiers: $e
    });
  }, [Fe, Y]), tn = _({}, O, {
    isRtl: ft,
    arrow: P,
    disableInteractive: Pt,
    placement: G,
    PopperComponentProp: K,
    touch: wt.current
  }), Ir = lm(tn), ta = (r = (o = ee.popper) != null ? o : S.Popper) != null ? r : cm, na = (a = (i = (l = ee.transition) != null ? l : S.Transition) != null ? i : A) != null ? a : ei, ra = (d = (p = ee.tooltip) != null ? p : S.Tooltip) != null ? d : dm, oa = (u = (b = ee.arrow) != null ? b : S.Arrow) != null ? u : pm, wl = pn(ta, _({}, Y, (s = Q.popper) != null ? s : $.popper, {
    className: Nt(Ir.popper, Y == null ? void 0 : Y.className, (m = (f = Q.popper) != null ? f : $.popper) == null ? void 0 : m.className)
  }), tn), ml = pn(na, _({}, ke, (h = Q.transition) != null ? h : $.transition), tn), hl = pn(ra, _({}, (g = Q.tooltip) != null ? g : $.tooltip, {
    className: Nt(Ir.tooltip, (y = (C = Q.tooltip) != null ? C : $.tooltip) == null ? void 0 : y.className)
  }), tn), gl = pn(oa, _({}, (T = Q.arrow) != null ? T : $.arrow, {
    className: Nt(Ir.arrow, (x = (v = Q.arrow) != null ? v : $.arrow) == null ? void 0 : x.className)
  }), tn);
  return /* @__PURE__ */ E(D.Fragment, {
    children: [/* @__PURE__ */ D.cloneElement(xe, De), /* @__PURE__ */ c(ta, _({
      as: K ?? Ms,
      placement: G,
      anchorEl: z ? {
        getBoundingClientRect: () => ({
          top: sn.y,
          left: sn.x,
          right: sn.x,
          bottom: sn.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: $r,
      open: Ee ? Ke : !1,
      id: Rr,
      transition: !0
    }, en, wl, {
      popperOptions: fl,
      children: ({
        TransitionProps: te
      }) => /* @__PURE__ */ c(na, _({
        timeout: ze.transitions.duration.shorter
      }, te, ml, {
        children: /* @__PURE__ */ E(ra, _({}, hl, {
          children: [pe, P ? /* @__PURE__ */ c(oa, _({}, gl, {
            ref: Rt
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
  arrow: w.bool,
  /**
   * Tooltip reference element.
   */
  children: ns.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: w.object,
  /**
   * @ignore
   */
  className: w.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: w.shape({
    Arrow: w.elementType,
    Popper: w.elementType,
    Tooltip: w.elementType,
    Transition: w.elementType
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
  componentsProps: w.shape({
    arrow: w.object,
    popper: w.object,
    tooltip: w.object,
    transition: w.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: w.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: w.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: w.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: w.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: w.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: w.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: w.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: w.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: w.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: w.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: w.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: w.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: w.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: w.func,
  /**
   * If `true`, the component is shown.
   */
  open: w.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: w.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: w.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: w.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: w.shape({
    arrow: w.object,
    popper: w.object,
    tooltip: w.object,
    transition: w.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: w.shape({
    arrow: w.elementType,
    popper: w.elementType,
    tooltip: w.elementType,
    transition: w.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: w.oneOfType([w.arrayOf(w.oneOfType([w.func, w.object, w.bool])), w.func, w.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: w.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: w.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: w.object
});
const um = Bs;
function ni(e, t, n) {
  return e ? /* @__PURE__ */ c(vi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ c("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function js(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: d,
    isDisabled: p = !1,
    isDense: u = !0,
    isSubMenuParent: b = !1,
    hasDisabledGutters: s = !1,
    hasDivider: m = !1,
    focusVisibleClassName: f,
    id: h,
    children: g
  } = e, y = /* @__PURE__ */ c(
    ac,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: d,
      disabled: p,
      dense: u,
      disableGutters: s,
      divider: m,
      focusVisibleClassName: f,
      onClick: t,
      id: h,
      children: n ? /* @__PURE__ */ E(dt, { children: [
        ni(a, n, !0),
        /* @__PURE__ */ c(ic, { primary: n, inset: !a && o }),
        b ? /* @__PURE__ */ c(vi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ c(vs, {}) }) : ni(i, n, !1)
      ] }) : g
    }
  );
  return r ? /* @__PURE__ */ c(um, { title: r, placement: "right", children: /* @__PURE__ */ c("div", { children: y }) }) : y;
}
function Vs(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function fm(e) {
  const [t, n] = fe(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, i = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, d = () => {
    let p = Vs(a).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ c(Ls, { ...e, includedGroups: p });
  };
  return /* @__PURE__ */ E(dt, { children: [
    /* @__PURE__ */ c(js, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ c(
      sc,
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
        children: d()
      },
      r.id
    )
  ] });
}
const wm = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Ls(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = ct(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Vs(t).filter((f) => !("menuItem" in f.group))
    ), b = Object.values(u).sort(
      (f, h) => (f.group.order || 0) - (h.group.order || 0)
    ), s = [];
    b.forEach((f) => {
      wm(f.id, t.items).forEach(
        (h) => s.push({ item: h, isLastItemInGroup: !1 })
      ), s.length > 0 && (s[s.length - 1].isLastItemInGroup = !0);
    }), s.length > 0 && (s[s.length - 1].isLastItemInGroup = !1);
    const m = s.some(
      (f) => "iconPathBefore" in f.item && f.item.iconPathBefore
    );
    return { items: s, allowForLeadingIcons: m };
  }, [o, t]), l = ({ item: u, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [d] = a;
  if (!d)
    return /* @__PURE__ */ c("div", {});
  const p = d.item.group;
  return /* @__PURE__ */ c("div", { role: "menu", "aria-label": p, children: a.map((u, b) => {
    const { item: s } = u, m = l(u);
    if ("command" in s) {
      const f = s.group + b;
      return /* @__PURE__ */ c(
        js,
        {
          onClick: (h) => {
            n == null || n(h), r(s);
          },
          ...m
        },
        f
      );
    }
    return /* @__PURE__ */ c(
      fm,
      {
        parentMenuItem: s,
        parentItemProps: m,
        ...e
      },
      p + s.id
    );
  }) }, p);
}
function mm(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ c(Ls, { ...e, includedGroups: a });
}
function hm({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ E(
    yi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ c("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ c(lc, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ c(
          mm,
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
function gm({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = ct(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const d = l, p = o[d];
      typeof p == "object" && typeof p.order == "number" && !Number.isNaN(p.order) ? i.set(p.order, { id: d, metadata: p }) : console.warn(
        `Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, d) => (l.metadata.order || 0) - (d.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ c(
    yi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, l) => /* @__PURE__ */ c(
        hm,
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
function bm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const fo = (e, t, n = {}) => {
  const r = kt(t);
  r.current = t;
  const o = kt(n);
  o.current = bm(o.current);
  const [a, i] = fe(() => r.current), [l, d] = fe(!0);
  return Xe(() => {
    let p = !0;
    return d(!!e), (async () => {
      if (e) {
        const u = await e();
        p && (i(() => u), d(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [e]), [a, l];
}, vm = bs(/* @__PURE__ */ c("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function ym({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [d, p] = fe(!1), [u, b] = fe(!1), s = Se(() => {
    d && p(!1), b(!1);
  }, [d]), m = Se((x) => {
    x.stopPropagation(), p((v) => {
      const O = !v;
      return O && x.shiftKey ? b(!0) : O || b(!1), O;
    });
  }, []), f = Se(
    (x) => (s(), r(x)),
    [r, s]
  ), [h, g] = fe({ top: 1, left: 1 });
  Xe(() => {
    if (d) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const v = x.getBoundingClientRect(), O = window.scrollY, P = window.scrollX, V = v.top + O + x.clientHeight, S = v.left + P;
        g({ top: V, left: S });
      }
    }
  }, [d, o]);
  const [y] = fo(
    Se(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, d]),
    t
  ), [C] = fo(
    Se(async () => (e == null ? void 0 : e(!0)) ?? n ?? y, [e, n, y, d]),
    n ?? y
  ), T = u && C ? C : y;
  return /* @__PURE__ */ E(dt, { children: [
    /* @__PURE__ */ c(
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
        onClick: m,
        children: l ?? /* @__PURE__ */ c(vm, {})
      }
    ),
    /* @__PURE__ */ c(
      cc,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: d,
        onClose: s,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: h.top,
            left: h.left
          }
        },
        children: T ? /* @__PURE__ */ c(
          gm,
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
function Tg({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: d,
  children: p
}) {
  return /* @__PURE__ */ c(
    xi,
    {
      id: e,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: d,
      children: p
    }
  );
}
const Dn = or(({ className: e, ...t }, n) => /* @__PURE__ */ c(Vl, { size: 35, className: R("tw-animate-spin", e), ...t, ref: n }));
Dn.displayName = "Spinner";
function Sg({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: d,
  defaultValue: p,
  value: u,
  onChange: b,
  onFocus: s,
  onBlur: m
}) {
  return /* @__PURE__ */ E("div", { className: R("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ c(
      Ze,
      {
        htmlFor: e,
        className: R({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ c(
      Cn,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: R(d, { "tw-border-red-600": n }),
        defaultValue: p,
        value: u,
        onChange: b,
        onFocus: s,
        onBlur: m
      }
    ),
    /* @__PURE__ */ c("p", { className: R({ "tw-hidden": !o }), children: o })
  ] });
}
function Cg({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = kt(void 0);
  return /* @__PURE__ */ c("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ c(dc, { position: "static", id: r, children: /* @__PURE__ */ E(
    pc,
    {
      className: R("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ c(
          ym,
          {
            commandHandler: t,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ c("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const xm = sr(
  "tw-relative tw-w-full tw-rounded-lg tw-border tw-p-4 [&>svg~*]:tw-pl-7 [&>svg+div]:tw-translate-y-[-3px] [&>svg]:tw-absolute [&>svg]:tw-left-4 [&>svg]:tw-top-4 [&>svg]:tw-text-foreground",
  {
    variants: {
      variant: {
        default: "tw-bg-background tw-text-foreground",
        destructive: "tw-border-destructive/50 tw-text-destructive dark:tw-border-destructive [&>svg]:tw-text-destructive"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), km = M.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ c("div", { ref: r, role: "alert", className: R(xm({ variant: t }), e), ...n }));
km.displayName = "Alert";
const Nm = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ E(
    "h5",
    {
      ref: n,
      className: R("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Nm.displayName = "AlertTitle";
const Em = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c("div", { ref: n, className: R("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
Em.displayName = "AlertDescription";
const Tm = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ c(
    "div",
    {
      ref: n,
      className: R(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Tm.displayName = "Card";
const Sm = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ c(
    "div",
    {
      ref: n,
      className: R("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Sm.displayName = "CardHeader";
const Cm = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ c(
    "h3",
    {
      ref: n,
      className: R(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
Cm.displayName = "CardTitle";
const Om = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c("p", { ref: n, className: R("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Om.displayName = "CardDescription";
const Rm = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ c("div", { ref: n, className: R("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
Rm.displayName = "CardContent";
const Pm = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ c(
    "div",
    {
      ref: n,
      className: R("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Pm.displayName = "CardFooter";
function Og({ ...e }) {
  return /* @__PURE__ */ c(
    fc,
    {
      className: "tw-toaster tw-group",
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
const $m = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ E(
  cn.Root,
  {
    ref: n,
    className: R(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ c(cn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ c(cn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ c(cn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
$m.displayName = cn.Root.displayName;
const _m = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  to.Root,
  {
    className: R(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ c(
      to.Thumb,
      {
        className: R(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
        )
      }
    )
  }
));
_m.displayName = to.Root.displayName;
const Rg = Pe.Root, Im = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.List,
  {
    ref: n,
    className: R(
      "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Im.displayName = Pe.List.displayName;
const Am = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.Trigger,
  {
    ref: n,
    className: R(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
Am.displayName = Pe.Trigger.displayName;
const Dm = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ c(
  Pe.Content,
  {
    ref: n,
    className: R(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Dm.displayName = Pe.Content.displayName;
function Pg({
  isInstalling: e,
  handleClick: t,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ c(
    ve,
    {
      className: R(
        "tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e,
          "tw-bg-blue-600": !e,
          "tw-bg-white tw-text-blue-600 hover:tw-text-white": !n,
          "tw-w-20": n
        },
        r
      ),
      onClick: t,
      ...o,
      children: e ? /* @__PURE__ */ c(Dn, { size: 15 }) : /* @__PURE__ */ E(dt, { children: [
        /* @__PURE__ */ c(Ll, { size: 25, className: R("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function $g({
  isEnabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ c(
    ve,
    {
      className: R(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ E(dt, { children: [
        /* @__PURE__ */ c(Dn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function _g({
  isDisabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ c(
    ve,
    {
      className: R(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ E(dt, { children: [
        /* @__PURE__ */ c(Dn, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Ig({
  isUpdating: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ c(
    ve,
    {
      className: R(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ E(dt, { children: [
        /* @__PURE__ */ c(Dn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function xt() {
  return xt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, xt.apply(this, arguments);
}
const Mm = ["children", "options"], H = { blockQuote: "0", breakLine: "1", breakThematic: "2", codeBlock: "3", codeFenced: "4", codeInline: "5", footnote: "6", footnoteReference: "7", gfmTask: "8", heading: "9", headingSetext: "10", htmlBlock: "11", htmlComment: "12", htmlSelfClosing: "13", image: "14", link: "15", linkAngleBraceStyleDetector: "16", linkBareUrlDetector: "17", linkMailtoDetector: "18", newlineCoalescer: "19", orderedList: "20", paragraph: "21", ref: "22", refImage: "23", refLink: "24", table: "25", tableSeparator: "26", text: "27", textBolded: "28", textEmphasized: "29", textEscaped: "30", textMarked: "31", textStrikethroughed: "32", unorderedList: "33" };
var ri;
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ri || (ri = {}));
const oi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), ai = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Bm = ["style", "script"], jm = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Vm = /mailto:/i, Lm = /\n{2,}$/, zs = /^(\s*>[\s\S]*?)(?=\n{2,})/, zm = /^ *> ?/gm, Fm = /^ {2,}\n/, Um = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Fs = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Us = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Gm = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Hm = /^(?:\n *)*\n/, Xm = /\r\n?/g, Wm = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, Ym = /^\[\^([^\]]+)]/, qm = /\f/g, Km = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, Jm = /^\s*?\[(x|\s)\]/, Gs = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Hs = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Xs = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, wo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, Zm = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Ws = /^<!--[\s\S]*?(?:-->)/, Qm = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, mo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, eh = /^\{.*\}$/, th = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, nh = /^<([^ >]+@[^ >]+)>/, rh = /^<([^ >]+:\/[^ >]+)>/, oh = /-([a-z])?/gi, Ys = /^(.*\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, ah = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, ih = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, sh = /^\[([^\]]*)\] ?\[([^\]]*)\]/, lh = /(\[|\])/g, ch = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, dh = /\t/g, ph = /(^ *\||\| *$)/g, uh = /^ *:-+: *$/, fh = /^ *:-+ *$/, wh = /^ *-+: *$/, Or = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)", mh = new RegExp(`^([*_])\\1${Or}\\1\\1(?!\\1)`), hh = new RegExp(`^([*_])${Or}\\1(?!\\1|\\w)`), gh = new RegExp(`^==${Or}==`), bh = new RegExp(`^~~${Or}~~`), vh = /^\\([^0-9A-Za-z\s])/, yh = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, xh = /^\n+/, kh = /^([ \t]*)/, Nh = /\\([^\\])/g, ii = / *\n+$/, Eh = /(?:^|\n)( *)$/, Uo = "(?:\\d+\\.)", Go = "(?:[*+-])";
function qs(e) {
  return "( *)(" + (e === 1 ? Uo : Go) + ") +";
}
const Ks = qs(1), Js = qs(2);
function Zs(e) {
  return new RegExp("^" + (e === 1 ? Ks : Js));
}
const Th = Zs(1), Sh = Zs(2);
function Qs(e) {
  return new RegExp("^" + (e === 1 ? Ks : Js) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Uo : Go) + " )[^\\n]*)*(\\n|$)", "gm");
}
const el = Qs(1), tl = Qs(2);
function nl(e) {
  const t = e === 1 ? Uo : Go;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const rl = nl(1), ol = nl(2);
function si(e, t) {
  const n = t === 1, r = n ? rl : ol, o = n ? el : tl, a = n ? Th : Sh;
  return { match(i, l, d) {
    const p = Eh.exec(d);
    return p && (l.list || !l.inline && !l.simple) ? r.exec(i = p[1] + i) : null;
  }, order: 1, parse(i, l, d) {
    const p = n ? +i[2] : void 0, u = i[0].replace(Lm, `
`).match(o);
    let b = !1;
    return { items: u.map(function(s, m) {
      const f = a.exec(s)[0].length, h = new RegExp("^ {1," + f + "}", "gm"), g = s.replace(h, "").replace(a, ""), y = m === u.length - 1, C = g.indexOf(`

`) !== -1 || y && b;
      b = C;
      const T = d.inline, x = d.list;
      let v;
      d.list = !0, C ? (d.inline = !1, v = g.replace(ii, `

`)) : (d.inline = !0, v = g.replace(ii, ""));
      const O = l(v, d);
      return d.inline = T, d.list = x, O;
    }), ordered: n, start: p };
  }, render: (i, l, d) => e(i.ordered ? "ol" : "ul", { key: d.key, start: i.type === H.orderedList ? i.start : void 0 }, i.items.map(function(p, u) {
    return e("li", { key: u }, l(p, d));
  })) };
}
const Ch = new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), Oh = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, al = [zs, Fs, Us, Gs, Xs, Hs, Ws, Ys, el, rl, tl, ol], Rh = [...al, /^[^\n]+(?:  \n|\n{2,})/, wo, mo];
function Xn(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Ph(e) {
  return wh.test(e) ? "right" : uh.test(e) ? "center" : fh.test(e) ? "left" : null;
}
function li(e, t, n, r) {
  const o = n.inTable;
  n.inTable = !0;
  let a = e.trim().split(/( *(?:`[^`]*`|<.*?>.*?<\/.*?>(?!<\/.*?>)|\\\||\|) *)/).reduce((l, d) => (d.trim() === "|" ? l.push(r ? { type: H.tableSeparator } : { type: H.text, text: d }) : d !== "" && l.push.apply(l, t(d, n)), l), []);
  n.inTable = o;
  let i = [[]];
  return a.forEach(function(l, d) {
    l.type === H.tableSeparator ? d !== 0 && d !== a.length - 1 && i.push([]) : (l.type !== H.text || a[d + 1] != null && a[d + 1].type !== H.tableSeparator || (l.text = l.text.trimEnd()), i[i.length - 1].push(l));
  }), i;
}
function $h(e, t, n) {
  n.inline = !0;
  const r = e[2] ? e[2].replace(ph, "").split("|").map(Ph) : [], o = e[3] ? function(i, l, d) {
    return i.trim().split(`
`).map(function(p) {
      return li(p, l, d, !0);
    });
  }(e[3], t, n) : [], a = li(e[1], t, n, !!o.length);
  return n.inline = !1, o.length ? { align: r, cells: o, header: a, type: H.table } : { children: a, type: H.paragraph };
}
function ci(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function ot(e) {
  return function(t, n) {
    return n.inline ? e.exec(t) : null;
  };
}
function at(e) {
  return function(t, n) {
    return n.inline || n.simple ? e.exec(t) : null;
  };
}
function Je(e) {
  return function(t, n) {
    return n.inline || n.simple ? null : e.exec(t);
  };
}
function ln(e) {
  return function(t) {
    return e.exec(t);
  };
}
function _h(e, t, n) {
  if (t.inline || t.simple || n && !n.endsWith(`
`))
    return null;
  let r = "";
  e.split(`
`).every((a) => !al.some((i) => i.test(a)) && (r += a + `
`, a.trim()));
  const o = r.trimEnd();
  return o == "" ? null : [r, o];
}
function Ih(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return null;
  } catch {
    return null;
  }
  return e;
}
function di(e) {
  return e.replace(Nh, "$1");
}
function Jn(e, t, n) {
  const r = n.inline || !1, o = n.simple || !1;
  n.inline = !0, n.simple = !0;
  const a = e(t, n);
  return n.inline = r, n.simple = o, a;
}
function Ah(e, t, n) {
  const r = n.inline || !1, o = n.simple || !1;
  n.inline = !1, n.simple = !0;
  const a = e(t, n);
  return n.inline = r, n.simple = o, a;
}
function Dh(e, t, n) {
  const r = n.inline || !1;
  n.inline = !1;
  const o = e(t, n);
  return n.inline = r, o;
}
const Yr = (e, t, n) => ({ children: Jn(t, e[1], n) });
function qr() {
  return {};
}
function Kr() {
  return null;
}
function Mh(...e) {
  return e.filter(Boolean).join(" ");
}
function Jr(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (; o.length && (r = r[o[0]], r !== void 0); )
    o.shift();
  return r || n;
}
function Bh(e = "", t = {}) {
  function n(s, m, ...f) {
    const h = Jr(t.overrides, `${s}.props`, {});
    return t.createElement(function(g, y) {
      const C = Jr(y, g);
      return C ? typeof C == "function" || typeof C == "object" && "render" in C ? C : Jr(y, `${g}.component`, g) : g;
    }(s, t.overrides), xt({}, m, h, { className: Mh(m == null ? void 0 : m.className, h.className) || void 0 }), ...f);
  }
  function r(s) {
    s = s.replace(Km, "");
    let m = !1;
    t.forceInline ? m = !0 : t.forceBlock || (m = ch.test(s) === !1);
    const f = p(d(m ? s : `${s.trimEnd().replace(xh, "")}

`, { inline: m }));
    for (; typeof f[f.length - 1] == "string" && !f[f.length - 1].trim(); )
      f.pop();
    if (t.wrapper === null)
      return f;
    const h = t.wrapper || (m ? "span" : "div");
    let g;
    if (f.length > 1 || t.forceWrapper)
      g = f;
    else {
      if (f.length === 1)
        return g = f[0], typeof g == "string" ? n("span", { key: "outer" }, g) : g;
      g = null;
    }
    return D.createElement(h, { key: "outer" }, g);
  }
  function o(s, m) {
    const f = m.match(jm);
    return f ? f.reduce(function(h, g, y) {
      const C = g.indexOf("=");
      if (C !== -1) {
        const T = function(P) {
          return P.indexOf("-") !== -1 && P.match(Qm) === null && (P = P.replace(oh, function(V, S) {
            return S.toUpperCase();
          })), P;
        }(g.slice(0, C)).trim(), x = function(P) {
          const V = P[0];
          return (V === '"' || V === "'") && P.length >= 2 && P[P.length - 1] === V ? P.slice(1, -1) : P;
        }(g.slice(C + 1).trim()), v = oi[T] || T, O = h[v] = function(P, V, S, $) {
          return V === "style" ? S.split(/;\s?/).reduce(function(k, j) {
            const B = j.slice(0, j.indexOf(":"));
            return k[B.trim().replace(/(-[a-z])/g, (Z) => Z[1].toUpperCase())] = j.slice(B.length + 1).trim(), k;
          }, {}) : V === "href" || V === "src" ? $(S, P, V) : (S.match(eh) && (S = S.slice(1, S.length - 1)), S === "true" || S !== "false" && S);
        }(s, T, x, t.sanitizer);
        typeof O == "string" && (wo.test(O) || mo.test(O)) && (h[v] = D.cloneElement(r(O.trim()), { key: y }));
      } else
        g !== "style" && (h[oi[g] || g] = !0);
      return h;
    }, {}) : null;
  }
  t.overrides = t.overrides || {}, t.sanitizer = t.sanitizer || Ih, t.slugify = t.slugify || Xn, t.namedCodesToUnicode = t.namedCodesToUnicode ? xt({}, ai, t.namedCodesToUnicode) : ai, t.createElement = t.createElement || D.createElement;
  const a = [], i = {}, l = { [H.blockQuote]: { match: Je(zs), order: 1, parse: (s, m, f) => ({ children: m(s[0].replace(zm, ""), f) }), render: (s, m, f) => n("blockquote", { key: f.key }, m(s.children, f)) }, [H.breakLine]: { match: ln(Fm), order: 1, parse: qr, render: (s, m, f) => n("br", { key: f.key }) }, [H.breakThematic]: { match: Je(Um), order: 1, parse: qr, render: (s, m, f) => n("hr", { key: f.key }) }, [H.codeBlock]: { match: Je(Us), order: 0, parse: (s) => ({ lang: void 0, text: s[0].replace(/^ {4}/gm, "").replace(/\n+$/, "") }), render: (s, m, f) => n("pre", { key: f.key }, n("code", xt({}, s.attrs, { className: s.lang ? `lang-${s.lang}` : "" }), s.text)) }, [H.codeFenced]: { match: Je(Fs), order: 0, parse: (s) => ({ attrs: o("code", s[3] || ""), lang: s[2] || void 0, text: s[4], type: H.codeBlock }) }, [H.codeInline]: { match: at(Gm), order: 3, parse: (s) => ({ text: s[2] }), render: (s, m, f) => n("code", { key: f.key }, s.text) }, [H.footnote]: { match: Je(Wm), order: 0, parse: (s) => (a.push({ footnote: s[2], identifier: s[1] }), {}), render: Kr }, [H.footnoteReference]: { match: ot(Ym), order: 1, parse: (s) => ({ target: `#${t.slugify(s[1], Xn)}`, text: s[1] }), render: (s, m, f) => n("a", { key: f.key, href: t.sanitizer(s.target, "a", "href") }, n("sup", { key: f.key }, s.text)) }, [H.gfmTask]: { match: ot(Jm), order: 1, parse: (s) => ({ completed: s[1].toLowerCase() === "x" }), render: (s, m, f) => n("input", { checked: s.completed, key: f.key, readOnly: !0, type: "checkbox" }) }, [H.heading]: { match: Je(t.enforceAtxHeadings ? Hs : Gs), order: 1, parse: (s, m, f) => ({ children: Jn(m, s[2], f), id: t.slugify(s[2], Xn), level: s[1].length }), render: (s, m, f) => n(`h${s.level}`, { id: s.id, key: f.key }, m(s.children, f)) }, [H.headingSetext]: { match: Je(Xs), order: 0, parse: (s, m, f) => ({ children: Jn(m, s[1], f), level: s[2] === "=" ? 1 : 2, type: H.heading }) }, [H.htmlBlock]: { match: ln(wo), order: 1, parse(s, m, f) {
    const [, h] = s[3].match(kh), g = new RegExp(`^${h}`, "gm"), y = s[3].replace(g, ""), C = (T = y, Rh.some((V) => V.test(T)) ? Dh : Jn);
    var T;
    const x = s[1].toLowerCase(), v = Bm.indexOf(x) !== -1, O = (v ? x : s[1]).trim(), P = { attrs: o(O, s[2]), noInnerParse: v, tag: O };
    return f.inAnchor = f.inAnchor || x === "a", v ? P.text = s[3] : P.children = C(m, y, f), f.inAnchor = !1, P;
  }, render: (s, m, f) => n(s.tag, xt({ key: f.key }, s.attrs), s.text || m(s.children, f)) }, [H.htmlSelfClosing]: { match: ln(mo), order: 1, parse(s) {
    const m = s[1].trim();
    return { attrs: o(m, s[2] || ""), tag: m };
  }, render: (s, m, f) => n(s.tag, xt({}, s.attrs, { key: f.key })) }, [H.htmlComment]: { match: ln(Ws), order: 1, parse: () => ({}), render: Kr }, [H.image]: { match: at(Oh), order: 1, parse: (s) => ({ alt: s[1], target: di(s[2]), title: s[3] }), render: (s, m, f) => n("img", { key: f.key, alt: s.alt || void 0, title: s.title || void 0, src: t.sanitizer(s.target, "img", "src") }) }, [H.link]: { match: ot(Ch), order: 3, parse: (s, m, f) => ({ children: Ah(m, s[1], f), target: di(s[2]), title: s[3] }), render: (s, m, f) => n("a", { key: f.key, href: t.sanitizer(s.target, "a", "href"), title: s.title }, m(s.children, f)) }, [H.linkAngleBraceStyleDetector]: { match: ot(rh), order: 0, parse: (s) => ({ children: [{ text: s[1], type: H.text }], target: s[1], type: H.link }) }, [H.linkBareUrlDetector]: { match: (s, m) => m.inAnchor ? null : ot(th)(s, m), order: 0, parse: (s) => ({ children: [{ text: s[1], type: H.text }], target: s[1], title: void 0, type: H.link }) }, [H.linkMailtoDetector]: { match: ot(nh), order: 0, parse(s) {
    let m = s[1], f = s[1];
    return Vm.test(f) || (f = "mailto:" + f), { children: [{ text: m.replace("mailto:", ""), type: H.text }], target: f, type: H.link };
  } }, [H.orderedList]: si(n, 1), [H.unorderedList]: si(n, 2), [H.newlineCoalescer]: { match: Je(Hm), order: 3, parse: qr, render: () => `
` }, [H.paragraph]: { match: _h, order: 3, parse: Yr, render: (s, m, f) => n("p", { key: f.key }, m(s.children, f)) }, [H.ref]: { match: ot(ah), order: 0, parse: (s) => (i[s[1]] = { target: s[2], title: s[4] }, {}), render: Kr }, [H.refImage]: { match: at(ih), order: 0, parse: (s) => ({ alt: s[1] || void 0, ref: s[2] }), render: (s, m, f) => i[s.ref] ? n("img", { key: f.key, alt: s.alt, src: t.sanitizer(i[s.ref].target, "img", "src"), title: i[s.ref].title }) : null }, [H.refLink]: { match: ot(sh), order: 0, parse: (s, m, f) => ({ children: m(s[1], f), fallbackChildren: m(s[0].replace(lh, "\\$1"), f), ref: s[2] }), render: (s, m, f) => i[s.ref] ? n("a", { key: f.key, href: t.sanitizer(i[s.ref].target, "a", "href"), title: i[s.ref].title }, m(s.children, f)) : n("span", { key: f.key }, m(s.fallbackChildren, f)) }, [H.table]: { match: Je(Ys), order: 1, parse: $h, render(s, m, f) {
    const h = s;
    return n("table", { key: f.key }, n("thead", null, n("tr", null, h.header.map(function(g, y) {
      return n("th", { key: y, style: ci(h, y) }, m(g, f));
    }))), n("tbody", null, h.cells.map(function(g, y) {
      return n("tr", { key: y }, g.map(function(C, T) {
        return n("td", { key: T, style: ci(h, T) }, m(C, f));
      }));
    })));
  } }, [H.text]: { match: ln(yh), order: 4, parse: (s) => ({ text: s[0].replace(Zm, (m, f) => t.namedCodesToUnicode[f] ? t.namedCodesToUnicode[f] : m) }), render: (s) => s.text }, [H.textBolded]: { match: at(mh), order: 2, parse: (s, m, f) => ({ children: m(s[2], f) }), render: (s, m, f) => n("strong", { key: f.key }, m(s.children, f)) }, [H.textEmphasized]: { match: at(hh), order: 3, parse: (s, m, f) => ({ children: m(s[2], f) }), render: (s, m, f) => n("em", { key: f.key }, m(s.children, f)) }, [H.textEscaped]: { match: at(vh), order: 1, parse: (s) => ({ text: s[1], type: H.text }) }, [H.textMarked]: { match: at(gh), order: 3, parse: Yr, render: (s, m, f) => n("mark", { key: f.key }, m(s.children, f)) }, [H.textStrikethroughed]: { match: at(bh), order: 3, parse: Yr, render: (s, m, f) => n("del", { key: f.key }, m(s.children, f)) } };
  t.disableParsingRawHTML === !0 && (delete l[H.htmlBlock], delete l[H.htmlSelfClosing]);
  const d = function(s) {
    let m = Object.keys(s);
    function f(h, g) {
      let y = [], C = "";
      for (; h; ) {
        let T = 0;
        for (; T < m.length; ) {
          const x = m[T], v = s[x], O = v.match(h, g, C);
          if (O) {
            const P = O[0];
            h = h.substring(P.length);
            const V = v.parse(O, f, g);
            V.type == null && (V.type = x), y.push(V), C = P;
            break;
          }
          T++;
        }
      }
      return y;
    }
    return m.sort(function(h, g) {
      let y = s[h].order, C = s[g].order;
      return y !== C ? y - C : h < g ? -1 : 1;
    }), function(h, g) {
      return f(function(y) {
        return y.replace(Xm, `
`).replace(qm, "").replace(dh, "    ");
      }(h), g);
    };
  }(l), p = (u = function(s, m) {
    return function(f, h, g) {
      const y = s[f.type].render;
      return m ? m(() => y(f, h, g), f, h, g) : y(f, h, g);
    };
  }(l, t.renderRule), function s(m, f = {}) {
    if (Array.isArray(m)) {
      const h = f.key, g = [];
      let y = !1;
      for (let C = 0; C < m.length; C++) {
        f.key = C;
        const T = s(m[C], f), x = typeof T == "string";
        x && y ? g[g.length - 1] += T : T !== null && g.push(T), y = x;
      }
      return f.key = h, g;
    }
    return u(m, s, f);
  });
  var u;
  const b = r(e);
  return a.length ? n("div", null, b, n("footer", { key: "footer" }, a.map(function(s) {
    return n("div", { id: t.slugify(s.identifier, Xn), key: s.identifier }, s.identifier, p(d(s.footnote, { inline: !0 })));
  }))) : b;
}
const jh = (e) => {
  let { children: t = "", options: n } = e, r = function(o, a) {
    if (o == null)
      return {};
    var i, l, d = {}, p = Object.keys(o);
    for (l = 0; l < p.length; l++)
      a.indexOf(i = p[l]) >= 0 || (d[i] = o[i]);
    return d;
  }(e, Mm);
  return D.cloneElement(Bh(t, n), r);
};
function Ag({ id: e, markdown: t, className: n }) {
  return /* @__PURE__ */ c("div", { id: e, className: R("pr-twp tw-prose", n), children: /* @__PURE__ */ c(jh, { children: t }) });
}
const Vh = or((e, t) => /* @__PURE__ */ E(
  ve,
  {
    ref: t,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ c(zl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ c(
        ir,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var Lh = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Lh || {});
function Dg({ id: e, groups: t }) {
  return /* @__PURE__ */ c("div", { id: e, children: /* @__PURE__ */ E(vo, { children: [
    /* @__PURE__ */ c(Oi, { asChild: !0, children: /* @__PURE__ */ c(Vh, {}) }),
    /* @__PURE__ */ c(cr, { children: t.map((n) => /* @__PURE__ */ E("div", { children: [
      /* @__PURE__ */ c(On, { children: n.label }),
      /* @__PURE__ */ c(Oc, { children: n.items.map((r) => /* @__PURE__ */ c("div", { children: r.itemType === 0 ? /* @__PURE__ */ c(yo, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ c(Pi, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ c(dr, {})
    ] }, n.label)) })
  ] }) });
}
function Mg({ id: e, message: t }) {
  return /* @__PURE__ */ c("div", { id: e, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ c("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ c("p", { className: "tw-text-lg tw-text-gray-800", children: t }) }) });
}
function Bg({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new ql("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, d) => l + d, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ E(
    "div",
    {
      id: e,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ E("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ c("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ c("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: t }) }),
          /* @__PURE__ */ c("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ c("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ E("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ E("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ c(Fl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ c("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ c("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ c("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ E("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ c("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ c(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ E(
            "button",
            {
              type: "button",
              onClick: () => i(),
              className: "tw-text-xs tw-text-gray-500 tw-underline",
              children: [
                "+",
                r.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ c("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ E("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ E(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ c(Ul, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ E(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ c(Gl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function zh({ id: e, versionHistory: t }) {
  const [n, r] = fe(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const d = new Date(l), p = new Date(o.getTime() - d.getTime()), u = p.getUTCFullYear() - 1970, b = p.getUTCMonth(), s = p.getUTCDate() - 1;
    let m = "";
    return u > 0 ? m = `${u.toString()} year${u === 1 ? "" : "s"} ago` : b > 0 ? m = `${b.toString()} month${b === 1 ? "" : "s"} ago` : s === 0 ? m = "today" : m = `${s.toString()} day${s === 1 ? "" : "s"} ago`, m;
  }
  const i = Object.entries(t).sort((l, d) => d[0].localeCompare(l[0]));
  return /* @__PURE__ */ E("div", { id: e, children: [
    /* @__PURE__ */ c("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ c("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ E("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ c("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ c("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ c("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ E("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ E("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ c("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ c(
      "button",
      {
        type: "button",
        onClick: () => r(!n),
        className: "tw-text-xs tw-text-gray-500 tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function jg({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = ct(() => Kl(n), [n]), l = ((d) => {
    const p = new Intl.DisplayNames(navigator.language, { type: "language" });
    return d.map((u) => p.of(u));
  })(r);
  return /* @__PURE__ */ c("div", { id: e, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ E("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ c(zh, { versionHistory: o }),
    /* @__PURE__ */ c("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ E("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ c("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ E("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ E("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ c("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ c("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ c("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ c("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ c("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ E("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ c("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ c("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Vg = (e, t) => {
  Xe(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Zr = () => !1, Lg = (e, t) => {
  const [n] = fo(
    Se(async () => {
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
  Xe(() => () => {
    n !== Zr && n();
  }, [n]);
};
function Fh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Fh(`/*
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
  /* Adding the preflight selector (pr-twp) to components was not changing the font as desired.
  So this piece of code adds tw-font-sans everywhere we include preflight. */
  .pr-twp {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
  @font-face {
    font-family: 'Inter';
    font-display: 'swap';
    src: url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
  }

  /*
   * Theme colors in Platform.Bible. These are applied in CSS properties using \`hsl(var(--varName))\`
   * or Tailwind classes like \`tw-bg-primary\`
   *
   * See the wiki's
   * [Matching Application Theme](https://github.com/paranext/paranext-extension-template/wiki/Extension-Anatomy#matching-application-theme)
   * section for more information
   */
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
.tw-prose {
  color: var(--tw-prose-body);
  max-width: 65ch;
}
.tw-prose :where(p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where([class~="lead"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-top: 1.2em;
  margin-bottom: 1.2em;
}
.tw-prose :where(a):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-links);
  text-decoration: underline;
  font-weight: 500;
}
.tw-prose :where(strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.tw-prose :where(a strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol[type="A"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="A" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-alpha;
}
.tw-prose :where(ol[type="a" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-alpha;
}
.tw-prose :where(ol[type="I"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="I" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: upper-roman;
}
.tw-prose :where(ol[type="i" s]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: lower-roman;
}
.tw-prose :where(ol[type="1"]):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: decimal;
}
.tw-prose :where(ul):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  list-style-type: disc;
  margin-top: 1.25em;
  margin-bottom: 1.25em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  font-weight: 400;
  color: var(--tw-prose-counters);
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.tw-prose :where(dt):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.25em;
}
.tw-prose :where(hr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-top: 3em;
  margin-bottom: 3em;
}
.tw-prose :where(blockquote):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-style: italic;
  color: var(--tw-prose-quotes);
  border-inline-start-width: 0.25rem;
  border-inline-start-color: var(--tw-prose-quote-borders);
  quotes: "0o201C""0o201D""0o2018""0o2019";
  margin-top: 1.6em;
  margin-bottom: 1.6em;
  padding-inline-start: 1em;
}
.tw-prose :where(blockquote p:first-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: open-quote;
}
.tw-prose :where(blockquote p:last-of-type):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: close-quote;
}
.tw-prose :where(h1):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 800;
  font-size: 2.25em;
  margin-top: 0;
  margin-bottom: 0.8888889em;
  line-height: 1.1111111;
}
.tw-prose :where(h1 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 900;
  color: inherit;
}
.tw-prose :where(h2):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 700;
  font-size: 1.5em;
  margin-top: 2em;
  margin-bottom: 1em;
  line-height: 1.3333333;
}
.tw-prose :where(h2 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 800;
  color: inherit;
}
.tw-prose :where(h3):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  font-size: 1.25em;
  margin-top: 1.6em;
  margin-bottom: 0.6em;
  line-height: 1.6;
}
.tw-prose :where(h3 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(h4):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.5em;
  line-height: 1.5;
}
.tw-prose :where(h4 strong):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 700;
  color: inherit;
}
.tw-prose :where(img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(picture):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  display: block;
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(video):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(kbd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  font-weight: 500;
  font-family: inherit;
  color: var(--tw-prose-kbd);
  box-shadow: 0 0 0 1px rgb(var(--tw-prose-kbd-shadows) / 10%), 0 3px 0 rgb(var(--tw-prose-kbd-shadows) / 10%);
  font-size: 0.875em;
  border-radius: 0.3125rem;
  padding-top: 0.1875em;
  padding-inline-end: 0.375em;
  padding-bottom: 0.1875em;
  padding-inline-start: 0.375em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-code);
  font-weight: 600;
  font-size: 0.875em;
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: "\`";
}
.tw-prose :where(code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: "\`";
}
.tw-prose :where(a code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h1 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(h2 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.tw-prose :where(h3 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.tw-prose :where(h4 code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(blockquote code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(thead th code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: inherit;
}
.tw-prose :where(pre):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-pre-code);
  background-color: var(--tw-prose-pre-bg);
  overflow-x: auto;
  font-weight: 400;
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-top: 1.7142857em;
  margin-bottom: 1.7142857em;
  border-radius: 0.375rem;
  padding-top: 0.8571429em;
  padding-inline-end: 1.1428571em;
  padding-bottom: 0.8571429em;
  padding-inline-start: 1.1428571em;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  background-color: transparent;
  border-width: 0;
  border-radius: 0;
  padding: 0;
  font-weight: inherit;
  color: inherit;
  font-size: inherit;
  font-family: inherit;
  line-height: inherit;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::before {
  content: none;
}
.tw-prose :where(pre code):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *))::after {
  content: none;
}
.tw-prose :where(table):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  width: 100%;
  table-layout: auto;
  margin-top: 2em;
  margin-bottom: 2em;
  font-size: 0.875em;
  line-height: 1.7142857;
}
.tw-prose :where(thead):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-th-borders);
}
.tw-prose :where(thead th):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  vertical-align: bottom;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody tr):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 1px;
  border-bottom-color: var(--tw-prose-td-borders);
}
.tw-prose :where(tbody tr:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-bottom-width: 0;
}
.tw-prose :where(tbody td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: baseline;
}
.tw-prose :where(tfoot):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  border-top-width: 1px;
  border-top-color: var(--tw-prose-th-borders);
}
.tw-prose :where(tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  vertical-align: top;
}
.tw-prose :where(th, td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  text-align: start;
}
.tw-prose :where(figure > *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(figcaption):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.tw-prose {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #6b7280;
  --tw-prose-bullets: #d1d5db;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-kbd: #111827;
  --tw-prose-kbd-shadows: 17 24 39;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-kbd: #fff;
  --tw-prose-invert-kbd-shadows: 255 255 255;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgb(0 0 0 / 50%);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}
.tw-prose :where(picture > img):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
  margin-bottom: 0;
}
.tw-prose :where(li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  margin-bottom: 0.5em;
}
.tw-prose :where(ol > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(ul > li):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0.375em;
}
.tw-prose :where(.tw-prose > ul > li p):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(.tw-prose > ul > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ul > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
}
.tw-prose :where(.tw-prose > ol > li > p:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 1.25em;
}
.tw-prose :where(ul ul, ul ol, ol ul, ol ol):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.75em;
  margin-bottom: 0.75em;
}
.tw-prose :where(dl):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 1.25em;
  margin-bottom: 1.25em;
}
.tw-prose :where(dd):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0.5em;
  padding-inline-start: 1.625em;
}
.tw-prose :where(hr + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h2 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h3 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(h4 + *):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(thead th:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(thead th:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(tbody td, tfoot td):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-top: 0.5714286em;
  padding-inline-end: 0.5714286em;
  padding-bottom: 0.5714286em;
  padding-inline-start: 0.5714286em;
}
.tw-prose :where(tbody td:first-child, tfoot td:first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-start: 0;
}
.tw-prose :where(tbody td:last-child, tfoot td:last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  padding-inline-end: 0;
}
.tw-prose :where(figure):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 2em;
  margin-bottom: 2em;
}
.tw-prose :where(.tw-prose > :first-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-top: 0;
}
.tw-prose :where(.tw-prose > :last-child):not(:where([class~="tw-not-prose"],[class~="tw-not-prose"] *)) {
  margin-bottom: 0;
}
.tw-sr-only {
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
.tw-pointer-events-none {
  pointer-events: none;
}
.tw-fixed {
  position: fixed;
}
.tw-absolute {
  position: absolute;
}
.tw-relative {
  position: relative;
}
.tw-sticky {
  position: sticky;
}
.tw-inset-0 {
  inset: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-2 {
  bottom: 0.5rem;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-2\\.5 {
  left: 0.625rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-top-0 {
  top: 0px;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2 {
  top: 0.5rem;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
}
.tw-col-span-2 {
  grid-column: span 2 / span 2;
}
.tw-m-1 {
  margin: 0.25rem;
}
.tw-m-2 {
  margin: 0.5rem;
}
.tw--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
}
.tw-mx-1 {
  margin-left: 0.25rem;
  margin-right: 0.25rem;
}
.tw-mx-2 {
  margin-left: 0.5rem;
  margin-right: 0.5rem;
}
.tw-my-1 {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}
.tw-my-2 {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}
.tw-my-4 {
  margin-top: 1rem;
  margin-bottom: 1rem;
}
.tw-mb-1 {
  margin-bottom: 0.25rem;
}
.tw-mb-2 {
  margin-bottom: 0.5rem;
}
.tw-mb-20 {
  margin-bottom: 5rem;
}
.tw-me-2 {
  margin-inline-end: 0.5rem;
}
.tw-ml-1 {
  margin-left: 0.25rem;
}
.tw-ml-2 {
  margin-left: 0.5rem;
}
.tw-ml-auto {
  margin-left: auto;
}
.tw-mr-1 {
  margin-right: 0.25rem;
}
.tw-mr-2 {
  margin-right: 0.5rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-2 {
  margin-top: 0.5rem;
}
.tw-mt-20 {
  margin-top: 5rem;
}
.tw-mt-3 {
  margin-top: 0.75rem;
}
.tw-mt-4 {
  margin-top: 1rem;
}
.tw-mt-auto {
  margin-top: auto;
}
.tw-box-border {
  box-sizing: border-box;
}
.tw-box-content {
  box-sizing: content-box;
}
.tw-block {
  display: block;
}
.tw-inline-block {
  display: inline-block;
}
.tw-inline {
  display: inline;
}
.tw-flex {
  display: flex;
}
.tw-inline-flex {
  display: inline-flex;
}
.tw-grid {
  display: grid;
}
.tw-inline-grid {
  display: inline-grid;
}
.tw-hidden {
  display: none;
}
.tw-aspect-square {
  aspect-ratio: 1 / 1;
}
.tw-h-1\\/2 {
  height: 50%;
}
.tw-h-10 {
  height: 2.5rem;
}
.tw-h-11 {
  height: 2.75rem;
}
.tw-h-12 {
  height: 3rem;
}
.tw-h-14 {
  height: 3.5rem;
}
.tw-h-2 {
  height: 0.5rem;
}
.tw-h-2\\.5 {
  height: 0.625rem;
}
.tw-h-20 {
  height: 5rem;
}
.tw-h-24 {
  height: 6rem;
}
.tw-h-3 {
  height: 0.75rem;
}
.tw-h-3\\.5 {
  height: 0.875rem;
}
.tw-h-4 {
  height: 1rem;
}
.tw-h-5 {
  height: 1.25rem;
}
.tw-h-6 {
  height: 1.5rem;
}
.tw-h-7 {
  height: 1.75rem;
}
.tw-h-8 {
  height: 2rem;
}
.tw-h-9 {
  height: 2.25rem;
}
.tw-h-96 {
  height: 24rem;
}
.tw-h-\\[1\\.2rem\\] {
  height: 1.2rem;
}
.tw-h-\\[100\\%\\] {
  height: 100%;
}
.tw-h-\\[1px\\] {
  height: 1px;
}
.tw-h-\\[405px\\] {
  height: 405px;
}
.tw-h-\\[var\\(--radix-select-trigger-height\\)\\] {
  height: var(--radix-select-trigger-height);
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-w-0 {
  width: 0px;
}
.tw-w-1\\/3 {
  width: 33.333333%;
}
.tw-w-10 {
  width: 2.5rem;
}
.tw-w-11 {
  width: 2.75rem;
}
.tw-w-14 {
  width: 3.5rem;
}
.tw-w-2 {
  width: 0.5rem;
}
.tw-w-2\\.5 {
  width: 0.625rem;
}
.tw-w-20 {
  width: 5rem;
}
.tw-w-3 {
  width: 0.75rem;
}
.tw-w-3\\.5 {
  width: 0.875rem;
}
.tw-w-3\\/4 {
  width: 75%;
}
.tw-w-4 {
  width: 1rem;
}
.tw-w-5 {
  width: 1.25rem;
}
.tw-w-6 {
  width: 1.5rem;
}
.tw-w-72 {
  width: 18rem;
}
.tw-w-8 {
  width: 2rem;
}
.tw-w-9 {
  width: 2.25rem;
}
.tw-w-\\[1\\.2rem\\] {
  width: 1.2rem;
}
.tw-w-\\[100px\\] {
  width: 100px;
}
.tw-w-\\[116px\\] {
  width: 116px;
}
.tw-w-\\[124px\\] {
  width: 124px;
}
.tw-w-\\[150px\\] {
  width: 150px;
}
.tw-w-\\[1px\\] {
  width: 1px;
}
.tw-w-\\[200px\\] {
  width: 200px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[70px\\] {
  width: 70px;
}
.tw-w-auto {
  width: auto;
}
.tw-w-full {
  width: 100%;
}
.tw-min-w-\\[8rem\\] {
  min-width: 8rem;
}
.tw-min-w-\\[var\\(--radix-select-trigger-width\\)\\] {
  min-width: var(--radix-select-trigger-width);
}
.tw-max-w-64 {
  max-width: 16rem;
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-shrink-0 {
  flex-shrink: 0;
}
.tw-flex-grow {
  flex-grow: 1;
}
.tw-grow {
  flex-grow: 1;
}
.tw-caption-bottom {
  caption-side: bottom;
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-y-\\[-50\\%\\] {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-0 {
  --tw-rotate: 0deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-rotate-90 {
  --tw-rotate: 90deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-0 {
  --tw-scale-x: 0;
  --tw-scale-y: 0;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-scale-100 {
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-transform {
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
@keyframes tw-spin {

  to {
    transform: rotate(360deg);
  }
}
.tw-animate-spin {
  animation: tw-spin 1s linear infinite;
}
.tw-cursor-default {
  cursor: default;
}
.tw-cursor-not-allowed {
  cursor: not-allowed;
}
.tw-cursor-pointer {
  cursor: pointer;
}
.tw-touch-none {
  touch-action: none;
}
.tw-select-none {
  user-select: none;
}
.tw-list-disc {
  list-style-type: disc;
}
.tw-columns-2 {
  columns: 2;
}
.tw-auto-rows-max {
  grid-auto-rows: max-content;
}
.tw-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}
.tw-grid-cols-\\[25\\%\\,25\\%\\,50\\%\\] {
  grid-template-columns: 25% 25% 50%;
}
.tw-grid-cols-\\[25\\%\\,50\\%\\,25\\%\\] {
  grid-template-columns: 25% 50% 25%;
}
.tw-flex-row {
  flex-direction: row;
}
.tw-flex-col {
  flex-direction: column;
}
.tw-flex-col-reverse {
  flex-direction: column-reverse;
}
.tw-flex-wrap {
  flex-wrap: wrap;
}
.tw-items-start {
  align-items: flex-start;
}
.tw-items-center {
  align-items: center;
}
.tw-justify-start {
  justify-content: flex-start;
}
.tw-justify-end {
  justify-content: flex-end;
}
.tw-justify-center {
  justify-content: center;
}
.tw-justify-between {
  justify-content: space-between;
}
.tw-gap-0 {
  gap: 0px;
}
.tw-gap-0\\.5 {
  gap: 0.125rem;
}
.tw-gap-1 {
  gap: 0.25rem;
}
.tw-gap-1\\.5 {
  gap: 0.375rem;
}
.tw-gap-2 {
  gap: 0.5rem;
}
.tw-gap-2\\.5 {
  gap: 0.625rem;
}
.tw-gap-3 {
  gap: 0.75rem;
}
.tw-gap-4 {
  gap: 1rem;
}
.tw-gap-6 {
  gap: 1.5rem;
}
.tw-gap-x-4 {
  column-gap: 1rem;
}
.tw-space-x-0 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0px * var(--tw-space-x-reverse));
  margin-left: calc(0px * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(0.5rem * var(--tw-space-x-reverse));
  margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1rem * var(--tw-space-x-reverse));
  margin-left: calc(1rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-x-6 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-x-reverse: 0;
  margin-right: calc(1.5rem * var(--tw-space-x-reverse));
  margin-left: calc(1.5rem * calc(1 - var(--tw-space-x-reverse)));
}
.tw-space-y-1 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.25rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.25rem * var(--tw-space-y-reverse));
}
.tw-space-y-1\\.5 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.375rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.375rem * var(--tw-space-y-reverse));
}
.tw-space-y-2 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.5rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.5rem * var(--tw-space-y-reverse));
}
.tw-space-y-3 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(0.75rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(0.75rem * var(--tw-space-y-reverse));
}
.tw-space-y-4 > :not([hidden]) ~ :not([hidden]) {
  --tw-space-y-reverse: 0;
  margin-top: calc(1rem * calc(1 - var(--tw-space-y-reverse)));
  margin-bottom: calc(1rem * var(--tw-space-y-reverse));
}
.tw-self-stretch {
  align-self: stretch;
}
.tw-overflow-auto {
  overflow: auto;
}
.tw-overflow-hidden {
  overflow: hidden;
}
.tw-overflow-y-auto {
  overflow-y: auto;
}
.tw-overflow-x-hidden {
  overflow-x: hidden;
}
.tw-overflow-y-hidden {
  overflow-y: hidden;
}
.tw-text-ellipsis {
  text-overflow: ellipsis;
}
.tw-whitespace-normal {
  white-space: normal;
}
.tw-whitespace-nowrap {
  white-space: nowrap;
}
.tw-text-nowrap {
  text-wrap: nowrap;
}
.tw-text-balance {
  text-wrap: balance;
}
.tw-break-words {
  overflow-wrap: break-word;
}
.tw-rounded-full {
  border-radius: 9999px;
}
.tw-rounded-lg {
  border-radius: var(--radius);
}
.tw-rounded-md {
  border-radius: calc(var(--radius) - 2px);
}
.tw-rounded-sm {
  border-radius: calc(var(--radius) - 4px);
}
.tw-rounded-s-md {
  border-start-start-radius: calc(var(--radius) - 2px);
  border-end-start-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ee-none {
  border-end-end-radius: 0px;
}
.tw-rounded-se-md {
  border-start-end-radius: calc(var(--radius) - 2px);
}
.tw-rounded-ss-none {
  border-start-start-radius: 0px;
}
.tw-border {
  border-width: 1px;
}
.tw-border-0 {
  border-width: 0px;
}
.tw-border-2 {
  border-width: 2px;
}
.tw-border-b {
  border-bottom-width: 1px;
}
.tw-border-b-0 {
  border-bottom-width: 0px;
}
.tw-border-e {
  border-inline-end-width: 1px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-l-2 {
  border-left-width: 2px;
}
.tw-border-r-0 {
  border-right-width: 0px;
}
.tw-border-t {
  border-top-width: 1px;
}
.tw-border-t-0 {
  border-top-width: 0px;
}
.tw-border-solid {
  border-style: solid;
}
.tw-border-dashed {
  border-style: dashed;
}
.tw-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.tw-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.tw-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}
.tw-bg-border {
  background-color: hsl(var(--border));
}
.tw-bg-card {
  background-color: hsl(var(--card));
}
.tw-bg-card-foreground {
  background-color: hsl(var(--card-foreground));
}
.tw-bg-destructive {
  background-color: hsl(var(--destructive));
}
.tw-bg-destructive-foreground {
  background-color: hsl(var(--destructive-foreground));
}
.tw-bg-foreground {
  background-color: hsl(var(--foreground));
}
.tw-bg-gray-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(243 244 246 / var(--tw-bg-opacity));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}
.tw-bg-input {
  background-color: hsl(var(--input));
}
.tw-bg-muted {
  background-color: hsl(var(--muted));
}
.tw-bg-muted-foreground {
  background-color: hsl(var(--muted-foreground));
}
.tw-bg-muted\\/40 {
  background-color: hsl(var(--muted) / 0.4);
}
.tw-bg-muted\\/50 {
  background-color: hsl(var(--muted) / 0.5);
}
.tw-bg-neutral-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(212 212 212 / var(--tw-bg-opacity));
}
.tw-bg-popover {
  background-color: hsl(var(--popover));
}
.tw-bg-popover-foreground {
  background-color: hsl(var(--popover-foreground));
}
.tw-bg-primary {
  background-color: hsl(var(--primary));
}
.tw-bg-primary-foreground {
  background-color: hsl(var(--primary-foreground));
}
.tw-bg-ring {
  background-color: hsl(var(--ring));
}
.tw-bg-secondary {
  background-color: hsl(var(--secondary));
}
.tw-bg-secondary-foreground {
  background-color: hsl(var(--secondary-foreground));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}
.tw-fill-current {
  fill: currentColor;
}
.tw-p-0 {
  padding: 0px;
}
.tw-p-1 {
  padding: 0.25rem;
}
.tw-p-2 {
  padding: 0.5rem;
}
.tw-p-4 {
  padding: 1rem;
}
.tw-p-6 {
  padding: 1.5rem;
}
.tw-p-8 {
  padding: 2rem;
}
.tw-p-\\[1px\\] {
  padding: 1px;
}
.tw-px-1 {
  padding-left: 0.25rem;
  padding-right: 0.25rem;
}
.tw-px-2 {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}
.tw-px-2\\.5 {
  padding-left: 0.625rem;
  padding-right: 0.625rem;
}
.tw-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.tw-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.tw-px-5 {
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.tw-px-6 {
  padding-left: 1.5rem;
  padding-right: 1.5rem;
}
.tw-px-7 {
  padding-left: 1.75rem;
  padding-right: 1.75rem;
}
.tw-px-8 {
  padding-left: 2rem;
  padding-right: 2rem;
}
.tw-py-1 {
  padding-top: 0.25rem;
  padding-bottom: 0.25rem;
}
.tw-py-1\\.5 {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}
.tw-py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.tw-py-3 {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}
.tw-py-4 {
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.tw-py-6 {
  padding-top: 1.5rem;
  padding-bottom: 1.5rem;
}
.tw-pb-2 {
  padding-bottom: 0.5rem;
}
.tw-pb-3 {
  padding-bottom: 0.75rem;
}
.tw-pb-4 {
  padding-bottom: 1rem;
}
.tw-pe-2 {
  padding-inline-end: 0.5rem;
}
.tw-pl-4 {
  padding-left: 1rem;
}
.tw-pl-5 {
  padding-left: 1.25rem;
}
.tw-pl-8 {
  padding-left: 2rem;
}
.tw-pr-2 {
  padding-right: 0.5rem;
}
.tw-pr-3 {
  padding-right: 0.75rem;
}
.tw-pr-4 {
  padding-right: 1rem;
}
.tw-ps-12 {
  padding-inline-start: 3rem;
}
.tw-ps-4 {
  padding-inline-start: 1rem;
}
.tw-ps-8 {
  padding-inline-start: 2rem;
}
.tw-pt-0 {
  padding-top: 0px;
}
.tw-pt-3 {
  padding-top: 0.75rem;
}
.tw-pt-4 {
  padding-top: 1rem;
}
.tw-text-center {
  text-align: center;
}
.tw-text-right {
  text-align: right;
}
.tw-text-start {
  text-align: start;
}
.tw-text-end {
  text-align: end;
}
.tw-align-middle {
  vertical-align: middle;
}
.tw-text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}
.tw-text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}
.tw-text-5xl {
  font-size: 3rem;
  line-height: 1;
}
.tw-text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}
.tw-text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}
.tw-text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}
.tw-font-bold {
  font-weight: 700;
}
.tw-font-medium {
  font-weight: 500;
}
.tw-font-normal {
  font-weight: 400;
}
.tw-font-semibold {
  font-weight: 600;
}
.tw-uppercase {
  text-transform: uppercase;
}
.tw-capitalize {
  text-transform: capitalize;
}
.tw-not-italic {
  font-style: normal;
}
.tw-tabular-nums {
  --tw-numeric-spacing: tabular-nums;
  font-variant-numeric: var(--tw-ordinal) var(--tw-slashed-zero) var(--tw-numeric-figure) var(--tw-numeric-spacing) var(--tw-numeric-fraction);
}
.tw-leading-9 {
  line-height: 2.25rem;
}
.tw-leading-none {
  line-height: 1;
}
.tw-leading-relaxed {
  line-height: 1.625;
}
.tw-tracking-tight {
  letter-spacing: -0.025em;
}
.tw-tracking-widest {
  letter-spacing: 0.1em;
}
.tw-text-accent-foreground {
  color: hsl(var(--accent-foreground));
}
.tw-text-amber-800 {
  --tw-text-opacity: 1;
  color: rgb(146 64 14 / var(--tw-text-opacity));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}
.tw-text-card-foreground {
  color: hsl(var(--card-foreground));
}
.tw-text-current {
  color: currentColor;
}
.tw-text-destructive {
  color: hsl(var(--destructive));
}
.tw-text-destructive-foreground {
  color: hsl(var(--destructive-foreground));
}
.tw-text-foreground {
  color: hsl(var(--foreground));
}
.tw-text-foreground\\/80 {
  color: hsl(var(--foreground) / 0.8);
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity));
}
.tw-text-inherit {
  color: inherit;
}
.tw-text-muted-foreground {
  color: hsl(var(--muted-foreground));
}
.tw-text-popover-foreground {
  color: hsl(var(--popover-foreground));
}
.tw-text-primary {
  color: hsl(var(--primary));
}
.tw-text-primary-foreground {
  color: hsl(var(--primary-foreground));
}
.tw-text-red-500 {
  --tw-text-opacity: 1;
  color: rgb(239 68 68 / var(--tw-text-opacity));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity));
}
.tw-underline {
  text-decoration-line: underline;
}
.tw-underline-offset-4 {
  text-underline-offset: 4px;
}
.tw-opacity-0 {
  opacity: 0;
}
.tw-opacity-50 {
  opacity: 0.5;
}
.tw-opacity-60 {
  opacity: 0.6;
}
.tw-opacity-70 {
  opacity: 0.7;
}
.tw-shadow-lg {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-md {
  --tw-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 4px 6px -1px var(--tw-shadow-color), 0 2px 4px -2px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-none {
  --tw-shadow: 0 0 #0000;
  --tw-shadow-colored: 0 0 #0000;
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-shadow-sm {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.tw-outline-none {
  outline: 2px solid transparent;
  outline-offset: 2px;
}
.tw-ring-0 {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(0px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-transform {
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-duration-200 {
  transition-duration: 200ms;
}
.tw-duration-300 {
  transition-duration: 300ms;
}
.tw-ease-in-out {
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
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/tailwind.scss */

/* #endregion */

.\\*\\:tw-m-4 > * {
  margin: 1rem;
}

.file\\:tw-border-0::file-selector-button {
  border-width: 0px;
}

.file\\:tw-bg-transparent::file-selector-button {
  background-color: transparent;
}

.file\\:tw-text-sm::file-selector-button {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.file\\:tw-font-medium::file-selector-button {
  font-weight: 500;
}

.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity));
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity));
}

.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}

.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.focus\\:tw-bg-accent:focus {
  background-color: hsl(var(--accent));
}

.focus\\:tw-text-accent-foreground:focus {
  color: hsl(var(--accent-foreground));
}

.focus\\:tw-outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:tw-ring-2:focus {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus\\:tw-ring-ring:focus {
  --tw-ring-color: hsl(var(--ring));
}

.focus\\:tw-ring-offset-2:focus {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-outline-none:focus-visible {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus-visible\\:tw-ring-2:focus-visible {
  --tw-ring-offset-shadow: var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color);
  --tw-ring-shadow: var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color);
  box-shadow: var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow, 0 0 #0000);
}

.focus-visible\\:tw-ring-\\[color\\:hsl\\(2400o2c 5\\%0o2c 64\\.9\\%\\)\\]:focus-visible {
  --tw-ring-opacity: 1;
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}

.disabled\\:tw-pointer-events-none:disabled {
  pointer-events: none;
}

.disabled\\:tw-cursor-not-allowed:disabled {
  cursor: not-allowed;
}

.disabled\\:tw-opacity-50:disabled {
  opacity: 0.5;
}

.tw-group:hover .group-hover\\:tw-opacity-100 {
  opacity: 1;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-cursor-not-allowed {
  cursor: not-allowed;
}

.tw-peer:disabled ~ .peer-disabled\\:tw-opacity-70 {
  opacity: 0.7;
}

.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled=true] {
  pointer-events: none;
}

.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}

.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side=bottom] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side=left] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side=right] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side=top] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state=checked] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state=unchecked] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}

.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected=true] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=active\\]\\:tw-bg-background[data-state=active] {
  background-color: hsl(var(--background));
}

.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state=checked] {
  background-color: hsl(var(--primary));
}

.data-\\[state\\=on\\]\\:tw-bg-accent[data-state=on] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:tw-bg-accent[data-state=open] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state=selected] {
  background-color: hsl(var(--muted));
}

.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state=unchecked] {
  background-color: hsl(var(--input));
}

.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected=true] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=active\\]\\:tw-text-foreground[data-state=active] {
  color: hsl(var(--foreground));
}

.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state=checked] {
  color: hsl(var(--primary-foreground));
}

.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state=on] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state=open] {
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled=true] {
  opacity: 0.5;
}

.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}

.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state=active] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.data-\\[state\\=open\\]\\:tw-animate-in[data-state=open] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-animate-out[data-state=closed] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state=closed] {
  --tw-exit-opacity: 0;
}

.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state=open] {
  --tw-enter-opacity: 0;
}

.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state=closed] {
  --tw-exit-scale: .95;
}

.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state=open] {
  --tw-enter-scale: .95;
}

.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side=bottom] {
  --tw-enter-translate-y: -0.5rem;
}

.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side=left] {
  --tw-enter-translate-x: 0.5rem;
}

.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side=right] {
  --tw-enter-translate-x: -0.5rem;
}

.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side=top] {
  --tw-enter-translate-y: 0.5rem;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state=closed] {
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state=closed] {
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state=open] {
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state=open] {
  --tw-enter-translate-y: -48%;
}

@media (min-width: 640px) {

  .sm\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .sm\\:tw-static {
    position: static;
  }

  .sm\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .sm\\:tw-flex {
    display: flex;
  }

  .sm\\:tw-table-cell {
    display: table-cell;
  }

  .sm\\:tw-hidden {
    display: none;
  }

  .sm\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .sm\\:tw-flex-row {
    flex-direction: row;
  }

  .sm\\:tw-justify-end {
    justify-content: flex-end;
  }

  .sm\\:tw-gap-4 {
    gap: 1rem;
  }

  .sm\\:tw-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:tw-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:tw-border-0 {
    border-width: 0px;
  }

  .sm\\:tw-bg-transparent {
    background-color: transparent;
  }

  .sm\\:tw-px-6 {
    padding-left: 1.5rem;
    padding-right: 1.5rem;
  }

  .sm\\:tw-py-0 {
    padding-top: 0px;
    padding-bottom: 0px;
  }

  .sm\\:tw-py-4 {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  .sm\\:tw-py-5 {
    padding-top: 1.25rem;
    padding-bottom: 1.25rem;
  }

  .sm\\:tw-pl-14 {
    padding-left: 3.5rem;
  }

  .sm\\:tw-text-left {
    text-align: left;
  }
}

@media (min-width: 768px) {

  .md\\:tw-inline {
    display: inline;
  }

  .md\\:tw-flex {
    display: flex;
  }

  .md\\:tw-table-cell {
    display: table-cell;
  }

  .md\\:tw-h-8 {
    height: 2rem;
  }

  .md\\:tw-w-8 {
    width: 2rem;
  }

  .md\\:tw-w-\\[200px\\] {
    width: 200px;
  }

  .md\\:tw-grow-0 {
    flex-grow: 0;
  }

  .md\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .md\\:tw-gap-8 {
    gap: 2rem;
  }

  .md\\:tw-text-base {
    font-size: 1rem;
    line-height: 1.5rem;
  }
}

@media (min-width: 1024px) {

  .lg\\:tw-sr-only {
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

  .lg\\:tw-col-span-2 {
    grid-column: span 2 / span 2;
  }

  .lg\\:tw-flex {
    display: flex;
  }

  .lg\\:tw-w-\\[336px\\] {
    width: 336px;
  }

  .lg\\:tw-grid-cols-2 {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .lg\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .lg\\:tw-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
  }
}

@media (min-width: 1280px) {

  .xl\\:tw-not-sr-only {
    position: static;
    width: auto;
    height: auto;
    padding: 0;
    margin: 0;
    overflow: visible;
    clip: auto;
    white-space: normal;
  }

  .xl\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .xl\\:tw-grid-cols-4 {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .xl\\:tw-whitespace-nowrap {
    white-space: nowrap;
  }
}

@media (prefers-color-scheme: dark) {

  .dark\\:tw--rotate-90 {
    --tw-rotate: -90deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-rotate-0 {
    --tw-rotate: 0deg;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-0 {
    --tw-scale-x: 0;
    --tw-scale-y: 0;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-scale-100 {
    --tw-scale-x: 1;
    --tw-scale-y: 1;
    transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
  }

  .dark\\:tw-border-destructive {
    border-color: hsl(var(--destructive));
  }
}

.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:tw-pe-0:has([role=checkbox]) {
  padding-inline-end: 0px;
}

.\\[\\&\\>span\\]\\:tw-line-clamp-1>span {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.\\[\\&\\>svg\\+div\\]\\:tw-translate-y-\\[-3px\\]>svg+div {
  --tw-translate-y: -3px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.\\[\\&\\>svg\\]\\:tw-absolute>svg {
  position: absolute;
}

.\\[\\&\\>svg\\]\\:tw-left-4>svg {
  left: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-top-4>svg {
  top: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}

.\\[\\&\\>svg\\~\\*\\]\\:tw-pl-7>svg~* {
  padding-left: 1.75rem;
}

.\\[\\&\\>tr\\]\\:last\\:tw-border-b-0:last-child>tr {
  border-bottom-width: 0px;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-px-2 [cmdk-group-heading] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-py-1\\.5 [cmdk-group-heading] {
  padding-top: 0.375rem;
  padding-bottom: 0.375rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-xs [cmdk-group-heading] {
  font-size: 0.75rem;
  line-height: 1rem;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-font-medium [cmdk-group-heading] {
  font-weight: 500;
}

.\\[\\&_\\[cmdk-group-heading\\]\\]\\:tw-text-muted-foreground [cmdk-group-heading] {
  color: hsl(var(--muted-foreground));
}

.\\[\\&_\\[cmdk-group\\]\\:not\\(\\[hidden\\]\\)_\\~\\[cmdk-group\\]\\]\\:tw-pt-0 [cmdk-group]:not([hidden]) ~[cmdk-group] {
  padding-top: 0px;
}

.\\[\\&_\\[cmdk-group\\]\\]\\:tw-px-2 [cmdk-group] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-h-5 [cmdk-input-wrapper] svg {
  height: 1.25rem;
}

.\\[\\&_\\[cmdk-input-wrapper\\]_svg\\]\\:tw-w-5 [cmdk-input-wrapper] svg {
  width: 1.25rem;
}

.\\[\\&_\\[cmdk-input\\]\\]\\:tw-h-12 [cmdk-input] {
  height: 3rem;
}

.\\[\\&_\\[cmdk-item\\]\\]\\:tw-px-2 [cmdk-item] {
  padding-left: 0.5rem;
  padding-right: 0.5rem;
}

.\\[\\&_\\[cmdk-item\\]\\]\\:tw-py-3 [cmdk-item] {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-h-5 [cmdk-item] svg {
  height: 1.25rem;
}

.\\[\\&_\\[cmdk-item\\]_svg\\]\\:tw-w-5 [cmdk-item] svg {
  width: 1.25rem;
}

.\\[\\&_p\\]\\:tw-leading-relaxed p {
  line-height: 1.625;
}

.\\[\\&_tr\\:last-child\\]\\:tw-border-0 tr:last-child {
  border-width: 0px;
}

.\\[\\&_tr\\]\\:tw-border-b tr {
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
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
  km as Alert,
  Em as AlertDescription,
  Nm as AlertTitle,
  dg as BOOK_SELECTOR_STRING_KEYS,
  cg as BookChapterControl,
  ed as BookSelectionMode,
  pg as BookSelector,
  ve as Button,
  Tm as Card,
  Rm as CardContent,
  Om as CardDescription,
  Pm as CardFooter,
  Sm as CardHeader,
  Cm as CardTitle,
  Qc as ChapterRangeSelector,
  qi as Checkbox,
  Eg as Checklist,
  ca as ComboBox,
  ld as DataTable,
  _g as DisableButton,
  vo as DropdownMenu,
  yo as DropdownMenuCheckboxItem,
  cr as DropdownMenuContent,
  Oc as DropdownMenuGroup,
  Ri as DropdownMenuItem,
  Lh as DropdownMenuItemType,
  On as DropdownMenuLabel,
  ig as DropdownMenuPortal,
  lg as DropdownMenuRadioGroup,
  Pi as DropdownMenuRadioItem,
  dr as DropdownMenuSeparator,
  $c as DropdownMenuShortcut,
  sg as DropdownMenuSub,
  Pc as DropdownMenuSubContent,
  Rc as DropdownMenuSubTrigger,
  Oi as DropdownMenuTrigger,
  $g as EnableButton,
  Vh as FilterButton,
  Dg as FilterDropdown,
  jg as Footer,
  gm as GridMenu,
  ym as HamburgerMenuButton,
  ug as INVENTORY_STRING_KEYS,
  Tg as IconButton,
  Cn as Input,
  Pg as InstallButton,
  fg as Inventory,
  Ze as Label,
  Ag as MarkdownRenderer,
  js as MenuItem,
  Bg as MoreInfo,
  bg as NavigationContentSearch,
  Mg as NoExtensionsFound,
  $i as RadioGroup,
  no as RadioGroupItem,
  vg as ScriptureResultsViewer,
  yg as ScrollGroupSelector,
  wd as SearchBar,
  yn as Select,
  Ft as SelectContent,
  nd as SelectGroup,
  Ue as SelectItem,
  rd as SelectLabel,
  Li as SelectScrollDownButton,
  Vi as SelectScrollUpButton,
  od as SelectSeparator,
  zt as SelectTrigger,
  xn as SelectValue,
  Yi as Separator,
  xg as SettingsList,
  Ng as SettingsListHeader,
  kg as SettingsListItem,
  $m as Slider,
  Og as Sonner,
  Dn as Spinner,
  _m as Switch,
  pr as Table,
  fr as TableBody,
  sd as TableCaption,
  Ut as TableCell,
  id as TableFooter,
  kn as TableHead,
  ur as TableHeader,
  lt as TableRow,
  Rg as Tabs,
  Dm as TabsContent,
  Im as TabsList,
  Am as TabsTrigger,
  Sg as TextField,
  Ui as ToggleGroup,
  Wn as ToggleGroupItem,
  Cg as Toolbar,
  Ig as UpdateButton,
  zh as VersionHistory,
  Gi as VerticalTabs,
  Xi as VerticalTabsContent,
  Hi as VerticalTabsList,
  md as VerticalTabsTrigger,
  Fc as buttonVariants,
  R as cn,
  wr as getSortingIcon,
  hg as inventoryCountColumn,
  wg as inventoryItemColumn,
  mg as inventoryRelatedItemColumn,
  gg as inventoryStatusColumn,
  Ug as sonner,
  Vg as useEvent,
  Lg as useEventAsync,
  fo as usePromise
};
//# sourceMappingURL=index.js.map
