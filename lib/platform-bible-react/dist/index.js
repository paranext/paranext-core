import gp, { jsx as p, jsxs as T, Fragment as cr } from "react/jsx-runtime";
import * as M from "react";
import D, { forwardRef as nn, useCallback as Se, useState as fe, useRef as Nr, useEffect as We, useLayoutEffect as oa, useMemo as lr } from "react";
import { History as vp, ChevronRight as li, Check as on, Circle as ci, ArrowDownWideNarrow as bp, Clock as wp, Bookmark as yp, X as xp, Search as Np, ChevronsUpDown as kp, FilterIcon as Ep, ChevronDown as an, ChevronUp as Tp, ArrowLeftIcon as Sp, ChevronLeftIcon as Cp, ChevronRightIcon as Op, ArrowRightIcon as Rp, ArrowUpIcon as Pp, ArrowDownIcon as _p, ArrowUpDownIcon as $p, CircleCheckIcon as Ip, CircleXIcon as Ap, CircleHelpIcon as Mp, ChevronLeft as Dp, LoaderCircle as Bp, Download as jp, Filter as Vp, User as Lp, Link as Fp, CircleHelp as zp } from "lucide-react";
import kr, { clsx as Gp } from "clsx";
import { extendTailwindMerge as Up } from "tailwind-merge";
import * as me from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Hp } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Xp, formatScrRef as $n, compareScrRefs as Jn, scrRefToBBBCCCVVV as In, getLocalizeKeyForScrollGroupId as ue, NumberFormat as Wp, formatBytes as Yp } from "platform-bible-utils";
import { Slot as qp } from "@radix-ui/react-slot";
import { cva as sn } from "class-variance-authority";
import * as di from "@radix-ui/react-label";
import * as bt from "@radix-ui/react-radio-group";
import * as wt from "@radix-ui/react-popover";
import { Command as Re } from "cmdk";
import * as Ye from "@radix-ui/react-dialog";
import { useReactTable as ui, getCoreRowModel as fi, getPaginationRowModel as Kp, getSortedRowModel as mi, getFilteredRowModel as Jp, flexRender as ft, getExpandedRowModel as Zp, getGroupedRowModel as Qp } from "@tanstack/react-table";
import * as be from "@radix-ui/react-select";
import * as pn from "@radix-ui/react-toggle-group";
import * as hi from "@radix-ui/react-toggle";
import * as Pe from "@radix-ui/react-tabs";
import * as gi from "@radix-ui/react-separator";
import * as Zn from "@radix-ui/react-checkbox";
import el, { ThemeContext as rl, internal_processStyles as tl } from "@mui/styled-engine";
import { MenuItem as nl, ListItemText as ol, ListItemIcon as vi, Menu as al, Grid as bi, List as il, IconButton as wi, Drawer as sl, AppBar as pl, Toolbar as ll } from "@mui/material";
import * as cl from "react-dom";
import Lt from "react-dom";
import { Toaster as dl } from "sonner";
import { toast as Fv } from "sonner";
import * as lt from "@radix-ui/react-slider";
import * as Qn from "@radix-ui/react-switch";
const ul = Up({ prefix: "pr-" });
function R(...e) {
  return ul(Gp(e));
}
const Ct = D.forwardRef(
  ({ className: e, type: r, ...t }, n) => /* @__PURE__ */ p(
    "input",
    {
      type: r,
      className: R(
        "pr-twp pr-flex pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...t
    }
  )
);
Ct.displayName = "Input";
const fl = nn(
  ({ handleSearch: e, handleKeyDown: r, handleOnClick: t, handleSubmit: n, ...o }, a) => /* @__PURE__ */ T("div", { className: "pr-relative", children: [
    /* @__PURE__ */ p(
      Ct,
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
    /* @__PURE__ */ p(
      vp,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var ml = Object.defineProperty, hl = (e, r, t) => r in e ? ml(e, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : e[r] = t, te = (e, r, t) => hl(e, typeof r != "symbol" ? r + "" : r, t);
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
], mo = [
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
], aa = Tl();
function Jr(e, r = !0) {
  return r && (e = e.toUpperCase()), e in aa ? aa[e] : 0;
}
function ho(e) {
  return Jr(e) > 0;
}
function gl(e) {
  const r = typeof e == "string" ? Jr(e) : e;
  return r >= 40 && r <= 66;
}
function vl(e) {
  return (typeof e == "string" ? Jr(e) : e) <= 39;
}
function xi(e) {
  return e <= 66;
}
function bl(e) {
  const r = typeof e == "string" ? Jr(e) : e;
  return Ei(r) && !xi(r);
}
function* wl() {
  for (let e = 1; e <= Tr.length; e++)
    yield e;
}
const yl = 1, Ni = Tr.length;
function xl() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function go(e, r = "***") {
  const t = e - 1;
  return t < 0 || t >= Tr.length ? r : Tr[t];
}
function ki(e) {
  return e <= 0 || e > Ni ? "******" : yi[e - 1];
}
function Nl(e) {
  return ki(Jr(e));
}
function Ei(e) {
  const r = typeof e == "number" ? go(e) : e;
  return ho(r) && !mo.includes(r);
}
function kl(e) {
  const r = typeof e == "number" ? go(e) : e;
  return ho(r) && mo.includes(r);
}
function El(e) {
  return yi[e - 1].includes("*obsolete*");
}
function Tl() {
  const e = {};
  for (let r = 0; r < Tr.length; r++)
    e[Tr[r]] = r + 1;
  return e;
}
const ce = {
  allBookIds: Tr,
  nonCanonicalIds: mo,
  bookIdToNumber: Jr,
  isBookIdValid: ho,
  isBookNT: gl,
  isBookOT: vl,
  isBookOTNT: xi,
  isBookDC: bl,
  allBookNumbers: wl,
  firstBook: yl,
  lastBook: Ni,
  extraBooks: xl,
  bookNumberToId: go,
  bookNumberToEnglishName: ki,
  bookIdToEnglishName: Nl,
  isCanonical: Ei,
  isExtraMaterial: kl,
  isObsolete: El
};
var Ue = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ue || {});
const $e = class {
  // private versInfo: Versification;
  constructor(r) {
    if (te(this, "name"), te(this, "fullPath"), te(this, "isPresent"), te(this, "hasVerseSegments"), te(this, "isCustomized"), te(this, "baseVersification"), te(this, "scriptureBooks"), te(this, "_type"), r == null)
      throw new Error("Argument undefined");
    typeof r == "string" ? (this.name = r, this._type = Ue[r]) : (this._type = r, this.name = Ue[r]);
  }
  get type() {
    return this._type;
  }
  equals(r) {
    return !r.type || !this.type ? !1 : r.type === this.type;
  }
};
te($e, "Original", new $e(Ue.Original)), te($e, "Septuagint", new $e(Ue.Septuagint)), te($e, "Vulgate", new $e(Ue.Vulgate)), te($e, "English", new $e(Ue.English)), te($e, "RussianProtestant", new $e(Ue.RussianProtestant)), te($e, "RussianOrthodox", new $e(Ue.RussianOrthodox));
let gr = $e;
function ia(e, r) {
  const t = r[0];
  for (let n = 1; n < r.length; n++)
    e = e.split(r[n]).join(t);
  return e.split(t);
}
var Ti = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ti || {});
const Te = class oe {
  constructor(r, t, n, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), n == null && o == null)
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
      if (n instanceof nt)
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
    let l;
    return i && (l = new gr(i)), t ? new oe(t, n.toString(), s, l) : new oe();
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
      throw new nt(
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
          this.versification = new gr(Ue[i]);
        } catch {
          throw new nt("Invalid reference : " + r);
        }
    }
    const t = r.trim().split(" ");
    if (t.length !== 2)
      throw new nt("Invalid reference : " + r);
    const n = t[1].split(":"), o = +n[0];
    if (n.length !== 2 || ce.bookIdToNumber(t[0]) === 0 || !Number.isInteger(o) || o < 0 || !oe.isVerseParseable(n[1]))
      throw new nt("Invalid reference : " + r);
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
    const o = [], a = ia(this._verse, n);
    for (const i of a.map((s) => ia(s, t))) {
      const s = this.clone();
      s.verse = i[0];
      const l = s.verseNum;
      if (o.push(s), i.length > 1) {
        const u = this.clone();
        if (u.verse = i[1], !r)
          for (let f = l + 1; f < u.verseNum; f++) {
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
te(Te, "defaultVersification", gr.English), te(Te, "verseRangeSeparator", "-"), te(Te, "verseSequenceIndicator", ","), te(Te, "verseRangeSeparators", [Te.verseRangeSeparator]), te(Te, "verseSequenceIndicators", [Te.verseSequenceIndicator]), te(Te, "chapterDigitShifter", 1e3), te(Te, "bookDigitShifter", Te.chapterDigitShifter * Te.chapterDigitShifter), te(Te, "bcvMaxValue", Te.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Te, "ValidStatusType", Ti);
let nt = class extends Error {
};
const vo = me.Root, Si = me.Trigger, Sl = me.Group, av = me.Portal, iv = me.Sub, sv = me.RadioGroup, Cl = D.forwardRef(({ className: e, inset: r, children: t, ...n }, o) => /* @__PURE__ */ T(
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
      /* @__PURE__ */ p(li, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Cl.displayName = me.SubTrigger.displayName;
const Ol = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Ol.displayName = me.SubContent.displayName;
const ln = D.forwardRef(({ className: e, sideOffset: r = 4, ...t }, n) => /* @__PURE__ */ p(me.Portal, { children: /* @__PURE__ */ p(
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
const Ci = D.forwardRef(({ className: e, inset: r, ...t }, n) => /* @__PURE__ */ p(
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
Ci.displayName = me.Item.displayName;
const bo = D.forwardRef(({ className: e, children: r, checked: t, ...n }, o) => /* @__PURE__ */ T(
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
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(me.ItemIndicator, { children: /* @__PURE__ */ p(on, { className: "pr-h-4 pr-w-4" }) }) }),
      r
    ]
  }
));
bo.displayName = me.CheckboxItem.displayName;
const Oi = D.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ T(
  me.RadioItem,
  {
    ref: n,
    className: R(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(me.ItemIndicator, { children: /* @__PURE__ */ p(ci, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      r
    ]
  }
));
Oi.displayName = me.RadioItem.displayName;
const Ot = D.forwardRef(({ className: e, inset: r, ...t }, n) => /* @__PURE__ */ p(
  me.Label,
  {
    ref: n,
    className: R("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", r && "pr-pl-8", e),
    ...t
  }
));
Ot.displayName = me.Label.displayName;
const cn = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  me.Separator,
  {
    ref: t,
    className: R("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...r
  }
));
cn.displayName = me.Separator.displayName;
function Rl({ className: e, ...r }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: R("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...r
    }
  );
}
Rl.displayName = "DropdownMenuShortcut";
const Pl = nn(
  ({
    bookId: e,
    handleSelectBook: r,
    isSelected: t,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, s) => /* @__PURE__ */ T(
    Ci,
    {
      ref: s,
      textValue: e,
      className: R("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": t
      }),
      onSelect: (l) => {
        l.preventDefault(), r();
      },
      onKeyDown: (l) => {
        o(l);
      },
      onFocus: n,
      onMouseMove: n,
      children: [
        /* @__PURE__ */ p(
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
        t && /* @__PURE__ */ p("div", { children: i })
      ]
    },
    e
  )
);
function _l({
  handleSelectChapter: e,
  endChapter: r,
  activeChapter: t,
  highlightedChapter: n,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: r }, (s, l) => l + 1), i = Se(
    (s) => {
      o(s);
    },
    [o]
  );
  return /* @__PURE__ */ p("div", { className: R("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((s) => /* @__PURE__ */ p(
    "div",
    {
      className: R(
        "pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": s === t,
          "pr-bg-amber-200": s === n
        }
      ),
      onClick: (l) => {
        l.preventDefault(), l.stopPropagation(), e(s);
      },
      role: "button",
      onKeyDown: (l) => {
        l.key === "Enter" && e(s);
      },
      tabIndex: 0,
      onMouseMove: () => i(s),
      children: s
    },
    s
  )) });
}
function $l({ handleSort: e, handleLocationHistory: r, handleBookmarks: t }) {
  return /* @__PURE__ */ T(Ot, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ p("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ p(
        bp,
        {
          onClick: e,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ p(
        wp,
        {
          onClick: r,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ p(
        yp,
        {
          onClick: t,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      )
    ] })
  ] });
}
const mt = ce.allBookIds, Il = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, sa = ["OT", "NT", "DC"], Al = 32 + 32 + 32, Ml = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Dl = (e) => ({
  OT: mt.filter((t) => ce.isBookOT(t)),
  NT: mt.filter((t) => ce.isBookNT(t)),
  DC: mt.filter((t) => ce.isBookDC(t))
})[e], ot = (e) => Xp(ce.bookIdToNumber(e));
function Bl() {
  return mt.map((r) => ce.bookIdToEnglishName(r));
}
function jl(e) {
  return Bl().includes(e);
}
function Vl(e) {
  const r = e.toLowerCase().replace(/^\w/, (t) => t.toUpperCase());
  if (jl(r))
    return mt.find((n) => ce.bookIdToEnglishName(n) === r);
}
function pv({ scrRef: e, handleSubmit: r }) {
  const [t, n] = fe(""), [o, a] = fe(
    ce.bookNumberToId(e.bookNum)
  ), [i, s] = fe(e.chapterNum ?? 0), [l, u] = fe(
    ce.bookNumberToId(e.bookNum)
  ), [f, b] = fe(!1), [v, c] = fe(f), h = Nr(void 0), d = Nr(void 0), g = Nr(void 0), y = Se(
    (k) => Dl(k).filter((j) => {
      const V = ce.bookIdToEnglishName(j).toLowerCase(), Z = t.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return V.includes(Z) || // Match book name
      j.toLowerCase().includes(Z);
    }),
    [t]
  ), C = (k) => {
    n(k);
  }, N = Nr(!1), x = Se((k) => {
    if (N.current) {
      N.current = !1;
      return;
    }
    b(k);
  }, []), w = Se(
    (k, j, V, Z) => {
      if (s(
        ce.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), j || ot(k) === -1) {
        r({
          bookNum: ce.bookIdToNumber(k),
          chapterNum: V || 1,
          verseNum: Z || 1
        }), b(!1), n("");
        return;
      }
      a(o !== k ? k : ""), b(!j);
    },
    [r, e.bookNum, e.chapterNum, o]
  ), O = (k) => {
    k <= 0 || k > ot(o) || w(o, !0, k);
  }, _ = Se(() => {
    Ml.forEach((k) => {
      const j = t.match(k);
      if (j) {
        const [V, Z = void 0, K = void 0] = j.slice(1), H = Vl(V);
        (ce.isBookIdValid(V) || H) && w(
          H ?? V,
          !0,
          Z ? parseInt(Z, 10) : 1,
          K ? parseInt(K, 10) : 1
        );
      }
    });
  }, [w, t]), B = Se(
    (k) => {
      f ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null ? g.current.focus() : typeof d < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      d.current !== null && d.current.focus(), k.preventDefault()) : b(!0);
    },
    [f]
  ), S = (k) => {
    const { key: j } = k;
    j === "ArrowRight" || j === "ArrowLeft" || j === "ArrowDown" || j === "ArrowUp" || j === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: j })), h.current.focus());
  }, P = (k) => {
    const { key: j } = k;
    if (l === o) {
      if (j === "Enter") {
        k.preventDefault(), w(o, !0, i);
        return;
      }
      let V = 0;
      if (j === "ArrowRight")
        if (i < ot(l))
          V = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (j === "ArrowLeft")
        if (i > 1)
          V = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        j === "ArrowDown" ? V = 6 : j === "ArrowUp" && (V = -6);
      i + V <= 0 || i + V > ot(l) ? s(0) : V !== 0 && (s(i + V), k.preventDefault());
    }
  };
  return We(() => {
    o === l ? o === ce.bookNumberToId(e.bookNum) ? s(e.chapterNum) : s(1) : s(0);
  }, [l, e.bookNum, e.chapterNum, o]), oa(() => {
    c(f);
  }, [f]), oa(() => {
    const k = setTimeout(() => {
      if (v && d.current && g.current) {
        const V = g.current.offsetTop - Al;
        d.current.scrollTo({ top: V, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [v]), /* @__PURE__ */ p("div", { className: "pr-twp pr-flex", children: /* @__PURE__ */ T(vo, { modal: !1, open: f, onOpenChange: x, children: [
    /* @__PURE__ */ p(Si, { asChild: !0, children: /* @__PURE__ */ p(
      fl,
      {
        ref: h,
        value: t,
        handleSearch: C,
        handleKeyDown: B,
        handleOnClick: () => {
          a(ce.bookNumberToId(e.bookNum)), u(ce.bookNumberToId(e.bookNum)), s(e.chapterNum > 0 ? e.chapterNum : 0), b(!0), h.current.focus();
        },
        onFocus: () => {
          N.current = !0;
        },
        handleSubmit: _,
        placeholder: `${ce.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ T(
      ln,
      {
        className: "pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: S,
        align: "start",
        ref: d,
        children: [
          /* @__PURE__ */ p(
            $l,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          sa.map(
            (k, j) => y(k).length > 0 && /* @__PURE__ */ T("div", { children: [
              /* @__PURE__ */ p(Ot, { className: "pr-font-semibold pr-text-foreground/80", children: Il[k] }),
              y(k).map((V) => /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(
                Pl,
                {
                  bookId: V,
                  handleSelectBook: () => w(V, !1),
                  isSelected: o === V,
                  handleHighlightBook: () => u(V),
                  handleKeyDown: P,
                  bookType: k,
                  ref: (Z) => {
                    o === V && (g.current = Z);
                  },
                  children: /* @__PURE__ */ p(
                    _l,
                    {
                      handleSelectChapter: O,
                      endChapter: ot(V),
                      activeChapter: e.bookNum === ce.bookIdToNumber(V) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (Z) => {
                        s(Z);
                      }
                    }
                  )
                }
              ) }, V)),
              sa.length - 1 !== j ? /* @__PURE__ */ p(cn, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const Ll = sn(
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
), ye = D.forwardRef(
  ({ className: e, variant: r, size: t, asChild: n = !1, ...o }, a) => /* @__PURE__ */ p(n ? qp : "button", { className: R(Ll({ variant: r, size: t, className: e })), ref: a, ...o })
);
ye.displayName = "Button";
const Fl = sn(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), He = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(di.Root, { ref: t, className: R("pr-twp", Fl(), e), ...r }));
He.displayName = di.Root.displayName;
const Ri = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  bt.Root,
  {
    className: R("pr-twp pr-grid pr-gap-2", e),
    ...r,
    ref: t
  }
));
Ri.displayName = bt.Root.displayName;
const eo = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  bt.Item,
  {
    ref: t,
    className: R(
      "pr-twp pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
      e
    ),
    ...r,
    children: /* @__PURE__ */ p(bt.Indicator, { className: "pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ p(ci, { className: "pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current" }) })
  }
));
eo.displayName = bt.Item.displayName;
const zl = wt.Root, Gl = wt.Trigger, Pi = D.forwardRef(({ className: e, align: r = "center", sideOffset: t = 4, ...n }, o) => /* @__PURE__ */ p(wt.Portal, { children: /* @__PURE__ */ p(
  wt.Content,
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
Pi.displayName = wt.Content.displayName;
const Ul = Ye.Portal, _i = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Ye.Overlay,
  {
    ref: t,
    className: R(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...r
  }
));
_i.displayName = Ye.Overlay.displayName;
const Hl = D.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ T(Ul, { children: [
  /* @__PURE__ */ p(_i, {}),
  /* @__PURE__ */ T(
    Ye.Content,
    {
      ref: n,
      className: R(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...t,
      children: [
        r,
        /* @__PURE__ */ T(Ye.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ p(xp, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Hl.displayName = Ye.Content.displayName;
const Xl = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Ye.Title,
  {
    ref: t,
    className: R("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...r
  }
));
Xl.displayName = Ye.Title.displayName;
const Wl = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Ye.Description,
  {
    ref: t,
    className: R("pr-text-sm pr-text-muted-foreground", e),
    ...r
  }
));
Wl.displayName = Ye.Description.displayName;
const $i = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
$i.displayName = Re.displayName;
const Ii = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ p(Np, { className: "pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ p(
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
Ii.displayName = Re.Input.displayName;
const Ai = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Re.List,
  {
    ref: t,
    className: R("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...r
  }
));
Ai.displayName = Re.List.displayName;
const Mi = D.forwardRef((e, r) => /* @__PURE__ */ p(Re.Empty, { ref: r, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Mi.displayName = Re.Empty.displayName;
const Yl = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Yl.displayName = Re.Group.displayName;
const ql = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Re.Separator,
  {
    ref: t,
    className: R("pr--mx-1 pr-h-px pr-bg-border", e),
    ...r
  }
));
ql.displayName = Re.Separator.displayName;
const Di = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Di.displayName = Re.Item.displayName;
function Kl(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function pa({
  id: e,
  options: r = [],
  className: t,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = Kl,
  buttonPlaceholder: i = "",
  textPlaceholder: s = "",
  commandEmptyMessage: l = "No option found",
  buttonVariant: u = "outline",
  dir: f = "ltr",
  isDisabled: b = !1,
  ...v
}) {
  const [c, h] = fe(!1);
  return /* @__PURE__ */ T(zl, { open: c, onOpenChange: h, ...v, children: [
    /* @__PURE__ */ p(Gl, { asChild: !0, children: /* @__PURE__ */ T(
      ye,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": c,
        id: e,
        className: R("pr-w-[200px] pr-justify-between", t),
        disabled: b,
        children: [
          /* @__PURE__ */ p("span", { className: "pr-overflow-hidden pr-text-ellipsis pr-whitespace-nowrap", children: n ? a(n) : i }),
          /* @__PURE__ */ p(kp, { className: "pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ p(Pi, { className: "pr-w-[200px] pr-p-0", dir: f, children: /* @__PURE__ */ T($i, { children: [
      /* @__PURE__ */ p(Ii, { dir: f, placeholder: s, className: "pr-text-inherit" }),
      /* @__PURE__ */ p(Mi, { children: l }),
      /* @__PURE__ */ p(Ai, { children: r.map((d) => /* @__PURE__ */ T(
        Di,
        {
          value: a(d),
          onSelect: () => {
            o(d), h(!1);
          },
          children: [
            /* @__PURE__ */ p(
              on,
              {
                className: R("pr-me-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !n || a(n) !== a(d)
                })
              }
            ),
            a(d)
          ]
        },
        a(d)
      )) })
    ] }) })
  ] });
}
function Jl({
  startChapter: e,
  endChapter: r,
  handleSelectStartChapter: t,
  handleSelectEndChapter: n,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = lr(
    () => Array.from({ length: a }, (u, f) => f + 1),
    [a]
  );
  return /* @__PURE__ */ T(cr, { children: [
    /* @__PURE__ */ p(He, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ p(
      pa,
      {
        isDisabled: o,
        onChange: (u) => {
          t(u), u > r && n(u);
        },
        className: "pr-ml-2 pr-mr-2 pr-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ p(He, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ p(
      pa,
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u < e && t(u);
        },
        className: "pr-ml-2 pr-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: r
      },
      "end chapter"
    )
  ] });
}
var Zl = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Zl || {});
const lv = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), An = (e, r) => e[r] ?? r;
function cv({
  handleBookSelectionModeChange: e,
  currentBookName: r,
  onSelectBooks: t,
  selectedBookIds: n,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: s,
  handleSelectStartChapter: l,
  localizedStrings: u
}) {
  const f = An(u, "%webView_bookSelector_currentBook%"), b = An(u, "%webView_bookSelector_choose%"), v = An(u, "%webView_bookSelector_chooseBooks%"), [c, h] = fe(
    "current book"
    /* CURRENT_BOOK */
  ), d = (g) => {
    h(g), e(g);
  };
  return /* @__PURE__ */ p(
    Ri,
    {
      className: "pr-twp pr-flex",
      value: c,
      onValueChange: (g) => d(g),
      children: /* @__PURE__ */ T("div", { className: "pr-flex pr-w-full pr-flex-col pr-gap-4", children: [
        /* @__PURE__ */ T("div", { className: "pr-grid pr-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center", children: [
            /* @__PURE__ */ p(eo, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ p(He, { className: "pr-ml-1", children: `${f}:` })
          ] }),
          /* @__PURE__ */ p(He, { className: "pr-flex pr-items-center", children: r }),
          /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center pr-justify-end", children: /* @__PURE__ */ p(
            Jl,
            {
              isDisabled: c === "choose books",
              handleSelectStartChapter: l,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: s,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ T("div", { className: "pr-grid pr-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center", children: [
            /* @__PURE__ */ p(eo, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ p(He, { className: "pr-ml-1", children: `${v}:` })
          ] }),
          /* @__PURE__ */ p(He, { className: "pr-flex pr-items-center", children: n.map((g) => ce.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ p(
            ye,
            {
              disabled: c === "current book",
              onClick: () => t(),
              children: b
            }
          )
        ] })
      ] })
    }
  );
}
function Ql({ table: e }) {
  return /* @__PURE__ */ T(vo, { children: [
    /* @__PURE__ */ p(Hp, { asChild: !0, children: /* @__PURE__ */ T(ye, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ p(Ep, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ T(ln, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ p(Ot, { children: "Toggle columns" }),
      /* @__PURE__ */ p(cn, {}),
      e.getAllColumns().filter((r) => r.getCanHide()).map((r) => /* @__PURE__ */ p(
        bo,
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
const yt = be.Root, ec = be.Group, xt = be.Value, zr = D.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ T(
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
      /* @__PURE__ */ p(be.Icon, { asChild: !0, children: /* @__PURE__ */ p(an, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
zr.displayName = be.Trigger.displayName;
const Bi = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  be.ScrollUpButton,
  {
    ref: t,
    className: R("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...r,
    children: /* @__PURE__ */ p(Tp, { className: "pr-h-4 pr-w-4" })
  }
));
Bi.displayName = be.ScrollUpButton.displayName;
const ji = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  be.ScrollDownButton,
  {
    ref: t,
    className: R("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...r,
    children: /* @__PURE__ */ p(an, { className: "pr-h-4 pr-w-4" })
  }
));
ji.displayName = be.ScrollDownButton.displayName;
const Gr = D.forwardRef(({ className: e, children: r, position: t = "popper", ...n }, o) => /* @__PURE__ */ p(be.Portal, { children: /* @__PURE__ */ T(
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
      /* @__PURE__ */ p(Bi, {}),
      /* @__PURE__ */ p(
        be.Viewport,
        {
          className: R(
            "pr-p-1",
            t === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: r
        }
      ),
      /* @__PURE__ */ p(ji, {})
    ]
  }
) }));
Gr.displayName = be.Content.displayName;
const rc = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  be.Label,
  {
    ref: t,
    className: R("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...r
  }
));
rc.displayName = be.Label.displayName;
const Ge = D.forwardRef(({ className: e, children: r, ...t }, n) => /* @__PURE__ */ T(
  be.Item,
  {
    ref: n,
    className: R(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(be.ItemIndicator, { children: /* @__PURE__ */ p(on, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ p(be.ItemText, { children: r })
    ]
  }
));
Ge.displayName = be.Item.displayName;
const tc = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  be.Separator,
  {
    ref: t,
    className: R("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...r
  }
));
tc.displayName = be.Separator.displayName;
function nc({ table: e }) {
  return /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ T("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ p("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ T(
        yt,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (r) => {
            e.setPageSize(Number(r));
          },
          children: [
            /* @__PURE__ */ p(zr, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ p(xt, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ p(Gr, { side: "top", children: [10, 20, 30, 40, 50].map((r) => /* @__PURE__ */ p(Ge, { value: `${r}`, children: r }, r)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ T("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ p(Sp, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ p(Cp, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ p(Op, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ T(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ p(Rp, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const dn = D.forwardRef(({ className: e, stickyHeader: r, ...t }, n) => /* @__PURE__ */ p("div", { className: R("pr-twp pr-relative pr-w-full", { "pr-overflow-auto": !r }), children: /* @__PURE__ */ p(
  "table",
  {
    ref: n,
    className: R("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...t
  }
) }));
dn.displayName = "Table";
const un = D.forwardRef(({ className: e, stickyHeader: r, ...t }, n) => /* @__PURE__ */ p(
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
const fn = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p("tbody", { ref: t, className: R("[&_tr:last-child]:pr-border-0", e), ...r }));
fn.displayName = "TableBody";
const oc = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  "tfoot",
  {
    ref: t,
    className: R("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...r
  }
));
oc.displayName = "TableFooter";
const pr = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
const Nt = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Nt.displayName = "TableHead";
const Ur = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  "td",
  {
    ref: t,
    className: R("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0", e),
    ...r
  }
));
Ur.displayName = "TableCell";
const ac = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  "caption",
  {
    ref: t,
    className: R("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...r
  }
));
ac.displayName = "TableCaption";
function ic({
  columns: e,
  data: r,
  enablePagination: t = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var g;
  const [s, l] = fe([]), [u, f] = fe([]), [b, v] = fe({}), [c, h] = fe({}), d = ui({
    data: r,
    columns: e,
    getCoreRowModel: fi(),
    ...t && { getPaginationRowModel: Kp() },
    onSortingChange: l,
    getSortedRowModel: mi(),
    onColumnFiltersChange: f,
    getFilteredRowModel: Jp(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: h,
    state: {
      sorting: s,
      columnFilters: u,
      columnVisibility: b,
      rowSelection: c
    }
  });
  return /* @__PURE__ */ T("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ p(Ql, { table: d }),
    /* @__PURE__ */ T(dn, { stickyHeader: a, children: [
      /* @__PURE__ */ p(un, { stickyHeader: a, children: d.getHeaderGroups().map((y) => /* @__PURE__ */ p(pr, { children: y.headers.map((C) => /* @__PURE__ */ p(Nt, { children: C.isPlaceholder ? void 0 : ft(C.column.columnDef.header, C.getContext()) }, C.id)) }, y.id)) }),
      /* @__PURE__ */ p(fn, { children: (g = d.getRowModel().rows) != null && g.length ? d.getRowModel().rows.map((y) => /* @__PURE__ */ p(
        pr,
        {
          onClick: () => i(y, d),
          "data-state": y.getIsSelected() && "selected",
          children: y.getVisibleCells().map((C) => /* @__PURE__ */ p(Ur, { children: ft(C.column.columnDef.cell, C.getContext()) }, C.id))
        },
        y.id
      )) : /* @__PURE__ */ p(pr, { children: /* @__PURE__ */ p(Ur, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    t && /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ p(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => d.previousPage(),
          disabled: !d.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ p(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => d.nextPage(),
          disabled: !d.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    t && n && /* @__PURE__ */ p(nc, { table: d })
  ] });
}
const sc = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), la = (e) => {
  const r = /^\\[vc]\s+(\d+)/, t = e.match(r);
  if (t)
    return +t[1];
}, ca = (e, r, t, n) => {
  if (!e || e === "" || r === "")
    return [];
  const o = [], a = sc(e);
  let i = n.chapterNum, s = n.verseNum, l = 0;
  return a.forEach((u) => {
    u.startsWith("\\id") && (i = 0, s = 0), u.startsWith("\\c") && (i = la(u), s = 0), u.startsWith("\\v") && (s = la(u), i === 0 && (i = n.chapterNum));
    const f = t(u, r);
    for (let b = 0; b < f.length; b++) {
      const v = {
        reference: {
          ...n,
          chapterNum: i !== void 0 ? +i : -1,
          verseNum: s !== void 0 ? +s : -1
        },
        snippet: u,
        key: l
      };
      l += 1, o.push(v);
    }
  }), o;
};
function pc({
  selectedItem: e,
  text: r,
  extractItems: t,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], s = a["%webView_inventory_occurrences_table_header_occurrence%"], [l, u] = fe(
    ca(r, e, t, n)
  );
  return We(
    () => u(ca(r, e, t, n)),
    [r, e, n, t]
  ), /* @__PURE__ */ T(dn, { stickyHeader: !0, children: [
    /* @__PURE__ */ p(un, { stickyHeader: !0, children: /* @__PURE__ */ T(pr, { children: [
      /* @__PURE__ */ p(Nt, { children: i }),
      /* @__PURE__ */ p(Nt, { children: s })
    ] }) }),
    /* @__PURE__ */ p(fn, { children: l.map((f) => /* @__PURE__ */ T(
      pr,
      {
        onClick: () => {
          o(f.reference);
        },
        children: [
          /* @__PURE__ */ p(Ur, { children: `${ce.bookNumberToEnglishName(f.reference.bookNum)} ${f.reference.chapterNum}:${f.reference.verseNum}` }),
          /* @__PURE__ */ p(Ur, { children: f.snippet })
        ]
      },
      f.key
    )) })
  ] });
}
const dv = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_platformScripture_currentBook%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%"
]), wo = (e) => e === "asc" ? /* @__PURE__ */ p(Pp, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ p(_p, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ p($p, { className: "pr-ms-2 pr-h-4 pr-w-4" }), lc = (e, r, t) => {
  let n = e;
  return r !== "all" && (n = n.filter(
    (o) => r === "approved" && o.status === "approved" || r === "unapproved" && o.status === "unapproved" || r === "unknown" && o.status === "unknown"
  )), t !== "" && (n = n.filter((o) => o.item.includes(t))), n;
}, cc = (e, r, t) => {
  const n = [], o = r(e);
  for (let a = 0; a < o.length; a++) {
    const i = o[a], s = n.find((l) => l.item === i);
    if (s)
      s.count += 1;
    else {
      const l = {
        item: i,
        count: 1,
        status: t(i)
      };
      n.push(l);
    }
  }
  return n;
}, nr = (e, r) => e[r] ?? r;
function uv({
  scriptureReference: e,
  setScriptureReference: r,
  localizedStrings: t,
  extractItems: n,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: s,
  text: l,
  scope: u,
  onScopeChange: f,
  getColumns: b
}) {
  const v = nr(t, "%webView_inventory_all%"), c = nr(t, "%webView_inventory_approved%"), h = nr(t, "%webView_inventory_unapproved%"), d = nr(t, "%webView_inventory_unknown%"), g = nr(t, "%webView_platformScripture_currentBook%"), y = nr(t, "%webView_inventory_scope_chapter%"), C = nr(t, "%webView_inventory_scope_verse%"), N = nr(t, "%webView_inventory_filter_text%"), [x, w] = fe([]), [O, _] = fe("all"), [B, S] = fe(""), [P, k] = fe(""), j = Se(
    (F, E) => {
      w((G) => {
        let z = [];
        return F.forEach((Y) => {
          z = G.map((U) => U.item === Y && U.status !== E ? { ...U, status: E } : U);
        }), z;
      });
      let I = [...o];
      F.forEach((G) => {
        E === "approved" ? I.includes(G) || I.push(G) : I = I.filter((z) => z !== G);
      }), a(I);
      let X = [...i];
      F.forEach((G) => {
        E === "unapproved" ? X.includes(G) || X.push(G) : X = X.filter(
          (z) => z !== G
        );
      }), s(X);
    },
    [o, a, i, s]
  ), V = Se(
    (F) => o.includes(F) ? "approved" : i.includes(F) ? "unapproved" : "unknown",
    [o, i]
  );
  We(() => {
    l && w(cc(l, n, V));
  }, [n, l, V]);
  const Z = lr(() => lc(x, O, B), [x, O, B]);
  We(() => {
    k("");
  }, [Z]);
  const K = (F, E) => {
    E.toggleAllRowsSelected(!1), F.toggleSelected(void 0), k(F.getValue("item"));
  }, H = lr(() => b(j), [b, j]), re = (F) => {
    if (F === "book" || F === "chapter" || F === "verse")
      f(F);
    else
      throw new Error(`Invalid scope value: ${F}`);
  }, ae = (F) => {
    if (F === "all" || F === "approved" || F === "unapproved" || F === "unknown")
      _(F);
    else
      throw new Error(`Invalid status filter value: ${F}`);
  };
  return /* @__PURE__ */ T("div", { className: "pr-twp pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ T("div", { className: "pr-flex", children: [
      /* @__PURE__ */ T(
        yt,
        {
          onValueChange: (F) => ae(F),
          defaultValue: O,
          children: [
            /* @__PURE__ */ p(zr, { className: "pr-m-1", children: /* @__PURE__ */ p(xt, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ T(Gr, { children: [
              /* @__PURE__ */ p(Ge, { value: "all", children: v }),
              /* @__PURE__ */ p(Ge, { value: "approved", children: c }),
              /* @__PURE__ */ p(Ge, { value: "unapproved", children: h }),
              /* @__PURE__ */ p(Ge, { value: "unknown", children: d })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ T(yt, { onValueChange: (F) => re(F), defaultValue: u, children: [
        /* @__PURE__ */ p(zr, { className: "pr-m-1", children: /* @__PURE__ */ p(xt, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ T(Gr, { children: [
          /* @__PURE__ */ p(Ge, { value: "book", children: g }),
          /* @__PURE__ */ p(Ge, { value: "chapter", children: y }),
          /* @__PURE__ */ p(Ge, { value: "verse", children: C })
        ] })
      ] }),
      /* @__PURE__ */ p(
        Ct,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: N,
          value: B,
          onChange: (F) => {
            S(F.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ p(
      ic,
      {
        columns: H,
        data: Z,
        onRowClickHandler: K,
        stickyHeader: !0
      }
    ) }),
    P !== "" && /* @__PURE__ */ p("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ p(
      pc,
      {
        selectedItem: P,
        text: l,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (F) => r(F),
        localizedStrings: t
      }
    ) })
  ] });
}
const Vi = sn(
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
), dc = D.forwardRef(({ className: e, variant: r, size: t, ...n }, o) => /* @__PURE__ */ p(
  hi.Root,
  {
    ref: o,
    className: R(Vi({ variant: r, size: t, className: e })),
    ...n
  }
));
dc.displayName = hi.Root.displayName;
const Li = D.createContext({
  size: "default",
  variant: "default"
}), Fi = D.forwardRef(({ className: e, variant: r, size: t, children: n, ...o }, a) => /* @__PURE__ */ p(
  pn.Root,
  {
    ref: a,
    className: R("pr-twp pr-flex pr-items-center pr-justify-center pr-gap-1", e),
    ...o,
    children: /* @__PURE__ */ p(
      Li.Provider,
      {
        value: { variant: r, size: t },
        children: n
      }
    )
  }
));
Fi.displayName = pn.Root.displayName;
const Xt = D.forwardRef(({ className: e, children: r, variant: t, size: n, ...o }, a) => {
  const i = D.useContext(Li);
  return /* @__PURE__ */ p(
    pn.Item,
    {
      ref: a,
      className: R(
        Vi({
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
const fv = (e) => ({
  accessorKey: "item",
  header: ({ column: r }) => /* @__PURE__ */ T(ye, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    e,
    wo(r.getIsSorted())
  ] })
}), mv = (e) => ({
  accessorKey: "count",
  header: ({ column: r }) => /* @__PURE__ */ p("div", { className: "pr-flex pr-justify-end pr-tabular-nums", children: /* @__PURE__ */ T(ye, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    e,
    wo(r.getIsSorted())
  ] }) }),
  cell: ({ row: r }) => /* @__PURE__ */ p("div", { className: "pr-flex pr-justify-end", children: r.getValue("count") })
}), hv = (e, r) => ({
  accessorKey: "status",
  header: ({ column: t }) => /* @__PURE__ */ p("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ T(ye, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    wo(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => {
    const n = t.getValue("status"), o = t.getValue("item");
    return /* @__PURE__ */ T(Fi, { value: n, variant: "outline", type: "single", children: [
      /* @__PURE__ */ p(Xt, { onClick: () => r([o], "approved"), value: "approved", children: /* @__PURE__ */ p(Ip, {}) }),
      /* @__PURE__ */ p(
        Xt,
        {
          onClick: () => r([o], "unapproved"),
          value: "unapproved",
          children: /* @__PURE__ */ p(Ap, {})
        }
      ),
      /* @__PURE__ */ p(Xt, { onClick: () => r([o], "unknown"), value: "unknown", children: /* @__PURE__ */ p(Mp, {}) })
    ] });
  }
});
function uc({ onSearch: e, placeholder: r, isFullWidth: t }) {
  const [n, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ p(
    Ct,
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
const zi = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Pe.Root,
  {
    orientation: "vertical",
    ref: t,
    className: R("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...r
  }
));
zi.displayName = Pe.List.displayName;
const Gi = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Gi.displayName = Pe.List.displayName;
const fc = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Pe.Trigger,
  {
    ref: t,
    ...r,
    className: R(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Ui = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Ui.displayName = Pe.Content.displayName;
function gv({
  tabList: e,
  onSearch: r,
  searchPlaceholder: t,
  headerTitle: n,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ T("div", { className: "pr-twp", children: [
    /* @__PURE__ */ T("div", { className: "pr-sticky pr-top-0 pr-space-y-2 pr-pb-2", children: [
      n ? /* @__PURE__ */ p("h1", { children: n }) : "",
      /* @__PURE__ */ p(
        uc,
        {
          isFullWidth: o,
          onSearch: r,
          placeholder: t
        }
      )
    ] }),
    /* @__PURE__ */ T(zi, { dir: a, children: [
      /* @__PURE__ */ p(Gi, { children: e.map((i) => /* @__PURE__ */ p(fc, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ p(Ui, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const ir = "scrBook", mc = "scrRef", vr = "source", hc = "details", gc = "Scripture Reference", vc = "Scripture Book", Hi = "Type", bc = "Details";
function wc(e, r) {
  const t = r ?? !1;
  return [
    {
      accessorFn: (n) => `${ce.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: ir,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? gc,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? ce.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === ir ? $n(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => Jn(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => $n(n.start),
      id: mc,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : $n(o.start);
      },
      sortingFn: (n, o) => Jn(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: vr,
      header: t ? (e == null ? void 0 : e.typeColumnName) ?? Hi : void 0,
      cell: (n) => t || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: hc,
      header: (e == null ? void 0 : e.detailsColumnName) ?? bc,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const yc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: r } = e.start;
  let t = 0;
  return e.end && ({ offset: t } = e.end), !e.end || Jn(e.start, e.end) === 0 ? `${In(e.start)}+${r}` : `${In(e.start)}+${r}-${In(e.end)}+${t}`;
}, da = (e) => `${yc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function vv({
  sources: e,
  showColumnHeaders: r = !1,
  showSourceColumn: t = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: s,
  direction: l = "ltr"
}) {
  const [u, f] = fe([]), [b, v] = fe([{ id: ir, desc: !1 }]), [c, h] = fe({}), d = lr(
    () => e.flatMap((S) => S.data.map((P) => ({
      ...P,
      source: S.source
    }))),
    [e]
  ), g = lr(
    () => wc(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      t
    ),
    [n, a, i, t]
  );
  We(() => {
    u.includes(vr) ? v([
      { id: vr, desc: !1 },
      { id: ir, desc: !1 }
    ]) : v([{ id: ir, desc: !1 }]);
  }, [u]);
  const y = ui({
    data: d,
    columns: g,
    state: {
      grouping: u,
      sorting: b,
      rowSelection: c
    },
    onGroupingChange: f,
    onSortingChange: v,
    onRowSelectionChange: h,
    getExpandedRowModel: Zp(),
    getGroupedRowModel: Qp(),
    getCoreRowModel: fi(),
    getSortedRowModel: mi(),
    getRowId: da,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  We(() => {
    if (s) {
      const S = y.getSelectedRowModel().rowsById, P = Object.keys(S);
      if (P.length === 1) {
        const k = d.find((j) => da(j) === P[0]) || void 0;
        k && s(k);
      }
    }
  }, [c, d, s, y]);
  const C = o ?? vc, N = a ?? Hi, x = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${C}`, value: [ir] },
    { label: `Group by ${N}`, value: [vr] },
    {
      label: `Group by ${C} and ${N}`,
      value: [ir, vr]
    },
    {
      label: `Group by ${N} and ${C}`,
      value: [vr, ir]
    }
  ], w = (S) => {
    f(JSON.parse(S));
  }, O = (S, P) => {
    !S.getIsGrouped() && !S.getIsSelected() && S.getToggleSelectedHandler()(P);
  }, _ = (S, P) => S.getIsGrouped() ? "" : R("banded-row", P % 2 === 0 ? "even" : "odd"), B = (S, P, k) => {
    if (!((S == null ? void 0 : S.length) === 0 || P.depth < k.column.getGroupedIndex())) {
      if (P.getIsGrouped())
        switch (P.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (P.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ T("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !r && /* @__PURE__ */ T(
      yt,
      {
        value: JSON.stringify(u),
        onValueChange: (S) => {
          w(S);
        },
        children: [
          /* @__PURE__ */ p(zr, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ p(xt, {}) }),
          /* @__PURE__ */ p(Gr, { position: "item-aligned", children: /* @__PURE__ */ p(ec, { children: x.map((S) => /* @__PURE__ */ p(Ge, { value: JSON.stringify(S.value), children: S.label }, S.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ T(dn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      r && /* @__PURE__ */ p(un, { children: y.getHeaderGroups().map((S) => /* @__PURE__ */ p(pr, { children: S.headers.filter((P) => P.column.columnDef.header).map((P) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ p(Nt, { colSpan: P.colSpan, className: "top-0 pr-sticky", children: P.isPlaceholder ? void 0 : /* @__PURE__ */ T("div", { children: [
          P.column.getCanGroup() ? /* @__PURE__ */ p(
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
          ft(P.column.columnDef.header, P.getContext())
        ] }) }, P.id)
      )) }, S.id)) }),
      /* @__PURE__ */ p(fn, { children: y.getRowModel().rows.map((S, P) => /* @__PURE__ */ p(
        pr,
        {
          "data-state": S.getIsSelected() ? "selected" : "",
          className: R(_(S, P)),
          onClick: (k) => O(S, k),
          children: S.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== vr || !t)))
              return /* @__PURE__ */ p(
                Ur,
                {
                  className: R(
                    k.column.columnDef.id,
                    "pr-p-[1px]",
                    B(u, S, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ T(
                    ye,
                    {
                      variant: "link",
                      onClick: S.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        S.getIsExpanded() && /* @__PURE__ */ p(an, {}),
                        !S.getIsExpanded() && (l === "ltr" ? /* @__PURE__ */ p(li, {}) : /* @__PURE__ */ p(Dp, {})),
                        " ",
                        ft(k.column.columnDef.cell, k.getContext()),
                        " (",
                        S.subRows.length,
                        ")"
                      ]
                    }
                  ) : ft(k.column.columnDef.cell, k.getContext()))()
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
function bv({
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
  return /* @__PURE__ */ T(
    yt,
    {
      value: `${r}`,
      onValueChange: (a) => t(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ p(zr, { className: "pr-twp pr-w-auto", children: /* @__PURE__ */ p(
          xt,
          {
            placeholder: o[ue(r)] ?? r
          }
        ) }),
        /* @__PURE__ */ p(
          Gr,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ p(Ge, { value: `${a}`, children: o[ue(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const Xi = D.forwardRef(({ className: e, orientation: r = "horizontal", decorative: t = !0, ...n }, o) => /* @__PURE__ */ p(
  gi.Root,
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
Xi.displayName = gi.Root.displayName;
function wv({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "pr-twp pr-grid", children: e });
}
function yv({
  primary: e,
  secondary: r,
  children: t,
  isLoading: n = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ p("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ p("p", { className: "pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground", children: r })
    ] }),
    n ? /* @__PURE__ */ p("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : /* @__PURE__ */ p("div", { children: t })
  ] });
}
function xv({
  primary: e,
  secondary: r,
  includeSeparator: t = !1
}) {
  return /* @__PURE__ */ T("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ p("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ p("p", { className: "pr-text-sm pr-text-muted-foreground", children: r })
    ] }),
    t ? /* @__PURE__ */ p(Xi, {}) : ""
  ] });
}
const Wi = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Zn.Root,
  {
    ref: t,
    className: R(
      "pr-peer pr-twp pr-h-4 pr-w-4 pr-shrink-0 pr-rounded-sm pr-border pr-border-primary pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=checked]:pr-text-primary-foreground",
      e
    ),
    ...r,
    children: /* @__PURE__ */ p(
      Zn.Indicator,
      {
        className: R("pr-flex pr-items-center pr-justify-center pr-text-current"),
        children: /* @__PURE__ */ p(on, { className: "pr-h-4 pr-w-4" })
      }
    )
  }
));
Wi.displayName = Zn.Root.displayName;
function Nv({
  id: e,
  className: r,
  legend: t,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ T("fieldset", { id: e, className: `pr-twp ${r}`, children: [
    t && /* @__PURE__ */ p("legend", { children: /* @__PURE__ */ p(He, { children: t }) }),
    n.map((s) => /* @__PURE__ */ T("div", { className: "pr-m-2 pr-flex pr-items-center", children: [
      /* @__PURE__ */ p(
        Wi,
        {
          className: "pr-mr-2 pr-align-middle",
          checked: o.includes(s),
          onCheckedChange: (l) => a(s, l)
        },
        s
      ),
      /* @__PURE__ */ p(He, { children: i ? i(s) : s })
    ] }))
  ] });
}
function xc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Nc(e) {
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
var yo = {}, Yi = { exports: {} };
(function(e) {
  function r(t) {
    return t && t.__esModule ? t : {
      default: t
    };
  }
  e.exports = r, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Yi);
var kc = Yi.exports, Dn = {};
function xo(e, r) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || r(...n);
  };
}
function $() {
  return $ = Object.assign ? Object.assign.bind() : function(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = arguments[r];
      for (var n in t)
        Object.prototype.hasOwnProperty.call(t, n) && (e[n] = t[n]);
    }
    return e;
  }, $.apply(this, arguments);
}
function yr(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const r = Object.getPrototypeOf(e);
  return (r === null || r === Object.prototype || Object.getPrototypeOf(r) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function qi(e) {
  if (!yr(e))
    return e;
  const r = {};
  return Object.keys(e).forEach((t) => {
    r[t] = qi(e[t]);
  }), r;
}
function Qe(e, r, t = {
  clone: !0
}) {
  const n = t.clone ? $({}, e) : e;
  return yr(e) && yr(r) && Object.keys(r).forEach((o) => {
    o !== "__proto__" && (yr(r[o]) && o in e && yr(e[o]) ? n[o] = Qe(e[o], r[o], t) : t.clone ? n[o] = yr(r[o]) ? qi(r[o]) : r[o] : n[o] = r[o]);
  }), n;
}
var ro = { exports: {} }, Ft = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ua;
function Ec() {
  if (ua)
    return ie;
  ua = 1;
  var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, c = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
  function N(w) {
    if (typeof w == "object" && w !== null) {
      var O = w.$$typeof;
      switch (O) {
        case r:
          switch (w = w.type, w) {
            case l:
            case u:
            case n:
            case a:
            case o:
            case b:
              return w;
            default:
              switch (w = w && w.$$typeof, w) {
                case s:
                case f:
                case h:
                case c:
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
    return N(w) === u;
  }
  return ie.AsyncMode = l, ie.ConcurrentMode = u, ie.ContextConsumer = s, ie.ContextProvider = i, ie.Element = r, ie.ForwardRef = f, ie.Fragment = n, ie.Lazy = h, ie.Memo = c, ie.Portal = t, ie.Profiler = a, ie.StrictMode = o, ie.Suspense = b, ie.isAsyncMode = function(w) {
    return x(w) || N(w) === l;
  }, ie.isConcurrentMode = x, ie.isContextConsumer = function(w) {
    return N(w) === s;
  }, ie.isContextProvider = function(w) {
    return N(w) === i;
  }, ie.isElement = function(w) {
    return typeof w == "object" && w !== null && w.$$typeof === r;
  }, ie.isForwardRef = function(w) {
    return N(w) === f;
  }, ie.isFragment = function(w) {
    return N(w) === n;
  }, ie.isLazy = function(w) {
    return N(w) === h;
  }, ie.isMemo = function(w) {
    return N(w) === c;
  }, ie.isPortal = function(w) {
    return N(w) === t;
  }, ie.isProfiler = function(w) {
    return N(w) === a;
  }, ie.isStrictMode = function(w) {
    return N(w) === o;
  }, ie.isSuspense = function(w) {
    return N(w) === b;
  }, ie.isValidElementType = function(w) {
    return typeof w == "string" || typeof w == "function" || w === n || w === u || w === a || w === o || w === b || w === v || typeof w == "object" && w !== null && (w.$$typeof === h || w.$$typeof === c || w.$$typeof === i || w.$$typeof === s || w.$$typeof === f || w.$$typeof === g || w.$$typeof === y || w.$$typeof === C || w.$$typeof === d);
  }, ie.typeOf = N, ie;
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
function Tc() {
  return fa || (fa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, r = e ? Symbol.for("react.element") : 60103, t = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, s = e ? Symbol.for("react.context") : 60110, l = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, v = e ? Symbol.for("react.suspense_list") : 60120, c = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, y = e ? Symbol.for("react.responder") : 60118, C = e ? Symbol.for("react.scope") : 60119;
    function N(A) {
      return typeof A == "string" || typeof A == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      A === n || A === u || A === a || A === o || A === b || A === v || typeof A == "object" && A !== null && (A.$$typeof === h || A.$$typeof === c || A.$$typeof === i || A.$$typeof === s || A.$$typeof === f || A.$$typeof === g || A.$$typeof === y || A.$$typeof === C || A.$$typeof === d);
    }
    function x(A) {
      if (typeof A == "object" && A !== null) {
        var Ne = A.$$typeof;
        switch (Ne) {
          case r:
            var L = A.type;
            switch (L) {
              case l:
              case u:
              case n:
              case a:
              case o:
              case b:
                return L;
              default:
                var xe = L && L.$$typeof;
                switch (xe) {
                  case s:
                  case f:
                  case h:
                  case c:
                  case i:
                    return xe;
                  default:
                    return Ne;
                }
            }
          case t:
            return Ne;
        }
      }
    }
    var w = l, O = u, _ = s, B = i, S = r, P = f, k = n, j = h, V = c, Z = t, K = a, H = o, re = b, ae = !1;
    function F(A) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), E(A) || x(A) === l;
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
      return typeof A == "object" && A !== null && A.$$typeof === r;
    }
    function z(A) {
      return x(A) === f;
    }
    function Y(A) {
      return x(A) === n;
    }
    function U(A) {
      return x(A) === h;
    }
    function q(A) {
      return x(A) === c;
    }
    function W(A) {
      return x(A) === t;
    }
    function J(A) {
      return x(A) === a;
    }
    function Q(A) {
      return x(A) === o;
    }
    function de(A) {
      return x(A) === b;
    }
    se.AsyncMode = w, se.ConcurrentMode = O, se.ContextConsumer = _, se.ContextProvider = B, se.Element = S, se.ForwardRef = P, se.Fragment = k, se.Lazy = j, se.Memo = V, se.Portal = Z, se.Profiler = K, se.StrictMode = H, se.Suspense = re, se.isAsyncMode = F, se.isConcurrentMode = E, se.isContextConsumer = I, se.isContextProvider = X, se.isElement = G, se.isForwardRef = z, se.isFragment = Y, se.isLazy = U, se.isMemo = q, se.isPortal = W, se.isProfiler = J, se.isStrictMode = Q, se.isSuspense = de, se.isValidElementType = N, se.typeOf = x;
  }()), se;
}
var ma;
function Ki() {
  return ma || (ma = 1, process.env.NODE_ENV === "production" ? Ft.exports = Ec() : Ft.exports = Tc()), Ft.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Bn, ha;
function Sc() {
  if (ha)
    return Bn;
  ha = 1;
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
      var l = Object.getOwnPropertyNames(i).map(function(f) {
        return i[f];
      });
      if (l.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        u[f] = f;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Bn = o() ? Object.assign : function(a, i) {
    for (var s, l = n(a), u, f = 1; f < arguments.length; f++) {
      s = Object(arguments[f]);
      for (var b in s)
        r.call(s, b) && (l[b] = s[b]);
      if (e) {
        u = e(s);
        for (var v = 0; v < u.length; v++)
          t.call(s, u[v]) && (l[u[v]] = s[u[v]]);
      }
    }
    return l;
  }, Bn;
}
var jn, ga;
function No() {
  if (ga)
    return jn;
  ga = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return jn = e, jn;
}
var Vn, va;
function Ji() {
  return va || (va = 1, Vn = Function.call.bind(Object.prototype.hasOwnProperty)), Vn;
}
var Ln, ba;
function Cc() {
  if (ba)
    return Ln;
  ba = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var r = No(), t = {}, n = Ji();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, s, l, u) {
    if (process.env.NODE_ENV !== "production") {
      for (var f in a)
        if (n(a, f)) {
          var b;
          try {
            if (typeof a[f] != "function") {
              var v = Error(
                (l || "React class") + ": " + s + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw v.name = "Invariant Violation", v;
            }
            b = a[f](i, f, l, s, null, r);
          } catch (h) {
            b = h;
          }
          if (b && !(b instanceof Error) && e(
            (l || "React class") + ": type specification of " + s + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof b + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), b instanceof Error && !(b.message in t)) {
            t[b.message] = !0;
            var c = u ? u() : "";
            e(
              "Failed " + s + " type: " + b.message + (c ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (t = {});
  }, Ln = o, Ln;
}
var Fn, wa;
function Oc() {
  if (wa)
    return Fn;
  wa = 1;
  var e = Ki(), r = Sc(), t = No(), n = Ji(), o = Cc(), a = function() {
  };
  process.env.NODE_ENV !== "production" && (a = function(s) {
    var l = "Warning: " + s;
    typeof console < "u" && console.error(l);
    try {
      throw new Error(l);
    } catch {
    }
  });
  function i() {
    return null;
  }
  return Fn = function(s, l) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function b(E) {
      var I = E && (u && E[u] || E[f]);
      if (typeof I == "function")
        return I;
    }
    var v = "<<anonymous>>", c = {
      array: y("array"),
      bigint: y("bigint"),
      bool: y("boolean"),
      func: y("function"),
      number: y("number"),
      object: y("object"),
      string: y("string"),
      symbol: y("symbol"),
      any: C(),
      arrayOf: N,
      element: x(),
      elementType: w(),
      instanceOf: O,
      node: P(),
      objectOf: B,
      oneOf: _,
      oneOfType: S,
      shape: j,
      exact: V
    };
    function h(E, I) {
      return E === I ? E !== 0 || 1 / E === 1 / I : E !== E && I !== I;
    }
    function d(E, I) {
      this.message = E, this.data = I && typeof I == "object" ? I : {}, this.stack = "";
    }
    d.prototype = Error.prototype;
    function g(E) {
      if (process.env.NODE_ENV !== "production")
        var I = {}, X = 0;
      function G(Y, U, q, W, J, Q, de) {
        if (W = W || v, Q = Q || q, de !== t) {
          if (l) {
            var A = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw A.name = "Invariant Violation", A;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var Ne = W + ":" + q;
            !I[Ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            X < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Q + "` prop on `" + W + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), I[Ne] = !0, X++);
          }
        }
        return U[q] == null ? Y ? U[q] === null ? new d("The " + J + " `" + Q + "` is marked as required " + ("in `" + W + "`, but its value is `null`.")) : new d("The " + J + " `" + Q + "` is marked as required in " + ("`" + W + "`, but its value is `undefined`.")) : null : E(U, q, W, J, Q);
      }
      var z = G.bind(null, !1);
      return z.isRequired = G.bind(null, !0), z;
    }
    function y(E) {
      function I(X, G, z, Y, U, q) {
        var W = X[G], J = H(W);
        if (J !== E) {
          var Q = re(W);
          return new d(
            "Invalid " + Y + " `" + U + "` of type " + ("`" + Q + "` supplied to `" + z + "`, expected ") + ("`" + E + "`."),
            { expectedType: E }
          );
        }
        return null;
      }
      return g(I);
    }
    function C() {
      return g(i);
    }
    function N(E) {
      function I(X, G, z, Y, U) {
        if (typeof E != "function")
          return new d("Property `" + U + "` of component `" + z + "` has invalid PropType notation inside arrayOf.");
        var q = X[G];
        if (!Array.isArray(q)) {
          var W = H(q);
          return new d("Invalid " + Y + " `" + U + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an array."));
        }
        for (var J = 0; J < q.length; J++) {
          var Q = E(q, J, z, Y, U + "[" + J + "]", t);
          if (Q instanceof Error)
            return Q;
        }
        return null;
      }
      return g(I);
    }
    function x() {
      function E(I, X, G, z, Y) {
        var U = I[X];
        if (!s(U)) {
          var q = H(U);
          return new d("Invalid " + z + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + G + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(E);
    }
    function w() {
      function E(I, X, G, z, Y) {
        var U = I[X];
        if (!e.isValidElementType(U)) {
          var q = H(U);
          return new d("Invalid " + z + " `" + Y + "` of type " + ("`" + q + "` supplied to `" + G + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(E);
    }
    function O(E) {
      function I(X, G, z, Y, U) {
        if (!(X[G] instanceof E)) {
          var q = E.name || v, W = F(X[G]);
          return new d("Invalid " + Y + " `" + U + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected ") + ("instance of `" + q + "`."));
        }
        return null;
      }
      return g(I);
    }
    function _(E) {
      if (!Array.isArray(E))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function I(X, G, z, Y, U) {
        for (var q = X[G], W = 0; W < E.length; W++)
          if (h(q, E[W]))
            return null;
        var J = JSON.stringify(E, function(de, A) {
          var Ne = re(A);
          return Ne === "symbol" ? String(A) : A;
        });
        return new d("Invalid " + Y + " `" + U + "` of value `" + String(q) + "` " + ("supplied to `" + z + "`, expected one of " + J + "."));
      }
      return g(I);
    }
    function B(E) {
      function I(X, G, z, Y, U) {
        if (typeof E != "function")
          return new d("Property `" + U + "` of component `" + z + "` has invalid PropType notation inside objectOf.");
        var q = X[G], W = H(q);
        if (W !== "object")
          return new d("Invalid " + Y + " `" + U + "` of type " + ("`" + W + "` supplied to `" + z + "`, expected an object."));
        for (var J in q)
          if (n(q, J)) {
            var Q = E(q, J, z, Y, U + "." + J, t);
            if (Q instanceof Error)
              return Q;
          }
        return null;
      }
      return g(I);
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
      function G(z, Y, U, q, W) {
        for (var J = [], Q = 0; Q < E.length; Q++) {
          var de = E[Q], A = de(z, Y, U, q, W, t);
          if (A == null)
            return null;
          A.data && n(A.data, "expectedType") && J.push(A.data.expectedType);
        }
        var Ne = J.length > 0 ? ", expected one of type [" + J.join(", ") + "]" : "";
        return new d("Invalid " + q + " `" + W + "` supplied to " + ("`" + U + "`" + Ne + "."));
      }
      return g(G);
    }
    function P() {
      function E(I, X, G, z, Y) {
        return Z(I[X]) ? null : new d("Invalid " + z + " `" + Y + "` supplied to " + ("`" + G + "`, expected a ReactNode."));
      }
      return g(E);
    }
    function k(E, I, X, G, z) {
      return new d(
        (E || "React class") + ": " + I + " type `" + X + "." + G + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + z + "`."
      );
    }
    function j(E) {
      function I(X, G, z, Y, U) {
        var q = X[G], W = H(q);
        if (W !== "object")
          return new d("Invalid " + Y + " `" + U + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        for (var J in E) {
          var Q = E[J];
          if (typeof Q != "function")
            return k(z, Y, U, J, re(Q));
          var de = Q(q, J, z, Y, U + "." + J, t);
          if (de)
            return de;
        }
        return null;
      }
      return g(I);
    }
    function V(E) {
      function I(X, G, z, Y, U) {
        var q = X[G], W = H(q);
        if (W !== "object")
          return new d("Invalid " + Y + " `" + U + "` of type `" + W + "` " + ("supplied to `" + z + "`, expected `object`."));
        var J = r({}, X[G], E);
        for (var Q in J) {
          var de = E[Q];
          if (n(E, Q) && typeof de != "function")
            return k(z, Y, U, Q, re(de));
          if (!de)
            return new d(
              "Invalid " + Y + " `" + U + "` key `" + Q + "` supplied to `" + z + "`.\nBad object: " + JSON.stringify(X[G], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(E), null, "  ")
            );
          var A = de(q, Q, z, Y, U + "." + Q, t);
          if (A)
            return A;
        }
        return null;
      }
      return g(I);
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
                var z = G.value;
                if (z && !Z(z[1]))
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
    function re(E) {
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
      var I = re(E);
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
    function F(E) {
      return !E.constructor || !E.constructor.name ? v : E.constructor.name;
    }
    return c.checkPropTypes = o, c.resetWarningCache = o.resetWarningCache, c.PropTypes = c, c;
  }, Fn;
}
var zn, ya;
function Rc() {
  if (ya)
    return zn;
  ya = 1;
  var e = No();
  function r() {
  }
  function t() {
  }
  return t.resetWarningCache = r, zn = function() {
    function n(i, s, l, u, f, b) {
      if (b !== e) {
        var v = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw v.name = "Invariant Violation", v;
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
  }, zn;
}
if (process.env.NODE_ENV !== "production") {
  var Pc = Ki(), _c = !0;
  ro.exports = Oc()(Pc.isElement, _c);
} else
  ro.exports = Rc()();
var $c = ro.exports;
const m = /* @__PURE__ */ xc($c);
function Ic(e) {
  const {
    prototype: r = {}
  } = e;
  return !!r.isReactComponent;
}
function Zi(e, r, t, n, o) {
  const a = e[r], i = o || r;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let s;
  const l = a.type;
  return typeof l == "function" && !Ic(l) && (s = "Did you accidentally use a plain function component for an element instead?"), s !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${t}\`. Expected an element that can hold a ref. ${s} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Qi = xo(m.element, Zi);
Qi.isRequired = xo(m.element.isRequired, Zi);
const es = Qi, Ac = "exact-prop: ​";
function Mc(e) {
  return process.env.NODE_ENV === "production" ? e : $({}, e, {
    [Ac]: (r) => {
      const t = Object.keys(r).filter((n) => !e.hasOwnProperty(n));
      return t.length > 0 ? new Error(`The following props are not supported: ${t.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Hr(e) {
  let r = "https://mui.com/production-error/?code=" + e;
  for (let t = 1; t < arguments.length; t += 1)
    r += "&args[]=" + encodeURIComponent(arguments[t]);
  return "Minified MUI error #" + e + "; visit " + r + " for the full message.";
}
var to = { exports: {} }, pe = {};
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
function Dc() {
  if (xa)
    return pe;
  xa = 1;
  var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), c = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function d(g) {
    if (typeof g == "object" && g !== null) {
      var y = g.$$typeof;
      switch (y) {
        case e:
          switch (g = g.type, g) {
            case t:
            case o:
            case n:
            case u:
            case f:
              return g;
            default:
              switch (g = g && g.$$typeof, g) {
                case s:
                case i:
                case l:
                case v:
                case b:
                case a:
                  return g;
                default:
                  return y;
              }
          }
        case r:
          return y;
      }
    }
  }
  return pe.ContextConsumer = i, pe.ContextProvider = a, pe.Element = e, pe.ForwardRef = l, pe.Fragment = t, pe.Lazy = v, pe.Memo = b, pe.Portal = r, pe.Profiler = o, pe.StrictMode = n, pe.Suspense = u, pe.SuspenseList = f, pe.isAsyncMode = function() {
    return !1;
  }, pe.isConcurrentMode = function() {
    return !1;
  }, pe.isContextConsumer = function(g) {
    return d(g) === i;
  }, pe.isContextProvider = function(g) {
    return d(g) === a;
  }, pe.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, pe.isForwardRef = function(g) {
    return d(g) === l;
  }, pe.isFragment = function(g) {
    return d(g) === t;
  }, pe.isLazy = function(g) {
    return d(g) === v;
  }, pe.isMemo = function(g) {
    return d(g) === b;
  }, pe.isPortal = function(g) {
    return d(g) === r;
  }, pe.isProfiler = function(g) {
    return d(g) === o;
  }, pe.isStrictMode = function(g) {
    return d(g) === n;
  }, pe.isSuspense = function(g) {
    return d(g) === u;
  }, pe.isSuspenseList = function(g) {
    return d(g) === f;
  }, pe.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === t || g === o || g === n || g === u || g === f || g === c || typeof g == "object" && g !== null && (g.$$typeof === v || g.$$typeof === b || g.$$typeof === a || g.$$typeof === i || g.$$typeof === l || g.$$typeof === h || g.getModuleId !== void 0);
  }, pe.typeOf = d, pe;
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
function Bc() {
  return Na || (Na = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), r = Symbol.for("react.portal"), t = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), s = Symbol.for("react.server_context"), l = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), v = Symbol.for("react.lazy"), c = Symbol.for("react.offscreen"), h = !1, d = !1, g = !1, y = !1, C = !1, N;
    N = Symbol.for("react.module.reference");
    function x(L) {
      return !!(typeof L == "string" || typeof L == "function" || L === t || L === o || C || L === n || L === u || L === f || y || L === c || h || d || g || typeof L == "object" && L !== null && (L.$$typeof === v || L.$$typeof === b || L.$$typeof === a || L.$$typeof === i || L.$$typeof === l || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      L.$$typeof === N || L.getModuleId !== void 0));
    }
    function w(L) {
      if (typeof L == "object" && L !== null) {
        var xe = L.$$typeof;
        switch (xe) {
          case e:
            var Fe = L.type;
            switch (Fe) {
              case t:
              case o:
              case n:
              case u:
              case f:
                return Fe;
              default:
                var fr = Fe && Fe.$$typeof;
                switch (fr) {
                  case s:
                  case i:
                  case l:
                  case v:
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
    var O = i, _ = a, B = e, S = l, P = t, k = v, j = b, V = r, Z = o, K = n, H = u, re = f, ae = !1, F = !1;
    function E(L) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function I(L) {
      return F || (F = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function X(L) {
      return w(L) === i;
    }
    function G(L) {
      return w(L) === a;
    }
    function z(L) {
      return typeof L == "object" && L !== null && L.$$typeof === e;
    }
    function Y(L) {
      return w(L) === l;
    }
    function U(L) {
      return w(L) === t;
    }
    function q(L) {
      return w(L) === v;
    }
    function W(L) {
      return w(L) === b;
    }
    function J(L) {
      return w(L) === r;
    }
    function Q(L) {
      return w(L) === o;
    }
    function de(L) {
      return w(L) === n;
    }
    function A(L) {
      return w(L) === u;
    }
    function Ne(L) {
      return w(L) === f;
    }
    le.ContextConsumer = O, le.ContextProvider = _, le.Element = B, le.ForwardRef = S, le.Fragment = P, le.Lazy = k, le.Memo = j, le.Portal = V, le.Profiler = Z, le.StrictMode = K, le.Suspense = H, le.SuspenseList = re, le.isAsyncMode = E, le.isConcurrentMode = I, le.isContextConsumer = X, le.isContextProvider = G, le.isElement = z, le.isForwardRef = Y, le.isFragment = U, le.isLazy = q, le.isMemo = W, le.isPortal = J, le.isProfiler = Q, le.isStrictMode = de, le.isSuspense = A, le.isSuspenseList = Ne, le.isValidElementType = x, le.typeOf = w;
  }()), le;
}
process.env.NODE_ENV === "production" ? to.exports = Dc() : to.exports = Bc();
var ka = to.exports;
const jc = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Vc(e) {
  const r = `${e}`.match(jc);
  return r && r[1] || "";
}
function rs(e, r = "") {
  return e.displayName || e.name || Vc(e) || r;
}
function Ea(e, r, t) {
  const n = rs(r);
  return e.displayName || (n !== "" ? `${t}(${n})` : t);
}
function Lc(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return rs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ka.ForwardRef:
          return Ea(e, e.render, "ForwardRef");
        case ka.Memo:
          return Ea(e, e.type, "memo");
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
const Fc = m.oneOfType([m.func, m.object]), ts = Fc;
function qe(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Hr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function zc(...e) {
  return e.reduce((r, t) => t == null ? r : function(...o) {
    r.apply(this, o), t.apply(this, o);
  }, () => {
  });
}
function Gc(e, r = 166) {
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
function Uc(e, r) {
  return process.env.NODE_ENV === "production" ? () => null : (t, n, o, a, i) => {
    const s = o || "<<anonymous>>", l = i || n;
    return typeof t[n] < "u" ? new Error(`The ${a} \`${l}\` of \`${s}\` is deprecated. ${r}`) : null;
  };
}
function Hc(e, r) {
  var t, n;
  return /* @__PURE__ */ M.isValidElement(e) && r.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (t = e.type.muiName) != null ? t : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function Jt(e) {
  return e && e.ownerDocument || document;
}
function Xc(e) {
  return Jt(e).defaultView || window;
}
function Wc(e, r) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const t = r ? $({}, r.propTypes) : null;
  return (o) => (a, i, s, l, u, ...f) => {
    const b = u || i, v = t == null ? void 0 : t[b];
    if (v) {
      const c = v(a, i, s, l, u, ...f);
      if (c)
        return c;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Zt(e, r) {
  typeof e == "function" ? e(r) : e && (e.current = r);
}
const Yc = typeof window < "u" ? M.useLayoutEffect : M.useEffect, Xr = Yc;
let Ta = 0;
function qc(e) {
  const [r, t] = M.useState(e), n = e || r;
  return M.useEffect(() => {
    r == null && (Ta += 1, t(`mui-${Ta}`));
  }, [r]), n;
}
const Sa = M["useId".toString()];
function ns(e) {
  if (Sa !== void 0) {
    const r = Sa();
    return e ?? r;
  }
  return qc(e);
}
function Kc(e, r, t, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || r;
  return typeof e[r] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function os({
  controlled: e,
  default: r,
  name: t,
  state: n = "value"
}) {
  const {
    current: o
  } = M.useRef(e !== void 0), [a, i] = M.useState(r), s = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    M.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${t} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${t} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, t, e]);
    const {
      current: u
    } = M.useRef(r);
    M.useEffect(() => {
      !o && u !== r && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${t} after being initialized. To suppress this warning opt to use a controlled ${t}.`].join(`
`));
    }, [JSON.stringify(r)]);
  }
  const l = M.useCallback((u) => {
    o || i(u);
  }, []);
  return [s, l];
}
function no(e) {
  const r = M.useRef(e);
  return Xr(() => {
    r.current = e;
  }), M.useRef((...t) => (
    // @ts-expect-error hide `this`
    (0, r.current)(...t)
  )).current;
}
function Sr(...e) {
  return M.useMemo(() => e.every((r) => r == null) ? null : (r) => {
    e.forEach((t) => {
      Zt(t, r);
    });
  }, e);
}
const Ca = {};
function Jc(e, r) {
  const t = M.useRef(Ca);
  return t.current === Ca && (t.current = e(r)), t;
}
const Zc = [];
function Qc(e) {
  M.useEffect(e, Zc);
}
class Rt {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Rt();
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
function ct() {
  const e = Jc(Rt.create).current;
  return Qc(e.disposeEffect), e;
}
let mn = !0, oo = !1;
const ed = new Rt(), rd = {
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
function td(e) {
  const {
    type: r,
    tagName: t
  } = e;
  return !!(t === "INPUT" && rd[r] && !e.readOnly || t === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function nd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (mn = !0);
}
function Gn() {
  mn = !1;
}
function od() {
  this.visibilityState === "hidden" && oo && (mn = !0);
}
function ad(e) {
  e.addEventListener("keydown", nd, !0), e.addEventListener("mousedown", Gn, !0), e.addEventListener("pointerdown", Gn, !0), e.addEventListener("touchstart", Gn, !0), e.addEventListener("visibilitychange", od, !0);
}
function id(e) {
  const {
    target: r
  } = e;
  try {
    return r.matches(":focus-visible");
  } catch {
  }
  return mn || td(r);
}
function as() {
  const e = M.useCallback((o) => {
    o != null && ad(o.ownerDocument);
  }, []), r = M.useRef(!1);
  function t() {
    return r.current ? (oo = !0, ed.start(100, () => {
      oo = !1;
    }), r.current = !1, !0) : !1;
  }
  function n(o) {
    return id(o) ? (r.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: r,
    onFocus: n,
    onBlur: t,
    ref: e
  };
}
function is(e, r) {
  const t = $({}, r);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      t[n] = $({}, e[n], t[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = r[n];
      t[n] = {}, !a || !Object.keys(a) ? t[n] = o : !o || !Object.keys(o) ? t[n] = a : (t[n] = $({}, a), Object.keys(o).forEach((i) => {
        t[n][i] = is(o[i], a[i]);
      }));
    } else
      t[n] === void 0 && (t[n] = e[n]);
  }), t;
}
function ko(e, r, t = void 0) {
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
const Oa = (e) => e, sd = () => {
  let e = Oa;
  return {
    configure(r) {
      e = r;
    },
    generate(r) {
      return e(r);
    },
    reset() {
      e = Oa;
    }
  };
}, pd = sd(), ss = pd, ps = {
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
  const n = ps[r];
  return n ? `${t}-${n}` : `${ss.generate(e)}-${r}`;
}
function ls(e, r, t = "Mui") {
  const n = {};
  return r.forEach((o) => {
    n[o] = hn(e, o, t);
  }), n;
}
function ld(e, r = Number.MIN_SAFE_INTEGER, t = Number.MAX_SAFE_INTEGER) {
  return Math.max(r, Math.min(e, t));
}
function ke(e, r) {
  if (e == null)
    return {};
  var t = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(r.indexOf(o) >= 0) && (t[o] = e[o]);
  return t;
}
const cd = ["values", "unit", "step"], dd = (e) => {
  const r = Object.keys(e).map((t) => ({
    key: t,
    val: e[t]
  })) || [];
  return r.sort((t, n) => t.val - n.val), r.reduce((t, n) => $({}, t, {
    [n.key]: n.val
  }), {});
};
function ud(e) {
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
  } = e, o = ke(e, cd), a = dd(r), i = Object.keys(a);
  function s(v) {
    return `@media (min-width:${typeof r[v] == "number" ? r[v] : v}${t})`;
  }
  function l(v) {
    return `@media (max-width:${(typeof r[v] == "number" ? r[v] : v) - n / 100}${t})`;
  }
  function u(v, c) {
    const h = i.indexOf(c);
    return `@media (min-width:${typeof r[v] == "number" ? r[v] : v}${t}) and (max-width:${(h !== -1 && typeof r[i[h]] == "number" ? r[i[h]] : c) - n / 100}${t})`;
  }
  function f(v) {
    return i.indexOf(v) + 1 < i.length ? u(v, i[i.indexOf(v) + 1]) : s(v);
  }
  function b(v) {
    const c = i.indexOf(v);
    return c === 0 ? s(i[1]) : c === i.length - 1 ? l(i[c]) : u(v, i[i.indexOf(v) + 1]).replace("@media", "@media not all and");
  }
  return $({
    keys: i,
    values: a,
    up: s,
    down: l,
    between: u,
    only: f,
    not: b,
    unit: t
  }, o);
}
const fd = {
  borderRadius: 4
}, md = fd, hd = process.env.NODE_ENV !== "production" ? m.oneOfType([m.number, m.string, m.object, m.array]) : {}, dr = hd;
function ht(e, r) {
  return r ? Qe(e, r, {
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
function er(e, r, t) {
  const n = e.theme || {};
  if (Array.isArray(r)) {
    const a = n.breakpoints || Ra;
    return r.reduce((i, s, l) => (i[a.up(a.keys[l])] = t(r[l]), i), {});
  }
  if (typeof r == "object") {
    const a = n.breakpoints || Ra;
    return Object.keys(r).reduce((i, s) => {
      if (Object.keys(a.values || Eo).indexOf(s) !== -1) {
        const l = a.up(s);
        i[l] = t(r[s], s);
      } else {
        const l = s;
        i[l] = r[l];
      }
      return i;
    }, {});
  }
  return t(r);
}
function gd(e = {}) {
  var r;
  return ((r = e.keys) == null ? void 0 : r.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function vd(e, r) {
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
    const s = i[r], l = i.theme, u = gn(l, n) || {};
    return er(i, s, (b) => {
      let v = Qt(u, o, b);
      return b === v && typeof b == "string" && (v = Qt(u, o, `${r}${b === "default" ? "" : qe(b)}`, b)), t === !1 ? v : {
        [t]: v
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [r]: dr
  } : {}, a.filterProps = [r], a;
}
function bd(e) {
  const r = {};
  return (t) => (r[t] === void 0 && (r[t] = e(t)), r[t]);
}
const wd = {
  m: "margin",
  p: "padding"
}, yd = {
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
}, xd = bd((e) => {
  if (e.length > 2)
    if (Pa[e])
      e = Pa[e];
    else
      return [e];
  const [r, t] = e.split(""), n = wd[r], o = yd[t] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), vn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], bn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Nd = [...vn, ...bn];
function Pt(e, r, t, n) {
  var o;
  const a = (o = gn(e, r, !1)) != null ? o : t;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${r}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${r}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${r}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function cs(e) {
  return Pt(e, "spacing", 8, "spacing");
}
function _t(e, r) {
  if (typeof r == "string" || r == null)
    return r;
  const t = Math.abs(r), n = e(t);
  return r >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function kd(e, r) {
  return (t) => e.reduce((n, o) => (n[o] = _t(r, t), n), {});
}
function Ed(e, r, t, n) {
  if (r.indexOf(t) === -1)
    return null;
  const o = xd(t), a = kd(o, n), i = e[t];
  return er(e, i, a);
}
function ds(e, r) {
  const t = cs(e.theme);
  return Object.keys(e).map((n) => Ed(e, r, n, t)).reduce(ht, {});
}
function ge(e) {
  return ds(e, vn);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? vn.reduce((e, r) => (e[r] = dr, e), {}) : {};
ge.filterProps = vn;
function ve(e) {
  return ds(e, bn);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? bn.reduce((e, r) => (e[r] = dr, e), {}) : {};
ve.filterProps = bn;
process.env.NODE_ENV !== "production" && Nd.reduce((e, r) => (e[r] = dr, e), {});
function Td(e = 8) {
  if (e.mui)
    return e;
  const r = cs({
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
  }), n), {}), t = (n) => Object.keys(n).reduce((o, a) => r[a] ? ht(o, r[a](n)) : o, {});
  return t.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, t.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), t;
}
function De(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Le(e, r) {
  return we({
    prop: e,
    themeKey: "borders",
    transform: r
  });
}
const Sd = Le("border", De), Cd = Le("borderTop", De), Od = Le("borderRight", De), Rd = Le("borderBottom", De), Pd = Le("borderLeft", De), _d = Le("borderColor"), $d = Le("borderTopColor"), Id = Le("borderRightColor"), Ad = Le("borderBottomColor"), Md = Le("borderLeftColor"), Dd = Le("outline", De), Bd = Le("outlineColor"), yn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const r = Pt(e.theme, "shape.borderRadius", 4, "borderRadius"), t = (n) => ({
      borderRadius: _t(r, n)
    });
    return er(e, e.borderRadius, t);
  }
  return null;
};
yn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: dr
} : {};
yn.filterProps = ["borderRadius"];
wn(Sd, Cd, Od, Rd, Pd, _d, $d, Id, Ad, Md, yn, Dd, Bd);
const xn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const r = Pt(e.theme, "spacing", 8, "gap"), t = (n) => ({
      gap: _t(r, n)
    });
    return er(e, e.gap, t);
  }
  return null;
};
xn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: dr
} : {};
xn.filterProps = ["gap"];
const Nn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const r = Pt(e.theme, "spacing", 8, "columnGap"), t = (n) => ({
      columnGap: _t(r, n)
    });
    return er(e, e.columnGap, t);
  }
  return null;
};
Nn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: dr
} : {};
Nn.filterProps = ["columnGap"];
const kn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const r = Pt(e.theme, "spacing", 8, "rowGap"), t = (n) => ({
      rowGap: _t(r, n)
    });
    return er(e, e.rowGap, t);
  }
  return null;
};
kn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: dr
} : {};
kn.filterProps = ["rowGap"];
const jd = we({
  prop: "gridColumn"
}), Vd = we({
  prop: "gridRow"
}), Ld = we({
  prop: "gridAutoFlow"
}), Fd = we({
  prop: "gridAutoColumns"
}), zd = we({
  prop: "gridAutoRows"
}), Gd = we({
  prop: "gridTemplateColumns"
}), Ud = we({
  prop: "gridTemplateRows"
}), Hd = we({
  prop: "gridTemplateAreas"
}), Xd = we({
  prop: "gridArea"
});
wn(xn, Nn, kn, jd, Vd, Ld, Fd, zd, Gd, Ud, Hd, Xd);
function Fr(e, r) {
  return r === "grey" ? r : e;
}
const Wd = we({
  prop: "color",
  themeKey: "palette",
  transform: Fr
}), Yd = we({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Fr
}), qd = we({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Fr
});
wn(Wd, Yd, qd);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Kd = we({
  prop: "width",
  transform: Ie
}), To = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const r = (t) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[t]) || Eo[t];
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
To.filterProps = ["maxWidth"];
const Jd = we({
  prop: "minWidth",
  transform: Ie
}), Zd = we({
  prop: "height",
  transform: Ie
}), Qd = we({
  prop: "maxHeight",
  transform: Ie
}), eu = we({
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
const ru = we({
  prop: "boxSizing"
});
wn(Kd, To, Jd, Zd, Qd, eu, ru);
const tu = {
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
    style: yn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Fr
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Fr
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Fr
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
    style: kn
  },
  columnGap: {
    style: Nn
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
}, So = tu;
function nu(...e) {
  const r = e.reduce((n, o) => n.concat(Object.keys(o)), []), t = new Set(r);
  return e.every((n) => t.size === Object.keys(n).length);
}
function ou(e, r) {
  return typeof e == "function" ? e(r) : e;
}
function au() {
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
      cssProperty: l = t,
      themeKey: u,
      transform: f,
      style: b
    } = s;
    if (n == null)
      return null;
    if (u === "typography" && n === "inherit")
      return {
        [t]: n
      };
    const v = gn(o, u) || {};
    return b ? b(i) : er(i, n, (h) => {
      let d = Qt(v, f, h);
      return h === d && typeof h == "string" && (d = Qt(v, f, `${t}${h === "default" ? "" : qe(h)}`, h)), l === !1 ? d : {
        [l]: d
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
    const i = (n = a.unstable_sxConfig) != null ? n : So;
    function s(l) {
      let u = l;
      if (typeof l == "function")
        u = l(a);
      else if (typeof l != "object")
        return l;
      if (!u)
        return null;
      const f = gd(a.breakpoints), b = Object.keys(f);
      let v = f;
      return Object.keys(u).forEach((c) => {
        const h = ou(u[c], a);
        if (h != null)
          if (typeof h == "object")
            if (i[c])
              v = ht(v, e(c, h, a, i));
            else {
              const d = er({
                theme: a
              }, h, (g) => ({
                [c]: g
              }));
              nu(d, h) ? v[c] = r({
                sx: h,
                theme: a
              }) : v = ht(v, d);
            }
          else
            v = ht(v, e(c, h, a, i));
      }), vd(b, v);
    }
    return Array.isArray(o) ? o.map(s) : s(o);
  }
  return r;
}
const us = au();
us.filterProps = ["sx"];
const Co = us;
function iu(e, r) {
  const t = this;
  return t.vars && typeof t.getColorSchemeSelector == "function" ? {
    [t.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: r
  } : t.palette.mode === e ? r : {};
}
const su = ["breakpoints", "palette", "spacing", "shape"];
function Oo(e = {}, ...r) {
  const {
    breakpoints: t = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = ke(e, su), s = ud(t), l = Td(o);
  let u = Qe({
    breakpoints: s,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: $({
      mode: "light"
    }, n),
    spacing: l,
    shape: $({}, md, a)
  }, i);
  return u.applyStyles = iu, u = r.reduce((f, b) => Qe(f, b), u), u.unstable_sxConfig = $({}, So, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(b) {
    return Co({
      sx: b,
      theme: this
    });
  }, u;
}
function pu(e) {
  return Object.keys(e).length === 0;
}
function fs(e = null) {
  const r = M.useContext(rl);
  return !r || pu(r) ? e : r;
}
const lu = Oo();
function ms(e = lu) {
  return fs(e);
}
const cu = ["ownerState"], du = ["variants"], uu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function fu(e) {
  return Object.keys(e).length === 0;
}
function mu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Wt(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const hu = Oo(), _a = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function zt({
  defaultTheme: e,
  theme: r,
  themeId: t
}) {
  return fu(r) ? e : r[t] || r;
}
function gu(e) {
  return e ? (r, t) => t[e] : null;
}
function Yt(e, r) {
  let {
    ownerState: t
  } = r, n = ke(r, cu);
  const o = typeof e == "function" ? e($({
    ownerState: t
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => Yt(a, $({
      ownerState: t
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let s = ke(o, du);
    return a.forEach((l) => {
      let u = !0;
      typeof l.props == "function" ? u = l.props($({
        ownerState: t
      }, n, t)) : Object.keys(l.props).forEach((f) => {
        (t == null ? void 0 : t[f]) !== l.props[f] && n[f] !== l.props[f] && (u = !1);
      }), u && (Array.isArray(s) || (s = [s]), s.push(typeof l.style == "function" ? l.style($({
        ownerState: t
      }, n, t)) : l.style));
    }), s;
  }
  return o;
}
function vu(e = {}) {
  const {
    themeId: r,
    defaultTheme: t = hu,
    rootShouldForwardProp: n = Wt,
    slotShouldForwardProp: o = Wt
  } = e, a = (i) => Co($({}, i, {
    theme: zt($({}, i, {
      defaultTheme: t,
      themeId: r
    }))
  }));
  return a.__mui_systemSx = !0, (i, s = {}) => {
    tl(i, (w) => w.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: l,
      slot: u,
      skipVariantsResolver: f,
      skipSx: b,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: v = gu(_a(u))
    } = s, c = ke(s, uu), h = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), d = b || !1;
    let g;
    process.env.NODE_ENV !== "production" && l && (g = `${l}-${_a(u || "Root")}`);
    let y = Wt;
    u === "Root" || u === "root" ? y = n : u ? y = o : mu(i) && (y = void 0);
    const C = el(i, $({
      shouldForwardProp: y,
      label: g
    }, c)), N = (w) => typeof w == "function" && w.__emotion_real !== w || yr(w) ? (O) => Yt(w, $({}, O, {
      theme: zt({
        theme: O.theme,
        defaultTheme: t,
        themeId: r
      })
    })) : w, x = (w, ...O) => {
      let _ = N(w);
      const B = O ? O.map(N) : [];
      l && v && B.push((k) => {
        const j = zt($({}, k, {
          defaultTheme: t,
          themeId: r
        }));
        if (!j.components || !j.components[l] || !j.components[l].styleOverrides)
          return null;
        const V = j.components[l].styleOverrides, Z = {};
        return Object.entries(V).forEach(([K, H]) => {
          Z[K] = Yt(H, $({}, k, {
            theme: j
          }));
        }), v(k, Z);
      }), l && !h && B.push((k) => {
        var j;
        const V = zt($({}, k, {
          defaultTheme: t,
          themeId: r
        })), Z = V == null || (j = V.components) == null || (j = j[l]) == null ? void 0 : j.variants;
        return Yt({
          variants: Z
        }, $({}, k, {
          theme: V
        }));
      }), d || B.push(a);
      const S = B.length - O.length;
      if (Array.isArray(w) && S > 0) {
        const k = new Array(S).fill("");
        _ = [...w, ...k], _.raw = [...w.raw, ...k];
      }
      const P = C(_, ...B);
      if (process.env.NODE_ENV !== "production") {
        let k;
        l && (k = `${l}${qe(u || "")}`), k === void 0 && (k = `Styled(${Lc(i)})`), P.displayName = k;
      }
      return i.muiName && (P.muiName = i.muiName), P;
    };
    return C.withConfig && (x.withConfig = C.withConfig), x;
  };
}
function bu(e) {
  const {
    theme: r,
    name: t,
    props: n
  } = e;
  return !r || !r.components || !r.components[t] || !r.components[t].defaultProps ? n : is(r.components[t].defaultProps, n);
}
function wu({
  props: e,
  name: r,
  defaultTheme: t,
  themeId: n
}) {
  let o = ms(t);
  return n && (o = o[n] || o), bu({
    theme: o,
    name: r,
    props: e
  });
}
function Ro(e, r = 0, t = 1) {
  return process.env.NODE_ENV !== "production" && (e < r || e > t) && console.error(`MUI: The value provided ${e} is out of range [${r}, ${t}].`), ld(e, r, t);
}
function yu(e) {
  e = e.slice(1);
  const r = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let t = e.match(r);
  return t && t[0].length === 1 && (t = t.map((n) => n + n)), t ? `rgb${t.length === 4 ? "a" : ""}(${t.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Cr(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Cr(yu(e));
  const r = e.indexOf("("), t = e.substring(0, r);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(t) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Hr(9, e));
  let n = e.substring(r + 1, e.length - 1), o;
  if (t === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Hr(10, o));
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
function xu(e) {
  e = Cr(e);
  const {
    values: r
  } = e, t = r[0], n = r[1] / 100, o = r[2] / 100, a = n * Math.min(o, 1 - o), i = (u, f = (u + t / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let s = "rgb";
  const l = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (s += "a", l.push(r[3])), En({
    type: s,
    values: l
  });
}
function $a(e) {
  e = Cr(e);
  let r = e.type === "hsl" || e.type === "hsla" ? Cr(xu(e)).values : e.values;
  return r = r.map((t) => (e.type !== "color" && (t /= 255), t <= 0.03928 ? t / 12.92 : ((t + 0.055) / 1.055) ** 2.4)), Number((0.2126 * r[0] + 0.7152 * r[1] + 0.0722 * r[2]).toFixed(3));
}
function Ia(e, r) {
  const t = $a(e), n = $a(r);
  return (Math.max(t, n) + 0.05) / (Math.min(t, n) + 0.05);
}
function hs(e, r) {
  return e = Cr(e), r = Ro(r), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${r}` : e.values[3] = r, En(e);
}
function Nu(e, r) {
  if (e = Cr(e), r = Ro(r), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - r;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] *= 1 - r;
  return En(e);
}
function ku(e, r) {
  if (e = Cr(e), r = Ro(r), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * r;
  else if (e.type.indexOf("rgb") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (255 - e.values[t]) * r;
  else if (e.type.indexOf("color") !== -1)
    for (let t = 0; t < 3; t += 1)
      e.values[t] += (1 - e.values[t]) * r;
  return En(e);
}
function Eu(e, r) {
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
  }, r);
}
const Tu = {
  black: "#000",
  white: "#fff"
}, Et = Tu, Su = {
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
}, Ir = Ou, Ru = {
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
}, Ar = Ru, Pu = {
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
}, at = Pu, _u = {
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
}, Mr = _u, $u = {
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
}, Dr = $u, Iu = {
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
}, Br = Iu, Au = ["mode", "contrastThreshold", "tonalOffset"], Aa = {
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
    paper: Et.white,
    default: Et.white
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
}, Un = {
  text: {
    primary: Et.white,
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
    active: Et.white,
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
  e[r] || (e.hasOwnProperty(t) ? e[r] = e[t] : r === "light" ? e.light = ku(e.main, o) : r === "dark" && (e.dark = Nu(e.main, a)));
}
function Mu(e = "light") {
  return e === "dark" ? {
    main: Mr[200],
    light: Mr[50],
    dark: Mr[400]
  } : {
    main: Mr[700],
    light: Mr[400],
    dark: Mr[800]
  };
}
function Du(e = "light") {
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
function Bu(e = "light") {
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
function ju(e = "light") {
  return e === "dark" ? {
    main: Dr[400],
    light: Dr[300],
    dark: Dr[700]
  } : {
    main: Dr[700],
    light: Dr[500],
    dark: Dr[900]
  };
}
function Vu(e = "light") {
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
function Lu(e = "light") {
  return e === "dark" ? {
    main: at[400],
    light: at[300],
    dark: at[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: at[500],
    dark: at[900]
  };
}
function Fu(e) {
  const {
    mode: r = "light",
    contrastThreshold: t = 3,
    tonalOffset: n = 0.2
  } = e, o = ke(e, Au), a = e.primary || Mu(r), i = e.secondary || Du(r), s = e.error || Bu(r), l = e.info || ju(r), u = e.success || Vu(r), f = e.warning || Lu(r);
  function b(d) {
    const g = Ia(d, Un.text.primary) >= t ? Un.text.primary : Aa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const y = Ia(d, g);
      y < 3 && console.error([`MUI: The contrast ratio of ${y}:1 for ${g} on ${d}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const v = ({
    color: d,
    name: g,
    mainShade: y = 500,
    lightShade: C = 300,
    darkShade: N = 700
  }) => {
    if (d = $({}, d), !d.main && d[y] && (d.main = d[y]), !d.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${y}\` property.` : Hr(11, g ? ` (${g})` : "", y));
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
} });` : Hr(12, g ? ` (${g})` : "", JSON.stringify(d.main)));
    return Ma(d, "light", C, n), Ma(d, "dark", N, n), d.contrastText || (d.contrastText = b(d.main)), d;
  }, c = {
    dark: Un,
    light: Aa
  };
  return process.env.NODE_ENV !== "production" && (c[r] || console.error(`MUI: The palette mode \`${r}\` is not supported.`)), Qe($({
    // A collection of common colors.
    common: $({}, Et),
    // prevent mutable object.
    // The palette mode, can be light or dark.
    mode: r,
    // The colors used to represent primary interface elements for a user.
    primary: v({
      color: a,
      name: "primary"
    }),
    // The colors used to represent secondary interface elements for a user.
    secondary: v({
      color: i,
      name: "secondary",
      mainShade: "A400",
      lightShade: "A200",
      darkShade: "A700"
    }),
    // The colors used to represent interface elements that the user should be made aware of.
    error: v({
      color: s,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: v({
      color: f,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: v({
      color: l,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: v({
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: Cu,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: t,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: b,
    // Generate a rich color object.
    augmentColor: v,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, c[r]), o);
}
const zu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Gu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Da = {
  textTransform: "uppercase"
}, Ba = '"Roboto", "Helvetica", "Arial", sans-serif';
function Uu(e, r) {
  const t = typeof r == "function" ? r(e) : r, {
    fontFamily: n = Ba,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: s = 500,
    fontWeightBold: l = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: u = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: b
  } = t, v = ke(t, zu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const c = o / 14, h = b || ((y) => `${y / u * c}rem`), d = (y, C, N, x, w) => $({
    fontFamily: n,
    fontWeight: y,
    fontSize: h(C),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: N
  }, n === Ba ? {
    letterSpacing: `${Gu(x / C)}em`
  } : {}, w, f), g = {
    h1: d(a, 96, 1.167, -1.5),
    h2: d(a, 60, 1.2, -0.5),
    h3: d(i, 48, 1.167, 0),
    h4: d(i, 34, 1.235, 0.25),
    h5: d(i, 24, 1.334, 0),
    h6: d(s, 20, 1.6, 0.15),
    subtitle1: d(i, 16, 1.75, 0.15),
    subtitle2: d(s, 14, 1.57, 0.1),
    body1: d(i, 16, 1.5, 0.15),
    body2: d(i, 14, 1.43, 0.15),
    button: d(s, 14, 1.75, 0.4, Da),
    caption: d(i, 12, 1.66, 0.4),
    overline: d(i, 12, 2.66, 1, Da),
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
    pxToRem: h,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: s,
    fontWeightBold: l
  }, g), v, {
    clone: !1
    // No need to clone deep
  });
}
const Hu = 0.2, Xu = 0.14, Wu = 0.12;
function he(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Hu})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Xu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Wu})`].join(",");
}
const Yu = ["none", he(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), he(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), he(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), he(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), he(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), he(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), he(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), he(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), he(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), he(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), he(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), he(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), he(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), he(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), he(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), he(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), he(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), he(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), he(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), he(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), he(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), he(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), he(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), he(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], qu = Yu, Ku = ["duration", "easing", "delay"], Ju = {
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
  const r = e / 36;
  return Math.round((4 + 15 * r ** 0.25 + r / 5) * 10);
}
function ef(e) {
  const r = $({}, Ju, e.easing), t = $({}, Zu, e.duration);
  return $({
    getAutoHeightDuration: Qu,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = t.standard,
        easing: s = r.easeInOut,
        delay: l = 0
      } = a, u = ke(a, Ku);
      if (process.env.NODE_ENV !== "production") {
        const f = (v) => typeof v == "string", b = (v) => !isNaN(parseFloat(v));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !b(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(s) || console.error('MUI: Argument "easing" must be a string.'), !b(l) && !f(l) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : ja(i)} ${s} ${typeof l == "string" ? l : ja(l)}`).join(",");
    }
  }, e, {
    easing: r,
    duration: t
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
}, tf = rf, nf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function of(e = {}, ...r) {
  const {
    mixins: t = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = ke(e, nf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Hr(18));
  const s = Fu(n), l = Oo(e);
  let u = Qe(l, {
    mixins: Eu(l.breakpoints, t),
    palette: s,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: qu.slice(),
    typography: Uu(s, a),
    transitions: ef(o),
    zIndex: $({}, tf)
  });
  if (u = Qe(u, i), u = r.reduce((f, b) => Qe(f, b), u), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], b = (v, c) => {
      let h;
      for (h in v) {
        const d = v[h];
        if (f.indexOf(h) !== -1 && Object.keys(d).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = hn("", h);
            console.error([`MUI: The \`${c}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(v, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: d
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          v[h] = {};
        }
      }
    };
    Object.keys(u.components).forEach((v) => {
      const c = u.components[v].styleOverrides;
      c && v.indexOf("Mui") === 0 && b(c, v);
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
  name: r
}) {
  return wu({
    props: e,
    name: r,
    defaultTheme: Po,
    themeId: _o
  });
}
const sf = (e) => Wt(e) && e !== "classes", pf = vu({
  themeId: _o,
  defaultTheme: Po,
  rootShouldForwardProp: sf
}), $t = pf;
function lf(e) {
  return hn("MuiSvgIcon", e);
}
ls("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const cf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], df = (e) => {
  const {
    color: r,
    fontSize: t,
    classes: n
  } = e, o = {
    root: ["root", r !== "inherit" && `color${qe(r)}`, `fontSize${qe(t)}`]
  };
  return ko(o, lf, n);
}, uf = $t("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, r) => {
    const {
      ownerState: t
    } = e;
    return [r.root, t.color !== "inherit" && r[`color${qe(t.color)}`], r[`fontSize${qe(t.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => {
  var t, n, o, a, i, s, l, u, f, b, v, c, h;
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
      medium: ((s = e.typography) == null || (l = s.pxToRem) == null ? void 0 : l.call(s, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (f = u.pxToRem) == null ? void 0 : f.call(u, 35)) || "2.1875rem"
    }[r.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (b = (v = (e.vars || e).palette) == null || (v = v[r.color]) == null ? void 0 : v.main) != null ? b : {
      action: (c = (e.vars || e).palette) == null || (c = c.action) == null ? void 0 : c.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[r.color]
  };
}), Io = /* @__PURE__ */ M.forwardRef(function(r, t) {
  const n = $o({
    props: r,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: s = "svg",
    fontSize: l = "medium",
    htmlColor: u,
    inheritViewBox: f = !1,
    titleAccess: b,
    viewBox: v = "0 0 24 24"
  } = n, c = ke(n, cf), h = /* @__PURE__ */ M.isValidElement(o) && o.type === "svg", d = $({}, n, {
    color: i,
    component: s,
    fontSize: l,
    instanceFontSize: r.fontSize,
    inheritViewBox: f,
    viewBox: v,
    hasSvgAsChild: h
  }), g = {};
  f || (g.viewBox = v);
  const y = df(d);
  return /* @__PURE__ */ T(uf, $({
    as: s,
    className: kr(y.root, a),
    focusable: "false",
    color: u,
    "aria-hidden": b ? void 0 : !0,
    role: b ? "img" : void 0,
    ref: t
  }, g, c, h && o.props, {
    ownerState: d,
    children: [h ? o.props.children : o, b ? /* @__PURE__ */ p("title", {
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
Io.muiName = "SvgIcon";
const Va = Io;
function gs(e, r) {
  function t(n, o) {
    return /* @__PURE__ */ p(Va, $({
      "data-testid": `${r}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (t.displayName = `${r}Icon`), t.muiName = Va.muiName, /* @__PURE__ */ M.memo(/* @__PURE__ */ M.forwardRef(t));
}
const ff = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ss.configure(e);
  }
}, mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: qe,
  createChainedFunction: zc,
  createSvgIcon: gs,
  debounce: Gc,
  deprecatedPropType: Uc,
  isMuiElement: Hc,
  ownerDocument: Jt,
  ownerWindow: Xc,
  requirePropFactory: Wc,
  setRef: Zt,
  unstable_ClassNameGenerator: ff,
  unstable_useEnhancedEffect: Xr,
  unstable_useId: ns,
  unsupportedProp: Kc,
  useControlled: os,
  useEventCallback: no,
  useForkRef: Sr,
  useIsFocusVisible: as
}, Symbol.toStringTag, { value: "Module" })), hf = /* @__PURE__ */ Nc(mf);
var La;
function gf() {
  return La || (La = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return r.createSvgIcon;
      }
    });
    var r = hf;
  }(Dn)), Dn;
}
var vf = kc;
Object.defineProperty(yo, "__esModule", {
  value: !0
});
var vs = yo.default = void 0, bf = vf(gf()), wf = gp;
vs = yo.default = (0, bf.default)(/* @__PURE__ */ (0, wf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function yf(e) {
  return typeof e == "string";
}
function dt(e, r, t) {
  return e === void 0 || yf(e) ? r : $({}, r, {
    ownerState: $({}, r.ownerState, t)
  });
}
const xf = {
  disableDefaultClasses: !1
}, Nf = /* @__PURE__ */ M.createContext(xf);
function kf(e) {
  const {
    disableDefaultClasses: r
  } = M.useContext(Nf);
  return (t) => r ? "" : e(t);
}
function Ef(e, r = []) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !r.includes(n)).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Tf(e, r, t) {
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
function Sf(e) {
  const {
    getSlotProps: r,
    additionalProps: t,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!r) {
    const c = kr(t == null ? void 0 : t.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = $({}, t == null ? void 0 : t.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), d = $({}, t, o, n);
    return c.length > 0 && (d.className = c), Object.keys(h).length > 0 && (d.style = h), {
      props: d,
      internalRef: void 0
    };
  }
  const i = Ef($({}, o, n)), s = Fa(n), l = Fa(o), u = r(i), f = kr(u == null ? void 0 : u.className, t == null ? void 0 : t.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), b = $({}, u == null ? void 0 : u.style, t == null ? void 0 : t.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), v = $({}, u, t, l, s);
  return f.length > 0 && (v.className = f), Object.keys(b).length > 0 && (v.style = b), {
    props: v,
    internalRef: u.ref
  };
}
const Cf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Of(e) {
  var r;
  const {
    elementType: t,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = ke(e, Cf), s = a ? {} : Tf(n, o), {
    props: l,
    internalRef: u
  } = Sf($({}, i, {
    externalSlotProps: s
  })), f = Sr(u, s == null ? void 0 : s.ref, (r = e.additionalProps) == null ? void 0 : r.ref);
  return dt(t, $({}, l, {
    ref: f
  }), o);
}
const bs = "base";
function Rf(e) {
  return `${bs}--${e}`;
}
function Pf(e, r) {
  return `${bs}-${e}-${r}`;
}
function ws(e, r) {
  const t = ps[r];
  return t ? Rf(t) : Pf(e, r);
}
function _f(e, r) {
  const t = {};
  return r.forEach((n) => {
    t[n] = ws(e, n);
  }), t;
}
function $f(e) {
  return typeof e == "function" ? e() : e;
}
const en = /* @__PURE__ */ M.forwardRef(function(r, t) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = r, [i, s] = M.useState(null), l = Sr(/* @__PURE__ */ M.isValidElement(n) ? n.ref : null, t);
  if (Xr(() => {
    a || s($f(o) || document.body);
  }, [o, a]), Xr(() => {
    if (i && !a)
      return Zt(t, i), () => {
        Zt(t, null);
      };
  }, [t, i, a]), a) {
    if (/* @__PURE__ */ M.isValidElement(n)) {
      const u = {
        ref: l
      };
      return /* @__PURE__ */ M.cloneElement(n, u);
    }
    return /* @__PURE__ */ p(M.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ p(M.Fragment, {
    children: i && /* @__PURE__ */ cl.createPortal(n, i)
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
process.env.NODE_ENV !== "production" && (en["propTypes"] = Mc(en.propTypes));
var Ce = "top", je = "bottom", Ve = "right", Oe = "left", Ao = "auto", It = [Ce, je, Ve, Oe], Wr = "start", Tt = "end", If = "clippingParents", ys = "viewport", it = "popper", Af = "reference", za = /* @__PURE__ */ It.reduce(function(e, r) {
  return e.concat([r + "-" + Wr, r + "-" + Tt]);
}, []), xs = /* @__PURE__ */ [].concat(It, [Ao]).reduce(function(e, r) {
  return e.concat([r, r + "-" + Wr, r + "-" + Tt]);
}, []), Mf = "beforeRead", Df = "read", Bf = "afterRead", jf = "beforeMain", Vf = "main", Lf = "afterMain", Ff = "beforeWrite", zf = "write", Gf = "afterWrite", Uf = [Mf, Df, Bf, jf, Vf, Lf, Ff, zf, Gf];
function Ke(e) {
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
function Hf(e) {
  var r = e.state;
  Object.keys(r.elements).forEach(function(t) {
    var n = r.styles[t] || {}, o = r.attributes[t] || {}, a = r.elements[t];
    !Be(a) || !Ke(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var s = o[i];
      s === !1 ? a.removeAttribute(i) : a.setAttribute(i, s === !0 ? "" : s);
    }));
  });
}
function Xf(e) {
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
      var o = r.elements[n], a = r.attributes[n] || {}, i = Object.keys(r.styles.hasOwnProperty(n) ? r.styles[n] : t[n]), s = i.reduce(function(l, u) {
        return l[u] = "", l;
      }, {});
      !Be(o) || !Ke(o) || (Object.assign(o.style, s), Object.keys(a).forEach(function(l) {
        o.removeAttribute(l);
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
function Xe(e) {
  return e.split("-")[0];
}
var Er = Math.max, rn = Math.min, Yr = Math.round;
function ao() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(r) {
    return r.brand + "/" + r.version;
  }).join(" ") : navigator.userAgent;
}
function Ns() {
  return !/^((?!chrome|android).)*safari/i.test(ao());
}
function qr(e, r, t) {
  r === void 0 && (r = !1), t === void 0 && (t = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  r && Be(e) && (o = e.offsetWidth > 0 && Yr(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Yr(n.height) / e.offsetHeight || 1);
  var i = Or(e) ? Ae(e) : window, s = i.visualViewport, l = !Ns() && t, u = (n.left + (l && s ? s.offsetLeft : 0)) / o, f = (n.top + (l && s ? s.offsetTop : 0)) / a, b = n.width / o, v = n.height / a;
  return {
    width: b,
    height: v,
    top: f,
    right: u + b,
    bottom: f + v,
    left: u,
    x: u,
    y: f
  };
}
function Do(e) {
  var r = qr(e), t = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(r.width - t) <= 1 && (t = r.width), Math.abs(r.height - n) <= 1 && (n = r.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: t,
    height: n
  };
}
function ks(e, r) {
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
function Yf(e) {
  return ["table", "td", "th"].indexOf(Ke(e)) >= 0;
}
function ur(e) {
  return ((Or(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Tn(e) {
  return Ke(e) === "html" ? e : (
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
function qf(e) {
  var r = /firefox/i.test(ao()), t = /Trident/i.test(ao());
  if (t && Be(e)) {
    var n = rr(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Tn(e);
  for (Mo(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(Ke(o)) < 0; ) {
    var a = rr(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || r && a.willChange === "filter" || r && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function At(e) {
  for (var r = Ae(e), t = Ga(e); t && Yf(t) && rr(t).position === "static"; )
    t = Ga(t);
  return t && (Ke(t) === "html" || Ke(t) === "body" && rr(t).position === "static") ? r : t || qf(e) || r;
}
function Bo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function gt(e, r, t) {
  return Er(e, rn(r, t));
}
function Kf(e, r, t) {
  var n = gt(e, r, t);
  return n > t ? t : n;
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
function Ss(e, r) {
  return r.reduce(function(t, n) {
    return t[n] = e, t;
  }, {});
}
var Jf = function(r, t) {
  return r = typeof r == "function" ? r(Object.assign({}, t.rects, {
    placement: t.placement
  })) : r, Ts(typeof r != "number" ? r : Ss(r, It));
};
function Zf(e) {
  var r, t = e.state, n = e.name, o = e.options, a = t.elements.arrow, i = t.modifiersData.popperOffsets, s = Xe(t.placement), l = Bo(s), u = [Oe, Ve].indexOf(s) >= 0, f = u ? "height" : "width";
  if (!(!a || !i)) {
    var b = Jf(o.padding, t), v = Do(a), c = l === "y" ? Ce : Oe, h = l === "y" ? je : Ve, d = t.rects.reference[f] + t.rects.reference[l] - i[l] - t.rects.popper[f], g = i[l] - t.rects.reference[l], y = At(a), C = y ? l === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, N = d / 2 - g / 2, x = b[c], w = C - v[f] - b[h], O = C / 2 - v[f] / 2 + N, _ = gt(x, O, w), B = l;
    t.modifiersData[n] = (r = {}, r[B] = _, r.centerOffset = _ - O, r);
  }
}
function Qf(e) {
  var r = e.state, t = e.options, n = t.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = r.elements.popper.querySelector(o), !o) || ks(r.elements.popper, o) && (r.elements.arrow = o));
}
const em = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Zf,
  effect: Qf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Kr(e) {
  return e.split("-")[1];
}
var rm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function tm(e, r) {
  var t = e.x, n = e.y, o = r.devicePixelRatio || 1;
  return {
    x: Yr(t * o) / o || 0,
    y: Yr(n * o) / o || 0
  };
}
function Ua(e) {
  var r, t = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, s = e.position, l = e.gpuAcceleration, u = e.adaptive, f = e.roundOffsets, b = e.isFixed, v = i.x, c = v === void 0 ? 0 : v, h = i.y, d = h === void 0 ? 0 : h, g = typeof f == "function" ? f({
    x: c,
    y: d
  }) : {
    x: c,
    y: d
  };
  c = g.x, d = g.y;
  var y = i.hasOwnProperty("x"), C = i.hasOwnProperty("y"), N = Oe, x = Ce, w = window;
  if (u) {
    var O = At(t), _ = "clientHeight", B = "clientWidth";
    if (O === Ae(t) && (O = ur(t), rr(O).position !== "static" && s === "absolute" && (_ = "scrollHeight", B = "scrollWidth")), O = O, o === Ce || (o === Oe || o === Ve) && a === Tt) {
      x = je;
      var S = b && O === w && w.visualViewport ? w.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[_]
      );
      d -= S - n.height, d *= l ? 1 : -1;
    }
    if (o === Oe || (o === Ce || o === je) && a === Tt) {
      N = Ve;
      var P = b && O === w && w.visualViewport ? w.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[B]
      );
      c -= P - n.width, c *= l ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: s
  }, u && rm), j = f === !0 ? tm({
    x: c,
    y: d
  }, Ae(t)) : {
    x: c,
    y: d
  };
  if (c = j.x, d = j.y, l) {
    var V;
    return Object.assign({}, k, (V = {}, V[x] = C ? "0" : "", V[N] = y ? "0" : "", V.transform = (w.devicePixelRatio || 1) <= 1 ? "translate(" + c + "px, " + d + "px)" : "translate3d(" + c + "px, " + d + "px, 0)", V));
  }
  return Object.assign({}, k, (r = {}, r[x] = C ? d + "px" : "", r[N] = y ? c + "px" : "", r.transform = "", r));
}
function nm(e) {
  var r = e.state, t = e.options, n = t.gpuAcceleration, o = n === void 0 ? !0 : n, a = t.adaptive, i = a === void 0 ? !0 : a, s = t.roundOffsets, l = s === void 0 ? !0 : s, u = {
    placement: Xe(r.placement),
    variation: Kr(r.placement),
    popper: r.elements.popper,
    popperRect: r.rects.popper,
    gpuAcceleration: o,
    isFixed: r.options.strategy === "fixed"
  };
  r.modifiersData.popperOffsets != null && (r.styles.popper = Object.assign({}, r.styles.popper, Ua(Object.assign({}, u, {
    offsets: r.modifiersData.popperOffsets,
    position: r.options.strategy,
    adaptive: i,
    roundOffsets: l
  })))), r.modifiersData.arrow != null && (r.styles.arrow = Object.assign({}, r.styles.arrow, Ua(Object.assign({}, u, {
    offsets: r.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: l
  })))), r.attributes.popper = Object.assign({}, r.attributes.popper, {
    "data-popper-placement": r.placement
  });
}
const om = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: nm,
  data: {}
};
var Gt = {
  passive: !0
};
function am(e) {
  var r = e.state, t = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, s = i === void 0 ? !0 : i, l = Ae(r.elements.popper), u = [].concat(r.scrollParents.reference, r.scrollParents.popper);
  return a && u.forEach(function(f) {
    f.addEventListener("scroll", t.update, Gt);
  }), s && l.addEventListener("resize", t.update, Gt), function() {
    a && u.forEach(function(f) {
      f.removeEventListener("scroll", t.update, Gt);
    }), s && l.removeEventListener("resize", t.update, Gt);
  };
}
const im = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: am,
  data: {}
};
var sm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function qt(e) {
  return e.replace(/left|right|bottom|top/g, function(r) {
    return sm[r];
  });
}
var pm = {
  start: "end",
  end: "start"
};
function Ha(e) {
  return e.replace(/start|end/g, function(r) {
    return pm[r];
  });
}
function jo(e) {
  var r = Ae(e), t = r.pageXOffset, n = r.pageYOffset;
  return {
    scrollLeft: t,
    scrollTop: n
  };
}
function Vo(e) {
  return qr(ur(e)).left + jo(e).scrollLeft;
}
function lm(e, r) {
  var t = Ae(e), n = ur(e), o = t.visualViewport, a = n.clientWidth, i = n.clientHeight, s = 0, l = 0;
  if (o) {
    a = o.width, i = o.height;
    var u = Ns();
    (u || !u && r === "fixed") && (s = o.offsetLeft, l = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: s + Vo(e),
    y: l
  };
}
function cm(e) {
  var r, t = ur(e), n = jo(e), o = (r = e.ownerDocument) == null ? void 0 : r.body, a = Er(t.scrollWidth, t.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Er(t.scrollHeight, t.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -n.scrollLeft + Vo(e), l = -n.scrollTop;
  return rr(o || t).direction === "rtl" && (s += Er(t.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: s,
    y: l
  };
}
function Lo(e) {
  var r = rr(e), t = r.overflow, n = r.overflowX, o = r.overflowY;
  return /auto|scroll|overlay|hidden/.test(t + o + n);
}
function Cs(e) {
  return ["html", "body", "#document"].indexOf(Ke(e)) >= 0 ? e.ownerDocument.body : Be(e) && Lo(e) ? e : Cs(Tn(e));
}
function vt(e, r) {
  var t;
  r === void 0 && (r = []);
  var n = Cs(e), o = n === ((t = e.ownerDocument) == null ? void 0 : t.body), a = Ae(n), i = o ? [a].concat(a.visualViewport || [], Lo(n) ? n : []) : n, s = r.concat(i);
  return o ? s : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    s.concat(vt(Tn(i)))
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
function dm(e, r) {
  var t = qr(e, !1, r === "fixed");
  return t.top = t.top + e.clientTop, t.left = t.left + e.clientLeft, t.bottom = t.top + e.clientHeight, t.right = t.left + e.clientWidth, t.width = e.clientWidth, t.height = e.clientHeight, t.x = t.left, t.y = t.top, t;
}
function Xa(e, r, t) {
  return r === ys ? io(lm(e, t)) : Or(r) ? dm(r, t) : io(cm(ur(e)));
}
function um(e) {
  var r = vt(Tn(e)), t = ["absolute", "fixed"].indexOf(rr(e).position) >= 0, n = t && Be(e) ? At(e) : e;
  return Or(n) ? r.filter(function(o) {
    return Or(o) && ks(o, n) && Ke(o) !== "body";
  }) : [];
}
function fm(e, r, t, n) {
  var o = r === "clippingParents" ? um(e) : [].concat(r), a = [].concat(o, [t]), i = a[0], s = a.reduce(function(l, u) {
    var f = Xa(e, u, n);
    return l.top = Er(f.top, l.top), l.right = rn(f.right, l.right), l.bottom = rn(f.bottom, l.bottom), l.left = Er(f.left, l.left), l;
  }, Xa(e, i, n));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function Os(e) {
  var r = e.reference, t = e.element, n = e.placement, o = n ? Xe(n) : null, a = n ? Kr(n) : null, i = r.x + r.width / 2 - t.width / 2, s = r.y + r.height / 2 - t.height / 2, l;
  switch (o) {
    case Ce:
      l = {
        x: i,
        y: r.y - t.height
      };
      break;
    case je:
      l = {
        x: i,
        y: r.y + r.height
      };
      break;
    case Ve:
      l = {
        x: r.x + r.width,
        y: s
      };
      break;
    case Oe:
      l = {
        x: r.x - t.width,
        y: s
      };
      break;
    default:
      l = {
        x: r.x,
        y: r.y
      };
  }
  var u = o ? Bo(o) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (a) {
      case Wr:
        l[u] = l[u] - (r[f] / 2 - t[f] / 2);
        break;
      case Tt:
        l[u] = l[u] + (r[f] / 2 - t[f] / 2);
        break;
    }
  }
  return l;
}
function St(e, r) {
  r === void 0 && (r = {});
  var t = r, n = t.placement, o = n === void 0 ? e.placement : n, a = t.strategy, i = a === void 0 ? e.strategy : a, s = t.boundary, l = s === void 0 ? If : s, u = t.rootBoundary, f = u === void 0 ? ys : u, b = t.elementContext, v = b === void 0 ? it : b, c = t.altBoundary, h = c === void 0 ? !1 : c, d = t.padding, g = d === void 0 ? 0 : d, y = Ts(typeof g != "number" ? g : Ss(g, It)), C = v === it ? Af : it, N = e.rects.popper, x = e.elements[h ? C : v], w = fm(Or(x) ? x : x.contextElement || ur(e.elements.popper), l, f, i), O = qr(e.elements.reference), _ = Os({
    reference: O,
    element: N,
    strategy: "absolute",
    placement: o
  }), B = io(Object.assign({}, N, _)), S = v === it ? B : O, P = {
    top: w.top - S.top + y.top,
    bottom: S.bottom - w.bottom + y.bottom,
    left: w.left - S.left + y.left,
    right: S.right - w.right + y.right
  }, k = e.modifiersData.offset;
  if (v === it && k) {
    var j = k[o];
    Object.keys(P).forEach(function(V) {
      var Z = [Ve, je].indexOf(V) >= 0 ? 1 : -1, K = [Ce, je].indexOf(V) >= 0 ? "y" : "x";
      P[V] += j[K] * Z;
    });
  }
  return P;
}
function mm(e, r) {
  r === void 0 && (r = {});
  var t = r, n = t.placement, o = t.boundary, a = t.rootBoundary, i = t.padding, s = t.flipVariations, l = t.allowedAutoPlacements, u = l === void 0 ? xs : l, f = Kr(n), b = f ? s ? za : za.filter(function(h) {
    return Kr(h) === f;
  }) : It, v = b.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  v.length === 0 && (v = b);
  var c = v.reduce(function(h, d) {
    return h[d] = St(e, {
      placement: d,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Xe(d)], h;
  }, {});
  return Object.keys(c).sort(function(h, d) {
    return c[h] - c[d];
  });
}
function hm(e) {
  if (Xe(e) === Ao)
    return [];
  var r = qt(e);
  return [Ha(e), r, Ha(r)];
}
function gm(e) {
  var r = e.state, t = e.options, n = e.name;
  if (!r.modifiersData[n]._skip) {
    for (var o = t.mainAxis, a = o === void 0 ? !0 : o, i = t.altAxis, s = i === void 0 ? !0 : i, l = t.fallbackPlacements, u = t.padding, f = t.boundary, b = t.rootBoundary, v = t.altBoundary, c = t.flipVariations, h = c === void 0 ? !0 : c, d = t.allowedAutoPlacements, g = r.options.placement, y = Xe(g), C = y === g, N = l || (C || !h ? [qt(g)] : hm(g)), x = [g].concat(N).reduce(function(z, Y) {
      return z.concat(Xe(Y) === Ao ? mm(r, {
        placement: Y,
        boundary: f,
        rootBoundary: b,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: d
      }) : Y);
    }, []), w = r.rects.reference, O = r.rects.popper, _ = /* @__PURE__ */ new Map(), B = !0, S = x[0], P = 0; P < x.length; P++) {
      var k = x[P], j = Xe(k), V = Kr(k) === Wr, Z = [Ce, je].indexOf(j) >= 0, K = Z ? "width" : "height", H = St(r, {
        placement: k,
        boundary: f,
        rootBoundary: b,
        altBoundary: v,
        padding: u
      }), re = Z ? V ? Ve : Oe : V ? je : Ce;
      w[K] > O[K] && (re = qt(re));
      var ae = qt(re), F = [];
      if (a && F.push(H[j] <= 0), s && F.push(H[re] <= 0, H[ae] <= 0), F.every(function(z) {
        return z;
      })) {
        S = k, B = !1;
        break;
      }
      _.set(k, F);
    }
    if (B)
      for (var E = h ? 3 : 1, I = function(Y) {
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
    r.placement !== S && (r.modifiersData[n]._skip = !0, r.placement = S, r.reset = !0);
  }
}
const vm = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: gm,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Wa(e, r, t) {
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
function Ya(e) {
  return [Ce, Ve, je, Oe].some(function(r) {
    return e[r] >= 0;
  });
}
function bm(e) {
  var r = e.state, t = e.name, n = r.rects.reference, o = r.rects.popper, a = r.modifiersData.preventOverflow, i = St(r, {
    elementContext: "reference"
  }), s = St(r, {
    altBoundary: !0
  }), l = Wa(i, n), u = Wa(s, o, a), f = Ya(l), b = Ya(u);
  r.modifiersData[t] = {
    referenceClippingOffsets: l,
    popperEscapeOffsets: u,
    isReferenceHidden: f,
    hasPopperEscaped: b
  }, r.attributes.popper = Object.assign({}, r.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": b
  });
}
const wm = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: bm
};
function ym(e, r, t) {
  var n = Xe(e), o = [Oe, Ce].indexOf(n) >= 0 ? -1 : 1, a = typeof t == "function" ? t(Object.assign({}, r, {
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
function xm(e) {
  var r = e.state, t = e.options, n = e.name, o = t.offset, a = o === void 0 ? [0, 0] : o, i = xs.reduce(function(f, b) {
    return f[b] = ym(b, r.rects, a), f;
  }, {}), s = i[r.placement], l = s.x, u = s.y;
  r.modifiersData.popperOffsets != null && (r.modifiersData.popperOffsets.x += l, r.modifiersData.popperOffsets.y += u), r.modifiersData[n] = i;
}
const Nm = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: xm
};
function km(e) {
  var r = e.state, t = e.name;
  r.modifiersData[t] = Os({
    reference: r.rects.reference,
    element: r.rects.popper,
    strategy: "absolute",
    placement: r.placement
  });
}
const Em = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: km,
  data: {}
};
function Tm(e) {
  return e === "x" ? "y" : "x";
}
function Sm(e) {
  var r = e.state, t = e.options, n = e.name, o = t.mainAxis, a = o === void 0 ? !0 : o, i = t.altAxis, s = i === void 0 ? !1 : i, l = t.boundary, u = t.rootBoundary, f = t.altBoundary, b = t.padding, v = t.tether, c = v === void 0 ? !0 : v, h = t.tetherOffset, d = h === void 0 ? 0 : h, g = St(r, {
    boundary: l,
    rootBoundary: u,
    padding: b,
    altBoundary: f
  }), y = Xe(r.placement), C = Kr(r.placement), N = !C, x = Bo(y), w = Tm(x), O = r.modifiersData.popperOffsets, _ = r.rects.reference, B = r.rects.popper, S = typeof d == "function" ? d(Object.assign({}, r.rects, {
    placement: r.placement
  })) : d, P = typeof S == "number" ? {
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
      var V, Z = x === "y" ? Ce : Oe, K = x === "y" ? je : Ve, H = x === "y" ? "height" : "width", re = O[x], ae = re + g[Z], F = re - g[K], E = c ? -B[H] / 2 : 0, I = C === Wr ? _[H] : B[H], X = C === Wr ? -B[H] : -_[H], G = r.elements.arrow, z = c && G ? Do(G) : {
        width: 0,
        height: 0
      }, Y = r.modifiersData["arrow#persistent"] ? r.modifiersData["arrow#persistent"].padding : Es(), U = Y[Z], q = Y[K], W = gt(0, _[H], z[H]), J = N ? _[H] / 2 - E - W - U - P.mainAxis : I - W - U - P.mainAxis, Q = N ? -_[H] / 2 + E + W + q + P.mainAxis : X + W + q + P.mainAxis, de = r.elements.arrow && At(r.elements.arrow), A = de ? x === "y" ? de.clientTop || 0 : de.clientLeft || 0 : 0, Ne = (V = k == null ? void 0 : k[x]) != null ? V : 0, L = re + J - Ne - A, xe = re + Q - Ne, Fe = gt(c ? rn(ae, L) : ae, re, c ? Er(F, xe) : F);
      O[x] = Fe, j[x] = Fe - re;
    }
    if (s) {
      var fr, Ee = x === "x" ? Ce : Oe, Dt = x === "x" ? je : Ve, ze = O[w], Rr = w === "y" ? "height" : "width", mr = ze + g[Ee], Pr = ze - g[Dt], _r = [Ce, Oe].indexOf(y) !== -1, $r = (fr = k == null ? void 0 : k[w]) != null ? fr : 0, hr = _r ? mr : ze - _[Rr] - B[Rr] - $r + P.altAxis, Zr = _r ? ze + _[Rr] + B[Rr] - $r - P.altAxis : Pr, Bt = c && _r ? Kf(hr, ze, Zr) : gt(c ? hr : mr, ze, c ? Zr : Pr);
      O[w] = Bt, j[w] = Bt - ze;
    }
    r.modifiersData[n] = j;
  }
}
const Cm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Sm,
  requiresIfExists: ["offset"]
};
function Om(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Rm(e) {
  return e === Ae(e) || !Be(e) ? jo(e) : Om(e);
}
function Pm(e) {
  var r = e.getBoundingClientRect(), t = Yr(r.width) / e.offsetWidth || 1, n = Yr(r.height) / e.offsetHeight || 1;
  return t !== 1 || n !== 1;
}
function _m(e, r, t) {
  t === void 0 && (t = !1);
  var n = Be(r), o = Be(r) && Pm(r), a = ur(r), i = qr(e, o, t), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, l = {
    x: 0,
    y: 0
  };
  return (n || !n && !t) && ((Ke(r) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Lo(a)) && (s = Rm(r)), Be(r) ? (l = qr(r, !0), l.x += r.clientLeft, l.y += r.clientTop) : a && (l.x = Vo(a))), {
    x: i.left + s.scrollLeft - l.x,
    y: i.top + s.scrollTop - l.y,
    width: i.width,
    height: i.height
  };
}
function $m(e) {
  var r = /* @__PURE__ */ new Map(), t = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(a) {
    r.set(a.name, a);
  });
  function o(a) {
    t.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(s) {
      if (!t.has(s)) {
        var l = r.get(s);
        l && o(l);
      }
    }), n.push(a);
  }
  return e.forEach(function(a) {
    t.has(a.name) || o(a);
  }), n;
}
function Im(e) {
  var r = $m(e);
  return Uf.reduce(function(t, n) {
    return t.concat(r.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Am(e) {
  var r;
  return function() {
    return r || (r = new Promise(function(t) {
      Promise.resolve().then(function() {
        r = void 0, t(e());
      });
    })), r;
  };
}
function Mm(e) {
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
var qa = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Ka() {
  for (var e = arguments.length, r = new Array(e), t = 0; t < e; t++)
    r[t] = arguments[t];
  return !r.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Dm(e) {
  e === void 0 && (e = {});
  var r = e, t = r.defaultModifiers, n = t === void 0 ? [] : t, o = r.defaultOptions, a = o === void 0 ? qa : o;
  return function(s, l, u) {
    u === void 0 && (u = a);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, qa, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: l
      },
      attributes: {},
      styles: {}
    }, b = [], v = !1, c = {
      state: f,
      setOptions: function(y) {
        var C = typeof y == "function" ? y(f.options) : y;
        d(), f.options = Object.assign({}, a, f.options, C), f.scrollParents = {
          reference: Or(s) ? vt(s) : s.contextElement ? vt(s.contextElement) : [],
          popper: vt(l)
        };
        var N = Im(Mm([].concat(n, f.options.modifiers)));
        return f.orderedModifiers = N.filter(function(x) {
          return x.enabled;
        }), h(), c.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!v) {
          var y = f.elements, C = y.reference, N = y.popper;
          if (Ka(C, N)) {
            f.rects = {
              reference: _m(C, At(N), f.options.strategy === "fixed"),
              popper: Do(N)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(P) {
              return f.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var x = 0; x < f.orderedModifiers.length; x++) {
              if (f.reset === !0) {
                f.reset = !1, x = -1;
                continue;
              }
              var w = f.orderedModifiers[x], O = w.fn, _ = w.options, B = _ === void 0 ? {} : _, S = w.name;
              typeof O == "function" && (f = O({
                state: f,
                options: B,
                name: S,
                instance: c
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Am(function() {
        return new Promise(function(g) {
          c.forceUpdate(), g(f);
        });
      }),
      destroy: function() {
        d(), v = !0;
      }
    };
    if (!Ka(s, l))
      return c;
    c.setOptions(u).then(function(g) {
      !v && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function h() {
      f.orderedModifiers.forEach(function(g) {
        var y = g.name, C = g.options, N = C === void 0 ? {} : C, x = g.effect;
        if (typeof x == "function") {
          var w = x({
            state: f,
            name: y,
            instance: c,
            options: N
          }), O = function() {
          };
          b.push(w || O);
        }
      });
    }
    function d() {
      b.forEach(function(g) {
        return g();
      }), b = [];
    }
    return c;
  };
}
var Bm = [im, Em, om, Wf, Nm, vm, Cm, em, wm], jm = /* @__PURE__ */ Dm({
  defaultModifiers: Bm
});
const Rs = "Popper";
function Vm(e) {
  return ws(Rs, e);
}
_f(Rs, ["root"]);
const Lm = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Fm = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function zm(e, r) {
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
function Gm(e) {
  return !Sn(e);
}
const Um = () => ko({
  root: ["root"]
}, kf(Vm)), Hm = {}, Xm = /* @__PURE__ */ M.forwardRef(function(r, t) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: s,
    modifiers: l,
    open: u,
    placement: f,
    popperOptions: b,
    popperRef: v,
    slotProps: c = {},
    slots: h = {},
    TransitionProps: d
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = r, g = ke(r, Lm), y = M.useRef(null), C = Sr(y, t), N = M.useRef(null), x = Sr(N, v), w = M.useRef(x);
  Xr(() => {
    w.current = x;
  }, [x]), M.useImperativeHandle(v, () => N.current, []);
  const O = zm(f, i), [_, B] = M.useState(O), [S, P] = M.useState(tn(o));
  M.useEffect(() => {
    N.current && N.current.forceUpdate();
  }), M.useEffect(() => {
    o && P(tn(o));
  }, [o]), Xr(() => {
    if (!S || !u)
      return;
    const K = (ae) => {
      B(ae.placement);
    };
    if (process.env.NODE_ENV !== "production" && S && Sn(S) && S.nodeType === 1) {
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
    l != null && (H = H.concat(l)), b && b.modifiers != null && (H = H.concat(b.modifiers));
    const re = jm(S, y.current, $({
      placement: O
    }, b, {
      modifiers: H
    }));
    return w.current(re), () => {
      re.destroy(), w.current(null);
    };
  }, [S, s, l, u, b, O]);
  const k = {
    placement: _
  };
  d !== null && (k.TransitionProps = d);
  const j = Um(), V = (n = h.root) != null ? n : "div", Z = Of({
    elementType: V,
    externalSlotProps: c.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: C
    },
    ownerState: r,
    className: j.root
  });
  return /* @__PURE__ */ p(V, $({}, Z, {
    children: typeof a == "function" ? a(k) : a
  }));
}), Ps = /* @__PURE__ */ M.forwardRef(function(r, t) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: s = !1,
    keepMounted: l = !1,
    modifiers: u,
    open: f,
    placement: b = "bottom",
    popperOptions: v = Hm,
    popperRef: c,
    style: h,
    transition: d = !1,
    slotProps: g = {},
    slots: y = {}
  } = r, C = ke(r, Fm), [N, x] = M.useState(!0), w = () => {
    x(!1);
  }, O = () => {
    x(!0);
  };
  if (!l && !f && (!d || N))
    return null;
  let _;
  if (a)
    _ = a;
  else if (n) {
    const P = tn(n);
    _ = P && Sn(P) ? Jt(P).body : Jt(null).body;
  }
  const B = !f && l && (!d || N) ? "none" : void 0, S = d ? {
    in: f,
    onEnter: w,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ p(en, {
    disablePortal: s,
    container: _,
    children: /* @__PURE__ */ p(Xm, $({
      anchorEl: n,
      direction: i,
      disablePortal: s,
      modifiers: u,
      ref: t,
      open: d ? !N : f,
      placement: b,
      popperOptions: v,
      popperRef: c,
      slotProps: g,
      slots: y
    }, C, {
      style: $({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: B
      }, h),
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
  anchorEl: xo(m.oneOfType([kt, m.object, m.func]), (e) => {
    if (e.open) {
      const r = tn(e.anchorEl);
      if (r && Sn(r) && r.nodeType === 1) {
        const t = r.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && t.top === 0 && t.left === 0 && t.right === 0 && t.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!r || typeof r.getBoundingClientRect != "function" || Gm(r) && r.contextElement != null && r.contextElement.nodeType !== 1)
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
  popperRef: ts,
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
function _s() {
  const e = ms(Po);
  return process.env.NODE_ENV !== "production" && M.useDebugValue(e), e[_o] || e;
}
function so(e, r) {
  return so = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, so(e, r);
}
function Wm(e, r) {
  e.prototype = Object.create(r.prototype), e.prototype.constructor = e, so(e, r);
}
const Ja = {
  disabled: !1
};
var Ym = process.env.NODE_ENV !== "production" ? m.oneOfType([m.number, m.shape({
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
const $s = D.createContext(null);
var qm = function(r) {
  return r.scrollTop;
}, ut = "unmounted", br = "exited", wr = "entering", Lr = "entered", po = "exiting", tr = /* @__PURE__ */ function(e) {
  Wm(r, e);
  function r(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, s = i && !i.isMounting ? n.enter : n.appear, l;
    return a.appearStatus = null, n.in ? s ? (l = br, a.appearStatus = wr) : l = Lr : n.unmountOnExit || n.mountOnEnter ? l = ut : l = br, a.state = {
      status: l
    }, a.nextCallback = null, a;
  }
  r.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === ut ? {
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
      this.props.in ? i !== wr && i !== Lr && (a = wr) : (i === wr || i === Lr) && (a = po);
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
          var i = this.props.nodeRef ? this.props.nodeRef.current : Lt.findDOMNode(this);
          i && qm(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === br && this.setState({
        status: ut
      });
  }, t.performEnter = function(o) {
    var a = this, i = this.props.enter, s = this.context ? this.context.isMounting : o, l = this.props.nodeRef ? [s] : [Lt.findDOMNode(this), s], u = l[0], f = l[1], b = this.getTimeouts(), v = s ? b.appear : b.enter;
    if (!o && !i || Ja.disabled) {
      this.safeSetState({
        status: Lr
      }, function() {
        a.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, f), this.safeSetState({
      status: wr
    }, function() {
      a.props.onEntering(u, f), a.onTransitionEnd(v, function() {
        a.safeSetState({
          status: Lr
        }, function() {
          a.props.onEntered(u, f);
        });
      });
    });
  }, t.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), s = this.props.nodeRef ? void 0 : Lt.findDOMNode(this);
    if (!a || Ja.disabled) {
      this.safeSetState({
        status: br
      }, function() {
        o.props.onExited(s);
      });
      return;
    }
    this.props.onExit(s), this.safeSetState({
      status: po
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Lt.findDOMNode(this), s = o == null && !this.props.addEndListener;
    if (!i || s) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var l = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], u = l[0], f = l[1];
      this.props.addEndListener(u, f);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, t.render = function() {
    var o = this.state.status;
    if (o === ut)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var s = ke(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ D.createElement($s.Provider, {
        value: null
      }, typeof i == "function" ? i(o, s) : D.cloneElement(D.Children.only(i), s))
    );
  }, r;
}(D.Component);
tr.contextType = $s;
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
    var t = Ym;
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
tr.UNMOUNTED = ut;
tr.EXITED = br;
tr.ENTERING = wr;
tr.ENTERED = Lr;
tr.EXITING = po;
const Km = tr, Jm = (e) => e.scrollTop;
function Za(e, r) {
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
const Zm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function lo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Qm = {
  entering: {
    opacity: 1,
    transform: lo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Hn = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Fo = /* @__PURE__ */ M.forwardRef(function(r, t) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: s,
    onEnter: l,
    onEntered: u,
    onEntering: f,
    onExit: b,
    onExited: v,
    onExiting: c,
    style: h,
    timeout: d = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = Km
  } = r, y = ke(r, Zm), C = ct(), N = M.useRef(), x = _s(), w = M.useRef(null), O = Sr(w, a.ref, t), _ = (K) => (H) => {
    if (K) {
      const re = w.current;
      H === void 0 ? K(re) : K(re, H);
    }
  }, B = _(f), S = _((K, H) => {
    Jm(K);
    const {
      duration: re,
      delay: ae,
      easing: F
    } = Za({
      style: h,
      timeout: d,
      easing: i
    }, {
      mode: "enter"
    });
    let E;
    d === "auto" ? (E = x.transitions.getAutoHeightDuration(K.clientHeight), N.current = E) : E = re, K.style.transition = [x.transitions.create("opacity", {
      duration: E,
      delay: ae
    }), x.transitions.create("transform", {
      duration: Hn ? E : E * 0.666,
      delay: ae,
      easing: F
    })].join(","), l && l(K, H);
  }), P = _(u), k = _(c), j = _((K) => {
    const {
      duration: H,
      delay: re,
      easing: ae
    } = Za({
      style: h,
      timeout: d,
      easing: i
    }, {
      mode: "exit"
    });
    let F;
    d === "auto" ? (F = x.transitions.getAutoHeightDuration(K.clientHeight), N.current = F) : F = H, K.style.transition = [x.transitions.create("opacity", {
      duration: F,
      delay: re
    }), x.transitions.create("transform", {
      duration: Hn ? F : F * 0.666,
      delay: Hn ? re : re || F * 0.333,
      easing: ae
    })].join(","), K.style.opacity = 0, K.style.transform = lo(0.75), b && b(K);
  }), V = _(v);
  return /* @__PURE__ */ p(g, $({
    appear: o,
    in: s,
    nodeRef: w,
    onEnter: S,
    onEntered: P,
    onEntering: B,
    onExit: j,
    onExited: V,
    onExiting: k,
    addEndListener: (K) => {
      d === "auto" && C.start(N.current || 0, K), n && n(w.current, K);
    },
    timeout: d === "auto" ? null : d
  }, y, {
    children: (K, H) => /* @__PURE__ */ M.cloneElement(a, $({
      style: $({
        opacity: 0,
        transform: lo(0.75),
        visibility: K === "exited" && !s ? "hidden" : void 0
      }, Qm[K], h, a.props.style),
      ref: O
    }, H))
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
  children: es.isRequired,
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
const Qa = Fo, eh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], rh = $t(Ps, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, r) => r.root
})({}), Is = /* @__PURE__ */ M.forwardRef(function(r, t) {
  var n;
  const o = fs(), a = $o({
    props: r,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: s,
    components: l,
    componentsProps: u,
    container: f,
    disablePortal: b,
    keepMounted: v,
    modifiers: c,
    open: h,
    placement: d,
    popperOptions: g,
    popperRef: y,
    transition: C,
    slots: N,
    slotProps: x
  } = a, w = ke(a, eh), O = (n = N == null ? void 0 : N.root) != null ? n : l == null ? void 0 : l.Root, _ = $({
    anchorEl: i,
    container: f,
    disablePortal: b,
    keepMounted: v,
    modifiers: c,
    open: h,
    placement: d,
    popperOptions: g,
    popperRef: y,
    transition: C
  }, w);
  return /* @__PURE__ */ p(rh, $({
    as: s,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: x ?? u
  }, _, {
    ref: t
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
  popperRef: ts,
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
const As = Is;
function th(e) {
  return hn("MuiTooltip", e);
}
const nh = ls("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), sr = nh, oh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function ah(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ih = (e) => {
  const {
    classes: r,
    disableInteractive: t,
    arrow: n,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !t && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${qe(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ko(i, th, r);
}, sh = $t(As, {
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
}) => $({
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
  [`&[data-popper-placement*="right"] .${sr.arrow}`]: $({}, r.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${sr.arrow}`]: $({}, r.isRtl ? {
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
})), ph = $t("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, r) => {
    const {
      ownerState: t
    } = e;
    return [r.tooltip, t.touch && r.touch, t.arrow && r.tooltipArrow, r[`tooltipPlacement${qe(t.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: r
}) => $({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : hs(e.palette.grey[700], 0.92),
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
  lineHeight: `${ah(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${sr.popper}[data-popper-placement*="left"] &`]: $({
    transformOrigin: "right center"
  }, r.isRtl ? $({
    marginLeft: "14px"
  }, r.touch && {
    marginLeft: "24px"
  }) : $({
    marginRight: "14px"
  }, r.touch && {
    marginRight: "24px"
  })),
  [`.${sr.popper}[data-popper-placement*="right"] &`]: $({
    transformOrigin: "left center"
  }, r.isRtl ? $({
    marginRight: "14px"
  }, r.touch && {
    marginRight: "24px"
  }) : $({
    marginLeft: "14px"
  }, r.touch && {
    marginLeft: "24px"
  })),
  [`.${sr.popper}[data-popper-placement*="top"] &`]: $({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, r.touch && {
    marginBottom: "24px"
  }),
  [`.${sr.popper}[data-popper-placement*="bottom"] &`]: $({
    transformOrigin: "center top",
    marginTop: "14px"
  }, r.touch && {
    marginTop: "24px"
  })
})), lh = $t("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : hs(e.palette.grey[700], 0.9),
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
const ei = new Rt();
let st = {
  x: 0,
  y: 0
};
function Ht(e, r) {
  return (t) => {
    r && r(t), e(t);
  };
}
const Ms = /* @__PURE__ */ M.forwardRef(function(r, t) {
  var n, o, a, i, s, l, u, f, b, v, c, h, d, g, y, C, N, x, w;
  const O = $o({
    props: r,
    name: "MuiTooltip"
  }), {
    arrow: _ = !1,
    children: B,
    components: S = {},
    componentsProps: P = {},
    describeChild: k = !1,
    disableFocusListener: j = !1,
    disableHoverListener: V = !1,
    disableInteractive: Z = !1,
    disableTouchListener: K = !1,
    enterDelay: H = 100,
    enterNextDelay: re = 0,
    enterTouchDelay: ae = 700,
    followCursor: F = !1,
    id: E,
    leaveDelay: I = 0,
    leaveTouchDelay: X = 1500,
    onClose: G,
    onOpen: z,
    open: Y,
    placement: U = "bottom",
    PopperComponent: q,
    PopperProps: W = {},
    slotProps: J = {},
    slots: Q = {},
    title: de,
    TransitionComponent: A = Qa,
    TransitionProps: Ne
  } = O, L = ke(O, oh), xe = /* @__PURE__ */ M.isValidElement(B) ? B : /* @__PURE__ */ p("span", {
    children: B
  }), Fe = _s(), fr = Fe.direction === "rtl", [Ee, Dt] = M.useState(), [ze, Rr] = M.useState(null), mr = M.useRef(!1), Pr = Z || F, _r = ct(), $r = ct(), hr = ct(), Zr = ct(), [Bt, Uo] = os({
    controlled: Y,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Je = Bt;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ee
    } = M.useRef(Y !== void 0);
    M.useEffect(() => {
      Ee && Ee.disabled && !ee && de !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [de, Ee, ee]);
  }
  const Cn = ns(E), Qr = M.useRef(), jt = no(() => {
    Qr.current !== void 0 && (document.body.style.WebkitUserSelect = Qr.current, Qr.current = void 0), Zr.clear();
  });
  M.useEffect(() => jt, [jt]);
  const Ho = (ee) => {
    ei.clear(), Ut = !0, Uo(!0), z && !Je && z(ee);
  }, Vt = no(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ee) => {
      ei.start(800 + I, () => {
        Ut = !1;
      }), Uo(!1), G && Je && G(ee), _r.start(Fe.transitions.duration.shortest, () => {
        mr.current = !1;
      });
    }
  ), On = (ee) => {
    mr.current && ee.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), $r.clear(), hr.clear(), H || Ut && re ? $r.start(Ut ? re : H, () => {
      Ho(ee);
    }) : Ho(ee));
  }, Xo = (ee) => {
    $r.clear(), hr.start(I, () => {
      Vt(ee);
    });
  }, {
    isFocusVisibleRef: Wo,
    onBlur: op,
    onFocus: ap,
    ref: ip
  } = as(), [, Yo] = M.useState(!1), qo = (ee) => {
    op(ee), Wo.current === !1 && (Yo(!1), Xo(ee));
  }, Ko = (ee) => {
    Ee || Dt(ee.currentTarget), ap(ee), Wo.current === !0 && (Yo(!0), On(ee));
  }, Jo = (ee) => {
    mr.current = !0;
    const _e = xe.props;
    _e.onTouchStart && _e.onTouchStart(ee);
  }, Zo = On, Qo = Xo, sp = (ee) => {
    Jo(ee), hr.clear(), _r.clear(), jt(), Qr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Zr.start(ae, () => {
      document.body.style.WebkitUserSelect = Qr.current, On(ee);
    });
  }, pp = (ee) => {
    xe.props.onTouchEnd && xe.props.onTouchEnd(ee), jt(), hr.start(X, () => {
      Vt(ee);
    });
  };
  M.useEffect(() => {
    if (!Je)
      return;
    function ee(_e) {
      (_e.key === "Escape" || _e.key === "Esc") && Vt(_e);
    }
    return document.addEventListener("keydown", ee), () => {
      document.removeEventListener("keydown", ee);
    };
  }, [Vt, Je]);
  const lp = Sr(xe.ref, ip, Dt, t);
  !de && de !== 0 && (Je = !1);
  const Rn = M.useRef(), cp = (ee) => {
    const _e = xe.props;
    _e.onMouseMove && _e.onMouseMove(ee), st = {
      x: ee.clientX,
      y: ee.clientY
    }, Rn.current && Rn.current.update();
  }, et = {}, Pn = typeof de == "string";
  k ? (et.title = !Je && Pn && !V ? de : null, et["aria-describedby"] = Je ? Cn : null) : (et["aria-label"] = Pn ? de : null, et["aria-labelledby"] = Je && !Pn ? Cn : null);
  const Me = $({}, et, L, xe.props, {
    className: kr(L.className, xe.props.className),
    onTouchStart: Jo,
    ref: lp
  }, F ? {
    onMouseMove: cp
  } : {});
  process.env.NODE_ENV !== "production" && (Me["data-mui-internal-clone-element"] = !0, M.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const rt = {};
  K || (Me.onTouchStart = sp, Me.onTouchEnd = pp), V || (Me.onMouseOver = Ht(Zo, Me.onMouseOver), Me.onMouseLeave = Ht(Qo, Me.onMouseLeave), Pr || (rt.onMouseOver = Zo, rt.onMouseLeave = Qo)), j || (Me.onFocus = Ht(Ko, Me.onFocus), Me.onBlur = Ht(qo, Me.onBlur), Pr || (rt.onFocus = Ko, rt.onBlur = qo)), process.env.NODE_ENV !== "production" && xe.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xe.props.title}\` or the Tooltip component.`].join(`
`));
  const dp = M.useMemo(() => {
    var ee;
    let _e = [{
      name: "arrow",
      enabled: !!ze,
      options: {
        element: ze,
        padding: 4
      }
    }];
    return (ee = W.popperOptions) != null && ee.modifiers && (_e = _e.concat(W.popperOptions.modifiers)), $({}, W.popperOptions, {
      modifiers: _e
    });
  }, [ze, W]), tt = $({}, O, {
    isRtl: fr,
    arrow: _,
    disableInteractive: Pr,
    placement: U,
    PopperComponentProp: q,
    touch: mr.current
  }), _n = ih(tt), ea = (n = (o = Q.popper) != null ? o : S.Popper) != null ? n : sh, ra = (a = (i = (s = Q.transition) != null ? s : S.Transition) != null ? i : A) != null ? a : Qa, ta = (l = (u = Q.tooltip) != null ? u : S.Tooltip) != null ? l : ph, na = (f = (b = Q.arrow) != null ? b : S.Arrow) != null ? f : lh, up = dt(ea, $({}, W, (v = J.popper) != null ? v : P.popper, {
    className: kr(_n.popper, W == null ? void 0 : W.className, (c = (h = J.popper) != null ? h : P.popper) == null ? void 0 : c.className)
  }), tt), fp = dt(ra, $({}, Ne, (d = J.transition) != null ? d : P.transition), tt), mp = dt(ta, $({}, (g = J.tooltip) != null ? g : P.tooltip, {
    className: kr(_n.tooltip, (y = (C = J.tooltip) != null ? C : P.tooltip) == null ? void 0 : y.className)
  }), tt), hp = dt(na, $({}, (N = J.arrow) != null ? N : P.arrow, {
    className: kr(_n.arrow, (x = (w = J.arrow) != null ? w : P.arrow) == null ? void 0 : x.className)
  }), tt);
  return /* @__PURE__ */ T(M.Fragment, {
    children: [/* @__PURE__ */ M.cloneElement(xe, Me), /* @__PURE__ */ p(ea, $({
      as: q ?? As,
      placement: U,
      anchorEl: F ? {
        getBoundingClientRect: () => ({
          top: st.y,
          left: st.x,
          right: st.x,
          bottom: st.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Rn,
      open: Ee ? Je : !1,
      id: Cn,
      transition: !0
    }, rt, up, {
      popperOptions: dp,
      children: ({
        TransitionProps: ee
      }) => /* @__PURE__ */ p(ra, $({
        timeout: Fe.transitions.duration.shorter
      }, ee, fp, {
        children: /* @__PURE__ */ T(ta, $({}, mp, {
          children: [de, _ ? /* @__PURE__ */ p(na, $({}, hp, {
            ref: Rr
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
  arrow: m.bool,
  /**
   * Tooltip reference element.
   */
  children: es.isRequired,
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
const ch = Ms;
function ri(e, r, t) {
  return e ? /* @__PURE__ */ p(vi, { className: `papi-menu-icon-${t ? "leading" : "trailing"}`, children: /* @__PURE__ */ p("img", { src: e, alt: `${t ? "Leading" : "Trailing"} icon for ${r}` }) }) : void 0;
}
function Ds(e) {
  const {
    onClick: r,
    label: t,
    tooltip: n,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: s = !1,
    className: l,
    isDisabled: u = !1,
    isDense: f = !0,
    isSubMenuParent: b = !1,
    hasDisabledGutters: v = !1,
    hasDivider: c = !1,
    focusVisibleClassName: h,
    id: d,
    children: g
  } = e, y = /* @__PURE__ */ p(
    nl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: s,
      className: l,
      disabled: u,
      dense: f,
      disableGutters: v,
      divider: c,
      focusVisibleClassName: h,
      onClick: r,
      id: d,
      children: t ? /* @__PURE__ */ T(cr, { children: [
        ri(a, t, !0),
        /* @__PURE__ */ p(ol, { primary: t, inset: !a && o }),
        b ? /* @__PURE__ */ p(vi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ p(vs, {}) }) : ri(i, t, !1)
      ] }) : g
    }
  );
  return n ? /* @__PURE__ */ p(ch, { title: n, placement: "right", children: /* @__PURE__ */ p("div", { children: y }) }) : y;
}
function Bs(e) {
  return Object.entries(e.groups).map(([t, n]) => ({ id: t, group: n }));
}
function dh(e) {
  const [r, t] = fe(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (u) => {
    t(u.currentTarget);
  }, s = () => {
    t(void 0);
  }, l = () => {
    let u = Bs(a).filter((f) => "menuItem" in f.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === n.id
    ), /* @__PURE__ */ p(js, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ T(cr, { children: [
    /* @__PURE__ */ p(Ds, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ p(
      al,
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
        children: l()
      },
      n.id
    )
  ] });
}
const uh = (e, r) => r.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function js(e) {
  const { menuDefinition: r, onClick: t, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = lr(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Bs(r).filter((h) => !("menuItem" in h.group))
    ), b = Object.values(f).sort(
      (h, d) => (h.group.order || 0) - (d.group.order || 0)
    ), v = [];
    b.forEach((h) => {
      uh(h.id, r.items).forEach(
        (d) => v.push({ item: d, isLastItemInGroup: !1 })
      ), v.length > 0 && (v[v.length - 1].isLastItemInGroup = !0);
    }), v.length > 0 && (v[v.length - 1].isLastItemInGroup = !1);
    const c = v.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: v, allowForLeadingIcons: c };
  }, [o, r]), s = ({ item: f, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: f.label,
    tooltip: f.tooltip,
    iconPathBefore: "iconPathBefore" in f ? f.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in f ? f.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [l] = a;
  if (!l)
    return /* @__PURE__ */ p("div", {});
  const u = l.item.group;
  return /* @__PURE__ */ p("div", { role: "menu", "aria-label": u, children: a.map((f, b) => {
    const { item: v } = f, c = s(f);
    if ("command" in v) {
      const h = v.group + b;
      return /* @__PURE__ */ p(
        Ds,
        {
          onClick: (d) => {
            t == null || t(d), n(v);
          },
          ...c
        },
        h
      );
    }
    return /* @__PURE__ */ p(
      dh,
      {
        parentMenuItem: v,
        parentItemProps: c,
        ...e
      },
      u + v.id
    );
  }) }, u);
}
function fh(e) {
  const { menuDefinition: r, columnId: t } = e;
  let a = Object.entries(r.groups).map(([i, s]) => ({ id: i, group: s })).filter((i) => "column" in i.group);
  return t && "columns" in r && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  r.columns[t] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === t
  )), /* @__PURE__ */ p(js, { ...e, includedGroups: a });
}
function mh({
  commandHandler: e,
  menuDefinition: r,
  id: t,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ T(
    bi,
    {
      id: t,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": t,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ p("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ p(il, { id: t, dense: !0, className: a ?? "", children: /* @__PURE__ */ p(
          fh,
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
function hh({
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
      const l = s, u = o[l];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? i.set(u.order, { id: l, metadata: u }) : console.warn(
        `Property ${s} (${typeof u}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((s, l) => (s.metadata.order || 0) - (l.metadata.order || 0));
  }, [o, n]);
  return /* @__PURE__ */ p(
    bi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${r ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, s) => /* @__PURE__ */ p(
        mh,
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
function gh(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const co = (e, r, t = {}) => {
  const n = Nr(r);
  n.current = r;
  const o = Nr(t);
  o.current = gh(o.current);
  const [a, i] = fe(() => n.current), [s, l] = fe(!0);
  return We(() => {
    let u = !0;
    return l(!!e), (async () => {
      if (e) {
        const f = await e();
        u && (i(() => f), l(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || i(() => n.current);
    };
  }, [e]), [a, s];
}, vh = gs(/* @__PURE__ */ p("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function bh({
  menuProvider: e,
  normalMenu: r,
  fullMenu: t,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: s
}) {
  const [l, u] = fe(!1), [f, b] = fe(!1), v = Se(() => {
    l && u(!1), b(!1);
  }, [l]), c = Se((x) => {
    x.stopPropagation(), u((w) => {
      const O = !w;
      return O && x.shiftKey ? b(!0) : O || b(!1), O;
    });
  }, []), h = Se(
    (x) => (v(), n(x)),
    [n, v]
  ), [d, g] = fe({ top: 1, left: 1 });
  We(() => {
    if (l) {
      const x = o == null ? void 0 : o.current;
      if (x) {
        const w = x.getBoundingClientRect(), O = window.scrollY, _ = window.scrollX, B = w.top + O + x.clientHeight, S = w.left + _;
        g({ top: B, left: S });
      }
    }
  }, [l, o]);
  const [y] = co(
    Se(async () => (e == null ? void 0 : e(!1)) ?? r, [e, r, l]),
    r
  ), [C] = co(
    Se(async () => (e == null ? void 0 : e(!0)) ?? t ?? y, [e, t, y, l]),
    t ?? y
  ), N = f && C ? C : y;
  return /* @__PURE__ */ T(cr, { children: [
    /* @__PURE__ */ p(
      wi,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: c,
        children: s ?? /* @__PURE__ */ p(vh, {})
      }
    ),
    /* @__PURE__ */ p(
      sl,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: l,
        onClose: v,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: d.top,
            left: d.left
          }
        },
        children: N ? /* @__PURE__ */ p(
          hh,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: N
          }
        ) : void 0
      }
    )
  ] });
}
function kv({
  id: e,
  label: r,
  isDisabled: t = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: s,
  onClick: l,
  children: u
}) {
  return /* @__PURE__ */ p(
    wi,
    {
      id: e,
      disabled: t,
      edge: a,
      size: i,
      "aria-label": r,
      title: o ? void 0 : n ?? r,
      className: `papi-icon-button ${s ?? ""}`,
      onClick: l,
      children: u
    }
  );
}
const Mt = nn(({ className: e, ...r }, t) => /* @__PURE__ */ p(Bp, { size: 35, className: R("pr-animate-spin", e), ...r, ref: t }));
Mt.displayName = "Spinner";
function Ev({
  id: e,
  isDisabled: r = !1,
  hasError: t = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: s = !1,
  className: l,
  defaultValue: u,
  value: f,
  onChange: b,
  onFocus: v,
  onBlur: c
}) {
  return /* @__PURE__ */ T("div", { className: R("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ p(
      He,
      {
        htmlFor: e,
        className: R({
          "pr-text-red-600": t,
          "pr-hidden": !a
        }),
        children: `${a}${s ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ p(
      Ct,
      {
        id: e,
        disabled: r,
        placeholder: i,
        required: s,
        className: R(l, { "pr-border-red-600": t }),
        defaultValue: u,
        value: f,
        onChange: b,
        onFocus: v,
        onBlur: c
      }
    ),
    /* @__PURE__ */ p("p", { className: R({ "pr-hidden": !o }), children: o })
  ] });
}
function Tv({
  menuProvider: e,
  commandHandler: r,
  className: t,
  id: n,
  children: o
}) {
  const a = Nr(void 0);
  return /* @__PURE__ */ p("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ p(pl, { position: "static", id: n, children: /* @__PURE__ */ T(
    ll,
    {
      className: R("pr-bg-muted pr-text-muted-foreground", t),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ p(
          bh,
          {
            commandHandler: r,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ p("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const wh = sn(
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
), yh = D.forwardRef(({ className: e, variant: r, ...t }, n) => /* @__PURE__ */ p("div", { ref: n, role: "alert", className: R(wh({ variant: r }), e), ...t }));
yh.displayName = "Alert";
const xh = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ T(
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
xh.displayName = "AlertTitle";
const Nh = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p("div", { ref: t, className: R("pr-text-sm [&_p]:pr-leading-relaxed", e), ...r }));
Nh.displayName = "AlertDescription";
const kh = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ p(
    "div",
    {
      ref: t,
      className: R(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...r
    }
  )
);
kh.displayName = "Card";
const Eh = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ p(
    "div",
    {
      ref: t,
      className: R("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...r
    }
  )
);
Eh.displayName = "CardHeader";
const Th = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ p(
    "h3",
    {
      ref: t,
      className: R("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...r,
      children: r.children
    }
  )
);
Th.displayName = "CardTitle";
const Sh = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p("p", { ref: t, className: R("pr-text-sm pr-text-muted-foreground", e), ...r }));
Sh.displayName = "CardDescription";
const Ch = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ p("div", { ref: t, className: R("pr-p-6 pr-pt-0", e), ...r })
);
Ch.displayName = "CardContent";
const Oh = D.forwardRef(
  ({ className: e, ...r }, t) => /* @__PURE__ */ p("div", { ref: t, className: R("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...r })
);
Oh.displayName = "CardFooter";
function Sv({ ...e }) {
  return /* @__PURE__ */ p(
    dl,
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
const Rh = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ T(
  lt.Root,
  {
    ref: t,
    className: R(
      "pr-twp pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ p(lt.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ p(lt.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ p(lt.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Rh.displayName = lt.Root.displayName;
const Ph = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
  Qn.Root,
  {
    className: R(
      "pr-peer pr-twp pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...r,
    ref: t,
    children: /* @__PURE__ */ p(
      Qn.Thumb,
      {
        className: R(
          "pr-twp pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Ph.displayName = Qn.Root.displayName;
const Cv = Pe.Root, _h = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
_h.displayName = Pe.List.displayName;
const $h = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
$h.displayName = Pe.Trigger.displayName;
const Ih = D.forwardRef(({ className: e, ...r }, t) => /* @__PURE__ */ p(
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
Ih.displayName = Pe.Content.displayName;
function Ov({
  isInstalling: e,
  handleClick: r,
  buttonText: t,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ p(
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
      children: e ? /* @__PURE__ */ p(Mt, { size: 15 }) : /* @__PURE__ */ T(cr, { children: [
        /* @__PURE__ */ p(jp, { size: 25, className: R("pr-h-4 pr-w-4", { "pr-mr-1": t }) }),
        t
      ] })
    }
  );
}
function Rv({
  isEnabling: e,
  handleClick: r,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ p(
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
      children: e ? /* @__PURE__ */ T(cr, { children: [
        /* @__PURE__ */ p(Mt, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Pv({
  isDisabling: e,
  handleClick: r,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ p(
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
      children: e ? /* @__PURE__ */ T(cr, { children: [
        /* @__PURE__ */ p(Mt, { size: 15, className: "pr-mr-1 pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function _v({
  isUpdating: e,
  handleClick: r,
  className: t,
  ...n
}) {
  return /* @__PURE__ */ p(
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
      children: e ? /* @__PURE__ */ T(cr, { children: [
        /* @__PURE__ */ p(Mt, { size: 15, className: "pr-mr-1 pr-text-white" }),
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
const Ah = ["children", "options"], ti = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, r) => (e[r.toLowerCase()] = r, e), { for: "htmlFor" }), ni = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Mh = ["style", "script"], Dh = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Bh = /mailto:/i, jh = /\n{2,}$/, Vs = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Vh = /^ *> ?/gm, Lh = /^ {2,}\n/, Fh = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Ls = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Fs = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, zh = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Gh = /^(?:\n *)*\n/, Uh = /\r\n?/g, Hh = /^\[\^([^\]]+)](:.*)\n/, Xh = /^\[\^([^\]]+)]/, Wh = /\f/g, Yh = /^\s*?\[(x|\s)\]/, zs = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Gs = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Us = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, uo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, qh = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Hs = /^<!--[\s\S]*?(?:-->)/, Kh = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, fo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Jh = /^\{.*\}$/, Zh = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Qh = /^<([^ >]+@[^ >]+)>/, eg = /^<([^ >]+:\/[^ >]+)>/, rg = /-([a-z])?/gi, Xs = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, tg = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, ng = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, og = /^\[([^\]]*)\] ?\[([^\]]*)\]/, ag = /(\[|\])/g, ig = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, sg = /\t/g, pg = /^ *\| */, lg = /(^ *\||\| *$)/g, cg = / *$/, dg = /^ *:-+: *$/, ug = /^ *:-+ *$/, fg = /^ *-+: *$/, mg = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, hg = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, gg = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, vg = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, bg = /^\\([^0-9A-Za-z\s])/, wg = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, yg = /^\n+/, xg = /^([ \t]*)/, Ng = /\\([^\\])/g, oi = / *\n+$/, kg = /(?:^|\n)( *)$/, zo = "(?:\\d+\\.)", Go = "(?:[*+-])";
function Ws(e) {
  return "( *)(" + (e === 1 ? zo : Go) + ") +";
}
const Ys = Ws(1), qs = Ws(2);
function Ks(e) {
  return new RegExp("^" + (e === 1 ? Ys : qs));
}
const Eg = Ks(1), Tg = Ks(2);
function Js(e) {
  return new RegExp("^" + (e === 1 ? Ys : qs) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? zo : Go) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Zs = Js(1), Qs = Js(2);
function ep(e) {
  const r = e === 1 ? zo : Go;
  return new RegExp("^( *)(" + r + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + r + " (?!" + r + " ))\\n*|\\s*\\n*$)");
}
const rp = ep(1), tp = ep(2);
function ai(e, r) {
  const t = r === 1, n = t ? rp : tp, o = t ? Zs : Qs, a = t ? Eg : Tg;
  return { t(i, s, l) {
    const u = kg.exec(l);
    return u && (s.o || !s._ && !s.u) ? n.exec(i = u[1] + i) : null;
  }, i: ne.HIGH, l(i, s, l) {
    const u = t ? +i[2] : void 0, f = i[0].replace(jh, `
`).match(o);
    let b = !1;
    return { p: f.map(function(v, c) {
      const h = a.exec(v)[0].length, d = new RegExp("^ {1," + h + "}", "gm"), g = v.replace(d, "").replace(a, ""), y = c === f.length - 1, C = g.indexOf(`

`) !== -1 || y && b;
      b = C;
      const N = l._, x = l.o;
      let w;
      l.o = !0, C ? (l._ = !1, w = g.replace(oi, `

`)) : (l._ = !0, w = g.replace(oi, ""));
      const O = s(w, l);
      return l._ = N, l.o = x, O;
    }), m: t, g: u };
  }, h: (i, s, l) => e(i.m ? "ol" : "ul", { key: l.k, start: i.g }, i.p.map(function(u, f) {
    return e("li", { key: f }, s(u, l));
  })) };
}
const Sg = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Cg = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, np = [Vs, Ls, Fs, zs, Us, Gs, Hs, Xs, Zs, rp, Qs, tp], Og = [...np, /^[^\n]+(?:  \n|\n{2,})/, uo, fo];
function Rg(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Pg(e) {
  return fg.test(e) ? "right" : dg.test(e) ? "center" : ug.test(e) ? "left" : null;
}
function ii(e, r, t) {
  const n = t.$;
  t.$ = !0;
  const o = r(e.trim(), t);
  t.$ = n;
  let a = [[]];
  return o.forEach(function(i, s) {
    i.type === "tableSeparator" ? s !== 0 && s !== o.length - 1 && a.push([]) : (i.type !== "text" || o[s + 1] != null && o[s + 1].type !== "tableSeparator" || (i.v = i.v.replace(cg, "")), a[a.length - 1].push(i));
  }), a;
}
function _g(e, r, t) {
  t._ = !0;
  const n = ii(e[1], r, t), o = e[2].replace(lg, "").split("|").map(Pg), a = function(i, s, l) {
    return i.trim().split(`
`).map(function(u) {
      return ii(u, s, l);
    });
  }(e[3], r, t);
  return t._ = !1, { S: o, A: a, L: n, type: "table" };
}
function si(e, r) {
  return e.S[r] == null ? {} : { textAlign: e.S[r] };
}
function or(e) {
  return function(r, t) {
    return t._ ? e.exec(r) : null;
  };
}
function ar(e) {
  return function(r, t) {
    return t._ || t.u ? e.exec(r) : null;
  };
}
function Ze(e) {
  return function(r, t) {
    return t._ || t.u ? null : e.exec(r);
  };
}
function pt(e) {
  return function(r) {
    return e.exec(r);
  };
}
function $g(e, r, t) {
  if (r._ || r.u || t && !t.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !np.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function Vr(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function pi(e) {
  return e.replace(Ng, "$1");
}
function Kt(e, r, t) {
  const n = t._ || !1, o = t.u || !1;
  t._ = !0, t.u = !0;
  const a = e(r, t);
  return t._ = n, t.u = o, a;
}
function Ig(e, r, t) {
  const n = t._ || !1, o = t.u || !1;
  t._ = !1, t.u = !0;
  const a = e(r, t);
  return t._ = n, t.u = o, a;
}
function Ag(e, r, t) {
  return t._ = !1, e(r, t);
}
const Xn = (e, r, t) => ({ v: Kt(r, e[1], t) });
function Wn() {
  return {};
}
function Yn() {
  return null;
}
function Mg(...e) {
  return e.filter(Boolean).join(" ");
}
function qn(e, r, t) {
  let n = e;
  const o = r.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || t;
}
var ne;
function Dg(e, r = {}) {
  r.overrides = r.overrides || {}, r.slugify = r.slugify || Rg, r.namedCodesToUnicode = r.namedCodesToUnicode ? xr({}, ni, r.namedCodesToUnicode) : ni;
  const t = r.createElement || M.createElement;
  function n(c, h, ...d) {
    const g = qn(r.overrides, `${c}.props`, {});
    return t(function(y, C) {
      const N = qn(C, y);
      return N ? typeof N == "function" || typeof N == "object" && "render" in N ? N : qn(C, `${y}.component`, y) : y;
    }(c, r.overrides), xr({}, h, g, { className: Mg(h == null ? void 0 : h.className, g.className) || void 0 }), ...d);
  }
  function o(c) {
    let h = !1;
    r.forceInline ? h = !0 : r.forceBlock || (h = ig.test(c) === !1);
    const d = f(u(h ? c : `${c.trimEnd().replace(yg, "")}

`, { _: h }));
    for (; typeof d[d.length - 1] == "string" && !d[d.length - 1].trim(); )
      d.pop();
    if (r.wrapper === null)
      return d;
    const g = r.wrapper || (h ? "span" : "div");
    let y;
    if (d.length > 1 || r.forceWrapper)
      y = d;
    else {
      if (d.length === 1)
        return y = d[0], typeof y == "string" ? n("span", { key: "outer" }, y) : y;
      y = null;
    }
    return M.createElement(g, { key: "outer" }, y);
  }
  function a(c) {
    const h = c.match(Dh);
    return h ? h.reduce(function(d, g, y) {
      const C = g.indexOf("=");
      if (C !== -1) {
        const N = function(_) {
          return _.indexOf("-") !== -1 && _.match(Kh) === null && (_ = _.replace(rg, function(B, S) {
            return S.toUpperCase();
          })), _;
        }(g.slice(0, C)).trim(), x = function(_) {
          const B = _[0];
          return (B === '"' || B === "'") && _.length >= 2 && _[_.length - 1] === B ? _.slice(1, -1) : _;
        }(g.slice(C + 1).trim()), w = ti[N] || N, O = d[w] = function(_, B) {
          return _ === "style" ? B.split(/;\s?/).reduce(function(S, P) {
            const k = P.slice(0, P.indexOf(":"));
            return S[k.replace(/(-[a-z])/g, (j) => j[1].toUpperCase())] = P.slice(k.length + 1).trim(), S;
          }, {}) : _ === "href" ? Vr(B) : (B.match(Jh) && (B = B.slice(1, B.length - 1)), B === "true" || B !== "false" && B);
        }(N, x);
        typeof O == "string" && (uo.test(O) || fo.test(O)) && (d[w] = M.cloneElement(o(O.trim()), { key: y }));
      } else
        g !== "style" && (d[ti[g] || g] = !0);
      return d;
    }, {}) : null;
  }
  const i = [], s = {}, l = { blockQuote: { t: Ze(Vs), i: ne.HIGH, l: (c, h, d) => ({ v: h(c[0].replace(Vh, ""), d) }), h: (c, h, d) => n("blockquote", { key: d.k }, h(c.v, d)) }, breakLine: { t: pt(Lh), i: ne.HIGH, l: Wn, h: (c, h, d) => n("br", { key: d.k }) }, breakThematic: { t: Ze(Fh), i: ne.HIGH, l: Wn, h: (c, h, d) => n("hr", { key: d.k }) }, codeBlock: { t: Ze(Fs), i: ne.MAX, l: (c) => ({ v: c[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (c, h, d) => n("pre", { key: d.k }, n("code", xr({}, c.O, { className: c.M ? `lang-${c.M}` : "" }), c.v)) }, codeFenced: { t: Ze(Ls), i: ne.MAX, l: (c) => ({ O: a(c[3] || ""), v: c[4], M: c[2] || void 0, type: "codeBlock" }) }, codeInline: { t: ar(zh), i: ne.LOW, l: (c) => ({ v: c[2] }), h: (c, h, d) => n("code", { key: d.k }, c.v) }, footnote: { t: Ze(Hh), i: ne.MAX, l: (c) => (i.push({ I: c[2], j: c[1] }), {}), h: Yn }, footnoteReference: { t: or(Xh), i: ne.HIGH, l: (c) => ({ v: c[1], B: `#${r.slugify(c[1])}` }), h: (c, h, d) => n("a", { key: d.k, href: Vr(c.B) }, n("sup", { key: d.k }, c.v)) }, gfmTask: { t: or(Yh), i: ne.HIGH, l: (c) => ({ R: c[1].toLowerCase() === "x" }), h: (c, h, d) => n("input", { checked: c.R, key: d.k, readOnly: !0, type: "checkbox" }) }, heading: { t: Ze(r.enforceAtxHeadings ? Gs : zs), i: ne.HIGH, l: (c, h, d) => ({ v: Kt(h, c[2], d), T: r.slugify(c[2]), C: c[1].length }), h: (c, h, d) => n(`h${c.C}`, { id: c.T, key: d.k }, h(c.v, d)) }, headingSetext: { t: Ze(Us), i: ne.MAX, l: (c, h, d) => ({ v: Kt(h, c[1], d), C: c[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: pt(Hs), i: ne.HIGH, l: () => ({}), h: Yn }, image: { t: ar(Cg), i: ne.HIGH, l: (c) => ({ D: c[1], B: pi(c[2]), F: c[3] }), h: (c, h, d) => n("img", { key: d.k, alt: c.D || void 0, title: c.F || void 0, src: Vr(c.B) }) }, link: { t: or(Sg), i: ne.LOW, l: (c, h, d) => ({ v: Ig(h, c[1], d), B: pi(c[2]), F: c[3] }), h: (c, h, d) => n("a", { key: d.k, href: Vr(c.B), title: c.F }, h(c.v, d)) }, linkAngleBraceStyleDetector: { t: or(eg), i: ne.MAX, l: (c) => ({ v: [{ v: c[1], type: "text" }], B: c[1], type: "link" }) }, linkBareUrlDetector: { t: (c, h) => h.N ? null : or(Zh)(c, h), i: ne.MAX, l: (c) => ({ v: [{ v: c[1], type: "text" }], B: c[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: or(Qh), i: ne.MAX, l(c) {
    let h = c[1], d = c[1];
    return Bh.test(d) || (d = "mailto:" + d), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: d, type: "link" };
  } }, orderedList: ai(n, 1), unorderedList: ai(n, 2), newlineCoalescer: { t: Ze(Gh), i: ne.LOW, l: Wn, h: () => `
` }, paragraph: { t: $g, i: ne.LOW, l: Xn, h: (c, h, d) => n("p", { key: d.k }, h(c.v, d)) }, ref: { t: or(tg), i: ne.MAX, l: (c) => (s[c[1]] = { B: c[2], F: c[4] }, {}), h: Yn }, refImage: { t: ar(ng), i: ne.MAX, l: (c) => ({ D: c[1] || void 0, P: c[2] }), h: (c, h, d) => n("img", { key: d.k, alt: c.D, src: Vr(s[c.P].B), title: s[c.P].F }) }, refLink: { t: or(og), i: ne.MAX, l: (c, h, d) => ({ v: h(c[1], d), Z: h(c[0].replace(ag, "\\$1"), d), P: c[2] }), h: (c, h, d) => s[c.P] ? n("a", { key: d.k, href: Vr(s[c.P].B), title: s[c.P].F }, h(c.v, d)) : n("span", { key: d.k }, h(c.Z, d)) }, table: { t: Ze(Xs), i: ne.HIGH, l: _g, h: (c, h, d) => n("table", { key: d.k }, n("thead", null, n("tr", null, c.L.map(function(g, y) {
    return n("th", { key: y, style: si(c, y) }, h(g, d));
  }))), n("tbody", null, c.A.map(function(g, y) {
    return n("tr", { key: y }, g.map(function(C, N) {
      return n("td", { key: N, style: si(c, N) }, h(C, d));
    }));
  }))) }, tableSeparator: { t: function(c, h) {
    return h.$ ? (h._ = !0, pg.exec(c)) : null;
  }, i: ne.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: pt(wg), i: ne.MIN, l: (c) => ({ v: c[0].replace(qh, (h, d) => r.namedCodesToUnicode[d] ? r.namedCodesToUnicode[d] : h) }), h: (c) => c.v }, textBolded: { t: ar(mg), i: ne.MED, l: (c, h, d) => ({ v: h(c[2], d) }), h: (c, h, d) => n("strong", { key: d.k }, h(c.v, d)) }, textEmphasized: { t: ar(hg), i: ne.LOW, l: (c, h, d) => ({ v: h(c[2], d) }), h: (c, h, d) => n("em", { key: d.k }, h(c.v, d)) }, textEscaped: { t: ar(bg), i: ne.HIGH, l: (c) => ({ v: c[1], type: "text" }) }, textMarked: { t: ar(gg), i: ne.LOW, l: Xn, h: (c, h, d) => n("mark", { key: d.k }, h(c.v, d)) }, textStrikethroughed: { t: ar(vg), i: ne.LOW, l: Xn, h: (c, h, d) => n("del", { key: d.k }, h(c.v, d)) } };
  r.disableParsingRawHTML !== !0 && (l.htmlBlock = { t: pt(uo), i: ne.HIGH, l(c, h, d) {
    const [, g] = c[3].match(xg), y = new RegExp(`^${g}`, "gm"), C = c[3].replace(y, ""), N = (x = C, Og.some((B) => B.test(x)) ? Ag : Kt);
    var x;
    const w = c[1].toLowerCase(), O = Mh.indexOf(w) !== -1;
    d.N = d.N || w === "a";
    const _ = O ? c[3] : N(h, C, d);
    return d.N = !1, { O: a(c[2]), v: _, G: O, H: O ? w : c[1] };
  }, h: (c, h, d) => n(c.H, xr({ key: d.k }, c.O), c.G ? c.v : h(c.v, d)) }, l.htmlSelfClosing = { t: pt(fo), i: ne.HIGH, l: (c) => ({ O: a(c[2] || ""), H: c[1] }), h: (c, h, d) => n(c.H, xr({}, c.O, { key: d.k })) });
  const u = function(c) {
    let h = Object.keys(c);
    function d(g, y) {
      let C = [], N = "";
      for (; g; ) {
        let x = 0;
        for (; x < h.length; ) {
          const w = h[x], O = c[w], _ = O.t(g, y, N);
          if (_) {
            const B = _[0];
            g = g.substring(B.length);
            const S = O.l(_, d, y);
            S.type == null && (S.type = w), C.push(S), N = B;
            break;
          }
          x++;
        }
      }
      return C;
    }
    return h.sort(function(g, y) {
      let C = c[g].i, N = c[y].i;
      return C !== N ? C - N : g < y ? -1 : 1;
    }), function(g, y) {
      return d(function(C) {
        return C.replace(Uh, `
`).replace(Wh, "").replace(sg, "    ");
      }(g), y);
    };
  }(l), f = (b = function(c) {
    return function(h, d, g) {
      return c[h.type].h(h, d, g);
    };
  }(l), function c(h, d = {}) {
    if (Array.isArray(h)) {
      const g = d.k, y = [];
      let C = !1;
      for (let N = 0; N < h.length; N++) {
        d.k = N;
        const x = c(h[N], d), w = typeof x == "string";
        w && C ? y[y.length - 1] += x : x !== null && y.push(x), C = w;
      }
      return d.k = g, y;
    }
    return b(h, c, d);
  });
  var b;
  const v = o(e);
  return i.length ? n("div", null, v, n("footer", { key: "footer" }, i.map(function(c) {
    return n("div", { id: r.slugify(c.j), key: c.j }, c.j, f(u(c.I, { _: !0 })));
  }))) : v;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ne || (ne = {}));
const Bg = (e) => {
  let { children: r, options: t } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, s, l = {}, u = Object.keys(o);
    for (s = 0; s < u.length; s++)
      a.indexOf(i = u[s]) >= 0 || (l[i] = o[i]);
    return l;
  }(e, Ah);
  return M.cloneElement(Dg(r, t), n);
};
function $v({ id: e, markdown: r }) {
  return /* @__PURE__ */ p("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ p(Bg, { children: r }) });
}
const jg = nn((e, r) => /* @__PURE__ */ T(
  ye,
  {
    ref: r,
    className: "pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ p(Vp, { size: 16, className: "pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ p(
        an,
        {
          size: 16,
          className: "pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
        }
      )
    ]
  }
));
var Vg = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Vg || {});
function Iv({ id: e, groups: r }) {
  return /* @__PURE__ */ p("div", { id: e, children: /* @__PURE__ */ T(vo, { children: [
    /* @__PURE__ */ p(Si, { asChild: !0, children: /* @__PURE__ */ p(jg, {}) }),
    /* @__PURE__ */ p(ln, { children: r.map((t) => /* @__PURE__ */ T("div", { children: [
      /* @__PURE__ */ p(Ot, { children: t.label }),
      /* @__PURE__ */ p(Sl, { children: t.items.map((n) => /* @__PURE__ */ p("div", { children: n.itemType === 0 ? /* @__PURE__ */ p(bo, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ p(Oi, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ p(cn, {})
    ] }, t.label)) })
  ] }) });
}
function Av({ id: e, message: r }) {
  return /* @__PURE__ */ p("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ p("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ p("p", { className: "pr-text-lg pr-text-gray-800", children: r }) }) });
}
function Mv({
  id: e,
  category: r,
  downloads: t,
  languages: n,
  moreInfoUrl: o
}) {
  const a = new Wp("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(t).reduce((s, l) => s + l, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ T(
    "div",
    {
      id: e,
      className: "pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",
      children: [
        /* @__PURE__ */ T("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: /* @__PURE__ */ p("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: r }) }),
          /* @__PURE__ */ p("span", { className: "pr-text-xs pr-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ T("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ T("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: [
            /* @__PURE__ */ p(Lp, { className: "pr-mr-1 pr-h-4 pr-w-4" }),
            /* @__PURE__ */ p("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ p("span", { className: "pr-text-xs pr-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ T("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center", children: n.slice(0, 3).map((s) => /* @__PURE__ */ p(
            "span",
            {
              className: "pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",
              children: s.toUpperCase()
            },
            s
          )) }),
          n.length > 3 && /* @__PURE__ */ T(
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
        /* @__PURE__ */ p("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ T("div", { className: "pr-ml-auto pr-flex pr-flex-col pr-space-y-2", children: [
          /* @__PURE__ */ T(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Website",
                /* @__PURE__ */ p(Fp, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ T(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Support",
                /* @__PURE__ */ p(zp, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Lg({ id: e, versionHistory: r }) {
  const [t, n] = fe(!1), o = /* @__PURE__ */ new Date();
  function a(s) {
    const l = new Date(s), u = new Date(o.getTime() - l.getTime()), f = u.getUTCFullYear() - 1970, b = u.getUTCMonth(), v = u.getUTCDate() - 1;
    let c = "";
    return f > 0 ? c = `${f.toString()} year${f === 1 ? "" : "s"} ago` : b > 0 ? c = `${b.toString()} month${b === 1 ? "" : "s"} ago` : v === 0 ? c = "today" : c = `${v.toString()} day${v === 1 ? "" : "s"} ago`, c;
  }
  const i = Object.entries(r).sort((s, l) => l[0].localeCompare(s[0]));
  return /* @__PURE__ */ T("div", { id: e, children: [
    /* @__PURE__ */ p("h3", { className: "pr-text-md pr-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ p("ul", { className: "pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600", children: (t ? i : i.slice(0, 5)).map((s) => /* @__PURE__ */ T("div", { className: "pr-mt-3 pr-flex pr-justify-between", children: [
      /* @__PURE__ */ p("div", { className: "pr-text-gray-600", children: /* @__PURE__ */ p("li", { className: "pr-prose pr-text-xs", children: /* @__PURE__ */ p("span", { children: s[1].description }) }) }),
      /* @__PURE__ */ T("div", { className: "pr-justify-end pr-text-right", children: [
        /* @__PURE__ */ T("div", { children: [
          "Version ",
          s[0]
        ] }),
        /* @__PURE__ */ p("div", { children: a(s[1].date) })
      ] })
    ] }, s[0])) }),
    i.length > 5 && /* @__PURE__ */ p(
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
function Dv({
  id: e,
  publisherDisplayName: r,
  fileSize: t,
  locales: n,
  versionHistory: o
}) {
  const a = lr(() => Yp(t), [t]), s = ((l) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return l.map((f) => u.of(f));
  })(n);
  return /* @__PURE__ */ p("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ T("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ p(Lg, { versionHistory: o }),
    /* @__PURE__ */ p("div", { className: "pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300" }),
    /* @__PURE__ */ T("div", { className: "pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3", children: [
      /* @__PURE__ */ p("h2", { className: "pr-text-md pr-font-semibold", children: "Information" }),
      /* @__PURE__ */ T("div", { className: "pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600", children: [
        /* @__PURE__ */ T("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ p("span", { className: "pr-mb-2", children: "Publisher" }),
          /* @__PURE__ */ p("span", { className: "pr-font-semibold", children: r }),
          /* @__PURE__ */ p("span", { className: "pr-mb-2 pr-mt-4", children: "Size" }),
          /* @__PURE__ */ p("span", { className: "pr-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ p("div", { className: "pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600", children: /* @__PURE__ */ T("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ p("span", { className: "pr-mb-2", children: "Languages" }),
          /* @__PURE__ */ p("span", { className: "pr-font-semibold", children: s.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Bv = (e, r) => {
  We(() => {
    if (!e)
      return () => {
      };
    const t = e(r);
    return () => {
      t();
    };
  }, [e, r]);
}, Kn = () => !1, jv = (e, r) => {
  const [t] = co(
    Se(async () => {
      if (!e)
        return Kn;
      const n = await Promise.resolve(e(r));
      return async () => n();
    }, [r, e]),
    Kn,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  We(() => () => {
    t !== Kn && t();
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
  yh as Alert,
  Nh as AlertDescription,
  xh as AlertTitle,
  lv as BOOK_SELECTOR_STRING_KEYS,
  pv as BookChapterControl,
  Zl as BookSelectionMode,
  cv as BookSelector,
  ye as Button,
  kh as Card,
  Ch as CardContent,
  Sh as CardDescription,
  Oh as CardFooter,
  Eh as CardHeader,
  Th as CardTitle,
  Jl as ChapterRangeSelector,
  Wi as Checkbox,
  Nv as Checklist,
  pa as ComboBox,
  ic as DataTable,
  Pv as DisableButton,
  vo as DropdownMenu,
  bo as DropdownMenuCheckboxItem,
  ln as DropdownMenuContent,
  Sl as DropdownMenuGroup,
  Ci as DropdownMenuItem,
  Vg as DropdownMenuItemType,
  Ot as DropdownMenuLabel,
  av as DropdownMenuPortal,
  sv as DropdownMenuRadioGroup,
  Oi as DropdownMenuRadioItem,
  cn as DropdownMenuSeparator,
  Rl as DropdownMenuShortcut,
  iv as DropdownMenuSub,
  Ol as DropdownMenuSubContent,
  Cl as DropdownMenuSubTrigger,
  Si as DropdownMenuTrigger,
  Rv as EnableButton,
  jg as FilterButton,
  Iv as FilterDropdown,
  Dv as Footer,
  hh as GridMenu,
  bh as HamburgerMenuButton,
  dv as INVENTORY_STRING_KEYS,
  kv as IconButton,
  Ct as Input,
  Ov as InstallButton,
  uv as Inventory,
  He as Label,
  $v as MarkdownRenderer,
  Ds as MenuItem,
  Mv as MoreInfo,
  gv as NavigationContentSearch,
  Av as NoExtensionsFound,
  Ri as RadioGroup,
  eo as RadioGroupItem,
  vv as ScriptureResultsViewer,
  bv as ScrollGroupSelector,
  uc as SearchBar,
  yt as Select,
  Gr as SelectContent,
  ec as SelectGroup,
  Ge as SelectItem,
  rc as SelectLabel,
  ji as SelectScrollDownButton,
  Bi as SelectScrollUpButton,
  tc as SelectSeparator,
  zr as SelectTrigger,
  xt as SelectValue,
  Xi as Separator,
  wv as SettingsList,
  xv as SettingsListHeader,
  yv as SettingsListItem,
  Rh as Slider,
  Sv as Sonner,
  Mt as Spinner,
  Ph as Switch,
  dn as Table,
  fn as TableBody,
  ac as TableCaption,
  Ur as TableCell,
  oc as TableFooter,
  Nt as TableHead,
  un as TableHeader,
  pr as TableRow,
  Cv as Tabs,
  Ih as TabsContent,
  _h as TabsList,
  $h as TabsTrigger,
  Ev as TextField,
  Fi as ToggleGroup,
  Xt as ToggleGroupItem,
  Tv as Toolbar,
  _v as UpdateButton,
  Lg as VersionHistory,
  zi as VerticalTabs,
  Ui as VerticalTabsContent,
  Gi as VerticalTabsList,
  fc as VerticalTabsTrigger,
  Ll as buttonVariants,
  wo as getSortingIcon,
  mv as inventoryCountColumn,
  fv as inventoryItemColumn,
  hv as inventoryStatusColumn,
  Fv as sonner,
  Bv as useEvent,
  jv as useEventAsync,
  co as usePromise
};
//# sourceMappingURL=index.js.map
