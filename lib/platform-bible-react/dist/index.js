import hl, { jsx as l, jsxs as T, Fragment as dt } from "react/jsx-runtime";
import * as M from "react";
import D, { forwardRef as or, useCallback as Se, useState as fe, useRef as kt, useEffect as Xe, useLayoutEffect as oa, useMemo as ct } from "react";
import { History as gl, ChevronRight as ci, Check as ar, Circle as di, ArrowDownWideNarrow as bl, Clock as vl, Bookmark as yl, X as xl, Search as kl, ChevronsUpDown as Nl, FilterIcon as El, ChevronDown as ir, ChevronUp as Tl, ArrowLeftIcon as Sl, ChevronLeftIcon as Cl, ChevronRightIcon as Ol, ArrowRightIcon as Rl, ArrowUpIcon as Pl, ArrowDownIcon as _l, ArrowUpDownIcon as $l, CircleCheckIcon as Il, CircleXIcon as Al, CircleHelpIcon as Ml, ChevronLeft as Dl, LoaderCircle as Bl, Download as jl, Filter as Vl, User as Ll, Link as zl, CircleHelp as Fl } from "lucide-react";
import Nt, { clsx as Gl } from "clsx";
import { extendTailwindMerge as Ul } from "tailwind-merge";
import * as we from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Hl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Xl, formatScrRef as $r, compareScrRefs as Jr, scrRefToBBBCCCVVV as Ir, getLocalizeKeyForScrollGroupId as ue, NumberFormat as Wl, formatBytes as Yl } from "platform-bible-utils";
import { Slot as ql } from "@radix-ui/react-slot";
import { cva as sr } from "class-variance-authority";
import * as pi from "@radix-ui/react-label";
import * as vn from "@radix-ui/react-radio-group";
import * as yn from "@radix-ui/react-popover";
import { Command as Re } from "cmdk";
import * as We from "@radix-ui/react-dialog";
import { useReactTable as ui, getCoreRowModel as fi, getPaginationRowModel as Kl, getSortedRowModel as wi, getFilteredRowModel as Jl, flexRender as wn, getExpandedRowModel as Zl, getGroupedRowModel as Ql } from "@tanstack/react-table";
import * as be from "@radix-ui/react-select";
import * as lr from "@radix-ui/react-toggle-group";
import * as mi from "@radix-ui/react-toggle";
import * as Pe from "@radix-ui/react-tabs";
import * as hi from "@radix-ui/react-separator";
import * as Zr from "@radix-ui/react-checkbox";
import ec, { ThemeContext as tc, internal_processStyles as nc } from "@mui/styled-engine";
import { MenuItem as rc, ListItemText as oc, ListItemIcon as gi, Menu as ac, Grid as bi, List as ic, IconButton as vi, Drawer as sc, AppBar as lc, Toolbar as cc } from "@mui/material";
import * as dc from "react-dom";
import zn from "react-dom";
import { Toaster as pc } from "sonner";
import { toast as zg } from "sonner";
import * as dn from "@radix-ui/react-slider";
import * as Qr from "@radix-ui/react-switch";
const uc = Ul({ prefix: "tw-" });
function R(...e) {
  return uc(Gl(e));
}
const On = D.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ l(
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
On.displayName = "Input";
const fc = or(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ T("div", { className: "tw-relative", children: [
    /* @__PURE__ */ l(
      On,
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
    /* @__PURE__ */ l(
      gl,
      {
        className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var wc = Object.defineProperty, mc = (e, t, n) => t in e ? wc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ne = (e, t, n) => mc(e, typeof t != "symbol" ? t + "" : t, n);
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
], wo = [
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
], yi = [
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
], aa = Tc();
function Jt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in aa ? aa[e] : 0;
}
function mo(e) {
  return Jt(e) > 0;
}
function hc(e) {
  const t = typeof e == "string" ? Jt(e) : e;
  return t >= 40 && t <= 66;
}
function gc(e) {
  return (typeof e == "string" ? Jt(e) : e) <= 39;
}
function xi(e) {
  return e <= 66;
}
function bc(e) {
  const t = typeof e == "string" ? Jt(e) : e;
  return Ei(t) && !xi(t);
}
function* vc() {
  for (let e = 1; e <= Tt.length; e++)
    yield e;
}
const yc = 1, ki = Tt.length;
function xc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function ho(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Tt.length ? t : Tt[n];
}
function Ni(e) {
  return e <= 0 || e > ki ? "******" : yi[e - 1];
}
function kc(e) {
  return Ni(Jt(e));
}
function Ei(e) {
  const t = typeof e == "number" ? ho(e) : e;
  return mo(t) && !wo.includes(t);
}
function Nc(e) {
  const t = typeof e == "number" ? ho(e) : e;
  return mo(t) && wo.includes(t);
}
function Ec(e) {
  return yi[e - 1].includes("*obsolete*");
}
function Tc() {
  const e = {};
  for (let t = 0; t < Tt.length; t++)
    e[Tt[t]] = t + 1;
  return e;
}
const de = {
  allBookIds: Tt,
  nonCanonicalIds: wo,
  bookIdToNumber: Jt,
  isBookIdValid: mo,
  isBookNT: hc,
  isBookOT: gc,
  isBookOTNT: xi,
  isBookDC: bc,
  allBookNumbers: vc,
  firstBook: yc,
  lastBook: ki,
  extraBooks: xc,
  bookNumberToId: ho,
  bookNumberToEnglishName: Ni,
  bookIdToEnglishName: kc,
  isCanonical: Ei,
  isExtraMaterial: Nc,
  isObsolete: Ec
};
var Ue = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ue || {});
const $e = class {
  // private versInfo: Versification;
  constructor(t) {
    if (ne(this, "name"), ne(this, "fullPath"), ne(this, "isPresent"), ne(this, "hasVerseSegments"), ne(this, "isCustomized"), ne(this, "baseVersification"), ne(this, "scriptureBooks"), ne(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Ue[t]) : (this._type = t, this.name = Ue[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
ne($e, "Original", new $e(Ue.Original)), ne($e, "Septuagint", new $e(Ue.Septuagint)), ne($e, "Vulgate", new $e(Ue.Vulgate)), ne($e, "English", new $e(Ue.English)), ne($e, "RussianProtestant", new $e(Ue.RussianProtestant)), ne($e, "RussianOrthodox", new $e(Ue.RussianOrthodox));
let ht = $e;
function ia(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Ti = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ti || {});
const Te = class oe {
  constructor(t, n, r, o) {
    if (ne(this, "firstChapter"), ne(this, "lastChapter"), ne(this, "lastVerse"), ne(this, "hasSegmentsDefined"), ne(this, "text"), ne(this, "BBBCCCVVVS"), ne(this, "longHashCode"), ne(this, "versification"), ne(this, "rtlMark", "‏"), ne(this, "_bookNum", 0), ne(this, "_chapterNum", 0), ne(this, "_verseNum", 0), ne(this, "_verse"), r == null && o == null)
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
      if (r instanceof rn)
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
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = t, s = a || o.toString();
    let c;
    return i && (c = new ht(i)), n ? new oe(n, r.toString(), s, c) : new oe();
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
          this.versification = new ht(Ue[i]);
        } catch {
          throw new rn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new rn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || de.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(r[1]))
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
    const o = [], a = ia(this._verse, r);
    for (const i of a.map((s) => ia(s, n))) {
      const s = this.clone();
      s.verse = i[0];
      const c = s.verseNum;
      if (o.push(s), i.length > 1) {
        const u = this.clone();
        if (u.verse = i[1], !t)
          for (let f = c + 1; f < u.verseNum; f++) {
            const b = new oe(
              this._bookNum,
              this._chapterNum,
              f,
              this.versification
            );
            this.isExcluded || o.push(b);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > de.lastBook ? 2 : (de.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = oe.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = de.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
ne(Te, "defaultVersification", ht.English), ne(Te, "verseRangeSeparator", "-"), ne(Te, "verseSequenceIndicator", ","), ne(Te, "verseRangeSeparators", [Te.verseRangeSeparator]), ne(Te, "verseSequenceIndicators", [Te.verseSequenceIndicator]), ne(Te, "chapterDigitShifter", 1e3), ne(Te, "bookDigitShifter", Te.chapterDigitShifter * Te.chapterDigitShifter), ne(Te, "bcvMaxValue", Te.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ne(Te, "ValidStatusType", Ti);
let rn = class extends Error {
};
const go = we.Root, Si = we.Trigger, Sc = we.Group, ag = we.Portal, ig = we.Sub, sg = we.RadioGroup, Cc = D.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ T(
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
      /* @__PURE__ */ l(ci, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Cc.displayName = we.SubTrigger.displayName;
const Oc = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Oc.displayName = we.SubContent.displayName;
const cr = D.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ l(we.Portal, { children: /* @__PURE__ */ l(
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
const Ci = D.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ l(
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
Ci.displayName = we.Item.displayName;
const bo = D.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ T(
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
      /* @__PURE__ */ l("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ l(we.ItemIndicator, { children: /* @__PURE__ */ l(ar, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
bo.displayName = we.CheckboxItem.displayName;
const Oi = D.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ T(
  we.RadioItem,
  {
    ref: r,
    className: R(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ l("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ l(we.ItemIndicator, { children: /* @__PURE__ */ l(di, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
Oi.displayName = we.RadioItem.displayName;
const Rn = D.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ l(
  we.Label,
  {
    ref: r,
    className: R("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
Rn.displayName = we.Label.displayName;
const dr = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  we.Separator,
  {
    ref: n,
    className: R("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
dr.displayName = we.Separator.displayName;
function Rc({ className: e, ...t }) {
  return /* @__PURE__ */ l(
    "span",
    {
      className: R("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
Rc.displayName = "DropdownMenuShortcut";
const Pc = or(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, s) => /* @__PURE__ */ T(
    Ci,
    {
      ref: s,
      textValue: e,
      className: R("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": n
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
        /* @__PURE__ */ l(
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
        n && /* @__PURE__ */ l("div", { children: i })
      ]
    },
    e
  )
);
function _c({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (s, c) => c + 1), i = Se(
    (s) => {
      o(s);
    },
    [o]
  );
  return /* @__PURE__ */ l("div", { className: R("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((s) => /* @__PURE__ */ l(
    "div",
    {
      className: R(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": s === n,
          "tw-bg-amber-200": s === r
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
function $c({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ T(Rn, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ l("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ l(
        bl,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ l(
        vl,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ l(
        yl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const mn = de.allBookIds, Ic = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, sa = ["OT", "NT", "DC"], Ac = 32 + 32 + 32, Mc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Dc = (e) => ({
  OT: mn.filter((n) => de.isBookOT(n)),
  NT: mn.filter((n) => de.isBookNT(n)),
  DC: mn.filter((n) => de.isBookDC(n))
})[e], on = (e) => Xl(de.bookIdToNumber(e));
function Bc() {
  return mn.map((t) => de.bookIdToEnglishName(t));
}
function jc(e) {
  return Bc().includes(e);
}
function Vc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (jc(t))
    return mn.find((r) => de.bookIdToEnglishName(r) === t);
}
function lg({ scrRef: e, handleSubmit: t }) {
  const [n, r] = fe(""), [o, a] = fe(
    de.bookNumberToId(e.bookNum)
  ), [i, s] = fe(e.chapterNum ?? 0), [c, u] = fe(
    de.bookNumberToId(e.bookNum)
  ), [f, b] = fe(!1), [g, d] = fe(f), m = kt(void 0), p = kt(void 0), h = kt(void 0), y = Se(
    (N) => Dc(N).filter((j) => {
      const V = de.bookIdToEnglishName(j).toLowerCase(), Z = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return V.includes(Z) || // Match book name
      j.toLowerCase().includes(Z);
    }),
    [n]
  ), C = (N) => {
    r(N);
  }, k = kt(!1), x = Se((N) => {
    if (k.current) {
      k.current = !1;
      return;
    }
    b(N);
  }, []), v = Se(
    (N, j, V, Z) => {
      if (s(
        de.bookNumberToId(e.bookNum) !== N ? 1 : e.chapterNum
      ), j || on(N) === -1) {
        t({
          bookNum: de.bookIdToNumber(N),
          chapterNum: V || 1,
          verseNum: Z || 1
        }), b(!1), r("");
        return;
      }
      a(o !== N ? N : ""), b(!j);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (N) => {
    N <= 0 || N > on(o) || v(o, !0, N);
  }, _ = Se(() => {
    Mc.forEach((N) => {
      const j = n.match(N);
      if (j) {
        const [V, Z = void 0, K = void 0] = j.slice(1), H = Vc(V);
        (de.isBookIdValid(V) || H) && v(
          H ?? V,
          !0,
          Z ? parseInt(Z, 10) : 1,
          K ? parseInt(K, 10) : 1
        );
      }
    });
  }, [v, n]), B = Se(
    (N) => {
      f ? (N.key === "ArrowDown" || N.key === "ArrowUp") && (typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null ? h.current.focus() : typeof p < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      p.current !== null && p.current.focus(), N.preventDefault()) : b(!0);
    },
    [f]
  ), S = (N) => {
    const { key: j } = N;
    j === "ArrowRight" || j === "ArrowLeft" || j === "ArrowDown" || j === "ArrowUp" || j === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: j })), m.current.focus());
  }, P = (N) => {
    const { key: j } = N;
    if (c === o) {
      if (j === "Enter") {
        N.preventDefault(), v(o, !0, i);
        return;
      }
      let V = 0;
      if (j === "ArrowRight")
        if (i < on(c))
          V = 1;
        else {
          N.preventDefault();
          return;
        }
      else if (j === "ArrowLeft")
        if (i > 1)
          V = -1;
        else {
          N.preventDefault();
          return;
        }
      else
        j === "ArrowDown" ? V = 6 : j === "ArrowUp" && (V = -6);
      i + V <= 0 || i + V > on(c) ? s(0) : V !== 0 && (s(i + V), N.preventDefault());
    }
  };
  return Xe(() => {
    o === c ? o === de.bookNumberToId(e.bookNum) ? s(e.chapterNum) : s(1) : s(0);
  }, [c, e.bookNum, e.chapterNum, o]), oa(() => {
    d(f);
  }, [f]), oa(() => {
    const N = setTimeout(() => {
      if (g && p.current && h.current) {
        const V = h.current.offsetTop - Ac;
        p.current.scrollTo({ top: V, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(N);
    };
  }, [g]), /* @__PURE__ */ l("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ T(go, { modal: !1, open: f, onOpenChange: x, children: [
    /* @__PURE__ */ l(Si, { asChild: !0, children: /* @__PURE__ */ l(
      fc,
      {
        ref: m,
        value: n,
        handleSearch: C,
        handleKeyDown: B,
        handleOnClick: () => {
          a(de.bookNumberToId(e.bookNum)), u(de.bookNumberToId(e.bookNum)), s(e.chapterNum > 0 ? e.chapterNum : 0), b(!0), m.current.focus();
        },
        onFocus: () => {
          k.current = !0;
        },
        handleSubmit: _,
        placeholder: `${de.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ T(
      cr,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: S,
        align: "start",
        ref: p,
        children: [
          /* @__PURE__ */ l(
            $c,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          sa.map(
            (N, j) => y(N).length > 0 && /* @__PURE__ */ T("div", { children: [
              /* @__PURE__ */ l(Rn, { className: "tw-font-semibold tw-text-foreground/80", children: Ic[N] }),
              y(N).map((V) => /* @__PURE__ */ l("div", { children: /* @__PURE__ */ l(
                Pc,
                {
                  bookId: V,
                  handleSelectBook: () => v(V, !1),
                  isSelected: o === V,
                  handleHighlightBook: () => u(V),
                  handleKeyDown: P,
                  bookType: N,
                  ref: (Z) => {
                    o === V && (h.current = Z);
                  },
                  children: /* @__PURE__ */ l(
                    _c,
                    {
                      handleSelectChapter: O,
                      endChapter: on(V),
                      activeChapter: e.bookNum === de.bookIdToNumber(V) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (Z) => {
                        s(Z);
                      }
                    }
                  )
                }
              ) }, V)),
              sa.length - 1 !== j ? /* @__PURE__ */ l(dr, {}) : void 0
            ] }, N)
          )
        ]
      }
    )
  ] }) });
}
const Lc = sr(
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
), ye = D.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ l(r ? ql : "button", { className: R(Lc({ variant: t, size: n, className: e })), ref: a, ...o })
);
ye.displayName = "Button";
const zc = sr(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Ze = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(pi.Root, { ref: n, className: R("pr-twp", zc(), e), ...t }));
Ze.displayName = pi.Root.displayName;
const Ri = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  vn.Root,
  {
    className: R("pr-twp tw-grid tw-gap-2", e),
    ...t,
    ref: n
  }
));
Ri.displayName = vn.Root.displayName;
const eo = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  vn.Item,
  {
    ref: n,
    className: R(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ l(vn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ l(di, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
eo.displayName = vn.Item.displayName;
const Fc = yn.Root, Gc = yn.Trigger, Pi = D.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ l(yn.Portal, { children: /* @__PURE__ */ l(
  yn.Content,
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
Pi.displayName = yn.Content.displayName;
const Uc = We.Portal, _i = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
_i.displayName = We.Overlay.displayName;
const Hc = D.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ T(Uc, { children: [
  /* @__PURE__ */ l(_i, {}),
  /* @__PURE__ */ T(
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
        /* @__PURE__ */ T(We.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ l(xl, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ l("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Hc.displayName = We.Content.displayName;
const Xc = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  We.Title,
  {
    ref: n,
    className: R("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
Xc.displayName = We.Title.displayName;
const Wc = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  We.Description,
  {
    ref: n,
    className: R("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Wc.displayName = We.Description.displayName;
const $i = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
$i.displayName = Re.displayName;
const Ii = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ l(kl, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ l(
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
Ii.displayName = Re.Input.displayName;
const Ai = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Re.List,
  {
    ref: n,
    className: R("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
Ai.displayName = Re.List.displayName;
const Mi = D.forwardRef((e, t) => /* @__PURE__ */ l(Re.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
Mi.displayName = Re.Empty.displayName;
const Yc = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Yc.displayName = Re.Group.displayName;
const qc = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Re.Separator,
  {
    ref: n,
    className: R("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
qc.displayName = Re.Separator.displayName;
const Di = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Di.displayName = Re.Item.displayName;
function Kc(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function la({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: a = Kc,
  buttonPlaceholder: i = "",
  textPlaceholder: s = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: u = "outline",
  dir: f = "ltr",
  isDisabled: b = !1,
  ...g
}) {
  const [d, m] = fe(!1);
  return /* @__PURE__ */ T(Fc, { open: d, onOpenChange: m, ...g, children: [
    /* @__PURE__ */ l(Gc, { asChild: !0, children: /* @__PURE__ */ T(
      ye,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": d,
        id: e,
        className: R("tw-w-[200px] tw-justify-between", n),
        disabled: b,
        children: [
          /* @__PURE__ */ l("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: r ? a(r) : i }),
          /* @__PURE__ */ l(Nl, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ l(Pi, { className: "tw-w-[200px] tw-p-0", dir: f, children: /* @__PURE__ */ T($i, { children: [
      /* @__PURE__ */ l(Ii, { dir: f, placeholder: s, className: "tw-text-inherit" }),
      /* @__PURE__ */ l(Mi, { children: c }),
      /* @__PURE__ */ l(Ai, { children: t.map((p) => /* @__PURE__ */ T(
        Di,
        {
          value: a(p),
          onSelect: () => {
            o(p), m(!1);
          },
          children: [
            /* @__PURE__ */ l(
              ar,
              {
                className: R("tw-me-2 tw-h-4 tw-w-4", {
                  "tw-opacity-0": !r || a(r) !== a(p)
                })
              }
            ),
            a(p)
          ]
        },
        a(p)
      )) })
    ] }) })
  ] });
}
function Jc({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = ct(
    () => Array.from({ length: a }, (u, f) => f + 1),
    [a]
  );
  return /* @__PURE__ */ T(dt, { children: [
    /* @__PURE__ */ l(Ze, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ l(
      la,
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u > t && r(u);
        },
        className: "tw-ml-2 tw-mr-2 tw-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ l(Ze, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ l(
      la,
      {
        isDisabled: o,
        onChange: (u) => {
          r(u), u < e && n(u);
        },
        className: "tw-ml-2 tw-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var Zc = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Zc || {});
const cg = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Ar = (e, t) => e[t] ?? t;
function dg({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: s,
  handleSelectStartChapter: c,
  localizedStrings: u
}) {
  const f = Ar(u, "%webView_bookSelector_currentBook%"), b = Ar(u, "%webView_bookSelector_choose%"), g = Ar(u, "%webView_bookSelector_chooseBooks%"), [d, m] = fe(
    "current book"
    /* CURRENT_BOOK */
  ), p = (h) => {
    m(h), e(h);
  };
  return /* @__PURE__ */ l(
    Ri,
    {
      className: "pr-twp tw-flex",
      value: d,
      onValueChange: (h) => p(h),
      children: /* @__PURE__ */ T("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ T("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ l(eo, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ l(Ze, { className: "tw-ml-1", children: f })
          ] }),
          /* @__PURE__ */ l(Ze, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ l(
            Jc,
            {
              isDisabled: d === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: s,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ T("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ l(eo, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ l(Ze, { className: "tw-ml-1", children: g })
          ] }),
          /* @__PURE__ */ l(Ze, { className: "tw-flex tw-items-center", children: r.map((h) => de.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ l(
            ye,
            {
              disabled: d === "current book",
              onClick: () => n(),
              children: b
            }
          )
        ] })
      ] })
    }
  );
}
function Qc({ table: e }) {
  return /* @__PURE__ */ T(go, { children: [
    /* @__PURE__ */ l(Hl, { asChild: !0, children: /* @__PURE__ */ T(ye, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ l(El, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ T(cr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ l(Rn, { children: "Toggle columns" }),
      /* @__PURE__ */ l(dr, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ l(
        bo,
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
const xn = be.Root, ed = be.Group, kn = be.Value, Ft = D.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ T(
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
      /* @__PURE__ */ l(be.Icon, { asChild: !0, children: /* @__PURE__ */ l(ir, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
Ft.displayName = be.Trigger.displayName;
const Bi = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  be.ScrollUpButton,
  {
    ref: n,
    className: R("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ l(Tl, { className: "tw-h-4 tw-w-4" })
  }
));
Bi.displayName = be.ScrollUpButton.displayName;
const ji = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  be.ScrollDownButton,
  {
    ref: n,
    className: R("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ l(ir, { className: "tw-h-4 tw-w-4" })
  }
));
ji.displayName = be.ScrollDownButton.displayName;
const Gt = D.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ l(be.Portal, { children: /* @__PURE__ */ T(
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
      /* @__PURE__ */ l(Bi, {}),
      /* @__PURE__ */ l(
        be.Viewport,
        {
          className: R(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ l(ji, {})
    ]
  }
) }));
Gt.displayName = be.Content.displayName;
const td = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  be.Label,
  {
    ref: n,
    className: R("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
td.displayName = be.Label.displayName;
const Ge = D.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ T(
  be.Item,
  {
    ref: r,
    className: R(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ l("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ l(be.ItemIndicator, { children: /* @__PURE__ */ l(ar, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ l(be.ItemText, { children: t })
    ]
  }
));
Ge.displayName = be.Item.displayName;
const nd = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  be.Separator,
  {
    ref: n,
    className: R("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
nd.displayName = be.Separator.displayName;
function rd({ table: e }) {
  return /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ T("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ l("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ T(
        xn,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ l(Ft, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ l(kn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ l(Gt, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ l(Ge, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ T("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ l(Sl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ l(Cl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ l(Ol, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ l("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ l(Rl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const pr = D.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ l("div", { className: R("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !t }), children: /* @__PURE__ */ l(
  "table",
  {
    ref: r,
    className: R("tw-w-full tw-caption-bottom tw-text-sm", e),
    ...n
  }
) }));
pr.displayName = "Table";
const ur = D.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ l(
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
const fr = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("tbody", { ref: n, className: R("[&_tr:last-child]:tw-border-0", e), ...t }));
fr.displayName = "TableBody";
const od = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "tfoot",
  {
    ref: n,
    className: R("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
od.displayName = "TableFooter";
const lt = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
const Nn = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Nn.displayName = "TableHead";
const Ut = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "td",
  {
    ref: n,
    className: R("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
Ut.displayName = "TableCell";
const ad = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  "caption",
  {
    ref: n,
    className: R("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
ad.displayName = "TableCaption";
function id({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var h;
  const [s, c] = fe([]), [u, f] = fe([]), [b, g] = fe({}), [d, m] = fe({}), p = ui({
    data: t,
    columns: e,
    getCoreRowModel: fi(),
    ...n && { getPaginationRowModel: Kl() },
    onSortingChange: c,
    getSortedRowModel: wi(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Jl(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: m,
    state: {
      sorting: s,
      columnFilters: u,
      columnVisibility: b,
      rowSelection: d
    }
  });
  return /* @__PURE__ */ T("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ l(Qc, { table: p }),
    /* @__PURE__ */ T(pr, { stickyHeader: a, children: [
      /* @__PURE__ */ l(ur, { stickyHeader: a, children: p.getHeaderGroups().map((y) => /* @__PURE__ */ l(lt, { children: y.headers.map((C) => /* @__PURE__ */ l(Nn, { children: C.isPlaceholder ? void 0 : wn(C.column.columnDef.header, C.getContext()) }, C.id)) }, y.id)) }),
      /* @__PURE__ */ l(fr, { children: (h = p.getRowModel().rows) != null && h.length ? p.getRowModel().rows.map((y) => /* @__PURE__ */ l(
        lt,
        {
          onClick: () => i(y, p),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((C) => /* @__PURE__ */ l(Ut, { children: wn(C.column.columnDef.cell, C.getContext()) }, C.id))
        },
        y.id
      )) : /* @__PURE__ */ l(lt, { children: /* @__PURE__ */ l(Ut, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ l(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => p.previousPage(),
          disabled: !p.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ l(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => p.nextPage(),
          disabled: !p.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ l(rd, { table: p })
  ] });
}
const sd = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ca = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, da = (e, t, n, r) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = sd(e);
  let i = r.chapterNum, s = r.verseNum, c = 0;
  return a.forEach((u) => {
    u.startsWith("\\id") && (i = 0, s = 0), u.startsWith("\\c") && (i = ca(u), s = 0), u.startsWith("\\v") && (s = ca(u), i === 0 && (i = r.chapterNum));
    const f = n(u, t);
    for (let b = 0; b < f.length; b++) {
      const g = {
        reference: {
          ...r,
          chapterNum: i !== void 0 ? +i : -1,
          verseNum: s !== void 0 ? +s : -1
        },
        snippet: u,
        key: c
      };
      c += 1, o.push(g);
    }
  }), o;
};
function ld({
  selectedItem: e,
  text: t,
  extractItems: n,
  scriptureReference: r,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], s = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, u] = fe(
    da(t, e, n, r)
  );
  return Xe(
    () => u(da(t, e, n, r)),
    [t, e, r, n]
  ), /* @__PURE__ */ T(pr, { stickyHeader: !0, children: [
    /* @__PURE__ */ l(ur, { stickyHeader: !0, children: /* @__PURE__ */ T(lt, { children: [
      /* @__PURE__ */ l(Nn, { children: i }),
      /* @__PURE__ */ l(Nn, { children: s })
    ] }) }),
    /* @__PURE__ */ l(fr, { children: c.map((f) => /* @__PURE__ */ T(
      lt,
      {
        onClick: () => {
          o(f.reference);
        },
        children: [
          /* @__PURE__ */ l(Ut, { children: `${de.bookNumberToEnglishName(f.reference.bookNum)} ${f.reference.chapterNum}:${f.reference.verseNum}` }),
          /* @__PURE__ */ l(Ut, { children: f.snippet })
        ]
      },
      f.key
    )) })
  ] });
}
const pg = Object.freeze([
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
]), vo = (e) => e === "asc" ? /* @__PURE__ */ l(Pl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ l(_l, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ l($l, { className: "tw-ms-2 tw-h-4 tw-w-4" }), cd = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.item.includes(n))), r;
}, dd = (e, t, n) => {
  const r = [], o = t(e);
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = r.find((c) => c.item === i);
    if (s)
      s.count += 1;
    else {
      const c = {
        item: i,
        count: 1,
        status: n(i)
      };
      r.push(c);
    }
  }
  return r;
}, rt = (e, t) => e[t] ?? t;
function ug({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  extractItems: r,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: s,
  text: c,
  scope: u,
  onScopeChange: f,
  getColumns: b
}) {
  const g = rt(n, "%webView_inventory_all%"), d = rt(n, "%webView_inventory_approved%"), m = rt(n, "%webView_inventory_unapproved%"), p = rt(n, "%webView_inventory_unknown%"), h = rt(n, "%webView_inventory_scope_currentBook%"), y = rt(n, "%webView_inventory_scope_chapter%"), C = rt(n, "%webView_inventory_scope_verse%"), k = rt(n, "%webView_inventory_filter_text%"), [x, v] = fe([]), [O, _] = fe("all"), [B, S] = fe(""), [P, N] = fe(""), j = Se(
    (z, E) => {
      v((G) => {
        let F = [];
        return z.forEach((Y) => {
          F = G.map((U) => U.item === Y && U.status !== E ? { ...U, status: E } : U);
        }), F;
      });
      let I = [...o];
      z.forEach((G) => {
        E === "approved" ? I.includes(G) || I.push(G) : I = I.filter((F) => F !== G);
      }), a(I);
      let X = [...i];
      z.forEach((G) => {
        E === "unapproved" ? X.includes(G) || X.push(G) : X = X.filter(
          (F) => F !== G
        );
      }), s(X);
    },
    [o, a, i, s]
  ), V = Se(
    (z) => o.includes(z) ? "approved" : i.includes(z) ? "unapproved" : "unknown",
    [o, i]
  );
  Xe(() => {
    c && v(dd(c, r, V));
  }, [r, c, V]);
  const Z = ct(() => cd(x, O, B), [x, O, B]);
  Xe(() => {
    N("");
  }, [Z]);
  const K = (z, E) => {
    E.toggleAllRowsSelected(!1), z.toggleSelected(void 0), N(z.getValue("item"));
  }, H = ct(() => b(j), [b, j]), te = (z) => {
    if (z === "book" || z === "chapter" || z === "verse")
      f(z);
    else
      throw new Error(`Invalid scope value: ${z}`);
  }, ae = (z) => {
    if (z === "all" || z === "approved" || z === "unapproved" || z === "unknown")
      _(z);
    else
      throw new Error(`Invalid status filter value: ${z}`);
  };
  return /* @__PURE__ */ T("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ T("div", { className: "tw-flex", children: [
      /* @__PURE__ */ T(
        xn,
        {
          onValueChange: (z) => ae(z),
          defaultValue: O,
          children: [
            /* @__PURE__ */ l(Ft, { className: "tw-m-1", children: /* @__PURE__ */ l(kn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ T(Gt, { children: [
              /* @__PURE__ */ l(Ge, { value: "all", children: g }),
              /* @__PURE__ */ l(Ge, { value: "approved", children: d }),
              /* @__PURE__ */ l(Ge, { value: "unapproved", children: m }),
              /* @__PURE__ */ l(Ge, { value: "unknown", children: p })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ T(xn, { onValueChange: (z) => te(z), defaultValue: u, children: [
        /* @__PURE__ */ l(Ft, { className: "tw-m-1", children: /* @__PURE__ */ l(kn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ T(Gt, { children: [
          /* @__PURE__ */ l(Ge, { value: "book", children: h }),
          /* @__PURE__ */ l(Ge, { value: "chapter", children: y }),
          /* @__PURE__ */ l(Ge, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ l(
        On,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: k,
          value: B,
          onChange: (z) => {
            S(z.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ l(
      id,
      {
        columns: H,
        data: Z,
        onRowClickHandler: K,
        stickyHeader: !0
      }
    ) }),
    P !== "" && /* @__PURE__ */ l("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ l(
      ld,
      {
        selectedItem: P,
        text: c,
        extractItems: r,
        scriptureReference: e,
        setScriptureReference: (z) => t(z),
        localizedStrings: n
      }
    ) })
  ] });
}
const Vi = sr(
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
), pd = D.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ l(
  mi.Root,
  {
    ref: o,
    className: R(Vi({ variant: t, size: n, className: e })),
    ...r
  }
));
pd.displayName = mi.Root.displayName;
const Li = D.createContext({
  size: "default",
  variant: "default"
}), zi = D.forwardRef(({ className: e, variant: t, size: n, children: r, ...o }, a) => /* @__PURE__ */ l(
  lr.Root,
  {
    ref: a,
    className: R("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
    ...o,
    children: /* @__PURE__ */ l(
      Li.Provider,
      {
        value: { variant: t, size: n },
        children: r
      }
    )
  }
));
zi.displayName = lr.Root.displayName;
const Wn = D.forwardRef(({ className: e, children: t, variant: n, size: r, ...o }, a) => {
  const i = D.useContext(Li);
  return /* @__PURE__ */ l(
    lr.Item,
    {
      ref: a,
      className: R(
        Vi({
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
const fg = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ T(ye, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    vo(t.getIsSorted())
  ] })
}), wg = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ T(ye, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    vo(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), mg = (e, t) => ({
  accessorKey: "status",
  header: ({ column: n }) => /* @__PURE__ */ l("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ T(ye, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    vo(n.getIsSorted())
  ] }) }),
  cell: ({ row: n }) => {
    const r = n.getValue("status"), o = n.getValue("item");
    return /* @__PURE__ */ T(zi, { value: r, variant: "outline", type: "single", children: [
      /* @__PURE__ */ l(Wn, { onClick: () => t([o], "approved"), value: "approved", children: /* @__PURE__ */ l(Il, {}) }),
      /* @__PURE__ */ l(
        Wn,
        {
          onClick: () => t([o], "unapproved"),
          value: "unapproved",
          children: /* @__PURE__ */ l(Al, {})
        }
      ),
      /* @__PURE__ */ l(Wn, { onClick: () => t([o], "unknown"), value: "unknown", children: /* @__PURE__ */ l(Ml, {}) })
    ] });
  }
});
function ud({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ l(
    On,
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
const Fi = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Pe.Root,
  {
    orientation: "vertical",
    ref: n,
    className: R("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
    ...t
  }
));
Fi.displayName = Pe.List.displayName;
const Gi = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Gi.displayName = Pe.List.displayName;
const fd = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Pe.Trigger,
  {
    ref: n,
    ...t,
    className: R(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), Ui = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Pe.Content,
  {
    ref: n,
    className: R(
      "mt-2 tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Ui.displayName = Pe.Content.displayName;
function hg({
  tabList: e,
  onSearch: t,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ T("div", { className: "pr-twp", children: [
    /* @__PURE__ */ T("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ l("h1", { children: r }) : "",
      /* @__PURE__ */ l(
        ud,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ T(Fi, { dir: a, children: [
      /* @__PURE__ */ l(Gi, { children: e.map((i) => /* @__PURE__ */ l(fd, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ l(Ui, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const it = "scrBook", wd = "scrRef", gt = "source", md = "details", hd = "Scripture Reference", gd = "Scripture Book", Hi = "Type", bd = "Details";
function vd(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${de.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: it,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? hd,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? de.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === it ? $r(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Jr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => $r(r.start),
      id: wd,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : $r(o.start);
      },
      sortingFn: (r, o) => Jr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: gt,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Hi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: md,
      header: (e == null ? void 0 : e.detailsColumnName) ?? bd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const yd = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Jr(e.start, e.end) === 0 ? `${Ir(e.start)}+${t}` : `${Ir(e.start)}+${t}-${Ir(e.end)}+${n}`;
}, pa = (e) => `${yd({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function gg({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: s,
  direction: c = "ltr"
}) {
  const [u, f] = fe([]), [b, g] = fe([{ id: it, desc: !1 }]), [d, m] = fe({}), p = ct(
    () => e.flatMap((S) => S.data.map((P) => ({
      ...P,
      source: S.source
    }))),
    [e]
  ), h = ct(
    () => vd(
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
    u.includes(gt) ? g([
      { id: gt, desc: !1 },
      { id: it, desc: !1 }
    ]) : g([{ id: it, desc: !1 }]);
  }, [u]);
  const y = ui({
    data: p,
    columns: h,
    state: {
      grouping: u,
      sorting: b,
      rowSelection: d
    },
    onGroupingChange: f,
    onSortingChange: g,
    onRowSelectionChange: m,
    getExpandedRowModel: Zl(),
    getGroupedRowModel: Ql(),
    getCoreRowModel: fi(),
    getSortedRowModel: wi(),
    getRowId: pa,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Xe(() => {
    if (s) {
      const S = y.getSelectedRowModel().rowsById, P = Object.keys(S);
      if (P.length === 1) {
        const N = p.find((j) => pa(j) === P[0]) || void 0;
        N && s(N);
      }
    }
  }, [d, p, s, y]);
  const C = o ?? gd, k = a ?? Hi, x = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [it] },
    { label: `Group by ${k}`, value: [gt] },
    {
      label: `Group by ${C} and ${k}`,
      value: [it, gt]
    },
    {
      label: `Group by ${k} and ${C}`,
      value: [gt, it]
    }
  ], v = (S) => {
    f(JSON.parse(S));
  }, O = (S, P) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()(P);
  }, _ = (S, P) => S.getIsGrouped() ? "" : R("banded-row", P % 2 === 0 ? "even" : "odd"), B = (S, P, N) => {
    if (!((S == null ? void 0 : S.length) === 0 || P.depth < N.column.getGroupedIndex())) {
      if (P.getIsGrouped())
        switch (P.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (P.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ T("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ T(
      xn,
      {
        value: JSON.stringify(u),
        onValueChange: (S) => {
          v(S);
        },
        children: [
          /* @__PURE__ */ l(Ft, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ l(kn, {}) }),
          /* @__PURE__ */ l(Gt, { position: "item-aligned", children: /* @__PURE__ */ l(ed, { children: x.map((S) => /* @__PURE__ */ l(Ge, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ T(pr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ l(ur, { children: y.getHeaderGroups().map((S) => /* @__PURE__ */ l(lt, { children: S.headers.filter((P) => P.column.columnDef.header).map((P) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ l(Nn, { colSpan: P.colSpan, className: "top-0 tw-sticky", children: P.isPlaceholder ? void 0 : /* @__PURE__ */ T("div", { children: [
          P.column.getCanGroup() ? /* @__PURE__ */ l(
            ye,
            {
              variant: "ghost",
              title: `Toggle grouping by ${P.column.columnDef.header}`,
              onClick: P.column.getToggleGroupingHandler(),
              type: "button",
              children: P.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          wn(P.column.columnDef.header, P.getContext())
        ] }) }, P.id)
      )) }, S.id)) }),
      /* @__PURE__ */ l(fr, { children: y.getRowModel().rows.map((S, P) => /* @__PURE__ */ l(
        lt,
        {
          "data-state": S.getIsSelected() ? "selected" : "",
          className: R(_(S, P)),
          onClick: (N) => O(S, N),
          children: S.getVisibleCells().map((N) => {
            if (!(N.getIsPlaceholder() || N.column.columnDef.enableGrouping && !N.getIsGrouped() && (N.column.columnDef.id !== gt || !n)))
              return /* @__PURE__ */ l(
                Ut,
                {
                  className: R(
                    N.column.columnDef.id,
                    "tw-p-[1px]",
                    B(u, S, N)
                  ),
                  children: (() => N.getIsGrouped() ? /* @__PURE__ */ T(
                    ye,
                    {
                      variant: "link",
                      onClick: S.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        S.getIsExpanded() && /* @__PURE__ */ l(ir, {}),
                        !S.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ l(ci, {}) : /* @__PURE__ */ l(Dl, {})),
                        " ",
                        wn(N.column.columnDef.cell, N.getContext()),
                        " (",
                        S.subRows.length,
                        ")"
                      ]
                    }
                  ) : wn(N.column.columnDef.cell, N.getContext()))()
                },
                N.id
              );
          })
        },
        S.id
      )) })
    ] })
  ] });
}
const Mr = {
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
function bg({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Mr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([a, i]) => [
          a,
          a === i && a in Mr ? Mr[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ T(
    xn,
    {
      value: `${t}`,
      onValueChange: (a) => n(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ l(Ft, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ l(
          kn,
          {
            placeholder: o[ue(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ l(
          Gt,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ l(Ge, { value: `${a}`, children: o[ue(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const Xi = D.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ l(
  hi.Root,
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
Xi.displayName = hi.Root.displayName;
function vg({ children: e }) {
  return /* @__PURE__ */ l("div", { className: "pr-twp tw-grid", children: e });
}
function yg({
  primary: e,
  secondary: t,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ l("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ l("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ l("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ l("div", { children: n })
  ] });
}
function xg({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ T("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ l("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ l("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ l(Xi, {}) : ""
  ] });
}
const Wi = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Zr.Root,
  {
    ref: n,
    className: R(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ l(
      Zr.Indicator,
      {
        className: R("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ l(ar, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
Wi.displayName = Zr.Root.displayName;
function kg({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ l("div", { id: e, className: t, children: n.map((i) => /* @__PURE__ */ T("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ l(
      Wi,
      {
        className: "tw-mr-2 tw-align-middle",
        checked: r.includes(i),
        onCheckedChange: (s) => o(i, s)
      }
    ),
    /* @__PURE__ */ l(Ze, { children: a ? a(i) : i })
  ] }, i)) });
}
function xd(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function kd(e) {
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
var yo = {}, Yi = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Yi);
var Nd = Yi.exports, Dr = {};
function xo(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function $() {
  return $ = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, $.apply(this, arguments);
}
function yt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function qi(e) {
  if (!yt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = qi(e[n]);
  }), t;
}
function Qe(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? $({}, e) : e;
  return yt(e) && yt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (yt(t[o]) && o in e && yt(e[o]) ? r[o] = Qe(e[o], t[o], n) : n.clone ? r[o] = yt(t[o]) ? qi(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
var to = { exports: {} }, Fn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ua;
function Ed() {
  if (ua)
    return ie;
  ua = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function k(v) {
    if (typeof v == "object" && v !== null) {
      var O = v.$$typeof;
      switch (O) {
        case t:
          switch (v = v.type, v) {
            case c:
            case u:
            case r:
            case a:
            case o:
            case b:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case s:
                case f:
                case m:
                case d:
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
    return k(v) === u;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = u, ie.ContextConsumer = s, ie.ContextProvider = i, ie.Element = t, ie.ForwardRef = f, ie.Fragment = r, ie.Lazy = m, ie.Memo = d, ie.Portal = n, ie.Profiler = a, ie.StrictMode = o, ie.Suspense = b, ie.isAsyncMode = function(v) {
    return x(v) || k(v) === c;
  }, ie.isConcurrentMode = x, ie.isContextConsumer = function(v) {
    return k(v) === s;
  }, ie.isContextProvider = function(v) {
    return k(v) === i;
  }, ie.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === t;
  }, ie.isForwardRef = function(v) {
    return k(v) === f;
  }, ie.isFragment = function(v) {
    return k(v) === r;
  }, ie.isLazy = function(v) {
    return k(v) === m;
  }, ie.isMemo = function(v) {
    return k(v) === d;
  }, ie.isPortal = function(v) {
    return k(v) === n;
  }, ie.isProfiler = function(v) {
    return k(v) === a;
  }, ie.isStrictMode = function(v) {
    return k(v) === o;
  }, ie.isSuspense = function(v) {
    return k(v) === b;
  }, ie.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === u || v === a || v === o || v === b || v === g || typeof v == "object" && v !== null && (v.$$typeof === m || v.$$typeof === d || v.$$typeof === i || v.$$typeof === s || v.$$typeof === f || v.$$typeof === h || v.$$typeof === y || v.$$typeof === C || v.$$typeof === p);
  }, ie.typeOf = k, ie;
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
var fa;
function Td() {
  return fa || (fa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, m = e ? Symbol.for("react.lazy") : 60116, p = e ? Symbol.for("react.block") : 60121, h = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function k(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === r || A === u || A === a || A === o || A === b || A === g || typeof A == "object" && A !== null && (A.$$typeof === m || A.$$typeof === d || A.$$typeof === i || A.$$typeof === s || A.$$typeof === f || A.$$typeof === h || A.$$typeof === y || A.$$typeof === C || A.$$typeof === p);
    }
    function x(A) {
      if (typeof A == "object" && A !== null) {
        var ke = A.$$typeof;
        switch (ke) {
          case t:
            var L = A.type;
            switch (L) {
              case c:
              case u:
              case r:
              case a:
              case o:
              case b:
                return L;
              default:
                var xe = L && L.$$typeof;
                switch (xe) {
                  case s:
                  case f:
                  case m:
                  case d:
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
    var v = c, O = u, _ = s, B = i, S = t, P = f, N = r, j = m, V = d, Z = n, K = a, H = o, te = b, ae = !1;
    function z(A) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), E(A) || x(A) === c;
    }
    function E(A) {
      return x(A) === u;
    }
    function I(A) {
      return x(A) === s;
    }
    function X(A) {
      return x(A) === i;
    }
    function G(A) {
      return typeof A == "object" && A !== null && A.$$typeof === t;
    }
    function F(A) {
      return x(A) === f;
    }
    function Y(A) {
      return x(A) === r;
    }
    function U(A) {
      return x(A) === m;
    }
    function q(A) {
      return x(A) === d;
    }
    function W(A) {
      return x(A) === n;
    }
    function J(A) {
      return x(A) === a;
    }
    function Q(A) {
      return x(A) === o;
    }
    function pe(A) {
      return x(A) === b;
    }
    se.AsyncMode = v, se.ConcurrentMode = O, se.ContextConsumer = _, se.ContextProvider = B, se.Element = S, se.ForwardRef = P, se.Fragment = N, se.Lazy = j, se.Memo = V, se.Portal = Z, se.Profiler = K, se.StrictMode = H, se.Suspense = te, se.isAsyncMode = z, se.isConcurrentMode = E, se.isContextConsumer = I, se.isContextProvider = X, se.isElement = G, se.isForwardRef = F, se.isFragment = Y, se.isLazy = U, se.isMemo = q, se.isPortal = W, se.isProfiler = J, se.isStrictMode = Q, se.isSuspense = pe, se.isValidElementType = k, se.typeOf = x;
  }()), se;
}
var wa;
function Ki() {
  return wa || (wa = 1, process.env.NODE_ENV === "production" ? Fn.exports = Ed() : Fn.exports = Td()), Fn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Br, ma;
function Sd() {
  if (ma)
    return Br;
  ma = 1;
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
      for (var i = {}, s = 0; s < 10; s++)
        i["_" + String.fromCharCode(s)] = s;
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
  return Br = o() ? Object.assign : function(a, i) {
    for (var s, c = r(a), u, f = 1; f < arguments.length; f++) {
      s = Object(arguments[f]);
      for (var b in s)
        t.call(s, b) && (c[b] = s[b]);
      if (e) {
        u = e(s);
        for (var g = 0; g < u.length; g++)
          n.call(s, u[g]) && (c[u[g]] = s[u[g]]);
      }
    }
    return c;
  }, Br;
}
var jr, ha;
function ko() {
  if (ha)
    return jr;
  ha = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return jr = e, jr;
}
var Vr, ga;
function Ji() {
  return ga || (ga = 1, Vr = Function.call.bind(Object.prototype.hasOwnProperty)), Vr;
}
var Lr, ba;
function Cd() {
  if (ba)
    return Lr;
  ba = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = ko(), n = {}, r = Ji();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, s, c, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in a)
        if (r(a, f)) {
          var b;
          try {
            if (typeof a[f] != "function") {
              var g = Error(
                (c || "React class") + ": " + s + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw g.name = "Invariant Violation", g;
            }
            b = a[f](i, f, c, s, null, t);
          } catch (m) {
            b = m;
          }
          if (b && !(b instanceof Error) && e(
            (c || "React class") + ": type specification of " + s + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof b + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), b instanceof Error && !(b.message in n)) {
            n[b.message] = !0;
            var d = u ? u() : "";
            e(
              "Failed " + s + " type: " + b.message + (d ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Lr = o, Lr;
}
var zr, va;
function Od() {
  if (va)
    return zr;
  va = 1;
  var e = Ki(), t = Sd(), n = ko(), r = Ji(), o = Cd(), a = function() {
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
  return zr = function(s, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function b(E) {
      var I = E && (u && E[u] || E[f]);
      if (typeof I == "function")
        return I;
    }
    var g = "<<anonymous>>", d = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: C(),
      arrayOf: k,
      element: x(),
      elementType: v(),
      instanceOf: O,
      node: P(),
      objectOf: B,
      oneOf: _,
      oneOfType: S,
      shape: j,
      exact: V
    };
    function m(E, I) {
      return E === I ? E !== 0 || 1 / E === 1 / I : E !== E && I !== I;
    }
    function p(E, I) {
      this.message = E, this.data = I && typeof I == "object" ? I : {}, this.stack = "";
    }
    p.prototype = Error.prototype;
    function h(E) {
      if (process.env.NODE_ENV !== "production")
        var I = {}, X = 0;
      function G(Y, U, q, W, J, Q, pe) {
        if (W = W || g, Q = Q || q, pe !== n) {
          if (c) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ke = W + ":" + q;
            !I[ke] && // Avoid spamming the console because they are often not actionable except for lib authors
            X < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Q + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), I[ke] = !0, X++);
          }
        }
        return U[q] == null ? Y ? U[q] === null ? new p("The " + J + " `" + Q + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new p("The " + J + " `" + Q + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : E(U, q, W, J, Q);
      }
      var F = G.bind(null, !1);
      return F.isRequired = G.bind(null, !0), F;
    }
    function y(E) {
      function I(X, G, F, Y, U, q) {
        var W = X[G], J = H(W);
        if (J !== E) {
          var Q = te(W);
          return new p(
            "Invalid " + Y + " `" + U + "` of type " + ("`" + Q + "` supplied to `" + F + "`, expected ") + ("`" + E + "`."),
            { expectedType: E }
          );
        }
        return null;
      }
      return h(I);
    }
    function C() {
      return h(i);
    }
    function k(E) {
      function I(X, G, F, Y, U) {
        if (typeof E != "function")
          return new p("Property `" + U + "` of component `" + F + "` has invalid PropType notation inside arrayOf.");
        var q = X[G];
        if (!Array.isArray(q)) {
          var W = H(q);
          return new p("Invalid " + Y + " `" + U + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected an array."));
        }
        for (var J = 0; J < q.length; J++) {
          var Q = E(q, J, F, Y, U + "[" + J + "]", n);
          if (Q instanceof Error)
            return Q;
        }
        return null;
      }
      return h(I);
    }
    function x() {
      function E(I, X, G, F, Y) {
        var U = I[X];
        if (!s(U)) {
          var q = H(U);
          return new p("Invalid " + F + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + G + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(E);
    }
    function v() {
      function E(I, X, G, F, Y) {
        var U = I[X];
        if (!e.isValidElementType(U)) {
          var q = H(U);
          return new p("Invalid " + F + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + G + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(E);
    }
    function O(E) {
      function I(X, G, F, Y, U) {
        if (!(X[G] instanceof E)) {
          var q = E.name || g, W = z(X[G]);
          return new p("Invalid " + Y + " `" + U + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return h(I);
    }
    function _(E) {
      if (!Array.isArray(E))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function I(X, G, F, Y, U) {
        for (var q = X[G], W = 0; W < E.length; W++)
          if (m(q, E[W]))
            return null;
        var J = JSON.stringify(E, function(pe, A) {
          var ke = te(A);
          return ke === "symbol" ? String(A) : A;
        });
        return new p("Invalid " + Y + " `" + U + "` of value `" + String(q) + "` " + ("supplied to `" + F + "`, expected one of " + J + "."));
      }
      return h(I);
    }
    function B(E) {
      function I(X, G, F, Y, U) {
        if (typeof E != "function")
          return new p("Property `" + U + "` of component `" + F + "` has invalid PropType notation inside objectOf.");
        var q = X[G], W = H(q);
        if (W !== "object")
          return new p("Invalid " + Y + " `" + U + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected an object."));
        for (var J in q)
          if (r(q, J)) {
            var Q = E(q, J, F, Y, U + "." + J, n);
            if (Q instanceof Error)
              return Q;
          }
        return null;
      }
      return h(I);
    }
    function S(E) {
      if (!Array.isArray(E))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var I = 0; I < E.length; I++) {
        var X = E[I];
        if (typeof X != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ae(X) + " at index " + I + "."
          ), i;
      }
      function G(F, Y, U, q, W) {
        for (var J = [], Q = 0; Q < E.length; Q++) {
          var pe = E[Q], A = pe(F, Y, U, q, W, n);
          if (A == null)
            return null;
          A.data && r(A.data, "expectedType") && J.push(A.data.expectedType);
        }
        var ke = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new p("Invalid " + q + " `" + W + "` supplied to " + ("`" + U + "`" + ke + "."));
      }
      return h(G);
    }
    function P() {
      function E(I, X, G, F, Y) {
        return Z(I[X]) ? null : new p("Invalid " + F + " `" + Y + "` supplied to " + ("`" + G + "`, expected a ReactNode."));
      }
      return h(E);
    }
    function N(E, I, X, G, F) {
      return new p(
        (E || "React class") + ": " + I + " type `" + X + "." + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + F + "`."
      );
    }
    function j(E) {
      function I(X, G, F, Y, U) {
        var q = X[G], W = H(q);
        if (W !== "object")
          return new p("Invalid " + Y + " `" + U + "` of type `" + W + "` " + ("supplied to `" + F + "`, expected `object`."));
        for (var J in E) {
          var Q = E[J];
          if (typeof Q != "function")
            return N(F, Y, U, J, te(Q));
          var pe = Q(q, J, F, Y, U + "." + J, n);
          if (pe)
            return pe;
        }
        return null;
      }
      return h(I);
    }
    function V(E) {
      function I(X, G, F, Y, U) {
        var q = X[G], W = H(q);
        if (W !== "object")
          return new p("Invalid " + Y + " `" + U + "` of type `" + W + "` " + ("supplied to `" + F + "`, expected `object`."));
        var J = t({}, X[G], E);
        for (var Q in J) {
          var pe = E[Q];
          if (r(E, Q) && typeof pe != "function")
            return N(F, Y, U, Q, te(pe));
          if (!pe)
            return new p(
              "Invalid " + Y + " `" + U + "` key `" + Q + "` supplied to `" + F + "`.\nBad object: " + JSON.stringify(X[G], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(E), null, "  ")
            );
          var A = pe(q, Q, F, Y, U + "." + Q, n);
          if (A)
            return A;
        }
        return null;
      }
      return h(I);
    }
    function Z(E) {
      switch (typeof E) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !E;
        case "object":
          if (Array.isArray(E))
            return E.every(Z);
          if (E === null || s(E))
            return !0;
          var I = b(E);
          if (I) {
            var X = I.call(E), G;
            if (I !== E.entries) {
              for (; !(G = X.next()).done; )
                if (!Z(G.value))
                  return !1;
            } else
              for (; !(G = X.next()).done; ) {
                var F = G.value;
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
    function K(E, I) {
      return E === "symbol" ? !0 : I ? I["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && I instanceof Symbol : !1;
    }
    function H(E) {
      var I = typeof E;
      return Array.isArray(E) ? "array" : E instanceof RegExp ? "object" : K(I, E) ? "symbol" : I;
    }
    function te(E) {
      if (typeof E > "u" || E === null)
        return "" + E;
      var I = H(E);
      if (I === "object") {
        if (E instanceof Date)
          return "date";
        if (E instanceof RegExp)
          return "regexp";
      }
      return I;
    }
    function ae(E) {
      var I = te(E);
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
    function z(E) {
      return !E.constructor || !E.constructor.name ? g : E.constructor.name;
    }
    return d.checkPropTypes = o, d.resetWarningCache = o.resetWarningCache, d.PropTypes = d, d;
  }, zr;
}
var Fr, ya;
function Rd() {
  if (ya)
    return Fr;
  ya = 1;
  var e = ko();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Fr = function() {
    function r(i, s, c, u, f, b) {
      if (b !== e) {
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
  var Pd = Ki(), _d = !0;
  to.exports = Od()(Pd.isElement, _d);
} else
  to.exports = Rd()();
var $d = to.exports;
const w = /* @__PURE__ */ xd($d);
function Id(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Zi(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let s;
  const c = a.type;
  return typeof c == "function" && !Id(c) && (s = "Did you accidentally use a plain function component for an element instead?"), s !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${s} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Qi = xo(w.element, Zi);
Qi.isRequired = xo(w.element.isRequired, Zi);
const es = Qi, Ad = "exact-prop: ​";
function Md(e) {
  return process.env.NODE_ENV === "production" ? e : $({}, e, {
    [Ad]: (t) => {
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
var no = { exports: {} }, le = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var xa;
function Dd() {
  if (xa)
    return le;
  xa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), m;
  m = Symbol.for("react.module.reference");
  function p(h) {
    if (typeof h == "object" && h !== null) {
      var y = h.$$typeof;
      switch (y) {
        case e:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case u:
            case f:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case s:
                case i:
                case c:
                case g:
                case b:
                case a:
                  return h;
                default:
                  return y;
              }
          }
        case t:
          return y;
      }
    }
  }
  return le.ContextConsumer = i, le.ContextProvider = a, le.Element = e, le.ForwardRef = c, le.Fragment = n, le.Lazy = g, le.Memo = b, le.Portal = t, le.Profiler = o, le.StrictMode = r, le.Suspense = u, le.SuspenseList = f, le.isAsyncMode = function() {
    return !1;
  }, le.isConcurrentMode = function() {
    return !1;
  }, le.isContextConsumer = function(h) {
    return p(h) === i;
  }, le.isContextProvider = function(h) {
    return p(h) === a;
  }, le.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === e;
  }, le.isForwardRef = function(h) {
    return p(h) === c;
  }, le.isFragment = function(h) {
    return p(h) === n;
  }, le.isLazy = function(h) {
    return p(h) === g;
  }, le.isMemo = function(h) {
    return p(h) === b;
  }, le.isPortal = function(h) {
    return p(h) === t;
  }, le.isProfiler = function(h) {
    return p(h) === o;
  }, le.isStrictMode = function(h) {
    return p(h) === r;
  }, le.isSuspense = function(h) {
    return p(h) === u;
  }, le.isSuspenseList = function(h) {
    return p(h) === f;
  }, le.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === u || h === f || h === d || typeof h == "object" && h !== null && (h.$$typeof === g || h.$$typeof === b || h.$$typeof === a || h.$$typeof === i || h.$$typeof === c || h.$$typeof === m || h.getModuleId !== void 0);
  }, le.typeOf = p, le;
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
var ka;
function Bd() {
  return ka || (ka = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), m = !1, p = !1, h = !1, y = !1, C = !1, k;
    k = Symbol.for("react.module.reference");
    function x(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === n || L === o || C || L === r || L === u || L === f || y || L === d || m || p || h || typeof L == "object" && L !== null && (L.$$typeof === g || L.$$typeof === b || L.$$typeof === a || L.$$typeof === i || L.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === k || L.getModuleId !== void 0));
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
              case u:
              case f:
                return ze;
              default:
                var ft = ze && ze.$$typeof;
                switch (ft) {
                  case s:
                  case i:
                  case c:
                  case g:
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
    var O = i, _ = a, B = e, S = c, P = n, N = g, j = b, V = t, Z = o, K = r, H = u, te = f, ae = !1, z = !1;
    function E(L) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function I(L) {
      return z || (z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function X(L) {
      return v(L) === i;
    }
    function G(L) {
      return v(L) === a;
    }
    function F(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function Y(L) {
      return v(L) === c;
    }
    function U(L) {
      return v(L) === n;
    }
    function q(L) {
      return v(L) === g;
    }
    function W(L) {
      return v(L) === b;
    }
    function J(L) {
      return v(L) === t;
    }
    function Q(L) {
      return v(L) === o;
    }
    function pe(L) {
      return v(L) === r;
    }
    function A(L) {
      return v(L) === u;
    }
    function ke(L) {
      return v(L) === f;
    }
    ce.ContextConsumer = O, ce.ContextProvider = _, ce.Element = B, ce.ForwardRef = S, ce.Fragment = P, ce.Lazy = N, ce.Memo = j, ce.Portal = V, ce.Profiler = Z, ce.StrictMode = K, ce.Suspense = H, ce.SuspenseList = te, ce.isAsyncMode = E, ce.isConcurrentMode = I, ce.isContextConsumer = X, ce.isContextProvider = G, ce.isElement = F, ce.isForwardRef = Y, ce.isFragment = U, ce.isLazy = q, ce.isMemo = W, ce.isPortal = J, ce.isProfiler = Q, ce.isStrictMode = pe, ce.isSuspense = A, ce.isSuspenseList = ke, ce.isValidElementType = x, ce.typeOf = v;
  }()), ce;
}
process.env.NODE_ENV === "production" ? no.exports = Dd() : no.exports = Bd();
var Na = no.exports;
const jd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Vd(e) {
  const t = `${e}`.match(jd);
  return t && t[1] || "";
}
function ts(e, t = "") {
  return e.displayName || e.name || Vd(e) || t;
}
function Ea(e, t, n) {
  const r = ts(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Ld(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ts(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Na.ForwardRef:
          return Ea(e, e.render, "ForwardRef");
        case Na.Memo:
          return Ea(e, e.type, "memo");
        default:
          return;
      }
  }
}
function En(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const zd = w.oneOfType([w.func, w.object]), ns = zd;
function Ye(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ht(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Fd(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function Gd(e, t = 166) {
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
function Ud(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const s = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${s}\` is deprecated. ${t}`) : null;
  };
}
function Hd(e, t) {
  var n, r;
  return /* @__PURE__ */ M.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Zn(e) {
  return e && e.ownerDocument || document;
}
function Xd(e) {
  return Zn(e).defaultView || window;
}
function Wd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? $({}, t.propTypes) : null;
  return (o) => (a, i, s, c, u, ...f) => {
    const b = u || i, g = n == null ? void 0 : n[b];
    if (g) {
      const d = g(a, i, s, c, u, ...f);
      if (d)
        return d;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Qn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Yd = typeof window < "u" ? M.useLayoutEffect : M.useEffect, Xt = Yd;
let Ta = 0;
function qd(e) {
  const [t, n] = M.useState(e), r = e || t;
  return M.useEffect(() => {
    t == null && (Ta += 1, n(`mui-${Ta}`));
  }, [t]), r;
}
const Sa = M["useId".toString()];
function rs(e) {
  if (Sa !== void 0) {
    const t = Sa();
    return e ?? t;
  }
  return qd(e);
}
function Kd(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function os({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = M.useRef(e !== void 0), [a, i] = M.useState(t), s = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    M.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: u
    } = M.useRef(t);
    M.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = M.useCallback((u) => {
    o || i(u);
  }, []);
  return [s, c];
}
function ro(e) {
  const t = M.useRef(e);
  return Xt(() => {
    t.current = e;
  }), M.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function St(...e) {
  return M.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Qn(n, t);
    });
  }, e);
}
const Ca = {};
function Jd(e, t) {
  const n = M.useRef(Ca);
  return n.current === Ca && (n.current = e(t)), n;
}
const Zd = [];
function Qd(e) {
  M.useEffect(e, Zd);
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
function pn() {
  const e = Jd(Pn.create).current;
  return Qd(e.disposeEffect), e;
}
let wr = !0, oo = !1;
const ep = new Pn(), tp = {
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
function np(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && tp[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function rp(e) {
  e.metaKey || e.altKey || e.ctrlKey || (wr = !0);
}
function Gr() {
  wr = !1;
}
function op() {
  this.visibilityState === "hidden" && oo && (wr = !0);
}
function ap(e) {
  e.addEventListener("keydown", rp, !0), e.addEventListener("mousedown", Gr, !0), e.addEventListener("pointerdown", Gr, !0), e.addEventListener("touchstart", Gr, !0), e.addEventListener("visibilitychange", op, !0);
}
function ip(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return wr || np(t);
}
function as() {
  const e = M.useCallback((o) => {
    o != null && ap(o.ownerDocument);
  }, []), t = M.useRef(!1);
  function n() {
    return t.current ? (oo = !0, ep.start(100, () => {
      oo = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return ip(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function is(e, t) {
  const n = $({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = $({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = $({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = is(o[i], a[i]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function No(e, t, n = void 0) {
  const r = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = e[o].reduce((a, i) => {
        if (i) {
          const s = t(i);
          s !== "" && a.push(s), n && n[i] && a.push(n[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const Oa = (e) => e, sp = () => {
  let e = Oa;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Oa;
    }
  };
}, lp = sp(), ss = lp, ls = {
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
function mr(e, t, n = "Mui") {
  const r = ls[t];
  return r ? `${n}-${r}` : `${ss.generate(e)}-${t}`;
}
function cs(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = mr(e, o, n);
  }), r;
}
function cp(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
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
const dp = ["values", "unit", "step"], pp = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => $({}, n, {
    [r.key]: r.val
  }), {});
};
function up(e) {
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
  } = e, o = Ne(e, dp), a = pp(t), i = Object.keys(a);
  function s(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${n})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - r / 100}${n})`;
  }
  function u(g, d) {
    const m = i.indexOf(d);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${n}) and (max-width:${(m !== -1 && typeof t[i[m]] == "number" ? t[i[m]] : d) - r / 100}${n})`;
  }
  function f(g) {
    return i.indexOf(g) + 1 < i.length ? u(g, i[i.indexOf(g) + 1]) : s(g);
  }
  function b(g) {
    const d = i.indexOf(g);
    return d === 0 ? s(i[1]) : d === i.length - 1 ? c(i[d]) : u(g, i[i.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return $({
    keys: i,
    values: a,
    up: s,
    down: c,
    between: u,
    only: f,
    not: b,
    unit: n
  }, o);
}
const fp = {
  borderRadius: 4
}, wp = fp, mp = process.env.NODE_ENV !== "production" ? w.oneOfType([w.number, w.string, w.object, w.array]) : {}, pt = mp;
function hn(e, t) {
  return t ? Qe(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Eo = {
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
}, Ra = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Eo[e]}px)`
};
function et(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Ra;
    return t.reduce((i, s, c) => (i[a.up(a.keys[c])] = n(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || Ra;
    return Object.keys(t).reduce((i, s) => {
      if (Object.keys(a.values || Eo).indexOf(s) !== -1) {
        const c = a.up(s);
        i[c] = n(t[s], s);
      } else {
        const c = s;
        i[c] = t[c];
      }
      return i;
    }, {});
  }
  return n(t);
}
function hp(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function gp(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function hr(e, t, n = !0) {
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
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = hr(e, n) || r, t && (o = t(o, r, e)), o;
}
function ve(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const s = i[t], c = i.theme, u = hr(c, r) || {};
    return et(i, s, (b) => {
      let g = er(u, o, b);
      return b === g && typeof b == "string" && (g = er(u, o, `${t}${b === "default" ? "" : Ye(b)}`, b)), n === !1 ? g : {
        [n]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: pt
  } : {}, a.filterProps = [t], a;
}
function bp(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const vp = {
  m: "margin",
  p: "padding"
}, yp = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Pa = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, xp = bp((e) => {
  if (e.length > 2)
    if (Pa[e])
      e = Pa[e];
    else
      return [e];
  const [t, n] = e.split(""), r = vp[t], o = yp[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), gr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], br = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], kp = [...gr, ...br];
function _n(e, t, n, r) {
  var o;
  const a = (o = hr(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ds(e) {
  return _n(e, "spacing", 8, "spacing");
}
function $n(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Np(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = $n(t, n), r), {});
}
function Ep(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = xp(n), a = Np(o, r), i = e[n];
  return et(e, i, a);
}
function ps(e, t) {
  const n = ds(e.theme);
  return Object.keys(e).map((r) => Ep(e, t, r, n)).reduce(hn, {});
}
function he(e) {
  return ps(e, gr);
}
he.propTypes = process.env.NODE_ENV !== "production" ? gr.reduce((e, t) => (e[t] = pt, e), {}) : {};
he.filterProps = gr;
function ge(e) {
  return ps(e, br);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? br.reduce((e, t) => (e[t] = pt, e), {}) : {};
ge.filterProps = br;
process.env.NODE_ENV !== "production" && kp.reduce((e, t) => (e[t] = pt, e), {});
function Tp(e = 8) {
  if (e.mui)
    return e;
  const t = ds({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function vr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? hn(o, t[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function De(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Le(e, t) {
  return ve({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Sp = Le("border", De), Cp = Le("borderTop", De), Op = Le("borderRight", De), Rp = Le("borderBottom", De), Pp = Le("borderLeft", De), _p = Le("borderColor"), $p = Le("borderTopColor"), Ip = Le("borderRightColor"), Ap = Le("borderBottomColor"), Mp = Le("borderLeftColor"), Dp = Le("outline", De), Bp = Le("outlineColor"), yr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = _n(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: $n(t, r)
    });
    return et(e, e.borderRadius, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: pt
} : {};
yr.filterProps = ["borderRadius"];
vr(Sp, Cp, Op, Rp, Pp, _p, $p, Ip, Ap, Mp, yr, Dp, Bp);
const xr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = _n(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: $n(t, r)
    });
    return et(e, e.gap, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: pt
} : {};
xr.filterProps = ["gap"];
const kr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = _n(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: $n(t, r)
    });
    return et(e, e.columnGap, n);
  }
  return null;
};
kr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: pt
} : {};
kr.filterProps = ["columnGap"];
const Nr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = _n(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: $n(t, r)
    });
    return et(e, e.rowGap, n);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: pt
} : {};
Nr.filterProps = ["rowGap"];
const jp = ve({
  prop: "gridColumn"
}), Vp = ve({
  prop: "gridRow"
}), Lp = ve({
  prop: "gridAutoFlow"
}), zp = ve({
  prop: "gridAutoColumns"
}), Fp = ve({
  prop: "gridAutoRows"
}), Gp = ve({
  prop: "gridTemplateColumns"
}), Up = ve({
  prop: "gridTemplateRows"
}), Hp = ve({
  prop: "gridTemplateAreas"
}), Xp = ve({
  prop: "gridArea"
});
vr(xr, kr, Nr, jp, Vp, Lp, zp, Fp, Gp, Up, Hp, Xp);
function zt(e, t) {
  return t === "grey" ? t : e;
}
const Wp = ve({
  prop: "color",
  themeKey: "palette",
  transform: zt
}), Yp = ve({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: zt
}), qp = ve({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: zt
});
vr(Wp, Yp, qp);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Kp = ve({
  prop: "width",
  transform: Ie
}), To = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Eo[n];
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
To.filterProps = ["maxWidth"];
const Jp = ve({
  prop: "minWidth",
  transform: Ie
}), Zp = ve({
  prop: "height",
  transform: Ie
}), Qp = ve({
  prop: "maxHeight",
  transform: Ie
}), eu = ve({
  prop: "minHeight",
  transform: Ie
});
ve({
  prop: "size",
  cssProperty: "width",
  transform: Ie
});
ve({
  prop: "size",
  cssProperty: "height",
  transform: Ie
});
const tu = ve({
  prop: "boxSizing"
});
vr(Kp, To, Jp, Zp, Qp, eu, tu);
const nu = {
  // borders
  border: {
    themeKey: "borders",
    transform: De
  },
  borderTop: {
    themeKey: "borders",
    transform: De
  },
  borderRight: {
    themeKey: "borders",
    transform: De
  },
  borderBottom: {
    themeKey: "borders",
    transform: De
  },
  borderLeft: {
    themeKey: "borders",
    transform: De
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
    transform: De
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
    style: xr
  },
  rowGap: {
    style: Nr
  },
  columnGap: {
    style: kr
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
    style: To
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
}, So = nu;
function ru(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function ou(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function au() {
  function e(n, r, o, a) {
    const i = {
      [n]: r,
      theme: o
    }, s = a[n];
    if (!s)
      return {
        [n]: r
      };
    const {
      cssProperty: c = n,
      themeKey: u,
      transform: f,
      style: b
    } = s;
    if (r == null)
      return null;
    if (u === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const g = hr(o, u) || {};
    return b ? b(i) : et(i, r, (m) => {
      let p = er(g, f, m);
      return m === p && typeof m == "string" && (p = er(g, f, `${n}${m === "default" ? "" : Ye(m)}`, m)), c === !1 ? p : {
        [c]: p
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
    const i = (r = a.unstable_sxConfig) != null ? r : So;
    function s(c) {
      let u = c;
      if (typeof c == "function")
        u = c(a);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const f = hp(a.breakpoints), b = Object.keys(f);
      let g = f;
      return Object.keys(u).forEach((d) => {
        const m = ou(u[d], a);
        if (m != null)
          if (typeof m == "object")
            if (i[d])
              g = hn(g, e(d, m, a, i));
            else {
              const p = et({
                theme: a
              }, m, (h) => ({
                [d]: h
              }));
              ru(p, m) ? g[d] = t({
                sx: m,
                theme: a
              }) : g = hn(g, p);
            }
          else
            g = hn(g, e(d, m, a, i));
      }), gp(b, g);
    }
    return Array.isArray(o) ? o.map(s) : s(o);
  }
  return t;
}
const us = au();
us.filterProps = ["sx"];
const Co = us;
function iu(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const su = ["breakpoints", "palette", "spacing", "shape"];
function Oo(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, i = Ne(e, su), s = up(n), c = Tp(o);
  let u = Qe({
    breakpoints: s,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: $({
      mode: "light"
    }, r),
    spacing: c,
    shape: $({}, wp, a)
  }, i);
  return u.applyStyles = iu, u = t.reduce((f, b) => Qe(f, b), u), u.unstable_sxConfig = $({}, So, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(b) {
    return Co({
      sx: b,
      theme: this
    });
  }, u;
}
function lu(e) {
  return Object.keys(e).length === 0;
}
function fs(e = null) {
  const t = M.useContext(tc);
  return !t || lu(t) ? e : t;
}
const cu = Oo();
function ws(e = cu) {
  return fs(e);
}
const du = ["ownerState"], pu = ["variants"], uu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function fu(e) {
  return Object.keys(e).length === 0;
}
function wu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Yn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const mu = Oo(), _a = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Gn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return fu(t) ? e : t[n] || t;
}
function hu(e) {
  return e ? (t, n) => n[e] : null;
}
function qn(e, t) {
  let {
    ownerState: n
  } = t, r = Ne(t, du);
  const o = typeof e == "function" ? e($({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => qn(a, $({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let s = Ne(o, pu);
    return a.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props($({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((f) => {
        (n == null ? void 0 : n[f]) !== c.props[f] && r[f] !== c.props[f] && (u = !1);
      }), u && (Array.isArray(s) || (s = [s]), s.push(typeof c.style == "function" ? c.style($({
        ownerState: n
      }, r, n)) : c.style));
    }), s;
  }
  return o;
}
function gu(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = mu,
    rootShouldForwardProp: r = Yn,
    slotShouldForwardProp: o = Yn
  } = e, a = (i) => Co($({}, i, {
    theme: Gn($({}, i, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, s = {}) => {
    nc(i, (v) => v.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: f,
      skipSx: b,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = hu(_a(u))
    } = s, d = Ne(s, uu), m = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), p = b || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${_a(u || "Root")}`);
    let y = Yn;
    u === "Root" || u === "root" ? y = r : u ? y = o : wu(i) && (y = void 0);
    const C = ec(i, $({
      shouldForwardProp: y,
      label: h
    }, d)), k = (v) => typeof v == "function" && v.__emotion_real !== v || yt(v) ? (O) => qn(v, $({}, O, {
      theme: Gn({
        theme: O.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : v, x = (v, ...O) => {
      let _ = k(v);
      const B = O ? O.map(k) : [];
      c && g && B.push((N) => {
        const j = Gn($({}, N, {
          defaultTheme: n,
          themeId: t
        }));
        if (!j.components || !j.components[c] || !j.components[c].styleOverrides)
          return null;
        const V = j.components[c].styleOverrides, Z = {};
        return Object.entries(V).forEach(([K, H]) => {
          Z[K] = qn(H, $({}, N, {
            theme: j
          }));
        }), g(N, Z);
      }), c && !m && B.push((N) => {
        var j;
        const V = Gn($({}, N, {
          defaultTheme: n,
          themeId: t
        })), Z = V == null || (j = V.components) == null || (j = j[c]) == null ? void 0 : j.variants;
        return qn({
          variants: Z
        }, $({}, N, {
          theme: V
        }));
      }), p || B.push(a);
      const S = B.length - O.length;
      if (Array.isArray(v) && S > 0) {
        const N = new Array(S).fill("");
        _ = [...v, ...N], _.raw = [...v.raw, ...N];
      }
      const P = C(_, ...B);
      if (process.env.NODE_ENV !== "production") {
        let N;
        c && (N = `${c}${Ye(u || "")}`), N === void 0 && (N = `Styled(${Ld(i)})`), P.displayName = N;
      }
      return i.muiName && (P.muiName = i.muiName), P;
    };
    return C.withConfig && (x.withConfig = C.withConfig), x;
  };
}
function bu(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : is(t.components[n].defaultProps, r);
}
function vu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ws(n);
  return r && (o = o[r] || o), bu({
    theme: o,
    name: t,
    props: e
  });
}
function Ro(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), cp(e, t, n);
}
function yu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ct(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Ct(yu(e));
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
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Er(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function xu(e) {
  e = Ct(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), i = (u, f = (u + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let s = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (s += "a", c.push(t[3])), Er({
    type: s,
    values: c
  });
}
function $a(e) {
  e = Ct(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Ct(xu(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ia(e, t) {
  const n = $a(e), r = $a(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function ms(e, t) {
  return e = Ct(e), t = Ro(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Er(e);
}
function ku(e, t) {
  if (e = Ct(e), t = Ro(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Er(e);
}
function Nu(e, t) {
  if (e = Ct(e), t = Ro(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Er(e);
}
function Eu(e, t) {
  return $({
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
const Tu = {
  black: "#000",
  white: "#fff"
}, Tn = Tu, Su = {
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
}, Cu = Su, Ou = {
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
}, It = Ou, Ru = {
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
}, At = Ru, Pu = {
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
}, an = Pu, _u = {
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
}, Mt = _u, $u = {
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
}, Dt = $u, Iu = {
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
}, Bt = Iu, Au = ["mode", "contrastThreshold", "tonalOffset"], Aa = {
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
}, Ur = {
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
function Ma(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Nu(e.main, o) : t === "dark" && (e.dark = ku(e.main, a)));
}
function Mu(e = "light") {
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
function Du(e = "light") {
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
function Bu(e = "light") {
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
function ju(e = "light") {
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
function Vu(e = "light") {
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
function Lu(e = "light") {
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
function zu(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = Ne(e, Au), a = e.primary || Mu(t), i = e.secondary || Du(t), s = e.error || Bu(t), c = e.info || ju(t), u = e.success || Vu(t), f = e.warning || Lu(t);
  function b(p) {
    const h = Ia(p, Ur.text.primary) >= n ? Ur.text.primary : Aa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = Ia(p, h);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${h} on ${p}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const g = ({
    color: p,
    name: h,
    mainShade: y = 500,
    lightShade: C = 300,
    darkShade: k = 700
  }) => {
    if (p = $({}, p), !p.main && p[y] && (p.main = p[y]), !p.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : Ht(11, h ? ` (${h})` : "", y));
    if (typeof p.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(p.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ht(12, h ? ` (${h})` : "", JSON.stringify(p.main)));
    return Ma(p, "light", C, r), Ma(p, "dark", k, r), p.contrastText || (p.contrastText = b(p.main)), p;
  }, d = {
    dark: Ur,
    light: Aa
  };
  return process.env.NODE_ENV !== "production" && (d[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Qe($({
    // A collection of common colors.
    common: $({}, Tn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
    // The colors used to represent primary interface elements for a user.
    primary: g({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: g({
      color: i,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: g({
      color: s,
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
    grey: Cu,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: b,
    // Generate a rich color object.
    augmentColor: g,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, d[t]), o);
}
const Fu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Gu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Da = {
  textTransform: "uppercase"
}, Ba = '"Roboto", "Helvetica", "Arial", sans-serif';
function Uu(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Ba,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: s = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: b
  } = n, g = Ne(n, Fu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const d = o / 14, m = b || ((y) => `${y / u * d}rem`), p = (y, C, k, x, v) => $({
    fontFamily: r,
    fontWeight: y,
    fontSize: m(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: k
  }, r === Ba ? {
    letterSpacing: `${Gu(x / C)}em`
  } : {}, v, f), h = {
    h1: p(a, 96, 1.167, -1.5),
    h2: p(a, 60, 1.2, -0.5),
    h3: p(i, 48, 1.167, 0),
    h4: p(i, 34, 1.235, 0.25),
    h5: p(i, 24, 1.334, 0),
    h6: p(s, 20, 1.6, 0.15),
    subtitle1: p(i, 16, 1.75, 0.15),
    subtitle2: p(s, 14, 1.57, 0.1),
    body1: p(i, 16, 1.5, 0.15),
    body2: p(i, 14, 1.43, 0.15),
    button: p(s, 14, 1.75, 0.4, Da),
    caption: p(i, 12, 1.66, 0.4),
    overline: p(i, 12, 2.66, 1, Da),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Qe($({
    htmlFontSize: u,
    pxToRem: m,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: s,
    fontWeightBold: c
  }, h), g, {
    clone: !1
    // No need to clone deep
  });
}
const Hu = 0.2, Xu = 0.14, Wu = 0.12;
function me(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Hu})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Xu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Wu})`].join(",");
}
const Yu = ["none", me(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), me(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), me(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), me(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), me(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), me(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), me(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), me(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), me(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), me(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), me(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), me(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), me(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), me(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), me(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), me(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), me(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), me(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), me(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), me(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), me(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), me(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), me(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), me(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], qu = Yu, Ku = ["duration", "easing", "delay"], Ju = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Zu = {
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
function ja(e) {
  return `${Math.round(e)}ms`;
}
function Qu(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function ef(e) {
  const t = $({}, Ju, e.easing), n = $({}, Zu, e.duration);
  return $({
    getAutoHeightDuration: Qu,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: s = t.easeInOut,
        delay: c = 0
      } = a, u = Ne(a, Ku);
      if (process.env.NODE_ENV !== "production") {
        const f = (g) => typeof g == "string", b = (g) => !isNaN(parseFloat(g));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !b(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(s) || console.error('MUI: Argument "easing" must be a string.'), !b(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : ja(i)} ${s} ${typeof c == "string" ? c : ja(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const tf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, nf = tf, rf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function of(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = Ne(e, rf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ht(18));
  const s = zu(r), c = Oo(e);
  let u = Qe(c, {
    mixins: Eu(c.breakpoints, n),
    palette: s,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: qu.slice(),
    typography: Uu(s, a),
    transitions: ef(o),
    zIndex: $({}, nf)
  });
  if (u = Qe(u, i), u = t.reduce((f, b) => Qe(f, b), u), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], b = (g, d) => {
      let m;
      for (m in g) {
        const p = g[m];
        if (f.indexOf(m) !== -1 && Object.keys(p).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = mr("", m);
            console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${m}\` internal state.`, "You can not override it like this: ", JSON.stringify(g, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: p
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          g[m] = {};
        }
      }
    };
    Object.keys(u.components).forEach((g) => {
      const d = u.components[g].styleOverrides;
      d && g.indexOf("Mui") === 0 && b(d, g);
    });
  }
  return u.unstable_sxConfig = $({}, So, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(b) {
    return Co({
      sx: b,
      theme: this
    });
  }, u;
}
const af = of(), Po = af, _o = "$$material";
function $o({
  props: e,
  name: t
}) {
  return vu({
    props: e,
    name: t,
    defaultTheme: Po,
    themeId: _o
  });
}
const sf = (e) => Yn(e) && e !== "classes", lf = gu({
  themeId: _o,
  defaultTheme: Po,
  rootShouldForwardProp: sf
}), In = lf;
function cf(e) {
  return mr("MuiSvgIcon", e);
}
cs("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const df = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], pf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ye(t)}`, `fontSize${Ye(n)}`]
  };
  return No(o, cf, r);
}, uf = In("svg", {
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
  var n, r, o, a, i, s, c, u, f, b, g, d, m;
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
      medium: ((s = e.typography) == null || (c = s.pxToRem) == null ? void 0 : c.call(s, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (f = u.pxToRem) == null ? void 0 : f.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (b = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? b : {
      action: (d = (e.vars || e).palette) == null || (d = d.action) == null ? void 0 : d.active,
      disabled: (m = (e.vars || e).palette) == null || (m = m.action) == null ? void 0 : m.disabled,
      inherit: void 0
    }[t.color]
  };
}), Io = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const r = $o({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: s = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: f = !1,
    titleAccess: b,
    viewBox: g = "0 0 24 24"
  } = r, d = Ne(r, df), m = /* @__PURE__ */ M.isValidElement(o) && o.type === "svg", p = $({}, r, {
    color: i,
    component: s,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: g,
    hasSvgAsChild: m
  }), h = {};
  f || (h.viewBox = g);
  const y = pf(p);
  return /* @__PURE__ */ T(uf, $({
    as: s,
    className: Nt(y.root, a),
    focusable: "false",
    color: u,
    "aria-hidden": b ? void 0 : !0,
    role: b ? "img" : void 0,
    ref: n
  }, h, d, m && o.props, {
    ownerState: p,
    children: [m ? o.props.children : o, b ? /* @__PURE__ */ l("title", {
      children: b
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Io.propTypes = {
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
Io.muiName = "SvgIcon";
const Va = Io;
function hs(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ l(Va, $({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Va.muiName, /* @__PURE__ */ M.memo(/* @__PURE__ */ M.forwardRef(n));
}
const ff = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ss.configure(e);
  }
}, wf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ye,
  createChainedFunction: Fd,
  createSvgIcon: hs,
  debounce: Gd,
  deprecatedPropType: Ud,
  isMuiElement: Hd,
  ownerDocument: Zn,
  ownerWindow: Xd,
  requirePropFactory: Wd,
  setRef: Qn,
  unstable_ClassNameGenerator: ff,
  unstable_useEnhancedEffect: Xt,
  unstable_useId: rs,
  unsupportedProp: Kd,
  useControlled: os,
  useEventCallback: ro,
  useForkRef: St,
  useIsFocusVisible: as
}, Symbol.toStringTag, { value: "Module" })), mf = /* @__PURE__ */ kd(wf);
var La;
function hf() {
  return La || (La = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = mf;
  }(Dr)), Dr;
}
var gf = Nd;
Object.defineProperty(yo, "__esModule", {
  value: !0
});
var gs = yo.default = void 0, bf = gf(hf()), vf = hl;
gs = yo.default = (0, bf.default)(/* @__PURE__ */ (0, vf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function yf(e) {
  return typeof e == "string";
}
function un(e, t, n) {
  return e === void 0 || yf(e) ? t : $({}, t, {
    ownerState: $({}, t.ownerState, n)
  });
}
const xf = {
  disableDefaultClasses: !1
}, kf = /* @__PURE__ */ M.createContext(xf);
function Nf(e) {
  const {
    disableDefaultClasses: t
  } = M.useContext(kf);
  return (n) => t ? "" : e(n);
}
function Ef(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Tf(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function za(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Sf(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const d = Nt(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = $({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), p = $({}, n, o, r);
    return d.length > 0 && (p.className = d), Object.keys(m).length > 0 && (p.style = m), {
      props: p,
      internalRef: void 0
    };
  }
  const i = Ef($({}, o, r)), s = za(r), c = za(o), u = t(i), f = Nt(u == null ? void 0 : u.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), b = $({}, u == null ? void 0 : u.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = $({}, u, n, c, s);
  return f.length > 0 && (g.className = f), Object.keys(b).length > 0 && (g.style = b), {
    props: g,
    internalRef: u.ref
  };
}
const Cf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Of(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = Ne(e, Cf), s = a ? {} : Tf(r, o), {
    props: c,
    internalRef: u
  } = Sf($({}, i, {
    externalSlotProps: s
  })), f = St(u, s == null ? void 0 : s.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return un(n, $({}, c, {
    ref: f
  }), o);
}
const bs = "base";
function Rf(e) {
  return `${bs}--${e}`;
}
function Pf(e, t) {
  return `${bs}-${e}-${t}`;
}
function vs(e, t) {
  const n = ls[t];
  return n ? Rf(n) : Pf(e, t);
}
function _f(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = vs(e, r);
  }), n;
}
function $f(e) {
  return typeof e == "function" ? e() : e;
}
const tr = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [i, s] = M.useState(null), c = St(/* @__PURE__ */ M.isValidElement(r) ? r.ref : null, n);
  if (Xt(() => {
    a || s($f(o) || document.body);
  }, [o, a]), Xt(() => {
    if (i && !a)
      return Qn(n, i), () => {
        Qn(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ M.isValidElement(r)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ M.cloneElement(r, u);
    }
    return /* @__PURE__ */ l(M.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ l(M.Fragment, {
    children: i && /* @__PURE__ */ dc.createPortal(r, i)
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
  container: w.oneOfType([En, w.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: w.bool
});
process.env.NODE_ENV !== "production" && (tr["propTypes"] = Md(tr.propTypes));
var Ce = "top", je = "bottom", Ve = "right", Oe = "left", Ao = "auto", An = [Ce, je, Ve, Oe], Wt = "start", Sn = "end", If = "clippingParents", ys = "viewport", sn = "popper", Af = "reference", Fa = /* @__PURE__ */ An.reduce(function(e, t) {
  return e.concat([t + "-" + Wt, t + "-" + Sn]);
}, []), xs = /* @__PURE__ */ [].concat(An, [Ao]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Wt, t + "-" + Sn]);
}, []), Mf = "beforeRead", Df = "read", Bf = "afterRead", jf = "beforeMain", Vf = "main", Lf = "afterMain", zf = "beforeWrite", Ff = "write", Gf = "afterWrite", Uf = [Mf, Df, Bf, jf, Vf, Lf, zf, Ff, Gf];
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
function Hf(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Be(a) || !qe(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var s = o[i];
      s === !1 ? a.removeAttribute(i) : a.setAttribute(i, s === !0 ? "" : s);
    }));
  });
}
function Xf(e) {
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
      var o = t.elements[r], a = t.attributes[r] || {}, i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), s = i.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Be(o) || !qe(o) || (Object.assign(o.style, s), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Wf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Hf,
  effect: Xf,
  requires: ["computeStyles"]
};
function He(e) {
  return e.split("-")[0];
}
var Et = Math.max, nr = Math.min, Yt = Math.round;
function ao() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ks() {
  return !/^((?!chrome|android).)*safari/i.test(ao());
}
function qt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && Yt(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Yt(r.height) / e.offsetHeight || 1);
  var i = Ot(e) ? Ae(e) : window, s = i.visualViewport, c = !ks() && n, u = (r.left + (c && s ? s.offsetLeft : 0)) / o, f = (r.top + (c && s ? s.offsetTop : 0)) / a, b = r.width / o, g = r.height / a;
  return {
    width: b,
    height: g,
    top: f,
    right: u + b,
    bottom: f + g,
    left: u,
    x: u,
    y: f
  };
}
function Do(e) {
  var t = qt(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Ns(e, t) {
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
function Yf(e) {
  return ["table", "td", "th"].indexOf(qe(e)) >= 0;
}
function ut(e) {
  return ((Ot(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Tr(e) {
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
function qf(e) {
  var t = /firefox/i.test(ao()), n = /Trident/i.test(ao());
  if (n && Be(e)) {
    var r = tt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = Tr(e);
  for (Mo(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(qe(o)) < 0; ) {
    var a = tt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Mn(e) {
  for (var t = Ae(e), n = Ga(e); n && Yf(n) && tt(n).position === "static"; )
    n = Ga(n);
  return n && (qe(n) === "html" || qe(n) === "body" && tt(n).position === "static") ? t : n || qf(e) || t;
}
function Bo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function gn(e, t, n) {
  return Et(e, nr(t, n));
}
function Kf(e, t, n) {
  var r = gn(e, t, n);
  return r > n ? n : r;
}
function Es() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ts(e) {
  return Object.assign({}, Es(), e);
}
function Ss(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Jf = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, Ts(typeof t != "number" ? t : Ss(t, An));
};
function Zf(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, s = He(n.placement), c = Bo(s), u = [Oe, Ve].indexOf(s) >= 0, f = u ? "height" : "width";
  if (!(!a || !i)) {
    var b = Jf(o.padding, n), g = Do(a), d = c === "y" ? Ce : Oe, m = c === "y" ? je : Ve, p = n.rects.reference[f] + n.rects.reference[c] - i[c] - n.rects.popper[f], h = i[c] - n.rects.reference[c], y = Mn(a), C = y ? c === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, k = p / 2 - h / 2, x = b[d], v = C - g[f] - b[m], O = C / 2 - g[f] / 2 + k, _ = gn(x, O, v), B = c;
    n.modifiersData[r] = (t = {}, t[B] = _, t.centerOffset = _ - O, t);
  }
}
function Qf(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Ns(t.elements.popper, o) && (t.elements.arrow = o));
}
const ew = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Zf,
  effect: Qf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Kt(e) {
  return e.split("-")[1];
}
var tw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function nw(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Yt(n * o) / o || 0,
    y: Yt(r * o) / o || 0
  };
}
function Ua(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, s = e.position, c = e.gpuAcceleration, u = e.adaptive, f = e.roundOffsets, b = e.isFixed, g = i.x, d = g === void 0 ? 0 : g, m = i.y, p = m === void 0 ? 0 : m, h = typeof f == "function" ? f({
    x: d,
    y: p
  }) : {
    x: d,
    y: p
  };
  d = h.x, p = h.y;
  var y = i.hasOwnProperty("x"), C = i.hasOwnProperty("y"), k = Oe, x = Ce, v = window;
  if (u) {
    var O = Mn(n), _ = "clientHeight", B = "clientWidth";
    if (O === Ae(n) && (O = ut(n), tt(O).position !== "static" && s === "absolute" && (_ = "scrollHeight", B = "scrollWidth")), O = O, o === Ce || (o === Oe || o === Ve) && a === Sn) {
      x = je;
      var S = b && O === v && v.visualViewport ? v.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[_]
      );
      p -= S - r.height, p *= c ? 1 : -1;
    }
    if (o === Oe || (o === Ce || o === je) && a === Sn) {
      k = Ve;
      var P = b && O === v && v.visualViewport ? v.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[B]
      );
      d -= P - r.width, d *= c ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: s
  }, u && tw), j = f === !0 ? nw({
    x: d,
    y: p
  }, Ae(n)) : {
    x: d,
    y: p
  };
  if (d = j.x, p = j.y, c) {
    var V;
    return Object.assign({}, N, (V = {}, V[x] = C ? "0" : "", V[k] = y ? "0" : "", V.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + p + "px)" : "translate3d(" + d + "px, " + p + "px, 0)", V));
  }
  return Object.assign({}, N, (t = {}, t[x] = C ? p + "px" : "", t[k] = y ? d + "px" : "", t.transform = "", t));
}
function rw(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, s = n.roundOffsets, c = s === void 0 ? !0 : s, u = {
    placement: He(t.placement),
    variation: Kt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ua(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ua(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const ow = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: rw,
  data: {}
};
var Un = {
  passive: !0
};
function aw(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, s = i === void 0 ? !0 : i, c = Ae(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && u.forEach(function(f) {
    f.addEventListener("scroll", n.update, Un);
  }), s && c.addEventListener("resize", n.update, Un), function() {
    a && u.forEach(function(f) {
      f.removeEventListener("scroll", n.update, Un);
    }), s && c.removeEventListener("resize", n.update, Un);
  };
}
const iw = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: aw,
  data: {}
};
var sw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Kn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return sw[t];
  });
}
var lw = {
  start: "end",
  end: "start"
};
function Ha(e) {
  return e.replace(/start|end/g, function(t) {
    return lw[t];
  });
}
function jo(e) {
  var t = Ae(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Vo(e) {
  return qt(ut(e)).left + jo(e).scrollLeft;
}
function cw(e, t) {
  var n = Ae(e), r = ut(e), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, s = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var u = ks();
    (u || !u && t === "fixed") && (s = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s + Vo(e),
    y: c
  };
}
function dw(e) {
  var t, n = ut(e), r = jo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = Et(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Et(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -r.scrollLeft + Vo(e), c = -r.scrollTop;
  return tt(o || n).direction === "rtl" && (s += Et(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: s,
    y: c
  };
}
function Lo(e) {
  var t = tt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Cs(e) {
  return ["html", "body", "#document"].indexOf(qe(e)) >= 0 ? e.ownerDocument.body : Be(e) && Lo(e) ? e : Cs(Tr(e));
}
function bn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Cs(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Ae(r), i = o ? [a].concat(a.visualViewport || [], Lo(r) ? r : []) : r, s = t.concat(i);
  return o ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(bn(Tr(i)))
  );
}
function io(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function pw(e, t) {
  var n = qt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Xa(e, t, n) {
  return t === ys ? io(cw(e, n)) : Ot(t) ? pw(t, n) : io(dw(ut(e)));
}
function uw(e) {
  var t = bn(Tr(e)), n = ["absolute", "fixed"].indexOf(tt(e).position) >= 0, r = n && Be(e) ? Mn(e) : e;
  return Ot(r) ? t.filter(function(o) {
    return Ot(o) && Ns(o, r) && qe(o) !== "body";
  }) : [];
}
function fw(e, t, n, r) {
  var o = t === "clippingParents" ? uw(e) : [].concat(t), a = [].concat(o, [n]), i = a[0], s = a.reduce(function(c, u) {
    var f = Xa(e, u, r);
    return c.top = Et(f.top, c.top), c.right = nr(f.right, c.right), c.bottom = nr(f.bottom, c.bottom), c.left = Et(f.left, c.left), c;
  }, Xa(e, i, r));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function Os(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? He(r) : null, a = r ? Kt(r) : null, i = t.x + t.width / 2 - n.width / 2, s = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ce:
      c = {
        x: i,
        y: t.y - n.height
      };
      break;
    case je:
      c = {
        x: i,
        y: t.y + t.height
      };
      break;
    case Ve:
      c = {
        x: t.x + t.width,
        y: s
      };
      break;
    case Oe:
      c = {
        x: t.x - n.width,
        y: s
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var u = o ? Bo(o) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (a) {
      case Wt:
        c[u] = c[u] - (t[f] / 2 - n[f] / 2);
        break;
      case Sn:
        c[u] = c[u] + (t[f] / 2 - n[f] / 2);
        break;
    }
  }
  return c;
}
function Cn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, i = a === void 0 ? e.strategy : a, s = n.boundary, c = s === void 0 ? If : s, u = n.rootBoundary, f = u === void 0 ? ys : u, b = n.elementContext, g = b === void 0 ? sn : b, d = n.altBoundary, m = d === void 0 ? !1 : d, p = n.padding, h = p === void 0 ? 0 : p, y = Ts(typeof h != "number" ? h : Ss(h, An)), C = g === sn ? Af : sn, k = e.rects.popper, x = e.elements[m ? C : g], v = fw(Ot(x) ? x : x.contextElement || ut(e.elements.popper), c, f, i), O = qt(e.elements.reference), _ = Os({
    reference: O,
    element: k,
    strategy: "absolute",
    placement: o
  }), B = io(Object.assign({}, k, _)), S = g === sn ? B : O, P = {
    top: v.top - S.top + y.top,
    bottom: S.bottom - v.bottom + y.bottom,
    left: v.left - S.left + y.left,
    right: S.right - v.right + y.right
  }, N = e.modifiersData.offset;
  if (g === sn && N) {
    var j = N[o];
    Object.keys(P).forEach(function(V) {
      var Z = [Ve, je].indexOf(V) >= 0 ? 1 : -1, K = [Ce, je].indexOf(V) >= 0 ? "y" : "x";
      P[V] += j[K] * Z;
    });
  }
  return P;
}
function ww(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, s = n.flipVariations, c = n.allowedAutoPlacements, u = c === void 0 ? xs : c, f = Kt(r), b = f ? s ? Fa : Fa.filter(function(m) {
    return Kt(m) === f;
  }) : An, g = b.filter(function(m) {
    return u.indexOf(m) >= 0;
  });
  g.length === 0 && (g = b);
  var d = g.reduce(function(m, p) {
    return m[p] = Cn(e, {
      placement: p,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[He(p)], m;
  }, {});
  return Object.keys(d).sort(function(m, p) {
    return d[m] - d[p];
  });
}
function mw(e) {
  if (He(e) === Ao)
    return [];
  var t = Kn(e);
  return [Ha(e), t, Ha(t)];
}
function hw(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, s = i === void 0 ? !0 : i, c = n.fallbackPlacements, u = n.padding, f = n.boundary, b = n.rootBoundary, g = n.altBoundary, d = n.flipVariations, m = d === void 0 ? !0 : d, p = n.allowedAutoPlacements, h = t.options.placement, y = He(h), C = y === h, k = c || (C || !m ? [Kn(h)] : mw(h)), x = [h].concat(k).reduce(function(F, Y) {
      return F.concat(He(Y) === Ao ? ww(t, {
        placement: Y,
        boundary: f,
        rootBoundary: b,
        padding: u,
        flipVariations: m,
        allowedAutoPlacements: p
      }) : Y);
    }, []), v = t.rects.reference, O = t.rects.popper, _ = /* @__PURE__ */ new Map(), B = !0, S = x[0], P = 0; P < x.length; P++) {
      var N = x[P], j = He(N), V = Kt(N) === Wt, Z = [Ce, je].indexOf(j) >= 0, K = Z ? "width" : "height", H = Cn(t, {
        placement: N,
        boundary: f,
        rootBoundary: b,
        altBoundary: g,
        padding: u
      }), te = Z ? V ? Ve : Oe : V ? je : Ce;
      v[K] > O[K] && (te = Kn(te));
      var ae = Kn(te), z = [];
      if (a && z.push(H[j] <= 0), s && z.push(H[te] <= 0, H[ae] <= 0), z.every(function(F) {
        return F;
      })) {
        S = N, B = !1;
        break;
      }
      _.set(N, z);
    }
    if (B)
      for (var E = m ? 3 : 1, I = function(Y) {
        var U = x.find(function(q) {
          var W = _.get(q);
          if (W)
            return W.slice(0, Y).every(function(J) {
              return J;
            });
        });
        if (U)
          return S = U, "break";
      }, X = E; X > 0; X--) {
        var G = I(X);
        if (G === "break")
          break;
      }
    t.placement !== S && (t.modifiersData[r]._skip = !0, t.placement = S, t.reset = !0);
  }
}
const gw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: hw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Wa(e, t, n) {
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
function Ya(e) {
  return [Ce, Ve, je, Oe].some(function(t) {
    return e[t] >= 0;
  });
}
function bw(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Cn(t, {
    elementContext: "reference"
  }), s = Cn(t, {
    altBoundary: !0
  }), c = Wa(i, r), u = Wa(s, o, a), f = Ya(c), b = Ya(u);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: f,
    hasPopperEscaped: b
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": b
  });
}
const vw = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: bw
};
function yw(e, t, n) {
  var r = He(e), o = [Oe, Ce].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, i = a[0], s = a[1];
  return i = i || 0, s = (s || 0) * o, [Oe, Ve].indexOf(r) >= 0 ? {
    x: s,
    y: i
  } : {
    x: i,
    y: s
  };
}
function xw(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = xs.reduce(function(f, b) {
    return f[b] = yw(b, t.rects, a), f;
  }, {}), s = i[t.placement], c = s.x, u = s.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[r] = i;
}
const kw = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: xw
};
function Nw(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Os({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ew = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Nw,
  data: {}
};
function Tw(e) {
  return e === "x" ? "y" : "x";
}
function Sw(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, s = i === void 0 ? !1 : i, c = n.boundary, u = n.rootBoundary, f = n.altBoundary, b = n.padding, g = n.tether, d = g === void 0 ? !0 : g, m = n.tetherOffset, p = m === void 0 ? 0 : m, h = Cn(t, {
    boundary: c,
    rootBoundary: u,
    padding: b,
    altBoundary: f
  }), y = He(t.placement), C = Kt(t.placement), k = !C, x = Bo(y), v = Tw(x), O = t.modifiersData.popperOffsets, _ = t.rects.reference, B = t.rects.popper, S = typeof p == "function" ? p(Object.assign({}, t.rects, {
    placement: t.placement
  })) : p, P = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, j = {
    x: 0,
    y: 0
  };
  if (O) {
    if (a) {
      var V, Z = x === "y" ? Ce : Oe, K = x === "y" ? je : Ve, H = x === "y" ? "height" : "width", te = O[x], ae = te + h[Z], z = te - h[K], E = d ? -B[H] / 2 : 0, I = C === Wt ? _[H] : B[H], X = C === Wt ? -B[H] : -_[H], G = t.elements.arrow, F = d && G ? Do(G) : {
        width: 0,
        height: 0
      }, Y = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Es(), U = Y[Z], q = Y[K], W = gn(0, _[H], F[H]), J = k ? _[H] / 2 - E - W - U - P.mainAxis : I - W - U - P.mainAxis, Q = k ? -_[H] / 2 + E + W + q + P.mainAxis : X + W + q + P.mainAxis, pe = t.elements.arrow && Mn(t.elements.arrow), A = pe ? x === "y" ? pe.clientTop || 0 : pe.clientLeft || 0 : 0, ke = (V = N == null ? void 0 : N[x]) != null ? V : 0, L = te + J - ke - A, xe = te + Q - ke, ze = gn(d ? nr(ae, L) : ae, te, d ? Et(z, xe) : z);
      O[x] = ze, j[x] = ze - te;
    }
    if (s) {
      var ft, Ee = x === "x" ? Ce : Oe, Bn = x === "x" ? je : Ve, Fe = O[v], Rt = v === "y" ? "height" : "width", wt = Fe + h[Ee], Pt = Fe - h[Bn], _t = [Ce, Oe].indexOf(y) !== -1, $t = (ft = N == null ? void 0 : N[v]) != null ? ft : 0, mt = _t ? wt : Fe - _[Rt] - B[Rt] - $t + P.altAxis, Zt = _t ? Fe + _[Rt] + B[Rt] - $t - P.altAxis : Pt, jn = d && _t ? Kf(mt, Fe, Zt) : gn(d ? mt : wt, Fe, d ? Zt : Pt);
      O[v] = jn, j[v] = jn - Fe;
    }
    t.modifiersData[r] = j;
  }
}
const Cw = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Sw,
  requiresIfExists: ["offset"]
};
function Ow(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Rw(e) {
  return e === Ae(e) || !Be(e) ? jo(e) : Ow(e);
}
function Pw(e) {
  var t = e.getBoundingClientRect(), n = Yt(t.width) / e.offsetWidth || 1, r = Yt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function _w(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && Pw(t), a = ut(t), i = qt(e, o, n), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((qe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Lo(a)) && (s = Rw(t)), Be(t) ? (c = qt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Vo(a))), {
    x: i.left + s.scrollLeft - c.x,
    y: i.top + s.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function $w(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(s) {
      if (!n.has(s)) {
        var c = t.get(s);
        c && o(c);
      }
    }), r.push(a);
  }
  return e.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function Iw(e) {
  var t = $w(e);
  return Uf.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Aw(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Mw(e) {
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
var qa = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ka() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Dw(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? qa : o;
  return function(s, c, u) {
    u === void 0 && (u = a);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, qa, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: c
      },
      attributes: {},
      styles: {}
    }, b = [], g = !1, d = {
      state: f,
      setOptions: function(y) {
        var C = typeof y == "function" ? y(f.options) : y;
        p(), f.options = Object.assign({}, a, f.options, C), f.scrollParents = {
          reference: Ot(s) ? bn(s) : s.contextElement ? bn(s.contextElement) : [],
          popper: bn(c)
        };
        var k = Iw(Mw([].concat(r, f.options.modifiers)));
        return f.orderedModifiers = k.filter(function(x) {
          return x.enabled;
        }), m(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var y = f.elements, C = y.reference, k = y.popper;
          if (Ka(C, k)) {
            f.rects = {
              reference: _w(C, Mn(k), f.options.strategy === "fixed"),
              popper: Do(k)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(P) {
              return f.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var x = 0; x < f.orderedModifiers.length; x++) {
              if (f.reset === !0) {
                f.reset = !1, x = -1;
                continue;
              }
              var v = f.orderedModifiers[x], O = v.fn, _ = v.options, B = _ === void 0 ? {} : _, S = v.name;
              typeof O == "function" && (f = O({
                state: f,
                options: B,
                name: S,
                instance: d
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Aw(function() {
        return new Promise(function(h) {
          d.forceUpdate(), h(f);
        });
      }),
      destroy: function() {
        p(), g = !0;
      }
    };
    if (!Ka(s, c))
      return d;
    d.setOptions(u).then(function(h) {
      !g && u.onFirstUpdate && u.onFirstUpdate(h);
    });
    function m() {
      f.orderedModifiers.forEach(function(h) {
        var y = h.name, C = h.options, k = C === void 0 ? {} : C, x = h.effect;
        if (typeof x == "function") {
          var v = x({
            state: f,
            name: y,
            instance: d,
            options: k
          }), O = function() {
          };
          b.push(v || O);
        }
      });
    }
    function p() {
      b.forEach(function(h) {
        return h();
      }), b = [];
    }
    return d;
  };
}
var Bw = [iw, Ew, ow, Wf, kw, gw, Cw, ew, vw], jw = /* @__PURE__ */ Dw({
  defaultModifiers: Bw
});
const Rs = "Popper";
function Vw(e) {
  return vs(Rs, e);
}
_f(Rs, ["root"]);
const Lw = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], zw = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Fw(e, t) {
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
function Sr(e) {
  return e.nodeType !== void 0;
}
function Gw(e) {
  return !Sr(e);
}
const Uw = () => No({
  root: ["root"]
}, Nf(Vw)), Hw = {}, Xw = /* @__PURE__ */ M.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: s,
    modifiers: c,
    open: u,
    placement: f,
    popperOptions: b,
    popperRef: g,
    slotProps: d = {},
    slots: m = {},
    TransitionProps: p
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, h = Ne(t, Lw), y = M.useRef(null), C = St(y, n), k = M.useRef(null), x = St(k, g), v = M.useRef(x);
  Xt(() => {
    v.current = x;
  }, [x]), M.useImperativeHandle(g, () => k.current, []);
  const O = Fw(f, i), [_, B] = M.useState(O), [S, P] = M.useState(rr(o));
  M.useEffect(() => {
    k.current && k.current.forceUpdate();
  }), M.useEffect(() => {
    o && P(rr(o));
  }, [o]), Xt(() => {
    if (!S || !u)
      return;
    const K = (ae) => {
      B(ae.placement);
    };
    if (process.env.NODE_ENV !== "production" && S && Sr(S) && S.nodeType === 1) {
      const ae = S.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ae.top === 0 && ae.left === 0 && ae.right === 0 && ae.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let H = [{
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
        K(ae);
      }
    }];
    c != null && (H = H.concat(c)), b && b.modifiers != null && (H = H.concat(b.modifiers));
    const te = jw(S, y.current, $({
      placement: O
    }, b, {
      modifiers: H
    }));
    return v.current(te), () => {
      te.destroy(), v.current(null);
    };
  }, [S, s, c, u, b, O]);
  const N = {
    placement: _
  };
  p !== null && (N.TransitionProps = p);
  const j = Uw(), V = (r = m.root) != null ? r : "div", Z = Of({
    elementType: V,
    externalSlotProps: d.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: C
    },
    ownerState: t,
    className: j.root
  });
  return /* @__PURE__ */ l(V, $({}, Z, {
    children: typeof a == "function" ? a(N) : a
  }));
}), Ps = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: s = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: f,
    placement: b = "bottom",
    popperOptions: g = Hw,
    popperRef: d,
    style: m,
    transition: p = !1,
    slotProps: h = {},
    slots: y = {}
  } = t, C = Ne(t, zw), [k, x] = M.useState(!0), v = () => {
    x(!1);
  }, O = () => {
    x(!0);
  };
  if (!c && !f && (!p || k))
    return null;
  let _;
  if (a)
    _ = a;
  else if (r) {
    const P = rr(r);
    _ = P && Sr(P) ? Zn(P).body : Zn(null).body;
  }
  const B = !f && c && (!p || k) ? "none" : void 0, S = p ? {
    in: f,
    onEnter: v,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ l(tr, {
    disablePortal: s,
    container: _,
    children: /* @__PURE__ */ l(Xw, $({
      anchorEl: r,
      direction: i,
      disablePortal: s,
      modifiers: u,
      ref: n,
      open: p ? !k : f,
      placement: b,
      popperOptions: g,
      popperRef: d,
      slotProps: h,
      slots: y
    }, C, {
      style: $({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: B
      }, m),
      TransitionProps: S,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ps.propTypes = {
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
  anchorEl: xo(w.oneOfType([En, w.object, w.func]), (e) => {
    if (e.open) {
      const t = rr(e.anchorEl);
      if (t && Sr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Gw(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: w.oneOfType([En, w.func]),
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
  popperRef: ns,
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
function _s() {
  const e = ws(Po);
  return process.env.NODE_ENV !== "production" && M.useDebugValue(e), e[_o] || e;
}
function so(e, t) {
  return so = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, so(e, t);
}
function Ww(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, so(e, t);
}
const Ja = {
  disabled: !1
};
var Yw = process.env.NODE_ENV !== "production" ? w.oneOfType([w.number, w.shape({
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
const $s = D.createContext(null);
var qw = function(t) {
  return t.scrollTop;
}, fn = "unmounted", bt = "exited", vt = "entering", Lt = "entered", lo = "exiting", nt = /* @__PURE__ */ function(e) {
  Ww(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var i = o, s = i && !i.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? s ? (c = bt, a.appearStatus = vt) : c = Lt : r.unmountOnExit || r.mountOnEnter ? c = fn : c = bt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === fn ? {
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
      this.props.in ? i !== vt && i !== Lt && (a = vt) : (i === vt || i === Lt) && (a = lo);
    }
    this.updateStatus(!1, a);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, a, i, s;
    return a = i = s = o, o != null && typeof o != "number" && (a = o.exit, i = o.enter, s = o.appear !== void 0 ? o.appear : i), {
      exit: a,
      enter: i,
      appear: s
    };
  }, n.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === vt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : zn.findDOMNode(this);
          i && qw(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === bt && this.setState({
        status: fn
      });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, s = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [s] : [zn.findDOMNode(this), s], u = c[0], f = c[1], b = this.getTimeouts(), g = s ? b.appear : b.enter;
    if (!o && !i || Ja.disabled) {
      this.safeSetState({
        status: Lt
      }, function() {
        a.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, f), this.safeSetState({
      status: vt
    }, function() {
      a.props.onEntering(u, f), a.onTransitionEnd(g, function() {
        a.safeSetState({
          status: Lt
        }, function() {
          a.props.onEntered(u, f);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : zn.findDOMNode(this);
    if (!a || Ja.disabled) {
      this.safeSetState({
        status: bt
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
          status: bt
        }, function() {
          o.props.onExited(s);
        });
      });
    });
  }, n.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, n.safeSetState = function(o, a) {
    a = this.setNextCallback(a), this.setState(o, a);
  }, n.setNextCallback = function(o) {
    var a = this, i = !0;
    return this.nextCallback = function(s) {
      i && (i = !1, a.nextCallback = null, o(s));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var i = this.props.nodeRef ? this.props.nodeRef.current : zn.findDOMNode(this), s = o == null && !this.props.addEndListener;
    if (!i || s) {
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
    if (o === fn)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var s = Ne(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ D.createElement($s.Provider, {
        value: null
      }, typeof i == "function" ? i(o, s) : D.cloneElement(D.Children.only(i), s))
    );
  }, t;
}(D.Component);
nt.contextType = $s;
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
    var n = Yw;
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
nt.UNMOUNTED = fn;
nt.EXITED = bt;
nt.ENTERING = vt;
nt.ENTERED = Lt;
nt.EXITING = lo;
const Kw = nt, Jw = (e) => e.scrollTop;
function Za(e, t) {
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
const Zw = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function co(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Qw = {
  entering: {
    opacity: 1,
    transform: co(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Hr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), zo = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: i,
    in: s,
    onEnter: c,
    onEntered: u,
    onEntering: f,
    onExit: b,
    onExited: g,
    onExiting: d,
    style: m,
    timeout: p = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = Kw
  } = t, y = Ne(t, Zw), C = pn(), k = M.useRef(), x = _s(), v = M.useRef(null), O = St(v, a.ref, n), _ = (K) => (H) => {
    if (K) {
      const te = v.current;
      H === void 0 ? K(te) : K(te, H);
    }
  }, B = _(f), S = _((K, H) => {
    Jw(K);
    const {
      duration: te,
      delay: ae,
      easing: z
    } = Za({
      style: m,
      timeout: p,
      easing: i
    }, {
      mode: "enter"
    });
    let E;
    p === "auto" ? (E = x.transitions.getAutoHeightDuration(K.clientHeight), k.current = E) : E = te, K.style.transition = [x.transitions.create("opacity", {
      duration: E,
      delay: ae
    }), x.transitions.create("transform", {
      duration: Hr ? E : E * 0.666,
      delay: ae,
      easing: z
    })].join(","), c && c(K, H);
  }), P = _(u), N = _(d), j = _((K) => {
    const {
      duration: H,
      delay: te,
      easing: ae
    } = Za({
      style: m,
      timeout: p,
      easing: i
    }, {
      mode: "exit"
    });
    let z;
    p === "auto" ? (z = x.transitions.getAutoHeightDuration(K.clientHeight), k.current = z) : z = H, K.style.transition = [x.transitions.create("opacity", {
      duration: z,
      delay: te
    }), x.transitions.create("transform", {
      duration: Hr ? z : z * 0.666,
      delay: Hr ? te : te || z * 0.333,
      easing: ae
    })].join(","), K.style.opacity = 0, K.style.transform = co(0.75), b && b(K);
  }), V = _(g);
  return /* @__PURE__ */ l(h, $({
    appear: o,
    in: s,
    nodeRef: v,
    onEnter: S,
    onEntered: P,
    onEntering: B,
    onExit: j,
    onExited: V,
    onExiting: N,
    addEndListener: (K) => {
      p === "auto" && C.start(k.current || 0, K), r && r(v.current, K);
    },
    timeout: p === "auto" ? null : p
  }, y, {
    children: (K, H) => /* @__PURE__ */ M.cloneElement(a, $({
      style: $({
        opacity: 0,
        transform: co(0.75),
        visibility: K === "exited" && !s ? "hidden" : void 0
      }, Qw[K], m, a.props.style),
      ref: O
    }, H))
  }));
});
process.env.NODE_ENV !== "production" && (zo.propTypes = {
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
  children: es.isRequired,
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
zo.muiSupportAuto = !0;
const Qa = zo, em = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], tm = In(Ps, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Is = /* @__PURE__ */ M.forwardRef(function(t, n) {
  var r;
  const o = fs(), a = $o({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: s,
    components: c,
    componentsProps: u,
    container: f,
    disablePortal: b,
    keepMounted: g,
    modifiers: d,
    open: m,
    placement: p,
    popperOptions: h,
    popperRef: y,
    transition: C,
    slots: k,
    slotProps: x
  } = a, v = Ne(a, em), O = (r = k == null ? void 0 : k.root) != null ? r : c == null ? void 0 : c.Root, _ = $({
    anchorEl: i,
    container: f,
    disablePortal: b,
    keepMounted: g,
    modifiers: d,
    open: m,
    placement: p,
    popperOptions: h,
    popperRef: y,
    transition: C
  }, v);
  return /* @__PURE__ */ l(tm, $({
    as: s,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: x ?? u
  }, _, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Is.propTypes = {
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
  anchorEl: w.oneOfType([En, w.object, w.func]),
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
  container: w.oneOfType([En, w.func]),
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
  popperRef: ns,
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
const As = Is;
function nm(e) {
  return mr("MuiTooltip", e);
}
const rm = cs("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), st = rm, om = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function am(e) {
  return Math.round(e * 1e5) / 1e5;
}
const im = (e) => {
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
  return No(i, nm, t);
}, sm = In(As, {
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
}) => $({
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
  [`&[data-popper-placement*="right"] .${st.arrow}`]: $({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${st.arrow}`]: $({}, t.isRtl ? {
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
})), lm = In("div", {
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
}) => $({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : ms(e.palette.grey[700], 0.92),
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
  lineHeight: `${am(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${st.popper}[data-popper-placement*="left"] &`]: $({
    transformOrigin: "right center"
  }, t.isRtl ? $({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : $({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${st.popper}[data-popper-placement*="right"] &`]: $({
    transformOrigin: "left center"
  }, t.isRtl ? $({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : $({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${st.popper}[data-popper-placement*="top"] &`]: $({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${st.popper}[data-popper-placement*="bottom"] &`]: $({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), cm = In("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : ms(e.palette.grey[700], 0.9),
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
let Hn = !1;
const ei = new Pn();
let ln = {
  x: 0,
  y: 0
};
function Xn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Ms = /* @__PURE__ */ M.forwardRef(function(t, n) {
  var r, o, a, i, s, c, u, f, b, g, d, m, p, h, y, C, k, x, v;
  const O = $o({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: _ = !1,
    children: B,
    components: S = {},
    componentsProps: P = {},
    describeChild: N = !1,
    disableFocusListener: j = !1,
    disableHoverListener: V = !1,
    disableInteractive: Z = !1,
    disableTouchListener: K = !1,
    enterDelay: H = 100,
    enterNextDelay: te = 0,
    enterTouchDelay: ae = 700,
    followCursor: z = !1,
    id: E,
    leaveDelay: I = 0,
    leaveTouchDelay: X = 1500,
    onClose: G,
    onOpen: F,
    open: Y,
    placement: U = "bottom",
    PopperComponent: q,
    PopperProps: W = {},
    slotProps: J = {},
    slots: Q = {},
    title: pe,
    TransitionComponent: A = Qa,
    TransitionProps: ke
  } = O, L = Ne(O, om), xe = /* @__PURE__ */ M.isValidElement(B) ? B : /* @__PURE__ */ l("span", {
    children: B
  }), ze = _s(), ft = ze.direction === "rtl", [Ee, Bn] = M.useState(), [Fe, Rt] = M.useState(null), wt = M.useRef(!1), Pt = Z || z, _t = pn(), $t = pn(), mt = pn(), Zt = pn(), [jn, Uo] = os({
    controlled: Y,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ke = jn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = M.useRef(Y !== void 0);
    M.useEffect(() => {
      Ee && Ee.disabled && !ee && pe !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [pe, Ee, ee]);
  }
  const Cr = rs(E), Qt = M.useRef(), Vn = ro(() => {
    Qt.current !== void 0 && (document.body.style.WebkitUserSelect = Qt.current, Qt.current = void 0), Zt.clear();
  });
  M.useEffect(() => Vn, [Vn]);
  const Ho = (ee) => {
    ei.clear(), Hn = !0, Uo(!0), F && !Ke && F(ee);
  }, Ln = ro(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      ei.start(800 + I, () => {
        Hn = !1;
      }), Uo(!1), G && Ke && G(ee), _t.start(ze.transitions.duration.shortest, () => {
        wt.current = !1;
      });
    }
  ), Or = (ee) => {
    wt.current && ee.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), $t.clear(), mt.clear(), H || Hn && te ? $t.start(Hn ? te : H, () => {
      Ho(ee);
    }) : Ho(ee));
  }, Xo = (ee) => {
    $t.clear(), mt.start(I, () => {
      Ln(ee);
    });
  }, {
    isFocusVisibleRef: Wo,
    onBlur: ol,
    onFocus: al,
    ref: il
  } = as(), [, Yo] = M.useState(!1), qo = (ee) => {
    ol(ee), Wo.current === !1 && (Yo(!1), Xo(ee));
  }, Ko = (ee) => {
    Ee || Bn(ee.currentTarget), al(ee), Wo.current === !0 && (Yo(!0), Or(ee));
  }, Jo = (ee) => {
    wt.current = !0;
    const _e = xe.props;
    _e.onTouchStart && _e.onTouchStart(ee);
  }, Zo = Or, Qo = Xo, sl = (ee) => {
    Jo(ee), mt.clear(), _t.clear(), Vn(), Qt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Zt.start(ae, () => {
      document.body.style.WebkitUserSelect = Qt.current, Or(ee);
    });
  }, ll = (ee) => {
    xe.props.onTouchEnd && xe.props.onTouchEnd(ee), Vn(), mt.start(X, () => {
      Ln(ee);
    });
  };
  M.useEffect(() => {
    if (!Ke)
      return;
    function ee(_e) {
      (_e.key === "Escape" || _e.key === "Esc") && Ln(_e);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [Ln, Ke]);
  const cl = St(xe.ref, il, Bn, n);
  !pe && pe !== 0 && (Ke = !1);
  const Rr = M.useRef(), dl = (ee) => {
    const _e = xe.props;
    _e.onMouseMove && _e.onMouseMove(ee), ln = {
      x: ee.clientX,
      y: ee.clientY
    }, Rr.current && Rr.current.update();
  }, en = {}, Pr = typeof pe == "string";
  N ? (en.title = !Ke && Pr && !V ? pe : null, en["aria-describedby"] = Ke ? Cr : null) : (en["aria-label"] = Pr ? pe : null, en["aria-labelledby"] = Ke && !Pr ? Cr : null);
  const Me = $({}, en, L, xe.props, {
    className: Nt(L.className, xe.props.className),
    onTouchStart: Jo,
    ref: cl
  }, z ? {
    onMouseMove: dl
  } : {});
  process.env.NODE_ENV !== "production" && (Me["data-mui-internal-clone-element"] = !0, M.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const tn = {};
  K || (Me.onTouchStart = sl, Me.onTouchEnd = ll), V || (Me.onMouseOver = Xn(Zo, Me.onMouseOver), Me.onMouseLeave = Xn(Qo, Me.onMouseLeave), Pt || (tn.onMouseOver = Zo, tn.onMouseLeave = Qo)), j || (Me.onFocus = Xn(Ko, Me.onFocus), Me.onBlur = Xn(qo, Me.onBlur), Pt || (tn.onFocus = Ko, tn.onBlur = qo)), process.env.NODE_ENV !== "production" && xe.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));
  const pl = M.useMemo(() => {
    var ee;
    let _e = [{
      name: "arrow",
      enabled: !!Fe,
      options: {
        element: Fe,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && (_e = _e.concat(W.popperOptions.modifiers)), $({}, W.popperOptions, {
      modifiers: _e
    });
  }, [Fe, W]), nn = $({}, O, {
    isRtl: ft,
    arrow: _,
    disableInteractive: Pt,
    placement: U,
    PopperComponentProp: q,
    touch: wt.current
  }), _r = im(nn), ea = (r = (o = Q.popper) != null ? o : S.Popper) != null ? r : sm, ta = (a = (i = (s = Q.transition) != null ? s : S.Transition) != null ? i : A) != null ? a : Qa, na = (c = (u = Q.tooltip) != null ? u : S.Tooltip) != null ? c : lm, ra = (f = (b = Q.arrow) != null ? b : S.Arrow) != null ? f : cm, ul = un(ea, $({}, W, (g = J.popper) != null ? g : P.popper, {
    className: Nt(_r.popper, W == null ? void 0 : W.className, (d = (m = J.popper) != null ? m : P.popper) == null ? void 0 : d.className)
  }), nn), fl = un(ta, $({}, ke, (p = J.transition) != null ? p : P.transition), nn), wl = un(na, $({}, (h = J.tooltip) != null ? h : P.tooltip, {
    className: Nt(_r.tooltip, (y = (C = J.tooltip) != null ? C : P.tooltip) == null ? void 0 : y.className)
  }), nn), ml = un(ra, $({}, (k = J.arrow) != null ? k : P.arrow, {
    className: Nt(_r.arrow, (x = (v = J.arrow) != null ? v : P.arrow) == null ? void 0 : x.className)
  }), nn);
  return /* @__PURE__ */ T(M.Fragment, {
    children: [/* @__PURE__ */ M.cloneElement(xe, Me), /* @__PURE__ */ l(ea, $({
      as: q ?? As,
      placement: U,
      anchorEl: z ? {
        getBoundingClientRect: () => ({
          top: ln.y,
          left: ln.x,
          right: ln.x,
          bottom: ln.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Rr,
      open: Ee ? Ke : !1,
      id: Cr,
      transition: !0
    }, tn, ul, {
      popperOptions: pl,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ l(ta, $({
        timeout: ze.transitions.duration.shorter
      }, ee, fl, {
        children: /* @__PURE__ */ T(na, $({}, wl, {
          children: [pe, _ ? /* @__PURE__ */ l(ra, $({}, ml, {
            ref: Rt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ms.propTypes = {
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
  children: es.isRequired,
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
const dm = Ms;
function ti(e, t, n) {
  return e ? /* @__PURE__ */ l(gi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ l("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ds(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: s = !1,
    className: c,
    isDisabled: u = !1,
    isDense: f = !0,
    isSubMenuParent: b = !1,
    hasDisabledGutters: g = !1,
    hasDivider: d = !1,
    focusVisibleClassName: m,
    id: p,
    children: h
  } = e, y = /* @__PURE__ */ l(
    rc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: s,
      className: c,
      disabled: u,
      dense: f,
      disableGutters: g,
      divider: d,
      focusVisibleClassName: m,
      onClick: t,
      id: p,
      children: n ? /* @__PURE__ */ T(dt, { children: [
        ti(a, n, !0),
        /* @__PURE__ */ l(oc, { primary: n, inset: !a && o }),
        b ? /* @__PURE__ */ l(gi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ l(gs, {}) }) : ti(i, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ l(dm, { title: r, placement: "right", children: /* @__PURE__ */ l("div", { children: y }) }) : y;
}
function Bs(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function pm(e) {
  const [t, n] = fe(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, i = (u) => {
    n(u.currentTarget);
  }, s = () => {
    n(void 0);
  }, c = () => {
    let u = Bs(a).filter((f) => "menuItem" in f.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === r.id
    ), /* @__PURE__ */ l(js, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ T(dt, { children: [
    /* @__PURE__ */ l(Ds, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ l(
      ac,
      {
        anchorEl: t,
        open: !!t,
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
      r.id
    )
  ] });
}
const um = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function js(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = ct(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Bs(t).filter((m) => !("menuItem" in m.group))
    ), b = Object.values(f).sort(
      (m, p) => (m.group.order || 0) - (p.group.order || 0)
    ), g = [];
    b.forEach((m) => {
      um(m.id, t.items).forEach(
        (p) => g.push({ item: p, isLastItemInGroup: !1 })
      ), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !0);
    }), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !1);
    const d = g.some(
      (m) => "iconPathBefore" in m.item && m.item.iconPathBefore
    );
    return { items: g, allowForLeadingIcons: d };
  }, [o, t]), s = ({ item: f, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: f.label,
    tooltip: f.tooltip,
    iconPathBefore: "iconPathBefore" in f ? f.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in f ? f.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ l("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ l("div", { role: "menu", "aria-label": u, children: a.map((f, b) => {
    const { item: g } = f, d = s(f);
    if ("command" in g) {
      const m = g.group + b;
      return /* @__PURE__ */ l(
        Ds,
        {
          onClick: (p) => {
            n == null || n(p), r(g);
          },
          ...d
        },
        m
      );
    }
    return /* @__PURE__ */ l(
      pm,
      {
        parentMenuItem: g,
        parentItemProps: d,
        ...e
      },
      u + g.id
    );
  }) }, u);
}
function fm(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([i, s]) => ({ id: i, group: s })).filter((i) => "column" in i.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ l(js, { ...e, includedGroups: a });
}
function wm({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ T(
    bi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ l("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ l(ic, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ l(
          fm,
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
function mm({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = ct(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((s) => {
      if (s === "isExtensible")
        return;
      const c = s, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? i.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${s} (${typeof u}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((s, c) => (s.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ l(
    bi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, s) => /* @__PURE__ */ l(
        wm,
        {
          commandHandler: e,
          menuDefinition: n,
          ...i,
          className: t
        },
        s
      ))
    }
  );
}
function hm(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const po = (e, t, n = {}) => {
  const r = kt(t);
  r.current = t;
  const o = kt(n);
  o.current = hm(o.current);
  const [a, i] = fe(() => r.current), [s, c] = fe(!0);
  return Xe(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const f = await e();
        u && (i(() => f), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [e]), [a, s];
}, gm = hs(/* @__PURE__ */ l("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function bm({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: s
}) {
  const [c, u] = fe(!1), [f, b] = fe(!1), g = Se(() => {
    c && u(!1), b(!1);
  }, [c]), d = Se((x) => {
    x.stopPropagation(), u((v) => {
      const O = !v;
      return O && x.shiftKey ? b(!0) : O || b(!1), O;
    });
  }, []), m = Se(
    (x) => (g(), r(x)),
    [r, g]
  ), [p, h] = fe({ top: 1, left: 1 });
  Xe(() => {
    if (c) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const v = x.getBoundingClientRect(), O = window.scrollY, _ = window.scrollX, B = v.top + O + x.clientHeight, S = v.left + _;
        h({ top: B, left: S });
      }
    }
  }, [c, o]);
  const [y] = po(
    Se(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [C] = po(
    Se(async () => (e == null ? void 0 : e(!0)) ?? n ?? y, [e, n, y, c]),
    n ?? y
  ), k = f && C ? C : y;
  return /* @__PURE__ */ T(dt, { children: [
    /* @__PURE__ */ l(
      vi,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: d,
        children: s ?? /* @__PURE__ */ l(gm, {})
      }
    ),
    /* @__PURE__ */ l(
      sc,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: g,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: p.top,
            left: p.left
          }
        },
        children: k ? /* @__PURE__ */ l(
          mm,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: m,
            multiColumnMenu: k
          }
        ) : void 0
      }
    )
  ] });
}
function Ng({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: s,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ l(
    vi,
    {
      id: e,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${s ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
const Dn = or(({ className: e, ...t }, n) => /* @__PURE__ */ l(Bl, { size: 35, className: R("tw-animate-spin", e), ...t, ref: n }));
Dn.displayName = "Spinner";
function Eg({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: s = !1,
  className: c,
  defaultValue: u,
  value: f,
  onChange: b,
  onFocus: g,
  onBlur: d
}) {
  return /* @__PURE__ */ T("div", { className: R("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ l(
      Ze,
      {
        htmlFor: e,
        className: R({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ l(
      On,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: s,
        className: R(c, { "tw-border-red-600": n }),
        defaultValue: u,
        value: f,
        onChange: b,
        onFocus: g,
        onBlur: d
      }
    ),
    /* @__PURE__ */ l("p", { className: R({ "tw-hidden": !o }), children: o })
  ] });
}
function Tg({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = kt(void 0);
  return /* @__PURE__ */ l("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ l(lc, { position: "static", id: r, children: /* @__PURE__ */ T(
    cc,
    {
      className: R("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ l(
          bm,
          {
            commandHandler: t,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ l("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const vm = sr(
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
), ym = D.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ l("div", { ref: r, role: "alert", className: R(vm({ variant: t }), e), ...n }));
ym.displayName = "Alert";
const xm = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ T(
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
xm.displayName = "AlertTitle";
const km = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
km.displayName = "AlertDescription";
const Nm = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Nm.displayName = "Card";
const Em = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: R("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Em.displayName = "CardHeader";
const Tm = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Tm.displayName = "CardTitle";
const Sm = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l("p", { ref: n, className: R("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Sm.displayName = "CardDescription";
const Cm = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l("div", { ref: n, className: R("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
Cm.displayName = "CardContent";
const Om = D.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ l(
    "div",
    {
      ref: n,
      className: R("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Om.displayName = "CardFooter";
function Sg({ ...e }) {
  return /* @__PURE__ */ l(
    pc,
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
const Rm = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ T(
  dn.Root,
  {
    ref: n,
    className: R(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ l(dn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ l(dn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ l(dn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
Rm.displayName = dn.Root.displayName;
const Pm = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
  Qr.Root,
  {
    className: R(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ l(
      Qr.Thumb,
      {
        className: R(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
        )
      }
    )
  }
));
Pm.displayName = Qr.Root.displayName;
const Cg = Pe.Root, _m = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
_m.displayName = Pe.List.displayName;
const $m = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
$m.displayName = Pe.Trigger.displayName;
const Im = D.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ l(
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
Im.displayName = Pe.Content.displayName;
function Og({
  isInstalling: e,
  handleClick: t,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ l(
    ye,
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
      children: e ? /* @__PURE__ */ l(Dn, { size: 15 }) : /* @__PURE__ */ T(dt, { children: [
        /* @__PURE__ */ l(jl, { size: 25, className: R("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function Rg({
  isEnabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ l(
    ye,
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
      children: e ? /* @__PURE__ */ T(dt, { children: [
        /* @__PURE__ */ l(Dn, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Pg({
  isDisabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ l(
    ye,
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
      children: e ? /* @__PURE__ */ T(dt, { children: [
        /* @__PURE__ */ l(Dn, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function _g({
  isUpdating: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ l(
    ye,
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
      children: e ? /* @__PURE__ */ T(dt, { children: [
        /* @__PURE__ */ l(Dn, { size: 15, className: "tw-mr-1 tw-text-white" }),
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
const Am = ["children", "options"], ni = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), ri = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Mm = ["style", "script"], Dm = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Bm = /mailto:/i, jm = /\n{2,}$/, Vs = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Vm = /^ *> ?/gm, Lm = /^ {2,}\n/, zm = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Ls = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, zs = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Fm = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Gm = /^(?:\n *)*\n/, Um = /\r\n?/g, Hm = /^\[\^([^\]]+)](:.*)\n/, Xm = /^\[\^([^\]]+)]/, Wm = /\f/g, Ym = /^\s*?\[(x|\s)\]/, Fs = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Gs = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Us = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, uo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, qm = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Hs = /^<!--[\s\S]*?(?:-->)/, Km = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, fo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Jm = /^\{.*\}$/, Zm = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Qm = /^<([^ >]+@[^ >]+)>/, eh = /^<([^ >]+:\/[^ >]+)>/, th = /-([a-z])?/gi, Xs = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, nh = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, rh = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, oh = /^\[([^\]]*)\] ?\[([^\]]*)\]/, ah = /(\[|\])/g, ih = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, sh = /\t/g, lh = /^ *\| */, ch = /(^ *\||\| *$)/g, dh = / *$/, ph = /^ *:-+: *$/, uh = /^ *:-+ *$/, fh = /^ *-+: *$/, wh = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, mh = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, hh = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, gh = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, bh = /^\\([^0-9A-Za-z\s])/, vh = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, yh = /^\n+/, xh = /^([ \t]*)/, kh = /\\([^\\])/g, oi = / *\n+$/, Nh = /(?:^|\n)( *)$/, Fo = "(?:\\d+\\.)", Go = "(?:[*+-])";
function Ws(e) {
  return "( *)(" + (e === 1 ? Fo : Go) + ") +";
}
const Ys = Ws(1), qs = Ws(2);
function Ks(e) {
  return new RegExp("^" + (e === 1 ? Ys : qs));
}
const Eh = Ks(1), Th = Ks(2);
function Js(e) {
  return new RegExp("^" + (e === 1 ? Ys : qs) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Fo : Go) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Zs = Js(1), Qs = Js(2);
function el(e) {
  const t = e === 1 ? Fo : Go;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const tl = el(1), nl = el(2);
function ai(e, t) {
  const n = t === 1, r = n ? tl : nl, o = n ? Zs : Qs, a = n ? Eh : Th;
  return { t(i, s, c) {
    const u = Nh.exec(c);
    return u && (s.o || !s._ && !s.u) ? r.exec(i = u[1] + i) : null;
  }, i: re.HIGH, l(i, s, c) {
    const u = n ? +i[2] : void 0, f = i[0].replace(jm, `
`).match(o);
    let b = !1;
    return { p: f.map(function(g, d) {
      const m = a.exec(g)[0].length, p = new RegExp("^ {1," + m + "}", "gm"), h = g.replace(p, "").replace(a, ""), y = d === f.length - 1, C = h.indexOf(`

`) !== -1 || y && b;
      b = C;
      const k = c._, x = c.o;
      let v;
      c.o = !0, C ? (c._ = !1, v = h.replace(oi, `

`)) : (c._ = !0, v = h.replace(oi, ""));
      const O = s(v, c);
      return c._ = k, c.o = x, O;
    }), m: n, g: u };
  }, h: (i, s, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(u, f) {
    return e("li", { key: f }, s(u, c));
  })) };
}
const Sh = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Ch = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, rl = [Vs, Ls, zs, Fs, Us, Gs, Hs, Xs, Zs, tl, Qs, nl], Oh = [...rl, /^[^\n]+(?:  \n|\n{2,})/, uo, fo];
function Rh(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Ph(e) {
  return fh.test(e) ? "right" : ph.test(e) ? "center" : uh.test(e) ? "left" : null;
}
function ii(e, t, n) {
  const r = n.$;
  n.$ = !0;
  const o = t(e.trim(), n);
  n.$ = r;
  let a = [[]];
  return o.forEach(function(i, s) {
    i.type === "tableSeparator" ? s !== 0 && s !== o.length - 1 && a.push([]) : (i.type !== "text" || o[s + 1] != null && o[s + 1].type !== "tableSeparator" || (i.v = i.v.replace(dh, "")), a[a.length - 1].push(i));
  }), a;
}
function _h(e, t, n) {
  n._ = !0;
  const r = ii(e[1], t, n), o = e[2].replace(ch, "").split("|").map(Ph), a = function(i, s, c) {
    return i.trim().split(`
`).map(function(u) {
      return ii(u, s, c);
    });
  }(e[3], t, n);
  return n._ = !1, { S: o, A: a, L: r, type: "table" };
}
function si(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function ot(e) {
  return function(t, n) {
    return n._ ? e.exec(t) : null;
  };
}
function at(e) {
  return function(t, n) {
    return n._ || n.u ? e.exec(t) : null;
  };
}
function Je(e) {
  return function(t, n) {
    return n._ || n.u ? null : e.exec(t);
  };
}
function cn(e) {
  return function(t) {
    return e.exec(t);
  };
}
function $h(e, t, n) {
  if (t._ || t.u || n && !n.endsWith(`
`))
    return null;
  let r = "";
  e.split(`
`).every((a) => !rl.some((i) => i.test(a)) && (r += a + `
`, a.trim()));
  const o = r.trimEnd();
  return o == "" ? null : [r, o];
}
function Vt(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function li(e) {
  return e.replace(kh, "$1");
}
function Jn(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !0, n.u = !0;
  const a = e(t, n);
  return n._ = r, n.u = o, a;
}
function Ih(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !1, n.u = !0;
  const a = e(t, n);
  return n._ = r, n.u = o, a;
}
function Ah(e, t, n) {
  return n._ = !1, e(t, n);
}
const Xr = (e, t, n) => ({ v: Jn(t, e[1], n) });
function Wr() {
  return {};
}
function Yr() {
  return null;
}
function Mh(...e) {
  return e.filter(Boolean).join(" ");
}
function qr(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (; o.length && (r = r[o[0]], r !== void 0); )
    o.shift();
  return r || n;
}
var re;
function Dh(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Rh, t.namedCodesToUnicode = t.namedCodesToUnicode ? xt({}, ri, t.namedCodesToUnicode) : ri;
  const n = t.createElement || M.createElement;
  function r(d, m, ...p) {
    const h = qr(t.overrides, `${d}.props`, {});
    return n(function(y, C) {
      const k = qr(C, y);
      return k ? typeof k == "function" || typeof k == "object" && "render" in k ? k : qr(C, `${y}.component`, y) : y;
    }(d, t.overrides), xt({}, m, h, { className: Mh(m == null ? void 0 : m.className, h.className) || void 0 }), ...p);
  }
  function o(d) {
    let m = !1;
    t.forceInline ? m = !0 : t.forceBlock || (m = ih.test(d) === !1);
    const p = f(u(m ? d : `${d.trimEnd().replace(yh, "")}

`, { _: m }));
    for (; typeof p[p.length - 1] == "string" && !p[p.length - 1].trim(); )
      p.pop();
    if (t.wrapper === null)
      return p;
    const h = t.wrapper || (m ? "span" : "div");
    let y;
    if (p.length > 1 || t.forceWrapper)
      y = p;
    else {
      if (p.length === 1)
        return y = p[0], typeof y == "string" ? r("span", { key: "outer" }, y) : y;
      y = null;
    }
    return M.createElement(h, { key: "outer" }, y);
  }
  function a(d) {
    const m = d.match(Dm);
    return m ? m.reduce(function(p, h, y) {
      const C = h.indexOf("=");
      if (C !== -1) {
        const k = function(_) {
          return _.indexOf("-") !== -1 && _.match(Km) === null && (_ = _.replace(th, function(B, S) {
            return S.toUpperCase();
          })), _;
        }(h.slice(0, C)).trim(), x = function(_) {
          const B = _[0];
          return (B === '"' || B === "'") && _.length >= 2 && _[_.length - 1] === B ? _.slice(1, -1) : _;
        }(h.slice(C + 1).trim()), v = ni[k] || k, O = p[v] = function(_, B) {
          return _ === "style" ? B.split(/;\s?/).reduce(function(S, P) {
            const N = P.slice(0, P.indexOf(":"));
            return S[N.replace(/(-[a-z])/g, (j) => j[1].toUpperCase())] = P.slice(N.length + 1).trim(), S;
          }, {}) : _ === "href" ? Vt(B) : (B.match(Jm) && (B = B.slice(1, B.length - 1)), B === "true" || B !== "false" && B);
        }(k, x);
        typeof O == "string" && (uo.test(O) || fo.test(O)) && (p[v] = M.cloneElement(o(O.trim()), { key: y }));
      } else
        h !== "style" && (p[ni[h] || h] = !0);
      return p;
    }, {}) : null;
  }
  const i = [], s = {}, c = { blockQuote: { t: Je(Vs), i: re.HIGH, l: (d, m, p) => ({ v: m(d[0].replace(Vm, ""), p) }), h: (d, m, p) => r("blockquote", { key: p.k }, m(d.v, p)) }, breakLine: { t: cn(Lm), i: re.HIGH, l: Wr, h: (d, m, p) => r("br", { key: p.k }) }, breakThematic: { t: Je(zm), i: re.HIGH, l: Wr, h: (d, m, p) => r("hr", { key: p.k }) }, codeBlock: { t: Je(zs), i: re.MAX, l: (d) => ({ v: d[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (d, m, p) => r("pre", { key: p.k }, r("code", xt({}, d.O, { className: d.M ? `lang-${d.M}` : "" }), d.v)) }, codeFenced: { t: Je(Ls), i: re.MAX, l: (d) => ({ O: a(d[3] || ""), v: d[4], M: d[2] || void 0, type: "codeBlock" }) }, codeInline: { t: at(Fm), i: re.LOW, l: (d) => ({ v: d[2] }), h: (d, m, p) => r("code", { key: p.k }, d.v) }, footnote: { t: Je(Hm), i: re.MAX, l: (d) => (i.push({ I: d[2], j: d[1] }), {}), h: Yr }, footnoteReference: { t: ot(Xm), i: re.HIGH, l: (d) => ({ v: d[1], B: `#${t.slugify(d[1])}` }), h: (d, m, p) => r("a", { key: p.k, href: Vt(d.B) }, r("sup", { key: p.k }, d.v)) }, gfmTask: { t: ot(Ym), i: re.HIGH, l: (d) => ({ R: d[1].toLowerCase() === "x" }), h: (d, m, p) => r("input", { checked: d.R, key: p.k, readOnly: !0, type: "checkbox" }) }, heading: { t: Je(t.enforceAtxHeadings ? Gs : Fs), i: re.HIGH, l: (d, m, p) => ({ v: Jn(m, d[2], p), T: t.slugify(d[2]), C: d[1].length }), h: (d, m, p) => r(`h${d.C}`, { id: d.T, key: p.k }, m(d.v, p)) }, headingSetext: { t: Je(Us), i: re.MAX, l: (d, m, p) => ({ v: Jn(m, d[1], p), C: d[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: cn(Hs), i: re.HIGH, l: () => ({}), h: Yr }, image: { t: at(Ch), i: re.HIGH, l: (d) => ({ D: d[1], B: li(d[2]), F: d[3] }), h: (d, m, p) => r("img", { key: p.k, alt: d.D || void 0, title: d.F || void 0, src: Vt(d.B) }) }, link: { t: ot(Sh), i: re.LOW, l: (d, m, p) => ({ v: Ih(m, d[1], p), B: li(d[2]), F: d[3] }), h: (d, m, p) => r("a", { key: p.k, href: Vt(d.B), title: d.F }, m(d.v, p)) }, linkAngleBraceStyleDetector: { t: ot(eh), i: re.MAX, l: (d) => ({ v: [{ v: d[1], type: "text" }], B: d[1], type: "link" }) }, linkBareUrlDetector: { t: (d, m) => m.N ? null : ot(Zm)(d, m), i: re.MAX, l: (d) => ({ v: [{ v: d[1], type: "text" }], B: d[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: ot(Qm), i: re.MAX, l(d) {
    let m = d[1], p = d[1];
    return Bm.test(p) || (p = "mailto:" + p), { v: [{ v: m.replace("mailto:", ""), type: "text" }], B: p, type: "link" };
  } }, orderedList: ai(r, 1), unorderedList: ai(r, 2), newlineCoalescer: { t: Je(Gm), i: re.LOW, l: Wr, h: () => `
` }, paragraph: { t: $h, i: re.LOW, l: Xr, h: (d, m, p) => r("p", { key: p.k }, m(d.v, p)) }, ref: { t: ot(nh), i: re.MAX, l: (d) => (s[d[1]] = { B: d[2], F: d[4] }, {}), h: Yr }, refImage: { t: at(rh), i: re.MAX, l: (d) => ({ D: d[1] || void 0, P: d[2] }), h: (d, m, p) => r("img", { key: p.k, alt: d.D, src: Vt(s[d.P].B), title: s[d.P].F }) }, refLink: { t: ot(oh), i: re.MAX, l: (d, m, p) => ({ v: m(d[1], p), Z: m(d[0].replace(ah, "\\$1"), p), P: d[2] }), h: (d, m, p) => s[d.P] ? r("a", { key: p.k, href: Vt(s[d.P].B), title: s[d.P].F }, m(d.v, p)) : r("span", { key: p.k }, m(d.Z, p)) }, table: { t: Je(Xs), i: re.HIGH, l: _h, h: (d, m, p) => r("table", { key: p.k }, r("thead", null, r("tr", null, d.L.map(function(h, y) {
    return r("th", { key: y, style: si(d, y) }, m(h, p));
  }))), r("tbody", null, d.A.map(function(h, y) {
    return r("tr", { key: y }, h.map(function(C, k) {
      return r("td", { key: k, style: si(d, k) }, m(C, p));
    }));
  }))) }, tableSeparator: { t: function(d, m) {
    return m.$ ? (m._ = !0, lh.exec(d)) : null;
  }, i: re.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: cn(vh), i: re.MIN, l: (d) => ({ v: d[0].replace(qm, (m, p) => t.namedCodesToUnicode[p] ? t.namedCodesToUnicode[p] : m) }), h: (d) => d.v }, textBolded: { t: at(wh), i: re.MED, l: (d, m, p) => ({ v: m(d[2], p) }), h: (d, m, p) => r("strong", { key: p.k }, m(d.v, p)) }, textEmphasized: { t: at(mh), i: re.LOW, l: (d, m, p) => ({ v: m(d[2], p) }), h: (d, m, p) => r("em", { key: p.k }, m(d.v, p)) }, textEscaped: { t: at(bh), i: re.HIGH, l: (d) => ({ v: d[1], type: "text" }) }, textMarked: { t: at(hh), i: re.LOW, l: Xr, h: (d, m, p) => r("mark", { key: p.k }, m(d.v, p)) }, textStrikethroughed: { t: at(gh), i: re.LOW, l: Xr, h: (d, m, p) => r("del", { key: p.k }, m(d.v, p)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: cn(uo), i: re.HIGH, l(d, m, p) {
    const [, h] = d[3].match(xh), y = new RegExp(`^${h}`, "gm"), C = d[3].replace(y, ""), k = (x = C, Oh.some((B) => B.test(x)) ? Ah : Jn);
    var x;
    const v = d[1].toLowerCase(), O = Mm.indexOf(v) !== -1;
    p.N = p.N || v === "a";
    const _ = O ? d[3] : k(m, C, p);
    return p.N = !1, { O: a(d[2]), v: _, G: O, H: O ? v : d[1] };
  }, h: (d, m, p) => r(d.H, xt({ key: p.k }, d.O), d.G ? d.v : m(d.v, p)) }, c.htmlSelfClosing = { t: cn(fo), i: re.HIGH, l: (d) => ({ O: a(d[2] || ""), H: d[1] }), h: (d, m, p) => r(d.H, xt({}, d.O, { key: p.k })) });
  const u = function(d) {
    let m = Object.keys(d);
    function p(h, y) {
      let C = [], k = "";
      for (; h; ) {
        let x = 0;
        for (; x < m.length; ) {
          const v = m[x], O = d[v], _ = O.t(h, y, k);
          if (_) {
            const B = _[0];
            h = h.substring(B.length);
            const S = O.l(_, p, y);
            S.type == null && (S.type = v), C.push(S), k = B;
            break;
          }
          x++;
        }
      }
      return C;
    }
    return m.sort(function(h, y) {
      let C = d[h].i, k = d[y].i;
      return C !== k ? C - k : h < y ? -1 : 1;
    }), function(h, y) {
      return p(function(C) {
        return C.replace(Um, `
`).replace(Wm, "").replace(sh, "    ");
      }(h), y);
    };
  }(c), f = (b = function(d) {
    return function(m, p, h) {
      return d[m.type].h(m, p, h);
    };
  }(c), function d(m, p = {}) {
    if (Array.isArray(m)) {
      const h = p.k, y = [];
      let C = !1;
      for (let k = 0; k < m.length; k++) {
        p.k = k;
        const x = d(m[k], p), v = typeof x == "string";
        v && C ? y[y.length - 1] += x : x !== null && y.push(x), C = v;
      }
      return p.k = h, y;
    }
    return b(m, d, p);
  });
  var b;
  const g = o(e);
  return i.length ? r("div", null, g, r("footer", { key: "footer" }, i.map(function(d) {
    return r("div", { id: t.slugify(d.j), key: d.j }, d.j, f(u(d.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(re || (re = {}));
const Bh = (e) => {
  let { children: t, options: n } = e, r = function(o, a) {
    if (o == null)
      return {};
    var i, s, c = {}, u = Object.keys(o);
    for (s = 0; s < u.length; s++)
      a.indexOf(i = u[s]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Am);
  return M.cloneElement(Dh(t, n), r);
};
function $g({ id: e, markdown: t, className: n }) {
  return /* @__PURE__ */ l("div", { id: e, className: R("pr-twp tw-prose", n), children: /* @__PURE__ */ l(Bh, { children: t }) });
}
const jh = or((e, t) => /* @__PURE__ */ T(
  ye,
  {
    ref: t,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ l(Vl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ l(
        ir,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var Vh = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Vh || {});
function Ig({ id: e, groups: t }) {
  return /* @__PURE__ */ l("div", { id: e, children: /* @__PURE__ */ T(go, { children: [
    /* @__PURE__ */ l(Si, { asChild: !0, children: /* @__PURE__ */ l(jh, {}) }),
    /* @__PURE__ */ l(cr, { children: t.map((n) => /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ l(Rn, { children: n.label }),
      /* @__PURE__ */ l(Sc, { children: n.items.map((r) => /* @__PURE__ */ l("div", { children: r.itemType === 0 ? /* @__PURE__ */ l(bo, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ l(Oi, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ l(dr, {})
    ] }, n.label)) })
  ] }) });
}
function Ag({ id: e, message: t }) {
  return /* @__PURE__ */ l("div", { id: e, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ l("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ l("p", { className: "tw-text-lg tw-text-gray-800", children: t }) }) });
}
function Mg({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new Wl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((s, c) => s + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ T(
    "div",
    {
      id: e,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ T("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ l("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: t }) }),
          /* @__PURE__ */ l("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ T("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ T("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ l(Ll, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ l("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ l("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ T("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ l("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((s) => /* @__PURE__ */ l(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: s.toUpperCase()
            },
            s
          )) }),
          r.length > 3 && /* @__PURE__ */ T(
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
        /* @__PURE__ */ l("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ T("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ T(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ l(zl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ T(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ l(Fl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Lh({ id: e, versionHistory: t }) {
  const [n, r] = fe(!1), o = /* @__PURE__ */ new Date();
  function a(s) {
    const c = new Date(s), u = new Date(o.getTime() - c.getTime()), f = u.getUTCFullYear() - 1970, b = u.getUTCMonth(), g = u.getUTCDate() - 1;
    let d = "";
    return f > 0 ? d = `${f.toString()} year${f === 1 ? "" : "s"} ago` : b > 0 ? d = `${b.toString()} month${b === 1 ? "" : "s"} ago` : g === 0 ? d = "today" : d = `${g.toString()} day${g === 1 ? "" : "s"} ago`, d;
  }
  const i = Object.entries(t).sort((s, c) => c[0].localeCompare(s[0]));
  return /* @__PURE__ */ T("div", { id: e, children: [
    /* @__PURE__ */ l("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ l("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? i : i.slice(0, 5)).map((s) => /* @__PURE__ */ T("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ l("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ l("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ l("span", { children: s[1].description }) }) }),
      /* @__PURE__ */ T("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ T("div", { children: [
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
        onClick: () => r(!n),
        className: "tw-text-xs tw-text-gray-500 tw-underline",
        children: n ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function Dg({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = ct(() => Yl(n), [n]), s = ((c) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((f) => u.of(f));
  })(r);
  return /* @__PURE__ */ l("div", { id: e, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ T("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ l(Lh, { versionHistory: o }),
    /* @__PURE__ */ l("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ T("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ l("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ T("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ T("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ l("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ l("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ l("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ l("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ l("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ T("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ l("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ l("span", { className: "tw-font-semibold", children: s.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Bg = (e, t) => {
  Xe(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Kr = () => !1, jg = (e, t) => {
  const [n] = po(
    Se(async () => {
      if (!e)
        return Kr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Kr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Xe(() => () => {
    n !== Kr && n();
  }, [n]);
};
function zh(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
zh(`.papi-icon-button {
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
  ym as Alert,
  km as AlertDescription,
  xm as AlertTitle,
  cg as BOOK_SELECTOR_STRING_KEYS,
  lg as BookChapterControl,
  Zc as BookSelectionMode,
  dg as BookSelector,
  ye as Button,
  Nm as Card,
  Cm as CardContent,
  Sm as CardDescription,
  Om as CardFooter,
  Em as CardHeader,
  Tm as CardTitle,
  Jc as ChapterRangeSelector,
  Wi as Checkbox,
  kg as Checklist,
  la as ComboBox,
  id as DataTable,
  Pg as DisableButton,
  go as DropdownMenu,
  bo as DropdownMenuCheckboxItem,
  cr as DropdownMenuContent,
  Sc as DropdownMenuGroup,
  Ci as DropdownMenuItem,
  Vh as DropdownMenuItemType,
  Rn as DropdownMenuLabel,
  ag as DropdownMenuPortal,
  sg as DropdownMenuRadioGroup,
  Oi as DropdownMenuRadioItem,
  dr as DropdownMenuSeparator,
  Rc as DropdownMenuShortcut,
  ig as DropdownMenuSub,
  Oc as DropdownMenuSubContent,
  Cc as DropdownMenuSubTrigger,
  Si as DropdownMenuTrigger,
  Rg as EnableButton,
  jh as FilterButton,
  Ig as FilterDropdown,
  Dg as Footer,
  mm as GridMenu,
  bm as HamburgerMenuButton,
  pg as INVENTORY_STRING_KEYS,
  Ng as IconButton,
  On as Input,
  Og as InstallButton,
  ug as Inventory,
  Ze as Label,
  $g as MarkdownRenderer,
  Ds as MenuItem,
  Mg as MoreInfo,
  hg as NavigationContentSearch,
  Ag as NoExtensionsFound,
  Ri as RadioGroup,
  eo as RadioGroupItem,
  gg as ScriptureResultsViewer,
  bg as ScrollGroupSelector,
  ud as SearchBar,
  xn as Select,
  Gt as SelectContent,
  ed as SelectGroup,
  Ge as SelectItem,
  td as SelectLabel,
  ji as SelectScrollDownButton,
  Bi as SelectScrollUpButton,
  nd as SelectSeparator,
  Ft as SelectTrigger,
  kn as SelectValue,
  Xi as Separator,
  vg as SettingsList,
  xg as SettingsListHeader,
  yg as SettingsListItem,
  Rm as Slider,
  Sg as Sonner,
  Dn as Spinner,
  Pm as Switch,
  pr as Table,
  fr as TableBody,
  ad as TableCaption,
  Ut as TableCell,
  od as TableFooter,
  Nn as TableHead,
  ur as TableHeader,
  lt as TableRow,
  Cg as Tabs,
  Im as TabsContent,
  _m as TabsList,
  $m as TabsTrigger,
  Eg as TextField,
  zi as ToggleGroup,
  Wn as ToggleGroupItem,
  Tg as Toolbar,
  _g as UpdateButton,
  Lh as VersionHistory,
  Fi as VerticalTabs,
  Ui as VerticalTabsContent,
  Gi as VerticalTabsList,
  fd as VerticalTabsTrigger,
  Lc as buttonVariants,
  R as cn,
  vo as getSortingIcon,
  wg as inventoryCountColumn,
  fg as inventoryItemColumn,
  mg as inventoryStatusColumn,
  zg as sonner,
  Bg as useEvent,
  jg as useEventAsync,
  po as usePromise
};
//# sourceMappingURL=index.js.map
