import rc, { jsx as p, jsxs as $, Fragment as Et } from "react/jsx-runtime";
import * as E from "react";
import U, { forwardRef as kn, useCallback as Ce, useState as he, useRef as At, useEffect as et, useLayoutEffect as Na, useMemo as pt } from "react";
import { History as nc, ChevronRight as Ii, Check as En, Circle as Mi, ArrowDownWideNarrow as oc, Clock as ac, Bookmark as ic, X as sc, Search as lc, ChevronsUpDown as cc, FilterIcon as pc, ChevronDown as Nn, ChevronUp as dc, ArrowLeftIcon as uc, ChevronLeftIcon as fc, ChevronRightIcon as mc, ArrowRightIcon as hc, ArrowUpIcon as gc, ArrowDownIcon as bc, ArrowUpDownIcon as vc, CircleCheckIcon as yc, CircleXIcon as wc, CircleHelpIcon as xc, ChevronLeft as kc, LoaderCircle as Ec, Download as Nc, Filter as Tc, User as Sc, Link as Cc, CircleHelp as Oc } from "lucide-react";
import Oe, { clsx as Rc } from "clsx";
import { extendTailwindMerge as Pc } from "tailwind-merge";
import * as be from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as $c } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as _c, formatScrRef as qn, compareScrRefs as bo, scrRefToBBBCCCVVV as Kn, getLocalizeKeyForScrollGroupId as me, NumberFormat as Ic, formatBytes as Mc } from "platform-bible-utils";
import { Slot as Ac } from "@radix-ui/react-slot";
import { cva as Tn } from "class-variance-authority";
import * as Ai from "@radix-ui/react-label";
import * as _r from "@radix-ui/react-radio-group";
import * as Ir from "@radix-ui/react-popover";
import { Command as De } from "cmdk";
import * as tt from "@radix-ui/react-dialog";
import { useReactTable as Di, getCoreRowModel as Bi, getPaginationRowModel as Dc, getSortedRowModel as ji, getFilteredRowModel as Bc, flexRender as Sr, getExpandedRowModel as jc, getGroupedRowModel as Lc } from "@tanstack/react-table";
import * as xe from "@radix-ui/react-select";
import * as Sn from "@radix-ui/react-toggle-group";
import * as Li from "@radix-ui/react-toggle";
import * as Be from "@radix-ui/react-tabs";
import * as Vi from "@radix-ui/react-separator";
import { FormLabel as Vc, Checkbox as Fc, MenuItem as zc, ListItemText as Uc, ListItemIcon as Fi, Menu as Hc, Grid as zi, List as Gc, IconButton as Ui, Drawer as Wc, Slider as Xc, Snackbar as Yc, Switch as qc, AppBar as Kc, Toolbar as Jc } from "@mui/material";
import * as vo from "@radix-ui/react-checkbox";
import Zc, { ThemeContext as Qc, internal_processStyles as ep } from "@mui/styled-engine";
import * as tp from "react-dom";
import tn from "react-dom";
import { Toaster as rp } from "sonner";
import { toast as L0 } from "sonner";
import * as kr from "@radix-ui/react-slider";
import * as yo from "@radix-ui/react-switch";
const np = Pc({ prefix: "pr-" });
function M(...e) {
  return np(Rc(e));
}
const zr = U.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ p(
    "input",
    {
      type: t,
      className: M(
        "pr-twp pr-flex pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
zr.displayName = "Input";
const op = kn(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ $("div", { className: "pr-relative", children: [
    /* @__PURE__ */ p(
      zr,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-bg-background pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-shadow-none pr-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && n(), t(i);
        },
        onClick: r,
        ref: a
      }
    ),
    /* @__PURE__ */ p(
      nc,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var ap = Object.defineProperty, ip = (e, t, r) => t in e ? ap(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => ip(e, typeof t != "symbol" ? t + "" : t, r);
const Bt = [
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
], Ao = [
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
], Hi = [
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
], Ta = gp();
function lr(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Ta ? Ta[e] : 0;
}
function Do(e) {
  return lr(e) > 0;
}
function sp(e) {
  const t = typeof e == "string" ? lr(e) : e;
  return t >= 40 && t <= 66;
}
function lp(e) {
  return (typeof e == "string" ? lr(e) : e) <= 39;
}
function Gi(e) {
  return e <= 66;
}
function cp(e) {
  const t = typeof e == "string" ? lr(e) : e;
  return Yi(t) && !Gi(t);
}
function* pp() {
  for (let e = 1; e <= Bt.length; e++)
    yield e;
}
const dp = 1, Wi = Bt.length;
function up() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Bo(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= Bt.length ? t : Bt[r];
}
function Xi(e) {
  return e <= 0 || e > Wi ? "******" : Hi[e - 1];
}
function fp(e) {
  return Xi(lr(e));
}
function Yi(e) {
  const t = typeof e == "number" ? Bo(e) : e;
  return Do(t) && !Ao.includes(t);
}
function mp(e) {
  const t = typeof e == "number" ? Bo(e) : e;
  return Do(t) && Ao.includes(t);
}
function hp(e) {
  return Hi[e - 1].includes("*obsolete*");
}
function gp() {
  const e = {};
  for (let t = 0; t < Bt.length; t++)
    e[Bt[t]] = t + 1;
  return e;
}
const fe = {
  allBookIds: Bt,
  nonCanonicalIds: Ao,
  bookIdToNumber: lr,
  isBookIdValid: Do,
  isBookNT: sp,
  isBookOT: lp,
  isBookOTNT: Gi,
  isBookDC: cp,
  allBookNumbers: pp,
  firstBook: dp,
  lastBook: Wi,
  extraBooks: up,
  bookNumberToId: Bo,
  bookNumberToEnglishName: Xi,
  bookIdToEnglishName: fp,
  isCanonical: Yi,
  isExtraMaterial: mp,
  isObsolete: hp
};
var Je = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Je || {});
const Ve = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Je[t]) : (this._type = t, this.name = Je[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(Ve, "Original", new Ve(Je.Original)), oe(Ve, "Septuagint", new Ve(Je.Septuagint)), oe(Ve, "Vulgate", new Ve(Je.Vulgate)), oe(Ve, "English", new Ve(Je.English)), oe(Ve, "RussianProtestant", new Ve(Je.RussianProtestant)), oe(Ve, "RussianOrthodox", new Ve(Je.RussianOrthodox));
let Rt = Ve;
function Sa(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var qi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(qi || {});
const Ie = class le {
  constructor(t, r, n, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), n == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = r != null && r instanceof Rt ? r : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = r != null && r instanceof Rt ? r : void 0;
        this.setEmpty(a), this._verseNum = t % le.chapterDigitShifter, this._chapterNum = Math.floor(
          t % le.bookDigitShifter / le.chapterDigitShifter
        ), this._bookNum = Math.floor(t / le.bookDigitShifter);
      } else if (r == null)
        if (t != null && t instanceof le) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof Rt ? t : le.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && r != null && n != null)
      if (typeof t == "string" && typeof r == "string" && typeof n == "string")
        this.setEmpty(o), this.updateInternal(t, r, n);
      else if (typeof t == "number" && typeof r == "number" && typeof n == "number")
        this._bookNum = t, this._chapterNum = r, this._verseNum = n, this.versification = o ?? le.defaultVersification;
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
    let r;
    try {
      return r = new le(t), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof hr)
        return r = new le(), { success: !1, verseRef: r };
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
  static getBBBCCCVVV(t, r, n) {
    return t % le.bcvMaxValue * le.bookDigitShifter + (r >= 0 ? r % le.bcvMaxValue * le.chapterDigitShifter : 0) + (n >= 0 ? n % le.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: r, chapterNum: n, verseNum: o, verse: a, versificationStr: i } = t, l = a || o.toString();
    let c;
    return i && (c = new Rt(i)), r ? new le(r, n.toString(), l, c) : new le();
  }
  /**
   * Parses a verse string and gets the leading numeric portion as a number.
   * @param verseStr - verse string to parse
   * @returns true if the entire string could be parsed as a single, simple verse number (1-999);
   *    false if the verse string represented a verse bridge, contained segment letters, or was invalid
   */
  static tryGetVerseNum(t) {
    let r;
    if (!t)
      return r = -1, { success: !0, vNum: r };
    r = 0;
    let n;
    for (let o = 0; o < t.length; o++) {
      if (n = t[o], n < "0" || n > "9")
        return o === 0 && (r = -1), { success: !1, vNum: r };
      if (r = r * 10 + +n - 0, r > le.bcvMaxValue)
        return r = -1, { success: !1, vNum: r };
    }
    return { success: !0, vNum: r };
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
    return fe.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = fe.bookIdToNumber(t);
  }
  /**
   * Gets or sets the chapter of the reference,. e.g. `'3'`.
   */
  get chapter() {
    return this.isDefault || this._chapterNum < 0 ? "" : this._chapterNum.toString();
  }
  set chapter(t) {
    const r = +t;
    this._chapterNum = Number.isInteger(r) ? r : -1;
  }
  /**
   * Gets or sets the verse of the reference, including range, segments, and sequences, e.g. `'4'`,
   * or `'4b-5a, 7'`.
   */
  get verse() {
    return this._verse != null ? this._verse : this.isDefault || this._verseNum < 0 ? "" : this._verseNum.toString();
  }
  set verse(t) {
    const { success: r, vNum: n } = le.tryGetVerseNum(t);
    this._verse = r ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = le.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > fe.lastBook)
      throw new hr(
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
    this.versification = this.versification != null ? new Rt(t) : void 0;
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
          this.versification = new Rt(Je[i]);
        } catch {
          throw new hr("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new hr("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || fe.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(n[1]))
      throw new hr("Invalid reference : " + t);
    this.updateInternal(r[0], n[0], n[1]);
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
    const r = {
      book: this.book,
      chapterNum: this.chapterNum,
      verseNum: this.verseNum,
      verse: t,
      versificationStr: this.versificationStr
    };
    return t || delete r.verse, r;
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
  allVerses(t = !1, r = le.verseRangeSeparators, n = le.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Sa(this._verse, n);
    for (const i of a.map((l) => Sa(l, r))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const u = this.clone();
        if (u.verse = i[1], !t)
          for (let m = c + 1; m < u.verseNum; m++) {
            const v = new le(
              this._bookNum,
              this._chapterNum,
              m,
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
  validateVerse(t, r) {
    if (!this.verse)
      return this.internalValid;
    let n = 0;
    for (const o of this.allVerses(!0, t, r)) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > fe.lastBook ? 2 : (fe.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = fe.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(Ie, "defaultVersification", Rt.English), oe(Ie, "verseRangeSeparator", "-"), oe(Ie, "verseSequenceIndicator", ","), oe(Ie, "verseRangeSeparators", [Ie.verseRangeSeparator]), oe(Ie, "verseSequenceIndicators", [Ie.verseSequenceIndicator]), oe(Ie, "chapterDigitShifter", 1e3), oe(Ie, "bookDigitShifter", Ie.chapterDigitShifter * Ie.chapterDigitShifter), oe(Ie, "bcvMaxValue", Ie.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Ie, "ValidStatusType", qi);
let hr = class extends Error {
};
const jo = be.Root, Ki = be.Trigger, bp = be.Group, Zv = be.Portal, Qv = be.Sub, e0 = be.RadioGroup, vp = U.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ $(
  be.SubTrigger,
  {
    ref: o,
    className: M(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ p(Ii, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
vp.displayName = be.SubTrigger.displayName;
const yp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  be.SubContent,
  {
    ref: r,
    className: M(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
yp.displayName = be.SubContent.displayName;
const Cn = U.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ p(be.Portal, { children: /* @__PURE__ */ p(
  be.Content,
  {
    ref: n,
    sideOffset: t,
    className: M(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Cn.displayName = be.Content.displayName;
const Ji = U.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ p(
  be.Item,
  {
    ref: n,
    className: M(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...r
  }
));
Ji.displayName = be.Item.displayName;
const Lo = U.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ $(
  be.CheckboxItem,
  {
    ref: o,
    className: M(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(be.ItemIndicator, { children: /* @__PURE__ */ p(En, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Lo.displayName = be.CheckboxItem.displayName;
const Zi = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  be.RadioItem,
  {
    ref: n,
    className: M(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(be.ItemIndicator, { children: /* @__PURE__ */ p(Mi, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Zi.displayName = be.RadioItem.displayName;
const Ur = U.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ p(
  be.Label,
  {
    ref: n,
    className: M("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
Ur.displayName = be.Label.displayName;
const On = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  be.Separator,
  {
    ref: r,
    className: M("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
On.displayName = be.Separator.displayName;
function wp({ className: e, ...t }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: M("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
wp.displayName = "DropdownMenuShortcut";
const xp = kn(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ $(
    Ji,
    {
      ref: l,
      textValue: e,
      className: M("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": r
      }),
      onSelect: (c) => {
        c.preventDefault(), t();
      },
      onKeyDown: (c) => {
        o(c);
      },
      onFocus: n,
      onMouseMove: n,
      children: [
        /* @__PURE__ */ p(
          "span",
          {
            className: M(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": r,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: fe.bookIdToEnglishName(e)
          }
        ),
        r && /* @__PURE__ */ p("div", { children: i })
      ]
    },
    e
  )
);
function kp({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: r,
  highlightedChapter: n,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), i = Ce(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ p("div", { className: M("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ p(
    "div",
    {
      className: M(
        "pr-box-content pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": l === r,
          "pr-bg-amber-200": l === n
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
function Ep({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ $(Ur, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ p("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ p(
        oc,
        {
          onClick: e,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ p(
        ac,
        {
          onClick: t,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ p(
        ic,
        {
          onClick: r,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      )
    ] })
  ] });
}
const Cr = fe.allBookIds, Np = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Ca = ["OT", "NT", "DC"], Tp = 32 + 32 + 32, Sp = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Cp = (e) => ({
  OT: Cr.filter((r) => fe.isBookOT(r)),
  NT: Cr.filter((r) => fe.isBookNT(r)),
  DC: Cr.filter((r) => fe.isBookDC(r))
})[e], gr = (e) => _c(fe.bookIdToNumber(e));
function Op() {
  return Cr.map((t) => fe.bookIdToEnglishName(t));
}
function Rp(e) {
  return Op().includes(e);
}
function Pp(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Rp(t))
    return Cr.find((n) => fe.bookIdToEnglishName(n) === t);
}
function t0({ scrRef: e, handleSubmit: t }) {
  const [r, n] = he(""), [o, a] = he(
    fe.bookNumberToId(e.bookNum)
  ), [i, l] = he(e.chapterNum ?? 0), [c, u] = he(
    fe.bookNumberToId(e.bookNum)
  ), [m, v] = he(!1), [b, d] = he(m), h = At(void 0), f = At(void 0), g = At(void 0), w = Ce(
    (N) => Cp(N).filter((A) => {
      const B = fe.bookIdToEnglishName(A).toLowerCase(), z = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return B.includes(z) || // Match book name
      A.toLowerCase().includes(z);
    }),
    [r]
  ), O = (N) => {
    n(N);
  }, x = At(!1), k = Ce((N) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    v(N);
  }, []), y = Ce(
    (N, A, B, z) => {
      if (l(
        fe.bookNumberToId(e.bookNum) !== N ? 1 : e.chapterNum
      ), A || gr(N) === -1) {
        t({
          bookNum: fe.bookIdToNumber(N),
          chapterNum: B || 1,
          verseNum: z || 1
        }), v(!1), n("");
        return;
      }
      a(o !== N ? N : ""), v(!A);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (N) => {
    N <= 0 || N > gr(o) || y(o, !0, N);
  }, S = Ce(() => {
    Sp.forEach((N) => {
      const A = r.match(N);
      if (A) {
        const [B, z = void 0, G = void 0] = A.slice(1), j = Pp(B);
        (fe.isBookIdValid(B) || j) && y(
          j ?? B,
          !0,
          z ? parseInt(z, 10) : 1,
          G ? parseInt(G, 10) : 1
        );
      }
    });
  }, [y, r]), I = Ce(
    (N) => {
      m ? (N.key === "ArrowDown" || N.key === "ArrowUp") && (typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null ? g.current.focus() : typeof f < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      f.current !== null && f.current.focus(), N.preventDefault()) : v(!0);
    },
    [m]
  ), R = (N) => {
    const { key: A } = N;
    A === "ArrowRight" || A === "ArrowLeft" || A === "ArrowDown" || A === "ArrowUp" || A === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: A })), h.current.focus());
  }, _ = (N) => {
    const { key: A } = N;
    if (c === o) {
      if (A === "Enter") {
        N.preventDefault(), y(o, !0, i);
        return;
      }
      let B = 0;
      if (A === "ArrowRight")
        if (i < gr(c))
          B = 1;
        else {
          N.preventDefault();
          return;
        }
      else if (A === "ArrowLeft")
        if (i > 1)
          B = -1;
        else {
          N.preventDefault();
          return;
        }
      else
        A === "ArrowDown" ? B = 6 : A === "ArrowUp" && (B = -6);
      i + B <= 0 || i + B > gr(c) ? l(0) : B !== 0 && (l(i + B), N.preventDefault());
    }
  };
  return et(() => {
    o === c ? o === fe.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), Na(() => {
    d(m);
  }, [m]), Na(() => {
    const N = setTimeout(() => {
      if (b && f.current && g.current) {
        const B = g.current.offsetTop - Tp;
        f.current.scrollTo({ top: B, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(N);
    };
  }, [b]), /* @__PURE__ */ p("div", { className: "pr-twp pr-flex", children: /* @__PURE__ */ $(jo, { modal: !1, open: m, onOpenChange: k, children: [
    /* @__PURE__ */ p(Ki, { asChild: !0, children: /* @__PURE__ */ p(
      op,
      {
        ref: h,
        value: r,
        handleSearch: O,
        handleKeyDown: I,
        handleOnClick: () => {
          a(fe.bookNumberToId(e.bookNum)), u(fe.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: S,
        placeholder: `${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ $(
      Cn,
      {
        className: "pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: R,
        align: "start",
        ref: f,
        children: [
          /* @__PURE__ */ p(
            Ep,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Ca.map(
            (N, A) => w(N).length > 0 && /* @__PURE__ */ $("div", { children: [
              /* @__PURE__ */ p(Ur, { className: "pr-font-semibold pr-text-foreground/80", children: Np[N] }),
              w(N).map((B) => /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(
                xp,
                {
                  bookId: B,
                  handleSelectBook: () => y(B, !1),
                  isSelected: o === B,
                  handleHighlightBook: () => u(B),
                  handleKeyDown: _,
                  bookType: N,
                  ref: (z) => {
                    o === B && (g.current = z);
                  },
                  children: /* @__PURE__ */ p(
                    kp,
                    {
                      handleSelectChapter: T,
                      endChapter: gr(B),
                      activeChapter: e.bookNum === fe.bookIdToNumber(B) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (z) => {
                        l(z);
                      }
                    }
                  )
                }
              ) }, B)),
              Ca.length - 1 !== A ? /* @__PURE__ */ p(On, {}) : void 0
            ] }, N)
          )
        ]
      }
    )
  ] }) });
}
const $p = Tn(
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
), Ne = U.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ p(n ? Ac : "button", { className: M($p({ variant: t, size: r, className: e })), ref: a, ...o })
);
Ne.displayName = "Button";
const _p = Tn(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Ze = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(Ai.Root, { ref: r, className: M("pr-twp", _p(), e), ...t }));
Ze.displayName = Ai.Root.displayName;
const Qi = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  _r.Root,
  {
    className: M("pr-twp pr-grid pr-gap-2", e),
    ...t,
    ref: r
  }
));
Qi.displayName = _r.Root.displayName;
const wo = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  _r.Item,
  {
    ref: r,
    className: M(
      "pr-twp pr-aspect-square pr-h-4 pr-w-4 pr-rounded-full pr-border pr-border-primary pr-text-primary pr-ring-offset-background focus:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ p(_r.Indicator, { className: "pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ p(Mi, { className: "pr-h-2.5 pr-w-2.5 pr-fill-current pr-text-current" }) })
  }
));
wo.displayName = _r.Item.displayName;
const Ip = Ir.Root, Mp = Ir.Trigger, es = U.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ p(Ir.Portal, { children: /* @__PURE__ */ p(
  Ir.Content,
  {
    ref: o,
    align: t,
    sideOffset: r,
    className: M(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
es.displayName = Ir.Content.displayName;
const Ap = tt.Portal, ts = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  tt.Overlay,
  {
    ref: r,
    className: M(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
ts.displayName = tt.Overlay.displayName;
const Dp = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(Ap, { children: [
  /* @__PURE__ */ p(ts, {}),
  /* @__PURE__ */ $(
    tt.Content,
    {
      ref: n,
      className: M(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ $(tt.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ p(sc, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Dp.displayName = tt.Content.displayName;
const Bp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  tt.Title,
  {
    ref: r,
    className: M("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Bp.displayName = tt.Title.displayName;
const jp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  tt.Description,
  {
    ref: r,
    className: M("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
jp.displayName = tt.Description.displayName;
const rs = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De,
  {
    ref: r,
    className: M(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
rs.displayName = De.displayName;
const ns = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ p(lc, { className: "pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ p(
    De.Input,
    {
      ref: r,
      className: M(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
ns.displayName = De.Input.displayName;
const os = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.List,
  {
    ref: r,
    className: M("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
os.displayName = De.List.displayName;
const as = U.forwardRef((e, t) => /* @__PURE__ */ p(De.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
as.displayName = De.Empty.displayName;
const Lp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.Group,
  {
    ref: r,
    className: M(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Lp.displayName = De.Group.displayName;
const Vp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.Separator,
  {
    ref: r,
    className: M("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Vp.displayName = De.Separator.displayName;
const is = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.Item,
  {
    ref: r,
    className: M(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
is.displayName = De.Item.displayName;
function Fp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Oa({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = Fp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: u = "outline",
  dir: m = "ltr",
  isDisabled: v = !1,
  ...b
}) {
  const [d, h] = he(!1);
  return /* @__PURE__ */ $(Ip, { open: d, onOpenChange: h, ...b, children: [
    /* @__PURE__ */ p(Mp, { asChild: !0, children: /* @__PURE__ */ $(
      Ne,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": d,
        id: e,
        className: M("pr-w-[200px] pr-justify-between", r),
        disabled: v,
        children: [
          /* @__PURE__ */ p("span", { className: "pr-overflow-hidden pr-text-ellipsis pr-whitespace-nowrap", children: n ? a(n) : i }),
          /* @__PURE__ */ p(cc, { className: "pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ p(es, { className: "pr-w-[200px] pr-p-0", dir: m, children: /* @__PURE__ */ $(rs, { children: [
      /* @__PURE__ */ p(ns, { dir: m, placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ p(as, { children: c }),
      /* @__PURE__ */ p(os, { children: t.map((f) => /* @__PURE__ */ $(
        is,
        {
          value: a(f),
          onSelect: () => {
            o(f), h(!1);
          },
          children: [
            /* @__PURE__ */ p(
              En,
              {
                className: M("pr-me-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !n || a(n) !== a(f)
                })
              }
            ),
            a(f)
          ]
        },
        a(f)
      )) })
    ] }) })
  ] });
}
function zp({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: r,
  handleSelectEndChapter: n,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = pt(
    () => Array.from({ length: a }, (u, m) => m + 1),
    [a]
  );
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ p(Ze, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ p(
      Oa,
      {
        isDisabled: o,
        onChange: (u) => {
          r(u), u > t && n(u);
        },
        className: "pr-ml-2 pr-mr-2 pr-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ p(Ze, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ p(
      Oa,
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u < e && r(u);
        },
        className: "pr-ml-2 pr-w-20",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var Up = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(Up || {});
const r0 = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Jn = (e, t) => e[t] ?? t;
function n0({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: r,
  selectedBookIds: n,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: u
}) {
  const m = Jn(u, "%webView_bookSelector_currentBook%"), v = Jn(u, "%webView_bookSelector_choose%"), b = Jn(u, "%webView_bookSelector_chooseBooks%"), [d, h] = he(
    "current book"
    /* CURRENT_BOOK */
  ), f = (g) => {
    h(g), e(g);
  };
  return /* @__PURE__ */ p(
    Qi,
    {
      className: "pr-twp pr-flex",
      value: d,
      onValueChange: (g) => f(g),
      children: /* @__PURE__ */ $("div", { className: "pr-flex pr-w-full pr-flex-col pr-gap-4", children: [
        /* @__PURE__ */ $("div", { className: "pr-grid pr-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center", children: [
            /* @__PURE__ */ p(wo, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ p(Ze, { className: "pr-ml-1", children: `${m}:` })
          ] }),
          /* @__PURE__ */ p(Ze, { className: "pr-flex pr-items-center", children: t }),
          /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center pr-justify-end", children: /* @__PURE__ */ p(
            zp,
            {
              isDisabled: d === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ $("div", { className: "pr-grid pr-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center", children: [
            /* @__PURE__ */ p(wo, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ p(Ze, { className: "pr-ml-1", children: `${b}:` })
          ] }),
          /* @__PURE__ */ p(Ze, { className: "pr-flex pr-items-center", children: n.map((g) => fe.bookIdToEnglishName(g)).join(", ") }),
          /* @__PURE__ */ p(
            Ne,
            {
              disabled: d === "current book",
              onClick: () => r(),
              children: v
            }
          )
        ] })
      ] })
    }
  );
}
function Hp({ table: e }) {
  return /* @__PURE__ */ $(jo, { children: [
    /* @__PURE__ */ p($c, { asChild: !0, children: /* @__PURE__ */ $(Ne, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ p(pc, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ $(Cn, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ p(Ur, { children: "Toggle columns" }),
      /* @__PURE__ */ p(On, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ p(
        Lo,
        {
          className: "pr-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (r) => t.toggleVisibility(!!r),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
const Mr = xe.Root, Gp = xe.Group, Ar = xe.Value, Qt = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  xe.Trigger,
  {
    ref: n,
    className: M(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ p(xe.Icon, { asChild: !0, children: /* @__PURE__ */ p(Nn, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Qt.displayName = xe.Trigger.displayName;
const ss = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  xe.ScrollUpButton,
  {
    ref: r,
    className: M("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ p(dc, { className: "pr-h-4 pr-w-4" })
  }
));
ss.displayName = xe.ScrollUpButton.displayName;
const ls = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  xe.ScrollDownButton,
  {
    ref: r,
    className: M("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ p(Nn, { className: "pr-h-4 pr-w-4" })
  }
));
ls.displayName = xe.ScrollDownButton.displayName;
const er = U.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ p(xe.Portal, { children: /* @__PURE__ */ $(
  xe.Content,
  {
    ref: o,
    className: M(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ p(ss, {}),
      /* @__PURE__ */ p(
        xe.Viewport,
        {
          className: M(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ p(ls, {})
    ]
  }
) }));
er.displayName = xe.Content.displayName;
const Wp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  xe.Label,
  {
    ref: r,
    className: M("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Wp.displayName = xe.Label.displayName;
const Ke = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  xe.Item,
  {
    ref: n,
    className: M(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(xe.ItemIndicator, { children: /* @__PURE__ */ p(En, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ p(xe.ItemText, { children: t })
    ]
  }
));
Ke.displayName = xe.Item.displayName;
const Xp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  xe.Separator,
  {
    ref: r,
    className: M("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Xp.displayName = xe.Separator.displayName;
function Yp({ table: e }) {
  return /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ $("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ p("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ $(
        Mr,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ p(Qt, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ p(Ar, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ p(er, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ p(Ke, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ $(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ p(uc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ $(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ p(fc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ $(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ p(mc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ $(
        Ne,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ p(hc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Rn = U.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ p("div", { className: M("pr-twp pr-relative pr-w-full", { "pr-overflow-auto": !t }), children: /* @__PURE__ */ p(
  "table",
  {
    ref: n,
    className: M("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...r
  }
) }));
Rn.displayName = "Table";
const Pn = U.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ p(
  "thead",
  {
    ref: n,
    className: M(
      { "pr-sticky pr-top-0 pr-bg-muted": t },
      "[&_tr]:pr-border-b",
      e
    ),
    ...r
  }
));
Pn.displayName = "TableHeader";
const $n = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("tbody", { ref: r, className: M("[&_tr:last-child]:pr-border-0", e), ...t }));
$n.displayName = "TableBody";
const qp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "tfoot",
  {
    ref: r,
    className: M("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
qp.displayName = "TableFooter";
const kt = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "tr",
    {
      ref: r,
      className: M(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
kt.displayName = "TableRow";
const Dr = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "th",
  {
    ref: r,
    className: M(
      "pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",
      e
    ),
    ...t
  }
));
Dr.displayName = "TableHead";
const tr = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "td",
  {
    ref: r,
    className: M("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0", e),
    ...t
  }
));
tr.displayName = "TableCell";
const Kp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "caption",
  {
    ref: r,
    className: M("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Kp.displayName = "TableCaption";
function Jp({
  columns: e,
  data: t,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var g;
  const [l, c] = he([]), [u, m] = he([]), [v, b] = he({}), [d, h] = he({}), f = Di({
    data: t,
    columns: e,
    getCoreRowModel: Bi(),
    ...r && { getPaginationRowModel: Dc() },
    onSortingChange: c,
    getSortedRowModel: ji(),
    onColumnFiltersChange: m,
    getFilteredRowModel: Bc(),
    onColumnVisibilityChange: b,
    onRowSelectionChange: h,
    state: {
      sorting: l,
      columnFilters: u,
      columnVisibility: v,
      rowSelection: d
    }
  });
  return /* @__PURE__ */ $("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ p(Hp, { table: f }),
    /* @__PURE__ */ $(Rn, { stickyHeader: a, children: [
      /* @__PURE__ */ p(Pn, { stickyHeader: a, children: f.getHeaderGroups().map((w) => /* @__PURE__ */ p(kt, { children: w.headers.map((O) => /* @__PURE__ */ p(Dr, { children: O.isPlaceholder ? void 0 : Sr(O.column.columnDef.header, O.getContext()) }, O.id)) }, w.id)) }),
      /* @__PURE__ */ p($n, { children: (g = f.getRowModel().rows) != null && g.length ? f.getRowModel().rows.map((w) => /* @__PURE__ */ p(
        kt,
        {
          onClick: () => i(w, f),
          "data-state": w.getIsSelected() && "selected",
          children: w.getVisibleCells().map((O) => /* @__PURE__ */ p(tr, { children: Sr(O.column.columnDef.cell, O.getContext()) }, O.id))
        },
        w.id
      )) : /* @__PURE__ */ p(kt, { children: /* @__PURE__ */ p(tr, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ p(
        Ne,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.previousPage(),
          disabled: !f.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ p(
        Ne,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.nextPage(),
          disabled: !f.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ p(Yp, { table: f })
  ] });
}
const Zp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ra = (e) => {
  const t = /^\\[vc]\s+(\d+)/, r = e.match(t);
  if (r)
    return +r[1];
}, Pa = (e, t, r, n) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = Zp(e);
  let i = n.chapterNum, l = n.verseNum, c = 0;
  return a.forEach((u) => {
    u.startsWith("\\id") && (i = 0, l = 0), u.startsWith("\\c") && (i = Ra(u), l = 0), u.startsWith("\\v") && (l = Ra(u), i === 0 && (i = n.chapterNum));
    const m = r(u, t);
    for (let v = 0; v < m.length; v++) {
      const b = {
        reference: {
          ...n,
          chapterNum: i !== void 0 ? +i : -1,
          verseNum: l !== void 0 ? +l : -1
        },
        snippet: u,
        key: c
      };
      c += 1, o.push(b);
    }
  }), o;
};
function Qp({
  selectedItem: e,
  text: t,
  extractItems: r,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], l = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, u] = he(
    Pa(t, e, r, n)
  );
  return et(
    () => u(Pa(t, e, r, n)),
    [t, e, n, r]
  ), /* @__PURE__ */ $(Rn, { stickyHeader: !0, children: [
    /* @__PURE__ */ p(Pn, { stickyHeader: !0, children: /* @__PURE__ */ $(kt, { children: [
      /* @__PURE__ */ p(Dr, { children: i }),
      /* @__PURE__ */ p(Dr, { children: l })
    ] }) }),
    /* @__PURE__ */ p($n, { children: c.map((m) => /* @__PURE__ */ $(
      kt,
      {
        onClick: () => {
          o(m.reference);
        },
        children: [
          /* @__PURE__ */ p(tr, { children: `${fe.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}` }),
          /* @__PURE__ */ p(tr, { children: m.snippet })
        ]
      },
      m.key
    )) })
  ] });
}
const o0 = Object.freeze([
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
]), Vo = (e) => e === "asc" ? /* @__PURE__ */ p(gc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ p(bc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ p(vc, { className: "pr-ms-2 pr-h-4 pr-w-4" }), ed = (e, t, r) => {
  let n = e;
  return t !== "all" && (n = n.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), r !== "" && (n = n.filter((o) => o.item.includes(r))), n;
}, td = (e, t, r) => {
  const n = [], o = t(e);
  for (let a = 0; a < o.length; a++) {
    const i = o[a], l = n.find((c) => c.item === i);
    if (l)
      l.count += 1;
    else {
      const c = {
        item: i,
        count: 1,
        status: r(i)
      };
      n.push(c);
    }
  }
  return n;
}, bt = (e, t) => e[t] ?? t;
function a0({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  extractItems: n,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: l,
  text: c,
  scope: u,
  onScopeChange: m,
  getColumns: v
}) {
  const b = bt(r, "%webView_inventory_all%"), d = bt(r, "%webView_inventory_approved%"), h = bt(r, "%webView_inventory_unapproved%"), f = bt(r, "%webView_inventory_unknown%"), g = bt(r, "%webView_platformScripture_currentBook%"), w = bt(r, "%webView_inventory_scope_chapter%"), O = bt(r, "%webView_inventory_scope_verse%"), x = bt(r, "%webView_inventory_filter_text%"), [k, y] = he([]), [T, S] = he("all"), [I, R] = he(""), [_, N] = he(""), A = Ce(
    (F, C) => {
      y((Y) => {
        let H = [];
        return F.forEach((K) => {
          H = Y.map((q) => q.item === K && q.status !== C ? { ...q, status: C } : q);
        }), H;
      });
      let L = [...o];
      F.forEach((Y) => {
        C === "approved" ? L.includes(Y) || L.push(Y) : L = L.filter((H) => H !== Y);
      }), a(L);
      let X = [...i];
      F.forEach((Y) => {
        C === "unapproved" ? X.includes(Y) || X.push(Y) : X = X.filter(
          (H) => H !== Y
        );
      }), l(X);
    },
    [o, a, i, l]
  ), B = Ce(
    (F) => o.includes(F) ? "approved" : i.includes(F) ? "unapproved" : "unknown",
    [o, i]
  );
  et(() => {
    c && y(td(c, n, B));
  }, [n, c, B]);
  const z = pt(() => ed(k, T, I), [k, T, I]);
  et(() => {
    N("");
  }, [z]);
  const G = (F, C) => {
    C.toggleAllRowsSelected(!1), F.toggleSelected(void 0), N(F.getValue("item"));
  }, j = pt(() => v(A), [v, A]), W = (F) => {
    if (F === "book" || F === "chapter" || F === "verse")
      m(F);
    else
      throw new Error(`Invalid scope value: ${F}`);
  }, te = (F) => {
    if (F === "all" || F === "approved" || F === "unapproved" || F === "unknown")
      S(F);
    else
      throw new Error(`Invalid status filter value: ${F}`);
  };
  return /* @__PURE__ */ $("div", { className: "pr-twp pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ $("div", { className: "pr-flex", children: [
      /* @__PURE__ */ $(
        Mr,
        {
          onValueChange: (F) => te(F),
          defaultValue: T,
          children: [
            /* @__PURE__ */ p(Qt, { className: "pr-m-1", children: /* @__PURE__ */ p(Ar, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ $(er, { children: [
              /* @__PURE__ */ p(Ke, { value: "all", children: b }),
              /* @__PURE__ */ p(Ke, { value: "approved", children: d }),
              /* @__PURE__ */ p(Ke, { value: "unapproved", children: h }),
              /* @__PURE__ */ p(Ke, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ $(Mr, { onValueChange: (F) => W(F), defaultValue: u, children: [
        /* @__PURE__ */ p(Qt, { className: "pr-m-1", children: /* @__PURE__ */ p(Ar, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ $(er, { children: [
          /* @__PURE__ */ p(Ke, { value: "book", children: g }),
          /* @__PURE__ */ p(Ke, { value: "chapter", children: w }),
          /* @__PURE__ */ p(Ke, { value: "verse", children: O })
        ] })
      ] }),
      /* @__PURE__ */ p(
        zr,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: x,
          value: I,
          onChange: (F) => {
            R(F.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ p(
      Jp,
      {
        columns: j,
        data: z,
        onRowClickHandler: G,
        stickyHeader: !0
      }
    ) }),
    _ !== "" && /* @__PURE__ */ p("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ p(
      Qp,
      {
        selectedItem: _,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (F) => t(F),
        localizedStrings: r
      }
    ) })
  ] });
}
const cs = Tn(
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
), rd = U.forwardRef(({ className: e, variant: t, size: r, ...n }, o) => /* @__PURE__ */ p(
  Li.Root,
  {
    ref: o,
    className: M(cs({ variant: t, size: r, className: e })),
    ...n
  }
));
rd.displayName = Li.Root.displayName;
const ps = U.createContext({
  size: "default",
  variant: "default"
}), ds = U.forwardRef(({ className: e, variant: t, size: r, children: n, ...o }, a) => /* @__PURE__ */ p(
  Sn.Root,
  {
    ref: a,
    className: M("pr-twp pr-flex pr-items-center pr-justify-center pr-gap-1", e),
    ...o,
    children: /* @__PURE__ */ p(
      ps.Provider,
      {
        value: { variant: t, size: r },
        children: n
      }
    )
  }
));
ds.displayName = Sn.Root.displayName;
const ln = U.forwardRef(({ className: e, children: t, variant: r, size: n, ...o }, a) => {
  const i = U.useContext(ps);
  return /* @__PURE__ */ p(
    Sn.Item,
    {
      ref: a,
      className: M(
        cs({
          variant: i.variant || r,
          size: i.size || n
        }),
        e
      ),
      ...o,
      children: t
    }
  );
});
ln.displayName = Sn.Item.displayName;
const i0 = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ $(Ne, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Vo(t.getIsSorted())
  ] })
}), s0 = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ p("div", { className: "pr-flex pr-justify-end pr-tabular-nums", children: /* @__PURE__ */ $(Ne, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Vo(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ p("div", { className: "pr-flex pr-justify-end", children: t.getValue("count") })
}), l0 = (e, t) => ({
  accessorKey: "status",
  header: ({ column: r }) => /* @__PURE__ */ p("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ $(Ne, { variant: "ghost", onClick: () => r.toggleSorting(void 0), children: [
    e,
    Vo(r.getIsSorted())
  ] }) }),
  cell: ({ row: r }) => {
    const n = r.getValue("status"), o = r.getValue("item");
    return /* @__PURE__ */ $(ds, { value: n, variant: "outline", type: "single", children: [
      /* @__PURE__ */ p(ln, { onClick: () => t([o], "approved"), value: "approved", children: /* @__PURE__ */ p(yc, {}) }),
      /* @__PURE__ */ p(
        ln,
        {
          onClick: () => t([o], "unapproved"),
          value: "unapproved",
          children: /* @__PURE__ */ p(wc, {})
        }
      ),
      /* @__PURE__ */ p(ln, { onClick: () => t([o], "unknown"), value: "unknown", children: /* @__PURE__ */ p(xc, {}) })
    ] });
  }
});
function nd({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = he(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ p(
    zr,
    {
      className: M(
        "pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        { "pr-w-full": r }
      ),
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
const us = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.Root,
  {
    orientation: "vertical",
    ref: r,
    className: M("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
us.displayName = Be.List.displayName;
const fs = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.List,
  {
    ref: r,
    className: M(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
fs.displayName = Be.List.displayName;
const od = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.Trigger,
  {
    ref: r,
    ...t,
    className: M(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), ms = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.Content,
  {
    ref: r,
    className: M(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
ms.displayName = Be.Content.displayName;
function c0({
  tabList: e,
  onSearch: t,
  searchPlaceholder: r,
  headerTitle: n,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ $("div", { className: "pr-twp", children: [
    /* @__PURE__ */ $("div", { className: "pr-sticky pr-top-0 pr-space-y-2 pr-pb-2", children: [
      n ? /* @__PURE__ */ p("h1", { children: n }) : "",
      /* @__PURE__ */ p(
        nd,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ $(us, { dir: a, children: [
      /* @__PURE__ */ p(fs, { children: e.map((i) => /* @__PURE__ */ p(od, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ p(ms, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const wt = "scrBook", ad = "scrRef", Pt = "source", id = "details", sd = "Scripture Reference", ld = "Scripture Book", hs = "Type", cd = "Details";
function pd(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${fe.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: wt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? sd,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? fe.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === wt ? qn(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => bo(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => qn(n.start),
      id: ad,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : qn(o.start);
      },
      sortingFn: (n, o) => bo(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: Pt,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? hs : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id,
      header: (e == null ? void 0 : e.detailsColumnName) ?? cd,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const dd = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let r = 0;
  return e.end && ({ offset: r } = e.end), !e.end || bo(e.start, e.end) === 0 ? `${Kn(e.start)}+${t}` : `${Kn(e.start)}+${t}-${Kn(e.end)}+${r}`;
}, $a = (e) => `${dd({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function p0({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l,
  direction: c = "ltr"
}) {
  const [u, m] = he([]), [v, b] = he([{ id: wt, desc: !1 }]), [d, h] = he({}), f = pt(
    () => e.flatMap((R) => R.data.map((_) => ({
      ..._,
      source: R.source
    }))),
    [e]
  ), g = pt(
    () => pd(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      r
    ),
    [n, a, i, r]
  );
  et(() => {
    u.includes(Pt) ? b([
      { id: Pt, desc: !1 },
      { id: wt, desc: !1 }
    ]) : b([{ id: wt, desc: !1 }]);
  }, [u]);
  const w = Di({
    data: f,
    columns: g,
    state: {
      grouping: u,
      sorting: v,
      rowSelection: d
    },
    onGroupingChange: m,
    onSortingChange: b,
    onRowSelectionChange: h,
    getExpandedRowModel: jc(),
    getGroupedRowModel: Lc(),
    getCoreRowModel: Bi(),
    getSortedRowModel: ji(),
    getRowId: $a,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  et(() => {
    if (l) {
      const R = w.getSelectedRowModel().rowsById, _ = Object.keys(R);
      if (_.length === 1) {
        const N = f.find((A) => $a(A) === _[0]) || void 0;
        N && l(N);
      }
    }
  }, [d, f, l, w]);
  const O = o ?? ld, x = a ?? hs, k = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${O}`, value: [wt] },
    { label: `Group by ${x}`, value: [Pt] },
    {
      label: `Group by ${O} and ${x}`,
      value: [wt, Pt]
    },
    {
      label: `Group by ${x} and ${O}`,
      value: [Pt, wt]
    }
  ], y = (R) => {
    m(JSON.parse(R));
  }, T = (R, _) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(_);
  }, S = (R, _) => R.getIsGrouped() ? "" : M("banded-row", _ % 2 === 0 ? "even" : "odd"), I = (R, _, N) => {
    if (!((R == null ? void 0 : R.length) === 0 || _.depth < N.column.getGroupedIndex())) {
      if (_.getIsGrouped())
        switch (_.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (_.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ $("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !t && /* @__PURE__ */ $(
      Mr,
      {
        value: JSON.stringify(u),
        onValueChange: (R) => {
          y(R);
        },
        children: [
          /* @__PURE__ */ p(Qt, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ p(Ar, {}) }),
          /* @__PURE__ */ p(er, { position: "item-aligned", children: /* @__PURE__ */ p(Gp, { children: k.map((R) => /* @__PURE__ */ p(Ke, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ $(Rn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ p(Pn, { children: w.getHeaderGroups().map((R) => /* @__PURE__ */ p(kt, { children: R.headers.filter((_) => _.column.columnDef.header).map((_) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ p(Dr, { colSpan: _.colSpan, className: "top-0 pr-sticky", children: _.isPlaceholder ? void 0 : /* @__PURE__ */ $("div", { children: [
          _.column.getCanGroup() ? /* @__PURE__ */ p(
            Ne,
            {
              variant: "ghost",
              title: `Toggle grouping by ${_.column.columnDef.header}`,
              onClick: _.column.getToggleGroupingHandler(),
              type: "button",
              children: _.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Sr(_.column.columnDef.header, _.getContext())
        ] }) }, _.id)
      )) }, R.id)) }),
      /* @__PURE__ */ p($n, { children: w.getRowModel().rows.map((R, _) => /* @__PURE__ */ p(
        kt,
        {
          "data-state": R.getIsSelected() ? "selected" : "",
          className: M(S(R, _)),
          onClick: (N) => T(R, N),
          children: R.getVisibleCells().map((N) => {
            if (!(N.getIsPlaceholder() || N.column.columnDef.enableGrouping && !N.getIsGrouped() && (N.column.columnDef.id !== Pt || !r)))
              return /* @__PURE__ */ p(
                tr,
                {
                  className: M(
                    N.column.columnDef.id,
                    "pr-p-[1px]",
                    I(u, R, N)
                  ),
                  children: (() => N.getIsGrouped() ? /* @__PURE__ */ $(
                    Ne,
                    {
                      variant: "link",
                      onClick: R.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        R.getIsExpanded() && /* @__PURE__ */ p(Nn, {}),
                        !R.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ p(Ii, {}) : /* @__PURE__ */ p(kc, {})),
                        " ",
                        Sr(N.column.columnDef.cell, N.getContext()),
                        " (",
                        R.subRows.length,
                        ")"
                      ]
                    }
                  ) : Sr(N.column.columnDef.cell, N.getContext()))()
                },
                N.id
              );
          })
        },
        R.id
      )) })
    ] })
  ] });
}
const Zn = {
  [me("undefined")]: "Ø",
  [me(0)]: "A",
  [me(1)]: "B",
  [me(2)]: "C",
  [me(3)]: "D",
  [me(4)]: "E",
  [me(5)]: "F",
  [me(6)]: "G",
  [me(7)]: "H",
  [me(8)]: "I",
  [me(9)]: "J",
  [me(10)]: "K",
  [me(11)]: "L",
  [me(12)]: "M",
  [me(13)]: "N",
  [me(14)]: "O",
  [me(15)]: "P",
  [me(16)]: "Q",
  [me(17)]: "R",
  [me(18)]: "S",
  [me(19)]: "T",
  [me(20)]: "U",
  [me(21)]: "V",
  [me(22)]: "W",
  [me(23)]: "X",
  [me(24)]: "Y",
  [me(25)]: "Z"
};
function d0({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: r,
  localizedStrings: n = {}
}) {
  const o = {
    ...Zn,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([a, i]) => [
          a,
          a === i && a in Zn ? Zn[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ $(
    Mr,
    {
      value: `${t}`,
      onValueChange: (a) => r(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ p(Qt, { className: "pr-twp pr-w-auto", children: /* @__PURE__ */ p(
          Ar,
          {
            placeholder: o[me(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ p(
          er,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ p(Ke, { value: `${a}`, children: o[me(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const gs = U.forwardRef(({ className: e, orientation: t = "horizontal", decorative: r = !0, ...n }, o) => /* @__PURE__ */ p(
  Vi.Root,
  {
    ref: o,
    decorative: r,
    orientation: t,
    className: M(
      "pr-twp pr-shrink-0 pr-bg-border",
      t === "horizontal" ? "pr-h-[1px] pr-w-full" : "pr-h-full pr-w-[1px]",
      e
    ),
    ...n
  }
));
gs.displayName = Vi.Root.displayName;
function u0({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "pr-twp pr-grid", children: e });
}
function f0({
  primary: e,
  secondary: t,
  children: r,
  isLoading: n = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ p("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ p("p", { className: "pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ p("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : /* @__PURE__ */ p("div", { children: r })
  ] });
}
function m0({
  primary: e,
  secondary: t,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ $("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ p("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ p("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ p(gs, {}) : ""
  ] });
}
var Kt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Kt || {});
function h0({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = Kt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const m = /* @__PURE__ */ p(
    Fc,
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
  if (r) {
    const b = n === Kt.Before || n === Kt.Above, d = /* @__PURE__ */ p("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), h = n === Kt.Before || n === Kt.After, f = h ? d : /* @__PURE__ */ p("div", { children: d }), g = h ? m : /* @__PURE__ */ p("div", { children: m });
    v = /* @__PURE__ */ $(
      Vc,
      {
        className: `papi-checkbox ${n.toString()}`,
        disabled: i,
        error: l,
        children: [
          b && f,
          g,
          !b && f
        ]
      }
    );
  } else
    v = m;
  return v;
}
const bs = E.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  vo.Root,
  {
    ref: r,
    className: M(
      "pr-peer pr-twp pr-h-4 pr-w-4 pr-shrink-0 pr-rounded-sm pr-border pr-border-primary pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=checked]:pr-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ p(
      vo.Indicator,
      {
        className: M("pr-flex pr-items-center pr-justify-center pr-text-current"),
        children: /* @__PURE__ */ p(En, { className: "pr-h-4 pr-w-4" })
      }
    )
  }
));
bs.displayName = vo.Root.displayName;
function g0({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ $("fieldset", { id: e, className: `pr-twp ${t}`, children: [
    r && /* @__PURE__ */ p("legend", { children: /* @__PURE__ */ p(Ze, { children: r }) }),
    n.map((l) => /* @__PURE__ */ $("div", { className: "pr-m-2 pr-flex pr-items-center", children: [
      /* @__PURE__ */ p(
        bs,
        {
          className: "pr-mr-2 pr-align-middle",
          checked: o.includes(l),
          onCheckedChange: (c) => a(l, c)
        },
        l
      ),
      /* @__PURE__ */ p(Ze, { children: i ? i(l) : l })
    ] }))
  ] });
}
function ud(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function fd(e) {
  if (e.__esModule)
    return e;
  var t = e.default;
  if (typeof t == "function") {
    var r = function n() {
      return this instanceof n ? Reflect.construct(t, arguments, this.constructor) : t.apply(this, arguments);
    };
    r.prototype = t.prototype;
  } else
    r = {};
  return Object.defineProperty(r, "__esModule", { value: !0 }), Object.keys(e).forEach(function(n) {
    var o = Object.getOwnPropertyDescriptor(e, n);
    Object.defineProperty(r, n, o.get ? o : {
      enumerable: !0,
      get: function() {
        return e[n];
      }
    });
  }), r;
}
var Fo = {}, vs = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(vs);
var md = vs.exports, Qn = {};
function cr(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || t(...n);
  };
}
function P() {
  return P = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, P.apply(this, arguments);
}
function It(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function ys(e) {
  if (!It(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = ys(e[r]);
  }), t;
}
function ct(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? P({}, e) : e;
  return It(e) && It(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (It(t[o]) && o in e && It(e[o]) ? n[o] = ct(e[o], t[o], r) : r.clone ? n[o] = It(t[o]) ? ys(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var xo = { exports: {} }, rn = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var _a;
function hd() {
  if (_a)
    return ce;
  _a = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function x(y) {
    if (typeof y == "object" && y !== null) {
      var T = y.$$typeof;
      switch (T) {
        case t:
          switch (y = y.type, y) {
            case c:
            case u:
            case n:
            case a:
            case o:
            case v:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case l:
                case m:
                case h:
                case d:
                case i:
                  return y;
                default:
                  return T;
              }
          }
        case r:
          return T;
      }
    }
  }
  function k(y) {
    return x(y) === u;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = u, ce.ContextConsumer = l, ce.ContextProvider = i, ce.Element = t, ce.ForwardRef = m, ce.Fragment = n, ce.Lazy = h, ce.Memo = d, ce.Portal = r, ce.Profiler = a, ce.StrictMode = o, ce.Suspense = v, ce.isAsyncMode = function(y) {
    return k(y) || x(y) === c;
  }, ce.isConcurrentMode = k, ce.isContextConsumer = function(y) {
    return x(y) === l;
  }, ce.isContextProvider = function(y) {
    return x(y) === i;
  }, ce.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, ce.isForwardRef = function(y) {
    return x(y) === m;
  }, ce.isFragment = function(y) {
    return x(y) === n;
  }, ce.isLazy = function(y) {
    return x(y) === h;
  }, ce.isMemo = function(y) {
    return x(y) === d;
  }, ce.isPortal = function(y) {
    return x(y) === r;
  }, ce.isProfiler = function(y) {
    return x(y) === a;
  }, ce.isStrictMode = function(y) {
    return x(y) === o;
  }, ce.isSuspense = function(y) {
    return x(y) === v;
  }, ce.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === u || y === a || y === o || y === v || y === b || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === d || y.$$typeof === i || y.$$typeof === l || y.$$typeof === m || y.$$typeof === g || y.$$typeof === w || y.$$typeof === O || y.$$typeof === f);
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
var Ia;
function gd() {
  return Ia || (Ia = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function x(V) {
      return typeof V == "string" || typeof V == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      V === n || V === u || V === a || V === o || V === v || V === b || typeof V == "object" && V !== null && (V.$$typeof === h || V.$$typeof === d || V.$$typeof === i || V.$$typeof === l || V.$$typeof === m || V.$$typeof === g || V.$$typeof === w || V.$$typeof === O || V.$$typeof === f);
    }
    function k(V) {
      if (typeof V == "object" && V !== null) {
        var re = V.$$typeof;
        switch (re) {
          case t:
            var D = V.type;
            switch (D) {
              case c:
              case u:
              case n:
              case a:
              case o:
              case v:
                return D;
              default:
                var se = D && D.$$typeof;
                switch (se) {
                  case l:
                  case m:
                  case h:
                  case d:
                  case i:
                    return se;
                  default:
                    return re;
                }
            }
          case r:
            return re;
        }
      }
    }
    var y = c, T = u, S = l, I = i, R = t, _ = m, N = n, A = h, B = d, z = r, G = a, j = o, W = v, te = !1;
    function F(V) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(V) || k(V) === c;
    }
    function C(V) {
      return k(V) === u;
    }
    function L(V) {
      return k(V) === l;
    }
    function X(V) {
      return k(V) === i;
    }
    function Y(V) {
      return typeof V == "object" && V !== null && V.$$typeof === t;
    }
    function H(V) {
      return k(V) === m;
    }
    function K(V) {
      return k(V) === n;
    }
    function q(V) {
      return k(V) === h;
    }
    function Z(V) {
      return k(V) === d;
    }
    function J(V) {
      return k(V) === r;
    }
    function Q(V) {
      return k(V) === a;
    }
    function ee(V) {
      return k(V) === o;
    }
    function ie(V) {
      return k(V) === v;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = T, pe.ContextConsumer = S, pe.ContextProvider = I, pe.Element = R, pe.ForwardRef = _, pe.Fragment = N, pe.Lazy = A, pe.Memo = B, pe.Portal = z, pe.Profiler = G, pe.StrictMode = j, pe.Suspense = W, pe.isAsyncMode = F, pe.isConcurrentMode = C, pe.isContextConsumer = L, pe.isContextProvider = X, pe.isElement = Y, pe.isForwardRef = H, pe.isFragment = K, pe.isLazy = q, pe.isMemo = Z, pe.isPortal = J, pe.isProfiler = Q, pe.isStrictMode = ee, pe.isSuspense = ie, pe.isValidElementType = x, pe.typeOf = k;
  }()), pe;
}
var Ma;
function ws() {
  return Ma || (Ma = 1, process.env.NODE_ENV === "production" ? rn.exports = hd() : rn.exports = gd()), rn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var eo, Aa;
function bd() {
  if (Aa)
    return eo;
  Aa = 1;
  var e = Object.getOwnPropertySymbols, t = Object.prototype.hasOwnProperty, r = Object.prototype.propertyIsEnumerable;
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
      for (var i = {}, l = 0; l < 10; l++)
        i["_" + String.fromCharCode(l)] = l;
      var c = Object.getOwnPropertyNames(i).map(function(m) {
        return i[m];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        u[m] = m;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return eo = o() ? Object.assign : function(a, i) {
    for (var l, c = n(a), u, m = 1; m < arguments.length; m++) {
      l = Object(arguments[m]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        u = e(l);
        for (var b = 0; b < u.length; b++)
          r.call(l, u[b]) && (c[u[b]] = l[u[b]]);
      }
    }
    return c;
  }, eo;
}
var to, Da;
function zo() {
  if (Da)
    return to;
  Da = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return to = e, to;
}
var ro, Ba;
function xs() {
  return Ba || (Ba = 1, ro = Function.call.bind(Object.prototype.hasOwnProperty)), ro;
}
var no, ja;
function vd() {
  if (ja)
    return no;
  ja = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = zo(), r = {}, n = xs();
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
      for (var m in a)
        if (n(a, m)) {
          var v;
          try {
            if (typeof a[m] != "function") {
              var b = Error(
                (c || "React class") + ": " + l + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw b.name = "Invariant Violation", b;
            }
            v = a[m](i, m, c, l, null, t);
          } catch (h) {
            v = h;
          }
          if (v && !(v instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof v + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), v instanceof Error && !(v.message in r)) {
            r[v.message] = !0;
            var d = u ? u() : "";
            e(
              "Failed " + l + " type: " + v.message + (d ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, no = o, no;
}
var oo, La;
function yd() {
  if (La)
    return oo;
  La = 1;
  var e = ws(), t = bd(), r = zo(), n = xs(), o = vd(), a = function() {
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
  return oo = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function v(C) {
      var L = C && (u && C[u] || C[m]);
      if (typeof L == "function")
        return L;
    }
    var b = "<<anonymous>>", d = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: O(),
      arrayOf: x,
      element: k(),
      elementType: y(),
      instanceOf: T,
      node: _(),
      objectOf: I,
      oneOf: S,
      oneOfType: R,
      shape: A,
      exact: B
    };
    function h(C, L) {
      return C === L ? C !== 0 || 1 / C === 1 / L : C !== C && L !== L;
    }
    function f(C, L) {
      this.message = C, this.data = L && typeof L == "object" ? L : {}, this.stack = "";
    }
    f.prototype = Error.prototype;
    function g(C) {
      if (process.env.NODE_ENV !== "production")
        var L = {}, X = 0;
      function Y(K, q, Z, J, Q, ee, ie) {
        if (J = J || b, ee = ee || Z, ie !== r) {
          if (c) {
            var V = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw V.name = "Invariant Violation", V;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = J + ":" + Z;
            !L[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            X < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), L[re] = !0, X++);
          }
        }
        return q[Z] == null ? K ? q[Z] === null ? new f("The " + Q + " `" + ee + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new f("The " + Q + " `" + ee + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : C(q, Z, J, Q, ee);
      }
      var H = Y.bind(null, !1);
      return H.isRequired = Y.bind(null, !0), H;
    }
    function w(C) {
      function L(X, Y, H, K, q, Z) {
        var J = X[Y], Q = j(J);
        if (Q !== C) {
          var ee = W(J);
          return new f(
            "Invalid " + K + " `" + q + "` of type " + ("`" + ee + "` supplied to `" + H + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return g(L);
    }
    function O() {
      return g(i);
    }
    function x(C) {
      function L(X, Y, H, K, q) {
        if (typeof C != "function")
          return new f("Property `" + q + "` of component `" + H + "` has invalid PropType notation inside arrayOf.");
        var Z = X[Y];
        if (!Array.isArray(Z)) {
          var J = j(Z);
          return new f("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected an array."));
        }
        for (var Q = 0; Q < Z.length; Q++) {
          var ee = C(Z, Q, H, K, q + "[" + Q + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return g(L);
    }
    function k() {
      function C(L, X, Y, H, K) {
        var q = L[X];
        if (!l(q)) {
          var Z = j(q);
          return new f("Invalid " + H + " `" + K + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(C);
    }
    function y() {
      function C(L, X, Y, H, K) {
        var q = L[X];
        if (!e.isValidElementType(q)) {
          var Z = j(q);
          return new f("Invalid " + H + " `" + K + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(C);
    }
    function T(C) {
      function L(X, Y, H, K, q) {
        if (!(X[Y] instanceof C)) {
          var Z = C.name || b, J = F(X[Y]);
          return new f("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return g(L);
    }
    function S(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function L(X, Y, H, K, q) {
        for (var Z = X[Y], J = 0; J < C.length; J++)
          if (h(Z, C[J]))
            return null;
        var Q = JSON.stringify(C, function(ie, V) {
          var re = W(V);
          return re === "symbol" ? String(V) : V;
        });
        return new f("Invalid " + K + " `" + q + "` of value `" + String(Z) + "` " + ("supplied to `" + H + "`, expected one of " + Q + "."));
      }
      return g(L);
    }
    function I(C) {
      function L(X, Y, H, K, q) {
        if (typeof C != "function")
          return new f("Property `" + q + "` of component `" + H + "` has invalid PropType notation inside objectOf.");
        var Z = X[Y], J = j(Z);
        if (J !== "object")
          return new f("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected an object."));
        for (var Q in Z)
          if (n(Z, Q)) {
            var ee = C(Z, Q, H, K, q + "." + Q, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return g(L);
    }
    function R(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var L = 0; L < C.length; L++) {
        var X = C[L];
        if (typeof X != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(X) + " at index " + L + "."
          ), i;
      }
      function Y(H, K, q, Z, J) {
        for (var Q = [], ee = 0; ee < C.length; ee++) {
          var ie = C[ee], V = ie(H, K, q, Z, J, r);
          if (V == null)
            return null;
          V.data && n(V.data, "expectedType") && Q.push(V.data.expectedType);
        }
        var re = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new f("Invalid " + Z + " `" + J + "` supplied to " + ("`" + q + "`" + re + "."));
      }
      return g(Y);
    }
    function _() {
      function C(L, X, Y, H, K) {
        return z(L[X]) ? null : new f("Invalid " + H + " `" + K + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return g(C);
    }
    function N(C, L, X, Y, H) {
      return new f(
        (C || "React class") + ": " + L + " type `" + X + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + H + "`."
      );
    }
    function A(C) {
      function L(X, Y, H, K, q) {
        var Z = X[Y], J = j(Z);
        if (J !== "object")
          return new f("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + H + "`, expected `object`."));
        for (var Q in C) {
          var ee = C[Q];
          if (typeof ee != "function")
            return N(H, K, q, Q, W(ee));
          var ie = ee(Z, Q, H, K, q + "." + Q, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return g(L);
    }
    function B(C) {
      function L(X, Y, H, K, q) {
        var Z = X[Y], J = j(Z);
        if (J !== "object")
          return new f("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + H + "`, expected `object`."));
        var Q = t({}, X[Y], C);
        for (var ee in Q) {
          var ie = C[ee];
          if (n(C, ee) && typeof ie != "function")
            return N(H, K, q, ee, W(ie));
          if (!ie)
            return new f(
              "Invalid " + K + " `" + q + "` key `" + ee + "` supplied to `" + H + "`.\nBad object: " + JSON.stringify(X[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var V = ie(Z, ee, H, K, q + "." + ee, r);
          if (V)
            return V;
        }
        return null;
      }
      return g(L);
    }
    function z(C) {
      switch (typeof C) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !C;
        case "object":
          if (Array.isArray(C))
            return C.every(z);
          if (C === null || l(C))
            return !0;
          var L = v(C);
          if (L) {
            var X = L.call(C), Y;
            if (L !== C.entries) {
              for (; !(Y = X.next()).done; )
                if (!z(Y.value))
                  return !1;
            } else
              for (; !(Y = X.next()).done; ) {
                var H = Y.value;
                if (H && !z(H[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function G(C, L) {
      return C === "symbol" ? !0 : L ? L["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && L instanceof Symbol : !1;
    }
    function j(C) {
      var L = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : G(L, C) ? "symbol" : L;
    }
    function W(C) {
      if (typeof C > "u" || C === null)
        return "" + C;
      var L = j(C);
      if (L === "object") {
        if (C instanceof Date)
          return "date";
        if (C instanceof RegExp)
          return "regexp";
      }
      return L;
    }
    function te(C) {
      var L = W(C);
      switch (L) {
        case "array":
        case "object":
          return "an " + L;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + L;
        default:
          return L;
      }
    }
    function F(C) {
      return !C.constructor || !C.constructor.name ? b : C.constructor.name;
    }
    return d.checkPropTypes = o, d.resetWarningCache = o.resetWarningCache, d.PropTypes = d, d;
  }, oo;
}
var ao, Va;
function wd() {
  if (Va)
    return ao;
  Va = 1;
  var e = zo();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, ao = function() {
    function n(i, l, c, u, m, v) {
      if (v !== e) {
        var b = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw b.name = "Invariant Violation", b;
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
      checkPropTypes: r,
      resetWarningCache: t
    };
    return a.PropTypes = a, a;
  }, ao;
}
if (process.env.NODE_ENV !== "production") {
  var xd = ws(), kd = !0;
  xo.exports = yd()(xd.isElement, kd);
} else
  xo.exports = wd()();
var Ed = xo.exports;
const s = /* @__PURE__ */ ud(Ed);
function Nd(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ks(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Nd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Es = cr(s.element, ks);
Es.isRequired = cr(s.element.isRequired, ks);
const Hr = Es;
function Td(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Sd(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !Td(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Cd = cr(s.elementType, Sd), Od = "exact-prop: ​";
function Ns(e) {
  return process.env.NODE_ENV === "production" ? e : P({}, e, {
    [Od]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function rr(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var ko = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fa;
function Rd() {
  if (Fa)
    return de;
  Fa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function f(g) {
    if (typeof g == "object" && g !== null) {
      var w = g.$$typeof;
      switch (w) {
        case e:
          switch (g = g.type, g) {
            case r:
            case o:
            case n:
            case u:
            case m:
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
                  return w;
              }
          }
        case t:
          return w;
      }
    }
  }
  return de.ContextConsumer = i, de.ContextProvider = a, de.Element = e, de.ForwardRef = c, de.Fragment = r, de.Lazy = b, de.Memo = v, de.Portal = t, de.Profiler = o, de.StrictMode = n, de.Suspense = u, de.SuspenseList = m, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(g) {
    return f(g) === i;
  }, de.isContextProvider = function(g) {
    return f(g) === a;
  }, de.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === e;
  }, de.isForwardRef = function(g) {
    return f(g) === c;
  }, de.isFragment = function(g) {
    return f(g) === r;
  }, de.isLazy = function(g) {
    return f(g) === b;
  }, de.isMemo = function(g) {
    return f(g) === v;
  }, de.isPortal = function(g) {
    return f(g) === t;
  }, de.isProfiler = function(g) {
    return f(g) === o;
  }, de.isStrictMode = function(g) {
    return f(g) === n;
  }, de.isSuspense = function(g) {
    return f(g) === u;
  }, de.isSuspenseList = function(g) {
    return f(g) === m;
  }, de.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === o || g === n || g === u || g === m || g === d || typeof g == "object" && g !== null && (g.$$typeof === b || g.$$typeof === v || g.$$typeof === a || g.$$typeof === i || g.$$typeof === c || g.$$typeof === h || g.getModuleId !== void 0);
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
var za;
function Pd() {
  return za || (za = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), h = !1, f = !1, g = !1, w = !1, O = !1, x;
    x = Symbol.for("react.module.reference");
    function k(D) {
      return !!(typeof D == "string" || typeof D == "function" || D === r || D === o || O || D === n || D === u || D === m || w || D === d || h || f || g || typeof D == "object" && D !== null && (D.$$typeof === b || D.$$typeof === v || D.$$typeof === a || D.$$typeof === i || D.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      D.$$typeof === x || D.getModuleId !== void 0));
    }
    function y(D) {
      if (typeof D == "object" && D !== null) {
        var se = D.$$typeof;
        switch (se) {
          case e:
            var Te = D.type;
            switch (Te) {
              case r:
              case o:
              case n:
              case u:
              case m:
                return Te;
              default:
                var $e = Te && Te.$$typeof;
                switch ($e) {
                  case l:
                  case i:
                  case c:
                  case b:
                  case v:
                  case a:
                    return $e;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var T = i, S = a, I = e, R = c, _ = r, N = b, A = v, B = t, z = o, G = n, j = u, W = m, te = !1, F = !1;
    function C(D) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function L(D) {
      return F || (F = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function X(D) {
      return y(D) === i;
    }
    function Y(D) {
      return y(D) === a;
    }
    function H(D) {
      return typeof D == "object" && D !== null && D.$$typeof === e;
    }
    function K(D) {
      return y(D) === c;
    }
    function q(D) {
      return y(D) === r;
    }
    function Z(D) {
      return y(D) === b;
    }
    function J(D) {
      return y(D) === v;
    }
    function Q(D) {
      return y(D) === t;
    }
    function ee(D) {
      return y(D) === o;
    }
    function ie(D) {
      return y(D) === n;
    }
    function V(D) {
      return y(D) === u;
    }
    function re(D) {
      return y(D) === m;
    }
    ue.ContextConsumer = T, ue.ContextProvider = S, ue.Element = I, ue.ForwardRef = R, ue.Fragment = _, ue.Lazy = N, ue.Memo = A, ue.Portal = B, ue.Profiler = z, ue.StrictMode = G, ue.Suspense = j, ue.SuspenseList = W, ue.isAsyncMode = C, ue.isConcurrentMode = L, ue.isContextConsumer = X, ue.isContextProvider = Y, ue.isElement = H, ue.isForwardRef = K, ue.isFragment = q, ue.isLazy = Z, ue.isMemo = J, ue.isPortal = Q, ue.isProfiler = ee, ue.isStrictMode = ie, ue.isSuspense = V, ue.isSuspenseList = re, ue.isValidElementType = k, ue.typeOf = y;
  }()), ue;
}
process.env.NODE_ENV === "production" ? ko.exports = Rd() : ko.exports = Pd();
var mn = ko.exports;
const $d = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function _d(e) {
  const t = `${e}`.match($d);
  return t && t[1] || "";
}
function Ts(e, t = "") {
  return e.displayName || e.name || _d(e) || t;
}
function Ua(e, t, r) {
  const n = Ts(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function Id(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Ts(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case mn.ForwardRef:
          return Ua(e, e.render, "ForwardRef");
        case mn.Memo:
          return Ua(e, e.type, "memo");
        default:
          return;
      }
  }
}
function dt(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const Md = s.oneOfType([s.func, s.object]), Uo = Md;
function rt(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : rr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function Eo(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function Ss(e, t = 166) {
  let r;
  function n(...o) {
    const a = () => {
      e.apply(this, o);
    };
    clearTimeout(r), r = setTimeout(a, t);
  }
  return n.clear = () => {
    clearTimeout(r);
  }, n;
}
function Ad(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Dd(e, t) {
  var r, n;
  return /* @__PURE__ */ E.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (r = e.type.muiName) != null ? r : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function Re(e) {
  return e && e.ownerDocument || document;
}
function nr(e) {
  return Re(e).defaultView || window;
}
function Bd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? P({}, t.propTypes) : null;
  return (o) => (a, i, l, c, u, ...m) => {
    const v = u || i, b = r == null ? void 0 : r[v];
    if (b) {
      const d = b(a, i, l, c, u, ...m);
      if (d)
        return d;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function hn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const jd = typeof window < "u" ? E.useLayoutEffect : E.useEffect, jt = jd;
let Ha = 0;
function Ld(e) {
  const [t, r] = E.useState(e), n = e || t;
  return E.useEffect(() => {
    t == null && (Ha += 1, r(`mui-${Ha}`));
  }, [t]), n;
}
const Ga = E["useId".toString()];
function Cs(e) {
  if (Ga !== void 0) {
    const t = Ga();
    return e ?? t;
  }
  return Ld(e);
}
function Vd(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function Os({
  controlled: e,
  default: t,
  name: r,
  state: n = "value"
}) {
  const {
    current: o
  } = E.useRef(e !== void 0), [a, i] = E.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    E.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${r} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, r, e]);
    const {
      current: u
    } = E.useRef(t);
    E.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = E.useCallback((u) => {
    o || i(u);
  }, []);
  return [l, c];
}
function Br(e) {
  const t = E.useRef(e);
  return jt(() => {
    t.current = e;
  }), E.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function We(...e) {
  return E.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      hn(r, t);
    });
  }, e);
}
const Wa = {};
function Fd(e, t) {
  const r = E.useRef(Wa);
  return r.current === Wa && (r.current = e(t)), r;
}
const zd = [];
function Ud(e) {
  E.useEffect(e, zd);
}
class Gr {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Gr();
  }
  /**
   * Executes `fn` after `delay`, clearing any previously scheduled call.
   */
  start(t, r) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, r();
    }, t);
  }
}
function Er() {
  const e = Fd(Gr.create).current;
  return Ud(e.disposeEffect), e;
}
let _n = !0, No = !1;
const Hd = new Gr(), Gd = {
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
function Wd(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && Gd[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Xd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (_n = !0);
}
function io() {
  _n = !1;
}
function Yd() {
  this.visibilityState === "hidden" && No && (_n = !0);
}
function qd(e) {
  e.addEventListener("keydown", Xd, !0), e.addEventListener("mousedown", io, !0), e.addEventListener("pointerdown", io, !0), e.addEventListener("touchstart", io, !0), e.addEventListener("visibilitychange", Yd, !0);
}
function Kd(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return _n || Wd(t);
}
function Rs() {
  const e = E.useCallback((o) => {
    o != null && qd(o.ownerDocument);
  }, []), t = E.useRef(!1);
  function r() {
    return t.current ? (No = !0, Hd.start(100, () => {
      No = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return Kd(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function Ps(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Jd(e) {
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
function Zd(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Qd = Number.isInteger || Zd;
function $s(e, t, r, n) {
  const o = e[t];
  if (o == null || !Qd(o)) {
    const a = Jd(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function _s(e, t, ...r) {
  return e[t] === void 0 ? null : $s(e, t, ...r);
}
function To() {
  return null;
}
_s.isRequired = $s;
To.isRequired = To;
const Is = process.env.NODE_ENV === "production" ? To : _s;
function Ms(e, t) {
  const r = P({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = P({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = P({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = Ms(o[i], a[i]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function mt(e, t, r = void 0) {
  const n = {};
  return Object.keys(e).forEach(
    // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
    // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
    (o) => {
      n[o] = e[o].reduce((a, i) => {
        if (i) {
          const l = t(i);
          l !== "" && a.push(l), r && r[i] && a.push(r[i]);
        }
        return a;
      }, []).join(" ");
    }
  ), n;
}
const Xa = (e) => e, eu = () => {
  let e = Xa;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Xa;
    }
  };
}, tu = eu(), As = tu, Ds = {
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
function ot(e, t, r = "Mui") {
  const n = Ds[t];
  return n ? `${r}-${n}` : `${As.generate(e)}-${t}`;
}
function Nt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = ot(e, o, r);
  }), n;
}
function ru(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
function ge(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const nu = ["values", "unit", "step"], ou = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => P({}, r, {
    [n.key]: n.val
  }), {});
};
function au(e) {
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
    unit: r = "px",
    step: n = 5
  } = e, o = ge(e, nu), a = ou(t), i = Object.keys(a);
  function l(b) {
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${r})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == "number" ? t[b] : b) - n / 100}${r})`;
  }
  function u(b, d) {
    const h = i.indexOf(d);
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${r}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : d) - n / 100}${r})`;
  }
  function m(b) {
    return i.indexOf(b) + 1 < i.length ? u(b, i[i.indexOf(b) + 1]) : l(b);
  }
  function v(b) {
    const d = i.indexOf(b);
    return d === 0 ? l(i[1]) : d === i.length - 1 ? c(i[d]) : u(b, i[i.indexOf(b) + 1]).replace("@media", "@media not all and");
  }
  return P({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: u,
    only: m,
    not: v,
    unit: r
  }, o);
}
const iu = {
  borderRadius: 4
}, su = iu, lu = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, Tt = lu;
function Or(e, t) {
  return t ? ct(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Ho = {
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
}, Ya = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Ho[e]}px)`
};
function ut(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || Ya;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || Ya;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Ho).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = r(t[l], l);
      } else {
        const c = l;
        i[c] = t[c];
      }
      return i;
    }, {});
  }
  return r(t);
}
function cu(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function pu(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function In(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function gn(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = In(e, r) || n, t && (o = t(o, n, e)), o;
}
function Ee(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: n,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const l = i[t], c = i.theme, u = In(c, n) || {};
    return ut(i, l, (v) => {
      let b = gn(u, o, v);
      return v === b && typeof v == "string" && (b = gn(u, o, `${t}${v === "default" ? "" : rt(v)}`, v)), r === !1 ? b : {
        [r]: b
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: Tt
  } : {}, a.filterProps = [t], a;
}
function du(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const uu = {
  m: "margin",
  p: "padding"
}, fu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, qa = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, mu = du((e) => {
  if (e.length > 2)
    if (qa[e])
      e = qa[e];
    else
      return [e];
  const [t, r] = e.split(""), n = uu[t], o = fu[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), Mn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], An = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], hu = [...Mn, ...An];
function Wr(e, t, r, n) {
  var o;
  const a = (o = In(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Bs(e) {
  return Wr(e, "spacing", 8, "spacing");
}
function Xr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function gu(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Xr(t, r), n), {});
}
function bu(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = mu(r), a = gu(o, n), i = e[r];
  return ut(e, i, a);
}
function js(e, t) {
  const r = Bs(e.theme);
  return Object.keys(e).map((n) => bu(e, t, n, r)).reduce(Or, {});
}
function ye(e) {
  return js(e, Mn);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Mn.reduce((e, t) => (e[t] = Tt, e), {}) : {};
ye.filterProps = Mn;
function we(e) {
  return js(e, An);
}
we.propTypes = process.env.NODE_ENV !== "production" ? An.reduce((e, t) => (e[t] = Tt, e), {}) : {};
we.filterProps = An;
process.env.NODE_ENV !== "production" && hu.reduce((e, t) => (e[t] = Tt, e), {});
function vu(e = 8) {
  if (e.mui)
    return e;
  const t = Bs({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function Dn(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? Or(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function He(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function qe(e, t) {
  return Ee({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const yu = qe("border", He), wu = qe("borderTop", He), xu = qe("borderRight", He), ku = qe("borderBottom", He), Eu = qe("borderLeft", He), Nu = qe("borderColor"), Tu = qe("borderTopColor"), Su = qe("borderRightColor"), Cu = qe("borderBottomColor"), Ou = qe("borderLeftColor"), Ru = qe("outline", He), Pu = qe("outlineColor"), Bn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Wr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Xr(t, n)
    });
    return ut(e, e.borderRadius, r);
  }
  return null;
};
Bn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Tt
} : {};
Bn.filterProps = ["borderRadius"];
Dn(yu, wu, xu, ku, Eu, Nu, Tu, Su, Cu, Ou, Bn, Ru, Pu);
const jn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Wr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Xr(t, n)
    });
    return ut(e, e.gap, r);
  }
  return null;
};
jn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Tt
} : {};
jn.filterProps = ["gap"];
const Ln = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Wr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Xr(t, n)
    });
    return ut(e, e.columnGap, r);
  }
  return null;
};
Ln.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Tt
} : {};
Ln.filterProps = ["columnGap"];
const Vn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Wr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Xr(t, n)
    });
    return ut(e, e.rowGap, r);
  }
  return null;
};
Vn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Tt
} : {};
Vn.filterProps = ["rowGap"];
const $u = Ee({
  prop: "gridColumn"
}), _u = Ee({
  prop: "gridRow"
}), Iu = Ee({
  prop: "gridAutoFlow"
}), Mu = Ee({
  prop: "gridAutoColumns"
}), Au = Ee({
  prop: "gridAutoRows"
}), Du = Ee({
  prop: "gridTemplateColumns"
}), Bu = Ee({
  prop: "gridTemplateRows"
}), ju = Ee({
  prop: "gridTemplateAreas"
}), Lu = Ee({
  prop: "gridArea"
});
Dn(jn, Ln, Vn, $u, _u, Iu, Mu, Au, Du, Bu, ju, Lu);
function Zt(e, t) {
  return t === "grey" ? t : e;
}
const Vu = Ee({
  prop: "color",
  themeKey: "palette",
  transform: Zt
}), Fu = Ee({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Zt
}), zu = Ee({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Zt
});
Dn(Vu, Fu, zu);
function Fe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Uu = Ee({
  prop: "width",
  transform: Fe
}), Go = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Ho[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Fe(r)
      };
    };
    return ut(e, e.maxWidth, t);
  }
  return null;
};
Go.filterProps = ["maxWidth"];
const Hu = Ee({
  prop: "minWidth",
  transform: Fe
}), Gu = Ee({
  prop: "height",
  transform: Fe
}), Wu = Ee({
  prop: "maxHeight",
  transform: Fe
}), Xu = Ee({
  prop: "minHeight",
  transform: Fe
});
Ee({
  prop: "size",
  cssProperty: "width",
  transform: Fe
});
Ee({
  prop: "size",
  cssProperty: "height",
  transform: Fe
});
const Yu = Ee({
  prop: "boxSizing"
});
Dn(Uu, Go, Hu, Gu, Wu, Xu, Yu);
const qu = {
  // borders
  border: {
    themeKey: "borders",
    transform: He
  },
  borderTop: {
    themeKey: "borders",
    transform: He
  },
  borderRight: {
    themeKey: "borders",
    transform: He
  },
  borderBottom: {
    themeKey: "borders",
    transform: He
  },
  borderLeft: {
    themeKey: "borders",
    transform: He
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
    transform: He
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Bn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Zt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Zt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Zt
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
    style: jn
  },
  rowGap: {
    style: Vn
  },
  columnGap: {
    style: Ln
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
    transform: Fe
  },
  maxWidth: {
    style: Go
  },
  minWidth: {
    transform: Fe
  },
  height: {
    transform: Fe
  },
  maxHeight: {
    transform: Fe
  },
  minHeight: {
    transform: Fe
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
}, Wo = qu;
function Ku(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function Ju(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Zu() {
  function e(r, n, o, a) {
    const i = {
      [r]: n,
      theme: o
    }, l = a[r];
    if (!l)
      return {
        [r]: n
      };
    const {
      cssProperty: c = r,
      themeKey: u,
      transform: m,
      style: v
    } = l;
    if (n == null)
      return null;
    if (u === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const b = In(o, u) || {};
    return v ? v(i) : ut(i, n, (h) => {
      let f = gn(b, m, h);
      return h === f && typeof h == "string" && (f = gn(b, m, `${r}${h === "default" ? "" : rt(h)}`, h)), c === !1 ? f : {
        [c]: f
      };
    });
  }
  function t(r) {
    var n;
    const {
      sx: o,
      theme: a = {}
    } = r || {};
    if (!o)
      return null;
    const i = (n = a.unstable_sxConfig) != null ? n : Wo;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(a);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const m = cu(a.breakpoints), v = Object.keys(m);
      let b = m;
      return Object.keys(u).forEach((d) => {
        const h = Ju(u[d], a);
        if (h != null)
          if (typeof h == "object")
            if (i[d])
              b = Or(b, e(d, h, a, i));
            else {
              const f = ut({
                theme: a
              }, h, (g) => ({
                [d]: g
              }));
              Ku(f, h) ? b[d] = t({
                sx: h,
                theme: a
              }) : b = Or(b, f);
            }
          else
            b = Or(b, e(d, h, a, i));
      }), pu(v, b);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ls = Zu();
Ls.filterProps = ["sx"];
const Xo = Ls;
function Qu(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const ef = ["breakpoints", "palette", "spacing", "shape"];
function Yo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = ge(e, ef), l = au(r), c = vu(o);
  let u = ct({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, n),
    spacing: c,
    shape: P({}, su, a)
  }, i);
  return u.applyStyles = Qu, u = t.reduce((m, v) => ct(m, v), u), u.unstable_sxConfig = P({}, Wo, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Xo({
      sx: v,
      theme: this
    });
  }, u;
}
function tf(e) {
  return Object.keys(e).length === 0;
}
function Vs(e = null) {
  const t = E.useContext(Qc);
  return !t || tf(t) ? e : t;
}
const rf = Yo();
function Fs(e = rf) {
  return Vs(e);
}
const nf = ["ownerState"], of = ["variants"], af = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function sf(e) {
  return Object.keys(e).length === 0;
}
function lf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function cn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const cf = Yo(), Ka = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function nn({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return sf(t) ? e : t[r] || t;
}
function pf(e) {
  return e ? (t, r) => r[e] : null;
}
function pn(e, t) {
  let {
    ownerState: r
  } = t, n = ge(t, nf);
  const o = typeof e == "function" ? e(P({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => pn(a, P({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = ge(o, of);
    return a.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(P({
        ownerState: r
      }, n, r)) : Object.keys(c.props).forEach((m) => {
        (r == null ? void 0 : r[m]) !== c.props[m] && n[m] !== c.props[m] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(P({
        ownerState: r
      }, n, r)) : c.style));
    }), l;
  }
  return o;
}
function df(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = cf,
    rootShouldForwardProp: n = cn,
    slotShouldForwardProp: o = cn
  } = e, a = (i) => Xo(P({}, i, {
    theme: nn(P({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    ep(i, (y) => y.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: m,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: b = pf(Ka(u))
    } = l, d = ge(l, af), h = m !== void 0 ? m : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), f = v || !1;
    let g;
    process.env.NODE_ENV !== "production" && c && (g = `${c}-${Ka(u || "Root")}`);
    let w = cn;
    u === "Root" || u === "root" ? w = n : u ? w = o : lf(i) && (w = void 0);
    const O = Zc(i, P({
      shouldForwardProp: w,
      label: g
    }, d)), x = (y) => typeof y == "function" && y.__emotion_real !== y || It(y) ? (T) => pn(y, P({}, T, {
      theme: nn({
        theme: T.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, k = (y, ...T) => {
      let S = x(y);
      const I = T ? T.map(x) : [];
      c && b && I.push((N) => {
        const A = nn(P({}, N, {
          defaultTheme: r,
          themeId: t
        }));
        if (!A.components || !A.components[c] || !A.components[c].styleOverrides)
          return null;
        const B = A.components[c].styleOverrides, z = {};
        return Object.entries(B).forEach(([G, j]) => {
          z[G] = pn(j, P({}, N, {
            theme: A
          }));
        }), b(N, z);
      }), c && !h && I.push((N) => {
        var A;
        const B = nn(P({}, N, {
          defaultTheme: r,
          themeId: t
        })), z = B == null || (A = B.components) == null || (A = A[c]) == null ? void 0 : A.variants;
        return pn({
          variants: z
        }, P({}, N, {
          theme: B
        }));
      }), f || I.push(a);
      const R = I.length - T.length;
      if (Array.isArray(y) && R > 0) {
        const N = new Array(R).fill("");
        S = [...y, ...N], S.raw = [...y.raw, ...N];
      }
      const _ = O(S, ...I);
      if (process.env.NODE_ENV !== "production") {
        let N;
        c && (N = `${c}${rt(u || "")}`), N === void 0 && (N = `Styled(${Id(i)})`), _.displayName = N;
      }
      return i.muiName && (_.muiName = i.muiName), _;
    };
    return O.withConfig && (k.withConfig = O.withConfig), k;
  };
}
function uf(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : Ms(t.components[r].defaultProps, n);
}
function ff({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = Fs(r);
  return n && (o = o[n] || o), uf({
    theme: o,
    name: t,
    props: e
  });
}
function qo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), ru(e, t, r);
}
function mf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Lt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Lt(mf(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : rr(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : rr(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function Fn(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function hf(e) {
  e = Lt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (u, m = (u + r / 30) % 12) => o - a * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Fn({
    type: l,
    values: c
  });
}
function Ja(e) {
  e = Lt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Lt(hf(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Za(e, t) {
  const r = Ja(e), n = Ja(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function bn(e, t) {
  return e = Lt(e), t = qo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Fn(e);
}
function gf(e, t) {
  if (e = Lt(e), t = qo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Fn(e);
}
function bf(e, t) {
  if (e = Lt(e), t = qo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Fn(e);
}
function vf(e, t) {
  return P({
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
const yf = {
  black: "#000",
  white: "#fff"
}, jr = yf, wf = {
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
}, xf = wf, kf = {
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
}, Ut = kf, Ef = {
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
}, Ht = Ef, Nf = {
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
}, br = Nf, Tf = {
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
}, Gt = Tf, Sf = {
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
}, Wt = Sf, Cf = {
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
}, Xt = Cf, Of = ["mode", "contrastThreshold", "tonalOffset"], Qa = {
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
    paper: jr.white,
    default: jr.white
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
}, so = {
  text: {
    primary: jr.white,
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
    active: jr.white,
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
function ei(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = bf(e.main, o) : t === "dark" && (e.dark = gf(e.main, a)));
}
function Rf(e = "light") {
  return e === "dark" ? {
    main: Gt[200],
    light: Gt[50],
    dark: Gt[400]
  } : {
    main: Gt[700],
    light: Gt[400],
    dark: Gt[800]
  };
}
function Pf(e = "light") {
  return e === "dark" ? {
    main: Ut[200],
    light: Ut[50],
    dark: Ut[400]
  } : {
    main: Ut[500],
    light: Ut[300],
    dark: Ut[700]
  };
}
function $f(e = "light") {
  return e === "dark" ? {
    main: Ht[500],
    light: Ht[300],
    dark: Ht[700]
  } : {
    main: Ht[700],
    light: Ht[400],
    dark: Ht[800]
  };
}
function _f(e = "light") {
  return e === "dark" ? {
    main: Wt[400],
    light: Wt[300],
    dark: Wt[700]
  } : {
    main: Wt[700],
    light: Wt[500],
    dark: Wt[900]
  };
}
function If(e = "light") {
  return e === "dark" ? {
    main: Xt[400],
    light: Xt[300],
    dark: Xt[700]
  } : {
    main: Xt[800],
    light: Xt[500],
    dark: Xt[900]
  };
}
function Mf(e = "light") {
  return e === "dark" ? {
    main: br[400],
    light: br[300],
    dark: br[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: br[500],
    dark: br[900]
  };
}
function Af(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = ge(e, Of), a = e.primary || Rf(t), i = e.secondary || Pf(t), l = e.error || $f(t), c = e.info || _f(t), u = e.success || If(t), m = e.warning || Mf(t);
  function v(f) {
    const g = Za(f, so.text.primary) >= r ? so.text.primary : Qa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = Za(f, g);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${g} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return g;
  }
  const b = ({
    color: f,
    name: g,
    mainShade: w = 500,
    lightShade: O = 300,
    darkShade: x = 700
  }) => {
    if (f = P({}, f), !f.main && f[w] && (f.main = f[w]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : rr(11, g ? ` (${g})` : "", w));
    if (typeof f.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${g ? ` (${g})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(f.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : rr(12, g ? ` (${g})` : "", JSON.stringify(f.main)));
    return ei(f, "light", O, n), ei(f, "dark", x, n), f.contrastText || (f.contrastText = v(f.main)), f;
  }, d = {
    dark: so,
    light: Qa
  };
  return process.env.NODE_ENV !== "production" && (d[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), ct(P({
    // A collection of common colors.
    common: P({}, jr),
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
      color: m,
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
    grey: xf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: v,
    // Generate a rich color object.
    augmentColor: b,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, d[t]), o);
}
const Df = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Bf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ti = {
  textTransform: "uppercase"
}, ri = '"Roboto", "Helvetica", "Arial", sans-serif';
function jf(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = ri,
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
    allVariants: m,
    pxToRem: v
  } = r, b = ge(r, Df);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const d = o / 14, h = v || ((w) => `${w / u * d}rem`), f = (w, O, x, k, y) => P({
    fontFamily: n,
    fontWeight: w,
    fontSize: h(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, n === ri ? {
    letterSpacing: `${Bf(k / O)}em`
  } : {}, y, m), g = {
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
    button: f(l, 14, 1.75, 0.4, ti),
    caption: f(i, 12, 1.66, 0.4),
    overline: f(i, 12, 2.66, 1, ti),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ct(P({
    htmlFontSize: u,
    pxToRem: h,
    fontFamily: n,
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
const Lf = 0.2, Vf = 0.14, Ff = 0.12;
function ve(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Lf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Vf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Ff})`].join(",");
}
const zf = ["none", ve(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ve(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ve(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ve(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ve(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ve(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ve(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ve(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ve(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ve(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ve(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ve(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ve(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ve(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ve(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ve(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ve(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ve(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ve(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ve(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ve(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ve(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ve(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ve(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Uf = zf, Hf = ["duration", "easing", "delay"], Gf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Wf = {
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
function ni(e) {
  return `${Math.round(e)}ms`;
}
function Xf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Yf(e) {
  const t = P({}, Gf, e.easing), r = P({}, Wf, e.duration);
  return P({
    getAutoHeightDuration: Xf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, u = ge(a, Hf);
      if (process.env.NODE_ENV !== "production") {
        const m = (b) => typeof b == "string", v = (b) => !isNaN(parseFloat(b));
        !m(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !m(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), m(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !m(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((m) => `${m} ${typeof i == "string" ? i : ni(i)} ${l} ${typeof c == "string" ? c : ni(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const qf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Kf = qf, Jf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Zf(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = ge(e, Jf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : rr(18));
  const l = Af(n), c = Yo(e);
  let u = ct(c, {
    mixins: vf(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Uf.slice(),
    typography: jf(l, a),
    transitions: Yf(o),
    zIndex: P({}, Kf)
  });
  if (u = ct(u, i), u = t.reduce((m, v) => ct(m, v), u), process.env.NODE_ENV !== "production") {
    const m = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (b, d) => {
      let h;
      for (h in b) {
        const f = b[h];
        if (m.indexOf(h) !== -1 && Object.keys(f).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = ot("", h);
            console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(b, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
              root: {
                [`&.${g}`]: f
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          b[h] = {};
        }
      }
    };
    Object.keys(u.components).forEach((b) => {
      const d = u.components[b].styleOverrides;
      d && b.indexOf("Mui") === 0 && v(d, b);
    });
  }
  return u.unstable_sxConfig = P({}, Wo, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Xo({
      sx: v,
      theme: this
    });
  }, u;
}
const Qf = Zf(), Ko = Qf, Jo = "$$material";
function ht({
  props: e,
  name: t
}) {
  return ff({
    props: e,
    name: t,
    defaultTheme: Ko,
    themeId: Jo
  });
}
const zs = (e) => cn(e) && e !== "classes", em = df({
  themeId: Jo,
  defaultTheme: Ko,
  rootShouldForwardProp: zs
}), Pe = em;
function tm(e) {
  return ot("MuiSvgIcon", e);
}
Nt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const rm = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], nm = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${rt(t)}`, `fontSize${rt(r)}`]
  };
  return mt(o, tm, n);
}, om = Pe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${rt(r.color)}`], t[`fontSize${rt(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, a, i, l, c, u, m, v, b, d, h;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // e.g. heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (n = r.create) == null ? void 0 : n.call(r, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((u = e.typography) == null || (m = u.pxToRem) == null ? void 0 : m.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (b = (e.vars || e).palette) == null || (b = b[t.color]) == null ? void 0 : b.main) != null ? v : {
      action: (d = (e.vars || e).palette) == null || (d = d.action) == null ? void 0 : d.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Zo = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const n = ht({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: m = !1,
    titleAccess: v,
    viewBox: b = "0 0 24 24"
  } = n, d = ge(n, rm), h = /* @__PURE__ */ E.isValidElement(o) && o.type === "svg", f = P({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: b,
    hasSvgAsChild: h
  }), g = {};
  m || (g.viewBox = b);
  const w = nm(f);
  return /* @__PURE__ */ $(om, P({
    as: l,
    className: Oe(w.root, a),
    focusable: "false",
    color: u,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: r
  }, g, d, h && o.props, {
    ownerState: f,
    children: [h ? o.props.children : o, v ? /* @__PURE__ */ p("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Zo.propTypes = {
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
Zo.muiName = "SvgIcon";
const oi = Zo;
function Us(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ p(oi, P({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = oi.muiName, /* @__PURE__ */ E.memo(/* @__PURE__ */ E.forwardRef(r));
}
const am = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), As.configure(e);
  }
}, im = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: rt,
  createChainedFunction: Eo,
  createSvgIcon: Us,
  debounce: Ss,
  deprecatedPropType: Ad,
  isMuiElement: Dd,
  ownerDocument: Re,
  ownerWindow: nr,
  requirePropFactory: Bd,
  setRef: hn,
  unstable_ClassNameGenerator: am,
  unstable_useEnhancedEffect: jt,
  unstable_useId: Cs,
  unsupportedProp: Vd,
  useControlled: Os,
  useEventCallback: Br,
  useForkRef: We,
  useIsFocusVisible: Rs
}, Symbol.toStringTag, { value: "Module" })), sm = /* @__PURE__ */ fd(im);
var ai;
function lm() {
  return ai || (ai = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = sm;
  }(Qn)), Qn;
}
var cm = md;
Object.defineProperty(Fo, "__esModule", {
  value: !0
});
var Hs = Fo.default = void 0, pm = cm(lm()), dm = rc;
Hs = Fo.default = (0, pm.default)(/* @__PURE__ */ (0, dm.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Gs(e) {
  return typeof e == "string";
}
function Nr(e, t, r) {
  return e === void 0 || Gs(e) ? t : P({}, t, {
    ownerState: P({}, t.ownerState, r)
  });
}
const um = {
  disableDefaultClasses: !1
}, fm = /* @__PURE__ */ E.createContext(um);
function mm(e) {
  const {
    disableDefaultClasses: t
  } = E.useContext(fm);
  return (r) => t ? "" : e(r);
}
function Ws(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function hm(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function ii(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function gm(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const d = Oe(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = P({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), f = P({}, r, o, n);
    return d.length > 0 && (f.className = d), Object.keys(h).length > 0 && (f.style = h), {
      props: f,
      internalRef: void 0
    };
  }
  const i = Ws(P({}, o, n)), l = ii(n), c = ii(o), u = t(i), m = Oe(u == null ? void 0 : u.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = P({}, u == null ? void 0 : u.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), b = P({}, u, r, c, l);
  return m.length > 0 && (b.className = m), Object.keys(v).length > 0 && (b.style = v), {
    props: b,
    internalRef: u.ref
  };
}
const bm = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Vt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = ge(e, bm), l = a ? {} : hm(n, o), {
    props: c,
    internalRef: u
  } = gm(P({}, i, {
    externalSlotProps: l
  })), m = We(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Nr(r, P({}, c, {
    ref: m
  }), o);
}
const Xs = "base";
function vm(e) {
  return `${Xs}--${e}`;
}
function ym(e, t) {
  return `${Xs}-${e}-${t}`;
}
function Ys(e, t) {
  const r = Ds[t];
  return r ? vm(r) : ym(e, t);
}
function wm(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Ys(e, n);
  }), r;
}
const xm = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function km(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Em(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function Nm(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Em(e));
}
function Tm(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(xm)).forEach((n, o) => {
    const a = km(n);
    a === -1 || !Nm(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function Sm() {
  return !0;
}
function vn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = Tm,
    isEnabled: i = Sm,
    open: l
  } = e, c = E.useRef(!1), u = E.useRef(null), m = E.useRef(null), v = E.useRef(null), b = E.useRef(null), d = E.useRef(!1), h = E.useRef(null), f = We(t.ref, h), g = E.useRef(null);
  E.useEffect(() => {
    !l || !h.current || (d.current = !r);
  }, [r, l]), E.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Re(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), d.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), E.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Re(h.current), k = (S) => {
      g.current = S, !(n || !i() || S.key !== "Tab") && x.activeElement === h.current && S.shiftKey && (c.current = !0, m.current && m.current.focus());
    }, y = () => {
      const S = h.current;
      if (S === null)
        return;
      if (!x.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (S.contains(x.activeElement) || n && x.activeElement !== u.current && x.activeElement !== m.current)
        return;
      if (x.activeElement !== b.current)
        b.current = null;
      else if (b.current !== null)
        return;
      if (!d.current)
        return;
      let I = [];
      if ((x.activeElement === u.current || x.activeElement === m.current) && (I = a(h.current)), I.length > 0) {
        var R, _;
        const N = !!((R = g.current) != null && R.shiftKey && ((_ = g.current) == null ? void 0 : _.key) === "Tab"), A = I[0], B = I[I.length - 1];
        typeof A != "string" && typeof B != "string" && (N ? B.focus() : A.focus());
      } else
        S.focus();
    };
    x.addEventListener("focusin", y), x.addEventListener("keydown", k, !0);
    const T = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(T), x.removeEventListener("focusin", y), x.removeEventListener("keydown", k, !0);
    };
  }, [r, n, o, i, l, a]);
  const w = (x) => {
    v.current === null && (v.current = x.relatedTarget), d.current = !0, b.current = x.target;
    const k = t.props.onFocus;
    k && k(x);
  }, O = (x) => {
    v.current === null && (v.current = x.relatedTarget), d.current = !0;
  };
  return /* @__PURE__ */ $(E.Fragment, {
    children: [/* @__PURE__ */ p("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ E.cloneElement(t, {
      ref: f,
      onFocus: w
    }), /* @__PURE__ */ p("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (vn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Hr,
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
process.env.NODE_ENV !== "production" && (vn["propTypes"] = Ns(vn.propTypes));
function Cm(e) {
  return typeof e == "function" ? e() : e;
}
const Lr = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = E.useState(null), c = We(/* @__PURE__ */ E.isValidElement(n) ? n.ref : null, r);
  if (jt(() => {
    a || l(Cm(o) || document.body);
  }, [o, a]), jt(() => {
    if (i && !a)
      return hn(r, i), () => {
        hn(r, null);
      };
  }, [r, i, a]), a) {
    if (/* @__PURE__ */ E.isValidElement(n)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ E.cloneElement(n, u);
    }
    return /* @__PURE__ */ p(E.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ p(E.Fragment, {
    children: i && /* @__PURE__ */ tp.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (Lr.propTypes = {
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
  container: s.oneOfType([dt, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (Lr["propTypes"] = Ns(Lr.propTypes));
function Om(e) {
  const t = Re(e);
  return t.body === e ? nr(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Rr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function si(e) {
  return parseInt(nr(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Rm(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function li(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !Rm(i);
    l && c && Rr(i, o);
  });
}
function lo(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function Pm(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (Om(n)) {
      const i = Ps(Re(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${si(n) + i}px`;
      const l = Re(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${si(c) + i}px`;
      });
    }
    let a;
    if (n.parentNode instanceof DocumentFragment)
      a = Re(n).body;
    else {
      const i = n.parentElement, l = nr(n);
      a = (i == null ? void 0 : i.nodeName) === "HTML" && l.getComputedStyle(i).overflowY === "scroll" ? i : n;
    }
    r.push({
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
    r.forEach(({
      value: a,
      el: i,
      property: l
    }) => {
      a ? i.style.setProperty(l, a) : i.style.removeProperty(l);
    });
  };
}
function $m(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class _m {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Rr(t.modalRef, !1);
    const o = $m(r);
    li(r, t.mount, t.modalRef, o, !0);
    const a = lo(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = lo(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = Pm(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = lo(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Rr(t.modalRef, r), li(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && Rr(i.modalRef, !1);
    }
    return n;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Im(e) {
  return typeof e == "function" ? e() : e;
}
function Mm(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Am = new _m();
function Dm(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Am,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: m,
    rootRef: v
  } = e, b = E.useRef({}), d = E.useRef(null), h = E.useRef(null), f = We(h, v), [g, w] = E.useState(!m), O = Mm(c);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const k = () => Re(d.current), y = () => (b.current.modalRef = h.current, b.current.mount = d.current, b.current), T = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, S = Br(() => {
    const j = Im(t) || k().body;
    o.add(y(), j), h.current && T();
  }), I = E.useCallback(() => o.isTopModal(y()), [o]), R = Br((j) => {
    d.current = j, j && (m && I() ? T() : h.current && Rr(h.current, x));
  }), _ = E.useCallback(() => {
    o.remove(y(), x);
  }, [x, o]);
  E.useEffect(() => () => {
    _();
  }, [_]), E.useEffect(() => {
    m ? S() : (!O || !a) && _();
  }, [m, _, O, a, S]);
  const N = (j) => (W) => {
    var te;
    (te = j.onKeyDown) == null || te.call(j, W), !(W.key !== "Escape" || W.which === 229 || // Wait until IME is settled.
    !I()) && (r || (W.stopPropagation(), u && u(W, "escapeKeyDown")));
  }, A = (j) => (W) => {
    var te;
    (te = j.onClick) == null || te.call(j, W), W.target === W.currentTarget && u && u(W, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const W = Ws(e);
      delete W.onTransitionEnter, delete W.onTransitionExited;
      const te = P({}, W, j);
      return P({
        role: "presentation"
      }, te, {
        onKeyDown: N(te),
        ref: f
      });
    },
    getBackdropProps: (j = {}) => {
      const W = j;
      return P({
        "aria-hidden": !0
      }, W, {
        onClick: A(W),
        open: m
      });
    },
    getTransitionProps: () => {
      const j = () => {
        w(!1), i && i();
      }, W = () => {
        w(!0), l && l(), a && _();
      };
      return {
        onEnter: Eo(j, c == null ? void 0 : c.props.onEnter),
        onExited: Eo(W, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: f,
    portalRef: R,
    isTopModal: I,
    exited: g,
    hasTransition: O
  };
}
var Me = "top", Xe = "bottom", Ye = "right", Ae = "left", Qo = "auto", Yr = [Me, Xe, Ye, Ae], or = "start", Vr = "end", Bm = "clippingParents", qs = "viewport", vr = "popper", jm = "reference", ci = /* @__PURE__ */ Yr.reduce(function(e, t) {
  return e.concat([t + "-" + or, t + "-" + Vr]);
}, []), Ks = /* @__PURE__ */ [].concat(Yr, [Qo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + or, t + "-" + Vr]);
}, []), Lm = "beforeRead", Vm = "read", Fm = "afterRead", zm = "beforeMain", Um = "main", Hm = "afterMain", Gm = "beforeWrite", Wm = "write", Xm = "afterWrite", Ym = [Lm, Vm, Fm, zm, Um, Hm, Gm, Wm, Xm];
function nt(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function ze(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Ft(e) {
  var t = ze(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ge(e) {
  var t = ze(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function ea(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ze(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function qm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Ge(a) || !nt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Km(e) {
  var t = e.state, r = {
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
  return Object.assign(t.elements.popper.style, r.popper), t.styles = r, t.elements.arrow && Object.assign(t.elements.arrow.style, r.arrow), function() {
    Object.keys(t.elements).forEach(function(n) {
      var o = t.elements[n], a = t.attributes[n] || {}, i = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), l = i.reduce(function(c, u) {
        return c[u] = "", c;
      }, {});
      !Ge(o) || !nt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Jm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: qm,
  effect: Km,
  requires: ["computeStyles"]
};
function Qe(e) {
  return e.split("-")[0];
}
var Dt = Math.max, yn = Math.min, ar = Math.round;
function So() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Js() {
  return !/^((?!chrome|android).)*safari/i.test(So());
}
function ir(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && ar(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && ar(n.height) / e.offsetHeight || 1);
  var i = Ft(e) ? ze(e) : window, l = i.visualViewport, c = !Js() && r, u = (n.left + (c && l ? l.offsetLeft : 0)) / o, m = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, b = n.height / a;
  return {
    width: v,
    height: b,
    top: m,
    right: u + v,
    bottom: m + b,
    left: u,
    x: u,
    y: m
  };
}
function ta(e) {
  var t = ir(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Zs(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && ea(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function ft(e) {
  return ze(e).getComputedStyle(e);
}
function Zm(e) {
  return ["table", "td", "th"].indexOf(nt(e)) >= 0;
}
function St(e) {
  return ((Ft(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function zn(e) {
  return nt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ea(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    St(e)
  );
}
function pi(e) {
  return !Ge(e) || // https://github.com/popperjs/popper-core/issues/837
  ft(e).position === "fixed" ? null : e.offsetParent;
}
function Qm(e) {
  var t = /firefox/i.test(So()), r = /Trident/i.test(So());
  if (r && Ge(e)) {
    var n = ft(e);
    if (n.position === "fixed")
      return null;
  }
  var o = zn(e);
  for (ea(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(nt(o)) < 0; ) {
    var a = ft(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function qr(e) {
  for (var t = ze(e), r = pi(e); r && Zm(r) && ft(r).position === "static"; )
    r = pi(r);
  return r && (nt(r) === "html" || nt(r) === "body" && ft(r).position === "static") ? t : r || Qm(e) || t;
}
function ra(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Pr(e, t, r) {
  return Dt(e, yn(t, r));
}
function eh(e, t, r) {
  var n = Pr(e, t, r);
  return n > r ? r : n;
}
function Qs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function el(e) {
  return Object.assign({}, Qs(), e);
}
function tl(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var th = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, el(typeof t != "number" ? t : tl(t, Yr));
};
function rh(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = Qe(r.placement), c = ra(l), u = [Ae, Ye].indexOf(l) >= 0, m = u ? "height" : "width";
  if (!(!a || !i)) {
    var v = th(o.padding, r), b = ta(a), d = c === "y" ? Me : Ae, h = c === "y" ? Xe : Ye, f = r.rects.reference[m] + r.rects.reference[c] - i[c] - r.rects.popper[m], g = i[c] - r.rects.reference[c], w = qr(a), O = w ? c === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = f / 2 - g / 2, k = v[d], y = O - b[m] - v[h], T = O / 2 - b[m] / 2 + x, S = Pr(k, T, y), I = c;
    r.modifiersData[n] = (t = {}, t[I] = S, t.centerOffset = S - T, t);
  }
}
function nh(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Zs(t.elements.popper, o) && (t.elements.arrow = o));
}
const oh = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: rh,
  effect: nh,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function sr(e) {
  return e.split("-")[1];
}
var ah = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ih(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: ar(r * o) / o || 0,
    y: ar(n * o) / o || 0
  };
}
function di(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, m = e.roundOffsets, v = e.isFixed, b = i.x, d = b === void 0 ? 0 : b, h = i.y, f = h === void 0 ? 0 : h, g = typeof m == "function" ? m({
    x: d,
    y: f
  }) : {
    x: d,
    y: f
  };
  d = g.x, f = g.y;
  var w = i.hasOwnProperty("x"), O = i.hasOwnProperty("y"), x = Ae, k = Me, y = window;
  if (u) {
    var T = qr(r), S = "clientHeight", I = "clientWidth";
    if (T === ze(r) && (T = St(r), ft(T).position !== "static" && l === "absolute" && (S = "scrollHeight", I = "scrollWidth")), T = T, o === Me || (o === Ae || o === Ye) && a === Vr) {
      k = Xe;
      var R = v && T === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[S]
      );
      f -= R - n.height, f *= c ? 1 : -1;
    }
    if (o === Ae || (o === Me || o === Xe) && a === Vr) {
      x = Ye;
      var _ = v && T === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[I]
      );
      d -= _ - n.width, d *= c ? 1 : -1;
    }
  }
  var N = Object.assign({
    position: l
  }, u && ah), A = m === !0 ? ih({
    x: d,
    y: f
  }, ze(r)) : {
    x: d,
    y: f
  };
  if (d = A.x, f = A.y, c) {
    var B;
    return Object.assign({}, N, (B = {}, B[k] = O ? "0" : "", B[x] = w ? "0" : "", B.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + f + "px)" : "translate3d(" + d + "px, " + f + "px, 0)", B));
  }
  return Object.assign({}, N, (t = {}, t[k] = O ? f + "px" : "", t[x] = w ? d + "px" : "", t.transform = "", t));
}
function sh(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Qe(t.placement),
    variation: sr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, di(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, di(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const lh = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: sh,
  data: {}
};
var on = {
  passive: !0
};
function ch(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = ze(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && u.forEach(function(m) {
    m.addEventListener("scroll", r.update, on);
  }), l && c.addEventListener("resize", r.update, on), function() {
    a && u.forEach(function(m) {
      m.removeEventListener("scroll", r.update, on);
    }), l && c.removeEventListener("resize", r.update, on);
  };
}
const ph = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ch,
  data: {}
};
var dh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function dn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return dh[t];
  });
}
var uh = {
  start: "end",
  end: "start"
};
function ui(e) {
  return e.replace(/start|end/g, function(t) {
    return uh[t];
  });
}
function na(e) {
  var t = ze(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function oa(e) {
  return ir(St(e)).left + na(e).scrollLeft;
}
function fh(e, t) {
  var r = ze(e), n = St(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var u = Js();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + oa(e),
    y: c
  };
}
function mh(e) {
  var t, r = St(e), n = na(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = Dt(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Dt(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + oa(e), c = -n.scrollTop;
  return ft(o || r).direction === "rtl" && (l += Dt(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function aa(e) {
  var t = ft(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function rl(e) {
  return ["html", "body", "#document"].indexOf(nt(e)) >= 0 ? e.ownerDocument.body : Ge(e) && aa(e) ? e : rl(zn(e));
}
function $r(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = rl(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ze(n), i = o ? [a].concat(a.visualViewport || [], aa(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat($r(zn(i)))
  );
}
function Co(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function hh(e, t) {
  var r = ir(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function fi(e, t, r) {
  return t === qs ? Co(fh(e, r)) : Ft(t) ? hh(t, r) : Co(mh(St(e)));
}
function gh(e) {
  var t = $r(zn(e)), r = ["absolute", "fixed"].indexOf(ft(e).position) >= 0, n = r && Ge(e) ? qr(e) : e;
  return Ft(n) ? t.filter(function(o) {
    return Ft(o) && Zs(o, n) && nt(o) !== "body";
  }) : [];
}
function bh(e, t, r, n) {
  var o = t === "clippingParents" ? gh(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, u) {
    var m = fi(e, u, n);
    return c.top = Dt(m.top, c.top), c.right = yn(m.right, c.right), c.bottom = yn(m.bottom, c.bottom), c.left = Dt(m.left, c.left), c;
  }, fi(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function nl(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Qe(n) : null, a = n ? sr(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
  switch (o) {
    case Me:
      c = {
        x: i,
        y: t.y - r.height
      };
      break;
    case Xe:
      c = {
        x: i,
        y: t.y + t.height
      };
      break;
    case Ye:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Ae:
      c = {
        x: t.x - r.width,
        y: l
      };
      break;
    default:
      c = {
        x: t.x,
        y: t.y
      };
  }
  var u = o ? ra(o) : null;
  if (u != null) {
    var m = u === "y" ? "height" : "width";
    switch (a) {
      case or:
        c[u] = c[u] - (t[m] / 2 - r[m] / 2);
        break;
      case Vr:
        c[u] = c[u] + (t[m] / 2 - r[m] / 2);
        break;
    }
  }
  return c;
}
function Fr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? Bm : l, u = r.rootBoundary, m = u === void 0 ? qs : u, v = r.elementContext, b = v === void 0 ? vr : v, d = r.altBoundary, h = d === void 0 ? !1 : d, f = r.padding, g = f === void 0 ? 0 : f, w = el(typeof g != "number" ? g : tl(g, Yr)), O = b === vr ? jm : vr, x = e.rects.popper, k = e.elements[h ? O : b], y = bh(Ft(k) ? k : k.contextElement || St(e.elements.popper), c, m, i), T = ir(e.elements.reference), S = nl({
    reference: T,
    element: x,
    strategy: "absolute",
    placement: o
  }), I = Co(Object.assign({}, x, S)), R = b === vr ? I : T, _ = {
    top: y.top - R.top + w.top,
    bottom: R.bottom - y.bottom + w.bottom,
    left: y.left - R.left + w.left,
    right: R.right - y.right + w.right
  }, N = e.modifiersData.offset;
  if (b === vr && N) {
    var A = N[o];
    Object.keys(_).forEach(function(B) {
      var z = [Ye, Xe].indexOf(B) >= 0 ? 1 : -1, G = [Me, Xe].indexOf(B) >= 0 ? "y" : "x";
      _[B] += A[G] * z;
    });
  }
  return _;
}
function vh(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, u = c === void 0 ? Ks : c, m = sr(n), v = m ? l ? ci : ci.filter(function(h) {
    return sr(h) === m;
  }) : Yr, b = v.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  b.length === 0 && (b = v);
  var d = b.reduce(function(h, f) {
    return h[f] = Fr(e, {
      placement: f,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Qe(f)], h;
  }, {});
  return Object.keys(d).sort(function(h, f) {
    return d[h] - d[f];
  });
}
function yh(e) {
  if (Qe(e) === Qo)
    return [];
  var t = dn(e);
  return [ui(e), t, ui(t)];
}
function wh(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, u = r.padding, m = r.boundary, v = r.rootBoundary, b = r.altBoundary, d = r.flipVariations, h = d === void 0 ? !0 : d, f = r.allowedAutoPlacements, g = t.options.placement, w = Qe(g), O = w === g, x = c || (O || !h ? [dn(g)] : yh(g)), k = [g].concat(x).reduce(function(H, K) {
      return H.concat(Qe(K) === Qo ? vh(t, {
        placement: K,
        boundary: m,
        rootBoundary: v,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: f
      }) : K);
    }, []), y = t.rects.reference, T = t.rects.popper, S = /* @__PURE__ */ new Map(), I = !0, R = k[0], _ = 0; _ < k.length; _++) {
      var N = k[_], A = Qe(N), B = sr(N) === or, z = [Me, Xe].indexOf(A) >= 0, G = z ? "width" : "height", j = Fr(t, {
        placement: N,
        boundary: m,
        rootBoundary: v,
        altBoundary: b,
        padding: u
      }), W = z ? B ? Ye : Ae : B ? Xe : Me;
      y[G] > T[G] && (W = dn(W));
      var te = dn(W), F = [];
      if (a && F.push(j[A] <= 0), l && F.push(j[W] <= 0, j[te] <= 0), F.every(function(H) {
        return H;
      })) {
        R = N, I = !1;
        break;
      }
      S.set(N, F);
    }
    if (I)
      for (var C = h ? 3 : 1, L = function(K) {
        var q = k.find(function(Z) {
          var J = S.get(Z);
          if (J)
            return J.slice(0, K).every(function(Q) {
              return Q;
            });
        });
        if (q)
          return R = q, "break";
      }, X = C; X > 0; X--) {
        var Y = L(X);
        if (Y === "break")
          break;
      }
    t.placement !== R && (t.modifiersData[n]._skip = !0, t.placement = R, t.reset = !0);
  }
}
const xh = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: wh,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function mi(e, t, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: e.top - t.height - r.y,
    right: e.right - t.width + r.x,
    bottom: e.bottom - t.height + r.y,
    left: e.left - t.width - r.x
  };
}
function hi(e) {
  return [Me, Ye, Xe, Ae].some(function(t) {
    return e[t] >= 0;
  });
}
function kh(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Fr(t, {
    elementContext: "reference"
  }), l = Fr(t, {
    altBoundary: !0
  }), c = mi(i, n), u = mi(l, o, a), m = hi(c), v = hi(u);
  t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: m,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": m,
    "data-popper-escaped": v
  });
}
const Eh = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: kh
};
function Nh(e, t, r) {
  var n = Qe(e), o = [Ae, Me].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Ae, Ye].indexOf(n) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Th(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = Ks.reduce(function(m, v) {
    return m[v] = Nh(v, t.rects, a), m;
  }, {}), l = i[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = i;
}
const Sh = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Th
};
function Ch(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = nl({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Oh = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ch,
  data: {}
};
function Rh(e) {
  return e === "x" ? "y" : "x";
}
function Ph(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, u = r.rootBoundary, m = r.altBoundary, v = r.padding, b = r.tether, d = b === void 0 ? !0 : b, h = r.tetherOffset, f = h === void 0 ? 0 : h, g = Fr(t, {
    boundary: c,
    rootBoundary: u,
    padding: v,
    altBoundary: m
  }), w = Qe(t.placement), O = sr(t.placement), x = !O, k = ra(w), y = Rh(k), T = t.modifiersData.popperOffsets, S = t.rects.reference, I = t.rects.popper, R = typeof f == "function" ? f(Object.assign({}, t.rects, {
    placement: t.placement
  })) : f, _ = typeof R == "number" ? {
    mainAxis: R,
    altAxis: R
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, R), N = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, A = {
    x: 0,
    y: 0
  };
  if (T) {
    if (a) {
      var B, z = k === "y" ? Me : Ae, G = k === "y" ? Xe : Ye, j = k === "y" ? "height" : "width", W = T[k], te = W + g[z], F = W - g[G], C = d ? -I[j] / 2 : 0, L = O === or ? S[j] : I[j], X = O === or ? -I[j] : -S[j], Y = t.elements.arrow, H = d && Y ? ta(Y) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Qs(), q = K[z], Z = K[G], J = Pr(0, S[j], H[j]), Q = x ? S[j] / 2 - C - J - q - _.mainAxis : L - J - q - _.mainAxis, ee = x ? -S[j] / 2 + C + J + Z + _.mainAxis : X + J + Z + _.mainAxis, ie = t.elements.arrow && qr(t.elements.arrow), V = ie ? k === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, re = (B = N == null ? void 0 : N[k]) != null ? B : 0, D = W + Q - re - V, se = W + ee - re, Te = Pr(d ? yn(te, D) : te, W, d ? Dt(F, se) : F);
      T[k] = Te, A[k] = Te - W;
    }
    if (l) {
      var $e, ke = k === "x" ? Me : Ae, Ct = k === "x" ? Xe : Ye, _e = T[y], at = y === "y" ? "height" : "width", je = _e + g[ke], it = _e - g[Ct], Se = [Me, Ae].indexOf(w) !== -1, zt = ($e = N == null ? void 0 : N[y]) != null ? $e : 0, Ot = Se ? je : _e - S[at] - I[at] - zt + _.altAxis, pr = Se ? _e + S[at] + I[at] - zt - _.altAxis : it, Zr = d && Se ? eh(Ot, _e, pr) : Pr(d ? Ot : je, _e, d ? pr : it);
      T[y] = Zr, A[y] = Zr - _e;
    }
    t.modifiersData[n] = A;
  }
}
const $h = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Ph,
  requiresIfExists: ["offset"]
};
function _h(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Ih(e) {
  return e === ze(e) || !Ge(e) ? na(e) : _h(e);
}
function Mh(e) {
  var t = e.getBoundingClientRect(), r = ar(t.width) / e.offsetWidth || 1, n = ar(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Ah(e, t, r) {
  r === void 0 && (r = !1);
  var n = Ge(t), o = Ge(t) && Mh(t), a = St(t), i = ir(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((nt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  aa(a)) && (l = Ih(t)), Ge(t) ? (c = ir(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = oa(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Dh(e) {
  var t = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    r.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
      if (!r.has(l)) {
        var c = t.get(l);
        c && o(c);
      }
    }), n.push(a);
  }
  return e.forEach(function(a) {
    r.has(a.name) || o(a);
  }), n;
}
function Bh(e) {
  var t = Dh(e);
  return Ym.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function jh(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function Lh(e) {
  var t = e.reduce(function(r, n) {
    var o = r[n.name];
    return r[n.name] = o ? Object.assign({}, o, n, {
      options: Object.assign({}, o.options, n.options),
      data: Object.assign({}, o.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(t).map(function(r) {
    return t[r];
  });
}
var gi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function bi() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Vh(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? gi : o;
  return function(l, c, u) {
    u === void 0 && (u = a);
    var m = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, gi, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, v = [], b = !1, d = {
      state: m,
      setOptions: function(w) {
        var O = typeof w == "function" ? w(m.options) : w;
        f(), m.options = Object.assign({}, a, m.options, O), m.scrollParents = {
          reference: Ft(l) ? $r(l) : l.contextElement ? $r(l.contextElement) : [],
          popper: $r(c)
        };
        var x = Bh(Lh([].concat(n, m.options.modifiers)));
        return m.orderedModifiers = x.filter(function(k) {
          return k.enabled;
        }), h(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var w = m.elements, O = w.reference, x = w.popper;
          if (bi(O, x)) {
            m.rects = {
              reference: Ah(O, qr(x), m.options.strategy === "fixed"),
              popper: ta(x)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(_) {
              return m.modifiersData[_.name] = Object.assign({}, _.data);
            });
            for (var k = 0; k < m.orderedModifiers.length; k++) {
              if (m.reset === !0) {
                m.reset = !1, k = -1;
                continue;
              }
              var y = m.orderedModifiers[k], T = y.fn, S = y.options, I = S === void 0 ? {} : S, R = y.name;
              typeof T == "function" && (m = T({
                state: m,
                options: I,
                name: R,
                instance: d
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: jh(function() {
        return new Promise(function(g) {
          d.forceUpdate(), g(m);
        });
      }),
      destroy: function() {
        f(), b = !0;
      }
    };
    if (!bi(l, c))
      return d;
    d.setOptions(u).then(function(g) {
      !b && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function h() {
      m.orderedModifiers.forEach(function(g) {
        var w = g.name, O = g.options, x = O === void 0 ? {} : O, k = g.effect;
        if (typeof k == "function") {
          var y = k({
            state: m,
            name: w,
            instance: d,
            options: x
          }), T = function() {
          };
          v.push(y || T);
        }
      });
    }
    function f() {
      v.forEach(function(g) {
        return g();
      }), v = [];
    }
    return d;
  };
}
var Fh = [ph, Oh, lh, Jm, Sh, xh, $h, oh, Eh], zh = /* @__PURE__ */ Vh({
  defaultModifiers: Fh
});
const ol = "Popper";
function Uh(e) {
  return Ys(ol, e);
}
wm(ol, ["root"]);
const Hh = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Gh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Wh(e, t) {
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
function wn(e) {
  return typeof e == "function" ? e() : e;
}
function Un(e) {
  return e.nodeType !== void 0;
}
function Xh(e) {
  return !Un(e);
}
const Yh = () => mt({
  root: ["root"]
}, mm(Uh)), qh = {}, Kh = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: m,
    popperOptions: v,
    popperRef: b,
    slotProps: d = {},
    slots: h = {},
    TransitionProps: f
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, g = ge(t, Hh), w = E.useRef(null), O = We(w, r), x = E.useRef(null), k = We(x, b), y = E.useRef(k);
  jt(() => {
    y.current = k;
  }, [k]), E.useImperativeHandle(b, () => x.current, []);
  const T = Wh(m, i), [S, I] = E.useState(T), [R, _] = E.useState(wn(o));
  E.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), E.useEffect(() => {
    o && _(wn(o));
  }, [o]), jt(() => {
    if (!R || !u)
      return;
    const G = (te) => {
      I(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && R && Un(R) && R.nodeType === 1) {
      const te = R.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let j = [{
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
        G(te);
      }
    }];
    c != null && (j = j.concat(c)), v && v.modifiers != null && (j = j.concat(v.modifiers));
    const W = zh(R, w.current, P({
      placement: T
    }, v, {
      modifiers: j
    }));
    return y.current(W), () => {
      W.destroy(), y.current(null);
    };
  }, [R, l, c, u, v, T]);
  const N = {
    placement: S
  };
  f !== null && (N.TransitionProps = f);
  const A = Yh(), B = (n = h.root) != null ? n : "div", z = Vt({
    elementType: B,
    externalSlotProps: d.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: O
    },
    ownerState: t,
    className: A.root
  });
  return /* @__PURE__ */ p(B, P({}, z, {
    children: typeof a == "function" ? a(N) : a
  }));
}), al = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: m,
    placement: v = "bottom",
    popperOptions: b = qh,
    popperRef: d,
    style: h,
    transition: f = !1,
    slotProps: g = {},
    slots: w = {}
  } = t, O = ge(t, Gh), [x, k] = E.useState(!0), y = () => {
    k(!1);
  }, T = () => {
    k(!0);
  };
  if (!c && !m && (!f || x))
    return null;
  let S;
  if (a)
    S = a;
  else if (n) {
    const _ = wn(n);
    S = _ && Un(_) ? Re(_).body : Re(null).body;
  }
  const I = !m && c && (!f || x) ? "none" : void 0, R = f ? {
    in: m,
    onEnter: y,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ p(Lr, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ p(Kh, P({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: u,
      ref: r,
      open: f ? !x : m,
      placement: v,
      popperOptions: b,
      popperRef: d,
      slotProps: g,
      slots: w
    }, O, {
      style: P({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: I
      }, h),
      TransitionProps: R,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (al.propTypes = {
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
  anchorEl: cr(s.oneOfType([dt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = wn(e.anchorEl);
      if (t && Un(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Xh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: s.oneOfType([dt, s.func]),
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
  popperRef: Uo,
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
function Kr() {
  const e = Fs(Ko);
  return process.env.NODE_ENV !== "production" && E.useDebugValue(e), e[Jo] || e;
}
function Oo(e, t) {
  return Oo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, Oo(e, t);
}
function Jh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Oo(e, t);
}
const vi = {
  disabled: !1
};
var Zh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const il = U.createContext(null);
var Qh = function(t) {
  return t.scrollTop;
}, Tr = "unmounted", $t = "exited", _t = "entering", Jt = "entered", Ro = "exiting", gt = /* @__PURE__ */ function(e) {
  Jh(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = $t, a.appearStatus = _t) : c = Jt : n.unmountOnExit || n.mountOnEnter ? c = Tr : c = $t, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === Tr ? {
      status: $t
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== _t && i !== Jt && (a = _t) : (i === _t || i === Jt) && (a = Ro);
    }
    this.updateStatus(!1, a);
  }, r.componentWillUnmount = function() {
    this.cancelNextCallback();
  }, r.getTimeouts = function() {
    var o = this.props.timeout, a, i, l;
    return a = i = l = o, o != null && typeof o != "number" && (a = o.exit, i = o.enter, l = o.appear !== void 0 ? o.appear : i), {
      exit: a,
      enter: i,
      appear: l
    };
  }, r.updateStatus = function(o, a) {
    if (o === void 0 && (o = !1), a !== null)
      if (this.cancelNextCallback(), a === _t) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : tn.findDOMNode(this);
          i && Qh(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === $t && this.setState({
        status: Tr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [tn.findDOMNode(this), l], u = c[0], m = c[1], v = this.getTimeouts(), b = l ? v.appear : v.enter;
    if (!o && !i || vi.disabled) {
      this.safeSetState({
        status: Jt
      }, function() {
        a.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, m), this.safeSetState({
      status: _t
    }, function() {
      a.props.onEntering(u, m), a.onTransitionEnd(b, function() {
        a.safeSetState({
          status: Jt
        }, function() {
          a.props.onEntered(u, m);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : tn.findDOMNode(this);
    if (!a || vi.disabled) {
      this.safeSetState({
        status: $t
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Ro
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: $t
        }, function() {
          o.props.onExited(l);
        });
      });
    });
  }, r.cancelNextCallback = function() {
    this.nextCallback !== null && (this.nextCallback.cancel(), this.nextCallback = null);
  }, r.safeSetState = function(o, a) {
    a = this.setNextCallback(a), this.setState(o, a);
  }, r.setNextCallback = function(o) {
    var a = this, i = !0;
    return this.nextCallback = function(l) {
      i && (i = !1, a.nextCallback = null, o(l));
    }, this.nextCallback.cancel = function() {
      i = !1;
    }, this.nextCallback;
  }, r.onTransitionEnd = function(o, a) {
    this.setNextCallback(a);
    var i = this.props.nodeRef ? this.props.nodeRef.current : tn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], u = c[0], m = c[1];
      this.props.addEndListener(u, m);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === Tr)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = ge(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ U.createElement(il.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : U.cloneElement(U.Children.only(i), l))
    );
  }, t;
}(U.Component);
gt.contextType = il;
gt.propTypes = process.env.NODE_ENV !== "production" ? {
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
    current: typeof Element > "u" ? s.any : function(e, t, r, n, o, a) {
      var i = e[t];
      return s.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(e, t, r, n, o, a);
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
    var r = Zh;
    t.addEndListener || (r = r.isRequired);
    for (var n = arguments.length, o = new Array(n > 1 ? n - 1 : 0), a = 1; a < n; a++)
      o[a - 1] = arguments[a];
    return r.apply(void 0, [t].concat(o));
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
function Yt() {
}
gt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Yt,
  onEntering: Yt,
  onEntered: Yt,
  onExit: Yt,
  onExiting: Yt,
  onExited: Yt
};
gt.UNMOUNTED = Tr;
gt.EXITED = $t;
gt.ENTERING = _t;
gt.ENTERED = Jt;
gt.EXITING = Ro;
const sl = gt, ll = (e) => e.scrollTop;
function xn(e, t) {
  var r, n;
  const {
    timeout: o,
    easing: a,
    style: i = {}
  } = e;
  return {
    duration: (r = i.transitionDuration) != null ? r : typeof o == "number" ? o : o[t.mode] || 0,
    easing: (n = i.transitionTimingFunction) != null ? n : typeof a == "object" ? a[t.mode] : a,
    delay: i.transitionDelay
  };
}
const eg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Po(e) {
  return `scale(${e}, ${e ** 2})`;
}
const tg = {
  entering: {
    opacity: 1,
    transform: Po(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, co = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), ia = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: m,
    onExit: v,
    onExited: b,
    onExiting: d,
    style: h,
    timeout: f = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = sl
  } = t, w = ge(t, eg), O = Er(), x = E.useRef(), k = Kr(), y = E.useRef(null), T = We(y, a.ref, r), S = (G) => (j) => {
    if (G) {
      const W = y.current;
      j === void 0 ? G(W) : G(W, j);
    }
  }, I = S(m), R = S((G, j) => {
    ll(G);
    const {
      duration: W,
      delay: te,
      easing: F
    } = xn({
      style: h,
      timeout: f,
      easing: i
    }, {
      mode: "enter"
    });
    let C;
    f === "auto" ? (C = k.transitions.getAutoHeightDuration(G.clientHeight), x.current = C) : C = W, G.style.transition = [k.transitions.create("opacity", {
      duration: C,
      delay: te
    }), k.transitions.create("transform", {
      duration: co ? C : C * 0.666,
      delay: te,
      easing: F
    })].join(","), c && c(G, j);
  }), _ = S(u), N = S(d), A = S((G) => {
    const {
      duration: j,
      delay: W,
      easing: te
    } = xn({
      style: h,
      timeout: f,
      easing: i
    }, {
      mode: "exit"
    });
    let F;
    f === "auto" ? (F = k.transitions.getAutoHeightDuration(G.clientHeight), x.current = F) : F = j, G.style.transition = [k.transitions.create("opacity", {
      duration: F,
      delay: W
    }), k.transitions.create("transform", {
      duration: co ? F : F * 0.666,
      delay: co ? W : W || F * 0.333,
      easing: te
    })].join(","), G.style.opacity = 0, G.style.transform = Po(0.75), v && v(G);
  }), B = S(b);
  return /* @__PURE__ */ p(g, P({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: R,
    onEntered: _,
    onEntering: I,
    onExit: A,
    onExited: B,
    onExiting: N,
    addEndListener: (G) => {
      f === "auto" && O.start(x.current || 0, G), n && n(y.current, G);
    },
    timeout: f === "auto" ? null : f
  }, w, {
    children: (G, j) => /* @__PURE__ */ E.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: Po(0.75),
        visibility: G === "exited" && !l ? "hidden" : void 0
      }, tg[G], h, a.props.style),
      ref: T
    }, j))
  }));
});
process.env.NODE_ENV !== "production" && (ia.propTypes = {
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
  children: Hr.isRequired,
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
ia.muiSupportAuto = !0;
const $o = ia, rg = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, yi = rg, ng = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], og = Pe(al, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), cl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n;
  const o = Vs(), a = ht({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: u,
    container: m,
    disablePortal: v,
    keepMounted: b,
    modifiers: d,
    open: h,
    placement: f,
    popperOptions: g,
    popperRef: w,
    transition: O,
    slots: x,
    slotProps: k
  } = a, y = ge(a, ng), T = (n = x == null ? void 0 : x.root) != null ? n : c == null ? void 0 : c.Root, S = P({
    anchorEl: i,
    container: m,
    disablePortal: v,
    keepMounted: b,
    modifiers: d,
    open: h,
    placement: f,
    popperOptions: g,
    popperRef: w,
    transition: O
  }, y);
  return /* @__PURE__ */ p(og, P({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: T
    },
    slotProps: k ?? u
  }, S, {
    ref: r
  }));
});
process.env.NODE_ENV !== "production" && (cl.propTypes = {
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
  anchorEl: s.oneOfType([dt, s.object, s.func]),
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
  container: s.oneOfType([dt, s.func]),
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
  popperRef: Uo,
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
const pl = cl;
function ag(e) {
  return ot("MuiTooltip", e);
}
const ig = Nt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), xt = ig, sg = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function lg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const cg = (e) => {
  const {
    classes: t,
    disableInteractive: r,
    arrow: n,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !r && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${rt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return mt(i, ag, t);
}, pg = Pe(pl, {
  name: "MuiTooltip",
  slot: "Popper",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.popper, !r.disableInteractive && t.popperInteractive, r.arrow && t.popperArrow, !r.open && t.popperClose];
  }
})(({
  theme: e,
  ownerState: t,
  open: r
}) => P({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !r && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${xt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${xt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${xt.arrow}`]: P({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${xt.arrow}`]: P({}, t.isRtl ? {
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
})), dg = Pe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.tooltip, r.touch && t.touch, r.arrow && t.tooltipArrow, t[`tooltipPlacement${rt(r.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => P({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : bn(e.palette.grey[700], 0.92),
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
  lineHeight: `${lg(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${xt.popper}[data-popper-placement*="left"] &`]: P({
    transformOrigin: "right center"
  }, t.isRtl ? P({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : P({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${xt.popper}[data-popper-placement*="right"] &`]: P({
    transformOrigin: "left center"
  }, t.isRtl ? P({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : P({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${xt.popper}[data-popper-placement*="top"] &`]: P({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${xt.popper}[data-popper-placement*="bottom"] &`]: P({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), ug = Pe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : bn(e.palette.grey[700], 0.9),
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
let an = !1;
const wi = new Gr();
let yr = {
  x: 0,
  y: 0
};
function sn(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const dl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n, o, a, i, l, c, u, m, v, b, d, h, f, g, w, O, x, k, y;
  const T = ht({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: I,
    components: R = {},
    componentsProps: _ = {},
    describeChild: N = !1,
    disableFocusListener: A = !1,
    disableHoverListener: B = !1,
    disableInteractive: z = !1,
    disableTouchListener: G = !1,
    enterDelay: j = 100,
    enterNextDelay: W = 0,
    enterTouchDelay: te = 700,
    followCursor: F = !1,
    id: C,
    leaveDelay: L = 0,
    leaveTouchDelay: X = 1500,
    onClose: Y,
    onOpen: H,
    open: K,
    placement: q = "bottom",
    PopperComponent: Z,
    PopperProps: J = {},
    slotProps: Q = {},
    slots: ee = {},
    title: ie,
    TransitionComponent: V = $o,
    TransitionProps: re
  } = T, D = ge(T, sg), se = /* @__PURE__ */ E.isValidElement(I) ? I : /* @__PURE__ */ p("span", {
    children: I
  }), Te = Kr(), $e = Te.direction === "rtl", [ke, Ct] = E.useState(), [_e, at] = E.useState(null), je = E.useRef(!1), it = z || F, Se = Er(), zt = Er(), Ot = Er(), pr = Er(), [Zr, pa] = Os({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let st = Zr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = E.useRef(K !== void 0);
    E.useEffect(() => {
      ke && ke.disabled && !ne && ie !== "" && ke.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, ke, ne]);
  }
  const Hn = Cs(C), dr = E.useRef(), Qr = Br(() => {
    dr.current !== void 0 && (document.body.style.WebkitUserSelect = dr.current, dr.current = void 0), pr.clear();
  });
  E.useEffect(() => Qr, [Qr]);
  const da = (ne) => {
    wi.clear(), an = !0, pa(!0), H && !st && H(ne);
  }, en = Br(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      wi.start(800 + L, () => {
        an = !1;
      }), pa(!1), Y && st && Y(ne), Se.start(Te.transitions.duration.shortest, () => {
        je.current = !1;
      });
    }
  ), Gn = (ne) => {
    je.current && ne.type !== "touchstart" || (ke && ke.removeAttribute("title"), zt.clear(), Ot.clear(), j || an && W ? zt.start(an ? W : j, () => {
      da(ne);
    }) : da(ne));
  }, ua = (ne) => {
    zt.clear(), Ot.start(L, () => {
      en(ne);
    });
  }, {
    isFocusVisibleRef: fa,
    onBlur: Hl,
    onFocus: Gl,
    ref: Wl
  } = Rs(), [, ma] = E.useState(!1), ha = (ne) => {
    Hl(ne), fa.current === !1 && (ma(!1), ua(ne));
  }, ga = (ne) => {
    ke || Ct(ne.currentTarget), Gl(ne), fa.current === !0 && (ma(!0), Gn(ne));
  }, ba = (ne) => {
    je.current = !0;
    const Le = se.props;
    Le.onTouchStart && Le.onTouchStart(ne);
  }, va = Gn, ya = ua, Xl = (ne) => {
    ba(ne), Ot.clear(), Se.clear(), Qr(), dr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", pr.start(te, () => {
      document.body.style.WebkitUserSelect = dr.current, Gn(ne);
    });
  }, Yl = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Qr(), Ot.start(X, () => {
      en(ne);
    });
  };
  E.useEffect(() => {
    if (!st)
      return;
    function ne(Le) {
      (Le.key === "Escape" || Le.key === "Esc") && en(Le);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [en, st]);
  const ql = We(se.ref, Wl, Ct, r);
  !ie && ie !== 0 && (st = !1);
  const Wn = E.useRef(), Kl = (ne) => {
    const Le = se.props;
    Le.onMouseMove && Le.onMouseMove(ne), yr = {
      x: ne.clientX,
      y: ne.clientY
    }, Wn.current && Wn.current.update();
  }, ur = {}, Xn = typeof ie == "string";
  N ? (ur.title = !st && Xn && !B ? ie : null, ur["aria-describedby"] = st ? Hn : null) : (ur["aria-label"] = Xn ? ie : null, ur["aria-labelledby"] = st && !Xn ? Hn : null);
  const Ue = P({}, ur, D, se.props, {
    className: Oe(D.className, se.props.className),
    onTouchStart: ba,
    ref: ql
  }, F ? {
    onMouseMove: Kl
  } : {});
  process.env.NODE_ENV !== "production" && (Ue["data-mui-internal-clone-element"] = !0, E.useEffect(() => {
    ke && !ke.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ke]));
  const fr = {};
  G || (Ue.onTouchStart = Xl, Ue.onTouchEnd = Yl), B || (Ue.onMouseOver = sn(va, Ue.onMouseOver), Ue.onMouseLeave = sn(ya, Ue.onMouseLeave), it || (fr.onMouseOver = va, fr.onMouseLeave = ya)), A || (Ue.onFocus = sn(ga, Ue.onFocus), Ue.onBlur = sn(ha, Ue.onBlur), it || (fr.onFocus = ga, fr.onBlur = ha)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const Jl = E.useMemo(() => {
    var ne;
    let Le = [{
      name: "arrow",
      enabled: !!_e,
      options: {
        element: _e,
        padding: 4
      }
    }];
    return (ne = J.popperOptions) != null && ne.modifiers && (Le = Le.concat(J.popperOptions.modifiers)), P({}, J.popperOptions, {
      modifiers: Le
    });
  }, [_e, J]), mr = P({}, T, {
    isRtl: $e,
    arrow: S,
    disableInteractive: it,
    placement: q,
    PopperComponentProp: Z,
    touch: je.current
  }), Yn = cg(mr), wa = (n = (o = ee.popper) != null ? o : R.Popper) != null ? n : pg, xa = (a = (i = (l = ee.transition) != null ? l : R.Transition) != null ? i : V) != null ? a : $o, ka = (c = (u = ee.tooltip) != null ? u : R.Tooltip) != null ? c : dg, Ea = (m = (v = ee.arrow) != null ? v : R.Arrow) != null ? m : ug, Zl = Nr(wa, P({}, J, (b = Q.popper) != null ? b : _.popper, {
    className: Oe(Yn.popper, J == null ? void 0 : J.className, (d = (h = Q.popper) != null ? h : _.popper) == null ? void 0 : d.className)
  }), mr), Ql = Nr(xa, P({}, re, (f = Q.transition) != null ? f : _.transition), mr), ec = Nr(ka, P({}, (g = Q.tooltip) != null ? g : _.tooltip, {
    className: Oe(Yn.tooltip, (w = (O = Q.tooltip) != null ? O : _.tooltip) == null ? void 0 : w.className)
  }), mr), tc = Nr(Ea, P({}, (x = Q.arrow) != null ? x : _.arrow, {
    className: Oe(Yn.arrow, (k = (y = Q.arrow) != null ? y : _.arrow) == null ? void 0 : k.className)
  }), mr);
  return /* @__PURE__ */ $(E.Fragment, {
    children: [/* @__PURE__ */ E.cloneElement(se, Ue), /* @__PURE__ */ p(wa, P({
      as: Z ?? pl,
      placement: q,
      anchorEl: F ? {
        getBoundingClientRect: () => ({
          top: yr.y,
          left: yr.x,
          right: yr.x,
          bottom: yr.y,
          width: 0,
          height: 0
        })
      } : ke,
      popperRef: Wn,
      open: ke ? st : !1,
      id: Hn,
      transition: !0
    }, fr, Zl, {
      popperOptions: Jl,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ p(xa, P({
        timeout: Te.transitions.duration.shorter
      }, ne, Ql, {
        children: /* @__PURE__ */ $(ka, P({}, ec, {
          children: [ie, S ? /* @__PURE__ */ p(Ea, P({}, tc, {
            ref: at
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (dl.propTypes = {
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
  children: Hr.isRequired,
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
const fg = dl;
function xi(e, t, r) {
  return e ? /* @__PURE__ */ p(Fi, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ p("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ul(e) {
  const {
    onClick: t,
    label: r,
    tooltip: n,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: u = !1,
    isDense: m = !0,
    isSubMenuParent: v = !1,
    hasDisabledGutters: b = !1,
    hasDivider: d = !1,
    focusVisibleClassName: h,
    id: f,
    children: g
  } = e, w = /* @__PURE__ */ p(
    zc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: m,
      disableGutters: b,
      divider: d,
      focusVisibleClassName: h,
      onClick: t,
      id: f,
      children: r ? /* @__PURE__ */ $(Et, { children: [
        xi(a, r, !0),
        /* @__PURE__ */ p(Uc, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ p(Fi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ p(Hs, {}) }) : xi(i, r, !1)
      ] }) : g
    }
  );
  return n ? /* @__PURE__ */ p(fg, { title: n, placement: "right", children: /* @__PURE__ */ p("div", { children: w }) }) : w;
}
function fl(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function mg(e) {
  const [t, r] = he(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (u) => {
    r(u.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let u = fl(a).filter((m) => "menuItem" in m.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (m) => "menuItem" in m.group && m.group.menuItem === n.id
    ), /* @__PURE__ */ p(sa, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ p(ul, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ p(
      Hc,
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
      n.id
    )
  ] });
}
const hg = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function sa(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = pt(() => {
    const m = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      fl(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(m).sort(
      (h, f) => (h.group.order || 0) - (f.group.order || 0)
    ), b = [];
    v.forEach((h) => {
      hg(h.id, t.items).forEach(
        (f) => b.push({ item: f, isLastItemInGroup: !1 })
      ), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !0);
    }), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !1);
    const d = b.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: b, allowForLeadingIcons: d };
  }, [o, t]), l = ({ item: m, isLastItemInGroup: v }) => ({
    className: "papi-menu-item",
    label: m.label,
    tooltip: m.tooltip,
    iconPathBefore: "iconPathBefore" in m ? m.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in m ? m.iconPathAfter : void 0,
    hasDivider: v,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ p("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ p("div", { role: "menu", "aria-label": u, children: a.map((m, v) => {
    const { item: b } = m, d = l(m);
    if ("command" in b) {
      const h = b.group + v;
      return /* @__PURE__ */ p(
        ul,
        {
          onClick: (f) => {
            r == null || r(f), n(b);
          },
          ...d
        },
        h
      );
    }
    return /* @__PURE__ */ p(
      mg,
      {
        parentMenuItem: b,
        parentItemProps: d,
        ...e
      },
      u + b.id
    );
  }) }, u);
}
function gg(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ p(sa, { ...e, includedGroups: a });
}
function bg({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ $(
    zi,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ p("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ p(Gc, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ p(
          gg,
          {
            commandHandler: e,
            menuDefinition: t,
            columnId: r,
            onClick: o
          }
        ) })
      ]
    }
  );
}
function vg({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = pt(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, u = o[c];
      typeof u == "object" && typeof u.order == "number" && !Number.isNaN(u.order) ? i.set(u.order, { id: c, metadata: u }) : console.warn(
        `Property ${l} (${typeof u}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, n]);
  return /* @__PURE__ */ p(
    zi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, l) => /* @__PURE__ */ p(
        bg,
        {
          commandHandler: e,
          menuDefinition: r,
          ...i,
          className: t
        },
        l
      ))
    }
  );
}
const ml = /* @__PURE__ */ E.createContext({});
process.env.NODE_ENV !== "production" && (ml.displayName = "ListContext");
const yg = ml;
function wg(e) {
  return ot("MuiList", e);
}
Nt("MuiList", ["root", "padding", "dense", "subheader"]);
const xg = ["children", "className", "component", "dense", "disablePadding", "subheader"], kg = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return mt({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, wg, t);
}, Eg = Pe("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.disablePadding && t.padding, r.dense && t.dense, r.subheader && t.subheader];
  }
})(({
  ownerState: e
}) => P({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), hl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const n = ht({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = n, m = ge(n, xg), v = E.useMemo(() => ({
    dense: l
  }), [l]), b = P({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), d = kg(b);
  return /* @__PURE__ */ p(yg.Provider, {
    value: v,
    children: /* @__PURE__ */ $(Eg, P({
      as: i,
      className: Oe(d.root, a),
      ref: r,
      ownerState: b
    }, m, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (hl.propTypes = {
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
const Ng = hl, Tg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function po(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function ki(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function gl(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function wr(e, t, r, n, o, a) {
  let i = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !gl(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const bl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: i,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: u = !1,
    onKeyDown: m,
    variant: v = "selectedMenu"
  } = t, b = ge(t, Tg), d = E.useRef(null), h = E.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  jt(() => {
    o && d.current.focus();
  }, [o]), E.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (x, k) => {
      const y = !d.current.style.width;
      if (x.clientHeight < d.current.clientHeight && y) {
        const T = `${Ps(Re(x))}px`;
        d.current.style[k.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, d.current.style.width = `calc(100% + ${T})`;
      }
      return d.current;
    }
  }), []);
  const f = (x) => {
    const k = d.current, y = x.key, T = Re(k).activeElement;
    if (y === "ArrowDown")
      x.preventDefault(), wr(k, T, u, c, po);
    else if (y === "ArrowUp")
      x.preventDefault(), wr(k, T, u, c, ki);
    else if (y === "Home")
      x.preventDefault(), wr(k, null, u, c, po);
    else if (y === "End")
      x.preventDefault(), wr(k, null, u, c, ki);
    else if (y.length === 1) {
      const S = h.current, I = y.toLowerCase(), R = performance.now();
      S.keys.length > 0 && (R - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && I !== S.keys[0] && (S.repeating = !1)), S.lastTime = R, S.keys.push(I);
      const _ = T && !S.repeating && gl(T, S);
      S.previousKeyMatched && (_ || wr(k, T, !1, c, po, S)) ? x.preventDefault() : S.previousKeyMatched = !1;
    }
    m && m(x);
  }, g = We(d, r);
  let w = -1;
  E.Children.forEach(i, (x, k) => {
    if (!/* @__PURE__ */ E.isValidElement(x)) {
      w === k && (w += 1, w >= i.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && mn.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (v === "selectedMenu" && x.props.selected || w === -1) && (w = k), w === k && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= i.length && (w = -1));
  });
  const O = E.Children.map(i, (x, k) => {
    if (k === w) {
      const y = {};
      return a && (y.autoFocus = !0), x.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ E.cloneElement(x, y);
    }
    return x;
  });
  return /* @__PURE__ */ p(Ng, P({
    role: "menu",
    ref: g,
    className: l,
    onKeyDown: f,
    tabIndex: o ? 0 : -1
  }, b, {
    children: O
  }));
});
process.env.NODE_ENV !== "production" && (bl.propTypes = {
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
const Sg = bl, Cg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Og = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, vl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const n = Kr(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: i = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: m,
    onEntered: v,
    onEntering: b,
    onExit: d,
    onExited: h,
    onExiting: f,
    style: g,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: O = sl
  } = t, x = ge(t, Cg), k = E.useRef(null), y = We(k, l.ref, r), T = (z) => (G) => {
    if (z) {
      const j = k.current;
      G === void 0 ? z(j) : z(j, G);
    }
  }, S = T(b), I = T((z, G) => {
    ll(z);
    const j = xn({
      style: g,
      timeout: w,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", j), z.style.transition = n.transitions.create("opacity", j), m && m(z, G);
  }), R = T(v), _ = T(f), N = T((z) => {
    const G = xn({
      style: g,
      timeout: w,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", G), z.style.transition = n.transitions.create("opacity", G), d && d(z);
  }), A = T(h);
  return /* @__PURE__ */ p(O, P({
    appear: i,
    in: u,
    nodeRef: k,
    onEnter: I,
    onEntered: R,
    onEntering: S,
    onExit: N,
    onExited: A,
    onExiting: _,
    addEndListener: (z) => {
      a && a(k.current, z);
    },
    timeout: w
  }, x, {
    children: (z, G) => /* @__PURE__ */ E.cloneElement(l, P({
      style: P({
        opacity: 0,
        visibility: z === "exited" && !u ? "hidden" : void 0
      }, Og[z], g, l.props.style),
      ref: y
    }, G))
  }));
});
process.env.NODE_ENV !== "production" && (vl.propTypes = {
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
  children: Hr.isRequired,
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
const Rg = vl;
function Pg(e) {
  return ot("MuiBackdrop", e);
}
Nt("MuiBackdrop", ["root", "invisible"]);
const $g = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], _g = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return mt({
    root: ["root", r && "invisible"]
  }, Pg, t);
}, Ig = Pe("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.invisible && t.invisible];
  }
})(({
  ownerState: e
}) => P({
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
})), yl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n, o, a;
  const i = ht({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: m = {},
    componentsProps: v = {},
    invisible: b = !1,
    open: d,
    slotProps: h = {},
    slots: f = {},
    TransitionComponent: g = Rg,
    transitionDuration: w
  } = i, O = ge(i, $g), x = P({}, i, {
    component: u,
    invisible: b
  }), k = _g(x), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ p(g, P({
    in: d,
    timeout: w
  }, O, {
    children: /* @__PURE__ */ p(Ig, P({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = f.root) != null ? a : m.Root) != null ? o : u,
      className: Oe(k.root, c, y == null ? void 0 : y.className),
      ownerState: P({}, x, y == null ? void 0 : y.ownerState),
      classes: k,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (yl.propTypes = {
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
const Mg = yl;
function Ag(e) {
  return ot("MuiModal", e);
}
Nt("MuiModal", ["root", "hidden", "backdrop"]);
const Dg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Bg = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return mt({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, Ag, n);
}, jg = Pe("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, !r.open && r.exited && t.hidden];
  }
})(({
  theme: e,
  ownerState: t
}) => P({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Lg = Pe(Mg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), wl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const u = ht({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: m = Lg,
    BackdropProps: v,
    className: b,
    closeAfterTransition: d = !1,
    children: h,
    container: f,
    component: g,
    components: w = {},
    componentsProps: O = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: k = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: T = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: I = !1,
    hideBackdrop: R = !1,
    keepMounted: _ = !1,
    onBackdropClick: N,
    open: A,
    slotProps: B,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = u, G = ge(u, Dg), j = P({}, u, {
    closeAfterTransition: d,
    disableAutoFocus: x,
    disableEnforceFocus: k,
    disableEscapeKeyDown: y,
    disablePortal: T,
    disableRestoreFocus: S,
    disableScrollLock: I,
    hideBackdrop: R,
    keepMounted: _
  }), {
    getRootProps: W,
    getBackdropProps: te,
    getTransitionProps: F,
    portalRef: C,
    isTopModal: L,
    exited: X,
    hasTransition: Y
  } = Dm(P({}, j, {
    rootRef: r
  })), H = P({}, j, {
    exited: X
  }), K = Bg(H), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), Y) {
    const {
      onEnter: re,
      onExited: D
    } = F();
    q.onEnter = re, q.onExited = D;
  }
  const Z = (n = (o = z == null ? void 0 : z.root) != null ? o : w.Root) != null ? n : jg, J = (a = (i = z == null ? void 0 : z.backdrop) != null ? i : w.Backdrop) != null ? a : m, Q = (l = B == null ? void 0 : B.root) != null ? l : O.root, ee = (c = B == null ? void 0 : B.backdrop) != null ? c : O.backdrop, ie = Vt({
    elementType: Z,
    externalSlotProps: Q,
    externalForwardedProps: G,
    getSlotProps: W,
    additionalProps: {
      ref: r,
      as: g
    },
    ownerState: H,
    className: Oe(b, Q == null ? void 0 : Q.className, K == null ? void 0 : K.root, !H.open && H.exited && (K == null ? void 0 : K.hidden))
  }), V = Vt({
    elementType: J,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (re) => te(P({}, re, {
      onClick: (D) => {
        N && N(D), re != null && re.onClick && re.onClick(D);
      }
    })),
    className: Oe(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, K == null ? void 0 : K.backdrop),
    ownerState: H
  });
  return !_ && !A && (!Y || X) ? null : /* @__PURE__ */ p(Lr, {
    ref: C,
    container: f,
    disablePortal: T,
    children: /* @__PURE__ */ $(Z, P({}, ie, {
      children: [!R && m ? /* @__PURE__ */ p(J, P({}, V)) : null, /* @__PURE__ */ p(vn, {
        disableEnforceFocus: k,
        disableAutoFocus: x,
        disableRestoreFocus: S,
        isEnabled: L,
        open: A,
        children: /* @__PURE__ */ E.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (wl.propTypes = {
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
  children: Hr.isRequired,
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
  container: s.oneOfType([dt, s.func]),
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
const Vg = wl;
function Fg(e) {
  return ot("MuiPaper", e);
}
Nt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const zg = ["className", "component", "elevation", "square", "variant"], Ug = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return mt(a, Fg, o);
}, Hg = Pe("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, t[r.variant], !r.square && t.rounded, r.variant === "elevation" && t[`elevation${r.elevation}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r;
  return P({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && P({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${bn("#fff", yi(t.elevation))}, ${bn("#fff", yi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), xl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  const n = ht({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, u = ge(n, zg), m = P({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = Ug(m);
  return process.env.NODE_ENV !== "production" && Kr().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ p(Hg, P({
    as: a,
    ownerState: m,
    className: Oe(v.root, o),
    ref: r
  }, u));
});
process.env.NODE_ENV !== "production" && (xl.propTypes = {
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
  elevation: cr(Is, (e) => {
    const {
      elevation: t,
      variant: r
    } = e;
    return t > 0 && r === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${r}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
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
const Gg = xl;
function Wg(e) {
  return ot("MuiPopover", e);
}
Nt("MuiPopover", ["root", "paper"]);
const Xg = ["onEntering"], Yg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], qg = ["slotProps"];
function Ei(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function Ni(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function Ti(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function un(e) {
  return typeof e == "function" ? e() : e;
}
const Kg = (e) => {
  const {
    classes: t
  } = e;
  return mt({
    root: ["root"],
    paper: ["paper"]
  }, Wg, t);
}, Jg = Pe(Vg, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), kl = Pe(Gg, {
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
}), El = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n, o, a;
  const i = ht({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: m,
    anchorReference: v = "anchorEl",
    children: b,
    className: d,
    container: h,
    elevation: f = 8,
    marginThreshold: g = 16,
    open: w,
    PaperProps: O = {},
    slots: x,
    slotProps: k,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = $o,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: R = !1
  } = i, _ = ge(i.TransitionProps, Xg), N = ge(i, Yg), A = (n = k == null ? void 0 : k.paper) != null ? n : O, B = E.useRef(), z = We(B, A.ref), G = P({}, i, {
    anchorOrigin: u,
    anchorReference: v,
    elevation: f,
    marginThreshold: g,
    externalPaperSlotProps: A,
    transformOrigin: y,
    TransitionComponent: T,
    transitionDuration: S,
    TransitionProps: _
  }), j = Kg(G), W = E.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (m || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), m;
    const re = un(c), D = re && re.nodeType === 1 ? re : Re(B.current).body, se = D.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + Ei(se, u.vertical),
      left: se.left + Ni(se, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, m, v]), te = E.useCallback((re) => ({
    vertical: Ei(re, y.vertical),
    horizontal: Ni(re, y.horizontal)
  }), [y.horizontal, y.vertical]), F = E.useCallback((re) => {
    const D = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, se = te(D);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ti(se)
      };
    const Te = W();
    let $e = Te.top - se.vertical, ke = Te.left - se.horizontal;
    const Ct = $e + D.height, _e = ke + D.width, at = nr(un(c)), je = at.innerHeight - g, it = at.innerWidth - g;
    if (g !== null && $e < g) {
      const Se = $e - g;
      $e -= Se, se.vertical += Se;
    } else if (g !== null && Ct > je) {
      const Se = Ct - je;
      $e -= Se, se.vertical += Se;
    }
    if (process.env.NODE_ENV !== "production" && D.height > je && D.height && je && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${D.height - je}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), g !== null && ke < g) {
      const Se = ke - g;
      ke -= Se, se.horizontal += Se;
    } else if (_e > it) {
      const Se = _e - it;
      ke -= Se, se.horizontal += Se;
    }
    return {
      top: `${Math.round($e)}px`,
      left: `${Math.round(ke)}px`,
      transformOrigin: Ti(se)
    };
  }, [c, v, W, te, g]), [C, L] = E.useState(w), X = E.useCallback(() => {
    const re = B.current;
    if (!re)
      return;
    const D = F(re);
    D.top !== null && (re.style.top = D.top), D.left !== null && (re.style.left = D.left), re.style.transformOrigin = D.transformOrigin, L(!0);
  }, [F]);
  E.useEffect(() => (R && window.addEventListener("scroll", X), () => window.removeEventListener("scroll", X)), [c, R, X]);
  const Y = (re, D) => {
    I && I(re, D), X();
  }, H = () => {
    L(!1);
  };
  E.useEffect(() => {
    w && X();
  }), E.useImperativeHandle(l, () => w ? {
    updatePosition: () => {
      X();
    }
  } : null, [w, X]), E.useEffect(() => {
    if (!w)
      return;
    const re = Ss(() => {
      X();
    }), D = nr(c);
    return D.addEventListener("resize", re), () => {
      re.clear(), D.removeEventListener("resize", re);
    };
  }, [c, w, X]);
  let K = S;
  S === "auto" && !T.muiSupportAuto && (K = void 0);
  const q = h || (c ? Re(un(c)).body : void 0), Z = (o = x == null ? void 0 : x.root) != null ? o : Jg, J = (a = x == null ? void 0 : x.paper) != null ? a : kl, Q = Vt({
    elementType: J,
    externalSlotProps: P({}, A, {
      style: C ? A.style : P({}, A.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: f,
      ref: z
    },
    ownerState: G,
    className: Oe(j.paper, A == null ? void 0 : A.className)
  }), ee = Vt({
    elementType: Z,
    externalSlotProps: (k == null ? void 0 : k.root) || {},
    externalForwardedProps: N,
    additionalProps: {
      ref: r,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: w
    },
    ownerState: G,
    className: Oe(j.root, d)
  }), {
    slotProps: ie
  } = ee, V = ge(ee, qg);
  return /* @__PURE__ */ p(Z, P({}, V, !Gs(Z) && {
    slotProps: ie,
    disableScrollLock: R
  }, {
    children: /* @__PURE__ */ p(T, P({
      appear: !0,
      in: w,
      onEntering: Y,
      onExited: H,
      timeout: K
    }, _, {
      children: /* @__PURE__ */ p(J, P({}, Q, {
        children: b
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (El.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Uo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: cr(s.oneOfType([dt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = un(e.anchorEl);
      if (t && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
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
  container: s.oneOfType([dt, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Is,
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
    component: Cd
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
const Zg = El;
function Qg(e) {
  return ot("MuiMenu", e);
}
Nt("MuiMenu", ["root", "paper", "list"]);
const eb = ["onEntering"], tb = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], rb = {
  vertical: "top",
  horizontal: "right"
}, nb = {
  vertical: "top",
  horizontal: "left"
}, ob = (e) => {
  const {
    classes: t
  } = e;
  return mt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Qg, t);
}, ab = Pe(Zg, {
  shouldForwardProp: (e) => zs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ib = Pe(kl, {
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
}), sb = Pe(Sg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Nl = /* @__PURE__ */ E.forwardRef(function(t, r) {
  var n, o;
  const a = ht({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: m = {},
    onClose: v,
    open: b,
    PaperProps: d = {},
    PopoverClasses: h,
    transitionDuration: f = "auto",
    TransitionProps: {
      onEntering: g
    } = {},
    variant: w = "selectedMenu",
    slots: O = {},
    slotProps: x = {}
  } = a, k = ge(a.TransitionProps, eb), y = ge(a, tb), T = Kr(), S = T.direction === "rtl", I = P({}, a, {
    autoFocus: i,
    disableAutoFocusItem: u,
    MenuListProps: m,
    onEntering: g,
    PaperProps: d,
    transitionDuration: f,
    TransitionProps: k,
    variant: w
  }), R = ob(I), _ = i && !u && b, N = E.useRef(null), A = (F, C) => {
    N.current && N.current.adjustStyleForScrollbar(F, T), g && g(F, C);
  }, B = (F) => {
    F.key === "Tab" && (F.preventDefault(), v && v(F, "tabKeyDown"));
  };
  let z = -1;
  E.Children.map(l, (F, C) => {
    /* @__PURE__ */ E.isValidElement(F) && (process.env.NODE_ENV !== "production" && mn.isFragment(F) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), F.props.disabled || (w === "selectedMenu" && F.props.selected || z === -1) && (z = C));
  });
  const G = (n = O.paper) != null ? n : ib, j = (o = x.paper) != null ? o : d, W = Vt({
    elementType: O.root,
    externalSlotProps: x.root,
    ownerState: I,
    className: [R.root, c]
  }), te = Vt({
    elementType: G,
    externalSlotProps: j,
    ownerState: I,
    className: R.paper
  });
  return /* @__PURE__ */ p(ab, P({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? rb : nb,
    slots: {
      paper: G,
      root: O.root
    },
    slotProps: {
      root: W,
      paper: te
    },
    open: b,
    ref: r,
    transitionDuration: f,
    TransitionProps: P({
      onEntering: A
    }, k),
    ownerState: I
  }, y, {
    classes: h,
    children: /* @__PURE__ */ p(sb, P({
      onKeyDown: B,
      actions: N,
      autoFocus: i && (z === -1 || u),
      autoFocusItem: _,
      variant: w
    }, m, {
      className: Oe(R.list, m.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Nl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([dt, s.func]),
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
const lb = Nl;
function b0({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var u;
  const [o, a] = U.useState(void 0), i = Ce(
    (m) => {
      m.preventDefault(), a(
        o === void 0 ? {
          mouseX: m.clientX + 2,
          mouseY: m.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = Ce(() => {
    a(void 0);
  }, []), c = pt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = r == null ? void 0 : r.items) == null ? void 0 : u.length) ?? 0) === 0 || !n ? n : /* @__PURE__ */ $(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        n,
        /* @__PURE__ */ p(
          lb,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ p(
              sa,
              {
                menuDefinition: r,
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
function cb(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const _o = (e, t, r = {}) => {
  const n = At(t);
  n.current = t;
  const o = At(r);
  o.current = cb(o.current);
  const [a, i] = he(() => n.current), [l, c] = he(!0);
  return et(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const m = await e();
        u && (i(() => m), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || i(() => n.current);
    };
  }, [e]), [a, l];
}, pb = Us(/* @__PURE__ */ p("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function db({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, u] = he(!1), [m, v] = he(!1), b = Ce(() => {
    c && u(!1), v(!1);
  }, [c]), d = Ce((k) => {
    k.stopPropagation(), u((y) => {
      const T = !y;
      return T && k.shiftKey ? v(!0) : T || v(!1), T;
    });
  }, []), h = Ce(
    (k) => (b(), n(k)),
    [n, b]
  ), [f, g] = he({ top: 1, left: 1 });
  et(() => {
    if (c) {
      const k = o == null ? void 0 : o.current;
      if (k) {
        const y = k.getBoundingClientRect(), T = window.scrollY, S = window.scrollX, I = y.top + T + k.clientHeight, R = y.left + S;
        g({ top: I, left: R });
      }
    }
  }, [c, o]);
  const [w] = _o(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [O] = _o(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? r ?? w, [e, r, w, c]),
    r ?? w
  ), x = m && O ? O : w;
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ p(
      Ui,
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
        children: l ?? /* @__PURE__ */ p(pb, {})
      }
    ),
    /* @__PURE__ */ p(
      Wc,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: b,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: f.top,
            left: f.left
          }
        },
        children: x ? /* @__PURE__ */ p(
          vg,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: x
          }
        ) : void 0
      }
    )
  ] });
}
function v0({
  id: e,
  label: t,
  isDisabled: r = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: u
}) {
  return /* @__PURE__ */ p(
    Ui,
    {
      id: e,
      disabled: r,
      edge: a,
      size: i,
      "aria-label": t,
      title: o ? void 0 : n ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: u
    }
  );
}
function y0({
  id: e,
  isDisabled: t = !1,
  orientation: r = "horizontal",
  min: n = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: u = "off",
  className: m,
  onChange: v,
  onChangeCommitted: b
}) {
  return /* @__PURE__ */ p(
    Xc,
    {
      id: e,
      disabled: t,
      orientation: r,
      min: n,
      max: o,
      step: a,
      marks: i,
      defaultValue: l,
      value: c,
      valueLabelDisplay: u,
      className: `papi-slider ${r} ${m ?? ""}`,
      onChange: v,
      onChangeCommitted: b
    }
  );
}
function w0({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: r = !1,
  className: n,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: i,
  children: l
}) {
  const c = {
    action: (i == null ? void 0 : i.action) || l,
    message: i == null ? void 0 : i.message,
    className: n
  };
  return /* @__PURE__ */ p(
    Yc,
    {
      autoHideDuration: e ?? void 0,
      open: r,
      onClose: o,
      anchorOrigin: a,
      id: t,
      ContentProps: c
    }
  );
}
const Jr = kn(({ className: e, ...t }, r) => /* @__PURE__ */ p(Ec, { size: 35, className: M("pr-animate-spin", e), ...t, ref: r }));
Jr.displayName = "Spinner";
function x0({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ p(
    qc,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function k0({
  id: e,
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: u,
  value: m,
  onChange: v,
  onFocus: b,
  onBlur: d
}) {
  return /* @__PURE__ */ $("div", { className: M("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ p(
      Ze,
      {
        htmlFor: e,
        className: M({
          "pr-text-red-600": r,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ p(
      zr,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: M(c, { "pr-border-red-600": r }),
        defaultValue: u,
        value: m,
        onChange: v,
        onFocus: b,
        onBlur: d
      }
    ),
    /* @__PURE__ */ p("p", { className: M({ "pr-hidden": !o }), children: o })
  ] });
}
function E0({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = At(void 0);
  return /* @__PURE__ */ p("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ p(Kc, { position: "static", id: n, children: /* @__PURE__ */ $(
    Jc,
    {
      className: M("pr-bg-muted pr-text-muted-foreground", r),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ p(
          db,
          {
            commandHandler: t,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ p("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const ub = Tn(
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
), fb = U.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ p("div", { ref: n, role: "alert", className: M(ub({ variant: t }), e), ...r }));
fb.displayName = "Alert";
const mb = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ $(
    "h5",
    {
      ref: r,
      className: M("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
mb.displayName = "AlertTitle";
const hb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { ref: r, className: M("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
hb.displayName = "AlertDescription";
const gb = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      className: M(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
gb.displayName = "Card";
const bb = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      className: M("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
bb.displayName = "CardHeader";
const vb = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "h3",
    {
      ref: r,
      className: M("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
vb.displayName = "CardTitle";
const yb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("p", { ref: r, className: M("pr-text-sm pr-text-muted-foreground", e), ...t }));
yb.displayName = "CardDescription";
const wb = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { ref: r, className: M("pr-p-6 pr-pt-0", e), ...t })
);
wb.displayName = "CardContent";
const xb = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { ref: r, className: M("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
xb.displayName = "CardFooter";
function N0({ ...e }) {
  return /* @__PURE__ */ p(
    rp,
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
const kb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ $(
  kr.Root,
  {
    ref: r,
    className: M(
      "pr-twp pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ p(kr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ p(kr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ p(kr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
kb.displayName = kr.Root.displayName;
const Eb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  yo.Root,
  {
    className: M(
      "pr-peer pr-twp pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ p(
      yo.Thumb,
      {
        className: M(
          "pr-twp pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Eb.displayName = yo.Root.displayName;
const T0 = Be.Root, Nb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.List,
  {
    ref: r,
    className: M(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Nb.displayName = Be.List.displayName;
const Tb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.Trigger,
  {
    ref: r,
    className: M(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Tb.displayName = Be.Trigger.displayName;
const Sb = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Be.Content,
  {
    ref: r,
    className: M(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Sb.displayName = Be.Content.displayName;
function S0({
  isInstalling: e,
  handleClick: t,
  buttonText: r,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ p(
    Ne,
    {
      className: M(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600 hover:pr-text-white": !r,
          "pr-w-20": r
        },
        n
      ),
      onClick: t,
      ...o,
      children: e ? /* @__PURE__ */ p(Jr, { size: 15 }) : /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ p(Nc, { size: 25, className: M("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function C0({
  isEnabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    Ne,
    {
      className: M(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ p(Jr, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function O0({
  isDisabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    Ne,
    {
      className: M(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ p(Jr, { size: 15, className: "pr-mr-1 pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function R0({
  isUpdating: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    Ne,
    {
      className: M(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ p(Jr, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Mt() {
  return Mt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Mt.apply(this, arguments);
}
const Cb = ["children", "options"], Si = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), Ci = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Ob = ["style", "script"], Rb = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Pb = /mailto:/i, $b = /\n{2,}$/, Tl = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, _b = /^ *> ?/gm, Ib = /^ {2,}\n/, Mb = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Sl = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Cl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Ab = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Db = /^(?:\n *)*\n/, Bb = /\r\n?/g, jb = /^\[\^([^\]]+)](:.*)\n/, Lb = /^\[\^([^\]]+)]/, Vb = /\f/g, Fb = /^\s*?\[(x|\s)\]/, Ol = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Rl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Pl = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, Io = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, zb = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, $l = /^<!--[\s\S]*?(?:-->)/, Ub = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, Mo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Hb = /^\{.*\}$/, Gb = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Wb = /^<([^ >]+@[^ >]+)>/, Xb = /^<([^ >]+:\/[^ >]+)>/, Yb = /-([a-z])?/gi, _l = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, qb = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, Kb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, Jb = /^\[([^\]]*)\] ?\[([^\]]*)\]/, Zb = /(\[|\])/g, Qb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, ev = /\t/g, tv = /^ *\| */, rv = /(^ *\||\| *$)/g, nv = / *$/, ov = /^ *:-+: *$/, av = /^ *:-+ *$/, iv = /^ *-+: *$/, sv = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, lv = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, cv = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, pv = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, dv = /^\\([^0-9A-Za-z\s])/, uv = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, fv = /^\n+/, mv = /^([ \t]*)/, hv = /\\([^\\])/g, Oi = / *\n+$/, gv = /(?:^|\n)( *)$/, la = "(?:\\d+\\.)", ca = "(?:[*+-])";
function Il(e) {
  return "( *)(" + (e === 1 ? la : ca) + ") +";
}
const Ml = Il(1), Al = Il(2);
function Dl(e) {
  return new RegExp("^" + (e === 1 ? Ml : Al));
}
const bv = Dl(1), vv = Dl(2);
function Bl(e) {
  return new RegExp("^" + (e === 1 ? Ml : Al) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? la : ca) + " )[^\\n]*)*(\\n|$)", "gm");
}
const jl = Bl(1), Ll = Bl(2);
function Vl(e) {
  const t = e === 1 ? la : ca;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Fl = Vl(1), zl = Vl(2);
function Ri(e, t) {
  const r = t === 1, n = r ? Fl : zl, o = r ? jl : Ll, a = r ? bv : vv;
  return { t(i, l, c) {
    const u = gv.exec(c);
    return u && (l.o || !l._ && !l.u) ? n.exec(i = u[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const u = r ? +i[2] : void 0, m = i[0].replace($b, `
`).match(o);
    let v = !1;
    return { p: m.map(function(b, d) {
      const h = a.exec(b)[0].length, f = new RegExp("^ {1," + h + "}", "gm"), g = b.replace(f, "").replace(a, ""), w = d === m.length - 1, O = g.indexOf(`

`) !== -1 || w && v;
      v = O;
      const x = c._, k = c.o;
      let y;
      c.o = !0, O ? (c._ = !1, y = g.replace(Oi, `

`)) : (c._ = !0, y = g.replace(Oi, ""));
      const T = l(y, c);
      return c._ = x, c.o = k, T;
    }), m: r, g: u };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(u, m) {
    return e("li", { key: m }, l(u, c));
  })) };
}
const yv = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, wv = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Ul = [Tl, Sl, Cl, Ol, Pl, Rl, $l, _l, jl, Fl, Ll, zl], xv = [...Ul, /^[^\n]+(?:  \n|\n{2,})/, Io, Mo];
function kv(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Ev(e) {
  return iv.test(e) ? "right" : ov.test(e) ? "center" : av.test(e) ? "left" : null;
}
function Pi(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(nv, "")), a[a.length - 1].push(i));
  }), a;
}
function Nv(e, t, r) {
  r._ = !0;
  const n = Pi(e[1], t, r), o = e[2].replace(rv, "").split("|").map(Ev), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(u) {
      return Pi(u, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: a, L: n, type: "table" };
}
function $i(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function vt(e) {
  return function(t, r) {
    return r._ ? e.exec(t) : null;
  };
}
function yt(e) {
  return function(t, r) {
    return r._ || r.u ? e.exec(t) : null;
  };
}
function lt(e) {
  return function(t, r) {
    return r._ || r.u ? null : e.exec(t);
  };
}
function xr(e) {
  return function(t) {
    return e.exec(t);
  };
}
function Tv(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !Ul.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function qt(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function _i(e) {
  return e.replace(hv, "$1");
}
function fn(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Sv(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Cv(e, t, r) {
  return r._ = !1, e(t, r);
}
const uo = (e, t, r) => ({ v: fn(t, e[1], r) });
function fo() {
  return {};
}
function mo() {
  return null;
}
function Ov(...e) {
  return e.filter(Boolean).join(" ");
}
function ho(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var ae;
function Rv(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || kv, t.namedCodesToUnicode = t.namedCodesToUnicode ? Mt({}, Ci, t.namedCodesToUnicode) : Ci;
  const r = t.createElement || E.createElement;
  function n(d, h, ...f) {
    const g = ho(t.overrides, `${d}.props`, {});
    return r(function(w, O) {
      const x = ho(O, w);
      return x ? typeof x == "function" || typeof x == "object" && "render" in x ? x : ho(O, `${w}.component`, w) : w;
    }(d, t.overrides), Mt({}, h, g, { className: Ov(h == null ? void 0 : h.className, g.className) || void 0 }), ...f);
  }
  function o(d) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = Qb.test(d) === !1);
    const f = m(u(h ? d : `${d.trimEnd().replace(fv, "")}

`, { _: h }));
    for (; typeof f[f.length - 1] == "string" && !f[f.length - 1].trim(); )
      f.pop();
    if (t.wrapper === null)
      return f;
    const g = t.wrapper || (h ? "span" : "div");
    let w;
    if (f.length > 1 || t.forceWrapper)
      w = f;
    else {
      if (f.length === 1)
        return w = f[0], typeof w == "string" ? n("span", { key: "outer" }, w) : w;
      w = null;
    }
    return E.createElement(g, { key: "outer" }, w);
  }
  function a(d) {
    const h = d.match(Rb);
    return h ? h.reduce(function(f, g, w) {
      const O = g.indexOf("=");
      if (O !== -1) {
        const x = function(S) {
          return S.indexOf("-") !== -1 && S.match(Ub) === null && (S = S.replace(Yb, function(I, R) {
            return R.toUpperCase();
          })), S;
        }(g.slice(0, O)).trim(), k = function(S) {
          const I = S[0];
          return (I === '"' || I === "'") && S.length >= 2 && S[S.length - 1] === I ? S.slice(1, -1) : S;
        }(g.slice(O + 1).trim()), y = Si[x] || x, T = f[y] = function(S, I) {
          return S === "style" ? I.split(/;\s?/).reduce(function(R, _) {
            const N = _.slice(0, _.indexOf(":"));
            return R[N.replace(/(-[a-z])/g, (A) => A[1].toUpperCase())] = _.slice(N.length + 1).trim(), R;
          }, {}) : S === "href" ? qt(I) : (I.match(Hb) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(x, k);
        typeof T == "string" && (Io.test(T) || Mo.test(T)) && (f[y] = E.cloneElement(o(T.trim()), { key: w }));
      } else
        g !== "style" && (f[Si[g] || g] = !0);
      return f;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: lt(Tl), i: ae.HIGH, l: (d, h, f) => ({ v: h(d[0].replace(_b, ""), f) }), h: (d, h, f) => n("blockquote", { key: f.k }, h(d.v, f)) }, breakLine: { t: xr(Ib), i: ae.HIGH, l: fo, h: (d, h, f) => n("br", { key: f.k }) }, breakThematic: { t: lt(Mb), i: ae.HIGH, l: fo, h: (d, h, f) => n("hr", { key: f.k }) }, codeBlock: { t: lt(Cl), i: ae.MAX, l: (d) => ({ v: d[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (d, h, f) => n("pre", { key: f.k }, n("code", Mt({}, d.O, { className: d.M ? `lang-${d.M}` : "" }), d.v)) }, codeFenced: { t: lt(Sl), i: ae.MAX, l: (d) => ({ O: a(d[3] || ""), v: d[4], M: d[2] || void 0, type: "codeBlock" }) }, codeInline: { t: yt(Ab), i: ae.LOW, l: (d) => ({ v: d[2] }), h: (d, h, f) => n("code", { key: f.k }, d.v) }, footnote: { t: lt(jb), i: ae.MAX, l: (d) => (i.push({ I: d[2], j: d[1] }), {}), h: mo }, footnoteReference: { t: vt(Lb), i: ae.HIGH, l: (d) => ({ v: d[1], B: `#${t.slugify(d[1])}` }), h: (d, h, f) => n("a", { key: f.k, href: qt(d.B) }, n("sup", { key: f.k }, d.v)) }, gfmTask: { t: vt(Fb), i: ae.HIGH, l: (d) => ({ R: d[1].toLowerCase() === "x" }), h: (d, h, f) => n("input", { checked: d.R, key: f.k, readOnly: !0, type: "checkbox" }) }, heading: { t: lt(t.enforceAtxHeadings ? Rl : Ol), i: ae.HIGH, l: (d, h, f) => ({ v: fn(h, d[2], f), T: t.slugify(d[2]), C: d[1].length }), h: (d, h, f) => n(`h${d.C}`, { id: d.T, key: f.k }, h(d.v, f)) }, headingSetext: { t: lt(Pl), i: ae.MAX, l: (d, h, f) => ({ v: fn(h, d[1], f), C: d[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: xr($l), i: ae.HIGH, l: () => ({}), h: mo }, image: { t: yt(wv), i: ae.HIGH, l: (d) => ({ D: d[1], B: _i(d[2]), F: d[3] }), h: (d, h, f) => n("img", { key: f.k, alt: d.D || void 0, title: d.F || void 0, src: qt(d.B) }) }, link: { t: vt(yv), i: ae.LOW, l: (d, h, f) => ({ v: Sv(h, d[1], f), B: _i(d[2]), F: d[3] }), h: (d, h, f) => n("a", { key: f.k, href: qt(d.B), title: d.F }, h(d.v, f)) }, linkAngleBraceStyleDetector: { t: vt(Xb), i: ae.MAX, l: (d) => ({ v: [{ v: d[1], type: "text" }], B: d[1], type: "link" }) }, linkBareUrlDetector: { t: (d, h) => h.N ? null : vt(Gb)(d, h), i: ae.MAX, l: (d) => ({ v: [{ v: d[1], type: "text" }], B: d[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: vt(Wb), i: ae.MAX, l(d) {
    let h = d[1], f = d[1];
    return Pb.test(f) || (f = "mailto:" + f), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: f, type: "link" };
  } }, orderedList: Ri(n, 1), unorderedList: Ri(n, 2), newlineCoalescer: { t: lt(Db), i: ae.LOW, l: fo, h: () => `
` }, paragraph: { t: Tv, i: ae.LOW, l: uo, h: (d, h, f) => n("p", { key: f.k }, h(d.v, f)) }, ref: { t: vt(qb), i: ae.MAX, l: (d) => (l[d[1]] = { B: d[2], F: d[4] }, {}), h: mo }, refImage: { t: yt(Kb), i: ae.MAX, l: (d) => ({ D: d[1] || void 0, P: d[2] }), h: (d, h, f) => n("img", { key: f.k, alt: d.D, src: qt(l[d.P].B), title: l[d.P].F }) }, refLink: { t: vt(Jb), i: ae.MAX, l: (d, h, f) => ({ v: h(d[1], f), Z: h(d[0].replace(Zb, "\\$1"), f), P: d[2] }), h: (d, h, f) => l[d.P] ? n("a", { key: f.k, href: qt(l[d.P].B), title: l[d.P].F }, h(d.v, f)) : n("span", { key: f.k }, h(d.Z, f)) }, table: { t: lt(_l), i: ae.HIGH, l: Nv, h: (d, h, f) => n("table", { key: f.k }, n("thead", null, n("tr", null, d.L.map(function(g, w) {
    return n("th", { key: w, style: $i(d, w) }, h(g, f));
  }))), n("tbody", null, d.A.map(function(g, w) {
    return n("tr", { key: w }, g.map(function(O, x) {
      return n("td", { key: x, style: $i(d, x) }, h(O, f));
    }));
  }))) }, tableSeparator: { t: function(d, h) {
    return h.$ ? (h._ = !0, tv.exec(d)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: xr(uv), i: ae.MIN, l: (d) => ({ v: d[0].replace(zb, (h, f) => t.namedCodesToUnicode[f] ? t.namedCodesToUnicode[f] : h) }), h: (d) => d.v }, textBolded: { t: yt(sv), i: ae.MED, l: (d, h, f) => ({ v: h(d[2], f) }), h: (d, h, f) => n("strong", { key: f.k }, h(d.v, f)) }, textEmphasized: { t: yt(lv), i: ae.LOW, l: (d, h, f) => ({ v: h(d[2], f) }), h: (d, h, f) => n("em", { key: f.k }, h(d.v, f)) }, textEscaped: { t: yt(dv), i: ae.HIGH, l: (d) => ({ v: d[1], type: "text" }) }, textMarked: { t: yt(cv), i: ae.LOW, l: uo, h: (d, h, f) => n("mark", { key: f.k }, h(d.v, f)) }, textStrikethroughed: { t: yt(pv), i: ae.LOW, l: uo, h: (d, h, f) => n("del", { key: f.k }, h(d.v, f)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: xr(Io), i: ae.HIGH, l(d, h, f) {
    const [, g] = d[3].match(mv), w = new RegExp(`^${g}`, "gm"), O = d[3].replace(w, ""), x = (k = O, xv.some((I) => I.test(k)) ? Cv : fn);
    var k;
    const y = d[1].toLowerCase(), T = Ob.indexOf(y) !== -1;
    f.N = f.N || y === "a";
    const S = T ? d[3] : x(h, O, f);
    return f.N = !1, { O: a(d[2]), v: S, G: T, H: T ? y : d[1] };
  }, h: (d, h, f) => n(d.H, Mt({ key: f.k }, d.O), d.G ? d.v : h(d.v, f)) }, c.htmlSelfClosing = { t: xr(Mo), i: ae.HIGH, l: (d) => ({ O: a(d[2] || ""), H: d[1] }), h: (d, h, f) => n(d.H, Mt({}, d.O, { key: f.k })) });
  const u = function(d) {
    let h = Object.keys(d);
    function f(g, w) {
      let O = [], x = "";
      for (; g; ) {
        let k = 0;
        for (; k < h.length; ) {
          const y = h[k], T = d[y], S = T.t(g, w, x);
          if (S) {
            const I = S[0];
            g = g.substring(I.length);
            const R = T.l(S, f, w);
            R.type == null && (R.type = y), O.push(R), x = I;
            break;
          }
          k++;
        }
      }
      return O;
    }
    return h.sort(function(g, w) {
      let O = d[g].i, x = d[w].i;
      return O !== x ? O - x : g < w ? -1 : 1;
    }), function(g, w) {
      return f(function(O) {
        return O.replace(Bb, `
`).replace(Vb, "").replace(ev, "    ");
      }(g), w);
    };
  }(c), m = (v = function(d) {
    return function(h, f, g) {
      return d[h.type].h(h, f, g);
    };
  }(c), function d(h, f = {}) {
    if (Array.isArray(h)) {
      const g = f.k, w = [];
      let O = !1;
      for (let x = 0; x < h.length; x++) {
        f.k = x;
        const k = d(h[x], f), y = typeof k == "string";
        y && O ? w[w.length - 1] += k : k !== null && w.push(k), O = y;
      }
      return f.k = g, w;
    }
    return v(h, d, f);
  });
  var v;
  const b = o(e);
  return i.length ? n("div", null, b, n("footer", { key: "footer" }, i.map(function(d) {
    return n("div", { id: t.slugify(d.j), key: d.j }, d.j, m(u(d.I, { _: !0 })));
  }))) : b;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const Pv = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      a.indexOf(i = u[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Cb);
  return E.cloneElement(Rv(t, r), n);
};
function P0({ id: e, markdown: t }) {
  return /* @__PURE__ */ p("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ p(Pv, { children: t }) });
}
const $v = kn((e, t) => /* @__PURE__ */ $(
  Ne,
  {
    ref: t,
    className: "pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ p(Tc, { size: 16, className: "pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ p(
        Nn,
        {
          size: 16,
          className: "pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
        }
      )
    ]
  }
));
var _v = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(_v || {});
function $0({ id: e, groups: t }) {
  return /* @__PURE__ */ p("div", { id: e, children: /* @__PURE__ */ $(jo, { children: [
    /* @__PURE__ */ p(Ki, { asChild: !0, children: /* @__PURE__ */ p($v, {}) }),
    /* @__PURE__ */ p(Cn, { children: t.map((r) => /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ p(Ur, { children: r.label }),
      /* @__PURE__ */ p(bp, { children: r.items.map((n) => /* @__PURE__ */ p("div", { children: n.itemType === 0 ? /* @__PURE__ */ p(Lo, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ p(Zi, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ p(On, {})
    ] }, r.label)) })
  ] }) });
}
function _0({ id: e, message: t }) {
  return /* @__PURE__ */ p("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ p("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ p("p", { className: "pr-text-lg pr-text-gray-800", children: t }) }) });
}
function I0({
  id: e,
  category: t,
  downloads: r,
  languages: n,
  moreInfoUrl: o
}) {
  const a = new Ic("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((l, c) => l + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ $(
    "div",
    {
      id: e,
      className: "pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",
      children: [
        /* @__PURE__ */ $("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: /* @__PURE__ */ p("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: t }) }),
          /* @__PURE__ */ p("span", { className: "pr-text-xs pr-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ p("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ $("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: [
            /* @__PURE__ */ p(Sc, { className: "pr-mr-1 pr-h-4 pr-w-4" }),
            /* @__PURE__ */ p("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ p("span", { className: "pr-text-xs pr-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ p("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ $("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ p("div", { className: "pr-flex pr-items-center", children: n.slice(0, 3).map((l) => /* @__PURE__ */ p(
            "span",
            {
              className: "pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          n.length > 3 && /* @__PURE__ */ $(
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
        /* @__PURE__ */ $("div", { className: "pr-ml-auto pr-flex pr-flex-col pr-space-y-2", children: [
          /* @__PURE__ */ $(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Website",
                /* @__PURE__ */ p(Cc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ $(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Support",
                /* @__PURE__ */ p(Oc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Iv({ id: e, versionHistory: t }) {
  const [r, n] = he(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), u = new Date(o.getTime() - c.getTime()), m = u.getUTCFullYear() - 1970, v = u.getUTCMonth(), b = u.getUTCDate() - 1;
    let d = "";
    return m > 0 ? d = `${m.toString()} year${m === 1 ? "" : "s"} ago` : v > 0 ? d = `${v.toString()} month${v === 1 ? "" : "s"} ago` : b === 0 ? d = "today" : d = `${b.toString()} day${b === 1 ? "" : "s"} ago`, d;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ $("div", { id: e, children: [
    /* @__PURE__ */ p("h3", { className: "pr-text-md pr-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ p("ul", { className: "pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600", children: (r ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ $("div", { className: "pr-mt-3 pr-flex pr-justify-between", children: [
      /* @__PURE__ */ p("div", { className: "pr-text-gray-600", children: /* @__PURE__ */ p("li", { className: "pr-prose pr-text-xs", children: /* @__PURE__ */ p("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ $("div", { className: "pr-justify-end pr-text-right", children: [
        /* @__PURE__ */ $("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ p("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ p(
      "button",
      {
        type: "button",
        onClick: () => n(!r),
        className: "pr-text-xs pr-text-gray-500 pr-underline",
        children: r ? "Show Less Version History" : "Show All Version History"
      }
    )
  ] });
}
function M0({
  id: e,
  publisherDisplayName: t,
  fileSize: r,
  locales: n,
  versionHistory: o
}) {
  const a = pt(() => Mc(r), [r]), l = ((c) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((m) => u.of(m));
  })(n);
  return /* @__PURE__ */ p("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ $("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ p(Iv, { versionHistory: o }),
    /* @__PURE__ */ p("div", { className: "pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300" }),
    /* @__PURE__ */ $("div", { className: "pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3", children: [
      /* @__PURE__ */ p("h2", { className: "pr-text-md pr-font-semibold", children: "Information" }),
      /* @__PURE__ */ $("div", { className: "pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600", children: [
        /* @__PURE__ */ $("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ p("span", { className: "pr-mb-2", children: "Publisher" }),
          /* @__PURE__ */ p("span", { className: "pr-font-semibold", children: t }),
          /* @__PURE__ */ p("span", { className: "pr-mb-2 pr-mt-4", children: "Size" }),
          /* @__PURE__ */ p("span", { className: "pr-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ p("div", { className: "pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600", children: /* @__PURE__ */ $("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ p("span", { className: "pr-mb-2", children: "Languages" }),
          /* @__PURE__ */ p("span", { className: "pr-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const A0 = (e, t) => {
  et(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, go = () => !1, D0 = (e, t) => {
  const [r] = _o(
    Ce(async () => {
      if (!e)
        return go;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    go,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  et(() => () => {
    r !== go && r();
  }, [r]);
};
function Mv(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
Mv(`/*
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

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
.papi-menu-drawer-paper {
  height: fit-content !important;
  position: absolute !important;
}

.papi-toolbar-children {
  padding: 10px;
  display: flex;
  gap: 8px;
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
`, "top");
export {
  fb as Alert,
  hb as AlertDescription,
  mb as AlertTitle,
  r0 as BOOK_SELECTOR_STRING_KEYS,
  t0 as BookChapterControl,
  Up as BookSelectionMode,
  n0 as BookSelector,
  Ne as Button,
  gb as Card,
  wb as CardContent,
  yb as CardDescription,
  xb as CardFooter,
  bb as CardHeader,
  vb as CardTitle,
  zp as ChapterRangeSelector,
  h0 as Checkbox,
  g0 as Checklist,
  Oa as ComboBox,
  b0 as ContextMenu,
  Jp as DataTable,
  O0 as DisableButton,
  jo as DropdownMenu,
  Lo as DropdownMenuCheckboxItem,
  Cn as DropdownMenuContent,
  bp as DropdownMenuGroup,
  Ji as DropdownMenuItem,
  _v as DropdownMenuItemType,
  Ur as DropdownMenuLabel,
  Zv as DropdownMenuPortal,
  e0 as DropdownMenuRadioGroup,
  Zi as DropdownMenuRadioItem,
  On as DropdownMenuSeparator,
  wp as DropdownMenuShortcut,
  Qv as DropdownMenuSub,
  yp as DropdownMenuSubContent,
  vp as DropdownMenuSubTrigger,
  Ki as DropdownMenuTrigger,
  C0 as EnableButton,
  $v as FilterButton,
  $0 as FilterDropdown,
  M0 as Footer,
  vg as GridMenu,
  db as HamburgerMenuButton,
  o0 as INVENTORY_STRING_KEYS,
  v0 as IconButton,
  zr as Input,
  S0 as InstallButton,
  a0 as Inventory,
  Ze as Label,
  Kt as LabelPosition,
  P0 as MarkdownRenderer,
  ul as MenuItem,
  I0 as MoreInfo,
  c0 as NavigationContentSearch,
  _0 as NoExtensionsFound,
  Qi as RadioGroup,
  wo as RadioGroupItem,
  p0 as ScriptureResultsViewer,
  d0 as ScrollGroupSelector,
  nd as SearchBar,
  Mr as Select,
  er as SelectContent,
  Gp as SelectGroup,
  Ke as SelectItem,
  Wp as SelectLabel,
  ls as SelectScrollDownButton,
  ss as SelectScrollUpButton,
  Xp as SelectSeparator,
  Qt as SelectTrigger,
  Ar as SelectValue,
  gs as Separator,
  u0 as SettingsList,
  m0 as SettingsListHeader,
  f0 as SettingsListItem,
  kb as ShadCnSlider,
  Eb as ShadCnSwitch,
  y0 as Slider,
  w0 as Snackbar,
  N0 as Sonner,
  Jr as Spinner,
  x0 as Switch,
  Rn as Table,
  $n as TableBody,
  Kp as TableCaption,
  tr as TableCell,
  qp as TableFooter,
  Dr as TableHead,
  Pn as TableHeader,
  kt as TableRow,
  T0 as Tabs,
  Sb as TabsContent,
  Nb as TabsList,
  Tb as TabsTrigger,
  k0 as TextField,
  ds as ToggleGroup,
  ln as ToggleGroupItem,
  E0 as Toolbar,
  R0 as UpdateButton,
  Iv as VersionHistory,
  us as VerticalTabs,
  ms as VerticalTabsContent,
  fs as VerticalTabsList,
  od as VerticalTabsTrigger,
  $p as buttonVariants,
  Vo as getSortingIcon,
  s0 as inventoryCountColumn,
  i0 as inventoryItemColumn,
  l0 as inventoryStatusColumn,
  L0 as sonner,
  A0 as useEvent,
  D0 as useEventAsync,
  _o as usePromise
};
//# sourceMappingURL=index.js.map
