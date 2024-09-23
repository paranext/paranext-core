import Wl, { jsx as d, jsxs as $, Fragment as Et } from "react/jsx-runtime";
import * as N from "react";
import X, { forwardRef as wn, useCallback as Ce, useState as ge, useRef as Mt, useEffect as Qe, useLayoutEffect as va, useMemo as ct } from "react";
import { History as Xl, ChevronRight as Pi, Check as Co, Circle as Yl, ArrowDownWideNarrow as ql, Clock as Kl, Bookmark as Jl, FilterIcon as Zl, ChevronDown as xn, ChevronUp as Ql, ArrowLeftIcon as ec, ChevronLeftIcon as tc, ChevronRightIcon as rc, ArrowRightIcon as nc, ArrowUpIcon as oc, ArrowDownIcon as ac, ArrowUpDownIcon as ic, CircleCheckIcon as ya, CircleXIcon as wa, CircleHelpIcon as xa, X as sc, Search as lc, ChevronsUpDown as cc, ChevronLeft as pc, LoaderCircle as dc, Download as uc, Filter as fc, User as mc, Link as hc, CircleHelp as gc } from "lucide-react";
import Oe, { clsx as bc } from "clsx";
import { extendTailwindMerge as vc } from "tailwind-merge";
import * as be from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as yc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as wc, getLocalizeKeyForScrollGroupId as fe, formatScrRef as Hn, compareScrRefs as po, scrRefToBBBCCCVVV as Gn, NumberFormat as xc, formatBytes as Ec } from "platform-bible-utils";
import { useReactTable as $i, getCoreRowModel as _i, getPaginationRowModel as kc, getSortedRowModel as Ii, getFilteredRowModel as Nc, flexRender as Tr, getExpandedRowModel as Tc, getGroupedRowModel as Sc } from "@tanstack/react-table";
import { Slot as Cc } from "@radix-ui/react-slot";
import { cva as Oo } from "class-variance-authority";
import * as Ee from "@radix-ui/react-select";
import * as $r from "@radix-ui/react-popover";
import { Command as De } from "cmdk";
import * as et from "@radix-ui/react-dialog";
import * as Mi from "@radix-ui/react-label";
import { FormLabel as Oc, Checkbox as Rc, MenuItem as Pc, ListItemText as $c, ListItemIcon as Ai, Menu as _c, Grid as Di, List as Ic, IconButton as ji, Drawer as Mc, Slider as Ac, Snackbar as Dc, Switch as jc, AppBar as Bc, Toolbar as Lc } from "@mui/material";
import Fc, { ThemeContext as Vc, internal_processStyles as zc } from "@mui/styled-engine";
import * as Uc from "react-dom";
import Qr from "react-dom";
import * as je from "@radix-ui/react-tabs";
import * as Bi from "@radix-ui/react-separator";
import { Toaster as Hc } from "sonner";
import { toast as k0 } from "sonner";
import * as xr from "@radix-ui/react-slider";
import * as uo from "@radix-ui/react-switch";
const Gc = vc({ prefix: "pr-" });
function L(...e) {
  return Gc(bc(e));
}
const Fr = X.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ d(
    "input",
    {
      type: t,
      className: L(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
Fr.displayName = "Input";
const Wc = wn(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ $("div", { className: "pr-relative", children: [
    /* @__PURE__ */ d(
      Fr,
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
    /* @__PURE__ */ d(
      Xl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Xc = Object.defineProperty, Yc = (e, t, r) => t in e ? Xc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => Yc(e, typeof t != "symbol" ? t + "" : t, r);
const Dt = [
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
], Ro = [
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
], Li = [
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
], Ea = op();
function sr(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Ea ? Ea[e] : 0;
}
function Po(e) {
  return sr(e) > 0;
}
function qc(e) {
  const t = typeof e == "string" ? sr(e) : e;
  return t >= 40 && t <= 66;
}
function Kc(e) {
  return (typeof e == "string" ? sr(e) : e) <= 39;
}
function Fi(e) {
  return e <= 66;
}
function Jc(e) {
  const t = typeof e == "string" ? sr(e) : e;
  return Ui(t) && !Fi(t);
}
function* Zc() {
  for (let e = 1; e <= Dt.length; e++)
    yield e;
}
const Qc = 1, Vi = Dt.length;
function ep() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function $o(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= Dt.length ? t : Dt[r];
}
function zi(e) {
  return e <= 0 || e > Vi ? "******" : Li[e - 1];
}
function tp(e) {
  return zi(sr(e));
}
function Ui(e) {
  const t = typeof e == "number" ? $o(e) : e;
  return Po(t) && !Ro.includes(t);
}
function rp(e) {
  const t = typeof e == "number" ? $o(e) : e;
  return Po(t) && Ro.includes(t);
}
function np(e) {
  return Li[e - 1].includes("*obsolete*");
}
function op() {
  const e = {};
  for (let t = 0; t < Dt.length; t++)
    e[Dt[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Dt,
  nonCanonicalIds: Ro,
  bookIdToNumber: sr,
  isBookIdValid: Po,
  isBookNT: qc,
  isBookOT: Kc,
  isBookOTNT: Fi,
  isBookDC: Jc,
  allBookNumbers: Zc,
  firstBook: Qc,
  lastBook: Vi,
  extraBooks: ep,
  bookNumberToId: $o,
  bookNumberToEnglishName: zi,
  bookIdToEnglishName: tp,
  isCanonical: Ui,
  isExtraMaterial: rp,
  isObsolete: np
};
var Je = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Je || {});
const Fe = class {
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
oe(Fe, "Original", new Fe(Je.Original)), oe(Fe, "Septuagint", new Fe(Je.Septuagint)), oe(Fe, "Vulgate", new Fe(Je.Vulgate)), oe(Fe, "English", new Fe(Je.English)), oe(Fe, "RussianProtestant", new Fe(Je.RussianProtestant)), oe(Fe, "RussianOrthodox", new Fe(Je.RussianOrthodox));
let Ot = Fe;
function ka(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var Hi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Hi || {});
const Ie = class le {
  constructor(t, r, n, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), n == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = r != null && r instanceof Ot ? r : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = r != null && r instanceof Ot ? r : void 0;
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
          const a = t instanceof Ot ? t : le.defaultVersification;
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
      if (n instanceof mr)
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
    return i && (c = new Ot(i)), r ? new le(r, n.toString(), l, c) : new le();
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
    if (t <= 0 || t > me.lastBook)
      throw new mr(
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
    this.versification = this.versification != null ? new Ot(t) : void 0;
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
          this.versification = new Ot(Je[i]);
        } catch {
          throw new mr("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new mr("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || me.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(n[1]))
      throw new mr("Invalid reference : " + t);
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
    const o = [], a = ka(this._verse, n);
    for (const i of a.map((l) => ka(l, r))) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(Ie, "defaultVersification", Ot.English), oe(Ie, "verseRangeSeparator", "-"), oe(Ie, "verseSequenceIndicator", ","), oe(Ie, "verseRangeSeparators", [Ie.verseRangeSeparator]), oe(Ie, "verseSequenceIndicators", [Ie.verseSequenceIndicator]), oe(Ie, "chapterDigitShifter", 1e3), oe(Ie, "bookDigitShifter", Ie.chapterDigitShifter * Ie.chapterDigitShifter), oe(Ie, "bcvMaxValue", Ie.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(Ie, "ValidStatusType", Hi);
let mr = class extends Error {
};
const _o = be.Root, Gi = be.Trigger, ap = be.Group, Bv = be.Portal, Lv = be.Sub, Fv = be.RadioGroup, ip = X.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ $(
  be.SubTrigger,
  {
    ref: o,
    className: L(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ d(Pi, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
ip.displayName = be.SubTrigger.displayName;
const sp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  be.SubContent,
  {
    ref: r,
    className: L(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
sp.displayName = be.SubContent.displayName;
const En = X.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ d(be.Portal, { children: /* @__PURE__ */ d(
  be.Content,
  {
    ref: n,
    sideOffset: t,
    className: L(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
En.displayName = be.Content.displayName;
const Wi = X.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  be.Item,
  {
    ref: n,
    className: L(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...r
  }
));
Wi.displayName = be.Item.displayName;
const Io = X.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ $(
  be.CheckboxItem,
  {
    ref: o,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(be.ItemIndicator, { children: /* @__PURE__ */ d(Co, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Io.displayName = be.CheckboxItem.displayName;
const Xi = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  be.RadioItem,
  {
    ref: n,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(be.ItemIndicator, { children: /* @__PURE__ */ d(Yl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Xi.displayName = be.RadioItem.displayName;
const Vr = X.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  be.Label,
  {
    ref: n,
    className: L("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
Vr.displayName = be.Label.displayName;
const kn = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  be.Separator,
  {
    ref: r,
    className: L("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
kn.displayName = be.Separator.displayName;
function lp({ className: e, ...t }) {
  return /* @__PURE__ */ d(
    "span",
    {
      className: L("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
lp.displayName = "DropdownMenuShortcut";
const cp = wn(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ $(
    Wi,
    {
      ref: l,
      textValue: e,
      className: L("pr-mx-1 pr-px-1 pr-font-normal pr-text-foreground/80", {
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
        /* @__PURE__ */ d(
          "span",
          {
            className: L(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": r,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: me.bookIdToEnglishName(e)
          }
        ),
        r && /* @__PURE__ */ d("div", { children: i })
      ]
    },
    e
  )
);
function pp({
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
  return /* @__PURE__ */ d("div", { className: L("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ d(
    "div",
    {
      className: L(
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
function dp({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ $(Vr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ d("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ d(
        ql,
        {
          onClick: e,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ d(
        Kl,
        {
          onClick: t,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      ),
      /* @__PURE__ */ d(
        Jl,
        {
          onClick: r,
          className: "pr-m-2 pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2"
        }
      )
    ] })
  ] });
}
const Sr = me.allBookIds, up = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Na = ["OT", "NT", "DC"], fp = 32 + 32 + 32, mp = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], hp = (e) => ({
  OT: Sr.filter((r) => me.isBookOT(r)),
  NT: Sr.filter((r) => me.isBookNT(r)),
  DC: Sr.filter((r) => me.isBookDC(r))
})[e], hr = (e) => wc(me.bookIdToNumber(e));
function gp() {
  return Sr.map((t) => me.bookIdToEnglishName(t));
}
function bp(e) {
  return gp().includes(e);
}
function vp(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (bp(t))
    return Sr.find((n) => me.bookIdToEnglishName(n) === t);
}
function Vv({ scrRef: e, handleSubmit: t }) {
  const [r, n] = ge(""), [o, a] = ge(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = ge(e.chapterNum ?? 0), [c, u] = ge(
    me.bookNumberToId(e.bookNum)
  ), [m, v] = ge(!1), [b, p] = ge(m), h = Mt(void 0), f = Mt(void 0), g = Mt(void 0), w = Ce(
    (k) => hp(k).filter((M) => {
      const D = me.bookIdToEnglishName(M).toLowerCase(), z = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return D.includes(z) || // Match book name
      M.toLowerCase().includes(z);
    }),
    [r]
  ), O = (k) => {
    n(k);
  }, x = Mt(!1), E = Ce((k) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    v(k);
  }, []), y = Ce(
    (k, M, D, z) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), M || hr(k) === -1) {
        t({
          bookNum: me.bookIdToNumber(k),
          chapterNum: D || 1,
          verseNum: z || 1
        }), v(!1), n("");
        return;
      }
      a(o !== k ? k : ""), v(!M);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (k) => {
    k <= 0 || k > hr(o) || y(o, !0, k);
  }, S = Ce(() => {
    mp.forEach((k) => {
      const M = r.match(k);
      if (M) {
        const [D, z = void 0, H = void 0] = M.slice(1), j = vp(D);
        (me.isBookIdValid(D) || j) && y(
          j ?? D,
          !0,
          z ? parseInt(z, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [y, r]), I = Ce(
    (k) => {
      m ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof g < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      g.current !== null ? g.current.focus() : typeof f < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      f.current !== null && f.current.focus(), k.preventDefault()) : v(!0);
    },
    [m]
  ), R = (k) => {
    const { key: M } = k;
    M === "ArrowRight" || M === "ArrowLeft" || M === "ArrowDown" || M === "ArrowUp" || M === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: M })), h.current.focus());
  }, _ = (k) => {
    const { key: M } = k;
    if (c === o) {
      if (M === "Enter") {
        k.preventDefault(), y(o, !0, i);
        return;
      }
      let D = 0;
      if (M === "ArrowRight")
        if (i < hr(c))
          D = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (M === "ArrowLeft")
        if (i > 1)
          D = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        M === "ArrowDown" ? D = 6 : M === "ArrowUp" && (D = -6);
      i + D <= 0 || i + D > hr(c) ? l(0) : D !== 0 && (l(i + D), k.preventDefault());
    }
  };
  return Qe(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), va(() => {
    p(m);
  }, [m]), va(() => {
    const k = setTimeout(() => {
      if (b && f.current && g.current) {
        const D = g.current.offsetTop - fp;
        f.current.scrollTo({ top: D, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [b]), /* @__PURE__ */ d("div", { className: "pr-twp pr-flex", children: /* @__PURE__ */ $(_o, { modal: !1, open: m, onOpenChange: E, children: [
    /* @__PURE__ */ d(Gi, { asChild: !0, children: /* @__PURE__ */ d(
      Wc,
      {
        ref: h,
        value: r,
        handleSearch: O,
        handleKeyDown: I,
        handleOnClick: () => {
          a(me.bookNumberToId(e.bookNum)), u(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: S,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ $(
      En,
      {
        className: "pr-m-1 pr-overflow-y-auto pr-p-0 pr-font-normal pr-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: R,
        align: "start",
        ref: f,
        children: [
          /* @__PURE__ */ d(
            dp,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Na.map(
            (k, M) => w(k).length > 0 && /* @__PURE__ */ $("div", { children: [
              /* @__PURE__ */ d(Vr, { className: "pr-font-semibold pr-text-foreground/80", children: up[k] }),
              w(k).map((D) => /* @__PURE__ */ d("div", { children: /* @__PURE__ */ d(
                cp,
                {
                  bookId: D,
                  handleSelectBook: () => y(D, !1),
                  isSelected: o === D,
                  handleHighlightBook: () => u(D),
                  handleKeyDown: _,
                  bookType: k,
                  ref: (z) => {
                    o === D && (g.current = z);
                  },
                  children: /* @__PURE__ */ d(
                    pp,
                    {
                      handleSelectChapter: T,
                      endChapter: hr(D),
                      activeChapter: e.bookNum === me.bookIdToNumber(D) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (z) => {
                        l(z);
                      }
                    }
                  )
                }
              ) }, D)),
              Na.length - 1 !== M ? /* @__PURE__ */ d(kn, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const yp = Oo(
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
), xe = X.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ d(n ? Cc : "button", { className: L(yp({ variant: t, size: r, className: e })), ref: a, ...o })
);
xe.displayName = "Button";
function wp({ table: e }) {
  return /* @__PURE__ */ $(_o, { children: [
    /* @__PURE__ */ d(yc, { asChild: !0, children: /* @__PURE__ */ $(xe, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ d(Zl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ $(En, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ d(Vr, { children: "Toggle columns" }),
      /* @__PURE__ */ d(kn, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ d(
        Io,
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
const _r = Ee.Root, xp = Ee.Group, Ir = Ee.Value, Zt = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  Ee.Trigger,
  {
    ref: n,
    className: L(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ d(Ee.Icon, { asChild: !0, children: /* @__PURE__ */ d(xn, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Zt.displayName = Ee.Trigger.displayName;
const Yi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ee.ScrollUpButton,
  {
    ref: r,
    className: L("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Ql, { className: "pr-h-4 pr-w-4" })
  }
));
Yi.displayName = Ee.ScrollUpButton.displayName;
const qi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ee.ScrollDownButton,
  {
    ref: r,
    className: L("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(xn, { className: "pr-h-4 pr-w-4" })
  }
));
qi.displayName = Ee.ScrollDownButton.displayName;
const Qt = X.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ d(Ee.Portal, { children: /* @__PURE__ */ $(
  Ee.Content,
  {
    ref: o,
    className: L(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ d(Yi, {}),
      /* @__PURE__ */ d(
        Ee.Viewport,
        {
          className: L(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ d(qi, {})
    ]
  }
) }));
Qt.displayName = Ee.Content.displayName;
const Ep = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ee.Label,
  {
    ref: r,
    className: L("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Ep.displayName = Ee.Label.displayName;
const Ke = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(
  Ee.Item,
  {
    ref: n,
    className: L(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(Ee.ItemIndicator, { children: /* @__PURE__ */ d(Co, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ d(Ee.ItemText, { children: t })
    ]
  }
));
Ke.displayName = Ee.Item.displayName;
const kp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ee.Separator,
  {
    ref: r,
    className: L("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
kp.displayName = Ee.Separator.displayName;
function Np({ table: e }) {
  return /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ $("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ d("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ $(
        _r,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ d(Zt, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ d(Ir, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ d(Qt, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ d(Ke, { value: `${t}`, children: t }, t)) })
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
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ d(ec, { className: "pr-h-4 pr-w-4" })
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
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ d(tc, { className: "pr-h-4 pr-w-4" })
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
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ d(rc, { className: "pr-h-4 pr-w-4" })
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
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ d(nc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Nn = X.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ d("div", { className: L("pr-twp pr-relative pr-w-full", { "pr-overflow-auto": !t }), children: /* @__PURE__ */ d(
  "table",
  {
    ref: n,
    className: L("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...r
  }
) }));
Nn.displayName = "Table";
const Tn = X.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ d(
  "thead",
  {
    ref: n,
    className: L(
      { "pr-sticky pr-top-0 pr-bg-muted": t },
      "[&_tr]:pr-border-b",
      e
    ),
    ...r
  }
));
Tn.displayName = "TableHeader";
const Sn = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("tbody", { ref: r, className: L("[&_tr:last-child]:pr-border-0", e), ...t }));
Sn.displayName = "TableBody";
const Tp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "tfoot",
  {
    ref: r,
    className: L("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Tp.displayName = "TableFooter";
const xt = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "tr",
    {
      ref: r,
      className: L(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
xt.displayName = "TableRow";
const Mr = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "th",
  {
    ref: r,
    className: L(
      "pr-h-12 pr-px-4 pr-text-start pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pe-0",
      e
    ),
    ...t
  }
));
Mr.displayName = "TableHead";
const er = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "td",
  {
    ref: r,
    className: L("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0", e),
    ...t
  }
));
er.displayName = "TableCell";
const Sp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "caption",
  {
    ref: r,
    className: L("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Sp.displayName = "TableCaption";
function Cp({
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
  const [l, c] = ge([]), [u, m] = ge([]), [v, b] = ge({}), [p, h] = ge({}), f = $i({
    data: t,
    columns: e,
    getCoreRowModel: _i(),
    ...r && { getPaginationRowModel: kc() },
    onSortingChange: c,
    getSortedRowModel: Ii(),
    onColumnFiltersChange: m,
    getFilteredRowModel: Nc(),
    onColumnVisibilityChange: b,
    onRowSelectionChange: h,
    state: {
      sorting: l,
      columnFilters: u,
      columnVisibility: v,
      rowSelection: p
    }
  });
  return /* @__PURE__ */ $("div", { className: "pr-twp pr-font-sans", children: [
    o && /* @__PURE__ */ d(wp, { table: f }),
    /* @__PURE__ */ $(Nn, { stickyHeader: a, children: [
      /* @__PURE__ */ d(Tn, { stickyHeader: a, children: f.getHeaderGroups().map((w) => /* @__PURE__ */ d(xt, { children: w.headers.map((O) => /* @__PURE__ */ d(Mr, { children: O.isPlaceholder ? void 0 : Tr(O.column.columnDef.header, O.getContext()) }, O.id)) }, w.id)) }),
      /* @__PURE__ */ d(Sn, { children: (g = f.getRowModel().rows) != null && g.length ? f.getRowModel().rows.map((w) => /* @__PURE__ */ d(
        xt,
        {
          onClick: () => i(w, f),
          "data-state": w.getIsSelected() && "selected",
          children: w.getVisibleCells().map((O) => /* @__PURE__ */ d(er, { children: Tr(O.column.columnDef.cell, O.getContext()) }, O.id))
        },
        w.id
      )) : /* @__PURE__ */ d(xt, { children: /* @__PURE__ */ d(er, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ d(
        xe,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.previousPage(),
          disabled: !f.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ d(
        xe,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.nextPage(),
          disabled: !f.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ d(Np, { table: f })
  ] });
}
const Op = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ta = (e) => {
  const t = /^\\[vc]\s+(\d+)/, r = e.match(t);
  if (r)
    return +r[1];
}, Sa = (e, t, r, n) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = Op(e);
  let i = n.chapterNum, l = n.verseNum, c = 0;
  return a.forEach((u) => {
    u.startsWith("\\id") && (i = 0, l = 0), u.startsWith("\\c") && (i = Ta(u), l = 0), u.startsWith("\\v") && (l = Ta(u), i === 0 && (i = n.chapterNum));
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
function Rp({
  selectedItem: e,
  text: t,
  extractItems: r,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], l = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, u] = ge(
    Sa(t, e, r, n)
  );
  return Qe(
    () => u(Sa(t, e, r, n)),
    [t, e, n, r]
  ), /* @__PURE__ */ $(Nn, { stickyHeader: !0, children: [
    /* @__PURE__ */ d(Tn, { stickyHeader: !0, children: /* @__PURE__ */ $(xt, { children: [
      /* @__PURE__ */ d(Mr, { children: i }),
      /* @__PURE__ */ d(Mr, { children: l })
    ] }) }),
    /* @__PURE__ */ d(Sn, { children: c.map((m) => /* @__PURE__ */ $(
      xt,
      {
        onClick: () => {
          o(m.reference);
        },
        children: [
          /* @__PURE__ */ d(er, { children: `${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}` }),
          /* @__PURE__ */ d(er, { children: m.snippet })
        ]
      },
      m.key
    )) })
  ] });
}
const zv = Object.freeze([
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
]), Mo = (e) => e === "asc" ? /* @__PURE__ */ d(oc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ d(ac, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ d(ic, { className: "pr-ms-2 pr-h-4 pr-w-4" }), Pp = (e, t, r) => {
  let n = e;
  return t !== "all" && (n = n.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), r !== "" && (n = n.filter((o) => o.item.includes(r))), n;
}, $p = (e, t, r) => {
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
function Uv({
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
  const b = gt(r, "%webView_inventory_all%"), p = gt(r, "%webView_inventory_approved%"), h = gt(r, "%webView_inventory_unapproved%"), f = gt(r, "%webView_inventory_unknown%"), g = gt(r, "%webView_inventory_scope_book%"), w = gt(r, "%webView_inventory_scope_chapter%"), O = gt(r, "%webView_inventory_scope_verse%"), x = gt(r, "%webView_inventory_filter_text%"), [E, y] = ge([]), [T, S] = ge("all"), [I, R] = ge(""), [_, k] = ge(""), M = Ce(
    (V, C) => {
      y((Y) => {
        let U = [];
        return V.forEach((K) => {
          U = Y.map((q) => q.item === K && q.status !== C ? { ...q, status: C } : q);
        }), U;
      });
      let B = [...o];
      V.forEach((Y) => {
        C === "approved" ? B.includes(Y) || B.push(Y) : B = B.filter((U) => U !== Y);
      }), a(B);
      let W = [...i];
      V.forEach((Y) => {
        C === "unapproved" ? W.includes(Y) || W.push(Y) : W = W.filter(
          (U) => U !== Y
        );
      }), l(W);
    },
    [o, a, i, l]
  ), D = Ce(
    (V) => o.includes(V) ? "approved" : i.includes(V) ? "unapproved" : "unknown",
    [o, i]
  );
  Qe(() => {
    c && y($p(c, n, D));
  }, [n, c, D]);
  const z = ct(() => Pp(E, T, I), [E, T, I]);
  Qe(() => {
    k("");
  }, [z]);
  const H = (V, C) => {
    C.toggleAllRowsSelected(!1), V.toggleSelected(void 0), k(V.getValue("item"));
  }, j = ct(() => v(M), [v, M]), G = (V) => {
    if (V === "book" || V === "chapter" || V === "verse")
      m(V);
    else
      throw new Error(`Invalid scope value: ${V}`);
  }, te = (V) => {
    if (V === "all" || V === "approved" || V === "unapproved" || V === "unknown")
      S(V);
    else
      throw new Error(`Invalid status filter value: ${V}`);
  };
  return /* @__PURE__ */ $("div", { className: "pr-twp pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ $("div", { className: "pr-flex", children: [
      /* @__PURE__ */ $(
        _r,
        {
          onValueChange: (V) => te(V),
          defaultValue: T,
          children: [
            /* @__PURE__ */ d(Zt, { className: "pr-m-1", children: /* @__PURE__ */ d(Ir, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ $(Qt, { className: "pr-font-sans", children: [
              /* @__PURE__ */ d(Ke, { value: "all", children: b }),
              /* @__PURE__ */ d(Ke, { value: "approved", children: p }),
              /* @__PURE__ */ d(Ke, { value: "unapproved", children: h }),
              /* @__PURE__ */ d(Ke, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ $(_r, { onValueChange: (V) => G(V), defaultValue: u, children: [
        /* @__PURE__ */ d(Zt, { className: "pr-m-1", children: /* @__PURE__ */ d(Ir, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ $(Qt, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(Ke, { value: "book", children: g }),
          /* @__PURE__ */ d(Ke, { value: "chapter", children: w }),
          /* @__PURE__ */ d(Ke, { value: "verse", children: O })
        ] })
      ] }),
      /* @__PURE__ */ d(
        Fr,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: x,
          value: I,
          onChange: (V) => {
            R(V.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      Cp,
      {
        columns: j,
        data: z,
        onRowClickHandler: H,
        stickyHeader: !0
      }
    ) }),
    _ !== "" && /* @__PURE__ */ d("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      Rp,
      {
        selectedItem: _,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (V) => t(V),
        localizedStrings: r
      }
    ) })
  ] });
}
const Hv = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ $(xe, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Mo(t.getIsSorted())
  ] })
}), Gv = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ $(xe, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    Mo(t.getIsSorted())
  ] })
}), Wv = (e, t) => ({
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
            Mo(r.getIsSorted())
          ]
        }
      ),
      /* @__PURE__ */ d(xe, { className: "pr-m-1", children: /* @__PURE__ */ d(
        ya,
        {
          onClick: () => {
            t(a, "approved");
          }
        }
      ) }),
      /* @__PURE__ */ d(xe, { className: "pr-m-1", children: /* @__PURE__ */ d(
        wa,
        {
          onClick: () => {
            t(a, "unapproved");
          }
        }
      ) }),
      /* @__PURE__ */ d(xe, { className: "pr-m-1", children: /* @__PURE__ */ d(
        xa,
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
        return /* @__PURE__ */ d(ya, {});
      case "unapproved":
        return /* @__PURE__ */ d(wa, {});
      case "unknown":
      default:
        return /* @__PURE__ */ d(xa, {});
    }
  }
}), Wn = {
  [fe("undefined")]: "Ø",
  [fe(0)]: "A",
  [fe(1)]: "B",
  [fe(2)]: "C",
  [fe(3)]: "D",
  [fe(4)]: "E",
  [fe(5)]: "F",
  [fe(6)]: "G",
  [fe(7)]: "H",
  [fe(8)]: "I",
  [fe(9)]: "J",
  [fe(10)]: "K",
  [fe(11)]: "L",
  [fe(12)]: "M",
  [fe(13)]: "N",
  [fe(14)]: "O",
  [fe(15)]: "P",
  [fe(16)]: "Q",
  [fe(17)]: "R",
  [fe(18)]: "S",
  [fe(19)]: "T",
  [fe(20)]: "U",
  [fe(21)]: "V",
  [fe(22)]: "W",
  [fe(23)]: "X",
  [fe(24)]: "Y",
  [fe(25)]: "Z"
};
function Xv({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: r,
  localizedStrings: n = {}
}) {
  const o = {
    ...Wn,
    ...Object.fromEntries(
      Object.entries(n).map(
        ([a, i]) => [
          a,
          a === i && a in Wn ? Wn[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ $(
    _r,
    {
      value: `${t}`,
      onValueChange: (a) => r(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ d(Zt, { className: "pr-twp pr-w-auto", children: /* @__PURE__ */ d(
          Ir,
          {
            placeholder: o[fe(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ d(
          Qt,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ d(Ke, { value: `${a}`, children: o[fe(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const _p = $r.Root, Ip = $r.Trigger, Ki = X.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ d($r.Portal, { children: /* @__PURE__ */ d(
  $r.Content,
  {
    ref: o,
    align: t,
    sideOffset: r,
    className: L(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
Ki.displayName = $r.Content.displayName;
const Mp = et.Portal, Ji = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  et.Overlay,
  {
    ref: r,
    className: L(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Ji.displayName = et.Overlay.displayName;
const Ap = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ $(Mp, { children: [
  /* @__PURE__ */ d(Ji, {}),
  /* @__PURE__ */ $(
    et.Content,
    {
      ref: n,
      className: L(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ $(et.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ d(sc, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Ap.displayName = et.Content.displayName;
const Dp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  et.Title,
  {
    ref: r,
    className: L("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Dp.displayName = et.Title.displayName;
const jp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  et.Description,
  {
    ref: r,
    className: L("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
jp.displayName = et.Description.displayName;
const Zi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De,
  {
    ref: r,
    className: L(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
Zi.displayName = De.displayName;
const Qi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ d(lc, { className: "pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ d(
    De.Input,
    {
      ref: r,
      className: L(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Qi.displayName = De.Input.displayName;
const es = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.List,
  {
    ref: r,
    className: L("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
es.displayName = De.List.displayName;
const ts = X.forwardRef((e, t) => /* @__PURE__ */ d(De.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
ts.displayName = De.Empty.displayName;
const Bp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Group,
  {
    ref: r,
    className: L(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Bp.displayName = De.Group.displayName;
const Lp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Separator,
  {
    ref: r,
    className: L("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Lp.displayName = De.Separator.displayName;
const rs = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Item,
  {
    ref: r,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
rs.displayName = De.Item.displayName;
function Fp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Ca({
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
  const [p, h] = ge(!1);
  return /* @__PURE__ */ $(_p, { open: p, onOpenChange: h, ...b, children: [
    /* @__PURE__ */ d(Ip, { asChild: !0, children: /* @__PURE__ */ $(
      xe,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": p,
        id: e,
        className: L("pr-w-[200px] pr-justify-between", r),
        disabled: v,
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ d(cc, { className: "pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ d(Ki, { className: "pr-w-[200px] pr-p-0", dir: m, children: /* @__PURE__ */ $(Zi, { children: [
      /* @__PURE__ */ d(Qi, { dir: m, placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ d(ts, { children: c }),
      /* @__PURE__ */ d(es, { children: t.map((f) => /* @__PURE__ */ $(
        rs,
        {
          value: a(f),
          onSelect: () => {
            o(f), h(!1);
          },
          children: [
            /* @__PURE__ */ d(
              Co,
              {
                className: L("pr-me-2 pr-h-4 pr-w-4", {
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
const Vp = Oo(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), dn = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(Mi.Root, { ref: r, className: L(Vp(), e), ...t }));
dn.displayName = Mi.Root.displayName;
function Yv({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: r,
  handleSelectEndChapter: n,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = ct(
    () => Array.from({ length: a }, (u, m) => m + 1),
    [a]
  );
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ d(dn, { className: "book-selection-chapter-form-label start", htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ d(
      Ca,
      {
        isDisabled: o,
        onChange: (u) => {
          r(u), u > t && n(u);
        },
        className: "book-selection-chapter",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ d(dn, { className: "book-selection-chapter-form-label end", htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ d(
      Ca,
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u < e && r(u);
        },
        className: "book-selection-chapter",
        options: i,
        getOptionLabel: (u) => u.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var qt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(qt || {});
function zp({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = qt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const m = /* @__PURE__ */ d(
    Rc,
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
    const b = n === qt.Before || n === qt.Above, p = /* @__PURE__ */ d("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), h = n === qt.Before || n === qt.After, f = h ? p : /* @__PURE__ */ d("div", { children: p }), g = h ? m : /* @__PURE__ */ d("div", { children: m });
    v = /* @__PURE__ */ $(
      Oc,
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
function qv({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ $("fieldset", { id: e, className: t, children: [
    r && /* @__PURE__ */ d("legend", { children: r }),
    n.map((l) => /* @__PURE__ */ d(
      zp,
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
function Up(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Hp(e) {
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
var Ao = {}, ns = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ns);
var Gp = ns.exports, Xn = {};
function lr(e, t) {
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
function _t(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function os(e) {
  if (!_t(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = os(e[r]);
  }), t;
}
function lt(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? P({}, e) : e;
  return _t(e) && _t(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (_t(t[o]) && o in e && _t(e[o]) ? n[o] = lt(e[o], t[o], r) : r.clone ? n[o] = _t(t[o]) ? os(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var fo = { exports: {} }, en = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oa;
function Wp() {
  if (Oa)
    return ce;
  Oa = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
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
                case p:
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
  function E(y) {
    return x(y) === u;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = u, ce.ContextConsumer = l, ce.ContextProvider = i, ce.Element = t, ce.ForwardRef = m, ce.Fragment = n, ce.Lazy = h, ce.Memo = p, ce.Portal = r, ce.Profiler = a, ce.StrictMode = o, ce.Suspense = v, ce.isAsyncMode = function(y) {
    return E(y) || x(y) === c;
  }, ce.isConcurrentMode = E, ce.isContextConsumer = function(y) {
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
    return x(y) === p;
  }, ce.isPortal = function(y) {
    return x(y) === r;
  }, ce.isProfiler = function(y) {
    return x(y) === a;
  }, ce.isStrictMode = function(y) {
    return x(y) === o;
  }, ce.isSuspense = function(y) {
    return x(y) === v;
  }, ce.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === u || y === a || y === o || y === v || y === b || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === m || y.$$typeof === g || y.$$typeof === w || y.$$typeof === O || y.$$typeof === f);
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
var Ra;
function Xp() {
  return Ra || (Ra = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, b = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, g = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function x(F) {
      return typeof F == "string" || typeof F == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      F === n || F === u || F === a || F === o || F === v || F === b || typeof F == "object" && F !== null && (F.$$typeof === h || F.$$typeof === p || F.$$typeof === i || F.$$typeof === l || F.$$typeof === m || F.$$typeof === g || F.$$typeof === w || F.$$typeof === O || F.$$typeof === f);
    }
    function E(F) {
      if (typeof F == "object" && F !== null) {
        var re = F.$$typeof;
        switch (re) {
          case t:
            var A = F.type;
            switch (A) {
              case c:
              case u:
              case n:
              case a:
              case o:
              case v:
                return A;
              default:
                var se = A && A.$$typeof;
                switch (se) {
                  case l:
                  case m:
                  case h:
                  case p:
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
    var y = c, T = u, S = l, I = i, R = t, _ = m, k = n, M = h, D = p, z = r, H = a, j = o, G = v, te = !1;
    function V(F) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(F) || E(F) === c;
    }
    function C(F) {
      return E(F) === u;
    }
    function B(F) {
      return E(F) === l;
    }
    function W(F) {
      return E(F) === i;
    }
    function Y(F) {
      return typeof F == "object" && F !== null && F.$$typeof === t;
    }
    function U(F) {
      return E(F) === m;
    }
    function K(F) {
      return E(F) === n;
    }
    function q(F) {
      return E(F) === h;
    }
    function Z(F) {
      return E(F) === p;
    }
    function J(F) {
      return E(F) === r;
    }
    function Q(F) {
      return E(F) === a;
    }
    function ee(F) {
      return E(F) === o;
    }
    function ie(F) {
      return E(F) === v;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = T, pe.ContextConsumer = S, pe.ContextProvider = I, pe.Element = R, pe.ForwardRef = _, pe.Fragment = k, pe.Lazy = M, pe.Memo = D, pe.Portal = z, pe.Profiler = H, pe.StrictMode = j, pe.Suspense = G, pe.isAsyncMode = V, pe.isConcurrentMode = C, pe.isContextConsumer = B, pe.isContextProvider = W, pe.isElement = Y, pe.isForwardRef = U, pe.isFragment = K, pe.isLazy = q, pe.isMemo = Z, pe.isPortal = J, pe.isProfiler = Q, pe.isStrictMode = ee, pe.isSuspense = ie, pe.isValidElementType = x, pe.typeOf = E;
  }()), pe;
}
var Pa;
function as() {
  return Pa || (Pa = 1, process.env.NODE_ENV === "production" ? en.exports = Wp() : en.exports = Xp()), en.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Yn, $a;
function Yp() {
  if ($a)
    return Yn;
  $a = 1;
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
  return Yn = o() ? Object.assign : function(a, i) {
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
  }, Yn;
}
var qn, _a;
function Do() {
  if (_a)
    return qn;
  _a = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return qn = e, qn;
}
var Kn, Ia;
function is() {
  return Ia || (Ia = 1, Kn = Function.call.bind(Object.prototype.hasOwnProperty)), Kn;
}
var Jn, Ma;
function qp() {
  if (Ma)
    return Jn;
  Ma = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Do(), r = {}, n = is();
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
            var p = u ? u() : "";
            e(
              "Failed " + l + " type: " + v.message + (p ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Jn = o, Jn;
}
var Zn, Aa;
function Kp() {
  if (Aa)
    return Zn;
  Aa = 1;
  var e = as(), t = Yp(), r = Do(), n = is(), o = qp(), a = function() {
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
  return Zn = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function v(C) {
      var B = C && (u && C[u] || C[m]);
      if (typeof B == "function")
        return B;
    }
    var b = "<<anonymous>>", p = {
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
      element: E(),
      elementType: y(),
      instanceOf: T,
      node: _(),
      objectOf: I,
      oneOf: S,
      oneOfType: R,
      shape: M,
      exact: D
    };
    function h(C, B) {
      return C === B ? C !== 0 || 1 / C === 1 / B : C !== C && B !== B;
    }
    function f(C, B) {
      this.message = C, this.data = B && typeof B == "object" ? B : {}, this.stack = "";
    }
    f.prototype = Error.prototype;
    function g(C) {
      if (process.env.NODE_ENV !== "production")
        var B = {}, W = 0;
      function Y(K, q, Z, J, Q, ee, ie) {
        if (J = J || b, ee = ee || Z, ie !== r) {
          if (c) {
            var F = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw F.name = "Invariant Violation", F;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = J + ":" + Z;
            !B[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            W < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + J + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), B[re] = !0, W++);
          }
        }
        return q[Z] == null ? K ? q[Z] === null ? new f("The " + Q + " `" + ee + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new f("The " + Q + " `" + ee + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : C(q, Z, J, Q, ee);
      }
      var U = Y.bind(null, !1);
      return U.isRequired = Y.bind(null, !0), U;
    }
    function w(C) {
      function B(W, Y, U, K, q, Z) {
        var J = W[Y], Q = j(J);
        if (Q !== C) {
          var ee = G(J);
          return new f(
            "Invalid " + K + " `" + q + "` of type " + ("`" + ee + "` supplied to `" + U + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return g(B);
    }
    function O() {
      return g(i);
    }
    function x(C) {
      function B(W, Y, U, K, q) {
        if (typeof C != "function")
          return new f("Property `" + q + "` of component `" + U + "` has invalid PropType notation inside arrayOf.");
        var Z = W[Y];
        if (!Array.isArray(Z)) {
          var J = j(Z);
          return new f("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + U + "`, expected an array."));
        }
        for (var Q = 0; Q < Z.length; Q++) {
          var ee = C(Z, Q, U, K, q + "[" + Q + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return g(B);
    }
    function E() {
      function C(B, W, Y, U, K) {
        var q = B[W];
        if (!l(q)) {
          var Z = j(q);
          return new f("Invalid " + U + " `" + K + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return g(C);
    }
    function y() {
      function C(B, W, Y, U, K) {
        var q = B[W];
        if (!e.isValidElementType(q)) {
          var Z = j(q);
          return new f("Invalid " + U + " `" + K + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return g(C);
    }
    function T(C) {
      function B(W, Y, U, K, q) {
        if (!(W[Y] instanceof C)) {
          var Z = C.name || b, J = V(W[Y]);
          return new f("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + U + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return g(B);
    }
    function S(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function B(W, Y, U, K, q) {
        for (var Z = W[Y], J = 0; J < C.length; J++)
          if (h(Z, C[J]))
            return null;
        var Q = JSON.stringify(C, function(ie, F) {
          var re = G(F);
          return re === "symbol" ? String(F) : F;
        });
        return new f("Invalid " + K + " `" + q + "` of value `" + String(Z) + "` " + ("supplied to `" + U + "`, expected one of " + Q + "."));
      }
      return g(B);
    }
    function I(C) {
      function B(W, Y, U, K, q) {
        if (typeof C != "function")
          return new f("Property `" + q + "` of component `" + U + "` has invalid PropType notation inside objectOf.");
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new f("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + U + "`, expected an object."));
        for (var Q in Z)
          if (n(Z, Q)) {
            var ee = C(Z, Q, U, K, q + "." + Q, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return g(B);
    }
    function R(C) {
      if (!Array.isArray(C))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var B = 0; B < C.length; B++) {
        var W = C[B];
        if (typeof W != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(W) + " at index " + B + "."
          ), i;
      }
      function Y(U, K, q, Z, J) {
        for (var Q = [], ee = 0; ee < C.length; ee++) {
          var ie = C[ee], F = ie(U, K, q, Z, J, r);
          if (F == null)
            return null;
          F.data && n(F.data, "expectedType") && Q.push(F.data.expectedType);
        }
        var re = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new f("Invalid " + Z + " `" + J + "` supplied to " + ("`" + q + "`" + re + "."));
      }
      return g(Y);
    }
    function _() {
      function C(B, W, Y, U, K) {
        return z(B[W]) ? null : new f("Invalid " + U + " `" + K + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return g(C);
    }
    function k(C, B, W, Y, U) {
      return new f(
        (C || "React class") + ": " + B + " type `" + W + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + U + "`."
      );
    }
    function M(C) {
      function B(W, Y, U, K, q) {
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new f("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + U + "`, expected `object`."));
        for (var Q in C) {
          var ee = C[Q];
          if (typeof ee != "function")
            return k(U, K, q, Q, G(ee));
          var ie = ee(Z, Q, U, K, q + "." + Q, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return g(B);
    }
    function D(C) {
      function B(W, Y, U, K, q) {
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new f("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + U + "`, expected `object`."));
        var Q = t({}, W[Y], C);
        for (var ee in Q) {
          var ie = C[ee];
          if (n(C, ee) && typeof ie != "function")
            return k(U, K, q, ee, G(ie));
          if (!ie)
            return new f(
              "Invalid " + K + " `" + q + "` key `" + ee + "` supplied to `" + U + "`.\nBad object: " + JSON.stringify(W[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var F = ie(Z, ee, U, K, q + "." + ee, r);
          if (F)
            return F;
        }
        return null;
      }
      return g(B);
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
          var B = v(C);
          if (B) {
            var W = B.call(C), Y;
            if (B !== C.entries) {
              for (; !(Y = W.next()).done; )
                if (!z(Y.value))
                  return !1;
            } else
              for (; !(Y = W.next()).done; ) {
                var U = Y.value;
                if (U && !z(U[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function H(C, B) {
      return C === "symbol" ? !0 : B ? B["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && B instanceof Symbol : !1;
    }
    function j(C) {
      var B = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : H(B, C) ? "symbol" : B;
    }
    function G(C) {
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
      var B = G(C);
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
    function V(C) {
      return !C.constructor || !C.constructor.name ? b : C.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Zn;
}
var Qn, Da;
function Jp() {
  if (Da)
    return Qn;
  Da = 1;
  var e = Do();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Qn = function() {
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
  }, Qn;
}
if (process.env.NODE_ENV !== "production") {
  var Zp = as(), Qp = !0;
  fo.exports = Kp()(Zp.isElement, Qp);
} else
  fo.exports = Jp()();
var ed = fo.exports;
const s = /* @__PURE__ */ Up(ed);
function td(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ss(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !td(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ls = lr(s.element, ss);
ls.isRequired = lr(s.element.isRequired, ss);
const zr = ls;
function rd(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function nd(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !rd(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const od = lr(s.elementType, nd), ad = "exact-prop: ​";
function cs(e) {
  return process.env.NODE_ENV === "production" ? e : P({}, e, {
    [ad]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function tr(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var mo = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ja;
function id() {
  if (ja)
    return de;
  ja = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
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
    return typeof g == "string" || typeof g == "function" || g === r || g === o || g === n || g === u || g === m || g === p || typeof g == "object" && g !== null && (g.$$typeof === b || g.$$typeof === v || g.$$typeof === a || g.$$typeof === i || g.$$typeof === c || g.$$typeof === h || g.getModuleId !== void 0);
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
var Ba;
function sd() {
  return Ba || (Ba = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), b = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, f = !1, g = !1, w = !1, O = !1, x;
    x = Symbol.for("react.module.reference");
    function E(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === r || A === o || O || A === n || A === u || A === m || w || A === p || h || f || g || typeof A == "object" && A !== null && (A.$$typeof === b || A.$$typeof === v || A.$$typeof === a || A.$$typeof === i || A.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      A.$$typeof === x || A.getModuleId !== void 0));
    }
    function y(A) {
      if (typeof A == "object" && A !== null) {
        var se = A.$$typeof;
        switch (se) {
          case e:
            var Te = A.type;
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
    var T = i, S = a, I = e, R = c, _ = r, k = b, M = v, D = t, z = o, H = n, j = u, G = m, te = !1, V = !1;
    function C(A) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function B(A) {
      return V || (V = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(A) {
      return y(A) === i;
    }
    function Y(A) {
      return y(A) === a;
    }
    function U(A) {
      return typeof A == "object" && A !== null && A.$$typeof === e;
    }
    function K(A) {
      return y(A) === c;
    }
    function q(A) {
      return y(A) === r;
    }
    function Z(A) {
      return y(A) === b;
    }
    function J(A) {
      return y(A) === v;
    }
    function Q(A) {
      return y(A) === t;
    }
    function ee(A) {
      return y(A) === o;
    }
    function ie(A) {
      return y(A) === n;
    }
    function F(A) {
      return y(A) === u;
    }
    function re(A) {
      return y(A) === m;
    }
    ue.ContextConsumer = T, ue.ContextProvider = S, ue.Element = I, ue.ForwardRef = R, ue.Fragment = _, ue.Lazy = k, ue.Memo = M, ue.Portal = D, ue.Profiler = z, ue.StrictMode = H, ue.Suspense = j, ue.SuspenseList = G, ue.isAsyncMode = C, ue.isConcurrentMode = B, ue.isContextConsumer = W, ue.isContextProvider = Y, ue.isElement = U, ue.isForwardRef = K, ue.isFragment = q, ue.isLazy = Z, ue.isMemo = J, ue.isPortal = Q, ue.isProfiler = ee, ue.isStrictMode = ie, ue.isSuspense = F, ue.isSuspenseList = re, ue.isValidElementType = E, ue.typeOf = y;
  }()), ue;
}
process.env.NODE_ENV === "production" ? mo.exports = id() : mo.exports = sd();
var un = mo.exports;
const ld = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function cd(e) {
  const t = `${e}`.match(ld);
  return t && t[1] || "";
}
function ps(e, t = "") {
  return e.displayName || e.name || cd(e) || t;
}
function La(e, t, r) {
  const n = ps(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function pd(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ps(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case un.ForwardRef:
          return La(e, e.render, "ForwardRef");
        case un.Memo:
          return La(e, e.type, "memo");
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
const dd = s.oneOfType([s.func, s.object]), jo = dd;
function tt(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : tr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function ho(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function ds(e, t = 166) {
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
function ud(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function fd(e, t) {
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
function rr(e) {
  return Re(e).defaultView || window;
}
function md(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? P({}, t.propTypes) : null;
  return (o) => (a, i, l, c, u, ...m) => {
    const v = u || i, b = r == null ? void 0 : r[v];
    if (b) {
      const p = b(a, i, l, c, u, ...m);
      if (p)
        return p;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function fn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const hd = typeof window < "u" ? N.useLayoutEffect : N.useEffect, jt = hd;
let Fa = 0;
function gd(e) {
  const [t, r] = N.useState(e), n = e || t;
  return N.useEffect(() => {
    t == null && (Fa += 1, r(`mui-${Fa}`));
  }, [t]), n;
}
const Va = N["useId".toString()];
function us(e) {
  if (Va !== void 0) {
    const t = Va();
    return e ?? t;
  }
  return gd(e);
}
function bd(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function fs({
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
      current: u
    } = N.useRef(t);
    N.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = N.useCallback((u) => {
    o || i(u);
  }, []);
  return [l, c];
}
function Ar(e) {
  const t = N.useRef(e);
  return jt(() => {
    t.current = e;
  }), N.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function We(...e) {
  return N.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      fn(r, t);
    });
  }, e);
}
const za = {};
function vd(e, t) {
  const r = N.useRef(za);
  return r.current === za && (r.current = e(t)), r;
}
const yd = [];
function wd(e) {
  N.useEffect(e, yd);
}
class Ur {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Ur();
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
  const e = vd(Ur.create).current;
  return wd(e.disposeEffect), e;
}
let Cn = !0, go = !1;
const xd = new Ur(), Ed = {
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
function kd(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && Ed[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Nd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Cn = !0);
}
function eo() {
  Cn = !1;
}
function Td() {
  this.visibilityState === "hidden" && go && (Cn = !0);
}
function Sd(e) {
  e.addEventListener("keydown", Nd, !0), e.addEventListener("mousedown", eo, !0), e.addEventListener("pointerdown", eo, !0), e.addEventListener("touchstart", eo, !0), e.addEventListener("visibilitychange", Td, !0);
}
function Cd(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Cn || kd(t);
}
function ms() {
  const e = N.useCallback((o) => {
    o != null && Sd(o.ownerDocument);
  }, []), t = N.useRef(!1);
  function r() {
    return t.current ? (go = !0, xd.start(100, () => {
      go = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return Cd(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function hs(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Od(e) {
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
function Rd(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Pd = Number.isInteger || Rd;
function gs(e, t, r, n) {
  const o = e[t];
  if (o == null || !Pd(o)) {
    const a = Od(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function bs(e, t, ...r) {
  return e[t] === void 0 ? null : gs(e, t, ...r);
}
function bo() {
  return null;
}
bs.isRequired = gs;
bo.isRequired = bo;
const vs = process.env.NODE_ENV === "production" ? bo : bs;
function ys(e, t) {
  const r = P({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = P({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = P({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = ys(o[i], a[i]);
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
const Ua = (e) => e, $d = () => {
  let e = Ua;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ua;
    }
  };
}, _d = $d(), ws = _d, xs = {
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
function nt(e, t, r = "Mui") {
  const n = xs[t];
  return n ? `${r}-${n}` : `${ws.generate(e)}-${t}`;
}
function kt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = nt(e, o, r);
  }), n;
}
function Id(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
function he(e, t) {
  if (e == null)
    return {};
  var r = {}, n = Object.keys(e), o, a;
  for (a = 0; a < n.length; a++)
    o = n[a], !(t.indexOf(o) >= 0) && (r[o] = e[o]);
  return r;
}
const Md = ["values", "unit", "step"], Ad = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => P({}, r, {
    [n.key]: n.val
  }), {});
};
function Dd(e) {
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
  } = e, o = he(e, Md), a = Ad(t), i = Object.keys(a);
  function l(b) {
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${r})`;
  }
  function c(b) {
    return `@media (max-width:${(typeof t[b] == "number" ? t[b] : b) - n / 100}${r})`;
  }
  function u(b, p) {
    const h = i.indexOf(p);
    return `@media (min-width:${typeof t[b] == "number" ? t[b] : b}${r}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : p) - n / 100}${r})`;
  }
  function m(b) {
    return i.indexOf(b) + 1 < i.length ? u(b, i[i.indexOf(b) + 1]) : l(b);
  }
  function v(b) {
    const p = i.indexOf(b);
    return p === 0 ? l(i[1]) : p === i.length - 1 ? c(i[p]) : u(b, i[i.indexOf(b) + 1]).replace("@media", "@media not all and");
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
const jd = {
  borderRadius: 4
}, Bd = jd, Ld = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, Nt = Ld;
function Cr(e, t) {
  return t ? lt(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Bo = {
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
}, Ha = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Bo[e]}px)`
};
function dt(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || Ha;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || Ha;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Bo).indexOf(l) !== -1) {
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
function Fd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function Vd(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function On(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function mn(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = On(e, r) || n, t && (o = t(o, n, e)), o;
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
    const l = i[t], c = i.theme, u = On(c, n) || {};
    return dt(i, l, (v) => {
      let b = mn(u, o, v);
      return v === b && typeof v == "string" && (b = mn(u, o, `${t}${v === "default" ? "" : tt(v)}`, v)), r === !1 ? b : {
        [r]: b
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: Nt
  } : {}, a.filterProps = [t], a;
}
function zd(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const Ud = {
  m: "margin",
  p: "padding"
}, Hd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ga = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Gd = zd((e) => {
  if (e.length > 2)
    if (Ga[e])
      e = Ga[e];
    else
      return [e];
  const [t, r] = e.split(""), n = Ud[t], o = Hd[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), Rn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Pn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Wd = [...Rn, ...Pn];
function Hr(e, t, r, n) {
  var o;
  const a = (o = On(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Es(e) {
  return Hr(e, "spacing", 8, "spacing");
}
function Gr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Xd(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Gr(t, r), n), {});
}
function Yd(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = Gd(r), a = Xd(o, n), i = e[r];
  return dt(e, i, a);
}
function ks(e, t) {
  const r = Es(e.theme);
  return Object.keys(e).map((n) => Yd(e, t, n, r)).reduce(Cr, {});
}
function ye(e) {
  return ks(e, Rn);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Rn.reduce((e, t) => (e[t] = Nt, e), {}) : {};
ye.filterProps = Rn;
function we(e) {
  return ks(e, Pn);
}
we.propTypes = process.env.NODE_ENV !== "production" ? Pn.reduce((e, t) => (e[t] = Nt, e), {}) : {};
we.filterProps = Pn;
process.env.NODE_ENV !== "production" && Wd.reduce((e, t) => (e[t] = Nt, e), {});
function qd(e = 8) {
  if (e.mui)
    return e;
  const t = Es({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function $n(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? Cr(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function He(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function qe(e, t) {
  return Ne({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Kd = qe("border", He), Jd = qe("borderTop", He), Zd = qe("borderRight", He), Qd = qe("borderBottom", He), eu = qe("borderLeft", He), tu = qe("borderColor"), ru = qe("borderTopColor"), nu = qe("borderRightColor"), ou = qe("borderBottomColor"), au = qe("borderLeftColor"), iu = qe("outline", He), su = qe("outlineColor"), _n = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Hr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Gr(t, n)
    });
    return dt(e, e.borderRadius, r);
  }
  return null;
};
_n.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Nt
} : {};
_n.filterProps = ["borderRadius"];
$n(Kd, Jd, Zd, Qd, eu, tu, ru, nu, ou, au, _n, iu, su);
const In = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Hr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Gr(t, n)
    });
    return dt(e, e.gap, r);
  }
  return null;
};
In.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Nt
} : {};
In.filterProps = ["gap"];
const Mn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Hr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Gr(t, n)
    });
    return dt(e, e.columnGap, r);
  }
  return null;
};
Mn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Nt
} : {};
Mn.filterProps = ["columnGap"];
const An = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Hr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Gr(t, n)
    });
    return dt(e, e.rowGap, r);
  }
  return null;
};
An.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Nt
} : {};
An.filterProps = ["rowGap"];
const lu = Ne({
  prop: "gridColumn"
}), cu = Ne({
  prop: "gridRow"
}), pu = Ne({
  prop: "gridAutoFlow"
}), du = Ne({
  prop: "gridAutoColumns"
}), uu = Ne({
  prop: "gridAutoRows"
}), fu = Ne({
  prop: "gridTemplateColumns"
}), mu = Ne({
  prop: "gridTemplateRows"
}), hu = Ne({
  prop: "gridTemplateAreas"
}), gu = Ne({
  prop: "gridArea"
});
$n(In, Mn, An, lu, cu, pu, du, uu, fu, mu, hu, gu);
function Jt(e, t) {
  return t === "grey" ? t : e;
}
const bu = Ne({
  prop: "color",
  themeKey: "palette",
  transform: Jt
}), vu = Ne({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Jt
}), yu = Ne({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Jt
});
$n(bu, vu, yu);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const wu = Ne({
  prop: "width",
  transform: Ve
}), Lo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Bo[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ve(r)
      };
    };
    return dt(e, e.maxWidth, t);
  }
  return null;
};
Lo.filterProps = ["maxWidth"];
const xu = Ne({
  prop: "minWidth",
  transform: Ve
}), Eu = Ne({
  prop: "height",
  transform: Ve
}), ku = Ne({
  prop: "maxHeight",
  transform: Ve
}), Nu = Ne({
  prop: "minHeight",
  transform: Ve
});
Ne({
  prop: "size",
  cssProperty: "width",
  transform: Ve
});
Ne({
  prop: "size",
  cssProperty: "height",
  transform: Ve
});
const Tu = Ne({
  prop: "boxSizing"
});
$n(wu, Lo, xu, Eu, ku, Nu, Tu);
const Su = {
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
    style: _n
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Jt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Jt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Jt
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
    style: In
  },
  rowGap: {
    style: An
  },
  columnGap: {
    style: Mn
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
    transform: Ve
  },
  maxWidth: {
    style: Lo
  },
  minWidth: {
    transform: Ve
  },
  height: {
    transform: Ve
  },
  maxHeight: {
    transform: Ve
  },
  minHeight: {
    transform: Ve
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
}, Fo = Su;
function Cu(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function Ou(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ru() {
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
    const b = On(o, u) || {};
    return v ? v(i) : dt(i, n, (h) => {
      let f = mn(b, m, h);
      return h === f && typeof h == "string" && (f = mn(b, m, `${r}${h === "default" ? "" : tt(h)}`, h)), c === !1 ? f : {
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
    const i = (n = a.unstable_sxConfig) != null ? n : Fo;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(a);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const m = Fd(a.breakpoints), v = Object.keys(m);
      let b = m;
      return Object.keys(u).forEach((p) => {
        const h = Ou(u[p], a);
        if (h != null)
          if (typeof h == "object")
            if (i[p])
              b = Cr(b, e(p, h, a, i));
            else {
              const f = dt({
                theme: a
              }, h, (g) => ({
                [p]: g
              }));
              Cu(f, h) ? b[p] = t({
                sx: h,
                theme: a
              }) : b = Cr(b, f);
            }
          else
            b = Cr(b, e(p, h, a, i));
      }), Vd(v, b);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ns = Ru();
Ns.filterProps = ["sx"];
const Vo = Ns;
function Pu(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const $u = ["breakpoints", "palette", "spacing", "shape"];
function zo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = he(e, $u), l = Dd(r), c = qd(o);
  let u = lt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, n),
    spacing: c,
    shape: P({}, Bd, a)
  }, i);
  return u.applyStyles = Pu, u = t.reduce((m, v) => lt(m, v), u), u.unstable_sxConfig = P({}, Fo, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Vo({
      sx: v,
      theme: this
    });
  }, u;
}
function _u(e) {
  return Object.keys(e).length === 0;
}
function Ts(e = null) {
  const t = N.useContext(Vc);
  return !t || _u(t) ? e : t;
}
const Iu = zo();
function Ss(e = Iu) {
  return Ts(e);
}
const Mu = ["ownerState"], Au = ["variants"], Du = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function ju(e) {
  return Object.keys(e).length === 0;
}
function Bu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function an(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Lu = zo(), Wa = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function tn({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return ju(t) ? e : t[r] || t;
}
function Fu(e) {
  return e ? (t, r) => r[e] : null;
}
function sn(e, t) {
  let {
    ownerState: r
  } = t, n = he(t, Mu);
  const o = typeof e == "function" ? e(P({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => sn(a, P({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = he(o, Au);
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
function Vu(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = Lu,
    rootShouldForwardProp: n = an,
    slotShouldForwardProp: o = an
  } = e, a = (i) => Vo(P({}, i, {
    theme: tn(P({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    zc(i, (y) => y.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: m,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: b = Fu(Wa(u))
    } = l, p = he(l, Du), h = m !== void 0 ? m : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), f = v || !1;
    let g;
    process.env.NODE_ENV !== "production" && c && (g = `${c}-${Wa(u || "Root")}`);
    let w = an;
    u === "Root" || u === "root" ? w = n : u ? w = o : Bu(i) && (w = void 0);
    const O = Fc(i, P({
      shouldForwardProp: w,
      label: g
    }, p)), x = (y) => typeof y == "function" && y.__emotion_real !== y || _t(y) ? (T) => sn(y, P({}, T, {
      theme: tn({
        theme: T.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, E = (y, ...T) => {
      let S = x(y);
      const I = T ? T.map(x) : [];
      c && b && I.push((k) => {
        const M = tn(P({}, k, {
          defaultTheme: r,
          themeId: t
        }));
        if (!M.components || !M.components[c] || !M.components[c].styleOverrides)
          return null;
        const D = M.components[c].styleOverrides, z = {};
        return Object.entries(D).forEach(([H, j]) => {
          z[H] = sn(j, P({}, k, {
            theme: M
          }));
        }), b(k, z);
      }), c && !h && I.push((k) => {
        var M;
        const D = tn(P({}, k, {
          defaultTheme: r,
          themeId: t
        })), z = D == null || (M = D.components) == null || (M = M[c]) == null ? void 0 : M.variants;
        return sn({
          variants: z
        }, P({}, k, {
          theme: D
        }));
      }), f || I.push(a);
      const R = I.length - T.length;
      if (Array.isArray(y) && R > 0) {
        const k = new Array(R).fill("");
        S = [...y, ...k], S.raw = [...y.raw, ...k];
      }
      const _ = O(S, ...I);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${tt(u || "")}`), k === void 0 && (k = `Styled(${pd(i)})`), _.displayName = k;
      }
      return i.muiName && (_.muiName = i.muiName), _;
    };
    return O.withConfig && (E.withConfig = O.withConfig), E;
  };
}
function zu(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : ys(t.components[r].defaultProps, n);
}
function Uu({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = Ss(r);
  return n && (o = o[n] || o), zu({
    theme: o,
    name: t,
    props: e
  });
}
function Uo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Id(e, t, r);
}
function Hu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Bt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Bt(Hu(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : tr(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : tr(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function Dn(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Gu(e) {
  e = Bt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (u, m = (u + r / 30) % 12) => o - a * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Dn({
    type: l,
    values: c
  });
}
function Xa(e) {
  e = Bt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Bt(Gu(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ya(e, t) {
  const r = Xa(e), n = Xa(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function hn(e, t) {
  return e = Bt(e), t = Uo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Dn(e);
}
function Wu(e, t) {
  if (e = Bt(e), t = Uo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Dn(e);
}
function Xu(e, t) {
  if (e = Bt(e), t = Uo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Dn(e);
}
function Yu(e, t) {
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
const qu = {
  black: "#000",
  white: "#fff"
}, Dr = qu, Ku = {
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
}, Ju = Ku, Zu = {
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
}, zt = Zu, Qu = {
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
}, Ut = Qu, ef = {
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
}, gr = ef, tf = {
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
}, Ht = tf, rf = {
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
}, Gt = rf, nf = {
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
}, Wt = nf, of = ["mode", "contrastThreshold", "tonalOffset"], qa = {
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
    paper: Dr.white,
    default: Dr.white
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
}, to = {
  text: {
    primary: Dr.white,
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
    active: Dr.white,
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
function Ka(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Xu(e.main, o) : t === "dark" && (e.dark = Wu(e.main, a)));
}
function af(e = "light") {
  return e === "dark" ? {
    main: Ht[200],
    light: Ht[50],
    dark: Ht[400]
  } : {
    main: Ht[700],
    light: Ht[400],
    dark: Ht[800]
  };
}
function sf(e = "light") {
  return e === "dark" ? {
    main: zt[200],
    light: zt[50],
    dark: zt[400]
  } : {
    main: zt[500],
    light: zt[300],
    dark: zt[700]
  };
}
function lf(e = "light") {
  return e === "dark" ? {
    main: Ut[500],
    light: Ut[300],
    dark: Ut[700]
  } : {
    main: Ut[700],
    light: Ut[400],
    dark: Ut[800]
  };
}
function cf(e = "light") {
  return e === "dark" ? {
    main: Gt[400],
    light: Gt[300],
    dark: Gt[700]
  } : {
    main: Gt[700],
    light: Gt[500],
    dark: Gt[900]
  };
}
function pf(e = "light") {
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
function df(e = "light") {
  return e === "dark" ? {
    main: gr[400],
    light: gr[300],
    dark: gr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: gr[500],
    dark: gr[900]
  };
}
function uf(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = he(e, of), a = e.primary || af(t), i = e.secondary || sf(t), l = e.error || lf(t), c = e.info || cf(t), u = e.success || pf(t), m = e.warning || df(t);
  function v(f) {
    const g = Ya(f, to.text.primary) >= r ? to.text.primary : qa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = Ya(f, g);
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
The color object needs to have a \`main\` property or a \`${w}\` property.` : tr(11, g ? ` (${g})` : "", w));
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
} });` : tr(12, g ? ` (${g})` : "", JSON.stringify(f.main)));
    return Ka(f, "light", O, n), Ka(f, "dark", x, n), f.contrastText || (f.contrastText = v(f.main)), f;
  }, p = {
    dark: to,
    light: qa
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), lt(P({
    // A collection of common colors.
    common: P({}, Dr),
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
    grey: Ju,
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
  }, p[t]), o);
}
const ff = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function mf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Ja = {
  textTransform: "uppercase"
}, Za = '"Roboto", "Helvetica", "Arial", sans-serif';
function hf(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = Za,
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
  } = r, b = he(r, ff);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((w) => `${w / u * p}rem`), f = (w, O, x, E, y) => P({
    fontFamily: n,
    fontWeight: w,
    fontSize: h(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, n === Za ? {
    letterSpacing: `${mf(E / O)}em`
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
    button: f(l, 14, 1.75, 0.4, Ja),
    caption: f(i, 12, 1.66, 0.4),
    overline: f(i, 12, 2.66, 1, Ja),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return lt(P({
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
const gf = 0.2, bf = 0.14, vf = 0.12;
function ve(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${gf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${bf})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${vf})`].join(",");
}
const yf = ["none", ve(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ve(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ve(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ve(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ve(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ve(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ve(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ve(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ve(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ve(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ve(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ve(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ve(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ve(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ve(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ve(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ve(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ve(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ve(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ve(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ve(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ve(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ve(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ve(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], wf = yf, xf = ["duration", "easing", "delay"], Ef = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, kf = {
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
function Qa(e) {
  return `${Math.round(e)}ms`;
}
function Nf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function Tf(e) {
  const t = P({}, Ef, e.easing), r = P({}, kf, e.duration);
  return P({
    getAutoHeightDuration: Nf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, u = he(a, xf);
      if (process.env.NODE_ENV !== "production") {
        const m = (b) => typeof b == "string", v = (b) => !isNaN(parseFloat(b));
        !m(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !m(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), m(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !m(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((m) => `${m} ${typeof i == "string" ? i : Qa(i)} ${l} ${typeof c == "string" ? c : Qa(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const Sf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Cf = Sf, Of = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Rf(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = he(e, Of);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : tr(18));
  const l = uf(n), c = zo(e);
  let u = lt(c, {
    mixins: Yu(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: wf.slice(),
    typography: hf(l, a),
    transitions: Tf(o),
    zIndex: P({}, Cf)
  });
  if (u = lt(u, i), u = t.reduce((m, v) => lt(m, v), u), process.env.NODE_ENV !== "production") {
    const m = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (b, p) => {
      let h;
      for (h in b) {
        const f = b[h];
        if (m.indexOf(h) !== -1 && Object.keys(f).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const g = nt("", h);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(b, null, 2), "", `Instead, you need to use the '&.${g}' syntax:`, JSON.stringify({
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
      const p = u.components[b].styleOverrides;
      p && b.indexOf("Mui") === 0 && v(p, b);
    });
  }
  return u.unstable_sxConfig = P({}, Fo, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Vo({
      sx: v,
      theme: this
    });
  }, u;
}
const Pf = Rf(), Ho = Pf, Go = "$$material";
function mt({
  props: e,
  name: t
}) {
  return Uu({
    props: e,
    name: t,
    defaultTheme: Ho,
    themeId: Go
  });
}
const Cs = (e) => an(e) && e !== "classes", $f = Vu({
  themeId: Go,
  defaultTheme: Ho,
  rootShouldForwardProp: Cs
}), Pe = $f;
function _f(e) {
  return nt("MuiSvgIcon", e);
}
kt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const If = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Mf = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${tt(t)}`, `fontSize${tt(r)}`]
  };
  return ft(o, _f, n);
}, Af = Pe("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${tt(r.color)}`], t[`fontSize${tt(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, a, i, l, c, u, m, v, b, p, h;
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
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Wo = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = mt({
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
  } = n, p = he(n, If), h = /* @__PURE__ */ N.isValidElement(o) && o.type === "svg", f = P({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: b,
    hasSvgAsChild: h
  }), g = {};
  m || (g.viewBox = b);
  const w = Mf(f);
  return /* @__PURE__ */ $(Af, P({
    as: l,
    className: Oe(w.root, a),
    focusable: "false",
    color: u,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: r
  }, g, p, h && o.props, {
    ownerState: f,
    children: [h ? o.props.children : o, v ? /* @__PURE__ */ d("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Wo.propTypes = {
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
Wo.muiName = "SvgIcon";
const ei = Wo;
function Os(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ d(ei, P({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = ei.muiName, /* @__PURE__ */ N.memo(/* @__PURE__ */ N.forwardRef(r));
}
const Df = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ws.configure(e);
  }
}, jf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: tt,
  createChainedFunction: ho,
  createSvgIcon: Os,
  debounce: ds,
  deprecatedPropType: ud,
  isMuiElement: fd,
  ownerDocument: Re,
  ownerWindow: rr,
  requirePropFactory: md,
  setRef: fn,
  unstable_ClassNameGenerator: Df,
  unstable_useEnhancedEffect: jt,
  unstable_useId: us,
  unsupportedProp: bd,
  useControlled: fs,
  useEventCallback: Ar,
  useForkRef: We,
  useIsFocusVisible: ms
}, Symbol.toStringTag, { value: "Module" })), Bf = /* @__PURE__ */ Hp(jf);
var ti;
function Lf() {
  return ti || (ti = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Bf;
  }(Xn)), Xn;
}
var Ff = Gp;
Object.defineProperty(Ao, "__esModule", {
  value: !0
});
var Rs = Ao.default = void 0, Vf = Ff(Lf()), zf = Wl;
Rs = Ao.default = (0, Vf.default)(/* @__PURE__ */ (0, zf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Ps(e) {
  return typeof e == "string";
}
function kr(e, t, r) {
  return e === void 0 || Ps(e) ? t : P({}, t, {
    ownerState: P({}, t.ownerState, r)
  });
}
const Uf = {
  disableDefaultClasses: !1
}, Hf = /* @__PURE__ */ N.createContext(Uf);
function Gf(e) {
  const {
    disableDefaultClasses: t
  } = N.useContext(Hf);
  return (r) => t ? "" : e(r);
}
function $s(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function Wf(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function ri(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Xf(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Oe(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = P({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), f = P({}, r, o, n);
    return p.length > 0 && (f.className = p), Object.keys(h).length > 0 && (f.style = h), {
      props: f,
      internalRef: void 0
    };
  }
  const i = $s(P({}, o, n)), l = ri(n), c = ri(o), u = t(i), m = Oe(u == null ? void 0 : u.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = P({}, u == null ? void 0 : u.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), b = P({}, u, r, c, l);
  return m.length > 0 && (b.className = m), Object.keys(v).length > 0 && (b.style = v), {
    props: b,
    internalRef: u.ref
  };
}
const Yf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Lt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = he(e, Yf), l = a ? {} : Wf(n, o), {
    props: c,
    internalRef: u
  } = Xf(P({}, i, {
    externalSlotProps: l
  })), m = We(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return kr(r, P({}, c, {
    ref: m
  }), o);
}
const _s = "base";
function qf(e) {
  return `${_s}--${e}`;
}
function Kf(e, t) {
  return `${_s}-${e}-${t}`;
}
function Is(e, t) {
  const r = xs[t];
  return r ? qf(r) : Kf(e, t);
}
function Jf(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Is(e, n);
  }), r;
}
const Zf = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Qf(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function em(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function tm(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || em(e));
}
function rm(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(Zf)).forEach((n, o) => {
    const a = Qf(n);
    a === -1 || !tm(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function nm() {
  return !0;
}
function gn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = rm,
    isEnabled: i = nm,
    open: l
  } = e, c = N.useRef(!1), u = N.useRef(null), m = N.useRef(null), v = N.useRef(null), b = N.useRef(null), p = N.useRef(!1), h = N.useRef(null), f = We(t.ref, h), g = N.useRef(null);
  N.useEffect(() => {
    !l || !h.current || (p.current = !r);
  }, [r, l]), N.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Re(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), N.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Re(h.current), E = (S) => {
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
      if (!p.current)
        return;
      let I = [];
      if ((x.activeElement === u.current || x.activeElement === m.current) && (I = a(h.current)), I.length > 0) {
        var R, _;
        const k = !!((R = g.current) != null && R.shiftKey && ((_ = g.current) == null ? void 0 : _.key) === "Tab"), M = I[0], D = I[I.length - 1];
        typeof M != "string" && typeof D != "string" && (k ? D.focus() : M.focus());
      } else
        S.focus();
    };
    x.addEventListener("focusin", y), x.addEventListener("keydown", E, !0);
    const T = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(T), x.removeEventListener("focusin", y), x.removeEventListener("keydown", E, !0);
    };
  }, [r, n, o, i, l, a]);
  const w = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0, b.current = x.target;
    const E = t.props.onFocus;
    E && E(x);
  }, O = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ $(N.Fragment, {
    children: [/* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ N.cloneElement(t, {
      ref: f,
      onFocus: w
    }), /* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (gn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: zr,
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
process.env.NODE_ENV !== "production" && (gn["propTypes"] = cs(gn.propTypes));
function om(e) {
  return typeof e == "function" ? e() : e;
}
const jr = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = N.useState(null), c = We(/* @__PURE__ */ N.isValidElement(n) ? n.ref : null, r);
  if (jt(() => {
    a || l(om(o) || document.body);
  }, [o, a]), jt(() => {
    if (i && !a)
      return fn(r, i), () => {
        fn(r, null);
      };
  }, [r, i, a]), a) {
    if (/* @__PURE__ */ N.isValidElement(n)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ N.cloneElement(n, u);
    }
    return /* @__PURE__ */ d(N.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ d(N.Fragment, {
    children: i && /* @__PURE__ */ Uc.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (jr.propTypes = {
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
process.env.NODE_ENV !== "production" && (jr["propTypes"] = cs(jr.propTypes));
function am(e) {
  const t = Re(e);
  return t.body === e ? rr(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Or(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function ni(e) {
  return parseInt(rr(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function im(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function oi(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !im(i);
    l && c && Or(i, o);
  });
}
function ro(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function sm(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (am(n)) {
      const i = hs(Re(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${ni(n) + i}px`;
      const l = Re(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${ni(c) + i}px`;
      });
    }
    let a;
    if (n.parentNode instanceof DocumentFragment)
      a = Re(n).body;
    else {
      const i = n.parentElement, l = rr(n);
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
function lm(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class cm {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Or(t.modalRef, !1);
    const o = lm(r);
    oi(r, t.mount, t.modalRef, o, !0);
    const a = ro(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = ro(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = sm(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = ro(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Or(t.modalRef, r), oi(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && Or(i.modalRef, !1);
    }
    return n;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function pm(e) {
  return typeof e == "function" ? e() : e;
}
function dm(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const um = new cm();
function fm(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = um,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: m,
    rootRef: v
  } = e, b = N.useRef({}), p = N.useRef(null), h = N.useRef(null), f = We(h, v), [g, w] = N.useState(!m), O = dm(c);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const E = () => Re(p.current), y = () => (b.current.modalRef = h.current, b.current.mount = p.current, b.current), T = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, S = Ar(() => {
    const j = pm(t) || E().body;
    o.add(y(), j), h.current && T();
  }), I = N.useCallback(() => o.isTopModal(y()), [o]), R = Ar((j) => {
    p.current = j, j && (m && I() ? T() : h.current && Or(h.current, x));
  }), _ = N.useCallback(() => {
    o.remove(y(), x);
  }, [x, o]);
  N.useEffect(() => () => {
    _();
  }, [_]), N.useEffect(() => {
    m ? S() : (!O || !a) && _();
  }, [m, _, O, a, S]);
  const k = (j) => (G) => {
    var te;
    (te = j.onKeyDown) == null || te.call(j, G), !(G.key !== "Escape" || G.which === 229 || // Wait until IME is settled.
    !I()) && (r || (G.stopPropagation(), u && u(G, "escapeKeyDown")));
  }, M = (j) => (G) => {
    var te;
    (te = j.onClick) == null || te.call(j, G), G.target === G.currentTarget && u && u(G, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const G = $s(e);
      delete G.onTransitionEnter, delete G.onTransitionExited;
      const te = P({}, G, j);
      return P({
        role: "presentation"
      }, te, {
        onKeyDown: k(te),
        ref: f
      });
    },
    getBackdropProps: (j = {}) => {
      const G = j;
      return P({
        "aria-hidden": !0
      }, G, {
        onClick: M(G),
        open: m
      });
    },
    getTransitionProps: () => {
      const j = () => {
        w(!1), i && i();
      }, G = () => {
        w(!0), l && l(), a && _();
      };
      return {
        onEnter: ho(j, c == null ? void 0 : c.props.onEnter),
        onExited: ho(G, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: f,
    portalRef: R,
    isTopModal: I,
    exited: g,
    hasTransition: O
  };
}
var Me = "top", Xe = "bottom", Ye = "right", Ae = "left", Xo = "auto", Wr = [Me, Xe, Ye, Ae], nr = "start", Br = "end", mm = "clippingParents", Ms = "viewport", br = "popper", hm = "reference", ai = /* @__PURE__ */ Wr.reduce(function(e, t) {
  return e.concat([t + "-" + nr, t + "-" + Br]);
}, []), As = /* @__PURE__ */ [].concat(Wr, [Xo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + nr, t + "-" + Br]);
}, []), gm = "beforeRead", bm = "read", vm = "afterRead", ym = "beforeMain", wm = "main", xm = "afterMain", Em = "beforeWrite", km = "write", Nm = "afterWrite", Tm = [gm, bm, vm, ym, wm, xm, Em, km, Nm];
function rt(e) {
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
function Yo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ze(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function Sm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Ge(a) || !rt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Cm(e) {
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
      !Ge(o) || !rt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Om = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Sm,
  effect: Cm,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var At = Math.max, bn = Math.min, or = Math.round;
function vo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Ds() {
  return !/^((?!chrome|android).)*safari/i.test(vo());
}
function ar(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && or(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && or(n.height) / e.offsetHeight || 1);
  var i = Ft(e) ? ze(e) : window, l = i.visualViewport, c = !Ds() && r, u = (n.left + (c && l ? l.offsetLeft : 0)) / o, m = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, b = n.height / a;
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
function qo(e) {
  var t = ar(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function js(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Yo(r)) {
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
function Rm(e) {
  return ["table", "td", "th"].indexOf(rt(e)) >= 0;
}
function Tt(e) {
  return ((Ft(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function jn(e) {
  return rt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Yo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Tt(e)
  );
}
function ii(e) {
  return !Ge(e) || // https://github.com/popperjs/popper-core/issues/837
  ut(e).position === "fixed" ? null : e.offsetParent;
}
function Pm(e) {
  var t = /firefox/i.test(vo()), r = /Trident/i.test(vo());
  if (r && Ge(e)) {
    var n = ut(e);
    if (n.position === "fixed")
      return null;
  }
  var o = jn(e);
  for (Yo(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(rt(o)) < 0; ) {
    var a = ut(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Xr(e) {
  for (var t = ze(e), r = ii(e); r && Rm(r) && ut(r).position === "static"; )
    r = ii(r);
  return r && (rt(r) === "html" || rt(r) === "body" && ut(r).position === "static") ? t : r || Pm(e) || t;
}
function Ko(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Rr(e, t, r) {
  return At(e, bn(t, r));
}
function $m(e, t, r) {
  var n = Rr(e, t, r);
  return n > r ? r : n;
}
function Bs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ls(e) {
  return Object.assign({}, Bs(), e);
}
function Fs(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var _m = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Ls(typeof t != "number" ? t : Fs(t, Wr));
};
function Im(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = Ze(r.placement), c = Ko(l), u = [Ae, Ye].indexOf(l) >= 0, m = u ? "height" : "width";
  if (!(!a || !i)) {
    var v = _m(o.padding, r), b = qo(a), p = c === "y" ? Me : Ae, h = c === "y" ? Xe : Ye, f = r.rects.reference[m] + r.rects.reference[c] - i[c] - r.rects.popper[m], g = i[c] - r.rects.reference[c], w = Xr(a), O = w ? c === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = f / 2 - g / 2, E = v[p], y = O - b[m] - v[h], T = O / 2 - b[m] / 2 + x, S = Rr(E, T, y), I = c;
    r.modifiersData[n] = (t = {}, t[I] = S, t.centerOffset = S - T, t);
  }
}
function Mm(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || js(t.elements.popper, o) && (t.elements.arrow = o));
}
const Am = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Im,
  effect: Mm,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function ir(e) {
  return e.split("-")[1];
}
var Dm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function jm(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: or(r * o) / o || 0,
    y: or(n * o) / o || 0
  };
}
function si(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, m = e.roundOffsets, v = e.isFixed, b = i.x, p = b === void 0 ? 0 : b, h = i.y, f = h === void 0 ? 0 : h, g = typeof m == "function" ? m({
    x: p,
    y: f
  }) : {
    x: p,
    y: f
  };
  p = g.x, f = g.y;
  var w = i.hasOwnProperty("x"), O = i.hasOwnProperty("y"), x = Ae, E = Me, y = window;
  if (u) {
    var T = Xr(r), S = "clientHeight", I = "clientWidth";
    if (T === ze(r) && (T = Tt(r), ut(T).position !== "static" && l === "absolute" && (S = "scrollHeight", I = "scrollWidth")), T = T, o === Me || (o === Ae || o === Ye) && a === Br) {
      E = Xe;
      var R = v && T === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[S]
      );
      f -= R - n.height, f *= c ? 1 : -1;
    }
    if (o === Ae || (o === Me || o === Xe) && a === Br) {
      x = Ye;
      var _ = v && T === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[I]
      );
      p -= _ - n.width, p *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, u && Dm), M = m === !0 ? jm({
    x: p,
    y: f
  }, ze(r)) : {
    x: p,
    y: f
  };
  if (p = M.x, f = M.y, c) {
    var D;
    return Object.assign({}, k, (D = {}, D[E] = O ? "0" : "", D[x] = w ? "0" : "", D.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + f + "px)" : "translate3d(" + p + "px, " + f + "px, 0)", D));
  }
  return Object.assign({}, k, (t = {}, t[E] = O ? f + "px" : "", t[x] = w ? p + "px" : "", t.transform = "", t));
}
function Bm(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ze(t.placement),
    variation: ir(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, si(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, si(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Lm = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Bm,
  data: {}
};
var rn = {
  passive: !0
};
function Fm(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = ze(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && u.forEach(function(m) {
    m.addEventListener("scroll", r.update, rn);
  }), l && c.addEventListener("resize", r.update, rn), function() {
    a && u.forEach(function(m) {
      m.removeEventListener("scroll", r.update, rn);
    }), l && c.removeEventListener("resize", r.update, rn);
  };
}
const Vm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Fm,
  data: {}
};
var zm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ln(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return zm[t];
  });
}
var Um = {
  start: "end",
  end: "start"
};
function li(e) {
  return e.replace(/start|end/g, function(t) {
    return Um[t];
  });
}
function Jo(e) {
  var t = ze(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Zo(e) {
  return ar(Tt(e)).left + Jo(e).scrollLeft;
}
function Hm(e, t) {
  var r = ze(e), n = Tt(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var u = Ds();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Zo(e),
    y: c
  };
}
function Gm(e) {
  var t, r = Tt(e), n = Jo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = At(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = At(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + Zo(e), c = -n.scrollTop;
  return ut(o || r).direction === "rtl" && (l += At(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function Qo(e) {
  var t = ut(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function Vs(e) {
  return ["html", "body", "#document"].indexOf(rt(e)) >= 0 ? e.ownerDocument.body : Ge(e) && Qo(e) ? e : Vs(jn(e));
}
function Pr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Vs(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ze(n), i = o ? [a].concat(a.visualViewport || [], Qo(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Pr(jn(i)))
  );
}
function yo(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Wm(e, t) {
  var r = ar(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ci(e, t, r) {
  return t === Ms ? yo(Hm(e, r)) : Ft(t) ? Wm(t, r) : yo(Gm(Tt(e)));
}
function Xm(e) {
  var t = Pr(jn(e)), r = ["absolute", "fixed"].indexOf(ut(e).position) >= 0, n = r && Ge(e) ? Xr(e) : e;
  return Ft(n) ? t.filter(function(o) {
    return Ft(o) && js(o, n) && rt(o) !== "body";
  }) : [];
}
function Ym(e, t, r, n) {
  var o = t === "clippingParents" ? Xm(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, u) {
    var m = ci(e, u, n);
    return c.top = At(m.top, c.top), c.right = bn(m.right, c.right), c.bottom = bn(m.bottom, c.bottom), c.left = At(m.left, c.left), c;
  }, ci(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function zs(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Ze(n) : null, a = n ? ir(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
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
  var u = o ? Ko(o) : null;
  if (u != null) {
    var m = u === "y" ? "height" : "width";
    switch (a) {
      case nr:
        c[u] = c[u] - (t[m] / 2 - r[m] / 2);
        break;
      case Br:
        c[u] = c[u] + (t[m] / 2 - r[m] / 2);
        break;
    }
  }
  return c;
}
function Lr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? mm : l, u = r.rootBoundary, m = u === void 0 ? Ms : u, v = r.elementContext, b = v === void 0 ? br : v, p = r.altBoundary, h = p === void 0 ? !1 : p, f = r.padding, g = f === void 0 ? 0 : f, w = Ls(typeof g != "number" ? g : Fs(g, Wr)), O = b === br ? hm : br, x = e.rects.popper, E = e.elements[h ? O : b], y = Ym(Ft(E) ? E : E.contextElement || Tt(e.elements.popper), c, m, i), T = ar(e.elements.reference), S = zs({
    reference: T,
    element: x,
    strategy: "absolute",
    placement: o
  }), I = yo(Object.assign({}, x, S)), R = b === br ? I : T, _ = {
    top: y.top - R.top + w.top,
    bottom: R.bottom - y.bottom + w.bottom,
    left: y.left - R.left + w.left,
    right: R.right - y.right + w.right
  }, k = e.modifiersData.offset;
  if (b === br && k) {
    var M = k[o];
    Object.keys(_).forEach(function(D) {
      var z = [Ye, Xe].indexOf(D) >= 0 ? 1 : -1, H = [Me, Xe].indexOf(D) >= 0 ? "y" : "x";
      _[D] += M[H] * z;
    });
  }
  return _;
}
function qm(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, u = c === void 0 ? As : c, m = ir(n), v = m ? l ? ai : ai.filter(function(h) {
    return ir(h) === m;
  }) : Wr, b = v.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  b.length === 0 && (b = v);
  var p = b.reduce(function(h, f) {
    return h[f] = Lr(e, {
      placement: f,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Ze(f)], h;
  }, {});
  return Object.keys(p).sort(function(h, f) {
    return p[h] - p[f];
  });
}
function Km(e) {
  if (Ze(e) === Xo)
    return [];
  var t = ln(e);
  return [li(e), t, li(t)];
}
function Jm(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, u = r.padding, m = r.boundary, v = r.rootBoundary, b = r.altBoundary, p = r.flipVariations, h = p === void 0 ? !0 : p, f = r.allowedAutoPlacements, g = t.options.placement, w = Ze(g), O = w === g, x = c || (O || !h ? [ln(g)] : Km(g)), E = [g].concat(x).reduce(function(U, K) {
      return U.concat(Ze(K) === Xo ? qm(t, {
        placement: K,
        boundary: m,
        rootBoundary: v,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: f
      }) : K);
    }, []), y = t.rects.reference, T = t.rects.popper, S = /* @__PURE__ */ new Map(), I = !0, R = E[0], _ = 0; _ < E.length; _++) {
      var k = E[_], M = Ze(k), D = ir(k) === nr, z = [Me, Xe].indexOf(M) >= 0, H = z ? "width" : "height", j = Lr(t, {
        placement: k,
        boundary: m,
        rootBoundary: v,
        altBoundary: b,
        padding: u
      }), G = z ? D ? Ye : Ae : D ? Xe : Me;
      y[H] > T[H] && (G = ln(G));
      var te = ln(G), V = [];
      if (a && V.push(j[M] <= 0), l && V.push(j[G] <= 0, j[te] <= 0), V.every(function(U) {
        return U;
      })) {
        R = k, I = !1;
        break;
      }
      S.set(k, V);
    }
    if (I)
      for (var C = h ? 3 : 1, B = function(K) {
        var q = E.find(function(Z) {
          var J = S.get(Z);
          if (J)
            return J.slice(0, K).every(function(Q) {
              return Q;
            });
        });
        if (q)
          return R = q, "break";
      }, W = C; W > 0; W--) {
        var Y = B(W);
        if (Y === "break")
          break;
      }
    t.placement !== R && (t.modifiersData[n]._skip = !0, t.placement = R, t.reset = !0);
  }
}
const Zm = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Jm,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function pi(e, t, r) {
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
function di(e) {
  return [Me, Ye, Xe, Ae].some(function(t) {
    return e[t] >= 0;
  });
}
function Qm(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Lr(t, {
    elementContext: "reference"
  }), l = Lr(t, {
    altBoundary: !0
  }), c = pi(i, n), u = pi(l, o, a), m = di(c), v = di(u);
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
const eh = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Qm
};
function th(e, t, r) {
  var n = Ze(e), o = [Ae, Me].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
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
function rh(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = As.reduce(function(m, v) {
    return m[v] = th(v, t.rects, a), m;
  }, {}), l = i[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = i;
}
const nh = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: rh
};
function oh(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = zs({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const ah = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: oh,
  data: {}
};
function ih(e) {
  return e === "x" ? "y" : "x";
}
function sh(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, u = r.rootBoundary, m = r.altBoundary, v = r.padding, b = r.tether, p = b === void 0 ? !0 : b, h = r.tetherOffset, f = h === void 0 ? 0 : h, g = Lr(t, {
    boundary: c,
    rootBoundary: u,
    padding: v,
    altBoundary: m
  }), w = Ze(t.placement), O = ir(t.placement), x = !O, E = Ko(w), y = ih(E), T = t.modifiersData.popperOffsets, S = t.rects.reference, I = t.rects.popper, R = typeof f == "function" ? f(Object.assign({}, t.rects, {
    placement: t.placement
  })) : f, _ = typeof R == "number" ? {
    mainAxis: R,
    altAxis: R
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, R), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, M = {
    x: 0,
    y: 0
  };
  if (T) {
    if (a) {
      var D, z = E === "y" ? Me : Ae, H = E === "y" ? Xe : Ye, j = E === "y" ? "height" : "width", G = T[E], te = G + g[z], V = G - g[H], C = p ? -I[j] / 2 : 0, B = O === nr ? S[j] : I[j], W = O === nr ? -I[j] : -S[j], Y = t.elements.arrow, U = p && Y ? qo(Y) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Bs(), q = K[z], Z = K[H], J = Rr(0, S[j], U[j]), Q = x ? S[j] / 2 - C - J - q - _.mainAxis : B - J - q - _.mainAxis, ee = x ? -S[j] / 2 + C + J + Z + _.mainAxis : W + J + Z + _.mainAxis, ie = t.elements.arrow && Xr(t.elements.arrow), F = ie ? E === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, re = (D = k == null ? void 0 : k[E]) != null ? D : 0, A = G + Q - re - F, se = G + ee - re, Te = Rr(p ? bn(te, A) : te, G, p ? At(V, se) : V);
      T[E] = Te, M[E] = Te - G;
    }
    if (l) {
      var $e, ke = E === "x" ? Me : Ae, St = E === "x" ? Xe : Ye, _e = T[y], ot = y === "y" ? "height" : "width", Be = _e + g[ke], at = _e - g[St], Se = [Me, Ae].indexOf(w) !== -1, Vt = ($e = k == null ? void 0 : k[y]) != null ? $e : 0, Ct = Se ? Be : _e - S[ot] - I[ot] - Vt + _.altAxis, cr = Se ? _e + S[ot] + I[ot] - Vt - _.altAxis : at, Kr = p && Se ? $m(Ct, _e, cr) : Rr(p ? Ct : Be, _e, p ? cr : at);
      T[y] = Kr, M[y] = Kr - _e;
    }
    t.modifiersData[n] = M;
  }
}
const lh = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: sh,
  requiresIfExists: ["offset"]
};
function ch(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function ph(e) {
  return e === ze(e) || !Ge(e) ? Jo(e) : ch(e);
}
function dh(e) {
  var t = e.getBoundingClientRect(), r = or(t.width) / e.offsetWidth || 1, n = or(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function uh(e, t, r) {
  r === void 0 && (r = !1);
  var n = Ge(t), o = Ge(t) && dh(t), a = Tt(t), i = ar(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((rt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Qo(a)) && (l = ph(t)), Ge(t) ? (c = ar(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Zo(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function fh(e) {
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
function mh(e) {
  var t = fh(e);
  return Tm.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function hh(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function gh(e) {
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
var ui = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function fi() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function bh(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? ui : o;
  return function(l, c, u) {
    u === void 0 && (u = a);
    var m = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ui, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, v = [], b = !1, p = {
      state: m,
      setOptions: function(w) {
        var O = typeof w == "function" ? w(m.options) : w;
        f(), m.options = Object.assign({}, a, m.options, O), m.scrollParents = {
          reference: Ft(l) ? Pr(l) : l.contextElement ? Pr(l.contextElement) : [],
          popper: Pr(c)
        };
        var x = mh(gh([].concat(n, m.options.modifiers)));
        return m.orderedModifiers = x.filter(function(E) {
          return E.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!b) {
          var w = m.elements, O = w.reference, x = w.popper;
          if (fi(O, x)) {
            m.rects = {
              reference: uh(O, Xr(x), m.options.strategy === "fixed"),
              popper: qo(x)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(_) {
              return m.modifiersData[_.name] = Object.assign({}, _.data);
            });
            for (var E = 0; E < m.orderedModifiers.length; E++) {
              if (m.reset === !0) {
                m.reset = !1, E = -1;
                continue;
              }
              var y = m.orderedModifiers[E], T = y.fn, S = y.options, I = S === void 0 ? {} : S, R = y.name;
              typeof T == "function" && (m = T({
                state: m,
                options: I,
                name: R,
                instance: p
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: hh(function() {
        return new Promise(function(g) {
          p.forceUpdate(), g(m);
        });
      }),
      destroy: function() {
        f(), b = !0;
      }
    };
    if (!fi(l, c))
      return p;
    p.setOptions(u).then(function(g) {
      !b && u.onFirstUpdate && u.onFirstUpdate(g);
    });
    function h() {
      m.orderedModifiers.forEach(function(g) {
        var w = g.name, O = g.options, x = O === void 0 ? {} : O, E = g.effect;
        if (typeof E == "function") {
          var y = E({
            state: m,
            name: w,
            instance: p,
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
    return p;
  };
}
var vh = [Vm, ah, Lm, Om, nh, Zm, lh, Am, eh], yh = /* @__PURE__ */ bh({
  defaultModifiers: vh
});
const Us = "Popper";
function wh(e) {
  return Is(Us, e);
}
Jf(Us, ["root"]);
const xh = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Eh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function kh(e, t) {
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
function vn(e) {
  return typeof e == "function" ? e() : e;
}
function Bn(e) {
  return e.nodeType !== void 0;
}
function Nh(e) {
  return !Bn(e);
}
const Th = () => ft({
  root: ["root"]
}, Gf(wh)), Sh = {}, Ch = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    slotProps: p = {},
    slots: h = {},
    TransitionProps: f
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, g = he(t, xh), w = N.useRef(null), O = We(w, r), x = N.useRef(null), E = We(x, b), y = N.useRef(E);
  jt(() => {
    y.current = E;
  }, [E]), N.useImperativeHandle(b, () => x.current, []);
  const T = kh(m, i), [S, I] = N.useState(T), [R, _] = N.useState(vn(o));
  N.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), N.useEffect(() => {
    o && _(vn(o));
  }, [o]), jt(() => {
    if (!R || !u)
      return;
    const H = (te) => {
      I(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && R && Bn(R) && R.nodeType === 1) {
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
        H(te);
      }
    }];
    c != null && (j = j.concat(c)), v && v.modifiers != null && (j = j.concat(v.modifiers));
    const G = yh(R, w.current, P({
      placement: T
    }, v, {
      modifiers: j
    }));
    return y.current(G), () => {
      G.destroy(), y.current(null);
    };
  }, [R, l, c, u, v, T]);
  const k = {
    placement: S
  };
  f !== null && (k.TransitionProps = f);
  const M = Th(), D = (n = h.root) != null ? n : "div", z = Lt({
    elementType: D,
    externalSlotProps: p.root,
    externalForwardedProps: g,
    additionalProps: {
      role: "tooltip",
      ref: O
    },
    ownerState: t,
    className: M.root
  });
  return /* @__PURE__ */ d(D, P({}, z, {
    children: typeof a == "function" ? a(k) : a
  }));
}), Hs = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    popperOptions: b = Sh,
    popperRef: p,
    style: h,
    transition: f = !1,
    slotProps: g = {},
    slots: w = {}
  } = t, O = he(t, Eh), [x, E] = N.useState(!0), y = () => {
    E(!1);
  }, T = () => {
    E(!0);
  };
  if (!c && !m && (!f || x))
    return null;
  let S;
  if (a)
    S = a;
  else if (n) {
    const _ = vn(n);
    S = _ && Bn(_) ? Re(_).body : Re(null).body;
  }
  const I = !m && c && (!f || x) ? "none" : void 0, R = f ? {
    in: m,
    onEnter: y,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ d(jr, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ d(Ch, P({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: u,
      ref: r,
      open: f ? !x : m,
      placement: v,
      popperOptions: b,
      popperRef: p,
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
process.env.NODE_ENV !== "production" && (Hs.propTypes = {
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
  anchorEl: lr(s.oneOfType([pt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = vn(e.anchorEl);
      if (t && Bn(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || Nh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: jo,
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
function Yr() {
  const e = Ss(Ho);
  return process.env.NODE_ENV !== "production" && N.useDebugValue(e), e[Go] || e;
}
function wo(e, t) {
  return wo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, wo(e, t);
}
function Oh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, wo(e, t);
}
const mi = {
  disabled: !1
};
var Rh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Gs = X.createContext(null);
var Ph = function(t) {
  return t.scrollTop;
}, Nr = "unmounted", Rt = "exited", Pt = "entering", Kt = "entered", xo = "exiting", ht = /* @__PURE__ */ function(e) {
  Oh(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = Rt, a.appearStatus = Pt) : c = Kt : n.unmountOnExit || n.mountOnEnter ? c = Nr : c = Rt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === Nr ? {
      status: Rt
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== Pt && i !== Kt && (a = Pt) : (i === Pt || i === Kt) && (a = xo);
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
      if (this.cancelNextCallback(), a === Pt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Qr.findDOMNode(this);
          i && Ph(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Rt && this.setState({
        status: Nr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Qr.findDOMNode(this), l], u = c[0], m = c[1], v = this.getTimeouts(), b = l ? v.appear : v.enter;
    if (!o && !i || mi.disabled) {
      this.safeSetState({
        status: Kt
      }, function() {
        a.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, m), this.safeSetState({
      status: Pt
    }, function() {
      a.props.onEntering(u, m), a.onTransitionEnd(b, function() {
        a.safeSetState({
          status: Kt
        }, function() {
          a.props.onEntered(u, m);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Qr.findDOMNode(this);
    if (!a || mi.disabled) {
      this.safeSetState({
        status: Rt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: xo
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: Rt
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Qr.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === Nr)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = he(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ X.createElement(Gs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : X.cloneElement(X.Children.only(i), l))
    );
  }, t;
}(X.Component);
ht.contextType = Gs;
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
    var r = Rh;
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
function Xt() {
}
ht.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Xt,
  onEntering: Xt,
  onEntered: Xt,
  onExit: Xt,
  onExiting: Xt,
  onExited: Xt
};
ht.UNMOUNTED = Nr;
ht.EXITED = Rt;
ht.ENTERING = Pt;
ht.ENTERED = Kt;
ht.EXITING = xo;
const Ws = ht, Xs = (e) => e.scrollTop;
function yn(e, t) {
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
const $h = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Eo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const _h = {
  entering: {
    opacity: 1,
    transform: Eo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, no = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), ea = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    onExiting: p,
    style: h,
    timeout: f = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: g = Ws
  } = t, w = he(t, $h), O = Er(), x = N.useRef(), E = Yr(), y = N.useRef(null), T = We(y, a.ref, r), S = (H) => (j) => {
    if (H) {
      const G = y.current;
      j === void 0 ? H(G) : H(G, j);
    }
  }, I = S(m), R = S((H, j) => {
    Xs(H);
    const {
      duration: G,
      delay: te,
      easing: V
    } = yn({
      style: h,
      timeout: f,
      easing: i
    }, {
      mode: "enter"
    });
    let C;
    f === "auto" ? (C = E.transitions.getAutoHeightDuration(H.clientHeight), x.current = C) : C = G, H.style.transition = [E.transitions.create("opacity", {
      duration: C,
      delay: te
    }), E.transitions.create("transform", {
      duration: no ? C : C * 0.666,
      delay: te,
      easing: V
    })].join(","), c && c(H, j);
  }), _ = S(u), k = S(p), M = S((H) => {
    const {
      duration: j,
      delay: G,
      easing: te
    } = yn({
      style: h,
      timeout: f,
      easing: i
    }, {
      mode: "exit"
    });
    let V;
    f === "auto" ? (V = E.transitions.getAutoHeightDuration(H.clientHeight), x.current = V) : V = j, H.style.transition = [E.transitions.create("opacity", {
      duration: V,
      delay: G
    }), E.transitions.create("transform", {
      duration: no ? V : V * 0.666,
      delay: no ? G : G || V * 0.333,
      easing: te
    })].join(","), H.style.opacity = 0, H.style.transform = Eo(0.75), v && v(H);
  }), D = S(b);
  return /* @__PURE__ */ d(g, P({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: R,
    onEntered: _,
    onEntering: I,
    onExit: M,
    onExited: D,
    onExiting: k,
    addEndListener: (H) => {
      f === "auto" && O.start(x.current || 0, H), n && n(y.current, H);
    },
    timeout: f === "auto" ? null : f
  }, w, {
    children: (H, j) => /* @__PURE__ */ N.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: Eo(0.75),
        visibility: H === "exited" && !l ? "hidden" : void 0
      }, _h[H], h, a.props.style),
      ref: T
    }, j))
  }));
});
process.env.NODE_ENV !== "production" && (ea.propTypes = {
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
  children: zr.isRequired,
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
ea.muiSupportAuto = !0;
const ko = ea, Ih = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, hi = Ih, Mh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Ah = Pe(Hs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ys = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n;
  const o = Ts(), a = mt({
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
    modifiers: p,
    open: h,
    placement: f,
    popperOptions: g,
    popperRef: w,
    transition: O,
    slots: x,
    slotProps: E
  } = a, y = he(a, Mh), T = (n = x == null ? void 0 : x.root) != null ? n : c == null ? void 0 : c.Root, S = P({
    anchorEl: i,
    container: m,
    disablePortal: v,
    keepMounted: b,
    modifiers: p,
    open: h,
    placement: f,
    popperOptions: g,
    popperRef: w,
    transition: O
  }, y);
  return /* @__PURE__ */ d(Ah, P({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: T
    },
    slotProps: E ?? u
  }, S, {
    ref: r
  }));
});
process.env.NODE_ENV !== "production" && (Ys.propTypes = {
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
  popperRef: jo,
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
const qs = Ys;
function Dh(e) {
  return nt("MuiTooltip", e);
}
const jh = kt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), wt = jh, Bh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Lh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Fh = (e) => {
  const {
    classes: t,
    disableInteractive: r,
    arrow: n,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !r && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${tt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ft(i, Dh, t);
}, Vh = Pe(qs, {
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
})), zh = Pe("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.tooltip, r.touch && t.touch, r.arrow && t.tooltipArrow, t[`tooltipPlacement${tt(r.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => P({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : hn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Lh(16 / 14)}em`,
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
})), Uh = Pe("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : hn(e.palette.grey[700], 0.9),
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
let nn = !1;
const gi = new Ur();
let vr = {
  x: 0,
  y: 0
};
function on(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const Ks = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c, u, m, v, b, p, h, f, g, w, O, x, E, y;
  const T = mt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: I,
    components: R = {},
    componentsProps: _ = {},
    describeChild: k = !1,
    disableFocusListener: M = !1,
    disableHoverListener: D = !1,
    disableInteractive: z = !1,
    disableTouchListener: H = !1,
    enterDelay: j = 100,
    enterNextDelay: G = 0,
    enterTouchDelay: te = 700,
    followCursor: V = !1,
    id: C,
    leaveDelay: B = 0,
    leaveTouchDelay: W = 1500,
    onClose: Y,
    onOpen: U,
    open: K,
    placement: q = "bottom",
    PopperComponent: Z,
    PopperProps: J = {},
    slotProps: Q = {},
    slots: ee = {},
    title: ie,
    TransitionComponent: F = ko,
    TransitionProps: re
  } = T, A = he(T, Bh), se = /* @__PURE__ */ N.isValidElement(I) ? I : /* @__PURE__ */ d("span", {
    children: I
  }), Te = Yr(), $e = Te.direction === "rtl", [ke, St] = N.useState(), [_e, ot] = N.useState(null), Be = N.useRef(!1), at = z || V, Se = Er(), Vt = Er(), Ct = Er(), cr = Er(), [Kr, oa] = fs({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let it = Kr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = N.useRef(K !== void 0);
    N.useEffect(() => {
      ke && ke.disabled && !ne && ie !== "" && ke.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, ke, ne]);
  }
  const Ln = us(C), pr = N.useRef(), Jr = Ar(() => {
    pr.current !== void 0 && (document.body.style.WebkitUserSelect = pr.current, pr.current = void 0), cr.clear();
  });
  N.useEffect(() => Jr, [Jr]);
  const aa = (ne) => {
    gi.clear(), nn = !0, oa(!0), U && !it && U(ne);
  }, Zr = Ar(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      gi.start(800 + B, () => {
        nn = !1;
      }), oa(!1), Y && it && Y(ne), Se.start(Te.transitions.duration.shortest, () => {
        Be.current = !1;
      });
    }
  ), Fn = (ne) => {
    Be.current && ne.type !== "touchstart" || (ke && ke.removeAttribute("title"), Vt.clear(), Ct.clear(), j || nn && G ? Vt.start(nn ? G : j, () => {
      aa(ne);
    }) : aa(ne));
  }, ia = (ne) => {
    Vt.clear(), Ct.start(B, () => {
      Zr(ne);
    });
  }, {
    isFocusVisibleRef: sa,
    onBlur: Ml,
    onFocus: Al,
    ref: Dl
  } = ms(), [, la] = N.useState(!1), ca = (ne) => {
    Ml(ne), sa.current === !1 && (la(!1), ia(ne));
  }, pa = (ne) => {
    ke || St(ne.currentTarget), Al(ne), sa.current === !0 && (la(!0), Fn(ne));
  }, da = (ne) => {
    Be.current = !0;
    const Le = se.props;
    Le.onTouchStart && Le.onTouchStart(ne);
  }, ua = Fn, fa = ia, jl = (ne) => {
    da(ne), Ct.clear(), Se.clear(), Jr(), pr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", cr.start(te, () => {
      document.body.style.WebkitUserSelect = pr.current, Fn(ne);
    });
  }, Bl = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Jr(), Ct.start(W, () => {
      Zr(ne);
    });
  };
  N.useEffect(() => {
    if (!it)
      return;
    function ne(Le) {
      (Le.key === "Escape" || Le.key === "Esc") && Zr(Le);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Zr, it]);
  const Ll = We(se.ref, Dl, St, r);
  !ie && ie !== 0 && (it = !1);
  const Vn = N.useRef(), Fl = (ne) => {
    const Le = se.props;
    Le.onMouseMove && Le.onMouseMove(ne), vr = {
      x: ne.clientX,
      y: ne.clientY
    }, Vn.current && Vn.current.update();
  }, dr = {}, zn = typeof ie == "string";
  k ? (dr.title = !it && zn && !D ? ie : null, dr["aria-describedby"] = it ? Ln : null) : (dr["aria-label"] = zn ? ie : null, dr["aria-labelledby"] = it && !zn ? Ln : null);
  const Ue = P({}, dr, A, se.props, {
    className: Oe(A.className, se.props.className),
    onTouchStart: da,
    ref: Ll
  }, V ? {
    onMouseMove: Fl
  } : {});
  process.env.NODE_ENV !== "production" && (Ue["data-mui-internal-clone-element"] = !0, N.useEffect(() => {
    ke && !ke.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ke]));
  const ur = {};
  H || (Ue.onTouchStart = jl, Ue.onTouchEnd = Bl), D || (Ue.onMouseOver = on(ua, Ue.onMouseOver), Ue.onMouseLeave = on(fa, Ue.onMouseLeave), at || (ur.onMouseOver = ua, ur.onMouseLeave = fa)), M || (Ue.onFocus = on(pa, Ue.onFocus), Ue.onBlur = on(ca, Ue.onBlur), at || (ur.onFocus = pa, ur.onBlur = ca)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const Vl = N.useMemo(() => {
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
  }, [_e, J]), fr = P({}, T, {
    isRtl: $e,
    arrow: S,
    disableInteractive: at,
    placement: q,
    PopperComponentProp: Z,
    touch: Be.current
  }), Un = Fh(fr), ma = (n = (o = ee.popper) != null ? o : R.Popper) != null ? n : Vh, ha = (a = (i = (l = ee.transition) != null ? l : R.Transition) != null ? i : F) != null ? a : ko, ga = (c = (u = ee.tooltip) != null ? u : R.Tooltip) != null ? c : zh, ba = (m = (v = ee.arrow) != null ? v : R.Arrow) != null ? m : Uh, zl = kr(ma, P({}, J, (b = Q.popper) != null ? b : _.popper, {
    className: Oe(Un.popper, J == null ? void 0 : J.className, (p = (h = Q.popper) != null ? h : _.popper) == null ? void 0 : p.className)
  }), fr), Ul = kr(ha, P({}, re, (f = Q.transition) != null ? f : _.transition), fr), Hl = kr(ga, P({}, (g = Q.tooltip) != null ? g : _.tooltip, {
    className: Oe(Un.tooltip, (w = (O = Q.tooltip) != null ? O : _.tooltip) == null ? void 0 : w.className)
  }), fr), Gl = kr(ba, P({}, (x = Q.arrow) != null ? x : _.arrow, {
    className: Oe(Un.arrow, (E = (y = Q.arrow) != null ? y : _.arrow) == null ? void 0 : E.className)
  }), fr);
  return /* @__PURE__ */ $(N.Fragment, {
    children: [/* @__PURE__ */ N.cloneElement(se, Ue), /* @__PURE__ */ d(ma, P({
      as: Z ?? qs,
      placement: q,
      anchorEl: V ? {
        getBoundingClientRect: () => ({
          top: vr.y,
          left: vr.x,
          right: vr.x,
          bottom: vr.y,
          width: 0,
          height: 0
        })
      } : ke,
      popperRef: Vn,
      open: ke ? it : !1,
      id: Ln,
      transition: !0
    }, ur, zl, {
      popperOptions: Vl,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ d(ha, P({
        timeout: Te.transitions.duration.shorter
      }, ne, Ul, {
        children: /* @__PURE__ */ $(ga, P({}, Hl, {
          children: [ie, S ? /* @__PURE__ */ d(ba, P({}, Gl, {
            ref: ot
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Ks.propTypes = {
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
  children: zr.isRequired,
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
const Hh = Ks;
function bi(e, t, r) {
  return e ? /* @__PURE__ */ d(Ai, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ d("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Js(e) {
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
    hasDivider: p = !1,
    focusVisibleClassName: h,
    id: f,
    children: g
  } = e, w = /* @__PURE__ */ d(
    Pc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: m,
      disableGutters: b,
      divider: p,
      focusVisibleClassName: h,
      onClick: t,
      id: f,
      children: r ? /* @__PURE__ */ $(Et, { children: [
        bi(a, r, !0),
        /* @__PURE__ */ d($c, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ d(Ai, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ d(Rs, {}) }) : bi(i, r, !1)
      ] }) : g
    }
  );
  return n ? /* @__PURE__ */ d(Hh, { title: n, placement: "right", children: /* @__PURE__ */ d("div", { children: w }) }) : w;
}
function Zs(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function Gh(e) {
  const [t, r] = ge(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (u) => {
    r(u.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let u = Zs(a).filter((m) => "menuItem" in m.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (m) => "menuItem" in m.group && m.group.menuItem === n.id
    ), /* @__PURE__ */ d(ta, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ d(Js, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ d(
      _c,
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
const Wh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function ta(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = ct(() => {
    const m = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Zs(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(m).sort(
      (h, f) => (h.group.order || 0) - (f.group.order || 0)
    ), b = [];
    v.forEach((h) => {
      Wh(h.id, t.items).forEach(
        (f) => b.push({ item: f, isLastItemInGroup: !1 })
      ), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !0);
    }), b.length > 0 && (b[b.length - 1].isLastItemInGroup = !1);
    const p = b.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: b, allowForLeadingIcons: p };
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
    return /* @__PURE__ */ d("div", {});
  const u = c.item.group;
  return /* @__PURE__ */ d("div", { role: "menu", "aria-label": u, children: a.map((m, v) => {
    const { item: b } = m, p = l(m);
    if ("command" in b) {
      const h = b.group + v;
      return /* @__PURE__ */ d(
        Js,
        {
          onClick: (f) => {
            r == null || r(f), n(b);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ d(
      Gh,
      {
        parentMenuItem: b,
        parentItemProps: p,
        ...e
      },
      u + b.id
    );
  }) }, u);
}
function Xh(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ d(ta, { ...e, includedGroups: a });
}
function Yh({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ $(
    Di,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ d("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ d(Ic, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ d(
          Xh,
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
function qh({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = ct(() => {
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
  return /* @__PURE__ */ d(
    Di,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, l) => /* @__PURE__ */ d(
        Yh,
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
const Qs = /* @__PURE__ */ N.createContext({});
process.env.NODE_ENV !== "production" && (Qs.displayName = "ListContext");
const Kh = Qs;
function Jh(e) {
  return nt("MuiList", e);
}
kt("MuiList", ["root", "padding", "dense", "subheader"]);
const Zh = ["children", "className", "component", "dense", "disablePadding", "subheader"], Qh = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return ft({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, Jh, t);
}, eg = Pe("ul", {
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
})), el = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = mt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = n, m = he(n, Zh), v = N.useMemo(() => ({
    dense: l
  }), [l]), b = P({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = Qh(b);
  return /* @__PURE__ */ d(Kh.Provider, {
    value: v,
    children: /* @__PURE__ */ $(eg, P({
      as: i,
      className: Oe(p.root, a),
      ref: r,
      ownerState: b
    }, m, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (el.propTypes = {
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
const tg = el, rg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function oo(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function vi(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function tl(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function yr(e, t, r, n, o, a) {
  let i = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !tl(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const rl = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
  } = t, b = he(t, rg), p = N.useRef(null), h = N.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  jt(() => {
    o && p.current.focus();
  }, [o]), N.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (x, E) => {
      const y = !p.current.style.width;
      if (x.clientHeight < p.current.clientHeight && y) {
        const T = `${hs(Re(x))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, p.current.style.width = `calc(100% + ${T})`;
      }
      return p.current;
    }
  }), []);
  const f = (x) => {
    const E = p.current, y = x.key, T = Re(E).activeElement;
    if (y === "ArrowDown")
      x.preventDefault(), yr(E, T, u, c, oo);
    else if (y === "ArrowUp")
      x.preventDefault(), yr(E, T, u, c, vi);
    else if (y === "Home")
      x.preventDefault(), yr(E, null, u, c, oo);
    else if (y === "End")
      x.preventDefault(), yr(E, null, u, c, vi);
    else if (y.length === 1) {
      const S = h.current, I = y.toLowerCase(), R = performance.now();
      S.keys.length > 0 && (R - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && I !== S.keys[0] && (S.repeating = !1)), S.lastTime = R, S.keys.push(I);
      const _ = T && !S.repeating && tl(T, S);
      S.previousKeyMatched && (_ || yr(E, T, !1, c, oo, S)) ? x.preventDefault() : S.previousKeyMatched = !1;
    }
    m && m(x);
  }, g = We(p, r);
  let w = -1;
  N.Children.forEach(i, (x, E) => {
    if (!/* @__PURE__ */ N.isValidElement(x)) {
      w === E && (w += 1, w >= i.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && un.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (v === "selectedMenu" && x.props.selected || w === -1) && (w = E), w === E && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= i.length && (w = -1));
  });
  const O = N.Children.map(i, (x, E) => {
    if (E === w) {
      const y = {};
      return a && (y.autoFocus = !0), x.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ N.cloneElement(x, y);
    }
    return x;
  });
  return /* @__PURE__ */ d(tg, P({
    role: "menu",
    ref: g,
    className: l,
    onKeyDown: f,
    tabIndex: o ? 0 : -1
  }, b, {
    children: O
  }));
});
process.env.NODE_ENV !== "production" && (rl.propTypes = {
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
const ng = rl, og = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], ag = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, nl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = Yr(), o = {
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
    onExit: p,
    onExited: h,
    onExiting: f,
    style: g,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: O = Ws
  } = t, x = he(t, og), E = N.useRef(null), y = We(E, l.ref, r), T = (z) => (H) => {
    if (z) {
      const j = E.current;
      H === void 0 ? z(j) : z(j, H);
    }
  }, S = T(b), I = T((z, H) => {
    Xs(z);
    const j = yn({
      style: g,
      timeout: w,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", j), z.style.transition = n.transitions.create("opacity", j), m && m(z, H);
  }), R = T(v), _ = T(f), k = T((z) => {
    const H = yn({
      style: g,
      timeout: w,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", H), z.style.transition = n.transitions.create("opacity", H), p && p(z);
  }), M = T(h);
  return /* @__PURE__ */ d(O, P({
    appear: i,
    in: u,
    nodeRef: E,
    onEnter: I,
    onEntered: R,
    onEntering: S,
    onExit: k,
    onExited: M,
    onExiting: _,
    addEndListener: (z) => {
      a && a(E.current, z);
    },
    timeout: w
  }, x, {
    children: (z, H) => /* @__PURE__ */ N.cloneElement(l, P({
      style: P({
        opacity: 0,
        visibility: z === "exited" && !u ? "hidden" : void 0
      }, ag[z], g, l.props.style),
      ref: y
    }, H))
  }));
});
process.env.NODE_ENV !== "production" && (nl.propTypes = {
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
  children: zr.isRequired,
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
const ig = nl;
function sg(e) {
  return nt("MuiBackdrop", e);
}
kt("MuiBackdrop", ["root", "invisible"]);
const lg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], cg = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return ft({
    root: ["root", r && "invisible"]
  }, sg, t);
}, pg = Pe("div", {
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
})), ol = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a;
  const i = mt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: m = {},
    componentsProps: v = {},
    invisible: b = !1,
    open: p,
    slotProps: h = {},
    slots: f = {},
    TransitionComponent: g = ig,
    transitionDuration: w
  } = i, O = he(i, lg), x = P({}, i, {
    component: u,
    invisible: b
  }), E = cg(x), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ d(g, P({
    in: p,
    timeout: w
  }, O, {
    children: /* @__PURE__ */ d(pg, P({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = f.root) != null ? a : m.Root) != null ? o : u,
      className: Oe(E.root, c, y == null ? void 0 : y.className),
      ownerState: P({}, x, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ol.propTypes = {
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
const dg = ol;
function ug(e) {
  return nt("MuiModal", e);
}
kt("MuiModal", ["root", "hidden", "backdrop"]);
const fg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], mg = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return ft({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, ug, n);
}, hg = Pe("div", {
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
})), gg = Pe(dg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), al = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const u = mt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: m = gg,
    BackdropProps: v,
    className: b,
    closeAfterTransition: p = !1,
    children: h,
    container: f,
    component: g,
    components: w = {},
    componentsProps: O = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: T = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: I = !1,
    hideBackdrop: R = !1,
    keepMounted: _ = !1,
    onBackdropClick: k,
    open: M,
    slotProps: D,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = u, H = he(u, fg), j = P({}, u, {
    closeAfterTransition: p,
    disableAutoFocus: x,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: T,
    disableRestoreFocus: S,
    disableScrollLock: I,
    hideBackdrop: R,
    keepMounted: _
  }), {
    getRootProps: G,
    getBackdropProps: te,
    getTransitionProps: V,
    portalRef: C,
    isTopModal: B,
    exited: W,
    hasTransition: Y
  } = fm(P({}, j, {
    rootRef: r
  })), U = P({}, j, {
    exited: W
  }), K = mg(U), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), Y) {
    const {
      onEnter: re,
      onExited: A
    } = V();
    q.onEnter = re, q.onExited = A;
  }
  const Z = (n = (o = z == null ? void 0 : z.root) != null ? o : w.Root) != null ? n : hg, J = (a = (i = z == null ? void 0 : z.backdrop) != null ? i : w.Backdrop) != null ? a : m, Q = (l = D == null ? void 0 : D.root) != null ? l : O.root, ee = (c = D == null ? void 0 : D.backdrop) != null ? c : O.backdrop, ie = Lt({
    elementType: Z,
    externalSlotProps: Q,
    externalForwardedProps: H,
    getSlotProps: G,
    additionalProps: {
      ref: r,
      as: g
    },
    ownerState: U,
    className: Oe(b, Q == null ? void 0 : Q.className, K == null ? void 0 : K.root, !U.open && U.exited && (K == null ? void 0 : K.hidden))
  }), F = Lt({
    elementType: J,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (re) => te(P({}, re, {
      onClick: (A) => {
        k && k(A), re != null && re.onClick && re.onClick(A);
      }
    })),
    className: Oe(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, K == null ? void 0 : K.backdrop),
    ownerState: U
  });
  return !_ && !M && (!Y || W) ? null : /* @__PURE__ */ d(jr, {
    ref: C,
    container: f,
    disablePortal: T,
    children: /* @__PURE__ */ $(Z, P({}, ie, {
      children: [!R && m ? /* @__PURE__ */ d(J, P({}, F)) : null, /* @__PURE__ */ d(gn, {
        disableEnforceFocus: E,
        disableAutoFocus: x,
        disableRestoreFocus: S,
        isEnabled: B,
        open: M,
        children: /* @__PURE__ */ N.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (al.propTypes = {
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
  children: zr.isRequired,
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
const bg = al;
function vg(e) {
  return nt("MuiPaper", e);
}
kt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const yg = ["className", "component", "elevation", "square", "variant"], wg = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return ft(a, vg, o);
}, xg = Pe("div", {
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
    backgroundImage: `linear-gradient(${hn("#fff", hi(t.elevation))}, ${hn("#fff", hi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), il = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = mt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, u = he(n, yg), m = P({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = wg(m);
  return process.env.NODE_ENV !== "production" && Yr().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ d(xg, P({
    as: a,
    ownerState: m,
    className: Oe(v.root, o),
    ref: r
  }, u));
});
process.env.NODE_ENV !== "production" && (il.propTypes = {
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
  elevation: lr(vs, (e) => {
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
const Eg = il;
function kg(e) {
  return nt("MuiPopover", e);
}
kt("MuiPopover", ["root", "paper"]);
const Ng = ["onEntering"], Tg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], Sg = ["slotProps"];
function yi(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function wi(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function xi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function cn(e) {
  return typeof e == "function" ? e() : e;
}
const Cg = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"],
    paper: ["paper"]
  }, kg, t);
}, Og = Pe(bg, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), sl = Pe(Eg, {
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
}), ll = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a;
  const i = mt({
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
    className: p,
    container: h,
    elevation: f = 8,
    marginThreshold: g = 16,
    open: w,
    PaperProps: O = {},
    slots: x,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = ko,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: R = !1
  } = i, _ = he(i.TransitionProps, Ng), k = he(i, Tg), M = (n = E == null ? void 0 : E.paper) != null ? n : O, D = N.useRef(), z = We(D, M.ref), H = P({}, i, {
    anchorOrigin: u,
    anchorReference: v,
    elevation: f,
    marginThreshold: g,
    externalPaperSlotProps: M,
    transformOrigin: y,
    TransitionComponent: T,
    transitionDuration: S,
    TransitionProps: _
  }), j = Cg(H), G = N.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (m || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), m;
    const re = cn(c), A = re && re.nodeType === 1 ? re : Re(D.current).body, se = A.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + yi(se, u.vertical),
      left: se.left + wi(se, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, m, v]), te = N.useCallback((re) => ({
    vertical: yi(re, y.vertical),
    horizontal: wi(re, y.horizontal)
  }), [y.horizontal, y.vertical]), V = N.useCallback((re) => {
    const A = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, se = te(A);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: xi(se)
      };
    const Te = G();
    let $e = Te.top - se.vertical, ke = Te.left - se.horizontal;
    const St = $e + A.height, _e = ke + A.width, ot = rr(cn(c)), Be = ot.innerHeight - g, at = ot.innerWidth - g;
    if (g !== null && $e < g) {
      const Se = $e - g;
      $e -= Se, se.vertical += Se;
    } else if (g !== null && St > Be) {
      const Se = St - Be;
      $e -= Se, se.vertical += Se;
    }
    if (process.env.NODE_ENV !== "production" && A.height > Be && A.height && Be && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${A.height - Be}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), g !== null && ke < g) {
      const Se = ke - g;
      ke -= Se, se.horizontal += Se;
    } else if (_e > at) {
      const Se = _e - at;
      ke -= Se, se.horizontal += Se;
    }
    return {
      top: `${Math.round($e)}px`,
      left: `${Math.round(ke)}px`,
      transformOrigin: xi(se)
    };
  }, [c, v, G, te, g]), [C, B] = N.useState(w), W = N.useCallback(() => {
    const re = D.current;
    if (!re)
      return;
    const A = V(re);
    A.top !== null && (re.style.top = A.top), A.left !== null && (re.style.left = A.left), re.style.transformOrigin = A.transformOrigin, B(!0);
  }, [V]);
  N.useEffect(() => (R && window.addEventListener("scroll", W), () => window.removeEventListener("scroll", W)), [c, R, W]);
  const Y = (re, A) => {
    I && I(re, A), W();
  }, U = () => {
    B(!1);
  };
  N.useEffect(() => {
    w && W();
  }), N.useImperativeHandle(l, () => w ? {
    updatePosition: () => {
      W();
    }
  } : null, [w, W]), N.useEffect(() => {
    if (!w)
      return;
    const re = ds(() => {
      W();
    }), A = rr(c);
    return A.addEventListener("resize", re), () => {
      re.clear(), A.removeEventListener("resize", re);
    };
  }, [c, w, W]);
  let K = S;
  S === "auto" && !T.muiSupportAuto && (K = void 0);
  const q = h || (c ? Re(cn(c)).body : void 0), Z = (o = x == null ? void 0 : x.root) != null ? o : Og, J = (a = x == null ? void 0 : x.paper) != null ? a : sl, Q = Lt({
    elementType: J,
    externalSlotProps: P({}, M, {
      style: C ? M.style : P({}, M.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: f,
      ref: z
    },
    ownerState: H,
    className: Oe(j.paper, M == null ? void 0 : M.className)
  }), ee = Lt({
    elementType: Z,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: k,
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
    ownerState: H,
    className: Oe(j.root, p)
  }), {
    slotProps: ie
  } = ee, F = he(ee, Sg);
  return /* @__PURE__ */ d(Z, P({}, F, !Ps(Z) && {
    slotProps: ie,
    disableScrollLock: R
  }, {
    children: /* @__PURE__ */ d(T, P({
      appear: !0,
      in: w,
      onEntering: Y,
      onExited: U,
      timeout: K
    }, _, {
      children: /* @__PURE__ */ d(J, P({}, Q, {
        children: b
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (ll.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: jo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: lr(s.oneOfType([pt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = cn(e.anchorEl);
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
  elevation: vs,
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
    component: od
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
const Rg = ll;
function Pg(e) {
  return nt("MuiMenu", e);
}
kt("MuiMenu", ["root", "paper", "list"]);
const $g = ["onEntering"], _g = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Ig = {
  vertical: "top",
  horizontal: "right"
}, Mg = {
  vertical: "top",
  horizontal: "left"
}, Ag = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Pg, t);
}, Dg = Pe(Rg, {
  shouldForwardProp: (e) => Cs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), jg = Pe(sl, {
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
}), Bg = Pe(ng, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), cl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o;
  const a = mt({
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
    PaperProps: p = {},
    PopoverClasses: h,
    transitionDuration: f = "auto",
    TransitionProps: {
      onEntering: g
    } = {},
    variant: w = "selectedMenu",
    slots: O = {},
    slotProps: x = {}
  } = a, E = he(a.TransitionProps, $g), y = he(a, _g), T = Yr(), S = T.direction === "rtl", I = P({}, a, {
    autoFocus: i,
    disableAutoFocusItem: u,
    MenuListProps: m,
    onEntering: g,
    PaperProps: p,
    transitionDuration: f,
    TransitionProps: E,
    variant: w
  }), R = Ag(I), _ = i && !u && b, k = N.useRef(null), M = (V, C) => {
    k.current && k.current.adjustStyleForScrollbar(V, T), g && g(V, C);
  }, D = (V) => {
    V.key === "Tab" && (V.preventDefault(), v && v(V, "tabKeyDown"));
  };
  let z = -1;
  N.Children.map(l, (V, C) => {
    /* @__PURE__ */ N.isValidElement(V) && (process.env.NODE_ENV !== "production" && un.isFragment(V) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), V.props.disabled || (w === "selectedMenu" && V.props.selected || z === -1) && (z = C));
  });
  const H = (n = O.paper) != null ? n : jg, j = (o = x.paper) != null ? o : p, G = Lt({
    elementType: O.root,
    externalSlotProps: x.root,
    ownerState: I,
    className: [R.root, c]
  }), te = Lt({
    elementType: H,
    externalSlotProps: j,
    ownerState: I,
    className: R.paper
  });
  return /* @__PURE__ */ d(Dg, P({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? Ig : Mg,
    slots: {
      paper: H,
      root: O.root
    },
    slotProps: {
      root: G,
      paper: te
    },
    open: b,
    ref: r,
    transitionDuration: f,
    TransitionProps: P({
      onEntering: M
    }, E),
    ownerState: I
  }, y, {
    classes: h,
    children: /* @__PURE__ */ d(Bg, P({
      onKeyDown: D,
      actions: k,
      autoFocus: i && (z === -1 || u),
      autoFocusItem: _,
      variant: w
    }, m, {
      className: Oe(R.list, m.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (cl.propTypes = {
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
const Lg = cl;
function Kv({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var u;
  const [o, a] = X.useState(void 0), i = Ce(
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
  }, []), c = ct(() => {
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
        /* @__PURE__ */ d(
          Lg,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ d(
              ta,
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
function Fg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const No = (e, t, r = {}) => {
  const n = Mt(t);
  n.current = t;
  const o = Mt(r);
  o.current = Fg(o.current);
  const [a, i] = ge(() => n.current), [l, c] = ge(!0);
  return Qe(() => {
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
}, Vg = Os(/* @__PURE__ */ d("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function zg({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, u] = ge(!1), [m, v] = ge(!1), b = Ce(() => {
    c && u(!1), v(!1);
  }, [c]), p = Ce((E) => {
    E.stopPropagation(), u((y) => {
      const T = !y;
      return T && E.shiftKey ? v(!0) : T || v(!1), T;
    });
  }, []), h = Ce(
    (E) => (b(), n(E)),
    [n, b]
  ), [f, g] = ge({ top: 1, left: 1 });
  Qe(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), T = window.scrollY, S = window.scrollX, I = y.top + T + E.clientHeight, R = y.left + S;
        g({ top: I, left: R });
      }
    }
  }, [c, o]);
  const [w] = No(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [O] = No(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? r ?? w, [e, r, w, c]),
    r ?? w
  ), x = m && O ? O : w;
  return /* @__PURE__ */ $(Et, { children: [
    /* @__PURE__ */ d(
      ji,
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
        children: l ?? /* @__PURE__ */ d(Vg, {})
      }
    ),
    /* @__PURE__ */ d(
      Mc,
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
        children: x ? /* @__PURE__ */ d(
          qh,
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
function Jv({
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
  return /* @__PURE__ */ d(
    ji,
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
const yt = "scrBook", Ug = "scrRef", $t = "source", Hg = "details", Gg = "Scripture Reference", Wg = "Scripture Book", pl = "Type", Xg = "Details";
function Yg(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: yt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Gg,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === yt ? Hn(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => po(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => Hn(n.start),
      id: Ug,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : Hn(o.start);
      },
      sortingFn: (n, o) => po(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: $t,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? pl : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: Hg,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Xg,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
const qg = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let r = 0;
  return e.end && ({ offset: r } = e.end), !e.end || po(e.start, e.end) === 0 ? `${Gn(e.start)}+${t}` : `${Gn(e.start)}+${t}-${Gn(e.end)}+${r}`;
}, Ei = (e) => `${qg({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Zv({
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
  const [u, m] = ge([]), [v, b] = ge([{ id: yt, desc: !1 }]), [p, h] = ge({}), f = ct(
    () => e.flatMap((R) => R.data.map((_) => ({
      ..._,
      source: R.source
    }))),
    [e]
  ), g = ct(
    () => Yg(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      r
    ),
    [n, a, i, r]
  );
  Qe(() => {
    u.includes($t) ? b([
      { id: $t, desc: !1 },
      { id: yt, desc: !1 }
    ]) : b([{ id: yt, desc: !1 }]);
  }, [u]);
  const w = $i({
    data: f,
    columns: g,
    state: {
      grouping: u,
      sorting: v,
      rowSelection: p
    },
    onGroupingChange: m,
    onSortingChange: b,
    onRowSelectionChange: h,
    getExpandedRowModel: Tc(),
    getGroupedRowModel: Sc(),
    getCoreRowModel: _i(),
    getSortedRowModel: Ii(),
    getRowId: Ei,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Qe(() => {
    if (l) {
      const R = w.getSelectedRowModel().rowsById, _ = Object.keys(R);
      if (_.length === 1) {
        const k = f.find((M) => Ei(M) === _[0]) || void 0;
        k && l(k);
      }
    }
  }, [p, f, l, w]);
  const O = o ?? Wg, x = a ?? pl, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${O}`, value: [yt] },
    { label: `Group by ${x}`, value: [$t] },
    {
      label: `Group by ${O} and ${x}`,
      value: [yt, $t]
    },
    {
      label: `Group by ${x} and ${O}`,
      value: [$t, yt]
    }
  ], y = (R) => {
    m(JSON.parse(R));
  }, T = (R, _) => {
    !R.getIsGrouped() && !R.getIsSelected() && R.getToggleSelectedHandler()(_);
  }, S = (R, _) => R.getIsGrouped() ? "" : L("banded-row", _ % 2 === 0 ? "even" : "odd"), I = (R, _, k) => {
    if (!((R == null ? void 0 : R.length) === 0 || _.depth < k.column.getGroupedIndex())) {
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
      _r,
      {
        value: JSON.stringify(u),
        onValueChange: (R) => {
          y(R);
        },
        children: [
          /* @__PURE__ */ d(Zt, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ d(Ir, {}) }),
          /* @__PURE__ */ d(Qt, { position: "item-aligned", children: /* @__PURE__ */ d(xp, { children: E.map((R) => /* @__PURE__ */ d(Ke, { value: JSON.stringify(R.value), children: R.label }, R.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ $(Nn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ d(Tn, { children: w.getHeaderGroups().map((R) => /* @__PURE__ */ d(xt, { children: R.headers.filter((_) => _.column.columnDef.header).map((_) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ d(Mr, { colSpan: _.colSpan, className: "top-0 pr-sticky", children: _.isPlaceholder ? void 0 : /* @__PURE__ */ $("div", { children: [
          _.column.getCanGroup() ? /* @__PURE__ */ d(
            xe,
            {
              variant: "ghost",
              title: `Toggle grouping by ${_.column.columnDef.header}`,
              onClick: _.column.getToggleGroupingHandler(),
              type: "button",
              children: _.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          Tr(_.column.columnDef.header, _.getContext())
        ] }) }, _.id)
      )) }, R.id)) }),
      /* @__PURE__ */ d(Sn, { children: w.getRowModel().rows.map((R, _) => /* @__PURE__ */ d(
        xt,
        {
          "data-state": R.getIsSelected() ? "selected" : "",
          className: L(S(R, _)),
          onClick: (k) => T(R, k),
          children: R.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== $t || !r)))
              return /* @__PURE__ */ d(
                er,
                {
                  className: L(
                    k.column.columnDef.id,
                    "pr-p-[1px]",
                    I(u, R, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ $(
                    xe,
                    {
                      variant: "link",
                      onClick: R.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        R.getIsExpanded() && /* @__PURE__ */ d(xn, {}),
                        !R.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ d(Pi, {}) : /* @__PURE__ */ d(pc, {})),
                        " ",
                        Tr(k.column.columnDef.cell, k.getContext()),
                        " (",
                        R.subRows.length,
                        ")"
                      ]
                    }
                  ) : Tr(k.column.columnDef.cell, k.getContext()))()
                },
                k.id
              );
          })
        },
        R.id
      )) })
    ] })
  ] });
}
function Kg({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = ge(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ d(
    Fr,
    {
      className: L(
        "pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        { "pr-w-full": r }
      ),
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
function Qv({
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
  return /* @__PURE__ */ d(
    Ac,
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
function e0({
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
  return /* @__PURE__ */ d(
    Dc,
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
const dl = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.Root,
  {
    orientation: "vertical",
    ref: r,
    className: L("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
dl.displayName = je.List.displayName;
const ul = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.List,
  {
    ref: r,
    className: L(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
ul.displayName = je.List.displayName;
const Jg = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.Trigger,
  {
    ref: r,
    ...t,
    className: L(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), fl = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.Content,
  {
    ref: r,
    className: L(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
fl.displayName = je.Content.displayName;
function t0({
  tabList: e,
  onSearch: t,
  searchPlaceholder: r,
  headerTitle: n,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ $("div", { className: "pr-twp", children: [
    /* @__PURE__ */ $("div", { className: "pr-sticky pr-top-0 pr-space-y-2 pr-pb-2", children: [
      n ? /* @__PURE__ */ d("h1", { children: n }) : "",
      /* @__PURE__ */ d(
        Kg,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ $(dl, { dir: a, children: [
      /* @__PURE__ */ d(ul, { children: e.map((i) => /* @__PURE__ */ d(Jg, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ d(fl, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const ml = X.forwardRef(({ className: e, orientation: t = "horizontal", decorative: r = !0, ...n }, o) => /* @__PURE__ */ d(
  Bi.Root,
  {
    ref: o,
    decorative: r,
    orientation: t,
    className: L(
      "pr-twp pr-shrink-0 pr-bg-border",
      t === "horizontal" ? "pr-h-[1px] pr-w-full" : "pr-h-full pr-w-[1px]",
      e
    ),
    ...n
  }
));
ml.displayName = Bi.Root.displayName;
function r0({ children: e }) {
  return /* @__PURE__ */ d("div", { className: "pr-twp pr-grid", children: e });
}
function n0({
  primary: e,
  secondary: t,
  children: r,
  isLoading: n = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ d("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ d("p", { className: "pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ d("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : /* @__PURE__ */ d("div", { children: r })
  ] });
}
function o0({
  primary: e,
  secondary: t,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ $("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ d("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ d("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ d(ml, {}) : ""
  ] });
}
const qr = wn(({ className: e, ...t }, r) => /* @__PURE__ */ d(dc, { size: 35, className: L("pr-animate-spin", e), ...t, ref: r }));
qr.displayName = "Spinner";
function a0({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ d(
    jc,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function i0({
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
  onBlur: p
}) {
  return /* @__PURE__ */ $("div", { className: L("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ d(
      dn,
      {
        htmlFor: e,
        className: L({
          "pr-text-red-600": r,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ d(
      Fr,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: L(c, { "pr-border-red-600": r }),
        defaultValue: u,
        value: m,
        onChange: v,
        onFocus: b,
        onBlur: p
      }
    ),
    /* @__PURE__ */ d("p", { className: L({ "pr-hidden": !o }), children: o })
  ] });
}
function s0({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = Mt(void 0);
  return /* @__PURE__ */ d("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ d(Bc, { position: "static", id: n, children: /* @__PURE__ */ $(
    Lc,
    {
      className: L("pr-bg-muted pr-text-muted-foreground", r),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ d(
          zg,
          {
            commandHandler: t,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ d("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const Zg = Oo(
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
), Qg = X.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ d("div", { ref: n, role: "alert", className: L(Zg({ variant: t }), e), ...r }));
Qg.displayName = "Alert";
const eb = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ $(
    "h5",
    {
      ref: r,
      className: L("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
eb.displayName = "AlertTitle";
const tb = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: L("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
tb.displayName = "AlertDescription";
const rb = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      className: L(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
rb.displayName = "Card";
const nb = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      className: L("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
nb.displayName = "CardHeader";
const ob = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "h3",
    {
      ref: r,
      className: L("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
ob.displayName = "CardTitle";
const ab = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("p", { ref: r, className: L("pr-text-sm pr-text-muted-foreground", e), ...t }));
ab.displayName = "CardDescription";
const ib = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: L("pr-p-6 pr-pt-0", e), ...t })
);
ib.displayName = "CardContent";
const sb = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: L("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
sb.displayName = "CardFooter";
function l0({ ...e }) {
  return /* @__PURE__ */ d(
    Hc,
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
const lb = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ $(
  xr.Root,
  {
    ref: r,
    className: L(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ d(xr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ d(xr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ d(xr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
lb.displayName = xr.Root.displayName;
const cb = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  uo.Root,
  {
    className: L(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ d(
      uo.Thumb,
      {
        className: L(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
cb.displayName = uo.Root.displayName;
const c0 = je.Root, pb = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.List,
  {
    ref: r,
    className: L(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
pb.displayName = je.List.displayName;
const db = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.Trigger,
  {
    ref: r,
    className: L(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
db.displayName = je.Trigger.displayName;
const ub = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  je.Content,
  {
    ref: r,
    className: L(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
ub.displayName = je.Content.displayName;
function p0({
  isInstalling: e,
  handleClick: t,
  buttonText: r,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ d(
    xe,
    {
      className: L(
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
      children: e ? /* @__PURE__ */ d(qr, { size: 15 }) : /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ d(uc, { size: 25, className: L("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function d0({
  isEnabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    xe,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ d(qr, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function u0({
  isDisabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    xe,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ d(qr, { size: 15, className: "pr-mr-1 pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function f0({
  isUpdating: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    xe,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ $(Et, { children: [
        /* @__PURE__ */ d(qr, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function It() {
  return It = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, It.apply(this, arguments);
}
const fb = ["children", "options"], ki = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), Ni = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, mb = ["style", "script"], hb = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, gb = /mailto:/i, bb = /\n{2,}$/, hl = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, vb = /^ *> ?/gm, yb = /^ {2,}\n/, wb = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, gl = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, bl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, xb = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Eb = /^(?:\n *)*\n/, kb = /\r\n?/g, Nb = /^\[\^([^\]]+)](:.*)\n/, Tb = /^\[\^([^\]]+)]/, Sb = /\f/g, Cb = /^\s*?\[(x|\s)\]/, vl = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, yl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, wl = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, To = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, Ob = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, xl = /^<!--[\s\S]*?(?:-->)/, Rb = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, So = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, Pb = /^\{.*\}$/, $b = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, _b = /^<([^ >]+@[^ >]+)>/, Ib = /^<([^ >]+:\/[^ >]+)>/, Mb = /-([a-z])?/gi, El = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, Ab = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, Db = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, jb = /^\[([^\]]*)\] ?\[([^\]]*)\]/, Bb = /(\[|\])/g, Lb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, Fb = /\t/g, Vb = /^ *\| */, zb = /(^ *\||\| *$)/g, Ub = / *$/, Hb = /^ *:-+: *$/, Gb = /^ *:-+ *$/, Wb = /^ *-+: *$/, Xb = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, Yb = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, qb = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Kb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Jb = /^\\([^0-9A-Za-z\s])/, Zb = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, Qb = /^\n+/, ev = /^([ \t]*)/, tv = /\\([^\\])/g, Ti = / *\n+$/, rv = /(?:^|\n)( *)$/, ra = "(?:\\d+\\.)", na = "(?:[*+-])";
function kl(e) {
  return "( *)(" + (e === 1 ? ra : na) + ") +";
}
const Nl = kl(1), Tl = kl(2);
function Sl(e) {
  return new RegExp("^" + (e === 1 ? Nl : Tl));
}
const nv = Sl(1), ov = Sl(2);
function Cl(e) {
  return new RegExp("^" + (e === 1 ? Nl : Tl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? ra : na) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Ol = Cl(1), Rl = Cl(2);
function Pl(e) {
  const t = e === 1 ? ra : na;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const $l = Pl(1), _l = Pl(2);
function Si(e, t) {
  const r = t === 1, n = r ? $l : _l, o = r ? Ol : Rl, a = r ? nv : ov;
  return { t(i, l, c) {
    const u = rv.exec(c);
    return u && (l.o || !l._ && !l.u) ? n.exec(i = u[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const u = r ? +i[2] : void 0, m = i[0].replace(bb, `
`).match(o);
    let v = !1;
    return { p: m.map(function(b, p) {
      const h = a.exec(b)[0].length, f = new RegExp("^ {1," + h + "}", "gm"), g = b.replace(f, "").replace(a, ""), w = p === m.length - 1, O = g.indexOf(`

`) !== -1 || w && v;
      v = O;
      const x = c._, E = c.o;
      let y;
      c.o = !0, O ? (c._ = !1, y = g.replace(Ti, `

`)) : (c._ = !0, y = g.replace(Ti, ""));
      const T = l(y, c);
      return c._ = x, c.o = E, T;
    }), m: r, g: u };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(u, m) {
    return e("li", { key: m }, l(u, c));
  })) };
}
const av = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, iv = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Il = [hl, gl, bl, vl, wl, yl, xl, El, Ol, $l, Rl, _l], sv = [...Il, /^[^\n]+(?:  \n|\n{2,})/, To, So];
function lv(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function cv(e) {
  return Wb.test(e) ? "right" : Hb.test(e) ? "center" : Gb.test(e) ? "left" : null;
}
function Ci(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(Ub, "")), a[a.length - 1].push(i));
  }), a;
}
function pv(e, t, r) {
  r._ = !0;
  const n = Ci(e[1], t, r), o = e[2].replace(zb, "").split("|").map(cv), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(u) {
      return Ci(u, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: a, L: n, type: "table" };
}
function Oi(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function bt(e) {
  return function(t, r) {
    return r._ ? e.exec(t) : null;
  };
}
function vt(e) {
  return function(t, r) {
    return r._ || r.u ? e.exec(t) : null;
  };
}
function st(e) {
  return function(t, r) {
    return r._ || r.u ? null : e.exec(t);
  };
}
function wr(e) {
  return function(t) {
    return e.exec(t);
  };
}
function dv(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !Il.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function Yt(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function Ri(e) {
  return e.replace(tv, "$1");
}
function pn(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function uv(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function fv(e, t, r) {
  return r._ = !1, e(t, r);
}
const ao = (e, t, r) => ({ v: pn(t, e[1], r) });
function io() {
  return {};
}
function so() {
  return null;
}
function mv(...e) {
  return e.filter(Boolean).join(" ");
}
function lo(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var ae;
function hv(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || lv, t.namedCodesToUnicode = t.namedCodesToUnicode ? It({}, Ni, t.namedCodesToUnicode) : Ni;
  const r = t.createElement || N.createElement;
  function n(p, h, ...f) {
    const g = lo(t.overrides, `${p}.props`, {});
    return r(function(w, O) {
      const x = lo(O, w);
      return x ? typeof x == "function" || typeof x == "object" && "render" in x ? x : lo(O, `${w}.component`, w) : w;
    }(p, t.overrides), It({}, h, g, { className: mv(h == null ? void 0 : h.className, g.className) || void 0 }), ...f);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = Lb.test(p) === !1);
    const f = m(u(h ? p : `${p.trimEnd().replace(Qb, "")}

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
    return N.createElement(g, { key: "outer" }, w);
  }
  function a(p) {
    const h = p.match(hb);
    return h ? h.reduce(function(f, g, w) {
      const O = g.indexOf("=");
      if (O !== -1) {
        const x = function(S) {
          return S.indexOf("-") !== -1 && S.match(Rb) === null && (S = S.replace(Mb, function(I, R) {
            return R.toUpperCase();
          })), S;
        }(g.slice(0, O)).trim(), E = function(S) {
          const I = S[0];
          return (I === '"' || I === "'") && S.length >= 2 && S[S.length - 1] === I ? S.slice(1, -1) : S;
        }(g.slice(O + 1).trim()), y = ki[x] || x, T = f[y] = function(S, I) {
          return S === "style" ? I.split(/;\s?/).reduce(function(R, _) {
            const k = _.slice(0, _.indexOf(":"));
            return R[k.replace(/(-[a-z])/g, (M) => M[1].toUpperCase())] = _.slice(k.length + 1).trim(), R;
          }, {}) : S === "href" ? Yt(I) : (I.match(Pb) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(x, E);
        typeof T == "string" && (To.test(T) || So.test(T)) && (f[y] = N.cloneElement(o(T.trim()), { key: w }));
      } else
        g !== "style" && (f[ki[g] || g] = !0);
      return f;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: st(hl), i: ae.HIGH, l: (p, h, f) => ({ v: h(p[0].replace(vb, ""), f) }), h: (p, h, f) => n("blockquote", { key: f.k }, h(p.v, f)) }, breakLine: { t: wr(yb), i: ae.HIGH, l: io, h: (p, h, f) => n("br", { key: f.k }) }, breakThematic: { t: st(wb), i: ae.HIGH, l: io, h: (p, h, f) => n("hr", { key: f.k }) }, codeBlock: { t: st(bl), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, f) => n("pre", { key: f.k }, n("code", It({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: st(gl), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: vt(xb), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, h, f) => n("code", { key: f.k }, p.v) }, footnote: { t: st(Nb), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: so }, footnoteReference: { t: bt(Tb), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, f) => n("a", { key: f.k, href: Yt(p.B) }, n("sup", { key: f.k }, p.v)) }, gfmTask: { t: bt(Cb), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, f) => n("input", { checked: p.R, key: f.k, readOnly: !0, type: "checkbox" }) }, heading: { t: st(t.enforceAtxHeadings ? yl : vl), i: ae.HIGH, l: (p, h, f) => ({ v: pn(h, p[2], f), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, f) => n(`h${p.C}`, { id: p.T, key: f.k }, h(p.v, f)) }, headingSetext: { t: st(wl), i: ae.MAX, l: (p, h, f) => ({ v: pn(h, p[1], f), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: wr(xl), i: ae.HIGH, l: () => ({}), h: so }, image: { t: vt(iv), i: ae.HIGH, l: (p) => ({ D: p[1], B: Ri(p[2]), F: p[3] }), h: (p, h, f) => n("img", { key: f.k, alt: p.D || void 0, title: p.F || void 0, src: Yt(p.B) }) }, link: { t: bt(av), i: ae.LOW, l: (p, h, f) => ({ v: uv(h, p[1], f), B: Ri(p[2]), F: p[3] }), h: (p, h, f) => n("a", { key: f.k, href: Yt(p.B), title: p.F }, h(p.v, f)) }, linkAngleBraceStyleDetector: { t: bt(Ib), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : bt($b)(p, h), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: bt(_b), i: ae.MAX, l(p) {
    let h = p[1], f = p[1];
    return gb.test(f) || (f = "mailto:" + f), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: f, type: "link" };
  } }, orderedList: Si(n, 1), unorderedList: Si(n, 2), newlineCoalescer: { t: st(Eb), i: ae.LOW, l: io, h: () => `
` }, paragraph: { t: dv, i: ae.LOW, l: ao, h: (p, h, f) => n("p", { key: f.k }, h(p.v, f)) }, ref: { t: bt(Ab), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: so }, refImage: { t: vt(Db), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, f) => n("img", { key: f.k, alt: p.D, src: Yt(l[p.P].B), title: l[p.P].F }) }, refLink: { t: bt(jb), i: ae.MAX, l: (p, h, f) => ({ v: h(p[1], f), Z: h(p[0].replace(Bb, "\\$1"), f), P: p[2] }), h: (p, h, f) => l[p.P] ? n("a", { key: f.k, href: Yt(l[p.P].B), title: l[p.P].F }, h(p.v, f)) : n("span", { key: f.k }, h(p.Z, f)) }, table: { t: st(El), i: ae.HIGH, l: pv, h: (p, h, f) => n("table", { key: f.k }, n("thead", null, n("tr", null, p.L.map(function(g, w) {
    return n("th", { key: w, style: Oi(p, w) }, h(g, f));
  }))), n("tbody", null, p.A.map(function(g, w) {
    return n("tr", { key: w }, g.map(function(O, x) {
      return n("td", { key: x, style: Oi(p, x) }, h(O, f));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, Vb.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: wr(Zb), i: ae.MIN, l: (p) => ({ v: p[0].replace(Ob, (h, f) => t.namedCodesToUnicode[f] ? t.namedCodesToUnicode[f] : h) }), h: (p) => p.v }, textBolded: { t: vt(Xb), i: ae.MED, l: (p, h, f) => ({ v: h(p[2], f) }), h: (p, h, f) => n("strong", { key: f.k }, h(p.v, f)) }, textEmphasized: { t: vt(Yb), i: ae.LOW, l: (p, h, f) => ({ v: h(p[2], f) }), h: (p, h, f) => n("em", { key: f.k }, h(p.v, f)) }, textEscaped: { t: vt(Jb), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: vt(qb), i: ae.LOW, l: ao, h: (p, h, f) => n("mark", { key: f.k }, h(p.v, f)) }, textStrikethroughed: { t: vt(Kb), i: ae.LOW, l: ao, h: (p, h, f) => n("del", { key: f.k }, h(p.v, f)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: wr(To), i: ae.HIGH, l(p, h, f) {
    const [, g] = p[3].match(ev), w = new RegExp(`^${g}`, "gm"), O = p[3].replace(w, ""), x = (E = O, sv.some((I) => I.test(E)) ? fv : pn);
    var E;
    const y = p[1].toLowerCase(), T = mb.indexOf(y) !== -1;
    f.N = f.N || y === "a";
    const S = T ? p[3] : x(h, O, f);
    return f.N = !1, { O: a(p[2]), v: S, G: T, H: T ? y : p[1] };
  }, h: (p, h, f) => n(p.H, It({ key: f.k }, p.O), p.G ? p.v : h(p.v, f)) }, c.htmlSelfClosing = { t: wr(So), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, h, f) => n(p.H, It({}, p.O, { key: f.k })) });
  const u = function(p) {
    let h = Object.keys(p);
    function f(g, w) {
      let O = [], x = "";
      for (; g; ) {
        let E = 0;
        for (; E < h.length; ) {
          const y = h[E], T = p[y], S = T.t(g, w, x);
          if (S) {
            const I = S[0];
            g = g.substring(I.length);
            const R = T.l(S, f, w);
            R.type == null && (R.type = y), O.push(R), x = I;
            break;
          }
          E++;
        }
      }
      return O;
    }
    return h.sort(function(g, w) {
      let O = p[g].i, x = p[w].i;
      return O !== x ? O - x : g < w ? -1 : 1;
    }), function(g, w) {
      return f(function(O) {
        return O.replace(kb, `
`).replace(Sb, "").replace(Fb, "    ");
      }(g), w);
    };
  }(c), m = (v = function(p) {
    return function(h, f, g) {
      return p[h.type].h(h, f, g);
    };
  }(c), function p(h, f = {}) {
    if (Array.isArray(h)) {
      const g = f.k, w = [];
      let O = !1;
      for (let x = 0; x < h.length; x++) {
        f.k = x;
        const E = p(h[x], f), y = typeof E == "string";
        y && O ? w[w.length - 1] += E : E !== null && w.push(E), O = y;
      }
      return f.k = g, w;
    }
    return v(h, p, f);
  });
  var v;
  const b = o(e);
  return i.length ? n("div", null, b, n("footer", { key: "footer" }, i.map(function(p) {
    return n("div", { id: t.slugify(p.j), key: p.j }, p.j, m(u(p.I, { _: !0 })));
  }))) : b;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const gv = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      a.indexOf(i = u[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, fb);
  return N.cloneElement(hv(t, r), n);
};
function m0({ id: e, markdown: t }) {
  return /* @__PURE__ */ d("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ d(gv, { children: t }) });
}
const bv = wn((e, t) => /* @__PURE__ */ $(
  xe,
  {
    ref: t,
    className: "pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ d(fc, { size: 16, className: "pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ d(
        xn,
        {
          size: 16,
          className: "pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
        }
      )
    ]
  }
));
var vv = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(vv || {});
function h0({ id: e, groups: t }) {
  return /* @__PURE__ */ d("div", { id: e, children: /* @__PURE__ */ $(_o, { children: [
    /* @__PURE__ */ d(Gi, { asChild: !0, children: /* @__PURE__ */ d(bv, {}) }),
    /* @__PURE__ */ d(En, { children: t.map((r) => /* @__PURE__ */ $("div", { children: [
      /* @__PURE__ */ d(Vr, { children: r.label }),
      /* @__PURE__ */ d(ap, { children: r.items.map((n) => /* @__PURE__ */ d("div", { children: n.itemType === 0 ? /* @__PURE__ */ d(Io, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ d(Xi, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ d(kn, {})
    ] }, r.label)) })
  ] }) });
}
function g0({ id: e, message: t }) {
  return /* @__PURE__ */ d("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ d("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ d("p", { className: "pr-text-lg pr-text-gray-800", children: t }) }) });
}
function b0({
  id: e,
  category: t,
  downloads: r,
  languages: n,
  moreInfoUrl: o
}) {
  const a = new xc("en", {
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
          /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: /* @__PURE__ */ d("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: t }) }),
          /* @__PURE__ */ d("span", { className: "pr-text-xs pr-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ $("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ $("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: [
            /* @__PURE__ */ d(mc, { className: "pr-mr-1 pr-h-4 pr-w-4" }),
            /* @__PURE__ */ d("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ d("span", { className: "pr-text-xs pr-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ $("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center", children: n.slice(0, 3).map((l) => /* @__PURE__ */ d(
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
        /* @__PURE__ */ d("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
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
                /* @__PURE__ */ d(hc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
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
                /* @__PURE__ */ d(gc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function yv({ id: e, versionHistory: t }) {
  const [r, n] = ge(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), u = new Date(o.getTime() - c.getTime()), m = u.getUTCFullYear() - 1970, v = u.getUTCMonth(), b = u.getUTCDate() - 1;
    let p = "";
    return m > 0 ? p = `${m.toString()} year${m === 1 ? "" : "s"} ago` : v > 0 ? p = `${v.toString()} month${v === 1 ? "" : "s"} ago` : b === 0 ? p = "today" : p = `${b.toString()} day${b === 1 ? "" : "s"} ago`, p;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ $("div", { id: e, children: [
    /* @__PURE__ */ d("h3", { className: "pr-text-md pr-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ d("ul", { className: "pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600", children: (r ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ $("div", { className: "pr-mt-3 pr-flex pr-justify-between", children: [
      /* @__PURE__ */ d("div", { className: "pr-text-gray-600", children: /* @__PURE__ */ d("li", { className: "pr-prose pr-text-xs", children: /* @__PURE__ */ d("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ $("div", { className: "pr-justify-end pr-text-right", children: [
        /* @__PURE__ */ $("div", { children: [
          "Version ",
          l[0]
        ] }),
        /* @__PURE__ */ d("div", { children: a(l[1].date) })
      ] })
    ] }, l[0])) }),
    i.length > 5 && /* @__PURE__ */ d(
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
function v0({
  id: e,
  publisherDisplayName: t,
  fileSize: r,
  locales: n,
  versionHistory: o
}) {
  const a = ct(() => Ec(r), [r]), l = ((c) => {
    const u = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((m) => u.of(m));
  })(n);
  return /* @__PURE__ */ d("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ $("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ d(yv, { versionHistory: o }),
    /* @__PURE__ */ d("div", { className: "pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300" }),
    /* @__PURE__ */ $("div", { className: "pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3", children: [
      /* @__PURE__ */ d("h2", { className: "pr-text-md pr-font-semibold", children: "Information" }),
      /* @__PURE__ */ $("div", { className: "pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600", children: [
        /* @__PURE__ */ $("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ d("span", { className: "pr-mb-2", children: "Publisher" }),
          /* @__PURE__ */ d("span", { className: "pr-font-semibold", children: t }),
          /* @__PURE__ */ d("span", { className: "pr-mb-2 pr-mt-4", children: "Size" }),
          /* @__PURE__ */ d("span", { className: "pr-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ d("div", { className: "pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600", children: /* @__PURE__ */ $("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ d("span", { className: "pr-mb-2", children: "Languages" }),
          /* @__PURE__ */ d("span", { className: "pr-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const y0 = (e, t) => {
  Qe(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, co = () => !1, w0 = (e, t) => {
  const [r] = No(
    Ce(async () => {
      if (!e)
        return co;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    co,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Qe(() => () => {
    r !== co && r();
  }, [r]);
};
function wv(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
wv(`/*
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
  Qg as Alert,
  tb as AlertDescription,
  eb as AlertTitle,
  Vv as BookChapterControl,
  xe as Button,
  rb as Card,
  ib as CardContent,
  ab as CardDescription,
  sb as CardFooter,
  nb as CardHeader,
  ob as CardTitle,
  Yv as ChapterRangeSelector,
  zp as Checkbox,
  qv as Checklist,
  Ca as ComboBox,
  Kv as ContextMenu,
  Cp as DataTable,
  u0 as DisableButton,
  _o as DropdownMenu,
  Io as DropdownMenuCheckboxItem,
  En as DropdownMenuContent,
  ap as DropdownMenuGroup,
  Wi as DropdownMenuItem,
  vv as DropdownMenuItemType,
  Vr as DropdownMenuLabel,
  Bv as DropdownMenuPortal,
  Fv as DropdownMenuRadioGroup,
  Xi as DropdownMenuRadioItem,
  kn as DropdownMenuSeparator,
  lp as DropdownMenuShortcut,
  Lv as DropdownMenuSub,
  sp as DropdownMenuSubContent,
  ip as DropdownMenuSubTrigger,
  Gi as DropdownMenuTrigger,
  d0 as EnableButton,
  bv as FilterButton,
  h0 as FilterDropdown,
  v0 as Footer,
  qh as GridMenu,
  zg as HamburgerMenuButton,
  zv as INVENTORY_STRING_KEYS,
  Jv as IconButton,
  Fr as Input,
  p0 as InstallButton,
  Uv as Inventory,
  dn as Label,
  qt as LabelPosition,
  m0 as MarkdownRenderer,
  Js as MenuItem,
  b0 as MoreInfo,
  t0 as NavigationContentSearch,
  g0 as NoExtensionsFound,
  Zv as ScriptureResultsViewer,
  Xv as ScrollGroupSelector,
  Kg as SearchBar,
  _r as Select,
  Qt as SelectContent,
  xp as SelectGroup,
  Ke as SelectItem,
  Ep as SelectLabel,
  qi as SelectScrollDownButton,
  Yi as SelectScrollUpButton,
  kp as SelectSeparator,
  Zt as SelectTrigger,
  Ir as SelectValue,
  ml as Separator,
  r0 as SettingsList,
  o0 as SettingsListHeader,
  n0 as SettingsListItem,
  lb as ShadCnSlider,
  cb as ShadCnSwitch,
  Qv as Slider,
  e0 as Snackbar,
  l0 as Sonner,
  qr as Spinner,
  a0 as Switch,
  Nn as Table,
  Sn as TableBody,
  Sp as TableCaption,
  er as TableCell,
  Tp as TableFooter,
  Mr as TableHead,
  Tn as TableHeader,
  xt as TableRow,
  c0 as Tabs,
  ub as TabsContent,
  pb as TabsList,
  db as TabsTrigger,
  i0 as TextField,
  s0 as Toolbar,
  f0 as UpdateButton,
  yv as VersionHistory,
  dl as VerticalTabs,
  fl as VerticalTabsContent,
  ul as VerticalTabsList,
  Jg as VerticalTabsTrigger,
  yp as buttonVariants,
  Mo as getSortingIcon,
  Gv as inventoryCountColumn,
  Hv as inventoryItemColumn,
  Wv as inventoryStatusColumn,
  k0 as sonner,
  y0 as useEvent,
  w0 as useEventAsync,
  No as usePromise
};
//# sourceMappingURL=index.js.map
