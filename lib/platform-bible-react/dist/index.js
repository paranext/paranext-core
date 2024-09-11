import ac, { jsx as p, jsxs as $, Fragment as Et } from "react/jsx-runtime";
import * as N from "react";
import U, { forwardRef as En, useCallback as Ce, useState as fe, useRef as At, useEffect as Ze, useLayoutEffect as Ea, useMemo as kt } from "react";
import { History as ic, ChevronRight as Di, Check as Io, Circle as sc, ArrowDownWideNarrow as lc, Clock as cc, Bookmark as pc, FilterIcon as dc, ChevronDown as Nn, ChevronUp as uc, ArrowLeftIcon as fc, ChevronLeftIcon as mc, ChevronRightIcon as hc, ArrowRightIcon as gc, ArrowUpIcon as vc, ArrowDownIcon as bc, ArrowUpDownIcon as yc, CircleCheckIcon as Na, CircleXIcon as Ta, CircleHelpIcon as Sa, X as ji, Search as wc, ChevronsUpDown as xc, ChevronLeft as kc, LoaderCircle as Ec, Download as Nc, Filter as Tc, User as Sc, Link as Cc, CircleHelp as Oc } from "lucide-react";
import Oe, { clsx as Rc } from "clsx";
import { extendTailwindMerge as Pc } from "tailwind-merge";
import * as ve from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as $c } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as _c, getLocalizeKeyForScrollGroupId as me, compareScrRefs as vo, scrRefToBBBCCCVVV as Yn, formatScrRef as qn, NumberFormat as Ic, formatBytes as Mc } from "platform-bible-utils";
import { useReactTable as Bi, getCoreRowModel as Li, getPaginationRowModel as Ac, getSortedRowModel as Vi, getFilteredRowModel as Dc, flexRender as Sr, getExpandedRowModel as jc, getGroupedRowModel as Bc } from "@tanstack/react-table";
import { Slot as Lc } from "@radix-ui/react-slot";
import { cva as Tn } from "class-variance-authority";
import * as ke from "@radix-ui/react-select";
import { FormControlLabel as Ca, FormLabel as Vc, Checkbox as Fc, MenuItem as zc, ListItemText as Uc, ListItemIcon as Fi, Menu as Hc, Grid as zi, List as Gc, IconButton as Ui, Drawer as Xc, Slider as Wc, Snackbar as Yc, Switch as qc, AppBar as Kc, Toolbar as Jc } from "@mui/material";
import * as Ir from "@radix-ui/react-popover";
import { Command as De } from "cmdk";
import * as tt from "@radix-ui/react-dialog";
import Zc, { ThemeContext as Qc, internal_processStyles as ep } from "@mui/styled-engine";
import * as tp from "react-dom";
import tn from "react-dom";
import * as je from "@radix-ui/react-tabs";
import * as Hi from "@radix-ui/react-separator";
import * as Gi from "@radix-ui/react-label";
import { useTheme as rp } from "next-themes";
import { Toaster as np } from "sonner";
import { toast as X0 } from "sonner";
import * as kr from "@radix-ui/react-slider";
import * as bo from "@radix-ui/react-switch";
import * as Ue from "@radix-ui/react-toast";
const op = Pc({ prefix: "pr-" });
function A(...e) {
  return op(Rc(e));
}
const zr = U.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ p(
    "input",
    {
      type: t,
      className: A(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
zr.displayName = "Input";
const ap = En(
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
      ic,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var ip = Object.defineProperty, sp = (e, t, r) => t in e ? ip(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => sp(e, typeof t != "symbol" ? t + "" : t, r);
const jt = [
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
], Mo = [
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
], Xi = [
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
], Oa = vp();
function lr(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Oa ? Oa[e] : 0;
}
function Ao(e) {
  return lr(e) > 0;
}
function lp(e) {
  const t = typeof e == "string" ? lr(e) : e;
  return t >= 40 && t <= 66;
}
function cp(e) {
  return (typeof e == "string" ? lr(e) : e) <= 39;
}
function Wi(e) {
  return e <= 66;
}
function pp(e) {
  const t = typeof e == "string" ? lr(e) : e;
  return Ki(t) && !Wi(t);
}
function* dp() {
  for (let e = 1; e <= jt.length; e++)
    yield e;
}
const up = 1, Yi = jt.length;
function fp() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Do(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= jt.length ? t : jt[r];
}
function qi(e) {
  return e <= 0 || e > Yi ? "******" : Xi[e - 1];
}
function mp(e) {
  return qi(lr(e));
}
function Ki(e) {
  const t = typeof e == "number" ? Do(e) : e;
  return Ao(t) && !Mo.includes(t);
}
function hp(e) {
  const t = typeof e == "number" ? Do(e) : e;
  return Ao(t) && Mo.includes(t);
}
function gp(e) {
  return Xi[e - 1].includes("*obsolete*");
}
function vp() {
  const e = {};
  for (let t = 0; t < jt.length; t++)
    e[jt[t]] = t + 1;
  return e;
}
const he = {
  allBookIds: jt,
  nonCanonicalIds: Mo,
  bookIdToNumber: lr,
  isBookIdValid: Ao,
  isBookNT: lp,
  isBookOT: cp,
  isBookOTNT: Wi,
  isBookDC: pp,
  allBookNumbers: dp,
  firstBook: up,
  lastBook: Yi,
  extraBooks: fp,
  bookNumberToId: Do,
  bookNumberToEnglishName: qi,
  bookIdToEnglishName: mp,
  isCanonical: Ki,
  isExtraMaterial: hp,
  isObsolete: gp
};
var Qe = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Qe || {});
const Ve = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = Qe[t]) : (this._type = t, this.name = Qe[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(Ve, "Original", new Ve(Qe.Original)), oe(Ve, "Septuagint", new Ve(Qe.Septuagint)), oe(Ve, "Vulgate", new Ve(Qe.Vulgate)), oe(Ve, "English", new Ve(Qe.English)), oe(Ve, "RussianProtestant", new Ve(Qe.RussianProtestant)), oe(Ve, "RussianOrthodox", new Ve(Qe.RussianOrthodox));
let Rt = Ve;
function Ra(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var Ji = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ji || {});
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
    return he.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = he.bookIdToNumber(t);
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
    if (t <= 0 || t > he.lastBook)
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
          this.versification = new Rt(Qe[i]);
        } catch {
          throw new hr("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new hr("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || he.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(n[1]))
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
    const o = [], a = Ra(this._verse, n);
    for (const i of a.map((l) => Ra(l, r))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const f = this.clone();
        if (f.verse = i[1], !t)
          for (let m = c + 1; m < f.verseNum; m++) {
            const b = new le(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || o.push(b);
          }
        o.push(f);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > he.lastBook ? 2 : (he.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = he.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(Ie, "defaultVersification", Rt.English), oe(Ie, "verseRangeSeparator", "-"), oe(Ie, "verseSequenceIndicator", ","), oe(Ie, "verseRangeSeparators", [Ie.verseRangeSeparator]), oe(Ie, "verseSequenceIndicators", [Ie.verseSequenceIndicator]), oe(Ie, "chapterDigitShifter", 1e3), oe(Ie, "bookDigitShifter", Ie.chapterDigitShifter * Ie.chapterDigitShifter), oe(Ie, "bcvMaxValue", Ie.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Ie, "ValidStatusType", Ji);
let hr = class extends Error {
};
const jo = ve.Root, Zi = ve.Trigger, bp = ve.Group, i0 = ve.Portal, s0 = ve.Sub, l0 = ve.RadioGroup, yp = U.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ $(
  ve.SubTrigger,
  {
    ref: o,
    className: A(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ p(Di, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
yp.displayName = ve.SubTrigger.displayName;
const wp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ve.SubContent,
  {
    ref: r,
    className: A(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
wp.displayName = ve.SubContent.displayName;
const Sn = U.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ p(ve.Portal, { children: /* @__PURE__ */ p(
  ve.Content,
  {
    ref: n,
    sideOffset: t,
    className: A(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Sn.displayName = ve.Content.displayName;
const Qi = U.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ p(
  ve.Item,
  {
    ref: n,
    className: A(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...r
  }
));
Qi.displayName = ve.Item.displayName;
const Bo = U.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ $(
  ve.CheckboxItem,
  {
    ref: o,
    className: A(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(ve.ItemIndicator, { children: /* @__PURE__ */ p(Io, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Bo.displayName = ve.CheckboxItem.displayName;
const es = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  ve.RadioItem,
  {
    ref: n,
    className: A(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(ve.ItemIndicator, { children: /* @__PURE__ */ p(sc, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
es.displayName = ve.RadioItem.displayName;
const Ur = U.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ p(
  ve.Label,
  {
    ref: n,
    className: A("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
Ur.displayName = ve.Label.displayName;
const Cn = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ve.Separator,
  {
    ref: r,
    className: A("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Cn.displayName = ve.Separator.displayName;
function xp({ className: e, ...t }) {
  return /* @__PURE__ */ p(
    "span",
    {
      className: A("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
xp.displayName = "DropdownMenuShortcut";
const kp = En(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ $(
    Qi,
    {
      ref: l,
      textValue: e,
      className: A("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80", {
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
            className: A(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": r,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: he.bookIdToEnglishName(e)
          }
        ),
        r && /* @__PURE__ */ p("div", { children: i })
      ]
    },
    e
  )
);
function Ep({
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
  return /* @__PURE__ */ p("div", { className: A("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ p(
    "div",
    {
      className: A(
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
function Np({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ $(Ur, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ p("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ p(
        lc,
        {
          onClick: e,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ p(
        cc,
        {
          onClick: t,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ p(
        pc,
        {
          onClick: r,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      )
    ] })
  ] });
}
const Cr = he.allBookIds, Tp = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Pa = ["OT", "NT", "DC"], Sp = 32 + 32 + 32, Cp = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Op = (e) => ({
  OT: Cr.filter((r) => he.isBookOT(r)),
  NT: Cr.filter((r) => he.isBookNT(r)),
  DC: Cr.filter((r) => he.isBookDC(r))
})[e], gr = (e) => _c(he.bookIdToNumber(e));
function Rp() {
  return Cr.map((t) => he.bookIdToEnglishName(t));
}
function Pp(e) {
  return Rp().includes(e);
}
function $p(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Pp(t))
    return Cr.find((n) => he.bookIdToEnglishName(n) === t);
}
function c0({ scrRef: e, handleSubmit: t }) {
  const [r, n] = fe(""), [o, a] = fe(
    he.bookNumberToId(e.bookNum)
  ), [i, l] = fe(e.chapterNum ?? 0), [c, f] = fe(
    he.bookNumberToId(e.bookNum)
  ), [m, b] = fe(!1), [g, d] = fe(m), h = At(void 0), u = At(void 0), v = At(void 0), x = Ce(
    (E) => Op(E).filter((R) => {
      const _ = he.bookIdToEnglishName(R).toLowerCase(), z = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return _.includes(z) || // Match book name
      R.toLowerCase().includes(z);
    }),
    [r]
  ), O = (E) => {
    n(E);
  }, w = At(!1), k = Ce((E) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    b(E);
  }, []), y = Ce(
    (E, R, _, z) => {
      if (l(
        he.bookNumberToId(e.bookNum) !== E ? 1 : e.chapterNum
      ), R || gr(E) === -1) {
        t({
          bookNum: he.bookIdToNumber(E),
          chapterNum: _ || 1,
          verseNum: z || 1
        }), b(!1), n("");
        return;
      }
      a(o !== E ? E : ""), b(!R);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (E) => {
    E <= 0 || E > gr(o) || y(o, !0, E);
  }, S = Ce(() => {
    Cp.forEach((E) => {
      const R = r.match(E);
      if (R) {
        const [_, z = void 0, G = void 0] = R.slice(1), j = $p(_);
        (he.isBookIdValid(_) || j) && y(
          j ?? _,
          !0,
          z ? parseInt(z, 10) : 1,
          G ? parseInt(G, 10) : 1
        );
      }
    });
  }, [y, r]), I = Ce(
    (E) => {
      m ? (E.key === "ArrowDown" || E.key === "ArrowUp") && (typeof v < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      v.current !== null ? v.current.focus() : typeof u < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      u.current !== null && u.current.focus(), E.preventDefault()) : b(!0);
    },
    [m]
  ), D = (E) => {
    const { key: R } = E;
    R === "ArrowRight" || R === "ArrowLeft" || R === "ArrowDown" || R === "ArrowUp" || R === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: R })), h.current.focus());
  }, V = (E) => {
    const { key: R } = E;
    if (c === o) {
      if (R === "Enter") {
        E.preventDefault(), y(o, !0, i);
        return;
      }
      let _ = 0;
      if (R === "ArrowRight")
        if (i < gr(c))
          _ = 1;
        else {
          E.preventDefault();
          return;
        }
      else if (R === "ArrowLeft")
        if (i > 1)
          _ = -1;
        else {
          E.preventDefault();
          return;
        }
      else
        R === "ArrowDown" ? _ = 6 : R === "ArrowUp" && (_ = -6);
      i + _ <= 0 || i + _ > gr(c) ? l(0) : _ !== 0 && (l(i + _), E.preventDefault());
    }
  };
  return Ze(() => {
    o === c ? o === he.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), Ea(() => {
    d(m);
  }, [m]), Ea(() => {
    const E = setTimeout(() => {
      if (g && u.current && v.current) {
        const _ = v.current.offsetTop - Sp;
        u.current.scrollTo({ top: _, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(E);
    };
  }, [g]), /* @__PURE__ */ p("div", { className: "pr-twp pr-flex", children: /* @__PURE__ */ $(jo, { modal: !1, open: m, onOpenChange: k, children: [
    /* @__PURE__ */ p(Zi, { asChild: !0, children: /* @__PURE__ */ p(
      ap,
      {
        ref: h,
        value: r,
        handleSearch: O,
        handleKeyDown: I,
        handleOnClick: () => {
          a(he.bookNumberToId(e.bookNum)), f(he.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), b(!0), h.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: S,
        placeholder: `${he.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ $(
      Sn,
      {
        className: "pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: D,
        align: "start",
        ref: u,
        children: [
          /* @__PURE__ */ p(
            Np,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Pa.map(
            (E, R) => x(E).length > 0 && /* @__PURE__ */ $("div", { children: [
              /* @__PURE__ */ p(Ur, { className: "pr-font-semibold pr-text-foreground/80", children: Tp[E] }),
              x(E).map((_) => /* @__PURE__ */ p("div", { children: /* @__PURE__ */ p(
                kp,
                {
                  bookId: _,
                  handleSelectBook: () => y(_, !1),
                  isSelected: o === _,
                  handleHighlightBook: () => f(_),
                  handleKeyDown: V,
                  bookType: E,
                  ref: (z) => {
                    o === _ && (v.current = z);
                  },
                  children: /* @__PURE__ */ p(
                    Ep,
                    {
                      handleSelectChapter: T,
                      endChapter: gr(_),
                      activeChapter: e.bookNum === he.bookIdToNumber(_) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (z) => {
                        l(z);
                      }
                    }
                  )
                }
              ) }, _)),
              Pa.length - 1 !== R ? /* @__PURE__ */ p(Cn, {}) : void 0
            ] }, E)
          )
        ]
      }
    )
  ] }) });
}
const _p = Tn(
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
), xe = U.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ p(n ? Lc : "button", { className: A(_p({ variant: t, size: r, className: e })), ref: a, ...o })
);
xe.displayName = "Button";
function Ip({ table: e }) {
  return /* @__PURE__ */ $(jo, { children: [
    /* @__PURE__ */ p($c, { asChild: !0, children: /* @__PURE__ */ $(xe, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ p(dc, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ $(Sn, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ p(Ur, { children: "Toggle columns" }),
      /* @__PURE__ */ p(Cn, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ p(
        Bo,
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
const Mr = ke.Root, Mp = ke.Group, Ar = ke.Value, Qt = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  ke.Trigger,
  {
    ref: n,
    className: A(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ p(ke.Icon, { asChild: !0, children: /* @__PURE__ */ p(Nn, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Qt.displayName = ke.Trigger.displayName;
const ts = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ke.ScrollUpButton,
  {
    ref: r,
    className: A("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ p(uc, { className: "pr-h-4 pr-w-4" })
  }
));
ts.displayName = ke.ScrollUpButton.displayName;
const rs = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ke.ScrollDownButton,
  {
    ref: r,
    className: A("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ p(Nn, { className: "pr-h-4 pr-w-4" })
  }
));
rs.displayName = ke.ScrollDownButton.displayName;
const er = U.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ p(ke.Portal, { children: /* @__PURE__ */ $(
  ke.Content,
  {
    ref: o,
    className: A(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ p(ts, {}),
      /* @__PURE__ */ p(
        ke.Viewport,
        {
          className: A(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ p(rs, {})
    ]
  }
) }));
er.displayName = ke.Content.displayName;
const Ap = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ke.Label,
  {
    ref: r,
    className: A("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Ap.displayName = ke.Label.displayName;
const Je = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  ke.Item,
  {
    ref: n,
    className: A(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ p("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ p(ke.ItemIndicator, { children: /* @__PURE__ */ p(Io, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ p(ke.ItemText, { children: t })
    ]
  }
));
Je.displayName = ke.Item.displayName;
const Dp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  ke.Separator,
  {
    ref: r,
    className: A("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Dp.displayName = ke.Separator.displayName;
function jp({ table: e }) {
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
            /* @__PURE__ */ p(er, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ p(Je, { value: `${t}`, children: t }, t)) })
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
        xe,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ p(fc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ $(
        xe,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ p(mc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ $(
        xe,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ p(hc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ $(
        xe,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ p(gc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const On = U.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ p("div", { className: A("pr-twp pr-relative pr-w-full", { "pr-overflow-auto": !t }), children: /* @__PURE__ */ p(
  "table",
  {
    ref: n,
    className: A("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...r
  }
) }));
On.displayName = "Table";
const Rn = U.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ p(
  "thead",
  {
    ref: n,
    className: A(
      { "pr-sticky pr-top-0 pr-bg-muted": t },
      "[&_tr]:pr-border-b",
      e
    ),
    ...r
  }
));
Rn.displayName = "TableHeader";
const Pn = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("tbody", { ref: r, className: A("[&_tr:last-child]:pr-border-0", e), ...t }));
Pn.displayName = "TableBody";
const Bp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "tfoot",
  {
    ref: r,
    className: A("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Bp.displayName = "TableFooter";
const xt = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "tr",
    {
      ref: r,
      className: A(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
xt.displayName = "TableRow";
const Dr = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "th",
  {
    ref: r,
    className: A(
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
    className: A("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0", e),
    ...t
  }
));
tr.displayName = "TableCell";
const Lp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  "caption",
  {
    ref: r,
    className: A("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Lp.displayName = "TableCaption";
function Vp({
  columns: e,
  data: t,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var v;
  const [l, c] = fe([]), [f, m] = fe([]), [b, g] = fe({}), [d, h] = fe({}), u = Bi({
    data: t,
    columns: e,
    getCoreRowModel: Li(),
    ...r && { getPaginationRowModel: Ac() },
    onSortingChange: c,
    getSortedRowModel: Vi(),
    onColumnFiltersChange: m,
    getFilteredRowModel: Dc(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: h,
    state: {
      sorting: l,
      columnFilters: f,
      columnVisibility: b,
      rowSelection: d
    }
  });
  return /* @__PURE__ */ $("div", { className: "pr-twp pr-font-sans", children: [
    o && /* @__PURE__ */ p(Ip, { table: u }),
    /* @__PURE__ */ $(On, { stickyHeader: a, children: [
      /* @__PURE__ */ p(Rn, { stickyHeader: a, children: u.getHeaderGroups().map((x) => /* @__PURE__ */ p(xt, { children: x.headers.map((O) => /* @__PURE__ */ p(Dr, { children: O.isPlaceholder ? void 0 : Sr(O.column.columnDef.header, O.getContext()) }, O.id)) }, x.id)) }),
      /* @__PURE__ */ p(Pn, { children: (v = u.getRowModel().rows) != null && v.length ? u.getRowModel().rows.map((x) => /* @__PURE__ */ p(
        xt,
        {
          onClick: () => i(x, u),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((O) => /* @__PURE__ */ p(tr, { children: Sr(O.column.columnDef.cell, O.getContext()) }, O.id))
        },
        x.id
      )) : /* @__PURE__ */ p(xt, { children: /* @__PURE__ */ p(tr, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ p(
        xe,
        {
          variant: "outline",
          size: "sm",
          onClick: () => u.previousPage(),
          disabled: !u.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ p(
        xe,
        {
          variant: "outline",
          size: "sm",
          onClick: () => u.nextPage(),
          disabled: !u.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ p(jp, { table: u })
  ] });
}
const Fp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), $a = (e) => {
  const t = /^\\[vc]\s+(\d+)/, r = e.match(t);
  if (r)
    return +r[1];
}, _a = (e, t, r, n) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = Fp(e);
  let i = n.chapterNum, l = n.verseNum, c = 0;
  return a.forEach((f) => {
    f.startsWith("\\id") && (i = 0, l = 0), f.startsWith("\\c") && (i = $a(f), l = 0), f.startsWith("\\v") && (l = $a(f), i === 0 && (i = n.chapterNum));
    const m = r(f, t);
    for (let b = 0; b < m.length; b++) {
      const g = {
        reference: {
          ...n,
          chapterNum: i !== void 0 ? +i : -1,
          verseNum: l !== void 0 ? +l : -1
        },
        snippet: f,
        key: c
      };
      c += 1, o.push(g);
    }
  }), o;
};
function zp({
  selectedItem: e,
  text: t,
  extractItems: r,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], l = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, f] = fe(
    _a(t, e, r, n)
  );
  return Ze(
    () => f(_a(t, e, r, n)),
    [t, e, n, r]
  ), /* @__PURE__ */ $(On, { stickyHeader: !0, children: [
    /* @__PURE__ */ p(Rn, { stickyHeader: !0, children: /* @__PURE__ */ $(xt, { children: [
      /* @__PURE__ */ p(Dr, { children: i }),
      /* @__PURE__ */ p(Dr, { children: l })
    ] }) }),
    /* @__PURE__ */ p(Pn, { children: c.map((m) => /* @__PURE__ */ $(
      xt,
      {
        onClick: () => {
          o(m.reference);
        },
        children: [
          /* @__PURE__ */ p(tr, { children: `${he.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}` }),
          /* @__PURE__ */ p(tr, { children: m.snippet })
        ]
      },
      m.key
    )) })
  ] });
}
const p0 = Object.freeze([
  "%webView_inventory_all%",
  "%webView_inventory_approved%",
  "%webView_inventory_unapproved%",
  "%webView_inventory_unknown%",
  "%webView_inventory_scope_book%",
  "%webView_inventory_scope_chapter%",
  "%webView_inventory_scope_verse%",
  "%webView_inventory_filter_text%",
  "%webView_inventory_occurrences_table_header_reference%",
  "%webView_inventory_occurrences_table_header_occurrence%"
]), Lo = (e) => e === "asc" ? /* @__PURE__ */ p(vc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ p(bc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ p(yc, { className: "pr-ms-2 pr-h-4 pr-w-4" }), Up = (e, t, r) => {
  let n = e;
  return t !== "all" && (n = n.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), r !== "" && (n = n.filter((o) => o.item.includes(r))), n;
}, Hp = (e, t, r) => {
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
}, gt = (e, t) => e[t] ?? t;
function d0({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  extractItems: n,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: l,
  text: c,
  scope: f,
  onScopeChange: m,
  getColumns: b
}) {
  const g = gt(r, "%webView_inventory_all%"), d = gt(r, "%webView_inventory_approved%"), h = gt(r, "%webView_inventory_unapproved%"), u = gt(r, "%webView_inventory_unknown%"), v = gt(r, "%webView_inventory_scope_book%"), x = gt(r, "%webView_inventory_scope_chapter%"), O = gt(r, "%webView_inventory_scope_verse%"), w = gt(r, "%webView_inventory_filter_text%"), [k, y] = fe([]), [T, S] = fe("all"), [I, D] = fe(""), [V, E] = fe(""), R = Ce(
    (F, C) => {
      y((Y) => {
        let H = [];
        return F.forEach((K) => {
          H = Y.map((q) => q.item === K && q.status !== C ? { ...q, status: C } : q);
        }), H;
      });
      let B = [...o];
      F.forEach((Y) => {
        C === "approved" ? B.includes(Y) || B.push(Y) : B = B.filter((H) => H !== Y);
      }), a(B);
      let W = [...i];
      F.forEach((Y) => {
        C === "unapproved" ? W.includes(Y) || W.push(Y) : W = W.filter(
          (H) => H !== Y
        );
      }), l(W);
    },
    [o, a, i, l]
  ), _ = Ce(
    (F) => o.includes(F) ? "approved" : i.includes(F) ? "unapproved" : "unknown",
    [o, i]
  );
  Ze(() => {
    c && y(Hp(c, n, _));
  }, [n, c, _]);
  const z = kt(() => Up(k, T, I), [k, T, I]);
  Ze(() => {
    E("");
  }, [z]);
  const G = (F, C) => {
    C.toggleAllRowsSelected(!1), F.toggleSelected(void 0), E(F.getValue("item"));
  }, j = kt(() => b(R), [b, R]), X = (F) => {
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
            /* @__PURE__ */ $(er, { className: "pr-font-sans", children: [
              /* @__PURE__ */ p(Je, { value: "all", children: g }),
              /* @__PURE__ */ p(Je, { value: "approved", children: d }),
              /* @__PURE__ */ p(Je, { value: "unapproved", children: h }),
              /* @__PURE__ */ p(Je, { value: "unknown", children: u })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ $(Mr, { onValueChange: (F) => X(F), defaultValue: f, children: [
        /* @__PURE__ */ p(Qt, { className: "pr-m-1", children: /* @__PURE__ */ p(Ar, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ $(er, { className: "pr-font-sans", children: [
          /* @__PURE__ */ p(Je, { value: "book", children: v }),
          /* @__PURE__ */ p(Je, { value: "chapter", children: x }),
          /* @__PURE__ */ p(Je, { value: "verse", children: O })
        ] })
      ] }),
      /* @__PURE__ */ p(
        zr,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: w,
          value: I,
          onChange: (F) => {
            D(F.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ p("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ p(
      Vp,
      {
        columns: j,
        data: z,
        onRowClickHandler: G,
        stickyHeader: !0
      }
    ) }),
    V !== "" && /* @__PURE__ */ p("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ p(
      zp,
      {
        selectedItem: V,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (F) => t(F),
        localizedStrings: r
      }
    ) })
  ] });
}
const u0 = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ $(xe, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Lo(t.getIsSorted())
  ] })
}), f0 = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ $(xe, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Lo(t.getIsSorted())
  ] })
}), m0 = (e, t) => ({
  accessorKey: "status",
  header: ({ column: r, table: n }) => {
    const o = n.getSelectedRowModel().rows, a = [];
    return o.forEach((i) => {
      a.push(i.getValue("item"));
    }), /* @__PURE__ */ $("div", { className: "pr-flex pr-justify-start", children: [
      /* @__PURE__ */ $(
        xe,
        {
          className: "pr-mt-1",
          variant: "ghost",
          onClick: () => r.toggleSorting(void 0),
          children: [
            e,
            Lo(r.getIsSorted())
          ]
        }
      ),
      /* @__PURE__ */ p(xe, { className: "pr-m-1", children: /* @__PURE__ */ p(
        Na,
        {
          onClick: () => {
            t(a, "approved");
          }
        }
      ) }),
      /* @__PURE__ */ p(xe, { className: "pr-m-1", children: /* @__PURE__ */ p(
        Ta,
        {
          onClick: () => {
            t(a, "unapproved");
          }
        }
      ) }),
      /* @__PURE__ */ p(xe, { className: "pr-m-1", children: /* @__PURE__ */ p(
        Sa,
        {
          onClick: () => {
            t(a, "unknown");
          }
        }
      ) })
    ] });
  },
  cell: ({ row: r }) => {
    switch (r.getValue("status")) {
      case "approved":
        return /* @__PURE__ */ p(Na, {});
      case "unapproved":
        return /* @__PURE__ */ p(Ta, {});
      case "unknown":
      default:
        return /* @__PURE__ */ p(Sa, {});
    }
  }
}), Kn = {
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
function h0({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: r,
  localizedStrings: n = {}
}) {
  const o = {
    ...Kn,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([a, i]) => [
          a,
          a === i && a in Kn ? Kn[a] : i
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
        /* @__PURE__ */ p(Qt, { className: "pr-w-auto", children: /* @__PURE__ */ p(
          Ar,
          {
            placeholder: o[me(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ p(
          er,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ p(Je, { value: `${a}`, children: o[me(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const Gp = Ir.Root, Xp = Ir.Trigger, ns = U.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ p(Ir.Portal, { children: /* @__PURE__ */ p(
  Ir.Content,
  {
    ref: o,
    align: t,
    sideOffset: r,
    className: A(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
ns.displayName = Ir.Content.displayName;
const Wp = tt.Portal, os = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  tt.Overlay,
  {
    ref: r,
    className: A(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
os.displayName = tt.Overlay.displayName;
const Yp = U.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(Wp, { children: [
  /* @__PURE__ */ p(os, {}),
  /* @__PURE__ */ $(
    tt.Content,
    {
      ref: n,
      className: A(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ $(tt.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ p(ji, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ p("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Yp.displayName = tt.Content.displayName;
const qp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  tt.Title,
  {
    ref: r,
    className: A("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
qp.displayName = tt.Title.displayName;
const Kp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  tt.Description,
  {
    ref: r,
    className: A("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Kp.displayName = tt.Description.displayName;
const as = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De,
  {
    ref: r,
    className: A(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
as.displayName = De.displayName;
const is = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ p(wc, { className: "pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ p(
    De.Input,
    {
      ref: r,
      className: A(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
is.displayName = De.Input.displayName;
const ss = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.List,
  {
    ref: r,
    className: A("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
ss.displayName = De.List.displayName;
const ls = U.forwardRef((e, t) => /* @__PURE__ */ p(De.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
ls.displayName = De.Empty.displayName;
const Jp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.Group,
  {
    ref: r,
    className: A(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Jp.displayName = De.Group.displayName;
const Zp = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.Separator,
  {
    ref: r,
    className: A("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Zp.displayName = De.Separator.displayName;
const cs = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  De.Item,
  {
    ref: r,
    className: A(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
cs.displayName = De.Item.displayName;
function Qp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Ia({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = Qp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: f = "outline",
  dir: m = "ltr",
  ...b
}) {
  const [g, d] = fe(!1);
  return /* @__PURE__ */ $(Gp, { open: g, onOpenChange: d, ...b, children: [
    /* @__PURE__ */ p(Xp, { asChild: !0, children: /* @__PURE__ */ $(
      xe,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": g,
        id: e,
        className: A("pr-w-[200px] pr-justify-between", r),
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ p(xc, { className: "pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ p(ns, { className: "pr-w-[200px] pr-p-0", dir: m, children: /* @__PURE__ */ $(as, { children: [
      /* @__PURE__ */ p(is, { dir: m, placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ p(ls, { children: c }),
      /* @__PURE__ */ p(ss, { children: t.map((h) => /* @__PURE__ */ $(
        cs,
        {
          value: a(h),
          onSelect: () => {
            o(h), d(!1);
          },
          children: [
            /* @__PURE__ */ p(
              Io,
              {
                className: A("pr-me-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !n || a(n) !== a(h)
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
function g0({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: r = !1,
  chapterCount: n
}) {
  const [o, a] = fe(1), [i, l] = fe(n), [c, f] = fe(
    Array.from({ length: n }, (g, d) => d + 1)
  );
  return Ze(() => {
    a(1), e(1), l(n), t(n), f(Array.from({ length: n }, (g, d) => d + 1));
  }, [n, t, e]), /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ p(
      Ca,
      {
        className: "book-selection-chapter-form-label start",
        disabled: r,
        control: /* @__PURE__ */ p(
          Ia,
          {
            onChange: (g) => {
              a(g), e(g), g > i && (l(g), t(g));
            },
            className: "book-selection-chapter",
            options: c,
            getOptionLabel: (g) => g.toString(),
            value: o
          },
          "start chapter"
        ),
        label: "Chapters",
        labelPlacement: "start"
      }
    ),
    /* @__PURE__ */ p(
      Ca,
      {
        className: "book-selection-chapter-form-label end",
        disabled: r,
        control: /* @__PURE__ */ p(
          Ia,
          {
            onChange: (g) => {
              l(g), t(g), g < o && (a(g), e(g));
            },
            className: "book-selection-chapter",
            options: c,
            getOptionLabel: (g) => g.toString(),
            value: i
          },
          "end chapter"
        ),
        label: "to",
        labelPlacement: "start"
      }
    )
  ] });
}
var Kt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Kt || {});
function ed({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = Kt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: f
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
      onChange: f
    }
  );
  let b;
  if (r) {
    const g = n === Kt.Before || n === Kt.Above, d = /* @__PURE__ */ p("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), h = n === Kt.Before || n === Kt.After, u = h ? d : /* @__PURE__ */ p("div", { children: d }), v = h ? m : /* @__PURE__ */ p("div", { children: m });
    b = /* @__PURE__ */ $(
      Vc,
      {
        className: `papi-checkbox ${n.toString()}`,
        disabled: i,
        error: l,
        children: [
          g && u,
          v,
          !g && u
        ]
      }
    );
  } else
    b = m;
  return b;
}
function v0({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ $("fieldset", { id: e, className: t, children: [
    r && /* @__PURE__ */ p("legend", { children: r }),
    n.map((l) => /* @__PURE__ */ p(
      ed,
      {
        className: "check-item",
        isChecked: o.includes(l),
        labelText: i ? i(l) : l,
        onChange: (c) => a(l, c.target.checked)
      },
      l
    ))
  ] });
}
function td(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function rd(e) {
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
var Vo = {}, ps = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ps);
var nd = ps.exports, Jn = {};
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
function ds(e) {
  if (!It(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = ds(e[r]);
  }), t;
}
function ct(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? P({}, e) : e;
  return It(e) && It(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (It(t[o]) && o in e && It(e[o]) ? n[o] = ct(e[o], t[o], r) : r.clone ? n[o] = It(t[o]) ? ds(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var yo = { exports: {} }, rn = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ma;
function od() {
  if (Ma)
    return ce;
  Ma = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
  function w(y) {
    if (typeof y == "object" && y !== null) {
      var T = y.$$typeof;
      switch (T) {
        case t:
          switch (y = y.type, y) {
            case c:
            case f:
            case n:
            case a:
            case o:
            case b:
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
    return w(y) === f;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = f, ce.ContextConsumer = l, ce.ContextProvider = i, ce.Element = t, ce.ForwardRef = m, ce.Fragment = n, ce.Lazy = h, ce.Memo = d, ce.Portal = r, ce.Profiler = a, ce.StrictMode = o, ce.Suspense = b, ce.isAsyncMode = function(y) {
    return k(y) || w(y) === c;
  }, ce.isConcurrentMode = k, ce.isContextConsumer = function(y) {
    return w(y) === l;
  }, ce.isContextProvider = function(y) {
    return w(y) === i;
  }, ce.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, ce.isForwardRef = function(y) {
    return w(y) === m;
  }, ce.isFragment = function(y) {
    return w(y) === n;
  }, ce.isLazy = function(y) {
    return w(y) === h;
  }, ce.isMemo = function(y) {
    return w(y) === d;
  }, ce.isPortal = function(y) {
    return w(y) === r;
  }, ce.isProfiler = function(y) {
    return w(y) === a;
  }, ce.isStrictMode = function(y) {
    return w(y) === o;
  }, ce.isSuspense = function(y) {
    return w(y) === b;
  }, ce.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === f || y === a || y === o || y === b || y === g || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === d || y.$$typeof === i || y.$$typeof === l || y.$$typeof === m || y.$$typeof === v || y.$$typeof === x || y.$$typeof === O || y.$$typeof === u);
  }, ce.typeOf = w, ce;
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
var Aa;
function ad() {
  return Aa || (Aa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, b = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, d = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, v = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function w(L) {
      return typeof L == "string" || typeof L == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      L === n || L === f || L === a || L === o || L === b || L === g || typeof L == "object" && L !== null && (L.$$typeof === h || L.$$typeof === d || L.$$typeof === i || L.$$typeof === l || L.$$typeof === m || L.$$typeof === v || L.$$typeof === x || L.$$typeof === O || L.$$typeof === u);
    }
    function k(L) {
      if (typeof L == "object" && L !== null) {
        var re = L.$$typeof;
        switch (re) {
          case t:
            var M = L.type;
            switch (M) {
              case c:
              case f:
              case n:
              case a:
              case o:
              case b:
                return M;
              default:
                var se = M && M.$$typeof;
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
    var y = c, T = f, S = l, I = i, D = t, V = m, E = n, R = h, _ = d, z = r, G = a, j = o, X = b, te = !1;
    function F(L) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(L) || k(L) === c;
    }
    function C(L) {
      return k(L) === f;
    }
    function B(L) {
      return k(L) === l;
    }
    function W(L) {
      return k(L) === i;
    }
    function Y(L) {
      return typeof L == "object" && L !== null && L.$$typeof === t;
    }
    function H(L) {
      return k(L) === m;
    }
    function K(L) {
      return k(L) === n;
    }
    function q(L) {
      return k(L) === h;
    }
    function Z(L) {
      return k(L) === d;
    }
    function J(L) {
      return k(L) === r;
    }
    function Q(L) {
      return k(L) === a;
    }
    function ee(L) {
      return k(L) === o;
    }
    function ie(L) {
      return k(L) === b;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = T, pe.ContextConsumer = S, pe.ContextProvider = I, pe.Element = D, pe.ForwardRef = V, pe.Fragment = E, pe.Lazy = R, pe.Memo = _, pe.Portal = z, pe.Profiler = G, pe.StrictMode = j, pe.Suspense = X, pe.isAsyncMode = F, pe.isConcurrentMode = C, pe.isContextConsumer = B, pe.isContextProvider = W, pe.isElement = Y, pe.isForwardRef = H, pe.isFragment = K, pe.isLazy = q, pe.isMemo = Z, pe.isPortal = J, pe.isProfiler = Q, pe.isStrictMode = ee, pe.isSuspense = ie, pe.isValidElementType = w, pe.typeOf = k;
  }()), pe;
}
var Da;
function us() {
  return Da || (Da = 1, process.env.NODE_ENV === "production" ? rn.exports = od() : rn.exports = ad()), rn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Zn, ja;
function id() {
  if (ja)
    return Zn;
  ja = 1;
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
      var f = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(m) {
        f[m] = m;
      }), Object.keys(Object.assign({}, f)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Zn = o() ? Object.assign : function(a, i) {
    for (var l, c = n(a), f, m = 1; m < arguments.length; m++) {
      l = Object(arguments[m]);
      for (var b in l)
        t.call(l, b) && (c[b] = l[b]);
      if (e) {
        f = e(l);
        for (var g = 0; g < f.length; g++)
          r.call(l, f[g]) && (c[f[g]] = l[f[g]]);
      }
    }
    return c;
  }, Zn;
}
var Qn, Ba;
function Fo() {
  if (Ba)
    return Qn;
  Ba = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Qn = e, Qn;
}
var eo, La;
function fs() {
  return La || (La = 1, eo = Function.call.bind(Object.prototype.hasOwnProperty)), eo;
}
var to, Va;
function sd() {
  if (Va)
    return to;
  Va = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Fo(), r = {}, n = fs();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, f) {
    if (process.env.NODE_ENV !== "production") {
      for (var m in a)
        if (n(a, m)) {
          var b;
          try {
            if (typeof a[m] != "function") {
              var g = Error(
                (c || "React class") + ": " + l + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw g.name = "Invariant Violation", g;
            }
            b = a[m](i, m, c, l, null, t);
          } catch (h) {
            b = h;
          }
          if (b && !(b instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof b + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), b instanceof Error && !(b.message in r)) {
            r[b.message] = !0;
            var d = f ? f() : "";
            e(
              "Failed " + l + " type: " + b.message + (d ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, to = o, to;
}
var ro, Fa;
function ld() {
  if (Fa)
    return ro;
  Fa = 1;
  var e = us(), t = id(), r = Fo(), n = fs(), o = sd(), a = function() {
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
  return ro = function(l, c) {
    var f = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function b(C) {
      var B = C && (f && C[f] || C[m]);
      if (typeof B == "function")
        return B;
    }
    var g = "<<anonymous>>", d = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: O(),
      arrayOf: w,
      element: k(),
      elementType: y(),
      instanceOf: T,
      node: V(),
      objectOf: I,
      oneOf: S,
      oneOfType: D,
      shape: R,
      exact: _
    };
    function h(C, B) {
      return C === B ? C !== 0 || 1 / C === 1 / B : C !== C && B !== B;
    }
    function u(C, B) {
      this.message = C, this.data = B && typeof B == "object" ? B : {}, this.stack = "";
    }
    u.prototype = Error.prototype;
    function v(C) {
      if (process.env.NODE_ENV !== "production")
        var B = {}, W = 0;
      function Y(K, q, Z, J, Q, ee, ie) {
        if (J = J || g, ee = ee || Z, ie !== r) {
          if (c) {
            var L = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw L.name = "Invariant Violation", L;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = J + ":" + Z;
            !B[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            W < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), B[re] = !0, W++);
          }
        }
        return q[Z] == null ? K ? q[Z] === null ? new u("The " + Q + " `" + ee + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new u("The " + Q + " `" + ee + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : C(q, Z, J, Q, ee);
      }
      var H = Y.bind(null, !1);
      return H.isRequired = Y.bind(null, !0), H;
    }
    function x(C) {
      function B(W, Y, H, K, q, Z) {
        var J = W[Y], Q = j(J);
        if (Q !== C) {
          var ee = X(J);
          return new u(
            "Invalid " + K + " `" + q + "` of type " + ("`" + ee + "` supplied to `" + H + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return v(B);
    }
    function O() {
      return v(i);
    }
    function w(C) {
      function B(W, Y, H, K, q) {
        if (typeof C != "function")
          return new u("Property `" + q + "` of component `" + H + "` has invalid PropType notation inside arrayOf.");
        var Z = W[Y];
        if (!Array.isArray(Z)) {
          var J = j(Z);
          return new u("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected an array."));
        }
        for (var Q = 0; Q < Z.length; Q++) {
          var ee = C(Z, Q, H, K, q + "[" + Q + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return v(B);
    }
    function k() {
      function C(B, W, Y, H, K) {
        var q = B[W];
        if (!l(q)) {
          var Z = j(q);
          return new u("Invalid " + H + " `" + K + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return v(C);
    }
    function y() {
      function C(B, W, Y, H, K) {
        var q = B[W];
        if (!e.isValidElementType(q)) {
          var Z = j(q);
          return new u("Invalid " + H + " `" + K + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return v(C);
    }
    function T(C) {
      function B(W, Y, H, K, q) {
        if (!(W[Y] instanceof C)) {
          var Z = C.name || g, J = F(W[Y]);
          return new u("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return v(B);
    }
    function S(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function B(W, Y, H, K, q) {
        for (var Z = W[Y], J = 0; J < C.length; J++)
          if (h(Z, C[J]))
            return null;
        var Q = JSON.stringify(C, function(ie, L) {
          var re = X(L);
          return re === "symbol" ? String(L) : L;
        });
        return new u("Invalid " + K + " `" + q + "` of value `" + String(Z) + "` " + ("supplied to `" + H + "`, expected one of " + Q + "."));
      }
      return v(B);
    }
    function I(C) {
      function B(W, Y, H, K, q) {
        if (typeof C != "function")
          return new u("Property `" + q + "` of component `" + H + "` has invalid PropType notation inside objectOf.");
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new u("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected an object."));
        for (var Q in Z)
          if (n(Z, Q)) {
            var ee = C(Z, Q, H, K, q + "." + Q, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return v(B);
    }
    function D(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var B = 0; B < C.length; B++) {
        var W = C[B];
        if (typeof W != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(W) + " at index " + B + "."
          ), i;
      }
      function Y(H, K, q, Z, J) {
        for (var Q = [], ee = 0; ee < C.length; ee++) {
          var ie = C[ee], L = ie(H, K, q, Z, J, r);
          if (L == null)
            return null;
          L.data && n(L.data, "expectedType") && Q.push(L.data.expectedType);
        }
        var re = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new u("Invalid " + Z + " `" + J + "` supplied to " + ("`" + q + "`" + re + "."));
      }
      return v(Y);
    }
    function V() {
      function C(B, W, Y, H, K) {
        return z(B[W]) ? null : new u("Invalid " + H + " `" + K + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return v(C);
    }
    function E(C, B, W, Y, H) {
      return new u(
        (C || "React class") + ": " + B + " type `" + W + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + H + "`."
      );
    }
    function R(C) {
      function B(W, Y, H, K, q) {
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new u("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + H + "`, expected `object`."));
        for (var Q in C) {
          var ee = C[Q];
          if (typeof ee != "function")
            return E(H, K, q, Q, X(ee));
          var ie = ee(Z, Q, H, K, q + "." + Q, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return v(B);
    }
    function _(C) {
      function B(W, Y, H, K, q) {
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new u("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + H + "`, expected `object`."));
        var Q = t({}, W[Y], C);
        for (var ee in Q) {
          var ie = C[ee];
          if (n(C, ee) && typeof ie != "function")
            return E(H, K, q, ee, X(ie));
          if (!ie)
            return new u(
              "Invalid " + K + " `" + q + "` key `" + ee + "` supplied to `" + H + "`.\nBad object: " + JSON.stringify(W[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var L = ie(Z, ee, H, K, q + "." + ee, r);
          if (L)
            return L;
        }
        return null;
      }
      return v(B);
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
          var B = b(C);
          if (B) {
            var W = B.call(C), Y;
            if (B !== C.entries) {
              for (; !(Y = W.next()).done; )
                if (!z(Y.value))
                  return !1;
            } else
              for (; !(Y = W.next()).done; ) {
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
    function G(C, B) {
      return C === "symbol" ? !0 : B ? B["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && B instanceof Symbol : !1;
    }
    function j(C) {
      var B = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : G(B, C) ? "symbol" : B;
    }
    function X(C) {
      if (typeof C > "u" || C === null)
        return "" + C;
      var B = j(C);
      if (B === "object") {
        if (C instanceof Date)
          return "date";
        if (C instanceof RegExp)
          return "regexp";
      }
      return B;
    }
    function te(C) {
      var B = X(C);
      switch (B) {
        case "array":
        case "object":
          return "an " + B;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + B;
        default:
          return B;
      }
    }
    function F(C) {
      return !C.constructor || !C.constructor.name ? g : C.constructor.name;
    }
    return d.checkPropTypes = o, d.resetWarningCache = o.resetWarningCache, d.PropTypes = d, d;
  }, ro;
}
var no, za;
function cd() {
  if (za)
    return no;
  za = 1;
  var e = Fo();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, no = function() {
    function n(i, l, c, f, m, b) {
      if (b !== e) {
        var g = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw g.name = "Invariant Violation", g;
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
  }, no;
}
if (process.env.NODE_ENV !== "production") {
  var pd = us(), dd = !0;
  yo.exports = ld()(pd.isElement, dd);
} else
  yo.exports = cd()();
var ud = yo.exports;
const s = /* @__PURE__ */ td(ud);
function fd(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ms(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !fd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const hs = cr(s.element, ms);
hs.isRequired = cr(s.element.isRequired, ms);
const Hr = hs;
function md(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function hd(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !md(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const gd = cr(s.elementType, hd), vd = "exact-prop: ​";
function gs(e) {
  return process.env.NODE_ENV === "production" ? e : P({}, e, {
    [vd]: (t) => {
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
var wo = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ua;
function bd() {
  if (Ua)
    return de;
  Ua = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function u(v) {
    if (typeof v == "object" && v !== null) {
      var x = v.$$typeof;
      switch (x) {
        case e:
          switch (v = v.type, v) {
            case r:
            case o:
            case n:
            case f:
            case m:
              return v;
            default:
              switch (v = v && v.$$typeof, v) {
                case l:
                case i:
                case c:
                case g:
                case b:
                case a:
                  return v;
                default:
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return de.ContextConsumer = i, de.ContextProvider = a, de.Element = e, de.ForwardRef = c, de.Fragment = r, de.Lazy = g, de.Memo = b, de.Portal = t, de.Profiler = o, de.StrictMode = n, de.Suspense = f, de.SuspenseList = m, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(v) {
    return u(v) === i;
  }, de.isContextProvider = function(v) {
    return u(v) === a;
  }, de.isElement = function(v) {
    return typeof v == "object" && v !== null && v.$$typeof === e;
  }, de.isForwardRef = function(v) {
    return u(v) === c;
  }, de.isFragment = function(v) {
    return u(v) === r;
  }, de.isLazy = function(v) {
    return u(v) === g;
  }, de.isMemo = function(v) {
    return u(v) === b;
  }, de.isPortal = function(v) {
    return u(v) === t;
  }, de.isProfiler = function(v) {
    return u(v) === o;
  }, de.isStrictMode = function(v) {
    return u(v) === n;
  }, de.isSuspense = function(v) {
    return u(v) === f;
  }, de.isSuspenseList = function(v) {
    return u(v) === m;
  }, de.isValidElementType = function(v) {
    return typeof v == "string" || typeof v == "function" || v === r || v === o || v === n || v === f || v === m || v === d || typeof v == "object" && v !== null && (v.$$typeof === g || v.$$typeof === b || v.$$typeof === a || v.$$typeof === i || v.$$typeof === c || v.$$typeof === h || v.getModuleId !== void 0);
  }, de.typeOf = u, de;
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
var Ha;
function yd() {
  return Ha || (Ha = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), b = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), d = Symbol.for("react.offscreen"), h = !1, u = !1, v = !1, x = !1, O = !1, w;
    w = Symbol.for("react.module.reference");
    function k(M) {
      return !!(typeof M == "string" || typeof M == "function" || M === r || M === o || O || M === n || M === f || M === m || x || M === d || h || u || v || typeof M == "object" && M !== null && (M.$$typeof === g || M.$$typeof === b || M.$$typeof === a || M.$$typeof === i || M.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      M.$$typeof === w || M.getModuleId !== void 0));
    }
    function y(M) {
      if (typeof M == "object" && M !== null) {
        var se = M.$$typeof;
        switch (se) {
          case e:
            var Te = M.type;
            switch (Te) {
              case r:
              case o:
              case n:
              case f:
              case m:
                return Te;
              default:
                var $e = Te && Te.$$typeof;
                switch ($e) {
                  case l:
                  case i:
                  case c:
                  case g:
                  case b:
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
    var T = i, S = a, I = e, D = c, V = r, E = g, R = b, _ = t, z = o, G = n, j = f, X = m, te = !1, F = !1;
    function C(M) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function B(M) {
      return F || (F = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(M) {
      return y(M) === i;
    }
    function Y(M) {
      return y(M) === a;
    }
    function H(M) {
      return typeof M == "object" && M !== null && M.$$typeof === e;
    }
    function K(M) {
      return y(M) === c;
    }
    function q(M) {
      return y(M) === r;
    }
    function Z(M) {
      return y(M) === g;
    }
    function J(M) {
      return y(M) === b;
    }
    function Q(M) {
      return y(M) === t;
    }
    function ee(M) {
      return y(M) === o;
    }
    function ie(M) {
      return y(M) === n;
    }
    function L(M) {
      return y(M) === f;
    }
    function re(M) {
      return y(M) === m;
    }
    ue.ContextConsumer = T, ue.ContextProvider = S, ue.Element = I, ue.ForwardRef = D, ue.Fragment = V, ue.Lazy = E, ue.Memo = R, ue.Portal = _, ue.Profiler = z, ue.StrictMode = G, ue.Suspense = j, ue.SuspenseList = X, ue.isAsyncMode = C, ue.isConcurrentMode = B, ue.isContextConsumer = W, ue.isContextProvider = Y, ue.isElement = H, ue.isForwardRef = K, ue.isFragment = q, ue.isLazy = Z, ue.isMemo = J, ue.isPortal = Q, ue.isProfiler = ee, ue.isStrictMode = ie, ue.isSuspense = L, ue.isSuspenseList = re, ue.isValidElementType = k, ue.typeOf = y;
  }()), ue;
}
process.env.NODE_ENV === "production" ? wo.exports = bd() : wo.exports = yd();
var hn = wo.exports;
const wd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function xd(e) {
  const t = `${e}`.match(wd);
  return t && t[1] || "";
}
function vs(e, t = "") {
  return e.displayName || e.name || xd(e) || t;
}
function Ga(e, t, r) {
  const n = vs(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function kd(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return vs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case hn.ForwardRef:
          return Ga(e, e.render, "ForwardRef");
        case hn.Memo:
          return Ga(e, e.type, "memo");
        default:
          return;
      }
  }
}
function pt(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const Ed = s.oneOfType([s.func, s.object]), zo = Ed;
function rt(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : rr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function xo(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function bs(e, t = 166) {
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
function Nd(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Td(e, t) {
  var r, n;
  return /* @__PURE__ */ N.isValidElement(e) && t.indexOf(
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
function Sd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? P({}, t.propTypes) : null;
  return (o) => (a, i, l, c, f, ...m) => {
    const b = f || i, g = r == null ? void 0 : r[b];
    if (g) {
      const d = g(a, i, l, c, f, ...m);
      if (d)
        return d;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${b}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function gn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Cd = typeof window < "u" ? N.useLayoutEffect : N.useEffect, Bt = Cd;
let Xa = 0;
function Od(e) {
  const [t, r] = N.useState(e), n = e || t;
  return N.useEffect(() => {
    t == null && (Xa += 1, r(`mui-${Xa}`));
  }, [t]), n;
}
const Wa = N["useId".toString()];
function ys(e) {
  if (Wa !== void 0) {
    const t = Wa();
    return e ?? t;
  }
  return Od(e);
}
function Rd(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function ws({
  controlled: e,
  default: t,
  name: r,
  state: n = "value"
}) {
  const {
    current: o
  } = N.useRef(e !== void 0), [a, i] = N.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    N.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${r} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, r, e]);
    const {
      current: f
    } = N.useRef(t);
    N.useEffect(() => {
      !o && f !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = N.useCallback((f) => {
    o || i(f);
  }, []);
  return [l, c];
}
function jr(e) {
  const t = N.useRef(e);
  return Bt(() => {
    t.current = e;
  }), N.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function We(...e) {
  return N.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      gn(r, t);
    });
  }, e);
}
const Ya = {};
function Pd(e, t) {
  const r = N.useRef(Ya);
  return r.current === Ya && (r.current = e(t)), r;
}
const $d = [];
function _d(e) {
  N.useEffect(e, $d);
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
  const e = Pd(Gr.create).current;
  return _d(e.disposeEffect), e;
}
let $n = !0, ko = !1;
const Id = new Gr(), Md = {
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
function Ad(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && Md[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Dd(e) {
  e.metaKey || e.altKey || e.ctrlKey || ($n = !0);
}
function oo() {
  $n = !1;
}
function jd() {
  this.visibilityState === "hidden" && ko && ($n = !0);
}
function Bd(e) {
  e.addEventListener("keydown", Dd, !0), e.addEventListener("mousedown", oo, !0), e.addEventListener("pointerdown", oo, !0), e.addEventListener("touchstart", oo, !0), e.addEventListener("visibilitychange", jd, !0);
}
function Ld(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return $n || Ad(t);
}
function xs() {
  const e = N.useCallback((o) => {
    o != null && Bd(o.ownerDocument);
  }, []), t = N.useRef(!1);
  function r() {
    return t.current ? (ko = !0, Id.start(100, () => {
      ko = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return Ld(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function ks(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Vd(e) {
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
function Fd(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const zd = Number.isInteger || Fd;
function Es(e, t, r, n) {
  const o = e[t];
  if (o == null || !zd(o)) {
    const a = Vd(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function Ns(e, t, ...r) {
  return e[t] === void 0 ? null : Es(e, t, ...r);
}
function Eo() {
  return null;
}
Ns.isRequired = Es;
Eo.isRequired = Eo;
const Ts = process.env.NODE_ENV === "production" ? Eo : Ns;
function Ss(e, t) {
  const r = P({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = P({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = P({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = Ss(o[i], a[i]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function ft(e, t, r = void 0) {
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
const qa = (e) => e, Ud = () => {
  let e = qa;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = qa;
    }
  };
}, Hd = Ud(), Cs = Hd, Os = {
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
  const n = Os[t];
  return n ? `${r}-${n}` : `${Cs.generate(e)}-${t}`;
}
function Nt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = ot(e, o, r);
  }), n;
}
function Gd(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
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
const Xd = ["values", "unit", "step"], Wd = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => P({}, r, {
    [n.key]: n.val
  }), {});
};
function Yd(e) {
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
  } = e, o = ge(e, Xd), a = Wd(t), i = Object.keys(a);
  function l(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - n / 100}${r})`;
  }
  function f(g, d) {
    const h = i.indexOf(d);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : d) - n / 100}${r})`;
  }
  function m(g) {
    return i.indexOf(g) + 1 < i.length ? f(g, i[i.indexOf(g) + 1]) : l(g);
  }
  function b(g) {
    const d = i.indexOf(g);
    return d === 0 ? l(i[1]) : d === i.length - 1 ? c(i[d]) : f(g, i[i.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return P({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: f,
    only: m,
    not: b,
    unit: r
  }, o);
}
const qd = {
  borderRadius: 4
}, Kd = qd, Jd = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, Tt = Jd;
function Or(e, t) {
  return t ? ct(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Uo = {
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
}, Ka = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Uo[e]}px)`
};
function dt(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || Ka;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || Ka;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Uo).indexOf(l) !== -1) {
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
function Zd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function Qd(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function _n(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function vn(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = _n(e, r) || n, t && (o = t(o, n, e)), o;
}
function Ne(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: n,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const l = i[t], c = i.theme, f = _n(c, n) || {};
    return dt(i, l, (b) => {
      let g = vn(f, o, b);
      return b === g && typeof b == "string" && (g = vn(f, o, `${t}${b === "default" ? "" : rt(b)}`, b)), r === !1 ? g : {
        [r]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: Tt
  } : {}, a.filterProps = [t], a;
}
function eu(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const tu = {
  m: "margin",
  p: "padding"
}, ru = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ja = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, nu = eu((e) => {
  if (e.length > 2)
    if (Ja[e])
      e = Ja[e];
    else
      return [e];
  const [t, r] = e.split(""), n = tu[t], o = ru[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), In = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Mn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], ou = [...In, ...Mn];
function Xr(e, t, r, n) {
  var o;
  const a = (o = _n(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Rs(e) {
  return Xr(e, "spacing", 8, "spacing");
}
function Wr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function au(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Wr(t, r), n), {});
}
function iu(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = nu(r), a = au(o, n), i = e[r];
  return dt(e, i, a);
}
function Ps(e, t) {
  const r = Rs(e.theme);
  return Object.keys(e).map((n) => iu(e, t, n, r)).reduce(Or, {});
}
function ye(e) {
  return Ps(e, In);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? In.reduce((e, t) => (e[t] = Tt, e), {}) : {};
ye.filterProps = In;
function we(e) {
  return Ps(e, Mn);
}
we.propTypes = process.env.NODE_ENV !== "production" ? Mn.reduce((e, t) => (e[t] = Tt, e), {}) : {};
we.filterProps = Mn;
process.env.NODE_ENV !== "production" && ou.reduce((e, t) => (e[t] = Tt, e), {});
function su(e = 8) {
  if (e.mui)
    return e;
  const t = Rs({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function An(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? Or(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function Ge(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ke(e, t) {
  return Ne({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const lu = Ke("border", Ge), cu = Ke("borderTop", Ge), pu = Ke("borderRight", Ge), du = Ke("borderBottom", Ge), uu = Ke("borderLeft", Ge), fu = Ke("borderColor"), mu = Ke("borderTopColor"), hu = Ke("borderRightColor"), gu = Ke("borderBottomColor"), vu = Ke("borderLeftColor"), bu = Ke("outline", Ge), yu = Ke("outlineColor"), Dn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Xr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Wr(t, n)
    });
    return dt(e, e.borderRadius, r);
  }
  return null;
};
Dn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Tt
} : {};
Dn.filterProps = ["borderRadius"];
An(lu, cu, pu, du, uu, fu, mu, hu, gu, vu, Dn, bu, yu);
const jn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Xr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Wr(t, n)
    });
    return dt(e, e.gap, r);
  }
  return null;
};
jn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Tt
} : {};
jn.filterProps = ["gap"];
const Bn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Xr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Wr(t, n)
    });
    return dt(e, e.columnGap, r);
  }
  return null;
};
Bn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Tt
} : {};
Bn.filterProps = ["columnGap"];
const Ln = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Xr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Wr(t, n)
    });
    return dt(e, e.rowGap, r);
  }
  return null;
};
Ln.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Tt
} : {};
Ln.filterProps = ["rowGap"];
const wu = Ne({
  prop: "gridColumn"
}), xu = Ne({
  prop: "gridRow"
}), ku = Ne({
  prop: "gridAutoFlow"
}), Eu = Ne({
  prop: "gridAutoColumns"
}), Nu = Ne({
  prop: "gridAutoRows"
}), Tu = Ne({
  prop: "gridTemplateColumns"
}), Su = Ne({
  prop: "gridTemplateRows"
}), Cu = Ne({
  prop: "gridTemplateAreas"
}), Ou = Ne({
  prop: "gridArea"
});
An(jn, Bn, Ln, wu, xu, ku, Eu, Nu, Tu, Su, Cu, Ou);
function Zt(e, t) {
  return t === "grey" ? t : e;
}
const Ru = Ne({
  prop: "color",
  themeKey: "palette",
  transform: Zt
}), Pu = Ne({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Zt
}), $u = Ne({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Zt
});
An(Ru, Pu, $u);
function Fe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const _u = Ne({
  prop: "width",
  transform: Fe
}), Ho = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Uo[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Fe(r)
      };
    };
    return dt(e, e.maxWidth, t);
  }
  return null;
};
Ho.filterProps = ["maxWidth"];
const Iu = Ne({
  prop: "minWidth",
  transform: Fe
}), Mu = Ne({
  prop: "height",
  transform: Fe
}), Au = Ne({
  prop: "maxHeight",
  transform: Fe
}), Du = Ne({
  prop: "minHeight",
  transform: Fe
});
Ne({
  prop: "size",
  cssProperty: "width",
  transform: Fe
});
Ne({
  prop: "size",
  cssProperty: "height",
  transform: Fe
});
const ju = Ne({
  prop: "boxSizing"
});
An(_u, Ho, Iu, Mu, Au, Du, ju);
const Bu = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ge
  },
  borderTop: {
    themeKey: "borders",
    transform: Ge
  },
  borderRight: {
    themeKey: "borders",
    transform: Ge
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ge
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ge
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
    transform: Ge
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Dn
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
    style: Ln
  },
  columnGap: {
    style: Bn
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
    style: Ho
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
}, Go = Bu;
function Lu(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function Vu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Fu() {
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
      themeKey: f,
      transform: m,
      style: b
    } = l;
    if (n == null)
      return null;
    if (f === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const g = _n(o, f) || {};
    return b ? b(i) : dt(i, n, (h) => {
      let u = vn(g, m, h);
      return h === u && typeof h == "string" && (u = vn(g, m, `${r}${h === "default" ? "" : rt(h)}`, h)), c === !1 ? u : {
        [c]: u
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
    const i = (n = a.unstable_sxConfig) != null ? n : Go;
    function l(c) {
      let f = c;
      if (typeof c == "function")
        f = c(a);
      else if (typeof c != "object")
        return c;
      if (!f)
        return null;
      const m = Zd(a.breakpoints), b = Object.keys(m);
      let g = m;
      return Object.keys(f).forEach((d) => {
        const h = Vu(f[d], a);
        if (h != null)
          if (typeof h == "object")
            if (i[d])
              g = Or(g, e(d, h, a, i));
            else {
              const u = dt({
                theme: a
              }, h, (v) => ({
                [d]: v
              }));
              Lu(u, h) ? g[d] = t({
                sx: h,
                theme: a
              }) : g = Or(g, u);
            }
          else
            g = Or(g, e(d, h, a, i));
      }), Qd(b, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const $s = Fu();
$s.filterProps = ["sx"];
const Xo = $s;
function zu(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const Uu = ["breakpoints", "palette", "spacing", "shape"];
function Wo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = ge(e, Uu), l = Yd(r), c = su(o);
  let f = ct({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, n),
    spacing: c,
    shape: P({}, Kd, a)
  }, i);
  return f.applyStyles = zu, f = t.reduce((m, b) => ct(m, b), f), f.unstable_sxConfig = P({}, Go, i == null ? void 0 : i.unstable_sxConfig), f.unstable_sx = function(b) {
    return Xo({
      sx: b,
      theme: this
    });
  }, f;
}
function Hu(e) {
  return Object.keys(e).length === 0;
}
function _s(e = null) {
  const t = N.useContext(Qc);
  return !t || Hu(t) ? e : t;
}
const Gu = Wo();
function Is(e = Gu) {
  return _s(e);
}
const Xu = ["ownerState"], Wu = ["variants"], Yu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function qu(e) {
  return Object.keys(e).length === 0;
}
function Ku(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function ln(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ju = Wo(), Za = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function nn({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return qu(t) ? e : t[r] || t;
}
function Zu(e) {
  return e ? (t, r) => r[e] : null;
}
function cn(e, t) {
  let {
    ownerState: r
  } = t, n = ge(t, Xu);
  const o = typeof e == "function" ? e(P({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => cn(a, P({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = ge(o, Wu);
    return a.forEach((c) => {
      let f = !0;
      typeof c.props == "function" ? f = c.props(P({
        ownerState: r
      }, n, r)) : Object.keys(c.props).forEach((m) => {
        (r == null ? void 0 : r[m]) !== c.props[m] && n[m] !== c.props[m] && (f = !1);
      }), f && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(P({
        ownerState: r
      }, n, r)) : c.style));
    }), l;
  }
  return o;
}
function Qu(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = Ju,
    rootShouldForwardProp: n = ln,
    slotShouldForwardProp: o = ln
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
      slot: f,
      skipVariantsResolver: m,
      skipSx: b,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = Zu(Za(f))
    } = l, d = ge(l, Yu), h = m !== void 0 ? m : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      f && f !== "Root" && f !== "root" || !1
    ), u = b || !1;
    let v;
    process.env.NODE_ENV !== "production" && c && (v = `${c}-${Za(f || "Root")}`);
    let x = ln;
    f === "Root" || f === "root" ? x = n : f ? x = o : Ku(i) && (x = void 0);
    const O = Zc(i, P({
      shouldForwardProp: x,
      label: v
    }, d)), w = (y) => typeof y == "function" && y.__emotion_real !== y || It(y) ? (T) => cn(y, P({}, T, {
      theme: nn({
        theme: T.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, k = (y, ...T) => {
      let S = w(y);
      const I = T ? T.map(w) : [];
      c && g && I.push((E) => {
        const R = nn(P({}, E, {
          defaultTheme: r,
          themeId: t
        }));
        if (!R.components || !R.components[c] || !R.components[c].styleOverrides)
          return null;
        const _ = R.components[c].styleOverrides, z = {};
        return Object.entries(_).forEach(([G, j]) => {
          z[G] = cn(j, P({}, E, {
            theme: R
          }));
        }), g(E, z);
      }), c && !h && I.push((E) => {
        var R;
        const _ = nn(P({}, E, {
          defaultTheme: r,
          themeId: t
        })), z = _ == null || (R = _.components) == null || (R = R[c]) == null ? void 0 : R.variants;
        return cn({
          variants: z
        }, P({}, E, {
          theme: _
        }));
      }), u || I.push(a);
      const D = I.length - T.length;
      if (Array.isArray(y) && D > 0) {
        const E = new Array(D).fill("");
        S = [...y, ...E], S.raw = [...y.raw, ...E];
      }
      const V = O(S, ...I);
      if (process.env.NODE_ENV !== "production") {
        let E;
        c && (E = `${c}${rt(f || "")}`), E === void 0 && (E = `Styled(${kd(i)})`), V.displayName = E;
      }
      return i.muiName && (V.muiName = i.muiName), V;
    };
    return O.withConfig && (k.withConfig = O.withConfig), k;
  };
}
function ef(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : Ss(t.components[r].defaultProps, n);
}
function tf({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = Is(r);
  return n && (o = o[n] || o), ef({
    theme: o,
    name: t,
    props: e
  });
}
function Yo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Gd(e, t, r);
}
function rf(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Lt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Lt(rf(e));
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
function Vn(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function nf(e) {
  e = Lt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (f, m = (f + r / 30) % 12) => o - a * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Vn({
    type: l,
    values: c
  });
}
function Qa(e) {
  e = Lt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Lt(nf(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function ei(e, t) {
  const r = Qa(e), n = Qa(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function bn(e, t) {
  return e = Lt(e), t = Yo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Vn(e);
}
function of(e, t) {
  if (e = Lt(e), t = Yo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Vn(e);
}
function af(e, t) {
  if (e = Lt(e), t = Yo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Vn(e);
}
function sf(e, t) {
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
const lf = {
  black: "#000",
  white: "#fff"
}, Br = lf, cf = {
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
}, pf = cf, df = {
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
}, Ut = df, uf = {
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
}, Ht = uf, ff = {
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
}, vr = ff, mf = {
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
}, Gt = mf, hf = {
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
}, Xt = hf, gf = {
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
}, Wt = gf, vf = ["mode", "contrastThreshold", "tonalOffset"], ti = {
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
    paper: Br.white,
    default: Br.white
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
}, ao = {
  text: {
    primary: Br.white,
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
    active: Br.white,
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
function ri(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = af(e.main, o) : t === "dark" && (e.dark = of(e.main, a)));
}
function bf(e = "light") {
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
function yf(e = "light") {
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
function wf(e = "light") {
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
function xf(e = "light") {
  return e === "dark" ? {
    main: Xt[400],
    light: Xt[300],
    dark: Xt[700]
  } : {
    main: Xt[700],
    light: Xt[500],
    dark: Xt[900]
  };
}
function kf(e = "light") {
  return e === "dark" ? {
    main: Wt[400],
    light: Wt[300],
    dark: Wt[700]
  } : {
    main: Wt[800],
    light: Wt[500],
    dark: Wt[900]
  };
}
function Ef(e = "light") {
  return e === "dark" ? {
    main: vr[400],
    light: vr[300],
    dark: vr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: vr[500],
    dark: vr[900]
  };
}
function Nf(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = ge(e, vf), a = e.primary || bf(t), i = e.secondary || yf(t), l = e.error || wf(t), c = e.info || xf(t), f = e.success || kf(t), m = e.warning || Ef(t);
  function b(u) {
    const v = ei(u, ao.text.primary) >= r ? ao.text.primary : ti.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = ei(u, v);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${v} on ${u}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return v;
  }
  const g = ({
    color: u,
    name: v,
    mainShade: x = 500,
    lightShade: O = 300,
    darkShade: w = 700
  }) => {
    if (u = P({}, u), !u.main && u[x] && (u.main = u[x]), !u.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : rr(11, v ? ` (${v})` : "", x));
    if (typeof u.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${v ? ` (${v})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : rr(12, v ? ` (${v})` : "", JSON.stringify(u.main)));
    return ri(u, "light", O, n), ri(u, "dark", w, n), u.contrastText || (u.contrastText = b(u.main)), u;
  }, d = {
    dark: ao,
    light: ti
  };
  return process.env.NODE_ENV !== "production" && (d[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), ct(P({
    // A collection of common colors.
    common: P({}, Br),
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
      color: l,
      name: "error"
    }),
    // The colors used to represent potentially dangerous actions or important messages.
    warning: g({
      color: m,
      name: "warning"
    }),
    // The colors used to present information to the user that is neutral and not necessarily important.
    info: g({
      color: c,
      name: "info"
    }),
    // The colors used to indicate the successful completion of an action that user triggered.
    success: g({
      color: f,
      name: "success"
    }),
    // The grey colors.
    grey: pf,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: b,
    // Generate a rich color object.
    augmentColor: g,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, d[t]), o);
}
const Tf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Sf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ni = {
  textTransform: "uppercase"
}, oi = '"Roboto", "Helvetica", "Arial", sans-serif';
function Cf(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = oi,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: f = 16,
    // Apply the CSS properties to all the variants.
    allVariants: m,
    pxToRem: b
  } = r, g = ge(r, Tf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof f != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const d = o / 14, h = b || ((x) => `${x / f * d}rem`), u = (x, O, w, k, y) => P({
    fontFamily: n,
    fontWeight: x,
    fontSize: h(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === oi ? {
    letterSpacing: `${Sf(k / O)}em`
  } : {}, y, m), v = {
    h1: u(a, 96, 1.167, -1.5),
    h2: u(a, 60, 1.2, -0.5),
    h3: u(i, 48, 1.167, 0),
    h4: u(i, 34, 1.235, 0.25),
    h5: u(i, 24, 1.334, 0),
    h6: u(l, 20, 1.6, 0.15),
    subtitle1: u(i, 16, 1.75, 0.15),
    subtitle2: u(l, 14, 1.57, 0.1),
    body1: u(i, 16, 1.5, 0.15),
    body2: u(i, 14, 1.43, 0.15),
    button: u(l, 14, 1.75, 0.4, ni),
    caption: u(i, 12, 1.66, 0.4),
    overline: u(i, 12, 2.66, 1, ni),
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
    htmlFontSize: f,
    pxToRem: h,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, v), g, {
    clone: !1
    // No need to clone deep
  });
}
const Of = 0.2, Rf = 0.14, Pf = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Of})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Rf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Pf})`].join(",");
}
const $f = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], _f = $f, If = ["duration", "easing", "delay"], Mf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Af = {
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
function ai(e) {
  return `${Math.round(e)}ms`;
}
function Df(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function jf(e) {
  const t = P({}, Mf, e.easing), r = P({}, Af, e.duration);
  return P({
    getAutoHeightDuration: Df,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, f = ge(a, If);
      if (process.env.NODE_ENV !== "production") {
        const m = (g) => typeof g == "string", b = (g) => !isNaN(parseFloat(g));
        !m(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !b(i) && !m(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), m(l) || console.error('MUI: Argument "easing" must be a string.'), !b(c) && !m(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(f).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((m) => `${m} ${typeof i == "string" ? i : ai(i)} ${l} ${typeof c == "string" ? c : ai(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const Bf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Lf = Bf, Vf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Ff(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = ge(e, Vf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : rr(18));
  const l = Nf(n), c = Wo(e);
  let f = ct(c, {
    mixins: sf(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: _f.slice(),
    typography: Cf(l, a),
    transitions: jf(o),
    zIndex: P({}, Lf)
  });
  if (f = ct(f, i), f = t.reduce((m, b) => ct(m, b), f), process.env.NODE_ENV !== "production") {
    const m = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], b = (g, d) => {
      let h;
      for (h in g) {
        const u = g[h];
        if (m.indexOf(h) !== -1 && Object.keys(u).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const v = ot("", h);
            console.error([`MUI: The \`${d}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(g, null, 2), "", `Instead, you need to use the '&.${v}' syntax:`, JSON.stringify({
              root: {
                [`&.${v}`]: u
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          g[h] = {};
        }
      }
    };
    Object.keys(f.components).forEach((g) => {
      const d = f.components[g].styleOverrides;
      d && g.indexOf("Mui") === 0 && b(d, g);
    });
  }
  return f.unstable_sxConfig = P({}, Go, i == null ? void 0 : i.unstable_sxConfig), f.unstable_sx = function(b) {
    return Xo({
      sx: b,
      theme: this
    });
  }, f;
}
const zf = Ff(), qo = zf, Ko = "$$material";
function mt({
  props: e,
  name: t
}) {
  return tf({
    props: e,
    name: t,
    defaultTheme: qo,
    themeId: Ko
  });
}
const Ms = (e) => ln(e) && e !== "classes", Uf = Qu({
  themeId: Ko,
  defaultTheme: qo,
  rootShouldForwardProp: Ms
}), Pe = Uf;
function Hf(e) {
  return ot("MuiSvgIcon", e);
}
Nt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Gf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Xf = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${rt(t)}`, `fontSize${rt(r)}`]
  };
  return ft(o, Hf, n);
}, Wf = Pe("svg", {
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
  var r, n, o, a, i, l, c, f, m, b, g, d, h;
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
      large: ((f = e.typography) == null || (m = f.pxToRem) == null ? void 0 : m.call(f, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (b = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? b : {
      action: (d = (e.vars || e).palette) == null || (d = d.action) == null ? void 0 : d.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Jo = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = mt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: f,
    inheritViewBox: m = !1,
    titleAccess: b,
    viewBox: g = "0 0 24 24"
  } = n, d = ge(n, Gf), h = /* @__PURE__ */ N.isValidElement(o) && o.type === "svg", u = P({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: g,
    hasSvgAsChild: h
  }), v = {};
  m || (v.viewBox = g);
  const x = Xf(u);
  return /* @__PURE__ */ $(Wf, P({
    as: l,
    className: Oe(x.root, a),
    focusable: "false",
    color: f,
    "aria-hidden": b ? void 0 : !0,
    role: b ? "img" : void 0,
    ref: r
  }, v, d, h && o.props, {
    ownerState: u,
    children: [h ? o.props.children : o, b ? /* @__PURE__ */ p("title", {
      children: b
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Jo.propTypes = {
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
Jo.muiName = "SvgIcon";
const ii = Jo;
function As(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ p(ii, P({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = ii.muiName, /* @__PURE__ */ N.memo(/* @__PURE__ */ N.forwardRef(r));
}
const Yf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Cs.configure(e);
  }
}, qf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: rt,
  createChainedFunction: xo,
  createSvgIcon: As,
  debounce: bs,
  deprecatedPropType: Nd,
  isMuiElement: Td,
  ownerDocument: Re,
  ownerWindow: nr,
  requirePropFactory: Sd,
  setRef: gn,
  unstable_ClassNameGenerator: Yf,
  unstable_useEnhancedEffect: Bt,
  unstable_useId: ys,
  unsupportedProp: Rd,
  useControlled: ws,
  useEventCallback: jr,
  useForkRef: We,
  useIsFocusVisible: xs
}, Symbol.toStringTag, { value: "Module" })), Kf = /* @__PURE__ */ rd(qf);
var si;
function Jf() {
  return si || (si = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Kf;
  }(Jn)), Jn;
}
var Zf = nd;
Object.defineProperty(Vo, "__esModule", {
  value: !0
});
var Ds = Vo.default = void 0, Qf = Zf(Jf()), em = ac;
Ds = Vo.default = (0, Qf.default)(/* @__PURE__ */ (0, em.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function js(e) {
  return typeof e == "string";
}
function Nr(e, t, r) {
  return e === void 0 || js(e) ? t : P({}, t, {
    ownerState: P({}, t.ownerState, r)
  });
}
const tm = {
  disableDefaultClasses: !1
}, rm = /* @__PURE__ */ N.createContext(tm);
function nm(e) {
  const {
    disableDefaultClasses: t
  } = N.useContext(rm);
  return (r) => t ? "" : e(r);
}
function Bs(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function om(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function li(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function am(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const d = Oe(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = P({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), u = P({}, r, o, n);
    return d.length > 0 && (u.className = d), Object.keys(h).length > 0 && (u.style = h), {
      props: u,
      internalRef: void 0
    };
  }
  const i = Bs(P({}, o, n)), l = li(n), c = li(o), f = t(i), m = Oe(f == null ? void 0 : f.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), b = P({}, f == null ? void 0 : f.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = P({}, f, r, c, l);
  return m.length > 0 && (g.className = m), Object.keys(b).length > 0 && (g.style = b), {
    props: g,
    internalRef: f.ref
  };
}
const im = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Vt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = ge(e, im), l = a ? {} : om(n, o), {
    props: c,
    internalRef: f
  } = am(P({}, i, {
    externalSlotProps: l
  })), m = We(f, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return Nr(r, P({}, c, {
    ref: m
  }), o);
}
const Ls = "base";
function sm(e) {
  return `${Ls}--${e}`;
}
function lm(e, t) {
  return `${Ls}-${e}-${t}`;
}
function Vs(e, t) {
  const r = Os[t];
  return r ? sm(r) : lm(e, t);
}
function cm(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Vs(e, n);
  }), r;
}
const pm = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function dm(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function um(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function fm(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || um(e));
}
function mm(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(pm)).forEach((n, o) => {
    const a = dm(n);
    a === -1 || !fm(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function hm() {
  return !0;
}
function yn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = mm,
    isEnabled: i = hm,
    open: l
  } = e, c = N.useRef(!1), f = N.useRef(null), m = N.useRef(null), b = N.useRef(null), g = N.useRef(null), d = N.useRef(!1), h = N.useRef(null), u = We(t.ref, h), v = N.useRef(null);
  N.useEffect(() => {
    !l || !h.current || (d.current = !r);
  }, [r, l]), N.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Re(h.current);
    return h.current.contains(w.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), d.current && h.current.focus()), () => {
      o || (b.current && b.current.focus && (c.current = !0, b.current.focus()), b.current = null);
    };
  }, [l]), N.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Re(h.current), k = (S) => {
      v.current = S, !(n || !i() || S.key !== "Tab") && w.activeElement === h.current && S.shiftKey && (c.current = !0, m.current && m.current.focus());
    }, y = () => {
      const S = h.current;
      if (S === null)
        return;
      if (!w.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (S.contains(w.activeElement) || n && w.activeElement !== f.current && w.activeElement !== m.current)
        return;
      if (w.activeElement !== g.current)
        g.current = null;
      else if (g.current !== null)
        return;
      if (!d.current)
        return;
      let I = [];
      if ((w.activeElement === f.current || w.activeElement === m.current) && (I = a(h.current)), I.length > 0) {
        var D, V;
        const E = !!((D = v.current) != null && D.shiftKey && ((V = v.current) == null ? void 0 : V.key) === "Tab"), R = I[0], _ = I[I.length - 1];
        typeof R != "string" && typeof _ != "string" && (E ? _.focus() : R.focus());
      } else
        S.focus();
    };
    w.addEventListener("focusin", y), w.addEventListener("keydown", k, !0);
    const T = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(T), w.removeEventListener("focusin", y), w.removeEventListener("keydown", k, !0);
    };
  }, [r, n, o, i, l, a]);
  const x = (w) => {
    b.current === null && (b.current = w.relatedTarget), d.current = !0, g.current = w.target;
    const k = t.props.onFocus;
    k && k(w);
  }, O = (w) => {
    b.current === null && (b.current = w.relatedTarget), d.current = !0;
  };
  return /* @__PURE__ */ $(N.Fragment, {
    children: [/* @__PURE__ */ p("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: f,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ N.cloneElement(t, {
      ref: u,
      onFocus: x
    }), /* @__PURE__ */ p("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (yn.propTypes = {
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
process.env.NODE_ENV !== "production" && (yn["propTypes"] = gs(yn.propTypes));
function gm(e) {
  return typeof e == "function" ? e() : e;
}
const Lr = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = N.useState(null), c = We(/* @__PURE__ */ N.isValidElement(n) ? n.ref : null, r);
  if (Bt(() => {
    a || l(gm(o) || document.body);
  }, [o, a]), Bt(() => {
    if (i && !a)
      return gn(r, i), () => {
        gn(r, null);
      };
  }, [r, i, a]), a) {
    if (/* @__PURE__ */ N.isValidElement(n)) {
      const f = {
        ref: c
      };
      return /* @__PURE__ */ N.cloneElement(n, f);
    }
    return /* @__PURE__ */ p(N.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ p(N.Fragment, {
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
  container: s.oneOfType([pt, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (Lr["propTypes"] = gs(Lr.propTypes));
function vm(e) {
  const t = Re(e);
  return t.body === e ? nr(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Rr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function ci(e) {
  return parseInt(nr(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function bm(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function pi(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !bm(i);
    l && c && Rr(i, o);
  });
}
function io(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function ym(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (vm(n)) {
      const i = ks(Re(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${ci(n) + i}px`;
      const l = Re(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${ci(c) + i}px`;
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
function wm(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class xm {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Rr(t.modalRef, !1);
    const o = wm(r);
    pi(r, t.mount, t.modalRef, o, !0);
    const a = io(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = io(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = ym(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = io(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Rr(t.modalRef, r), pi(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
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
function km(e) {
  return typeof e == "function" ? e() : e;
}
function Em(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Nm = new xm();
function Tm(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Nm,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: f,
    open: m,
    rootRef: b
  } = e, g = N.useRef({}), d = N.useRef(null), h = N.useRef(null), u = We(h, b), [v, x] = N.useState(!m), O = Em(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const k = () => Re(d.current), y = () => (g.current.modalRef = h.current, g.current.mount = d.current, g.current), T = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, S = jr(() => {
    const j = km(t) || k().body;
    o.add(y(), j), h.current && T();
  }), I = N.useCallback(() => o.isTopModal(y()), [o]), D = jr((j) => {
    d.current = j, j && (m && I() ? T() : h.current && Rr(h.current, w));
  }), V = N.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  N.useEffect(() => () => {
    V();
  }, [V]), N.useEffect(() => {
    m ? S() : (!O || !a) && V();
  }, [m, V, O, a, S]);
  const E = (j) => (X) => {
    var te;
    (te = j.onKeyDown) == null || te.call(j, X), !(X.key !== "Escape" || X.which === 229 || // Wait until IME is settled.
    !I()) && (r || (X.stopPropagation(), f && f(X, "escapeKeyDown")));
  }, R = (j) => (X) => {
    var te;
    (te = j.onClick) == null || te.call(j, X), X.target === X.currentTarget && f && f(X, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const X = Bs(e);
      delete X.onTransitionEnter, delete X.onTransitionExited;
      const te = P({}, X, j);
      return P({
        role: "presentation"
      }, te, {
        onKeyDown: E(te),
        ref: u
      });
    },
    getBackdropProps: (j = {}) => {
      const X = j;
      return P({
        "aria-hidden": !0
      }, X, {
        onClick: R(X),
        open: m
      });
    },
    getTransitionProps: () => {
      const j = () => {
        x(!1), i && i();
      }, X = () => {
        x(!0), l && l(), a && V();
      };
      return {
        onEnter: xo(j, c == null ? void 0 : c.props.onEnter),
        onExited: xo(X, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: u,
    portalRef: D,
    isTopModal: I,
    exited: v,
    hasTransition: O
  };
}
var Me = "top", Ye = "bottom", qe = "right", Ae = "left", Zo = "auto", Yr = [Me, Ye, qe, Ae], or = "start", Vr = "end", Sm = "clippingParents", Fs = "viewport", br = "popper", Cm = "reference", di = /* @__PURE__ */ Yr.reduce(function(e, t) {
  return e.concat([t + "-" + or, t + "-" + Vr]);
}, []), zs = /* @__PURE__ */ [].concat(Yr, [Zo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + or, t + "-" + Vr]);
}, []), Om = "beforeRead", Rm = "read", Pm = "afterRead", $m = "beforeMain", _m = "main", Im = "afterMain", Mm = "beforeWrite", Am = "write", Dm = "afterWrite", jm = [Om, Rm, Pm, $m, _m, Im, Mm, Am, Dm];
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
function Xe(e) {
  var t = ze(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Qo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ze(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Bm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Xe(a) || !nt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Lm(e) {
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
      var o = t.elements[n], a = t.attributes[n] || {}, i = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), l = i.reduce(function(c, f) {
        return c[f] = "", c;
      }, {});
      !Xe(o) || !nt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Vm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Bm,
  effect: Lm,
  requires: ["computeStyles"]
};
function et(e) {
  return e.split("-")[0];
}
var Dt = Math.max, wn = Math.min, ar = Math.round;
function No() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Us() {
  return !/^((?!chrome|android).)*safari/i.test(No());
}
function ir(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Xe(e) && (o = e.offsetWidth > 0 && ar(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && ar(n.height) / e.offsetHeight || 1);
  var i = Ft(e) ? ze(e) : window, l = i.visualViewport, c = !Us() && r, f = (n.left + (c && l ? l.offsetLeft : 0)) / o, m = (n.top + (c && l ? l.offsetTop : 0)) / a, b = n.width / o, g = n.height / a;
  return {
    width: b,
    height: g,
    top: m,
    right: f + b,
    bottom: m + g,
    left: f,
    x: f,
    y: m
  };
}
function ea(e) {
  var t = ir(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Hs(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Qo(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function ut(e) {
  return ze(e).getComputedStyle(e);
}
function Fm(e) {
  return ["table", "td", "th"].indexOf(nt(e)) >= 0;
}
function St(e) {
  return ((Ft(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Fn(e) {
  return nt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Qo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    St(e)
  );
}
function ui(e) {
  return !Xe(e) || // https://github.com/popperjs/popper-core/issues/837
  ut(e).position === "fixed" ? null : e.offsetParent;
}
function zm(e) {
  var t = /firefox/i.test(No()), r = /Trident/i.test(No());
  if (r && Xe(e)) {
    var n = ut(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Fn(e);
  for (Qo(o) && (o = o.host); Xe(o) && ["html", "body"].indexOf(nt(o)) < 0; ) {
    var a = ut(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function qr(e) {
  for (var t = ze(e), r = ui(e); r && Fm(r) && ut(r).position === "static"; )
    r = ui(r);
  return r && (nt(r) === "html" || nt(r) === "body" && ut(r).position === "static") ? t : r || zm(e) || t;
}
function ta(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Pr(e, t, r) {
  return Dt(e, wn(t, r));
}
function Um(e, t, r) {
  var n = Pr(e, t, r);
  return n > r ? r : n;
}
function Gs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Xs(e) {
  return Object.assign({}, Gs(), e);
}
function Ws(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var Hm = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Xs(typeof t != "number" ? t : Ws(t, Yr));
};
function Gm(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = et(r.placement), c = ta(l), f = [Ae, qe].indexOf(l) >= 0, m = f ? "height" : "width";
  if (!(!a || !i)) {
    var b = Hm(o.padding, r), g = ea(a), d = c === "y" ? Me : Ae, h = c === "y" ? Ye : qe, u = r.rects.reference[m] + r.rects.reference[c] - i[c] - r.rects.popper[m], v = i[c] - r.rects.reference[c], x = qr(a), O = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = u / 2 - v / 2, k = b[d], y = O - g[m] - b[h], T = O / 2 - g[m] / 2 + w, S = Pr(k, T, y), I = c;
    r.modifiersData[n] = (t = {}, t[I] = S, t.centerOffset = S - T, t);
  }
}
function Xm(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Hs(t.elements.popper, o) && (t.elements.arrow = o));
}
const Wm = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Gm,
  effect: Xm,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function sr(e) {
  return e.split("-")[1];
}
var Ym = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function qm(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: ar(r * o) / o || 0,
    y: ar(n * o) / o || 0
  };
}
function fi(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, f = e.adaptive, m = e.roundOffsets, b = e.isFixed, g = i.x, d = g === void 0 ? 0 : g, h = i.y, u = h === void 0 ? 0 : h, v = typeof m == "function" ? m({
    x: d,
    y: u
  }) : {
    x: d,
    y: u
  };
  d = v.x, u = v.y;
  var x = i.hasOwnProperty("x"), O = i.hasOwnProperty("y"), w = Ae, k = Me, y = window;
  if (f) {
    var T = qr(r), S = "clientHeight", I = "clientWidth";
    if (T === ze(r) && (T = St(r), ut(T).position !== "static" && l === "absolute" && (S = "scrollHeight", I = "scrollWidth")), T = T, o === Me || (o === Ae || o === qe) && a === Vr) {
      k = Ye;
      var D = b && T === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[S]
      );
      u -= D - n.height, u *= c ? 1 : -1;
    }
    if (o === Ae || (o === Me || o === Ye) && a === Vr) {
      w = qe;
      var V = b && T === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[I]
      );
      d -= V - n.width, d *= c ? 1 : -1;
    }
  }
  var E = Object.assign({
    position: l
  }, f && Ym), R = m === !0 ? qm({
    x: d,
    y: u
  }, ze(r)) : {
    x: d,
    y: u
  };
  if (d = R.x, u = R.y, c) {
    var _;
    return Object.assign({}, E, (_ = {}, _[k] = O ? "0" : "", _[w] = x ? "0" : "", _.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + u + "px)" : "translate3d(" + d + "px, " + u + "px, 0)", _));
  }
  return Object.assign({}, E, (t = {}, t[k] = O ? u + "px" : "", t[w] = x ? d + "px" : "", t.transform = "", t));
}
function Km(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, f = {
    placement: et(t.placement),
    variation: sr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, fi(Object.assign({}, f, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, fi(Object.assign({}, f, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Jm = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Km,
  data: {}
};
var on = {
  passive: !0
};
function Zm(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = ze(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && f.forEach(function(m) {
    m.addEventListener("scroll", r.update, on);
  }), l && c.addEventListener("resize", r.update, on), function() {
    a && f.forEach(function(m) {
      m.removeEventListener("scroll", r.update, on);
    }), l && c.removeEventListener("resize", r.update, on);
  };
}
const Qm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Zm,
  data: {}
};
var eh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function pn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return eh[t];
  });
}
var th = {
  start: "end",
  end: "start"
};
function mi(e) {
  return e.replace(/start|end/g, function(t) {
    return th[t];
  });
}
function ra(e) {
  var t = ze(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function na(e) {
  return ir(St(e)).left + ra(e).scrollLeft;
}
function rh(e, t) {
  var r = ze(e), n = St(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var f = Us();
    (f || !f && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + na(e),
    y: c
  };
}
function nh(e) {
  var t, r = St(e), n = ra(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = Dt(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Dt(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + na(e), c = -n.scrollTop;
  return ut(o || r).direction === "rtl" && (l += Dt(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function oa(e) {
  var t = ut(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function Ys(e) {
  return ["html", "body", "#document"].indexOf(nt(e)) >= 0 ? e.ownerDocument.body : Xe(e) && oa(e) ? e : Ys(Fn(e));
}
function $r(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Ys(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ze(n), i = o ? [a].concat(a.visualViewport || [], oa(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat($r(Fn(i)))
  );
}
function To(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function oh(e, t) {
  var r = ir(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function hi(e, t, r) {
  return t === Fs ? To(rh(e, r)) : Ft(t) ? oh(t, r) : To(nh(St(e)));
}
function ah(e) {
  var t = $r(Fn(e)), r = ["absolute", "fixed"].indexOf(ut(e).position) >= 0, n = r && Xe(e) ? qr(e) : e;
  return Ft(n) ? t.filter(function(o) {
    return Ft(o) && Hs(o, n) && nt(o) !== "body";
  }) : [];
}
function ih(e, t, r, n) {
  var o = t === "clippingParents" ? ah(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, f) {
    var m = hi(e, f, n);
    return c.top = Dt(m.top, c.top), c.right = wn(m.right, c.right), c.bottom = wn(m.bottom, c.bottom), c.left = Dt(m.left, c.left), c;
  }, hi(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function qs(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? et(n) : null, a = n ? sr(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
  switch (o) {
    case Me:
      c = {
        x: i,
        y: t.y - r.height
      };
      break;
    case Ye:
      c = {
        x: i,
        y: t.y + t.height
      };
      break;
    case qe:
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
  var f = o ? ta(o) : null;
  if (f != null) {
    var m = f === "y" ? "height" : "width";
    switch (a) {
      case or:
        c[f] = c[f] - (t[m] / 2 - r[m] / 2);
        break;
      case Vr:
        c[f] = c[f] + (t[m] / 2 - r[m] / 2);
        break;
    }
  }
  return c;
}
function Fr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? Sm : l, f = r.rootBoundary, m = f === void 0 ? Fs : f, b = r.elementContext, g = b === void 0 ? br : b, d = r.altBoundary, h = d === void 0 ? !1 : d, u = r.padding, v = u === void 0 ? 0 : u, x = Xs(typeof v != "number" ? v : Ws(v, Yr)), O = g === br ? Cm : br, w = e.rects.popper, k = e.elements[h ? O : g], y = ih(Ft(k) ? k : k.contextElement || St(e.elements.popper), c, m, i), T = ir(e.elements.reference), S = qs({
    reference: T,
    element: w,
    strategy: "absolute",
    placement: o
  }), I = To(Object.assign({}, w, S)), D = g === br ? I : T, V = {
    top: y.top - D.top + x.top,
    bottom: D.bottom - y.bottom + x.bottom,
    left: y.left - D.left + x.left,
    right: D.right - y.right + x.right
  }, E = e.modifiersData.offset;
  if (g === br && E) {
    var R = E[o];
    Object.keys(V).forEach(function(_) {
      var z = [qe, Ye].indexOf(_) >= 0 ? 1 : -1, G = [Me, Ye].indexOf(_) >= 0 ? "y" : "x";
      V[_] += R[G] * z;
    });
  }
  return V;
}
function sh(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, f = c === void 0 ? zs : c, m = sr(n), b = m ? l ? di : di.filter(function(h) {
    return sr(h) === m;
  }) : Yr, g = b.filter(function(h) {
    return f.indexOf(h) >= 0;
  });
  g.length === 0 && (g = b);
  var d = g.reduce(function(h, u) {
    return h[u] = Fr(e, {
      placement: u,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[et(u)], h;
  }, {});
  return Object.keys(d).sort(function(h, u) {
    return d[h] - d[u];
  });
}
function lh(e) {
  if (et(e) === Zo)
    return [];
  var t = pn(e);
  return [mi(e), t, mi(t)];
}
function ch(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, f = r.padding, m = r.boundary, b = r.rootBoundary, g = r.altBoundary, d = r.flipVariations, h = d === void 0 ? !0 : d, u = r.allowedAutoPlacements, v = t.options.placement, x = et(v), O = x === v, w = c || (O || !h ? [pn(v)] : lh(v)), k = [v].concat(w).reduce(function(H, K) {
      return H.concat(et(K) === Zo ? sh(t, {
        placement: K,
        boundary: m,
        rootBoundary: b,
        padding: f,
        flipVariations: h,
        allowedAutoPlacements: u
      }) : K);
    }, []), y = t.rects.reference, T = t.rects.popper, S = /* @__PURE__ */ new Map(), I = !0, D = k[0], V = 0; V < k.length; V++) {
      var E = k[V], R = et(E), _ = sr(E) === or, z = [Me, Ye].indexOf(R) >= 0, G = z ? "width" : "height", j = Fr(t, {
        placement: E,
        boundary: m,
        rootBoundary: b,
        altBoundary: g,
        padding: f
      }), X = z ? _ ? qe : Ae : _ ? Ye : Me;
      y[G] > T[G] && (X = pn(X));
      var te = pn(X), F = [];
      if (a && F.push(j[R] <= 0), l && F.push(j[X] <= 0, j[te] <= 0), F.every(function(H) {
        return H;
      })) {
        D = E, I = !1;
        break;
      }
      S.set(E, F);
    }
    if (I)
      for (var C = h ? 3 : 1, B = function(K) {
        var q = k.find(function(Z) {
          var J = S.get(Z);
          if (J)
            return J.slice(0, K).every(function(Q) {
              return Q;
            });
        });
        if (q)
          return D = q, "break";
      }, W = C; W > 0; W--) {
        var Y = B(W);
        if (Y === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[n]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const ph = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ch,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function gi(e, t, r) {
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
function vi(e) {
  return [Me, qe, Ye, Ae].some(function(t) {
    return e[t] >= 0;
  });
}
function dh(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Fr(t, {
    elementContext: "reference"
  }), l = Fr(t, {
    altBoundary: !0
  }), c = gi(i, n), f = gi(l, o, a), m = vi(c), b = vi(f);
  t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: f,
    isReferenceHidden: m,
    hasPopperEscaped: b
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": m,
    "data-popper-escaped": b
  });
}
const uh = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: dh
};
function fh(e, t, r) {
  var n = et(e), o = [Ae, Me].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Ae, qe].indexOf(n) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function mh(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = zs.reduce(function(m, b) {
    return m[b] = fh(b, t.rects, a), m;
  }, {}), l = i[t.placement], c = l.x, f = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += f), t.modifiersData[n] = i;
}
const hh = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: mh
};
function gh(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = qs({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const vh = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: gh,
  data: {}
};
function bh(e) {
  return e === "x" ? "y" : "x";
}
function yh(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, f = r.rootBoundary, m = r.altBoundary, b = r.padding, g = r.tether, d = g === void 0 ? !0 : g, h = r.tetherOffset, u = h === void 0 ? 0 : h, v = Fr(t, {
    boundary: c,
    rootBoundary: f,
    padding: b,
    altBoundary: m
  }), x = et(t.placement), O = sr(t.placement), w = !O, k = ta(x), y = bh(k), T = t.modifiersData.popperOffsets, S = t.rects.reference, I = t.rects.popper, D = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, V = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), E = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (T) {
    if (a) {
      var _, z = k === "y" ? Me : Ae, G = k === "y" ? Ye : qe, j = k === "y" ? "height" : "width", X = T[k], te = X + v[z], F = X - v[G], C = d ? -I[j] / 2 : 0, B = O === or ? S[j] : I[j], W = O === or ? -I[j] : -S[j], Y = t.elements.arrow, H = d && Y ? ea(Y) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Gs(), q = K[z], Z = K[G], J = Pr(0, S[j], H[j]), Q = w ? S[j] / 2 - C - J - q - V.mainAxis : B - J - q - V.mainAxis, ee = w ? -S[j] / 2 + C + J + Z + V.mainAxis : W + J + Z + V.mainAxis, ie = t.elements.arrow && qr(t.elements.arrow), L = ie ? k === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, re = (_ = E == null ? void 0 : E[k]) != null ? _ : 0, M = X + Q - re - L, se = X + ee - re, Te = Pr(d ? wn(te, M) : te, X, d ? Dt(F, se) : F);
      T[k] = Te, R[k] = Te - X;
    }
    if (l) {
      var $e, Ee = k === "x" ? Me : Ae, Ct = k === "x" ? Ye : qe, _e = T[y], at = y === "y" ? "height" : "width", Be = _e + v[Ee], it = _e - v[Ct], Se = [Me, Ae].indexOf(x) !== -1, zt = ($e = E == null ? void 0 : E[y]) != null ? $e : 0, Ot = Se ? Be : _e - S[at] - I[at] - zt + V.altAxis, pr = Se ? _e + S[at] + I[at] - zt - V.altAxis : it, Zr = d && Se ? Um(Ot, _e, pr) : Pr(d ? Ot : Be, _e, d ? pr : it);
      T[y] = Zr, R[y] = Zr - _e;
    }
    t.modifiersData[n] = R;
  }
}
const wh = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: yh,
  requiresIfExists: ["offset"]
};
function xh(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function kh(e) {
  return e === ze(e) || !Xe(e) ? ra(e) : xh(e);
}
function Eh(e) {
  var t = e.getBoundingClientRect(), r = ar(t.width) / e.offsetWidth || 1, n = ar(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Nh(e, t, r) {
  r === void 0 && (r = !1);
  var n = Xe(t), o = Xe(t) && Eh(t), a = St(t), i = ir(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((nt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  oa(a)) && (l = kh(t)), Xe(t) ? (c = ir(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = na(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Th(e) {
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
function Sh(e) {
  var t = Th(e);
  return jm.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Ch(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function Oh(e) {
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
var bi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function yi() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Rh(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? bi : o;
  return function(l, c, f) {
    f === void 0 && (f = a);
    var m = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, bi, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, b = [], g = !1, d = {
      state: m,
      setOptions: function(x) {
        var O = typeof x == "function" ? x(m.options) : x;
        u(), m.options = Object.assign({}, a, m.options, O), m.scrollParents = {
          reference: Ft(l) ? $r(l) : l.contextElement ? $r(l.contextElement) : [],
          popper: $r(c)
        };
        var w = Sh(Oh([].concat(n, m.options.modifiers)));
        return m.orderedModifiers = w.filter(function(k) {
          return k.enabled;
        }), h(), d.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var x = m.elements, O = x.reference, w = x.popper;
          if (yi(O, w)) {
            m.rects = {
              reference: Nh(O, qr(w), m.options.strategy === "fixed"),
              popper: ea(w)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(V) {
              return m.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var k = 0; k < m.orderedModifiers.length; k++) {
              if (m.reset === !0) {
                m.reset = !1, k = -1;
                continue;
              }
              var y = m.orderedModifiers[k], T = y.fn, S = y.options, I = S === void 0 ? {} : S, D = y.name;
              typeof T == "function" && (m = T({
                state: m,
                options: I,
                name: D,
                instance: d
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Ch(function() {
        return new Promise(function(v) {
          d.forceUpdate(), v(m);
        });
      }),
      destroy: function() {
        u(), g = !0;
      }
    };
    if (!yi(l, c))
      return d;
    d.setOptions(f).then(function(v) {
      !g && f.onFirstUpdate && f.onFirstUpdate(v);
    });
    function h() {
      m.orderedModifiers.forEach(function(v) {
        var x = v.name, O = v.options, w = O === void 0 ? {} : O, k = v.effect;
        if (typeof k == "function") {
          var y = k({
            state: m,
            name: x,
            instance: d,
            options: w
          }), T = function() {
          };
          b.push(y || T);
        }
      });
    }
    function u() {
      b.forEach(function(v) {
        return v();
      }), b = [];
    }
    return d;
  };
}
var Ph = [Qm, vh, Jm, Vm, hh, ph, wh, Wm, uh], $h = /* @__PURE__ */ Rh({
  defaultModifiers: Ph
});
const Ks = "Popper";
function _h(e) {
  return Vs(Ks, e);
}
cm(Ks, ["root"]);
const Ih = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Mh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function Ah(e, t) {
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
function xn(e) {
  return typeof e == "function" ? e() : e;
}
function zn(e) {
  return e.nodeType !== void 0;
}
function Dh(e) {
  return !zn(e);
}
const jh = () => ft({
  root: ["root"]
}, nm(_h)), Bh = {}, Lh = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: f,
    placement: m,
    popperOptions: b,
    popperRef: g,
    slotProps: d = {},
    slots: h = {},
    TransitionProps: u
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, v = ge(t, Ih), x = N.useRef(null), O = We(x, r), w = N.useRef(null), k = We(w, g), y = N.useRef(k);
  Bt(() => {
    y.current = k;
  }, [k]), N.useImperativeHandle(g, () => w.current, []);
  const T = Ah(m, i), [S, I] = N.useState(T), [D, V] = N.useState(xn(o));
  N.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), N.useEffect(() => {
    o && V(xn(o));
  }, [o]), Bt(() => {
    if (!D || !f)
      return;
    const G = (te) => {
      I(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && zn(D) && D.nodeType === 1) {
      const te = D.getBoundingClientRect();
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
    c != null && (j = j.concat(c)), b && b.modifiers != null && (j = j.concat(b.modifiers));
    const X = $h(D, x.current, P({
      placement: T
    }, b, {
      modifiers: j
    }));
    return y.current(X), () => {
      X.destroy(), y.current(null);
    };
  }, [D, l, c, f, b, T]);
  const E = {
    placement: S
  };
  u !== null && (E.TransitionProps = u);
  const R = jh(), _ = (n = h.root) != null ? n : "div", z = Vt({
    elementType: _,
    externalSlotProps: d.root,
    externalForwardedProps: v,
    additionalProps: {
      role: "tooltip",
      ref: O
    },
    ownerState: t,
    className: R.root
  });
  return /* @__PURE__ */ p(_, P({}, z, {
    children: typeof a == "function" ? a(E) : a
  }));
}), Js = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: f,
    open: m,
    placement: b = "bottom",
    popperOptions: g = Bh,
    popperRef: d,
    style: h,
    transition: u = !1,
    slotProps: v = {},
    slots: x = {}
  } = t, O = ge(t, Mh), [w, k] = N.useState(!0), y = () => {
    k(!1);
  }, T = () => {
    k(!0);
  };
  if (!c && !m && (!u || w))
    return null;
  let S;
  if (a)
    S = a;
  else if (n) {
    const V = xn(n);
    S = V && zn(V) ? Re(V).body : Re(null).body;
  }
  const I = !m && c && (!u || w) ? "none" : void 0, D = u ? {
    in: m,
    onEnter: y,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ p(Lr, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ p(Lh, P({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: f,
      ref: r,
      open: u ? !w : m,
      placement: b,
      popperOptions: g,
      popperRef: d,
      slotProps: v,
      slots: x
    }, O, {
      style: P({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: I
      }, h),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Js.propTypes = {
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
  anchorEl: cr(s.oneOfType([pt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = xn(e.anchorEl);
      if (t && zn(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Dh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: s.oneOfType([pt, s.func]),
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
  popperRef: zo,
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
  const e = Is(qo);
  return process.env.NODE_ENV !== "production" && N.useDebugValue(e), e[Ko] || e;
}
function So(e, t) {
  return So = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, So(e, t);
}
function Vh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, So(e, t);
}
const wi = {
  disabled: !1
};
var Fh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Zs = U.createContext(null);
var zh = function(t) {
  return t.scrollTop;
}, Tr = "unmounted", Pt = "exited", $t = "entering", Jt = "entered", Co = "exiting", ht = /* @__PURE__ */ function(e) {
  Vh(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = Pt, a.appearStatus = $t) : c = Jt : n.unmountOnExit || n.mountOnEnter ? c = Tr : c = Pt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === Tr ? {
      status: Pt
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== $t && i !== Jt && (a = $t) : (i === $t || i === Jt) && (a = Co);
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
      if (this.cancelNextCallback(), a === $t) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : tn.findDOMNode(this);
          i && zh(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Pt && this.setState({
        status: Tr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [tn.findDOMNode(this), l], f = c[0], m = c[1], b = this.getTimeouts(), g = l ? b.appear : b.enter;
    if (!o && !i || wi.disabled) {
      this.safeSetState({
        status: Jt
      }, function() {
        a.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, m), this.safeSetState({
      status: $t
    }, function() {
      a.props.onEntering(f, m), a.onTransitionEnd(g, function() {
        a.safeSetState({
          status: Jt
        }, function() {
          a.props.onEntered(f, m);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : tn.findDOMNode(this);
    if (!a || wi.disabled) {
      this.safeSetState({
        status: Pt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Co
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: Pt
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
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], f = c[0], m = c[1];
      this.props.addEndListener(f, m);
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
      /* @__PURE__ */ U.createElement(Zs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : U.cloneElement(U.Children.only(i), l))
    );
  }, t;
}(U.Component);
ht.contextType = Zs;
ht.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var r = Fh;
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
ht.defaultProps = {
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
ht.UNMOUNTED = Tr;
ht.EXITED = Pt;
ht.ENTERING = $t;
ht.ENTERED = Jt;
ht.EXITING = Co;
const Qs = ht, el = (e) => e.scrollTop;
function kn(e, t) {
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
const Uh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Oo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Hh = {
  entering: {
    opacity: 1,
    transform: Oo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, so = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), aa = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: f,
    onEntering: m,
    onExit: b,
    onExited: g,
    onExiting: d,
    style: h,
    timeout: u = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: v = Qs
  } = t, x = ge(t, Uh), O = Er(), w = N.useRef(), k = Kr(), y = N.useRef(null), T = We(y, a.ref, r), S = (G) => (j) => {
    if (G) {
      const X = y.current;
      j === void 0 ? G(X) : G(X, j);
    }
  }, I = S(m), D = S((G, j) => {
    el(G);
    const {
      duration: X,
      delay: te,
      easing: F
    } = kn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "enter"
    });
    let C;
    u === "auto" ? (C = k.transitions.getAutoHeightDuration(G.clientHeight), w.current = C) : C = X, G.style.transition = [k.transitions.create("opacity", {
      duration: C,
      delay: te
    }), k.transitions.create("transform", {
      duration: so ? C : C * 0.666,
      delay: te,
      easing: F
    })].join(","), c && c(G, j);
  }), V = S(f), E = S(d), R = S((G) => {
    const {
      duration: j,
      delay: X,
      easing: te
    } = kn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "exit"
    });
    let F;
    u === "auto" ? (F = k.transitions.getAutoHeightDuration(G.clientHeight), w.current = F) : F = j, G.style.transition = [k.transitions.create("opacity", {
      duration: F,
      delay: X
    }), k.transitions.create("transform", {
      duration: so ? F : F * 0.666,
      delay: so ? X : X || F * 0.333,
      easing: te
    })].join(","), G.style.opacity = 0, G.style.transform = Oo(0.75), b && b(G);
  }), _ = S(g);
  return /* @__PURE__ */ p(v, P({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: V,
    onEntering: I,
    onExit: R,
    onExited: _,
    onExiting: E,
    addEndListener: (G) => {
      u === "auto" && O.start(w.current || 0, G), n && n(y.current, G);
    },
    timeout: u === "auto" ? null : u
  }, x, {
    children: (G, j) => /* @__PURE__ */ N.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: Oo(0.75),
        visibility: G === "exited" && !l ? "hidden" : void 0
      }, Hh[G], h, a.props.style),
      ref: T
    }, j))
  }));
});
process.env.NODE_ENV !== "production" && (aa.propTypes = {
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
aa.muiSupportAuto = !0;
const Ro = aa, Gh = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, xi = Gh, Xh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Wh = Pe(Js, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), tl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n;
  const o = _s(), a = mt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: f,
    container: m,
    disablePortal: b,
    keepMounted: g,
    modifiers: d,
    open: h,
    placement: u,
    popperOptions: v,
    popperRef: x,
    transition: O,
    slots: w,
    slotProps: k
  } = a, y = ge(a, Xh), T = (n = w == null ? void 0 : w.root) != null ? n : c == null ? void 0 : c.Root, S = P({
    anchorEl: i,
    container: m,
    disablePortal: b,
    keepMounted: g,
    modifiers: d,
    open: h,
    placement: u,
    popperOptions: v,
    popperRef: x,
    transition: O
  }, y);
  return /* @__PURE__ */ p(Wh, P({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: T
    },
    slotProps: k ?? f
  }, S, {
    ref: r
  }));
});
process.env.NODE_ENV !== "production" && (tl.propTypes = {
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
  anchorEl: s.oneOfType([pt, s.object, s.func]),
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
  container: s.oneOfType([pt, s.func]),
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
  popperRef: zo,
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
const rl = tl;
function Yh(e) {
  return ot("MuiTooltip", e);
}
const qh = Nt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), wt = qh, Kh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Jh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Zh = (e) => {
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
  return ft(i, Yh, t);
}, Qh = Pe(rl, {
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
  [`&[data-popper-placement*="bottom"] .${wt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${wt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${wt.arrow}`]: P({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${wt.arrow}`]: P({}, t.isRtl ? {
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
})), eg = Pe("div", {
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
  lineHeight: `${Jh(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${wt.popper}[data-popper-placement*="left"] &`]: P({
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
  [`.${wt.popper}[data-popper-placement*="right"] &`]: P({
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
  [`.${wt.popper}[data-popper-placement*="top"] &`]: P({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${wt.popper}[data-popper-placement*="bottom"] &`]: P({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), tg = Pe("span", {
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
const ki = new Gr();
let yr = {
  x: 0,
  y: 0
};
function sn(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const nl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c, f, m, b, g, d, h, u, v, x, O, w, k, y;
  const T = mt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: I,
    components: D = {},
    componentsProps: V = {},
    describeChild: E = !1,
    disableFocusListener: R = !1,
    disableHoverListener: _ = !1,
    disableInteractive: z = !1,
    disableTouchListener: G = !1,
    enterDelay: j = 100,
    enterNextDelay: X = 0,
    enterTouchDelay: te = 700,
    followCursor: F = !1,
    id: C,
    leaveDelay: B = 0,
    leaveTouchDelay: W = 1500,
    onClose: Y,
    onOpen: H,
    open: K,
    placement: q = "bottom",
    PopperComponent: Z,
    PopperProps: J = {},
    slotProps: Q = {},
    slots: ee = {},
    title: ie,
    TransitionComponent: L = Ro,
    TransitionProps: re
  } = T, M = ge(T, Kh), se = /* @__PURE__ */ N.isValidElement(I) ? I : /* @__PURE__ */ p("span", {
    children: I
  }), Te = Kr(), $e = Te.direction === "rtl", [Ee, Ct] = N.useState(), [_e, at] = N.useState(null), Be = N.useRef(!1), it = z || F, Se = Er(), zt = Er(), Ot = Er(), pr = Er(), [Zr, ca] = ws({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let st = Zr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = N.useRef(K !== void 0);
    N.useEffect(() => {
      Ee && Ee.disabled && !ne && ie !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, Ee, ne]);
  }
  const Un = ys(C), dr = N.useRef(), Qr = jr(() => {
    dr.current !== void 0 && (document.body.style.WebkitUserSelect = dr.current, dr.current = void 0), pr.clear();
  });
  N.useEffect(() => Qr, [Qr]);
  const pa = (ne) => {
    ki.clear(), an = !0, ca(!0), H && !st && H(ne);
  }, en = jr(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      ki.start(800 + B, () => {
        an = !1;
      }), ca(!1), Y && st && Y(ne), Se.start(Te.transitions.duration.shortest, () => {
        Be.current = !1;
      });
    }
  ), Hn = (ne) => {
    Be.current && ne.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), zt.clear(), Ot.clear(), j || an && X ? zt.start(an ? X : j, () => {
      pa(ne);
    }) : pa(ne));
  }, da = (ne) => {
    zt.clear(), Ot.start(B, () => {
      en(ne);
    });
  }, {
    isFocusVisibleRef: ua,
    onBlur: Wl,
    onFocus: Yl,
    ref: ql
  } = xs(), [, fa] = N.useState(!1), ma = (ne) => {
    Wl(ne), ua.current === !1 && (fa(!1), da(ne));
  }, ha = (ne) => {
    Ee || Ct(ne.currentTarget), Yl(ne), ua.current === !0 && (fa(!0), Hn(ne));
  }, ga = (ne) => {
    Be.current = !0;
    const Le = se.props;
    Le.onTouchStart && Le.onTouchStart(ne);
  }, va = Hn, ba = da, Kl = (ne) => {
    ga(ne), Ot.clear(), Se.clear(), Qr(), dr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", pr.start(te, () => {
      document.body.style.WebkitUserSelect = dr.current, Hn(ne);
    });
  }, Jl = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Qr(), Ot.start(W, () => {
      en(ne);
    });
  };
  N.useEffect(() => {
    if (!st)
      return;
    function ne(Le) {
      (Le.key === "Escape" || Le.key === "Esc") && en(Le);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [en, st]);
  const Zl = We(se.ref, ql, Ct, r);
  !ie && ie !== 0 && (st = !1);
  const Gn = N.useRef(), Ql = (ne) => {
    const Le = se.props;
    Le.onMouseMove && Le.onMouseMove(ne), yr = {
      x: ne.clientX,
      y: ne.clientY
    }, Gn.current && Gn.current.update();
  }, ur = {}, Xn = typeof ie == "string";
  E ? (ur.title = !st && Xn && !_ ? ie : null, ur["aria-describedby"] = st ? Un : null) : (ur["aria-label"] = Xn ? ie : null, ur["aria-labelledby"] = st && !Xn ? Un : null);
  const He = P({}, ur, M, se.props, {
    className: Oe(M.className, se.props.className),
    onTouchStart: ga,
    ref: Zl
  }, F ? {
    onMouseMove: Ql
  } : {});
  process.env.NODE_ENV !== "production" && (He["data-mui-internal-clone-element"] = !0, N.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const fr = {};
  G || (He.onTouchStart = Kl, He.onTouchEnd = Jl), _ || (He.onMouseOver = sn(va, He.onMouseOver), He.onMouseLeave = sn(ba, He.onMouseLeave), it || (fr.onMouseOver = va, fr.onMouseLeave = ba)), R || (He.onFocus = sn(ha, He.onFocus), He.onBlur = sn(ma, He.onBlur), it || (fr.onFocus = ha, fr.onBlur = ma)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const ec = N.useMemo(() => {
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
    touch: Be.current
  }), Wn = Zh(mr), ya = (n = (o = ee.popper) != null ? o : D.Popper) != null ? n : Qh, wa = (a = (i = (l = ee.transition) != null ? l : D.Transition) != null ? i : L) != null ? a : Ro, xa = (c = (f = ee.tooltip) != null ? f : D.Tooltip) != null ? c : eg, ka = (m = (b = ee.arrow) != null ? b : D.Arrow) != null ? m : tg, tc = Nr(ya, P({}, J, (g = Q.popper) != null ? g : V.popper, {
    className: Oe(Wn.popper, J == null ? void 0 : J.className, (d = (h = Q.popper) != null ? h : V.popper) == null ? void 0 : d.className)
  }), mr), rc = Nr(wa, P({}, re, (u = Q.transition) != null ? u : V.transition), mr), nc = Nr(xa, P({}, (v = Q.tooltip) != null ? v : V.tooltip, {
    className: Oe(Wn.tooltip, (x = (O = Q.tooltip) != null ? O : V.tooltip) == null ? void 0 : x.className)
  }), mr), oc = Nr(ka, P({}, (w = Q.arrow) != null ? w : V.arrow, {
    className: Oe(Wn.arrow, (k = (y = Q.arrow) != null ? y : V.arrow) == null ? void 0 : k.className)
  }), mr);
  return /* @__PURE__ */ $(N.Fragment, {
    children: [/* @__PURE__ */ N.cloneElement(se, He), /* @__PURE__ */ p(ya, P({
      as: Z ?? rl,
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
      } : Ee,
      popperRef: Gn,
      open: Ee ? st : !1,
      id: Un,
      transition: !0
    }, fr, tc, {
      popperOptions: ec,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ p(wa, P({
        timeout: Te.transitions.duration.shorter
      }, ne, rc, {
        children: /* @__PURE__ */ $(xa, P({}, nc, {
          children: [ie, S ? /* @__PURE__ */ p(ka, P({}, oc, {
            ref: at
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (nl.propTypes = {
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
const rg = nl;
function Ei(e, t, r) {
  return e ? /* @__PURE__ */ p(Fi, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ p("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ol(e) {
  const {
    onClick: t,
    label: r,
    tooltip: n,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: f = !1,
    isDense: m = !0,
    isSubMenuParent: b = !1,
    hasDisabledGutters: g = !1,
    hasDivider: d = !1,
    focusVisibleClassName: h,
    id: u,
    children: v
  } = e, x = /* @__PURE__ */ p(
    zc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: f,
      dense: m,
      disableGutters: g,
      divider: d,
      focusVisibleClassName: h,
      onClick: t,
      id: u,
      children: r ? /* @__PURE__ */ $(Et, { children: [
        Ei(a, r, !0),
        /* @__PURE__ */ p(Uc, { primary: r, inset: !a && o }),
        b ? /* @__PURE__ */ p(Fi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ p(Ds, {}) }) : Ei(i, r, !1)
      ] }) : v
    }
  );
  return n ? /* @__PURE__ */ p(rg, { title: n, placement: "right", children: /* @__PURE__ */ p("div", { children: x }) }) : x;
}
function al(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function ng(e) {
  const [t, r] = fe(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (f) => {
    r(f.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let f = al(a).filter((m) => "menuItem" in m.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return f = f.filter(
      (m) => "menuItem" in m.group && m.group.menuItem === n.id
    ), /* @__PURE__ */ p(ia, { ...e, includedGroups: f });
  };
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ p(ol, { onClick: i, ...o, isSubMenuParent: !0 }),
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
const og = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function ia(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = kt(() => {
    const m = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      al(t).filter((h) => !("menuItem" in h.group))
    ), b = Object.values(m).sort(
      (h, u) => (h.group.order || 0) - (u.group.order || 0)
    ), g = [];
    b.forEach((h) => {
      og(h.id, t.items).forEach(
        (u) => g.push({ item: u, isLastItemInGroup: !1 })
      ), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !0);
    }), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !1);
    const d = g.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: g, allowForLeadingIcons: d };
  }, [o, t]), l = ({ item: m, isLastItemInGroup: b }) => ({
    className: "papi-menu-item",
    label: m.label,
    tooltip: m.tooltip,
    iconPathBefore: "iconPathBefore" in m ? m.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in m ? m.iconPathAfter : void 0,
    hasDivider: b,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ p("div", {});
  const f = c.item.group;
  return /* @__PURE__ */ p("div", { role: "menu", "aria-label": f, children: a.map((m, b) => {
    const { item: g } = m, d = l(m);
    if ("command" in g) {
      const h = g.group + b;
      return /* @__PURE__ */ p(
        ol,
        {
          onClick: (u) => {
            r == null || r(u), n(g);
          },
          ...d
        },
        h
      );
    }
    return /* @__PURE__ */ p(
      ng,
      {
        parentMenuItem: g,
        parentItemProps: d,
        ...e
      },
      f + g.id
    );
  }) }, f);
}
function ag(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ p(ia, { ...e, includedGroups: a });
}
function ig({
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
          ag,
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
function sg({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = kt(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, f = o[c];
      typeof f == "object" && typeof f.order == "number" && !Number.isNaN(f.order) ? i.set(f.order, { id: c, metadata: f }) : console.warn(
        `Property ${l} (${typeof f}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`
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
        ig,
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
const il = /* @__PURE__ */ N.createContext({});
process.env.NODE_ENV !== "production" && (il.displayName = "ListContext");
const lg = il;
function cg(e) {
  return ot("MuiList", e);
}
Nt("MuiList", ["root", "padding", "dense", "subheader"]);
const pg = ["children", "className", "component", "dense", "disablePadding", "subheader"], dg = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return ft({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, cg, t);
}, ug = Pe("ul", {
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
})), sl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = mt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: f
  } = n, m = ge(n, pg), b = N.useMemo(() => ({
    dense: l
  }), [l]), g = P({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), d = dg(g);
  return /* @__PURE__ */ p(lg.Provider, {
    value: b,
    children: /* @__PURE__ */ $(ug, P({
      as: i,
      className: Oe(d.root, a),
      ref: r,
      ownerState: g
    }, m, {
      children: [f, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (sl.propTypes = {
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
const fg = sl, mg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function lo(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function Ni(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function ll(e, t) {
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
    if (!l.hasAttribute("tabindex") || !ll(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const cl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: i,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: f = !1,
    onKeyDown: m,
    variant: b = "selectedMenu"
  } = t, g = ge(t, mg), d = N.useRef(null), h = N.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Bt(() => {
    o && d.current.focus();
  }, [o]), N.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (w, k) => {
      const y = !d.current.style.width;
      if (w.clientHeight < d.current.clientHeight && y) {
        const T = `${ks(Re(w))}px`;
        d.current.style[k.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, d.current.style.width = `calc(100% + ${T})`;
      }
      return d.current;
    }
  }), []);
  const u = (w) => {
    const k = d.current, y = w.key, T = Re(k).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), wr(k, T, f, c, lo);
    else if (y === "ArrowUp")
      w.preventDefault(), wr(k, T, f, c, Ni);
    else if (y === "Home")
      w.preventDefault(), wr(k, null, f, c, lo);
    else if (y === "End")
      w.preventDefault(), wr(k, null, f, c, Ni);
    else if (y.length === 1) {
      const S = h.current, I = y.toLowerCase(), D = performance.now();
      S.keys.length > 0 && (D - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && I !== S.keys[0] && (S.repeating = !1)), S.lastTime = D, S.keys.push(I);
      const V = T && !S.repeating && ll(T, S);
      S.previousKeyMatched && (V || wr(k, T, !1, c, lo, S)) ? w.preventDefault() : S.previousKeyMatched = !1;
    }
    m && m(w);
  }, v = We(d, r);
  let x = -1;
  N.Children.forEach(i, (w, k) => {
    if (!/* @__PURE__ */ N.isValidElement(w)) {
      x === k && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && hn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (b === "selectedMenu" && w.props.selected || x === -1) && (x = k), x === k && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const O = N.Children.map(i, (w, k) => {
    if (k === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && b === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ N.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ p(fg, P({
    role: "menu",
    ref: v,
    className: l,
    onKeyDown: u,
    tabIndex: o ? 0 : -1
  }, g, {
    children: O
  }));
});
process.env.NODE_ENV !== "production" && (cl.propTypes = {
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
const hg = cl, gg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], vg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, pl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = Kr(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: i = !0,
    children: l,
    easing: c,
    in: f,
    onEnter: m,
    onEntered: b,
    onEntering: g,
    onExit: d,
    onExited: h,
    onExiting: u,
    style: v,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: O = Qs
  } = t, w = ge(t, gg), k = N.useRef(null), y = We(k, l.ref, r), T = (z) => (G) => {
    if (z) {
      const j = k.current;
      G === void 0 ? z(j) : z(j, G);
    }
  }, S = T(g), I = T((z, G) => {
    el(z);
    const j = kn({
      style: v,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", j), z.style.transition = n.transitions.create("opacity", j), m && m(z, G);
  }), D = T(b), V = T(u), E = T((z) => {
    const G = kn({
      style: v,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", G), z.style.transition = n.transitions.create("opacity", G), d && d(z);
  }), R = T(h);
  return /* @__PURE__ */ p(O, P({
    appear: i,
    in: f,
    nodeRef: k,
    onEnter: I,
    onEntered: D,
    onEntering: S,
    onExit: E,
    onExited: R,
    onExiting: V,
    addEndListener: (z) => {
      a && a(k.current, z);
    },
    timeout: x
  }, w, {
    children: (z, G) => /* @__PURE__ */ N.cloneElement(l, P({
      style: P({
        opacity: 0,
        visibility: z === "exited" && !f ? "hidden" : void 0
      }, vg[z], v, l.props.style),
      ref: y
    }, G))
  }));
});
process.env.NODE_ENV !== "production" && (pl.propTypes = {
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
const bg = pl;
function yg(e) {
  return ot("MuiBackdrop", e);
}
Nt("MuiBackdrop", ["root", "invisible"]);
const wg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], xg = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return ft({
    root: ["root", r && "invisible"]
  }, yg, t);
}, kg = Pe("div", {
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
})), dl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a;
  const i = mt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: f = "div",
    components: m = {},
    componentsProps: b = {},
    invisible: g = !1,
    open: d,
    slotProps: h = {},
    slots: u = {},
    TransitionComponent: v = bg,
    transitionDuration: x
  } = i, O = ge(i, wg), w = P({}, i, {
    component: f,
    invisible: g
  }), k = xg(w), y = (n = h.root) != null ? n : b.root;
  return /* @__PURE__ */ p(v, P({
    in: d,
    timeout: x
  }, O, {
    children: /* @__PURE__ */ p(kg, P({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = u.root) != null ? a : m.Root) != null ? o : f,
      className: Oe(k.root, c, y == null ? void 0 : y.className),
      ownerState: P({}, w, y == null ? void 0 : y.ownerState),
      classes: k,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (dl.propTypes = {
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
const Eg = dl;
function Ng(e) {
  return ot("MuiModal", e);
}
Nt("MuiModal", ["root", "hidden", "backdrop"]);
const Tg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Sg = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return ft({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, Ng, n);
}, Cg = Pe("div", {
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
})), Og = Pe(Eg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), ul = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const f = mt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: m = Og,
    BackdropProps: b,
    className: g,
    closeAfterTransition: d = !1,
    children: h,
    container: u,
    component: v,
    components: x = {},
    componentsProps: O = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: k = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: T = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: I = !1,
    hideBackdrop: D = !1,
    keepMounted: V = !1,
    onBackdropClick: E,
    open: R,
    slotProps: _,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = f, G = ge(f, Tg), j = P({}, f, {
    closeAfterTransition: d,
    disableAutoFocus: w,
    disableEnforceFocus: k,
    disableEscapeKeyDown: y,
    disablePortal: T,
    disableRestoreFocus: S,
    disableScrollLock: I,
    hideBackdrop: D,
    keepMounted: V
  }), {
    getRootProps: X,
    getBackdropProps: te,
    getTransitionProps: F,
    portalRef: C,
    isTopModal: B,
    exited: W,
    hasTransition: Y
  } = Tm(P({}, j, {
    rootRef: r
  })), H = P({}, j, {
    exited: W
  }), K = Sg(H), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), Y) {
    const {
      onEnter: re,
      onExited: M
    } = F();
    q.onEnter = re, q.onExited = M;
  }
  const Z = (n = (o = z == null ? void 0 : z.root) != null ? o : x.Root) != null ? n : Cg, J = (a = (i = z == null ? void 0 : z.backdrop) != null ? i : x.Backdrop) != null ? a : m, Q = (l = _ == null ? void 0 : _.root) != null ? l : O.root, ee = (c = _ == null ? void 0 : _.backdrop) != null ? c : O.backdrop, ie = Vt({
    elementType: Z,
    externalSlotProps: Q,
    externalForwardedProps: G,
    getSlotProps: X,
    additionalProps: {
      ref: r,
      as: v
    },
    ownerState: H,
    className: Oe(g, Q == null ? void 0 : Q.className, K == null ? void 0 : K.root, !H.open && H.exited && (K == null ? void 0 : K.hidden))
  }), L = Vt({
    elementType: J,
    externalSlotProps: ee,
    additionalProps: b,
    getSlotProps: (re) => te(P({}, re, {
      onClick: (M) => {
        E && E(M), re != null && re.onClick && re.onClick(M);
      }
    })),
    className: Oe(ee == null ? void 0 : ee.className, b == null ? void 0 : b.className, K == null ? void 0 : K.backdrop),
    ownerState: H
  });
  return !V && !R && (!Y || W) ? null : /* @__PURE__ */ p(Lr, {
    ref: C,
    container: u,
    disablePortal: T,
    children: /* @__PURE__ */ $(Z, P({}, ie, {
      children: [!D && m ? /* @__PURE__ */ p(J, P({}, L)) : null, /* @__PURE__ */ p(yn, {
        disableEnforceFocus: k,
        disableAutoFocus: w,
        disableRestoreFocus: S,
        isEnabled: B,
        open: R,
        children: /* @__PURE__ */ N.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (ul.propTypes = {
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
  container: s.oneOfType([pt, s.func]),
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
const Rg = ul;
function Pg(e) {
  return ot("MuiPaper", e);
}
Nt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const $g = ["className", "component", "elevation", "square", "variant"], _g = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return ft(a, Pg, o);
}, Ig = Pe("div", {
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
    backgroundImage: `linear-gradient(${bn("#fff", xi(t.elevation))}, ${bn("#fff", xi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), fl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = mt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, f = ge(n, $g), m = P({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), b = _g(m);
  return process.env.NODE_ENV !== "production" && Kr().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ p(Ig, P({
    as: a,
    ownerState: m,
    className: Oe(b.root, o),
    ref: r
  }, f));
});
process.env.NODE_ENV !== "production" && (fl.propTypes = {
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
  elevation: cr(Ts, (e) => {
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
const Mg = fl;
function Ag(e) {
  return ot("MuiPopover", e);
}
Nt("MuiPopover", ["root", "paper"]);
const Dg = ["onEntering"], jg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Bg = ["slotProps"];
function Ti(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function Si(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function Ci(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function dn(e) {
  return typeof e == "function" ? e() : e;
}
const Lg = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"],
    paper: ["paper"]
  }, Ag, t);
}, Vg = Pe(Rg, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ml = Pe(Mg, {
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
}), hl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a;
  const i = mt({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: f = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: m,
    anchorReference: b = "anchorEl",
    children: g,
    className: d,
    container: h,
    elevation: u = 8,
    marginThreshold: v = 16,
    open: x,
    PaperProps: O = {},
    slots: w,
    slotProps: k,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = Ro,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: D = !1
  } = i, V = ge(i.TransitionProps, Dg), E = ge(i, jg), R = (n = k == null ? void 0 : k.paper) != null ? n : O, _ = N.useRef(), z = We(_, R.ref), G = P({}, i, {
    anchorOrigin: f,
    anchorReference: b,
    elevation: u,
    marginThreshold: v,
    externalPaperSlotProps: R,
    transformOrigin: y,
    TransitionComponent: T,
    transitionDuration: S,
    TransitionProps: V
  }), j = Lg(G), X = N.useCallback(() => {
    if (b === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (m || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), m;
    const re = dn(c), M = re && re.nodeType === 1 ? re : Re(_.current).body, se = M.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = M.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + Ti(se, f.vertical),
      left: se.left + Si(se, f.horizontal)
    };
  }, [c, f.horizontal, f.vertical, m, b]), te = N.useCallback((re) => ({
    vertical: Ti(re, y.vertical),
    horizontal: Si(re, y.horizontal)
  }), [y.horizontal, y.vertical]), F = N.useCallback((re) => {
    const M = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, se = te(M);
    if (b === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ci(se)
      };
    const Te = X();
    let $e = Te.top - se.vertical, Ee = Te.left - se.horizontal;
    const Ct = $e + M.height, _e = Ee + M.width, at = nr(dn(c)), Be = at.innerHeight - v, it = at.innerWidth - v;
    if (v !== null && $e < v) {
      const Se = $e - v;
      $e -= Se, se.vertical += Se;
    } else if (v !== null && Ct > Be) {
      const Se = Ct - Be;
      $e -= Se, se.vertical += Se;
    }
    if (process.env.NODE_ENV !== "production" && M.height > Be && M.height && Be && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${M.height - Be}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), v !== null && Ee < v) {
      const Se = Ee - v;
      Ee -= Se, se.horizontal += Se;
    } else if (_e > it) {
      const Se = _e - it;
      Ee -= Se, se.horizontal += Se;
    }
    return {
      top: `${Math.round($e)}px`,
      left: `${Math.round(Ee)}px`,
      transformOrigin: Ci(se)
    };
  }, [c, b, X, te, v]), [C, B] = N.useState(x), W = N.useCallback(() => {
    const re = _.current;
    if (!re)
      return;
    const M = F(re);
    M.top !== null && (re.style.top = M.top), M.left !== null && (re.style.left = M.left), re.style.transformOrigin = M.transformOrigin, B(!0);
  }, [F]);
  N.useEffect(() => (D && window.addEventListener("scroll", W), () => window.removeEventListener("scroll", W)), [c, D, W]);
  const Y = (re, M) => {
    I && I(re, M), W();
  }, H = () => {
    B(!1);
  };
  N.useEffect(() => {
    x && W();
  }), N.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      W();
    }
  } : null, [x, W]), N.useEffect(() => {
    if (!x)
      return;
    const re = bs(() => {
      W();
    }), M = nr(c);
    return M.addEventListener("resize", re), () => {
      re.clear(), M.removeEventListener("resize", re);
    };
  }, [c, x, W]);
  let K = S;
  S === "auto" && !T.muiSupportAuto && (K = void 0);
  const q = h || (c ? Re(dn(c)).body : void 0), Z = (o = w == null ? void 0 : w.root) != null ? o : Vg, J = (a = w == null ? void 0 : w.paper) != null ? a : ml, Q = Vt({
    elementType: J,
    externalSlotProps: P({}, R, {
      style: C ? R.style : P({}, R.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: u,
      ref: z
    },
    ownerState: G,
    className: Oe(j.paper, R == null ? void 0 : R.className)
  }), ee = Vt({
    elementType: Z,
    externalSlotProps: (k == null ? void 0 : k.root) || {},
    externalForwardedProps: E,
    additionalProps: {
      ref: r,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: q,
      open: x
    },
    ownerState: G,
    className: Oe(j.root, d)
  }), {
    slotProps: ie
  } = ee, L = ge(ee, Bg);
  return /* @__PURE__ */ p(Z, P({}, L, !js(Z) && {
    slotProps: ie,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ p(T, P({
      appear: !0,
      in: x,
      onEntering: Y,
      onExited: H,
      timeout: K
    }, V, {
      children: /* @__PURE__ */ p(J, P({}, Q, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (hl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: zo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: cr(s.oneOfType([pt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = dn(e.anchorEl);
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
  container: s.oneOfType([pt, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: Ts,
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
    component: gd
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
const Fg = hl;
function zg(e) {
  return ot("MuiMenu", e);
}
Nt("MuiMenu", ["root", "paper", "list"]);
const Ug = ["onEntering"], Hg = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Gg = {
  vertical: "top",
  horizontal: "right"
}, Xg = {
  vertical: "top",
  horizontal: "left"
}, Wg = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, zg, t);
}, Yg = Pe(Fg, {
  shouldForwardProp: (e) => Ms(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), qg = Pe(ml, {
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
}), Kg = Pe(hg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), gl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o;
  const a = mt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: l,
    className: c,
    disableAutoFocusItem: f = !1,
    MenuListProps: m = {},
    onClose: b,
    open: g,
    PaperProps: d = {},
    PopoverClasses: h,
    transitionDuration: u = "auto",
    TransitionProps: {
      onEntering: v
    } = {},
    variant: x = "selectedMenu",
    slots: O = {},
    slotProps: w = {}
  } = a, k = ge(a.TransitionProps, Ug), y = ge(a, Hg), T = Kr(), S = T.direction === "rtl", I = P({}, a, {
    autoFocus: i,
    disableAutoFocusItem: f,
    MenuListProps: m,
    onEntering: v,
    PaperProps: d,
    transitionDuration: u,
    TransitionProps: k,
    variant: x
  }), D = Wg(I), V = i && !f && g, E = N.useRef(null), R = (F, C) => {
    E.current && E.current.adjustStyleForScrollbar(F, T), v && v(F, C);
  }, _ = (F) => {
    F.key === "Tab" && (F.preventDefault(), b && b(F, "tabKeyDown"));
  };
  let z = -1;
  N.Children.map(l, (F, C) => {
    /* @__PURE__ */ N.isValidElement(F) && (process.env.NODE_ENV !== "production" && hn.isFragment(F) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), F.props.disabled || (x === "selectedMenu" && F.props.selected || z === -1) && (z = C));
  });
  const G = (n = O.paper) != null ? n : qg, j = (o = w.paper) != null ? o : d, X = Vt({
    elementType: O.root,
    externalSlotProps: w.root,
    ownerState: I,
    className: [D.root, c]
  }), te = Vt({
    elementType: G,
    externalSlotProps: j,
    ownerState: I,
    className: D.paper
  });
  return /* @__PURE__ */ p(Yg, P({
    onClose: b,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? Gg : Xg,
    slots: {
      paper: G,
      root: O.root
    },
    slotProps: {
      root: X,
      paper: te
    },
    open: g,
    ref: r,
    transitionDuration: u,
    TransitionProps: P({
      onEntering: R
    }, k),
    ownerState: I
  }, y, {
    classes: h,
    children: /* @__PURE__ */ p(Kg, P({
      onKeyDown: _,
      actions: E,
      autoFocus: i && (z === -1 || f),
      autoFocusItem: V,
      variant: x
    }, m, {
      className: Oe(D.list, m.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (gl.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([pt, s.func]),
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
const Jg = gl;
function b0({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var f;
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
  }, []), c = kt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((f = r == null ? void 0 : r.items) == null ? void 0 : f.length) ?? 0) === 0 || !n ? n : /* @__PURE__ */ $(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        n,
        /* @__PURE__ */ p(
          Jg,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ p(
              ia,
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
function Zg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Po = (e, t, r = {}) => {
  const n = At(t);
  n.current = t;
  const o = At(r);
  o.current = Zg(o.current);
  const [a, i] = fe(() => n.current), [l, c] = fe(!0);
  return Ze(() => {
    let f = !0;
    return c(!!e), (async () => {
      if (e) {
        const m = await e();
        f && (i(() => m), c(!1));
      }
    })(), () => {
      f = !1, o.current.preserveValue || i(() => n.current);
    };
  }, [e]), [a, l];
}, Qg = As(/* @__PURE__ */ p("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function ev({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, f] = fe(!1), [m, b] = fe(!1), g = Ce(() => {
    c && f(!1), b(!1);
  }, [c]), d = Ce((k) => {
    k.stopPropagation(), f((y) => {
      const T = !y;
      return T && k.shiftKey ? b(!0) : T || b(!1), T;
    });
  }, []), h = Ce(
    (k) => (g(), n(k)),
    [n, g]
  ), [u, v] = fe({ top: 1, left: 1 });
  Ze(() => {
    if (c) {
      const k = o == null ? void 0 : o.current;
      if (k) {
        const y = k.getBoundingClientRect(), T = window.scrollY, S = window.scrollX, I = y.top + T + k.clientHeight, D = y.left + S;
        v({ top: I, left: D });
      }
    }
  }, [c, o]);
  const [x] = Po(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [O] = Po(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? r ?? x, [e, r, x, c]),
    r ?? x
  ), w = m && O ? O : x;
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
        children: l ?? /* @__PURE__ */ p(Qg, {})
      }
    ),
    /* @__PURE__ */ p(
      Xc,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: g,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: u.top,
            left: u.left
          }
        },
        children: w ? /* @__PURE__ */ p(
          sg,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: h,
            multiColumnMenu: w
          }
        ) : void 0
      }
    )
  ] });
}
function y0({
  id: e,
  label: t,
  isDisabled: r = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: f
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
      children: f
    }
  );
}
const yt = "scrBook", tv = "scrRef", _t = "source", rv = "details", nv = "Scripture Reference", ov = "Scripture Book", vl = "Type", av = "Details";
function iv(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${he.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: yt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? nv,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? he.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === yt ? qn(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => vo(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => qn(n.start),
      id: tv,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : qn(o.start);
      },
      sortingFn: (n, o) => vo(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: _t,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? vl : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: rv,
      header: (e == null ? void 0 : e.detailsColumnName) ?? av,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
function w0({
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
  const [f, m] = fe([]), [b, g] = fe([{ id: yt, desc: !1 }]), [d, h] = fe({}), u = kt(
    () => e.flatMap((E) => E.data.map((R) => ({
      ...R,
      source: E.source
    }))),
    [e]
  ), v = kt(
    () => iv(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      r
    ),
    [n, a, i, r]
  );
  Ze(() => {
    f.includes(_t) ? g([
      { id: _t, desc: !1 },
      { id: yt, desc: !1 }
    ]) : g([{ id: yt, desc: !1 }]);
  }, [f]);
  const x = Ce(
    (E, R) => !R || vo(E, R) === 0 ? `${Yn(E)}` : `${Yn(E)}-${Yn(R)}`,
    []
  ), O = Ce(
    (E) => `${x(E.start, E.end)} ${E.source} ${E.detail}`,
    [x]
  ), w = Bi({
    data: u,
    columns: v,
    state: {
      grouping: f,
      sorting: b,
      rowSelection: d
    },
    onGroupingChange: m,
    onSortingChange: g,
    onRowSelectionChange: h,
    getExpandedRowModel: jc(),
    getGroupedRowModel: Bc(),
    getCoreRowModel: Li(),
    getSortedRowModel: Vi(),
    getRowId: O,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Ze(() => {
    if (l) {
      const E = w.getSelectedRowModel().rowsById, R = Object.keys(E);
      if (R.length === 1) {
        const _ = u.find((z) => O(z) === R[0]) || void 0;
        _ && l(_);
      }
    }
  }, [d, u, O, l, w]);
  const k = o ?? ov, y = a ?? vl, T = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [yt] },
    { label: `Group by ${y}`, value: [_t] },
    {
      label: `Group by ${k} and ${y}`,
      value: [yt, _t]
    },
    {
      label: `Group by ${y} and ${k}`,
      value: [_t, yt]
    }
  ], S = (E) => {
    m(JSON.parse(E));
  }, I = (E, R) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(R);
  }, D = (E, R) => E.getIsGrouped() ? "" : A("banded-row", R % 2 === 0 ? "even" : "odd"), V = (E, R, _) => {
    if (!((E == null ? void 0 : E.length) === 0 || R.depth < _.column.getGroupedIndex())) {
      if (R.getIsGrouped())
        switch (R.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (R.depth) {
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
        value: JSON.stringify(f),
        onValueChange: (E) => {
          S(E);
        },
        children: [
          /* @__PURE__ */ p(Qt, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ p(Ar, {}) }),
          /* @__PURE__ */ p(er, { position: "item-aligned", children: /* @__PURE__ */ p(Mp, { children: T.map((E) => /* @__PURE__ */ p(Je, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ $(On, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ p(Rn, { children: w.getHeaderGroups().map((E) => /* @__PURE__ */ p(xt, { children: E.headers.filter((R) => R.column.columnDef.header).map((R) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ p(Dr, { colSpan: R.colSpan, className: "top-0 pr-sticky", children: R.isPlaceholder ? void 0 : /* @__PURE__ */ $("div", { children: [
          R.column.getCanGroup() ? /* @__PURE__ */ p(
            xe,
            {
              variant: "ghost",
              title: `Toggle grouping by ${R.column.columnDef.header}`,
              onClick: R.column.getToggleGroupingHandler(),
              type: "button",
              children: R.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Sr(R.column.columnDef.header, R.getContext())
        ] }) }, R.id)
      )) }, E.id)) }),
      /* @__PURE__ */ p(Pn, { children: w.getRowModel().rows.map((E, R) => /* @__PURE__ */ p(
        xt,
        {
          "data-state": E.getIsSelected() ? "selected" : "",
          className: A(D(E, R)),
          onClick: (_) => I(E, _),
          children: E.getVisibleCells().map((_) => {
            if (!(_.getIsPlaceholder() || _.column.columnDef.enableGrouping && !_.getIsGrouped() && (_.column.columnDef.id !== _t || !r)))
              return /* @__PURE__ */ p(
                tr,
                {
                  className: A(
                    _.column.columnDef.id,
                    "pr-p-[1px]",
                    V(f, E, _)
                  ),
                  children: (() => _.getIsGrouped() ? /* @__PURE__ */ $(
                    xe,
                    {
                      variant: "link",
                      onClick: E.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        E.getIsExpanded() && /* @__PURE__ */ p(Nn, {}),
                        !E.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ p(Di, {}) : /* @__PURE__ */ p(kc, {})),
                        " ",
                        Sr(_.column.columnDef.cell, _.getContext()),
                        " (",
                        E.subRows.length,
                        ")"
                      ]
                    }
                  ) : Sr(_.column.columnDef.cell, _.getContext()))()
                },
                _.id
              );
          })
        },
        E.id
      )) })
    ] })
  ] });
}
function sv({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ p(
    zr,
    {
      className: A(
        "pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        { "pr-w-full": r }
      ),
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
function x0({
  id: e,
  isDisabled: t = !1,
  orientation: r = "horizontal",
  min: n = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: f = "off",
  className: m,
  onChange: b,
  onChangeCommitted: g
}) {
  return /* @__PURE__ */ p(
    Wc,
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
      valueLabelDisplay: f,
      className: `papi-slider ${r} ${m ?? ""}`,
      onChange: b,
      onChangeCommitted: g
    }
  );
}
function k0({
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
const bl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.Root,
  {
    orientation: "vertical",
    ref: r,
    className: A("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
bl.displayName = je.List.displayName;
const yl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.List,
  {
    ref: r,
    className: A(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
yl.displayName = je.List.displayName;
const lv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.Trigger,
  {
    ref: r,
    ...t,
    className: A(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), wl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.Content,
  {
    ref: r,
    className: A(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
wl.displayName = je.Content.displayName;
function E0({
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
        sv,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ $(bl, { dir: a, children: [
      /* @__PURE__ */ p(yl, { children: e.map((i) => /* @__PURE__ */ p(lv, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ p(wl, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const xl = U.forwardRef(({ className: e, orientation: t = "horizontal", decorative: r = !0, ...n }, o) => /* @__PURE__ */ p(
  Hi.Root,
  {
    ref: o,
    decorative: r,
    orientation: t,
    className: A(
      "pr-twp pr-shrink-0 pr-bg-border",
      t === "horizontal" ? "pr-h-[1px] pr-w-full" : "pr-h-full pr-w-[1px]",
      e
    ),
    ...n
  }
));
xl.displayName = Hi.Root.displayName;
function N0({ children: e }) {
  return /* @__PURE__ */ p("div", { className: "pr-twp pr-grid", children: e });
}
function T0({
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
function S0({
  primary: e,
  secondary: t,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ $("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ p("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ p("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ p(xl, {}) : ""
  ] });
}
const Jr = En(({ className: e, ...t }, r) => /* @__PURE__ */ p(Ec, { size: 35, className: A("pr-animate-spin", e), ...t, ref: r }));
Jr.displayName = "Spinner";
function C0({
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
const cv = Tn(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), kl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(Gi.Root, { ref: r, className: A(cv(), e), ...t }));
kl.displayName = Gi.Root.displayName;
function O0({
  id: e,
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: f,
  value: m,
  onChange: b,
  onFocus: g,
  onBlur: d
}) {
  return /* @__PURE__ */ $("div", { className: A("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ p(
      kl,
      {
        htmlFor: e,
        className: A({
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
        className: A(c, { "pr-border-red-600": r }),
        defaultValue: f,
        value: m,
        onChange: b,
        onFocus: g,
        onBlur: d
      }
    ),
    /* @__PURE__ */ p("p", { className: A({ "pr-hidden": !o }), children: o })
  ] });
}
function R0({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = At(void 0);
  return /* @__PURE__ */ p("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ p(Kc, { position: "static", id: n, children: /* @__PURE__ */ $(Jc, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ p(
      ev,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ p("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const pv = Tn(
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
), dv = U.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ p("div", { ref: n, role: "alert", className: A(pv({ variant: t }), e), ...r }));
dv.displayName = "Alert";
const uv = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ $(
    "h5",
    {
      ref: r,
      className: A("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
uv.displayName = "AlertTitle";
const fv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { ref: r, className: A("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
fv.displayName = "AlertDescription";
const mv = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      className: A(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
mv.displayName = "Card";
const hv = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "div",
    {
      ref: r,
      className: A("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
hv.displayName = "CardHeader";
const gv = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p(
    "h3",
    {
      ref: r,
      className: A("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
gv.displayName = "CardTitle";
const vv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p("p", { ref: r, className: A("pr-text-sm pr-text-muted-foreground", e), ...t }));
vv.displayName = "CardDescription";
const bv = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { ref: r, className: A("pr-p-6 pr-pt-0", e), ...t })
);
bv.displayName = "CardContent";
const yv = U.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ p("div", { ref: r, className: A("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
yv.displayName = "CardFooter";
function P0({ ...e }) {
  const { theme: t = "system" } = rp();
  return /* @__PURE__ */ p(
    np,
    {
      theme: t,
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
const wv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ $(
  kr.Root,
  {
    ref: r,
    className: A(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ p(kr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ p(kr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ p(kr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
wv.displayName = kr.Root.displayName;
const xv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  bo.Root,
  {
    className: A(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ p(
      bo.Thumb,
      {
        className: A(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
xv.displayName = bo.Root.displayName;
const $0 = je.Root, kv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.List,
  {
    ref: r,
    className: A(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
kv.displayName = je.List.displayName;
const Ev = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.Trigger,
  {
    ref: r,
    className: A(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Ev.displayName = je.Trigger.displayName;
const Nv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  je.Content,
  {
    ref: r,
    className: A(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Nv.displayName = je.Content.displayName;
const Tv = 1, Sv = 1e6;
let co = 0;
function Cv() {
  return co = (co + 1) % Number.MAX_SAFE_INTEGER, co.toString();
}
const po = /* @__PURE__ */ new Map(), Oi = (e) => {
  if (po.has(e))
    return;
  const t = setTimeout(() => {
    po.delete(e), _r({
      type: "REMOVE_TOAST",
      toastId: e
    });
  }, Sv);
  po.set(e, t);
}, Ov = (e, t) => {
  switch (t.type) {
    case "ADD_TOAST":
      return {
        ...e,
        toasts: [t.toast, ...e.toasts].slice(0, Tv)
      };
    case "UPDATE_TOAST":
      return {
        ...e,
        toasts: e.toasts.map((r) => r.id === t.toast.id ? { ...r, ...t.toast } : r)
      };
    case "DISMISS_TOAST": {
      const { toastId: r } = t;
      return r ? Oi(r) : e.toasts.forEach((n) => {
        Oi(n.id);
      }), {
        ...e,
        toasts: e.toasts.map(
          (n) => n.id === r || r === void 0 ? {
            ...n,
            open: !1
          } : n
        )
      };
    }
    case "REMOVE_TOAST":
      return t.toastId === void 0 ? {
        ...e,
        toasts: []
      } : {
        ...e,
        toasts: e.toasts.filter((r) => r.id !== t.toastId)
      };
    default:
      throw new Error("Unknown toast action type");
  }
}, un = [];
let fn = { toasts: [] };
function _r(e) {
  fn = Ov(fn, e), un.forEach((t) => {
    t(fn);
  });
}
function Rv({ ...e }) {
  const t = Cv(), r = (o) => _r({
    type: "UPDATE_TOAST",
    toast: { ...o, id: t }
  }), n = () => _r({ type: "DISMISS_TOAST", toastId: t });
  return _r({
    type: "ADD_TOAST",
    toast: {
      ...e,
      id: t,
      open: !0,
      onOpenChange: (o) => {
        o || n();
      }
    }
  }), {
    id: t,
    dismiss: n,
    update: r
  };
}
function Pv() {
  const [e, t] = U.useState(fn);
  return U.useEffect(() => (un.push(t), () => {
    const r = un.indexOf(t);
    r > -1 && un.splice(r, 1);
  }), [e]), {
    ...e,
    toast: Rv,
    dismiss: (r) => _r({ type: "DISMISS_TOAST", toastId: r })
  };
}
const $v = Ue.Provider, El = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Ue.Viewport,
  {
    ref: r,
    className: A(
      "pr-fixed pr-top-0 pr-z-[100] pr-flex pr-max-h-screen pr-w-full pr-flex-col-reverse pr-p-4 sm:pr-bottom-0 sm:pr-right-0 sm:pr-top-auto sm:pr-flex-col md:pr-max-w-[420px]",
      e
    ),
    ...t
  }
));
El.displayName = Ue.Viewport.displayName;
const _v = Tn(
  "pr-group pr-pointer-events-auto pr-relative pr-flex pr-w-full pr-items-center pr-justify-between pr-space-x-4 pr-overflow-hidden pr-rounded-md pr-border pr-p-6 pr-pr-8 pr-shadow-lg pr-transition-all data-[swipe=cancel]:pr-translate-x-0 data-[swipe=end]:pr-translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:pr-translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:pr-transition-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[swipe=end]:pr-animate-out data-[state=closed]:pr-fade-out-80 data-[state=closed]:pr-slide-out-to-right-full data-[state=open]:pr-slide-in-from-top-full data-[state=open]:sm:pr-slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "pr-border pr-bg-background pr-text-foreground",
        destructive: "pr-destructive pr-group pr-border-destructive pr-bg-destructive pr-text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
), Nl = U.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ p(
  Ue.Root,
  {
    ref: n,
    className: A("pr-twp", _v({ variant: t }), e),
    ...r
  }
));
Nl.displayName = Ue.Root.displayName;
const Iv = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Ue.Action,
  {
    ref: r,
    className: A(
      "pr-inline-flex pr-h-8 pr-shrink-0 pr-items-center pr-justify-center pr-rounded-md pr-border pr-bg-transparent pr-px-3 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-colors hover:pr-bg-secondary focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 group-[.destructive]:pr-border-muted/40 group-[.destructive]:hover:pr-border-destructive/30 group-[.destructive]:hover:pr-bg-destructive group-[.destructive]:hover:pr-text-destructive-foreground group-[.destructive]:focus:pr-ring-destructive",
      e
    ),
    ...t
  }
));
Iv.displayName = Ue.Action.displayName;
const Tl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Ue.Close,
  {
    ref: r,
    className: A(
      "pr-absolute pr-right-2 pr-top-2 pr-rounded-md pr-p-1 pr-text-foreground/50 pr-opacity-0 pr-transition-opacity hover:pr-text-foreground focus:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 group-hover:pr-opacity-100 group-[.destructive]:pr-text-red-300 group-[.destructive]:hover:pr-text-red-50 group-[.destructive]:focus:pr-ring-red-400 group-[.destructive]:focus:pr-ring-offset-red-600",
      e
    ),
    "toast-close": "",
    ...t,
    children: /* @__PURE__ */ p(ji, { className: "pr-h-4 pr-w-4" })
  }
));
Tl.displayName = Ue.Close.displayName;
const Sl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Ue.Title,
  {
    ref: r,
    className: A("pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Sl.displayName = Ue.Title.displayName;
const Cl = U.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ p(
  Ue.Description,
  {
    ref: r,
    className: A("pr-text-sm pr-opacity-90", e),
    ...t
  }
));
Cl.displayName = Ue.Description.displayName;
function _0() {
  const { toasts: e } = Pv();
  return /* @__PURE__ */ $($v, { children: [
    e.map(({ id: t, title: r, description: n, action: o, ...a }) => /* @__PURE__ */ $(Nl, { ...a, children: [
      /* @__PURE__ */ $("div", { className: "pr-twp pr-grid pr-gap-1", children: [
        r && /* @__PURE__ */ p(Sl, { children: r }),
        n && /* @__PURE__ */ p(Cl, { children: n })
      ] }),
      o,
      /* @__PURE__ */ p(Tl, {})
    ] }, t)),
    /* @__PURE__ */ p(El, {})
  ] });
}
function I0({
  isInstalling: e,
  handleClick: t,
  buttonText: r,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ p(
    xe,
    {
      className: A(
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
        /* @__PURE__ */ p(Nc, { size: 25, className: A("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function M0({
  isEnabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    xe,
    {
      className: A(
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
function A0({
  isDisabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    xe,
    {
      className: A(
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
function D0({
  isUpdating: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ p(
    xe,
    {
      className: A(
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
const Mv = ["children", "options"], Ri = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), Pi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Av = ["style", "script"], Dv = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, jv = /mailto:/i, Bv = /\n{2,}$/, Ol = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Lv = /^ *> ?/gm, Vv = /^ {2,}\n/, Fv = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Rl = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Pl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, zv = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Uv = /^(?:\n *)*\n/, Hv = /\r\n?/g, Gv = /^\[\^([^\]]+)](:.*)\n/, Xv = /^\[\^([^\]]+)]/, Wv = /\f/g, Yv = /^\s*?\[(x|\s)\]/, $l = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, _l = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Il = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, $o = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, qv = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Ml = /^<!--[\s\S]*?(?:-->)/, Kv = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, _o = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Jv = /^\{.*\}$/, Zv = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, Qv = /^<([^ >]+@[^ >]+)>/, eb = /^<([^ >]+:\/[^ >]+)>/, tb = /-([a-z])?/gi, Al = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, rb = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, nb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, ob = /^\[([^\]]*)\] ?\[([^\]]*)\]/, ab = /(\[|\])/g, ib = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, sb = /\t/g, lb = /^ *\| */, cb = /(^ *\||\| *$)/g, pb = / *$/, db = /^ *:-+: *$/, ub = /^ *:-+ *$/, fb = /^ *-+: *$/, mb = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, hb = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, gb = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, vb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, bb = /^\\([^0-9A-Za-z\s])/, yb = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, wb = /^\n+/, xb = /^([ \t]*)/, kb = /\\([^\\])/g, $i = / *\n+$/, Eb = /(?:^|\n)( *)$/, sa = "(?:\\d+\\.)", la = "(?:[*+-])";
function Dl(e) {
  return "( *)(" + (e === 1 ? sa : la) + ") +";
}
const jl = Dl(1), Bl = Dl(2);
function Ll(e) {
  return new RegExp("^" + (e === 1 ? jl : Bl));
}
const Nb = Ll(1), Tb = Ll(2);
function Vl(e) {
  return new RegExp("^" + (e === 1 ? jl : Bl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? sa : la) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Fl = Vl(1), zl = Vl(2);
function Ul(e) {
  const t = e === 1 ? sa : la;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Hl = Ul(1), Gl = Ul(2);
function _i(e, t) {
  const r = t === 1, n = r ? Hl : Gl, o = r ? Fl : zl, a = r ? Nb : Tb;
  return { t(i, l, c) {
    const f = Eb.exec(c);
    return f && (l.o || !l._ && !l.u) ? n.exec(i = f[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const f = r ? +i[2] : void 0, m = i[0].replace(Bv, `
`).match(o);
    let b = !1;
    return { p: m.map(function(g, d) {
      const h = a.exec(g)[0].length, u = new RegExp("^ {1," + h + "}", "gm"), v = g.replace(u, "").replace(a, ""), x = d === m.length - 1, O = v.indexOf(`

`) !== -1 || x && b;
      b = O;
      const w = c._, k = c.o;
      let y;
      c.o = !0, O ? (c._ = !1, y = v.replace($i, `

`)) : (c._ = !0, y = v.replace($i, ""));
      const T = l(y, c);
      return c._ = w, c.o = k, T;
    }), m: r, g: f };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(f, m) {
    return e("li", { key: m }, l(f, c));
  })) };
}
const Sb = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Cb = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Xl = [Ol, Rl, Pl, $l, Il, _l, Ml, Al, Fl, Hl, zl, Gl], Ob = [...Xl, /^[^\n]+(?:  \n|\n{2,})/, $o, _o];
function Rb(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Pb(e) {
  return fb.test(e) ? "right" : db.test(e) ? "center" : ub.test(e) ? "left" : null;
}
function Ii(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(pb, "")), a[a.length - 1].push(i));
  }), a;
}
function $b(e, t, r) {
  r._ = !0;
  const n = Ii(e[1], t, r), o = e[2].replace(cb, "").split("|").map(Pb), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(f) {
      return Ii(f, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: a, L: n, type: "table" };
}
function Mi(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function vt(e) {
  return function(t, r) {
    return r._ ? e.exec(t) : null;
  };
}
function bt(e) {
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
function _b(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !Xl.some((i) => i.test(a)) && (n += a + `
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
function Ai(e) {
  return e.replace(kb, "$1");
}
function mn(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Ib(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Mb(e, t, r) {
  return r._ = !1, e(t, r);
}
const uo = (e, t, r) => ({ v: mn(t, e[1], r) });
function fo() {
  return {};
}
function mo() {
  return null;
}
function Ab(...e) {
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
function Db(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Rb, t.namedCodesToUnicode = t.namedCodesToUnicode ? Mt({}, Pi, t.namedCodesToUnicode) : Pi;
  const r = t.createElement || N.createElement;
  function n(d, h, ...u) {
    const v = ho(t.overrides, `${d}.props`, {});
    return r(function(x, O) {
      const w = ho(O, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : ho(O, `${x}.component`, x) : x;
    }(d, t.overrides), Mt({}, h, v, { className: Ab(h == null ? void 0 : h.className, v.className) || void 0 }), ...u);
  }
  function o(d) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = ib.test(d) === !1);
    const u = m(f(h ? d : `${d.trimEnd().replace(wb, "")}

`, { _: h }));
    for (; typeof u[u.length - 1] == "string" && !u[u.length - 1].trim(); )
      u.pop();
    if (t.wrapper === null)
      return u;
    const v = t.wrapper || (h ? "span" : "div");
    let x;
    if (u.length > 1 || t.forceWrapper)
      x = u;
    else {
      if (u.length === 1)
        return x = u[0], typeof x == "string" ? n("span", { key: "outer" }, x) : x;
      x = null;
    }
    return N.createElement(v, { key: "outer" }, x);
  }
  function a(d) {
    const h = d.match(Dv);
    return h ? h.reduce(function(u, v, x) {
      const O = v.indexOf("=");
      if (O !== -1) {
        const w = function(S) {
          return S.indexOf("-") !== -1 && S.match(Kv) === null && (S = S.replace(tb, function(I, D) {
            return D.toUpperCase();
          })), S;
        }(v.slice(0, O)).trim(), k = function(S) {
          const I = S[0];
          return (I === '"' || I === "'") && S.length >= 2 && S[S.length - 1] === I ? S.slice(1, -1) : S;
        }(v.slice(O + 1).trim()), y = Ri[w] || w, T = u[y] = function(S, I) {
          return S === "style" ? I.split(/;\s?/).reduce(function(D, V) {
            const E = V.slice(0, V.indexOf(":"));
            return D[E.replace(/(-[a-z])/g, (R) => R[1].toUpperCase())] = V.slice(E.length + 1).trim(), D;
          }, {}) : S === "href" ? qt(I) : (I.match(Jv) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(w, k);
        typeof T == "string" && ($o.test(T) || _o.test(T)) && (u[y] = N.cloneElement(o(T.trim()), { key: x }));
      } else
        v !== "style" && (u[Ri[v] || v] = !0);
      return u;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: lt(Ol), i: ae.HIGH, l: (d, h, u) => ({ v: h(d[0].replace(Lv, ""), u) }), h: (d, h, u) => n("blockquote", { key: u.k }, h(d.v, u)) }, breakLine: { t: xr(Vv), i: ae.HIGH, l: fo, h: (d, h, u) => n("br", { key: u.k }) }, breakThematic: { t: lt(Fv), i: ae.HIGH, l: fo, h: (d, h, u) => n("hr", { key: u.k }) }, codeBlock: { t: lt(Pl), i: ae.MAX, l: (d) => ({ v: d[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (d, h, u) => n("pre", { key: u.k }, n("code", Mt({}, d.O, { className: d.M ? `lang-${d.M}` : "" }), d.v)) }, codeFenced: { t: lt(Rl), i: ae.MAX, l: (d) => ({ O: a(d[3] || ""), v: d[4], M: d[2] || void 0, type: "codeBlock" }) }, codeInline: { t: bt(zv), i: ae.LOW, l: (d) => ({ v: d[2] }), h: (d, h, u) => n("code", { key: u.k }, d.v) }, footnote: { t: lt(Gv), i: ae.MAX, l: (d) => (i.push({ I: d[2], j: d[1] }), {}), h: mo }, footnoteReference: { t: vt(Xv), i: ae.HIGH, l: (d) => ({ v: d[1], B: `#${t.slugify(d[1])}` }), h: (d, h, u) => n("a", { key: u.k, href: qt(d.B) }, n("sup", { key: u.k }, d.v)) }, gfmTask: { t: vt(Yv), i: ae.HIGH, l: (d) => ({ R: d[1].toLowerCase() === "x" }), h: (d, h, u) => n("input", { checked: d.R, key: u.k, readOnly: !0, type: "checkbox" }) }, heading: { t: lt(t.enforceAtxHeadings ? _l : $l), i: ae.HIGH, l: (d, h, u) => ({ v: mn(h, d[2], u), T: t.slugify(d[2]), C: d[1].length }), h: (d, h, u) => n(`h${d.C}`, { id: d.T, key: u.k }, h(d.v, u)) }, headingSetext: { t: lt(Il), i: ae.MAX, l: (d, h, u) => ({ v: mn(h, d[1], u), C: d[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: xr(Ml), i: ae.HIGH, l: () => ({}), h: mo }, image: { t: bt(Cb), i: ae.HIGH, l: (d) => ({ D: d[1], B: Ai(d[2]), F: d[3] }), h: (d, h, u) => n("img", { key: u.k, alt: d.D || void 0, title: d.F || void 0, src: qt(d.B) }) }, link: { t: vt(Sb), i: ae.LOW, l: (d, h, u) => ({ v: Ib(h, d[1], u), B: Ai(d[2]), F: d[3] }), h: (d, h, u) => n("a", { key: u.k, href: qt(d.B), title: d.F }, h(d.v, u)) }, linkAngleBraceStyleDetector: { t: vt(eb), i: ae.MAX, l: (d) => ({ v: [{ v: d[1], type: "text" }], B: d[1], type: "link" }) }, linkBareUrlDetector: { t: (d, h) => h.N ? null : vt(Zv)(d, h), i: ae.MAX, l: (d) => ({ v: [{ v: d[1], type: "text" }], B: d[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: vt(Qv), i: ae.MAX, l(d) {
    let h = d[1], u = d[1];
    return jv.test(u) || (u = "mailto:" + u), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: u, type: "link" };
  } }, orderedList: _i(n, 1), unorderedList: _i(n, 2), newlineCoalescer: { t: lt(Uv), i: ae.LOW, l: fo, h: () => `
` }, paragraph: { t: _b, i: ae.LOW, l: uo, h: (d, h, u) => n("p", { key: u.k }, h(d.v, u)) }, ref: { t: vt(rb), i: ae.MAX, l: (d) => (l[d[1]] = { B: d[2], F: d[4] }, {}), h: mo }, refImage: { t: bt(nb), i: ae.MAX, l: (d) => ({ D: d[1] || void 0, P: d[2] }), h: (d, h, u) => n("img", { key: u.k, alt: d.D, src: qt(l[d.P].B), title: l[d.P].F }) }, refLink: { t: vt(ob), i: ae.MAX, l: (d, h, u) => ({ v: h(d[1], u), Z: h(d[0].replace(ab, "\\$1"), u), P: d[2] }), h: (d, h, u) => l[d.P] ? n("a", { key: u.k, href: qt(l[d.P].B), title: l[d.P].F }, h(d.v, u)) : n("span", { key: u.k }, h(d.Z, u)) }, table: { t: lt(Al), i: ae.HIGH, l: $b, h: (d, h, u) => n("table", { key: u.k }, n("thead", null, n("tr", null, d.L.map(function(v, x) {
    return n("th", { key: x, style: Mi(d, x) }, h(v, u));
  }))), n("tbody", null, d.A.map(function(v, x) {
    return n("tr", { key: x }, v.map(function(O, w) {
      return n("td", { key: w, style: Mi(d, w) }, h(O, u));
    }));
  }))) }, tableSeparator: { t: function(d, h) {
    return h.$ ? (h._ = !0, lb.exec(d)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: xr(yb), i: ae.MIN, l: (d) => ({ v: d[0].replace(qv, (h, u) => t.namedCodesToUnicode[u] ? t.namedCodesToUnicode[u] : h) }), h: (d) => d.v }, textBolded: { t: bt(mb), i: ae.MED, l: (d, h, u) => ({ v: h(d[2], u) }), h: (d, h, u) => n("strong", { key: u.k }, h(d.v, u)) }, textEmphasized: { t: bt(hb), i: ae.LOW, l: (d, h, u) => ({ v: h(d[2], u) }), h: (d, h, u) => n("em", { key: u.k }, h(d.v, u)) }, textEscaped: { t: bt(bb), i: ae.HIGH, l: (d) => ({ v: d[1], type: "text" }) }, textMarked: { t: bt(gb), i: ae.LOW, l: uo, h: (d, h, u) => n("mark", { key: u.k }, h(d.v, u)) }, textStrikethroughed: { t: bt(vb), i: ae.LOW, l: uo, h: (d, h, u) => n("del", { key: u.k }, h(d.v, u)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: xr($o), i: ae.HIGH, l(d, h, u) {
    const [, v] = d[3].match(xb), x = new RegExp(`^${v}`, "gm"), O = d[3].replace(x, ""), w = (k = O, Ob.some((I) => I.test(k)) ? Mb : mn);
    var k;
    const y = d[1].toLowerCase(), T = Av.indexOf(y) !== -1;
    u.N = u.N || y === "a";
    const S = T ? d[3] : w(h, O, u);
    return u.N = !1, { O: a(d[2]), v: S, G: T, H: T ? y : d[1] };
  }, h: (d, h, u) => n(d.H, Mt({ key: u.k }, d.O), d.G ? d.v : h(d.v, u)) }, c.htmlSelfClosing = { t: xr(_o), i: ae.HIGH, l: (d) => ({ O: a(d[2] || ""), H: d[1] }), h: (d, h, u) => n(d.H, Mt({}, d.O, { key: u.k })) });
  const f = function(d) {
    let h = Object.keys(d);
    function u(v, x) {
      let O = [], w = "";
      for (; v; ) {
        let k = 0;
        for (; k < h.length; ) {
          const y = h[k], T = d[y], S = T.t(v, x, w);
          if (S) {
            const I = S[0];
            v = v.substring(I.length);
            const D = T.l(S, u, x);
            D.type == null && (D.type = y), O.push(D), w = I;
            break;
          }
          k++;
        }
      }
      return O;
    }
    return h.sort(function(v, x) {
      let O = d[v].i, w = d[x].i;
      return O !== w ? O - w : v < x ? -1 : 1;
    }), function(v, x) {
      return u(function(O) {
        return O.replace(Hv, `
`).replace(Wv, "").replace(sb, "    ");
      }(v), x);
    };
  }(c), m = (b = function(d) {
    return function(h, u, v) {
      return d[h.type].h(h, u, v);
    };
  }(c), function d(h, u = {}) {
    if (Array.isArray(h)) {
      const v = u.k, x = [];
      let O = !1;
      for (let w = 0; w < h.length; w++) {
        u.k = w;
        const k = d(h[w], u), y = typeof k == "string";
        y && O ? x[x.length - 1] += k : k !== null && x.push(k), O = y;
      }
      return u.k = v, x;
    }
    return b(h, d, u);
  });
  var b;
  const g = o(e);
  return i.length ? n("div", null, g, n("footer", { key: "footer" }, i.map(function(d) {
    return n("div", { id: t.slugify(d.j), key: d.j }, d.j, m(f(d.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const jb = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, f = Object.keys(o);
    for (l = 0; l < f.length; l++)
      a.indexOf(i = f[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Mv);
  return N.cloneElement(Db(t, r), n);
};
function j0({ id: e, markdown: t }) {
  return /* @__PURE__ */ p("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ p(jb, { children: t }) });
}
const Bb = En((e, t) => /* @__PURE__ */ $(
  xe,
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
var Lb = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Lb || {});
function B0({ id: e, groups: t }) {
  return /* @__PURE__ */ p("div", { id: e, children: /* @__PURE__ */ $(jo, { children: [
    /* @__PURE__ */ p(Zi, { asChild: !0, children: /* @__PURE__ */ p(Bb, {}) }),
    /* @__PURE__ */ p(Sn, { children: t.map((r) => /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ p(Ur, { children: r.label }),
      /* @__PURE__ */ p(bp, { children: r.items.map((n) => /* @__PURE__ */ p("div", { children: n.itemType === 0 ? /* @__PURE__ */ p(Bo, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ p(es, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ p(Cn, {})
    ] }, r.label)) })
  ] }) });
}
function L0({ id: e, message: t }) {
  return /* @__PURE__ */ p("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ p("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ p("p", { className: "pr-text-lg pr-text-gray-800", children: t }) }) });
}
function V0({
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
function Vb({ id: e, versionHistory: t }) {
  const [r, n] = fe(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), f = new Date(o.getTime() - c.getTime()), m = f.getUTCFullYear() - 1970, b = f.getUTCMonth(), g = f.getUTCDate() - 1;
    let d = "";
    return m > 0 ? d = `${m.toString()} year${m === 1 ? "" : "s"} ago` : b > 0 ? d = `${b.toString()} month${b === 1 ? "" : "s"} ago` : g === 0 ? d = "today" : d = `${g.toString()} day${g === 1 ? "" : "s"} ago`, d;
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
function F0({
  id: e,
  publisherDisplayName: t,
  fileSize: r,
  locales: n,
  versionHistory: o
}) {
  const a = kt(() => Mc(r), [r]), l = ((c) => {
    const f = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((m) => f.of(m));
  })(n);
  return /* @__PURE__ */ p("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ $("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ p(Vb, { versionHistory: o }),
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
const z0 = (e, t) => {
  Ze(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, go = () => !1, U0 = (e, t) => {
  const [r] = Po(
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
  Ze(() => () => {
    r !== go && r();
  }, [r]);
};
function Fb(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
Fb(`/*
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

    .pr-bg-muted\\/40 {
      background-color: hsl(33.9, 32.4%, 86.1%, 0.4);
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

    .pr-bg-muted\\/40 {
      background-color: hsl(15.5, 13.2%, 53.9%, 0.4);
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
.pr-pointer-events-auto {
  pointer-events: auto;
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
.pr-right-2 {
  right: 0.5rem;
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
.pr-z-\\[100\\] {
  z-index: 100;
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
.pr-mt-1 {
  margin-top: 0.25rem;
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
.pr-max-h-screen {
  max-height: 100vh;
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
.pr-auto-rows-max {
  grid-auto-rows: max-content;
}
.pr-grid-cols-2 {
  grid-template-columns: repeat(2, minmax(0, 1fr));
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
.pr-border-destructive {
  border-color: hsl(var(--destructive));
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
.pr-pr-8 {
  padding-right: 2rem;
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
.pr-font-sans {
  font-family: ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
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
.pr-text-foreground\\/50 {
  color: hsl(var(--foreground) / 0.5);
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
.pr-opacity-90 {
  opacity: 0.9;
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
.hover\\:pr-bg-muted\\/50:hover {
  background-color: hsl(var(--muted) / 0.5);
}
.hover\\:pr-bg-primary\\/90:hover {
  background-color: hsl(var(--primary) / 0.9);
}
.hover\\:pr-bg-secondary:hover {
  background-color: hsl(var(--secondary));
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
.focus\\:pr-opacity-100:focus {
  opacity: 1;
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
.pr-group.destructive .group-\\[\\.destructive\\]\\:pr-border-muted\\/40 {
  border-color: hsl(var(--muted) / 0.4);
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:pr-text-red-300 {
  --tw-text-opacity: 1;
  color: rgb(252 165 165 / var(--tw-text-opacity));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-border-destructive\\/30:hover {
  border-color: hsl(var(--destructive) / 0.3);
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-bg-destructive:hover {
  background-color: hsl(var(--destructive));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-text-destructive-foreground:hover {
  color: hsl(var(--destructive-foreground));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:hover\\:pr-text-red-50:hover {
  --tw-text-opacity: 1;
  color: rgb(254 242 242 / var(--tw-text-opacity));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:focus\\:pr-ring-destructive:focus {
  --tw-ring-color: hsl(var(--destructive));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:focus\\:pr-ring-red-400:focus {
  --tw-ring-opacity: 1;
  --tw-ring-color: rgb(248 113 113 / var(--tw-ring-opacity));
}
.pr-group.destructive .group-\\[\\.destructive\\]\\:focus\\:pr-ring-offset-red-600:focus {
  --tw-ring-offset-color: #dc2626;
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
.data-\\[swipe\\=cancel\\]\\:pr-translate-x-0[data-swipe=cancel] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[swipe\\=end\\]\\:pr-translate-x-\\[var\\(--radix-toast-swipe-end-x\\)\\][data-swipe=end] {
  --tw-translate-x: var(--radix-toast-swipe-end-x);
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[swipe\\=move\\]\\:pr-translate-x-\\[var\\(--radix-toast-swipe-move-x\\)\\][data-swipe=move] {
  --tw-translate-x: var(--radix-toast-swipe-move-x);
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
.data-\\[swipe\\=move\\]\\:pr-transition-none[data-swipe=move] {
  transition-property: none;
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
.data-\\[swipe\\=end\\]\\:pr-animate-out[data-swipe=end] {
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
.data-\\[state\\=closed\\]\\:pr-fade-out-80[data-state=closed] {
  --tw-exit-opacity: 0.8;
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
.data-\\[state\\=closed\\]\\:pr-slide-out-to-right-full[data-state=closed] {
  --tw-exit-translate-x: 100%;
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
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-full[data-state=open] {
  --tw-enter-translate-y: -100%;
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

  .sm\\:pr-bottom-0 {
    bottom: 0px;
  }

  .sm\\:pr-right-0 {
    right: 0px;
  }

  .sm\\:pr-top-auto {
    top: auto;
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

  .sm\\:pr-flex-col {
    flex-direction: column;
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

  .data-\\[state\\=open\\]\\:sm\\:pr-slide-in-from-bottom-full[data-state=open] {
    --tw-enter-translate-y: 100%;
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

  .md\\:pr-max-w-\\[420px\\] {
    max-width: 420px;
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
  display: flex;
  gap: 8px;
}
`, "top");
export {
  dv as Alert,
  fv as AlertDescription,
  uv as AlertTitle,
  c0 as BookChapterControl,
  xe as Button,
  mv as Card,
  bv as CardContent,
  vv as CardDescription,
  yv as CardFooter,
  hv as CardHeader,
  gv as CardTitle,
  g0 as ChapterRangeSelector,
  ed as Checkbox,
  v0 as Checklist,
  Ia as ComboBox,
  b0 as ContextMenu,
  Vp as DataTable,
  A0 as DisableButton,
  jo as DropdownMenu,
  Bo as DropdownMenuCheckboxItem,
  Sn as DropdownMenuContent,
  bp as DropdownMenuGroup,
  Qi as DropdownMenuItem,
  Lb as DropdownMenuItemType,
  Ur as DropdownMenuLabel,
  i0 as DropdownMenuPortal,
  l0 as DropdownMenuRadioGroup,
  es as DropdownMenuRadioItem,
  Cn as DropdownMenuSeparator,
  xp as DropdownMenuShortcut,
  s0 as DropdownMenuSub,
  wp as DropdownMenuSubContent,
  yp as DropdownMenuSubTrigger,
  Zi as DropdownMenuTrigger,
  M0 as EnableButton,
  Bb as FilterButton,
  B0 as FilterDropdown,
  F0 as Footer,
  sg as GridMenu,
  ev as HamburgerMenuButton,
  p0 as INVENTORY_STRING_KEYS,
  y0 as IconButton,
  zr as Input,
  I0 as InstallButton,
  d0 as Inventory,
  kl as Label,
  Kt as LabelPosition,
  j0 as MarkdownRenderer,
  ol as MenuItem,
  V0 as MoreInfo,
  E0 as NavigationContentSearch,
  L0 as NoExtensionsFound,
  w0 as ScriptureResultsViewer,
  h0 as ScrollGroupSelector,
  sv as SearchBar,
  Mr as Select,
  er as SelectContent,
  Mp as SelectGroup,
  Je as SelectItem,
  Ap as SelectLabel,
  rs as SelectScrollDownButton,
  ts as SelectScrollUpButton,
  Dp as SelectSeparator,
  Qt as SelectTrigger,
  Ar as SelectValue,
  xl as Separator,
  N0 as SettingsList,
  S0 as SettingsListHeader,
  T0 as SettingsListItem,
  wv as ShadCnSlider,
  xv as ShadCnSwitch,
  x0 as Slider,
  k0 as Snackbar,
  P0 as Sonner,
  Jr as Spinner,
  C0 as Switch,
  On as Table,
  Pn as TableBody,
  Lp as TableCaption,
  tr as TableCell,
  Bp as TableFooter,
  Dr as TableHead,
  Rn as TableHeader,
  xt as TableRow,
  $0 as Tabs,
  Nv as TabsContent,
  kv as TabsList,
  Ev as TabsTrigger,
  O0 as TextField,
  _0 as Toaster,
  R0 as Toolbar,
  D0 as UpdateButton,
  Vb as VersionHistory,
  bl as VerticalTabs,
  wl as VerticalTabsContent,
  yl as VerticalTabsList,
  lv as VerticalTabsTrigger,
  _p as buttonVariants,
  Lo as getSortingIcon,
  f0 as inventoryCountColumn,
  u0 as inventoryItemColumn,
  m0 as inventoryStatusColumn,
  X0 as sonner,
  z0 as useEvent,
  U0 as useEventAsync,
  Po as usePromise,
  Pv as useToast
};
//# sourceMappingURL=index.js.map
