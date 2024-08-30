import Hl, { jsx as d, jsxs as _, Fragment as wt } from "react/jsx-runtime";
import * as N from "react";
import X, { forwardRef as vn, useCallback as Se, useState as ce, useRef as _t, useEffect as He, useLayoutEffect as ha, useMemo as Mt } from "react";
import { History as Gl, ChevronRight as Ci, Check as No, Circle as Wl, ArrowDownWideNarrow as Xl, Clock as Yl, Bookmark as ql, FilterIcon as Kl, ChevronDown as yn, ChevronUp as Jl, ArrowLeftIcon as Zl, ChevronLeftIcon as Ql, ChevronRightIcon as ec, ArrowRightIcon as tc, ArrowUpIcon as rc, ArrowDownIcon as nc, ArrowUpDownIcon as oc, CircleCheckIcon as ga, CircleXIcon as ba, CircleHelpIcon as va, X as ac, Search as ic, ChevronsUpDown as sc, ChevronLeft as lc, LoaderCircle as cc, Download as pc, Filter as dc, User as uc, Link as fc, CircleHelp as mc } from "lucide-react";
import Ce, { clsx as hc } from "clsx";
import { extendTailwindMerge as gc } from "tailwind-merge";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as bc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as vc, compareScrRefs as so, scrRefToBBBCCCVVV as zn, formatScrRef as Un, NumberFormat as yc, formatBytes as wc } from "platform-bible-utils";
import { useReactTable as Oi, getCoreRowModel as Ri, getPaginationRowModel as xc, getSortedRowModel as Pi, getFilteredRowModel as kc, flexRender as kr, getExpandedRowModel as Ec, getGroupedRowModel as Nc } from "@tanstack/react-table";
import { Slot as Tc } from "@radix-ui/react-slot";
import { cva as To } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import { FormControlLabel as ya, FormLabel as Sc, Checkbox as Cc, MenuItem as Oc, ListItemText as Rc, ListItemIcon as $i, Menu as Pc, Grid as _i, List as $c, IconButton as Ii, Drawer as _c, Slider as Ic, Snackbar as Mc, Switch as Ac, AppBar as Dc, Toolbar as jc } from "@mui/material";
import * as Or from "@radix-ui/react-popover";
import { Command as Ae } from "cmdk";
import * as Qe from "@radix-ui/react-dialog";
import Bc, { ThemeContext as Lc, internal_processStyles as Fc } from "@mui/styled-engine";
import * as Vc from "react-dom";
import Kr from "react-dom";
import * as De from "@radix-ui/react-tabs";
import * as Mi from "@radix-ui/react-separator";
import * as Ai from "@radix-ui/react-label";
import * as vr from "@radix-ui/react-slider";
import * as lo from "@radix-ui/react-switch";
const zc = gc({ prefix: "pr-" });
function L(...e) {
  return zc(hc(e));
}
const jr = X.forwardRef(
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
jr.displayName = "Input";
const Uc = vn(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ _("div", { className: "pr-relative", children: [
    /* @__PURE__ */ d(
      jr,
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
    /* @__PURE__ */ d(
      Gl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Hc = Object.defineProperty, Gc = (e, t, r) => t in e ? Hc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => Gc(e, typeof t != "symbol" ? t + "" : t, r);
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
], So = [
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
], Di = [
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
], wa = tp();
function or(e, t = !0) {
  return t && (e = e.toUpperCase()), e in wa ? wa[e] : 0;
}
function Co(e) {
  return or(e) > 0;
}
function Wc(e) {
  const t = typeof e == "string" ? or(e) : e;
  return t >= 40 && t <= 66;
}
function Xc(e) {
  return (typeof e == "string" ? or(e) : e) <= 39;
}
function ji(e) {
  return e <= 66;
}
function Yc(e) {
  const t = typeof e == "string" ? or(e) : e;
  return Fi(t) && !ji(t);
}
function* qc() {
  for (let e = 1; e <= At.length; e++)
    yield e;
}
const Kc = 1, Bi = At.length;
function Jc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Oo(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= At.length ? t : At[r];
}
function Li(e) {
  return e <= 0 || e > Bi ? "******" : Di[e - 1];
}
function Zc(e) {
  return Li(or(e));
}
function Fi(e) {
  const t = typeof e == "number" ? Oo(e) : e;
  return Co(t) && !So.includes(t);
}
function Qc(e) {
  const t = typeof e == "number" ? Oo(e) : e;
  return Co(t) && So.includes(t);
}
function ep(e) {
  return Di[e - 1].includes("*obsolete*");
}
function tp() {
  const e = {};
  for (let t = 0; t < At.length; t++)
    e[At[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: At,
  nonCanonicalIds: So,
  bookIdToNumber: or,
  isBookIdValid: Co,
  isBookNT: Wc,
  isBookOT: Xc,
  isBookOTNT: ji,
  isBookDC: Yc,
  allBookNumbers: qc,
  firstBook: Kc,
  lastBook: Bi,
  extraBooks: Jc,
  bookNumberToId: Oo,
  bookNumberToEnglishName: Li,
  bookIdToEnglishName: Zc,
  isCanonical: Fi,
  isExtraMaterial: Qc,
  isObsolete: ep
};
var Je = /* @__PURE__ */ ((e) => (e[e.Unknown = 0] = "Unknown", e[e.Original = 1] = "Original", e[e.Septuagint = 2] = "Septuagint", e[e.Vulgate = 3] = "Vulgate", e[e.English = 4] = "English", e[e.RussianProtestant = 5] = "RussianProtestant", e[e.RussianOrthodox = 6] = "RussianOrthodox", e))(Je || {});
const Le = class {
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
oe(Le, "Original", new Le(Je.Original)), oe(Le, "Septuagint", new Le(Je.Septuagint)), oe(Le, "Vulgate", new Le(Je.Vulgate)), oe(Le, "English", new Le(Je.English)), oe(Le, "RussianProtestant", new Le(Je.RussianProtestant)), oe(Le, "RussianOrthodox", new Le(Je.RussianOrthodox));
let St = Le;
function xa(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var Vi = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Vi || {});
const _e = class le {
  constructor(t, r, n, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), n == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = r != null && r instanceof St ? r : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = r != null && r instanceof St ? r : void 0;
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
          const a = t instanceof St ? t : le.defaultVersification;
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
      if (n instanceof dr)
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
    return i && (c = new St(i)), r ? new le(r, n.toString(), l, c) : new le();
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
      throw new dr(
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
    this.versification = this.versification != null ? new St(t) : void 0;
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
          this.versification = new St(Je[i]);
        } catch {
          throw new dr("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new dr("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || me.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(n[1]))
      throw new dr("Invalid reference : " + t);
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
    const o = [], a = xa(this._verse, n);
    for (const i of a.map((l) => xa(l, r))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const f = this.clone();
        if (f.verse = i[1], !t)
          for (let m = c + 1; m < f.verseNum; m++) {
            const v = new le(
              this._bookNum,
              this._chapterNum,
              m,
              this.versification
            );
            this.isExcluded || o.push(v);
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(_e, "defaultVersification", St.English), oe(_e, "verseRangeSeparator", "-"), oe(_e, "verseSequenceIndicator", ","), oe(_e, "verseRangeSeparators", [_e.verseRangeSeparator]), oe(_e, "verseSequenceIndicators", [_e.verseSequenceIndicator]), oe(_e, "chapterDigitShifter", 1e3), oe(_e, "bookDigitShifter", _e.chapterDigitShifter * _e.chapterDigitShifter), oe(_e, "bcvMaxValue", _e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(_e, "ValidStatusType", Vi);
let dr = class extends Error {
};
const Ro = ge.Root, zi = ge.Trigger, rp = ge.Group, Iv = ge.Portal, Mv = ge.Sub, Av = ge.RadioGroup, np = X.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ _(
  ge.SubTrigger,
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
      /* @__PURE__ */ d(Ci, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
np.displayName = ge.SubTrigger.displayName;
const op = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ge.SubContent,
  {
    ref: r,
    className: L(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
op.displayName = ge.SubContent.displayName;
const wn = X.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ d(ge.Portal, { children: /* @__PURE__ */ d(
  ge.Content,
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
wn.displayName = ge.Content.displayName;
const Ui = X.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  ge.Item,
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
Ui.displayName = ge.Item.displayName;
const Po = X.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ _(
  ge.CheckboxItem,
  {
    ref: o,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(ge.ItemIndicator, { children: /* @__PURE__ */ d(No, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Po.displayName = ge.CheckboxItem.displayName;
const Hi = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(
  ge.RadioItem,
  {
    ref: n,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(ge.ItemIndicator, { children: /* @__PURE__ */ d(Wl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Hi.displayName = ge.RadioItem.displayName;
const Br = X.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  ge.Label,
  {
    ref: n,
    className: L("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
Br.displayName = ge.Label.displayName;
const xn = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ge.Separator,
  {
    ref: r,
    className: L("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
xn.displayName = ge.Separator.displayName;
function ap({ className: e, ...t }) {
  return /* @__PURE__ */ d(
    "span",
    {
      className: L("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
ap.displayName = "DropdownMenuShortcut";
const ip = vn(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ _(
    Ui,
    {
      ref: l,
      textValue: e,
      className: L("pr-font-normal pr-text-slate-700", {
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
function sp({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: r,
  highlightedChapter: n,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), i = Se(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ d("div", { className: L("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ d(
    "div",
    {
      className: L(
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
function lp({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ _(Br, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ d("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ d(
        Xl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        Yl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        ql,
        {
          onClick: r,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const Er = me.allBookIds, cp = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ka = ["OT", "NT", "DC"], pp = 32 + 32 + 32, dp = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], up = (e) => ({
  OT: Er.filter((r) => me.isBookOT(r)),
  NT: Er.filter((r) => me.isBookNT(r)),
  DC: Er.filter((r) => me.isBookDC(r))
})[e], ur = (e) => vc(me.bookIdToNumber(e));
function fp() {
  return Er.map((t) => me.bookIdToEnglishName(t));
}
function mp(e) {
  return fp().includes(e);
}
function hp(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (mp(t))
    return Er.find((n) => me.bookIdToEnglishName(n) === t);
}
function Dv({ scrRef: e, handleSubmit: t }) {
  const [r, n] = ce(""), [o, a] = ce(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = ce(e.chapterNum ?? 0), [c, f] = ce(
    me.bookNumberToId(e.bookNum)
  ), [m, v] = ce(!1), [g, p] = ce(m), h = _t(void 0), u = _t(void 0), b = _t(void 0), x = Se(
    ($) => up($).filter((E) => {
      const R = me.bookIdToEnglishName(E).toLowerCase(), I = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return R.includes(I) || // Match book name
      E.toLowerCase().includes(I);
    }),
    [r]
  ), O = ($) => {
    n($);
  }, w = _t(!1), k = Se(($) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    v($);
  }, []), y = Se(
    ($, E, R, I) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== $ ? 1 : e.chapterNum
      ), E || ur($) === -1) {
        t({
          bookNum: me.bookIdToNumber($),
          chapterNum: R || 1,
          verseNum: I || 1
        }), v(!1), n("");
        return;
      }
      a(o !== $ ? $ : ""), v(!E);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = ($) => {
    $ <= 0 || $ > ur(o) || y(o, !0, $);
  }, S = Se(() => {
    dp.forEach(($) => {
      const E = r.match($);
      if (E) {
        const [R, I = void 0, U = void 0] = E.slice(1), j = hp(R);
        (me.isBookIdValid(R) || j) && y(
          j ?? R,
          !0,
          I ? parseInt(I, 10) : 1,
          U ? parseInt(U, 10) : 1
        );
      }
    });
  }, [y, r]), M = Se(
    ($) => {
      m ? ($.key === "ArrowDown" || $.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof u < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      u.current !== null && u.current.focus(), $.preventDefault()) : v(!0);
    },
    [m]
  ), D = ($) => {
    const { key: E } = $;
    E === "ArrowRight" || E === "ArrowLeft" || E === "ArrowDown" || E === "ArrowUp" || E === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: E })), h.current.focus());
  }, V = ($) => {
    const { key: E } = $;
    if (c === o) {
      if (E === "Enter") {
        $.preventDefault(), y(o, !0, i);
        return;
      }
      let R = 0;
      if (E === "ArrowRight")
        if (i < ur(c))
          R = 1;
        else {
          $.preventDefault();
          return;
        }
      else if (E === "ArrowLeft")
        if (i > 1)
          R = -1;
        else {
          $.preventDefault();
          return;
        }
      else
        E === "ArrowDown" ? R = 6 : E === "ArrowUp" && (R = -6);
      i + R <= 0 || i + R > ur(c) ? l(0) : R !== 0 && (l(i + R), $.preventDefault());
    }
  };
  return He(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), ha(() => {
    p(m);
  }, [m]), ha(() => {
    const $ = setTimeout(() => {
      if (g && u.current && b.current) {
        const R = b.current.offsetTop - pp;
        u.current.scrollTo({ top: R, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout($);
    };
  }, [g]), /* @__PURE__ */ d("div", { className: "pr-flex", children: /* @__PURE__ */ _(Ro, { modal: !1, open: m, onOpenChange: k, children: [
    /* @__PURE__ */ d(zi, { asChild: !0, children: /* @__PURE__ */ d(
      Uc,
      {
        ref: h,
        value: r,
        handleSearch: O,
        handleKeyDown: M,
        handleOnClick: () => {
          a(me.bookNumberToId(e.bookNum)), f(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: S,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ _(
      wn,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: u,
        children: [
          /* @__PURE__ */ d(
            lp,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ka.map(
            ($, E) => x($).length > 0 && /* @__PURE__ */ _("div", { children: [
              /* @__PURE__ */ d(Br, { className: "pr-font-semibold pr-text-slate-700", children: cp[$] }),
              x($).map((R) => /* @__PURE__ */ d("div", { children: /* @__PURE__ */ d(
                ip,
                {
                  bookId: R,
                  handleSelectBook: () => y(R, !1),
                  isSelected: o === R,
                  handleHighlightBook: () => f(R),
                  handleKeyDown: V,
                  bookType: $,
                  ref: (I) => {
                    o === R && (b.current = I);
                  },
                  children: /* @__PURE__ */ d(
                    sp,
                    {
                      handleSelectChapter: T,
                      endChapter: ur(R),
                      activeChapter: e.bookNum === me.bookIdToNumber(R) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (I) => {
                        l(I);
                      }
                    }
                  )
                }
              ) }, R)),
              ka.length - 1 !== E ? /* @__PURE__ */ d(xn, {}) : void 0
            ] }, $)
          )
        ]
      }
    )
  ] }) });
}
const gp = To(
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
), we = X.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ d(n ? Tc : "button", { className: L(gp({ variant: t, size: r, className: e })), ref: a, ...o })
);
we.displayName = "Button";
function bp({ table: e }) {
  return /* @__PURE__ */ _(Ro, { children: [
    /* @__PURE__ */ d(bc, { asChild: !0, children: /* @__PURE__ */ _(we, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ d(Kl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ _(wn, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ d(Br, { children: "Toggle columns" }),
      /* @__PURE__ */ d(xn, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ d(
        Po,
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
const ln = xe.Root, vp = xe.Group, cn = xe.Value, Rr = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(
  xe.Trigger,
  {
    ref: n,
    className: L(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ d(xe.Icon, { asChild: !0, children: /* @__PURE__ */ d(yn, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Rr.displayName = xe.Trigger.displayName;
const Gi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.ScrollUpButton,
  {
    ref: r,
    className: L("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Jl, { className: "pr-h-4 pr-w-4" })
  }
));
Gi.displayName = xe.ScrollUpButton.displayName;
const Wi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.ScrollDownButton,
  {
    ref: r,
    className: L("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(yn, { className: "pr-h-4 pr-w-4" })
  }
));
Wi.displayName = xe.ScrollDownButton.displayName;
const Pr = X.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ d(xe.Portal, { children: /* @__PURE__ */ _(
  xe.Content,
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
      /* @__PURE__ */ d(Gi, {}),
      /* @__PURE__ */ d(
        xe.Viewport,
        {
          className: L(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ d(Wi, {})
    ]
  }
) }));
Pr.displayName = xe.Content.displayName;
const yp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.Label,
  {
    ref: r,
    className: L("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
yp.displayName = xe.Label.displayName;
const Ke = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(
  xe.Item,
  {
    ref: n,
    className: L(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(xe.ItemIndicator, { children: /* @__PURE__ */ d(No, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ d(xe.ItemText, { children: t })
    ]
  }
));
Ke.displayName = xe.Item.displayName;
const wp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.Separator,
  {
    ref: r,
    className: L("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
wp.displayName = xe.Separator.displayName;
function xp({ table: e }) {
  return /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ _("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ d("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ _(
        ln,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ d(Rr, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ d(cn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ d(Pr, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ d(Ke, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ _("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ _(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ d(Zl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ _(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ d(Ql, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ _(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ d(ec, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ _(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ d(tc, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const kn = X.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ d("div", { className: L("pr-twp pr-relative pr-w-full", { "pr-overflow-auto": !t }), children: /* @__PURE__ */ d(
  "table",
  {
    ref: n,
    className: L("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...r
  }
) }));
kn.displayName = "Table";
const En = X.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ d(
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
En.displayName = "TableHeader";
const Nn = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("tbody", { ref: r, className: L("[&_tr:last-child]:pr-border-0", e), ...t }));
Nn.displayName = "TableBody";
const kp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "tfoot",
  {
    ref: r,
    className: L("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
kp.displayName = "TableFooter";
const yt = X.forwardRef(
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
yt.displayName = "TableRow";
const $r = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
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
$r.displayName = "TableHead";
const Jt = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "td",
  {
    ref: r,
    className: L("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pe-0", e),
    ...t
  }
));
Jt.displayName = "TableCell";
const Ep = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "caption",
  {
    ref: r,
    className: L("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Ep.displayName = "TableCaption";
function Np({
  columns: e,
  data: t,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  stickyHeader: a = !1,
  onRowClickHandler: i = () => {
  }
}) {
  var b;
  const [l, c] = ce([]), [f, m] = ce([]), [v, g] = ce({}), [p, h] = ce({}), u = Oi({
    data: t,
    columns: e,
    getCoreRowModel: Ri(),
    ...r && { getPaginationRowModel: xc() },
    onSortingChange: c,
    getSortedRowModel: Pi(),
    onColumnFiltersChange: m,
    getFilteredRowModel: kc(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: h,
    state: {
      sorting: l,
      columnFilters: f,
      columnVisibility: v,
      rowSelection: p
    }
  });
  return /* @__PURE__ */ _("div", { className: "pr-twp pr-font-sans", children: [
    o && /* @__PURE__ */ d(bp, { table: u }),
    /* @__PURE__ */ _(kn, { stickyHeader: a, children: [
      /* @__PURE__ */ d(En, { stickyHeader: a, children: u.getHeaderGroups().map((x) => /* @__PURE__ */ d(yt, { children: x.headers.map((O) => /* @__PURE__ */ d($r, { children: O.isPlaceholder ? void 0 : kr(O.column.columnDef.header, O.getContext()) }, O.id)) }, x.id)) }),
      /* @__PURE__ */ d(Nn, { children: (b = u.getRowModel().rows) != null && b.length ? u.getRowModel().rows.map((x) => /* @__PURE__ */ d(
        yt,
        {
          onClick: () => i(x, u),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((O) => /* @__PURE__ */ d(Jt, { children: kr(O.column.columnDef.cell, O.getContext()) }, O.id))
        },
        x.id
      )) : /* @__PURE__ */ d(yt, { children: /* @__PURE__ */ d(Jt, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ d(
        we,
        {
          variant: "outline",
          size: "sm",
          onClick: () => u.previousPage(),
          disabled: !u.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ d(
        we,
        {
          variant: "outline",
          size: "sm",
          onClick: () => u.nextPage(),
          disabled: !u.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ d(xp, { table: u })
  ] });
}
const Tp = (e) => e.split(/(?:\r?\n|\r)|(?=(?:\\(?:v|c|id)))/g), Ea = (e) => {
  const t = /^\\[vc]\s+(\d+)/, r = e.match(t);
  if (r)
    return +r[1];
}, Na = (e, t, r, n) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = Tp(e);
  let i = n.chapterNum, l = n.verseNum, c = 0;
  return a.forEach((f) => {
    f.startsWith("\\id") && (i = 0, l = 0), f.startsWith("\\c") && (i = Ea(f), l = 0), f.startsWith("\\v") && (l = Ea(f), i === 0 && (i = n.chapterNum));
    const m = r(f, t);
    for (let v = 0; v < m.length; v++) {
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
function Sp({
  selectedItem: e,
  text: t,
  extractItems: r,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], l = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, f] = ce(
    Na(t, e, r, n)
  );
  return He(
    () => f(Na(t, e, r, n)),
    [t, e, n, r]
  ), /* @__PURE__ */ _(kn, { stickyHeader: !0, children: [
    /* @__PURE__ */ d(En, { stickyHeader: !0, children: /* @__PURE__ */ _(yt, { children: [
      /* @__PURE__ */ d($r, { children: i }),
      /* @__PURE__ */ d($r, { children: l })
    ] }) }),
    /* @__PURE__ */ d(Nn, { children: c.map((m) => /* @__PURE__ */ _(
      yt,
      {
        onClick: () => {
          o(m.reference);
        },
        children: [
          /* @__PURE__ */ d(Jt, { children: `${me.bookNumberToEnglishName(m.reference.bookNum)} ${m.reference.chapterNum}:${m.reference.verseNum}` }),
          /* @__PURE__ */ d(Jt, { children: m.snippet })
        ]
      },
      m.key
    )) })
  ] });
}
const jv = Object.freeze([
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
]), $o = (e) => e === "asc" ? /* @__PURE__ */ d(rc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ d(nc, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ d(oc, { className: "pr-ms-2 pr-h-4 pr-w-4" }), Cp = (e, t, r) => {
  let n = e;
  return t !== "all" && (n = n.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), r !== "" && (n = n.filter((o) => o.item.includes(r))), n;
}, Op = (e, t, r) => {
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
}, mt = (e, t) => e[t] ?? t;
function Bv({
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
  getColumns: v
}) {
  const g = mt(r, "%webView_inventory_all%"), p = mt(r, "%webView_inventory_approved%"), h = mt(r, "%webView_inventory_unapproved%"), u = mt(r, "%webView_inventory_unknown%"), b = mt(r, "%webView_inventory_scope_book%"), x = mt(r, "%webView_inventory_scope_chapter%"), O = mt(r, "%webView_inventory_scope_verse%"), w = mt(r, "%webView_inventory_filter_text%"), [k, y] = ce([]), [T, S] = ce("all"), [M, D] = ce(""), [V, $] = ce(""), E = Se(
    (z, C) => {
      y((Y) => {
        let H = [];
        return z.forEach((K) => {
          H = Y.map((q) => q.item === K && q.status !== C ? { ...q, status: C } : q);
        }), H;
      });
      let B = [...o];
      z.forEach((Y) => {
        C === "approved" ? B.includes(Y) || B.push(Y) : B = B.filter((H) => H !== Y);
      }), a(B);
      let W = [...i];
      z.forEach((Y) => {
        C === "unapproved" ? W.includes(Y) || W.push(Y) : W = W.filter(
          (H) => H !== Y
        );
      }), l(W);
    },
    [o, a, i, l]
  ), R = Se(
    (z) => o.includes(z) ? "approved" : i.includes(z) ? "unapproved" : "unknown",
    [o, i]
  );
  He(() => {
    c && y(Op(c, n, R));
  }, [n, c, R]);
  const I = Mt(() => Cp(k, T, M), [k, T, M]);
  He(() => {
    $("");
  }, [I]);
  const U = (z, C) => {
    C.toggleAllRowsSelected(!1), z.toggleSelected(void 0), $(z.getValue("item"));
  }, j = Mt(() => v(E), [v, E]), G = (z) => {
    if (z === "book" || z === "chapter" || z === "verse")
      m(z);
    else
      throw new Error(`Invalid scope value: ${z}`);
  }, te = (z) => {
    if (z === "all" || z === "approved" || z === "unapproved" || z === "unknown")
      S(z);
    else
      throw new Error(`Invalid status filter value: ${z}`);
  };
  return /* @__PURE__ */ _("div", { className: "pr-twp pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ _("div", { className: "pr-flex", children: [
      /* @__PURE__ */ _(
        ln,
        {
          onValueChange: (z) => te(z),
          defaultValue: T,
          children: [
            /* @__PURE__ */ d(Rr, { className: "pr-m-1", children: /* @__PURE__ */ d(cn, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ _(Pr, { className: "pr-font-sans", children: [
              /* @__PURE__ */ d(Ke, { value: "all", children: g }),
              /* @__PURE__ */ d(Ke, { value: "approved", children: p }),
              /* @__PURE__ */ d(Ke, { value: "unapproved", children: h }),
              /* @__PURE__ */ d(Ke, { value: "unknown", children: u })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ _(ln, { onValueChange: (z) => G(z), defaultValue: f, children: [
        /* @__PURE__ */ d(Rr, { className: "pr-m-1", children: /* @__PURE__ */ d(cn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ _(Pr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(Ke, { value: "book", children: b }),
          /* @__PURE__ */ d(Ke, { value: "chapter", children: x }),
          /* @__PURE__ */ d(Ke, { value: "verse", children: O })
        ] })
      ] }),
      /* @__PURE__ */ d(
        jr,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: w,
          value: M,
          onChange: (z) => {
            D(z.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      Np,
      {
        columns: j,
        data: I,
        onRowClickHandler: U,
        stickyHeader: !0
      }
    ) }),
    V !== "" && /* @__PURE__ */ d("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      Sp,
      {
        selectedItem: V,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (z) => t(z),
        localizedStrings: r
      }
    ) })
  ] });
}
const Lv = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ _(we, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    $o(t.getIsSorted())
  ] })
}), Fv = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ _(we, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    $o(t.getIsSorted())
  ] })
}), Vv = (e, t) => ({
  accessorKey: "status",
  header: ({ column: r, table: n }) => {
    const o = n.getSelectedRowModel().rows, a = [];
    return o.forEach((i) => {
      a.push(i.getValue("item"));
    }), /* @__PURE__ */ _("div", { className: "pr-flex pr-justify-start", children: [
      /* @__PURE__ */ _(
        we,
        {
          className: "pr-mt-1",
          variant: "ghost",
          onClick: () => r.toggleSorting(void 0),
          children: [
            e,
            $o(r.getIsSorted())
          ]
        }
      ),
      /* @__PURE__ */ d(we, { className: "pr-m-1", children: /* @__PURE__ */ d(
        ga,
        {
          onClick: () => {
            t(a, "approved");
          }
        }
      ) }),
      /* @__PURE__ */ d(we, { className: "pr-m-1", children: /* @__PURE__ */ d(
        ba,
        {
          onClick: () => {
            t(a, "unapproved");
          }
        }
      ) }),
      /* @__PURE__ */ d(we, { className: "pr-m-1", children: /* @__PURE__ */ d(
        va,
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
        return /* @__PURE__ */ d(ga, {});
      case "unapproved":
        return /* @__PURE__ */ d(ba, {});
      case "unknown":
      default:
        return /* @__PURE__ */ d(va, {});
    }
  }
}), Rp = Or.Root, Pp = Or.Trigger, Xi = X.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ d(Or.Portal, { children: /* @__PURE__ */ d(
  Or.Content,
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
Xi.displayName = Or.Content.displayName;
const $p = Qe.Portal, Yi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Qe.Overlay,
  {
    ref: r,
    className: L(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Yi.displayName = Qe.Overlay.displayName;
const _p = X.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _($p, { children: [
  /* @__PURE__ */ d(Yi, {}),
  /* @__PURE__ */ _(
    Qe.Content,
    {
      ref: n,
      className: L(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ _(Qe.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ d(ac, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
_p.displayName = Qe.Content.displayName;
const Ip = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Qe.Title,
  {
    ref: r,
    className: L("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Ip.displayName = Qe.Title.displayName;
const Mp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Qe.Description,
  {
    ref: r,
    className: L("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Mp.displayName = Qe.Description.displayName;
const qi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae,
  {
    ref: r,
    className: L(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
qi.displayName = Ae.displayName;
const Ki = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ d(ic, { className: "pr-me-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ d(
    Ae.Input,
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
Ki.displayName = Ae.Input.displayName;
const Ji = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.List,
  {
    ref: r,
    className: L("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
Ji.displayName = Ae.List.displayName;
const Zi = X.forwardRef((e, t) => /* @__PURE__ */ d(Ae.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Zi.displayName = Ae.Empty.displayName;
const Ap = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.Group,
  {
    ref: r,
    className: L(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ap.displayName = Ae.Group.displayName;
const Dp = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.Separator,
  {
    ref: r,
    className: L("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Dp.displayName = Ae.Separator.displayName;
const Qi = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.Item,
  {
    ref: r,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
Qi.displayName = Ae.Item.displayName;
function jp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Ta({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = jp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: f = "outline",
  dir: m = "ltr",
  ...v
}) {
  const [g, p] = ce(!1);
  return /* @__PURE__ */ _(Rp, { open: g, onOpenChange: p, ...v, children: [
    /* @__PURE__ */ d(Pp, { asChild: !0, children: /* @__PURE__ */ _(
      we,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": g,
        id: e,
        className: L("pr-w-[200px] pr-justify-between", r),
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ d(sc, { className: "pr-ms-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ d(Xi, { className: "pr-w-[200px] pr-p-0", dir: m, children: /* @__PURE__ */ _(qi, { children: [
      /* @__PURE__ */ d(Ki, { dir: m, placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ d(Zi, { children: c }),
      /* @__PURE__ */ d(Ji, { children: t.map((h) => /* @__PURE__ */ _(
        Qi,
        {
          value: a(h),
          onSelect: () => {
            o(h), p(!1);
          },
          children: [
            /* @__PURE__ */ d(
              No,
              {
                className: L("pr-me-2 pr-h-4 pr-w-4", {
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
function zv({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: r = !1,
  chapterCount: n
}) {
  const [o, a] = ce(1), [i, l] = ce(n), [c, f] = ce(
    Array.from({ length: n }, (g, p) => p + 1)
  );
  return He(() => {
    a(1), e(1), l(n), t(n), f(Array.from({ length: n }, (g, p) => p + 1));
  }, [n, t, e]), /* @__PURE__ */ _(wt, { children: [
    /* @__PURE__ */ d(
      ya,
      {
        className: "book-selection-chapter-form-label start",
        disabled: r,
        control: /* @__PURE__ */ d(
          Ta,
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
    /* @__PURE__ */ d(
      ya,
      {
        className: "book-selection-chapter-form-label end",
        disabled: r,
        control: /* @__PURE__ */ d(
          Ta,
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
var Yt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Yt || {});
function Bp({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = Yt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: f
}) {
  const m = /* @__PURE__ */ d(
    Cc,
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
  let v;
  if (r) {
    const g = n === Yt.Before || n === Yt.Above, p = /* @__PURE__ */ d("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), h = n === Yt.Before || n === Yt.After, u = h ? p : /* @__PURE__ */ d("div", { children: p }), b = h ? m : /* @__PURE__ */ d("div", { children: m });
    v = /* @__PURE__ */ _(
      Sc,
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
    v = m;
  return v;
}
function Uv({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ _("fieldset", { id: e, className: t, children: [
    r && /* @__PURE__ */ d("legend", { children: r }),
    n.map((l) => /* @__PURE__ */ d(
      Bp,
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
function Lp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Fp(e) {
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
var _o = {}, es = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(es);
var Vp = es.exports, Hn = {};
function ar(e, t) {
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
function Pt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function ts(e) {
  if (!Pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = ts(e[r]);
  }), t;
}
function st(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? P({}, e) : e;
  return Pt(e) && Pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Pt(t[o]) && o in e && Pt(e[o]) ? n[o] = st(e[o], t[o], r) : r.clone ? n[o] = Pt(t[o]) ? ts(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var co = { exports: {} }, Jr = { exports: {} }, pe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sa;
function zp() {
  if (Sa)
    return pe;
  Sa = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
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
  function k(y) {
    return w(y) === f;
  }
  return pe.AsyncMode = c, pe.ConcurrentMode = f, pe.ContextConsumer = l, pe.ContextProvider = i, pe.Element = t, pe.ForwardRef = m, pe.Fragment = n, pe.Lazy = h, pe.Memo = p, pe.Portal = r, pe.Profiler = a, pe.StrictMode = o, pe.Suspense = v, pe.isAsyncMode = function(y) {
    return k(y) || w(y) === c;
  }, pe.isConcurrentMode = k, pe.isContextConsumer = function(y) {
    return w(y) === l;
  }, pe.isContextProvider = function(y) {
    return w(y) === i;
  }, pe.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, pe.isForwardRef = function(y) {
    return w(y) === m;
  }, pe.isFragment = function(y) {
    return w(y) === n;
  }, pe.isLazy = function(y) {
    return w(y) === h;
  }, pe.isMemo = function(y) {
    return w(y) === p;
  }, pe.isPortal = function(y) {
    return w(y) === r;
  }, pe.isProfiler = function(y) {
    return w(y) === a;
  }, pe.isStrictMode = function(y) {
    return w(y) === o;
  }, pe.isSuspense = function(y) {
    return w(y) === v;
  }, pe.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === f || y === a || y === o || y === v || y === g || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === m || y.$$typeof === b || y.$$typeof === x || y.$$typeof === O || y.$$typeof === u);
  }, pe.typeOf = w, pe;
}
var de = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ca;
function Up() {
  return Ca || (Ca = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function w(F) {
      return typeof F == "string" || typeof F == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      F === n || F === f || F === a || F === o || F === v || F === g || typeof F == "object" && F !== null && (F.$$typeof === h || F.$$typeof === p || F.$$typeof === i || F.$$typeof === l || F.$$typeof === m || F.$$typeof === b || F.$$typeof === x || F.$$typeof === O || F.$$typeof === u);
    }
    function k(F) {
      if (typeof F == "object" && F !== null) {
        var re = F.$$typeof;
        switch (re) {
          case t:
            var A = F.type;
            switch (A) {
              case c:
              case f:
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
    var y = c, T = f, S = l, M = i, D = t, V = m, $ = n, E = h, R = p, I = r, U = a, j = o, G = v, te = !1;
    function z(F) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), C(F) || k(F) === c;
    }
    function C(F) {
      return k(F) === f;
    }
    function B(F) {
      return k(F) === l;
    }
    function W(F) {
      return k(F) === i;
    }
    function Y(F) {
      return typeof F == "object" && F !== null && F.$$typeof === t;
    }
    function H(F) {
      return k(F) === m;
    }
    function K(F) {
      return k(F) === n;
    }
    function q(F) {
      return k(F) === h;
    }
    function Z(F) {
      return k(F) === p;
    }
    function J(F) {
      return k(F) === r;
    }
    function Q(F) {
      return k(F) === a;
    }
    function ee(F) {
      return k(F) === o;
    }
    function ie(F) {
      return k(F) === v;
    }
    de.AsyncMode = y, de.ConcurrentMode = T, de.ContextConsumer = S, de.ContextProvider = M, de.Element = D, de.ForwardRef = V, de.Fragment = $, de.Lazy = E, de.Memo = R, de.Portal = I, de.Profiler = U, de.StrictMode = j, de.Suspense = G, de.isAsyncMode = z, de.isConcurrentMode = C, de.isContextConsumer = B, de.isContextProvider = W, de.isElement = Y, de.isForwardRef = H, de.isFragment = K, de.isLazy = q, de.isMemo = Z, de.isPortal = J, de.isProfiler = Q, de.isStrictMode = ee, de.isSuspense = ie, de.isValidElementType = w, de.typeOf = k;
  }()), de;
}
var Oa;
function rs() {
  return Oa || (Oa = 1, process.env.NODE_ENV === "production" ? Jr.exports = zp() : Jr.exports = Up()), Jr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Gn, Ra;
function Hp() {
  if (Ra)
    return Gn;
  Ra = 1;
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
  return Gn = o() ? Object.assign : function(a, i) {
    for (var l, c = n(a), f, m = 1; m < arguments.length; m++) {
      l = Object(arguments[m]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        f = e(l);
        for (var g = 0; g < f.length; g++)
          r.call(l, f[g]) && (c[f[g]] = l[f[g]]);
      }
    }
    return c;
  }, Gn;
}
var Wn, Pa;
function Io() {
  if (Pa)
    return Wn;
  Pa = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Wn = e, Wn;
}
var Xn, $a;
function ns() {
  return $a || ($a = 1, Xn = Function.call.bind(Object.prototype.hasOwnProperty)), Xn;
}
var Yn, _a;
function Gp() {
  if (_a)
    return Yn;
  _a = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Io(), r = {}, n = ns();
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
          var v;
          try {
            if (typeof a[m] != "function") {
              var g = Error(
                (c || "React class") + ": " + l + " type `" + m + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof a[m] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`."
              );
              throw g.name = "Invariant Violation", g;
            }
            v = a[m](i, m, c, l, null, t);
          } catch (h) {
            v = h;
          }
          if (v && !(v instanceof Error) && e(
            (c || "React class") + ": type specification of " + l + " `" + m + "` is invalid; the type checker function must return `null` or an `Error` but returned a " + typeof v + ". You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument)."
          ), v instanceof Error && !(v.message in r)) {
            r[v.message] = !0;
            var p = f ? f() : "";
            e(
              "Failed " + l + " type: " + v.message + (p ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (r = {});
  }, Yn = o, Yn;
}
var qn, Ia;
function Wp() {
  if (Ia)
    return qn;
  Ia = 1;
  var e = rs(), t = Hp(), r = Io(), n = ns(), o = Gp(), a = function() {
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
  return qn = function(l, c) {
    var f = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function v(C) {
      var B = C && (f && C[f] || C[m]);
      if (typeof B == "function")
        return B;
    }
    var g = "<<anonymous>>", p = {
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
      objectOf: M,
      oneOf: S,
      oneOfType: D,
      shape: E,
      exact: R
    };
    function h(C, B) {
      return C === B ? C !== 0 || 1 / C === 1 / B : C !== C && B !== B;
    }
    function u(C, B) {
      this.message = C, this.data = B && typeof B == "object" ? B : {}, this.stack = "";
    }
    u.prototype = Error.prototype;
    function b(C) {
      if (process.env.NODE_ENV !== "production")
        var B = {}, W = 0;
      function Y(K, q, Z, J, Q, ee, ie) {
        if (J = J || g, ee = ee || Z, ie !== r) {
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
        return q[Z] == null ? K ? q[Z] === null ? new u("The " + Q + " `" + ee + "` is marked as required " + ("in `" + J + "`, but its value is `null`.")) : new u("The " + Q + " `" + ee + "` is marked as required in " + ("`" + J + "`, but its value is `undefined`.")) : null : C(q, Z, J, Q, ee);
      }
      var H = Y.bind(null, !1);
      return H.isRequired = Y.bind(null, !0), H;
    }
    function x(C) {
      function B(W, Y, H, K, q, Z) {
        var J = W[Y], Q = j(J);
        if (Q !== C) {
          var ee = G(J);
          return new u(
            "Invalid " + K + " `" + q + "` of type " + ("`" + ee + "` supplied to `" + H + "`, expected ") + ("`" + C + "`."),
            { expectedType: C }
          );
        }
        return null;
      }
      return b(B);
    }
    function O() {
      return b(i);
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
      return b(B);
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
      return b(C);
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
      return b(C);
    }
    function T(C) {
      function B(W, Y, H, K, q) {
        if (!(W[Y] instanceof C)) {
          var Z = C.name || g, J = z(W[Y]);
          return new u("Invalid " + K + " `" + q + "` of type " + ("`" + J + "` supplied to `" + H + "`, expected ") + ("instance of `" + Z + "`."));
        }
        return null;
      }
      return b(B);
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
        var Q = JSON.stringify(C, function(ie, F) {
          var re = G(F);
          return re === "symbol" ? String(F) : F;
        });
        return new u("Invalid " + K + " `" + q + "` of value `" + String(Z) + "` " + ("supplied to `" + H + "`, expected one of " + Q + "."));
      }
      return b(B);
    }
    function M(C) {
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
      return b(B);
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
          var ie = C[ee], F = ie(H, K, q, Z, J, r);
          if (F == null)
            return null;
          F.data && n(F.data, "expectedType") && Q.push(F.data.expectedType);
        }
        var re = Q.length > 0 ? ", expected one of type [" + Q.join(", ") + "]" : "";
        return new u("Invalid " + Z + " `" + J + "` supplied to " + ("`" + q + "`" + re + "."));
      }
      return b(Y);
    }
    function V() {
      function C(B, W, Y, H, K) {
        return I(B[W]) ? null : new u("Invalid " + H + " `" + K + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return b(C);
    }
    function $(C, B, W, Y, H) {
      return new u(
        (C || "React class") + ": " + B + " type `" + W + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + H + "`."
      );
    }
    function E(C) {
      function B(W, Y, H, K, q) {
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new u("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + H + "`, expected `object`."));
        for (var Q in C) {
          var ee = C[Q];
          if (typeof ee != "function")
            return $(H, K, q, Q, G(ee));
          var ie = ee(Z, Q, H, K, q + "." + Q, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return b(B);
    }
    function R(C) {
      function B(W, Y, H, K, q) {
        var Z = W[Y], J = j(Z);
        if (J !== "object")
          return new u("Invalid " + K + " `" + q + "` of type `" + J + "` " + ("supplied to `" + H + "`, expected `object`."));
        var Q = t({}, W[Y], C);
        for (var ee in Q) {
          var ie = C[ee];
          if (n(C, ee) && typeof ie != "function")
            return $(H, K, q, ee, G(ie));
          if (!ie)
            return new u(
              "Invalid " + K + " `" + q + "` key `" + ee + "` supplied to `" + H + "`.\nBad object: " + JSON.stringify(W[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(C), null, "  ")
            );
          var F = ie(Z, ee, H, K, q + "." + ee, r);
          if (F)
            return F;
        }
        return null;
      }
      return b(B);
    }
    function I(C) {
      switch (typeof C) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !C;
        case "object":
          if (Array.isArray(C))
            return C.every(I);
          if (C === null || l(C))
            return !0;
          var B = v(C);
          if (B) {
            var W = B.call(C), Y;
            if (B !== C.entries) {
              for (; !(Y = W.next()).done; )
                if (!I(Y.value))
                  return !1;
            } else
              for (; !(Y = W.next()).done; ) {
                var H = Y.value;
                if (H && !I(H[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function U(C, B) {
      return C === "symbol" ? !0 : B ? B["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && B instanceof Symbol : !1;
    }
    function j(C) {
      var B = typeof C;
      return Array.isArray(C) ? "array" : C instanceof RegExp ? "object" : U(B, C) ? "symbol" : B;
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
    function z(C) {
      return !C.constructor || !C.constructor.name ? g : C.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, qn;
}
var Kn, Ma;
function Xp() {
  if (Ma)
    return Kn;
  Ma = 1;
  var e = Io();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Kn = function() {
    function n(i, l, c, f, m, v) {
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
  }, Kn;
}
if (process.env.NODE_ENV !== "production") {
  var Yp = rs(), qp = !0;
  co.exports = Wp()(Yp.isElement, qp);
} else
  co.exports = Xp()();
var Kp = co.exports;
const s = /* @__PURE__ */ Lp(Kp);
function Jp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function os(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Jp(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const as = ar(s.element, os);
as.isRequired = ar(s.element.isRequired, os);
const Lr = as;
function Zp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Qp(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !Zp(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ed = ar(s.elementType, Qp), td = "exact-prop: ​";
function is(e) {
  return process.env.NODE_ENV === "production" ? e : P({}, e, {
    [td]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Zt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var po = { exports: {} }, ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Aa;
function rd() {
  if (Aa)
    return ue;
  Aa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function u(b) {
    if (typeof b == "object" && b !== null) {
      var x = b.$$typeof;
      switch (x) {
        case e:
          switch (b = b.type, b) {
            case r:
            case o:
            case n:
            case f:
            case m:
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
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return ue.ContextConsumer = i, ue.ContextProvider = a, ue.Element = e, ue.ForwardRef = c, ue.Fragment = r, ue.Lazy = g, ue.Memo = v, ue.Portal = t, ue.Profiler = o, ue.StrictMode = n, ue.Suspense = f, ue.SuspenseList = m, ue.isAsyncMode = function() {
    return !1;
  }, ue.isConcurrentMode = function() {
    return !1;
  }, ue.isContextConsumer = function(b) {
    return u(b) === i;
  }, ue.isContextProvider = function(b) {
    return u(b) === a;
  }, ue.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, ue.isForwardRef = function(b) {
    return u(b) === c;
  }, ue.isFragment = function(b) {
    return u(b) === r;
  }, ue.isLazy = function(b) {
    return u(b) === g;
  }, ue.isMemo = function(b) {
    return u(b) === v;
  }, ue.isPortal = function(b) {
    return u(b) === t;
  }, ue.isProfiler = function(b) {
    return u(b) === o;
  }, ue.isStrictMode = function(b) {
    return u(b) === n;
  }, ue.isSuspense = function(b) {
    return u(b) === f;
  }, ue.isSuspenseList = function(b) {
    return u(b) === m;
  }, ue.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === o || b === n || b === f || b === m || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === a || b.$$typeof === i || b.$$typeof === c || b.$$typeof === h || b.getModuleId !== void 0);
  }, ue.typeOf = u, ue;
}
var fe = {};
/**
 * @license React
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Da;
function nd() {
  return Da || (Da = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), f = Symbol.for("react.suspense"), m = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, u = !1, b = !1, x = !1, O = !1, w;
    w = Symbol.for("react.module.reference");
    function k(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === r || A === o || O || A === n || A === f || A === m || x || A === p || h || u || b || typeof A == "object" && A !== null && (A.$$typeof === g || A.$$typeof === v || A.$$typeof === a || A.$$typeof === i || A.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      A.$$typeof === w || A.getModuleId !== void 0));
    }
    function y(A) {
      if (typeof A == "object" && A !== null) {
        var se = A.$$typeof;
        switch (se) {
          case e:
            var Ne = A.type;
            switch (Ne) {
              case r:
              case o:
              case n:
              case f:
              case m:
                return Ne;
              default:
                var Pe = Ne && Ne.$$typeof;
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
    var T = i, S = a, M = e, D = c, V = r, $ = g, E = v, R = t, I = o, U = n, j = f, G = m, te = !1, z = !1;
    function C(A) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function B(A) {
      return z || (z = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function W(A) {
      return y(A) === i;
    }
    function Y(A) {
      return y(A) === a;
    }
    function H(A) {
      return typeof A == "object" && A !== null && A.$$typeof === e;
    }
    function K(A) {
      return y(A) === c;
    }
    function q(A) {
      return y(A) === r;
    }
    function Z(A) {
      return y(A) === g;
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
      return y(A) === f;
    }
    function re(A) {
      return y(A) === m;
    }
    fe.ContextConsumer = T, fe.ContextProvider = S, fe.Element = M, fe.ForwardRef = D, fe.Fragment = V, fe.Lazy = $, fe.Memo = E, fe.Portal = R, fe.Profiler = I, fe.StrictMode = U, fe.Suspense = j, fe.SuspenseList = G, fe.isAsyncMode = C, fe.isConcurrentMode = B, fe.isContextConsumer = W, fe.isContextProvider = Y, fe.isElement = H, fe.isForwardRef = K, fe.isFragment = q, fe.isLazy = Z, fe.isMemo = J, fe.isPortal = Q, fe.isProfiler = ee, fe.isStrictMode = ie, fe.isSuspense = F, fe.isSuspenseList = re, fe.isValidElementType = k, fe.typeOf = y;
  }()), fe;
}
process.env.NODE_ENV === "production" ? po.exports = rd() : po.exports = nd();
var pn = po.exports;
const od = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function ad(e) {
  const t = `${e}`.match(od);
  return t && t[1] || "";
}
function ss(e, t = "") {
  return e.displayName || e.name || ad(e) || t;
}
function ja(e, t, r) {
  const n = ss(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function id(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ss(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case pn.ForwardRef:
          return ja(e, e.render, "ForwardRef");
        case pn.Memo:
          return ja(e, e.type, "memo");
        default:
          return;
      }
  }
}
function lt(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an HTMLElement.`) : null;
}
const sd = s.oneOfType([s.func, s.object]), Mo = sd;
function et(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Zt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function uo(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function ls(e, t = 166) {
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
function ld(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function cd(e, t) {
  var r, n;
  return /* @__PURE__ */ N.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (r = e.type.muiName) != null ? r : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function Oe(e) {
  return e && e.ownerDocument || document;
}
function Qt(e) {
  return Oe(e).defaultView || window;
}
function pd(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? P({}, t.propTypes) : null;
  return (o) => (a, i, l, c, f, ...m) => {
    const v = f || i, g = r == null ? void 0 : r[v];
    if (g) {
      const p = g(a, i, l, c, f, ...m);
      if (p)
        return p;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function dn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const dd = typeof window < "u" ? N.useLayoutEffect : N.useEffect, Dt = dd;
let Ba = 0;
function ud(e) {
  const [t, r] = N.useState(e), n = e || t;
  return N.useEffect(() => {
    t == null && (Ba += 1, r(`mui-${Ba}`));
  }, [t]), n;
}
const La = N["useId".toString()];
function cs(e) {
  if (La !== void 0) {
    const t = La();
    return e ?? t;
  }
  return ud(e);
}
function fd(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function ps({
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
function _r(e) {
  const t = N.useRef(e);
  return Dt(() => {
    t.current = e;
  }), N.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function We(...e) {
  return N.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      dn(r, t);
    });
  }, e);
}
const Fa = {};
function md(e, t) {
  const r = N.useRef(Fa);
  return r.current === Fa && (r.current = e(t)), r;
}
const hd = [];
function gd(e) {
  N.useEffect(e, hd);
}
class Fr {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Fr();
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
function yr() {
  const e = md(Fr.create).current;
  return gd(e.disposeEffect), e;
}
let Tn = !0, fo = !1;
const bd = new Fr(), vd = {
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
function yd(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && vd[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function wd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Tn = !0);
}
function Jn() {
  Tn = !1;
}
function xd() {
  this.visibilityState === "hidden" && fo && (Tn = !0);
}
function kd(e) {
  e.addEventListener("keydown", wd, !0), e.addEventListener("mousedown", Jn, !0), e.addEventListener("pointerdown", Jn, !0), e.addEventListener("touchstart", Jn, !0), e.addEventListener("visibilitychange", xd, !0);
}
function Ed(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Tn || yd(t);
}
function ds() {
  const e = N.useCallback((o) => {
    o != null && kd(o.ownerDocument);
  }, []), t = N.useRef(!1);
  function r() {
    return t.current ? (fo = !0, bd.start(100, () => {
      fo = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return Ed(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function us(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function Nd(e) {
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
function Td(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const Sd = Number.isInteger || Td;
function fs(e, t, r, n) {
  const o = e[t];
  if (o == null || !Sd(o)) {
    const a = Nd(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function ms(e, t, ...r) {
  return e[t] === void 0 ? null : fs(e, t, ...r);
}
function mo() {
  return null;
}
ms.isRequired = fs;
mo.isRequired = mo;
const hs = process.env.NODE_ENV === "production" ? mo : ms;
function gs(e, t) {
  const r = P({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = P({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = P({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = gs(o[i], a[i]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function dt(e, t, r = void 0) {
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
const Va = (e) => e, Cd = () => {
  let e = Va;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Va;
    }
  };
}, Od = Cd(), bs = Od, vs = {
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
function rt(e, t, r = "Mui") {
  const n = vs[t];
  return n ? `${r}-${n}` : `${bs.generate(e)}-${t}`;
}
function xt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = rt(e, o, r);
  }), n;
}
function Rd(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
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
const Pd = ["values", "unit", "step"], $d = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => P({}, r, {
    [n.key]: n.val
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
    unit: r = "px",
    step: n = 5
  } = e, o = he(e, Pd), a = $d(t), i = Object.keys(a);
  function l(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - n / 100}${r})`;
  }
  function f(g, p) {
    const h = i.indexOf(p);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : p) - n / 100}${r})`;
  }
  function m(g) {
    return i.indexOf(g) + 1 < i.length ? f(g, i[i.indexOf(g) + 1]) : l(g);
  }
  function v(g) {
    const p = i.indexOf(g);
    return p === 0 ? l(i[1]) : p === i.length - 1 ? c(i[p]) : f(g, i[i.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return P({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: f,
    only: m,
    not: v,
    unit: r
  }, o);
}
const Id = {
  borderRadius: 4
}, Md = Id, Ad = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, kt = Ad;
function Nr(e, t) {
  return t ? st(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Ao = {
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
}, za = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Ao[e]}px)`
};
function ct(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || za;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || za;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Ao).indexOf(l) !== -1) {
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
function Dd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function jd(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function Sn(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function un(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = Sn(e, r) || n, t && (o = t(o, n, e)), o;
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
    const l = i[t], c = i.theme, f = Sn(c, n) || {};
    return ct(i, l, (v) => {
      let g = un(f, o, v);
      return v === g && typeof v == "string" && (g = un(f, o, `${t}${v === "default" ? "" : et(v)}`, v)), r === !1 ? g : {
        [r]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: kt
  } : {}, a.filterProps = [t], a;
}
function Bd(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const Ld = {
  m: "margin",
  p: "padding"
}, Fd = {
  t: "Top",
  r: "Right",
  b: "Bottom",
  l: "Left",
  x: ["Left", "Right"],
  y: ["Top", "Bottom"]
}, Ua = {
  marginX: "mx",
  marginY: "my",
  paddingX: "px",
  paddingY: "py"
}, Vd = Bd((e) => {
  if (e.length > 2)
    if (Ua[e])
      e = Ua[e];
    else
      return [e];
  const [t, r] = e.split(""), n = Ld[t], o = Fd[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), Cn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], On = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], zd = [...Cn, ...On];
function Vr(e, t, r, n) {
  var o;
  const a = (o = Sn(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ys(e) {
  return Vr(e, "spacing", 8, "spacing");
}
function zr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Ud(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = zr(t, r), n), {});
}
function Hd(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = Vd(r), a = Ud(o, n), i = e[r];
  return ct(e, i, a);
}
function ws(e, t) {
  const r = ys(e.theme);
  return Object.keys(e).map((n) => Hd(e, t, n, r)).reduce(Nr, {});
}
function ve(e) {
  return ws(e, Cn);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? Cn.reduce((e, t) => (e[t] = kt, e), {}) : {};
ve.filterProps = Cn;
function ye(e) {
  return ws(e, On);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? On.reduce((e, t) => (e[t] = kt, e), {}) : {};
ye.filterProps = On;
process.env.NODE_ENV !== "production" && zd.reduce((e, t) => (e[t] = kt, e), {});
function Gd(e = 8) {
  if (e.mui)
    return e;
  const t = ys({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function Rn(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? Nr(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function Ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function qe(e, t) {
  return Ee({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Wd = qe("border", Ue), Xd = qe("borderTop", Ue), Yd = qe("borderRight", Ue), qd = qe("borderBottom", Ue), Kd = qe("borderLeft", Ue), Jd = qe("borderColor"), Zd = qe("borderTopColor"), Qd = qe("borderRightColor"), eu = qe("borderBottomColor"), tu = qe("borderLeftColor"), ru = qe("outline", Ue), nu = qe("outlineColor"), Pn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Vr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: zr(t, n)
    });
    return ct(e, e.borderRadius, r);
  }
  return null;
};
Pn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: kt
} : {};
Pn.filterProps = ["borderRadius"];
Rn(Wd, Xd, Yd, qd, Kd, Jd, Zd, Qd, eu, tu, Pn, ru, nu);
const $n = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Vr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: zr(t, n)
    });
    return ct(e, e.gap, r);
  }
  return null;
};
$n.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: kt
} : {};
$n.filterProps = ["gap"];
const _n = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Vr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: zr(t, n)
    });
    return ct(e, e.columnGap, r);
  }
  return null;
};
_n.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: kt
} : {};
_n.filterProps = ["columnGap"];
const In = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Vr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: zr(t, n)
    });
    return ct(e, e.rowGap, r);
  }
  return null;
};
In.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: kt
} : {};
In.filterProps = ["rowGap"];
const ou = Ee({
  prop: "gridColumn"
}), au = Ee({
  prop: "gridRow"
}), iu = Ee({
  prop: "gridAutoFlow"
}), su = Ee({
  prop: "gridAutoColumns"
}), lu = Ee({
  prop: "gridAutoRows"
}), cu = Ee({
  prop: "gridTemplateColumns"
}), pu = Ee({
  prop: "gridTemplateRows"
}), du = Ee({
  prop: "gridTemplateAreas"
}), uu = Ee({
  prop: "gridArea"
});
Rn($n, _n, In, ou, au, iu, su, lu, cu, pu, du, uu);
function Kt(e, t) {
  return t === "grey" ? t : e;
}
const fu = Ee({
  prop: "color",
  themeKey: "palette",
  transform: Kt
}), mu = Ee({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Kt
}), hu = Ee({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Kt
});
Rn(fu, mu, hu);
function Fe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const gu = Ee({
  prop: "width",
  transform: Fe
}), Do = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Ao[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Fe(r)
      };
    };
    return ct(e, e.maxWidth, t);
  }
  return null;
};
Do.filterProps = ["maxWidth"];
const bu = Ee({
  prop: "minWidth",
  transform: Fe
}), vu = Ee({
  prop: "height",
  transform: Fe
}), yu = Ee({
  prop: "maxHeight",
  transform: Fe
}), wu = Ee({
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
const xu = Ee({
  prop: "boxSizing"
});
Rn(gu, Do, bu, vu, yu, wu, xu);
const ku = {
  // borders
  border: {
    themeKey: "borders",
    transform: Ue
  },
  borderTop: {
    themeKey: "borders",
    transform: Ue
  },
  borderRight: {
    themeKey: "borders",
    transform: Ue
  },
  borderBottom: {
    themeKey: "borders",
    transform: Ue
  },
  borderLeft: {
    themeKey: "borders",
    transform: Ue
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
    transform: Ue
  },
  outlineColor: {
    themeKey: "palette"
  },
  borderRadius: {
    themeKey: "shape.borderRadius",
    style: Pn
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
    style: ye
  },
  pt: {
    style: ye
  },
  pr: {
    style: ye
  },
  pb: {
    style: ye
  },
  pl: {
    style: ye
  },
  px: {
    style: ye
  },
  py: {
    style: ye
  },
  padding: {
    style: ye
  },
  paddingTop: {
    style: ye
  },
  paddingRight: {
    style: ye
  },
  paddingBottom: {
    style: ye
  },
  paddingLeft: {
    style: ye
  },
  paddingX: {
    style: ye
  },
  paddingY: {
    style: ye
  },
  paddingInline: {
    style: ye
  },
  paddingInlineStart: {
    style: ye
  },
  paddingInlineEnd: {
    style: ye
  },
  paddingBlock: {
    style: ye
  },
  paddingBlockStart: {
    style: ye
  },
  paddingBlockEnd: {
    style: ye
  },
  m: {
    style: ve
  },
  mt: {
    style: ve
  },
  mr: {
    style: ve
  },
  mb: {
    style: ve
  },
  ml: {
    style: ve
  },
  mx: {
    style: ve
  },
  my: {
    style: ve
  },
  margin: {
    style: ve
  },
  marginTop: {
    style: ve
  },
  marginRight: {
    style: ve
  },
  marginBottom: {
    style: ve
  },
  marginLeft: {
    style: ve
  },
  marginX: {
    style: ve
  },
  marginY: {
    style: ve
  },
  marginInline: {
    style: ve
  },
  marginInlineStart: {
    style: ve
  },
  marginInlineEnd: {
    style: ve
  },
  marginBlock: {
    style: ve
  },
  marginBlockStart: {
    style: ve
  },
  marginBlockEnd: {
    style: ve
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
    style: $n
  },
  rowGap: {
    style: In
  },
  columnGap: {
    style: _n
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
    style: Do
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
}, jo = ku;
function Eu(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function Nu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function Tu() {
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
      style: v
    } = l;
    if (n == null)
      return null;
    if (f === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const g = Sn(o, f) || {};
    return v ? v(i) : ct(i, n, (h) => {
      let u = un(g, m, h);
      return h === u && typeof h == "string" && (u = un(g, m, `${r}${h === "default" ? "" : et(h)}`, h)), c === !1 ? u : {
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
    const i = (n = a.unstable_sxConfig) != null ? n : jo;
    function l(c) {
      let f = c;
      if (typeof c == "function")
        f = c(a);
      else if (typeof c != "object")
        return c;
      if (!f)
        return null;
      const m = Dd(a.breakpoints), v = Object.keys(m);
      let g = m;
      return Object.keys(f).forEach((p) => {
        const h = Nu(f[p], a);
        if (h != null)
          if (typeof h == "object")
            if (i[p])
              g = Nr(g, e(p, h, a, i));
            else {
              const u = ct({
                theme: a
              }, h, (b) => ({
                [p]: b
              }));
              Eu(u, h) ? g[p] = t({
                sx: h,
                theme: a
              }) : g = Nr(g, u);
            }
          else
            g = Nr(g, e(p, h, a, i));
      }), jd(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const xs = Tu();
xs.filterProps = ["sx"];
const Bo = xs;
function Su(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const Cu = ["breakpoints", "palette", "spacing", "shape"];
function Lo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = he(e, Cu), l = _d(r), c = Gd(o);
  let f = st({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, n),
    spacing: c,
    shape: P({}, Md, a)
  }, i);
  return f.applyStyles = Su, f = t.reduce((m, v) => st(m, v), f), f.unstable_sxConfig = P({}, jo, i == null ? void 0 : i.unstable_sxConfig), f.unstable_sx = function(v) {
    return Bo({
      sx: v,
      theme: this
    });
  }, f;
}
function Ou(e) {
  return Object.keys(e).length === 0;
}
function ks(e = null) {
  const t = N.useContext(Lc);
  return !t || Ou(t) ? e : t;
}
const Ru = Lo();
function Es(e = Ru) {
  return ks(e);
}
const Pu = ["ownerState"], $u = ["variants"], _u = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Iu(e) {
  return Object.keys(e).length === 0;
}
function Mu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function rn(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Au = Lo(), Ha = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Zr({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return Iu(t) ? e : t[r] || t;
}
function Du(e) {
  return e ? (t, r) => r[e] : null;
}
function nn(e, t) {
  let {
    ownerState: r
  } = t, n = he(t, Pu);
  const o = typeof e == "function" ? e(P({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => nn(a, P({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = he(o, $u);
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
function ju(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = Au,
    rootShouldForwardProp: n = rn,
    slotShouldForwardProp: o = rn
  } = e, a = (i) => Bo(P({}, i, {
    theme: Zr(P({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Fc(i, (y) => y.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: c,
      slot: f,
      skipVariantsResolver: m,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = Du(Ha(f))
    } = l, p = he(l, _u), h = m !== void 0 ? m : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      f && f !== "Root" && f !== "root" || !1
    ), u = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${Ha(f || "Root")}`);
    let x = rn;
    f === "Root" || f === "root" ? x = n : f ? x = o : Mu(i) && (x = void 0);
    const O = Bc(i, P({
      shouldForwardProp: x,
      label: b
    }, p)), w = (y) => typeof y == "function" && y.__emotion_real !== y || Pt(y) ? (T) => nn(y, P({}, T, {
      theme: Zr({
        theme: T.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, k = (y, ...T) => {
      let S = w(y);
      const M = T ? T.map(w) : [];
      c && g && M.push(($) => {
        const E = Zr(P({}, $, {
          defaultTheme: r,
          themeId: t
        }));
        if (!E.components || !E.components[c] || !E.components[c].styleOverrides)
          return null;
        const R = E.components[c].styleOverrides, I = {};
        return Object.entries(R).forEach(([U, j]) => {
          I[U] = nn(j, P({}, $, {
            theme: E
          }));
        }), g($, I);
      }), c && !h && M.push(($) => {
        var E;
        const R = Zr(P({}, $, {
          defaultTheme: r,
          themeId: t
        })), I = R == null || (E = R.components) == null || (E = E[c]) == null ? void 0 : E.variants;
        return nn({
          variants: I
        }, P({}, $, {
          theme: R
        }));
      }), u || M.push(a);
      const D = M.length - T.length;
      if (Array.isArray(y) && D > 0) {
        const $ = new Array(D).fill("");
        S = [...y, ...$], S.raw = [...y.raw, ...$];
      }
      const V = O(S, ...M);
      if (process.env.NODE_ENV !== "production") {
        let $;
        c && ($ = `${c}${et(f || "")}`), $ === void 0 && ($ = `Styled(${id(i)})`), V.displayName = $;
      }
      return i.muiName && (V.muiName = i.muiName), V;
    };
    return O.withConfig && (k.withConfig = O.withConfig), k;
  };
}
function Bu(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : gs(t.components[r].defaultProps, n);
}
function Lu({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = Es(r);
  return n && (o = o[n] || o), Bu({
    theme: o,
    name: t,
    props: e
  });
}
function Fo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), Rd(e, t, r);
}
function Fu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function jt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return jt(Fu(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Zt(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Zt(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function Mn(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Vu(e) {
  e = jt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (f, m = (f + r / 30) % 12) => o - a * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Mn({
    type: l,
    values: c
  });
}
function Ga(e) {
  e = jt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? jt(Vu(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Wa(e, t) {
  const r = Ga(e), n = Ga(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function fn(e, t) {
  return e = jt(e), t = Fo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Mn(e);
}
function zu(e, t) {
  if (e = jt(e), t = Fo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Mn(e);
}
function Uu(e, t) {
  if (e = jt(e), t = Fo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Mn(e);
}
function Hu(e, t) {
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
const Gu = {
  black: "#000",
  white: "#fff"
}, Ir = Gu, Wu = {
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
}, Xu = Wu, Yu = {
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
}, Vt = Yu, qu = {
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
}, zt = qu, Ku = {
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
}, fr = Ku, Ju = {
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
}, Ut = Ju, Zu = {
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
}, Ht = Zu, Qu = {
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
}, Gt = Qu, ef = ["mode", "contrastThreshold", "tonalOffset"], Xa = {
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
    paper: Ir.white,
    default: Ir.white
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
}, Zn = {
  text: {
    primary: Ir.white,
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
    active: Ir.white,
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
function Ya(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Uu(e.main, o) : t === "dark" && (e.dark = zu(e.main, a)));
}
function tf(e = "light") {
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
function rf(e = "light") {
  return e === "dark" ? {
    main: Vt[200],
    light: Vt[50],
    dark: Vt[400]
  } : {
    main: Vt[500],
    light: Vt[300],
    dark: Vt[700]
  };
}
function nf(e = "light") {
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
function of(e = "light") {
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
function af(e = "light") {
  return e === "dark" ? {
    main: Gt[400],
    light: Gt[300],
    dark: Gt[700]
  } : {
    main: Gt[800],
    light: Gt[500],
    dark: Gt[900]
  };
}
function sf(e = "light") {
  return e === "dark" ? {
    main: fr[400],
    light: fr[300],
    dark: fr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: fr[500],
    dark: fr[900]
  };
}
function lf(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = he(e, ef), a = e.primary || tf(t), i = e.secondary || rf(t), l = e.error || nf(t), c = e.info || of(t), f = e.success || af(t), m = e.warning || sf(t);
  function v(u) {
    const b = Wa(u, Zn.text.primary) >= r ? Zn.text.primary : Xa.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = Wa(u, b);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return b;
  }
  const g = ({
    color: u,
    name: b,
    mainShade: x = 500,
    lightShade: O = 300,
    darkShade: w = 700
  }) => {
    if (u = P({}, u), !u.main && u[x] && (u.main = u[x]), !u.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Zt(11, b ? ` (${b})` : "", x));
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
} });` : Zt(12, b ? ` (${b})` : "", JSON.stringify(u.main)));
    return Ya(u, "light", O, n), Ya(u, "dark", w, n), u.contrastText || (u.contrastText = v(u.main)), u;
  }, p = {
    dark: Zn,
    light: Xa
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), st(P({
    // A collection of common colors.
    common: P({}, Ir),
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
    grey: Xu,
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
const cf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function pf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const qa = {
  textTransform: "uppercase"
}, Ka = '"Roboto", "Helvetica", "Arial", sans-serif';
function df(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = Ka,
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
    pxToRem: v
  } = r, g = he(r, cf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof f != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((x) => `${x / f * p}rem`), u = (x, O, w, k, y) => P({
    fontFamily: n,
    fontWeight: x,
    fontSize: h(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === Ka ? {
    letterSpacing: `${pf(k / O)}em`
  } : {}, y, m), b = {
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
    button: u(l, 14, 1.75, 0.4, qa),
    caption: u(i, 12, 1.66, 0.4),
    overline: u(i, 12, 2.66, 1, qa),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return st(P({
    htmlFontSize: f,
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
const uf = 0.2, ff = 0.14, mf = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${uf})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${ff})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${mf})`].join(",");
}
const hf = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], gf = hf, bf = ["duration", "easing", "delay"], vf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, yf = {
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
function Ja(e) {
  return `${Math.round(e)}ms`;
}
function wf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function xf(e) {
  const t = P({}, vf, e.easing), r = P({}, yf, e.duration);
  return P({
    getAutoHeightDuration: wf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, f = he(a, bf);
      if (process.env.NODE_ENV !== "production") {
        const m = (g) => typeof g == "string", v = (g) => !isNaN(parseFloat(g));
        !m(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !m(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), m(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !m(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(f).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(f).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((m) => `${m} ${typeof i == "string" ? i : Ja(i)} ${l} ${typeof c == "string" ? c : Ja(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const kf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, Ef = kf, Nf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function Tf(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = he(e, Nf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Zt(18));
  const l = lf(n), c = Lo(e);
  let f = st(c, {
    mixins: Hu(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: gf.slice(),
    typography: df(l, a),
    transitions: xf(o),
    zIndex: P({}, Ef)
  });
  if (f = st(f, i), f = t.reduce((m, v) => st(m, v), f), process.env.NODE_ENV !== "production") {
    const m = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (g, p) => {
      let h;
      for (h in g) {
        const u = g[h];
        if (m.indexOf(h) !== -1 && Object.keys(u).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const b = rt("", h);
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
    Object.keys(f.components).forEach((g) => {
      const p = f.components[g].styleOverrides;
      p && g.indexOf("Mui") === 0 && v(p, g);
    });
  }
  return f.unstable_sxConfig = P({}, jo, i == null ? void 0 : i.unstable_sxConfig), f.unstable_sx = function(v) {
    return Bo({
      sx: v,
      theme: this
    });
  }, f;
}
const Sf = Tf(), Vo = Sf, zo = "$$material";
function ut({
  props: e,
  name: t
}) {
  return Lu({
    props: e,
    name: t,
    defaultTheme: Vo,
    themeId: zo
  });
}
const Ns = (e) => rn(e) && e !== "classes", Cf = ju({
  themeId: zo,
  defaultTheme: Vo,
  rootShouldForwardProp: Ns
}), Re = Cf;
function Of(e) {
  return rt("MuiSvgIcon", e);
}
xt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const Rf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Pf = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${et(t)}`, `fontSize${et(r)}`]
  };
  return dt(o, Of, n);
}, $f = Re("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.root, r.color !== "inherit" && t[`color${et(r.color)}`], t[`fontSize${et(r.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var r, n, o, a, i, l, c, f, m, v, g, p, h;
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
    color: (v = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Uo = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = ut({
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
    titleAccess: v,
    viewBox: g = "0 0 24 24"
  } = n, p = he(n, Rf), h = /* @__PURE__ */ N.isValidElement(o) && o.type === "svg", u = P({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: g,
    hasSvgAsChild: h
  }), b = {};
  m || (b.viewBox = g);
  const x = Pf(u);
  return /* @__PURE__ */ _($f, P({
    as: l,
    className: Ce(x.root, a),
    focusable: "false",
    color: f,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: r
  }, b, p, h && o.props, {
    ownerState: u,
    children: [h ? o.props.children : o, v ? /* @__PURE__ */ d("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (Uo.propTypes = {
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
Uo.muiName = "SvgIcon";
const Za = Uo;
function Ts(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ d(Za, P({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Za.muiName, /* @__PURE__ */ N.memo(/* @__PURE__ */ N.forwardRef(r));
}
const _f = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), bs.configure(e);
  }
}, If = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: et,
  createChainedFunction: uo,
  createSvgIcon: Ts,
  debounce: ls,
  deprecatedPropType: ld,
  isMuiElement: cd,
  ownerDocument: Oe,
  ownerWindow: Qt,
  requirePropFactory: pd,
  setRef: dn,
  unstable_ClassNameGenerator: _f,
  unstable_useEnhancedEffect: Dt,
  unstable_useId: cs,
  unsupportedProp: fd,
  useControlled: ps,
  useEventCallback: _r,
  useForkRef: We,
  useIsFocusVisible: ds
}, Symbol.toStringTag, { value: "Module" })), Mf = /* @__PURE__ */ Fp(If);
var Qa;
function Af() {
  return Qa || (Qa = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = Mf;
  }(Hn)), Hn;
}
var Df = Vp;
Object.defineProperty(_o, "__esModule", {
  value: !0
});
var Ss = _o.default = void 0, jf = Df(Af()), Bf = Hl;
Ss = _o.default = (0, jf.default)(/* @__PURE__ */ (0, Bf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Cs(e) {
  return typeof e == "string";
}
function wr(e, t, r) {
  return e === void 0 || Cs(e) ? t : P({}, t, {
    ownerState: P({}, t.ownerState, r)
  });
}
const Lf = {
  disableDefaultClasses: !1
}, Ff = /* @__PURE__ */ N.createContext(Lf);
function Vf(e) {
  const {
    disableDefaultClasses: t
  } = N.useContext(Ff);
  return (r) => t ? "" : e(r);
}
function Os(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function zf(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function ei(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Uf(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Ce(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = P({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), u = P({}, r, o, n);
    return p.length > 0 && (u.className = p), Object.keys(h).length > 0 && (u.style = h), {
      props: u,
      internalRef: void 0
    };
  }
  const i = Os(P({}, o, n)), l = ei(n), c = ei(o), f = t(i), m = Ce(f == null ? void 0 : f.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = P({}, f == null ? void 0 : f.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = P({}, f, r, c, l);
  return m.length > 0 && (g.className = m), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: f.ref
  };
}
const Hf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Bt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = he(e, Hf), l = a ? {} : zf(n, o), {
    props: c,
    internalRef: f
  } = Uf(P({}, i, {
    externalSlotProps: l
  })), m = We(f, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return wr(r, P({}, c, {
    ref: m
  }), o);
}
const Rs = "base";
function Gf(e) {
  return `${Rs}--${e}`;
}
function Wf(e, t) {
  return `${Rs}-${e}-${t}`;
}
function Ps(e, t) {
  const r = vs[t];
  return r ? Gf(r) : Wf(e, t);
}
function Xf(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Ps(e, n);
  }), r;
}
const Yf = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function qf(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Kf(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function Jf(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Kf(e));
}
function Zf(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(Yf)).forEach((n, o) => {
    const a = qf(n);
    a === -1 || !Jf(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function Qf() {
  return !0;
}
function mn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = Zf,
    isEnabled: i = Qf,
    open: l
  } = e, c = N.useRef(!1), f = N.useRef(null), m = N.useRef(null), v = N.useRef(null), g = N.useRef(null), p = N.useRef(!1), h = N.useRef(null), u = We(t.ref, h), b = N.useRef(null);
  N.useEffect(() => {
    !l || !h.current || (p.current = !r);
  }, [r, l]), N.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Oe(h.current);
    return h.current.contains(w.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), N.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Oe(h.current), k = (S) => {
      b.current = S, !(n || !i() || S.key !== "Tab") && w.activeElement === h.current && S.shiftKey && (c.current = !0, m.current && m.current.focus());
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
      if (!p.current)
        return;
      let M = [];
      if ((w.activeElement === f.current || w.activeElement === m.current) && (M = a(h.current)), M.length > 0) {
        var D, V;
        const $ = !!((D = b.current) != null && D.shiftKey && ((V = b.current) == null ? void 0 : V.key) === "Tab"), E = M[0], R = M[M.length - 1];
        typeof E != "string" && typeof R != "string" && ($ ? R.focus() : E.focus());
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
    v.current === null && (v.current = w.relatedTarget), p.current = !0, g.current = w.target;
    const k = t.props.onFocus;
    k && k(w);
  }, O = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ _(N.Fragment, {
    children: [/* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: f,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ N.cloneElement(t, {
      ref: u,
      onFocus: x
    }), /* @__PURE__ */ d("div", {
      tabIndex: l ? 0 : -1,
      onFocus: O,
      ref: m,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (mn.propTypes = {
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
process.env.NODE_ENV !== "production" && (mn["propTypes"] = is(mn.propTypes));
function em(e) {
  return typeof e == "function" ? e() : e;
}
const Mr = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = N.useState(null), c = We(/* @__PURE__ */ N.isValidElement(n) ? n.ref : null, r);
  if (Dt(() => {
    a || l(em(o) || document.body);
  }, [o, a]), Dt(() => {
    if (i && !a)
      return dn(r, i), () => {
        dn(r, null);
      };
  }, [r, i, a]), a) {
    if (/* @__PURE__ */ N.isValidElement(n)) {
      const f = {
        ref: c
      };
      return /* @__PURE__ */ N.cloneElement(n, f);
    }
    return /* @__PURE__ */ d(N.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ d(N.Fragment, {
    children: i && /* @__PURE__ */ Vc.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (Mr.propTypes = {
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
  container: s.oneOfType([lt, s.func]),
  /**
   * The `children` will be under the DOM hierarchy of the parent component.
   * @default false
   */
  disablePortal: s.bool
});
process.env.NODE_ENV !== "production" && (Mr["propTypes"] = is(Mr.propTypes));
function tm(e) {
  const t = Oe(e);
  return t.body === e ? Qt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Tr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function ti(e) {
  return parseInt(Qt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function rm(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function ri(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !rm(i);
    l && c && Tr(i, o);
  });
}
function Qn(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function nm(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (tm(n)) {
      const i = us(Oe(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${ti(n) + i}px`;
      const l = Oe(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${ti(c) + i}px`;
      });
    }
    let a;
    if (n.parentNode instanceof DocumentFragment)
      a = Oe(n).body;
    else {
      const i = n.parentElement, l = Qt(n);
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
function om(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class am {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Tr(t.modalRef, !1);
    const o = om(r);
    ri(r, t.mount, t.modalRef, o, !0);
    const a = Qn(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = Qn(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = nm(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = Qn(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Tr(t.modalRef, r), ri(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && Tr(i.modalRef, !1);
    }
    return n;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function im(e) {
  return typeof e == "function" ? e() : e;
}
function sm(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const lm = new am();
function cm(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = lm,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: f,
    open: m,
    rootRef: v
  } = e, g = N.useRef({}), p = N.useRef(null), h = N.useRef(null), u = We(h, v), [b, x] = N.useState(!m), O = sm(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const k = () => Oe(p.current), y = () => (g.current.modalRef = h.current, g.current.mount = p.current, g.current), T = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, S = _r(() => {
    const j = im(t) || k().body;
    o.add(y(), j), h.current && T();
  }), M = N.useCallback(() => o.isTopModal(y()), [o]), D = _r((j) => {
    p.current = j, j && (m && M() ? T() : h.current && Tr(h.current, w));
  }), V = N.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  N.useEffect(() => () => {
    V();
  }, [V]), N.useEffect(() => {
    m ? S() : (!O || !a) && V();
  }, [m, V, O, a, S]);
  const $ = (j) => (G) => {
    var te;
    (te = j.onKeyDown) == null || te.call(j, G), !(G.key !== "Escape" || G.which === 229 || // Wait until IME is settled.
    !M()) && (r || (G.stopPropagation(), f && f(G, "escapeKeyDown")));
  }, E = (j) => (G) => {
    var te;
    (te = j.onClick) == null || te.call(j, G), G.target === G.currentTarget && f && f(G, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const G = Os(e);
      delete G.onTransitionEnter, delete G.onTransitionExited;
      const te = P({}, G, j);
      return P({
        role: "presentation"
      }, te, {
        onKeyDown: $(te),
        ref: u
      });
    },
    getBackdropProps: (j = {}) => {
      const G = j;
      return P({
        "aria-hidden": !0
      }, G, {
        onClick: E(G),
        open: m
      });
    },
    getTransitionProps: () => {
      const j = () => {
        x(!1), i && i();
      }, G = () => {
        x(!0), l && l(), a && V();
      };
      return {
        onEnter: uo(j, c == null ? void 0 : c.props.onEnter),
        onExited: uo(G, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: u,
    portalRef: D,
    isTopModal: M,
    exited: b,
    hasTransition: O
  };
}
var Ie = "top", Xe = "bottom", Ye = "right", Me = "left", Ho = "auto", Ur = [Ie, Xe, Ye, Me], er = "start", Ar = "end", pm = "clippingParents", $s = "viewport", mr = "popper", dm = "reference", ni = /* @__PURE__ */ Ur.reduce(function(e, t) {
  return e.concat([t + "-" + er, t + "-" + Ar]);
}, []), _s = /* @__PURE__ */ [].concat(Ur, [Ho]).reduce(function(e, t) {
  return e.concat([t, t + "-" + er, t + "-" + Ar]);
}, []), um = "beforeRead", fm = "read", mm = "afterRead", hm = "beforeMain", gm = "main", bm = "afterMain", vm = "beforeWrite", ym = "write", wm = "afterWrite", xm = [um, fm, mm, hm, gm, bm, vm, ym, wm];
function tt(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Ve(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Lt(e) {
  var t = Ve(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ge(e) {
  var t = Ve(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Go(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Ve(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function km(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Ge(a) || !tt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function Em(e) {
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
      !Ge(o) || !tt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const Nm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: km,
  effect: Em,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var It = Math.max, hn = Math.min, tr = Math.round;
function ho() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Is() {
  return !/^((?!chrome|android).)*safari/i.test(ho());
}
function rr(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && tr(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && tr(n.height) / e.offsetHeight || 1);
  var i = Lt(e) ? Ve(e) : window, l = i.visualViewport, c = !Is() && r, f = (n.left + (c && l ? l.offsetLeft : 0)) / o, m = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, g = n.height / a;
  return {
    width: v,
    height: g,
    top: m,
    right: f + v,
    bottom: m + g,
    left: f,
    x: f,
    y: m
  };
}
function Wo(e) {
  var t = rr(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Ms(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Go(r)) {
    var n = t;
    do {
      if (n && e.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function pt(e) {
  return Ve(e).getComputedStyle(e);
}
function Tm(e) {
  return ["table", "td", "th"].indexOf(tt(e)) >= 0;
}
function Et(e) {
  return ((Lt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function An(e) {
  return tt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Go(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Et(e)
  );
}
function oi(e) {
  return !Ge(e) || // https://github.com/popperjs/popper-core/issues/837
  pt(e).position === "fixed" ? null : e.offsetParent;
}
function Sm(e) {
  var t = /firefox/i.test(ho()), r = /Trident/i.test(ho());
  if (r && Ge(e)) {
    var n = pt(e);
    if (n.position === "fixed")
      return null;
  }
  var o = An(e);
  for (Go(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(tt(o)) < 0; ) {
    var a = pt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Hr(e) {
  for (var t = Ve(e), r = oi(e); r && Tm(r) && pt(r).position === "static"; )
    r = oi(r);
  return r && (tt(r) === "html" || tt(r) === "body" && pt(r).position === "static") ? t : r || Sm(e) || t;
}
function Xo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Sr(e, t, r) {
  return It(e, hn(t, r));
}
function Cm(e, t, r) {
  var n = Sr(e, t, r);
  return n > r ? r : n;
}
function As() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ds(e) {
  return Object.assign({}, As(), e);
}
function js(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var Om = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Ds(typeof t != "number" ? t : js(t, Ur));
};
function Rm(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = Ze(r.placement), c = Xo(l), f = [Me, Ye].indexOf(l) >= 0, m = f ? "height" : "width";
  if (!(!a || !i)) {
    var v = Om(o.padding, r), g = Wo(a), p = c === "y" ? Ie : Me, h = c === "y" ? Xe : Ye, u = r.rects.reference[m] + r.rects.reference[c] - i[c] - r.rects.popper[m], b = i[c] - r.rects.reference[c], x = Hr(a), O = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = u / 2 - b / 2, k = v[p], y = O - g[m] - v[h], T = O / 2 - g[m] / 2 + w, S = Sr(k, T, y), M = c;
    r.modifiersData[n] = (t = {}, t[M] = S, t.centerOffset = S - T, t);
  }
}
function Pm(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Ms(t.elements.popper, o) && (t.elements.arrow = o));
}
const $m = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: Rm,
  effect: Pm,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function nr(e) {
  return e.split("-")[1];
}
var _m = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Im(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: tr(r * o) / o || 0,
    y: tr(n * o) / o || 0
  };
}
function ai(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, f = e.adaptive, m = e.roundOffsets, v = e.isFixed, g = i.x, p = g === void 0 ? 0 : g, h = i.y, u = h === void 0 ? 0 : h, b = typeof m == "function" ? m({
    x: p,
    y: u
  }) : {
    x: p,
    y: u
  };
  p = b.x, u = b.y;
  var x = i.hasOwnProperty("x"), O = i.hasOwnProperty("y"), w = Me, k = Ie, y = window;
  if (f) {
    var T = Hr(r), S = "clientHeight", M = "clientWidth";
    if (T === Ve(r) && (T = Et(r), pt(T).position !== "static" && l === "absolute" && (S = "scrollHeight", M = "scrollWidth")), T = T, o === Ie || (o === Me || o === Ye) && a === Ar) {
      k = Xe;
      var D = v && T === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[S]
      );
      u -= D - n.height, u *= c ? 1 : -1;
    }
    if (o === Me || (o === Ie || o === Xe) && a === Ar) {
      w = Ye;
      var V = v && T === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[M]
      );
      p -= V - n.width, p *= c ? 1 : -1;
    }
  }
  var $ = Object.assign({
    position: l
  }, f && _m), E = m === !0 ? Im({
    x: p,
    y: u
  }, Ve(r)) : {
    x: p,
    y: u
  };
  if (p = E.x, u = E.y, c) {
    var R;
    return Object.assign({}, $, (R = {}, R[k] = O ? "0" : "", R[w] = x ? "0" : "", R.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + u + "px)" : "translate3d(" + p + "px, " + u + "px, 0)", R));
  }
  return Object.assign({}, $, (t = {}, t[k] = O ? u + "px" : "", t[w] = x ? p + "px" : "", t.transform = "", t));
}
function Mm(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, f = {
    placement: Ze(t.placement),
    variation: nr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, ai(Object.assign({}, f, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, ai(Object.assign({}, f, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const Am = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Mm,
  data: {}
};
var Qr = {
  passive: !0
};
function Dm(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = Ve(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && f.forEach(function(m) {
    m.addEventListener("scroll", r.update, Qr);
  }), l && c.addEventListener("resize", r.update, Qr), function() {
    a && f.forEach(function(m) {
      m.removeEventListener("scroll", r.update, Qr);
    }), l && c.removeEventListener("resize", r.update, Qr);
  };
}
const jm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Dm,
  data: {}
};
var Bm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function on(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Bm[t];
  });
}
var Lm = {
  start: "end",
  end: "start"
};
function ii(e) {
  return e.replace(/start|end/g, function(t) {
    return Lm[t];
  });
}
function Yo(e) {
  var t = Ve(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function qo(e) {
  return rr(Et(e)).left + Yo(e).scrollLeft;
}
function Fm(e, t) {
  var r = Ve(e), n = Et(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var f = Is();
    (f || !f && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + qo(e),
    y: c
  };
}
function Vm(e) {
  var t, r = Et(e), n = Yo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = It(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = It(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + qo(e), c = -n.scrollTop;
  return pt(o || r).direction === "rtl" && (l += It(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function Ko(e) {
  var t = pt(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function Bs(e) {
  return ["html", "body", "#document"].indexOf(tt(e)) >= 0 ? e.ownerDocument.body : Ge(e) && Ko(e) ? e : Bs(An(e));
}
function Cr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Bs(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Ve(n), i = o ? [a].concat(a.visualViewport || [], Ko(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Cr(An(i)))
  );
}
function go(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function zm(e, t) {
  var r = rr(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function si(e, t, r) {
  return t === $s ? go(Fm(e, r)) : Lt(t) ? zm(t, r) : go(Vm(Et(e)));
}
function Um(e) {
  var t = Cr(An(e)), r = ["absolute", "fixed"].indexOf(pt(e).position) >= 0, n = r && Ge(e) ? Hr(e) : e;
  return Lt(n) ? t.filter(function(o) {
    return Lt(o) && Ms(o, n) && tt(o) !== "body";
  }) : [];
}
function Hm(e, t, r, n) {
  var o = t === "clippingParents" ? Um(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, f) {
    var m = si(e, f, n);
    return c.top = It(m.top, c.top), c.right = hn(m.right, c.right), c.bottom = hn(m.bottom, c.bottom), c.left = It(m.left, c.left), c;
  }, si(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ls(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Ze(n) : null, a = n ? nr(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
  switch (o) {
    case Ie:
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
    case Me:
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
  var f = o ? Xo(o) : null;
  if (f != null) {
    var m = f === "y" ? "height" : "width";
    switch (a) {
      case er:
        c[f] = c[f] - (t[m] / 2 - r[m] / 2);
        break;
      case Ar:
        c[f] = c[f] + (t[m] / 2 - r[m] / 2);
        break;
    }
  }
  return c;
}
function Dr(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? pm : l, f = r.rootBoundary, m = f === void 0 ? $s : f, v = r.elementContext, g = v === void 0 ? mr : v, p = r.altBoundary, h = p === void 0 ? !1 : p, u = r.padding, b = u === void 0 ? 0 : u, x = Ds(typeof b != "number" ? b : js(b, Ur)), O = g === mr ? dm : mr, w = e.rects.popper, k = e.elements[h ? O : g], y = Hm(Lt(k) ? k : k.contextElement || Et(e.elements.popper), c, m, i), T = rr(e.elements.reference), S = Ls({
    reference: T,
    element: w,
    strategy: "absolute",
    placement: o
  }), M = go(Object.assign({}, w, S)), D = g === mr ? M : T, V = {
    top: y.top - D.top + x.top,
    bottom: D.bottom - y.bottom + x.bottom,
    left: y.left - D.left + x.left,
    right: D.right - y.right + x.right
  }, $ = e.modifiersData.offset;
  if (g === mr && $) {
    var E = $[o];
    Object.keys(V).forEach(function(R) {
      var I = [Ye, Xe].indexOf(R) >= 0 ? 1 : -1, U = [Ie, Xe].indexOf(R) >= 0 ? "y" : "x";
      V[R] += E[U] * I;
    });
  }
  return V;
}
function Gm(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, f = c === void 0 ? _s : c, m = nr(n), v = m ? l ? ni : ni.filter(function(h) {
    return nr(h) === m;
  }) : Ur, g = v.filter(function(h) {
    return f.indexOf(h) >= 0;
  });
  g.length === 0 && (g = v);
  var p = g.reduce(function(h, u) {
    return h[u] = Dr(e, {
      placement: u,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Ze(u)], h;
  }, {});
  return Object.keys(p).sort(function(h, u) {
    return p[h] - p[u];
  });
}
function Wm(e) {
  if (Ze(e) === Ho)
    return [];
  var t = on(e);
  return [ii(e), t, ii(t)];
}
function Xm(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, f = r.padding, m = r.boundary, v = r.rootBoundary, g = r.altBoundary, p = r.flipVariations, h = p === void 0 ? !0 : p, u = r.allowedAutoPlacements, b = t.options.placement, x = Ze(b), O = x === b, w = c || (O || !h ? [on(b)] : Wm(b)), k = [b].concat(w).reduce(function(H, K) {
      return H.concat(Ze(K) === Ho ? Gm(t, {
        placement: K,
        boundary: m,
        rootBoundary: v,
        padding: f,
        flipVariations: h,
        allowedAutoPlacements: u
      }) : K);
    }, []), y = t.rects.reference, T = t.rects.popper, S = /* @__PURE__ */ new Map(), M = !0, D = k[0], V = 0; V < k.length; V++) {
      var $ = k[V], E = Ze($), R = nr($) === er, I = [Ie, Xe].indexOf(E) >= 0, U = I ? "width" : "height", j = Dr(t, {
        placement: $,
        boundary: m,
        rootBoundary: v,
        altBoundary: g,
        padding: f
      }), G = I ? R ? Ye : Me : R ? Xe : Ie;
      y[U] > T[U] && (G = on(G));
      var te = on(G), z = [];
      if (a && z.push(j[E] <= 0), l && z.push(j[G] <= 0, j[te] <= 0), z.every(function(H) {
        return H;
      })) {
        D = $, M = !1;
        break;
      }
      S.set($, z);
    }
    if (M)
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
const Ym = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Xm,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function li(e, t, r) {
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
function ci(e) {
  return [Ie, Ye, Xe, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function qm(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Dr(t, {
    elementContext: "reference"
  }), l = Dr(t, {
    altBoundary: !0
  }), c = li(i, n), f = li(l, o, a), m = ci(c), v = ci(f);
  t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: f,
    isReferenceHidden: m,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": m,
    "data-popper-escaped": v
  });
}
const Km = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: qm
};
function Jm(e, t, r) {
  var n = Ze(e), o = [Me, Ie].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Me, Ye].indexOf(n) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Zm(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = _s.reduce(function(m, v) {
    return m[v] = Jm(v, t.rects, a), m;
  }, {}), l = i[t.placement], c = l.x, f = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += f), t.modifiersData[n] = i;
}
const Qm = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Zm
};
function eh(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Ls({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const th = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: eh,
  data: {}
};
function rh(e) {
  return e === "x" ? "y" : "x";
}
function nh(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, f = r.rootBoundary, m = r.altBoundary, v = r.padding, g = r.tether, p = g === void 0 ? !0 : g, h = r.tetherOffset, u = h === void 0 ? 0 : h, b = Dr(t, {
    boundary: c,
    rootBoundary: f,
    padding: v,
    altBoundary: m
  }), x = Ze(t.placement), O = nr(t.placement), w = !O, k = Xo(x), y = rh(k), T = t.modifiersData.popperOffsets, S = t.rects.reference, M = t.rects.popper, D = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, V = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), $ = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, E = {
    x: 0,
    y: 0
  };
  if (T) {
    if (a) {
      var R, I = k === "y" ? Ie : Me, U = k === "y" ? Xe : Ye, j = k === "y" ? "height" : "width", G = T[k], te = G + b[I], z = G - b[U], C = p ? -M[j] / 2 : 0, B = O === er ? S[j] : M[j], W = O === er ? -M[j] : -S[j], Y = t.elements.arrow, H = p && Y ? Wo(Y) : {
        width: 0,
        height: 0
      }, K = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : As(), q = K[I], Z = K[U], J = Sr(0, S[j], H[j]), Q = w ? S[j] / 2 - C - J - q - V.mainAxis : B - J - q - V.mainAxis, ee = w ? -S[j] / 2 + C + J + Z + V.mainAxis : W + J + Z + V.mainAxis, ie = t.elements.arrow && Hr(t.elements.arrow), F = ie ? k === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, re = (R = $ == null ? void 0 : $[k]) != null ? R : 0, A = G + Q - re - F, se = G + ee - re, Ne = Sr(p ? hn(te, A) : te, G, p ? It(z, se) : z);
      T[k] = Ne, E[k] = Ne - G;
    }
    if (l) {
      var Pe, ke = k === "x" ? Ie : Me, Nt = k === "x" ? Xe : Ye, $e = T[y], nt = y === "y" ? "height" : "width", je = $e + b[ke], ot = $e - b[Nt], Te = [Ie, Me].indexOf(x) !== -1, Ft = (Pe = $ == null ? void 0 : $[y]) != null ? Pe : 0, Tt = Te ? je : $e - S[nt] - M[nt] - Ft + V.altAxis, ir = Te ? $e + S[nt] + M[nt] - Ft - V.altAxis : ot, Xr = p && Te ? Cm(Tt, $e, ir) : Sr(p ? Tt : je, $e, p ? ir : ot);
      T[y] = Xr, E[y] = Xr - $e;
    }
    t.modifiersData[n] = E;
  }
}
const oh = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: nh,
  requiresIfExists: ["offset"]
};
function ah(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function ih(e) {
  return e === Ve(e) || !Ge(e) ? Yo(e) : ah(e);
}
function sh(e) {
  var t = e.getBoundingClientRect(), r = tr(t.width) / e.offsetWidth || 1, n = tr(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function lh(e, t, r) {
  r === void 0 && (r = !1);
  var n = Ge(t), o = Ge(t) && sh(t), a = Et(t), i = rr(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((tt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ko(a)) && (l = ih(t)), Ge(t) ? (c = rr(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = qo(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function ch(e) {
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
function ph(e) {
  var t = ch(e);
  return xm.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function dh(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function uh(e) {
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
var pi = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function di() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function fh(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? pi : o;
  return function(l, c, f) {
    f === void 0 && (f = a);
    var m = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, pi, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, v = [], g = !1, p = {
      state: m,
      setOptions: function(x) {
        var O = typeof x == "function" ? x(m.options) : x;
        u(), m.options = Object.assign({}, a, m.options, O), m.scrollParents = {
          reference: Lt(l) ? Cr(l) : l.contextElement ? Cr(l.contextElement) : [],
          popper: Cr(c)
        };
        var w = ph(uh([].concat(n, m.options.modifiers)));
        return m.orderedModifiers = w.filter(function(k) {
          return k.enabled;
        }), h(), p.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function() {
        if (!g) {
          var x = m.elements, O = x.reference, w = x.popper;
          if (di(O, w)) {
            m.rects = {
              reference: lh(O, Hr(w), m.options.strategy === "fixed"),
              popper: Wo(w)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(V) {
              return m.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var k = 0; k < m.orderedModifiers.length; k++) {
              if (m.reset === !0) {
                m.reset = !1, k = -1;
                continue;
              }
              var y = m.orderedModifiers[k], T = y.fn, S = y.options, M = S === void 0 ? {} : S, D = y.name;
              typeof T == "function" && (m = T({
                state: m,
                options: M,
                name: D,
                instance: p
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: dh(function() {
        return new Promise(function(b) {
          p.forceUpdate(), b(m);
        });
      }),
      destroy: function() {
        u(), g = !0;
      }
    };
    if (!di(l, c))
      return p;
    p.setOptions(f).then(function(b) {
      !g && f.onFirstUpdate && f.onFirstUpdate(b);
    });
    function h() {
      m.orderedModifiers.forEach(function(b) {
        var x = b.name, O = b.options, w = O === void 0 ? {} : O, k = b.effect;
        if (typeof k == "function") {
          var y = k({
            state: m,
            name: x,
            instance: p,
            options: w
          }), T = function() {
          };
          v.push(y || T);
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
var mh = [jm, th, Am, Nm, Qm, Ym, oh, $m, Km], hh = /* @__PURE__ */ fh({
  defaultModifiers: mh
});
const Fs = "Popper";
function gh(e) {
  return Ps(Fs, e);
}
Xf(Fs, ["root"]);
const bh = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], vh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function yh(e, t) {
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
function gn(e) {
  return typeof e == "function" ? e() : e;
}
function Dn(e) {
  return e.nodeType !== void 0;
}
function wh(e) {
  return !Dn(e);
}
const xh = () => dt({
  root: ["root"]
}, Vf(gh)), kh = {}, Eh = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: f,
    placement: m,
    popperOptions: v,
    popperRef: g,
    slotProps: p = {},
    slots: h = {},
    TransitionProps: u
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, b = he(t, bh), x = N.useRef(null), O = We(x, r), w = N.useRef(null), k = We(w, g), y = N.useRef(k);
  Dt(() => {
    y.current = k;
  }, [k]), N.useImperativeHandle(g, () => w.current, []);
  const T = yh(m, i), [S, M] = N.useState(T), [D, V] = N.useState(gn(o));
  N.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), N.useEffect(() => {
    o && V(gn(o));
  }, [o]), Dt(() => {
    if (!D || !f)
      return;
    const U = (te) => {
      M(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && Dn(D) && D.nodeType === 1) {
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
        U(te);
      }
    }];
    c != null && (j = j.concat(c)), v && v.modifiers != null && (j = j.concat(v.modifiers));
    const G = hh(D, x.current, P({
      placement: T
    }, v, {
      modifiers: j
    }));
    return y.current(G), () => {
      G.destroy(), y.current(null);
    };
  }, [D, l, c, f, v, T]);
  const $ = {
    placement: S
  };
  u !== null && ($.TransitionProps = u);
  const E = xh(), R = (n = h.root) != null ? n : "div", I = Bt({
    elementType: R,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: O
    },
    ownerState: t,
    className: E.root
  });
  return /* @__PURE__ */ d(R, P({}, I, {
    children: typeof a == "function" ? a($) : a
  }));
}), Vs = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: f,
    open: m,
    placement: v = "bottom",
    popperOptions: g = kh,
    popperRef: p,
    style: h,
    transition: u = !1,
    slotProps: b = {},
    slots: x = {}
  } = t, O = he(t, vh), [w, k] = N.useState(!0), y = () => {
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
    const V = gn(n);
    S = V && Dn(V) ? Oe(V).body : Oe(null).body;
  }
  const M = !m && c && (!u || w) ? "none" : void 0, D = u ? {
    in: m,
    onEnter: y,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ d(Mr, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ d(Eh, P({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: f,
      ref: r,
      open: u ? !w : m,
      placement: v,
      popperOptions: g,
      popperRef: p,
      slotProps: b,
      slots: x
    }, O, {
      style: P({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: M
      }, h),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Vs.propTypes = {
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
  anchorEl: ar(s.oneOfType([lt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = gn(e.anchorEl);
      if (t && Dn(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || wh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  container: s.oneOfType([lt, s.func]),
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
  popperRef: Mo,
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
function Gr() {
  const e = Es(Vo);
  return process.env.NODE_ENV !== "production" && N.useDebugValue(e), e[zo] || e;
}
function bo(e, t) {
  return bo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, bo(e, t);
}
function Nh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, bo(e, t);
}
const ui = {
  disabled: !1
};
var Th = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const zs = X.createContext(null);
var Sh = function(t) {
  return t.scrollTop;
}, xr = "unmounted", Ct = "exited", Ot = "entering", qt = "entered", vo = "exiting", ft = /* @__PURE__ */ function(e) {
  Nh(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = Ct, a.appearStatus = Ot) : c = qt : n.unmountOnExit || n.mountOnEnter ? c = xr : c = Ct, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === xr ? {
      status: Ct
    } : null;
  };
  var r = t.prototype;
  return r.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, r.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== Ot && i !== qt && (a = Ot) : (i === Ot || i === qt) && (a = vo);
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
      if (this.cancelNextCallback(), a === Ot) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Kr.findDOMNode(this);
          i && Sh(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ct && this.setState({
        status: xr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Kr.findDOMNode(this), l], f = c[0], m = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
    if (!o && !i || ui.disabled) {
      this.safeSetState({
        status: qt
      }, function() {
        a.props.onEntered(f);
      });
      return;
    }
    this.props.onEnter(f, m), this.safeSetState({
      status: Ot
    }, function() {
      a.props.onEntering(f, m), a.onTransitionEnd(g, function() {
        a.safeSetState({
          status: qt
        }, function() {
          a.props.onEntered(f, m);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Kr.findDOMNode(this);
    if (!a || ui.disabled) {
      this.safeSetState({
        status: Ct
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: vo
    }, function() {
      o.props.onExiting(l), o.onTransitionEnd(i.exit, function() {
        o.safeSetState({
          status: Ct
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Kr.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === xr)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = he(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ X.createElement(zs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : X.cloneElement(X.Children.only(i), l))
    );
  }, t;
}(X.Component);
ft.contextType = zs;
ft.propTypes = process.env.NODE_ENV !== "production" ? {
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
    var r = Th;
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
function Wt() {
}
ft.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Wt,
  onEntering: Wt,
  onEntered: Wt,
  onExit: Wt,
  onExiting: Wt,
  onExited: Wt
};
ft.UNMOUNTED = xr;
ft.EXITED = Ct;
ft.ENTERING = Ot;
ft.ENTERED = qt;
ft.EXITING = vo;
const Us = ft, Hs = (e) => e.scrollTop;
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
const Ch = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function yo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const Oh = {
  entering: {
    opacity: 1,
    transform: yo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, eo = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Jo = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: f,
    onEntering: m,
    onExit: v,
    onExited: g,
    onExiting: p,
    style: h,
    timeout: u = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: b = Us
  } = t, x = he(t, Ch), O = yr(), w = N.useRef(), k = Gr(), y = N.useRef(null), T = We(y, a.ref, r), S = (U) => (j) => {
    if (U) {
      const G = y.current;
      j === void 0 ? U(G) : U(G, j);
    }
  }, M = S(m), D = S((U, j) => {
    Hs(U);
    const {
      duration: G,
      delay: te,
      easing: z
    } = bn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "enter"
    });
    let C;
    u === "auto" ? (C = k.transitions.getAutoHeightDuration(U.clientHeight), w.current = C) : C = G, U.style.transition = [k.transitions.create("opacity", {
      duration: C,
      delay: te
    }), k.transitions.create("transform", {
      duration: eo ? C : C * 0.666,
      delay: te,
      easing: z
    })].join(","), c && c(U, j);
  }), V = S(f), $ = S(p), E = S((U) => {
    const {
      duration: j,
      delay: G,
      easing: te
    } = bn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "exit"
    });
    let z;
    u === "auto" ? (z = k.transitions.getAutoHeightDuration(U.clientHeight), w.current = z) : z = j, U.style.transition = [k.transitions.create("opacity", {
      duration: z,
      delay: G
    }), k.transitions.create("transform", {
      duration: eo ? z : z * 0.666,
      delay: eo ? G : G || z * 0.333,
      easing: te
    })].join(","), U.style.opacity = 0, U.style.transform = yo(0.75), v && v(U);
  }), R = S(g);
  return /* @__PURE__ */ d(b, P({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: V,
    onEntering: M,
    onExit: E,
    onExited: R,
    onExiting: $,
    addEndListener: (U) => {
      u === "auto" && O.start(w.current || 0, U), n && n(y.current, U);
    },
    timeout: u === "auto" ? null : u
  }, x, {
    children: (U, j) => /* @__PURE__ */ N.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: yo(0.75),
        visibility: U === "exited" && !l ? "hidden" : void 0
      }, Oh[U], h, a.props.style),
      ref: T
    }, j))
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
const wo = Jo, Rh = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, fi = Rh, Ph = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], $h = Re(Vs, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Gs = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n;
  const o = ks(), a = ut({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: f,
    container: m,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: u,
    popperOptions: b,
    popperRef: x,
    transition: O,
    slots: w,
    slotProps: k
  } = a, y = he(a, Ph), T = (n = w == null ? void 0 : w.root) != null ? n : c == null ? void 0 : c.Root, S = P({
    anchorEl: i,
    container: m,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: u,
    popperOptions: b,
    popperRef: x,
    transition: O
  }, y);
  return /* @__PURE__ */ d($h, P({
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
process.env.NODE_ENV !== "production" && (Gs.propTypes = {
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
  anchorEl: s.oneOfType([lt, s.object, s.func]),
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
  container: s.oneOfType([lt, s.func]),
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
  popperRef: Mo,
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
const Ws = Gs;
function _h(e) {
  return rt("MuiTooltip", e);
}
const Ih = xt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), vt = Ih, Mh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Ah(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Dh = (e) => {
  const {
    classes: t,
    disableInteractive: r,
    arrow: n,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !r && "popperInteractive", n && "popperArrow"],
    tooltip: ["tooltip", n && "tooltipArrow", o && "touch", `tooltipPlacement${et(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return dt(i, _h, t);
}, jh = Re(Ws, {
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
  [`&[data-popper-placement*="bottom"] .${vt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${vt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${vt.arrow}`]: P({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${vt.arrow}`]: P({}, t.isRtl ? {
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
})), Bh = Re("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: r
    } = e;
    return [t.tooltip, r.touch && t.touch, r.arrow && t.tooltipArrow, t[`tooltipPlacement${et(r.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => P({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : fn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Ah(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${vt.popper}[data-popper-placement*="left"] &`]: P({
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
  [`.${vt.popper}[data-popper-placement*="right"] &`]: P({
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
  [`.${vt.popper}[data-popper-placement*="top"] &`]: P({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${vt.popper}[data-popper-placement*="bottom"] &`]: P({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Lh = Re("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : fn(e.palette.grey[700], 0.9),
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
let en = !1;
const mi = new Fr();
let hr = {
  x: 0,
  y: 0
};
function tn(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const Xs = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c, f, m, v, g, p, h, u, b, x, O, w, k, y;
  const T = ut({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: M,
    components: D = {},
    componentsProps: V = {},
    describeChild: $ = !1,
    disableFocusListener: E = !1,
    disableHoverListener: R = !1,
    disableInteractive: I = !1,
    disableTouchListener: U = !1,
    enterDelay: j = 100,
    enterNextDelay: G = 0,
    enterTouchDelay: te = 700,
    followCursor: z = !1,
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
    TransitionComponent: F = wo,
    TransitionProps: re
  } = T, A = he(T, Mh), se = /* @__PURE__ */ N.isValidElement(M) ? M : /* @__PURE__ */ d("span", {
    children: M
  }), Ne = Gr(), Pe = Ne.direction === "rtl", [ke, Nt] = N.useState(), [$e, nt] = N.useState(null), je = N.useRef(!1), ot = I || z, Te = yr(), Ft = yr(), Tt = yr(), ir = yr(), [Xr, ta] = ps({
    controlled: K,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let at = Xr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = N.useRef(K !== void 0);
    N.useEffect(() => {
      ke && ke.disabled && !ne && ie !== "" && ke.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, ke, ne]);
  }
  const jn = cs(C), sr = N.useRef(), Yr = _r(() => {
    sr.current !== void 0 && (document.body.style.WebkitUserSelect = sr.current, sr.current = void 0), ir.clear();
  });
  N.useEffect(() => Yr, [Yr]);
  const ra = (ne) => {
    mi.clear(), en = !0, ta(!0), H && !at && H(ne);
  }, qr = _r(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      mi.start(800 + B, () => {
        en = !1;
      }), ta(!1), Y && at && Y(ne), Te.start(Ne.transitions.duration.shortest, () => {
        je.current = !1;
      });
    }
  ), Bn = (ne) => {
    je.current && ne.type !== "touchstart" || (ke && ke.removeAttribute("title"), Ft.clear(), Tt.clear(), j || en && G ? Ft.start(en ? G : j, () => {
      ra(ne);
    }) : ra(ne));
  }, na = (ne) => {
    Ft.clear(), Tt.start(B, () => {
      qr(ne);
    });
  }, {
    isFocusVisibleRef: oa,
    onBlur: _l,
    onFocus: Il,
    ref: Ml
  } = ds(), [, aa] = N.useState(!1), ia = (ne) => {
    _l(ne), oa.current === !1 && (aa(!1), na(ne));
  }, sa = (ne) => {
    ke || Nt(ne.currentTarget), Il(ne), oa.current === !0 && (aa(!0), Bn(ne));
  }, la = (ne) => {
    je.current = !0;
    const Be = se.props;
    Be.onTouchStart && Be.onTouchStart(ne);
  }, ca = Bn, pa = na, Al = (ne) => {
    la(ne), Tt.clear(), Te.clear(), Yr(), sr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", ir.start(te, () => {
      document.body.style.WebkitUserSelect = sr.current, Bn(ne);
    });
  }, Dl = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Yr(), Tt.start(W, () => {
      qr(ne);
    });
  };
  N.useEffect(() => {
    if (!at)
      return;
    function ne(Be) {
      (Be.key === "Escape" || Be.key === "Esc") && qr(Be);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [qr, at]);
  const jl = We(se.ref, Ml, Nt, r);
  !ie && ie !== 0 && (at = !1);
  const Ln = N.useRef(), Bl = (ne) => {
    const Be = se.props;
    Be.onMouseMove && Be.onMouseMove(ne), hr = {
      x: ne.clientX,
      y: ne.clientY
    }, Ln.current && Ln.current.update();
  }, lr = {}, Fn = typeof ie == "string";
  $ ? (lr.title = !at && Fn && !R ? ie : null, lr["aria-describedby"] = at ? jn : null) : (lr["aria-label"] = Fn ? ie : null, lr["aria-labelledby"] = at && !Fn ? jn : null);
  const ze = P({}, lr, A, se.props, {
    className: Ce(A.className, se.props.className),
    onTouchStart: la,
    ref: jl
  }, z ? {
    onMouseMove: Bl
  } : {});
  process.env.NODE_ENV !== "production" && (ze["data-mui-internal-clone-element"] = !0, N.useEffect(() => {
    ke && !ke.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ke]));
  const cr = {};
  U || (ze.onTouchStart = Al, ze.onTouchEnd = Dl), R || (ze.onMouseOver = tn(ca, ze.onMouseOver), ze.onMouseLeave = tn(pa, ze.onMouseLeave), ot || (cr.onMouseOver = ca, cr.onMouseLeave = pa)), E || (ze.onFocus = tn(sa, ze.onFocus), ze.onBlur = tn(ia, ze.onBlur), ot || (cr.onFocus = sa, cr.onBlur = ia)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const Ll = N.useMemo(() => {
    var ne;
    let Be = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (ne = J.popperOptions) != null && ne.modifiers && (Be = Be.concat(J.popperOptions.modifiers)), P({}, J.popperOptions, {
      modifiers: Be
    });
  }, [$e, J]), pr = P({}, T, {
    isRtl: Pe,
    arrow: S,
    disableInteractive: ot,
    placement: q,
    PopperComponentProp: Z,
    touch: je.current
  }), Vn = Dh(pr), da = (n = (o = ee.popper) != null ? o : D.Popper) != null ? n : jh, ua = (a = (i = (l = ee.transition) != null ? l : D.Transition) != null ? i : F) != null ? a : wo, fa = (c = (f = ee.tooltip) != null ? f : D.Tooltip) != null ? c : Bh, ma = (m = (v = ee.arrow) != null ? v : D.Arrow) != null ? m : Lh, Fl = wr(da, P({}, J, (g = Q.popper) != null ? g : V.popper, {
    className: Ce(Vn.popper, J == null ? void 0 : J.className, (p = (h = Q.popper) != null ? h : V.popper) == null ? void 0 : p.className)
  }), pr), Vl = wr(ua, P({}, re, (u = Q.transition) != null ? u : V.transition), pr), zl = wr(fa, P({}, (b = Q.tooltip) != null ? b : V.tooltip, {
    className: Ce(Vn.tooltip, (x = (O = Q.tooltip) != null ? O : V.tooltip) == null ? void 0 : x.className)
  }), pr), Ul = wr(ma, P({}, (w = Q.arrow) != null ? w : V.arrow, {
    className: Ce(Vn.arrow, (k = (y = Q.arrow) != null ? y : V.arrow) == null ? void 0 : k.className)
  }), pr);
  return /* @__PURE__ */ _(N.Fragment, {
    children: [/* @__PURE__ */ N.cloneElement(se, ze), /* @__PURE__ */ d(da, P({
      as: Z ?? Ws,
      placement: q,
      anchorEl: z ? {
        getBoundingClientRect: () => ({
          top: hr.y,
          left: hr.x,
          right: hr.x,
          bottom: hr.y,
          width: 0,
          height: 0
        })
      } : ke,
      popperRef: Ln,
      open: ke ? at : !1,
      id: jn,
      transition: !0
    }, cr, Fl, {
      popperOptions: Ll,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ d(ua, P({
        timeout: Ne.transitions.duration.shorter
      }, ne, Vl, {
        children: /* @__PURE__ */ _(fa, P({}, zl, {
          children: [ie, S ? /* @__PURE__ */ d(ma, P({}, Ul, {
            ref: nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Xs.propTypes = {
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
   * By default, the element is based on this [`Transition`](http://reactcommunity.org/react-transition-group/transition/) component.
   */
  TransitionProps: s.object
});
const Fh = Xs;
function hi(e, t, r) {
  return e ? /* @__PURE__ */ d($i, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ d("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ys(e) {
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
    isSubMenuParent: v = !1,
    hasDisabledGutters: g = !1,
    hasDivider: p = !1,
    focusVisibleClassName: h,
    id: u,
    children: b
  } = e, x = /* @__PURE__ */ d(
    Oc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: f,
      dense: m,
      disableGutters: g,
      divider: p,
      focusVisibleClassName: h,
      onClick: t,
      id: u,
      children: r ? /* @__PURE__ */ _(wt, { children: [
        hi(a, r, !0),
        /* @__PURE__ */ d(Rc, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ d($i, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ d(Ss, {}) }) : hi(i, r, !1)
      ] }) : b
    }
  );
  return n ? /* @__PURE__ */ d(Fh, { title: n, placement: "right", children: /* @__PURE__ */ d("div", { children: x }) }) : x;
}
function qs(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function Vh(e) {
  const [t, r] = ce(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (f) => {
    r(f.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let f = qs(a).filter((m) => "menuItem" in m.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return f = f.filter(
      (m) => "menuItem" in m.group && m.group.menuItem === n.id
    ), /* @__PURE__ */ d(Zo, { ...e, includedGroups: f });
  };
  return /* @__PURE__ */ _(wt, { children: [
    /* @__PURE__ */ d(Ys, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ d(
      Pc,
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
const zh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Zo(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = Mt(() => {
    const m = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      qs(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(m).sort(
      (h, u) => (h.group.order || 0) - (u.group.order || 0)
    ), g = [];
    v.forEach((h) => {
      zh(h.id, t.items).forEach(
        (u) => g.push({ item: u, isLastItemInGroup: !1 })
      ), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !0);
    }), g.length > 0 && (g[g.length - 1].isLastItemInGroup = !1);
    const p = g.some(
      (h) => "iconPathBefore" in h.item && h.item.iconPathBefore
    );
    return { items: g, allowForLeadingIcons: p };
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
  const f = c.item.group;
  return /* @__PURE__ */ d("div", { role: "menu", "aria-label": f, children: a.map((m, v) => {
    const { item: g } = m, p = l(m);
    if ("command" in g) {
      const h = g.group + v;
      return /* @__PURE__ */ d(
        Ys,
        {
          onClick: (u) => {
            r == null || r(u), n(g);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ d(
      Vh,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      f + g.id
    );
  }) }, f);
}
function Uh(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ d(Zo, { ...e, includedGroups: a });
}
function Hh({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ _(
    _i,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ d("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ d($c, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ d(
          Uh,
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
function Gh({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = Mt(() => {
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
  return /* @__PURE__ */ d(
    _i,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, l) => /* @__PURE__ */ d(
        Hh,
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
const Ks = /* @__PURE__ */ N.createContext({});
process.env.NODE_ENV !== "production" && (Ks.displayName = "ListContext");
const Wh = Ks;
function Xh(e) {
  return rt("MuiList", e);
}
xt("MuiList", ["root", "padding", "dense", "subheader"]);
const Yh = ["children", "className", "component", "dense", "disablePadding", "subheader"], qh = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return dt({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, Xh, t);
}, Kh = Re("ul", {
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
})), Js = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = ut({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: f
  } = n, m = he(n, Yh), v = N.useMemo(() => ({
    dense: l
  }), [l]), g = P({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = qh(g);
  return /* @__PURE__ */ d(Wh.Provider, {
    value: v,
    children: /* @__PURE__ */ _(Kh, P({
      as: i,
      className: Ce(p.root, a),
      ref: r,
      ownerState: g
    }, m, {
      children: [f, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Js.propTypes = {
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
const Jh = Js, Zh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function to(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function gi(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function Zs(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function gr(e, t, r, n, o, a) {
  let i = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Zs(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Qs = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    variant: v = "selectedMenu"
  } = t, g = he(t, Zh), p = N.useRef(null), h = N.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  Dt(() => {
    o && p.current.focus();
  }, [o]), N.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (w, k) => {
      const y = !p.current.style.width;
      if (w.clientHeight < p.current.clientHeight && y) {
        const T = `${us(Oe(w))}px`;
        p.current.style[k.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, p.current.style.width = `calc(100% + ${T})`;
      }
      return p.current;
    }
  }), []);
  const u = (w) => {
    const k = p.current, y = w.key, T = Oe(k).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), gr(k, T, f, c, to);
    else if (y === "ArrowUp")
      w.preventDefault(), gr(k, T, f, c, gi);
    else if (y === "Home")
      w.preventDefault(), gr(k, null, f, c, to);
    else if (y === "End")
      w.preventDefault(), gr(k, null, f, c, gi);
    else if (y.length === 1) {
      const S = h.current, M = y.toLowerCase(), D = performance.now();
      S.keys.length > 0 && (D - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && M !== S.keys[0] && (S.repeating = !1)), S.lastTime = D, S.keys.push(M);
      const V = T && !S.repeating && Zs(T, S);
      S.previousKeyMatched && (V || gr(k, T, !1, c, to, S)) ? w.preventDefault() : S.previousKeyMatched = !1;
    }
    m && m(w);
  }, b = We(p, r);
  let x = -1;
  N.Children.forEach(i, (w, k) => {
    if (!/* @__PURE__ */ N.isValidElement(w)) {
      x === k && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && pn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (v === "selectedMenu" && w.props.selected || x === -1) && (x = k), x === k && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const O = N.Children.map(i, (w, k) => {
    if (k === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ N.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ d(Jh, P({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: u,
    tabIndex: o ? 0 : -1
  }, g, {
    children: O
  }));
});
process.env.NODE_ENV !== "production" && (Qs.propTypes = {
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
const Qh = Qs, eg = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], tg = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, el = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = Gr(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: i = !0,
    children: l,
    easing: c,
    in: f,
    onEnter: m,
    onEntered: v,
    onEntering: g,
    onExit: p,
    onExited: h,
    onExiting: u,
    style: b,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: O = Us
  } = t, w = he(t, eg), k = N.useRef(null), y = We(k, l.ref, r), T = (I) => (U) => {
    if (I) {
      const j = k.current;
      U === void 0 ? I(j) : I(j, U);
    }
  }, S = T(g), M = T((I, U) => {
    Hs(I);
    const j = bn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    I.style.webkitTransition = n.transitions.create("opacity", j), I.style.transition = n.transitions.create("opacity", j), m && m(I, U);
  }), D = T(v), V = T(u), $ = T((I) => {
    const U = bn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    I.style.webkitTransition = n.transitions.create("opacity", U), I.style.transition = n.transitions.create("opacity", U), p && p(I);
  }), E = T(h);
  return /* @__PURE__ */ d(O, P({
    appear: i,
    in: f,
    nodeRef: k,
    onEnter: M,
    onEntered: D,
    onEntering: S,
    onExit: $,
    onExited: E,
    onExiting: V,
    addEndListener: (I) => {
      a && a(k.current, I);
    },
    timeout: x
  }, w, {
    children: (I, U) => /* @__PURE__ */ N.cloneElement(l, P({
      style: P({
        opacity: 0,
        visibility: I === "exited" && !f ? "hidden" : void 0
      }, tg[I], b, l.props.style),
      ref: y
    }, U))
  }));
});
process.env.NODE_ENV !== "production" && (el.propTypes = {
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
const rg = el;
function ng(e) {
  return rt("MuiBackdrop", e);
}
xt("MuiBackdrop", ["root", "invisible"]);
const og = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], ag = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return dt({
    root: ["root", r && "invisible"]
  }, ng, t);
}, ig = Re("div", {
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
})), tl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a;
  const i = ut({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: f = "div",
    components: m = {},
    componentsProps: v = {},
    invisible: g = !1,
    open: p,
    slotProps: h = {},
    slots: u = {},
    TransitionComponent: b = rg,
    transitionDuration: x
  } = i, O = he(i, og), w = P({}, i, {
    component: f,
    invisible: g
  }), k = ag(w), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ d(b, P({
    in: p,
    timeout: x
  }, O, {
    children: /* @__PURE__ */ d(ig, P({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = u.root) != null ? a : m.Root) != null ? o : f,
      className: Ce(k.root, c, y == null ? void 0 : y.className),
      ownerState: P({}, w, y == null ? void 0 : y.ownerState),
      classes: k,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (tl.propTypes = {
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
const sg = tl;
function lg(e) {
  return rt("MuiModal", e);
}
xt("MuiModal", ["root", "hidden", "backdrop"]);
const cg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], pg = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return dt({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, lg, n);
}, dg = Re("div", {
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
})), ug = Re(sg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), rl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const f = ut({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: m = ug,
    BackdropProps: v,
    className: g,
    closeAfterTransition: p = !1,
    children: h,
    container: u,
    component: b,
    components: x = {},
    componentsProps: O = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: k = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: T = !1,
    disableRestoreFocus: S = !1,
    disableScrollLock: M = !1,
    hideBackdrop: D = !1,
    keepMounted: V = !1,
    onBackdropClick: $,
    open: E,
    slotProps: R,
    slots: I
    // eslint-disable-next-line react/prop-types
  } = f, U = he(f, cg), j = P({}, f, {
    closeAfterTransition: p,
    disableAutoFocus: w,
    disableEnforceFocus: k,
    disableEscapeKeyDown: y,
    disablePortal: T,
    disableRestoreFocus: S,
    disableScrollLock: M,
    hideBackdrop: D,
    keepMounted: V
  }), {
    getRootProps: G,
    getBackdropProps: te,
    getTransitionProps: z,
    portalRef: C,
    isTopModal: B,
    exited: W,
    hasTransition: Y
  } = cm(P({}, j, {
    rootRef: r
  })), H = P({}, j, {
    exited: W
  }), K = pg(H), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), Y) {
    const {
      onEnter: re,
      onExited: A
    } = z();
    q.onEnter = re, q.onExited = A;
  }
  const Z = (n = (o = I == null ? void 0 : I.root) != null ? o : x.Root) != null ? n : dg, J = (a = (i = I == null ? void 0 : I.backdrop) != null ? i : x.Backdrop) != null ? a : m, Q = (l = R == null ? void 0 : R.root) != null ? l : O.root, ee = (c = R == null ? void 0 : R.backdrop) != null ? c : O.backdrop, ie = Bt({
    elementType: Z,
    externalSlotProps: Q,
    externalForwardedProps: U,
    getSlotProps: G,
    additionalProps: {
      ref: r,
      as: b
    },
    ownerState: H,
    className: Ce(g, Q == null ? void 0 : Q.className, K == null ? void 0 : K.root, !H.open && H.exited && (K == null ? void 0 : K.hidden))
  }), F = Bt({
    elementType: J,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (re) => te(P({}, re, {
      onClick: (A) => {
        $ && $(A), re != null && re.onClick && re.onClick(A);
      }
    })),
    className: Ce(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, K == null ? void 0 : K.backdrop),
    ownerState: H
  });
  return !V && !E && (!Y || W) ? null : /* @__PURE__ */ d(Mr, {
    ref: C,
    container: u,
    disablePortal: T,
    children: /* @__PURE__ */ _(Z, P({}, ie, {
      children: [!D && m ? /* @__PURE__ */ d(J, P({}, F)) : null, /* @__PURE__ */ d(mn, {
        disableEnforceFocus: k,
        disableAutoFocus: w,
        disableRestoreFocus: S,
        isEnabled: B,
        open: E,
        children: /* @__PURE__ */ N.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (rl.propTypes = {
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
  container: s.oneOfType([lt, s.func]),
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
const fg = rl;
function mg(e) {
  return rt("MuiPaper", e);
}
xt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const hg = ["className", "component", "elevation", "square", "variant"], gg = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return dt(a, mg, o);
}, bg = Re("div", {
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
    backgroundImage: `linear-gradient(${fn("#fff", fi(t.elevation))}, ${fn("#fff", fi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), nl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = ut({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, f = he(n, hg), m = P({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = gg(m);
  return process.env.NODE_ENV !== "production" && Gr().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ d(bg, P({
    as: a,
    ownerState: m,
    className: Ce(v.root, o),
    ref: r
  }, f));
});
process.env.NODE_ENV !== "production" && (nl.propTypes = {
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
  elevation: ar(hs, (e) => {
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
const vg = nl;
function yg(e) {
  return rt("MuiPopover", e);
}
xt("MuiPopover", ["root", "paper"]);
const wg = ["onEntering"], xg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], kg = ["slotProps"];
function bi(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function vi(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function yi(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function an(e) {
  return typeof e == "function" ? e() : e;
}
const Eg = (e) => {
  const {
    classes: t
  } = e;
  return dt({
    root: ["root"],
    paper: ["paper"]
  }, yg, t);
}, Ng = Re(fg, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), ol = Re(vg, {
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
}), al = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a;
  const i = ut({
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
    anchorReference: v = "anchorEl",
    children: g,
    className: p,
    container: h,
    elevation: u = 8,
    marginThreshold: b = 16,
    open: x,
    PaperProps: O = {},
    slots: w,
    slotProps: k,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: T = wo,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: M
    } = {},
    disableScrollLock: D = !1
  } = i, V = he(i.TransitionProps, wg), $ = he(i, xg), E = (n = k == null ? void 0 : k.paper) != null ? n : O, R = N.useRef(), I = We(R, E.ref), U = P({}, i, {
    anchorOrigin: f,
    anchorReference: v,
    elevation: u,
    marginThreshold: b,
    externalPaperSlotProps: E,
    transformOrigin: y,
    TransitionComponent: T,
    transitionDuration: S,
    TransitionProps: V
  }), j = Eg(U), G = N.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (m || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), m;
    const re = an(c), A = re && re.nodeType === 1 ? re : Oe(R.current).body, se = A.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ne = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ne.top === 0 && Ne.left === 0 && Ne.right === 0 && Ne.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + bi(se, f.vertical),
      left: se.left + vi(se, f.horizontal)
    };
  }, [c, f.horizontal, f.vertical, m, v]), te = N.useCallback((re) => ({
    vertical: bi(re, y.vertical),
    horizontal: vi(re, y.horizontal)
  }), [y.horizontal, y.vertical]), z = N.useCallback((re) => {
    const A = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, se = te(A);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: yi(se)
      };
    const Ne = G();
    let Pe = Ne.top - se.vertical, ke = Ne.left - se.horizontal;
    const Nt = Pe + A.height, $e = ke + A.width, nt = Qt(an(c)), je = nt.innerHeight - b, ot = nt.innerWidth - b;
    if (b !== null && Pe < b) {
      const Te = Pe - b;
      Pe -= Te, se.vertical += Te;
    } else if (b !== null && Nt > je) {
      const Te = Nt - je;
      Pe -= Te, se.vertical += Te;
    }
    if (process.env.NODE_ENV !== "production" && A.height > je && A.height && je && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${A.height - je}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), b !== null && ke < b) {
      const Te = ke - b;
      ke -= Te, se.horizontal += Te;
    } else if ($e > ot) {
      const Te = $e - ot;
      ke -= Te, se.horizontal += Te;
    }
    return {
      top: `${Math.round(Pe)}px`,
      left: `${Math.round(ke)}px`,
      transformOrigin: yi(se)
    };
  }, [c, v, G, te, b]), [C, B] = N.useState(x), W = N.useCallback(() => {
    const re = R.current;
    if (!re)
      return;
    const A = z(re);
    A.top !== null && (re.style.top = A.top), A.left !== null && (re.style.left = A.left), re.style.transformOrigin = A.transformOrigin, B(!0);
  }, [z]);
  N.useEffect(() => (D && window.addEventListener("scroll", W), () => window.removeEventListener("scroll", W)), [c, D, W]);
  const Y = (re, A) => {
    M && M(re, A), W();
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
    const re = ls(() => {
      W();
    }), A = Qt(c);
    return A.addEventListener("resize", re), () => {
      re.clear(), A.removeEventListener("resize", re);
    };
  }, [c, x, W]);
  let K = S;
  S === "auto" && !T.muiSupportAuto && (K = void 0);
  const q = h || (c ? Oe(an(c)).body : void 0), Z = (o = w == null ? void 0 : w.root) != null ? o : Ng, J = (a = w == null ? void 0 : w.paper) != null ? a : ol, Q = Bt({
    elementType: J,
    externalSlotProps: P({}, E, {
      style: C ? E.style : P({}, E.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: u,
      ref: I
    },
    ownerState: U,
    className: Ce(j.paper, E == null ? void 0 : E.className)
  }), ee = Bt({
    elementType: Z,
    externalSlotProps: (k == null ? void 0 : k.root) || {},
    externalForwardedProps: $,
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
    ownerState: U,
    className: Ce(j.root, p)
  }), {
    slotProps: ie
  } = ee, F = he(ee, kg);
  return /* @__PURE__ */ d(Z, P({}, F, !Cs(Z) && {
    slotProps: ie,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ d(T, P({
      appear: !0,
      in: x,
      onEntering: Y,
      onExited: H,
      timeout: K
    }, V, {
      children: /* @__PURE__ */ d(J, P({}, Q, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (al.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Mo,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: ar(s.oneOfType([lt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = an(e.anchorEl);
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
  container: s.oneOfType([lt, s.func]),
  /**
   * Disable the scroll lock behavior.
   * @default false
   */
  disableScrollLock: s.bool,
  /**
   * The elevation of the popover.
   * @default 8
   */
  elevation: hs,
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
    component: ed
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
const Tg = al;
function Sg(e) {
  return rt("MuiMenu", e);
}
xt("MuiMenu", ["root", "paper", "list"]);
const Cg = ["onEntering"], Og = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], Rg = {
  vertical: "top",
  horizontal: "right"
}, Pg = {
  vertical: "top",
  horizontal: "left"
}, $g = (e) => {
  const {
    classes: t
  } = e;
  return dt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, Sg, t);
}, _g = Re(Tg, {
  shouldForwardProp: (e) => Ns(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ig = Re(ol, {
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
}), Mg = Re(Qh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), il = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o;
  const a = ut({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: l,
    className: c,
    disableAutoFocusItem: f = !1,
    MenuListProps: m = {},
    onClose: v,
    open: g,
    PaperProps: p = {},
    PopoverClasses: h,
    transitionDuration: u = "auto",
    TransitionProps: {
      onEntering: b
    } = {},
    variant: x = "selectedMenu",
    slots: O = {},
    slotProps: w = {}
  } = a, k = he(a.TransitionProps, Cg), y = he(a, Og), T = Gr(), S = T.direction === "rtl", M = P({}, a, {
    autoFocus: i,
    disableAutoFocusItem: f,
    MenuListProps: m,
    onEntering: b,
    PaperProps: p,
    transitionDuration: u,
    TransitionProps: k,
    variant: x
  }), D = $g(M), V = i && !f && g, $ = N.useRef(null), E = (z, C) => {
    $.current && $.current.adjustStyleForScrollbar(z, T), b && b(z, C);
  }, R = (z) => {
    z.key === "Tab" && (z.preventDefault(), v && v(z, "tabKeyDown"));
  };
  let I = -1;
  N.Children.map(l, (z, C) => {
    /* @__PURE__ */ N.isValidElement(z) && (process.env.NODE_ENV !== "production" && pn.isFragment(z) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), z.props.disabled || (x === "selectedMenu" && z.props.selected || I === -1) && (I = C));
  });
  const U = (n = O.paper) != null ? n : Ig, j = (o = w.paper) != null ? o : p, G = Bt({
    elementType: O.root,
    externalSlotProps: w.root,
    ownerState: M,
    className: [D.root, c]
  }), te = Bt({
    elementType: U,
    externalSlotProps: j,
    ownerState: M,
    className: D.paper
  });
  return /* @__PURE__ */ d(_g, P({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? Rg : Pg,
    slots: {
      paper: U,
      root: O.root
    },
    slotProps: {
      root: G,
      paper: te
    },
    open: g,
    ref: r,
    transitionDuration: u,
    TransitionProps: P({
      onEntering: E
    }, k),
    ownerState: M
  }, y, {
    classes: h,
    children: /* @__PURE__ */ d(Mg, P({
      onKeyDown: R,
      actions: $,
      autoFocus: i && (I === -1 || f),
      autoFocusItem: V,
      variant: x
    }, m, {
      className: Ce(D.list, m.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (il.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * An HTML element, or a function that returns one.
   * It's used to set the position of the menu.
   */
  anchorEl: s.oneOfType([lt, s.func]),
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
const Ag = il;
function Hv({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var f;
  const [o, a] = X.useState(void 0), i = Se(
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
  ), l = Se(() => {
    a(void 0);
  }, []), c = Mt(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((f = r == null ? void 0 : r.items) == null ? void 0 : f.length) ?? 0) === 0 || !n ? n : /* @__PURE__ */ _(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        n,
        /* @__PURE__ */ d(
          Ag,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ d(
              Zo,
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
function Dg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const xo = (e, t, r = {}) => {
  const n = _t(t);
  n.current = t;
  const o = _t(r);
  o.current = Dg(o.current);
  const [a, i] = ce(() => n.current), [l, c] = ce(!0);
  return He(() => {
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
}, jg = Ts(/* @__PURE__ */ d("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Bg({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, f] = ce(!1), [m, v] = ce(!1), g = Se(() => {
    c && f(!1), v(!1);
  }, [c]), p = Se((k) => {
    k.stopPropagation(), f((y) => {
      const T = !y;
      return T && k.shiftKey ? v(!0) : T || v(!1), T;
    });
  }, []), h = Se(
    (k) => (g(), n(k)),
    [n, g]
  ), [u, b] = ce({ top: 1, left: 1 });
  He(() => {
    if (c) {
      const k = o == null ? void 0 : o.current;
      if (k) {
        const y = k.getBoundingClientRect(), T = window.scrollY, S = window.scrollX, M = y.top + T + k.clientHeight, D = y.left + S;
        b({ top: M, left: D });
      }
    }
  }, [c, o]);
  const [x] = xo(
    Se(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [O] = xo(
    Se(async () => (e == null ? void 0 : e(!0)) ?? r ?? x, [e, r, x, c]),
    r ?? x
  ), w = m && O ? O : x;
  return /* @__PURE__ */ _(wt, { children: [
    /* @__PURE__ */ d(
      Ii,
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
        children: l ?? /* @__PURE__ */ d(jg, {})
      }
    ),
    /* @__PURE__ */ d(
      _c,
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
        children: w ? /* @__PURE__ */ d(
          Gh,
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
function Gv({
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
  return /* @__PURE__ */ d(
    Ii,
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
const bt = "scrBook", Lg = "scrRef", Rt = "source", Fg = "details", Vg = "Scripture Reference", zg = "Scripture Book", sl = "Type", Ug = "Details";
function Hg(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: bt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Vg,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === bt ? Un(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => so(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => Un(n.start),
      id: Lg,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : Un(o.start);
      },
      sortingFn: (n, o) => so(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: Rt,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? sl : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: Fg,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Ug,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
function Wv({
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
  const [f, m] = ce([]), [v, g] = ce([{ id: bt, desc: !1 }]), [p, h] = ce(() => e.flatMap((E) => {
    const R = E.source;
    return E.data.map((I) => ({
      ...I,
      source: R
    }));
  })), [u, b] = ce({});
  He(() => {
    h(() => e.flatMap((E) => {
      const R = E.source;
      return E.data.map((I) => ({
        ...I,
        source: R
      }));
    }));
  }, [e]);
  const x = Mt(
    () => Hg(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      r
    ),
    [n, a, i, r]
  );
  He(() => {
    f.includes(Rt) ? g([
      { id: Rt, desc: !1 },
      { id: bt, desc: !1 }
    ]) : g([{ id: bt, desc: !1 }]);
  }, [f]);
  const O = Se(
    (E, R) => !R || so(E, R) === 0 ? `${zn(E)}` : `${zn(E)}-${zn(R)}`,
    []
  ), w = Se(
    (E) => `${O(E.start, E.end)} ${E.source} ${E.detail}`,
    [O]
  ), k = Oi({
    data: p,
    columns: x,
    state: {
      grouping: f,
      sorting: v,
      rowSelection: u
    },
    onGroupingChange: m,
    onSortingChange: g,
    onRowSelectionChange: b,
    getExpandedRowModel: Ec(),
    getGroupedRowModel: Nc(),
    getCoreRowModel: Ri(),
    getSortedRowModel: Pi(),
    getRowId: w,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  He(() => {
    if (l) {
      const E = k.getSelectedRowModel().rowsById, R = Object.keys(E);
      if (R.length === 1) {
        const I = p.find((U) => w(U) === R[0]) || void 0;
        I && l(I);
      }
    }
  }, [u, p, w, l, k]);
  const y = o ?? zg, T = a ?? sl, S = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${y}`, value: [bt] },
    { label: `Group by ${T}`, value: [Rt] },
    {
      label: `Group by ${y} and ${T}`,
      value: [bt, Rt]
    },
    {
      label: `Group by ${T} and ${y}`,
      value: [Rt, bt]
    }
  ], M = (E) => {
    m(JSON.parse(E));
  }, D = (E, R) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(R);
  }, V = (E, R) => E.getIsGrouped() ? "" : L("banded-row", R % 2 === 0 ? "even" : "odd"), $ = (E, R, I) => {
    if (!((E == null ? void 0 : E.length) === 0 || R.depth < I.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ _("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !t && /* @__PURE__ */ _(
      ln,
      {
        value: JSON.stringify(f),
        onValueChange: (E) => {
          M(E);
        },
        children: [
          /* @__PURE__ */ d(Rr, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ d(cn, {}) }),
          /* @__PURE__ */ d(Pr, { position: "item-aligned", children: /* @__PURE__ */ d(vp, { children: S.map((E) => /* @__PURE__ */ d(Ke, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ _(kn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ d(En, { children: k.getHeaderGroups().map((E) => /* @__PURE__ */ d(yt, { children: E.headers.filter((R) => R.column.columnDef.header).map((R) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ d($r, { colSpan: R.colSpan, className: "top-0 pr-sticky", children: R.isPlaceholder ? void 0 : /* @__PURE__ */ _("div", { children: [
          R.column.getCanGroup() ? /* @__PURE__ */ d(
            we,
            {
              variant: "ghost",
              title: `Toggle grouping by ${R.column.columnDef.header}`,
              onClick: R.column.getToggleGroupingHandler(),
              type: "button",
              children: R.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          kr(R.column.columnDef.header, R.getContext())
        ] }) }, R.id)
      )) }, E.id)) }),
      /* @__PURE__ */ d(Nn, { children: k.getRowModel().rows.map((E, R) => /* @__PURE__ */ d(
        yt,
        {
          "data-state": E.getIsSelected() ? "selected" : "",
          className: L(V(E, R)),
          onClick: (I) => D(E, I),
          children: E.getVisibleCells().map((I) => {
            if (!(I.getIsPlaceholder() || I.column.columnDef.enableGrouping && !I.getIsGrouped() && (I.column.columnDef.id !== Rt || !r)))
              return /* @__PURE__ */ d(
                Jt,
                {
                  className: L(
                    I.column.columnDef.id,
                    "pr-p-[1px]",
                    $(f, E, I)
                  ),
                  children: (() => I.getIsGrouped() ? /* @__PURE__ */ _(
                    we,
                    {
                      variant: "link",
                      onClick: E.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        E.getIsExpanded() && /* @__PURE__ */ d(yn, {}),
                        !E.getIsExpanded() && (c === "ltr" ? /* @__PURE__ */ d(Ci, {}) : /* @__PURE__ */ d(lc, {})),
                        " ",
                        kr(I.column.columnDef.cell, I.getContext()),
                        " (",
                        E.subRows.length,
                        ")"
                      ]
                    }
                  ) : kr(I.column.columnDef.cell, I.getContext()))()
                },
                I.id
              );
          })
        },
        E.id
      )) })
    ] })
  ] });
}
function Gg({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = ce(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ d(
    jr,
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
function Xv({
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
  onChange: v,
  onChangeCommitted: g
}) {
  return /* @__PURE__ */ d(
    Ic,
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
      onChange: v,
      onChangeCommitted: g
    }
  );
}
function Yv({
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
    Mc,
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
const ll = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Root,
  {
    orientation: "vertical",
    ref: r,
    className: L("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
ll.displayName = De.List.displayName;
const cl = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.List,
  {
    ref: r,
    className: L(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
cl.displayName = De.List.displayName;
const Wg = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Trigger,
  {
    ref: r,
    ...t,
    className: L(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), pl = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Content,
  {
    ref: r,
    className: L(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
pl.displayName = De.Content.displayName;
function qv({
  tabList: e,
  onSearch: t,
  searchPlaceholder: r,
  headerTitle: n,
  isSearchBarFullWidth: o = !1
}) {
  return /* @__PURE__ */ _("div", { className: "pr-twp", children: [
    /* @__PURE__ */ _("div", { className: "pr-sticky pr-top-0 pr-space-y-2 pr-pb-2", children: [
      n ? /* @__PURE__ */ d("h1", { children: n }) : "",
      /* @__PURE__ */ d(
        Gg,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: r
        }
      )
    ] }),
    /* @__PURE__ */ _(ll, { children: [
      /* @__PURE__ */ d(cl, { children: e.map((a) => /* @__PURE__ */ d(Wg, { value: a.value, children: a.value }, a.key)) }),
      e.map((a) => /* @__PURE__ */ d(pl, { value: a.value, children: a.content }, a.key))
    ] })
  ] });
}
const dl = X.forwardRef(({ className: e, orientation: t = "horizontal", decorative: r = !0, ...n }, o) => /* @__PURE__ */ d(
  Mi.Root,
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
dl.displayName = Mi.Root.displayName;
function Kv({ children: e }) {
  return /* @__PURE__ */ d("div", { className: "pr-twp pr-grid", children: e });
}
function Jv({
  primary: e,
  secondary: t,
  children: r,
  isLoading: n = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ _("div", { children: [
      /* @__PURE__ */ d("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ d("p", { className: "pr-whitespace-normal pr-break-words pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ d("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : /* @__PURE__ */ d("div", { children: r })
  ] });
}
function Zv({
  primary: e,
  secondary: t,
  includeSeparator: r = !1
}) {
  return /* @__PURE__ */ _("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ _("div", { children: [
      /* @__PURE__ */ d("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ d("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ d(dl, {}) : ""
  ] });
}
const Wr = vn(({ className: e, ...t }, r) => /* @__PURE__ */ d(cc, { size: 35, className: L("pr-animate-spin", e), ...t, ref: r }));
Wr.displayName = "Spinner";
function Qv({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ d(
    Ac,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
const Xg = To(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), ul = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(Ai.Root, { ref: r, className: L(Xg(), e), ...t }));
ul.displayName = Ai.Root.displayName;
function e0({
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
  onChange: v,
  onFocus: g,
  onBlur: p
}) {
  return /* @__PURE__ */ _("div", { className: L("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ d(
      ul,
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
      jr,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: L(c, { "pr-border-red-600": r }),
        defaultValue: f,
        value: m,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ d("p", { className: L({ "pr-hidden": !o }), children: o })
  ] });
}
function t0({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = _t(void 0);
  return /* @__PURE__ */ d("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ d(Dc, { position: "static", id: n, children: /* @__PURE__ */ _(jc, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ d(
      Bg,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ d("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const r0 = De.Root, Yg = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.List,
  {
    ref: r,
    className: L(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Yg.displayName = De.List.displayName;
const qg = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Trigger,
  {
    ref: r,
    className: L(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
qg.displayName = De.Trigger.displayName;
const Kg = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Content,
  {
    ref: r,
    className: L(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Kg.displayName = De.Content.displayName;
function n0({
  isInstalling: e,
  handleClick: t,
  buttonText: r,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ d(
    we,
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
      children: e ? /* @__PURE__ */ d(Wr, { size: 15 }) : /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(pc, { size: 25, className: L("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function o0({
  isEnabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    we,
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
      children: e ? /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(Wr, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function a0({
  isDisabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    we,
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
      children: e ? /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(Wr, { size: 15, className: "pr-mr-1 pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function i0({
  isUpdating: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    we,
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
      children: e ? /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(Wr, { size: 15, className: "pr-mr-1 pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function $t() {
  return $t = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, $t.apply(this, arguments);
}
const Jg = ["children", "options"], wi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), xi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Zg = ["style", "script"], Qg = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, eb = /mailto:/i, tb = /\n{2,}$/, fl = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, rb = /^ *> ?/gm, nb = /^ {2,}\n/, ob = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, ml = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, hl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, ab = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, ib = /^(?:\n *)*\n/, sb = /\r\n?/g, lb = /^\[\^([^\]]+)](:.*)\n/, cb = /^\[\^([^\]]+)]/, pb = /\f/g, db = /^\s*?\[(x|\s)\]/, gl = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, bl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, vl = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, ko = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, ub = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, yl = /^<!--[\s\S]*?(?:-->)/, fb = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, Eo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, mb = /^\{.*\}$/, hb = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, gb = /^<([^ >]+@[^ >]+)>/, bb = /^<([^ >]+:\/[^ >]+)>/, vb = /-([a-z])?/gi, wl = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, yb = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, wb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, xb = /^\[([^\]]*)\] ?\[([^\]]*)\]/, kb = /(\[|\])/g, Eb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, Nb = /\t/g, Tb = /^ *\| */, Sb = /(^ *\||\| *$)/g, Cb = / *$/, Ob = /^ *:-+: *$/, Rb = /^ *:-+ *$/, Pb = /^ *-+: *$/, $b = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, _b = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, Ib = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Mb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Ab = /^\\([^0-9A-Za-z\s])/, Db = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, jb = /^\n+/, Bb = /^([ \t]*)/, Lb = /\\([^\\])/g, ki = / *\n+$/, Fb = /(?:^|\n)( *)$/, Qo = "(?:\\d+\\.)", ea = "(?:[*+-])";
function xl(e) {
  return "( *)(" + (e === 1 ? Qo : ea) + ") +";
}
const kl = xl(1), El = xl(2);
function Nl(e) {
  return new RegExp("^" + (e === 1 ? kl : El));
}
const Vb = Nl(1), zb = Nl(2);
function Tl(e) {
  return new RegExp("^" + (e === 1 ? kl : El) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Qo : ea) + " )[^\\n]*)*(\\n|$)", "gm");
}
const Sl = Tl(1), Cl = Tl(2);
function Ol(e) {
  const t = e === 1 ? Qo : ea;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Rl = Ol(1), Pl = Ol(2);
function Ei(e, t) {
  const r = t === 1, n = r ? Rl : Pl, o = r ? Sl : Cl, a = r ? Vb : zb;
  return { t(i, l, c) {
    const f = Fb.exec(c);
    return f && (l.o || !l._ && !l.u) ? n.exec(i = f[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const f = r ? +i[2] : void 0, m = i[0].replace(tb, `
`).match(o);
    let v = !1;
    return { p: m.map(function(g, p) {
      const h = a.exec(g)[0].length, u = new RegExp("^ {1," + h + "}", "gm"), b = g.replace(u, "").replace(a, ""), x = p === m.length - 1, O = b.indexOf(`

`) !== -1 || x && v;
      v = O;
      const w = c._, k = c.o;
      let y;
      c.o = !0, O ? (c._ = !1, y = b.replace(ki, `

`)) : (c._ = !0, y = b.replace(ki, ""));
      const T = l(y, c);
      return c._ = w, c.o = k, T;
    }), m: r, g: f };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(f, m) {
    return e("li", { key: m }, l(f, c));
  })) };
}
const Ub = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Hb = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, $l = [fl, ml, hl, gl, vl, bl, yl, wl, Sl, Rl, Cl, Pl], Gb = [...$l, /^[^\n]+(?:  \n|\n{2,})/, ko, Eo];
function Wb(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Xb(e) {
  return Pb.test(e) ? "right" : Ob.test(e) ? "center" : Rb.test(e) ? "left" : null;
}
function Ni(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(Cb, "")), a[a.length - 1].push(i));
  }), a;
}
function Yb(e, t, r) {
  r._ = !0;
  const n = Ni(e[1], t, r), o = e[2].replace(Sb, "").split("|").map(Xb), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(f) {
      return Ni(f, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: a, L: n, type: "table" };
}
function Ti(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function ht(e) {
  return function(t, r) {
    return r._ ? e.exec(t) : null;
  };
}
function gt(e) {
  return function(t, r) {
    return r._ || r.u ? e.exec(t) : null;
  };
}
function it(e) {
  return function(t, r) {
    return r._ || r.u ? null : e.exec(t);
  };
}
function br(e) {
  return function(t) {
    return e.exec(t);
  };
}
function qb(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !$l.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function Xt(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function Si(e) {
  return e.replace(Lb, "$1");
}
function sn(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Kb(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Jb(e, t, r) {
  return r._ = !1, e(t, r);
}
const ro = (e, t, r) => ({ v: sn(t, e[1], r) });
function no() {
  return {};
}
function oo() {
  return null;
}
function Zb(...e) {
  return e.filter(Boolean).join(" ");
}
function ao(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var ae;
function Qb(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Wb, t.namedCodesToUnicode = t.namedCodesToUnicode ? $t({}, xi, t.namedCodesToUnicode) : xi;
  const r = t.createElement || N.createElement;
  function n(p, h, ...u) {
    const b = ao(t.overrides, `${p}.props`, {});
    return r(function(x, O) {
      const w = ao(O, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : ao(O, `${x}.component`, x) : x;
    }(p, t.overrides), $t({}, h, b, { className: Zb(h == null ? void 0 : h.className, b.className) || void 0 }), ...u);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = Eb.test(p) === !1);
    const u = m(f(h ? p : `${p.trimEnd().replace(jb, "")}

`, { _: h }));
    for (; typeof u[u.length - 1] == "string" && !u[u.length - 1].trim(); )
      u.pop();
    if (t.wrapper === null)
      return u;
    const b = t.wrapper || (h ? "span" : "div");
    let x;
    if (u.length > 1 || t.forceWrapper)
      x = u;
    else {
      if (u.length === 1)
        return x = u[0], typeof x == "string" ? n("span", { key: "outer" }, x) : x;
      x = null;
    }
    return N.createElement(b, { key: "outer" }, x);
  }
  function a(p) {
    const h = p.match(Qg);
    return h ? h.reduce(function(u, b, x) {
      const O = b.indexOf("=");
      if (O !== -1) {
        const w = function(S) {
          return S.indexOf("-") !== -1 && S.match(fb) === null && (S = S.replace(vb, function(M, D) {
            return D.toUpperCase();
          })), S;
        }(b.slice(0, O)).trim(), k = function(S) {
          const M = S[0];
          return (M === '"' || M === "'") && S.length >= 2 && S[S.length - 1] === M ? S.slice(1, -1) : S;
        }(b.slice(O + 1).trim()), y = wi[w] || w, T = u[y] = function(S, M) {
          return S === "style" ? M.split(/;\s?/).reduce(function(D, V) {
            const $ = V.slice(0, V.indexOf(":"));
            return D[$.replace(/(-[a-z])/g, (E) => E[1].toUpperCase())] = V.slice($.length + 1).trim(), D;
          }, {}) : S === "href" ? Xt(M) : (M.match(mb) && (M = M.slice(1, M.length - 1)), M === "true" || M !== "false" && M);
        }(w, k);
        typeof T == "string" && (ko.test(T) || Eo.test(T)) && (u[y] = N.cloneElement(o(T.trim()), { key: x }));
      } else
        b !== "style" && (u[wi[b] || b] = !0);
      return u;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: it(fl), i: ae.HIGH, l: (p, h, u) => ({ v: h(p[0].replace(rb, ""), u) }), h: (p, h, u) => n("blockquote", { key: u.k }, h(p.v, u)) }, breakLine: { t: br(nb), i: ae.HIGH, l: no, h: (p, h, u) => n("br", { key: u.k }) }, breakThematic: { t: it(ob), i: ae.HIGH, l: no, h: (p, h, u) => n("hr", { key: u.k }) }, codeBlock: { t: it(hl), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, u) => n("pre", { key: u.k }, n("code", $t({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: it(ml), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: gt(ab), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, h, u) => n("code", { key: u.k }, p.v) }, footnote: { t: it(lb), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: oo }, footnoteReference: { t: ht(cb), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, u) => n("a", { key: u.k, href: Xt(p.B) }, n("sup", { key: u.k }, p.v)) }, gfmTask: { t: ht(db), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, u) => n("input", { checked: p.R, key: u.k, readOnly: !0, type: "checkbox" }) }, heading: { t: it(t.enforceAtxHeadings ? bl : gl), i: ae.HIGH, l: (p, h, u) => ({ v: sn(h, p[2], u), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, u) => n(`h${p.C}`, { id: p.T, key: u.k }, h(p.v, u)) }, headingSetext: { t: it(vl), i: ae.MAX, l: (p, h, u) => ({ v: sn(h, p[1], u), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: br(yl), i: ae.HIGH, l: () => ({}), h: oo }, image: { t: gt(Hb), i: ae.HIGH, l: (p) => ({ D: p[1], B: Si(p[2]), F: p[3] }), h: (p, h, u) => n("img", { key: u.k, alt: p.D || void 0, title: p.F || void 0, src: Xt(p.B) }) }, link: { t: ht(Ub), i: ae.LOW, l: (p, h, u) => ({ v: Kb(h, p[1], u), B: Si(p[2]), F: p[3] }), h: (p, h, u) => n("a", { key: u.k, href: Xt(p.B), title: p.F }, h(p.v, u)) }, linkAngleBraceStyleDetector: { t: ht(bb), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : ht(hb)(p, h), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: ht(gb), i: ae.MAX, l(p) {
    let h = p[1], u = p[1];
    return eb.test(u) || (u = "mailto:" + u), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: u, type: "link" };
  } }, orderedList: Ei(n, 1), unorderedList: Ei(n, 2), newlineCoalescer: { t: it(ib), i: ae.LOW, l: no, h: () => `
` }, paragraph: { t: qb, i: ae.LOW, l: ro, h: (p, h, u) => n("p", { key: u.k }, h(p.v, u)) }, ref: { t: ht(yb), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: oo }, refImage: { t: gt(wb), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, u) => n("img", { key: u.k, alt: p.D, src: Xt(l[p.P].B), title: l[p.P].F }) }, refLink: { t: ht(xb), i: ae.MAX, l: (p, h, u) => ({ v: h(p[1], u), Z: h(p[0].replace(kb, "\\$1"), u), P: p[2] }), h: (p, h, u) => l[p.P] ? n("a", { key: u.k, href: Xt(l[p.P].B), title: l[p.P].F }, h(p.v, u)) : n("span", { key: u.k }, h(p.Z, u)) }, table: { t: it(wl), i: ae.HIGH, l: Yb, h: (p, h, u) => n("table", { key: u.k }, n("thead", null, n("tr", null, p.L.map(function(b, x) {
    return n("th", { key: x, style: Ti(p, x) }, h(b, u));
  }))), n("tbody", null, p.A.map(function(b, x) {
    return n("tr", { key: x }, b.map(function(O, w) {
      return n("td", { key: w, style: Ti(p, w) }, h(O, u));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, Tb.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: br(Db), i: ae.MIN, l: (p) => ({ v: p[0].replace(ub, (h, u) => t.namedCodesToUnicode[u] ? t.namedCodesToUnicode[u] : h) }), h: (p) => p.v }, textBolded: { t: gt($b), i: ae.MED, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => n("strong", { key: u.k }, h(p.v, u)) }, textEmphasized: { t: gt(_b), i: ae.LOW, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => n("em", { key: u.k }, h(p.v, u)) }, textEscaped: { t: gt(Ab), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: gt(Ib), i: ae.LOW, l: ro, h: (p, h, u) => n("mark", { key: u.k }, h(p.v, u)) }, textStrikethroughed: { t: gt(Mb), i: ae.LOW, l: ro, h: (p, h, u) => n("del", { key: u.k }, h(p.v, u)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: br(ko), i: ae.HIGH, l(p, h, u) {
    const [, b] = p[3].match(Bb), x = new RegExp(`^${b}`, "gm"), O = p[3].replace(x, ""), w = (k = O, Gb.some((M) => M.test(k)) ? Jb : sn);
    var k;
    const y = p[1].toLowerCase(), T = Zg.indexOf(y) !== -1;
    u.N = u.N || y === "a";
    const S = T ? p[3] : w(h, O, u);
    return u.N = !1, { O: a(p[2]), v: S, G: T, H: T ? y : p[1] };
  }, h: (p, h, u) => n(p.H, $t({ key: u.k }, p.O), p.G ? p.v : h(p.v, u)) }, c.htmlSelfClosing = { t: br(Eo), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, h, u) => n(p.H, $t({}, p.O, { key: u.k })) });
  const f = function(p) {
    let h = Object.keys(p);
    function u(b, x) {
      let O = [], w = "";
      for (; b; ) {
        let k = 0;
        for (; k < h.length; ) {
          const y = h[k], T = p[y], S = T.t(b, x, w);
          if (S) {
            const M = S[0];
            b = b.substring(M.length);
            const D = T.l(S, u, x);
            D.type == null && (D.type = y), O.push(D), w = M;
            break;
          }
          k++;
        }
      }
      return O;
    }
    return h.sort(function(b, x) {
      let O = p[b].i, w = p[x].i;
      return O !== w ? O - w : b < x ? -1 : 1;
    }), function(b, x) {
      return u(function(O) {
        return O.replace(sb, `
`).replace(pb, "").replace(Nb, "    ");
      }(b), x);
    };
  }(c), m = (v = function(p) {
    return function(h, u, b) {
      return p[h.type].h(h, u, b);
    };
  }(c), function p(h, u = {}) {
    if (Array.isArray(h)) {
      const b = u.k, x = [];
      let O = !1;
      for (let w = 0; w < h.length; w++) {
        u.k = w;
        const k = p(h[w], u), y = typeof k == "string";
        y && O ? x[x.length - 1] += k : k !== null && x.push(k), O = y;
      }
      return u.k = b, x;
    }
    return v(h, p, u);
  });
  var v;
  const g = o(e);
  return i.length ? n("div", null, g, n("footer", { key: "footer" }, i.map(function(p) {
    return n("div", { id: t.slugify(p.j), key: p.j }, p.j, m(f(p.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const ev = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, f = Object.keys(o);
    for (l = 0; l < f.length; l++)
      a.indexOf(i = f[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Jg);
  return N.cloneElement(Qb(t, r), n);
};
function s0({ id: e, markdown: t }) {
  return /* @__PURE__ */ d("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ d(ev, { children: t }) });
}
const tv = vn((e, t) => /* @__PURE__ */ _(
  we,
  {
    ref: t,
    className: "pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ d(dc, { size: 16, className: "pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ d(
        yn,
        {
          size: 16,
          className: "pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
        }
      )
    ]
  }
));
var rv = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(rv || {});
function l0({ id: e, groups: t }) {
  return /* @__PURE__ */ d("div", { id: e, children: /* @__PURE__ */ _(Ro, { children: [
    /* @__PURE__ */ d(zi, { asChild: !0, children: /* @__PURE__ */ d(tv, {}) }),
    /* @__PURE__ */ d(wn, { children: t.map((r) => /* @__PURE__ */ _("div", { children: [
      /* @__PURE__ */ d(Br, { children: r.label }),
      /* @__PURE__ */ d(rp, { children: r.items.map((n) => /* @__PURE__ */ d("div", { children: n.itemType === 0 ? /* @__PURE__ */ d(Po, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ d(Hi, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ d(xn, {})
    ] }, r.label)) })
  ] }) });
}
function c0({ id: e, message: t }) {
  return /* @__PURE__ */ d("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ d("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ d("p", { className: "pr-text-lg pr-text-gray-800", children: t }) }) });
}
function p0({
  id: e,
  category: t,
  downloads: r,
  languages: n,
  moreInfoUrl: o
}) {
  const a = new yc("en", {
    notation: "compact",
    compactDisplay: "short"
  }).format(Object.values(r).reduce((l, c) => l + c, 0)), i = () => {
    window.scrollTo(0, document.body.scrollHeight);
  };
  return /* @__PURE__ */ _(
    "div",
    {
      id: e,
      className: "pr-flex pr-flex-wrap pr-items-start pr-space-x-4 pr-border-b pr-border-t pr-bg-white pr-pb-4 pr-pt-4",
      children: [
        /* @__PURE__ */ _("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: /* @__PURE__ */ d("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: t }) }),
          /* @__PURE__ */ d("span", { className: "pr-text-xs pr-text-gray-500", children: "CATEGORY" })
        ] }),
        /* @__PURE__ */ d("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ _("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1", children: [
            /* @__PURE__ */ d(uc, { className: "pr-mr-1 pr-h-4 pr-w-4" }),
            /* @__PURE__ */ d("span", { className: "pr-text-xs pr-font-semibold pr-text-gray-700", children: a })
          ] }),
          /* @__PURE__ */ d("span", { className: "pr-text-xs pr-text-gray-500", children: "USERS" })
        ] }),
        /* @__PURE__ */ d("div", { className: "pr-mx-2 pr-h-10 pr-border-l pr-border-gray-300" }),
        /* @__PURE__ */ _("div", { className: "pr-flex pr-flex-col pr-items-center", children: [
          /* @__PURE__ */ d("div", { className: "pr-flex pr-items-center", children: n.slice(0, 3).map((l) => /* @__PURE__ */ d(
            "span",
            {
              className: "pr-ml-1 pr-rounded-md pr-bg-gray-100 pr-px-2 pr-py-1 pr-text-xs pr-font-semibold pr-text-gray-700",
              children: l.toUpperCase()
            },
            l
          )) }),
          n.length > 3 && /* @__PURE__ */ _(
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
        /* @__PURE__ */ _("div", { className: "pr-ml-auto pr-flex pr-flex-col pr-space-y-2", children: [
          /* @__PURE__ */ _(
            "a",
            {
              href: o,
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Website",
                /* @__PURE__ */ d(fc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ _(
            "a",
            {
              href: "https://example.com",
              target: "_blank",
              rel: "noreferrer",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Support",
                /* @__PURE__ */ d(mc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function nv({ id: e, versionHistory: t }) {
  const [r, n] = ce(!1), o = /* @__PURE__ */ new Date();
  function a(l) {
    const c = new Date(l), f = new Date(o.getTime() - c.getTime()), m = f.getUTCFullYear() - 1970, v = f.getUTCMonth(), g = f.getUTCDate() - 1;
    let p = "";
    return m > 0 ? p = `${m.toString()} year${m === 1 ? "" : "s"} ago` : v > 0 ? p = `${v.toString()} month${v === 1 ? "" : "s"} ago` : g === 0 ? p = "today" : p = `${g.toString()} day${g === 1 ? "" : "s"} ago`, p;
  }
  const i = Object.entries(t).sort((l, c) => c[0].localeCompare(l[0]));
  return /* @__PURE__ */ _("div", { id: e, children: [
    /* @__PURE__ */ d("h3", { className: "pr-text-md pr-font-semibold", children: "What`s New" }),
    /* @__PURE__ */ d("ul", { className: "pr-list-disc pr-pl-5 pr-pr-4 pr-text-xs pr-text-gray-600", children: (r ? i : i.slice(0, 5)).map((l) => /* @__PURE__ */ _("div", { className: "pr-mt-3 pr-flex pr-justify-between", children: [
      /* @__PURE__ */ d("div", { className: "pr-text-gray-600", children: /* @__PURE__ */ d("li", { className: "pr-prose pr-text-xs", children: /* @__PURE__ */ d("span", { children: l[1].description }) }) }),
      /* @__PURE__ */ _("div", { className: "pr-justify-end pr-text-right", children: [
        /* @__PURE__ */ _("div", { children: [
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
function d0({
  id: e,
  publisherDisplayName: t,
  fileSize: r,
  locales: n,
  versionHistory: o
}) {
  const a = Mt(() => wc(r), [r]), l = ((c) => {
    const f = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((m) => f.of(m));
  })(n);
  return /* @__PURE__ */ d("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ _("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ d(nv, { versionHistory: o }),
    /* @__PURE__ */ d("div", { className: "pr-md:border-t-0 pr-md:border-l pr-md-h-auto pr-md-ml-8 pr-mt-4 pr-border-t pr-border-gray-300" }),
    /* @__PURE__ */ _("div", { className: "pr-md:mt-0 pr-mt-4 pr-flex-1 pr-space-y-3", children: [
      /* @__PURE__ */ d("h2", { className: "pr-text-md pr-font-semibold", children: "Information" }),
      /* @__PURE__ */ _("div", { className: "pr-flex pr-items-start pr-justify-between pr-pr-4 pr-text-xs pr-text-gray-600", children: [
        /* @__PURE__ */ _("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ d("span", { className: "pr-mb-2", children: "Publisher" }),
          /* @__PURE__ */ d("span", { className: "pr-font-semibold", children: t }),
          /* @__PURE__ */ d("span", { className: "pr-mb-2 pr-mt-4", children: "Size" }),
          /* @__PURE__ */ d("span", { className: "pr-font-semibold", children: a })
        ] }),
        /* @__PURE__ */ d("div", { className: "pr-flex pr-w-3/4 pr-items-center pr-justify-between pr-text-xs pr-text-gray-600", children: /* @__PURE__ */ _("p", { className: "pr-flex pr-flex-col pr-justify-start", children: [
          /* @__PURE__ */ d("span", { className: "pr-mb-2", children: "Languages" }),
          /* @__PURE__ */ d("span", { className: "pr-font-semibold", children: l.join(", ") })
        ] }) })
      ] })
    ] })
  ] }) });
}
const u0 = (e, t) => {
  He(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, io = () => !1, f0 = (e, t) => {
  const [r] = xo(
    Se(async () => {
      if (!e)
        return io;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    io,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  He(() => () => {
    r !== io && r();
  }, [r]);
}, ov = X.forwardRef(
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
ov.displayName = "Card";
const av = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      className: L("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
av.displayName = "CardHeader";
const iv = X.forwardRef(
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
iv.displayName = "CardTitle";
const sv = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("p", { ref: r, className: L("pr-text-sm pr-text-muted-foreground", e), ...t }));
sv.displayName = "CardDescription";
const lv = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: L("pr-p-6 pr-pt-0", e), ...t })
);
lv.displayName = "CardContent";
const cv = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: L("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
cv.displayName = "CardFooter";
const pv = To(
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
), dv = X.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ d("div", { ref: n, role: "alert", className: L(pv({ variant: t }), e), ...r }));
dv.displayName = "Alert";
const uv = X.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ _(
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
uv.displayName = "AlertTitle";
const fv = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: L("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
fv.displayName = "AlertDescription";
const mv = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ _(
  vr.Root,
  {
    ref: r,
    className: L(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ d(vr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ d(vr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ d(vr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
mv.displayName = vr.Root.displayName;
const hv = X.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  lo.Root,
  {
    className: L(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ d(
      lo.Thumb,
      {
        className: L(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
hv.displayName = lo.Root.displayName;
function gv(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
gv(`/*
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
  dv as Alert,
  fv as AlertDescription,
  uv as AlertTitle,
  Dv as BookChapterControl,
  we as Button,
  ov as Card,
  lv as CardContent,
  sv as CardDescription,
  cv as CardFooter,
  av as CardHeader,
  iv as CardTitle,
  zv as ChapterRangeSelector,
  Bp as Checkbox,
  Uv as Checklist,
  Ta as ComboBox,
  Hv as ContextMenu,
  Np as DataTable,
  a0 as DisableButton,
  Ro as DropdownMenu,
  Po as DropdownMenuCheckboxItem,
  wn as DropdownMenuContent,
  rp as DropdownMenuGroup,
  Ui as DropdownMenuItem,
  rv as DropdownMenuItemType,
  Br as DropdownMenuLabel,
  Iv as DropdownMenuPortal,
  Av as DropdownMenuRadioGroup,
  Hi as DropdownMenuRadioItem,
  xn as DropdownMenuSeparator,
  ap as DropdownMenuShortcut,
  Mv as DropdownMenuSub,
  op as DropdownMenuSubContent,
  np as DropdownMenuSubTrigger,
  zi as DropdownMenuTrigger,
  o0 as EnableButton,
  tv as FilterButton,
  l0 as FilterDropdown,
  d0 as Footer,
  Gh as GridMenu,
  Bg as HamburgerMenuButton,
  jv as INVENTORY_STRING_KEYS,
  Gv as IconButton,
  jr as Input,
  n0 as InstallButton,
  Bv as Inventory,
  ul as Label,
  Yt as LabelPosition,
  s0 as MarkdownRenderer,
  Ys as MenuItem,
  p0 as MoreInfo,
  qv as NavigationContentSearch,
  c0 as NoExtensionsFound,
  Wv as ScriptureResultsViewer,
  Gg as SearchBar,
  ln as Select,
  Pr as SelectContent,
  vp as SelectGroup,
  Ke as SelectItem,
  yp as SelectLabel,
  Wi as SelectScrollDownButton,
  Gi as SelectScrollUpButton,
  wp as SelectSeparator,
  Rr as SelectTrigger,
  cn as SelectValue,
  dl as Separator,
  Kv as SettingsList,
  Zv as SettingsListHeader,
  Jv as SettingsListItem,
  mv as ShadCnSlider,
  hv as ShadCnSwitch,
  Xv as Slider,
  Yv as Snackbar,
  Wr as Spinner,
  Qv as Switch,
  kn as Table,
  Nn as TableBody,
  Ep as TableCaption,
  Jt as TableCell,
  kp as TableFooter,
  $r as TableHead,
  En as TableHeader,
  yt as TableRow,
  r0 as Tabs,
  Kg as TabsContent,
  Yg as TabsList,
  qg as TabsTrigger,
  e0 as TextField,
  t0 as Toolbar,
  i0 as UpdateButton,
  nv as VersionHistory,
  ll as VerticalTabs,
  pl as VerticalTabsContent,
  cl as VerticalTabsList,
  Wg as VerticalTabsTrigger,
  gp as buttonVariants,
  $o as getSortingIcon,
  Fv as inventoryCountColumn,
  Lv as inventoryItemColumn,
  Vv as inventoryStatusColumn,
  u0 as useEvent,
  f0 as useEventAsync,
  xo as usePromise
};
//# sourceMappingURL=index.js.map
