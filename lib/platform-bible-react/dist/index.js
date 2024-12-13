import il, { jsx as i, jsxs as v, Fragment as le } from "react/jsx-runtime";
import * as j from "react";
import S, { forwardRef as ur, useCallback as Et, useState as st, useRef as ve, useEffect as Kt, useLayoutEffect as da, useMemo as Nt } from "react";
import { History as sl, ChevronRight as ci, Check as On, Circle as di, ArrowDownWideNarrow as ll, Clock as cl, Bookmark as dl, X as ui, Search as mo, ChevronsUpDown as er, FilterIcon as ul, ChevronDown as ze, ChevronUp as Kr, ArrowLeftIcon as pl, ChevronLeftIcon as wl, ChevronRightIcon as fl, ArrowRightIcon as ml, CircleCheckIcon as hl, CircleXIcon as gl, CircleHelpIcon as bl, ArrowUpIcon as vl, ArrowDownIcon as yl, ArrowUpDownIcon as xl, Star as Nl, PanelLeft as kl, PanelRight as El, ChevronLeft as Tl, LoaderCircle as Sl, Download as Cl, Filter as Ol, User as Rl, Link as _l, CircleHelp as Pl, BookOpen as ua, Loader as $l, Ellipsis as Il } from "lucide-react";
import ye, { clsx as Al } from "clsx";
import { extendTailwindMerge as Ml } from "tailwind-merge";
import * as mt from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Dl } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Bl, deepEqual as ho, substring as jl, formatScrRef as Ar, compareScrRefs as Jr, scrRefToBBBCCCVVV as Mr, getLocalizeKeyForScrollGroupId as pt, NumberFormat as Vl, formatBytes as zl, getErrorMessage as Ll } from "platform-bible-utils";
import { Slot as Ke } from "@radix-ui/react-slot";
import { cva as Je } from "class-variance-authority";
import * as pi from "@radix-ui/react-label";
import * as vn from "@radix-ui/react-radio-group";
import * as yn from "@radix-ui/react-popover";
import { Command as Rt } from "cmdk";
import * as Jt from "@radix-ui/react-dialog";
import { useReactTable as wi, getCoreRowModel as fi, getPaginationRowModel as Fl, getSortedRowModel as mi, getFilteredRowModel as Ul, flexRender as fn, getExpandedRowModel as Gl, getGroupedRowModel as Xl } from "@tanstack/react-table";
import * as vt from "@radix-ui/react-select";
import * as Zr from "@radix-ui/react-checkbox";
import * as pr from "@radix-ui/react-toggle-group";
import * as hi from "@radix-ui/react-toggle";
import * as _t from "@radix-ui/react-tabs";
import * as gi from "@radix-ui/react-separator";
import * as Rn from "@radix-ui/react-tooltip";
import Hl, { ThemeContext as Yl, internal_processStyles as Wl } from "@mui/styled-engine";
import { MenuItem as ql, ListItemText as Kl, ListItemIcon as bi, Menu as Jl, Grid as vi, List as Zl, IconButton as yi, Drawer as Ql, AppBar as tc, Toolbar as ec } from "@mui/material";
import * as nc from "react-dom";
import Xn from "react-dom";
import { Toaster as rc } from "sonner";
import { toast as Zh } from "sonner";
import * as dn from "@radix-ui/react-slider";
import * as Qr from "@radix-ui/react-switch";
import oc from "markdown-to-jsx";
const ac = Ml({ prefix: "tw-" });
function N(...t) {
  return ac(Al(t));
}
const Se = S.forwardRef(
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
Se.displayName = "Input";
const ic = ur(
  ({
    handleSearch: t,
    handleKeyDown: e,
    handleOnClick: n,
    handleSubmit: r,
    direction: o = "ltr",
    ...a
  }, s) => /* @__PURE__ */ v("div", { className: "tw-relative", children: [
    /* @__PURE__ */ i(
      Se,
      {
        ...a,
        type: "text",
        className: N(
          "tw-box-border tw-w-[200px] tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pe-9 tw-ps-4 tw-font-medium tw-shadow-none tw-outline-none"
        ),
        onChange: (l) => t(l.target.value),
        onKeyDown: (l) => {
          l.key === "Enter" && r(), e(l);
        },
        onClick: n,
        ref: s
      }
    ),
    /* @__PURE__ */ i(
      sl,
      {
        className: N(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-cursor-pointer tw-text-muted-foreground",
          { "tw-right-3": o === "ltr" },
          { "tw-left-3 tw-right-auto": o === "rtl" }
        ),
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var sc = Object.defineProperty, lc = (t, e, n) => e in t ? sc(t, e, { enumerable: !0, configurable: !0, writable: !0, value: n }) : t[e] = n, nt = (t, e, n) => lc(t, typeof e != "symbol" ? e + "" : e, n);
const Ne = [
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
], go = [
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
], xi = [
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
], pa = bc();
function Ze(t, e = !0) {
  return e && (t = t.toUpperCase()), t in pa ? pa[t] : 0;
}
function bo(t) {
  return Ze(t) > 0;
}
function cc(t) {
  const e = typeof t == "string" ? Ze(t) : t;
  return e >= 40 && e <= 66;
}
function dc(t) {
  return (typeof t == "string" ? Ze(t) : t) <= 39;
}
function Ni(t) {
  return t <= 66;
}
function uc(t) {
  const e = typeof t == "string" ? Ze(t) : t;
  return Ti(e) && !Ni(e);
}
function* pc() {
  for (let t = 1; t <= Ne.length; t++)
    yield t;
}
const wc = 1, ki = Ne.length;
function fc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function vo(t, e = "***") {
  const n = t - 1;
  return n < 0 || n >= Ne.length ? e : Ne[n];
}
function Ei(t) {
  return t <= 0 || t > ki ? "******" : xi[t - 1];
}
function mc(t) {
  return Ei(Ze(t));
}
function Ti(t) {
  const e = typeof t == "number" ? vo(t) : t;
  return bo(e) && !go.includes(e);
}
function hc(t) {
  const e = typeof t == "number" ? vo(t) : t;
  return bo(e) && go.includes(e);
}
function gc(t) {
  return xi[t - 1].includes("*obsolete*");
}
function bc() {
  const t = {};
  for (let e = 0; e < Ne.length; e++)
    t[Ne[e]] = e + 1;
  return t;
}
const it = {
  allBookIds: Ne,
  nonCanonicalIds: go,
  bookIdToNumber: Ze,
  isBookIdValid: bo,
  isBookNT: cc,
  isBookOT: dc,
  isBookOTNT: Ni,
  isBookDC: uc,
  allBookNumbers: pc,
  firstBook: wc,
  lastBook: ki,
  extraBooks: fc,
  bookNumberToId: vo,
  bookNumberToEnglishName: Ei,
  bookIdToEnglishName: mc,
  isCanonical: Ti,
  isExtraMaterial: hc,
  isObsolete: gc
};
var Yt = /* @__PURE__ */ ((t) => (t[t.Unknown = 0] = "Unknown", t[t.Original = 1] = "Original", t[t.Septuagint = 2] = "Septuagint", t[t.Vulgate = 3] = "Vulgate", t[t.English = 4] = "English", t[t.RussianProtestant = 5] = "RussianProtestant", t[t.RussianOrthodox = 6] = "RussianOrthodox", t))(Yt || {});
const $t = class {
  // private versInfo: Versification;
  constructor(e) {
    if (nt(this, "name"), nt(this, "fullPath"), nt(this, "isPresent"), nt(this, "hasVerseSegments"), nt(this, "isCustomized"), nt(this, "baseVersification"), nt(this, "scriptureBooks"), nt(this, "_type"), e == null)
      throw new Error("Argument undefined");
    typeof e == "string" ? (this.name = e, this._type = Yt[e]) : (this._type = e, this.name = Yt[e]);
  }
  get type() {
    return this._type;
  }
  equals(e) {
    return !e.type || !this.type ? !1 : e.type === this.type;
  }
};
nt($t, "Original", new $t(Yt.Original)), nt($t, "Septuagint", new $t(Yt.Septuagint)), nt($t, "Vulgate", new $t(Yt.Vulgate)), nt($t, "English", new $t(Yt.English)), nt($t, "RussianProtestant", new $t(Yt.RussianProtestant)), nt($t, "RussianOrthodox", new $t(Yt.RussianOrthodox));
let fe = $t;
function wa(t, e) {
  const n = e[0];
  for (let r = 1; r < e.length; r++)
    t = t.split(e[r]).join(n);
  return t.split(n);
}
var Si = /* @__PURE__ */ ((t) => (t[t.Valid = 0] = "Valid", t[t.UnknownVersification = 1] = "UnknownVersification", t[t.OutOfRange = 2] = "OutOfRange", t[t.VerseOutOfOrder = 3] = "VerseOutOfOrder", t[t.VerseRepeated = 4] = "VerseRepeated", t))(Si || {});
const St = class ot {
  constructor(e, n, r, o) {
    if (nt(this, "firstChapter"), nt(this, "lastChapter"), nt(this, "lastVerse"), nt(this, "hasSegmentsDefined"), nt(this, "text"), nt(this, "BBBCCCVVVS"), nt(this, "longHashCode"), nt(this, "versification"), nt(this, "rtlMark", "‏"), nt(this, "_bookNum", 0), nt(this, "_chapterNum", 0), nt(this, "_verseNum", 0), nt(this, "_verse"), r == null && o == null)
      if (e != null && typeof e == "string") {
        const a = e, s = n != null && n instanceof fe ? n : void 0;
        this.setEmpty(s), this.parse(a);
      } else if (e != null && typeof e == "number") {
        const a = n != null && n instanceof fe ? n : void 0;
        this.setEmpty(a), this._verseNum = e % ot.chapterDigitShifter, this._chapterNum = Math.floor(
          e % ot.bookDigitShifter / ot.chapterDigitShifter
        ), this._bookNum = Math.floor(e / ot.bookDigitShifter);
      } else if (n == null)
        if (e != null && e instanceof ot) {
          const a = e;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (e == null)
            return;
          const a = e instanceof fe ? e : ot.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (e != null && n != null && r != null)
      if (typeof e == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(e, n, r);
      else if (typeof e == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = e, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ot.defaultVersification;
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
      return n = new ot(e), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof on)
        return n = new ot(), { success: !1, verseRef: n };
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
    return e % ot.bcvMaxValue * ot.bookDigitShifter + (n >= 0 ? n % ot.bcvMaxValue * ot.chapterDigitShifter : 0) + (r >= 0 ? r % ot.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(e) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: s } = e, l = a || o.toString();
    let c;
    return s && (c = new fe(s)), n ? new ot(n, r.toString(), l, c) : new ot();
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
      if (n = n * 10 + +r - 0, n > ot.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ot.verseRangeSeparator) || this._verse.includes(ot.verseSequenceIndicator));
  }
  /**
   * Gets or sets the book of the reference. Book is the 3-letter abbreviation in capital letters,
   * e.g. `'MAT'`.
   */
  get book() {
    return it.bookNumberToId(this.bookNum, "");
  }
  set book(e) {
    this.bookNum = it.bookIdToNumber(e);
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
    const { success: n, vNum: r } = ot.tryGetVerseNum(e);
    this._verse = n ? void 0 : e.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ot.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(e) {
    if (e <= 0 || e > it.lastBook)
      throw new on(
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
    this.versification = this.versification != null ? new fe(e) : void 0;
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
    return this.validateVerse(ot.verseRangeSeparators, ot.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ot.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ot.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new fe(Yt[s]);
        } catch {
          throw new on("Invalid reference : " + e);
        }
    }
    const n = e.trim().split(" ");
    if (n.length !== 2)
      throw new on("Invalid reference : " + e);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || it.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ot.isVerseParseable(r[1]))
      throw new on("Invalid reference : " + e);
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
    return new ot(this);
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
    return e instanceof ot ? e._bookNum === this._bookNum && e._chapterNum === this._chapterNum && e._verseNum === this._verseNum && e.verse === this.verse && (e.versification == null && this.versification == null || e.versification != null && this.versification != null && e.versification.equals(this.versification)) : !1;
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
  allVerses(e = !1, n = ot.verseRangeSeparators, r = ot.verseSequenceIndicators) {
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
            const f = new ot(
              this._bookNum,
              this._chapterNum,
              u,
              this.versification
            );
            this.isExcluded || o.push(f);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > it.lastBook ? 2 : (it.isCanonical(this._bookNum), 0);
  }
  setEmpty(e = ot.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = e;
  }
  updateInternal(e, n, r) {
    this.bookNum = it.bookIdToNumber(e), this.chapter = n, this.verse = r;
  }
};
nt(St, "defaultVersification", fe.English), nt(St, "verseRangeSeparator", "-"), nt(St, "verseSequenceIndicator", ","), nt(St, "verseRangeSeparators", [St.verseRangeSeparator]), nt(St, "verseSequenceIndicators", [St.verseSequenceIndicator]), nt(St, "chapterDigitShifter", 1e3), nt(St, "bookDigitShifter", St.chapterDigitShifter * St.chapterDigitShifter), nt(St, "bcvMaxValue", St.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
nt(St, "ValidStatusType", Si);
class on extends Error {
}
const xn = mt.Root, nr = mt.Trigger, vc = mt.Group, uh = mt.Portal, ph = mt.Sub, wh = mt.RadioGroup, yc = S.forwardRef(({ className: t, inset: e, children: n, ...r }, o) => /* @__PURE__ */ v(
  mt.SubTrigger,
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
      /* @__PURE__ */ i(ci, { className: "tw-ml-auto tw-h-4 tw-w-4" })
    ]
  }
));
yc.displayName = mt.SubTrigger.displayName;
const xc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.SubContent,
  {
    ref: n,
    className: N(
      "tw-z-50 tw-min-w-[8rem] tw-overflow-hidden tw-rounded-md tw-border tw-bg-popover tw-p-1 tw-text-popover-foreground tw-shadow-lg data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[side=bottom]:tw-slide-in-from-top-2 data-[side=left]:tw-slide-in-from-right-2 data-[side=right]:tw-slide-in-from-left-2 data-[side=top]:tw-slide-in-from-bottom-2",
      t
    ),
    ...e
  }
));
xc.displayName = mt.SubContent.displayName;
const Le = S.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(mt.Portal, { children: /* @__PURE__ */ i(
  mt.Content,
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
Le.displayName = mt.Content.displayName;
const rr = S.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  mt.Item,
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
rr.displayName = mt.Item.displayName;
const wr = S.forwardRef(({ className: t, children: e, checked: n, ...r }, o) => /* @__PURE__ */ v(
  mt.CheckboxItem,
  {
    ref: o,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(On, { className: "tw-h-4 tw-w-4" }) }) }),
      e
    ]
  }
));
wr.displayName = mt.CheckboxItem.displayName;
const Ci = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ v(
  mt.RadioItem,
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none tw-transition-colors focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(mt.ItemIndicator, { children: /* @__PURE__ */ i(di, { className: "tw-h-2 tw-w-2 tw-fill-current" }) }) }),
      e
    ]
  }
));
Ci.displayName = mt.RadioItem.displayName;
const _n = S.forwardRef(({ className: t, inset: e, ...n }, r) => /* @__PURE__ */ i(
  mt.Label,
  {
    ref: r,
    className: N("tw-px-2 tw-py-1.5 tw-text-sm tw-font-semibold", e && "tw-pl-8", t),
    ...n
  }
));
_n.displayName = mt.Label.displayName;
const Pn = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  mt.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Pn.displayName = mt.Separator.displayName;
function Nc({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "span",
    {
      className: N("tw-ml-auto tw-text-xs tw-tracking-widest tw-opacity-60", t),
      ...e
    }
  );
}
Nc.displayName = "DropdownMenuShortcut";
const kc = ur(
  ({
    bookId: t,
    handleSelectBook: e,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: s,
    direction: l
  }, c) => /* @__PURE__ */ v(
    rr,
    {
      ref: c,
      textValue: t,
      className: N("tw-mx-1 tw-px-1 tw-font-normal tw-text-foreground/80", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "tw-bg-amber-50 tw-text-yellow-900 data-[highlighted]:tw-bg-amber-100": n
      }),
      onSelect: (d) => {
        d.preventDefault(), e();
      },
      onKeyDown: (d) => {
        o(d);
      },
      onFocus: r,
      onMouseMove: r,
      dir: l,
      children: [
        /* @__PURE__ */ i(
          "span",
          {
            className: N(
              "tw-border-b-0 tw-border-e-0 tw-border-s-2 tw-border-t-0 tw-border-solid tw-px-2",
              {
                "tw-font-bold": n,
                "tw-border-s-red-200": a.toLowerCase() === "ot",
                "tw-border-s-purple-200": a.toLowerCase() === "nt",
                "tw-border-s-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: it.bookIdToEnglishName(t)
          }
        ),
        n && /* @__PURE__ */ i("div", { children: s })
      ]
    },
    t
  )
);
function Ec({
  handleSelectChapter: t,
  endChapter: e,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: e }, (l, c) => c + 1), s = Et(
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
function Tc({ handleSort: t, handleLocationHistory: e, handleBookmarks: n }) {
  return /* @__PURE__ */ v(_n, { className: "tw-flex tw-justify-between", children: [
    /* @__PURE__ */ i("p", { className: "tw-inline-block tw-align-middle", children: "Go To" }),
    /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(
        ll,
        {
          onClick: t,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        cl,
        {
          onClick: e,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      ),
      /* @__PURE__ */ i(
        dl,
        {
          onClick: n,
          className: "tw-m-2 tw-h-4 tw-w-4 tw-cursor-pointer tw-gap-2"
        }
      )
    ] })
  ] });
}
const mn = it.allBookIds, Sc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, fa = ["OT", "NT", "DC"], Cc = 32 + 32 + 32, Oc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Rc = (t) => ({
  OT: mn.filter((n) => it.isBookOT(n)),
  NT: mn.filter((n) => it.isBookNT(n)),
  DC: mn.filter((n) => it.isBookDC(n))
})[t], an = (t) => Bl(it.bookIdToNumber(t));
function _c() {
  return mn.map((e) => it.bookIdToEnglishName(e));
}
function Pc(t) {
  return _c().includes(t);
}
function $c(t) {
  const e = t.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (Pc(e))
    return mn.find((r) => it.bookIdToEnglishName(r) === e);
}
function fh({ scrRef: t, handleSubmit: e, direction: n }) {
  const [r, o] = st(""), [a, s] = st(
    it.bookNumberToId(t.bookNum)
  ), [l, c] = st(t.chapterNum ?? 0), [d, u] = st(
    it.bookNumberToId(t.bookNum)
  ), [f, w] = st(!1), [g, y] = st(f), m = ve(void 0), h = ve(void 0), x = ve(void 0), $ = Et(
    (P) => Rc(P).filter((B) => {
      const q = it.bookIdToEnglishName(B).toLowerCase(), H = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return q.includes(H) || // Match book name
      B.toLowerCase().includes(H);
    }),
    [r]
  ), _ = (P) => {
    o(P);
  }, T = ve(!1), b = Et((P) => {
    if (T.current) {
      T.current = !1;
      return;
    }
    w(P);
  }, []), I = Et(
    (P, B, q, H) => {
      if (c(
        it.bookNumberToId(t.bookNum) !== P ? 1 : t.chapterNum
      ), B || an(P) === -1) {
        e({
          bookNum: it.bookIdToNumber(P),
          chapterNum: q || 1,
          verseNum: H || 1
        }), w(!1), o("");
        return;
      }
      s(a !== P ? P : ""), w(!B);
    },
    [e, t.bookNum, t.chapterNum, a]
  ), F = (P) => {
    P <= 0 || P > an(a) || I(a, !0, P);
  }, J = Et(() => {
    Oc.forEach((P) => {
      const B = r.match(P);
      if (B) {
        const [q, H = void 0, z = void 0] = B.slice(1), tt = $c(q);
        (it.isBookIdValid(q) || tt) && I(
          tt ?? q,
          !0,
          H ? parseInt(H, 10) : 1,
          z ? parseInt(z, 10) : 1
        );
      }
    });
  }, [I, r]), O = Et(
    (P) => {
      f ? (P.key === "ArrowDown" || P.key === "ArrowUp") && (typeof x < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      x.current !== null ? x.current.focus() : typeof h < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      h.current !== null && h.current.focus(), P.preventDefault()) : w(!0);
    },
    [f]
  ), A = (P) => {
    const { key: B } = P;
    B === "ArrowRight" || B === "ArrowLeft" || B === "ArrowDown" || B === "ArrowUp" || B === "Enter" || (m.current.dispatchEvent(new KeyboardEvent("keydown", { key: B })), m.current.focus());
  }, D = (P) => {
    const { key: B } = P;
    if (d === a) {
      if (B === "Enter") {
        P.preventDefault(), I(a, !0, l);
        return;
      }
      const q = B === "ArrowRight" && !n || B === "ArrowRight" && n === "ltr" || B === "ArrowLeft" && n === "rtl", H = B === "ArrowLeft" && !n || B === "ArrowLeft" && n === "ltr" || B === "ArrowRight" && n === "rtl";
      let z = 0;
      if (q)
        if (l < an(d))
          z = 1;
        else {
          P.preventDefault();
          return;
        }
      else if (H)
        if (l > 1)
          z = -1;
        else {
          P.preventDefault();
          return;
        }
      else
        B === "ArrowDown" ? z = 6 : B === "ArrowUp" && (z = -6);
      l + z <= 0 || l + z > an(d) ? c(0) : z !== 0 && (c(l + z), P.preventDefault());
    }
  };
  return Kt(() => {
    a === d ? a === it.bookNumberToId(t.bookNum) ? c(t.chapterNum) : c(1) : c(0);
  }, [d, t.bookNum, t.chapterNum, a]), da(() => {
    y(f);
  }, [f]), da(() => {
    const P = setTimeout(() => {
      if (g && h.current && x.current) {
        const q = x.current.offsetTop - Cc;
        h.current.scrollTo({ top: q, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(P);
    };
  }, [g]), /* @__PURE__ */ i("div", { className: "pr-twp tw-flex", children: /* @__PURE__ */ v(xn, { modal: !1, open: f, onOpenChange: b, children: [
    /* @__PURE__ */ i(nr, { asChild: !0, children: /* @__PURE__ */ i(
      ic,
      {
        ref: m,
        value: r,
        handleSearch: _,
        handleKeyDown: O,
        handleOnClick: () => {
          s(it.bookNumberToId(t.bookNum)), u(it.bookNumberToId(t.bookNum)), c(t.chapterNum > 0 ? t.chapterNum : 0), w(!0), m.current.focus();
        },
        onFocus: () => {
          T.current = !0;
        },
        handleSubmit: J,
        placeholder: `${it.bookNumberToEnglishName(t.bookNum)} ${t.chapterNum}:${t.verseNum}`,
        direction: n
      }
    ) }),
    /* @__PURE__ */ i(
      Le,
      {
        className: "tw-m-1 tw-overflow-y-auto tw-p-0 tw-font-normal tw-text-foreground/80",
        style: { width: "233px", maxHeight: "500px", zIndex: "250" },
        onKeyDown: A,
        align: n === "ltr" ? "start" : "end",
        ref: h,
        children: /* @__PURE__ */ v("div", { dir: n, className: N({ "tw-ps-2": n === "rtl" }), children: [
          /* @__PURE__ */ i(
            Tc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          fa.map(
            (P, B) => $(P).length > 0 && /* @__PURE__ */ v("div", { children: [
              /* @__PURE__ */ i(_n, { className: "tw-font-semibold tw-text-foreground/80", children: Sc[P] }),
              $(P).map((q) => /* @__PURE__ */ i("div", { children: /* @__PURE__ */ i(
                kc,
                {
                  bookId: q,
                  handleSelectBook: () => I(q, !1),
                  isSelected: a === q,
                  handleHighlightBook: () => u(q),
                  handleKeyDown: D,
                  bookType: P,
                  ref: (H) => {
                    a === q && (x.current = H);
                  },
                  direction: n,
                  children: /* @__PURE__ */ i(
                    Ec,
                    {
                      handleSelectChapter: F,
                      endChapter: an(q),
                      activeChapter: t.bookNum === it.bookIdToNumber(q) ? t.chapterNum : 0,
                      highlightedChapter: l,
                      handleHighlightedChapter: (H) => {
                        c(H);
                      }
                    }
                  )
                }
              ) }, q)),
              fa.length - 1 !== B ? /* @__PURE__ */ i(Pn, {}) : void 0
            ] }, P)
          )
        ] })
      }
    )
  ] }) });
}
const Ic = Je(
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
), wt = S.forwardRef(
  ({ className: t, variant: e, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ i(r ? Ke : "button", { className: N(Ic({ variant: e, size: n, className: t })), ref: a, ...o })
);
wt.displayName = "Button";
const Ac = Je(
  "tw-text-sm tw-font-medium tw-leading-none peer-disabled:tw-cursor-not-allowed peer-disabled:tw-opacity-70"
), Mt = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(pi.Root, { ref: n, className: N("pr-twp", Ac(), t), ...e }));
Mt.displayName = pi.Root.displayName;
const Oi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vn.Root,
  {
    className: N("pr-twp tw-grid tw-gap-2", t),
    ...e,
    ref: n
  }
));
Oi.displayName = vn.Root.displayName;
const to = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vn.Item,
  {
    ref: n,
    className: N(
      "pr-twp tw-aspect-square tw-h-4 tw-w-4 tw-rounded-full tw-border tw-border-primary tw-text-primary tw-ring-offset-background focus:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(vn.Indicator, { className: "tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i(di, { className: "tw-h-2.5 tw-w-2.5 tw-fill-current tw-text-current" }) })
  }
));
to.displayName = vn.Item.displayName;
const Ri = yn.Root, _i = yn.Trigger, yo = S.forwardRef(({ className: t, align: e = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ i(yn.Portal, { children: /* @__PURE__ */ i(
  yn.Content,
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
yo.displayName = yn.Content.displayName;
const Mc = Jt.Portal, Pi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Overlay,
  {
    ref: n,
    className: N(
      "tw-fixed tw-inset-0 tw-z-50 tw-bg-black/80 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0",
      t
    ),
    ...e
  }
));
Pi.displayName = Jt.Overlay.displayName;
const Dc = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ v(Mc, { children: [
  /* @__PURE__ */ i(Pi, {}),
  /* @__PURE__ */ v(
    Jt.Content,
    {
      ref: r,
      className: N(
        "pr-twp tw-fixed tw-left-[50%] tw-top-[50%] tw-z-50 tw-grid tw-w-full tw-max-w-lg tw-translate-x-[-50%] tw-translate-y-[-50%] tw-gap-4 tw-border tw-bg-background tw-p-6 tw-shadow-lg tw-duration-200 data-[state=open]:tw-animate-in data-[state=closed]:tw-animate-out data-[state=closed]:tw-fade-out-0 data-[state=open]:tw-fade-in-0 data-[state=closed]:tw-zoom-out-95 data-[state=open]:tw-zoom-in-95 data-[state=closed]:tw-slide-out-to-left-1/2 data-[state=closed]:tw-slide-out-to-top-[48%] data-[state=open]:tw-slide-in-from-left-1/2 data-[state=open]:tw-slide-in-from-top-[48%] sm:tw-rounded-lg",
        t
      ),
      ...n,
      children: [
        e,
        /* @__PURE__ */ v(Jt.Close, { className: "tw-absolute tw-right-4 tw-top-4 tw-rounded-sm tw-opacity-70 tw-ring-offset-background tw-transition-opacity hover:tw-opacity-100 focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-pointer-events-none data-[state=open]:tw-bg-accent data-[state=open]:tw-text-muted-foreground", children: [
          /* @__PURE__ */ i(ui, { className: "tw-h-4 tw-w-4" }),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Dc.displayName = Jt.Content.displayName;
const Bc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Title,
  {
    ref: n,
    className: N("tw-text-lg tw-font-semibold tw-leading-none tw-tracking-tight", t),
    ...e
  }
));
Bc.displayName = Jt.Title.displayName;
const jc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Jt.Description,
  {
    ref: n,
    className: N("tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
jc.displayName = Jt.Description.displayName;
const xo = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Rt,
  {
    ref: n,
    className: N(
      "tw-flex tw-h-full tw-w-full tw-flex-col tw-overflow-hidden tw-rounded-md tw-bg-popover tw-text-popover-foreground",
      t
    ),
    ...e
  }
));
xo.displayName = Rt.displayName;
const No = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-border-b tw-px-3", children: [
  /* @__PURE__ */ i(mo, { className: "tw-me-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" }),
  /* @__PURE__ */ i(
    Rt.Input,
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
No.displayName = Rt.Input.displayName;
const ko = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Rt.List,
  {
    ref: n,
    className: N("tw-max-h-[300px] tw-overflow-y-auto tw-overflow-x-hidden", t),
    ...e
  }
));
ko.displayName = Rt.List.displayName;
const Eo = S.forwardRef((t, e) => /* @__PURE__ */ i(Rt.Empty, { ref: e, className: "tw-py-6 tw-text-center tw-text-sm", ...t }));
Eo.displayName = Rt.Empty.displayName;
const $i = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Rt.Group,
  {
    ref: n,
    className: N(
      "tw-overflow-hidden tw-p-1 tw-text-foreground [&_[cmdk-group-heading]]:tw-px-2 [&_[cmdk-group-heading]]:tw-py-1.5 [&_[cmdk-group-heading]]:tw-text-xs [&_[cmdk-group-heading]]:tw-font-medium [&_[cmdk-group-heading]]:tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
$i.displayName = Rt.Group.displayName;
const Vc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Rt.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-h-px tw-bg-border", t),
    ...e
  }
));
Vc.displayName = Rt.Separator.displayName;
const To = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Rt.Item,
  {
    ref: n,
    className: N(
      "tw-relative tw-flex tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-px-2 tw-py-1.5 tw-text-sm tw-outline-none data-[disabled=true]:tw-pointer-events-none data-[selected=true]:tw-bg-accent data-[selected=true]:tw-text-accent-foreground data-[disabled=true]:tw-opacity-50",
      t
    ),
    ...e
  }
));
To.displayName = Rt.Item.displayName;
function zc(t) {
  return typeof t == "string" ? t : typeof t == "number" ? t.toString() : t.label;
}
function or({
  id: t,
  options: e = [],
  className: n,
  buttonClassName: r,
  popoverContentClassName: o,
  value: a,
  onChange: s = () => {
  },
  getOptionLabel: l = zc,
  icon: c = void 0,
  buttonPlaceholder: d = "",
  textPlaceholder: u = "",
  commandEmptyMessage: f = "No option found",
  buttonVariant: w = "outline",
  alignDropDown: g = "start",
  dir: y = "ltr",
  isDisabled: m = !1,
  ...h
}) {
  const [x, $] = st(!1);
  return /* @__PURE__ */ v(Ri, { open: x, onOpenChange: $, ...h, children: [
    /* @__PURE__ */ i(_i, { asChild: !0, children: /* @__PURE__ */ v(
      wt,
      {
        variant: w,
        role: "combobox",
        "aria-expanded": x,
        id: t,
        className: N(
          "tw-flex tw-w-[200px] tw-items-center tw-justify-between tw-overflow-hidden",
          r ?? n
        ),
        disabled: m,
        children: [
          /* @__PURE__ */ v("div", { className: "tw-flex tw-flex-1 tw-items-center tw-overflow-hidden", children: [
            c && /* @__PURE__ */ i("div", { className: "tw-pe-2", children: c }),
            /* @__PURE__ */ i("span", { className: "tw-overflow-hidden tw-text-ellipsis tw-whitespace-nowrap", children: a ? l(a) : d })
          ] }),
          /* @__PURE__ */ i(er, { className: "tw-ms-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(
      yo,
      {
        align: g,
        className: N("tw-w-[200px] tw-p-0", o),
        dir: y,
        children: /* @__PURE__ */ v(xo, { children: [
          /* @__PURE__ */ i(No, { dir: y, placeholder: u, className: "tw-text-inherit" }),
          /* @__PURE__ */ i(Eo, { children: f }),
          /* @__PURE__ */ i(ko, { children: e.map((_) => /* @__PURE__ */ v(
            To,
            {
              value: l(_),
              onSelect: () => {
                s(_), $(!1);
              },
              children: [
                /* @__PURE__ */ i(
                  On,
                  {
                    className: N("tw-me-2 tw-h-4 tw-w-4", {
                      "tw-opacity-0": !a || l(a) !== l(_)
                    })
                  }
                ),
                l(_)
              ]
            },
            l(_)
          )) })
        ] })
      }
    )
  ] });
}
function Lc({
  startChapter: t,
  endChapter: e,
  handleSelectStartChapter: n,
  handleSelectEndChapter: r,
  isDisabled: o = !1,
  chapterCount: a,
  direction: s = "ltr"
}) {
  const l = Nt(
    () => Array.from({ length: a }, (u, f) => f + 1),
    [a]
  );
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(Mt, { htmlFor: "start-chapters-combobox", children: "Chapters" }),
    /* @__PURE__ */ i(
      or,
      {
        isDisabled: o,
        onChange: (u) => {
          n(u), u > e && r(u);
        },
        buttonClassName: "tw-me-2 tw-ms-2 tw-w-20",
        options: l,
        getOptionLabel: (u) => u.toString(),
        value: t,
        dir: s
      },
      "start chapter"
    ),
    /* @__PURE__ */ i(Mt, { htmlFor: "end-chapters-combobox", children: "to" }),
    /* @__PURE__ */ i(
      or,
      {
        isDisabled: o,
        onChange: (u) => {
          r(u), u < t && n(u);
        },
        buttonClassName: "tw-ms-2 tw-w-20",
        options: l,
        getOptionLabel: (u) => u.toString(),
        value: e,
        dir: s
      },
      "end chapter"
    )
  ] });
}
var Fc = /* @__PURE__ */ ((t) => (t.CURRENT_BOOK = "current book", t.CHOOSE_BOOKS = "choose books", t))(Fc || {});
const mh = Object.freeze([
  "%webView_bookSelector_currentBook%",
  "%webView_bookSelector_choose%",
  "%webView_bookSelector_chooseBooks%"
]), Dr = (t, e) => t[e] ?? e;
function hh({
  handleBookSelectionModeChange: t,
  currentBookName: e,
  onSelectBooks: n,
  selectedBookIds: r,
  chapterCount: o,
  endChapter: a,
  handleSelectEndChapter: s,
  startChapter: l,
  handleSelectStartChapter: c,
  localizedStrings: d,
  direction: u
}) {
  const f = Dr(d, "%webView_bookSelector_currentBook%"), w = Dr(d, "%webView_bookSelector_choose%"), g = Dr(d, "%webView_bookSelector_chooseBooks%"), [y, m] = st(
    "current book"
    /* CURRENT_BOOK */
  ), h = (x) => {
    m(x), t(x);
  };
  return /* @__PURE__ */ i(
    Oi,
    {
      className: "pr-twp tw-flex",
      value: y,
      onValueChange: (x) => h(x),
      dir: u,
      children: /* @__PURE__ */ v("div", { className: "tw-flex tw-w-full tw-flex-col tw-gap-4", children: [
        /* @__PURE__ */ v("div", { className: "tw-grid tw-grid-cols-[25%,25%,50%]", children: [
          /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(to, {
              value: "current book"
              /* CURRENT_BOOK */
            }),
            /* @__PURE__ */ i(Mt, { className: "tw-ms-1", children: f })
          ] }),
          /* @__PURE__ */ i(Mt, { className: "tw-flex tw-items-center", children: e }),
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-end", children: /* @__PURE__ */ i(
            Lc,
            {
              isDisabled: y === "choose books",
              handleSelectStartChapter: c,
              handleSelectEndChapter: s,
              chapterCount: o,
              startChapter: l,
              endChapter: a,
              direction: u
            }
          ) })
        ] }),
        /* @__PURE__ */ v("div", { className: "tw-grid tw-grid-cols-[25%,50%,25%]", children: [
          /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center", children: [
            /* @__PURE__ */ i(to, {
              value: "choose books"
              /* CHOOSE_BOOKS */
            }),
            /* @__PURE__ */ i(Mt, { className: "tw-ms-1", children: g })
          ] }),
          /* @__PURE__ */ i(Mt, { className: "tw-flex tw-items-center", children: r.map((x) => it.bookIdToEnglishName(x)).join(", ") }),
          /* @__PURE__ */ i(
            wt,
            {
              disabled: y === "current book",
              onClick: () => n(),
              children: w
            }
          )
        ] })
      ] })
    }
  );
}
function Uc({ table: t }) {
  return /* @__PURE__ */ v(xn, { children: [
    /* @__PURE__ */ i(Dl, { asChild: !0, children: /* @__PURE__ */ v(wt, { variant: "outline", size: "sm", className: "tw-ml-auto tw-hidden tw-h-8 lg:tw-flex", children: [
      /* @__PURE__ */ i(ul, { className: "tw-mr-2 tw-h-4 tw-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ v(Le, { align: "end", className: "tw-w-[150px]", children: [
      /* @__PURE__ */ i(_n, { children: "Toggle columns" }),
      /* @__PURE__ */ i(Pn, {}),
      t.getAllColumns().filter((e) => e.getCanHide()).map((e) => /* @__PURE__ */ i(
        wr,
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
const Nn = vt.Root, Gc = vt.Group, kn = vt.Value, Fe = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ v(
  vt.Trigger,
  {
    ref: r,
    className: N(
      "tw-flex tw-h-10 tw-w-full tw-items-center tw-justify-between tw-rounded-md tw-border tw-border-input tw-bg-background tw-px-3 tw-py-2 tw-text-sm tw-ring-offset-background placeholder:tw-text-muted-foreground focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-ring focus:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 [&>span]:tw-line-clamp-1",
      t
    ),
    ...n,
    children: [
      e,
      /* @__PURE__ */ i(vt.Icon, { asChild: !0, children: /* @__PURE__ */ i(ze, { className: "tw-h-4 tw-w-4 tw-opacity-50" }) })
    ]
  }
));
Fe.displayName = vt.Trigger.displayName;
const Ii = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.ScrollUpButton,
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(Kr, { className: "tw-h-4 tw-w-4" })
  }
));
Ii.displayName = vt.ScrollUpButton.displayName;
const Ai = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.ScrollDownButton,
  {
    ref: n,
    className: N("tw-flex tw-cursor-default tw-items-center tw-justify-center tw-py-1", t),
    ...e,
    children: /* @__PURE__ */ i(ze, { className: "tw-h-4 tw-w-4" })
  }
));
Ai.displayName = vt.ScrollDownButton.displayName;
const Ue = S.forwardRef(({ className: t, children: e, position: n = "popper", ...r }, o) => /* @__PURE__ */ i(vt.Portal, { children: /* @__PURE__ */ v(
  vt.Content,
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
      /* @__PURE__ */ i(Ii, {}),
      /* @__PURE__ */ i(
        vt.Viewport,
        {
          className: N(
            "tw-p-1",
            n === "popper" && "tw-h-[var(--radix-select-trigger-height)] tw-w-full tw-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: e
        }
      ),
      /* @__PURE__ */ i(Ai, {})
    ]
  }
) }));
Ue.displayName = vt.Content.displayName;
const Xc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.Label,
  {
    ref: n,
    className: N("tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-font-semibold", t),
    ...e
  }
));
Xc.displayName = vt.Label.displayName;
const Ht = S.forwardRef(({ className: t, children: e, ...n }, r) => /* @__PURE__ */ v(
  vt.Item,
  {
    ref: r,
    className: N(
      "tw-relative tw-flex tw-w-full tw-cursor-default tw-select-none tw-items-center tw-rounded-sm tw-py-1.5 tw-pl-8 tw-pr-2 tw-text-sm tw-outline-none focus:tw-bg-accent focus:tw-text-accent-foreground data-[disabled]:tw-pointer-events-none data-[disabled]:tw-opacity-50",
      t
    ),
    ...n,
    children: [
      /* @__PURE__ */ i("span", { className: "tw-absolute tw-left-2 tw-flex tw-h-3.5 tw-w-3.5 tw-items-center tw-justify-center", children: /* @__PURE__ */ i(vt.ItemIndicator, { children: /* @__PURE__ */ i(On, { className: "tw-h-4 tw-w-4" }) }) }),
      /* @__PURE__ */ i(vt.ItemText, { children: e })
    ]
  }
));
Ht.displayName = vt.Item.displayName;
const Hc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  vt.Separator,
  {
    ref: n,
    className: N("tw--mx-1 tw-my-1 tw-h-px tw-bg-muted", t),
    ...e
  }
));
Hc.displayName = vt.Separator.displayName;
function Yc({ table: t }) {
  return /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-justify-between tw-px-2 tw-pb-3 tw-pt-3", children: /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-space-x-6 lg:tw-space-x-8", children: [
    /* @__PURE__ */ v("div", { className: "tw-flex-1 tw-text-sm tw-text-muted-foreground", children: [
      t.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      t.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ i("p", { className: "tw-text-nowrap tw-text-sm tw-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ v(
        Nn,
        {
          value: `${t.getState().pagination.pageSize}`,
          onValueChange: (e) => {
            t.setPageSize(Number(e));
          },
          children: [
            /* @__PURE__ */ i(Fe, { className: "tw-h-8 tw-w-[70px]", children: /* @__PURE__ */ i(kn, { placeholder: t.getState().pagination.pageSize }) }),
            /* @__PURE__ */ i(Ue, { side: "top", children: [10, 20, 30, 40, 50].map((e) => /* @__PURE__ */ i(Ht, { value: `${e}`, children: e }, e)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ v("div", { className: "tw-flex tw-w-[100px] tw-items-center tw-justify-center tw-text-sm tw-font-medium", children: [
      "Page ",
      t.getState().pagination.pageIndex + 1,
      " of ",
      t.getPageCount()
    ] }),
    /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-space-x-2", children: [
      /* @__PURE__ */ v(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(0),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ i(pl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ v(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.previousPage(),
          disabled: !t.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ i(wl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ v(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-h-8 tw-w-8 tw-p-0",
          onClick: () => t.nextPage(),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ i(fl, { className: "tw-h-4 tw-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ v(
        wt,
        {
          variant: "outline",
          size: "icon",
          className: "tw-hidden tw-h-8 tw-w-8 tw-p-0 lg:tw-flex",
          onClick: () => t.setPageIndex(t.getPageCount() - 1),
          disabled: !t.getCanNextPage(),
          children: [
            /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ i(ml, { className: "tw-h-4 tw-w-4" })
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
const Wc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "tfoot",
  {
    ref: n,
    className: N("tw-border-t tw-bg-muted/50 tw-font-medium [&>tr]:last:tw-border-b-0", t),
    ...e
  }
));
Wc.displayName = "TableFooter";
const Wt = S.forwardRef(
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
Wt.displayName = "TableRow";
const jt = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
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
jt.displayName = "TableHead";
const It = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "td",
  {
    ref: n,
    className: N("tw-p-4 tw-align-middle [&:has([role=checkbox])]:tw-pe-0", t),
    ...e
  }
));
It.displayName = "TableCell";
const qc = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  "caption",
  {
    ref: n,
    className: N("tw-mt-4 tw-text-sm tw-text-muted-foreground", t),
    ...e
  }
));
qc.displayName = "TableCaption";
function Kc({
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
  const [l, c] = st([]), [d, u] = st([]), [f, w] = st({}), [g, y] = st({}), m = wi({
    data: e,
    columns: t,
    getCoreRowModel: fi(),
    ...n && { getPaginationRowModel: Fl() },
    onSortingChange: c,
    getSortedRowModel: mi(),
    onColumnFiltersChange: u,
    getFilteredRowModel: Ul(),
    onColumnVisibilityChange: w,
    onRowSelectionChange: y,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ v("div", { className: "pr-twp", children: [
    o && /* @__PURE__ */ i(Uc, { table: m }),
    /* @__PURE__ */ v($n, { stickyHeader: a, children: [
      /* @__PURE__ */ i(In, { stickyHeader: a, children: m.getHeaderGroups().map((x) => /* @__PURE__ */ i(Wt, { children: x.headers.map(($) => /* @__PURE__ */ i(jt, { children: $.isPlaceholder ? void 0 : fn($.column.columnDef.header, $.getContext()) }, $.id)) }, x.id)) }),
      /* @__PURE__ */ i(An, { children: (h = m.getRowModel().rows) != null && h.length ? m.getRowModel().rows.map((x) => /* @__PURE__ */ i(
        Wt,
        {
          onClick: () => s(x, m),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map(($) => /* @__PURE__ */ i(It, { children: fn($.column.columnDef.cell, $.getContext()) }, $.id))
        },
        x.id
      )) : /* @__PURE__ */ i(Wt, { children: /* @__PURE__ */ i(It, { colSpan: t.length, className: "tw-h-24 tw-text-center", children: "No results." }) }) })
    ] }),
    n && /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-justify-end tw-space-x-2 tw-py-4", children: [
      /* @__PURE__ */ i(
        wt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.previousPage(),
          disabled: !m.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ i(
        wt,
        {
          variant: "outline",
          size: "sm",
          onClick: () => m.nextPage(),
          disabled: !m.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    n && r && /* @__PURE__ */ i(Yc, { table: m })
  ] });
}
function Jc({
  occurrenceData: t,
  setScriptureReference: e,
  localizedStrings: n
}) {
  const r = n["%webView_inventory_occurrences_table_header_reference%"], o = n["%webView_inventory_occurrences_table_header_occurrence%"], a = Nt(() => {
    const s = [];
    return t.forEach((l) => {
      s.some((c) => ho(c, l)) || s.push(l);
    }), s;
  }, [t]);
  return /* @__PURE__ */ v($n, { stickyHeader: !0, children: [
    /* @__PURE__ */ i(In, { stickyHeader: !0, children: /* @__PURE__ */ v(Wt, { children: [
      /* @__PURE__ */ i(jt, { children: r }),
      /* @__PURE__ */ i(jt, { children: o })
    ] }) }),
    /* @__PURE__ */ i(An, { children: a.length > 0 && a.map((s) => /* @__PURE__ */ v(
      Wt,
      {
        onClick: () => {
          e(s.reference);
        },
        children: [
          /* @__PURE__ */ i(It, { children: `${it.bookNumberToEnglishName(s.reference.bookNum)} ${s.reference.chapterNum}:${s.reference.verseNum}` }),
          /* @__PURE__ */ i(It, { children: s.text })
        ]
      },
      `${s.reference.bookNum} ${s.reference.chapterNum}:${s.reference.verseNum}-${s.text}`
    )) })
  ] });
}
const So = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Zr.Root,
  {
    ref: n,
    className: N(
      "tw-peer pr-twp tw-h-4 tw-w-4 tw-shrink-0 tw-rounded-sm tw-border tw-border-primary tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=checked]:tw-text-primary-foreground",
      t
    ),
    ...e,
    children: /* @__PURE__ */ i(
      Zr.Indicator,
      {
        className: N("tw-flex tw-items-center tw-justify-center tw-text-current"),
        children: /* @__PURE__ */ i(On, { className: "tw-h-4 tw-w-4" })
      }
    )
  }
));
So.displayName = Zr.Root.displayName;
const Zc = (t) => t.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), ma = (t) => {
  const e = /^\\[vc]\s+(\d+)/, n = t.match(e);
  if (n)
    return +n[1];
}, Qc = (t) => {
  const e = t.match(/^\\id\s+([A-Za-z]+)/);
  return e ? it.bookIdToNumber(e[1]) : 0;
}, td = (t, e, n) => n.includes(t) ? "unapproved" : e.includes(t) ? "approved" : "unknown", Mi = Je(
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
), ed = S.forwardRef(({ className: t, variant: e, size: n, ...r }, o) => /* @__PURE__ */ i(
  hi.Root,
  {
    ref: o,
    className: N(Mi({ variant: e, size: n, className: t })),
    ...r
  }
));
ed.displayName = hi.Root.displayName;
const Di = S.createContext({
  size: "default",
  variant: "default"
}), Bi = S.forwardRef(({ className: t, variant: e, size: n, children: r, ...o }, a) => /* @__PURE__ */ i(
  pr.Root,
  {
    ref: a,
    className: N("pr-twp tw-flex tw-items-center tw-justify-center tw-gap-1", t),
    ...o,
    children: /* @__PURE__ */ i(
      Di.Provider,
      {
        value: { variant: e, size: n },
        children: r
      }
    )
  }
));
Bi.displayName = pr.Root.displayName;
const Jn = S.forwardRef(({ className: t, children: e, variant: n, size: r, ...o }, a) => {
  const s = S.useContext(Di);
  return /* @__PURE__ */ i(
    pr.Item,
    {
      ref: a,
      className: N(
        Mi({
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
Jn.displayName = pr.Item.displayName;
const fr = (t) => t === "asc" ? /* @__PURE__ */ i(vl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : t === "desc" ? /* @__PURE__ */ i(yl, { className: "tw-ms-2 tw-h-4 tw-w-4" }) : /* @__PURE__ */ i(xl, { className: "tw-ms-2 tw-h-4 tw-w-4" }), gh = (t) => ({
  accessorKey: "item",
  accessorFn: (e) => e.items[0],
  header: ({ column: e }) => /* @__PURE__ */ v(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    fr(e.getIsSorted())
  ] })
}), nd = (t, e) => ({
  accessorKey: `item${e}`,
  accessorFn: (n) => n.items[e],
  header: ({ column: n }) => /* @__PURE__ */ v(wt, { variant: "ghost", onClick: () => n.toggleSorting(void 0), children: [
    t,
    fr(n.getIsSorted())
  ] })
}), bh = (t) => ({
  accessorKey: "count",
  header: ({ column: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end tw-tabular-nums", children: /* @__PURE__ */ v(wt, { variant: "ghost", onClick: () => e.toggleSorting(void 0), children: [
    t,
    fr(e.getIsSorted())
  ] }) }),
  cell: ({ row: e }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-end", children: e.getValue("count") })
}), Br = (t, e, n, r, o, a) => {
  let s = [...n];
  t.forEach((c) => {
    e === "approved" ? s.includes(c) || s.push(c) : s = s.filter((d) => d !== c);
  }), r(s);
  let l = [...o];
  t.forEach((c) => {
    e === "unapproved" ? l.includes(c) || l.push(c) : l = l.filter((d) => d !== c);
  }), a(l);
}, vh = (t, e, n, r, o, a = "ltr") => ({
  accessorKey: "status",
  header: ({ column: s }) => /* @__PURE__ */ i("div", { className: "tw-flex tw-justify-center", children: /* @__PURE__ */ v(wt, { variant: "ghost", onClick: () => s.toggleSorting(void 0), children: [
    t,
    fr(s.getIsSorted())
  ] }) }),
  cell: ({ row: s }) => {
    const l = s.getValue("status"), c = s.getValue("item");
    return /* @__PURE__ */ v(Bi, { value: l, variant: "outline", type: "single", dir: a, children: [
      /* @__PURE__ */ i(
        Jn,
        {
          onClick: () => Br(
            [c],
            "approved",
            e,
            n,
            r,
            o
          ),
          value: "approved",
          children: /* @__PURE__ */ i(hl, {})
        }
      ),
      /* @__PURE__ */ i(
        Jn,
        {
          onClick: () => Br(
            [c],
            "unapproved",
            e,
            n,
            r,
            o
          ),
          value: "unapproved",
          children: /* @__PURE__ */ i(gl, {})
        }
      ),
      /* @__PURE__ */ i(
        Jn,
        {
          onClick: () => Br(
            [c],
            "unknown",
            e,
            n,
            r,
            o
          ),
          value: "unknown",
          children: /* @__PURE__ */ i(bl, {})
        }
      )
    ] });
  }
}), yh = Object.freeze([
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
]), rd = (t, e, n) => {
  let r = t;
  return e !== "all" && (r = r.filter(
    (o) => e === "approved" && o.status === "approved" || e === "unapproved" && o.status === "unapproved" || e === "unknown" && o.status === "unknown"
  )), n !== "" && (r = r.filter((o) => o.items[0].includes(n))), r;
}, od = (t, e, n, r, o) => {
  if (!t)
    return [];
  const a = [];
  let s = e.bookNum, l = e.chapterNum, c = e.verseNum;
  return Zc(t).forEach((u) => {
    u.startsWith("\\id") && (s = Qc(u), l = 0, c = 0), u.startsWith("\\c") && (l = ma(u), c = 0), u.startsWith("\\v") && (c = ma(u), l === 0 && (l = e.chapterNum));
    let f = o.exec(u) ?? void 0;
    for (; f; ) {
      const w = [];
      f.forEach((h) => w.push(h));
      const g = f.index, y = a.find((h) => ho(h.items, w)), m = {
        reference: {
          bookNum: s !== void 0 ? s : -1,
          chapterNum: l !== void 0 ? l : -1,
          verseNum: c !== void 0 ? c : -1
        },
        text: jl(u, Math.max(0, g - 25), Math.min(g + 25, u.length))
      };
      if (y)
        y.count += 1, y.occurrences.push(m);
      else {
        const h = {
          items: w,
          count: 1,
          status: td(w[0], n, r),
          occurrences: [m]
        };
        a.push(h);
      }
      f = o.exec(u) ?? void 0;
    }
  }), a;
}, ee = (t, e) => t[e] ?? e;
function xh({
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
  columns: u,
  direction: f
}) {
  const w = ee(n, "%webView_inventory_all%"), g = ee(n, "%webView_inventory_approved%"), y = ee(n, "%webView_inventory_unapproved%"), m = ee(n, "%webView_inventory_unknown%"), h = ee(n, "%webView_inventory_scope_currentBook%"), x = ee(n, "%webView_inventory_scope_chapter%"), $ = ee(n, "%webView_inventory_scope_verse%"), _ = ee(n, "%webView_inventory_filter_text%"), T = ee(
    n,
    "%webView_inventory_show_additional_items%"
  ), [b, I] = st(!1), [F, J] = st("all"), [O, A] = st(""), [D, P] = st([]), B = Nt(() => l ? r instanceof RegExp ? od(
    l,
    t,
    a,
    s,
    r
  ) : r(l, t, a, s) : [], [l, r, t, a, s]), q = Nt(() => {
    if (b)
      return B;
    const E = [];
    return B.forEach((U) => {
      const Y = U.items[0], G = E.find(
        (W) => W.items[0] === Y
      );
      G ? (G.count += U.count, G.occurrences = G.occurrences.concat(U.occurrences)) : E.push({
        items: [Y],
        count: U.count,
        occurrences: U.occurrences,
        status: U.status
      });
    }), E;
  }, [b, B]), H = Nt(() => rd(q, F, O), [q, F, O]), z = Nt(() => {
    var Y, G;
    if (!b)
      return u;
    const E = (Y = o == null ? void 0 : o.tableHeaders) == null ? void 0 : Y.length;
    if (!E)
      return u;
    const U = [];
    for (let W = 0; W < E; W++)
      U.push(
        nd(
          ((G = o == null ? void 0 : o.tableHeaders) == null ? void 0 : G[W]) || "Additional Item",
          W + 1
        )
      );
    return [...U, ...u];
  }, [o == null ? void 0 : o.tableHeaders, u, b]);
  Kt(() => {
    P([]);
  }, [H]);
  const tt = (E, U) => {
    U.setRowSelection(() => {
      const Y = {};
      return Y[E.index] = !0, Y;
    }), P(E.original.items);
  }, rt = (E) => {
    if (E === "book" || E === "chapter" || E === "verse")
      d(E);
    else
      throw new Error(`Invalid scope value: ${E}`);
  }, at = (E) => {
    if (E === "all" || E === "approved" || E === "unapproved" || E === "unknown")
      J(E);
    else
      throw new Error(`Invalid status filter value: ${E}`);
  }, k = Nt(() => {
    if (q.length === 0 || D.length === 0)
      return [];
    const E = q.filter((U) => ho(
      b ? U.items : [U.items[0]],
      D
    ));
    if (E.length > 1)
      throw new Error("Selected item is not unique");
    return E[0].occurrences;
  }, [D, b, q]);
  return /* @__PURE__ */ v("div", { className: "pr-twp tw-flex tw-h-full tw-flex-col", children: [
    /* @__PURE__ */ v("div", { className: "tw-flex tw-items-stretch", children: [
      /* @__PURE__ */ v(
        Nn,
        {
          onValueChange: (E) => at(E),
          defaultValue: F,
          dir: f,
          children: [
            /* @__PURE__ */ i(Fe, { className: "tw-m-1", children: /* @__PURE__ */ i(kn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ v(Ue, { children: [
              /* @__PURE__ */ i(Ht, { value: "all", children: w }),
              /* @__PURE__ */ i(Ht, { value: "approved", children: g }),
              /* @__PURE__ */ i(Ht, { value: "unapproved", children: y }),
              /* @__PURE__ */ i(Ht, { value: "unknown", children: m })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ v(
        Nn,
        {
          onValueChange: (E) => rt(E),
          defaultValue: c,
          dir: f,
          children: [
            /* @__PURE__ */ i(Fe, { className: "tw-m-1", children: /* @__PURE__ */ i(kn, { placeholder: "Select scope" }) }),
            /* @__PURE__ */ v(Ue, { children: [
              /* @__PURE__ */ i(Ht, { value: "book", children: h }),
              /* @__PURE__ */ i(Ht, { value: "chapter", children: x }),
              /* @__PURE__ */ i(Ht, { value: "verse", children: $ })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ i(
        Se,
        {
          className: "tw-m-1 tw-rounded-md tw-border",
          placeholder: _,
          value: O,
          onChange: (E) => {
            A(E.target.value);
          }
        }
      ),
      o && /* @__PURE__ */ v("div", { className: "tw-m-1 tw-flex tw-items-center tw-rounded-md tw-border", children: [
        /* @__PURE__ */ i(
          So,
          {
            className: "tw-m-1",
            checked: b,
            onCheckedChange: (E) => {
              P([]), I(E);
            }
          }
        ),
        /* @__PURE__ */ i(Mt, { className: "tw-m-1 tw-flex-shrink-0 tw-whitespace-nowrap", children: (o == null ? void 0 : o.checkboxText) ?? T })
      ] })
    ] }),
    /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Kc,
      {
        columns: z,
        data: H,
        onRowClickHandler: tt,
        stickyHeader: !0
      }
    ) }),
    k.length > 0 && /* @__PURE__ */ i("div", { className: "tw-m-1 tw-flex-1 tw-overflow-auto tw-rounded-md tw-border", children: /* @__PURE__ */ i(
      Jc,
      {
        occurrenceData: k,
        setScriptureReference: e,
        localizedStrings: n
      }
    ) })
  ] });
}
function Nh({
  entries: t,
  getEntriesCount: e = void 0,
  selected: n,
  onChange: r,
  placeholder: o,
  commandEmptyMessage: a = "No entries found",
  customSelectedText: s,
  sortSelected: l = !1,
  icon: c = void 0,
  direction: d = "ltr"
}) {
  const [u, f] = st(!1), w = Et(
    (m) => {
      r(
        n.includes(m) ? n.filter((h) => h !== m) : [...n, m]
      );
    },
    [n, r]
  ), g = () => {
    var m;
    return n.length === 1 ? ((m = t.find((h) => h.value === n[0])) == null ? void 0 : m.label) ?? o : s || o;
  }, y = Nt(() => {
    if (!l)
      return t;
    const m = t.filter((x) => x.starred).sort((x, $) => x.label.localeCompare($.label)), h = t.filter((x) => !x.starred).sort((x, $) => {
      const _ = n.includes(x.value), T = n.includes($.value);
      return _ && !T ? -1 : !_ && T ? 1 : x.label.localeCompare($.label);
    });
    return [...m, ...h];
  }, [t, n, l]);
  return /* @__PURE__ */ v(Ri, { open: u, onOpenChange: f, children: [
    /* @__PURE__ */ i(_i, { asChild: !0, children: /* @__PURE__ */ v(
      wt,
      {
        variant: "outline",
        role: "combobox",
        "aria-expanded": u,
        className: N(
          "tw-w-full tw-justify-between",
          n.length > 0 && n.length < t.length && "tw-border-primary",
          "tw-group"
        ),
        children: [
          /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-gap-2", children: [
            /* @__PURE__ */ i("div", { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50", children: /* @__PURE__ */ i("span", { className: "tw-flex tw-h-full tw-w-full tw-items-center tw-justify-center", children: c }) }),
            /* @__PURE__ */ i(
              "div",
              {
                className: N({
                  "tw-text-muted-foreground group-hover:tw-text-secondary-foreground": n.length === 0 || n.length === t.length
                }),
                children: g()
              }
            )
          ] }),
          /* @__PURE__ */ i(er, { className: "tw-ml-2 tw-h-4 tw-w-4 tw-shrink-0 tw-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ i(yo, { align: "start", className: "tw-w-full tw-p-0", dir: d, children: /* @__PURE__ */ v(xo, { children: [
      /* @__PURE__ */ i(No, { placeholder: `Search ${o.toLowerCase()}...` }),
      /* @__PURE__ */ v(ko, { children: [
        /* @__PURE__ */ i(Eo, { children: a }),
        /* @__PURE__ */ i($i, { children: y.map((m) => {
          const h = e ? e(m) : void 0;
          return /* @__PURE__ */ v(
            To,
            {
              value: m.value,
              onSelect: w,
              className: "tw-flex tw-items-center tw-gap-2",
              children: [
                /* @__PURE__ */ i("div", { className: "w-4", children: /* @__PURE__ */ i(
                  On,
                  {
                    className: N(
                      "tw-h-4 tw-w-4",
                      n.includes(m.value) ? "tw-opacity-100" : "tw-opacity-0"
                    )
                  }
                ) }),
                /* @__PURE__ */ i("div", { className: "tw-w-4", children: m.starred && /* @__PURE__ */ i(Nl, { className: "tw-h-4 tw-w-4" }) }),
                /* @__PURE__ */ i("div", { className: "tw-flex-grow", children: m.label }),
                e && /* @__PURE__ */ i("div", { className: "tw-w-10 tw-text-end tw-text-muted-foreground", children: h })
              ]
            },
            m.value
          );
        }) })
      ] })
    ] }) })
  ] });
}
function ji({
  onSearch: t,
  placeholder: e,
  isFullWidth: n,
  className: r,
  direction: o = "ltr"
}) {
  const [a, s] = st(""), l = (c) => {
    s(c), t(c);
  };
  return /* @__PURE__ */ v("div", { className: "tw-relative", children: [
    /* @__PURE__ */ i(
      mo,
      {
        className: N(
          "tw-absolute tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-opacity-50",
          { "tw-right-3": o === "rtl" },
          { "tw-left-3": o === "ltr" }
        )
      }
    ),
    /* @__PURE__ */ i(
      Se,
      {
        className: N("tw-text-ellipsis tw-pe-9 tw-ps-9", { "tw-w-full": n }, r),
        placeholder: e,
        value: a,
        onChange: (c) => l(c.target.value)
      }
    ),
    a && /* @__PURE__ */ v(
      wt,
      {
        variant: "ghost",
        size: "icon",
        className: N(
          "tw-absolute tw-top-1/2 tw-h-7 tw--translate-y-1/2 tw-transform hover:tw-bg-transparent",
          { "tw-left-0": o === "rtl" },
          { "tw-right-0": o === "ltr" }
        ),
        children: [
          /* @__PURE__ */ i(
            ui,
            {
              className: "tw-h-4 tw-w-4",
              onClick: () => {
                l("");
              }
            }
          ),
          /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Clear" })
        ]
      }
    )
  ] });
}
const Vi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.Root,
  {
    orientation: "vertical",
    ref: n,
    className: N("tw-flex tw-gap-1 tw-rounded-md tw-text-muted-foreground", t),
    ...e
  }
));
Vi.displayName = _t.List.displayName;
const zi = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.List,
  {
    ref: n,
    className: N(
      "tw-flex-fit tw-mlk-items-center tw-w-[124px] tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
zi.displayName = _t.List.displayName;
const ad = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.Trigger,
  {
    ref: n,
    ...e,
    className: N(
      "overflow-clip tw-inline-flex tw-w-[116px] tw-cursor-pointer tw-items-center tw-justify-center tw-break-words tw-rounded-sm tw-border-0 tw-bg-muted tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-text-inherit tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    )
  }
)), Li = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.Content,
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
Li.displayName = _t.Content.displayName;
function kh({
  tabList: t,
  onSearch: e,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1,
  direction: a = "ltr"
}) {
  return /* @__PURE__ */ v("div", { className: "pr-twp", children: [
    /* @__PURE__ */ v("div", { className: "tw-sticky tw-top-0 tw-space-y-2 tw-pb-2", children: [
      r ? /* @__PURE__ */ i("h1", { children: r }) : "",
      /* @__PURE__ */ i(
        ji,
        {
          isFullWidth: o,
          onSearch: e,
          placeholder: n,
          direction: a
        }
      )
    ] }),
    /* @__PURE__ */ v(Vi, { dir: a, children: [
      /* @__PURE__ */ i(zi, { children: t.map((s) => /* @__PURE__ */ i(ad, { value: s.value, children: s.value }, s.key)) }),
      t.map((s) => /* @__PURE__ */ i(Li, { value: s.value, children: s.content }, s.key))
    ] })
  ] });
}
const Co = S.forwardRef(({ className: t, orientation: e = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ i(
  gi.Root,
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
Co.displayName = gi.Root.displayName;
function ha({ className: t, ...e }) {
  return /* @__PURE__ */ i(
    "div",
    {
      className: N("pr-twp tw-animate-pulse tw-rounded-md tw-bg-muted", t),
      ...e
    }
  );
}
const id = Rn.Provider, sd = Rn.Root, ld = Rn.Trigger, Fi = S.forwardRef(({ className: t, sideOffset: e = 4, ...n }, r) => /* @__PURE__ */ i(
  Rn.Content,
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
Fi.displayName = Rn.Content.displayName;
const cd = "16rem", dd = "3rem", Ui = S.createContext(void 0);
function mr() {
  const t = S.useContext(Ui);
  if (!t)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return t;
}
const Gi = S.forwardRef(
  ({
    defaultOpen: t = !0,
    open: e,
    onOpenChange: n,
    className: r,
    style: o,
    children: a,
    side: s = "left",
    ...l
  }, c) => {
    const [d, u] = S.useState(t), f = e ?? d, w = S.useCallback(
      (h) => {
        const x = typeof h == "function" ? h(f) : h;
        n ? n(x) : u(x);
      },
      [n, f]
    ), g = S.useCallback(() => w((h) => !h), [w]), y = f ? "expanded" : "collapsed", m = S.useMemo(
      () => ({
        state: y,
        open: f,
        setOpen: w,
        toggleSidebar: g,
        side: s
      }),
      [y, f, w, g, s]
    );
    return /* @__PURE__ */ i(Ui.Provider, { value: m, children: /* @__PURE__ */ i(id, { delayDuration: 0, children: /* @__PURE__ */ i(
      "div",
      {
        style: (
          // eslint-disable-next-line no-type-assertion/no-type-assertion
          {
            "--sidebar-width": cd,
            "--sidebar-width-icon": dd,
            ...o
          }
        ),
        className: N(
          // Removed tw-min-h-svh
          "tw-group/sidebar-wrapper pr-twp tw-flex tw-w-full has-[[data-variant=inset]]:tw-bg-sidebar",
          r
        ),
        ref: c,
        ...l,
        children: a
      }
    ) }) });
  }
);
Gi.displayName = "SidebarProvider";
const Xi = S.forwardRef(({ variant: t = "sidebar", collapsible: e = "offcanvas", className: n, children: r, ...o }, a) => {
  const s = mr();
  return e === "none" ? /* @__PURE__ */ i(
    "div",
    {
      className: N(
        "tw-flex tw-h-full tw-w-[--sidebar-width] tw-flex-col tw-bg-sidebar tw-text-sidebar-foreground",
        n
      ),
      ref: a,
      ...o,
      children: r
    }
  ) : /* @__PURE__ */ v(
    "div",
    {
      ref: a,
      className: "tw-group tw-peer tw-hidden tw-text-sidebar-foreground md:tw-block",
      "data-state": s.state,
      "data-collapsible": s.state === "collapsed" ? e : "",
      "data-variant": t,
      "data-side": s.side,
      children: [
        /* @__PURE__ */ i(
          "div",
          {
            className: N(
              "tw-relative tw-h-svh tw-w-[--sidebar-width] tw-bg-transparent tw-transition-[width] tw-duration-200 tw-ease-linear",
              "group-data-[collapsible=offcanvas]:tw-w-0",
              "group-data-[side=right]:tw-rotate-180",
              t === "floating" || t === "inset" ? "group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4))]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon]"
            )
          }
        ),
        /* @__PURE__ */ i(
          "div",
          {
            className: N(
              // CUSTOM: Switched tw-fixed to tw-absolute here to scope the sidebar inside of it's container
              "tw-absolute tw-inset-y-0 tw-z-10 tw-hidden tw-h-svh tw-w-[--sidebar-width] tw-transition-[left,right,width] tw-duration-200 tw-ease-linear md:tw-flex",
              s.side === "left" ? "tw-left-0 group-data-[collapsible=offcanvas]:tw-left-[calc(var(--sidebar-width)*-1)]" : "tw-right-0 group-data-[collapsible=offcanvas]:tw-right-[calc(var(--sidebar-width)*-1)]",
              // Adjust the padding for floating and inset variants.
              t === "floating" || t === "inset" ? "tw-p-2 group-data-[collapsible=icon]:tw-w-[calc(var(--sidebar-width-icon)_+_theme(spacing.4)_+2px)]" : "group-data-[collapsible=icon]:tw-w-[--sidebar-width-icon] group-data-[side=left]:tw-border-r group-data-[side=right]:tw-border-l",
              n
            ),
            ...o,
            children: /* @__PURE__ */ i(
              "div",
              {
                "data-sidebar": "sidebar",
                className: "tw-flex tw-h-full tw-w-full tw-flex-col tw-bg-sidebar group-data-[variant=floating]:tw-rounded-lg group-data-[variant=floating]:tw-border group-data-[variant=floating]:tw-border-sidebar-border group-data-[variant=floating]:tw-shadow",
                children: r
              }
            )
          }
        )
      ]
    }
  );
});
Xi.displayName = "Sidebar";
const ud = S.forwardRef(({ className: t, onClick: e, ...n }, r) => {
  const o = mr();
  return /* @__PURE__ */ v(
    wt,
    {
      ref: r,
      "data-sidebar": "trigger",
      variant: "ghost",
      size: "icon",
      className: N("tw-h-7 tw-w-7", t),
      onClick: (a) => {
        e == null || e(a), o.toggleSidebar();
      },
      ...n,
      children: [
        o.side === "left" ? /* @__PURE__ */ i(kl, {}) : /* @__PURE__ */ i(El, {}),
        /* @__PURE__ */ i("span", { className: "tw-sr-only", children: "Toggle Sidebar" })
      ]
    }
  );
});
ud.displayName = "SidebarTrigger";
const pd = S.forwardRef(
  ({ className: t, ...e }, n) => {
    const { toggleSidebar: r } = mr();
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
pd.displayName = "SidebarRail";
const Hi = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "main",
    {
      ref: n,
      className: N(
        // CUSTOM: Removed tw-min-h-svh
        "tw-relative tw-flex tw-flex-1 tw-flex-col tw-bg-background",
        "peer-data-[variant=inset]:tw-min-h-[calc(100svh-theme(spacing.4))] md:peer-data-[variant=inset]:tw-m-2 md:peer-data-[state=collapsed]:peer-data-[variant=inset]:tw-ml-2 md:peer-data-[variant=inset]:tw-ml-0 md:peer-data-[variant=inset]:tw-rounded-xl md:peer-data-[variant=inset]:tw-shadow",
        t
      ),
      ...e
    }
  )
);
Hi.displayName = "SidebarInset";
const wd = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Se,
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
wd.displayName = "SidebarInput";
const fd = S.forwardRef(
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
fd.displayName = "SidebarHeader";
const md = S.forwardRef(
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
md.displayName = "SidebarFooter";
const hd = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  Co,
  {
    ref: n,
    "data-sidebar": "separator",
    className: N("tw-mx-2 tw-w-auto tw-bg-sidebar-border", t),
    ...e
  }
));
hd.displayName = "SidebarSeparator";
const Yi = S.forwardRef(
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
Yi.displayName = "SidebarContent";
const eo = S.forwardRef(
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
eo.displayName = "SidebarGroup";
const no = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
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
no.displayName = "SidebarGroupLabel";
const gd = S.forwardRef(({ className: t, asChild: e = !1, ...n }, r) => /* @__PURE__ */ i(
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
gd.displayName = "SidebarGroupAction";
const ro = S.forwardRef(
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
ro.displayName = "SidebarGroupContent";
const Wi = S.forwardRef(
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
Wi.displayName = "SidebarMenu";
const qi = S.forwardRef(
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
qi.displayName = "SidebarMenuItem";
const bd = Je(
  // CUSTOM: Removed data-[active=true]:tw-bg-sidebar-accent
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
), Ki = S.forwardRef(
  ({
    asChild: t = !1,
    isActive: e = !1,
    variant: n = "default",
    size: r = "default",
    tooltip: o,
    className: a,
    ...s
  }, l) => {
    const c = t ? Ke : "button", { state: d } = mr(), u = /* @__PURE__ */ i(
      c,
      {
        ref: l,
        "data-sidebar": "menu-button",
        "data-size": r,
        "data-active": e,
        className: N(bd({ variant: n, size: r }), a),
        ...s
      }
    );
    return o ? (typeof o == "string" && (o = {
      children: o
    }), /* @__PURE__ */ v(sd, { children: [
      /* @__PURE__ */ i(ld, { asChild: !0, children: u }),
      /* @__PURE__ */ i(Fi, { side: "right", align: "center", hidden: d !== "collapsed", ...o })
    ] })) : u;
  }
);
Ki.displayName = "SidebarMenuButton";
const vd = S.forwardRef(({ className: t, asChild: e = !1, showOnHover: n = !1, ...r }, o) => /* @__PURE__ */ i(
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
vd.displayName = "SidebarMenuAction";
const yd = S.forwardRef(
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
yd.displayName = "SidebarMenuBadge";
const xd = S.forwardRef(({ className: t, showIcon: e = !1, ...n }, r) => {
  const o = S.useMemo(() => `${Math.floor(Math.random() * 40) + 50}%`, []);
  return /* @__PURE__ */ v(
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
xd.displayName = "SidebarMenuSkeleton";
const Nd = S.forwardRef(
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
Nd.displayName = "SidebarMenuSub";
const kd = S.forwardRef(
  ({ ...t }, e) => /* @__PURE__ */ i("li", { ref: e, ...t })
);
kd.displayName = "SidebarMenuSubItem";
const Ed = S.forwardRef(({ asChild: t = !1, size: e = "md", isActive: n, className: r, ...o }, a) => /* @__PURE__ */ i(
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
Ed.displayName = "SidebarMenuSubButton";
function Td({
  id: t,
  extensionLabels: e,
  projectInfo: n,
  handleSelectSidebarItem: r,
  selectedSidebarItem: o,
  extensionsSidebarGroupLabel: a,
  projectsSidebarGroupLabel: s,
  buttonPlaceholderText: l
}) {
  const c = Et(
    (f, w) => {
      r(f, w);
    },
    [r]
  ), d = Et(
    (f) => {
      const w = n.find((g) => g.projectId === f);
      return w ? w.projectName : f;
    },
    [n]
  ), u = Et(
    (f) => !o.projectId && f === o.label,
    [o]
  );
  return /* @__PURE__ */ i(
    Xi,
    {
      id: t,
      collapsible: "none",
      variant: "inset",
      className: "tw-w-96 tw-gap-2 tw-overflow-y-auto tw-rounded tw-bg-slate-100",
      children: /* @__PURE__ */ v(Yi, { children: [
        /* @__PURE__ */ v(eo, { children: [
          /* @__PURE__ */ i(no, { className: "tw-text-sm tw-text-gray-400", children: a }),
          /* @__PURE__ */ i(ro, { children: /* @__PURE__ */ i(Wi, { children: e.map((f) => /* @__PURE__ */ i(qi, { children: /* @__PURE__ */ i(
            Ki,
            {
              className: N(
                "tw-rounded tw-py-2 tw-text-sm tw-text-gray-500 hover:tw-bg-white hover:tw-text-gray-900 hover:tw-shadow-sm active:tw-bg-white",
                { "tw-bg-white tw-text-gray-900 tw-shadow-sm": u(f) }
              ),
              onClick: () => c(f),
              isActive: u(f),
              children: /* @__PURE__ */ i("span", { className: "tw-pl-3", children: f })
            }
          ) }, f)) }) })
        ] }),
        /* @__PURE__ */ v(eo, { children: [
          /* @__PURE__ */ i(no, { className: "tw-text-sm tw-text-gray-400", children: s }),
          /* @__PURE__ */ i(ro, { className: "tw-pl-3", children: /* @__PURE__ */ i(
            or,
            {
              popoverContentClassName: "tw-z-[1000]",
              options: n.flatMap((f) => f.projectId),
              getOptionLabel: (f) => d(f),
              buttonPlaceholder: l,
              onChange: (f) => {
                const w = d(f);
                c(w, f);
              },
              value: (o == null ? void 0 : o.projectId) ?? void 0
            }
          ) })
        ] })
      ] })
    }
  );
}
function Eh({
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
  return /* @__PURE__ */ v("div", { className: "tw-box-border tw-flex tw-h-full tw-flex-col tw-p-3", children: [
    /* @__PURE__ */ i("div", { className: "tw-box-border tw-flex tw-items-center tw-justify-center tw-py-4", children: /* @__PURE__ */ i(
      ji,
      {
        className: "tw-w-9/12",
        onSearch: s,
        placeholder: "Search app settings, extension settings, and project settings"
      }
    ) }),
    /* @__PURE__ */ v(Gi, { id: t, className: "tw-h-full tw-flex-1 tw-gap-4 tw-overflow-auto", children: [
      /* @__PURE__ */ i(
        Td,
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
      /* @__PURE__ */ i(Hi, { className: "tw-overflow-y-auto", children: r })
    ] })
  ] });
}
const ie = "scrBook", Sd = "scrRef", me = "source", Cd = "details", Od = "Scripture Reference", Rd = "Scripture Book", Ji = "Type", _d = "Details";
function Pd(t, e) {
  const n = e ?? !1;
  return [
    {
      accessorFn: (r) => `${it.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: ie,
      header: (t == null ? void 0 : t.scriptureReferenceColumnName) ?? Od,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? it.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === ie ? Ar(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => Jr(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Ar(r.start),
      id: Sd,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Ar(o.start);
      },
      sortingFn: (r, o) => Jr(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: me,
      header: n ? (t == null ? void 0 : t.typeColumnName) ?? Ji : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Cd,
      header: (t == null ? void 0 : t.detailsColumnName) ?? _d,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
const $d = (t) => {
  if (!("offset" in t.start))
    throw new Error("No offset available in range start");
  if (t.end && !("offset" in t.end))
    throw new Error("No offset available in range end");
  const { offset: e } = t.start;
  let n = 0;
  return t.end && ({ offset: n } = t.end), !t.end || Jr(t.start, t.end) === 0 ? `${Mr(t.start)}+${e}` : `${Mr(t.start)}+${e}-${Mr(t.end)}+${n}`;
}, ga = (t) => `${$d({ start: t.start, end: t.end })} ${t.source.displayName} ${t.detail}`;
function Th({
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
  const [d, u] = st([]), [f, w] = st([{ id: ie, desc: !1 }]), [g, y] = st({}), m = Nt(
    () => t.flatMap((O) => O.data.map((A) => ({
      ...A,
      source: O.source
    }))),
    [t]
  ), h = Nt(
    () => Pd(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: s
      },
      n
    ),
    [r, a, s, n]
  );
  Kt(() => {
    d.includes(me) ? w([
      { id: me, desc: !1 },
      { id: ie, desc: !1 }
    ]) : w([{ id: ie, desc: !1 }]);
  }, [d]);
  const x = wi({
    data: m,
    columns: h,
    state: {
      grouping: d,
      sorting: f,
      rowSelection: g
    },
    onGroupingChange: u,
    onSortingChange: w,
    onRowSelectionChange: y,
    getExpandedRowModel: Gl(),
    getGroupedRowModel: Xl(),
    getCoreRowModel: fi(),
    getSortedRowModel: mi(),
    getRowId: ga,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Kt(() => {
    if (l) {
      const O = x.getSelectedRowModel().rowsById, A = Object.keys(O);
      if (A.length === 1) {
        const D = m.find((P) => ga(P) === A[0]) || void 0;
        D && l(D);
      }
    }
  }, [g, m, l, x]);
  const $ = o ?? Rd, _ = a ?? Ji, T = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${$}`, value: [ie] },
    { label: `Group by ${_}`, value: [me] },
    {
      label: `Group by ${$} and ${_}`,
      value: [ie, me]
    },
    {
      label: `Group by ${_} and ${$}`,
      value: [me, ie]
    }
  ], b = (O) => {
    u(JSON.parse(O));
  }, I = (O, A) => {
    !O.getIsGrouped() && !O.getIsSelected() && O.getToggleSelectedHandler()(A);
  }, F = (O, A) => O.getIsGrouped() ? "" : N("banded-row", A % 2 === 0 ? "even" : "odd"), J = (O, A, D) => {
    if (!((O == null ? void 0 : O.length) === 0 || A.depth < D.column.getGroupedIndex())) {
      if (A.getIsGrouped())
        switch (A.depth) {
          case 1:
            return "tw-ps-4";
          default:
            return;
        }
      switch (A.depth) {
        case 1:
          return "tw-ps-8";
        case 2:
          return "tw-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ v("div", { className: "pr-twp tw-flex tw-h-full tw-w-full tw-flex-col", children: [
    !e && /* @__PURE__ */ v(
      Nn,
      {
        value: JSON.stringify(d),
        onValueChange: (O) => {
          b(O);
        },
        dir: c,
        children: [
          /* @__PURE__ */ i(Fe, { className: "tw-mb-1 tw-mt-2", children: /* @__PURE__ */ i(kn, {}) }),
          /* @__PURE__ */ i(Ue, { position: "item-aligned", children: /* @__PURE__ */ i(Gc, { children: T.map((O) => /* @__PURE__ */ i(Ht, { value: JSON.stringify(O.value), children: O.label }, O.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ v($n, { className: "tw-relative tw-flex tw-flex-col tw-overflow-y-auto tw-p-0", children: [
      e && /* @__PURE__ */ i(In, { children: x.getHeaderGroups().map((O) => /* @__PURE__ */ i(Wt, { children: O.headers.filter((A) => A.column.columnDef.header).map((A) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ i(jt, { colSpan: A.colSpan, className: "top-0 tw-sticky", children: A.isPlaceholder ? void 0 : /* @__PURE__ */ v("div", { children: [
          A.column.getCanGroup() ? /* @__PURE__ */ i(
            wt,
            {
              variant: "ghost",
              title: `Toggle grouping by ${A.column.columnDef.header}`,
              onClick: A.column.getToggleGroupingHandler(),
              type: "button",
              children: A.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          fn(A.column.columnDef.header, A.getContext())
        ] }) }, A.id)
      )) }, O.id)) }),
      /* @__PURE__ */ i(An, { children: x.getRowModel().rows.map((O, A) => /* @__PURE__ */ i(
        Wt,
        {
          "data-state": O.getIsSelected() ? "selected" : "",
          className: N(F(O, A)),
          onClick: (D) => I(O, D),
          children: O.getVisibleCells().map((D) => {
            if (!(D.getIsPlaceholder() || D.column.columnDef.enableGrouping && !D.getIsGrouped() && (D.column.columnDef.id !== me || !n)))
              return /* @__PURE__ */ i(
                It,
                {
                  className: N(
                    D.column.columnDef.id,
                    "tw-p-[1px]",
                    J(d, O, D)
                  ),
                  children: (() => D.getIsGrouped() ? /* @__PURE__ */ v(
                    wt,
                    {
                      variant: "link",
                      onClick: O.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        O.getIsExpanded() && /* @__PURE__ */ i(ze, {}),
                        !O.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ i(ci, {}) : /* @__PURE__ */ i(Tl, {})),
                        " ",
                        fn(D.column.columnDef.cell, D.getContext()),
                        " (",
                        O.subRows.length,
                        ")"
                      ]
                    }
                  ) : fn(D.column.columnDef.cell, D.getContext()))()
                },
                D.id
              );
          })
        },
        O.id
      )) })
    ] })
  ] });
}
const jr = {
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
function Sh({
  availableScrollGroupIds: t,
  scrollGroupId: e,
  onChangeScrollGroupId: n,
  localizedStrings: r = {},
  direction: o = "ltr"
}) {
  const a = {
    ...jr,
    ...Object.fromEntries(
      Object.entries(r).map(
        ([s, l]) => [
          s,
          s === l && s in jr ? jr[s] : l
        ]
      )
    )
  };
  return /* @__PURE__ */ v(
    Nn,
    {
      value: `${e}`,
      onValueChange: (s) => n(
        s === "undefined" ? void 0 : parseInt(s, 10)
      ),
      dir: o,
      children: [
        /* @__PURE__ */ i(Fe, { className: "pr-twp tw-w-auto", children: /* @__PURE__ */ i(
          kn,
          {
            placeholder: a[pt(e)] ?? e
          }
        ) }),
        /* @__PURE__ */ i(
          Ue,
          {
            style: { zIndex: 250 },
            children: t.map((s) => /* @__PURE__ */ i(Ht, { value: `${s}`, children: a[pt(s)] }, `${s}`))
          }
        )
      ]
    }
  );
}
function Ch({ children: t }) {
  return /* @__PURE__ */ i("div", { className: "pr-twp tw-grid", children: t });
}
function Oh({
  primary: t,
  secondary: e,
  children: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-justify-between tw-space-x-4 tw-py-2", children: [
    /* @__PURE__ */ v("div", { children: [
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-font-medium tw-leading-none", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-whitespace-normal tw-break-words tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    r ? /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: o }) : /* @__PURE__ */ i("div", { children: n })
  ] });
}
function Rh({
  primary: t,
  secondary: e,
  includeSeparator: n = !1
}) {
  return /* @__PURE__ */ v("div", { className: "tw-space-y-4 tw-py-2", children: [
    /* @__PURE__ */ v("div", { children: [
      /* @__PURE__ */ i("h3", { className: "tw-text-lg tw-font-medium", children: t }),
      /* @__PURE__ */ i("p", { className: "tw-text-sm tw-text-muted-foreground", children: e })
    ] }),
    n ? /* @__PURE__ */ i(Co, {}) : ""
  ] });
}
function _h({
  id: t,
  className: e,
  listItems: n,
  selectedListItems: r,
  handleSelectListItem: o,
  createLabel: a
}) {
  return /* @__PURE__ */ i("div", { id: t, className: e, children: n.map((s) => /* @__PURE__ */ v("div", { className: "tw-m-2 tw-flex tw-items-center", children: [
    /* @__PURE__ */ i(
      So,
      {
        className: "tw-me-2 tw-align-middle",
        checked: r.includes(s),
        onCheckedChange: (l) => o(s, l)
      }
    ),
    /* @__PURE__ */ i(Mt, { children: a ? a(s) : s })
  ] }, s)) });
}
function Id(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
function Ad(t) {
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
var Oo = {}, Zi = { exports: {} };
(function(t) {
  function e(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  t.exports = e, t.exports.__esModule = !0, t.exports.default = t.exports;
})(Zi);
var Md = Zi.exports, Vr = {};
function Ro(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : function(...r) {
    return t(...r) || e(...r);
  };
}
function M() {
  return M = Object.assign ? Object.assign.bind() : function(t) {
    for (var e = 1; e < arguments.length; e++) {
      var n = arguments[e];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (t[r] = n[r]);
    }
    return t;
  }, M.apply(this, arguments);
}
function be(t) {
  if (typeof t != "object" || t === null)
    return !1;
  const e = Object.getPrototypeOf(t);
  return (e === null || e === Object.prototype || Object.getPrototypeOf(e) === null) && !(Symbol.toStringTag in t) && !(Symbol.iterator in t);
}
function Qi(t) {
  if (!be(t))
    return t;
  const e = {};
  return Object.keys(t).forEach((n) => {
    e[n] = Qi(t[n]);
  }), e;
}
function ne(t, e, n = {
  clone: !0
}) {
  const r = n.clone ? M({}, t) : t;
  return be(t) && be(e) && Object.keys(e).forEach((o) => {
    o !== "__proto__" && (be(e[o]) && o in t && be(t[o]) ? r[o] = ne(t[o], e[o], n) : n.clone ? r[o] = be(e[o]) ? Qi(e[o]) : e[o] : r[o] = e[o]);
  }), r;
}
var oo = { exports: {} }, Hn = { exports: {} }, lt = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ba;
function Dd() {
  if (ba)
    return lt;
  ba = 1;
  var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, y = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, x = t ? Symbol.for("react.responder") : 60118, $ = t ? Symbol.for("react.scope") : 60119;
  function _(b) {
    if (typeof b == "object" && b !== null) {
      var I = b.$$typeof;
      switch (I) {
        case e:
          switch (b = b.type, b) {
            case c:
            case d:
            case r:
            case a:
            case o:
            case f:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case u:
                case y:
                case g:
                case s:
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
  function T(b) {
    return _(b) === d;
  }
  return lt.AsyncMode = c, lt.ConcurrentMode = d, lt.ContextConsumer = l, lt.ContextProvider = s, lt.Element = e, lt.ForwardRef = u, lt.Fragment = r, lt.Lazy = y, lt.Memo = g, lt.Portal = n, lt.Profiler = a, lt.StrictMode = o, lt.Suspense = f, lt.isAsyncMode = function(b) {
    return T(b) || _(b) === c;
  }, lt.isConcurrentMode = T, lt.isContextConsumer = function(b) {
    return _(b) === l;
  }, lt.isContextProvider = function(b) {
    return _(b) === s;
  }, lt.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, lt.isForwardRef = function(b) {
    return _(b) === u;
  }, lt.isFragment = function(b) {
    return _(b) === r;
  }, lt.isLazy = function(b) {
    return _(b) === y;
  }, lt.isMemo = function(b) {
    return _(b) === g;
  }, lt.isPortal = function(b) {
    return _(b) === n;
  }, lt.isProfiler = function(b) {
    return _(b) === a;
  }, lt.isStrictMode = function(b) {
    return _(b) === o;
  }, lt.isSuspense = function(b) {
    return _(b) === f;
  }, lt.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === d || b === a || b === o || b === f || b === w || typeof b == "object" && b !== null && (b.$$typeof === y || b.$$typeof === g || b.$$typeof === s || b.$$typeof === l || b.$$typeof === u || b.$$typeof === h || b.$$typeof === x || b.$$typeof === $ || b.$$typeof === m);
  }, lt.typeOf = _, lt;
}
var ct = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var va;
function Bd() {
  return va || (va = 1, process.env.NODE_ENV !== "production" && function() {
    var t = typeof Symbol == "function" && Symbol.for, e = t ? Symbol.for("react.element") : 60103, n = t ? Symbol.for("react.portal") : 60106, r = t ? Symbol.for("react.fragment") : 60107, o = t ? Symbol.for("react.strict_mode") : 60108, a = t ? Symbol.for("react.profiler") : 60114, s = t ? Symbol.for("react.provider") : 60109, l = t ? Symbol.for("react.context") : 60110, c = t ? Symbol.for("react.async_mode") : 60111, d = t ? Symbol.for("react.concurrent_mode") : 60111, u = t ? Symbol.for("react.forward_ref") : 60112, f = t ? Symbol.for("react.suspense") : 60113, w = t ? Symbol.for("react.suspense_list") : 60120, g = t ? Symbol.for("react.memo") : 60115, y = t ? Symbol.for("react.lazy") : 60116, m = t ? Symbol.for("react.block") : 60121, h = t ? Symbol.for("react.fundamental") : 60117, x = t ? Symbol.for("react.responder") : 60118, $ = t ? Symbol.for("react.scope") : 60119;
    function _(C) {
      return typeof C == "string" || typeof C == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      C === r || C === d || C === a || C === o || C === f || C === w || typeof C == "object" && C !== null && (C.$$typeof === y || C.$$typeof === g || C.$$typeof === s || C.$$typeof === l || C.$$typeof === u || C.$$typeof === h || C.$$typeof === x || C.$$typeof === $ || C.$$typeof === m);
    }
    function T(C) {
      if (typeof C == "object" && C !== null) {
        var ft = C.$$typeof;
        switch (ft) {
          case e:
            var V = C.type;
            switch (V) {
              case c:
              case d:
              case r:
              case a:
              case o:
              case f:
                return V;
              default:
                var xt = V && V.$$typeof;
                switch (xt) {
                  case l:
                  case u:
                  case y:
                  case g:
                  case s:
                    return xt;
                  default:
                    return ft;
                }
            }
          case n:
            return ft;
        }
      }
    }
    var b = c, I = d, F = l, J = s, O = e, A = u, D = r, P = y, B = g, q = n, H = a, z = o, tt = f, rt = !1;
    function at(C) {
      return rt || (rt = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), k(C) || T(C) === c;
    }
    function k(C) {
      return T(C) === d;
    }
    function E(C) {
      return T(C) === l;
    }
    function U(C) {
      return T(C) === s;
    }
    function Y(C) {
      return typeof C == "object" && C !== null && C.$$typeof === e;
    }
    function G(C) {
      return T(C) === u;
    }
    function W(C) {
      return T(C) === r;
    }
    function L(C) {
      return T(C) === y;
    }
    function Z(C) {
      return T(C) === g;
    }
    function K(C) {
      return T(C) === n;
    }
    function Q(C) {
      return T(C) === a;
    }
    function R(C) {
      return T(C) === o;
    }
    function X(C) {
      return T(C) === f;
    }
    ct.AsyncMode = b, ct.ConcurrentMode = I, ct.ContextConsumer = F, ct.ContextProvider = J, ct.Element = O, ct.ForwardRef = A, ct.Fragment = D, ct.Lazy = P, ct.Memo = B, ct.Portal = q, ct.Profiler = H, ct.StrictMode = z, ct.Suspense = tt, ct.isAsyncMode = at, ct.isConcurrentMode = k, ct.isContextConsumer = E, ct.isContextProvider = U, ct.isElement = Y, ct.isForwardRef = G, ct.isFragment = W, ct.isLazy = L, ct.isMemo = Z, ct.isPortal = K, ct.isProfiler = Q, ct.isStrictMode = R, ct.isSuspense = X, ct.isValidElementType = _, ct.typeOf = T;
  }()), ct;
}
var ya;
function ts() {
  return ya || (ya = 1, process.env.NODE_ENV === "production" ? Hn.exports = Dd() : Hn.exports = Bd()), Hn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var zr, xa;
function jd() {
  if (xa)
    return zr;
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
  return zr = o() ? Object.assign : function(a, s) {
    for (var l, c = r(a), d, u = 1; u < arguments.length; u++) {
      l = Object(arguments[u]);
      for (var f in l)
        e.call(l, f) && (c[f] = l[f]);
      if (t) {
        d = t(l);
        for (var w = 0; w < d.length; w++)
          n.call(l, d[w]) && (c[d[w]] = l[d[w]]);
      }
    }
    return c;
  }, zr;
}
var Lr, Na;
function _o() {
  if (Na)
    return Lr;
  Na = 1;
  var t = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Lr = t, Lr;
}
var Fr, ka;
function es() {
  return ka || (ka = 1, Fr = Function.call.bind(Object.prototype.hasOwnProperty)), Fr;
}
var Ur, Ea;
function Vd() {
  if (Ea)
    return Ur;
  Ea = 1;
  var t = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var e = _o(), n = {}, r = es();
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
          var f;
          try {
            if (typeof a[u] != "function") {
              var w = Error(
                (c || "React class") + ": " + l + " type `" + u + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[u] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw w.name = "Invariant Violation", w;
            }
            f = a[u](s, u, c, l, null, e);
          } catch (y) {
            f = y;
          }
          if (f && !(f instanceof Error) && t(
            (c || "React class") + ": type specification of " + l + " `" + u + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof f + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), f instanceof Error && !(f.message in n)) {
            n[f.message] = !0;
            var g = d ? d() : "";
            t(
              "Failed " + l + " type: " + f.message + (g ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Ur = o, Ur;
}
var Gr, Ta;
function zd() {
  if (Ta)
    return Gr;
  Ta = 1;
  var t = ts(), e = jd(), n = _o(), r = es(), o = Vd(), a = function() {
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
  return Gr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, u = "@@iterator";
    function f(k) {
      var E = k && (d && k[d] || k[u]);
      if (typeof E == "function")
        return E;
    }
    var w = "<<anonymous>>", g = {
      array: x("array"),
      bigint: x("bigint"),
      bool: x("boolean"),
      func: x("function"),
      number: x("number"),
      object: x("object"),
      string: x("string"),
      symbol: x("symbol"),
      any: $(),
      arrayOf: _,
      element: T(),
      elementType: b(),
      instanceOf: I,
      node: A(),
      objectOf: J,
      oneOf: F,
      oneOfType: O,
      shape: P,
      exact: B
    };
    function y(k, E) {
      return k === E ? k !== 0 || 1 / k === 1 / E : k !== k && E !== E;
    }
    function m(k, E) {
      this.message = k, this.data = E && typeof E == "object" ? E : {}, this.stack = "";
    }
    m.prototype = Error.prototype;
    function h(k) {
      if (process.env.NODE_ENV !== "production")
        var E = {}, U = 0;
      function Y(W, L, Z, K, Q, R, X) {
        if (K = K || w, R = R || Z, X !== n) {
          if (c) {
            var C = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw C.name = "Invariant Violation", C;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ft = K + ":" + Z;
            !E[ft] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + R + "` prop on `" + K + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), E[ft] = !0, U++);
          }
        }
        return L[Z] == null ? W ? L[Z] === null ? new m("The " + Q + " `" + R + "` is marked as required " + ("in `" + K + "`, but its value is `null`.")) : new m("The " + Q + " `" + R + "` is marked as required in " + ("`" + K + "`, but its value is `undefined`.")) : null : k(L, Z, K, Q, R);
      }
      var G = Y.bind(null, !1);
      return G.isRequired = Y.bind(null, !0), G;
    }
    function x(k) {
      function E(U, Y, G, W, L, Z) {
        var K = U[Y], Q = z(K);
        if (Q !== k) {
          var R = tt(K);
          return new m(
            "Invalid " + W + " `" + L + "` of type " + ("`" + R + "` supplied to `" + G + "`, expected ") + ("`" + k + "`."),
            { expectedType: k }
          );
        }
        return null;
      }
      return h(E);
    }
    function $() {
      return h(s);
    }
    function _(k) {
      function E(U, Y, G, W, L) {
        if (typeof k != "function")
          return new m("Property `" + L + "` of component `" + G + "` has invalid PropType notation inside arrayOf.");
        var Z = U[Y];
        if (!Array.isArray(Z)) {
          var K = z(Z);
          return new m("Invalid " + W + " `" + L + "` of type " + ("`" + K + "` supplied to `" + G + "`, expected an array."));
        }
        for (var Q = 0; Q < Z.length; Q++) {
          var R = k(Z, Q, G, W, L + "[" + Q + "]", n);
          if (R instanceof Error)
            return R;
        }
        return null;
      }
      return h(E);
    }
    function T() {
      function k(E, U, Y, G, W) {
        var L = E[U];
        if (!l(L)) {
          var Z = z(L);
          return new m("Invalid " + G + " `" + W + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return h(k);
    }
    function b() {
      function k(E, U, Y, G, W) {
        var L = E[U];
        if (!t.isValidElementType(L)) {
          var Z = z(L);
          return new m("Invalid " + G + " `" + W + "` of type " + ("`" + Z + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return h(k);
    }
    function I(k) {
      function E(U, Y, G, W, L) {
        if (!(U[Y] instanceof k)) {
          var Z = k.name || w, K = at(U[Y]);
          return new m("Invalid " + W + " `" + L + "` of type " + ("`" + K + "` supplied to `" + G + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return h(E);
    }
    function F(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), s;
      function E(U, Y, G, W, L) {
        for (var Z = U[Y], K = 0; K < k.length; K++)
          if (y(Z, k[K]))
            return null;
        var Q = JSON.stringify(k, function(X, C) {
          var ft = tt(C);
          return ft === "symbol" ? String(C) : C;
        });
        return new m("Invalid " + W + " `" + L + "` of value `" + String(Z) + "` " + ("supplied to `" + G + "`, expected one of " + Q + "."));
      }
      return h(E);
    }
    function J(k) {
      function E(U, Y, G, W, L) {
        if (typeof k != "function")
          return new m("Property `" + L + "` of component `" + G + "` has invalid PropType notation inside objectOf.");
        var Z = U[Y], K = z(Z);
        if (K !== "object")
          return new m("Invalid " + W + " `" + L + "` of type " + ("`" + K + "` supplied to `" + G + "`, expected an object."));
        for (var Q in Z)
          if (r(Z, Q)) {
            var R = k(Z, Q, G, W, L + "." + Q, n);
            if (R instanceof Error)
              return R;
          }
        return null;
      }
      return h(E);
    }
    function O(k) {
      if (!Array.isArray(k))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), s;
      for (var E = 0; E < k.length; E++) {
        var U = k[E];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + rt(U) + " at index " + E + "."
          ), s;
      }
      function Y(G, W, L, Z, K) {
        for (var Q = [], R = 0; R < k.length; R++) {
          var X = k[R], C = X(G, W, L, Z, K, n);
          if (C == null)
            return null;
          C.data && r(C.data, "expectedType") && Q.push(C.data.expectedType);
        }
        var ft = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new m("Invalid " + Z + " `" + K + "` supplied to " + ("`" + L + "`" + ft + "."));
      }
      return h(Y);
    }
    function A() {
      function k(E, U, Y, G, W) {
        return q(E[U]) ? null : new m("Invalid " + G + " `" + W + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return h(k);
    }
    function D(k, E, U, Y, G) {
      return new m(
        (k || "React class") + ": " + E + " type `" + U + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + G + "`."
      );
    }
    function P(k) {
      function E(U, Y, G, W, L) {
        var Z = U[Y], K = z(Z);
        if (K !== "object")
          return new m("Invalid " + W + " `" + L + "` of type `" + K + "` " + ("supplied to `" + G + "`, expected `object`."));
        for (var Q in k) {
          var R = k[Q];
          if (typeof R != "function")
            return D(G, W, L, Q, tt(R));
          var X = R(Z, Q, G, W, L + "." + Q, n);
          if (X)
            return X;
        }
        return null;
      }
      return h(E);
    }
    function B(k) {
      function E(U, Y, G, W, L) {
        var Z = U[Y], K = z(Z);
        if (K !== "object")
          return new m("Invalid " + W + " `" + L + "` of type `" + K + "` " + ("supplied to `" + G + "`, expected `object`."));
        var Q = e({}, U[Y], k);
        for (var R in Q) {
          var X = k[R];
          if (r(k, R) && typeof X != "function")
            return D(G, W, L, R, tt(X));
          if (!X)
            return new m(
              "Invalid " + W + " `" + L + "` key `" + R + "` supplied to `" + G + "`.\nBad object: " + JSON.stringify(U[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(k), null, "  ")
            );
          var C = X(Z, R, G, W, L + "." + R, n);
          if (C)
            return C;
        }
        return null;
      }
      return h(E);
    }
    function q(k) {
      switch (typeof k) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !k;
        case "object":
          if (Array.isArray(k))
            return k.every(q);
          if (k === null || l(k))
            return !0;
          var E = f(k);
          if (E) {
            var U = E.call(k), Y;
            if (E !== k.entries) {
              for (; !(Y = U.next()).done; )
                if (!q(Y.value))
                  return !1;
            } else
              for (; !(Y = U.next()).done; ) {
                var G = Y.value;
                if (G && !q(G[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function H(k, E) {
      return k === "symbol" ? !0 : E ? E["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && E instanceof Symbol : !1;
    }
    function z(k) {
      var E = typeof k;
      return Array.isArray(k) ? "array" : k instanceof RegExp ? "object" : H(E, k) ? "symbol" : E;
    }
    function tt(k) {
      if (typeof k > "u" || k === null)
        return "" + k;
      var E = z(k);
      if (E === "object") {
        if (k instanceof Date)
          return "date";
        if (k instanceof RegExp)
          return "regexp";
      }
      return E;
    }
    function rt(k) {
      var E = tt(k);
      switch (E) {
        case "array":
        case "object":
          return "an " + E;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + E;
        default:
          return E;
      }
    }
    function at(k) {
      return !k.constructor || !k.constructor.name ? w : k.constructor.name;
    }
    return g.checkPropTypes = o, g.resetWarningCache = o.resetWarningCache, g.PropTypes = g, g;
  }, Gr;
}
var Xr, Sa;
function Ld() {
  if (Sa)
    return Xr;
  Sa = 1;
  var t = _o();
  function e() {
  }
  function n() {
  }
  return n.resetWarningCache = e, Xr = function() {
    function r(s, l, c, d, u, f) {
      if (f !== t) {
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
  }, Xr;
}
if (process.env.NODE_ENV !== "production") {
  var Fd = ts(), Ud = !0;
  oo.exports = zd()(Fd.isElement, Ud);
} else
  oo.exports = Ld()();
var Gd = oo.exports;
const p = /* @__PURE__ */ Id(Gd);
function Xd(t) {
  const {
    prototype: e = {}
  } = t;
  return !!e.isReactComponent;
}
function ns(t, e, n, r, o) {
  const a = t[e], s = o || e;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Xd(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const rs = Ro(p.element, ns);
rs.isRequired = Ro(p.element.isRequired, ns);
const os = rs, Hd = "exact-prop: ​";
function Yd(t) {
  return process.env.NODE_ENV === "production" ? t : M({}, t, {
    [Hd]: (e) => {
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
var ao = { exports: {} }, dt = {};
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
function Wd() {
  if (Ca)
    return dt;
  Ca = 1;
  var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), y;
  y = Symbol.for("react.module.reference");
  function m(h) {
    if (typeof h == "object" && h !== null) {
      var x = h.$$typeof;
      switch (x) {
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
                case f:
                case a:
                  return h;
                default:
                  return x;
              }
          }
        case e:
          return x;
      }
    }
  }
  return dt.ContextConsumer = s, dt.ContextProvider = a, dt.Element = t, dt.ForwardRef = c, dt.Fragment = n, dt.Lazy = w, dt.Memo = f, dt.Portal = e, dt.Profiler = o, dt.StrictMode = r, dt.Suspense = d, dt.SuspenseList = u, dt.isAsyncMode = function() {
    return !1;
  }, dt.isConcurrentMode = function() {
    return !1;
  }, dt.isContextConsumer = function(h) {
    return m(h) === s;
  }, dt.isContextProvider = function(h) {
    return m(h) === a;
  }, dt.isElement = function(h) {
    return typeof h == "object" && h !== null && h.$$typeof === t;
  }, dt.isForwardRef = function(h) {
    return m(h) === c;
  }, dt.isFragment = function(h) {
    return m(h) === n;
  }, dt.isLazy = function(h) {
    return m(h) === w;
  }, dt.isMemo = function(h) {
    return m(h) === f;
  }, dt.isPortal = function(h) {
    return m(h) === e;
  }, dt.isProfiler = function(h) {
    return m(h) === o;
  }, dt.isStrictMode = function(h) {
    return m(h) === r;
  }, dt.isSuspense = function(h) {
    return m(h) === d;
  }, dt.isSuspenseList = function(h) {
    return m(h) === u;
  }, dt.isValidElementType = function(h) {
    return typeof h == "string" || typeof h == "function" || h === n || h === o || h === r || h === d || h === u || h === g || typeof h == "object" && h !== null && (h.$$typeof === w || h.$$typeof === f || h.$$typeof === a || h.$$typeof === s || h.$$typeof === c || h.$$typeof === y || h.getModuleId !== void 0);
  }, dt.typeOf = m, dt;
}
var ut = {};
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
function qd() {
  return Oa || (Oa = 1, process.env.NODE_ENV !== "production" && function() {
    var t = Symbol.for("react.element"), e = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), s = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), u = Symbol.for("react.suspense_list"), f = Symbol.for("react.memo"), w = Symbol.for("react.lazy"), g = Symbol.for("react.offscreen"), y = !1, m = !1, h = !1, x = !1, $ = !1, _;
    _ = Symbol.for("react.module.reference");
    function T(V) {
      return !!(typeof V == "string" || typeof V == "function" || V === n || V === o || $ || V === r || V === d || V === u || x || V === g || y || m || h || typeof V == "object" && V !== null && (V.$$typeof === w || V.$$typeof === f || V.$$typeof === a || V.$$typeof === s || V.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      V.$$typeof === _ || V.getModuleId !== void 0));
    }
    function b(V) {
      if (typeof V == "object" && V !== null) {
        var xt = V.$$typeof;
        switch (xt) {
          case t:
            var Gt = V.type;
            switch (Gt) {
              case n:
              case o:
              case r:
              case d:
              case u:
                return Gt;
              default:
                var ue = Gt && Gt.$$typeof;
                switch (ue) {
                  case l:
                  case s:
                  case c:
                  case w:
                  case f:
                  case a:
                    return ue;
                  default:
                    return xt;
                }
            }
          case e:
            return xt;
        }
      }
    }
    var I = s, F = a, J = t, O = c, A = n, D = w, P = f, B = e, q = o, H = r, z = d, tt = u, rt = !1, at = !1;
    function k(V) {
      return rt || (rt = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function E(V) {
      return at || (at = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(V) {
      return b(V) === s;
    }
    function Y(V) {
      return b(V) === a;
    }
    function G(V) {
      return typeof V == "object" && V !== null && V.$$typeof === t;
    }
    function W(V) {
      return b(V) === c;
    }
    function L(V) {
      return b(V) === n;
    }
    function Z(V) {
      return b(V) === w;
    }
    function K(V) {
      return b(V) === f;
    }
    function Q(V) {
      return b(V) === e;
    }
    function R(V) {
      return b(V) === o;
    }
    function X(V) {
      return b(V) === r;
    }
    function C(V) {
      return b(V) === d;
    }
    function ft(V) {
      return b(V) === u;
    }
    ut.ContextConsumer = I, ut.ContextProvider = F, ut.Element = J, ut.ForwardRef = O, ut.Fragment = A, ut.Lazy = D, ut.Memo = P, ut.Portal = B, ut.Profiler = q, ut.StrictMode = H, ut.Suspense = z, ut.SuspenseList = tt, ut.isAsyncMode = k, ut.isConcurrentMode = E, ut.isContextConsumer = U, ut.isContextProvider = Y, ut.isElement = G, ut.isForwardRef = W, ut.isFragment = L, ut.isLazy = Z, ut.isMemo = K, ut.isPortal = Q, ut.isProfiler = R, ut.isStrictMode = X, ut.isSuspense = C, ut.isSuspenseList = ft, ut.isValidElementType = T, ut.typeOf = b;
  }()), ut;
}
process.env.NODE_ENV === "production" ? ao.exports = Wd() : ao.exports = qd();
var Ra = ao.exports;
const Kd = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Jd(t) {
  const e = `${t}`.match(Kd);
  return e && e[1] || "";
}
function as(t, e = "") {
  return t.displayName || t.name || Jd(t) || e;
}
function _a(t, e, n) {
  const r = as(e);
  return t.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Zd(t) {
  if (t != null) {
    if (typeof t == "string")
      return t;
    if (typeof t == "function")
      return as(t, "Component");
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
function En(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = t[e], s = o || e;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${s}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Qd = p.oneOfType([p.func, p.object]), is = Qd;
function Zt(t) {
  if (typeof t != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Ge(7));
  return t.charAt(0).toUpperCase() + t.slice(1);
}
function tu(...t) {
  return t.reduce((e, n) => n == null ? e : function(...o) {
    e.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function eu(t, e = 166) {
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
function nu(t, e) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, s) => {
    const l = o || "<<anonymous>>", c = s || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${e}`) : null;
  };
}
function ru(t, e) {
  var n, r;
  return /* @__PURE__ */ j.isValidElement(t) && e.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = t.type.muiName) != null ? n : (r = t.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function ar(t) {
  return t && t.ownerDocument || document;
}
function ou(t) {
  return ar(t).defaultView || window;
}
function au(t, e) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = e ? M({}, e.propTypes) : null;
  return (o) => (a, s, l, c, d, ...u) => {
    const f = d || s, w = n == null ? void 0 : n[f];
    if (w) {
      const g = w(a, s, l, c, d, ...u);
      if (g)
        return g;
    }
    return typeof a[s] < "u" && !a[o] ? new Error(`The prop \`${f}\` of \`${t}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function ir(t, e) {
  typeof t == "function" ? t(e) : t && (t.current = e);
}
const iu = typeof window < "u" ? j.useLayoutEffect : j.useEffect, Xe = iu;
let Pa = 0;
function su(t) {
  const [e, n] = j.useState(t), r = t || e;
  return j.useEffect(() => {
    e == null && (Pa += 1, n(`mui-${Pa}`));
  }, [e]), r;
}
const $a = j["useId".toString()];
function ss(t) {
  if ($a !== void 0) {
    const e = $a();
    return t ?? e;
  }
  return su(t);
}
function lu(t, e, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || e;
  return typeof t[e] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function ls({
  controlled: t,
  default: e,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = j.useRef(t !== void 0), [a, s] = j.useState(e), l = o ? t : a;
  if (process.env.NODE_ENV !== "production") {
    j.useEffect(() => {
      o !== (t !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, t]);
    const {
      current: d
    } = j.useRef(e);
    j.useEffect(() => {
      !o && d !== e && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(e)]);
  }
  const c = j.useCallback((d) => {
    o || s(d);
  }, []);
  return [l, c];
}
function io(t) {
  const e = j.useRef(t);
  return Xe(() => {
    e.current = t;
  }), j.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, e.current)(...n)
  )).current;
}
function ke(...t) {
  return j.useMemo(() => t.every((e) => e == null) ? null : (e) => {
    t.forEach((n) => {
      ir(n, e);
    });
  }, t);
}
const Ia = {};
function cu(t, e) {
  const n = j.useRef(Ia);
  return n.current === Ia && (n.current = t(e)), n;
}
const du = [];
function uu(t) {
  j.useEffect(t, du);
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
function un() {
  const t = cu(Mn.create).current;
  return uu(t.disposeEffect), t;
}
let hr = !0, so = !1;
const pu = new Mn(), wu = {
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
function fu(t) {
  const {
    type: e,
    tagName: n
  } = t;
  return !!(n === "INPUT" && wu[e] && !t.readOnly || n === "TEXTAREA" && !t.readOnly || t.isContentEditable);
}
function mu(t) {
  t.metaKey || t.altKey || t.ctrlKey || (hr = !0);
}
function Hr() {
  hr = !1;
}
function hu() {
  this.visibilityState === "hidden" && so && (hr = !0);
}
function gu(t) {
  t.addEventListener("keydown", mu, !0), t.addEventListener("mousedown", Hr, !0), t.addEventListener("pointerdown", Hr, !0), t.addEventListener("touchstart", Hr, !0), t.addEventListener("visibilitychange", hu, !0);
}
function bu(t) {
  const {
    target: e
  } = t;
  try {
    return e.matches(":focus-visible");
  } catch {
  }
  return hr || fu(e);
}
function cs() {
  const t = j.useCallback((o) => {
    o != null && gu(o.ownerDocument);
  }, []), e = j.useRef(!1);
  function n() {
    return e.current ? (so = !0, pu.start(100, () => {
      so = !1;
    }), e.current = !1, !0) : !1;
  }
  function r(o) {
    return bu(o) ? (e.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: e,
    onFocus: r,
    onBlur: n,
    ref: t
  };
}
function ds(t, e) {
  const n = M({}, e);
  return Object.keys(t).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = M({}, t[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = t[r] || {}, a = e[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = M({}, a), Object.keys(o).forEach((s) => {
        n[r][s] = ds(o[s], a[s]);
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
const Aa = (t) => t, vu = () => {
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
}, yu = vu(), us = yu, ps = {
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
function gr(t, e, n = "Mui") {
  const r = ps[e];
  return r ? `${n}-${r}` : `${us.generate(t)}-${e}`;
}
function ws(t, e, n = "Mui") {
  const r = {};
  return e.forEach((o) => {
    r[o] = gr(t, o, n);
  }), r;
}
function xu(t, e = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
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
const Nu = ["values", "unit", "step"], ku = (t) => {
  const e = Object.keys(t).map((n) => ({
    key: n,
    val: t[n]
  })) || [];
  return e.sort((n, r) => n.val - r.val), e.reduce((n, r) => M({}, n, {
    [r.key]: r.val
  }), {});
};
function Eu(t) {
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
  } = t, o = kt(t, Nu), a = ku(e), s = Object.keys(a);
  function l(w) {
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n})`;
  }
  function c(w) {
    return `@media (max-width:${(typeof e[w] == "number" ? e[w] : w) - r / 100}${n})`;
  }
  function d(w, g) {
    const y = s.indexOf(g);
    return `@media (min-width:${typeof e[w] == "number" ? e[w] : w}${n}) and (max-width:${(y !== -1 && typeof e[s[y]] == "number" ? e[s[y]] : g) - r / 100}${n})`;
  }
  function u(w) {
    return s.indexOf(w) + 1 < s.length ? d(w, s[s.indexOf(w) + 1]) : l(w);
  }
  function f(w) {
    const g = s.indexOf(w);
    return g === 0 ? l(s[1]) : g === s.length - 1 ? c(s[g]) : d(w, s[s.indexOf(w) + 1]).replace("@media", "@media not all and");
  }
  return M({
    keys: s,
    values: a,
    up: l,
    down: c,
    between: d,
    only: u,
    not: f,
    unit: n
  }, o);
}
const Tu = {
  borderRadius: 4
}, Su = Tu, Cu = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.string, p.object, p.array]) : {}, ce = Cu;
function hn(t, e) {
  return e ? ne(t, e, {
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
function re(t, e, n) {
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
function Ou(t = {}) {
  var e;
  return ((e = t.keys) == null ? void 0 : e.reduce((r, o) => {
    const a = t.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function Ru(t, e) {
  return t.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, e);
}
function br(t, e, n = !0) {
  if (!e || typeof e != "string")
    return null;
  if (t && t.vars && n) {
    const r = `vars.${e}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, t);
    if (r != null)
      return r;
  }
  return e.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, t);
}
function sr(t, e, n, r = n) {
  let o;
  return typeof t == "function" ? o = t(n) : Array.isArray(t) ? o = t[n] || r : o = br(t, n) || r, e && (o = e(o, r, t)), o;
}
function yt(t) {
  const {
    prop: e,
    cssProperty: n = t.prop,
    themeKey: r,
    transform: o
  } = t, a = (s) => {
    if (s[e] == null)
      return null;
    const l = s[e], c = s.theme, d = br(c, r) || {};
    return re(s, l, (f) => {
      let w = sr(d, o, f);
      return f === w && typeof f == "string" && (w = sr(d, o, `${e}${f === "default" ? "" : Zt(f)}`, f)), n === !1 ? w : {
        [n]: w
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [e]: ce
  } : {}, a.filterProps = [e], a;
}
function _u(t) {
  const e = {};
  return (n) => (e[n] === void 0 && (e[n] = t(n)), e[n]);
}
const Pu = {
  m: "margin",
  p: "padding"
}, $u = {
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
}, Iu = _u((t) => {
  if (t.length > 2)
    if (Da[t])
      t = Da[t];
    else
      return [t];
  const [e, n] = t.split(""), r = Pu[e], o = $u[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), vr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], yr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Au = [...vr, ...yr];
function Dn(t, e, n, r) {
  var o;
  const a = (o = br(t, e, !1)) != null ? o : n;
  return typeof a == "number" ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && typeof s != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${s}.`), a * s) : Array.isArray(a) ? (s) => typeof s == "string" ? s : (process.env.NODE_ENV !== "production" && (Number.isInteger(s) ? s > a.length - 1 && console.error([`MUI: The value provided (${s}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${s} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${e}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${e}\` as a number.`].join(`
`))), a[s]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${e}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function fs(t) {
  return Dn(t, "spacing", 8, "spacing");
}
function Bn(t, e) {
  if (typeof e == "string" || e == null)
    return e;
  const n = Math.abs(e), r = t(n);
  return e >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Mu(t, e) {
  return (n) => t.reduce((r, o) => (r[o] = Bn(e, n), r), {});
}
function Du(t, e, n, r) {
  if (e.indexOf(n) === -1)
    return null;
  const o = Iu(n), a = Mu(o, r), s = t[n];
  return re(t, s, a);
}
function ms(t, e) {
  const n = fs(t.theme);
  return Object.keys(t).map((r) => Du(t, e, r, n)).reduce(hn, {});
}
function gt(t) {
  return ms(t, vr);
}
gt.propTypes = process.env.NODE_ENV !== "production" ? vr.reduce((t, e) => (t[e] = ce, t), {}) : {};
gt.filterProps = vr;
function bt(t) {
  return ms(t, yr);
}
bt.propTypes = process.env.NODE_ENV !== "production" ? yr.reduce((t, e) => (t[e] = ce, t), {}) : {};
bt.filterProps = yr;
process.env.NODE_ENV !== "production" && Au.reduce((t, e) => (t[e] = ce, t), {});
function Bu(t = 8) {
  if (t.mui)
    return t;
  const e = fs({
    spacing: t
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const s = e(a);
    return typeof s == "number" ? `${s}px` : s;
  }).join(" "));
  return n.mui = !0, n;
}
function xr(...t) {
  const e = t.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => e[a] ? hn(o, e[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? t.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = t.reduce((r, o) => r.concat(o.filterProps), []), n;
}
function Vt(t) {
  return typeof t != "number" ? t : `${t}px solid`;
}
function Ut(t, e) {
  return yt({
    prop: t,
    themeKey: "borders",
    transform: e
  });
}
const ju = Ut("border", Vt), Vu = Ut("borderTop", Vt), zu = Ut("borderRight", Vt), Lu = Ut("borderBottom", Vt), Fu = Ut("borderLeft", Vt), Uu = Ut("borderColor"), Gu = Ut("borderTopColor"), Xu = Ut("borderRightColor"), Hu = Ut("borderBottomColor"), Yu = Ut("borderLeftColor"), Wu = Ut("outline", Vt), qu = Ut("outlineColor"), Nr = (t) => {
  if (t.borderRadius !== void 0 && t.borderRadius !== null) {
    const e = Dn(t.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Bn(e, r)
    });
    return re(t, t.borderRadius, n);
  }
  return null;
};
Nr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: ce
} : {};
Nr.filterProps = ["borderRadius"];
xr(ju, Vu, zu, Lu, Fu, Uu, Gu, Xu, Hu, Yu, Nr, Wu, qu);
const kr = (t) => {
  if (t.gap !== void 0 && t.gap !== null) {
    const e = Dn(t.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Bn(e, r)
    });
    return re(t, t.gap, n);
  }
  return null;
};
kr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: ce
} : {};
kr.filterProps = ["gap"];
const Er = (t) => {
  if (t.columnGap !== void 0 && t.columnGap !== null) {
    const e = Dn(t.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Bn(e, r)
    });
    return re(t, t.columnGap, n);
  }
  return null;
};
Er.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: ce
} : {};
Er.filterProps = ["columnGap"];
const Tr = (t) => {
  if (t.rowGap !== void 0 && t.rowGap !== null) {
    const e = Dn(t.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Bn(e, r)
    });
    return re(t, t.rowGap, n);
  }
  return null;
};
Tr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: ce
} : {};
Tr.filterProps = ["rowGap"];
const Ku = yt({
  prop: "gridColumn"
}), Ju = yt({
  prop: "gridRow"
}), Zu = yt({
  prop: "gridAutoFlow"
}), Qu = yt({
  prop: "gridAutoColumns"
}), tp = yt({
  prop: "gridAutoRows"
}), ep = yt({
  prop: "gridTemplateColumns"
}), np = yt({
  prop: "gridTemplateRows"
}), rp = yt({
  prop: "gridTemplateAreas"
}), op = yt({
  prop: "gridArea"
});
xr(kr, Er, Tr, Ku, Ju, Zu, Qu, tp, ep, np, rp, op);
function Ve(t, e) {
  return e === "grey" ? e : t;
}
const ap = yt({
  prop: "color",
  themeKey: "palette",
  transform: Ve
}), ip = yt({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Ve
}), sp = yt({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Ve
});
xr(ap, ip, sp);
function At(t) {
  return t <= 1 && t !== 0 ? `${t * 100}%` : t;
}
const lp = yt({
  prop: "width",
  transform: At
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
        maxWidth: At(n)
      };
    };
    return re(t, t.maxWidth, e);
  }
  return null;
};
Io.filterProps = ["maxWidth"];
const cp = yt({
  prop: "minWidth",
  transform: At
}), dp = yt({
  prop: "height",
  transform: At
}), up = yt({
  prop: "maxHeight",
  transform: At
}), pp = yt({
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
const wp = yt({
  prop: "boxSizing"
});
xr(lp, Io, cp, dp, up, pp, wp);
const fp = {
  // borders
  border: {
    themeKey: "borders",
    transform: Vt
  },
  borderTop: {
    themeKey: "borders",
    transform: Vt
  },
  borderRight: {
    themeKey: "borders",
    transform: Vt
  },
  borderBottom: {
    themeKey: "borders",
    transform: Vt
  },
  borderLeft: {
    themeKey: "borders",
    transform: Vt
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
    transform: Vt
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Nr
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Ve
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Ve
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Ve
  },
  // spacing
  p: {
    style: bt
  },
  pt: {
    style: bt
  },
  pr: {
    style: bt
  },
  pb: {
    style: bt
  },
  pl: {
    style: bt
  },
  px: {
    style: bt
  },
  py: {
    style: bt
  },
  padding: {
    style: bt
  },
  paddingTop: {
    style: bt
  },
  paddingRight: {
    style: bt
  },
  paddingBottom: {
    style: bt
  },
  paddingLeft: {
    style: bt
  },
  paddingX: {
    style: bt
  },
  paddingY: {
    style: bt
  },
  paddingInline: {
    style: bt
  },
  paddingInlineStart: {
    style: bt
  },
  paddingInlineEnd: {
    style: bt
  },
  paddingBlock: {
    style: bt
  },
  paddingBlockStart: {
    style: bt
  },
  paddingBlockEnd: {
    style: bt
  },
  m: {
    style: gt
  },
  mt: {
    style: gt
  },
  mr: {
    style: gt
  },
  mb: {
    style: gt
  },
  ml: {
    style: gt
  },
  mx: {
    style: gt
  },
  my: {
    style: gt
  },
  margin: {
    style: gt
  },
  marginTop: {
    style: gt
  },
  marginRight: {
    style: gt
  },
  marginBottom: {
    style: gt
  },
  marginLeft: {
    style: gt
  },
  marginX: {
    style: gt
  },
  marginY: {
    style: gt
  },
  marginInline: {
    style: gt
  },
  marginInlineStart: {
    style: gt
  },
  marginInlineEnd: {
    style: gt
  },
  marginBlock: {
    style: gt
  },
  marginBlockStart: {
    style: gt
  },
  marginBlockEnd: {
    style: gt
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
    style: kr
  },
  rowGap: {
    style: Tr
  },
  columnGap: {
    style: Er
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
    style: Io
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
}, Ao = fp;
function mp(...t) {
  const e = t.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(e);
  return t.every((r) => n.size === Object.keys(r).length);
}
function hp(t, e) {
  return typeof t == "function" ? t(e) : t;
}
function gp() {
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
      style: f
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const w = br(o, d) || {};
    return f ? f(s) : re(s, r, (y) => {
      let m = sr(w, u, y);
      return y === m && typeof y == "string" && (m = sr(w, u, `${n}${y === "default" ? "" : Zt(y)}`, y)), c === !1 ? m : {
        [c]: m
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
      const u = Ou(a.breakpoints), f = Object.keys(u);
      let w = u;
      return Object.keys(d).forEach((g) => {
        const y = hp(d[g], a);
        if (y != null)
          if (typeof y == "object")
            if (s[g])
              w = hn(w, t(g, y, a, s));
            else {
              const m = re({
                theme: a
              }, y, (h) => ({
                [g]: h
              }));
              mp(m, y) ? w[g] = e({
                sx: y,
                theme: a
              }) : w = hn(w, m);
            }
          else
            w = hn(w, t(g, y, a, s));
      }), Ru(f, w);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return e;
}
const hs = gp();
hs.filterProps = ["sx"];
const Mo = hs;
function bp(t, e) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(t).replace(/(\[[^\]]+\])/, "*:where($1)")]: e
  } : n.palette.mode === t ? e : {};
}
const vp = ["breakpoints", "palette", "spacing", "shape"];
function Do(t = {}, ...e) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = t, s = kt(t, vp), l = Eu(n), c = Bu(o);
  let d = ne({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: M({
      mode: "light"
    }, r),
    spacing: c,
    shape: M({}, Su, a)
  }, s);
  return d.applyStyles = bp, d = e.reduce((u, f) => ne(u, f), d), d.unstable_sxConfig = M({}, Ao, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Mo({
      sx: f,
      theme: this
    });
  }, d;
}
function yp(t) {
  return Object.keys(t).length === 0;
}
function gs(t = null) {
  const e = j.useContext(Yl);
  return !e || yp(e) ? t : e;
}
const xp = Do();
function bs(t = xp) {
  return gs(t);
}
const Np = ["ownerState"], kp = ["variants"], Ep = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Tp(t) {
  return Object.keys(t).length === 0;
}
function Sp(t) {
  return typeof t == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  t.charCodeAt(0) > 96;
}
function Zn(t) {
  return t !== "ownerState" && t !== "theme" && t !== "sx" && t !== "as";
}
const Cp = Do(), Ba = (t) => t && t.charAt(0).toLowerCase() + t.slice(1);
function Yn({
  defaultTheme: t,
  theme: e,
  themeId: n
}) {
  return Tp(e) ? t : e[n] || e;
}
function Op(t) {
  return t ? (e, n) => n[t] : null;
}
function Qn(t, e) {
  let {
    ownerState: n
  } = e, r = kt(e, Np);
  const o = typeof t == "function" ? t(M({
    ownerState: n
  }, r)) : t;
  if (Array.isArray(o))
    return o.flatMap((a) => Qn(a, M({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = kt(o, kp);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(M({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((u) => {
        (n == null ? void 0 : n[u]) !== c.props[u] && r[u] !== c.props[u] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(M({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function Rp(t = {}) {
  const {
    themeId: e,
    defaultTheme: n = Cp,
    rootShouldForwardProp: r = Zn,
    slotShouldForwardProp: o = Zn
  } = t, a = (s) => Mo(M({}, s, {
    theme: Yn(M({}, s, {
      defaultTheme: n,
      themeId: e
    }))
  }));
  return a.__mui_systemSx = !0, (s, l = {}) => {
    Wl(s, (b) => b.filter((I) => !(I != null && I.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: u,
      skipSx: f,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: w = Op(Ba(d))
    } = l, g = kt(l, Ep), y = u !== void 0 ? u : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), m = f || !1;
    let h;
    process.env.NODE_ENV !== "production" && c && (h = `${c}-${Ba(d || "Root")}`);
    let x = Zn;
    d === "Root" || d === "root" ? x = r : d ? x = o : Sp(s) && (x = void 0);
    const $ = Hl(s, M({
      shouldForwardProp: x,
      label: h
    }, g)), _ = (b) => typeof b == "function" && b.__emotion_real !== b || be(b) ? (I) => Qn(b, M({}, I, {
      theme: Yn({
        theme: I.theme,
        defaultTheme: n,
        themeId: e
      })
    })) : b, T = (b, ...I) => {
      let F = _(b);
      const J = I ? I.map(_) : [];
      c && w && J.push((D) => {
        const P = Yn(M({}, D, {
          defaultTheme: n,
          themeId: e
        }));
        if (!P.components || !P.components[c] || !P.components[c].styleOverrides)
          return null;
        const B = P.components[c].styleOverrides, q = {};
        return Object.entries(B).forEach(([H, z]) => {
          q[H] = Qn(z, M({}, D, {
            theme: P
          }));
        }), w(D, q);
      }), c && !y && J.push((D) => {
        var P;
        const B = Yn(M({}, D, {
          defaultTheme: n,
          themeId: e
        })), q = B == null || (P = B.components) == null || (P = P[c]) == null ? void 0 : P.variants;
        return Qn({
          variants: q
        }, M({}, D, {
          theme: B
        }));
      }), m || J.push(a);
      const O = J.length - I.length;
      if (Array.isArray(b) && O > 0) {
        const D = new Array(O).fill("");
        F = [...b, ...D], F.raw = [...b.raw, ...D];
      }
      const A = $(F, ...J);
      if (process.env.NODE_ENV !== "production") {
        let D;
        c && (D = `${c}${Zt(d || "")}`), D === void 0 && (D = `Styled(${Zd(s)})`), A.displayName = D;
      }
      return s.muiName && (A.muiName = s.muiName), A;
    };
    return $.withConfig && (T.withConfig = $.withConfig), T;
  };
}
function _p(t) {
  const {
    theme: e,
    name: n,
    props: r
  } = t;
  return !e || !e.components || !e.components[n] || !e.components[n].defaultProps ? r : ds(e.components[n].defaultProps, r);
}
function Pp({
  props: t,
  name: e,
  defaultTheme: n,
  themeId: r
}) {
  let o = bs(n);
  return r && (o = o[r] || o), _p({
    theme: o,
    name: e,
    props: t
  });
}
function Bo(t, e = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (t < e || t > n) && console.error(`MUI: The value provided ${t} is out of range [${e}, ${n}].`), xu(t, e, n);
}
function $p(t) {
  t = t.slice(1);
  const e = new RegExp(`.{1,${t.length >= 6 ? 2 : 1}}`, "g");
  let n = t.match(e);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Ee(t) {
  if (t.type)
    return t;
  if (t.charAt(0) === "#")
    return Ee($p(t));
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
function Sr(t) {
  const {
    type: e,
    colorSpace: n
  } = t;
  let {
    values: r
  } = t;
  return e.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : e.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), e.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${e}(${r})`;
}
function Ip(t) {
  t = Ee(t);
  const {
    values: e
  } = t, n = e[0], r = e[1] / 100, o = e[2] / 100, a = r * Math.min(o, 1 - o), s = (d, u = (d + n / 30) % 12) => o - a * Math.max(Math.min(u - 3, 9 - u, 1), -1);
  let l = "rgb";
  const c = [Math.round(s(0) * 255), Math.round(s(8) * 255), Math.round(s(4) * 255)];
  return t.type === "hsla" && (l += "a", c.push(e[3])), Sr({
    type: l,
    values: c
  });
}
function ja(t) {
  t = Ee(t);
  let e = t.type === "hsl" || t.type === "hsla" ? Ee(Ip(t)).values : t.values;
  return e = e.map((n) => (t.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * e[0] + 0.7152 * e[1] + 0.0722 * e[2]).toFixed(3));
}
function Va(t, e) {
  const n = ja(t), r = ja(e);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function vs(t, e) {
  return t = Ee(t), e = Bo(e), (t.type === "rgb" || t.type === "hsl") && (t.type += "a"), t.type === "color" ? t.values[3] = `/${e}` : t.values[3] = e, Sr(t);
}
function Ap(t, e) {
  if (t = Ee(t), e = Bo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] *= 1 - e;
  else if (t.type.indexOf("rgb") !== -1 || t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] *= 1 - e;
  return Sr(t);
}
function Mp(t, e) {
  if (t = Ee(t), e = Bo(e), t.type.indexOf("hsl") !== -1)
    t.values[2] += (100 - t.values[2]) * e;
  else if (t.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (255 - t.values[n]) * e;
  else if (t.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      t.values[n] += (1 - t.values[n]) * e;
  return Sr(t);
}
function Dp(t, e) {
  return M({
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
const Bp = {
  black: "#000",
  white: "#fff"
}, Tn = Bp, jp = {
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
}, Vp = jp, zp = {
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
}, $e = zp, Lp = {
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
}, Ie = Lp, Fp = {
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
}, sn = Fp, Up = {
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
}, Ae = Up, Gp = {
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
}, Me = Gp, Xp = {
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
}, De = Xp, Hp = ["mode", "contrastThreshold", "tonalOffset"], za = {
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
}, Yr = {
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
function La(t, e, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  t[e] || (t.hasOwnProperty(n) ? t[e] = t[n] : e === "light" ? t.light = Mp(t.main, o) : e === "dark" && (t.dark = Ap(t.main, a)));
}
function Yp(t = "light") {
  return t === "dark" ? {
    main: Ae[200],
    light: Ae[50],
    dark: Ae[400]
  } : {
    main: Ae[700],
    light: Ae[400],
    dark: Ae[800]
  };
}
function Wp(t = "light") {
  return t === "dark" ? {
    main: $e[200],
    light: $e[50],
    dark: $e[400]
  } : {
    main: $e[500],
    light: $e[300],
    dark: $e[700]
  };
}
function qp(t = "light") {
  return t === "dark" ? {
    main: Ie[500],
    light: Ie[300],
    dark: Ie[700]
  } : {
    main: Ie[700],
    light: Ie[400],
    dark: Ie[800]
  };
}
function Kp(t = "light") {
  return t === "dark" ? {
    main: Me[400],
    light: Me[300],
    dark: Me[700]
  } : {
    main: Me[700],
    light: Me[500],
    dark: Me[900]
  };
}
function Jp(t = "light") {
  return t === "dark" ? {
    main: De[400],
    light: De[300],
    dark: De[700]
  } : {
    main: De[800],
    light: De[500],
    dark: De[900]
  };
}
function Zp(t = "light") {
  return t === "dark" ? {
    main: sn[400],
    light: sn[300],
    dark: sn[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: sn[500],
    dark: sn[900]
  };
}
function Qp(t) {
  const {
    mode: e = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = t, o = kt(t, Hp), a = t.primary || Yp(e), s = t.secondary || Wp(e), l = t.error || qp(e), c = t.info || Kp(e), d = t.success || Jp(e), u = t.warning || Zp(e);
  function f(m) {
    const h = Va(m, Yr.text.primary) >= n ? Yr.text.primary : za.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = Va(m, h);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${h} on ${m}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return h;
  }
  const w = ({
    color: m,
    name: h,
    mainShade: x = 500,
    lightShade: $ = 300,
    darkShade: _ = 700
  }) => {
    if (m = M({}, m), !m.main && m[x] && (m.main = m[x]), !m.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Ge(11, h ? ` (${h})` : "", x));
    if (typeof m.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${h ? ` (${h})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(m.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Ge(12, h ? ` (${h})` : "", JSON.stringify(m.main)));
    return La(m, "light", $, r), La(m, "dark", _, r), m.contrastText || (m.contrastText = f(m.main)), m;
  }, g = {
    dark: Yr,
    light: za
  };
  return process.env.NODE_ENV !== "production" && (g[e] || console.error(`MUI: The palette mode \`${e}\` is not supported.`)), ne(M({
    // A collection of common colors.
    common: M({}, Tn),
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
    grey: Vp,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: f,
    // Generate a rich color object.
    augmentColor: w,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, g[e]), o);
}
const tw = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function ew(t) {
  return Math.round(t * 1e5) / 1e5;
}
const Fa = {
  textTransform: "uppercase"
}, Ua = '"Roboto", "Helvetica", "Arial", sans-serif';
function nw(t, e) {
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
    pxToRem: f
  } = n, w = kt(n, tw);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const g = o / 14, y = f || ((x) => `${x / d * g}rem`), m = (x, $, _, T, b) => M({
    fontFamily: r,
    fontWeight: x,
    fontSize: y($),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: _
  }, r === Ua ? {
    letterSpacing: `${ew(T / $)}em`
  } : {}, b, u), h = {
    h1: m(a, 96, 1.167, -1.5),
    h2: m(a, 60, 1.2, -0.5),
    h3: m(s, 48, 1.167, 0),
    h4: m(s, 34, 1.235, 0.25),
    h5: m(s, 24, 1.334, 0),
    h6: m(l, 20, 1.6, 0.15),
    subtitle1: m(s, 16, 1.75, 0.15),
    subtitle2: m(l, 14, 1.57, 0.1),
    body1: m(s, 16, 1.5, 0.15),
    body2: m(s, 14, 1.43, 0.15),
    button: m(l, 14, 1.75, 0.4, Fa),
    caption: m(s, 12, 1.66, 0.4),
    overline: m(s, 12, 2.66, 1, Fa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return ne(M({
    htmlFontSize: d,
    pxToRem: y,
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
const rw = 0.2, ow = 0.14, aw = 0.12;
function ht(...t) {
  return [`${t[0]}px ${t[1]}px ${t[2]}px ${t[3]}px rgba(0,0,0,${rw})`, `${t[4]}px ${t[5]}px ${t[6]}px ${t[7]}px rgba(0,0,0,${ow})`, `${t[8]}px ${t[9]}px ${t[10]}px ${t[11]}px rgba(0,0,0,${aw})`].join(",");
}
const iw = ["none", ht(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ht(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ht(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ht(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ht(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ht(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ht(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ht(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ht(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ht(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ht(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ht(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ht(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ht(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ht(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ht(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ht(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ht(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ht(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ht(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ht(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ht(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ht(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ht(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], sw = iw, lw = ["duration", "easing", "delay"], cw = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, dw = {
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
function uw(t) {
  if (!t)
    return 0;
  const e = t / 36;
  return Math.round((4 + 15 * e ** 0.25 + e / 5) * 10);
}
function pw(t) {
  const e = M({}, cw, t.easing), n = M({}, dw, t.duration);
  return M({
    getAutoHeightDuration: uw,
    create: (o = ["all"], a = {}) => {
      const {
        duration: s = n.standard,
        easing: l = e.easeInOut,
        delay: c = 0
      } = a, d = kt(a, lw);
      if (process.env.NODE_ENV !== "production") {
        const u = (w) => typeof w == "string", f = (w) => !isNaN(parseFloat(w));
        !u(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !f(s) && !u(s) && console.error(`MUI: Argument "duration" must be a number or a string but found ${s}.`), u(l) || console.error('MUI: Argument "easing" must be a string.'), !f(c) && !u(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((u) => `${u} ${typeof s == "string" ? s : Ga(s)} ${l} ${typeof c == "string" ? c : Ga(c)}`).join(",");
    }
  }, t, {
    easing: e,
    duration: n
  });
}
const ww = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, fw = ww, mw = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function hw(t = {}, ...e) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = t, s = kt(t, mw);
  if (t.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Ge(18));
  const l = Qp(r), c = Do(t);
  let d = ne(c, {
    mixins: Dp(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: sw.slice(),
    typography: nw(l, a),
    transitions: pw(o),
    zIndex: M({}, fw)
  });
  if (d = ne(d, s), d = e.reduce((u, f) => ne(u, f), d), process.env.NODE_ENV !== "production") {
    const u = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], f = (w, g) => {
      let y;
      for (y in w) {
        const m = w[y];
        if (u.indexOf(y) !== -1 && Object.keys(m).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const h = gr("", y);
            console.error([`MUI: The \`${g}\` component increases the CSS specificity of the \`${y}\` internal state.`, "You can not override it like this: ", JSON.stringify(w, null, 2), "", `Instead, you need to use the '&.${h}' syntax:`, JSON.stringify({
              root: {
                [`&.${h}`]: m
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          w[y] = {};
        }
      }
    };
    Object.keys(d.components).forEach((w) => {
      const g = d.components[w].styleOverrides;
      g && w.indexOf("Mui") === 0 && f(g, w);
    });
  }
  return d.unstable_sxConfig = M({}, Ao, s == null ? void 0 : s.unstable_sxConfig), d.unstable_sx = function(f) {
    return Mo({
      sx: f,
      theme: this
    });
  }, d;
}
const gw = hw(), jo = gw, Vo = "$$material";
function zo({
  props: t,
  name: e
}) {
  return Pp({
    props: t,
    name: e,
    defaultTheme: jo,
    themeId: Vo
  });
}
const bw = (t) => Zn(t) && t !== "classes", vw = Rp({
  themeId: Vo,
  defaultTheme: jo,
  rootShouldForwardProp: bw
}), jn = vw;
function yw(t) {
  return gr("MuiSvgIcon", t);
}
ws("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const xw = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Nw = (t) => {
  const {
    color: e,
    fontSize: n,
    classes: r
  } = t, o = {
    root: ["root", e !== "inherit" && `color${Zt(e)}`, `fontSize${Zt(n)}`]
  };
  return Po(o, yw, r);
}, kw = jn("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.root, n.color !== "inherit" && e[`color${Zt(n.color)}`], e[`fontSize${Zt(n.fontSize)}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => {
  var n, r, o, a, s, l, c, d, u, f, w, g, y;
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
    color: (f = (w = (t.vars || t).palette) == null || (w = w[e.color]) == null ? void 0 : w.main) != null ? f : {
      action: (g = (t.vars || t).palette) == null || (g = g.action) == null ? void 0 : g.active,
      disabled: (y = (t.vars || t).palette) == null || (y = y.action) == null ? void 0 : y.disabled,
      inherit: void 0
    }[e.color]
  };
}), Lo = /* @__PURE__ */ j.forwardRef(function(e, n) {
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
    titleAccess: f,
    viewBox: w = "0 0 24 24"
  } = r, g = kt(r, xw), y = /* @__PURE__ */ j.isValidElement(o) && o.type === "svg", m = M({}, r, {
    color: s,
    component: l,
    fontSize: c,
    instanceFontSize: e.fontSize,
    inheritViewBox: u,
    viewBox: w,
    hasSvgAsChild: y
  }), h = {};
  u || (h.viewBox = w);
  const x = Nw(m);
  return /* @__PURE__ */ v(kw, M({
    as: l,
    className: ye(x.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": f ? void 0 : !0,
    role: f ? "img" : void 0,
    ref: n
  }, h, g, y && o.props, {
    ownerState: m,
    children: [y ? o.props.children : o, f ? /* @__PURE__ */ i("title", {
      children: f
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
const Xa = Lo;
function ys(t, e) {
  function n(r, o) {
    return /* @__PURE__ */ i(Xa, M({
      "data-testid": `${e}Icon`,
      ref: o
    }, r, {
      children: t
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${e}Icon`), n.muiName = Xa.muiName, /* @__PURE__ */ j.memo(/* @__PURE__ */ j.forwardRef(n));
}
const Ew = {
  configure: (t) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), us.configure(t);
  }
}, Tw = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: Zt,
  createChainedFunction: tu,
  createSvgIcon: ys,
  debounce: eu,
  deprecatedPropType: nu,
  isMuiElement: ru,
  ownerDocument: ar,
  ownerWindow: ou,
  requirePropFactory: au,
  setRef: ir,
  unstable_ClassNameGenerator: Ew,
  unstable_useEnhancedEffect: Xe,
  unstable_useId: ss,
  unsupportedProp: lu,
  useControlled: ls,
  useEventCallback: io,
  useForkRef: ke,
  useIsFocusVisible: cs
}, Symbol.toStringTag, { value: "Module" })), Sw = /* @__PURE__ */ Ad(Tw);
var Ha;
function Cw() {
  return Ha || (Ha = 1, function(t) {
    "use client";
    Object.defineProperty(t, "__esModule", {
      value: !0
    }), Object.defineProperty(t, "default", {
      enumerable: !0,
      get: function() {
        return e.createSvgIcon;
      }
    });
    var e = Sw;
  }(Vr)), Vr;
}
var Ow = Md;
Object.defineProperty(Oo, "__esModule", {
  value: !0
});
var xs = Oo.default = void 0, Rw = Ow(Cw()), _w = il;
xs = Oo.default = (0, Rw.default)(/* @__PURE__ */ (0, _w.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Pw(t) {
  return typeof t == "string";
}
function pn(t, e, n) {
  return t === void 0 || Pw(t) ? e : M({}, e, {
    ownerState: M({}, e.ownerState, n)
  });
}
const $w = {
  disableDefaultClasses: !1
}, Iw = /* @__PURE__ */ j.createContext($w);
function Aw(t) {
  const {
    disableDefaultClasses: e
  } = j.useContext(Iw);
  return (n) => e ? "" : t(n);
}
function Mw(t, e = []) {
  if (t === void 0)
    return {};
  const n = {};
  return Object.keys(t).filter((r) => r.match(/^on[A-Z]/) && typeof t[r] == "function" && !e.includes(r)).forEach((r) => {
    n[r] = t[r];
  }), n;
}
function Dw(t, e, n) {
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
function Bw(t) {
  const {
    getSlotProps: e,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = t;
  if (!e) {
    const g = ye(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), y = M({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), m = M({}, n, o, r);
    return g.length > 0 && (m.className = g), Object.keys(y).length > 0 && (m.style = y), {
      props: m,
      internalRef: void 0
    };
  }
  const s = Mw(M({}, o, r)), l = Ya(r), c = Ya(o), d = e(s), u = ye(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), f = M({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), w = M({}, d, n, c, l);
  return u.length > 0 && (w.className = u), Object.keys(f).length > 0 && (w.style = f), {
    props: w,
    internalRef: d.ref
  };
}
const jw = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Vw(t) {
  var e;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = t, s = kt(t, jw), l = a ? {} : Dw(r, o), {
    props: c,
    internalRef: d
  } = Bw(M({}, s, {
    externalSlotProps: l
  })), u = ke(d, l == null ? void 0 : l.ref, (e = t.additionalProps) == null ? void 0 : e.ref);
  return pn(n, M({}, c, {
    ref: u
  }), o);
}
const Ns = "base";
function zw(t) {
  return `${Ns}--${t}`;
}
function Lw(t, e) {
  return `${Ns}-${t}-${e}`;
}
function ks(t, e) {
  const n = ps[e];
  return n ? zw(n) : Lw(t, e);
}
function Fw(t, e) {
  const n = {};
  return e.forEach((r) => {
    n[r] = ks(t, r);
  }), n;
}
function Uw(t) {
  return typeof t == "function" ? t() : t;
}
const lr = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = e, [s, l] = j.useState(null), c = ke(/* @__PURE__ */ j.isValidElement(r) ? r.ref : null, n);
  if (Xe(() => {
    a || l(Uw(o) || document.body);
  }, [o, a]), Xe(() => {
    if (s && !a)
      return ir(n, s), () => {
        ir(n, null);
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
    children: s && /* @__PURE__ */ nc.createPortal(r, s)
  });
});
process.env.NODE_ENV !== "production" && (lr.propTypes = {
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
  container: p.oneOfType([En, p.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: p.bool
});
process.env.NODE_ENV !== "production" && (lr["propTypes"] = Yd(lr.propTypes));
var Ct = "top", Lt = "bottom", Ft = "right", Ot = "left", Fo = "auto", Vn = [Ct, Lt, Ft, Ot], He = "start", Sn = "end", Gw = "clippingParents", Es = "viewport", ln = "popper", Xw = "reference", Wa = /* @__PURE__ */ Vn.reduce(function(t, e) {
  return t.concat([e + "-" + He, e + "-" + Sn]);
}, []), Ts = /* @__PURE__ */ [].concat(Vn, [Fo]).reduce(function(t, e) {
  return t.concat([e, e + "-" + He, e + "-" + Sn]);
}, []), Hw = "beforeRead", Yw = "read", Ww = "afterRead", qw = "beforeMain", Kw = "main", Jw = "afterMain", Zw = "beforeWrite", Qw = "write", tf = "afterWrite", ef = [Hw, Yw, Ww, qw, Kw, Jw, Zw, Qw, tf];
function Qt(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function Dt(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function Te(t) {
  var e = Dt(t).Element;
  return t instanceof e || t instanceof Element;
}
function zt(t) {
  var e = Dt(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Uo(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = Dt(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function nf(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(n) {
    var r = e.styles[n] || {}, o = e.attributes[n] || {}, a = e.elements[n];
    !zt(a) || !Qt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(s) {
      var l = o[s];
      l === !1 ? a.removeAttribute(s) : a.setAttribute(s, l === !0 ? "" : l);
    }));
  });
}
function rf(t) {
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
      !zt(o) || !Qt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const of = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: nf,
  effect: rf,
  requires: ["computeStyles"]
};
function qt(t) {
  return t.split("-")[0];
}
var xe = Math.max, cr = Math.min, Ye = Math.round;
function lo() {
  var t = navigator.userAgentData;
  return t != null && t.brands && Array.isArray(t.brands) ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function Ss() {
  return !/^((?!chrome|android).)*safari/i.test(lo());
}
function We(t, e, n) {
  e === void 0 && (e = !1), n === void 0 && (n = !1);
  var r = t.getBoundingClientRect(), o = 1, a = 1;
  e && zt(t) && (o = t.offsetWidth > 0 && Ye(r.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && Ye(r.height) / t.offsetHeight || 1);
  var s = Te(t) ? Dt(t) : window, l = s.visualViewport, c = !Ss() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, u = (r.top + (c && l ? l.offsetTop : 0)) / a, f = r.width / o, w = r.height / a;
  return {
    width: f,
    height: w,
    top: u,
    right: d + f,
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
function Cs(t, e) {
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
function oe(t) {
  return Dt(t).getComputedStyle(t);
}
function af(t) {
  return ["table", "td", "th"].indexOf(Qt(t)) >= 0;
}
function de(t) {
  return ((Te(t) ? t.ownerDocument : (
    // $FlowFixMe[prop-missing]
    t.document
  )) || window.document).documentElement;
}
function Cr(t) {
  return Qt(t) === "html" ? t : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    t.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    t.parentNode || // DOM Element detected
    (Uo(t) ? t.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    de(t)
  );
}
function qa(t) {
  return !zt(t) || // https://github.com/popperjs/popper-core/issues/837
  oe(t).position === "fixed" ? null : t.offsetParent;
}
function sf(t) {
  var e = /firefox/i.test(lo()), n = /Trident/i.test(lo());
  if (n && zt(t)) {
    var r = oe(t);
    if (r.position === "fixed")
      return null;
  }
  var o = Cr(t);
  for (Uo(o) && (o = o.host); zt(o) && ["html", "body"].indexOf(Qt(o)) < 0; ) {
    var a = oe(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function zn(t) {
  for (var e = Dt(t), n = qa(t); n && af(n) && oe(n).position === "static"; )
    n = qa(n);
  return n && (Qt(n) === "html" || Qt(n) === "body" && oe(n).position === "static") ? e : n || sf(t) || e;
}
function Xo(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function gn(t, e, n) {
  return xe(t, cr(e, n));
}
function lf(t, e, n) {
  var r = gn(t, e, n);
  return r > n ? n : r;
}
function Os() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Rs(t) {
  return Object.assign({}, Os(), t);
}
function _s(t, e) {
  return e.reduce(function(n, r) {
    return n[r] = t, n;
  }, {});
}
var cf = function(e, n) {
  return e = typeof e == "function" ? e(Object.assign({}, n.rects, {
    placement: n.placement
  })) : e, Rs(typeof e != "number" ? e : _s(e, Vn));
};
function df(t) {
  var e, n = t.state, r = t.name, o = t.options, a = n.elements.arrow, s = n.modifiersData.popperOffsets, l = qt(n.placement), c = Xo(l), d = [Ot, Ft].indexOf(l) >= 0, u = d ? "height" : "width";
  if (!(!a || !s)) {
    var f = cf(o.padding, n), w = Go(a), g = c === "y" ? Ct : Ot, y = c === "y" ? Lt : Ft, m = n.rects.reference[u] + n.rects.reference[c] - s[c] - n.rects.popper[u], h = s[c] - n.rects.reference[c], x = zn(a), $ = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, _ = m / 2 - h / 2, T = f[g], b = $ - w[u] - f[y], I = $ / 2 - w[u] / 2 + _, F = gn(T, I, b), J = c;
    n.modifiersData[r] = (e = {}, e[J] = F, e.centerOffset = F - I, e);
  }
}
function uf(t) {
  var e = t.state, n = t.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = e.elements.popper.querySelector(o), !o) || Cs(e.elements.popper, o) && (e.elements.arrow = o));
}
const pf = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: df,
  effect: uf,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function qe(t) {
  return t.split("-")[1];
}
var wf = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ff(t, e) {
  var n = t.x, r = t.y, o = e.devicePixelRatio || 1;
  return {
    x: Ye(n * o) / o || 0,
    y: Ye(r * o) / o || 0
  };
}
function Ka(t) {
  var e, n = t.popper, r = t.popperRect, o = t.placement, a = t.variation, s = t.offsets, l = t.position, c = t.gpuAcceleration, d = t.adaptive, u = t.roundOffsets, f = t.isFixed, w = s.x, g = w === void 0 ? 0 : w, y = s.y, m = y === void 0 ? 0 : y, h = typeof u == "function" ? u({
    x: g,
    y: m
  }) : {
    x: g,
    y: m
  };
  g = h.x, m = h.y;
  var x = s.hasOwnProperty("x"), $ = s.hasOwnProperty("y"), _ = Ot, T = Ct, b = window;
  if (d) {
    var I = zn(n), F = "clientHeight", J = "clientWidth";
    if (I === Dt(n) && (I = de(n), oe(I).position !== "static" && l === "absolute" && (F = "scrollHeight", J = "scrollWidth")), I = I, o === Ct || (o === Ot || o === Ft) && a === Sn) {
      T = Lt;
      var O = f && I === b && b.visualViewport ? b.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        I[F]
      );
      m -= O - r.height, m *= c ? 1 : -1;
    }
    if (o === Ot || (o === Ct || o === Lt) && a === Sn) {
      _ = Ft;
      var A = f && I === b && b.visualViewport ? b.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        I[J]
      );
      g -= A - r.width, g *= c ? 1 : -1;
    }
  }
  var D = Object.assign({
    position: l
  }, d && wf), P = u === !0 ? ff({
    x: g,
    y: m
  }, Dt(n)) : {
    x: g,
    y: m
  };
  if (g = P.x, m = P.y, c) {
    var B;
    return Object.assign({}, D, (B = {}, B[T] = $ ? "0" : "", B[_] = x ? "0" : "", B.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + g + "px, " + m + "px)" : "translate3d(" + g + "px, " + m + "px, 0)", B));
  }
  return Object.assign({}, D, (e = {}, e[T] = $ ? m + "px" : "", e[_] = x ? g + "px" : "", e.transform = "", e));
}
function mf(t) {
  var e = t.state, n = t.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, s = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: qt(e.placement),
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
const hf = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: mf,
  data: {}
};
var Wn = {
  passive: !0
};
function gf(t) {
  var e = t.state, n = t.instance, r = t.options, o = r.scroll, a = o === void 0 ? !0 : o, s = r.resize, l = s === void 0 ? !0 : s, c = Dt(e.elements.popper), d = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && d.forEach(function(u) {
    u.addEventListener("scroll", n.update, Wn);
  }), l && c.addEventListener("resize", n.update, Wn), function() {
    a && d.forEach(function(u) {
      u.removeEventListener("scroll", n.update, Wn);
    }), l && c.removeEventListener("resize", n.update, Wn);
  };
}
const bf = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: gf,
  data: {}
};
var vf = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function tr(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return vf[e];
  });
}
var yf = {
  start: "end",
  end: "start"
};
function Ja(t) {
  return t.replace(/start|end/g, function(e) {
    return yf[e];
  });
}
function Ho(t) {
  var e = Dt(t), n = e.pageXOffset, r = e.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Yo(t) {
  return We(de(t)).left + Ho(t).scrollLeft;
}
function xf(t, e) {
  var n = Dt(t), r = de(t), o = n.visualViewport, a = r.clientWidth, s = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, s = o.height;
    var d = Ss();
    (d || !d && e === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: s,
    x: l + Yo(t),
    y: c
  };
}
function Nf(t) {
  var e, n = de(t), r = Ho(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = xe(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), s = xe(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Yo(t), c = -r.scrollTop;
  return oe(o || n).direction === "rtl" && (l += xe(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: s,
    x: l,
    y: c
  };
}
function Wo(t) {
  var e = oe(t), n = e.overflow, r = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ps(t) {
  return ["html", "body", "#document"].indexOf(Qt(t)) >= 0 ? t.ownerDocument.body : zt(t) && Wo(t) ? t : Ps(Cr(t));
}
function bn(t, e) {
  var n;
  e === void 0 && (e = []);
  var r = Ps(t), o = r === ((n = t.ownerDocument) == null ? void 0 : n.body), a = Dt(r), s = o ? [a].concat(a.visualViewport || [], Wo(r) ? r : []) : r, l = e.concat(s);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(bn(Cr(s)))
  );
}
function co(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function kf(t, e) {
  var n = We(t, !1, e === "fixed");
  return n.top = n.top + t.clientTop, n.left = n.left + t.clientLeft, n.bottom = n.top + t.clientHeight, n.right = n.left + t.clientWidth, n.width = t.clientWidth, n.height = t.clientHeight, n.x = n.left, n.y = n.top, n;
}
function Za(t, e, n) {
  return e === Es ? co(xf(t, n)) : Te(e) ? kf(e, n) : co(Nf(de(t)));
}
function Ef(t) {
  var e = bn(Cr(t)), n = ["absolute", "fixed"].indexOf(oe(t).position) >= 0, r = n && zt(t) ? zn(t) : t;
  return Te(r) ? e.filter(function(o) {
    return Te(o) && Cs(o, r) && Qt(o) !== "body";
  }) : [];
}
function Tf(t, e, n, r) {
  var o = e === "clippingParents" ? Ef(t) : [].concat(e), a = [].concat(o, [n]), s = a[0], l = a.reduce(function(c, d) {
    var u = Za(t, d, r);
    return c.top = xe(u.top, c.top), c.right = cr(u.right, c.right), c.bottom = cr(u.bottom, c.bottom), c.left = xe(u.left, c.left), c;
  }, Za(t, s, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function $s(t) {
  var e = t.reference, n = t.element, r = t.placement, o = r ? qt(r) : null, a = r ? qe(r) : null, s = e.x + e.width / 2 - n.width / 2, l = e.y + e.height / 2 - n.height / 2, c;
  switch (o) {
    case Ct:
      c = {
        x: s,
        y: e.y - n.height
      };
      break;
    case Lt:
      c = {
        x: s,
        y: e.y + e.height
      };
      break;
    case Ft:
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
  var d = o ? Xo(o) : null;
  if (d != null) {
    var u = d === "y" ? "height" : "width";
    switch (a) {
      case He:
        c[d] = c[d] - (e[u] / 2 - n[u] / 2);
        break;
      case Sn:
        c[d] = c[d] + (e[u] / 2 - n[u] / 2);
        break;
    }
  }
  return c;
}
function Cn(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = r === void 0 ? t.placement : r, a = n.strategy, s = a === void 0 ? t.strategy : a, l = n.boundary, c = l === void 0 ? Gw : l, d = n.rootBoundary, u = d === void 0 ? Es : d, f = n.elementContext, w = f === void 0 ? ln : f, g = n.altBoundary, y = g === void 0 ? !1 : g, m = n.padding, h = m === void 0 ? 0 : m, x = Rs(typeof h != "number" ? h : _s(h, Vn)), $ = w === ln ? Xw : ln, _ = t.rects.popper, T = t.elements[y ? $ : w], b = Tf(Te(T) ? T : T.contextElement || de(t.elements.popper), c, u, s), I = We(t.elements.reference), F = $s({
    reference: I,
    element: _,
    strategy: "absolute",
    placement: o
  }), J = co(Object.assign({}, _, F)), O = w === ln ? J : I, A = {
    top: b.top - O.top + x.top,
    bottom: O.bottom - b.bottom + x.bottom,
    left: b.left - O.left + x.left,
    right: O.right - b.right + x.right
  }, D = t.modifiersData.offset;
  if (w === ln && D) {
    var P = D[o];
    Object.keys(A).forEach(function(B) {
      var q = [Ft, Lt].indexOf(B) >= 0 ? 1 : -1, H = [Ct, Lt].indexOf(B) >= 0 ? "y" : "x";
      A[B] += P[H] * q;
    });
  }
  return A;
}
function Sf(t, e) {
  e === void 0 && (e = {});
  var n = e, r = n.placement, o = n.boundary, a = n.rootBoundary, s = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? Ts : c, u = qe(r), f = u ? l ? Wa : Wa.filter(function(y) {
    return qe(y) === u;
  }) : Vn, w = f.filter(function(y) {
    return d.indexOf(y) >= 0;
  });
  w.length === 0 && (w = f);
  var g = w.reduce(function(y, m) {
    return y[m] = Cn(t, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: s
    })[qt(m)], y;
  }, {});
  return Object.keys(g).sort(function(y, m) {
    return g[y] - g[m];
  });
}
function Cf(t) {
  if (qt(t) === Fo)
    return [];
  var e = tr(t);
  return [Ja(t), e, Ja(e)];
}
function Of(t) {
  var e = t.state, n = t.options, r = t.name;
  if (!e.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !0 : s, c = n.fallbackPlacements, d = n.padding, u = n.boundary, f = n.rootBoundary, w = n.altBoundary, g = n.flipVariations, y = g === void 0 ? !0 : g, m = n.allowedAutoPlacements, h = e.options.placement, x = qt(h), $ = x === h, _ = c || ($ || !y ? [tr(h)] : Cf(h)), T = [h].concat(_).reduce(function(G, W) {
      return G.concat(qt(W) === Fo ? Sf(e, {
        placement: W,
        boundary: u,
        rootBoundary: f,
        padding: d,
        flipVariations: y,
        allowedAutoPlacements: m
      }) : W);
    }, []), b = e.rects.reference, I = e.rects.popper, F = /* @__PURE__ */ new Map(), J = !0, O = T[0], A = 0; A < T.length; A++) {
      var D = T[A], P = qt(D), B = qe(D) === He, q = [Ct, Lt].indexOf(P) >= 0, H = q ? "width" : "height", z = Cn(e, {
        placement: D,
        boundary: u,
        rootBoundary: f,
        altBoundary: w,
        padding: d
      }), tt = q ? B ? Ft : Ot : B ? Lt : Ct;
      b[H] > I[H] && (tt = tr(tt));
      var rt = tr(tt), at = [];
      if (a && at.push(z[P] <= 0), l && at.push(z[tt] <= 0, z[rt] <= 0), at.every(function(G) {
        return G;
      })) {
        O = D, J = !1;
        break;
      }
      F.set(D, at);
    }
    if (J)
      for (var k = y ? 3 : 1, E = function(W) {
        var L = T.find(function(Z) {
          var K = F.get(Z);
          if (K)
            return K.slice(0, W).every(function(Q) {
              return Q;
            });
        });
        if (L)
          return O = L, "break";
      }, U = k; U > 0; U--) {
        var Y = E(U);
        if (Y === "break")
          break;
      }
    e.placement !== O && (e.modifiersData[r]._skip = !0, e.placement = O, e.reset = !0);
  }
}
const Rf = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Of,
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
  return [Ct, Ft, Lt, Ot].some(function(e) {
    return t[e] >= 0;
  });
}
function _f(t) {
  var e = t.state, n = t.name, r = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, s = Cn(e, {
    elementContext: "reference"
  }), l = Cn(e, {
    altBoundary: !0
  }), c = Qa(s, r), d = Qa(l, o, a), u = ti(c), f = ti(d);
  e.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: u,
    hasPopperEscaped: f
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": u,
    "data-popper-escaped": f
  });
}
const Pf = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: _f
};
function $f(t, e, n) {
  var r = qt(t), o = [Ot, Ct].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, e, {
    placement: t
  })) : n, s = a[0], l = a[1];
  return s = s || 0, l = (l || 0) * o, [Ot, Ft].indexOf(r) >= 0 ? {
    x: l,
    y: s
  } : {
    x: s,
    y: l
  };
}
function If(t) {
  var e = t.state, n = t.options, r = t.name, o = n.offset, a = o === void 0 ? [0, 0] : o, s = Ts.reduce(function(u, f) {
    return u[f] = $f(f, e.rects, a), u;
  }, {}), l = s[e.placement], c = l.x, d = l.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += c, e.modifiersData.popperOffsets.y += d), e.modifiersData[r] = s;
}
const Af = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: If
};
function Mf(t) {
  var e = t.state, n = t.name;
  e.modifiersData[n] = $s({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const Df = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Mf,
  data: {}
};
function Bf(t) {
  return t === "x" ? "y" : "x";
}
function jf(t) {
  var e = t.state, n = t.options, r = t.name, o = n.mainAxis, a = o === void 0 ? !0 : o, s = n.altAxis, l = s === void 0 ? !1 : s, c = n.boundary, d = n.rootBoundary, u = n.altBoundary, f = n.padding, w = n.tether, g = w === void 0 ? !0 : w, y = n.tetherOffset, m = y === void 0 ? 0 : y, h = Cn(e, {
    boundary: c,
    rootBoundary: d,
    padding: f,
    altBoundary: u
  }), x = qt(e.placement), $ = qe(e.placement), _ = !$, T = Xo(x), b = Bf(T), I = e.modifiersData.popperOffsets, F = e.rects.reference, J = e.rects.popper, O = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, A = typeof O == "number" ? {
    mainAxis: O,
    altAxis: O
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, O), D = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, P = {
    x: 0,
    y: 0
  };
  if (I) {
    if (a) {
      var B, q = T === "y" ? Ct : Ot, H = T === "y" ? Lt : Ft, z = T === "y" ? "height" : "width", tt = I[T], rt = tt + h[q], at = tt - h[H], k = g ? -J[z] / 2 : 0, E = $ === He ? F[z] : J[z], U = $ === He ? -J[z] : -F[z], Y = e.elements.arrow, G = g && Y ? Go(Y) : {
        width: 0,
        height: 0
      }, W = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : Os(), L = W[q], Z = W[H], K = gn(0, F[z], G[z]), Q = _ ? F[z] / 2 - k - K - L - A.mainAxis : E - K - L - A.mainAxis, R = _ ? -F[z] / 2 + k + K + Z + A.mainAxis : U + K + Z + A.mainAxis, X = e.elements.arrow && zn(e.elements.arrow), C = X ? T === "y" ? X.clientTop || 0 : X.clientLeft || 0 : 0, ft = (B = D == null ? void 0 : D[T]) != null ? B : 0, V = tt + Q - ft - C, xt = tt + R - ft, Gt = gn(g ? cr(rt, V) : rt, tt, g ? xe(at, xt) : at);
      I[T] = Gt, P[T] = Gt - tt;
    }
    if (l) {
      var ue, Tt = T === "x" ? Ct : Ot, Ln = T === "x" ? Lt : Ft, Xt = I[b], Oe = b === "y" ? "height" : "width", pe = Xt + h[Tt], Re = Xt - h[Ln], _e = [Ct, Ot].indexOf(x) !== -1, Pe = (ue = D == null ? void 0 : D[b]) != null ? ue : 0, we = _e ? pe : Xt - F[Oe] - J[Oe] - Pe + A.altAxis, Qe = _e ? Xt + F[Oe] + J[Oe] - Pe - A.altAxis : Re, Fn = g && _e ? lf(we, Xt, Qe) : gn(g ? we : pe, Xt, g ? Qe : Re);
      I[b] = Fn, P[b] = Fn - Xt;
    }
    e.modifiersData[r] = P;
  }
}
const Vf = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: jf,
  requiresIfExists: ["offset"]
};
function zf(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function Lf(t) {
  return t === Dt(t) || !zt(t) ? Ho(t) : zf(t);
}
function Ff(t) {
  var e = t.getBoundingClientRect(), n = Ye(e.width) / t.offsetWidth || 1, r = Ye(e.height) / t.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function Uf(t, e, n) {
  n === void 0 && (n = !1);
  var r = zt(e), o = zt(e) && Ff(e), a = de(e), s = We(t, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((Qt(e) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Wo(a)) && (l = Lf(e)), zt(e) ? (c = We(e, !0), c.x += e.clientLeft, c.y += e.clientTop) : a && (c.x = Yo(a))), {
    x: s.left + l.scrollLeft - c.x,
    y: s.top + l.scrollTop - c.y,
    width: s.width,
    height: s.height
  };
}
function Gf(t) {
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
function Xf(t) {
  var e = Gf(t);
  return ef.reduce(function(n, r) {
    return n.concat(e.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Hf(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(n) {
      Promise.resolve().then(function() {
        e = void 0, n(t());
      });
    })), e;
  };
}
function Yf(t) {
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
function Wf(t) {
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
    }, f = [], w = !1, g = {
      state: u,
      setOptions: function(x) {
        var $ = typeof x == "function" ? x(u.options) : x;
        m(), u.options = Object.assign({}, a, u.options, $), u.scrollParents = {
          reference: Te(l) ? bn(l) : l.contextElement ? bn(l.contextElement) : [],
          popper: bn(c)
        };
        var _ = Xf(Yf([].concat(r, u.options.modifiers)));
        return u.orderedModifiers = _.filter(function(T) {
          return T.enabled;
        }), y(), g.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!w) {
          var x = u.elements, $ = x.reference, _ = x.popper;
          if (ni($, _)) {
            u.rects = {
              reference: Uf($, zn(_), u.options.strategy === "fixed"),
              popper: Go(_)
            }, u.reset = !1, u.placement = u.options.placement, u.orderedModifiers.forEach(function(A) {
              return u.modifiersData[A.name] = Object.assign({}, A.data);
            });
            for (var T = 0; T < u.orderedModifiers.length; T++) {
              if (u.reset === !0) {
                u.reset = !1, T = -1;
                continue;
              }
              var b = u.orderedModifiers[T], I = b.fn, F = b.options, J = F === void 0 ? {} : F, O = b.name;
              typeof I == "function" && (u = I({
                state: u,
                options: J,
                name: O,
                instance: g
              }) || u);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Hf(function() {
        return new Promise(function(h) {
          g.forceUpdate(), h(u);
        });
      }),
      destroy: function() {
        m(), w = !0;
      }
    };
    if (!ni(l, c))
      return g;
    g.setOptions(d).then(function(h) {
      !w && d.onFirstUpdate && d.onFirstUpdate(h);
    });
    function y() {
      u.orderedModifiers.forEach(function(h) {
        var x = h.name, $ = h.options, _ = $ === void 0 ? {} : $, T = h.effect;
        if (typeof T == "function") {
          var b = T({
            state: u,
            name: x,
            instance: g,
            options: _
          }), I = function() {
          };
          f.push(b || I);
        }
      });
    }
    function m() {
      f.forEach(function(h) {
        return h();
      }), f = [];
    }
    return g;
  };
}
var qf = [bf, Df, hf, of, Af, Rf, Vf, pf, Pf], Kf = /* @__PURE__ */ Wf({
  defaultModifiers: qf
});
const Is = "Popper";
function Jf(t) {
  return ks(Is, t);
}
Fw(Is, ["root"]);
const Zf = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Qf = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function tm(t, e) {
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
function dr(t) {
  return typeof t == "function" ? t() : t;
}
function Or(t) {
  return t.nodeType !== void 0;
}
function em(t) {
  return !Or(t);
}
const nm = () => Po({
  root: ["root"]
}, Aw(Jf)), rm = {}, om = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r;
  const {
    anchorEl: o,
    children: a,
    direction: s,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: u,
    popperOptions: f,
    popperRef: w,
    slotProps: g = {},
    slots: y = {},
    TransitionProps: m
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = e, h = kt(e, Zf), x = j.useRef(null), $ = ke(x, n), _ = j.useRef(null), T = ke(_, w), b = j.useRef(T);
  Xe(() => {
    b.current = T;
  }, [T]), j.useImperativeHandle(w, () => _.current, []);
  const I = tm(u, s), [F, J] = j.useState(I), [O, A] = j.useState(dr(o));
  j.useEffect(() => {
    _.current && _.current.forceUpdate();
  }), j.useEffect(() => {
    o && A(dr(o));
  }, [o]), Xe(() => {
    if (!O || !d)
      return;
    const H = (rt) => {
      J(rt.placement);
    };
    if (process.env.NODE_ENV !== "production" && O && Or(O) && O.nodeType === 1) {
      const rt = O.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && rt.top === 0 && rt.left === 0 && rt.right === 0 && rt.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let z = [{
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
        state: rt
      }) => {
        H(rt);
      }
    }];
    c != null && (z = z.concat(c)), f && f.modifiers != null && (z = z.concat(f.modifiers));
    const tt = Kf(O, x.current, M({
      placement: I
    }, f, {
      modifiers: z
    }));
    return b.current(tt), () => {
      tt.destroy(), b.current(null);
    };
  }, [O, l, c, d, f, I]);
  const D = {
    placement: F
  };
  m !== null && (D.TransitionProps = m);
  const P = nm(), B = (r = y.root) != null ? r : "div", q = Vw({
    elementType: B,
    externalSlotProps: g.root,
    externalForwardedProps: h,
    additionalProps: {
      role: "tooltip",
      ref: $
    },
    ownerState: e,
    className: P.root
  });
  return /* @__PURE__ */ i(B, M({}, q, {
    children: typeof a == "function" ? a(D) : a
  }));
}), As = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: s = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: u,
    placement: f = "bottom",
    popperOptions: w = rm,
    popperRef: g,
    style: y,
    transition: m = !1,
    slotProps: h = {},
    slots: x = {}
  } = e, $ = kt(e, Qf), [_, T] = j.useState(!0), b = () => {
    T(!1);
  }, I = () => {
    T(!0);
  };
  if (!c && !u && (!m || _))
    return null;
  let F;
  if (a)
    F = a;
  else if (r) {
    const A = dr(r);
    F = A && Or(A) ? ar(A).body : ar(null).body;
  }
  const J = !u && c && (!m || _) ? "none" : void 0, O = m ? {
    in: u,
    onEnter: b,
    onExited: I
  } : void 0;
  return /* @__PURE__ */ i(lr, {
    disablePortal: l,
    container: F,
    children: /* @__PURE__ */ i(om, M({
      anchorEl: r,
      direction: s,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: m ? !_ : u,
      placement: f,
      popperOptions: w,
      popperRef: g,
      slotProps: h,
      slots: x
    }, $, {
      style: M({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: J
      }, y),
      TransitionProps: O,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (As.propTypes = {
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
  anchorEl: Ro(p.oneOfType([En, p.object, p.func]), (t) => {
    if (t.open) {
      const e = dr(t.anchorEl);
      if (e && Or(e) && e.nodeType === 1) {
        const n = e.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!e || typeof e.getBoundingClientRect != "function" || em(e) && e.contextElement != null && e.contextElement.nodeType !== 1)
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
  container: p.oneOfType([En, p.func]),
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
  popperRef: is,
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
function Ms() {
  const t = bs(jo);
  return process.env.NODE_ENV !== "production" && j.useDebugValue(t), t[Vo] || t;
}
function uo(t, e) {
  return uo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, uo(t, e);
}
function am(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, uo(t, e);
}
const ri = {
  disabled: !1
};
var im = process.env.NODE_ENV !== "production" ? p.oneOfType([p.number, p.shape({
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
const Ds = S.createContext(null);
var sm = function(e) {
  return e.scrollTop;
}, wn = "unmounted", he = "exited", ge = "entering", je = "entered", po = "exiting", ae = /* @__PURE__ */ function(t) {
  am(e, t);
  function e(r, o) {
    var a;
    a = t.call(this, r, o) || this;
    var s = o, l = s && !s.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = he, a.appearStatus = ge) : c = je : r.unmountOnExit || r.mountOnEnter ? c = wn : c = he, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  e.getDerivedStateFromProps = function(o, a) {
    var s = o.in;
    return s && a.status === wn ? {
      status: he
    } : null;
  };
  var n = e.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var s = this.state.status;
      this.props.in ? s !== ge && s !== je && (a = ge) : (s === ge || s === je) && (a = po);
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
      if (this.cancelNextCallback(), a === ge) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var s = this.props.nodeRef ? this.props.nodeRef.current : Xn.findDOMNode(this);
          s && sm(s);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === he && this.setState({
        status: wn
      });
  }, n.performEnter = function(o) {
    var a = this, s = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Xn.findDOMNode(this), l], d = c[0], u = c[1], f = this.getTimeouts(), w = l ? f.appear : f.enter;
    if (!o && !s || ri.disabled) {
      this.safeSetState({
        status: je
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, u), this.safeSetState({
      status: ge
    }, function() {
      a.props.onEntering(d, u), a.onTransitionEnd(w, function() {
        a.safeSetState({
          status: je
        }, function() {
          a.props.onEntered(d, u);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, s = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Xn.findDOMNode(this);
    if (!a || ri.disabled) {
      this.safeSetState({
        status: he
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: po
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(s.exit, function() {
        o.safeSetState({
          status: he
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
    var s = this.props.nodeRef ? this.props.nodeRef.current : Xn.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === wn)
      return null;
    var a = this.props, s = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = kt(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ S.createElement(Ds.Provider, {
        value: null
      }, typeof s == "function" ? s(o, l) : S.cloneElement(S.Children.only(s), l))
    );
  }, e;
}(S.Component);
ae.contextType = Ds;
ae.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var n = im;
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
function Be() {
}
ae.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Be,
  onEntering: Be,
  onEntered: Be,
  onExit: Be,
  onExiting: Be,
  onExited: Be
};
ae.UNMOUNTED = wn;
ae.EXITED = he;
ae.ENTERING = ge;
ae.ENTERED = je;
ae.EXITING = po;
const lm = ae, cm = (t) => t.scrollTop;
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
const dm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function wo(t) {
  return `scale(${t}, ${t ** 2})`;
}
const um = {
  entering: {
    opacity: 1,
    transform: wo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Wr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), qo = /* @__PURE__ */ j.forwardRef(function(e, n) {
  const {
    addEndListener: r,
    appear: o = !0,
    children: a,
    easing: s,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: u,
    onExit: f,
    onExited: w,
    onExiting: g,
    style: y,
    timeout: m = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: h = lm
  } = e, x = kt(e, dm), $ = un(), _ = j.useRef(), T = Ms(), b = j.useRef(null), I = ke(b, a.ref, n), F = (H) => (z) => {
    if (H) {
      const tt = b.current;
      z === void 0 ? H(tt) : H(tt, z);
    }
  }, J = F(u), O = F((H, z) => {
    cm(H);
    const {
      duration: tt,
      delay: rt,
      easing: at
    } = oi({
      style: y,
      timeout: m,
      easing: s
    }, {
      mode: "enter"
    });
    let k;
    m === "auto" ? (k = T.transitions.getAutoHeightDuration(H.clientHeight), _.current = k) : k = tt, H.style.transition = [T.transitions.create("opacity", {
      duration: k,
      delay: rt
    }), T.transitions.create("transform", {
      duration: Wr ? k : k * 0.666,
      delay: rt,
      easing: at
    })].join(","), c && c(H, z);
  }), A = F(d), D = F(g), P = F((H) => {
    const {
      duration: z,
      delay: tt,
      easing: rt
    } = oi({
      style: y,
      timeout: m,
      easing: s
    }, {
      mode: "exit"
    });
    let at;
    m === "auto" ? (at = T.transitions.getAutoHeightDuration(H.clientHeight), _.current = at) : at = z, H.style.transition = [T.transitions.create("opacity", {
      duration: at,
      delay: tt
    }), T.transitions.create("transform", {
      duration: Wr ? at : at * 0.666,
      delay: Wr ? tt : tt || at * 0.333,
      easing: rt
    })].join(","), H.style.opacity = 0, H.style.transform = wo(0.75), f && f(H);
  }), B = F(w);
  return /* @__PURE__ */ i(h, M({
    appear: o,
    in: l,
    nodeRef: b,
    onEnter: O,
    onEntered: A,
    onEntering: J,
    onExit: P,
    onExited: B,
    onExiting: D,
    addEndListener: (H) => {
      m === "auto" && $.start(_.current || 0, H), r && r(b.current, H);
    },
    timeout: m === "auto" ? null : m
  }, x, {
    children: (H, z) => /* @__PURE__ */ j.cloneElement(a, M({
      style: M({
        opacity: 0,
        transform: wo(0.75),
        visibility: H === "exited" && !l ? "hidden" : void 0
      }, um[H], y, a.props.style),
      ref: I
    }, z))
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
  children: os.isRequired,
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
const ai = qo, pm = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], wm = jn(As, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (t, e) => e.root
})({}), Bs = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r;
  const o = gs(), a = zo({
    props: e,
    name: "MuiPopper"
  }), {
    anchorEl: s,
    component: l,
    components: c,
    componentsProps: d,
    container: u,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: y,
    placement: m,
    popperOptions: h,
    popperRef: x,
    transition: $,
    slots: _,
    slotProps: T
  } = a, b = kt(a, pm), I = (r = _ == null ? void 0 : _.root) != null ? r : c == null ? void 0 : c.Root, F = M({
    anchorEl: s,
    container: u,
    disablePortal: f,
    keepMounted: w,
    modifiers: g,
    open: y,
    placement: m,
    popperOptions: h,
    popperRef: x,
    transition: $
  }, b);
  return /* @__PURE__ */ i(wm, M({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: I
    },
    slotProps: T ?? d
  }, F, {
    ref: n
  }));
});
process.env.NODE_ENV !== "production" && (Bs.propTypes = {
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
  anchorEl: p.oneOfType([En, p.object, p.func]),
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
  container: p.oneOfType([En, p.func]),
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
  popperRef: is,
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
const js = Bs;
function fm(t) {
  return gr("MuiTooltip", t);
}
const mm = ws("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), se = mm, hm = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function gm(t) {
  return Math.round(t * 1e5) / 1e5;
}
const bm = (t) => {
  const {
    classes: e,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = t, s = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${Zt(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return Po(s, fm, e);
}, vm = jn(js, {
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
}) => M({
  zIndex: (t.vars || t).zIndex.tooltip,
  pointerEvents: "none"
}, !e.disableInteractive && {
  pointerEvents: "auto"
}, !n && {
  pointerEvents: "none"
}, e.arrow && {
  [`&[data-popper-placement*="bottom"] .${se.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${se.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${se.arrow}`]: M({}, e.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${se.arrow}`]: M({}, e.isRtl ? {
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
})), ym = jn("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (t, e) => {
    const {
      ownerState: n
    } = t;
    return [e.tooltip, n.touch && e.touch, n.arrow && e.tooltipArrow, e[`tooltipPlacement${Zt(n.placement.split("-")[0])}`]];
  }
})(({
  theme: t,
  ownerState: e
}) => M({
  backgroundColor: t.vars ? t.vars.palette.Tooltip.bg : vs(t.palette.grey[700], 0.92),
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
  lineHeight: `${gm(16 / 14)}em`,
  fontWeight: t.typography.fontWeightRegular
}, {
  [`.${se.popper}[data-popper-placement*="left"] &`]: M({
    transformOrigin: "right center"
  }, e.isRtl ? M({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  }) : M({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  })),
  [`.${se.popper}[data-popper-placement*="right"] &`]: M({
    transformOrigin: "left center"
  }, e.isRtl ? M({
    marginRight: "14px"
  }, e.touch && {
    marginRight: "24px"
  }) : M({
    marginLeft: "14px"
  }, e.touch && {
    marginLeft: "24px"
  })),
  [`.${se.popper}[data-popper-placement*="top"] &`]: M({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, e.touch && {
    marginBottom: "24px"
  }),
  [`.${se.popper}[data-popper-placement*="bottom"] &`]: M({
    transformOrigin: "center top",
    marginTop: "14px"
  }, e.touch && {
    marginTop: "24px"
  })
})), xm = jn("span", {
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
  color: t.vars ? t.vars.palette.Tooltip.bg : vs(t.palette.grey[700], 0.9),
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
let qn = !1;
const ii = new Mn();
let cn = {
  x: 0,
  y: 0
};
function Kn(t, e) {
  return (n) => {
    e && e(n), t(n);
  };
}
const Vs = /* @__PURE__ */ j.forwardRef(function(e, n) {
  var r, o, a, s, l, c, d, u, f, w, g, y, m, h, x, $, _, T, b;
  const I = zo({
    props: e,
    name: "MuiTooltip"
  }), {
    arrow: F = !1,
    children: J,
    components: O = {},
    componentsProps: A = {},
    describeChild: D = !1,
    disableFocusListener: P = !1,
    disableHoverListener: B = !1,
    disableInteractive: q = !1,
    disableTouchListener: H = !1,
    enterDelay: z = 100,
    enterNextDelay: tt = 0,
    enterTouchDelay: rt = 700,
    followCursor: at = !1,
    id: k,
    leaveDelay: E = 0,
    leaveTouchDelay: U = 1500,
    onClose: Y,
    onOpen: G,
    open: W,
    placement: L = "bottom",
    PopperComponent: Z,
    PopperProps: K = {},
    slotProps: Q = {},
    slots: R = {},
    title: X,
    TransitionComponent: C = ai,
    TransitionProps: ft
  } = I, V = kt(I, hm), xt = /* @__PURE__ */ j.isValidElement(J) ? J : /* @__PURE__ */ i("span", {
    children: J
  }), Gt = Ms(), ue = Gt.direction === "rtl", [Tt, Ln] = j.useState(), [Xt, Oe] = j.useState(null), pe = j.useRef(!1), Re = q || at, _e = un(), Pe = un(), we = un(), Qe = un(), [Fn, Ko] = ls({
    controlled: W,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let te = Fn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: et
    } = j.useRef(W !== void 0);
    j.useEffect(() => {
      Tt && Tt.disabled && !et && X !== "" && Tt.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [X, Tt, et]);
  }
  const Rr = ss(k), tn = j.useRef(), Un = io(() => {
    tn.current !== void 0 && (document.body.style.WebkitUserSelect = tn.current, tn.current = void 0), Qe.clear();
  });
  j.useEffect(() => Un, [Un]);
  const Jo = (et) => {
    ii.clear(), qn = !0, Ko(!0), G && !te && G(et);
  }, Gn = io(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (et) => {
      ii.start(800 + E, () => {
        qn = !1;
      }), Ko(!1), Y && te && Y(et), _e.start(Gt.transitions.duration.shortest, () => {
        pe.current = !1;
      });
    }
  ), _r = (et) => {
    pe.current && et.type !== "touchstart" || (Tt && Tt.removeAttribute("title"), Pe.clear(), we.clear(), z || qn && tt ? Pe.start(qn ? tt : z, () => {
      Jo(et);
    }) : Jo(et));
  }, Zo = (et) => {
    Pe.clear(), we.start(E, () => {
      Gn(et);
    });
  }, {
    isFocusVisibleRef: Qo,
    onBlur: Ws,
    onFocus: qs,
    ref: Ks
  } = cs(), [, ta] = j.useState(!1), ea = (et) => {
    Ws(et), Qo.current === !1 && (ta(!1), Zo(et));
  }, na = (et) => {
    Tt || Ln(et.currentTarget), qs(et), Qo.current === !0 && (ta(!0), _r(et));
  }, ra = (et) => {
    pe.current = !0;
    const Pt = xt.props;
    Pt.onTouchStart && Pt.onTouchStart(et);
  }, oa = _r, aa = Zo, Js = (et) => {
    ra(et), we.clear(), _e.clear(), Un(), tn.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", Qe.start(rt, () => {
      document.body.style.WebkitUserSelect = tn.current, _r(et);
    });
  }, Zs = (et) => {
    xt.props.onTouchEnd && xt.props.onTouchEnd(et), Un(), we.start(U, () => {
      Gn(et);
    });
  };
  j.useEffect(() => {
    if (!te)
      return;
    function et(Pt) {
      (Pt.key === "Escape" || Pt.key === "Esc") && Gn(Pt);
    }
    return document.addEventListener("keydown", et), () => {
      document.removeEventListener("keydown", et);
    };
  }, [Gn, te]);
  const Qs = ke(xt.ref, Ks, Ln, n);
  !X && X !== 0 && (te = !1);
  const Pr = j.useRef(), tl = (et) => {
    const Pt = xt.props;
    Pt.onMouseMove && Pt.onMouseMove(et), cn = {
      x: et.clientX,
      y: et.clientY
    }, Pr.current && Pr.current.update();
  }, en = {}, $r = typeof X == "string";
  D ? (en.title = !te && $r && !B ? X : null, en["aria-describedby"] = te ? Rr : null) : (en["aria-label"] = $r ? X : null, en["aria-labelledby"] = te && !$r ? Rr : null);
  const Bt = M({}, en, V, xt.props, {
    className: ye(V.className, xt.props.className),
    onTouchStart: ra,
    ref: Qs
  }, at ? {
    onMouseMove: tl
  } : {});
  process.env.NODE_ENV !== "production" && (Bt["data-mui-internal-clone-element"] = !0, j.useEffect(() => {
    Tt && !Tt.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Tt]));
  const nn = {};
  H || (Bt.onTouchStart = Js, Bt.onTouchEnd = Zs), B || (Bt.onMouseOver = Kn(oa, Bt.onMouseOver), Bt.onMouseLeave = Kn(aa, Bt.onMouseLeave), Re || (nn.onMouseOver = oa, nn.onMouseLeave = aa)), P || (Bt.onFocus = Kn(na, Bt.onFocus), Bt.onBlur = Kn(ea, Bt.onBlur), Re || (nn.onFocus = na, nn.onBlur = ea)), process.env.NODE_ENV !== "production" && xt.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${xt.props.title}\` or the Tooltip component.`].join(`
`));
  const el = j.useMemo(() => {
    var et;
    let Pt = [{
      name: "arrow",
      enabled: !!Xt,
      options: {
        element: Xt,
        padding: 4
      }
    }];
    return (et = K.popperOptions) != null && et.modifiers && (Pt = Pt.concat(K.popperOptions.modifiers)), M({}, K.popperOptions, {
      modifiers: Pt
    });
  }, [Xt, K]), rn = M({}, I, {
    isRtl: ue,
    arrow: F,
    disableInteractive: Re,
    placement: L,
    PopperComponentProp: Z,
    touch: pe.current
  }), Ir = bm(rn), ia = (r = (o = R.popper) != null ? o : O.Popper) != null ? r : vm, sa = (a = (s = (l = R.transition) != null ? l : O.Transition) != null ? s : C) != null ? a : ai, la = (c = (d = R.tooltip) != null ? d : O.Tooltip) != null ? c : ym, ca = (u = (f = R.arrow) != null ? f : O.Arrow) != null ? u : xm, nl = pn(ia, M({}, K, (w = Q.popper) != null ? w : A.popper, {
    className: ye(Ir.popper, K == null ? void 0 : K.className, (g = (y = Q.popper) != null ? y : A.popper) == null ? void 0 : g.className)
  }), rn), rl = pn(sa, M({}, ft, (m = Q.transition) != null ? m : A.transition), rn), ol = pn(la, M({}, (h = Q.tooltip) != null ? h : A.tooltip, {
    className: ye(Ir.tooltip, (x = ($ = Q.tooltip) != null ? $ : A.tooltip) == null ? void 0 : x.className)
  }), rn), al = pn(ca, M({}, (_ = Q.arrow) != null ? _ : A.arrow, {
    className: ye(Ir.arrow, (T = (b = Q.arrow) != null ? b : A.arrow) == null ? void 0 : T.className)
  }), rn);
  return /* @__PURE__ */ v(j.Fragment, {
    children: [/* @__PURE__ */ j.cloneElement(xt, Bt), /* @__PURE__ */ i(ia, M({
      as: Z ?? js,
      placement: L,
      anchorEl: at ? {
        getBoundingClientRect: () => ({
          top: cn.y,
          left: cn.x,
          right: cn.x,
          bottom: cn.y,
          width: 0,
          height: 0
        })
      } : Tt,
      popperRef: Pr,
      open: Tt ? te : !1,
      id: Rr,
      transition: !0
    }, nn, nl, {
      popperOptions: el,
      children: ({
        TransitionProps: et
      }) => /* @__PURE__ */ i(sa, M({
        timeout: Gt.transitions.duration.shorter
      }, et, rl, {
        children: /* @__PURE__ */ v(la, M({}, ol, {
          children: [X, F ? /* @__PURE__ */ i(ca, M({}, al, {
            ref: Oe
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Vs.propTypes = {
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
  children: os.isRequired,
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
const Nm = Vs;
function si(t, e, n) {
  return t ? /* @__PURE__ */ i(bi, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ i("img", { src: t, alt: `${n ? "Leading" : "Trailing"} icon for ${e}` }) }) : void 0;
}
function zs(t) {
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
    isSubMenuParent: f = !1,
    hasDisabledGutters: w = !1,
    hasDivider: g = !1,
    focusVisibleClassName: y,
    id: m,
    children: h
  } = t, x = /* @__PURE__ */ i(
    ql,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: u,
      disableGutters: w,
      divider: g,
      focusVisibleClassName: y,
      onClick: e,
      id: m,
      children: n ? /* @__PURE__ */ v(le, { children: [
        si(a, n, !0),
        /* @__PURE__ */ i(Kl, { primary: n, inset: !a && o }),
        f ? /* @__PURE__ */ i(bi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ i(xs, {}) }) : si(s, n, !1)
      ] }) : h
    }
  );
  return r ? /* @__PURE__ */ i(Nm, { title: r, placement: "right", children: /* @__PURE__ */ i("div", { children: x }) }) : x;
}
function Ls(t) {
  return Object.entries(t.groups).map(([n, r]) => ({ id: n, group: r }));
}
function km(t) {
  const [e, n] = st(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = t, s = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Ls(a).filter((u) => "menuItem" in u.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (u) => "menuItem" in u.group && u.group.menuItem === r.id
    ), /* @__PURE__ */ i(Fs, { ...t, includedGroups: d });
  };
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(zs, { onClick: s, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ i(
      Jl,
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
const Em = (t, e) => e.filter((o) => o.group === t).sort((o, a) => (o.order || 0) - (a.order || 0));
function Fs(t) {
  const { menuDefinition: e, onClick: n, commandHandler: r, includedGroups: o } = t, { items: a, allowForLeadingIcons: s } = Nt(() => {
    const u = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Ls(e).filter((y) => !("menuItem" in y.group))
    ), f = Object.values(u).sort(
      (y, m) => (y.group.order || 0) - (m.group.order || 0)
    ), w = [];
    f.forEach((y) => {
      Em(y.id, e.items).forEach(
        (m) => w.push({ item: m, isLastItemInGroup: !1 })
      ), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !0);
    }), w.length > 0 && (w[w.length - 1].isLastItemInGroup = !1);
    const g = w.some(
      (y) => "iconPathBefore" in y.item && y.item.iconPathBefore
    );
    return { items: w, allowForLeadingIcons: g };
  }, [o, e]), l = ({ item: u, isLastItemInGroup: f }) => ({
    className: "papi-menu-item",
    label: u.label,
    tooltip: u.tooltip,
    iconPathBefore: "iconPathBefore" in u ? u.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in u ? u.iconPathAfter : void 0,
    hasDivider: f,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: s
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ i("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ i("div", { role: "menu", "aria-label": d, children: a.map((u, f) => {
    const { item: w } = u, g = l(u);
    if ("command" in w) {
      const y = w.group + f;
      return /* @__PURE__ */ i(
        zs,
        {
          onClick: (m) => {
            n == null || n(m), r(w);
          },
          ...g
        },
        y
      );
    }
    return /* @__PURE__ */ i(
      km,
      {
        parentMenuItem: w,
        parentItemProps: g,
        ...t
      },
      d + w.id
    );
  }) }, d);
}
function Tm(t) {
  const { menuDefinition: e, columnId: n } = t;
  let a = Object.entries(e.groups).map(([s, l]) => ({ id: s, group: l })).filter((s) => "column" in s.group);
  return n && "columns" in e && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  e.columns[n] && (a = a.filter(
    (s) => "column" in s.group && s.group.column === n
  )), /* @__PURE__ */ i(Fs, { ...t, includedGroups: a });
}
function Sm({
  commandHandler: t,
  menuDefinition: e,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ v(
    vi,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ i("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ i(Zl, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ i(
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
function Cm({
  commandHandler: t,
  className: e,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = Nt(() => {
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
    vi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${e ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((s, l) => /* @__PURE__ */ i(
        Sm,
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
function Om(t) {
  return {
    preserveValue: !0,
    ...t
  };
}
const fo = (t, e, n = {}) => {
  const r = ve(e);
  r.current = e;
  const o = ve(n);
  o.current = Om(o.current);
  const [a, s] = st(() => r.current), [l, c] = st(!0);
  return Kt(() => {
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
}, Rm = ys(/* @__PURE__ */ i("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function _m({
  menuProvider: t,
  normalMenu: e,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: s,
  children: l
}) {
  const [c, d] = st(!1), [u, f] = st(!1), w = Et(() => {
    c && d(!1), f(!1);
  }, [c]), g = Et((T) => {
    T.stopPropagation(), d((b) => {
      const I = !b;
      return I && T.shiftKey ? f(!0) : I || f(!1), I;
    });
  }, []), y = Et(
    (T) => (w(), r(T)),
    [r, w]
  ), [m, h] = st({ top: 1, left: 1 });
  Kt(() => {
    if (c) {
      const T = o == null ? void 0 : o.current;
      if (T) {
        const b = T.getBoundingClientRect(), I = window.scrollY, F = window.scrollX, J = b.top + I + T.clientHeight, O = b.left + F;
        h({ top: J, left: O });
      }
    }
  }, [c, o]);
  const [x] = fo(
    Et(async () => (t == null ? void 0 : t(!1)) ?? e, [t, e, c]),
    e
  ), [$] = fo(
    Et(async () => (t == null ? void 0 : t(!0)) ?? n ?? x, [t, n, x, c]),
    n ?? x
  ), _ = u && $ ? $ : x;
  return /* @__PURE__ */ v(le, { children: [
    /* @__PURE__ */ i(
      yi,
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
        children: l ?? /* @__PURE__ */ i(Rm, {})
      }
    ),
    /* @__PURE__ */ i(
      Ql,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: w,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: m.top,
            left: m.left
          }
        },
        children: _ ? /* @__PURE__ */ i(
          Cm,
          {
            className: a,
            id: `${s ?? ""} main menu`,
            commandHandler: y,
            multiColumnMenu: _
          }
        ) : void 0
      }
    )
  ] });
}
function Ph({
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
    yi,
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
const Ce = ur(
  ({ className: t, direction: e, ...n }, r) => /* @__PURE__ */ i(
    Sl,
    {
      size: 35,
      className: N(
        "tw-animate-spin",
        { "tw-direction-reverse": e === "rtl" },
        t
      ),
      ...n,
      ref: r
    }
  )
);
Ce.displayName = "Spinner";
function $h({
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
  onChange: f,
  onFocus: w,
  onBlur: g
}) {
  return /* @__PURE__ */ v("div", { className: N("tw-inline-grid tw-items-center tw-gap-1.5", { "tw-w-full": r }), children: [
    /* @__PURE__ */ i(
      Mt,
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
      Se,
      {
        id: t,
        disabled: e,
        placeholder: s,
        required: l,
        className: N(c, { "tw-border-red-600": n }),
        defaultValue: d,
        value: u,
        onChange: f,
        onFocus: w,
        onBlur: g
      }
    ),
    /* @__PURE__ */ i("p", { className: N({ "tw-hidden": !o }), children: o })
  ] });
}
function Ih({
  menuProvider: t,
  commandHandler: e,
  className: n,
  id: r,
  children: o
}) {
  const a = ve(void 0);
  return /* @__PURE__ */ i("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ i(tc, { position: "static", id: r, children: /* @__PURE__ */ v(
    ec,
    {
      className: N("tw-bg-muted tw-text-muted-foreground", n),
      variant: "dense",
      children: [
        t ? /* @__PURE__ */ i(
          _m,
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
const Pm = Je(
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
), $m = S.forwardRef(({ className: t, variant: e, ...n }, r) => /* @__PURE__ */ i("div", { ref: r, role: "alert", className: N(Pm({ variant: e }), t), ...n }));
$m.displayName = "Alert";
const Im = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ v(
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
Im.displayName = "AlertTitle";
const Am = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("tw-text-sm [&_p]:tw-leading-relaxed", t), ...e }));
Am.displayName = "AlertDescription";
const Mm = Je(
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
function Ah({ className: t, variant: e, ...n }) {
  return /* @__PURE__ */ i("div", { className: N("pr-twp", Mm({ variant: e }), t), ...n });
}
const Us = S.forwardRef(
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
Us.displayName = "Card";
const Gs = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-flex-col tw-space-y-1.5 tw-p-6", t),
      ...e
    }
  )
);
Gs.displayName = "CardHeader";
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
const Hs = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i("p", { ref: n, className: N("pr-twp tw-text-sm tw-text-muted-foreground", t), ...e }));
Hs.displayName = "CardDescription";
const Ys = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i("div", { ref: n, className: N("pr-twp tw-p-6 tw-pt-0", t), ...e })
);
Ys.displayName = "CardContent";
const Dm = S.forwardRef(
  ({ className: t, ...e }, n) => /* @__PURE__ */ i(
    "div",
    {
      ref: n,
      className: N("pr-twp tw-flex tw-items-center tw-p-6 tw-pt-0", t),
      ...e
    }
  )
);
Dm.displayName = "CardFooter";
function Mh({ ...t }) {
  return /* @__PURE__ */ i(
    rc,
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
const Bm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ v(
  dn.Root,
  {
    ref: n,
    className: N(
      "pr-twp tw-relative tw-flex tw-w-full tw-touch-none tw-select-none tw-items-center",
      t
    ),
    ...e,
    children: [
      /* @__PURE__ */ i(dn.Track, { className: "tw-relative tw-h-2 tw-w-full tw-grow tw-overflow-hidden tw-rounded-full tw-bg-secondary", children: /* @__PURE__ */ i(dn.Range, { className: "tw-absolute tw-h-full tw-bg-primary" }) }),
      /* @__PURE__ */ i(dn.Thumb, { className: "tw-block tw-h-5 tw-w-5 tw-rounded-full tw-border-2 tw-border-primary tw-bg-background tw-ring-offset-background tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50" })
    ]
  }
));
Bm.displayName = dn.Root.displayName;
const jm = S.forwardRef(({ className: t, direction: e, ...n }, r) => /* @__PURE__ */ i(
  Qr.Root,
  {
    className: N(
      "tw-peer pr-twp tw-inline-flex tw-h-6 tw-w-11 tw-shrink-0 tw-cursor-pointer tw-items-center tw-rounded-full tw-border-2 tw-border-transparent tw-transition-colors focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 focus-visible:tw-ring-offset-background disabled:tw-cursor-not-allowed disabled:tw-opacity-50 data-[state=checked]:tw-bg-primary data-[state=unchecked]:tw-bg-input",
      t
    ),
    ...n,
    ref: r,
    children: /* @__PURE__ */ i(
      Qr.Thumb,
      {
        className: N(
          "pr-twp tw-pointer-events-none tw-block tw-h-5 tw-w-5 tw-rounded-full tw-bg-background tw-shadow-lg tw-ring-0 tw-transition-transform",
          {
            "data-[state=checked]:tw-translate-x-5 data-[state=unchecked]:tw-translate-x-0": e === "ltr"
          },
          {
            "data-[state=checked]:tw-translate-x-[-20px] data-[state=unchecked]:tw-translate-x-0": e === "rtl"
          }
        )
      }
    )
  }
));
jm.displayName = Qr.Root.displayName;
const Dh = _t.Root, Vm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.List,
  {
    ref: n,
    className: N(
      "tw-inline-flex tw-h-10 tw-items-center tw-justify-center tw-rounded-md tw-bg-muted tw-p-1 tw-text-muted-foreground",
      t
    ),
    ...e
  }
));
Vm.displayName = _t.List.displayName;
const zm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.Trigger,
  {
    ref: n,
    className: N(
      "tw-inline-flex tw-items-center tw-justify-center tw-whitespace-nowrap tw-rounded-sm tw-px-3 tw-py-1.5 tw-text-sm tw-font-medium tw-ring-offset-background tw-transition-all hover:tw-text-foreground focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2 disabled:tw-pointer-events-none disabled:tw-opacity-50 data-[state=active]:tw-bg-background data-[state=active]:tw-text-foreground data-[state=active]:tw-shadow-sm",
      t
    ),
    ...e
  }
));
zm.displayName = _t.Trigger.displayName;
const Lm = S.forwardRef(({ className: t, ...e }, n) => /* @__PURE__ */ i(
  _t.Content,
  {
    ref: n,
    className: N(
      "tw-mt-2 tw-ring-offset-background focus-visible:tw-outline-none focus-visible:tw-ring-2 focus-visible:tw-ring-ring focus-visible:tw-ring-offset-2",
      t
    ),
    ...e
  }
));
Lm.displayName = _t.Content.displayName;
function Bh({
  isInstalling: t,
  handleClick: e,
  buttonText: n,
  className: r,
  ...o
}) {
  return /* @__PURE__ */ i(
    wt,
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
      children: t ? /* @__PURE__ */ i(Ce, { size: 15 }) : /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ i(Cl, { size: 25, className: N("tw-h-4 tw-w-4", { "tw-mr-1": n }) }),
        n
      ] })
    }
  );
}
function jh({
  isEnabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    wt,
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
      children: t ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ i(Ce, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Vh({
  isDisabling: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    wt,
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
      children: t ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ i(Ce, { size: 15, className: "tw-mr-1 tw-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function zh({
  isUpdating: t,
  handleClick: e,
  className: n,
  ...r
}) {
  return /* @__PURE__ */ i(
    wt,
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
      children: t ? /* @__PURE__ */ v(le, { children: [
        /* @__PURE__ */ i(Ce, { size: 15, className: "tw-mr-1 tw-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Lh({
  id: t,
  markdown: e,
  className: n,
  anchorTarget: r
}) {
  const o = Nt(
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
  return /* @__PURE__ */ i("div", { id: t, className: N("pr-twp tw-prose", n), children: /* @__PURE__ */ i(oc, { options: o, children: e }) });
}
const Fm = ur((t, e) => /* @__PURE__ */ v(
  wt,
  {
    ref: e,
    className: "tw-rounded-md tw-border tw-border-dashed tw-border-gray-400 tw-bg-white tw-px-4 tw-py-2 tw-text-black tw-transition tw-duration-300 tw-ease-in-out hover:tw-border-blue-600 hover:tw-bg-white hover:tw-text-blue-600",
    ...t,
    children: [
      /* @__PURE__ */ i(Ol, { size: 16, className: "tw-mr-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ i(
        ze,
        {
          size: 16,
          className: "tw-ml-2 tw-h-4 tw-w-4 tw-text-gray-700 hover:tw-text-blue-600"
        }
      )
    ]
  }
));
var Um = /* @__PURE__ */ ((t) => (t[t.Check = 0] = "Check", t[t.Radio = 1] = "Radio", t))(Um || {});
function Fh({ id: t, groups: e }) {
  return /* @__PURE__ */ i("div", { id: t, children: /* @__PURE__ */ v(xn, { children: [
    /* @__PURE__ */ i(nr, { asChild: !0, children: /* @__PURE__ */ i(Fm, {}) }),
    /* @__PURE__ */ i(Le, { children: e.map((n) => /* @__PURE__ */ v("div", { children: [
      /* @__PURE__ */ i(_n, { children: n.label }),
      /* @__PURE__ */ i(vc, { children: n.items.map((r) => /* @__PURE__ */ i("div", { children: r.itemType === 0 ? /* @__PURE__ */ i(wr, { onClick: r.onClick, children: r.label }) : /* @__PURE__ */ i(Ci, { onClick: r.onClick, value: r.label, children: r.label }) }, r.label)) }),
      /* @__PURE__ */ i(Pn, {})
    ] }, n.label)) })
  ] }) });
}
function Uh({ id: t, message: e }) {
  return /* @__PURE__ */ i("div", { id: t, className: "tw-mb-20 tw-mt-20 tw-flex tw-items-center tw-justify-center", children: /* @__PURE__ */ i("div", { className: "tw-w-3/4 tw-rounded-lg tw-bg-gray-100 tw-p-8 tw-text-center", children: /* @__PURE__ */ i("p", { className: "tw-text-lg tw-text-gray-800", children: e }) }) });
}
function Gh({
  id: t,
  category: e,
  downloads: n,
  languages: r,
  moreInfoUrl: o
}) {
  const a = new Vl("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(n).reduce((l, c) => l + c, 0)), s = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ v(
    "div",
    {
      id: t,
      className: "tw-flex tw-flex-wrap tw-items-start tw-space-x-4 tw-border-b tw-border-t tw-bg-white tw-pb-4 tw-pt-4",
      children: [
        /* @__PURE__ */ v("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: e }) }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ v("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1", children: [
            /* @__PURE__ */ i(Rl, { className: "tw-mr-1 tw-h-4 tw-w-4" }),
            /* @__PURE__ */ i("span", { className: "tw-text-xs tw-font-semibold tw-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ i("span", { className: "tw-text-xs tw-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-mx-2 tw-h-10 tw-border-l tw-border-gray-300" }),
        /* @__PURE__ */ v("div", { className: "tw-flex tw-flex-col tw-items-center", children: [
          /* @__PURE__ */ i("div", { className: "tw-flex tw-items-center", children: r.slice(0, 3).map((l) => /* @__PURE__ */ i(
            "span",
            {
              className: "tw-ml-1 tw-rounded-md tw-bg-gray-100 tw-px-2 tw-py-1 tw-text-xs tw-font-semibold tw-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          r.length > 3 && /* @__PURE__ */ v(
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
        /* @__PURE__ */ v("div", { className: "tw-ml-auto tw-flex tw-flex-col tw-space-y-2", children: [
          /* @__PURE__ */ v(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Website",
                /* @__PURE__ */ i(_l, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ v(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "tw-flex tw-items-center tw-text-xs tw-font-semibold tw-text-gray-500 tw-underline",
              children: [
                "Support",
                /* @__PURE__ */ i(Pl, { className: "tw-ml-1 tw-inline tw-h-4 tw-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Gm({ id: t, versionHistory: e }) {
  const [n, r] = st(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), d = new Date(o.getTime() - c.getTime()), u = d.getUTCFullYear() - 1970, f = d.getUTCMonth(), w = d.getUTCDate() - 1;
    let g = "";
    return u > 0 ? g = `${u.toString()} year${u === 1 ? "" : "s"} ago` : f > 0 ? g = `${f.toString()} month${f === 1 ? "" : "s"} ago` : w === 0 ? g = "today" : g = `${w.toString()} day${w === 1 ? "" : "s"} ago`, g;
  }
  const s = Object.entries(e).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ v("div", { id: t, children: [
    /* @__PURE__ */ i("h3", { className: "tw-text-md tw-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ i("ul", { className: "tw-list-disc tw-pl-5 tw-pr-4 tw-text-xs tw-text-gray-600", children: (n ? s : s.slice(0, 5)).map((l) => /* @__PURE__ */ v("div", { className: "tw-mt-3 tw-flex tw-justify-between", children: [
      /* @__PURE__ */ i("div", { className: "tw-text-gray-600", children: /* @__PURE__ */ i("li", { className: "tw-prose tw-text-xs", children: /* @__PURE__ */ i("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ v("div", { className: "tw-justify-end tw-text-right", children: [
        /* @__PURE__ */ v("div", { children: [
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
function Xh({
  id: t,
  publisherDisplayName: e,
  fileSize: n,
  locales: r,
  versionHistory: o
}) {
  const a = Nt(() => zl(n), [n]), l = ((c) => {
    const d = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((u) => d.of(u));
  })(r);
  return /* @__PURE__ */ i("div", { id: t, className: "tw-border-t tw-pb-4 tw-pt-4", children: /* @__PURE__ */ v("div", { className: "tw-md:flex-row tw-md:space-x-8 tw-flex tw-flex-col tw-space-x-0", children: [
    /* @__PURE__ */ i(Gm, { versionHistory: o }),
    /* @__PURE__ */ i("div", { className: "tw-md:border-t-0 tw-md:border-l tw-md-h-auto tw-md-ml-8 tw-mt-4 tw-border-t tw-border-gray-300" }),
    /* @__PURE__ */ v("div", { className: "tw-md:mt-0 tw-mt-4 tw-flex-1 tw-space-y-3", children: [
      /* @__PURE__ */ i("h2", { className: "tw-text-md tw-font-semibold", children: "Information" }),
      /* @__PURE__ */ v("div", { className: "tw-flex tw-items-start tw-justify-between tw-pr-4 tw-text-xs tw-text-gray-600", children: [
        /* @__PURE__ */ v("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Publisher" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: e }),
          /* @__PURE__ */ i("span", { className: "tw-mb-2 tw-mt-4", children: "Size" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ i("div", { className: "tw-flex tw-w-3/4 tw-items-center tw-justify-between tw-text-xs tw-text-gray-600", children: /* @__PURE__ */ v("p", { className: "tw-flex tw-flex-col tw-justify-start", children: [
          /* @__PURE__ */ i("span", { className: "tw-mb-2", children: "Languages" }),
          /* @__PURE__ */ i("span", { className: "tw-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const Hh = [
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
], Xm = (t, e) => {
  const n = Array.from(
    new Set(t.map((o) => o.bestLanguageName))
  ), r = new Set(
    e.concat(
      t.filter((o) => o.installed).map((o) => o.bestLanguageName)
    )
  );
  return n.sort((o, a) => {
    const s = r.has(o), l = r.has(a);
    return s && l ? o.localeCompare(a) : s ? -1 : l ? 1 : o.localeCompare(a);
  });
}, li = (t, e, n) => /* @__PURE__ */ i(wt, { variant: "outline", onClick: () => n(t.dblEntryUid, "install"), children: e }), Hm = (t, e, n, r, o, a) => e.includes(t.dblEntryUid) ? /* @__PURE__ */ i(wt, { variant: "outline", children: /* @__PURE__ */ i(Ce, { className: "tw-h-5 tw-py-[1px]" }) }) : t.installed ? t.updateAvailable ? li(t, r, a) : /* @__PURE__ */ i(Mt, { className: "tw-my-2 tw-flex tw-h-6 tw-items-center", children: o }) : li(t, n, a);
function Yh({
  localizedStrings: t,
  dblResources: e,
  isLoadingDblResources: n,
  typeFilter: r,
  setTypeFilter: o,
  languageFilter: a,
  setLanguageFilter: s,
  openResource: l,
  installResource: c,
  uninstallResource: d
}) {
  const u = t["%resources_action%"], f = t["%resources_dialog_subtitle%"], w = t["%resources_dialog_title%"], g = t["%resources_filterInput%"], y = t["%resources_fullName%"], m = t["%resources_get%"], h = t["%resources_installed%"], x = t["%resources_language%"], $ = t["%resources_languageFilter%"], _ = t["%resources_loadingResources%"], T = t["%resources_noResults%"], b = t["%resources_open%"], I = t["%resources_remove%"], F = t["%resources_size%"], J = t["%resources_type%"], O = t["%resources_type_DBL%"], A = t["%resources_type_ER%"], D = t["%resources_type_SLR%"], P = t["%resources_type_XR%"], B = t["%resources_type_unknown%"], q = t["%resources_update%"], [H, z] = st([]), tt = (R, X) => {
    if (!c || !d)
      return;
    const C = {
      dblEntryUid: R,
      action: X === "install" ? "installing" : "removing"
    };
    z((V) => [...V, C]), (X === "install" ? c : d)(R).catch((V) => {
      console.debug(Ll(V));
    });
  };
  Kt(() => {
    z(
      (R) => R.filter((X) => {
        const C = e.find((ft) => ft.dblEntryUid === X.dblEntryUid);
        return C ? !(X.action === "installing" && C.installed || X.action === "removing" && !C.installed) : !0;
      })
    );
  }, [e]);
  const [rt, at] = st(""), k = Nt(() => e.filter((R) => {
    const X = rt.toLowerCase();
    return R.displayName.toLowerCase().includes(X) || R.fullName.toLowerCase().includes(X) || R.bestLanguageName.toLowerCase().includes(X);
  }), [e, rt]), E = Nt(() => [
    { type: "DBLResource", localizedValue: O },
    { type: "EnhancedResource", localizedValue: A },
    { type: "SourceLanguageResource", localizedValue: D },
    { type: "XmlResource", localizedValue: P }
  ], [O, A, D, P]), U = (R) => {
    const X = [...r];
    let C = [];
    !X || X.length === 0 ? C = [R] : C = X.includes(R) ? X.filter((ft) => ft !== R) : [...X, R], o(C);
  }, Y = Nt(() => k.filter((R) => r.includes(R.type)), [k, r]);
  Kt(() => {
    a.length === 0 && s(
      e.filter((R) => R.installed === !0).map((R) => R.bestLanguageName)
    );
  }, [e, a.length, s]);
  const G = (R) => {
    const X = [...a];
    let C = [];
    !X || X.length === 0 ? C = [R] : C = X.includes(R) ? X.filter((ft) => ft !== R) : [...X, R], s(C);
  }, W = Nt(() => Y.filter((R) => a.includes(R.bestLanguageName)), [a, Y]), [L, Z] = st({
    key: "bestLanguageName",
    direction: "ascending"
  }), K = Nt(() => [...W].sort((R, X) => {
    const C = R[L.key], ft = X[L.key];
    return C < ft ? L.direction === "ascending" ? -1 : 1 : C > ft ? L.direction === "ascending" ? 1 : -1 : 0;
  }), [L.direction, L.key, W]), Q = (R) => {
    const X = { key: R, direction: "ascending" };
    L.key === R && L.direction === "ascending" && (X.direction = "descending"), Z(X);
  };
  return /* @__PURE__ */ v(Us, { className: "tw-rounded-none tw-border-0", children: [
    /* @__PURE__ */ i(Gs, { children: /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center", children: [
      /* @__PURE__ */ i(ua, { size: 36, className: "tw-mr-2" }),
      /* @__PURE__ */ v("div", { children: [
        /* @__PURE__ */ i(Xs, { children: w }),
        /* @__PURE__ */ i(Hs, { className: "tw-mt-1", children: f })
      ] })
    ] }) }),
    /* @__PURE__ */ i(Ys, { children: n || !e ? /* @__PURE__ */ v("div", { className: "tw-flex tw-flex-col tw-items-center tw-gap-2", children: [
      /* @__PURE__ */ i(Mt, { children: _ }),
      /* @__PURE__ */ i(Ce, {})
    ] }) : /* @__PURE__ */ v("div", { children: [
      /* @__PURE__ */ v("div", { className: "tw-mb-1 tw-flex tw-gap-1", children: [
        /* @__PURE__ */ v("div", { className: "tw-relative", children: [
          /* @__PURE__ */ i(
            Se,
            {
              type: "text",
              className: "tw-box-border tw-min-w-72 tw-gap-2.5 tw-rounded-lg tw-border tw-border-solid tw-bg-background tw-py-2 tw-pl-4 tw-pr-3 tw-shadow-none tw-outline-none",
              onChange: (R) => at(R.target.value),
              value: rt,
              placeholder: g
            }
          ),
          /* @__PURE__ */ i(mo, { className: "tw-absolute tw-right-3 tw-top-1/2 tw-h-4 tw-w-4 tw--translate-y-1/2 tw-transform tw-text-muted-foreground" })
        ] }),
        /* @__PURE__ */ v(xn, { children: [
          /* @__PURE__ */ i(nr, { asChild: !0, children: /* @__PURE__ */ v(wt, { variant: "outline", children: [
            /* @__PURE__ */ i($l, { className: "tw-mr-2 tw-w-4" }),
            J
          ] }) }),
          /* @__PURE__ */ i(Le, { align: "start", children: E.map((R) => /* @__PURE__ */ i(
            wr,
            {
              checked: r.includes(R.type),
              onClick: (X) => {
                X.preventDefault(), U(R.type);
              },
              children: /* @__PURE__ */ i("span", { children: R.localizedValue })
            }
          )) })
        ] }),
        /* @__PURE__ */ i(
          or,
          {
            className: "tw-w-auto tw-min-w-10 tw-flex-shrink",
            buttonPlaceholder: x,
            textPlaceholder: $,
            value: a[0],
            options: Xm(e, a),
            onChange: G
          }
        )
      ] }),
      K.length === 0 ? /* @__PURE__ */ i("div", { className: "tw-m-4 tw-flex tw-w-full tw-justify-center", children: /* @__PURE__ */ i(Mt, { children: T }) }) : /* @__PURE__ */ v($n, { stickyHeader: !0, children: [
        /* @__PURE__ */ i(In, { className: "tw-bg-none", stickyHeader: !0, children: /* @__PURE__ */ v(Wt, { children: [
          /* @__PURE__ */ i(jt, {}),
          /* @__PURE__ */ i(jt, {}),
          /* @__PURE__ */ i(jt, { onClick: () => Q("fullName"), children: /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center", children: [
            y,
            L.key !== "fullName" && /* @__PURE__ */ i(er, { className: "tw-pl-1", size: 16 }),
            L.key === "fullName" && (L.direction === "ascending" ? /* @__PURE__ */ i(Kr, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ i(ze, { className: "tw-pl-1", size: 16 }))
          ] }) }),
          /* @__PURE__ */ i(jt, { onClick: () => Q("bestLanguageName"), children: /* @__PURE__ */ v("div", { className: "tw-flex tw-items-center", children: [
            x,
            L.key !== "bestLanguageName" && /* @__PURE__ */ i(er, { className: "tw-pl-1", size: 16 }),
            L.key === "bestLanguageName" && (L.direction === "ascending" ? /* @__PURE__ */ i(Kr, { className: "tw-pl-1", size: 16 }) : /* @__PURE__ */ i(ze, { className: "tw-pl-1", size: 16 }))
          ] }) }),
          /* @__PURE__ */ i(jt, { children: J }),
          /* @__PURE__ */ i(jt, { children: F }),
          /* @__PURE__ */ i(jt, { children: u })
        ] }) }),
        /* @__PURE__ */ i(An, { children: K.map((R) => {
          var X;
          return /* @__PURE__ */ v(Wt, { children: [
            /* @__PURE__ */ i(It, { children: /* @__PURE__ */ i(ua, { className: "tw-pr-0", size: 18 }) }),
            /* @__PURE__ */ i(It, { children: R.displayName }),
            /* @__PURE__ */ i(It, { className: "tw-font-medium", children: R.fullName }),
            /* @__PURE__ */ i(It, { children: R.bestLanguageName }),
            /* @__PURE__ */ i(It, { children: ((X = E.find((C) => C.type === R.type)) == null ? void 0 : X.localizedValue) ?? B }),
            /* @__PURE__ */ i(It, { children: R.size }),
            /* @__PURE__ */ i(It, { children: /* @__PURE__ */ v("div", { className: "tw-flex tw-justify-between", children: [
              Hm(
                R,
                H.map((C) => C.dblEntryUid),
                m,
                q,
                h,
                tt
              ),
              R.installed && /* @__PURE__ */ v(xn, { children: [
                /* @__PURE__ */ i(nr, { asChild: !0, children: /* @__PURE__ */ i(wt, { variant: "ghost", children: /* @__PURE__ */ i(Il, { className: "tw-w-4" }) }) }),
                /* @__PURE__ */ v(Le, { align: "start", children: [
                  /* @__PURE__ */ i(rr, { onClick: () => l(R.projectId), children: /* @__PURE__ */ i("span", { children: b }) }),
                  /* @__PURE__ */ i(Pn, {}),
                  /* @__PURE__ */ i(
                    rr,
                    {
                      onClick: () => tt(R.dblEntryUid, "remove"),
                      children: /* @__PURE__ */ i("span", { children: I })
                    }
                  )
                ] })
              ] })
            ] }) })
          ] }, R.displayName + R.fullName);
        }) })
      ] })
    ] }) })
  ] });
}
const Wh = (t, e) => {
  Kt(() => {
    if (!t)
      return () => {
      };
    const n = t(e);
    return () => {
      n();
    };
  }, [t, e]);
}, qr = () => !1, qh = (t, e) => {
  const [n] = fo(
    Et(async () => {
      if (!t)
        return qr;
      const r = await Promise.resolve(t(e));
      return async () => r();
    }, [e, t]),
    qr,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Kt(() => () => {
    n !== qr && n();
  }, [n]);
};
function Ym(t, e = "top") {
  if (!t || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(t)), e === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
Ym(`*, ::before, ::after {
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
.tw-left-0 {
  left: 0px;
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
.tw-right-1 {
  right: 0.25rem;
}
.tw-right-3 {
  right: 0.75rem;
}
.tw-right-4 {
  right: 1rem;
}
.tw-right-auto {
  right: auto;
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
.tw-ms-1 {
  margin-inline-start: 0.25rem;
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
.tw-h-auto {
  height: auto;
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
.tw-min-w-0 {
  min-width: 0px;
}
.tw-min-w-10 {
  min-width: 2.5rem;
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
.tw-max-w-4xl {
  max-width: 56rem;
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
.tw--translate-x-px {
  --tw-translate-x: -1px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw--translate-y-1\\/2 {
  --tw-translate-y: -50%;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.tw-translate-x-0 {
  --tw-translate-x: 0px;
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
.tw-gap-x-2 {
  column-gap: 0.5rem;
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
.tw-border-e-0 {
  border-inline-end-width: 0px;
}
.tw-border-l {
  border-left-width: 1px;
}
.tw-border-s-2 {
  border-inline-start-width: 2px;
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
.tw-border-s-indigo-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(199 210 254 / var(--tw-border-opacity));
}
.tw-border-s-purple-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(233 213 255 / var(--tw-border-opacity));
}
.tw-border-s-red-200 {
  --tw-border-opacity: 1;
  border-inline-start-color: rgb(254 202 202 / var(--tw-border-opacity));
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
.tw-ps-2 {
  padding-inline-start: 0.5rem;
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
.tw-fade-in {
  --tw-enter-opacity: 0;
}
.tw-fade-in-0 {
  --tw-enter-opacity: 0;
}
.tw-zoom-in-95 {
  --tw-enter-scale: .95;
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
.tw-ease-linear {
  animation-timing-function: linear;
}
.tw-direction-reverse {
  animation-direction: reverse;
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

.hover\\:tw-bg-sidebar-accent:hover {
  background-color: hsl(var(--sidebar-accent));
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

.hover\\:tw-text-gray-900:hover {
  --tw-text-opacity: 1;
  color: rgb(17 24 39 / var(--tw-text-opacity));
}

.hover\\:tw-text-muted-foreground:hover {
  color: hsl(var(--muted-foreground));
}

.hover\\:tw-text-primary:hover {
  color: hsl(var(--primary));
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

.data-\\[state\\=checked\\]\\:tw-translate-x-\\[-20px\\][data-state="checked"] {
  --tw-translate-x: -20px;
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
  $m as Alert,
  Am as AlertDescription,
  Im as AlertTitle,
  mh as BOOK_SELECTOR_STRING_KEYS,
  Ah as Badge,
  fh as BookChapterControl,
  Fc as BookSelectionMode,
  hh as BookSelector,
  wt as Button,
  Us as Card,
  Ys as CardContent,
  Hs as CardDescription,
  Dm as CardFooter,
  Gs as CardHeader,
  Xs as CardTitle,
  Lc as ChapterRangeSelector,
  So as Checkbox,
  _h as Checklist,
  or as ComboBox,
  Kc as DataTable,
  Vh as DisableButton,
  xn as DropdownMenu,
  wr as DropdownMenuCheckboxItem,
  Le as DropdownMenuContent,
  vc as DropdownMenuGroup,
  rr as DropdownMenuItem,
  Um as DropdownMenuItemType,
  _n as DropdownMenuLabel,
  uh as DropdownMenuPortal,
  wh as DropdownMenuRadioGroup,
  Ci as DropdownMenuRadioItem,
  Pn as DropdownMenuSeparator,
  Nc as DropdownMenuShortcut,
  ph as DropdownMenuSub,
  xc as DropdownMenuSubContent,
  yc as DropdownMenuSubTrigger,
  nr as DropdownMenuTrigger,
  jh as EnableButton,
  Hh as FILTERABLE_RESOURCE_LIST_STRING_KEYS,
  Fm as FilterButton,
  Fh as FilterDropdown,
  Yh as FilterableResourceList,
  Xh as Footer,
  Cm as GridMenu,
  _m as HamburgerMenuButton,
  yh as INVENTORY_STRING_KEYS,
  Ph as IconButton,
  Se as Input,
  Bh as InstallButton,
  xh as Inventory,
  Mt as Label,
  Lh as MarkdownRenderer,
  zs as MenuItem,
  Gh as MoreInfo,
  Nh as MultiSelectComboBox,
  kh as NavigationContentSearch,
  Uh as NoExtensionsFound,
  Oi as RadioGroup,
  to as RadioGroupItem,
  Th as ScriptureResultsViewer,
  Sh as ScrollGroupSelector,
  ji as SearchBar,
  Nn as Select,
  Ue as SelectContent,
  Gc as SelectGroup,
  Ht as SelectItem,
  Xc as SelectLabel,
  Ai as SelectScrollDownButton,
  Ii as SelectScrollUpButton,
  Hc as SelectSeparator,
  Fe as SelectTrigger,
  kn as SelectValue,
  Co as Separator,
  Ch as SettingsList,
  Rh as SettingsListHeader,
  Oh as SettingsListItem,
  Td as SettingsSidebar,
  Eh as SettingsSidebarContentSearch,
  Bm as Slider,
  Mh as Sonner,
  Ce as Spinner,
  jm as Switch,
  $n as Table,
  An as TableBody,
  qc as TableCaption,
  It as TableCell,
  Wc as TableFooter,
  jt as TableHead,
  In as TableHeader,
  Wt as TableRow,
  Dh as Tabs,
  Lm as TabsContent,
  Vm as TabsList,
  zm as TabsTrigger,
  $h as TextField,
  Bi as ToggleGroup,
  Jn as ToggleGroupItem,
  Ih as Toolbar,
  zh as UpdateButton,
  Gm as VersionHistory,
  Vi as VerticalTabs,
  Li as VerticalTabsContent,
  zi as VerticalTabsList,
  ad as VerticalTabsTrigger,
  Mm as badgeVariants,
  Ic as buttonVariants,
  N as cn,
  Qc as getBookNumFromId,
  Zc as getLinesFromUSFM,
  ma as getNumberFromUSFM,
  td as getStatusForItem,
  bh as inventoryCountColumn,
  gh as inventoryItemColumn,
  vh as inventoryStatusColumn,
  Zh as sonner,
  Wh as useEvent,
  qh as useEventAsync,
  fo as usePromise
};
//# sourceMappingURL=index.js.map
