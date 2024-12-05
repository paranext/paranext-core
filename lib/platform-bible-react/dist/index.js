import Ds, { jsx as s, jsxs as x, Fragment as it } from "react/jsx-runtime";
import * as M from "react";
import A, { forwardRef as Zn, useCallback as $e, useState as ue, useRef as gt, useEffect as at, useLayoutEffect as Jo, useMemo as Te } from "react";
import { History as Ms, ChevronRight as Wa, Check as xn, Circle as qa, ArrowDownWideNarrow as Bs, Clock as js, Bookmark as Vs, X as Ka, Search as Ja, ChevronsUpDown as Za, FilterIcon as Ls, ChevronDown as Qn, ChevronUp as zs, ArrowLeftIcon as Fs, ChevronLeftIcon as Us, ChevronRightIcon as Gs, ArrowRightIcon as Hs, CircleCheckIcon as Xs, CircleXIcon as Ys, CircleHelpIcon as Ws, ArrowUpIcon as qs, ArrowDownIcon as Ks, ArrowUpDownIcon as Js, Star as Zs, ChevronLeft as Qs, LoaderCircle as el, Download as tl, Filter as nl, User as rl, Link as ol, CircleHelp as al } from "lucide-react";
import bt, { clsx as il } from "clsx";
import { extendTailwindMerge as sl } from "tailwind-merge";
import * as we from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as ll } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as cl, deepEqual as to, substring as dl, formatScrRef as Tr, compareScrRefs as zr, scrRefToBBBCCCVVV as Cr, getLocalizeKeyForScrollGroupId as pe, NumberFormat as pl, formatBytes as ul } from "platform-bible-utils";
import { Slot as wl } from "@radix-ui/react-slot";
import { cva as Nn } from "class-variance-authority";
import * as Qa from "@radix-ui/react-label";
import * as un from "@radix-ui/react-radio-group";
import * as wn from "@radix-ui/react-popover";
import { Command as Oe } from "cmdk";
import * as Ye from "@radix-ui/react-dialog";
import { useReactTable as ei, getCoreRowModel as ti, getPaginationRowModel as fl, getSortedRowModel as ni, getFilteredRowModel as ml, flexRender as sn, getExpandedRowModel as hl, getGroupedRowModel as gl } from "@tanstack/react-table";
import * as be from "@radix-ui/react-select";
import * as Fr from "@radix-ui/react-checkbox";
import * as er from "@radix-ui/react-toggle-group";
import * as ri from "@radix-ui/react-toggle";
import * as Re from "@radix-ui/react-tabs";
import * as oi from "@radix-ui/react-separator";
import bl, { ThemeContext as vl, internal_processStyles as yl } from "@mui/styled-engine";
import { MenuItem as xl, ListItemText as Nl, ListItemIcon as ai, Menu as kl, Grid as ii, List as El, IconButton as si, Drawer as Tl, AppBar as Cl, Toolbar as Sl } from "@mui/material";
import * as Ol from "react-dom";
import Mn from "react-dom";
import { Toaster as Rl } from "sonner";
import { toast as ah } from "sonner";
import * as nn from "@radix-ui/react-slider";
import * as Ur from "@radix-ui/react-switch";
import Pl from "markdown-to-jsx";
const _l = sl({ prefix: "tw-" });
function T(...e) {
  return _l(il(e));
}
const kn = A.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ s(
    "input",
    {
      type: t,
      className: T(
        "pr-twp tw-flex tw-h-10 tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium file:tw-text-foreground placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
kn.displayName = "Input";
const $l = Zn(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ x("div", { className: "tw-relative", children: [
    /* @__PURE__ */ s(
      kn,
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
    /* @__PURE__ */ s(
      Ms,
      {
        className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Il = Object.defineProperty, Al = (e, t, n) => t in e ? Il(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, te = (e, t, n) => Al(e, typeof t != "symbol" ? t + "" : t, n);
const yt = [
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
], no = [
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
], li = [
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
], Zo = Gl();
function Ht(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Zo ? Zo[e] : 0;
}
function ro(e) {
  return Ht(e) > 0;
}
function Dl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return t >= 40 && t <= 66;
}
function Ml(e) {
  return (typeof e == "string" ? Ht(e) : e) <= 39;
}
function ci(e) {
  return e <= 66;
}
function Bl(e) {
  const t = typeof e == "string" ? Ht(e) : e;
  return ui(t) && !ci(t);
}
function* jl() {
  for (let e = 1; e <= yt.length; e++)
    yield e;
}
const Vl = 1, di = yt.length;
function Ll() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function oo(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= yt.length ? t : yt[n];
}
function pi(e) {
  return e <= 0 || e > di ? "******" : li[e - 1];
}
function zl(e) {
  return pi(Ht(e));
}
function ui(e) {
  const t = typeof e == "number" ? oo(e) : e;
  return ro(t) && !no.includes(t);
}
function Fl(e) {
  const t = typeof e == "number" ? oo(e) : e;
  return ro(t) && no.includes(t);
}
function Ul(e) {
  return li[e - 1].includes("*obsolete*");
}
function Gl() {
  const e = {};
  for (let t = 0; t < yt.length; t++)
    e[yt[t]] = t + 1;
  return e;
}
const oe = {
  allBookIds: yt,
  nonCanonicalIds: no,
  bookIdToNumber: Ht,
  isBookIdValid: ro,
  isBookNT: Dl,
  isBookOT: Ml,
  isBookOTNT: ci,
  isBookDC: Bl,
  allBookNumbers: jl,
  firstBook: Vl,
  lastBook: di,
  extraBooks: Ll,
  bookNumberToId: oo,
  bookNumberToEnglishName: pi,
  bookIdToEnglishName: zl,
  isCanonical: ui,
  isExtraMaterial: Fl,
  isObsolete: Ul
};
var Ge = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Ge || {});
const _e = class {
  // private versInfo: Versification;
  constructor(t) {
    if (te(this, "name"), te(this, "fullPath"), te(this, "isPresent"), te(this, "hasVerseSegments"), te(this, "isCustomized"), te(this, "baseVersification"), te(this, "scriptureBooks"), te(this, "_type"), t == null)
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
te(_e, "Original", new _e(Ge.Original)), te(_e, "Septuagint", new _e(Ge.Septuagint)), te(_e, "Vulgate", new _e(Ge.Vulgate)), te(_e, "English", new _e(Ge.English)), te(_e, "RussianProtestant", new _e(Ge.RussianProtestant)), te(_e, "RussianOrthodox", new _e(Ge.RussianOrthodox));
let ut = _e;
function Qo(e, t) {
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var wi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(wi || {});
const Ee = class ne {
  constructor(t, n, r, o) {
    if (te(this, "firstChapter"), te(this, "lastChapter"), te(this, "lastVerse"), te(this, "hasSegmentsDefined"), te(this, "text"), te(this, "BBBCCCVVVS"), te(this, "longHashCode"), te(this, "versification"), te(this, "rtlMark", "‏"), te(this, "_bookNum", 0), te(this, "_chapterNum", 0), te(this, "_verseNum", 0), te(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = n != null && n instanceof ut ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = n != null && n instanceof ut ? n : void 0;
        this.setEmpty(a), this._verseNum = t % ne.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ne.bookDigitShifter / ne.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ne.bookDigitShifter);
      } else if (n == null)
        if (t != null && t instanceof ne) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof ut ? t : ne.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ne.defaultVersification;
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
      return n = new ne(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof Jt)
        return n = new ne(), { success: !1, verseRef: n };
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
    return t % ne.bcvMaxValue * ne.bookDigitShifter + (n >= 0 ? n % ne.bcvMaxValue * ne.chapterDigitShifter : 0) + (r >= 0 ? r % ne.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = t, l = a || o.toString();
    let c;
    return i && (c = new ut(i)), n ? new ne(n, r.toString(), l, c) : new ne();
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
      if (n = n * 10 + +r - 0, n > ne.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ne.verseRangeSeparator) || this._verse.includes(ne.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return oe.bookNumberToId(this.bookNum, "");
  }
  set book(t) {
    this.bookNum = oe.bookIdToNumber(t);
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
    const { success: n, vNum: r } = ne.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ne.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > oe.lastBook)
      throw new Jt(
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
    this.versification = this.versification != null ? new ut(t) : void 0;
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
    return this.validateVerse(ne.verseRangeSeparators, ne.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ne.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ne.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new ut(Ge[i]);
        } catch {
          throw new Jt("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new Jt("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || oe.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ne.isVerseParseable(r[1]))
      throw new Jt("Invalid reference : " + t);
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
    return new ne(this);
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
    return t instanceof ne ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, n = ne.verseRangeSeparators, r = ne.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = Qo(this._verse, r);
    for (const i of a.map((l) => Qo(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !t)
          for (let p = c + 1; p < d.verseNum; p++) {
            const h = new ne(
              this._bookNum,
              this._chapterNum,
              p,
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > oe.lastBook ? 2 : (oe.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ne.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = oe.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
te(Ee, "defaultVersification", ut.English), te(Ee, "verseRangeSeparator", "-"), te(Ee, "verseSequenceIndicator", ","), te(Ee, "verseRangeSeparators", [Ee.verseRangeSeparator]), te(Ee, "verseSequenceIndicators", [Ee.verseSequenceIndicator]), te(Ee, "chapterDigitShifter", 1e3), te(Ee, "bookDigitShifter", Ee.chapterDigitShifter * Ee.chapterDigitShifter), te(Ee, "bcvMaxValue", Ee.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
te(Ee, "ValidStatusType", wi);
class Jt extends Error {
}
const ao = we.Root, fi = we.Trigger, Hl = we.Group, xm = we.Portal, Nm = we.Sub, km = we.RadioGroup, Xl = A.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ x(
  we.SubTrigger,
  {
    ref: o,
    className: T(
      "tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none focus:tw-bg-accent data-[state=open]:tw-bg-accent",
      t && "tw-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ s(Wa, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
Xl.displayName = we.SubTrigger.displayName;
const Yl = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  we.SubContent,
  {
    ref: n,
    className: T(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Yl.displayName = we.SubContent.displayName;
const tr = A.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ s(we.Portal, { children: /* @__PURE__ */ s(
  we.Content,
  {
    ref: r,
    sideOffset: t,
    className: T(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
tr.displayName = we.Content.displayName;
const mi = A.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ s(
  we.Item,
  {
    ref: r,
    className: T(
      // removed: tw-relative tw-flex focus:tw-text-accent-foreground
      "tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t && "tw-pl-8",
      e
    ),
    ...n
  }
));
mi.displayName = we.Item.displayName;
const io = A.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ x(
  we.CheckboxItem,
  {
    ref: o,
    className: T(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(we.ItemIndicator, { children: /* @__PURE__ */ s(xn, { className: "tw-h-4 tw-w-4" }) }) }),
      t
    ]
  }
));
io.displayName = we.CheckboxItem.displayName;
const hi = A.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(
  we.RadioItem,
  {
    ref: r,
    className: T(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(we.ItemIndicator, { children: /* @__PURE__ */ s(qa, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      t
    ]
  }
));
hi.displayName = we.RadioItem.displayName;
const En = A.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ s(
  we.Label,
  {
    ref: r,
    className: T("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", t && "tw-pl-8", e),
    ...n
  }
));
En.displayName = we.Label.displayName;
const nr = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  we.Separator,
  {
    ref: n,
    className: T("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
nr.displayName = we.Separator.displayName;
function Wl({ className: e, ...t }) {
  return /* @__PURE__ */ s(
    "span",
    {
      className: T("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", e),
      ...t
    }
  );
}
Wl.displayName = "DropdownMenuShortcut";
const ql = Zn(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ x(
    mi,
    {
      ref: l,
      textValue: e,
      className: T("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
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
        /* @__PURE__ */ s(
          "span",
          {
            className: T(
              "tw-border-b-0 tw-border-l-2 tw-border-r-0 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-l-red-200": a.toLowerCase() === "ot",
                "tw-border-l-purple-200": a.toLowerCase() === "nt",
                "tw-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: oe.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ s("div", { children: i })
      ]
    },
    e
  )
);
function Kl({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), i = $e(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ s("div", { className: T("tw-flex tw-flex-wrap tw-items-start tw-justify-start tw-self-stretch"), children: a.map((l) => /* @__PURE__ */ s(
    "div",
    {
      className: T(
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
      onMouseMove: () => i(l),
      children: l
    },
    l
  )) });
}
function Jl({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ x(En, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ s("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ s(
        Bs,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ s(
        js,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ s(
        Vs,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const ln = oe.allBookIds, Zl = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ea = ["OT", "NT", "DC"], Ql = 32 + 32 + 32, ec = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], tc = (e) => ({
  OT: ln.filter((n) => oe.isBookOT(n)),
  NT: ln.filter((n) => oe.isBookNT(n)),
  DC: ln.filter((n) => oe.isBookDC(n))
})[e], Zt = (e) => cl(oe.bookIdToNumber(e));
function nc() {
  return ln.map((t) => oe.bookIdToEnglishName(t));
}
function rc(e) {
  return nc().includes(e);
}
function oc(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (rc(t))
    return ln.find((r) => oe.bookIdToEnglishName(r) === t);
}
function Em({ scrRef: e, handleSubmit: t }) {
  const [n, r] = ue(""), [o, a] = ue(
    oe.bookNumberToId(e.bookNum)
  ), [i, l] = ue(e.chapterNum ?? 0), [c, d] = ue(
    oe.bookNumberToId(e.bookNum)
  ), [p, h] = ue(!1), [w, b] = ue(p), v = gt(void 0), f = gt(void 0), m = gt(void 0), N = $e(
    (k) => tc(k).filter((B) => {
      const D = oe.bookIdToEnglishName(B).toLowerCase(), J = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return D.includes(J) || // Match book name
      B.toLowerCase().includes(J);
    }),
    [n]
  ), I = (k) => {
    r(k);
  }, O = gt(!1), E = $e((k) => {
    if (O.current) {
      O.current = !1;
      return;
    }
    h(k);
  }, []), g = $e(
    (k, B, D, J) => {
      if (l(
        oe.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), B || Zt(k) === -1) {
        t({
          bookNum: oe.bookIdToNumber(k),
          chapterNum: D || 1,
          verseNum: J || 1
        }), h(!1), r("");
        return;
      }
      a(o !== k ? k : ""), h(!B);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), _ = (k) => {
    k <= 0 || k > Zt(o) || g(o, !0, k);
  }, L = $e(() => {
    ec.forEach((k) => {
      const B = n.match(k);
      if (B) {
        const [D, J = void 0, q = void 0] = B.slice(1), U = oc(D);
        (oe.isBookIdValid(D) || U) && g(
          U ?? D,
          !0,
          J ? parseInt(J, 10) : 1,
          q ? parseInt(q, 10) : 1
        );
      }
    });
  }, [g, n]), H = $e(
    (k) => {
      p ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof m < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      m.current !== null ? m.current.focus() : typeof f < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      f.current !== null && f.current.focus(), k.preventDefault()) : h(!0);
    },
    [p]
  ), C = (k) => {
    const { key: B } = k;
    B === "ArrowRight" || B === "ArrowLeft" || B === "ArrowDown" || B === "ArrowUp" || B === "Enter" || (v.current.dispatchEvent(new KeyboardEvent("keydown", { key: B })), v.current.focus());
  }, P = (k) => {
    const { key: B } = k;
    if (c === o) {
      if (B === "Enter") {
        k.preventDefault(), g(o, !0, i);
        return;
      }
      let D = 0;
      if (B === "ArrowRight")
        if (i < Zt(c))
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
      i + D <= 0 || i + D > Zt(c) ? l(0) : D !== 0 && (l(i + D), k.preventDefault());
    }
  };
  return at(() => {
    o === c ? o === oe.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), Jo(() => {
    b(p);
  }, [p]), Jo(() => {
    const k = setTimeout(() => {
      if (w && f.current && m.current) {
        const D = m.current.offsetTop - Ql;
        f.current.scrollTo({ top: D, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [w]), /* @__PURE__ */ s("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ x(ao, { modal: !1, open: p, onOpenChange: E, children: [
    /* @__PURE__ */ s(fi, { asChild: !0, children: /* @__PURE__ */ s(
      $l,
      {
        ref: v,
        value: n,
        handleSearch: I,
        handleKeyDown: H,
        handleOnClick: () => {
          a(oe.bookNumberToId(e.bookNum)), d(oe.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), h(!0), v.current.focus();
        },
        onFocus: () => {
          O.current = !0;
        },
        handleSubmit: L,
        placeholder: `${oe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ x(
      tr,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: C,
        align: "start",
        ref: f,
        children: [
          /* @__PURE__ */ s(
            Jl,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ea.map(
            (k, B) => N(k).length > 0 && /* @__PURE__ */ x("div", { children: [
              /* @__PURE__ */ s(En, { className: "tw-font-semibold tw-text-foreground/80", children: Zl[k] }),
              N(k).map((D) => /* @__PURE__ */ s("div", { children: /* @__PURE__ */ s(
                ql,
                {
                  bookId: D,
                  handleSelectBook: () => g(D, !1),
                  isSelected: o === D,
                  handleHighlightBook: () => d(D),
                  handleKeyDown: P,
                  bookType: k,
                  ref: (J) => {
                    o === D && (m.current = J);
                  },
                  children: /* @__PURE__ */ s(
                    Kl,
                    {
                      handleSelectChapter: _,
                      endChapter: Zt(D),
                      activeChapter: e.bookNum === oe.bookIdToNumber(D) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (J) => {
                        l(J);
                      }
                    }
                  )
                }
              ) }, D)),
              ea.length - 1 !== B ? /* @__PURE__ */ s(nr, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const ac = Nn(
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
), me = A.forwardRef(
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ s(r ? wl : "button", { className: T(ac({ variant: t, size: n, className: e })), ref: a, ...o })
);
me.displayName = "Button";
const ic = Nn(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), He = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(Qa.Root, { ref: n, className: T("pr-twp", ic(), e), ...t }));
He.displayName = Qa.Root.displayName;
const gi = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  un.Root,
  {
    className: T("pr-twp tw-grid tw-gap-2", e),
    ...t,
    ref: n
  }
));
gi.displayName = un.Root.displayName;
const Gr = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  un.Item,
  {
    ref: n,
    className: T(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      e
    ),
    ...t,
    children: /* @__PURE__ */ s(un.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s(qa, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
Gr.displayName = un.Item.displayName;
const bi = wn.Root, vi = wn.Trigger, so = A.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ s(wn.Portal, { children: /* @__PURE__ */ s(
  wn.Content,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: T(
      "pr-twp tw-z-50 tw-w-72 tw-rounded-md tw-border tw-bg-popover tw-p-4 tw-text-popover-foreground tw-shadow-md tw-outline-none data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
so.displayName = wn.Content.displayName;
const sc = Ye.Portal, yi = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Ye.Overlay,
  {
    ref: n,
    className: T(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      e
    ),
    ...t
  }
));
yi.displayName = Ye.Overlay.displayName;
const lc = A.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(sc, { children: [
  /* @__PURE__ */ s(yi, {}),
  /* @__PURE__ */ x(
    Ye.Content,
    {
      ref: r,
      className: T(
        "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ x(Ye.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ s(Ka, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
lc.displayName = Ye.Content.displayName;
const cc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Ye.Title,
  {
    ref: n,
    className: T("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", e),
    ...t
  }
));
cc.displayName = Ye.Title.displayName;
const dc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Ye.Description,
  {
    ref: n,
    className: T("tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
dc.displayName = Ye.Description.displayName;
const lo = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Oe,
  {
    ref: n,
    className: T(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      e
    ),
    ...t
  }
));
lo.displayName = Oe.displayName;
const co = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ s(Ja, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ s(
    Oe.Input,
    {
      ref: n,
      className: T(
        "tw-flex tw-h-11 tw-w-full tw-rounded-md tw-bg-transparent tw-py-3 tw-text-sm tw-outline-none placeholder:tw-text-muted-foreground disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
co.displayName = Oe.Input.displayName;
const po = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Oe.List,
  {
    ref: n,
    className: T("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", e),
    ...t
  }
));
po.displayName = Oe.List.displayName;
const uo = A.forwardRef((e, t) => /* @__PURE__ */ s(Oe.Empty, { ref: t, className: "tw-py-6 tw-text-center tw-text-sm", ...e }));
uo.displayName = Oe.Empty.displayName;
const xi = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Oe.Group,
  {
    ref: n,
    className: T(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
xi.displayName = Oe.Group.displayName;
const pc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Oe.Separator,
  {
    ref: n,
    className: T("tw--mx-1 tw-h-px tw-bg-border", e),
    ...t
  }
));
pc.displayName = Oe.Separator.displayName;
const wo = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Oe.Item,
  {
    ref: n,
    className: T(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      e
    ),
    ...t
  }
));
wo.displayName = Oe.Item.displayName;
function uc(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function ta({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: a = uc,
  icon: i = void 0,
  buttonPlaceholder: l = "",
  textPlaceholder: c = "",
  commandEmptyMessage: d = "No option found",
  buttonVariant: p = "outline",
  alignDropDown: h = "start",
  dir: w = "ltr",
  isDisabled: b = !1,
  ...v
}) {
  const [f, m] = ue(!1);
  return /* @__PURE__ */ x(bi, { open: f, onOpenChange: m, ...v, children: [
    /* @__PURE__ */ s(vi, { asChild: !0, children: /* @__PURE__ */ x(
      me,
      {
        variant: p,
        role: "combobox",
        "aria-expanded": f,
        id: e,
        className: T(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          n
        ),
        disabled: b,
        children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            i && /* @__PURE__ */ s("div", { className: "tw-pr-2", children: i }),
            /* @__PURE__ */ s("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: r ? a(r) : l })
          ] }),
          /* @__PURE__ */ s(Za, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(so, { align: h, className: "tw-w-[200px] tw-p-0", dir: w, children: /* @__PURE__ */ x(lo, { children: [
      /* @__PURE__ */ s(co, { dir: w, placeholder: c, className: "tw-text-inherit" }),
      /* @__PURE__ */ s(uo, { children: d }),
      /* @__PURE__ */ s(po, { children: t.map((N) => /* @__PURE__ */ x(
        wo,
        {
          value: a(N),
          onSelect: () => {
            o(N), m(!1);
          },
          children: [
            /* @__PURE__ */ s(
              xn,
              {
                className: T("tw-me-2 tw-h-4 tw-w-4", {
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
function wc({
  startChapter: e,
  endChapter: t,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a
}) {
  const i = Te(
    () => Array.from({ length: a }, (d, p) => p + 1),
    [a]
  );
  return /* @__PURE__ */ x(it, { children: [
    /* @__PURE__ */ s(He, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ s(
      ta,
      {
        isDisabled: o,
        onChange: (d) => {
          n(d), d > t && r(d);
        },
        className: "tw-ml-2 tw-mr-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: e
      },
      "start chapter"
    ),
    /* @__PURE__ */ s(He, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ s(
      ta,
      {
        isDisabled: o,
        onChange: (d) => {
          r(d), d < e && n(d);
        },
        className: "tw-ml-2 tw-w-20",
        options: i,
        getOptionLabel: (d) => d.toString(),
        value: t
      },
      "end chapter"
    )
  ] });
}
var fc = /* @__PURE__ */ ((e) => (e.CURRENT_BOOK = "current book", e.CHOOSE_BOOKS = "choose books", e))(fc || {});
const Tm = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Sr = (e, t) => e[t] ?? t;
function Cm({
  handleBookSelectionModeChange: e,
  currentBookName: t,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: i,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d
}) {
  const p = Sr(d, "%webView_bookSelector_currentBook%"), h = Sr(d, "%webView_bookSelector_choose%"), w = Sr(d, "%webView_bookSelector_chooseBooks%"), [b, v] = ue(
    "current book"
    /* CURRENT_BOOK */
  ), f = (m) => {
    v(m), e(m);
  };
  return /* @__PURE__ */ s(
    gi,
    {
      className: "pr-twp tw-flex",
      value: b,
      onValueChange: (m) => f(m),
      children: /* @__PURE__ */ x("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Gr, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ s(He, { className: "tw-ml-1", children: p })
          ] }),
          /* @__PURE__ */ s(He, { className: "tw-flex tw-items-center", children: t }),
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ s(
            wc,
            {
              isDisabled: b === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: i,
              chapterCount: o,
              startChapter: l,
              endChapter: a
            }
          ) })
        ] }),
        /* @__PURE__ */ x("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ s(Gr, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ s(He, { className: "tw-ml-1", children: w })
          ] }),
          /* @__PURE__ */ s(He, { className: "tw-flex tw-items-center", children: r.map((m) => oe.bookIdToEnglishName(m)).join(", ") }),
          /* @__PURE__ */ s(
            me,
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
function mc({ table: e }) {
  return /* @__PURE__ */ x(ao, { children: [
    /* @__PURE__ */ s(ll, { asChild: !0, children: /* @__PURE__ */ x(me, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ s(Ls, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ x(tr, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ s(En, { children: "Toggle columns" }),
      /* @__PURE__ */ s(nr, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ s(
        io,
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
const fn = be.Root, hc = be.Group, mn = be.Value, Mt = A.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(
  be.Trigger,
  {
    ref: r,
    className: T(
      "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ s(be.Icon, { asChild: !0, children: /* @__PURE__ */ s(Qn, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
Mt.displayName = be.Trigger.displayName;
const Ni = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  be.ScrollUpButton,
  {
    ref: n,
    className: T("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ s(zs, { className: "tw-h-4 tw-w-4" })
  }
));
Ni.displayName = be.ScrollUpButton.displayName;
const ki = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  be.ScrollDownButton,
  {
    ref: n,
    className: T("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", e),
    ...t,
    children: /* @__PURE__ */ s(Qn, { className: "tw-h-4 tw-w-4" })
  }
));
ki.displayName = be.ScrollDownButton.displayName;
const Bt = A.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ s(be.Portal, { children: /* @__PURE__ */ x(
  be.Content,
  {
    ref: o,
    className: T(
      "pr-twp tw-relative tw-z-50 tw-max-h-96 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-text-popover-foreground tw-shadow-md data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:tw-translate-y-1 data-[side=left]:tw--translate-x-1 data-[side=right]:tw-translate-x-1 data-[side=top]:tw--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ s(Ni, {}),
      /* @__PURE__ */ s(
        be.Viewport,
        {
          className: T(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ s(ki, {})
    ]
  }
) }));
Bt.displayName = be.Content.displayName;
const gc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  be.Label,
  {
    ref: n,
    className: T("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", e),
    ...t
  }
));
gc.displayName = be.Label.displayName;
const Ue = A.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ x(
  be.Item,
  {
    ref: r,
    className: T(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ s("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ s(be.ItemIndicator, { children: /* @__PURE__ */ s(xn, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ s(be.ItemText, { children: t })
    ]
  }
));
Ue.displayName = be.Item.displayName;
const bc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  be.Separator,
  {
    ref: n,
    className: T("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", e),
    ...t
  }
));
bc.displayName = be.Separator.displayName;
function vc({ table: e }) {
  return /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ s("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ x(
        fn,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ s(Mt, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ s(mn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ s(Bt, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ s(Ue, { value: `${t}`, children: t }, t)) })
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
        me,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ s(Fs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        me,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ s(Us, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        me,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ s(Gs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ x(
        me,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ s(Hs, { className: "tw-h-4 tw-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const rr = A.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ s("div", { className: T("pr-twp tw-relative tw-w-full", { "tw-overflow-auto": !t }), children: /* @__PURE__ */ s(
  "table",
  {
    ref: r,
    className: T("tw-w-full tw-caption-bottom tw-text-sm", e),
    ...n
  }
) }));
rr.displayName = "Table";
const or = A.forwardRef(({ className: e, stickyHeader: t, ...n }, r) => /* @__PURE__ */ s(
  "thead",
  {
    ref: r,
    className: T(
      { "tw-sticky tw-top-[-1px] tw-bg-background tw-drop-shadow-sm": t },
      "[&_tr]:tw-border-b",
      e
    ),
    ...n
  }
));
or.displayName = "TableHeader";
const ar = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s("tbody", { ref: n, className: T("[&_tr:last-child]:tw-border-0", e), ...t }));
ar.displayName = "TableBody";
const yc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  "tfoot",
  {
    ref: n,
    className: T("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", e),
    ...t
  }
));
yc.displayName = "TableFooter";
const ot = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ s(
    "tr",
    {
      ref: n,
      className: T(
        "tw-border-b tw-transition-colors hover:tw-bg-muted/50 data-[state=selected]:tw-bg-muted",
        e
      ),
      ...t
    }
  )
);
ot.displayName = "TableRow";
const hn = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  "th",
  {
    ref: n,
    className: T(
      "tw-h-12 tw-px-4 tw-text-start tw-align-middle tw-font-medium tw-text-muted-foreground [&:has([role=checkbox])]:tw-pe-0",
      e
    ),
    ...t
  }
));
hn.displayName = "TableHead";
const jt = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  "td",
  {
    ref: n,
    className: T("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", e),
    ...t
  }
));
jt.displayName = "TableCell";
const xc = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  "caption",
  {
    ref: n,
    className: T("tw-mt-4 tw-text-sm tw-text-muted-foreground", e),
    ...t
  }
));
xc.displayName = "TableCaption";
function Nc({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var m;
  const [l, c] = ue([]), [d, p] = ue([]), [h, w] = ue({}), [b, v] = ue({}), f = ei({
    data: t,
    columns: e,
    getCoreRowModel: ti(),
    ...n && { getPaginationRowModel: fl() },
    onSortingChange: c,
    getSortedRowModel: ni(),
    onColumnFiltersChange: p,
    getFilteredRowModel: ml(),
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
    o && /* @__PURE__ */ s(mc, { table: f }),
    /* @__PURE__ */ x(rr, { stickyHeader: a, children: [
      /* @__PURE__ */ s(or, { stickyHeader: a, children: f.getHeaderGroups().map((N) => /* @__PURE__ */ s(ot, { children: N.headers.map((I) => /* @__PURE__ */ s(hn, { children: I.isPlaceholder ? void 0 : sn(I.column.columnDef.header, I.getContext()) }, I.id)) }, N.id)) }),
      /* @__PURE__ */ s(ar, { children: (m = f.getRowModel().rows) != null && m.length ? f.getRowModel().rows.map((N) => /* @__PURE__ */ s(
        ot,
        {
          onClick: () => i(N, f),
          "data-state": N.getIsSelected() && "selected",
          children: N.getVisibleCells().map((I) => /* @__PURE__ */ s(jt, { children: sn(I.column.columnDef.cell, I.getContext()) }, I.id))
        },
        N.id
      )) : /* @__PURE__ */ s(ot, { children: /* @__PURE__ */ s(jt, { colSpan: e.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ s(
        me,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.previousPage(),
          disabled: !f.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ s(
        me,
        {
          variant: "outline",
          size: "sm",
          onClick: () => f.nextPage(),
          disabled: !f.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ s(vc, { table: f })
  ] });
}
function kc({
  occurrenceData: e,
  setScriptureReference: t,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Te(() => {
    const i = [];
    return e.forEach((l) => {
      i.some((c) => to(c, l)) || i.push(l);
    }), i;
  }, [e]);
  return /* @__PURE__ */ x(rr, { stickyHeader: !0, children: [
    /* @__PURE__ */ s(or, { stickyHeader: !0, children: /* @__PURE__ */ x(ot, { children: [
      /* @__PURE__ */ s(hn, { children: r }),
      /* @__PURE__ */ s(hn, { children: o })
    ] }) }),
    /* @__PURE__ */ s(ar, { children: a.length > 0 && a.map((i) => /* @__PURE__ */ x(
      ot,
      {
        onClick: () => {
          t(i.reference);
        },
        children: [
          /* @__PURE__ */ s(jt, { children: `${oe.bookNumberToEnglishName(i.reference.bookNum)} ${i.reference.chapterNum}:${i.reference.verseNum}` }),
          /* @__PURE__ */ s(jt, { children: i.text })
        ]
      },
      `${i.reference.bookNum} ${i.reference.chapterNum}:${i.reference.verseNum}-${i.text}`
    )) })
  ] });
}
const fo = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Fr.Root,
  {
    ref: n,
    className: T(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      e
    ),
    ...t,
    children: /* @__PURE__ */ s(
      Fr.Indicator,
      {
        className: T("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ s(xn, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
fo.displayName = Fr.Root.displayName;
const Ec = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), na = (e) => {
  const t = /^\\[vc]\s+(\d+)/, n = e.match(t);
  if (n)
    return +n[1];
}, Tc = (e) => {
  const t = e.match(/^\\id\s+([A-Za-z]+)/);
  return t ? oe.bookIdToNumber(t[1]) : 0;
}, Cc = (e, t, n) => n.includes(e) ? "unapproved" : t.includes(e) ? "approved" : "unknown", Ei = Nn(
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
), Sc = A.forwardRef(({ className: e, variant: t, size: n, ...r }, o) => /* @__PURE__ */ s(
  ri.Root,
  {
    ref: o,
    className: T(Ei({ variant: t, size: n, className: e })),
    ...r
  }
));
Sc.displayName = ri.Root.displayName;
const Ti = A.createContext({
  size: "default",
  variant: "default"
}), Ci = A.forwardRef(({ className: e, variant: t, size: n, children: r, ...o }, a) => /* @__PURE__ */ s(
  er.Root,
  {
    ref: a,
    className: T("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", e),
    ...o,
    children: /* @__PURE__ */ s(
      Ti.Provider,
      {
        value: { variant: t, size: n },
        children: r
      }
    )
  }
));
Ci.displayName = er.Root.displayName;
const Fn = A.forwardRef(({ className: e, children: t, variant: n, size: r, ...o }, a) => {
  const i = A.useContext(Ti);
  return /* @__PURE__ */ s(
    er.Item,
    {
      ref: a,
      className: T(
        Ei({
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
Fn.displayName = er.Item.displayName;
const ir = (e) => e === "asc" ? /* @__PURE__ */ s(qs, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : e === "desc" ? /* @__PURE__ */ s(Ks, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ s(Js, { className: "tw-ms-2 tw-h-4 tw-w-4" }), Sm = (e) => ({
  accessorKey: "item",
  accessorFn: (t) => t.items[0],
  header: ({ column: t }) => /* @__PURE__ */ x(me, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    ir(t.getIsSorted())
  ] })
}), Oc = (e, t) => ({
  accessorKey: `item${t}`,
  accessorFn: (n) => n.items[t],
  header: ({ column: n }) => /* @__PURE__ */ x(me, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    e,
    ir(n.getIsSorted())
  ] })
}), Om = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ x(me, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    ir(t.getIsSorted())
  ] }) }),
  cell: ({ row: t }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-end", children: t.getValue("count") })
}), Or = (e, t, n, r, o, a) => {
  let i = [...n];
  e.forEach((c) => {
    t === "approved" ? i.includes(c) || i.push(c) : i = i.filter((d) => d !== c);
  }), r(i);
  let l = [...o];
  e.forEach((c) => {
    t === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, Rm = (e, t, n, r, o) => ({
  accessorKey: "status",
  header: ({ column: a }) => /* @__PURE__ */ s("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ x(me, { variant: "ghost", onClick: () => a.toggleSorting(void 0), children: [
    e,
    ir(a.getIsSorted())
  ] }) }),
  cell: ({ row: a }) => {
    const i = a.getValue("status"), l = a.getValue("item");
    return /* @__PURE__ */ x(Ci, { value: i, variant: "outline", type: "single", children: [
      /* @__PURE__ */ s(
        Fn,
        {
          onClick: () => Or(
            [l],
            "approved",
            t,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ s(Xs, {})
        }
      ),
      /* @__PURE__ */ s(
        Fn,
        {
          onClick: () => Or(
            [l],
            "unapproved",
            t,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ s(Ys, {})
        }
      ),
      /* @__PURE__ */ s(
        Fn,
        {
          onClick: () => Or(
            [l],
            "unknown",
            t,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ s(Ws, {})
        }
      )
    ] });
  }
}), Pm = Object.freeze([
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
]), Rc = (e, t, n) => {
  let r = e;
  return t !== "all" && (r = r.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, Pc = (e, t, n, r, o) => {
  if (!e)
    return [];
  const a = [];
  let i = t.bookNum, l = t.chapterNum, c = t.verseNum;
  return Ec(e).forEach((p) => {
    p.startsWith("\\id") && (i = Tc(p), l = 0, c = 0), p.startsWith("\\c") && (l = na(p), c = 0), p.startsWith("\\v") && (c = na(p), l === 0 && (l = t.chapterNum));
    let h = o.exec(p) ?? void 0;
    for (; h; ) {
      const w = [];
      h.forEach((m) => w.push(m));
      const b = h.index, v = a.find((m) => to(m.items, w)), f = {
        reference: {
          bookNum: i !== void 0 ? i : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: dl(p, Math.max(0, b - 25), Math.min(b + 25, p.length))
      };
      if (v)
        v.count += 1, v.occurrences.push(f);
      else {
        const m = {
          items: w,
          count: 1,
          status: Cc(w[0], n, r),
          occurrences: [f]
        };
        a.push(m);
      }
      h = o.exec(p) ?? void 0;
    }
  }), a;
}, Je = (e, t) => e[t] ?? t;
function _m({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  extractItems: r,
  additionalItemsLabels: o,
  approvedItems: a,
  unapprovedItems: i,
  text: l,
  scope: c,
  onScopeChange: d,
  columns: p
}) {
  const h = Je(n, "%webView_inventory_all%"), w = Je(n, "%webView_inventory_approved%"), b = Je(n, "%webView_inventory_unapproved%"), v = Je(n, "%webView_inventory_unknown%"), f = Je(n, "%webView_inventory_scope_currentBook%"), m = Je(n, "%webView_inventory_scope_chapter%"), N = Je(n, "%webView_inventory_scope_verse%"), I = Je(n, "%webView_inventory_filter_text%"), O = Je(
    n,
    "%webView_inventory_show_additional_items%"
  ), [E, g] = ue(!1), [_, L] = ue("all"), [H, C] = ue(""), [P, k] = ue([]), B = Te(() => l ? r instanceof RegExp ? Pc(
    l,
    e,
    a,
    i,
    r
  ) : r(l, e, a, i) : [], [l, r, e, a, i]), D = Te(() => {
    if (E)
      return B;
    const y = [];
    return B.forEach((S) => {
      const z = S.items[0], F = y.find(
        (V) => V.items[0] === z
      );
      F ? (F.count += S.count, F.occurrences = F.occurrences.concat(S.occurrences)) : y.push({
        items: [z],
        count: S.count,
        occurrences: S.occurrences,
        status: S.status
      });
    }), y;
  }, [E, B]), J = Te(() => Rc(D, _, H), [D, _, H]), q = Te(() => {
    var z, F;
    if (!E)
      return p;
    const y = (z = o == null ? void 0 : o.tableHeaders) == null ? void 0 : z.length;
    if (!y)
      return p;
    const S = [];
    for (let V = 0; V < y; V++)
      S.push(
        Oc(
          ((F = o == null ? void 0 : o.tableHeaders) == null ? void 0 : F[V]) || "Additional Item",
          V + 1
        )
      );
    return [...S, ...p];
  }, [o == null ? void 0 : o.tableHeaders, p, E]);
  at(() => {
    k([]);
  }, [J]);
  const U = (y, S) => {
    S.setRowSelection(() => {
      const z = {};
      return z[y.index] = !0, z;
    }), k(y.original.items);
  }, ee = (y) => {
    if (y === "book" || y === "chapter" || y === "verse")
      d(y);
    else
      throw new Error(`Invalid scope value: ${y}`);
  }, ae = (y) => {
    if (y === "all" || y === "approved" || y === "unapproved" || y === "unknown")
      L(y);
    else
      throw new Error(`Invalid status filter value: ${y}`);
  }, re = Te(() => {
    if (D.length === 0 || P.length === 0)
      return [];
    const y = D.filter((S) => to(
      E ? S.items : [S.items[0]],
      P
    ));
    if (y.length > 1)
      throw new Error("Selected item is not unique");
    return y[0].occurrences;
  }, [P, E, D]);
  return /* @__PURE__ */ x("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ x("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ x(
        fn,
        {
          onValueChange: (y) => ae(y),
          defaultValue: _,
          children: [
            /* @__PURE__ */ s(Mt, { className: "tw-m-1", children: /* @__PURE__ */ s(mn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ x(Bt, { children: [
              /* @__PURE__ */ s(Ue, { value: "all", children: h }),
              /* @__PURE__ */ s(Ue, { value: "approved", children: w }),
              /* @__PURE__ */ s(Ue, { value: "unapproved", children: b }),
              /* @__PURE__ */ s(Ue, { value: "unknown", children: v })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ x(fn, { onValueChange: (y) => ee(y), defaultValue: c, children: [
        /* @__PURE__ */ s(Mt, { className: "tw-m-1", children: /* @__PURE__ */ s(mn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ x(Bt, { children: [
          /* @__PURE__ */ s(Ue, { value: "book", children: f }),
          /* @__PURE__ */ s(Ue, { value: "chapter", children: m }),
          /* @__PURE__ */ s(Ue, { value: "verse", children: N })
        ] })
      ] }),
      /* @__PURE__ */ s(
        kn,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: I,
          value: H,
          onChange: (y) => {
            C(y.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ x("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ s(
          fo,
          {
            className: "tw-m-1",
            checked: E,
            onCheckedChange: (y) => {
              k([]), g(y);
            }
          }
        ),
        /* @__PURE__ */ s(He, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? O })
      ] })
    ] }),
    /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      Nc,
      {
        columns: q,
        data: J,
        onRowClickHandler: U,
        stickyHeader: !0
      }
    ) }),
    re.length > 0 && /* @__PURE__ */ s("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ s(
      kc,
      {
        occurrenceData: re,
        setScriptureReference: t,
        localizedStrings: n
      }
    ) })
  ] });
}
function $m({
  entries: e,
  getEntriesCount: t = void 0,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a = "No option found",
  customSelectedText: i,
  sortSelected: l = !1,
  icon: c = void 0
}) {
  const [d, p] = ue(!1), h = $e(
    (v) => {
      r(
        n.includes(v) ? n.filter((f) => f !== v) : [...n, v]
      );
    },
    [n, r]
  ), w = () => {
    var v;
    return n.length === 1 ? ((v = e.find((f) => f.value === n[0])) == null ? void 0 : v.label) ?? o : i || o;
  }, b = Te(() => {
    if (!l)
      return e;
    const v = e.filter((m) => m.starred).sort((m, N) => m.label.localeCompare(N.label)), f = e.filter((m) => !m.starred).sort((m, N) => {
      const I = n.includes(m.value), O = n.includes(N.value);
      return I && !O ? -1 : !I && O ? 1 : m.label.localeCompare(N.label);
    });
    return [...v, ...f];
  }, [e, n, l]);
  return /* @__PURE__ */ x(bi, { open: d, onOpenChange: p, children: [
    /* @__PURE__ */ s(vi, { asChild: !0, children: /* @__PURE__ */ x(
      me,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": d,
        className: T(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < e.length && "tw-border-primary"
        ),
        children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ s("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ s("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ s(
              "div",
              {
                className: T(
                  (n.length === 0 || n.length === e.length) && "tw-text-muted"
                ),
                children: w()
              }
            )
          ] }),
          /* @__PURE__ */ s(Za, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ s(so, { align: "start", className: "tw-w-full tw-p-0", children: /* @__PURE__ */ x(lo, { children: [
      /* @__PURE__ */ s(co, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ x(po, { children: [
        /* @__PURE__ */ s(uo, { children: a }),
        /* @__PURE__ */ s(xi, { children: b.map((v) => {
          const f = t ? t(v) : void 0;
          return /* @__PURE__ */ x(
            wo,
            {
              value: v.value,
              onSelect: h,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ s("div", { className: "w-4", children: /* @__PURE__ */ s(
                  xn,
                  {
                    className: T(
                      "tw-h-4 tw-w-4",
                      n.includes(v.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ s("div", { className: "tw-w-4", children: v.starred && /* @__PURE__ */ s(Zs, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ s("div", { className: "tw-flex-grow", children: v.label }),
                t && /* @__PURE__ */ s("div", { className: "tw-w-10 tw-text-right tw-text-muted-foreground", children: f })
              ]
            },
            v.value
          );
        }) })
      ] })
    ] }) })
  ] });
}
function _c({
  onSearch: e,
  placeholder: t,
  isFullWidth: n,
  className: r
}) {
  const [o, a] = ue(""), i = (l) => {
    a(l), e(l);
  };
  return /* @__PURE__ */ x("div", { className: "tw-relative", children: [
    /* @__PURE__ */ s(Ja, { className: "tw-absolute tw-left-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50" }),
    /* @__PURE__ */ s(
      kn,
      {
        className: T(
          "tw-flex tw-h-10 tw-w-full tw-text-ellipsis tw-rounded-md tw-border tw-border-input tw-bg-background tw-py-2 tw-pe-3 tw-ps-9 tw-text-sm tw-ring-offset-background file:tw-border-0 file:tw-bg-transparent file:tw-text-sm file:tw-font-medium placeholder:tw-text-muted-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-[color:hsl(240,5%,64.9%)] focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
          { "tw-w-full": n },
          { "tw-pe-9": o },
          r
        ),
        placeholder: t,
        value: o,
        onChange: (l) => i(l.target.value)
      }
    ),
    o && /* @__PURE__ */ x(
      me,
      {
        variant: "ghost",
        size: "icon",
        className: "tw-absolute tw-right-0 tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
        children: [
          /* @__PURE__ */ s(
            Ka,
            {
              className: "tw-h-4 tw-w-4",
              onClick: () => {
                i("");
              }
            }
          ),
          /* @__PURE__ */ s("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
const Si = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.Root,
  {
    orientation: "vertical",
    ref: n,
    className: T("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", e),
    ...t
  }
));
Si.displayName = Re.List.displayName;
const Oi = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.List,
  {
    ref: n,
    className: T(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Oi.displayName = Re.List.displayName;
const $c = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.Trigger,
  {
    ref: n,
    ...t,
    className: T(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    )
  }
)), Ri = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.Content,
  {
    ref: n,
    className: T(
      // Removed tw-mt-2 because Sebastian said so
      "tw-ms-5 tw-flex-grow tw-text-foreground tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Ri.displayName = Re.Content.displayName;
function Im({
  tabList: e,
  onSearch: t,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ x("div", { className: "pr-twp", children: [
    /* @__PURE__ */ x("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ s("h1", { children: r }) : "",
      /* @__PURE__ */ s(
        _c,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ x(Si, { dir: a, children: [
      /* @__PURE__ */ s(Oi, { children: e.map((i) => /* @__PURE__ */ s($c, { value: i.value, children: i.value }, i.key)) }),
      e.map((i) => /* @__PURE__ */ s(Ri, { value: i.value, children: i.content }, i.key))
    ] })
  ] });
}
const nt = "scrBook", Ic = "scrRef", wt = "source", Ac = "details", Dc = "Scripture Reference", Mc = "Scripture Book", Pi = "Type", Bc = "Details";
function jc(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${oe.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: nt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Dc,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? oe.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === nt ? Tr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => zr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Tr(r.start),
      id: Ic,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Tr(o.start);
      },
      sortingFn: (r, o) => zr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: wt,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? Pi : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Ac,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Bc,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const Vc = (e) => {
  if (!("offset" in e.start))
    throw new Error("No offset available in range start");
  if (e.end && !("offset" in e.end))
    throw new Error("No offset available in range end");
  const { offset: t } = e.start;
  let n = 0;
  return e.end && ({ offset: n } = e.end), !e.end || zr(e.start, e.end) === 0 ? `${Cr(e.start)}+${t}` : `${Cr(e.start)}+${t}-${Cr(e.end)}+${n}`;
}, ra = (e) => `${Vc({ start: e.start, end: e.end })} ${e.source.displayName} ${e.detail}`;
function Am({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l,
  direction: c = "ltr"
}) {
  const [d, p] = ue([]), [h, w] = ue([{ id: nt, desc: !1 }]), [b, v] = ue({}), f = Te(
    () => e.flatMap((C) => C.data.map((P) => ({
      ...P,
      source: C.source
    }))),
    [e]
  ), m = Te(
    () => jc(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: i
      },
      n
    ),
    [r, a, i, n]
  );
  at(() => {
    d.includes(wt) ? w([
      { id: wt, desc: !1 },
      { id: nt, desc: !1 }
    ]) : w([{ id: nt, desc: !1 }]);
  }, [d]);
  const N = ei({
    data: f,
    columns: m,
    state: {
      grouping: d,
      sorting: h,
      rowSelection: b
    },
    onGroupingChange: p,
    onSortingChange: w,
    onRowSelectionChange: v,
    getExpandedRowModel: hl(),
    getGroupedRowModel: gl(),
    getCoreRowModel: ti(),
    getSortedRowModel: ni(),
    getRowId: ra,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  at(() => {
    if (l) {
      const C = N.getSelectedRowModel().rowsById, P = Object.keys(C);
      if (P.length === 1) {
        const k = f.find((B) => ra(B) === P[0]) || void 0;
        k && l(k);
      }
    }
  }, [b, f, l, N]);
  const I = o ?? Mc, O = a ?? Pi, E = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${I}`, value: [nt] },
    { label: `Group by ${O}`, value: [wt] },
    {
      label: `Group by ${I} and ${O}`,
      value: [nt, wt]
    },
    {
      label: `Group by ${O} and ${I}`,
      value: [wt, nt]
    }
  ], g = (C) => {
    p(JSON.parse(C));
  }, _ = (C, P) => {
    !C.getIsGrouped() && !C.getIsSelected() && C.getToggleSelectedHandler()(P);
  }, L = (C, P) => C.getIsGrouped() ? "" : T("banded-row", P % 2 === 0 ? "even" : "odd"), H = (C, P, k) => {
    if (!((C == null ? void 0 : C.length) === 0 || P.depth < k.column.getGroupedIndex())) {
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
      fn,
      {
        value: JSON.stringify(d),
        onValueChange: (C) => {
          g(C);
        },
        children: [
          /* @__PURE__ */ s(Mt, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ s(mn, {}) }),
          /* @__PURE__ */ s(Bt, { position: "item-aligned", children: /* @__PURE__ */ s(hc, { children: E.map((C) => /* @__PURE__ */ s(Ue, { value: JSON.stringify(C.value), children: C.label }, C.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ x(rr, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      t && /* @__PURE__ */ s(or, { children: N.getHeaderGroups().map((C) => /* @__PURE__ */ s(ot, { children: C.headers.filter((P) => P.column.columnDef.header).map((P) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ s(hn, { colSpan: P.colSpan, className: "top-0 tw-sticky", children: P.isPlaceholder ? void 0 : /* @__PURE__ */ x("div", { children: [
          P.column.getCanGroup() ? /* @__PURE__ */ s(
            me,
            {
              variant: "ghost",
              title: `Toggle grouping by ${P.column.columnDef.header}`,
              onClick: P.column.getToggleGroupingHandler(),
              type: "button",
              children: P.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          sn(P.column.columnDef.header, P.getContext())
        ] }) }, P.id)
      )) }, C.id)) }),
      /* @__PURE__ */ s(ar, { children: N.getRowModel().rows.map((C, P) => /* @__PURE__ */ s(
        ot,
        {
          "data-state": C.getIsSelected() ? "selected" : "",
          className: T(L(C, P)),
          onClick: (k) => _(C, k),
          children: C.getVisibleCells().map((k) => {
            if (!(k.getIsPlaceholder() || k.column.columnDef.enableGrouping && !k.getIsGrouped() && (k.column.columnDef.id !== wt || !n)))
              return /* @__PURE__ */ s(
                jt,
                {
                  className: T(
                    k.column.columnDef.id,
                    "tw-p-[1px]",
                    H(d, C, k)
                  ),
                  children: (() => k.getIsGrouped() ? /* @__PURE__ */ x(
                    me,
                    {
                      variant: "link",
                      onClick: C.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        C.getIsExpanded() && /* @__PURE__ */ s(Qn, {}),
                        !C.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ s(Wa, {}) : /* @__PURE__ */ s(Qs, {})),
                        " ",
                        sn(k.column.columnDef.cell, k.getContext()),
                        " (",
                        C.subRows.length,
                        ")"
                      ]
                    }
                  ) : sn(k.column.columnDef.cell, k.getContext()))()
                },
                k.id
              );
          })
        },
        C.id
      )) })
    ] })
  ] });
}
const Rr = {
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
function Dm({
  availableScrollGroupIds: e,
  scrollGroupId: t,
  onChangeScrollGroupId: n,
  localizedStrings: r = {}
}) {
  const o = {
    ...Rr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([a, i]) => [
          a,
          a === i && a in Rr ? Rr[a] : i
        ]
      )
    )
  };
  return /* @__PURE__ */ x(
    fn,
    {
      value: `${t}`,
      onValueChange: (a) => n(
        a === "undefined" ? void 0 : parseInt(a, 10)
      ),
      children: [
        /* @__PURE__ */ s(Mt, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ s(
          mn,
          {
            placeholder: o[pe(t)] ?? t
          }
        ) }),
        /* @__PURE__ */ s(
          Bt,
          {
            style: { zIndex: 250 },
            children: e.map((a) => /* @__PURE__ */ s(Ue, { value: `${a}`, children: o[pe(a)] }, `${a}`))
          }
        )
      ]
    }
  );
}
const _i = A.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ s(
  oi.Root,
  {
    ref: o,
    decorative: n,
    orientation: t,
    className: T(
      "pr-twp tw-shrink-0 tw-bg-border",
      t === "horizontal" ? "tw-h-[1px] tw-w-full" : "tw-h-full tw-w-[1px]",
      e
    ),
    ...r
  }
));
_i.displayName = oi.Root.displayName;
function Mm({ children: e }) {
  return /* @__PURE__ */ s("div", { className: "pr-twp tw-grid", children: e });
}
function Bm({
  primary: e,
  secondary: t,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: e }),
      /* @__PURE__ */ s("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ s("div", { children: n })
  ] });
}
function jm({
  primary: e,
  secondary: t,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ x("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s("h3", { className: "tw-text-lg tw-font-medium", children: e }),
      /* @__PURE__ */ s("p", { className: "tw-text-sm tw-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ s(_i, {}) : ""
  ] });
}
function Vm({
  id: e,
  className: t,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ s("div", { id: e, className: t, children: n.map((i) => /* @__PURE__ */ x("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ s(
      fo,
      {
        className: "tw-mr-2 tw-align-middle",
        checked: r.includes(i),
        onCheckedChange: (l) => o(i, l)
      }
    ),
    /* @__PURE__ */ s(He, { children: a ? a(i) : i })
  ] }, i)) });
}
function Lc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function zc(e) {
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
var mo = {}, $i = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})($i);
var Fc = $i.exports, Pr = {};
function ho(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return e(...r) || t(...r);
  };
}
function R() {
  return R = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, R.apply(this, arguments);
}
function ht(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ii(e) {
  if (!ht(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((n) => {
    t[n] = Ii(e[n]);
  }), t;
}
function Ze(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? R({}, e) : e;
  return ht(e) && ht(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (ht(t[o]) && o in e && ht(e[o]) ? r[o] = Ze(e[o], t[o], n) : n.clone ? r[o] = ht(t[o]) ? Ii(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
var Hr = { exports: {} }, Bn = { exports: {} }, ie = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var oa;
function Uc() {
  if (oa)
    return ie;
  oa = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, w = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
  function O(g) {
    if (typeof g == "object" && g !== null) {
      var _ = g.$$typeof;
      switch (_) {
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
                case p:
                case v:
                case b:
                case i:
                  return g;
                default:
                  return _;
              }
          }
        case n:
          return _;
      }
    }
  }
  function E(g) {
    return O(g) === d;
  }
  return ie.AsyncMode = c, ie.ConcurrentMode = d, ie.ContextConsumer = l, ie.ContextProvider = i, ie.Element = t, ie.ForwardRef = p, ie.Fragment = r, ie.Lazy = v, ie.Memo = b, ie.Portal = n, ie.Profiler = a, ie.StrictMode = o, ie.Suspense = h, ie.isAsyncMode = function(g) {
    return E(g) || O(g) === c;
  }, ie.isConcurrentMode = E, ie.isContextConsumer = function(g) {
    return O(g) === l;
  }, ie.isContextProvider = function(g) {
    return O(g) === i;
  }, ie.isElement = function(g) {
    return typeof g == "object" && g !== null && g.$$typeof === t;
  }, ie.isForwardRef = function(g) {
    return O(g) === p;
  }, ie.isFragment = function(g) {
    return O(g) === r;
  }, ie.isLazy = function(g) {
    return O(g) === v;
  }, ie.isMemo = function(g) {
    return O(g) === b;
  }, ie.isPortal = function(g) {
    return O(g) === n;
  }, ie.isProfiler = function(g) {
    return O(g) === a;
  }, ie.isStrictMode = function(g) {
    return O(g) === o;
  }, ie.isSuspense = function(g) {
    return O(g) === h;
  }, ie.isValidElementType = function(g) {
    return typeof g == "string" || typeof g == "function" || g === r || g === d || g === a || g === o || g === h || g === w || typeof g == "object" && g !== null && (g.$$typeof === v || g.$$typeof === b || g.$$typeof === i || g.$$typeof === l || g.$$typeof === p || g.$$typeof === m || g.$$typeof === N || g.$$typeof === I || g.$$typeof === f);
  }, ie.typeOf = O, ie;
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
var aa;
function Gc() {
  return aa || (aa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, p = e ? Symbol.for("react.forward_ref") : 60112, h = e ? Symbol.for("react.suspense") : 60113, w = e ? Symbol.for("react.suspense_list") : 60120, b = e ? Symbol.for("react.memo") : 60115, v = e ? Symbol.for("react.lazy") : 60116, f = e ? Symbol.for("react.block") : 60121, m = e ? Symbol.for("react.fundamental") : 60117, N = e ? Symbol.for("react.responder") : 60118, I = e ? Symbol.for("react.scope") : 60119;
    function O($) {
      return typeof $ == "string" || typeof $ == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      $ === r || $ === d || $ === a || $ === o || $ === h || $ === w || typeof $ == "object" && $ !== null && ($.$$typeof === v || $.$$typeof === b || $.$$typeof === i || $.$$typeof === l || $.$$typeof === p || $.$$typeof === m || $.$$typeof === N || $.$$typeof === I || $.$$typeof === f);
    }
    function E($) {
      if (typeof $ == "object" && $ !== null) {
        var xe = $.$$typeof;
        switch (xe) {
          case t:
            var j = $.type;
            switch (j) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case h:
                return j;
              default:
                var ye = j && j.$$typeof;
                switch (ye) {
                  case l:
                  case p:
                  case v:
                  case b:
                  case i:
                    return ye;
                  default:
                    return xe;
                }
            }
          case n:
            return xe;
        }
      }
    }
    var g = c, _ = d, L = l, H = i, C = t, P = p, k = r, B = v, D = b, J = n, q = a, U = o, ee = h, ae = !1;
    function re($) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), y($) || E($) === c;
    }
    function y($) {
      return E($) === d;
    }
    function S($) {
      return E($) === l;
    }
    function z($) {
      return E($) === i;
    }
    function F($) {
      return typeof $ == "object" && $ !== null && $.$$typeof === t;
    }
    function V($) {
      return E($) === p;
    }
    function W($) {
      return E($) === r;
    }
    function X($) {
      return E($) === v;
    }
    function Y($) {
      return E($) === b;
    }
    function G($) {
      return E($) === n;
    }
    function K($) {
      return E($) === a;
    }
    function Z($) {
      return E($) === o;
    }
    function de($) {
      return E($) === h;
    }
    se.AsyncMode = g, se.ConcurrentMode = _, se.ContextConsumer = L, se.ContextProvider = H, se.Element = C, se.ForwardRef = P, se.Fragment = k, se.Lazy = B, se.Memo = D, se.Portal = J, se.Profiler = q, se.StrictMode = U, se.Suspense = ee, se.isAsyncMode = re, se.isConcurrentMode = y, se.isContextConsumer = S, se.isContextProvider = z, se.isElement = F, se.isForwardRef = V, se.isFragment = W, se.isLazy = X, se.isMemo = Y, se.isPortal = G, se.isProfiler = K, se.isStrictMode = Z, se.isSuspense = de, se.isValidElementType = O, se.typeOf = E;
  }()), se;
}
var ia;
function Ai() {
  return ia || (ia = 1, process.env.NODE_ENV === "production" ? Bn.exports = Uc() : Bn.exports = Gc()), Bn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var _r, sa;
function Hc() {
  if (sa)
    return _r;
  sa = 1;
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
      var c = Object.getOwnPropertyNames(i).map(function(p) {
        return i[p];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(p) {
        d[p] = p;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return _r = o() ? Object.assign : function(a, i) {
    for (var l, c = r(a), d, p = 1; p < arguments.length; p++) {
      l = Object(arguments[p]);
      for (var h in l)
        t.call(l, h) && (c[h] = l[h]);
      if (e) {
        d = e(l);
        for (var w = 0; w < d.length; w++)
          n.call(l, d[w]) && (c[d[w]] = l[d[w]]);
      }
    }
    return c;
  }, _r;
}
var $r, la;
function go() {
  if (la)
    return $r;
  la = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return $r = e, $r;
}
var Ir, ca;
function Di() {
  return ca || (ca = 1, Ir = Function.call.bind(Object.prototype.hasOwnProperty)), Ir;
}
var Ar, da;
function Xc() {
  if (da)
    return Ar;
  da = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = go(), n = {}, r = Di();
    e = function(a) {
      var i = "Warning: " + a;
      typeof console < "u" && console.error(i);
      try {
        throw new Error(i);
      } catch {
      }
    };
  }
  function o(a, i, l, c, d) {
    if (process.env.NODE_ENV !== "production") {
      for (var p in a)
        if (r(a, p)) {
          var h;
          try {
            if (typeof a[p] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + p + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[p] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            h = a[p](i, p, c, l, null, t);
          } catch (v) {
            h = v;
          }
          if (h && !(h instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + p + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof h + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
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
  }, Ar = o, Ar;
}
var Dr, pa;
function Yc() {
  if (pa)
    return Dr;
  pa = 1;
  var e = Ai(), t = Hc(), n = go(), r = Di(), o = Xc(), a = function() {
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
  return Dr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, p = "@@iterator";
    function h(y) {
      var S = y && (d && y[d] || y[p]);
      if (typeof S == "function")
        return S;
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
      any: I(),
      arrayOf: O,
      element: E(),
      elementType: g(),
      instanceOf: _,
      node: P(),
      objectOf: H,
      oneOf: L,
      oneOfType: C,
      shape: B,
      exact: D
    };
    function v(y, S) {
      return y === S ? y !== 0 || 1 / y === 1 / S : y !== y && S !== S;
    }
    function f(y, S) {
      this.message = y, this.data = S && typeof S == "object" ? S : {}, this.stack = "";
    }
    f.prototype = Error.prototype;
    function m(y) {
      if (process.env.NODE_ENV !== "production")
        var S = {}, z = 0;
      function F(W, X, Y, G, K, Z, de) {
        if (G = G || w, Z = Z || Y, de !== n) {
          if (c) {
            var $ = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw $.name = "Invariant Violation", $;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var xe = G + ":" + Y;
            !S[xe] && // Avoid spamming the console because they are often not actionable except for lib authors
            z < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + Z + "` prop on `" + G + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), S[xe] = !0, z++);
          }
        }
        return X[Y] == null ? W ? X[Y] === null ? new f("The " + K + " `" + Z + "` is marked as required " + ("in `" + G + "`, but its value is `null`.")) : new f("The " + K + " `" + Z + "` is marked as required in " + ("`" + G + "`, but its value is `undefined`.")) : null : y(X, Y, G, K, Z);
      }
      var V = F.bind(null, !1);
      return V.isRequired = F.bind(null, !0), V;
    }
    function N(y) {
      function S(z, F, V, W, X, Y) {
        var G = z[F], K = U(G);
        if (K !== y) {
          var Z = ee(G);
          return new f(
            "Invalid " + W + " `" + X + "` of type " + ("`" + Z + "` supplied to `" + V + "`, expected ") + ("`" + y + "`."),
            { expectedType: y }
          );
        }
        return null;
      }
      return m(S);
    }
    function I() {
      return m(i);
    }
    function O(y) {
      function S(z, F, V, W, X) {
        if (typeof y != "function")
          return new f("Property `" + X + "` of component `" + V + "` has invalid PropType notation inside arrayOf.");
        var Y = z[F];
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
      return m(S);
    }
    function E() {
      function y(S, z, F, V, W) {
        var X = S[z];
        if (!l(X)) {
          var Y = U(X);
          return new f("Invalid " + V + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected a single ReactElement."));
        }
        return null;
      }
      return m(y);
    }
    function g() {
      function y(S, z, F, V, W) {
        var X = S[z];
        if (!e.isValidElementType(X)) {
          var Y = U(X);
          return new f("Invalid " + V + " `" + W + "` of type " + ("`" + Y + "` supplied to `" + F + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return m(y);
    }
    function _(y) {
      function S(z, F, V, W, X) {
        if (!(z[F] instanceof y)) {
          var Y = y.name || w, G = re(z[F]);
          return new f("Invalid " + W + " `" + X + "` of type " + ("`" + G + "` supplied to `" + V + "`, expected ") + ("instance of `" + Y + "`."));
        }
        return null;
      }
      return m(S);
    }
    function L(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function S(z, F, V, W, X) {
        for (var Y = z[F], G = 0; G < y.length; G++)
          if (v(Y, y[G]))
            return null;
        var K = JSON.stringify(y, function(de, $) {
          var xe = ee($);
          return xe === "symbol" ? String($) : $;
        });
        return new f("Invalid " + W + " `" + X + "` of value `" + String(Y) + "` " + ("supplied to `" + V + "`, expected one of " + K + "."));
      }
      return m(S);
    }
    function H(y) {
      function S(z, F, V, W, X) {
        if (typeof y != "function")
          return new f("Property `" + X + "` of component `" + V + "` has invalid PropType notation inside objectOf.");
        var Y = z[F], G = U(Y);
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
      return m(S);
    }
    function C(y) {
      if (!Array.isArray(y))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var S = 0; S < y.length; S++) {
        var z = y[S];
        if (typeof z != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + ae(z) + " at index " + S + "."
          ), i;
      }
      function F(V, W, X, Y, G) {
        for (var K = [], Z = 0; Z < y.length; Z++) {
          var de = y[Z], $ = de(V, W, X, Y, G, n);
          if ($ == null)
            return null;
          $.data && r($.data, "expectedType") && K.push($.data.expectedType);
        }
        var xe = K.length > 0 ? ", expected one of type [" + K.join(", ") + "]" : "";
        return new f("Invalid " + Y + " `" + G + "` supplied to " + ("`" + X + "`" + xe + "."));
      }
      return m(F);
    }
    function P() {
      function y(S, z, F, V, W) {
        return J(S[z]) ? null : new f("Invalid " + V + " `" + W + "` supplied to " + ("`" + F + "`, expected a ReactNode."));
      }
      return m(y);
    }
    function k(y, S, z, F, V) {
      return new f(
        (y || "React class") + ": " + S + " type `" + z + "." + F + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + V + "`."
      );
    }
    function B(y) {
      function S(z, F, V, W, X) {
        var Y = z[F], G = U(Y);
        if (G !== "object")
          return new f("Invalid " + W + " `" + X + "` of type `" + G + "` " + ("supplied to `" + V + "`, expected `object`."));
        for (var K in y) {
          var Z = y[K];
          if (typeof Z != "function")
            return k(V, W, X, K, ee(Z));
          var de = Z(Y, K, V, W, X + "." + K, n);
          if (de)
            return de;
        }
        return null;
      }
      return m(S);
    }
    function D(y) {
      function S(z, F, V, W, X) {
        var Y = z[F], G = U(Y);
        if (G !== "object")
          return new f("Invalid " + W + " `" + X + "` of type `" + G + "` " + ("supplied to `" + V + "`, expected `object`."));
        var K = t({}, z[F], y);
        for (var Z in K) {
          var de = y[Z];
          if (r(y, Z) && typeof de != "function")
            return k(V, W, X, Z, ee(de));
          if (!de)
            return new f(
              "Invalid " + W + " `" + X + "` key `" + Z + "` supplied to `" + V + "`.\nBad object: " + JSON.stringify(z[F], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(y), null, "  ")
            );
          var $ = de(Y, Z, V, W, X + "." + Z, n);
          if ($)
            return $;
        }
        return null;
      }
      return m(S);
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
          var S = h(y);
          if (S) {
            var z = S.call(y), F;
            if (S !== y.entries) {
              for (; !(F = z.next()).done; )
                if (!J(F.value))
                  return !1;
            } else
              for (; !(F = z.next()).done; ) {
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
    function q(y, S) {
      return y === "symbol" ? !0 : S ? S["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && S instanceof Symbol : !1;
    }
    function U(y) {
      var S = typeof y;
      return Array.isArray(y) ? "array" : y instanceof RegExp ? "object" : q(S, y) ? "symbol" : S;
    }
    function ee(y) {
      if (typeof y > "u" || y === null)
        return "" + y;
      var S = U(y);
      if (S === "object") {
        if (y instanceof Date)
          return "date";
        if (y instanceof RegExp)
          return "regexp";
      }
      return S;
    }
    function ae(y) {
      var S = ee(y);
      switch (S) {
        case "array":
        case "object":
          return "an " + S;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + S;
        default:
          return S;
      }
    }
    function re(y) {
      return !y.constructor || !y.constructor.name ? w : y.constructor.name;
    }
    return b.checkPropTypes = o, b.resetWarningCache = o.resetWarningCache, b.PropTypes = b, b;
  }, Dr;
}
var Mr, ua;
function Wc() {
  if (ua)
    return Mr;
  ua = 1;
  var e = go();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Mr = function() {
    function r(i, l, c, d, p, h) {
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
  }, Mr;
}
if (process.env.NODE_ENV !== "production") {
  var qc = Ai(), Kc = !0;
  Hr.exports = Yc()(qc.isElement, Kc);
} else
  Hr.exports = Wc()();
var Jc = Hr.exports;
const u = /* @__PURE__ */ Lc(Jc);
function Zc(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Mi(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Zc(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Bi = ho(u.element, Mi);
Bi.isRequired = ho(u.element.isRequired, Mi);
const ji = Bi, Qc = "exact-prop: ​";
function ed(e) {
  return process.env.NODE_ENV === "production" ? e : R({}, e, {
    [Qc]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Vt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var Xr = { exports: {} }, le = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wa;
function td() {
  if (wa)
    return le;
  wa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v;
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
            case p:
              return m;
            default:
              switch (m = m && m.$$typeof, m) {
                case l:
                case i:
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
  return le.ContextConsumer = i, le.ContextProvider = a, le.Element = e, le.ForwardRef = c, le.Fragment = n, le.Lazy = w, le.Memo = h, le.Portal = t, le.Profiler = o, le.StrictMode = r, le.Suspense = d, le.SuspenseList = p, le.isAsyncMode = function() {
    return !1;
  }, le.isConcurrentMode = function() {
    return !1;
  }, le.isContextConsumer = function(m) {
    return f(m) === i;
  }, le.isContextProvider = function(m) {
    return f(m) === a;
  }, le.isElement = function(m) {
    return typeof m == "object" && m !== null && m.$$typeof === e;
  }, le.isForwardRef = function(m) {
    return f(m) === c;
  }, le.isFragment = function(m) {
    return f(m) === n;
  }, le.isLazy = function(m) {
    return f(m) === w;
  }, le.isMemo = function(m) {
    return f(m) === h;
  }, le.isPortal = function(m) {
    return f(m) === t;
  }, le.isProfiler = function(m) {
    return f(m) === o;
  }, le.isStrictMode = function(m) {
    return f(m) === r;
  }, le.isSuspense = function(m) {
    return f(m) === d;
  }, le.isSuspenseList = function(m) {
    return f(m) === p;
  }, le.isValidElementType = function(m) {
    return typeof m == "string" || typeof m == "function" || m === n || m === o || m === r || m === d || m === p || m === b || typeof m == "object" && m !== null && (m.$$typeof === w || m.$$typeof === h || m.$$typeof === a || m.$$typeof === i || m.$$typeof === c || m.$$typeof === v || m.getModuleId !== void 0);
  }, le.typeOf = f, le;
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
var fa;
function nd() {
  return fa || (fa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), p = Symbol.for("react.suspense_list"), h = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), v = !1, f = !1, m = !1, N = !1, I = !1, O;
    O = Symbol.for("react.module.reference");
    function E(j) {
      return !!(typeof j == "string" || typeof j == "function" || j === n || j === o || I || j === r || j === d || j === p || N || j === b || v || f || m || typeof j == "object" && j !== null && (j.$$typeof === w || j.$$typeof === h || j.$$typeof === a || j.$$typeof === i || j.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      j.$$typeof === O || j.getModuleId !== void 0));
    }
    function g(j) {
      if (typeof j == "object" && j !== null) {
        var ye = j.$$typeof;
        switch (ye) {
          case e:
            var ze = j.type;
            switch (ze) {
              case n:
              case o:
              case r:
              case d:
              case p:
                return ze;
              default:
                var ct = ze && ze.$$typeof;
                switch (ct) {
                  case l:
                  case i:
                  case c:
                  case w:
                  case h:
                  case a:
                    return ct;
                  default:
                    return ye;
                }
            }
          case t:
            return ye;
        }
      }
    }
    var _ = i, L = a, H = e, C = c, P = n, k = w, B = h, D = t, J = o, q = r, U = d, ee = p, ae = !1, re = !1;
    function y(j) {
      return ae || (ae = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function S(j) {
      return re || (re = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function z(j) {
      return g(j) === i;
    }
    function F(j) {
      return g(j) === a;
    }
    function V(j) {
      return typeof j == "object" && j !== null && j.$$typeof === e;
    }
    function W(j) {
      return g(j) === c;
    }
    function X(j) {
      return g(j) === n;
    }
    function Y(j) {
      return g(j) === w;
    }
    function G(j) {
      return g(j) === h;
    }
    function K(j) {
      return g(j) === t;
    }
    function Z(j) {
      return g(j) === o;
    }
    function de(j) {
      return g(j) === r;
    }
    function $(j) {
      return g(j) === d;
    }
    function xe(j) {
      return g(j) === p;
    }
    ce.ContextConsumer = _, ce.ContextProvider = L, ce.Element = H, ce.ForwardRef = C, ce.Fragment = P, ce.Lazy = k, ce.Memo = B, ce.Portal = D, ce.Profiler = J, ce.StrictMode = q, ce.Suspense = U, ce.SuspenseList = ee, ce.isAsyncMode = y, ce.isConcurrentMode = S, ce.isContextConsumer = z, ce.isContextProvider = F, ce.isElement = V, ce.isForwardRef = W, ce.isFragment = X, ce.isLazy = Y, ce.isMemo = G, ce.isPortal = K, ce.isProfiler = Z, ce.isStrictMode = de, ce.isSuspense = $, ce.isSuspenseList = xe, ce.isValidElementType = E, ce.typeOf = g;
  }()), ce;
}
process.env.NODE_ENV === "production" ? Xr.exports = td() : Xr.exports = nd();
var ma = Xr.exports;
const rd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function od(e) {
  const t = `${e}`.match(rd);
  return t && t[1] || "";
}
function Vi(e, t = "") {
  return e.displayName || e.name || od(e) || t;
}
function ha(e, t, n) {
  const r = Vi(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function ad(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return Vi(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ma.ForwardRef:
          return ha(e, e.render, "ForwardRef");
        case ma.Memo:
          return ha(e, e.type, "memo");
        default:
          return;
      }
  }
}
function gn(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const id = u.oneOfType([u.func, u.object]), Li = id;
function We(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Vt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function sd(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function ld(e, t = 166) {
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
function cd(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function dd(e, t) {
  var n, r;
  return /* @__PURE__ */ M.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Xn(e) {
  return e && e.ownerDocument || document;
}
function pd(e) {
  return Xn(e).defaultView || window;
}
function ud(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? R({}, t.propTypes) : null;
  return (o) => (a, i, l, c, d, ...p) => {
    const h = d || i, w = n == null ? void 0 : n[h];
    if (w) {
      const b = w(a, i, l, c, d, ...p);
      if (b)
        return b;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${h}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function Yn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const wd = typeof window < "u" ? M.useLayoutEffect : M.useEffect, Lt = wd;
let ga = 0;
function fd(e) {
  const [t, n] = M.useState(e), r = e || t;
  return M.useEffect(() => {
    t == null && (ga += 1, n(`mui-${ga}`));
  }, [t]), r;
}
const ba = M["useId".toString()];
function zi(e) {
  if (ba !== void 0) {
    const t = ba();
    return e ?? t;
  }
  return fd(e);
}
function md(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function Fi({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = M.useRef(e !== void 0), [a, i] = M.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    M.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: d
    } = M.useRef(t);
    M.useEffect(() => {
      !o && d !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = M.useCallback((d) => {
    o || i(d);
  }, []);
  return [l, c];
}
function Yr(e) {
  const t = M.useRef(e);
  return Lt(() => {
    t.current = e;
  }), M.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function xt(...e) {
  return M.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      Yn(n, t);
    });
  }, e);
}
const va = {};
function hd(e, t) {
  const n = M.useRef(va);
  return n.current === va && (n.current = e(t)), n;
}
const gd = [];
function bd(e) {
  M.useEffect(e, gd);
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
  start(t, n) {
    this.clear(), this.currentId = setTimeout(() => {
      this.currentId = null, n();
    }, t);
  }
}
function rn() {
  const e = hd(Tn.create).current;
  return bd(e.disposeEffect), e;
}
let sr = !0, Wr = !1;
const vd = new Tn(), yd = {
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
function xd(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && yd[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function Nd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (sr = !0);
}
function Br() {
  sr = !1;
}
function kd() {
  this.visibilityState === "hidden" && Wr && (sr = !0);
}
function Ed(e) {
  e.addEventListener("keydown", Nd, !0), e.addEventListener("mousedown", Br, !0), e.addEventListener("pointerdown", Br, !0), e.addEventListener("touchstart", Br, !0), e.addEventListener("visibilitychange", kd, !0);
}
function Td(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return sr || xd(t);
}
function Ui() {
  const e = M.useCallback((o) => {
    o != null && Ed(o.ownerDocument);
  }, []), t = M.useRef(!1);
  function n() {
    return t.current ? (Wr = !0, vd.start(100, () => {
      Wr = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return Td(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function Gi(e, t) {
  const n = R({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = R({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = R({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = Gi(o[i], a[i]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function bo(e, t, n = void 0) {
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
const ya = (e) => e, Cd = () => {
  let e = ya;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = ya;
    }
  };
}, Sd = Cd(), Hi = Sd, Xi = {
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
function lr(e, t, n = "Mui") {
  const r = Xi[t];
  return r ? `${n}-${r}` : `${Hi.generate(e)}-${t}`;
}
function Yi(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = lr(e, o, n);
  }), r;
}
function Od(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
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
const Rd = ["values", "unit", "step"], Pd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => R({}, n, {
    [r.key]: r.val
  }), {});
};
function _d(e) {
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
  } = e, o = Ne(e, Rd), a = Pd(t), i = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof t[w] == "number" ? t[w] : w) - r / 100}${n})`;
  }
  function d(w, b) {
    const v = i.indexOf(b);
    return `@media (min-width:${typeof t[w] == "number" ? t[w] : w}${n}) and (max-width:${(v !== -1 && typeof t[i[v]] == "number" ? t[i[v]] : b) - r / 100}${n})`;
  }
  function p(w) {
    return i.indexOf(w) + 1 < i.length ? d(w, i[i.indexOf(w) + 1]) : l(w);
  }
  function h(w) {
    const b = i.indexOf(w);
    return b === 0 ? l(i[1]) : b === i.length - 1 ? c(i[b]) : d(w, i[i.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return R({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: d,
    only: p,
    not: h,
    unit: n
  }, o);
}
const $d = {
  borderRadius: 4
}, Id = $d, Ad = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.string, u.object, u.array]) : {}, st = Ad;
function cn(e, t) {
  return t ? Ze(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const vo = {
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
}, xa = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${vo[e]}px)`
};
function Qe(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || xa;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || xa;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || vo).indexOf(l) !== -1) {
        const c = a.up(l);
        i[c] = n(t[l], l);
      } else {
        const c = l;
        i[c] = t[c];
      }
      return i;
    }, {});
  }
  return n(t);
}
function Dd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Md(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function cr(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function Wn(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = cr(e, n) || r, t && (o = t(o, r, e)), o;
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
    const l = i[t], c = i.theme, d = cr(c, r) || {};
    return Qe(i, l, (h) => {
      let w = Wn(d, o, h);
      return h === w && typeof h == "string" && (w = Wn(d, o, `${t}${h === "default" ? "" : We(h)}`, h)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: st
  } : {}, a.filterProps = [t], a;
}
function Bd(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const jd = {
  m: "margin",
  p: "padding"
}, Vd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Na = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Ld = Bd((e) => {
  if (e.length > 2)
    if (Na[e])
      e = Na[e];
    else
      return [e];
  const [t, n] = e.split(""), r = jd[t], o = Vd[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), dr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], pr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], zd = [...dr, ...pr];
function Cn(e, t, n, r) {
  var o;
  const a = (o = cr(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function Wi(e) {
  return Cn(e, "spacing", 8, "spacing");
}
function Sn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Fd(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Sn(t, n), r), {});
}
function Ud(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Ld(n), a = Fd(o, r), i = e[n];
  return Qe(e, i, a);
}
function qi(e, t) {
  const n = Wi(e.theme);
  return Object.keys(e).map((r) => Ud(e, t, r, n)).reduce(cn, {});
}
function he(e) {
  return qi(e, dr);
}
he.propTypes = process.env.NODE_ENV !== "production" ? dr.reduce((e, t) => (e[t] = st, e), {}) : {};
he.filterProps = dr;
function ge(e) {
  return qi(e, pr);
}
ge.propTypes = process.env.NODE_ENV !== "production" ? pr.reduce((e, t) => (e[t] = st, e), {}) : {};
ge.filterProps = pr;
process.env.NODE_ENV !== "production" && zd.reduce((e, t) => (e[t] = st, e), {});
function Gd(e = 8) {
  if (e.mui)
    return e;
  const t = Wi({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function ur(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? cn(o, t[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Me(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Le(e, t) {
  return ve({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Hd = Le("border", Me), Xd = Le("borderTop", Me), Yd = Le("borderRight", Me), Wd = Le("borderBottom", Me), qd = Le("borderLeft", Me), Kd = Le("borderColor"), Jd = Le("borderTopColor"), Zd = Le("borderRightColor"), Qd = Le("borderBottomColor"), ep = Le("borderLeftColor"), tp = Le("outline", Me), np = Le("outlineColor"), wr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Cn(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Sn(t, r)
    });
    return Qe(e, e.borderRadius, n);
  }
  return null;
};
wr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: st
} : {};
wr.filterProps = ["borderRadius"];
ur(Hd, Xd, Yd, Wd, qd, Kd, Jd, Zd, Qd, ep, wr, tp, np);
const fr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Cn(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Sn(t, r)
    });
    return Qe(e, e.gap, n);
  }
  return null;
};
fr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: st
} : {};
fr.filterProps = ["gap"];
const mr = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Cn(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Sn(t, r)
    });
    return Qe(e, e.columnGap, n);
  }
  return null;
};
mr.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: st
} : {};
mr.filterProps = ["columnGap"];
const hr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Cn(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Sn(t, r)
    });
    return Qe(e, e.rowGap, n);
  }
  return null;
};
hr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: st
} : {};
hr.filterProps = ["rowGap"];
const rp = ve({
  prop: "gridColumn"
}), op = ve({
  prop: "gridRow"
}), ap = ve({
  prop: "gridAutoFlow"
}), ip = ve({
  prop: "gridAutoColumns"
}), sp = ve({
  prop: "gridAutoRows"
}), lp = ve({
  prop: "gridTemplateColumns"
}), cp = ve({
  prop: "gridTemplateRows"
}), dp = ve({
  prop: "gridTemplateAreas"
}), pp = ve({
  prop: "gridArea"
});
ur(fr, mr, hr, rp, op, ap, ip, sp, lp, cp, dp, pp);
function Dt(e, t) {
  return t === "grey" ? t : e;
}
const up = ve({
  prop: "color",
  themeKey: "palette",
  transform: Dt
}), wp = ve({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Dt
}), fp = ve({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Dt
});
ur(up, wp, fp);
function Ie(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const mp = ve({
  prop: "width",
  transform: Ie
}), yo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || vo[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ie(n)
      };
    };
    return Qe(e, e.maxWidth, t);
  }
  return null;
};
yo.filterProps = ["maxWidth"];
const hp = ve({
  prop: "minWidth",
  transform: Ie
}), gp = ve({
  prop: "height",
  transform: Ie
}), bp = ve({
  prop: "maxHeight",
  transform: Ie
}), vp = ve({
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
const yp = ve({
  prop: "boxSizing"
});
ur(mp, yo, hp, gp, bp, vp, yp);
const xp = {
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
    style: wr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Dt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Dt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Dt
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
    style: fr
  },
  rowGap: {
    style: hr
  },
  columnGap: {
    style: mr
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
    style: yo
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
}, xo = xp;
function Np(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function kp(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Ep() {
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
      cssProperty: c = n,
      themeKey: d,
      transform: p,
      style: h
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = cr(o, d) || {};
    return h ? h(i) : Qe(i, r, (v) => {
      let f = Wn(w, p, v);
      return v === f && typeof v == "string" && (f = Wn(w, p, `${n}${v === "default" ? "" : We(v)}`, v)), c === !1 ? f : {
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
    const i = (r = a.unstable_sxConfig) != null ? r : xo;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const p = Dd(a.breakpoints), h = Object.keys(p);
      let w = p;
      return Object.keys(d).forEach((b) => {
        const v = kp(d[b], a);
        if (v != null)
          if (typeof v == "object")
            if (i[b])
              w = cn(w, e(b, v, a, i));
            else {
              const f = Qe({
                theme: a
              }, v, (m) => ({
                [b]: m
              }));
              Np(f, v) ? w[b] = t({
                sx: v,
                theme: a
              }) : w = cn(w, f);
            }
          else
            w = cn(w, e(b, v, a, i));
      }), Md(h, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ki = Ep();
Ki.filterProps = ["sx"];
const No = Ki;
function Tp(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const Cp = ["breakpoints", "palette", "spacing", "shape"];
function ko(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, i = Ne(e, Cp), l = _d(n), c = Gd(o);
  let d = Ze({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: R({
      mode: "light"
    }, r),
    spacing: c,
    shape: R({}, Id, a)
  }, i);
  return d.applyStyles = Tp, d = t.reduce((p, h) => Ze(p, h), d), d.unstable_sxConfig = R({}, xo, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(h) {
    return No({
      sx: h,
      theme: this
    });
  }, d;
}
function Sp(e) {
  return Object.keys(e).length === 0;
}
function Ji(e = null) {
  const t = M.useContext(vl);
  return !t || Sp(t) ? e : t;
}
const Op = ko();
function Zi(e = Op) {
  return Ji(e);
}
const Rp = ["ownerState"], Pp = ["variants"], _p = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function $p(e) {
  return Object.keys(e).length === 0;
}
function Ip(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Un(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ap = ko(), ka = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function jn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return $p(t) ? e : t[n] || t;
}
function Dp(e) {
  return e ? (t, n) => n[e] : null;
}
function Gn(e, t) {
  let {
    ownerState: n
  } = t, r = Ne(t, Rp);
  const o = typeof e == "function" ? e(R({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => Gn(a, R({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = Ne(o, Pp);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(R({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((p) => {
        (n == null ? void 0 : n[p]) !== c.props[p] && r[p] !== c.props[p] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(R({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Mp(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = Ap,
    rootShouldForwardProp: r = Un,
    slotShouldForwardProp: o = Un
  } = e, a = (i) => No(R({}, i, {
    theme: jn(R({}, i, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    yl(i, (g) => g.filter((_) => !(_ != null && _.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: p,
      skipSx: h,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Dp(ka(d))
    } = l, b = Ne(l, _p), v = p !== void 0 ? p : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), f = h || !1;
    let m;
    process.env.NODE_ENV !== "production" && c && (m = `${c}-${ka(d || "Root")}`);
    let N = Un;
    d === "Root" || d === "root" ? N = r : d ? N = o : Ip(i) && (N = void 0);
    const I = bl(i, R({
      shouldForwardProp: N,
      label: m
    }, b)), O = (g) => typeof g == "function" && g.__emotion_real !== g || ht(g) ? (_) => Gn(g, R({}, _, {
      theme: jn({
        theme: _.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : g, E = (g, ..._) => {
      let L = O(g);
      const H = _ ? _.map(O) : [];
      c && w && H.push((k) => {
        const B = jn(R({}, k, {
          defaultTheme: n,
          themeId: t
        }));
        if (!B.components || !B.components[c] || !B.components[c].styleOverrides)
          return null;
        const D = B.components[c].styleOverrides, J = {};
        return Object.entries(D).forEach(([q, U]) => {
          J[q] = Gn(U, R({}, k, {
            theme: B
          }));
        }), w(k, J);
      }), c && !v && H.push((k) => {
        var B;
        const D = jn(R({}, k, {
          defaultTheme: n,
          themeId: t
        })), J = D == null || (B = D.components) == null || (B = B[c]) == null ? void 0 : B.variants;
        return Gn({
          variants: J
        }, R({}, k, {
          theme: D
        }));
      }), f || H.push(a);
      const C = H.length - _.length;
      if (Array.isArray(g) && C > 0) {
        const k = new Array(C).fill("");
        L = [...g, ...k], L.raw = [...g.raw, ...k];
      }
      const P = I(L, ...H);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${We(d || "")}`), k === void 0 && (k = `Styled(${ad(i)})`), P.displayName = k;
      }
      return i.muiName && (P.muiName = i.muiName), P;
    };
    return I.withConfig && (E.withConfig = I.withConfig), E;
  };
}
function Bp(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : Gi(t.components[n].defaultProps, r);
}
function jp({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = Zi(n);
  return r && (o = o[r] || o), Bp({
    theme: o,
    name: t,
    props: e
  });
}
function Eo(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), Od(e, t, n);
}
function Vp(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Nt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Nt(Vp(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Vt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Vt(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function gr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Lp(e) {
  e = Nt(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), i = (d, p = (d + n / 30) % 12) => o - a * Math.max(Math.min(p - 3, 9 - p, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), gr({
    type: l,
    values: c
  });
}
function Ea(e) {
  e = Nt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Nt(Lp(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Ta(e, t) {
  const n = Ea(e), r = Ea(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function Qi(e, t) {
  return e = Nt(e), t = Eo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, gr(e);
}
function zp(e, t) {
  if (e = Nt(e), t = Eo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return gr(e);
}
function Fp(e, t) {
  if (e = Nt(e), t = Eo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return gr(e);
}
function Up(e, t) {
  return R({
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
const Gp = {
  black: "#000",
  white: "#fff"
}, bn = Gp, Hp = {
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
}, Xp = Hp, Yp = {
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
}, Ot = Yp, Wp = {
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
}, Rt = Wp, qp = {
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
}, Qt = qp, Kp = {
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
}, Pt = Kp, Jp = {
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
}, _t = Jp, Zp = {
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
}, $t = Zp, Qp = ["mode", "contrastThreshold", "tonalOffset"], Ca = {
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
    paper: bn.white,
    default: bn.white
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
}, jr = {
  text: {
    primary: bn.white,
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
    active: bn.white,
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
function Sa(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Fp(e.main, o) : t === "dark" && (e.dark = zp(e.main, a)));
}
function eu(e = "light") {
  return e === "dark" ? {
    main: Pt[200],
    light: Pt[50],
    dark: Pt[400]
  } : {
    main: Pt[700],
    light: Pt[400],
    dark: Pt[800]
  };
}
function tu(e = "light") {
  return e === "dark" ? {
    main: Ot[200],
    light: Ot[50],
    dark: Ot[400]
  } : {
    main: Ot[500],
    light: Ot[300],
    dark: Ot[700]
  };
}
function nu(e = "light") {
  return e === "dark" ? {
    main: Rt[500],
    light: Rt[300],
    dark: Rt[700]
  } : {
    main: Rt[700],
    light: Rt[400],
    dark: Rt[800]
  };
}
function ru(e = "light") {
  return e === "dark" ? {
    main: _t[400],
    light: _t[300],
    dark: _t[700]
  } : {
    main: _t[700],
    light: _t[500],
    dark: _t[900]
  };
}
function ou(e = "light") {
  return e === "dark" ? {
    main: $t[400],
    light: $t[300],
    dark: $t[700]
  } : {
    main: $t[800],
    light: $t[500],
    dark: $t[900]
  };
}
function au(e = "light") {
  return e === "dark" ? {
    main: Qt[400],
    light: Qt[300],
    dark: Qt[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: Qt[500],
    dark: Qt[900]
  };
}
function iu(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = Ne(e, Qp), a = e.primary || eu(t), i = e.secondary || tu(t), l = e.error || nu(t), c = e.info || ru(t), d = e.success || ou(t), p = e.warning || au(t);
  function h(f) {
    const m = Ta(f, jr.text.primary) >= n ? jr.text.primary : Ca.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const N = Ta(f, m);
      N < 3 && console.error([`MUI: The contrast ratio of ${N}:1 for ${m} on ${f}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return m;
  }
  const w = ({
    color: f,
    name: m,
    mainShade: N = 500,
    lightShade: I = 300,
    darkShade: O = 700
  }) => {
    if (f = R({}, f), !f.main && f[N] && (f.main = f[N]), !f.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${m ? ` (${m})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${N}\` property.` : Vt(11, m ? ` (${m})` : "", N));
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
} });` : Vt(12, m ? ` (${m})` : "", JSON.stringify(f.main)));
    return Sa(f, "light", I, r), Sa(f, "dark", O, r), f.contrastText || (f.contrastText = h(f.main)), f;
  }, b = {
    dark: jr,
    light: Ca
  };
  return process.env.NODE_ENV !== "production" && (b[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), Ze(R({
    // A collection of common colors.
    common: R({}, bn),
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
      color: p,
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
    grey: Xp,
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
const su = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function lu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Oa = {
  textTransform: "uppercase"
}, Ra = '"Roboto", "Helvetica", "Arial", sans-serif';
function cu(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Ra,
    // The default font size of the Material Specification.
    fontSize: o = 14,
    // px
    fontWeightLight: a = 300,
    fontWeightRegular: i = 400,
    fontWeightMedium: l = 500,
    fontWeightBold: c = 700,
    // Tell MUI what's the font-size on the html element.
    // 16px is the default font-size used by browsers.
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: p,
    pxToRem: h
  } = n, w = Ne(n, su);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const b = o / 14, v = h || ((N) => `${N / d * b}rem`), f = (N, I, O, E, g) => R({
    fontFamily: r,
    fontWeight: N,
    fontSize: v(I),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: O
  }, r === Ra ? {
    letterSpacing: `${lu(E / I)}em`
  } : {}, g, p), m = {
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
    button: f(l, 14, 1.75, 0.4, Oa),
    caption: f(i, 12, 1.66, 0.4),
    overline: f(i, 12, 2.66, 1, Oa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return Ze(R({
    htmlFontSize: d,
    pxToRem: v,
    fontFamily: r,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, m), w, {
    clone: !1
    // No need to clone deep
  });
}
const du = 0.2, pu = 0.14, uu = 0.12;
function fe(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${du})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${pu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${uu})`].join(",");
}
const wu = ["none", fe(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), fe(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), fe(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), fe(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), fe(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), fe(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), fe(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), fe(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), fe(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), fe(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), fe(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), fe(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), fe(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), fe(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), fe(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), fe(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), fe(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), fe(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), fe(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), fe(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), fe(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), fe(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), fe(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), fe(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], fu = wu, mu = ["duration", "easing", "delay"], hu = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, gu = {
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
function Pa(e) {
  return `${Math.round(e)}ms`;
}
function bu(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function vu(e) {
  const t = R({}, hu, e.easing), n = R({}, gu, e.duration);
  return R({
    getAutoHeightDuration: bu,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, d = Ne(a, mu);
      if (process.env.NODE_ENV !== "production") {
        const p = (w) => typeof w == "string", h = (w) => !isNaN(parseFloat(w));
        !p(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !h(i) && !p(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), p(l) || console.error('MUI: Argument "easing" must be a string.'), !h(c) && !p(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((p) => `${p} ${typeof i == "string" ? i : Pa(i)} ${l} ${typeof c == "string" ? c : Pa(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const yu = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, xu = yu, Nu = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function ku(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = Ne(e, Nu);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Vt(18));
  const l = iu(r), c = ko(e);
  let d = Ze(c, {
    mixins: Up(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: fu.slice(),
    typography: cu(l, a),
    transitions: vu(o),
    zIndex: R({}, xu)
  });
  if (d = Ze(d, i), d = t.reduce((p, h) => Ze(p, h), d), process.env.NODE_ENV !== "production") {
    const p = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], h = (w, b) => {
      let v;
      for (v in w) {
        const f = w[v];
        if (p.indexOf(v) !== -1 && Object.keys(f).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const m = lr("", v);
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
  return d.unstable_sxConfig = R({}, xo, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(h) {
    return No({
      sx: h,
      theme: this
    });
  }, d;
}
const Eu = ku(), To = Eu, Co = "$$material";
function So({
  props: e,
  name: t
}) {
  return jp({
    props: e,
    name: t,
    defaultTheme: To,
    themeId: Co
  });
}
const Tu = (e) => Un(e) && e !== "classes", Cu = Mp({
  themeId: Co,
  defaultTheme: To,
  rootShouldForwardProp: Tu
}), On = Cu;
function Su(e) {
  return lr("MuiSvgIcon", e);
}
Yi("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Ou = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ru = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${We(t)}`, `fontSize${We(n)}`]
  };
  return bo(o, Su, r);
}, Pu = On("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${We(n.color)}`], t[`fontSize${We(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, a, i, l, c, d, p, h, w, b, v;
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
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((d = e.typography) == null || (p = d.pxToRem) == null ? void 0 : p.call(d, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (h = (w = (e.vars || e).palette) == null || (w = w[t.color]) == null ? void 0 : w.main) != null ? h : {
      action: (b = (e.vars || e).palette) == null || (b = b.action) == null ? void 0 : b.active,
      disabled: (v = (e.vars || e).palette) == null || (v = v.action) == null ? void 0 : v.disabled,
      inherit: void 0
    }[t.color]
  };
}), Oo = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const r = So({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: p = !1,
    titleAccess: h,
    viewBox: w = "0 0 24 24"
  } = r, b = Ne(r, Ou), v = /* @__PURE__ */ M.isValidElement(o) && o.type === "svg", f = R({}, r, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: p,
    viewBox: w,
    hasSvgAsChild: v
  }), m = {};
  p || (m.viewBox = w);
  const N = Ru(f);
  return /* @__PURE__ */ x(Pu, R({
    as: l,
    className: bt(N.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": h ? void 0 : !0,
    role: h ? "img" : void 0,
    ref: n
  }, m, b, v && o.props, {
    ownerState: f,
    children: [v ? o.props.children : o, h ? /* @__PURE__ */ s("title", {
      children: h
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Oo.propTypes = {
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
Oo.muiName = "SvgIcon";
const _a = Oo;
function es(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ s(_a, R({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = _a.muiName, /* @__PURE__ */ M.memo(/* @__PURE__ */ M.forwardRef(n));
}
const _u = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Hi.configure(e);
  }
}, $u = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: We,
  createChainedFunction: sd,
  createSvgIcon: es,
  debounce: ld,
  deprecatedPropType: cd,
  isMuiElement: dd,
  ownerDocument: Xn,
  ownerWindow: pd,
  requirePropFactory: ud,
  setRef: Yn,
  unstable_ClassNameGenerator: _u,
  unstable_useEnhancedEffect: Lt,
  unstable_useId: zi,
  unsupportedProp: md,
  useControlled: Fi,
  useEventCallback: Yr,
  useForkRef: xt,
  useIsFocusVisible: Ui
}, Symbol.toStringTag, { value: "Module" })), Iu = /* @__PURE__ */ zc($u);
var $a;
function Au() {
  return $a || ($a = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Iu;
  }(Pr)), Pr;
}
var Du = Fc;
Object.defineProperty(mo, "__esModule", {
  value: !0
});
var ts = mo.default = void 0, Mu = Du(Au()), Bu = Ds;
ts = mo.default = (0, Mu.default)(/* @__PURE__ */ (0, Bu.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function ju(e) {
  return typeof e == "string";
}
function on(e, t, n) {
  return e === void 0 || ju(e) ? t : R({}, t, {
    ownerState: R({}, t.ownerState, n)
  });
}
const Vu = {
  disableDefaultClasses: !1
}, Lu = /* @__PURE__ */ M.createContext(Vu);
function zu(e) {
  const {
    disableDefaultClasses: t
  } = M.useContext(Lu);
  return (n) => t ? "" : e(n);
}
function Fu(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Uu(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Ia(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Gu(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const b = bt(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = R({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), f = R({}, n, o, r);
    return b.length > 0 && (f.className = b), Object.keys(v).length > 0 && (f.style = v), {
      props: f,
      internalRef: void 0
    };
  }
  const i = Fu(R({}, o, r)), l = Ia(r), c = Ia(o), d = t(i), p = bt(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = R({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = R({}, d, n, c, l);
  return p.length > 0 && (w.className = p), Object.keys(h).length > 0 && (w.style = h), {
    props: w,
    internalRef: d.ref
  };
}
const Hu = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Xu(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = Ne(e, Hu), l = a ? {} : Uu(r, o), {
    props: c,
    internalRef: d
  } = Gu(R({}, i, {
    externalSlotProps: l
  })), p = xt(d, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return on(n, R({}, c, {
    ref: p
  }), o);
}
const ns = "base";
function Yu(e) {
  return `${ns}--${e}`;
}
function Wu(e, t) {
  return `${ns}-${e}-${t}`;
}
function rs(e, t) {
  const n = Xi[t];
  return n ? Yu(n) : Wu(e, t);
}
function qu(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = rs(e, r);
  }), n;
}
function Ku(e) {
  return typeof e == "function" ? e() : e;
}
const qn = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = M.useState(null), c = xt(/* @__PURE__ */ M.isValidElement(r) ? r.ref : null, n);
  if (Lt(() => {
    a || l(Ku(o) || document.body);
  }, [o, a]), Lt(() => {
    if (i && !a)
      return Yn(n, i), () => {
        Yn(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ M.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ M.cloneElement(r, d);
    }
    return /* @__PURE__ */ s(M.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ s(M.Fragment, {
    children: i && /* @__PURE__ */ Ol.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (qn.propTypes = {
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
  container: u.oneOfType([gn, u.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: u.bool
});
process.env.NODE_ENV !== "production" && (qn["propTypes"] = ed(qn.propTypes));
var Ce = "top", je = "bottom", Ve = "right", Se = "left", Ro = "auto", Rn = [Ce, je, Ve, Se], zt = "start", vn = "end", Ju = "clippingParents", os = "viewport", en = "popper", Zu = "reference", Aa = /* @__PURE__ */ Rn.reduce(function(e, t) {
  return e.concat([t + "-" + zt, t + "-" + vn]);
}, []), as = /* @__PURE__ */ [].concat(Rn, [Ro]).reduce(function(e, t) {
  return e.concat([t, t + "-" + zt, t + "-" + vn]);
}, []), Qu = "beforeRead", ew = "read", tw = "afterRead", nw = "beforeMain", rw = "main", ow = "afterMain", aw = "beforeWrite", iw = "write", sw = "afterWrite", lw = [Qu, ew, tw, nw, rw, ow, aw, iw, sw];
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
function kt(e) {
  var t = Ae(e).Element;
  return e instanceof t || e instanceof Element;
}
function Be(e) {
  var t = Ae(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Po(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ae(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function cw(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Be(a) || !qe(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function dw(e) {
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
      var o = t.elements[r], a = t.attributes[r] || {}, i = Object.keys(t.styles.hasOwnProperty(r) ? t.styles[r] : n[r]), l = i.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Be(o) || !qe(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const pw = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: cw,
  effect: dw,
  requires: ["computeStyles"]
};
function Xe(e) {
  return e.split("-")[0];
}
var vt = Math.max, Kn = Math.min, Ft = Math.round;
function qr() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function is() {
  return !/^((?!chrome|android).)*safari/i.test(qr());
}
function Ut(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && Be(e) && (o = e.offsetWidth > 0 && Ft(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Ft(r.height) / e.offsetHeight || 1);
  var i = kt(e) ? Ae(e) : window, l = i.visualViewport, c = !is() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, p = (r.top + (c && l ? l.offsetTop : 0)) / a, h = r.width / o, w = r.height / a;
  return {
    width: h,
    height: w,
    top: p,
    right: d + h,
    bottom: p + w,
    left: d,
    x: d,
    y: p
  };
}
function _o(e) {
  var t = Ut(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function ss(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Po(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function et(e) {
  return Ae(e).getComputedStyle(e);
}
function uw(e) {
  return ["table", "td", "th"].indexOf(qe(e)) >= 0;
}
function lt(e) {
  return ((kt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function br(e) {
  return qe(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Po(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    lt(e)
  );
}
function Da(e) {
  return !Be(e) || // https://github.com/popperjs/popper-core/issues/837
  et(e).position === "fixed" ? null : e.offsetParent;
}
function ww(e) {
  var t = /firefox/i.test(qr()), n = /Trident/i.test(qr());
  if (n && Be(e)) {
    var r = et(e);
    if (r.position === "fixed")
      return null;
  }
  var o = br(e);
  for (Po(o) && (o = o.host); Be(o) && ["html", "body"].indexOf(qe(o)) < 0; ) {
    var a = et(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Pn(e) {
  for (var t = Ae(e), n = Da(e); n && uw(n) && et(n).position === "static"; )
    n = Da(n);
  return n && (qe(n) === "html" || qe(n) === "body" && et(n).position === "static") ? t : n || ww(e) || t;
}
function $o(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function dn(e, t, n) {
  return vt(e, Kn(t, n));
}
function fw(e, t, n) {
  var r = dn(e, t, n);
  return r > n ? n : r;
}
function ls() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function cs(e) {
  return Object.assign({}, ls(), e);
}
function ds(e, t) {
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var mw = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, cs(typeof t != "number" ? t : ds(t, Rn));
};
function hw(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = Xe(n.placement), c = $o(l), d = [Se, Ve].indexOf(l) >= 0, p = d ? "height" : "width";
  if (!(!a || !i)) {
    var h = mw(o.padding, n), w = _o(a), b = c === "y" ? Ce : Se, v = c === "y" ? je : Ve, f = n.rects.reference[p] + n.rects.reference[c] - i[c] - n.rects.popper[p], m = i[c] - n.rects.reference[c], N = Pn(a), I = N ? c === "y" ? N.clientHeight || 0 : N.clientWidth || 0 : 0, O = f / 2 - m / 2, E = h[b], g = I - w[p] - h[v], _ = I / 2 - w[p] / 2 + O, L = dn(E, _, g), H = c;
    n.modifiersData[r] = (t = {}, t[H] = L, t.centerOffset = L - _, t);
  }
}
function gw(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ss(t.elements.popper, o) && (t.elements.arrow = o));
}
const bw = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: hw,
  effect: gw,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function Gt(e) {
  return e.split("-")[1];
}
var vw = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function yw(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Ft(n * o) / o || 0,
    y: Ft(r * o) / o || 0
  };
}
function Ma(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, d = e.adaptive, p = e.roundOffsets, h = e.isFixed, w = i.x, b = w === void 0 ? 0 : w, v = i.y, f = v === void 0 ? 0 : v, m = typeof p == "function" ? p({
    x: b,
    y: f
  }) : {
    x: b,
    y: f
  };
  b = m.x, f = m.y;
  var N = i.hasOwnProperty("x"), I = i.hasOwnProperty("y"), O = Se, E = Ce, g = window;
  if (d) {
    var _ = Pn(n), L = "clientHeight", H = "clientWidth";
    if (_ === Ae(n) && (_ = lt(n), et(_).position !== "static" && l === "absolute" && (L = "scrollHeight", H = "scrollWidth")), _ = _, o === Ce || (o === Se || o === Ve) && a === vn) {
      E = je;
      var C = h && _ === g && g.visualViewport ? g.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        _[L]
      );
      f -= C - r.height, f *= c ? 1 : -1;
    }
    if (o === Se || (o === Ce || o === je) && a === vn) {
      O = Ve;
      var P = h && _ === g && g.visualViewport ? g.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        _[H]
      );
      b -= P - r.width, b *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, d && vw), B = p === !0 ? yw({
    x: b,
    y: f
  }, Ae(n)) : {
    x: b,
    y: f
  };
  if (b = B.x, f = B.y, c) {
    var D;
    return Object.assign({}, k, (D = {}, D[E] = I ? "0" : "", D[O] = N ? "0" : "", D.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + b + "px, " + f + "px)" : "translate3d(" + b + "px, " + f + "px, 0)", D));
  }
  return Object.assign({}, k, (t = {}, t[E] = I ? f + "px" : "", t[O] = N ? b + "px" : "", t.transform = "", t));
}
function xw(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Xe(t.placement),
    variation: Gt(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Ma(Object.assign({}, d, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Ma(Object.assign({}, d, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Nw = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: xw,
  data: {}
};
var Vn = {
  passive: !0
};
function kw(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, c = Ae(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && d.forEach(function(p) {
    p.addEventListener("scroll", n.update, Vn);
  }), l && c.addEventListener("resize", n.update, Vn), function() {
    a && d.forEach(function(p) {
      p.removeEventListener("scroll", n.update, Vn);
    }), l && c.removeEventListener("resize", n.update, Vn);
  };
}
const Ew = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: kw,
  data: {}
};
var Tw = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function Hn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Tw[t];
  });
}
var Cw = {
  start: "end",
  end: "start"
};
function Ba(e) {
  return e.replace(/start|end/g, function(t) {
    return Cw[t];
  });
}
function Io(e) {
  var t = Ae(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Ao(e) {
  return Ut(lt(e)).left + Io(e).scrollLeft;
}
function Sw(e, t) {
  var n = Ae(e), r = lt(e), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = is();
    (d || !d && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Ao(e),
    y: c
  };
}
function Ow(e) {
  var t, n = lt(e), r = Io(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = vt(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = vt(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Ao(e), c = -r.scrollTop;
  return et(o || n).direction === "rtl" && (l += vt(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function Do(e) {
  var t = et(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function ps(e) {
  return ["html", "body", "#document"].indexOf(qe(e)) >= 0 ? e.ownerDocument.body : Be(e) && Do(e) ? e : ps(br(e));
}
function pn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = ps(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = Ae(r), i = o ? [a].concat(a.visualViewport || [], Do(r) ? r : []) : r, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(pn(br(i)))
  );
}
function Kr(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Rw(e, t) {
  var n = Ut(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ja(e, t, n) {
  return t === os ? Kr(Sw(e, n)) : kt(t) ? Rw(t, n) : Kr(Ow(lt(e)));
}
function Pw(e) {
  var t = pn(br(e)), n = ["absolute", "fixed"].indexOf(et(e).position) >= 0, r = n && Be(e) ? Pn(e) : e;
  return kt(r) ? t.filter(function(o) {
    return kt(o) && ss(o, r) && qe(o) !== "body";
  }) : [];
}
function _w(e, t, n, r) {
  var o = t === "clippingParents" ? Pw(e) : [].concat(t), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(c, d) {
    var p = ja(e, d, r);
    return c.top = vt(p.top, c.top), c.right = Kn(p.right, c.right), c.bottom = Kn(p.bottom, c.bottom), c.left = vt(p.left, c.left), c;
  }, ja(e, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function us(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Xe(r) : null, a = r ? Gt(r) : null, i = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
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
  var d = o ? $o(o) : null;
  if (d != null) {
    var p = d === "y" ? "height" : "width";
    switch (a) {
      case zt:
        c[d] = c[d] - (t[p] / 2 - n[p] / 2);
        break;
      case vn:
        c[d] = c[d] + (t[p] / 2 - n[p] / 2);
        break;
    }
  }
  return c;
}
function yn(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, i = a === void 0 ? e.strategy : a, l = n.boundary, c = l === void 0 ? Ju : l, d = n.rootBoundary, p = d === void 0 ? os : d, h = n.elementContext, w = h === void 0 ? en : h, b = n.altBoundary, v = b === void 0 ? !1 : b, f = n.padding, m = f === void 0 ? 0 : f, N = cs(typeof m != "number" ? m : ds(m, Rn)), I = w === en ? Zu : en, O = e.rects.popper, E = e.elements[v ? I : w], g = _w(kt(E) ? E : E.contextElement || lt(e.elements.popper), c, p, i), _ = Ut(e.elements.reference), L = us({
    reference: _,
    element: O,
    strategy: "absolute",
    placement: o
  }), H = Kr(Object.assign({}, O, L)), C = w === en ? H : _, P = {
    top: g.top - C.top + N.top,
    bottom: C.bottom - g.bottom + N.bottom,
    left: g.left - C.left + N.left,
    right: C.right - g.right + N.right
  }, k = e.modifiersData.offset;
  if (w === en && k) {
    var B = k[o];
    Object.keys(P).forEach(function(D) {
      var J = [Ve, je].indexOf(D) >= 0 ? 1 : -1, q = [Ce, je].indexOf(D) >= 0 ? "y" : "x";
      P[D] += B[q] * J;
    });
  }
  return P;
}
function $w(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? as : c, p = Gt(r), h = p ? l ? Aa : Aa.filter(function(v) {
    return Gt(v) === p;
  }) : Rn, w = h.filter(function(v) {
    return d.indexOf(v) >= 0;
  });
  w.length === 0 && (w = h);
  var b = w.reduce(function(v, f) {
    return v[f] = yn(e, {
      placement: f,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Xe(f)], v;
  }, {});
  return Object.keys(b).sort(function(v, f) {
    return b[v] - b[f];
  });
}
function Iw(e) {
  if (Xe(e) === Ro)
    return [];
  var t = Hn(e);
  return [Ba(e), t, Ba(t)];
}
function Aw(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, c = n.fallbackPlacements, d = n.padding, p = n.boundary, h = n.rootBoundary, w = n.altBoundary, b = n.flipVariations, v = b === void 0 ? !0 : b, f = n.allowedAutoPlacements, m = t.options.placement, N = Xe(m), I = N === m, O = c || (I || !v ? [Hn(m)] : Iw(m)), E = [m].concat(O).reduce(function(V, W) {
      return V.concat(Xe(W) === Ro ? $w(t, {
        placement: W,
        boundary: p,
        rootBoundary: h,
        padding: d,
        flipVariations: v,
        allowedAutoPlacements: f
      }) : W);
    }, []), g = t.rects.reference, _ = t.rects.popper, L = /* @__PURE__ */ new Map(), H = !0, C = E[0], P = 0; P < E.length; P++) {
      var k = E[P], B = Xe(k), D = Gt(k) === zt, J = [Ce, je].indexOf(B) >= 0, q = J ? "width" : "height", U = yn(t, {
        placement: k,
        boundary: p,
        rootBoundary: h,
        altBoundary: w,
        padding: d
      }), ee = J ? D ? Ve : Se : D ? je : Ce;
      g[q] > _[q] && (ee = Hn(ee));
      var ae = Hn(ee), re = [];
      if (a && re.push(U[B] <= 0), l && re.push(U[ee] <= 0, U[ae] <= 0), re.every(function(V) {
        return V;
      })) {
        C = k, H = !1;
        break;
      }
      L.set(k, re);
    }
    if (H)
      for (var y = v ? 3 : 1, S = function(W) {
        var X = E.find(function(Y) {
          var G = L.get(Y);
          if (G)
            return G.slice(0, W).every(function(K) {
              return K;
            });
        });
        if (X)
          return C = X, "break";
      }, z = y; z > 0; z--) {
        var F = S(z);
        if (F === "break")
          break;
      }
    t.placement !== C && (t.modifiersData[r]._skip = !0, t.placement = C, t.reset = !0);
  }
}
const Dw = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Aw,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Va(e, t, n) {
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
function La(e) {
  return [Ce, Ve, je, Se].some(function(t) {
    return e[t] >= 0;
  });
}
function Mw(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = yn(t, {
    elementContext: "reference"
  }), l = yn(t, {
    altBoundary: !0
  }), c = Va(i, r), d = Va(l, o, a), p = La(c), h = La(d);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: p,
    hasPopperEscaped: h
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": h
  });
}
const Bw = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Mw
};
function jw(e, t, n) {
  var r = Xe(e), o = [Se, Ce].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Se, Ve].indexOf(r) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Vw(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = as.reduce(function(p, h) {
    return p[h] = jw(h, t.rects, a), p;
  }, {}), l = i[t.placement], c = l.x, d = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += d), t.modifiersData[r] = i;
}
const Lw = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Vw
};
function zw(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = us({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Fw = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: zw,
  data: {}
};
function Uw(e) {
  return e === "x" ? "y" : "x";
}
function Gw(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, c = n.boundary, d = n.rootBoundary, p = n.altBoundary, h = n.padding, w = n.tether, b = w === void 0 ? !0 : w, v = n.tetherOffset, f = v === void 0 ? 0 : v, m = yn(t, {
    boundary: c,
    rootBoundary: d,
    padding: h,
    altBoundary: p
  }), N = Xe(t.placement), I = Gt(t.placement), O = !I, E = $o(N), g = Uw(E), _ = t.modifiersData.popperOffsets, L = t.rects.reference, H = t.rects.popper, C = typeof f == "function" ? f(Object.assign({}, t.rects, {
    placement: t.placement
  })) : f, P = typeof C == "number" ? {
    mainAxis: C,
    altAxis: C
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, C), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, B = {
    x: 0,
    y: 0
  };
  if (_) {
    if (a) {
      var D, J = E === "y" ? Ce : Se, q = E === "y" ? je : Ve, U = E === "y" ? "height" : "width", ee = _[E], ae = ee + m[J], re = ee - m[q], y = b ? -H[U] / 2 : 0, S = I === zt ? L[U] : H[U], z = I === zt ? -H[U] : -L[U], F = t.elements.arrow, V = b && F ? _o(F) : {
        width: 0,
        height: 0
      }, W = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : ls(), X = W[J], Y = W[q], G = dn(0, L[U], V[U]), K = O ? L[U] / 2 - y - G - X - P.mainAxis : S - G - X - P.mainAxis, Z = O ? -L[U] / 2 + y + G + Y + P.mainAxis : z + G + Y + P.mainAxis, de = t.elements.arrow && Pn(t.elements.arrow), $ = de ? E === "y" ? de.clientTop || 0 : de.clientLeft || 0 : 0, xe = (D = k == null ? void 0 : k[E]) != null ? D : 0, j = ee + K - xe - $, ye = ee + Z - xe, ze = dn(b ? Kn(ae, j) : ae, ee, b ? vt(re, ye) : re);
      _[E] = ze, B[E] = ze - ee;
    }
    if (l) {
      var ct, ke = E === "x" ? Ce : Se, $n = E === "x" ? je : Ve, Fe = _[g], Et = g === "y" ? "height" : "width", dt = Fe + m[ke], Tt = Fe - m[$n], Ct = [Ce, Se].indexOf(N) !== -1, St = (ct = k == null ? void 0 : k[g]) != null ? ct : 0, pt = Ct ? dt : Fe - L[Et] - H[Et] - St + P.altAxis, Xt = Ct ? Fe + L[Et] + H[Et] - St - P.altAxis : Tt, In = b && Ct ? fw(pt, Fe, Xt) : dn(b ? pt : dt, Fe, b ? Xt : Tt);
      _[g] = In, B[g] = In - Fe;
    }
    t.modifiersData[r] = B;
  }
}
const Hw = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Gw,
  requiresIfExists: ["offset"]
};
function Xw(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Yw(e) {
  return e === Ae(e) || !Be(e) ? Io(e) : Xw(e);
}
function Ww(e) {
  var t = e.getBoundingClientRect(), n = Ft(t.width) / e.offsetWidth || 1, r = Ft(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function qw(e, t, n) {
  n === void 0 && (n = !1);
  var r = Be(t), o = Be(t) && Ww(t), a = lt(t), i = Ut(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((qe(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Do(a)) && (l = Yw(t)), Be(t) ? (c = Ut(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Ao(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Kw(e) {
  var t = /* @__PURE__ */ new Map(), n = /* @__PURE__ */ new Set(), r = [];
  e.forEach(function(a) {
    t.set(a.name, a);
  });
  function o(a) {
    n.add(a.name);
    var i = [].concat(a.requires || [], a.requiresIfExists || []);
    i.forEach(function(l) {
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
function Jw(e) {
  var t = Kw(e);
  return lw.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Zw(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Qw(e) {
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
var za = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function Fa() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function ef(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? za : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, za, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, h = [], w = !1, b = {
      state: p,
      setOptions: function(N) {
        var I = typeof N == "function" ? N(p.options) : N;
        f(), p.options = Object.assign({}, a, p.options, I), p.scrollParents = {
          reference: kt(l) ? pn(l) : l.contextElement ? pn(l.contextElement) : [],
          popper: pn(c)
        };
        var O = Jw(Qw([].concat(r, p.options.modifiers)));
        return p.orderedModifiers = O.filter(function(E) {
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
          var N = p.elements, I = N.reference, O = N.popper;
          if (Fa(I, O)) {
            p.rects = {
              reference: qw(I, Pn(O), p.options.strategy === "fixed"),
              popper: _o(O)
            }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(P) {
              return p.modifiersData[P.name] = Object.assign({}, P.data);
            });
            for (var E = 0; E < p.orderedModifiers.length; E++) {
              if (p.reset === !0) {
                p.reset = !1, E = -1;
                continue;
              }
              var g = p.orderedModifiers[E], _ = g.fn, L = g.options, H = L === void 0 ? {} : L, C = g.name;
              typeof _ == "function" && (p = _({
                state: p,
                options: H,
                name: C,
                instance: b
              }) || p);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Zw(function() {
        return new Promise(function(m) {
          b.forceUpdate(), m(p);
        });
      }),
      destroy: function() {
        f(), w = !0;
      }
    };
    if (!Fa(l, c))
      return b;
    b.setOptions(d).then(function(m) {
      !w && d.onFirstUpdate && d.onFirstUpdate(m);
    });
    function v() {
      p.orderedModifiers.forEach(function(m) {
        var N = m.name, I = m.options, O = I === void 0 ? {} : I, E = m.effect;
        if (typeof E == "function") {
          var g = E({
            state: p,
            name: N,
            instance: b,
            options: O
          }), _ = function() {
          };
          h.push(g || _);
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
var tf = [Ew, Fw, Nw, pw, Lw, Dw, Hw, bw, Bw], nf = /* @__PURE__ */ ef({
  defaultModifiers: tf
});
const ws = "Popper";
function rf(e) {
  return rs(ws, e);
}
qu(ws, ["root"]);
const of = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], af = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function sf(e, t) {
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
function Jn(e) {
  return typeof e == "function" ? e() : e;
}
function vr(e) {
  return e.nodeType !== void 0;
}
function lf(e) {
  return !vr(e);
}
const cf = () => bo({
  root: ["root"]
}, zu(rf)), df = {}, pf = /* @__PURE__ */ M.forwardRef(function(t, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: p,
    popperOptions: h,
    popperRef: w,
    slotProps: b = {},
    slots: v = {},
    TransitionProps: f
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, m = Ne(t, of), N = M.useRef(null), I = xt(N, n), O = M.useRef(null), E = xt(O, w), g = M.useRef(E);
  Lt(() => {
    g.current = E;
  }, [E]), M.useImperativeHandle(w, () => O.current, []);
  const _ = sf(p, i), [L, H] = M.useState(_), [C, P] = M.useState(Jn(o));
  M.useEffect(() => {
    O.current && O.current.forceUpdate();
  }), M.useEffect(() => {
    o && P(Jn(o));
  }, [o]), Lt(() => {
    if (!C || !d)
      return;
    const q = (ae) => {
      H(ae.placement);
    };
    if (process.env.NODE_ENV !== "production" && C && vr(C) && C.nodeType === 1) {
      const ae = C.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && ae.top === 0 && ae.left === 0 && ae.right === 0 && ae.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: ae
      }) => {
        q(ae);
      }
    }];
    c != null && (U = U.concat(c)), h && h.modifiers != null && (U = U.concat(h.modifiers));
    const ee = nf(C, N.current, R({
      placement: _
    }, h, {
      modifiers: U
    }));
    return g.current(ee), () => {
      ee.destroy(), g.current(null);
    };
  }, [C, l, c, d, h, _]);
  const k = {
    placement: L
  };
  f !== null && (k.TransitionProps = f);
  const B = cf(), D = (r = v.root) != null ? r : "div", J = Xu({
    elementType: D,
    externalSlotProps: b.root,
    externalForwardedProps: m,
    additionalProps: {
      role: "tooltip",
      ref: I
    },
    ownerState: t,
    className: B.root
  });
  return /* @__PURE__ */ s(D, R({}, J, {
    children: typeof a == "function" ? a(k) : a
  }));
}), fs = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: p,
    placement: h = "bottom",
    popperOptions: w = df,
    popperRef: b,
    style: v,
    transition: f = !1,
    slotProps: m = {},
    slots: N = {}
  } = t, I = Ne(t, af), [O, E] = M.useState(!0), g = () => {
    E(!1);
  }, _ = () => {
    E(!0);
  };
  if (!c && !p && (!f || O))
    return null;
  let L;
  if (a)
    L = a;
  else if (r) {
    const P = Jn(r);
    L = P && vr(P) ? Xn(P).body : Xn(null).body;
  }
  const H = !p && c && (!f || O) ? "none" : void 0, C = f ? {
    in: p,
    onEnter: g,
    onExited: _
  } : void 0;
  return /* @__PURE__ */ s(qn, {
    disablePortal: l,
    container: L,
    children: /* @__PURE__ */ s(pf, R({
      anchorEl: r,
      direction: i,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: f ? !O : p,
      placement: h,
      popperOptions: w,
      popperRef: b,
      slotProps: m,
      slots: N
    }, I, {
      style: R({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: H
      }, v),
      TransitionProps: C,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (fs.propTypes = {
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
  anchorEl: ho(u.oneOfType([gn, u.object, u.func]), (e) => {
    if (e.open) {
      const t = Jn(e.anchorEl);
      if (t && vr(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || lf(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: u.oneOfType([gn, u.func]),
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
  popperRef: Li,
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
function ms() {
  const e = Zi(To);
  return process.env.NODE_ENV !== "production" && M.useDebugValue(e), e[Co] || e;
}
function Jr(e, t) {
  return Jr = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, Jr(e, t);
}
function uf(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, Jr(e, t);
}
const Ua = {
  disabled: !1
};
var wf = process.env.NODE_ENV !== "production" ? u.oneOfType([u.number, u.shape({
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
const hs = A.createContext(null);
var ff = function(t) {
  return t.scrollTop;
}, an = "unmounted", ft = "exited", mt = "entering", At = "entered", Zr = "exiting", tt = /* @__PURE__ */ function(e) {
  uf(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var i = o, l = i && !i.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = ft, a.appearStatus = mt) : c = At : r.unmountOnExit || r.mountOnEnter ? c = an : c = ft, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === an ? {
      status: ft
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== mt && i !== At && (a = mt) : (i === mt || i === At) && (a = Zr);
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
      if (this.cancelNextCallback(), a === mt) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Mn.findDOMNode(this);
          i && ff(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === ft && this.setState({
        status: an
      });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Mn.findDOMNode(this), l], d = c[0], p = c[1], h = this.getTimeouts(), w = l ? h.appear : h.enter;
    if (!o && !i || Ua.disabled) {
      this.safeSetState({
        status: At
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, p), this.safeSetState({
      status: mt
    }, function() {
      a.props.onEntering(d, p), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: At
        }, function() {
          a.props.onEntered(d, p);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Mn.findDOMNode(this);
    if (!a || Ua.disabled) {
      this.safeSetState({
        status: ft
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: Zr
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: ft
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Mn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], d = c[0], p = c[1];
      this.props.addEndListener(d, p);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === an)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = Ne(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ A.createElement(hs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : A.cloneElement(A.Children.only(i), l))
    );
  }, t;
}(A.Component);
tt.contextType = hs;
tt.propTypes = process.env.NODE_ENV !== "production" ? {
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
    current: typeof Element > "u" ? u.any : function(e, t, n, r, o, a) {
      var i = e[t];
      return u.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, a);
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
  timeout: function(t) {
    var n = wf;
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
function It() {
}
tt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: It,
  onEntering: It,
  onEntered: It,
  onExit: It,
  onExiting: It,
  onExited: It
};
tt.UNMOUNTED = an;
tt.EXITED = ft;
tt.ENTERING = mt;
tt.ENTERED = At;
tt.EXITING = Zr;
const mf = tt, hf = (e) => e.scrollTop;
function Ga(e, t) {
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
const gf = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function Qr(e) {
  return `scale(${e}, ${e ** 2})`;
}
const bf = {
  entering: {
    opacity: 1,
    transform: Qr(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Vr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Mo = /* @__PURE__ */ M.forwardRef(function(t, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: p,
    onExit: h,
    onExited: w,
    onExiting: b,
    style: v,
    timeout: f = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: m = mf
  } = t, N = Ne(t, gf), I = rn(), O = M.useRef(), E = ms(), g = M.useRef(null), _ = xt(g, a.ref, n), L = (q) => (U) => {
    if (q) {
      const ee = g.current;
      U === void 0 ? q(ee) : q(ee, U);
    }
  }, H = L(p), C = L((q, U) => {
    hf(q);
    const {
      duration: ee,
      delay: ae,
      easing: re
    } = Ga({
      style: v,
      timeout: f,
      easing: i
    }, {
      mode: "enter"
    });
    let y;
    f === "auto" ? (y = E.transitions.getAutoHeightDuration(q.clientHeight), O.current = y) : y = ee, q.style.transition = [E.transitions.create("opacity", {
      duration: y,
      delay: ae
    }), E.transitions.create("transform", {
      duration: Vr ? y : y * 0.666,
      delay: ae,
      easing: re
    })].join(","), c && c(q, U);
  }), P = L(d), k = L(b), B = L((q) => {
    const {
      duration: U,
      delay: ee,
      easing: ae
    } = Ga({
      style: v,
      timeout: f,
      easing: i
    }, {
      mode: "exit"
    });
    let re;
    f === "auto" ? (re = E.transitions.getAutoHeightDuration(q.clientHeight), O.current = re) : re = U, q.style.transition = [E.transitions.create("opacity", {
      duration: re,
      delay: ee
    }), E.transitions.create("transform", {
      duration: Vr ? re : re * 0.666,
      delay: Vr ? ee : ee || re * 0.333,
      easing: ae
    })].join(","), q.style.opacity = 0, q.style.transform = Qr(0.75), h && h(q);
  }), D = L(w);
  return /* @__PURE__ */ s(m, R({
    appear: o,
    in: l,
    nodeRef: g,
    onEnter: C,
    onEntered: P,
    onEntering: H,
    onExit: B,
    onExited: D,
    onExiting: k,
    addEndListener: (q) => {
      f === "auto" && I.start(O.current || 0, q), r && r(g.current, q);
    },
    timeout: f === "auto" ? null : f
  }, N, {
    children: (q, U) => /* @__PURE__ */ M.cloneElement(a, R({
      style: R({
        opacity: 0,
        transform: Qr(0.75),
        visibility: q === "exited" && !l ? "hidden" : void 0
      }, bf[q], v, a.props.style),
      ref: _
    }, U))
  }));
});
process.env.NODE_ENV !== "production" && (Mo.propTypes = {
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
  children: ji.isRequired,
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
Mo.muiSupportAuto = !0;
const Ha = Mo, vf = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], yf = On(fs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), gs = /* @__PURE__ */ M.forwardRef(function(t, n) {
  var r;
  const o = Ji(), a = So({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: d,
    container: p,
    disablePortal: h,
    keepMounted: w,
    modifiers: b,
    open: v,
    placement: f,
    popperOptions: m,
    popperRef: N,
    transition: I,
    slots: O,
    slotProps: E
  } = a, g = Ne(a, vf), _ = (r = O == null ? void 0 : O.root) != null ? r : c == null ? void 0 : c.Root, L = R({
    anchorEl: i,
    container: p,
    disablePortal: h,
    keepMounted: w,
    modifiers: b,
    open: v,
    placement: f,
    popperOptions: m,
    popperRef: N,
    transition: I
  }, g);
  return /* @__PURE__ */ s(yf, R({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: _
    },
    slotProps: E ?? d
  }, L, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (gs.propTypes = {
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
  anchorEl: u.oneOfType([gn, u.object, u.func]),
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
  container: u.oneOfType([gn, u.func]),
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
  popperRef: Li,
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
const bs = gs;
function xf(e) {
  return lr("MuiTooltip", e);
}
const Nf = Yi("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), rt = Nf, kf = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Ef(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Tf = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${We(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return bo(i, xf, t);
}, Cf = On(bs, {
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
}) => R({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${rt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${rt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${rt.arrow}`]: R({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${rt.arrow}`]: R({}, t.isRtl ? {
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
})), Sf = On("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${We(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => R({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : Qi(e.palette.grey[700], 0.92),
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
  lineHeight: `${Ef(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${rt.popper}[data-popper-placement*="left"] &`]: R({
    transformOrigin: "right center"
  }, t.isRtl ? R({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  }) : R({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  })),
  [`.${rt.popper}[data-popper-placement*="right"] &`]: R({
    transformOrigin: "left center"
  }, t.isRtl ? R({
    marginRight: "14px"
  }, t.touch && {
    marginRight: "24px"
  }) : R({
    marginLeft: "14px"
  }, t.touch && {
    marginLeft: "24px"
  })),
  [`.${rt.popper}[data-popper-placement*="top"] &`]: R({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${rt.popper}[data-popper-placement*="bottom"] &`]: R({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Of = On("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : Qi(e.palette.grey[700], 0.9),
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
const Xa = new Tn();
let tn = {
  x: 0,
  y: 0
};
function zn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const vs = /* @__PURE__ */ M.forwardRef(function(t, n) {
  var r, o, a, i, l, c, d, p, h, w, b, v, f, m, N, I, O, E, g;
  const _ = So({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: L = !1,
    children: H,
    components: C = {},
    componentsProps: P = {},
    describeChild: k = !1,
    disableFocusListener: B = !1,
    disableHoverListener: D = !1,
    disableInteractive: J = !1,
    disableTouchListener: q = !1,
    enterDelay: U = 100,
    enterNextDelay: ee = 0,
    enterTouchDelay: ae = 700,
    followCursor: re = !1,
    id: y,
    leaveDelay: S = 0,
    leaveTouchDelay: z = 1500,
    onClose: F,
    onOpen: V,
    open: W,
    placement: X = "bottom",
    PopperComponent: Y,
    PopperProps: G = {},
    slotProps: K = {},
    slots: Z = {},
    title: de,
    TransitionComponent: $ = Ha,
    TransitionProps: xe
  } = _, j = Ne(_, kf), ye = /* @__PURE__ */ M.isValidElement(H) ? H : /* @__PURE__ */ s("span", {
    children: H
  }), ze = ms(), ct = ze.direction === "rtl", [ke, $n] = M.useState(), [Fe, Et] = M.useState(null), dt = M.useRef(!1), Tt = J || re, Ct = rn(), St = rn(), pt = rn(), Xt = rn(), [In, Bo] = Fi({
    controlled: W,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let Ke = In;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: Q
    } = M.useRef(W !== void 0);
    M.useEffect(() => {
      ke && ke.disabled && !Q && de !== "" && ke.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [de, ke, Q]);
  }
  const yr = zi(y), Yt = M.useRef(), An = Yr(() => {
    Yt.current !== void 0 && (document.body.style.WebkitUserSelect = Yt.current, Yt.current = void 0), Xt.clear();
  });
  M.useEffect(() => An, [An]);
  const jo = (Q) => {
    Xa.clear(), Ln = !0, Bo(!0), V && !Ke && V(Q);
  }, Dn = Yr(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (Q) => {
      Xa.start(800 + S, () => {
        Ln = !1;
      }), Bo(!1), F && Ke && F(Q), Ct.start(ze.transitions.duration.shortest, () => {
        dt.current = !1;
      });
    }
  ), xr = (Q) => {
    dt.current && Q.type !== "touchstart" || (ke && ke.removeAttribute("title"), St.clear(), pt.clear(), U || Ln && ee ? St.start(Ln ? ee : U, () => {
      jo(Q);
    }) : jo(Q));
  }, Vo = (Q) => {
    St.clear(), pt.start(S, () => {
      Dn(Q);
    });
  }, {
    isFocusVisibleRef: Lo,
    onBlur: ks,
    onFocus: Es,
    ref: Ts
  } = Ui(), [, zo] = M.useState(!1), Fo = (Q) => {
    ks(Q), Lo.current === !1 && (zo(!1), Vo(Q));
  }, Uo = (Q) => {
    ke || $n(Q.currentTarget), Es(Q), Lo.current === !0 && (zo(!0), xr(Q));
  }, Go = (Q) => {
    dt.current = !0;
    const Pe = ye.props;
    Pe.onTouchStart && Pe.onTouchStart(Q);
  }, Ho = xr, Xo = Vo, Cs = (Q) => {
    Go(Q), pt.clear(), Ct.clear(), An(), Yt.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Xt.start(ae, () => {
      document.body.style.WebkitUserSelect = Yt.current, xr(Q);
    });
  }, Ss = (Q) => {
    ye.props.onTouchEnd && ye.props.onTouchEnd(Q), An(), pt.start(z, () => {
      Dn(Q);
    });
  };
  M.useEffect(() => {
    if (!Ke)
      return;
    function Q(Pe) {
      (Pe.key === "Escape" || Pe.key === "Esc") && Dn(Pe);
    }
    return document.addEventListener("keydown", Q), () => {
      document.removeEventListener("keydown", Q);
    };
  }, [Dn, Ke]);
  const Os = xt(ye.ref, Ts, $n, n);
  !de && de !== 0 && (Ke = !1);
  const Nr = M.useRef(), Rs = (Q) => {
    const Pe = ye.props;
    Pe.onMouseMove && Pe.onMouseMove(Q), tn = {
      x: Q.clientX,
      y: Q.clientY
    }, Nr.current && Nr.current.update();
  }, Wt = {}, kr = typeof de == "string";
  k ? (Wt.title = !Ke && kr && !D ? de : null, Wt["aria-describedby"] = Ke ? yr : null) : (Wt["aria-label"] = kr ? de : null, Wt["aria-labelledby"] = Ke && !kr ? yr : null);
  const De = R({}, Wt, j, ye.props, {
    className: bt(j.className, ye.props.className),
    onTouchStart: Go,
    ref: Os
  }, re ? {
    onMouseMove: Rs
  } : {});
  process.env.NODE_ENV !== "production" && (De["data-mui-internal-clone-element"] = !0, M.useEffect(() => {
    ke && !ke.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ke]));
  const qt = {};
  q || (De.onTouchStart = Cs, De.onTouchEnd = Ss), D || (De.onMouseOver = zn(Ho, De.onMouseOver), De.onMouseLeave = zn(Xo, De.onMouseLeave), Tt || (qt.onMouseOver = Ho, qt.onMouseLeave = Xo)), B || (De.onFocus = zn(Uo, De.onFocus), De.onBlur = zn(Fo, De.onBlur), Tt || (qt.onFocus = Uo, qt.onBlur = Fo)), process.env.NODE_ENV !== "production" && ye.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${ye.props.title}\` or the Tooltip component.`].join(`
`));
  const Ps = M.useMemo(() => {
    var Q;
    let Pe = [{
      name: "arrow",
      enabled: !!Fe,
      options: {
        element: Fe,
        padding: 4
      }
    }];
    return (Q = G.popperOptions) != null && Q.modifiers && (Pe = Pe.concat(G.popperOptions.modifiers)), R({}, G.popperOptions, {
      modifiers: Pe
    });
  }, [Fe, G]), Kt = R({}, _, {
    isRtl: ct,
    arrow: L,
    disableInteractive: Tt,
    placement: X,
    PopperComponentProp: Y,
    touch: dt.current
  }), Er = Tf(Kt), Yo = (r = (o = Z.popper) != null ? o : C.Popper) != null ? r : Cf, Wo = (a = (i = (l = Z.transition) != null ? l : C.Transition) != null ? i : $) != null ? a : Ha, qo = (c = (d = Z.tooltip) != null ? d : C.Tooltip) != null ? c : Sf, Ko = (p = (h = Z.arrow) != null ? h : C.Arrow) != null ? p : Of, _s = on(Yo, R({}, G, (w = K.popper) != null ? w : P.popper, {
    className: bt(Er.popper, G == null ? void 0 : G.className, (b = (v = K.popper) != null ? v : P.popper) == null ? void 0 : b.className)
  }), Kt), $s = on(Wo, R({}, xe, (f = K.transition) != null ? f : P.transition), Kt), Is = on(qo, R({}, (m = K.tooltip) != null ? m : P.tooltip, {
    className: bt(Er.tooltip, (N = (I = K.tooltip) != null ? I : P.tooltip) == null ? void 0 : N.className)
  }), Kt), As = on(Ko, R({}, (O = K.arrow) != null ? O : P.arrow, {
    className: bt(Er.arrow, (E = (g = K.arrow) != null ? g : P.arrow) == null ? void 0 : E.className)
  }), Kt);
  return /* @__PURE__ */ x(M.Fragment, {
    children: [/* @__PURE__ */ M.cloneElement(ye, De), /* @__PURE__ */ s(Yo, R({
      as: Y ?? bs,
      placement: X,
      anchorEl: re ? {
        getBoundingClientRect: () => ({
          top: tn.y,
          left: tn.x,
          right: tn.x,
          bottom: tn.y,
          width: 0,
          height: 0
        })
      } : ke,
      popperRef: Nr,
      open: ke ? Ke : !1,
      id: yr,
      transition: !0
    }, qt, _s, {
      popperOptions: Ps,
      children: ({
        TransitionProps: Q
      }) => /* @__PURE__ */ s(Wo, R({
        timeout: ze.transitions.duration.shorter
      }, Q, $s, {
        children: /* @__PURE__ */ x(qo, R({}, Is, {
          children: [de, L ? /* @__PURE__ */ s(Ko, R({}, As, {
            ref: Et
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (vs.propTypes = {
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
  children: ji.isRequired,
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
const Rf = vs;
function Ya(e, t, n) {
  return e ? /* @__PURE__ */ s(ai, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ s("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function ys(e) {
  const {
    onClick: t,
    label: n,
    tooltip: r,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: d = !1,
    isDense: p = !0,
    isSubMenuParent: h = !1,
    hasDisabledGutters: w = !1,
    hasDivider: b = !1,
    focusVisibleClassName: v,
    id: f,
    children: m
  } = e, N = /* @__PURE__ */ s(
    xl,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: p,
      disableGutters: w,
      divider: b,
      focusVisibleClassName: v,
      onClick: t,
      id: f,
      children: n ? /* @__PURE__ */ x(it, { children: [
        Ya(a, n, !0),
        /* @__PURE__ */ s(Nl, { primary: n, inset: !a && o }),
        h ? /* @__PURE__ */ s(ai, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ s(ts, {}) }) : Ya(i, n, !1)
      ] }) : m
    }
  );
  return r ? /* @__PURE__ */ s(Rf, { title: r, placement: "right", children: /* @__PURE__ */ s("div", { children: N }) }) : N;
}
function xs(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Pf(e) {
  const [t, n] = ue(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, i = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = xs(a).filter((p) => "menuItem" in p.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (p) => "menuItem" in p.group && p.group.menuItem === r.id
    ), /* @__PURE__ */ s(Ns, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ x(it, { children: [
    /* @__PURE__ */ s(ys, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ s(
      kl,
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
const _f = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Ns(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = Te(() => {
    const p = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      xs(t).filter((v) => !("menuItem" in v.group))
    ), h = Object.values(p).sort(
      (v, f) => (v.group.order || 0) - (f.group.order || 0)
    ), w = [];
    h.forEach((v) => {
      _f(v.id, t.items).forEach(
        (f) => w.push({ item: f, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const b = w.some(
      (v) => "iconPathBefore" in v.item && v.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: b };
  }, [o, t]), l = ({ item: p, isLastItemInGroup: h }) => ({
    className: "papi-menu-item",
    label: p.label,
    tooltip: p.tooltip,
    iconPathBefore: "iconPathBefore" in p ? p.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in p ? p.iconPathAfter : void 0,
    hasDivider: h,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ s("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ s("div", { role: "menu", "aria-label": d, children: a.map((p, h) => {
    const { item: w } = p, b = l(p);
    if ("command" in w) {
      const v = w.group + h;
      return /* @__PURE__ */ s(
        ys,
        {
          onClick: (f) => {
            n == null || n(f), r(w);
          },
          ...b
        },
        v
      );
    }
    return /* @__PURE__ */ s(
      Pf,
      {
        parentMenuItem: w,
        parentItemProps: b,
        ...e
      },
      d + w.id
    );
  }) }, d);
}
function $f(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ s(Ns, { ...e, includedGroups: a });
}
function If({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ x(
    ii,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ s("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ s(El, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ s(
          $f,
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
function Af({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Te(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? i.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${l} (${typeof d}) on menu ${r} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, r]);
  return /* @__PURE__ */ s(
    ii,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, l) => /* @__PURE__ */ s(
        If,
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
function Df(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const eo = (e, t, n = {}) => {
  const r = gt(t);
  r.current = t;
  const o = gt(n);
  o.current = Df(o.current);
  const [a, i] = ue(() => r.current), [l, c] = ue(!0);
  return at(() => {
    let d = !0;
    return c(!!e), (async () => {
      if (e) {
        const p = await e();
        d && (i(() => p), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [e]), [a, l];
}, Mf = es(/* @__PURE__ */ s("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Bf({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, d] = ue(!1), [p, h] = ue(!1), w = $e(() => {
    c && d(!1), h(!1);
  }, [c]), b = $e((E) => {
    E.stopPropagation(), d((g) => {
      const _ = !g;
      return _ && E.shiftKey ? h(!0) : _ || h(!1), _;
    });
  }, []), v = $e(
    (E) => (w(), r(E)),
    [r, w]
  ), [f, m] = ue({ top: 1, left: 1 });
  at(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const g = E.getBoundingClientRect(), _ = window.scrollY, L = window.scrollX, H = g.top + _ + E.clientHeight, C = g.left + L;
        m({ top: H, left: C });
      }
    }
  }, [c, o]);
  const [N] = eo(
    $e(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [I] = eo(
    $e(async () => (e == null ? void 0 : e(!0)) ?? n ?? N, [e, n, N, c]),
    n ?? N
  ), O = p && I ? I : N;
  return /* @__PURE__ */ x(it, { children: [
    /* @__PURE__ */ s(
      si,
      {
        sx: {
          paddingTop: 0,
          paddingBottom: 0
        },
        edge: "start",
        className: `papi-menuButton ${a ?? ""}`,
        color: "inherit",
        "aria-label": `${i ?? ""} menu button`,
        onClick: b,
        children: l ?? /* @__PURE__ */ s(Mf, {})
      }
    ),
    /* @__PURE__ */ s(
      Tl,
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
        children: O ? /* @__PURE__ */ s(
          Af,
          {
            className: a,
            id: `${i ?? ""} main menu`,
            commandHandler: v,
            multiColumnMenu: O
          }
        ) : void 0
      }
    )
  ] });
}
function Lm({
  id: e,
  label: t,
  isDisabled: n = !1,
  tooltip: r,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: d
}) {
  return /* @__PURE__ */ s(
    si,
    {
      id: e,
      disabled: n,
      edge: a,
      size: i,
      "aria-label": t,
      title: o ? void 0 : r ?? t,
      className: `papi-icon-button ${l ?? ""}`,
      onClick: c,
      children: d
    }
  );
}
const _n = Zn(({ className: e, ...t }, n) => /* @__PURE__ */ s(el, { size: 35, className: T("tw-animate-spin", e), ...t, ref: n }));
_n.displayName = "Spinner";
function zm({
  id: e,
  isDisabled: t = !1,
  hasError: n = !1,
  isFullWidth: r = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: p,
  onChange: h,
  onFocus: w,
  onBlur: b
}) {
  return /* @__PURE__ */ x("div", { className: T("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ s(
      He,
      {
        htmlFor: e,
        className: T({
          "tw-text-red-600": n,
          "tw-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ s(
      kn,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: T(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: p,
        onChange: h,
        onFocus: w,
        onBlur: b
      }
    ),
    /* @__PURE__ */ s("p", { className: T({ "tw-hidden": !o }), children: o })
  ] });
}
function Fm({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = gt(void 0);
  return /* @__PURE__ */ s("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ s(Cl, { position: "static", id: r, children: /* @__PURE__ */ x(
    Sl,
    {
      className: T("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        e ? /* @__PURE__ */ s(
          Bf,
          {
            commandHandler: t,
            containerRef: a,
            menuProvider: e
          }
        ) : void 0,
        o ? /* @__PURE__ */ s("div", { className: "papi-toolbar-children", children: o }) : void 0
      ]
    }
  ) }) });
}
const jf = Nn(
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
), Vf = A.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ s("div", { ref: r, role: "alert", className: T(jf({ variant: t }), e), ...n }));
Vf.displayName = "Alert";
const Lf = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ x(
    "h5",
    {
      ref: n,
      className: T("tw-mb-1 tw-font-medium tw-leading-none tw-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Lf.displayName = "AlertTitle";
const zf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s("div", { ref: n, className: T("tw-text-sm [&_p]:tw-leading-relaxed", e), ...t }));
zf.displayName = "AlertDescription";
const Ff = Nn(
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
function Um({ className: e, variant: t, ...n }) {
  return /* @__PURE__ */ s("div", { className: T("pr-twp", Ff({ variant: t }), e), ...n });
}
const Uf = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: T(
        "pr-twp tw-rounded-lg tw-border tw-bg-card tw-text-card-foreground tw-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Uf.displayName = "Card";
const Gf = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: T("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", e),
      ...t
    }
  )
);
Gf.displayName = "CardHeader";
const Hf = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ s(
    "h3",
    {
      ref: n,
      className: T(
        "pr-twp tw-text-2xl tw-font-semibold tw-leading-none tw-tracking-tight",
        e
      ),
      ...t,
      children: t.children
    }
  )
);
Hf.displayName = "CardTitle";
const Xf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s("p", { ref: n, className: T("pr-twp tw-text-sm tw-text-muted-foreground", e), ...t }));
Xf.displayName = "CardDescription";
const Yf = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ s("div", { ref: n, className: T("pr-twp tw-p-6 tw-pt-0", e), ...t })
);
Yf.displayName = "CardContent";
const Wf = A.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ s(
    "div",
    {
      ref: n,
      className: T("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", e),
      ...t
    }
  )
);
Wf.displayName = "CardFooter";
function Gm({ ...e }) {
  return /* @__PURE__ */ s(
    Rl,
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
const qf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ x(
  nn.Root,
  {
    ref: n,
    className: T(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ s(nn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ s(nn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ s(nn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
qf.displayName = nn.Root.displayName;
const Kf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Ur.Root,
  {
    className: T(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ s(
      Ur.Thumb,
      {
        className: T(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0"
        )
      }
    )
  }
));
Kf.displayName = Ur.Root.displayName;
const Hm = Re.Root, Jf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.List,
  {
    ref: n,
    className: T(
      "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      e
    ),
    ...t
  }
));
Jf.displayName = Re.List.displayName;
const Zf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.Trigger,
  {
    ref: n,
    className: T(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      e
    ),
    ...t
  }
));
Zf.displayName = Re.Trigger.displayName;
const Qf = A.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ s(
  Re.Content,
  {
    ref: n,
    className: T(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      e
    ),
    ...t
  }
));
Qf.displayName = Re.Content.displayName;
function Xm({
  isInstalling: e,
  handleClick: t,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ s(
    me,
    {
      className: T(
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
      children: e ? /* @__PURE__ */ s(_n, { size: 15 }) : /* @__PURE__ */ x(it, { children: [
        /* @__PURE__ */ s(tl, { size: 25, className: T("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function Ym({
  isEnabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    me,
    {
      className: T(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ x(it, { children: [
        /* @__PURE__ */ s(_n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Wm({
  isDisabling: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    me,
    {
      className: T(
        "tw-h-8 tw-rounded-md tw-bg-gray-300 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-gray-400",
        {
          "tw-cursor-not-allowed tw-bg-gray-400": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ x(it, { children: [
        /* @__PURE__ */ s(_n, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function qm({
  isUpdating: e,
  handleClick: t,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ s(
    me,
    {
      className: T(
        "tw-h-8 tw-rounded-md tw-bg-blue-600 tw-px-4 tw-text-white tw-transition tw-duration-300 tw-ease-in-out hover:tw-bg-blue-700 hover:tw-text-white",
        {
          "tw-cursor-not-allowed tw-bg-blue-700": e
        },
        n
      ),
      onClick: t,
      ...r,
      children: e ? /* @__PURE__ */ x(it, { children: [
        /* @__PURE__ */ s(_n, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Km({
  id: e,
  markdown: t,
  className: n,
  anchorTarget: r
}) {
  const o = Te(
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
  return /* @__PURE__ */ s("div", { id: e, className: T("pr-twp tw-prose", n), children: /* @__PURE__ */ s(Pl, { options: o, children: t }) });
}
const em = Zn((e, t) => /* @__PURE__ */ x(
  me,
  {
    ref: t,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ s(nl, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ s(
        Qn,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var tm = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(tm || {});
function Jm({ id: e, groups: t }) {
  return /* @__PURE__ */ s("div", { id: e, children: /* @__PURE__ */ x(ao, { children: [
    /* @__PURE__ */ s(fi, { asChild: !0, children: /* @__PURE__ */ s(em, {}) }),
    /* @__PURE__ */ s(tr, { children: t.map((n) => /* @__PURE__ */ x("div", { children: [
      /* @__PURE__ */ s(En, { children: n.label }),
      /* @__PURE__ */ s(Hl, { children: n.items.map((r) => /* @__PURE__ */ s("div", { children: r.itemType === 0 ? /* @__PURE__ */ s(io, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ s(hi, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ s(nr, {})
    ] }, n.label)) })
  ] }) });
}
function Zm({ id: e, message: t }) {
  return /* @__PURE__ */ s("div", { id: e, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ s("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ s("p", { className: "tw-text-lg tw-text-gray-800", children: t }) }) });
}
function Qm({
  id: e,
  category: t,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new pl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ x(
    "div",
    {
      id: e,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: t }) }),
          /* @__PURE__ */ s("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ x("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ s(rl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ s("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ s("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ x("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ s("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ s(
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
                /* @__PURE__ */ s(ol, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
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
                /* @__PURE__ */ s(al, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function nm({ id: e, versionHistory: t }) {
  const [n, r] = ue(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), p = d.getUTCFullYear() - 1970, h = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let b = "";
    return p > 0 ? b = `${p.toString()} year${p === 1 ? "" : "s"} ago` : h > 0 ? b = `${h.toString()} month${h === 1 ? "" : "s"} ago` : w === 0 ? b = "today" : b = `${w.toString()} day${w === 1 ? "" : "s"} ago`, b;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ x("div", { id: e, children: [
    /* @__PURE__ */ s("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ s("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ x("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ s("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ s("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ s("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ x("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ x("div", { children: [
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
function eh({
  id: e,
  publisherDisplayName: t,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Te(() => ul(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((p) => d.of(p));
  })(r);
  return /* @__PURE__ */ s("div", { id: e, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ x("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ s(nm, { versionHistory: o }),
    /* @__PURE__ */ s("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ x("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ s("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ x("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: t }),
          /* @__PURE__ */ s("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ s("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ x("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ s("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ s("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const th = (e, t) => {
  at(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, Lr = () => !1, nh = (e, t) => {
  const [n] = eo(
    $e(async () => {
      if (!e)
        return Lr;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    Lr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  at(() => () => {
    n !== Lr && n();
  }, [n]);
};
function rm(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
rm(`*, ::before, ::after {
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
.tw-pe-3 {
  padding-inline-end: 0.75rem;
}
.tw-pe-9 {
  padding-inline-end: 2.25rem;
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state='selected']:hover {
  cursor: default;
}
`, "top");
export {
  Vf as Alert,
  zf as AlertDescription,
  Lf as AlertTitle,
  Tm as BOOK_SELECTOR_STRING_KEYS,
  Um as Badge,
  Em as BookChapterControl,
  fc as BookSelectionMode,
  Cm as BookSelector,
  me as Button,
  Uf as Card,
  Yf as CardContent,
  Xf as CardDescription,
  Wf as CardFooter,
  Gf as CardHeader,
  Hf as CardTitle,
  wc as ChapterRangeSelector,
  fo as Checkbox,
  Vm as Checklist,
  ta as ComboBox,
  Nc as DataTable,
  Wm as DisableButton,
  ao as DropdownMenu,
  io as DropdownMenuCheckboxItem,
  tr as DropdownMenuContent,
  Hl as DropdownMenuGroup,
  mi as DropdownMenuItem,
  tm as DropdownMenuItemType,
  En as DropdownMenuLabel,
  xm as DropdownMenuPortal,
  km as DropdownMenuRadioGroup,
  hi as DropdownMenuRadioItem,
  nr as DropdownMenuSeparator,
  Wl as DropdownMenuShortcut,
  Nm as DropdownMenuSub,
  Yl as DropdownMenuSubContent,
  Xl as DropdownMenuSubTrigger,
  fi as DropdownMenuTrigger,
  Ym as EnableButton,
  em as FilterButton,
  Jm as FilterDropdown,
  eh as Footer,
  Af as GridMenu,
  Bf as HamburgerMenuButton,
  Pm as INVENTORY_STRING_KEYS,
  Lm as IconButton,
  kn as Input,
  Xm as InstallButton,
  _m as Inventory,
  He as Label,
  Km as MarkdownRenderer,
  ys as MenuItem,
  Qm as MoreInfo,
  $m as MultiSelectComboBox,
  Im as NavigationContentSearch,
  Zm as NoExtensionsFound,
  gi as RadioGroup,
  Gr as RadioGroupItem,
  Am as ScriptureResultsViewer,
  Dm as ScrollGroupSelector,
  _c as SearchBar,
  fn as Select,
  Bt as SelectContent,
  hc as SelectGroup,
  Ue as SelectItem,
  gc as SelectLabel,
  ki as SelectScrollDownButton,
  Ni as SelectScrollUpButton,
  bc as SelectSeparator,
  Mt as SelectTrigger,
  mn as SelectValue,
  _i as Separator,
  Mm as SettingsList,
  jm as SettingsListHeader,
  Bm as SettingsListItem,
  qf as Slider,
  Gm as Sonner,
  _n as Spinner,
  Kf as Switch,
  rr as Table,
  ar as TableBody,
  xc as TableCaption,
  jt as TableCell,
  yc as TableFooter,
  hn as TableHead,
  or as TableHeader,
  ot as TableRow,
  Hm as Tabs,
  Qf as TabsContent,
  Jf as TabsList,
  Zf as TabsTrigger,
  zm as TextField,
  Ci as ToggleGroup,
  Fn as ToggleGroupItem,
  Fm as Toolbar,
  qm as UpdateButton,
  nm as VersionHistory,
  Si as VerticalTabs,
  Ri as VerticalTabsContent,
  Oi as VerticalTabsList,
  $c as VerticalTabsTrigger,
  Ff as badgeVariants,
  ac as buttonVariants,
  T as cn,
  Tc as getBookNumFromId,
  Ec as getLinesFromUSFM,
  na as getNumberFromUSFM,
  Cc as getStatusForItem,
  Om as inventoryCountColumn,
  Sm as inventoryItemColumn,
  Rm as inventoryStatusColumn,
  ah as sonner,
  th as useEvent,
  nh as useEventAsync,
  eo as usePromise
};
//# sourceMappingURL=index.js.map
