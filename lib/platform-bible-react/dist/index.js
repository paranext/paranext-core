import dc, { jsx as m, jsxs as A, Fragment as kt } from "react/jsx-runtime";
import * as T from "react";
import W, { forwardRef as Ai, useCallback as Oe, useState as ae, useRef as It, useEffect as Fe, useLayoutEffect as wa, useMemo as En } from "react";
import { History as uc, ChevronRight as fc, Check as _o, Circle as mc, ArrowDownWideNarrow as hc, Clock as gc, Bookmark as bc, FilterIcon as vc, ChevronDown as ji, ChevronUp as yc, ArrowLeftIcon as wc, ChevronLeftIcon as xc, ChevronRightIcon as Ec, ArrowRightIcon as kc, X as Tc, Search as Nc, ChevronsUpDown as Oc, CircleCheckIcon as xa, CircleXIcon as Ea, CircleHelpIcon as ka, ArrowUpIcon as Cc, ArrowDownIcon as Sc, ArrowUpDownIcon as Rc, LoaderCircle as kn, Download as Pc } from "lucide-react";
import Ce, { clsx as $c } from "clsx";
import { extendTailwindMerge as _c } from "tailwind-merge";
import * as he from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as Mc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as Ic, compareScrRefs as mo, scrRefToBBBCCCVVV as Gn, formatScrRef as qn, split as Dc } from "platform-bible-utils";
import { useReactTable as Bi, getCoreRowModel as Li, getPaginationRowModel as Ac, getSortedRowModel as Vi, getFilteredRowModel as jc, flexRender as kr, getExpandedRowModel as Bc, getGroupedRowModel as Lc } from "@tanstack/react-table";
import { Slot as Vc } from "@radix-ui/react-slot";
import { cva as Mo } from "class-variance-authority";
import * as we from "@radix-ui/react-select";
import { FormControlLabel as Ta, FormLabel as Fc, Checkbox as zc, MenuItem as Uc, ListItemText as Hc, ListItemIcon as Fi, Menu as Wc, Grid as zi, List as Gc, IconButton as Ui, Drawer as qc, Slider as Xc, Snackbar as Yc, Switch as Kc, AppBar as Jc, Toolbar as Zc } from "@mui/material";
import * as Rr from "@radix-ui/react-popover";
import { Command as De } from "cmdk";
import * as nt from "@radix-ui/react-dialog";
import Hi, { ThemeContext as Qc } from "@mui/styled-engine";
import * as ep from "react-dom";
import Jr from "react-dom";
import * as Ae from "@radix-ui/react-tabs";
import * as Wi from "@radix-ui/react-separator";
import * as Gi from "@radix-ui/react-label";
import * as yr from "@radix-ui/react-slider";
import * as ho from "@radix-ui/react-switch";
const tp = _c({ prefix: "pr-" });
function V(...e) {
  return tp($c(e));
}
const Br = W.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ m(
    "input",
    {
      type: t,
      className: V(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
Br.displayName = "Input";
const rp = Ai(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ A("div", { className: "pr-relative", children: [
    /* @__PURE__ */ m(
      Br,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && n(), t(i);
        },
        onClick: r,
        ref: a
      }
    ),
    /* @__PURE__ */ m(
      uc,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var np = Object.defineProperty, op = (e, t, r) => t in e ? np(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => op(e, typeof t != "symbol" ? t + "" : t, r);
const At = [
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
], Io = [
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
], qi = [
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
], Na = mp();
function nr(e, t = !0) {
  return t && (e = e.toUpperCase()), e in Na ? Na[e] : 0;
}
function Do(e) {
  return nr(e) > 0;
}
function ap(e) {
  const t = typeof e == "string" ? nr(e) : e;
  return t >= 40 && t <= 66;
}
function ip(e) {
  return (typeof e == "string" ? nr(e) : e) <= 39;
}
function Xi(e) {
  return e <= 66;
}
function sp(e) {
  const t = typeof e == "string" ? nr(e) : e;
  return Ji(t) && !Xi(t);
}
function* lp() {
  for (let e = 1; e <= At.length; e++)
    yield e;
}
const cp = 1, Yi = At.length;
function pp() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Ao(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= At.length ? t : At[r];
}
function Ki(e) {
  return e <= 0 || e > Yi ? "******" : qi[e - 1];
}
function dp(e) {
  return Ki(nr(e));
}
function Ji(e) {
  const t = typeof e == "number" ? Ao(e) : e;
  return Do(t) && !Io.includes(t);
}
function up(e) {
  const t = typeof e == "number" ? Ao(e) : e;
  return Do(t) && Io.includes(t);
}
function fp(e) {
  return qi[e - 1].includes("*obsolete*");
}
function mp() {
  const e = {};
  for (let t = 0; t < At.length; t++)
    e[At[t]] = t + 1;
  return e;
}
const fe = {
  allBookIds: At,
  nonCanonicalIds: Io,
  bookIdToNumber: nr,
  isBookIdValid: Do,
  isBookNT: ap,
  isBookOT: ip,
  isBookOTNT: Xi,
  isBookDC: sp,
  allBookNumbers: lp,
  firstBook: cp,
  lastBook: Yi,
  extraBooks: pp,
  bookNumberToId: Ao,
  bookNumberToEnglishName: Ki,
  bookIdToEnglishName: dp,
  isCanonical: Ji,
  isExtraMaterial: up,
  isObsolete: fp
};
var et = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(et || {});
const Le = class {
  // private versInfo: Versification;
  constructor(t) {
    if (oe(this, "name"), oe(this, "fullPath"), oe(this, "isPresent"), oe(this, "hasVerseSegments"), oe(this, "isCustomized"), oe(this, "baseVersification"), oe(this, "scriptureBooks"), oe(this, "_type"), t == null)
      throw new Error("Argument undefined");
    typeof t == "string" ? (this.name = t, this._type = et[t]) : (this._type = t, this.name = et[t]);
  }
  get type() {
    return this._type;
  }
  equals(t) {
    return !t.type || !this.type ? !1 : t.type === this.type;
  }
};
oe(Le, "Original", new Le(et.Original)), oe(Le, "Septuagint", new Le(et.Septuagint)), oe(Le, "Vulgate", new Le(et.Vulgate)), oe(Le, "English", new Le(et.English)), oe(Le, "RussianProtestant", new Le(et.RussianProtestant)), oe(Le, "RussianOrthodox", new Le(et.RussianOrthodox));
let Rt = Le;
function Oa(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var Zi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Zi || {});
const _e = class le {
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
      if (n instanceof ur)
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
      throw new ur(
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
          this.versification = new Rt(et[i]);
        } catch {
          throw new ur("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new ur("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || fe.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(n[1]))
      throw new ur("Invalid reference : " + t);
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
    const o = [], a = Oa(this._verse, n);
    for (const i of a.map((l) => Oa(l, r))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !t)
          for (let f = c + 1; f < d.verseNum; f++) {
            const v = new le(
              this._bookNum,
              this._chapterNum,
              f,
              this.versification
            );
            this.isExcluded || o.push(v);
          }
        o.push(d);
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
oe(_e, "defaultVersification", Rt.English), oe(_e, "verseRangeSeparator", "-"), oe(_e, "verseSequenceIndicator", ","), oe(_e, "verseRangeSeparators", [_e.verseRangeSeparator]), oe(_e, "verseSequenceIndicators", [_e.verseSequenceIndicator]), oe(_e, "chapterDigitShifter", 1e3), oe(_e, "bookDigitShifter", _e.chapterDigitShifter * _e.chapterDigitShifter), oe(_e, "bcvMaxValue", _e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(_e, "ValidStatusType", Zi);
let ur = class extends Error {
};
const Qi = he.Root, hp = he.Trigger, T0 = he.Group, N0 = he.Portal, O0 = he.Sub, C0 = he.RadioGroup, gp = W.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ A(
  he.SubTrigger,
  {
    ref: o,
    className: V(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ m(fc, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
gp.displayName = he.SubTrigger.displayName;
const bp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  he.SubContent,
  {
    ref: r,
    className: V(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
bp.displayName = he.SubContent.displayName;
const jo = W.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ m(he.Portal, { children: /* @__PURE__ */ m(
  he.Content,
  {
    ref: n,
    sideOffset: t,
    className: V(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
jo.displayName = he.Content.displayName;
const es = W.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ m(
  he.Item,
  {
    ref: n,
    className: V(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...r
  }
));
es.displayName = he.Item.displayName;
const ts = W.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ A(
  he.CheckboxItem,
  {
    ref: o,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(he.ItemIndicator, { children: /* @__PURE__ */ m(_o, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
ts.displayName = he.CheckboxItem.displayName;
const vp = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(
  he.RadioItem,
  {
    ref: n,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(he.ItemIndicator, { children: /* @__PURE__ */ m(mc, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
vp.displayName = he.RadioItem.displayName;
const Tn = W.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ m(
  he.Label,
  {
    ref: n,
    className: V("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
Tn.displayName = he.Label.displayName;
const Bo = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  he.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Bo.displayName = he.Separator.displayName;
function yp({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: V("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
yp.displayName = "DropdownMenuShortcut";
const wp = Ai(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ A(
    es,
    {
      ref: l,
      textValue: e,
      className: V("pr-font-normal pr-text-slate-700", {
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
        /* @__PURE__ */ m(
          "span",
          {
            className: V(
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
        r && /* @__PURE__ */ m("div", { children: i })
      ]
    },
    e
  )
);
function xp({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: r,
  highlightedChapter: n,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), i = Oe(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ m("div", { className: V("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ m(
    "div",
    {
      className: V(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
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
  return /* @__PURE__ */ A(Tn, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ m("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ m(
        hc,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        gc,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        bc,
        {
          onClick: r,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const Tr = fe.allBookIds, kp = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, Ca = ["OT", "NT", "DC"], Tp = 32 + 32 + 32, Np = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Op = (e) => ({
  OT: Tr.filter((r) => fe.isBookOT(r)),
  NT: Tr.filter((r) => fe.isBookNT(r)),
  DC: Tr.filter((r) => fe.isBookDC(r))
})[e], fr = (e) => Ic(fe.bookIdToNumber(e));
function Cp() {
  return Tr.map((t) => fe.bookIdToEnglishName(t));
}
function Sp(e) {
  return Cp().includes(e);
}
function Rp(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Sp(t))
    return Tr.find((n) => fe.bookIdToEnglishName(n) === t);
}
function S0({ scrRef: e, handleSubmit: t }) {
  const [r, n] = ae(""), [o, a] = ae(
    fe.bookNumberToId(e.bookNum)
  ), [i, l] = ae(e.chapterNum ?? 0), [c, d] = ae(
    fe.bookNumberToId(e.bookNum)
  ), [f, v] = ae(!1), [g, p] = ae(f), h = It(void 0), u = It(void 0), b = It(void 0), w = Oe(
    (k) => Op(k).filter((C) => {
      const P = fe.bookIdToEnglishName(C).toLowerCase(), z = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return P.includes(z) || // Match book name
      C.toLowerCase().includes(z);
    }),
    [r]
  ), S = (k) => {
    n(k);
  }, x = It(!1), E = Oe((k) => {
    if (x.current) {
      x.current = !1;
      return;
    }
    v(k);
  }, []), y = Oe(
    (k, C, P, z) => {
      if (l(
        fe.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), C || fr(k) === -1) {
        t({
          bookNum: fe.bookIdToNumber(k),
          chapterNum: P || 1,
          verseNum: z || 1
        }), v(!1), n("");
        return;
      }
      a(o !== k ? k : ""), v(!C);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), O = (k) => {
    k <= 0 || k > fr(o) || y(o, !0, k);
  }, N = Oe(() => {
    Np.forEach((k) => {
      const C = r.match(k);
      if (C) {
        const [P, z = void 0, H = void 0] = C.slice(1), _ = Rp(P);
        (fe.isBookIdValid(P) || _) && y(
          _ ?? P,
          !0,
          z ? parseInt(z, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [y, r]), I = Oe(
    (k) => {
      f ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof u < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      u.current !== null && u.current.focus(), k.preventDefault()) : v(!0);
    },
    [f]
  ), j = (k) => {
    const { key: C } = k;
    C === "ArrowRight" || C === "ArrowLeft" || C === "ArrowDown" || C === "ArrowUp" || C === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: C })), h.current.focus());
  }, B = (k) => {
    const { key: C } = k;
    if (c === o) {
      if (C === "Enter") {
        k.preventDefault(), y(o, !0, i);
        return;
      }
      let P = 0;
      if (C === "ArrowRight")
        if (i < fr(c))
          P = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (C === "ArrowLeft")
        if (i > 1)
          P = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        C === "ArrowDown" ? P = 6 : C === "ArrowUp" && (P = -6);
      i + P <= 0 || i + P > fr(c) ? l(0) : P !== 0 && (l(i + P), k.preventDefault());
    }
  };
  return Fe(() => {
    o === c ? o === fe.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), wa(() => {
    p(f);
  }, [f]), wa(() => {
    const k = setTimeout(() => {
      if (g && u.current && b.current) {
        const P = b.current.offsetTop - Tp;
        u.current.scrollTo({ top: P, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [g]), /* @__PURE__ */ m("div", { className: "pr-flex", children: /* @__PURE__ */ A(Qi, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ m(hp, { asChild: !0, children: /* @__PURE__ */ m(
      rp,
      {
        ref: h,
        value: r,
        handleSearch: S,
        handleKeyDown: I,
        handleOnClick: () => {
          a(fe.bookNumberToId(e.bookNum)), d(fe.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          x.current = !0;
        },
        handleSubmit: N,
        placeholder: `${fe.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ A(
      jo,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: j,
        align: "start",
        ref: u,
        children: [
          /* @__PURE__ */ m(
            Ep,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          Ca.map(
            (k, C) => w(k).length > 0 && /* @__PURE__ */ A("div", { children: [
              /* @__PURE__ */ m(Tn, { className: "pr-font-semibold pr-text-slate-700", children: kp[k] }),
              w(k).map((P) => /* @__PURE__ */ m("div", { children: /* @__PURE__ */ m(
                wp,
                {
                  bookId: P,
                  handleSelectBook: () => y(P, !1),
                  isSelected: o === P,
                  handleHighlightBook: () => d(P),
                  handleKeyDown: B,
                  bookType: k,
                  ref: (z) => {
                    o === P && (b.current = z);
                  },
                  children: /* @__PURE__ */ m(
                    xp,
                    {
                      handleSelectChapter: O,
                      endChapter: fr(P),
                      activeChapter: e.bookNum === fe.bookIdToNumber(P) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (z) => {
                        l(z);
                      }
                    }
                  )
                }
              ) }, P)),
              Ca.length - 1 !== C ? /* @__PURE__ */ m(Bo, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const Pp = Mo(
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
), ye = W.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ m(n ? Vc : "button", { className: V(Pp({ variant: t, size: r, className: e })), ref: a, ...o })
);
ye.displayName = "Button";
function $p({ table: e }) {
  return /* @__PURE__ */ A(Qi, { children: [
    /* @__PURE__ */ m(Mc, { asChild: !0, children: /* @__PURE__ */ A(ye, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ m(vc, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ A(jo, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ m(Tn, { children: "Toggle columns" }),
      /* @__PURE__ */ m(Bo, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ m(
        ts,
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
const pn = we.Root, _p = we.Group, dn = we.Value, Pr = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(
  we.Trigger,
  {
    ref: n,
    className: V(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ m(we.Icon, { asChild: !0, children: /* @__PURE__ */ m(ji, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Pr.displayName = we.Trigger.displayName;
const rs = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  we.ScrollUpButton,
  {
    ref: r,
    className: V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(yc, { className: "pr-h-4 pr-w-4" })
  }
));
rs.displayName = we.ScrollUpButton.displayName;
const ns = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  we.ScrollDownButton,
  {
    ref: r,
    className: V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(ji, { className: "pr-h-4 pr-w-4" })
  }
));
ns.displayName = we.ScrollDownButton.displayName;
const $r = W.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ m(we.Portal, { children: /* @__PURE__ */ A(
  we.Content,
  {
    ref: o,
    className: V(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ m(rs, {}),
      /* @__PURE__ */ m(
        we.Viewport,
        {
          className: V(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ m(ns, {})
    ]
  }
) }));
$r.displayName = we.Content.displayName;
const Mp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  we.Label,
  {
    ref: r,
    className: V("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
Mp.displayName = we.Label.displayName;
const Qe = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(
  we.Item,
  {
    ref: n,
    className: V(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(we.ItemIndicator, { children: /* @__PURE__ */ m(_o, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ m(we.ItemText, { children: t })
    ]
  }
));
Qe.displayName = we.Item.displayName;
const Ip = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  we.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ip.displayName = we.Separator.displayName;
function Dp({ table: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ A("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ m("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ A(
        pn,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ m(Pr, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ m(dn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ m($r, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ m(Qe, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ A("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ A(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ m(wc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ m(xc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ m(Ec, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        ye,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ m(kc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const Nn = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ m(
    "table",
    {
      ref: r,
      className: V("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
Nn.displayName = "Table";
const On = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("thead", { ref: r, className: V("[&_tr]:pr-border-b", e), ...t }));
On.displayName = "TableHeader";
const Cn = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("tbody", { ref: r, className: V("[&_tr:last-child]:pr-border-0", e), ...t }));
Cn.displayName = "TableBody";
const Ap = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "tfoot",
  {
    ref: r,
    className: V("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
Ap.displayName = "TableFooter";
const Et = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "tr",
    {
      ref: r,
      className: V(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
Et.displayName = "TableRow";
const _r = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "th",
  {
    ref: r,
    className: V(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
_r.displayName = "TableHead";
const Jt = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "td",
  {
    ref: r,
    className: V("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Jt.displayName = "TableCell";
const jp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "caption",
  {
    ref: r,
    className: V("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
jp.displayName = "TableCaption";
function Bp({
  columns: e,
  data: t,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: a = () => {
  }
}) {
  var u;
  const [i, l] = ae([]), [c, d] = ae([]), [f, v] = ae({}), [g, p] = ae({}), h = Bi({
    data: t,
    columns: e,
    getCoreRowModel: Li(),
    ...r && { getPaginationRowModel: Ac() },
    onSortingChange: l,
    getSortedRowModel: Vi(),
    onColumnFiltersChange: d,
    getFilteredRowModel: jc(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: p,
    state: {
      sorting: i,
      columnFilters: c,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ A("div", { children: [
    o && /* @__PURE__ */ m($p, { table: h }),
    /* @__PURE__ */ m("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ A(Nn, { children: [
      /* @__PURE__ */ m(On, { children: h.getHeaderGroups().map((b) => /* @__PURE__ */ m(Et, { children: b.headers.map((w) => /* @__PURE__ */ m(_r, { children: w.isPlaceholder ? void 0 : kr(w.column.columnDef.header, w.getContext()) }, w.id)) }, b.id)) }),
      /* @__PURE__ */ m(Cn, { children: (u = h.getRowModel().rows) != null && u.length ? h.getRowModel().rows.map((b) => /* @__PURE__ */ m(
        Et,
        {
          onClick: () => a(b, h),
          "data-state": b.getIsSelected() && "selected",
          children: b.getVisibleCells().map((w) => /* @__PURE__ */ m(Jt, { children: kr(w.column.columnDef.cell, w.getContext()) }, w.id))
        },
        b.id
      )) : /* @__PURE__ */ m(Et, { children: /* @__PURE__ */ m(Jt, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    r && /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ m(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ m(
        ye,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ m(Dp, { table: h })
  ] });
}
const Lp = Rr.Root, Vp = Rr.Trigger, os = W.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ m(Rr.Portal, { children: /* @__PURE__ */ m(
  Rr.Content,
  {
    ref: o,
    align: t,
    sideOffset: r,
    className: V(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
os.displayName = Rr.Content.displayName;
const Fp = nt.Portal, as = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  nt.Overlay,
  {
    ref: r,
    className: V(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
as.displayName = nt.Overlay.displayName;
const zp = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(Fp, { children: [
  /* @__PURE__ */ m(as, {}),
  /* @__PURE__ */ A(
    nt.Content,
    {
      ref: n,
      className: V(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ A(nt.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ m(Tc, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
zp.displayName = nt.Content.displayName;
const Up = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  nt.Title,
  {
    ref: r,
    className: V("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Up.displayName = nt.Title.displayName;
const Hp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  nt.Description,
  {
    ref: r,
    className: V("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Hp.displayName = nt.Description.displayName;
const is = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De,
  {
    ref: r,
    className: V(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
is.displayName = De.displayName;
const ss = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ m(Nc, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ m(
    De.Input,
    {
      ref: r,
      className: V(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
ss.displayName = De.Input.displayName;
const ls = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.List,
  {
    ref: r,
    className: V("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
ls.displayName = De.List.displayName;
const cs = W.forwardRef((e, t) => /* @__PURE__ */ m(De.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
cs.displayName = De.Empty.displayName;
const Wp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Group,
  {
    ref: r,
    className: V(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Wp.displayName = De.Group.displayName;
const Gp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Gp.displayName = De.Separator.displayName;
const ps = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Item,
  {
    ref: r,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
ps.displayName = De.Item.displayName;
function qp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Sa({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = qp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: d = "outline"
}) {
  const [f, v] = ae(!1);
  return /* @__PURE__ */ A(Lp, { open: f, onOpenChange: v, children: [
    /* @__PURE__ */ m(Vp, { asChild: !0, children: /* @__PURE__ */ A(
      ye,
      {
        variant: d,
        role: "combobox",
        "aria-expanded": f,
        id: e,
        className: V("pr-w-[200px] pr-justify-between", r),
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ m(Oc, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ m(os, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ A(is, { children: [
      /* @__PURE__ */ m(ss, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ m(cs, { children: c }),
      /* @__PURE__ */ m(ls, { children: t.map((g) => /* @__PURE__ */ A(
        ps,
        {
          value: a(g),
          onSelect: () => {
            o(g), v(!1);
          },
          children: [
            /* @__PURE__ */ m(
              _o,
              {
                className: V("pr-mr-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !n || a(n) !== a(g)
                })
              }
            ),
            a(g)
          ]
        },
        a(g)
      )) })
    ] }) })
  ] });
}
function R0({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: r = !1,
  chapterCount: n
}) {
  const [o, a] = ae(1), [i, l] = ae(n), [c, d] = ae(
    Array.from({ length: n }, (g, p) => p + 1)
  );
  return Fe(() => {
    a(1), e(1), l(n), t(n), d(Array.from({ length: n }, (g, p) => p + 1));
  }, [n, t, e]), /* @__PURE__ */ A(kt, { children: [
    /* @__PURE__ */ m(
      Ta,
      {
        className: "book-selection-chapter-form-label start",
        disabled: r,
        control: /* @__PURE__ */ m(
          Sa,
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
    /* @__PURE__ */ m(
      Ta,
      {
        className: "book-selection-chapter-form-label end",
        disabled: r,
        control: /* @__PURE__ */ m(
          Sa,
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
var Xt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Xt || {});
function Xp({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = Xt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: d
}) {
  const f = /* @__PURE__ */ m(
    zc,
    {
      id: e,
      checked: t,
      indeterminate: o,
      defaultChecked: a,
      disabled: i,
      className: `papi-checkbox ${l ? "error" : ""} ${c ?? ""}`,
      onChange: d
    }
  );
  let v;
  if (r) {
    const g = n === Xt.Before || n === Xt.Above, p = /* @__PURE__ */ m("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), h = n === Xt.Before || n === Xt.After, u = h ? p : /* @__PURE__ */ m("div", { children: p }), b = h ? f : /* @__PURE__ */ m("div", { children: f });
    v = /* @__PURE__ */ A(
      Fc,
      {
        className: `papi-checkbox ${n.toString()}`,
        disabled: i,
        error: l,
        children: [
          g && u,
          b,
          !g && u
        ]
      }
    );
  } else
    v = f;
  return v;
}
function P0({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ A("fieldset", { id: e, className: t, children: [
    r && /* @__PURE__ */ m("legend", { children: r }),
    n.map((l) => /* @__PURE__ */ m(
      Xp,
      {
        className: "check-item",
        isChecked: o.includes(l),
        labelText: i ? i(l) : l,
        onChange: () => a(l)
      },
      l
    ))
  ] });
}
function Yp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Tt(e) {
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
var Lo = {}, ds = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(ds);
var Vo = ds.exports, Xn = {};
function or(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || t(...n);
  };
}
function $() {
  return $ = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        ({}).hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $.apply(null, arguments);
}
function wt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function us(e) {
  if (!wt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = us(e[r]);
  }), t;
}
function tt(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? $({}, e) : e;
  return wt(e) && wt(t) && Object.keys(t).forEach((o) => {
    wt(t[o]) && // Avoid prototype pollution
    Object.prototype.hasOwnProperty.call(e, o) && wt(e[o]) ? n[o] = tt(e[o], t[o], r) : r.clone ? n[o] = wt(t[o]) ? us(t[o]) : t[o] : n[o] = t[o];
  }), n;
}
const Kp = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: tt,
  isPlainObject: wt
}, Symbol.toStringTag, { value: "Module" }));
var go = { exports: {} }, Zr = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ra;
function Jp() {
  if (Ra)
    return ce;
  Ra = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
  function x(y) {
    if (typeof y == "object" && y !== null) {
      var O = y.$$typeof;
      switch (O) {
        case t:
          switch (y = y.type, y) {
            case c:
            case d:
            case n:
            case a:
            case o:
            case v:
              return y;
            default:
              switch (y = y && y.$$typeof, y) {
                case l:
                case f:
                case h:
                case p:
                case i:
                  return y;
                default:
                  return O;
              }
          }
        case r:
          return O;
      }
    }
  }
  function E(y) {
    return x(y) === d;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = d, ce.ContextConsumer = l, ce.ContextProvider = i, ce.Element = t, ce.ForwardRef = f, ce.Fragment = n, ce.Lazy = h, ce.Memo = p, ce.Portal = r, ce.Profiler = a, ce.StrictMode = o, ce.Suspense = v, ce.isAsyncMode = function(y) {
    return E(y) || x(y) === c;
  }, ce.isConcurrentMode = E, ce.isContextConsumer = function(y) {
    return x(y) === l;
  }, ce.isContextProvider = function(y) {
    return x(y) === i;
  }, ce.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, ce.isForwardRef = function(y) {
    return x(y) === f;
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
    return typeof y == "string" || typeof y == "function" || y === n || y === d || y === a || y === o || y === v || y === g || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === f || y.$$typeof === b || y.$$typeof === w || y.$$typeof === S || y.$$typeof === u);
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
var Pa;
function Zp() {
  return Pa || (Pa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, w = e ? Symbol.for("react.responder") : 60118, S = e ? Symbol.for("react.scope") : 60119;
    function x(L) {
      return typeof L == "string" || typeof L == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      L === n || L === d || L === a || L === o || L === v || L === g || typeof L == "object" && L !== null && (L.$$typeof === h || L.$$typeof === p || L.$$typeof === i || L.$$typeof === l || L.$$typeof === f || L.$$typeof === b || L.$$typeof === w || L.$$typeof === S || L.$$typeof === u);
    }
    function E(L) {
      if (typeof L == "object" && L !== null) {
        var te = L.$$typeof;
        switch (te) {
          case t:
            var D = L.type;
            switch (D) {
              case c:
              case d:
              case n:
              case a:
              case o:
              case v:
                return D;
              default:
                var se = D && D.$$typeof;
                switch (se) {
                  case l:
                  case f:
                  case h:
                  case p:
                  case i:
                    return se;
                  default:
                    return te;
                }
            }
          case r:
            return te;
        }
      }
    }
    var y = c, O = d, N = l, I = i, j = t, B = f, k = n, C = h, P = p, z = r, H = a, _ = o, F = v, q = !1;
    function re(L) {
      return q || (q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), R(L) || E(L) === c;
    }
    function R(L) {
      return E(L) === d;
    }
    function M(L) {
      return E(L) === l;
    }
    function U(L) {
      return E(L) === i;
    }
    function K(L) {
      return typeof L == "object" && L !== null && L.$$typeof === t;
    }
    function G(L) {
      return E(L) === f;
    }
    function X(L) {
      return E(L) === n;
    }
    function J(L) {
      return E(L) === h;
    }
    function Z(L) {
      return E(L) === p;
    }
    function Y(L) {
      return E(L) === r;
    }
    function Q(L) {
      return E(L) === a;
    }
    function ee(L) {
      return E(L) === o;
    }
    function ie(L) {
      return E(L) === v;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = O, pe.ContextConsumer = N, pe.ContextProvider = I, pe.Element = j, pe.ForwardRef = B, pe.Fragment = k, pe.Lazy = C, pe.Memo = P, pe.Portal = z, pe.Profiler = H, pe.StrictMode = _, pe.Suspense = F, pe.isAsyncMode = re, pe.isConcurrentMode = R, pe.isContextConsumer = M, pe.isContextProvider = U, pe.isElement = K, pe.isForwardRef = G, pe.isFragment = X, pe.isLazy = J, pe.isMemo = Z, pe.isPortal = Y, pe.isProfiler = Q, pe.isStrictMode = ee, pe.isSuspense = ie, pe.isValidElementType = x, pe.typeOf = E;
  }()), pe;
}
var $a;
function fs() {
  return $a || ($a = 1, process.env.NODE_ENV === "production" ? Zr.exports = Jp() : Zr.exports = Zp()), Zr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Yn, _a;
function Qp() {
  if (_a)
    return Yn;
  _a = 1;
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
      var c = Object.getOwnPropertyNames(i).map(function(f) {
        return i[f];
      });
      if (c.join("") !== "0123456789")
        return !1;
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        d[f] = f;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Yn = o() ? Object.assign : function(a, i) {
    for (var l, c = n(a), d, f = 1; f < arguments.length; f++) {
      l = Object(arguments[f]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        d = e(l);
        for (var g = 0; g < d.length; g++)
          r.call(l, d[g]) && (c[d[g]] = l[d[g]]);
      }
    }
    return c;
  }, Yn;
}
var Kn, Ma;
function Fo() {
  if (Ma)
    return Kn;
  Ma = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Kn = e, Kn;
}
var Jn, Ia;
function ms() {
  return Ia || (Ia = 1, Jn = Function.call.bind(Object.prototype.hasOwnProperty)), Jn;
}
var Zn, Da;
function ed() {
  if (Da)
    return Zn;
  Da = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Fo(), r = {}, n = ms();
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
      for (var f in a)
        if (n(a, f)) {
          var v;
          try {
            if (typeof a[f] != "function") {
              var g = Error(
                (c || "React class") + ": " + l + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw g.name = "Invariant Violation", g;
            }
            v = a[f](i, f, c, l, null, t);
          } catch (h) {
            v = h;
          }
          if (v && !(v instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + f + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof v + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), v instanceof Error && !(v.message in r)) {
            r[v.message] = !0;
            var p = d ? d() : "";
            e(
              "Failed " + l + " type: " + v.message + (p ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Zn = o, Zn;
}
var Qn, Aa;
function td() {
  if (Aa)
    return Qn;
  Aa = 1;
  var e = fs(), t = Qp(), r = Fo(), n = ms(), o = ed(), a = function() {
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
  return Qn = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(R) {
      var M = R && (d && R[d] || R[f]);
      if (typeof M == "function")
        return M;
    }
    var g = "<<anonymous>>", p = {
      array: w("array"),
      bigint: w("bigint"),
      bool: w("boolean"),
      func: w("function"),
      number: w("number"),
      object: w("object"),
      string: w("string"),
      symbol: w("symbol"),
      any: S(),
      arrayOf: x,
      element: E(),
      elementType: y(),
      instanceOf: O,
      node: B(),
      objectOf: I,
      oneOf: N,
      oneOfType: j,
      shape: C,
      exact: P
    };
    function h(R, M) {
      return R === M ? R !== 0 || 1 / R === 1 / M : R !== R && M !== M;
    }
    function u(R, M) {
      this.message = R, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    u.prototype = Error.prototype;
    function b(R) {
      if (process.env.NODE_ENV !== "production")
        var M = {}, U = 0;
      function K(X, J, Z, Y, Q, ee, ie) {
        if (Y = Y || g, ee = ee || Z, ie !== r) {
          if (c) {
            var L = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw L.name = "Invariant Violation", L;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var te = Y + ":" + Z;
            !M[te] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[te] = !0, U++);
          }
        }
        return J[Z] == null ? X ? J[Z] === null ? new u("The " + Q + " `" + ee + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new u("The " + Q + " `" + ee + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : R(J, Z, Y, Q, ee);
      }
      var G = K.bind(null, !1);
      return G.isRequired = K.bind(null, !0), G;
    }
    function w(R) {
      function M(U, K, G, X, J, Z) {
        var Y = U[K], Q = _(Y);
        if (Q !== R) {
          var ee = F(Y);
          return new u(
            "Invalid " + X + " `" + J + "` of type " + ("`" + ee + "` supplied to `" + G + "`, expected ") + ("`" + R + "`."),
            { expectedType: R }
          );
        }
        return null;
      }
      return b(M);
    }
    function S() {
      return b(i);
    }
    function x(R) {
      function M(U, K, G, X, J) {
        if (typeof R != "function")
          return new u("Property `" + J + "` of component `" + G + "` has invalid PropType notation inside arrayOf.");
        var Z = U[K];
        if (!Array.isArray(Z)) {
          var Y = _(Z);
          return new u("Invalid " + X + " `" + J + "` of type " + ("`" + Y + "` supplied to `" + G + "`, expected an array."));
        }
        for (var Q = 0; Q < Z.length; Q++) {
          var ee = R(Z, Q, G, X, J + "[" + Q + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return b(M);
    }
    function E() {
      function R(M, U, K, G, X) {
        var J = M[U];
        if (!l(J)) {
          var Z = _(J);
          return new u("Invalid " + G + " `" + X + "` of type " + ("`" + Z + "` supplied to `" + K + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(R);
    }
    function y() {
      function R(M, U, K, G, X) {
        var J = M[U];
        if (!e.isValidElementType(J)) {
          var Z = _(J);
          return new u("Invalid " + G + " `" + X + "` of type " + ("`" + Z + "` supplied to `" + K + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(R);
    }
    function O(R) {
      function M(U, K, G, X, J) {
        if (!(U[K] instanceof R)) {
          var Z = R.name || g, Y = re(U[K]);
          return new u("Invalid " + X + " `" + J + "` of type " + ("`" + Y + "` supplied to `" + G + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return b(M);
    }
    function N(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function M(U, K, G, X, J) {
        for (var Z = U[K], Y = 0; Y < R.length; Y++)
          if (h(Z, R[Y]))
            return null;
        var Q = JSON.stringify(R, function(ie, L) {
          var te = F(L);
          return te === "symbol" ? String(L) : L;
        });
        return new u("Invalid " + X + " `" + J + "` of value `" + String(Z) + "` " + ("supplied to `" + G + "`, expected one of " + Q + "."));
      }
      return b(M);
    }
    function I(R) {
      function M(U, K, G, X, J) {
        if (typeof R != "function")
          return new u("Property `" + J + "` of component `" + G + "` has invalid PropType notation inside objectOf.");
        var Z = U[K], Y = _(Z);
        if (Y !== "object")
          return new u("Invalid " + X + " `" + J + "` of type " + ("`" + Y + "` supplied to `" + G + "`, expected an object."));
        for (var Q in Z)
          if (n(Z, Q)) {
            var ee = R(Z, Q, G, X, J + "." + Q, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return b(M);
    }
    function j(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var M = 0; M < R.length; M++) {
        var U = R[M];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + q(U) + " at index " + M + "."
          ), i;
      }
      function K(G, X, J, Z, Y) {
        for (var Q = [], ee = 0; ee < R.length; ee++) {
          var ie = R[ee], L = ie(G, X, J, Z, Y, r);
          if (L == null)
            return null;
          L.data && n(L.data, "expectedType") && Q.push(L.data.expectedType);
        }
        var te = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new u("Invalid " + Z + " `" + Y + "` supplied to " + ("`" + J + "`" + te + "."));
      }
      return b(K);
    }
    function B() {
      function R(M, U, K, G, X) {
        return z(M[U]) ? null : new u("Invalid " + G + " `" + X + "` supplied to " + ("`" + K + "`, expected a ReactNode."));
      }
      return b(R);
    }
    function k(R, M, U, K, G) {
      return new u(
        (R || "React class") + ": " + M + " type `" + U + "." + K + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + G + "`."
      );
    }
    function C(R) {
      function M(U, K, G, X, J) {
        var Z = U[K], Y = _(Z);
        if (Y !== "object")
          return new u("Invalid " + X + " `" + J + "` of type `" + Y + "` " + ("supplied to `" + G + "`, expected `object`."));
        for (var Q in R) {
          var ee = R[Q];
          if (typeof ee != "function")
            return k(G, X, J, Q, F(ee));
          var ie = ee(Z, Q, G, X, J + "." + Q, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return b(M);
    }
    function P(R) {
      function M(U, K, G, X, J) {
        var Z = U[K], Y = _(Z);
        if (Y !== "object")
          return new u("Invalid " + X + " `" + J + "` of type `" + Y + "` " + ("supplied to `" + G + "`, expected `object`."));
        var Q = t({}, U[K], R);
        for (var ee in Q) {
          var ie = R[ee];
          if (n(R, ee) && typeof ie != "function")
            return k(G, X, J, ee, F(ie));
          if (!ie)
            return new u(
              "Invalid " + X + " `" + J + "` key `" + ee + "` supplied to `" + G + "`.\nBad object: " + JSON.stringify(U[K], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(R), null, "  ")
            );
          var L = ie(Z, ee, G, X, J + "." + ee, r);
          if (L)
            return L;
        }
        return null;
      }
      return b(M);
    }
    function z(R) {
      switch (typeof R) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !R;
        case "object":
          if (Array.isArray(R))
            return R.every(z);
          if (R === null || l(R))
            return !0;
          var M = v(R);
          if (M) {
            var U = M.call(R), K;
            if (M !== R.entries) {
              for (; !(K = U.next()).done; )
                if (!z(K.value))
                  return !1;
            } else
              for (; !(K = U.next()).done; ) {
                var G = K.value;
                if (G && !z(G[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function H(R, M) {
      return R === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function _(R) {
      var M = typeof R;
      return Array.isArray(R) ? "array" : R instanceof RegExp ? "object" : H(M, R) ? "symbol" : M;
    }
    function F(R) {
      if (typeof R > "u" || R === null)
        return "" + R;
      var M = _(R);
      if (M === "object") {
        if (R instanceof Date)
          return "date";
        if (R instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function q(R) {
      var M = F(R);
      switch (M) {
        case "array":
        case "object":
          return "an " + M;
        case "boolean":
        case "date":
        case "regexp":
          return "a " + M;
        default:
          return M;
      }
    }
    function re(R) {
      return !R.constructor || !R.constructor.name ? g : R.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Qn;
}
var eo, ja;
function rd() {
  if (ja)
    return eo;
  ja = 1;
  var e = Fo();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, eo = function() {
    function n(i, l, c, d, f, v) {
      if (v !== e) {
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
  }, eo;
}
if (process.env.NODE_ENV !== "production") {
  var nd = fs(), od = !0;
  go.exports = td()(nd.isElement, od);
} else
  go.exports = rd()();
var ad = go.exports;
const s = /* @__PURE__ */ Yp(ad);
function id(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function hs(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !id(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const gs = or(s.element, hs);
gs.isRequired = or(s.element.isRequired, hs);
const Lr = gs;
function sd(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function ld(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !sd(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const cd = or(s.elementType, ld), pd = "exact-prop: ​";
function bs(e) {
  return process.env.NODE_ENV === "production" ? e : $({}, e, {
    [pd]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Mr(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
const dd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Mr
}, Symbol.toStringTag, { value: "Module" }));
var bo = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ba;
function ud() {
  if (Ba)
    return de;
  Ba = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function u(b) {
    if (typeof b == "object" && b !== null) {
      var w = b.$$typeof;
      switch (w) {
        case e:
          switch (b = b.type, b) {
            case r:
            case o:
            case n:
            case d:
            case f:
              return b;
            default:
              switch (b = b && b.$$typeof, b) {
                case l:
                case i:
                case c:
                case g:
                case v:
                case a:
                  return b;
                default:
                  return w;
              }
          }
        case t:
          return w;
      }
    }
  }
  return de.ContextConsumer = i, de.ContextProvider = a, de.Element = e, de.ForwardRef = c, de.Fragment = r, de.Lazy = g, de.Memo = v, de.Portal = t, de.Profiler = o, de.StrictMode = n, de.Suspense = d, de.SuspenseList = f, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(b) {
    return u(b) === i;
  }, de.isContextProvider = function(b) {
    return u(b) === a;
  }, de.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, de.isForwardRef = function(b) {
    return u(b) === c;
  }, de.isFragment = function(b) {
    return u(b) === r;
  }, de.isLazy = function(b) {
    return u(b) === g;
  }, de.isMemo = function(b) {
    return u(b) === v;
  }, de.isPortal = function(b) {
    return u(b) === t;
  }, de.isProfiler = function(b) {
    return u(b) === o;
  }, de.isStrictMode = function(b) {
    return u(b) === n;
  }, de.isSuspense = function(b) {
    return u(b) === d;
  }, de.isSuspenseList = function(b) {
    return u(b) === f;
  }, de.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === o || b === n || b === d || b === f || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === a || b.$$typeof === i || b.$$typeof === c || b.$$typeof === h || b.getModuleId !== void 0);
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
var La;
function fd() {
  return La || (La = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, u = !1, b = !1, w = !1, S = !1, x;
    x = Symbol.for("react.module.reference");
    function E(D) {
      return !!(typeof D == "string" || typeof D == "function" || D === r || D === o || S || D === n || D === d || D === f || w || D === p || h || u || b || typeof D == "object" && D !== null && (D.$$typeof === g || D.$$typeof === v || D.$$typeof === a || D.$$typeof === i || D.$$typeof === c || // This needs to include all possible module reference object
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
              case d:
              case f:
                return Te;
              default:
                var Pe = Te && Te.$$typeof;
                switch (Pe) {
                  case l:
                  case i:
                  case c:
                  case g:
                  case v:
                  case a:
                    return Pe;
                  default:
                    return se;
                }
            }
          case t:
            return se;
        }
      }
    }
    var O = i, N = a, I = e, j = c, B = r, k = g, C = v, P = t, z = o, H = n, _ = d, F = f, q = !1, re = !1;
    function R(D) {
      return q || (q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function M(D) {
      return re || (re = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(D) {
      return y(D) === i;
    }
    function K(D) {
      return y(D) === a;
    }
    function G(D) {
      return typeof D == "object" && D !== null && D.$$typeof === e;
    }
    function X(D) {
      return y(D) === c;
    }
    function J(D) {
      return y(D) === r;
    }
    function Z(D) {
      return y(D) === g;
    }
    function Y(D) {
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
    function L(D) {
      return y(D) === d;
    }
    function te(D) {
      return y(D) === f;
    }
    ue.ContextConsumer = O, ue.ContextProvider = N, ue.Element = I, ue.ForwardRef = j, ue.Fragment = B, ue.Lazy = k, ue.Memo = C, ue.Portal = P, ue.Profiler = z, ue.StrictMode = H, ue.Suspense = _, ue.SuspenseList = F, ue.isAsyncMode = R, ue.isConcurrentMode = M, ue.isContextConsumer = U, ue.isContextProvider = K, ue.isElement = G, ue.isForwardRef = X, ue.isFragment = J, ue.isLazy = Z, ue.isMemo = Y, ue.isPortal = Q, ue.isProfiler = ee, ue.isStrictMode = ie, ue.isSuspense = L, ue.isSuspenseList = te, ue.isValidElementType = E, ue.typeOf = y;
  }()), ue;
}
process.env.NODE_ENV === "production" ? bo.exports = ud() : bo.exports = fd();
var un = bo.exports;
const md = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function vs(e) {
  const t = `${e}`.match(md);
  return t && t[1] || "";
}
function ys(e, t = "") {
  return e.displayName || e.name || vs(e) || t;
}
function Va(e, t, r) {
  const n = ys(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function hd(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ys(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case un.ForwardRef:
          return Va(e, e.render, "ForwardRef");
        case un.Memo:
          return Va(e, e.type, "memo");
        default:
          return;
      }
  }
}
const gd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: hd,
  getFunctionName: vs
}, Symbol.toStringTag, { value: "Module" }));
function pt(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const bd = s.oneOfType([s.func, s.object]), zo = bd;
function ot(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Mr(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
const vd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: ot
}, Symbol.toStringTag, { value: "Module" }));
function vo(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function ws(e, t = 166) {
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
function yd(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function wd(e, t) {
  var r, n;
  return /* @__PURE__ */ T.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (r = e.type.muiName) != null ? r : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function Se(e) {
  return e && e.ownerDocument || document;
}
function Zt(e) {
  return Se(e).defaultView || window;
}
function xd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? $({}, t.propTypes) : null;
  return (o) => (a, i, l, c, d, ...f) => {
    const v = d || i, g = r == null ? void 0 : r[v];
    if (g) {
      const p = g(a, i, l, c, d, ...f);
      if (p)
        return p;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function fn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Ed = typeof window < "u" ? T.useLayoutEffect : T.useEffect, jt = Ed;
let Fa = 0;
function kd(e) {
  const [t, r] = T.useState(e), n = e || t;
  return T.useEffect(() => {
    t == null && (Fa += 1, r(`mui-${Fa}`));
  }, [t]), n;
}
const za = T["useId".toString()];
function xs(e) {
  if (za !== void 0) {
    const t = za();
    return e ?? t;
  }
  return kd(e);
}
function Td(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function Es({
  controlled: e,
  default: t,
  name: r,
  state: n = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [a, i] = T.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    T.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${n} state of ${r} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${r} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [n, r, e]);
    const {
      current: d
    } = T.useRef(t);
    T.useEffect(() => {
      !o && !Object.is(d, t) && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((d) => {
    o || i(d);
  }, []);
  return [l, c];
}
function Ir(e) {
  const t = T.useRef(e);
  return jt(() => {
    t.current = e;
  }), T.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function qe(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      fn(r, t);
    });
  }, e);
}
const Ua = {};
function Nd(e, t) {
  const r = T.useRef(Ua);
  return r.current === Ua && (r.current = e(t)), r;
}
const Od = [];
function Cd(e) {
  T.useEffect(e, Od);
}
class Vr {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Vr();
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
function wr() {
  const e = Nd(Vr.create).current;
  return Cd(e.disposeEffect), e;
}
let Sn = !0, yo = !1;
const Sd = new Vr(), Rd = {
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
    tagName: r
  } = e;
  return !!(r === "INPUT" && Rd[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function $d(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Sn = !0);
}
function to() {
  Sn = !1;
}
function _d() {
  this.visibilityState === "hidden" && yo && (Sn = !0);
}
function Md(e) {
  e.addEventListener("keydown", $d, !0), e.addEventListener("mousedown", to, !0), e.addEventListener("pointerdown", to, !0), e.addEventListener("touchstart", to, !0), e.addEventListener("visibilitychange", _d, !0);
}
function Id(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Sn || Pd(t);
}
function ks() {
  const e = T.useCallback((o) => {
    o != null && Md(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function r() {
    return t.current ? (yo = !0, Sd.start(100, () => {
      yo = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return Id(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function Ts(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Dd(e) {
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
function Ad(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const jd = Number.isInteger || Ad;
function Ns(e, t, r, n) {
  const o = e[t];
  if (o == null || !jd(o)) {
    const a = Dd(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function Os(e, t, ...r) {
  return e[t] === void 0 ? null : Ns(e, t, ...r);
}
function wo() {
  return null;
}
Os.isRequired = Ns;
wo.isRequired = wo;
const Cs = process.env.NODE_ENV === "production" ? wo : Os;
function xo(e, t) {
  const r = $({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = $({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = $({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = xo(o[i], a[i]);
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
const Ha = (e) => e, Bd = () => {
  let e = Ha;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ha;
    }
  };
}, Ld = Bd(), Ss = Ld, Vd = {
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
function Ze(e, t, r = "Mui") {
  const n = Vd[t];
  return n ? `${r}-${n}` : `${Ss.generate(e)}-${t}`;
}
function mt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = Ze(e, o, r);
  }), n;
}
function Fd(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, r));
}
const zd = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Fd
}, Symbol.toStringTag, { value: "Module" }));
function me(e, t) {
  if (e == null)
    return {};
  var r = {};
  for (var n in e)
    if ({}.hasOwnProperty.call(e, n)) {
      if (t.includes(n))
        continue;
      r[n] = e[n];
    }
  return r;
}
function Rs(e) {
  return typeof e == "string";
}
function xr(e, t, r) {
  return e === void 0 || Rs(e) ? t : $({}, t, {
    ownerState: $({}, t.ownerState, r)
  });
}
function Ps(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function Wa(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Ud(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Ce(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = $({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), u = $({}, r, o, n);
    return p.length > 0 && (u.className = p), Object.keys(h).length > 0 && (u.style = h), {
      props: u,
      internalRef: void 0
    };
  }
  const i = Ps($({}, o, n)), l = Wa(n), c = Wa(o), d = t(i), f = Ce(d == null ? void 0 : d.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = $({}, d == null ? void 0 : d.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = $({}, d, r, c, l);
  return f.length > 0 && (g.className = f), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: d.ref
  };
}
function Hd(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
const Wd = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Bt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = me(e, Wd), l = a ? {} : Hd(n, o), {
    props: c,
    internalRef: d
  } = Ud($({}, i, {
    externalSlotProps: l
  })), f = qe(d, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return xr(r, $({}, c, {
    ref: f
  }), o);
}
const Gd = /* @__PURE__ */ T.createContext(void 0);
process.env.NODE_ENV !== "production" && (s.node, s.object);
function qd(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  if (!t || !t.components || !t.components[r])
    return n;
  const o = t.components[r];
  return o.defaultProps ? xo(o.defaultProps, n) : !o.styleOverrides && !o.variants ? xo(o, n) : n;
}
function Xd({
  props: e,
  name: t
}) {
  const r = T.useContext(Gd);
  return qd({
    props: e,
    name: t,
    theme: {
      components: r
    }
  });
}
process.env.NODE_ENV !== "production" && (s.node, s.object.isRequired);
function ht(e) {
  return Xd(e);
}
var Fr = {}, ro = { exports: {} }, Ga;
function Yd() {
  return Ga || (Ga = 1, function(e) {
    function t() {
      return e.exports = t = Object.assign ? Object.assign.bind() : function(r) {
        for (var n = 1; n < arguments.length; n++) {
          var o = arguments[n];
          for (var a in o)
            ({}).hasOwnProperty.call(o, a) && (r[a] = o[a]);
        }
        return r;
      }, e.exports.__esModule = !0, e.exports.default = e.exports, t.apply(null, arguments);
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(ro)), ro.exports;
}
var no = { exports: {} }, qa;
function Kd() {
  return qa || (qa = 1, function(e) {
    function t(r, n) {
      if (r == null)
        return {};
      var o = {};
      for (var a in r)
        if ({}.hasOwnProperty.call(r, a)) {
          if (n.includes(a))
            continue;
          o[a] = r[a];
        }
      return o;
    }
    e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
  }(no)), no.exports;
}
const Jd = /* @__PURE__ */ Tt(Kp), Zd = /* @__PURE__ */ Tt(vd), Qd = /* @__PURE__ */ Tt(gd), eu = ["values", "unit", "step"], tu = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => $({}, r, {
    [n.key]: n.val
  }), {});
};
function $s(e) {
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
  } = e, o = me(e, eu), a = tu(t), i = Object.keys(a);
  function l(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - n / 100}${r})`;
  }
  function d(g, p) {
    const h = i.indexOf(p);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : p) - n / 100}${r})`;
  }
  function f(g) {
    return i.indexOf(g) + 1 < i.length ? d(g, i[i.indexOf(g) + 1]) : l(g);
  }
  function v(g) {
    const p = i.indexOf(g);
    return p === 0 ? l(i[1]) : p === i.length - 1 ? c(i[p]) : d(g, i[i.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return $({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: d,
    only: f,
    not: v,
    unit: r
  }, o);
}
const ru = {
  borderRadius: 4
}, nu = ru, ou = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, Nt = ou;
function Nr(e, t) {
  return t ? tt(e, t, {
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
}, Xa = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Uo[e]}px)`
};
function dt(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || Xa;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || Xa;
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
function au(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function iu(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function Rn(e, t, r = !0) {
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
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = Rn(e, r) || n, t && (o = t(o, n, e)), o;
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
    const l = i[t], c = i.theme, d = Rn(c, n) || {};
    return dt(i, l, (v) => {
      let g = mn(d, o, v);
      return v === g && typeof v == "string" && (g = mn(d, o, `${t}${v === "default" ? "" : ot(v)}`, v)), r === !1 ? g : {
        [r]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: Nt
  } : {}, a.filterProps = [t], a;
}
function su(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const lu = {
  m: "margin",
  p: "padding"
}, cu = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ya = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, pu = su((e) => {
  if (e.length > 2)
    if (Ya[e])
      e = Ya[e];
    else
      return [e];
  const [t, r] = e.split(""), n = lu[t], o = cu[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), Pn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], $n = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], du = [...Pn, ...$n];
function zr(e, t, r, n) {
  var o;
  const a = (o = Rn(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function _s(e) {
  return zr(e, "spacing", 8, "spacing");
}
function Ur(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function uu(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Ur(t, r), n), {});
}
function fu(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = pu(r), a = uu(o, n), i = e[r];
  return dt(e, i, a);
}
function Ms(e, t) {
  const r = _s(e.theme);
  return Object.keys(e).map((n) => fu(e, t, n, r)).reduce(Nr, {});
}
function be(e) {
  return Ms(e, Pn);
}
be.propTypes = process.env.NODE_ENV !== "production" ? Pn.reduce((e, t) => (e[t] = Nt, e), {}) : {};
be.filterProps = Pn;
function ve(e) {
  return Ms(e, $n);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? $n.reduce((e, t) => (e[t] = Nt, e), {}) : {};
ve.filterProps = $n;
process.env.NODE_ENV !== "production" && du.reduce((e, t) => (e[t] = Nt, e), {});
function mu(e = 8) {
  if (e.mui)
    return e;
  const t = _s({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function _n(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? Nr(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function We(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Je(e, t) {
  return Ee({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const hu = Je("border", We), gu = Je("borderTop", We), bu = Je("borderRight", We), vu = Je("borderBottom", We), yu = Je("borderLeft", We), wu = Je("borderColor"), xu = Je("borderTopColor"), Eu = Je("borderRightColor"), ku = Je("borderBottomColor"), Tu = Je("borderLeftColor"), Nu = Je("outline", We), Ou = Je("outlineColor"), Mn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = zr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Ur(t, n)
    });
    return dt(e, e.borderRadius, r);
  }
  return null;
};
Mn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: Nt
} : {};
Mn.filterProps = ["borderRadius"];
_n(hu, gu, bu, vu, yu, wu, xu, Eu, ku, Tu, Mn, Nu, Ou);
const In = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = zr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Ur(t, n)
    });
    return dt(e, e.gap, r);
  }
  return null;
};
In.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: Nt
} : {};
In.filterProps = ["gap"];
const Dn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = zr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Ur(t, n)
    });
    return dt(e, e.columnGap, r);
  }
  return null;
};
Dn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: Nt
} : {};
Dn.filterProps = ["columnGap"];
const An = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = zr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Ur(t, n)
    });
    return dt(e, e.rowGap, r);
  }
  return null;
};
An.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: Nt
} : {};
An.filterProps = ["rowGap"];
const Cu = Ee({
  prop: "gridColumn"
}), Su = Ee({
  prop: "gridRow"
}), Ru = Ee({
  prop: "gridAutoFlow"
}), Pu = Ee({
  prop: "gridAutoColumns"
}), $u = Ee({
  prop: "gridAutoRows"
}), _u = Ee({
  prop: "gridTemplateColumns"
}), Mu = Ee({
  prop: "gridTemplateRows"
}), Iu = Ee({
  prop: "gridTemplateAreas"
}), Du = Ee({
  prop: "gridArea"
});
_n(In, Dn, An, Cu, Su, Ru, Pu, $u, _u, Mu, Iu, Du);
function Kt(e, t) {
  return t === "grey" ? t : e;
}
const Au = Ee({
  prop: "color",
  themeKey: "palette",
  transform: Kt
}), ju = Ee({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Kt
}), Bu = Ee({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Kt
});
_n(Au, ju, Bu);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Lu = Ee({
  prop: "width",
  transform: Ve
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
        maxWidth: Ve(r)
      };
    };
    return dt(e, e.maxWidth, t);
  }
  return null;
};
Ho.filterProps = ["maxWidth"];
const Vu = Ee({
  prop: "minWidth",
  transform: Ve
}), Fu = Ee({
  prop: "height",
  transform: Ve
}), zu = Ee({
  prop: "maxHeight",
  transform: Ve
}), Uu = Ee({
  prop: "minHeight",
  transform: Ve
});
Ee({
  prop: "size",
  cssProperty: "width",
  transform: Ve
});
Ee({
  prop: "size",
  cssProperty: "height",
  transform: Ve
});
const Hu = Ee({
  prop: "boxSizing"
});
_n(Lu, Ho, Vu, Fu, zu, Uu, Hu);
const Wu = {
  // borders
  border: {
    themeKey: "borders",
    transform: We
  },
  borderTop: {
    themeKey: "borders",
    transform: We
  },
  borderRight: {
    themeKey: "borders",
    transform: We
  },
  borderBottom: {
    themeKey: "borders",
    transform: We
  },
  borderLeft: {
    themeKey: "borders",
    transform: We
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
    transform: We
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Mn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Kt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Kt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Kt
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
    style: be
  },
  mt: {
    style: be
  },
  mr: {
    style: be
  },
  mb: {
    style: be
  },
  ml: {
    style: be
  },
  mx: {
    style: be
  },
  my: {
    style: be
  },
  margin: {
    style: be
  },
  marginTop: {
    style: be
  },
  marginRight: {
    style: be
  },
  marginBottom: {
    style: be
  },
  marginLeft: {
    style: be
  },
  marginX: {
    style: be
  },
  marginY: {
    style: be
  },
  marginInline: {
    style: be
  },
  marginInlineStart: {
    style: be
  },
  marginInlineEnd: {
    style: be
  },
  marginBlock: {
    style: be
  },
  marginBlockStart: {
    style: be
  },
  marginBlockEnd: {
    style: be
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
    style: Dn
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
    style: Ho
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
}, Hr = Wu;
function Gu(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function qu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Is() {
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
      themeKey: d,
      transform: f,
      style: v
    } = l;
    if (n == null)
      return null;
    if (d === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const g = Rn(o, d) || {};
    return v ? v(i) : dt(i, n, (h) => {
      let u = mn(g, f, h);
      return h === u && typeof h == "string" && (u = mn(g, f, `${r}${h === "default" ? "" : ot(h)}`, h)), c === !1 ? u : {
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
    const i = (n = a.unstable_sxConfig) != null ? n : Hr;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const f = au(a.breakpoints), v = Object.keys(f);
      let g = f;
      return Object.keys(d).forEach((p) => {
        const h = qu(d[p], a);
        if (h != null)
          if (typeof h == "object")
            if (i[p])
              g = Nr(g, e(p, h, a, i));
            else {
              const u = dt({
                theme: a
              }, h, (b) => ({
                [p]: b
              }));
              Gu(u, h) ? g[p] = t({
                sx: h,
                theme: a
              }) : g = Nr(g, u);
            }
          else
            g = Nr(g, e(p, h, a, i));
      }), iu(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const Ds = Is();
Ds.filterProps = ["sx"];
const Wo = Ds;
function As(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const Xu = ["breakpoints", "palette", "spacing", "shape"];
function Go(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = me(e, Xu), l = $s(r), c = mu(o);
  let d = tt({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: $({
      mode: "light"
    }, n),
    spacing: c,
    shape: $({}, nu, a)
  }, i);
  return d.applyStyles = As, d = t.reduce((f, v) => tt(f, v), d), d.unstable_sxConfig = $({}, Hr, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(v) {
    return Wo({
      sx: v,
      theme: this
    });
  }, d;
}
const Yu = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Go,
  private_createBreakpoints: $s,
  unstable_applyStyles: As
}, Symbol.toStringTag, { value: "Module" })), Ku = /* @__PURE__ */ Tt(Yu), Ju = ["sx"], Zu = (e) => {
  var t, r;
  const n = {
    systemProps: {},
    otherProps: {}
  }, o = (t = e == null || (r = e.theme) == null ? void 0 : r.unstable_sxConfig) != null ? t : Hr;
  return Object.keys(e).forEach((a) => {
    o[a] ? n.systemProps[a] = e[a] : n.otherProps[a] = e[a];
  }), n;
};
function Qu(e) {
  const {
    sx: t
  } = e, r = me(e, Ju), {
    systemProps: n,
    otherProps: o
  } = Zu(r);
  let a;
  return Array.isArray(t) ? a = [n, ...t] : typeof t == "function" ? a = (...i) => {
    const l = t(...i);
    return wt(l) ? $({}, n, l) : n;
  } : a = $({}, n, t), $({}, o, {
    sx: a
  });
}
const ef = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  default: Wo,
  extendSxProp: Qu,
  unstable_createStyleFunctionSx: Is,
  unstable_defaultSxConfig: Hr
}, Symbol.toStringTag, { value: "Module" })), tf = /* @__PURE__ */ Tt(ef);
var ar = Vo;
Object.defineProperty(Fr, "__esModule", {
  value: !0
});
var rf = Fr.default = bf;
Fr.shouldForwardProp = on;
Fr.systemDefaultTheme = void 0;
var He = ar(Yd()), Eo = ar(Kd()), Ka = uf(Hi), nf = Jd, of = ar(Zd), af = ar(Qd), sf = ar(Ku), lf = ar(tf);
const cf = ["ownerState"], pf = ["variants"], df = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function js(e) {
  if (typeof WeakMap != "function")
    return null;
  var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (js = function(n) {
    return n ? r : t;
  })(e);
}
function uf(e, t) {
  if (!t && e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var r = js(t);
  if (r && r.has(e))
    return r.get(e);
  var n = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var a in e)
    if (a !== "default" && Object.prototype.hasOwnProperty.call(e, a)) {
      var i = o ? Object.getOwnPropertyDescriptor(e, a) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, a, i) : n[a] = e[a];
    }
  return n.default = e, r && r.set(e, n), n;
}
function ff(e) {
  return Object.keys(e).length === 0;
}
function mf(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function on(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const hf = Fr.systemDefaultTheme = (0, sf.default)(), Ja = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Qr({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return ff(t) ? e : t[r] || t;
}
function gf(e) {
  return e ? (t, r) => r[e] : null;
}
function an(e, t) {
  let {
    ownerState: r
  } = t, n = (0, Eo.default)(t, cf);
  const o = typeof e == "function" ? e((0, He.default)({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => an(a, (0, He.default)({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = (0, Eo.default)(o, pf);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props((0, He.default)({
        ownerState: r
      }, n, r)) : Object.keys(c.props).forEach((f) => {
        (r == null ? void 0 : r[f]) !== c.props[f] && n[f] !== c.props[f] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style((0, He.default)({
        ownerState: r
      }, n, r)) : c.style));
    }), l;
  }
  return o;
}
function bf(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = hf,
    rootShouldForwardProp: n = on,
    slotShouldForwardProp: o = on
  } = e, a = (i) => (0, lf.default)((0, He.default)({}, i, {
    theme: Qr((0, He.default)({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    (0, Ka.internal_processStyles)(i, (y) => y.filter((O) => !(O != null && O.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = gf(Ja(d))
    } = l, p = (0, Eo.default)(l, df), h = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), u = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${Ja(d || "Root")}`);
    let w = on;
    d === "Root" || d === "root" ? w = n : d ? w = o : mf(i) && (w = void 0);
    const S = (0, Ka.default)(i, (0, He.default)({
      shouldForwardProp: w,
      label: b
    }, p)), x = (y) => typeof y == "function" && y.__emotion_real !== y || (0, nf.isPlainObject)(y) ? (O) => an(y, (0, He.default)({}, O, {
      theme: Qr({
        theme: O.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, E = (y, ...O) => {
      let N = x(y);
      const I = O ? O.map(x) : [];
      c && g && I.push((k) => {
        const C = Qr((0, He.default)({}, k, {
          defaultTheme: r,
          themeId: t
        }));
        if (!C.components || !C.components[c] || !C.components[c].styleOverrides)
          return null;
        const P = C.components[c].styleOverrides, z = {};
        return Object.entries(P).forEach(([H, _]) => {
          z[H] = an(_, (0, He.default)({}, k, {
            theme: C
          }));
        }), g(k, z);
      }), c && !h && I.push((k) => {
        var C;
        const P = Qr((0, He.default)({}, k, {
          defaultTheme: r,
          themeId: t
        })), z = P == null || (C = P.components) == null || (C = C[c]) == null ? void 0 : C.variants;
        return an({
          variants: z
        }, (0, He.default)({}, k, {
          theme: P
        }));
      }), u || I.push(a);
      const j = I.length - O.length;
      if (Array.isArray(y) && j > 0) {
        const k = new Array(j).fill("");
        N = [...y, ...k], N.raw = [...y.raw, ...k];
      }
      const B = S(N, ...I);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${(0, of.default)(d || "")}`), k === void 0 && (k = `Styled(${(0, af.default)(i)})`), B.displayName = k;
      }
      return i.muiName && (B.muiName = i.muiName), B;
    };
    return S.withConfig && (E.withConfig = S.withConfig), E;
  };
}
function vf(e, t) {
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
var ke = {};
const yf = /* @__PURE__ */ Tt(dd), wf = /* @__PURE__ */ Tt(zd);
var Bs = Vo;
Object.defineProperty(ke, "__esModule", {
  value: !0
});
var hn = ke.alpha = zs;
ke.blend = _f;
ke.colorChannel = void 0;
var xf = ke.darken = Xo;
ke.decomposeColor = Xe;
ke.emphasize = Us;
var Za = ke.getContrastRatio = Cf;
ke.getLuminance = gn;
ke.hexToRgb = Ls;
ke.hslToRgb = Fs;
var Ef = ke.lighten = Yo;
ke.private_safeAlpha = Sf;
ke.private_safeColorChannel = void 0;
ke.private_safeDarken = Rf;
ke.private_safeEmphasize = $f;
ke.private_safeLighten = Pf;
ke.recomposeColor = ir;
ke.rgbToHex = Of;
var Qa = Bs(yf), kf = Bs(wf);
function qo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), (0, kf.default)(e, t, r);
}
function Ls(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Tf(e) {
  const t = e.toString(16);
  return t.length === 1 ? `0${t}` : t;
}
function Xe(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Xe(Ls(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : (0, Qa.default)(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : (0, Qa.default)(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
const Vs = (e) => {
  const t = Xe(e);
  return t.values.slice(0, 3).map((r, n) => t.type.indexOf("hsl") !== -1 && n !== 0 ? `${r}%` : r).join(" ");
};
ke.colorChannel = Vs;
const Nf = (e, t) => {
  try {
    return Vs(e);
  } catch {
    return t && process.env.NODE_ENV !== "production" && console.warn(t), e;
  }
};
ke.private_safeColorChannel = Nf;
function ir(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Of(e) {
  if (e.indexOf("#") === 0)
    return e;
  const {
    values: t
  } = Xe(e);
  return `#${t.map((r, n) => Tf(n === 3 ? Math.round(255 * r) : r)).join("")}`;
}
function Fs(e) {
  e = Xe(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (d, f = (d + r / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), ir({
    type: l,
    values: c
  });
}
function gn(e) {
  e = Xe(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Xe(Fs(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Cf(e, t) {
  const r = gn(e), n = gn(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function zs(e, t) {
  return e = Xe(e), t = qo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, ir(e);
}
function Sf(e, t, r) {
  try {
    return zs(e, t);
  } catch {
    return r && process.env.NODE_ENV !== "production" && console.warn(r), e;
  }
}
function Xo(e, t) {
  if (e = Xe(e), t = qo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return ir(e);
}
function Rf(e, t, r) {
  try {
    return Xo(e, t);
  } catch {
    return r && process.env.NODE_ENV !== "production" && console.warn(r), e;
  }
}
function Yo(e, t) {
  if (e = Xe(e), t = qo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return ir(e);
}
function Pf(e, t, r) {
  try {
    return Yo(e, t);
  } catch {
    return r && process.env.NODE_ENV !== "production" && console.warn(r), e;
  }
}
function Us(e, t = 0.15) {
  return gn(e) > 0.5 ? Xo(e, t) : Yo(e, t);
}
function $f(e, t, r) {
  try {
    return Us(e, t);
  } catch {
    return r && process.env.NODE_ENV !== "production" && console.warn(r), e;
  }
}
function _f(e, t, r, n = 1) {
  const o = (c, d) => Math.round((c ** (1 / n) * (1 - r) + d ** (1 / n) * r) ** n), a = Xe(e), i = Xe(t), l = [o(a.values[0], i.values[0]), o(a.values[1], i.values[1]), o(a.values[2], i.values[2])];
  return ir({
    type: "rgb",
    values: l
  });
}
const Mf = {
  black: "#000",
  white: "#fff"
}, Dr = Mf, If = {
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
}, Df = If, Af = {
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
}, Ft = Af, jf = {
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
}, zt = jf, Bf = {
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
}, mr = Bf, Lf = {
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
}, Ut = Lf, Vf = {
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
}, Ht = Vf, Ff = {
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
}, Wt = Ff, zf = ["mode", "contrastThreshold", "tonalOffset"], ei = {
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
}, oo = {
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
function ti(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Ef(e.main, o) : t === "dark" && (e.dark = xf(e.main, a)));
}
function Uf(e = "light") {
  return e === "dark" ? {
    main: Ut[200],
    light: Ut[50],
    dark: Ut[400]
  } : {
    main: Ut[700],
    light: Ut[400],
    dark: Ut[800]
  };
}
function Hf(e = "light") {
  return e === "dark" ? {
    main: Ft[200],
    light: Ft[50],
    dark: Ft[400]
  } : {
    main: Ft[500],
    light: Ft[300],
    dark: Ft[700]
  };
}
function Wf(e = "light") {
  return e === "dark" ? {
    main: zt[500],
    light: zt[300],
    dark: zt[700]
  } : {
    main: zt[700],
    light: zt[400],
    dark: zt[800]
  };
}
function Gf(e = "light") {
  return e === "dark" ? {
    main: Ht[400],
    light: Ht[300],
    dark: Ht[700]
  } : {
    main: Ht[700],
    light: Ht[500],
    dark: Ht[900]
  };
}
function qf(e = "light") {
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
function Xf(e = "light") {
  return e === "dark" ? {
    main: mr[400],
    light: mr[300],
    dark: mr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: mr[500],
    dark: mr[900]
  };
}
function Yf(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = me(e, zf), a = e.primary || Uf(t), i = e.secondary || Hf(t), l = e.error || Wf(t), c = e.info || Gf(t), d = e.success || qf(t), f = e.warning || Xf(t);
  function v(u) {
    const b = Za(u, oo.text.primary) >= r ? oo.text.primary : ei.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const w = Za(u, b);
      w < 3 && console.error([`MUI: The contrast ratio of ${w}:1 for ${b} on ${u}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return b;
  }
  const g = ({
    color: u,
    name: b,
    mainShade: w = 500,
    lightShade: S = 300,
    darkShade: x = 700
  }) => {
    if (u = $({}, u), !u.main && u[w] && (u.main = u[w]), !u.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${w}\` property.` : Mr(11, b ? ` (${b})` : "", w));
    if (typeof u.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(u.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Mr(12, b ? ` (${b})` : "", JSON.stringify(u.main)));
    return ti(u, "light", S, n), ti(u, "dark", x, n), u.contrastText || (u.contrastText = v(u.main)), u;
  }, p = {
    dark: oo,
    light: ei
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), tt($({
    // A collection of common colors.
    common: $({}, Dr),
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
      color: d,
      name: "success"
    }),
    // The grey colors.
    grey: Df,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: r,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: v,
    // Generate a rich color object.
    augmentColor: g,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: n
  }, p[t]), o);
}
const Kf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Jf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ri = {
  textTransform: "uppercase"
}, ni = '"Roboto", "Helvetica", "Arial", sans-serif';
function Zf(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = ni,
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
    allVariants: f,
    pxToRem: v
  } = r, g = me(r, Kf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((w) => `${w / d * p}rem`), u = (w, S, x, E, y) => $({
    fontFamily: n,
    fontWeight: w,
    fontSize: h(S),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: x
  }, n === ni ? {
    letterSpacing: `${Jf(E / S)}em`
  } : {}, y, f), b = {
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
    button: u(l, 14, 1.75, 0.4, ri),
    caption: u(i, 12, 1.66, 0.4),
    overline: u(i, 12, 2.66, 1, ri),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return tt($({
    htmlFontSize: d,
    pxToRem: h,
    fontFamily: n,
    fontSize: o,
    fontWeightLight: a,
    fontWeightRegular: i,
    fontWeightMedium: l,
    fontWeightBold: c
  }, b), g, {
    clone: !1
    // No need to clone deep
  });
}
const Qf = 0.2, em = 0.14, tm = 0.12;
function ge(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Qf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${em})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${tm})`].join(",");
}
const rm = ["none", ge(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ge(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ge(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ge(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ge(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ge(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ge(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ge(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ge(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ge(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ge(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ge(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ge(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ge(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ge(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ge(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ge(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ge(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ge(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ge(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ge(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ge(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ge(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ge(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], nm = rm, om = ["duration", "easing", "delay"], am = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, im = {
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
function oi(e) {
  return `${Math.round(e)}ms`;
}
function sm(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function lm(e) {
  const t = $({}, am, e.easing), r = $({}, im, e.duration);
  return $({
    getAutoHeightDuration: sm,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, d = me(a, om);
      if (process.env.NODE_ENV !== "production") {
        const f = (g) => typeof g == "string", v = (g) => !isNaN(parseFloat(g));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : oi(i)} ${l} ${typeof c == "string" ? c : oi(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const cm = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, pm = cm, dm = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function um(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = me(e, dm);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Mr(18));
  const l = Yf(n), c = Go(e);
  let d = tt(c, {
    mixins: vf(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: nm.slice(),
    typography: Zf(l, a),
    transitions: lm(o),
    zIndex: $({}, pm)
  });
  if (d = tt(d, i), d = t.reduce((f, v) => tt(f, v), d), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (g, p) => {
      let h;
      for (h in g) {
        const u = g[h];
        if (f.indexOf(h) !== -1 && Object.keys(u).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const b = Ze("", h);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(g, null, 2), "", `Instead, you need to use the '&.${b}' syntax:`, JSON.stringify({
              root: {
                [`&.${b}`]: u
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          g[h] = {};
        }
      }
    };
    Object.keys(d.components).forEach((g) => {
      const p = d.components[g].styleOverrides;
      p && g.indexOf("Mui") === 0 && v(p, g);
    });
  }
  return d.unstable_sxConfig = $({}, Hr, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(v) {
    return Wo({
      sx: v,
      theme: this
    });
  }, d;
}
const fm = um(), Hs = fm, Ws = "$$material";
function mm(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const hm = (e) => mm(e) && e !== "classes", Gs = hm, gm = rf({
  themeId: Ws,
  defaultTheme: Hs,
  rootShouldForwardProp: Gs
}), Re = gm;
function bm(e) {
  return Ze("MuiSvgIcon", e);
}
mt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const vm = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ym = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${ot(t)}`, `fontSize${ot(r)}`]
  };
  return ft(o, bm, n);
}, wm = Re("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${ot(r.color)}`], t[`fontSize${ot(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, a, i, l, c, d, f, v, g, p, h;
  return {
    userSelect: "none",
    width: "1em",
    height: "1em",
    display: "inline-block",
    // the <svg> will define the property that has `currentColor`
    // for example heroicons uses fill="none" and stroke="currentColor"
    fill: t.hasSvgAsChild ? void 0 : "currentColor",
    flexShrink: 0,
    transition: (r = e.transitions) == null || (n = r.create) == null ? void 0 : n.call(r, "fill", {
      duration: (o = e.transitions) == null || (o = o.duration) == null ? void 0 : o.shorter
    }),
    fontSize: {
      inherit: "inherit",
      small: ((a = e.typography) == null || (i = a.pxToRem) == null ? void 0 : i.call(a, 20)) || "1.25rem",
      medium: ((l = e.typography) == null || (c = l.pxToRem) == null ? void 0 : c.call(l, 24)) || "1.5rem",
      large: ((d = e.typography) == null || (f = d.pxToRem) == null ? void 0 : f.call(d, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Ko = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = ht({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: d,
    inheritViewBox: f = !1,
    titleAccess: v,
    viewBox: g = "0 0 24 24"
  } = n, p = me(n, vm), h = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", u = $({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: g,
    hasSvgAsChild: h
  }), b = {};
  f || (b.viewBox = g);
  const w = ym(u);
  return /* @__PURE__ */ A(wm, $({
    as: l,
    className: Ce(w.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: r
  }, b, p, h && o.props, {
    ownerState: u,
    children: [h ? o.props.children : o, v ? /* @__PURE__ */ m("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Ko.propTypes = {
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
Ko.muiName = "SvgIcon";
const ai = Ko;
function qs(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ m(ai, $({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = ai.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(r));
}
const xm = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), Ss.configure(e);
  }
}, Em = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: ot,
  createChainedFunction: vo,
  createSvgIcon: qs,
  debounce: ws,
  deprecatedPropType: yd,
  isMuiElement: wd,
  ownerDocument: Se,
  ownerWindow: Zt,
  requirePropFactory: xd,
  setRef: fn,
  unstable_ClassNameGenerator: xm,
  unstable_useEnhancedEffect: jt,
  unstable_useId: xs,
  unsupportedProp: Td,
  useControlled: Es,
  useEventCallback: Ir,
  useForkRef: qe,
  useIsFocusVisible: ks
}, Symbol.toStringTag, { value: "Module" })), km = /* @__PURE__ */ Tt(Em);
var ii;
function Tm() {
  return ii || (ii = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = km;
  }(Xn)), Xn;
}
var Nm = Vo;
Object.defineProperty(Lo, "__esModule", {
  value: !0
});
var Xs = Lo.default = void 0, Om = Nm(Tm()), Cm = dc;
Xs = Lo.default = (0, Om.default)(/* @__PURE__ */ (0, Cm.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
const Sm = /* @__PURE__ */ T.createContext();
process.env.NODE_ENV !== "production" && (s.node, s.bool);
const Ys = () => {
  const e = T.useContext(Sm);
  return e ?? !1;
};
function Rm(e) {
  return Object.keys(e).length === 0;
}
function Pm(e = null) {
  const t = T.useContext(Qc);
  return !t || Rm(t) ? e : t;
}
const $m = Go();
function _m(e = $m) {
  return Pm(e);
}
function jn() {
  const e = _m(Hs);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Ws] || e;
}
const Mm = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, si = Mm;
function ko(e, t) {
  return ko = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, n) {
    return r.__proto__ = n, r;
  }, ko(e, t);
}
function Im(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ko(e, t);
}
const li = {
  disabled: !1
};
var Dm = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Ks = W.createContext(null);
var Am = function(t) {
  return t.scrollTop;
}, Er = "unmounted", Pt = "exited", $t = "entering", Yt = "entered", To = "exiting", gt = /* @__PURE__ */ function(e) {
  Im(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = Pt, a.appearStatus = $t) : c = Yt : n.unmountOnExit || n.mountOnEnter ? c = Er : c = Pt, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === Er ? {
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
      this.props.in ? i !== $t && i !== Yt && (a = $t) : (i === $t || i === Yt) && (a = To);
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
          var i = this.props.nodeRef ? this.props.nodeRef.current : Jr.findDOMNode(this);
          i && Am(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Pt && this.setState({
        status: Er
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Jr.findDOMNode(this), l], d = c[0], f = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
    if (!o && !i || li.disabled) {
      this.safeSetState({
        status: Yt
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, f), this.safeSetState({
      status: $t
    }, function() {
      a.props.onEntering(d, f), a.onTransitionEnd(g, function() {
        a.safeSetState({
          status: Yt
        }, function() {
          a.props.onEntered(d, f);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Jr.findDOMNode(this);
    if (!a || li.disabled) {
      this.safeSetState({
        status: Pt
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: To
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Jr.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], d = c[0], f = c[1];
      this.props.addEndListener(d, f);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === Er)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = me(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ W.createElement(Ks.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : W.cloneElement(W.Children.only(i), l))
    );
  }, t;
}(W.Component);
gt.contextType = Ks;
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
    var r = Dm;
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
function Gt() {
}
gt.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Gt,
  onEntering: Gt,
  onEntered: Gt,
  onExit: Gt,
  onExiting: Gt,
  onExited: Gt
};
gt.UNMOUNTED = Er;
gt.EXITED = Pt;
gt.ENTERING = $t;
gt.ENTERED = Yt;
gt.EXITING = To;
const Js = gt, Zs = (e) => e.scrollTop;
function bn(e, t) {
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
const jm = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function No(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Bm = {
  entering: {
    opacity: 1,
    transform: No(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, ao = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Jo = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: d,
    onEntering: f,
    onExit: v,
    onExited: g,
    onExiting: p,
    style: h,
    timeout: u = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: b = Js
  } = t, w = me(t, jm), S = wr(), x = T.useRef(), E = jn(), y = T.useRef(null), O = qe(y, a.ref, r), N = (H) => (_) => {
    if (H) {
      const F = y.current;
      _ === void 0 ? H(F) : H(F, _);
    }
  }, I = N(f), j = N((H, _) => {
    Zs(H);
    const {
      duration: F,
      delay: q,
      easing: re
    } = bn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "enter"
    });
    let R;
    u === "auto" ? (R = E.transitions.getAutoHeightDuration(H.clientHeight), x.current = R) : R = F, H.style.transition = [E.transitions.create("opacity", {
      duration: R,
      delay: q
    }), E.transitions.create("transform", {
      duration: ao ? R : R * 0.666,
      delay: q,
      easing: re
    })].join(","), c && c(H, _);
  }), B = N(d), k = N(p), C = N((H) => {
    const {
      duration: _,
      delay: F,
      easing: q
    } = bn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "exit"
    });
    let re;
    u === "auto" ? (re = E.transitions.getAutoHeightDuration(H.clientHeight), x.current = re) : re = _, H.style.transition = [E.transitions.create("opacity", {
      duration: re,
      delay: F
    }), E.transitions.create("transform", {
      duration: ao ? re : re * 0.666,
      delay: ao ? F : F || re * 0.333,
      easing: q
    })].join(","), H.style.opacity = 0, H.style.transform = No(0.75), v && v(H);
  }), P = N(g);
  return /* @__PURE__ */ m(b, $({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: j,
    onEntered: B,
    onEntering: I,
    onExit: C,
    onExited: P,
    onExiting: k,
    addEndListener: (H) => {
      u === "auto" && S.start(x.current || 0, H), n && n(y.current, H);
    },
    timeout: u === "auto" ? null : u
  }, w, {
    children: (H, _) => /* @__PURE__ */ T.cloneElement(a, $({
      style: $({
        opacity: 0,
        transform: No(0.75),
        visibility: H === "exited" && !l ? "hidden" : void 0
      }, Bm[H], h, a.props.style),
      ref: O
    }, _))
  }));
});
process.env.NODE_ENV !== "production" && (Jo.propTypes = {
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
  children: Lr.isRequired,
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
Jo.muiSupportAuto = !0;
const Oo = Jo;
var Zo = {};
Object.defineProperty(Zo, "__esModule", {
  value: !0
});
var Qs = Zo.default = void 0, Lm = Fm(W), Vm = Hi;
function el(e) {
  if (typeof WeakMap != "function")
    return null;
  var t = /* @__PURE__ */ new WeakMap(), r = /* @__PURE__ */ new WeakMap();
  return (el = function(n) {
    return n ? r : t;
  })(e);
}
function Fm(e, t) {
  if (!t && e && e.__esModule)
    return e;
  if (e === null || typeof e != "object" && typeof e != "function")
    return { default: e };
  var r = el(t);
  if (r && r.has(e))
    return r.get(e);
  var n = { __proto__: null }, o = Object.defineProperty && Object.getOwnPropertyDescriptor;
  for (var a in e)
    if (a !== "default" && Object.prototype.hasOwnProperty.call(e, a)) {
      var i = o ? Object.getOwnPropertyDescriptor(e, a) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, a, i) : n[a] = e[a];
    }
  return n.default = e, r && r.set(e, n), n;
}
function zm(e) {
  return Object.keys(e).length === 0;
}
function Um(e = null) {
  const t = Lm.useContext(Vm.ThemeContext);
  return !t || zm(t) ? e : t;
}
Qs = Zo.default = Um;
var Me = "top", Ye = "bottom", Ke = "right", Ie = "left", Qo = "auto", Wr = [Me, Ye, Ke, Ie], Qt = "start", Ar = "end", Hm = "clippingParents", tl = "viewport", hr = "popper", Wm = "reference", ci = /* @__PURE__ */ Wr.reduce(function(e, t) {
  return e.concat([t + "-" + Qt, t + "-" + Ar]);
}, []), rl = /* @__PURE__ */ [].concat(Wr, [Qo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Qt, t + "-" + Ar]);
}, []), Gm = "beforeRead", qm = "read", Xm = "afterRead", Ym = "beforeMain", Km = "main", Jm = "afterMain", Zm = "beforeWrite", Qm = "write", eh = "afterWrite", th = [Gm, qm, Xm, Ym, Km, Jm, Zm, Qm, eh];
function at(e) {
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
function Lt(e) {
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
function rh(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Ge(a) || !at(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function nh(e) {
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
      var o = t.elements[n], a = t.attributes[n] || {}, i = Object.keys(t.styles.hasOwnProperty(n) ? t.styles[n] : r[n]), l = i.reduce(function(c, d) {
        return c[d] = "", c;
      }, {});
      !Ge(o) || !at(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const oh = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: rh,
  effect: nh,
  requires: ["computeStyles"]
};
function rt(e) {
  return e.split("-")[0];
}
var Dt = Math.max, vn = Math.min, er = Math.round;
function Co() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function nl() {
  return !/^((?!chrome|android).)*safari/i.test(Co());
}
function tr(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && er(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && er(n.height) / e.offsetHeight || 1);
  var i = Lt(e) ? ze(e) : window, l = i.visualViewport, c = !nl() && r, d = (n.left + (c && l ? l.offsetLeft : 0)) / o, f = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, g = n.height / a;
  return {
    width: v,
    height: g,
    top: f,
    right: d + v,
    bottom: f + g,
    left: d,
    x: d,
    y: f
  };
}
function ta(e) {
  var t = tr(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function ol(e, t) {
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
function ut(e) {
  return ze(e).getComputedStyle(e);
}
function ah(e) {
  return ["table", "td", "th"].indexOf(at(e)) >= 0;
}
function Ot(e) {
  return ((Lt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Bn(e) {
  return at(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (ea(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Ot(e)
  );
}
function pi(e) {
  return !Ge(e) || // https://github.com/popperjs/popper-core/issues/837
  ut(e).position === "fixed" ? null : e.offsetParent;
}
function ih(e) {
  var t = /firefox/i.test(Co()), r = /Trident/i.test(Co());
  if (r && Ge(e)) {
    var n = ut(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Bn(e);
  for (ea(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(at(o)) < 0; ) {
    var a = ut(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Gr(e) {
  for (var t = ze(e), r = pi(e); r && ah(r) && ut(r).position === "static"; )
    r = pi(r);
  return r && (at(r) === "html" || at(r) === "body" && ut(r).position === "static") ? t : r || ih(e) || t;
}
function ra(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Or(e, t, r) {
  return Dt(e, vn(t, r));
}
function sh(e, t, r) {
  var n = Or(e, t, r);
  return n > r ? r : n;
}
function al() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function il(e) {
  return Object.assign({}, al(), e);
}
function sl(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var lh = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, il(typeof t != "number" ? t : sl(t, Wr));
};
function ch(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = rt(r.placement), c = ra(l), d = [Ie, Ke].indexOf(l) >= 0, f = d ? "height" : "width";
  if (!(!a || !i)) {
    var v = lh(o.padding, r), g = ta(a), p = c === "y" ? Me : Ie, h = c === "y" ? Ye : Ke, u = r.rects.reference[f] + r.rects.reference[c] - i[c] - r.rects.popper[f], b = i[c] - r.rects.reference[c], w = Gr(a), S = w ? c === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, x = u / 2 - b / 2, E = v[p], y = S - g[f] - v[h], O = S / 2 - g[f] / 2 + x, N = Or(E, O, y), I = c;
    r.modifiersData[n] = (t = {}, t[I] = N, t.centerOffset = N - O, t);
  }
}
function ph(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || ol(t.elements.popper, o) && (t.elements.arrow = o));
}
const dh = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: ch,
  effect: ph,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function rr(e) {
  return e.split("-")[1];
}
var uh = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function fh(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: er(r * o) / o || 0,
    y: er(n * o) / o || 0
  };
}
function di(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, d = e.adaptive, f = e.roundOffsets, v = e.isFixed, g = i.x, p = g === void 0 ? 0 : g, h = i.y, u = h === void 0 ? 0 : h, b = typeof f == "function" ? f({
    x: p,
    y: u
  }) : {
    x: p,
    y: u
  };
  p = b.x, u = b.y;
  var w = i.hasOwnProperty("x"), S = i.hasOwnProperty("y"), x = Ie, E = Me, y = window;
  if (d) {
    var O = Gr(r), N = "clientHeight", I = "clientWidth";
    if (O === ze(r) && (O = Ot(r), ut(O).position !== "static" && l === "absolute" && (N = "scrollHeight", I = "scrollWidth")), O = O, o === Me || (o === Ie || o === Ke) && a === Ar) {
      E = Ye;
      var j = v && O === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        O[N]
      );
      u -= j - n.height, u *= c ? 1 : -1;
    }
    if (o === Ie || (o === Me || o === Ye) && a === Ar) {
      x = Ke;
      var B = v && O === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        O[I]
      );
      p -= B - n.width, p *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, d && uh), C = f === !0 ? fh({
    x: p,
    y: u
  }, ze(r)) : {
    x: p,
    y: u
  };
  if (p = C.x, u = C.y, c) {
    var P;
    return Object.assign({}, k, (P = {}, P[E] = S ? "0" : "", P[x] = w ? "0" : "", P.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + u + "px)" : "translate3d(" + p + "px, " + u + "px, 0)", P));
  }
  return Object.assign({}, k, (t = {}, t[E] = S ? u + "px" : "", t[x] = w ? p + "px" : "", t.transform = "", t));
}
function mh(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: rt(t.placement),
    variation: rr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, di(Object.assign({}, d, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, di(Object.assign({}, d, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const hh = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: mh,
  data: {}
};
var en = {
  passive: !0
};
function gh(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = ze(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && d.forEach(function(f) {
    f.addEventListener("scroll", r.update, en);
  }), l && c.addEventListener("resize", r.update, en), function() {
    a && d.forEach(function(f) {
      f.removeEventListener("scroll", r.update, en);
    }), l && c.removeEventListener("resize", r.update, en);
  };
}
const bh = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: gh,
  data: {}
};
var vh = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function sn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return vh[t];
  });
}
var yh = {
  start: "end",
  end: "start"
};
function ui(e) {
  return e.replace(/start|end/g, function(t) {
    return yh[t];
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
  return tr(Ot(e)).left + na(e).scrollLeft;
}
function wh(e, t) {
  var r = ze(e), n = Ot(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = nl();
    (d || !d && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + oa(e),
    y: c
  };
}
function xh(e) {
  var t, r = Ot(e), n = na(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = Dt(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = Dt(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + oa(e), c = -n.scrollTop;
  return ut(o || r).direction === "rtl" && (l += Dt(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function aa(e) {
  var t = ut(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function ll(e) {
  return ["html", "body", "#document"].indexOf(at(e)) >= 0 ? e.ownerDocument.body : Ge(e) && aa(e) ? e : ll(Bn(e));
}
function Cr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = ll(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ze(n), i = o ? [a].concat(a.visualViewport || [], aa(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Cr(Bn(i)))
  );
}
function So(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Eh(e, t) {
  var r = tr(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function fi(e, t, r) {
  return t === tl ? So(wh(e, r)) : Lt(t) ? Eh(t, r) : So(xh(Ot(e)));
}
function kh(e) {
  var t = Cr(Bn(e)), r = ["absolute", "fixed"].indexOf(ut(e).position) >= 0, n = r && Ge(e) ? Gr(e) : e;
  return Lt(n) ? t.filter(function(o) {
    return Lt(o) && ol(o, n) && at(o) !== "body";
  }) : [];
}
function Th(e, t, r, n) {
  var o = t === "clippingParents" ? kh(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, d) {
    var f = fi(e, d, n);
    return c.top = Dt(f.top, c.top), c.right = vn(f.right, c.right), c.bottom = vn(f.bottom, c.bottom), c.left = Dt(f.left, c.left), c;
  }, fi(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function cl(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? rt(n) : null, a = n ? rr(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
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
    case Ke:
      c = {
        x: t.x + t.width,
        y: l
      };
      break;
    case Ie:
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
  var d = o ? ra(o) : null;
  if (d != null) {
    var f = d === "y" ? "height" : "width";
    switch (a) {
      case Qt:
        c[d] = c[d] - (t[f] / 2 - r[f] / 2);
        break;
      case Ar:
        c[d] = c[d] + (t[f] / 2 - r[f] / 2);
        break;
    }
  }
  return c;
}
function jr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? Hm : l, d = r.rootBoundary, f = d === void 0 ? tl : d, v = r.elementContext, g = v === void 0 ? hr : v, p = r.altBoundary, h = p === void 0 ? !1 : p, u = r.padding, b = u === void 0 ? 0 : u, w = il(typeof b != "number" ? b : sl(b, Wr)), S = g === hr ? Wm : hr, x = e.rects.popper, E = e.elements[h ? S : g], y = Th(Lt(E) ? E : E.contextElement || Ot(e.elements.popper), c, f, i), O = tr(e.elements.reference), N = cl({
    reference: O,
    element: x,
    strategy: "absolute",
    placement: o
  }), I = So(Object.assign({}, x, N)), j = g === hr ? I : O, B = {
    top: y.top - j.top + w.top,
    bottom: j.bottom - y.bottom + w.bottom,
    left: y.left - j.left + w.left,
    right: j.right - y.right + w.right
  }, k = e.modifiersData.offset;
  if (g === hr && k) {
    var C = k[o];
    Object.keys(B).forEach(function(P) {
      var z = [Ke, Ye].indexOf(P) >= 0 ? 1 : -1, H = [Me, Ye].indexOf(P) >= 0 ? "y" : "x";
      B[P] += C[H] * z;
    });
  }
  return B;
}
function Nh(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, d = c === void 0 ? rl : c, f = rr(n), v = f ? l ? ci : ci.filter(function(h) {
    return rr(h) === f;
  }) : Wr, g = v.filter(function(h) {
    return d.indexOf(h) >= 0;
  });
  g.length === 0 && (g = v);
  var p = g.reduce(function(h, u) {
    return h[u] = jr(e, {
      placement: u,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[rt(u)], h;
  }, {});
  return Object.keys(p).sort(function(h, u) {
    return p[h] - p[u];
  });
}
function Oh(e) {
  if (rt(e) === Qo)
    return [];
  var t = sn(e);
  return [ui(e), t, ui(t)];
}
function Ch(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, d = r.padding, f = r.boundary, v = r.rootBoundary, g = r.altBoundary, p = r.flipVariations, h = p === void 0 ? !0 : p, u = r.allowedAutoPlacements, b = t.options.placement, w = rt(b), S = w === b, x = c || (S || !h ? [sn(b)] : Oh(b)), E = [b].concat(x).reduce(function(G, X) {
      return G.concat(rt(X) === Qo ? Nh(t, {
        placement: X,
        boundary: f,
        rootBoundary: v,
        padding: d,
        flipVariations: h,
        allowedAutoPlacements: u
      }) : X);
    }, []), y = t.rects.reference, O = t.rects.popper, N = /* @__PURE__ */ new Map(), I = !0, j = E[0], B = 0; B < E.length; B++) {
      var k = E[B], C = rt(k), P = rr(k) === Qt, z = [Me, Ye].indexOf(C) >= 0, H = z ? "width" : "height", _ = jr(t, {
        placement: k,
        boundary: f,
        rootBoundary: v,
        altBoundary: g,
        padding: d
      }), F = z ? P ? Ke : Ie : P ? Ye : Me;
      y[H] > O[H] && (F = sn(F));
      var q = sn(F), re = [];
      if (a && re.push(_[C] <= 0), l && re.push(_[F] <= 0, _[q] <= 0), re.every(function(G) {
        return G;
      })) {
        j = k, I = !1;
        break;
      }
      N.set(k, re);
    }
    if (I)
      for (var R = h ? 3 : 1, M = function(X) {
        var J = E.find(function(Z) {
          var Y = N.get(Z);
          if (Y)
            return Y.slice(0, X).every(function(Q) {
              return Q;
            });
        });
        if (J)
          return j = J, "break";
      }, U = R; U > 0; U--) {
        var K = M(U);
        if (K === "break")
          break;
      }
    t.placement !== j && (t.modifiersData[n]._skip = !0, t.placement = j, t.reset = !0);
  }
}
const Sh = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Ch,
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
  return [Me, Ke, Ye, Ie].some(function(t) {
    return e[t] >= 0;
  });
}
function Rh(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = jr(t, {
    elementContext: "reference"
  }), l = jr(t, {
    altBoundary: !0
  }), c = mi(i, n), d = mi(l, o, a), f = hi(c), v = hi(d);
  t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: f,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": v
  });
}
const Ph = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Rh
};
function $h(e, t, r) {
  var n = rt(e), o = [Ie, Me].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Ie, Ke].indexOf(n) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function _h(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = rl.reduce(function(f, v) {
    return f[v] = $h(v, t.rects, a), f;
  }, {}), l = i[t.placement], c = l.x, d = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += d), t.modifiersData[n] = i;
}
const Mh = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: _h
};
function Ih(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = cl({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Dh = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Ih,
  data: {}
};
function Ah(e) {
  return e === "x" ? "y" : "x";
}
function jh(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, d = r.rootBoundary, f = r.altBoundary, v = r.padding, g = r.tether, p = g === void 0 ? !0 : g, h = r.tetherOffset, u = h === void 0 ? 0 : h, b = jr(t, {
    boundary: c,
    rootBoundary: d,
    padding: v,
    altBoundary: f
  }), w = rt(t.placement), S = rr(t.placement), x = !S, E = ra(w), y = Ah(E), O = t.modifiersData.popperOffsets, N = t.rects.reference, I = t.rects.popper, j = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, B = typeof j == "number" ? {
    mainAxis: j,
    altAxis: j
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, j), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, C = {
    x: 0,
    y: 0
  };
  if (O) {
    if (a) {
      var P, z = E === "y" ? Me : Ie, H = E === "y" ? Ye : Ke, _ = E === "y" ? "height" : "width", F = O[E], q = F + b[z], re = F - b[H], R = p ? -I[_] / 2 : 0, M = S === Qt ? N[_] : I[_], U = S === Qt ? -I[_] : -N[_], K = t.elements.arrow, G = p && K ? ta(K) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : al(), J = X[z], Z = X[H], Y = Or(0, N[_], G[_]), Q = x ? N[_] / 2 - R - Y - J - B.mainAxis : M - Y - J - B.mainAxis, ee = x ? -N[_] / 2 + R + Y + Z + B.mainAxis : U + Y + Z + B.mainAxis, ie = t.elements.arrow && Gr(t.elements.arrow), L = ie ? E === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, te = (P = k == null ? void 0 : k[E]) != null ? P : 0, D = F + Q - te - L, se = F + ee - te, Te = Or(p ? vn(q, D) : q, F, p ? Dt(re, se) : re);
      O[E] = Te, C[E] = Te - F;
    }
    if (l) {
      var Pe, xe = E === "x" ? Me : Ie, Ct = E === "x" ? Ye : Ke, $e = O[y], it = y === "y" ? "height" : "width", je = $e + b[xe], st = $e - b[Ct], Ne = [Me, Ie].indexOf(w) !== -1, Vt = (Pe = k == null ? void 0 : k[y]) != null ? Pe : 0, St = Ne ? je : $e - N[it] - I[it] - Vt + B.altAxis, sr = Ne ? $e + N[it] + I[it] - Vt - B.altAxis : st, qr = p && Ne ? sh(St, $e, sr) : Or(p ? St : je, $e, p ? sr : st);
      O[y] = qr, C[y] = qr - $e;
    }
    t.modifiersData[n] = C;
  }
}
const Bh = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: jh,
  requiresIfExists: ["offset"]
};
function Lh(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Vh(e) {
  return e === ze(e) || !Ge(e) ? na(e) : Lh(e);
}
function Fh(e) {
  var t = e.getBoundingClientRect(), r = er(t.width) / e.offsetWidth || 1, n = er(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function zh(e, t, r) {
  r === void 0 && (r = !1);
  var n = Ge(t), o = Ge(t) && Fh(t), a = Ot(t), i = tr(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((at(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  aa(a)) && (l = Vh(t)), Ge(t) ? (c = tr(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = oa(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Uh(e) {
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
function Hh(e) {
  var t = Uh(e);
  return th.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Wh(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function Gh(e) {
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
function qh(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? gi : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var f = {
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
    }, v = [], g = !1, p = {
      state: f,
      setOptions: function(w) {
        var S = typeof w == "function" ? w(f.options) : w;
        u(), f.options = Object.assign({}, a, f.options, S), f.scrollParents = {
          reference: Lt(l) ? Cr(l) : l.contextElement ? Cr(l.contextElement) : [],
          popper: Cr(c)
        };
        var x = Hh(Gh([].concat(n, f.options.modifiers)));
        return f.orderedModifiers = x.filter(function(E) {
          return E.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var w = f.elements, S = w.reference, x = w.popper;
          if (bi(S, x)) {
            f.rects = {
              reference: zh(S, Gr(x), f.options.strategy === "fixed"),
              popper: ta(x)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(B) {
              return f.modifiersData[B.name] = Object.assign({}, B.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], O = y.fn, N = y.options, I = N === void 0 ? {} : N, j = y.name;
              typeof O == "function" && (f = O({
                state: f,
                options: I,
                name: j,
                instance: p
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Wh(function() {
        return new Promise(function(b) {
          p.forceUpdate(), b(f);
        });
      }),
      destroy: function() {
        u(), g = !0;
      }
    };
    if (!bi(l, c))
      return p;
    p.setOptions(d).then(function(b) {
      !g && d.onFirstUpdate && d.onFirstUpdate(b);
    });
    function h() {
      f.orderedModifiers.forEach(function(b) {
        var w = b.name, S = b.options, x = S === void 0 ? {} : S, E = b.effect;
        if (typeof E == "function") {
          var y = E({
            state: f,
            name: w,
            instance: p,
            options: x
          }), O = function() {
          };
          v.push(y || O);
        }
      });
    }
    function u() {
      v.forEach(function(b) {
        return b();
      }), v = [];
    }
    return p;
  };
}
var Xh = [bh, Dh, hh, oh, Mh, Sh, Bh, dh, Ph], Yh = /* @__PURE__ */ qh({
  defaultModifiers: Xh
});
function Kh(e) {
  return typeof e == "function" ? e() : e;
}
const yn = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = T.useState(null), c = qe(/* @__PURE__ */ T.isValidElement(n) ? n.ref : null, r);
  if (jt(() => {
    a || l(Kh(o) || document.body);
  }, [o, a]), jt(() => {
    if (i && !a)
      return fn(r, i), () => {
        fn(r, null);
      };
  }, [r, i, a]), a) {
    if (/* @__PURE__ */ T.isValidElement(n)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(n, d);
    }
    return /* @__PURE__ */ m(T.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ m(T.Fragment, {
    children: i && /* @__PURE__ */ ep.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (yn.propTypes = {
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
process.env.NODE_ENV !== "production" && (yn["propTypes"] = bs(yn.propTypes));
const pl = yn;
function Jh(e) {
  return Ze("MuiPopper", e);
}
mt("MuiPopper", ["root"]);
const Zh = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Qh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function eg(e, t) {
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
function Ln(e) {
  return e.nodeType !== void 0;
}
function tg(e) {
  return !Ln(e);
}
const rg = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"]
  }, Jh, t);
}, ng = {}, og = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: d,
    placement: f,
    popperOptions: v,
    popperRef: g,
    slotProps: p = {},
    slots: h = {},
    TransitionProps: u
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, b = me(t, Zh), w = T.useRef(null), S = qe(w, r), x = T.useRef(null), E = qe(x, g), y = T.useRef(E);
  jt(() => {
    y.current = E;
  }, [E]), T.useImperativeHandle(g, () => x.current, []);
  const O = eg(f, i), [N, I] = T.useState(O), [j, B] = T.useState(wn(o));
  T.useEffect(() => {
    x.current && x.current.forceUpdate();
  }), T.useEffect(() => {
    o && B(wn(o));
  }, [o]), jt(() => {
    if (!j || !d)
      return;
    const H = (q) => {
      I(q.placement);
    };
    if (process.env.NODE_ENV !== "production" && j && Ln(j) && j.nodeType === 1) {
      const q = j.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && q.top === 0 && q.left === 0 && q.right === 0 && q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let _ = [{
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
        state: q
      }) => {
        H(q);
      }
    }];
    c != null && (_ = _.concat(c)), v && v.modifiers != null && (_ = _.concat(v.modifiers));
    const F = Yh(j, w.current, $({
      placement: O
    }, v, {
      modifiers: _
    }));
    return y.current(F), () => {
      F.destroy(), y.current(null);
    };
  }, [j, l, c, d, v, O]);
  const k = {
    placement: N
  };
  u !== null && (k.TransitionProps = u);
  const C = rg(t), P = (n = h.root) != null ? n : "div", z = Bt({
    elementType: P,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: S
    },
    ownerState: t,
    className: C.root
  });
  return /* @__PURE__ */ m(P, $({}, z, {
    children: typeof a == "function" ? a(k) : a
  }));
}), dl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: f,
    placement: v = "bottom",
    popperOptions: g = ng,
    popperRef: p,
    style: h,
    transition: u = !1,
    slotProps: b = {},
    slots: w = {}
  } = t, S = me(t, Qh), [x, E] = T.useState(!0), y = () => {
    E(!1);
  }, O = () => {
    E(!0);
  };
  if (!c && !f && (!u || x))
    return null;
  let N;
  if (a)
    N = a;
  else if (n) {
    const B = wn(n);
    N = B && Ln(B) ? Se(B).body : Se(null).body;
  }
  const I = !f && c && (!u || x) ? "none" : void 0, j = u ? {
    in: f,
    onEnter: y,
    onExited: O
  } : void 0;
  return /* @__PURE__ */ m(pl, {
    disablePortal: l,
    container: N,
    children: /* @__PURE__ */ m(og, $({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: d,
      ref: r,
      open: u ? !x : f,
      placement: v,
      popperOptions: g,
      popperRef: p,
      slotProps: b,
      slots: w
    }, S, {
      style: $({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: I
      }, h),
      TransitionProps: j,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (dl.propTypes = {
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
  anchorEl: or(s.oneOfType([pt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = wn(e.anchorEl);
      if (t && Ln(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || tg(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
const ag = dl, ig = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], sg = Re(ag, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ul = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const o = Qs(), a = ht({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: d,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: u,
    popperOptions: b,
    popperRef: w,
    transition: S,
    slots: x,
    slotProps: E
  } = a, y = me(a, ig), O = (n = x == null ? void 0 : x.root) != null ? n : c == null ? void 0 : c.Root, N = $({
    anchorEl: i,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: u,
    popperOptions: b,
    popperRef: w,
    transition: S
  }, y);
  return /* @__PURE__ */ m(sg, $({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: O
    },
    slotProps: E ?? d
  }, N, {
    ref: r
  }));
});
process.env.NODE_ENV !== "production" && (ul.propTypes = {
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
const fl = ul;
function lg(e) {
  return Ze("MuiTooltip", e);
}
const cg = mt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), xt = cg, pg = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function dg(e) {
  return Math.round(e * 1e5) / 1e5;
}
const ug = (e) => {
  const {
    classes: t,
    disableInteractive: r,
    arrow: n,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !r && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${ot(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return ft(i, lg, t);
}, fg = Re(fl, {
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
}) => $({
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
  [`&[data-popper-placement*="right"] .${xt.arrow}`]: $({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${xt.arrow}`]: $({}, t.isRtl ? {
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
})), mg = Re("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.tooltip, r.touch && t.touch, r.arrow && t.tooltipArrow, t[`tooltipPlacement${ot(r.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => $({
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
  lineHeight: `${dg(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${xt.popper}[data-popper-placement*="left"] &`]: $({
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
  [`.${xt.popper}[data-popper-placement*="right"] &`]: $({
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
  [`.${xt.popper}[data-popper-placement*="top"] &`]: $({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${xt.popper}[data-popper-placement*="bottom"] &`]: $({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), hg = Re("span", {
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
let tn = !1;
const vi = new Vr();
let gr = {
  x: 0,
  y: 0
};
function rn(e, t) {
  return (r, ...n) => {
    t && t(r, ...n), e(r, ...n);
  };
}
const ml = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, i, l, c, d, f, v, g, p, h, u, b, w, S, x, E, y;
  const O = ht({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: N = !1,
    children: I,
    components: j = {},
    componentsProps: B = {},
    describeChild: k = !1,
    disableFocusListener: C = !1,
    disableHoverListener: P = !1,
    disableInteractive: z = !1,
    disableTouchListener: H = !1,
    enterDelay: _ = 100,
    enterNextDelay: F = 0,
    enterTouchDelay: q = 700,
    followCursor: re = !1,
    id: R,
    leaveDelay: M = 0,
    leaveTouchDelay: U = 1500,
    onClose: K,
    onOpen: G,
    open: X,
    placement: J = "bottom",
    PopperComponent: Z,
    PopperProps: Y = {},
    slotProps: Q = {},
    slots: ee = {},
    title: ie,
    TransitionComponent: L = Oo,
    TransitionProps: te
  } = O, D = me(O, pg), se = /* @__PURE__ */ T.isValidElement(I) ? I : /* @__PURE__ */ m("span", {
    children: I
  }), Te = jn(), Pe = Ys(), [xe, Ct] = T.useState(), [$e, it] = T.useState(null), je = T.useRef(!1), st = z || re, Ne = wr(), Vt = wr(), St = wr(), sr = wr(), [qr, ca] = Es({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let lt = qr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = T.useRef(X !== void 0);
    T.useEffect(() => {
      xe && xe.disabled && !ne && ie !== "" && xe.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, xe, ne]);
  }
  const Fn = xs(R), lr = T.useRef(), Xr = Ir(() => {
    lr.current !== void 0 && (document.body.style.WebkitUserSelect = lr.current, lr.current = void 0), sr.clear();
  });
  T.useEffect(() => Xr, [Xr]);
  const pa = (ne) => {
    vi.clear(), tn = !0, ca(!0), G && !lt && G(ne);
  }, Yr = Ir(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      vi.start(800 + M, () => {
        tn = !1;
      }), ca(!1), K && lt && K(ne), Ne.start(Te.transitions.duration.shortest, () => {
        je.current = !1;
      });
    }
  ), Kr = (ne) => {
    je.current && ne.type !== "touchstart" || (xe && xe.removeAttribute("title"), Vt.clear(), St.clear(), _ || tn && F ? Vt.start(tn ? F : _, () => {
      pa(ne);
    }) : pa(ne));
  }, zn = (ne) => {
    Vt.clear(), St.start(M, () => {
      Yr(ne);
    });
  }, {
    isFocusVisibleRef: da,
    onBlur: Ql,
    onFocus: ec,
    ref: tc
  } = ks(), [, ua] = T.useState(!1), fa = (ne) => {
    Ql(ne), da.current === !1 && (ua(!1), zn(ne));
  }, ma = (ne) => {
    xe || Ct(ne.currentTarget), ec(ne), da.current === !0 && (ua(!0), Kr(ne));
  }, ha = (ne) => {
    je.current = !0;
    const Be = se.props;
    Be.onTouchStart && Be.onTouchStart(ne);
  }, rc = (ne) => {
    ha(ne), St.clear(), Ne.clear(), Xr(), lr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", sr.start(q, () => {
      document.body.style.WebkitUserSelect = lr.current, Kr(ne);
    });
  }, nc = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Xr(), St.start(U, () => {
      Yr(ne);
    });
  };
  T.useEffect(() => {
    if (!lt)
      return;
    function ne(Be) {
      (Be.key === "Escape" || Be.key === "Esc") && Yr(Be);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Yr, lt]);
  const oc = qe(se.ref, tc, Ct, r);
  !ie && ie !== 0 && (lt = !1);
  const Un = T.useRef(), ac = (ne) => {
    const Be = se.props;
    Be.onMouseMove && Be.onMouseMove(ne), gr = {
      x: ne.clientX,
      y: ne.clientY
    }, Un.current && Un.current.update();
  }, cr = {}, Hn = typeof ie == "string";
  k ? (cr.title = !lt && Hn && !P ? ie : null, cr["aria-describedby"] = lt ? Fn : null) : (cr["aria-label"] = Hn ? ie : null, cr["aria-labelledby"] = lt && !Hn ? Fn : null);
  const Ue = $({}, cr, D, se.props, {
    className: Ce(D.className, se.props.className),
    onTouchStart: ha,
    ref: oc
  }, re ? {
    onMouseMove: ac
  } : {});
  process.env.NODE_ENV !== "production" && (Ue["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    xe && !xe.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [xe]));
  const pr = {};
  H || (Ue.onTouchStart = rc, Ue.onTouchEnd = nc), P || (Ue.onMouseOver = rn(Kr, Ue.onMouseOver), Ue.onMouseLeave = rn(zn, Ue.onMouseLeave), st || (pr.onMouseOver = Kr, pr.onMouseLeave = zn)), C || (Ue.onFocus = rn(ma, Ue.onFocus), Ue.onBlur = rn(fa, Ue.onBlur), st || (pr.onFocus = ma, pr.onBlur = fa)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const ic = T.useMemo(() => {
    var ne;
    let Be = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (ne = Y.popperOptions) != null && ne.modifiers && (Be = Be.concat(Y.popperOptions.modifiers)), $({}, Y.popperOptions, {
      modifiers: Be
    });
  }, [$e, Y]), dr = $({}, O, {
    isRtl: Pe,
    arrow: N,
    disableInteractive: st,
    placement: J,
    PopperComponentProp: Z,
    touch: je.current
  }), Wn = ug(dr), ga = (n = (o = ee.popper) != null ? o : j.Popper) != null ? n : fg, ba = (a = (i = (l = ee.transition) != null ? l : j.Transition) != null ? i : L) != null ? a : Oo, va = (c = (d = ee.tooltip) != null ? d : j.Tooltip) != null ? c : mg, ya = (f = (v = ee.arrow) != null ? v : j.Arrow) != null ? f : hg, sc = xr(ga, $({}, Y, (g = Q.popper) != null ? g : B.popper, {
    className: Ce(Wn.popper, Y == null ? void 0 : Y.className, (p = (h = Q.popper) != null ? h : B.popper) == null ? void 0 : p.className)
  }), dr), lc = xr(ba, $({}, te, (u = Q.transition) != null ? u : B.transition), dr), cc = xr(va, $({}, (b = Q.tooltip) != null ? b : B.tooltip, {
    className: Ce(Wn.tooltip, (w = (S = Q.tooltip) != null ? S : B.tooltip) == null ? void 0 : w.className)
  }), dr), pc = xr(ya, $({}, (x = Q.arrow) != null ? x : B.arrow, {
    className: Ce(Wn.arrow, (E = (y = Q.arrow) != null ? y : B.arrow) == null ? void 0 : E.className)
  }), dr);
  return /* @__PURE__ */ A(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(se, Ue), /* @__PURE__ */ m(ga, $({
      as: Z ?? fl,
      placement: J,
      anchorEl: re ? {
        getBoundingClientRect: () => ({
          top: gr.y,
          left: gr.x,
          right: gr.x,
          bottom: gr.y,
          width: 0,
          height: 0
        })
      } : xe,
      popperRef: Un,
      open: xe ? lt : !1,
      id: Fn,
      transition: !0
    }, pr, sc, {
      popperOptions: ic,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ m(ba, $({
        timeout: Te.transitions.duration.shorter
      }, ne, lc, {
        children: /* @__PURE__ */ A(va, $({}, cc, {
          children: [ie, N ? /* @__PURE__ */ m(ya, $({}, pc, {
            ref: it
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (ml.propTypes = {
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
  children: Lr.isRequired,
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: s.object
});
const gg = ml;
function yi(e, t, r) {
  return e ? /* @__PURE__ */ m(Fi, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ m("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function hl(e) {
  const {
    onClick: t,
    label: r,
    tooltip: n,
    allowForLeadingIcons: o = !0,
    iconPathBefore: a = void 0,
    iconPathAfter: i = void 0,
    hasAutoFocus: l = !1,
    className: c,
    isDisabled: d = !1,
    isDense: f = !0,
    isSubMenuParent: v = !1,
    hasDisabledGutters: g = !1,
    hasDivider: p = !1,
    focusVisibleClassName: h,
    id: u,
    children: b
  } = e, w = /* @__PURE__ */ m(
    Uc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: d,
      dense: f,
      disableGutters: g,
      divider: p,
      focusVisibleClassName: h,
      onClick: t,
      id: u,
      children: r ? /* @__PURE__ */ A(kt, { children: [
        yi(a, r, !0),
        /* @__PURE__ */ m(Hc, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ m(Fi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ m(Xs, {}) }) : yi(i, r, !1)
      ] }) : b
    }
  );
  return n ? /* @__PURE__ */ m(gg, { title: n, placement: "right", children: /* @__PURE__ */ m("div", { children: w }) }) : w;
}
function gl(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function bg(e) {
  const [t, r] = ae(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (d) => {
    r(d.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let d = gl(a).filter((f) => "menuItem" in f.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === n.id
    ), /* @__PURE__ */ m(ia, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ A(kt, { children: [
    /* @__PURE__ */ m(hl, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ m(
      Wc,
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
const vg = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function ia(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = En(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      gl(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(f).sort(
      (h, u) => (h.group.order || 0) - (u.group.order || 0)
    ), g = [];
    v.forEach((h) => {
      vg(h.id, t.items).forEach(
        (u) => g.push({ item: u, isLastItemInGroup: !1 })
      ), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !0);
    }), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !1);
    const p = g.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: g, allowForLeadingIcons: p };
  }, [o, t]), l = ({ item: f, isLastItemInGroup: v }) => ({
    className: "papi-menu-item",
    label: f.label,
    tooltip: f.tooltip,
    iconPathBefore: "iconPathBefore" in f ? f.iconPathBefore : void 0,
    iconPathAfter: "iconPathAfter" in f ? f.iconPathAfter : void 0,
    hasDivider: v,
    // Set hasDivider to true for the last item in a group
    allowForLeadingIcons: i
  }), [c] = a;
  if (!c)
    return /* @__PURE__ */ m("div", {});
  const d = c.item.group;
  return /* @__PURE__ */ m("div", { role: "menu", "aria-label": d, children: a.map((f, v) => {
    const { item: g } = f, p = l(f);
    if ("command" in g) {
      const h = g.group + v;
      return /* @__PURE__ */ m(
        hl,
        {
          onClick: (u) => {
            r == null || r(u), n(g);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ m(
      bg,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      d + g.id
    );
  }) }, d);
}
function yg(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ m(ia, { ...e, includedGroups: a });
}
function wg({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ A(
    zi,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ m("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ m(Gc, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ m(
          yg,
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
function xg({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = En(() => {
    const i = /* @__PURE__ */ new Map();
    return Object.getOwnPropertyNames(o).forEach((l) => {
      if (l === "isExtensible")
        return;
      const c = l, d = o[c];
      typeof d == "object" && typeof d.order == "number" && !Number.isNaN(d.order) ? i.set(d.order, { id: c, metadata: d }) : console.warn(
        `Property ${l} (${typeof d}) on menu ${n} is not a valid column and is being ignored. This might indicate data corruption`
      );
    }), Array.from(i.values()).sort((l, c) => (l.metadata.order || 0) - (c.metadata.order || 0));
  }, [o, n]);
  return /* @__PURE__ */ m(
    zi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, l) => /* @__PURE__ */ m(
        wg,
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
const bl = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (bl.displayName = "ListContext");
const Eg = bl;
function kg(e) {
  return Ze("MuiList", e);
}
mt("MuiList", ["root", "padding", "dense", "subheader"]);
const Tg = ["children", "className", "component", "dense", "disablePadding", "subheader"], Ng = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return ft({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, kg, t);
}, Og = Re("ul", {
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
}) => $({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), vl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = ht({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: d
  } = n, f = me(n, Tg), v = T.useMemo(() => ({
    dense: l
  }), [l]), g = $({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = Ng(g);
  return /* @__PURE__ */ m(Eg.Provider, {
    value: v,
    children: /* @__PURE__ */ A(Og, $({
      as: i,
      className: Ce(p.root, a),
      ref: r,
      ownerState: g
    }, f, {
      children: [d, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (vl.propTypes = {
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
const Cg = vl, Sg = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function io(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function wi(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function yl(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function br(e, t, r, n, o, a) {
  let i = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !yl(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const wl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: n,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: i,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: d = !1,
    onKeyDown: f,
    variant: v = "selectedMenu"
  } = t, g = me(t, Sg), p = T.useRef(null), h = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  jt(() => {
    o && p.current.focus();
  }, [o]), T.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (x, {
      direction: E
    }) => {
      const y = !p.current.style.width;
      if (x.clientHeight < p.current.clientHeight && y) {
        const O = `${Ts(Se(x))}px`;
        p.current.style[E === "rtl" ? "paddingLeft" : "paddingRight"] = O, p.current.style.width = `calc(100% + ${O})`;
      }
      return p.current;
    }
  }), []);
  const u = (x) => {
    const E = p.current, y = x.key, O = Se(E).activeElement;
    if (y === "ArrowDown")
      x.preventDefault(), br(E, O, d, c, io);
    else if (y === "ArrowUp")
      x.preventDefault(), br(E, O, d, c, wi);
    else if (y === "Home")
      x.preventDefault(), br(E, null, d, c, io);
    else if (y === "End")
      x.preventDefault(), br(E, null, d, c, wi);
    else if (y.length === 1) {
      const N = h.current, I = y.toLowerCase(), j = performance.now();
      N.keys.length > 0 && (j - N.lastTime > 500 ? (N.keys = [], N.repeating = !0, N.previousKeyMatched = !0) : N.repeating && I !== N.keys[0] && (N.repeating = !1)), N.lastTime = j, N.keys.push(I);
      const B = O && !N.repeating && yl(O, N);
      N.previousKeyMatched && (B || br(E, O, !1, c, io, N)) ? x.preventDefault() : N.previousKeyMatched = !1;
    }
    f && f(x);
  }, b = qe(p, r);
  let w = -1;
  T.Children.forEach(i, (x, E) => {
    if (!/* @__PURE__ */ T.isValidElement(x)) {
      w === E && (w += 1, w >= i.length && (w = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && un.isFragment(x) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), x.props.disabled || (v === "selectedMenu" && x.props.selected || w === -1) && (w = E), w === E && (x.props.disabled || x.props.muiSkipListHighlight || x.type.muiSkipListHighlight) && (w += 1, w >= i.length && (w = -1));
  });
  const S = T.Children.map(i, (x, E) => {
    if (E === w) {
      const y = {};
      return a && (y.autoFocus = !0), x.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ T.cloneElement(x, y);
    }
    return x;
  });
  return /* @__PURE__ */ m(Cg, $({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: u,
    tabIndex: o ? 0 : -1
  }, g, {
    children: S
  }));
});
process.env.NODE_ENV !== "production" && (wl.propTypes = {
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
const Rg = wl;
function Pg(e) {
  const t = Se(e);
  return t.body === e ? Zt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Sr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function xi(e) {
  return parseInt(Zt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function $g(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function Ei(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !$g(i);
    l && c && Sr(i, o);
  });
}
function so(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function _g(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (Pg(n)) {
      const i = Ts(Se(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${xi(n) + i}px`;
      const l = Se(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${xi(c) + i}px`;
      });
    }
    let a;
    if (n.parentNode instanceof DocumentFragment)
      a = Se(n).body;
    else {
      const i = n.parentElement, l = Zt(n);
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
function Mg(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class Ig {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Sr(t.modalRef, !1);
    const o = Mg(r);
    Ei(r, t.mount, t.modalRef, o, !0);
    const a = so(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = so(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = _g(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = so(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Sr(t.modalRef, r), Ei(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && Sr(i.modalRef, !1);
    }
    return n;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
const Dg = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Ag(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function jg(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function Bg(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || jg(e));
}
function Lg(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(Dg)).forEach((n, o) => {
    const a = Ag(n);
    a === -1 || !Bg(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function Vg() {
  return !0;
}
function xn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = Lg,
    isEnabled: i = Vg,
    open: l
  } = e, c = T.useRef(!1), d = T.useRef(null), f = T.useRef(null), v = T.useRef(null), g = T.useRef(null), p = T.useRef(!1), h = T.useRef(null), u = qe(t.ref, h), b = T.useRef(null);
  T.useEffect(() => {
    !l || !h.current || (p.current = !r);
  }, [r, l]), T.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Se(h.current);
    return h.current.contains(x.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !h.current)
      return;
    const x = Se(h.current), E = (N) => {
      b.current = N, !(n || !i() || N.key !== "Tab") && x.activeElement === h.current && N.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const N = h.current;
      if (N === null)
        return;
      if (!x.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (N.contains(x.activeElement) || n && x.activeElement !== d.current && x.activeElement !== f.current)
        return;
      if (x.activeElement !== g.current)
        g.current = null;
      else if (g.current !== null)
        return;
      if (!p.current)
        return;
      let I = [];
      if ((x.activeElement === d.current || x.activeElement === f.current) && (I = a(h.current)), I.length > 0) {
        var j, B;
        const k = !!((j = b.current) != null && j.shiftKey && ((B = b.current) == null ? void 0 : B.key) === "Tab"), C = I[0], P = I[I.length - 1];
        typeof C != "string" && typeof P != "string" && (k ? P.focus() : C.focus());
      } else
        N.focus();
    };
    x.addEventListener("focusin", y), x.addEventListener("keydown", E, !0);
    const O = setInterval(() => {
      x.activeElement && x.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(O), x.removeEventListener("focusin", y), x.removeEventListener("keydown", E, !0);
    };
  }, [r, n, o, i, l, a]);
  const w = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0, g.current = x.target;
    const E = t.props.onFocus;
    E && E(x);
  }, S = (x) => {
    v.current === null && (v.current = x.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ A(T.Fragment, {
    children: [/* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: S,
      ref: d,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: u,
      onFocus: w
    }), /* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: S,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (xn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Lr,
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
process.env.NODE_ENV !== "production" && (xn["propTypes"] = bs(xn.propTypes));
const Fg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], zg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, xl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = jn(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: i = !0,
    children: l,
    easing: c,
    in: d,
    onEnter: f,
    onEntered: v,
    onEntering: g,
    onExit: p,
    onExited: h,
    onExiting: u,
    style: b,
    timeout: w = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: S = Js
  } = t, x = me(t, Fg), E = T.useRef(null), y = qe(E, l.ref, r), O = (z) => (H) => {
    if (z) {
      const _ = E.current;
      H === void 0 ? z(_) : z(_, H);
    }
  }, N = O(g), I = O((z, H) => {
    Zs(z);
    const _ = bn({
      style: b,
      timeout: w,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", _), z.style.transition = n.transitions.create("opacity", _), f && f(z, H);
  }), j = O(v), B = O(u), k = O((z) => {
    const H = bn({
      style: b,
      timeout: w,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", H), z.style.transition = n.transitions.create("opacity", H), p && p(z);
  }), C = O(h);
  return /* @__PURE__ */ m(S, $({
    appear: i,
    in: d,
    nodeRef: E,
    onEnter: I,
    onEntered: j,
    onEntering: N,
    onExit: k,
    onExited: C,
    onExiting: B,
    addEndListener: (z) => {
      a && a(E.current, z);
    },
    timeout: w
  }, x, {
    children: (z, H) => /* @__PURE__ */ T.cloneElement(l, $({
      style: $({
        opacity: 0,
        visibility: z === "exited" && !d ? "hidden" : void 0
      }, zg[z], b, l.props.style),
      ref: y
    }, H))
  }));
});
process.env.NODE_ENV !== "production" && (xl.propTypes = {
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
  children: Lr.isRequired,
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
const Ug = xl;
function Hg(e) {
  return Ze("MuiBackdrop", e);
}
mt("MuiBackdrop", ["root", "invisible"]);
const Wg = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Gg = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return ft({
    root: ["root", r && "invisible"]
  }, Hg, t);
}, qg = Re("div", {
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
}) => $({
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
})), El = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const i = ht({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: d = "div",
    components: f = {},
    componentsProps: v = {},
    invisible: g = !1,
    open: p,
    slotProps: h = {},
    slots: u = {},
    TransitionComponent: b = Ug,
    transitionDuration: w
  } = i, S = me(i, Wg), x = $({}, i, {
    component: d,
    invisible: g
  }), E = Gg(x), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ m(b, $({
    in: p,
    timeout: w
  }, S, {
    children: /* @__PURE__ */ m(qg, $({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = u.root) != null ? a : f.Root) != null ? o : d,
      className: Ce(E.root, c, y == null ? void 0 : y.className),
      ownerState: $({}, x, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (El.propTypes = {
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
const Xg = El;
function Yg(e) {
  return typeof e == "function" ? e() : e;
}
function Kg(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Jg = new Ig();
function Zg(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Jg,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: d,
    open: f,
    rootRef: v
  } = e, g = T.useRef({}), p = T.useRef(null), h = T.useRef(null), u = qe(h, v), [b, w] = T.useState(!f), S = Kg(c);
  let x = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (x = !1);
  const E = () => Se(p.current), y = () => (g.current.modalRef = h.current, g.current.mount = p.current, g.current), O = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, N = Ir(() => {
    const _ = Yg(t) || E().body;
    o.add(y(), _), h.current && O();
  }), I = T.useCallback(() => o.isTopModal(y()), [o]), j = Ir((_) => {
    p.current = _, _ && (f && I() ? O() : h.current && Sr(h.current, x));
  }), B = T.useCallback(() => {
    o.remove(y(), x);
  }, [x, o]);
  T.useEffect(() => () => {
    B();
  }, [B]), T.useEffect(() => {
    f ? N() : (!S || !a) && B();
  }, [f, B, S, a, N]);
  const k = (_) => (F) => {
    var q;
    (q = _.onKeyDown) == null || q.call(_, F), !(F.key !== "Escape" || F.which === 229 || // Wait until IME is settled.
    !I()) && (r || (F.stopPropagation(), d && d(F, "escapeKeyDown")));
  }, C = (_) => (F) => {
    var q;
    (q = _.onClick) == null || q.call(_, F), F.target === F.currentTarget && d && d(F, "backdropClick");
  };
  return {
    getRootProps: (_ = {}) => {
      const F = Ps(e);
      delete F.onTransitionEnter, delete F.onTransitionExited;
      const q = $({}, F, _);
      return $({
        role: "presentation"
      }, q, {
        onKeyDown: k(q),
        ref: u
      });
    },
    getBackdropProps: (_ = {}) => {
      const F = _;
      return $({
        "aria-hidden": !0
      }, F, {
        onClick: C(F),
        open: f
      });
    },
    getTransitionProps: () => {
      const _ = () => {
        w(!1), i && i();
      }, F = () => {
        w(!0), l && l(), a && B();
      };
      return {
        onEnter: vo(_, c == null ? void 0 : c.props.onEnter),
        onExited: vo(F, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: u,
    portalRef: j,
    isTopModal: I,
    exited: b,
    hasTransition: S
  };
}
function Qg(e) {
  return Ze("MuiModal", e);
}
mt("MuiModal", ["root", "hidden", "backdrop"]);
const eb = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], tb = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return ft({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, Qg, n);
}, rb = Re("div", {
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
}) => $({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), nb = Re(Xg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), kl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const d = ht({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = nb,
    BackdropProps: v,
    className: g,
    closeAfterTransition: p = !1,
    children: h,
    container: u,
    component: b,
    components: w = {},
    componentsProps: S = {},
    disableAutoFocus: x = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: O = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: I = !1,
    hideBackdrop: j = !1,
    keepMounted: B = !1,
    onBackdropClick: k,
    open: C,
    slotProps: P,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = d, H = me(d, eb), _ = $({}, d, {
    closeAfterTransition: p,
    disableAutoFocus: x,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: O,
    disableRestoreFocus: N,
    disableScrollLock: I,
    hideBackdrop: j,
    keepMounted: B
  }), {
    getRootProps: F,
    getBackdropProps: q,
    getTransitionProps: re,
    portalRef: R,
    isTopModal: M,
    exited: U,
    hasTransition: K
  } = Zg($({}, _, {
    rootRef: r
  })), G = $({}, _, {
    exited: U
  }), X = tb(G), J = {};
  if (h.props.tabIndex === void 0 && (J.tabIndex = "-1"), K) {
    const {
      onEnter: te,
      onExited: D
    } = re();
    J.onEnter = te, J.onExited = D;
  }
  const Z = (n = (o = z == null ? void 0 : z.root) != null ? o : w.Root) != null ? n : rb, Y = (a = (i = z == null ? void 0 : z.backdrop) != null ? i : w.Backdrop) != null ? a : f, Q = (l = P == null ? void 0 : P.root) != null ? l : S.root, ee = (c = P == null ? void 0 : P.backdrop) != null ? c : S.backdrop, ie = Bt({
    elementType: Z,
    externalSlotProps: Q,
    externalForwardedProps: H,
    getSlotProps: F,
    additionalProps: {
      ref: r,
      as: b
    },
    ownerState: G,
    className: Ce(g, Q == null ? void 0 : Q.className, X == null ? void 0 : X.root, !G.open && G.exited && (X == null ? void 0 : X.hidden))
  }), L = Bt({
    elementType: Y,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (te) => q($({}, te, {
      onClick: (D) => {
        k && k(D), te != null && te.onClick && te.onClick(D);
      }
    })),
    className: Ce(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: G
  });
  return !B && !C && (!K || U) ? null : /* @__PURE__ */ m(pl, {
    ref: R,
    container: u,
    disablePortal: O,
    children: /* @__PURE__ */ A(Z, $({}, ie, {
      children: [!j && f ? /* @__PURE__ */ m(Y, $({}, L)) : null, /* @__PURE__ */ m(xn, {
        disableEnforceFocus: E,
        disableAutoFocus: x,
        disableRestoreFocus: N,
        isEnabled: M,
        open: C,
        children: /* @__PURE__ */ T.cloneElement(h, J)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (kl.propTypes = {
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
  children: Lr.isRequired,
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
const ob = kl;
function ab(e) {
  return Ze("MuiPaper", e);
}
mt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const ib = ["className", "component", "elevation", "square", "variant"], sb = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return ft(a, ab, o);
}, lb = Re("div", {
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
  return $({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && $({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${hn("#fff", si(t.elevation))}, ${hn("#fff", si(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), Tl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = ht({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, d = me(n, ib), f = $({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = sb(f);
  return process.env.NODE_ENV !== "production" && jn().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ m(lb, $({
    as: a,
    ownerState: f,
    className: Ce(v.root, o),
    ref: r
  }, d));
});
process.env.NODE_ENV !== "production" && (Tl.propTypes = {
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
  elevation: or(Cs, (e) => {
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
const cb = Tl;
function pb(e) {
  return Ze("MuiPopover", e);
}
mt("MuiPopover", ["root", "paper"]);
const db = ["onEntering"], ub = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], fb = ["slotProps"];
function ki(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function Ti(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function Ni(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function ln(e) {
  return typeof e == "function" ? e() : e;
}
const mb = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"],
    paper: ["paper"]
  }, pb, t);
}, hb = Re(ob, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Nl = Re(cb, {
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
}), Ol = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const i = ht({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: d = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: f,
    anchorReference: v = "anchorEl",
    children: g,
    className: p,
    container: h,
    elevation: u = 8,
    marginThreshold: b = 16,
    open: w,
    PaperProps: S = {},
    slots: x,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: O = Oo,
    transitionDuration: N = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: j = !1
  } = i, B = me(i.TransitionProps, db), k = me(i, ub), C = (n = E == null ? void 0 : E.paper) != null ? n : S, P = T.useRef(), z = qe(P, C.ref), H = $({}, i, {
    anchorOrigin: d,
    anchorReference: v,
    elevation: u,
    marginThreshold: b,
    externalPaperSlotProps: C,
    transformOrigin: y,
    TransitionComponent: O,
    transitionDuration: N,
    TransitionProps: B
  }), _ = mb(H), F = T.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const te = ln(c), D = te && te.nodeType === 1 ? te : Se(P.current).body, se = D.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + ki(se, d.vertical),
      left: se.left + Ti(se, d.horizontal)
    };
  }, [c, d.horizontal, d.vertical, f, v]), q = T.useCallback((te) => ({
    vertical: ki(te, y.vertical),
    horizontal: Ti(te, y.horizontal)
  }), [y.horizontal, y.vertical]), re = T.useCallback((te) => {
    const D = {
      width: te.offsetWidth,
      height: te.offsetHeight
    }, se = q(D);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: Ni(se)
      };
    const Te = F();
    let Pe = Te.top - se.vertical, xe = Te.left - se.horizontal;
    const Ct = Pe + D.height, $e = xe + D.width, it = Zt(ln(c)), je = it.innerHeight - b, st = it.innerWidth - b;
    if (b !== null && Pe < b) {
      const Ne = Pe - b;
      Pe -= Ne, se.vertical += Ne;
    } else if (b !== null && Ct > je) {
      const Ne = Ct - je;
      Pe -= Ne, se.vertical += Ne;
    }
    if (process.env.NODE_ENV !== "production" && D.height > je && D.height && je && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${D.height - je}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), b !== null && xe < b) {
      const Ne = xe - b;
      xe -= Ne, se.horizontal += Ne;
    } else if ($e > st) {
      const Ne = $e - st;
      xe -= Ne, se.horizontal += Ne;
    }
    return {
      top: `${Math.round(Pe)}px`,
      left: `${Math.round(xe)}px`,
      transformOrigin: Ni(se)
    };
  }, [c, v, F, q, b]), [R, M] = T.useState(w), U = T.useCallback(() => {
    const te = P.current;
    if (!te)
      return;
    const D = re(te);
    D.top !== null && (te.style.top = D.top), D.left !== null && (te.style.left = D.left), te.style.transformOrigin = D.transformOrigin, M(!0);
  }, [re]);
  T.useEffect(() => (j && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, j, U]);
  const K = (te, D) => {
    I && I(te, D), U();
  }, G = () => {
    M(!1);
  };
  T.useEffect(() => {
    w && U();
  }), T.useImperativeHandle(l, () => w ? {
    updatePosition: () => {
      U();
    }
  } : null, [w, U]), T.useEffect(() => {
    if (!w)
      return;
    const te = ws(() => {
      U();
    }), D = Zt(c);
    return D.addEventListener("resize", te), () => {
      te.clear(), D.removeEventListener("resize", te);
    };
  }, [c, w, U]);
  let X = N;
  N === "auto" && !O.muiSupportAuto && (X = void 0);
  const J = h || (c ? Se(ln(c)).body : void 0), Z = (o = x == null ? void 0 : x.root) != null ? o : hb, Y = (a = x == null ? void 0 : x.paper) != null ? a : Nl, Q = Bt({
    elementType: Y,
    externalSlotProps: $({}, C, {
      style: R ? C.style : $({}, C.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: u,
      ref: z
    },
    ownerState: H,
    className: Ce(_.paper, C == null ? void 0 : C.className)
  }), ee = Bt({
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
      container: J,
      open: w
    },
    ownerState: H,
    className: Ce(_.root, p)
  }), {
    slotProps: ie
  } = ee, L = me(ee, fb);
  return /* @__PURE__ */ m(Z, $({}, L, !Rs(Z) && {
    slotProps: ie,
    disableScrollLock: j
  }, {
    children: /* @__PURE__ */ m(O, $({
      appear: !0,
      in: w,
      onEntering: K,
      onExited: G,
      timeout: X
    }, B, {
      children: /* @__PURE__ */ m(Y, $({}, Q, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ol.propTypes = {
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
  anchorEl: or(s.oneOfType([pt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = ln(e.anchorEl);
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
  elevation: Cs,
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
    component: cd
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object
});
const gb = Ol;
function bb(e) {
  return Ze("MuiMenu", e);
}
mt("MuiMenu", ["root", "paper", "list"]);
const vb = ["onEntering"], yb = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], wb = {
  vertical: "top",
  horizontal: "right"
}, xb = {
  vertical: "top",
  horizontal: "left"
}, Eb = (e) => {
  const {
    classes: t
  } = e;
  return ft({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, bb, t);
}, kb = Re(gb, {
  shouldForwardProp: (e) => Gs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Tb = Re(Nl, {
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
}), Nb = Re(Rg, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), Cl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o;
  const a = ht({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: l,
    className: c,
    disableAutoFocusItem: d = !1,
    MenuListProps: f = {},
    onClose: v,
    open: g,
    PaperProps: p = {},
    PopoverClasses: h,
    transitionDuration: u = "auto",
    TransitionProps: {
      onEntering: b
    } = {},
    variant: w = "selectedMenu",
    slots: S = {},
    slotProps: x = {}
  } = a, E = me(a.TransitionProps, vb), y = me(a, yb), O = Ys(), N = $({}, a, {
    autoFocus: i,
    disableAutoFocusItem: d,
    MenuListProps: f,
    onEntering: b,
    PaperProps: p,
    transitionDuration: u,
    TransitionProps: E,
    variant: w
  }), I = Eb(N), j = i && !d && g, B = T.useRef(null), k = (q, re) => {
    B.current && B.current.adjustStyleForScrollbar(q, {
      direction: O ? "rtl" : "ltr"
    }), b && b(q, re);
  }, C = (q) => {
    q.key === "Tab" && (q.preventDefault(), v && v(q, "tabKeyDown"));
  };
  let P = -1;
  T.Children.map(l, (q, re) => {
    /* @__PURE__ */ T.isValidElement(q) && (process.env.NODE_ENV !== "production" && un.isFragment(q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), q.props.disabled || (w === "selectedMenu" && q.props.selected || P === -1) && (P = re));
  });
  const z = (n = S.paper) != null ? n : Tb, H = (o = x.paper) != null ? o : p, _ = Bt({
    elementType: S.root,
    externalSlotProps: x.root,
    ownerState: N,
    className: [I.root, c]
  }), F = Bt({
    elementType: z,
    externalSlotProps: H,
    ownerState: N,
    className: I.paper
  });
  return /* @__PURE__ */ m(kb, $({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: O ? "right" : "left"
    },
    transformOrigin: O ? wb : xb,
    slots: {
      paper: z,
      root: S.root
    },
    slotProps: {
      root: _,
      paper: F
    },
    open: g,
    ref: r,
    transitionDuration: u,
    TransitionProps: $({
      onEntering: k
    }, E),
    ownerState: N
  }, y, {
    classes: h,
    children: /* @__PURE__ */ m(Nb, $({
      onKeyDown: C,
      actions: B,
      autoFocus: i && (P === -1 || d),
      autoFocusItem: j,
      variant: w
    }, f, {
      className: Ce(I.list, f.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Cl.propTypes = {
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
   * By default, the element is based on this [`Transition`](https://reactcommunity.org/react-transition-group/transition/) component.
   * @default {}
   */
  TransitionProps: s.object,
  /**
   * The variant to use. Use `menu` to prevent selected items from impacting the initial focus.
   * @default 'selectedMenu'
   */
  variant: s.oneOf(["menu", "selectedMenu"])
});
const Ob = Cl;
function $0({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var d;
  const [o, a] = W.useState(void 0), i = Oe(
    (f) => {
      f.preventDefault(), a(
        o === void 0 ? {
          mouseX: f.clientX + 2,
          mouseY: f.clientY - 6
        } : (
          // repeated contextmenu when it is already open closes it with Chrome 84 on Ubuntu
          // Other native context menus might behave different.
          // With this behavior we prevent re-locating existing context menus.
          void 0
        )
      );
    },
    [o]
  ), l = Oe(() => {
    a(void 0);
  }, []), c = En(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((d = r == null ? void 0 : r.items) == null ? void 0 : d.length) ?? 0) === 0 || !n ? n : /* @__PURE__ */ A(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        n,
        /* @__PURE__ */ m(
          Ob,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ m(
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
function Cb(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const Ro = (e, t, r = {}) => {
  const n = It(t);
  n.current = t;
  const o = It(r);
  o.current = Cb(o.current);
  const [a, i] = ae(() => n.current), [l, c] = ae(!0);
  return Fe(() => {
    let d = !0;
    return c(!!e), (async () => {
      if (e) {
        const f = await e();
        d && (i(() => f), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || i(() => n.current);
    };
  }, [e]), [a, l];
}, Sb = qs(/* @__PURE__ */ m("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Rb({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, d] = ae(!1), [f, v] = ae(!1), g = Oe(() => {
    c && d(!1), v(!1);
  }, [c]), p = Oe((E) => {
    E.stopPropagation(), d((y) => {
      const O = !y;
      return O && E.shiftKey ? v(!0) : O || v(!1), O;
    });
  }, []), h = Oe(
    (E) => (g(), n(E)),
    [n, g]
  ), [u, b] = ae({ top: 1, left: 1 });
  Fe(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), O = window.scrollY, N = window.scrollX, I = y.top + O + E.clientHeight, j = y.left + N;
        b({ top: I, left: j });
      }
    }
  }, [c, o]);
  const [w] = Ro(
    Oe(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [S] = Ro(
    Oe(async () => (e == null ? void 0 : e(!0)) ?? r ?? w, [e, r, w, c]),
    r ?? w
  ), x = f && S ? S : w;
  return /* @__PURE__ */ A(kt, { children: [
    /* @__PURE__ */ m(
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
        onClick: p,
        children: l ?? /* @__PURE__ */ m(Sb, {})
      }
    ),
    /* @__PURE__ */ m(
      qc,
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
        children: x ? /* @__PURE__ */ m(
          xg,
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
function _0({
  id: e,
  label: t,
  isDisabled: r = !1,
  tooltip: n,
  isTooltipSuppressed: o = !1,
  adjustMarginToAlignToEdge: a = !1,
  size: i = "medium",
  className: l,
  onClick: c,
  children: d
}) {
  return /* @__PURE__ */ m(
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
      children: d
    }
  );
}
const yt = "scrBook", Pb = "scrRef", _t = "source", $b = "details", _b = "Scripture Reference", Mb = "Scripture Book", Sl = "Type", Ib = "Details";
function Db(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${fe.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: yt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? _b,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? fe.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === yt ? qn(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => mo(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => qn(n.start),
      id: Pb,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : qn(o.start);
      },
      sortingFn: (n, o) => mo(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: _t,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? Sl : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: $b,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Ib,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
function M0({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, d] = ae([]), [f, v] = ae([{ id: yt, desc: !1 }]), [g, p] = ae(() => e.flatMap((k) => {
    const C = k.source;
    return k.data.map((P) => ({
      ...P,
      source: C
    }));
  })), [h, u] = ae({});
  Fe(() => {
    p(() => e.flatMap((k) => {
      const C = k.source;
      return k.data.map((P) => ({
        ...P,
        source: C
      }));
    }));
  }, [e]);
  const b = En(
    () => Db(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      r
    ),
    [n, a, i, r]
  );
  Fe(() => {
    c.includes(_t) ? v([
      { id: _t, desc: !1 },
      { id: yt, desc: !1 }
    ]) : v([{ id: yt, desc: !1 }]);
  }, [c]);
  const w = Oe(
    (k, C) => !C || mo(k, C) === 0 ? `${Gn(k)}` : `${Gn(k)}-${Gn(C)}`,
    []
  ), S = Oe(
    (k) => `${w(k.start, k.end)} ${k.source} ${k.detail}`,
    [w]
  ), x = Bi({
    data: g,
    columns: b,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: h
    },
    onGroupingChange: d,
    onSortingChange: v,
    onRowSelectionChange: u,
    getExpandedRowModel: Bc(),
    getGroupedRowModel: Lc(),
    getCoreRowModel: Li(),
    getSortedRowModel: Vi(),
    getRowId: S,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Fe(() => {
    if (l) {
      const k = x.getSelectedRowModel().rowsById, C = Object.keys(k);
      if (C.length === 1) {
        const P = g.find((z) => S(z) === C[0]) || void 0;
        P && l(P);
      }
    }
  }, [h, g, S, l, x]);
  const E = o ?? Mb, y = a ?? Sl, O = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${E}`, value: [yt] },
    { label: `Group by ${y}`, value: [_t] },
    {
      label: `Group by ${E} and ${y}`,
      value: [yt, _t]
    },
    {
      label: `Group by ${y} and ${E}`,
      value: [_t, yt]
    }
  ], N = (k) => {
    d(JSON.parse(k));
  }, I = (k, C) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(C);
  }, j = (k, C) => k.getIsGrouped() ? "" : V("banded-row", C % 2 === 0 ? "even" : "odd"), B = (k, C, P) => {
    if (!((k == null ? void 0 : k.length) === 0 || C.depth < P.column.getGroupedIndex())) {
      if (C.getIsGrouped())
        switch (C.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (C.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ A("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !t && /* @__PURE__ */ A(
      pn,
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          N(k);
        },
        children: [
          /* @__PURE__ */ m(Pr, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ m(dn, {}) }),
          /* @__PURE__ */ m($r, { position: "item-aligned", children: /* @__PURE__ */ m(_p, { children: O.map((k) => /* @__PURE__ */ m(Qe, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ A(Nn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ m(On, { children: x.getHeaderGroups().map((k) => /* @__PURE__ */ m(Et, { children: k.headers.filter((C) => C.column.columnDef.header).map((C) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ m(_r, { colSpan: C.colSpan, className: "top-0 pr-sticky", children: C.isPlaceholder ? void 0 : /* @__PURE__ */ A("div", { children: [
          C.column.getCanGroup() ? /* @__PURE__ */ m(
            ye,
            {
              variant: "ghost",
              title: `Toggle grouping by ${C.column.columnDef.header}`,
              onClick: C.column.getToggleGroupingHandler(),
              type: "button",
              children: C.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          kr(C.column.columnDef.header, C.getContext())
        ] }) }, C.id)
      )) }, k.id)) }),
      /* @__PURE__ */ m(Cn, { children: x.getRowModel().rows.map((k, C) => /* @__PURE__ */ m(
        Et,
        {
          "data-state": k.getIsSelected() ? "selected" : "",
          className: V(j(k, C)),
          onClick: (P) => I(k, P),
          children: k.getVisibleCells().map((P) => {
            if (!(P.getIsPlaceholder() || P.column.columnDef.enableGrouping && !P.getIsGrouped() && (P.column.columnDef.id !== _t || !r)))
              return /* @__PURE__ */ m(
                Jt,
                {
                  className: V(
                    P.column.columnDef.id,
                    "pr-p-[1px]",
                    B(c, k, P)
                  ),
                  children: (() => P.getIsGrouped() ? /* @__PURE__ */ A(
                    ye,
                    {
                      variant: "ghost",
                      onClick: k.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        k.getIsExpanded() ? "👇" : "👉",
                        " ",
                        kr(P.column.columnDef.cell, P.getContext()),
                        " (",
                        k.subRows.length,
                        ")"
                      ]
                    }
                  ) : kr(P.column.columnDef.cell, P.getContext()))()
                },
                P.id
              );
          })
        },
        k.id
      )) })
    ] })
  ] });
}
function Ab({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = ae(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ m(
    Br,
    {
      className: V(
        "pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        { "pr-w-full": r }
      ),
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
function I0({
  id: e,
  isDisabled: t = !1,
  orientation: r = "horizontal",
  min: n = 0,
  max: o = 100,
  step: a = 1,
  showMarks: i = !1,
  defaultValue: l,
  value: c,
  valueLabelDisplay: d = "off",
  className: f,
  onChange: v,
  onChangeCommitted: g
}) {
  return /* @__PURE__ */ m(
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
      valueLabelDisplay: d,
      className: `papi-slider ${r} ${f ?? ""}`,
      onChange: v,
      onChangeCommitted: g
    }
  );
}
function D0({
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
  return /* @__PURE__ */ m(
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
const Rl = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Root,
  {
    orientation: "vertical",
    ref: r,
    className: V("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Rl.displayName = Ae.List.displayName;
const Pl = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: r,
    className: V(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Pl.displayName = Ae.List.displayName;
const jb = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Trigger,
  {
    ref: r,
    ...t,
    className: V(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), $l = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Content,
  {
    ref: r,
    className: V(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
$l.displayName = Ae.Content.displayName;
function A0({
  tabList: e,
  onSearch: t,
  searchPlaceholder: r,
  headerTitle: n,
  isSearchBarFullWidth: o = !1
}) {
  return /* @__PURE__ */ A("div", { children: [
    /* @__PURE__ */ A("div", { className: "pr-space-y-2 pr-pb-2", children: [
      n ? /* @__PURE__ */ m("h1", { children: n }) : "",
      /* @__PURE__ */ m(
        Ab,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ A(Rl, { children: [
      /* @__PURE__ */ m(Pl, { children: e.map((a) => /* @__PURE__ */ m(jb, { value: a.value, children: a.value }, a.key)) }),
      e.map((a) => /* @__PURE__ */ m($l, { value: a.value, children: a.content }, a.key))
    ] })
  ] });
}
const _l = T.forwardRef(({ className: e, orientation: t = "horizontal", decorative: r = !0, ...n }, o) => /* @__PURE__ */ m(
  Wi.Root,
  {
    ref: o,
    decorative: r,
    orientation: t,
    className: V(
      "pr-shrink-0 pr-bg-border",
      t === "horizontal" ? "pr-h-[1px] pr-w-full" : "pr-h-full pr-w-[1px]",
      e
    ),
    ...n
  }
));
_l.displayName = Wi.Root.displayName;
function j0({ children: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-twp pr-grid", children: e });
}
function B0({
  primary: e,
  secondary: t,
  generateActionComponent: r,
  isLoading: n = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ m("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ m("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ m("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : r()
  ] });
}
function L0({ primary: e, secondary: t, includeSeparator: r = !1 }) {
  return /* @__PURE__ */ A("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ A("div", { children: [
      /* @__PURE__ */ m("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ m("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ m(_l, {}) : ""
  ] });
}
function V0({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ m(
    Kc,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
const Bb = Mo(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), Ml = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(Gi.Root, { ref: r, className: V(Bb(), e), ...t }));
Ml.displayName = Gi.Root.displayName;
function F0({
  id: e,
  isDisabled: t = !1,
  hasError: r = !1,
  isFullWidth: n = !1,
  helperText: o,
  label: a,
  placeholder: i,
  isRequired: l = !1,
  className: c,
  defaultValue: d,
  value: f,
  onChange: v,
  onFocus: g,
  onBlur: p
}) {
  return /* @__PURE__ */ A("div", { className: V("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ m(
      Ml,
      {
        htmlFor: e,
        className: V({
          "pr-text-red-600": r,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ m(
      Br,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: V(c, { "pr-border-red-600": r }),
        defaultValue: d,
        value: f,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ m("p", { className: V({ "pr-hidden": !o }), children: o })
  ] });
}
function z0({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = It(void 0);
  return /* @__PURE__ */ m("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ m(Jc, { position: "static", id: n, children: /* @__PURE__ */ A(Zc, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ m(
      Rb,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ m("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const U0 = Ae.Root, Lb = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: r,
    className: V(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Lb.displayName = Ae.List.displayName;
const Vb = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Trigger,
  {
    ref: r,
    className: V(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Vb.displayName = Ae.Trigger.displayName;
const Fb = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Content,
  {
    ref: r,
    className: V(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Fb.displayName = Ae.Content.displayName;
const nn = (e) => e === "asc" ? /* @__PURE__ */ m(Cc, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ m(Sc, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ m(Rc, { className: "pr-ml-2 pr-h-4 pr-w-4" }), zb = (e, t, r, n, o) => [
  {
    accessorKey: "character",
    header: ({ column: a }) => /* @__PURE__ */ A(ye, { onClick: () => a.toggleSorting(void 0), children: [
      e,
      nn(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: a }) => /* @__PURE__ */ A(ye, { onClick: () => a.toggleSorting(void 0), children: [
      t,
      nn(a.getIsSorted())
    ] }),
    cell: ({ row: a }) => a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: a }) => /* @__PURE__ */ A(ye, { onClick: () => a.toggleSorting(void 0), children: [
      r,
      nn(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: a, table: i }) => {
      const l = i.getSelectedRowModel().rows, c = [];
      return l.forEach((d) => {
        c.push(d.getValue("character"));
      }), /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ m("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ A(ye, { onClick: () => a.toggleSorting(void 0), children: [
          n,
          nn(a.getIsSorted())
        ] }) }),
        /* @__PURE__ */ A("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ m(ye, { children: /* @__PURE__ */ m(
            xa,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ m(ye, { children: /* @__PURE__ */ m(
            Ea,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ m(ye, { children: /* @__PURE__ */ m(
            ka,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, void 0);
              }
            }
          ) })
        ] })
      ] });
    },
    cell: ({ row: a }) => {
      const i = a.getValue("status");
      return i === !0 ? /* @__PURE__ */ m(xa, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : i === !1 ? /* @__PURE__ */ m(Ea, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ m(ka, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function Ub({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: r,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_table_header_character%"], a = n["%webView_inventory_table_header_unicode_value%"], i = n["%webView_inventory_table_header_count%"], l = n["%webView_inventory_table_header_status%"], c = (d, f) => {
    f.toggleAllRowsSelected(!1), d.toggleSelected(void 0), r(d.getValue("character"));
  };
  return /* @__PURE__ */ m("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ m(
    Bp,
    {
      columns: zb(
        o,
        a,
        i,
        l,
        t
      ),
      data: e,
      onRowClickHandler: c
    }
  ) });
}
const Oi = (e, t, r) => {
  if (!e || e === "" || t === "")
    return [];
  const n = [], o = e.split(`
`);
  let a = "0", i = "0", l = 0;
  return o.forEach((c) => {
    const d = c.split(/\s+/);
    c.startsWith("\\c") && ([, a] = d, i = "0"), c.startsWith("\\v") && ([, i] = d, a === "0" && (a = r.chapterNum.toString()));
    for (let f = 0; f < d.length; f++)
      if (d[f].includes(t)) {
        const v = Math.max(0, f - 2), g = Math.min(d.length, f + 3), p = d.slice(v, g).join(" "), h = {
          reference: { ...r, chapterNum: +a, verseNum: +i },
          snippet: p,
          key: l
        };
        l += 1, n.push(h);
      }
  }), n;
};
function Hb({
  selectedCharacter: e,
  text: t,
  scriptureReference: r,
  setScriptureReference: n,
  localizedStrings: o
}) {
  const a = o["%webView_inventory_occurrences_table_header_reference%"], i = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = ae(
    Oi(t, e, r)
  );
  return Fe(
    () => c(Oi(t, e, r)),
    [t, e, r]
  ), /* @__PURE__ */ A(Nn, { children: [
    /* @__PURE__ */ m(On, { children: /* @__PURE__ */ A(Et, { children: [
      /* @__PURE__ */ m(_r, { children: a }),
      /* @__PURE__ */ m(_r, { children: i })
    ] }) }),
    /* @__PURE__ */ m(Cn, { children: l.map((d) => /* @__PURE__ */ A(
      Et,
      {
        onClick: () => {
          n(d.reference);
        },
        children: [
          /* @__PURE__ */ m(Jt, { children: `${fe.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}` }),
          /* @__PURE__ */ m(Jt, { children: d.snippet })
        ]
      },
      d.key
    )) })
  ] });
}
const Wb = async (e, t, r, n, o) => {
  const a = [];
  return Dc(e, "").forEach((i) => {
    if (r !== "" && !i.includes(r))
      return;
    const l = a.find((c) => c.character === i);
    if (l)
      l.count += 1;
    else {
      let c;
      if (n.includes(i) && (c = !0), o.includes(i) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const d = {
          character: i,
          count: 1,
          status: c
        };
        a.push(d);
      }
    }
  }), a;
};
function H0({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  projectId: n,
  getSetting: o,
  setSetting: a,
  getText: i
}) {
  const l = r["%webView_characterInventory_characters_all%"], c = r["%webView_characterInventory_characters_approved%"], d = r["%webView_characterInventory_characters_unapproved%"], f = r["%webView_characterInventory_characters_unknown%"], v = r["%webView_inventory_scope_book%"], g = r["%webView_inventory_scope_chapter%"], p = r["%webView_inventory_scope_verse%"], h = r["%webView_inventory_filter_text%"], [u, b] = ae([]), [w, S] = ae([]), [x, E] = ae(void 0), [y, O] = ae("book"), [N, I] = ae("all"), [j, B] = ae(""), [k, C] = ae([]), [P, z] = ae(""), H = (_, F) => {
    C((q) => {
      let re = [];
      return _.forEach((R) => {
        re = q.map((M) => M.character === R && M.status !== F ? { ...M, status: F } : M);
      }), b((R) => {
        let M = [...R];
        return _.forEach((U) => {
          F === !0 ? M.includes(U) || M.push(U) : M = M.filter((K) => K !== U);
        }), a("validCharacters", n, M), M;
      }), S((R) => {
        let M = [...R];
        return _.forEach((U) => {
          F === !1 ? M.includes(U) || M.push(U) : M = M.filter(
            (K) => K !== U
          );
        }), a("invalidCharacters", n, M), M;
      }), re;
    });
  };
  return Fe(() => {
    (async () => {
      try {
        b(await o("validCharacters", n)), S(await o("invalidCharacters", n));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [n, o]), Fe(() => {
    (async () => {
      try {
        const F = await i(n, e, y);
        E(F);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [n, e, y, i]), Fe(() => {
    if (!x) {
      C([]);
      return;
    }
    (async () => {
      try {
        C(
          await Wb(x, N, j, u, w)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [u, w, x, N, j]), /* @__PURE__ */ A("div", { className: "pr-twp", children: [
    /* @__PURE__ */ A("div", { className: "pr-flex", children: [
      /* @__PURE__ */ A(
        pn,
        {
          onValueChange: (_) => I(_),
          defaultValue: N,
          children: [
            /* @__PURE__ */ m(Pr, { children: /* @__PURE__ */ m(dn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ A($r, { children: [
              /* @__PURE__ */ m(Qe, { value: "all", children: l }),
              /* @__PURE__ */ m(Qe, { value: "approved", children: c }),
              /* @__PURE__ */ m(Qe, { value: "unapproved", children: d }),
              /* @__PURE__ */ m(Qe, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ A(pn, { onValueChange: (_) => O(_), defaultValue: y, children: [
        /* @__PURE__ */ m(Pr, { children: /* @__PURE__ */ m(dn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ A($r, { children: [
          /* @__PURE__ */ m(Qe, { value: "book", children: v }),
          /* @__PURE__ */ m(Qe, { value: "chapter", children: g }),
          /* @__PURE__ */ m(Qe, { value: "verse", children: p })
        ] })
      ] }),
      /* @__PURE__ */ m(
        Br,
        {
          className: "pr-rounded-md pr-border",
          placeholder: h,
          value: j,
          onChange: (_) => {
            B(_.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ m(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${P !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ m(
          Ub,
          {
            tableData: k,
            onStatusChange: H,
            onSelectCharacter: (_) => {
              z(_);
            },
            localizedStrings: r
          }
        )
      }
    ),
    P !== "" && /* @__PURE__ */ m("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ m(
      Hb,
      {
        selectedCharacter: P,
        text: x,
        scriptureReference: e,
        setScriptureReference: (_) => t(_),
        localizedStrings: r
      }
    ) })
  ] });
}
function W0({
  isInstalling: e,
  handleClick: t,
  buttonText: r
}) {
  return /* @__PURE__ */ m(
    ye,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600": !r,
          "pr-w-20": r
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ m(kn, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ A(kt, { children: [
        /* @__PURE__ */ m(Pc, { size: 25, className: V("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function G0({ isEnabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    ye,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ A(kt, { children: [
        /* @__PURE__ */ m(kn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function q0({ isDisabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    ye,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ A(kt, { children: [
        /* @__PURE__ */ m(kn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function X0({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    ye,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ A(kt, { children: [
        /* @__PURE__ */ m(kn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
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
const Gb = ["children", "options"];
var Ci, Si;
(function(e) {
  e.blockQuote = "0", e.breakLine = "1", e.breakThematic = "2", e.codeBlock = "3", e.codeFenced = "4", e.codeInline = "5", e.footnote = "6", e.footnoteReference = "7", e.gfmTask = "8", e.heading = "9", e.headingSetext = "10", e.htmlBlock = "11", e.htmlComment = "12", e.htmlSelfClosing = "13", e.image = "14", e.link = "15", e.linkAngleBraceStyleDetector = "16", e.linkBareUrlDetector = "17", e.linkMailtoDetector = "18", e.newlineCoalescer = "19", e.orderedList = "20", e.paragraph = "21", e.ref = "22", e.refImage = "23", e.refLink = "24", e.table = "25", e.tableSeparator = "26", e.text = "27", e.textBolded = "28", e.textEmphasized = "29", e.textEscaped = "30", e.textMarked = "31", e.textStrikethroughed = "32", e.unorderedList = "33";
})(Ci || (Ci = {})), function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
}(Si || (Si = {}));
const Ri = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), Pi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, qb = ["style", "script"], Xb = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Yb = /mailto:/i, Kb = /\n{2,}$/, Il = /^(\s*>[\s\S]*?)(?=\n{2,})/, Jb = /^ *> ?/gm, Zb = /^ {2,}\n/, Qb = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, Dl = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, Al = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, ev = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, tv = /^(?:\n *)*\n/, rv = /\r\n?/g, nv = /^\[\^([^\]]+)](:(.*)((\n+ {4,}.*)|(\n(?!\[\^).+))*)/, ov = /^\[\^([^\]]+)]/, av = /\f/g, iv = /^---[ \t]*\n(.|\n)*\n---[ \t]*\n/, sv = /^\s*?\[(x|\s)\]/, jl = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Bl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, Ll = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, Po = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?((?:[^>]*[^/])?)>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1\b)[\s\S])*?)<\/\1>(?!<\/\1>)\n*/i, lv = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, Vl = /^<!--[\s\S]*?(?:-->)/, cv = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, $o = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, pv = /^\{.*\}$/, dv = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, uv = /^<([^ >]+@[^ >]+)>/, fv = /^<([^ >]+:\/[^ >]+)>/, mv = /-([a-z])?/gi, Fl = /^(.*\|.*)\n(?: *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*))?\n?/, hv = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, gv = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, bv = /^\[([^\]]*)\] ?\[([^\]]*)\]/, vv = /(\[|\])/g, yv = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, wv = /\t/g, xv = /(^ *\||\| *$)/g, Ev = /^ *:-+: *$/, kv = /^ *:-+ *$/, Tv = /^ *-+: *$/, Vn = "((?:\\[.*?\\][([].*?[)\\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~~.*?~~|==.*?==|.|\\n)*?)", Nv = new RegExp(`^([*_])\\1${Vn}\\1\\1(?!\\1)`), Ov = new RegExp(`^([*_])${Vn}\\1(?!\\1|\\w)`), Cv = new RegExp(`^==${Vn}==`), Sv = new RegExp(`^~~${Vn}~~`), Rv = /^\\([^0-9A-Za-z\s])/, Pv = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, $v = /^\n+/, _v = /^([ \t]*)/, Mv = /\\([^\\])/g, $i = / *\n+$/, Iv = /(?:^|\n)( *)$/, sa = "(?:\\d+\\.)", la = "(?:[*+-])";
function zl(e) {
  return "( *)(" + (e === 1 ? sa : la) + ") +";
}
const Ul = zl(1), Hl = zl(2);
function Wl(e) {
  return new RegExp("^" + (e === 1 ? Ul : Hl));
}
const Dv = Wl(1), Av = Wl(2);
function Gl(e) {
  return new RegExp("^" + (e === 1 ? Ul : Hl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? sa : la) + " )[^\\n]*)*(\\n|$)", "gm");
}
const ql = Gl(1), Xl = Gl(2);
function Yl(e) {
  const t = e === 1 ? sa : la;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Kl = Yl(1), Jl = Yl(2);
function _i(e, t) {
  const r = t === 1, n = r ? Kl : Jl, o = r ? ql : Xl, a = r ? Dv : Av;
  return { match(i, l, c) {
    const d = Iv.exec(c);
    return d && (l.list || !l.inline && !l.simple) ? n.exec(i = d[1] + i) : null;
  }, order: 1, parse(i, l, c) {
    const d = r ? +i[2] : void 0, f = i[0].replace(Kb, `
`).match(o);
    let v = !1;
    return { items: f.map(function(g, p) {
      const h = a.exec(g)[0].length, u = new RegExp("^ {1," + h + "}", "gm"), b = g.replace(u, "").replace(a, ""), w = p === f.length - 1, S = b.indexOf(`

`) !== -1 || w && v;
      v = S;
      const x = c.inline, E = c.list;
      let y;
      c.list = !0, S ? (c.inline = !1, y = b.replace($i, `

`)) : (c.inline = !0, y = b.replace($i, ""));
      const O = l(y, c);
      return c.inline = x, c.list = E, O;
    }), ordered: r, start: d };
  }, render: (i, l, c) => e(i.ordered ? "ol" : "ul", { key: c.key, start: i.type === "20" ? i.start : void 0 }, i.items.map(function(d, f) {
    return e("li", { key: f }, l(d, c));
  })) };
}
const jv = new RegExp(`^\\[((?:\\[[^\\]]*\\]|[^\\[\\]]|\\](?=[^\\[]*\\]))*)\\]\\(\\s*<?((?:\\([^)]*\\)|[^\\s\\\\]|\\\\.)*?)>?(?:\\s+['"]([\\s\\S]*?)['"])?\\s*\\)`), Bv = /^!\[(.*?)\]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Zl = [Il, Dl, Al, jl, Ll, Bl, Vl, Fl, ql, Kl, Xl, Jl], Lv = [...Zl, /^[^\n]+(?:  \n|\n{2,})/, Po, $o];
function Vv(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Fv(e) {
  return Tv.test(e) ? "right" : Ev.test(e) ? "center" : kv.test(e) ? "left" : null;
}
function Mi(e, t, r, n) {
  const o = r.inTable;
  r.inTable = !0;
  let a = e.trim().split(/( *(?:`[^`]*`|<.*?>.*?<\/.*?>(?!<\/.*?>)|\\\||\|) *)/).reduce((l, c) => (c.trim() === "|" ? l.push(n ? { type: "26" } : { type: "27", text: c }) : c !== "" && l.push.apply(l, t(c, r)), l), []);
  r.inTable = o;
  let i = [[]];
  return a.forEach(function(l, c) {
    l.type === "26" ? c !== 0 && c !== a.length - 1 && i.push([]) : (l.type !== "27" || a[c + 1] != null && a[c + 1].type !== "26" || (l.text = l.text.trimEnd()), i[i.length - 1].push(l));
  }), i;
}
function zv(e, t, r) {
  r.inline = !0;
  const n = e[2] ? e[2].replace(xv, "").split("|").map(Fv) : [], o = e[3] ? function(i, l, c) {
    return i.trim().split(`
`).map(function(d) {
      return Mi(d, l, c, !0);
    });
  }(e[3], t, r) : [], a = Mi(e[1], t, r, !!o.length);
  return r.inline = !1, o.length ? { align: n, cells: o, header: a, type: "25" } : { children: a, type: "21" };
}
function Ii(e, t) {
  return e.align[t] == null ? {} : { textAlign: e.align[t] };
}
function bt(e) {
  return function(t, r) {
    return r.inline ? e.exec(t) : null;
  };
}
function vt(e) {
  return function(t, r) {
    return r.inline || r.simple ? e.exec(t) : null;
  };
}
function ct(e) {
  return function(t, r) {
    return r.inline || r.simple ? null : e.exec(t);
  };
}
function vr(e) {
  return function(t) {
    return e.exec(t);
  };
}
function Uv(e, t, r) {
  if (t.inline || t.simple || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !Zl.some((i) => i.test(a)) && (n += a + `
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
function Di(e) {
  return e.replace(Mv, "$1");
}
function cn(e, t, r) {
  const n = r.inline || !1, o = r.simple || !1;
  r.inline = !0, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = o, a;
}
function Hv(e, t, r) {
  const n = r.inline || !1, o = r.simple || !1;
  r.inline = !1, r.simple = !0;
  const a = e(t, r);
  return r.inline = n, r.simple = o, a;
}
function Wv(e, t, r) {
  const n = r.inline || !1;
  r.inline = !1;
  const o = e(t, r);
  return r.inline = n, o;
}
const lo = (e, t, r) => ({ children: cn(t, e[1], r) });
function co() {
  return {};
}
function po() {
  return null;
}
function Gv(...e) {
  return e.filter(Boolean).join(" ");
}
function uo(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
function qv(e = "", t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Vv, t.namedCodesToUnicode = t.namedCodesToUnicode ? Mt({}, Pi, t.namedCodesToUnicode) : Pi;
  const r = t.createElement || T.createElement;
  function n(p, h, ...u) {
    const b = uo(t.overrides, `${p}.props`, {});
    return r(function(w, S) {
      const x = uo(S, w);
      return x ? typeof x == "function" || typeof x == "object" && "render" in x ? x : uo(S, `${w}.component`, w) : w;
    }(p, t.overrides), Mt({}, h, b, { className: Gv(h == null ? void 0 : h.className, b.className) || void 0 }), ...u);
  }
  function o(p) {
    p = p.replace(iv, "");
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = yv.test(p) === !1);
    const u = f(d(h ? p : `${p.trimEnd().replace($v, "")}

`, { inline: h }));
    for (; typeof u[u.length - 1] == "string" && !u[u.length - 1].trim(); )
      u.pop();
    if (t.wrapper === null)
      return u;
    const b = t.wrapper || (h ? "span" : "div");
    let w;
    if (u.length > 1 || t.forceWrapper)
      w = u;
    else {
      if (u.length === 1)
        return w = u[0], typeof w == "string" ? n("span", { key: "outer" }, w) : w;
      w = null;
    }
    return T.createElement(b, { key: "outer" }, w);
  }
  function a(p) {
    const h = p.match(Xb);
    return h ? h.reduce(function(u, b, w) {
      const S = b.indexOf("=");
      if (S !== -1) {
        const x = function(N) {
          return N.indexOf("-") !== -1 && N.match(cv) === null && (N = N.replace(mv, function(I, j) {
            return j.toUpperCase();
          })), N;
        }(b.slice(0, S)).trim(), E = function(N) {
          const I = N[0];
          return (I === '"' || I === "'") && N.length >= 2 && N[N.length - 1] === I ? N.slice(1, -1) : N;
        }(b.slice(S + 1).trim()), y = Ri[x] || x, O = u[y] = function(N, I) {
          return N === "style" ? I.split(/;\s?/).reduce(function(j, B) {
            const k = B.slice(0, B.indexOf(":"));
            return j[k.trim().replace(/(-[a-z])/g, (C) => C[1].toUpperCase())] = B.slice(k.length + 1).trim(), j;
          }, {}) : N === "href" || N === "src" ? qt(I) : (I.match(pv) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(x, E);
        typeof O == "string" && (Po.test(O) || $o.test(O)) && (u[y] = T.cloneElement(o(O.trim()), { key: w }));
      } else
        b !== "style" && (u[Ri[b] || b] = !0);
      return u;
    }, {}) : null;
  }
  const i = [], l = {}, c = { 0: { match: ct(Il), order: 1, parse: (p, h, u) => ({ children: h(p[0].replace(Jb, ""), u) }), render: (p, h, u) => n("blockquote", { key: u.key }, h(p.children, u)) }, 1: { match: vr(Zb), order: 1, parse: co, render: (p, h, u) => n("br", { key: u.key }) }, 2: { match: ct(Qb), order: 1, parse: co, render: (p, h, u) => n("hr", { key: u.key }) }, 3: { match: ct(Al), order: 0, parse: (p) => ({ lang: void 0, text: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, "") }), render: (p, h, u) => n("pre", { key: u.key }, n("code", Mt({}, p.attrs, { className: p.lang ? `lang-${p.lang}` : "" }), p.text)) }, 4: { match: ct(Dl), order: 0, parse: (p) => ({ attrs: a(p[3] || ""), lang: p[2] || void 0, text: p[4], type: "3" }) }, 5: { match: vt(ev), order: 3, parse: (p) => ({ text: p[2] }), render: (p, h, u) => n("code", { key: u.key }, p.text) }, 6: { match: ct(nv), order: 0, parse: (p) => (i.push({ footnote: p[2], identifier: p[1] }), {}), render: po }, 7: { match: bt(ov), order: 1, parse: (p) => ({ target: `#${t.slugify(p[1])}`, text: p[1] }), render: (p, h, u) => n("a", { key: u.key, href: qt(p.target) }, n("sup", { key: u.key }, p.text)) }, 8: { match: bt(sv), order: 1, parse: (p) => ({ completed: p[1].toLowerCase() === "x" }), render: (p, h, u) => n("input", { checked: p.completed, key: u.key, readOnly: !0, type: "checkbox" }) }, 9: { match: ct(t.enforceAtxHeadings ? Bl : jl), order: 1, parse: (p, h, u) => ({ children: cn(h, p[2], u), id: t.slugify(p[2]), level: p[1].length }), render: (p, h, u) => n(`h${p.level}`, { id: p.id, key: u.key }, h(p.children, u)) }, 10: { match: ct(Ll), order: 0, parse: (p, h, u) => ({ children: cn(h, p[1], u), level: p[2] === "=" ? 1 : 2, type: "9" }) }, 11: { match: vr(Po), order: 1, parse(p, h, u) {
    const [, b] = p[3].match(_v), w = new RegExp(`^${b}`, "gm"), S = p[3].replace(w, ""), x = (E = S, Lv.some((I) => I.test(E)) ? Wv : cn);
    var E;
    const y = p[1].toLowerCase(), O = qb.indexOf(y) !== -1, N = { attrs: a(p[2]), noInnerParse: O, tag: (O ? y : p[1]).trim() };
    return u.inAnchor = u.inAnchor || y === "a", O ? N.text = p[3] : N.children = x(h, S, u), u.inAnchor = !1, N;
  }, render: (p, h, u) => n(p.tag, Mt({ key: u.key }, p.attrs), p.text || h(p.children, u)) }, 13: { match: vr($o), order: 1, parse: (p) => ({ attrs: a(p[2] || ""), tag: p[1].trim() }), render: (p, h, u) => n(p.tag, Mt({}, p.attrs, { key: u.key })) }, 12: { match: vr(Vl), order: 1, parse: () => ({}), render: po }, 14: { match: vt(Bv), order: 1, parse: (p) => ({ alt: p[1], target: Di(p[2]), title: p[3] }), render: (p, h, u) => n("img", { key: u.key, alt: p.alt || void 0, title: p.title || void 0, src: qt(p.target) }) }, 15: { match: bt(jv), order: 3, parse: (p, h, u) => ({ children: Hv(h, p[1], u), target: Di(p[2]), title: p[3] }), render: (p, h, u) => n("a", { key: u.key, href: qt(p.target), title: p.title }, h(p.children, u)) }, 16: { match: bt(fv), order: 0, parse: (p) => ({ children: [{ text: p[1], type: "27" }], target: p[1], type: "15" }) }, 17: { match: (p, h) => h.inAnchor ? null : bt(dv)(p, h), order: 0, parse: (p) => ({ children: [{ text: p[1], type: "27" }], target: p[1], title: void 0, type: "15" }) }, 18: { match: bt(uv), order: 0, parse(p) {
    let h = p[1], u = p[1];
    return Yb.test(u) || (u = "mailto:" + u), { children: [{ text: h.replace("mailto:", ""), type: "27" }], target: u, type: "15" };
  } }, 20: _i(n, 1), 33: _i(n, 2), 19: { match: ct(tv), order: 3, parse: co, render: () => `
` }, 21: { match: Uv, order: 3, parse: lo, render: (p, h, u) => n("p", { key: u.key }, h(p.children, u)) }, 22: { match: bt(hv), order: 0, parse: (p) => (l[p[1]] = { target: p[2], title: p[4] }, {}), render: po }, 23: { match: vt(gv), order: 0, parse: (p) => ({ alt: p[1] || void 0, ref: p[2] }), render: (p, h, u) => l[p.ref] ? n("img", { key: u.key, alt: p.alt, src: qt(l[p.ref].target), title: l[p.ref].title }) : null }, 24: { match: bt(bv), order: 0, parse: (p, h, u) => ({ children: h(p[1], u), fallbackChildren: h(p[0].replace(vv, "\\$1"), u), ref: p[2] }), render: (p, h, u) => l[p.ref] ? n("a", { key: u.key, href: qt(l[p.ref].target), title: l[p.ref].title }, h(p.children, u)) : n("span", { key: u.key }, h(p.fallbackChildren, u)) }, 25: { match: ct(Fl), order: 1, parse: zv, render(p, h, u) {
    const b = p;
    return n("table", { key: u.key }, n("thead", null, n("tr", null, b.header.map(function(w, S) {
      return n("th", { key: S, style: Ii(b, S) }, h(w, u));
    }))), n("tbody", null, b.cells.map(function(w, S) {
      return n("tr", { key: S }, w.map(function(x, E) {
        return n("td", { key: E, style: Ii(b, E) }, h(x, u));
      }));
    })));
  } }, 27: { match: vr(Pv), order: 4, parse: (p) => ({ text: p[0].replace(lv, (h, u) => t.namedCodesToUnicode[u] ? t.namedCodesToUnicode[u] : h) }), render: (p) => p.text }, 28: { match: vt(Nv), order: 2, parse: (p, h, u) => ({ children: h(p[2], u) }), render: (p, h, u) => n("strong", { key: u.key }, h(p.children, u)) }, 29: { match: vt(Ov), order: 3, parse: (p, h, u) => ({ children: h(p[2], u) }), render: (p, h, u) => n("em", { key: u.key }, h(p.children, u)) }, 30: { match: vt(Rv), order: 1, parse: (p) => ({ text: p[1], type: "27" }) }, 31: { match: vt(Cv), order: 3, parse: lo, render: (p, h, u) => n("mark", { key: u.key }, h(p.children, u)) }, 32: { match: vt(Sv), order: 3, parse: lo, render: (p, h, u) => n("del", { key: u.key }, h(p.children, u)) } };
  t.disableParsingRawHTML === !0 && (delete c[11], delete c[13]);
  const d = function(p) {
    let h = Object.keys(p);
    function u(b, w) {
      let S = [], x = "";
      for (; b; ) {
        let E = 0;
        for (; E < h.length; ) {
          const y = h[E], O = p[y], N = O.match(b, w, x);
          if (N) {
            const I = N[0];
            b = b.substring(I.length);
            const j = O.parse(N, u, w);
            j.type == null && (j.type = y), S.push(j), x = I;
            break;
          }
          E++;
        }
      }
      return S;
    }
    return h.sort(function(b, w) {
      let S = p[b].order, x = p[w].order;
      return S !== x ? S - x : b < w ? -1 : 1;
    }), function(b, w) {
      return u(function(S) {
        return S.replace(rv, `
`).replace(av, "").replace(wv, "    ");
      }(b), w);
    };
  }(c), f = (v = function(p, h) {
    return function(u, b, w) {
      const S = p[u.type].render;
      return h ? h(() => S(u, b, w), u, b, w) : S(u, b, w);
    };
  }(c, t.renderRule), function p(h, u = {}) {
    if (Array.isArray(h)) {
      const b = u.key, w = [];
      let S = !1;
      for (let x = 0; x < h.length; x++) {
        u.key = x;
        const E = p(h[x], u), y = typeof E == "string";
        y && S ? w[w.length - 1] += E : E !== null && w.push(E), S = y;
      }
      return u.key = b, w;
    }
    return v(h, p, u);
  });
  var v;
  const g = o(e);
  return i.length ? n("div", null, g, n("footer", { key: "footer" }, i.map(function(p) {
    return n("div", { id: t.slugify(p.identifier), key: p.identifier }, p.identifier, f(d(p.footnote, { inline: !0 })));
  }))) : g;
}
const Xv = (e) => {
  let { children: t = "", options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, d = Object.keys(o);
    for (l = 0; l < d.length; l++)
      a.indexOf(i = d[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Gb);
  return T.cloneElement(qv(t, r), n);
};
function Y0({ markdown: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-prose", children: /* @__PURE__ */ m(Xv, { children: e }) });
}
const K0 = (e, t) => {
  Fe(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, fo = () => !1, J0 = (e, t) => {
  const [r] = Ro(
    Oe(async () => {
      if (!e)
        return fo;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    fo,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Fe(() => () => {
    r !== fo && r();
  }, [r]);
}, Yv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: V(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Yv.displayName = "Card";
const Kv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: V("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
Kv.displayName = "CardHeader";
const Jv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "h3",
    {
      ref: r,
      className: V("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Jv.displayName = "CardTitle";
const Zv = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("p", { ref: r, className: V("pr-text-sm pr-text-muted-foreground", e), ...t }));
Zv.displayName = "CardDescription";
const Qv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: V("pr-p-6 pr-pt-0", e), ...t })
);
Qv.displayName = "CardContent";
const e0 = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: V("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
e0.displayName = "CardFooter";
const t0 = Mo(
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
), r0 = W.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ m("div", { ref: n, role: "alert", className: V(t0({ variant: t }), e), ...r }));
r0.displayName = "Alert";
const n0 = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ A(
    "h5",
    {
      ref: r,
      className: V("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
n0.displayName = "AlertTitle";
const o0 = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: V("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
o0.displayName = "AlertDescription";
const a0 = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ A(
  yr.Root,
  {
    ref: r,
    className: V(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ m(yr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ m(yr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ m(yr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
a0.displayName = yr.Root.displayName;
const i0 = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  ho.Root,
  {
    className: V(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ m(
      ho.Thumb,
      {
        className: V(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
i0.displayName = ho.Root.displayName;
function s0(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
s0(`.papi-context-menu-target {
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
.pr-m-2 {
  margin: 0.5rem;
}
.pr--mx-1 {
  margin-left: -0.25rem;
  margin-right: -0.25rem;
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
.pr-me-2 {
  margin-inline-end: 0.5rem;
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
.pr-mt-2 {
  margin-top: 0.5rem;
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
.pr-block {
  display: block;
}
.pr-inline-block {
  display: inline-block;
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
.pr-rounded-t-none {
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
}
.pr-rounded-ee-none {
  border-end-end-radius: 0px;
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
.pr-border-black {
  --tw-border-opacity: 1;
  border-color: rgb(0 0 0 / var(--tw-border-opacity));
}
.pr-border-destructive\\/50 {
  border-color: hsl(var(--destructive) / 0.5);
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
.pr-p-\\[1px\\] {
  padding: 1px;
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
.pr-pl-4 {
  padding-left: 1rem;
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
.pr-text-left {
  text-align: left;
}
.pr-text-center {
  text-align: center;
}
.pr-text-right {
  text-align: right;
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
.pr-text-gray-500 {
  --tw-text-opacity: 1;
  color: rgb(107 114 128 / var(--tw-text-opacity));
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
.pr-text-slate-700 {
  --tw-text-opacity: 1;
  color: rgb(51 65 85 / var(--tw-text-opacity));
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
.hover\\:pr-bg-accent:hover {
  background-color: hsl(var(--accent));
}
.hover\\:pr-bg-destructive\\/90:hover {
  background-color: hsl(var(--destructive) / 0.9);
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
.hover\\:pr-text-accent-foreground:hover {
  color: hsl(var(--accent-foreground));
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
.data-\\[disabled\\=true\\]\\:pr-pointer-events-none[data-disabled="true"] {
  pointer-events: none;
}
.data-\\[disabled\\]\\:pr-pointer-events-none[data-disabled] {
  pointer-events: none;
}
.data-\\[side\\=bottom\\]\\:pr-translate-y-1[data-side="bottom"] {
  --tw-translate-y: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=left\\]\\:pr--translate-x-1[data-side="left"] {
  --tw-translate-x: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=right\\]\\:pr-translate-x-1[data-side="right"] {
  --tw-translate-x: 0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[side\\=top\\]\\:pr--translate-y-1[data-side="top"] {
  --tw-translate-y: -0.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=checked\\]\\:pr-translate-x-5[data-state="checked"] {
  --tw-translate-x: 1.25rem;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[state\\=unchecked\\]\\:pr-translate-x-0[data-state="unchecked"] {
  --tw-translate-x: 0px;
  transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}
.data-\\[highlighted\\]\\:pr-bg-amber-100[data-highlighted] {
  --tw-bg-opacity: 1;
  background-color: rgb(254 243 199 / var(--tw-bg-opacity));
}
.data-\\[selected\\=true\\]\\:pr-bg-accent[data-selected="true"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=active\\]\\:pr-bg-background[data-state="active"] {
  background-color: hsl(var(--background));
}
.data-\\[state\\=checked\\]\\:pr-bg-primary[data-state="checked"] {
  background-color: hsl(var(--primary));
}
.data-\\[state\\=open\\]\\:pr-bg-accent[data-state="open"] {
  background-color: hsl(var(--accent));
}
.data-\\[state\\=selected\\]\\:pr-bg-muted[data-state="selected"] {
  background-color: hsl(var(--muted));
}
.data-\\[state\\=unchecked\\]\\:pr-bg-input[data-state="unchecked"] {
  background-color: hsl(var(--input));
}
.data-\\[selected\\=true\\]\\:pr-text-accent-foreground[data-selected="true"] {
  color: hsl(var(--accent-foreground));
}
.data-\\[state\\=active\\]\\:pr-text-foreground[data-state="active"] {
  color: hsl(var(--foreground));
}
.data-\\[state\\=checked\\]\\:pr-text-primary-foreground[data-state="checked"] {
  color: hsl(var(--primary-foreground));
}
.data-\\[state\\=open\\]\\:pr-text-muted-foreground[data-state="open"] {
  color: hsl(var(--muted-foreground));
}
.data-\\[disabled\\=true\\]\\:pr-opacity-50[data-disabled="true"] {
  opacity: 0.5;
}
.data-\\[disabled\\]\\:pr-opacity-50[data-disabled] {
  opacity: 0.5;
}
.data-\\[state\\=active\\]\\:pr-shadow-sm[data-state="active"] {
  --tw-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05);
  --tw-shadow-colored: 0 1px 2px 0 var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
.data-\\[state\\=open\\]\\:pr-animate-in[data-state="open"] {
  animation-name: enter;
  animation-duration: 150ms;
  --tw-enter-opacity: initial;
  --tw-enter-scale: initial;
  --tw-enter-rotate: initial;
  --tw-enter-translate-x: initial;
  --tw-enter-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-animate-out[data-state="closed"] {
  animation-name: exit;
  animation-duration: 150ms;
  --tw-exit-opacity: initial;
  --tw-exit-scale: initial;
  --tw-exit-rotate: initial;
  --tw-exit-translate-x: initial;
  --tw-exit-translate-y: initial;
}
.data-\\[state\\=closed\\]\\:pr-fade-out-0[data-state="closed"] {
  --tw-exit-opacity: 0;
}
.data-\\[state\\=open\\]\\:pr-fade-in-0[data-state="open"] {
  --tw-enter-opacity: 0;
}
.data-\\[state\\=closed\\]\\:pr-zoom-out-95[data-state="closed"] {
  --tw-exit-scale: .95;
}
.data-\\[state\\=open\\]\\:pr-zoom-in-95[data-state="open"] {
  --tw-enter-scale: .95;
}
.data-\\[side\\=bottom\\]\\:pr-slide-in-from-top-2[data-side="bottom"] {
  --tw-enter-translate-y: -0.5rem;
}
.data-\\[side\\=left\\]\\:pr-slide-in-from-right-2[data-side="left"] {
  --tw-enter-translate-x: 0.5rem;
}
.data-\\[side\\=right\\]\\:pr-slide-in-from-left-2[data-side="right"] {
  --tw-enter-translate-x: -0.5rem;
}
.data-\\[side\\=top\\]\\:pr-slide-in-from-bottom-2[data-side="top"] {
  --tw-enter-translate-y: 0.5rem;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-left-1\\/2[data-state="closed"] {
  --tw-exit-translate-x: -50%;
}
.data-\\[state\\=closed\\]\\:pr-slide-out-to-top-\\[48\\%\\][data-state="closed"] {
  --tw-exit-translate-y: -48%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-left-1\\/2[data-state="open"] {
  --tw-enter-translate-x: -50%;
}
.data-\\[state\\=open\\]\\:pr-slide-in-from-top-\\[48\\%\\][data-state="open"] {
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
.\\[\\&\\:has\\(\\[role\\=checkbox\\]\\)\\]\\:pr-pr-0:has([role=checkbox]) {
  padding-right: 0px;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
  position: relative;
}
`, "top");
export {
  r0 as Alert,
  o0 as AlertDescription,
  n0 as AlertTitle,
  S0 as BookChapterControl,
  ye as Button,
  Yv as Card,
  Qv as CardContent,
  Zv as CardDescription,
  e0 as CardFooter,
  Kv as CardHeader,
  Jv as CardTitle,
  R0 as ChapterRangeSelector,
  H0 as CharacterInventory,
  Xp as Checkbox,
  P0 as Checklist,
  Sa as ComboBox,
  $0 as ContextMenu,
  Bp as DataTable,
  q0 as DisableButton,
  Qi as DropdownMenu,
  ts as DropdownMenuCheckboxItem,
  jo as DropdownMenuContent,
  T0 as DropdownMenuGroup,
  es as DropdownMenuItem,
  Tn as DropdownMenuLabel,
  N0 as DropdownMenuPortal,
  C0 as DropdownMenuRadioGroup,
  vp as DropdownMenuRadioItem,
  Bo as DropdownMenuSeparator,
  yp as DropdownMenuShortcut,
  O0 as DropdownMenuSub,
  bp as DropdownMenuSubContent,
  gp as DropdownMenuSubTrigger,
  hp as DropdownMenuTrigger,
  G0 as EnableButton,
  xg as GridMenu,
  Rb as HamburgerMenuButton,
  _0 as IconButton,
  Br as Input,
  W0 as InstallButton,
  Ml as Label,
  Xt as LabelPosition,
  j0 as List,
  L0 as ListHeader,
  B0 as ListItem,
  Y0 as MarkdownRenderer,
  hl as MenuItem,
  A0 as NavigationContentSearch,
  M0 as ScriptureResultsViewer,
  Ab as SearchBar,
  pn as Select,
  $r as SelectContent,
  _p as SelectGroup,
  Qe as SelectItem,
  Mp as SelectLabel,
  ns as SelectScrollDownButton,
  rs as SelectScrollUpButton,
  Ip as SelectSeparator,
  Pr as SelectTrigger,
  dn as SelectValue,
  a0 as ShadCnSlider,
  i0 as ShadCnSwitch,
  I0 as Slider,
  D0 as Snackbar,
  V0 as Switch,
  Nn as Table,
  Cn as TableBody,
  jp as TableCaption,
  Jt as TableCell,
  Ap as TableFooter,
  _r as TableHead,
  On as TableHeader,
  Et as TableRow,
  U0 as Tabs,
  Fb as TabsContent,
  Lb as TabsList,
  Vb as TabsTrigger,
  F0 as TextField,
  z0 as Toolbar,
  X0 as UpdateButton,
  Rl as VerticalTabs,
  $l as VerticalTabsContent,
  Pl as VerticalTabsList,
  jb as VerticalTabsTrigger,
  Pp as buttonVariants,
  K0 as useEvent,
  J0 as useEventAsync,
  Ro as usePromise
};
//# sourceMappingURL=index.js.map
