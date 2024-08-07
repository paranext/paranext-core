import Bl, { jsx as d, jsxs as _, Fragment as wt } from "react/jsx-runtime";
import * as N from "react";
import W, { forwardRef as ko, useCallback as Se, useState as ce, useRef as _t, useEffect as He, useLayoutEffect as ha, useMemo as Mt } from "react";
import { History as Ll, ChevronRight as Fl, Check as Eo, Circle as Vl, ArrowDownWideNarrow as zl, Clock as Ul, Bookmark as Hl, FilterIcon as Gl, ChevronDown as No, ChevronUp as Wl, ArrowLeftIcon as Xl, ChevronLeftIcon as Yl, ChevronRightIcon as ql, ArrowRightIcon as Kl, ArrowUpIcon as Jl, ArrowDownIcon as Zl, ArrowUpDownIcon as Ql, CircleCheckIcon as ga, CircleXIcon as ba, CircleHelpIcon as va, X as ec, Search as tc, ChevronsUpDown as rc, LoaderCircle as gn, Download as nc, Filter as oc, User as ac, Link as ic, CircleHelp as sc } from "lucide-react";
import Ce, { clsx as lc } from "clsx";
import { extendTailwindMerge as cc } from "tailwind-merge";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as pc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as dc, compareScrRefs as ao, scrRefToBBBCCCVVV as Fn, formatScrRef as Vn, NumberFormat as uc, formatBytes as fc } from "platform-bible-utils";
import { useReactTable as Ci, getCoreRowModel as Oi, getPaginationRowModel as mc, getSortedRowModel as Ri, getFilteredRowModel as hc, flexRender as kr, getExpandedRowModel as gc, getGroupedRowModel as bc } from "@tanstack/react-table";
import { Slot as vc } from "@radix-ui/react-slot";
import { cva as To } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import { FormControlLabel as ya, FormLabel as yc, Checkbox as wc, MenuItem as xc, ListItemText as kc, ListItemIcon as Pi, Menu as Ec, Grid as $i, List as Nc, IconButton as _i, Drawer as Tc, Slider as Sc, Snackbar as Cc, Switch as Oc, AppBar as Rc, Toolbar as Pc } from "@mui/material";
import * as Or from "@radix-ui/react-popover";
import { Command as Ae } from "cmdk";
import * as Qe from "@radix-ui/react-dialog";
import $c, { ThemeContext as _c, internal_processStyles as Ic } from "@mui/styled-engine";
import * as Mc from "react-dom";
import Yr from "react-dom";
import * as Ii from "@radix-ui/react-label";
import * as De from "@radix-ui/react-tabs";
import * as vr from "@radix-ui/react-slider";
import * as io from "@radix-ui/react-switch";
const Ac = cc({ prefix: "pr-" });
function V(...e) {
  return Ac(lc(e));
}
const bn = W.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ d(
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
bn.displayName = "Input";
const Dc = ko(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ _("div", { className: "pr-relative", children: [
    /* @__PURE__ */ d(
      bn,
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
      Ll,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var jc = Object.defineProperty, Bc = (e, t, r) => t in e ? jc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => Bc(e, typeof t != "symbol" ? t + "" : t, r);
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
], Mi = [
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
], wa = Yc();
function or(e, t = !0) {
  return t && (e = e.toUpperCase()), e in wa ? wa[e] : 0;
}
function Co(e) {
  return or(e) > 0;
}
function Lc(e) {
  const t = typeof e == "string" ? or(e) : e;
  return t >= 40 && t <= 66;
}
function Fc(e) {
  return (typeof e == "string" ? or(e) : e) <= 39;
}
function Ai(e) {
  return e <= 66;
}
function Vc(e) {
  const t = typeof e == "string" ? or(e) : e;
  return Bi(t) && !Ai(t);
}
function* zc() {
  for (let e = 1; e <= At.length; e++)
    yield e;
}
const Uc = 1, Di = At.length;
function Hc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function Oo(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= At.length ? t : At[r];
}
function ji(e) {
  return e <= 0 || e > Di ? "******" : Mi[e - 1];
}
function Gc(e) {
  return ji(or(e));
}
function Bi(e) {
  const t = typeof e == "number" ? Oo(e) : e;
  return Co(t) && !So.includes(t);
}
function Wc(e) {
  const t = typeof e == "number" ? Oo(e) : e;
  return Co(t) && So.includes(t);
}
function Xc(e) {
  return Mi[e - 1].includes("*obsolete*");
}
function Yc() {
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
  isBookNT: Lc,
  isBookOT: Fc,
  isBookOTNT: Ai,
  isBookDC: Vc,
  allBookNumbers: zc,
  firstBook: Uc,
  lastBook: Di,
  extraBooks: Hc,
  bookNumberToId: Oo,
  bookNumberToEnglishName: ji,
  bookIdToEnglishName: Gc,
  isCanonical: Bi,
  isExtraMaterial: Wc,
  isObsolete: Xc
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
var Li = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Li || {});
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
oe(_e, "ValidStatusType", Li);
let dr = class extends Error {
};
const Ro = ge.Root, Fi = ge.Trigger, qc = ge.Group, Ov = ge.Portal, Rv = ge.Sub, Pv = ge.RadioGroup, Kc = W.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ _(
  ge.SubTrigger,
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
      /* @__PURE__ */ d(Fl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Kc.displayName = ge.SubTrigger.displayName;
const Jc = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ge.SubContent,
  {
    ref: r,
    className: V(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Jc.displayName = ge.SubContent.displayName;
const vn = W.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ d(ge.Portal, { children: /* @__PURE__ */ d(
  ge.Content,
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
vn.displayName = ge.Content.displayName;
const Vi = W.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  ge.Item,
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
Vi.displayName = ge.Item.displayName;
const Po = W.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ _(
  ge.CheckboxItem,
  {
    ref: o,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(ge.ItemIndicator, { children: /* @__PURE__ */ d(Eo, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Po.displayName = ge.CheckboxItem.displayName;
const zi = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(
  ge.RadioItem,
  {
    ref: n,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(ge.ItemIndicator, { children: /* @__PURE__ */ d(Vl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
zi.displayName = ge.RadioItem.displayName;
const jr = W.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ d(
  ge.Label,
  {
    ref: n,
    className: V("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
jr.displayName = ge.Label.displayName;
const yn = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  ge.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
yn.displayName = ge.Separator.displayName;
function Zc({ className: e, ...t }) {
  return /* @__PURE__ */ d(
    "span",
    {
      className: V("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Zc.displayName = "DropdownMenuShortcut";
const Qc = ko(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ _(
    Vi,
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
        /* @__PURE__ */ d(
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
            children: me.bookIdToEnglishName(e)
          }
        ),
        r && /* @__PURE__ */ d("div", { children: i })
      ]
    },
    e
  )
);
function ep({
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
  return /* @__PURE__ */ d("div", { className: V("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ d(
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
function tp({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ _(jr, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ d("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ d(
        zl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        Ul,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ d(
        Hl,
        {
          onClick: r,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const Er = me.allBookIds, rp = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ka = ["OT", "NT", "DC"], np = 32 + 32 + 32, op = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], ap = (e) => ({
  OT: Er.filter((r) => me.isBookOT(r)),
  NT: Er.filter((r) => me.isBookNT(r)),
  DC: Er.filter((r) => me.isBookDC(r))
})[e], ur = (e) => dc(me.bookIdToNumber(e));
function ip() {
  return Er.map((t) => me.bookIdToEnglishName(t));
}
function sp(e) {
  return ip().includes(e);
}
function lp(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (sp(t))
    return Er.find((n) => me.bookIdToEnglishName(n) === t);
}
function $v({ scrRef: e, handleSubmit: t }) {
  const [r, n] = ce(""), [o, a] = ce(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = ce(e.chapterNum ?? 0), [c, f] = ce(
    me.bookNumberToId(e.bookNum)
  ), [m, v] = ce(!1), [g, p] = ce(m), h = _t(void 0), u = _t(void 0), b = _t(void 0), x = Se(
    (E) => ap(E).filter((C) => {
      const $ = me.bookIdToEnglishName(C).toLowerCase(), z = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(z) || // Match book name
      C.toLowerCase().includes(z);
    }),
    [r]
  ), O = (E) => {
    n(E);
  }, w = _t(!1), k = Se((E) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    v(E);
  }, []), y = Se(
    (E, C, $, z) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== E ? 1 : e.chapterNum
      ), C || ur(E) === -1) {
        t({
          bookNum: me.bookIdToNumber(E),
          chapterNum: $ || 1,
          verseNum: z || 1
        }), v(!1), n("");
        return;
      }
      a(o !== E ? E : ""), v(!C);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), T = (E) => {
    E <= 0 || E > ur(o) || y(o, !0, E);
  }, S = Se(() => {
    op.forEach((E) => {
      const C = r.match(E);
      if (C) {
        const [$, z = void 0, U = void 0] = C.slice(1), j = lp($);
        (me.isBookIdValid($) || j) && y(
          j ?? $,
          !0,
          z ? parseInt(z, 10) : 1,
          U ? parseInt(U, 10) : 1
        );
      }
    });
  }, [y, r]), I = Se(
    (E) => {
      m ? (E.key === "ArrowDown" || E.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof u < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      u.current !== null && u.current.focus(), E.preventDefault()) : v(!0);
    },
    [m]
  ), D = (E) => {
    const { key: C } = E;
    C === "ArrowRight" || C === "ArrowLeft" || C === "ArrowDown" || C === "ArrowUp" || C === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: C })), h.current.focus());
  }, F = (E) => {
    const { key: C } = E;
    if (c === o) {
      if (C === "Enter") {
        E.preventDefault(), y(o, !0, i);
        return;
      }
      let $ = 0;
      if (C === "ArrowRight")
        if (i < ur(c))
          $ = 1;
        else {
          E.preventDefault();
          return;
        }
      else if (C === "ArrowLeft")
        if (i > 1)
          $ = -1;
        else {
          E.preventDefault();
          return;
        }
      else
        C === "ArrowDown" ? $ = 6 : C === "ArrowUp" && ($ = -6);
      i + $ <= 0 || i + $ > ur(c) ? l(0) : $ !== 0 && (l(i + $), E.preventDefault());
    }
  };
  return He(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), ha(() => {
    p(m);
  }, [m]), ha(() => {
    const E = setTimeout(() => {
      if (g && u.current && b.current) {
        const $ = b.current.offsetTop - np;
        u.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(E);
    };
  }, [g]), /* @__PURE__ */ d("div", { className: "pr-flex", children: /* @__PURE__ */ _(Ro, { modal: !1, open: m, onOpenChange: k, children: [
    /* @__PURE__ */ d(Fi, { asChild: !0, children: /* @__PURE__ */ d(
      Dc,
      {
        ref: h,
        value: r,
        handleSearch: O,
        handleKeyDown: I,
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
      vn,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: u,
        children: [
          /* @__PURE__ */ d(
            tp,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ka.map(
            (E, C) => x(E).length > 0 && /* @__PURE__ */ _("div", { children: [
              /* @__PURE__ */ d(jr, { className: "pr-font-semibold pr-text-slate-700", children: rp[E] }),
              x(E).map(($) => /* @__PURE__ */ d("div", { children: /* @__PURE__ */ d(
                Qc,
                {
                  bookId: $,
                  handleSelectBook: () => y($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => f($),
                  handleKeyDown: F,
                  bookType: E,
                  ref: (z) => {
                    o === $ && (b.current = z);
                  },
                  children: /* @__PURE__ */ d(
                    ep,
                    {
                      handleSelectChapter: T,
                      endChapter: ur($),
                      activeChapter: e.bookNum === me.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (z) => {
                        l(z);
                      }
                    }
                  )
                }
              ) }, $)),
              ka.length - 1 !== C ? /* @__PURE__ */ d(yn, {}) : void 0
            ] }, E)
          )
        ]
      }
    )
  ] }) });
}
const cp = To(
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
), we = W.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ d(n ? vc : "button", { className: V(cp({ variant: t, size: r, className: e })), ref: a, ...o })
);
we.displayName = "Button";
function pp({ table: e }) {
  return /* @__PURE__ */ _(Ro, { children: [
    /* @__PURE__ */ d(pc, { asChild: !0, children: /* @__PURE__ */ _(we, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ d(Gl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ _(vn, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ d(jr, { children: "Toggle columns" }),
      /* @__PURE__ */ d(yn, {}),
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
const an = xe.Root, dp = xe.Group, sn = xe.Value, Rr = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(
  xe.Trigger,
  {
    ref: n,
    className: V(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ d(xe.Icon, { asChild: !0, children: /* @__PURE__ */ d(No, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Rr.displayName = xe.Trigger.displayName;
const Ui = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.ScrollUpButton,
  {
    ref: r,
    className: V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(Wl, { className: "pr-h-4 pr-w-4" })
  }
));
Ui.displayName = xe.ScrollUpButton.displayName;
const Hi = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.ScrollDownButton,
  {
    ref: r,
    className: V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ d(No, { className: "pr-h-4 pr-w-4" })
  }
));
Hi.displayName = xe.ScrollDownButton.displayName;
const Pr = W.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ d(xe.Portal, { children: /* @__PURE__ */ _(
  xe.Content,
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
      /* @__PURE__ */ d(Ui, {}),
      /* @__PURE__ */ d(
        xe.Viewport,
        {
          className: V(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ d(Hi, {})
    ]
  }
) }));
Pr.displayName = xe.Content.displayName;
const up = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.Label,
  {
    ref: r,
    className: V("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
up.displayName = xe.Label.displayName;
const Ke = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(
  xe.Item,
  {
    ref: n,
    className: V(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ d("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ d(xe.ItemIndicator, { children: /* @__PURE__ */ d(Eo, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ d(xe.ItemText, { children: t })
    ]
  }
));
Ke.displayName = xe.Item.displayName;
const fp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  xe.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
fp.displayName = xe.Separator.displayName;
function mp({ table: e }) {
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
        an,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ d(Rr, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ d(sn, { placeholder: e.getState().pagination.pageSize }) }),
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
            /* @__PURE__ */ d(Xl, { className: "pr-h-4 pr-w-4" })
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
            /* @__PURE__ */ d(Yl, { className: "pr-h-4 pr-w-4" })
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
            /* @__PURE__ */ d(ql, { className: "pr-h-4 pr-w-4" })
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
            /* @__PURE__ */ d(Kl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const wn = W.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ d("div", { className: V("pr-relative pr-w-full", { "pr-overflow-auto": !t }), children: /* @__PURE__ */ d(
  "table",
  {
    ref: n,
    className: V("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...r
  }
) }));
wn.displayName = "Table";
const xn = W.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ d(
  "thead",
  {
    ref: n,
<<<<<<< HEAD
    className: V(
      { "pr-sticky pr-top-0 pr-bg-secondary": t },
=======
    className: F(
      { "pr-sticky pr-top-0 pr-bg-muted": t },
>>>>>>> ef053b020 (improve table and inventory styles)
      "[&_tr]:pr-border-b",
      e
    ),
    ...r
  }
));
xn.displayName = "TableHeader";
const kn = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("tbody", { ref: r, className: V("[&_tr:last-child]:pr-border-0", e), ...t }));
kn.displayName = "TableBody";
const hp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "tfoot",
  {
    ref: r,
    className: V("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
hp.displayName = "TableFooter";
const yt = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
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
yt.displayName = "TableRow";
const $r = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
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
$r.displayName = "TableHead";
const Jt = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "td",
  {
    ref: r,
    className: V("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Jt.displayName = "TableCell";
const gp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  "caption",
  {
    ref: r,
    className: V("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
gp.displayName = "TableCaption";
function bp({
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
  const [l, c] = ce([]), [f, m] = ce([]), [v, g] = ce({}), [p, h] = ce({}), u = Ci({
    data: t,
    columns: e,
    getCoreRowModel: Oi(),
    ...r && { getPaginationRowModel: mc() },
    onSortingChange: c,
    getSortedRowModel: Ri(),
    onColumnFiltersChange: m,
    getFilteredRowModel: hc(),
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
    o && /* @__PURE__ */ d(pp, { table: u }),
    /* @__PURE__ */ _(wn, { stickyHeader: a, children: [
      /* @__PURE__ */ d(xn, { stickyHeader: a, children: u.getHeaderGroups().map((x) => /* @__PURE__ */ d(yt, { children: x.headers.map((O) => /* @__PURE__ */ d($r, { children: O.isPlaceholder ? void 0 : kr(O.column.columnDef.header, O.getContext()) }, O.id)) }, x.id)) }),
      /* @__PURE__ */ d(kn, { children: (b = u.getRowModel().rows) != null && b.length ? u.getRowModel().rows.map((x) => /* @__PURE__ */ d(
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
    r && n && /* @__PURE__ */ d(mp, { table: u })
  ] });
}
const vp = (e) => e.split(/(?=\n|\\(?:v|c|id))/g), Ea = (e) => {
  const t = /^\\[vc]\s+(\d+)/, r = e.match(t);
  return r ? +r[1] : 0;
}, Na = (e, t, r, n) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = vp(e);
  let i = n.chapterNum, l = n.verseNum, c = 0;
  return a.forEach((f) => {
    f.startsWith("\\id") && (i = 0, l = 0), f.startsWith("\\c") && (i = Ea(f), l = 0), f.startsWith("\\v") && (l = Ea(f), i === 0 && (i = n.chapterNum));
    const m = r(f, t);
    for (let v = 0; v < m.length; v++) {
      const g = {
        reference: { ...n, chapterNum: +i, verseNum: +l },
        snippet: f,
        key: c
      };
      c += 1, o.push(g);
    }
  }), o;
};
function yp({
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
  ), /* @__PURE__ */ _(wn, { stickyHeader: !0, children: [
    /* @__PURE__ */ d(xn, { stickyHeader: !0, children: /* @__PURE__ */ _(yt, { children: [
      /* @__PURE__ */ d($r, { children: i }),
      /* @__PURE__ */ d($r, { children: l })
    ] }) }),
    /* @__PURE__ */ d(kn, { children: c.map((m) => /* @__PURE__ */ _(
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
const _v = Object.freeze([
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
<<<<<<< HEAD
]), $o = (e) => e === "asc" ? /* @__PURE__ */ d(Jl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ d(Zl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ d(Ql, { className: "pr-ml-2 pr-h-4 pr-w-4" }), wp = (e, t, r) => {
=======
]), $o = (e) => e === "asc" ? /* @__PURE__ */ d(Jl, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ d(Zl, { className: "pr-ms-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ d(Ql, { className: "pr-ms-2 pr-h-4 pr-w-4" }), vp = (e, t, r) => {
>>>>>>> ef053b020 (improve table and inventory styles)
  let n = e;
  return t !== "all" && (n = n.filter(
    (o) => t === "approved" && o.status === "approved" || t === "unapproved" && o.status === "unapproved" || t === "unknown" && o.status === "unknown"
  )), r !== "" && (n = n.filter((o) => o.item.includes(r))), n;
}, xp = (e, t, r) => {
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
function Iv({
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
  const g = mt(r, "%webView_inventory_all%"), p = mt(r, "%webView_inventory_approved%"), h = mt(r, "%webView_inventory_unapproved%"), u = mt(r, "%webView_inventory_unknown%"), b = mt(r, "%webView_inventory_scope_book%"), x = mt(r, "%webView_inventory_scope_chapter%"), O = mt(r, "%webView_inventory_scope_verse%"), w = mt(r, "%webView_inventory_filter_text%"), [k, y] = ce([]), [T, S] = ce("all"), [I, D] = ce(""), [F, E] = ce(""), C = Se(
    (B, Z) => {
      y((M) => {
        let H = [];
        return B.forEach((J) => {
          H = M.map((G) => G.item === J && G.status !== Z ? { ...G, status: Z } : G);
        }), H;
      });
      let Q = [...o];
      B.forEach((M) => {
        Z === "approved" ? Q.includes(M) || Q.push(M) : Q = Q.filter((H) => H !== M);
      }), a(Q);
      let R = [...i];
      B.forEach((M) => {
        Z === "unapproved" ? R.includes(M) || R.push(M) : R = R.filter(
          (H) => H !== M
        );
      }), l(R);
    },
    [o, a, i, l]
  ), $ = Se(
    (B) => o.includes(B) ? "approved" : i.includes(B) ? "unapproved" : "unknown",
    [o, i]
  );
  He(() => {
    c && y(xp(c, n, $));
  }, [n, c, $]);
  const z = Mt(() => wp(k, T, I), [k, T, I]);
  He(() => {
    E("");
  }, [z]);
  const U = (B, Z) => {
    Z.toggleAllRowsSelected(!1), B.toggleSelected(void 0), E(B.getValue("item"));
  }, j = Mt(() => v(C), [v, C]);
  return /* @__PURE__ */ _("div", { className: "pr-twp pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ _("div", { className: "pr-flex", children: [
      /* @__PURE__ */ _(an, { onValueChange: (B) => S(B), defaultValue: T, children: [
        /* @__PURE__ */ d(Rr, { className: "pr-m-1", children: /* @__PURE__ */ d(sn, { placeholder: "Select filter" }) }),
        /* @__PURE__ */ _(Pr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(Ke, { value: "all", children: g }),
          /* @__PURE__ */ d(Ke, { value: "approved", children: p }),
          /* @__PURE__ */ d(Ke, { value: "unapproved", children: h }),
          /* @__PURE__ */ d(Ke, { value: "unknown", children: u })
        ] })
      ] }),
      /* @__PURE__ */ _(an, { onValueChange: (B) => m(B), defaultValue: f, children: [
        /* @__PURE__ */ d(Rr, { className: "pr-m-1", children: /* @__PURE__ */ d(sn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ _(Pr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ d(Ke, { value: "book", children: b }),
          /* @__PURE__ */ d(Ke, { value: "chapter", children: x }),
          /* @__PURE__ */ d(Ke, { value: "verse", children: O })
        ] })
      ] }),
      /* @__PURE__ */ d(
        bn,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: w,
          value: I,
          onChange: (B) => {
            D(B.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ d("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      bp,
      {
        columns: j,
        data: z,
        onRowClickHandler: U,
        stickyHeader: !0
      }
    ) }),
    F !== "" && /* @__PURE__ */ d("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ d(
      yp,
      {
        selectedItem: F,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (B) => t(B),
        localizedStrings: r
      }
    ) })
  ] });
}
const Mv = (e) => ({
  accessorKey: "item",
  header: ({ column: t }) => /* @__PURE__ */ _(we, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    $o(t.getIsSorted())
  ] })
}), Av = (e) => ({
  accessorKey: "count",
  header: ({ column: t }) => /* @__PURE__ */ _(we, { variant: "ghost", onClick: () => t.toggleSorting(void 0), children: [
    e,
    $o(t.getIsSorted())
  ] })
}), Dv = (e, t) => ({
  accessorKey: "status",
  header: ({ column: r, table: n }) => {
    const o = n.getSelectedRowModel().rows, a = [];
    return o.forEach((i) => {
      a.push(i.getValue("item"));
    }), /* @__PURE__ */ _("div", { children: [
      /* @__PURE__ */ d("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ _(
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
      ) }),
      /* @__PURE__ */ _("div", { className: "pr-flex pr-justify-center", children: [
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
      ] })
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
}), kp = Or.Root, Ep = Or.Trigger, Gi = W.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ d(Or.Portal, { children: /* @__PURE__ */ d(
  Or.Content,
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
Gi.displayName = Or.Content.displayName;
const Np = Qe.Portal, Wi = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Qe.Overlay,
  {
    ref: r,
    className: V(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Wi.displayName = Qe.Overlay.displayName;
const Tp = W.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ _(Np, { children: [
  /* @__PURE__ */ d(Wi, {}),
  /* @__PURE__ */ _(
    Qe.Content,
    {
      ref: n,
      className: V(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ _(Qe.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ d(ec, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ d("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
Tp.displayName = Qe.Content.displayName;
const Sp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Qe.Title,
  {
    ref: r,
    className: V("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
Sp.displayName = Qe.Title.displayName;
const Cp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Qe.Description,
  {
    ref: r,
    className: V("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
Cp.displayName = Qe.Description.displayName;
const Xi = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae,
  {
    ref: r,
    className: V(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
Xi.displayName = Ae.displayName;
const Yi = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ _("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ d(tc, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ d(
    Ae.Input,
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
Yi.displayName = Ae.Input.displayName;
const qi = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.List,
  {
    ref: r,
    className: V("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
qi.displayName = Ae.List.displayName;
const Ki = W.forwardRef((e, t) => /* @__PURE__ */ d(Ae.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Ki.displayName = Ae.Empty.displayName;
const Op = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.Group,
  {
    ref: r,
    className: V(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Op.displayName = Ae.Group.displayName;
const Rp = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Rp.displayName = Ae.Separator.displayName;
const Ji = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  Ae.Item,
  {
    ref: r,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
Ji.displayName = Ae.Item.displayName;
function Pp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function Ta({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = Pp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: f = "outline"
}) {
  const [m, v] = ce(!1);
  return /* @__PURE__ */ _(kp, { open: m, onOpenChange: v, children: [
    /* @__PURE__ */ d(Ep, { asChild: !0, children: /* @__PURE__ */ _(
      we,
      {
        variant: f,
        role: "combobox",
        "aria-expanded": m,
        id: e,
        className: V("pr-w-[200px] pr-justify-between", r),
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ d(rc, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ d(Gi, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ _(Xi, { children: [
      /* @__PURE__ */ d(Yi, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ d(Ki, { children: c }),
      /* @__PURE__ */ d(qi, { children: t.map((g) => /* @__PURE__ */ _(
        Ji,
        {
          value: a(g),
          onSelect: () => {
            o(g), v(!1);
          },
          children: [
            /* @__PURE__ */ d(
              Eo,
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
function jv({
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
function $p({
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
    wc,
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
      yc,
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
function Bv({
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
      $p,
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
function _p(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Ip(e) {
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
var _o = {}, Zi = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Zi);
var Mp = Zi.exports, zn = {};
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
function Qi(e) {
  if (!Pt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = Qi(e[r]);
  }), t;
}
function st(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? P({}, e) : e;
  return Pt(e) && Pt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Pt(t[o]) && o in e && Pt(e[o]) ? n[o] = st(e[o], t[o], r) : r.clone ? n[o] = Pt(t[o]) ? Qi(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var so = { exports: {} }, qr = { exports: {} }, pe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sa;
function Ap() {
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
function Dp() {
  return Ca || (Ca = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, f = e ? Symbol.for("react.concurrent_mode") : 60111, m = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, O = e ? Symbol.for("react.scope") : 60119;
    function w(L) {
      return typeof L == "string" || typeof L == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      L === n || L === f || L === a || L === o || L === v || L === g || typeof L == "object" && L !== null && (L.$$typeof === h || L.$$typeof === p || L.$$typeof === i || L.$$typeof === l || L.$$typeof === m || L.$$typeof === b || L.$$typeof === x || L.$$typeof === O || L.$$typeof === u);
    }
    function k(L) {
      if (typeof L == "object" && L !== null) {
        var re = L.$$typeof;
        switch (re) {
          case t:
            var A = L.type;
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
    var y = c, T = f, S = l, I = i, D = t, F = m, E = n, C = h, $ = p, z = r, U = a, j = o, B = v, Z = !1;
    function Q(L) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), R(L) || k(L) === c;
    }
    function R(L) {
      return k(L) === f;
    }
    function M(L) {
      return k(L) === l;
    }
    function H(L) {
      return k(L) === i;
    }
    function J(L) {
      return typeof L == "object" && L !== null && L.$$typeof === t;
    }
    function G(L) {
      return k(L) === m;
    }
    function X(L) {
      return k(L) === n;
    }
    function q(L) {
      return k(L) === h;
    }
    function K(L) {
      return k(L) === p;
    }
    function Y(L) {
      return k(L) === r;
    }
    function ee(L) {
      return k(L) === a;
    }
    function te(L) {
      return k(L) === o;
    }
    function ie(L) {
      return k(L) === v;
    }
    de.AsyncMode = y, de.ConcurrentMode = T, de.ContextConsumer = S, de.ContextProvider = I, de.Element = D, de.ForwardRef = F, de.Fragment = E, de.Lazy = C, de.Memo = $, de.Portal = z, de.Profiler = U, de.StrictMode = j, de.Suspense = B, de.isAsyncMode = Q, de.isConcurrentMode = R, de.isContextConsumer = M, de.isContextProvider = H, de.isElement = J, de.isForwardRef = G, de.isFragment = X, de.isLazy = q, de.isMemo = K, de.isPortal = Y, de.isProfiler = ee, de.isStrictMode = te, de.isSuspense = ie, de.isValidElementType = w, de.typeOf = k;
  }()), de;
}
var Oa;
function es() {
  return Oa || (Oa = 1, process.env.NODE_ENV === "production" ? qr.exports = Ap() : qr.exports = Dp()), qr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Un, Ra;
function jp() {
  if (Ra)
    return Un;
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
  return Un = o() ? Object.assign : function(a, i) {
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
  }, Un;
}
var Hn, Pa;
function Io() {
  if (Pa)
    return Hn;
  Pa = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Hn = e, Hn;
}
var Gn, $a;
function ts() {
  return $a || ($a = 1, Gn = Function.call.bind(Object.prototype.hasOwnProperty)), Gn;
}
var Wn, _a;
function Bp() {
  if (_a)
    return Wn;
  _a = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Io(), r = {}, n = ts();
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
  }, Wn = o, Wn;
}
var Xn, Ia;
function Lp() {
  if (Ia)
    return Xn;
  Ia = 1;
  var e = es(), t = jp(), r = Io(), n = ts(), o = Bp(), a = function() {
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
  return Xn = function(l, c) {
    var f = typeof Symbol == "function" && Symbol.iterator, m = "@@iterator";
    function v(R) {
      var M = R && (f && R[f] || R[m]);
      if (typeof M == "function")
        return M;
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
      node: F(),
      objectOf: I,
      oneOf: S,
      oneOfType: D,
      shape: C,
      exact: $
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
        var M = {}, H = 0;
      function J(X, q, K, Y, ee, te, ie) {
        if (Y = Y || g, te = te || K, ie !== r) {
          if (c) {
            var L = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw L.name = "Invariant Violation", L;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = Y + ":" + K;
            !M[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + te + "` prop on `" + Y + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[re] = !0, H++);
          }
        }
        return q[K] == null ? X ? q[K] === null ? new u("The " + ee + " `" + te + "` is marked as required " + ("in `" + Y + "`, but its value is `null`.")) : new u("The " + ee + " `" + te + "` is marked as required in " + ("`" + Y + "`, but its value is `undefined`.")) : null : R(q, K, Y, ee, te);
      }
      var G = J.bind(null, !1);
      return G.isRequired = J.bind(null, !0), G;
    }
    function x(R) {
      function M(H, J, G, X, q, K) {
        var Y = H[J], ee = j(Y);
        if (ee !== R) {
          var te = B(Y);
          return new u(
            "Invalid " + X + " `" + q + "` of type " + ("`" + te + "` supplied to `" + G + "`, expected ") + ("`" + R + "`."),
            { expectedType: R }
          );
        }
        return null;
      }
      return b(M);
    }
    function O() {
      return b(i);
    }
    function w(R) {
      function M(H, J, G, X, q) {
        if (typeof R != "function")
          return new u("Property `" + q + "` of component `" + G + "` has invalid PropType notation inside arrayOf.");
        var K = H[J];
        if (!Array.isArray(K)) {
          var Y = j(K);
          return new u("Invalid " + X + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + G + "`, expected an array."));
        }
        for (var ee = 0; ee < K.length; ee++) {
          var te = R(K, ee, G, X, q + "[" + ee + "]", r);
          if (te instanceof Error)
            return te;
        }
        return null;
      }
      return b(M);
    }
    function k() {
      function R(M, H, J, G, X) {
        var q = M[H];
        if (!l(q)) {
          var K = j(q);
          return new u("Invalid " + G + " `" + X + "` of type " + ("`" + K + "` supplied to `" + J + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(R);
    }
    function y() {
      function R(M, H, J, G, X) {
        var q = M[H];
        if (!e.isValidElementType(q)) {
          var K = j(q);
          return new u("Invalid " + G + " `" + X + "` of type " + ("`" + K + "` supplied to `" + J + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(R);
    }
    function T(R) {
      function M(H, J, G, X, q) {
        if (!(H[J] instanceof R)) {
          var K = R.name || g, Y = Q(H[J]);
          return new u("Invalid " + X + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + G + "`, expected ") + ("instance of `" + K + "`."));
        }
        return null;
      }
      return b(M);
    }
    function S(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function M(H, J, G, X, q) {
        for (var K = H[J], Y = 0; Y < R.length; Y++)
          if (h(K, R[Y]))
            return null;
        var ee = JSON.stringify(R, function(ie, L) {
          var re = B(L);
          return re === "symbol" ? String(L) : L;
        });
        return new u("Invalid " + X + " `" + q + "` of value `" + String(K) + "` " + ("supplied to `" + G + "`, expected one of " + ee + "."));
      }
      return b(M);
    }
    function I(R) {
      function M(H, J, G, X, q) {
        if (typeof R != "function")
          return new u("Property `" + q + "` of component `" + G + "` has invalid PropType notation inside objectOf.");
        var K = H[J], Y = j(K);
        if (Y !== "object")
          return new u("Invalid " + X + " `" + q + "` of type " + ("`" + Y + "` supplied to `" + G + "`, expected an object."));
        for (var ee in K)
          if (n(K, ee)) {
            var te = R(K, ee, G, X, q + "." + ee, r);
            if (te instanceof Error)
              return te;
          }
        return null;
      }
      return b(M);
    }
    function D(R) {
      if (!Array.isArray(R))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var M = 0; M < R.length; M++) {
        var H = R[M];
        if (typeof H != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Z(H) + " at index " + M + "."
          ), i;
      }
      function J(G, X, q, K, Y) {
        for (var ee = [], te = 0; te < R.length; te++) {
          var ie = R[te], L = ie(G, X, q, K, Y, r);
          if (L == null)
            return null;
          L.data && n(L.data, "expectedType") && ee.push(L.data.expectedType);
        }
        var re = ee.length > 0 ? ", expected one of type [" + ee.join(", ") + "]" : "";
        return new u("Invalid " + K + " `" + Y + "` supplied to " + ("`" + q + "`" + re + "."));
      }
      return b(J);
    }
    function F() {
      function R(M, H, J, G, X) {
        return z(M[H]) ? null : new u("Invalid " + G + " `" + X + "` supplied to " + ("`" + J + "`, expected a ReactNode."));
      }
      return b(R);
    }
    function E(R, M, H, J, G) {
      return new u(
        (R || "React class") + ": " + M + " type `" + H + "." + J + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + G + "`."
      );
    }
    function C(R) {
      function M(H, J, G, X, q) {
        var K = H[J], Y = j(K);
        if (Y !== "object")
          return new u("Invalid " + X + " `" + q + "` of type `" + Y + "` " + ("supplied to `" + G + "`, expected `object`."));
        for (var ee in R) {
          var te = R[ee];
          if (typeof te != "function")
            return E(G, X, q, ee, B(te));
          var ie = te(K, ee, G, X, q + "." + ee, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return b(M);
    }
    function $(R) {
      function M(H, J, G, X, q) {
        var K = H[J], Y = j(K);
        if (Y !== "object")
          return new u("Invalid " + X + " `" + q + "` of type `" + Y + "` " + ("supplied to `" + G + "`, expected `object`."));
        var ee = t({}, H[J], R);
        for (var te in ee) {
          var ie = R[te];
          if (n(R, te) && typeof ie != "function")
            return E(G, X, q, te, B(ie));
          if (!ie)
            return new u(
              "Invalid " + X + " `" + q + "` key `" + te + "` supplied to `" + G + "`.\nBad object: " + JSON.stringify(H[J], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(R), null, "  ")
            );
          var L = ie(K, te, G, X, q + "." + te, r);
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
            var H = M.call(R), J;
            if (M !== R.entries) {
              for (; !(J = H.next()).done; )
                if (!z(J.value))
                  return !1;
            } else
              for (; !(J = H.next()).done; ) {
                var G = J.value;
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
    function U(R, M) {
      return R === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function j(R) {
      var M = typeof R;
      return Array.isArray(R) ? "array" : R instanceof RegExp ? "object" : U(M, R) ? "symbol" : M;
    }
    function B(R) {
      if (typeof R > "u" || R === null)
        return "" + R;
      var M = j(R);
      if (M === "object") {
        if (R instanceof Date)
          return "date";
        if (R instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function Z(R) {
      var M = B(R);
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
    function Q(R) {
      return !R.constructor || !R.constructor.name ? g : R.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Xn;
}
var Yn, Ma;
function Fp() {
  if (Ma)
    return Yn;
  Ma = 1;
  var e = Io();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Yn = function() {
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
  }, Yn;
}
if (process.env.NODE_ENV !== "production") {
  var Vp = es(), zp = !0;
  so.exports = Lp()(Vp.isElement, zp);
} else
  so.exports = Fp()();
var Up = so.exports;
const s = /* @__PURE__ */ _p(Up);
function Hp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function rs(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Hp(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const ns = ar(s.element, rs);
ns.isRequired = ar(s.element.isRequired, rs);
const Br = ns;
function Gp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Wp(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !Gp(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Xp = ar(s.elementType, Wp), Yp = "exact-prop: ​";
function os(e) {
  return process.env.NODE_ENV === "production" ? e : P({}, e, {
    [Yp]: (t) => {
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
var lo = { exports: {} }, ue = {};
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
function qp() {
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
function Kp() {
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
    var T = i, S = a, I = e, D = c, F = r, E = g, C = v, $ = t, z = o, U = n, j = f, B = m, Z = !1, Q = !1;
    function R(A) {
      return Z || (Z = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function M(A) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(A) {
      return y(A) === i;
    }
    function J(A) {
      return y(A) === a;
    }
    function G(A) {
      return typeof A == "object" && A !== null && A.$$typeof === e;
    }
    function X(A) {
      return y(A) === c;
    }
    function q(A) {
      return y(A) === r;
    }
    function K(A) {
      return y(A) === g;
    }
    function Y(A) {
      return y(A) === v;
    }
    function ee(A) {
      return y(A) === t;
    }
    function te(A) {
      return y(A) === o;
    }
    function ie(A) {
      return y(A) === n;
    }
    function L(A) {
      return y(A) === f;
    }
    function re(A) {
      return y(A) === m;
    }
    fe.ContextConsumer = T, fe.ContextProvider = S, fe.Element = I, fe.ForwardRef = D, fe.Fragment = F, fe.Lazy = E, fe.Memo = C, fe.Portal = $, fe.Profiler = z, fe.StrictMode = U, fe.Suspense = j, fe.SuspenseList = B, fe.isAsyncMode = R, fe.isConcurrentMode = M, fe.isContextConsumer = H, fe.isContextProvider = J, fe.isElement = G, fe.isForwardRef = X, fe.isFragment = q, fe.isLazy = K, fe.isMemo = Y, fe.isPortal = ee, fe.isProfiler = te, fe.isStrictMode = ie, fe.isSuspense = L, fe.isSuspenseList = re, fe.isValidElementType = k, fe.typeOf = y;
  }()), fe;
}
process.env.NODE_ENV === "production" ? lo.exports = qp() : lo.exports = Kp();
var ln = lo.exports;
const Jp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Zp(e) {
  const t = `${e}`.match(Jp);
  return t && t[1] || "";
}
function as(e, t = "") {
  return e.displayName || e.name || Zp(e) || t;
}
function ja(e, t, r) {
  const n = as(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function Qp(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return as(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ln.ForwardRef:
          return ja(e, e.render, "ForwardRef");
        case ln.Memo:
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
const ed = s.oneOfType([s.func, s.object]), Mo = ed;
function et(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Zt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function co(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function is(e, t = 166) {
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
function td(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function rd(e, t) {
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
function nd(e, t) {
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
function cn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const od = typeof window < "u" ? N.useLayoutEffect : N.useEffect, Dt = od;
let Ba = 0;
function ad(e) {
  const [t, r] = N.useState(e), n = e || t;
  return N.useEffect(() => {
    t == null && (Ba += 1, r(`mui-${Ba}`));
  }, [t]), n;
}
const La = N["useId".toString()];
function ss(e) {
  if (La !== void 0) {
    const t = La();
    return e ?? t;
  }
  return ad(e);
}
function id(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function ls({
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
      cn(r, t);
    });
  }, e);
}
const Fa = {};
function sd(e, t) {
  const r = N.useRef(Fa);
  return r.current === Fa && (r.current = e(t)), r;
}
const ld = [];
function cd(e) {
  N.useEffect(e, ld);
}
class Lr {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Lr();
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
  const e = sd(Lr.create).current;
  return cd(e.disposeEffect), e;
}
let En = !0, po = !1;
const pd = new Lr(), dd = {
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
function ud(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && dd[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function fd(e) {
  e.metaKey || e.altKey || e.ctrlKey || (En = !0);
}
function qn() {
  En = !1;
}
function md() {
  this.visibilityState === "hidden" && po && (En = !0);
}
function hd(e) {
  e.addEventListener("keydown", fd, !0), e.addEventListener("mousedown", qn, !0), e.addEventListener("pointerdown", qn, !0), e.addEventListener("touchstart", qn, !0), e.addEventListener("visibilitychange", md, !0);
}
function gd(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return En || ud(t);
}
function cs() {
  const e = N.useCallback((o) => {
    o != null && hd(o.ownerDocument);
  }, []), t = N.useRef(!1);
  function r() {
    return t.current ? (po = !0, pd.start(100, () => {
      po = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return gd(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function ps(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function bd(e) {
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
function vd(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const yd = Number.isInteger || vd;
function ds(e, t, r, n) {
  const o = e[t];
  if (o == null || !yd(o)) {
    const a = bd(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function us(e, t, ...r) {
  return e[t] === void 0 ? null : ds(e, t, ...r);
}
function uo() {
  return null;
}
us.isRequired = ds;
uo.isRequired = uo;
const fs = process.env.NODE_ENV === "production" ? uo : us;
function ms(e, t) {
  const r = P({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = P({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = P({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = ms(o[i], a[i]);
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
const Va = (e) => e, wd = () => {
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
}, xd = wd(), hs = xd, gs = {
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
  const n = gs[t];
  return n ? `${r}-${n}` : `${hs.generate(e)}-${t}`;
}
function xt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = rt(e, o, r);
  }), n;
}
function kd(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
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
const Ed = ["values", "unit", "step"], Nd = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => P({}, r, {
    [n.key]: n.val
  }), {});
};
function Td(e) {
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
  } = e, o = he(e, Ed), a = Nd(t), i = Object.keys(a);
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
const Sd = {
  borderRadius: 4
}, Cd = Sd, Od = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, kt = Od;
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
function Rd(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function Pd(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function Nn(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function pn(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = Nn(e, r) || n, t && (o = t(o, n, e)), o;
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
    const l = i[t], c = i.theme, f = Nn(c, n) || {};
    return ct(i, l, (v) => {
      let g = pn(f, o, v);
      return v === g && typeof v == "string" && (g = pn(f, o, `${t}${v === "default" ? "" : et(v)}`, v)), r === !1 ? g : {
        [r]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: kt
  } : {}, a.filterProps = [t], a;
}
function $d(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const _d = {
  m: "margin",
  p: "padding"
}, Id = {
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
}, Md = $d((e) => {
  if (e.length > 2)
    if (Ua[e])
      e = Ua[e];
    else
      return [e];
  const [t, r] = e.split(""), n = _d[t], o = Id[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), Tn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Sn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Ad = [...Tn, ...Sn];
function Fr(e, t, r, n) {
  var o;
  const a = (o = Nn(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function bs(e) {
  return Fr(e, "spacing", 8, "spacing");
}
function Vr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Dd(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Vr(t, r), n), {});
}
function jd(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = Md(r), a = Dd(o, n), i = e[r];
  return ct(e, i, a);
}
function vs(e, t) {
  const r = bs(e.theme);
  return Object.keys(e).map((n) => jd(e, t, n, r)).reduce(Nr, {});
}
function ve(e) {
  return vs(e, Tn);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? Tn.reduce((e, t) => (e[t] = kt, e), {}) : {};
ve.filterProps = Tn;
function ye(e) {
  return vs(e, Sn);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Sn.reduce((e, t) => (e[t] = kt, e), {}) : {};
ye.filterProps = Sn;
process.env.NODE_ENV !== "production" && Ad.reduce((e, t) => (e[t] = kt, e), {});
function Bd(e = 8) {
  if (e.mui)
    return e;
  const t = bs({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function Cn(...e) {
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
const Ld = qe("border", Ue), Fd = qe("borderTop", Ue), Vd = qe("borderRight", Ue), zd = qe("borderBottom", Ue), Ud = qe("borderLeft", Ue), Hd = qe("borderColor"), Gd = qe("borderTopColor"), Wd = qe("borderRightColor"), Xd = qe("borderBottomColor"), Yd = qe("borderLeftColor"), qd = qe("outline", Ue), Kd = qe("outlineColor"), On = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Fr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Vr(t, n)
    });
    return ct(e, e.borderRadius, r);
  }
  return null;
};
On.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: kt
} : {};
On.filterProps = ["borderRadius"];
Cn(Ld, Fd, Vd, zd, Ud, Hd, Gd, Wd, Xd, Yd, On, qd, Kd);
const Rn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Fr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Vr(t, n)
    });
    return ct(e, e.gap, r);
  }
  return null;
};
Rn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: kt
} : {};
Rn.filterProps = ["gap"];
const Pn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Fr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Vr(t, n)
    });
    return ct(e, e.columnGap, r);
  }
  return null;
};
Pn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: kt
} : {};
Pn.filterProps = ["columnGap"];
const $n = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Fr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Vr(t, n)
    });
    return ct(e, e.rowGap, r);
  }
  return null;
};
$n.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: kt
} : {};
$n.filterProps = ["rowGap"];
const Jd = Ee({
  prop: "gridColumn"
}), Zd = Ee({
  prop: "gridRow"
}), Qd = Ee({
  prop: "gridAutoFlow"
}), eu = Ee({
  prop: "gridAutoColumns"
}), tu = Ee({
  prop: "gridAutoRows"
}), ru = Ee({
  prop: "gridTemplateColumns"
}), nu = Ee({
  prop: "gridTemplateRows"
}), ou = Ee({
  prop: "gridTemplateAreas"
}), au = Ee({
  prop: "gridArea"
});
Cn(Rn, Pn, $n, Jd, Zd, Qd, eu, tu, ru, nu, ou, au);
function Kt(e, t) {
  return t === "grey" ? t : e;
}
const iu = Ee({
  prop: "color",
  themeKey: "palette",
  transform: Kt
}), su = Ee({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Kt
}), lu = Ee({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Kt
});
Cn(iu, su, lu);
function Fe(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const cu = Ee({
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
const pu = Ee({
  prop: "minWidth",
  transform: Fe
}), du = Ee({
  prop: "height",
  transform: Fe
}), uu = Ee({
  prop: "maxHeight",
  transform: Fe
}), fu = Ee({
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
const mu = Ee({
  prop: "boxSizing"
});
Cn(cu, Do, pu, du, uu, fu, mu);
const hu = {
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
    style: On
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
    style: Rn
  },
  rowGap: {
    style: $n
  },
  columnGap: {
    style: Pn
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
}, jo = hu;
function gu(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function bu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function vu() {
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
    const g = Nn(o, f) || {};
    return v ? v(i) : ct(i, n, (h) => {
      let u = pn(g, m, h);
      return h === u && typeof h == "string" && (u = pn(g, m, `${r}${h === "default" ? "" : et(h)}`, h)), c === !1 ? u : {
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
      const m = Rd(a.breakpoints), v = Object.keys(m);
      let g = m;
      return Object.keys(f).forEach((p) => {
        const h = bu(f[p], a);
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
              gu(u, h) ? g[p] = t({
                sx: h,
                theme: a
              }) : g = Nr(g, u);
            }
          else
            g = Nr(g, e(p, h, a, i));
      }), Pd(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const ys = vu();
ys.filterProps = ["sx"];
const Bo = ys;
function yu(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const wu = ["breakpoints", "palette", "spacing", "shape"];
function Lo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = he(e, wu), l = Td(r), c = Bd(o);
  let f = st({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, n),
    spacing: c,
    shape: P({}, Cd, a)
  }, i);
  return f.applyStyles = yu, f = t.reduce((m, v) => st(m, v), f), f.unstable_sxConfig = P({}, jo, i == null ? void 0 : i.unstable_sxConfig), f.unstable_sx = function(v) {
    return Bo({
      sx: v,
      theme: this
    });
  }, f;
}
function xu(e) {
  return Object.keys(e).length === 0;
}
function ws(e = null) {
  const t = N.useContext(_c);
  return !t || xu(t) ? e : t;
}
const ku = Lo();
function xs(e = ku) {
  return ws(e);
}
const Eu = ["ownerState"], Nu = ["variants"], Tu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function Su(e) {
  return Object.keys(e).length === 0;
}
function Cu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function en(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const Ou = Lo(), Ha = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Kr({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return Su(t) ? e : t[r] || t;
}
function Ru(e) {
  return e ? (t, r) => r[e] : null;
}
function tn(e, t) {
  let {
    ownerState: r
  } = t, n = he(t, Eu);
  const o = typeof e == "function" ? e(P({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => tn(a, P({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = he(o, Nu);
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
function Pu(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = Ou,
    rootShouldForwardProp: n = en,
    slotShouldForwardProp: o = en
  } = e, a = (i) => Bo(P({}, i, {
    theme: Kr(P({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Ic(i, (y) => y.filter((T) => !(T != null && T.__mui_systemSx)));
    const {
      name: c,
      slot: f,
      skipVariantsResolver: m,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = Ru(Ha(f))
    } = l, p = he(l, Tu), h = m !== void 0 ? m : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      f && f !== "Root" && f !== "root" || !1
    ), u = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${Ha(f || "Root")}`);
    let x = en;
    f === "Root" || f === "root" ? x = n : f ? x = o : Cu(i) && (x = void 0);
    const O = $c(i, P({
      shouldForwardProp: x,
      label: b
    }, p)), w = (y) => typeof y == "function" && y.__emotion_real !== y || Pt(y) ? (T) => tn(y, P({}, T, {
      theme: Kr({
        theme: T.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, k = (y, ...T) => {
      let S = w(y);
      const I = T ? T.map(w) : [];
      c && g && I.push((E) => {
        const C = Kr(P({}, E, {
          defaultTheme: r,
          themeId: t
        }));
        if (!C.components || !C.components[c] || !C.components[c].styleOverrides)
          return null;
        const $ = C.components[c].styleOverrides, z = {};
        return Object.entries($).forEach(([U, j]) => {
          z[U] = tn(j, P({}, E, {
            theme: C
          }));
        }), g(E, z);
      }), c && !h && I.push((E) => {
        var C;
        const $ = Kr(P({}, E, {
          defaultTheme: r,
          themeId: t
        })), z = $ == null || (C = $.components) == null || (C = C[c]) == null ? void 0 : C.variants;
        return tn({
          variants: z
        }, P({}, E, {
          theme: $
        }));
      }), u || I.push(a);
      const D = I.length - T.length;
      if (Array.isArray(y) && D > 0) {
        const E = new Array(D).fill("");
        S = [...y, ...E], S.raw = [...y.raw, ...E];
      }
      const F = O(S, ...I);
      if (process.env.NODE_ENV !== "production") {
        let E;
        c && (E = `${c}${et(f || "")}`), E === void 0 && (E = `Styled(${Qp(i)})`), F.displayName = E;
      }
      return i.muiName && (F.muiName = i.muiName), F;
    };
    return O.withConfig && (k.withConfig = O.withConfig), k;
  };
}
function $u(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : ms(t.components[r].defaultProps, n);
}
function _u({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = xs(r);
  return n && (o = o[n] || o), $u({
    theme: o,
    name: t,
    props: e
  });
}
function Fo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), kd(e, t, r);
}
function Iu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function jt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return jt(Iu(e));
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
function _n(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Mu(e) {
  e = jt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (f, m = (f + r / 30) % 12) => o - a * Math.max(Math.min(m - 3, 9 - m, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), _n({
    type: l,
    values: c
  });
}
function Ga(e) {
  e = jt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? jt(Mu(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function Wa(e, t) {
  const r = Ga(e), n = Ga(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function dn(e, t) {
  return e = jt(e), t = Fo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, _n(e);
}
function Au(e, t) {
  if (e = jt(e), t = Fo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return _n(e);
}
function Du(e, t) {
  if (e = jt(e), t = Fo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return _n(e);
}
function ju(e, t) {
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
const Bu = {
  black: "#000",
  white: "#fff"
}, Ir = Bu, Lu = {
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
}, Fu = Lu, Vu = {
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
}, Vt = Vu, zu = {
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
}, zt = zu, Uu = {
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
}, fr = Uu, Hu = {
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
}, Ut = Hu, Gu = {
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
}, Ht = Gu, Wu = {
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
}, Gt = Wu, Xu = ["mode", "contrastThreshold", "tonalOffset"], Xa = {
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
}, Kn = {
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
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Du(e.main, o) : t === "dark" && (e.dark = Au(e.main, a)));
}
function Yu(e = "light") {
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
function qu(e = "light") {
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
function Ku(e = "light") {
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
function Ju(e = "light") {
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
function Zu(e = "light") {
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
function Qu(e = "light") {
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
function ef(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = he(e, Xu), a = e.primary || Yu(t), i = e.secondary || qu(t), l = e.error || Ku(t), c = e.info || Ju(t), f = e.success || Zu(t), m = e.warning || Qu(t);
  function v(u) {
    const b = Wa(u, Kn.text.primary) >= r ? Kn.text.primary : Xa.text.primary;
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
    dark: Kn,
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
    grey: Fu,
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
const tf = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function rf(e) {
  return Math.round(e * 1e5) / 1e5;
}
const qa = {
  textTransform: "uppercase"
}, Ka = '"Roboto", "Helvetica", "Arial", sans-serif';
function nf(e, t) {
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
  } = r, g = he(r, tf);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof f != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((x) => `${x / f * p}rem`), u = (x, O, w, k, y) => P({
    fontFamily: n,
    fontWeight: x,
    fontSize: h(O),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === Ka ? {
    letterSpacing: `${rf(k / O)}em`
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
const of = 0.2, af = 0.14, sf = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${of})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${af})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${sf})`].join(",");
}
const lf = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], cf = lf, pf = ["duration", "easing", "delay"], df = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, uf = {
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
function ff(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function mf(e) {
  const t = P({}, df, e.easing), r = P({}, uf, e.duration);
  return P({
    getAutoHeightDuration: ff,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, f = he(a, pf);
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
const hf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, gf = hf, bf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function vf(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = he(e, bf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Zt(18));
  const l = ef(n), c = Lo(e);
  let f = st(c, {
    mixins: ju(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: cf.slice(),
    typography: nf(l, a),
    transitions: mf(o),
    zIndex: P({}, gf)
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
const yf = vf(), Vo = yf, zo = "$$material";
function ut({
  props: e,
  name: t
}) {
  return _u({
    props: e,
    name: t,
    defaultTheme: Vo,
    themeId: zo
  });
}
const ks = (e) => en(e) && e !== "classes", wf = Pu({
  themeId: zo,
  defaultTheme: Vo,
  rootShouldForwardProp: ks
}), Re = wf;
function xf(e) {
  return rt("MuiSvgIcon", e);
}
xt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const kf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], Ef = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${et(t)}`, `fontSize${et(r)}`]
  };
  return dt(o, xf, n);
}, Nf = Re("svg", {
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
  } = n, p = he(n, kf), h = /* @__PURE__ */ N.isValidElement(o) && o.type === "svg", u = P({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: m,
    viewBox: g,
    hasSvgAsChild: h
  }), b = {};
  m || (b.viewBox = g);
  const x = Ef(u);
  return /* @__PURE__ */ _(Nf, P({
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
function Es(e, t) {
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
const Tf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), hs.configure(e);
  }
}, Sf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: et,
  createChainedFunction: co,
  createSvgIcon: Es,
  debounce: is,
  deprecatedPropType: td,
  isMuiElement: rd,
  ownerDocument: Oe,
  ownerWindow: Qt,
  requirePropFactory: nd,
  setRef: cn,
  unstable_ClassNameGenerator: Tf,
  unstable_useEnhancedEffect: Dt,
  unstable_useId: ss,
  unsupportedProp: id,
  useControlled: ls,
  useEventCallback: _r,
  useForkRef: We,
  useIsFocusVisible: cs
}, Symbol.toStringTag, { value: "Module" })), Cf = /* @__PURE__ */ Ip(Sf);
var Qa;
function Of() {
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
    var t = Cf;
  }(zn)), zn;
}
var Rf = Mp;
Object.defineProperty(_o, "__esModule", {
  value: !0
});
var Ns = _o.default = void 0, Pf = Rf(Of()), $f = Bl;
Ns = _o.default = (0, Pf.default)(/* @__PURE__ */ (0, $f.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Ts(e) {
  return typeof e == "string";
}
function wr(e, t, r) {
  return e === void 0 || Ts(e) ? t : P({}, t, {
    ownerState: P({}, t.ownerState, r)
  });
}
const _f = {
  disableDefaultClasses: !1
}, If = /* @__PURE__ */ N.createContext(_f);
function Mf(e) {
  const {
    disableDefaultClasses: t
  } = N.useContext(If);
  return (r) => t ? "" : e(r);
}
function Ss(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function Af(e, t, r) {
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
function Df(e) {
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
  const i = Ss(P({}, o, n)), l = ei(n), c = ei(o), f = t(i), m = Ce(f == null ? void 0 : f.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = P({}, f == null ? void 0 : f.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = P({}, f, r, c, l);
  return m.length > 0 && (g.className = m), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: f.ref
  };
}
const jf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Bt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = he(e, jf), l = a ? {} : Af(n, o), {
    props: c,
    internalRef: f
  } = Df(P({}, i, {
    externalSlotProps: l
  })), m = We(f, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return wr(r, P({}, c, {
    ref: m
  }), o);
}
const Cs = "base";
function Bf(e) {
  return `${Cs}--${e}`;
}
function Lf(e, t) {
  return `${Cs}-${e}-${t}`;
}
function Os(e, t) {
  const r = gs[t];
  return r ? Bf(r) : Lf(e, t);
}
function Ff(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Os(e, n);
  }), r;
}
const Vf = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function zf(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Uf(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function Hf(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Uf(e));
}
function Gf(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(Vf)).forEach((n, o) => {
    const a = zf(n);
    a === -1 || !Hf(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function Wf() {
  return !0;
}
function un(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = Gf,
    isEnabled: i = Wf,
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
      let I = [];
      if ((w.activeElement === f.current || w.activeElement === m.current) && (I = a(h.current)), I.length > 0) {
        var D, F;
        const E = !!((D = b.current) != null && D.shiftKey && ((F = b.current) == null ? void 0 : F.key) === "Tab"), C = I[0], $ = I[I.length - 1];
        typeof C != "string" && typeof $ != "string" && (E ? $.focus() : C.focus());
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
process.env.NODE_ENV !== "production" && (un.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Br,
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
process.env.NODE_ENV !== "production" && (un["propTypes"] = os(un.propTypes));
function Xf(e) {
  return typeof e == "function" ? e() : e;
}
const Mr = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = N.useState(null), c = We(/* @__PURE__ */ N.isValidElement(n) ? n.ref : null, r);
  if (Dt(() => {
    a || l(Xf(o) || document.body);
  }, [o, a]), Dt(() => {
    if (i && !a)
      return cn(r, i), () => {
        cn(r, null);
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
    children: i && /* @__PURE__ */ Mc.createPortal(n, i)
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
process.env.NODE_ENV !== "production" && (Mr["propTypes"] = os(Mr.propTypes));
function Yf(e) {
  const t = Oe(e);
  return t.body === e ? Qt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Tr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function ti(e) {
  return parseInt(Qt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function qf(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function ri(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !qf(i);
    l && c && Tr(i, o);
  });
}
function Jn(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function Kf(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (Yf(n)) {
      const i = ps(Oe(n));
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
function Jf(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class Zf {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Tr(t.modalRef, !1);
    const o = Jf(r);
    ri(r, t.mount, t.modalRef, o, !0);
    const a = Jn(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = Jn(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = Kf(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = Jn(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
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
function Qf(e) {
  return typeof e == "function" ? e() : e;
}
function em(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const tm = new Zf();
function rm(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = tm,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: f,
    open: m,
    rootRef: v
  } = e, g = N.useRef({}), p = N.useRef(null), h = N.useRef(null), u = We(h, v), [b, x] = N.useState(!m), O = em(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const k = () => Oe(p.current), y = () => (g.current.modalRef = h.current, g.current.mount = p.current, g.current), T = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, S = _r(() => {
    const j = Qf(t) || k().body;
    o.add(y(), j), h.current && T();
  }), I = N.useCallback(() => o.isTopModal(y()), [o]), D = _r((j) => {
    p.current = j, j && (m && I() ? T() : h.current && Tr(h.current, w));
  }), F = N.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  N.useEffect(() => () => {
    F();
  }, [F]), N.useEffect(() => {
    m ? S() : (!O || !a) && F();
  }, [m, F, O, a, S]);
  const E = (j) => (B) => {
    var Z;
    (Z = j.onKeyDown) == null || Z.call(j, B), !(B.key !== "Escape" || B.which === 229 || // Wait until IME is settled.
    !I()) && (r || (B.stopPropagation(), f && f(B, "escapeKeyDown")));
  }, C = (j) => (B) => {
    var Z;
    (Z = j.onClick) == null || Z.call(j, B), B.target === B.currentTarget && f && f(B, "backdropClick");
  };
  return {
    getRootProps: (j = {}) => {
      const B = Ss(e);
      delete B.onTransitionEnter, delete B.onTransitionExited;
      const Z = P({}, B, j);
      return P({
        role: "presentation"
      }, Z, {
        onKeyDown: E(Z),
        ref: u
      });
    },
    getBackdropProps: (j = {}) => {
      const B = j;
      return P({
        "aria-hidden": !0
      }, B, {
        onClick: C(B),
        open: m
      });
    },
    getTransitionProps: () => {
      const j = () => {
        x(!1), i && i();
      }, B = () => {
        x(!0), l && l(), a && F();
      };
      return {
        onEnter: co(j, c == null ? void 0 : c.props.onEnter),
        onExited: co(B, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: u,
    portalRef: D,
    isTopModal: I,
    exited: b,
    hasTransition: O
  };
}
var Ie = "top", Xe = "bottom", Ye = "right", Me = "left", Ho = "auto", zr = [Ie, Xe, Ye, Me], er = "start", Ar = "end", nm = "clippingParents", Rs = "viewport", mr = "popper", om = "reference", ni = /* @__PURE__ */ zr.reduce(function(e, t) {
  return e.concat([t + "-" + er, t + "-" + Ar]);
}, []), Ps = /* @__PURE__ */ [].concat(zr, [Ho]).reduce(function(e, t) {
  return e.concat([t, t + "-" + er, t + "-" + Ar]);
}, []), am = "beforeRead", im = "read", sm = "afterRead", lm = "beforeMain", cm = "main", pm = "afterMain", dm = "beforeWrite", um = "write", fm = "afterWrite", mm = [am, im, sm, lm, cm, pm, dm, um, fm];
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
function hm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Ge(a) || !tt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function gm(e) {
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
const bm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: hm,
  effect: gm,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var It = Math.max, fn = Math.min, tr = Math.round;
function fo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function $s() {
  return !/^((?!chrome|android).)*safari/i.test(fo());
}
function rr(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && tr(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && tr(n.height) / e.offsetHeight || 1);
  var i = Lt(e) ? Ve(e) : window, l = i.visualViewport, c = !$s() && r, f = (n.left + (c && l ? l.offsetLeft : 0)) / o, m = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, g = n.height / a;
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
function _s(e, t) {
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
function vm(e) {
  return ["table", "td", "th"].indexOf(tt(e)) >= 0;
}
function Et(e) {
  return ((Lt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function In(e) {
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
function ym(e) {
  var t = /firefox/i.test(fo()), r = /Trident/i.test(fo());
  if (r && Ge(e)) {
    var n = pt(e);
    if (n.position === "fixed")
      return null;
  }
  var o = In(e);
  for (Go(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(tt(o)) < 0; ) {
    var a = pt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Ur(e) {
  for (var t = Ve(e), r = oi(e); r && vm(r) && pt(r).position === "static"; )
    r = oi(r);
  return r && (tt(r) === "html" || tt(r) === "body" && pt(r).position === "static") ? t : r || ym(e) || t;
}
function Xo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Sr(e, t, r) {
  return It(e, fn(t, r));
}
function wm(e, t, r) {
  var n = Sr(e, t, r);
  return n > r ? r : n;
}
function Is() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ms(e) {
  return Object.assign({}, Is(), e);
}
function As(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var xm = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Ms(typeof t != "number" ? t : As(t, zr));
};
function km(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = Ze(r.placement), c = Xo(l), f = [Me, Ye].indexOf(l) >= 0, m = f ? "height" : "width";
  if (!(!a || !i)) {
    var v = xm(o.padding, r), g = Wo(a), p = c === "y" ? Ie : Me, h = c === "y" ? Xe : Ye, u = r.rects.reference[m] + r.rects.reference[c] - i[c] - r.rects.popper[m], b = i[c] - r.rects.reference[c], x = Ur(a), O = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = u / 2 - b / 2, k = v[p], y = O - g[m] - v[h], T = O / 2 - g[m] / 2 + w, S = Sr(k, T, y), I = c;
    r.modifiersData[n] = (t = {}, t[I] = S, t.centerOffset = S - T, t);
  }
}
function Em(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || _s(t.elements.popper, o) && (t.elements.arrow = o));
}
const Nm = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: km,
  effect: Em,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function nr(e) {
  return e.split("-")[1];
}
var Tm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Sm(e, t) {
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
    var T = Ur(r), S = "clientHeight", I = "clientWidth";
    if (T === Ve(r) && (T = Et(r), pt(T).position !== "static" && l === "absolute" && (S = "scrollHeight", I = "scrollWidth")), T = T, o === Ie || (o === Me || o === Ye) && a === Ar) {
      k = Xe;
      var D = v && T === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        T[S]
      );
      u -= D - n.height, u *= c ? 1 : -1;
    }
    if (o === Me || (o === Ie || o === Xe) && a === Ar) {
      w = Ye;
      var F = v && T === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        T[I]
      );
      p -= F - n.width, p *= c ? 1 : -1;
    }
  }
  var E = Object.assign({
    position: l
  }, f && Tm), C = m === !0 ? Sm({
    x: p,
    y: u
  }, Ve(r)) : {
    x: p,
    y: u
  };
  if (p = C.x, u = C.y, c) {
    var $;
    return Object.assign({}, E, ($ = {}, $[k] = O ? "0" : "", $[w] = x ? "0" : "", $.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + u + "px)" : "translate3d(" + p + "px, " + u + "px, 0)", $));
  }
  return Object.assign({}, E, (t = {}, t[k] = O ? u + "px" : "", t[w] = x ? p + "px" : "", t.transform = "", t));
}
function Cm(e) {
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
const Om = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Cm,
  data: {}
};
var Jr = {
  passive: !0
};
function Rm(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = Ve(t.elements.popper), f = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && f.forEach(function(m) {
    m.addEventListener("scroll", r.update, Jr);
  }), l && c.addEventListener("resize", r.update, Jr), function() {
    a && f.forEach(function(m) {
      m.removeEventListener("scroll", r.update, Jr);
    }), l && c.removeEventListener("resize", r.update, Jr);
  };
}
const Pm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Rm,
  data: {}
};
var $m = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function rn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return $m[t];
  });
}
var _m = {
  start: "end",
  end: "start"
};
function ii(e) {
  return e.replace(/start|end/g, function(t) {
    return _m[t];
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
function Im(e, t) {
  var r = Ve(e), n = Et(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var f = $s();
    (f || !f && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + qo(e),
    y: c
  };
}
function Mm(e) {
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
function Ds(e) {
  return ["html", "body", "#document"].indexOf(tt(e)) >= 0 ? e.ownerDocument.body : Ge(e) && Ko(e) ? e : Ds(In(e));
}
function Cr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Ds(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Ve(n), i = o ? [a].concat(a.visualViewport || [], Ko(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Cr(In(i)))
  );
}
function mo(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Am(e, t) {
  var r = rr(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function si(e, t, r) {
  return t === Rs ? mo(Im(e, r)) : Lt(t) ? Am(t, r) : mo(Mm(Et(e)));
}
function Dm(e) {
  var t = Cr(In(e)), r = ["absolute", "fixed"].indexOf(pt(e).position) >= 0, n = r && Ge(e) ? Ur(e) : e;
  return Lt(n) ? t.filter(function(o) {
    return Lt(o) && _s(o, n) && tt(o) !== "body";
  }) : [];
}
function jm(e, t, r, n) {
  var o = t === "clippingParents" ? Dm(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, f) {
    var m = si(e, f, n);
    return c.top = It(m.top, c.top), c.right = fn(m.right, c.right), c.bottom = fn(m.bottom, c.bottom), c.left = It(m.left, c.left), c;
  }, si(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function js(e) {
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
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? nm : l, f = r.rootBoundary, m = f === void 0 ? Rs : f, v = r.elementContext, g = v === void 0 ? mr : v, p = r.altBoundary, h = p === void 0 ? !1 : p, u = r.padding, b = u === void 0 ? 0 : u, x = Ms(typeof b != "number" ? b : As(b, zr)), O = g === mr ? om : mr, w = e.rects.popper, k = e.elements[h ? O : g], y = jm(Lt(k) ? k : k.contextElement || Et(e.elements.popper), c, m, i), T = rr(e.elements.reference), S = js({
    reference: T,
    element: w,
    strategy: "absolute",
    placement: o
  }), I = mo(Object.assign({}, w, S)), D = g === mr ? I : T, F = {
    top: y.top - D.top + x.top,
    bottom: D.bottom - y.bottom + x.bottom,
    left: y.left - D.left + x.left,
    right: D.right - y.right + x.right
  }, E = e.modifiersData.offset;
  if (g === mr && E) {
    var C = E[o];
    Object.keys(F).forEach(function($) {
      var z = [Ye, Xe].indexOf($) >= 0 ? 1 : -1, U = [Ie, Xe].indexOf($) >= 0 ? "y" : "x";
      F[$] += C[U] * z;
    });
  }
  return F;
}
function Bm(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, f = c === void 0 ? Ps : c, m = nr(n), v = m ? l ? ni : ni.filter(function(h) {
    return nr(h) === m;
  }) : zr, g = v.filter(function(h) {
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
function Lm(e) {
  if (Ze(e) === Ho)
    return [];
  var t = rn(e);
  return [ii(e), t, ii(t)];
}
function Fm(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, f = r.padding, m = r.boundary, v = r.rootBoundary, g = r.altBoundary, p = r.flipVariations, h = p === void 0 ? !0 : p, u = r.allowedAutoPlacements, b = t.options.placement, x = Ze(b), O = x === b, w = c || (O || !h ? [rn(b)] : Lm(b)), k = [b].concat(w).reduce(function(G, X) {
      return G.concat(Ze(X) === Ho ? Bm(t, {
        placement: X,
        boundary: m,
        rootBoundary: v,
        padding: f,
        flipVariations: h,
        allowedAutoPlacements: u
      }) : X);
    }, []), y = t.rects.reference, T = t.rects.popper, S = /* @__PURE__ */ new Map(), I = !0, D = k[0], F = 0; F < k.length; F++) {
      var E = k[F], C = Ze(E), $ = nr(E) === er, z = [Ie, Xe].indexOf(C) >= 0, U = z ? "width" : "height", j = Dr(t, {
        placement: E,
        boundary: m,
        rootBoundary: v,
        altBoundary: g,
        padding: f
      }), B = z ? $ ? Ye : Me : $ ? Xe : Ie;
      y[U] > T[U] && (B = rn(B));
      var Z = rn(B), Q = [];
      if (a && Q.push(j[C] <= 0), l && Q.push(j[B] <= 0, j[Z] <= 0), Q.every(function(G) {
        return G;
      })) {
        D = E, I = !1;
        break;
      }
      S.set(E, Q);
    }
    if (I)
      for (var R = h ? 3 : 1, M = function(X) {
        var q = k.find(function(K) {
          var Y = S.get(K);
          if (Y)
            return Y.slice(0, X).every(function(ee) {
              return ee;
            });
        });
        if (q)
          return D = q, "break";
      }, H = R; H > 0; H--) {
        var J = M(H);
        if (J === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[n]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const Vm = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Fm,
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
function zm(e) {
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
const Um = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: zm
};
function Hm(e, t, r) {
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
function Gm(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = Ps.reduce(function(m, v) {
    return m[v] = Hm(v, t.rects, a), m;
  }, {}), l = i[t.placement], c = l.x, f = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += f), t.modifiersData[n] = i;
}
const Wm = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Gm
};
function Xm(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = js({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Ym = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Xm,
  data: {}
};
function qm(e) {
  return e === "x" ? "y" : "x";
}
function Km(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, f = r.rootBoundary, m = r.altBoundary, v = r.padding, g = r.tether, p = g === void 0 ? !0 : g, h = r.tetherOffset, u = h === void 0 ? 0 : h, b = Dr(t, {
    boundary: c,
    rootBoundary: f,
    padding: v,
    altBoundary: m
  }), x = Ze(t.placement), O = nr(t.placement), w = !O, k = Xo(x), y = qm(k), T = t.modifiersData.popperOffsets, S = t.rects.reference, I = t.rects.popper, D = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, F = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), E = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, C = {
    x: 0,
    y: 0
  };
  if (T) {
    if (a) {
      var $, z = k === "y" ? Ie : Me, U = k === "y" ? Xe : Ye, j = k === "y" ? "height" : "width", B = T[k], Z = B + b[z], Q = B - b[U], R = p ? -I[j] / 2 : 0, M = O === er ? S[j] : I[j], H = O === er ? -I[j] : -S[j], J = t.elements.arrow, G = p && J ? Wo(J) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Is(), q = X[z], K = X[U], Y = Sr(0, S[j], G[j]), ee = w ? S[j] / 2 - R - Y - q - F.mainAxis : M - Y - q - F.mainAxis, te = w ? -S[j] / 2 + R + Y + K + F.mainAxis : H + Y + K + F.mainAxis, ie = t.elements.arrow && Ur(t.elements.arrow), L = ie ? k === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, re = ($ = E == null ? void 0 : E[k]) != null ? $ : 0, A = B + ee - re - L, se = B + te - re, Ne = Sr(p ? fn(Z, A) : Z, B, p ? It(Q, se) : Q);
      T[k] = Ne, C[k] = Ne - B;
    }
    if (l) {
      var Pe, ke = k === "x" ? Ie : Me, Nt = k === "x" ? Xe : Ye, $e = T[y], nt = y === "y" ? "height" : "width", je = $e + b[ke], ot = $e - b[Nt], Te = [Ie, Me].indexOf(x) !== -1, Ft = (Pe = E == null ? void 0 : E[y]) != null ? Pe : 0, Tt = Te ? je : $e - S[nt] - I[nt] - Ft + F.altAxis, ir = Te ? $e + S[nt] + I[nt] - Ft - F.altAxis : ot, Gr = p && Te ? wm(Tt, $e, ir) : Sr(p ? Tt : je, $e, p ? ir : ot);
      T[y] = Gr, C[y] = Gr - $e;
    }
    t.modifiersData[n] = C;
  }
}
const Jm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Km,
  requiresIfExists: ["offset"]
};
function Zm(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Qm(e) {
  return e === Ve(e) || !Ge(e) ? Yo(e) : Zm(e);
}
function eh(e) {
  var t = e.getBoundingClientRect(), r = tr(t.width) / e.offsetWidth || 1, n = tr(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function th(e, t, r) {
  r === void 0 && (r = !1);
  var n = Ge(t), o = Ge(t) && eh(t), a = Et(t), i = rr(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((tt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Ko(a)) && (l = Qm(t)), Ge(t) ? (c = rr(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = qo(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function rh(e) {
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
function nh(e) {
  var t = rh(e);
  return mm.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function oh(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function ah(e) {
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
function ih(e) {
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
        var w = nh(ah([].concat(n, m.options.modifiers)));
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
              reference: th(O, Ur(w), m.options.strategy === "fixed"),
              popper: Wo(w)
            }, m.reset = !1, m.placement = m.options.placement, m.orderedModifiers.forEach(function(F) {
              return m.modifiersData[F.name] = Object.assign({}, F.data);
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
                instance: p
              }) || m);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: oh(function() {
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
var sh = [Pm, Ym, Om, bm, Wm, Vm, Jm, Nm, Um], lh = /* @__PURE__ */ ih({
  defaultModifiers: sh
});
const Bs = "Popper";
function ch(e) {
  return Os(Bs, e);
}
Ff(Bs, ["root"]);
const ph = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], dh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function uh(e, t) {
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
function mn(e) {
  return typeof e == "function" ? e() : e;
}
function Mn(e) {
  return e.nodeType !== void 0;
}
function fh(e) {
  return !Mn(e);
}
const mh = () => dt({
  root: ["root"]
}, Mf(ch)), hh = {}, gh = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
  } = t, b = he(t, ph), x = N.useRef(null), O = We(x, r), w = N.useRef(null), k = We(w, g), y = N.useRef(k);
  Dt(() => {
    y.current = k;
  }, [k]), N.useImperativeHandle(g, () => w.current, []);
  const T = uh(m, i), [S, I] = N.useState(T), [D, F] = N.useState(mn(o));
  N.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), N.useEffect(() => {
    o && F(mn(o));
  }, [o]), Dt(() => {
    if (!D || !f)
      return;
    const U = (Z) => {
      I(Z.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && Mn(D) && D.nodeType === 1) {
      const Z = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Z.top === 0 && Z.left === 0 && Z.right === 0 && Z.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: Z
      }) => {
        U(Z);
      }
    }];
    c != null && (j = j.concat(c)), v && v.modifiers != null && (j = j.concat(v.modifiers));
    const B = lh(D, x.current, P({
      placement: T
    }, v, {
      modifiers: j
    }));
    return y.current(B), () => {
      B.destroy(), y.current(null);
    };
  }, [D, l, c, f, v, T]);
  const E = {
    placement: S
  };
  u !== null && (E.TransitionProps = u);
  const C = mh(), $ = (n = h.root) != null ? n : "div", z = Bt({
    elementType: $,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: O
    },
    ownerState: t,
    className: C.root
  });
  return /* @__PURE__ */ d($, P({}, z, {
    children: typeof a == "function" ? a(E) : a
  }));
}), Ls = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    popperOptions: g = hh,
    popperRef: p,
    style: h,
    transition: u = !1,
    slotProps: b = {},
    slots: x = {}
  } = t, O = he(t, dh), [w, k] = N.useState(!0), y = () => {
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
    const F = mn(n);
    S = F && Mn(F) ? Oe(F).body : Oe(null).body;
  }
  const I = !m && c && (!u || w) ? "none" : void 0, D = u ? {
    in: m,
    onEnter: y,
    onExited: T
  } : void 0;
  return /* @__PURE__ */ d(Mr, {
    disablePortal: l,
    container: S,
    children: /* @__PURE__ */ d(gh, P({
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
        display: I
      }, h),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ls.propTypes = {
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
      const t = mn(e.anchorEl);
      if (t && Mn(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || fh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
function Hr() {
  const e = xs(Vo);
  return process.env.NODE_ENV !== "production" && N.useDebugValue(e), e[zo] || e;
}
function ho(e, t) {
  return ho = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, ho(e, t);
}
function bh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, ho(e, t);
}
const ui = {
  disabled: !1
};
var vh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Fs = W.createContext(null);
var yh = function(t) {
  return t.scrollTop;
}, xr = "unmounted", Ct = "exited", Ot = "entering", qt = "entered", go = "exiting", ft = /* @__PURE__ */ function(e) {
  bh(t, e);
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
      this.props.in ? i !== Ot && i !== qt && (a = Ot) : (i === Ot || i === qt) && (a = go);
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
          var i = this.props.nodeRef ? this.props.nodeRef.current : Yr.findDOMNode(this);
          i && yh(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ct && this.setState({
        status: xr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Yr.findDOMNode(this), l], f = c[0], m = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
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
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Yr.findDOMNode(this);
    if (!a || ui.disabled) {
      this.safeSetState({
        status: Ct
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: go
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Yr.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
      /* @__PURE__ */ W.createElement(Fs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : W.cloneElement(W.Children.only(i), l))
    );
  }, t;
}(W.Component);
ft.contextType = Fs;
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
    var r = vh;
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
ft.EXITING = go;
const Vs = ft, zs = (e) => e.scrollTop;
function hn(e, t) {
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
const wh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function bo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const xh = {
  entering: {
    opacity: 1,
    transform: bo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Zn = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Jo = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    TransitionComponent: b = Vs
  } = t, x = he(t, wh), O = yr(), w = N.useRef(), k = Hr(), y = N.useRef(null), T = We(y, a.ref, r), S = (U) => (j) => {
    if (U) {
      const B = y.current;
      j === void 0 ? U(B) : U(B, j);
    }
  }, I = S(m), D = S((U, j) => {
    zs(U);
    const {
      duration: B,
      delay: Z,
      easing: Q
    } = hn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "enter"
    });
    let R;
    u === "auto" ? (R = k.transitions.getAutoHeightDuration(U.clientHeight), w.current = R) : R = B, U.style.transition = [k.transitions.create("opacity", {
      duration: R,
      delay: Z
    }), k.transitions.create("transform", {
      duration: Zn ? R : R * 0.666,
      delay: Z,
      easing: Q
    })].join(","), c && c(U, j);
  }), F = S(f), E = S(p), C = S((U) => {
    const {
      duration: j,
      delay: B,
      easing: Z
    } = hn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "exit"
    });
    let Q;
    u === "auto" ? (Q = k.transitions.getAutoHeightDuration(U.clientHeight), w.current = Q) : Q = j, U.style.transition = [k.transitions.create("opacity", {
      duration: Q,
      delay: B
    }), k.transitions.create("transform", {
      duration: Zn ? Q : Q * 0.666,
      delay: Zn ? B : B || Q * 0.333,
      easing: Z
    })].join(","), U.style.opacity = 0, U.style.transform = bo(0.75), v && v(U);
  }), $ = S(g);
  return /* @__PURE__ */ d(b, P({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: F,
    onEntering: I,
    onExit: C,
    onExited: $,
    onExiting: E,
    addEndListener: (U) => {
      u === "auto" && O.start(w.current || 0, U), n && n(y.current, U);
    },
    timeout: u === "auto" ? null : u
  }, x, {
    children: (U, j) => /* @__PURE__ */ N.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: bo(0.75),
        visibility: U === "exited" && !l ? "hidden" : void 0
      }, xh[U], h, a.props.style),
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
  children: Br.isRequired,
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
const vo = Jo, kh = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, fi = kh, Eh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], Nh = Re(Ls, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Us = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n;
  const o = ws(), a = ut({
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
  } = a, y = he(a, Eh), T = (n = w == null ? void 0 : w.root) != null ? n : c == null ? void 0 : c.Root, S = P({
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
  return /* @__PURE__ */ d(Nh, P({
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
process.env.NODE_ENV !== "production" && (Us.propTypes = {
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
const Hs = Us;
function Th(e) {
  return rt("MuiTooltip", e);
}
const Sh = xt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), vt = Sh, Ch = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function Oh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Rh = (e) => {
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
  return dt(i, Th, t);
}, Ph = Re(Hs, {
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
})), $h = Re("div", {
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
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : dn(e.palette.grey[700], 0.92),
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
  lineHeight: `${Oh(16 / 14)}em`,
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
})), _h = Re("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : dn(e.palette.grey[700], 0.9),
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
let Zr = !1;
const mi = new Lr();
let hr = {
  x: 0,
  y: 0
};
function Qr(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const Gs = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c, f, m, v, g, p, h, u, b, x, O, w, k, y;
  const T = ut({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: S = !1,
    children: I,
    components: D = {},
    componentsProps: F = {},
    describeChild: E = !1,
    disableFocusListener: C = !1,
    disableHoverListener: $ = !1,
    disableInteractive: z = !1,
    disableTouchListener: U = !1,
    enterDelay: j = 100,
    enterNextDelay: B = 0,
    enterTouchDelay: Z = 700,
    followCursor: Q = !1,
    id: R,
    leaveDelay: M = 0,
    leaveTouchDelay: H = 1500,
    onClose: J,
    onOpen: G,
    open: X,
    placement: q = "bottom",
    PopperComponent: K,
    PopperProps: Y = {},
    slotProps: ee = {},
    slots: te = {},
    title: ie,
    TransitionComponent: L = vo,
    TransitionProps: re
  } = T, A = he(T, Ch), se = /* @__PURE__ */ N.isValidElement(I) ? I : /* @__PURE__ */ d("span", {
    children: I
  }), Ne = Hr(), Pe = Ne.direction === "rtl", [ke, Nt] = N.useState(), [$e, nt] = N.useState(null), je = N.useRef(!1), ot = z || Q, Te = yr(), Ft = yr(), Tt = yr(), ir = yr(), [Gr, ta] = ls({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let at = Gr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = N.useRef(X !== void 0);
    N.useEffect(() => {
      ke && ke.disabled && !ne && ie !== "" && ke.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, ke, ne]);
  }
  const An = ss(R), sr = N.useRef(), Wr = _r(() => {
    sr.current !== void 0 && (document.body.style.WebkitUserSelect = sr.current, sr.current = void 0), ir.clear();
  });
  N.useEffect(() => Wr, [Wr]);
  const ra = (ne) => {
    mi.clear(), Zr = !0, ta(!0), G && !at && G(ne);
  }, Xr = _r(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      mi.start(800 + M, () => {
        Zr = !1;
      }), ta(!1), J && at && J(ne), Te.start(Ne.transitions.duration.shortest, () => {
        je.current = !1;
      });
    }
  ), Dn = (ne) => {
    je.current && ne.type !== "touchstart" || (ke && ke.removeAttribute("title"), Ft.clear(), Tt.clear(), j || Zr && B ? Ft.start(Zr ? B : j, () => {
      ra(ne);
    }) : ra(ne));
  }, na = (ne) => {
    Ft.clear(), Tt.start(M, () => {
      Xr(ne);
    });
  }, {
    isFocusVisibleRef: oa,
    onBlur: Sl,
    onFocus: Cl,
    ref: Ol
  } = cs(), [, aa] = N.useState(!1), ia = (ne) => {
    Sl(ne), oa.current === !1 && (aa(!1), na(ne));
  }, sa = (ne) => {
    ke || Nt(ne.currentTarget), Cl(ne), oa.current === !0 && (aa(!0), Dn(ne));
  }, la = (ne) => {
    je.current = !0;
    const Be = se.props;
    Be.onTouchStart && Be.onTouchStart(ne);
  }, ca = Dn, pa = na, Rl = (ne) => {
    la(ne), Tt.clear(), Te.clear(), Wr(), sr.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", ir.start(Z, () => {
      document.body.style.WebkitUserSelect = sr.current, Dn(ne);
    });
  }, Pl = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Wr(), Tt.start(H, () => {
      Xr(ne);
    });
  };
  N.useEffect(() => {
    if (!at)
      return;
    function ne(Be) {
      (Be.key === "Escape" || Be.key === "Esc") && Xr(Be);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Xr, at]);
  const $l = We(se.ref, Ol, Nt, r);
  !ie && ie !== 0 && (at = !1);
  const jn = N.useRef(), _l = (ne) => {
    const Be = se.props;
    Be.onMouseMove && Be.onMouseMove(ne), hr = {
      x: ne.clientX,
      y: ne.clientY
    }, jn.current && jn.current.update();
  }, lr = {}, Bn = typeof ie == "string";
  E ? (lr.title = !at && Bn && !$ ? ie : null, lr["aria-describedby"] = at ? An : null) : (lr["aria-label"] = Bn ? ie : null, lr["aria-labelledby"] = at && !Bn ? An : null);
  const ze = P({}, lr, A, se.props, {
    className: Ce(A.className, se.props.className),
    onTouchStart: la,
    ref: $l
  }, Q ? {
    onMouseMove: _l
  } : {});
  process.env.NODE_ENV !== "production" && (ze["data-mui-internal-clone-element"] = !0, N.useEffect(() => {
    ke && !ke.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [ke]));
  const cr = {};
  U || (ze.onTouchStart = Rl, ze.onTouchEnd = Pl), $ || (ze.onMouseOver = Qr(ca, ze.onMouseOver), ze.onMouseLeave = Qr(pa, ze.onMouseLeave), ot || (cr.onMouseOver = ca, cr.onMouseLeave = pa)), C || (ze.onFocus = Qr(sa, ze.onFocus), ze.onBlur = Qr(ia, ze.onBlur), ot || (cr.onFocus = sa, cr.onBlur = ia)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const Il = N.useMemo(() => {
    var ne;
    let Be = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (ne = Y.popperOptions) != null && ne.modifiers && (Be = Be.concat(Y.popperOptions.modifiers)), P({}, Y.popperOptions, {
      modifiers: Be
    });
  }, [$e, Y]), pr = P({}, T, {
    isRtl: Pe,
    arrow: S,
    disableInteractive: ot,
    placement: q,
    PopperComponentProp: K,
    touch: je.current
  }), Ln = Rh(pr), da = (n = (o = te.popper) != null ? o : D.Popper) != null ? n : Ph, ua = (a = (i = (l = te.transition) != null ? l : D.Transition) != null ? i : L) != null ? a : vo, fa = (c = (f = te.tooltip) != null ? f : D.Tooltip) != null ? c : $h, ma = (m = (v = te.arrow) != null ? v : D.Arrow) != null ? m : _h, Ml = wr(da, P({}, Y, (g = ee.popper) != null ? g : F.popper, {
    className: Ce(Ln.popper, Y == null ? void 0 : Y.className, (p = (h = ee.popper) != null ? h : F.popper) == null ? void 0 : p.className)
  }), pr), Al = wr(ua, P({}, re, (u = ee.transition) != null ? u : F.transition), pr), Dl = wr(fa, P({}, (b = ee.tooltip) != null ? b : F.tooltip, {
    className: Ce(Ln.tooltip, (x = (O = ee.tooltip) != null ? O : F.tooltip) == null ? void 0 : x.className)
  }), pr), jl = wr(ma, P({}, (w = ee.arrow) != null ? w : F.arrow, {
    className: Ce(Ln.arrow, (k = (y = ee.arrow) != null ? y : F.arrow) == null ? void 0 : k.className)
  }), pr);
  return /* @__PURE__ */ _(N.Fragment, {
    children: [/* @__PURE__ */ N.cloneElement(se, ze), /* @__PURE__ */ d(da, P({
      as: K ?? Hs,
      placement: q,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: hr.y,
          left: hr.x,
          right: hr.x,
          bottom: hr.y,
          width: 0,
          height: 0
        })
      } : ke,
      popperRef: jn,
      open: ke ? at : !1,
      id: An,
      transition: !0
    }, cr, Ml, {
      popperOptions: Il,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ d(ua, P({
        timeout: Ne.transitions.duration.shorter
      }, ne, Al, {
        children: /* @__PURE__ */ _(fa, P({}, Dl, {
          children: [ie, S ? /* @__PURE__ */ d(ma, P({}, jl, {
            ref: nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Gs.propTypes = {
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
  children: Br.isRequired,
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
const Ih = Gs;
function hi(e, t, r) {
  return e ? /* @__PURE__ */ d(Pi, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ d("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Ws(e) {
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
    xc,
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
        /* @__PURE__ */ d(kc, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ d(Pi, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ d(Ns, {}) }) : hi(i, r, !1)
      ] }) : b
    }
  );
  return n ? /* @__PURE__ */ d(Ih, { title: n, placement: "right", children: /* @__PURE__ */ d("div", { children: x }) }) : x;
}
function Xs(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function Mh(e) {
  const [t, r] = ce(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (f) => {
    r(f.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let f = Xs(a).filter((m) => "menuItem" in m.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return f = f.filter(
      (m) => "menuItem" in m.group && m.group.menuItem === n.id
    ), /* @__PURE__ */ d(Zo, { ...e, includedGroups: f });
  };
  return /* @__PURE__ */ _(wt, { children: [
    /* @__PURE__ */ d(Ws, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ d(
      Ec,
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
const Ah = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Zo(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = Mt(() => {
    const m = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Xs(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(m).sort(
      (h, u) => (h.group.order || 0) - (u.group.order || 0)
    ), g = [];
    v.forEach((h) => {
      Ah(h.id, t.items).forEach(
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
        Ws,
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
      Mh,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      f + g.id
    );
  }) }, f);
}
function Dh(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ d(Zo, { ...e, includedGroups: a });
}
function jh({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ _(
    $i,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ d("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ d(Nc, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ d(
          Dh,
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
function Bh({
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
    $i,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, l) => /* @__PURE__ */ d(
        jh,
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
const Ys = /* @__PURE__ */ N.createContext({});
process.env.NODE_ENV !== "production" && (Ys.displayName = "ListContext");
const Lh = Ys;
function Fh(e) {
  return rt("MuiList", e);
}
xt("MuiList", ["root", "padding", "dense", "subheader"]);
const Vh = ["children", "className", "component", "dense", "disablePadding", "subheader"], zh = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return dt({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, Fh, t);
}, Uh = Re("ul", {
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
})), qs = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
  } = n, m = he(n, Vh), v = N.useMemo(() => ({
    dense: l
  }), [l]), g = P({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = zh(g);
  return /* @__PURE__ */ d(Lh.Provider, {
    value: v,
    children: /* @__PURE__ */ _(Uh, P({
      as: i,
      className: Ce(p.root, a),
      ref: r,
      ownerState: g
    }, m, {
      children: [f, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
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
const Hh = qs, Gh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Qn(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function gi(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function Ks(e, t) {
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
    if (!l.hasAttribute("tabindex") || !Ks(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Js = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
  } = t, g = he(t, Gh), p = N.useRef(null), h = N.useRef({
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
        const T = `${ps(Oe(w))}px`;
        p.current.style[k.direction === "rtl" ? "paddingLeft" : "paddingRight"] = T, p.current.style.width = `calc(100% + ${T})`;
      }
      return p.current;
    }
  }), []);
  const u = (w) => {
    const k = p.current, y = w.key, T = Oe(k).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), gr(k, T, f, c, Qn);
    else if (y === "ArrowUp")
      w.preventDefault(), gr(k, T, f, c, gi);
    else if (y === "Home")
      w.preventDefault(), gr(k, null, f, c, Qn);
    else if (y === "End")
      w.preventDefault(), gr(k, null, f, c, gi);
    else if (y.length === 1) {
      const S = h.current, I = y.toLowerCase(), D = performance.now();
      S.keys.length > 0 && (D - S.lastTime > 500 ? (S.keys = [], S.repeating = !0, S.previousKeyMatched = !0) : S.repeating && I !== S.keys[0] && (S.repeating = !1)), S.lastTime = D, S.keys.push(I);
      const F = T && !S.repeating && Ks(T, S);
      S.previousKeyMatched && (F || gr(k, T, !1, c, Qn, S)) ? w.preventDefault() : S.previousKeyMatched = !1;
    }
    m && m(w);
  }, b = We(p, r);
  let x = -1;
  N.Children.forEach(i, (w, k) => {
    if (!/* @__PURE__ */ N.isValidElement(w)) {
      x === k && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && ln.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (v === "selectedMenu" && w.props.selected || x === -1) && (x = k), x === k && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const O = N.Children.map(i, (w, k) => {
    if (k === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ N.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ d(Hh, P({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: u,
    tabIndex: o ? 0 : -1
  }, g, {
    children: O
  }));
});
process.env.NODE_ENV !== "production" && (Js.propTypes = {
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
const Wh = Js, Xh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Yh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Zs = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = Hr(), o = {
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
    TransitionComponent: O = Vs
  } = t, w = he(t, Xh), k = N.useRef(null), y = We(k, l.ref, r), T = (z) => (U) => {
    if (z) {
      const j = k.current;
      U === void 0 ? z(j) : z(j, U);
    }
  }, S = T(g), I = T((z, U) => {
    zs(z);
    const j = hn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", j), z.style.transition = n.transitions.create("opacity", j), m && m(z, U);
  }), D = T(v), F = T(u), E = T((z) => {
    const U = hn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", U), z.style.transition = n.transitions.create("opacity", U), p && p(z);
  }), C = T(h);
  return /* @__PURE__ */ d(O, P({
    appear: i,
    in: f,
    nodeRef: k,
    onEnter: I,
    onEntered: D,
    onEntering: S,
    onExit: E,
    onExited: C,
    onExiting: F,
    addEndListener: (z) => {
      a && a(k.current, z);
    },
    timeout: x
  }, w, {
    children: (z, U) => /* @__PURE__ */ N.cloneElement(l, P({
      style: P({
        opacity: 0,
        visibility: z === "exited" && !f ? "hidden" : void 0
      }, Yh[z], b, l.props.style),
      ref: y
    }, U))
  }));
});
process.env.NODE_ENV !== "production" && (Zs.propTypes = {
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
  children: Br.isRequired,
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
const qh = Zs;
function Kh(e) {
  return rt("MuiBackdrop", e);
}
xt("MuiBackdrop", ["root", "invisible"]);
const Jh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Zh = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return dt({
    root: ["root", r && "invisible"]
  }, Kh, t);
}, Qh = Re("div", {
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
})), Qs = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    TransitionComponent: b = qh,
    transitionDuration: x
  } = i, O = he(i, Jh), w = P({}, i, {
    component: f,
    invisible: g
  }), k = Zh(w), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ d(b, P({
    in: p,
    timeout: x
  }, O, {
    children: /* @__PURE__ */ d(Qh, P({
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
process.env.NODE_ENV !== "production" && (Qs.propTypes = {
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
const eg = Qs;
function tg(e) {
  return rt("MuiModal", e);
}
xt("MuiModal", ["root", "hidden", "backdrop"]);
const rg = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], ng = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return dt({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, tg, n);
}, og = Re("div", {
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
})), ag = Re(eg, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), el = /* @__PURE__ */ N.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const f = ut({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: m = ag,
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
    disableScrollLock: I = !1,
    hideBackdrop: D = !1,
    keepMounted: F = !1,
    onBackdropClick: E,
    open: C,
    slotProps: $,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = f, U = he(f, rg), j = P({}, f, {
    closeAfterTransition: p,
    disableAutoFocus: w,
    disableEnforceFocus: k,
    disableEscapeKeyDown: y,
    disablePortal: T,
    disableRestoreFocus: S,
    disableScrollLock: I,
    hideBackdrop: D,
    keepMounted: F
  }), {
    getRootProps: B,
    getBackdropProps: Z,
    getTransitionProps: Q,
    portalRef: R,
    isTopModal: M,
    exited: H,
    hasTransition: J
  } = rm(P({}, j, {
    rootRef: r
  })), G = P({}, j, {
    exited: H
  }), X = ng(G), q = {};
  if (h.props.tabIndex === void 0 && (q.tabIndex = "-1"), J) {
    const {
      onEnter: re,
      onExited: A
    } = Q();
    q.onEnter = re, q.onExited = A;
  }
  const K = (n = (o = z == null ? void 0 : z.root) != null ? o : x.Root) != null ? n : og, Y = (a = (i = z == null ? void 0 : z.backdrop) != null ? i : x.Backdrop) != null ? a : m, ee = (l = $ == null ? void 0 : $.root) != null ? l : O.root, te = (c = $ == null ? void 0 : $.backdrop) != null ? c : O.backdrop, ie = Bt({
    elementType: K,
    externalSlotProps: ee,
    externalForwardedProps: U,
    getSlotProps: B,
    additionalProps: {
      ref: r,
      as: b
    },
    ownerState: G,
    className: Ce(g, ee == null ? void 0 : ee.className, X == null ? void 0 : X.root, !G.open && G.exited && (X == null ? void 0 : X.hidden))
  }), L = Bt({
    elementType: Y,
    externalSlotProps: te,
    additionalProps: v,
    getSlotProps: (re) => Z(P({}, re, {
      onClick: (A) => {
        E && E(A), re != null && re.onClick && re.onClick(A);
      }
    })),
    className: Ce(te == null ? void 0 : te.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: G
  });
  return !F && !C && (!J || H) ? null : /* @__PURE__ */ d(Mr, {
    ref: R,
    container: u,
    disablePortal: T,
    children: /* @__PURE__ */ _(K, P({}, ie, {
      children: [!D && m ? /* @__PURE__ */ d(Y, P({}, L)) : null, /* @__PURE__ */ d(un, {
        disableEnforceFocus: k,
        disableAutoFocus: w,
        disableRestoreFocus: S,
        isEnabled: M,
        open: C,
        children: /* @__PURE__ */ N.cloneElement(h, q)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (el.propTypes = {
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
  children: Br.isRequired,
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
const ig = el;
function sg(e) {
  return rt("MuiPaper", e);
}
xt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const lg = ["className", "component", "elevation", "square", "variant"], cg = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return dt(a, sg, o);
}, pg = Re("div", {
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
    backgroundImage: `linear-gradient(${dn("#fff", fi(t.elevation))}, ${dn("#fff", fi(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), tl = /* @__PURE__ */ N.forwardRef(function(t, r) {
  const n = ut({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, f = he(n, lg), m = P({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = cg(m);
  return process.env.NODE_ENV !== "production" && Hr().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ d(pg, P({
    as: a,
    ownerState: m,
    className: Ce(v.root, o),
    ref: r
  }, f));
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
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: ar(fs, (e) => {
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
const dg = tl;
function ug(e) {
  return rt("MuiPopover", e);
}
xt("MuiPopover", ["root", "paper"]);
const fg = ["onEntering"], mg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], hg = ["slotProps"];
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
function nn(e) {
  return typeof e == "function" ? e() : e;
}
const gg = (e) => {
  const {
    classes: t
  } = e;
  return dt({
    root: ["root"],
    paper: ["paper"]
  }, ug, t);
}, bg = Re(ig, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), rl = Re(dg, {
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
}), nl = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
    TransitionComponent: T = vo,
    transitionDuration: S = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: D = !1
  } = i, F = he(i.TransitionProps, fg), E = he(i, mg), C = (n = k == null ? void 0 : k.paper) != null ? n : O, $ = N.useRef(), z = We($, C.ref), U = P({}, i, {
    anchorOrigin: f,
    anchorReference: v,
    elevation: u,
    marginThreshold: b,
    externalPaperSlotProps: C,
    transformOrigin: y,
    TransitionComponent: T,
    transitionDuration: S,
    TransitionProps: F
  }), j = gg(U), B = N.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (m || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), m;
    const re = nn(c), A = re && re.nodeType === 1 ? re : Oe($.current).body, se = A.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Ne = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Ne.top === 0 && Ne.left === 0 && Ne.right === 0 && Ne.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + bi(se, f.vertical),
      left: se.left + vi(se, f.horizontal)
    };
  }, [c, f.horizontal, f.vertical, m, v]), Z = N.useCallback((re) => ({
    vertical: bi(re, y.vertical),
    horizontal: vi(re, y.horizontal)
  }), [y.horizontal, y.vertical]), Q = N.useCallback((re) => {
    const A = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, se = Z(A);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: yi(se)
      };
    const Ne = B();
    let Pe = Ne.top - se.vertical, ke = Ne.left - se.horizontal;
    const Nt = Pe + A.height, $e = ke + A.width, nt = Qt(nn(c)), je = nt.innerHeight - b, ot = nt.innerWidth - b;
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
  }, [c, v, B, Z, b]), [R, M] = N.useState(x), H = N.useCallback(() => {
    const re = $.current;
    if (!re)
      return;
    const A = Q(re);
    A.top !== null && (re.style.top = A.top), A.left !== null && (re.style.left = A.left), re.style.transformOrigin = A.transformOrigin, M(!0);
  }, [Q]);
  N.useEffect(() => (D && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [c, D, H]);
  const J = (re, A) => {
    I && I(re, A), H();
  }, G = () => {
    M(!1);
  };
  N.useEffect(() => {
    x && H();
  }), N.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      H();
    }
  } : null, [x, H]), N.useEffect(() => {
    if (!x)
      return;
    const re = is(() => {
      H();
    }), A = Qt(c);
    return A.addEventListener("resize", re), () => {
      re.clear(), A.removeEventListener("resize", re);
    };
  }, [c, x, H]);
  let X = S;
  S === "auto" && !T.muiSupportAuto && (X = void 0);
  const q = h || (c ? Oe(nn(c)).body : void 0), K = (o = w == null ? void 0 : w.root) != null ? o : bg, Y = (a = w == null ? void 0 : w.paper) != null ? a : rl, ee = Bt({
    elementType: Y,
    externalSlotProps: P({}, C, {
      style: R ? C.style : P({}, C.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: u,
      ref: z
    },
    ownerState: U,
    className: Ce(j.paper, C == null ? void 0 : C.className)
  }), te = Bt({
    elementType: K,
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
    ownerState: U,
    className: Ce(j.root, p)
  }), {
    slotProps: ie
  } = te, L = he(te, hg);
  return /* @__PURE__ */ d(K, P({}, L, !Ts(K) && {
    slotProps: ie,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ d(T, P({
      appear: !0,
      in: x,
      onEntering: J,
      onExited: G,
      timeout: X
    }, F, {
      children: /* @__PURE__ */ d(Y, P({}, ee, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (nl.propTypes = {
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
      const t = nn(e.anchorEl);
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
  elevation: fs,
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
    component: Xp
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
const vg = nl;
function yg(e) {
  return rt("MuiMenu", e);
}
xt("MuiMenu", ["root", "paper", "list"]);
const wg = ["onEntering"], xg = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], kg = {
  vertical: "top",
  horizontal: "right"
}, Eg = {
  vertical: "top",
  horizontal: "left"
}, Ng = (e) => {
  const {
    classes: t
  } = e;
  return dt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, yg, t);
}, Tg = Re(vg, {
  shouldForwardProp: (e) => ks(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Sg = Re(rl, {
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
}), Cg = Re(Wh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), ol = /* @__PURE__ */ N.forwardRef(function(t, r) {
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
  } = a, k = he(a.TransitionProps, wg), y = he(a, xg), T = Hr(), S = T.direction === "rtl", I = P({}, a, {
    autoFocus: i,
    disableAutoFocusItem: f,
    MenuListProps: m,
    onEntering: b,
    PaperProps: p,
    transitionDuration: u,
    TransitionProps: k,
    variant: x
  }), D = Ng(I), F = i && !f && g, E = N.useRef(null), C = (Q, R) => {
    E.current && E.current.adjustStyleForScrollbar(Q, T), b && b(Q, R);
  }, $ = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), v && v(Q, "tabKeyDown"));
  };
  let z = -1;
  N.Children.map(l, (Q, R) => {
    /* @__PURE__ */ N.isValidElement(Q) && (process.env.NODE_ENV !== "production" && ln.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (x === "selectedMenu" && Q.props.selected || z === -1) && (z = R));
  });
  const U = (n = O.paper) != null ? n : Sg, j = (o = w.paper) != null ? o : p, B = Bt({
    elementType: O.root,
    externalSlotProps: w.root,
    ownerState: I,
    className: [D.root, c]
  }), Z = Bt({
    elementType: U,
    externalSlotProps: j,
    ownerState: I,
    className: D.paper
  });
  return /* @__PURE__ */ d(Tg, P({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: S ? "right" : "left"
    },
    transformOrigin: S ? kg : Eg,
    slots: {
      paper: U,
      root: O.root
    },
    slotProps: {
      root: B,
      paper: Z
    },
    open: g,
    ref: r,
    transitionDuration: u,
    TransitionProps: P({
      onEntering: C
    }, k),
    ownerState: I
  }, y, {
    classes: h,
    children: /* @__PURE__ */ d(Cg, P({
      onKeyDown: $,
      actions: E,
      autoFocus: i && (z === -1 || f),
      autoFocusItem: F,
      variant: x
    }, m, {
      className: Ce(D.list, m.className),
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
const Og = ol;
function Lv({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var f;
  const [o, a] = W.useState(void 0), i = Se(
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
          Og,
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
function Rg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const yo = (e, t, r = {}) => {
  const n = _t(t);
  n.current = t;
  const o = _t(r);
  o.current = Rg(o.current);
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
}, Pg = Es(/* @__PURE__ */ d("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function $g({
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
        const y = k.getBoundingClientRect(), T = window.scrollY, S = window.scrollX, I = y.top + T + k.clientHeight, D = y.left + S;
        b({ top: I, left: D });
      }
    }
  }, [c, o]);
  const [x] = yo(
    Se(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [O] = yo(
    Se(async () => (e == null ? void 0 : e(!0)) ?? r ?? x, [e, r, x, c]),
    r ?? x
  ), w = m && O ? O : x;
  return /* @__PURE__ */ _(wt, { children: [
    /* @__PURE__ */ d(
      _i,
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
        children: l ?? /* @__PURE__ */ d(Pg, {})
      }
    ),
    /* @__PURE__ */ d(
      Tc,
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
          Bh,
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
function Fv({
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
    _i,
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
const bt = "scrBook", _g = "scrRef", Rt = "source", Ig = "details", Mg = "Scripture Reference", Ag = "Scripture Book", al = "Type", Dg = "Details";
function jg(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: bt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Mg,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === bt ? Vn(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => ao(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => Vn(n.start),
      id: _g,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : Vn(o.start);
      },
      sortingFn: (n, o) => ao(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: Rt,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? al : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: Ig,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Dg,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
function Vv({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, f] = ce([]), [m, v] = ce([{ id: bt, desc: !1 }]), [g, p] = ce(() => e.flatMap((E) => {
    const C = E.source;
    return E.data.map(($) => ({
      ...$,
      source: C
    }));
  })), [h, u] = ce({});
  He(() => {
    p(() => e.flatMap((E) => {
      const C = E.source;
      return E.data.map(($) => ({
        ...$,
        source: C
      }));
    }));
  }, [e]);
  const b = Mt(
    () => jg(
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
    c.includes(Rt) ? v([
      { id: Rt, desc: !1 },
      { id: bt, desc: !1 }
    ]) : v([{ id: bt, desc: !1 }]);
  }, [c]);
  const x = Se(
    (E, C) => !C || ao(E, C) === 0 ? `${Fn(E)}` : `${Fn(E)}-${Fn(C)}`,
    []
  ), O = Se(
    (E) => `${x(E.start, E.end)} ${E.source} ${E.detail}`,
    [x]
  ), w = Ci({
    data: g,
    columns: b,
    state: {
      grouping: c,
      sorting: m,
      rowSelection: h
    },
    onGroupingChange: f,
    onSortingChange: v,
    onRowSelectionChange: u,
    getExpandedRowModel: gc(),
    getGroupedRowModel: bc(),
    getCoreRowModel: Oi(),
    getSortedRowModel: Ri(),
    getRowId: O,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  He(() => {
    if (l) {
      const E = w.getSelectedRowModel().rowsById, C = Object.keys(E);
      if (C.length === 1) {
        const $ = g.find((z) => O(z) === C[0]) || void 0;
        $ && l($);
      }
    }
  }, [h, g, O, l, w]);
  const k = o ?? Ag, y = a ?? al, T = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${k}`, value: [bt] },
    { label: `Group by ${y}`, value: [Rt] },
    {
      label: `Group by ${k} and ${y}`,
      value: [bt, Rt]
    },
    {
      label: `Group by ${y} and ${k}`,
      value: [Rt, bt]
    }
  ], S = (E) => {
    f(JSON.parse(E));
  }, I = (E, C) => {
    !E.getIsGrouped() && !E.getIsSelected() && E.getToggleSelectedHandler()(C);
  }, D = (E, C) => E.getIsGrouped() ? "" : V("banded-row", C % 2 === 0 ? "even" : "odd"), F = (E, C, $) => {
    if (!((E == null ? void 0 : E.length) === 0 || C.depth < $.column.getGroupedIndex())) {
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
  return /* @__PURE__ */ _("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !t && /* @__PURE__ */ _(
      an,
      {
        value: JSON.stringify(c),
        onValueChange: (E) => {
          S(E);
        },
        children: [
          /* @__PURE__ */ d(Rr, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ d(sn, {}) }),
          /* @__PURE__ */ d(Pr, { position: "item-aligned", children: /* @__PURE__ */ d(dp, { children: T.map((E) => /* @__PURE__ */ d(Ke, { value: JSON.stringify(E.value), children: E.label }, E.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ _(wn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ d(xn, { children: w.getHeaderGroups().map((E) => /* @__PURE__ */ d(yt, { children: E.headers.filter((C) => C.column.columnDef.header).map((C) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ d($r, { colSpan: C.colSpan, className: "top-0 pr-sticky", children: C.isPlaceholder ? void 0 : /* @__PURE__ */ _("div", { children: [
          C.column.getCanGroup() ? /* @__PURE__ */ d(
            we,
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
      )) }, E.id)) }),
      /* @__PURE__ */ d(kn, { children: w.getRowModel().rows.map((E, C) => /* @__PURE__ */ d(
        yt,
        {
          "data-state": E.getIsSelected() ? "selected" : "",
          className: V(D(E, C)),
          onClick: ($) => I(E, $),
          children: E.getVisibleCells().map(($) => {
            if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== Rt || !r)))
              return /* @__PURE__ */ d(
                Jt,
                {
                  className: V(
                    $.column.columnDef.id,
                    "pr-p-[1px]",
                    F(c, E, $)
                  ),
                  children: (() => $.getIsGrouped() ? /* @__PURE__ */ _(
                    we,
                    {
                      variant: "ghost",
                      onClick: E.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        E.getIsExpanded() ? "👇" : "👉",
                        " ",
                        kr($.column.columnDef.cell, $.getContext()),
                        " (",
                        E.subRows.length,
                        ")"
                      ]
                    }
                  ) : kr($.column.columnDef.cell, $.getContext()))()
                },
                $.id
              );
          })
        },
        E.id
      )) })
    ] })
  ] });
}
const Bg = To(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), il = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(Ii.Root, { ref: r, className: V(Bg(), e), ...t }));
il.displayName = Ii.Root.displayName;
function Lg({
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
  return /* @__PURE__ */ _("div", { className: V("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ d(
      il,
      {
        htmlFor: e,
        className: V({
          "pr-text-red-600": r,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ d(
      bn,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: V(c, { "pr-border-red-600": r }),
        defaultValue: f,
        value: m,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ d("p", { className: V({ "pr-hidden": !o }), children: o })
  ] });
}
function zv({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = ce(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ d(
    Lg,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
function Uv({
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
    Sc,
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
function Hv({
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
    Cc,
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
function Gv({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ d(
    Oc,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function Wv({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = _t(void 0);
  return /* @__PURE__ */ d("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ d(Rc, { position: "static", id: n, children: /* @__PURE__ */ _(Pc, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ d(
      $g,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ d("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Xv = De.Root, Fg = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.List,
  {
    ref: r,
    className: V(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Fg.displayName = De.List.displayName;
const Vg = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Trigger,
  {
    ref: r,
    className: V(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Vg.displayName = De.Trigger.displayName;
const zg = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Content,
  {
    ref: r,
    className: V(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
zg.displayName = De.Content.displayName;
const Ug = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Root,
  {
    orientation: "vertical",
    ref: r,
    className: V("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Ug.displayName = De.List.displayName;
const Hg = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.List,
  {
    ref: r,
    className: V(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Hg.displayName = De.List.displayName;
const Yv = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Trigger,
  {
    ref: r,
    ...t,
    className: V(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Gg = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  De.Content,
  {
    ref: r,
    className: V(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Gg.displayName = De.Content.displayName;
function qv({
  isInstalling: e,
  handleClick: t,
  buttonText: r,
  className: n,
  ...o
}) {
  return /* @__PURE__ */ d(
    we,
    {
      className: V(
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
      children: e ? /* @__PURE__ */ d(gn, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(nc, { size: 25, className: V("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function Kv({
  isEnabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    we,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(gn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Jv({
  isDisabling: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    we,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-gray-400",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(gn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Zv({
  isUpdating: e,
  handleClick: t,
  className: r,
  ...n
}) {
  return /* @__PURE__ */ d(
    we,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-bg-blue-700 hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        },
        r
      ),
      onClick: t,
      ...n,
      children: e ? /* @__PURE__ */ _(wt, { children: [
        /* @__PURE__ */ d(gn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
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
const Wg = ["children", "options"], wi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), xi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Xg = ["style", "script"], Yg = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, qg = /mailto:/i, Kg = /\n{2,}$/, sl = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Jg = /^ *> ?/gm, Zg = /^ {2,}\n/, Qg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, ll = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, cl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, eb = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, tb = /^(?:\n *)*\n/, rb = /\r\n?/g, nb = /^\[\^([^\]]+)](:.*)\n/, ob = /^\[\^([^\]]+)]/, ab = /\f/g, ib = /^\s*?\[(x|\s)\]/, pl = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, dl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, ul = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, wo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, sb = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, fl = /^<!--[\s\S]*?(?:-->)/, lb = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, xo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, cb = /^\{.*\}$/, pb = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, db = /^<([^ >]+@[^ >]+)>/, ub = /^<([^ >]+:\/[^ >]+)>/, fb = /-([a-z])?/gi, ml = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, mb = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, hb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, gb = /^\[([^\]]*)\] ?\[([^\]]*)\]/, bb = /(\[|\])/g, vb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, yb = /\t/g, wb = /^ *\| */, xb = /(^ *\||\| *$)/g, kb = / *$/, Eb = /^ *:-+: *$/, Nb = /^ *:-+ *$/, Tb = /^ *-+: *$/, Sb = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, Cb = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, Ob = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Rb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Pb = /^\\([^0-9A-Za-z\s])/, $b = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, _b = /^\n+/, Ib = /^([ \t]*)/, Mb = /\\([^\\])/g, ki = / *\n+$/, Ab = /(?:^|\n)( *)$/, Qo = "(?:\\d+\\.)", ea = "(?:[*+-])";
function hl(e) {
  return "( *)(" + (e === 1 ? Qo : ea) + ") +";
}
const gl = hl(1), bl = hl(2);
function vl(e) {
  return new RegExp("^" + (e === 1 ? gl : bl));
}
const Db = vl(1), jb = vl(2);
function yl(e) {
  return new RegExp("^" + (e === 1 ? gl : bl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Qo : ea) + " )[^\\n]*)*(\\n|$)", "gm");
}
const wl = yl(1), xl = yl(2);
function kl(e) {
  const t = e === 1 ? Qo : ea;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const El = kl(1), Nl = kl(2);
function Ei(e, t) {
  const r = t === 1, n = r ? El : Nl, o = r ? wl : xl, a = r ? Db : jb;
  return { t(i, l, c) {
    const f = Ab.exec(c);
    return f && (l.o || !l._ && !l.u) ? n.exec(i = f[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const f = r ? +i[2] : void 0, m = i[0].replace(Kg, `
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
const Bb = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Lb = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Tl = [sl, ll, cl, pl, ul, dl, fl, ml, wl, El, xl, Nl], Fb = [...Tl, /^[^\n]+(?:  \n|\n{2,})/, wo, xo];
function Vb(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function zb(e) {
  return Tb.test(e) ? "right" : Eb.test(e) ? "center" : Nb.test(e) ? "left" : null;
}
function Ni(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(kb, "")), a[a.length - 1].push(i));
  }), a;
}
function Ub(e, t, r) {
  r._ = !0;
  const n = Ni(e[1], t, r), o = e[2].replace(xb, "").split("|").map(zb), a = function(i, l, c) {
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
function Hb(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !Tl.some((i) => i.test(a)) && (n += a + `
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
  return e.replace(Mb, "$1");
}
function on(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Gb(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Wb(e, t, r) {
  return r._ = !1, e(t, r);
}
const eo = (e, t, r) => ({ v: on(t, e[1], r) });
function to() {
  return {};
}
function ro() {
  return null;
}
function Xb(...e) {
  return e.filter(Boolean).join(" ");
}
function no(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var ae;
function Yb(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Vb, t.namedCodesToUnicode = t.namedCodesToUnicode ? $t({}, xi, t.namedCodesToUnicode) : xi;
  const r = t.createElement || N.createElement;
  function n(p, h, ...u) {
    const b = no(t.overrides, `${p}.props`, {});
    return r(function(x, O) {
      const w = no(O, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : no(O, `${x}.component`, x) : x;
    }(p, t.overrides), $t({}, h, b, { className: Xb(h == null ? void 0 : h.className, b.className) || void 0 }), ...u);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = vb.test(p) === !1);
    const u = m(f(h ? p : `${p.trimEnd().replace(_b, "")}

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
    const h = p.match(Yg);
    return h ? h.reduce(function(u, b, x) {
      const O = b.indexOf("=");
      if (O !== -1) {
        const w = function(S) {
          return S.indexOf("-") !== -1 && S.match(lb) === null && (S = S.replace(fb, function(I, D) {
            return D.toUpperCase();
          })), S;
        }(b.slice(0, O)).trim(), k = function(S) {
          const I = S[0];
          return (I === '"' || I === "'") && S.length >= 2 && S[S.length - 1] === I ? S.slice(1, -1) : S;
        }(b.slice(O + 1).trim()), y = wi[w] || w, T = u[y] = function(S, I) {
          return S === "style" ? I.split(/;\s?/).reduce(function(D, F) {
            const E = F.slice(0, F.indexOf(":"));
            return D[E.replace(/(-[a-z])/g, (C) => C[1].toUpperCase())] = F.slice(E.length + 1).trim(), D;
          }, {}) : S === "href" ? Xt(I) : (I.match(cb) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(w, k);
        typeof T == "string" && (wo.test(T) || xo.test(T)) && (u[y] = N.cloneElement(o(T.trim()), { key: x }));
      } else
        b !== "style" && (u[wi[b] || b] = !0);
      return u;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: it(sl), i: ae.HIGH, l: (p, h, u) => ({ v: h(p[0].replace(Jg, ""), u) }), h: (p, h, u) => n("blockquote", { key: u.k }, h(p.v, u)) }, breakLine: { t: br(Zg), i: ae.HIGH, l: to, h: (p, h, u) => n("br", { key: u.k }) }, breakThematic: { t: it(Qg), i: ae.HIGH, l: to, h: (p, h, u) => n("hr", { key: u.k }) }, codeBlock: { t: it(cl), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, u) => n("pre", { key: u.k }, n("code", $t({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: it(ll), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: gt(eb), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, h, u) => n("code", { key: u.k }, p.v) }, footnote: { t: it(nb), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: ro }, footnoteReference: { t: ht(ob), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, u) => n("a", { key: u.k, href: Xt(p.B) }, n("sup", { key: u.k }, p.v)) }, gfmTask: { t: ht(ib), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, u) => n("input", { checked: p.R, key: u.k, readOnly: !0, type: "checkbox" }) }, heading: { t: it(t.enforceAtxHeadings ? dl : pl), i: ae.HIGH, l: (p, h, u) => ({ v: on(h, p[2], u), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, u) => n(`h${p.C}`, { id: p.T, key: u.k }, h(p.v, u)) }, headingSetext: { t: it(ul), i: ae.MAX, l: (p, h, u) => ({ v: on(h, p[1], u), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: br(fl), i: ae.HIGH, l: () => ({}), h: ro }, image: { t: gt(Lb), i: ae.HIGH, l: (p) => ({ D: p[1], B: Si(p[2]), F: p[3] }), h: (p, h, u) => n("img", { key: u.k, alt: p.D || void 0, title: p.F || void 0, src: Xt(p.B) }) }, link: { t: ht(Bb), i: ae.LOW, l: (p, h, u) => ({ v: Gb(h, p[1], u), B: Si(p[2]), F: p[3] }), h: (p, h, u) => n("a", { key: u.k, href: Xt(p.B), title: p.F }, h(p.v, u)) }, linkAngleBraceStyleDetector: { t: ht(ub), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : ht(pb)(p, h), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: ht(db), i: ae.MAX, l(p) {
    let h = p[1], u = p[1];
    return qg.test(u) || (u = "mailto:" + u), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: u, type: "link" };
  } }, orderedList: Ei(n, 1), unorderedList: Ei(n, 2), newlineCoalescer: { t: it(tb), i: ae.LOW, l: to, h: () => `
` }, paragraph: { t: Hb, i: ae.LOW, l: eo, h: (p, h, u) => n("p", { key: u.k }, h(p.v, u)) }, ref: { t: ht(mb), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: ro }, refImage: { t: gt(hb), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, u) => n("img", { key: u.k, alt: p.D, src: Xt(l[p.P].B), title: l[p.P].F }) }, refLink: { t: ht(gb), i: ae.MAX, l: (p, h, u) => ({ v: h(p[1], u), Z: h(p[0].replace(bb, "\\$1"), u), P: p[2] }), h: (p, h, u) => l[p.P] ? n("a", { key: u.k, href: Xt(l[p.P].B), title: l[p.P].F }, h(p.v, u)) : n("span", { key: u.k }, h(p.Z, u)) }, table: { t: it(ml), i: ae.HIGH, l: Ub, h: (p, h, u) => n("table", { key: u.k }, n("thead", null, n("tr", null, p.L.map(function(b, x) {
    return n("th", { key: x, style: Ti(p, x) }, h(b, u));
  }))), n("tbody", null, p.A.map(function(b, x) {
    return n("tr", { key: x }, b.map(function(O, w) {
      return n("td", { key: w, style: Ti(p, w) }, h(O, u));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, wb.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: br($b), i: ae.MIN, l: (p) => ({ v: p[0].replace(sb, (h, u) => t.namedCodesToUnicode[u] ? t.namedCodesToUnicode[u] : h) }), h: (p) => p.v }, textBolded: { t: gt(Sb), i: ae.MED, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => n("strong", { key: u.k }, h(p.v, u)) }, textEmphasized: { t: gt(Cb), i: ae.LOW, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => n("em", { key: u.k }, h(p.v, u)) }, textEscaped: { t: gt(Pb), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: gt(Ob), i: ae.LOW, l: eo, h: (p, h, u) => n("mark", { key: u.k }, h(p.v, u)) }, textStrikethroughed: { t: gt(Rb), i: ae.LOW, l: eo, h: (p, h, u) => n("del", { key: u.k }, h(p.v, u)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: br(wo), i: ae.HIGH, l(p, h, u) {
    const [, b] = p[3].match(Ib), x = new RegExp(`^${b}`, "gm"), O = p[3].replace(x, ""), w = (k = O, Fb.some((I) => I.test(k)) ? Wb : on);
    var k;
    const y = p[1].toLowerCase(), T = Xg.indexOf(y) !== -1;
    u.N = u.N || y === "a";
    const S = T ? p[3] : w(h, O, u);
    return u.N = !1, { O: a(p[2]), v: S, G: T, H: T ? y : p[1] };
  }, h: (p, h, u) => n(p.H, $t({ key: u.k }, p.O), p.G ? p.v : h(p.v, u)) }, c.htmlSelfClosing = { t: br(xo), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, h, u) => n(p.H, $t({}, p.O, { key: u.k })) });
  const f = function(p) {
    let h = Object.keys(p);
    function u(b, x) {
      let O = [], w = "";
      for (; b; ) {
        let k = 0;
        for (; k < h.length; ) {
          const y = h[k], T = p[y], S = T.t(b, x, w);
          if (S) {
            const I = S[0];
            b = b.substring(I.length);
            const D = T.l(S, u, x);
            D.type == null && (D.type = y), O.push(D), w = I;
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
        return O.replace(rb, `
`).replace(ab, "").replace(yb, "    ");
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
const qb = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, f = Object.keys(o);
    for (l = 0; l < f.length; l++)
      a.indexOf(i = f[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Wg);
  return N.cloneElement(Yb(t, r), n);
};
function Qv({ id: e, markdown: t }) {
  return /* @__PURE__ */ d("div", { id: e, className: "pr-prose", children: /* @__PURE__ */ d(qb, { children: t }) });
}
const Kb = ko((e, t) => /* @__PURE__ */ _(
  we,
  {
    ref: t,
    className: "pr-rounded-md pr-border pr-border-dashed pr-border-gray-400 pr-bg-white pr-px-4 pr-py-2 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-border-blue-600 hover:pr-bg-white hover:pr-text-blue-600",
    ...e,
    children: [
      /* @__PURE__ */ d(oc, { size: 16, className: "pr-mr-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600" }),
      "Filter",
      /* @__PURE__ */ d(
        No,
        {
          size: 16,
          className: "pr-ml-2 pr-h-4 pr-w-4 pr-text-gray-700 hover:pr-text-blue-600"
        }
      )
    ]
  }
));
var Jb = /* @__PURE__ */ ((e) => (e[e.Check = 0] = "Check", e[e.Radio = 1] = "Radio", e))(Jb || {});
function e0({ id: e, groups: t }) {
  return /* @__PURE__ */ d("div", { id: e, children: /* @__PURE__ */ _(Ro, { children: [
    /* @__PURE__ */ d(Fi, { asChild: !0, children: /* @__PURE__ */ d(Kb, {}) }),
    /* @__PURE__ */ d(vn, { children: t.map((r) => /* @__PURE__ */ _("div", { children: [
      /* @__PURE__ */ d(jr, { children: r.label }),
      /* @__PURE__ */ d(qc, { children: r.items.map((n) => /* @__PURE__ */ d("div", { children: n.itemType === 0 ? /* @__PURE__ */ d(Po, { onClick: n.onClick, children: n.label }) : /* @__PURE__ */ d(zi, { onClick: n.onClick, value: n.label, children: n.label }) }, n.label)) }),
      /* @__PURE__ */ d(yn, {})
    ] }, r.label)) })
  ] }) });
}
function t0({ id: e, message: t }) {
  return /* @__PURE__ */ d("div", { id: e, className: "pr-mb-20 pr-mt-20 pr-flex pr-items-center pr-justify-center", children: /* @__PURE__ */ d("div", { className: "pr-w-3/4 pr-rounded-lg pr-bg-gray-100 pr-p-8 pr-text-center", children: /* @__PURE__ */ d("p", { className: "pr-text-lg pr-text-gray-800", children: t }) }) });
}
function r0({
  id: e,
  category: t,
  downloads: r,
  languages: n,
  moreInfoUrl: o
}) {
  const a = new uc("en", {
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
            /* @__PURE__ */ d(ac, { className: "pr-mr-1 pr-h-4 pr-w-4" }),
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
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Website",
                /* @__PURE__ */ d(ic, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          ),
          /* @__PURE__ */ _(
            "a",
            {
              href: "https://placeholder.com",
              className: "pr-flex pr-items-center pr-text-xs pr-font-semibold pr-text-gray-500 pr-underline",
              children: [
                "Support",
                /* @__PURE__ */ d(sc, { className: "pr-ml-1 pr-inline pr-h-4 pr-w-4" })
              ]
            }
          )
        ] })
      ]
    }
  );
}
function Zb({ id: e, versionHistory: t }) {
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
function n0({
  id: e,
  publisherDisplayName: t,
  fileSize: r,
  locales: n,
  versionHistory: o
}) {
  const a = Mt(() => fc(r), [r]), l = ((c) => {
    const f = new Intl.DisplayNames(navigator.language, { type: "language" });
    return c.map((m) => f.of(m));
  })(n);
  return /* @__PURE__ */ d("div", { id: e, className: "pr-border-t pr-pb-4 pr-pt-4", children: /* @__PURE__ */ _("div", { className: "pr-md:flex-row pr-md:space-x-8 pr-flex pr-flex-col pr-space-x-0", children: [
    /* @__PURE__ */ d(Zb, { versionHistory: o }),
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
const o0 = (e, t) => {
  He(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, oo = () => !1, a0 = (e, t) => {
  const [r] = yo(
    Se(async () => {
      if (!e)
        return oo;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    oo,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  He(() => () => {
    r !== oo && r();
  }, [r]);
}, Qb = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
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
Qb.displayName = "Card";
const ev = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "div",
    {
      ref: r,
      className: V("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
ev.displayName = "CardHeader";
const tv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d(
    "h3",
    {
      ref: r,
      className: V("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
tv.displayName = "CardTitle";
const rv = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("p", { ref: r, className: V("pr-text-sm pr-text-muted-foreground", e), ...t }));
rv.displayName = "CardDescription";
const nv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: V("pr-p-6 pr-pt-0", e), ...t })
);
nv.displayName = "CardContent";
const ov = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: V("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
ov.displayName = "CardFooter";
const av = To(
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
), iv = W.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ d("div", { ref: n, role: "alert", className: V(av({ variant: t }), e), ...r }));
iv.displayName = "Alert";
const sv = W.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ _(
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
sv.displayName = "AlertTitle";
const lv = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d("div", { ref: r, className: V("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
lv.displayName = "AlertDescription";
const cv = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ _(
  vr.Root,
  {
    ref: r,
    className: V(
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
cv.displayName = vr.Root.displayName;
const pv = W.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ d(
  io.Root,
  {
    className: V(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ d(
      io.Thumb,
      {
        className: V(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
pv.displayName = io.Root.displayName;
function dv(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
dv(`.papi-snackbar {
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
.pr-h-\\[405px\\] {
  height: 405px;
}
.pr-h-\\[500px\\] {
  height: 500px;
}
.pr-h-\\[calc\\(100\\%\\)\\] {
  height: calc(100%);
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
.pr-min-h-\\[200px\\] {
  min-height: 200px;
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
.pr-w-\\[200px\\] {
  width: 200px;
}
.pr-w-\\[350px\\] {
  width: 350px;
}
.pr-w-\\[70px\\] {
  width: 70px;
}
.pr-w-\\[800px\\] {
  width: 800px;
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
.pr-overflow-visible {
  overflow: visible;
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
<<<<<<< HEAD
=======
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
}
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
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
>>>>>>> ef053b020 (improve table and inventory styles)
`, "top");
export {
  iv as Alert,
  lv as AlertDescription,
  sv as AlertTitle,
  $v as BookChapterControl,
  we as Button,
  Qb as Card,
  nv as CardContent,
  rv as CardDescription,
  ov as CardFooter,
  ev as CardHeader,
  tv as CardTitle,
  jv as ChapterRangeSelector,
  $p as Checkbox,
  Bv as Checklist,
  Ta as ComboBox,
  Lv as ContextMenu,
  bp as DataTable,
  Jv as DisableButton,
  Ro as DropdownMenu,
  Po as DropdownMenuCheckboxItem,
  vn as DropdownMenuContent,
  qc as DropdownMenuGroup,
  Vi as DropdownMenuItem,
  Jb as DropdownMenuItemType,
  jr as DropdownMenuLabel,
  Ov as DropdownMenuPortal,
  Pv as DropdownMenuRadioGroup,
  zi as DropdownMenuRadioItem,
  yn as DropdownMenuSeparator,
  Zc as DropdownMenuShortcut,
  Rv as DropdownMenuSub,
  Jc as DropdownMenuSubContent,
  Kc as DropdownMenuSubTrigger,
  Fi as DropdownMenuTrigger,
  Kv as EnableButton,
  Kb as FilterButton,
  e0 as FilterDropdown,
  n0 as Footer,
  Bh as GridMenu,
  $g as HamburgerMenuButton,
  _v as INVENTORY_STRING_KEYS,
  Fv as IconButton,
  bn as Input,
  qv as InstallButton,
  Iv as Inventory,
  il as Label,
  Yt as LabelPosition,
  Qv as MarkdownRenderer,
  Ws as MenuItem,
  r0 as MoreInfo,
  t0 as NoExtensionsFound,
  Vv as ScriptureResultsViewer,
  zv as SearchBar,
  an as Select,
  Pr as SelectContent,
  dp as SelectGroup,
  Ke as SelectItem,
  up as SelectLabel,
  Hi as SelectScrollDownButton,
  Ui as SelectScrollUpButton,
  fp as SelectSeparator,
  Rr as SelectTrigger,
  sn as SelectValue,
  cv as ShadCnSlider,
  pv as ShadCnSwitch,
  Uv as Slider,
  Hv as Snackbar,
  Gv as Switch,
  wn as Table,
  kn as TableBody,
  gp as TableCaption,
  Jt as TableCell,
  hp as TableFooter,
  $r as TableHead,
  xn as TableHeader,
  yt as TableRow,
  Xv as Tabs,
  zg as TabsContent,
  Fg as TabsList,
  Vg as TabsTrigger,
  Lg as TextField,
  Wv as Toolbar,
  Zv as UpdateButton,
  Zb as VersionHistory,
  Ug as VerticalTabs,
  Gg as VerticalTabsContent,
  Hg as VerticalTabsList,
  Yv as VerticalTabsTrigger,
  cp as buttonVariants,
  $o as getSortingIcon,
  Av as inventoryCountColumn,
  Mv as inventoryItemColumn,
  Dv as inventoryStatusColumn,
  o0 as useEvent,
  a0 as useEventAsync,
  yo as usePromise
};
//# sourceMappingURL=index.js.map
