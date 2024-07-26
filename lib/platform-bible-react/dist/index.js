import Il, { jsx as m, jsxs as B, Fragment as yt } from "react/jsx-runtime";
import * as T from "react";
import G, { forwardRef as xi, useCallback as Ce, useState as ie, useRef as $t, useEffect as Fe, useLayoutEffect as pa, useMemo as mn } from "react";
import { History as Al, ChevronRight as Dl, Check as wo, Circle as Bl, ArrowDownWideNarrow as jl, Clock as Ll, Bookmark as Vl, FilterIcon as Fl, ChevronDown as Ei, ChevronUp as zl, ArrowLeftIcon as Ul, ChevronLeftIcon as Hl, ChevronRightIcon as Gl, ArrowRightIcon as Wl, X as Xl, Search as ql, ChevronsUpDown as Yl, CircleCheckIcon as ua, CircleXIcon as da, CircleHelpIcon as fa, ArrowUpIcon as Kl, ArrowDownIcon as Jl, ArrowUpDownIcon as Zl, LoaderCircle as hn, Download as Ql } from "lucide-react";
import Oe, { clsx as ec } from "clsx";
import { extendTailwindMerge as tc } from "tailwind-merge";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as rc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as nc, compareScrRefs as no, scrRefToBBBCCCVVV as jn, formatScrRef as Ln, split as oc } from "platform-bible-utils";
import { useReactTable as ki, getCoreRowModel as Ti, getPaginationRowModel as ac, getSortedRowModel as Ni, getFilteredRowModel as ic, flexRender as wr, getExpandedRowModel as sc, getGroupedRowModel as lc } from "@tanstack/react-table";
import { Slot as cc } from "@radix-ui/react-slot";
import { cva as xo } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import { FormControlLabel as ma, FormLabel as pc, Checkbox as uc, MenuItem as dc, ListItemText as fc, ListItemIcon as Ci, Menu as mc, Grid as Oi, List as hc, IconButton as Si, Drawer as gc, Slider as bc, Snackbar as vc, Switch as yc, AppBar as wc, Toolbar as xc } from "@mui/material";
import * as Cr from "@radix-ui/react-popover";
import { Command as Ae } from "cmdk";
import * as Qe from "@radix-ui/react-dialog";
import Ec, { ThemeContext as kc, internal_processStyles as Tc } from "@mui/styled-engine";
import * as Nc from "react-dom";
import Gr from "react-dom";
import * as Ri from "@radix-ui/react-label";
import * as De from "@radix-ui/react-tabs";
import * as gr from "@radix-ui/react-slider";
import * as oo from "@radix-ui/react-switch";
const Cc = tc({ prefix: "pr-" });
function V(...e) {
  return Cc(ec(e));
}
const gn = G.forwardRef(
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
gn.displayName = "Input";
const Oc = xi(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ B("div", { className: "pr-relative", children: [
    /* @__PURE__ */ m(
      gn,
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
      Al,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Sc = Object.defineProperty, Rc = (e, t, r) => t in e ? Sc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => Rc(e, typeof t != "symbol" ? t + "" : t, r);
const Mt = [
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
], Eo = [
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
], Pi = [
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
], ha = Lc();
function rr(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ha ? ha[e] : 0;
}
function ko(e) {
  return rr(e) > 0;
}
function Pc(e) {
  const t = typeof e == "string" ? rr(e) : e;
  return t >= 40 && t <= 66;
}
function $c(e) {
  return (typeof e == "string" ? rr(e) : e) <= 39;
}
function $i(e) {
  return e <= 66;
}
function _c(e) {
  const t = typeof e == "string" ? rr(e) : e;
  return Ii(t) && !$i(t);
}
function* Mc() {
  for (let e = 1; e <= Mt.length; e++)
    yield e;
}
const Ic = 1, _i = Mt.length;
function Ac() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function To(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= Mt.length ? t : Mt[r];
}
function Mi(e) {
  return e <= 0 || e > _i ? "******" : Pi[e - 1];
}
function Dc(e) {
  return Mi(rr(e));
}
function Ii(e) {
  const t = typeof e == "number" ? To(e) : e;
  return ko(t) && !Eo.includes(t);
}
function Bc(e) {
  const t = typeof e == "number" ? To(e) : e;
  return ko(t) && Eo.includes(t);
}
function jc(e) {
  return Pi[e - 1].includes("*obsolete*");
}
function Lc() {
  const e = {};
  for (let t = 0; t < Mt.length; t++)
    e[Mt[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Mt,
  nonCanonicalIds: Eo,
  bookIdToNumber: rr,
  isBookIdValid: ko,
  isBookNT: Pc,
  isBookOT: $c,
  isBookOTNT: $i,
  isBookDC: _c,
  allBookNumbers: Mc,
  firstBook: Ic,
  lastBook: _i,
  extraBooks: Ac,
  bookNumberToId: To,
  bookNumberToEnglishName: Mi,
  bookIdToEnglishName: Dc,
  isCanonical: Ii,
  isExtraMaterial: Bc,
  isObsolete: jc
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
let Nt = Le;
function ga(e, t) {
  const r = t[0];
  for (let n = 1; n < t.length; n++)
    e = e.split(t[n]).join(r);
  return e.split(r);
}
var Ai = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Ai || {});
const _e = class ce {
  constructor(t, r, n, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), n == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = r != null && r instanceof Nt ? r : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = r != null && r instanceof Nt ? r : void 0;
        this.setEmpty(a), this._verseNum = t % ce.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ce.bookDigitShifter / ce.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ce.bookDigitShifter);
      } else if (r == null)
        if (t != null && t instanceof ce) {
          const a = t;
          this._bookNum = a.bookNum, this._chapterNum = a.chapterNum, this._verseNum = a.verseNum, this._verse = a.verse, this.versification = a.versification;
        } else {
          if (t == null)
            return;
          const a = t instanceof Nt ? t : ce.defaultVersification;
          this.setEmpty(a);
        }
      else
        throw new Error("VerseRef constructor not supported.");
    else if (t != null && r != null && n != null)
      if (typeof t == "string" && typeof r == "string" && typeof n == "string")
        this.setEmpty(o), this.updateInternal(t, r, n);
      else if (typeof t == "number" && typeof r == "number" && typeof n == "number")
        this._bookNum = t, this._chapterNum = r, this._verseNum = n, this.versification = o ?? ce.defaultVersification;
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
      return r = new ce(t), { success: !0, verseRef: r };
    } catch (n) {
      if (n instanceof cr)
        return r = new ce(), { success: !1, verseRef: r };
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
    return t % ce.bcvMaxValue * ce.bookDigitShifter + (r >= 0 ? r % ce.bcvMaxValue * ce.chapterDigitShifter : 0) + (n >= 0 ? n % ce.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: r, chapterNum: n, verseNum: o, verse: a, versificationStr: i } = t, l = a || o.toString();
    let c;
    return i && (c = new Nt(i)), r ? new ce(r, n.toString(), l, c) : new ce();
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
      if (r = r * 10 + +n - 0, r > ce.bcvMaxValue)
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
    return this._verse != null && (this._verse.includes(ce.verseRangeSeparator) || this._verse.includes(ce.verseSequenceIndicator));
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
    const { success: r, vNum: n } = ce.tryGetVerseNum(t);
    this._verse = r ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = n, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ce.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > me.lastBook)
      throw new cr(
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
    this.versification = this.versification != null ? new Nt(t) : void 0;
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
    return this.validateVerse(ce.verseRangeSeparators, ce.verseSequenceIndicators);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits and the verse is 0.
   */
  get BBBCCC() {
    return ce.getBBBCCCVVV(this._bookNum, this._chapterNum, 0);
  }
  /**
   * Gets the reference as a comparable integer where the book,
   * chapter, and verse each occupy three digits. If verse is not null
   * (i.e., this reference represents a complex reference with verse
   * segments or bridge) this cannot be used for an exact comparison.
   */
  get BBBCCCVVV() {
    return ce.getBBBCCCVVV(this._bookNum, this._chapterNum, this._verseNum);
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
          this.versification = new Nt(Je[i]);
        } catch {
          throw new cr("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new cr("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || me.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !ce.isVerseParseable(n[1]))
      throw new cr("Invalid reference : " + t);
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
    return new ce(this);
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
    return t instanceof ce ? t._bookNum === this._bookNum && t._chapterNum === this._chapterNum && t._verseNum === this._verseNum && t.verse === this.verse && (t.versification == null && this.versification == null || t.versification != null && this.versification != null && t.versification.equals(this.versification)) : !1;
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
  allVerses(t = !1, r = ce.verseRangeSeparators, n = ce.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = ga(this._verse, n);
    for (const i of a.map((l) => ga(l, r))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const u = this.clone();
        if (u.verse = i[1], !t)
          for (let f = c + 1; f < u.verseNum; f++) {
            const v = new ce(
              this._bookNum,
              this._chapterNum,
              f,
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
  setEmpty(t = ce.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(_e, "defaultVersification", Nt.English), oe(_e, "verseRangeSeparator", "-"), oe(_e, "verseSequenceIndicator", ","), oe(_e, "verseRangeSeparators", [_e.verseRangeSeparator]), oe(_e, "verseSequenceIndicators", [_e.verseSequenceIndicator]), oe(_e, "chapterDigitShifter", 1e3), oe(_e, "bookDigitShifter", _e.chapterDigitShifter * _e.chapterDigitShifter), oe(_e, "bcvMaxValue", _e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(_e, "ValidStatusType", Ai);
let cr = class extends Error {
};
const Di = ge.Root, Vc = ge.Trigger, bv = ge.Group, vv = ge.Portal, yv = ge.Sub, wv = ge.RadioGroup, Fc = G.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ B(
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
      /* @__PURE__ */ m(Dl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Fc.displayName = ge.SubTrigger.displayName;
const zc = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
zc.displayName = ge.SubContent.displayName;
const No = G.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ m(ge.Portal, { children: /* @__PURE__ */ m(
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
No.displayName = ge.Content.displayName;
const Bi = G.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ m(
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
Bi.displayName = ge.Item.displayName;
const ji = G.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ B(
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
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(ge.ItemIndicator, { children: /* @__PURE__ */ m(wo, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
ji.displayName = ge.CheckboxItem.displayName;
const Uc = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ B(
  ge.RadioItem,
  {
    ref: n,
    className: V(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(ge.ItemIndicator, { children: /* @__PURE__ */ m(Bl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Uc.displayName = ge.RadioItem.displayName;
const bn = G.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ m(
  ge.Label,
  {
    ref: n,
    className: V("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
bn.displayName = ge.Label.displayName;
const Co = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  ge.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Co.displayName = ge.Separator.displayName;
function Hc({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: V("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Hc.displayName = "DropdownMenuShortcut";
const Gc = xi(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ B(
    Bi,
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
            children: me.bookIdToEnglishName(e)
          }
        ),
        r && /* @__PURE__ */ m("div", { children: i })
      ]
    },
    e
  )
);
function Wc({
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
function Xc({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ B(bn, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ m("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ B("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ m(
        jl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        Ll,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        Vl,
        {
          onClick: r,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const xr = me.allBookIds, qc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ba = ["OT", "NT", "DC"], Yc = 32 + 32 + 32, Kc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Jc = (e) => ({
  OT: xr.filter((r) => me.isBookOT(r)),
  NT: xr.filter((r) => me.isBookNT(r)),
  DC: xr.filter((r) => me.isBookDC(r))
})[e], pr = (e) => nc(me.bookIdToNumber(e));
function Zc() {
  return xr.map((t) => me.bookIdToEnglishName(t));
}
function Qc(e) {
  return Zc().includes(e);
}
function ep(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (Qc(t))
    return xr.find((n) => me.bookIdToEnglishName(n) === t);
}
function xv({ scrRef: e, handleSubmit: t }) {
  const [r, n] = ie(""), [o, a] = ie(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = ie(e.chapterNum ?? 0), [c, u] = ie(
    me.bookNumberToId(e.bookNum)
  ), [f, v] = ie(!1), [g, p] = ie(f), h = $t(void 0), d = $t(void 0), b = $t(void 0), x = Ce(
    (k) => Jc(k).filter((O) => {
      const $ = me.bookIdToEnglishName(O).toLowerCase(), F = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(F) || // Match book name
      O.toLowerCase().includes(F);
    }),
    [r]
  ), P = (k) => {
    n(k);
  }, w = $t(!1), E = Ce((k) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    v(k);
  }, []), y = Ce(
    (k, O, $, F) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), O || pr(k) === -1) {
        t({
          bookNum: me.bookIdToNumber(k),
          chapterNum: $ || 1,
          verseNum: F || 1
        }), v(!1), n("");
        return;
      }
      a(o !== k ? k : ""), v(!O);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), C = (k) => {
    k <= 0 || k > pr(o) || y(o, !0, k);
  }, N = Ce(() => {
    Kc.forEach((k) => {
      const O = r.match(k);
      if (O) {
        const [$, F = void 0, H = void 0] = O.slice(1), _ = ep($);
        (me.isBookIdValid($) || _) && y(
          _ ?? $,
          !0,
          F ? parseInt(F, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [y, r]), I = Ce(
    (k) => {
      f ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof d < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      d.current !== null && d.current.focus(), k.preventDefault()) : v(!0);
    },
    [f]
  ), D = (k) => {
    const { key: O } = k;
    O === "ArrowRight" || O === "ArrowLeft" || O === "ArrowDown" || O === "ArrowUp" || O === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: O })), h.current.focus());
  }, L = (k) => {
    const { key: O } = k;
    if (c === o) {
      if (O === "Enter") {
        k.preventDefault(), y(o, !0, i);
        return;
      }
      let $ = 0;
      if (O === "ArrowRight")
        if (i < pr(c))
          $ = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (O === "ArrowLeft")
        if (i > 1)
          $ = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        O === "ArrowDown" ? $ = 6 : O === "ArrowUp" && ($ = -6);
      i + $ <= 0 || i + $ > pr(c) ? l(0) : $ !== 0 && (l(i + $), k.preventDefault());
    }
  };
  return Fe(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), pa(() => {
    p(f);
  }, [f]), pa(() => {
    const k = setTimeout(() => {
      if (g && d.current && b.current) {
        const $ = b.current.offsetTop - Yc;
        d.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [g]), /* @__PURE__ */ m("div", { className: "pr-flex", children: /* @__PURE__ */ B(Di, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ m(Vc, { asChild: !0, children: /* @__PURE__ */ m(
      Oc,
      {
        ref: h,
        value: r,
        handleSearch: P,
        handleKeyDown: I,
        handleOnClick: () => {
          a(me.bookNumberToId(e.bookNum)), u(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: N,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ B(
      No,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: d,
        children: [
          /* @__PURE__ */ m(
            Xc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ba.map(
            (k, O) => x(k).length > 0 && /* @__PURE__ */ B("div", { children: [
              /* @__PURE__ */ m(bn, { className: "pr-font-semibold pr-text-slate-700", children: qc[k] }),
              x(k).map(($) => /* @__PURE__ */ m("div", { children: /* @__PURE__ */ m(
                Gc,
                {
                  bookId: $,
                  handleSelectBook: () => y($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => u($),
                  handleKeyDown: L,
                  bookType: k,
                  ref: (F) => {
                    o === $ && (b.current = F);
                  },
                  children: /* @__PURE__ */ m(
                    Wc,
                    {
                      handleSelectChapter: C,
                      endChapter: pr($),
                      activeChapter: e.bookNum === me.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (F) => {
                        l(F);
                      }
                    }
                  )
                }
              ) }, $)),
              ba.length - 1 !== O ? /* @__PURE__ */ m(Co, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const tp = xo(
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
), we = G.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ m(n ? cc : "button", { className: V(tp({ variant: t, size: r, className: e })), ref: a, ...o })
);
we.displayName = "Button";
function rp({ table: e }) {
  return /* @__PURE__ */ B(Di, { children: [
    /* @__PURE__ */ m(rc, { asChild: !0, children: /* @__PURE__ */ B(we, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ m(Fl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ B(No, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ m(bn, { children: "Toggle columns" }),
      /* @__PURE__ */ m(Co, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ m(
        ji,
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
const nn = xe.Root, np = xe.Group, on = xe.Value, Or = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ B(
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
      /* @__PURE__ */ m(xe.Icon, { asChild: !0, children: /* @__PURE__ */ m(Ei, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Or.displayName = xe.Trigger.displayName;
const Li = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.ScrollUpButton,
  {
    ref: r,
    className: V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(zl, { className: "pr-h-4 pr-w-4" })
  }
));
Li.displayName = xe.ScrollUpButton.displayName;
const Vi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.ScrollDownButton,
  {
    ref: r,
    className: V("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(Ei, { className: "pr-h-4 pr-w-4" })
  }
));
Vi.displayName = xe.ScrollDownButton.displayName;
const Sr = G.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ m(xe.Portal, { children: /* @__PURE__ */ B(
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
      /* @__PURE__ */ m(Li, {}),
      /* @__PURE__ */ m(
        xe.Viewport,
        {
          className: V(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ m(Vi, {})
    ]
  }
) }));
Sr.displayName = xe.Content.displayName;
const op = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.Label,
  {
    ref: r,
    className: V("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
op.displayName = xe.Label.displayName;
const Ke = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ B(
  xe.Item,
  {
    ref: n,
    className: V(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(xe.ItemIndicator, { children: /* @__PURE__ */ m(wo, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ m(xe.ItemText, { children: t })
    ]
  }
));
Ke.displayName = xe.Item.displayName;
const ap = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
ap.displayName = xe.Separator.displayName;
function ip({ table: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ B("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ B("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ B("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ m("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ B(
        nn,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ m(Or, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ m(on, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ m(Sr, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ m(Ke, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ B("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ B("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ B(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ m(Ul, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ B(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ m(Hl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ B(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ m(Gl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ B(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ m(Wl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const vn = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ m(
    "table",
    {
      ref: r,
      className: V("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
vn.displayName = "Table";
const yn = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("thead", { ref: r, className: V("[&_tr]:pr-border-b", e), ...t }));
yn.displayName = "TableHeader";
const wn = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("tbody", { ref: r, className: V("[&_tr:last-child]:pr-border-0", e), ...t }));
wn.displayName = "TableBody";
const sp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "tfoot",
  {
    ref: r,
    className: V("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
sp.displayName = "TableFooter";
const vt = G.forwardRef(
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
vt.displayName = "TableRow";
const Rr = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Rr.displayName = "TableHead";
const Yt = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "td",
  {
    ref: r,
    className: V("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Yt.displayName = "TableCell";
const lp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "caption",
  {
    ref: r,
    className: V("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
lp.displayName = "TableCaption";
function cp({
  columns: e,
  data: t,
  enablePagination: r = !1,
  showPaginationControls: n = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: a = () => {
  }
}) {
  var d;
  const [i, l] = ie([]), [c, u] = ie([]), [f, v] = ie({}), [g, p] = ie({}), h = ki({
    data: t,
    columns: e,
    getCoreRowModel: Ti(),
    ...r && { getPaginationRowModel: ac() },
    onSortingChange: l,
    getSortedRowModel: Ni(),
    onColumnFiltersChange: u,
    getFilteredRowModel: ic(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: p,
    state: {
      sorting: i,
      columnFilters: c,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ B("div", { children: [
    o && /* @__PURE__ */ m(rp, { table: h }),
    /* @__PURE__ */ m("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ B(vn, { children: [
      /* @__PURE__ */ m(yn, { children: h.getHeaderGroups().map((b) => /* @__PURE__ */ m(vt, { children: b.headers.map((x) => /* @__PURE__ */ m(Rr, { children: x.isPlaceholder ? void 0 : wr(x.column.columnDef.header, x.getContext()) }, x.id)) }, b.id)) }),
      /* @__PURE__ */ m(wn, { children: (d = h.getRowModel().rows) != null && d.length ? h.getRowModel().rows.map((b) => /* @__PURE__ */ m(
        vt,
        {
          onClick: () => a(b, h),
          "data-state": b.getIsSelected() && "selected",
          children: b.getVisibleCells().map((x) => /* @__PURE__ */ m(Yt, { children: wr(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        b.id
      )) : /* @__PURE__ */ m(vt, { children: /* @__PURE__ */ m(Yt, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    r && /* @__PURE__ */ B("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ m(
        we,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.previousPage(),
          disabled: !h.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ m(
        we,
        {
          variant: "outline",
          size: "sm",
          onClick: () => h.nextPage(),
          disabled: !h.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ m(ip, { table: h })
  ] });
}
const pp = Cr.Root, up = Cr.Trigger, Fi = G.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ m(Cr.Portal, { children: /* @__PURE__ */ m(
  Cr.Content,
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
Fi.displayName = Cr.Content.displayName;
const dp = Qe.Portal, zi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
zi.displayName = Qe.Overlay.displayName;
const fp = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ B(dp, { children: [
  /* @__PURE__ */ m(zi, {}),
  /* @__PURE__ */ B(
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
        /* @__PURE__ */ B(Qe.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ m(Xl, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
fp.displayName = Qe.Content.displayName;
const mp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Qe.Title,
  {
    ref: r,
    className: V("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
mp.displayName = Qe.Title.displayName;
const hp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Qe.Description,
  {
    ref: r,
    className: V("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
hp.displayName = Qe.Description.displayName;
const Ui = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Ui.displayName = Ae.displayName;
const Hi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ B("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ m(ql, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ m(
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
Hi.displayName = Ae.Input.displayName;
const Gi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: r,
    className: V("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
Gi.displayName = Ae.List.displayName;
const Wi = G.forwardRef((e, t) => /* @__PURE__ */ m(Ae.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Wi.displayName = Ae.Empty.displayName;
const gp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
gp.displayName = Ae.Group.displayName;
const bp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Separator,
  {
    ref: r,
    className: V("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
bp.displayName = Ae.Separator.displayName;
const Xi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Xi.displayName = Ae.Item.displayName;
function vp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function va({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = vp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: u = "outline"
}) {
  const [f, v] = ie(!1);
  return /* @__PURE__ */ B(pp, { open: f, onOpenChange: v, children: [
    /* @__PURE__ */ m(up, { asChild: !0, children: /* @__PURE__ */ B(
      we,
      {
        variant: u,
        role: "combobox",
        "aria-expanded": f,
        id: e,
        className: V("pr-w-[200px] pr-justify-between", r),
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ m(Yl, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ m(Fi, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ B(Ui, { children: [
      /* @__PURE__ */ m(Hi, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ m(Wi, { children: c }),
      /* @__PURE__ */ m(Gi, { children: t.map((g) => /* @__PURE__ */ B(
        Xi,
        {
          value: a(g),
          onSelect: () => {
            o(g), v(!1);
          },
          children: [
            /* @__PURE__ */ m(
              wo,
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
function Ev({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: r = !1,
  chapterCount: n
}) {
  const [o, a] = ie(1), [i, l] = ie(n), [c, u] = ie(
    Array.from({ length: n }, (g, p) => p + 1)
  );
  return Fe(() => {
    a(1), e(1), l(n), t(n), u(Array.from({ length: n }, (g, p) => p + 1));
  }, [n, t, e]), /* @__PURE__ */ B(yt, { children: [
    /* @__PURE__ */ m(
      ma,
      {
        className: "book-selection-chapter-form-label start",
        disabled: r,
        control: /* @__PURE__ */ m(
          va,
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
      ma,
      {
        className: "book-selection-chapter-form-label end",
        disabled: r,
        control: /* @__PURE__ */ m(
          va,
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
var Wt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Wt || {});
function yp({
  id: e,
  isChecked: t,
  labelText: r = "",
  labelPosition: n = Wt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: u
}) {
  const f = /* @__PURE__ */ m(
    uc,
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
    const g = n === Wt.Before || n === Wt.Above, p = /* @__PURE__ */ m("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: r }), h = n === Wt.Before || n === Wt.After, d = h ? p : /* @__PURE__ */ m("div", { children: p }), b = h ? f : /* @__PURE__ */ m("div", { children: f });
    v = /* @__PURE__ */ B(
      pc,
      {
        className: `papi-checkbox ${n.toString()}`,
        disabled: i,
        error: l,
        children: [
          g && d,
          b,
          !g && d
        ]
      }
    );
  } else
    v = f;
  return v;
}
function kv({
  id: e,
  className: t,
  legend: r,
  listItems: n,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ B("fieldset", { id: e, className: t, children: [
    r && /* @__PURE__ */ m("legend", { children: r }),
    n.map((l) => /* @__PURE__ */ m(
      yp,
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
function wp(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function xp(e) {
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
var Oo = {}, qi = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(qi);
var Ep = qi.exports, Vn = {};
function nr(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : function(...n) {
    return e(...n) || t(...n);
  };
}
function R() {
  return R = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, R.apply(this, arguments);
}
function Rt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Yi(e) {
  if (!Rt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = Yi(e[r]);
  }), t;
}
function st(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? R({}, e) : e;
  return Rt(e) && Rt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Rt(t[o]) && o in e && Rt(e[o]) ? n[o] = st(e[o], t[o], r) : r.clone ? n[o] = Rt(t[o]) ? Yi(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var ao = { exports: {} }, Wr = { exports: {} }, pe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ya;
function kp() {
  if (ya)
    return pe;
  ya = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
  function w(y) {
    if (typeof y == "object" && y !== null) {
      var C = y.$$typeof;
      switch (C) {
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
                case f:
                case h:
                case p:
                case i:
                  return y;
                default:
                  return C;
              }
          }
        case r:
          return C;
      }
    }
  }
  function E(y) {
    return w(y) === u;
  }
  return pe.AsyncMode = c, pe.ConcurrentMode = u, pe.ContextConsumer = l, pe.ContextProvider = i, pe.Element = t, pe.ForwardRef = f, pe.Fragment = n, pe.Lazy = h, pe.Memo = p, pe.Portal = r, pe.Profiler = a, pe.StrictMode = o, pe.Suspense = v, pe.isAsyncMode = function(y) {
    return E(y) || w(y) === c;
  }, pe.isConcurrentMode = E, pe.isContextConsumer = function(y) {
    return w(y) === l;
  }, pe.isContextProvider = function(y) {
    return w(y) === i;
  }, pe.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, pe.isForwardRef = function(y) {
    return w(y) === f;
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
    return typeof y == "string" || typeof y == "function" || y === n || y === u || y === a || y === o || y === v || y === g || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === f || y.$$typeof === b || y.$$typeof === x || y.$$typeof === P || y.$$typeof === d);
  }, pe.typeOf = w, pe;
}
var ue = {};
/** @license React v16.13.1
 * react-is.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wa;
function Tp() {
  return wa || (wa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, u = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, d = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
    function w(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === n || j === u || j === a || j === o || j === v || j === g || typeof j == "object" && j !== null && (j.$$typeof === h || j.$$typeof === p || j.$$typeof === i || j.$$typeof === l || j.$$typeof === f || j.$$typeof === b || j.$$typeof === x || j.$$typeof === P || j.$$typeof === d);
    }
    function E(j) {
      if (typeof j == "object" && j !== null) {
        var re = j.$$typeof;
        switch (re) {
          case t:
            var A = j.type;
            switch (A) {
              case c:
              case u:
              case n:
              case a:
              case o:
              case v:
                return A;
              default:
                var le = A && A.$$typeof;
                switch (le) {
                  case l:
                  case f:
                  case h:
                  case p:
                  case i:
                    return le;
                  default:
                    return re;
                }
            }
          case r:
            return re;
        }
      }
    }
    var y = c, C = u, N = l, I = i, D = t, L = f, k = n, O = h, $ = p, F = r, H = a, _ = o, z = v, te = !1;
    function Q(j) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), S(j) || E(j) === c;
    }
    function S(j) {
      return E(j) === u;
    }
    function M(j) {
      return E(j) === l;
    }
    function U(j) {
      return E(j) === i;
    }
    function Y(j) {
      return typeof j == "object" && j !== null && j.$$typeof === t;
    }
    function W(j) {
      return E(j) === f;
    }
    function X(j) {
      return E(j) === n;
    }
    function K(j) {
      return E(j) === h;
    }
    function J(j) {
      return E(j) === p;
    }
    function q(j) {
      return E(j) === r;
    }
    function Z(j) {
      return E(j) === a;
    }
    function ee(j) {
      return E(j) === o;
    }
    function se(j) {
      return E(j) === v;
    }
    ue.AsyncMode = y, ue.ConcurrentMode = C, ue.ContextConsumer = N, ue.ContextProvider = I, ue.Element = D, ue.ForwardRef = L, ue.Fragment = k, ue.Lazy = O, ue.Memo = $, ue.Portal = F, ue.Profiler = H, ue.StrictMode = _, ue.Suspense = z, ue.isAsyncMode = Q, ue.isConcurrentMode = S, ue.isContextConsumer = M, ue.isContextProvider = U, ue.isElement = Y, ue.isForwardRef = W, ue.isFragment = X, ue.isLazy = K, ue.isMemo = J, ue.isPortal = q, ue.isProfiler = Z, ue.isStrictMode = ee, ue.isSuspense = se, ue.isValidElementType = w, ue.typeOf = E;
  }()), ue;
}
var xa;
function Ki() {
  return xa || (xa = 1, process.env.NODE_ENV === "production" ? Wr.exports = kp() : Wr.exports = Tp()), Wr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Fn, Ea;
function Np() {
  if (Ea)
    return Fn;
  Ea = 1;
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
      var u = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        u[f] = f;
      }), Object.keys(Object.assign({}, u)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Fn = o() ? Object.assign : function(a, i) {
    for (var l, c = n(a), u, f = 1; f < arguments.length; f++) {
      l = Object(arguments[f]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        u = e(l);
        for (var g = 0; g < u.length; g++)
          r.call(l, u[g]) && (c[u[g]] = l[u[g]]);
      }
    }
    return c;
  }, Fn;
}
var zn, ka;
function So() {
  if (ka)
    return zn;
  ka = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return zn = e, zn;
}
var Un, Ta;
function Ji() {
  return Ta || (Ta = 1, Un = Function.call.bind(Object.prototype.hasOwnProperty)), Un;
}
var Hn, Na;
function Cp() {
  if (Na)
    return Hn;
  Na = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = So(), r = {}, n = Ji();
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
  }, Hn = o, Hn;
}
var Gn, Ca;
function Op() {
  if (Ca)
    return Gn;
  Ca = 1;
  var e = Ki(), t = Np(), r = So(), n = Ji(), o = Cp(), a = function() {
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
  return Gn = function(l, c) {
    var u = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(S) {
      var M = S && (u && S[u] || S[f]);
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
      any: P(),
      arrayOf: w,
      element: E(),
      elementType: y(),
      instanceOf: C,
      node: L(),
      objectOf: I,
      oneOf: N,
      oneOfType: D,
      shape: O,
      exact: $
    };
    function h(S, M) {
      return S === M ? S !== 0 || 1 / S === 1 / M : S !== S && M !== M;
    }
    function d(S, M) {
      this.message = S, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    d.prototype = Error.prototype;
    function b(S) {
      if (process.env.NODE_ENV !== "production")
        var M = {}, U = 0;
      function Y(X, K, J, q, Z, ee, se) {
        if (q = q || g, ee = ee || J, se !== r) {
          if (c) {
            var j = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw j.name = "Invariant Violation", j;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = q + ":" + J;
            !M[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[re] = !0, U++);
          }
        }
        return K[J] == null ? X ? K[J] === null ? new d("The " + Z + " `" + ee + "` is marked as required " + ("in `" + q + "`, but its value is `null`.")) : new d("The " + Z + " `" + ee + "` is marked as required in " + ("`" + q + "`, but its value is `undefined`.")) : null : S(K, J, q, Z, ee);
      }
      var W = Y.bind(null, !1);
      return W.isRequired = Y.bind(null, !0), W;
    }
    function x(S) {
      function M(U, Y, W, X, K, J) {
        var q = U[Y], Z = _(q);
        if (Z !== S) {
          var ee = z(q);
          return new d(
            "Invalid " + X + " `" + K + "` of type " + ("`" + ee + "` supplied to `" + W + "`, expected ") + ("`" + S + "`."),
            { expectedType: S }
          );
        }
        return null;
      }
      return b(M);
    }
    function P() {
      return b(i);
    }
    function w(S) {
      function M(U, Y, W, X, K) {
        if (typeof S != "function")
          return new d("Property `" + K + "` of component `" + W + "` has invalid PropType notation inside arrayOf.");
        var J = U[Y];
        if (!Array.isArray(J)) {
          var q = _(J);
          return new d("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected an array."));
        }
        for (var Z = 0; Z < J.length; Z++) {
          var ee = S(J, Z, W, X, K + "[" + Z + "]", r);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return b(M);
    }
    function E() {
      function S(M, U, Y, W, X) {
        var K = M[U];
        if (!l(K)) {
          var J = _(K);
          return new d("Invalid " + W + " `" + X + "` of type " + ("`" + J + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(S);
    }
    function y() {
      function S(M, U, Y, W, X) {
        var K = M[U];
        if (!e.isValidElementType(K)) {
          var J = _(K);
          return new d("Invalid " + W + " `" + X + "` of type " + ("`" + J + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(S);
    }
    function C(S) {
      function M(U, Y, W, X, K) {
        if (!(U[Y] instanceof S)) {
          var J = S.name || g, q = Q(U[Y]);
          return new d("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected ") + ("instance of `" + J + "`."));
        }
        return null;
      }
      return b(M);
    }
    function N(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function M(U, Y, W, X, K) {
        for (var J = U[Y], q = 0; q < S.length; q++)
          if (h(J, S[q]))
            return null;
        var Z = JSON.stringify(S, function(se, j) {
          var re = z(j);
          return re === "symbol" ? String(j) : j;
        });
        return new d("Invalid " + X + " `" + K + "` of value `" + String(J) + "` " + ("supplied to `" + W + "`, expected one of " + Z + "."));
      }
      return b(M);
    }
    function I(S) {
      function M(U, Y, W, X, K) {
        if (typeof S != "function")
          return new d("Property `" + K + "` of component `" + W + "` has invalid PropType notation inside objectOf.");
        var J = U[Y], q = _(J);
        if (q !== "object")
          return new d("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected an object."));
        for (var Z in J)
          if (n(J, Z)) {
            var ee = S(J, Z, W, X, K + "." + Z, r);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return b(M);
    }
    function D(S) {
      if (!Array.isArray(S))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var M = 0; M < S.length; M++) {
        var U = S[M];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(U) + " at index " + M + "."
          ), i;
      }
      function Y(W, X, K, J, q) {
        for (var Z = [], ee = 0; ee < S.length; ee++) {
          var se = S[ee], j = se(W, X, K, J, q, r);
          if (j == null)
            return null;
          j.data && n(j.data, "expectedType") && Z.push(j.data.expectedType);
        }
        var re = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new d("Invalid " + J + " `" + q + "` supplied to " + ("`" + K + "`" + re + "."));
      }
      return b(Y);
    }
    function L() {
      function S(M, U, Y, W, X) {
        return F(M[U]) ? null : new d("Invalid " + W + " `" + X + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return b(S);
    }
    function k(S, M, U, Y, W) {
      return new d(
        (S || "React class") + ": " + M + " type `" + U + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + W + "`."
      );
    }
    function O(S) {
      function M(U, Y, W, X, K) {
        var J = U[Y], q = _(J);
        if (q !== "object")
          return new d("Invalid " + X + " `" + K + "` of type `" + q + "` " + ("supplied to `" + W + "`, expected `object`."));
        for (var Z in S) {
          var ee = S[Z];
          if (typeof ee != "function")
            return k(W, X, K, Z, z(ee));
          var se = ee(J, Z, W, X, K + "." + Z, r);
          if (se)
            return se;
        }
        return null;
      }
      return b(M);
    }
    function $(S) {
      function M(U, Y, W, X, K) {
        var J = U[Y], q = _(J);
        if (q !== "object")
          return new d("Invalid " + X + " `" + K + "` of type `" + q + "` " + ("supplied to `" + W + "`, expected `object`."));
        var Z = t({}, U[Y], S);
        for (var ee in Z) {
          var se = S[ee];
          if (n(S, ee) && typeof se != "function")
            return k(W, X, K, ee, z(se));
          if (!se)
            return new d(
              "Invalid " + X + " `" + K + "` key `" + ee + "` supplied to `" + W + "`.\nBad object: " + JSON.stringify(U[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(S), null, "  ")
            );
          var j = se(J, ee, W, X, K + "." + ee, r);
          if (j)
            return j;
        }
        return null;
      }
      return b(M);
    }
    function F(S) {
      switch (typeof S) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !S;
        case "object":
          if (Array.isArray(S))
            return S.every(F);
          if (S === null || l(S))
            return !0;
          var M = v(S);
          if (M) {
            var U = M.call(S), Y;
            if (M !== S.entries) {
              for (; !(Y = U.next()).done; )
                if (!F(Y.value))
                  return !1;
            } else
              for (; !(Y = U.next()).done; ) {
                var W = Y.value;
                if (W && !F(W[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function H(S, M) {
      return S === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function _(S) {
      var M = typeof S;
      return Array.isArray(S) ? "array" : S instanceof RegExp ? "object" : H(M, S) ? "symbol" : M;
    }
    function z(S) {
      if (typeof S > "u" || S === null)
        return "" + S;
      var M = _(S);
      if (M === "object") {
        if (S instanceof Date)
          return "date";
        if (S instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function te(S) {
      var M = z(S);
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
    function Q(S) {
      return !S.constructor || !S.constructor.name ? g : S.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Gn;
}
var Wn, Oa;
function Sp() {
  if (Oa)
    return Wn;
  Oa = 1;
  var e = So();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Wn = function() {
    function n(i, l, c, u, f, v) {
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
  }, Wn;
}
if (process.env.NODE_ENV !== "production") {
  var Rp = Ki(), Pp = !0;
  ao.exports = Op()(Rp.isElement, Pp);
} else
  ao.exports = Sp()();
var $p = ao.exports;
const s = /* @__PURE__ */ wp($p);
function _p(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Zi(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !_p(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Qi = nr(s.element, Zi);
Qi.isRequired = nr(s.element.isRequired, Zi);
const Ar = Qi;
function Mp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Ip(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !Mp(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Ap = nr(s.elementType, Ip), Dp = "exact-prop: ​";
function es(e) {
  return process.env.NODE_ENV === "production" ? e : R({}, e, {
    [Dp]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Kt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var io = { exports: {} }, de = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Sa;
function Bp() {
  if (Sa)
    return de;
  Sa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function d(b) {
    if (typeof b == "object" && b !== null) {
      var x = b.$$typeof;
      switch (x) {
        case e:
          switch (b = b.type, b) {
            case r:
            case o:
            case n:
            case u:
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
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return de.ContextConsumer = i, de.ContextProvider = a, de.Element = e, de.ForwardRef = c, de.Fragment = r, de.Lazy = g, de.Memo = v, de.Portal = t, de.Profiler = o, de.StrictMode = n, de.Suspense = u, de.SuspenseList = f, de.isAsyncMode = function() {
    return !1;
  }, de.isConcurrentMode = function() {
    return !1;
  }, de.isContextConsumer = function(b) {
    return d(b) === i;
  }, de.isContextProvider = function(b) {
    return d(b) === a;
  }, de.isElement = function(b) {
    return typeof b == "object" && b !== null && b.$$typeof === e;
  }, de.isForwardRef = function(b) {
    return d(b) === c;
  }, de.isFragment = function(b) {
    return d(b) === r;
  }, de.isLazy = function(b) {
    return d(b) === g;
  }, de.isMemo = function(b) {
    return d(b) === v;
  }, de.isPortal = function(b) {
    return d(b) === t;
  }, de.isProfiler = function(b) {
    return d(b) === o;
  }, de.isStrictMode = function(b) {
    return d(b) === n;
  }, de.isSuspense = function(b) {
    return d(b) === u;
  }, de.isSuspenseList = function(b) {
    return d(b) === f;
  }, de.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === o || b === n || b === u || b === f || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === a || b.$$typeof === i || b.$$typeof === c || b.$$typeof === h || b.getModuleId !== void 0);
  }, de.typeOf = d, de;
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
var Ra;
function jp() {
  return Ra || (Ra = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), u = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, d = !1, b = !1, x = !1, P = !1, w;
    w = Symbol.for("react.module.reference");
    function E(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === r || A === o || P || A === n || A === u || A === f || x || A === p || h || d || b || typeof A == "object" && A !== null && (A.$$typeof === g || A.$$typeof === v || A.$$typeof === a || A.$$typeof === i || A.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      A.$$typeof === w || A.getModuleId !== void 0));
    }
    function y(A) {
      if (typeof A == "object" && A !== null) {
        var le = A.$$typeof;
        switch (le) {
          case e:
            var Te = A.type;
            switch (Te) {
              case r:
              case o:
              case n:
              case u:
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
                    return le;
                }
            }
          case t:
            return le;
        }
      }
    }
    var C = i, N = a, I = e, D = c, L = r, k = g, O = v, $ = t, F = o, H = n, _ = u, z = f, te = !1, Q = !1;
    function S(A) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function M(A) {
      return Q || (Q = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function U(A) {
      return y(A) === i;
    }
    function Y(A) {
      return y(A) === a;
    }
    function W(A) {
      return typeof A == "object" && A !== null && A.$$typeof === e;
    }
    function X(A) {
      return y(A) === c;
    }
    function K(A) {
      return y(A) === r;
    }
    function J(A) {
      return y(A) === g;
    }
    function q(A) {
      return y(A) === v;
    }
    function Z(A) {
      return y(A) === t;
    }
    function ee(A) {
      return y(A) === o;
    }
    function se(A) {
      return y(A) === n;
    }
    function j(A) {
      return y(A) === u;
    }
    function re(A) {
      return y(A) === f;
    }
    fe.ContextConsumer = C, fe.ContextProvider = N, fe.Element = I, fe.ForwardRef = D, fe.Fragment = L, fe.Lazy = k, fe.Memo = O, fe.Portal = $, fe.Profiler = F, fe.StrictMode = H, fe.Suspense = _, fe.SuspenseList = z, fe.isAsyncMode = S, fe.isConcurrentMode = M, fe.isContextConsumer = U, fe.isContextProvider = Y, fe.isElement = W, fe.isForwardRef = X, fe.isFragment = K, fe.isLazy = J, fe.isMemo = q, fe.isPortal = Z, fe.isProfiler = ee, fe.isStrictMode = se, fe.isSuspense = j, fe.isSuspenseList = re, fe.isValidElementType = E, fe.typeOf = y;
  }()), fe;
}
process.env.NODE_ENV === "production" ? io.exports = Bp() : io.exports = jp();
var an = io.exports;
const Lp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Vp(e) {
  const t = `${e}`.match(Lp);
  return t && t[1] || "";
}
function ts(e, t = "") {
  return e.displayName || e.name || Vp(e) || t;
}
function Pa(e, t, r) {
  const n = ts(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function Fp(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ts(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case an.ForwardRef:
          return Pa(e, e.render, "ForwardRef");
        case an.Memo:
          return Pa(e, e.type, "memo");
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
const zp = s.oneOfType([s.func, s.object]), Ro = zp;
function et(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Kt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function so(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function rs(e, t = 166) {
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
function Up(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Hp(e, t) {
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
function Jt(e) {
  return Se(e).defaultView || window;
}
function Gp(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? R({}, t.propTypes) : null;
  return (o) => (a, i, l, c, u, ...f) => {
    const v = u || i, g = r == null ? void 0 : r[v];
    if (g) {
      const p = g(a, i, l, c, u, ...f);
      if (p)
        return p;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function sn(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Wp = typeof window < "u" ? T.useLayoutEffect : T.useEffect, It = Wp;
let $a = 0;
function Xp(e) {
  const [t, r] = T.useState(e), n = e || t;
  return T.useEffect(() => {
    t == null && ($a += 1, r(`mui-${$a}`));
  }, [t]), n;
}
const _a = T["useId".toString()];
function ns(e) {
  if (_a !== void 0) {
    const t = _a();
    return e ?? t;
  }
  return Xp(e);
}
function qp(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function os({
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
      current: u
    } = T.useRef(t);
    T.useEffect(() => {
      !o && u !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((u) => {
    o || i(u);
  }, []);
  return [l, c];
}
function Pr(e) {
  const t = T.useRef(e);
  return It(() => {
    t.current = e;
  }), T.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function We(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      sn(r, t);
    });
  }, e);
}
const Ma = {};
function Yp(e, t) {
  const r = T.useRef(Ma);
  return r.current === Ma && (r.current = e(t)), r;
}
const Kp = [];
function Jp(e) {
  T.useEffect(e, Kp);
}
class Dr {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Dr();
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
function br() {
  const e = Yp(Dr.create).current;
  return Jp(e.disposeEffect), e;
}
let xn = !0, lo = !1;
const Zp = new Dr(), Qp = {
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
function eu(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && Qp[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function tu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (xn = !0);
}
function Xn() {
  xn = !1;
}
function ru() {
  this.visibilityState === "hidden" && lo && (xn = !0);
}
function nu(e) {
  e.addEventListener("keydown", tu, !0), e.addEventListener("mousedown", Xn, !0), e.addEventListener("pointerdown", Xn, !0), e.addEventListener("touchstart", Xn, !0), e.addEventListener("visibilitychange", ru, !0);
}
function ou(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return xn || eu(t);
}
function as() {
  const e = T.useCallback((o) => {
    o != null && nu(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function r() {
    return t.current ? (lo = !0, Zp.start(100, () => {
      lo = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return ou(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function is(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function au(e) {
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
function iu(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const su = Number.isInteger || iu;
function ss(e, t, r, n) {
  const o = e[t];
  if (o == null || !su(o)) {
    const a = au(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function ls(e, t, ...r) {
  return e[t] === void 0 ? null : ss(e, t, ...r);
}
function co() {
  return null;
}
ls.isRequired = ss;
co.isRequired = co;
const cs = process.env.NODE_ENV === "production" ? co : ls;
function ps(e, t) {
  const r = R({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = R({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = R({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = ps(o[i], a[i]);
      }));
    } else
      r[n] === void 0 && (r[n] = e[n]);
  }), r;
}
function ut(e, t, r = void 0) {
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
const Ia = (e) => e, lu = () => {
  let e = Ia;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ia;
    }
  };
}, cu = lu(), us = cu, ds = {
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
  const n = ds[t];
  return n ? `${r}-${n}` : `${us.generate(e)}-${t}`;
}
function wt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = rt(e, o, r);
  }), n;
}
function pu(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
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
const uu = ["values", "unit", "step"], du = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => R({}, r, {
    [n.key]: n.val
  }), {});
};
function fu(e) {
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
  } = e, o = he(e, uu), a = du(t), i = Object.keys(a);
  function l(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - n / 100}${r})`;
  }
  function u(g, p) {
    const h = i.indexOf(p);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${r}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : p) - n / 100}${r})`;
  }
  function f(g) {
    return i.indexOf(g) + 1 < i.length ? u(g, i[i.indexOf(g) + 1]) : l(g);
  }
  function v(g) {
    const p = i.indexOf(g);
    return p === 0 ? l(i[1]) : p === i.length - 1 ? c(i[p]) : u(g, i[i.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return R({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: u,
    only: f,
    not: v,
    unit: r
  }, o);
}
const mu = {
  borderRadius: 4
}, hu = mu, gu = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, xt = gu;
function Er(e, t) {
  return t ? st(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Po = {
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
}, Aa = {
  // Sorted ASC by size. That's important.
  // It can't be configured as it's used statically for propTypes.
  keys: ["xs", "sm", "md", "lg", "xl"],
  up: (e) => `@media (min-width:${Po[e]}px)`
};
function ct(e, t, r) {
  const n = e.theme || {};
  if (Array.isArray(t)) {
    const a = n.breakpoints || Aa;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = r(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = n.breakpoints || Aa;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Po).indexOf(l) !== -1) {
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
function bu(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function vu(e, t) {
  return e.reduce((r, n) => {
    const o = r[n];
    return (!o || Object.keys(o).length === 0) && delete r[n], r;
  }, t);
}
function En(e, t, r = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && r) {
    const n = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (n != null)
      return n;
  }
  return t.split(".").reduce((n, o) => n && n[o] != null ? n[o] : null, e);
}
function ln(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = En(e, r) || n, t && (o = t(o, n, e)), o;
}
function ke(e) {
  const {
    prop: t,
    cssProperty: r = e.prop,
    themeKey: n,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const l = i[t], c = i.theme, u = En(c, n) || {};
    return ct(i, l, (v) => {
      let g = ln(u, o, v);
      return v === g && typeof v == "string" && (g = ln(u, o, `${t}${v === "default" ? "" : et(v)}`, v)), r === !1 ? g : {
        [r]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: xt
  } : {}, a.filterProps = [t], a;
}
function yu(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const wu = {
  m: "margin",
  p: "padding"
}, xu = {
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
}, Eu = yu((e) => {
  if (e.length > 2)
    if (Da[e])
      e = Da[e];
    else
      return [e];
  const [t, r] = e.split(""), n = wu[t], o = xu[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), kn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Tn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], ku = [...kn, ...Tn];
function Br(e, t, r, n) {
  var o;
  const a = (o = En(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function fs(e) {
  return Br(e, "spacing", 8, "spacing");
}
function jr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Tu(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = jr(t, r), n), {});
}
function Nu(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = Eu(r), a = Tu(o, n), i = e[r];
  return ct(e, i, a);
}
function ms(e, t) {
  const r = fs(e.theme);
  return Object.keys(e).map((n) => Nu(e, t, n, r)).reduce(Er, {});
}
function ve(e) {
  return ms(e, kn);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? kn.reduce((e, t) => (e[t] = xt, e), {}) : {};
ve.filterProps = kn;
function ye(e) {
  return ms(e, Tn);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Tn.reduce((e, t) => (e[t] = xt, e), {}) : {};
ye.filterProps = Tn;
process.env.NODE_ENV !== "production" && ku.reduce((e, t) => (e[t] = xt, e), {});
function Cu(e = 8) {
  if (e.mui)
    return e;
  const t = fs({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function Nn(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? Er(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function He(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function Ye(e, t) {
  return ke({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Ou = Ye("border", He), Su = Ye("borderTop", He), Ru = Ye("borderRight", He), Pu = Ye("borderBottom", He), $u = Ye("borderLeft", He), _u = Ye("borderColor"), Mu = Ye("borderTopColor"), Iu = Ye("borderRightColor"), Au = Ye("borderBottomColor"), Du = Ye("borderLeftColor"), Bu = Ye("outline", He), ju = Ye("outlineColor"), Cn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Br(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: jr(t, n)
    });
    return ct(e, e.borderRadius, r);
  }
  return null;
};
Cn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: xt
} : {};
Cn.filterProps = ["borderRadius"];
Nn(Ou, Su, Ru, Pu, $u, _u, Mu, Iu, Au, Du, Cn, Bu, ju);
const On = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Br(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: jr(t, n)
    });
    return ct(e, e.gap, r);
  }
  return null;
};
On.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: xt
} : {};
On.filterProps = ["gap"];
const Sn = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Br(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: jr(t, n)
    });
    return ct(e, e.columnGap, r);
  }
  return null;
};
Sn.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: xt
} : {};
Sn.filterProps = ["columnGap"];
const Rn = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Br(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: jr(t, n)
    });
    return ct(e, e.rowGap, r);
  }
  return null;
};
Rn.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: xt
} : {};
Rn.filterProps = ["rowGap"];
const Lu = ke({
  prop: "gridColumn"
}), Vu = ke({
  prop: "gridRow"
}), Fu = ke({
  prop: "gridAutoFlow"
}), zu = ke({
  prop: "gridAutoColumns"
}), Uu = ke({
  prop: "gridAutoRows"
}), Hu = ke({
  prop: "gridTemplateColumns"
}), Gu = ke({
  prop: "gridTemplateRows"
}), Wu = ke({
  prop: "gridTemplateAreas"
}), Xu = ke({
  prop: "gridArea"
});
Nn(On, Sn, Rn, Lu, Vu, Fu, zu, Uu, Hu, Gu, Wu, Xu);
function qt(e, t) {
  return t === "grey" ? t : e;
}
const qu = ke({
  prop: "color",
  themeKey: "palette",
  transform: qt
}), Yu = ke({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: qt
}), Ku = ke({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: qt
});
Nn(qu, Yu, Ku);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Ju = ke({
  prop: "width",
  transform: Ve
}), $o = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Po[r];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ve(r)
      };
    };
    return ct(e, e.maxWidth, t);
  }
  return null;
};
$o.filterProps = ["maxWidth"];
const Zu = ke({
  prop: "minWidth",
  transform: Ve
}), Qu = ke({
  prop: "height",
  transform: Ve
}), ed = ke({
  prop: "maxHeight",
  transform: Ve
}), td = ke({
  prop: "minHeight",
  transform: Ve
});
ke({
  prop: "size",
  cssProperty: "width",
  transform: Ve
});
ke({
  prop: "size",
  cssProperty: "height",
  transform: Ve
});
const rd = ke({
  prop: "boxSizing"
});
Nn(Ju, $o, Zu, Qu, ed, td, rd);
const nd = {
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
    style: Cn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: qt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: qt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: qt
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
    style: On
  },
  rowGap: {
    style: Rn
  },
  columnGap: {
    style: Sn
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
    style: $o
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
}, _o = nd;
function od(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function ad(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function id() {
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
      transform: f,
      style: v
    } = l;
    if (n == null)
      return null;
    if (u === "typography" && n === "inherit")
      return {
        [r]: n
      };
    const g = En(o, u) || {};
    return v ? v(i) : ct(i, n, (h) => {
      let d = ln(g, f, h);
      return h === d && typeof h == "string" && (d = ln(g, f, `${r}${h === "default" ? "" : et(h)}`, h)), c === !1 ? d : {
        [c]: d
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
    const i = (n = a.unstable_sxConfig) != null ? n : _o;
    function l(c) {
      let u = c;
      if (typeof c == "function")
        u = c(a);
      else if (typeof c != "object")
        return c;
      if (!u)
        return null;
      const f = bu(a.breakpoints), v = Object.keys(f);
      let g = f;
      return Object.keys(u).forEach((p) => {
        const h = ad(u[p], a);
        if (h != null)
          if (typeof h == "object")
            if (i[p])
              g = Er(g, e(p, h, a, i));
            else {
              const d = ct({
                theme: a
              }, h, (b) => ({
                [p]: b
              }));
              od(d, h) ? g[p] = t({
                sx: h,
                theme: a
              }) : g = Er(g, d);
            }
          else
            g = Er(g, e(p, h, a, i));
      }), vu(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const hs = id();
hs.filterProps = ["sx"];
const Mo = hs;
function sd(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const ld = ["breakpoints", "palette", "spacing", "shape"];
function Io(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = he(e, ld), l = fu(r), c = Cu(o);
  let u = st({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: R({
      mode: "light"
    }, n),
    spacing: c,
    shape: R({}, hu, a)
  }, i);
  return u.applyStyles = sd, u = t.reduce((f, v) => st(f, v), u), u.unstable_sxConfig = R({}, _o, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Mo({
      sx: v,
      theme: this
    });
  }, u;
}
function cd(e) {
  return Object.keys(e).length === 0;
}
function gs(e = null) {
  const t = T.useContext(kc);
  return !t || cd(t) ? e : t;
}
const pd = Io();
function bs(e = pd) {
  return gs(e);
}
const ud = ["ownerState"], dd = ["variants"], fd = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function md(e) {
  return Object.keys(e).length === 0;
}
function hd(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Zr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const gd = Io(), Ba = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Xr({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return md(t) ? e : t[r] || t;
}
function bd(e) {
  return e ? (t, r) => r[e] : null;
}
function Qr(e, t) {
  let {
    ownerState: r
  } = t, n = he(t, ud);
  const o = typeof e == "function" ? e(R({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => Qr(a, R({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = he(o, dd);
    return a.forEach((c) => {
      let u = !0;
      typeof c.props == "function" ? u = c.props(R({
        ownerState: r
      }, n, r)) : Object.keys(c.props).forEach((f) => {
        (r == null ? void 0 : r[f]) !== c.props[f] && n[f] !== c.props[f] && (u = !1);
      }), u && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(R({
        ownerState: r
      }, n, r)) : c.style));
    }), l;
  }
  return o;
}
function vd(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = gd,
    rootShouldForwardProp: n = Zr,
    slotShouldForwardProp: o = Zr
  } = e, a = (i) => Mo(R({}, i, {
    theme: Xr(R({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Tc(i, (y) => y.filter((C) => !(C != null && C.__mui_systemSx)));
    const {
      name: c,
      slot: u,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = bd(Ba(u))
    } = l, p = he(l, fd), h = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      u && u !== "Root" && u !== "root" || !1
    ), d = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${Ba(u || "Root")}`);
    let x = Zr;
    u === "Root" || u === "root" ? x = n : u ? x = o : hd(i) && (x = void 0);
    const P = Ec(i, R({
      shouldForwardProp: x,
      label: b
    }, p)), w = (y) => typeof y == "function" && y.__emotion_real !== y || Rt(y) ? (C) => Qr(y, R({}, C, {
      theme: Xr({
        theme: C.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, E = (y, ...C) => {
      let N = w(y);
      const I = C ? C.map(w) : [];
      c && g && I.push((k) => {
        const O = Xr(R({}, k, {
          defaultTheme: r,
          themeId: t
        }));
        if (!O.components || !O.components[c] || !O.components[c].styleOverrides)
          return null;
        const $ = O.components[c].styleOverrides, F = {};
        return Object.entries($).forEach(([H, _]) => {
          F[H] = Qr(_, R({}, k, {
            theme: O
          }));
        }), g(k, F);
      }), c && !h && I.push((k) => {
        var O;
        const $ = Xr(R({}, k, {
          defaultTheme: r,
          themeId: t
        })), F = $ == null || (O = $.components) == null || (O = O[c]) == null ? void 0 : O.variants;
        return Qr({
          variants: F
        }, R({}, k, {
          theme: $
        }));
      }), d || I.push(a);
      const D = I.length - C.length;
      if (Array.isArray(y) && D > 0) {
        const k = new Array(D).fill("");
        N = [...y, ...k], N.raw = [...y.raw, ...k];
      }
      const L = P(N, ...I);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${et(u || "")}`), k === void 0 && (k = `Styled(${Fp(i)})`), L.displayName = k;
      }
      return i.muiName && (L.muiName = i.muiName), L;
    };
    return P.withConfig && (E.withConfig = P.withConfig), E;
  };
}
function yd(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : ps(t.components[r].defaultProps, n);
}
function wd({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = bs(r);
  return n && (o = o[n] || o), yd({
    theme: o,
    name: t,
    props: e
  });
}
function Ao(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), pu(e, t, r);
}
function xd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function At(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return At(xd(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Kt(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Kt(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function Pn(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Ed(e) {
  e = At(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (u, f = (u + r / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Pn({
    type: l,
    values: c
  });
}
function ja(e) {
  e = At(e);
  let t = e.type === "hsl" || e.type === "hsla" ? At(Ed(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function La(e, t) {
  const r = ja(e), n = ja(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function cn(e, t) {
  return e = At(e), t = Ao(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Pn(e);
}
function kd(e, t) {
  if (e = At(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return Pn(e);
}
function Td(e, t) {
  if (e = At(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return Pn(e);
}
function Nd(e, t) {
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
const Cd = {
  black: "#000",
  white: "#fff"
}, $r = Cd, Od = {
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
}, Sd = Od, Rd = {
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
}, Lt = Rd, Pd = {
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
}, Vt = Pd, $d = {
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
}, ur = $d, _d = {
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
}, Ft = _d, Md = {
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
}, zt = Md, Id = {
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
}, Ut = Id, Ad = ["mode", "contrastThreshold", "tonalOffset"], Va = {
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
    paper: $r.white,
    default: $r.white
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
}, qn = {
  text: {
    primary: $r.white,
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
    active: $r.white,
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
function Fa(e, t, r, n) {
  const o = n.light || n, a = n.dark || n * 1.5;
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Td(e.main, o) : t === "dark" && (e.dark = kd(e.main, a)));
}
function Dd(e = "light") {
  return e === "dark" ? {
    main: Ft[200],
    light: Ft[50],
    dark: Ft[400]
  } : {
    main: Ft[700],
    light: Ft[400],
    dark: Ft[800]
  };
}
function Bd(e = "light") {
  return e === "dark" ? {
    main: Lt[200],
    light: Lt[50],
    dark: Lt[400]
  } : {
    main: Lt[500],
    light: Lt[300],
    dark: Lt[700]
  };
}
function jd(e = "light") {
  return e === "dark" ? {
    main: Vt[500],
    light: Vt[300],
    dark: Vt[700]
  } : {
    main: Vt[700],
    light: Vt[400],
    dark: Vt[800]
  };
}
function Ld(e = "light") {
  return e === "dark" ? {
    main: zt[400],
    light: zt[300],
    dark: zt[700]
  } : {
    main: zt[700],
    light: zt[500],
    dark: zt[900]
  };
}
function Vd(e = "light") {
  return e === "dark" ? {
    main: Ut[400],
    light: Ut[300],
    dark: Ut[700]
  } : {
    main: Ut[800],
    light: Ut[500],
    dark: Ut[900]
  };
}
function Fd(e = "light") {
  return e === "dark" ? {
    main: ur[400],
    light: ur[300],
    dark: ur[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: ur[500],
    dark: ur[900]
  };
}
function zd(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = he(e, Ad), a = e.primary || Dd(t), i = e.secondary || Bd(t), l = e.error || jd(t), c = e.info || Ld(t), u = e.success || Vd(t), f = e.warning || Fd(t);
  function v(d) {
    const b = La(d, qn.text.primary) >= r ? qn.text.primary : Va.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = La(d, b);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${d}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return b;
  }
  const g = ({
    color: d,
    name: b,
    mainShade: x = 500,
    lightShade: P = 300,
    darkShade: w = 700
  }) => {
    if (d = R({}, d), !d.main && d[x] && (d.main = d[x]), !d.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Kt(11, b ? ` (${b})` : "", x));
    if (typeof d.main != "string")
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
\`color.main\` should be a string, but \`${JSON.stringify(d.main)}\` was provided instead.

Did you intend to use one of the following approaches?

import { green } from "@mui/material/colors";

const theme1 = createTheme({ palette: {
  primary: green,
} });

const theme2 = createTheme({ palette: {
  primary: { main: green[500] },
} });` : Kt(12, b ? ` (${b})` : "", JSON.stringify(d.main)));
    return Fa(d, "light", P, n), Fa(d, "dark", w, n), d.contrastText || (d.contrastText = v(d.main)), d;
  }, p = {
    dark: qn,
    light: Va
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), st(R({
    // A collection of common colors.
    common: R({}, $r),
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
      color: u,
      name: "success"
    }),
    // The grey colors.
    grey: Sd,
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
const Ud = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Hd(e) {
  return Math.round(e * 1e5) / 1e5;
}
const za = {
  textTransform: "uppercase"
}, Ua = '"Roboto", "Helvetica", "Arial", sans-serif';
function Gd(e, t) {
  const r = typeof t == "function" ? t(e) : t, {
    fontFamily: n = Ua,
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
    allVariants: f,
    pxToRem: v
  } = r, g = he(r, Ud);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof u != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((x) => `${x / u * p}rem`), d = (x, P, w, E, y) => R({
    fontFamily: n,
    fontWeight: x,
    fontSize: h(P),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === Ua ? {
    letterSpacing: `${Hd(E / P)}em`
  } : {}, y, f), b = {
    h1: d(a, 96, 1.167, -1.5),
    h2: d(a, 60, 1.2, -0.5),
    h3: d(i, 48, 1.167, 0),
    h4: d(i, 34, 1.235, 0.25),
    h5: d(i, 24, 1.334, 0),
    h6: d(l, 20, 1.6, 0.15),
    subtitle1: d(i, 16, 1.75, 0.15),
    subtitle2: d(l, 14, 1.57, 0.1),
    body1: d(i, 16, 1.5, 0.15),
    body2: d(i, 14, 1.43, 0.15),
    button: d(l, 14, 1.75, 0.4, za),
    caption: d(i, 12, 1.66, 0.4),
    overline: d(i, 12, 2.66, 1, za),
    // TODO v6: Remove handling of 'inherit' variant from the theme as it is already handled in Material UI's Typography component. Also, remember to remove the associated types.
    inherit: {
      fontFamily: "inherit",
      fontWeight: "inherit",
      fontSize: "inherit",
      lineHeight: "inherit",
      letterSpacing: "inherit"
    }
  };
  return st(R({
    htmlFontSize: u,
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
const Wd = 0.2, Xd = 0.14, qd = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Wd})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Xd})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${qd})`].join(",");
}
const Yd = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Kd = Yd, Jd = ["duration", "easing", "delay"], Zd = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, Qd = {
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
function Ha(e) {
  return `${Math.round(e)}ms`;
}
function ef(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function tf(e) {
  const t = R({}, Zd, e.easing), r = R({}, Qd, e.duration);
  return R({
    getAutoHeightDuration: ef,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, u = he(a, Jd);
      if (process.env.NODE_ENV !== "production") {
        const f = (g) => typeof g == "string", v = (g) => !isNaN(parseFloat(g));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(u).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(u).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : Ha(i)} ${l} ${typeof c == "string" ? c : Ha(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
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
}, nf = rf, of = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function af(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = he(e, of);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Kt(18));
  const l = zd(n), c = Io(e);
  let u = st(c, {
    mixins: Nd(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Kd.slice(),
    typography: Gd(l, a),
    transitions: tf(o),
    zIndex: R({}, nf)
  });
  if (u = st(u, i), u = t.reduce((f, v) => st(f, v), u), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (g, p) => {
      let h;
      for (h in g) {
        const d = g[h];
        if (f.indexOf(h) !== -1 && Object.keys(d).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const b = rt("", h);
            console.error([`MUI: The \`${p}\` component increases the CSS specificity of the \`${h}\` internal state.`, "You can not override it like this: ", JSON.stringify(g, null, 2), "", `Instead, you need to use the '&.${b}' syntax:`, JSON.stringify({
              root: {
                [`&.${b}`]: d
              }
            }, null, 2), "", "https://mui.com/r/state-classes-guide"].join(`
`));
          }
          g[h] = {};
        }
      }
    };
    Object.keys(u.components).forEach((g) => {
      const p = u.components[g].styleOverrides;
      p && g.indexOf("Mui") === 0 && v(p, g);
    });
  }
  return u.unstable_sxConfig = R({}, _o, i == null ? void 0 : i.unstable_sxConfig), u.unstable_sx = function(v) {
    return Mo({
      sx: v,
      theme: this
    });
  }, u;
}
const sf = af(), Do = sf, Bo = "$$material";
function dt({
  props: e,
  name: t
}) {
  return wd({
    props: e,
    name: t,
    defaultTheme: Do,
    themeId: Bo
  });
}
const vs = (e) => Zr(e) && e !== "classes", lf = vd({
  themeId: Bo,
  defaultTheme: Do,
  rootShouldForwardProp: vs
}), Re = lf;
function cf(e) {
  return rt("MuiSvgIcon", e);
}
wt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const pf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], uf = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${et(t)}`, `fontSize${et(r)}`]
  };
  return ut(o, cf, n);
}, df = Re("svg", {
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
  var r, n, o, a, i, l, c, u, f, v, g, p, h;
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
      large: ((u = e.typography) == null || (f = u.pxToRem) == null ? void 0 : f.call(u, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), jo = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = dt({
    props: t,
    name: "MuiSvgIcon"
  }), {
    children: o,
    className: a,
    color: i = "inherit",
    component: l = "svg",
    fontSize: c = "medium",
    htmlColor: u,
    inheritViewBox: f = !1,
    titleAccess: v,
    viewBox: g = "0 0 24 24"
  } = n, p = he(n, pf), h = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", d = R({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: g,
    hasSvgAsChild: h
  }), b = {};
  f || (b.viewBox = g);
  const x = uf(d);
  return /* @__PURE__ */ B(df, R({
    as: l,
    className: Oe(x.root, a),
    focusable: "false",
    color: u,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: r
  }, b, p, h && o.props, {
    ownerState: d,
    children: [h ? o.props.children : o, v ? /* @__PURE__ */ m("title", {
      children: v
    }) : null]
  }));
});
process.env.NODE_ENV !== "production" && (jo.propTypes = {
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
jo.muiName = "SvgIcon";
const Ga = jo;
function ys(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ m(Ga, R({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Ga.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(r));
}
const ff = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), us.configure(e);
  }
}, mf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: et,
  createChainedFunction: so,
  createSvgIcon: ys,
  debounce: rs,
  deprecatedPropType: Up,
  isMuiElement: Hp,
  ownerDocument: Se,
  ownerWindow: Jt,
  requirePropFactory: Gp,
  setRef: sn,
  unstable_ClassNameGenerator: ff,
  unstable_useEnhancedEffect: It,
  unstable_useId: ns,
  unsupportedProp: qp,
  useControlled: os,
  useEventCallback: Pr,
  useForkRef: We,
  useIsFocusVisible: as
}, Symbol.toStringTag, { value: "Module" })), hf = /* @__PURE__ */ xp(mf);
var Wa;
function gf() {
  return Wa || (Wa = 1, function(e) {
    "use client";
    Object.defineProperty(e, "__esModule", {
      value: !0
    }), Object.defineProperty(e, "default", {
      enumerable: !0,
      get: function() {
        return t.createSvgIcon;
      }
    });
    var t = hf;
  }(Vn)), Vn;
}
var bf = Ep;
Object.defineProperty(Oo, "__esModule", {
  value: !0
});
var ws = Oo.default = void 0, vf = bf(gf()), yf = Il;
ws = Oo.default = (0, vf.default)(/* @__PURE__ */ (0, yf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function xs(e) {
  return typeof e == "string";
}
function vr(e, t, r) {
  return e === void 0 || xs(e) ? t : R({}, t, {
    ownerState: R({}, t.ownerState, r)
  });
}
const wf = {
  disableDefaultClasses: !1
}, xf = /* @__PURE__ */ T.createContext(wf);
function Ef(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(xf);
  return (r) => t ? "" : e(r);
}
function Es(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function kf(e, t, r) {
  return typeof e == "function" ? e(t, r) : e;
}
function Xa(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((r) => !(r.match(/^on[A-Z]/) && typeof e[r] == "function")).forEach((r) => {
    t[r] = e[r];
  }), t;
}
function Tf(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Oe(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = R({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), d = R({}, r, o, n);
    return p.length > 0 && (d.className = p), Object.keys(h).length > 0 && (d.style = h), {
      props: d,
      internalRef: void 0
    };
  }
  const i = Es(R({}, o, n)), l = Xa(n), c = Xa(o), u = t(i), f = Oe(u == null ? void 0 : u.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = R({}, u == null ? void 0 : u.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = R({}, u, r, c, l);
  return f.length > 0 && (g.className = f), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: u.ref
  };
}
const Nf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Dt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = he(e, Nf), l = a ? {} : kf(n, o), {
    props: c,
    internalRef: u
  } = Tf(R({}, i, {
    externalSlotProps: l
  })), f = We(u, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return vr(r, R({}, c, {
    ref: f
  }), o);
}
const ks = "base";
function Cf(e) {
  return `${ks}--${e}`;
}
function Of(e, t) {
  return `${ks}-${e}-${t}`;
}
function Ts(e, t) {
  const r = ds[t];
  return r ? Cf(r) : Of(e, t);
}
function Sf(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Ts(e, n);
  }), r;
}
const Rf = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Pf(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function $f(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function _f(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || $f(e));
}
function Mf(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll(Rf)).forEach((n, o) => {
    const a = Pf(n);
    a === -1 || !_f(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function If() {
  return !0;
}
function pn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = Mf,
    isEnabled: i = If,
    open: l
  } = e, c = T.useRef(!1), u = T.useRef(null), f = T.useRef(null), v = T.useRef(null), g = T.useRef(null), p = T.useRef(!1), h = T.useRef(null), d = We(t.ref, h), b = T.useRef(null);
  T.useEffect(() => {
    !l || !h.current || (p.current = !r);
  }, [r, l]), T.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Se(h.current);
    return h.current.contains(w.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Se(h.current), E = (N) => {
      b.current = N, !(n || !i() || N.key !== "Tab") && w.activeElement === h.current && N.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const N = h.current;
      if (N === null)
        return;
      if (!w.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (N.contains(w.activeElement) || n && w.activeElement !== u.current && w.activeElement !== f.current)
        return;
      if (w.activeElement !== g.current)
        g.current = null;
      else if (g.current !== null)
        return;
      if (!p.current)
        return;
      let I = [];
      if ((w.activeElement === u.current || w.activeElement === f.current) && (I = a(h.current)), I.length > 0) {
        var D, L;
        const k = !!((D = b.current) != null && D.shiftKey && ((L = b.current) == null ? void 0 : L.key) === "Tab"), O = I[0], $ = I[I.length - 1];
        typeof O != "string" && typeof $ != "string" && (k ? $.focus() : O.focus());
      } else
        N.focus();
    };
    w.addEventListener("focusin", y), w.addEventListener("keydown", E, !0);
    const C = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(C), w.removeEventListener("focusin", y), w.removeEventListener("keydown", E, !0);
    };
  }, [r, n, o, i, l, a]);
  const x = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0, g.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, P = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ B(T.Fragment, {
    children: [/* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: P,
      ref: u,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: d,
      onFocus: x
    }), /* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: P,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (pn.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Ar,
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
process.env.NODE_ENV !== "production" && (pn["propTypes"] = es(pn.propTypes));
function Af(e) {
  return typeof e == "function" ? e() : e;
}
const _r = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = T.useState(null), c = We(/* @__PURE__ */ T.isValidElement(n) ? n.ref : null, r);
  if (It(() => {
    a || l(Af(o) || document.body);
  }, [o, a]), It(() => {
    if (i && !a)
      return sn(r, i), () => {
        sn(r, null);
      };
  }, [r, i, a]), a) {
    if (/* @__PURE__ */ T.isValidElement(n)) {
      const u = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(n, u);
    }
    return /* @__PURE__ */ m(T.Fragment, {
      children: n
    });
  }
  return /* @__PURE__ */ m(T.Fragment, {
    children: i && /* @__PURE__ */ Nc.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (_r.propTypes = {
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
process.env.NODE_ENV !== "production" && (_r["propTypes"] = es(_r.propTypes));
function Df(e) {
  const t = Se(e);
  return t.body === e ? Jt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function kr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function qa(e) {
  return parseInt(Jt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Bf(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function Ya(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !Bf(i);
    l && c && kr(i, o);
  });
}
function Yn(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function jf(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (Df(n)) {
      const i = is(Se(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${qa(n) + i}px`;
      const l = Se(n).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        r.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${qa(c) + i}px`;
      });
    }
    let a;
    if (n.parentNode instanceof DocumentFragment)
      a = Se(n).body;
    else {
      const i = n.parentElement, l = Jt(n);
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
function Lf(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class Vf {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && kr(t.modalRef, !1);
    const o = Lf(r);
    Ya(r, t.mount, t.modalRef, o, !0);
    const a = Yn(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = Yn(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = jf(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = Yn(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && kr(t.modalRef, r), Ya(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && kr(i.modalRef, !1);
    }
    return n;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Ff(e) {
  return typeof e == "function" ? e() : e;
}
function zf(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Uf = new Vf();
function Hf(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Uf,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: u,
    open: f,
    rootRef: v
  } = e, g = T.useRef({}), p = T.useRef(null), h = T.useRef(null), d = We(h, v), [b, x] = T.useState(!f), P = zf(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const E = () => Se(p.current), y = () => (g.current.modalRef = h.current, g.current.mount = p.current, g.current), C = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, N = Pr(() => {
    const _ = Ff(t) || E().body;
    o.add(y(), _), h.current && C();
  }), I = T.useCallback(() => o.isTopModal(y()), [o]), D = Pr((_) => {
    p.current = _, _ && (f && I() ? C() : h.current && kr(h.current, w));
  }), L = T.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    L();
  }, [L]), T.useEffect(() => {
    f ? N() : (!P || !a) && L();
  }, [f, L, P, a, N]);
  const k = (_) => (z) => {
    var te;
    (te = _.onKeyDown) == null || te.call(_, z), !(z.key !== "Escape" || z.which === 229 || // Wait until IME is settled.
    !I()) && (r || (z.stopPropagation(), u && u(z, "escapeKeyDown")));
  }, O = (_) => (z) => {
    var te;
    (te = _.onClick) == null || te.call(_, z), z.target === z.currentTarget && u && u(z, "backdropClick");
  };
  return {
    getRootProps: (_ = {}) => {
      const z = Es(e);
      delete z.onTransitionEnter, delete z.onTransitionExited;
      const te = R({}, z, _);
      return R({
        role: "presentation"
      }, te, {
        onKeyDown: k(te),
        ref: d
      });
    },
    getBackdropProps: (_ = {}) => {
      const z = _;
      return R({
        "aria-hidden": !0
      }, z, {
        onClick: O(z),
        open: f
      });
    },
    getTransitionProps: () => {
      const _ = () => {
        x(!1), i && i();
      }, z = () => {
        x(!0), l && l(), a && L();
      };
      return {
        onEnter: so(_, c == null ? void 0 : c.props.onEnter),
        onExited: so(z, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: d,
    portalRef: D,
    isTopModal: I,
    exited: b,
    hasTransition: P
  };
}
var Me = "top", Xe = "bottom", qe = "right", Ie = "left", Lo = "auto", Lr = [Me, Xe, qe, Ie], Zt = "start", Mr = "end", Gf = "clippingParents", Ns = "viewport", dr = "popper", Wf = "reference", Ka = /* @__PURE__ */ Lr.reduce(function(e, t) {
  return e.concat([t + "-" + Zt, t + "-" + Mr]);
}, []), Cs = /* @__PURE__ */ [].concat(Lr, [Lo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Zt, t + "-" + Mr]);
}, []), Xf = "beforeRead", qf = "read", Yf = "afterRead", Kf = "beforeMain", Jf = "main", Zf = "afterMain", Qf = "beforeWrite", em = "write", tm = "afterWrite", rm = [Xf, qf, Yf, Kf, Jf, Zf, Qf, em, tm];
function tt(e) {
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
function Bt(e) {
  var t = ze(e).Element;
  return e instanceof t || e instanceof Element;
}
function Ge(e) {
  var t = ze(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Vo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = ze(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function nm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !Ge(a) || !tt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function om(e) {
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
      !Ge(o) || !tt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const am = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: nm,
  effect: om,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var _t = Math.max, un = Math.min, Qt = Math.round;
function po() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Os() {
  return !/^((?!chrome|android).)*safari/i.test(po());
}
function er(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && Qt(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Qt(n.height) / e.offsetHeight || 1);
  var i = Bt(e) ? ze(e) : window, l = i.visualViewport, c = !Os() && r, u = (n.left + (c && l ? l.offsetLeft : 0)) / o, f = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, g = n.height / a;
  return {
    width: v,
    height: g,
    top: f,
    right: u + v,
    bottom: f + g,
    left: u,
    x: u,
    y: f
  };
}
function Fo(e) {
  var t = er(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Ss(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Vo(r)) {
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
  return ze(e).getComputedStyle(e);
}
function im(e) {
  return ["table", "td", "th"].indexOf(tt(e)) >= 0;
}
function Et(e) {
  return ((Bt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function $n(e) {
  return tt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Vo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Et(e)
  );
}
function Ja(e) {
  return !Ge(e) || // https://github.com/popperjs/popper-core/issues/837
  pt(e).position === "fixed" ? null : e.offsetParent;
}
function sm(e) {
  var t = /firefox/i.test(po()), r = /Trident/i.test(po());
  if (r && Ge(e)) {
    var n = pt(e);
    if (n.position === "fixed")
      return null;
  }
  var o = $n(e);
  for (Vo(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(tt(o)) < 0; ) {
    var a = pt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function Vr(e) {
  for (var t = ze(e), r = Ja(e); r && im(r) && pt(r).position === "static"; )
    r = Ja(r);
  return r && (tt(r) === "html" || tt(r) === "body" && pt(r).position === "static") ? t : r || sm(e) || t;
}
function zo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Tr(e, t, r) {
  return _t(e, un(t, r));
}
function lm(e, t, r) {
  var n = Tr(e, t, r);
  return n > r ? r : n;
}
function Rs() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function Ps(e) {
  return Object.assign({}, Rs(), e);
}
function $s(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var cm = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, Ps(typeof t != "number" ? t : $s(t, Lr));
};
function pm(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = Ze(r.placement), c = zo(l), u = [Ie, qe].indexOf(l) >= 0, f = u ? "height" : "width";
  if (!(!a || !i)) {
    var v = cm(o.padding, r), g = Fo(a), p = c === "y" ? Me : Ie, h = c === "y" ? Xe : qe, d = r.rects.reference[f] + r.rects.reference[c] - i[c] - r.rects.popper[f], b = i[c] - r.rects.reference[c], x = Vr(a), P = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = d / 2 - b / 2, E = v[p], y = P - g[f] - v[h], C = P / 2 - g[f] / 2 + w, N = Tr(E, C, y), I = c;
    r.modifiersData[n] = (t = {}, t[I] = N, t.centerOffset = N - C, t);
  }
}
function um(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Ss(t.elements.popper, o) && (t.elements.arrow = o));
}
const dm = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: pm,
  effect: um,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function tr(e) {
  return e.split("-")[1];
}
var fm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function mm(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Qt(r * o) / o || 0,
    y: Qt(n * o) / o || 0
  };
}
function Za(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, u = e.adaptive, f = e.roundOffsets, v = e.isFixed, g = i.x, p = g === void 0 ? 0 : g, h = i.y, d = h === void 0 ? 0 : h, b = typeof f == "function" ? f({
    x: p,
    y: d
  }) : {
    x: p,
    y: d
  };
  p = b.x, d = b.y;
  var x = i.hasOwnProperty("x"), P = i.hasOwnProperty("y"), w = Ie, E = Me, y = window;
  if (u) {
    var C = Vr(r), N = "clientHeight", I = "clientWidth";
    if (C === ze(r) && (C = Et(r), pt(C).position !== "static" && l === "absolute" && (N = "scrollHeight", I = "scrollWidth")), C = C, o === Me || (o === Ie || o === qe) && a === Mr) {
      E = Xe;
      var D = v && C === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[N]
      );
      d -= D - n.height, d *= c ? 1 : -1;
    }
    if (o === Ie || (o === Me || o === Xe) && a === Mr) {
      w = qe;
      var L = v && C === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[I]
      );
      p -= L - n.width, p *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, u && fm), O = f === !0 ? mm({
    x: p,
    y: d
  }, ze(r)) : {
    x: p,
    y: d
  };
  if (p = O.x, d = O.y, c) {
    var $;
    return Object.assign({}, k, ($ = {}, $[E] = P ? "0" : "", $[w] = x ? "0" : "", $.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + d + "px)" : "translate3d(" + p + "px, " + d + "px, 0)", $));
  }
  return Object.assign({}, k, (t = {}, t[E] = P ? d + "px" : "", t[w] = x ? p + "px" : "", t.transform = "", t));
}
function hm(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, u = {
    placement: Ze(t.placement),
    variation: tr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Za(Object.assign({}, u, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Za(Object.assign({}, u, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const gm = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: hm,
  data: {}
};
var qr = {
  passive: !0
};
function bm(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = ze(t.elements.popper), u = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && u.forEach(function(f) {
    f.addEventListener("scroll", r.update, qr);
  }), l && c.addEventListener("resize", r.update, qr), function() {
    a && u.forEach(function(f) {
      f.removeEventListener("scroll", r.update, qr);
    }), l && c.removeEventListener("resize", r.update, qr);
  };
}
const vm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: bm,
  data: {}
};
var ym = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function en(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return ym[t];
  });
}
var wm = {
  start: "end",
  end: "start"
};
function Qa(e) {
  return e.replace(/start|end/g, function(t) {
    return wm[t];
  });
}
function Uo(e) {
  var t = ze(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Ho(e) {
  return er(Et(e)).left + Uo(e).scrollLeft;
}
function xm(e, t) {
  var r = ze(e), n = Et(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var u = Os();
    (u || !u && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Ho(e),
    y: c
  };
}
function Em(e) {
  var t, r = Et(e), n = Uo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = _t(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = _t(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + Ho(e), c = -n.scrollTop;
  return pt(o || r).direction === "rtl" && (l += _t(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function Go(e) {
  var t = pt(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function _s(e) {
  return ["html", "body", "#document"].indexOf(tt(e)) >= 0 ? e.ownerDocument.body : Ge(e) && Go(e) ? e : _s($n(e));
}
function Nr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = _s(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = ze(n), i = o ? [a].concat(a.visualViewport || [], Go(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Nr($n(i)))
  );
}
function uo(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function km(e, t) {
  var r = er(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ei(e, t, r) {
  return t === Ns ? uo(xm(e, r)) : Bt(t) ? km(t, r) : uo(Em(Et(e)));
}
function Tm(e) {
  var t = Nr($n(e)), r = ["absolute", "fixed"].indexOf(pt(e).position) >= 0, n = r && Ge(e) ? Vr(e) : e;
  return Bt(n) ? t.filter(function(o) {
    return Bt(o) && Ss(o, n) && tt(o) !== "body";
  }) : [];
}
function Nm(e, t, r, n) {
  var o = t === "clippingParents" ? Tm(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, u) {
    var f = ei(e, u, n);
    return c.top = _t(f.top, c.top), c.right = un(f.right, c.right), c.bottom = un(f.bottom, c.bottom), c.left = _t(f.left, c.left), c;
  }, ei(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ms(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Ze(n) : null, a = n ? tr(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
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
    case qe:
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
  var u = o ? zo(o) : null;
  if (u != null) {
    var f = u === "y" ? "height" : "width";
    switch (a) {
      case Zt:
        c[u] = c[u] - (t[f] / 2 - r[f] / 2);
        break;
      case Mr:
        c[u] = c[u] + (t[f] / 2 - r[f] / 2);
        break;
    }
  }
  return c;
}
function Ir(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? Gf : l, u = r.rootBoundary, f = u === void 0 ? Ns : u, v = r.elementContext, g = v === void 0 ? dr : v, p = r.altBoundary, h = p === void 0 ? !1 : p, d = r.padding, b = d === void 0 ? 0 : d, x = Ps(typeof b != "number" ? b : $s(b, Lr)), P = g === dr ? Wf : dr, w = e.rects.popper, E = e.elements[h ? P : g], y = Nm(Bt(E) ? E : E.contextElement || Et(e.elements.popper), c, f, i), C = er(e.elements.reference), N = Ms({
    reference: C,
    element: w,
    strategy: "absolute",
    placement: o
  }), I = uo(Object.assign({}, w, N)), D = g === dr ? I : C, L = {
    top: y.top - D.top + x.top,
    bottom: D.bottom - y.bottom + x.bottom,
    left: y.left - D.left + x.left,
    right: D.right - y.right + x.right
  }, k = e.modifiersData.offset;
  if (g === dr && k) {
    var O = k[o];
    Object.keys(L).forEach(function($) {
      var F = [qe, Xe].indexOf($) >= 0 ? 1 : -1, H = [Me, Xe].indexOf($) >= 0 ? "y" : "x";
      L[$] += O[H] * F;
    });
  }
  return L;
}
function Cm(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, u = c === void 0 ? Cs : c, f = tr(n), v = f ? l ? Ka : Ka.filter(function(h) {
    return tr(h) === f;
  }) : Lr, g = v.filter(function(h) {
    return u.indexOf(h) >= 0;
  });
  g.length === 0 && (g = v);
  var p = g.reduce(function(h, d) {
    return h[d] = Ir(e, {
      placement: d,
      boundary: o,
      rootBoundary: a,
      padding: i
    })[Ze(d)], h;
  }, {});
  return Object.keys(p).sort(function(h, d) {
    return p[h] - p[d];
  });
}
function Om(e) {
  if (Ze(e) === Lo)
    return [];
  var t = en(e);
  return [Qa(e), t, Qa(t)];
}
function Sm(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, u = r.padding, f = r.boundary, v = r.rootBoundary, g = r.altBoundary, p = r.flipVariations, h = p === void 0 ? !0 : p, d = r.allowedAutoPlacements, b = t.options.placement, x = Ze(b), P = x === b, w = c || (P || !h ? [en(b)] : Om(b)), E = [b].concat(w).reduce(function(W, X) {
      return W.concat(Ze(X) === Lo ? Cm(t, {
        placement: X,
        boundary: f,
        rootBoundary: v,
        padding: u,
        flipVariations: h,
        allowedAutoPlacements: d
      }) : X);
    }, []), y = t.rects.reference, C = t.rects.popper, N = /* @__PURE__ */ new Map(), I = !0, D = E[0], L = 0; L < E.length; L++) {
      var k = E[L], O = Ze(k), $ = tr(k) === Zt, F = [Me, Xe].indexOf(O) >= 0, H = F ? "width" : "height", _ = Ir(t, {
        placement: k,
        boundary: f,
        rootBoundary: v,
        altBoundary: g,
        padding: u
      }), z = F ? $ ? qe : Ie : $ ? Xe : Me;
      y[H] > C[H] && (z = en(z));
      var te = en(z), Q = [];
      if (a && Q.push(_[O] <= 0), l && Q.push(_[z] <= 0, _[te] <= 0), Q.every(function(W) {
        return W;
      })) {
        D = k, I = !1;
        break;
      }
      N.set(k, Q);
    }
    if (I)
      for (var S = h ? 3 : 1, M = function(X) {
        var K = E.find(function(J) {
          var q = N.get(J);
          if (q)
            return q.slice(0, X).every(function(Z) {
              return Z;
            });
        });
        if (K)
          return D = K, "break";
      }, U = S; U > 0; U--) {
        var Y = M(U);
        if (Y === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[n]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const Rm = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Sm,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ti(e, t, r) {
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
function ri(e) {
  return [Me, qe, Xe, Ie].some(function(t) {
    return e[t] >= 0;
  });
}
function Pm(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Ir(t, {
    elementContext: "reference"
  }), l = Ir(t, {
    altBoundary: !0
  }), c = ti(i, n), u = ti(l, o, a), f = ri(c), v = ri(u);
  t.modifiersData[r] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: u,
    isReferenceHidden: f,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": v
  });
}
const $m = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Pm
};
function _m(e, t, r) {
  var n = Ze(e), o = [Ie, Me].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Ie, qe].indexOf(n) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Mm(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = Cs.reduce(function(f, v) {
    return f[v] = _m(v, t.rects, a), f;
  }, {}), l = i[t.placement], c = l.x, u = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += u), t.modifiersData[n] = i;
}
const Im = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Mm
};
function Am(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Ms({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Dm = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Am,
  data: {}
};
function Bm(e) {
  return e === "x" ? "y" : "x";
}
function jm(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, u = r.rootBoundary, f = r.altBoundary, v = r.padding, g = r.tether, p = g === void 0 ? !0 : g, h = r.tetherOffset, d = h === void 0 ? 0 : h, b = Ir(t, {
    boundary: c,
    rootBoundary: u,
    padding: v,
    altBoundary: f
  }), x = Ze(t.placement), P = tr(t.placement), w = !P, E = zo(x), y = Bm(E), C = t.modifiersData.popperOffsets, N = t.rects.reference, I = t.rects.popper, D = typeof d == "function" ? d(Object.assign({}, t.rects, {
    placement: t.placement
  })) : d, L = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, O = {
    x: 0,
    y: 0
  };
  if (C) {
    if (a) {
      var $, F = E === "y" ? Me : Ie, H = E === "y" ? Xe : qe, _ = E === "y" ? "height" : "width", z = C[E], te = z + b[F], Q = z - b[H], S = p ? -I[_] / 2 : 0, M = P === Zt ? N[_] : I[_], U = P === Zt ? -I[_] : -N[_], Y = t.elements.arrow, W = p && Y ? Fo(Y) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Rs(), K = X[F], J = X[H], q = Tr(0, N[_], W[_]), Z = w ? N[_] / 2 - S - q - K - L.mainAxis : M - q - K - L.mainAxis, ee = w ? -N[_] / 2 + S + q + J + L.mainAxis : U + q + J + L.mainAxis, se = t.elements.arrow && Vr(t.elements.arrow), j = se ? E === "y" ? se.clientTop || 0 : se.clientLeft || 0 : 0, re = ($ = k == null ? void 0 : k[E]) != null ? $ : 0, A = z + Z - re - j, le = z + ee - re, Te = Tr(p ? un(te, A) : te, z, p ? _t(Q, le) : Q);
      C[E] = Te, O[E] = Te - z;
    }
    if (l) {
      var Pe, Ee = E === "x" ? Me : Ie, kt = E === "x" ? Xe : qe, $e = C[y], nt = y === "y" ? "height" : "width", Be = $e + b[Ee], ot = $e - b[kt], Ne = [Me, Ie].indexOf(x) !== -1, jt = (Pe = k == null ? void 0 : k[y]) != null ? Pe : 0, Tt = Ne ? Be : $e - N[nt] - I[nt] - jt + L.altAxis, or = Ne ? $e + N[nt] + I[nt] - jt - L.altAxis : ot, zr = p && Ne ? lm(Tt, $e, or) : Tr(p ? Tt : Be, $e, p ? or : ot);
      C[y] = zr, O[y] = zr - $e;
    }
    t.modifiersData[n] = O;
  }
}
const Lm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: jm,
  requiresIfExists: ["offset"]
};
function Vm(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Fm(e) {
  return e === ze(e) || !Ge(e) ? Uo(e) : Vm(e);
}
function zm(e) {
  var t = e.getBoundingClientRect(), r = Qt(t.width) / e.offsetWidth || 1, n = Qt(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Um(e, t, r) {
  r === void 0 && (r = !1);
  var n = Ge(t), o = Ge(t) && zm(t), a = Et(t), i = er(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((tt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Go(a)) && (l = Fm(t)), Ge(t) ? (c = er(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Ho(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Hm(e) {
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
function Gm(e) {
  var t = Hm(e);
  return rm.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Wm(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function Xm(e) {
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
var ni = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function oi() {
  for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++)
    t[r] = arguments[r];
  return !t.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function qm(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? ni : o;
  return function(l, c, u) {
    u === void 0 && (u = a);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ni, a),
      modifiersData: {},
      elements: {
        reference: l,
        popper: c
      },
      attributes: {},
      styles: {}
    }, v = [], g = !1, p = {
      state: f,
      setOptions: function(x) {
        var P = typeof x == "function" ? x(f.options) : x;
        d(), f.options = Object.assign({}, a, f.options, P), f.scrollParents = {
          reference: Bt(l) ? Nr(l) : l.contextElement ? Nr(l.contextElement) : [],
          popper: Nr(c)
        };
        var w = Gm(Xm([].concat(n, f.options.modifiers)));
        return f.orderedModifiers = w.filter(function(E) {
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
          var x = f.elements, P = x.reference, w = x.popper;
          if (oi(P, w)) {
            f.rects = {
              reference: Um(P, Vr(w), f.options.strategy === "fixed"),
              popper: Fo(w)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(L) {
              return f.modifiersData[L.name] = Object.assign({}, L.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], C = y.fn, N = y.options, I = N === void 0 ? {} : N, D = y.name;
              typeof C == "function" && (f = C({
                state: f,
                options: I,
                name: D,
                instance: p
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Wm(function() {
        return new Promise(function(b) {
          p.forceUpdate(), b(f);
        });
      }),
      destroy: function() {
        d(), g = !0;
      }
    };
    if (!oi(l, c))
      return p;
    p.setOptions(u).then(function(b) {
      !g && u.onFirstUpdate && u.onFirstUpdate(b);
    });
    function h() {
      f.orderedModifiers.forEach(function(b) {
        var x = b.name, P = b.options, w = P === void 0 ? {} : P, E = b.effect;
        if (typeof E == "function") {
          var y = E({
            state: f,
            name: x,
            instance: p,
            options: w
          }), C = function() {
          };
          v.push(y || C);
        }
      });
    }
    function d() {
      v.forEach(function(b) {
        return b();
      }), v = [];
    }
    return p;
  };
}
var Ym = [vm, Dm, gm, am, Im, Rm, Lm, dm, $m], Km = /* @__PURE__ */ qm({
  defaultModifiers: Ym
});
const Is = "Popper";
function Jm(e) {
  return Ts(Is, e);
}
Sf(Is, ["root"]);
const Zm = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], Qm = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function eh(e, t) {
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
function dn(e) {
  return typeof e == "function" ? e() : e;
}
function _n(e) {
  return e.nodeType !== void 0;
}
function th(e) {
  return !_n(e);
}
const rh = () => ut({
  root: ["root"]
}, Ef(Jm)), nh = {}, oh = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const {
    anchorEl: o,
    children: a,
    direction: i,
    disablePortal: l,
    modifiers: c,
    open: u,
    placement: f,
    popperOptions: v,
    popperRef: g,
    slotProps: p = {},
    slots: h = {},
    TransitionProps: d
    // @ts-ignore internal logic
    // prevent from spreading to DOM, it can come from the parent component e.g. Select.
  } = t, b = he(t, Zm), x = T.useRef(null), P = We(x, r), w = T.useRef(null), E = We(w, g), y = T.useRef(E);
  It(() => {
    y.current = E;
  }, [E]), T.useImperativeHandle(g, () => w.current, []);
  const C = eh(f, i), [N, I] = T.useState(C), [D, L] = T.useState(dn(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && L(dn(o));
  }, [o]), It(() => {
    if (!D || !u)
      return;
    const H = (te) => {
      I(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && _n(D) && D.nodeType === 1) {
      const te = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && te.top === 0 && te.left === 0 && te.right === 0 && te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
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
        state: te
      }) => {
        H(te);
      }
    }];
    c != null && (_ = _.concat(c)), v && v.modifiers != null && (_ = _.concat(v.modifiers));
    const z = Km(D, x.current, R({
      placement: C
    }, v, {
      modifiers: _
    }));
    return y.current(z), () => {
      z.destroy(), y.current(null);
    };
  }, [D, l, c, u, v, C]);
  const k = {
    placement: N
  };
  d !== null && (k.TransitionProps = d);
  const O = rh(), $ = (n = h.root) != null ? n : "div", F = Dt({
    elementType: $,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: P
    },
    ownerState: t,
    className: O.root
  });
  return /* @__PURE__ */ m($, R({}, F, {
    children: typeof a == "function" ? a(k) : a
  }));
}), As = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    anchorEl: n,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: u,
    open: f,
    placement: v = "bottom",
    popperOptions: g = nh,
    popperRef: p,
    style: h,
    transition: d = !1,
    slotProps: b = {},
    slots: x = {}
  } = t, P = he(t, Qm), [w, E] = T.useState(!0), y = () => {
    E(!1);
  }, C = () => {
    E(!0);
  };
  if (!c && !f && (!d || w))
    return null;
  let N;
  if (a)
    N = a;
  else if (n) {
    const L = dn(n);
    N = L && _n(L) ? Se(L).body : Se(null).body;
  }
  const I = !f && c && (!d || w) ? "none" : void 0, D = d ? {
    in: f,
    onEnter: y,
    onExited: C
  } : void 0;
  return /* @__PURE__ */ m(_r, {
    disablePortal: l,
    container: N,
    children: /* @__PURE__ */ m(oh, R({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: u,
      ref: r,
      open: d ? !w : f,
      placement: v,
      popperOptions: g,
      popperRef: p,
      slotProps: b,
      slots: x
    }, P, {
      style: R({
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
  anchorEl: nr(s.oneOfType([lt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = dn(e.anchorEl);
      if (t && _n(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || th(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: Ro,
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
function Fr() {
  const e = bs(Do);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Bo] || e;
}
function fo(e, t) {
  return fo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, fo(e, t);
}
function ah(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, fo(e, t);
}
const ai = {
  disabled: !1
};
var ih = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Ds = G.createContext(null);
var sh = function(t) {
  return t.scrollTop;
}, yr = "unmounted", Ct = "exited", Ot = "entering", Xt = "entered", mo = "exiting", ft = /* @__PURE__ */ function(e) {
  ah(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = Ct, a.appearStatus = Ot) : c = Xt : n.unmountOnExit || n.mountOnEnter ? c = yr : c = Ct, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === yr ? {
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
      this.props.in ? i !== Ot && i !== Xt && (a = Ot) : (i === Ot || i === Xt) && (a = mo);
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
          var i = this.props.nodeRef ? this.props.nodeRef.current : Gr.findDOMNode(this);
          i && sh(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ct && this.setState({
        status: yr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Gr.findDOMNode(this), l], u = c[0], f = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
    if (!o && !i || ai.disabled) {
      this.safeSetState({
        status: Xt
      }, function() {
        a.props.onEntered(u);
      });
      return;
    }
    this.props.onEnter(u, f), this.safeSetState({
      status: Ot
    }, function() {
      a.props.onEntering(u, f), a.onTransitionEnd(g, function() {
        a.safeSetState({
          status: Xt
        }, function() {
          a.props.onEntered(u, f);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Gr.findDOMNode(this);
    if (!a || ai.disabled) {
      this.safeSetState({
        status: Ct
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: mo
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Gr.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], u = c[0], f = c[1];
      this.props.addEndListener(u, f);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, r.render = function() {
    var o = this.state.status;
    if (o === yr)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = he(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ G.createElement(Ds.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : G.cloneElement(G.Children.only(i), l))
    );
  }, t;
}(G.Component);
ft.contextType = Ds;
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
    var r = ih;
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
function Ht() {
}
ft.defaultProps = {
  in: !1,
  mountOnEnter: !1,
  unmountOnExit: !1,
  appear: !1,
  enter: !0,
  exit: !0,
  onEnter: Ht,
  onEntering: Ht,
  onEntered: Ht,
  onExit: Ht,
  onExiting: Ht,
  onExited: Ht
};
ft.UNMOUNTED = yr;
ft.EXITED = Ct;
ft.ENTERING = Ot;
ft.ENTERED = Xt;
ft.EXITING = mo;
const Bs = ft, js = (e) => e.scrollTop;
function fn(e, t) {
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
const lh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function ho(e) {
  return `scale(${e}, ${e ** 2})`;
}
const ch = {
  entering: {
    opacity: 1,
    transform: ho(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Kn = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Wo = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    addEndListener: n,
    appear: o = !0,
    children: a,
    easing: i,
    in: l,
    onEnter: c,
    onEntered: u,
    onEntering: f,
    onExit: v,
    onExited: g,
    onExiting: p,
    style: h,
    timeout: d = "auto",
    // eslint-disable-next-line react/prop-types
    TransitionComponent: b = Bs
  } = t, x = he(t, lh), P = br(), w = T.useRef(), E = Fr(), y = T.useRef(null), C = We(y, a.ref, r), N = (H) => (_) => {
    if (H) {
      const z = y.current;
      _ === void 0 ? H(z) : H(z, _);
    }
  }, I = N(f), D = N((H, _) => {
    js(H);
    const {
      duration: z,
      delay: te,
      easing: Q
    } = fn({
      style: h,
      timeout: d,
      easing: i
    }, {
      mode: "enter"
    });
    let S;
    d === "auto" ? (S = E.transitions.getAutoHeightDuration(H.clientHeight), w.current = S) : S = z, H.style.transition = [E.transitions.create("opacity", {
      duration: S,
      delay: te
    }), E.transitions.create("transform", {
      duration: Kn ? S : S * 0.666,
      delay: te,
      easing: Q
    })].join(","), c && c(H, _);
  }), L = N(u), k = N(p), O = N((H) => {
    const {
      duration: _,
      delay: z,
      easing: te
    } = fn({
      style: h,
      timeout: d,
      easing: i
    }, {
      mode: "exit"
    });
    let Q;
    d === "auto" ? (Q = E.transitions.getAutoHeightDuration(H.clientHeight), w.current = Q) : Q = _, H.style.transition = [E.transitions.create("opacity", {
      duration: Q,
      delay: z
    }), E.transitions.create("transform", {
      duration: Kn ? Q : Q * 0.666,
      delay: Kn ? z : z || Q * 0.333,
      easing: te
    })].join(","), H.style.opacity = 0, H.style.transform = ho(0.75), v && v(H);
  }), $ = N(g);
  return /* @__PURE__ */ m(b, R({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: L,
    onEntering: I,
    onExit: O,
    onExited: $,
    onExiting: k,
    addEndListener: (H) => {
      d === "auto" && P.start(w.current || 0, H), n && n(y.current, H);
    },
    timeout: d === "auto" ? null : d
  }, x, {
    children: (H, _) => /* @__PURE__ */ T.cloneElement(a, R({
      style: R({
        opacity: 0,
        transform: ho(0.75),
        visibility: H === "exited" && !l ? "hidden" : void 0
      }, ch[H], h, a.props.style),
      ref: C
    }, _))
  }));
});
process.env.NODE_ENV !== "production" && (Wo.propTypes = {
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
  children: Ar.isRequired,
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
Wo.muiSupportAuto = !0;
const go = Wo, ph = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ii = ph, uh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], dh = Re(As, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Ls = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const o = gs(), a = dt({
    props: t,
    name: "MuiPopper"
  }), {
    anchorEl: i,
    component: l,
    components: c,
    componentsProps: u,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: d,
    popperOptions: b,
    popperRef: x,
    transition: P,
    slots: w,
    slotProps: E
  } = a, y = he(a, uh), C = (n = w == null ? void 0 : w.root) != null ? n : c == null ? void 0 : c.Root, N = R({
    anchorEl: i,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: d,
    popperOptions: b,
    popperRef: x,
    transition: P
  }, y);
  return /* @__PURE__ */ m(dh, R({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: C
    },
    slotProps: E ?? u
  }, N, {
    ref: r
  }));
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
  popperRef: Ro,
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
const Vs = Ls;
function fh(e) {
  return rt("MuiTooltip", e);
}
const mh = wt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), bt = mh, hh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function gh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const bh = (e) => {
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
  return ut(i, fh, t);
}, vh = Re(Vs, {
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
}) => R({
  zIndex: (e.vars || e).zIndex.tooltip,
  pointerEvents: "none"
}, !t.disableInteractive && {
  pointerEvents: "auto"
}, !r && {
  pointerEvents: "none"
}, t.arrow && {
  [`&[data-popper-placement*="bottom"] .${bt.arrow}`]: {
    top: 0,
    marginTop: "-0.71em",
    "&::before": {
      transformOrigin: "0 100%"
    }
  },
  [`&[data-popper-placement*="top"] .${bt.arrow}`]: {
    bottom: 0,
    marginBottom: "-0.71em",
    "&::before": {
      transformOrigin: "100% 0"
    }
  },
  [`&[data-popper-placement*="right"] .${bt.arrow}`]: R({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${bt.arrow}`]: R({}, t.isRtl ? {
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
})), yh = Re("div", {
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
}) => R({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : cn(e.palette.grey[700], 0.92),
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
  lineHeight: `${gh(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${bt.popper}[data-popper-placement*="left"] &`]: R({
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
  [`.${bt.popper}[data-popper-placement*="right"] &`]: R({
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
  [`.${bt.popper}[data-popper-placement*="top"] &`]: R({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${bt.popper}[data-popper-placement*="bottom"] &`]: R({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), wh = Re("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : cn(e.palette.grey[700], 0.9),
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
let Yr = !1;
const si = new Dr();
let fr = {
  x: 0,
  y: 0
};
function Kr(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const Fs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, i, l, c, u, f, v, g, p, h, d, b, x, P, w, E, y;
  const C = dt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: N = !1,
    children: I,
    components: D = {},
    componentsProps: L = {},
    describeChild: k = !1,
    disableFocusListener: O = !1,
    disableHoverListener: $ = !1,
    disableInteractive: F = !1,
    disableTouchListener: H = !1,
    enterDelay: _ = 100,
    enterNextDelay: z = 0,
    enterTouchDelay: te = 700,
    followCursor: Q = !1,
    id: S,
    leaveDelay: M = 0,
    leaveTouchDelay: U = 1500,
    onClose: Y,
    onOpen: W,
    open: X,
    placement: K = "bottom",
    PopperComponent: J,
    PopperProps: q = {},
    slotProps: Z = {},
    slots: ee = {},
    title: se,
    TransitionComponent: j = go,
    TransitionProps: re
  } = C, A = he(C, hh), le = /* @__PURE__ */ T.isValidElement(I) ? I : /* @__PURE__ */ m("span", {
    children: I
  }), Te = Fr(), Pe = Te.direction === "rtl", [Ee, kt] = T.useState(), [$e, nt] = T.useState(null), Be = T.useRef(!1), ot = F || Q, Ne = br(), jt = br(), Tt = br(), or = br(), [zr, Ko] = os({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let at = zr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = T.useRef(X !== void 0);
    T.useEffect(() => {
      Ee && Ee.disabled && !ne && se !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [se, Ee, ne]);
  }
  const Mn = ns(S), ar = T.useRef(), Ur = Pr(() => {
    ar.current !== void 0 && (document.body.style.WebkitUserSelect = ar.current, ar.current = void 0), or.clear();
  });
  T.useEffect(() => Ur, [Ur]);
  const Jo = (ne) => {
    si.clear(), Yr = !0, Ko(!0), W && !at && W(ne);
  }, Hr = Pr(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      si.start(800 + M, () => {
        Yr = !1;
      }), Ko(!1), Y && at && Y(ne), Ne.start(Te.transitions.duration.shortest, () => {
        Be.current = !1;
      });
    }
  ), In = (ne) => {
    Be.current && ne.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), jt.clear(), Tt.clear(), _ || Yr && z ? jt.start(Yr ? z : _, () => {
      Jo(ne);
    }) : Jo(ne));
  }, Zo = (ne) => {
    jt.clear(), Tt.start(M, () => {
      Hr(ne);
    });
  }, {
    isFocusVisibleRef: Qo,
    onBlur: El,
    onFocus: kl,
    ref: Tl
  } = as(), [, ea] = T.useState(!1), ta = (ne) => {
    El(ne), Qo.current === !1 && (ea(!1), Zo(ne));
  }, ra = (ne) => {
    Ee || kt(ne.currentTarget), kl(ne), Qo.current === !0 && (ea(!0), In(ne));
  }, na = (ne) => {
    Be.current = !0;
    const je = le.props;
    je.onTouchStart && je.onTouchStart(ne);
  }, oa = In, aa = Zo, Nl = (ne) => {
    na(ne), Tt.clear(), Ne.clear(), Ur(), ar.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", or.start(te, () => {
      document.body.style.WebkitUserSelect = ar.current, In(ne);
    });
  }, Cl = (ne) => {
    le.props.onTouchEnd && le.props.onTouchEnd(ne), Ur(), Tt.start(U, () => {
      Hr(ne);
    });
  };
  T.useEffect(() => {
    if (!at)
      return;
    function ne(je) {
      (je.key === "Escape" || je.key === "Esc") && Hr(je);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Hr, at]);
  const Ol = We(le.ref, Tl, kt, r);
  !se && se !== 0 && (at = !1);
  const An = T.useRef(), Sl = (ne) => {
    const je = le.props;
    je.onMouseMove && je.onMouseMove(ne), fr = {
      x: ne.clientX,
      y: ne.clientY
    }, An.current && An.current.update();
  }, ir = {}, Dn = typeof se == "string";
  k ? (ir.title = !at && Dn && !$ ? se : null, ir["aria-describedby"] = at ? Mn : null) : (ir["aria-label"] = Dn ? se : null, ir["aria-labelledby"] = at && !Dn ? Mn : null);
  const Ue = R({}, ir, A, le.props, {
    className: Oe(A.className, le.props.className),
    onTouchStart: na,
    ref: Ol
  }, Q ? {
    onMouseMove: Sl
  } : {});
  process.env.NODE_ENV !== "production" && (Ue["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const sr = {};
  H || (Ue.onTouchStart = Nl, Ue.onTouchEnd = Cl), $ || (Ue.onMouseOver = Kr(oa, Ue.onMouseOver), Ue.onMouseLeave = Kr(aa, Ue.onMouseLeave), ot || (sr.onMouseOver = oa, sr.onMouseLeave = aa)), O || (Ue.onFocus = Kr(ra, Ue.onFocus), Ue.onBlur = Kr(ta, Ue.onBlur), ot || (sr.onFocus = ra, sr.onBlur = ta)), process.env.NODE_ENV !== "production" && le.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));
  const Rl = T.useMemo(() => {
    var ne;
    let je = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (ne = q.popperOptions) != null && ne.modifiers && (je = je.concat(q.popperOptions.modifiers)), R({}, q.popperOptions, {
      modifiers: je
    });
  }, [$e, q]), lr = R({}, C, {
    isRtl: Pe,
    arrow: N,
    disableInteractive: ot,
    placement: K,
    PopperComponentProp: J,
    touch: Be.current
  }), Bn = bh(lr), ia = (n = (o = ee.popper) != null ? o : D.Popper) != null ? n : vh, sa = (a = (i = (l = ee.transition) != null ? l : D.Transition) != null ? i : j) != null ? a : go, la = (c = (u = ee.tooltip) != null ? u : D.Tooltip) != null ? c : yh, ca = (f = (v = ee.arrow) != null ? v : D.Arrow) != null ? f : wh, Pl = vr(ia, R({}, q, (g = Z.popper) != null ? g : L.popper, {
    className: Oe(Bn.popper, q == null ? void 0 : q.className, (p = (h = Z.popper) != null ? h : L.popper) == null ? void 0 : p.className)
  }), lr), $l = vr(sa, R({}, re, (d = Z.transition) != null ? d : L.transition), lr), _l = vr(la, R({}, (b = Z.tooltip) != null ? b : L.tooltip, {
    className: Oe(Bn.tooltip, (x = (P = Z.tooltip) != null ? P : L.tooltip) == null ? void 0 : x.className)
  }), lr), Ml = vr(ca, R({}, (w = Z.arrow) != null ? w : L.arrow, {
    className: Oe(Bn.arrow, (E = (y = Z.arrow) != null ? y : L.arrow) == null ? void 0 : E.className)
  }), lr);
  return /* @__PURE__ */ B(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(le, Ue), /* @__PURE__ */ m(ia, R({
      as: J ?? Vs,
      placement: K,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: fr.y,
          left: fr.x,
          right: fr.x,
          bottom: fr.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: An,
      open: Ee ? at : !1,
      id: Mn,
      transition: !0
    }, sr, Pl, {
      popperOptions: Rl,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ m(sa, R({
        timeout: Te.transitions.duration.shorter
      }, ne, $l, {
        children: /* @__PURE__ */ B(la, R({}, _l, {
          children: [se, N ? /* @__PURE__ */ m(ca, R({}, Ml, {
            ref: nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (Fs.propTypes = {
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
  children: Ar.isRequired,
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
const xh = Fs;
function li(e, t, r) {
  return e ? /* @__PURE__ */ m(Ci, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ m("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function zs(e) {
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
    isDense: f = !0,
    isSubMenuParent: v = !1,
    hasDisabledGutters: g = !1,
    hasDivider: p = !1,
    focusVisibleClassName: h,
    id: d,
    children: b
  } = e, x = /* @__PURE__ */ m(
    dc,
    {
      sx: { lineHeight: 0.8 },
      autoFocus: l,
      className: c,
      disabled: u,
      dense: f,
      disableGutters: g,
      divider: p,
      focusVisibleClassName: h,
      onClick: t,
      id: d,
      children: r ? /* @__PURE__ */ B(yt, { children: [
        li(a, r, !0),
        /* @__PURE__ */ m(fc, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ m(Ci, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ m(ws, {}) }) : li(i, r, !1)
      ] }) : b
    }
  );
  return n ? /* @__PURE__ */ m(xh, { title: n, placement: "right", children: /* @__PURE__ */ m("div", { children: x }) }) : x;
}
function Us(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function Eh(e) {
  const [t, r] = ie(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (u) => {
    r(u.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let u = Us(a).filter((f) => "menuItem" in f.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return u = u.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === n.id
    ), /* @__PURE__ */ m(Xo, { ...e, includedGroups: u });
  };
  return /* @__PURE__ */ B(yt, { children: [
    /* @__PURE__ */ m(zs, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ m(
      mc,
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
const kh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Xo(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = mn(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Us(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(f).sort(
      (h, d) => (h.group.order || 0) - (d.group.order || 0)
    ), g = [];
    v.forEach((h) => {
      kh(h.id, t.items).forEach(
        (d) => g.push({ item: d, isLastItemInGroup: !1 })
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
  const u = c.item.group;
  return /* @__PURE__ */ m("div", { role: "menu", "aria-label": u, children: a.map((f, v) => {
    const { item: g } = f, p = l(f);
    if ("command" in g) {
      const h = g.group + v;
      return /* @__PURE__ */ m(
        zs,
        {
          onClick: (d) => {
            r == null || r(d), n(g);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ m(
      Eh,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      u + g.id
    );
  }) }, u);
}
function Th(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ m(Xo, { ...e, includedGroups: a });
}
function Nh({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ B(
    Oi,
    {
      id: r,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": r,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ m("h3", { "aria-label": n.label, className: `papi-menu-column-header ${a ?? ""}`, children: n.label }),
        /* @__PURE__ */ m(hc, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ m(
          Th,
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
function Ch({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = mn(() => {
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
  return /* @__PURE__ */ m(
    Oi,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: n,
      children: a.map((i, l) => /* @__PURE__ */ m(
        Nh,
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
const Hs = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (Hs.displayName = "ListContext");
const Oh = Hs;
function Sh(e) {
  return rt("MuiList", e);
}
wt("MuiList", ["root", "padding", "dense", "subheader"]);
const Rh = ["children", "className", "component", "dense", "disablePadding", "subheader"], Ph = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return ut({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, Sh, t);
}, $h = Re("ul", {
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
}) => R({
  listStyle: "none",
  margin: 0,
  padding: 0,
  position: "relative"
}, !e.disablePadding && {
  paddingTop: 8,
  paddingBottom: 8
}, e.subheader && {
  paddingTop: 0
})), Gs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = dt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: u
  } = n, f = he(n, Rh), v = T.useMemo(() => ({
    dense: l
  }), [l]), g = R({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = Ph(g);
  return /* @__PURE__ */ m(Oh.Provider, {
    value: v,
    children: /* @__PURE__ */ B($h, R({
      as: i,
      className: Oe(p.root, a),
      ref: r,
      ownerState: g
    }, f, {
      children: [u, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Gs.propTypes = {
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
const _h = Gs, Mh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Jn(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function ci(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function Ws(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function mr(e, t, r, n, o, a) {
  let i = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Ws(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const Xs = /* @__PURE__ */ T.forwardRef(function(t, r) {
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
    onKeyDown: f,
    variant: v = "selectedMenu"
  } = t, g = he(t, Mh), p = T.useRef(null), h = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  It(() => {
    o && p.current.focus();
  }, [o]), T.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (w, E) => {
      const y = !p.current.style.width;
      if (w.clientHeight < p.current.clientHeight && y) {
        const C = `${is(Se(w))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = C, p.current.style.width = `calc(100% + ${C})`;
      }
      return p.current;
    }
  }), []);
  const d = (w) => {
    const E = p.current, y = w.key, C = Se(E).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), mr(E, C, u, c, Jn);
    else if (y === "ArrowUp")
      w.preventDefault(), mr(E, C, u, c, ci);
    else if (y === "Home")
      w.preventDefault(), mr(E, null, u, c, Jn);
    else if (y === "End")
      w.preventDefault(), mr(E, null, u, c, ci);
    else if (y.length === 1) {
      const N = h.current, I = y.toLowerCase(), D = performance.now();
      N.keys.length > 0 && (D - N.lastTime > 500 ? (N.keys = [], N.repeating = !0, N.previousKeyMatched = !0) : N.repeating && I !== N.keys[0] && (N.repeating = !1)), N.lastTime = D, N.keys.push(I);
      const L = C && !N.repeating && Ws(C, N);
      N.previousKeyMatched && (L || mr(E, C, !1, c, Jn, N)) ? w.preventDefault() : N.previousKeyMatched = !1;
    }
    f && f(w);
  }, b = We(p, r);
  let x = -1;
  T.Children.forEach(i, (w, E) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      x === E && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && an.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (v === "selectedMenu" && w.props.selected || x === -1) && (x = E), x === E && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const P = T.Children.map(i, (w, E) => {
    if (E === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ m(_h, R({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: d,
    tabIndex: o ? 0 : -1
  }, g, {
    children: P
  }));
});
process.env.NODE_ENV !== "production" && (Xs.propTypes = {
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
const Ih = Xs, Ah = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Dh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, qs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = Fr(), o = {
    enter: n.transitions.duration.enteringScreen,
    exit: n.transitions.duration.leavingScreen
  }, {
    addEndListener: a,
    appear: i = !0,
    children: l,
    easing: c,
    in: u,
    onEnter: f,
    onEntered: v,
    onEntering: g,
    onExit: p,
    onExited: h,
    onExiting: d,
    style: b,
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: P = Bs
  } = t, w = he(t, Ah), E = T.useRef(null), y = We(E, l.ref, r), C = (F) => (H) => {
    if (F) {
      const _ = E.current;
      H === void 0 ? F(_) : F(_, H);
    }
  }, N = C(g), I = C((F, H) => {
    js(F);
    const _ = fn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    F.style.webkitTransition = n.transitions.create("opacity", _), F.style.transition = n.transitions.create("opacity", _), f && f(F, H);
  }), D = C(v), L = C(d), k = C((F) => {
    const H = fn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    F.style.webkitTransition = n.transitions.create("opacity", H), F.style.transition = n.transitions.create("opacity", H), p && p(F);
  }), O = C(h);
  return /* @__PURE__ */ m(P, R({
    appear: i,
    in: u,
    nodeRef: E,
    onEnter: I,
    onEntered: D,
    onEntering: N,
    onExit: k,
    onExited: O,
    onExiting: L,
    addEndListener: (F) => {
      a && a(E.current, F);
    },
    timeout: x
  }, w, {
    children: (F, H) => /* @__PURE__ */ T.cloneElement(l, R({
      style: R({
        opacity: 0,
        visibility: F === "exited" && !u ? "hidden" : void 0
      }, Dh[F], b, l.props.style),
      ref: y
    }, H))
  }));
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
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
  children: Ar.isRequired,
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
const Bh = qs;
function jh(e) {
  return rt("MuiBackdrop", e);
}
wt("MuiBackdrop", ["root", "invisible"]);
const Lh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Vh = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return ut({
    root: ["root", r && "invisible"]
  }, jh, t);
}, Fh = Re("div", {
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
}) => R({
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
})), Ys = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const i = dt({
    props: t,
    name: "MuiBackdrop"
  }), {
    children: l,
    className: c,
    component: u = "div",
    components: f = {},
    componentsProps: v = {},
    invisible: g = !1,
    open: p,
    slotProps: h = {},
    slots: d = {},
    TransitionComponent: b = Bh,
    transitionDuration: x
  } = i, P = he(i, Lh), w = R({}, i, {
    component: u,
    invisible: g
  }), E = Vh(w), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ m(b, R({
    in: p,
    timeout: x
  }, P, {
    children: /* @__PURE__ */ m(Fh, R({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = d.root) != null ? a : f.Root) != null ? o : u,
      className: Oe(E.root, c, y == null ? void 0 : y.className),
      ownerState: R({}, w, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ys.propTypes = {
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
const zh = Ys;
function Uh(e) {
  return rt("MuiModal", e);
}
wt("MuiModal", ["root", "hidden", "backdrop"]);
const Hh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Gh = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return ut({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, Uh, n);
}, Wh = Re("div", {
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
}) => R({
  position: "fixed",
  zIndex: (e.vars || e).zIndex.modal,
  right: 0,
  bottom: 0,
  top: 0,
  left: 0
}, !t.open && t.exited && {
  visibility: "hidden"
})), Xh = Re(zh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Ks = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const u = dt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = Xh,
    BackdropProps: v,
    className: g,
    closeAfterTransition: p = !1,
    children: h,
    container: d,
    component: b,
    components: x = {},
    componentsProps: P = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: C = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: I = !1,
    hideBackdrop: D = !1,
    keepMounted: L = !1,
    onBackdropClick: k,
    open: O,
    slotProps: $,
    slots: F
    // eslint-disable-next-line react/prop-types
  } = u, H = he(u, Hh), _ = R({}, u, {
    closeAfterTransition: p,
    disableAutoFocus: w,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: C,
    disableRestoreFocus: N,
    disableScrollLock: I,
    hideBackdrop: D,
    keepMounted: L
  }), {
    getRootProps: z,
    getBackdropProps: te,
    getTransitionProps: Q,
    portalRef: S,
    isTopModal: M,
    exited: U,
    hasTransition: Y
  } = Hf(R({}, _, {
    rootRef: r
  })), W = R({}, _, {
    exited: U
  }), X = Gh(W), K = {};
  if (h.props.tabIndex === void 0 && (K.tabIndex = "-1"), Y) {
    const {
      onEnter: re,
      onExited: A
    } = Q();
    K.onEnter = re, K.onExited = A;
  }
  const J = (n = (o = F == null ? void 0 : F.root) != null ? o : x.Root) != null ? n : Wh, q = (a = (i = F == null ? void 0 : F.backdrop) != null ? i : x.Backdrop) != null ? a : f, Z = (l = $ == null ? void 0 : $.root) != null ? l : P.root, ee = (c = $ == null ? void 0 : $.backdrop) != null ? c : P.backdrop, se = Dt({
    elementType: J,
    externalSlotProps: Z,
    externalForwardedProps: H,
    getSlotProps: z,
    additionalProps: {
      ref: r,
      as: b
    },
    ownerState: W,
    className: Oe(g, Z == null ? void 0 : Z.className, X == null ? void 0 : X.root, !W.open && W.exited && (X == null ? void 0 : X.hidden))
  }), j = Dt({
    elementType: q,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (re) => te(R({}, re, {
      onClick: (A) => {
        k && k(A), re != null && re.onClick && re.onClick(A);
      }
    })),
    className: Oe(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: W
  });
  return !L && !O && (!Y || U) ? null : /* @__PURE__ */ m(_r, {
    ref: S,
    container: d,
    disablePortal: C,
    children: /* @__PURE__ */ B(J, R({}, se, {
      children: [!D && f ? /* @__PURE__ */ m(q, R({}, j)) : null, /* @__PURE__ */ m(pn, {
        disableEnforceFocus: E,
        disableAutoFocus: w,
        disableRestoreFocus: N,
        isEnabled: M,
        open: O,
        children: /* @__PURE__ */ T.cloneElement(h, K)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ks.propTypes = {
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
  children: Ar.isRequired,
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
const qh = Ks;
function Yh(e) {
  return rt("MuiPaper", e);
}
wt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Kh = ["className", "component", "elevation", "square", "variant"], Jh = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return ut(a, Yh, o);
}, Zh = Re("div", {
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
  return R({
    backgroundColor: (e.vars || e).palette.background.paper,
    color: (e.vars || e).palette.text.primary,
    transition: e.transitions.create("box-shadow")
  }, !t.square && {
    borderRadius: e.shape.borderRadius
  }, t.variant === "outlined" && {
    border: `1px solid ${(e.vars || e).palette.divider}`
  }, t.variant === "elevation" && R({
    boxShadow: (e.vars || e).shadows[t.elevation]
  }, !e.vars && e.palette.mode === "dark" && {
    backgroundImage: `linear-gradient(${cn("#fff", ii(t.elevation))}, ${cn("#fff", ii(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), Js = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = dt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, u = he(n, Kh), f = R({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = Jh(f);
  return process.env.NODE_ENV !== "production" && Fr().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ m(Zh, R({
    as: a,
    ownerState: f,
    className: Oe(v.root, o),
    ref: r
  }, u));
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
   * Shadow depth, corresponds to `dp` in the spec.
   * It accepts values between 0 and 24 inclusive.
   * @default 1
   */
  elevation: nr(cs, (e) => {
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
const Qh = Js;
function eg(e) {
  return rt("MuiPopover", e);
}
wt("MuiPopover", ["root", "paper"]);
const tg = ["onEntering"], rg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], ng = ["slotProps"];
function pi(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.height / 2 : t === "bottom" && (r = e.height), r;
}
function ui(e, t) {
  let r = 0;
  return typeof t == "number" ? r = t : t === "center" ? r = e.width / 2 : t === "right" && (r = e.width), r;
}
function di(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function tn(e) {
  return typeof e == "function" ? e() : e;
}
const og = (e) => {
  const {
    classes: t
  } = e;
  return ut({
    root: ["root"],
    paper: ["paper"]
  }, eg, t);
}, ag = Re(qh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Zs = Re(Qh, {
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
}), Qs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const i = dt({
    props: t,
    name: "MuiPopover"
  }), {
    action: l,
    anchorEl: c,
    anchorOrigin: u = {
      vertical: "top",
      horizontal: "left"
    },
    anchorPosition: f,
    anchorReference: v = "anchorEl",
    children: g,
    className: p,
    container: h,
    elevation: d = 8,
    marginThreshold: b = 16,
    open: x,
    PaperProps: P = {},
    slots: w,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: C = go,
    transitionDuration: N = "auto",
    TransitionProps: {
      onEntering: I
    } = {},
    disableScrollLock: D = !1
  } = i, L = he(i.TransitionProps, tg), k = he(i, rg), O = (n = E == null ? void 0 : E.paper) != null ? n : P, $ = T.useRef(), F = We($, O.ref), H = R({}, i, {
    anchorOrigin: u,
    anchorReference: v,
    elevation: d,
    marginThreshold: b,
    externalPaperSlotProps: O,
    transformOrigin: y,
    TransitionComponent: C,
    transitionDuration: N,
    TransitionProps: L
  }), _ = og(H), z = T.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const re = tn(c), A = re && re.nodeType === 1 ? re : Se($.current).body, le = A.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: le.top + pi(le, u.vertical),
      left: le.left + ui(le, u.horizontal)
    };
  }, [c, u.horizontal, u.vertical, f, v]), te = T.useCallback((re) => ({
    vertical: pi(re, y.vertical),
    horizontal: ui(re, y.horizontal)
  }), [y.horizontal, y.vertical]), Q = T.useCallback((re) => {
    const A = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, le = te(A);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: di(le)
      };
    const Te = z();
    let Pe = Te.top - le.vertical, Ee = Te.left - le.horizontal;
    const kt = Pe + A.height, $e = Ee + A.width, nt = Jt(tn(c)), Be = nt.innerHeight - b, ot = nt.innerWidth - b;
    if (b !== null && Pe < b) {
      const Ne = Pe - b;
      Pe -= Ne, le.vertical += Ne;
    } else if (b !== null && kt > Be) {
      const Ne = kt - Be;
      Pe -= Ne, le.vertical += Ne;
    }
    if (process.env.NODE_ENV !== "production" && A.height > Be && A.height && Be && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${A.height - Be}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), b !== null && Ee < b) {
      const Ne = Ee - b;
      Ee -= Ne, le.horizontal += Ne;
    } else if ($e > ot) {
      const Ne = $e - ot;
      Ee -= Ne, le.horizontal += Ne;
    }
    return {
      top: `${Math.round(Pe)}px`,
      left: `${Math.round(Ee)}px`,
      transformOrigin: di(le)
    };
  }, [c, v, z, te, b]), [S, M] = T.useState(x), U = T.useCallback(() => {
    const re = $.current;
    if (!re)
      return;
    const A = Q(re);
    A.top !== null && (re.style.top = A.top), A.left !== null && (re.style.left = A.left), re.style.transformOrigin = A.transformOrigin, M(!0);
  }, [Q]);
  T.useEffect(() => (D && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, D, U]);
  const Y = (re, A) => {
    I && I(re, A), U();
  }, W = () => {
    M(!1);
  };
  T.useEffect(() => {
    x && U();
  }), T.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      U();
    }
  } : null, [x, U]), T.useEffect(() => {
    if (!x)
      return;
    const re = rs(() => {
      U();
    }), A = Jt(c);
    return A.addEventListener("resize", re), () => {
      re.clear(), A.removeEventListener("resize", re);
    };
  }, [c, x, U]);
  let X = N;
  N === "auto" && !C.muiSupportAuto && (X = void 0);
  const K = h || (c ? Se(tn(c)).body : void 0), J = (o = w == null ? void 0 : w.root) != null ? o : ag, q = (a = w == null ? void 0 : w.paper) != null ? a : Zs, Z = Dt({
    elementType: q,
    externalSlotProps: R({}, O, {
      style: S ? O.style : R({}, O.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: d,
      ref: F
    },
    ownerState: H,
    className: Oe(_.paper, O == null ? void 0 : O.className)
  }), ee = Dt({
    elementType: J,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: k,
    additionalProps: {
      ref: r,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: K,
      open: x
    },
    ownerState: H,
    className: Oe(_.root, p)
  }), {
    slotProps: se
  } = ee, j = he(ee, ng);
  return /* @__PURE__ */ m(J, R({}, j, !xs(J) && {
    slotProps: se,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ m(C, R({
      appear: !0,
      in: x,
      onEntering: Y,
      onExited: W,
      timeout: X
    }, L, {
      children: /* @__PURE__ */ m(q, R({}, Z, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Qs.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: Ro,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: nr(s.oneOfType([lt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = tn(e.anchorEl);
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
  elevation: cs,
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
    component: Ap
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
const ig = Qs;
function sg(e) {
  return rt("MuiMenu", e);
}
wt("MuiMenu", ["root", "paper", "list"]);
const lg = ["onEntering"], cg = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], pg = {
  vertical: "top",
  horizontal: "right"
}, ug = {
  vertical: "top",
  horizontal: "left"
}, dg = (e) => {
  const {
    classes: t
  } = e;
  return ut({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, sg, t);
}, fg = Re(ig, {
  shouldForwardProp: (e) => vs(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), mg = Re(Zs, {
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
}), hg = Re(Ih, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), el = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o;
  const a = dt({
    props: t,
    name: "MuiMenu"
  }), {
    autoFocus: i = !0,
    children: l,
    className: c,
    disableAutoFocusItem: u = !1,
    MenuListProps: f = {},
    onClose: v,
    open: g,
    PaperProps: p = {},
    PopoverClasses: h,
    transitionDuration: d = "auto",
    TransitionProps: {
      onEntering: b
    } = {},
    variant: x = "selectedMenu",
    slots: P = {},
    slotProps: w = {}
  } = a, E = he(a.TransitionProps, lg), y = he(a, cg), C = Fr(), N = C.direction === "rtl", I = R({}, a, {
    autoFocus: i,
    disableAutoFocusItem: u,
    MenuListProps: f,
    onEntering: b,
    PaperProps: p,
    transitionDuration: d,
    TransitionProps: E,
    variant: x
  }), D = dg(I), L = i && !u && g, k = T.useRef(null), O = (Q, S) => {
    k.current && k.current.adjustStyleForScrollbar(Q, C), b && b(Q, S);
  }, $ = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), v && v(Q, "tabKeyDown"));
  };
  let F = -1;
  T.Children.map(l, (Q, S) => {
    /* @__PURE__ */ T.isValidElement(Q) && (process.env.NODE_ENV !== "production" && an.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (x === "selectedMenu" && Q.props.selected || F === -1) && (F = S));
  });
  const H = (n = P.paper) != null ? n : mg, _ = (o = w.paper) != null ? o : p, z = Dt({
    elementType: P.root,
    externalSlotProps: w.root,
    ownerState: I,
    className: [D.root, c]
  }), te = Dt({
    elementType: H,
    externalSlotProps: _,
    ownerState: I,
    className: D.paper
  });
  return /* @__PURE__ */ m(fg, R({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: N ? "right" : "left"
    },
    transformOrigin: N ? pg : ug,
    slots: {
      paper: H,
      root: P.root
    },
    slotProps: {
      root: z,
      paper: te
    },
    open: g,
    ref: r,
    transitionDuration: d,
    TransitionProps: R({
      onEntering: O
    }, E),
    ownerState: I
  }, y, {
    classes: h,
    children: /* @__PURE__ */ m(hg, R({
      onKeyDown: $,
      actions: k,
      autoFocus: i && (F === -1 || u),
      autoFocusItem: L,
      variant: x
    }, f, {
      className: Oe(D.list, f.className),
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (el.propTypes = {
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
const gg = el;
function Tv({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var u;
  const [o, a] = G.useState(void 0), i = Ce(
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
  ), l = Ce(() => {
    a(void 0);
  }, []), c = mn(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((u = r == null ? void 0 : r.items) == null ? void 0 : u.length) ?? 0) === 0 || !n ? n : /* @__PURE__ */ B(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        n,
        /* @__PURE__ */ m(
          gg,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ m(
              Xo,
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
function bg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const bo = (e, t, r = {}) => {
  const n = $t(t);
  n.current = t;
  const o = $t(r);
  o.current = bg(o.current);
  const [a, i] = ie(() => n.current), [l, c] = ie(!0);
  return Fe(() => {
    let u = !0;
    return c(!!e), (async () => {
      if (e) {
        const f = await e();
        u && (i(() => f), c(!1));
      }
    })(), () => {
      u = !1, o.current.preserveValue || i(() => n.current);
    };
  }, [e]), [a, l];
}, vg = ys(/* @__PURE__ */ m("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function yg({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, u] = ie(!1), [f, v] = ie(!1), g = Ce(() => {
    c && u(!1), v(!1);
  }, [c]), p = Ce((E) => {
    E.stopPropagation(), u((y) => {
      const C = !y;
      return C && E.shiftKey ? v(!0) : C || v(!1), C;
    });
  }, []), h = Ce(
    (E) => (g(), n(E)),
    [n, g]
  ), [d, b] = ie({ top: 1, left: 1 });
  Fe(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), C = window.scrollY, N = window.scrollX, I = y.top + C + E.clientHeight, D = y.left + N;
        b({ top: I, left: D });
      }
    }
  }, [c, o]);
  const [x] = bo(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [P] = bo(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? r ?? x, [e, r, x, c]),
    r ?? x
  ), w = f && P ? P : x;
  return /* @__PURE__ */ B(yt, { children: [
    /* @__PURE__ */ m(
      Si,
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
        children: l ?? /* @__PURE__ */ m(vg, {})
      }
    ),
    /* @__PURE__ */ m(
      gc,
      {
        className: `papi-menu-drawer ${a ?? ""}`,
        anchor: "left",
        variant: "temporary",
        open: c,
        onClose: g,
        PaperProps: {
          className: "papi-menu-drawer-paper",
          style: {
            top: d.top,
            left: d.left
          }
        },
        children: w ? /* @__PURE__ */ m(
          Ch,
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
function Nv({
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
  return /* @__PURE__ */ m(
    Si,
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
const gt = "scrBook", wg = "scrRef", St = "source", xg = "details", Eg = "Scripture Reference", kg = "Scripture Book", tl = "Type", Tg = "Details";
function Ng(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: gt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Eg,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === gt ? Ln(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => no(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => Ln(n.start),
      id: wg,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : Ln(o.start);
      },
      sortingFn: (n, o) => no(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: St,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? tl : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: xg,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Tg,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
function Cv({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, u] = ie([]), [f, v] = ie([{ id: gt, desc: !1 }]), [g, p] = ie(() => e.flatMap((k) => {
    const O = k.source;
    return k.data.map(($) => ({
      ...$,
      source: O
    }));
  })), [h, d] = ie({});
  Fe(() => {
    p(() => e.flatMap((k) => {
      const O = k.source;
      return k.data.map(($) => ({
        ...$,
        source: O
      }));
    }));
  }, [e]);
  const b = mn(
    () => Ng(
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
    c.includes(St) ? v([
      { id: St, desc: !1 },
      { id: gt, desc: !1 }
    ]) : v([{ id: gt, desc: !1 }]);
  }, [c]);
  const x = Ce(
    (k, O) => !O || no(k, O) === 0 ? `${jn(k)}` : `${jn(k)}-${jn(O)}`,
    []
  ), P = Ce(
    (k) => `${x(k.start, k.end)} ${k.source} ${k.detail}`,
    [x]
  ), w = ki({
    data: g,
    columns: b,
    state: {
      grouping: c,
      sorting: f,
      rowSelection: h
    },
    onGroupingChange: u,
    onSortingChange: v,
    onRowSelectionChange: d,
    getExpandedRowModel: sc(),
    getGroupedRowModel: lc(),
    getCoreRowModel: Ti(),
    getSortedRowModel: Ni(),
    getRowId: P,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Fe(() => {
    if (l) {
      const k = w.getSelectedRowModel().rowsById, O = Object.keys(k);
      if (O.length === 1) {
        const $ = g.find((F) => P(F) === O[0]) || void 0;
        $ && l($);
      }
    }
  }, [h, g, P, l, w]);
  const E = o ?? kg, y = a ?? tl, C = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${E}`, value: [gt] },
    { label: `Group by ${y}`, value: [St] },
    {
      label: `Group by ${E} and ${y}`,
      value: [gt, St]
    },
    {
      label: `Group by ${y} and ${E}`,
      value: [St, gt]
    }
  ], N = (k) => {
    u(JSON.parse(k));
  }, I = (k, O) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(O);
  }, D = (k, O) => k.getIsGrouped() ? "" : V("banded-row", O % 2 === 0 ? "even" : "odd"), L = (k, O, $) => {
    if (!((k == null ? void 0 : k.length) === 0 || O.depth < $.column.getGroupedIndex())) {
      if (O.getIsGrouped())
        switch (O.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (O.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ B("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !t && /* @__PURE__ */ B(
      nn,
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          N(k);
        },
        children: [
          /* @__PURE__ */ m(Or, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ m(on, {}) }),
          /* @__PURE__ */ m(Sr, { position: "item-aligned", children: /* @__PURE__ */ m(np, { children: C.map((k) => /* @__PURE__ */ m(Ke, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ B(vn, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ m(yn, { children: w.getHeaderGroups().map((k) => /* @__PURE__ */ m(vt, { children: k.headers.filter((O) => O.column.columnDef.header).map((O) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ m(Rr, { colSpan: O.colSpan, className: "top-0 pr-sticky", children: O.isPlaceholder ? void 0 : /* @__PURE__ */ B("div", { children: [
          O.column.getCanGroup() ? /* @__PURE__ */ m(
            we,
            {
              variant: "ghost",
              title: `Toggle grouping by ${O.column.columnDef.header}`,
              onClick: O.column.getToggleGroupingHandler(),
              type: "button",
              children: O.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          wr(O.column.columnDef.header, O.getContext())
        ] }) }, O.id)
      )) }, k.id)) }),
      /* @__PURE__ */ m(wn, { children: w.getRowModel().rows.map((k, O) => /* @__PURE__ */ m(
        vt,
        {
          "data-state": k.getIsSelected() ? "selected" : "",
          className: V(D(k, O)),
          onClick: ($) => I(k, $),
          children: k.getVisibleCells().map(($) => {
            if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== St || !r)))
              return /* @__PURE__ */ m(
                Yt,
                {
                  className: V(
                    $.column.columnDef.id,
                    "pr-p-[1px]",
                    L(c, k, $)
                  ),
                  children: (() => $.getIsGrouped() ? /* @__PURE__ */ B(
                    we,
                    {
                      variant: "ghost",
                      onClick: k.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        k.getIsExpanded() ? "👇" : "👉",
                        " ",
                        wr($.column.columnDef.cell, $.getContext()),
                        " (",
                        k.subRows.length,
                        ")"
                      ]
                    }
                  ) : wr($.column.columnDef.cell, $.getContext()))()
                },
                $.id
              );
          })
        },
        k.id
      )) })
    ] })
  ] });
}
const Cg = xo(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), rl = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(Ri.Root, { ref: r, className: V(Cg(), e), ...t }));
rl.displayName = Ri.Root.displayName;
function Og({
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
  value: f,
  onChange: v,
  onFocus: g,
  onBlur: p
}) {
  return /* @__PURE__ */ B("div", { className: V("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ m(
      rl,
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
      gn,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: V(c, { "pr-border-red-600": r }),
        defaultValue: u,
        value: f,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ m("p", { className: V({ "pr-hidden": !o }), children: o })
  ] });
}
function Ov({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = ie(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ m(
    Og,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
function Sv({
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
  className: f,
  onChange: v,
  onChangeCommitted: g
}) {
  return /* @__PURE__ */ m(
    bc,
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
      className: `papi-slider ${r} ${f ?? ""}`,
      onChange: v,
      onChangeCommitted: g
    }
  );
}
function Rv({
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
    vc,
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
function Pv({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ m(
    yc,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function $v({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = $t(void 0);
  return /* @__PURE__ */ m("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ m(wc, { position: "static", id: n, children: /* @__PURE__ */ B(xc, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ m(
      yg,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ m("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const _v = De.Root, Sg = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Sg.displayName = De.List.displayName;
const Rg = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Rg.displayName = De.Trigger.displayName;
const Pg = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Pg.displayName = De.Content.displayName;
const $g = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Root,
  {
    orientation: "vertical",
    ref: r,
    className: V("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
$g.displayName = De.List.displayName;
const _g = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
_g.displayName = De.List.displayName;
const Mv = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Trigger,
  {
    ref: r,
    ...t,
    className: V(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Mg = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
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
Mg.displayName = De.Content.displayName;
const Jr = (e) => e === "asc" ? /* @__PURE__ */ m(Kl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ m(Jl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ m(Zl, { className: "pr-ml-2 pr-h-4 pr-w-4" }), Ig = (e, t, r, n, o) => [
  {
    accessorKey: "character",
    header: ({ column: a }) => /* @__PURE__ */ B(we, { onClick: () => a.toggleSorting(void 0), children: [
      e,
      Jr(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: a }) => /* @__PURE__ */ B(we, { onClick: () => a.toggleSorting(void 0), children: [
      t,
      Jr(a.getIsSorted())
    ] }),
    cell: ({ row: a }) => a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: a }) => /* @__PURE__ */ B(we, { onClick: () => a.toggleSorting(void 0), children: [
      r,
      Jr(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: a, table: i }) => {
      const l = i.getSelectedRowModel().rows, c = [];
      return l.forEach((u) => {
        c.push(u.getValue("character"));
      }), /* @__PURE__ */ B("div", { children: [
        /* @__PURE__ */ m("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ B(we, { onClick: () => a.toggleSorting(void 0), children: [
          n,
          Jr(a.getIsSorted())
        ] }) }),
        /* @__PURE__ */ B("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ m(we, { children: /* @__PURE__ */ m(
            ua,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ m(we, { children: /* @__PURE__ */ m(
            da,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ m(we, { children: /* @__PURE__ */ m(
            fa,
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
      return i === !0 ? /* @__PURE__ */ m(ua, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : i === !1 ? /* @__PURE__ */ m(da, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ m(fa, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function Ag({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: r,
  localizedStrings: n
}) {
  const o = n["%webView_inventory_table_header_character%"], a = n["%webView_inventory_table_header_unicode_value%"], i = n["%webView_inventory_table_header_count%"], l = n["%webView_inventory_table_header_status%"], c = (u, f) => {
    f.toggleAllRowsSelected(!1), u.toggleSelected(void 0), r(u.getValue("character"));
  };
  return /* @__PURE__ */ m("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ m(
    cp,
    {
      columns: Ig(
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
const fi = (e, t, r) => {
  if (!e || e === "" || t === "")
    return [];
  const n = [], o = e.split(`
`);
  let a = "0", i = "0", l = 0;
  return o.forEach((c) => {
    const u = c.split(/\s+/);
    c.startsWith("\\c") && ([, a] = u, i = "0"), c.startsWith("\\v") && ([, i] = u, a === "0" && (a = r.chapterNum.toString()));
    for (let f = 0; f < u.length; f++)
      if (u[f].includes(t)) {
        const v = Math.max(0, f - 2), g = Math.min(u.length, f + 3), p = u.slice(v, g).join(" "), h = {
          reference: { ...r, chapterNum: +a, verseNum: +i },
          snippet: p,
          key: l
        };
        l += 1, n.push(h);
      }
  }), n;
};
function Dg({
  selectedCharacter: e,
  text: t,
  scriptureReference: r,
  setScriptureReference: n,
  localizedStrings: o
}) {
  const a = o["%webView_inventory_occurrences_table_header_reference%"], i = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = ie(
    fi(t, e, r)
  );
  return Fe(
    () => c(fi(t, e, r)),
    [t, e, r]
  ), /* @__PURE__ */ B(vn, { children: [
    /* @__PURE__ */ m(yn, { children: /* @__PURE__ */ B(vt, { children: [
      /* @__PURE__ */ m(Rr, { children: a }),
      /* @__PURE__ */ m(Rr, { children: i })
    ] }) }),
    /* @__PURE__ */ m(wn, { children: l.map((u) => /* @__PURE__ */ B(
      vt,
      {
        onClick: () => {
          n(u.reference);
        },
        children: [
          /* @__PURE__ */ m(Yt, { children: `${me.bookNumberToEnglishName(u.reference.bookNum)} ${u.reference.chapterNum}:${u.reference.verseNum}` }),
          /* @__PURE__ */ m(Yt, { children: u.snippet })
        ]
      },
      u.key
    )) })
  ] });
}
const Bg = async (e, t, r, n, o) => {
  const a = [];
  return oc(e, "").forEach((i) => {
    if (r !== "" && !i.includes(r))
      return;
    const l = a.find((c) => c.character === i);
    if (l)
      l.count += 1;
    else {
      let c;
      if (n.includes(i) && (c = !0), o.includes(i) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
        const u = {
          character: i,
          count: 1,
          status: c
        };
        a.push(u);
      }
    }
  }), a;
};
function Iv({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  projectId: n,
  getSetting: o,
  setSetting: a,
  getText: i
}) {
  const l = r["%webView_characterInventory_characters_all%"], c = r["%webView_characterInventory_characters_approved%"], u = r["%webView_characterInventory_characters_unapproved%"], f = r["%webView_characterInventory_characters_unknown%"], v = r["%webView_inventory_scope_book%"], g = r["%webView_inventory_scope_chapter%"], p = r["%webView_inventory_scope_verse%"], h = r["%webView_inventory_filter_text%"], [d, b] = ie([]), [x, P] = ie([]), [w, E] = ie(void 0), [y, C] = ie("book"), [N, I] = ie("all"), [D, L] = ie(""), [k, O] = ie([]), [$, F] = ie(""), H = (_, z) => {
    O((te) => {
      let Q = [];
      return _.forEach((S) => {
        Q = te.map((M) => M.character === S && M.status !== z ? { ...M, status: z } : M);
      }), b((S) => {
        let M = [...S];
        return _.forEach((U) => {
          z === !0 ? M.includes(U) || M.push(U) : M = M.filter((Y) => Y !== U);
        }), a("validCharacters", n, M), M;
      }), P((S) => {
        let M = [...S];
        return _.forEach((U) => {
          z === !1 ? M.includes(U) || M.push(U) : M = M.filter(
            (Y) => Y !== U
          );
        }), a("invalidCharacters", n, M), M;
      }), Q;
    });
  };
  return Fe(() => {
    (async () => {
      try {
        b(await o("validCharacters", n)), P(await o("invalidCharacters", n));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [n, o]), Fe(() => {
    (async () => {
      try {
        const z = await i(n, e, y);
        E(z);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [n, e, y, i]), Fe(() => {
    if (!w) {
      O([]);
      return;
    }
    (async () => {
      try {
        O(
          await Bg(w, N, D, d, x)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [d, x, w, N, D]), /* @__PURE__ */ B("div", { className: "pr-twp", children: [
    /* @__PURE__ */ B("div", { className: "pr-flex", children: [
      /* @__PURE__ */ B(
        nn,
        {
          onValueChange: (_) => I(_),
          defaultValue: N,
          children: [
            /* @__PURE__ */ m(Or, { children: /* @__PURE__ */ m(on, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ B(Sr, { children: [
              /* @__PURE__ */ m(Ke, { value: "all", children: l }),
              /* @__PURE__ */ m(Ke, { value: "approved", children: c }),
              /* @__PURE__ */ m(Ke, { value: "unapproved", children: u }),
              /* @__PURE__ */ m(Ke, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ B(nn, { onValueChange: (_) => C(_), defaultValue: y, children: [
        /* @__PURE__ */ m(Or, { children: /* @__PURE__ */ m(on, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ B(Sr, { children: [
          /* @__PURE__ */ m(Ke, { value: "book", children: v }),
          /* @__PURE__ */ m(Ke, { value: "chapter", children: g }),
          /* @__PURE__ */ m(Ke, { value: "verse", children: p })
        ] })
      ] }),
      /* @__PURE__ */ m(
        gn,
        {
          className: "pr-rounded-md pr-border",
          placeholder: h,
          value: D,
          onChange: (_) => {
            L(_.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ m(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${$ !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ m(
          Ag,
          {
            tableData: k,
            onStatusChange: H,
            onSelectCharacter: (_) => {
              F(_);
            },
            localizedStrings: r
          }
        )
      }
    ),
    $ !== "" && /* @__PURE__ */ m("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ m(
      Dg,
      {
        selectedCharacter: $,
        text: w,
        scriptureReference: e,
        setScriptureReference: (_) => t(_),
        localizedStrings: r
      }
    ) })
  ] });
}
function Av({
  isInstalling: e,
  handleClick: t,
  buttonText: r
}) {
  return /* @__PURE__ */ m(
    we,
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
      children: e ? /* @__PURE__ */ m(hn, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ B(yt, { children: [
        /* @__PURE__ */ m(Ql, { size: 25, className: V("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function Dv({ isEnabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    we,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ B(yt, { children: [
        /* @__PURE__ */ m(hn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Bv({ isDisabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    we,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ B(yt, { children: [
        /* @__PURE__ */ m(hn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function jv({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    we,
    {
      className: V(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ B(yt, { children: [
        /* @__PURE__ */ m(hn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Pt() {
  return Pt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r)
        Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  }, Pt.apply(this, arguments);
}
const jg = ["children", "options"], mi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), hi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Lg = ["style", "script"], Vg = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Fg = /mailto:/i, zg = /\n{2,}$/, nl = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Ug = /^ *> ?/gm, Hg = /^ {2,}\n/, Gg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, ol = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, al = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Wg = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Xg = /^(?:\n *)*\n/, qg = /\r\n?/g, Yg = /^\[\^([^\]]+)](:.*)\n/, Kg = /^\[\^([^\]]+)]/, Jg = /\f/g, Zg = /^\s*?\[(x|\s)\]/, il = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, sl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, ll = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, vo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, Qg = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, cl = /^<!--[\s\S]*?(?:-->)/, eb = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, yo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, tb = /^\{.*\}$/, rb = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, nb = /^<([^ >]+@[^ >]+)>/, ob = /^<([^ >]+:\/[^ >]+)>/, ab = /-([a-z])?/gi, pl = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, ib = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, sb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, lb = /^\[([^\]]*)\] ?\[([^\]]*)\]/, cb = /(\[|\])/g, pb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, ub = /\t/g, db = /^ *\| */, fb = /(^ *\||\| *$)/g, mb = / *$/, hb = /^ *:-+: *$/, gb = /^ *:-+ *$/, bb = /^ *-+: *$/, vb = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, yb = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, wb = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, xb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Eb = /^\\([^0-9A-Za-z\s])/, kb = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, Tb = /^\n+/, Nb = /^([ \t]*)/, Cb = /\\([^\\])/g, gi = / *\n+$/, Ob = /(?:^|\n)( *)$/, qo = "(?:\\d+\\.)", Yo = "(?:[*+-])";
function ul(e) {
  return "( *)(" + (e === 1 ? qo : Yo) + ") +";
}
const dl = ul(1), fl = ul(2);
function ml(e) {
  return new RegExp("^" + (e === 1 ? dl : fl));
}
const Sb = ml(1), Rb = ml(2);
function hl(e) {
  return new RegExp("^" + (e === 1 ? dl : fl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? qo : Yo) + " )[^\\n]*)*(\\n|$)", "gm");
}
const gl = hl(1), bl = hl(2);
function vl(e) {
  const t = e === 1 ? qo : Yo;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const yl = vl(1), wl = vl(2);
function bi(e, t) {
  const r = t === 1, n = r ? yl : wl, o = r ? gl : bl, a = r ? Sb : Rb;
  return { t(i, l, c) {
    const u = Ob.exec(c);
    return u && (l.o || !l._ && !l.u) ? n.exec(i = u[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const u = r ? +i[2] : void 0, f = i[0].replace(zg, `
`).match(o);
    let v = !1;
    return { p: f.map(function(g, p) {
      const h = a.exec(g)[0].length, d = new RegExp("^ {1," + h + "}", "gm"), b = g.replace(d, "").replace(a, ""), x = p === f.length - 1, P = b.indexOf(`

`) !== -1 || x && v;
      v = P;
      const w = c._, E = c.o;
      let y;
      c.o = !0, P ? (c._ = !1, y = b.replace(gi, `

`)) : (c._ = !0, y = b.replace(gi, ""));
      const C = l(y, c);
      return c._ = w, c.o = E, C;
    }), m: r, g: u };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(u, f) {
    return e("li", { key: f }, l(u, c));
  })) };
}
const Pb = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, $b = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, xl = [nl, ol, al, il, ll, sl, cl, pl, gl, yl, bl, wl], _b = [...xl, /^[^\n]+(?:  \n|\n{2,})/, vo, yo];
function Mb(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Ib(e) {
  return bb.test(e) ? "right" : hb.test(e) ? "center" : gb.test(e) ? "left" : null;
}
function vi(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(mb, "")), a[a.length - 1].push(i));
  }), a;
}
function Ab(e, t, r) {
  r._ = !0;
  const n = vi(e[1], t, r), o = e[2].replace(fb, "").split("|").map(Ib), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(u) {
      return vi(u, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: a, L: n, type: "table" };
}
function yi(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function mt(e) {
  return function(t, r) {
    return r._ ? e.exec(t) : null;
  };
}
function ht(e) {
  return function(t, r) {
    return r._ || r.u ? e.exec(t) : null;
  };
}
function it(e) {
  return function(t, r) {
    return r._ || r.u ? null : e.exec(t);
  };
}
function hr(e) {
  return function(t) {
    return e.exec(t);
  };
}
function Db(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !xl.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function Gt(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function wi(e) {
  return e.replace(Cb, "$1");
}
function rn(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Bb(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function jb(e, t, r) {
  return r._ = !1, e(t, r);
}
const Zn = (e, t, r) => ({ v: rn(t, e[1], r) });
function Qn() {
  return {};
}
function eo() {
  return null;
}
function Lb(...e) {
  return e.filter(Boolean).join(" ");
}
function to(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var ae;
function Vb(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Mb, t.namedCodesToUnicode = t.namedCodesToUnicode ? Pt({}, hi, t.namedCodesToUnicode) : hi;
  const r = t.createElement || T.createElement;
  function n(p, h, ...d) {
    const b = to(t.overrides, `${p}.props`, {});
    return r(function(x, P) {
      const w = to(P, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : to(P, `${x}.component`, x) : x;
    }(p, t.overrides), Pt({}, h, b, { className: Lb(h == null ? void 0 : h.className, b.className) || void 0 }), ...d);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = pb.test(p) === !1);
    const d = f(u(h ? p : `${p.trimEnd().replace(Tb, "")}

`, { _: h }));
    for (; typeof d[d.length - 1] == "string" && !d[d.length - 1].trim(); )
      d.pop();
    if (t.wrapper === null)
      return d;
    const b = t.wrapper || (h ? "span" : "div");
    let x;
    if (d.length > 1 || t.forceWrapper)
      x = d;
    else {
      if (d.length === 1)
        return x = d[0], typeof x == "string" ? n("span", { key: "outer" }, x) : x;
      x = null;
    }
    return T.createElement(b, { key: "outer" }, x);
  }
  function a(p) {
    const h = p.match(Vg);
    return h ? h.reduce(function(d, b, x) {
      const P = b.indexOf("=");
      if (P !== -1) {
        const w = function(N) {
          return N.indexOf("-") !== -1 && N.match(eb) === null && (N = N.replace(ab, function(I, D) {
            return D.toUpperCase();
          })), N;
        }(b.slice(0, P)).trim(), E = function(N) {
          const I = N[0];
          return (I === '"' || I === "'") && N.length >= 2 && N[N.length - 1] === I ? N.slice(1, -1) : N;
        }(b.slice(P + 1).trim()), y = mi[w] || w, C = d[y] = function(N, I) {
          return N === "style" ? I.split(/;\s?/).reduce(function(D, L) {
            const k = L.slice(0, L.indexOf(":"));
            return D[k.replace(/(-[a-z])/g, (O) => O[1].toUpperCase())] = L.slice(k.length + 1).trim(), D;
          }, {}) : N === "href" ? Gt(I) : (I.match(tb) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(w, E);
        typeof C == "string" && (vo.test(C) || yo.test(C)) && (d[y] = T.cloneElement(o(C.trim()), { key: x }));
      } else
        b !== "style" && (d[mi[b] || b] = !0);
      return d;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: it(nl), i: ae.HIGH, l: (p, h, d) => ({ v: h(p[0].replace(Ug, ""), d) }), h: (p, h, d) => n("blockquote", { key: d.k }, h(p.v, d)) }, breakLine: { t: hr(Hg), i: ae.HIGH, l: Qn, h: (p, h, d) => n("br", { key: d.k }) }, breakThematic: { t: it(Gg), i: ae.HIGH, l: Qn, h: (p, h, d) => n("hr", { key: d.k }) }, codeBlock: { t: it(al), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, d) => n("pre", { key: d.k }, n("code", Pt({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: it(ol), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: ht(Wg), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, h, d) => n("code", { key: d.k }, p.v) }, footnote: { t: it(Yg), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: eo }, footnoteReference: { t: mt(Kg), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, d) => n("a", { key: d.k, href: Gt(p.B) }, n("sup", { key: d.k }, p.v)) }, gfmTask: { t: mt(Zg), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, d) => n("input", { checked: p.R, key: d.k, readOnly: !0, type: "checkbox" }) }, heading: { t: it(t.enforceAtxHeadings ? sl : il), i: ae.HIGH, l: (p, h, d) => ({ v: rn(h, p[2], d), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, d) => n(`h${p.C}`, { id: p.T, key: d.k }, h(p.v, d)) }, headingSetext: { t: it(ll), i: ae.MAX, l: (p, h, d) => ({ v: rn(h, p[1], d), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: hr(cl), i: ae.HIGH, l: () => ({}), h: eo }, image: { t: ht($b), i: ae.HIGH, l: (p) => ({ D: p[1], B: wi(p[2]), F: p[3] }), h: (p, h, d) => n("img", { key: d.k, alt: p.D || void 0, title: p.F || void 0, src: Gt(p.B) }) }, link: { t: mt(Pb), i: ae.LOW, l: (p, h, d) => ({ v: Bb(h, p[1], d), B: wi(p[2]), F: p[3] }), h: (p, h, d) => n("a", { key: d.k, href: Gt(p.B), title: p.F }, h(p.v, d)) }, linkAngleBraceStyleDetector: { t: mt(ob), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : mt(rb)(p, h), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: mt(nb), i: ae.MAX, l(p) {
    let h = p[1], d = p[1];
    return Fg.test(d) || (d = "mailto:" + d), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: d, type: "link" };
  } }, orderedList: bi(n, 1), unorderedList: bi(n, 2), newlineCoalescer: { t: it(Xg), i: ae.LOW, l: Qn, h: () => `
` }, paragraph: { t: Db, i: ae.LOW, l: Zn, h: (p, h, d) => n("p", { key: d.k }, h(p.v, d)) }, ref: { t: mt(ib), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: eo }, refImage: { t: ht(sb), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, d) => n("img", { key: d.k, alt: p.D, src: Gt(l[p.P].B), title: l[p.P].F }) }, refLink: { t: mt(lb), i: ae.MAX, l: (p, h, d) => ({ v: h(p[1], d), Z: h(p[0].replace(cb, "\\$1"), d), P: p[2] }), h: (p, h, d) => l[p.P] ? n("a", { key: d.k, href: Gt(l[p.P].B), title: l[p.P].F }, h(p.v, d)) : n("span", { key: d.k }, h(p.Z, d)) }, table: { t: it(pl), i: ae.HIGH, l: Ab, h: (p, h, d) => n("table", { key: d.k }, n("thead", null, n("tr", null, p.L.map(function(b, x) {
    return n("th", { key: x, style: yi(p, x) }, h(b, d));
  }))), n("tbody", null, p.A.map(function(b, x) {
    return n("tr", { key: x }, b.map(function(P, w) {
      return n("td", { key: w, style: yi(p, w) }, h(P, d));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, db.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: hr(kb), i: ae.MIN, l: (p) => ({ v: p[0].replace(Qg, (h, d) => t.namedCodesToUnicode[d] ? t.namedCodesToUnicode[d] : h) }), h: (p) => p.v }, textBolded: { t: ht(vb), i: ae.MED, l: (p, h, d) => ({ v: h(p[2], d) }), h: (p, h, d) => n("strong", { key: d.k }, h(p.v, d)) }, textEmphasized: { t: ht(yb), i: ae.LOW, l: (p, h, d) => ({ v: h(p[2], d) }), h: (p, h, d) => n("em", { key: d.k }, h(p.v, d)) }, textEscaped: { t: ht(Eb), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: ht(wb), i: ae.LOW, l: Zn, h: (p, h, d) => n("mark", { key: d.k }, h(p.v, d)) }, textStrikethroughed: { t: ht(xb), i: ae.LOW, l: Zn, h: (p, h, d) => n("del", { key: d.k }, h(p.v, d)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: hr(vo), i: ae.HIGH, l(p, h, d) {
    const [, b] = p[3].match(Nb), x = new RegExp(`^${b}`, "gm"), P = p[3].replace(x, ""), w = (E = P, _b.some((I) => I.test(E)) ? jb : rn);
    var E;
    const y = p[1].toLowerCase(), C = Lg.indexOf(y) !== -1;
    d.N = d.N || y === "a";
    const N = C ? p[3] : w(h, P, d);
    return d.N = !1, { O: a(p[2]), v: N, G: C, H: C ? y : p[1] };
  }, h: (p, h, d) => n(p.H, Pt({ key: d.k }, p.O), p.G ? p.v : h(p.v, d)) }, c.htmlSelfClosing = { t: hr(yo), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, h, d) => n(p.H, Pt({}, p.O, { key: d.k })) });
  const u = function(p) {
    let h = Object.keys(p);
    function d(b, x) {
      let P = [], w = "";
      for (; b; ) {
        let E = 0;
        for (; E < h.length; ) {
          const y = h[E], C = p[y], N = C.t(b, x, w);
          if (N) {
            const I = N[0];
            b = b.substring(I.length);
            const D = C.l(N, d, x);
            D.type == null && (D.type = y), P.push(D), w = I;
            break;
          }
          E++;
        }
      }
      return P;
    }
    return h.sort(function(b, x) {
      let P = p[b].i, w = p[x].i;
      return P !== w ? P - w : b < x ? -1 : 1;
    }), function(b, x) {
      return d(function(P) {
        return P.replace(qg, `
`).replace(Jg, "").replace(ub, "    ");
      }(b), x);
    };
  }(c), f = (v = function(p) {
    return function(h, d, b) {
      return p[h.type].h(h, d, b);
    };
  }(c), function p(h, d = {}) {
    if (Array.isArray(h)) {
      const b = d.k, x = [];
      let P = !1;
      for (let w = 0; w < h.length; w++) {
        d.k = w;
        const E = p(h[w], d), y = typeof E == "string";
        y && P ? x[x.length - 1] += E : E !== null && x.push(E), P = y;
      }
      return d.k = b, x;
    }
    return v(h, p, d);
  });
  var v;
  const g = o(e);
  return i.length ? n("div", null, g, n("footer", { key: "footer" }, i.map(function(p) {
    return n("div", { id: t.slugify(p.j), key: p.j }, p.j, f(u(p.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const Fb = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, u = Object.keys(o);
    for (l = 0; l < u.length; l++)
      a.indexOf(i = u[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, jg);
  return T.cloneElement(Vb(t, r), n);
};
function Lv({ markdown: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-prose", children: /* @__PURE__ */ m(Fb, { children: e }) });
}
const Vv = (e, t) => {
  Fe(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, ro = () => !1, Fv = (e, t) => {
  const [r] = bo(
    Ce(async () => {
      if (!e)
        return ro;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    ro,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Fe(() => () => {
    r !== ro && r();
  }, [r]);
}, zb = G.forwardRef(
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
zb.displayName = "Card";
const Ub = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: V("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
Ub.displayName = "CardHeader";
const Hb = G.forwardRef(
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
Hb.displayName = "CardTitle";
const Gb = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("p", { ref: r, className: V("pr-text-sm pr-text-muted-foreground", e), ...t }));
Gb.displayName = "CardDescription";
const Wb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: V("pr-p-6 pr-pt-0", e), ...t })
);
Wb.displayName = "CardContent";
const Xb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: V("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Xb.displayName = "CardFooter";
const qb = xo(
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
), Yb = G.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ m("div", { ref: n, role: "alert", className: V(qb({ variant: t }), e), ...r }));
Yb.displayName = "Alert";
const Kb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ B(
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
Kb.displayName = "AlertTitle";
const Jb = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: V("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
Jb.displayName = "AlertDescription";
const Zb = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ B(
  gr.Root,
  {
    ref: r,
    className: V(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ m(gr.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ m(gr.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ m(gr.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
Zb.displayName = gr.Root.displayName;
const Qb = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  oo.Root,
  {
    className: V(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ m(
      oo.Thumb,
      {
        className: V(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
Qb.displayName = oo.Root.displayName;
function ev(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
ev(`/*
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
.pr-left-2 {
  left: 0.5rem;
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
.pr-top-1\\/2 {
  top: 50%;
}
.pr-top-4 {
  top: 1rem;
}
.pr-top-\\[50\\%\\] {
  top: 50%;
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
.pr-w-72 {
  width: 18rem;
}
.pr-w-8 {
  width: 2rem;
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
.pr-gap-4 {
  gap: 1rem;
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
.pr-rounded-b-none {
  border-bottom-right-radius: 0px;
  border-bottom-left-radius: 0px;
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
.pr-border-border {
  border-color: hsl(var(--border));
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
.pr-px-3 {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}
.pr-px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
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

  .sm\\:pr-flex-row {
    flex-direction: row;
  }

  .sm\\:pr-justify-end {
    justify-content: flex-end;
  }

  .sm\\:pr-space-x-2 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(0.5rem * var(--tw-space-x-reverse));
    margin-left: calc(0.5rem * calc(1 - var(--tw-space-x-reverse)));
  }

  .sm\\:pr-rounded-lg {
    border-radius: var(--radius);
  }

  .sm\\:pr-text-left {
    text-align: left;
  }
}
@media (min-width: 1024px) {

  .lg\\:pr-flex {
    display: flex;
  }

  .lg\\:pr-space-x-8 > :not([hidden]) ~ :not([hidden]) {
    --tw-space-x-reverse: 0;
    margin-right: calc(2rem * var(--tw-space-x-reverse));
    margin-left: calc(2rem * calc(1 - var(--tw-space-x-reverse)));
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
  Yb as Alert,
  Jb as AlertDescription,
  Kb as AlertTitle,
  xv as BookChapterControl,
  we as Button,
  zb as Card,
  Wb as CardContent,
  Gb as CardDescription,
  Xb as CardFooter,
  Ub as CardHeader,
  Hb as CardTitle,
  Ev as ChapterRangeSelector,
  Iv as CharacterInventory,
  yp as Checkbox,
  kv as Checklist,
  va as ComboBox,
  Tv as ContextMenu,
  cp as DataTable,
  Bv as DisableButton,
  Di as DropdownMenu,
  ji as DropdownMenuCheckboxItem,
  No as DropdownMenuContent,
  bv as DropdownMenuGroup,
  Bi as DropdownMenuItem,
  bn as DropdownMenuLabel,
  vv as DropdownMenuPortal,
  wv as DropdownMenuRadioGroup,
  Uc as DropdownMenuRadioItem,
  Co as DropdownMenuSeparator,
  Hc as DropdownMenuShortcut,
  yv as DropdownMenuSub,
  zc as DropdownMenuSubContent,
  Fc as DropdownMenuSubTrigger,
  Vc as DropdownMenuTrigger,
  Dv as EnableButton,
  Ch as GridMenu,
  yg as HamburgerMenuButton,
  Nv as IconButton,
  gn as Input,
  Av as InstallButton,
  rl as Label,
  Wt as LabelPosition,
  Lv as MarkdownRenderer,
  zs as MenuItem,
  Cv as ScriptureResultsViewer,
  Ov as SearchBar,
  nn as Select,
  Sr as SelectContent,
  np as SelectGroup,
  Ke as SelectItem,
  op as SelectLabel,
  Vi as SelectScrollDownButton,
  Li as SelectScrollUpButton,
  ap as SelectSeparator,
  Or as SelectTrigger,
  on as SelectValue,
  Zb as ShadCnSlider,
  Qb as ShadCnSwitch,
  Sv as Slider,
  Rv as Snackbar,
  Pv as Switch,
  vn as Table,
  wn as TableBody,
  lp as TableCaption,
  Yt as TableCell,
  sp as TableFooter,
  Rr as TableHead,
  yn as TableHeader,
  vt as TableRow,
  _v as Tabs,
  Pg as TabsContent,
  Sg as TabsList,
  Rg as TabsTrigger,
  Og as TextField,
  $v as Toolbar,
  jv as UpdateButton,
  $g as VerticalTabs,
  Mg as VerticalTabsContent,
  _g as VerticalTabsList,
  Mv as VerticalTabsTrigger,
  tp as buttonVariants,
  Vv as useEvent,
  Fv as useEventAsync,
  bo as usePromise
};
//# sourceMappingURL=index.js.map
