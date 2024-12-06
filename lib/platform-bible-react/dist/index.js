import Ui, { jsx as i, jsxs as x, Fragment as lt } from "react/jsx-runtime";
import * as j from "react";
import M, { forwardRef as lr, useCallback as Ie, useState as ie, useRef as vt, useEffect as Ke, useLayoutEffect as ra, useMemo as Ne } from "react";
import { History as Gi, ChevronRight as ts, Check as Cn, Circle as ns, ArrowDownWideNarrow as Hi, Clock as Xi, Bookmark as Yi, X as rs, Search as lo, ChevronsUpDown as Qn, FilterIcon as Wi, ChevronDown as Vt, ChevronUp as Xr, ArrowLeftIcon as qi, ChevronLeftIcon as Ki, ChevronRightIcon as Ji, ArrowRightIcon as Zi, CircleCheckIcon as Qi, CircleXIcon as el, CircleHelpIcon as tl, ArrowUpIcon as nl, ArrowDownIcon as rl, ArrowUpDownIcon as ol, Star as al, ChevronLeft as sl, LoaderCircle as il, Download as ll, Filter as cl, User as dl, Link as ul, CircleHelp as pl, BookOpen as oa, Loader as wl, Ellipsis as fl } from "lucide-react";
import yt, { clsx as ml } from "clsx";
import { extendTailwindMerge as hl } from "tailwind-merge";
import * as me from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as gl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as bl, deepEqual as co, substring as vl, formatScrRef as _r, compareScrRefs as Yr, scrRefToBBBCCCVVV as Pr, getLocalizeKeyForScrollGroupId as pe, NumberFormat as yl, formatBytes as xl, getErrorMessage as Nl } from "platform-bible-utils";
import { Slot as kl } from "@radix-ui/react-slot";
import { cva as Sn } from "class-variance-authority";
import * as os from "@radix-ui/react-label";
import * as gn from "@radix-ui/react-radio-group";
import * as bn from "@radix-ui/react-popover";
import { Command as Oe } from "cmdk";
import * as Je from "@radix-ui/react-dialog";
import { useReactTable as as, getCoreRowModel as ss, getPaginationRowModel as El, getSortedRowModel as is, getFilteredRowModel as Tl, flexRender as pn, getExpandedRowModel as Cl, getGroupedRowModel as Sl } from "@tanstack/react-table";
import * as ve from "@radix-ui/react-select";
import * as Wr from "@radix-ui/react-checkbox";
import * as cr from "@radix-ui/react-toggle-group";
import * as ls from "@radix-ui/react-toggle";
import * as Re from "@radix-ui/react-tabs";
import * as cs from "@radix-ui/react-separator";
import Ol, { ThemeContext as Rl, internal_processStyles as _l } from "@mui/styled-engine";
import { MenuItem as Pl, ListItemText as $l, ListItemIcon as ds, Menu as Il, Grid as us, List as Al, IconButton as ps, Drawer as Dl, AppBar as Ml, Toolbar as Bl } from "@mui/material";
import * as jl from "react-dom";
import Un from "react-dom";
import { Toaster as Vl } from "sonner";
import { toast as fh } from "sonner";
import * as ln from "@radix-ui/react-slider";
import * as qr from "@radix-ui/react-switch";
import Ll from "markdown-to-jsx";
const Fl = hl({ prefix: "tw-" });
function C(...e) {
  return Fl(ml(e));
}
const qt = M.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ i(
    "input",
    {
      type: t,
      className: C(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
qt.displayName = "Input";
const zl = lr(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ x("div", { className: "tw-relative", children: [
    /* @__PURE__ */ i(
      qt,
      {
        ...o,
        type: "text",
        className: "tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",
        onChange: (s) => e(s.target.value),
        onKeyDown: (s) => {
          s.key === "Enter" && r(), t(s);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ i(
      Gi,
      {
        className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Ul = Object.defineProperty, Gl = (e, t, n) => t in e ? Ul(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, ne = (e, t, n) => Gl(e, typeof t != "symbol" ? t + "" : t, n);
const Nt = [
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
], aa = ec();
function Kt(e, t = !0) {
  return t && (e = e.toUpperCase()), e in aa ? aa[e] : 0;
}
function po(e) {
  return Kt(e) > 0;
}
function Hl(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return t >= 40 && t <= 66;
}
function Xl(e) {
  return (typeof e == "string" ? Kt(e) : e) <= 39;
}
function fs(e) {
  return e <= 66;
}
function Yl(e) {
  const t = typeof e == "string" ? Kt(e) : e;
  return gs(t) && !fs(t);
}
function* Wl() {
  for (let e = 1; e <= Nt.length; e++)
    yield e;
}
const ql = 1, ms = Nt.length;
function Kl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function wo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Nt.length ? t : Nt[n];
}
function hs(e) {
  return e <= 0 || e > ms ? "******" : ws[e - 1];
}
function Jl(e) {
  return hs(Kt(e));
}
function gs(e) {
  const t = typeof e == "number" ? wo(e) : e;
  return po(t) && !uo.includes(t);
}
function Zl(e) {
  const t = typeof e == "number" ? wo(e) : e;
  return po(t) && uo.includes(t);
}
function Ql(e) {
  return ws[e - 1].includes("*obsolete*");
}
function ec() {
  const e = {};
  for (let t = 0; t < Nt.length; t++)
    e[Nt[t]] = t + 1;
  return e;
}
const se = {
  allBookIds: Nt,
  nonCanonicalIds: uo,
  bookIdToNumber: Kt,
  isBookIdValid: po,
  isBookNT: Hl,
  isBookOT: Xl,
  isBookOTNT: fs,
  isBookDC: Yl,
  allBookNumbers: Wl,
  firstBook: ql,
  lastBook: ms,
  extraBooks: Kl,
  bookNumberToId: wo,
  bookNumberToEnglishName: hs,
  bookIdToEnglishName: Jl,
  isCanonical: gs,
  isExtraMaterial: Zl,
  isObsolete: Ql
};
var Ye = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ye || {});
const Pe = class {
  // private versInfo: Versification;
  constructor(t) {
    if (ne(this, "name"), ne(this, "fullPath"), ne(this, "isPresent"), ne(this, "hasVerseSegments"), ne(this, "isCustomized"), ne(this, "baseVersification"), ne(this, "scriptureBooks"), ne(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Ye[t]) : (this._type = t, this.name = Ye[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
ne(Pe, "Original", new Pe(Ye.Original)), ne(Pe, "Septuagint", new Pe(Ye.Septuagint)), ne(Pe, "Vulgate", new Pe(Ye.Vulgate)), ne(Pe, "English", new Pe(Ye.English)), ne(Pe, "RussianProtestant", new Pe(Ye.RussianProtestant)), ne(Pe, "RussianOrthodox", new Pe(Ye.RussianOrthodox));
let ft = Pe;
function sa(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var bs = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(bs || {});
const Te = class ae {
  constructor(t, n, r, o) {
    if (ne(this, "firstChapter"), ne(this, "lastChapter"), ne(this, "lastVerse"), ne(this, "hasSegmentsDefined"), ne(this, "text"), ne(this, "BBBCCCVVVS"), ne(this, "longHashCode"), ne(this, "versification"), ne(this, "rtlMark", "‏"), ne(this, "_bookNum", 0), ne(this, "_chapterNum", 0), ne(this, "_verseNum", 0), ne(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, s = n != null && n instanceof ft ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = n != null && n instanceof ft ? n : void 0;
        this.setEmpty(a), this._verseNum = t % ae.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ae.bookDigitShifter / ae.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ae.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof ae) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof ft ? t : ae.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ae.defaultVersification;
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
      return n = new ae(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof nn)
        return n = new ae(), { success: !1, verseRef: n };
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
    return t % ae.bcvMaxValue * ae.bookDigitShifter + (n >= 0 ? n % ae.bcvMaxValue * ae.chapterDigitShifter : 0) + (r >= 0 ? r % ae.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = t, l = a || o.toString();
    let c;
    return s && (c = new ft(s)), n ? new ae(n, r.toString(), l, c) : new ae();
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
      if (n = n * 10 + +r - 0, n > ae.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ae.verseRangeSeparator) || this._verse.includes(ae.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return se.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = se.bookIdToNumber(t);
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
    const { success: n, vNum: r } = ae.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ae.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > se.lastBook)
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
    this.versification = this.versification != null ? new ft(t) : void 0;
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
    return this.validateVerse(ae.verseRangeSeparators, ae.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ae.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ae.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const s = +a[1].trim();
          this.versification = new ft(Ye[s]);
        } catch {
          throw new nn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new nn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || se.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ae.isVerseParseable(r[1]))
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
    return new ae(this);
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
    return t instanceof ae ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = ae.verseRangeSeparators, r = ae.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = sa(this._verse, r);
    for (const s of a.map((l) => sa(l, n))) {
      const l = this.clone();
      l.verse = s[0];
      const c = l.verseNum;
      if (o.push(l), s.length > 1) {
        const d = this.clone();
        if (d.verse = s[1], !t)
          for (let u = c + 1; u < d.verseNum; u++) {
            const h = new ae(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(h);
          }
        o.push(d);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > se.lastBook ? 2 : (se.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ae.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = se.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
ne(Te, "defaultVersification", ft.English), ne(Te, "verseRangeSeparator", "-"), ne(Te, "verseSequenceIndicator", ","), ne(Te, "verseRangeSeparators", [Te.verseRangeSeparator]), ne(Te, "verseSequenceIndicators", [Te.verseSequenceIndicator]), ne(Te, "chapterDigitShifter", 1e3), ne(Te, "bookDigitShifter", Te.chapterDigitShifter * Te.chapterDigitShifter), ne(Te, "bcvMaxValue", Te.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
ne(Te, "ValidStatusType", bs);
class nn extends Error {
}
const vn = me.Root, er = me.Trigger, tc = me.Group, Om = me.Portal, Rm = me.Sub, _m = me.RadioGroup, nc = M.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ x(
  me.SubTrigger,
  {
    ref: o,
    className: C(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      t && "tw-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ i(ts, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
nc.displayName = me.SubTrigger.displayName;
const rc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  me.SubContent,
  {
    ref: n,
    className: C(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
rc.displayName = me.SubContent.displayName;
const Lt = M.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ i(me.Portal, { children: /* @__PURE__ */ i(
  me.Content,
  {
    ref: r,
    sideOffset: t,
    className: C(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Lt.displayName = me.Content.displayName;
const tr = M.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ i(
  me.Item,
  {
    ref: r,
    className: C(
      // removed: tw-relative tw-flex focus:tw-text-accent-foreground
      "tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
tr.displayName = me.Item.displayName;
const dr = M.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ x(
  me.CheckboxItem,
  {
    ref: o,
    className: C(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(me.ItemIndicator, { children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
dr.displayName = me.CheckboxItem.displayName;
const vs = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(
  me.RadioItem,
  {
    ref: r,
    className: C(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(me.ItemIndicator, { children: /* @__PURE__ */ i(ns, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
vs.displayName = me.RadioItem.displayName;
const On = M.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ i(
  me.Label,
  {
    ref: r,
    className: C("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
On.displayName = me.Label.displayName;
const Rn = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  me.Separator,
  {
    ref: n,
    className: C("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Rn.displayName = me.Separator.displayName;
function oc({ className: e, ...t }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: C("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
oc.displayName = "DropdownMenuShortcut";
const ac = lr(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s
  }, l) => /* @__PURE__ */ x(
    tr,
    {
      ref: l,
      textValue: e,
      className: C("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
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
        /* @__PURE__ */ i(
          "span",
          {
            className: C(
              "tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-l-red-200": a.toLowerCase() === "ot",
                "tw-border-l-purple-200": a.toLowerCase() === "nt",
                "tw-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: se.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ i("div", { children: s })
      ]
    },
    e
  )
);
function sc({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), s = Ie(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ i("div", { className: C("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ i(
    "div",
    {
      className: C(
        "tw-box-content tw-flex tw-h-4 tw-w-4 tw-cursor-pointer tw-items-center tw-justify-end tw-rounded-md tw-p-2 tw-text-amber-800",
        {
          "tw-font-semibold tw-text-amber-900": l === n,
          "tw-bg-amber-200": l === r
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
function ic({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ x(On, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ i("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(
        Hi,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        Xi,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        Yi,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const wn = se.allBookIds, lc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ia = ["OT", "NT", "DC"], cc = 32 + 32 + 32, dc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], uc = (e) => ({
  OT: wn.filter((n) => se.isBookOT(n)),
  NT: wn.filter((n) => se.isBookNT(n)),
  DC: wn.filter((n) => se.isBookDC(n))
})[e], rn = (e) => bl(se.bookIdToNumber(e));
function pc() {
  return wn.map((t) => se.bookIdToEnglishName(t));
}
function wc(e) {
  return pc().includes(e);
}
function fc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (wc(t))
    return wn.find((r) => se.bookIdToEnglishName(r) === t);
}
function Pm({ scrRef: e, handleSubmit: t }) {
  const [n, r] = ie(""), [o, a] = ie(
    se.bookNumberToId(e.bookNum)
  ), [s, l] = ie(e.chapterNum ?? 0), [c, d] = ie(
    se.bookNumberToId(e.bookNum)
  ), [u, h] = ie(!1), [w, b] = ie(u), v = vt(void 0), f = vt(void 0), m = vt(void 0), N = Ie(
    (k) => uc(k).filter((B) => {
      const D = se.bookIdToEnglishName(B).toLowerCase(), Q = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return D.includes(Q) || // Match book name
      B.toLowerCase().includes(Q);
    }),
    [n]
  ), A = (k) => {
    r(k);
  }, _ = vt(!1), E = Ie((k) => {
    if (_.current) {
      _.current = !1;
      return;
    }
    h(k);
  }, []), g = Ie(
    (k, B, D, Q) => {
      if (l(
        se.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), B || rn(k) === -1) {
        t({
          bookNum: se.bookIdToNumber(k),
          chapterNum: D || 1,
          verseNum: Q || 1
        }), h(!1), r("");
        return;
      }
      a(o !== k ? k : ""), h(!B);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), I = (k) => {
    k <= 0 || k > rn(o) || g(o, !0, k);
  }, U = Ie(() => {
    dc.forEach((k) => {
      const B = n.match(k);
      if (B) {
        const [D, Q = void 0, J = void 0] = B.slice(1), X = fc(D);
        (se.isBookIdValid(D) || X) && g(
          X ?? D,
          !0,
          Q ? parseInt(Q, 10) : 1,
          J ? parseInt(J, 10) : 1
        );
      }
    });
  }, [g, n]), W = Ie(
    (k) => {
      u ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof f < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      f.current !== null && f.current.focus(), k.preventDefault()) : h(!0);
    },
    [u]
  ), O = (k) => {
    const { key: B } = k;
    B === "ArrowRight" || B === "ArrowLeft" || B === "ArrowDown" || B === "ArrowUp" || B === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: B })), v.current.focus());
  }, P = (k) => {
    const { key: B } = k;
    if (c === o) {
      if (B === "Enter") {
        k.preventDefault(), g(o, !0, s);
        return;
      }
      let D = 0;
      if (B === "ArrowRight")
        if (s < rn(c))
          D = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (B === "ArrowLeft")
        if (s > 1)
          D = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        B === "ArrowDown" ? D = 6 : B === "ArrowUp" && (D = -6);
      s + D <= 0 || s + D > rn(c) ? l(0) : D !== 0 && (l(s + D), k.preventDefault());
    }
  };
  return Ke(() => {
    o === c ? o === se.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), ra(() => {
    b(u);
  }, [u]), ra(() => {
    const k = setTimeout(() => {
      if (w && f.current && m.current) {
        const D = m.current.offsetTop - cc;
        f.current.scrollTo({ top: D, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [w]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ x(vn, { modal: !1, open: u, onOpenChange: E, children: [
    /* @__PURE__ */ i(er, { asChild: !0, children: /* @__PURE__ */ i(
      zl,
      {
        ref: v,
        value: n,
        handleSearch: A,
        handleKeyDown: W,
        handleOnClick: () => {
          a(se.bookNumberToId(e.bookNum)), d(se.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), h(!0), v.current.focus();
        },
        onFocus: () => {
          _.current = !0;
        },
        handleSubmit: U,
        placeholder: `${se.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ x(
      Lt,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: O,
        align: "start",
        ref: f,
        children: [
          /* @__PURE__ */ i(
            ic,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ia.map(
            (k, B) => N(k).length > 0 && /* @__PURE__ */ x("div", { children: [
              /* @__PURE__ */ i(On, { className: "tw-font-semibold tw-text-foreground/80", children: lc[k] }),
              N(k).map((D) => /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
                ac,
                {
                  bookId: D,
                  handleSelectBook: () => g(D, !1),
                  isSelected: o === D,
                  handleHighlightBook: () => d(D),
                  handleKeyDown: P,
                  bookType: k,
                  ref: (Q) => {
                    o === D && (m.current = Q);
                  },
                  children: /* @__PURE__ */ i(
                    sc,
                    {
                      handleSelectChapter: I,
                      endChapter: rn(D),
                      activeChapter: e.bookNum === se.bookIdToNumber(D) ? e.chapterNum : 0,
                      highlightedChapter: s,
                      handleHighlightedChapter: (Q) => {
                        l(Q);
                      }
                    }
                  )
                }
              ) }, D)),
              ia.length - 1 !== B ? /* @__PURE__ */ i(Rn, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const mc = Sn(
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
), fe = M.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? kl : "button", { className: C(mc({ variant: t, size: n, className: e })), ref: a, ...o })
);
fe.displayName = "Button";
const hc = Sn(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), De = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(os.Root, { ref: n, className: C("pr-twp", hc(), e), ...t }));
De.displayName = os.Root.displayName;
const ys = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  gn.Root,
  {
    className: C("pr-twp tw-grid tw-gap-2", e),
    ...t,
    ref: n
  }
));
ys.displayName = gn.Root.displayName;
const Kr = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  gn.Item,
  {
    ref: n,
    className: C(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ i(gn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(ns, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Kr.displayName = gn.Item.displayName;
const xs = bn.Root, Ns = bn.Trigger, fo = M.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ i(bn.Portal, { children: /* @__PURE__ */ i(
  bn.Content,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: C(
      "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
fo.displayName = bn.Content.displayName;
const gc = Je.Portal, ks = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Je.Overlay,
  {
    ref: n,
    className: C(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
ks.displayName = Je.Overlay.displayName;
const bc = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(gc, { children: [
  /* @__PURE__ */ i(ks, {}),
  /* @__PURE__ */ x(
    Je.Content,
    {
      ref: r,
      className: C(
        "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ x(Je.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ i(rs, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
bc.displayName = Je.Content.displayName;
const vc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Je.Title,
  {
    ref: n,
    className: C("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
vc.displayName = Je.Title.displayName;
const yc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Je.Description,
  {
    ref: n,
    className: C("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
yc.displayName = Je.Description.displayName;
const mo = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Oe,
  {
    ref: n,
    className: C(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
mo.displayName = Oe.displayName;
const ho = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ i(lo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ i(
    Oe.Input,
    {
      ref: n,
      className: C(
        "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
ho.displayName = Oe.Input.displayName;
const go = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Oe.List,
  {
    ref: n,
    className: C("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
go.displayName = Oe.List.displayName;
const bo = M.forwardRef((e, t) => /* @__PURE__ */ i(Oe.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
bo.displayName = Oe.Empty.displayName;
const Es = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Oe.Group,
  {
    ref: n,
    className: C(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Es.displayName = Oe.Group.displayName;
const xc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Oe.Separator,
  {
    ref: n,
    className: C("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
xc.displayName = Oe.Separator.displayName;
const vo = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Oe.Item,
  {
    ref: n,
    className: C(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
vo.displayName = Oe.Item.displayName;
function Nc(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Jr({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: a = Nc,
  icon: s = void 0,
  buttonPlaceholder: l = "",
  textPlaceholder: c = "",
  commandEmptyMessage: d = "No option found",
  buttonVariant: u = "outline",
  alignDropDown: h = "start",
  dir: w = "ltr",
  isDisabled: b = !1,
  ...v
}) {
  const [f, m] = ie(!1);
  return /* @__PURE__ */ x(xs, { open: f, onOpenChange: m, ...v, children: [
    /* @__PURE__ */ i(Ns, { asChild: !0, children: /* @__PURE__ */ x(
      fe,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": f,
        id: e,
        className: C(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            s && /* @__PURE__ */ i("div", { className: "tw-pr-2", children: s }),
            /* @__PURE__ */ i("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: r ? a(r) : l })
          ] }),
          /* @__PURE__ */ i(Qn, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(fo, { align: h, className: "tw-w-[200px] tw-p-0", dir: w, children: /* @__PURE__ */ x(mo, { children: [
      /* @__PURE__ */ i(ho, { dir: w, placeholder: c, className: "tw-text-inherit" }),
      /* @__PURE__ */ i(bo, { children: d }),
      /* @__PURE__ */ i(go, { children: t.map((N) => /* @__PURE__ */ x(
        vo,
        {
          value: a(N),
          onSelect: () => {
            o(N), m(!1);
          },
          children: [
            /* @__PURE__ */ i(
              Cn,
              {
                className: C("tw-me-2 tw-h-4 tw-w-4", {
                  "tw-opacity-0": !r || a(r) !== a(N)
                })
              }
            ),
            a(N)
          ]
        },
        a(N)
      )) })
    ] }) })
  ] });
}
function kc({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const s = Ne(
    () => Array.from({ length: a }, (d, u) => u + 1),
    [a]
  );
  return /* @__PURE__ */ x(lt, { children: [
    /* @__PURE__ */ i(De, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ i(
      Jr,
      {
        isDisabled: o,
        onChange: (d) => {
          n(d), d > t && r(d);
        },
        className: "tw-ml-2 tw-mr-2 tw-w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ i(De, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ i(
      Jr,
      {
        isDisabled: o,
        onChange: (d) => {
          r(d), d < e && n(d);
        },
        className: "tw-ml-2 tw-w-20",
        options: s,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var Ec = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Ec || {});
const $m = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), $r = (e, t) => e[t] ?? t;
function Im({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const u = $r(d, "%webView_bookSelector_currentBook%"), h = $r(d, "%webView_bookSelector_choose%"), w = $r(d, "%webView_bookSelector_chooseBooks%"), [b, v] = ie(
    "current book"
    /* CURRENT_BOOK */
  ), f = (m) => {
    v(m), e(m);
  };
  return /* @__PURE__ */ i(
    ys,
    {
      className: "pr-twp tw-flex",
      value: b,
      onValueChange: (m) => f(m),
      children: /* @__PURE__ */ x("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(Kr, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ i(De, { className: "tw-ml-1", children: u })
          ] }),
          /* @__PURE__ */ i(De, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            kc,
            {
              isDisabled: b === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(Kr, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ i(De, { className: "tw-ml-1", children: w })
          ] }),
          /* @__PURE__ */ i(De, { className: "tw-flex tw-items-center", children: r.map((m) => se.bookIdToEnglishName(m)).join(", ") }),
          /* @__PURE__ */ i(
            fe,
            {
              disabled: b === "current book",
              onClick: () => n(),
              children: h
            }
          )
        ] })
      ] })
    }
  );
}
function Tc({ table: e }) {
  return /* @__PURE__ */ x(vn, { children: [
    /* @__PURE__ */ i(gl, { asChild: !0, children: /* @__PURE__ */ x(fe, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(Wi, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ x(Lt, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(On, { children: "Toggle columns" }),
      /* @__PURE__ */ i(Rn, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ i(
        dr,
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
const yn = ve.Root, Cc = ve.Group, xn = ve.Value, Ft = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(
  ve.Trigger,
  {
    ref: r,
    className: C(
      "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ i(ve.Icon, { asChild: !0, children: /* @__PURE__ */ i(Vt, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
Ft.displayName = ve.Trigger.displayName;
const Ts = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  ve.ScrollUpButton,
  {
    ref: n,
    className: C("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ i(Xr, { className: "tw-h-4 tw-w-4" })
  }
));
Ts.displayName = ve.ScrollUpButton.displayName;
const Cs = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  ve.ScrollDownButton,
  {
    ref: n,
    className: C("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ i(Vt, { className: "tw-h-4 tw-w-4" })
  }
));
Cs.displayName = ve.ScrollDownButton.displayName;
const zt = M.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ i(ve.Portal, { children: /* @__PURE__ */ x(
  ve.Content,
  {
    ref: o,
    className: C(
      "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ i(Ts, {}),
      /* @__PURE__ */ i(
        ve.Viewport,
        {
          className: C(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ i(Cs, {})
    ]
  }
) }));
zt.displayName = ve.Content.displayName;
const Sc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  ve.Label,
  {
    ref: n,
    className: C("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
Sc.displayName = ve.Label.displayName;
const Xe = M.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(
  ve.Item,
  {
    ref: r,
    className: C(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(ve.ItemIndicator, { children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ i(ve.ItemText, { children: t })
    ]
  }
));
Xe.displayName = ve.Item.displayName;
const Oc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  ve.Separator,
  {
    ref: n,
    className: C("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
Oc.displayName = ve.Separator.displayName;
function Rc({ table: e }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ i("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ x(
        yn,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ i(Ft, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ i(xn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ i(zt, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ i(Xe, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ x(
        fe,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ i(qi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        fe,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ i(Ki, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        fe,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ i(Ji, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        fe,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ i(Zi, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const _n = M.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ i("div", { className: C("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !t }), children: /* @__PURE__ */ i(
  "table",
  {
    ref: r,
    className: C("tw-w-full tw-caption-bottom tw-text-sm", e),
    ...n
  }
) }));
_n.displayName = "Table";
const Pn = M.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ i(
  "thead",
  {
    ref: r,
    className: C(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": t },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
Pn.displayName = "TableHeader";
const $n = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("tbody", { ref: n, className: C("[&_tr:last-child]:tw-border-0", e), ...t }));
$n.displayName = "TableBody";
const _c = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "tfoot",
  {
    ref: n,
    className: C("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
_c.displayName = "TableFooter";
const We = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "tr",
    {
      ref: n,
      className: C(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        e
      ),
      ...t
    }
  )
);
We.displayName = "TableRow";
const je = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "th",
  {
    ref: n,
    className: C(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
je.displayName = "TableHead";
const $e = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: C("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
$e.displayName = "TableCell";
const Pc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  "caption",
  {
    ref: n,
    className: C("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
Pc.displayName = "TableCaption";
function $c({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: s = () => {
  }
}) {
  var m;
  const [l, c] = ie([]), [d, u] = ie([]), [h, w] = ie({}), [b, v] = ie({}), f = as({
    data: t,
    columns: e,
    getCoreRowModel: ss(),
    ...n && { getPaginationRowModel: El() },
    onSortingChange: c,
    getSortedRowModel: is(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Tl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: v,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: h,
      rowSelection: b
    }
  });
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(Tc, { table: f }),
    /* @__PURE__ */ x(_n, { stickyHeader: a, children: [
      /* @__PURE__ */ i(Pn, { stickyHeader: a, children: f.getHeaderGroups().map((N) => /* @__PURE__ */ i(We, { children: N.headers.map((A) => /* @__PURE__ */ i(je, { children: A.isPlaceholder ? void 0 : pn(A.column.columnDef.header, A.getContext()) }, A.id)) }, N.id)) }),
      /* @__PURE__ */ i($n, { children: (m = f.getRowModel().rows) != null && m.length ? f.getRowModel().rows.map((N) => /* @__PURE__ */ i(
        We,
        {
          onClick: () => s(N, f),
          "data-state": N.getIsSelected() && "selected",
          children: N.getVisibleCells().map((A) => /* @__PURE__ */ i($e, { children: pn(A.column.columnDef.cell, A.getContext()) }, A.id))
        },
        N.id
      )) : /* @__PURE__ */ i(We, { children: /* @__PURE__ */ i($e, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ i(
        fe,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.previousPage(),
          disabled: !f.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ i(
        fe,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.nextPage(),
          disabled: !f.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ i(Rc, { table: f })
  ] });
}
function Ic({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Ne(() => {
    const s = [];
    return e.forEach((l) => {
      s.some((c) => co(c, l)) || s.push(l);
    }), s;
  }, [e]);
  return /* @__PURE__ */ x(_n, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(Pn, { stickyHeader: !0, children: /* @__PURE__ */ x(We, { children: [
      /* @__PURE__ */ i(je, { children: r }),
      /* @__PURE__ */ i(je, { children: o })
    ] }) }),
    /* @__PURE__ */ i($n, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ x(
      We,
      {
        onClick: () => {
          t(s.reference);
        },
        children: [
          /* @__PURE__ */ i($e, { children: `${se.bookNumberToEnglishName(s.reference.bookNum)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ i($e, { children: s.text })
        ]
      },
      `${s.reference.bookNum} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const yo = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Wr.Root,
  {
    ref: n,
    className: C(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ i(
      Wr.Indicator,
      {
        className: C("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ i(Cn, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
yo.displayName = Wr.Root.displayName;
const Ac = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), la = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, Dc = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? se.bookIdToNumber(t[1]) : 0;
}, Mc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", Ss = Sn(
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
), Bc = M.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ i(
  ls.Root,
  {
    ref: o,
    className: C(Ss({ variant: t, size: n, className: e })),
    ...r
  }
));
Bc.displayName = ls.Root.displayName;
const Os = M.createContext({
  size: "default",
  variant: "default"
}), Rs = M.forwardRef(({ className: e, variant: t, size: n, children: r, ...o }, a) => /* @__PURE__ */ i(
  cr.Root,
  {
    ref: a,
    className: C("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
    ...o,
    children: /* @__PURE__ */ i(
      Os.Provider,
      {
        value: { variant: t, size: n },
        children: r
      }
    )
  }
));
Rs.displayName = cr.Root.displayName;
const qn = M.forwardRef(({ className: e, children: t, variant: n, size: r, ...o }, a) => {
  const s = M.useContext(Os);
  return /* @__PURE__ */ i(
    cr.Item,
    {
      ref: a,
      className: C(
        Ss({
          variant: s.variant || n,
          size: s.size || r
        }),
        e
      ),
      ...o,
      children: t
    }
  );
});
qn.displayName = cr.Item.displayName;
const ur = (e) => e === "asc" ? /* @__PURE__ */ i(nl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ i(rl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(ol, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Am = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ x(fe, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    ur(t.getIsSorted())
  ] })
}), jc = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ x(fe, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    ur(n.getIsSorted())
  ] })
}), Dm = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ x(fe, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    ur(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Ir = (e, t, n, r, o, a) => {
  let s = [...n];
  e.forEach((c) => {
    t === "approved" ? s.includes(c) || s.push(c) : s = s.filter((d) => d !== c);
  }), r(s);
  let l = [...o];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, Mm = (e, t, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ x(fe, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    e,
    ur(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const s = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ x(Rs, { value: s, variant: "outline", type: "single", children: [
      /* @__PURE__ */ i(
        qn,
        {
          onClick: () => Ir(
            [l],
            "approved",
            t,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ i(Qi, {})
        }
      ),
      /* @__PURE__ */ i(
        qn,
        {
          onClick: () => Ir(
            [l],
            "unapproved",
            t,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ i(el, {})
        }
      ),
      /* @__PURE__ */ i(
        qn,
        {
          onClick: () => Ir(
            [l],
            "unknown",
            t,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ i(tl, {})
        }
      )
    ] });
  }
}), Bm = Object.freeze([
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
]), Vc = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, Lc = (e, t, n, r, o) => {
  if (!e)
    return [];
  const a = [];
  let s = t.bookNum, l = t.chapterNum, c = t.verseNum;
  return Ac(e).forEach((u) => {
    u.startsWith("\\id") && (s = Dc(u), l = 0, c = 0), u.startsWith("\\c") && (l = la(u), c = 0), u.startsWith("\\v") && (c = la(u), l === 0 && (l = t.chapterNum));
    let h = o.exec(u) ?? void 0;
    for (; h; ) {
      const w = [];
      h.forEach((m) => w.push(m));
      const b = h.index, v = a.find((m) => co(m.items, w)), f = {
        reference: {
          bookNum: s !== void 0 ? s : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: vl(u, Math.max(0, b - 25), Math.min(b + 25, u.length))
      };
      if (v)
        v.count += 1, v.occurrences.push(f);
      else {
        const m = {
          items: w,
          count: 1,
          status: Mc(w[0], n, r),
          occurrences: [f]
        };
        a.push(m);
      }
      h = o.exec(u) ?? void 0;
    }
  }), a;
}, tt = (e, t) => e[t] ?? t;
function jm({
  scriptureReference: e,
  setScriptureReference: t,
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
  const h = tt(n, "%webView_inventory_all%"), w = tt(n, "%webView_inventory_approved%"), b = tt(n, "%webView_inventory_unapproved%"), v = tt(n, "%webView_inventory_unknown%"), f = tt(n, "%webView_inventory_scope_currentBook%"), m = tt(n, "%webView_inventory_scope_chapter%"), N = tt(n, "%webView_inventory_scope_verse%"), A = tt(n, "%webView_inventory_filter_text%"), _ = tt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [E, g] = ie(!1), [I, U] = ie("all"), [W, O] = ie(""), [P, k] = ie([]), B = Ne(() => l ? r instanceof RegExp ? Lc(
    l,
    e,
    a,
    s,
    r
  ) : r(l, e, a, s) : [], [l, r, e, a, s]), D = Ne(() => {
    if (E)
      return B;
    const y = [];
    return B.forEach((R) => {
      const H = R.items[0], G = y.find(
        (z) => z.items[0] === H
      );
      G ? (G.count += R.count, G.occurrences = G.occurrences.concat(R.occurrences)) : y.push({
        items: [H],
        count: R.count,
        occurrences: R.occurrences,
        status: R.status
      });
    }), y;
  }, [E, B]), Q = Ne(() => Vc(D, I, W), [D, I, W]), J = Ne(() => {
    var H, G;
    if (!E)
      return u;
    const y = (H = o == null ? void 0 : o.tableHeaders) == null ? void 0 : H.length;
    if (!y)
      return u;
    const R = [];
    for (let z = 0; z < y; z++)
      R.push(
        jc(
          ((G = o == null ? void 0 : o.tableHeaders) == null ? void 0 : G[z]) || "Additional Item",
          z + 1
        )
      );
    return [...R, ...u];
  }, [o == null ? void 0 : o.tableHeaders, u, E]);
  Ke(() => {
    k([]);
  }, [Q]);
  const X = (y, R) => {
    R.setRowSelection(() => {
      const H = {};
      return H[y.index] = !0, H;
    }), k(y.original.items);
  }, ee = (y) => {
    if (y === "book" || y === "chapter" || y === "verse")
      d(y);
    else
      throw new Error(`Invalid scope value: ${y}`);
  }, re = (y) => {
    if (y === "all" || y === "approved" || y === "unapproved" || y === "unknown")
      U(y);
    else
      throw new Error(`Invalid status filter value: ${y}`);
  }, oe = Ne(() => {
    if (D.length === 0 || P.length === 0)
      return [];
    const y = D.filter((R) => co(
      E ? R.items : [R.items[0]],
      P
    ));
    if (y.length > 1)
      throw new Error("Selected item is not unique");
    return y[0].occurrences;
  }, [P, E, D]);
  return /* @__PURE__ */ x("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ x(
        yn,
        {
          onValueChange: (y) => re(y),
          defaultValue: I,
          children: [
            /* @__PURE__ */ i(Ft, { className: "tw-m-1", children: /* @__PURE__ */ i(xn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ x(zt, { children: [
              /* @__PURE__ */ i(Xe, { value: "all", children: h }),
              /* @__PURE__ */ i(Xe, { value: "approved", children: w }),
              /* @__PURE__ */ i(Xe, { value: "unapproved", children: b }),
              /* @__PURE__ */ i(Xe, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ x(yn, { onValueChange: (y) => ee(y), defaultValue: c, children: [
        /* @__PURE__ */ i(Ft, { className: "tw-m-1", children: /* @__PURE__ */ i(xn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ x(zt, { children: [
          /* @__PURE__ */ i(Xe, { value: "book", children: f }),
          /* @__PURE__ */ i(Xe, { value: "chapter", children: m }),
          /* @__PURE__ */ i(Xe, { value: "verse", children: N })
        ] })
      ] }),
      /* @__PURE__ */ i(
        qt,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: A,
          value: W,
          onChange: (y) => {
            O(y.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ x("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          yo,
          {
            className: "tw-m-1",
            checked: E,
            onCheckedChange: (y) => {
              k([]), g(y);
            }
          }
        ),
        /* @__PURE__ */ i(De, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? _ })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      $c,
      {
        columns: J,
        data: Q,
        onRowClickHandler: X,
        stickyHeader: !0
      }
    ) }),
    oe.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Ic,
      {
        occurrenceData: oe,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
function Vm({
  entries: e,
  getEntriesCount: t = void 0,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a = "No entries found",
  customSelectedText: s,
  sortSelected: l = !1,
  icon: c = void 0
}) {
  const [d, u] = ie(!1), h = Ie(
    (v) => {
      r(
        n.includes(v) ? n.filter((f) => f !== v) : [...n, v]
      );
    },
    [n, r]
  ), w = () => {
    var v;
    return n.length === 1 ? ((v = e.find((f) => f.value === n[0])) == null ? void 0 : v.label) ?? o : s || o;
  }, b = Ne(() => {
    if (!l)
      return e;
    const v = e.filter((m) => m.starred).sort((m, N) => m.label.localeCompare(N.label)), f = e.filter((m) => !m.starred).sort((m, N) => {
      const A = n.includes(m.value), _ = n.includes(N.value);
      return A && !_ ? -1 : !A && _ ? 1 : m.label.localeCompare(N.label);
    });
    return [...v, ...f];
  }, [e, n, l]);
  return /* @__PURE__ */ x(xs, { open: d, onOpenChange: u, children: [
    /* @__PURE__ */ i(Ns, { asChild: !0, children: /* @__PURE__ */ x(
      fe,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: C(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < e.length && "tw-border-primary"
        ),
        children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ i("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ i("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: C(
                  (n.length === 0 || n.length === e.length) && "tw-text-muted"
                ),
                children: w()
              }
            )
          ] }),
          /* @__PURE__ */ i(Qn, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(fo, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ x(mo, { children: [
      /* @__PURE__ */ i(ho, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ x(go, { children: [
        /* @__PURE__ */ i(bo, { children: a }),
        /* @__PURE__ */ i(Es, { children: b.map((v) => {
          const f = t ? t(v) : void 0;
          return /* @__PURE__ */ x(
            vo,
            {
              value: v.value,
              onSelect: h,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ i("div", { className: "w-4", children: /* @__PURE__ */ i(
                  Cn,
                  {
                    className: C(
                      "tw-h-4 tw-w-4",
                      n.includes(v.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: v.starred && /* @__PURE__ */ i(al, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ i("div", { className: "tw-flex-grow", children: v.label }),
                t && /* @__PURE__ */ i("div", { className: "tw-w-10 tw-text-right tw-text-muted-foreground", children: f })
              ]
            },
            v.value
          );
        }) })
      ] })
    ] }) })
  ] });
}
function Fc({
  onSearch: e,
  placeholder: t,
  isFullWidth: n,
  className: r
}) {
  const [o, a] = ie(""), s = (l) => {
    a(l), e(l);
  };
  return /* @__PURE__ */ x("div", { className: "tw-relative", children: [
    /* @__PURE__ */ i(lo, { className: "tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50" }),
    /* @__PURE__ */ i(
      qt,
      {
        className: C(
          "tw-flex tw-h-10 tw-w-full tw-text-ellipsis tw-rounded-md tw-border tw-border-input tw-bg-background tw-py-2 tw-pe-3 tw-ps-9 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          { "tw-w-full": n },
          { "tw-pe-9": o },
          r
        ),
        placeholder: t,
        value: o,
        onChange: (l) => s(l.target.value)
      }
    ),
    o && /* @__PURE__ */ x(
      fe,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
        children: [
          /* @__PURE__ */ i(
            rs,
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
const _s = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.Root,
  {
    orientation: "vertical",
    ref: n,
    className: C("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
    ...t
  }
));
_s.displayName = Re.List.displayName;
const Ps = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.List,
  {
    ref: n,
    className: C(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ps.displayName = Re.List.displayName;
const zc = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.Trigger,
  {
    ref: n,
    ...t,
    className: C(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), $s = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.Content,
  {
    ref: n,
    className: C(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
$s.displayName = Re.Content.displayName;
function Lm({
  tabList: e,
  onSearch: t,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    /* @__PURE__ */ x("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ i("h1", { children: r }) : "",
      /* @__PURE__ */ i(
        Fc,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ x(_s, { dir: a, children: [
      /* @__PURE__ */ i(Ps, { children: e.map((s) => /* @__PURE__ */ i(zc, { value: s.value, children: s.value }, s.key)) }),
      e.map((s) => /* @__PURE__ */ i($s, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
const st = "scrBook", Uc = "scrRef", mt = "source", Gc = "details", Hc = "Scripture Reference", Xc = "Scripture Book", Is = "Type", Yc = "Details";
function Wc(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${se.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: st,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Hc,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? se.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === st ? _r(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Yr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => _r(r.start),
      id: Uc,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : _r(o.start);
      },
      sortingFn: (r, o) => Yr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: mt,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Is : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Gc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Yc,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const qc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || Yr(e.start, e.end) === 0 ? `${Pr(e.start)}+${t}` : `${Pr(e.start)}+${t}-${Pr(e.end)}+${n}`;
}, ca = (e) => `${qc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Fm({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: s,
  onRowSelected: l,
  direction: c = "ltr"
}) {
  const [d, u] = ie([]), [h, w] = ie([{ id: st, desc: !1 }]), [b, v] = ie({}), f = Ne(
    () => e.flatMap((O) => O.data.map((P) => ({
      ...P,
      source: O.source
    }))),
    [e]
  ), m = Ne(
    () => Wc(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: s
      },
      n
    ),
    [r, a, s, n]
  );
  Ke(() => {
    d.includes(mt) ? w([
      { id: mt, desc: !1 },
      { id: st, desc: !1 }
    ]) : w([{ id: st, desc: !1 }]);
  }, [d]);
  const N = as({
    data: f,
    columns: m,
    state: {
      grouping: d,
      sorting: h,
      rowSelection: b
    },
    onGroupingChange: u,
    onSortingChange: w,
    onRowSelectionChange: v,
    getExpandedRowModel: Cl(),
    getGroupedRowModel: Sl(),
    getCoreRowModel: ss(),
    getSortedRowModel: is(),
    getRowId: ca,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Ke(() => {
    if (l) {
      const O = N.getSelectedRowModel().rowsById, P = Object.keys(O);
      if (P.length === 1) {
        const k = f.find((B) => ca(B) === P[0]) || void 0;
        k && l(k);
      }
    }
  }, [b, f, l, N]);
  const A = o ?? Xc, _ = a ?? Is, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${A}`, value: [st] },
    { label: `Group by ${_}`, value: [mt] },
    {
      label: `Group by ${A} and ${_}`,
      value: [st, mt]
    },
    {
      label: `Group by ${_} and ${A}`,
      value: [mt, st]
    }
  ], g = (O) => {
    u(JSON.parse(O));
  }, I = (O, P) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()(P);
  }, U = (O, P) => O.getIsGrouped() ? "" : C("banded-row", P % 2 === 0 ? "even" : "odd"), W = (O, P, k) => {
    if (!((O == null ? void 0 : O.length) === 0 || P.depth < k.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ x("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !t && /* @__PURE__ */ x(
      yn,
      {
        value: JSON.stringify(d),
        onValueChange: (O) => {
          g(O);
        },
        children: [
          /* @__PURE__ */ i(Ft, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(xn, {}) }),
          /* @__PURE__ */ i(zt, { position: "item-aligned", children: /* @__PURE__ */ i(Cc, { children: E.map((O) => /* @__PURE__ */ i(Xe, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ x(_n, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ i(Pn, { children: N.getHeaderGroups().map((O) => /* @__PURE__ */ i(We, { children: O.headers.filter((P) => P.column.columnDef.header).map((P) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ i(je, { colSpan: P.colSpan, className: "top-0 tw-sticky", children: P.isPlaceholder ? void 0 : /* @__PURE__ */ x("div", { children: [
          P.column.getCanGroup() ? /* @__PURE__ */ i(
            fe,
            {
              variant: "ghost",
              title: `Toggle grouping by ${P.column.columnDef.header}`,
              onClick: P.column.getToggleGroupingHandler(),
              type: "button",
              children: P.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          pn(P.column.columnDef.header, P.getContext())
        ] }) }, P.id)
      )) }, O.id)) }),
      /* @__PURE__ */ i($n, { children: N.getRowModel().rows.map((O, P) => /* @__PURE__ */ i(
        We,
        {
          "data-state": O.getIsSelected() ? "selected" : "",
          className: C(U(O, P)),
          onClick: (k) => I(O, k),
          children: O.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== mt || !n)))
              return /* @__PURE__ */ i(
                $e,
                {
                  className: C(
                    k.column.columnDef.id,
                    "tw-p-[1px]",
                    W(d, O, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ x(
                    fe,
                    {
                      variant: "link",
                      onClick: O.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        O.getIsExpanded() && /* @__PURE__ */ i(Vt, {}),
                        !O.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ i(ts, {}) : /* @__PURE__ */ i(sl, {})),
                        " ",
                        pn(k.column.columnDef.cell, k.getContext()),
                        " (",
                        O.subRows.length,
                        ")"
                      ]
                    }
                  ) : pn(k.column.columnDef.cell, k.getContext()))()
                },
                k.id
              );
          })
        },
        O.id
      )) })
    ] })
  ] });
}
const Ar = {
  [pe("undefined")]: "Ø",
  [pe(0)]: "A",
  [pe(1)]: "B",
  [pe(2)]: "C",
  [pe(3)]: "D",
  [pe(4)]: "E",
  [pe(5)]: "F",
  [pe(6)]: "G",
  [pe(7)]: "H",
  [pe(8)]: "I",
  [pe(9)]: "J",
  [pe(10)]: "K",
  [pe(11)]: "L",
  [pe(12)]: "M",
  [pe(13)]: "N",
  [pe(14)]: "O",
  [pe(15)]: "P",
  [pe(16)]: "Q",
  [pe(17)]: "R",
  [pe(18)]: "S",
  [pe(19)]: "T",
  [pe(20)]: "U",
  [pe(21)]: "V",
  [pe(22)]: "W",
  [pe(23)]: "X",
  [pe(24)]: "Y",
  [pe(25)]: "Z"
};
function zm({
  availableScrollGroupIds: e,
  scrollGroupId: t,
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
  return /* @__PURE__ */ x(
    yn,
    {
      value: `${t}`,
      onValueChange: (a) => n(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ i(Ft, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ i(
          xn,
          {
            placeholder: o[pe(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ i(
          zt,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ i(Xe, { value: `${a}`, children: o[pe(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const As = M.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  cs.Root,
  {
    ref: o,
    decorative: n,
    orientation: t,
    className: C(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...r
  }
));
As.displayName = cs.Root.displayName;
function Um({ children: e }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: e });
}
function Gm({
  primary: e,
  secondary: t,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ i("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ i("div", { children: n })
  ] });
}
function Hm({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ x("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ i("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ i(As, {}) : ""
  ] });
}
function Xm({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ i("div", { id: e, className: t, children: n.map((s) => /* @__PURE__ */ x("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      yo,
      {
        className: "tw-mr-2 tw-align-middle",
        checked: r.includes(s),
        onCheckedChange: (l) => o(s, l)
      }
    ),
    /* @__PURE__ */ i(De, { children: a ? a(s) : s })
  ] }, s)) });
}
function Kc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Jc(e) {
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
var xo = {}, Ds = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Ds);
var Zc = Ds.exports, Dr = {};
function No(e, t) {
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
function bt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ms(e) {
  if (!bt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ms(e[n]);
  }), t;
}
function nt(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? $({}, e) : e;
  return bt(e) && bt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (bt(t[o]) && o in e && bt(e[o]) ? r[o] = nt(e[o], t[o], n) : n.clone ? r[o] = bt(t[o]) ? Ms(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
var Zr = { exports: {} }, Gn = { exports: {} }, le = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var da;
function Qc() {
  if (da)
    return le;
  da = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, w = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, A = e ? Symbol.for("react.scope") : 60119;
  function _(g) {
    if (typeof g == "object" && g !== null) {
      var I = g.$$typeof;
      switch (I) {
        case t:
          switch (g = g.type, g) {
            case c:
            case d:
            case r:
            case a:
            case o:
            case h:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case l:
                case u:
                case v:
                case b:
                case s:
                  return g;
                default:
                  return I;
              }
          }
        case n:
          return I;
      }
    }
  }
  function E(g) {
    return _(g) === d;
  }
  return le.AsyncMode = c, le.ConcurrentMode = d, le.ContextConsumer = l, le.ContextProvider = s, le.Element = t, le.ForwardRef = u, le.Fragment = r, le.Lazy = v, le.Memo = b, le.Portal = n, le.Profiler = a, le.StrictMode = o, le.Suspense = h, le.isAsyncMode = function(g) {
    return E(g) || _(g) === c;
  }, le.isConcurrentMode = E, le.isContextConsumer = function(g) {
    return _(g) === l;
  }, le.isContextProvider = function(g) {
    return _(g) === s;
  }, le.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, le.isForwardRef = function(g) {
    return _(g) === u;
  }, le.isFragment = function(g) {
    return _(g) === r;
  }, le.isLazy = function(g) {
    return _(g) === v;
  }, le.isMemo = function(g) {
    return _(g) === b;
  }, le.isPortal = function(g) {
    return _(g) === n;
  }, le.isProfiler = function(g) {
    return _(g) === a;
  }, le.isStrictMode = function(g) {
    return _(g) === o;
  }, le.isSuspense = function(g) {
    return _(g) === h;
  }, le.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === d || g === a || g === o || g === h || g === w || typeof g == "object" && g !== null && (g.$$typeof === v || g.$$typeof === b || g.$$typeof === s || g.$$typeof === l || g.$$typeof === u || g.$$typeof === m || g.$$typeof === N || g.$$typeof === A || g.$$typeof === f);
  }, le.typeOf = _, le;
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
var ua;
function ed() {
  return ua || (ua = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, s = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, u = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, w = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, A = e ? Symbol.for("react.scope") : 60119;
    function _(T) {
      return typeof T == "string" || typeof T == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      T === r || T === d || T === a || T === o || T === h || T === w || typeof T == "object" && T !== null && (T.$$typeof === v || T.$$typeof === b || T.$$typeof === s || T.$$typeof === l || T.$$typeof === u || T.$$typeof === m || T.$$typeof === N || T.$$typeof === A || T.$$typeof === f);
    }
    function E(T) {
      if (typeof T == "object" && T !== null) {
        var we = T.$$typeof;
        switch (we) {
          case t:
            var V = T.type;
            switch (V) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case h:
                return V;
              default:
                var xe = V && V.$$typeof;
                switch (xe) {
                  case l:
                  case u:
                  case v:
                  case b:
                  case s:
                    return xe;
                  default:
                    return we;
                }
            }
          case n:
            return we;
        }
      }
    }
    var g = c, I = d, U = l, W = s, O = t, P = u, k = r, B = v, D = b, Q = n, J = a, X = o, ee = h, re = !1;
    function oe(T) {
      return re || (re = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), y(T) || E(T) === c;
    }
    function y(T) {
      return E(T) === d;
    }
    function R(T) {
      return E(T) === l;
    }
    function H(T) {
      return E(T) === s;
    }
    function G(T) {
      return typeof T == "object" && T !== null && T.$$typeof === t;
    }
    function z(T) {
      return E(T) === u;
    }
    function q(T) {
      return E(T) === r;
    }
    function L(T) {
      return E(T) === v;
    }
    function K(T) {
      return E(T) === b;
    }
    function Y(T) {
      return E(T) === n;
    }
    function Z(T) {
      return E(T) === a;
    }
    function S(T) {
      return E(T) === o;
    }
    function F(T) {
      return E(T) === h;
    }
    ce.AsyncMode = g, ce.ConcurrentMode = I, ce.ContextConsumer = U, ce.ContextProvider = W, ce.Element = O, ce.ForwardRef = P, ce.Fragment = k, ce.Lazy = B, ce.Memo = D, ce.Portal = Q, ce.Profiler = J, ce.StrictMode = X, ce.Suspense = ee, ce.isAsyncMode = oe, ce.isConcurrentMode = y, ce.isContextConsumer = R, ce.isContextProvider = H, ce.isElement = G, ce.isForwardRef = z, ce.isFragment = q, ce.isLazy = L, ce.isMemo = K, ce.isPortal = Y, ce.isProfiler = Z, ce.isStrictMode = S, ce.isSuspense = F, ce.isValidElementType = _, ce.typeOf = E;
  }()), ce;
}
var pa;
function Bs() {
  return pa || (pa = 1, process.env.NODE_ENV === "production" ? Gn.exports = Qc() : Gn.exports = ed()), Gn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Mr, wa;
function td() {
  if (wa)
    return Mr;
  wa = 1;
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
  return Mr = o() ? Object.assign : function(a, s) {
    for (var l, c = r(a), d, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var h in l)
        t.call(l, h) && (c[h] = l[h]);
      if (e) {
        d = e(l);
        for (var w = 0; w < d.length; w++)
          n.call(l, d[w]) && (c[d[w]] = l[d[w]]);
      }
    }
    return c;
  }, Mr;
}
var Br, fa;
function ko() {
  if (fa)
    return Br;
  fa = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Br = e, Br;
}
var jr, ma;
function js() {
  return ma || (ma = 1, jr = Function.call.bind(Object.prototype.hasOwnProperty)), jr;
}
var Vr, ha;
function nd() {
  if (ha)
    return Vr;
  ha = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = ko(), n = {}, r = js();
    e = function(a) {
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
          var h;
          try {
            if (typeof a[u] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            h = a[u](s, u, c, l, null, t);
          } catch (v) {
            h = v;
          }
          if (h && !(h instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof h + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), h instanceof Error && !(h.message in n)) {
            n[h.message] = !0;
            var b = d ? d() : "";
            e(
              "Failed " + l + " type: " + h.message + (b ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Vr = o, Vr;
}
var Lr, ga;
function rd() {
  if (ga)
    return Lr;
  ga = 1;
  var e = Bs(), t = td(), n = ko(), r = js(), o = nd(), a = function() {
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
  return Lr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function h(y) {
      var R = y && (d && y[d] || y[u]);
      if (typeof R == "function")
        return R;
    }
    var w = "<<anonymous>>", b = {
      array: N("array"),
      bigint: N("bigint"),
      bool: N("boolean"),
      func: N("function"),
      number: N("number"),
      object: N("object"),
      string: N("string"),
      symbol: N("symbol"),
      any: A(),
      arrayOf: _,
      element: E(),
      elementType: g(),
      instanceOf: I,
      node: P(),
      objectOf: W,
      oneOf: U,
      oneOfType: O,
      shape: B,
      exact: D
    };
    function v(y, R) {
      return y === R ? y !== 0 || 1 / y === 1 / R : y !== y && R !== R;
    }
    function f(y, R) {
      this.message = y, this.data = R && typeof R == "object" ? R : {}, this.stack = "";
    }
    f.prototype = Error.prototype;
    function m(y) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, H = 0;
      function G(q, L, K, Y, Z, S, F) {
        if (Y = Y || w, S = S || K, F !== n) {
          if (c) {
            var T = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw T.name = "Invariant Violation", T;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var we = Y + ":" + K;
            !R[we] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + S + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[we] = !0, H++);
          }
        }
        return L[K] == null ? q ? L[K] === null ? new f("The " + Z + " `" + S + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new f("The " + Z + " `" + S + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : y(L, K, Y, Z, S);
      }
      var z = G.bind(null, !1);
      return z.isRequired = G.bind(null, !0), z;
    }
    function N(y) {
      function R(H, G, z, q, L, K) {
        var Y = H[G], Z = X(Y);
        if (Z !== y) {
          var S = ee(Y);
          return new f(
            "Invalid " + q + " `" + L + "` of type " + ("`" + S + "` supplied to `" + z + "`, expected ") + ("`" + y + "`."),
            { expectedType: y }
          );
        }
        return null;
      }
      return m(R);
    }
    function A() {
      return m(s);
    }
    function _(y) {
      function R(H, G, z, q, L) {
        if (typeof y != "function")
          return new f("Property `" + L + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var K = H[G];
        if (!Array.isArray(K)) {
          var Y = X(K);
          return new f("Invalid " + q + " `" + L + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected an array."));
        }
        for (var Z = 0; Z < K.length; Z++) {
          var S = y(K, Z, z, q, L + "[" + Z + "]", n);
          if (S instanceof Error)
            return S;
        }
        return null;
      }
      return m(R);
    }
    function E() {
      function y(R, H, G, z, q) {
        var L = R[H];
        if (!l(L)) {
          var K = X(L);
          return new f("Invalid " + z + " `" + q + "` of type " + ("`" + K + "` supplied to `" + G + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(y);
    }
    function g() {
      function y(R, H, G, z, q) {
        var L = R[H];
        if (!e.isValidElementType(L)) {
          var K = X(L);
          return new f("Invalid " + z + " `" + q + "` of type " + ("`" + K + "` supplied to `" + G + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(y);
    }
    function I(y) {
      function R(H, G, z, q, L) {
        if (!(H[G] instanceof y)) {
          var K = y.name || w, Y = oe(H[G]);
          return new f("Invalid " + q + " `" + L + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return m(R);
    }
    function U(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function R(H, G, z, q, L) {
        for (var K = H[G], Y = 0; Y < y.length; Y++)
          if (v(K, y[Y]))
            return null;
        var Z = JSON.stringify(y, function(F, T) {
          var we = ee(T);
          return we === "symbol" ? String(T) : T;
        });
        return new f("Invalid " + q + " `" + L + "` of value `" + String(K) + "` " + ("supplied to `" + z + "`, expected one of " + Z + "."));
      }
      return m(R);
    }
    function W(y) {
      function R(H, G, z, q, L) {
        if (typeof y != "function")
          return new f("Property `" + L + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var K = H[G], Y = X(K);
        if (Y !== "object")
          return new f("Invalid " + q + " `" + L + "` of type " + ("`" + Y + "` supplied to `" + z + "`, expected an object."));
        for (var Z in K)
          if (r(K, Z)) {
            var S = y(K, Z, z, q, L + "." + Z, n);
            if (S instanceof Error)
              return S;
          }
        return null;
      }
      return m(R);
    }
    function O(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var R = 0; R < y.length; R++) {
        var H = y[R];
        if (typeof H != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + re(H) + " at index " + R + "."
          ), s;
      }
      function G(z, q, L, K, Y) {
        for (var Z = [], S = 0; S < y.length; S++) {
          var F = y[S], T = F(z, q, L, K, Y, n);
          if (T == null)
            return null;
          T.data && r(T.data, "expectedType") && Z.push(T.data.expectedType);
        }
        var we = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new f("Invalid " + K + " `" + Y + "` supplied to " + ("`" + L + "`" + we + "."));
      }
      return m(G);
    }
    function P() {
      function y(R, H, G, z, q) {
        return Q(R[H]) ? null : new f("Invalid " + z + " `" + q + "` supplied to " + ("`" + G + "`, expected a ReactNode."));
      }
      return m(y);
    }
    function k(y, R, H, G, z) {
      return new f(
        (y || "React class") + ": " + R + " type `" + H + "." + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function B(y) {
      function R(H, G, z, q, L) {
        var K = H[G], Y = X(K);
        if (Y !== "object")
          return new f("Invalid " + q + " `" + L + "` of type `" + Y + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var Z in y) {
          var S = y[Z];
          if (typeof S != "function")
            return k(z, q, L, Z, ee(S));
          var F = S(K, Z, z, q, L + "." + Z, n);
          if (F)
            return F;
        }
        return null;
      }
      return m(R);
    }
    function D(y) {
      function R(H, G, z, q, L) {
        var K = H[G], Y = X(K);
        if (Y !== "object")
          return new f("Invalid " + q + " `" + L + "` of type `" + Y + "` " + ("supplied to `" + z + "`, expected `object`."));
        var Z = t({}, H[G], y);
        for (var S in Z) {
          var F = y[S];
          if (r(y, S) && typeof F != "function")
            return k(z, q, L, S, ee(F));
          if (!F)
            return new f(
              "Invalid " + q + " `" + L + "` key `" + S + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(H[G], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(y), null, "  ")
            );
          var T = F(K, S, z, q, L + "." + S, n);
          if (T)
            return T;
        }
        return null;
      }
      return m(R);
    }
    function Q(y) {
      switch (typeof y) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !y;
        case "object":
          if (Array.isArray(y))
            return y.every(Q);
          if (y === null || l(y))
            return !0;
          var R = h(y);
          if (R) {
            var H = R.call(y), G;
            if (R !== y.entries) {
              for (; !(G = H.next()).done; )
                if (!Q(G.value))
                  return !1;
            } else
              for (; !(G = H.next()).done; ) {
                var z = G.value;
                if (z && !Q(z[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function J(y, R) {
      return y === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function X(y) {
      var R = typeof y;
      return Array.isArray(y) ? "array" : y instanceof RegExp ? "object" : J(R, y) ? "symbol" : R;
    }
    function ee(y) {
      if (typeof y > "u" || y === null)
        return "" + y;
      var R = X(y);
      if (R === "object") {
        if (y instanceof Date)
          return "date";
        if (y instanceof RegExp)
          return "regexp";
      }
      return R;
    }
    function re(y) {
      var R = ee(y);
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
    function oe(y) {
      return !y.constructor || !y.constructor.name ? w : y.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, Lr;
}
var Fr, ba;
function od() {
  if (ba)
    return Fr;
  ba = 1;
  var e = ko();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Fr = function() {
    function r(s, l, c, d, u, h) {
      if (h !== e) {
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
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, Fr;
}
if (process.env.NODE_ENV !== "production") {
  var ad = Bs(), sd = !0;
  Zr.exports = rd()(ad.isElement, sd);
} else
  Zr.exports = od()();
var id = Zr.exports;
const p = /* @__PURE__ */ Kc(id);
function ld(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Vs(e, t, n, r, o) {
  const a = e[t], s = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !ld(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ls = No(p.element, Vs);
Ls.isRequired = No(p.element.isRequired, Vs);
const Fs = Ls, cd = "exact-prop: ​";
function dd(e) {
  return process.env.NODE_ENV === "production" ? e : $({}, e, {
    [cd]: (t) => {
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
var Qr = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var va;
function ud() {
  if (va)
    return de;
  va = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function f(m) {
    if (typeof m == "object" && m !== null) {
      var N = m.$$typeof;
      switch (N) {
        case e:
          switch (m = m.type, m) {
            case n:
            case o:
            case r:
            case d:
            case u:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case s:
                case c:
                case w:
                case h:
                case a:
                  return m;
                default:
                  return N;
              }
          }
        case t:
          return N;
      }
    }
  }
  return de.ContextConsumer = s, de.ContextProvider = a, de.Element = e, de.ForwardRef = c, de.Fragment = n, de.Lazy = w, de.Memo = h, de.Portal = t, de.Profiler = o, de.StrictMode = r, de.Suspense = d, de.SuspenseList = u, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(m) {
    return f(m) === s;
  }, de.isContextProvider = function(m) {
    return f(m) === a;
  }, de.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, de.isForwardRef = function(m) {
    return f(m) === c;
  }, de.isFragment = function(m) {
    return f(m) === n;
  }, de.isLazy = function(m) {
    return f(m) === w;
  }, de.isMemo = function(m) {
    return f(m) === h;
  }, de.isPortal = function(m) {
    return f(m) === t;
  }, de.isProfiler = function(m) {
    return f(m) === o;
  }, de.isStrictMode = function(m) {
    return f(m) === r;
  }, de.isSuspense = function(m) {
    return f(m) === d;
  }, de.isSuspenseList = function(m) {
    return f(m) === u;
  }, de.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === d || m === u || m === b || typeof m == "object" && m !== null && (m.$$typeof === w || m.$$typeof === h || m.$$typeof === a || m.$$typeof === s || m.$$typeof === c || m.$$typeof === v || m.getModuleId !== void 0);
  }, de.typeOf = f, de;
}
var ue = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ya;
function pd() {
  return ya || (ya = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, f = !1, m = !1, N = !1, A = !1, _;
    _ = Symbol.for("react.module.reference");
    function E(V) {
      return !!(typeof V == "string" || typeof V == "function" || V === n || V === o || A || V === r || V === d || V === u || N || V === b || v || f || m || typeof V == "object" && V !== null && (V.$$typeof === w || V.$$typeof === h || V.$$typeof === a || V.$$typeof === s || V.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      V.$$typeof === _ || V.getModuleId !== void 0));
    }
    function g(V) {
      if (typeof V == "object" && V !== null) {
        var xe = V.$$typeof;
        switch (xe) {
          case e:
            var Ge = V.type;
            switch (Ge) {
              case n:
              case o:
              case r:
              case d:
              case u:
                return Ge;
              default:
                var ut = Ge && Ge.$$typeof;
                switch (ut) {
                  case l:
                  case s:
                  case c:
                  case w:
                  case h:
                  case a:
                    return ut;
                  default:
                    return xe;
                }
            }
          case t:
            return xe;
        }
      }
    }
    var I = s, U = a, W = e, O = c, P = n, k = w, B = h, D = t, Q = o, J = r, X = d, ee = u, re = !1, oe = !1;
    function y(V) {
      return re || (re = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R(V) {
      return oe || (oe = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(V) {
      return g(V) === s;
    }
    function G(V) {
      return g(V) === a;
    }
    function z(V) {
      return typeof V == "object" && V !== null && V.$$typeof === e;
    }
    function q(V) {
      return g(V) === c;
    }
    function L(V) {
      return g(V) === n;
    }
    function K(V) {
      return g(V) === w;
    }
    function Y(V) {
      return g(V) === h;
    }
    function Z(V) {
      return g(V) === t;
    }
    function S(V) {
      return g(V) === o;
    }
    function F(V) {
      return g(V) === r;
    }
    function T(V) {
      return g(V) === d;
    }
    function we(V) {
      return g(V) === u;
    }
    ue.ContextConsumer = I, ue.ContextProvider = U, ue.Element = W, ue.ForwardRef = O, ue.Fragment = P, ue.Lazy = k, ue.Memo = B, ue.Portal = D, ue.Profiler = Q, ue.StrictMode = J, ue.Suspense = X, ue.SuspenseList = ee, ue.isAsyncMode = y, ue.isConcurrentMode = R, ue.isContextConsumer = H, ue.isContextProvider = G, ue.isElement = z, ue.isForwardRef = q, ue.isFragment = L, ue.isLazy = K, ue.isMemo = Y, ue.isPortal = Z, ue.isProfiler = S, ue.isStrictMode = F, ue.isSuspense = T, ue.isSuspenseList = we, ue.isValidElementType = E, ue.typeOf = g;
  }()), ue;
}
process.env.NODE_ENV === "production" ? Qr.exports = ud() : Qr.exports = pd();
var xa = Qr.exports;
const wd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function fd(e) {
  const t = `${e}`.match(wd);
  return t && t[1] || "";
}
function zs(e, t = "") {
  return e.displayName || e.name || fd(e) || t;
}
function Na(e, t, n) {
  const r = zs(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function md(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return zs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case xa.ForwardRef:
          return Na(e, e.render, "ForwardRef");
        case xa.Memo:
          return Na(e, e.type, "memo");
        default:
          return;
      }
  }
}
function Nn(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], s = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const hd = p.oneOfType([p.func, p.object]), Us = hd;
function Ze(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ut(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function gd(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function bd(e, t = 166) {
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
function vd(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function yd(e, t) {
  var n, r;
  return /* @__PURE__ */ j.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function nr(e) {
  return e && e.ownerDocument || document;
}
function xd(e) {
  return nr(e).defaultView || window;
}
function Nd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? $({}, t.propTypes) : null;
  return (o) => (a, s, l, c, d, ...u) => {
    const h = d || s, w = n == null ? void 0 : n[h];
    if (w) {
      const b = w(a, s, l, c, d, ...u);
      if (b)
        return b;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function rr(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const kd = typeof window < "u" ? j.useLayoutEffect : j.useEffect, Gt = kd;
let ka = 0;
function Ed(e) {
  const [t, n] = j.useState(e), r = e || t;
  return j.useEffect(() => {
    t == null && (ka += 1, n(`mui-${ka}`));
  }, [t]), r;
}
const Ea = j["useId".toString()];
function Gs(e) {
  if (Ea !== void 0) {
    const t = Ea();
    return e ?? t;
  }
  return Ed(e);
}
function Td(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function Hs({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = j.useRef(e !== void 0), [a, s] = j.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    j.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: d
    } = j.useRef(t);
    j.useEffect(() => {
      !o && d !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = j.useCallback((d) => {
    o || s(d);
  }, []);
  return [l, c];
}
function eo(e) {
  const t = j.useRef(e);
  return Gt(() => {
    t.current = e;
  }), j.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function kt(...e) {
  return j.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      rr(n, t);
    });
  }, e);
}
const Ta = {};
function Cd(e, t) {
  const n = j.useRef(Ta);
  return n.current === Ta && (n.current = e(t)), n;
}
const Sd = [];
function Od(e) {
  j.useEffect(e, Sd);
}
class In {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new In();
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
  const e = Cd(In.create).current;
  return Od(e.disposeEffect), e;
}
let pr = !0, to = !1;
const Rd = new In(), _d = {
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
function Pd(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && _d[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function $d(e) {
  e.metaKey || e.altKey || e.ctrlKey || (pr = !0);
}
function zr() {
  pr = !1;
}
function Id() {
  this.visibilityState === "hidden" && to && (pr = !0);
}
function Ad(e) {
  e.addEventListener("keydown", $d, !0), e.addEventListener("mousedown", zr, !0), e.addEventListener("pointerdown", zr, !0), e.addEventListener("touchstart", zr, !0), e.addEventListener("visibilitychange", Id, !0);
}
function Dd(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return pr || Pd(t);
}
function Xs() {
  const e = j.useCallback((o) => {
    o != null && Ad(o.ownerDocument);
  }, []), t = j.useRef(!1);
  function n() {
    return t.current ? (to = !0, Rd.start(100, () => {
      to = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Dd(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Ys(e, t) {
  const n = $({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = $({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = $({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = Ys(o[s], a[s]);
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
      r[o] = e[o].reduce((a, s) => {
        if (s) {
          const l = t(s);
          l !== "" && a.push(l), n && n[s] && a.push(n[s]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const Ca = (e) => e, Md = () => {
  let e = Ca;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ca;
    }
  };
}, Bd = Md(), Ws = Bd, qs = {
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
function wr(e, t, n = "Mui") {
  const r = qs[t];
  return r ? `${n}-${r}` : `${Ws.generate(e)}-${t}`;
}
function Ks(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = wr(e, o, n);
  }), r;
}
function jd(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function ke(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const Vd = ["values", "unit", "step"], Ld = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => $({}, n, {
    [r.key]: r.val
  }), {});
};
function Fd(e) {
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
  } = e, o = ke(e, Vd), a = Ld(t), s = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof t[w] == "number" ? t[w] : w) - r / 100}${n})`;
  }
  function d(w, b) {
    const v = s.indexOf(b);
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${n}) and (max-width:${(v !== -1 && typeof t[s[v]] == "number" ? t[s[v]] : b) - r / 100}${n})`;
  }
  function u(w) {
    return s.indexOf(w) + 1 < s.length ? d(w, s[s.indexOf(w) + 1]) : l(w);
  }
  function h(w) {
    const b = s.indexOf(w);
    return b === 0 ? l(s[1]) : b === s.length - 1 ? c(s[b]) : d(w, s[s.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return $({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: d,
    only: u,
    not: h,
    unit: n
  }, o);
}
const zd = {
  borderRadius: 4
}, Ud = zd, Gd = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.string, p.object, p.array]) : {}, ct = Gd;
function fn(e, t) {
  return t ? nt(e, t, {
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
}, Sa = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${To[e]}px)`
};
function rt(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Sa;
    return t.reduce((s, l, c) => (s[a.up(a.keys[c])] = n(t[c]), s), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || Sa;
    return Object.keys(t).reduce((s, l) => {
      if (Object.keys(a.values || To).indexOf(l) !== -1) {
        const c = a.up(l);
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
function Hd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Xd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function fr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function or(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = fr(e, n) || r, t && (o = t(o, r, e)), o;
}
function ye(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, a = (s) => {
    if (s[t] == null)
      return null;
    const l = s[t], c = s.theme, d = fr(c, r) || {};
    return rt(s, l, (h) => {
      let w = or(d, o, h);
      return h === w && typeof h == "string" && (w = or(d, o, `${t}${h === "default" ? "" : Ze(h)}`, h)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: ct
  } : {}, a.filterProps = [t], a;
}
function Yd(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Wd = {
  m: "margin",
  p: "padding"
}, qd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Oa = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Kd = Yd((e) => {
  if (e.length > 2)
    if (Oa[e])
      e = Oa[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Wd[t], o = qd[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), mr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], hr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Jd = [...mr, ...hr];
function An(e, t, n, r) {
  var o;
  const a = (o = fr(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Js(e) {
  return An(e, "spacing", 8, "spacing");
}
function Dn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Zd(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Dn(t, n), r), {});
}
function Qd(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Kd(n), a = Zd(o, r), s = e[n];
  return rt(e, s, a);
}
function Zs(e, t) {
  const n = Js(e.theme);
  return Object.keys(e).map((r) => Qd(e, t, r, n)).reduce(fn, {});
}
function ge(e) {
  return Zs(e, mr);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? mr.reduce((e, t) => (e[t] = ct, e), {}) : {};
ge.filterProps = mr;
function be(e) {
  return Zs(e, hr);
}
be.propTypes = process.env.NODE_ENV !== "production" ? hr.reduce((e, t) => (e[t] = ct, e), {}) : {};
be.filterProps = hr;
process.env.NODE_ENV !== "production" && Jd.reduce((e, t) => (e[t] = ct, e), {});
function eu(e = 8) {
  if (e.mui)
    return e;
  const t = Js({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = t(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function gr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? fn(o, t[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Ve(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ue(e, t) {
  return ye({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const tu = Ue("border", Ve), nu = Ue("borderTop", Ve), ru = Ue("borderRight", Ve), ou = Ue("borderBottom", Ve), au = Ue("borderLeft", Ve), su = Ue("borderColor"), iu = Ue("borderTopColor"), lu = Ue("borderRightColor"), cu = Ue("borderBottomColor"), du = Ue("borderLeftColor"), uu = Ue("outline", Ve), pu = Ue("outlineColor"), br = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = An(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Dn(t, r)
    });
    return rt(e, e.borderRadius, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ct
} : {};
br.filterProps = ["borderRadius"];
gr(tu, nu, ru, ou, au, su, iu, lu, cu, du, br, uu, pu);
const vr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = An(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Dn(t, r)
    });
    return rt(e, e.gap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ct
} : {};
vr.filterProps = ["gap"];
const yr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = An(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Dn(t, r)
    });
    return rt(e, e.columnGap, n);
  }
  return null;
};
yr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ct
} : {};
yr.filterProps = ["columnGap"];
const xr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = An(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Dn(t, r)
    });
    return rt(e, e.rowGap, n);
  }
  return null;
};
xr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ct
} : {};
xr.filterProps = ["rowGap"];
const wu = ye({
  prop: "gridColumn"
}), fu = ye({
  prop: "gridRow"
}), mu = ye({
  prop: "gridAutoFlow"
}), hu = ye({
  prop: "gridAutoColumns"
}), gu = ye({
  prop: "gridAutoRows"
}), bu = ye({
  prop: "gridTemplateColumns"
}), vu = ye({
  prop: "gridTemplateRows"
}), yu = ye({
  prop: "gridTemplateAreas"
}), xu = ye({
  prop: "gridArea"
});
gr(vr, yr, xr, wu, fu, mu, hu, gu, bu, vu, yu, xu);
function jt(e, t) {
  return t === "grey" ? t : e;
}
const Nu = ye({
  prop: "color",
  themeKey: "palette",
  transform: jt
}), ku = ye({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: jt
}), Eu = ye({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: jt
});
gr(Nu, ku, Eu);
function Ae(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Tu = ye({
  prop: "width",
  transform: Ae
}), Co = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || To[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ae(n)
      };
    };
    return rt(e, e.maxWidth, t);
  }
  return null;
};
Co.filterProps = ["maxWidth"];
const Cu = ye({
  prop: "minWidth",
  transform: Ae
}), Su = ye({
  prop: "height",
  transform: Ae
}), Ou = ye({
  prop: "maxHeight",
  transform: Ae
}), Ru = ye({
  prop: "minHeight",
  transform: Ae
});
ye({
  prop: "size",
  cssProperty: "width",
  transform: Ae
});
ye({
  prop: "size",
  cssProperty: "height",
  transform: Ae
});
const _u = ye({
  prop: "boxSizing"
});
gr(Tu, Co, Cu, Su, Ou, Ru, _u);
const Pu = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ve
  },
  borderTop: {
    themeKey: "borders",
    transform: Ve
  },
  borderRight: {
    themeKey: "borders",
    transform: Ve
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ve
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ve
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
    transform: Ve
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
    style: be
  },
  pt: {
    style: be
  },
  pr: {
    style: be
  },
  pb: {
    style: be
  },
  pl: {
    style: be
  },
  px: {
    style: be
  },
  py: {
    style: be
  },
  padding: {
    style: be
  },
  paddingTop: {
    style: be
  },
  paddingRight: {
    style: be
  },
  paddingBottom: {
    style: be
  },
  paddingLeft: {
    style: be
  },
  paddingX: {
    style: be
  },
  paddingY: {
    style: be
  },
  paddingInline: {
    style: be
  },
  paddingInlineStart: {
    style: be
  },
  paddingInlineEnd: {
    style: be
  },
  paddingBlock: {
    style: be
  },
  paddingBlockStart: {
    style: be
  },
  paddingBlockEnd: {
    style: be
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
    transform: Ae
  },
  maxWidth: {
    style: Co
  },
  minWidth: {
    transform: Ae
  },
  height: {
    transform: Ae
  },
  maxHeight: {
    transform: Ae
  },
  minHeight: {
    transform: Ae
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
}, So = Pu;
function $u(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function Iu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Au() {
  function e(n, r, o, a) {
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
      style: h
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = fr(o, d) || {};
    return h ? h(s) : rt(s, r, (v) => {
      let f = or(w, u, v);
      return v === f && typeof v == "string" && (f = or(w, u, `${n}${v === "default" ? "" : Ze(v)}`, v)), c === !1 ? f : {
        [c]: f
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
    const s = (r = a.unstable_sxConfig) != null ? r : So;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const u = Hd(a.breakpoints), h = Object.keys(u);
      let w = u;
      return Object.keys(d).forEach((b) => {
        const v = Iu(d[b], a);
        if (v != null)
          if (typeof v == "object")
            if (s[b])
              w = fn(w, e(b, v, a, s));
            else {
              const f = rt({
                theme: a
              }, v, (m) => ({
                [b]: m
              }));
              $u(f, v) ? w[b] = t({
                sx: v,
                theme: a
              }) : w = fn(w, f);
            }
          else
            w = fn(w, e(b, v, a, s));
      }), Xd(h, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Qs = Au();
Qs.filterProps = ["sx"];
const Oo = Qs;
function Du(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Mu = ["breakpoints", "palette", "spacing", "shape"];
function Ro(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, s = ke(e, Mu), l = Fd(n), c = eu(o);
  let d = nt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: $({
      mode: "light"
    }, r),
    spacing: c,
    shape: $({}, Ud, a)
  }, s);
  return d.applyStyles = Du, d = t.reduce((u, h) => nt(u, h), d), d.unstable_sxConfig = $({}, So, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(h) {
    return Oo({
      sx: h,
      theme: this
    });
  }, d;
}
function Bu(e) {
  return Object.keys(e).length === 0;
}
function ei(e = null) {
  const t = j.useContext(Rl);
  return !t || Bu(t) ? e : t;
}
const ju = Ro();
function ti(e = ju) {
  return ei(e);
}
const Vu = ["ownerState"], Lu = ["variants"], Fu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function zu(e) {
  return Object.keys(e).length === 0;
}
function Uu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Kn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Gu = Ro(), Ra = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Hn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return zu(t) ? e : t[n] || t;
}
function Hu(e) {
  return e ? (t, n) => n[e] : null;
}
function Jn(e, t) {
  let {
    ownerState: n
  } = t, r = ke(t, Vu);
  const o = typeof e == "function" ? e($({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => Jn(a, $({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = ke(o, Lu);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props($({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style($({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Xu(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Gu,
    rootShouldForwardProp: r = Kn,
    slotShouldForwardProp: o = Kn
  } = e, a = (s) => Oo($({}, s, {
    theme: Hn($({}, s, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    _l(s, (g) => g.filter((I) => !(I != null && I.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: u,
      skipSx: h,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Hu(Ra(d))
    } = l, b = ke(l, Fu), v = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), f = h || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${Ra(d || "Root")}`);
    let N = Kn;
    d === "Root" || d === "root" ? N = r : d ? N = o : Uu(s) && (N = void 0);
    const A = Ol(s, $({
      shouldForwardProp: N,
      label: m
    }, b)), _ = (g) => typeof g == "function" && g.__emotion_real !== g || bt(g) ? (I) => Jn(g, $({}, I, {
      theme: Hn({
        theme: I.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : g, E = (g, ...I) => {
      let U = _(g);
      const W = I ? I.map(_) : [];
      c && w && W.push((k) => {
        const B = Hn($({}, k, {
          defaultTheme: n,
          themeId: t
        }));
        if (!B.components || !B.components[c] || !B.components[c].styleOverrides)
          return null;
        const D = B.components[c].styleOverrides, Q = {};
        return Object.entries(D).forEach(([J, X]) => {
          Q[J] = Jn(X, $({}, k, {
            theme: B
          }));
        }), w(k, Q);
      }), c && !v && W.push((k) => {
        var B;
        const D = Hn($({}, k, {
          defaultTheme: n,
          themeId: t
        })), Q = D == null || (B = D.components) == null || (B = B[c]) == null ? void 0 : B.variants;
        return Jn({
          variants: Q
        }, $({}, k, {
          theme: D
        }));
      }), f || W.push(a);
      const O = W.length - I.length;
      if (Array.isArray(g) && O > 0) {
        const k = new Array(O).fill("");
        U = [...g, ...k], U.raw = [...g.raw, ...k];
      }
      const P = A(U, ...W);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${Ze(d || "")}`), k === void 0 && (k = `Styled(${md(s)})`), P.displayName = k;
      }
      return s.muiName && (P.muiName = s.muiName), P;
    };
    return A.withConfig && (E.withConfig = A.withConfig), E;
  };
}
function Yu(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Ys(t.components[n].defaultProps, r);
}
function Wu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = ti(n);
  return r && (o = o[r] || o), Yu({
    theme: o,
    name: t,
    props: e
  });
}
function _o(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), jd(e, t, n);
}
function qu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Et(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Et(qu(e));
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
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Nr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Ku(e) {
  e = Et(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), s = (d, u = (d + n / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Nr({
    type: l,
    values: c
  });
}
function _a(e) {
  e = Et(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Et(Ku(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Pa(e, t) {
  const n = _a(e), r = _a(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function ni(e, t) {
  return e = Et(e), t = _o(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Nr(e);
}
function Ju(e, t) {
  if (e = Et(e), t = _o(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Nr(e);
}
function Zu(e, t) {
  if (e = Et(e), t = _o(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Nr(e);
}
function Qu(e, t) {
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
const ep = {
  black: "#000",
  white: "#fff"
}, kn = ep, tp = {
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
}, np = tp, rp = {
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
}, Pt = rp, op = {
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
}, $t = op, ap = {
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
}, on = ap, sp = {
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
}, It = sp, ip = {
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
}, At = ip, lp = {
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
}, Dt = lp, cp = ["mode", "contrastThreshold", "tonalOffset"], $a = {
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
function Ia(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Zu(e.main, o) : t === "dark" && (e.dark = Ju(e.main, a)));
}
function dp(e = "light") {
  return e === "dark" ? {
    main: It[200],
    light: It[50],
    dark: It[400]
  } : {
    main: It[700],
    light: It[400],
    dark: It[800]
  };
}
function up(e = "light") {
  return e === "dark" ? {
    main: Pt[200],
    light: Pt[50],
    dark: Pt[400]
  } : {
    main: Pt[500],
    light: Pt[300],
    dark: Pt[700]
  };
}
function pp(e = "light") {
  return e === "dark" ? {
    main: $t[500],
    light: $t[300],
    dark: $t[700]
  } : {
    main: $t[700],
    light: $t[400],
    dark: $t[800]
  };
}
function wp(e = "light") {
  return e === "dark" ? {
    main: At[400],
    light: At[300],
    dark: At[700]
  } : {
    main: At[700],
    light: At[500],
    dark: At[900]
  };
}
function fp(e = "light") {
  return e === "dark" ? {
    main: Dt[400],
    light: Dt[300],
    dark: Dt[700]
  } : {
    main: Dt[800],
    light: Dt[500],
    dark: Dt[900]
  };
}
function mp(e = "light") {
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
function hp(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = ke(e, cp), a = e.primary || dp(t), s = e.secondary || up(t), l = e.error || pp(t), c = e.info || wp(t), d = e.success || fp(t), u = e.warning || mp(t);
  function h(f) {
    const m = Pa(f, Ur.text.primary) >= n ? Ur.text.primary : $a.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const N = Pa(f, m);
      N < 3 && console.error([`MUI: The contrast ratio of ${N}:1 for ${m} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const w = ({
    color: f,
    name: m,
    mainShade: N = 500,
    lightShade: A = 300,
    darkShade: _ = 700
  }) => {
    if (f = $({}, f), !f.main && f[N] && (f.main = f[N]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.` : Ut(11, m ? ` (${m})` : "", N));
    if (typeof f.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ut(12, m ? ` (${m})` : "", JSON.stringify(f.main)));
    return Ia(f, "light", A, r), Ia(f, "dark", _, r), f.contrastText || (f.contrastText = h(f.main)), f;
  }, b = {
    dark: Ur,
    light: $a
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), nt($({
    // A collection of common colors.
    common: $({}, kn),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: t,
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
    grey: np,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: h,
    // Generate a rich color object.
    augmentColor: w,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, b[t]), o);
}
const gp = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function bp(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Aa = {
  textTransform: "uppercase"
}, Da = '"Roboto", "Helvetica", "Arial", sans-serif';
function vp(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Da,
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
    pxToRem: h
  } = n, w = ke(n, gp);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = h || ((N) => `${N / d * b}rem`), f = (N, A, _, E, g) => $({
    fontFamily: r,
    fontWeight: N,
    fontSize: v(A),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: _
  }, r === Da ? {
    letterSpacing: `${bp(E / A)}em`
  } : {}, g, u), m = {
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
    button: f(l, 14, 1.75, 0.4, Aa),
    caption: f(s, 12, 1.66, 0.4),
    overline: f(s, 12, 2.66, 1, Aa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return nt($({
    htmlFontSize: d,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: s,
    fontWeightMedium: l,
    fontWeightBold: c
  }, m), w, {
    clone: !1
    // No need to clone deep
  });
}
const yp = 0.2, xp = 0.14, Np = 0.12;
function he(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${yp})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${xp})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Np})`].join(",");
}
const kp = ["none", he(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), he(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), he(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), he(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), he(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), he(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), he(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), he(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), he(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), he(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), he(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), he(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), he(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), he(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), he(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), he(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), he(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), he(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), he(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), he(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), he(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), he(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), he(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), he(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Ep = kp, Tp = ["duration", "easing", "delay"], Cp = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Sp = {
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
function Ma(e) {
  return `${Math.round(e)}ms`;
}
function Op(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Rp(e) {
  const t = $({}, Cp, e.easing), n = $({}, Sp, e.duration);
  return $({
    getAutoHeightDuration: Op,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, d = ke(a, Tp);
      if (process.env.NODE_ENV !== "production") {
        const u = (w) => typeof w == "string", h = (w) => !isNaN(parseFloat(w));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !h(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !h(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Ma(s)} ${l} ${typeof c == "string" ? c : Ma(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const _p = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Pp = _p, $p = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Ip(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, s = ke(e, $p);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ut(18));
  const l = hp(r), c = Ro(e);
  let d = nt(c, {
    mixins: Qu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Ep.slice(),
    typography: vp(l, a),
    transitions: Rp(o),
    zIndex: $({}, Pp)
  });
  if (d = nt(d, s), d = t.reduce((u, h) => nt(u, h), d), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (w, b) => {
      let v;
      for (v in w) {
        const f = w[v];
        if (u.indexOf(v) !== -1 && Object.keys(f).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = wr("", v);
            console.error([`MUI: The \`${b}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${m}' syntax:`, JSON.stringify({
              root: {
                [`&.${m}`]: f
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[v] = {};
        }
      }
    };
    Object.keys(d.components).forEach((w) => {
      const b = d.components[w].styleOverrides;
      b && w.indexOf("Mui") === 0 && h(b, w);
    });
  }
  return d.unstable_sxConfig = $({}, So, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(h) {
    return Oo({
      sx: h,
      theme: this
    });
  }, d;
}
const Ap = Ip(), Po = Ap, $o = "$$material";
function Io({
  props: e,
  name: t
}) {
  return Wu({
    props: e,
    name: t,
    defaultTheme: Po,
    themeId: $o
  });
}
const Dp = (e) => Kn(e) && e !== "classes", Mp = Xu({
  themeId: $o,
  defaultTheme: Po,
  rootShouldForwardProp: Dp
}), Mn = Mp;
function Bp(e) {
  return wr("MuiSvgIcon", e);
}
Ks("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const jp = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Vp = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${Ze(t)}`, `fontSize${Ze(n)}`]
  };
  return Eo(o, Bp, r);
}, Lp = Mn("svg", {
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
  var n, r, o, a, s, l, c, d, u, h, w, b, v;
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
      small: ((a = e.typography) == null || (s = a.pxToRem) == null ? void 0 : s.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((d = e.typography) == null || (u = d.pxToRem) == null ? void 0 : u.call(d, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (h = (w = (e.vars || e).palette) == null || (w = w[t.color]) == null ? void 0 : w.main) != null ? h : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), Ao = /* @__PURE__ */ j.forwardRef(function(t, n) {
  const r = Io({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: s = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: u = !1,
    titleAccess: h,
    viewBox: w = "0 0 24 24"
  } = r, b = ke(r, jp), v = /* @__PURE__ */ j.isValidElement(o) && o.type === "svg", f = $({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: u,
    viewBox: w,
    hasSvgAsChild: v
  }), m = {};
  u || (m.viewBox = w);
  const N = Vp(f);
  return /* @__PURE__ */ x(Lp, $({
    as: l,
    className: yt(N.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: n
  }, m, b, v && o.props, {
    ownerState: f,
    children: [v ? o.props.children : o, h ? /* @__PURE__ */ i("title", {
      children: h
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
Ao.muiName = "SvgIcon";
const Ba = Ao;
function ri(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ i(Ba, $({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ba.muiName, /* @__PURE__ */ j.memo(/* @__PURE__ */ j.forwardRef(n));
}
const Fp = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ws.configure(e);
  }
}, zp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Ze,
  createChainedFunction: gd,
  createSvgIcon: ri,
  debounce: bd,
  deprecatedPropType: vd,
  isMuiElement: yd,
  ownerDocument: nr,
  ownerWindow: xd,
  requirePropFactory: Nd,
  setRef: rr,
  unstable_ClassNameGenerator: Fp,
  unstable_useEnhancedEffect: Gt,
  unstable_useId: Gs,
  unsupportedProp: Td,
  useControlled: Hs,
  useEventCallback: eo,
  useForkRef: kt,
  useIsFocusVisible: Xs
}, Symbol.toStringTag, { value: "Module" })), Up = /* @__PURE__ */ Jc(zp);
var ja;
function Gp() {
  return ja || (ja = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Up;
  }(Dr)), Dr;
}
var Hp = Zc;
Object.defineProperty(xo, "__esModule", {
  value: !0
});
var oi = xo.default = void 0, Xp = Hp(Gp()), Yp = Ui;
oi = xo.default = (0, Xp.default)(/* @__PURE__ */ (0, Yp.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Wp(e) {
  return typeof e == "string";
}
function dn(e, t, n) {
  return e === void 0 || Wp(e) ? t : $({}, t, {
    ownerState: $({}, t.ownerState, n)
  });
}
const qp = {
  disableDefaultClasses: !1
}, Kp = /* @__PURE__ */ j.createContext(qp);
function Jp(e) {
  const {
    disableDefaultClasses: t
  } = j.useContext(Kp);
  return (n) => t ? "" : e(n);
}
function Zp(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Qp(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Va(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function ew(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const b = yt(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = $({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = $({}, n, o, r);
    return b.length > 0 && (f.className = b), Object.keys(v).length > 0 && (f.style = v), {
      props: f,
      internalRef: void 0
    };
  }
  const s = Zp($({}, o, r)), l = Va(r), c = Va(o), d = t(s), u = yt(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = $({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = $({}, d, n, c, l);
  return u.length > 0 && (w.className = u), Object.keys(h).length > 0 && (w.style = h), {
    props: w,
    internalRef: d.ref
  };
}
const tw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function nw(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, s = ke(e, tw), l = a ? {} : Qp(r, o), {
    props: c,
    internalRef: d
  } = ew($({}, s, {
    externalSlotProps: l
  })), u = kt(d, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return dn(n, $({}, c, {
    ref: u
  }), o);
}
const ai = "base";
function rw(e) {
  return `${ai}--${e}`;
}
function ow(e, t) {
  return `${ai}-${e}-${t}`;
}
function si(e, t) {
  const n = qs[t];
  return n ? rw(n) : ow(e, t);
}
function aw(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = si(e, r);
  }), n;
}
function sw(e) {
  return typeof e == "function" ? e() : e;
}
const ar = /* @__PURE__ */ j.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [s, l] = j.useState(null), c = kt(/* @__PURE__ */ j.isValidElement(r) ? r.ref : null, n);
  if (Gt(() => {
    a || l(sw(o) || document.body);
  }, [o, a]), Gt(() => {
    if (s && !a)
      return rr(n, s), () => {
        rr(n, null);
      };
  }, [n, s, a]), a) {
    if (/* @__PURE__ */ j.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ j.cloneElement(r, d);
    }
    return /* @__PURE__ */ i(j.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ i(j.Fragment, {
    children: s && /* @__PURE__ */ jl.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (ar.propTypes = {
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
process.env.NODE_ENV !== "production" && (ar["propTypes"] = dd(ar.propTypes));
var Ce = "top", Fe = "bottom", ze = "right", Se = "left", Do = "auto", Bn = [Ce, Fe, ze, Se], Ht = "start", En = "end", iw = "clippingParents", ii = "viewport", an = "popper", lw = "reference", La = /* @__PURE__ */ Bn.reduce(function(e, t) {
  return e.concat([t + "-" + Ht, t + "-" + En]);
}, []), li = /* @__PURE__ */ [].concat(Bn, [Do]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Ht, t + "-" + En]);
}, []), cw = "beforeRead", dw = "read", uw = "afterRead", pw = "beforeMain", ww = "main", fw = "afterMain", mw = "beforeWrite", hw = "write", gw = "afterWrite", bw = [cw, dw, uw, pw, ww, fw, mw, hw, gw];
function Qe(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Me(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Tt(e) {
  var t = Me(e).Element;
  return e instanceof t || e instanceof Element;
}
function Le(e) {
  var t = Me(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Mo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Me(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function vw(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Le(a) || !Qe(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function yw(e) {
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
      var o = t.elements[r], a = t.attributes[r] || {}, s = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = s.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Le(o) || !Qe(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const xw = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: vw,
  effect: yw,
  requires: ["computeStyles"]
};
function qe(e) {
  return e.split("-")[0];
}
var xt = Math.max, sr = Math.min, Xt = Math.round;
function no() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function ci() {
  return !/^((?!chrome|android).)*safari/i.test(no());
}
function Yt(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && Le(e) && (o = e.offsetWidth > 0 && Xt(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Xt(r.height) / e.offsetHeight || 1);
  var s = Tt(e) ? Me(e) : window, l = s.visualViewport, c = !ci() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / a, h = r.width / o, w = r.height / a;
  return {
    width: h,
    height: w,
    top: u,
    right: d + h,
    bottom: u + w,
    left: d,
    x: d,
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
function di(e, t) {
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
function ot(e) {
  return Me(e).getComputedStyle(e);
}
function Nw(e) {
  return ["table", "td", "th"].indexOf(Qe(e)) >= 0;
}
function dt(e) {
  return ((Tt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function kr(e) {
  return Qe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Mo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    dt(e)
  );
}
function Fa(e) {
  return !Le(e) || // https://github.com/popperjs/popper-core/issues/837
  ot(e).position === "fixed" ? null : e.offsetParent;
}
function kw(e) {
  var t = /firefox/i.test(no()), n = /Trident/i.test(no());
  if (n && Le(e)) {
    var r = ot(e);
    if (r.position === "fixed")
      return null;
  }
  var o = kr(e);
  for (Mo(o) && (o = o.host); Le(o) && ["html", "body"].indexOf(Qe(o)) < 0; ) {
    var a = ot(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function jn(e) {
  for (var t = Me(e), n = Fa(e); n && Nw(n) && ot(n).position === "static"; )
    n = Fa(n);
  return n && (Qe(n) === "html" || Qe(n) === "body" && ot(n).position === "static") ? t : n || kw(e) || t;
}
function jo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function mn(e, t, n) {
  return xt(e, sr(t, n));
}
function Ew(e, t, n) {
  var r = mn(e, t, n);
  return r > n ? n : r;
}
function ui() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function pi(e) {
  return Object.assign({}, ui(), e);
}
function wi(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var Tw = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, pi(typeof t != "number" ? t : wi(t, Bn));
};
function Cw(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = qe(n.placement), c = jo(l), d = [Se, ze].indexOf(l) >= 0, u = d ? "height" : "width";
  if (!(!a || !s)) {
    var h = Tw(o.padding, n), w = Bo(a), b = c === "y" ? Ce : Se, v = c === "y" ? Fe : ze, f = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], m = s[c] - n.rects.reference[c], N = jn(a), A = N ? c === "y" ? N.clientHeight || 0 : N.clientWidth || 0 : 0, _ = f / 2 - m / 2, E = h[b], g = A - w[u] - h[v], I = A / 2 - w[u] / 2 + _, U = mn(E, I, g), W = c;
    n.modifiersData[r] = (t = {}, t[W] = U, t.centerOffset = U - I, t);
  }
}
function Sw(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || di(t.elements.popper, o) && (t.elements.arrow = o));
}
const Ow = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Cw,
  effect: Sw,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Wt(e) {
  return e.split("-")[1];
}
var Rw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function _w(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Xt(n * o) / o || 0,
    y: Xt(r * o) / o || 0
  };
}
function za(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, s = e.offsets, l = e.position, c = e.gpuAcceleration, d = e.adaptive, u = e.roundOffsets, h = e.isFixed, w = s.x, b = w === void 0 ? 0 : w, v = s.y, f = v === void 0 ? 0 : v, m = typeof u == "function" ? u({
    x: b,
    y: f
  }) : {
    x: b,
    y: f
  };
  b = m.x, f = m.y;
  var N = s.hasOwnProperty("x"), A = s.hasOwnProperty("y"), _ = Se, E = Ce, g = window;
  if (d) {
    var I = jn(n), U = "clientHeight", W = "clientWidth";
    if (I === Me(n) && (I = dt(n), ot(I).position !== "static" && l === "absolute" && (U = "scrollHeight", W = "scrollWidth")), I = I, o === Ce || (o === Se || o === ze) && a === En) {
      E = Fe;
      var O = h && I === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        I[U]
      );
      f -= O - r.height, f *= c ? 1 : -1;
    }
    if (o === Se || (o === Ce || o === Fe) && a === En) {
      _ = ze;
      var P = h && I === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        I[W]
      );
      b -= P - r.width, b *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, d && Rw), B = u === !0 ? _w({
    x: b,
    y: f
  }, Me(n)) : {
    x: b,
    y: f
  };
  if (b = B.x, f = B.y, c) {
    var D;
    return Object.assign({}, k, (D = {}, D[E] = A ? "0" : "", D[_] = N ? "0" : "", D.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + f + "px)" : "translate3d(" + b + "px, " + f + "px, 0)", D));
  }
  return Object.assign({}, k, (t = {}, t[E] = A ? f + "px" : "", t[_] = N ? b + "px" : "", t.transform = "", t));
}
function Pw(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: qe(t.placement),
    variation: Wt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, za(Object.assign({}, d, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: s,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, za(Object.assign({}, d, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const $w = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Pw,
  data: {}
};
var Xn = {
  passive: !0
};
function Iw(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Me(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && d.forEach(function(u) {
    u.addEventListener("scroll", n.update, Xn);
  }), l && c.addEventListener("resize", n.update, Xn), function() {
    a && d.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Xn);
    }), l && c.removeEventListener("resize", n.update, Xn);
  };
}
const Aw = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Iw,
  data: {}
};
var Dw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Zn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Dw[t];
  });
}
var Mw = {
  start: "end",
  end: "start"
};
function Ua(e) {
  return e.replace(/start|end/g, function(t) {
    return Mw[t];
  });
}
function Vo(e) {
  var t = Me(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Lo(e) {
  return Yt(dt(e)).left + Vo(e).scrollLeft;
}
function Bw(e, t) {
  var n = Me(e), r = dt(e), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = ci();
    (d || !d && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + Lo(e),
    y: c
  };
}
function jw(e) {
  var t, n = dt(e), r = Vo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = xt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = xt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Lo(e), c = -r.scrollTop;
  return ot(o || n).direction === "rtl" && (l += xt(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function Fo(e) {
  var t = ot(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function fi(e) {
  return ["html", "body", "#document"].indexOf(Qe(e)) >= 0 ? e.ownerDocument.body : Le(e) && Fo(e) ? e : fi(kr(e));
}
function hn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = fi(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Me(r), s = o ? [a].concat(a.visualViewport || [], Fo(r) ? r : []) : r, l = t.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(hn(kr(s)))
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
function Vw(e, t) {
  var n = Yt(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Ga(e, t, n) {
  return t === ii ? ro(Bw(e, n)) : Tt(t) ? Vw(t, n) : ro(jw(dt(e)));
}
function Lw(e) {
  var t = hn(kr(e)), n = ["absolute", "fixed"].indexOf(ot(e).position) >= 0, r = n && Le(e) ? jn(e) : e;
  return Tt(r) ? t.filter(function(o) {
    return Tt(o) && di(o, r) && Qe(o) !== "body";
  }) : [];
}
function Fw(e, t, n, r) {
  var o = t === "clippingParents" ? Lw(e) : [].concat(t), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var u = Ga(e, d, r);
    return c.top = xt(u.top, c.top), c.right = sr(u.right, c.right), c.bottom = sr(u.bottom, c.bottom), c.left = xt(u.left, c.left), c;
  }, Ga(e, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function mi(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? qe(r) : null, a = r ? Wt(r) : null, s = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Ce:
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
    case ze:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Se:
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
  var d = o ? jo(o) : null;
  if (d != null) {
    var u = d === "y" ? "height" : "width";
    switch (a) {
      case Ht:
        c[d] = c[d] - (t[u] / 2 - n[u] / 2);
        break;
      case En:
        c[d] = c[d] + (t[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function Tn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, s = a === void 0 ? e.strategy : a, l = n.boundary, c = l === void 0 ? iw : l, d = n.rootBoundary, u = d === void 0 ? ii : d, h = n.elementContext, w = h === void 0 ? an : h, b = n.altBoundary, v = b === void 0 ? !1 : b, f = n.padding, m = f === void 0 ? 0 : f, N = pi(typeof m != "number" ? m : wi(m, Bn)), A = w === an ? lw : an, _ = e.rects.popper, E = e.elements[v ? A : w], g = Fw(Tt(E) ? E : E.contextElement || dt(e.elements.popper), c, u, s), I = Yt(e.elements.reference), U = mi({
    reference: I,
    element: _,
    strategy: "absolute",
    placement: o
  }), W = ro(Object.assign({}, _, U)), O = w === an ? W : I, P = {
    top: g.top - O.top + N.top,
    bottom: O.bottom - g.bottom + N.bottom,
    left: g.left - O.left + N.left,
    right: O.right - g.right + N.right
  }, k = e.modifiersData.offset;
  if (w === an && k) {
    var B = k[o];
    Object.keys(P).forEach(function(D) {
      var Q = [ze, Fe].indexOf(D) >= 0 ? 1 : -1, J = [Ce, Fe].indexOf(D) >= 0 ? "y" : "x";
      P[D] += B[J] * Q;
    });
  }
  return P;
}
function zw(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? li : c, u = Wt(r), h = u ? l ? La : La.filter(function(v) {
    return Wt(v) === u;
  }) : Bn, w = h.filter(function(v) {
    return d.indexOf(v) >= 0;
  });
  w.length === 0 && (w = h);
  var b = w.reduce(function(v, f) {
    return v[f] = Tn(e, {
      placement: f,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[qe(f)], v;
  }, {});
  return Object.keys(b).sort(function(v, f) {
    return b[v] - b[f];
  });
}
function Uw(e) {
  if (qe(e) === Do)
    return [];
  var t = Zn(e);
  return [Ua(e), t, Ua(t)];
}
function Gw(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, u = n.boundary, h = n.rootBoundary, w = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, f = n.allowedAutoPlacements, m = t.options.placement, N = qe(m), A = N === m, _ = c || (A || !v ? [Zn(m)] : Uw(m)), E = [m].concat(_).reduce(function(z, q) {
      return z.concat(qe(q) === Do ? zw(t, {
        placement: q,
        boundary: u,
        rootBoundary: h,
        padding: d,
        flipVariations: v,
        allowedAutoPlacements: f
      }) : q);
    }, []), g = t.rects.reference, I = t.rects.popper, U = /* @__PURE__ */ new Map(), W = !0, O = E[0], P = 0; P < E.length; P++) {
      var k = E[P], B = qe(k), D = Wt(k) === Ht, Q = [Ce, Fe].indexOf(B) >= 0, J = Q ? "width" : "height", X = Tn(t, {
        placement: k,
        boundary: u,
        rootBoundary: h,
        altBoundary: w,
        padding: d
      }), ee = Q ? D ? ze : Se : D ? Fe : Ce;
      g[J] > I[J] && (ee = Zn(ee));
      var re = Zn(ee), oe = [];
      if (a && oe.push(X[B] <= 0), l && oe.push(X[ee] <= 0, X[re] <= 0), oe.every(function(z) {
        return z;
      })) {
        O = k, W = !1;
        break;
      }
      U.set(k, oe);
    }
    if (W)
      for (var y = v ? 3 : 1, R = function(q) {
        var L = E.find(function(K) {
          var Y = U.get(K);
          if (Y)
            return Y.slice(0, q).every(function(Z) {
              return Z;
            });
        });
        if (L)
          return O = L, "break";
      }, H = y; H > 0; H--) {
        var G = R(H);
        if (G === "break")
          break;
      }
    t.placement !== O && (t.modifiersData[r]._skip = !0, t.placement = O, t.reset = !0);
  }
}
const Hw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Gw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Ha(e, t, n) {
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
function Xa(e) {
  return [Ce, ze, Fe, Se].some(function(t) {
    return e[t] >= 0;
  });
}
function Xw(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, s = Tn(t, {
    elementContext: "reference"
  }), l = Tn(t, {
    altBoundary: !0
  }), c = Ha(s, r), d = Ha(l, o, a), u = Xa(c), h = Xa(d);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": h
  });
}
const Yw = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Xw
};
function Ww(e, t, n) {
  var r = qe(e), o = [Se, Ce].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [Se, ze].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function qw(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = li.reduce(function(u, h) {
    return u[h] = Ww(h, t.rects, a), u;
  }, {}), l = s[t.placement], c = l.x, d = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += d), t.modifiersData[r] = s;
}
const Kw = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: qw
};
function Jw(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = mi({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Zw = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Jw,
  data: {}
};
function Qw(e) {
  return e === "x" ? "y" : "x";
}
function ef(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, u = n.altBoundary, h = n.padding, w = n.tether, b = w === void 0 ? !0 : w, v = n.tetherOffset, f = v === void 0 ? 0 : v, m = Tn(t, {
    boundary: c,
    rootBoundary: d,
    padding: h,
    altBoundary: u
  }), N = qe(t.placement), A = Wt(t.placement), _ = !A, E = jo(N), g = Qw(E), I = t.modifiersData.popperOffsets, U = t.rects.reference, W = t.rects.popper, O = typeof f == "function" ? f(Object.assign({}, t.rects, {
    placement: t.placement
  })) : f, P = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (I) {
    if (a) {
      var D, Q = E === "y" ? Ce : Se, J = E === "y" ? Fe : ze, X = E === "y" ? "height" : "width", ee = I[E], re = ee + m[Q], oe = ee - m[J], y = b ? -W[X] / 2 : 0, R = A === Ht ? U[X] : W[X], H = A === Ht ? -W[X] : -U[X], G = t.elements.arrow, z = b && G ? Bo(G) : {
        width: 0,
        height: 0
      }, q = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ui(), L = q[Q], K = q[J], Y = mn(0, U[X], z[X]), Z = _ ? U[X] / 2 - y - Y - L - P.mainAxis : R - Y - L - P.mainAxis, S = _ ? -U[X] / 2 + y + Y + K + P.mainAxis : H + Y + K + P.mainAxis, F = t.elements.arrow && jn(t.elements.arrow), T = F ? E === "y" ? F.clientTop || 0 : F.clientLeft || 0 : 0, we = (D = k == null ? void 0 : k[E]) != null ? D : 0, V = ee + Z - we - T, xe = ee + S - we, Ge = mn(b ? sr(re, V) : re, ee, b ? xt(oe, xe) : oe);
      I[E] = Ge, B[E] = Ge - ee;
    }
    if (l) {
      var ut, Ee = E === "x" ? Ce : Se, Vn = E === "x" ? Fe : ze, He = I[g], St = g === "y" ? "height" : "width", pt = He + m[Ee], Ot = He - m[Vn], Rt = [Ce, Se].indexOf(N) !== -1, _t = (ut = k == null ? void 0 : k[g]) != null ? ut : 0, wt = Rt ? pt : He - U[St] - W[St] - _t + P.altAxis, Jt = Rt ? He + U[St] + W[St] - _t - P.altAxis : Ot, Ln = b && Rt ? Ew(wt, He, Jt) : mn(b ? wt : pt, He, b ? Jt : Ot);
      I[g] = Ln, B[g] = Ln - He;
    }
    t.modifiersData[r] = B;
  }
}
const tf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: ef,
  requiresIfExists: ["offset"]
};
function nf(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function rf(e) {
  return e === Me(e) || !Le(e) ? Vo(e) : nf(e);
}
function of(e) {
  var t = e.getBoundingClientRect(), n = Xt(t.width) / e.offsetWidth || 1, r = Xt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function af(e, t, n) {
  n === void 0 && (n = !1);
  var r = Le(t), o = Le(t) && of(t), a = dt(t), s = Yt(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Qe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Fo(a)) && (l = rf(t)), Le(t) ? (c = Yt(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Lo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function sf(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var s = [].concat(a.requires || [], a.requiresIfExists || []);
    s.forEach(function(l) {
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
function lf(e) {
  var t = sf(e);
  return bw.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function cf(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function df(e) {
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
var Ya = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Wa() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function uf(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? Ya : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var u = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ya, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, h = [], w = !1, b = {
      state: u,
      setOptions: function(N) {
        var A = typeof N == "function" ? N(u.options) : N;
        f(), u.options = Object.assign({}, a, u.options, A), u.scrollParents = {
          reference: Tt(l) ? hn(l) : l.contextElement ? hn(l.contextElement) : [],
          popper: hn(c)
        };
        var _ = lf(df([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = _.filter(function(E) {
          return E.enabled;
        }), v(), b.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var N = u.elements, A = N.reference, _ = N.popper;
          if (Wa(A, _)) {
            u.rects = {
              reference: af(A, jn(_), u.options.strategy === "fixed"),
              popper: Bo(_)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(P) {
              return u.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var E = 0; E < u.orderedModifiers.length; E++) {
              if (u.reset === !0) {
                u.reset = !1, E = -1;
                continue;
              }
              var g = u.orderedModifiers[E], I = g.fn, U = g.options, W = U === void 0 ? {} : U, O = g.name;
              typeof I == "function" && (u = I({
                state: u,
                options: W,
                name: O,
                instance: b
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: cf(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(u);
        });
      }),
      destroy: function() {
        f(), w = !0;
      }
    };
    if (!Wa(l, c))
      return b;
    b.setOptions(d).then(function(m) {
      !w && d.onFirstUpdate && d.onFirstUpdate(m);
    });
    function v() {
      u.orderedModifiers.forEach(function(m) {
        var N = m.name, A = m.options, _ = A === void 0 ? {} : A, E = m.effect;
        if (typeof E == "function") {
          var g = E({
            state: u,
            name: N,
            instance: b,
            options: _
          }), I = function() {
          };
          h.push(g || I);
        }
      });
    }
    function f() {
      h.forEach(function(m) {
        return m();
      }), h = [];
    }
    return b;
  };
}
var pf = [Aw, Zw, $w, xw, Kw, Hw, tf, Ow, Yw], wf = /* @__PURE__ */ uf({
  defaultModifiers: pf
});
const hi = "Popper";
function ff(e) {
  return si(hi, e);
}
aw(hi, ["root"]);
const mf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], hf = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function gf(e, t) {
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
function Er(e) {
  return e.nodeType !== void 0;
}
function bf(e) {
  return !Er(e);
}
const vf = () => Eo({
  root: ["root"]
}, Jp(ff)), yf = {}, xf = /* @__PURE__ */ j.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: u,
    popperOptions: h,
    popperRef: w,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: f
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = ke(t, mf), N = j.useRef(null), A = kt(N, n), _ = j.useRef(null), E = kt(_, w), g = j.useRef(E);
  Gt(() => {
    g.current = E;
  }, [E]), j.useImperativeHandle(w, () => _.current, []);
  const I = gf(u, s), [U, W] = j.useState(I), [O, P] = j.useState(ir(o));
  j.useEffect(() => {
    _.current && _.current.forceUpdate();
  }), j.useEffect(() => {
    o && P(ir(o));
  }, [o]), Gt(() => {
    if (!O || !d)
      return;
    const J = (re) => {
      W(re.placement);
    };
    if (process.env.NODE_ENV !== "production" && O && Er(O) && O.nodeType === 1) {
      const re = O.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && re.top === 0 && re.left === 0 && re.right === 0 && re.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: re
      }) => {
        J(re);
      }
    }];
    c != null && (X = X.concat(c)), h && h.modifiers != null && (X = X.concat(h.modifiers));
    const ee = wf(O, N.current, $({
      placement: I
    }, h, {
      modifiers: X
    }));
    return g.current(ee), () => {
      ee.destroy(), g.current(null);
    };
  }, [O, l, c, d, h, I]);
  const k = {
    placement: U
  };
  f !== null && (k.TransitionProps = f);
  const B = vf(), D = (r = v.root) != null ? r : "div", Q = nw({
    elementType: D,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: A
    },
    ownerState: t,
    className: B.root
  });
  return /* @__PURE__ */ i(D, $({}, Q, {
    children: typeof a == "function" ? a(k) : a
  }));
}), gi = /* @__PURE__ */ j.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: u,
    placement: h = "bottom",
    popperOptions: w = yf,
    popperRef: b,
    style: v,
    transition: f = !1,
    slotProps: m = {},
    slots: N = {}
  } = t, A = ke(t, hf), [_, E] = j.useState(!0), g = () => {
    E(!1);
  }, I = () => {
    E(!0);
  };
  if (!c && !u && (!f || _))
    return null;
  let U;
  if (a)
    U = a;
  else if (r) {
    const P = ir(r);
    U = P && Er(P) ? nr(P).body : nr(null).body;
  }
  const W = !u && c && (!f || _) ? "none" : void 0, O = f ? {
    in: u,
    onEnter: g,
    onExited: I
  } : void 0;
  return /* @__PURE__ */ i(ar, {
    disablePortal: l,
    container: U,
    children: /* @__PURE__ */ i(xf, $({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: f ? !_ : u,
      placement: h,
      popperOptions: w,
      popperRef: b,
      slotProps: m,
      slots: N
    }, A, {
      style: $({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: W
      }, v),
      TransitionProps: O,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (gi.propTypes = {
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
  anchorEl: No(p.oneOfType([Nn, p.object, p.func]), (e) => {
    if (e.open) {
      const t = ir(e.anchorEl);
      if (t && Er(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || bf(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: Us,
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
function bi() {
  const e = ti(Po);
  return process.env.NODE_ENV !== "production" && j.useDebugValue(e), e[$o] || e;
}
function oo(e, t) {
  return oo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, oo(e, t);
}
function Nf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, oo(e, t);
}
const qa = {
  disabled: !1
};
var kf = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.shape({
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
const vi = M.createContext(null);
var Ef = function(t) {
  return t.scrollTop;
}, un = "unmounted", ht = "exited", gt = "entering", Bt = "entered", ao = "exiting", at = /* @__PURE__ */ function(e) {
  Nf(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = ht, a.appearStatus = gt) : c = Bt : r.unmountOnExit || r.mountOnEnter ? c = un : c = ht, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === un ? {
      status: ht
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== gt && s !== Bt && (a = gt) : (s === gt || s === Bt) && (a = ao);
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
      if (this.cancelNextCallback(), a === gt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Un.findDOMNode(this);
          s && Ef(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ht && this.setState({
        status: un
      });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Un.findDOMNode(this), l], d = c[0], u = c[1], h = this.getTimeouts(), w = l ? h.appear : h.enter;
    if (!o && !s || qa.disabled) {
      this.safeSetState({
        status: Bt
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, u), this.safeSetState({
      status: gt
    }, function() {
      a.props.onEntering(d, u), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: Bt
        }, function() {
          a.props.onEntered(d, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Un.findDOMNode(this);
    if (!a || qa.disabled) {
      this.safeSetState({
        status: ht
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: ao
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: ht
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Un.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === un)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = ke(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ M.createElement(vi.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : M.cloneElement(M.Children.only(s), l))
    );
  }, t;
}(M.Component);
at.contextType = vi;
at.propTypes = process.env.NODE_ENV !== "production" ? {
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
    current: typeof Element > "u" ? p.any : function(e, t, n, r, o, a) {
      var s = e[t];
      return p.instanceOf(s && "ownerDocument" in s ? s.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, a);
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
  timeout: function(t) {
    var n = kf;
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
function Mt() {
}
at.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Mt,
  onEntering: Mt,
  onEntered: Mt,
  onExit: Mt,
  onExiting: Mt,
  onExited: Mt
};
at.UNMOUNTED = un;
at.EXITED = ht;
at.ENTERING = gt;
at.ENTERED = Bt;
at.EXITING = ao;
const Tf = at, Cf = (e) => e.scrollTop;
function Ka(e, t) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: s = {}
  } = e;
  return {
    duration: (n = s.transitionDuration) != null ? n : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (r = s.transitionTimingFunction) != null ? r : typeof a == "object" ? a[t.mode] : a,
    delay: s.transitionDelay
  };
}
const Sf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function so(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Of = {
  entering: {
    opacity: 1,
    transform: so(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Gr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), zo = /* @__PURE__ */ j.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: u,
    onExit: h,
    onExited: w,
    onExiting: b,
    style: v,
    timeout: f = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = Tf
  } = t, N = ke(t, Sf), A = cn(), _ = j.useRef(), E = bi(), g = j.useRef(null), I = kt(g, a.ref, n), U = (J) => (X) => {
    if (J) {
      const ee = g.current;
      X === void 0 ? J(ee) : J(ee, X);
    }
  }, W = U(u), O = U((J, X) => {
    Cf(J);
    const {
      duration: ee,
      delay: re,
      easing: oe
    } = Ka({
      style: v,
      timeout: f,
      easing: s
    }, {
      mode: "enter"
    });
    let y;
    f === "auto" ? (y = E.transitions.getAutoHeightDuration(J.clientHeight), _.current = y) : y = ee, J.style.transition = [E.transitions.create("opacity", {
      duration: y,
      delay: re
    }), E.transitions.create("transform", {
      duration: Gr ? y : y * 0.666,
      delay: re,
      easing: oe
    })].join(","), c && c(J, X);
  }), P = U(d), k = U(b), B = U((J) => {
    const {
      duration: X,
      delay: ee,
      easing: re
    } = Ka({
      style: v,
      timeout: f,
      easing: s
    }, {
      mode: "exit"
    });
    let oe;
    f === "auto" ? (oe = E.transitions.getAutoHeightDuration(J.clientHeight), _.current = oe) : oe = X, J.style.transition = [E.transitions.create("opacity", {
      duration: oe,
      delay: ee
    }), E.transitions.create("transform", {
      duration: Gr ? oe : oe * 0.666,
      delay: Gr ? ee : ee || oe * 0.333,
      easing: re
    })].join(","), J.style.opacity = 0, J.style.transform = so(0.75), h && h(J);
  }), D = U(w);
  return /* @__PURE__ */ i(m, $({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: O,
    onEntered: P,
    onEntering: W,
    onExit: B,
    onExited: D,
    onExiting: k,
    addEndListener: (J) => {
      f === "auto" && A.start(_.current || 0, J), r && r(g.current, J);
    },
    timeout: f === "auto" ? null : f
  }, N, {
    children: (J, X) => /* @__PURE__ */ j.cloneElement(a, $({
      style: $({
        opacity: 0,
        transform: so(0.75),
        visibility: J === "exited" && !l ? "hidden" : void 0
      }, Of[J], v, a.props.style),
      ref: I
    }, X))
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
  children: Fs.isRequired,
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
zo.muiSupportAuto = !0;
const Ja = zo, Rf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], _f = Mn(gi, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), yi = /* @__PURE__ */ j.forwardRef(function(t, n) {
  var r;
  const o = ei(), a = Io({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: d,
    container: u,
    disablePortal: h,
    keepMounted: w,
    modifiers: b,
    open: v,
    placement: f,
    popperOptions: m,
    popperRef: N,
    transition: A,
    slots: _,
    slotProps: E
  } = a, g = ke(a, Rf), I = (r = _ == null ? void 0 : _.root) != null ? r : c == null ? void 0 : c.Root, U = $({
    anchorEl: s,
    container: u,
    disablePortal: h,
    keepMounted: w,
    modifiers: b,
    open: v,
    placement: f,
    popperOptions: m,
    popperRef: N,
    transition: A
  }, g);
  return /* @__PURE__ */ i(_f, $({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: I
    },
    slotProps: E ?? d
  }, U, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (yi.propTypes = {
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
  popperRef: Us,
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
const xi = yi;
function Pf(e) {
  return wr("MuiTooltip", e);
}
const $f = Ks("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), it = $f, If = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Af(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Df = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = e, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Ze(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Eo(s, Pf, t);
}, Mf = Mn(xi, {
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
  [`&[data-popper-placement*="bottom"] .${it.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${it.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${it.arrow}`]: $({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${it.arrow}`]: $({}, t.isRtl ? {
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
})), Bf = Mn("div", {
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
}) => $({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : ni(e.palette.grey[700], 0.92),
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
  lineHeight: `${Af(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${it.popper}[data-popper-placement*="left"] &`]: $({
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
  [`.${it.popper}[data-popper-placement*="right"] &`]: $({
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
  [`.${it.popper}[data-popper-placement*="top"] &`]: $({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${it.popper}[data-popper-placement*="bottom"] &`]: $({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), jf = Mn("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : ni(e.palette.grey[700], 0.9),
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
let Yn = !1;
const Za = new In();
let sn = {
  x: 0,
  y: 0
};
function Wn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const Ni = /* @__PURE__ */ j.forwardRef(function(t, n) {
  var r, o, a, s, l, c, d, u, h, w, b, v, f, m, N, A, _, E, g;
  const I = Io({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: U = !1,
    children: W,
    components: O = {},
    componentsProps: P = {},
    describeChild: k = !1,
    disableFocusListener: B = !1,
    disableHoverListener: D = !1,
    disableInteractive: Q = !1,
    disableTouchListener: J = !1,
    enterDelay: X = 100,
    enterNextDelay: ee = 0,
    enterTouchDelay: re = 700,
    followCursor: oe = !1,
    id: y,
    leaveDelay: R = 0,
    leaveTouchDelay: H = 1500,
    onClose: G,
    onOpen: z,
    open: q,
    placement: L = "bottom",
    PopperComponent: K,
    PopperProps: Y = {},
    slotProps: Z = {},
    slots: S = {},
    title: F,
    TransitionComponent: T = Ja,
    TransitionProps: we
  } = I, V = ke(I, If), xe = /* @__PURE__ */ j.isValidElement(W) ? W : /* @__PURE__ */ i("span", {
    children: W
  }), Ge = bi(), ut = Ge.direction === "rtl", [Ee, Vn] = j.useState(), [He, St] = j.useState(null), pt = j.useRef(!1), Ot = Q || oe, Rt = cn(), _t = cn(), wt = cn(), Jt = cn(), [Ln, Uo] = Hs({
    controlled: q,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let et = Ln;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: te
    } = j.useRef(q !== void 0);
    j.useEffect(() => {
      Ee && Ee.disabled && !te && F !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [F, Ee, te]);
  }
  const Tr = Gs(y), Zt = j.useRef(), Fn = eo(() => {
    Zt.current !== void 0 && (document.body.style.WebkitUserSelect = Zt.current, Zt.current = void 0), Jt.clear();
  });
  j.useEffect(() => Fn, [Fn]);
  const Go = (te) => {
    Za.clear(), Yn = !0, Uo(!0), z && !et && z(te);
  }, zn = eo(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (te) => {
      Za.start(800 + R, () => {
        Yn = !1;
      }), Uo(!1), G && et && G(te), Rt.start(Ge.transitions.duration.shortest, () => {
        pt.current = !1;
      });
    }
  ), Cr = (te) => {
    pt.current && te.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), _t.clear(), wt.clear(), X || Yn && ee ? _t.start(Yn ? ee : X, () => {
      Go(te);
    }) : Go(te));
  }, Ho = (te) => {
    _t.clear(), wt.start(R, () => {
      zn(te);
    });
  }, {
    isFocusVisibleRef: Xo,
    onBlur: Pi,
    onFocus: $i,
    ref: Ii
  } = Xs(), [, Yo] = j.useState(!1), Wo = (te) => {
    Pi(te), Xo.current === !1 && (Yo(!1), Ho(te));
  }, qo = (te) => {
    Ee || Vn(te.currentTarget), $i(te), Xo.current === !0 && (Yo(!0), Cr(te));
  }, Ko = (te) => {
    pt.current = !0;
    const _e = xe.props;
    _e.onTouchStart && _e.onTouchStart(te);
  }, Jo = Cr, Zo = Ho, Ai = (te) => {
    Ko(te), wt.clear(), Rt.clear(), Fn(), Zt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Jt.start(re, () => {
      document.body.style.WebkitUserSelect = Zt.current, Cr(te);
    });
  }, Di = (te) => {
    xe.props.onTouchEnd && xe.props.onTouchEnd(te), Fn(), wt.start(H, () => {
      zn(te);
    });
  };
  j.useEffect(() => {
    if (!et)
      return;
    function te(_e) {
      (_e.key === "Escape" || _e.key === "Esc") && zn(_e);
    }
    return document.addEventListener("keydown", te), () => {
      document.removeEventListener("keydown", te);
    };
  }, [zn, et]);
  const Mi = kt(xe.ref, Ii, Vn, n);
  !F && F !== 0 && (et = !1);
  const Sr = j.useRef(), Bi = (te) => {
    const _e = xe.props;
    _e.onMouseMove && _e.onMouseMove(te), sn = {
      x: te.clientX,
      y: te.clientY
    }, Sr.current && Sr.current.update();
  }, Qt = {}, Or = typeof F == "string";
  k ? (Qt.title = !et && Or && !D ? F : null, Qt["aria-describedby"] = et ? Tr : null) : (Qt["aria-label"] = Or ? F : null, Qt["aria-labelledby"] = et && !Or ? Tr : null);
  const Be = $({}, Qt, V, xe.props, {
    className: yt(V.className, xe.props.className),
    onTouchStart: Ko,
    ref: Mi
  }, oe ? {
    onMouseMove: Bi
  } : {});
  process.env.NODE_ENV !== "production" && (Be["data-mui-internal-clone-element"] = !0, j.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const en = {};
  J || (Be.onTouchStart = Ai, Be.onTouchEnd = Di), D || (Be.onMouseOver = Wn(Jo, Be.onMouseOver), Be.onMouseLeave = Wn(Zo, Be.onMouseLeave), Ot || (en.onMouseOver = Jo, en.onMouseLeave = Zo)), B || (Be.onFocus = Wn(qo, Be.onFocus), Be.onBlur = Wn(Wo, Be.onBlur), Ot || (en.onFocus = qo, en.onBlur = Wo)), process.env.NODE_ENV !== "production" && xe.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));
  const ji = j.useMemo(() => {
    var te;
    let _e = [{
      name: "arrow",
      enabled: !!He,
      options: {
        element: He,
        padding: 4
      }
    }];
    return (te = Y.popperOptions) != null && te.modifiers && (_e = _e.concat(Y.popperOptions.modifiers)), $({}, Y.popperOptions, {
      modifiers: _e
    });
  }, [He, Y]), tn = $({}, I, {
    isRtl: ut,
    arrow: U,
    disableInteractive: Ot,
    placement: L,
    PopperComponentProp: K,
    touch: pt.current
  }), Rr = Df(tn), Qo = (r = (o = S.popper) != null ? o : O.Popper) != null ? r : Mf, ea = (a = (s = (l = S.transition) != null ? l : O.Transition) != null ? s : T) != null ? a : Ja, ta = (c = (d = S.tooltip) != null ? d : O.Tooltip) != null ? c : Bf, na = (u = (h = S.arrow) != null ? h : O.Arrow) != null ? u : jf, Vi = dn(Qo, $({}, Y, (w = Z.popper) != null ? w : P.popper, {
    className: yt(Rr.popper, Y == null ? void 0 : Y.className, (b = (v = Z.popper) != null ? v : P.popper) == null ? void 0 : b.className)
  }), tn), Li = dn(ea, $({}, we, (f = Z.transition) != null ? f : P.transition), tn), Fi = dn(ta, $({}, (m = Z.tooltip) != null ? m : P.tooltip, {
    className: yt(Rr.tooltip, (N = (A = Z.tooltip) != null ? A : P.tooltip) == null ? void 0 : N.className)
  }), tn), zi = dn(na, $({}, (_ = Z.arrow) != null ? _ : P.arrow, {
    className: yt(Rr.arrow, (E = (g = Z.arrow) != null ? g : P.arrow) == null ? void 0 : E.className)
  }), tn);
  return /* @__PURE__ */ x(j.Fragment, {
    children: [/* @__PURE__ */ j.cloneElement(xe, Be), /* @__PURE__ */ i(Qo, $({
      as: K ?? xi,
      placement: L,
      anchorEl: oe ? {
        getBoundingClientRect: () => ({
          top: sn.y,
          left: sn.x,
          right: sn.x,
          bottom: sn.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Sr,
      open: Ee ? et : !1,
      id: Tr,
      transition: !0
    }, en, Vi, {
      popperOptions: ji,
      children: ({
        TransitionProps: te
      }) => /* @__PURE__ */ i(ea, $({
        timeout: Ge.transitions.duration.shorter
      }, te, Li, {
        children: /* @__PURE__ */ x(ta, $({}, Fi, {
          children: [F, U ? /* @__PURE__ */ i(na, $({}, zi, {
            ref: St
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ni.propTypes = {
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
  children: Fs.isRequired,
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
const Vf = Ni;
function Qa(e, t, n) {
  return e ? /* @__PURE__ */ i(ds, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ki(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: s = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: d = !1,
    isDense: u = !0,
    isSubMenuParent: h = !1,
    hasDisabledGutters: w = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: f,
    children: m
  } = e, N = /* @__PURE__ */ i(
    Pl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: u,
      disableGutters: w,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: f,
      children: n ? /* @__PURE__ */ x(lt, { children: [
        Qa(a, n, !0),
        /* @__PURE__ */ i($l, { primary: n, inset: !a && o }),
        h ? /* @__PURE__ */ i(ds, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ i(oi, {}) }) : Qa(s, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ i(Vf, { title: r, placement: "right", children: /* @__PURE__ */ i("div", { children: N }) }) : N;
}
function Ei(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Lf(e) {
  const [t, n] = ie(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, s = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Ei(a).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ i(Ti, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ x(lt, { children: [
    /* @__PURE__ */ i(ki, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ i(
      Il,
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
const Ff = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Ti(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: s } = Ne(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ei(t).filter((v) => !("menuItem" in v.group))
    ), h = Object.values(u).sort(
      (v, f) => (v.group.order || 0) - (f.group.order || 0)
    ), w = [];
    h.forEach((v) => {
      Ff(v.id, t.items).forEach(
        (f) => w.push({ item: f, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const b = w.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: u, isLastItemInGroup: h }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: h,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ i("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ i("div", { role: "menu", "aria-label": d, children: a.map((u, h) => {
    const { item: w } = u, b = l(u);
    if ("command" in w) {
      const v = w.group + h;
      return /* @__PURE__ */ i(
        ki,
        {
          onClick: (f) => {
            n == null || n(f), r(w);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ i(
      Lf,
      {
        parentMenuItem: w,
        parentItemProps: b,
        ...e
      },
      d + w.id
    );
  }) }, d);
}
function zf(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(Ti, { ...e, includedGroups: a });
}
function Uf({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ x(
    us,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(Al, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
          zf,
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
function Gf({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Ne(() => {
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
    us,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ i(
        Uf,
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
function Hf(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const io = (e, t, n = {}) => {
  const r = vt(t);
  r.current = t;
  const o = vt(n);
  o.current = Hf(o.current);
  const [a, s] = ie(() => r.current), [l, c] = ie(!0);
  return Ke(() => {
    let d = !0;
    return c(!!e), (async () => {
      if (e) {
        const u = await e();
        d && (s(() => u), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || s(() => r.current);
    };
  }, [e]), [a, l];
}, Xf = ri(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Yf({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, d] = ie(!1), [u, h] = ie(!1), w = Ie(() => {
    c && d(!1), h(!1);
  }, [c]), b = Ie((E) => {
    E.stopPropagation(), d((g) => {
      const I = !g;
      return I && E.shiftKey ? h(!0) : I || h(!1), I;
    });
  }, []), v = Ie(
    (E) => (w(), r(E)),
    [r, w]
  ), [f, m] = ie({ top: 1, left: 1 });
  Ke(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const g = E.getBoundingClientRect(), I = window.scrollY, U = window.scrollX, W = g.top + I + E.clientHeight, O = g.left + U;
        m({ top: W, left: O });
      }
    }
  }, [c, o]);
  const [N] = io(
    Ie(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [A] = io(
    Ie(async () => (e == null ? void 0 : e(!0)) ?? n ?? N, [e, n, N, c]),
    n ?? N
  ), _ = u && A ? A : N;
  return /* @__PURE__ */ x(lt, { children: [
    /* @__PURE__ */ i(
      ps,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${s ?? ""} menu button`,
        onClick: b,
        children: l ?? /* @__PURE__ */ i(Xf, {})
      }
    ),
    /* @__PURE__ */ i(
      Dl,
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
        children: _ ? /* @__PURE__ */ i(
          Gf,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: _
          }
        ) : void 0
      }
    )
  ] });
}
function Ym({
  id: e,
  label: t,
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
    ps,
    {
      id: e,
      disabled: n,
      edge: a,
      size: s,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: d
    }
  );
}
const Ct = lr(({ className: e, ...t }, n) => /* @__PURE__ */ i(il, { size: 35, className: C("tw-animate-spin", e), ...t, ref: n }));
Ct.displayName = "Spinner";
function Wm({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: s,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: u,
  onChange: h,
  onFocus: w,
  onBlur: b
}) {
  return /* @__PURE__ */ x("div", { className: C("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ i(
      De,
      {
        htmlFor: e,
        className: C({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ i(
      qt,
      {
        id: e,
        disabled: t,
        placeholder: s,
        required: l,
        className: C(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: u,
        onChange: h,
        onFocus: w,
        onBlur: b
      }
    ),
    /* @__PURE__ */ i("p", { className: C({ "tw-hidden": !o }), children: o })
  ] });
}
function qm({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = vt(void 0);
  return /* @__PURE__ */ i("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ i(Ml, { position: "static", id: r, children: /* @__PURE__ */ x(
    Bl,
    {
      className: C("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ i(
          Yf,
          {
            commandHandler: t,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ i("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const Wf = Sn(
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
), qf = M.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: C(Wf({ variant: t }), e), ...n }));
qf.displayName = "Alert";
const Kf = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ x(
    "h5",
    {
      ref: n,
      className: C("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Kf.displayName = "AlertTitle";
const Jf = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: C("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
Jf.displayName = "AlertDescription";
const Zf = Sn(
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
function Km({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ i("div", { className: C("pr-twp", Zf({ variant: t }), e), ...n });
}
const Ci = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: C(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Ci.displayName = "Card";
const Si = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: C("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Si.displayName = "CardHeader";
const Oi = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "h3",
    {
      ref: n,
      className: C(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
Oi.displayName = "CardTitle";
const Ri = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i("p", { ref: n, className: C("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Ri.displayName = "CardDescription";
const _i = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i("div", { ref: n, className: C("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
_i.displayName = "CardContent";
const Qf = M.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: C("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Qf.displayName = "CardFooter";
function Jm({ ...e }) {
  return /* @__PURE__ */ i(
    Vl,
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
const em = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  ln.Root,
  {
    ref: n,
    className: C(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ i(ln.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ i(ln.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ i(ln.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
em.displayName = ln.Root.displayName;
const tm = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  qr.Root,
  {
    className: C(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ i(
      qr.Thumb,
      {
        className: C(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
        )
      }
    )
  }
));
tm.displayName = qr.Root.displayName;
const Zm = Re.Root, nm = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.List,
  {
    ref: n,
    className: C(
      "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
nm.displayName = Re.List.displayName;
const rm = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.Trigger,
  {
    ref: n,
    className: C(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
rm.displayName = Re.Trigger.displayName;
const om = M.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ i(
  Re.Content,
  {
    ref: n,
    className: C(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
om.displayName = Re.Content.displayName;
function Qm({
  isInstalling: e,
  handleClick: t,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ i(
    fe,
    {
      className: C(
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
      children: e ? /* @__PURE__ */ i(Ct, { size: 15 }) : /* @__PURE__ */ x(lt, { children: [
        /* @__PURE__ */ i(ll, { size: 25, className: C("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function eh({
  isEnabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    fe,
    {
      className: C(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ x(lt, { children: [
        /* @__PURE__ */ i(Ct, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function th({
  isDisabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    fe,
    {
      className: C(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ x(lt, { children: [
        /* @__PURE__ */ i(Ct, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function nh({
  isUpdating: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    fe,
    {
      className: C(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ x(lt, { children: [
        /* @__PURE__ */ i(Ct, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function rh({
  id: e,
  markdown: t,
  className: n,
  anchorTarget: r
}) {
  const o = Ne(
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
  return /* @__PURE__ */ i("div", { id: e, className: C("pr-twp tw-prose", n), children: /* @__PURE__ */ i(Ll, { options: o, children: t }) });
}
const am = lr((e, t) => /* @__PURE__ */ x(
  fe,
  {
    ref: t,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ i(cl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        Vt,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var sm = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(sm || {});
function oh({ id: e, groups: t }) {
  return /* @__PURE__ */ i("div", { id: e, children: /* @__PURE__ */ x(vn, { children: [
    /* @__PURE__ */ i(er, { asChild: !0, children: /* @__PURE__ */ i(am, {}) }),
    /* @__PURE__ */ i(Lt, { children: t.map((n) => /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ i(On, { children: n.label }),
      /* @__PURE__ */ i(tc, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(dr, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(vs, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i(Rn, {})
    ] }, n.label)) })
  ] }) });
}
function ah({ id: e, message: t }) {
  return /* @__PURE__ */ i("div", { id: e, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: t }) }) });
}
function sh({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new yl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), s = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ x(
    "div",
    {
      id: e,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: t }) }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i(dl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ i(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ x(
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
        /* @__PURE__ */ x("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ x(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ i(ul, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ x(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ i(pl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function im({ id: e, versionHistory: t }) {
  const [n, r] = ie(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), u = d.getUTCFullYear() - 1970, h = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let b = "";
    return u > 0 ? b = `${u.toString()} year${u === 1 ? "" : "s"} ago` : h > 0 ? b = `${h.toString()} month${h === 1 ? "" : "s"} ago` : w === 0 ? b = "today" : b = `${w.toString()} day${w === 1 ? "" : "s"} ago`, b;
  }
  const s = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ x("div", { id: e, children: [
    /* @__PURE__ */ i("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ i("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ x("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ i("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ i("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ i("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ x("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ x("div", { children: [
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
function ih({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Ne(() => xl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((u) => d.of(u));
  })(r);
  return /* @__PURE__ */ i("div", { id: e, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ x("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ i(im, { versionHistory: o }),
    /* @__PURE__ */ i("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ x("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ i("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ x("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ i("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const lh = [
  "%resources_action%",
  "%resources_dialog_subtitle%",
  "%resources_dialog_title%",
  "%resources_filterInput%",
  "%resources_fullName%",
  "%resources_get%",
  "%resources_installed%",
  "%resources_language%",
  "%resources_languageFilter%",
  "%resources_loadingResources%",
  "%resources_noResults%",
  "%resources_open%",
  "%resources_remove%",
  "%resources_size%",
  "%resources_type%",
  "%resources_type_DBL%",
  "%resources_type_ER%",
  "%resources_type_SLR%",
  "%resources_type_XR%",
  "%resources_type_unknown%",
  "%resources_update%"
], lm = (e, t) => {
  const n = Array.from(
    new Set(e.map((o) => o.bestLanguageName))
  ), r = new Set(
    t.concat(
      e.filter((o) => o.installed).map((o) => o.bestLanguageName)
    )
  );
  return n.sort((o, a) => {
    const s = r.has(o), l = r.has(a);
    return s && l ? o.localeCompare(a) : s ? -1 : l ? 1 : o.localeCompare(a);
  });
}, es = (e, t, n) => /* @__PURE__ */ i(fe, { variant: "outline", onClick: () => n(e.dblEntryUid, "install"), children: t }), cm = (e, t, n, r, o, a) => t.includes(e.dblEntryUid) ? /* @__PURE__ */ i(fe, { variant: "outline", children: /* @__PURE__ */ i(Ct, { className: "tw-h-5 tw-py-[1px]" }) }) : e.installed ? e.updateAvailable ? es(e, r, a) : /* @__PURE__ */ i(De, { className: "tw-my-2 tw-flex tw-h-6 tw-items-center", children: o }) : es(e, n, a);
function ch({
  localizedStrings: e,
  dblResources: t,
  isLoadingDblResources: n,
  typeFilter: r,
  setTypeFilter: o,
  languageFilter: a,
  setLanguageFilter: s,
  openResource: l,
  installResource: c,
  uninstallResource: d
}) {
  const u = e["%resources_action%"], h = e["%resources_dialog_subtitle%"], w = e["%resources_dialog_title%"], b = e["%resources_filterInput%"], v = e["%resources_fullName%"], f = e["%resources_get%"], m = e["%resources_installed%"], N = e["%resources_language%"], A = e["%resources_languageFilter%"], _ = e["%resources_loadingResources%"], E = e["%resources_noResults%"], g = e["%resources_open%"], I = e["%resources_remove%"], U = e["%resources_size%"], W = e["%resources_type%"], O = e["%resources_type_DBL%"], P = e["%resources_type_ER%"], k = e["%resources_type_SLR%"], B = e["%resources_type_XR%"], D = e["%resources_type_unknown%"], Q = e["%resources_update%"], [J, X] = ie([]), ee = (S, F) => {
    if (!c || !d)
      return;
    const T = {
      dblEntryUid: S,
      action: F === "install" ? "installing" : "removing"
    };
    X((V) => [...V, T]), (F === "install" ? c : d)(S).catch((V) => {
      console.debug(Nl(V));
    });
  };
  Ke(() => {
    X(
      (S) => S.filter((F) => {
        const T = t.find((we) => we.dblEntryUid === F.dblEntryUid);
        return T ? !(F.action === "installing" && T.installed || F.action === "removing" && !T.installed) : !0;
      })
    );
  }, [t]);
  const [re, oe] = ie(""), y = Ne(() => t.filter((S) => {
    const F = re.toLowerCase();
    return S.displayName.toLowerCase().includes(F) || S.fullName.toLowerCase().includes(F) || S.bestLanguageName.toLowerCase().includes(F);
  }), [t, re]), R = Ne(() => [
    { type: "DBLResource", localizedValue: O },
    { type: "EnhancedResource", localizedValue: P },
    { type: "SourceLanguageResource", localizedValue: k },
    { type: "XmlResource", localizedValue: B }
  ], [O, P, k, B]), H = (S) => {
    const F = [...r];
    let T = [];
    !F || F.length === 0 ? T = [S] : T = F.includes(S) ? F.filter((we) => we !== S) : [...F, S], o(T);
  }, G = Ne(() => y.filter((S) => r.includes(S.type)), [y, r]);
  Ke(() => {
    a.length === 0 && s(
      t.filter((S) => S.installed === !0).map((S) => S.bestLanguageName)
    );
  }, [t, a.length, s]);
  const z = (S) => {
    const F = [...a];
    let T = [];
    !F || F.length === 0 ? T = [S] : T = F.includes(S) ? F.filter((we) => we !== S) : [...F, S], s(T);
  }, q = Ne(() => G.filter((S) => a.includes(S.bestLanguageName)), [a, G]), [L, K] = ie({
    key: "bestLanguageName",
    direction: "ascending"
  }), Y = Ne(() => [...q].sort((S, F) => {
    const T = S[L.key], we = F[L.key];
    return T < we ? L.direction === "ascending" ? -1 : 1 : T > we ? L.direction === "ascending" ? 1 : -1 : 0;
  }), [L.direction, L.key, q]), Z = (S) => {
    const F = { key: S, direction: "ascending" };
    L.key === S && L.direction === "ascending" && (F.direction = "descending"), K(F);
  };
  return /* @__PURE__ */ x(Ci, { className: "tw-rounded-none tw-border-0", children: [
    /* @__PURE__ */ i(Si, { children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(oa, { size: 36, className: "tw-mr-2" }),
      /* @__PURE__ */ x("div", { children: [
        /* @__PURE__ */ i(Oi, { children: w }),
        /* @__PURE__ */ i(Ri, { className: "tw-mt-1", children: h })
      ] })
    ] }) }),
    /* @__PURE__ */ i(_i, { children: n || !t ? /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ i(De, { children: _ }),
      /* @__PURE__ */ i(Ct, {})
    ] }) : /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ x("div", { className: "tw-mb-1 tw-flex tw-gap-1", children: [
        /* @__PURE__ */ x("div", { className: "tw-relative", children: [
          /* @__PURE__ */ i(
            qt,
            {
              type: "text",
              className: "tw-box-border tw-min-w-72 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none",
              onChange: (S) => oe(S.target.value),
              value: re,
              placeholder: b
            }
          ),
          /* @__PURE__ */ i(lo, { className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground" })
        ] }),
        /* @__PURE__ */ x(vn, { children: [
          /* @__PURE__ */ i(er, { asChild: !0, children: /* @__PURE__ */ x(fe, { variant: "outline", children: [
            /* @__PURE__ */ i(wl, { className: "tw-mr-2 tw-w-4" }),
            W
          ] }) }),
          /* @__PURE__ */ i(Lt, { align: "start", children: R.map((S) => /* @__PURE__ */ i(
            dr,
            {
              checked: r.includes(S.type),
              onClick: (F) => {
                F.preventDefault(), H(S.type);
              },
              children: /* @__PURE__ */ i("span", { children: S.localizedValue })
            }
          )) })
        ] }),
        /* @__PURE__ */ i(
          Jr,
          {
            className: "tw-w-auto tw-min-w-10 tw-flex-shrink",
            buttonPlaceholder: N,
            textPlaceholder: A,
            value: a[0],
            options: lm(t, a),
            onChange: z
          }
        )
      ] }),
      Y.length === 0 ? /* @__PURE__ */ i("div", { className: "tw-m-4 tw-flex tw-w-full tw-justify-center", children: /* @__PURE__ */ i(De, { children: E }) }) : /* @__PURE__ */ x(_n, { stickyHeader: !0, children: [
        /* @__PURE__ */ i(Pn, { className: "tw-bg-none", stickyHeader: !0, children: /* @__PURE__ */ x(We, { children: [
          /* @__PURE__ */ i(je, {}),
          /* @__PURE__ */ i(je, {}),
          /* @__PURE__ */ i(je, { onClick: () => Z("fullName"), children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            v,
            L.key !== "fullName" && /* @__PURE__ */ i(Qn, { className: "tw-pl-1", size: 16 }),
            L.key === "fullName" && (L.direction === "ascending" ? /* @__PURE__ */ i(Xr, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ i(Vt, { className: "tw-pl-1", size: 16 }))
          ] }) }),
          /* @__PURE__ */ i(je, { onClick: () => Z("bestLanguageName"), children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            N,
            L.key !== "bestLanguageName" && /* @__PURE__ */ i(Qn, { className: "tw-pl-1", size: 16 }),
            L.key === "bestLanguageName" && (L.direction === "ascending" ? /* @__PURE__ */ i(Xr, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ i(Vt, { className: "tw-pl-1", size: 16 }))
          ] }) }),
          /* @__PURE__ */ i(je, { children: W }),
          /* @__PURE__ */ i(je, { children: U }),
          /* @__PURE__ */ i(je, { children: u })
        ] }) }),
        /* @__PURE__ */ i($n, { children: Y.map((S) => {
          var F;
          return /* @__PURE__ */ x(We, { children: [
            /* @__PURE__ */ i($e, { children: /* @__PURE__ */ i(oa, { className: "tw-pr-0", size: 18 }) }),
            /* @__PURE__ */ i($e, { children: S.displayName }),
            /* @__PURE__ */ i($e, { className: "tw-font-medium", children: S.fullName }),
            /* @__PURE__ */ i($e, { children: S.bestLanguageName }),
            /* @__PURE__ */ i($e, { children: ((F = R.find((T) => T.type === S.type)) == null ? void 0 : F.localizedValue) ?? D }),
            /* @__PURE__ */ i($e, { children: S.size }),
            /* @__PURE__ */ i($e, { children: /* @__PURE__ */ x("div", { className: "tw-flex tw-justify-between", children: [
              cm(
                S,
                J.map((T) => T.dblEntryUid),
                f,
                Q,
                m,
                ee
              ),
              S.installed && /* @__PURE__ */ x(vn, { children: [
                /* @__PURE__ */ i(er, { asChild: !0, children: /* @__PURE__ */ i(fe, { variant: "ghost", children: /* @__PURE__ */ i(fl, { className: "tw-w-4" }) }) }),
                /* @__PURE__ */ x(Lt, { align: "start", children: [
                  /* @__PURE__ */ i(tr, { onClick: () => l(S.projectId), children: /* @__PURE__ */ i("span", { children: g }) }),
                  /* @__PURE__ */ i(Rn, {}),
                  /* @__PURE__ */ i(
                    tr,
                    {
                      onClick: () => ee(S.dblEntryUid, "remove"),
                      children: /* @__PURE__ */ i("span", { children: I })
                    }
                  )
                ] })
              ] })
            ] }) })
          ] }, S.displayName + S.fullName);
        }) })
      ] })
    ] }) })
  ] });
}
const dh = (e, t) => {
  Ke(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Hr = () => !1, uh = (e, t) => {
  const [n] = io(
    Ie(async () => {
      if (!e)
        return Hr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Hr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ke(() => () => {
    n !== Hr && n();
  }, [n]);
};
function dm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
dm(`*, ::before, ::after {
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
.tw-left-1\\/2 {
  left: 50%;
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
.tw-top-2\\.5 {
  top: 0.625rem;
}
.tw-top-4 {
  top: 1rem;
}
.tw-top-48 {
  top: 12rem;
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
.tw-mx-auto {
  margin-left: auto;
  margin-right: auto;
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
.tw-mb-6 {
  margin-bottom: 1.5rem;
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
.tw-h-auto {
  height: auto;
}
.tw-h-full {
  height: 100%;
}
.tw-h-px {
  height: 1px;
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
.tw-w-\\[300px\\] {
  width: 300px;
}
.tw-w-\\[30px\\] {
  width: 30px;
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
.tw-min-w-10 {
  min-width: 2.5rem;
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
.tw-max-w-4xl {
  max-width: 56rem;
}
.tw-max-w-64 {
  max-width: 16rem;
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
.tw-flex-shrink {
  flex-shrink: 1;
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
.tw-grid-cols-1 {
  grid-template-columns: repeat(1, minmax(0, 1fr));
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
.tw-pr-8 {
  padding-right: 2rem;
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
.tw-text-muted {
  color: hsl(var(--muted));
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
.tw-drop-shadow-sm {
  --tw-drop-shadow: drop-shadow(0 1px 1px rgb(0 0 0 / 0.05));
  filter: var(--tw-blur) var(--tw-brightness) var(--tw-contrast) var(--tw-grayscale) var(--tw-hue-rotate) var(--tw-invert) var(--tw-saturate) var(--tw-sepia) var(--tw-drop-shadow);
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
.tw-animate-in {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.tw-fade-in {
  --tw-enter-opacity: 0;
}
.tw-slide-in-from-bottom-4 {
  --tw-enter-translate-y: 1rem;
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

.hover\\:tw-bg-destructive\\/80:hover {
  background-color: hsl(var(--destructive) / 0.8);
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

.hover\\:tw-bg-transparent:hover {
  background-color: transparent;
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

.hover\\:tw-text-primary:hover {
  color: hsl(var(--primary));
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

.data-\\[highlighted\\]\\:tw-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
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

  .md\\:tw-grid-cols-3 {
    grid-template-columns: repeat(3, minmax(0, 1fr));
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
  qf as Alert,
  Jf as AlertDescription,
  Kf as AlertTitle,
  $m as BOOK_SELECTOR_STRING_KEYS,
  Km as Badge,
  Pm as BookChapterControl,
  Ec as BookSelectionMode,
  Im as BookSelector,
  fe as Button,
  Ci as Card,
  _i as CardContent,
  Ri as CardDescription,
  Qf as CardFooter,
  Si as CardHeader,
  Oi as CardTitle,
  kc as ChapterRangeSelector,
  yo as Checkbox,
  Xm as Checklist,
  Jr as ComboBox,
  $c as DataTable,
  th as DisableButton,
  vn as DropdownMenu,
  dr as DropdownMenuCheckboxItem,
  Lt as DropdownMenuContent,
  tc as DropdownMenuGroup,
  tr as DropdownMenuItem,
  sm as DropdownMenuItemType,
  On as DropdownMenuLabel,
  Om as DropdownMenuPortal,
  _m as DropdownMenuRadioGroup,
  vs as DropdownMenuRadioItem,
  Rn as DropdownMenuSeparator,
  oc as DropdownMenuShortcut,
  Rm as DropdownMenuSub,
  rc as DropdownMenuSubContent,
  nc as DropdownMenuSubTrigger,
  er as DropdownMenuTrigger,
  eh as EnableButton,
  lh as FILTERABLE_RESOURCE_LIST_STRING_KEYS,
  am as FilterButton,
  oh as FilterDropdown,
  ch as FilterableResourceList,
  ih as Footer,
  Gf as GridMenu,
  Yf as HamburgerMenuButton,
  Bm as INVENTORY_STRING_KEYS,
  Ym as IconButton,
  qt as Input,
  Qm as InstallButton,
  jm as Inventory,
  De as Label,
  rh as MarkdownRenderer,
  ki as MenuItem,
  sh as MoreInfo,
  Vm as MultiSelectComboBox,
  Lm as NavigationContentSearch,
  ah as NoExtensionsFound,
  ys as RadioGroup,
  Kr as RadioGroupItem,
  Fm as ScriptureResultsViewer,
  zm as ScrollGroupSelector,
  Fc as SearchBar,
  yn as Select,
  zt as SelectContent,
  Cc as SelectGroup,
  Xe as SelectItem,
  Sc as SelectLabel,
  Cs as SelectScrollDownButton,
  Ts as SelectScrollUpButton,
  Oc as SelectSeparator,
  Ft as SelectTrigger,
  xn as SelectValue,
  As as Separator,
  Um as SettingsList,
  Hm as SettingsListHeader,
  Gm as SettingsListItem,
  em as Slider,
  Jm as Sonner,
  Ct as Spinner,
  tm as Switch,
  _n as Table,
  $n as TableBody,
  Pc as TableCaption,
  $e as TableCell,
  _c as TableFooter,
  je as TableHead,
  Pn as TableHeader,
  We as TableRow,
  Zm as Tabs,
  om as TabsContent,
  nm as TabsList,
  rm as TabsTrigger,
  Wm as TextField,
  Rs as ToggleGroup,
  qn as ToggleGroupItem,
  qm as Toolbar,
  nh as UpdateButton,
  im as VersionHistory,
  _s as VerticalTabs,
  $s as VerticalTabsContent,
  Ps as VerticalTabsList,
  zc as VerticalTabsTrigger,
  Zf as badgeVariants,
  mc as buttonVariants,
  C as cn,
  Dc as getBookNumFromId,
  Ac as getLinesFromUSFM,
  la as getNumberFromUSFM,
  Mc as getStatusForItem,
  Dm as inventoryCountColumn,
  Am as inventoryItemColumn,
  Mm as inventoryStatusColumn,
  fh as sonner,
  dh as useEvent,
  uh as useEventAsync,
  io as usePromise
};
//# sourceMappingURL=index.js.map
