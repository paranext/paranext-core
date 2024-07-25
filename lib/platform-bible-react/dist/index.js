import Dl, { jsx as m, jsxs as A, Fragment as yt } from "react/jsx-runtime";
import * as T from "react";
import G, { forwardRef as Ei, useCallback as Ce, useState as fe, useRef as $t, useEffect as Ye, useLayoutEffect as fa, useMemo as Dr } from "react";
import { History as jl, ChevronRight as Bl, Check as ko, Circle as Ll, ArrowDownWideNarrow as Vl, Clock as Fl, Bookmark as zl, FilterIcon as Ul, ChevronDown as ki, ChevronUp as Hl, ArrowLeftIcon as Gl, ChevronLeftIcon as Wl, ChevronRightIcon as Xl, ArrowRightIcon as ql, X as Yl, Search as Kl, ChevronsUpDown as Jl, ArrowUpIcon as Zl, ArrowDownIcon as Ql, ArrowUpDownIcon as ec, CircleCheckIcon as on, CircleXIcon as an, CircleHelpIcon as sn, LoaderCircle as vn, Download as tc } from "lucide-react";
import Se, { clsx as rc } from "clsx";
import { extendTailwindMerge as nc } from "tailwind-merge";
import * as be from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as oc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as ac, compareScrRefs as io, scrRefToBBBCCCVVV as Fn, formatScrRef as zn, split as ic } from "platform-bible-utils";
import { useReactTable as Ti, getCoreRowModel as Ni, getPaginationRowModel as sc, getSortedRowModel as Ci, getFilteredRowModel as lc, flexRender as xr, getExpandedRowModel as cc, getGroupedRowModel as pc } from "@tanstack/react-table";
import { Slot as uc } from "@radix-ui/react-slot";
import { cva as To } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import { FormControlLabel as ma, FormLabel as dc, Checkbox as fc, MenuItem as mc, ListItemText as hc, ListItemIcon as Si, Menu as gc, Grid as Oi, List as bc, IconButton as Ri, Drawer as vc, Slider as yc, Snackbar as wc, Switch as xc, AppBar as Ec, Toolbar as kc } from "@mui/material";
import * as Sr from "@radix-ui/react-popover";
import { Command as Ae } from "cmdk";
import * as Qe from "@radix-ui/react-dialog";
import Tc, { ThemeContext as Nc, internal_processStyles as Cc } from "@mui/styled-engine";
import * as Sc from "react-dom";
import Xr from "react-dom";
import * as Pi from "@radix-ui/react-label";
import * as De from "@radix-ui/react-tabs";
import * as br from "@radix-ui/react-slider";
import * as so from "@radix-ui/react-switch";
const Oc = nc({ prefix: "pr-" });
function F(...e) {
  return Oc(rc(e));
}
const yn = G.forwardRef(
  ({ className: e, type: t, ...r }, n) => /* @__PURE__ */ m(
    "input",
    {
      type: t,
      className: F(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: n,
      ...r
    }
  )
);
yn.displayName = "Input";
const Rc = Ei(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: r, handleSubmit: n, ...o }, a) => /* @__PURE__ */ A("div", { className: "pr-relative", children: [
    /* @__PURE__ */ m(
      yn,
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
      jl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Pc = Object.defineProperty, $c = (e, t, r) => t in e ? Pc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: r }) : e[t] = r, oe = (e, t, r) => $c(e, typeof t != "symbol" ? t + "" : t, r);
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
], No = [
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
], $i = [
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
], ha = Fc();
function nr(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ha ? ha[e] : 0;
}
function Co(e) {
  return nr(e) > 0;
}
function _c(e) {
  const t = typeof e == "string" ? nr(e) : e;
  return t >= 40 && t <= 66;
}
function Ic(e) {
  return (typeof e == "string" ? nr(e) : e) <= 39;
}
function _i(e) {
  return e <= 66;
}
function Mc(e) {
  const t = typeof e == "string" ? nr(e) : e;
  return Ai(t) && !_i(t);
}
function* Ac() {
  for (let e = 1; e <= Mt.length; e++)
    yield e;
}
const Dc = 1, Ii = Mt.length;
function jc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function So(e, t = "***") {
  const r = e - 1;
  return r < 0 || r >= Mt.length ? t : Mt[r];
}
function Mi(e) {
  return e <= 0 || e > Ii ? "******" : $i[e - 1];
}
function Bc(e) {
  return Mi(nr(e));
}
function Ai(e) {
  const t = typeof e == "number" ? So(e) : e;
  return Co(t) && !No.includes(t);
}
function Lc(e) {
  const t = typeof e == "number" ? So(e) : e;
  return Co(t) && No.includes(t);
}
function Vc(e) {
  return $i[e - 1].includes("*obsolete*");
}
function Fc() {
  const e = {};
  for (let t = 0; t < Mt.length; t++)
    e[Mt[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Mt,
  nonCanonicalIds: No,
  bookIdToNumber: nr,
  isBookIdValid: Co,
  isBookNT: _c,
  isBookOT: Ic,
  isBookOTNT: _i,
  isBookDC: Mc,
  allBookNumbers: Ac,
  firstBook: Dc,
  lastBook: Ii,
  extraBooks: jc,
  bookNumberToId: So,
  bookNumberToEnglishName: Mi,
  bookIdToEnglishName: Bc,
  isCanonical: Ai,
  isExtraMaterial: Lc,
  isObsolete: Vc
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
var Di = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Di || {});
const _e = class le {
  constructor(t, r, n, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), n == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = r != null && r instanceof Nt ? r : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = r != null && r instanceof Nt ? r : void 0;
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
          const a = t instanceof Nt ? t : le.defaultVersification;
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
      if (n instanceof pr)
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
    return i && (c = new Nt(i)), r ? new le(r, n.toString(), l, c) : new le();
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
      throw new pr(
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
          this.versification = new Nt(Je[i]);
        } catch {
          throw new pr("Invalid reference : " + t);
        }
    }
    const r = t.trim().split(" ");
    if (r.length !== 2)
      throw new pr("Invalid reference : " + t);
    const n = r[1].split(":"), o = +n[0];
    if (n.length !== 2 || me.bookIdToNumber(r[0]) === 0 || !Number.isInteger(o) || o < 0 || !le.isVerseParseable(n[1]))
      throw new pr("Invalid reference : " + t);
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
    const o = [], a = ga(this._verse, n);
    for (const i of a.map((l) => ga(l, r))) {
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = le.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, r, n) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = r, this.verse = n;
  }
};
oe(_e, "defaultVersification", Nt.English), oe(_e, "verseRangeSeparator", "-"), oe(_e, "verseSequenceIndicator", ","), oe(_e, "verseRangeSeparators", [_e.verseRangeSeparator]), oe(_e, "verseSequenceIndicators", [_e.verseSequenceIndicator]), oe(_e, "chapterDigitShifter", 1e3), oe(_e, "bookDigitShifter", _e.chapterDigitShifter * _e.chapterDigitShifter), oe(_e, "bcvMaxValue", _e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(_e, "ValidStatusType", Di);
let pr = class extends Error {
};
const ji = be.Root, zc = be.Trigger, kv = be.Group, Tv = be.Portal, Nv = be.Sub, Cv = be.RadioGroup, Uc = G.forwardRef(({ className: e, inset: t, children: r, ...n }, o) => /* @__PURE__ */ A(
  be.SubTrigger,
  {
    ref: o,
    className: F(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...n,
    children: [
      r,
      /* @__PURE__ */ m(Bl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Uc.displayName = be.SubTrigger.displayName;
const Hc = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  be.SubContent,
  {
    ref: r,
    className: F(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Hc.displayName = be.SubContent.displayName;
const Oo = G.forwardRef(({ className: e, sideOffset: t = 4, ...r }, n) => /* @__PURE__ */ m(be.Portal, { children: /* @__PURE__ */ m(
  be.Content,
  {
    ref: n,
    sideOffset: t,
    className: F(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
Oo.displayName = be.Content.displayName;
const Bi = G.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ m(
  be.Item,
  {
    ref: n,
    className: F(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...r
  }
));
Bi.displayName = be.Item.displayName;
const Li = G.forwardRef(({ className: e, children: t, checked: r, ...n }, o) => /* @__PURE__ */ A(
  be.CheckboxItem,
  {
    ref: o,
    className: F(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: r,
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(be.ItemIndicator, { children: /* @__PURE__ */ m(ko, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Li.displayName = be.CheckboxItem.displayName;
const Gc = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(
  be.RadioItem,
  {
    ref: n,
    className: F(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(be.ItemIndicator, { children: /* @__PURE__ */ m(Ll, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
Gc.displayName = be.RadioItem.displayName;
const wn = G.forwardRef(({ className: e, inset: t, ...r }, n) => /* @__PURE__ */ m(
  be.Label,
  {
    ref: n,
    className: F("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...r
  }
));
wn.displayName = be.Label.displayName;
const Ro = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  be.Separator,
  {
    ref: r,
    className: F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Ro.displayName = be.Separator.displayName;
function Wc({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: F("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Wc.displayName = "DropdownMenuShortcut";
const Xc = Ei(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: r,
    handleHighlightBook: n,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ A(
    Bi,
    {
      ref: l,
      textValue: e,
      className: F("pr-font-normal pr-text-slate-700", {
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
            className: F(
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
function qc({
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
  return /* @__PURE__ */ m("div", { className: F("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ m(
    "div",
    {
      className: F(
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
function Yc({ handleSort: e, handleLocationHistory: t, handleBookmarks: r }) {
  return /* @__PURE__ */ A(wn, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ m("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ m(
        Vl,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        Fl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        zl,
        {
          onClick: r,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const Er = me.allBookIds, Kc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ba = ["OT", "NT", "DC"], Jc = 32 + 32 + 32, Zc = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], Qc = (e) => ({
  OT: Er.filter((r) => me.isBookOT(r)),
  NT: Er.filter((r) => me.isBookNT(r)),
  DC: Er.filter((r) => me.isBookDC(r))
})[e], ur = (e) => ac(me.bookIdToNumber(e));
function ep() {
  return Er.map((t) => me.bookIdToEnglishName(t));
}
function tp(e) {
  return ep().includes(e);
}
function rp(e) {
  const t = e.toLowerCase().replace(/^\w/, (r) => r.toUpperCase());
  if (tp(t))
    return Er.find((n) => me.bookIdToEnglishName(n) === t);
}
function Sv({ scrRef: e, handleSubmit: t }) {
  const [r, n] = fe(""), [o, a] = fe(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = fe(e.chapterNum ?? 0), [c, d] = fe(
    me.bookNumberToId(e.bookNum)
  ), [f, v] = fe(!1), [g, p] = fe(f), h = $t(void 0), u = $t(void 0), b = $t(void 0), x = Ce(
    (k) => Qc(k).filter((S) => {
      const $ = me.bookIdToEnglishName(S).toLowerCase(), z = r.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(z) || // Match book name
      S.toLowerCase().includes(z);
    }),
    [r]
  ), R = (k) => {
    n(k);
  }, w = $t(!1), E = Ce((k) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    v(k);
  }, []), y = Ce(
    (k, S, $, z) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), S || ur(k) === -1) {
        t({
          bookNum: me.bookIdToNumber(k),
          chapterNum: $ || 1,
          verseNum: z || 1
        }), v(!1), n("");
        return;
      }
      a(o !== k ? k : ""), v(!S);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), N = (k) => {
    k <= 0 || k > ur(o) || y(o, !0, k);
  }, C = Ce(() => {
    Zc.forEach((k) => {
      const S = r.match(k);
      if (S) {
        const [$, z = void 0, j = void 0] = S.slice(1), M = rp($);
        (me.isBookIdValid($) || M) && y(
          M ?? $,
          !0,
          z ? parseInt(z, 10) : 1,
          j ? parseInt(j, 10) : 1
        );
      }
    });
  }, [y, r]), _ = Ce(
    (k) => {
      f ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof u < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      u.current !== null && u.current.focus(), k.preventDefault()) : v(!0);
    },
    [f]
  ), D = (k) => {
    const { key: S } = k;
    S === "ArrowRight" || S === "ArrowLeft" || S === "ArrowDown" || S === "ArrowUp" || S === "Enter" || (h.current.dispatchEvent(new KeyboardEvent("keydown", { key: S })), h.current.focus());
  }, V = (k) => {
    const { key: S } = k;
    if (c === o) {
      if (S === "Enter") {
        k.preventDefault(), y(o, !0, i);
        return;
      }
      let $ = 0;
      if (S === "ArrowRight")
        if (i < ur(c))
          $ = 1;
        else {
          k.preventDefault();
          return;
        }
      else if (S === "ArrowLeft")
        if (i > 1)
          $ = -1;
        else {
          k.preventDefault();
          return;
        }
      else
        S === "ArrowDown" ? $ = 6 : S === "ArrowUp" && ($ = -6);
      i + $ <= 0 || i + $ > ur(c) ? l(0) : $ !== 0 && (l(i + $), k.preventDefault());
    }
  };
  return Ye(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), fa(() => {
    p(f);
  }, [f]), fa(() => {
    const k = setTimeout(() => {
      if (g && u.current && b.current) {
        const $ = b.current.offsetTop - Jc;
        u.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [g]), /* @__PURE__ */ m("div", { className: "pr-flex", children: /* @__PURE__ */ A(ji, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ m(zc, { asChild: !0, children: /* @__PURE__ */ m(
      Rc,
      {
        ref: h,
        value: r,
        handleSearch: R,
        handleKeyDown: _,
        handleOnClick: () => {
          a(me.bookNumberToId(e.bookNum)), d(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: C,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ A(
      Oo,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: D,
        align: "start",
        ref: u,
        children: [
          /* @__PURE__ */ m(
            Yc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ba.map(
            (k, S) => x(k).length > 0 && /* @__PURE__ */ A("div", { children: [
              /* @__PURE__ */ m(wn, { className: "pr-font-semibold pr-text-slate-700", children: Kc[k] }),
              x(k).map(($) => /* @__PURE__ */ m("div", { children: /* @__PURE__ */ m(
                Xc,
                {
                  bookId: $,
                  handleSelectBook: () => y($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => d($),
                  handleKeyDown: V,
                  bookType: k,
                  ref: (z) => {
                    o === $ && (b.current = z);
                  },
                  children: /* @__PURE__ */ m(
                    qc,
                    {
                      handleSelectChapter: N,
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
              ba.length - 1 !== S ? /* @__PURE__ */ m(Ro, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const np = To(
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
), he = G.forwardRef(
  ({ className: e, variant: t, size: r, asChild: n = !1, ...o }, a) => /* @__PURE__ */ m(n ? uc : "button", { className: F(np({ variant: t, size: r, className: e })), ref: a, ...o })
);
he.displayName = "Button";
function op({ table: e }) {
  return /* @__PURE__ */ A(ji, { children: [
    /* @__PURE__ */ m(oc, { asChild: !0, children: /* @__PURE__ */ A(he, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ m(Ul, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ A(Oo, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ m(wn, { children: "Toggle columns" }),
      /* @__PURE__ */ m(Ro, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ m(
        Li,
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
const ln = xe.Root, ap = xe.Group, cn = xe.Value, Or = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(
  xe.Trigger,
  {
    ref: n,
    className: F(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...r,
    children: [
      t,
      /* @__PURE__ */ m(xe.Icon, { asChild: !0, children: /* @__PURE__ */ m(ki, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
Or.displayName = xe.Trigger.displayName;
const Vi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.ScrollUpButton,
  {
    ref: r,
    className: F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(Hl, { className: "pr-h-4 pr-w-4" })
  }
));
Vi.displayName = xe.ScrollUpButton.displayName;
const Fi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.ScrollDownButton,
  {
    ref: r,
    className: F("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(ki, { className: "pr-h-4 pr-w-4" })
  }
));
Fi.displayName = xe.ScrollDownButton.displayName;
const Rr = G.forwardRef(({ className: e, children: t, position: r = "popper", ...n }, o) => /* @__PURE__ */ m(xe.Portal, { children: /* @__PURE__ */ A(
  xe.Content,
  {
    ref: o,
    className: F(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      r === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: r,
    ...n,
    children: [
      /* @__PURE__ */ m(Vi, {}),
      /* @__PURE__ */ m(
        xe.Viewport,
        {
          className: F(
            "pr-p-1",
            r === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ m(Fi, {})
    ]
  }
) }));
Rr.displayName = xe.Content.displayName;
const ip = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.Label,
  {
    ref: r,
    className: F("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
ip.displayName = xe.Label.displayName;
const Ke = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(
  xe.Item,
  {
    ref: n,
    className: F(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(xe.ItemIndicator, { children: /* @__PURE__ */ m(ko, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ m(xe.ItemText, { children: t })
    ]
  }
));
Ke.displayName = xe.Item.displayName;
const sp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  xe.Separator,
  {
    ref: r,
    className: F("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
sp.displayName = xe.Separator.displayName;
function lp({ table: e }) {
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
        ln,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ m(Or, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ m(cn, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ m(Rr, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ m(Ke, { value: `${t}`, children: t }, t)) })
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
        he,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ m(Gl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        he,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ m(Wl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        he,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ m(Xl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ A(
        he,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ m(ql, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const xn = G.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ m("div", { className: F("pr-relative pr-w-full", { "pr-overflow-auto": !t }), children: /* @__PURE__ */ m(
  "table",
  {
    ref: n,
    className: F("pr-w-full pr-caption-bottom pr-text-sm", e),
    ...r
  }
) }));
xn.displayName = "Table";
const En = G.forwardRef(({ className: e, stickyHeader: t, ...r }, n) => /* @__PURE__ */ m(
  "thead",
  {
    ref: n,
    className: F(
      { "pr-sticky pr-top-0 pr-bg-white": t },
      "[&_tr]:pr-border-b",
      e
    ),
    ...r
  }
));
En.displayName = "TableHeader";
const kn = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("tbody", { ref: r, className: F("[&_tr:last-child]:pr-border-0", e), ...t }));
kn.displayName = "TableBody";
const cp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "tfoot",
  {
    ref: r,
    className: F("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
cp.displayName = "TableFooter";
const vt = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "tr",
    {
      ref: r,
      className: F(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
vt.displayName = "TableRow";
const Pr = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "th",
  {
    ref: r,
    className: F(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Pr.displayName = "TableHead";
const Kt = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "td",
  {
    ref: r,
    className: F("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Kt.displayName = "TableCell";
const pp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  "caption",
  {
    ref: r,
    className: F("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
pp.displayName = "TableCaption";
function up({
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
  const [l, c] = fe([]), [d, f] = fe([]), [v, g] = fe({}), [p, h] = fe({}), u = Ti({
    data: t,
    columns: e,
    getCoreRowModel: Ni(),
    ...r && { getPaginationRowModel: sc() },
    onSortingChange: c,
    getSortedRowModel: Ci(),
    onColumnFiltersChange: f,
    getFilteredRowModel: lc(),
    onColumnVisibilityChange: g,
    onRowSelectionChange: h,
    state: {
      sorting: l,
      columnFilters: d,
      columnVisibility: v,
      rowSelection: p
    }
  });
  return /* @__PURE__ */ A("div", { className: "pr-twp pr-font-sans", children: [
    o && /* @__PURE__ */ m(op, { table: u }),
    /* @__PURE__ */ A(xn, { stickyHeader: a, children: [
      /* @__PURE__ */ m(En, { stickyHeader: a, children: u.getHeaderGroups().map((x) => /* @__PURE__ */ m(vt, { children: x.headers.map((R) => /* @__PURE__ */ m(Pr, { children: R.isPlaceholder ? void 0 : xr(R.column.columnDef.header, R.getContext()) }, R.id)) }, x.id)) }),
      /* @__PURE__ */ m(kn, { children: (b = u.getRowModel().rows) != null && b.length ? u.getRowModel().rows.map((x) => /* @__PURE__ */ m(
        vt,
        {
          onClick: () => i(x, u),
          "data-state": x.getIsSelected() && "selected",
          children: x.getVisibleCells().map((R) => /* @__PURE__ */ m(Kt, { children: xr(R.column.columnDef.cell, R.getContext()) }, R.id))
        },
        x.id
      )) : /* @__PURE__ */ m(vt, { children: /* @__PURE__ */ m(Kt, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }),
    r && /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
      /* @__PURE__ */ m(
        he,
        {
          variant: "outline",
          size: "sm",
          onClick: () => u.previousPage(),
          disabled: !u.getCanPreviousPage(),
          children: "Previous"
        }
      ),
      /* @__PURE__ */ m(
        he,
        {
          variant: "outline",
          size: "sm",
          onClick: () => u.nextPage(),
          disabled: !u.getCanNextPage(),
          children: "Next"
        }
      )
    ] }),
    r && n && /* @__PURE__ */ m(lp, { table: u })
  ] });
}
const dp = Sr.Root, fp = Sr.Trigger, zi = G.forwardRef(({ className: e, align: t = "center", sideOffset: r = 4, ...n }, o) => /* @__PURE__ */ m(Sr.Portal, { children: /* @__PURE__ */ m(
  Sr.Content,
  {
    ref: o,
    align: t,
    sideOffset: r,
    className: F(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
zi.displayName = Sr.Content.displayName;
const mp = Qe.Portal, Ui = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Qe.Overlay,
  {
    ref: r,
    className: F(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Ui.displayName = Qe.Overlay.displayName;
const hp = G.forwardRef(({ className: e, children: t, ...r }, n) => /* @__PURE__ */ A(mp, { children: [
  /* @__PURE__ */ m(Ui, {}),
  /* @__PURE__ */ A(
    Qe.Content,
    {
      ref: n,
      className: F(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...r,
      children: [
        t,
        /* @__PURE__ */ A(Qe.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ m(Yl, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
hp.displayName = Qe.Content.displayName;
const gp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Qe.Title,
  {
    ref: r,
    className: F("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
gp.displayName = Qe.Title.displayName;
const bp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Qe.Description,
  {
    ref: r,
    className: F("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
bp.displayName = Qe.Description.displayName;
const Hi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae,
  {
    ref: r,
    className: F(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
Hi.displayName = Ae.displayName;
const Gi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ A("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ m(Kl, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ m(
    Ae.Input,
    {
      ref: r,
      className: F(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Gi.displayName = Ae.Input.displayName;
const Wi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: r,
    className: F("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
Wi.displayName = Ae.List.displayName;
const Xi = G.forwardRef((e, t) => /* @__PURE__ */ m(Ae.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Xi.displayName = Ae.Empty.displayName;
const vp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Group,
  {
    ref: r,
    className: F(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
vp.displayName = Ae.Group.displayName;
const yp = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Separator,
  {
    ref: r,
    className: F("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
yp.displayName = Ae.Separator.displayName;
const qi = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  Ae.Item,
  {
    ref: r,
    className: F(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
qi.displayName = Ae.Item.displayName;
function wp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function va({
  id: e,
  options: t = [],
  className: r,
  value: n,
  onChange: o = () => {
  },
  getOptionLabel: a = wp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: d = "outline"
}) {
  const [f, v] = fe(!1);
  return /* @__PURE__ */ A(dp, { open: f, onOpenChange: v, children: [
    /* @__PURE__ */ m(fp, { asChild: !0, children: /* @__PURE__ */ A(
      he,
      {
        variant: d,
        role: "combobox",
        "aria-expanded": f,
        id: e,
        className: F("pr-w-[200px] pr-justify-between", r),
        children: [
          n ? a(n) : i,
          /* @__PURE__ */ m(Jl, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ m(zi, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ A(Hi, { children: [
      /* @__PURE__ */ m(Gi, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ m(Xi, { children: c }),
      /* @__PURE__ */ m(Wi, { children: t.map((g) => /* @__PURE__ */ A(
        qi,
        {
          value: a(g),
          onSelect: () => {
            o(g), v(!1);
          },
          children: [
            /* @__PURE__ */ m(
              ko,
              {
                className: F("pr-mr-2 pr-h-4 pr-w-4", {
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
function Ov({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: r = !1,
  chapterCount: n
}) {
  const [o, a] = fe(1), [i, l] = fe(n), [c, d] = fe(
    Array.from({ length: n }, (g, p) => p + 1)
  );
  return Ye(() => {
    a(1), e(1), l(n), t(n), d(Array.from({ length: n }, (g, p) => p + 1));
  }, [n, t, e]), /* @__PURE__ */ A(yt, { children: [
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
var Xt = /* @__PURE__ */ ((e) => (e.After = "after", e.Before = "before", e.Above = "above", e.Below = "below", e))(Xt || {});
function xp({
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
    fc,
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
      dc,
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
function Rv({
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
      xp,
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
function Ep(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function kp(e) {
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
var Po = {}, Yi = { exports: {} };
(function(e) {
  function t(r) {
    return r && r.__esModule ? r : {
      default: r
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Yi);
var Tp = Yi.exports, Un = {};
function or(e, t) {
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
function Rt(e) {
  if (typeof e != "object" || e === null)
    return !1;
  const t = Object.getPrototypeOf(e);
  return (t === null || t === Object.prototype || Object.getPrototypeOf(t) === null) && !(Symbol.toStringTag in e) && !(Symbol.iterator in e);
}
function Ki(e) {
  if (!Rt(e))
    return e;
  const t = {};
  return Object.keys(e).forEach((r) => {
    t[r] = Ki(e[r]);
  }), t;
}
function st(e, t, r = {
  clone: !0
}) {
  const n = r.clone ? P({}, e) : e;
  return Rt(e) && Rt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Rt(t[o]) && o in e && Rt(e[o]) ? n[o] = st(e[o], t[o], r) : r.clone ? n[o] = Rt(t[o]) ? Ki(t[o]) : t[o] : n[o] = t[o]);
  }), n;
}
var lo = { exports: {} }, qr = { exports: {} }, ce = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ya;
function Np() {
  if (ya)
    return ce;
  ya = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, R = e ? Symbol.for("react.scope") : 60119;
  function w(y) {
    if (typeof y == "object" && y !== null) {
      var N = y.$$typeof;
      switch (N) {
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
                  return N;
              }
          }
        case r:
          return N;
      }
    }
  }
  function E(y) {
    return w(y) === d;
  }
  return ce.AsyncMode = c, ce.ConcurrentMode = d, ce.ContextConsumer = l, ce.ContextProvider = i, ce.Element = t, ce.ForwardRef = f, ce.Fragment = n, ce.Lazy = h, ce.Memo = p, ce.Portal = r, ce.Profiler = a, ce.StrictMode = o, ce.Suspense = v, ce.isAsyncMode = function(y) {
    return E(y) || w(y) === c;
  }, ce.isConcurrentMode = E, ce.isContextConsumer = function(y) {
    return w(y) === l;
  }, ce.isContextProvider = function(y) {
    return w(y) === i;
  }, ce.isElement = function(y) {
    return typeof y == "object" && y !== null && y.$$typeof === t;
  }, ce.isForwardRef = function(y) {
    return w(y) === f;
  }, ce.isFragment = function(y) {
    return w(y) === n;
  }, ce.isLazy = function(y) {
    return w(y) === h;
  }, ce.isMemo = function(y) {
    return w(y) === p;
  }, ce.isPortal = function(y) {
    return w(y) === r;
  }, ce.isProfiler = function(y) {
    return w(y) === a;
  }, ce.isStrictMode = function(y) {
    return w(y) === o;
  }, ce.isSuspense = function(y) {
    return w(y) === v;
  }, ce.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === n || y === d || y === a || y === o || y === v || y === g || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === f || y.$$typeof === b || y.$$typeof === x || y.$$typeof === R || y.$$typeof === u);
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
var wa;
function Cp() {
  return wa || (wa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, r = e ? Symbol.for("react.portal") : 60106, n = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, R = e ? Symbol.for("react.scope") : 60119;
    function w(L) {
      return typeof L == "string" || typeof L == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      L === n || L === d || L === a || L === o || L === v || L === g || typeof L == "object" && L !== null && (L.$$typeof === h || L.$$typeof === p || L.$$typeof === i || L.$$typeof === l || L.$$typeof === f || L.$$typeof === b || L.$$typeof === x || L.$$typeof === R || L.$$typeof === u);
    }
    function E(L) {
      if (typeof L == "object" && L !== null) {
        var re = L.$$typeof;
        switch (re) {
          case t:
            var I = L.type;
            switch (I) {
              case c:
              case d:
              case n:
              case a:
              case o:
              case v:
                return I;
              default:
                var se = I && I.$$typeof;
                switch (se) {
                  case l:
                  case f:
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
    var y = c, N = d, C = l, _ = i, D = t, V = f, k = n, S = h, $ = p, z = r, j = a, M = o, U = v, Q = !1;
    function Y(L) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(L) || E(L) === c;
    }
    function O(L) {
      return E(L) === d;
    }
    function B(L) {
      return E(L) === l;
    }
    function H(L) {
      return E(L) === i;
    }
    function Z(L) {
      return typeof L == "object" && L !== null && L.$$typeof === t;
    }
    function W(L) {
      return E(L) === f;
    }
    function X(L) {
      return E(L) === n;
    }
    function K(L) {
      return E(L) === h;
    }
    function J(L) {
      return E(L) === p;
    }
    function q(L) {
      return E(L) === r;
    }
    function ee(L) {
      return E(L) === a;
    }
    function te(L) {
      return E(L) === o;
    }
    function ie(L) {
      return E(L) === v;
    }
    pe.AsyncMode = y, pe.ConcurrentMode = N, pe.ContextConsumer = C, pe.ContextProvider = _, pe.Element = D, pe.ForwardRef = V, pe.Fragment = k, pe.Lazy = S, pe.Memo = $, pe.Portal = z, pe.Profiler = j, pe.StrictMode = M, pe.Suspense = U, pe.isAsyncMode = Y, pe.isConcurrentMode = O, pe.isContextConsumer = B, pe.isContextProvider = H, pe.isElement = Z, pe.isForwardRef = W, pe.isFragment = X, pe.isLazy = K, pe.isMemo = J, pe.isPortal = q, pe.isProfiler = ee, pe.isStrictMode = te, pe.isSuspense = ie, pe.isValidElementType = w, pe.typeOf = E;
  }()), pe;
}
var xa;
function Ji() {
  return xa || (xa = 1, process.env.NODE_ENV === "production" ? qr.exports = Np() : qr.exports = Cp()), qr.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Hn, Ea;
function Sp() {
  if (Ea)
    return Hn;
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
      var d = {};
      return "abcdefghijklmnopqrst".split("").forEach(function(f) {
        d[f] = f;
      }), Object.keys(Object.assign({}, d)).join("") === "abcdefghijklmnopqrst";
    } catch {
      return !1;
    }
  }
  return Hn = o() ? Object.assign : function(a, i) {
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
  }, Hn;
}
var Gn, ka;
function $o() {
  if (ka)
    return Gn;
  ka = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return Gn = e, Gn;
}
var Wn, Ta;
function Zi() {
  return Ta || (Ta = 1, Wn = Function.call.bind(Object.prototype.hasOwnProperty)), Wn;
}
var Xn, Na;
function Op() {
  if (Na)
    return Xn;
  Na = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = $o(), r = {}, n = Zi();
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
  }, Xn = o, Xn;
}
var qn, Ca;
function Rp() {
  if (Ca)
    return qn;
  Ca = 1;
  var e = Ji(), t = Sp(), r = $o(), n = Zi(), o = Op(), a = function() {
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
    var d = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(O) {
      var B = O && (d && O[d] || O[f]);
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
      any: R(),
      arrayOf: w,
      element: E(),
      elementType: y(),
      instanceOf: N,
      node: V(),
      objectOf: _,
      oneOf: C,
      oneOfType: D,
      shape: S,
      exact: $
    };
    function h(O, B) {
      return O === B ? O !== 0 || 1 / O === 1 / B : O !== O && B !== B;
    }
    function u(O, B) {
      this.message = O, this.data = B && typeof B == "object" ? B : {}, this.stack = "";
    }
    u.prototype = Error.prototype;
    function b(O) {
      if (process.env.NODE_ENV !== "production")
        var B = {}, H = 0;
      function Z(X, K, J, q, ee, te, ie) {
        if (q = q || g, te = te || J, ie !== r) {
          if (c) {
            var L = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw L.name = "Invariant Violation", L;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var re = q + ":" + J;
            !B[re] && // Avoid spamming the console because they are often not actionable except for lib authors
            H < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + te + "` prop on `" + q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), B[re] = !0, H++);
          }
        }
        return K[J] == null ? X ? K[J] === null ? new u("The " + ee + " `" + te + "` is marked as required " + ("in `" + q + "`, but its value is `null`.")) : new u("The " + ee + " `" + te + "` is marked as required in " + ("`" + q + "`, but its value is `undefined`.")) : null : O(K, J, q, ee, te);
      }
      var W = Z.bind(null, !1);
      return W.isRequired = Z.bind(null, !0), W;
    }
    function x(O) {
      function B(H, Z, W, X, K, J) {
        var q = H[Z], ee = M(q);
        if (ee !== O) {
          var te = U(q);
          return new u(
            "Invalid " + X + " `" + K + "` of type " + ("`" + te + "` supplied to `" + W + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return b(B);
    }
    function R() {
      return b(i);
    }
    function w(O) {
      function B(H, Z, W, X, K) {
        if (typeof O != "function")
          return new u("Property `" + K + "` of component `" + W + "` has invalid PropType notation inside arrayOf.");
        var J = H[Z];
        if (!Array.isArray(J)) {
          var q = M(J);
          return new u("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected an array."));
        }
        for (var ee = 0; ee < J.length; ee++) {
          var te = O(J, ee, W, X, K + "[" + ee + "]", r);
          if (te instanceof Error)
            return te;
        }
        return null;
      }
      return b(B);
    }
    function E() {
      function O(B, H, Z, W, X) {
        var K = B[H];
        if (!l(K)) {
          var J = M(K);
          return new u("Invalid " + W + " `" + X + "` of type " + ("`" + J + "` supplied to `" + Z + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(O);
    }
    function y() {
      function O(B, H, Z, W, X) {
        var K = B[H];
        if (!e.isValidElementType(K)) {
          var J = M(K);
          return new u("Invalid " + W + " `" + X + "` of type " + ("`" + J + "` supplied to `" + Z + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(O);
    }
    function N(O) {
      function B(H, Z, W, X, K) {
        if (!(H[Z] instanceof O)) {
          var J = O.name || g, q = Y(H[Z]);
          return new u("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected ") + ("instance of `" + J + "`."));
        }
        return null;
      }
      return b(B);
    }
    function C(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function B(H, Z, W, X, K) {
        for (var J = H[Z], q = 0; q < O.length; q++)
          if (h(J, O[q]))
            return null;
        var ee = JSON.stringify(O, function(ie, L) {
          var re = U(L);
          return re === "symbol" ? String(L) : L;
        });
        return new u("Invalid " + X + " `" + K + "` of value `" + String(J) + "` " + ("supplied to `" + W + "`, expected one of " + ee + "."));
      }
      return b(B);
    }
    function _(O) {
      function B(H, Z, W, X, K) {
        if (typeof O != "function")
          return new u("Property `" + K + "` of component `" + W + "` has invalid PropType notation inside objectOf.");
        var J = H[Z], q = M(J);
        if (q !== "object")
          return new u("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected an object."));
        for (var ee in J)
          if (n(J, ee)) {
            var te = O(J, ee, W, X, K + "." + ee, r);
            if (te instanceof Error)
              return te;
          }
        return null;
      }
      return b(B);
    }
    function D(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var B = 0; B < O.length; B++) {
        var H = O[B];
        if (typeof H != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + Q(H) + " at index " + B + "."
          ), i;
      }
      function Z(W, X, K, J, q) {
        for (var ee = [], te = 0; te < O.length; te++) {
          var ie = O[te], L = ie(W, X, K, J, q, r);
          if (L == null)
            return null;
          L.data && n(L.data, "expectedType") && ee.push(L.data.expectedType);
        }
        var re = ee.length > 0 ? ", expected one of type [" + ee.join(", ") + "]" : "";
        return new u("Invalid " + J + " `" + q + "` supplied to " + ("`" + K + "`" + re + "."));
      }
      return b(Z);
    }
    function V() {
      function O(B, H, Z, W, X) {
        return z(B[H]) ? null : new u("Invalid " + W + " `" + X + "` supplied to " + ("`" + Z + "`, expected a ReactNode."));
      }
      return b(O);
    }
    function k(O, B, H, Z, W) {
      return new u(
        (O || "React class") + ": " + B + " type `" + H + "." + Z + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + W + "`."
      );
    }
    function S(O) {
      function B(H, Z, W, X, K) {
        var J = H[Z], q = M(J);
        if (q !== "object")
          return new u("Invalid " + X + " `" + K + "` of type `" + q + "` " + ("supplied to `" + W + "`, expected `object`."));
        for (var ee in O) {
          var te = O[ee];
          if (typeof te != "function")
            return k(W, X, K, ee, U(te));
          var ie = te(J, ee, W, X, K + "." + ee, r);
          if (ie)
            return ie;
        }
        return null;
      }
      return b(B);
    }
    function $(O) {
      function B(H, Z, W, X, K) {
        var J = H[Z], q = M(J);
        if (q !== "object")
          return new u("Invalid " + X + " `" + K + "` of type `" + q + "` " + ("supplied to `" + W + "`, expected `object`."));
        var ee = t({}, H[Z], O);
        for (var te in ee) {
          var ie = O[te];
          if (n(O, te) && typeof ie != "function")
            return k(W, X, K, te, U(ie));
          if (!ie)
            return new u(
              "Invalid " + X + " `" + K + "` key `" + te + "` supplied to `" + W + "`.\nBad object: " + JSON.stringify(H[Z], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var L = ie(J, te, W, X, K + "." + te, r);
          if (L)
            return L;
        }
        return null;
      }
      return b(B);
    }
    function z(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(z);
          if (O === null || l(O))
            return !0;
          var B = v(O);
          if (B) {
            var H = B.call(O), Z;
            if (B !== O.entries) {
              for (; !(Z = H.next()).done; )
                if (!z(Z.value))
                  return !1;
            } else
              for (; !(Z = H.next()).done; ) {
                var W = Z.value;
                if (W && !z(W[1]))
                  return !1;
              }
          } else
            return !1;
          return !0;
        default:
          return !1;
      }
    }
    function j(O, B) {
      return O === "symbol" ? !0 : B ? B["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && B instanceof Symbol : !1;
    }
    function M(O) {
      var B = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : j(B, O) ? "symbol" : B;
    }
    function U(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var B = M(O);
      if (B === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return B;
    }
    function Q(O) {
      var B = U(O);
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
    function Y(O) {
      return !O.constructor || !O.constructor.name ? g : O.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, qn;
}
var Yn, Sa;
function Pp() {
  if (Sa)
    return Yn;
  Sa = 1;
  var e = $o();
  function t() {
  }
  function r() {
  }
  return r.resetWarningCache = t, Yn = function() {
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
  }, Yn;
}
if (process.env.NODE_ENV !== "production") {
  var $p = Ji(), _p = !0;
  lo.exports = Rp()($p.isElement, _p);
} else
  lo.exports = Pp()();
var Ip = lo.exports;
const s = /* @__PURE__ */ Ep(Ip);
function Mp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Qi(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Mp(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const es = or(s.element, Qi);
es.isRequired = or(s.element.isRequired, Qi);
const jr = es;
function Ap(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Dp(e, t, r, n, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !Ap(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${n} \`${i}\` supplied to \`${r}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const jp = or(s.elementType, Dp), Bp = "exact-prop: ​";
function ts(e) {
  return process.env.NODE_ENV === "production" ? e : P({}, e, {
    [Bp]: (t) => {
      const r = Object.keys(t).filter((n) => !e.hasOwnProperty(n));
      return r.length > 0 ? new Error(`The following props are not supported: ${r.map((n) => `\`${n}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Jt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let r = 1; r < arguments.length; r += 1)
    t += "&args[]=" + encodeURIComponent(arguments[r]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var co = { exports: {} }, ue = {};
/**
 * @license React
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Oa;
function Lp() {
  if (Oa)
    return ue;
  Oa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
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
                  return x;
              }
          }
        case t:
          return x;
      }
    }
  }
  return ue.ContextConsumer = i, ue.ContextProvider = a, ue.Element = e, ue.ForwardRef = c, ue.Fragment = r, ue.Lazy = g, ue.Memo = v, ue.Portal = t, ue.Profiler = o, ue.StrictMode = n, ue.Suspense = d, ue.SuspenseList = f, ue.isAsyncMode = function() {
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
    return u(b) === d;
  }, ue.isSuspenseList = function(b) {
    return u(b) === f;
  }, ue.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === r || b === o || b === n || b === d || b === f || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === a || b.$$typeof === i || b.$$typeof === c || b.$$typeof === h || b.getModuleId !== void 0);
  }, ue.typeOf = u, ue;
}
var de = {};
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
function Vp() {
  return Ra || (Ra = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), r = Symbol.for("react.fragment"), n = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, u = !1, b = !1, x = !1, R = !1, w;
    w = Symbol.for("react.module.reference");
    function E(I) {
      return !!(typeof I == "string" || typeof I == "function" || I === r || I === o || R || I === n || I === d || I === f || x || I === p || h || u || b || typeof I == "object" && I !== null && (I.$$typeof === g || I.$$typeof === v || I.$$typeof === a || I.$$typeof === i || I.$$typeof === c || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      I.$$typeof === w || I.getModuleId !== void 0));
    }
    function y(I) {
      if (typeof I == "object" && I !== null) {
        var se = I.$$typeof;
        switch (se) {
          case e:
            var Te = I.type;
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
    var N = i, C = a, _ = e, D = c, V = r, k = g, S = v, $ = t, z = o, j = n, M = d, U = f, Q = !1, Y = !1;
    function O(I) {
      return Q || (Q = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function B(I) {
      return Y || (Y = !0, console.warn("The ReactIs.isConcurrentMode() alias has been deprecated, and will be removed in React 18+.")), !1;
    }
    function H(I) {
      return y(I) === i;
    }
    function Z(I) {
      return y(I) === a;
    }
    function W(I) {
      return typeof I == "object" && I !== null && I.$$typeof === e;
    }
    function X(I) {
      return y(I) === c;
    }
    function K(I) {
      return y(I) === r;
    }
    function J(I) {
      return y(I) === g;
    }
    function q(I) {
      return y(I) === v;
    }
    function ee(I) {
      return y(I) === t;
    }
    function te(I) {
      return y(I) === o;
    }
    function ie(I) {
      return y(I) === n;
    }
    function L(I) {
      return y(I) === d;
    }
    function re(I) {
      return y(I) === f;
    }
    de.ContextConsumer = N, de.ContextProvider = C, de.Element = _, de.ForwardRef = D, de.Fragment = V, de.Lazy = k, de.Memo = S, de.Portal = $, de.Profiler = z, de.StrictMode = j, de.Suspense = M, de.SuspenseList = U, de.isAsyncMode = O, de.isConcurrentMode = B, de.isContextConsumer = H, de.isContextProvider = Z, de.isElement = W, de.isForwardRef = X, de.isFragment = K, de.isLazy = J, de.isMemo = q, de.isPortal = ee, de.isProfiler = te, de.isStrictMode = ie, de.isSuspense = L, de.isSuspenseList = re, de.isValidElementType = E, de.typeOf = y;
  }()), de;
}
process.env.NODE_ENV === "production" ? co.exports = Lp() : co.exports = Vp();
var pn = co.exports;
const Fp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function zp(e) {
  const t = `${e}`.match(Fp);
  return t && t[1] || "";
}
function rs(e, t = "") {
  return e.displayName || e.name || zp(e) || t;
}
function Pa(e, t, r) {
  const n = rs(t);
  return e.displayName || (n !== "" ? `${r}(${n})` : r);
}
function Up(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return rs(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case pn.ForwardRef:
          return Pa(e, e.render, "ForwardRef");
        case pn.Memo:
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
const Hp = s.oneOfType([s.func, s.object]), _o = Hp;
function et(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Jt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function po(...e) {
  return e.reduce((t, r) => r == null ? t : function(...o) {
    t.apply(this, o), r.apply(this, o);
  }, () => {
  });
}
function ns(e, t = 166) {
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
function Gp(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (r, n, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || n;
    return typeof r[n] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Wp(e, t) {
  var r, n;
  return /* @__PURE__ */ T.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (r = e.type.muiName) != null ? r : (n = e.type) == null || (n = n._payload) == null || (n = n.value) == null ? void 0 : n.muiName
  ) !== -1;
}
function Oe(e) {
  return e && e.ownerDocument || document;
}
function Zt(e) {
  return Oe(e).defaultView || window;
}
function Xp(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const r = t ? P({}, t.propTypes) : null;
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
function un(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const qp = typeof window < "u" ? T.useLayoutEffect : T.useEffect, At = qp;
let $a = 0;
function Yp(e) {
  const [t, r] = T.useState(e), n = e || t;
  return T.useEffect(() => {
    t == null && ($a += 1, r(`mui-${$a}`));
  }, [t]), n;
}
const _a = T["useId".toString()];
function os(e) {
  if (_a !== void 0) {
    const t = _a();
    return e ?? t;
  }
  return Yp(e);
}
function Kp(e, t, r, n, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function as({
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
      !o && d !== t && console.error([`MUI: A component is changing the default ${n} state of an uncontrolled ${r} after being initialized. To suppress this warning opt to use a controlled ${r}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((d) => {
    o || i(d);
  }, []);
  return [l, c];
}
function $r(e) {
  const t = T.useRef(e);
  return At(() => {
    t.current = e;
  }), T.useRef((...r) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...r)
  )).current;
}
function Ge(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((r) => {
      un(r, t);
    });
  }, e);
}
const Ia = {};
function Jp(e, t) {
  const r = T.useRef(Ia);
  return r.current === Ia && (r.current = e(t)), r;
}
const Zp = [];
function Qp(e) {
  T.useEffect(e, Zp);
}
class Br {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new Br();
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
function vr() {
  const e = Jp(Br.create).current;
  return Qp(e.disposeEffect), e;
}
let Tn = !0, uo = !1;
const eu = new Br(), tu = {
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
function ru(e) {
  const {
    type: t,
    tagName: r
  } = e;
  return !!(r === "INPUT" && tu[t] && !e.readOnly || r === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function nu(e) {
  e.metaKey || e.altKey || e.ctrlKey || (Tn = !0);
}
function Kn() {
  Tn = !1;
}
function ou() {
  this.visibilityState === "hidden" && uo && (Tn = !0);
}
function au(e) {
  e.addEventListener("keydown", nu, !0), e.addEventListener("mousedown", Kn, !0), e.addEventListener("pointerdown", Kn, !0), e.addEventListener("touchstart", Kn, !0), e.addEventListener("visibilitychange", ou, !0);
}
function iu(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return Tn || ru(t);
}
function is() {
  const e = T.useCallback((o) => {
    o != null && au(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function r() {
    return t.current ? (uo = !0, eu.start(100, () => {
      uo = !1;
    }), t.current = !1, !0) : !1;
  }
  function n(o) {
    return iu(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: n,
    onBlur: r,
    ref: e
  };
}
function ss(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function su(e) {
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
function lu(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const cu = Number.isInteger || lu;
function ls(e, t, r, n) {
  const o = e[t];
  if (o == null || !cu(o)) {
    const a = su(o);
    return new RangeError(`Invalid ${n} \`${t}\` of type \`${a}\` supplied to \`${r}\`, expected \`integer\`.`);
  }
  return null;
}
function cs(e, t, ...r) {
  return e[t] === void 0 ? null : ls(e, t, ...r);
}
function fo() {
  return null;
}
cs.isRequired = ls;
fo.isRequired = fo;
const ps = process.env.NODE_ENV === "production" ? fo : cs;
function us(e, t) {
  const r = P({}, t);
  return Object.keys(e).forEach((n) => {
    if (n.toString().match(/^(components|slots)$/))
      r[n] = P({}, e[n], r[n]);
    else if (n.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[n] || {}, a = t[n];
      r[n] = {}, !a || !Object.keys(a) ? r[n] = o : !o || !Object.keys(o) ? r[n] = a : (r[n] = P({}, a), Object.keys(o).forEach((i) => {
        r[n][i] = us(o[i], a[i]);
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
const Ma = (e) => e, pu = () => {
  let e = Ma;
  return {
    configure(t) {
      e = t;
    },
    generate(t) {
      return e(t);
    },
    reset() {
      e = Ma;
    }
  };
}, uu = pu(), ds = uu, fs = {
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
  const n = fs[t];
  return n ? `${r}-${n}` : `${ds.generate(e)}-${t}`;
}
function wt(e, t, r = "Mui") {
  const n = {};
  return t.forEach((o) => {
    n[o] = rt(e, o, r);
  }), n;
}
function du(e, t = Number.MIN_SAFE_INTEGER, r = Number.MAX_SAFE_INTEGER) {
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
const fu = ["values", "unit", "step"], mu = (e) => {
  const t = Object.keys(e).map((r) => ({
    key: r,
    val: e[r]
  })) || [];
  return t.sort((r, n) => r.val - n.val), t.reduce((r, n) => P({}, r, {
    [n.key]: n.val
  }), {});
};
function hu(e) {
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
  } = e, o = ge(e, fu), a = mu(t), i = Object.keys(a);
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
  return P({
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
const gu = {
  borderRadius: 4
}, bu = gu, vu = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, xt = vu;
function kr(e, t) {
  return t ? st(e, t, {
    clone: !1
    // No need to clone deep, it's way faster.
  }) : e;
}
const Io = {
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
  up: (e) => `@media (min-width:${Io[e]}px)`
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
      if (Object.keys(a.values || Io).indexOf(l) !== -1) {
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
function yu(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((n, o) => {
    const a = e.up(o);
    return n[a] = {}, n;
  }, {})) || {};
}
function wu(e, t) {
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
function dn(e, t, r, n = r) {
  let o;
  return typeof e == "function" ? o = e(r) : Array.isArray(e) ? o = e[r] || n : o = Nn(e, r) || n, t && (o = t(o, n, e)), o;
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
    const l = i[t], c = i.theme, d = Nn(c, n) || {};
    return ct(i, l, (v) => {
      let g = dn(d, o, v);
      return v === g && typeof v == "string" && (g = dn(d, o, `${t}${v === "default" ? "" : et(v)}`, v)), r === !1 ? g : {
        [r]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: xt
  } : {}, a.filterProps = [t], a;
}
function xu(e) {
  const t = {};
  return (r) => (t[r] === void 0 && (t[r] = e(r)), t[r]);
}
const Eu = {
  m: "margin",
  p: "padding"
}, ku = {
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
}, Tu = xu((e) => {
  if (e.length > 2)
    if (Da[e])
      e = Da[e];
    else
      return [e];
  const [t, r] = e.split(""), n = Eu[t], o = ku[r] || "";
  return Array.isArray(o) ? o.map((a) => n + a) : [n + o];
}), Cn = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Sn = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Nu = [...Cn, ...Sn];
function Lr(e, t, r, n) {
  var o;
  const a = (o = Nn(e, t, !1)) != null ? o : r;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${n} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ms(e) {
  return Lr(e, "spacing", 8, "spacing");
}
function Vr(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const r = Math.abs(t), n = e(r);
  return t >= 0 ? n : typeof n == "number" ? -n : `-${n}`;
}
function Cu(e, t) {
  return (r) => e.reduce((n, o) => (n[o] = Vr(t, r), n), {});
}
function Su(e, t, r, n) {
  if (t.indexOf(r) === -1)
    return null;
  const o = Tu(r), a = Cu(o, n), i = e[r];
  return ct(e, i, a);
}
function hs(e, t) {
  const r = ms(e.theme);
  return Object.keys(e).map((n) => Su(e, t, n, r)).reduce(kr, {});
}
function ye(e) {
  return hs(e, Cn);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Cn.reduce((e, t) => (e[t] = xt, e), {}) : {};
ye.filterProps = Cn;
function we(e) {
  return hs(e, Sn);
}
we.propTypes = process.env.NODE_ENV !== "production" ? Sn.reduce((e, t) => (e[t] = xt, e), {}) : {};
we.filterProps = Sn;
process.env.NODE_ENV !== "production" && Nu.reduce((e, t) => (e[t] = xt, e), {});
function Ou(e = 8) {
  if (e.mui)
    return e;
  const t = ms({
    spacing: e
  }), r = (...n) => (process.env.NODE_ENV !== "production" && (n.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${n.length}`)), (n.length === 0 ? [1] : n).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return r.mui = !0, r;
}
function On(...e) {
  const t = e.reduce((n, o) => (o.filterProps.forEach((a) => {
    n[a] = o;
  }), n), {}), r = (n) => Object.keys(n).reduce((o, a) => t[a] ? kr(o, t[a](n)) : o, {});
  return r.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((n, o) => Object.assign(n, o.propTypes), {}) : {}, r.filterProps = e.reduce((n, o) => n.concat(o.filterProps), []), r;
}
function Ue(e) {
  return typeof e != "number" ? e : `${e}px solid`;
}
function qe(e, t) {
  return ke({
    prop: e,
    themeKey: "borders",
    transform: t
  });
}
const Ru = qe("border", Ue), Pu = qe("borderTop", Ue), $u = qe("borderRight", Ue), _u = qe("borderBottom", Ue), Iu = qe("borderLeft", Ue), Mu = qe("borderColor"), Au = qe("borderTopColor"), Du = qe("borderRightColor"), ju = qe("borderBottomColor"), Bu = qe("borderLeftColor"), Lu = qe("outline", Ue), Vu = qe("outlineColor"), Rn = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Lr(e.theme, "shape.borderRadius", 4, "borderRadius"), r = (n) => ({
      borderRadius: Vr(t, n)
    });
    return ct(e, e.borderRadius, r);
  }
  return null;
};
Rn.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: xt
} : {};
Rn.filterProps = ["borderRadius"];
On(Ru, Pu, $u, _u, Iu, Mu, Au, Du, ju, Bu, Rn, Lu, Vu);
const Pn = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Lr(e.theme, "spacing", 8, "gap"), r = (n) => ({
      gap: Vr(t, n)
    });
    return ct(e, e.gap, r);
  }
  return null;
};
Pn.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: xt
} : {};
Pn.filterProps = ["gap"];
const $n = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Lr(e.theme, "spacing", 8, "columnGap"), r = (n) => ({
      columnGap: Vr(t, n)
    });
    return ct(e, e.columnGap, r);
  }
  return null;
};
$n.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: xt
} : {};
$n.filterProps = ["columnGap"];
const _n = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Lr(e.theme, "spacing", 8, "rowGap"), r = (n) => ({
      rowGap: Vr(t, n)
    });
    return ct(e, e.rowGap, r);
  }
  return null;
};
_n.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: xt
} : {};
_n.filterProps = ["rowGap"];
const Fu = ke({
  prop: "gridColumn"
}), zu = ke({
  prop: "gridRow"
}), Uu = ke({
  prop: "gridAutoFlow"
}), Hu = ke({
  prop: "gridAutoColumns"
}), Gu = ke({
  prop: "gridAutoRows"
}), Wu = ke({
  prop: "gridTemplateColumns"
}), Xu = ke({
  prop: "gridTemplateRows"
}), qu = ke({
  prop: "gridTemplateAreas"
}), Yu = ke({
  prop: "gridArea"
});
On(Pn, $n, _n, Fu, zu, Uu, Hu, Gu, Wu, Xu, qu, Yu);
function Yt(e, t) {
  return t === "grey" ? t : e;
}
const Ku = ke({
  prop: "color",
  themeKey: "palette",
  transform: Yt
}), Ju = ke({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: Yt
}), Zu = ke({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: Yt
});
On(Ku, Ju, Zu);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const Qu = ke({
  prop: "width",
  transform: Ve
}), Mo = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (r) => {
      var n, o;
      const a = ((n = e.theme) == null || (n = n.breakpoints) == null || (n = n.values) == null ? void 0 : n[r]) || Io[r];
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
Mo.filterProps = ["maxWidth"];
const ed = ke({
  prop: "minWidth",
  transform: Ve
}), td = ke({
  prop: "height",
  transform: Ve
}), rd = ke({
  prop: "maxHeight",
  transform: Ve
}), nd = ke({
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
const od = ke({
  prop: "boxSizing"
});
On(Qu, Mo, ed, td, rd, nd, od);
const ad = {
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
    style: Rn
  },
  // palette
  color: {
    themeKey: "palette",
    transform: Yt
  },
  bgcolor: {
    themeKey: "palette",
    cssProperty: "backgroundColor",
    transform: Yt
  },
  backgroundColor: {
    themeKey: "palette",
    transform: Yt
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
    style: Pn
  },
  rowGap: {
    style: _n
  },
  columnGap: {
    style: $n
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
    style: Mo
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
}, Ao = ad;
function id(...e) {
  const t = e.reduce((n, o) => n.concat(Object.keys(o)), []), r = new Set(t);
  return e.every((n) => r.size === Object.keys(n).length);
}
function sd(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function ld() {
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
    const g = Nn(o, d) || {};
    return v ? v(i) : ct(i, n, (h) => {
      let u = dn(g, f, h);
      return h === u && typeof h == "string" && (u = dn(g, f, `${r}${h === "default" ? "" : et(h)}`, h)), c === !1 ? u : {
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
    const i = (n = a.unstable_sxConfig) != null ? n : Ao;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const f = yu(a.breakpoints), v = Object.keys(f);
      let g = f;
      return Object.keys(d).forEach((p) => {
        const h = sd(d[p], a);
        if (h != null)
          if (typeof h == "object")
            if (i[p])
              g = kr(g, e(p, h, a, i));
            else {
              const u = ct({
                theme: a
              }, h, (b) => ({
                [p]: b
              }));
              id(u, h) ? g[p] = t({
                sx: h,
                theme: a
              }) : g = kr(g, u);
            }
          else
            g = kr(g, e(p, h, a, i));
      }), wu(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const gs = ld();
gs.filterProps = ["sx"];
const Do = gs;
function cd(e, t) {
  const r = this;
  return r.vars && typeof r.getColorSchemeSelector == "function" ? {
    [r.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : r.palette.mode === e ? t : {};
}
const pd = ["breakpoints", "palette", "spacing", "shape"];
function jo(e = {}, ...t) {
  const {
    breakpoints: r = {},
    palette: n = {},
    spacing: o,
    shape: a = {}
  } = e, i = ge(e, pd), l = hu(r), c = Ou(o);
  let d = st({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: P({
      mode: "light"
    }, n),
    spacing: c,
    shape: P({}, bu, a)
  }, i);
  return d.applyStyles = cd, d = t.reduce((f, v) => st(f, v), d), d.unstable_sxConfig = P({}, Ao, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(v) {
    return Do({
      sx: v,
      theme: this
    });
  }, d;
}
function ud(e) {
  return Object.keys(e).length === 0;
}
function bs(e = null) {
  const t = T.useContext(Nc);
  return !t || ud(t) ? e : t;
}
const dd = jo();
function vs(e = dd) {
  return bs(e);
}
const fd = ["ownerState"], md = ["variants"], hd = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function gd(e) {
  return Object.keys(e).length === 0;
}
function bd(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function Qr(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const vd = jo(), ja = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Yr({
  defaultTheme: e,
  theme: t,
  themeId: r
}) {
  return gd(t) ? e : t[r] || t;
}
function yd(e) {
  return e ? (t, r) => r[e] : null;
}
function en(e, t) {
  let {
    ownerState: r
  } = t, n = ge(t, fd);
  const o = typeof e == "function" ? e(P({
    ownerState: r
  }, n)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => en(a, P({
      ownerState: r
    }, n)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = ge(o, md);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(P({
        ownerState: r
      }, n, r)) : Object.keys(c.props).forEach((f) => {
        (r == null ? void 0 : r[f]) !== c.props[f] && n[f] !== c.props[f] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(P({
        ownerState: r
      }, n, r)) : c.style));
    }), l;
  }
  return o;
}
function wd(e = {}) {
  const {
    themeId: t,
    defaultTheme: r = vd,
    rootShouldForwardProp: n = Qr,
    slotShouldForwardProp: o = Qr
  } = e, a = (i) => Do(P({}, i, {
    theme: Yr(P({}, i, {
      defaultTheme: r,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Cc(i, (y) => y.filter((N) => !(N != null && N.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = yd(ja(d))
    } = l, p = ge(l, hd), h = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), u = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${ja(d || "Root")}`);
    let x = Qr;
    d === "Root" || d === "root" ? x = n : d ? x = o : bd(i) && (x = void 0);
    const R = Tc(i, P({
      shouldForwardProp: x,
      label: b
    }, p)), w = (y) => typeof y == "function" && y.__emotion_real !== y || Rt(y) ? (N) => en(y, P({}, N, {
      theme: Yr({
        theme: N.theme,
        defaultTheme: r,
        themeId: t
      })
    })) : y, E = (y, ...N) => {
      let C = w(y);
      const _ = N ? N.map(w) : [];
      c && g && _.push((k) => {
        const S = Yr(P({}, k, {
          defaultTheme: r,
          themeId: t
        }));
        if (!S.components || !S.components[c] || !S.components[c].styleOverrides)
          return null;
        const $ = S.components[c].styleOverrides, z = {};
        return Object.entries($).forEach(([j, M]) => {
          z[j] = en(M, P({}, k, {
            theme: S
          }));
        }), g(k, z);
      }), c && !h && _.push((k) => {
        var S;
        const $ = Yr(P({}, k, {
          defaultTheme: r,
          themeId: t
        })), z = $ == null || (S = $.components) == null || (S = S[c]) == null ? void 0 : S.variants;
        return en({
          variants: z
        }, P({}, k, {
          theme: $
        }));
      }), u || _.push(a);
      const D = _.length - N.length;
      if (Array.isArray(y) && D > 0) {
        const k = new Array(D).fill("");
        C = [...y, ...k], C.raw = [...y.raw, ...k];
      }
      const V = R(C, ..._);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${et(d || "")}`), k === void 0 && (k = `Styled(${Up(i)})`), V.displayName = k;
      }
      return i.muiName && (V.muiName = i.muiName), V;
    };
    return R.withConfig && (E.withConfig = R.withConfig), E;
  };
}
function xd(e) {
  const {
    theme: t,
    name: r,
    props: n
  } = e;
  return !t || !t.components || !t.components[r] || !t.components[r].defaultProps ? n : us(t.components[r].defaultProps, n);
}
function Ed({
  props: e,
  name: t,
  defaultTheme: r,
  themeId: n
}) {
  let o = vs(r);
  return n && (o = o[n] || o), xd({
    theme: o,
    name: t,
    props: e
  });
}
function Bo(e, t = 0, r = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > r) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${r}].`), du(e, t, r);
}
function kd(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let r = e.match(t);
  return r && r[0].length === 1 && (r = r.map((n) => n + n)), r ? `rgb${r.length === 4 ? "a" : ""}(${r.map((n, o) => o < 3 ? parseInt(n, 16) : Math.round(parseInt(n, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function Dt(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return Dt(kd(e));
  const t = e.indexOf("("), r = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(r) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Jt(9, e));
  let n = e.substring(t + 1, e.length - 1), o;
  if (r === "color") {
    if (n = n.split(" "), o = n.shift(), n.length === 4 && n[3].charAt(0) === "/" && (n[3] = n[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Jt(10, o));
  } else
    n = n.split(",");
  return n = n.map((a) => parseFloat(a)), {
    type: r,
    values: n,
    colorSpace: o
  };
}
function In(e) {
  const {
    type: t,
    colorSpace: r
  } = e;
  let {
    values: n
  } = e;
  return t.indexOf("rgb") !== -1 ? n = n.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (n[1] = `${n[1]}%`, n[2] = `${n[2]}%`), t.indexOf("color") !== -1 ? n = `${r} ${n.join(" ")}` : n = `${n.join(", ")}`, `${t}(${n})`;
}
function Td(e) {
  e = Dt(e);
  const {
    values: t
  } = e, r = t[0], n = t[1] / 100, o = t[2] / 100, a = n * Math.min(o, 1 - o), i = (d, f = (d + r / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), In({
    type: l,
    values: c
  });
}
function Ba(e) {
  e = Dt(e);
  let t = e.type === "hsl" || e.type === "hsla" ? Dt(Td(e)).values : e.values;
  return t = t.map((r) => (e.type !== "color" && (r /= 255), r <= 0.03928 ? r / 12.92 : ((r + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function La(e, t) {
  const r = Ba(e), n = Ba(t);
  return (Math.max(r, n) + 0.05) / (Math.min(r, n) + 0.05);
}
function fn(e, t) {
  return e = Dt(e), t = Bo(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, In(e);
}
function Nd(e, t) {
  if (e = Dt(e), t = Bo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] *= 1 - t;
  return In(e);
}
function Cd(e, t) {
  if (e = Dt(e), t = Bo(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (255 - e.values[r]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let r = 0; r < 3; r += 1)
      e.values[r] += (1 - e.values[r]) * t;
  return In(e);
}
function Sd(e, t) {
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
const Od = {
  black: "#000",
  white: "#fff"
}, _r = Od, Rd = {
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
}, Pd = Rd, $d = {
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
}, Vt = $d, _d = {
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
}, Ft = _d, Id = {
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
}, dr = Id, Md = {
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
}, zt = Md, Ad = {
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
}, Ut = Ad, Dd = {
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
}, Ht = Dd, jd = ["mode", "contrastThreshold", "tonalOffset"], Va = {
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
    paper: _r.white,
    default: _r.white
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
}, Jn = {
  text: {
    primary: _r.white,
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
    active: _r.white,
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
  e[t] || (e.hasOwnProperty(r) ? e[t] = e[r] : t === "light" ? e.light = Cd(e.main, o) : t === "dark" && (e.dark = Nd(e.main, a)));
}
function Bd(e = "light") {
  return e === "dark" ? {
    main: zt[200],
    light: zt[50],
    dark: zt[400]
  } : {
    main: zt[700],
    light: zt[400],
    dark: zt[800]
  };
}
function Ld(e = "light") {
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
function Vd(e = "light") {
  return e === "dark" ? {
    main: Ft[500],
    light: Ft[300],
    dark: Ft[700]
  } : {
    main: Ft[700],
    light: Ft[400],
    dark: Ft[800]
  };
}
function Fd(e = "light") {
  return e === "dark" ? {
    main: Ut[400],
    light: Ut[300],
    dark: Ut[700]
  } : {
    main: Ut[700],
    light: Ut[500],
    dark: Ut[900]
  };
}
function zd(e = "light") {
  return e === "dark" ? {
    main: Ht[400],
    light: Ht[300],
    dark: Ht[700]
  } : {
    main: Ht[800],
    light: Ht[500],
    dark: Ht[900]
  };
}
function Ud(e = "light") {
  return e === "dark" ? {
    main: dr[400],
    light: dr[300],
    dark: dr[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: dr[500],
    dark: dr[900]
  };
}
function Hd(e) {
  const {
    mode: t = "light",
    contrastThreshold: r = 3,
    tonalOffset: n = 0.2
  } = e, o = ge(e, jd), a = e.primary || Bd(t), i = e.secondary || Ld(t), l = e.error || Vd(t), c = e.info || Fd(t), d = e.success || zd(t), f = e.warning || Ud(t);
  function v(u) {
    const b = La(u, Jn.text.primary) >= r ? Jn.text.primary : Va.text.primary;
    if (process.env.NODE_ENV !== "production") {
      const x = La(u, b);
      x < 3 && console.error([`MUI: The contrast ratio of ${x}:1 for ${b} on ${u}`, "falls below the WCAG recommended absolute minimum contrast ratio of 3:1.", "https://www.w3.org/TR/2008/REC-WCAG20-20081211/#visual-audio-contrast-contrast"].join(`
`));
    }
    return b;
  }
  const g = ({
    color: u,
    name: b,
    mainShade: x = 500,
    lightShade: R = 300,
    darkShade: w = 700
  }) => {
    if (u = P({}, u), !u.main && u[x] && (u.main = u[x]), !u.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Jt(11, b ? ` (${b})` : "", x));
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
} });` : Jt(12, b ? ` (${b})` : "", JSON.stringify(u.main)));
    return Fa(u, "light", R, n), Fa(u, "dark", w, n), u.contrastText || (u.contrastText = v(u.main)), u;
  }, p = {
    dark: Jn,
    light: Va
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), st(P({
    // A collection of common colors.
    common: P({}, _r),
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
    grey: Pd,
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
const Gd = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Wd(e) {
  return Math.round(e * 1e5) / 1e5;
}
const za = {
  textTransform: "uppercase"
}, Ua = '"Roboto", "Helvetica", "Arial", sans-serif';
function Xd(e, t) {
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
    htmlFontSize: d = 16,
    // Apply the CSS properties to all the variants.
    allVariants: f,
    pxToRem: v
  } = r, g = ge(r, Gd);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((x) => `${x / d * p}rem`), u = (x, R, w, E, y) => P({
    fontFamily: n,
    fontWeight: x,
    fontSize: h(R),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, n === Ua ? {
    letterSpacing: `${Wd(E / R)}em`
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
    button: u(l, 14, 1.75, 0.4, za),
    caption: u(i, 12, 1.66, 0.4),
    overline: u(i, 12, 2.66, 1, za),
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
const qd = 0.2, Yd = 0.14, Kd = 0.12;
function ve(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${qd})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Yd})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Kd})`].join(",");
}
const Jd = ["none", ve(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), ve(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), ve(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), ve(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), ve(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), ve(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), ve(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), ve(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), ve(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), ve(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), ve(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), ve(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), ve(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), ve(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), ve(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), ve(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), ve(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), ve(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), ve(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), ve(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), ve(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), ve(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), ve(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), ve(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], Zd = Jd, Qd = ["duration", "easing", "delay"], ef = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, tf = {
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
function rf(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function nf(e) {
  const t = P({}, ef, e.easing), r = P({}, tf, e.duration);
  return P({
    getAutoHeightDuration: rf,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = r.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, d = ge(a, Qd);
      if (process.env.NODE_ENV !== "production") {
        const f = (g) => typeof g == "string", v = (g) => !isNaN(parseFloat(g));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : Ha(i)} ${l} ${typeof c == "string" ? c : Ha(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: r
  });
}
const of = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, af = of, sf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function lf(e = {}, ...t) {
  const {
    mixins: r = {},
    palette: n = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = ge(e, sf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Jt(18));
  const l = Hd(n), c = jo(e);
  let d = st(c, {
    mixins: Sd(c.breakpoints, r),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: Zd.slice(),
    typography: Xd(l, a),
    transitions: nf(o),
    zIndex: P({}, af)
  });
  if (d = st(d, i), d = t.reduce((f, v) => st(f, v), d), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (g, p) => {
      let h;
      for (h in g) {
        const u = g[h];
        if (f.indexOf(h) !== -1 && Object.keys(u).length > 0) {
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
    Object.keys(d.components).forEach((g) => {
      const p = d.components[g].styleOverrides;
      p && g.indexOf("Mui") === 0 && v(p, g);
    });
  }
  return d.unstable_sxConfig = P({}, Ao, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(v) {
    return Do({
      sx: v,
      theme: this
    });
  }, d;
}
const cf = lf(), Lo = cf, Vo = "$$material";
function dt({
  props: e,
  name: t
}) {
  return Ed({
    props: e,
    name: t,
    defaultTheme: Lo,
    themeId: Vo
  });
}
const ys = (e) => Qr(e) && e !== "classes", pf = wd({
  themeId: Vo,
  defaultTheme: Lo,
  rootShouldForwardProp: ys
}), Re = pf;
function uf(e) {
  return rt("MuiSvgIcon", e);
}
wt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const df = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], ff = (e) => {
  const {
    color: t,
    fontSize: r,
    classes: n
  } = e, o = {
    root: ["root", t !== "inherit" && `color${et(t)}`, `fontSize${et(r)}`]
  };
  return ut(o, uf, n);
}, mf = Re("svg", {
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
  var r, n, o, a, i, l, c, d, f, v, g, p, h;
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
      large: ((d = e.typography) == null || (f = d.pxToRem) == null ? void 0 : f.call(d, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), Fo = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = dt({
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
  } = n, p = ge(n, df), h = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", u = P({}, n, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: g,
    hasSvgAsChild: h
  }), b = {};
  f || (b.viewBox = g);
  const x = ff(u);
  return /* @__PURE__ */ A(mf, P({
    as: l,
    className: Se(x.root, a),
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
process.env.NODE_ENV !== "production" && (Fo.propTypes = {
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
Fo.muiName = "SvgIcon";
const Ga = Fo;
function ws(e, t) {
  function r(n, o) {
    return /* @__PURE__ */ m(Ga, P({
      "data-testid": `${t}Icon`,
      ref: o
    }, n, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (r.displayName = `${t}Icon`), r.muiName = Ga.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(r));
}
const hf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), ds.configure(e);
  }
}, gf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: et,
  createChainedFunction: po,
  createSvgIcon: ws,
  debounce: ns,
  deprecatedPropType: Gp,
  isMuiElement: Wp,
  ownerDocument: Oe,
  ownerWindow: Zt,
  requirePropFactory: Xp,
  setRef: un,
  unstable_ClassNameGenerator: hf,
  unstable_useEnhancedEffect: At,
  unstable_useId: os,
  unsupportedProp: Kp,
  useControlled: as,
  useEventCallback: $r,
  useForkRef: Ge,
  useIsFocusVisible: is
}, Symbol.toStringTag, { value: "Module" })), bf = /* @__PURE__ */ kp(gf);
var Wa;
function vf() {
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
    var t = bf;
  }(Un)), Un;
}
var yf = Tp;
Object.defineProperty(Po, "__esModule", {
  value: !0
});
var xs = Po.default = void 0, wf = yf(vf()), xf = Dl;
xs = Po.default = (0, wf.default)(/* @__PURE__ */ (0, xf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Es(e) {
  return typeof e == "string";
}
function yr(e, t, r) {
  return e === void 0 || Es(e) ? t : P({}, t, {
    ownerState: P({}, t.ownerState, r)
  });
}
const Ef = {
  disableDefaultClasses: !1
}, kf = /* @__PURE__ */ T.createContext(Ef);
function Tf(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(kf);
  return (r) => t ? "" : e(r);
}
function ks(e, t = []) {
  if (e === void 0)
    return {};
  const r = {};
  return Object.keys(e).filter((n) => n.match(/^on[A-Z]/) && typeof e[n] == "function" && !t.includes(n)).forEach((n) => {
    r[n] = e[n];
  }), r;
}
function Nf(e, t, r) {
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
function Cf(e) {
  const {
    getSlotProps: t,
    additionalProps: r,
    externalSlotProps: n,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Se(r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), h = P({}, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), u = P({}, r, o, n);
    return p.length > 0 && (u.className = p), Object.keys(h).length > 0 && (u.style = h), {
      props: u,
      internalRef: void 0
    };
  }
  const i = ks(P({}, o, n)), l = Xa(n), c = Xa(o), d = t(i), f = Se(d == null ? void 0 : d.className, r == null ? void 0 : r.className, a, o == null ? void 0 : o.className, n == null ? void 0 : n.className), v = P({}, d == null ? void 0 : d.style, r == null ? void 0 : r.style, o == null ? void 0 : o.style, n == null ? void 0 : n.style), g = P({}, d, r, c, l);
  return f.length > 0 && (g.className = f), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: d.ref
  };
}
const Sf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function jt(e) {
  var t;
  const {
    elementType: r,
    externalSlotProps: n,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = ge(e, Sf), l = a ? {} : Nf(n, o), {
    props: c,
    internalRef: d
  } = Cf(P({}, i, {
    externalSlotProps: l
  })), f = Ge(d, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return yr(r, P({}, c, {
    ref: f
  }), o);
}
const Ts = "base";
function Of(e) {
  return `${Ts}--${e}`;
}
function Rf(e, t) {
  return `${Ts}-${e}-${t}`;
}
function Ns(e, t) {
  const r = fs[t];
  return r ? Of(r) : Rf(e, t);
}
function Pf(e, t) {
  const r = {};
  return t.forEach((n) => {
    r[n] = Ns(e, n);
  }), r;
}
const $f = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function _f(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function If(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (n) => e.ownerDocument.querySelector(`input[type="radio"]${n}`);
  let r = t(`[name="${e.name}"]:checked`);
  return r || (r = t(`[name="${e.name}"]`)), r !== e;
}
function Mf(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || If(e));
}
function Af(e) {
  const t = [], r = [];
  return Array.from(e.querySelectorAll($f)).forEach((n, o) => {
    const a = _f(n);
    a === -1 || !Mf(n) || (a === 0 ? t.push(n) : r.push({
      documentOrder: o,
      tabIndex: a,
      node: n
    }));
  }), r.sort((n, o) => n.tabIndex === o.tabIndex ? n.documentOrder - o.documentOrder : n.tabIndex - o.tabIndex).map((n) => n.node).concat(t);
}
function Df() {
  return !0;
}
function mn(e) {
  const {
    children: t,
    disableAutoFocus: r = !1,
    disableEnforceFocus: n = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = Af,
    isEnabled: i = Df,
    open: l
  } = e, c = T.useRef(!1), d = T.useRef(null), f = T.useRef(null), v = T.useRef(null), g = T.useRef(null), p = T.useRef(!1), h = T.useRef(null), u = Ge(t.ref, h), b = T.useRef(null);
  T.useEffect(() => {
    !l || !h.current || (p.current = !r);
  }, [r, l]), T.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Oe(h.current);
    return h.current.contains(w.activeElement) || (h.current.hasAttribute("tabIndex") || (process.env.NODE_ENV !== "production" && console.error(["MUI: The modal content node does not accept focus.", 'For the benefit of assistive technologies, the tabIndex of the node is being set to "-1".'].join(`
`)), h.current.setAttribute("tabIndex", "-1")), p.current && h.current.focus()), () => {
      o || (v.current && v.current.focus && (c.current = !0, v.current.focus()), v.current = null);
    };
  }, [l]), T.useEffect(() => {
    if (!l || !h.current)
      return;
    const w = Oe(h.current), E = (C) => {
      b.current = C, !(n || !i() || C.key !== "Tab") && w.activeElement === h.current && C.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const C = h.current;
      if (C === null)
        return;
      if (!w.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (C.contains(w.activeElement) || n && w.activeElement !== d.current && w.activeElement !== f.current)
        return;
      if (w.activeElement !== g.current)
        g.current = null;
      else if (g.current !== null)
        return;
      if (!p.current)
        return;
      let _ = [];
      if ((w.activeElement === d.current || w.activeElement === f.current) && (_ = a(h.current)), _.length > 0) {
        var D, V;
        const k = !!((D = b.current) != null && D.shiftKey && ((V = b.current) == null ? void 0 : V.key) === "Tab"), S = _[0], $ = _[_.length - 1];
        typeof S != "string" && typeof $ != "string" && (k ? $.focus() : S.focus());
      } else
        C.focus();
    };
    w.addEventListener("focusin", y), w.addEventListener("keydown", E, !0);
    const N = setInterval(() => {
      w.activeElement && w.activeElement.tagName === "BODY" && y();
    }, 50);
    return () => {
      clearInterval(N), w.removeEventListener("focusin", y), w.removeEventListener("keydown", E, !0);
    };
  }, [r, n, o, i, l, a]);
  const x = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0, g.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, R = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ A(T.Fragment, {
    children: [/* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: R,
      ref: d,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: u,
      onFocus: x
    }), /* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: R,
      ref: f,
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
  children: jr,
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
process.env.NODE_ENV !== "production" && (mn["propTypes"] = ts(mn.propTypes));
function jf(e) {
  return typeof e == "function" ? e() : e;
}
const Ir = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const {
    children: n,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = T.useState(null), c = Ge(/* @__PURE__ */ T.isValidElement(n) ? n.ref : null, r);
  if (At(() => {
    a || l(jf(o) || document.body);
  }, [o, a]), At(() => {
    if (i && !a)
      return un(r, i), () => {
        un(r, null);
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
    children: i && /* @__PURE__ */ Sc.createPortal(n, i)
  });
});
process.env.NODE_ENV !== "production" && (Ir.propTypes = {
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
process.env.NODE_ENV !== "production" && (Ir["propTypes"] = ts(Ir.propTypes));
function Bf(e) {
  const t = Oe(e);
  return t.body === e ? Zt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Tr(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function qa(e) {
  return parseInt(Zt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function Lf(e) {
  const r = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, n = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return r || n;
}
function Ya(e, t, r, n, o) {
  const a = [t, r, ...n];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !Lf(i);
    l && c && Tr(i, o);
  });
}
function Zn(e, t) {
  let r = -1;
  return e.some((n, o) => t(n) ? (r = o, !0) : !1), r;
}
function Vf(e, t) {
  const r = [], n = e.container;
  if (!t.disableScrollLock) {
    if (Bf(n)) {
      const i = ss(Oe(n));
      r.push({
        value: n.style.paddingRight,
        property: "padding-right",
        el: n
      }), n.style.paddingRight = `${qa(n) + i}px`;
      const l = Oe(n).querySelectorAll(".mui-fixed");
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
      a = Oe(n).body;
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
function Ff(e) {
  const t = [];
  return [].forEach.call(e.children, (r) => {
    r.getAttribute("aria-hidden") === "true" && t.push(r);
  }), t;
}
class zf {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, r) {
    let n = this.modals.indexOf(t);
    if (n !== -1)
      return n;
    n = this.modals.length, this.modals.push(t), t.modalRef && Tr(t.modalRef, !1);
    const o = Ff(r);
    Ya(r, t.mount, t.modalRef, o, !0);
    const a = Zn(this.containers, (i) => i.container === r);
    return a !== -1 ? (this.containers[a].modals.push(t), n) : (this.containers.push({
      modals: [t],
      container: r,
      restore: null,
      hiddenSiblings: o
    }), n);
  }
  mount(t, r) {
    const n = Zn(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[n];
    o.restore || (o.restore = Vf(o, r));
  }
  remove(t, r = !0) {
    const n = this.modals.indexOf(t);
    if (n === -1)
      return n;
    const o = Zn(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(n, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Tr(t.modalRef, r), Ya(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
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
function Uf(e) {
  return typeof e == "function" ? e() : e;
}
function Hf(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const Gf = new zf();
function Wf(e) {
  const {
    container: t,
    disableEscapeKeyDown: r = !1,
    disableScrollLock: n = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = Gf,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: d,
    open: f,
    rootRef: v
  } = e, g = T.useRef({}), p = T.useRef(null), h = T.useRef(null), u = Ge(h, v), [b, x] = T.useState(!f), R = Hf(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const E = () => Oe(p.current), y = () => (g.current.modalRef = h.current, g.current.mount = p.current, g.current), N = () => {
    o.mount(y(), {
      disableScrollLock: n
    }), h.current && (h.current.scrollTop = 0);
  }, C = $r(() => {
    const M = Uf(t) || E().body;
    o.add(y(), M), h.current && N();
  }), _ = T.useCallback(() => o.isTopModal(y()), [o]), D = $r((M) => {
    p.current = M, M && (f && _() ? N() : h.current && Tr(h.current, w));
  }), V = T.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    V();
  }, [V]), T.useEffect(() => {
    f ? C() : (!R || !a) && V();
  }, [f, V, R, a, C]);
  const k = (M) => (U) => {
    var Q;
    (Q = M.onKeyDown) == null || Q.call(M, U), !(U.key !== "Escape" || U.which === 229 || // Wait until IME is settled.
    !_()) && (r || (U.stopPropagation(), d && d(U, "escapeKeyDown")));
  }, S = (M) => (U) => {
    var Q;
    (Q = M.onClick) == null || Q.call(M, U), U.target === U.currentTarget && d && d(U, "backdropClick");
  };
  return {
    getRootProps: (M = {}) => {
      const U = ks(e);
      delete U.onTransitionEnter, delete U.onTransitionExited;
      const Q = P({}, U, M);
      return P({
        role: "presentation"
      }, Q, {
        onKeyDown: k(Q),
        ref: u
      });
    },
    getBackdropProps: (M = {}) => {
      const U = M;
      return P({
        "aria-hidden": !0
      }, U, {
        onClick: S(U),
        open: f
      });
    },
    getTransitionProps: () => {
      const M = () => {
        x(!1), i && i();
      }, U = () => {
        x(!0), l && l(), a && V();
      };
      return {
        onEnter: po(M, c == null ? void 0 : c.props.onEnter),
        onExited: po(U, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: u,
    portalRef: D,
    isTopModal: _,
    exited: b,
    hasTransition: R
  };
}
var Ie = "top", We = "bottom", Xe = "right", Me = "left", zo = "auto", Fr = [Ie, We, Xe, Me], Qt = "start", Mr = "end", Xf = "clippingParents", Cs = "viewport", fr = "popper", qf = "reference", Ka = /* @__PURE__ */ Fr.reduce(function(e, t) {
  return e.concat([t + "-" + Qt, t + "-" + Mr]);
}, []), Ss = /* @__PURE__ */ [].concat(Fr, [zo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Qt, t + "-" + Mr]);
}, []), Yf = "beforeRead", Kf = "read", Jf = "afterRead", Zf = "beforeMain", Qf = "main", em = "afterMain", tm = "beforeWrite", rm = "write", nm = "afterWrite", om = [Yf, Kf, Jf, Zf, Qf, em, tm, rm, nm];
function tt(e) {
  return e ? (e.nodeName || "").toLowerCase() : null;
}
function Fe(e) {
  if (e == null)
    return window;
  if (e.toString() !== "[object Window]") {
    var t = e.ownerDocument;
    return t && t.defaultView || window;
  }
  return e;
}
function Bt(e) {
  var t = Fe(e).Element;
  return e instanceof t || e instanceof Element;
}
function He(e) {
  var t = Fe(e).HTMLElement;
  return e instanceof t || e instanceof HTMLElement;
}
function Uo(e) {
  if (typeof ShadowRoot > "u")
    return !1;
  var t = Fe(e).ShadowRoot;
  return e instanceof t || e instanceof ShadowRoot;
}
function am(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(r) {
    var n = t.styles[r] || {}, o = t.attributes[r] || {}, a = t.elements[r];
    !He(a) || !tt(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function im(e) {
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
      !He(o) || !tt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const sm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: am,
  effect: im,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var It = Math.max, hn = Math.min, er = Math.round;
function mo() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Os() {
  return !/^((?!chrome|android).)*safari/i.test(mo());
}
function tr(e, t, r) {
  t === void 0 && (t = !1), r === void 0 && (r = !1);
  var n = e.getBoundingClientRect(), o = 1, a = 1;
  t && He(e) && (o = e.offsetWidth > 0 && er(n.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && er(n.height) / e.offsetHeight || 1);
  var i = Bt(e) ? Fe(e) : window, l = i.visualViewport, c = !Os() && r, d = (n.left + (c && l ? l.offsetLeft : 0)) / o, f = (n.top + (c && l ? l.offsetTop : 0)) / a, v = n.width / o, g = n.height / a;
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
function Ho(e) {
  var t = tr(e), r = e.offsetWidth, n = e.offsetHeight;
  return Math.abs(t.width - r) <= 1 && (r = t.width), Math.abs(t.height - n) <= 1 && (n = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: r,
    height: n
  };
}
function Rs(e, t) {
  var r = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (r && Uo(r)) {
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
  return Fe(e).getComputedStyle(e);
}
function lm(e) {
  return ["table", "td", "th"].indexOf(tt(e)) >= 0;
}
function Et(e) {
  return ((Bt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function Mn(e) {
  return tt(e) === "html" ? e : (
    // this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    e.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    e.parentNode || // DOM Element detected
    (Uo(e) ? e.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    Et(e)
  );
}
function Ja(e) {
  return !He(e) || // https://github.com/popperjs/popper-core/issues/837
  pt(e).position === "fixed" ? null : e.offsetParent;
}
function cm(e) {
  var t = /firefox/i.test(mo()), r = /Trident/i.test(mo());
  if (r && He(e)) {
    var n = pt(e);
    if (n.position === "fixed")
      return null;
  }
  var o = Mn(e);
  for (Uo(o) && (o = o.host); He(o) && ["html", "body"].indexOf(tt(o)) < 0; ) {
    var a = pt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function zr(e) {
  for (var t = Fe(e), r = Ja(e); r && lm(r) && pt(r).position === "static"; )
    r = Ja(r);
  return r && (tt(r) === "html" || tt(r) === "body" && pt(r).position === "static") ? t : r || cm(e) || t;
}
function Go(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Nr(e, t, r) {
  return It(e, hn(t, r));
}
function pm(e, t, r) {
  var n = Nr(e, t, r);
  return n > r ? r : n;
}
function Ps() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function $s(e) {
  return Object.assign({}, Ps(), e);
}
function _s(e, t) {
  return t.reduce(function(r, n) {
    return r[n] = e, r;
  }, {});
}
var um = function(t, r) {
  return t = typeof t == "function" ? t(Object.assign({}, r.rects, {
    placement: r.placement
  })) : t, $s(typeof t != "number" ? t : _s(t, Fr));
};
function dm(e) {
  var t, r = e.state, n = e.name, o = e.options, a = r.elements.arrow, i = r.modifiersData.popperOffsets, l = Ze(r.placement), c = Go(l), d = [Me, Xe].indexOf(l) >= 0, f = d ? "height" : "width";
  if (!(!a || !i)) {
    var v = um(o.padding, r), g = Ho(a), p = c === "y" ? Ie : Me, h = c === "y" ? We : Xe, u = r.rects.reference[f] + r.rects.reference[c] - i[c] - r.rects.popper[f], b = i[c] - r.rects.reference[c], x = zr(a), R = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = u / 2 - b / 2, E = v[p], y = R - g[f] - v[h], N = R / 2 - g[f] / 2 + w, C = Nr(E, N, y), _ = c;
    r.modifiersData[n] = (t = {}, t[_] = C, t.centerOffset = C - N, t);
  }
}
function fm(e) {
  var t = e.state, r = e.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Rs(t.elements.popper, o) && (t.elements.arrow = o));
}
const mm = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: dm,
  effect: fm,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function rr(e) {
  return e.split("-")[1];
}
var hm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function gm(e, t) {
  var r = e.x, n = e.y, o = t.devicePixelRatio || 1;
  return {
    x: er(r * o) / o || 0,
    y: er(n * o) / o || 0
  };
}
function Za(e) {
  var t, r = e.popper, n = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, d = e.adaptive, f = e.roundOffsets, v = e.isFixed, g = i.x, p = g === void 0 ? 0 : g, h = i.y, u = h === void 0 ? 0 : h, b = typeof f == "function" ? f({
    x: p,
    y: u
  }) : {
    x: p,
    y: u
  };
  p = b.x, u = b.y;
  var x = i.hasOwnProperty("x"), R = i.hasOwnProperty("y"), w = Me, E = Ie, y = window;
  if (d) {
    var N = zr(r), C = "clientHeight", _ = "clientWidth";
    if (N === Fe(r) && (N = Et(r), pt(N).position !== "static" && l === "absolute" && (C = "scrollHeight", _ = "scrollWidth")), N = N, o === Ie || (o === Me || o === Xe) && a === Mr) {
      E = We;
      var D = v && N === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        N[C]
      );
      u -= D - n.height, u *= c ? 1 : -1;
    }
    if (o === Me || (o === Ie || o === We) && a === Mr) {
      w = Xe;
      var V = v && N === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        N[_]
      );
      p -= V - n.width, p *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, d && hm), S = f === !0 ? gm({
    x: p,
    y: u
  }, Fe(r)) : {
    x: p,
    y: u
  };
  if (p = S.x, u = S.y, c) {
    var $;
    return Object.assign({}, k, ($ = {}, $[E] = R ? "0" : "", $[w] = x ? "0" : "", $.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + u + "px)" : "translate3d(" + p + "px, " + u + "px, 0)", $));
  }
  return Object.assign({}, k, (t = {}, t[E] = R ? u + "px" : "", t[w] = x ? p + "px" : "", t.transform = "", t));
}
function bm(e) {
  var t = e.state, r = e.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, i = a === void 0 ? !0 : a, l = r.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Ze(t.placement),
    variation: rr(t.placement),
    popper: t.elements.popper,
    popperRect: t.rects.popper,
    gpuAcceleration: o,
    isFixed: t.options.strategy === "fixed"
  };
  t.modifiersData.popperOffsets != null && (t.styles.popper = Object.assign({}, t.styles.popper, Za(Object.assign({}, d, {
    offsets: t.modifiersData.popperOffsets,
    position: t.options.strategy,
    adaptive: i,
    roundOffsets: c
  })))), t.modifiersData.arrow != null && (t.styles.arrow = Object.assign({}, t.styles.arrow, Za(Object.assign({}, d, {
    offsets: t.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: c
  })))), t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-placement": t.placement
  });
}
const vm = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: bm,
  data: {}
};
var Kr = {
  passive: !0
};
function ym(e) {
  var t = e.state, r = e.instance, n = e.options, o = n.scroll, a = o === void 0 ? !0 : o, i = n.resize, l = i === void 0 ? !0 : i, c = Fe(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && d.forEach(function(f) {
    f.addEventListener("scroll", r.update, Kr);
  }), l && c.addEventListener("resize", r.update, Kr), function() {
    a && d.forEach(function(f) {
      f.removeEventListener("scroll", r.update, Kr);
    }), l && c.removeEventListener("resize", r.update, Kr);
  };
}
const wm = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: ym,
  data: {}
};
var xm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function tn(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return xm[t];
  });
}
var Em = {
  start: "end",
  end: "start"
};
function Qa(e) {
  return e.replace(/start|end/g, function(t) {
    return Em[t];
  });
}
function Wo(e) {
  var t = Fe(e), r = t.pageXOffset, n = t.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Xo(e) {
  return tr(Et(e)).left + Wo(e).scrollLeft;
}
function km(e, t) {
  var r = Fe(e), n = Et(e), o = r.visualViewport, a = n.clientWidth, i = n.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = Os();
    (d || !d && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Xo(e),
    y: c
  };
}
function Tm(e) {
  var t, r = Et(e), n = Wo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = It(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = It(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -n.scrollLeft + Xo(e), c = -n.scrollTop;
  return pt(o || r).direction === "rtl" && (l += It(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function qo(e) {
  var t = pt(e), r = t.overflow, n = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function Is(e) {
  return ["html", "body", "#document"].indexOf(tt(e)) >= 0 ? e.ownerDocument.body : He(e) && qo(e) ? e : Is(Mn(e));
}
function Cr(e, t) {
  var r;
  t === void 0 && (t = []);
  var n = Is(e), o = n === ((r = e.ownerDocument) == null ? void 0 : r.body), a = Fe(n), i = o ? [a].concat(a.visualViewport || [], qo(n) ? n : []) : n, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Cr(Mn(i)))
  );
}
function ho(e) {
  return Object.assign({}, e, {
    left: e.x,
    top: e.y,
    right: e.x + e.width,
    bottom: e.y + e.height
  });
}
function Nm(e, t) {
  var r = tr(e, !1, t === "fixed");
  return r.top = r.top + e.clientTop, r.left = r.left + e.clientLeft, r.bottom = r.top + e.clientHeight, r.right = r.left + e.clientWidth, r.width = e.clientWidth, r.height = e.clientHeight, r.x = r.left, r.y = r.top, r;
}
function ei(e, t, r) {
  return t === Cs ? ho(km(e, r)) : Bt(t) ? Nm(t, r) : ho(Tm(Et(e)));
}
function Cm(e) {
  var t = Cr(Mn(e)), r = ["absolute", "fixed"].indexOf(pt(e).position) >= 0, n = r && He(e) ? zr(e) : e;
  return Bt(n) ? t.filter(function(o) {
    return Bt(o) && Rs(o, n) && tt(o) !== "body";
  }) : [];
}
function Sm(e, t, r, n) {
  var o = t === "clippingParents" ? Cm(e) : [].concat(t), a = [].concat(o, [r]), i = a[0], l = a.reduce(function(c, d) {
    var f = ei(e, d, n);
    return c.top = It(f.top, c.top), c.right = hn(f.right, c.right), c.bottom = hn(f.bottom, c.bottom), c.left = It(f.left, c.left), c;
  }, ei(e, i, n));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Ms(e) {
  var t = e.reference, r = e.element, n = e.placement, o = n ? Ze(n) : null, a = n ? rr(n) : null, i = t.x + t.width / 2 - r.width / 2, l = t.y + t.height / 2 - r.height / 2, c;
  switch (o) {
    case Ie:
      c = {
        x: i,
        y: t.y - r.height
      };
      break;
    case We:
      c = {
        x: i,
        y: t.y + t.height
      };
      break;
    case Xe:
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
  var d = o ? Go(o) : null;
  if (d != null) {
    var f = d === "y" ? "height" : "width";
    switch (a) {
      case Qt:
        c[d] = c[d] - (t[f] / 2 - r[f] / 2);
        break;
      case Mr:
        c[d] = c[d] + (t[f] / 2 - r[f] / 2);
        break;
    }
  }
  return c;
}
function Ar(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = n === void 0 ? e.placement : n, a = r.strategy, i = a === void 0 ? e.strategy : a, l = r.boundary, c = l === void 0 ? Xf : l, d = r.rootBoundary, f = d === void 0 ? Cs : d, v = r.elementContext, g = v === void 0 ? fr : v, p = r.altBoundary, h = p === void 0 ? !1 : p, u = r.padding, b = u === void 0 ? 0 : u, x = $s(typeof b != "number" ? b : _s(b, Fr)), R = g === fr ? qf : fr, w = e.rects.popper, E = e.elements[h ? R : g], y = Sm(Bt(E) ? E : E.contextElement || Et(e.elements.popper), c, f, i), N = tr(e.elements.reference), C = Ms({
    reference: N,
    element: w,
    strategy: "absolute",
    placement: o
  }), _ = ho(Object.assign({}, w, C)), D = g === fr ? _ : N, V = {
    top: y.top - D.top + x.top,
    bottom: D.bottom - y.bottom + x.bottom,
    left: y.left - D.left + x.left,
    right: D.right - y.right + x.right
  }, k = e.modifiersData.offset;
  if (g === fr && k) {
    var S = k[o];
    Object.keys(V).forEach(function($) {
      var z = [Xe, We].indexOf($) >= 0 ? 1 : -1, j = [Ie, We].indexOf($) >= 0 ? "y" : "x";
      V[$] += S[j] * z;
    });
  }
  return V;
}
function Om(e, t) {
  t === void 0 && (t = {});
  var r = t, n = r.placement, o = r.boundary, a = r.rootBoundary, i = r.padding, l = r.flipVariations, c = r.allowedAutoPlacements, d = c === void 0 ? Ss : c, f = rr(n), v = f ? l ? Ka : Ka.filter(function(h) {
    return rr(h) === f;
  }) : Fr, g = v.filter(function(h) {
    return d.indexOf(h) >= 0;
  });
  g.length === 0 && (g = v);
  var p = g.reduce(function(h, u) {
    return h[u] = Ar(e, {
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
function Rm(e) {
  if (Ze(e) === zo)
    return [];
  var t = tn(e);
  return [Qa(e), t, Qa(t)];
}
function Pm(e) {
  var t = e.state, r = e.options, n = e.name;
  if (!t.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !0 : i, c = r.fallbackPlacements, d = r.padding, f = r.boundary, v = r.rootBoundary, g = r.altBoundary, p = r.flipVariations, h = p === void 0 ? !0 : p, u = r.allowedAutoPlacements, b = t.options.placement, x = Ze(b), R = x === b, w = c || (R || !h ? [tn(b)] : Rm(b)), E = [b].concat(w).reduce(function(W, X) {
      return W.concat(Ze(X) === zo ? Om(t, {
        placement: X,
        boundary: f,
        rootBoundary: v,
        padding: d,
        flipVariations: h,
        allowedAutoPlacements: u
      }) : X);
    }, []), y = t.rects.reference, N = t.rects.popper, C = /* @__PURE__ */ new Map(), _ = !0, D = E[0], V = 0; V < E.length; V++) {
      var k = E[V], S = Ze(k), $ = rr(k) === Qt, z = [Ie, We].indexOf(S) >= 0, j = z ? "width" : "height", M = Ar(t, {
        placement: k,
        boundary: f,
        rootBoundary: v,
        altBoundary: g,
        padding: d
      }), U = z ? $ ? Xe : Me : $ ? We : Ie;
      y[j] > N[j] && (U = tn(U));
      var Q = tn(U), Y = [];
      if (a && Y.push(M[S] <= 0), l && Y.push(M[U] <= 0, M[Q] <= 0), Y.every(function(W) {
        return W;
      })) {
        D = k, _ = !1;
        break;
      }
      C.set(k, Y);
    }
    if (_)
      for (var O = h ? 3 : 1, B = function(X) {
        var K = E.find(function(J) {
          var q = C.get(J);
          if (q)
            return q.slice(0, X).every(function(ee) {
              return ee;
            });
        });
        if (K)
          return D = K, "break";
      }, H = O; H > 0; H--) {
        var Z = B(H);
        if (Z === "break")
          break;
      }
    t.placement !== D && (t.modifiersData[n]._skip = !0, t.placement = D, t.reset = !0);
  }
}
const $m = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Pm,
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
  return [Ie, Xe, We, Me].some(function(t) {
    return e[t] >= 0;
  });
}
function _m(e) {
  var t = e.state, r = e.name, n = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = Ar(t, {
    elementContext: "reference"
  }), l = Ar(t, {
    altBoundary: !0
  }), c = ti(i, n), d = ti(l, o, a), f = ri(c), v = ri(d);
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
const Im = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: _m
};
function Mm(e, t, r) {
  var n = Ze(e), o = [Me, Ie].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, t, {
    placement: e
  })) : r, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Me, Xe].indexOf(n) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function Am(e) {
  var t = e.state, r = e.options, n = e.name, o = r.offset, a = o === void 0 ? [0, 0] : o, i = Ss.reduce(function(f, v) {
    return f[v] = Mm(v, t.rects, a), f;
  }, {}), l = i[t.placement], c = l.x, d = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += d), t.modifiersData[n] = i;
}
const Dm = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: Am
};
function jm(e) {
  var t = e.state, r = e.name;
  t.modifiersData[r] = Ms({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Bm = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: jm,
  data: {}
};
function Lm(e) {
  return e === "x" ? "y" : "x";
}
function Vm(e) {
  var t = e.state, r = e.options, n = e.name, o = r.mainAxis, a = o === void 0 ? !0 : o, i = r.altAxis, l = i === void 0 ? !1 : i, c = r.boundary, d = r.rootBoundary, f = r.altBoundary, v = r.padding, g = r.tether, p = g === void 0 ? !0 : g, h = r.tetherOffset, u = h === void 0 ? 0 : h, b = Ar(t, {
    boundary: c,
    rootBoundary: d,
    padding: v,
    altBoundary: f
  }), x = Ze(t.placement), R = rr(t.placement), w = !R, E = Go(x), y = Lm(E), N = t.modifiersData.popperOffsets, C = t.rects.reference, _ = t.rects.popper, D = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, V = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, S = {
    x: 0,
    y: 0
  };
  if (N) {
    if (a) {
      var $, z = E === "y" ? Ie : Me, j = E === "y" ? We : Xe, M = E === "y" ? "height" : "width", U = N[E], Q = U + b[z], Y = U - b[j], O = p ? -_[M] / 2 : 0, B = R === Qt ? C[M] : _[M], H = R === Qt ? -_[M] : -C[M], Z = t.elements.arrow, W = p && Z ? Ho(Z) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ps(), K = X[z], J = X[j], q = Nr(0, C[M], W[M]), ee = w ? C[M] / 2 - O - q - K - V.mainAxis : B - q - K - V.mainAxis, te = w ? -C[M] / 2 + O + q + J + V.mainAxis : H + q + J + V.mainAxis, ie = t.elements.arrow && zr(t.elements.arrow), L = ie ? E === "y" ? ie.clientTop || 0 : ie.clientLeft || 0 : 0, re = ($ = k == null ? void 0 : k[E]) != null ? $ : 0, I = U + ee - re - L, se = U + te - re, Te = Nr(p ? hn(Q, I) : Q, U, p ? It(Y, se) : Y);
      N[E] = Te, S[E] = Te - U;
    }
    if (l) {
      var Pe, Ee = E === "x" ? Ie : Me, kt = E === "x" ? We : Xe, $e = N[y], nt = y === "y" ? "height" : "width", je = $e + b[Ee], ot = $e - b[kt], Ne = [Ie, Me].indexOf(x) !== -1, Lt = (Pe = k == null ? void 0 : k[y]) != null ? Pe : 0, Tt = Ne ? je : $e - C[nt] - _[nt] - Lt + V.altAxis, ar = Ne ? $e + C[nt] + _[nt] - Lt - V.altAxis : ot, Hr = p && Ne ? pm(Tt, $e, ar) : Nr(p ? Tt : je, $e, p ? ar : ot);
      N[y] = Hr, S[y] = Hr - $e;
    }
    t.modifiersData[n] = S;
  }
}
const Fm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Vm,
  requiresIfExists: ["offset"]
};
function zm(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Um(e) {
  return e === Fe(e) || !He(e) ? Wo(e) : zm(e);
}
function Hm(e) {
  var t = e.getBoundingClientRect(), r = er(t.width) / e.offsetWidth || 1, n = er(t.height) / e.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Gm(e, t, r) {
  r === void 0 && (r = !1);
  var n = He(t), o = He(t) && Hm(t), a = Et(t), i = tr(e, o, r), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((tt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  qo(a)) && (l = Um(t)), He(t) ? (c = tr(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Xo(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Wm(e) {
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
function Xm(e) {
  var t = Wm(e);
  return om.reduce(function(r, n) {
    return r.concat(t.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function qm(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(r) {
      Promise.resolve().then(function() {
        t = void 0, r(e());
      });
    })), t;
  };
}
function Ym(e) {
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
function Km(e) {
  e === void 0 && (e = {});
  var t = e, r = t.defaultModifiers, n = r === void 0 ? [] : r, o = t.defaultOptions, a = o === void 0 ? ni : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
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
        var R = typeof x == "function" ? x(f.options) : x;
        u(), f.options = Object.assign({}, a, f.options, R), f.scrollParents = {
          reference: Bt(l) ? Cr(l) : l.contextElement ? Cr(l.contextElement) : [],
          popper: Cr(c)
        };
        var w = Xm(Ym([].concat(n, f.options.modifiers)));
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
          var x = f.elements, R = x.reference, w = x.popper;
          if (oi(R, w)) {
            f.rects = {
              reference: Gm(R, zr(w), f.options.strategy === "fixed"),
              popper: Ho(w)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(V) {
              return f.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], N = y.fn, C = y.options, _ = C === void 0 ? {} : C, D = y.name;
              typeof N == "function" && (f = N({
                state: f,
                options: _,
                name: D,
                instance: p
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: qm(function() {
        return new Promise(function(b) {
          p.forceUpdate(), b(f);
        });
      }),
      destroy: function() {
        u(), g = !0;
      }
    };
    if (!oi(l, c))
      return p;
    p.setOptions(d).then(function(b) {
      !g && d.onFirstUpdate && d.onFirstUpdate(b);
    });
    function h() {
      f.orderedModifiers.forEach(function(b) {
        var x = b.name, R = b.options, w = R === void 0 ? {} : R, E = b.effect;
        if (typeof E == "function") {
          var y = E({
            state: f,
            name: x,
            instance: p,
            options: w
          }), N = function() {
          };
          v.push(y || N);
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
var Jm = [wm, Bm, vm, sm, Dm, $m, Fm, mm, Im], Zm = /* @__PURE__ */ Km({
  defaultModifiers: Jm
});
const As = "Popper";
function Qm(e) {
  return Ns(As, e);
}
Pf(As, ["root"]);
const eh = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], th = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function rh(e, t) {
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
function An(e) {
  return e.nodeType !== void 0;
}
function nh(e) {
  return !An(e);
}
const oh = () => ut({
  root: ["root"]
}, Tf(Qm)), ah = {}, ih = /* @__PURE__ */ T.forwardRef(function(t, r) {
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
  } = t, b = ge(t, eh), x = T.useRef(null), R = Ge(x, r), w = T.useRef(null), E = Ge(w, g), y = T.useRef(E);
  At(() => {
    y.current = E;
  }, [E]), T.useImperativeHandle(g, () => w.current, []);
  const N = rh(f, i), [C, _] = T.useState(N), [D, V] = T.useState(gn(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && V(gn(o));
  }, [o]), At(() => {
    if (!D || !d)
      return;
    const j = (Q) => {
      _(Q.placement);
    };
    if (process.env.NODE_ENV !== "production" && D && An(D) && D.nodeType === 1) {
      const Q = D.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Q.top === 0 && Q.left === 0 && Q.right === 0 && Q.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    let M = [{
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
        state: Q
      }) => {
        j(Q);
      }
    }];
    c != null && (M = M.concat(c)), v && v.modifiers != null && (M = M.concat(v.modifiers));
    const U = Zm(D, x.current, P({
      placement: N
    }, v, {
      modifiers: M
    }));
    return y.current(U), () => {
      U.destroy(), y.current(null);
    };
  }, [D, l, c, d, v, N]);
  const k = {
    placement: C
  };
  u !== null && (k.TransitionProps = u);
  const S = oh(), $ = (n = h.root) != null ? n : "div", z = jt({
    elementType: $,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: R
    },
    ownerState: t,
    className: S.root
  });
  return /* @__PURE__ */ m($, P({}, z, {
    children: typeof a == "function" ? a(k) : a
  }));
}), Ds = /* @__PURE__ */ T.forwardRef(function(t, r) {
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
    popperOptions: g = ah,
    popperRef: p,
    style: h,
    transition: u = !1,
    slotProps: b = {},
    slots: x = {}
  } = t, R = ge(t, th), [w, E] = T.useState(!0), y = () => {
    E(!1);
  }, N = () => {
    E(!0);
  };
  if (!c && !f && (!u || w))
    return null;
  let C;
  if (a)
    C = a;
  else if (n) {
    const V = gn(n);
    C = V && An(V) ? Oe(V).body : Oe(null).body;
  }
  const _ = !f && c && (!u || w) ? "none" : void 0, D = u ? {
    in: f,
    onEnter: y,
    onExited: N
  } : void 0;
  return /* @__PURE__ */ m(Ir, {
    disablePortal: l,
    container: C,
    children: /* @__PURE__ */ m(ih, P({
      anchorEl: n,
      direction: i,
      disablePortal: l,
      modifiers: d,
      ref: r,
      open: u ? !w : f,
      placement: v,
      popperOptions: g,
      popperRef: p,
      slotProps: b,
      slots: x
    }, R, {
      style: P({
        // Prevents scroll issue, waiting for Popper.js to add this style once initiated.
        position: "fixed",
        // Fix Popper.js display issue
        top: 0,
        left: 0,
        display: _
      }, h),
      TransitionProps: D,
      children: o
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ds.propTypes = {
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
  anchorEl: or(s.oneOfType([lt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = gn(e.anchorEl);
      if (t && An(t) && t.nodeType === 1) {
        const r = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && r.top === 0 && r.left === 0 && r.right === 0 && r.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || nh(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
  popperRef: _o,
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
function Ur() {
  const e = vs(Lo);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Vo] || e;
}
function go(e, t) {
  return go = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(n, o) {
    return n.__proto__ = o, n;
  }, go(e, t);
}
function sh(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, go(e, t);
}
const ai = {
  disabled: !1
};
var lh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const js = G.createContext(null);
var ch = function(t) {
  return t.scrollTop;
}, wr = "unmounted", Ct = "exited", St = "entering", qt = "entered", bo = "exiting", ft = /* @__PURE__ */ function(e) {
  sh(t, e);
  function t(n, o) {
    var a;
    a = e.call(this, n, o) || this;
    var i = o, l = i && !i.isMounting ? n.enter : n.appear, c;
    return a.appearStatus = null, n.in ? l ? (c = Ct, a.appearStatus = St) : c = qt : n.unmountOnExit || n.mountOnEnter ? c = wr : c = Ct, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === wr ? {
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
      this.props.in ? i !== St && i !== qt && (a = St) : (i === St || i === qt) && (a = bo);
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
      if (this.cancelNextCallback(), a === St) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Xr.findDOMNode(this);
          i && ch(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ct && this.setState({
        status: wr
      });
  }, r.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Xr.findDOMNode(this), l], d = c[0], f = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
    if (!o && !i || ai.disabled) {
      this.safeSetState({
        status: qt
      }, function() {
        a.props.onEntered(d);
      });
      return;
    }
    this.props.onEnter(d, f), this.safeSetState({
      status: St
    }, function() {
      a.props.onEntering(d, f), a.onTransitionEnd(g, function() {
        a.safeSetState({
          status: qt
        }, function() {
          a.props.onEntered(d, f);
        });
      });
    });
  }, r.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Xr.findDOMNode(this);
    if (!a || ai.disabled) {
      this.safeSetState({
        status: Ct
      }, function() {
        o.props.onExited(l);
      });
      return;
    }
    this.props.onExit(l), this.safeSetState({
      status: bo
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Xr.findDOMNode(this), l = o == null && !this.props.addEndListener;
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
    if (o === wr)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = ge(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ G.createElement(js.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : G.cloneElement(G.Children.only(i), l))
    );
  }, t;
}(G.Component);
ft.contextType = js;
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
    var r = lh;
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
ft.defaultProps = {
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
ft.UNMOUNTED = wr;
ft.EXITED = Ct;
ft.ENTERING = St;
ft.ENTERED = qt;
ft.EXITING = bo;
const Bs = ft, Ls = (e) => e.scrollTop;
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
const ph = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function vo(e) {
  return `scale(${e}, ${e ** 2})`;
}
const uh = {
  entering: {
    opacity: 1,
    transform: vo(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Qn = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Yo = /* @__PURE__ */ T.forwardRef(function(t, r) {
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
    TransitionComponent: b = Bs
  } = t, x = ge(t, ph), R = vr(), w = T.useRef(), E = Ur(), y = T.useRef(null), N = Ge(y, a.ref, r), C = (j) => (M) => {
    if (j) {
      const U = y.current;
      M === void 0 ? j(U) : j(U, M);
    }
  }, _ = C(f), D = C((j, M) => {
    Ls(j);
    const {
      duration: U,
      delay: Q,
      easing: Y
    } = bn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "enter"
    });
    let O;
    u === "auto" ? (O = E.transitions.getAutoHeightDuration(j.clientHeight), w.current = O) : O = U, j.style.transition = [E.transitions.create("opacity", {
      duration: O,
      delay: Q
    }), E.transitions.create("transform", {
      duration: Qn ? O : O * 0.666,
      delay: Q,
      easing: Y
    })].join(","), c && c(j, M);
  }), V = C(d), k = C(p), S = C((j) => {
    const {
      duration: M,
      delay: U,
      easing: Q
    } = bn({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "exit"
    });
    let Y;
    u === "auto" ? (Y = E.transitions.getAutoHeightDuration(j.clientHeight), w.current = Y) : Y = M, j.style.transition = [E.transitions.create("opacity", {
      duration: Y,
      delay: U
    }), E.transitions.create("transform", {
      duration: Qn ? Y : Y * 0.666,
      delay: Qn ? U : U || Y * 0.333,
      easing: Q
    })].join(","), j.style.opacity = 0, j.style.transform = vo(0.75), v && v(j);
  }), $ = C(g);
  return /* @__PURE__ */ m(b, P({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: D,
    onEntered: V,
    onEntering: _,
    onExit: S,
    onExited: $,
    onExiting: k,
    addEndListener: (j) => {
      u === "auto" && R.start(w.current || 0, j), n && n(y.current, j);
    },
    timeout: u === "auto" ? null : u
  }, x, {
    children: (j, M) => /* @__PURE__ */ T.cloneElement(a, P({
      style: P({
        opacity: 0,
        transform: vo(0.75),
        visibility: j === "exited" && !l ? "hidden" : void 0
      }, uh[j], h, a.props.style),
      ref: N
    }, M))
  }));
});
process.env.NODE_ENV !== "production" && (Yo.propTypes = {
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
  children: jr.isRequired,
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
Yo.muiSupportAuto = !0;
const yo = Yo, dh = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ii = dh, fh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], mh = Re(Ds, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Vs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n;
  const o = bs(), a = dt({
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
    popperRef: x,
    transition: R,
    slots: w,
    slotProps: E
  } = a, y = ge(a, fh), N = (n = w == null ? void 0 : w.root) != null ? n : c == null ? void 0 : c.Root, C = P({
    anchorEl: i,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: u,
    popperOptions: b,
    popperRef: x,
    transition: R
  }, y);
  return /* @__PURE__ */ m(mh, P({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: N
    },
    slotProps: E ?? d
  }, C, {
    ref: r
  }));
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
  popperRef: _o,
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
const Fs = Vs;
function hh(e) {
  return rt("MuiTooltip", e);
}
const gh = wt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), bt = gh, bh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function vh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const yh = (e) => {
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
  return ut(i, hh, t);
}, wh = Re(Fs, {
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
  [`&[data-popper-placement*="right"] .${bt.arrow}`]: P({}, t.isRtl ? {
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
  [`&[data-popper-placement*="left"] .${bt.arrow}`]: P({}, t.isRtl ? {
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
})), xh = Re("div", {
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
  lineHeight: `${vh(16 / 14)}em`,
  fontWeight: e.typography.fontWeightRegular
}, {
  [`.${bt.popper}[data-popper-placement*="left"] &`]: P({
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
  [`.${bt.popper}[data-popper-placement*="right"] &`]: P({
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
  [`.${bt.popper}[data-popper-placement*="top"] &`]: P({
    transformOrigin: "center bottom",
    marginBottom: "14px"
  }, t.touch && {
    marginBottom: "24px"
  }),
  [`.${bt.popper}[data-popper-placement*="bottom"] &`]: P({
    transformOrigin: "center top",
    marginTop: "14px"
  }, t.touch && {
    marginTop: "24px"
  })
})), Eh = Re("span", {
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
let Jr = !1;
const si = new Br();
let mr = {
  x: 0,
  y: 0
};
function Zr(e, t) {
  return (r) => {
    t && t(r), e(r);
  };
}
const zs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, i, l, c, d, f, v, g, p, h, u, b, x, R, w, E, y;
  const N = dt({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: C = !1,
    children: _,
    components: D = {},
    componentsProps: V = {},
    describeChild: k = !1,
    disableFocusListener: S = !1,
    disableHoverListener: $ = !1,
    disableInteractive: z = !1,
    disableTouchListener: j = !1,
    enterDelay: M = 100,
    enterNextDelay: U = 0,
    enterTouchDelay: Q = 700,
    followCursor: Y = !1,
    id: O,
    leaveDelay: B = 0,
    leaveTouchDelay: H = 1500,
    onClose: Z,
    onOpen: W,
    open: X,
    placement: K = "bottom",
    PopperComponent: J,
    PopperProps: q = {},
    slotProps: ee = {},
    slots: te = {},
    title: ie,
    TransitionComponent: L = yo,
    TransitionProps: re
  } = N, I = ge(N, bh), se = /* @__PURE__ */ T.isValidElement(_) ? _ : /* @__PURE__ */ m("span", {
    children: _
  }), Te = Ur(), Pe = Te.direction === "rtl", [Ee, kt] = T.useState(), [$e, nt] = T.useState(null), je = T.useRef(!1), ot = z || Y, Ne = vr(), Lt = vr(), Tt = vr(), ar = vr(), [Hr, Qo] = as({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let at = Hr;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: ne
    } = T.useRef(X !== void 0);
    T.useEffect(() => {
      Ee && Ee.disabled && !ne && ie !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [ie, Ee, ne]);
  }
  const Dn = os(O), ir = T.useRef(), Gr = $r(() => {
    ir.current !== void 0 && (document.body.style.WebkitUserSelect = ir.current, ir.current = void 0), ar.clear();
  });
  T.useEffect(() => Gr, [Gr]);
  const ea = (ne) => {
    si.clear(), Jr = !0, Qo(!0), W && !at && W(ne);
  }, Wr = $r(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (ne) => {
      si.start(800 + B, () => {
        Jr = !1;
      }), Qo(!1), Z && at && Z(ne), Ne.start(Te.transitions.duration.shortest, () => {
        je.current = !1;
      });
    }
  ), jn = (ne) => {
    je.current && ne.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), Lt.clear(), Tt.clear(), M || Jr && U ? Lt.start(Jr ? U : M, () => {
      ea(ne);
    }) : ea(ne));
  }, ta = (ne) => {
    Lt.clear(), Tt.start(B, () => {
      Wr(ne);
    });
  }, {
    isFocusVisibleRef: ra,
    onBlur: Tl,
    onFocus: Nl,
    ref: Cl
  } = is(), [, na] = T.useState(!1), oa = (ne) => {
    Tl(ne), ra.current === !1 && (na(!1), ta(ne));
  }, aa = (ne) => {
    Ee || kt(ne.currentTarget), Nl(ne), ra.current === !0 && (na(!0), jn(ne));
  }, ia = (ne) => {
    je.current = !0;
    const Be = se.props;
    Be.onTouchStart && Be.onTouchStart(ne);
  }, sa = jn, la = ta, Sl = (ne) => {
    ia(ne), Tt.clear(), Ne.clear(), Gr(), ir.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", ar.start(Q, () => {
      document.body.style.WebkitUserSelect = ir.current, jn(ne);
    });
  }, Ol = (ne) => {
    se.props.onTouchEnd && se.props.onTouchEnd(ne), Gr(), Tt.start(H, () => {
      Wr(ne);
    });
  };
  T.useEffect(() => {
    if (!at)
      return;
    function ne(Be) {
      (Be.key === "Escape" || Be.key === "Esc") && Wr(Be);
    }
    return document.addEventListener("keydown", ne), () => {
      document.removeEventListener("keydown", ne);
    };
  }, [Wr, at]);
  const Rl = Ge(se.ref, Cl, kt, r);
  !ie && ie !== 0 && (at = !1);
  const Bn = T.useRef(), Pl = (ne) => {
    const Be = se.props;
    Be.onMouseMove && Be.onMouseMove(ne), mr = {
      x: ne.clientX,
      y: ne.clientY
    }, Bn.current && Bn.current.update();
  }, sr = {}, Ln = typeof ie == "string";
  k ? (sr.title = !at && Ln && !$ ? ie : null, sr["aria-describedby"] = at ? Dn : null) : (sr["aria-label"] = Ln ? ie : null, sr["aria-labelledby"] = at && !Ln ? Dn : null);
  const ze = P({}, sr, I, se.props, {
    className: Se(I.className, se.props.className),
    onTouchStart: ia,
    ref: Rl
  }, Y ? {
    onMouseMove: Pl
  } : {});
  process.env.NODE_ENV !== "production" && (ze["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const lr = {};
  j || (ze.onTouchStart = Sl, ze.onTouchEnd = Ol), $ || (ze.onMouseOver = Zr(sa, ze.onMouseOver), ze.onMouseLeave = Zr(la, ze.onMouseLeave), ot || (lr.onMouseOver = sa, lr.onMouseLeave = la)), S || (ze.onFocus = Zr(aa, ze.onFocus), ze.onBlur = Zr(oa, ze.onBlur), ot || (lr.onFocus = aa, lr.onBlur = oa)), process.env.NODE_ENV !== "production" && se.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${se.props.title}\` or the Tooltip component.`].join(`
`));
  const $l = T.useMemo(() => {
    var ne;
    let Be = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (ne = q.popperOptions) != null && ne.modifiers && (Be = Be.concat(q.popperOptions.modifiers)), P({}, q.popperOptions, {
      modifiers: Be
    });
  }, [$e, q]), cr = P({}, N, {
    isRtl: Pe,
    arrow: C,
    disableInteractive: ot,
    placement: K,
    PopperComponentProp: J,
    touch: je.current
  }), Vn = yh(cr), ca = (n = (o = te.popper) != null ? o : D.Popper) != null ? n : wh, pa = (a = (i = (l = te.transition) != null ? l : D.Transition) != null ? i : L) != null ? a : yo, ua = (c = (d = te.tooltip) != null ? d : D.Tooltip) != null ? c : xh, da = (f = (v = te.arrow) != null ? v : D.Arrow) != null ? f : Eh, _l = yr(ca, P({}, q, (g = ee.popper) != null ? g : V.popper, {
    className: Se(Vn.popper, q == null ? void 0 : q.className, (p = (h = ee.popper) != null ? h : V.popper) == null ? void 0 : p.className)
  }), cr), Il = yr(pa, P({}, re, (u = ee.transition) != null ? u : V.transition), cr), Ml = yr(ua, P({}, (b = ee.tooltip) != null ? b : V.tooltip, {
    className: Se(Vn.tooltip, (x = (R = ee.tooltip) != null ? R : V.tooltip) == null ? void 0 : x.className)
  }), cr), Al = yr(da, P({}, (w = ee.arrow) != null ? w : V.arrow, {
    className: Se(Vn.arrow, (E = (y = ee.arrow) != null ? y : V.arrow) == null ? void 0 : E.className)
  }), cr);
  return /* @__PURE__ */ A(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(se, ze), /* @__PURE__ */ m(ca, P({
      as: J ?? Fs,
      placement: K,
      anchorEl: Y ? {
        getBoundingClientRect: () => ({
          top: mr.y,
          left: mr.x,
          right: mr.x,
          bottom: mr.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Bn,
      open: Ee ? at : !1,
      id: Dn,
      transition: !0
    }, lr, _l, {
      popperOptions: $l,
      children: ({
        TransitionProps: ne
      }) => /* @__PURE__ */ m(pa, P({
        timeout: Te.transitions.duration.shorter
      }, ne, Il, {
        children: /* @__PURE__ */ A(ua, P({}, Ml, {
          children: [ie, C ? /* @__PURE__ */ m(da, P({}, Al, {
            ref: nt
          })) : null]
        }))
      }))
    }))]
  });
});
process.env.NODE_ENV !== "production" && (zs.propTypes = {
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
  children: jr.isRequired,
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
const kh = zs;
function li(e, t, r) {
  return e ? /* @__PURE__ */ m(Si, { className: `papi-menu-icon-${r ? "leading" : "trailing"}`, children: /* @__PURE__ */ m("img", { src: e, alt: `${r ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Us(e) {
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
  } = e, x = /* @__PURE__ */ m(
    mc,
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
      children: r ? /* @__PURE__ */ A(yt, { children: [
        li(a, r, !0),
        /* @__PURE__ */ m(hc, { primary: r, inset: !a && o }),
        v ? /* @__PURE__ */ m(Si, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ m(xs, {}) }) : li(i, r, !1)
      ] }) : b
    }
  );
  return n ? /* @__PURE__ */ m(kh, { title: n, placement: "right", children: /* @__PURE__ */ m("div", { children: x }) }) : x;
}
function Hs(e) {
  return Object.entries(e.groups).map(([r, n]) => ({ id: r, group: n }));
}
function Th(e) {
  const [t, r] = fe(void 0), { parentMenuItem: n, parentItemProps: o, menuDefinition: a } = e, i = (d) => {
    r(d.currentTarget);
  }, l = () => {
    r(void 0);
  }, c = () => {
    let d = Hs(a).filter((f) => "menuItem" in f.group);
    if (!(n != null && n.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === n.id
    ), /* @__PURE__ */ m(Ko, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ A(yt, { children: [
    /* @__PURE__ */ m(Us, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ m(
      gc,
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
const Nh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Ko(e) {
  const { menuDefinition: t, onClick: r, commandHandler: n, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = Dr(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Hs(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(f).sort(
      (h, u) => (h.group.order || 0) - (u.group.order || 0)
    ), g = [];
    v.forEach((h) => {
      Nh(h.id, t.items).forEach(
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
        Us,
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
      Th,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      d + g.id
    );
  }) }, d);
}
function Ch(e) {
  const { menuDefinition: t, columnId: r } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return r && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[r] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === r
  )), /* @__PURE__ */ m(Ko, { ...e, includedGroups: a });
}
function Sh({
  commandHandler: e,
  menuDefinition: t,
  id: r,
  metadata: n,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ A(
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
        /* @__PURE__ */ m(bc, { id: r, dense: !0, className: a ?? "", children: /* @__PURE__ */ m(
          Ch,
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
function Oh({
  commandHandler: e,
  className: t,
  multiColumnMenu: r,
  id: n
}) {
  const { columns: o } = r, a = Dr(() => {
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
        Sh,
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
const Gs = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (Gs.displayName = "ListContext");
const Rh = Gs;
function Ph(e) {
  return rt("MuiList", e);
}
wt("MuiList", ["root", "padding", "dense", "subheader"]);
const $h = ["children", "className", "component", "dense", "disablePadding", "subheader"], _h = (e) => {
  const {
    classes: t,
    disablePadding: r,
    dense: n,
    subheader: o
  } = e;
  return ut({
    root: ["root", !r && "padding", n && "dense", o && "subheader"]
  }, Ph, t);
}, Ih = Re("ul", {
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
})), Ws = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = dt({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: d
  } = n, f = ge(n, $h), v = T.useMemo(() => ({
    dense: l
  }), [l]), g = P({}, n, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = _h(g);
  return /* @__PURE__ */ m(Rh.Provider, {
    value: v,
    children: /* @__PURE__ */ A(Ih, P({
      as: i,
      className: Se(p.root, a),
      ref: r,
      ownerState: g
    }, f, {
      children: [d, o]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Ws.propTypes = {
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
const Mh = Ws, Ah = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function eo(e, t, r) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : r ? null : e.firstChild;
}
function ci(e, t, r) {
  return e === t ? r ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : r ? null : e.lastChild;
}
function Xs(e, t) {
  if (t === void 0)
    return !0;
  let r = e.innerText;
  return r === void 0 && (r = e.textContent), r = r.trim().toLowerCase(), r.length === 0 ? !1 : t.repeating ? r[0] === t.keys[0] : r.indexOf(t.keys.join("")) === 0;
}
function hr(e, t, r, n, o, a) {
  let i = !1, l = o(e, t, t ? r : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = n ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Xs(l, a) || c)
      l = o(e, l, r);
    else
      return l.focus(), !0;
  }
  return !1;
}
const qs = /* @__PURE__ */ T.forwardRef(function(t, r) {
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
  } = t, g = ge(t, Ah), p = T.useRef(null), h = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  At(() => {
    o && p.current.focus();
  }, [o]), T.useImperativeHandle(n, () => ({
    adjustStyleForScrollbar: (w, E) => {
      const y = !p.current.style.width;
      if (w.clientHeight < p.current.clientHeight && y) {
        const N = `${ss(Oe(w))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = N, p.current.style.width = `calc(100% + ${N})`;
      }
      return p.current;
    }
  }), []);
  const u = (w) => {
    const E = p.current, y = w.key, N = Oe(E).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), hr(E, N, d, c, eo);
    else if (y === "ArrowUp")
      w.preventDefault(), hr(E, N, d, c, ci);
    else if (y === "Home")
      w.preventDefault(), hr(E, null, d, c, eo);
    else if (y === "End")
      w.preventDefault(), hr(E, null, d, c, ci);
    else if (y.length === 1) {
      const C = h.current, _ = y.toLowerCase(), D = performance.now();
      C.keys.length > 0 && (D - C.lastTime > 500 ? (C.keys = [], C.repeating = !0, C.previousKeyMatched = !0) : C.repeating && _ !== C.keys[0] && (C.repeating = !1)), C.lastTime = D, C.keys.push(_);
      const V = N && !C.repeating && Xs(N, C);
      C.previousKeyMatched && (V || hr(E, N, !1, c, eo, C)) ? w.preventDefault() : C.previousKeyMatched = !1;
    }
    f && f(w);
  }, b = Ge(p, r);
  let x = -1;
  T.Children.forEach(i, (w, E) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      x === E && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && pn.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (v === "selectedMenu" && w.props.selected || x === -1) && (x = E), x === E && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const R = T.Children.map(i, (w, E) => {
    if (E === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ m(Mh, P({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: u,
    tabIndex: o ? 0 : -1
  }, g, {
    children: R
  }));
});
process.env.NODE_ENV !== "production" && (qs.propTypes = {
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
const Dh = qs, jh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Bh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Ys = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = Ur(), o = {
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
    timeout: x = o,
    // eslint-disable-next-line react/prop-types
    TransitionComponent: R = Bs
  } = t, w = ge(t, jh), E = T.useRef(null), y = Ge(E, l.ref, r), N = (z) => (j) => {
    if (z) {
      const M = E.current;
      j === void 0 ? z(M) : z(M, j);
    }
  }, C = N(g), _ = N((z, j) => {
    Ls(z);
    const M = bn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    z.style.webkitTransition = n.transitions.create("opacity", M), z.style.transition = n.transitions.create("opacity", M), f && f(z, j);
  }), D = N(v), V = N(u), k = N((z) => {
    const j = bn({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    z.style.webkitTransition = n.transitions.create("opacity", j), z.style.transition = n.transitions.create("opacity", j), p && p(z);
  }), S = N(h);
  return /* @__PURE__ */ m(R, P({
    appear: i,
    in: d,
    nodeRef: E,
    onEnter: _,
    onEntered: D,
    onEntering: C,
    onExit: k,
    onExited: S,
    onExiting: V,
    addEndListener: (z) => {
      a && a(E.current, z);
    },
    timeout: x
  }, w, {
    children: (z, j) => /* @__PURE__ */ T.cloneElement(l, P({
      style: P({
        opacity: 0,
        visibility: z === "exited" && !d ? "hidden" : void 0
      }, Bh[z], b, l.props.style),
      ref: y
    }, j))
  }));
});
process.env.NODE_ENV !== "production" && (Ys.propTypes = {
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
  children: jr.isRequired,
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
const Lh = Ys;
function Vh(e) {
  return rt("MuiBackdrop", e);
}
wt("MuiBackdrop", ["root", "invisible"]);
const Fh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], zh = (e) => {
  const {
    classes: t,
    invisible: r
  } = e;
  return ut({
    root: ["root", r && "invisible"]
  }, Vh, t);
}, Uh = Re("div", {
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
})), Ks = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const i = dt({
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
    TransitionComponent: b = Lh,
    transitionDuration: x
  } = i, R = ge(i, Fh), w = P({}, i, {
    component: d,
    invisible: g
  }), E = zh(w), y = (n = h.root) != null ? n : v.root;
  return /* @__PURE__ */ m(b, P({
    in: p,
    timeout: x
  }, R, {
    children: /* @__PURE__ */ m(Uh, P({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = u.root) != null ? a : f.Root) != null ? o : d,
      className: Se(E.root, c, y == null ? void 0 : y.className),
      ownerState: P({}, w, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: r,
      children: l
    }))
  }));
});
process.env.NODE_ENV !== "production" && (Ks.propTypes = {
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
const Hh = Ks;
function Gh(e) {
  return rt("MuiModal", e);
}
wt("MuiModal", ["root", "hidden", "backdrop"]);
const Wh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Xh = (e) => {
  const {
    open: t,
    exited: r,
    classes: n
  } = e;
  return ut({
    root: ["root", !t && r && "hidden"],
    backdrop: ["backdrop"]
  }, Gh, n);
}, qh = Re("div", {
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
})), Yh = Re(Hh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Js = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a, i, l, c;
  const d = dt({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = Yh,
    BackdropProps: v,
    className: g,
    closeAfterTransition: p = !1,
    children: h,
    container: u,
    component: b,
    components: x = {},
    componentsProps: R = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: N = !1,
    disableRestoreFocus: C = !1,
    disableScrollLock: _ = !1,
    hideBackdrop: D = !1,
    keepMounted: V = !1,
    onBackdropClick: k,
    open: S,
    slotProps: $,
    slots: z
    // eslint-disable-next-line react/prop-types
  } = d, j = ge(d, Wh), M = P({}, d, {
    closeAfterTransition: p,
    disableAutoFocus: w,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: N,
    disableRestoreFocus: C,
    disableScrollLock: _,
    hideBackdrop: D,
    keepMounted: V
  }), {
    getRootProps: U,
    getBackdropProps: Q,
    getTransitionProps: Y,
    portalRef: O,
    isTopModal: B,
    exited: H,
    hasTransition: Z
  } = Wf(P({}, M, {
    rootRef: r
  })), W = P({}, M, {
    exited: H
  }), X = Xh(W), K = {};
  if (h.props.tabIndex === void 0 && (K.tabIndex = "-1"), Z) {
    const {
      onEnter: re,
      onExited: I
    } = Y();
    K.onEnter = re, K.onExited = I;
  }
  const J = (n = (o = z == null ? void 0 : z.root) != null ? o : x.Root) != null ? n : qh, q = (a = (i = z == null ? void 0 : z.backdrop) != null ? i : x.Backdrop) != null ? a : f, ee = (l = $ == null ? void 0 : $.root) != null ? l : R.root, te = (c = $ == null ? void 0 : $.backdrop) != null ? c : R.backdrop, ie = jt({
    elementType: J,
    externalSlotProps: ee,
    externalForwardedProps: j,
    getSlotProps: U,
    additionalProps: {
      ref: r,
      as: b
    },
    ownerState: W,
    className: Se(g, ee == null ? void 0 : ee.className, X == null ? void 0 : X.root, !W.open && W.exited && (X == null ? void 0 : X.hidden))
  }), L = jt({
    elementType: q,
    externalSlotProps: te,
    additionalProps: v,
    getSlotProps: (re) => Q(P({}, re, {
      onClick: (I) => {
        k && k(I), re != null && re.onClick && re.onClick(I);
      }
    })),
    className: Se(te == null ? void 0 : te.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: W
  });
  return !V && !S && (!Z || H) ? null : /* @__PURE__ */ m(Ir, {
    ref: O,
    container: u,
    disablePortal: N,
    children: /* @__PURE__ */ A(J, P({}, ie, {
      children: [!D && f ? /* @__PURE__ */ m(q, P({}, L)) : null, /* @__PURE__ */ m(mn, {
        disableEnforceFocus: E,
        disableAutoFocus: w,
        disableRestoreFocus: C,
        isEnabled: B,
        open: S,
        children: /* @__PURE__ */ T.cloneElement(h, K)
      })]
    }))
  });
});
process.env.NODE_ENV !== "production" && (Js.propTypes = {
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
  children: jr.isRequired,
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
const Kh = Js;
function Jh(e) {
  return rt("MuiPaper", e);
}
wt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const Zh = ["className", "component", "elevation", "square", "variant"], Qh = (e) => {
  const {
    square: t,
    elevation: r,
    variant: n,
    classes: o
  } = e, a = {
    root: ["root", n, !t && "rounded", n === "elevation" && `elevation${r}`]
  };
  return ut(a, Jh, o);
}, eg = Re("div", {
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
    backgroundImage: `linear-gradient(${fn("#fff", ii(t.elevation))}, ${fn("#fff", ii(t.elevation))})`
  }, e.vars && {
    backgroundImage: (r = e.vars.overlays) == null ? void 0 : r[t.elevation]
  }));
}), Zs = /* @__PURE__ */ T.forwardRef(function(t, r) {
  const n = dt({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = n, d = ge(n, Zh), f = P({}, n, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = Qh(f);
  return process.env.NODE_ENV !== "production" && Ur().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ m(eg, P({
    as: a,
    ownerState: f,
    className: Se(v.root, o),
    ref: r
  }, d));
});
process.env.NODE_ENV !== "production" && (Zs.propTypes = {
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
  elevation: or(ps, (e) => {
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
const tg = Zs;
function rg(e) {
  return rt("MuiPopover", e);
}
wt("MuiPopover", ["root", "paper"]);
const ng = ["onEntering"], og = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], ag = ["slotProps"];
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
function rn(e) {
  return typeof e == "function" ? e() : e;
}
const ig = (e) => {
  const {
    classes: t
  } = e;
  return ut({
    root: ["root"],
    paper: ["paper"]
  }, rg, t);
}, sg = Re(Kh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Qs = Re(tg, {
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
}), el = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o, a;
  const i = dt({
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
    open: x,
    PaperProps: R = {},
    slots: w,
    slotProps: E,
    transformOrigin: y = {
      vertical: "top",
      horizontal: "left"
    },
    TransitionComponent: N = yo,
    transitionDuration: C = "auto",
    TransitionProps: {
      onEntering: _
    } = {},
    disableScrollLock: D = !1
  } = i, V = ge(i.TransitionProps, ng), k = ge(i, og), S = (n = E == null ? void 0 : E.paper) != null ? n : R, $ = T.useRef(), z = Ge($, S.ref), j = P({}, i, {
    anchorOrigin: d,
    anchorReference: v,
    elevation: u,
    marginThreshold: b,
    externalPaperSlotProps: S,
    transformOrigin: y,
    TransitionComponent: N,
    transitionDuration: C,
    TransitionProps: V
  }), M = ig(j), U = T.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const re = rn(c), I = re && re.nodeType === 1 ? re : Oe($.current).body, se = I.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = I.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: se.top + pi(se, d.vertical),
      left: se.left + ui(se, d.horizontal)
    };
  }, [c, d.horizontal, d.vertical, f, v]), Q = T.useCallback((re) => ({
    vertical: pi(re, y.vertical),
    horizontal: ui(re, y.horizontal)
  }), [y.horizontal, y.vertical]), Y = T.useCallback((re) => {
    const I = {
      width: re.offsetWidth,
      height: re.offsetHeight
    }, se = Q(I);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: di(se)
      };
    const Te = U();
    let Pe = Te.top - se.vertical, Ee = Te.left - se.horizontal;
    const kt = Pe + I.height, $e = Ee + I.width, nt = Zt(rn(c)), je = nt.innerHeight - b, ot = nt.innerWidth - b;
    if (b !== null && Pe < b) {
      const Ne = Pe - b;
      Pe -= Ne, se.vertical += Ne;
    } else if (b !== null && kt > je) {
      const Ne = kt - je;
      Pe -= Ne, se.vertical += Ne;
    }
    if (process.env.NODE_ENV !== "production" && I.height > je && I.height && je && console.error(["MUI: The popover component is too tall.", `Some part of it can not be seen on the screen (${I.height - je}px).`, "Please consider adding a `max-height` to improve the user-experience."].join(`
`)), b !== null && Ee < b) {
      const Ne = Ee - b;
      Ee -= Ne, se.horizontal += Ne;
    } else if ($e > ot) {
      const Ne = $e - ot;
      Ee -= Ne, se.horizontal += Ne;
    }
    return {
      top: `${Math.round(Pe)}px`,
      left: `${Math.round(Ee)}px`,
      transformOrigin: di(se)
    };
  }, [c, v, U, Q, b]), [O, B] = T.useState(x), H = T.useCallback(() => {
    const re = $.current;
    if (!re)
      return;
    const I = Y(re);
    I.top !== null && (re.style.top = I.top), I.left !== null && (re.style.left = I.left), re.style.transformOrigin = I.transformOrigin, B(!0);
  }, [Y]);
  T.useEffect(() => (D && window.addEventListener("scroll", H), () => window.removeEventListener("scroll", H)), [c, D, H]);
  const Z = (re, I) => {
    _ && _(re, I), H();
  }, W = () => {
    B(!1);
  };
  T.useEffect(() => {
    x && H();
  }), T.useImperativeHandle(l, () => x ? {
    updatePosition: () => {
      H();
    }
  } : null, [x, H]), T.useEffect(() => {
    if (!x)
      return;
    const re = ns(() => {
      H();
    }), I = Zt(c);
    return I.addEventListener("resize", re), () => {
      re.clear(), I.removeEventListener("resize", re);
    };
  }, [c, x, H]);
  let X = C;
  C === "auto" && !N.muiSupportAuto && (X = void 0);
  const K = h || (c ? Oe(rn(c)).body : void 0), J = (o = w == null ? void 0 : w.root) != null ? o : sg, q = (a = w == null ? void 0 : w.paper) != null ? a : Qs, ee = jt({
    elementType: q,
    externalSlotProps: P({}, S, {
      style: O ? S.style : P({}, S.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: u,
      ref: z
    },
    ownerState: j,
    className: Se(M.paper, S == null ? void 0 : S.className)
  }), te = jt({
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
    ownerState: j,
    className: Se(M.root, p)
  }), {
    slotProps: ie
  } = te, L = ge(te, ag);
  return /* @__PURE__ */ m(J, P({}, L, !Es(J) && {
    slotProps: ie,
    disableScrollLock: D
  }, {
    children: /* @__PURE__ */ m(N, P({
      appear: !0,
      in: x,
      onEntering: Z,
      onExited: W,
      timeout: X
    }, V, {
      children: /* @__PURE__ */ m(q, P({}, ee, {
        children: g
      }))
    }))
  }));
});
process.env.NODE_ENV !== "production" && (el.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A ref for imperative actions.
   * It currently only supports updatePosition() action.
   */
  action: _o,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: or(s.oneOfType([lt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = rn(e.anchorEl);
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
  elevation: ps,
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
    component: jp
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
const lg = el;
function cg(e) {
  return rt("MuiMenu", e);
}
wt("MuiMenu", ["root", "paper", "list"]);
const pg = ["onEntering"], ug = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], dg = {
  vertical: "top",
  horizontal: "right"
}, fg = {
  vertical: "top",
  horizontal: "left"
}, mg = (e) => {
  const {
    classes: t
  } = e;
  return ut({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, cg, t);
}, hg = Re(lg, {
  shouldForwardProp: (e) => ys(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), gg = Re(Qs, {
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
}), bg = Re(Dh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), tl = /* @__PURE__ */ T.forwardRef(function(t, r) {
  var n, o;
  const a = dt({
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
    variant: x = "selectedMenu",
    slots: R = {},
    slotProps: w = {}
  } = a, E = ge(a.TransitionProps, pg), y = ge(a, ug), N = Ur(), C = N.direction === "rtl", _ = P({}, a, {
    autoFocus: i,
    disableAutoFocusItem: d,
    MenuListProps: f,
    onEntering: b,
    PaperProps: p,
    transitionDuration: u,
    TransitionProps: E,
    variant: x
  }), D = mg(_), V = i && !d && g, k = T.useRef(null), S = (Y, O) => {
    k.current && k.current.adjustStyleForScrollbar(Y, N), b && b(Y, O);
  }, $ = (Y) => {
    Y.key === "Tab" && (Y.preventDefault(), v && v(Y, "tabKeyDown"));
  };
  let z = -1;
  T.Children.map(l, (Y, O) => {
    /* @__PURE__ */ T.isValidElement(Y) && (process.env.NODE_ENV !== "production" && pn.isFragment(Y) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Y.props.disabled || (x === "selectedMenu" && Y.props.selected || z === -1) && (z = O));
  });
  const j = (n = R.paper) != null ? n : gg, M = (o = w.paper) != null ? o : p, U = jt({
    elementType: R.root,
    externalSlotProps: w.root,
    ownerState: _,
    className: [D.root, c]
  }), Q = jt({
    elementType: j,
    externalSlotProps: M,
    ownerState: _,
    className: D.paper
  });
  return /* @__PURE__ */ m(hg, P({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: C ? "right" : "left"
    },
    transformOrigin: C ? dg : fg,
    slots: {
      paper: j,
      root: R.root
    },
    slotProps: {
      root: U,
      paper: Q
    },
    open: g,
    ref: r,
    transitionDuration: u,
    TransitionProps: P({
      onEntering: S
    }, E),
    ownerState: _
  }, y, {
    classes: h,
    children: /* @__PURE__ */ m(bg, P({
      onKeyDown: $,
      actions: k,
      autoFocus: i && (z === -1 || d),
      autoFocusItem: V,
      variant: x
    }, f, {
      className: Se(D.list, f.className),
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
const vg = tl;
function Pv({
  className: e,
  commandHandler: t,
  menuDefinition: r,
  children: n
}) {
  var d;
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
  }, []), c = Dr(() => {
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
          vg,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ m(
              Ko,
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
function yg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const wo = (e, t, r = {}) => {
  const n = $t(t);
  n.current = t;
  const o = $t(r);
  o.current = yg(o.current);
  const [a, i] = fe(() => n.current), [l, c] = fe(!0);
  return Ye(() => {
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
}, wg = ws(/* @__PURE__ */ m("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function xg({
  menuProvider: e,
  normalMenu: t,
  fullMenu: r,
  commandHandler: n,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, d] = fe(!1), [f, v] = fe(!1), g = Ce(() => {
    c && d(!1), v(!1);
  }, [c]), p = Ce((E) => {
    E.stopPropagation(), d((y) => {
      const N = !y;
      return N && E.shiftKey ? v(!0) : N || v(!1), N;
    });
  }, []), h = Ce(
    (E) => (g(), n(E)),
    [n, g]
  ), [u, b] = fe({ top: 1, left: 1 });
  Ye(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), N = window.scrollY, C = window.scrollX, _ = y.top + N + E.clientHeight, D = y.left + C;
        b({ top: _, left: D });
      }
    }
  }, [c, o]);
  const [x] = wo(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [R] = wo(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? r ?? x, [e, r, x, c]),
    r ?? x
  ), w = f && R ? R : x;
  return /* @__PURE__ */ A(yt, { children: [
    /* @__PURE__ */ m(
      Ri,
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
        children: l ?? /* @__PURE__ */ m(wg, {})
      }
    ),
    /* @__PURE__ */ m(
      vc,
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
        children: w ? /* @__PURE__ */ m(
          Oh,
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
function $v({
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
    Ri,
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
const gt = "scrBook", Eg = "scrRef", Ot = "source", kg = "details", Tg = "Scripture Reference", Ng = "Scripture Book", rl = "Type", Cg = "Details";
function Sg(e, t) {
  const r = t ?? !1;
  return [
    {
      accessorFn: (n) => `${me.bookNumberToId(n.start.bookNum)} ${n.start.chapterNum}:${n.start.verseNum}`,
      id: gt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Tg,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : n.row.groupingColumnId === gt ? zn(o.start) : void 0;
      },
      getGroupingValue: (n) => n.start.bookNum,
      sortingFn: (n, o) => io(n.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => zn(n.start),
      id: Eg,
      header: void 0,
      cell: (n) => {
        const o = n.row.original;
        return n.row.getIsGrouped() ? void 0 : zn(o.start);
      },
      sortingFn: (n, o) => io(n.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (n) => n.source.displayName,
      id: Ot,
      header: r ? (e == null ? void 0 : e.typeColumnName) ?? rl : void 0,
      cell: (n) => r || n.row.getIsGrouped() ? n.getValue() : void 0,
      getGroupingValue: (n) => n.source.id,
      sortingFn: (n, o) => n.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (n) => n.detail,
      id: kg,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Cg,
      cell: (n) => n.getValue(),
      enableGrouping: !1
    }
  ];
}
function _v({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: r = !1,
  scriptureReferenceColumnName: n,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, d] = fe([]), [f, v] = fe([{ id: gt, desc: !1 }]), [g, p] = fe(() => e.flatMap((k) => {
    const S = k.source;
    return k.data.map(($) => ({
      ...$,
      source: S
    }));
  })), [h, u] = fe({});
  Ye(() => {
    p(() => e.flatMap((k) => {
      const S = k.source;
      return k.data.map(($) => ({
        ...$,
        source: S
      }));
    }));
  }, [e]);
  const b = Dr(
    () => Sg(
      {
        scriptureReferenceColumnName: n,
        typeColumnName: a,
        detailsColumnName: i
      },
      r
    ),
    [n, a, i, r]
  );
  Ye(() => {
    c.includes(Ot) ? v([
      { id: Ot, desc: !1 },
      { id: gt, desc: !1 }
    ]) : v([{ id: gt, desc: !1 }]);
  }, [c]);
  const x = Ce(
    (k, S) => !S || io(k, S) === 0 ? `${Fn(k)}` : `${Fn(k)}-${Fn(S)}`,
    []
  ), R = Ce(
    (k) => `${x(k.start, k.end)} ${k.source} ${k.detail}`,
    [x]
  ), w = Ti({
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
    getExpandedRowModel: cc(),
    getGroupedRowModel: pc(),
    getCoreRowModel: Ni(),
    getSortedRowModel: Ci(),
    getRowId: R,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Ye(() => {
    if (l) {
      const k = w.getSelectedRowModel().rowsById, S = Object.keys(k);
      if (S.length === 1) {
        const $ = g.find((z) => R(z) === S[0]) || void 0;
        $ && l($);
      }
    }
  }, [h, g, R, l, w]);
  const E = o ?? Ng, y = a ?? rl, N = [
    { label: "No Grouping", value: [] },
    { label: `Group by ${E}`, value: [gt] },
    { label: `Group by ${y}`, value: [Ot] },
    {
      label: `Group by ${E} and ${y}`,
      value: [gt, Ot]
    },
    {
      label: `Group by ${y} and ${E}`,
      value: [Ot, gt]
    }
  ], C = (k) => {
    d(JSON.parse(k));
  }, _ = (k, S) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(S);
  }, D = (k, S) => k.getIsGrouped() ? "" : F("banded-row", S % 2 === 0 ? "even" : "odd"), V = (k, S, $) => {
    if (!((k == null ? void 0 : k.length) === 0 || S.depth < $.column.getGroupedIndex())) {
      if (S.getIsGrouped())
        switch (S.depth) {
          case 1:
            return "pr-ps-4";
          default:
            return;
        }
      switch (S.depth) {
        case 1:
          return "pr-ps-8";
        case 2:
          return "pr-ps-12";
        default:
          return;
      }
    }
  };
  return /* @__PURE__ */ A("div", { className: "pr-twp pr-w-full", children: [
    !t && /* @__PURE__ */ A(
      ln,
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          C(k);
        },
        children: [
          /* @__PURE__ */ m(Or, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ m(cn, {}) }),
          /* @__PURE__ */ m(Rr, { position: "item-aligned", children: /* @__PURE__ */ m(ap, { children: N.map((k) => /* @__PURE__ */ m(Ke, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ A(xn, { className: "pr-p-0", children: [
      t && /* @__PURE__ */ m(En, { children: w.getHeaderGroups().map((k) => /* @__PURE__ */ m(vt, { children: k.headers.filter((S) => S.column.columnDef.header).map((S) => /* @__PURE__ */ m(Pr, { colSpan: S.colSpan, children: S.isPlaceholder ? void 0 : /* @__PURE__ */ A("div", { children: [
        S.column.getCanGroup() ? /* @__PURE__ */ m(
          he,
          {
            variant: "ghost",
            title: `Toggle grouping by ${S.column.columnDef.header}`,
            onClick: S.column.getToggleGroupingHandler(),
            type: "button",
            children: S.column.getIsGrouped() ? `🛑(${S.column.getGroupedIndex()}) ` : "👊 "
          }
        ) : void 0,
        " ",
        xr(S.column.columnDef.header, S.getContext())
      ] }) }, S.id)) }, k.id)) }),
      /* @__PURE__ */ m(kn, { children: w.getRowModel().rows.map((k, S) => /* @__PURE__ */ m(
        vt,
        {
          "data-state": k.getIsSelected() ? "selected" : "",
          className: F(D(k, S)),
          onClick: ($) => _(k, $),
          children: k.getVisibleCells().map(($) => {
            if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== Ot || !r)))
              return /* @__PURE__ */ m(
                Kt,
                {
                  className: F(
                    $.column.columnDef.id,
                    "pr-p-[1px]",
                    V(c, k, $)
                  ),
                  children: (() => $.getIsGrouped() ? /* @__PURE__ */ A(
                    he,
                    {
                      variant: "ghost",
                      onClick: k.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        k.getIsExpanded() ? "👇" : "👉",
                        " ",
                        xr($.column.columnDef.cell, $.getContext()),
                        " (",
                        k.subRows.length,
                        ")"
                      ]
                    }
                  ) : xr($.column.columnDef.cell, $.getContext()))()
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
const Og = To(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), nl = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(Pi.Root, { ref: r, className: F(Og(), e), ...t }));
nl.displayName = Pi.Root.displayName;
function Rg({
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
  return /* @__PURE__ */ A("div", { className: F("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": n }), children: [
    /* @__PURE__ */ m(
      nl,
      {
        htmlFor: e,
        className: F({
          "pr-text-red-600": r,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ m(
      yn,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: F(c, { "pr-border-red-600": r }),
        defaultValue: d,
        value: f,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ m("p", { className: F({ "pr-hidden": !o }), children: o })
  ] });
}
function Iv({ onSearch: e, placeholder: t, isFullWidth: r }) {
  const [n, o] = fe(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ m(
    Rg,
    {
      isFullWidth: r,
      className: "search-bar-input",
      placeholder: t,
      value: n,
      onChange: (i) => a(i.target.value)
    }
  );
}
function Mv({
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
    yc,
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
function Av({
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
    wc,
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
function Dv({
  id: e,
  isChecked: t,
  isDisabled: r = !1,
  hasError: n = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ m(
    xc,
    {
      id: e,
      checked: t,
      disabled: r,
      className: `papi-switch ${n ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
function jv({
  menuProvider: e,
  commandHandler: t,
  className: r,
  id: n,
  children: o
}) {
  const a = $t(void 0);
  return /* @__PURE__ */ m("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ m(Ec, { position: "static", id: n, children: /* @__PURE__ */ A(kc, { className: `papi-toolbar ${r ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ m(
      xg,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ m("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Bv = De.Root, Pg = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.List,
  {
    ref: r,
    className: F(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Pg.displayName = De.List.displayName;
const $g = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Trigger,
  {
    ref: r,
    className: F(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
$g.displayName = De.Trigger.displayName;
const _g = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Content,
  {
    ref: r,
    className: F(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
_g.displayName = De.Content.displayName;
const Ig = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Root,
  {
    orientation: "vertical",
    ref: r,
    className: F("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
Ig.displayName = De.List.displayName;
const Mg = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.List,
  {
    ref: r,
    className: F(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Mg.displayName = De.List.displayName;
const Lv = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Trigger,
  {
    ref: r,
    ...t,
    className: F(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), Ag = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  De.Content,
  {
    ref: r,
    className: F(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Ag.displayName = De.Content.displayName;
function Dg({ columns: e, tableData: t, onSelectItem: r }) {
  return /* @__PURE__ */ m(
    up,
    {
      columns: e,
      data: t,
      stickyHeader: !0,
      onRowClickHandler: (o, a) => {
        a.toggleAllRowsSelected(!1), o.toggleSelected(void 0), r(o.getValue("item"));
      }
    }
  );
}
const fi = (e) => {
  const t = /^\\[vc]\s+(\d+)/, r = e.match(t);
  return r ? +r[1] : 0;
}, mi = (e, t, r, n) => {
  if (!e || e === "" || t === "")
    return [];
  const o = [], a = e.split(`
`);
  let i = n.chapterNum, l = n.verseNum, c = 0;
  return a.forEach((d) => {
    d.startsWith("\\id") && (i = 0, l = 0), d.startsWith("\\c") && (i = fi(d), l = 0), d.startsWith("\\v") && (l = fi(d), i === 0 && (i = n.chapterNum));
    const f = r(d, t);
    for (let v = 0; v < f.length; v++) {
      const g = {
        reference: { ...n, chapterNum: +i, verseNum: +l },
        snippet: d,
        key: c
      };
      c += 1, o.push(g);
    }
  }), o;
};
function jg({
  selectedItem: e,
  text: t,
  extractItems: r,
  scriptureReference: n,
  setScriptureReference: o,
  localizedStrings: a
}) {
  const i = a["%webView_inventory_occurrences_table_header_reference%"], l = a["%webView_inventory_occurrences_table_header_occurrence%"], [c, d] = fe(
    mi(t, e, r, n)
  );
  return Ye(
    () => d(mi(t, e, r, n)),
    [t, e, n, r]
  ), /* @__PURE__ */ A(xn, { stickyHeader: !0, children: [
    /* @__PURE__ */ m(En, { stickyHeader: !0, children: /* @__PURE__ */ A(vt, { children: [
      /* @__PURE__ */ m(Pr, { children: i }),
      /* @__PURE__ */ m(Pr, { children: l })
    ] }) }),
    /* @__PURE__ */ m(kn, { children: c.map((f) => /* @__PURE__ */ A(
      vt,
      {
        onClick: () => {
          o(f.reference);
        },
        children: [
          /* @__PURE__ */ m(Kt, { children: `${me.bookNumberToEnglishName(f.reference.bookNum)} ${f.reference.chapterNum}:${f.reference.verseNum}` }),
          /* @__PURE__ */ m(Kt, { children: f.snippet })
        ]
      },
      f.key
    )) })
  ] });
}
const Bg = (e, t, r) => {
  let n = e;
  return t !== "all" && (n = n.filter(
    (o) => t === "approved" && o.status === !0 || t === "unapproved" && o.status === !1 || t === "unknown" && o.status === void 0
  )), r !== "" && (n = n.filter((o) => o.item.includes(r))), n;
}, Lg = (e, t, r) => {
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
};
function ol({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  extractItems: n,
  approvedItems: o,
  onApprovedItemsChange: a,
  unapprovedItems: i,
  onUnapprovedItemsChange: l,
  text: c,
  scope: d,
  onScopeChange: f,
  columns: v
}) {
  const g = r["%webView_inventory_all%"], p = r["%webView_inventory_approved%"], h = r["%webView_inventory_unapproved%"], u = r["%webView_inventory_unknown%"], b = r["%webView_inventory_scope_book%"], x = r["%webView_inventory_scope_chapter%"], R = r["%webView_inventory_scope_verse%"], w = r["%webView_inventory_filter_text%"], [E, y] = fe([]), [N, C] = fe("all"), [_, D] = fe(""), [V, k] = fe(""), S = (j, M) => {
    y((Y) => {
      let O = [];
      return j.forEach((B) => {
        O = Y.map((H) => H.item === B && H.status !== M ? { ...H, status: M } : H);
      }), O;
    });
    let U = [...o];
    j.forEach((Y) => {
      M === !0 ? U.includes(Y) || U.push(Y) : U = U.filter((O) => O !== Y);
    }), a(U);
    let Q = [...i];
    j.forEach((Y) => {
      M === !1 ? Q.includes(Y) || Q.push(Y) : Q = Q.filter((O) => O !== Y);
    }), l(Q);
  }, $ = Ce(
    (j) => {
      if (o.includes(j))
        return !0;
      if (i.includes(j))
        return !1;
    },
    [o, i]
  );
  Ye(() => {
    c && y(Lg(c, n, $));
  }, [n, e, c, $]);
  const z = Dr(() => Bg(E, N, _), [E, N, _]);
  return /* @__PURE__ */ A("div", { className: "pr-flex pr-h-full pr-flex-col", children: [
    /* @__PURE__ */ A("div", { className: "pr-flex", children: [
      /* @__PURE__ */ A(ln, { onValueChange: (j) => C(j), defaultValue: N, children: [
        /* @__PURE__ */ m(Or, { className: "pr-m-1", children: /* @__PURE__ */ m(cn, { placeholder: "Select filter" }) }),
        /* @__PURE__ */ A(Rr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ m(Ke, { value: "all", children: g }),
          /* @__PURE__ */ m(Ke, { value: "approved", children: p }),
          /* @__PURE__ */ m(Ke, { value: "unapproved", children: h }),
          /* @__PURE__ */ m(Ke, { value: "unknown", children: u })
        ] })
      ] }),
      /* @__PURE__ */ A(ln, { onValueChange: (j) => f(j), defaultValue: d, children: [
        /* @__PURE__ */ m(Or, { className: "pr-m-1", children: /* @__PURE__ */ m(cn, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ A(Rr, { className: "pr-font-sans", children: [
          /* @__PURE__ */ m(Ke, { value: "book", children: b }),
          /* @__PURE__ */ m(Ke, { value: "chapter", children: x }),
          /* @__PURE__ */ m(Ke, { value: "verse", children: R })
        ] })
      ] }),
      /* @__PURE__ */ m(
        yn,
        {
          className: "pr-m-1 pr-rounded-md pr-border",
          placeholder: w,
          value: _,
          onChange: (j) => {
            D(j.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ m("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ m(
      Dg,
      {
        columns: v(S),
        tableData: z,
        onSelectItem: (j) => {
          k(j);
        }
      }
    ) }),
    V !== "" && /* @__PURE__ */ m("div", { className: "pr-m-1 pr-flex-1 pr-overflow-auto pr-rounded-md pr-border", children: /* @__PURE__ */ m(
      jg,
      {
        selectedItem: V,
        text: c,
        extractItems: n,
        scriptureReference: e,
        setScriptureReference: (j) => t(j),
        localizedStrings: r
      }
    ) })
  ] });
}
const _t = (e) => e === "asc" ? /* @__PURE__ */ m(Zl, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ m(Ql, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ m(ec, { className: "pr-ml-2 pr-h-4 pr-w-4" }), Vg = (e, t, r, n, o) => [
  {
    accessorKey: "item",
    header: ({ column: a }) => /* @__PURE__ */ A(he, { onClick: () => a.toggleSorting(void 0), children: [
      e,
      _t(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: a }) => /* @__PURE__ */ A(he, { onClick: () => a.toggleSorting(void 0), children: [
      t,
      _t(a.getIsSorted())
    ] }),
    cell: ({ row: a }) => a.getValue("item").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: a }) => /* @__PURE__ */ A(he, { onClick: () => a.toggleSorting(void 0), children: [
      r,
      _t(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: a, table: i }) => {
      const l = i.getSelectedRowModel().rows, c = [];
      return l.forEach((d) => {
        c.push(d.getValue("item"));
      }), /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ m("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ A(he, { onClick: () => a.toggleSorting(void 0), children: [
          n,
          _t(a.getIsSorted())
        ] }) }),
        /* @__PURE__ */ A("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ m(he, { children: /* @__PURE__ */ m(
            on,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ m(he, { children: /* @__PURE__ */ m(
            an,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !1);
              }
            }
          ) }),
          /* @__PURE__ */ m(he, { children: /* @__PURE__ */ m(
            sn,
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
      return i === !0 ? /* @__PURE__ */ m(on, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : i === !1 ? /* @__PURE__ */ m(an, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ m(sn, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
], Fg = (e, t = void 0) => {
  let r = ic(e, "");
  return t && (r = r.filter((n) => n === t)), r;
};
function Vv({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  approvedItems: n,
  onApprovedItemsChange: o,
  unapprovedItems: a,
  onUnapprovedItemsChange: i,
  text: l,
  scope: c,
  onScopeChange: d
}) {
  const f = r["%webView_inventory_table_header_character%"], v = r["%webView_inventory_table_header_unicode_value%"], g = r["%webView_inventory_table_header_count%"], p = r["%webView_inventory_table_header_status%"];
  return /* @__PURE__ */ m("div", { className: "pr-twp pr-h-full", children: /* @__PURE__ */ m(
    ol,
    {
      scriptureReference: e,
      setScriptureReference: t,
      localizedStrings: r,
      extractItems: Fg,
      approvedItems: n,
      onApprovedItemsChange: o,
      unapprovedItems: a,
      onUnapprovedItemsChange: i,
      text: l,
      scope: c,
      onScopeChange: d,
      columns: (u) => Vg(f, v, g, p, u)
    }
  ) });
}
const zg = (e, t, r, n) => [
  {
    accessorKey: "item",
    header: ({ column: o }) => /* @__PURE__ */ A(he, { onClick: () => o.toggleSorting(void 0), children: [
      e,
      _t(o.getIsSorted())
    ] })
  },
  {
    accessorKey: "count",
    header: ({ column: o }) => /* @__PURE__ */ A(he, { onClick: () => o.toggleSorting(void 0), children: [
      t,
      _t(o.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: o, table: a }) => {
      const i = a.getSelectedRowModel().rows, l = [];
      return i.forEach((c) => {
        l.push(c.getValue("item"));
      }), /* @__PURE__ */ A("div", { children: [
        /* @__PURE__ */ m("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ A(he, { onClick: () => o.toggleSorting(void 0), children: [
          r,
          _t(o.getIsSorted())
        ] }) }),
        /* @__PURE__ */ A("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ m(he, { children: /* @__PURE__ */ m(
            on,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                n(l, !0);
              }
            }
          ) }),
          /* @__PURE__ */ m(he, { children: /* @__PURE__ */ m(
            an,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                n(l, !1);
              }
            }
          ) }),
          /* @__PURE__ */ m(he, { children: /* @__PURE__ */ m(
            sn,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                n(l, void 0);
              }
            }
          ) })
        ] })
      ] });
    },
    cell: ({ row: o }) => {
      const a = o.getValue("status");
      return a === !0 ? /* @__PURE__ */ m(on, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : a === !1 ? /* @__PURE__ */ m(an, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ m(sn, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
], Ug = (e, t = void 0) => {
  const r = [];
  return e.split(/[\s]+/).forEach((o, a, i) => {
    t && o !== t || a + 1 < i.length && o === i[a + 1] && r.push(o);
  }), r;
};
function Fv({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: r,
  approvedItems: n,
  onApprovedItemsChange: o,
  unapprovedItems: a,
  onUnapprovedItemsChange: i,
  text: l,
  scope: c,
  onScopeChange: d
}) {
  const f = r["%webView_inventory_table_header_repeated_words%"], v = r["%webView_inventory_table_header_count%"], g = r["%webView_inventory_table_header_status%"];
  return /* @__PURE__ */ m("div", { className: "pr-twp pr-h-full", children: /* @__PURE__ */ m(
    ol,
    {
      scriptureReference: e,
      setScriptureReference: t,
      localizedStrings: r,
      extractItems: Ug,
      approvedItems: n,
      onApprovedItemsChange: o,
      unapprovedItems: a,
      onUnapprovedItemsChange: i,
      text: l,
      scope: c,
      onScopeChange: d,
      columns: (h) => zg(f, v, g, h)
    }
  ) });
}
function zv({
  isInstalling: e,
  handleClick: t,
  buttonText: r
}) {
  return /* @__PURE__ */ m(
    he,
    {
      className: F(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600": !r,
          "pr-w-20": r
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ m(vn, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ A(yt, { children: [
        /* @__PURE__ */ m(tc, { size: 25, className: F("pr-h-4 pr-w-4", { "pr-mr-1": r }) }),
        r
      ] })
    }
  );
}
function Uv({ isEnabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    he,
    {
      className: F(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ A(yt, { children: [
        /* @__PURE__ */ m(vn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Hv({ isDisabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    he,
    {
      className: F(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ A(yt, { children: [
        /* @__PURE__ */ m(vn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Gv({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    he,
    {
      className: F(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ A(yt, { children: [
        /* @__PURE__ */ m(vn, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
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
const Hg = ["children", "options"], hi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), gi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, Gg = ["style", "script"], Wg = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Xg = /mailto:/i, qg = /\n{2,}$/, al = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Yg = /^ *> ?/gm, Kg = /^ {2,}\n/, Jg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, il = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, sl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Zg = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Qg = /^(?:\n *)*\n/, eb = /\r\n?/g, tb = /^\[\^([^\]]+)](:.*)\n/, rb = /^\[\^([^\]]+)]/, nb = /\f/g, ob = /^\s*?\[(x|\s)\]/, ll = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, cl = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, pl = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, xo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, ab = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, ul = /^<!--[\s\S]*?(?:-->)/, ib = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, Eo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, sb = /^\{.*\}$/, lb = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, cb = /^<([^ >]+@[^ >]+)>/, pb = /^<([^ >]+:\/[^ >]+)>/, ub = /-([a-z])?/gi, dl = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, db = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, fb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, mb = /^\[([^\]]*)\] ?\[([^\]]*)\]/, hb = /(\[|\])/g, gb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, bb = /\t/g, vb = /^ *\| */, yb = /(^ *\||\| *$)/g, wb = / *$/, xb = /^ *:-+: *$/, Eb = /^ *:-+ *$/, kb = /^ *-+: *$/, Tb = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, Nb = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, Cb = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Sb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Ob = /^\\([^0-9A-Za-z\s])/, Rb = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, Pb = /^\n+/, $b = /^([ \t]*)/, _b = /\\([^\\])/g, bi = / *\n+$/, Ib = /(?:^|\n)( *)$/, Jo = "(?:\\d+\\.)", Zo = "(?:[*+-])";
function fl(e) {
  return "( *)(" + (e === 1 ? Jo : Zo) + ") +";
}
const ml = fl(1), hl = fl(2);
function gl(e) {
  return new RegExp("^" + (e === 1 ? ml : hl));
}
const Mb = gl(1), Ab = gl(2);
function bl(e) {
  return new RegExp("^" + (e === 1 ? ml : hl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? Jo : Zo) + " )[^\\n]*)*(\\n|$)", "gm");
}
const vl = bl(1), yl = bl(2);
function wl(e) {
  const t = e === 1 ? Jo : Zo;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const xl = wl(1), El = wl(2);
function vi(e, t) {
  const r = t === 1, n = r ? xl : El, o = r ? vl : yl, a = r ? Mb : Ab;
  return { t(i, l, c) {
    const d = Ib.exec(c);
    return d && (l.o || !l._ && !l.u) ? n.exec(i = d[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const d = r ? +i[2] : void 0, f = i[0].replace(qg, `
`).match(o);
    let v = !1;
    return { p: f.map(function(g, p) {
      const h = a.exec(g)[0].length, u = new RegExp("^ {1," + h + "}", "gm"), b = g.replace(u, "").replace(a, ""), x = p === f.length - 1, R = b.indexOf(`

`) !== -1 || x && v;
      v = R;
      const w = c._, E = c.o;
      let y;
      c.o = !0, R ? (c._ = !1, y = b.replace(bi, `

`)) : (c._ = !0, y = b.replace(bi, ""));
      const N = l(y, c);
      return c._ = w, c.o = E, N;
    }), m: r, g: d };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(d, f) {
    return e("li", { key: f }, l(d, c));
  })) };
}
const Db = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, jb = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, kl = [al, il, sl, ll, pl, cl, ul, dl, vl, xl, yl, El], Bb = [...kl, /^[^\n]+(?:  \n|\n{2,})/, xo, Eo];
function Lb(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Vb(e) {
  return kb.test(e) ? "right" : xb.test(e) ? "center" : Eb.test(e) ? "left" : null;
}
function yi(e, t, r) {
  const n = r.$;
  r.$ = !0;
  const o = t(e.trim(), r);
  r.$ = n;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(wb, "")), a[a.length - 1].push(i));
  }), a;
}
function Fb(e, t, r) {
  r._ = !0;
  const n = yi(e[1], t, r), o = e[2].replace(yb, "").split("|").map(Vb), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(d) {
      return yi(d, l, c);
    });
  }(e[3], t, r);
  return r._ = !1, { S: o, A: a, L: n, type: "table" };
}
function wi(e, t) {
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
function gr(e) {
  return function(t) {
    return e.exec(t);
  };
}
function zb(e, t, r) {
  if (t._ || t.u || r && !r.endsWith(`
`))
    return null;
  let n = "";
  e.split(`
`).every((a) => !kl.some((i) => i.test(a)) && (n += a + `
`, a.trim()));
  const o = n.trimEnd();
  return o == "" ? null : [n, o];
}
function Wt(e) {
  try {
    if (decodeURIComponent(e).replace(/[^A-Za-z0-9/:]/g, "").match(/^\s*(javascript|vbscript|data(?!:image)):/i))
      return;
  } catch {
    return null;
  }
  return e;
}
function xi(e) {
  return e.replace(_b, "$1");
}
function nn(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !0, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Ub(e, t, r) {
  const n = r._ || !1, o = r.u || !1;
  r._ = !1, r.u = !0;
  const a = e(t, r);
  return r._ = n, r.u = o, a;
}
function Hb(e, t, r) {
  return r._ = !1, e(t, r);
}
const to = (e, t, r) => ({ v: nn(t, e[1], r) });
function ro() {
  return {};
}
function no() {
  return null;
}
function Gb(...e) {
  return e.filter(Boolean).join(" ");
}
function oo(e, t, r) {
  let n = e;
  const o = t.split(".");
  for (; o.length && (n = n[o[0]], n !== void 0); )
    o.shift();
  return n || r;
}
var ae;
function Wb(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Lb, t.namedCodesToUnicode = t.namedCodesToUnicode ? Pt({}, gi, t.namedCodesToUnicode) : gi;
  const r = t.createElement || T.createElement;
  function n(p, h, ...u) {
    const b = oo(t.overrides, `${p}.props`, {});
    return r(function(x, R) {
      const w = oo(R, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : oo(R, `${x}.component`, x) : x;
    }(p, t.overrides), Pt({}, h, b, { className: Gb(h == null ? void 0 : h.className, b.className) || void 0 }), ...u);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = gb.test(p) === !1);
    const u = f(d(h ? p : `${p.trimEnd().replace(Pb, "")}

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
    return T.createElement(b, { key: "outer" }, x);
  }
  function a(p) {
    const h = p.match(Wg);
    return h ? h.reduce(function(u, b, x) {
      const R = b.indexOf("=");
      if (R !== -1) {
        const w = function(C) {
          return C.indexOf("-") !== -1 && C.match(ib) === null && (C = C.replace(ub, function(_, D) {
            return D.toUpperCase();
          })), C;
        }(b.slice(0, R)).trim(), E = function(C) {
          const _ = C[0];
          return (_ === '"' || _ === "'") && C.length >= 2 && C[C.length - 1] === _ ? C.slice(1, -1) : C;
        }(b.slice(R + 1).trim()), y = hi[w] || w, N = u[y] = function(C, _) {
          return C === "style" ? _.split(/;\s?/).reduce(function(D, V) {
            const k = V.slice(0, V.indexOf(":"));
            return D[k.replace(/(-[a-z])/g, (S) => S[1].toUpperCase())] = V.slice(k.length + 1).trim(), D;
          }, {}) : C === "href" ? Wt(_) : (_.match(sb) && (_ = _.slice(1, _.length - 1)), _ === "true" || _ !== "false" && _);
        }(w, E);
        typeof N == "string" && (xo.test(N) || Eo.test(N)) && (u[y] = T.cloneElement(o(N.trim()), { key: x }));
      } else
        b !== "style" && (u[hi[b] || b] = !0);
      return u;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: it(al), i: ae.HIGH, l: (p, h, u) => ({ v: h(p[0].replace(Yg, ""), u) }), h: (p, h, u) => n("blockquote", { key: u.k }, h(p.v, u)) }, breakLine: { t: gr(Kg), i: ae.HIGH, l: ro, h: (p, h, u) => n("br", { key: u.k }) }, breakThematic: { t: it(Jg), i: ae.HIGH, l: ro, h: (p, h, u) => n("hr", { key: u.k }) }, codeBlock: { t: it(sl), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, u) => n("pre", { key: u.k }, n("code", Pt({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: it(il), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: ht(Zg), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, h, u) => n("code", { key: u.k }, p.v) }, footnote: { t: it(tb), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: no }, footnoteReference: { t: mt(rb), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, u) => n("a", { key: u.k, href: Wt(p.B) }, n("sup", { key: u.k }, p.v)) }, gfmTask: { t: mt(ob), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, u) => n("input", { checked: p.R, key: u.k, readOnly: !0, type: "checkbox" }) }, heading: { t: it(t.enforceAtxHeadings ? cl : ll), i: ae.HIGH, l: (p, h, u) => ({ v: nn(h, p[2], u), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, u) => n(`h${p.C}`, { id: p.T, key: u.k }, h(p.v, u)) }, headingSetext: { t: it(pl), i: ae.MAX, l: (p, h, u) => ({ v: nn(h, p[1], u), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: gr(ul), i: ae.HIGH, l: () => ({}), h: no }, image: { t: ht(jb), i: ae.HIGH, l: (p) => ({ D: p[1], B: xi(p[2]), F: p[3] }), h: (p, h, u) => n("img", { key: u.k, alt: p.D || void 0, title: p.F || void 0, src: Wt(p.B) }) }, link: { t: mt(Db), i: ae.LOW, l: (p, h, u) => ({ v: Ub(h, p[1], u), B: xi(p[2]), F: p[3] }), h: (p, h, u) => n("a", { key: u.k, href: Wt(p.B), title: p.F }, h(p.v, u)) }, linkAngleBraceStyleDetector: { t: mt(pb), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : mt(lb)(p, h), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: mt(cb), i: ae.MAX, l(p) {
    let h = p[1], u = p[1];
    return Xg.test(u) || (u = "mailto:" + u), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: u, type: "link" };
  } }, orderedList: vi(n, 1), unorderedList: vi(n, 2), newlineCoalescer: { t: it(Qg), i: ae.LOW, l: ro, h: () => `
` }, paragraph: { t: zb, i: ae.LOW, l: to, h: (p, h, u) => n("p", { key: u.k }, h(p.v, u)) }, ref: { t: mt(db), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: no }, refImage: { t: ht(fb), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, u) => n("img", { key: u.k, alt: p.D, src: Wt(l[p.P].B), title: l[p.P].F }) }, refLink: { t: mt(mb), i: ae.MAX, l: (p, h, u) => ({ v: h(p[1], u), Z: h(p[0].replace(hb, "\\$1"), u), P: p[2] }), h: (p, h, u) => l[p.P] ? n("a", { key: u.k, href: Wt(l[p.P].B), title: l[p.P].F }, h(p.v, u)) : n("span", { key: u.k }, h(p.Z, u)) }, table: { t: it(dl), i: ae.HIGH, l: Fb, h: (p, h, u) => n("table", { key: u.k }, n("thead", null, n("tr", null, p.L.map(function(b, x) {
    return n("th", { key: x, style: wi(p, x) }, h(b, u));
  }))), n("tbody", null, p.A.map(function(b, x) {
    return n("tr", { key: x }, b.map(function(R, w) {
      return n("td", { key: w, style: wi(p, w) }, h(R, u));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, vb.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: gr(Rb), i: ae.MIN, l: (p) => ({ v: p[0].replace(ab, (h, u) => t.namedCodesToUnicode[u] ? t.namedCodesToUnicode[u] : h) }), h: (p) => p.v }, textBolded: { t: ht(Tb), i: ae.MED, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => n("strong", { key: u.k }, h(p.v, u)) }, textEmphasized: { t: ht(Nb), i: ae.LOW, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => n("em", { key: u.k }, h(p.v, u)) }, textEscaped: { t: ht(Ob), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: ht(Cb), i: ae.LOW, l: to, h: (p, h, u) => n("mark", { key: u.k }, h(p.v, u)) }, textStrikethroughed: { t: ht(Sb), i: ae.LOW, l: to, h: (p, h, u) => n("del", { key: u.k }, h(p.v, u)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: gr(xo), i: ae.HIGH, l(p, h, u) {
    const [, b] = p[3].match($b), x = new RegExp(`^${b}`, "gm"), R = p[3].replace(x, ""), w = (E = R, Bb.some((_) => _.test(E)) ? Hb : nn);
    var E;
    const y = p[1].toLowerCase(), N = Gg.indexOf(y) !== -1;
    u.N = u.N || y === "a";
    const C = N ? p[3] : w(h, R, u);
    return u.N = !1, { O: a(p[2]), v: C, G: N, H: N ? y : p[1] };
  }, h: (p, h, u) => n(p.H, Pt({ key: u.k }, p.O), p.G ? p.v : h(p.v, u)) }, c.htmlSelfClosing = { t: gr(Eo), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, h, u) => n(p.H, Pt({}, p.O, { key: u.k })) });
  const d = function(p) {
    let h = Object.keys(p);
    function u(b, x) {
      let R = [], w = "";
      for (; b; ) {
        let E = 0;
        for (; E < h.length; ) {
          const y = h[E], N = p[y], C = N.t(b, x, w);
          if (C) {
            const _ = C[0];
            b = b.substring(_.length);
            const D = N.l(C, u, x);
            D.type == null && (D.type = y), R.push(D), w = _;
            break;
          }
          E++;
        }
      }
      return R;
    }
    return h.sort(function(b, x) {
      let R = p[b].i, w = p[x].i;
      return R !== w ? R - w : b < x ? -1 : 1;
    }), function(b, x) {
      return u(function(R) {
        return R.replace(eb, `
`).replace(nb, "").replace(bb, "    ");
      }(b), x);
    };
  }(c), f = (v = function(p) {
    return function(h, u, b) {
      return p[h.type].h(h, u, b);
    };
  }(c), function p(h, u = {}) {
    if (Array.isArray(h)) {
      const b = u.k, x = [];
      let R = !1;
      for (let w = 0; w < h.length; w++) {
        u.k = w;
        const E = p(h[w], u), y = typeof E == "string";
        y && R ? x[x.length - 1] += E : E !== null && x.push(E), R = y;
      }
      return u.k = b, x;
    }
    return v(h, p, u);
  });
  var v;
  const g = o(e);
  return i.length ? n("div", null, g, n("footer", { key: "footer" }, i.map(function(p) {
    return n("div", { id: t.slugify(p.j), key: p.j }, p.j, f(d(p.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const Xb = (e) => {
  let { children: t, options: r } = e, n = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, d = Object.keys(o);
    for (l = 0; l < d.length; l++)
      a.indexOf(i = d[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Hg);
  return T.cloneElement(Wb(t, r), n);
};
function Wv({ markdown: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-prose", children: /* @__PURE__ */ m(Xb, { children: e }) });
}
const Xv = (e, t) => {
  Ye(() => {
    if (!e)
      return () => {
      };
    const r = e(t);
    return () => {
      r();
    };
  }, [e, t]);
}, ao = () => !1, qv = (e, t) => {
  const [r] = wo(
    Ce(async () => {
      if (!e)
        return ao;
      const n = await Promise.resolve(e(t));
      return async () => n();
    }, [t, e]),
    ao,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Ye(() => () => {
    r !== ao && r();
  }, [r]);
}, qb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: F(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
qb.displayName = "Card";
const Yb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "div",
    {
      ref: r,
      className: F("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
Yb.displayName = "CardHeader";
const Kb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m(
    "h3",
    {
      ref: r,
      className: F("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Kb.displayName = "CardTitle";
const Jb = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("p", { ref: r, className: F("pr-text-sm pr-text-muted-foreground", e), ...t }));
Jb.displayName = "CardDescription";
const Zb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: F("pr-p-6 pr-pt-0", e), ...t })
);
Zb.displayName = "CardContent";
const Qb = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: F("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Qb.displayName = "CardFooter";
const ev = To(
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
), tv = G.forwardRef(({ className: e, variant: t, ...r }, n) => /* @__PURE__ */ m("div", { ref: n, role: "alert", className: F(ev({ variant: t }), e), ...r }));
tv.displayName = "Alert";
const rv = G.forwardRef(
  ({ className: e, ...t }, r) => /* @__PURE__ */ A(
    "h5",
    {
      ref: r,
      className: F("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
rv.displayName = "AlertTitle";
const nv = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m("div", { ref: r, className: F("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
nv.displayName = "AlertDescription";
const ov = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ A(
  br.Root,
  {
    ref: r,
    className: F(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ m(br.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ m(br.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ m(br.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
ov.displayName = br.Root.displayName;
const av = G.forwardRef(({ className: e, ...t }, r) => /* @__PURE__ */ m(
  so.Root,
  {
    className: F(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: r,
    children: /* @__PURE__ */ m(
      so.Thumb,
      {
        className: F(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
av.displayName = so.Root.displayName;
function iv(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const r = document.head || document.querySelector("head"), n = r.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && n ? r.insertBefore(o, n) : r.appendChild(o);
}
iv(`/*
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
.pr-top-0 {
  top: 0px;
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
.check-item {
  flex-wrap: wrap;
  vertical-align: middle;
}

.papi-checkbox {
  display: block;
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
  tv as Alert,
  nv as AlertDescription,
  rv as AlertTitle,
  Sv as BookChapterControl,
  he as Button,
  qb as Card,
  Zb as CardContent,
  Jb as CardDescription,
  Qb as CardFooter,
  Yb as CardHeader,
  Kb as CardTitle,
  Ov as ChapterRangeSelector,
  Vv as CharacterInventory,
  xp as Checkbox,
  Rv as Checklist,
  va as ComboBox,
  Pv as ContextMenu,
  up as DataTable,
  Hv as DisableButton,
  ji as DropdownMenu,
  Li as DropdownMenuCheckboxItem,
  Oo as DropdownMenuContent,
  kv as DropdownMenuGroup,
  Bi as DropdownMenuItem,
  wn as DropdownMenuLabel,
  Tv as DropdownMenuPortal,
  Cv as DropdownMenuRadioGroup,
  Gc as DropdownMenuRadioItem,
  Ro as DropdownMenuSeparator,
  Wc as DropdownMenuShortcut,
  Nv as DropdownMenuSub,
  Hc as DropdownMenuSubContent,
  Uc as DropdownMenuSubTrigger,
  zc as DropdownMenuTrigger,
  Uv as EnableButton,
  Oh as GridMenu,
  xg as HamburgerMenuButton,
  $v as IconButton,
  yn as Input,
  zv as InstallButton,
  nl as Label,
  Xt as LabelPosition,
  Wv as MarkdownRenderer,
  Us as MenuItem,
  Fv as RepeatedWordsInventory,
  _v as ScriptureResultsViewer,
  Iv as SearchBar,
  ln as Select,
  Rr as SelectContent,
  ap as SelectGroup,
  Ke as SelectItem,
  ip as SelectLabel,
  Fi as SelectScrollDownButton,
  Vi as SelectScrollUpButton,
  sp as SelectSeparator,
  Or as SelectTrigger,
  cn as SelectValue,
  ov as ShadCnSlider,
  av as ShadCnSwitch,
  Mv as Slider,
  Av as Snackbar,
  Dv as Switch,
  xn as Table,
  kn as TableBody,
  pp as TableCaption,
  Kt as TableCell,
  cp as TableFooter,
  Pr as TableHead,
  En as TableHeader,
  vt as TableRow,
  Bv as Tabs,
  _g as TabsContent,
  Pg as TabsList,
  $g as TabsTrigger,
  Rg as TextField,
  jv as Toolbar,
  Gv as UpdateButton,
  Ig as VerticalTabs,
  Ag as VerticalTabsContent,
  Mg as VerticalTabsList,
  Lv as VerticalTabsTrigger,
  np as buttonVariants,
  Xv as useEvent,
  qv as useEventAsync,
  wo as usePromise
};
//# sourceMappingURL=index.js.map
