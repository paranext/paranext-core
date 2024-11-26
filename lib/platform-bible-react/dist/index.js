import Ks, { jsx as s, jsxs as N, Fragment as ie } from "react/jsx-runtime";
import * as M from "react";
import T, { forwardRef as Qn, useCallback as Et, useState as ut, useRef as ge, useEffect as ae, useLayoutEffect as ta, useMemo as It } from "react";
import { History as Js, ChevronRight as Ja, Check as tr, Circle as Za, ArrowDownWideNarrow as Zs, Clock as Qs, Bookmark as tl, X as Qa, Search as el, ChevronsUpDown as nl, FilterIcon as rl, ChevronDown as er, ChevronUp as ol, ArrowLeftIcon as al, ChevronLeftIcon as il, ChevronRightIcon as sl, ArrowRightIcon as ll, CircleCheckIcon as cl, CircleXIcon as dl, CircleHelpIcon as pl, ArrowUpIcon as ul, ArrowDownIcon as wl, ArrowUpDownIcon as fl, PanelLeft as ml, ChevronLeft as hl, LoaderCircle as gl, Download as bl, Filter as vl, User as yl, Link as xl, CircleHelp as Nl } from "lucide-react";
import be, { clsx as kl } from "clsx";
import { extendTailwindMerge as El } from "tailwind-merge";
import * as wt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Sl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Tl, deepEqual as co, substring as Cl, formatScrRef as Or, compareScrRefs as Hr, scrRefToBBBCCCVVV as Rr, getLocalizeKeyForScrollGroupId as pt, NumberFormat as Ol, formatBytes as Rl } from "platform-bible-utils";
import { Slot as He } from "@radix-ui/react-slot";
import { cva as Xe } from "class-variance-authority";
import * as ti from "@radix-ui/react-label";
import * as mn from "@radix-ui/react-radio-group";
import * as hn from "@radix-ui/react-popover";
import { Command as Rt } from "cmdk";
import * as vt from "@radix-ui/react-dialog";
import { useReactTable as ei, getCoreRowModel as ni, getPaginationRowModel as _l, getSortedRowModel as ri, getFilteredRowModel as Pl, flexRender as dn, getExpandedRowModel as $l, getGroupedRowModel as Il } from "@tanstack/react-table";
import * as bt from "@radix-ui/react-select";
import * as Xr from "@radix-ui/react-checkbox";
import * as nr from "@radix-ui/react-toggle-group";
import * as oi from "@radix-ui/react-toggle";
import * as _t from "@radix-ui/react-tabs";
import * as ai from "@radix-ui/react-separator";
import * as En from "@radix-ui/react-tooltip";
import Al, { ThemeContext as Ml, internal_processStyles as Dl } from "@mui/styled-engine";
import { MenuItem as Bl, ListItemText as jl, ListItemIcon as ii, Menu as Vl, Grid as si, List as zl, IconButton as li, Drawer as Ll, AppBar as Fl, Toolbar as Ul } from "@mui/material";
import * as Gl from "react-dom";
import Bn from "react-dom";
import { Toaster as Hl } from "sonner";
import { toast as Jh } from "sonner";
import * as an from "@radix-ui/react-slider";
import * as Yr from "@radix-ui/react-switch";
import Xl from "markdown-to-jsx";
const Yl = El({ prefix: "tw-" });
function x(...t) {
  return Yl(kl(t));
}
const Ye = T.forwardRef(
  ({ className: t, type: e, ...n }, r) => /* @__PURE__ */ s(
    "input",
    {
      type: e,
      className: x(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ref: r,
      ...n
    }
  )
);
Ye.displayName = "Input";
const Wl = Qn(
  ({ handleSearch: t, handleKeyDown: e, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ N("div", { className: "tw-relative", children: [
    /* @__PURE__ */ s(
      Ye,
      {
        ...o,
        type: "text",
        className: "tw-box-border tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-font-medium tw-shadow-none tw-outline-none",
        onChange: (i) => t(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && r(), e(i);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ s(
      Js,
      {
        className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var ql = Object.defineProperty, Kl = (t, e, n) => e in t ? ql(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, et = (t, e, n) => Kl(t, typeof e != "symbol" ? e + "" : e, n);
const ye = [
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
], po = [
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
], ci = [
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
], ea = ic();
function We(t, e = !0) {
  return e && (t = t.toUpperCase()), t in ea ? ea[t] : 0;
}
function uo(t) {
  return We(t) > 0;
}
function Jl(t) {
  const e = typeof t == "string" ? We(t) : t;
  return e >= 40 && e <= 66;
}
function Zl(t) {
  return (typeof t == "string" ? We(t) : t) <= 39;
}
function di(t) {
  return t <= 66;
}
function Ql(t) {
  const e = typeof t == "string" ? We(t) : t;
  return wi(e) && !di(e);
}
function* tc() {
  for (let t = 1; t <= ye.length; t++)
    yield t;
}
const ec = 1, pi = ye.length;
function nc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function wo(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= ye.length ? e : ye[n];
}
function ui(t) {
  return t <= 0 || t > pi ? "******" : ci[t - 1];
}
function rc(t) {
  return ui(We(t));
}
function wi(t) {
  const e = typeof t == "number" ? wo(t) : t;
  return uo(e) && !po.includes(e);
}
function oc(t) {
  const e = typeof t == "number" ? wo(t) : t;
  return uo(e) && po.includes(e);
}
function ac(t) {
  return ci[t - 1].includes("*obsolete*");
}
function ic() {
  const t = {};
  for (let e = 0; e < ye.length; e++)
    t[ye[e]] = e + 1;
  return t;
}
const ot = {
  allBookIds: ye,
  nonCanonicalIds: po,
  bookIdToNumber: We,
  isBookIdValid: uo,
  isBookNT: Jl,
  isBookOT: Zl,
  isBookOTNT: di,
  isBookDC: Ql,
  allBookNumbers: tc,
  firstBook: ec,
  lastBook: pi,
  extraBooks: nc,
  bookNumberToId: wo,
  bookNumberToEnglishName: ui,
  bookIdToEnglishName: rc,
  isCanonical: wi,
  isExtraMaterial: oc,
  isObsolete: ac
};
var Ht = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Ht || {});
const $t = class {
  // private versInfo: Versification;
  constructor(e) {
    if (et(this, "name"), et(this, "fullPath"), et(this, "isPresent"), et(this, "hasVerseSegments"), et(this, "isCustomized"), et(this, "baseVersification"), et(this, "scriptureBooks"), et(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Ht[e]) : (this._type = e, this.name = Ht[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
et($t, "Original", new $t(Ht.Original)), et($t, "Septuagint", new $t(Ht.Septuagint)), et($t, "Vulgate", new $t(Ht.Vulgate)), et($t, "English", new $t(Ht.English)), et($t, "RussianProtestant", new $t(Ht.RussianProtestant)), et($t, "RussianOrthodox", new $t(Ht.RussianOrthodox));
let ue = $t;
function na(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var fi = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(fi || {});
const Tt = class nt {
  constructor(e, n, r, o) {
    if (et(this, "firstChapter"), et(this, "lastChapter"), et(this, "lastVerse"), et(this, "hasSegmentsDefined"), et(this, "text"), et(this, "BBBCCCVVVS"), et(this, "longHashCode"), et(this, "versification"), et(this, "rtlMark", "‏"), et(this, "_bookNum", 0), et(this, "_chapterNum", 0), et(this, "_verseNum", 0), et(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, i = n != null && n instanceof ue ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof ue ? n : void 0;
        this.setEmpty(a), this._verseNum = e % nt.chapterDigitShifter, this._chapterNum = Math.floor(
          e % nt.bookDigitShifter / nt.chapterDigitShifter
        ), this._bookNum = Math.floor(e / nt.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof nt) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null)
            return;
          const a = e instanceof ue ? e : nt.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? nt.defaultVersification;
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
      return n = new nt(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof tn)
        return n = new nt(), { success: !1, verseRef: n };
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
    return e % nt.bcvMaxValue * nt.bookDigitShifter + (n >= 0 ? n % nt.bcvMaxValue * nt.chapterDigitShifter : 0) + (r >= 0 ? r % nt.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = e, l = a || o.toString();
    let c;
    return i && (c = new ue(i)), n ? new nt(n, r.toString(), l, c) : new nt();
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
      if (n = n * 10 + +r - 0, n > nt.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(nt.verseRangeSeparator) || this._verse.includes(nt.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return ot.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = ot.bookIdToNumber(e);
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
    const { success: n, vNum: r } = nt.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = nt.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > ot.lastBook)
      throw new tn(
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
    this.versification = this.versification != null ? new ue(e) : void 0;
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
    return this.validateVerse(nt.verseRangeSeparators, nt.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return nt.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return nt.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          const i = +a[1].trim();
          this.versification = new ue(Ht[i]);
        } catch {
          throw new tn("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new tn("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || ot.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !nt.isVerseParseable(r[1]))
      throw new tn("Invalid reference : " + e);
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
    return new nt(this);
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
    return e instanceof nt ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = nt.verseRangeSeparators, r = nt.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = na(this._verse, r);
    for (const i of a.map((l) => na(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const p = this.clone();
        if (p.verse = i[1], !e)
          for (let d = c + 1; d < p.verseNum; d++) {
            const m = new nt(
              this._bookNum,
              this._chapterNum,
              d,
              this.versification
            );
            this.isExcluded || o.push(m);
          }
        o.push(p);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > ot.lastBook ? 2 : (ot.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = nt.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = ot.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
et(Tt, "defaultVersification", ue.English), et(Tt, "verseRangeSeparator", "-"), et(Tt, "verseSequenceIndicator", ","), et(Tt, "verseRangeSeparators", [Tt.verseRangeSeparator]), et(Tt, "verseSequenceIndicators", [Tt.verseSequenceIndicator]), et(Tt, "chapterDigitShifter", 1e3), et(Tt, "bookDigitShifter", Tt.chapterDigitShifter * Tt.chapterDigitShifter), et(Tt, "bcvMaxValue", Tt.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
et(Tt, "ValidStatusType", fi);
class tn extends Error {
}
const fo = wt.Root, mi = wt.Trigger, sc = wt.Group, fh = wt.Portal, mh = wt.Sub, hh = wt.RadioGroup, lc = T.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ N(
  wt.SubTrigger,
  {
    ref: o,
    className: x(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      e && "tw-pl-8",
      t
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ s(Ja, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
lc.displayName = wt.SubTrigger.displayName;
const cc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  wt.SubContent,
  {
    ref: n,
    className: x(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
cc.displayName = wt.SubContent.displayName;
const rr = T.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ s(wt.Portal, { children: /* @__PURE__ */ s(
  wt.Content,
  {
    ref: r,
    sideOffset: e,
    className: x(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
) }));
rr.displayName = wt.Content.displayName;
const hi = T.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ s(
  wt.Item,
  {
    ref: r,
    className: x(
      // removed: tw-relative tw-flex focus:tw-text-accent-foreground
      "tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e && "tw-pl-8",
      t
    ),
    ...n
  }
));
hi.displayName = wt.Item.displayName;
const mo = T.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ N(
  wt.CheckboxItem,
  {
    ref: o,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(wt.ItemIndicator, { children: /* @__PURE__ */ s(tr, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
mo.displayName = wt.CheckboxItem.displayName;
const gi = T.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ N(
  wt.RadioItem,
  {
    ref: r,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(wt.ItemIndicator, { children: /* @__PURE__ */ s(Za, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
gi.displayName = wt.RadioItem.displayName;
const Sn = T.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ s(
  wt.Label,
  {
    ref: r,
    className: x("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
Sn.displayName = wt.Label.displayName;
const or = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  wt.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
or.displayName = wt.Separator.displayName;
function dc({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "span",
    {
      className: x("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
dc.displayName = "DropdownMenuShortcut";
const pc = Qn(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ N(
    hi,
    {
      ref: l,
      textValue: t,
      className: x("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
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
        /* @__PURE__ */ s(
          "span",
          {
            className: x(
              "tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-l-red-200": a.toLowerCase() === "ot",
                "tw-border-l-purple-200": a.toLowerCase() === "nt",
                "tw-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: ot.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ s("div", { children: i })
      ]
    },
    t
  )
);
function uc({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), i = Et(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ s("div", { className: x("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ s(
    "div",
    {
      className: x(
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
      onMouseMove: () => i(l),
      children: l
    },
    l
  )) });
}
function wc({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ N(Sn, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ s("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ s(
        Zs,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ s(
        Qs,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ s(
        tl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const pn = ot.allBookIds, fc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ra = ["OT", "NT", "DC"], mc = 32 + 32 + 32, hc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], gc = (t) => ({
  OT: pn.filter((n) => ot.isBookOT(n)),
  NT: pn.filter((n) => ot.isBookNT(n)),
  DC: pn.filter((n) => ot.isBookDC(n))
})[t], en = (t) => Tl(ot.bookIdToNumber(t));
function bc() {
  return pn.map((e) => ot.bookIdToEnglishName(e));
}
function vc(t) {
  return bc().includes(t);
}
function yc(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (vc(e))
    return pn.find((r) => ot.bookIdToEnglishName(r) === e);
}
function gh({ scrRef: t, handleSubmit: e }) {
  const [n, r] = ut(""), [o, a] = ut(
    ot.bookNumberToId(t.bookNum)
  ), [i, l] = ut(t.chapterNum ?? 0), [c, p] = ut(
    ot.bookNumberToId(t.bookNum)
  ), [d, m] = ut(!1), [w, g] = ut(d), v = ge(void 0), f = ge(void 0), h = ge(void 0), E = Et(
    (k) => gc(k).filter((B) => {
      const D = ot.bookIdToEnglishName(B).toLowerCase(), J = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return D.includes(J) || // Match book name
      B.toLowerCase().includes(J);
    }),
    [n]
  ), _ = (k) => {
    r(k);
  }, C = ge(!1), S = Et((k) => {
    if (C.current) {
      C.current = !1;
      return;
    }
    m(k);
  }, []), b = Et(
    (k, B, D, J) => {
      if (l(
        ot.bookNumberToId(t.bookNum) !== k ? 1 : t.chapterNum
      ), B || en(k) === -1) {
        e({
          bookNum: ot.bookIdToNumber(k),
          chapterNum: D || 1,
          verseNum: J || 1
        }), m(!1), r("");
        return;
      }
      a(o !== k ? k : ""), m(!B);
    },
    [e, t.bookNum, t.chapterNum, o]
  ), I = (k) => {
    k <= 0 || k > en(o) || b(o, !0, k);
  }, z = Et(() => {
    hc.forEach((k) => {
      const B = n.match(k);
      if (B) {
        const [D, J = void 0, q = void 0] = B.slice(1), U = yc(D);
        (ot.isBookIdValid(D) || U) && b(
          U ?? D,
          !0,
          J ? parseInt(J, 10) : 1,
          q ? parseInt(q, 10) : 1
        );
      }
    });
  }, [b, n]), H = Et(
    (k) => {
      d ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null ? h.current.focus() : typeof f < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      f.current !== null && f.current.focus(), k.preventDefault()) : m(!0);
    },
    [d]
  ), O = (k) => {
    const { key: B } = k;
    B === "ArrowRight" || B === "ArrowLeft" || B === "ArrowDown" || B === "ArrowUp" || B === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: B })), v.current.focus());
  }, $ = (k) => {
    const { key: B } = k;
    if (c === o) {
      if (B === "Enter") {
        k.preventDefault(), b(o, !0, i);
        return;
      }
      let D = 0;
      if (B === "ArrowRight")
        if (i < en(c))
          D = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (B === "ArrowLeft")
        if (i > 1)
          D = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        B === "ArrowDown" ? D = 6 : B === "ArrowUp" && (D = -6);
      i + D <= 0 || i + D > en(c) ? l(0) : D !== 0 && (l(i + D), k.preventDefault());
    }
  };
  return ae(() => {
    o === c ? o === ot.bookNumberToId(t.bookNum) ? l(t.chapterNum) : l(1) : l(0);
  }, [c, t.bookNum, t.chapterNum, o]), ta(() => {
    g(d);
  }, [d]), ta(() => {
    const k = setTimeout(() => {
      if (w && f.current && h.current) {
        const D = h.current.offsetTop - mc;
        f.current.scrollTo({ top: D, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [w]), /* @__PURE__ */ s("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ N(fo, { modal: !1, open: d, onOpenChange: S, children: [
    /* @__PURE__ */ s(mi, { asChild: !0, children: /* @__PURE__ */ s(
      Wl,
      {
        ref: v,
        value: n,
        handleSearch: _,
        handleKeyDown: H,
        handleOnClick: () => {
          a(ot.bookNumberToId(t.bookNum)), p(ot.bookNumberToId(t.bookNum)), l(t.chapterNum > 0 ? t.chapterNum : 0), m(!0), v.current.focus();
        },
        onFocus: () => {
          C.current = !0;
        },
        handleSubmit: z,
        placeholder: `${ot.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`
      }
    ) }),
    /* @__PURE__ */ N(
      rr,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: O,
        align: "start",
        ref: f,
        children: [
          /* @__PURE__ */ s(
            wc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ra.map(
            (k, B) => E(k).length > 0 && /* @__PURE__ */ N("div", { children: [
              /* @__PURE__ */ s(Sn, { className: "tw-font-semibold tw-text-foreground/80", children: fc[k] }),
              E(k).map((D) => /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s(
                pc,
                {
                  bookId: D,
                  handleSelectBook: () => b(D, !1),
                  isSelected: o === D,
                  handleHighlightBook: () => p(D),
                  handleKeyDown: $,
                  bookType: k,
                  ref: (J) => {
                    o === D && (h.current = J);
                  },
                  children: /* @__PURE__ */ s(
                    uc,
                    {
                      handleSelectChapter: I,
                      endChapter: en(D),
                      activeChapter: t.bookNum === ot.bookIdToNumber(D) ? t.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (J) => {
                        l(J);
                      }
                    }
                  )
                }
              ) }, D)),
              ra.length - 1 !== B ? /* @__PURE__ */ s(or, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const xc = Xe(
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
), gt = T.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ s(r ? He : "button", { className: x(xc({ variant: e, size: n, className: t })), ref: a, ...o })
);
gt.displayName = "Button";
const Nc = Xe(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Xt = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(ti.Root, { ref: n, className: x("pr-twp", Nc(), t), ...e }));
Xt.displayName = ti.Root.displayName;
const bi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  mn.Root,
  {
    className: x("pr-twp tw-grid tw-gap-2", t),
    ...e,
    ref: n
  }
));
bi.displayName = mn.Root.displayName;
const Wr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  mn.Item,
  {
    ref: n,
    className: x(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ s(mn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s(Za, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Wr.displayName = mn.Item.displayName;
const kc = hn.Root, Ec = hn.Trigger, vi = T.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ s(hn.Portal, { children: /* @__PURE__ */ s(
  hn.Content,
  {
    ref: o,
    align: e,
    sideOffset: n,
    className: x(
      "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...r
  }
) }));
vi.displayName = hn.Content.displayName;
const Sc = vt.Portal, yi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  vt.Overlay,
  {
    ref: n,
    className: x(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
yi.displayName = vt.Overlay.displayName;
const Tc = T.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ N(Sc, { children: [
  /* @__PURE__ */ s(yi, {}),
  /* @__PURE__ */ N(
    vt.Content,
    {
      ref: r,
      className: x(
        "tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        t
      ),
      ...n,
      children: [
        e,
        /* @__PURE__ */ N(vt.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ s(Qa, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Tc.displayName = vt.Content.displayName;
const Cc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  vt.Title,
  {
    ref: n,
    className: x("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Cc.displayName = vt.Title.displayName;
const Oc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  vt.Description,
  {
    ref: n,
    className: x("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
Oc.displayName = vt.Description.displayName;
const xi = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Rt,
  {
    ref: n,
    className: x(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
xi.displayName = Rt.displayName;
const Ni = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ s(el, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ s(
    Rt.Input,
    {
      ref: n,
      className: x(
        "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        t
      ),
      ...e
    }
  )
] }));
Ni.displayName = Rt.Input.displayName;
const ki = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Rt.List,
  {
    ref: n,
    className: x("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ki.displayName = Rt.List.displayName;
const Ei = T.forwardRef((t, e) => /* @__PURE__ */ s(Rt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Ei.displayName = Rt.Empty.displayName;
const Rc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Rt.Group,
  {
    ref: n,
    className: x(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Rc.displayName = Rt.Group.displayName;
const _c = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Rt.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
_c.displayName = Rt.Separator.displayName;
const Si = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Rt.Item,
  {
    ref: n,
    className: x(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
Si.displayName = Rt.Item.displayName;
function Pc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function qr({
  id: t,
  options: e = [],
  buttonClassName: n,
  popoverContentClassName: r,
  value: o,
  onChange: a = () => {
  },
  getOptionLabel: i = Pc,
  buttonPlaceholder: l = "",
  textPlaceholder: c = "",
  commandEmptyMessage: p = "No option found",
  buttonVariant: d = "outline",
  dir: m = "ltr",
  isDisabled: w = !1,
  ...g
}) {
  const [v, f] = ut(!1);
  return /* @__PURE__ */ N(kc, { open: v, onOpenChange: f, ...g, children: [
    /* @__PURE__ */ s(Ec, { asChild: !0, children: /* @__PURE__ */ N(
      gt,
      {
        variant: d,
        role: "combobox",
        "aria-expanded": v,
        id: t,
        className: x("tw-w-[200px] tw-justify-between", n),
        disabled: w,
        children: [
          /* @__PURE__ */ s("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: o ? i(o) : l }),
          /* @__PURE__ */ s(nl, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(vi, { className: x("tw-w-[200px] tw-p-0", r), dir: m, children: /* @__PURE__ */ N(xi, { children: [
      /* @__PURE__ */ s(Ni, { dir: m, placeholder: c, className: "tw-text-inherit" }),
      /* @__PURE__ */ s(Ei, { children: p }),
      /* @__PURE__ */ s(ki, { children: e.map((h) => /* @__PURE__ */ N(
        Si,
        {
          value: i(h),
          onSelect: () => {
            a(h), f(!1);
          },
          children: [
            /* @__PURE__ */ s(
              tr,
              {
                className: x("tw-me-2 tw-h-4 tw-w-4", {
                  "tw-opacity-0": !o || i(o) !== i(h)
                })
              }
            ),
            i(h)
          ]
        },
        i(h)
      )) })
    ] }) })
  ] });
}
function $c({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = It(
    () => Array.from({ length: a }, (p, d) => d + 1),
    [a]
  );
  return /* @__PURE__ */ N(ie, { children: [
    /* @__PURE__ */ s(Xt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ s(
      qr,
      {
        isDisabled: o,
        onChange: (p) => {
          n(p), p > e && r(p);
        },
        buttonClassName: "tw-ml-2 tw-mr-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: t
      },
      "start chapter"
    ),
    /* @__PURE__ */ s(Xt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ s(
      qr,
      {
        isDisabled: o,
        onChange: (p) => {
          r(p), p < t && n(p);
        },
        buttonClassName: "tw-ml-2 tw-w-20",
        options: i,
        getOptionLabel: (p) => p.toString(),
        value: e
      },
      "end chapter"
    )
  ] });
}
var Ic = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Ic || {});
const bh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), _r = (t, e) => t[e] ?? e;
function vh({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: p
}) {
  const d = _r(p, "%webView_bookSelector_currentBook%"), m = _r(p, "%webView_bookSelector_choose%"), w = _r(p, "%webView_bookSelector_chooseBooks%"), [g, v] = ut(
    "current book"
    /* CURRENT_BOOK */
  ), f = (h) => {
    v(h), t(h);
  };
  return /* @__PURE__ */ s(
    bi,
    {
      className: "pr-twp tw-flex",
      value: g,
      onValueChange: (h) => f(h),
      children: /* @__PURE__ */ N("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ N("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Wr, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ s(Xt, { className: "tw-ml-1", children: d })
          ] }),
          /* @__PURE__ */ s(Xt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ s(
            $c,
            {
              isDisabled: g === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ N("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Wr, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ s(Xt, { className: "tw-ml-1", children: w })
          ] }),
          /* @__PURE__ */ s(Xt, { className: "tw-flex tw-items-center", children: r.map((h) => ot.bookIdToEnglishName(h)).join(", ") }),
          /* @__PURE__ */ s(
            gt,
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
function Ac({ table: t }) {
  return /* @__PURE__ */ N(fo, { children: [
    /* @__PURE__ */ s(Sl, { asChild: !0, children: /* @__PURE__ */ N(gt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ s(rl, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ N(rr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ s(Sn, { children: "Toggle columns" }),
      /* @__PURE__ */ s(or, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ s(
        mo,
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
const gn = bt.Root, Mc = bt.Group, bn = bt.Value, De = T.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ N(
  bt.Trigger,
  {
    ref: r,
    className: x(
      "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
      t
    ),
    ...n,
    children: [
      e,
      /* @__PURE__ */ s(bt.Icon, { asChild: !0, children: /* @__PURE__ */ s(er, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
De.displayName = bt.Trigger.displayName;
const Ti = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.ScrollUpButton,
  {
    ref: n,
    className: x("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ s(ol, { className: "tw-h-4 tw-w-4" })
  }
));
Ti.displayName = bt.ScrollUpButton.displayName;
const Ci = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.ScrollDownButton,
  {
    ref: n,
    className: x("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ s(er, { className: "tw-h-4 tw-w-4" })
  }
));
Ci.displayName = bt.ScrollDownButton.displayName;
const Be = T.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => /* @__PURE__ */ s(bt.Portal, { children: /* @__PURE__ */ N(
  bt.Content,
  {
    ref: o,
    className: x(
      "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
      t
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ s(Ti, {}),
      /* @__PURE__ */ s(
        bt.Viewport,
        {
          className: x(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: e
        }
      ),
      /* @__PURE__ */ s(Ci, {})
    ]
  }
) }));
Be.displayName = bt.Content.displayName;
const Dc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.Label,
  {
    ref: n,
    className: x("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Dc.displayName = bt.Label.displayName;
const Gt = T.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ N(
  bt.Item,
  {
    ref: r,
    className: x(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(bt.ItemIndicator, { children: /* @__PURE__ */ s(tr, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ s(bt.ItemText, { children: e })
    ]
  }
));
Gt.displayName = bt.Item.displayName;
const Bc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  bt.Separator,
  {
    ref: n,
    className: x("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Bc.displayName = bt.Separator.displayName;
function jc({ table: t }) {
  return /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ N("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ s("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ N(
        gn,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ s(De, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ s(bn, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ s(Be, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ s(Gt, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ N(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ s(al, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ N(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ s(il, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ N(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ s(sl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ N(
        gt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ s(ll, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const ar = T.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ s("div", { className: x("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !e }), children: /* @__PURE__ */ s(
  "table",
  {
    ref: r,
    className: x("tw-w-full tw-caption-bottom tw-text-sm", t),
    ...n
  }
) }));
ar.displayName = "Table";
const ir = T.forwardRef(({ className: t, stickyHeader: e, ...n }, r) => /* @__PURE__ */ s(
  "thead",
  {
    ref: r,
    className: x(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": e },
      "[&_tr]:tw-border-b",
      t
    ),
    ...n
  }
));
ir.displayName = "TableHeader";
const sr = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("tbody", { ref: n, className: x("[&_tr:last-child]:tw-border-0", t), ...e }));
sr.displayName = "TableBody";
const Vc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "tfoot",
  {
    ref: n,
    className: x("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Vc.displayName = "TableFooter";
const oe = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "tr",
    {
      ref: n,
      className: x(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        t
      ),
      ...e
    }
  )
);
oe.displayName = "TableRow";
const vn = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "th",
  {
    ref: n,
    className: x(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      t
    ),
    ...e
  }
));
vn.displayName = "TableHead";
const je = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "td",
  {
    ref: n,
    className: x("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
je.displayName = "TableCell";
const zc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  "caption",
  {
    ref: n,
    className: x("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
zc.displayName = "TableCaption";
function Lc({
  columns: t,
  data: e,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var h;
  const [l, c] = ut([]), [p, d] = ut([]), [m, w] = ut({}), [g, v] = ut({}), f = ei({
    data: e,
    columns: t,
    getCoreRowModel: ni(),
    ...n && { getPaginationRowModel: _l() },
    onSortingChange: c,
    getSortedRowModel: ri(),
    onColumnFiltersChange: d,
    getFilteredRowModel: Pl(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: v,
    state: {
      sorting: l,
      columnFilters: p,
      columnVisibility: m,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ N("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ s(Ac, { table: f }),
    /* @__PURE__ */ N(ar, { stickyHeader: a, children: [
      /* @__PURE__ */ s(ir, { stickyHeader: a, children: f.getHeaderGroups().map((E) => /* @__PURE__ */ s(oe, { children: E.headers.map((_) => /* @__PURE__ */ s(vn, { children: _.isPlaceholder ? void 0 : dn(_.column.columnDef.header, _.getContext()) }, _.id)) }, E.id)) }),
      /* @__PURE__ */ s(sr, { children: (h = f.getRowModel().rows) != null && h.length ? f.getRowModel().rows.map((E) => /* @__PURE__ */ s(
        oe,
        {
          onClick: () => i(E, f),
          "data-state": E.getIsSelected() && "selected",
          children: E.getVisibleCells().map((_) => /* @__PURE__ */ s(je, { children: dn(_.column.columnDef.cell, _.getContext()) }, _.id))
        },
        E.id
      )) : /* @__PURE__ */ s(oe, { children: /* @__PURE__ */ s(je, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ s(
        gt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.previousPage(),
          disabled: !f.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ s(
        gt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.nextPage(),
          disabled: !f.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ s(jc, { table: f })
  ] });
}
function Fc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = It(() => {
    const i = [];
    return t.forEach((l) => {
      i.some((c) => co(c, l)) || i.push(l);
    }), i;
  }, [t]);
  return /* @__PURE__ */ N(ar, { stickyHeader: !0, children: [
    /* @__PURE__ */ s(ir, { stickyHeader: !0, children: /* @__PURE__ */ N(oe, { children: [
      /* @__PURE__ */ s(vn, { children: r }),
      /* @__PURE__ */ s(vn, { children: o })
    ] }) }),
    /* @__PURE__ */ s(sr, { children: a.length > 0 && a.map((i) => /* @__PURE__ */ N(
      oe,
      {
        onClick: () => {
          e(i.reference);
        },
        children: [
          /* @__PURE__ */ s(je, { children: `${ot.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ s(je, { children: i.text })
        ]
      },
      `${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const ho = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Xr.Root,
  {
    ref: n,
    className: x(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ s(
      Xr.Indicator,
      {
        className: x("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ s(tr, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
ho.displayName = Xr.Root.displayName;
const Uc = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), oa = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Gc = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? ot.bookIdToNumber(e[1]) : 0;
}, Hc = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Oi = Xe(
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
), Xc = T.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ s(
  oi.Root,
  {
    ref: o,
    className: x(Oi({ variant: e, size: n, className: t })),
    ...r
  }
));
Xc.displayName = oi.Root.displayName;
const Ri = T.createContext({
  size: "default",
  variant: "default"
}), _i = T.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => /* @__PURE__ */ s(
  nr.Root,
  {
    ref: a,
    className: x("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
    ...o,
    children: /* @__PURE__ */ s(
      Ri.Provider,
      {
        value: { variant: e, size: n },
        children: r
      }
    )
  }
));
_i.displayName = nr.Root.displayName;
const Un = T.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const i = T.useContext(Ri);
  return /* @__PURE__ */ s(
    nr.Item,
    {
      ref: a,
      className: x(
        Oi({
          variant: i.variant || n,
          size: i.size || r
        }),
        t
      ),
      ...o,
      children: e
    }
  );
});
Un.displayName = nr.Item.displayName;
const lr = (t) => t === "asc" ? /* @__PURE__ */ s(ul, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ s(wl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ s(fl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), yh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ N(gt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    lr(e.getIsSorted())
  ] })
}), Yc = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ N(gt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    lr(n.getIsSorted())
  ] })
}), xh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ N(gt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    lr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Pr = (t, e, n, r, o, a) => {
  let i = [...n];
  t.forEach((c) => {
    e === "approved" ? i.includes(c) || i.push(c) : i = i.filter((p) => p !== c);
  }), r(i);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((p) => p !== c);
  }), a(l);
}, Nh = (t, e, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ N(gt, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    t,
    lr(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const i = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ N(_i, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ s(
        Un,
        {
          onClick: () => Pr(
            [l],
            "approved",
            e,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ s(cl, {})
        }
      ),
      /* @__PURE__ */ s(
        Un,
        {
          onClick: () => Pr(
            [l],
            "unapproved",
            e,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ s(dl, {})
        }
      ),
      /* @__PURE__ */ s(
        Un,
        {
          onClick: () => Pr(
            [l],
            "unknown",
            e,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ s(pl, {})
        }
      )
    ] });
  }
}), kh = Object.freeze([
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
]), Wc = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, qc = (t, e, n, r, o) => {
  if (!t)
    return [];
  const a = [];
  let i = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return Uc(t).forEach((d) => {
    d.startsWith("\\id") && (i = Gc(d), l = 0, c = 0), d.startsWith("\\c") && (l = oa(d), c = 0), d.startsWith("\\v") && (c = oa(d), l === 0 && (l = e.chapterNum));
    let m = o.exec(d) ?? void 0;
    for (; m; ) {
      const w = [];
      m.forEach((h) => w.push(h));
      const g = m.index, v = a.find((h) => co(h.items, w)), f = {
        reference: {
          bookNum: i !== void 0 ? i : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: Cl(d, Math.max(0, g - 25), Math.min(g + 25, d.length))
      };
      if (v)
        v.count += 1, v.occurrences.push(f);
      else {
        const h = {
          items: w,
          count: 1,
          status: Hc(w[0], n, r),
          occurrences: [f]
        };
        a.push(h);
      }
      m = o.exec(d) ?? void 0;
    }
  }), a;
}, Jt = (t, e) => t[e] ?? e;
function Eh({
  scriptureReference: t,
  setScriptureReference: e,
  localizedStrings: n,
  extractItems: r,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  text: l,
  scope: c,
  onScopeChange: p,
  columns: d
}) {
  const m = Jt(n, "%webView_inventory_all%"), w = Jt(n, "%webView_inventory_approved%"), g = Jt(n, "%webView_inventory_unapproved%"), v = Jt(n, "%webView_inventory_unknown%"), f = Jt(n, "%webView_inventory_scope_currentBook%"), h = Jt(n, "%webView_inventory_scope_chapter%"), E = Jt(n, "%webView_inventory_scope_verse%"), _ = Jt(n, "%webView_inventory_filter_text%"), C = Jt(
    n,
    "%webView_inventory_show_additional_items%"
  ), [S, b] = ut(!1), [I, z] = ut("all"), [H, O] = ut(""), [$, k] = ut([]), B = It(() => l ? r instanceof RegExp ? qc(
    l,
    t,
    a,
    i,
    r
  ) : r(l, t, a, i) : [], [l, r, t, a, i]), D = It(() => {
    if (S)
      return B;
    const y = [];
    return B.forEach((R) => {
      const L = R.items[0], F = y.find(
        (V) => V.items[0] === L
      );
      F ? (F.count += R.count, F.occurrences = F.occurrences.concat(R.occurrences)) : y.push({
        items: [L],
        count: R.count,
        occurrences: R.occurrences,
        status: R.status
      });
    }), y;
  }, [S, B]), J = It(() => Wc(D, I, H), [D, I, H]), q = It(() => {
    var L, F;
    if (!S)
      return d;
    const y = (L = o == null ? void 0 : o.tableHeaders) == null ? void 0 : L.length;
    if (!y)
      return d;
    const R = [];
    for (let V = 0; V < y; V++)
      R.push(
        Yc(
          ((F = o == null ? void 0 : o.tableHeaders) == null ? void 0 : F[V]) || "Additional Item",
          V + 1
        )
      );
    return [...R, ...d];
  }, [o == null ? void 0 : o.tableHeaders, d, S]);
  ae(() => {
    k([]);
  }, [J]);
  const U = (y, R) => {
    R.setRowSelection(() => {
      const L = {};
      return L[y.index] = !0, L;
    }), k(y.original.items);
  }, tt = (y) => {
    if (y === "book" || y === "chapter" || y === "verse")
      p(y);
    else
      throw new Error(`Invalid scope value: ${y}`);
  }, at = (y) => {
    if (y === "all" || y === "approved" || y === "unapproved" || y === "unknown")
      z(y);
    else
      throw new Error(`Invalid status filter value: ${y}`);
  }, rt = It(() => {
    if (D.length === 0 || $.length === 0)
      return [];
    const y = D.filter((R) => co(
      S ? R.items : [R.items[0]],
      $
    ));
    if (y.length > 1)
      throw new Error("Selected item is not unique");
    return y[0].occurrences;
  }, [$, S, D]);
  return /* @__PURE__ */ N("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ N("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ N(
        gn,
        {
          onValueChange: (y) => at(y),
          defaultValue: I,
          children: [
            /* @__PURE__ */ s(De, { className: "tw-m-1", children: /* @__PURE__ */ s(bn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ N(Be, { children: [
              /* @__PURE__ */ s(Gt, { value: "all", children: m }),
              /* @__PURE__ */ s(Gt, { value: "approved", children: w }),
              /* @__PURE__ */ s(Gt, { value: "unapproved", children: g }),
              /* @__PURE__ */ s(Gt, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ N(gn, { onValueChange: (y) => tt(y), defaultValue: c, children: [
        /* @__PURE__ */ s(De, { className: "tw-m-1", children: /* @__PURE__ */ s(bn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ N(Be, { children: [
          /* @__PURE__ */ s(Gt, { value: "book", children: f }),
          /* @__PURE__ */ s(Gt, { value: "chapter", children: h }),
          /* @__PURE__ */ s(Gt, { value: "verse", children: E })
        ] })
      ] }),
      /* @__PURE__ */ s(
        Ye,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: _,
          value: H,
          onChange: (y) => {
            O(y.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ N("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ s(
          ho,
          {
            className: "tw-m-1",
            checked: S,
            onCheckedChange: (y) => {
              k([]), b(y);
            }
          }
        ),
        /* @__PURE__ */ s(Xt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? C })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      Lc,
      {
        columns: q,
        data: J,
        onRowClickHandler: U,
        stickyHeader: !0
      }
    ) }),
    rt.length > 0 && /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      Fc,
      {
        occurrenceData: rt,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
function Pi({
  className: t,
  onSearch: e,
  placeholder: n,
  isFullWidth: r
}) {
  const [o, a] = ut(""), i = (l) => {
    a(l), e(l);
  };
  return /* @__PURE__ */ s(
    Ye,
    {
      className: x(
        "tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        { "tw-w-full": r },
        t
      ),
      placeholder: n,
      value: o,
      onChange: (l) => i(l.target.value)
    }
  );
}
const $i = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Root,
  {
    orientation: "vertical",
    ref: n,
    className: x("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
    ...e
  }
));
$i.displayName = _t.List.displayName;
const Ii = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.List,
  {
    ref: n,
    className: x(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Ii.displayName = _t.List.displayName;
const Kc = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Trigger,
  {
    ref: n,
    ...e,
    className: x(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Ai = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Content,
  {
    ref: n,
    className: x(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Ai.displayName = _t.Content.displayName;
function Sh({
  tabList: t,
  onSearch: e,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ N("div", { className: "pr-twp", children: [
    /* @__PURE__ */ N("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ s("h1", { children: r }) : "",
      /* @__PURE__ */ s(
        Pi,
        {
          isFullWidth: o,
          onSearch: e,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ N($i, { dir: a, children: [
      /* @__PURE__ */ s(Ii, { children: t.map((i) => /* @__PURE__ */ s(Kc, { value: i.value, children: i.value }, i.key)) }),
      t.map((i) => /* @__PURE__ */ s(Ai, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const go = T.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ s(
  ai.Root,
  {
    ref: o,
    decorative: n,
    orientation: e,
    className: x(
      "pr-twp tw-shrink-0 tw-bg-border",
      e === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      t
    ),
    ...r
  }
));
go.displayName = ai.Root.displayName;
const Jc = vt.Root, Zc = vt.Portal, Mi = M.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  vt.Overlay,
  {
    className: x(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e,
    ref: n
  }
));
Mi.displayName = vt.Overlay.displayName;
const Qc = Xe(
  "pr-twp tw-fixed tw-z-50 tw-gap-4 tw-bg-background tw-p-6 tw-shadow-lg tw-transition tw-ease-in-out data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-duration-300 data-[state=open]:tw-duration-500",
  {
    variants: {
      side: {
        top: "tw-inset-x-0 tw-top-0 tw-border-b data-[state=closed]:tw-slide-out-to-top data-[state=open]:tw-slide-in-from-top",
        bottom: "tw-inset-x-0 tw-bottom-0 tw-border-t data-[state=closed]:tw-slide-out-to-bottom data-[state=open]:tw-slide-in-from-bottom",
        left: "tw-inset-y-0 tw-left-0 tw-h-full tw-w-3/4 tw-border-r data-[state=closed]:tw-slide-out-to-left data-[state=open]:tw-slide-in-from-left sm:tw-max-w-sm",
        right: "tw-inset-y-0 tw-right-0 tw-h-full tw-w-3/4 tw- tw-border-l data-[state=closed]:tw-slide-out-to-right data-[state=open]:tw-slide-in-from-right sm:tw-max-w-sm"
      }
    },
    defaultVariants: {
      side: "right"
    }
  }
), Di = M.forwardRef(({ side: t = "right", className: e, children: n, ...r }, o) => /* @__PURE__ */ N(Zc, { children: [
  /* @__PURE__ */ s(Mi, {}),
  /* @__PURE__ */ N(vt.Content, { ref: o, className: x(Qc({ side: t }), e), ...r, children: [
    n,
    /* @__PURE__ */ N(vt.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-secondary", children: [
      /* @__PURE__ */ s(Qa, { className: "tw-h-4 tw-w-4" }),
      /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Close" })
    ] })
  ] })
] }));
Di.displayName = vt.Content.displayName;
const td = M.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  vt.Title,
  {
    ref: n,
    className: x("tw-text-lg tw-font-semibold tw-text-foreground", t),
    ...e
  }
));
td.displayName = vt.Title.displayName;
const ed = M.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  vt.Description,
  {
    ref: n,
    className: x("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
ed.displayName = vt.Description.displayName;
function aa({ className: t, ...e }) {
  return /* @__PURE__ */ s(
    "div",
    {
      className: x("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const nd = En.Provider, rd = En.Root, od = En.Trigger, Bi = T.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ s(
  En.Content,
  {
    ref: r,
    sideOffset: e,
    className: x(
      "pr-twp tw-z-50 tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-px-3 tw-py-1.5 tw-text-sm tw-text-popover-foreground tw-shadow-md tw-animate-in tw-fade-in-0 tw-zoom-in-95 data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=closed]:tw-zoom-out-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...n
  }
));
Bi.displayName = En.Content.displayName;
const $r = 768;
function ad() {
  const [t, e] = M.useState(void 0);
  return M.useEffect(() => {
    const n = window.matchMedia(`(max-width: ${$r - 1}px)`), r = () => {
      e(window.innerWidth < $r);
    };
    return n.addEventListener("change", r), e(window.innerWidth < $r), () => n.removeEventListener("change", r);
  }, []), !!t;
}
const id = "sidebar:state", sd = 60 * 60 * 24 * 7, ld = "16rem", cd = "18rem", dd = "3rem", pd = "b", ji = T.createContext(void 0);
function cr() {
  const t = T.useContext(ji);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Vi = T.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: r,
    style: o,
    children: a,
    ...i
  }, l) => {
    const c = ad(), [p, d] = T.useState(!1), [m, w] = T.useState(t), g = e ?? m, v = T.useCallback(
      (_) => {
        const C = typeof _ == "function" ? _(g) : _;
        n ? n(C) : w(C), document.cookie = `${id}=${C}; path=/; max-age=${sd}`;
      },
      [n, g]
    ), f = T.useCallback(() => c ? d((_) => !_) : v((_) => !_), [c, v, d]);
    T.useEffect(() => {
      const _ = (C) => {
        C.key === pd && (C.metaKey || C.ctrlKey) && (C.preventDefault(), f());
      };
      return window.addEventListener("keydown", _), () => window.removeEventListener("keydown", _);
    }, [f]);
    const h = g ? "expanded" : "collapsed", E = T.useMemo(
      () => ({
        state: h,
        open: g,
        setOpen: v,
        isMobile: c,
        openMobile: p,
        setOpenMobile: d,
        toggleSidebar: f
      }),
      [h, g, v, c, p, d, f]
    );
    return /* @__PURE__ */ s(ji.Provider, { value: E, children: /* @__PURE__ */ s(nd, { delayDuration: 0, children: /* @__PURE__ */ s(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": ld,
            "--sidebar-width-icon": dd,
            ...o
          }
        ),
        className: x(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          r
        ),
        ref: l,
        ...i,
        children: a
      }
    ) }) });
  }
);
Vi.displayName = "SidebarProvider";
const zi = T.forwardRef(
  ({
    side: t = "left",
    variant: e = "sidebar",
    collapsible: n = "offcanvas",
    className: r,
    children: o,
    ...a
  }, i) => {
    const { isMobile: l, state: c, openMobile: p, setOpenMobile: d } = cr();
    return n === "none" ? /* @__PURE__ */ s(
      "div",
      {
        className: x(
          "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
          r
        ),
        ref: i,
        ...a,
        children: o
      }
    ) : l ? /* @__PURE__ */ s(Jc, { open: p, onOpenChange: d, ...a, children: /* @__PURE__ */ s(
      Di,
      {
        "data-sidebar": "sidebar",
        "data-mobile": "true",
        className: "tw-w-[--sidebar-width] tw-bg-sidebar tw-p-0 tw-text-sidebar-foreground [&>button]:tw-hidden",
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": cd
          }
        ),
        side: t,
        children: /* @__PURE__ */ s("div", { className: "tw-flex tw-h-full tw-w-full tw-flex-col", children: o })
      }
    ) }) : /* @__PURE__ */ N(
      "div",
      {
        ref: i,
        className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
        "data-state": c,
        "data-collapsible": c === "collapsed" ? n : "",
        "data-variant": e,
        "data-side": t,
        children: [
          /* @__PURE__ */ s(
            "div",
            {
              className: x(
                "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
                "group-data-[collapsible=offcanvas]:tw-w-0",
                "group-data-[side=right]:tw-rotate-180",
                e === "floating" || e === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
              )
            }
          ),
          /* @__PURE__ */ s(
            "div",
            {
              className: x(
                // Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
                "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
                t === "left" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
                // Adjust the padding for floating and inset variants.
                e === "floating" || e === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=left]:tw-border-r group-data-[side=right]:tw-border-l",
                r
              ),
              ...a,
              children: /* @__PURE__ */ s(
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
zi.displayName = "Sidebar";
const ud = T.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const { toggleSidebar: o } = cr();
  return /* @__PURE__ */ N(
    gt,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: x("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o();
      },
      ...n,
      children: [
        /* @__PURE__ */ s(ml, {}),
        /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ud.displayName = "SidebarTrigger";
const wd = T.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = cr();
    return /* @__PURE__ */ s(
      "button",
      {
        type: "button",
        ref: n,
        "data-sidebar": "rail",
        "aria-label": "Toggle Sidebar",
        tabIndex: -1,
        onClick: r,
        title: "Toggle Sidebar",
        className: x(
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
wd.displayName = "SidebarRail";
const Li = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "main",
    {
      ref: n,
      className: x(
        // Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Li.displayName = "SidebarInset";
const fd = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Ye,
  {
    ref: n,
    "data-sidebar": "input",
    className: x(
      "tw-h-8 tw-w-full tw-bg-background tw-shadow-none focus-visible:tw-ring-2 focus-visible:tw-ring-sidebar-ring",
      t
    ),
    ...e
  }
));
fd.displayName = "SidebarInput";
const md = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "header",
      className: x("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
md.displayName = "SidebarHeader";
const hd = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "footer",
      className: x("tw-flex tw-flex-col tw-gap-2 tw-p-2", t),
      ...e
    }
  )
);
hd.displayName = "SidebarFooter";
const gd = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  go,
  {
    ref: n,
    "data-sidebar": "separator",
    className: x("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
gd.displayName = "SidebarSeparator";
const Fi = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "content",
      className: x(
        "tw-flex tw-min-h-0 tw-flex-1 tw-flex-col tw-gap-2 tw-overflow-auto group-data-[collapsible=icon]:tw-overflow-hidden",
        t
      ),
      ...e
    }
  )
);
Fi.displayName = "SidebarContent";
const Kr = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "group",
      className: x("tw-relative tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-p-2", t),
      ...e
    }
  )
);
Kr.displayName = "SidebarGroup";
const Jr = T.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ s(
  e ? He : "div",
  {
    ref: r,
    "data-sidebar": "group-label",
    className: x(
      "tw-flex tw-h-8 tw-shrink-0 tw-items-center tw-rounded-md tw-px-2 tw-text-xs tw-font-medium tw-text-sidebar-foreground/70 tw-outline-none tw-ring-sidebar-ring tw-transition-[margin,opa] tw-duration-200 tw-ease-linear focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      "group-data-[collapsible=icon]:tw--mt-8 group-data-[collapsible=icon]:tw-opacity-0",
      t
    ),
    ...n
  }
));
Jr.displayName = "SidebarGroupLabel";
const bd = T.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ s(
  e ? He : "button",
  {
    ref: r,
    "data-sidebar": "group-action",
    className: x(
      "tw-absolute tw-right-3 tw-top-3.5 tw-flex tw-aspect-square tw-w-5 tw-items-center tw-justify-center tw-rounded-md tw-p-0 tw-text-sidebar-foreground tw-outline-none tw-ring-sidebar-ring tw-transition-transform hover:tw-bg-sidebar-accent hover:tw-text-sidebar-accent-foreground focus-visible:tw-ring-2 [&>svg]:tw-size-4 [&>svg]:tw-shrink-0",
      // Increases the hit area of the button on mobile.
      "after:tw-absolute after:tw--inset-2 after:md:tw-hidden",
      "group-data-[collapsible=icon]:tw-hidden",
      t
    ),
    ...n
  }
));
bd.displayName = "SidebarGroupAction";
const Zr = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "group-content",
      className: x("tw-w-full tw-text-sm", t),
      ...e
    }
  )
);
Zr.displayName = "SidebarGroupContent";
const Ui = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu",
      className: x("tw-flex tw-w-full tw-min-w-0 tw-flex-col tw-gap-1", t),
      ...e
    }
  )
);
Ui.displayName = "SidebarMenu";
const Gi = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "li",
    {
      ref: n,
      "data-sidebar": "menu-item",
      className: x("tw-group/menu-item tw-relative", t),
      ...e
    }
  )
);
Gi.displayName = "SidebarMenuItem";
const vd = Xe(
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
), Hi = T.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...i
  }, l) => {
    const c = t ? He : "button", { isMobile: p, state: d } = cr(), m = /* @__PURE__ */ s(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: x(vd({ variant: n, size: r }), a),
        ...i
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ N(rd, { children: [
      /* @__PURE__ */ s(od, { asChild: !0, children: m }),
      /* @__PURE__ */ s(
        Bi,
        {
          side: "right",
          align: "center",
          hidden: d !== "collapsed" || p,
          ...o
        }
      )
    ] })) : m;
  }
);
Hi.displayName = "SidebarMenuButton";
const yd = T.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ s(
  e ? He : "button",
  {
    ref: o,
    "data-sidebar": "menu-action",
    className: x(
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
yd.displayName = "SidebarMenuAction";
const xd = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      "data-sidebar": "menu-badge",
      className: x(
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
xd.displayName = "SidebarMenuBadge";
const Nd = T.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = T.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ N(
    "div",
    {
      ref: r,
      "data-sidebar": "menu-skeleton",
      className: x("tw-flex tw-h-8 tw-items-center tw-gap-2 tw-rounded-md tw-px-2", t),
      ...n,
      children: [
        e && /* @__PURE__ */ s(aa, { className: "tw-size-4 tw-rounded-md", "data-sidebar": "menu-skeleton-icon" }),
        /* @__PURE__ */ s(
          aa,
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
Nd.displayName = "SidebarMenuSkeleton";
const kd = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "ul",
    {
      ref: n,
      "data-sidebar": "menu-sub",
      className: x(
        "tw-mx-3.5 tw-flex tw-min-w-0 tw-translate-x-px tw-flex-col tw-gap-1 tw-border-l tw-border-sidebar-border tw-px-2.5 tw-py-0.5",
        "group-data-[collapsible=icon]:tw-hidden",
        t
      ),
      ...e
    }
  )
);
kd.displayName = "SidebarMenuSub";
const Ed = T.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ s("li", { ref: e, ...t })
);
Ed.displayName = "SidebarMenuSubItem";
const Sd = T.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ s(
  t ? He : "a",
  {
    ref: a,
    "data-sidebar": "menu-sub-button",
    "data-size": e,
    "data-active": n,
    className: x(
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
Sd.displayName = "SidebarMenuSubButton";
function Td({
  id: t,
  extensionLabels: e,
  projectOptions: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: i
}) {
  const l = Et(
    (d, m) => {
      r(d, m);
    },
    [r]
  ), c = Et(
    (d) => {
      const m = n.find((w) => w.projectId === d);
      return m ? m.projectName : d;
    },
    [n]
  ), p = Et(
    (d) => !o.projectId && d === o.label,
    [o]
  );
  return /* @__PURE__ */ s(
    zi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
      children: /* @__PURE__ */ N(Fi, { children: [
        /* @__PURE__ */ N(Kr, { children: [
          /* @__PURE__ */ s(Jr, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ s(Zr, { children: /* @__PURE__ */ s(Ui, { children: e.map((d) => /* @__PURE__ */ s(Gi, { children: /* @__PURE__ */ s(
            Hi,
            {
              className: x(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": p(d) }
              ),
              onClick: () => l(d, void 0),
              isActive: p(d),
              children: /* @__PURE__ */ s("span", { className: "tw-pl-3", children: d })
            }
          ) }, d)) }) })
        ] }),
        /* @__PURE__ */ N(Kr, { children: [
          /* @__PURE__ */ s(Jr, { className: "tw-text-sm tw-text-gray-400", children: i }),
          /* @__PURE__ */ s(Zr, { className: "tw-pl-3", children: /* @__PURE__ */ s(
            qr,
            {
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((d) => d.projectId),
              getOptionLabel: (d) => c(d),
              buttonPlaceholder: "Type or select project",
              onChange: (d) => {
                const m = c(d);
                l(m, d);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0
            }
          ) })
        ] })
      ] })
    }
  );
}
function Th({
  id: t,
  direction: e = "ltr",
  extensionLabels: n,
  projectOptions: r,
  children: o,
  handleSelectSidebarItem: a,
  selectedSidebarItem: i,
  onSearch: l,
  extensionsSidebarGroupLabel: c,
  projectsSidebarGroupLabel: p
}) {
  return /* @__PURE__ */ N("div", { className: "tw-flex tw-h-full tw-flex-col tw-p-3 tw-pb-2", children: [
    /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ s(
      Pi,
      {
        className: "tw-w-9/12",
        onSearch: l,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ N(Vi, { dir: e, id: t, className: "tw-h-full tw-flex-1 tw-gap-4", children: [
      /* @__PURE__ */ s(
        Td,
        {
          extensionLabels: n,
          projectOptions: r,
          handleSelectSidebarItem: a,
          selectedSidebarItem: i,
          extensionsSidebarGroupLabel: c,
          projectsSidebarGroupLabel: p
        }
      ),
      /* @__PURE__ */ s(Li, { className: "tw-overflow-y-auto", children: o })
    ] })
  ] });
}
const ne = "scrBook", Cd = "scrRef", we = "source", Od = "details", Rd = "Scripture Reference", _d = "Scripture Book", Xi = "Type", Pd = "Details";
function $d(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${ot.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: ne,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Rd,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? ot.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === ne ? Or(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Hr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Or(r.start),
      id: Cd,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Or(o.start);
      },
      sortingFn: (r, o) => Hr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: we,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Xi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Od,
      header: (t == null ? void 0 : t.detailsColumnName) ?? Pd,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const Id = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Hr(t.start, t.end) === 0 ? `${Rr(t.start)}+${e}` : `${Rr(t.start)}+${e}-${Rr(t.end)}+${n}`;
}, ia = (t) => `${Id({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Ch({
  sources: t,
  showColumnHeaders: e = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l,
  direction: c = "ltr"
}) {
  const [p, d] = ut([]), [m, w] = ut([{ id: ne, desc: !1 }]), [g, v] = ut({}), f = It(
    () => t.flatMap((O) => O.data.map(($) => ({
      ...$,
      source: O.source
    }))),
    [t]
  ), h = It(
    () => $d(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: i
      },
      n
    ),
    [r, a, i, n]
  );
  ae(() => {
    p.includes(we) ? w([
      { id: we, desc: !1 },
      { id: ne, desc: !1 }
    ]) : w([{ id: ne, desc: !1 }]);
  }, [p]);
  const E = ei({
    data: f,
    columns: h,
    state: {
      grouping: p,
      sorting: m,
      rowSelection: g
    },
    onGroupingChange: d,
    onSortingChange: w,
    onRowSelectionChange: v,
    getExpandedRowModel: $l(),
    getGroupedRowModel: Il(),
    getCoreRowModel: ni(),
    getSortedRowModel: ri(),
    getRowId: ia,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  ae(() => {
    if (l) {
      const O = E.getSelectedRowModel().rowsById, $ = Object.keys(O);
      if ($.length === 1) {
        const k = f.find((B) => ia(B) === $[0]) || void 0;
        k && l(k);
      }
    }
  }, [g, f, l, E]);
  const _ = o ?? _d, C = a ?? Xi, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${_}`, value: [ne] },
    { label: `Group by ${C}`, value: [we] },
    {
      label: `Group by ${_} and ${C}`,
      value: [ne, we]
    },
    {
      label: `Group by ${C} and ${_}`,
      value: [we, ne]
    }
  ], b = (O) => {
    d(JSON.parse(O));
  }, I = (O, $) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()($);
  }, z = (O, $) => O.getIsGrouped() ? "" : x("banded-row", $ % 2 === 0 ? "even" : "odd"), H = (O, $, k) => {
    if (!((O == null ? void 0 : O.length) === 0 || $.depth < k.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ N("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ N(
      gn,
      {
        value: JSON.stringify(p),
        onValueChange: (O) => {
          b(O);
        },
        children: [
          /* @__PURE__ */ s(De, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ s(bn, {}) }),
          /* @__PURE__ */ s(Be, { position: "item-aligned", children: /* @__PURE__ */ s(Mc, { children: S.map((O) => /* @__PURE__ */ s(Gt, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ N(ar, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ s(ir, { children: E.getHeaderGroups().map((O) => /* @__PURE__ */ s(oe, { children: O.headers.filter(($) => $.column.columnDef.header).map(($) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ s(vn, { colSpan: $.colSpan, className: "top-0 tw-sticky", children: $.isPlaceholder ? void 0 : /* @__PURE__ */ N("div", { children: [
          $.column.getCanGroup() ? /* @__PURE__ */ s(
            gt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${$.column.columnDef.header}`,
              onClick: $.column.getToggleGroupingHandler(),
              type: "button",
              children: $.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          dn($.column.columnDef.header, $.getContext())
        ] }) }, $.id)
      )) }, O.id)) }),
      /* @__PURE__ */ s(sr, { children: E.getRowModel().rows.map((O, $) => /* @__PURE__ */ s(
        oe,
        {
          "data-state": O.getIsSelected() ? "selected" : "",
          className: x(z(O, $)),
          onClick: (k) => I(O, k),
          children: O.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== we || !n)))
              return /* @__PURE__ */ s(
                je,
                {
                  className: x(
                    k.column.columnDef.id,
                    "tw-p-[1px]",
                    H(p, O, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ N(
                    gt,
                    {
                      variant: "link",
                      onClick: O.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        O.getIsExpanded() && /* @__PURE__ */ s(er, {}),
                        !O.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ s(Ja, {}) : /* @__PURE__ */ s(hl, {})),
                        " ",
                        dn(k.column.columnDef.cell, k.getContext()),
                        " (",
                        O.subRows.length,
                        ")"
                      ]
                    }
                  ) : dn(k.column.columnDef.cell, k.getContext()))()
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
const Ir = {
  [pt("undefined")]: "Ø",
  [pt(0)]: "A",
  [pt(1)]: "B",
  [pt(2)]: "C",
  [pt(3)]: "D",
  [pt(4)]: "E",
  [pt(5)]: "F",
  [pt(6)]: "G",
  [pt(7)]: "H",
  [pt(8)]: "I",
  [pt(9)]: "J",
  [pt(10)]: "K",
  [pt(11)]: "L",
  [pt(12)]: "M",
  [pt(13)]: "N",
  [pt(14)]: "O",
  [pt(15)]: "P",
  [pt(16)]: "Q",
  [pt(17)]: "R",
  [pt(18)]: "S",
  [pt(19)]: "T",
  [pt(20)]: "U",
  [pt(21)]: "V",
  [pt(22)]: "W",
  [pt(23)]: "X",
  [pt(24)]: "Y",
  [pt(25)]: "Z"
};
function Oh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Ir,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([a, i]) => [
          a,
          a === i && a in Ir ? Ir[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ N(
    gn,
    {
      value: `${e}`,
      onValueChange: (a) => n(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ s(De, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ s(
          bn,
          {
            placeholder: o[pt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ s(
          Be,
          {
            style: { zIndex: 250 },
            children: t.map((a) => /* @__PURE__ */ s(Gt, { value: `${a}`, children: o[pt(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
function Rh({ children: t }) {
  return /* @__PURE__ */ s("div", { className: "pr-twp tw-grid", children: t });
}
function _h({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ s("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ s("div", { children: n })
  ] });
}
function Ph({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ N("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ s("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ s(go, {}) : ""
  ] });
}
function $h({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ s("div", { id: t, className: e, children: n.map((i) => /* @__PURE__ */ N("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ s(
      ho,
      {
        className: "tw-mr-2 tw-align-middle",
        checked: r.includes(i),
        onCheckedChange: (l) => o(i, l)
      }
    ),
    /* @__PURE__ */ s(Xt, { children: a ? a(i) : i })
  ] }, i)) });
}
function Ad(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Md(t) {
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
var bo = {}, Yi = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Yi);
var Dd = Yi.exports, Ar = {};
function vo(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function P() {
  return P = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, P.apply(this, arguments);
}
function he(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function Wi(t) {
  if (!he(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = Wi(t[n]);
  }), e;
}
function Zt(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? P({}, t) : t;
  return he(t) && he(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (he(e[o]) && o in t && he(t[o]) ? r[o] = Zt(t[o], e[o], n) : n.clone ? r[o] = he(e[o]) ? Wi(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var Qr = { exports: {} }, jn = { exports: {} }, it = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var sa;
function Bd() {
  if (sa)
    return it;
  sa = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, i = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, p = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, m = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, f = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, E = t ? Symbol.for("react.responder") : 60118, _ = t ? Symbol.for("react.scope") : 60119;
  function C(b) {
    if (typeof b == "object" && b !== null) {
      var I = b.$$typeof;
      switch (I) {
        case e:
          switch (b = b.type, b) {
            case c:
            case p:
            case r:
            case a:
            case o:
            case m:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case d:
                case v:
                case g:
                case i:
                  return b;
                default:
                  return I;
              }
          }
        case n:
          return I;
      }
    }
  }
  function S(b) {
    return C(b) === p;
  }
  return it.AsyncMode = c, it.ConcurrentMode = p, it.ContextConsumer = l, it.ContextProvider = i, it.Element = e, it.ForwardRef = d, it.Fragment = r, it.Lazy = v, it.Memo = g, it.Portal = n, it.Profiler = a, it.StrictMode = o, it.Suspense = m, it.isAsyncMode = function(b) {
    return S(b) || C(b) === c;
  }, it.isConcurrentMode = S, it.isContextConsumer = function(b) {
    return C(b) === l;
  }, it.isContextProvider = function(b) {
    return C(b) === i;
  }, it.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, it.isForwardRef = function(b) {
    return C(b) === d;
  }, it.isFragment = function(b) {
    return C(b) === r;
  }, it.isLazy = function(b) {
    return C(b) === v;
  }, it.isMemo = function(b) {
    return C(b) === g;
  }, it.isPortal = function(b) {
    return C(b) === n;
  }, it.isProfiler = function(b) {
    return C(b) === a;
  }, it.isStrictMode = function(b) {
    return C(b) === o;
  }, it.isSuspense = function(b) {
    return C(b) === m;
  }, it.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === p || b === a || b === o || b === m || b === w || typeof b == "object" && b !== null && (b.$$typeof === v || b.$$typeof === g || b.$$typeof === i || b.$$typeof === l || b.$$typeof === d || b.$$typeof === h || b.$$typeof === E || b.$$typeof === _ || b.$$typeof === f);
  }, it.typeOf = C, it;
}
var st = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var la;
function jd() {
  return la || (la = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, i = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, p = t ? Symbol.for("react.concurrent_mode") : 60111, d = t ? Symbol.for("react.forward_ref") : 60112, m = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, v = t ? Symbol.for("react.lazy") : 60116, f = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, E = t ? Symbol.for("react.responder") : 60118, _ = t ? Symbol.for("react.scope") : 60119;
    function C(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === r || A === p || A === a || A === o || A === m || A === w || typeof A == "object" && A !== null && (A.$$typeof === v || A.$$typeof === g || A.$$typeof === i || A.$$typeof === l || A.$$typeof === d || A.$$typeof === h || A.$$typeof === E || A.$$typeof === _ || A.$$typeof === f);
    }
    function S(A) {
      if (typeof A == "object" && A !== null) {
        var Nt = A.$$typeof;
        switch (Nt) {
          case e:
            var j = A.type;
            switch (j) {
              case c:
              case p:
              case r:
              case a:
              case o:
              case m:
                return j;
              default:
                var xt = j && j.$$typeof;
                switch (xt) {
                  case l:
                  case d:
                  case v:
                  case g:
                  case i:
                    return xt;
                  default:
                    return Nt;
                }
            }
          case n:
            return Nt;
        }
      }
    }
    var b = c, I = p, z = l, H = i, O = e, $ = d, k = r, B = v, D = g, J = n, q = a, U = o, tt = m, at = !1;
    function rt(A) {
      return at || (at = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), y(A) || S(A) === c;
    }
    function y(A) {
      return S(A) === p;
    }
    function R(A) {
      return S(A) === l;
    }
    function L(A) {
      return S(A) === i;
    }
    function F(A) {
      return typeof A == "object" && A !== null && A.$$typeof === e;
    }
    function V(A) {
      return S(A) === d;
    }
    function W(A) {
      return S(A) === r;
    }
    function X(A) {
      return S(A) === v;
    }
    function Y(A) {
      return S(A) === g;
    }
    function G(A) {
      return S(A) === n;
    }
    function K(A) {
      return S(A) === a;
    }
    function Z(A) {
      return S(A) === o;
    }
    function dt(A) {
      return S(A) === m;
    }
    st.AsyncMode = b, st.ConcurrentMode = I, st.ContextConsumer = z, st.ContextProvider = H, st.Element = O, st.ForwardRef = $, st.Fragment = k, st.Lazy = B, st.Memo = D, st.Portal = J, st.Profiler = q, st.StrictMode = U, st.Suspense = tt, st.isAsyncMode = rt, st.isConcurrentMode = y, st.isContextConsumer = R, st.isContextProvider = L, st.isElement = F, st.isForwardRef = V, st.isFragment = W, st.isLazy = X, st.isMemo = Y, st.isPortal = G, st.isProfiler = K, st.isStrictMode = Z, st.isSuspense = dt, st.isValidElementType = C, st.typeOf = S;
  }()), st;
}
var ca;
function qi() {
  return ca || (ca = 1, process.env.NODE_ENV === "production" ? jn.exports = Bd() : jn.exports = jd()), jn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Mr, da;
function Vd() {
  if (da)
    return Mr;
  da = 1;
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
      for (var i = {}, l = 0; l < 10; l++)
        i["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(i).map(function(d) {
        return i[d];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var p = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(d) {
        p[d] = d;
      }), Object.keys(Object.assign({}, p)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Mr = o() ? Object.assign : function(a, i) {
    for (var l, c = r(a), p, d = 1; d < arguments.length; d++) {
      l = Object(arguments[d]);
      for (var m in l)
        e.call(l, m) && (c[m] = l[m]);
      if (t) {
        p = t(l);
        for (var w = 0; w < p.length; w++)
          n.call(l, p[w]) && (c[p[w]] = l[p[w]]);
      }
    }
    return c;
  }, Mr;
}
var Dr, pa;
function yo() {
  if (pa)
    return Dr;
  pa = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Dr = t, Dr;
}
var Br, ua;
function Ki() {
  return ua || (ua = 1, Br = Function.call.bind(Object.prototype.hasOwnProperty)), Br;
}
var jr, wa;
function zd() {
  if (wa)
    return jr;
  wa = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = yo(), n = {}, r = Ki();
    t = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, p) {
    if (process.env.NODE_ENV !== "production") {
      for (var d in a)
        if (r(a, d)) {
          var m;
          try {
            if (typeof a[d] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + d + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[d] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            m = a[d](i, d, c, l, null, e);
          } catch (v) {
            m = v;
          }
          if (m && !(m instanceof Error) && t(
            (c || "React class") + ": type specification of " + l + " `" + d + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof m + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), m instanceof Error && !(m.message in n)) {
            n[m.message] = !0;
            var g = p ? p() : "";
            t(
              "Failed " + l + " type: " + m.message + (g ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, jr = o, jr;
}
var Vr, fa;
function Ld() {
  if (fa)
    return Vr;
  fa = 1;
  var t = qi(), e = Vd(), n = yo(), r = Ki(), o = zd(), a = function() {
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
    var p = typeof Symbol == "function" && Symbol.iterator, d = "@@iterator";
    function m(y) {
      var R = y && (p && y[p] || y[d]);
      if (typeof R == "function")
        return R;
    }
    var w = "<<anonymous>>", g = {
      array: E("array"),
      bigint: E("bigint"),
      bool: E("boolean"),
      func: E("function"),
      number: E("number"),
      object: E("object"),
      string: E("string"),
      symbol: E("symbol"),
      any: _(),
      arrayOf: C,
      element: S(),
      elementType: b(),
      instanceOf: I,
      node: $(),
      objectOf: H,
      oneOf: z,
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
    function h(y) {
      if (process.env.NODE_ENV !== "production")
        var R = {}, L = 0;
      function F(W, X, Y, G, K, Z, dt) {
        if (G = G || w, Z = Z || Y, dt !== n) {
          if (c) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Nt = G + ":" + Y;
            !R[Nt] && // Avoid spamming the console because they are often not actionable except for lib authors
            L < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), R[Nt] = !0, L++);
          }
        }
        return X[Y] == null ? W ? X[Y] === null ? new f("The " + K + " `" + Z + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new f("The " + K + " `" + Z + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : y(X, Y, G, K, Z);
      }
      var V = F.bind(null, !1);
      return V.isRequired = F.bind(null, !0), V;
    }
    function E(y) {
      function R(L, F, V, W, X, Y) {
        var G = L[F], K = U(G);
        if (K !== y) {
          var Z = tt(G);
          return new f(
            "Invalid " + W + " `" + X + "` of type " + ("`" + Z + "` supplied to `" + V + "`, expected ") + ("`" + y + "`."),
            { expectedType: y }
          );
        }
        return null;
      }
      return h(R);
    }
    function _() {
      return h(i);
    }
    function C(y) {
      function R(L, F, V, W, X) {
        if (typeof y != "function")
          return new f("Property `" + X + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var Y = L[F];
        if (!Array.isArray(Y)) {
          var G = U(Y);
          return new f("Invalid " + W + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected an array."));
        }
        for (var K = 0; K < Y.length; K++) {
          var Z = y(Y, K, V, W, X + "[" + K + "]", n);
          if (Z instanceof Error)
            return Z;
        }
        return null;
      }
      return h(R);
    }
    function S() {
      function y(R, L, F, V, W) {
        var X = R[L];
        if (!l(X)) {
          var Y = U(X);
          return new f("Invalid " + V + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(y);
    }
    function b() {
      function y(R, L, F, V, W) {
        var X = R[L];
        if (!t.isValidElementType(X)) {
          var Y = U(X);
          return new f("Invalid " + V + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(y);
    }
    function I(y) {
      function R(L, F, V, W, X) {
        if (!(L[F] instanceof y)) {
          var Y = y.name || w, G = rt(L[F]);
          return new f("Invalid " + W + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return h(R);
    }
    function z(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function R(L, F, V, W, X) {
        for (var Y = L[F], G = 0; G < y.length; G++)
          if (v(Y, y[G]))
            return null;
        var K = JSON.stringify(y, function(dt, A) {
          var Nt = tt(A);
          return Nt === "symbol" ? String(A) : A;
        });
        return new f("Invalid " + W + " `" + X + "` of value `" + String(Y) + "` " + ("supplied to `" + V + "`, expected one of " + K + "."));
      }
      return h(R);
    }
    function H(y) {
      function R(L, F, V, W, X) {
        if (typeof y != "function")
          return new f("Property `" + X + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var Y = L[F], G = U(Y);
        if (G !== "object")
          return new f("Invalid " + W + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected an object."));
        for (var K in Y)
          if (r(Y, K)) {
            var Z = y(Y, K, V, W, X + "." + K, n);
            if (Z instanceof Error)
              return Z;
          }
        return null;
      }
      return h(R);
    }
    function O(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var R = 0; R < y.length; R++) {
        var L = y[R];
        if (typeof L != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + at(L) + " at index " + R + "."
          ), i;
      }
      function F(V, W, X, Y, G) {
        for (var K = [], Z = 0; Z < y.length; Z++) {
          var dt = y[Z], A = dt(V, W, X, Y, G, n);
          if (A == null)
            return null;
          A.data && r(A.data, "expectedType") && K.push(A.data.expectedType);
        }
        var Nt = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new f("Invalid " + Y + " `" + G + "` supplied to " + ("`" + X + "`" + Nt + "."));
      }
      return h(F);
    }
    function $() {
      function y(R, L, F, V, W) {
        return J(R[L]) ? null : new f("Invalid " + V + " `" + W + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return h(y);
    }
    function k(y, R, L, F, V) {
      return new f(
        (y || "React class") + ": " + R + " type `" + L + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function B(y) {
      function R(L, F, V, W, X) {
        var Y = L[F], G = U(Y);
        if (G !== "object")
          return new f("Invalid " + W + " `" + X + "` of type `" + G + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var K in y) {
          var Z = y[K];
          if (typeof Z != "function")
            return k(V, W, X, K, tt(Z));
          var dt = Z(Y, K, V, W, X + "." + K, n);
          if (dt)
            return dt;
        }
        return null;
      }
      return h(R);
    }
    function D(y) {
      function R(L, F, V, W, X) {
        var Y = L[F], G = U(Y);
        if (G !== "object")
          return new f("Invalid " + W + " `" + X + "` of type `" + G + "` " + ("supplied to `" + V + "`, expected `object`."));
        var K = e({}, L[F], y);
        for (var Z in K) {
          var dt = y[Z];
          if (r(y, Z) && typeof dt != "function")
            return k(V, W, X, Z, tt(dt));
          if (!dt)
            return new f(
              "Invalid " + W + " `" + X + "` key `" + Z + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(L[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(y), null, "  ")
            );
          var A = dt(Y, Z, V, W, X + "." + Z, n);
          if (A)
            return A;
        }
        return null;
      }
      return h(R);
    }
    function J(y) {
      switch (typeof y) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !y;
        case "object":
          if (Array.isArray(y))
            return y.every(J);
          if (y === null || l(y))
            return !0;
          var R = m(y);
          if (R) {
            var L = R.call(y), F;
            if (R !== y.entries) {
              for (; !(F = L.next()).done; )
                if (!J(F.value))
                  return !1;
            } else
              for (; !(F = L.next()).done; ) {
                var V = F.value;
                if (V && !J(V[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function q(y, R) {
      return y === "symbol" ? !0 : R ? R["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && R instanceof Symbol : !1;
    }
    function U(y) {
      var R = typeof y;
      return Array.isArray(y) ? "array" : y instanceof RegExp ? "object" : q(R, y) ? "symbol" : R;
    }
    function tt(y) {
      if (typeof y > "u" || y === null)
        return "" + y;
      var R = U(y);
      if (R === "object") {
        if (y instanceof Date)
          return "date";
        if (y instanceof RegExp)
          return "regexp";
      }
      return R;
    }
    function at(y) {
      var R = tt(y);
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
    function rt(y) {
      return !y.constructor || !y.constructor.name ? w : y.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, Vr;
}
var zr, ma;
function Fd() {
  if (ma)
    return zr;
  ma = 1;
  var t = yo();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, zr = function() {
    function r(i, l, c, p, d, m) {
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
  }, zr;
}
if (process.env.NODE_ENV !== "production") {
  var Ud = qi(), Gd = !0;
  Qr.exports = Ld()(Ud.isElement, Gd);
} else
  Qr.exports = Fd()();
var Hd = Qr.exports;
const u = /* @__PURE__ */ Ad(Hd);
function Xd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function Ji(t, e, n, r, o) {
  const a = t[e], i = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Xd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Zi = vo(u.element, Ji);
Zi.isRequired = vo(u.element.isRequired, Ji);
const Qi = Zi, Yd = "exact-prop: ​";
function Wd(t) {
  return process.env.NODE_ENV === "production" ? t : P({}, t, {
    [Yd]: (e) => {
      const n = Object.keys(e).filter((r) => !t.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Ve(t) {
  let e = "https://mui.com/production-error/?code=" + t;
  for (let n = 1; n < arguments.length; n += 1)
    e += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + t + "; visit " + e + " for the full message.";
}
var to = { exports: {} }, lt = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ha;
function qd() {
  if (ha)
    return lt;
  ha = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v;
  v = Symbol.for("react.module.reference");
  function f(h) {
    if (typeof h == "object" && h !== null) {
      var E = h.$$typeof;
      switch (E) {
        case t:
          switch (h = h.type, h) {
            case n:
            case o:
            case r:
            case p:
            case d:
              return h;
            default:
              switch (h = h && h.$$typeof, h) {
                case l:
                case i:
                case c:
                case w:
                case m:
                case a:
                  return h;
                default:
                  return E;
              }
          }
        case e:
          return E;
      }
    }
  }
  return lt.ContextConsumer = i, lt.ContextProvider = a, lt.Element = t, lt.ForwardRef = c, lt.Fragment = n, lt.Lazy = w, lt.Memo = m, lt.Portal = e, lt.Profiler = o, lt.StrictMode = r, lt.Suspense = p, lt.SuspenseList = d, lt.isAsyncMode = function() {
    return !1;
  }, lt.isConcurrentMode = function() {
    return !1;
  }, lt.isContextConsumer = function(h) {
    return f(h) === i;
  }, lt.isContextProvider = function(h) {
    return f(h) === a;
  }, lt.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, lt.isForwardRef = function(h) {
    return f(h) === c;
  }, lt.isFragment = function(h) {
    return f(h) === n;
  }, lt.isLazy = function(h) {
    return f(h) === w;
  }, lt.isMemo = function(h) {
    return f(h) === m;
  }, lt.isPortal = function(h) {
    return f(h) === e;
  }, lt.isProfiler = function(h) {
    return f(h) === o;
  }, lt.isStrictMode = function(h) {
    return f(h) === r;
  }, lt.isSuspense = function(h) {
    return f(h) === p;
  }, lt.isSuspenseList = function(h) {
    return f(h) === d;
  }, lt.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === p || h === d || h === g || typeof h == "object" && h !== null && (h.$$typeof === w || h.$$typeof === m || h.$$typeof === a || h.$$typeof === i || h.$$typeof === c || h.$$typeof === v || h.getModuleId !== void 0);
  }, lt.typeOf = f, lt;
}
var ct = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ga;
function Kd() {
  return ga || (ga = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), p = Symbol.for("react.suspense"), d = Symbol.for("react.suspense_list"), m = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), v = !1, f = !1, h = !1, E = !1, _ = !1, C;
    C = Symbol.for("react.module.reference");
    function S(j) {
      return !!(typeof j == "string" || typeof j == "function" || j === n || j === o || _ || j === r || j === p || j === d || E || j === g || v || f || h || typeof j == "object" && j !== null && (j.$$typeof === w || j.$$typeof === m || j.$$typeof === a || j.$$typeof === i || j.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      j.$$typeof === C || j.getModuleId !== void 0));
    }
    function b(j) {
      if (typeof j == "object" && j !== null) {
        var xt = j.$$typeof;
        switch (xt) {
          case t:
            var Ft = j.type;
            switch (Ft) {
              case n:
              case o:
              case r:
              case p:
              case d:
                return Ft;
              default:
                var ce = Ft && Ft.$$typeof;
                switch (ce) {
                  case l:
                  case i:
                  case c:
                  case w:
                  case m:
                  case a:
                    return ce;
                  default:
                    return xt;
                }
            }
          case e:
            return xt;
        }
      }
    }
    var I = i, z = a, H = t, O = c, $ = n, k = w, B = m, D = e, J = o, q = r, U = p, tt = d, at = !1, rt = !1;
    function y(j) {
      return at || (at = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function R(j) {
      return rt || (rt = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function L(j) {
      return b(j) === i;
    }
    function F(j) {
      return b(j) === a;
    }
    function V(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function W(j) {
      return b(j) === c;
    }
    function X(j) {
      return b(j) === n;
    }
    function Y(j) {
      return b(j) === w;
    }
    function G(j) {
      return b(j) === m;
    }
    function K(j) {
      return b(j) === e;
    }
    function Z(j) {
      return b(j) === o;
    }
    function dt(j) {
      return b(j) === r;
    }
    function A(j) {
      return b(j) === p;
    }
    function Nt(j) {
      return b(j) === d;
    }
    ct.ContextConsumer = I, ct.ContextProvider = z, ct.Element = H, ct.ForwardRef = O, ct.Fragment = $, ct.Lazy = k, ct.Memo = B, ct.Portal = D, ct.Profiler = J, ct.StrictMode = q, ct.Suspense = U, ct.SuspenseList = tt, ct.isAsyncMode = y, ct.isConcurrentMode = R, ct.isContextConsumer = L, ct.isContextProvider = F, ct.isElement = V, ct.isForwardRef = W, ct.isFragment = X, ct.isLazy = Y, ct.isMemo = G, ct.isPortal = K, ct.isProfiler = Z, ct.isStrictMode = dt, ct.isSuspense = A, ct.isSuspenseList = Nt, ct.isValidElementType = S, ct.typeOf = b;
  }()), ct;
}
process.env.NODE_ENV === "production" ? to.exports = qd() : to.exports = Kd();
var ba = to.exports;
const Jd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Zd(t) {
  const e = `${t}`.match(Jd);
  return e && e[1] || "";
}
function ts(t, e = "") {
  return t.displayName || t.name || Zd(t) || e;
}
function va(t, e, n) {
  const r = ts(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Qd(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return ts(t, "Component");
    if (typeof t == "object")
      switch (t.$$typeof) {
        case ba.ForwardRef:
          return va(t, t.render, "ForwardRef");
        case ba.Memo:
          return va(t, t.type, "memo");
        default:
          return;
      }
  }
}
function yn(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], i = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const tp = u.oneOfType([u.func, u.object]), es = tp;
function Wt(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ve(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function ep(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function np(t, e = 166) {
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
function rp(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function op(t, e) {
  var n, r;
  return /* @__PURE__ */ M.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Yn(t) {
  return t && t.ownerDocument || document;
}
function ap(t) {
  return Yn(t).defaultView || window;
}
function ip(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? P({}, e.propTypes) : null;
  return (o) => (a, i, l, c, p, ...d) => {
    const m = p || i, w = n == null ? void 0 : n[m];
    if (w) {
      const g = w(a, i, l, c, p, ...d);
      if (g)
        return g;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${m}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Wn(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const sp = typeof window < "u" ? M.useLayoutEffect : M.useEffect, ze = sp;
let ya = 0;
function lp(t) {
  const [e, n] = M.useState(t), r = t || e;
  return M.useEffect(() => {
    e == null && (ya += 1, n(`mui-${ya}`));
  }, [e]), r;
}
const xa = M["useId".toString()];
function ns(t) {
  if (xa !== void 0) {
    const e = xa();
    return t ?? e;
  }
  return lp(t);
}
function cp(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function rs({
  controlled: t,
  default: e,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = M.useRef(t !== void 0), [a, i] = M.useState(e), l = o ? t : a;
  if (process.env.NODE_ENV !== "production") {
    M.useEffect(() => {
      o !== (t !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, t]);
    const {
      current: p
    } = M.useRef(e);
    M.useEffect(() => {
      !o && p !== e && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(e)]);
  }
  const c = M.useCallback((p) => {
    o || i(p);
  }, []);
  return [l, c];
}
function eo(t) {
  const e = M.useRef(t);
  return ze(() => {
    e.current = t;
  }), M.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function xe(...t) {
  return M.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      Wn(n, e);
    });
  }, t);
}
const Na = {};
function dp(t, e) {
  const n = M.useRef(Na);
  return n.current === Na && (n.current = t(e)), n;
}
const pp = [];
function up(t) {
  M.useEffect(t, pp);
}
class Tn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Tn();
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
function sn() {
  const t = dp(Tn.create).current;
  return up(t.disposeEffect), t;
}
let dr = !0, no = !1;
const wp = new Tn(), fp = {
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
function mp(t) {
  const {
    type: e,
    tagName: n
  } = t;
  return !!(n === "INPUT" && fp[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function hp(t) {
  t.metaKey || t.altKey || t.ctrlKey || (dr = !0);
}
function Lr() {
  dr = !1;
}
function gp() {
  this.visibilityState === "hidden" && no && (dr = !0);
}
function bp(t) {
  t.addEventListener("keydown", hp, !0), t.addEventListener("mousedown", Lr, !0), t.addEventListener("pointerdown", Lr, !0), t.addEventListener("touchstart", Lr, !0), t.addEventListener("visibilitychange", gp, !0);
}
function vp(t) {
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return dr || mp(e);
}
function os() {
  const t = M.useCallback((o) => {
    o != null && bp(o.ownerDocument);
  }, []), e = M.useRef(!1);
  function n() {
    return e.current ? (no = !0, wp.start(100, () => {
      no = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return vp(o) ? (e.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
function as(t, e) {
  const n = P({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = P({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = P({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = as(o[i], a[i]);
      }));
    } else
      n[r] === void 0 && (n[r] = t[r]);
  }), n;
}
function xo(t, e, n = void 0) {
  const r = {};
  return Object.keys(t).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      r[o] = t[o].reduce((a, i) => {
        if (i) {
          const l = e(i);
          l !== "" && a.push(l), n && n[i] && a.push(n[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), r;
}
const ka = (t) => t, yp = () => {
  let t = ka;
  return {
    configure(e) {
      t = e;
    },
    generate(e) {
      return t(e);
    },
    reset() {
      t = ka;
    }
  };
}, xp = yp(), is = xp, ss = {
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
function pr(t, e, n = "Mui") {
  const r = ss[e];
  return r ? `${n}-${r}` : `${is.generate(t)}-${e}`;
}
function ls(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = pr(t, o, n);
  }), r;
}
function Np(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(e, Math.min(t, n));
}
function kt(t, e) {
  if (t == null)
    return {};
  var n = {}, r = Object.keys(t), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(e.indexOf(o) >= 0) && (n[o] = t[o]);
  return n;
}
const kp = ["values", "unit", "step"], Ep = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => P({}, n, {
    [r.key]: r.val
  }), {});
};
function Sp(t) {
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
  } = t, o = kt(t, kp), a = Ep(e), i = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function p(w, g) {
    const v = i.indexOf(g);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(v !== -1 && typeof e[i[v]] == "number" ? e[i[v]] : g) - r / 100}${n})`;
  }
  function d(w) {
    return i.indexOf(w) + 1 < i.length ? p(w, i[i.indexOf(w) + 1]) : l(w);
  }
  function m(w) {
    const g = i.indexOf(w);
    return g === 0 ? l(i[1]) : g === i.length - 1 ? c(i[g]) : p(w, i[i.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return P({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: p,
    only: d,
    not: m,
    unit: n
  }, o);
}
const Tp = {
  borderRadius: 4
}, Cp = Tp, Op = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {}, se = Op;
function un(t, e) {
  return e ? Zt(t, e, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : t;
}
const No = {
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
}, Ea = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (t) => `@media (min-width:${No[t]}px)`
};
function Qt(t, e, n) {
  const r = t.theme || {};
  if (Array.isArray(e)) {
    const a = r.breakpoints || Ea;
    return e.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(e[c]), i), {});
  }
  if (typeof e == "object") {
    const a = r.breakpoints || Ea;
    return Object.keys(e).reduce((i, l) => {
      if (Object.keys(a.values || No).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = n(e[l], l);
      } else {
        const c = l;
        i[c] = e[c];
      }
      return i;
    }, {});
  }
  return n(e);
}
function Rp(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function _p(t, e) {
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
function ur(t, e, n = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
function qn(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = ur(t, n) || r, e && (o = e(o, r, t)), o;
}
function yt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (i) => {
    if (i[e] == null)
      return null;
    const l = i[e], c = i.theme, p = ur(c, r) || {};
    return Qt(i, l, (m) => {
      let w = qn(p, o, m);
      return m === w && typeof m == "string" && (w = qn(p, o, `${e}${m === "default" ? "" : Wt(m)}`, m)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: se
  } : {}, a.filterProps = [e], a;
}
function Pp(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const $p = {
  m: "margin",
  p: "padding"
}, Ip = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Sa = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Ap = Pp((t) => {
  if (t.length > 2)
    if (Sa[t])
      t = Sa[t];
    else
      return [t];
  const [e, n] = t.split(""), r = $p[e], o = Ip[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), wr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], fr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Mp = [...wr, ...fr];
function Cn(t, e, n, r) {
  var o;
  const a = (o = ur(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function cs(t) {
  return Cn(t, "spacing", 8, "spacing");
}
function On(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Dp(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = On(e, n), r), {});
}
function Bp(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = Ap(n), a = Dp(o, r), i = t[n];
  return Qt(t, i, a);
}
function ds(t, e) {
  const n = cs(t.theme);
  return Object.keys(t).map((r) => Bp(t, e, r, n)).reduce(un, {});
}
function mt(t) {
  return ds(t, wr);
}
mt.propTypes = process.env.NODE_ENV !== "production" ? wr.reduce((t, e) => (t[e] = se, t), {}) : {};
mt.filterProps = wr;
function ht(t) {
  return ds(t, fr);
}
ht.propTypes = process.env.NODE_ENV !== "production" ? fr.reduce((t, e) => (t[e] = se, t), {}) : {};
ht.filterProps = fr;
process.env.NODE_ENV !== "production" && Mp.reduce((t, e) => (t[e] = se, t), {});
function jp(t = 8) {
  if (t.mui)
    return t;
  const e = cs({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = e(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function mr(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? un(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Bt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Lt(t, e) {
  return yt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const Vp = Lt("border", Bt), zp = Lt("borderTop", Bt), Lp = Lt("borderRight", Bt), Fp = Lt("borderBottom", Bt), Up = Lt("borderLeft", Bt), Gp = Lt("borderColor"), Hp = Lt("borderTopColor"), Xp = Lt("borderRightColor"), Yp = Lt("borderBottomColor"), Wp = Lt("borderLeftColor"), qp = Lt("outline", Bt), Kp = Lt("outlineColor"), hr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Cn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: On(e, r)
    });
    return Qt(t, t.borderRadius, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: se
} : {};
hr.filterProps = ["borderRadius"];
mr(Vp, zp, Lp, Fp, Up, Gp, Hp, Xp, Yp, Wp, hr, qp, Kp);
const gr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Cn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: On(e, r)
    });
    return Qt(t, t.gap, n);
  }
  return null;
};
gr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: se
} : {};
gr.filterProps = ["gap"];
const br = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Cn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: On(e, r)
    });
    return Qt(t, t.columnGap, n);
  }
  return null;
};
br.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: se
} : {};
br.filterProps = ["columnGap"];
const vr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Cn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: On(e, r)
    });
    return Qt(t, t.rowGap, n);
  }
  return null;
};
vr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: se
} : {};
vr.filterProps = ["rowGap"];
const Jp = yt({
  prop: "gridColumn"
}), Zp = yt({
  prop: "gridRow"
}), Qp = yt({
  prop: "gridAutoFlow"
}), tu = yt({
  prop: "gridAutoColumns"
}), eu = yt({
  prop: "gridAutoRows"
}), nu = yt({
  prop: "gridTemplateColumns"
}), ru = yt({
  prop: "gridTemplateRows"
}), ou = yt({
  prop: "gridTemplateAreas"
}), au = yt({
  prop: "gridArea"
});
mr(gr, br, vr, Jp, Zp, Qp, tu, eu, nu, ru, ou, au);
function Me(t, e) {
  return e === "grey" ? e : t;
}
const iu = yt({
  prop: "color",
  themeKey: "palette",
  transform: Me
}), su = yt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Me
}), lu = yt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Me
});
mr(iu, su, lu);
function At(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const cu = yt({
  prop: "width",
  transform: At
}), ko = (t) => {
  if (t.maxWidth !== void 0 && t.maxWidth !== null) {
    const e = (n) => {
      var r, o;
      const a = ((r = t.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || No[n];
      return a ? ((o = t.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${t.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: At(n)
      };
    };
    return Qt(t, t.maxWidth, e);
  }
  return null;
};
ko.filterProps = ["maxWidth"];
const du = yt({
  prop: "minWidth",
  transform: At
}), pu = yt({
  prop: "height",
  transform: At
}), uu = yt({
  prop: "maxHeight",
  transform: At
}), wu = yt({
  prop: "minHeight",
  transform: At
});
yt({
  prop: "size",
  cssProperty: "width",
  transform: At
});
yt({
  prop: "size",
  cssProperty: "height",
  transform: At
});
const fu = yt({
  prop: "boxSizing"
});
mr(cu, ko, du, pu, uu, wu, fu);
const mu = {
  // borders
  border: {
    themeKey: "borders",
    transform: Bt
  },
  borderTop: {
    themeKey: "borders",
    transform: Bt
  },
  borderRight: {
    themeKey: "borders",
    transform: Bt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Bt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Bt
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
    transform: Bt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: hr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Me
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Me
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Me
  },
  // spacing
  p: {
    style: ht
  },
  pt: {
    style: ht
  },
  pr: {
    style: ht
  },
  pb: {
    style: ht
  },
  pl: {
    style: ht
  },
  px: {
    style: ht
  },
  py: {
    style: ht
  },
  padding: {
    style: ht
  },
  paddingTop: {
    style: ht
  },
  paddingRight: {
    style: ht
  },
  paddingBottom: {
    style: ht
  },
  paddingLeft: {
    style: ht
  },
  paddingX: {
    style: ht
  },
  paddingY: {
    style: ht
  },
  paddingInline: {
    style: ht
  },
  paddingInlineStart: {
    style: ht
  },
  paddingInlineEnd: {
    style: ht
  },
  paddingBlock: {
    style: ht
  },
  paddingBlockStart: {
    style: ht
  },
  paddingBlockEnd: {
    style: ht
  },
  m: {
    style: mt
  },
  mt: {
    style: mt
  },
  mr: {
    style: mt
  },
  mb: {
    style: mt
  },
  ml: {
    style: mt
  },
  mx: {
    style: mt
  },
  my: {
    style: mt
  },
  margin: {
    style: mt
  },
  marginTop: {
    style: mt
  },
  marginRight: {
    style: mt
  },
  marginBottom: {
    style: mt
  },
  marginLeft: {
    style: mt
  },
  marginX: {
    style: mt
  },
  marginY: {
    style: mt
  },
  marginInline: {
    style: mt
  },
  marginInlineStart: {
    style: mt
  },
  marginInlineEnd: {
    style: mt
  },
  marginBlock: {
    style: mt
  },
  marginBlockStart: {
    style: mt
  },
  marginBlockEnd: {
    style: mt
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
    transform: At
  },
  maxWidth: {
    style: ko
  },
  minWidth: {
    transform: At
  },
  height: {
    transform: At
  },
  maxHeight: {
    transform: At
  },
  minHeight: {
    transform: At
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
}, Eo = mu;
function hu(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function gu(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function bu() {
  function t(n, r, o, a) {
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
      themeKey: p,
      transform: d,
      style: m
    } = l;
    if (r == null)
      return null;
    if (p === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = ur(o, p) || {};
    return m ? m(i) : Qt(i, r, (v) => {
      let f = qn(w, d, v);
      return v === f && typeof v == "string" && (f = qn(w, d, `${n}${v === "default" ? "" : Wt(v)}`, v)), c === !1 ? f : {
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
    const i = (r = a.unstable_sxConfig) != null ? r : Eo;
    function l(c) {
      let p = c;
      if (typeof c == "function")
        p = c(a);
      else if (typeof c != "object")
        return c;
      if (!p)
        return null;
      const d = Rp(a.breakpoints), m = Object.keys(d);
      let w = d;
      return Object.keys(p).forEach((g) => {
        const v = gu(p[g], a);
        if (v != null)
          if (typeof v == "object")
            if (i[g])
              w = un(w, t(g, v, a, i));
            else {
              const f = Qt({
                theme: a
              }, v, (h) => ({
                [g]: h
              }));
              hu(f, v) ? w[g] = e({
                sx: v,
                theme: a
              }) : w = un(w, f);
            }
          else
            w = un(w, t(g, v, a, i));
      }), _p(m, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const ps = bu();
ps.filterProps = ["sx"];
const So = ps;
function vu(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const yu = ["breakpoints", "palette", "spacing", "shape"];
function To(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, i = kt(t, yu), l = Sp(n), c = jp(o);
  let p = Zt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, r),
    spacing: c,
    shape: P({}, Cp, a)
  }, i);
  return p.applyStyles = vu, p = e.reduce((d, m) => Zt(d, m), p), p.unstable_sxConfig = P({}, Eo, i == null ? void 0 : i.unstable_sxConfig), p.unstable_sx = function(m) {
    return So({
      sx: m,
      theme: this
    });
  }, p;
}
function xu(t) {
  return Object.keys(t).length === 0;
}
function us(t = null) {
  const e = M.useContext(Ml);
  return !e || xu(e) ? t : e;
}
const Nu = To();
function ws(t = Nu) {
  return us(t);
}
const ku = ["ownerState"], Eu = ["variants"], Su = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Tu(t) {
  return Object.keys(t).length === 0;
}
function Cu(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function Gn(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const Ou = To(), Ta = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Vn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return Tu(e) ? t : e[n] || e;
}
function Ru(t) {
  return t ? (e, n) => n[t] : null;
}
function Hn(t, e) {
  let {
    ownerState: n
  } = e, r = kt(e, ku);
  const o = typeof t == "function" ? t(P({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => Hn(a, P({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = kt(o, Eu);
    return a.forEach((c) => {
      let p = !0;
      typeof c.props == "function" ? p = c.props(P({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((d) => {
        (n == null ? void 0 : n[d]) !== c.props[d] && r[d] !== c.props[d] && (p = !1);
      }), p && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(P({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function _u(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = Ou,
    rootShouldForwardProp: r = Gn,
    slotShouldForwardProp: o = Gn
  } = t, a = (i) => So(P({}, i, {
    theme: Vn(P({}, i, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Dl(i, (b) => b.filter((I) => !(I != null && I.__mui_systemSx)));
    const {
      name: c,
      slot: p,
      skipVariantsResolver: d,
      skipSx: m,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Ru(Ta(p))
    } = l, g = kt(l, Su), v = d !== void 0 ? d : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      p && p !== "Root" && p !== "root" || !1
    ), f = m || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Ta(p || "Root")}`);
    let E = Gn;
    p === "Root" || p === "root" ? E = r : p ? E = o : Cu(i) && (E = void 0);
    const _ = Al(i, P({
      shouldForwardProp: E,
      label: h
    }, g)), C = (b) => typeof b == "function" && b.__emotion_real !== b || he(b) ? (I) => Hn(b, P({}, I, {
      theme: Vn({
        theme: I.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : b, S = (b, ...I) => {
      let z = C(b);
      const H = I ? I.map(C) : [];
      c && w && H.push((k) => {
        const B = Vn(P({}, k, {
          defaultTheme: n,
          themeId: e
        }));
        if (!B.components || !B.components[c] || !B.components[c].styleOverrides)
          return null;
        const D = B.components[c].styleOverrides, J = {};
        return Object.entries(D).forEach(([q, U]) => {
          J[q] = Hn(U, P({}, k, {
            theme: B
          }));
        }), w(k, J);
      }), c && !v && H.push((k) => {
        var B;
        const D = Vn(P({}, k, {
          defaultTheme: n,
          themeId: e
        })), J = D == null || (B = D.components) == null || (B = B[c]) == null ? void 0 : B.variants;
        return Hn({
          variants: J
        }, P({}, k, {
          theme: D
        }));
      }), f || H.push(a);
      const O = H.length - I.length;
      if (Array.isArray(b) && O > 0) {
        const k = new Array(O).fill("");
        z = [...b, ...k], z.raw = [...b.raw, ...k];
      }
      const $ = _(z, ...H);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${Wt(p || "")}`), k === void 0 && (k = `Styled(${Qd(i)})`), $.displayName = k;
      }
      return i.muiName && ($.muiName = i.muiName), $;
    };
    return _.withConfig && (S.withConfig = _.withConfig), S;
  };
}
function Pu(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : as(e.components[n].defaultProps, r);
}
function $u({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = ws(n);
  return r && (o = o[r] || o), Pu({
    theme: o,
    name: e,
    props: t
  });
}
function Co(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), Np(t, e, n);
}
function Iu(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ne(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Ne(Iu(t));
  const e = t.indexOf("("), n = t.substring(0, e);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${t}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Ve(9, t));
  let r = t.substring(e + 1, t.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Ve(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function yr(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function Au(t) {
  t = Ne(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), i = (p, d = (p + n / 30) % 12) => o - a * Math.max(Math.min(d - 3, 9 - d, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), yr({
    type: l,
    values: c
  });
}
function Ca(t) {
  t = Ne(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Ne(Au(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function Oa(t, e) {
  const n = Ca(t), r = Ca(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function fs(t, e) {
  return t = Ne(t), e = Co(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, yr(t);
}
function Mu(t, e) {
  if (t = Ne(t), e = Co(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return yr(t);
}
function Du(t, e) {
  if (t = Ne(t), e = Co(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return yr(t);
}
function Bu(t, e) {
  return P({
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
const ju = {
  black: "#000",
  white: "#fff"
}, xn = ju, Vu = {
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
}, zu = Vu, Lu = {
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
}, Oe = Lu, Fu = {
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
}, Re = Fu, Uu = {
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
}, nn = Uu, Gu = {
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
}, _e = Gu, Hu = {
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
}, Pe = Hu, Xu = {
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
}, $e = Xu, Yu = ["mode", "contrastThreshold", "tonalOffset"], Ra = {
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
    paper: xn.white,
    default: xn.white
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
}, Fr = {
  text: {
    primary: xn.white,
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
    active: xn.white,
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
function _a(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = Du(t.main, o) : e === "dark" && (t.dark = Mu(t.main, a)));
}
function Wu(t = "light") {
  return t === "dark" ? {
    main: _e[200],
    light: _e[50],
    dark: _e[400]
  } : {
    main: _e[700],
    light: _e[400],
    dark: _e[800]
  };
}
function qu(t = "light") {
  return t === "dark" ? {
    main: Oe[200],
    light: Oe[50],
    dark: Oe[400]
  } : {
    main: Oe[500],
    light: Oe[300],
    dark: Oe[700]
  };
}
function Ku(t = "light") {
  return t === "dark" ? {
    main: Re[500],
    light: Re[300],
    dark: Re[700]
  } : {
    main: Re[700],
    light: Re[400],
    dark: Re[800]
  };
}
function Ju(t = "light") {
  return t === "dark" ? {
    main: Pe[400],
    light: Pe[300],
    dark: Pe[700]
  } : {
    main: Pe[700],
    light: Pe[500],
    dark: Pe[900]
  };
}
function Zu(t = "light") {
  return t === "dark" ? {
    main: $e[400],
    light: $e[300],
    dark: $e[700]
  } : {
    main: $e[800],
    light: $e[500],
    dark: $e[900]
  };
}
function Qu(t = "light") {
  return t === "dark" ? {
    main: nn[400],
    light: nn[300],
    dark: nn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: nn[500],
    dark: nn[900]
  };
}
function tw(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = kt(t, Yu), a = t.primary || Wu(e), i = t.secondary || qu(e), l = t.error || Ku(e), c = t.info || Ju(e), p = t.success || Zu(e), d = t.warning || Qu(e);
  function m(f) {
    const h = Oa(f, Fr.text.primary) >= n ? Fr.text.primary : Ra.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const E = Oa(f, h);
      E < 3 && console.error([`MUI: The contrast ratio of ${E}:1 for ${h} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const w = ({
    color: f,
    name: h,
    mainShade: E = 500,
    lightShade: _ = 300,
    darkShade: C = 700
  }) => {
    if (f = P({}, f), !f.main && f[E] && (f.main = f[E]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${E}\` property.` : Ve(11, h ? ` (${h})` : "", E));
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
} });` : Ve(12, h ? ` (${h})` : "", JSON.stringify(f.main)));
    return _a(f, "light", _, r), _a(f, "dark", C, r), f.contrastText || (f.contrastText = m(f.main)), f;
  }, g = {
    dark: Fr,
    light: Ra
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), Zt(P({
    // A collection of common colors.
    common: P({}, xn),
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
      color: i,
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
      color: d,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: w({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: w({
      color: p,
      name: "success"
    }),
    // The grey colors.
    grey: zu,
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
const ew = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function nw(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Pa = {
  textTransform: "uppercase"
}, $a = '"Roboto", "Helvetica", "Arial", sans-serif';
function rw(t, e) {
  const n = typeof e == "function" ? e(t) : e, {
    fontFamily: r = $a,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: p = 16,
    // Apply the CSS properties to all the variants.
    allVariants: d,
    pxToRem: m
  } = n, w = kt(n, ew);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof p != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, v = m || ((E) => `${E / p * g}rem`), f = (E, _, C, S, b) => P({
    fontFamily: r,
    fontWeight: E,
    fontSize: v(_),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: C
  }, r === $a ? {
    letterSpacing: `${nw(S / _)}em`
  } : {}, b, d), h = {
    h1: f(a, 96, 1.167, -1.5),
    h2: f(a, 60, 1.2, -0.5),
    h3: f(i, 48, 1.167, 0),
    h4: f(i, 34, 1.235, 0.25),
    h5: f(i, 24, 1.334, 0),
    h6: f(l, 20, 1.6, 0.15),
    subtitle1: f(i, 16, 1.75, 0.15),
    subtitle2: f(l, 14, 1.57, 0.1),
    body1: f(i, 16, 1.5, 0.15),
    body2: f(i, 14, 1.43, 0.15),
    button: f(l, 14, 1.75, 0.4, Pa),
    caption: f(i, 12, 1.66, 0.4),
    overline: f(i, 12, 2.66, 1, Pa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Zt(P({
    htmlFontSize: p,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, h), w, {
    clone: !1
    // No need to clone deep
  });
}
const ow = 0.2, aw = 0.14, iw = 0.12;
function ft(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${ow})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${aw})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${iw})`].join(",");
}
const sw = ["none", ft(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ft(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ft(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ft(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ft(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ft(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ft(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ft(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ft(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ft(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ft(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ft(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ft(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ft(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ft(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ft(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ft(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ft(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ft(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ft(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ft(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ft(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ft(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ft(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], lw = sw, cw = ["duration", "easing", "delay"], dw = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, pw = {
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
function Ia(t) {
  return `${Math.round(t)}ms`;
}
function uw(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function ww(t) {
  const e = P({}, dw, t.easing), n = P({}, pw, t.duration);
  return P({
    getAutoHeightDuration: uw,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, p = kt(a, cw);
      if (process.env.NODE_ENV !== "production") {
        const d = (w) => typeof w == "string", m = (w) => !isNaN(parseFloat(w));
        !d(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !m(i) && !d(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), d(l) || console.error('MUI: Argument "easing" must be a string.'), !m(c) && !d(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(p).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(p).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((d) => `${d} ${typeof i == "string" ? i : Ia(i)} ${l} ${typeof c == "string" ? c : Ia(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const fw = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, mw = fw, hw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function gw(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, i = kt(t, hw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ve(18));
  const l = tw(r), c = To(t);
  let p = Zt(c, {
    mixins: Bu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: lw.slice(),
    typography: rw(l, a),
    transitions: ww(o),
    zIndex: P({}, mw)
  });
  if (p = Zt(p, i), p = e.reduce((d, m) => Zt(d, m), p), process.env.NODE_ENV !== "production") {
    const d = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], m = (w, g) => {
      let v;
      for (v in w) {
        const f = w[v];
        if (d.indexOf(v) !== -1 && Object.keys(f).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = pr("", v);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${v}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: f
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[v] = {};
        }
      }
    };
    Object.keys(p.components).forEach((w) => {
      const g = p.components[w].styleOverrides;
      g && w.indexOf("Mui") === 0 && m(g, w);
    });
  }
  return p.unstable_sxConfig = P({}, Eo, i == null ? void 0 : i.unstable_sxConfig), p.unstable_sx = function(m) {
    return So({
      sx: m,
      theme: this
    });
  }, p;
}
const bw = gw(), Oo = bw, Ro = "$$material";
function _o({
  props: t,
  name: e
}) {
  return $u({
    props: t,
    name: e,
    defaultTheme: Oo,
    themeId: Ro
  });
}
const vw = (t) => Gn(t) && t !== "classes", yw = _u({
  themeId: Ro,
  defaultTheme: Oo,
  rootShouldForwardProp: vw
}), Rn = yw;
function xw(t) {
  return pr("MuiSvgIcon", t);
}
ls("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Nw = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], kw = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${Wt(e)}`, `fontSize${Wt(n)}`]
  };
  return xo(o, xw, r);
}, Ew = Rn("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${Wt(n.color)}`], e[`fontSize${Wt(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, i, l, c, p, d, m, w, g, v;
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
      small: ((a = t.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = t.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((p = t.typography) == null || (d = p.pxToRem) == null ? void 0 : d.call(p, 35)) || "2.1875rem"
    }[e.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (m = (w = (t.vars || t).palette) == null || (w = w[e.color]) == null ? void 0 : w.main) != null ? m : {
      action: (g = (t.vars || t).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (v = (t.vars || t).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[e.color]
  };
}), Po = /* @__PURE__ */ M.forwardRef(function(e, n) {
  const r = _o({
    props: e,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: p,
    inheritViewBox: d = !1,
    titleAccess: m,
    viewBox: w = "0 0 24 24"
  } = r, g = kt(r, Nw), v = /* @__PURE__ */ M.isValidElement(o) && o.type === "svg", f = P({}, r, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: d,
    viewBox: w,
    hasSvgAsChild: v
  }), h = {};
  d || (h.viewBox = w);
  const E = kw(f);
  return /* @__PURE__ */ N(Ew, P({
    as: l,
    className: be(E.root, a),
    focusable: "false",
    color: p,
    "aria-hidden": m ? void 0 : !0,
    role: m ? "img" : void 0,
    ref: n
  }, h, g, v && o.props, {
    ownerState: f,
    children: [v ? o.props.children : o, m ? /* @__PURE__ */ s("title", {
      children: m
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Po.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * Node passed into the SVG element.
   */
  children: u.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The color of the component.
   * It supports both default and custom theme colors, which can be added as shown in the
   * [palette customization guide](https://mui.com/material-ui/customization/palette/#custom-colors).
   * You can use the `htmlColor` prop to apply a color attribute to the SVG element.
   * @default 'inherit'
   */
  color: u.oneOfType([u.oneOf(["inherit", "action", "disabled", "primary", "secondary", "error", "info", "success", "warning"]), u.string]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The fontSize applied to the icon. Defaults to 24px, but can be configure to inherit font size.
   * @default 'medium'
   */
  fontSize: u.oneOfType([u.oneOf(["inherit", "large", "medium", "small"]), u.string]),
  /**
   * Applies a color attribute to the SVG element.
   */
  htmlColor: u.string,
  /**
   * If `true`, the root node will inherit the custom `component`'s viewBox and the `viewBox`
   * prop will be ignored.
   * Useful when you want to reference a custom `component` and have `SvgIcon` pass that
   * `component`'s viewBox to the root node.
   * @default false
   */
  inheritViewBox: u.bool,
  /**
   * The shape-rendering attribute. The behavior of the different options is described on the
   * [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/shape-rendering).
   * If you are having issues with blurry icons you should investigate this prop.
   */
  shapeRendering: u.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Provides a human-readable title for the element that contains it.
   * https://www.w3.org/TR/SVG-access/#Equivalent
   */
  titleAccess: u.string,
  /**
   * Allows you to redefine what the coordinates without units mean inside an SVG element.
   * For example, if the SVG element is 500 (width) by 200 (height),
   * and you pass viewBox="0 0 50 20",
   * this means that the coordinates inside the SVG will go from the top left corner (0,0)
   * to bottom right (50,20) and each unit will be worth 10px.
   * @default '0 0 24 24'
   */
  viewBox: u.string
});
Po.muiName = "SvgIcon";
const Aa = Po;
function ms(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ s(Aa, P({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = Aa.muiName, /* @__PURE__ */ M.memo(/* @__PURE__ */ M.forwardRef(n));
}
const Sw = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), is.configure(t);
  }
}, Tw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Wt,
  createChainedFunction: ep,
  createSvgIcon: ms,
  debounce: np,
  deprecatedPropType: rp,
  isMuiElement: op,
  ownerDocument: Yn,
  ownerWindow: ap,
  requirePropFactory: ip,
  setRef: Wn,
  unstable_ClassNameGenerator: Sw,
  unstable_useEnhancedEffect: ze,
  unstable_useId: ns,
  unsupportedProp: cp,
  useControlled: rs,
  useEventCallback: eo,
  useForkRef: xe,
  useIsFocusVisible: os
}, Symbol.toStringTag, { value: "Module" })), Cw = /* @__PURE__ */ Md(Tw);
var Ma;
function Ow() {
  return Ma || (Ma = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = Cw;
  }(Ar)), Ar;
}
var Rw = Dd;
Object.defineProperty(bo, "__esModule", {
  value: !0
});
var hs = bo.default = void 0, _w = Rw(Ow()), Pw = Ks;
hs = bo.default = (0, _w.default)(/* @__PURE__ */ (0, Pw.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function $w(t) {
  return typeof t == "string";
}
function ln(t, e, n) {
  return t === void 0 || $w(t) ? e : P({}, e, {
    ownerState: P({}, e.ownerState, n)
  });
}
const Iw = {
  disableDefaultClasses: !1
}, Aw = /* @__PURE__ */ M.createContext(Iw);
function Mw(t) {
  const {
    disableDefaultClasses: e
  } = M.useContext(Aw);
  return (n) => e ? "" : t(n);
}
function Dw(t, e = []) {
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
function Bw(t, e, n) {
  return typeof t == "function" ? t(e, n) : t;
}
function Da(t) {
  if (t === void 0)
    return {};
  const e = {};
  return Object.keys(t).filter((n) => !(n.match(/^on[A-Z]/) && typeof t[n] == "function")).forEach((n) => {
    e[n] = t[n];
  }), e;
}
function jw(t) {
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const g = be(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = P({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = P({}, n, o, r);
    return g.length > 0 && (f.className = g), Object.keys(v).length > 0 && (f.style = v), {
      props: f,
      internalRef: void 0
    };
  }
  const i = Dw(P({}, o, r)), l = Da(r), c = Da(o), p = e(i), d = be(p == null ? void 0 : p.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), m = P({}, p == null ? void 0 : p.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = P({}, p, n, c, l);
  return d.length > 0 && (w.className = d), Object.keys(m).length > 0 && (w.style = m), {
    props: w,
    internalRef: p.ref
  };
}
const Vw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function zw(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, i = kt(t, Vw), l = a ? {} : Bw(r, o), {
    props: c,
    internalRef: p
  } = jw(P({}, i, {
    externalSlotProps: l
  })), d = xe(p, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return ln(n, P({}, c, {
    ref: d
  }), o);
}
const gs = "base";
function Lw(t) {
  return `${gs}--${t}`;
}
function Fw(t, e) {
  return `${gs}-${t}-${e}`;
}
function bs(t, e) {
  const n = ss[e];
  return n ? Lw(n) : Fw(t, e);
}
function Uw(t, e) {
  const n = {};
  return e.forEach((r) => {
    n[r] = bs(t, r);
  }), n;
}
function Gw(t) {
  return typeof t == "function" ? t() : t;
}
const Kn = /* @__PURE__ */ M.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [i, l] = M.useState(null), c = xe(/* @__PURE__ */ M.isValidElement(r) ? r.ref : null, n);
  if (ze(() => {
    a || l(Gw(o) || document.body);
  }, [o, a]), ze(() => {
    if (i && !a)
      return Wn(n, i), () => {
        Wn(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ M.isValidElement(r)) {
      const p = {
        ref: c
      };
      return /* @__PURE__ */ M.cloneElement(r, p);
    }
    return /* @__PURE__ */ s(M.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ s(M.Fragment, {
    children: i && /* @__PURE__ */ Gl.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (Kn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The children to render into the `container`.
   */
  children: u.node,
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
  container: u.oneOfType([yn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
process.env.NODE_ENV !== "production" && (Kn["propTypes"] = Wd(Kn.propTypes));
var Ct = "top", Vt = "bottom", zt = "right", Ot = "left", $o = "auto", _n = [Ct, Vt, zt, Ot], Le = "start", Nn = "end", Hw = "clippingParents", vs = "viewport", rn = "popper", Xw = "reference", Ba = /* @__PURE__ */ _n.reduce(function(t, e) {
  return t.concat([e + "-" + Le, e + "-" + Nn]);
}, []), ys = /* @__PURE__ */ [].concat(_n, [$o]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Le, e + "-" + Nn]);
}, []), Yw = "beforeRead", Ww = "read", qw = "afterRead", Kw = "beforeMain", Jw = "main", Zw = "afterMain", Qw = "beforeWrite", tf = "write", ef = "afterWrite", nf = [Yw, Ww, qw, Kw, Jw, Zw, Qw, tf, ef];
function qt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Mt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function ke(t) {
  var e = Mt(t).Element;
  return t instanceof e || t instanceof Element;
}
function jt(t) {
  var e = Mt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Io(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Mt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function rf(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !jt(a) || !qt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function of(t) {
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
      var o = e.elements[r], a = e.attributes[r] || {}, i = Object.keys(e.styles.hasOwnProperty(r) ? e.styles[r] : n[r]), l = i.reduce(function(c, p) {
        return c[p] = "", c;
      }, {});
      !jt(o) || !qt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const af = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: rf,
  effect: of,
  requires: ["computeStyles"]
};
function Yt(t) {
  return t.split("-")[0];
}
var ve = Math.max, Jn = Math.min, Fe = Math.round;
function ro() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function xs() {
  return !/^((?!chrome|android).)*safari/i.test(ro());
}
function Ue(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && jt(t) && (o = t.offsetWidth > 0 && Fe(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Fe(r.height) / t.offsetHeight || 1);
  var i = ke(t) ? Mt(t) : window, l = i.visualViewport, c = !xs() && n, p = (r.left + (c && l ? l.offsetLeft : 0)) / o, d = (r.top + (c && l ? l.offsetTop : 0)) / a, m = r.width / o, w = r.height / a;
  return {
    width: m,
    height: w,
    top: d,
    right: p + m,
    bottom: d + w,
    left: p,
    x: p,
    y: d
  };
}
function Ao(t) {
  var e = Ue(t), n = t.offsetWidth, r = t.offsetHeight;
  return Math.abs(e.width - n) <= 1 && (n = e.width), Math.abs(e.height - r) <= 1 && (r = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: n,
    height: r
  };
}
function Ns(t, e) {
  var n = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (n && Io(n)) {
    var r = e;
    do {
      if (r && t.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function te(t) {
  return Mt(t).getComputedStyle(t);
}
function sf(t) {
  return ["table", "td", "th"].indexOf(qt(t)) >= 0;
}
function le(t) {
  return ((ke(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function xr(t) {
  return qt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Io(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    le(t)
  );
}
function ja(t) {
  return !jt(t) || // https://github.com/popperjs/popper-core/issues/837
  te(t).position === "fixed" ? null : t.offsetParent;
}
function lf(t) {
  var e = /firefox/i.test(ro()), n = /Trident/i.test(ro());
  if (n && jt(t)) {
    var r = te(t);
    if (r.position === "fixed")
      return null;
  }
  var o = xr(t);
  for (Io(o) && (o = o.host); jt(o) && ["html", "body"].indexOf(qt(o)) < 0; ) {
    var a = te(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Pn(t) {
  for (var e = Mt(t), n = ja(t); n && sf(n) && te(n).position === "static"; )
    n = ja(n);
  return n && (qt(n) === "html" || qt(n) === "body" && te(n).position === "static") ? e : n || lf(t) || e;
}
function Mo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function wn(t, e, n) {
  return ve(t, Jn(e, n));
}
function cf(t, e, n) {
  var r = wn(t, e, n);
  return r > n ? n : r;
}
function ks() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Es(t) {
  return Object.assign({}, ks(), t);
}
function Ss(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var df = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Es(typeof e != "number" ? e : Ss(e, _n));
};
function pf(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = Yt(n.placement), c = Mo(l), p = [Ot, zt].indexOf(l) >= 0, d = p ? "height" : "width";
  if (!(!a || !i)) {
    var m = df(o.padding, n), w = Ao(a), g = c === "y" ? Ct : Ot, v = c === "y" ? Vt : zt, f = n.rects.reference[d] + n.rects.reference[c] - i[c] - n.rects.popper[d], h = i[c] - n.rects.reference[c], E = Pn(a), _ = E ? c === "y" ? E.clientHeight || 0 : E.clientWidth || 0 : 0, C = f / 2 - h / 2, S = m[g], b = _ - w[d] - m[v], I = _ / 2 - w[d] / 2 + C, z = wn(S, I, b), H = c;
    n.modifiersData[r] = (e = {}, e[H] = z, e.centerOffset = z - I, e);
  }
}
function uf(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Ns(e.elements.popper, o) && (e.elements.arrow = o));
}
const wf = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: pf,
  effect: uf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Ge(t) {
  return t.split("-")[1];
}
var ff = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function mf(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Fe(n * o) / o || 0,
    y: Fe(r * o) / o || 0
  };
}
function Va(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, i = t.offsets, l = t.position, c = t.gpuAcceleration, p = t.adaptive, d = t.roundOffsets, m = t.isFixed, w = i.x, g = w === void 0 ? 0 : w, v = i.y, f = v === void 0 ? 0 : v, h = typeof d == "function" ? d({
    x: g,
    y: f
  }) : {
    x: g,
    y: f
  };
  g = h.x, f = h.y;
  var E = i.hasOwnProperty("x"), _ = i.hasOwnProperty("y"), C = Ot, S = Ct, b = window;
  if (p) {
    var I = Pn(n), z = "clientHeight", H = "clientWidth";
    if (I === Mt(n) && (I = le(n), te(I).position !== "static" && l === "absolute" && (z = "scrollHeight", H = "scrollWidth")), I = I, o === Ct || (o === Ot || o === zt) && a === Nn) {
      S = Vt;
      var O = m && I === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        I[z]
      );
      f -= O - r.height, f *= c ? 1 : -1;
    }
    if (o === Ot || (o === Ct || o === Vt) && a === Nn) {
      C = zt;
      var $ = m && I === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        I[H]
      );
      g -= $ - r.width, g *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, p && ff), B = d === !0 ? mf({
    x: g,
    y: f
  }, Mt(n)) : {
    x: g,
    y: f
  };
  if (g = B.x, f = B.y, c) {
    var D;
    return Object.assign({}, k, (D = {}, D[S] = _ ? "0" : "", D[C] = E ? "0" : "", D.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + f + "px)" : "translate3d(" + g + "px, " + f + "px, 0)", D));
  }
  return Object.assign({}, k, (e = {}, e[S] = _ ? f + "px" : "", e[C] = E ? g + "px" : "", e.transform = "", e));
}
function hf(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, p = {
    placement: Yt(e.placement),
    variation: Ge(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, Va(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, Va(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const gf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: hf,
  data: {}
};
var zn = {
  passive: !0
};
function bf(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, c = Mt(e.elements.popper), p = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && p.forEach(function(d) {
    d.addEventListener("scroll", n.update, zn);
  }), l && c.addEventListener("resize", n.update, zn), function() {
    a && p.forEach(function(d) {
      d.removeEventListener("scroll", n.update, zn);
    }), l && c.removeEventListener("resize", n.update, zn);
  };
}
const vf = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: bf,
  data: {}
};
var yf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Xn(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return yf[e];
  });
}
var xf = {
  start: "end",
  end: "start"
};
function za(t) {
  return t.replace(/start|end/g, function(e) {
    return xf[e];
  });
}
function Do(t) {
  var e = Mt(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Bo(t) {
  return Ue(le(t)).left + Do(t).scrollLeft;
}
function Nf(t, e) {
  var n = Mt(t), r = le(t), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var p = xs();
    (p || !p && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Bo(t),
    y: c
  };
}
function kf(t) {
  var e, n = le(t), r = Do(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = ve(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = ve(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Bo(t), c = -r.scrollTop;
  return te(o || n).direction === "rtl" && (l += ve(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function jo(t) {
  var e = te(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ts(t) {
  return ["html", "body", "#document"].indexOf(qt(t)) >= 0 ? t.ownerDocument.body : jt(t) && jo(t) ? t : Ts(xr(t));
}
function fn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Ts(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Mt(r), i = o ? [a].concat(a.visualViewport || [], jo(r) ? r : []) : r, l = e.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(fn(xr(i)))
  );
}
function oo(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function Ef(t, e) {
  var n = Ue(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function La(t, e, n) {
  return e === vs ? oo(Nf(t, n)) : ke(e) ? Ef(e, n) : oo(kf(le(t)));
}
function Sf(t) {
  var e = fn(xr(t)), n = ["absolute", "fixed"].indexOf(te(t).position) >= 0, r = n && jt(t) ? Pn(t) : t;
  return ke(r) ? e.filter(function(o) {
    return ke(o) && Ns(o, r) && qt(o) !== "body";
  }) : [];
}
function Tf(t, e, n, r) {
  var o = e === "clippingParents" ? Sf(t) : [].concat(e), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(c, p) {
    var d = La(t, p, r);
    return c.top = ve(d.top, c.top), c.right = Jn(d.right, c.right), c.bottom = Jn(d.bottom, c.bottom), c.left = ve(d.left, c.left), c;
  }, La(t, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Cs(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? Yt(r) : null, a = r ? Ge(r) : null, i = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case Ct:
      c = {
        x: i,
        y: e.y - n.height
      };
      break;
    case Vt:
      c = {
        x: i,
        y: e.y + e.height
      };
      break;
    case zt:
      c = {
        x: e.x + e.width,
        y: l
      };
      break;
    case Ot:
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
  var p = o ? Mo(o) : null;
  if (p != null) {
    var d = p === "y" ? "height" : "width";
    switch (a) {
      case Le:
        c[p] = c[p] - (e[d] / 2 - n[d] / 2);
        break;
      case Nn:
        c[p] = c[p] + (e[d] / 2 - n[d] / 2);
        break;
    }
  }
  return c;
}
function kn(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, i = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Hw : l, p = n.rootBoundary, d = p === void 0 ? vs : p, m = n.elementContext, w = m === void 0 ? rn : m, g = n.altBoundary, v = g === void 0 ? !1 : g, f = n.padding, h = f === void 0 ? 0 : f, E = Es(typeof h != "number" ? h : Ss(h, _n)), _ = w === rn ? Xw : rn, C = t.rects.popper, S = t.elements[v ? _ : w], b = Tf(ke(S) ? S : S.contextElement || le(t.elements.popper), c, d, i), I = Ue(t.elements.reference), z = Cs({
    reference: I,
    element: C,
    strategy: "absolute",
    placement: o
  }), H = oo(Object.assign({}, C, z)), O = w === rn ? H : I, $ = {
    top: b.top - O.top + E.top,
    bottom: O.bottom - b.bottom + E.bottom,
    left: b.left - O.left + E.left,
    right: O.right - b.right + E.right
  }, k = t.modifiersData.offset;
  if (w === rn && k) {
    var B = k[o];
    Object.keys($).forEach(function(D) {
      var J = [zt, Vt].indexOf(D) >= 0 ? 1 : -1, q = [Ct, Vt].indexOf(D) >= 0 ? "y" : "x";
      $[D] += B[q] * J;
    });
  }
  return $;
}
function Cf(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, p = c === void 0 ? ys : c, d = Ge(r), m = d ? l ? Ba : Ba.filter(function(v) {
    return Ge(v) === d;
  }) : _n, w = m.filter(function(v) {
    return p.indexOf(v) >= 0;
  });
  w.length === 0 && (w = m);
  var g = w.reduce(function(v, f) {
    return v[f] = kn(t, {
      placement: f,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Yt(f)], v;
  }, {});
  return Object.keys(g).sort(function(v, f) {
    return g[v] - g[f];
  });
}
function Of(t) {
  if (Yt(t) === $o)
    return [];
  var e = Xn(t);
  return [za(t), e, za(e)];
}
function Rf(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, c = n.fallbackPlacements, p = n.padding, d = n.boundary, m = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, v = g === void 0 ? !0 : g, f = n.allowedAutoPlacements, h = e.options.placement, E = Yt(h), _ = E === h, C = c || (_ || !v ? [Xn(h)] : Of(h)), S = [h].concat(C).reduce(function(V, W) {
      return V.concat(Yt(W) === $o ? Cf(e, {
        placement: W,
        boundary: d,
        rootBoundary: m,
        padding: p,
        flipVariations: v,
        allowedAutoPlacements: f
      }) : W);
    }, []), b = e.rects.reference, I = e.rects.popper, z = /* @__PURE__ */ new Map(), H = !0, O = S[0], $ = 0; $ < S.length; $++) {
      var k = S[$], B = Yt(k), D = Ge(k) === Le, J = [Ct, Vt].indexOf(B) >= 0, q = J ? "width" : "height", U = kn(e, {
        placement: k,
        boundary: d,
        rootBoundary: m,
        altBoundary: w,
        padding: p
      }), tt = J ? D ? zt : Ot : D ? Vt : Ct;
      b[q] > I[q] && (tt = Xn(tt));
      var at = Xn(tt), rt = [];
      if (a && rt.push(U[B] <= 0), l && rt.push(U[tt] <= 0, U[at] <= 0), rt.every(function(V) {
        return V;
      })) {
        O = k, H = !1;
        break;
      }
      z.set(k, rt);
    }
    if (H)
      for (var y = v ? 3 : 1, R = function(W) {
        var X = S.find(function(Y) {
          var G = z.get(Y);
          if (G)
            return G.slice(0, W).every(function(K) {
              return K;
            });
        });
        if (X)
          return O = X, "break";
      }, L = y; L > 0; L--) {
        var F = R(L);
        if (F === "break")
          break;
      }
    e.placement !== O && (e.modifiersData[r]._skip = !0, e.placement = O, e.reset = !0);
  }
}
const _f = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Rf,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Fa(t, e, n) {
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
function Ua(t) {
  return [Ct, zt, Vt, Ot].some(function(e) {
    return t[e] >= 0;
  });
}
function Pf(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, i = kn(e, {
    elementContext: "reference"
  }), l = kn(e, {
    altBoundary: !0
  }), c = Fa(i, r), p = Fa(l, o, a), d = Ua(c), m = Ua(p);
  e.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: p,
    isReferenceHidden: d,
    hasPopperEscaped: m
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": d,
    "data-popper-escaped": m
  });
}
const $f = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Pf
};
function If(t, e, n) {
  var r = Yt(t), o = [Ot, Ct].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Ot, zt].indexOf(r) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Af(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = ys.reduce(function(d, m) {
    return d[m] = If(m, e.rects, a), d;
  }, {}), l = i[e.placement], c = l.x, p = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += p), e.modifiersData[r] = i;
}
const Mf = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Af
};
function Df(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = Cs({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Bf = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Df,
  data: {}
};
function jf(t) {
  return t === "x" ? "y" : "x";
}
function Vf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, c = n.boundary, p = n.rootBoundary, d = n.altBoundary, m = n.padding, w = n.tether, g = w === void 0 ? !0 : w, v = n.tetherOffset, f = v === void 0 ? 0 : v, h = kn(e, {
    boundary: c,
    rootBoundary: p,
    padding: m,
    altBoundary: d
  }), E = Yt(e.placement), _ = Ge(e.placement), C = !_, S = Mo(E), b = jf(S), I = e.modifiersData.popperOffsets, z = e.rects.reference, H = e.rects.popper, O = typeof f == "function" ? f(Object.assign({}, e.rects, {
    placement: e.placement
  })) : f, $ = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), k = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (I) {
    if (a) {
      var D, J = S === "y" ? Ct : Ot, q = S === "y" ? Vt : zt, U = S === "y" ? "height" : "width", tt = I[S], at = tt + h[J], rt = tt - h[q], y = g ? -H[U] / 2 : 0, R = _ === Le ? z[U] : H[U], L = _ === Le ? -H[U] : -z[U], F = e.elements.arrow, V = g && F ? Ao(F) : {
        width: 0,
        height: 0
      }, W = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : ks(), X = W[J], Y = W[q], G = wn(0, z[U], V[U]), K = C ? z[U] / 2 - y - G - X - $.mainAxis : R - G - X - $.mainAxis, Z = C ? -z[U] / 2 + y + G + Y + $.mainAxis : L + G + Y + $.mainAxis, dt = e.elements.arrow && Pn(e.elements.arrow), A = dt ? S === "y" ? dt.clientTop || 0 : dt.clientLeft || 0 : 0, Nt = (D = k == null ? void 0 : k[S]) != null ? D : 0, j = tt + K - Nt - A, xt = tt + Z - Nt, Ft = wn(g ? Jn(at, j) : at, tt, g ? ve(rt, xt) : rt);
      I[S] = Ft, B[S] = Ft - tt;
    }
    if (l) {
      var ce, St = S === "x" ? Ct : Ot, In = S === "x" ? Vt : zt, Ut = I[b], Ee = b === "y" ? "height" : "width", de = Ut + h[St], Se = Ut - h[In], Te = [Ct, Ot].indexOf(E) !== -1, Ce = (ce = k == null ? void 0 : k[b]) != null ? ce : 0, pe = Te ? de : Ut - z[Ee] - H[Ee] - Ce + $.altAxis, qe = Te ? Ut + z[Ee] + H[Ee] - Ce - $.altAxis : Se, An = g && Te ? cf(pe, Ut, qe) : wn(g ? pe : de, Ut, g ? qe : Se);
      I[b] = An, B[b] = An - Ut;
    }
    e.modifiersData[r] = B;
  }
}
const zf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Vf,
  requiresIfExists: ["offset"]
};
function Lf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Ff(t) {
  return t === Mt(t) || !jt(t) ? Do(t) : Lf(t);
}
function Uf(t) {
  var e = t.getBoundingClientRect(), n = Fe(e.width) / t.offsetWidth || 1, r = Fe(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Gf(t, e, n) {
  n === void 0 && (n = !1);
  var r = jt(e), o = jt(e) && Uf(e), a = le(e), i = Ue(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((qt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  jo(a)) && (l = Ff(e)), jt(e) ? (c = Ue(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Bo(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Hf(t) {
  var e = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
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
function Xf(t) {
  var e = Hf(t);
  return nf.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Yf(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function Wf(t) {
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
var Ga = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ha() {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++)
    e[n] = arguments[n];
  return !e.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function qf(t) {
  t === void 0 && (t = {});
  var e = t, n = e.defaultModifiers, r = n === void 0 ? [] : n, o = e.defaultOptions, a = o === void 0 ? Ga : o;
  return function(l, c, p) {
    p === void 0 && (p = a);
    var d = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, Ga, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, m = [], w = !1, g = {
      state: d,
      setOptions: function(E) {
        var _ = typeof E == "function" ? E(d.options) : E;
        f(), d.options = Object.assign({}, a, d.options, _), d.scrollParents = {
          reference: ke(l) ? fn(l) : l.contextElement ? fn(l.contextElement) : [],
          popper: fn(c)
        };
        var C = Xf(Wf([].concat(r, d.options.modifiers)));
        return d.orderedModifiers = C.filter(function(S) {
          return S.enabled;
        }), v(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var E = d.elements, _ = E.reference, C = E.popper;
          if (Ha(_, C)) {
            d.rects = {
              reference: Gf(_, Pn(C), d.options.strategy === "fixed"),
              popper: Ao(C)
            }, d.reset = !1, d.placement = d.options.placement, d.orderedModifiers.forEach(function($) {
              return d.modifiersData[$.name] = Object.assign({}, $.data);
            });
            for (var S = 0; S < d.orderedModifiers.length; S++) {
              if (d.reset === !0) {
                d.reset = !1, S = -1;
                continue;
              }
              var b = d.orderedModifiers[S], I = b.fn, z = b.options, H = z === void 0 ? {} : z, O = b.name;
              typeof I == "function" && (d = I({
                state: d,
                options: H,
                name: O,
                instance: g
              }) || d);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Yf(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(d);
        });
      }),
      destroy: function() {
        f(), w = !0;
      }
    };
    if (!Ha(l, c))
      return g;
    g.setOptions(p).then(function(h) {
      !w && p.onFirstUpdate && p.onFirstUpdate(h);
    });
    function v() {
      d.orderedModifiers.forEach(function(h) {
        var E = h.name, _ = h.options, C = _ === void 0 ? {} : _, S = h.effect;
        if (typeof S == "function") {
          var b = S({
            state: d,
            name: E,
            instance: g,
            options: C
          }), I = function() {
          };
          m.push(b || I);
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
var Kf = [vf, Bf, gf, af, Mf, _f, zf, wf, $f], Jf = /* @__PURE__ */ qf({
  defaultModifiers: Kf
});
const Os = "Popper";
function Zf(t) {
  return bs(Os, t);
}
Uw(Os, ["root"]);
const Qf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], tm = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function em(t, e) {
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
function Zn(t) {
  return typeof t == "function" ? t() : t;
}
function Nr(t) {
  return t.nodeType !== void 0;
}
function nm(t) {
  return !Nr(t);
}
const rm = () => xo({
  root: ["root"]
}, Mw(Zf)), om = {}, am = /* @__PURE__ */ M.forwardRef(function(e, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: p,
    placement: d,
    popperOptions: m,
    popperRef: w,
    slotProps: g = {},
    slots: v = {},
    TransitionProps: f
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, h = kt(e, Qf), E = M.useRef(null), _ = xe(E, n), C = M.useRef(null), S = xe(C, w), b = M.useRef(S);
  ze(() => {
    b.current = S;
  }, [S]), M.useImperativeHandle(w, () => C.current, []);
  const I = em(d, i), [z, H] = M.useState(I), [O, $] = M.useState(Zn(o));
  M.useEffect(() => {
    C.current && C.current.forceUpdate();
  }), M.useEffect(() => {
    o && $(Zn(o));
  }, [o]), ze(() => {
    if (!O || !p)
      return;
    const q = (at) => {
      H(at.placement);
    };
    if (process.env.NODE_ENV !== "production" && O && Nr(O) && O.nodeType === 1) {
      const at = O.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && at.top === 0 && at.left === 0 && at.right === 0 && at.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: at
      }) => {
        q(at);
      }
    }];
    c != null && (U = U.concat(c)), m && m.modifiers != null && (U = U.concat(m.modifiers));
    const tt = Jf(O, E.current, P({
      placement: I
    }, m, {
      modifiers: U
    }));
    return b.current(tt), () => {
      tt.destroy(), b.current(null);
    };
  }, [O, l, c, p, m, I]);
  const k = {
    placement: z
  };
  f !== null && (k.TransitionProps = f);
  const B = rm(), D = (r = v.root) != null ? r : "div", J = zw({
    elementType: D,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: _
    },
    ownerState: e,
    className: B.root
  });
  return /* @__PURE__ */ s(D, P({}, J, {
    children: typeof a == "function" ? a(k) : a
  }));
}), Rs = /* @__PURE__ */ M.forwardRef(function(e, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: p,
    open: d,
    placement: m = "bottom",
    popperOptions: w = om,
    popperRef: g,
    style: v,
    transition: f = !1,
    slotProps: h = {},
    slots: E = {}
  } = e, _ = kt(e, tm), [C, S] = M.useState(!0), b = () => {
    S(!1);
  }, I = () => {
    S(!0);
  };
  if (!c && !d && (!f || C))
    return null;
  let z;
  if (a)
    z = a;
  else if (r) {
    const $ = Zn(r);
    z = $ && Nr($) ? Yn($).body : Yn(null).body;
  }
  const H = !d && c && (!f || C) ? "none" : void 0, O = f ? {
    in: d,
    onEnter: b,
    onExited: I
  } : void 0;
  return /* @__PURE__ */ s(Kn, {
    disablePortal: l,
    container: z,
    children: /* @__PURE__ */ s(am, P({
      anchorEl: r,
      direction: i,
      disablePortal: l,
      modifiers: p,
      ref: n,
      open: f ? !C : d,
      placement: m,
      popperOptions: w,
      popperRef: g,
      slotProps: h,
      slots: E
    }, _, {
      style: P({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: H
      }, v),
      TransitionProps: O,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Rs.propTypes = {
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
  anchorEl: vo(u.oneOfType([yn, u.object, u.func]), (t) => {
    if (t.open) {
      const e = Zn(t.anchorEl);
      if (e && Nr(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || nm(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
        return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "It should be an HTML element instance or a virtualElement ", "(https://popper.js.org/docs/v2/virtual-elements/)."].join(`
`));
    }
    return null;
  }),
  /**
   * Popper render function or node.
   */
  children: u.oneOfType([u.node, u.func]),
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
  container: u.oneOfType([yn, u.func]),
  /**
   * Direction of the text.
   * @default 'ltr'
   */
  direction: u.oneOf(["ltr", "rtl"]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: u.arrayOf(u.shape({
    data: u.object,
    effect: u.func,
    enabled: u.bool,
    fn: u.func,
    name: u.any,
    options: u.object,
    phase: u.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: u.arrayOf(u.string),
    requiresIfExists: u.arrayOf(u.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: u.shape({
    modifiers: u.array,
    onFirstUpdate: u.func,
    placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: u.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: es,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: u.shape({
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: u.bool
});
function _s() {
  const t = ws(Oo);
  return process.env.NODE_ENV !== "production" && M.useDebugValue(t), t[Ro] || t;
}
function ao(t, e) {
  return ao = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, ao(t, e);
}
function im(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, ao(t, e);
}
const Xa = {
  disabled: !1
};
var sm = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
  enter: u.number,
  exit: u.number,
  appear: u.number
}).isRequired]) : null;
process.env.NODE_ENV !== "production" && u.oneOfType([u.string, u.shape({
  enter: u.string,
  exit: u.string,
  active: u.string
}), u.shape({
  enter: u.string,
  enterDone: u.string,
  enterActive: u.string,
  exit: u.string,
  exitDone: u.string,
  exitActive: u.string
})]);
const Ps = T.createContext(null);
var lm = function(e) {
  return e.scrollTop;
}, cn = "unmounted", fe = "exited", me = "entering", Ae = "entered", io = "exiting", ee = /* @__PURE__ */ function(t) {
  im(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var i = o, l = i && !i.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = fe, a.appearStatus = me) : c = Ae : r.unmountOnExit || r.mountOnEnter ? c = cn : c = fe, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === cn ? {
      status: fe
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== me && i !== Ae && (a = me) : (i === me || i === Ae) && (a = io);
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
      if (this.cancelNextCallback(), a === me) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Bn.findDOMNode(this);
          i && lm(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === fe && this.setState({
        status: cn
      });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Bn.findDOMNode(this), l], p = c[0], d = c[1], m = this.getTimeouts(), w = l ? m.appear : m.enter;
    if (!o && !i || Xa.disabled) {
      this.safeSetState({
        status: Ae
      }, function() {
        a.props.onEntered(p);
      });
      return;
    }
    this.props.onEnter(p, d), this.safeSetState({
      status: me
    }, function() {
      a.props.onEntering(p, d), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: Ae
        }, function() {
          a.props.onEntered(p, d);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Bn.findDOMNode(this);
    if (!a || Xa.disabled) {
      this.safeSetState({
        status: fe
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: io
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: fe
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Bn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], p = c[0], d = c[1];
      this.props.addEndListener(p, d);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === cn)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = kt(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ T.createElement(Ps.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : T.cloneElement(T.Children.only(i), l))
    );
  }, e;
}(T.Component);
ee.contextType = Ps;
ee.propTypes = process.env.NODE_ENV !== "production" ? {
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
  nodeRef: u.shape({
    current: typeof Element > "u" ? u.any : function(t, e, n, r, o, a) {
      var i = t[e];
      return u.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(t, e, n, r, o, a);
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
  children: u.oneOfType([u.func.isRequired, u.element.isRequired]).isRequired,
  /**
   * Show the component; triggers the enter or exit states
   */
  in: u.bool,
  /**
   * By default the child component is mounted immediately along with
   * the parent `Transition` component. If you want to "lazy mount" the component on the
   * first `in={true}` you can set `mountOnEnter`. After the first enter transition the component will stay
   * mounted, even on "exited", unless you also specify `unmountOnExit`.
   */
  mountOnEnter: u.bool,
  /**
   * By default the child component stays mounted after it reaches the `'exited'` state.
   * Set `unmountOnExit` if you'd prefer to unmount the component after it finishes exiting.
   */
  unmountOnExit: u.bool,
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
  appear: u.bool,
  /**
   * Enable or disable enter transitions.
   */
  enter: u.bool,
  /**
   * Enable or disable exit transitions.
   */
  exit: u.bool,
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
    var n = sm;
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
  addEndListener: u.func,
  /**
   * Callback fired before the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEnter: u.func,
  /**
   * Callback fired after the "entering" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool)
   */
  onEntering: u.func,
  /**
   * Callback fired after the "entered" status is applied. An extra parameter
   * `isAppearing` is supplied to indicate if the enter stage is occurring on the initial mount
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement, isAppearing: bool) -> void
   */
  onEntered: u.func,
  /**
   * Callback fired before the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExit: u.func,
  /**
   * Callback fired after the "exiting" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed.
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExiting: u.func,
  /**
   * Callback fired after the "exited" status is applied.
   *
   * **Note**: when `nodeRef` prop is passed, `node` is not passed
   *
   * @type Function(node: HtmlElement) -> void
   */
  onExited: u.func
} : {};
function Ie() {
}
ee.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ie,
  onEntering: Ie,
  onEntered: Ie,
  onExit: Ie,
  onExiting: Ie,
  onExited: Ie
};
ee.UNMOUNTED = cn;
ee.EXITED = fe;
ee.ENTERING = me;
ee.ENTERED = Ae;
ee.EXITING = io;
const cm = ee, dm = (t) => t.scrollTop;
function Ya(t, e) {
  var n, r;
  const {
    timeout: o,
    easing: a,
    style: i = {}
  } = t;
  return {
    duration: (n = i.transitionDuration) != null ? n : typeof o == "number" ? o : o[e.mode] || 0,
    easing: (r = i.transitionTimingFunction) != null ? r : typeof a == "object" ? a[e.mode] : a,
    delay: i.transitionDelay
  };
}
const pm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function so(t) {
  return `scale(${t}, ${t ** 2})`;
}
const um = {
  entering: {
    opacity: 1,
    transform: so(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Ur = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Vo = /* @__PURE__ */ M.forwardRef(function(e, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: p,
    onEntering: d,
    onExit: m,
    onExited: w,
    onExiting: g,
    style: v,
    timeout: f = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = cm
  } = e, E = kt(e, pm), _ = sn(), C = M.useRef(), S = _s(), b = M.useRef(null), I = xe(b, a.ref, n), z = (q) => (U) => {
    if (q) {
      const tt = b.current;
      U === void 0 ? q(tt) : q(tt, U);
    }
  }, H = z(d), O = z((q, U) => {
    dm(q);
    const {
      duration: tt,
      delay: at,
      easing: rt
    } = Ya({
      style: v,
      timeout: f,
      easing: i
    }, {
      mode: "enter"
    });
    let y;
    f === "auto" ? (y = S.transitions.getAutoHeightDuration(q.clientHeight), C.current = y) : y = tt, q.style.transition = [S.transitions.create("opacity", {
      duration: y,
      delay: at
    }), S.transitions.create("transform", {
      duration: Ur ? y : y * 0.666,
      delay: at,
      easing: rt
    })].join(","), c && c(q, U);
  }), $ = z(p), k = z(g), B = z((q) => {
    const {
      duration: U,
      delay: tt,
      easing: at
    } = Ya({
      style: v,
      timeout: f,
      easing: i
    }, {
      mode: "exit"
    });
    let rt;
    f === "auto" ? (rt = S.transitions.getAutoHeightDuration(q.clientHeight), C.current = rt) : rt = U, q.style.transition = [S.transitions.create("opacity", {
      duration: rt,
      delay: tt
    }), S.transitions.create("transform", {
      duration: Ur ? rt : rt * 0.666,
      delay: Ur ? tt : tt || rt * 0.333,
      easing: at
    })].join(","), q.style.opacity = 0, q.style.transform = so(0.75), m && m(q);
  }), D = z(w);
  return /* @__PURE__ */ s(h, P({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: O,
    onEntered: $,
    onEntering: H,
    onExit: B,
    onExited: D,
    onExiting: k,
    addEndListener: (q) => {
      f === "auto" && _.start(C.current || 0, q), r && r(b.current, q);
    },
    timeout: f === "auto" ? null : f
  }, E, {
    children: (q, U) => /* @__PURE__ */ M.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: so(0.75),
        visibility: q === "exited" && !l ? "hidden" : void 0
      }, um[q], v, a.props.style),
      ref: I
    }, U))
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
  addEndListener: u.func,
  /**
   * Perform the enter transition when it first mounts if `in` is also `true`.
   * Set this to `false` to disable this behavior.
   * @default true
   */
  appear: u.bool,
  /**
   * A single child content element.
   */
  children: Qi.isRequired,
  /**
   * The transition timing function.
   * You may specify a single easing or a object containing enter and exit values.
   */
  easing: u.oneOfType([u.shape({
    enter: u.string,
    exit: u.string
  }), u.string]),
  /**
   * If `true`, the component will transition in.
   */
  in: u.bool,
  /**
   * @ignore
   */
  onEnter: u.func,
  /**
   * @ignore
   */
  onEntered: u.func,
  /**
   * @ignore
   */
  onEntering: u.func,
  /**
   * @ignore
   */
  onExit: u.func,
  /**
   * @ignore
   */
  onExited: u.func,
  /**
   * @ignore
   */
  onExiting: u.func,
  /**
   * @ignore
   */
  style: u.object,
  /**
   * The duration for the transition, in milliseconds.
   * You may specify a single timeout for all transitions, or individually with an object.
   *
   * Set to 'auto' to automatically calculate transition time based on height.
   * @default 'auto'
   */
  timeout: u.oneOfType([u.oneOf(["auto"]), u.number, u.shape({
    appear: u.number,
    enter: u.number,
    exit: u.number
  })])
});
Vo.muiSupportAuto = !0;
const Wa = Vo, wm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], fm = Rn(Rs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), $s = /* @__PURE__ */ M.forwardRef(function(e, n) {
  var r;
  const o = us(), a = _o({
    props: e,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: p,
    container: d,
    disablePortal: m,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: f,
    popperOptions: h,
    popperRef: E,
    transition: _,
    slots: C,
    slotProps: S
  } = a, b = kt(a, wm), I = (r = C == null ? void 0 : C.root) != null ? r : c == null ? void 0 : c.Root, z = P({
    anchorEl: i,
    container: d,
    disablePortal: m,
    keepMounted: w,
    modifiers: g,
    open: v,
    placement: f,
    popperOptions: h,
    popperRef: E,
    transition: _
  }, b);
  return /* @__PURE__ */ s(fm, P({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: I
    },
    slotProps: S ?? p
  }, z, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && ($s.propTypes = {
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
  anchorEl: u.oneOfType([yn, u.object, u.func]),
  /**
   * Popper render function or node.
   */
  children: u.oneOfType([u.node, u.func]),
  /**
   * The component used for the root node.
   * Either a string to use a HTML element or a component.
   */
  component: u.elementType,
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  components: u.shape({
    Root: u.elementType
  }),
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  componentsProps: u.shape({
    root: u.oneOfType([u.func, u.object])
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
  container: u.oneOfType([yn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool,
  /**
   * Always keep the children in the DOM.
   * This prop can be useful in SEO situation or
   * when you want to maximize the responsiveness of the Popper.
   * @default false
   */
  keepMounted: u.bool,
  /**
   * Popper.js is based on a "plugin-like" architecture,
   * most of its features are fully encapsulated "modifiers".
   *
   * A modifier is a function that is called each time Popper.js needs to
   * compute the position of the popper.
   * For this reason, modifiers should be very performant to avoid bottlenecks.
   * To learn how to create a modifier, [read the modifiers documentation](https://popper.js.org/docs/v2/modifiers/).
   */
  modifiers: u.arrayOf(u.shape({
    data: u.object,
    effect: u.func,
    enabled: u.bool,
    fn: u.func,
    name: u.any,
    options: u.object,
    phase: u.oneOf(["afterMain", "afterRead", "afterWrite", "beforeMain", "beforeRead", "beforeWrite", "main", "read", "write"]),
    requires: u.arrayOf(u.string),
    requiresIfExists: u.arrayOf(u.string)
  })),
  /**
   * If `true`, the component is shown.
   */
  open: u.bool.isRequired,
  /**
   * Popper placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * Options provided to the [`Popper.js`](https://popper.js.org/docs/v2/constructors/#options) instance.
   * @default {}
   */
  popperOptions: u.shape({
    modifiers: u.array,
    onFirstUpdate: u.func,
    placement: u.oneOf(["auto-end", "auto-start", "auto", "bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
    strategy: u.oneOf(["absolute", "fixed"])
  }),
  /**
   * A ref that points to the used popper instance.
   */
  popperRef: es,
  /**
   * The props used for each slot inside the Popper.
   * @default {}
   */
  slotProps: u.shape({
    root: u.oneOfType([u.func, u.object])
  }),
  /**
   * The components used for each slot inside the Popper.
   * Either a string to use a HTML element or a component.
   * @default {}
   */
  slots: u.shape({
    root: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Help supporting a react-transition-group/Transition component.
   * @default false
   */
  transition: u.bool
});
const Is = $s;
function mm(t) {
  return pr("MuiTooltip", t);
}
const hm = ls("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), re = hm, gm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function bm(t) {
  return Math.round(t * 1e5) / 1e5;
}
const vm = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Wt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return xo(i, mm, e);
}, ym = Rn(Is, {
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
}) => P({
  zIndex: (t.vars || t).zIndex.tooltip,
  pointerEvents: "none"
}, !e.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, e.arrow && {
  [`&[data-popper-placement*="bottom"] .${re.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${re.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${re.arrow}`]: P({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${re.arrow}`]: P({}, e.isRtl ? {
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
})), xm = Rn("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${Wt(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => P({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : fs(t.palette.grey[700], 0.92),
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
  lineHeight: `${bm(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${re.popper}[data-popper-placement*="left"] &`]: P({
    transformOrigin: "right center"
  }, e.isRtl ? P({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  }) : P({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  })),
  [`.${re.popper}[data-popper-placement*="right"] &`]: P({
    transformOrigin: "left center"
  }, e.isRtl ? P({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  }) : P({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  })),
  [`.${re.popper}[data-popper-placement*="top"] &`]: P({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${re.popper}[data-popper-placement*="bottom"] &`]: P({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), Nm = Rn("span", {
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
  color: t.vars ? t.vars.palette.Tooltip.bg : fs(t.palette.grey[700], 0.9),
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
let Ln = !1;
const qa = new Tn();
let on = {
  x: 0,
  y: 0
};
function Fn(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const As = /* @__PURE__ */ M.forwardRef(function(e, n) {
  var r, o, a, i, l, c, p, d, m, w, g, v, f, h, E, _, C, S, b;
  const I = _o({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: z = !1,
    children: H,
    components: O = {},
    componentsProps: $ = {},
    describeChild: k = !1,
    disableFocusListener: B = !1,
    disableHoverListener: D = !1,
    disableInteractive: J = !1,
    disableTouchListener: q = !1,
    enterDelay: U = 100,
    enterNextDelay: tt = 0,
    enterTouchDelay: at = 700,
    followCursor: rt = !1,
    id: y,
    leaveDelay: R = 0,
    leaveTouchDelay: L = 1500,
    onClose: F,
    onOpen: V,
    open: W,
    placement: X = "bottom",
    PopperComponent: Y,
    PopperProps: G = {},
    slotProps: K = {},
    slots: Z = {},
    title: dt,
    TransitionComponent: A = Wa,
    TransitionProps: Nt
  } = I, j = kt(I, gm), xt = /* @__PURE__ */ M.isValidElement(H) ? H : /* @__PURE__ */ s("span", {
    children: H
  }), Ft = _s(), ce = Ft.direction === "rtl", [St, In] = M.useState(), [Ut, Ee] = M.useState(null), de = M.useRef(!1), Se = J || rt, Te = sn(), Ce = sn(), pe = sn(), qe = sn(), [An, zo] = rs({
    controlled: W,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Kt = An;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: Q
    } = M.useRef(W !== void 0);
    M.useEffect(() => {
      St && St.disabled && !Q && dt !== "" && St.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [dt, St, Q]);
  }
  const kr = ns(y), Ke = M.useRef(), Mn = eo(() => {
    Ke.current !== void 0 && (document.body.style.WebkitUserSelect = Ke.current, Ke.current = void 0), qe.clear();
  });
  M.useEffect(() => Mn, [Mn]);
  const Lo = (Q) => {
    qa.clear(), Ln = !0, zo(!0), V && !Kt && V(Q);
  }, Dn = eo(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (Q) => {
      qa.start(800 + R, () => {
        Ln = !1;
      }), zo(!1), F && Kt && F(Q), Te.start(Ft.transitions.duration.shortest, () => {
        de.current = !1;
      });
    }
  ), Er = (Q) => {
    de.current && Q.type !== "touchstart" || (St && St.removeAttribute("title"), Ce.clear(), pe.clear(), U || Ln && tt ? Ce.start(Ln ? tt : U, () => {
      Lo(Q);
    }) : Lo(Q));
  }, Fo = (Q) => {
    Ce.clear(), pe.start(R, () => {
      Dn(Q);
    });
  }, {
    isFocusVisibleRef: Uo,
    onBlur: js,
    onFocus: Vs,
    ref: zs
  } = os(), [, Go] = M.useState(!1), Ho = (Q) => {
    js(Q), Uo.current === !1 && (Go(!1), Fo(Q));
  }, Xo = (Q) => {
    St || In(Q.currentTarget), Vs(Q), Uo.current === !0 && (Go(!0), Er(Q));
  }, Yo = (Q) => {
    de.current = !0;
    const Pt = xt.props;
    Pt.onTouchStart && Pt.onTouchStart(Q);
  }, Wo = Er, qo = Fo, Ls = (Q) => {
    Yo(Q), pe.clear(), Te.clear(), Mn(), Ke.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", qe.start(at, () => {
      document.body.style.WebkitUserSelect = Ke.current, Er(Q);
    });
  }, Fs = (Q) => {
    xt.props.onTouchEnd && xt.props.onTouchEnd(Q), Mn(), pe.start(L, () => {
      Dn(Q);
    });
  };
  M.useEffect(() => {
    if (!Kt)
      return;
    function Q(Pt) {
      (Pt.key === "Escape" || Pt.key === "Esc") && Dn(Pt);
    }
    return document.addEventListener("keydown", Q), () => {
      document.removeEventListener("keydown", Q);
    };
  }, [Dn, Kt]);
  const Us = xe(xt.ref, zs, In, n);
  !dt && dt !== 0 && (Kt = !1);
  const Sr = M.useRef(), Gs = (Q) => {
    const Pt = xt.props;
    Pt.onMouseMove && Pt.onMouseMove(Q), on = {
      x: Q.clientX,
      y: Q.clientY
    }, Sr.current && Sr.current.update();
  }, Je = {}, Tr = typeof dt == "string";
  k ? (Je.title = !Kt && Tr && !D ? dt : null, Je["aria-describedby"] = Kt ? kr : null) : (Je["aria-label"] = Tr ? dt : null, Je["aria-labelledby"] = Kt && !Tr ? kr : null);
  const Dt = P({}, Je, j, xt.props, {
    className: be(j.className, xt.props.className),
    onTouchStart: Yo,
    ref: Us
  }, rt ? {
    onMouseMove: Gs
  } : {});
  process.env.NODE_ENV !== "production" && (Dt["data-mui-internal-clone-element"] = !0, M.useEffect(() => {
    St && !St.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [St]));
  const Ze = {};
  q || (Dt.onTouchStart = Ls, Dt.onTouchEnd = Fs), D || (Dt.onMouseOver = Fn(Wo, Dt.onMouseOver), Dt.onMouseLeave = Fn(qo, Dt.onMouseLeave), Se || (Ze.onMouseOver = Wo, Ze.onMouseLeave = qo)), B || (Dt.onFocus = Fn(Xo, Dt.onFocus), Dt.onBlur = Fn(Ho, Dt.onBlur), Se || (Ze.onFocus = Xo, Ze.onBlur = Ho)), process.env.NODE_ENV !== "production" && xt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xt.props.title}\` or the Tooltip component.`].join(`
`));
  const Hs = M.useMemo(() => {
    var Q;
    let Pt = [{
      name: "arrow",
      enabled: !!Ut,
      options: {
        element: Ut,
        padding: 4
      }
    }];
    return (Q = G.popperOptions) != null && Q.modifiers && (Pt = Pt.concat(G.popperOptions.modifiers)), P({}, G.popperOptions, {
      modifiers: Pt
    });
  }, [Ut, G]), Qe = P({}, I, {
    isRtl: ce,
    arrow: z,
    disableInteractive: Se,
    placement: X,
    PopperComponentProp: Y,
    touch: de.current
  }), Cr = vm(Qe), Ko = (r = (o = Z.popper) != null ? o : O.Popper) != null ? r : ym, Jo = (a = (i = (l = Z.transition) != null ? l : O.Transition) != null ? i : A) != null ? a : Wa, Zo = (c = (p = Z.tooltip) != null ? p : O.Tooltip) != null ? c : xm, Qo = (d = (m = Z.arrow) != null ? m : O.Arrow) != null ? d : Nm, Xs = ln(Ko, P({}, G, (w = K.popper) != null ? w : $.popper, {
    className: be(Cr.popper, G == null ? void 0 : G.className, (g = (v = K.popper) != null ? v : $.popper) == null ? void 0 : g.className)
  }), Qe), Ys = ln(Jo, P({}, Nt, (f = K.transition) != null ? f : $.transition), Qe), Ws = ln(Zo, P({}, (h = K.tooltip) != null ? h : $.tooltip, {
    className: be(Cr.tooltip, (E = (_ = K.tooltip) != null ? _ : $.tooltip) == null ? void 0 : E.className)
  }), Qe), qs = ln(Qo, P({}, (C = K.arrow) != null ? C : $.arrow, {
    className: be(Cr.arrow, (S = (b = K.arrow) != null ? b : $.arrow) == null ? void 0 : S.className)
  }), Qe);
  return /* @__PURE__ */ N(M.Fragment, {
    children: [/* @__PURE__ */ M.cloneElement(xt, Dt), /* @__PURE__ */ s(Ko, P({
      as: Y ?? Is,
      placement: X,
      anchorEl: rt ? {
        getBoundingClientRect: () => ({
          top: on.y,
          left: on.x,
          right: on.x,
          bottom: on.y,
          width: 0,
          height: 0
        })
      } : St,
      popperRef: Sr,
      open: St ? Kt : !1,
      id: kr,
      transition: !0
    }, Ze, Xs, {
      popperOptions: Hs,
      children: ({
        TransitionProps: Q
      }) => /* @__PURE__ */ s(Jo, P({
        timeout: Ft.transitions.duration.shorter
      }, Q, Ys, {
        children: /* @__PURE__ */ N(Zo, P({}, Ws, {
          children: [dt, z ? /* @__PURE__ */ s(Qo, P({}, qs, {
            ref: Ee
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (As.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * If `true`, adds an arrow to the tooltip.
   * @default false
   */
  arrow: u.bool,
  /**
   * Tooltip reference element.
   */
  children: Qi.isRequired,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: u.object,
  /**
   * @ignore
   */
  className: u.string,
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `slots` prop.
   * It's recommended to use the `slots` prop instead.
   *
   * @default {}
   */
  components: u.shape({
    Arrow: u.elementType,
    Popper: u.elementType,
    Tooltip: u.elementType,
    Transition: u.elementType
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
  componentsProps: u.shape({
    arrow: u.object,
    popper: u.object,
    tooltip: u.object,
    transition: u.object
  }),
  /**
   * Set to `true` if the `title` acts as an accessible description.
   * By default the `title` acts as an accessible label for the child.
   * @default false
   */
  describeChild: u.bool,
  /**
   * Do not respond to focus-visible events.
   * @default false
   */
  disableFocusListener: u.bool,
  /**
   * Do not respond to hover events.
   * @default false
   */
  disableHoverListener: u.bool,
  /**
   * Makes a tooltip not interactive, i.e. it will close when the user
   * hovers over the tooltip before the `leaveDelay` is expired.
   * @default false
   */
  disableInteractive: u.bool,
  /**
   * Do not respond to long press touch events.
   * @default false
   */
  disableTouchListener: u.bool,
  /**
   * The number of milliseconds to wait before showing the tooltip.
   * This prop won't impact the enter touch delay (`enterTouchDelay`).
   * @default 100
   */
  enterDelay: u.number,
  /**
   * The number of milliseconds to wait before showing the tooltip when one was already recently opened.
   * @default 0
   */
  enterNextDelay: u.number,
  /**
   * The number of milliseconds a user must touch the element before showing the tooltip.
   * @default 700
   */
  enterTouchDelay: u.number,
  /**
   * If `true`, the tooltip follow the cursor over the wrapped element.
   * @default false
   */
  followCursor: u.bool,
  /**
   * This prop is used to help implement the accessibility logic.
   * If you don't provide this prop. It falls back to a randomly generated id.
   */
  id: u.string,
  /**
   * The number of milliseconds to wait before hiding the tooltip.
   * This prop won't impact the leave touch delay (`leaveTouchDelay`).
   * @default 0
   */
  leaveDelay: u.number,
  /**
   * The number of milliseconds after the user stops touching an element before hiding the tooltip.
   * @default 1500
   */
  leaveTouchDelay: u.number,
  /**
   * Callback fired when the component requests to be closed.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onClose: u.func,
  /**
   * Callback fired when the component requests to be open.
   *
   * @param {React.SyntheticEvent} event The event source of the callback.
   */
  onOpen: u.func,
  /**
   * If `true`, the component is shown.
   */
  open: u.bool,
  /**
   * Tooltip placement.
   * @default 'bottom'
   */
  placement: u.oneOf(["bottom-end", "bottom-start", "bottom", "left-end", "left-start", "left", "right-end", "right-start", "right", "top-end", "top-start", "top"]),
  /**
   * The component used for the popper.
   * @default Popper
   */
  PopperComponent: u.elementType,
  /**
   * Props applied to the [`Popper`](/material-ui/api/popper/) element.
   * @default {}
   */
  PopperProps: u.object,
  /**
   * The extra props for the slot components.
   * You can override the existing props or add new ones.
   *
   * This prop is an alias for the `componentsProps` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slotProps: u.shape({
    arrow: u.object,
    popper: u.object,
    tooltip: u.object,
    transition: u.object
  }),
  /**
   * The components used for each slot inside.
   *
   * This prop is an alias for the `components` prop, which will be deprecated in the future.
   *
   * @default {}
   */
  slots: u.shape({
    arrow: u.elementType,
    popper: u.elementType,
    tooltip: u.elementType,
    transition: u.elementType
  }),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: u.oneOfType([u.arrayOf(u.oneOfType([u.func, u.object, u.bool])), u.func, u.object]),
  /**
   * Tooltip title. Zero-length titles string, undefined, null and false are never displayed.
   */
  title: u.node,
  /**
   * The component used for the transition.
   * [Follow this guide](/material-ui/transitions/#transitioncomponent-prop) to learn more about the requirements for this component.
   * @default Grow
   */
  TransitionComponent: u.elementType,
  /**
   * Props applied to the transition element.
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: u.object
});
const km = As;
function Ka(t, e, n) {
  return t ? /* @__PURE__ */ s(ii, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ s("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function Ms(t) {
  const {
    onClick: e,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: p = !1,
    isDense: d = !0,
    isSubMenuParent: m = !1,
    hasDisabledGutters: w = !1,
    hasDivider: g = !1,
    focusVisibleClassName: v,
    id: f,
    children: h
  } = t, E = /* @__PURE__ */ s(
    Bl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: p,
      dense: d,
      disableGutters: w,
      divider: g,
      focusVisibleClassName: v,
      onClick: e,
      id: f,
      children: n ? /* @__PURE__ */ N(ie, { children: [
        Ka(a, n, !0),
        /* @__PURE__ */ s(jl, { primary: n, inset: !a && o }),
        m ? /* @__PURE__ */ s(ii, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ s(hs, {}) }) : Ka(i, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ s(km, { title: r, placement: "right", children: /* @__PURE__ */ s("div", { children: E }) }) : E;
}
function Ds(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Em(t) {
  const [e, n] = ut(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, i = (p) => {
    n(p.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let p = Ds(a).filter((d) => "menuItem" in d.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return p = p.filter(
      (d) => "menuItem" in d.group && d.group.menuItem === r.id
    ), /* @__PURE__ */ s(Bs, { ...t, includedGroups: p });
  };
  return /* @__PURE__ */ N(ie, { children: [
    /* @__PURE__ */ s(Ms, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ s(
      Vl,
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
const Sm = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Bs(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: i } = It(() => {
    const d = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ds(e).filter((v) => !("menuItem" in v.group))
    ), m = Object.values(d).sort(
      (v, f) => (v.group.order || 0) - (f.group.order || 0)
    ), w = [];
    m.forEach((v) => {
      Sm(v.id, e.items).forEach(
        (f) => w.push({ item: f, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const g = w.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: g };
  }, [o, e]), l = ({ item: d, isLastItemInGroup: m }) => ({
    className: "papi-menu-item",
    label: d.label,
    tooltip: d.tooltip,
    iconPathBefore: "iconPathBefore" in d ? d.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in d ? d.iconPathAfter : void 0,
    hasDivider: m,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ s("div", {});
  const p = c.item.group;
  return /* @__PURE__ */ s("div", { role: "menu", "aria-label": p, children: a.map((d, m) => {
    const { item: w } = d, g = l(d);
    if ("command" in w) {
      const v = w.group + m;
      return /* @__PURE__ */ s(
        Ms,
        {
          onClick: (f) => {
            n == null || n(f), r(w);
          },
          ...g
        },
        v
      );
    }
    return /* @__PURE__ */ s(
      Em,
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      p + w.id
    );
  }) }, p);
}
function Tm(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ s(Bs, { ...t, includedGroups: a });
}
function Cm({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ N(
    si,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ s("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ s(zl, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ s(
          Tm,
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
function Om({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = It(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, p = o[c];
      typeof p == "object" && typeof p.order == "number" && !Number.isNaN(p.order) ? i.set(p.order, { id: c, metadata: p }) : console.warn(
        `Property ${l} (${typeof p}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ s(
    si,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, l) => /* @__PURE__ */ s(
        Cm,
        {
          commandHandler: t,
          menuDefinition: n,
          ...i,
          className: e
        },
        l
      ))
    }
  );
}
function Rm(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const lo = (t, e, n = {}) => {
  const r = ge(e);
  r.current = e;
  const o = ge(n);
  o.current = Rm(o.current);
  const [a, i] = ut(() => r.current), [l, c] = ut(!0);
  return ae(() => {
    let p = !0;
    return c(!!t), (async () => {
      if (t) {
        const d = await t();
        p && (i(() => d), c(!1));
      }
    })(), () => {
      p = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [t]), [a, l];
}, _m = ms(/* @__PURE__ */ s("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Pm({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, p] = ut(!1), [d, m] = ut(!1), w = Et(() => {
    c && p(!1), m(!1);
  }, [c]), g = Et((S) => {
    S.stopPropagation(), p((b) => {
      const I = !b;
      return I && S.shiftKey ? m(!0) : I || m(!1), I;
    });
  }, []), v = Et(
    (S) => (w(), r(S)),
    [r, w]
  ), [f, h] = ut({ top: 1, left: 1 });
  ae(() => {
    if (c) {
      const S = o == null ? void 0 : o.current;
      if (S) {
        const b = S.getBoundingClientRect(), I = window.scrollY, z = window.scrollX, H = b.top + I + S.clientHeight, O = b.left + z;
        h({ top: H, left: O });
      }
    }
  }, [c, o]);
  const [E] = lo(
    Et(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [_] = lo(
    Et(async () => (t == null ? void 0 : t(!0)) ?? n ?? E, [t, n, E, c]),
    n ?? E
  ), C = d && _ ? _ : E;
  return /* @__PURE__ */ N(ie, { children: [
    /* @__PURE__ */ s(
      li,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: g,
        children: l ?? /* @__PURE__ */ s(_m, {})
      }
    ),
    /* @__PURE__ */ s(
      Ll,
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
        children: C ? /* @__PURE__ */ s(
          Om,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: C
          }
        ) : void 0
      }
    )
  ] });
}
function Ih({
  id: t,
  label: e,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: p
}) {
  return /* @__PURE__ */ s(
    li,
    {
      id: t,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": e,
      title: o ? void 0 : r ?? e,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: p
    }
  );
}
const $n = Qn(({ className: t, ...e }, n) => /* @__PURE__ */ s(gl, { size: 35, className: x("tw-animate-spin", t), ...e, ref: n }));
$n.displayName = "Spinner";
function Ah({
  id: t,
  isDisabled: e = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: p,
  value: d,
  onChange: m,
  onFocus: w,
  onBlur: g
}) {
  return /* @__PURE__ */ N("div", { className: x("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ s(
      Xt,
      {
        htmlFor: t,
        className: x({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ s(
      Ye,
      {
        id: t,
        disabled: e,
        placeholder: i,
        required: l,
        className: x(c, { "tw-border-red-600": n }),
        defaultValue: p,
        value: d,
        onChange: m,
        onFocus: w,
        onBlur: g
      }
    ),
    /* @__PURE__ */ s("p", { className: x({ "tw-hidden": !o }), children: o })
  ] });
}
function Mh({
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
  children: o
}) {
  const a = ge(void 0);
  return /* @__PURE__ */ s("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ s(Fl, { position: "static", id: r, children: /* @__PURE__ */ N(
    Ul,
    {
      className: x("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        t ? /* @__PURE__ */ s(
          Pm,
          {
            commandHandler: e,
            containerRef: a,
            menuProvider: t
          }
        ) : void 0,
        o ? /* @__PURE__ */ s("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const $m = Xe(
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
), Im = T.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ s("div", { ref: r, role: "alert", className: x($m({ variant: e }), t), ...n }));
Im.displayName = "Alert";
const Am = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ N(
    "h5",
    {
      ref: n,
      className: x("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", t),
      ...e,
      children: [
        e.children,
        " "
      ]
    }
  )
);
Am.displayName = "AlertTitle";
const Mm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("div", { ref: n, className: x("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Mm.displayName = "AlertDescription";
const Dm = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: x(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        t
      ),
      ...e
    }
  )
);
Dm.displayName = "Card";
const Bm = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: x("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Bm.displayName = "CardHeader";
const jm = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "h3",
    {
      ref: n,
      className: x(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        t
      ),
      ...e,
      children: e.children
    }
  )
);
jm.displayName = "CardTitle";
const Vm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s("p", { ref: n, className: x("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Vm.displayName = "CardDescription";
const zm = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s("div", { ref: n, className: x("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
zm.displayName = "CardContent";
const Lm = T.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: x("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Lm.displayName = "CardFooter";
function Dh({ ...t }) {
  return /* @__PURE__ */ s(
    Hl,
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
const Fm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ N(
  an.Root,
  {
    ref: n,
    className: x(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      t
    ),
    ...e,
    children: [
      /* @__PURE__ */ s(an.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ s(an.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ s(an.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
Fm.displayName = an.Root.displayName;
const Um = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  Yr.Root,
  {
    className: x(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      t
    ),
    ...e,
    ref: n,
    children: /* @__PURE__ */ s(
      Yr.Thumb,
      {
        className: x(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
        )
      }
    )
  }
));
Um.displayName = Yr.Root.displayName;
const Bh = _t.Root, Gm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.List,
  {
    ref: n,
    className: x(
      "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Gm.displayName = _t.List.displayName;
const Hm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Trigger,
  {
    ref: n,
    className: x(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
Hm.displayName = _t.Trigger.displayName;
const Xm = T.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ s(
  _t.Content,
  {
    ref: n,
    className: x(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Xm.displayName = _t.Content.displayName;
function jh({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ s(
    gt,
    {
      className: x(
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
      children: t ? /* @__PURE__ */ s($n, { size: 15 }) : /* @__PURE__ */ N(ie, { children: [
        /* @__PURE__ */ s(bl, { size: 25, className: x("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function Vh({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    gt,
    {
      className: x(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ N(ie, { children: [
        /* @__PURE__ */ s($n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function zh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    gt,
    {
      className: x(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ N(ie, { children: [
        /* @__PURE__ */ s($n, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Lh({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    gt,
    {
      className: x(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": t
        },
        n
      ),
      onClick: e,
      ...r,
      children: t ? /* @__PURE__ */ N(ie, { children: [
        /* @__PURE__ */ s($n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Fh({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = It(
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
  return /* @__PURE__ */ s("div", { id: t, className: x("pr-twp tw-prose", n), children: /* @__PURE__ */ s(Xl, { options: o, children: e }) });
}
const Ym = Qn((t, e) => /* @__PURE__ */ N(
  gt,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ s(vl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ s(
        er,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var Wm = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Wm || {});
function Uh({ id: t, groups: e }) {
  return /* @__PURE__ */ s("div", { id: t, children: /* @__PURE__ */ N(fo, { children: [
    /* @__PURE__ */ s(mi, { asChild: !0, children: /* @__PURE__ */ s(Ym, {}) }),
    /* @__PURE__ */ s(rr, { children: e.map((n) => /* @__PURE__ */ N("div", { children: [
      /* @__PURE__ */ s(Sn, { children: n.label }),
      /* @__PURE__ */ s(sc, { children: n.items.map((r) => /* @__PURE__ */ s("div", { children: r.itemType === 0 ? /* @__PURE__ */ s(mo, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ s(gi, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ s(or, {})
    ] }, n.label)) })
  ] }) });
}
function Gh({ id: t, message: e }) {
  return /* @__PURE__ */ s("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ s("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function Hh({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new Ol("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ N(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ s("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ N("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ s(yl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ s("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ N("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ s(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ N(
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
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ N("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ N(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ s(xl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ N(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ s(Nl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function qm({ id: t, versionHistory: e }) {
  const [n, r] = ut(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), p = new Date(o.getTime() - c.getTime()), d = p.getUTCFullYear() - 1970, m = p.getUTCMonth(), w = p.getUTCDate() - 1;
    let g = "";
    return d > 0 ? g = `${d.toString()} year${d === 1 ? "" : "s"} ago` : m > 0 ? g = `${m.toString()} month${m === 1 ? "" : "s"} ago` : w === 0 ? g = "today" : g = `${w.toString()} day${w === 1 ? "" : "s"} ago`, g;
  }
  const i = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ N("div", { id: t, children: [
    /* @__PURE__ */ s("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ s("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ N("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ s("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ s("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ s("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ N("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ N("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ s("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ s(
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
function Xh({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = It(() => Rl(n), [n]), l = ((c) => {
    const p = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((d) => p.of(d));
  })(r);
  return /* @__PURE__ */ s("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ N("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ s(qm, { versionHistory: o }),
    /* @__PURE__ */ s("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ N("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ s("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ N("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ N("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ s("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ N("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Yh = (t, e) => {
  ae(() => {
    if (!t)
      return () => {
      };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, Gr = () => !1, Wh = (t, e) => {
  const [n] = lo(
    Et(async () => {
      if (!t)
        return Gr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    Gr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  ae(() => () => {
    n !== Gr && n();
  }, [n]);
};
function Km(t, e = "top") {
  if (!t || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Km(`*, ::before, ::after {
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
.tw-inset-x-0 {
  left: 0px;
  right: 0px;
}
.tw-inset-y-0 {
  top: 0px;
  bottom: 0px;
}
.tw-bottom-0 {
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
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-5 {
  min-width: 1.25rem;
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
.tw-border-r {
  border-right-width: 1px;
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
.tw-border-sidebar-border {
  border-color: hsl(var(--sidebar-border));
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
.tw-bg-sidebar {
  background-color: hsl(var(--sidebar-background));
}
.tw-bg-sidebar-border {
  background-color: hsl(var(--sidebar-border));
}
.tw-bg-slate-100 {
  --tw-bg-opacity: 1;
  background-color: rgb(241 245 249 / var(--tw-bg-opacity));
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
.tw-text-gray-400 {
  --tw-text-opacity: 1;
  color: rgb(156 163 175 / var(--tw-text-opacity));
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
.tw-text-gray-900 {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
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
.tw-text-sidebar-foreground {
  color: hsl(var(--sidebar-foreground));
}
.tw-text-sidebar-foreground\\/70 {
  color: hsl(var(--sidebar-foreground) / 0.7);
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
.tw-ease-in-out {
  animation-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
}
.tw-ease-linear {
  animation-timing-function: linear;
}

/* #region shared with https://github.com/paranext/paranext-extension-template/blob/main/tailwind.css */

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

.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
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

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-sidebar-accent-foreground:hover {
  color: hsl(var(--sidebar-accent-foreground));
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
  --tw-ring-color: hsl(240 5% 64.9% / var(--tw-ring-opacity));
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
  background-color: rgb(255 255 255 / var(--tw-bg-opacity));
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

.data-\\[state\\=open\\]\\:tw-bg-secondary[data-state="open"] {
  background-color: hsl(var(--secondary));
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

.data-\\[state\\=closed\\]\\:tw-duration-300[data-state="closed"] {
  transition-duration: 300ms;
}

.data-\\[state\\=open\\]\\:tw-duration-500[data-state="open"] {
  transition-duration: 500ms;
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

.data-\\[state\\=closed\\]\\:tw-slide-out-to-bottom[data-state="closed"] {
  --tw-exit-translate-y: 100%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left[data-state="closed"] {
  --tw-exit-translate-x: -100%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-right[data-state="closed"] {
  --tw-exit-translate-x: 100%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top[data-state="closed"] {
  --tw-exit-translate-y: -100%;
}

.data-\\[state\\=closed\\]\\:tw-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-bottom[data-state="open"] {
  --tw-enter-translate-y: 100%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left[data-state="open"] {
  --tw-enter-translate-x: -100%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-right[data-state="open"] {
  --tw-enter-translate-x: 100%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top[data-state="open"] {
  --tw-enter-translate-y: -100%;
}

.data-\\[state\\=open\\]\\:tw-slide-in-from-top-\\[48\\%\\][data-state="open"] {
  --tw-enter-translate-y: -48%;
}

.data-\\[state\\=closed\\]\\:tw-duration-300[data-state="closed"] {
  animation-duration: 300ms;
}

.data-\\[state\\=open\\]\\:tw-duration-500[data-state="open"] {
  animation-duration: 500ms;
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

  .sm\\:tw-max-w-sm {
    max-width: 24rem;
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

.\\[\\&\\>button\\]\\:tw-hidden>button {
  display: none;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
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
  Im as Alert,
  Mm as AlertDescription,
  Am as AlertTitle,
  bh as BOOK_SELECTOR_STRING_KEYS,
  gh as BookChapterControl,
  Ic as BookSelectionMode,
  vh as BookSelector,
  gt as Button,
  Dm as Card,
  zm as CardContent,
  Vm as CardDescription,
  Lm as CardFooter,
  Bm as CardHeader,
  jm as CardTitle,
  $c as ChapterRangeSelector,
  ho as Checkbox,
  $h as Checklist,
  qr as ComboBox,
  Lc as DataTable,
  zh as DisableButton,
  fo as DropdownMenu,
  mo as DropdownMenuCheckboxItem,
  rr as DropdownMenuContent,
  sc as DropdownMenuGroup,
  hi as DropdownMenuItem,
  Wm as DropdownMenuItemType,
  Sn as DropdownMenuLabel,
  fh as DropdownMenuPortal,
  hh as DropdownMenuRadioGroup,
  gi as DropdownMenuRadioItem,
  or as DropdownMenuSeparator,
  dc as DropdownMenuShortcut,
  mh as DropdownMenuSub,
  cc as DropdownMenuSubContent,
  lc as DropdownMenuSubTrigger,
  mi as DropdownMenuTrigger,
  Vh as EnableButton,
  Ym as FilterButton,
  Uh as FilterDropdown,
  Xh as Footer,
  Om as GridMenu,
  Pm as HamburgerMenuButton,
  kh as INVENTORY_STRING_KEYS,
  Ih as IconButton,
  Ye as Input,
  jh as InstallButton,
  Eh as Inventory,
  Xt as Label,
  Fh as MarkdownRenderer,
  Ms as MenuItem,
  Hh as MoreInfo,
  Sh as NavigationContentSearch,
  Gh as NoExtensionsFound,
  bi as RadioGroup,
  Wr as RadioGroupItem,
  Ch as ScriptureResultsViewer,
  Oh as ScrollGroupSelector,
  Pi as SearchBar,
  gn as Select,
  Be as SelectContent,
  Mc as SelectGroup,
  Gt as SelectItem,
  Dc as SelectLabel,
  Ci as SelectScrollDownButton,
  Ti as SelectScrollUpButton,
  Bc as SelectSeparator,
  De as SelectTrigger,
  bn as SelectValue,
  go as Separator,
  Rh as SettingsList,
  Ph as SettingsListHeader,
  _h as SettingsListItem,
  Td as SettingsSidebar,
  Th as SettingsSidebarContentSearch,
  Fm as Slider,
  Dh as Sonner,
  $n as Spinner,
  Um as Switch,
  ar as Table,
  sr as TableBody,
  zc as TableCaption,
  je as TableCell,
  Vc as TableFooter,
  vn as TableHead,
  ir as TableHeader,
  oe as TableRow,
  Bh as Tabs,
  Xm as TabsContent,
  Gm as TabsList,
  Hm as TabsTrigger,
  Ah as TextField,
  _i as ToggleGroup,
  Un as ToggleGroupItem,
  Mh as Toolbar,
  Lh as UpdateButton,
  qm as VersionHistory,
  $i as VerticalTabs,
  Ai as VerticalTabsContent,
  Ii as VerticalTabsList,
  Kc as VerticalTabsTrigger,
  xc as buttonVariants,
  x as cn,
  Gc as getBookNumFromId,
  Uc as getLinesFromUSFM,
  oa as getNumberFromUSFM,
  Hc as getStatusForItem,
  xh as inventoryCountColumn,
  yh as inventoryItemColumn,
  Nh as inventoryStatusColumn,
  Jh as sonner,
  Yh as useEvent,
  Wh as useEventAsync,
  lo as usePromise
};
//# sourceMappingURL=index.js.map
