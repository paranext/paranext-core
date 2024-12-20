import ll, { jsx as i, jsxs as y, Fragment as ce } from "react/jsx-runtime";
import * as B from "react";
import S, { forwardRef as sr, useCallback as _t, useState as st, useRef as Ne, useEffect as Qt, useLayoutEffect as da, useMemo as Tt } from "react";
import { History as cl, ChevronRight as di, Check as Sn, Circle as ui, ArrowDownWideNarrow as dl, Clock as ul, Bookmark as pl, X as uo, Search as pi, ChevronsUpDown as po, FilterIcon as wl, ChevronDown as Cn, ChevronUp as wi, ArrowLeftIcon as fl, ChevronLeftIcon as ml, ChevronRightIcon as hl, ArrowRightIcon as gl, CircleCheckIcon as bl, CircleXIcon as vl, CircleHelpIcon as yl, ArrowUpIcon as xl, ArrowDownIcon as Nl, ArrowUpDownIcon as kl, Star as El, PanelLeft as Tl, ChevronLeft as Sl, LoaderCircle as Cl, Download as Ol, Filter as Rl, User as _l, Link as Pl, CircleHelp as $l, BookOpen as ua, Shapes as Il, Globe as Al, Ellipsis as Ml } from "lucide-react";
import ke, { clsx as Dl } from "clsx";
import { extendTailwindMerge as Bl } from "tailwind-merge";
import * as ht from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as jl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Vl, deepEqual as wo, substring as zl, formatScrRef as _r, compareScrRefs as Xr, scrRefToBBBCCCVVV as Pr, getLocalizeKeyForScrollGroupId as ft, NumberFormat as Ll, formatBytes as Fl, getErrorMessage as Ul } from "platform-bible-utils";
import { Slot as Ke } from "@radix-ui/react-slot";
import { cva as Je } from "class-variance-authority";
import * as fi from "@radix-ui/react-label";
import * as yn from "@radix-ui/react-radio-group";
import * as xn from "@radix-ui/react-popover";
import { Command as Mt } from "cmdk";
import * as te from "@radix-ui/react-dialog";
import { useReactTable as mi, getCoreRowModel as hi, getPaginationRowModel as Gl, getSortedRowModel as gi, getFilteredRowModel as Hl, flexRender as mn, getExpandedRowModel as Xl, getGroupedRowModel as Yl } from "@tanstack/react-table";
import * as yt from "@radix-ui/react-select";
import * as Yr from "@radix-ui/react-checkbox";
import * as lr from "@radix-ui/react-toggle-group";
import * as bi from "@radix-ui/react-toggle";
import * as Dt from "@radix-ui/react-tabs";
import * as vi from "@radix-ui/react-separator";
import * as On from "@radix-ui/react-tooltip";
import Wl, { ThemeContext as ql, internal_processStyles as Kl } from "@mui/styled-engine";
import { MenuItem as Jl, ListItemText as Zl, ListItemIcon as yi, Menu as Ql, Grid as xi, List as tc, IconButton as Ni, Drawer as ec, AppBar as nc, Toolbar as rc } from "@mui/material";
import * as oc from "react-dom";
import Gn from "react-dom";
import { Toaster as ac } from "sonner";
import { toast as eg } from "sonner";
import * as un from "@radix-ui/react-slider";
import * as Wr from "@radix-ui/react-switch";
import ic from "markdown-to-jsx";
const sc = Bl({ prefix: "tw-" });
function N(...t) {
  return sc(Dl(t));
}
const Ze = S.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      type: e,
      className: N(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  )
);
Ze.displayName = "Input";
const lc = sr(
  ({ handleSearch: t, handleKeyDown: e, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ y("div", { className: "tw-relative", children: [
    /* @__PURE__ */ i(
      Ze,
      {
        ...o,
        type: "text",
        className: "tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",
        onChange: (s) => t(s.target.value),
        onKeyDown: (s) => {
          s.key === "Enter" && r(), e(s);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ i(
      cl,
      {
        className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var cc = Object.defineProperty, dc = (t, e, n) => e in t ? cc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, rt = (t, e, n) => dc(t, typeof e != "symbol" ? e + "" : e, n);
const Te = [
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
], fo = [
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
], pa = yc();
function Qe(t, e = !0) {
  return e && (t = t.toUpperCase()), t in pa ? pa[t] : 0;
}
function mo(t) {
  return Qe(t) > 0;
}
function uc(t) {
  const e = typeof t == "string" ? Qe(t) : t;
  return e >= 40 && e <= 66;
}
function pc(t) {
  return (typeof t == "string" ? Qe(t) : t) <= 39;
}
function Ei(t) {
  return t <= 66;
}
function wc(t) {
  const e = typeof t == "string" ? Qe(t) : t;
  return Ci(e) && !Ei(e);
}
function* fc() {
  for (let t = 1; t <= Te.length; t++)
    yield t;
}
const mc = 1, Ti = Te.length;
function hc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function ho(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Te.length ? e : Te[n];
}
function Si(t) {
  return t <= 0 || t > Ti ? "******" : ki[t - 1];
}
function gc(t) {
  return Si(Qe(t));
}
function Ci(t) {
  const e = typeof t == "number" ? ho(t) : t;
  return mo(e) && !fo.includes(e);
}
function bc(t) {
  const e = typeof t == "number" ? ho(t) : t;
  return mo(e) && fo.includes(e);
}
function vc(t) {
  return ki[t - 1].includes("*obsolete*");
}
function yc() {
  const t = {};
  for (let e = 0; e < Te.length; e++)
    t[Te[e]] = e + 1;
  return t;
}
const ct = {
  allBookIds: Te,
  nonCanonicalIds: fo,
  bookIdToNumber: Qe,
  isBookIdValid: mo,
  isBookNT: uc,
  isBookOT: pc,
  isBookOTNT: Ei,
  isBookDC: wc,
  allBookNumbers: fc,
  firstBook: mc,
  lastBook: Ti,
  extraBooks: hc,
  bookNumberToId: ho,
  bookNumberToEnglishName: Si,
  bookIdToEnglishName: gc,
  isCanonical: Ci,
  isExtraMaterial: bc,
  isObsolete: vc
};
var Kt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Kt || {});
const jt = class {
  // private versInfo: Versification;
  constructor(e) {
    if (rt(this, "name"), rt(this, "fullPath"), rt(this, "isPresent"), rt(this, "hasVerseSegments"), rt(this, "isCustomized"), rt(this, "baseVersification"), rt(this, "scriptureBooks"), rt(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Kt[e]) : (this._type = e, this.name = Kt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
rt(jt, "Original", new jt(Kt.Original)), rt(jt, "Septuagint", new jt(Kt.Septuagint)), rt(jt, "Vulgate", new jt(Kt.Vulgate)), rt(jt, "English", new jt(Kt.English)), rt(jt, "RussianProtestant", new jt(Kt.RussianProtestant)), rt(jt, "RussianOrthodox", new jt(Kt.RussianOrthodox));
let ge = jt;
function wa(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var Oi = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Oi || {});
const $t = class it {
  constructor(e, n, r, o) {
    if (rt(this, "firstChapter"), rt(this, "lastChapter"), rt(this, "lastVerse"), rt(this, "hasSegmentsDefined"), rt(this, "text"), rt(this, "BBBCCCVVVS"), rt(this, "longHashCode"), rt(this, "versification"), rt(this, "rtlMark", "‏"), rt(this, "_bookNum", 0), rt(this, "_chapterNum", 0), rt(this, "_verseNum", 0), rt(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, s = n != null && n instanceof ge ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof ge ? n : void 0;
        this.setEmpty(a), this._verseNum = e % it.chapterDigitShifter, this._chapterNum = Math.floor(
          e % it.bookDigitShifter / it.chapterDigitShifter
        ), this._bookNum = Math.floor(e / it.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof it) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null)
            return;
          const a = e instanceof ge ? e : it.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? it.defaultVersification;
      else
        throw new Error("VerseRef constructor not supported.");
    else
      throw new Error("VerseRef constructor not supported.");
  }
  /**
   * Determines if the verse string is in a valid format (does not consider versification).
   */
  static isVerseParseable(e) {
    return e.length > 0 && "0123456789".includes(e[0]) && !e.endsWith(this.verseRangeSeparator) && !e.endsWith(this.verseSequenceIndicator);
  }
  /**
   * Tries to parse the specified string into a verse reference.
   * @param str - The string to attempt to parse.
   * @returns success: `true` if the specified string was successfully parsed, `false` otherwise.
   * @returns verseRef: The result of the parse if successful, or empty VerseRef if it failed
   */
  static tryParse(e) {
    let n;
    try {
      return n = new it(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof an)
        return n = new it(), { success: !1, verseRef: n };
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
  static getBBBCCCVVV(e, n, r) {
    return e % it.bcvMaxValue * it.bookDigitShifter + (n >= 0 ? n % it.bcvMaxValue * it.chapterDigitShifter : 0) + (r >= 0 ? r % it.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = e, l = a || o.toString();
    let c;
    return s && (c = new ge(s)), n ? new it(n, r.toString(), l, c) : new it();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(e) {
    let n;
    if (!e)
      return n = -1, { success: !0, vNum: n };
    n = 0;
    let r;
    for (let o = 0; o < e.length; o++) {
      if (r = e[o], r < "0" || r > "9")
        return o === 0 && (n = -1), { success: !1, vNum: n };
      if (n = n * 10 + +r - 0, n > it.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(it.verseRangeSeparator) || this._verse.includes(it.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ct.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = ct.bookIdToNumber(e);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(e) {
    const n = +e;
    this._chapterNum = Number.isInteger(n) ? n : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(e) {
    const { success: n, vNum: r } = it.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = it.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > ct.lastBook)
      throw new an(
        "BookNum must be greater than zero and less than or equal to last book"
      );
    this._bookNum = e;
  }
  /**
   * Gets or sets the chapter number, e.g. `3`. `-1` if not valid.
   */
  get chapterNum() {
    return this._chapterNum;
  }
  set chapterNum(e) {
    this.chapterNum = e;
  }
  /**
   * Gets or sets verse start number, e.g. `4`. `-1` if not valid.
   */
  get verseNum() {
    return this._verseNum;
  }
  set verseNum(e) {
    this._verseNum = e;
  }
  /**
   * String representing the versification (should ONLY be used for serialization/deserialization).
   *
   * @remarks This is for backwards compatibility when ScrVers was an enumeration.
   */
  get versificationStr() {
    var e;
    return (e = this.versification) == null ? void 0 : e.name;
  }
  set versificationStr(e) {
    this.versification = this.versification != null ? new ge(e) : void 0;
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
    return this.validateVerse(it.verseRangeSeparators, it.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return it.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return it.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
  parse(e) {
    if (e = e.replace(this.rtlMark, ""), e.includes("/")) {
      const a = e.split("/");
      if (e = a[0], a.length > 1)
        try {
          const s = +a[1].trim();
          this.versification = new ge(Kt[s]);
        } catch {
          throw new an("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new an("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ct.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !it.isVerseParseable(r[1]))
      throw new an("Invalid reference : " + e);
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
    return new it(this);
  }
  toString() {
    const e = this.book;
    return e === "" ? "" : `${e} ${this.chapter}:${this.verse}`;
  }
  toJSON() {
    let e = this.verse;
    (e === "" || e === this.verseNum.toString()) && (e = void 0);
    const n = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: e,
      versificationStr: this.versificationStr
    };
    return e || delete n.verse, n;
  }
  /**
   * Compares this `VerseRef` with supplied one.
   * @param verseRef - object to compare this one to.
   * @returns `true` if this `VerseRef` is equal to the supplied one, `false` otherwise.
   */
  equals(e) {
    return e instanceof it ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = it.verseRangeSeparators, r = it.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = wa(this._verse, r);
    for (const s of a.map((l) => wa(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const d = this.clone();
        if (d.verse = s[1], !e)
          for (let u = c + 1; u < d.verseNum; u++) {
            const m = new it(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(m);
          }
        o.push(d);
      }
    }
    return o;
  }
  /**
   * Validates a verse number using the supplied separators rather than the defaults.
   */
  validateVerse(e, n) {
    if (!this.verse)
      return this.internalValid;
    let r = 0;
    for (const o of this.allVerses(!0, e, n)) {
      const a = o.internalValid;
      if (a !== 0)
        return a;
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ct.lastBook ? 2 : (ct.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = it.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ct.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
rt($t, "defaultVersification", ge.English), rt($t, "verseRangeSeparator", "-"), rt($t, "verseSequenceIndicator", ","), rt($t, "verseRangeSeparators", [$t.verseRangeSeparator]), rt($t, "verseSequenceIndicators", [$t.verseSequenceIndicator]), rt($t, "chapterDigitShifter", 1e3), rt($t, "bookDigitShifter", $t.chapterDigitShifter * $t.chapterDigitShifter), rt($t, "bcvMaxValue", $t.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
rt($t, "ValidStatusType", Oi);
class an extends Error {
}
const cr = ht.Root, go = ht.Trigger, xc = ht.Group, mh = ht.Portal, hh = ht.Sub, gh = ht.RadioGroup, Nc = S.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ y(
  ht.SubTrigger,
  {
    ref: o,
    className: N(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      e && "tw-pl-8",
      t
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ i(di, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Nc.displayName = ht.SubTrigger.displayName;
const kc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ht.SubContent,
  {
    ref: n,
    className: N(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
kc.displayName = ht.SubContent.displayName;
const Rn = S.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(ht.Portal, { children: /* @__PURE__ */ i(
  ht.Content,
  {
    ref: r,
    sideOffset: e,
    className: N(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
) }));
Rn.displayName = ht.Content.displayName;
const tr = S.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  ht.Item,
  {
    ref: r,
    className: N(
      // removed: tw-relative tw-flex focus:tw-text-accent-foreground
      "tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
tr.displayName = ht.Item.displayName;
const bo = S.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ y(
  ht.CheckboxItem,
  {
    ref: o,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(ht.ItemIndicator, { children: /* @__PURE__ */ i(Sn, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
bo.displayName = ht.CheckboxItem.displayName;
const Ri = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ y(
  ht.RadioItem,
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(ht.ItemIndicator, { children: /* @__PURE__ */ i(ui, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ri.displayName = ht.RadioItem.displayName;
const _n = S.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  ht.Label,
  {
    ref: r,
    className: N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
_n.displayName = ht.Label.displayName;
const Pn = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  ht.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Pn.displayName = ht.Separator.displayName;
function Ec({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: N("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Ec.displayName = "DropdownMenuShortcut";
const Tc = sr(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ y(
    tr,
    {
      ref: l,
      textValue: t,
      className: N("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": n
      }),
      onSelect: (c) => {
        c.preventDefault(), e();
      },
      onKeyDown: (c) => {
        o(c);
      },
      onFocus: r,
      onMouseMove: r,
      children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: N(
              "tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-l-red-200": a.toLowerCase() === "ot",
                "tw-border-l-purple-200": a.toLowerCase() === "nt",
                "tw-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: ct.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ i("div", { children: s })
      ]
    },
    t
  )
);
function Sc({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), s = _t(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ i("div", { className: N("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ i(
    "div",
    {
      className: N(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": l === n,
          "tw-bg-amber-200": l === r
        }
      ),
      onClick: (c) => {
        c.preventDefault(), c.stopPropagation(), t(l);
      },
      role: "button",
      onKeyDown: (c) => {
        c.key === "Enter" && t(l);
      },
      tabIndex: 0,
      onMouseMove: () => s(l),
      children: l
    },
    l
  )) });
}
function Cc({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ y(_n, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ i("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(
        dl,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        ul,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        pl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const hn = ct.allBookIds, Oc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, fa = ["OT", "NT", "DC"], Rc = 32 + 32 + 32, _c = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Pc = (t) => ({
  OT: hn.filter((n) => ct.isBookOT(n)),
  NT: hn.filter((n) => ct.isBookNT(n)),
  DC: hn.filter((n) => ct.isBookDC(n))
})[t], sn = (t) => Vl(ct.bookIdToNumber(t));
function $c() {
  return hn.map((e) => ct.bookIdToEnglishName(e));
}
function Ic(t) {
  return $c().includes(t);
}
function Ac(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Ic(e))
    return hn.find((r) => ct.bookIdToEnglishName(r) === e);
}
function bh({ scrRef: t, handleSubmit: e }) {
  const [n, r] = st(""), [o, a] = st(
    ct.bookNumberToId(t.bookNum)
  ), [s, l] = st(t.chapterNum ?? 0), [c, d] = st(
    ct.bookNumberToId(t.bookNum)
  ), [u, m] = st(!1), [w, g] = st(u), b = Ne(void 0), f = Ne(void 0), h = Ne(void 0), k = _t(
    (T) => Pc(T).filter((D) => {
      const M = ct.bookIdToEnglishName(D).toLowerCase(), Q = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return M.includes(Q) || // Match book name
      D.toLowerCase().includes(Q);
    }),
    [n]
  ), P = (T) => {
    r(T);
  }, C = Ne(!1), E = _t((T) => {
    if (C.current) {
      C.current = !1;
      return;
    }
    m(T);
  }, []), v = _t(
    (T, D, M, Q) => {
      if (l(
        ct.bookNumberToId(t.bookNum) !== T ? 1 : t.chapterNum
      ), D || sn(T) === -1) {
        e({
          bookNum: ct.bookIdToNumber(T),
          chapterNum: M || 1,
          verseNum: Q || 1
        }), m(!1), r("");
        return;
      }
      a(o !== T ? T : ""), m(!D);
    },
    [e, t.bookNum, t.chapterNum, o]
  ), $ = (T) => {
    T <= 0 || T > sn(o) || v(o, !0, T);
  }, z = _t(() => {
    _c.forEach((T) => {
      const D = n.match(T);
      if (D) {
        const [M, Q = void 0, q = void 0] = D.slice(1), U = Ac(M);
        (ct.isBookIdValid(M) || U) && v(
          U ?? M,
          !0,
          Q ? parseInt(Q, 10) : 1,
          q ? parseInt(q, 10) : 1
        );
      }
    });
  }, [v, n]), H = _t(
    (T) => {
      u ? (T.key === "ArrowDown" || T.key === "ArrowUp") && (typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null ? h.current.focus() : typeof f < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      f.current !== null && f.current.focus(), T.preventDefault()) : m(!0);
    },
    [u]
  ), O = (T) => {
    const { key: D } = T;
    D === "ArrowRight" || D === "ArrowLeft" || D === "ArrowDown" || D === "ArrowUp" || D === "Enter" || (b.current.dispatchEvent(new KeyboardEvent("keydown", { key: D })), b.current.focus());
  }, I = (T) => {
    const { key: D } = T;
    if (c === o) {
      if (D === "Enter") {
        T.preventDefault(), v(o, !0, s);
        return;
      }
      let M = 0;
      if (D === "ArrowRight")
        if (s < sn(c))
          M = 1;
        else {
          T.preventDefault();
          return;
        }
      else if (D === "ArrowLeft")
        if (s > 1)
          M = -1;
        else {
          T.preventDefault();
          return;
        }
      else
        D === "ArrowDown" ? M = 6 : D === "ArrowUp" && (M = -6);
      s + M <= 0 || s + M > sn(c) ? l(0) : M !== 0 && (l(s + M), T.preventDefault());
    }
  };
  return Qt(() => {
    o === c ? o === ct.bookNumberToId(t.bookNum) ? l(t.chapterNum) : l(1) : l(0);
  }, [c, t.bookNum, t.chapterNum, o]), da(() => {
    g(u);
  }, [u]), da(() => {
    const T = setTimeout(() => {
      if (w && f.current && h.current) {
        const M = h.current.offsetTop - Rc;
        f.current.scrollTo({ top: M, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(T);
    };
  }, [w]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ y(cr, { modal: !1, open: u, onOpenChange: E, children: [
    /* @__PURE__ */ i(go, { asChild: !0, children: /* @__PURE__ */ i(
      lc,
      {
        ref: b,
        value: n,
        handleSearch: P,
        handleKeyDown: H,
        handleOnClick: () => {
          a(ct.bookNumberToId(t.bookNum)), d(ct.bookNumberToId(t.bookNum)), l(t.chapterNum > 0 ? t.chapterNum : 0), m(!0), b.current.focus();
        },
        onFocus: () => {
          C.current = !0;
        },
        handleSubmit: z,
        placeholder: `${ct.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`
      }
    ) }),
    /* @__PURE__ */ y(
      Rn,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: O,
        align: "start",
        ref: f,
        children: [
          /* @__PURE__ */ i(
            Cc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          fa.map(
            (T, D) => k(T).length > 0 && /* @__PURE__ */ y("div", { children: [
              /* @__PURE__ */ i(_n, { className: "tw-font-semibold tw-text-foreground/80", children: Oc[T] }),
              k(T).map((M) => /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
                Tc,
                {
                  bookId: M,
                  handleSelectBook: () => v(M, !1),
                  isSelected: o === M,
                  handleHighlightBook: () => d(M),
                  handleKeyDown: I,
                  bookType: T,
                  ref: (Q) => {
                    o === M && (h.current = Q);
                  },
                  children: /* @__PURE__ */ i(
                    Sc,
                    {
                      handleSelectChapter: $,
                      endChapter: sn(M),
                      activeChapter: t.bookNum === ct.bookIdToNumber(M) ? t.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (Q) => {
                        l(Q);
                      }
                    }
                  )
                }
              ) }, M)),
              fa.length - 1 !== D ? /* @__PURE__ */ i(Pn, {}) : void 0
            ] }, T)
          )
        ]
      }
    )
  ] }) });
}
const Mc = Je(
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
), mt = S.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? Ke : "button", { className: N(Mc({ variant: e, size: n, className: t })), ref: a, ...o })
);
mt.displayName = "Button";
const Dc = Je(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), St = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(fi.Root, { ref: n, className: N("pr-twp", Dc(), t), ...e }));
St.displayName = fi.Root.displayName;
const _i = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yn.Root,
  {
    className: N("pr-twp tw-grid tw-gap-2", t),
    ...e,
    ref: n
  }
));
_i.displayName = yn.Root.displayName;
const qr = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yn.Item,
  {
    ref: n,
    className: N(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(yn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(ui, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
qr.displayName = yn.Item.displayName;
const Pi = xn.Root, $i = xn.Trigger, vo = S.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ i(xn.Portal, { children: /* @__PURE__ */ i(
  xn.Content,
  {
    ref: o,
    align: e,
    sideOffset: n,
    className: N(
      "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...r
  }
) }));
vo.displayName = xn.Content.displayName;
const Bc = te.Portal, Ii = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  te.Overlay,
  {
    ref: n,
    className: N(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Ii.displayName = te.Overlay.displayName;
const jc = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ y(Bc, { children: [
  /* @__PURE__ */ i(Ii, {}),
  /* @__PURE__ */ y(
    te.Content,
    {
      ref: r,
      className: N(
        "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        t
      ),
      ...n,
      children: [
        e,
        /* @__PURE__ */ y(te.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ i(uo, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
jc.displayName = te.Content.displayName;
const Vc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  te.Title,
  {
    ref: n,
    className: N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Vc.displayName = te.Title.displayName;
const zc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  te.Description,
  {
    ref: n,
    className: N("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
zc.displayName = te.Description.displayName;
const yo = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Mt,
  {
    ref: n,
    className: N(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
yo.displayName = Mt.displayName;
const xo = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ i(pi, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ i(
    Mt.Input,
    {
      ref: n,
      className: N(
        "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ...e
    }
  )
] }));
xo.displayName = Mt.Input.displayName;
const No = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Mt.List,
  {
    ref: n,
    className: N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
No.displayName = Mt.List.displayName;
const ko = S.forwardRef((t, e) => /* @__PURE__ */ i(Mt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
ko.displayName = Mt.Empty.displayName;
const Ai = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Mt.Group,
  {
    ref: n,
    className: N(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ai.displayName = Mt.Group.displayName;
const Lc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Mt.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Lc.displayName = Mt.Separator.displayName;
const Eo = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Mt.Item,
  {
    ref: n,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Eo.displayName = Mt.Item.displayName;
function Fc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function Kr({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: o,
  value: a,
  onChange: s = () => {
  },
  getOptionLabel: l = Fc,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: u = "",
  commandEmptyMessage: m = "No option found",
  buttonVariant: w = "outline",
  alignDropDown: g = "start",
  dir: b = "ltr",
  isDisabled: f = !1,
  ...h
}) {
  const [k, P] = st(!1);
  return /* @__PURE__ */ y(Pi, { open: k, onOpenChange: P, ...h, children: [
    /* @__PURE__ */ i($i, { asChild: !0, children: /* @__PURE__ */ y(
      mt,
      {
        variant: w,
        role: "combobox",
        "aria-expanded": k,
        id: t,
        className: N(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: f,
        children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ i("div", { className: "tw-pr-2", children: c }),
            /* @__PURE__ */ i("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: a ? l(a) : d })
          ] }),
          /* @__PURE__ */ i(po, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      vo,
      {
        align: g,
        className: N("tw-w-[200px] tw-p-0", o),
        dir: b,
        children: /* @__PURE__ */ y(yo, { children: [
          /* @__PURE__ */ i(xo, { dir: b, placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ i(ko, { children: m }),
          /* @__PURE__ */ i(No, { children: e.map((C) => /* @__PURE__ */ y(
            Eo,
            {
              value: l(C),
              onSelect: () => {
                s(C), P(!1);
              },
              children: [
                /* @__PURE__ */ i(
                  Sn,
                  {
                    className: N("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !a || l(a) !== l(C)
                    })
                  }
                ),
                l(C)
              ]
            },
            l(C)
          )) })
        ] })
      }
    )
  ] });
}
function Uc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const s = Tt(
    () => Array.from({ length: a }, (d, u) => u + 1),
    [a]
  );
  return /* @__PURE__ */ y(ce, { children: [
    /* @__PURE__ */ i(St, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ i(
      Kr,
      {
        isDisabled: o,
        onChange: (d) => {
          n(d), d > e && r(d);
        },
        buttonClassName: "tw-ml-2 tw-mr-2 tw-w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ i(St, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ i(
      Kr,
      {
        isDisabled: o,
        onChange: (d) => {
          r(d), d < t && n(d);
        },
        buttonClassName: "tw-ml-2 tw-w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Gc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Gc || {});
const vh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), $r = (t, e) => t[e] ?? e;
function yh({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const u = $r(d, "%webView_bookSelector_currentBook%"), m = $r(d, "%webView_bookSelector_choose%"), w = $r(d, "%webView_bookSelector_chooseBooks%"), [g, b] = st(
    "current book"
    /* CURRENT_BOOK */
  ), f = (h) => {
    b(h), t(h);
  };
  return /* @__PURE__ */ i(
    _i,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (h) => f(h),
      children: /* @__PURE__ */ y("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ y("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(qr, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ i(St, { className: "tw-ml-1", children: u })
          ] }),
          /* @__PURE__ */ i(St, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            Uc,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ y("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(qr, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ i(St, { className: "tw-ml-1", children: w })
          ] }),
          /* @__PURE__ */ i(St, { className: "tw-flex tw-items-center", children: r.map((h) => ct.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ i(
            mt,
            {
              disabled: g === "current book",
              onClick: () => n(),
              children: m
            }
          )
        ] })
      ] })
    }
  );
}
function Hc({ table: t }) {
  return /* @__PURE__ */ y(cr, { children: [
    /* @__PURE__ */ i(jl, { asChild: !0, children: /* @__PURE__ */ y(mt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(wl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ y(Rn, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(_n, { children: "Toggle columns" }),
      /* @__PURE__ */ i(Pn, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ i(
        bo,
        {
          className: "tw-capitalize",
          checked: e.getIsVisible(),
          onCheckedChange: (n) => e.toggleVisibility(!!n),
          children: e.id
        },
        e.id
      ))
    ] })
  ] });
}
const Fe = yt.Root, Xc = yt.Group, Ue = yt.Value, Se = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ y(
  yt.Trigger,
  {
    ref: r,
    className: N(
      "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
      t
    ),
    ...n,
    children: [
      e,
      /* @__PURE__ */ i(yt.Icon, { asChild: !0, children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
Se.displayName = yt.Trigger.displayName;
const Mi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollUpButton,
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(wi, { className: "tw-h-4 tw-w-4" })
  }
));
Mi.displayName = yt.ScrollUpButton.displayName;
const Di = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.ScrollDownButton,
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" })
  }
));
Di.displayName = yt.ScrollDownButton.displayName;
const Ce = S.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => /* @__PURE__ */ i(yt.Portal, { children: /* @__PURE__ */ y(
  yt.Content,
  {
    ref: o,
    className: N(
      "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
      t
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ i(Mi, {}),
      /* @__PURE__ */ i(
        yt.Viewport,
        {
          className: N(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: e
        }
      ),
      /* @__PURE__ */ i(Di, {})
    ]
  }
) }));
Ce.displayName = yt.Content.displayName;
const Yc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Label,
  {
    ref: n,
    className: N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Yc.displayName = yt.Label.displayName;
const Ut = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ y(
  yt.Item,
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(yt.ItemIndicator, { children: /* @__PURE__ */ i(Sn, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ i(yt.ItemText, { children: e })
    ]
  }
));
Ut.displayName = yt.Item.displayName;
const Wc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  yt.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Wc.displayName = yt.Separator.displayName;
function qc({ table: t }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ y("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ i("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ y(
        Fe,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ i(Se, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ i(Ue, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ i(Ce, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ i(Ut, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ y(
        mt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ i(fl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ y(
        mt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ i(ml, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ y(
        mt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ i(hl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ y(
        mt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ i(gl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const $n = S.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i("div", { className: N("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ i(
  "table",
  {
    ref: r,
    className: N("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
$n.displayName = "Table";
const In = S.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ i(
  "thead",
  {
    ref: r,
    className: N(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
In.displayName = "TableHeader";
const An = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: N("[&_tr:last-child]:tw-border-0", t), ...e }));
An.displayName = "TableBody";
const Kc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "tfoot",
  {
    ref: n,
    className: N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Kc.displayName = "TableFooter";
const Jt = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: N(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
Jt.displayName = "TableRow";
const we = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: N(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
we.displayName = "TableHead";
const Vt = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
Vt.displayName = "TableCell";
const Jc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "caption",
  {
    ref: n,
    className: N("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Jc.displayName = "TableCaption";
function Zc({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: s = () => {
  }
}) {
  var h;
  const [l, c] = st([]), [d, u] = st([]), [m, w] = st({}), [g, b] = st({}), f = mi({
    data: e,
    columns: t,
    getCoreRowModel: hi(),
    ...n && { getPaginationRowModel: Gl() },
    onSortingChange: c,
    getSortedRowModel: gi(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Hl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: b,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: m,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ y("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(Hc, { table: f }),
    /* @__PURE__ */ y($n, { stickyHeader: a, children: [
      /* @__PURE__ */ i(In, { stickyHeader: a, children: f.getHeaderGroups().map((k) => /* @__PURE__ */ i(Jt, { children: k.headers.map((P) => /* @__PURE__ */ i(we, { children: P.isPlaceholder ? void 0 : mn(P.column.columnDef.header, P.getContext()) }, P.id)) }, k.id)) }),
      /* @__PURE__ */ i(An, { children: (h = f.getRowModel().rows) != null && h.length ? f.getRowModel().rows.map((k) => /* @__PURE__ */ i(
        Jt,
        {
          onClick: () => s(k, f),
          "data-state": k.getIsSelected() && "selected",
          children: k.getVisibleCells().map((P) => /* @__PURE__ */ i(Vt, { children: mn(P.column.columnDef.cell, P.getContext()) }, P.id))
        },
        k.id
      )) : /* @__PURE__ */ i(Jt, { children: /* @__PURE__ */ i(Vt, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ i(
        mt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.previousPage(),
          disabled: !f.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ i(
        mt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.nextPage(),
          disabled: !f.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ i(qc, { table: f })
  ] });
}
function Qc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Tt(() => {
    const s = [];
    return t.forEach((l) => {
      s.some((c) => wo(c, l)) || s.push(l);
    }), s;
  }, [t]);
  return /* @__PURE__ */ y($n, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(In, { stickyHeader: !0, children: /* @__PURE__ */ y(Jt, { children: [
      /* @__PURE__ */ i(we, { children: r }),
      /* @__PURE__ */ i(we, { children: o })
    ] }) }),
    /* @__PURE__ */ i(An, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ y(
      Jt,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ i(Vt, { children: `${ct.bookNumberToEnglishName(s.reference.bookNum)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ i(Vt, { children: s.text })
        ]
      },
      `${s.reference.bookNum} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const To = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Yr.Root,
  {
    ref: n,
    className: N(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(
      Yr.Indicator,
      {
        className: N("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ i(Sn, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
To.displayName = Yr.Root.displayName;
const td = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ma = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, ed = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? ct.bookIdToNumber(e[1]) : 0;
}, nd = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Bi = Je(
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
), rd = S.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ i(
  bi.Root,
  {
    ref: o,
    className: N(Bi({ variant: e, size: n, className: t })),
    ...r
  }
));
rd.displayName = bi.Root.displayName;
const ji = S.createContext({
  size: "default",
  variant: "default"
}), Vi = S.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => /* @__PURE__ */ i(
  lr.Root,
  {
    ref: a,
    className: N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
    ...o,
    children: /* @__PURE__ */ i(
      ji.Provider,
      {
        value: { variant: e, size: n },
        children: r
      }
    )
  }
));
Vi.displayName = lr.Root.displayName;
const Kn = S.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const s = S.useContext(ji);
  return /* @__PURE__ */ i(
    lr.Item,
    {
      ref: a,
      className: N(
        Bi({
          variant: s.variant || n,
          size: s.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
Kn.displayName = lr.Item.displayName;
const dr = (t) => t === "asc" ? /* @__PURE__ */ i(xl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ i(Nl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(kl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), xh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    dr(e.getIsSorted())
  ] })
}), od = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    dr(n.getIsSorted())
  ] })
}), Nh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    dr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Ir = (t, e, n, r, o, a) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((d) => d !== c);
  }), r(s);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, kh = (t, e, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ y(mt, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
    dr(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const s = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ y(Vi, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ i(
        Kn,
        {
          onClick: () => Ir(
            [l],
            "approved",
            e,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ i(bl, {})
        }
      ),
      /* @__PURE__ */ i(
        Kn,
        {
          onClick: () => Ir(
            [l],
            "unapproved",
            e,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ i(vl, {})
        }
      ),
      /* @__PURE__ */ i(
        Kn,
        {
          onClick: () => Ir(
            [l],
            "unknown",
            e,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ i(yl, {})
        }
      )
    ] });
  }
}), Eh = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_inventory_scope_currentBook%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_show_additional_items%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%"
]), ad = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, id = (t, e, n, r, o) => {
  if (!t)
    return [];
  const a = [];
  let s = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return td(t).forEach((u) => {
    u.startsWith("\\id") && (s = ed(u), l = 0, c = 0), u.startsWith("\\c") && (l = ma(u), c = 0), u.startsWith("\\v") && (c = ma(u), l === 0 && (l = e.chapterNum));
    let m = o.exec(u) ?? void 0;
    for (; m; ) {
      const w = [];
      m.forEach((h) => w.push(h));
      const g = m.index, b = a.find((h) => wo(h.items, w)), f = {
        reference: {
          bookNum: s !== void 0 ? s : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: zl(u, Math.max(0, g - 25), Math.min(g + 25, u.length))
      };
      if (b)
        b.count += 1, b.occurrences.push(f);
      else {
        const h = {
          items: w,
          count: 1,
          status: nd(w[0], n, r),
          occurrences: [f]
        };
        a.push(h);
      }
      m = o.exec(u) ?? void 0;
    }
  }), a;
}, ae = (t, e) => t[e] ?? e;
function Th({
  scriptureReference: t,
  setScriptureReference: e,
  localizedStrings: n,
  extractItems: r,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: s,
  text: l,
  scope: c,
  onScopeChange: d,
  columns: u
}) {
  const m = ae(n, "%webView_inventory_all%"), w = ae(n, "%webView_inventory_approved%"), g = ae(n, "%webView_inventory_unapproved%"), b = ae(n, "%webView_inventory_unknown%"), f = ae(n, "%webView_inventory_scope_currentBook%"), h = ae(n, "%webView_inventory_scope_chapter%"), k = ae(n, "%webView_inventory_scope_verse%"), P = ae(n, "%webView_inventory_filter_text%"), C = ae(
    n,
    "%webView_inventory_show_additional_items%"
  ), [E, v] = st(!1), [$, z] = st("all"), [H, O] = st(""), [I, T] = st([]), D = Tt(() => l ? r instanceof RegExp ? id(
    l,
    t,
    a,
    s,
    r
  ) : r(l, t, a, s) : [], [l, r, t, a, s]), M = Tt(() => {
    if (E)
      return D;
    const x = [];
    return D.forEach((R) => {
      const L = R.items[0], F = x.find(
        (V) => V.items[0] === L
      );
      F ? (F.count += R.count, F.occurrences = F.occurrences.concat(R.occurrences)) : x.push({
        items: [L],
        count: R.count,
        occurrences: R.occurrences,
        status: R.status
      });
    }), x;
  }, [E, D]), Q = Tt(() => ad(M, $, H), [M, $, H]), q = Tt(() => {
    var L, F;
    if (!E)
      return u;
    const x = (L = o == null ? void 0 : o.tableHeaders) == null ? void 0 : L.length;
    if (!x)
      return u;
    const R = [];
    for (let V = 0; V < x; V++)
      R.push(
        od(
          ((F = o == null ? void 0 : o.tableHeaders) == null ? void 0 : F[V]) || "Additional Item",
          V + 1
        )
      );
    return [...R, ...u];
  }, [o == null ? void 0 : o.tableHeaders, u, E]);
  Qt(() => {
    T([]);
  }, [Q]);
  const U = (x, R) => {
    R.setRowSelection(() => {
      const L = {};
      return L[x.index] = !0, L;
    }), T(x.original.items);
  }, tt = (x) => {
    if (x === "book" || x === "chapter" || x === "verse")
      d(x);
    else
      throw new Error(`Invalid scope value: ${x}`);
  }, ot = (x) => {
    if (x === "all" || x === "approved" || x === "unapproved" || x === "unknown")
      z(x);
    else
      throw new Error(`Invalid status filter value: ${x}`);
  }, at = Tt(() => {
    if (M.length === 0 || I.length === 0)
      return [];
    const x = M.filter((R) => wo(
      E ? R.items : [R.items[0]],
      I
    ));
    if (x.length > 1)
      throw new Error("Selected item is not unique");
    return x[0].occurrences;
  }, [I, E, M]);
  return /* @__PURE__ */ y("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ y("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ y(
        Fe,
        {
          onValueChange: (x) => ot(x),
          defaultValue: $,
          children: [
            /* @__PURE__ */ i(Se, { className: "tw-m-1", children: /* @__PURE__ */ i(Ue, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ y(Ce, { children: [
              /* @__PURE__ */ i(Ut, { value: "all", children: m }),
              /* @__PURE__ */ i(Ut, { value: "approved", children: w }),
              /* @__PURE__ */ i(Ut, { value: "unapproved", children: g }),
              /* @__PURE__ */ i(Ut, { value: "unknown", children: b })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ y(Fe, { onValueChange: (x) => tt(x), defaultValue: c, children: [
        /* @__PURE__ */ i(Se, { className: "tw-m-1", children: /* @__PURE__ */ i(Ue, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ y(Ce, { children: [
          /* @__PURE__ */ i(Ut, { value: "book", children: f }),
          /* @__PURE__ */ i(Ut, { value: "chapter", children: h }),
          /* @__PURE__ */ i(Ut, { value: "verse", children: k })
        ] })
      ] }),
      /* @__PURE__ */ i(
        Ze,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: P,
          value: H,
          onChange: (x) => {
            O(x.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ y("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          To,
          {
            className: "tw-m-1",
            checked: E,
            onCheckedChange: (x) => {
              T([]), v(x);
            }
          }
        ),
        /* @__PURE__ */ i(St, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Zc,
      {
        columns: q,
        data: Q,
        onRowClickHandler: U,
        stickyHeader: !0
      }
    ) }),
    at.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Qc,
      {
        occurrenceData: at,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
function sd({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a = "No entries found",
  customSelectedText: s,
  sortSelected: l = !1,
  icon: c = void 0,
  className: d = void 0
}) {
  const [u, m] = st(!1), w = _t(
    (f) => {
      r(
        n.includes(f) ? n.filter((h) => h !== f) : [...n, f]
      );
    },
    [n, r]
  ), g = () => s || o, b = Tt(() => {
    if (!l)
      return t;
    const f = t.filter((k) => k.starred).sort((k, P) => k.label.localeCompare(P.label)), h = t.filter((k) => !k.starred).sort((k, P) => {
      const C = n.includes(k.value), E = n.includes(P.value);
      return C && !E ? -1 : !C && E ? 1 : k.label.localeCompare(P.label);
    });
    return [...f, ...h];
  }, [t, n, l]);
  return /* @__PURE__ */ i("div", { className: d, children: /* @__PURE__ */ y(Pi, { open: u, onOpenChange: m, children: [
    /* @__PURE__ */ i($i, { asChild: !0, children: /* @__PURE__ */ y(
      mt,
      {
        variant: "ghost",
        role: "combobox",
        "aria-expanded": u,
        className: N(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ i("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ i("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: N({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: /* @__PURE__ */ i("div", { className: "tw-font-normal", children: g() })
              }
            )
          ] }),
          /* @__PURE__ */ i(po, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(vo, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ y(yo, { children: [
      /* @__PURE__ */ i(xo, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ y(No, { children: [
        /* @__PURE__ */ i(ko, { children: a }),
        /* @__PURE__ */ i(Ai, { children: b.map((f) => {
          const h = e ? e(f) : void 0;
          return /* @__PURE__ */ y(
            Eo,
            {
              value: f.label,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ i("div", { className: "w-4", children: /* @__PURE__ */ i(
                  Sn,
                  {
                    className: N(
                      "tw-h-4 tw-w-4",
                      n.includes(f.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: f.starred && /* @__PURE__ */ i(El, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ i("div", { className: "tw-flex-grow", children: f.label }),
                e && /* @__PURE__ */ i("div", { className: "tw-w-10 tw-text-right tw-text-muted-foreground", children: h })
              ]
            },
            f.value
          );
        }) })
      ] })
    ] }) })
  ] }) });
}
function So({
  onSearch: t,
  placeholder: e,
  isFullWidth: n,
  className: r
}) {
  const [o, a] = st(""), s = (l) => {
    a(l), t(l);
  };
  return /* @__PURE__ */ y("div", { className: "tw-relative", children: [
    /* @__PURE__ */ i(pi, { className: "tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50" }),
    /* @__PURE__ */ i(
      Ze,
      {
        className: N(
          "tw-flex tw-h-10 tw-w-full tw-text-ellipsis tw-rounded-md tw-border tw-border-input tw-bg-background tw-py-2 tw-pe-3 tw-ps-9 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          { "tw-w-full": n },
          { "tw-pe-9": o },
          r
        ),
        placeholder: e,
        value: o,
        onChange: (l) => s(l.target.value)
      }
    ),
    o && /* @__PURE__ */ y(
      mt,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
        children: [
          /* @__PURE__ */ i(
            uo,
            {
              className: "tw-h-4 tw-w-4",
              onClick: () => {
                s("");
              }
            }
          ),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
const zi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Root,
  {
    orientation: "vertical",
    ref: n,
    className: N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
    ...e
  }
));
zi.displayName = Dt.List.displayName;
const Li = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.List,
  {
    ref: n,
    className: N(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Li.displayName = Dt.List.displayName;
const ld = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Trigger,
  {
    ref: n,
    ...e,
    className: N(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Fi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Content,
  {
    ref: n,
    className: N(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Fi.displayName = Dt.Content.displayName;
function Sh({
  tabList: t,
  onSearch: e,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ y("div", { className: "pr-twp", children: [
    /* @__PURE__ */ y("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ i("h1", { children: r }) : "",
      /* @__PURE__ */ i(
        So,
        {
          isFullWidth: o,
          onSearch: e,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ y(zi, { dir: a, children: [
      /* @__PURE__ */ i(Li, { children: t.map((s) => /* @__PURE__ */ i(ld, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ i(Fi, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
const Co = S.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  vi.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: N(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...r
  }
));
Co.displayName = vi.Root.displayName;
function ha({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const cd = On.Provider, dd = On.Root, ud = On.Trigger, Ui = S.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(
  On.Content,
  {
    ref: r,
    sideOffset: e,
    className: N(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Ui.displayName = On.Content.displayName;
const pd = "16rem", wd = "3rem", Gi = S.createContext(void 0);
function ur() {
  const t = S.useContext(Gi);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Hi = S.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: r,
    style: o,
    children: a,
    ...s
  }, l) => {
    const [c, d] = S.useState(t), u = e ?? c, m = S.useCallback(
      (f) => {
        const h = typeof f == "function" ? f(u) : f;
        n ? n(h) : d(h);
      },
      [n, u]
    ), w = S.useCallback(() => m((f) => !f), [m]), g = u ? "expanded" : "collapsed", b = S.useMemo(
      () => ({
        state: g,
        open: u,
        setOpen: m,
        toggleSidebar: w
      }),
      [g, u, m, w]
    );
    return /* @__PURE__ */ i(Gi.Provider, { value: b, children: /* @__PURE__ */ i(cd, { delayDuration: 0, children: /* @__PURE__ */ i(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": pd,
            "--sidebar-width-icon": wd,
            ...o
          }
        ),
        className: N(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          r
        ),
        ref: l,
        ...s,
        children: a
      }
    ) }) });
  }
);
Hi.displayName = "SidebarProvider";
const Xi = S.forwardRef(
  ({
    side: t = "left",
    variant: e = "sidebar",
    collapsible: n = "offcanvas",
    className: r,
    children: o,
    ...a
  }, s) => {
    const { state: l } = ur();
    return n === "none" ? /* @__PURE__ */ i(
      "div",
      {
        className: N(
          "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
          r
        ),
        ref: s,
        ...a,
        children: o
      }
    ) : /* @__PURE__ */ y(
      "div",
      {
        ref: s,
        className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
        "data-state": l,
        "data-collapsible": l === "collapsed" ? n : "",
        "data-variant": e,
        "data-side": t,
        children: [
          /* @__PURE__ */ i(
            "div",
            {
              className: N(
                "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
                "group-data-[collapsible=offcanvas]:tw-w-0",
                "group-data-[side=right]:tw-rotate-180",
                e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ i(
            "div",
            {
              className: N(
                // Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
                "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
                t === "left" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=left]:tw-border-r group-data-[side=right]:tw-border-l",
                r
              ),
              ...a,
              children: /* @__PURE__ */ i(
                "div",
                {
                  "data-sidebar": "sidebar",
                  className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                  children: o
                }
              )
            }
          )
        ]
      }
    );
  }
);
Xi.displayName = "Sidebar";
const fd = S.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const { toggleSidebar: o } = ur();
  return /* @__PURE__ */ y(
    mt,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: N("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o();
      },
      ...n,
      children: [
        /* @__PURE__ */ i(Tl, {}),
        /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
fd.displayName = "SidebarTrigger";
const md = S.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = ur();
    return /* @__PURE__ */ i(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: r,
        title: "Toggle Sidebar",
        className: N(
          "tw-absolute tw-inset-y-0 tw-z-20 tw-hidden tw-w-4 tw--translate-x-1/2 tw-transition-all tw-ease-linear after:tw-absolute after:tw-inset-y-0 after:tw-left-1/2 after:tw-w-[2px] hover:after:tw-bg-sidebar-border group-data-[side=left]:tw--right-4 group-data-[side=right]:tw-left-0 sm:tw-flex",
          "[[data-side=left]_&]:tw-cursor-w-resize [[data-side=right]_&]:tw-cursor-e-resize",
          "[[data-side=left][data-state=collapsed]_&]:tw-cursor-e-resize [[data-side=right][data-state=collapsed]_&]:tw-cursor-w-resize",
          "group-data-[collapsible=offcanvas]:tw-translate-x-0 group-data-[collapsible=offcanvas]:after:tw-left-full group-data-[collapsible=offcanvas]:hover:tw-bg-sidebar",
          "[[data-side=left][data-collapsible=offcanvas]_&]:tw--right-2",
          "[[data-side=right][data-collapsible=offcanvas]_&]:tw--left-2",
          t
        ),
        ...e
      }
    );
  }
);
md.displayName = "SidebarRail";
const Yi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "main",
    {
      ref: n,
      className: N(
        // Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Yi.displayName = "SidebarInset";
const hd = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Ze,
  {
    ref: n,
    "data-sidebar": "input",
    className: N(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
hd.displayName = "SidebarInput";
const gd = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: N("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
gd.displayName = "SidebarHeader";
const bd = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: N("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
bd.displayName = "SidebarFooter";
const vd = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Co,
  {
    ref: n,
    "data-sidebar": "separator",
    className: N("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
vd.displayName = "SidebarSeparator";
const Wi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: N(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Wi.displayName = "SidebarContent";
const Jr = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: N("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Jr.displayName = "SidebarGroup";
const Zr = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Ke : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: N(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Zr.displayName = "SidebarGroupLabel";
const yd = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
  e ? Ke : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: N(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
yd.displayName = "SidebarGroupAction";
const Qr = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: N("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
Qr.displayName = "SidebarGroupContent";
const qi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: N("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
qi.displayName = "SidebarMenu";
const Ki = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: N("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Ki.displayName = "SidebarMenuItem";
const xd = Je(
  // Removed data-[active=true]:tw-bg-sidebar-accent
  "tw-peer/menu-button tw-flex tw-w-full tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-p-2 tw-text-left tw-text-sm tw-outline-none tw-ring-sidebar-ring tw-transition-[width,height,padding] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 tw-group-has-[[data-sidebar=menu-action]]/menu-item:pr-8 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 data-[active=true]:tw-font-medium data-[active=true]:tw-text-sidebar-accent-foreground data-[state=open]:hover:tw-bg-sidebar-accent data-[state=open]:hover:tw-text-sidebar-accent-foreground group-data-[collapsible=icon]:tw-!size-8 group-data-[collapsible=icon]:tw-!p-2 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
  {
    variants: {
      variant: {
        default: "hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground",
        outline: "tw-bg-background tw-shadow-[0_0_0_1px_hsl(var(--sidebar-border))] hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground hover:tw-shadow-[0_0_0_1px_hsl(var(--sidebar-accent))]"
      },
      size: {
        default: "tw-h-8 tw-text-sm",
        sm: "tw-h-7 tw-text-xs",
        lg: "tw-h-12 tw-text-sm group-data-[collapsible=icon]:tw-!p-0"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
), Ji = S.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...s
  }, l) => {
    const c = t ? Ke : "button", { state: d } = ur(), u = /* @__PURE__ */ i(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: N(xd({ variant: n, size: r }), a),
        ...s
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ y(dd, { children: [
      /* @__PURE__ */ i(ud, { asChild: !0, children: u }),
      /* @__PURE__ */ i(Ui, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : u;
  }
);
Ji.displayName = "SidebarMenuButton";
const Nd = S.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ i(
  e ? Ke : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: N(
      "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-absolute tw-right-1 tw-top-1.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "tw-peer-data-[size=sm]/menu-button:top-1",
      "tw-peer-data-[size=default]/menu-button:top-1.5",
      "tw-peer-data-[size=lg]/menu-button:top-2.5",
      "group-data-[collapsible=icon]:tw-hidden",
      n && "tw-group-focus-within/menu-item:opacity-100 tw-group-hover/menu-item:opacity-100 tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground data-[state=open]:tw-opacity-100 md:tw-opacity-0",
      t
    ),
    ...r
  }
));
Nd.displayName = "SidebarMenuAction";
const kd = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: N(
        "tw-pointer-events-none tw-absolute tw-right-1 tw-flex tw-h-5 tw-min-w-5 tw-select-none tw-items-center tw-justify-center tw-rounded-md tw-px-1 tw-text-xs tw-font-medium tw-tabular-nums tw-text-sidebar-foreground",
        "tw-peer-hover/menu-button:text-sidebar-accent-foreground tw-peer-data-[active=true]/menu-button:text-sidebar-accent-foreground",
        "tw-peer-data-[size=sm]/menu-button:top-1",
        "tw-peer-data-[size=default]/menu-button:top-1.5",
        "tw-peer-data-[size=lg]/menu-button:top-2.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
kd.displayName = "SidebarMenuBadge";
const Ed = S.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = S.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ y(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: N("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ i(ha, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ i(
          ha,
          {
            className: "tw-h-4 tw-max-w-[--skeleton-width] tw-flex-1",
            "data-sidebar": "menu-skeleton-text",
            style: (
              // eslint-disable-next-line no-type-assertion/no-type-assertion
              {
                "--skeleton-width": o
              }
            )
          }
        )
      ]
    }
  );
});
Ed.displayName = "SidebarMenuSkeleton";
const Td = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: N(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
Td.displayName = "SidebarMenuSub";
const Sd = S.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ i("li", { ref: e, ...t })
);
Sd.displayName = "SidebarMenuSubItem";
const Cd = S.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ i(
  t ? Ke : "a",
  {
    ref: a,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: N(
      "tw-flex tw-h-7 tw-min-w-0 tw--translate-x-px tw-items-center tw-gap-2 tw-overflow-hidden tw-rounded-md tw-px-2 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 active:tw-bg-sidebar-accent active:tw-text-sidebar-accent-foreground disabled:tw-pointer-events-none disabled:tw-opacity-50 aria-disabled:tw-pointer-events-none aria-disabled:tw-opacity-50 [&>span:last-child]:tw-truncate [&>svg]:tw-size-4 [&>svg]:tw-shrink-0 [&>svg]:tw-text-sidebar-accent-foreground",
      "data-[active=true]:tw-bg-sidebar-accent data-[active=true]:tw-text-sidebar-accent-foreground",
      e === "sm" && "tw-text-xs",
      e === "md" && "tw-text-sm",
      "group-data-[collapsible=icon]:tw-hidden",
      r
    ),
    ...o
  }
));
Cd.displayName = "SidebarMenuSubButton";
function Od({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l
}) {
  const c = _t(
    (m, w) => {
      r(m, w);
    },
    [r]
  ), d = _t(
    (m) => {
      const w = n.find((g) => g.projectId === m);
      return w ? w.projectName : m;
    },
    [n]
  ), u = _t(
    (m) => !o.projectId && m === o.label,
    [o]
  );
  return /* @__PURE__ */ i(
    Xi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
      children: /* @__PURE__ */ y(Wi, { children: [
        /* @__PURE__ */ y(Jr, { children: [
          /* @__PURE__ */ i(Zr, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ i(Qr, { children: /* @__PURE__ */ i(qi, { children: e.map((m) => /* @__PURE__ */ i(Ki, { children: /* @__PURE__ */ i(
            Ji,
            {
              className: N(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": u(m) }
              ),
              onClick: () => c(m),
              isActive: u(m),
              children: /* @__PURE__ */ i("span", { className: "tw-pl-3", children: m })
            }
          ) }, m)) }) })
        ] }),
        /* @__PURE__ */ y(Jr, { children: [
          /* @__PURE__ */ i(Zr, { className: "tw-text-sm tw-text-gray-400", children: s }),
          /* @__PURE__ */ i(Qr, { className: "tw-pl-3", children: /* @__PURE__ */ i(
            Kr,
            {
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((m) => m.projectId),
              getOptionLabel: (m) => d(m),
              buttonPlaceholder: l,
              onChange: (m) => {
                const w = d(m);
                c(w, m);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0
            }
          ) })
        ] })
      ] })
    }
  );
}
function Ch({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  children: r,
  handleSelectSidebarItem: o,
  selectedSidebarItem: a,
  onSearch: s,
  extensionsSidebarGroupLabel: l,
  projectsSidebarGroupLabel: c,
  buttonPlaceholderText: d
}) {
  return /* @__PURE__ */ y("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ i("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ i(
      So,
      {
        className: "tw-w-9/12",
        onSearch: s,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ y(Hi, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ i(
        Od,
        {
          extensionLabels: e,
          projectInfo: n,
          handleSelectSidebarItem: o,
          selectedSidebarItem: a,
          extensionsSidebarGroupLabel: l,
          projectsSidebarGroupLabel: c,
          buttonPlaceholderText: d
        }
      ),
      /* @__PURE__ */ i(Yi, { className: "tw-overflow-y-auto", children: r })
    ] })
  ] });
}
const ue = "scrBook", Rd = "scrRef", be = "source", _d = "details", Pd = "Scripture Reference", $d = "Scripture Book", Zi = "Type", Id = "Details";
function Ad(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${ct.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: ue,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Pd,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ct.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === ue ? _r(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Xr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => _r(r.start),
      id: Rd,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : _r(o.start);
      },
      sortingFn: (r, o) => Xr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: be,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Zi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: _d,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Id,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const Md = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Xr(t.start, t.end) === 0 ? `${Pr(t.start)}+${e}` : `${Pr(t.start)}+${e}-${Pr(t.end)}+${n}`;
}, ga = (t) => `${Md({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Oh({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: s,
  onRowSelected: l,
  direction: c = "ltr"
}) {
  const [d, u] = st([]), [m, w] = st([{ id: ue, desc: !1 }]), [g, b] = st({}), f = Tt(
    () => t.flatMap((O) => O.data.map((I) => ({
      ...I,
      source: O.source
    }))),
    [t]
  ), h = Tt(
    () => Ad(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: s
      },
      n
    ),
    [r, a, s, n]
  );
  Qt(() => {
    d.includes(be) ? w([
      { id: be, desc: !1 },
      { id: ue, desc: !1 }
    ]) : w([{ id: ue, desc: !1 }]);
  }, [d]);
  const k = mi({
    data: f,
    columns: h,
    state: {
      grouping: d,
      sorting: m,
      rowSelection: g
    },
    onGroupingChange: u,
    onSortingChange: w,
    onRowSelectionChange: b,
    getExpandedRowModel: Xl(),
    getGroupedRowModel: Yl(),
    getCoreRowModel: hi(),
    getSortedRowModel: gi(),
    getRowId: ga,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Qt(() => {
    if (l) {
      const O = k.getSelectedRowModel().rowsById, I = Object.keys(O);
      if (I.length === 1) {
        const T = f.find((D) => ga(D) === I[0]) || void 0;
        T && l(T);
      }
    }
  }, [g, f, l, k]);
  const P = o ?? $d, C = a ?? Zi, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${P}`, value: [ue] },
    { label: `Group by ${C}`, value: [be] },
    {
      label: `Group by ${P} and ${C}`,
      value: [ue, be]
    },
    {
      label: `Group by ${C} and ${P}`,
      value: [be, ue]
    }
  ], v = (O) => {
    u(JSON.parse(O));
  }, $ = (O, I) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()(I);
  }, z = (O, I) => O.getIsGrouped() ? "" : N("banded-row", I % 2 === 0 ? "even" : "odd"), H = (O, I, T) => {
    if (!((O == null ? void 0 : O.length) === 0 || I.depth < T.column.getGroupedIndex())) {
      if (I.getIsGrouped())
        switch (I.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (I.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ y("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ y(
      Fe,
      {
        value: JSON.stringify(d),
        onValueChange: (O) => {
          v(O);
        },
        children: [
          /* @__PURE__ */ i(Se, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(Ue, {}) }),
          /* @__PURE__ */ i(Ce, { position: "item-aligned", children: /* @__PURE__ */ i(Xc, { children: E.map((O) => /* @__PURE__ */ i(Ut, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ y($n, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ i(In, { children: k.getHeaderGroups().map((O) => /* @__PURE__ */ i(Jt, { children: O.headers.filter((I) => I.column.columnDef.header).map((I) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ i(we, { colSpan: I.colSpan, className: "top-0 tw-sticky", children: I.isPlaceholder ? void 0 : /* @__PURE__ */ y("div", { children: [
          I.column.getCanGroup() ? /* @__PURE__ */ i(
            mt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${I.column.columnDef.header}`,
              onClick: I.column.getToggleGroupingHandler(),
              type: "button",
              children: I.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          mn(I.column.columnDef.header, I.getContext())
        ] }) }, I.id)
      )) }, O.id)) }),
      /* @__PURE__ */ i(An, { children: k.getRowModel().rows.map((O, I) => /* @__PURE__ */ i(
        Jt,
        {
          "data-state": O.getIsSelected() ? "selected" : "",
          className: N(z(O, I)),
          onClick: (T) => $(O, T),
          children: O.getVisibleCells().map((T) => {
            if (!(T.getIsPlaceholder() || T.column.columnDef.enableGrouping && !T.getIsGrouped() && (T.column.columnDef.id !== be || !n)))
              return /* @__PURE__ */ i(
                Vt,
                {
                  className: N(
                    T.column.columnDef.id,
                    "tw-p-[1px]",
                    H(d, O, T)
                  ),
                  children: (() => T.getIsGrouped() ? /* @__PURE__ */ y(
                    mt,
                    {
                      variant: "link",
                      onClick: O.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        O.getIsExpanded() && /* @__PURE__ */ i(Cn, {}),
                        !O.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ i(di, {}) : /* @__PURE__ */ i(Sl, {})),
                        " ",
                        mn(T.column.columnDef.cell, T.getContext()),
                        " (",
                        O.subRows.length,
                        ")"
                      ]
                    }
                  ) : mn(T.column.columnDef.cell, T.getContext()))()
                },
                T.id
              );
          })
        },
        O.id
      )) })
    ] })
  ] });
}
const Ar = {
  [ft("undefined")]: "Ø",
  [ft(0)]: "A",
  [ft(1)]: "B",
  [ft(2)]: "C",
  [ft(3)]: "D",
  [ft(4)]: "E",
  [ft(5)]: "F",
  [ft(6)]: "G",
  [ft(7)]: "H",
  [ft(8)]: "I",
  [ft(9)]: "J",
  [ft(10)]: "K",
  [ft(11)]: "L",
  [ft(12)]: "M",
  [ft(13)]: "N",
  [ft(14)]: "O",
  [ft(15)]: "P",
  [ft(16)]: "Q",
  [ft(17)]: "R",
  [ft(18)]: "S",
  [ft(19)]: "T",
  [ft(20)]: "U",
  [ft(21)]: "V",
  [ft(22)]: "W",
  [ft(23)]: "X",
  [ft(24)]: "Y",
  [ft(25)]: "Z"
};
function Rh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Ar,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([a, s]) => [
          a,
          a === s && a in Ar ? Ar[a] : s
        ]
      )
    )
  };
  return /* @__PURE__ */ y(
    Fe,
    {
      value: `${e}`,
      onValueChange: (a) => n(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ i(Se, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ i(
          Ue,
          {
            placeholder: o[ft(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ i(
          Ce,
          {
            style: { zIndex: 250 },
            children: t.map((a) => /* @__PURE__ */ i(Ut, { value: `${a}`, children: o[ft(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
function _h({ children: t }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: t });
}
function Ph({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ y("div", { children: [
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ i("div", { children: n })
  ] });
}
function $h({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ y("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ y("div", { children: [
      /* @__PURE__ */ i("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ i(Co, {}) : ""
  ] });
}
function Ih({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ i("div", { id: t, className: e, children: n.map((s) => /* @__PURE__ */ y("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      To,
      {
        className: "tw-mr-2 tw-align-middle",
        checked: r.includes(s),
        onCheckedChange: (l) => o(s, l)
      }
    ),
    /* @__PURE__ */ i(St, { children: a ? a(s) : s })
  ] }, s)) });
}
function Dd(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Bd(t) {
  if (t.__esModule)
    return t;
  var e = t.default;
  if (typeof e == "function") {
    var n = function r() {
      return this instanceof r ? Reflect.construct(e, arguments, this.constructor) : e.apply(this, arguments);
    };
    n.prototype = e.prototype;
  } else
    n = {};
  return Object.defineProperty(n, "__esModule", { value: !0 }), Object.keys(t).forEach(function(r) {
    var o = Object.getOwnPropertyDescriptor(t, r);
    Object.defineProperty(n, r, o.get ? o : {
      enumerable: !0,
      get: function() {
        return t[r];
      }
    });
  }), n;
}
var Oo = {}, Qi = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Qi);
var jd = Qi.exports, Mr = {};
function Ro(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function A() {
  return A = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, A.apply(this, arguments);
}
function xe(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function ts(t) {
  if (!xe(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = ts(t[n]);
  }), e;
}
function ie(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? A({}, t) : t;
  return xe(t) && xe(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (xe(e[o]) && o in t && xe(t[o]) ? r[o] = ie(t[o], e[o], n) : n.clone ? r[o] = xe(e[o]) ? ts(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var to = { exports: {} }, Hn = { exports: {} }, dt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ba;
function Vd() {
  if (ba)
    return dt;
  ba = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, m = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, b = t ? Symbol.for("react.lazy") : 60116, f = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, P = t ? Symbol.for("react.scope") : 60119;
  function C(v) {
    if (typeof v == "object" && v !== null) {
      var $ = v.$$typeof;
      switch ($) {
        case e:
          switch (v = v.type, v) {
            case c:
            case d:
            case r:
            case a:
            case o:
            case m:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case l:
                case u:
                case b:
                case g:
                case s:
                  return v;
                default:
                  return $;
              }
          }
        case n:
          return $;
      }
    }
  }
  function E(v) {
    return C(v) === d;
  }
  return dt.AsyncMode = c, dt.ConcurrentMode = d, dt.ContextConsumer = l, dt.ContextProvider = s, dt.Element = e, dt.ForwardRef = u, dt.Fragment = r, dt.Lazy = b, dt.Memo = g, dt.Portal = n, dt.Profiler = a, dt.StrictMode = o, dt.Suspense = m, dt.isAsyncMode = function(v) {
    return E(v) || C(v) === c;
  }, dt.isConcurrentMode = E, dt.isContextConsumer = function(v) {
    return C(v) === l;
  }, dt.isContextProvider = function(v) {
    return C(v) === s;
  }, dt.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, dt.isForwardRef = function(v) {
    return C(v) === u;
  }, dt.isFragment = function(v) {
    return C(v) === r;
  }, dt.isLazy = function(v) {
    return C(v) === b;
  }, dt.isMemo = function(v) {
    return C(v) === g;
  }, dt.isPortal = function(v) {
    return C(v) === n;
  }, dt.isProfiler = function(v) {
    return C(v) === a;
  }, dt.isStrictMode = function(v) {
    return C(v) === o;
  }, dt.isSuspense = function(v) {
    return C(v) === m;
  }, dt.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === d || v === a || v === o || v === m || v === w || typeof v == "object" && v !== null && (v.$$typeof === b || v.$$typeof === g || v.$$typeof === s || v.$$typeof === l || v.$$typeof === u || v.$$typeof === h || v.$$typeof === k || v.$$typeof === P || v.$$typeof === f);
  }, dt.typeOf = C, dt;
}
var ut = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var va;
function zd() {
  return va || (va = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, m = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, b = t ? Symbol.for("react.lazy") : 60116, f = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, k = t ? Symbol.for("react.responder") : 60118, P = t ? Symbol.for("react.scope") : 60119;
    function C(_) {
      return typeof _ == "string" || typeof _ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      _ === r || _ === d || _ === a || _ === o || _ === m || _ === w || typeof _ == "object" && _ !== null && (_.$$typeof === b || _.$$typeof === g || _.$$typeof === s || _.$$typeof === l || _.$$typeof === u || _.$$typeof === h || _.$$typeof === k || _.$$typeof === P || _.$$typeof === f);
    }
    function E(_) {
      if (typeof _ == "object" && _ !== null) {
        var Et = _.$$typeof;
        switch (Et) {
          case e:
            var j = _.type;
            switch (j) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case m:
                return j;
              default:
                var xt = j && j.$$typeof;
                switch (xt) {
                  case l:
                  case u:
                  case b:
                  case g:
                  case s:
                    return xt;
                  default:
                    return Et;
                }
            }
          case n:
            return Et;
        }
      }
    }
    var v = c, $ = d, z = l, H = s, O = e, I = u, T = r, D = b, M = g, Q = n, q = a, U = o, tt = m, ot = !1;
    function at(_) {
      return ot || (ot = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), x(_) || E(_) === c;
    }
    function x(_) {
      return E(_) === d;
    }
    function R(_) {
      return E(_) === l;
    }
    function L(_) {
      return E(_) === s;
    }
    function F(_) {
      return typeof _ == "object" && _ !== null && _.$$typeof === e;
    }
    function V(_) {
      return E(_) === u;
    }
    function Y(_) {
      return E(_) === r;
    }
    function X(_) {
      return E(_) === b;
    }
    function W(_) {
      return E(_) === g;
    }
    function G(_) {
      return E(_) === n;
    }
    function J(_) {
      return E(_) === a;
    }
    function Z(_) {
      return E(_) === o;
    }
    function lt(_) {
      return E(_) === m;
    }
    ut.AsyncMode = v, ut.ConcurrentMode = $, ut.ContextConsumer = z, ut.ContextProvider = H, ut.Element = O, ut.ForwardRef = I, ut.Fragment = T, ut.Lazy = D, ut.Memo = M, ut.Portal = Q, ut.Profiler = q, ut.StrictMode = U, ut.Suspense = tt, ut.isAsyncMode = at, ut.isConcurrentMode = x, ut.isContextConsumer = R, ut.isContextProvider = L, ut.isElement = F, ut.isForwardRef = V, ut.isFragment = Y, ut.isLazy = X, ut.isMemo = W, ut.isPortal = G, ut.isProfiler = J, ut.isStrictMode = Z, ut.isSuspense = lt, ut.isValidElementType = C, ut.typeOf = E;
  }()), ut;
}
var ya;
function es() {
  return ya || (ya = 1, process.env.NODE_ENV === "production" ? Hn.exports = Vd() : Hn.exports = zd()), Hn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Dr, xa;
function Ld() {
  if (xa)
    return Dr;
  xa = 1;
  var t = Object.getOwnPropertySymbols, e = Object.prototype.hasOwnProperty, n = Object.prototype.propertyIsEnumerable;
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
      for (var s = {}, l = 0; l < 10; l++)
        s["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(s).map(function(u) {
        return s[u];
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
  return Dr = o() ? Object.assign : function(a, s) {
    for (var l, c = r(a), d, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var m in l)
        e.call(l, m) && (c[m] = l[m]);
      if (t) {
        d = t(l);
        for (var w = 0; w < d.length; w++)
          n.call(l, d[w]) && (c[d[w]] = l[d[w]]);
      }
    }
    return c;
  }, Dr;
}
var Br, Na;
function _o() {
  if (Na)
    return Br;
  Na = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Br = t, Br;
}
var jr, ka;
function ns() {
  return ka || (ka = 1, jr = Function.call.bind(Object.prototype.hasOwnProperty)), jr;
}
var Vr, Ea;
function Fd() {
  if (Ea)
    return Vr;
  Ea = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = _o(), n = {}, r = ns();
    t = function(a) {
      var s = "Warning: " + a;
      typeof console < "u" && console.error(s);
      try {
        throw new Error(s);
      } catch {
      }
    };
  }
  function o(a, s, l, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var u in a)
        if (r(a, u)) {
          var m;
          try {
            if (typeof a[u] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            m = a[u](s, u, c, l, null, e);
          } catch (b) {
            m = b;
          }
          if (m && !(m instanceof Error) && t(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in n)) {
            n[m.message] = !0;
            var g = d ? d() : "";
            t(
              "Failed " + l + " type: " + m.message + (g ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Vr = o, Vr;
}
var zr, Ta;
function Ud() {
  if (Ta)
    return zr;
  Ta = 1;
  var t = es(), e = Ld(), n = _o(), r = ns(), o = Fd(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(l) {
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
  return zr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function m(x) {
      var R = x && (d && x[d] || x[u]);
      if (typeof R == "function")
        return R;
    }
    var w = "<<anonymous>>", g = {
      array: k("array"),
      bigint: k("bigint"),
      bool: k("boolean"),
      func: k("function"),
      number: k("number"),
      object: k("object"),
      string: k("string"),
      symbol: k("symbol"),
      any: P(),
      arrayOf: C,
      element: E(),
      elementType: v(),
      instanceOf: $,
      node: I(),
      objectOf: H,
      oneOf: z,
      oneOfType: O,
      shape: D,
      exact: M
    };
    function b(x, R) {
      return x === R ? x !== 0 || 1 / x === 1 / R : x !== x && R !== R;
    }
    function f(x, R) {
      this.message = x, this.data = R && typeof R == "object" ? R : {}, this.stack = "";
    }
    f.prototype = Error.prototype;
    function h(x) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, L = 0;
      function F(Y, X, W, G, J, Z, lt) {
        if (G = G || w, Z = Z || W, lt !== n) {
          if (c) {
            var _ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw _.name = "Invariant Violation", _;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Et = G + ":" + W;
            !R[Et] && // Avoid spamming the console because they are often not actionable except for lib authors
            L < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[Et] = !0, L++);
          }
        }
        return X[W] == null ? Y ? X[W] === null ? new f("The " + J + " `" + Z + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new f("The " + J + " `" + Z + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : x(X, W, G, J, Z);
      }
      var V = F.bind(null, !1);
      return V.isRequired = F.bind(null, !0), V;
    }
    function k(x) {
      function R(L, F, V, Y, X, W) {
        var G = L[F], J = U(G);
        if (J !== x) {
          var Z = tt(G);
          return new f(
            "Invalid " + Y + " `" + X + "` of type " + ("`" + Z + "` supplied to `" + V + "`, expected ") + ("`" + x + "`."),
            { expectedType: x }
          );
        }
        return null;
      }
      return h(R);
    }
    function P() {
      return h(s);
    }
    function C(x) {
      function R(L, F, V, Y, X) {
        if (typeof x != "function")
          return new f("Property `" + X + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var W = L[F];
        if (!Array.isArray(W)) {
          var G = U(W);
          return new f("Invalid " + Y + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected an array."));
        }
        for (var J = 0; J < W.length; J++) {
          var Z = x(W, J, V, Y, X + "[" + J + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return h(R);
    }
    function E() {
      function x(R, L, F, V, Y) {
        var X = R[L];
        if (!l(X)) {
          var W = U(X);
          return new f("Invalid " + V + " `" + Y + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(x);
    }
    function v() {
      function x(R, L, F, V, Y) {
        var X = R[L];
        if (!t.isValidElementType(X)) {
          var W = U(X);
          return new f("Invalid " + V + " `" + Y + "` of type " + ("`" + W + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(x);
    }
    function $(x) {
      function R(L, F, V, Y, X) {
        if (!(L[F] instanceof x)) {
          var W = x.name || w, G = at(L[F]);
          return new f("Invalid " + Y + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected ") + ("instance of `" + W + "`."));
        }
        return null;
      }
      return h(R);
    }
    function z(x) {
      if (!Array.isArray(x))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(L, F, V, Y, X) {
        for (var W = L[F], G = 0; G < x.length; G++)
          if (b(W, x[G]))
            return null;
        var J = JSON.stringify(x, function(lt, _) {
          var Et = tt(_);
          return Et === "symbol" ? String(_) : _;
        });
        return new f("Invalid " + Y + " `" + X + "` of value `" + String(W) + "` " + ("supplied to `" + V + "`, expected one of " + J + "."));
      }
      return h(R);
    }
    function H(x) {
      function R(L, F, V, Y, X) {
        if (typeof x != "function")
          return new f("Property `" + X + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var W = L[F], G = U(W);
        if (G !== "object")
          return new f("Invalid " + Y + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected an object."));
        for (var J in W)
          if (r(W, J)) {
            var Z = x(W, J, V, Y, X + "." + J, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return h(R);
    }
    function O(x) {
      if (!Array.isArray(x))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < x.length; R++) {
        var L = x[R];
        if (typeof L != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ot(L) + " at index " + R + "."
          ), s;
      }
      function F(V, Y, X, W, G) {
        for (var J = [], Z = 0; Z < x.length; Z++) {
          var lt = x[Z], _ = lt(V, Y, X, W, G, n);
          if (_ == null)
            return null;
          _.data && r(_.data, "expectedType") && J.push(_.data.expectedType);
        }
        var Et = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new f("Invalid " + W + " `" + G + "` supplied to " + ("`" + X + "`" + Et + "."));
      }
      return h(F);
    }
    function I() {
      function x(R, L, F, V, Y) {
        return Q(R[L]) ? null : new f("Invalid " + V + " `" + Y + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return h(x);
    }
    function T(x, R, L, F, V) {
      return new f(
        (x || "React class") + ": " + R + " type `" + L + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function D(x) {
      function R(L, F, V, Y, X) {
        var W = L[F], G = U(W);
        if (G !== "object")
          return new f("Invalid " + Y + " `" + X + "` of type `" + G + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var J in x) {
          var Z = x[J];
          if (typeof Z != "function")
            return T(V, Y, X, J, tt(Z));
          var lt = Z(W, J, V, Y, X + "." + J, n);
          if (lt)
            return lt;
        }
        return null;
      }
      return h(R);
    }
    function M(x) {
      function R(L, F, V, Y, X) {
        var W = L[F], G = U(W);
        if (G !== "object")
          return new f("Invalid " + Y + " `" + X + "` of type `" + G + "` " + ("supplied to `" + V + "`, expected `object`."));
        var J = e({}, L[F], x);
        for (var Z in J) {
          var lt = x[Z];
          if (r(x, Z) && typeof lt != "function")
            return T(V, Y, X, Z, tt(lt));
          if (!lt)
            return new f(
              "Invalid " + Y + " `" + X + "` key `" + Z + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(L[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(x), null, "  ")
            );
          var _ = lt(W, Z, V, Y, X + "." + Z, n);
          if (_)
            return _;
        }
        return null;
      }
      return h(R);
    }
    function Q(x) {
      switch (typeof x) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !x;
        case "object":
          if (Array.isArray(x))
            return x.every(Q);
          if (x === null || l(x))
            return !0;
          var R = m(x);
          if (R) {
            var L = R.call(x), F;
            if (R !== x.entries) {
              for (; !(F = L.next()).done; )
                if (!Q(F.value))
                  return !1;
            } else
              for (; !(F = L.next()).done; ) {
                var V = F.value;
                if (V && !Q(V[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function q(x, R) {
      return x === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function U(x) {
      var R = typeof x;
      return Array.isArray(x) ? "array" : x instanceof RegExp ? "object" : q(R, x) ? "symbol" : R;
    }
    function tt(x) {
      if (typeof x > "u" || x === null)
        return "" + x;
      var R = U(x);
      if (R === "object") {
        if (x instanceof Date)
          return "date";
        if (x instanceof RegExp)
          return "regexp";
      }
      return R;
    }
    function ot(x) {
      var R = tt(x);
      switch (R) {
        case "array":
        case "object":
          return "an " + R;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + R;
        default:
          return R;
      }
    }
    function at(x) {
      return !x.constructor || !x.constructor.name ? w : x.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, zr;
}
var Lr, Sa;
function Gd() {
  if (Sa)
    return Lr;
  Sa = 1;
  var t = _o();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, Lr = function() {
    function r(s, l, c, d, u, m) {
      if (m !== t) {
        var w = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw w.name = "Invariant Violation", w;
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
      resetWarningCache: e
    };
    return a.PropTypes = a, a;
  }, Lr;
}
if (process.env.NODE_ENV !== "production") {
  var Hd = es(), Xd = !0;
  to.exports = Ud()(Hd.isElement, Xd);
} else
  to.exports = Gd()();
var Yd = to.exports;
const p = /* @__PURE__ */ Dd(Yd);
function Wd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function rs(t, e, n, r, o) {
  const a = t[e], s = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Wd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const os = Ro(p.element, rs);
os.isRequired = Ro(p.element.isRequired, rs);
const as = os, qd = "exact-prop: ​";
function Kd(t) {
  return process.env.NODE_ENV === "production" ? t : A({}, t, {
    [qd]: (e) => {
      const n = Object.keys(e).filter((r) => !t.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Ge(t) {
  let e = "https://mui.com/production-error/?code=" + t;
  for (let n = 1; n < arguments.length; n += 1)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + t + "; visit " + e + " for the full message.";
}
var eo = { exports: {} }, pt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ca;
function Jd() {
  if (Ca)
    return pt;
  Ca = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), b;
  b = Symbol.for("react.module.reference");
  function f(h) {
    if (typeof h == "object" && h !== null) {
      var k = h.$$typeof;
      switch (k) {
        case t:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case d:
            case u:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case s:
                case c:
                case w:
                case m:
                case a:
                  return h;
                default:
                  return k;
              }
          }
        case e:
          return k;
      }
    }
  }
  return pt.ContextConsumer = s, pt.ContextProvider = a, pt.Element = t, pt.ForwardRef = c, pt.Fragment = n, pt.Lazy = w, pt.Memo = m, pt.Portal = e, pt.Profiler = o, pt.StrictMode = r, pt.Suspense = d, pt.SuspenseList = u, pt.isAsyncMode = function() {
    return !1;
  }, pt.isConcurrentMode = function() {
    return !1;
  }, pt.isContextConsumer = function(h) {
    return f(h) === s;
  }, pt.isContextProvider = function(h) {
    return f(h) === a;
  }, pt.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, pt.isForwardRef = function(h) {
    return f(h) === c;
  }, pt.isFragment = function(h) {
    return f(h) === n;
  }, pt.isLazy = function(h) {
    return f(h) === w;
  }, pt.isMemo = function(h) {
    return f(h) === m;
  }, pt.isPortal = function(h) {
    return f(h) === e;
  }, pt.isProfiler = function(h) {
    return f(h) === o;
  }, pt.isStrictMode = function(h) {
    return f(h) === r;
  }, pt.isSuspense = function(h) {
    return f(h) === d;
  }, pt.isSuspenseList = function(h) {
    return f(h) === u;
  }, pt.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === d || h === u || h === g || typeof h == "object" && h !== null && (h.$$typeof === w || h.$$typeof === m || h.$$typeof === a || h.$$typeof === s || h.$$typeof === c || h.$$typeof === b || h.getModuleId !== void 0);
  }, pt.typeOf = f, pt;
}
var wt = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oa;
function Zd() {
  return Oa || (Oa = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), b = !1, f = !1, h = !1, k = !1, P = !1, C;
    C = Symbol.for("react.module.reference");
    function E(j) {
      return !!(typeof j == "string" || typeof j == "function" || j === n || j === o || P || j === r || j === d || j === u || k || j === g || b || f || h || typeof j == "object" && j !== null && (j.$$typeof === w || j.$$typeof === m || j.$$typeof === a || j.$$typeof === s || j.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      j.$$typeof === C || j.getModuleId !== void 0));
    }
    function v(j) {
      if (typeof j == "object" && j !== null) {
        var xt = j.$$typeof;
        switch (xt) {
          case t:
            var Ct = j.type;
            switch (Ct) {
              case n:
              case o:
              case r:
              case d:
              case u:
                return Ct;
              default:
                var re = Ct && Ct.$$typeof;
                switch (re) {
                  case l:
                  case s:
                  case c:
                  case w:
                  case m:
                  case a:
                    return re;
                  default:
                    return xt;
                }
            }
          case e:
            return xt;
        }
      }
    }
    var $ = s, z = a, H = t, O = c, I = n, T = w, D = m, M = e, Q = o, q = r, U = d, tt = u, ot = !1, at = !1;
    function x(j) {
      return ot || (ot = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R(j) {
      return at || (at = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function L(j) {
      return v(j) === s;
    }
    function F(j) {
      return v(j) === a;
    }
    function V(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function Y(j) {
      return v(j) === c;
    }
    function X(j) {
      return v(j) === n;
    }
    function W(j) {
      return v(j) === w;
    }
    function G(j) {
      return v(j) === m;
    }
    function J(j) {
      return v(j) === e;
    }
    function Z(j) {
      return v(j) === o;
    }
    function lt(j) {
      return v(j) === r;
    }
    function _(j) {
      return v(j) === d;
    }
    function Et(j) {
      return v(j) === u;
    }
    wt.ContextConsumer = $, wt.ContextProvider = z, wt.Element = H, wt.ForwardRef = O, wt.Fragment = I, wt.Lazy = T, wt.Memo = D, wt.Portal = M, wt.Profiler = Q, wt.StrictMode = q, wt.Suspense = U, wt.SuspenseList = tt, wt.isAsyncMode = x, wt.isConcurrentMode = R, wt.isContextConsumer = L, wt.isContextProvider = F, wt.isElement = V, wt.isForwardRef = Y, wt.isFragment = X, wt.isLazy = W, wt.isMemo = G, wt.isPortal = J, wt.isProfiler = Z, wt.isStrictMode = lt, wt.isSuspense = _, wt.isSuspenseList = Et, wt.isValidElementType = E, wt.typeOf = v;
  }()), wt;
}
process.env.NODE_ENV === "production" ? eo.exports = Jd() : eo.exports = Zd();
var Ra = eo.exports;
const Qd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function tu(t) {
  const e = `${t}`.match(Qd);
  return e && e[1] || "";
}
function is(t, e = "") {
  return t.displayName || t.name || tu(t) || e;
}
function _a(t, e, n) {
  const r = is(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function eu(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return is(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case Ra.ForwardRef:
          return _a(t, t.render, "ForwardRef");
        case Ra.Memo:
          return _a(t, t.type, "memo");
        default:
          return;
      }
  }
}
function Nn(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], s = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const nu = p.oneOfType([p.func, p.object]), ss = nu;
function ee(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ge(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function ru(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function ou(t, e = 166) {
  let n;
  function r(...o) {
    const a = () => {
      t.apply(this, o);
    };
    clearTimeout(n), n = setTimeout(a, e);
  }
  return r.clear = () => {
    clearTimeout(n);
  }, r;
}
function au(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function iu(t, e) {
  var n, r;
  return /* @__PURE__ */ B.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function er(t) {
  return t && t.ownerDocument || document;
}
function su(t) {
  return er(t).defaultView || window;
}
function lu(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? A({}, e.propTypes) : null;
  return (o) => (a, s, l, c, d, ...u) => {
    const m = d || s, w = n == null ? void 0 : n[m];
    if (w) {
      const g = w(a, s, l, c, d, ...u);
      if (g)
        return g;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${m}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function nr(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const cu = typeof window < "u" ? B.useLayoutEffect : B.useEffect, He = cu;
let Pa = 0;
function du(t) {
  const [e, n] = B.useState(t), r = t || e;
  return B.useEffect(() => {
    e == null && (Pa += 1, n(`mui-${Pa}`));
  }, [e]), r;
}
const $a = B["useId".toString()];
function ls(t) {
  if ($a !== void 0) {
    const e = $a();
    return t ?? e;
  }
  return du(t);
}
function uu(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function cs({
  controlled: t,
  default: e,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = B.useRef(t !== void 0), [a, s] = B.useState(e), l = o ? t : a;
  if (process.env.NODE_ENV !== "production") {
    B.useEffect(() => {
      o !== (t !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, t]);
    const {
      current: d
    } = B.useRef(e);
    B.useEffect(() => {
      !o && d !== e && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(e)]);
  }
  const c = B.useCallback((d) => {
    o || s(d);
  }, []);
  return [l, c];
}
function no(t) {
  const e = B.useRef(t);
  return He(() => {
    e.current = t;
  }), B.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function Oe(...t) {
  return B.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      nr(n, e);
    });
  }, t);
}
const Ia = {};
function pu(t, e) {
  const n = B.useRef(Ia);
  return n.current === Ia && (n.current = t(e)), n;
}
const wu = [];
function fu(t) {
  B.useEffect(t, wu);
}
class Mn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Mn();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(e, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, e);
  }
}
function pn() {
  const t = pu(Mn.create).current;
  return fu(t.disposeEffect), t;
}
let pr = !0, ro = !1;
const mu = new Mn(), hu = {
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
function gu(t) {
  const {
    type: e,
    tagName: n
  } = t;
  return !!(n === "INPUT" && hu[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function bu(t) {
  t.metaKey || t.altKey || t.ctrlKey || (pr = !0);
}
function Fr() {
  pr = !1;
}
function vu() {
  this.visibilityState === "hidden" && ro && (pr = !0);
}
function yu(t) {
  t.addEventListener("keydown", bu, !0), t.addEventListener("mousedown", Fr, !0), t.addEventListener("pointerdown", Fr, !0), t.addEventListener("touchstart", Fr, !0), t.addEventListener("visibilitychange", vu, !0);
}
function xu(t) {
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return pr || gu(e);
}
function ds() {
  const t = B.useCallback((o) => {
    o != null && yu(o.ownerDocument);
  }, []), e = B.useRef(!1);
  function n() {
    return e.current ? (ro = !0, mu.start(100, () => {
      ro = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return xu(o) ? (e.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
function us(t, e) {
  const n = A({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = A({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = A({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = us(o[s], a[s]);
      }));
    } else
      n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
function Po(t, e, n = void 0) {
  const r = {};
  return Object.keys(t).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = t[o].reduce((a, s) => {
        if (s) {
          const l = e(s);
          l !== "" && a.push(l), n && n[s] && a.push(n[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const Aa = (t) => t, Nu = () => {
  let t = Aa;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = Aa;
    }
  };
}, ku = Nu(), ps = ku, ws = {
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
function wr(t, e, n = "Mui") {
  const r = ws[e];
  return r ? `${n}-${r}` : `${ps.generate(t)}-${e}`;
}
function fs(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = wr(t, o, n);
  }), r;
}
function Eu(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, n));
}
function Ot(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
const Tu = ["values", "unit", "step"], Su = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => A({}, n, {
    [r.key]: r.val
  }), {});
};
function Cu(t) {
  const {
    // The breakpoint **start** at this value.
    // For instance with the first breakpoint xs: [xs, sm).
    values: e = {
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
  } = t, o = Ot(t, Tu), a = Su(e), s = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function d(w, g) {
    const b = s.indexOf(g);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(b !== -1 && typeof e[s[b]] == "number" ? e[s[b]] : g) - r / 100}${n})`;
  }
  function u(w) {
    return s.indexOf(w) + 1 < s.length ? d(w, s[s.indexOf(w) + 1]) : l(w);
  }
  function m(w) {
    const g = s.indexOf(w);
    return g === 0 ? l(s[1]) : g === s.length - 1 ? c(s[g]) : d(w, s[s.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return A({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: d,
    only: u,
    not: m,
    unit: n
  }, o);
}
const Ou = {
  borderRadius: 4
}, Ru = Ou, _u = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.string, p.object, p.array]) : {}, fe = _u;
function gn(t, e) {
  return e ? ie(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
const $o = {
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
}, Ma = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${$o[t]}px)`
};
function se(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const a = r.breakpoints || Ma;
    return e.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(e[c]), s), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ma;
    return Object.keys(e).reduce((s, l) => {
      if (Object.keys(a.values || $o).indexOf(l) !== -1) {
        const c = a.up(l);
        s[c] = n(e[l], l);
      } else {
        const c = l;
        s[c] = e[c];
      }
      return s;
    }, {});
  }
  return n(e);
}
function Pu(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function $u(t, e) {
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
function fr(t, e, n = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
function rr(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = fr(t, n) || r, e && (o = e(o, r, t)), o;
}
function kt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (s) => {
    if (s[e] == null)
      return null;
    const l = s[e], c = s.theme, d = fr(c, r) || {};
    return se(s, l, (m) => {
      let w = rr(d, o, m);
      return m === w && typeof m == "string" && (w = rr(d, o, `${e}${m === "default" ? "" : ee(m)}`, m)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: fe
  } : {}, a.filterProps = [e], a;
}
function Iu(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const Au = {
  m: "margin",
  p: "padding"
}, Mu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Da = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Du = Iu((t) => {
  if (t.length > 2)
    if (Da[t])
      t = Da[t];
    else
      return [t];
  const [e, n] = t.split(""), r = Au[e], o = Mu[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), mr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], hr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Bu = [...mr, ...hr];
function Dn(t, e, n, r) {
  var o;
  const a = (o = fr(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ms(t) {
  return Dn(t, "spacing", 8, "spacing");
}
function Bn(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function ju(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = Bn(e, n), r), {});
}
function Vu(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = Du(n), a = ju(o, r), s = t[n];
  return se(t, s, a);
}
function hs(t, e) {
  const n = ms(t.theme);
  return Object.keys(t).map((r) => Vu(t, e, r, n)).reduce(gn, {});
}
function bt(t) {
  return hs(t, mr);
}
bt.propTypes = process.env.NODE_ENV !== "production" ? mr.reduce((t, e) => (t[e] = fe, t), {}) : {};
bt.filterProps = mr;
function vt(t) {
  return hs(t, hr);
}
vt.propTypes = process.env.NODE_ENV !== "production" ? hr.reduce((t, e) => (t[e] = fe, t), {}) : {};
vt.filterProps = hr;
process.env.NODE_ENV !== "production" && Bu.reduce((t, e) => (t[e] = fe, t), {});
function zu(t = 8) {
  if (t.mui)
    return t;
  const e = ms({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = e(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function gr(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? gn(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Gt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Wt(t, e) {
  return kt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const Lu = Wt("border", Gt), Fu = Wt("borderTop", Gt), Uu = Wt("borderRight", Gt), Gu = Wt("borderBottom", Gt), Hu = Wt("borderLeft", Gt), Xu = Wt("borderColor"), Yu = Wt("borderTopColor"), Wu = Wt("borderRightColor"), qu = Wt("borderBottomColor"), Ku = Wt("borderLeftColor"), Ju = Wt("outline", Gt), Zu = Wt("outlineColor"), br = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Dn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Bn(e, r)
    });
    return se(t, t.borderRadius, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: fe
} : {};
br.filterProps = ["borderRadius"];
gr(Lu, Fu, Uu, Gu, Hu, Xu, Yu, Wu, qu, Ku, br, Ju, Zu);
const vr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Dn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Bn(e, r)
    });
    return se(t, t.gap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: fe
} : {};
vr.filterProps = ["gap"];
const yr = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Dn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Bn(e, r)
    });
    return se(t, t.columnGap, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: fe
} : {};
yr.filterProps = ["columnGap"];
const xr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Dn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Bn(e, r)
    });
    return se(t, t.rowGap, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: fe
} : {};
xr.filterProps = ["rowGap"];
const Qu = kt({
  prop: "gridColumn"
}), tp = kt({
  prop: "gridRow"
}), ep = kt({
  prop: "gridAutoFlow"
}), np = kt({
  prop: "gridAutoColumns"
}), rp = kt({
  prop: "gridAutoRows"
}), op = kt({
  prop: "gridTemplateColumns"
}), ap = kt({
  prop: "gridTemplateRows"
}), ip = kt({
  prop: "gridTemplateAreas"
}), sp = kt({
  prop: "gridArea"
});
gr(vr, yr, xr, Qu, tp, ep, np, rp, op, ap, ip, sp);
function Le(t, e) {
  return e === "grey" ? e : t;
}
const lp = kt({
  prop: "color",
  themeKey: "palette",
  transform: Le
}), cp = kt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Le
}), dp = kt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Le
});
gr(lp, cp, dp);
function zt(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const up = kt({
  prop: "width",
  transform: zt
}), Io = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || $o[n];
      return a ? ((o = t.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: zt(n)
      };
    };
    return se(t, t.maxWidth, e);
  }
  return null;
};
Io.filterProps = ["maxWidth"];
const pp = kt({
  prop: "minWidth",
  transform: zt
}), wp = kt({
  prop: "height",
  transform: zt
}), fp = kt({
  prop: "maxHeight",
  transform: zt
}), mp = kt({
  prop: "minHeight",
  transform: zt
});
kt({
  prop: "size",
  cssProperty: "width",
  transform: zt
});
kt({
  prop: "size",
  cssProperty: "height",
  transform: zt
});
const hp = kt({
  prop: "boxSizing"
});
gr(up, Io, pp, wp, fp, mp, hp);
const gp = {
  // borders
  border: {
    themeKey: "borders",
    transform: Gt
  },
  borderTop: {
    themeKey: "borders",
    transform: Gt
  },
  borderRight: {
    themeKey: "borders",
    transform: Gt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Gt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Gt
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
    transform: Gt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: br
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Le
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Le
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Le
  },
  // spacing
  p: {
    style: vt
  },
  pt: {
    style: vt
  },
  pr: {
    style: vt
  },
  pb: {
    style: vt
  },
  pl: {
    style: vt
  },
  px: {
    style: vt
  },
  py: {
    style: vt
  },
  padding: {
    style: vt
  },
  paddingTop: {
    style: vt
  },
  paddingRight: {
    style: vt
  },
  paddingBottom: {
    style: vt
  },
  paddingLeft: {
    style: vt
  },
  paddingX: {
    style: vt
  },
  paddingY: {
    style: vt
  },
  paddingInline: {
    style: vt
  },
  paddingInlineStart: {
    style: vt
  },
  paddingInlineEnd: {
    style: vt
  },
  paddingBlock: {
    style: vt
  },
  paddingBlockStart: {
    style: vt
  },
  paddingBlockEnd: {
    style: vt
  },
  m: {
    style: bt
  },
  mt: {
    style: bt
  },
  mr: {
    style: bt
  },
  mb: {
    style: bt
  },
  ml: {
    style: bt
  },
  mx: {
    style: bt
  },
  my: {
    style: bt
  },
  margin: {
    style: bt
  },
  marginTop: {
    style: bt
  },
  marginRight: {
    style: bt
  },
  marginBottom: {
    style: bt
  },
  marginLeft: {
    style: bt
  },
  marginX: {
    style: bt
  },
  marginY: {
    style: bt
  },
  marginInline: {
    style: bt
  },
  marginInlineStart: {
    style: bt
  },
  marginInlineEnd: {
    style: bt
  },
  marginBlock: {
    style: bt
  },
  marginBlockStart: {
    style: bt
  },
  marginBlockEnd: {
    style: bt
  },
  // display
  displayPrint: {
    cssProperty: !1,
    transform: (t) => ({
      "@media print": {
        display: t
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
    style: vr
  },
  rowGap: {
    style: xr
  },
  columnGap: {
    style: yr
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
    transform: zt
  },
  maxWidth: {
    style: Io
  },
  minWidth: {
    transform: zt
  },
  height: {
    transform: zt
  },
  maxHeight: {
    transform: zt
  },
  minHeight: {
    transform: zt
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
}, Ao = gp;
function bp(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function vp(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function yp() {
  function t(n, r, o, a) {
    const s = {
      [n]: r,
      theme: o
    }, l = a[n];
    if (!l)
      return {
        [n]: r
      };
    const {
      cssProperty: c = n,
      themeKey: d,
      transform: u,
      style: m
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = fr(o, d) || {};
    return m ? m(s) : se(s, r, (b) => {
      let f = rr(w, u, b);
      return b === f && typeof b == "string" && (f = rr(w, u, `${n}${b === "default" ? "" : ee(b)}`, b)), c === !1 ? f : {
        [c]: f
      };
    });
  }
  function e(n) {
    var r;
    const {
      sx: o,
      theme: a = {}
    } = n || {};
    if (!o)
      return null;
    const s = (r = a.unstable_sxConfig) != null ? r : Ao;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const u = Pu(a.breakpoints), m = Object.keys(u);
      let w = u;
      return Object.keys(d).forEach((g) => {
        const b = vp(d[g], a);
        if (b != null)
          if (typeof b == "object")
            if (s[g])
              w = gn(w, t(g, b, a, s));
            else {
              const f = se({
                theme: a
              }, b, (h) => ({
                [g]: h
              }));
              bp(f, b) ? w[g] = e({
                sx: b,
                theme: a
              }) : w = gn(w, f);
            }
          else
            w = gn(w, t(g, b, a, s));
      }), $u(m, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const gs = yp();
gs.filterProps = ["sx"];
const Mo = gs;
function xp(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const Np = ["breakpoints", "palette", "spacing", "shape"];
function Do(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, s = Ot(t, Np), l = Cu(n), c = zu(o);
  let d = ie({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: A({
      mode: "light"
    }, r),
    spacing: c,
    shape: A({}, Ru, a)
  }, s);
  return d.applyStyles = xp, d = e.reduce((u, m) => ie(u, m), d), d.unstable_sxConfig = A({}, Ao, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(m) {
    return Mo({
      sx: m,
      theme: this
    });
  }, d;
}
function kp(t) {
  return Object.keys(t).length === 0;
}
function bs(t = null) {
  const e = B.useContext(ql);
  return !e || kp(e) ? t : e;
}
const Ep = Do();
function vs(t = Ep) {
  return bs(t);
}
const Tp = ["ownerState"], Sp = ["variants"], Cp = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Op(t) {
  return Object.keys(t).length === 0;
}
function Rp(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function Jn(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const _p = Do(), Ba = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Xn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return Op(e) ? t : e[n] || e;
}
function Pp(t) {
  return t ? (e, n) => n[t] : null;
}
function Zn(t, e) {
  let {
    ownerState: n
  } = e, r = Ot(e, Tp);
  const o = typeof t == "function" ? t(A({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => Zn(a, A({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = Ot(o, Sp);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(A({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(A({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function $p(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = _p,
    rootShouldForwardProp: r = Jn,
    slotShouldForwardProp: o = Jn
  } = t, a = (s) => Mo(A({}, s, {
    theme: Xn(A({}, s, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    Kl(s, (v) => v.filter(($) => !($ != null && $.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: u,
      skipSx: m,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Pp(Ba(d))
    } = l, g = Ot(l, Cp), b = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), f = m || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Ba(d || "Root")}`);
    let k = Jn;
    d === "Root" || d === "root" ? k = r : d ? k = o : Rp(s) && (k = void 0);
    const P = Wl(s, A({
      shouldForwardProp: k,
      label: h
    }, g)), C = (v) => typeof v == "function" && v.__emotion_real !== v || xe(v) ? ($) => Zn(v, A({}, $, {
      theme: Xn({
        theme: $.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : v, E = (v, ...$) => {
      let z = C(v);
      const H = $ ? $.map(C) : [];
      c && w && H.push((T) => {
        const D = Xn(A({}, T, {
          defaultTheme: n,
          themeId: e
        }));
        if (!D.components || !D.components[c] || !D.components[c].styleOverrides)
          return null;
        const M = D.components[c].styleOverrides, Q = {};
        return Object.entries(M).forEach(([q, U]) => {
          Q[q] = Zn(U, A({}, T, {
            theme: D
          }));
        }), w(T, Q);
      }), c && !b && H.push((T) => {
        var D;
        const M = Xn(A({}, T, {
          defaultTheme: n,
          themeId: e
        })), Q = M == null || (D = M.components) == null || (D = D[c]) == null ? void 0 : D.variants;
        return Zn({
          variants: Q
        }, A({}, T, {
          theme: M
        }));
      }), f || H.push(a);
      const O = H.length - $.length;
      if (Array.isArray(v) && O > 0) {
        const T = new Array(O).fill("");
        z = [...v, ...T], z.raw = [...v.raw, ...T];
      }
      const I = P(z, ...H);
      if (process.env.NODE_ENV !== "production") {
        let T;
        c && (T = `${c}${ee(d || "")}`), T === void 0 && (T = `Styled(${eu(s)})`), I.displayName = T;
      }
      return s.muiName && (I.muiName = s.muiName), I;
    };
    return P.withConfig && (E.withConfig = P.withConfig), E;
  };
}
function Ip(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : us(e.components[n].defaultProps, r);
}
function Ap({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = vs(n);
  return r && (o = o[r] || o), Ip({
    theme: o,
    name: e,
    props: t
  });
}
function Bo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Eu(t, e, n);
}
function Mp(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Re(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Re(Mp(t));
  const e = t.indexOf("("), n = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${t}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ge(9, t));
  let r = t.substring(e + 1, t.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ge(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Nr(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function Dp(t) {
  t = Re(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), s = (d, u = (d + n / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), Nr({
    type: l,
    values: c
  });
}
function ja(t) {
  t = Re(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Re(Dp(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function Va(t, e) {
  const n = ja(t), r = ja(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function ys(t, e) {
  return t = Re(t), e = Bo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, Nr(t);
}
function Bp(t, e) {
  if (t = Re(t), e = Bo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return Nr(t);
}
function jp(t, e) {
  if (t = Re(t), e = Bo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return Nr(t);
}
function Vp(t, e) {
  return A({
    toolbar: {
      minHeight: 56,
      [t.up("xs")]: {
        "@media (orientation: landscape)": {
          minHeight: 48
        }
      },
      [t.up("sm")]: {
        minHeight: 64
      }
    }
  }, e);
}
const zp = {
  black: "#000",
  white: "#fff"
}, kn = zp, Lp = {
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
}, Fp = Lp, Up = {
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
}, Ae = Up, Gp = {
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
}, Me = Gp, Hp = {
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
}, ln = Hp, Xp = {
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
}, De = Xp, Yp = {
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
}, Be = Yp, Wp = {
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
}, je = Wp, qp = ["mode", "contrastThreshold", "tonalOffset"], za = {
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
    paper: kn.white,
    default: kn.white
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
    primary: kn.white,
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
    active: kn.white,
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
function La(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = jp(t.main, o) : e === "dark" && (t.dark = Bp(t.main, a)));
}
function Kp(t = "light") {
  return t === "dark" ? {
    main: De[200],
    light: De[50],
    dark: De[400]
  } : {
    main: De[700],
    light: De[400],
    dark: De[800]
  };
}
function Jp(t = "light") {
  return t === "dark" ? {
    main: Ae[200],
    light: Ae[50],
    dark: Ae[400]
  } : {
    main: Ae[500],
    light: Ae[300],
    dark: Ae[700]
  };
}
function Zp(t = "light") {
  return t === "dark" ? {
    main: Me[500],
    light: Me[300],
    dark: Me[700]
  } : {
    main: Me[700],
    light: Me[400],
    dark: Me[800]
  };
}
function Qp(t = "light") {
  return t === "dark" ? {
    main: Be[400],
    light: Be[300],
    dark: Be[700]
  } : {
    main: Be[700],
    light: Be[500],
    dark: Be[900]
  };
}
function tw(t = "light") {
  return t === "dark" ? {
    main: je[400],
    light: je[300],
    dark: je[700]
  } : {
    main: je[800],
    light: je[500],
    dark: je[900]
  };
}
function ew(t = "light") {
  return t === "dark" ? {
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
function nw(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = Ot(t, qp), a = t.primary || Kp(e), s = t.secondary || Jp(e), l = t.error || Zp(e), c = t.info || Qp(e), d = t.success || tw(e), u = t.warning || ew(e);
  function m(f) {
    const h = Va(f, Ur.text.primary) >= n ? Ur.text.primary : za.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const k = Va(f, h);
      k < 3 && console.error([`MUI: The contrast ratio of ${k}:1 for ${h} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const w = ({
    color: f,
    name: h,
    mainShade: k = 500,
    lightShade: P = 300,
    darkShade: C = 700
  }) => {
    if (f = A({}, f), !f.main && f[k] && (f.main = f[k]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${k}\` property.` : Ge(11, h ? ` (${h})` : "", k));
    if (typeof f.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ge(12, h ? ` (${h})` : "", JSON.stringify(f.main)));
    return La(f, "light", P, r), La(f, "dark", C, r), f.contrastText || (f.contrastText = m(f.main)), f;
  }, g = {
    dark: Ur,
    light: za
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), ie(A({
    // A collection of common colors.
    common: A({}, kn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: e,
    // The colors used to represent primary interface elements for a user.
    primary: w({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: w({
      color: s,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: w({
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: w({
      color: u,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: w({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: w({
      color: d,
      name: "success"
    }),
    // The grey colors.
    grey: Fp,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: m,
    // Generate a rich color object.
    augmentColor: w,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, g[e]), o);
}
const rw = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ow(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Fa = {
  textTransform: "uppercase"
}, Ua = '"Roboto", "Helvetica", "Arial", sans-serif';
function aw(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = Ua,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: s = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: u,
    pxToRem: m
  } = n, w = Ot(n, rw);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, b = m || ((k) => `${k / d * g}rem`), f = (k, P, C, E, v) => A({
    fontFamily: r,
    fontWeight: k,
    fontSize: b(P),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
  }, r === Ua ? {
    letterSpacing: `${ow(E / P)}em`
  } : {}, v, u), h = {
    h1: f(a, 96, 1.167, -1.5),
    h2: f(a, 60, 1.2, -0.5),
    h3: f(s, 48, 1.167, 0),
    h4: f(s, 34, 1.235, 0.25),
    h5: f(s, 24, 1.334, 0),
    h6: f(l, 20, 1.6, 0.15),
    subtitle1: f(s, 16, 1.75, 0.15),
    subtitle2: f(l, 14, 1.57, 0.1),
    body1: f(s, 16, 1.5, 0.15),
    body2: f(s, 14, 1.43, 0.15),
    button: f(l, 14, 1.75, 0.4, Fa),
    caption: f(s, 12, 1.66, 0.4),
    overline: f(s, 12, 2.66, 1, Fa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ie(A({
    htmlFontSize: d,
    pxToRem: b,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), w, {
    clone: !1
    // No need to clone deep
  });
}
const iw = 0.2, sw = 0.14, lw = 0.12;
function gt(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${iw})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${sw})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${lw})`].join(",");
}
const cw = ["none", gt(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), gt(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), gt(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), gt(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), gt(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), gt(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), gt(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), gt(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), gt(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), gt(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), gt(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), gt(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), gt(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), gt(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), gt(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), gt(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), gt(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), gt(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), gt(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), gt(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), gt(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), gt(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), gt(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), gt(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], dw = cw, uw = ["duration", "easing", "delay"], pw = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, ww = {
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
function Ga(t) {
  return `${Math.round(t)}ms`;
}
function fw(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function mw(t) {
  const e = A({}, pw, t.easing), n = A({}, ww, t.duration);
  return A({
    getAutoHeightDuration: fw,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, d = Ot(a, uw);
      if (process.env.NODE_ENV !== "production") {
        const u = (w) => typeof w == "string", m = (w) => !isNaN(parseFloat(w));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !m(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !m(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Ga(s)} ${l} ${typeof c == "string" ? c : Ga(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const hw = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, gw = hw, bw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function vw(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, s = Ot(t, bw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ge(18));
  const l = nw(r), c = Do(t);
  let d = ie(c, {
    mixins: Vp(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: dw.slice(),
    typography: aw(l, a),
    transitions: mw(o),
    zIndex: A({}, gw)
  });
  if (d = ie(d, s), d = e.reduce((u, m) => ie(u, m), d), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (w, g) => {
      let b;
      for (b in w) {
        const f = w[b];
        if (u.indexOf(b) !== -1 && Object.keys(f).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = wr("", b);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${b}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: f
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[b] = {};
        }
      }
    };
    Object.keys(d.components).forEach((w) => {
      const g = d.components[w].styleOverrides;
      g && w.indexOf("Mui") === 0 && m(g, w);
    });
  }
  return d.unstable_sxConfig = A({}, Ao, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(m) {
    return Mo({
      sx: m,
      theme: this
    });
  }, d;
}
const yw = vw(), jo = yw, Vo = "$$material";
function zo({
  props: t,
  name: e
}) {
  return Ap({
    props: t,
    name: e,
    defaultTheme: jo,
    themeId: Vo
  });
}
const xw = (t) => Jn(t) && t !== "classes", Nw = $p({
  themeId: Vo,
  defaultTheme: jo,
  rootShouldForwardProp: xw
}), jn = Nw;
function kw(t) {
  return wr("MuiSvgIcon", t);
}
fs("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Ew = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Tw = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${ee(e)}`, `fontSize${ee(n)}`]
  };
  return Po(o, kw, r);
}, Sw = jn("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${ee(n.color)}`], e[`fontSize${ee(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, s, l, c, d, u, m, w, g, b;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: e.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (n = t.transitions) == null || (r = n.create) == null ? void 0 : r.call(n, "fill", {
      duration: (o = t.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = t.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((l = t.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((d = t.typography) == null || (u = d.pxToRem) == null ? void 0 : u.call(d, 35)) || "2.1875rem"
    }[e.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (m = (w = (t.vars || t).palette) == null || (w = w[e.color]) == null ? void 0 : w.main) != null ? m : {
      action: (g = (t.vars || t).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (b = (t.vars || t).palette) == null || (b = b.action) == null ? void 0 : b.disabled,
      inherit: void 0
    }[e.color]
  };
}), Lo = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const r = zo({
    props: e,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: u = !1,
    titleAccess: m,
    viewBox: w = "0 0 24 24"
  } = r, g = Ot(r, Ew), b = /* @__PURE__ */ B.isValidElement(o) && o.type === "svg", f = A({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: u,
    viewBox: w,
    hasSvgAsChild: b
  }), h = {};
  u || (h.viewBox = w);
  const k = Tw(f);
  return /* @__PURE__ */ y(Sw, A({
    as: l,
    className: ke(k.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": m ? void 0 : !0,
    role: m ? "img" : void 0,
    ref: n
  }, h, g, b && o.props, {
    ownerState: f,
    children: [b ? o.props.children : o, m ? /* @__PURE__ */ i("title", {
      children: m
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
  children: p.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: p.object,
  /**
   * @ignore
   */
  className: p.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: p.oneOfType([p.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), p.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: p.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: p.oneOfType([p.oneOf(["inherit", "large", "medium", "small"]), p.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: p.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: p.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: p.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: p.oneOfType([p.arrayOf(p.oneOfType([p.func, p.object, p.bool])), p.func, p.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: p.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: p.string
});
Lo.muiName = "SvgIcon";
const Ha = Lo;
function xs(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ i(Ha, A({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = Ha.muiName, /* @__PURE__ */ B.memo(/* @__PURE__ */ B.forwardRef(n));
}
const Cw = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ps.configure(t);
  }
}, Ow = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: ee,
  createChainedFunction: ru,
  createSvgIcon: xs,
  debounce: ou,
  deprecatedPropType: au,
  isMuiElement: iu,
  ownerDocument: er,
  ownerWindow: su,
  requirePropFactory: lu,
  setRef: nr,
  unstable_ClassNameGenerator: Cw,
  unstable_useEnhancedEffect: He,
  unstable_useId: ls,
  unsupportedProp: uu,
  useControlled: cs,
  useEventCallback: no,
  useForkRef: Oe,
  useIsFocusVisible: ds
}, Symbol.toStringTag, { value: "Module" })), Rw = /* @__PURE__ */ Bd(Ow);
var Xa;
function _w() {
  return Xa || (Xa = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = Rw;
  }(Mr)), Mr;
}
var Pw = jd;
Object.defineProperty(Oo, "__esModule", {
  value: !0
});
var Ns = Oo.default = void 0, $w = Pw(_w()), Iw = ll;
Ns = Oo.default = (0, $w.default)(/* @__PURE__ */ (0, Iw.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Aw(t) {
  return typeof t == "string";
}
function wn(t, e, n) {
  return t === void 0 || Aw(t) ? e : A({}, e, {
    ownerState: A({}, e.ownerState, n)
  });
}
const Mw = {
  disableDefaultClasses: !1
}, Dw = /* @__PURE__ */ B.createContext(Mw);
function Bw(t) {
  const {
    disableDefaultClasses: e
  } = B.useContext(Dw);
  return (n) => e ? "" : t(n);
}
function jw(t, e = []) {
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
function Vw(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function Ya(t) {
  if (t === void 0)
    return {};
  const e = {};
  return Object.keys(t).filter((n) => !(n.match(/^on[A-Z]/) && typeof t[n] == "function")).forEach((n) => {
    e[n] = t[n];
  }), e;
}
function zw(t) {
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const g = ke(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), b = A({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = A({}, n, o, r);
    return g.length > 0 && (f.className = g), Object.keys(b).length > 0 && (f.style = b), {
      props: f,
      internalRef: void 0
    };
  }
  const s = jw(A({}, o, r)), l = Ya(r), c = Ya(o), d = e(s), u = ke(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = A({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = A({}, d, n, c, l);
  return u.length > 0 && (w.className = u), Object.keys(m).length > 0 && (w.style = m), {
    props: w,
    internalRef: d.ref
  };
}
const Lw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Fw(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, s = Ot(t, Lw), l = a ? {} : Vw(r, o), {
    props: c,
    internalRef: d
  } = zw(A({}, s, {
    externalSlotProps: l
  })), u = Oe(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return wn(n, A({}, c, {
    ref: u
  }), o);
}
const ks = "base";
function Uw(t) {
  return `${ks}--${t}`;
}
function Gw(t, e) {
  return `${ks}-${t}-${e}`;
}
function Es(t, e) {
  const n = ws[e];
  return n ? Uw(n) : Gw(t, e);
}
function Hw(t, e) {
  const n = {};
  return e.forEach((r) => {
    n[r] = Es(t, r);
  }), n;
}
function Xw(t) {
  return typeof t == "function" ? t() : t;
}
const or = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [s, l] = B.useState(null), c = Oe(/* @__PURE__ */ B.isValidElement(r) ? r.ref : null, n);
  if (He(() => {
    a || l(Xw(o) || document.body);
  }, [o, a]), He(() => {
    if (s && !a)
      return nr(n, s), () => {
        nr(n, null);
      };
  }, [n, s, a]), a) {
    if (/* @__PURE__ */ B.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ B.cloneElement(r, d);
    }
    return /* @__PURE__ */ i(B.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ i(B.Fragment, {
    children: s && /* @__PURE__ */ oc.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (or.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: p.node,
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
  container: p.oneOfType([Nn, p.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool
});
process.env.NODE_ENV !== "production" && (or["propTypes"] = Kd(or.propTypes));
var It = "top", Xt = "bottom", Yt = "right", At = "left", Fo = "auto", Vn = [It, Xt, Yt, At], Xe = "start", En = "end", Yw = "clippingParents", Ts = "viewport", cn = "popper", Ww = "reference", Wa = /* @__PURE__ */ Vn.reduce(function(t, e) {
  return t.concat([e + "-" + Xe, e + "-" + En]);
}, []), Ss = /* @__PURE__ */ [].concat(Vn, [Fo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Xe, e + "-" + En]);
}, []), qw = "beforeRead", Kw = "read", Jw = "afterRead", Zw = "beforeMain", Qw = "main", tf = "afterMain", ef = "beforeWrite", nf = "write", rf = "afterWrite", of = [qw, Kw, Jw, Zw, Qw, tf, ef, nf, rf];
function ne(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Lt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function _e(t) {
  var e = Lt(t).Element;
  return t instanceof e || t instanceof Element;
}
function Ht(t) {
  var e = Lt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Uo(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Lt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function af(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !Ht(a) || !ne(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function sf(t) {
  var e = t.state, n = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, n.popper), e.styles = n, e.elements.arrow && Object.assign(e.elements.arrow.style, n.arrow), function() {
    Object.keys(e.elements).forEach(function(r) {
      var o = e.elements[r], a = e.attributes[r] || {}, s = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), l = s.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Ht(o) || !ne(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const lf = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: af,
  effect: sf,
  requires: ["computeStyles"]
};
function Zt(t) {
  return t.split("-")[0];
}
var Ee = Math.max, ar = Math.min, Ye = Math.round;
function oo() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Cs() {
  return !/^((?!chrome|android).)*safari/i.test(oo());
}
function We(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && Ht(t) && (o = t.offsetWidth > 0 && Ye(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Ye(r.height) / t.offsetHeight || 1);
  var s = _e(t) ? Lt(t) : window, l = s.visualViewport, c = !Cs() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / a, m = r.width / o, w = r.height / a;
  return {
    width: m,
    height: w,
    top: u,
    right: d + m,
    bottom: u + w,
    left: d,
    x: d,
    y: u
  };
}
function Go(t) {
  var e = We(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function Os(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Uo(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function le(t) {
  return Lt(t).getComputedStyle(t);
}
function cf(t) {
  return ["table", "td", "th"].indexOf(ne(t)) >= 0;
}
function me(t) {
  return ((_e(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function kr(t) {
  return ne(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Uo(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    me(t)
  );
}
function qa(t) {
  return !Ht(t) || // https://github.com/popperjs/popper-core/issues/837
  le(t).position === "fixed" ? null : t.offsetParent;
}
function df(t) {
  var e = /firefox/i.test(oo()), n = /Trident/i.test(oo());
  if (n && Ht(t)) {
    var r = le(t);
    if (r.position === "fixed")
      return null;
  }
  var o = kr(t);
  for (Uo(o) && (o = o.host); Ht(o) && ["html", "body"].indexOf(ne(o)) < 0; ) {
    var a = le(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function zn(t) {
  for (var e = Lt(t), n = qa(t); n && cf(n) && le(n).position === "static"; )
    n = qa(n);
  return n && (ne(n) === "html" || ne(n) === "body" && le(n).position === "static") ? e : n || df(t) || e;
}
function Ho(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function bn(t, e, n) {
  return Ee(t, ar(e, n));
}
function uf(t, e, n) {
  var r = bn(t, e, n);
  return r > n ? n : r;
}
function Rs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function _s(t) {
  return Object.assign({}, Rs(), t);
}
function Ps(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var pf = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, _s(typeof e != "number" ? e : Ps(e, Vn));
};
function wf(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = Zt(n.placement), c = Ho(l), d = [At, Yt].indexOf(l) >= 0, u = d ? "height" : "width";
  if (!(!a || !s)) {
    var m = pf(o.padding, n), w = Go(a), g = c === "y" ? It : At, b = c === "y" ? Xt : Yt, f = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], h = s[c] - n.rects.reference[c], k = zn(a), P = k ? c === "y" ? k.clientHeight || 0 : k.clientWidth || 0 : 0, C = f / 2 - h / 2, E = m[g], v = P - w[u] - m[b], $ = P / 2 - w[u] / 2 + C, z = bn(E, $, v), H = c;
    n.modifiersData[r] = (e = {}, e[H] = z, e.centerOffset = z - $, e);
  }
}
function ff(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Os(e.elements.popper, o) && (e.elements.arrow = o));
}
const mf = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: wf,
  effect: ff,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function qe(t) {
  return t.split("-")[1];
}
var hf = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function gf(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Ye(n * o) / o || 0,
    y: Ye(r * o) / o || 0
  };
}
function Ka(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, s = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, u = t.roundOffsets, m = t.isFixed, w = s.x, g = w === void 0 ? 0 : w, b = s.y, f = b === void 0 ? 0 : b, h = typeof u == "function" ? u({
    x: g,
    y: f
  }) : {
    x: g,
    y: f
  };
  g = h.x, f = h.y;
  var k = s.hasOwnProperty("x"), P = s.hasOwnProperty("y"), C = At, E = It, v = window;
  if (d) {
    var $ = zn(n), z = "clientHeight", H = "clientWidth";
    if ($ === Lt(n) && ($ = me(n), le($).position !== "static" && l === "absolute" && (z = "scrollHeight", H = "scrollWidth")), $ = $, o === It || (o === At || o === Yt) && a === En) {
      E = Xt;
      var O = m && $ === v && v.visualViewport ? v.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        $[z]
      );
      f -= O - r.height, f *= c ? 1 : -1;
    }
    if (o === At || (o === It || o === Xt) && a === En) {
      C = Yt;
      var I = m && $ === v && v.visualViewport ? v.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        $[H]
      );
      g -= I - r.width, g *= c ? 1 : -1;
    }
  }
  var T = Object.assign({
    position: l
  }, d && hf), D = u === !0 ? gf({
    x: g,
    y: f
  }, Lt(n)) : {
    x: g,
    y: f
  };
  if (g = D.x, f = D.y, c) {
    var M;
    return Object.assign({}, T, (M = {}, M[E] = P ? "0" : "", M[C] = k ? "0" : "", M.transform = (v.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + f + "px)" : "translate3d(" + g + "px, " + f + "px, 0)", M));
  }
  return Object.assign({}, T, (e = {}, e[E] = P ? f + "px" : "", e[C] = k ? g + "px" : "", e.transform = "", e));
}
function bf(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Zt(e.placement),
    variation: qe(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Ka(Object.assign({}, d, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Ka(Object.assign({}, d, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const vf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: bf,
  data: {}
};
var Yn = {
  passive: !0
};
function yf(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Lt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(u) {
    u.addEventListener("scroll", n.update, Yn);
  }), l && c.addEventListener("resize", n.update, Yn), function() {
    a && d.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Yn);
    }), l && c.removeEventListener("resize", n.update, Yn);
  };
}
const xf = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: yf,
  data: {}
};
var Nf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Qn(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Nf[e];
  });
}
var kf = {
  start: "end",
  end: "start"
};
function Ja(t) {
  return t.replace(/start|end/g, function(e) {
    return kf[e];
  });
}
function Xo(t) {
  var e = Lt(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Yo(t) {
  return We(me(t)).left + Xo(t).scrollLeft;
}
function Ef(t, e) {
  var n = Lt(t), r = me(t), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = Cs();
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + Yo(t),
    y: c
  };
}
function Tf(t) {
  var e, n = me(t), r = Xo(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = Ee(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = Ee(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Yo(t), c = -r.scrollTop;
  return le(o || n).direction === "rtl" && (l += Ee(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function Wo(t) {
  var e = le(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function $s(t) {
  return ["html", "body", "#document"].indexOf(ne(t)) >= 0 ? t.ownerDocument.body : Ht(t) && Wo(t) ? t : $s(kr(t));
}
function vn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = $s(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Lt(r), s = o ? [a].concat(a.visualViewport || [], Wo(r) ? r : []) : r, l = e.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(vn(kr(s)))
  );
}
function ao(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Sf(t, e) {
  var n = We(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Za(t, e, n) {
  return e === Ts ? ao(Ef(t, n)) : _e(e) ? Sf(e, n) : ao(Tf(me(t)));
}
function Cf(t) {
  var e = vn(kr(t)), n = ["absolute", "fixed"].indexOf(le(t).position) >= 0, r = n && Ht(t) ? zn(t) : t;
  return _e(r) ? e.filter(function(o) {
    return _e(o) && Os(o, r) && ne(o) !== "body";
  }) : [];
}
function Of(t, e, n, r) {
  var o = e === "clippingParents" ? Cf(t) : [].concat(e), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var u = Za(t, d, r);
    return c.top = Ee(u.top, c.top), c.right = ar(u.right, c.right), c.bottom = ar(u.bottom, c.bottom), c.left = Ee(u.left, c.left), c;
  }, Za(t, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Is(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Zt(r) : null, a = r ? qe(r) : null, s = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case It:
      c = {
        x: s,
        y: e.y - n.height
      };
      break;
    case Xt:
      c = {
        x: s,
        y: e.y + e.height
      };
      break;
    case Yt:
      c = {
        x: e.x + e.width,
        y: l
      };
      break;
    case At:
      c = {
        x: e.x - n.width,
        y: l
      };
      break;
    default:
      c = {
        x: e.x,
        y: e.y
      };
  }
  var d = o ? Ho(o) : null;
  if (d != null) {
    var u = d === "y" ? "height" : "width";
    switch (a) {
      case Xe:
        c[d] = c[d] - (e[u] / 2 - n[u] / 2);
        break;
      case En:
        c[d] = c[d] + (e[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function Tn(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, s = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Yw : l, d = n.rootBoundary, u = d === void 0 ? Ts : d, m = n.elementContext, w = m === void 0 ? cn : m, g = n.altBoundary, b = g === void 0 ? !1 : g, f = n.padding, h = f === void 0 ? 0 : f, k = _s(typeof h != "number" ? h : Ps(h, Vn)), P = w === cn ? Ww : cn, C = t.rects.popper, E = t.elements[b ? P : w], v = Of(_e(E) ? E : E.contextElement || me(t.elements.popper), c, u, s), $ = We(t.elements.reference), z = Is({
    reference: $,
    element: C,
    strategy: "absolute",
    placement: o
  }), H = ao(Object.assign({}, C, z)), O = w === cn ? H : $, I = {
    top: v.top - O.top + k.top,
    bottom: O.bottom - v.bottom + k.bottom,
    left: v.left - O.left + k.left,
    right: O.right - v.right + k.right
  }, T = t.modifiersData.offset;
  if (w === cn && T) {
    var D = T[o];
    Object.keys(I).forEach(function(M) {
      var Q = [Yt, Xt].indexOf(M) >= 0 ? 1 : -1, q = [It, Xt].indexOf(M) >= 0 ? "y" : "x";
      I[M] += D[q] * Q;
    });
  }
  return I;
}
function Rf(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? Ss : c, u = qe(r), m = u ? l ? Wa : Wa.filter(function(b) {
    return qe(b) === u;
  }) : Vn, w = m.filter(function(b) {
    return d.indexOf(b) >= 0;
  });
  w.length === 0 && (w = m);
  var g = w.reduce(function(b, f) {
    return b[f] = Tn(t, {
      placement: f,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[Zt(f)], b;
  }, {});
  return Object.keys(g).sort(function(b, f) {
    return g[b] - g[f];
  });
}
function _f(t) {
  if (Zt(t) === Fo)
    return [];
  var e = Qn(t);
  return [Ja(t), e, Ja(e)];
}
function Pf(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, u = n.boundary, m = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, b = g === void 0 ? !0 : g, f = n.allowedAutoPlacements, h = e.options.placement, k = Zt(h), P = k === h, C = c || (P || !b ? [Qn(h)] : _f(h)), E = [h].concat(C).reduce(function(V, Y) {
      return V.concat(Zt(Y) === Fo ? Rf(e, {
        placement: Y,
        boundary: u,
        rootBoundary: m,
        padding: d,
        flipVariations: b,
        allowedAutoPlacements: f
      }) : Y);
    }, []), v = e.rects.reference, $ = e.rects.popper, z = /* @__PURE__ */ new Map(), H = !0, O = E[0], I = 0; I < E.length; I++) {
      var T = E[I], D = Zt(T), M = qe(T) === Xe, Q = [It, Xt].indexOf(D) >= 0, q = Q ? "width" : "height", U = Tn(e, {
        placement: T,
        boundary: u,
        rootBoundary: m,
        altBoundary: w,
        padding: d
      }), tt = Q ? M ? Yt : At : M ? Xt : It;
      v[q] > $[q] && (tt = Qn(tt));
      var ot = Qn(tt), at = [];
      if (a && at.push(U[D] <= 0), l && at.push(U[tt] <= 0, U[ot] <= 0), at.every(function(V) {
        return V;
      })) {
        O = T, H = !1;
        break;
      }
      z.set(T, at);
    }
    if (H)
      for (var x = b ? 3 : 1, R = function(Y) {
        var X = E.find(function(W) {
          var G = z.get(W);
          if (G)
            return G.slice(0, Y).every(function(J) {
              return J;
            });
        });
        if (X)
          return O = X, "break";
      }, L = x; L > 0; L--) {
        var F = R(L);
        if (F === "break")
          break;
      }
    e.placement !== O && (e.modifiersData[r]._skip = !0, e.placement = O, e.reset = !0);
  }
}
const $f = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Pf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Qa(t, e, n) {
  return n === void 0 && (n = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - n.y,
    right: t.right - e.width + n.x,
    bottom: t.bottom - e.height + n.y,
    left: t.left - e.width - n.x
  };
}
function ti(t) {
  return [It, Yt, Xt, At].some(function(e) {
    return t[e] >= 0;
  });
}
function If(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, s = Tn(e, {
    elementContext: "reference"
  }), l = Tn(e, {
    altBoundary: !0
  }), c = Qa(s, r), d = Qa(l, o, a), u = ti(c), m = ti(d);
  e.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: m
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": m
  });
}
const Af = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: If
};
function Mf(t, e, n) {
  var r = Zt(t), o = [At, It].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [At, Yt].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function Df(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = Ss.reduce(function(u, m) {
    return u[m] = Mf(m, e.rects, a), u;
  }, {}), l = s[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = s;
}
const Bf = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Df
};
function jf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Is({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Vf = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: jf,
  data: {}
};
function zf(t) {
  return t === "x" ? "y" : "x";
}
function Lf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, u = n.altBoundary, m = n.padding, w = n.tether, g = w === void 0 ? !0 : w, b = n.tetherOffset, f = b === void 0 ? 0 : b, h = Tn(e, {
    boundary: c,
    rootBoundary: d,
    padding: m,
    altBoundary: u
  }), k = Zt(e.placement), P = qe(e.placement), C = !P, E = Ho(k), v = zf(E), $ = e.modifiersData.popperOffsets, z = e.rects.reference, H = e.rects.popper, O = typeof f == "function" ? f(Object.assign({}, e.rects, {
    placement: e.placement
  })) : f, I = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), T = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, D = {
    x: 0,
    y: 0
  };
  if ($) {
    if (a) {
      var M, Q = E === "y" ? It : At, q = E === "y" ? Xt : Yt, U = E === "y" ? "height" : "width", tt = $[E], ot = tt + h[Q], at = tt - h[q], x = g ? -H[U] / 2 : 0, R = P === Xe ? z[U] : H[U], L = P === Xe ? -H[U] : -z[U], F = e.elements.arrow, V = g && F ? Go(F) : {
        width: 0,
        height: 0
      }, Y = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Rs(), X = Y[Q], W = Y[q], G = bn(0, z[U], V[U]), J = C ? z[U] / 2 - x - G - X - I.mainAxis : R - G - X - I.mainAxis, Z = C ? -z[U] / 2 + x + G + W + I.mainAxis : L + G + W + I.mainAxis, lt = e.elements.arrow && zn(e.elements.arrow), _ = lt ? E === "y" ? lt.clientTop || 0 : lt.clientLeft || 0 : 0, Et = (M = T == null ? void 0 : T[E]) != null ? M : 0, j = tt + J - Et - _, xt = tt + Z - Et, Ct = bn(g ? ar(ot, j) : ot, tt, g ? Ee(at, xt) : at);
      $[E] = Ct, D[E] = Ct - tt;
    }
    if (l) {
      var re, Rt = E === "x" ? It : At, K = E === "x" ? Xt : Yt, nt = $[v], Nt = v === "y" ? "height" : "width", Pt = nt + h[Rt], qt = nt - h[K], $e = [It, At].indexOf(k) !== -1, Ie = (re = T == null ? void 0 : T[v]) != null ? re : 0, he = $e ? Pt : nt - z[Nt] - H[Nt] - Ie + I.altAxis, tn = $e ? nt + z[Nt] + H[Nt] - Ie - I.altAxis : qt, Ln = g && $e ? uf(he, nt, tn) : bn(g ? he : Pt, nt, g ? tn : qt);
      $[v] = Ln, D[v] = Ln - nt;
    }
    e.modifiersData[r] = D;
  }
}
const Ff = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Lf,
  requiresIfExists: ["offset"]
};
function Uf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Gf(t) {
  return t === Lt(t) || !Ht(t) ? Xo(t) : Uf(t);
}
function Hf(t) {
  var e = t.getBoundingClientRect(), n = Ye(e.width) / t.offsetWidth || 1, r = Ye(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Xf(t, e, n) {
  n === void 0 && (n = !1);
  var r = Ht(e), o = Ht(e) && Hf(e), a = me(e), s = We(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((ne(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Wo(a)) && (l = Gf(e)), Ht(e) ? (c = We(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Yo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Yf(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(l) {
      if (!n.has(l)) {
        var c = e.get(l);
        c && o(c);
      }
    }), r.push(a);
  }
  return t.forEach(function(a) {
    n.has(a.name) || o(a);
  }), r;
}
function Wf(t) {
  var e = Yf(t);
  return of.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function qf(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function Kf(t) {
  var e = t.reduce(function(n, r) {
    var o = n[r.name];
    return n[r.name] = o ? Object.assign({}, o, r, {
      options: Object.assign({}, o.options, r.options),
      data: Object.assign({}, o.data, r.data)
    }) : r, n;
  }, {});
  return Object.keys(e).map(function(n) {
    return e[n];
  });
}
var ei = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function ni() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Jf(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? ei : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ei, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, m = [], w = !1, g = {
      state: u,
      setOptions: function(k) {
        var P = typeof k == "function" ? k(u.options) : k;
        f(), u.options = Object.assign({}, a, u.options, P), u.scrollParents = {
          reference: _e(l) ? vn(l) : l.contextElement ? vn(l.contextElement) : [],
          popper: vn(c)
        };
        var C = Wf(Kf([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = C.filter(function(E) {
          return E.enabled;
        }), b(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var k = u.elements, P = k.reference, C = k.popper;
          if (ni(P, C)) {
            u.rects = {
              reference: Xf(P, zn(C), u.options.strategy === "fixed"),
              popper: Go(C)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(I) {
              return u.modifiersData[I.name] = Object.assign({}, I.data);
            });
            for (var E = 0; E < u.orderedModifiers.length; E++) {
              if (u.reset === !0) {
                u.reset = !1, E = -1;
                continue;
              }
              var v = u.orderedModifiers[E], $ = v.fn, z = v.options, H = z === void 0 ? {} : z, O = v.name;
              typeof $ == "function" && (u = $({
                state: u,
                options: H,
                name: O,
                instance: g
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: qf(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(u);
        });
      }),
      destroy: function() {
        f(), w = !0;
      }
    };
    if (!ni(l, c))
      return g;
    g.setOptions(d).then(function(h) {
      !w && d.onFirstUpdate && d.onFirstUpdate(h);
    });
    function b() {
      u.orderedModifiers.forEach(function(h) {
        var k = h.name, P = h.options, C = P === void 0 ? {} : P, E = h.effect;
        if (typeof E == "function") {
          var v = E({
            state: u,
            name: k,
            instance: g,
            options: C
          }), $ = function() {
          };
          m.push(v || $);
        }
      });
    }
    function f() {
      m.forEach(function(h) {
        return h();
      }), m = [];
    }
    return g;
  };
}
var Zf = [xf, Vf, vf, lf, Bf, $f, Ff, mf, Af], Qf = /* @__PURE__ */ Jf({
  defaultModifiers: Zf
});
const As = "Popper";
function tm(t) {
  return Es(As, t);
}
Hw(As, ["root"]);
const em = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], nm = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function rm(t, e) {
  if (e === "ltr")
    return t;
  switch (t) {
    case "bottom-end":
      return "bottom-start";
    case "bottom-start":
      return "bottom-end";
    case "top-end":
      return "top-start";
    case "top-start":
      return "top-end";
    default:
      return t;
  }
}
function ir(t) {
  return typeof t == "function" ? t() : t;
}
function Er(t) {
  return t.nodeType !== void 0;
}
function om(t) {
  return !Er(t);
}
const am = () => Po({
  root: ["root"]
}, Bw(tm)), im = {}, sm = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: u,
    popperOptions: m,
    popperRef: w,
    slotProps: g = {},
    slots: b = {},
    TransitionProps: f
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, h = Ot(e, em), k = B.useRef(null), P = Oe(k, n), C = B.useRef(null), E = Oe(C, w), v = B.useRef(E);
  He(() => {
    v.current = E;
  }, [E]), B.useImperativeHandle(w, () => C.current, []);
  const $ = rm(u, s), [z, H] = B.useState($), [O, I] = B.useState(ir(o));
  B.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), B.useEffect(() => {
    o && I(ir(o));
  }, [o]), He(() => {
    if (!O || !d)
      return;
    const q = (ot) => {
      H(ot.placement);
    };
    if (process.env.NODE_ENV !== "production" && O && Er(O) && O.nodeType === 1) {
      const ot = O.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ot.top === 0 && ot.left === 0 && ot.right === 0 && ot.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let U = [{
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
        state: ot
      }) => {
        q(ot);
      }
    }];
    c != null && (U = U.concat(c)), m && m.modifiers != null && (U = U.concat(m.modifiers));
    const tt = Qf(O, k.current, A({
      placement: $
    }, m, {
      modifiers: U
    }));
    return v.current(tt), () => {
      tt.destroy(), v.current(null);
    };
  }, [O, l, c, d, m, $]);
  const T = {
    placement: z
  };
  f !== null && (T.TransitionProps = f);
  const D = am(), M = (r = b.root) != null ? r : "div", Q = Fw({
    elementType: M,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: P
    },
    ownerState: e,
    className: D.root
  });
  return /* @__PURE__ */ i(M, A({}, Q, {
    children: typeof a == "function" ? a(T) : a
  }));
}), Ms = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: u,
    placement: m = "bottom",
    popperOptions: w = im,
    popperRef: g,
    style: b,
    transition: f = !1,
    slotProps: h = {},
    slots: k = {}
  } = e, P = Ot(e, nm), [C, E] = B.useState(!0), v = () => {
    E(!1);
  }, $ = () => {
    E(!0);
  };
  if (!c && !u && (!f || C))
    return null;
  let z;
  if (a)
    z = a;
  else if (r) {
    const I = ir(r);
    z = I && Er(I) ? er(I).body : er(null).body;
  }
  const H = !u && c && (!f || C) ? "none" : void 0, O = f ? {
    in: u,
    onEnter: v,
    onExited: $
  } : void 0;
  return /* @__PURE__ */ i(or, {
    disablePortal: l,
    container: z,
    children: /* @__PURE__ */ i(sm, A({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: f ? !C : u,
      placement: m,
      popperOptions: w,
      popperRef: g,
      slotProps: h,
      slots: k
    }, P, {
      style: A({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: H
      }, b),
      TransitionProps: O,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ms.propTypes = {
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
  anchorEl: Ro(p.oneOfType([Nn, p.object, p.func]), (t) => {
    if (t.open) {
      const e = ir(t.anchorEl);
      if (e && Er(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || om(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: p.oneOfType([p.node, p.func]),
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
  container: p.oneOfType([Nn, p.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: p.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: p.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: p.arrayOf(p.shape({
    data: p.object,
    effect: p.func,
    enabled: p.bool,
    fn: p.func,
    name: p.any,
    options: p.object,
    phase: p.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: p.arrayOf(p.string),
    requiresIfExists: p.arrayOf(p.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: p.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: p.shape({
    modifiers: p.array,
    onFirstUpdate: p.func,
    placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: p.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ss,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: p.shape({
    root: p.oneOfType([p.func, p.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: p.shape({
    root: p.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: p.bool
});
function Ds() {
  const t = vs(jo);
  return process.env.NODE_ENV !== "production" && B.useDebugValue(t), t[Vo] || t;
}
function io(t, e) {
  return io = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, io(t, e);
}
function lm(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, io(t, e);
}
const ri = {
  disabled: !1
};
var cm = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.shape({
  enter: p.number,
  exit: p.number,
  appear: p.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && p.oneOfType([p.string, p.shape({
  enter: p.string,
  exit: p.string,
  active: p.string
}), p.shape({
  enter: p.string,
  enterDone: p.string,
  enterActive: p.string,
  exit: p.string,
  exitDone: p.string,
  exitActive: p.string
})]);
const Bs = S.createContext(null);
var dm = function(e) {
  return e.scrollTop;
}, fn = "unmounted", ve = "exited", ye = "entering", ze = "entered", so = "exiting", de = /* @__PURE__ */ function(t) {
  lm(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = ve, a.appearStatus = ye) : c = ze : r.unmountOnExit || r.mountOnEnter ? c = fn : c = ve, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === fn ? {
      status: ve
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== ye && s !== ze && (a = ye) : (s === ye || s === ze) && (a = so);
    }
    this.updateStatus(!1, a);
  }, n.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, n.getTimeouts = function() {
    var o = this.props.timeout, a, s, l;
    return a = s = l = o, o != null && typeof o != "number" && (a = o.exit, s = o.enter, l = o.appear !== void 0 ? o.appear : s), {
      exit: a,
      enter: s,
      appear: l
    };
  }, n.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === ye) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Gn.findDOMNode(this);
          s && dm(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ve && this.setState({
        status: fn
      });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Gn.findDOMNode(this), l], d = c[0], u = c[1], m = this.getTimeouts(), w = l ? m.appear : m.enter;
    if (!o && !s || ri.disabled) {
      this.safeSetState({
        status: ze
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, u), this.safeSetState({
      status: ye
    }, function() {
      a.props.onEntering(d, u), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: ze
        }, function() {
          a.props.onEntered(d, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Gn.findDOMNode(this);
    if (!a || ri.disabled) {
      this.safeSetState({
        status: ve
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: so
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ve
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
    var a = this, s = !0;
    return this.nextCallback = function(l) {
      s && (s = !1, a.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      s = !1;
    }, this.nextCallback;
  }, n.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var s = this.props.nodeRef ? this.props.nodeRef.current : Gn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!s || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [s, this.nextCallback], d = c[0], u = c[1];
      this.props.addEndListener(d, u);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === fn)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = Ot(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ S.createElement(Bs.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : S.cloneElement(S.Children.only(s), l))
    );
  }, e;
}(S.Component);
de.contextType = Bs;
de.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: p.shape({
    current: typeof Element > "u" ? p.any : function(t, e, n, r, o, a) {
      var s = t[e];
      return p.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(t, e, n, r, o, a);
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
  children: p.oneOfType([p.func.isRequired, p.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: p.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: p.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: p.bool,
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
  appear: p.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: p.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: p.bool,
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
  timeout: function(e) {
    var n = cm;
    e.addEndListener || (n = n.isRequired);
    for (var r = arguments.length, o = new Array(r > 1 ? r - 1 : 0), a = 1; a < r; a++)
      o[a - 1] = arguments[a];
    return n.apply(void 0, [e].concat(o));
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
  addEndListener: p.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: p.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: p.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: p.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: p.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: p.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: p.func
} : {};
function Ve() {
}
de.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ve,
  onEntering: Ve,
  onEntered: Ve,
  onExit: Ve,
  onExiting: Ve,
  onExited: Ve
};
de.UNMOUNTED = fn;
de.EXITED = ve;
de.ENTERING = ye;
de.ENTERED = ze;
de.EXITING = so;
const um = de, pm = (t) => t.scrollTop;
function oi(t, e) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: s = {}
  } = t;
  return {
    duration: (n = s.transitionDuration) != null ? n : typeof o == "number" ? o : o[e.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == "object" ? a[e.mode] : a,
    delay: s.transitionDelay
  };
}
const wm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function lo(t) {
  return `scale(${t}, ${t ** 2})`;
}
const fm = {
  entering: {
    opacity: 1,
    transform: lo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Gr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), qo = /* @__PURE__ */ B.forwardRef(function(e, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: u,
    onExit: m,
    onExited: w,
    onExiting: g,
    style: b,
    timeout: f = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = um
  } = e, k = Ot(e, wm), P = pn(), C = B.useRef(), E = Ds(), v = B.useRef(null), $ = Oe(v, a.ref, n), z = (q) => (U) => {
    if (q) {
      const tt = v.current;
      U === void 0 ? q(tt) : q(tt, U);
    }
  }, H = z(u), O = z((q, U) => {
    pm(q);
    const {
      duration: tt,
      delay: ot,
      easing: at
    } = oi({
      style: b,
      timeout: f,
      easing: s
    }, {
      mode: "enter"
    });
    let x;
    f === "auto" ? (x = E.transitions.getAutoHeightDuration(q.clientHeight), C.current = x) : x = tt, q.style.transition = [E.transitions.create("opacity", {
      duration: x,
      delay: ot
    }), E.transitions.create("transform", {
      duration: Gr ? x : x * 0.666,
      delay: ot,
      easing: at
    })].join(","), c && c(q, U);
  }), I = z(d), T = z(g), D = z((q) => {
    const {
      duration: U,
      delay: tt,
      easing: ot
    } = oi({
      style: b,
      timeout: f,
      easing: s
    }, {
      mode: "exit"
    });
    let at;
    f === "auto" ? (at = E.transitions.getAutoHeightDuration(q.clientHeight), C.current = at) : at = U, q.style.transition = [E.transitions.create("opacity", {
      duration: at,
      delay: tt
    }), E.transitions.create("transform", {
      duration: Gr ? at : at * 0.666,
      delay: Gr ? tt : tt || at * 0.333,
      easing: ot
    })].join(","), q.style.opacity = 0, q.style.transform = lo(0.75), m && m(q);
  }), M = z(w);
  return /* @__PURE__ */ i(h, A({
    appear: o,
    in: l,
    nodeRef: v,
    onEnter: O,
    onEntered: I,
    onEntering: H,
    onExit: D,
    onExited: M,
    onExiting: T,
    addEndListener: (q) => {
      f === "auto" && P.start(C.current || 0, q), r && r(v.current, q);
    },
    timeout: f === "auto" ? null : f
  }, k, {
    children: (q, U) => /* @__PURE__ */ B.cloneElement(a, A({
      style: A({
        opacity: 0,
        transform: lo(0.75),
        visibility: q === "exited" && !l ? "hidden" : void 0
      }, fm[q], b, a.props.style),
      ref: $
    }, U))
  }));
});
process.env.NODE_ENV !== "production" && (qo.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Add a custom transition end trigger. Called with the transitioning DOM
   * node and a done callback. Allows for more fine grained transition end
   * logic. Note: Timeouts are still used as a fallback if provided.
   */
  addEndListener: p.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: p.bool,
  /**
   * A single child content element.
   */
  children: as.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: p.oneOfType([p.shape({
    enter: p.string,
    exit: p.string
  }), p.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: p.bool,
  /**
   * @ignore
   */
  onEnter: p.func,
  /**
   * @ignore
   */
  onEntered: p.func,
  /**
   * @ignore
   */
  onEntering: p.func,
  /**
   * @ignore
   */
  onExit: p.func,
  /**
   * @ignore
   */
  onExited: p.func,
  /**
   * @ignore
   */
  onExiting: p.func,
  /**
   * @ignore
   */
  style: p.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: p.oneOfType([p.oneOf(["auto"]), p.number, p.shape({
    appear: p.number,
    enter: p.number,
    exit: p.number
  })])
});
qo.muiSupportAuto = !0;
const ai = qo, mm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], hm = jn(Ms, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), js = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r;
  const o = bs(), a = zo({
    props: e,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: d,
    container: u,
    disablePortal: m,
    keepMounted: w,
    modifiers: g,
    open: b,
    placement: f,
    popperOptions: h,
    popperRef: k,
    transition: P,
    slots: C,
    slotProps: E
  } = a, v = Ot(a, mm), $ = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, z = A({
    anchorEl: s,
    container: u,
    disablePortal: m,
    keepMounted: w,
    modifiers: g,
    open: b,
    placement: f,
    popperOptions: h,
    popperRef: k,
    transition: P
  }, v);
  return /* @__PURE__ */ i(hm, A({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: $
    },
    slotProps: E ?? d
  }, z, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (js.propTypes = {
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
  anchorEl: p.oneOfType([Nn, p.object, p.func]),
  /**
   * Popper render function or node.
   */
  children: p.oneOfType([p.node, p.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: p.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: p.shape({
    Root: p.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: p.shape({
    root: p.oneOfType([p.func, p.object])
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
  container: p.oneOfType([Nn, p.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: p.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: p.arrayOf(p.shape({
    data: p.object,
    effect: p.func,
    enabled: p.bool,
    fn: p.func,
    name: p.any,
    options: p.object,
    phase: p.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: p.arrayOf(p.string),
    requiresIfExists: p.arrayOf(p.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: p.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: p.shape({
    modifiers: p.array,
    onFirstUpdate: p.func,
    placement: p.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: p.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: ss,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: p.shape({
    root: p.oneOfType([p.func, p.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: p.shape({
    root: p.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: p.oneOfType([p.arrayOf(p.oneOfType([p.func, p.object, p.bool])), p.func, p.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: p.bool
});
const Vs = js;
function gm(t) {
  return wr("MuiTooltip", t);
}
const bm = fs("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), pe = bm, vm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function ym(t) {
  return Math.round(t * 1e5) / 1e5;
}
const xm = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${ee(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Po(s, gm, e);
}, Nm = jn(Vs, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.popper, !n.disableInteractive && e.popperInteractive, n.arrow && e.popperArrow, !n.open && e.popperClose];
  }
})(({
  theme: t,
  ownerState: e,
  open: n
}) => A({
  zIndex: (t.vars || t).zIndex.tooltip,
  pointerEvents: "none"
}, !e.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, e.arrow && {
  [`&[data-popper-placement*="bottom"] .${pe.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${pe.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${pe.arrow}`]: A({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${pe.arrow}`]: A({}, e.isRtl ? {
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
})), km = jn("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${ee(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => A({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : ys(t.palette.grey[700], 0.92),
  borderRadius: (t.vars || t).shape.borderRadius,
  color: (t.vars || t).palette.common.white,
  fontFamily: t.typography.fontFamily,
  padding: "4px 8px",
  fontSize: t.typography.pxToRem(11),
  maxWidth: 300,
  margin: 2,
  wordWrap: "break-word",
  fontWeight: t.typography.fontWeightMedium
}, e.arrow && {
  position: "relative",
  margin: 0
}, e.touch && {
  padding: "8px 16px",
  fontSize: t.typography.pxToRem(14),
  lineHeight: `${ym(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${pe.popper}[data-popper-placement*="left"] &`]: A({
    transformOrigin: "right center"
  }, e.isRtl ? A({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  }) : A({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  })),
  [`.${pe.popper}[data-popper-placement*="right"] &`]: A({
    transformOrigin: "left center"
  }, e.isRtl ? A({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  }) : A({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  })),
  [`.${pe.popper}[data-popper-placement*="top"] &`]: A({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${pe.popper}[data-popper-placement*="bottom"] &`]: A({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), Em = jn("span", {
  name: "MuiTooltip",
  slot: "Arrow",
  overridesResolver: (t, e) => e.arrow
})(({
  theme: t
}) => ({
  overflow: "hidden",
  position: "absolute",
  width: "1em",
  height: "0.71em",
  boxSizing: "border-box",
  color: t.vars ? t.vars.palette.Tooltip.bg : ys(t.palette.grey[700], 0.9),
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
let Wn = !1;
const ii = new Mn();
let dn = {
  x: 0,
  y: 0
};
function qn(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const zs = /* @__PURE__ */ B.forwardRef(function(e, n) {
  var r, o, a, s, l, c, d, u, m, w, g, b, f, h, k, P, C, E, v;
  const $ = zo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: z = !1,
    children: H,
    components: O = {},
    componentsProps: I = {},
    describeChild: T = !1,
    disableFocusListener: D = !1,
    disableHoverListener: M = !1,
    disableInteractive: Q = !1,
    disableTouchListener: q = !1,
    enterDelay: U = 100,
    enterNextDelay: tt = 0,
    enterTouchDelay: ot = 700,
    followCursor: at = !1,
    id: x,
    leaveDelay: R = 0,
    leaveTouchDelay: L = 1500,
    onClose: F,
    onOpen: V,
    open: Y,
    placement: X = "bottom",
    PopperComponent: W,
    PopperProps: G = {},
    slotProps: J = {},
    slots: Z = {},
    title: lt,
    TransitionComponent: _ = ai,
    TransitionProps: Et
  } = $, j = Ot($, vm), xt = /* @__PURE__ */ B.isValidElement(H) ? H : /* @__PURE__ */ i("span", {
    children: H
  }), Ct = Ds(), re = Ct.direction === "rtl", [Rt, K] = B.useState(), [nt, Nt] = B.useState(null), Pt = B.useRef(!1), qt = Q || at, $e = pn(), Ie = pn(), he = pn(), tn = pn(), [Ln, Ko] = cs({
    controlled: Y,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let oe = Ln;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: et
    } = B.useRef(Y !== void 0);
    B.useEffect(() => {
      Rt && Rt.disabled && !et && lt !== "" && Rt.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [lt, Rt, et]);
  }
  const Tr = ls(x), en = B.useRef(), Fn = no(() => {
    en.current !== void 0 && (document.body.style.WebkitUserSelect = en.current, en.current = void 0), tn.clear();
  });
  B.useEffect(() => Fn, [Fn]);
  const Jo = (et) => {
    ii.clear(), Wn = !0, Ko(!0), V && !oe && V(et);
  }, Un = no(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (et) => {
      ii.start(800 + R, () => {
        Wn = !1;
      }), Ko(!1), F && oe && F(et), $e.start(Ct.transitions.duration.shortest, () => {
        Pt.current = !1;
      });
    }
  ), Sr = (et) => {
    Pt.current && et.type !== "touchstart" || (Rt && Rt.removeAttribute("title"), Ie.clear(), he.clear(), U || Wn && tt ? Ie.start(Wn ? tt : U, () => {
      Jo(et);
    }) : Jo(et));
  }, Zo = (et) => {
    Ie.clear(), he.start(R, () => {
      Un(et);
    });
  }, {
    isFocusVisibleRef: Qo,
    onBlur: Ks,
    onFocus: Js,
    ref: Zs
  } = ds(), [, ta] = B.useState(!1), ea = (et) => {
    Ks(et), Qo.current === !1 && (ta(!1), Zo(et));
  }, na = (et) => {
    Rt || K(et.currentTarget), Js(et), Qo.current === !0 && (ta(!0), Sr(et));
  }, ra = (et) => {
    Pt.current = !0;
    const Bt = xt.props;
    Bt.onTouchStart && Bt.onTouchStart(et);
  }, oa = Sr, aa = Zo, Qs = (et) => {
    ra(et), he.clear(), $e.clear(), Fn(), en.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", tn.start(ot, () => {
      document.body.style.WebkitUserSelect = en.current, Sr(et);
    });
  }, tl = (et) => {
    xt.props.onTouchEnd && xt.props.onTouchEnd(et), Fn(), he.start(L, () => {
      Un(et);
    });
  };
  B.useEffect(() => {
    if (!oe)
      return;
    function et(Bt) {
      (Bt.key === "Escape" || Bt.key === "Esc") && Un(Bt);
    }
    return document.addEventListener("keydown", et), () => {
      document.removeEventListener("keydown", et);
    };
  }, [Un, oe]);
  const el = Oe(xt.ref, Zs, K, n);
  !lt && lt !== 0 && (oe = !1);
  const Cr = B.useRef(), nl = (et) => {
    const Bt = xt.props;
    Bt.onMouseMove && Bt.onMouseMove(et), dn = {
      x: et.clientX,
      y: et.clientY
    }, Cr.current && Cr.current.update();
  }, nn = {}, Or = typeof lt == "string";
  T ? (nn.title = !oe && Or && !M ? lt : null, nn["aria-describedby"] = oe ? Tr : null) : (nn["aria-label"] = Or ? lt : null, nn["aria-labelledby"] = oe && !Or ? Tr : null);
  const Ft = A({}, nn, j, xt.props, {
    className: ke(j.className, xt.props.className),
    onTouchStart: ra,
    ref: el
  }, at ? {
    onMouseMove: nl
  } : {});
  process.env.NODE_ENV !== "production" && (Ft["data-mui-internal-clone-element"] = !0, B.useEffect(() => {
    Rt && !Rt.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Rt]));
  const rn = {};
  q || (Ft.onTouchStart = Qs, Ft.onTouchEnd = tl), M || (Ft.onMouseOver = qn(oa, Ft.onMouseOver), Ft.onMouseLeave = qn(aa, Ft.onMouseLeave), qt || (rn.onMouseOver = oa, rn.onMouseLeave = aa)), D || (Ft.onFocus = qn(na, Ft.onFocus), Ft.onBlur = qn(ea, Ft.onBlur), qt || (rn.onFocus = na, rn.onBlur = ea)), process.env.NODE_ENV !== "production" && xt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xt.props.title}\` or the Tooltip component.`].join(`
`));
  const rl = B.useMemo(() => {
    var et;
    let Bt = [{
      name: "arrow",
      enabled: !!nt,
      options: {
        element: nt,
        padding: 4
      }
    }];
    return (et = G.popperOptions) != null && et.modifiers && (Bt = Bt.concat(G.popperOptions.modifiers)), A({}, G.popperOptions, {
      modifiers: Bt
    });
  }, [nt, G]), on = A({}, $, {
    isRtl: re,
    arrow: z,
    disableInteractive: qt,
    placement: X,
    PopperComponentProp: W,
    touch: Pt.current
  }), Rr = xm(on), ia = (r = (o = Z.popper) != null ? o : O.Popper) != null ? r : Nm, sa = (a = (s = (l = Z.transition) != null ? l : O.Transition) != null ? s : _) != null ? a : ai, la = (c = (d = Z.tooltip) != null ? d : O.Tooltip) != null ? c : km, ca = (u = (m = Z.arrow) != null ? m : O.Arrow) != null ? u : Em, ol = wn(ia, A({}, G, (w = J.popper) != null ? w : I.popper, {
    className: ke(Rr.popper, G == null ? void 0 : G.className, (g = (b = J.popper) != null ? b : I.popper) == null ? void 0 : g.className)
  }), on), al = wn(sa, A({}, Et, (f = J.transition) != null ? f : I.transition), on), il = wn(la, A({}, (h = J.tooltip) != null ? h : I.tooltip, {
    className: ke(Rr.tooltip, (k = (P = J.tooltip) != null ? P : I.tooltip) == null ? void 0 : k.className)
  }), on), sl = wn(ca, A({}, (C = J.arrow) != null ? C : I.arrow, {
    className: ke(Rr.arrow, (E = (v = J.arrow) != null ? v : I.arrow) == null ? void 0 : E.className)
  }), on);
  return /* @__PURE__ */ y(B.Fragment, {
    children: [/* @__PURE__ */ B.cloneElement(xt, Ft), /* @__PURE__ */ i(ia, A({
      as: W ?? Vs,
      placement: X,
      anchorEl: at ? {
        getBoundingClientRect: () => ({
          top: dn.y,
          left: dn.x,
          right: dn.x,
          bottom: dn.y,
          width: 0,
          height: 0
        })
      } : Rt,
      popperRef: Cr,
      open: Rt ? oe : !1,
      id: Tr,
      transition: !0
    }, rn, ol, {
      popperOptions: rl,
      children: ({
        TransitionProps: et
      }) => /* @__PURE__ */ i(sa, A({
        timeout: Ct.transitions.duration.shorter
      }, et, al, {
        children: /* @__PURE__ */ y(la, A({}, il, {
          children: [lt, z ? /* @__PURE__ */ i(ca, A({}, sl, {
            ref: Nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (zs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: p.bool,
  /**
   * Tooltip reference element.
   */
  children: as.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: p.object,
  /**
   * @ignore
   */
  className: p.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: p.shape({
    Arrow: p.elementType,
    Popper: p.elementType,
    Tooltip: p.elementType,
    Transition: p.elementType
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
  componentsProps: p.shape({
    arrow: p.object,
    popper: p.object,
    tooltip: p.object,
    transition: p.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: p.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: p.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: p.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: p.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: p.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: p.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: p.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: p.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: p.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: p.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: p.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: p.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: p.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: p.func,
  /**
   * If `true`, the component is shown.
   */
  open: p.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: p.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: p.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: p.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: p.shape({
    arrow: p.object,
    popper: p.object,
    tooltip: p.object,
    transition: p.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: p.shape({
    arrow: p.elementType,
    popper: p.elementType,
    tooltip: p.elementType,
    transition: p.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: p.oneOfType([p.arrayOf(p.oneOfType([p.func, p.object, p.bool])), p.func, p.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: p.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: p.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: p.object
});
const Tm = zs;
function si(t, e, n) {
  return t ? /* @__PURE__ */ i(yi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Ls(t) {
  const {
    onClick: e,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: d = !1,
    isDense: u = !0,
    isSubMenuParent: m = !1,
    hasDisabledGutters: w = !1,
    hasDivider: g = !1,
    focusVisibleClassName: b,
    id: f,
    children: h
  } = t, k = /* @__PURE__ */ i(
    Jl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: u,
      disableGutters: w,
      divider: g,
      focusVisibleClassName: b,
      onClick: e,
      id: f,
      children: n ? /* @__PURE__ */ y(ce, { children: [
        si(a, n, !0),
        /* @__PURE__ */ i(Zl, { primary: n, inset: !a && o }),
        m ? /* @__PURE__ */ i(yi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ i(Ns, {}) }) : si(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ i(Tm, { title: r, placement: "right", children: /* @__PURE__ */ i("div", { children: k }) }) : k;
}
function Fs(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Sm(t) {
  const [e, n] = st(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, s = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Fs(a).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ i(Us, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ y(ce, { children: [
    /* @__PURE__ */ i(Ls, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ i(
      Ql,
      {
        anchorEl: e,
        open: !!e,
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
const Cm = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Us(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: s } = Tt(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Fs(e).filter((b) => !("menuItem" in b.group))
    ), m = Object.values(u).sort(
      (b, f) => (b.group.order || 0) - (f.group.order || 0)
    ), w = [];
    m.forEach((b) => {
      Cm(b.id, e.items).forEach(
        (f) => w.push({ item: f, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const g = w.some(
      (b) => "iconPathBefore" in b.item && b.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: g };
  }, [o, e]), l = ({ item: u, isLastItemInGroup: m }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: m,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ i("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ i("div", { role: "menu", "aria-label": d, children: a.map((u, m) => {
    const { item: w } = u, g = l(u);
    if ("command" in w) {
      const b = w.group + m;
      return /* @__PURE__ */ i(
        Ls,
        {
          onClick: (f) => {
            n == null || n(f), r(w);
          },
          ...g
        },
        b
      );
    }
    return /* @__PURE__ */ i(
      Sm,
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
function Om(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(Us, { ...t, includedGroups: a });
}
function Rm({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ y(
    xi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(tc, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
          Om,
          {
            commandHandler: t,
            menuDefinition: e,
            columnId: n,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function _m({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Tt(() => {
    const s = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? s.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(s.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ i(
    xi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ i(
        Rm,
        {
          commandHandler: t,
          menuDefinition: n,
          ...s,
          className: e
        },
        l
      ))
    }
  );
}
function Pm(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const co = (t, e, n = {}) => {
  const r = Ne(e);
  r.current = e;
  const o = Ne(n);
  o.current = Pm(o.current);
  const [a, s] = st(() => r.current), [l, c] = st(!0);
  return Qt(() => {
    let d = !0;
    return c(!!t), (async () => {
      if (t) {
        const u = await t();
        d && (s(() => u), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [t]), [a, l];
}, $m = xs(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Im({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, d] = st(!1), [u, m] = st(!1), w = _t(() => {
    c && d(!1), m(!1);
  }, [c]), g = _t((E) => {
    E.stopPropagation(), d((v) => {
      const $ = !v;
      return $ && E.shiftKey ? m(!0) : $ || m(!1), $;
    });
  }, []), b = _t(
    (E) => (w(), r(E)),
    [r, w]
  ), [f, h] = st({ top: 1, left: 1 });
  Qt(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const v = E.getBoundingClientRect(), $ = window.scrollY, z = window.scrollX, H = v.top + $ + E.clientHeight, O = v.left + z;
        h({ top: H, left: O });
      }
    }
  }, [c, o]);
  const [k] = co(
    _t(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [P] = co(
    _t(async () => (t == null ? void 0 : t(!0)) ?? n ?? k, [t, n, k, c]),
    n ?? k
  ), C = u && P ? P : k;
  return /* @__PURE__ */ y(ce, { children: [
    /* @__PURE__ */ i(
      Ni,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: g,
        children: l ?? /* @__PURE__ */ i($m, {})
      }
    ),
    /* @__PURE__ */ i(
      ec,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: w,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: f.top,
            left: f.left
          }
        },
        children: C ? /* @__PURE__ */ i(
          _m,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: b,
            multiColumnMenu: C
          }
        ) : void 0
      }
    )
  ] });
}
function Ah({
  id: t,
  label: e,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: s = "medium",
  className: l,
  onClick: c,
  children: d
}) {
  return /* @__PURE__ */ i(
    Ni,
    {
      id: t,
      disabled: n,
      edge: a,
      size: s,
      "aria-label": e,
      title: o ? void 0 : r ?? e,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: d
    }
  );
}
const Pe = sr(({ className: t, ...e }, n) => /* @__PURE__ */ i(Cl, { size: 35, className: N("tw-animate-spin", t), ...e, ref: n }));
Pe.displayName = "Spinner";
function Mh({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: u,
  onChange: m,
  onFocus: w,
  onBlur: g
}) {
  return /* @__PURE__ */ y("div", { className: N("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ i(
      St,
      {
        htmlFor: t,
        className: N({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ i(
      Ze,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: N(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: u,
        onChange: m,
        onFocus: w,
        onBlur: g
      }
    ),
    /* @__PURE__ */ i("p", { className: N({ "tw-hidden": !o }), children: o })
  ] });
}
function Dh({
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
  children: o
}) {
  const a = Ne(void 0);
  return /* @__PURE__ */ i("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ i(nc, { position: "static", id: r, children: /* @__PURE__ */ y(
    rc,
    {
      className: N("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        t ? /* @__PURE__ */ i(
          Im,
          {
            commandHandler: e,
            containerRef: a,
            menuProvider: t
          }
        ) : void 0,
        o ? /* @__PURE__ */ i("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const Am = Je(
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
), Mm = S.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: N(Am({ variant: e }), t), ...n }));
Mm.displayName = "Alert";
const Dm = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ y(
    "h5",
    {
      ref: n,
      className: N("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
Dm.displayName = "AlertTitle";
const Bm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Bm.displayName = "AlertDescription";
const jm = Je(
  "tw-inline-flex tw-items-center tw-rounded-full tw-border tw-px-2.5 tw-py-0.5 tw-text-xs tw-font-semibold tw-transition-colors focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2",
  {
    variants: {
      variant: {
        default: "tw-border-transparent tw-bg-primary tw-text-primary-foreground hover:tw-bg-primary/80",
        secondary: "tw-border-transparent tw-bg-secondary tw-text-secondary-foreground hover:tw-bg-secondary/80",
        muted: "tw-border-transparent tw-bg-muted tw-text-muted-foreground hover:tw-bg-muted/80",
        destructive: "tw-border-transparent tw-bg-destructive tw-text-destructive-foreground hover:tw-bg-destructive/80",
        outline: "tw-text-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
function Vm({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: N("pr-twp", jm({ variant: e }), t), ...n });
}
const Gs = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Gs.displayName = "Card";
const Hs = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Hs.displayName = "CardHeader";
const Xs = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "h3",
    {
      ref: n,
      className: N(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
Xs.displayName = "CardTitle";
const Ys = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("p", { ref: n, className: N("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Ys.displayName = "CardDescription";
const Ws = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ws.displayName = "CardContent";
const qs = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
qs.displayName = "CardFooter";
function Bh({ ...t }) {
  return /* @__PURE__ */ i(
    ac,
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
      ...t
    }
  );
}
const zm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ y(
  un.Root,
  {
    ref: n,
    className: N(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      t
    ),
    ...e,
    children: [
      /* @__PURE__ */ i(un.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ i(un.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ i(un.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
zm.displayName = un.Root.displayName;
const Lm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Wr.Root,
  {
    className: N(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      t
    ),
    ...e,
    ref: n,
    children: /* @__PURE__ */ i(
      Wr.Thumb,
      {
        className: N(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
        )
      }
    )
  }
));
Lm.displayName = Wr.Root.displayName;
const jh = Dt.Root, Fm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.List,
  {
    ref: n,
    className: N(
      "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Fm.displayName = Dt.List.displayName;
const Um = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Trigger,
  {
    ref: n,
    className: N(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Um.displayName = Dt.Trigger.displayName;
const Gm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Dt.Content,
  {
    ref: n,
    className: N(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Gm.displayName = Dt.Content.displayName;
function Vh({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t,
          "tw-bg-blue-600": !t,
          "tw-bg-white tw-text-blue-600 hover:tw-text-white": !n,
          "tw-w-20": n
        },
        r
      ),
      onClick: e,
      ...o,
      children: t ? /* @__PURE__ */ i(Pe, { size: 15 }) : /* @__PURE__ */ y(ce, { children: [
        /* @__PURE__ */ i(Ol, { size: 25, className: N("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function zh({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ y(ce, { children: [
        /* @__PURE__ */ i(Pe, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Lh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ y(ce, { children: [
        /* @__PURE__ */ i(Pe, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Fh({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    mt,
    {
      className: N(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ y(ce, { children: [
        /* @__PURE__ */ i(Pe, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Uh({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = Tt(
    () => ({
      overrides: {
        a: {
          props: {
            target: r
          }
        }
      }
    }),
    [r]
  );
  return /* @__PURE__ */ i("div", { id: t, className: N("pr-twp tw-prose", n), children: /* @__PURE__ */ i(ic, { options: o, children: e }) });
}
const Hm = sr((t, e) => /* @__PURE__ */ y(
  mt,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ i(Rl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        Cn,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var Xm = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Xm || {});
function Gh({ id: t, groups: e }) {
  return /* @__PURE__ */ i("div", { id: t, children: /* @__PURE__ */ y(cr, { children: [
    /* @__PURE__ */ i(go, { asChild: !0, children: /* @__PURE__ */ i(Hm, {}) }),
    /* @__PURE__ */ i(Rn, { children: e.map((n) => /* @__PURE__ */ y("div", { children: [
      /* @__PURE__ */ i(_n, { children: n.label }),
      /* @__PURE__ */ i(xc, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(bo, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(Ri, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i(Pn, {})
    ] }, n.label)) })
  ] }) });
}
function Hh({ id: t, message: e }) {
  return /* @__PURE__ */ i("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function Xh({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new Ll("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), s = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ y(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i(_l, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ i(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ y(
            "button",
            {
              type: "button",
              onClick: () => s(),
              className: "tw-text-xs tw-text-gray-500 tw-underline",
              children: [
                "+",
                r.length - 3,
                " more languages"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ y("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ y(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ i(Pl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ y(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ i($l, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Ym({ id: t, versionHistory: e }) {
  const [n, r] = st(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), u = d.getUTCFullYear() - 1970, m = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let g = "";
    return u > 0 ? g = `${u.toString()} year${u === 1 ? "" : "s"} ago` : m > 0 ? g = `${m.toString()} month${m === 1 ? "" : "s"} ago` : w === 0 ? g = "today" : g = `${w.toString()} day${w === 1 ? "" : "s"} ago`, g;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ y("div", { id: t, children: [
    /* @__PURE__ */ i("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ i("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ y("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ i("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ i("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ i("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ y("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ y("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ i("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    s.length > 5 && /* @__PURE__ */ i(
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
function Yh({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Tt(() => Fl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((u) => d.of(u));
  })(r);
  return /* @__PURE__ */ i("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ y("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ i(Ym, { versionHistory: o }),
    /* @__PURE__ */ i("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ y("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ i("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ y("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ y("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ i("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ y("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
function li({
  entries: t,
  getEntriesCount: e,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a,
  customSelectedText: s,
  sortSelected: l,
  icon: c,
  className: d,
  badgesPlaceholder: u
}) {
  return /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
    /* @__PURE__ */ i(
      sd,
      {
        entries: t,
        getEntriesCount: e,
        selected: n,
        onChange: r,
        placeholder: o,
        commandEmptyMessage: a,
        customSelectedText: s,
        sortSelected: l,
        icon: c,
        className: d
      }
    ),
    n.length > 0 ? /* @__PURE__ */ i("div", { className: "tw-flex tw-flex-wrap tw-items-center tw-gap-2", children: n.map((m) => {
      var w;
      return /* @__PURE__ */ y(Vm, { variant: "muted", className: "tw-flex tw-items-center tw-gap-1", children: [
        /* @__PURE__ */ i(
          mt,
          {
            variant: "ghost",
            size: "icon",
            className: "tw-h-4 tw-w-4 tw-p-0 hover:tw-bg-transparent",
            onClick: () => r(n.filter((g) => g !== m)),
            children: /* @__PURE__ */ i(uo, { className: "tw-h-3 tw-w-3" })
          }
        ),
        (w = t.find((g) => g.value === m)) == null ? void 0 : w.label
      ] }, m);
    }) }) : /* @__PURE__ */ i(St, { children: u })
  ] });
}
const Wh = [
  "%resources_action%",
  "%resources_any%",
  "%resources_dialog_subtitle%",
  "%resources_dialog_title%",
  "%resources_filterBy%",
  "%resources_filterInput%",
  "%resources_fullName%",
  "%resources_get%",
  "%resources_installed%",
  "%resources_language%",
  "%resources_languages%",
  "%resources_loadingResources%",
  "%resources_noResults%",
  "%resources_open%",
  "%resources_remove%",
  "%resources_results%",
  "%resources_showing%",
  "%resources_size%",
  "%resources_type%",
  "%resources_types%",
  "%resources_type_DBL%",
  "%resources_type_ER%",
  "%resources_type_SLR%",
  "%resources_type_XR%",
  "%resources_type_unknown%",
  "%resources_update%"
], Wm = (t, e) => {
  const n = Array.from(
    new Set(
      t.map((s) => s.bestLanguageName)
    )
  ), r = new Set(
    t.filter((s) => s.installed).map((s) => s.bestLanguageName)
  ), o = new Set(e.concat(Array.from(r)));
  return n.sort((s, l) => {
    const c = o.has(s), d = o.has(l);
    return c && d ? s.localeCompare(l) : c ? -1 : d ? 1 : s.localeCompare(l);
  }).map((s) => ({ label: s, value: s, starred: r.has(s) }));
}, ci = (t, e, n) => /* @__PURE__ */ i(
  mt,
  {
    className: "tw-bg-muted",
    variant: "ghost",
    onClick: () => n(t.dblEntryUid, "install"),
    children: e
  }
), qm = (t, e, n, r, o, a) => e.includes(t.dblEntryUid) ? /* @__PURE__ */ i(mt, { className: "tw-bg-muted", variant: "ghost", children: /* @__PURE__ */ i(Pe, { className: "tw-h-5 tw-py-[1px]" }) }) : t.installed ? t.updateAvailable ? ci(t, r, a) : /* @__PURE__ */ i(St, { className: "tw-my-2 tw-flex tw-h-6 tw-items-center", children: o }) : ci(t, n, a);
function qh({
  localizedStrings: t,
  resources: e,
  isLoadingResources: n,
  selectedTypes: r,
  setSelectedTypes: o,
  selectedLanguages: a,
  setSelectedLanguages: s,
  openResource: l,
  installResource: c,
  uninstallResource: d,
  className: u
}) {
  const m = t["%resources_action%"], w = t["%resources_any%"], g = t["%resources_dialog_subtitle%"], b = t["%resources_dialog_title%"], f = t["%resources_filterInput%"], h = t["%resources_filterBy%"], k = t["%resources_fullName%"], P = t["%resources_get%"], C = t["%resources_installed%"], E = t["%resources_language%"], v = t["%resources_languages%"], $ = t["%resources_loadingResources%"], z = t["%resources_noResults%"], H = t["%resources_open%"], O = t["%resources_remove%"], I = t["%resources_results%"], T = t["%resources_showing%"], D = t["%resources_size%"], M = t["%resources_type%"], Q = t["%resources_types%"], q = t["%resources_type_DBL%"], U = t["%resources_type_ER%"], tt = t["%resources_type_SLR%"], ot = t["%resources_type_XR%"], at = t["%resources_type_unknown%"], x = t["%resources_update%"], [R, L] = st(!1);
  Qt(() => {
    if (!R) {
      if (a.length > 0) {
        L(!0);
        return;
      }
      e.length > 0 && a.length === 0 && (s(
        Array.from(
          new Set(
            e.filter((K) => K.installed === !0).map((K) => K.bestLanguageName)
          )
        )
      ), L(!0));
    }
  }, [e, a.length, s, R, L]);
  const [F, V] = st([]), Y = (K, nt) => {
    if (!c || !d)
      return;
    const Nt = {
      dblEntryUid: K,
      action: nt === "install" ? "installing" : "removing"
    };
    V((qt) => [...qt, Nt]), (nt === "install" ? c : d)(K).catch((qt) => {
      console.debug(Ul(qt));
    });
  };
  Qt(() => {
    V(
      (K) => K.filter((nt) => {
        const Nt = e.find((Pt) => Pt.dblEntryUid === nt.dblEntryUid);
        return Nt ? !(nt.action === "installing" && Nt.installed || nt.action === "removing" && !Nt.installed) : !0;
      })
    );
  }, [e]);
  const [X, W] = st(""), G = Tt(() => e.filter((K) => {
    const nt = X.toLowerCase();
    return K.displayName.toLowerCase().includes(nt) || K.fullName.toLowerCase().includes(nt) || K.bestLanguageName.toLowerCase().includes(nt);
  }), [e, X]), J = Tt(() => [
    { value: "DBLResource", label: q },
    { value: "EnhancedResource", label: U },
    { value: "SourceLanguageResource", label: tt },
    { value: "XmlResource", label: ot }
  ], [q, U, tt, ot]), Z = Tt(() => r.length === 0 ? G : G.filter((K) => r.includes(K.type)), [G, r]), lt = Tt(() => a.length === 0 ? Z : Z.filter((K) => a.includes(K.bestLanguageName)), [a, Z]), [_, Et] = st({
    key: "bestLanguageName",
    direction: "ascending"
  }), j = Tt(() => [...lt].sort((K, nt) => {
    let Nt, Pt;
    return _.key === "action" ? (Nt = (K.installed ? 10 : 0) + (K.updateAvailable ? 1 : 0), Pt = (nt.installed ? 10 : 0) + (nt.updateAvailable ? 1 : 0)) : (Nt = K[_.key], Pt = nt[_.key]), Nt < Pt ? _.direction === "ascending" ? -1 : 1 : Nt > Pt ? _.direction === "ascending" ? 1 : -1 : 0;
  }), [_.direction, _.key, lt]), xt = (K) => {
    const nt = { key: K, direction: "ascending" };
    _.key === K && _.direction === "ascending" && (nt.direction = "descending"), Et(nt);
  }, Ct = (K, nt) => /* @__PURE__ */ i(we, { onClick: () => xt(K), children: /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center", children: [
    /* @__PURE__ */ i("div", { className: "tw-font-normal", children: nt }),
    _.key !== K && /* @__PURE__ */ i(po, { className: "tw-pl-1", size: 16 }),
    _.key === K && (_.direction === "ascending" ? /* @__PURE__ */ i(wi, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ i(Cn, { className: "tw-pl-1", size: 16 }))
  ] }) }), re = (K) => e.filter((nt) => nt.type === K.value).length ?? 0, Rt = (K) => e.filter((nt) => nt.bestLanguageName === K.value).length ?? 0;
  return /* @__PURE__ */ i("div", { className: u, children: /* @__PURE__ */ y(Gs, { className: "tw-flex tw-h-screen tw-flex-col tw-rounded-none tw-border-0", children: [
    /* @__PURE__ */ i(Hs, { className: "tw-flex-shrink-0", children: /* @__PURE__ */ y("div", { className: "tw-flex", children: [
      /* @__PURE__ */ y("div", { className: "tw-flex tw-items-center tw-pr-4", children: [
        /* @__PURE__ */ i(ua, { size: 36, className: "tw-mr-4" }),
        /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-gap-2", children: [
          /* @__PURE__ */ i(Xs, { children: b }),
          /* @__PURE__ */ i(Ys, { className: "tw-mt-1", children: g }),
          /* @__PURE__ */ i(
            So,
            {
              className: "tw-min-w-72",
              onSearch: W,
              placeholder: f
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-gap-1", children: [
        /* @__PURE__ */ i(St, { className: "tw-mb-2 tw-text-muted-foreground", children: h }),
        /* @__PURE__ */ i(
          li,
          {
            entries: J,
            getEntriesCount: re,
            selected: r,
            onChange: o,
            placeholder: Q,
            icon: /* @__PURE__ */ i(Il, {}),
            badgesPlaceholder: w
          }
        ),
        /* @__PURE__ */ i(
          li,
          {
            entries: Wm(e, a),
            getEntriesCount: Rt,
            selected: a,
            onChange: s,
            placeholder: v,
            sortSelected: !0,
            icon: /* @__PURE__ */ i(Al, {}),
            badgesPlaceholder: w
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ i(Ws, { className: "tw-flex-grow tw-overflow-auto", children: n || !e ? /* @__PURE__ */ y("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ i(St, { children: $ }),
      /* @__PURE__ */ i(Pe, {})
    ] }) : /* @__PURE__ */ i("div", { children: j.length === 0 ? /* @__PURE__ */ i("div", { className: "tw-m-4 tw-flex tw-justify-center", children: /* @__PURE__ */ i(St, { children: z }) }) : /* @__PURE__ */ y($n, { stickyHeader: !0, children: [
      /* @__PURE__ */ i(In, { className: "tw-bg-none", stickyHeader: !0, children: /* @__PURE__ */ y(Jt, { children: [
        /* @__PURE__ */ i(we, {}),
        /* @__PURE__ */ i(we, {}),
        Ct("fullName", k),
        Ct("bestLanguageName", E),
        Ct("type", M),
        Ct("size", D),
        Ct("action", m)
      ] }) }),
      /* @__PURE__ */ i(An, { children: j.map((K) => {
        var nt;
        return /* @__PURE__ */ y(Jt, { children: [
          /* @__PURE__ */ i(Vt, { children: /* @__PURE__ */ i(ua, { className: "tw-pr-0", size: 18 }) }),
          /* @__PURE__ */ i(Vt, { children: K.displayName }),
          /* @__PURE__ */ i(Vt, { className: "tw-font-medium", children: K.fullName }),
          /* @__PURE__ */ i(Vt, { children: K.bestLanguageName }),
          /* @__PURE__ */ i(Vt, { children: ((nt = J.find((Nt) => Nt.value === K.type)) == null ? void 0 : nt.label) ?? at }),
          /* @__PURE__ */ i(Vt, { children: K.size }),
          /* @__PURE__ */ i(Vt, { children: /* @__PURE__ */ y("div", { className: "tw-flex tw-justify-between", children: [
            qm(
              K,
              F.map((Nt) => Nt.dblEntryUid),
              P,
              x,
              C,
              Y
            ),
            K.installed && /* @__PURE__ */ y(cr, { children: [
              /* @__PURE__ */ i(go, { asChild: !0, children: /* @__PURE__ */ i(mt, { variant: "ghost", children: /* @__PURE__ */ i(Ml, { className: "tw-w-4" }) }) }),
              /* @__PURE__ */ y(Rn, { align: "start", children: [
                /* @__PURE__ */ i(
                  tr,
                  {
                    onClick: () => l(K.projectId),
                    children: /* @__PURE__ */ i("span", { children: H })
                  }
                ),
                /* @__PURE__ */ i(Pn, {}),
                /* @__PURE__ */ i(
                  tr,
                  {
                    onClick: () => Y(K.dblEntryUid, "remove"),
                    children: /* @__PURE__ */ i("span", { children: O })
                  }
                )
              ] })
            ] })
          ] }) })
        ] }, K.displayName + K.fullName);
      }) })
    ] }) }) }),
    /* @__PURE__ */ i(qs, { className: "tw-flex-shrink-0 tw-justify-center tw-border-t tw-p-4", children: j.length > 0 && /* @__PURE__ */ i(St, { className: "tw-font-normal", children: `${T} ${j.length} ${I}` }) })
  ] }) });
}
const Km = (t, e) => t[e] ?? e;
function Kh({
  knownUiLanguages: t,
  primaryLanguage: e = "en",
  fallbackLanguages: n = [],
  onLanguagesChange: r,
  onPrimaryLanguageChange: o,
  onFallbackLanguagesChange: a,
  localizedStrings: s,
  className: l,
  direction: c = "ltr"
}) {
  const d = Km(
    s,
    "%settings_uiLanguageSelector_selectFallbackLanguages%"
  ), [u, m] = st(!1), w = (b) => {
    o && o(b), r && r([b, ...n.filter((f) => f !== b)]), a && n.find((f) => f === b) && a([...n.filter((f) => f !== b)]), m(!1);
  }, g = (b, f) => {
    var k, P, C, E, v, $;
    const h = f !== b ? ((P = (k = t[b]) == null ? void 0 : k.uiNames) == null ? void 0 : P[f]) ?? ((E = (C = t[b]) == null ? void 0 : C.uiNames) == null ? void 0 : E.en) : void 0;
    return h ? `${(v = t[b]) == null ? void 0 : v.autonym} (${h})` : ($ = t[b]) == null ? void 0 : $.autonym;
  };
  return /* @__PURE__ */ y("div", { className: N("pr-twp tw-max-w-sm", l), children: [
    /* @__PURE__ */ y(
      Fe,
      {
        name: "uiLanguage",
        value: e,
        onValueChange: w,
        open: u,
        onOpenChange: (b) => m(b),
        dir: c,
        children: [
          /* @__PURE__ */ i(Se, { children: /* @__PURE__ */ i(Ue, {}) }),
          /* @__PURE__ */ i(
            Ce,
            {
              className: "tw-z-[250]",
              dir: c,
              children: Object.keys(t).map((b) => /* @__PURE__ */ i(Ut, { value: b, children: g(b, e) }, b))
            }
          )
        ]
      }
    ),
    e !== "en" && /* @__PURE__ */ y(ce, { children: [
      /* @__PURE__ */ i(St, { className: "tw-ms-3", children: d }),
      /* @__PURE__ */ i("div", { className: "tw-ms-3", children: /* @__PURE__ */ y(St, { children: [
        "Currently:",
        " ",
        (n == null ? void 0 : n.length) > 0 ? `${n.map((b) => g(b, e)).join(", ")}` : `default (${t.en.autonym})`
      ] }) })
    ] })
  ] });
}
const Jh = (t, e) => {
  Qt(() => {
    if (!t)
      return () => {
      };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, Hr = () => !1, Zh = (t, e) => {
  const [n] = co(
    _t(async () => {
      if (!t)
        return Hr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    Hr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Qt(() => () => {
    n !== Hr && n();
  }, [n]);
};
function Jm(t, e = "top") {
  if (!t || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Jm(`*, ::before, ::after {
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
}/*
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
[hidden]:where(:not([hidden="until-found"])):where(.pr-twp,.pr-twp *) {
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

    --secondary: 210 40% 90%;
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
.tw-left-0 {
  left: 0px;
}
.tw-left-2 {
  left: 0.5rem;
}
.tw-left-2\\.5 {
  left: 0.625rem;
}
.tw-left-3 {
  left: 0.75rem;
}
.tw-left-\\[50\\%\\] {
  left: 50%;
}
.tw-right-0 {
  right: 0px;
}
.tw-right-1 {
  right: 0.25rem;
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
.tw-top-1\\.5 {
  top: 0.375rem;
}
.tw-top-1\\/2 {
  top: 50%;
}
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-3\\.5 {
  top: 0.875rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-\\[-1px\\] {
  top: -1px;
}
.tw-top-\\[50\\%\\] {
  top: 50%;
}
.tw-z-10 {
  z-index: 10;
}
.tw-z-20 {
  z-index: 20;
}
.tw-z-30 {
  z-index: 30;
}
.tw-z-50 {
  z-index: 50;
}
.tw-z-\\[1000\\] {
  z-index: 1000;
}
.tw-z-\\[250\\] {
  z-index: 250;
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
.tw-m-4 {
  margin: 1rem;
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
.tw-mx-3\\.5 {
  margin-left: 0.875rem;
  margin-right: 0.875rem;
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
.tw-mr-4 {
  margin-right: 1rem;
}
.tw-ms-2 {
  margin-inline-start: 0.5rem;
}
.tw-ms-3 {
  margin-inline-start: 0.75rem;
}
.tw-ms-5 {
  margin-inline-start: 1.25rem;
}
.tw-ms-auto {
  margin-inline-start: auto;
}
.tw-mt-1 {
  margin-top: 0.25rem;
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
.tw-size-4 {
  width: 1rem;
  height: 1rem;
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
.tw-h-40 {
  height: 10rem;
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
.tw-h-screen {
  height: 100vh;
}
.tw-h-svh {
  height: 100svh;
}
.tw-max-h-80 {
  max-height: 20rem;
}
.tw-max-h-96 {
  max-height: 24rem;
}
.tw-max-h-\\[300px\\] {
  max-height: 300px;
}
.tw-min-h-0 {
  min-height: 0px;
}
.tw-min-h-svh {
  min-height: 100svh;
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
.tw-w-64 {
  width: 16rem;
}
.tw-w-7 {
  width: 1.75rem;
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
.tw-w-9\\/12 {
  width: 75%;
}
.tw-w-96 {
  width: 24rem;
}
.tw-w-\\[--sidebar-width\\] {
  width: var(--sidebar-width);
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
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[350px\\] {
  width: 350px;
}
.tw-w-\\[400px\\] {
  width: 400px;
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
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-5 {
  min-width: 1.25rem;
}
.tw-min-w-72 {
  min-width: 18rem;
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
.tw-max-w-\\[--skeleton-width\\] {
  max-width: var(--skeleton-width);
}
.tw-max-w-lg {
  max-width: 32rem;
}
.tw-max-w-sm {
  max-width: 24rem;
}
.tw-flex-1 {
  flex: 1 1 0%;
}
.tw-flex-shrink-0 {
  flex-shrink: 0;
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
.tw--translate-x-1\\/2 {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-\\[-50\\%\\] {
  --tw-translate-x: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-px {
  --tw-translate-x: 1px;
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
@keyframes tw-pulse {

  50% {
    opacity: .5;
  }
}
.tw-animate-pulse {
  animation: tw-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
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
.tw-resize {
  resize: both;
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
.tw-items-stretch {
  align-items: stretch;
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
.tw-rounded {
  border-radius: 0.25rem;
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
.tw-rounded-none {
  border-radius: 0px;
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
  border-color: rgb(0 0 0 / var(--tw-border-opacity, 1));
}
.tw-border-blue-500 {
  --tw-border-opacity: 1;
  border-color: rgb(59 130 246 / var(--tw-border-opacity, 1));
}
.tw-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
}
.tw-border-gray-300 {
  --tw-border-opacity: 1;
  border-color: rgb(209 213 219 / var(--tw-border-opacity, 1));
}
.tw-border-gray-400 {
  --tw-border-opacity: 1;
  border-color: rgb(156 163 175 / var(--tw-border-opacity, 1));
}
.tw-border-input {
  border-color: hsl(var(--input));
}
.tw-border-primary {
  border-color: hsl(var(--primary));
}
.tw-border-red-600 {
  --tw-border-opacity: 1;
  border-color: rgb(220 38 38 / var(--tw-border-opacity, 1));
}
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}
.tw-border-transparent {
  border-color: transparent;
}
.tw-border-l-indigo-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(199 210 254 / var(--tw-border-opacity, 1));
}
.tw-border-l-purple-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(233 213 255 / var(--tw-border-opacity, 1));
}
.tw-border-l-red-200 {
  --tw-border-opacity: 1;
  border-left-color: rgb(254 202 202 / var(--tw-border-opacity, 1));
}
.tw-bg-accent {
  background-color: hsl(var(--accent));
}
.tw-bg-accent-foreground {
  background-color: hsl(var(--accent-foreground));
}
.tw-bg-amber-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-200 {
  --tw-bg-opacity: 1;
  background-color: rgb(253 230 138 / var(--tw-bg-opacity, 1));
}
.tw-bg-amber-50 {
  --tw-bg-opacity: 1;
  background-color: rgb(255 251 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-background {
  background-color: hsl(var(--background));
}
.tw-bg-black\\/80 {
  background-color: rgb(0 0 0 / 0.8);
}
.tw-bg-blue-600 {
  --tw-bg-opacity: 1;
  background-color: rgb(37 99 235 / var(--tw-bg-opacity, 1));
}
.tw-bg-blue-700 {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
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
  background-color: rgb(243 244 246 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-300 {
  --tw-bg-opacity: 1;
  background-color: rgb(209 213 219 / var(--tw-bg-opacity, 1));
}
.tw-bg-gray-400 {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
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
  background-color: rgb(212 212 212 / var(--tw-bg-opacity, 1));
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
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity, 1));
}
.tw-bg-transparent {
  background-color: transparent;
}
.tw-bg-white {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}
.tw-bg-none {
  background-image: none;
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
.tw-p-3 {
  padding: 0.75rem;
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
.tw-py-0\\.5 {
  padding-top: 0.125rem;
  padding-bottom: 0.125rem;
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
.tw-py-\\[1px\\] {
  padding-top: 1px;
  padding-bottom: 1px;
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
.tw-pe-3 {
  padding-inline-end: 0.75rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
}
.tw-pl-1 {
  padding-left: 0.25rem;
}
.tw-pl-3 {
  padding-left: 0.75rem;
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
.tw-pr-0 {
  padding-right: 0px;
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
.tw-ps-9 {
  padding-inline-start: 2.25rem;
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
.tw-text-left {
  text-align: left;
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
.tw-text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
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
  color: rgb(146 64 14 / var(--tw-text-opacity, 1));
}
.tw-text-amber-900 {
  --tw-text-opacity: 1;
  color: rgb(120 53 15 / var(--tw-text-opacity, 1));
}
.tw-text-black {
  --tw-text-opacity: 1;
  color: rgb(0 0 0 / var(--tw-text-opacity, 1));
}
.tw-text-blue-600 {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
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
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity, 1));
}
.tw-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity, 1));
}
.tw-text-gray-600 {
  --tw-text-opacity: 1;
  color: rgb(75 85 99 / var(--tw-text-opacity, 1));
}
.tw-text-gray-700 {
  --tw-text-opacity: 1;
  color: rgb(55 65 81 / var(--tw-text-opacity, 1));
}
.tw-text-gray-800 {
  --tw-text-opacity: 1;
  color: rgb(31 41 55 / var(--tw-text-opacity, 1));
}
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
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
  color: rgb(239 68 68 / var(--tw-text-opacity, 1));
}
.tw-text-red-600 {
  --tw-text-opacity: 1;
  color: rgb(220 38 38 / var(--tw-text-opacity, 1));
}
.tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
}
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
}
.tw-text-slate-900 {
  --tw-text-opacity: 1;
  color: rgb(15 23 42 / var(--tw-text-opacity, 1));
}
.tw-text-white {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}
.tw-text-yellow-900 {
  --tw-text-opacity: 1;
  color: rgb(113 63 18 / var(--tw-text-opacity, 1));
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
.tw-opacity-100 {
  opacity: 1;
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
.tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-border\\)\\)\\] {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-border));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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
.tw-ring-sidebar-ring {
  --tw-ring-color: hsl(var(--sidebar-ring));
}
.tw-ring-offset-background {
  --tw-ring-offset-color: hsl(var(--background));
}
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
}
.tw-transition {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter, backdrop-filter;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[left\\,right\\,width\\] {
  transition-property: left,right,width;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[margin\\,opa\\] {
  transition-property: margin,opa;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\,height\\,padding\\] {
  transition-property: width,height,padding;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}
.tw-transition-\\[width\\] {
  transition-property: width;
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
.tw-duration-500 {
  transition-duration: 500ms;
}
.tw-ease-in-out {
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  transition-timing-function: linear;
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
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
}
.tw-duration-200 {
  animation-duration: 200ms;
}
.tw-duration-300 {
  animation-duration: 300ms;
}
.tw-duration-500 {
  animation-duration: 500ms;
}
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/src/tailwind.css */

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

.file\\:tw-text-foreground::file-selector-button {
  color: hsl(var(--foreground));
}

.placeholder\\:tw-text-muted-foreground::placeholder {
  color: hsl(var(--muted-foreground));
}

.after\\:tw-absolute::after {
  content: var(--tw-content);
  position: absolute;
}

.after\\:tw--inset-2::after {
  content: var(--tw-content);
  inset: -0.5rem;
}

.after\\:tw-inset-y-0::after {
  content: var(--tw-content);
  top: 0px;
  bottom: 0px;
}

.after\\:tw-left-1\\/2::after {
  content: var(--tw-content);
  left: 50%;
}

.after\\:tw-w-\\[2px\\]::after {
  content: var(--tw-content);
  width: 2px;
}

.hover\\:tw-border-blue-600:hover {
  --tw-border-opacity: 1;
  border-color: rgb(37 99 235 / var(--tw-border-opacity, 1));
}

.hover\\:tw-bg-accent:hover {
  background-color: hsl(var(--accent));
}

.hover\\:tw-bg-blue-700:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(29 78 216 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
}

.hover\\:tw-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
}

.hover\\:tw-bg-gray-400:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(156 163 175 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-bg-muted:hover {
  background-color: hsl(var(--muted));
}

.hover\\:tw-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}

.hover\\:tw-bg-muted\\/80:hover {
  background-color: hsl(var(--muted) / 0.8);
}

.hover\\:tw-bg-primary\\/80:hover {
  background-color: hsl(var(--primary) / 0.8);
}

.hover\\:tw-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}

.hover\\:tw-bg-secondary\\/80:hover {
  background-color: hsl(var(--secondary) / 0.8);
}

.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
}

.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
}

.hover\\:tw-bg-white:hover {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.hover\\:tw-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
}

.hover\\:tw-text-blue-600:hover {
  --tw-text-opacity: 1;
  color: rgb(37 99 235 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-foreground:hover {
  color: hsl(var(--foreground));
}

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity, 1));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
}

.hover\\:tw-text-white:hover {
  --tw-text-opacity: 1;
  color: rgb(255 255 255 / var(--tw-text-opacity, 1));
}

.hover\\:tw-underline:hover {
  text-decoration-line: underline;
}

.hover\\:tw-opacity-100:hover {
  opacity: 1;
}

.hover\\:tw-shadow-\\[0_0_0_1px_hsl\\(var\\(--sidebar-accent\\)\\)\\]:hover {
  --tw-shadow: 0 0 0 1px hsl(var(--sidebar-accent));
  --tw-shadow-colored: 0 0 0 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:tw-shadow-sm:hover {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.hover\\:after\\:tw-bg-sidebar-border:hover::after {
  content: var(--tw-content);
  background-color: hsl(var(--sidebar-border));
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
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity, 1));
}

.focus-visible\\:tw-ring-ring:focus-visible {
  --tw-ring-color: hsl(var(--ring));
}

.focus-visible\\:tw-ring-sidebar-ring:focus-visible {
  --tw-ring-color: hsl(var(--sidebar-ring));
}

.focus-visible\\:tw-ring-offset-2:focus-visible {
  --tw-ring-offset-width: 2px;
}

.focus-visible\\:tw-ring-offset-background:focus-visible {
  --tw-ring-offset-color: hsl(var(--background));
}

.active\\:tw-bg-sidebar-accent:active {
  background-color: hsl(var(--sidebar-accent));
}

.active\\:tw-bg-white:active {
  --tw-bg-opacity: 1;
  background-color: rgb(255 255 255 / var(--tw-bg-opacity, 1));
}

.active\\:tw-text-sidebar-accent-foreground:active {
  color: hsl(var(--sidebar-accent-foreground));
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

.tw-group:hover .group-hover\\:tw-text-secondary-foreground {
  color: hsl(var(--secondary-foreground));
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

.has-\\[\\[data-variant\\=inset\\]\\]\\:tw-bg-sidebar:has([data-variant=inset]) {
  background-color: hsl(var(--sidebar-background));
}

.aria-disabled\\:tw-pointer-events-none[aria-disabled="true"] {
  pointer-events: none;
}

.aria-disabled\\:tw-opacity-50[aria-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\=true\\]\\:tw-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}

.data-\\[disabled\\]\\:tw-pointer-events-none[data-disabled] {
  pointer-events: none;
}

.data-\\[side\\=bottom\\]\\:tw-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=left\\]\\:tw--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=right\\]\\:tw-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[side\\=top\\]\\:tw--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=checked\\]\\:tw-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[state\\=unchecked\\]\\:tw-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.data-\\[active\\=true\\]\\:tw-bg-sidebar-accent[data-active="true"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity, 1));
}

.data-\\[selected\\=true\\]\\:tw-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=active\\]\\:tw-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}

.data-\\[state\\=checked\\]\\:tw-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}

.data-\\[state\\=on\\]\\:tw-bg-accent[data-state="on"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=open\\]\\:tw-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}

.data-\\[state\\=selected\\]\\:tw-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}

.data-\\[state\\=unchecked\\]\\:tw-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}

.data-\\[active\\=true\\]\\:tw-font-medium[data-active="true"] {
  font-weight: 500;
}

.data-\\[active\\=true\\]\\:tw-text-sidebar-accent-foreground[data-active="true"] {
  color: hsl(var(--sidebar-accent-foreground));
}

.data-\\[selected\\=true\\]\\:tw-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=active\\]\\:tw-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}

.data-\\[state\\=checked\\]\\:tw-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}

.data-\\[state\\=on\\]\\:tw-text-accent-foreground[data-state="on"] {
  color: hsl(var(--accent-foreground));
}

.data-\\[state\\=open\\]\\:tw-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}

.data-\\[disabled\\=true\\]\\:tw-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}

.data-\\[disabled\\]\\:tw-opacity-50[data-disabled] {
  opacity: 0.5;
}

.data-\\[state\\=open\\]\\:tw-opacity-100[data-state="open"] {
  opacity: 1;
}

.data-\\[state\\=active\\]\\:tw-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.data-\\[state\\=open\\]\\:tw-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}

.data-\\[state\\=closed\\]\\:tw-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}

.data-\\[state\\=open\\]\\:tw-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}

.data-\\[state\\=closed\\]\\:tw-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}

.data-\\[state\\=open\\]\\:tw-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}

.data-\\[side\\=bottom\\]\\:tw-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}

.data-\\[side\\=left\\]\\:tw-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}

.data-\\[side\\=right\\]\\:tw-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}

.data-\\[side\\=top\\]\\:tw-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:hover\\:tw-bg-sidebar-accent:hover[data-state="open"] {
  background-color: hsl(var(--sidebar-accent));
}

.data-\\[state\\=open\\]\\:hover\\:tw-text-sidebar-accent-foreground:hover[data-state="open"] {
  color: hsl(var(--sidebar-accent-foreground));
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-left-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  left: calc(var(--sidebar-width) * -1);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-right-\\[calc\\(var\\(--sidebar-width\\)\\*-1\\)\\] {
  right: calc(var(--sidebar-width) * -1);
}

.tw-group[data-side="left"] .group-data-\\[side\\=left\\]\\:tw--right-4 {
  right: -1rem;
}

.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-left-0 {
  left: 0px;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw--mt-8 {
  margin-top: -2rem;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-hidden {
  display: none;
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[--sidebar-width-icon\\] {
  width: var(--sidebar-width-icon);
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem);
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-w-\\[calc\\(var\\(--sidebar-width-icon\\)_\\+_theme\\(spacing\\.4\\)_\\+2px\\)\\] {
  width: calc(var(--sidebar-width-icon) + 1rem + 2px);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-w-0 {
  width: 0px;
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:tw-translate-x-0 {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-rotate-180 {
  --tw-rotate: 180deg;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-overflow-hidden {
  overflow: hidden;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-rounded-lg {
  border-radius: var(--radius);
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border {
  border-width: 1px;
}

.tw-group[data-side="left"] .group-data-\\[side\\=left\\]\\:tw-border-r {
  border-right-width: 1px;
}

.tw-group[data-side="right"] .group-data-\\[side\\=right\\]\\:tw-border-l {
  border-left-width: 1px;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
}

.tw-group[data-collapsible="icon"] .group-data-\\[collapsible\\=icon\\]\\:tw-opacity-0 {
  opacity: 0;
}

.tw-group[data-variant="floating"] .group-data-\\[variant\\=floating\\]\\:tw-shadow {
  --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
  --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:after\\:tw-left-full::after {
  content: var(--tw-content);
  left: 100%;
}

.tw-group[data-collapsible="offcanvas"] .group-data-\\[collapsible\\=offcanvas\\]\\:hover\\:tw-bg-sidebar:hover {
  background-color: hsl(var(--sidebar-background));
}

.tw-peer[data-variant="inset"] ~ .peer-data-\\[variant\\=inset\\]\\:tw-min-h-\\[calc\\(100svh-theme\\(spacing\\.4\\)\\)\\] {
  min-height: calc(100svh - 1rem);
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

  .md\\:tw-block {
    display: block;
  }

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

  .md\\:tw-opacity-0 {
    opacity: 0;
  }

  .after\\:md\\:tw-hidden::after {
    content: var(--tw-content);
    display: none;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-m-2 {
    margin: 0.5rem;
  }

  .tw-peer[data-state="collapsed"][data-variant="inset"] ~ .md\\:peer-data-\\[state\\=collapsed\\]\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-2 {
    margin-left: 0.5rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-ml-0 {
    margin-left: 0px;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-rounded-xl {
    border-radius: 0.75rem;
  }

  .tw-peer[data-variant="inset"] ~ .md\\:peer-data-\\[variant\\=inset\\]\\:tw-shadow {
    --tw-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);
    --tw-shadow-colored: 0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color);
    box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
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

.\\[\\&\\>span\\:last-child\\]\\:tw-truncate>span:last-child {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
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

.\\[\\&\\>svg\\]\\:tw-size-4>svg {
  width: 1rem;
  height: 1rem;
}

.\\[\\&\\>svg\\]\\:tw-shrink-0>svg {
  flex-shrink: 0;
}

.\\[\\&\\>svg\\]\\:tw-text-destructive>svg {
  color: hsl(var(--destructive));
}

.\\[\\&\\>svg\\]\\:tw-text-foreground>svg {
  color: hsl(var(--foreground));
}

.\\[\\&\\>svg\\]\\:tw-text-sidebar-accent-foreground>svg {
  color: hsl(var(--sidebar-accent-foreground));
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

[data-side=left][data-collapsible=offcanvas] .\\[\\[data-side\\=left\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--right-2 {
  right: -0.5rem;
}

[data-side=left][data-state=collapsed] .\\[\\[data-side\\=left\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
}

[data-side=left] .\\[\\[data-side\\=left\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}

[data-side=right][data-collapsible=offcanvas] .\\[\\[data-side\\=right\\]\\[data-collapsible\\=offcanvas\\]_\\&\\]\\:tw--left-2 {
  left: -0.5rem;
}

[data-side=right][data-state=collapsed] .\\[\\[data-side\\=right\\]\\[data-state\\=collapsed\\]_\\&\\]\\:tw-cursor-w-resize {
  cursor: w-resize;
}

[data-side=right] .\\[\\[data-side\\=right\\]_\\&\\]\\:tw-cursor-e-resize {
  cursor: e-resize;
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

.banded-row[data-state='selected']:hover {
  cursor: default;
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
  Mm as Alert,
  Bm as AlertDescription,
  Dm as AlertTitle,
  vh as BOOK_SELECTOR_STRING_KEYS,
  Vm as Badge,
  bh as BookChapterControl,
  Gc as BookSelectionMode,
  yh as BookSelector,
  mt as Button,
  Gs as Card,
  Ws as CardContent,
  Ys as CardDescription,
  qs as CardFooter,
  Hs as CardHeader,
  Xs as CardTitle,
  Uc as ChapterRangeSelector,
  To as Checkbox,
  Ih as Checklist,
  Kr as ComboBox,
  Zc as DataTable,
  Lh as DisableButton,
  cr as DropdownMenu,
  bo as DropdownMenuCheckboxItem,
  Rn as DropdownMenuContent,
  xc as DropdownMenuGroup,
  tr as DropdownMenuItem,
  Xm as DropdownMenuItemType,
  _n as DropdownMenuLabel,
  mh as DropdownMenuPortal,
  gh as DropdownMenuRadioGroup,
  Ri as DropdownMenuRadioItem,
  Pn as DropdownMenuSeparator,
  Ec as DropdownMenuShortcut,
  hh as DropdownMenuSub,
  kc as DropdownMenuSubContent,
  Nc as DropdownMenuSubTrigger,
  go as DropdownMenuTrigger,
  zh as EnableButton,
  Wh as FILTERABLE_RESOURCE_LIST_STRING_KEYS,
  li as Filter,
  Hm as FilterButton,
  Gh as FilterDropdown,
  qh as FilterableResourceList,
  Yh as Footer,
  _m as GridMenu,
  Im as HamburgerMenuButton,
  Eh as INVENTORY_STRING_KEYS,
  Ah as IconButton,
  Ze as Input,
  Vh as InstallButton,
  Th as Inventory,
  St as Label,
  Uh as MarkdownRenderer,
  Ls as MenuItem,
  Xh as MoreInfo,
  sd as MultiSelectComboBox,
  Sh as NavigationContentSearch,
  Hh as NoExtensionsFound,
  _i as RadioGroup,
  qr as RadioGroupItem,
  Oh as ScriptureResultsViewer,
  Rh as ScrollGroupSelector,
  So as SearchBar,
  Fe as Select,
  Ce as SelectContent,
  Xc as SelectGroup,
  Ut as SelectItem,
  Yc as SelectLabel,
  Di as SelectScrollDownButton,
  Mi as SelectScrollUpButton,
  Wc as SelectSeparator,
  Se as SelectTrigger,
  Ue as SelectValue,
  Co as Separator,
  _h as SettingsList,
  $h as SettingsListHeader,
  Ph as SettingsListItem,
  Od as SettingsSidebar,
  Ch as SettingsSidebarContentSearch,
  zm as Slider,
  Bh as Sonner,
  Pe as Spinner,
  Lm as Switch,
  $n as Table,
  An as TableBody,
  Jc as TableCaption,
  Vt as TableCell,
  Kc as TableFooter,
  we as TableHead,
  In as TableHeader,
  Jt as TableRow,
  jh as Tabs,
  Gm as TabsContent,
  Fm as TabsList,
  Um as TabsTrigger,
  Mh as TextField,
  Vi as ToggleGroup,
  Kn as ToggleGroupItem,
  Dh as Toolbar,
  Kh as UiLanguageSelector,
  Fh as UpdateButton,
  Ym as VersionHistory,
  zi as VerticalTabs,
  Fi as VerticalTabsContent,
  Li as VerticalTabsList,
  ld as VerticalTabsTrigger,
  jm as badgeVariants,
  Mc as buttonVariants,
  N as cn,
  ed as getBookNumFromId,
  td as getLinesFromUSFM,
  ma as getNumberFromUSFM,
  nd as getStatusForItem,
  Nh as inventoryCountColumn,
  xh as inventoryItemColumn,
  kh as inventoryStatusColumn,
  eg as sonner,
  Jh as useEvent,
  Zh as useEventAsync,
  co as usePromise
};
//# sourceMappingURL=index.js.map
