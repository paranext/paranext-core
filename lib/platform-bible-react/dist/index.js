import Ll, { jsx as m, jsxs as D, Fragment as yt } from "react/jsx-runtime";
import * as T from "react";
import G, { forwardRef as xi, useCallback as Ce, useState as ie, useRef as $t, useEffect as Fe, useLayoutEffect as pa, useMemo as hr } from "react";
import { History as Vl, ChevronRight as Fl, Check as wo, Circle as zl, ArrowDownWideNarrow as Ul, Clock as Hl, Bookmark as Gl, FilterIcon as Wl, ChevronDown as Ei, ChevronUp as Xl, ArrowLeftIcon as ql, ChevronLeftIcon as Yl, ChevronRightIcon as Kl, ArrowRightIcon as Jl, X as Zl, Search as Ql, ChevronsUpDown as ec, CircleCheckIcon as da, CircleXIcon as ua, CircleHelpIcon as fa, ArrowUpIcon as tc, ArrowDownIcon as nc, ArrowUpDownIcon as rc, LoaderCircle as gr, Download as oc } from "lucide-react";
import Se, { clsx as ac } from "clsx";
import { extendTailwindMerge as ic } from "tailwind-merge";
import * as ge from "@radix-ui/react-dropdown-menu";
import { DropdownMenuTrigger as sc } from "@radix-ui/react-dropdown-menu";
import { getChaptersForBook as lc, compareScrRefs as ro, scrRefToBBBCCCVVV as jr, formatScrRef as Lr, split as cc } from "platform-bible-utils";
import { useReactTable as ki, getCoreRowModel as Ti, getPaginationRowModel as pc, getSortedRowModel as Ni, getFilteredRowModel as dc, flexRender as xn, getExpandedRowModel as uc, getGroupedRowModel as fc } from "@tanstack/react-table";
import { Slot as mc } from "@radix-ui/react-slot";
import { cva as xo } from "class-variance-authority";
import * as xe from "@radix-ui/react-select";
import { FormControlLabel as ma, FormLabel as hc, Checkbox as gc, MenuItem as bc, ListItemText as vc, ListItemIcon as Ci, Menu as yc, Grid as Si, List as wc, IconButton as Oi, Drawer as xc, Slider as Ec, Snackbar as kc, Switch as Tc, AppBar as Nc, Toolbar as Cc } from "@mui/material";
import * as Sn from "@radix-ui/react-popover";
import { Command as Ae } from "cmdk";
import * as Qe from "@radix-ui/react-dialog";
import Sc, { ThemeContext as Oc, internal_processStyles as Rc } from "@mui/styled-engine";
import * as Pc from "react-dom";
import Xn from "react-dom";
import * as De from "@radix-ui/react-tabs";
import * as Ri from "@radix-ui/react-separator";
import * as Pi from "@radix-ui/react-label";
import * as bn from "@radix-ui/react-slider";
import * as oo from "@radix-ui/react-switch";
const $c = ic({ prefix: "pr-" });
function L(...e) {
  return $c(ac(e));
}
const Dn = G.forwardRef(
  ({ className: e, type: t, ...n }, r) => /* @__PURE__ */ m(
    "input",
    {
      type: t,
      className: L(
        "pr-flex pr-h-10 pr-rounded-md pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ref: r,
      ...n
    }
  )
);
Dn.displayName = "Input";
const _c = xi(
  ({ handleSearch: e, handleKeyDown: t, handleOnClick: n, handleSubmit: r, ...o }, a) => /* @__PURE__ */ D("div", { className: "pr-relative", children: [
    /* @__PURE__ */ m(
      Dn,
      {
        ...o,
        type: "text",
        className: "pr-box-border pr-gap-2.5 pr-rounded-lg pr-border pr-border-solid pr-border-black pr-bg-white pr-py-2 pr-pl-4 pr-pr-3 pr-font-medium pr-text-slate-900 pr-shadow-none pr-outline-none",
        onChange: (i) => e(i.target.value),
        onKeyDown: (i) => {
          i.key === "Enter" && r(), t(i);
        },
        onClick: n,
        ref: a
      }
    ),
    /* @__PURE__ */ m(
      Vl,
      {
        className: "pr-absolute pr-right-3 pr-top-1/2 pr-h-4 pr-w-4 pr--translate-y-1/2 pr-transform pr-cursor-pointer pr-text-gray-500",
        onClick: () => {
          console.log("back in history");
        }
      }
    )
  ] })
);
var Mc = Object.defineProperty, Ic = (e, t, n) => t in e ? Mc(e, t, { enumerable: !0, configurable: !0, writable: !0, value: n }) : e[t] = n, oe = (e, t, n) => Ic(e, typeof t != "symbol" ? t + "" : t, n);
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
], ha = Hc();
function nn(e, t = !0) {
  return t && (e = e.toUpperCase()), e in ha ? ha[e] : 0;
}
function ko(e) {
  return nn(e) > 0;
}
function Ac(e) {
  const t = typeof e == "string" ? nn(e) : e;
  return t >= 40 && t <= 66;
}
function Dc(e) {
  return (typeof e == "string" ? nn(e) : e) <= 39;
}
function _i(e) {
  return e <= 66;
}
function Bc(e) {
  const t = typeof e == "string" ? nn(e) : e;
  return Ai(t) && !_i(t);
}
function* jc() {
  for (let e = 1; e <= Mt.length; e++)
    yield e;
}
const Lc = 1, Mi = Mt.length;
function Vc() {
  return ["XXA", "XXB", "XXC", "XXD", "XXE", "XXF", "XXG"];
}
function To(e, t = "***") {
  const n = e - 1;
  return n < 0 || n >= Mt.length ? t : Mt[n];
}
function Ii(e) {
  return e <= 0 || e > Mi ? "******" : $i[e - 1];
}
function Fc(e) {
  return Ii(nn(e));
}
function Ai(e) {
  const t = typeof e == "number" ? To(e) : e;
  return ko(t) && !Eo.includes(t);
}
function zc(e) {
  const t = typeof e == "number" ? To(e) : e;
  return ko(t) && Eo.includes(t);
}
function Uc(e) {
  return $i[e - 1].includes("*obsolete*");
}
function Hc() {
  const e = {};
  for (let t = 0; t < Mt.length; t++)
    e[Mt[t]] = t + 1;
  return e;
}
const me = {
  allBookIds: Mt,
  nonCanonicalIds: Eo,
  bookIdToNumber: nn,
  isBookIdValid: ko,
  isBookNT: Ac,
  isBookOT: Dc,
  isBookOTNT: _i,
  isBookDC: Bc,
  allBookNumbers: jc,
  firstBook: Lc,
  lastBook: Mi,
  extraBooks: Vc,
  bookNumberToId: To,
  bookNumberToEnglishName: Ii,
  bookIdToEnglishName: Fc,
  isCanonical: Ai,
  isExtraMaterial: zc,
  isObsolete: Uc
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
  const n = t[0];
  for (let r = 1; r < t.length; r++)
    e = e.split(t[r]).join(n);
  return e.split(n);
}
var Di = /* @__PURE__ */ ((e) => (e[e.Valid = 0] = "Valid", e[e.UnknownVersification = 1] = "UnknownVersification", e[e.OutOfRange = 2] = "OutOfRange", e[e.VerseOutOfOrder = 3] = "VerseOutOfOrder", e[e.VerseRepeated = 4] = "VerseRepeated", e))(Di || {});
const _e = class ce {
  constructor(t, n, r, o) {
    if (oe(this, "firstChapter"), oe(this, "lastChapter"), oe(this, "lastVerse"), oe(this, "hasSegmentsDefined"), oe(this, "text"), oe(this, "BBBCCCVVVS"), oe(this, "longHashCode"), oe(this, "versification"), oe(this, "rtlMark", "‏"), oe(this, "_bookNum", 0), oe(this, "_chapterNum", 0), oe(this, "_verseNum", 0), oe(this, "_verse"), r == null && o == null)
      if (t != null && typeof t == "string") {
        const a = t, i = n != null && n instanceof Nt ? n : void 0;
        this.setEmpty(i), this.parse(a);
      } else if (t != null && typeof t == "number") {
        const a = n != null && n instanceof Nt ? n : void 0;
        this.setEmpty(a), this._verseNum = t % ce.chapterDigitShifter, this._chapterNum = Math.floor(
          t % ce.bookDigitShifter / ce.chapterDigitShifter
        ), this._bookNum = Math.floor(t / ce.bookDigitShifter);
      } else if (n == null)
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
    else if (t != null && n != null && r != null)
      if (typeof t == "string" && typeof n == "string" && typeof r == "string")
        this.setEmpty(o), this.updateInternal(t, n, r);
      else if (typeof t == "number" && typeof n == "number" && typeof r == "number")
        this._bookNum = t, this._chapterNum = n, this._verseNum = r, this.versification = o ?? ce.defaultVersification;
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
      return n = new ce(t), { success: !0, verseRef: n };
    } catch (r) {
      if (r instanceof pn)
        return n = new ce(), { success: !1, verseRef: n };
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
    return t % ce.bcvMaxValue * ce.bookDigitShifter + (n >= 0 ? n % ce.bcvMaxValue * ce.chapterDigitShifter : 0) + (r >= 0 ? r % ce.bcvMaxValue : 0);
  }
  /**
   * Deserializes a serialized VerseRef.
   * @param serializedVerseRef - Serialized VerseRef to create from.
   * @returns the deserialized VerseRef.
   */
  static fromJSON(t) {
    const { book: n, chapterNum: r, verseNum: o, verse: a, versificationStr: i } = t, l = a || o.toString();
    let c;
    return i && (c = new Nt(i)), n ? new ce(n, r.toString(), l, c) : new ce();
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
      if (n = n * 10 + +r - 0, n > ce.bcvMaxValue)
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
    const { success: n, vNum: r } = ce.tryGetVerseNum(t);
    this._verse = n ? void 0 : t.replace(this.rtlMark, ""), this._verseNum = r, !(this._verseNum >= 0) && ({ vNum: this._verseNum } = ce.tryGetVerseNum(this._verse));
  }
  /**
   * Get or set Book based on book number, e.g. `42`.
   */
  get bookNum() {
    return this._bookNum;
  }
  set bookNum(t) {
    if (t <= 0 || t > me.lastBook)
      throw new pn(
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
          throw new pn("Invalid reference : " + t);
        }
    }
    const n = t.trim().split(" ");
    if (n.length !== 2)
      throw new pn("Invalid reference : " + t);
    const r = n[1].split(":"), o = +r[0];
    if (r.length !== 2 || me.bookIdToNumber(n[0]) === 0 || !Number.isInteger(o) || o < 0 || !ce.isVerseParseable(r[1]))
      throw new pn("Invalid reference : " + t);
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
    return new ce(this);
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
  allVerses(t = !1, n = ce.verseRangeSeparators, r = ce.verseSequenceIndicators) {
    if (this._verse == null || this.chapterNum <= 0)
      return [this.clone()];
    const o = [], a = ga(this._verse, r);
    for (const i of a.map((l) => ga(l, n))) {
      const l = this.clone();
      l.verse = i[0];
      const c = l.verseNum;
      if (o.push(l), i.length > 1) {
        const d = this.clone();
        if (d.verse = i[1], !t)
          for (let f = c + 1; f < d.verseNum; f++) {
            const v = new ce(
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
    return this.versification == null ? 1 : this._bookNum <= 0 || this._bookNum > me.lastBook ? 2 : (me.isCanonical(this._bookNum), 0);
  }
  setEmpty(t = ce.defaultVersification) {
    this._bookNum = 0, this._chapterNum = -1, this._verse = void 0, this.versification = t;
  }
  updateInternal(t, n, r) {
    this.bookNum = me.bookIdToNumber(t), this.chapter = n, this.verse = r;
  }
};
oe(_e, "defaultVersification", Nt.English), oe(_e, "verseRangeSeparator", "-"), oe(_e, "verseSequenceIndicator", ","), oe(_e, "verseRangeSeparators", [_e.verseRangeSeparator]), oe(_e, "verseSequenceIndicators", [_e.verseSequenceIndicator]), oe(_e, "chapterDigitShifter", 1e3), oe(_e, "bookDigitShifter", _e.chapterDigitShifter * _e.chapterDigitShifter), oe(_e, "bcvMaxValue", _e.chapterDigitShifter - 1), /**
* The valid status of the VerseRef.
*/
oe(_e, "ValidStatusType", Di);
let pn = class extends Error {
};
const Bi = ge.Root, Gc = ge.Trigger, wv = ge.Group, xv = ge.Portal, Ev = ge.Sub, kv = ge.RadioGroup, Wc = G.forwardRef(({ className: e, inset: t, children: n, ...r }, o) => /* @__PURE__ */ D(
  ge.SubTrigger,
  {
    ref: o,
    className: L(
      "pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none focus:pr-bg-accent data-[state=open]:pr-bg-accent",
      t && "pr-pl-8",
      e
    ),
    ...r,
    children: [
      n,
      /* @__PURE__ */ m(Fl, { className: "pr-ml-auto pr-h-4 pr-w-4" })
    ]
  }
));
Wc.displayName = ge.SubTrigger.displayName;
const Xc = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  ge.SubContent,
  {
    ref: n,
    className: L(
      "pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-lg data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...t
  }
));
Xc.displayName = ge.SubContent.displayName;
const No = G.forwardRef(({ className: e, sideOffset: t = 4, ...n }, r) => /* @__PURE__ */ m(ge.Portal, { children: /* @__PURE__ */ m(
  ge.Content,
  {
    ref: r,
    sideOffset: t,
    className: L(
      /* adding pr-twp because the dropdown content is added to the dom as a sibling to the app root */
      "pr-twp pr-z-50 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-p-1 pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...n
  }
) }));
No.displayName = ge.Content.displayName;
const ji = G.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ m(
  ge.Item,
  {
    ref: r,
    className: L(
      // removed: pr-relative pr-flex focus:pr-text-accent-foreground
      "pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      t && "pr-pl-8",
      e
    ),
    ...n
  }
));
ji.displayName = ge.Item.displayName;
const Li = G.forwardRef(({ className: e, children: t, checked: n, ...r }, o) => /* @__PURE__ */ D(
  ge.CheckboxItem,
  {
    ref: o,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    checked: n,
    ...r,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(ge.ItemIndicator, { children: /* @__PURE__ */ m(wo, { className: "pr-h-4 pr-w-4" }) }) }),
      t
    ]
  }
));
Li.displayName = ge.CheckboxItem.displayName;
const qc = G.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ D(
  ge.RadioItem,
  {
    ref: r,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none pr-transition-colors focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(ge.ItemIndicator, { children: /* @__PURE__ */ m(zl, { className: "pr-h-2 pr-w-2 pr-fill-current" }) }) }),
      t
    ]
  }
));
qc.displayName = ge.RadioItem.displayName;
const br = G.forwardRef(({ className: e, inset: t, ...n }, r) => /* @__PURE__ */ m(
  ge.Label,
  {
    ref: r,
    className: L("pr-px-2 pr-py-1.5 pr-text-sm pr-font-semibold", t && "pr-pl-8", e),
    ...n
  }
));
br.displayName = ge.Label.displayName;
const Co = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  ge.Separator,
  {
    ref: n,
    className: L("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
Co.displayName = ge.Separator.displayName;
function Yc({ className: e, ...t }) {
  return /* @__PURE__ */ m(
    "span",
    {
      className: L("pr-ml-auto pr-text-xs pr-tracking-widest pr-opacity-60", e),
      ...t
    }
  );
}
Yc.displayName = "DropdownMenuShortcut";
const Kc = xi(
  ({
    bookId: e,
    handleSelectBook: t,
    isSelected: n,
    handleHighlightBook: r,
    handleKeyDown: o,
    bookType: a,
    children: i
  }, l) => /* @__PURE__ */ D(
    ji,
    {
      ref: l,
      textValue: e,
      className: L("pr-font-normal pr-text-slate-700", {
        // Overriding `data-[highlighted]` changes the default gray background that is normally shown on hover
        "pr-bg-amber-50 pr-text-yellow-900 data-[highlighted]:pr-bg-amber-100": n
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
        /* @__PURE__ */ m(
          "span",
          {
            className: L(
              "pr-border-b-0 pr-border-l-2 pr-border-r-0 pr-border-t-0 pr-border-solid pr-px-2",
              {
                "pr-font-bold": n,
                "pr-border-l-red-200": a.toLowerCase() === "ot",
                "pr-border-l-purple-200": a.toLowerCase() === "nt",
                "pr-border-l-indigo-200": a.toLowerCase() === "dc"
              }
            ),
            children: me.bookIdToEnglishName(e)
          }
        ),
        n && /* @__PURE__ */ m("div", { children: i })
      ]
    },
    e
  )
);
function Jc({
  handleSelectChapter: e,
  endChapter: t,
  activeChapter: n,
  highlightedChapter: r,
  handleHighlightedChapter: o
}) {
  const a = Array.from({ length: t }, (l, c) => c + 1), i = Ce(
    (l) => {
      o(l);
    },
    [o]
  );
  return /* @__PURE__ */ m("div", { className: L("pr-flex pr-flex-wrap pr-items-start pr-justify-start pr-self-stretch"), children: a.map((l) => /* @__PURE__ */ m(
    "div",
    {
      className: L(
        "pr-flex pr-h-4 pr-w-4 pr-cursor-pointer pr-items-center pr-justify-end pr-rounded-md pr-p-2 pr-text-amber-800",
        {
          "pr-font-semibold pr-text-amber-900": l === n,
          "pr-bg-amber-200": l === r
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
function Zc({ handleSort: e, handleLocationHistory: t, handleBookmarks: n }) {
  return /* @__PURE__ */ D(br, { className: "pr-flex pr-justify-between", children: [
    /* @__PURE__ */ m("p", { className: "pr-inline-block pr-align-middle", children: "Go To" }),
    /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center", children: [
      /* @__PURE__ */ m(
        Ul,
        {
          onClick: e,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        Hl,
        {
          onClick: t,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      ),
      /* @__PURE__ */ m(
        Gl,
        {
          onClick: n,
          className: "pr-h-4 pr-w-4 pr-cursor-pointer pr-gap-2 pr-p-2"
        }
      )
    ] })
  ] });
}
const En = me.allBookIds, Qc = {
  OT: "Old Testament",
  NT: "New Testament",
  DC: "Deuterocanon"
}, ba = ["OT", "NT", "DC"], ep = 32 + 32 + 32, tp = [
  /^(\w+)$/i,
  // Matches a single word (book name or id)
  /^(\w+)(?:\s(\d+))$/i,
  // Matches a word followed by a chapter number
  /^(\w+)(?:\s(\d+):(\d+))$/i
  // Matches a word followed by a chapter and verse number
], np = (e) => ({
  OT: En.filter((n) => me.isBookOT(n)),
  NT: En.filter((n) => me.isBookNT(n)),
  DC: En.filter((n) => me.isBookDC(n))
})[e], dn = (e) => lc(me.bookIdToNumber(e));
function rp() {
  return En.map((t) => me.bookIdToEnglishName(t));
}
function op(e) {
  return rp().includes(e);
}
function ap(e) {
  const t = e.toLowerCase().replace(/^\w/, (n) => n.toUpperCase());
  if (op(t))
    return En.find((r) => me.bookIdToEnglishName(r) === t);
}
function Tv({ scrRef: e, handleSubmit: t }) {
  const [n, r] = ie(""), [o, a] = ie(
    me.bookNumberToId(e.bookNum)
  ), [i, l] = ie(e.chapterNum ?? 0), [c, d] = ie(
    me.bookNumberToId(e.bookNum)
  ), [f, v] = ie(!1), [g, p] = ie(f), h = $t(void 0), u = $t(void 0), b = $t(void 0), x = Ce(
    (k) => np(k).filter((S) => {
      const $ = me.bookIdToEnglishName(S).toLowerCase(), F = n.replace(/[^a-zA-Z]/g, "").toLowerCase();
      return $.includes(F) || // Match book name
      S.toLowerCase().includes(F);
    }),
    [n]
  ), P = (k) => {
    r(k);
  }, w = $t(!1), E = Ce((k) => {
    if (w.current) {
      w.current = !1;
      return;
    }
    v(k);
  }, []), y = Ce(
    (k, S, $, F) => {
      if (l(
        me.bookNumberToId(e.bookNum) !== k ? 1 : e.chapterNum
      ), S || dn(k) === -1) {
        t({
          bookNum: me.bookIdToNumber(k),
          chapterNum: $ || 1,
          verseNum: F || 1
        }), v(!1), r("");
        return;
      }
      a(o !== k ? k : ""), v(!S);
    },
    [t, e.bookNum, e.chapterNum, o]
  ), C = (k) => {
    k <= 0 || k > dn(o) || y(o, !0, k);
  }, N = Ce(() => {
    tp.forEach((k) => {
      const S = n.match(k);
      if (S) {
        const [$, F = void 0, H = void 0] = S.slice(1), _ = ap($);
        (me.isBookIdValid($) || _) && y(
          _ ?? $,
          !0,
          F ? parseInt(F, 10) : 1,
          H ? parseInt(H, 10) : 1
        );
      }
    });
  }, [y, n]), I = Ce(
    (k) => {
      f ? (k.key === "ArrowDown" || k.key === "ArrowUp") && (typeof b < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      b.current !== null ? b.current.focus() : typeof u < "u" && // Ref uses null
      // eslint-disable-next-line no-null/no-null
      u.current !== null && u.current.focus(), k.preventDefault()) : v(!0);
    },
    [f]
  ), B = (k) => {
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
        if (i < dn(c))
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
      i + $ <= 0 || i + $ > dn(c) ? l(0) : $ !== 0 && (l(i + $), k.preventDefault());
    }
  };
  return Fe(() => {
    o === c ? o === me.bookNumberToId(e.bookNum) ? l(e.chapterNum) : l(1) : l(0);
  }, [c, e.bookNum, e.chapterNum, o]), pa(() => {
    p(f);
  }, [f]), pa(() => {
    const k = setTimeout(() => {
      if (g && u.current && b.current) {
        const $ = b.current.offsetTop - ep;
        u.current.scrollTo({ top: $, behavior: "instant" });
      }
    }, 10);
    return () => {
      clearTimeout(k);
    };
  }, [g]), /* @__PURE__ */ m("div", { className: "pr-flex", children: /* @__PURE__ */ D(Bi, { modal: !1, open: f, onOpenChange: E, children: [
    /* @__PURE__ */ m(Gc, { asChild: !0, children: /* @__PURE__ */ m(
      _c,
      {
        ref: h,
        value: n,
        handleSearch: P,
        handleKeyDown: I,
        handleOnClick: () => {
          a(me.bookNumberToId(e.bookNum)), d(me.bookNumberToId(e.bookNum)), l(e.chapterNum > 0 ? e.chapterNum : 0), v(!0), h.current.focus();
        },
        onFocus: () => {
          w.current = !0;
        },
        handleSubmit: N,
        placeholder: `${me.bookNumberToEnglishName(e.bookNum)} ${e.chapterNum}:${e.verseNum}`
      }
    ) }),
    /* @__PURE__ */ D(
      No,
      {
        className: "pr-overflow-y-auto pr-font-normal pr-text-slate-700",
        style: { width: "233px", maxHeight: "500px" },
        onKeyDown: B,
        align: "start",
        ref: u,
        children: [
          /* @__PURE__ */ m(
            Zc,
            {
              handleSort: () => console.log("sorting"),
              handleLocationHistory: () => console.log("location history"),
              handleBookmarks: () => console.log("bookmarks")
            }
          ),
          ba.map(
            (k, S) => x(k).length > 0 && /* @__PURE__ */ D("div", { children: [
              /* @__PURE__ */ m(br, { className: "pr-font-semibold pr-text-slate-700", children: Qc[k] }),
              x(k).map(($) => /* @__PURE__ */ m("div", { children: /* @__PURE__ */ m(
                Kc,
                {
                  bookId: $,
                  handleSelectBook: () => y($, !1),
                  isSelected: o === $,
                  handleHighlightBook: () => d($),
                  handleKeyDown: V,
                  bookType: k,
                  ref: (F) => {
                    o === $ && (b.current = F);
                  },
                  children: /* @__PURE__ */ m(
                    Jc,
                    {
                      handleSelectChapter: C,
                      endChapter: dn($),
                      activeChapter: e.bookNum === me.bookIdToNumber($) ? e.chapterNum : 0,
                      highlightedChapter: i,
                      handleHighlightedChapter: (F) => {
                        l(F);
                      }
                    }
                  )
                }
              ) }, $)),
              ba.length - 1 !== S ? /* @__PURE__ */ m(Co, {}) : void 0
            ] }, k)
          )
        ]
      }
    )
  ] }) });
}
const ip = xo(
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
  ({ className: e, variant: t, size: n, asChild: r = !1, ...o }, a) => /* @__PURE__ */ m(r ? mc : "button", { className: L(ip({ variant: t, size: n, className: e })), ref: a, ...o })
);
we.displayName = "Button";
function sp({ table: e }) {
  return /* @__PURE__ */ D(Bi, { children: [
    /* @__PURE__ */ m(sc, { asChild: !0, children: /* @__PURE__ */ D(we, { variant: "outline", size: "sm", className: "pr-ml-auto pr-hidden pr-h-8 lg:pr-flex", children: [
      /* @__PURE__ */ m(Wl, { className: "pr-mr-2 pr-h-4 pr-w-4" }),
      "View"
    ] }) }),
    /* @__PURE__ */ D(No, { align: "end", className: "pr-w-[150px]", children: [
      /* @__PURE__ */ m(br, { children: "Toggle columns" }),
      /* @__PURE__ */ m(Co, {}),
      e.getAllColumns().filter((t) => t.getCanHide()).map((t) => /* @__PURE__ */ m(
        Li,
        {
          className: "pr-capitalize",
          checked: t.getIsVisible(),
          onCheckedChange: (n) => t.toggleVisibility(!!n),
          children: t.id
        },
        t.id
      ))
    ] })
  ] });
}
const ar = xe.Root, lp = xe.Group, ir = xe.Value, On = G.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ D(
  xe.Trigger,
  {
    ref: r,
    className: L(
      "pr-flex pr-h-10 pr-w-full pr-items-center pr-justify-between pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background placeholder:pr-text-muted-foreground focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50 [&>span]:pr-line-clamp-1",
      e
    ),
    ...n,
    children: [
      t,
      /* @__PURE__ */ m(xe.Icon, { asChild: !0, children: /* @__PURE__ */ m(Ei, { className: "pr-h-4 pr-w-4 pr-opacity-50" }) })
    ]
  }
));
On.displayName = xe.Trigger.displayName;
const Vi = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  xe.ScrollUpButton,
  {
    ref: n,
    className: L("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(Xl, { className: "pr-h-4 pr-w-4" })
  }
));
Vi.displayName = xe.ScrollUpButton.displayName;
const Fi = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  xe.ScrollDownButton,
  {
    ref: n,
    className: L("pr-flex pr-cursor-default pr-items-center pr-justify-center pr-py-1", e),
    ...t,
    children: /* @__PURE__ */ m(Ei, { className: "pr-h-4 pr-w-4" })
  }
));
Fi.displayName = xe.ScrollDownButton.displayName;
const Rn = G.forwardRef(({ className: e, children: t, position: n = "popper", ...r }, o) => /* @__PURE__ */ m(xe.Portal, { children: /* @__PURE__ */ D(
  xe.Content,
  {
    ref: o,
    className: L(
      "pr-twp pr-relative pr-z-50 pr-max-h-96 pr-min-w-[8rem] pr-overflow-hidden pr-rounded-md pr-border pr-bg-popover pr-text-popover-foreground pr-shadow-md data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      n === "popper" && "data-[side=bottom]:pr-translate-y-1 data-[side=left]:pr--translate-x-1 data-[side=right]:pr-translate-x-1 data-[side=top]:pr--translate-y-1",
      e
    ),
    position: n,
    ...r,
    children: [
      /* @__PURE__ */ m(Vi, {}),
      /* @__PURE__ */ m(
        xe.Viewport,
        {
          className: L(
            "pr-p-1",
            n === "popper" && "pr-h-[var(--radix-select-trigger-height)] pr-w-full pr-min-w-[var(--radix-select-trigger-width)]"
          ),
          children: t
        }
      ),
      /* @__PURE__ */ m(Fi, {})
    ]
  }
) }));
Rn.displayName = xe.Content.displayName;
const cp = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  xe.Label,
  {
    ref: n,
    className: L("pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-font-semibold", e),
    ...t
  }
));
cp.displayName = xe.Label.displayName;
const Ke = G.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ D(
  xe.Item,
  {
    ref: r,
    className: L(
      "pr-relative pr-flex pr-w-full pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-py-1.5 pr-pl-8 pr-pr-2 pr-text-sm pr-outline-none focus:pr-bg-accent focus:pr-text-accent-foreground data-[disabled]:pr-pointer-events-none data-[disabled]:pr-opacity-50",
      e
    ),
    ...n,
    children: [
      /* @__PURE__ */ m("span", { className: "pr-absolute pr-left-2 pr-flex pr-h-3.5 pr-w-3.5 pr-items-center pr-justify-center", children: /* @__PURE__ */ m(xe.ItemIndicator, { children: /* @__PURE__ */ m(wo, { className: "pr-h-4 pr-w-4" }) }) }),
      /* @__PURE__ */ m(xe.ItemText, { children: t })
    ]
  }
));
Ke.displayName = xe.Item.displayName;
const pp = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  xe.Separator,
  {
    ref: n,
    className: L("pr--mx-1 pr-my-1 pr-h-px pr-bg-muted", e),
    ...t
  }
));
pp.displayName = xe.Separator.displayName;
function dp({ table: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-flex pr-items-center pr-justify-between pr-px-2 pr-pb-3 pr-pt-3", children: /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center pr-space-x-6 lg:pr-space-x-8", children: [
    /* @__PURE__ */ D("div", { className: "pr-flex-1 pr-text-sm pr-text-muted-foreground", children: [
      e.getFilteredSelectedRowModel().rows.length,
      " of",
      " ",
      e.getFilteredRowModel().rows.length,
      " row(s) selected"
    ] }),
    /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ m("p", { className: "pr-text-nowrap pr-text-sm pr-font-medium", children: "Rows per page" }),
      /* @__PURE__ */ D(
        ar,
        {
          value: `${e.getState().pagination.pageSize}`,
          onValueChange: (t) => {
            e.setPageSize(Number(t));
          },
          children: [
            /* @__PURE__ */ m(On, { className: "pr-h-8 pr-w-[70px]", children: /* @__PURE__ */ m(ir, { placeholder: e.getState().pagination.pageSize }) }),
            /* @__PURE__ */ m(Rn, { side: "top", children: [10, 20, 30, 40, 50].map((t) => /* @__PURE__ */ m(Ke, { value: `${t}`, children: t }, t)) })
          ]
        }
      )
    ] }),
    /* @__PURE__ */ D("div", { className: "pr-flex pr-w-[100px] pr-items-center pr-justify-center pr-text-sm pr-font-medium", children: [
      "Page ",
      e.getState().pagination.pageIndex + 1,
      " of ",
      e.getPageCount()
    ] }),
    /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center pr-space-x-2", children: [
      /* @__PURE__ */ D(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(0),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to first page" }),
            /* @__PURE__ */ m(ql, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ D(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.previousPage(),
          disabled: !e.getCanPreviousPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to previous page" }),
            /* @__PURE__ */ m(Yl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ D(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-h-8 pr-w-8 pr-p-0",
          onClick: () => e.nextPage(),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to next page" }),
            /* @__PURE__ */ m(Kl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      ),
      /* @__PURE__ */ D(
        we,
        {
          variant: "outline",
          size: "icon",
          className: "pr-hidden pr-h-8 pr-w-8 pr-p-0 lg:pr-flex",
          onClick: () => e.setPageIndex(e.getPageCount() - 1),
          disabled: !e.getCanNextPage(),
          children: [
            /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Go to last page" }),
            /* @__PURE__ */ m(Jl, { className: "pr-h-4 pr-w-4" })
          ]
        }
      )
    ] })
  ] }) });
}
const vr = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { className: "pr-relative pr-w-full pr-overflow-auto", children: /* @__PURE__ */ m(
    "table",
    {
      ref: n,
      className: L("pr-w-full pr-caption-bottom pr-text-sm", e),
      ...t
    }
  ) })
);
vr.displayName = "Table";
const yr = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("thead", { ref: n, className: L("[&_tr]:pr-border-b", e), ...t }));
yr.displayName = "TableHeader";
const wr = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("tbody", { ref: n, className: L("[&_tr:last-child]:pr-border-0", e), ...t }));
wr.displayName = "TableBody";
const up = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "tfoot",
  {
    ref: n,
    className: L("pr-border-t pr-bg-muted/50 pr-font-medium [&>tr]:last:pr-border-b-0", e),
    ...t
  }
));
up.displayName = "TableFooter";
const vt = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "tr",
    {
      ref: n,
      className: L(
        "pr-border-b pr-transition-colors hover:pr-bg-muted/50 data-[state=selected]:pr-bg-muted",
        e
      ),
      ...t
    }
  )
);
vt.displayName = "TableRow";
const Pn = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "th",
  {
    ref: n,
    className: L(
      "pr-h-12 pr-px-4 pr-text-left pr-align-middle pr-font-medium pr-text-muted-foreground [&:has([role=checkbox])]:pr-pr-0",
      e
    ),
    ...t
  }
));
Pn.displayName = "TableHead";
const Yt = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "td",
  {
    ref: n,
    className: L("pr-p-4 pr-align-middle [&:has([role=checkbox])]:pr-pr-0", e),
    ...t
  }
));
Yt.displayName = "TableCell";
const fp = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  "caption",
  {
    ref: n,
    className: L("pr-mt-4 pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
fp.displayName = "TableCaption";
function mp({
  columns: e,
  data: t,
  enablePagination: n = !1,
  showPaginationControls: r = !1,
  showColumnVisibilityControls: o = !1,
  onRowClickHandler: a = () => {
  }
}) {
  var u;
  const [i, l] = ie([]), [c, d] = ie([]), [f, v] = ie({}), [g, p] = ie({}), h = ki({
    data: t,
    columns: e,
    getCoreRowModel: Ti(),
    ...n && { getPaginationRowModel: pc() },
    onSortingChange: l,
    getSortedRowModel: Ni(),
    onColumnFiltersChange: d,
    getFilteredRowModel: dc(),
    onColumnVisibilityChange: v,
    onRowSelectionChange: p,
    state: {
      sorting: i,
      columnFilters: c,
      columnVisibility: f,
      rowSelection: g
    }
  });
  return /* @__PURE__ */ D("div", { children: [
    o && /* @__PURE__ */ m(sp, { table: h }),
    /* @__PURE__ */ m("div", { className: "pr-twp pr-font-sans", children: /* @__PURE__ */ D(vr, { children: [
      /* @__PURE__ */ m(yr, { children: h.getHeaderGroups().map((b) => /* @__PURE__ */ m(vt, { children: b.headers.map((x) => /* @__PURE__ */ m(Pn, { children: x.isPlaceholder ? void 0 : xn(x.column.columnDef.header, x.getContext()) }, x.id)) }, b.id)) }),
      /* @__PURE__ */ m(wr, { children: (u = h.getRowModel().rows) != null && u.length ? h.getRowModel().rows.map((b) => /* @__PURE__ */ m(
        vt,
        {
          onClick: () => a(b, h),
          "data-state": b.getIsSelected() && "selected",
          children: b.getVisibleCells().map((x) => /* @__PURE__ */ m(Yt, { children: xn(x.column.columnDef.cell, x.getContext()) }, x.id))
        },
        b.id
      )) : /* @__PURE__ */ m(vt, { children: /* @__PURE__ */ m(Yt, { colSpan: e.length, className: "pr-h-24 pr-text-center", children: "No results." }) }) })
    ] }) }),
    n && /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center pr-justify-end pr-space-x-2 pr-py-4", children: [
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
    n && r && /* @__PURE__ */ m(dp, { table: h })
  ] });
}
const hp = Sn.Root, gp = Sn.Trigger, zi = G.forwardRef(({ className: e, align: t = "center", sideOffset: n = 4, ...r }, o) => /* @__PURE__ */ m(Sn.Portal, { children: /* @__PURE__ */ m(
  Sn.Content,
  {
    ref: o,
    align: t,
    sideOffset: n,
    className: L(
      "pr-twp pr-z-50 pr-w-72 pr-rounded-md pr-border pr-bg-popover pr-p-4 pr-text-popover-foreground pr-shadow-md pr-outline-none data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[side=bottom]:pr-slide-in-from-top-2 data-[side=left]:pr-slide-in-from-right-2 data-[side=right]:pr-slide-in-from-left-2 data-[side=top]:pr-slide-in-from-bottom-2",
      e
    ),
    ...r
  }
) }));
zi.displayName = Sn.Content.displayName;
const bp = Qe.Portal, Ui = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Qe.Overlay,
  {
    ref: n,
    className: L(
      "pr- pr-fixed pr-inset-0 pr-z-50 pr-bg-black/80 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0",
      e
    ),
    ...t
  }
));
Ui.displayName = Qe.Overlay.displayName;
const vp = G.forwardRef(({ className: e, children: t, ...n }, r) => /* @__PURE__ */ D(bp, { children: [
  /* @__PURE__ */ m(Ui, {}),
  /* @__PURE__ */ D(
    Qe.Content,
    {
      ref: r,
      className: L(
        "pr-fixed pr-left-[50%] pr-top-[50%] pr-z-50 pr-grid pr-w-full pr-max-w-lg pr-translate-x-[-50%] pr-translate-y-[-50%] pr-gap-4 pr-border pr-bg-background pr-p-6 pr-shadow-lg pr-duration-200 data-[state=open]:pr-animate-in data-[state=closed]:pr-animate-out data-[state=closed]:pr-fade-out-0 data-[state=open]:pr-fade-in-0 data-[state=closed]:pr-zoom-out-95 data-[state=open]:pr-zoom-in-95 data-[state=closed]:pr-slide-out-to-left-1/2 data-[state=closed]:pr-slide-out-to-top-[48%] data-[state=open]:pr-slide-in-from-left-1/2 data-[state=open]:pr-slide-in-from-top-[48%] sm:pr-rounded-lg",
        e
      ),
      ...n,
      children: [
        t,
        /* @__PURE__ */ D(Qe.Close, { className: "pr-absolute pr-right-4 pr-top-4 pr-rounded-sm pr-opacity-70 pr-ring-offset-background pr-transition-opacity hover:pr-opacity-100 focus:pr-outline-none focus:pr-ring-2 focus:pr-ring-ring focus:pr-ring-offset-2 disabled:pr-pointer-events-none data-[state=open]:pr-bg-accent data-[state=open]:pr-text-muted-foreground", children: [
          /* @__PURE__ */ m(Zl, { className: "pr-h-4 pr-w-4" }),
          /* @__PURE__ */ m("span", { className: "pr-sr-only", children: "Close" })
        ] })
      ]
    }
  )
] }));
vp.displayName = Qe.Content.displayName;
const yp = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Qe.Title,
  {
    ref: n,
    className: L("pr-text-lg pr-font-semibold pr-leading-none pr-tracking-tight", e),
    ...t
  }
));
yp.displayName = Qe.Title.displayName;
const wp = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Qe.Description,
  {
    ref: n,
    className: L("pr-text-sm pr-text-muted-foreground", e),
    ...t
  }
));
wp.displayName = Qe.Description.displayName;
const Hi = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae,
  {
    ref: n,
    className: L(
      "pr-flex pr-h-full pr-w-full pr-flex-col pr-overflow-hidden pr-rounded-md pr-bg-popover pr-text-popover-foreground",
      e
    ),
    ...t
  }
));
Hi.displayName = Ae.displayName;
const Gi = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center pr-border-b pr-px-3", children: [
  /* @__PURE__ */ m(Ql, { className: "pr-mr-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" }),
  /* @__PURE__ */ m(
    Ae.Input,
    {
      ref: n,
      className: L(
        "pr-flex pr-h-11 pr-w-full pr-rounded-md pr-bg-transparent pr-py-3 pr-text-sm pr-outline-none placeholder:pr-text-muted-foreground disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        e
      ),
      ...t
    }
  )
] }));
Gi.displayName = Ae.Input.displayName;
const Wi = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.List,
  {
    ref: n,
    className: L("pr-max-h-[300px] pr-overflow-y-auto pr-overflow-x-hidden", e),
    ...t
  }
));
Wi.displayName = Ae.List.displayName;
const Xi = G.forwardRef((e, t) => /* @__PURE__ */ m(Ae.Empty, { ref: t, className: "pr-py-6 pr-text-center pr-text-sm", ...e }));
Xi.displayName = Ae.Empty.displayName;
const xp = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Group,
  {
    ref: n,
    className: L(
      "pr-overflow-hidden pr-p-1 pr-text-foreground [&_[cmdk-group-heading]]:pr-px-2 [&_[cmdk-group-heading]]:pr-py-1.5 [&_[cmdk-group-heading]]:pr-text-xs [&_[cmdk-group-heading]]:pr-font-medium [&_[cmdk-group-heading]]:pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
xp.displayName = Ae.Group.displayName;
const Ep = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Separator,
  {
    ref: n,
    className: L("pr--mx-1 pr-h-px pr-bg-border", e),
    ...t
  }
));
Ep.displayName = Ae.Separator.displayName;
const qi = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  Ae.Item,
  {
    ref: n,
    className: L(
      "pr-relative pr-flex pr-cursor-default pr-select-none pr-items-center pr-rounded-sm pr-px-2 pr-py-1.5 pr-text-sm pr-outline-none data-[disabled=true]:pr-pointer-events-none data-[selected=true]:pr-bg-accent data-[selected=true]:pr-text-accent-foreground data-[disabled=true]:pr-opacity-50",
      e
    ),
    ...t
  }
));
qi.displayName = Ae.Item.displayName;
function kp(e) {
  return typeof e == "string" ? e : typeof e == "number" ? e.toString() : e.label;
}
function va({
  id: e,
  options: t = [],
  className: n,
  value: r,
  onChange: o = () => {
  },
  getOptionLabel: a = kp,
  buttonPlaceholder: i = "",
  textPlaceholder: l = "",
  commandEmptyMessage: c = "No option found",
  buttonVariant: d = "outline"
}) {
  const [f, v] = ie(!1);
  return /* @__PURE__ */ D(hp, { open: f, onOpenChange: v, children: [
    /* @__PURE__ */ m(gp, { asChild: !0, children: /* @__PURE__ */ D(
      we,
      {
        variant: d,
        role: "combobox",
        "aria-expanded": f,
        id: e,
        className: L("pr-w-[200px] pr-justify-between", n),
        children: [
          r ? a(r) : i,
          /* @__PURE__ */ m(ec, { className: "pr-ml-2 pr-h-4 pr-w-4 pr-shrink-0 pr-opacity-50" })
        ]
      }
    ) }),
    /* @__PURE__ */ m(zi, { className: "pr-w-[200px] pr-p-0", children: /* @__PURE__ */ D(Hi, { children: [
      /* @__PURE__ */ m(Gi, { placeholder: l, className: "pr-text-inherit" }),
      /* @__PURE__ */ m(Xi, { children: c }),
      /* @__PURE__ */ m(Wi, { children: t.map((g) => /* @__PURE__ */ D(
        qi,
        {
          value: a(g),
          onSelect: () => {
            o(g), v(!1);
          },
          children: [
            /* @__PURE__ */ m(
              wo,
              {
                className: L("pr-mr-2 pr-h-4 pr-w-4", {
                  "pr-opacity-0": !r || a(r) !== a(g)
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
function Nv({
  handleSelectStartChapter: e,
  handleSelectEndChapter: t,
  isDisabled: n = !1,
  chapterCount: r
}) {
  const [o, a] = ie(1), [i, l] = ie(r), [c, d] = ie(
    Array.from({ length: r }, (g, p) => p + 1)
  );
  return Fe(() => {
    a(1), e(1), l(r), t(r), d(Array.from({ length: r }, (g, p) => p + 1));
  }, [r, t, e]), /* @__PURE__ */ D(yt, { children: [
    /* @__PURE__ */ m(
      ma,
      {
        className: "book-selection-chapter-form-label start",
        disabled: n,
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
        disabled: n,
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
function Tp({
  id: e,
  isChecked: t,
  labelText: n = "",
  labelPosition: r = Wt.After,
  isIndeterminate: o = !1,
  isDefaultChecked: a,
  isDisabled: i = !1,
  hasError: l = !1,
  className: c,
  onChange: d
}) {
  const f = /* @__PURE__ */ m(
    gc,
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
  if (n) {
    const g = r === Wt.Before || r === Wt.Above, p = /* @__PURE__ */ m("span", { className: `papi-checkbox-label ${l ? "error" : ""} ${c ?? ""}`, children: n }), h = r === Wt.Before || r === Wt.After, u = h ? p : /* @__PURE__ */ m("div", { children: p }), b = h ? f : /* @__PURE__ */ m("div", { children: f });
    v = /* @__PURE__ */ D(
      hc,
      {
        className: `papi-checkbox ${r.toString()}`,
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
function Cv({
  id: e,
  className: t,
  legend: n,
  listItems: r,
  selectedListItems: o,
  handleSelectListItem: a,
  createLabel: i
}) {
  return /* @__PURE__ */ D("fieldset", { id: e, className: t, children: [
    n && /* @__PURE__ */ m("legend", { children: n }),
    r.map((l) => /* @__PURE__ */ m(
      Tp,
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
function Np(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
function Cp(e) {
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
var So = {}, Yi = { exports: {} };
(function(e) {
  function t(n) {
    return n && n.__esModule ? n : {
      default: n
    };
  }
  e.exports = t, e.exports.__esModule = !0, e.exports.default = e.exports;
})(Yi);
var Sp = Yi.exports, Vr = {};
function rn(e, t) {
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
  return Object.keys(e).forEach((n) => {
    t[n] = Ki(e[n]);
  }), t;
}
function st(e, t, n = {
  clone: !0
}) {
  const r = n.clone ? R({}, e) : e;
  return Rt(e) && Rt(t) && Object.keys(t).forEach((o) => {
    o !== "__proto__" && (Rt(t[o]) && o in e && Rt(e[o]) ? r[o] = st(e[o], t[o], n) : n.clone ? r[o] = Rt(t[o]) ? Ki(t[o]) : t[o] : r[o] = t[o]);
  }), r;
}
var ao = { exports: {} }, qn = { exports: {} }, pe = {};
/** @license React v16.13.1
 * react-is.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ya;
function Op() {
  if (ya)
    return pe;
  ya = 1;
  var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
  function w(y) {
    if (typeof y == "object" && y !== null) {
      var C = y.$$typeof;
      switch (C) {
        case t:
          switch (y = y.type, y) {
            case c:
            case d:
            case r:
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
        case n:
          return C;
      }
    }
  }
  function E(y) {
    return w(y) === d;
  }
  return pe.AsyncMode = c, pe.ConcurrentMode = d, pe.ContextConsumer = l, pe.ContextProvider = i, pe.Element = t, pe.ForwardRef = f, pe.Fragment = r, pe.Lazy = h, pe.Memo = p, pe.Portal = n, pe.Profiler = a, pe.StrictMode = o, pe.Suspense = v, pe.isAsyncMode = function(y) {
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
    return w(y) === r;
  }, pe.isLazy = function(y) {
    return w(y) === h;
  }, pe.isMemo = function(y) {
    return w(y) === p;
  }, pe.isPortal = function(y) {
    return w(y) === n;
  }, pe.isProfiler = function(y) {
    return w(y) === a;
  }, pe.isStrictMode = function(y) {
    return w(y) === o;
  }, pe.isSuspense = function(y) {
    return w(y) === v;
  }, pe.isValidElementType = function(y) {
    return typeof y == "string" || typeof y == "function" || y === r || y === d || y === a || y === o || y === v || y === g || typeof y == "object" && y !== null && (y.$$typeof === h || y.$$typeof === p || y.$$typeof === i || y.$$typeof === l || y.$$typeof === f || y.$$typeof === b || y.$$typeof === x || y.$$typeof === P || y.$$typeof === u);
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
var wa;
function Rp() {
  return wa || (wa = 1, process.env.NODE_ENV !== "production" && function() {
    var e = typeof Symbol == "function" && Symbol.for, t = e ? Symbol.for("react.element") : 60103, n = e ? Symbol.for("react.portal") : 60106, r = e ? Symbol.for("react.fragment") : 60107, o = e ? Symbol.for("react.strict_mode") : 60108, a = e ? Symbol.for("react.profiler") : 60114, i = e ? Symbol.for("react.provider") : 60109, l = e ? Symbol.for("react.context") : 60110, c = e ? Symbol.for("react.async_mode") : 60111, d = e ? Symbol.for("react.concurrent_mode") : 60111, f = e ? Symbol.for("react.forward_ref") : 60112, v = e ? Symbol.for("react.suspense") : 60113, g = e ? Symbol.for("react.suspense_list") : 60120, p = e ? Symbol.for("react.memo") : 60115, h = e ? Symbol.for("react.lazy") : 60116, u = e ? Symbol.for("react.block") : 60121, b = e ? Symbol.for("react.fundamental") : 60117, x = e ? Symbol.for("react.responder") : 60118, P = e ? Symbol.for("react.scope") : 60119;
    function w(j) {
      return typeof j == "string" || typeof j == "function" || // Note: its typeof might be other than 'symbol' or 'number' if it's a polyfill.
      j === r || j === d || j === a || j === o || j === v || j === g || typeof j == "object" && j !== null && (j.$$typeof === h || j.$$typeof === p || j.$$typeof === i || j.$$typeof === l || j.$$typeof === f || j.$$typeof === b || j.$$typeof === x || j.$$typeof === P || j.$$typeof === u);
    }
    function E(j) {
      if (typeof j == "object" && j !== null) {
        var ne = j.$$typeof;
        switch (ne) {
          case t:
            var A = j.type;
            switch (A) {
              case c:
              case d:
              case r:
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
                    return ne;
                }
            }
          case n:
            return ne;
        }
      }
    }
    var y = c, C = d, N = l, I = i, B = t, V = f, k = r, S = h, $ = p, F = n, H = a, _ = o, z = v, te = !1;
    function Q(j) {
      return te || (te = !0, console.warn("The ReactIs.isAsyncMode() alias has been deprecated, and will be removed in React 17+. Update your code to use ReactIs.isConcurrentMode() instead. It has the exact same API.")), O(j) || E(j) === c;
    }
    function O(j) {
      return E(j) === d;
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
      return E(j) === r;
    }
    function K(j) {
      return E(j) === h;
    }
    function J(j) {
      return E(j) === p;
    }
    function q(j) {
      return E(j) === n;
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
    de.AsyncMode = y, de.ConcurrentMode = C, de.ContextConsumer = N, de.ContextProvider = I, de.Element = B, de.ForwardRef = V, de.Fragment = k, de.Lazy = S, de.Memo = $, de.Portal = F, de.Profiler = H, de.StrictMode = _, de.Suspense = z, de.isAsyncMode = Q, de.isConcurrentMode = O, de.isContextConsumer = M, de.isContextProvider = U, de.isElement = Y, de.isForwardRef = W, de.isFragment = X, de.isLazy = K, de.isMemo = J, de.isPortal = q, de.isProfiler = Z, de.isStrictMode = ee, de.isSuspense = se, de.isValidElementType = w, de.typeOf = E;
  }()), de;
}
var xa;
function Ji() {
  return xa || (xa = 1, process.env.NODE_ENV === "production" ? qn.exports = Op() : qn.exports = Rp()), qn.exports;
}
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/
var Fr, Ea;
function Pp() {
  if (Ea)
    return Fr;
  Ea = 1;
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
  return Fr = o() ? Object.assign : function(a, i) {
    for (var l, c = r(a), d, f = 1; f < arguments.length; f++) {
      l = Object(arguments[f]);
      for (var v in l)
        t.call(l, v) && (c[v] = l[v]);
      if (e) {
        d = e(l);
        for (var g = 0; g < d.length; g++)
          n.call(l, d[g]) && (c[d[g]] = l[d[g]]);
      }
    }
    return c;
  }, Fr;
}
var zr, ka;
function Oo() {
  if (ka)
    return zr;
  ka = 1;
  var e = "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED";
  return zr = e, zr;
}
var Ur, Ta;
function Zi() {
  return Ta || (Ta = 1, Ur = Function.call.bind(Object.prototype.hasOwnProperty)), Ur;
}
var Hr, Na;
function $p() {
  if (Na)
    return Hr;
  Na = 1;
  var e = function() {
  };
  if (process.env.NODE_ENV !== "production") {
    var t = Oo(), n = {}, r = Zi();
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
        if (r(a, f)) {
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
          ), v instanceof Error && !(v.message in n)) {
            n[v.message] = !0;
            var p = d ? d() : "";
            e(
              "Failed " + l + " type: " + v.message + (p ?? "")
            );
          }
        }
    }
  }
  return o.resetWarningCache = function() {
    process.env.NODE_ENV !== "production" && (n = {});
  }, Hr = o, Hr;
}
var Gr, Ca;
function _p() {
  if (Ca)
    return Gr;
  Ca = 1;
  var e = Ji(), t = Pp(), n = Oo(), r = Zi(), o = $p(), a = function() {
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
  return Gr = function(l, c) {
    var d = typeof Symbol == "function" && Symbol.iterator, f = "@@iterator";
    function v(O) {
      var M = O && (d && O[d] || O[f]);
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
      node: V(),
      objectOf: I,
      oneOf: N,
      oneOfType: B,
      shape: S,
      exact: $
    };
    function h(O, M) {
      return O === M ? O !== 0 || 1 / O === 1 / M : O !== O && M !== M;
    }
    function u(O, M) {
      this.message = O, this.data = M && typeof M == "object" ? M : {}, this.stack = "";
    }
    u.prototype = Error.prototype;
    function b(O) {
      if (process.env.NODE_ENV !== "production")
        var M = {}, U = 0;
      function Y(X, K, J, q, Z, ee, se) {
        if (q = q || g, ee = ee || J, se !== n) {
          if (c) {
            var j = new Error(
              "Calling PropTypes validators directly is not supported by the `prop-types` package. Use `PropTypes.checkPropTypes()` to call them. Read more at http://fb.me/use-check-prop-types"
            );
            throw j.name = "Invariant Violation", j;
          } else if (process.env.NODE_ENV !== "production" && typeof console < "u") {
            var ne = q + ":" + J;
            !M[ne] && // Avoid spamming the console because they are often not actionable except for lib authors
            U < 3 && (a(
              "You are manually calling a React.PropTypes validation function for the `" + ee + "` prop on `" + q + "`. This is deprecated and will throw in the standalone `prop-types` package. You may be seeing this warning due to a third-party PropTypes library. See https://fb.me/react-warning-dont-call-proptypes for details."
            ), M[ne] = !0, U++);
          }
        }
        return K[J] == null ? X ? K[J] === null ? new u("The " + Z + " `" + ee + "` is marked as required " + ("in `" + q + "`, but its value is `null`.")) : new u("The " + Z + " `" + ee + "` is marked as required in " + ("`" + q + "`, but its value is `undefined`.")) : null : O(K, J, q, Z, ee);
      }
      var W = Y.bind(null, !1);
      return W.isRequired = Y.bind(null, !0), W;
    }
    function x(O) {
      function M(U, Y, W, X, K, J) {
        var q = U[Y], Z = _(q);
        if (Z !== O) {
          var ee = z(q);
          return new u(
            "Invalid " + X + " `" + K + "` of type " + ("`" + ee + "` supplied to `" + W + "`, expected ") + ("`" + O + "`."),
            { expectedType: O }
          );
        }
        return null;
      }
      return b(M);
    }
    function P() {
      return b(i);
    }
    function w(O) {
      function M(U, Y, W, X, K) {
        if (typeof O != "function")
          return new u("Property `" + K + "` of component `" + W + "` has invalid PropType notation inside arrayOf.");
        var J = U[Y];
        if (!Array.isArray(J)) {
          var q = _(J);
          return new u("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected an array."));
        }
        for (var Z = 0; Z < J.length; Z++) {
          var ee = O(J, Z, W, X, K + "[" + Z + "]", n);
          if (ee instanceof Error)
            return ee;
        }
        return null;
      }
      return b(M);
    }
    function E() {
      function O(M, U, Y, W, X) {
        var K = M[U];
        if (!l(K)) {
          var J = _(K);
          return new u("Invalid " + W + " `" + X + "` of type " + ("`" + J + "` supplied to `" + Y + "`, expected a single ReactElement."));
        }
        return null;
      }
      return b(O);
    }
    function y() {
      function O(M, U, Y, W, X) {
        var K = M[U];
        if (!e.isValidElementType(K)) {
          var J = _(K);
          return new u("Invalid " + W + " `" + X + "` of type " + ("`" + J + "` supplied to `" + Y + "`, expected a single ReactElement type."));
        }
        return null;
      }
      return b(O);
    }
    function C(O) {
      function M(U, Y, W, X, K) {
        if (!(U[Y] instanceof O)) {
          var J = O.name || g, q = Q(U[Y]);
          return new u("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected ") + ("instance of `" + J + "`."));
        }
        return null;
      }
      return b(M);
    }
    function N(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && (arguments.length > 1 ? a(
          "Invalid arguments supplied to oneOf, expected an array, got " + arguments.length + " arguments. A common mistake is to write oneOf(x, y, z) instead of oneOf([x, y, z])."
        ) : a("Invalid argument supplied to oneOf, expected an array.")), i;
      function M(U, Y, W, X, K) {
        for (var J = U[Y], q = 0; q < O.length; q++)
          if (h(J, O[q]))
            return null;
        var Z = JSON.stringify(O, function(se, j) {
          var ne = z(j);
          return ne === "symbol" ? String(j) : j;
        });
        return new u("Invalid " + X + " `" + K + "` of value `" + String(J) + "` " + ("supplied to `" + W + "`, expected one of " + Z + "."));
      }
      return b(M);
    }
    function I(O) {
      function M(U, Y, W, X, K) {
        if (typeof O != "function")
          return new u("Property `" + K + "` of component `" + W + "` has invalid PropType notation inside objectOf.");
        var J = U[Y], q = _(J);
        if (q !== "object")
          return new u("Invalid " + X + " `" + K + "` of type " + ("`" + q + "` supplied to `" + W + "`, expected an object."));
        for (var Z in J)
          if (r(J, Z)) {
            var ee = O(J, Z, W, X, K + "." + Z, n);
            if (ee instanceof Error)
              return ee;
          }
        return null;
      }
      return b(M);
    }
    function B(O) {
      if (!Array.isArray(O))
        return process.env.NODE_ENV !== "production" && a("Invalid argument supplied to oneOfType, expected an instance of array."), i;
      for (var M = 0; M < O.length; M++) {
        var U = O[M];
        if (typeof U != "function")
          return a(
            "Invalid argument supplied to oneOfType. Expected an array of check functions, but received " + te(U) + " at index " + M + "."
          ), i;
      }
      function Y(W, X, K, J, q) {
        for (var Z = [], ee = 0; ee < O.length; ee++) {
          var se = O[ee], j = se(W, X, K, J, q, n);
          if (j == null)
            return null;
          j.data && r(j.data, "expectedType") && Z.push(j.data.expectedType);
        }
        var ne = Z.length > 0 ? ", expected one of type [" + Z.join(", ") + "]" : "";
        return new u("Invalid " + J + " `" + q + "` supplied to " + ("`" + K + "`" + ne + "."));
      }
      return b(Y);
    }
    function V() {
      function O(M, U, Y, W, X) {
        return F(M[U]) ? null : new u("Invalid " + W + " `" + X + "` supplied to " + ("`" + Y + "`, expected a ReactNode."));
      }
      return b(O);
    }
    function k(O, M, U, Y, W) {
      return new u(
        (O || "React class") + ": " + M + " type `" + U + "." + Y + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + W + "`."
      );
    }
    function S(O) {
      function M(U, Y, W, X, K) {
        var J = U[Y], q = _(J);
        if (q !== "object")
          return new u("Invalid " + X + " `" + K + "` of type `" + q + "` " + ("supplied to `" + W + "`, expected `object`."));
        for (var Z in O) {
          var ee = O[Z];
          if (typeof ee != "function")
            return k(W, X, K, Z, z(ee));
          var se = ee(J, Z, W, X, K + "." + Z, n);
          if (se)
            return se;
        }
        return null;
      }
      return b(M);
    }
    function $(O) {
      function M(U, Y, W, X, K) {
        var J = U[Y], q = _(J);
        if (q !== "object")
          return new u("Invalid " + X + " `" + K + "` of type `" + q + "` " + ("supplied to `" + W + "`, expected `object`."));
        var Z = t({}, U[Y], O);
        for (var ee in Z) {
          var se = O[ee];
          if (r(O, ee) && typeof se != "function")
            return k(W, X, K, ee, z(se));
          if (!se)
            return new u(
              "Invalid " + X + " `" + K + "` key `" + ee + "` supplied to `" + W + "`.\nBad object: " + JSON.stringify(U[Y], null, "  ") + `
Valid keys: ` + JSON.stringify(Object.keys(O), null, "  ")
            );
          var j = se(J, ee, W, X, K + "." + ee, n);
          if (j)
            return j;
        }
        return null;
      }
      return b(M);
    }
    function F(O) {
      switch (typeof O) {
        case "number":
        case "string":
        case "undefined":
          return !0;
        case "boolean":
          return !O;
        case "object":
          if (Array.isArray(O))
            return O.every(F);
          if (O === null || l(O))
            return !0;
          var M = v(O);
          if (M) {
            var U = M.call(O), Y;
            if (M !== O.entries) {
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
    function H(O, M) {
      return O === "symbol" ? !0 : M ? M["@@toStringTag"] === "Symbol" || typeof Symbol == "function" && M instanceof Symbol : !1;
    }
    function _(O) {
      var M = typeof O;
      return Array.isArray(O) ? "array" : O instanceof RegExp ? "object" : H(M, O) ? "symbol" : M;
    }
    function z(O) {
      if (typeof O > "u" || O === null)
        return "" + O;
      var M = _(O);
      if (M === "object") {
        if (O instanceof Date)
          return "date";
        if (O instanceof RegExp)
          return "regexp";
      }
      return M;
    }
    function te(O) {
      var M = z(O);
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
    function Q(O) {
      return !O.constructor || !O.constructor.name ? g : O.constructor.name;
    }
    return p.checkPropTypes = o, p.resetWarningCache = o.resetWarningCache, p.PropTypes = p, p;
  }, Gr;
}
var Wr, Sa;
function Mp() {
  if (Sa)
    return Wr;
  Sa = 1;
  var e = Oo();
  function t() {
  }
  function n() {
  }
  return n.resetWarningCache = t, Wr = function() {
    function r(i, l, c, d, f, v) {
      if (v !== e) {
        var g = new Error(
          "Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types"
        );
        throw g.name = "Invariant Violation", g;
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
  }, Wr;
}
if (process.env.NODE_ENV !== "production") {
  var Ip = Ji(), Ap = !0;
  ao.exports = _p()(Ip.isElement, Ap);
} else
  ao.exports = Mp()();
var Dp = ao.exports;
const s = /* @__PURE__ */ Np(Dp);
function Bp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Qi(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for Emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  const c = a.type;
  return typeof c == "function" && !Bp(c) && (l = "Did you accidentally use a plain function component for an element instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const es = rn(s.element, Qi);
es.isRequired = rn(s.element.isRequired, Qi);
const Bn = es;
function jp(e) {
  const {
    prototype: t = {}
  } = e;
  return !!t.isReactComponent;
}
function Lp(e, t, n, r, o) {
  const a = e[t], i = o || t;
  if (a == null || // When server-side rendering React doesn't warn either.
  // This is not an accurate check for SSR.
  // This is only in place for emotion compat.
  // TODO: Revisit once https://github.com/facebook/react/issues/20047 is resolved.
  typeof window > "u")
    return null;
  let l;
  return typeof a == "function" && !jp(a) && (l = "Did you accidentally provide a plain function component instead?"), l !== void 0 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an element type that can hold a ref. ${l} For more information see https://mui.com/r/caveat-with-refs-guide`) : null;
}
const Vp = rn(s.elementType, Lp), Fp = "exact-prop: ​";
function ts(e) {
  return process.env.NODE_ENV === "production" ? e : R({}, e, {
    [Fp]: (t) => {
      const n = Object.keys(t).filter((r) => !e.hasOwnProperty(r));
      return n.length > 0 ? new Error(`The following props are not supported: ${n.map((r) => `\`${r}\``).join(", ")}. Please remove them.`) : null;
    }
  });
}
function Kt(e) {
  let t = "https://mui.com/production-error/?code=" + e;
  for (let n = 1; n < arguments.length; n += 1)
    t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified MUI error #" + e + "; visit " + t + " for the full message.";
}
var io = { exports: {} }, ue = {};
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
function zp() {
  if (Oa)
    return ue;
  Oa = 1;
  var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h;
  h = Symbol.for("react.module.reference");
  function u(b) {
    if (typeof b == "object" && b !== null) {
      var x = b.$$typeof;
      switch (x) {
        case e:
          switch (b = b.type, b) {
            case n:
            case o:
            case r:
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
  return ue.ContextConsumer = i, ue.ContextProvider = a, ue.Element = e, ue.ForwardRef = c, ue.Fragment = n, ue.Lazy = g, ue.Memo = v, ue.Portal = t, ue.Profiler = o, ue.StrictMode = r, ue.Suspense = d, ue.SuspenseList = f, ue.isAsyncMode = function() {
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
    return u(b) === n;
  }, ue.isLazy = function(b) {
    return u(b) === g;
  }, ue.isMemo = function(b) {
    return u(b) === v;
  }, ue.isPortal = function(b) {
    return u(b) === t;
  }, ue.isProfiler = function(b) {
    return u(b) === o;
  }, ue.isStrictMode = function(b) {
    return u(b) === r;
  }, ue.isSuspense = function(b) {
    return u(b) === d;
  }, ue.isSuspenseList = function(b) {
    return u(b) === f;
  }, ue.isValidElementType = function(b) {
    return typeof b == "string" || typeof b == "function" || b === n || b === o || b === r || b === d || b === f || b === p || typeof b == "object" && b !== null && (b.$$typeof === g || b.$$typeof === v || b.$$typeof === a || b.$$typeof === i || b.$$typeof === c || b.$$typeof === h || b.getModuleId !== void 0);
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
var Ra;
function Up() {
  return Ra || (Ra = 1, process.env.NODE_ENV !== "production" && function() {
    var e = Symbol.for("react.element"), t = Symbol.for("react.portal"), n = Symbol.for("react.fragment"), r = Symbol.for("react.strict_mode"), o = Symbol.for("react.profiler"), a = Symbol.for("react.provider"), i = Symbol.for("react.context"), l = Symbol.for("react.server_context"), c = Symbol.for("react.forward_ref"), d = Symbol.for("react.suspense"), f = Symbol.for("react.suspense_list"), v = Symbol.for("react.memo"), g = Symbol.for("react.lazy"), p = Symbol.for("react.offscreen"), h = !1, u = !1, b = !1, x = !1, P = !1, w;
    w = Symbol.for("react.module.reference");
    function E(A) {
      return !!(typeof A == "string" || typeof A == "function" || A === n || A === o || P || A === r || A === d || A === f || x || A === p || h || u || b || typeof A == "object" && A !== null && (A.$$typeof === g || A.$$typeof === v || A.$$typeof === a || A.$$typeof === i || A.$$typeof === c || // This needs to include all possible module reference object
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
              case n:
              case o:
              case r:
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
                    return le;
                }
            }
          case t:
            return le;
        }
      }
    }
    var C = i, N = a, I = e, B = c, V = n, k = g, S = v, $ = t, F = o, H = r, _ = d, z = f, te = !1, Q = !1;
    function O(A) {
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
      return y(A) === n;
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
      return y(A) === r;
    }
    function j(A) {
      return y(A) === d;
    }
    function ne(A) {
      return y(A) === f;
    }
    fe.ContextConsumer = C, fe.ContextProvider = N, fe.Element = I, fe.ForwardRef = B, fe.Fragment = V, fe.Lazy = k, fe.Memo = S, fe.Portal = $, fe.Profiler = F, fe.StrictMode = H, fe.Suspense = _, fe.SuspenseList = z, fe.isAsyncMode = O, fe.isConcurrentMode = M, fe.isContextConsumer = U, fe.isContextProvider = Y, fe.isElement = W, fe.isForwardRef = X, fe.isFragment = K, fe.isLazy = J, fe.isMemo = q, fe.isPortal = Z, fe.isProfiler = ee, fe.isStrictMode = se, fe.isSuspense = j, fe.isSuspenseList = ne, fe.isValidElementType = E, fe.typeOf = y;
  }()), fe;
}
process.env.NODE_ENV === "production" ? io.exports = zp() : io.exports = Up();
var sr = io.exports;
const Hp = /^\s*function(?:\s|\s*\/\*.*\*\/\s*)+([^(\s/]*)\s*/;
function Gp(e) {
  const t = `${e}`.match(Hp);
  return t && t[1] || "";
}
function ns(e, t = "") {
  return e.displayName || e.name || Gp(e) || t;
}
function Pa(e, t, n) {
  const r = ns(t);
  return e.displayName || (r !== "" ? `${n}(${r})` : n);
}
function Wp(e) {
  if (e != null) {
    if (typeof e == "string")
      return e;
    if (typeof e == "function")
      return ns(e, "Component");
    if (typeof e == "object")
      switch (e.$$typeof) {
        case sr.ForwardRef:
          return Pa(e, e.render, "ForwardRef");
        case sr.Memo:
          return Pa(e, e.type, "memo");
        default:
          return;
      }
  }
}
function lt(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = e[t], i = o || t;
  return a == null ? null : a && a.nodeType !== 1 ? new Error(`Invalid ${r} \`${i}\` supplied to \`${n}\`. Expected an HTMLElement.`) : null;
}
const Xp = s.oneOfType([s.func, s.object]), Ro = Xp;
function et(e) {
  if (typeof e != "string")
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `capitalize(string)` expects a string argument." : Kt(7));
  return e.charAt(0).toUpperCase() + e.slice(1);
}
function so(...e) {
  return e.reduce((t, n) => n == null ? t : function(...o) {
    t.apply(this, o), n.apply(this, o);
  }, () => {
  });
}
function rs(e, t = 166) {
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
function qp(e, t) {
  return process.env.NODE_ENV === "production" ? () => null : (n, r, o, a, i) => {
    const l = o || "<<anonymous>>", c = i || r;
    return typeof n[r] < "u" ? new Error(`The ${a} \`${c}\` of \`${l}\` is deprecated. ${t}`) : null;
  };
}
function Yp(e, t) {
  var n, r;
  return /* @__PURE__ */ T.isValidElement(e) && t.indexOf(
    // For server components `muiName` is avaialble in element.type._payload.value.muiName
    // relevant info - https://github.com/facebook/react/blob/2807d781a08db8e9873687fccc25c0f12b4fb3d4/packages/react/src/ReactLazy.js#L45
    // eslint-disable-next-line no-underscore-dangle
    (n = e.type.muiName) != null ? n : (r = e.type) == null || (r = r._payload) == null || (r = r.value) == null ? void 0 : r.muiName
  ) !== -1;
}
function Oe(e) {
  return e && e.ownerDocument || document;
}
function Jt(e) {
  return Oe(e).defaultView || window;
}
function Kp(e, t) {
  if (process.env.NODE_ENV === "production")
    return () => null;
  const n = t ? R({}, t.propTypes) : null;
  return (o) => (a, i, l, c, d, ...f) => {
    const v = d || i, g = n == null ? void 0 : n[v];
    if (g) {
      const p = g(a, i, l, c, d, ...f);
      if (p)
        return p;
    }
    return typeof a[i] < "u" && !a[o] ? new Error(`The prop \`${v}\` of \`${e}\` can only be used together with the \`${o}\` prop.`) : null;
  };
}
function lr(e, t) {
  typeof e == "function" ? e(t) : e && (e.current = t);
}
const Jp = typeof window < "u" ? T.useLayoutEffect : T.useEffect, It = Jp;
let $a = 0;
function Zp(e) {
  const [t, n] = T.useState(e), r = e || t;
  return T.useEffect(() => {
    t == null && ($a += 1, n(`mui-${$a}`));
  }, [t]), r;
}
const _a = T["useId".toString()];
function os(e) {
  if (_a !== void 0) {
    const t = _a();
    return e ?? t;
  }
  return Zp(e);
}
function Qp(e, t, n, r, o) {
  if (process.env.NODE_ENV === "production")
    return null;
  const a = o || t;
  return typeof e[t] < "u" ? new Error(`The prop \`${a}\` is not supported. Please remove it.`) : null;
}
function as({
  controlled: e,
  default: t,
  name: n,
  state: r = "value"
}) {
  const {
    current: o
  } = T.useRef(e !== void 0), [a, i] = T.useState(t), l = o ? e : a;
  if (process.env.NODE_ENV !== "production") {
    T.useEffect(() => {
      o !== (e !== void 0) && console.error([`MUI: A component is changing the ${o ? "" : "un"}controlled ${r} state of ${n} to be ${o ? "un" : ""}controlled.`, "Elements should not switch from uncontrolled to controlled (or vice versa).", `Decide between using a controlled or uncontrolled ${n} element for the lifetime of the component.`, "The nature of the state is determined during the first render. It's considered controlled if the value is not `undefined`.", "More info: https://fb.me/react-controlled-components"].join(`
`));
    }, [r, n, e]);
    const {
      current: d
    } = T.useRef(t);
    T.useEffect(() => {
      !o && d !== t && console.error([`MUI: A component is changing the default ${r} state of an uncontrolled ${n} after being initialized. To suppress this warning opt to use a controlled ${n}.`].join(`
`));
    }, [JSON.stringify(t)]);
  }
  const c = T.useCallback((d) => {
    o || i(d);
  }, []);
  return [l, c];
}
function $n(e) {
  const t = T.useRef(e);
  return It(() => {
    t.current = e;
  }), T.useRef((...n) => (
    // @ts-expect-error hide `this`
    (0, t.current)(...n)
  )).current;
}
function We(...e) {
  return T.useMemo(() => e.every((t) => t == null) ? null : (t) => {
    e.forEach((n) => {
      lr(n, t);
    });
  }, e);
}
const Ma = {};
function ed(e, t) {
  const n = T.useRef(Ma);
  return n.current === Ma && (n.current = e(t)), n;
}
const td = [];
function nd(e) {
  T.useEffect(e, td);
}
class jn {
  constructor() {
    this.currentId = null, this.clear = () => {
      this.currentId !== null && (clearTimeout(this.currentId), this.currentId = null);
    }, this.disposeEffect = () => this.clear;
  }
  static create() {
    return new jn();
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
function vn() {
  const e = ed(jn.create).current;
  return nd(e.disposeEffect), e;
}
let xr = !0, lo = !1;
const rd = new jn(), od = {
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
function ad(e) {
  const {
    type: t,
    tagName: n
  } = e;
  return !!(n === "INPUT" && od[t] && !e.readOnly || n === "TEXTAREA" && !e.readOnly || e.isContentEditable);
}
function id(e) {
  e.metaKey || e.altKey || e.ctrlKey || (xr = !0);
}
function Xr() {
  xr = !1;
}
function sd() {
  this.visibilityState === "hidden" && lo && (xr = !0);
}
function ld(e) {
  e.addEventListener("keydown", id, !0), e.addEventListener("mousedown", Xr, !0), e.addEventListener("pointerdown", Xr, !0), e.addEventListener("touchstart", Xr, !0), e.addEventListener("visibilitychange", sd, !0);
}
function cd(e) {
  const {
    target: t
  } = e;
  try {
    return t.matches(":focus-visible");
  } catch {
  }
  return xr || ad(t);
}
function is() {
  const e = T.useCallback((o) => {
    o != null && ld(o.ownerDocument);
  }, []), t = T.useRef(!1);
  function n() {
    return t.current ? (lo = !0, rd.start(100, () => {
      lo = !1;
    }), t.current = !1, !0) : !1;
  }
  function r(o) {
    return cd(o) ? (t.current = !0, !0) : !1;
  }
  return {
    isFocusVisibleRef: t,
    onFocus: r,
    onBlur: n,
    ref: e
  };
}
function ss(e) {
  const t = e.documentElement.clientWidth;
  return Math.abs(window.innerWidth - t);
}
function pd(e) {
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
function dd(e) {
  return typeof e == "number" && isFinite(e) && Math.floor(e) === e;
}
const ud = Number.isInteger || dd;
function ls(e, t, n, r) {
  const o = e[t];
  if (o == null || !ud(o)) {
    const a = pd(o);
    return new RangeError(`Invalid ${r} \`${t}\` of type \`${a}\` supplied to \`${n}\`, expected \`integer\`.`);
  }
  return null;
}
function cs(e, t, ...n) {
  return e[t] === void 0 ? null : ls(e, t, ...n);
}
function co() {
  return null;
}
cs.isRequired = ls;
co.isRequired = co;
const ps = process.env.NODE_ENV === "production" ? co : cs;
function ds(e, t) {
  const n = R({}, t);
  return Object.keys(e).forEach((r) => {
    if (r.toString().match(/^(components|slots)$/))
      n[r] = R({}, e[r], n[r]);
    else if (r.toString().match(/^(componentsProps|slotProps)$/)) {
      const o = e[r] || {}, a = t[r];
      n[r] = {}, !a || !Object.keys(a) ? n[r] = o : !o || !Object.keys(o) ? n[r] = a : (n[r] = R({}, a), Object.keys(o).forEach((i) => {
        n[r][i] = ds(o[i], a[i]);
      }));
    } else
      n[r] === void 0 && (n[r] = e[r]);
  }), n;
}
function dt(e, t, n = void 0) {
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
const Ia = (e) => e, fd = () => {
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
}, md = fd(), us = md, fs = {
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
function nt(e, t, n = "Mui") {
  const r = fs[t];
  return r ? `${n}-${r}` : `${us.generate(e)}-${t}`;
}
function wt(e, t, n = "Mui") {
  const r = {};
  return t.forEach((o) => {
    r[o] = nt(e, o, n);
  }), r;
}
function hd(e, t = Number.MIN_SAFE_INTEGER, n = Number.MAX_SAFE_INTEGER) {
  return Math.max(t, Math.min(e, n));
}
function he(e, t) {
  if (e == null)
    return {};
  var n = {}, r = Object.keys(e), o, a;
  for (a = 0; a < r.length; a++)
    o = r[a], !(t.indexOf(o) >= 0) && (n[o] = e[o]);
  return n;
}
const gd = ["values", "unit", "step"], bd = (e) => {
  const t = Object.keys(e).map((n) => ({
    key: n,
    val: e[n]
  })) || [];
  return t.sort((n, r) => n.val - r.val), t.reduce((n, r) => R({}, n, {
    [r.key]: r.val
  }), {});
};
function vd(e) {
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
  } = e, o = he(e, gd), a = bd(t), i = Object.keys(a);
  function l(g) {
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${n})`;
  }
  function c(g) {
    return `@media (max-width:${(typeof t[g] == "number" ? t[g] : g) - r / 100}${n})`;
  }
  function d(g, p) {
    const h = i.indexOf(p);
    return `@media (min-width:${typeof t[g] == "number" ? t[g] : g}${n}) and (max-width:${(h !== -1 && typeof t[i[h]] == "number" ? t[i[h]] : p) - r / 100}${n})`;
  }
  function f(g) {
    return i.indexOf(g) + 1 < i.length ? d(g, i[i.indexOf(g) + 1]) : l(g);
  }
  function v(g) {
    const p = i.indexOf(g);
    return p === 0 ? l(i[1]) : p === i.length - 1 ? c(i[p]) : d(g, i[i.indexOf(g) + 1]).replace("@media", "@media not all and");
  }
  return R({
    keys: i,
    values: a,
    up: l,
    down: c,
    between: d,
    only: f,
    not: v,
    unit: n
  }, o);
}
const yd = {
  borderRadius: 4
}, wd = yd, xd = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.string, s.object, s.array]) : {}, xt = xd;
function kn(e, t) {
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
function ct(e, t, n) {
  const r = e.theme || {};
  if (Array.isArray(t)) {
    const a = r.breakpoints || Aa;
    return t.reduce((i, l, c) => (i[a.up(a.keys[c])] = n(t[c]), i), {});
  }
  if (typeof t == "object") {
    const a = r.breakpoints || Aa;
    return Object.keys(t).reduce((i, l) => {
      if (Object.keys(a.values || Po).indexOf(l) !== -1) {
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
function Ed(e = {}) {
  var t;
  return ((t = e.keys) == null ? void 0 : t.reduce((r, o) => {
    const a = e.up(o);
    return r[a] = {}, r;
  }, {})) || {};
}
function kd(e, t) {
  return e.reduce((n, r) => {
    const o = n[r];
    return (!o || Object.keys(o).length === 0) && delete n[r], n;
  }, t);
}
function Er(e, t, n = !0) {
  if (!t || typeof t != "string")
    return null;
  if (e && e.vars && n) {
    const r = `vars.${t}`.split(".").reduce((o, a) => o && o[a] ? o[a] : null, e);
    if (r != null)
      return r;
  }
  return t.split(".").reduce((r, o) => r && r[o] != null ? r[o] : null, e);
}
function cr(e, t, n, r = n) {
  let o;
  return typeof e == "function" ? o = e(n) : Array.isArray(e) ? o = e[n] || r : o = Er(e, n) || r, t && (o = t(o, r, e)), o;
}
function ke(e) {
  const {
    prop: t,
    cssProperty: n = e.prop,
    themeKey: r,
    transform: o
  } = e, a = (i) => {
    if (i[t] == null)
      return null;
    const l = i[t], c = i.theme, d = Er(c, r) || {};
    return ct(i, l, (v) => {
      let g = cr(d, o, v);
      return v === g && typeof v == "string" && (g = cr(d, o, `${t}${v === "default" ? "" : et(v)}`, v)), n === !1 ? g : {
        [n]: g
      };
    });
  };
  return a.propTypes = process.env.NODE_ENV !== "production" ? {
    [t]: xt
  } : {}, a.filterProps = [t], a;
}
function Td(e) {
  const t = {};
  return (n) => (t[n] === void 0 && (t[n] = e(n)), t[n]);
}
const Nd = {
  m: "margin",
  p: "padding"
}, Cd = {
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
}, Sd = Td((e) => {
  if (e.length > 2)
    if (Da[e])
      e = Da[e];
    else
      return [e];
  const [t, n] = e.split(""), r = Nd[t], o = Cd[n] || "";
  return Array.isArray(o) ? o.map((a) => r + a) : [r + o];
}), kr = ["m", "mt", "mr", "mb", "ml", "mx", "my", "margin", "marginTop", "marginRight", "marginBottom", "marginLeft", "marginX", "marginY", "marginInline", "marginInlineStart", "marginInlineEnd", "marginBlock", "marginBlockStart", "marginBlockEnd"], Tr = ["p", "pt", "pr", "pb", "pl", "px", "py", "padding", "paddingTop", "paddingRight", "paddingBottom", "paddingLeft", "paddingX", "paddingY", "paddingInline", "paddingInlineStart", "paddingInlineEnd", "paddingBlock", "paddingBlockStart", "paddingBlockEnd"], Od = [...kr, ...Tr];
function Ln(e, t, n, r) {
  var o;
  const a = (o = Er(e, t, !1)) != null ? o : n;
  return typeof a == "number" ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && typeof i != "number" && console.error(`MUI: Expected ${r} argument to be a number or a string, got ${i}.`), a * i) : Array.isArray(a) ? (i) => typeof i == "string" ? i : (process.env.NODE_ENV !== "production" && (Number.isInteger(i) ? i > a.length - 1 && console.error([`MUI: The value provided (${i}) overflows.`, `The supported values are: ${JSON.stringify(a)}.`, `${i} > ${a.length - 1}, you need to add the missing values.`].join(`
`)) : console.error([`MUI: The \`theme.${t}\` array type cannot be combined with non integer values.You should either use an integer value that can be used as index, or define the \`theme.${t}\` as a number.`].join(`
`))), a[i]) : typeof a == "function" ? a : (process.env.NODE_ENV !== "production" && console.error([`MUI: The \`theme.${t}\` value (${a}) is invalid.`, "It should be a number, an array or a function."].join(`
`)), () => {
  });
}
function ms(e) {
  return Ln(e, "spacing", 8, "spacing");
}
function Vn(e, t) {
  if (typeof t == "string" || t == null)
    return t;
  const n = Math.abs(t), r = e(n);
  return t >= 0 ? r : typeof r == "number" ? -r : `-${r}`;
}
function Rd(e, t) {
  return (n) => e.reduce((r, o) => (r[o] = Vn(t, n), r), {});
}
function Pd(e, t, n, r) {
  if (t.indexOf(n) === -1)
    return null;
  const o = Sd(n), a = Rd(o, r), i = e[n];
  return ct(e, i, a);
}
function hs(e, t) {
  const n = ms(e.theme);
  return Object.keys(e).map((r) => Pd(e, t, r, n)).reduce(kn, {});
}
function ve(e) {
  return hs(e, kr);
}
ve.propTypes = process.env.NODE_ENV !== "production" ? kr.reduce((e, t) => (e[t] = xt, e), {}) : {};
ve.filterProps = kr;
function ye(e) {
  return hs(e, Tr);
}
ye.propTypes = process.env.NODE_ENV !== "production" ? Tr.reduce((e, t) => (e[t] = xt, e), {}) : {};
ye.filterProps = Tr;
process.env.NODE_ENV !== "production" && Od.reduce((e, t) => (e[t] = xt, e), {});
function $d(e = 8) {
  if (e.mui)
    return e;
  const t = ms({
    spacing: e
  }), n = (...r) => (process.env.NODE_ENV !== "production" && (r.length <= 4 || console.error(`MUI: Too many arguments provided, expected between 0 and 4, got ${r.length}`)), (r.length === 0 ? [1] : r).map((a) => {
    const i = t(a);
    return typeof i == "number" ? `${i}px` : i;
  }).join(" "));
  return n.mui = !0, n;
}
function Nr(...e) {
  const t = e.reduce((r, o) => (o.filterProps.forEach((a) => {
    r[a] = o;
  }), r), {}), n = (r) => Object.keys(r).reduce((o, a) => t[a] ? kn(o, t[a](r)) : o, {});
  return n.propTypes = process.env.NODE_ENV !== "production" ? e.reduce((r, o) => Object.assign(r, o.propTypes), {}) : {}, n.filterProps = e.reduce((r, o) => r.concat(o.filterProps), []), n;
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
const _d = Ye("border", He), Md = Ye("borderTop", He), Id = Ye("borderRight", He), Ad = Ye("borderBottom", He), Dd = Ye("borderLeft", He), Bd = Ye("borderColor"), jd = Ye("borderTopColor"), Ld = Ye("borderRightColor"), Vd = Ye("borderBottomColor"), Fd = Ye("borderLeftColor"), zd = Ye("outline", He), Ud = Ye("outlineColor"), Cr = (e) => {
  if (e.borderRadius !== void 0 && e.borderRadius !== null) {
    const t = Ln(e.theme, "shape.borderRadius", 4, "borderRadius"), n = (r) => ({
      borderRadius: Vn(t, r)
    });
    return ct(e, e.borderRadius, n);
  }
  return null;
};
Cr.propTypes = process.env.NODE_ENV !== "production" ? {
  borderRadius: xt
} : {};
Cr.filterProps = ["borderRadius"];
Nr(_d, Md, Id, Ad, Dd, Bd, jd, Ld, Vd, Fd, Cr, zd, Ud);
const Sr = (e) => {
  if (e.gap !== void 0 && e.gap !== null) {
    const t = Ln(e.theme, "spacing", 8, "gap"), n = (r) => ({
      gap: Vn(t, r)
    });
    return ct(e, e.gap, n);
  }
  return null;
};
Sr.propTypes = process.env.NODE_ENV !== "production" ? {
  gap: xt
} : {};
Sr.filterProps = ["gap"];
const Or = (e) => {
  if (e.columnGap !== void 0 && e.columnGap !== null) {
    const t = Ln(e.theme, "spacing", 8, "columnGap"), n = (r) => ({
      columnGap: Vn(t, r)
    });
    return ct(e, e.columnGap, n);
  }
  return null;
};
Or.propTypes = process.env.NODE_ENV !== "production" ? {
  columnGap: xt
} : {};
Or.filterProps = ["columnGap"];
const Rr = (e) => {
  if (e.rowGap !== void 0 && e.rowGap !== null) {
    const t = Ln(e.theme, "spacing", 8, "rowGap"), n = (r) => ({
      rowGap: Vn(t, r)
    });
    return ct(e, e.rowGap, n);
  }
  return null;
};
Rr.propTypes = process.env.NODE_ENV !== "production" ? {
  rowGap: xt
} : {};
Rr.filterProps = ["rowGap"];
const Hd = ke({
  prop: "gridColumn"
}), Gd = ke({
  prop: "gridRow"
}), Wd = ke({
  prop: "gridAutoFlow"
}), Xd = ke({
  prop: "gridAutoColumns"
}), qd = ke({
  prop: "gridAutoRows"
}), Yd = ke({
  prop: "gridTemplateColumns"
}), Kd = ke({
  prop: "gridTemplateRows"
}), Jd = ke({
  prop: "gridTemplateAreas"
}), Zd = ke({
  prop: "gridArea"
});
Nr(Sr, Or, Rr, Hd, Gd, Wd, Xd, qd, Yd, Kd, Jd, Zd);
function qt(e, t) {
  return t === "grey" ? t : e;
}
const Qd = ke({
  prop: "color",
  themeKey: "palette",
  transform: qt
}), eu = ke({
  prop: "bgcolor",
  cssProperty: "backgroundColor",
  themeKey: "palette",
  transform: qt
}), tu = ke({
  prop: "backgroundColor",
  themeKey: "palette",
  transform: qt
});
Nr(Qd, eu, tu);
function Ve(e) {
  return e <= 1 && e !== 0 ? `${e * 100}%` : e;
}
const nu = ke({
  prop: "width",
  transform: Ve
}), $o = (e) => {
  if (e.maxWidth !== void 0 && e.maxWidth !== null) {
    const t = (n) => {
      var r, o;
      const a = ((r = e.theme) == null || (r = r.breakpoints) == null || (r = r.values) == null ? void 0 : r[n]) || Po[n];
      return a ? ((o = e.theme) == null || (o = o.breakpoints) == null ? void 0 : o.unit) !== "px" ? {
        maxWidth: `${a}${e.theme.breakpoints.unit}`
      } : {
        maxWidth: a
      } : {
        maxWidth: Ve(n)
      };
    };
    return ct(e, e.maxWidth, t);
  }
  return null;
};
$o.filterProps = ["maxWidth"];
const ru = ke({
  prop: "minWidth",
  transform: Ve
}), ou = ke({
  prop: "height",
  transform: Ve
}), au = ke({
  prop: "maxHeight",
  transform: Ve
}), iu = ke({
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
const su = ke({
  prop: "boxSizing"
});
Nr(nu, $o, ru, ou, au, iu, su);
const lu = {
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
    style: Cr
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
    style: Sr
  },
  rowGap: {
    style: Rr
  },
  columnGap: {
    style: Or
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
}, _o = lu;
function cu(...e) {
  const t = e.reduce((r, o) => r.concat(Object.keys(o)), []), n = new Set(t);
  return e.every((r) => n.size === Object.keys(r).length);
}
function pu(e, t) {
  return typeof e == "function" ? e(t) : e;
}
function du() {
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
      transform: f,
      style: v
    } = l;
    if (r == null)
      return null;
    if (d === "typography" && r === "inherit")
      return {
        [n]: r
      };
    const g = Er(o, d) || {};
    return v ? v(i) : ct(i, r, (h) => {
      let u = cr(g, f, h);
      return h === u && typeof h == "string" && (u = cr(g, f, `${n}${h === "default" ? "" : et(h)}`, h)), c === !1 ? u : {
        [c]: u
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
    const i = (r = a.unstable_sxConfig) != null ? r : _o;
    function l(c) {
      let d = c;
      if (typeof c == "function")
        d = c(a);
      else if (typeof c != "object")
        return c;
      if (!d)
        return null;
      const f = Ed(a.breakpoints), v = Object.keys(f);
      let g = f;
      return Object.keys(d).forEach((p) => {
        const h = pu(d[p], a);
        if (h != null)
          if (typeof h == "object")
            if (i[p])
              g = kn(g, e(p, h, a, i));
            else {
              const u = ct({
                theme: a
              }, h, (b) => ({
                [p]: b
              }));
              cu(u, h) ? g[p] = t({
                sx: h,
                theme: a
              }) : g = kn(g, u);
            }
          else
            g = kn(g, e(p, h, a, i));
      }), kd(v, g);
    }
    return Array.isArray(o) ? o.map(l) : l(o);
  }
  return t;
}
const gs = du();
gs.filterProps = ["sx"];
const Mo = gs;
function uu(e, t) {
  const n = this;
  return n.vars && typeof n.getColorSchemeSelector == "function" ? {
    [n.getColorSchemeSelector(e).replace(/(\[[^\]]+\])/, "*:where($1)")]: t
  } : n.palette.mode === e ? t : {};
}
const fu = ["breakpoints", "palette", "spacing", "shape"];
function Io(e = {}, ...t) {
  const {
    breakpoints: n = {},
    palette: r = {},
    spacing: o,
    shape: a = {}
  } = e, i = he(e, fu), l = vd(n), c = $d(o);
  let d = st({
    breakpoints: l,
    direction: "ltr",
    components: {},
    // Inject component definitions.
    palette: R({
      mode: "light"
    }, r),
    spacing: c,
    shape: R({}, wd, a)
  }, i);
  return d.applyStyles = uu, d = t.reduce((f, v) => st(f, v), d), d.unstable_sxConfig = R({}, _o, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(v) {
    return Mo({
      sx: v,
      theme: this
    });
  }, d;
}
function mu(e) {
  return Object.keys(e).length === 0;
}
function bs(e = null) {
  const t = T.useContext(Oc);
  return !t || mu(t) ? e : t;
}
const hu = Io();
function vs(e = hu) {
  return bs(e);
}
const gu = ["ownerState"], bu = ["variants"], vu = ["name", "slot", "skipVariantsResolver", "skipSx", "overridesResolver"];
function yu(e) {
  return Object.keys(e).length === 0;
}
function wu(e) {
  return typeof e == "string" && // 96 is one less than the char code
  // for "a" so this is checking that
  // it's a lowercase character
  e.charCodeAt(0) > 96;
}
function er(e) {
  return e !== "ownerState" && e !== "theme" && e !== "sx" && e !== "as";
}
const xu = Io(), Ba = (e) => e && e.charAt(0).toLowerCase() + e.slice(1);
function Yn({
  defaultTheme: e,
  theme: t,
  themeId: n
}) {
  return yu(t) ? e : t[n] || t;
}
function Eu(e) {
  return e ? (t, n) => n[e] : null;
}
function tr(e, t) {
  let {
    ownerState: n
  } = t, r = he(t, gu);
  const o = typeof e == "function" ? e(R({
    ownerState: n
  }, r)) : e;
  if (Array.isArray(o))
    return o.flatMap((a) => tr(a, R({
      ownerState: n
    }, r)));
  if (o && typeof o == "object" && Array.isArray(o.variants)) {
    const {
      variants: a = []
    } = o;
    let l = he(o, bu);
    return a.forEach((c) => {
      let d = !0;
      typeof c.props == "function" ? d = c.props(R({
        ownerState: n
      }, r, n)) : Object.keys(c.props).forEach((f) => {
        (n == null ? void 0 : n[f]) !== c.props[f] && r[f] !== c.props[f] && (d = !1);
      }), d && (Array.isArray(l) || (l = [l]), l.push(typeof c.style == "function" ? c.style(R({
        ownerState: n
      }, r, n)) : c.style));
    }), l;
  }
  return o;
}
function ku(e = {}) {
  const {
    themeId: t,
    defaultTheme: n = xu,
    rootShouldForwardProp: r = er,
    slotShouldForwardProp: o = er
  } = e, a = (i) => Mo(R({}, i, {
    theme: Yn(R({}, i, {
      defaultTheme: n,
      themeId: t
    }))
  }));
  return a.__mui_systemSx = !0, (i, l = {}) => {
    Rc(i, (y) => y.filter((C) => !(C != null && C.__mui_systemSx)));
    const {
      name: c,
      slot: d,
      skipVariantsResolver: f,
      skipSx: v,
      // TODO v6: remove `lowercaseFirstLetter()` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      overridesResolver: g = Eu(Ba(d))
    } = l, p = he(l, vu), h = f !== void 0 ? f : (
      // TODO v6: remove `Root` in the next major release
      // For more details: https://github.com/mui/material-ui/pull/37908
      d && d !== "Root" && d !== "root" || !1
    ), u = v || !1;
    let b;
    process.env.NODE_ENV !== "production" && c && (b = `${c}-${Ba(d || "Root")}`);
    let x = er;
    d === "Root" || d === "root" ? x = r : d ? x = o : wu(i) && (x = void 0);
    const P = Sc(i, R({
      shouldForwardProp: x,
      label: b
    }, p)), w = (y) => typeof y == "function" && y.__emotion_real !== y || Rt(y) ? (C) => tr(y, R({}, C, {
      theme: Yn({
        theme: C.theme,
        defaultTheme: n,
        themeId: t
      })
    })) : y, E = (y, ...C) => {
      let N = w(y);
      const I = C ? C.map(w) : [];
      c && g && I.push((k) => {
        const S = Yn(R({}, k, {
          defaultTheme: n,
          themeId: t
        }));
        if (!S.components || !S.components[c] || !S.components[c].styleOverrides)
          return null;
        const $ = S.components[c].styleOverrides, F = {};
        return Object.entries($).forEach(([H, _]) => {
          F[H] = tr(_, R({}, k, {
            theme: S
          }));
        }), g(k, F);
      }), c && !h && I.push((k) => {
        var S;
        const $ = Yn(R({}, k, {
          defaultTheme: n,
          themeId: t
        })), F = $ == null || (S = $.components) == null || (S = S[c]) == null ? void 0 : S.variants;
        return tr({
          variants: F
        }, R({}, k, {
          theme: $
        }));
      }), u || I.push(a);
      const B = I.length - C.length;
      if (Array.isArray(y) && B > 0) {
        const k = new Array(B).fill("");
        N = [...y, ...k], N.raw = [...y.raw, ...k];
      }
      const V = P(N, ...I);
      if (process.env.NODE_ENV !== "production") {
        let k;
        c && (k = `${c}${et(d || "")}`), k === void 0 && (k = `Styled(${Wp(i)})`), V.displayName = k;
      }
      return i.muiName && (V.muiName = i.muiName), V;
    };
    return P.withConfig && (E.withConfig = P.withConfig), E;
  };
}
function Tu(e) {
  const {
    theme: t,
    name: n,
    props: r
  } = e;
  return !t || !t.components || !t.components[n] || !t.components[n].defaultProps ? r : ds(t.components[n].defaultProps, r);
}
function Nu({
  props: e,
  name: t,
  defaultTheme: n,
  themeId: r
}) {
  let o = vs(n);
  return r && (o = o[r] || o), Tu({
    theme: o,
    name: t,
    props: e
  });
}
function Ao(e, t = 0, n = 1) {
  return process.env.NODE_ENV !== "production" && (e < t || e > n) && console.error(`MUI: The value provided ${e} is out of range [${t}, ${n}].`), hd(e, t, n);
}
function Cu(e) {
  e = e.slice(1);
  const t = new RegExp(`.{1,${e.length >= 6 ? 2 : 1}}`, "g");
  let n = e.match(t);
  return n && n[0].length === 1 && (n = n.map((r) => r + r)), n ? `rgb${n.length === 4 ? "a" : ""}(${n.map((r, o) => o < 3 ? parseInt(r, 16) : Math.round(parseInt(r, 16) / 255 * 1e3) / 1e3).join(", ")})` : "";
}
function At(e) {
  if (e.type)
    return e;
  if (e.charAt(0) === "#")
    return At(Cu(e));
  const t = e.indexOf("("), n = e.substring(0, t);
  if (["rgb", "rgba", "hsl", "hsla", "color"].indexOf(n) === -1)
    throw new Error(process.env.NODE_ENV !== "production" ? `MUI: Unsupported \`${e}\` color.
The following formats are supported: #nnn, #nnnnnn, rgb(), rgba(), hsl(), hsla(), color().` : Kt(9, e));
  let r = e.substring(t + 1, e.length - 1), o;
  if (n === "color") {
    if (r = r.split(" "), o = r.shift(), r.length === 4 && r[3].charAt(0) === "/" && (r[3] = r[3].slice(1)), ["srgb", "display-p3", "a98-rgb", "prophoto-rgb", "rec-2020"].indexOf(o) === -1)
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: unsupported \`${o}\` color space.
The following color spaces are supported: srgb, display-p3, a98-rgb, prophoto-rgb, rec-2020.` : Kt(10, o));
  } else
    r = r.split(",");
  return r = r.map((a) => parseFloat(a)), {
    type: n,
    values: r,
    colorSpace: o
  };
}
function Pr(e) {
  const {
    type: t,
    colorSpace: n
  } = e;
  let {
    values: r
  } = e;
  return t.indexOf("rgb") !== -1 ? r = r.map((o, a) => a < 3 ? parseInt(o, 10) : o) : t.indexOf("hsl") !== -1 && (r[1] = `${r[1]}%`, r[2] = `${r[2]}%`), t.indexOf("color") !== -1 ? r = `${n} ${r.join(" ")}` : r = `${r.join(", ")}`, `${t}(${r})`;
}
function Su(e) {
  e = At(e);
  const {
    values: t
  } = e, n = t[0], r = t[1] / 100, o = t[2] / 100, a = r * Math.min(o, 1 - o), i = (d, f = (d + n / 30) % 12) => o - a * Math.max(Math.min(f - 3, 9 - f, 1), -1);
  let l = "rgb";
  const c = [Math.round(i(0) * 255), Math.round(i(8) * 255), Math.round(i(4) * 255)];
  return e.type === "hsla" && (l += "a", c.push(t[3])), Pr({
    type: l,
    values: c
  });
}
function ja(e) {
  e = At(e);
  let t = e.type === "hsl" || e.type === "hsla" ? At(Su(e)).values : e.values;
  return t = t.map((n) => (e.type !== "color" && (n /= 255), n <= 0.03928 ? n / 12.92 : ((n + 0.055) / 1.055) ** 2.4)), Number((0.2126 * t[0] + 0.7152 * t[1] + 0.0722 * t[2]).toFixed(3));
}
function La(e, t) {
  const n = ja(e), r = ja(t);
  return (Math.max(n, r) + 0.05) / (Math.min(n, r) + 0.05);
}
function pr(e, t) {
  return e = At(e), t = Ao(t), (e.type === "rgb" || e.type === "hsl") && (e.type += "a"), e.type === "color" ? e.values[3] = `/${t}` : e.values[3] = t, Pr(e);
}
function Ou(e, t) {
  if (e = At(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] *= 1 - t;
  else if (e.type.indexOf("rgb") !== -1 || e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] *= 1 - t;
  return Pr(e);
}
function Ru(e, t) {
  if (e = At(e), t = Ao(t), e.type.indexOf("hsl") !== -1)
    e.values[2] += (100 - e.values[2]) * t;
  else if (e.type.indexOf("rgb") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (255 - e.values[n]) * t;
  else if (e.type.indexOf("color") !== -1)
    for (let n = 0; n < 3; n += 1)
      e.values[n] += (1 - e.values[n]) * t;
  return Pr(e);
}
function Pu(e, t) {
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
const $u = {
  black: "#000",
  white: "#fff"
}, _n = $u, _u = {
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
}, Mu = _u, Iu = {
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
}, Lt = Iu, Au = {
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
}, Vt = Au, Du = {
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
}, un = Du, Bu = {
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
}, Ft = Bu, ju = {
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
}, zt = ju, Lu = {
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
}, Ut = Lu, Vu = ["mode", "contrastThreshold", "tonalOffset"], Va = {
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
    paper: _n.white,
    default: _n.white
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
}, qr = {
  text: {
    primary: _n.white,
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
    active: _n.white,
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
function Fa(e, t, n, r) {
  const o = r.light || r, a = r.dark || r * 1.5;
  e[t] || (e.hasOwnProperty(n) ? e[t] = e[n] : t === "light" ? e.light = Ru(e.main, o) : t === "dark" && (e.dark = Ou(e.main, a)));
}
function Fu(e = "light") {
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
function zu(e = "light") {
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
function Uu(e = "light") {
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
function Hu(e = "light") {
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
function Gu(e = "light") {
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
function Wu(e = "light") {
  return e === "dark" ? {
    main: un[400],
    light: un[300],
    dark: un[700]
  } : {
    main: "#ed6c02",
    // closest to orange[800] that pass 3:1.
    light: un[500],
    dark: un[900]
  };
}
function Xu(e) {
  const {
    mode: t = "light",
    contrastThreshold: n = 3,
    tonalOffset: r = 0.2
  } = e, o = he(e, Vu), a = e.primary || Fu(t), i = e.secondary || zu(t), l = e.error || Uu(t), c = e.info || Hu(t), d = e.success || Gu(t), f = e.warning || Wu(t);
  function v(u) {
    const b = La(u, qr.text.primary) >= n ? qr.text.primary : Va.text.primary;
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
    lightShade: P = 300,
    darkShade: w = 700
  }) => {
    if (u = R({}, u), !u.main && u[x] && (u.main = u[x]), !u.hasOwnProperty("main"))
      throw new Error(process.env.NODE_ENV !== "production" ? `MUI: The color${b ? ` (${b})` : ""} provided to augmentColor(color) is invalid.
The color object needs to have a \`main\` property or a \`${x}\` property.` : Kt(11, b ? ` (${b})` : "", x));
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
} });` : Kt(12, b ? ` (${b})` : "", JSON.stringify(u.main)));
    return Fa(u, "light", P, r), Fa(u, "dark", w, r), u.contrastText || (u.contrastText = v(u.main)), u;
  }, p = {
    dark: qr,
    light: Va
  };
  return process.env.NODE_ENV !== "production" && (p[t] || console.error(`MUI: The palette mode \`${t}\` is not supported.`)), st(R({
    // A collection of common colors.
    common: R({}, _n),
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
    grey: Mu,
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: n,
    // Takes a background color and returns the text color that maximizes the contrast.
    getContrastText: v,
    // Generate a rich color object.
    augmentColor: g,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: r
  }, p[t]), o);
}
const qu = ["fontFamily", "fontSize", "fontWeightLight", "fontWeightRegular", "fontWeightMedium", "fontWeightBold", "htmlFontSize", "allVariants", "pxToRem"];
function Yu(e) {
  return Math.round(e * 1e5) / 1e5;
}
const za = {
  textTransform: "uppercase"
}, Ua = '"Roboto", "Helvetica", "Arial", sans-serif';
function Ku(e, t) {
  const n = typeof t == "function" ? t(e) : t, {
    fontFamily: r = Ua,
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
  } = n, g = he(n, qu);
  process.env.NODE_ENV !== "production" && (typeof o != "number" && console.error("MUI: `fontSize` is required to be a number."), typeof d != "number" && console.error("MUI: `htmlFontSize` is required to be a number."));
  const p = o / 14, h = v || ((x) => `${x / d * p}rem`), u = (x, P, w, E, y) => R({
    fontFamily: r,
    fontWeight: x,
    fontSize: h(P),
    // Unitless following https://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/
    lineHeight: w
  }, r === Ua ? {
    letterSpacing: `${Yu(E / P)}em`
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
  return st(R({
    htmlFontSize: d,
    pxToRem: h,
    fontFamily: r,
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
const Ju = 0.2, Zu = 0.14, Qu = 0.12;
function be(...e) {
  return [`${e[0]}px ${e[1]}px ${e[2]}px ${e[3]}px rgba(0,0,0,${Ju})`, `${e[4]}px ${e[5]}px ${e[6]}px ${e[7]}px rgba(0,0,0,${Zu})`, `${e[8]}px ${e[9]}px ${e[10]}px ${e[11]}px rgba(0,0,0,${Qu})`].join(",");
}
const ef = ["none", be(0, 2, 1, -1, 0, 1, 1, 0, 0, 1, 3, 0), be(0, 3, 1, -2, 0, 2, 2, 0, 0, 1, 5, 0), be(0, 3, 3, -2, 0, 3, 4, 0, 0, 1, 8, 0), be(0, 2, 4, -1, 0, 4, 5, 0, 0, 1, 10, 0), be(0, 3, 5, -1, 0, 5, 8, 0, 0, 1, 14, 0), be(0, 3, 5, -1, 0, 6, 10, 0, 0, 1, 18, 0), be(0, 4, 5, -2, 0, 7, 10, 1, 0, 2, 16, 1), be(0, 5, 5, -3, 0, 8, 10, 1, 0, 3, 14, 2), be(0, 5, 6, -3, 0, 9, 12, 1, 0, 3, 16, 2), be(0, 6, 6, -3, 0, 10, 14, 1, 0, 4, 18, 3), be(0, 6, 7, -4, 0, 11, 15, 1, 0, 4, 20, 3), be(0, 7, 8, -4, 0, 12, 17, 2, 0, 5, 22, 4), be(0, 7, 8, -4, 0, 13, 19, 2, 0, 5, 24, 4), be(0, 7, 9, -4, 0, 14, 21, 2, 0, 5, 26, 4), be(0, 8, 9, -5, 0, 15, 22, 2, 0, 6, 28, 5), be(0, 8, 10, -5, 0, 16, 24, 2, 0, 6, 30, 5), be(0, 8, 11, -5, 0, 17, 26, 2, 0, 6, 32, 5), be(0, 9, 11, -5, 0, 18, 28, 2, 0, 7, 34, 6), be(0, 9, 12, -6, 0, 19, 29, 2, 0, 7, 36, 6), be(0, 10, 13, -6, 0, 20, 31, 3, 0, 8, 38, 7), be(0, 10, 13, -6, 0, 21, 33, 3, 0, 8, 40, 7), be(0, 10, 14, -6, 0, 22, 35, 3, 0, 8, 42, 7), be(0, 11, 14, -7, 0, 23, 36, 3, 0, 9, 44, 8), be(0, 11, 15, -7, 0, 24, 38, 3, 0, 9, 46, 8)], tf = ef, nf = ["duration", "easing", "delay"], rf = {
  // This is the most common easing curve.
  easeInOut: "cubic-bezier(0.4, 0, 0.2, 1)",
  // Objects enter the screen at full velocity from off-screen and
  // slowly decelerate to a resting point.
  easeOut: "cubic-bezier(0.0, 0, 0.2, 1)",
  // Objects leave the screen at full velocity. They do not decelerate when off-screen.
  easeIn: "cubic-bezier(0.4, 0, 1, 1)",
  // The sharp curve is used by objects that may return to the screen at any time.
  sharp: "cubic-bezier(0.4, 0, 0.6, 1)"
}, of = {
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
function af(e) {
  if (!e)
    return 0;
  const t = e / 36;
  return Math.round((4 + 15 * t ** 0.25 + t / 5) * 10);
}
function sf(e) {
  const t = R({}, rf, e.easing), n = R({}, of, e.duration);
  return R({
    getAutoHeightDuration: af,
    create: (o = ["all"], a = {}) => {
      const {
        duration: i = n.standard,
        easing: l = t.easeInOut,
        delay: c = 0
      } = a, d = he(a, nf);
      if (process.env.NODE_ENV !== "production") {
        const f = (g) => typeof g == "string", v = (g) => !isNaN(parseFloat(g));
        !f(o) && !Array.isArray(o) && console.error('MUI: Argument "props" must be a string or Array.'), !v(i) && !f(i) && console.error(`MUI: Argument "duration" must be a number or a string but found ${i}.`), f(l) || console.error('MUI: Argument "easing" must be a string.'), !v(c) && !f(c) && console.error('MUI: Argument "delay" must be a number or a string.'), typeof a != "object" && console.error(["MUI: Secong argument of transition.create must be an object.", "Arguments should be either `create('prop1', options)` or `create(['prop1', 'prop2'], options)`"].join(`
`)), Object.keys(d).length !== 0 && console.error(`MUI: Unrecognized argument(s) [${Object.keys(d).join(",")}].`);
      }
      return (Array.isArray(o) ? o : [o]).map((f) => `${f} ${typeof i == "string" ? i : Ha(i)} ${l} ${typeof c == "string" ? c : Ha(c)}`).join(",");
    }
  }, e, {
    easing: t,
    duration: n
  });
}
const lf = {
  mobileStepper: 1e3,
  fab: 1050,
  speedDial: 1050,
  appBar: 1100,
  drawer: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500
}, cf = lf, pf = ["breakpoints", "mixins", "spacing", "palette", "transitions", "typography", "shape"];
function df(e = {}, ...t) {
  const {
    mixins: n = {},
    palette: r = {},
    transitions: o = {},
    typography: a = {}
  } = e, i = he(e, pf);
  if (e.vars)
    throw new Error(process.env.NODE_ENV !== "production" ? "MUI: `vars` is a private field used for CSS variables support.\nPlease use another name." : Kt(18));
  const l = Xu(r), c = Io(e);
  let d = st(c, {
    mixins: Pu(c.breakpoints, n),
    palette: l,
    // Don't use [...shadows] until you've verified its transpiled code is not invoking the iterator protocol.
    shadows: tf.slice(),
    typography: Ku(l, a),
    transitions: sf(o),
    zIndex: R({}, cf)
  });
  if (d = st(d, i), d = t.reduce((f, v) => st(f, v), d), process.env.NODE_ENV !== "production") {
    const f = ["active", "checked", "completed", "disabled", "error", "expanded", "focused", "focusVisible", "required", "selected"], v = (g, p) => {
      let h;
      for (h in g) {
        const u = g[h];
        if (f.indexOf(h) !== -1 && Object.keys(u).length > 0) {
          if (process.env.NODE_ENV !== "production") {
            const b = nt("", h);
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
  return d.unstable_sxConfig = R({}, _o, i == null ? void 0 : i.unstable_sxConfig), d.unstable_sx = function(v) {
    return Mo({
      sx: v,
      theme: this
    });
  }, d;
}
const uf = df(), Do = uf, Bo = "$$material";
function ut({
  props: e,
  name: t
}) {
  return Nu({
    props: e,
    name: t,
    defaultTheme: Do,
    themeId: Bo
  });
}
const ys = (e) => er(e) && e !== "classes", ff = ku({
  themeId: Bo,
  defaultTheme: Do,
  rootShouldForwardProp: ys
}), Re = ff;
function mf(e) {
  return nt("MuiSvgIcon", e);
}
wt("MuiSvgIcon", ["root", "colorPrimary", "colorSecondary", "colorAction", "colorError", "colorDisabled", "fontSizeInherit", "fontSizeSmall", "fontSizeMedium", "fontSizeLarge"]);
const hf = ["children", "className", "color", "component", "fontSize", "htmlColor", "inheritViewBox", "titleAccess", "viewBox"], gf = (e) => {
  const {
    color: t,
    fontSize: n,
    classes: r
  } = e, o = {
    root: ["root", t !== "inherit" && `color${et(t)}`, `fontSize${et(n)}`]
  };
  return dt(o, mf, r);
}, bf = Re("svg", {
  name: "MuiSvgIcon",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.color !== "inherit" && t[`color${et(n.color)}`], t[`fontSize${et(n.fontSize)}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n, r, o, a, i, l, c, d, f, v, g, p, h;
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
      large: ((d = e.typography) == null || (f = d.pxToRem) == null ? void 0 : f.call(d, 35)) || "2.1875rem"
    }[t.fontSize],
    // TODO v5 deprecate, v6 remove for sx
    color: (v = (g = (e.vars || e).palette) == null || (g = g[t.color]) == null ? void 0 : g.main) != null ? v : {
      action: (p = (e.vars || e).palette) == null || (p = p.action) == null ? void 0 : p.active,
      disabled: (h = (e.vars || e).palette) == null || (h = h.action) == null ? void 0 : h.disabled,
      inherit: void 0
    }[t.color]
  };
}), jo = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = ut({
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
  } = r, p = he(r, hf), h = /* @__PURE__ */ T.isValidElement(o) && o.type === "svg", u = R({}, r, {
    color: i,
    component: l,
    fontSize: c,
    instanceFontSize: t.fontSize,
    inheritViewBox: f,
    viewBox: g,
    hasSvgAsChild: h
  }), b = {};
  f || (b.viewBox = g);
  const x = gf(u);
  return /* @__PURE__ */ D(bf, R({
    as: l,
    className: Se(x.root, a),
    focusable: "false",
    color: d,
    "aria-hidden": v ? void 0 : !0,
    role: v ? "img" : void 0,
    ref: n
  }, b, p, h && o.props, {
    ownerState: u,
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
function ws(e, t) {
  function n(r, o) {
    return /* @__PURE__ */ m(Ga, R({
      "data-testid": `${t}Icon`,
      ref: o
    }, r, {
      children: e
    }));
  }
  return process.env.NODE_ENV !== "production" && (n.displayName = `${t}Icon`), n.muiName = Ga.muiName, /* @__PURE__ */ T.memo(/* @__PURE__ */ T.forwardRef(n));
}
const vf = {
  configure: (e) => {
    process.env.NODE_ENV !== "production" && console.warn(["MUI: `ClassNameGenerator` import from `@mui/material/utils` is outdated and might cause unexpected issues.", "", "You should use `import { unstable_ClassNameGenerator } from '@mui/material/className'` instead", "", "The detail of the issue: https://github.com/mui/material-ui/issues/30011#issuecomment-1024993401", "", "The updated documentation: https://mui.com/guides/classname-generator/"].join(`
`)), us.configure(e);
  }
}, yf = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  capitalize: et,
  createChainedFunction: so,
  createSvgIcon: ws,
  debounce: rs,
  deprecatedPropType: qp,
  isMuiElement: Yp,
  ownerDocument: Oe,
  ownerWindow: Jt,
  requirePropFactory: Kp,
  setRef: lr,
  unstable_ClassNameGenerator: vf,
  unstable_useEnhancedEffect: It,
  unstable_useId: os,
  unsupportedProp: Qp,
  useControlled: as,
  useEventCallback: $n,
  useForkRef: We,
  useIsFocusVisible: is
}, Symbol.toStringTag, { value: "Module" })), wf = /* @__PURE__ */ Cp(yf);
var Wa;
function xf() {
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
    var t = wf;
  }(Vr)), Vr;
}
var Ef = Sp;
Object.defineProperty(So, "__esModule", {
  value: !0
});
var xs = So.default = void 0, kf = Ef(xf()), Tf = Ll;
xs = So.default = (0, kf.default)(/* @__PURE__ */ (0, Tf.jsx)("path", {
  d: "m10 17 5-5-5-5z"
}), "ArrowRight");
function Es(e) {
  return typeof e == "string";
}
function yn(e, t, n) {
  return e === void 0 || Es(e) ? t : R({}, t, {
    ownerState: R({}, t.ownerState, n)
  });
}
const Nf = {
  disableDefaultClasses: !1
}, Cf = /* @__PURE__ */ T.createContext(Nf);
function Sf(e) {
  const {
    disableDefaultClasses: t
  } = T.useContext(Cf);
  return (n) => t ? "" : e(n);
}
function ks(e, t = []) {
  if (e === void 0)
    return {};
  const n = {};
  return Object.keys(e).filter((r) => r.match(/^on[A-Z]/) && typeof e[r] == "function" && !t.includes(r)).forEach((r) => {
    n[r] = e[r];
  }), n;
}
function Of(e, t, n) {
  return typeof e == "function" ? e(t, n) : e;
}
function Xa(e) {
  if (e === void 0)
    return {};
  const t = {};
  return Object.keys(e).filter((n) => !(n.match(/^on[A-Z]/) && typeof e[n] == "function")).forEach((n) => {
    t[n] = e[n];
  }), t;
}
function Rf(e) {
  const {
    getSlotProps: t,
    additionalProps: n,
    externalSlotProps: r,
    externalForwardedProps: o,
    className: a
  } = e;
  if (!t) {
    const p = Se(n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), h = R({}, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), u = R({}, n, o, r);
    return p.length > 0 && (u.className = p), Object.keys(h).length > 0 && (u.style = h), {
      props: u,
      internalRef: void 0
    };
  }
  const i = ks(R({}, o, r)), l = Xa(r), c = Xa(o), d = t(i), f = Se(d == null ? void 0 : d.className, n == null ? void 0 : n.className, a, o == null ? void 0 : o.className, r == null ? void 0 : r.className), v = R({}, d == null ? void 0 : d.style, n == null ? void 0 : n.style, o == null ? void 0 : o.style, r == null ? void 0 : r.style), g = R({}, d, n, c, l);
  return f.length > 0 && (g.className = f), Object.keys(v).length > 0 && (g.style = v), {
    props: g,
    internalRef: d.ref
  };
}
const Pf = ["elementType", "externalSlotProps", "ownerState", "skipResolvingSlotProps"];
function Dt(e) {
  var t;
  const {
    elementType: n,
    externalSlotProps: r,
    ownerState: o,
    skipResolvingSlotProps: a = !1
  } = e, i = he(e, Pf), l = a ? {} : Of(r, o), {
    props: c,
    internalRef: d
  } = Rf(R({}, i, {
    externalSlotProps: l
  })), f = We(d, l == null ? void 0 : l.ref, (t = e.additionalProps) == null ? void 0 : t.ref);
  return yn(n, R({}, c, {
    ref: f
  }), o);
}
const Ts = "base";
function $f(e) {
  return `${Ts}--${e}`;
}
function _f(e, t) {
  return `${Ts}-${e}-${t}`;
}
function Ns(e, t) {
  const n = fs[t];
  return n ? $f(n) : _f(e, t);
}
function Mf(e, t) {
  const n = {};
  return t.forEach((r) => {
    n[r] = Ns(e, r);
  }), n;
}
const If = ["input", "select", "textarea", "a[href]", "button", "[tabindex]", "audio[controls]", "video[controls]", '[contenteditable]:not([contenteditable="false"])'].join(",");
function Af(e) {
  const t = parseInt(e.getAttribute("tabindex") || "", 10);
  return Number.isNaN(t) ? e.contentEditable === "true" || (e.nodeName === "AUDIO" || e.nodeName === "VIDEO" || e.nodeName === "DETAILS") && e.getAttribute("tabindex") === null ? 0 : e.tabIndex : t;
}
function Df(e) {
  if (e.tagName !== "INPUT" || e.type !== "radio" || !e.name)
    return !1;
  const t = (r) => e.ownerDocument.querySelector(`input[type="radio"]${r}`);
  let n = t(`[name="${e.name}"]:checked`);
  return n || (n = t(`[name="${e.name}"]`)), n !== e;
}
function Bf(e) {
  return !(e.disabled || e.tagName === "INPUT" && e.type === "hidden" || Df(e));
}
function jf(e) {
  const t = [], n = [];
  return Array.from(e.querySelectorAll(If)).forEach((r, o) => {
    const a = Af(r);
    a === -1 || !Bf(r) || (a === 0 ? t.push(r) : n.push({
      documentOrder: o,
      tabIndex: a,
      node: r
    }));
  }), n.sort((r, o) => r.tabIndex === o.tabIndex ? r.documentOrder - o.documentOrder : r.tabIndex - o.tabIndex).map((r) => r.node).concat(t);
}
function Lf() {
  return !0;
}
function dr(e) {
  const {
    children: t,
    disableAutoFocus: n = !1,
    disableEnforceFocus: r = !1,
    disableRestoreFocus: o = !1,
    getTabbable: a = jf,
    isEnabled: i = Lf,
    open: l
  } = e, c = T.useRef(!1), d = T.useRef(null), f = T.useRef(null), v = T.useRef(null), g = T.useRef(null), p = T.useRef(!1), h = T.useRef(null), u = We(t.ref, h), b = T.useRef(null);
  T.useEffect(() => {
    !l || !h.current || (p.current = !n);
  }, [n, l]), T.useEffect(() => {
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
    const w = Oe(h.current), E = (N) => {
      b.current = N, !(r || !i() || N.key !== "Tab") && w.activeElement === h.current && N.shiftKey && (c.current = !0, f.current && f.current.focus());
    }, y = () => {
      const N = h.current;
      if (N === null)
        return;
      if (!w.hasFocus() || !i() || c.current) {
        c.current = !1;
        return;
      }
      if (N.contains(w.activeElement) || r && w.activeElement !== d.current && w.activeElement !== f.current)
        return;
      if (w.activeElement !== g.current)
        g.current = null;
      else if (g.current !== null)
        return;
      if (!p.current)
        return;
      let I = [];
      if ((w.activeElement === d.current || w.activeElement === f.current) && (I = a(h.current)), I.length > 0) {
        var B, V;
        const k = !!((B = b.current) != null && B.shiftKey && ((V = b.current) == null ? void 0 : V.key) === "Tab"), S = I[0], $ = I[I.length - 1];
        typeof S != "string" && typeof $ != "string" && (k ? $.focus() : S.focus());
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
  }, [n, r, o, i, l, a]);
  const x = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0, g.current = w.target;
    const E = t.props.onFocus;
    E && E(w);
  }, P = (w) => {
    v.current === null && (v.current = w.relatedTarget), p.current = !0;
  };
  return /* @__PURE__ */ D(T.Fragment, {
    children: [/* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: P,
      ref: d,
      "data-testid": "sentinelStart"
    }), /* @__PURE__ */ T.cloneElement(t, {
      ref: u,
      onFocus: x
    }), /* @__PURE__ */ m("div", {
      tabIndex: l ? 0 : -1,
      onFocus: P,
      ref: f,
      "data-testid": "sentinelEnd"
    })]
  });
}
process.env.NODE_ENV !== "production" && (dr.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * A single child content element.
   */
  children: Bn,
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
process.env.NODE_ENV !== "production" && (dr["propTypes"] = ts(dr.propTypes));
function Vf(e) {
  return typeof e == "function" ? e() : e;
}
const Mn = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    children: r,
    container: o,
    disablePortal: a = !1
  } = t, [i, l] = T.useState(null), c = We(/* @__PURE__ */ T.isValidElement(r) ? r.ref : null, n);
  if (It(() => {
    a || l(Vf(o) || document.body);
  }, [o, a]), It(() => {
    if (i && !a)
      return lr(n, i), () => {
        lr(n, null);
      };
  }, [n, i, a]), a) {
    if (/* @__PURE__ */ T.isValidElement(r)) {
      const d = {
        ref: c
      };
      return /* @__PURE__ */ T.cloneElement(r, d);
    }
    return /* @__PURE__ */ m(T.Fragment, {
      children: r
    });
  }
  return /* @__PURE__ */ m(T.Fragment, {
    children: i && /* @__PURE__ */ Pc.createPortal(r, i)
  });
});
process.env.NODE_ENV !== "production" && (Mn.propTypes = {
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
process.env.NODE_ENV !== "production" && (Mn["propTypes"] = ts(Mn.propTypes));
function Ff(e) {
  const t = Oe(e);
  return t.body === e ? Jt(e).innerWidth > t.documentElement.clientWidth : e.scrollHeight > e.clientHeight;
}
function Tn(e, t) {
  t ? e.setAttribute("aria-hidden", "true") : e.removeAttribute("aria-hidden");
}
function qa(e) {
  return parseInt(Jt(e).getComputedStyle(e).paddingRight, 10) || 0;
}
function zf(e) {
  const n = ["TEMPLATE", "SCRIPT", "STYLE", "LINK", "MAP", "META", "NOSCRIPT", "PICTURE", "COL", "COLGROUP", "PARAM", "SLOT", "SOURCE", "TRACK"].indexOf(e.tagName) !== -1, r = e.tagName === "INPUT" && e.getAttribute("type") === "hidden";
  return n || r;
}
function Ya(e, t, n, r, o) {
  const a = [t, n, ...r];
  [].forEach.call(e.children, (i) => {
    const l = a.indexOf(i) === -1, c = !zf(i);
    l && c && Tn(i, o);
  });
}
function Yr(e, t) {
  let n = -1;
  return e.some((r, o) => t(r) ? (n = o, !0) : !1), n;
}
function Uf(e, t) {
  const n = [], r = e.container;
  if (!t.disableScrollLock) {
    if (Ff(r)) {
      const i = ss(Oe(r));
      n.push({
        value: r.style.paddingRight,
        property: "padding-right",
        el: r
      }), r.style.paddingRight = `${qa(r) + i}px`;
      const l = Oe(r).querySelectorAll(".mui-fixed");
      [].forEach.call(l, (c) => {
        n.push({
          value: c.style.paddingRight,
          property: "padding-right",
          el: c
        }), c.style.paddingRight = `${qa(c) + i}px`;
      });
    }
    let a;
    if (r.parentNode instanceof DocumentFragment)
      a = Oe(r).body;
    else {
      const i = r.parentElement, l = Jt(r);
      a = (i == null ? void 0 : i.nodeName) === "HTML" && l.getComputedStyle(i).overflowY === "scroll" ? i : r;
    }
    n.push({
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
    n.forEach(({
      value: a,
      el: i,
      property: l
    }) => {
      a ? i.style.setProperty(l, a) : i.style.removeProperty(l);
    });
  };
}
function Hf(e) {
  const t = [];
  return [].forEach.call(e.children, (n) => {
    n.getAttribute("aria-hidden") === "true" && t.push(n);
  }), t;
}
class Gf {
  constructor() {
    this.containers = void 0, this.modals = void 0, this.modals = [], this.containers = [];
  }
  add(t, n) {
    let r = this.modals.indexOf(t);
    if (r !== -1)
      return r;
    r = this.modals.length, this.modals.push(t), t.modalRef && Tn(t.modalRef, !1);
    const o = Hf(n);
    Ya(n, t.mount, t.modalRef, o, !0);
    const a = Yr(this.containers, (i) => i.container === n);
    return a !== -1 ? (this.containers[a].modals.push(t), r) : (this.containers.push({
      modals: [t],
      container: n,
      restore: null,
      hiddenSiblings: o
    }), r);
  }
  mount(t, n) {
    const r = Yr(this.containers, (a) => a.modals.indexOf(t) !== -1), o = this.containers[r];
    o.restore || (o.restore = Uf(o, n));
  }
  remove(t, n = !0) {
    const r = this.modals.indexOf(t);
    if (r === -1)
      return r;
    const o = Yr(this.containers, (i) => i.modals.indexOf(t) !== -1), a = this.containers[o];
    if (a.modals.splice(a.modals.indexOf(t), 1), this.modals.splice(r, 1), a.modals.length === 0)
      a.restore && a.restore(), t.modalRef && Tn(t.modalRef, n), Ya(a.container, t.mount, t.modalRef, a.hiddenSiblings, !1), this.containers.splice(o, 1);
    else {
      const i = a.modals[a.modals.length - 1];
      i.modalRef && Tn(i.modalRef, !1);
    }
    return r;
  }
  isTopModal(t) {
    return this.modals.length > 0 && this.modals[this.modals.length - 1] === t;
  }
}
function Wf(e) {
  return typeof e == "function" ? e() : e;
}
function Xf(e) {
  return e ? e.props.hasOwnProperty("in") : !1;
}
const qf = new Gf();
function Yf(e) {
  const {
    container: t,
    disableEscapeKeyDown: n = !1,
    disableScrollLock: r = !1,
    // @ts-ignore internal logic - Base UI supports the manager as a prop too
    manager: o = qf,
    closeAfterTransition: a = !1,
    onTransitionEnter: i,
    onTransitionExited: l,
    children: c,
    onClose: d,
    open: f,
    rootRef: v
  } = e, g = T.useRef({}), p = T.useRef(null), h = T.useRef(null), u = We(h, v), [b, x] = T.useState(!f), P = Xf(c);
  let w = !0;
  (e["aria-hidden"] === "false" || e["aria-hidden"] === !1) && (w = !1);
  const E = () => Oe(p.current), y = () => (g.current.modalRef = h.current, g.current.mount = p.current, g.current), C = () => {
    o.mount(y(), {
      disableScrollLock: r
    }), h.current && (h.current.scrollTop = 0);
  }, N = $n(() => {
    const _ = Wf(t) || E().body;
    o.add(y(), _), h.current && C();
  }), I = T.useCallback(() => o.isTopModal(y()), [o]), B = $n((_) => {
    p.current = _, _ && (f && I() ? C() : h.current && Tn(h.current, w));
  }), V = T.useCallback(() => {
    o.remove(y(), w);
  }, [w, o]);
  T.useEffect(() => () => {
    V();
  }, [V]), T.useEffect(() => {
    f ? N() : (!P || !a) && V();
  }, [f, V, P, a, N]);
  const k = (_) => (z) => {
    var te;
    (te = _.onKeyDown) == null || te.call(_, z), !(z.key !== "Escape" || z.which === 229 || // Wait until IME is settled.
    !I()) && (n || (z.stopPropagation(), d && d(z, "escapeKeyDown")));
  }, S = (_) => (z) => {
    var te;
    (te = _.onClick) == null || te.call(_, z), z.target === z.currentTarget && d && d(z, "backdropClick");
  };
  return {
    getRootProps: (_ = {}) => {
      const z = ks(e);
      delete z.onTransitionEnter, delete z.onTransitionExited;
      const te = R({}, z, _);
      return R({
        role: "presentation"
      }, te, {
        onKeyDown: k(te),
        ref: u
      });
    },
    getBackdropProps: (_ = {}) => {
      const z = _;
      return R({
        "aria-hidden": !0
      }, z, {
        onClick: S(z),
        open: f
      });
    },
    getTransitionProps: () => {
      const _ = () => {
        x(!1), i && i();
      }, z = () => {
        x(!0), l && l(), a && V();
      };
      return {
        onEnter: so(_, c == null ? void 0 : c.props.onEnter),
        onExited: so(z, c == null ? void 0 : c.props.onExited)
      };
    },
    rootRef: u,
    portalRef: B,
    isTopModal: I,
    exited: b,
    hasTransition: P
  };
}
var Me = "top", Xe = "bottom", qe = "right", Ie = "left", Lo = "auto", Fn = [Me, Xe, qe, Ie], Zt = "start", In = "end", Kf = "clippingParents", Cs = "viewport", fn = "popper", Jf = "reference", Ka = /* @__PURE__ */ Fn.reduce(function(e, t) {
  return e.concat([t + "-" + Zt, t + "-" + In]);
}, []), Ss = /* @__PURE__ */ [].concat(Fn, [Lo]).reduce(function(e, t) {
  return e.concat([t, t + "-" + Zt, t + "-" + In]);
}, []), Zf = "beforeRead", Qf = "read", em = "afterRead", tm = "beforeMain", nm = "main", rm = "afterMain", om = "beforeWrite", am = "write", im = "afterWrite", sm = [Zf, Qf, em, tm, nm, rm, om, am, im];
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
function lm(e) {
  var t = e.state;
  Object.keys(t.elements).forEach(function(n) {
    var r = t.styles[n] || {}, o = t.attributes[n] || {}, a = t.elements[n];
    !Ge(a) || !tt(a) || (Object.assign(a.style, r), Object.keys(o).forEach(function(i) {
      var l = o[i];
      l === !1 ? a.removeAttribute(i) : a.setAttribute(i, l === !0 ? "" : l);
    }));
  });
}
function cm(e) {
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
      !Ge(o) || !tt(o) || (Object.assign(o.style, l), Object.keys(a).forEach(function(c) {
        o.removeAttribute(c);
      }));
    });
  };
}
const pm = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: lm,
  effect: cm,
  requires: ["computeStyles"]
};
function Ze(e) {
  return e.split("-")[0];
}
var _t = Math.max, ur = Math.min, Qt = Math.round;
function po() {
  var e = navigator.userAgentData;
  return e != null && e.brands && Array.isArray(e.brands) ? e.brands.map(function(t) {
    return t.brand + "/" + t.version;
  }).join(" ") : navigator.userAgent;
}
function Os() {
  return !/^((?!chrome|android).)*safari/i.test(po());
}
function en(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !1);
  var r = e.getBoundingClientRect(), o = 1, a = 1;
  t && Ge(e) && (o = e.offsetWidth > 0 && Qt(r.width) / e.offsetWidth || 1, a = e.offsetHeight > 0 && Qt(r.height) / e.offsetHeight || 1);
  var i = Bt(e) ? ze(e) : window, l = i.visualViewport, c = !Os() && n, d = (r.left + (c && l ? l.offsetLeft : 0)) / o, f = (r.top + (c && l ? l.offsetTop : 0)) / a, v = r.width / o, g = r.height / a;
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
function Fo(e) {
  var t = en(e), n = e.offsetWidth, r = e.offsetHeight;
  return Math.abs(t.width - n) <= 1 && (n = t.width), Math.abs(t.height - r) <= 1 && (r = t.height), {
    x: e.offsetLeft,
    y: e.offsetTop,
    width: n,
    height: r
  };
}
function Rs(e, t) {
  var n = t.getRootNode && t.getRootNode();
  if (e.contains(t))
    return !0;
  if (n && Vo(n)) {
    var r = t;
    do {
      if (r && e.isSameNode(r))
        return !0;
      r = r.parentNode || r.host;
    } while (r);
  }
  return !1;
}
function pt(e) {
  return ze(e).getComputedStyle(e);
}
function dm(e) {
  return ["table", "td", "th"].indexOf(tt(e)) >= 0;
}
function Et(e) {
  return ((Bt(e) ? e.ownerDocument : (
    // $FlowFixMe[prop-missing]
    e.document
  )) || window.document).documentElement;
}
function $r(e) {
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
function um(e) {
  var t = /firefox/i.test(po()), n = /Trident/i.test(po());
  if (n && Ge(e)) {
    var r = pt(e);
    if (r.position === "fixed")
      return null;
  }
  var o = $r(e);
  for (Vo(o) && (o = o.host); Ge(o) && ["html", "body"].indexOf(tt(o)) < 0; ) {
    var a = pt(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || t && a.willChange === "filter" || t && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function zn(e) {
  for (var t = ze(e), n = Ja(e); n && dm(n) && pt(n).position === "static"; )
    n = Ja(n);
  return n && (tt(n) === "html" || tt(n) === "body" && pt(n).position === "static") ? t : n || um(e) || t;
}
function zo(e) {
  return ["top", "bottom"].indexOf(e) >= 0 ? "x" : "y";
}
function Nn(e, t, n) {
  return _t(e, ur(t, n));
}
function fm(e, t, n) {
  var r = Nn(e, t, n);
  return r > n ? n : r;
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
  return t.reduce(function(n, r) {
    return n[r] = e, n;
  }, {});
}
var mm = function(t, n) {
  return t = typeof t == "function" ? t(Object.assign({}, n.rects, {
    placement: n.placement
  })) : t, $s(typeof t != "number" ? t : _s(t, Fn));
};
function hm(e) {
  var t, n = e.state, r = e.name, o = e.options, a = n.elements.arrow, i = n.modifiersData.popperOffsets, l = Ze(n.placement), c = zo(l), d = [Ie, qe].indexOf(l) >= 0, f = d ? "height" : "width";
  if (!(!a || !i)) {
    var v = mm(o.padding, n), g = Fo(a), p = c === "y" ? Me : Ie, h = c === "y" ? Xe : qe, u = n.rects.reference[f] + n.rects.reference[c] - i[c] - n.rects.popper[f], b = i[c] - n.rects.reference[c], x = zn(a), P = x ? c === "y" ? x.clientHeight || 0 : x.clientWidth || 0 : 0, w = u / 2 - b / 2, E = v[p], y = P - g[f] - v[h], C = P / 2 - g[f] / 2 + w, N = Nn(E, C, y), I = c;
    n.modifiersData[r] = (t = {}, t[I] = N, t.centerOffset = N - C, t);
  }
}
function gm(e) {
  var t = e.state, n = e.options, r = n.element, o = r === void 0 ? "[data-popper-arrow]" : r;
  o != null && (typeof o == "string" && (o = t.elements.popper.querySelector(o), !o) || Rs(t.elements.popper, o) && (t.elements.arrow = o));
}
const bm = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: hm,
  effect: gm,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function tn(e) {
  return e.split("-")[1];
}
var vm = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function ym(e, t) {
  var n = e.x, r = e.y, o = t.devicePixelRatio || 1;
  return {
    x: Qt(n * o) / o || 0,
    y: Qt(r * o) / o || 0
  };
}
function Za(e) {
  var t, n = e.popper, r = e.popperRect, o = e.placement, a = e.variation, i = e.offsets, l = e.position, c = e.gpuAcceleration, d = e.adaptive, f = e.roundOffsets, v = e.isFixed, g = i.x, p = g === void 0 ? 0 : g, h = i.y, u = h === void 0 ? 0 : h, b = typeof f == "function" ? f({
    x: p,
    y: u
  }) : {
    x: p,
    y: u
  };
  p = b.x, u = b.y;
  var x = i.hasOwnProperty("x"), P = i.hasOwnProperty("y"), w = Ie, E = Me, y = window;
  if (d) {
    var C = zn(n), N = "clientHeight", I = "clientWidth";
    if (C === ze(n) && (C = Et(n), pt(C).position !== "static" && l === "absolute" && (N = "scrollHeight", I = "scrollWidth")), C = C, o === Me || (o === Ie || o === qe) && a === In) {
      E = Xe;
      var B = v && C === y && y.visualViewport ? y.visualViewport.height : (
        // $FlowFixMe[prop-missing]
        C[N]
      );
      u -= B - r.height, u *= c ? 1 : -1;
    }
    if (o === Ie || (o === Me || o === Xe) && a === In) {
      w = qe;
      var V = v && C === y && y.visualViewport ? y.visualViewport.width : (
        // $FlowFixMe[prop-missing]
        C[I]
      );
      p -= V - r.width, p *= c ? 1 : -1;
    }
  }
  var k = Object.assign({
    position: l
  }, d && vm), S = f === !0 ? ym({
    x: p,
    y: u
  }, ze(n)) : {
    x: p,
    y: u
  };
  if (p = S.x, u = S.y, c) {
    var $;
    return Object.assign({}, k, ($ = {}, $[E] = P ? "0" : "", $[w] = x ? "0" : "", $.transform = (y.devicePixelRatio || 1) <= 1 ? "translate(" + p + "px, " + u + "px)" : "translate3d(" + p + "px, " + u + "px, 0)", $));
  }
  return Object.assign({}, k, (t = {}, t[E] = P ? u + "px" : "", t[w] = x ? p + "px" : "", t.transform = "", t));
}
function wm(e) {
  var t = e.state, n = e.options, r = n.gpuAcceleration, o = r === void 0 ? !0 : r, a = n.adaptive, i = a === void 0 ? !0 : a, l = n.roundOffsets, c = l === void 0 ? !0 : l, d = {
    placement: Ze(t.placement),
    variation: tn(t.placement),
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
const xm = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: wm,
  data: {}
};
var Kn = {
  passive: !0
};
function Em(e) {
  var t = e.state, n = e.instance, r = e.options, o = r.scroll, a = o === void 0 ? !0 : o, i = r.resize, l = i === void 0 ? !0 : i, c = ze(t.elements.popper), d = [].concat(t.scrollParents.reference, t.scrollParents.popper);
  return a && d.forEach(function(f) {
    f.addEventListener("scroll", n.update, Kn);
  }), l && c.addEventListener("resize", n.update, Kn), function() {
    a && d.forEach(function(f) {
      f.removeEventListener("scroll", n.update, Kn);
    }), l && c.removeEventListener("resize", n.update, Kn);
  };
}
const km = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Em,
  data: {}
};
var Tm = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function nr(e) {
  return e.replace(/left|right|bottom|top/g, function(t) {
    return Tm[t];
  });
}
var Nm = {
  start: "end",
  end: "start"
};
function Qa(e) {
  return e.replace(/start|end/g, function(t) {
    return Nm[t];
  });
}
function Uo(e) {
  var t = ze(e), n = t.pageXOffset, r = t.pageYOffset;
  return {
    scrollLeft: n,
    scrollTop: r
  };
}
function Ho(e) {
  return en(Et(e)).left + Uo(e).scrollLeft;
}
function Cm(e, t) {
  var n = ze(e), r = Et(e), o = n.visualViewport, a = r.clientWidth, i = r.clientHeight, l = 0, c = 0;
  if (o) {
    a = o.width, i = o.height;
    var d = Os();
    (d || !d && t === "fixed") && (l = o.offsetLeft, c = o.offsetTop);
  }
  return {
    width: a,
    height: i,
    x: l + Ho(e),
    y: c
  };
}
function Sm(e) {
  var t, n = Et(e), r = Uo(e), o = (t = e.ownerDocument) == null ? void 0 : t.body, a = _t(n.scrollWidth, n.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), i = _t(n.scrollHeight, n.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), l = -r.scrollLeft + Ho(e), c = -r.scrollTop;
  return pt(o || n).direction === "rtl" && (l += _t(n.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: i,
    x: l,
    y: c
  };
}
function Go(e) {
  var t = pt(e), n = t.overflow, r = t.overflowX, o = t.overflowY;
  return /auto|scroll|overlay|hidden/.test(n + o + r);
}
function Ms(e) {
  return ["html", "body", "#document"].indexOf(tt(e)) >= 0 ? e.ownerDocument.body : Ge(e) && Go(e) ? e : Ms($r(e));
}
function Cn(e, t) {
  var n;
  t === void 0 && (t = []);
  var r = Ms(e), o = r === ((n = e.ownerDocument) == null ? void 0 : n.body), a = ze(r), i = o ? [a].concat(a.visualViewport || [], Go(r) ? r : []) : r, l = t.concat(i);
  return o ? l : (
    // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
    l.concat(Cn($r(i)))
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
function Om(e, t) {
  var n = en(e, !1, t === "fixed");
  return n.top = n.top + e.clientTop, n.left = n.left + e.clientLeft, n.bottom = n.top + e.clientHeight, n.right = n.left + e.clientWidth, n.width = e.clientWidth, n.height = e.clientHeight, n.x = n.left, n.y = n.top, n;
}
function ei(e, t, n) {
  return t === Cs ? uo(Cm(e, n)) : Bt(t) ? Om(t, n) : uo(Sm(Et(e)));
}
function Rm(e) {
  var t = Cn($r(e)), n = ["absolute", "fixed"].indexOf(pt(e).position) >= 0, r = n && Ge(e) ? zn(e) : e;
  return Bt(r) ? t.filter(function(o) {
    return Bt(o) && Rs(o, r) && tt(o) !== "body";
  }) : [];
}
function Pm(e, t, n, r) {
  var o = t === "clippingParents" ? Rm(e) : [].concat(t), a = [].concat(o, [n]), i = a[0], l = a.reduce(function(c, d) {
    var f = ei(e, d, r);
    return c.top = _t(f.top, c.top), c.right = ur(f.right, c.right), c.bottom = ur(f.bottom, c.bottom), c.left = _t(f.left, c.left), c;
  }, ei(e, i, r));
  return l.width = l.right - l.left, l.height = l.bottom - l.top, l.x = l.left, l.y = l.top, l;
}
function Is(e) {
  var t = e.reference, n = e.element, r = e.placement, o = r ? Ze(r) : null, a = r ? tn(r) : null, i = t.x + t.width / 2 - n.width / 2, l = t.y + t.height / 2 - n.height / 2, c;
  switch (o) {
    case Me:
      c = {
        x: i,
        y: t.y - n.height
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
  var d = o ? zo(o) : null;
  if (d != null) {
    var f = d === "y" ? "height" : "width";
    switch (a) {
      case Zt:
        c[d] = c[d] - (t[f] / 2 - n[f] / 2);
        break;
      case In:
        c[d] = c[d] + (t[f] / 2 - n[f] / 2);
        break;
    }
  }
  return c;
}
function An(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = r === void 0 ? e.placement : r, a = n.strategy, i = a === void 0 ? e.strategy : a, l = n.boundary, c = l === void 0 ? Kf : l, d = n.rootBoundary, f = d === void 0 ? Cs : d, v = n.elementContext, g = v === void 0 ? fn : v, p = n.altBoundary, h = p === void 0 ? !1 : p, u = n.padding, b = u === void 0 ? 0 : u, x = $s(typeof b != "number" ? b : _s(b, Fn)), P = g === fn ? Jf : fn, w = e.rects.popper, E = e.elements[h ? P : g], y = Pm(Bt(E) ? E : E.contextElement || Et(e.elements.popper), c, f, i), C = en(e.elements.reference), N = Is({
    reference: C,
    element: w,
    strategy: "absolute",
    placement: o
  }), I = uo(Object.assign({}, w, N)), B = g === fn ? I : C, V = {
    top: y.top - B.top + x.top,
    bottom: B.bottom - y.bottom + x.bottom,
    left: y.left - B.left + x.left,
    right: B.right - y.right + x.right
  }, k = e.modifiersData.offset;
  if (g === fn && k) {
    var S = k[o];
    Object.keys(V).forEach(function($) {
      var F = [qe, Xe].indexOf($) >= 0 ? 1 : -1, H = [Me, Xe].indexOf($) >= 0 ? "y" : "x";
      V[$] += S[H] * F;
    });
  }
  return V;
}
function $m(e, t) {
  t === void 0 && (t = {});
  var n = t, r = n.placement, o = n.boundary, a = n.rootBoundary, i = n.padding, l = n.flipVariations, c = n.allowedAutoPlacements, d = c === void 0 ? Ss : c, f = tn(r), v = f ? l ? Ka : Ka.filter(function(h) {
    return tn(h) === f;
  }) : Fn, g = v.filter(function(h) {
    return d.indexOf(h) >= 0;
  });
  g.length === 0 && (g = v);
  var p = g.reduce(function(h, u) {
    return h[u] = An(e, {
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
function _m(e) {
  if (Ze(e) === Lo)
    return [];
  var t = nr(e);
  return [Qa(e), t, Qa(t)];
}
function Mm(e) {
  var t = e.state, n = e.options, r = e.name;
  if (!t.modifiersData[r]._skip) {
    for (var o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !0 : i, c = n.fallbackPlacements, d = n.padding, f = n.boundary, v = n.rootBoundary, g = n.altBoundary, p = n.flipVariations, h = p === void 0 ? !0 : p, u = n.allowedAutoPlacements, b = t.options.placement, x = Ze(b), P = x === b, w = c || (P || !h ? [nr(b)] : _m(b)), E = [b].concat(w).reduce(function(W, X) {
      return W.concat(Ze(X) === Lo ? $m(t, {
        placement: X,
        boundary: f,
        rootBoundary: v,
        padding: d,
        flipVariations: h,
        allowedAutoPlacements: u
      }) : X);
    }, []), y = t.rects.reference, C = t.rects.popper, N = /* @__PURE__ */ new Map(), I = !0, B = E[0], V = 0; V < E.length; V++) {
      var k = E[V], S = Ze(k), $ = tn(k) === Zt, F = [Me, Xe].indexOf(S) >= 0, H = F ? "width" : "height", _ = An(t, {
        placement: k,
        boundary: f,
        rootBoundary: v,
        altBoundary: g,
        padding: d
      }), z = F ? $ ? qe : Ie : $ ? Xe : Me;
      y[H] > C[H] && (z = nr(z));
      var te = nr(z), Q = [];
      if (a && Q.push(_[S] <= 0), l && Q.push(_[z] <= 0, _[te] <= 0), Q.every(function(W) {
        return W;
      })) {
        B = k, I = !1;
        break;
      }
      N.set(k, Q);
    }
    if (I)
      for (var O = h ? 3 : 1, M = function(X) {
        var K = E.find(function(J) {
          var q = N.get(J);
          if (q)
            return q.slice(0, X).every(function(Z) {
              return Z;
            });
        });
        if (K)
          return B = K, "break";
      }, U = O; U > 0; U--) {
        var Y = M(U);
        if (Y === "break")
          break;
      }
    t.placement !== B && (t.modifiersData[r]._skip = !0, t.placement = B, t.reset = !0);
  }
}
const Im = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: Mm,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function ti(e, t, n) {
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
function ni(e) {
  return [Me, qe, Xe, Ie].some(function(t) {
    return e[t] >= 0;
  });
}
function Am(e) {
  var t = e.state, n = e.name, r = t.rects.reference, o = t.rects.popper, a = t.modifiersData.preventOverflow, i = An(t, {
    elementContext: "reference"
  }), l = An(t, {
    altBoundary: !0
  }), c = ti(i, r), d = ti(l, o, a), f = ni(c), v = ni(d);
  t.modifiersData[n] = {
    referenceClippingOffsets: c,
    popperEscapeOffsets: d,
    isReferenceHidden: f,
    hasPopperEscaped: v
  }, t.attributes.popper = Object.assign({}, t.attributes.popper, {
    "data-popper-reference-hidden": f,
    "data-popper-escaped": v
  });
}
const Dm = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: Am
};
function Bm(e, t, n) {
  var r = Ze(e), o = [Ie, Me].indexOf(r) >= 0 ? -1 : 1, a = typeof n == "function" ? n(Object.assign({}, t, {
    placement: e
  })) : n, i = a[0], l = a[1];
  return i = i || 0, l = (l || 0) * o, [Ie, qe].indexOf(r) >= 0 ? {
    x: l,
    y: i
  } : {
    x: i,
    y: l
  };
}
function jm(e) {
  var t = e.state, n = e.options, r = e.name, o = n.offset, a = o === void 0 ? [0, 0] : o, i = Ss.reduce(function(f, v) {
    return f[v] = Bm(v, t.rects, a), f;
  }, {}), l = i[t.placement], c = l.x, d = l.y;
  t.modifiersData.popperOffsets != null && (t.modifiersData.popperOffsets.x += c, t.modifiersData.popperOffsets.y += d), t.modifiersData[r] = i;
}
const Lm = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: jm
};
function Vm(e) {
  var t = e.state, n = e.name;
  t.modifiersData[n] = Is({
    reference: t.rects.reference,
    element: t.rects.popper,
    strategy: "absolute",
    placement: t.placement
  });
}
const Fm = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: Vm,
  data: {}
};
function zm(e) {
  return e === "x" ? "y" : "x";
}
function Um(e) {
  var t = e.state, n = e.options, r = e.name, o = n.mainAxis, a = o === void 0 ? !0 : o, i = n.altAxis, l = i === void 0 ? !1 : i, c = n.boundary, d = n.rootBoundary, f = n.altBoundary, v = n.padding, g = n.tether, p = g === void 0 ? !0 : g, h = n.tetherOffset, u = h === void 0 ? 0 : h, b = An(t, {
    boundary: c,
    rootBoundary: d,
    padding: v,
    altBoundary: f
  }), x = Ze(t.placement), P = tn(t.placement), w = !P, E = zo(x), y = zm(E), C = t.modifiersData.popperOffsets, N = t.rects.reference, I = t.rects.popper, B = typeof u == "function" ? u(Object.assign({}, t.rects, {
    placement: t.placement
  })) : u, V = typeof B == "number" ? {
    mainAxis: B,
    altAxis: B
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, B), k = t.modifiersData.offset ? t.modifiersData.offset[t.placement] : null, S = {
    x: 0,
    y: 0
  };
  if (C) {
    if (a) {
      var $, F = E === "y" ? Me : Ie, H = E === "y" ? Xe : qe, _ = E === "y" ? "height" : "width", z = C[E], te = z + b[F], Q = z - b[H], O = p ? -I[_] / 2 : 0, M = P === Zt ? N[_] : I[_], U = P === Zt ? -I[_] : -N[_], Y = t.elements.arrow, W = p && Y ? Fo(Y) : {
        width: 0,
        height: 0
      }, X = t.modifiersData["arrow#persistent"] ? t.modifiersData["arrow#persistent"].padding : Ps(), K = X[F], J = X[H], q = Nn(0, N[_], W[_]), Z = w ? N[_] / 2 - O - q - K - V.mainAxis : M - q - K - V.mainAxis, ee = w ? -N[_] / 2 + O + q + J + V.mainAxis : U + q + J + V.mainAxis, se = t.elements.arrow && zn(t.elements.arrow), j = se ? E === "y" ? se.clientTop || 0 : se.clientLeft || 0 : 0, ne = ($ = k == null ? void 0 : k[E]) != null ? $ : 0, A = z + Z - ne - j, le = z + ee - ne, Te = Nn(p ? ur(te, A) : te, z, p ? _t(Q, le) : Q);
      C[E] = Te, S[E] = Te - z;
    }
    if (l) {
      var Pe, Ee = E === "x" ? Me : Ie, kt = E === "x" ? Xe : qe, $e = C[y], rt = y === "y" ? "height" : "width", Be = $e + b[Ee], ot = $e - b[kt], Ne = [Me, Ie].indexOf(x) !== -1, jt = (Pe = k == null ? void 0 : k[y]) != null ? Pe : 0, Tt = Ne ? Be : $e - N[rt] - I[rt] - jt + V.altAxis, on = Ne ? $e + N[rt] + I[rt] - jt - V.altAxis : ot, Hn = p && Ne ? fm(Tt, $e, on) : Nn(p ? Tt : Be, $e, p ? on : ot);
      C[y] = Hn, S[y] = Hn - $e;
    }
    t.modifiersData[r] = S;
  }
}
const Hm = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: Um,
  requiresIfExists: ["offset"]
};
function Gm(e) {
  return {
    scrollLeft: e.scrollLeft,
    scrollTop: e.scrollTop
  };
}
function Wm(e) {
  return e === ze(e) || !Ge(e) ? Uo(e) : Gm(e);
}
function Xm(e) {
  var t = e.getBoundingClientRect(), n = Qt(t.width) / e.offsetWidth || 1, r = Qt(t.height) / e.offsetHeight || 1;
  return n !== 1 || r !== 1;
}
function qm(e, t, n) {
  n === void 0 && (n = !1);
  var r = Ge(t), o = Ge(t) && Xm(t), a = Et(t), i = en(e, o, n), l = {
    scrollLeft: 0,
    scrollTop: 0
  }, c = {
    x: 0,
    y: 0
  };
  return (r || !r && !n) && ((tt(t) !== "body" || // https://github.com/popperjs/popper-core/issues/1078
  Go(a)) && (l = Wm(t)), Ge(t) ? (c = en(t, !0), c.x += t.clientLeft, c.y += t.clientTop) : a && (c.x = Ho(a))), {
    x: i.left + l.scrollLeft - c.x,
    y: i.top + l.scrollTop - c.y,
    width: i.width,
    height: i.height
  };
}
function Ym(e) {
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
function Km(e) {
  var t = Ym(e);
  return sm.reduce(function(n, r) {
    return n.concat(t.filter(function(o) {
      return o.phase === r;
    }));
  }, []);
}
function Jm(e) {
  var t;
  return function() {
    return t || (t = new Promise(function(n) {
      Promise.resolve().then(function() {
        t = void 0, n(e());
      });
    })), t;
  };
}
function Zm(e) {
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
var ri = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function oi() {
  for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++)
    t[n] = arguments[n];
  return !t.some(function(r) {
    return !(r && typeof r.getBoundingClientRect == "function");
  });
}
function Qm(e) {
  e === void 0 && (e = {});
  var t = e, n = t.defaultModifiers, r = n === void 0 ? [] : n, o = t.defaultOptions, a = o === void 0 ? ri : o;
  return function(l, c, d) {
    d === void 0 && (d = a);
    var f = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, ri, a),
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
        u(), f.options = Object.assign({}, a, f.options, P), f.scrollParents = {
          reference: Bt(l) ? Cn(l) : l.contextElement ? Cn(l.contextElement) : [],
          popper: Cn(c)
        };
        var w = Km(Zm([].concat(r, f.options.modifiers)));
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
              reference: qm(P, zn(w), f.options.strategy === "fixed"),
              popper: Fo(w)
            }, f.reset = !1, f.placement = f.options.placement, f.orderedModifiers.forEach(function(V) {
              return f.modifiersData[V.name] = Object.assign({}, V.data);
            });
            for (var E = 0; E < f.orderedModifiers.length; E++) {
              if (f.reset === !0) {
                f.reset = !1, E = -1;
                continue;
              }
              var y = f.orderedModifiers[E], C = y.fn, N = y.options, I = N === void 0 ? {} : N, B = y.name;
              typeof C == "function" && (f = C({
                state: f,
                options: I,
                name: B,
                instance: p
              }) || f);
            }
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: Jm(function() {
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
    function u() {
      v.forEach(function(b) {
        return b();
      }), v = [];
    }
    return p;
  };
}
var eh = [km, Fm, xm, pm, Lm, Im, Hm, bm, Dm], th = /* @__PURE__ */ Qm({
  defaultModifiers: eh
});
const As = "Popper";
function nh(e) {
  return Ns(As, e);
}
Mf(As, ["root"]);
const rh = ["anchorEl", "children", "direction", "disablePortal", "modifiers", "open", "placement", "popperOptions", "popperRef", "slotProps", "slots", "TransitionProps", "ownerState"], oh = ["anchorEl", "children", "container", "direction", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "style", "transition", "slotProps", "slots"];
function ah(e, t) {
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
function fr(e) {
  return typeof e == "function" ? e() : e;
}
function _r(e) {
  return e.nodeType !== void 0;
}
function ih(e) {
  return !_r(e);
}
const sh = () => dt({
  root: ["root"]
}, Sf(nh)), lh = {}, ch = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
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
  } = t, b = he(t, rh), x = T.useRef(null), P = We(x, n), w = T.useRef(null), E = We(w, g), y = T.useRef(E);
  It(() => {
    y.current = E;
  }, [E]), T.useImperativeHandle(g, () => w.current, []);
  const C = ah(f, i), [N, I] = T.useState(C), [B, V] = T.useState(fr(o));
  T.useEffect(() => {
    w.current && w.current.forceUpdate();
  }), T.useEffect(() => {
    o && V(fr(o));
  }, [o]), It(() => {
    if (!B || !d)
      return;
    const H = (te) => {
      I(te.placement);
    };
    if (process.env.NODE_ENV !== "production" && B && _r(B) && B.nodeType === 1) {
      const te = B.getBoundingClientRect();
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
    const z = th(B, x.current, R({
      placement: C
    }, v, {
      modifiers: _
    }));
    return y.current(z), () => {
      z.destroy(), y.current(null);
    };
  }, [B, l, c, d, v, C]);
  const k = {
    placement: N
  };
  u !== null && (k.TransitionProps = u);
  const S = sh(), $ = (r = h.root) != null ? r : "div", F = Dt({
    elementType: $,
    externalSlotProps: p.root,
    externalForwardedProps: b,
    additionalProps: {
      role: "tooltip",
      ref: P
    },
    ownerState: t,
    className: S.root
  });
  return /* @__PURE__ */ m($, R({}, F, {
    children: typeof a == "function" ? a(k) : a
  }));
}), Ds = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    anchorEl: r,
    children: o,
    container: a,
    direction: i = "ltr",
    disablePortal: l = !1,
    keepMounted: c = !1,
    modifiers: d,
    open: f,
    placement: v = "bottom",
    popperOptions: g = lh,
    popperRef: p,
    style: h,
    transition: u = !1,
    slotProps: b = {},
    slots: x = {}
  } = t, P = he(t, oh), [w, E] = T.useState(!0), y = () => {
    E(!1);
  }, C = () => {
    E(!0);
  };
  if (!c && !f && (!u || w))
    return null;
  let N;
  if (a)
    N = a;
  else if (r) {
    const V = fr(r);
    N = V && _r(V) ? Oe(V).body : Oe(null).body;
  }
  const I = !f && c && (!u || w) ? "none" : void 0, B = u ? {
    in: f,
    onEnter: y,
    onExited: C
  } : void 0;
  return /* @__PURE__ */ m(Mn, {
    disablePortal: l,
    container: N,
    children: /* @__PURE__ */ m(ch, R({
      anchorEl: r,
      direction: i,
      disablePortal: l,
      modifiers: d,
      ref: n,
      open: u ? !w : f,
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
      TransitionProps: B,
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
  anchorEl: rn(s.oneOfType([lt, s.object, s.func]), (e) => {
    if (e.open) {
      const t = fr(e.anchorEl);
      if (t && _r(t) && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
          return new Error(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
      } else if (!t || typeof t.getBoundingClientRect != "function" || ih(t) && t.contextElement != null && t.contextElement.nodeType !== 1)
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
function Un() {
  const e = vs(Do);
  return process.env.NODE_ENV !== "production" && T.useDebugValue(e), e[Bo] || e;
}
function fo(e, t) {
  return fo = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(r, o) {
    return r.__proto__ = o, r;
  }, fo(e, t);
}
function ph(e, t) {
  e.prototype = Object.create(t.prototype), e.prototype.constructor = e, fo(e, t);
}
const ai = {
  disabled: !1
};
var dh = process.env.NODE_ENV !== "production" ? s.oneOfType([s.number, s.shape({
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
const Bs = G.createContext(null);
var uh = function(t) {
  return t.scrollTop;
}, wn = "unmounted", Ct = "exited", St = "entering", Xt = "entered", mo = "exiting", ft = /* @__PURE__ */ function(e) {
  ph(t, e);
  function t(r, o) {
    var a;
    a = e.call(this, r, o) || this;
    var i = o, l = i && !i.isMounting ? r.enter : r.appear, c;
    return a.appearStatus = null, r.in ? l ? (c = Ct, a.appearStatus = St) : c = Xt : r.unmountOnExit || r.mountOnEnter ? c = wn : c = Ct, a.state = {
      status: c
    }, a.nextCallback = null, a;
  }
  t.getDerivedStateFromProps = function(o, a) {
    var i = o.in;
    return i && a.status === wn ? {
      status: Ct
    } : null;
  };
  var n = t.prototype;
  return n.componentDidMount = function() {
    this.updateStatus(!0, this.appearStatus);
  }, n.componentDidUpdate = function(o) {
    var a = null;
    if (o !== this.props) {
      var i = this.state.status;
      this.props.in ? i !== St && i !== Xt && (a = St) : (i === St || i === Xt) && (a = mo);
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
      if (this.cancelNextCallback(), a === St) {
        if (this.props.unmountOnExit || this.props.mountOnEnter) {
          var i = this.props.nodeRef ? this.props.nodeRef.current : Xn.findDOMNode(this);
          i && uh(i);
        }
        this.performEnter(o);
      } else
        this.performExit();
    else
      this.props.unmountOnExit && this.state.status === Ct && this.setState({
        status: wn
      });
  }, n.performEnter = function(o) {
    var a = this, i = this.props.enter, l = this.context ? this.context.isMounting : o, c = this.props.nodeRef ? [l] : [Xn.findDOMNode(this), l], d = c[0], f = c[1], v = this.getTimeouts(), g = l ? v.appear : v.enter;
    if (!o && !i || ai.disabled) {
      this.safeSetState({
        status: Xt
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
          status: Xt
        }, function() {
          a.props.onEntered(d, f);
        });
      });
    });
  }, n.performExit = function() {
    var o = this, a = this.props.exit, i = this.getTimeouts(), l = this.props.nodeRef ? void 0 : Xn.findDOMNode(this);
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
    var i = this.props.nodeRef ? this.props.nodeRef.current : Xn.findDOMNode(this), l = o == null && !this.props.addEndListener;
    if (!i || l) {
      setTimeout(this.nextCallback, 0);
      return;
    }
    if (this.props.addEndListener) {
      var c = this.props.nodeRef ? [this.nextCallback] : [i, this.nextCallback], d = c[0], f = c[1];
      this.props.addEndListener(d, f);
    }
    o != null && setTimeout(this.nextCallback, o);
  }, n.render = function() {
    var o = this.state.status;
    if (o === wn)
      return null;
    var a = this.props, i = a.children;
    a.in, a.mountOnEnter, a.unmountOnExit, a.appear, a.enter, a.exit, a.timeout, a.addEndListener, a.onEnter, a.onEntering, a.onEntered, a.onExit, a.onExiting, a.onExited, a.nodeRef;
    var l = he(a, ["children", "in", "mountOnEnter", "unmountOnExit", "appear", "enter", "exit", "timeout", "addEndListener", "onEnter", "onEntering", "onEntered", "onExit", "onExiting", "onExited", "nodeRef"]);
    return (
      // allows for nested Transitions
      /* @__PURE__ */ G.createElement(Bs.Provider, {
        value: null
      }, typeof i == "function" ? i(o, l) : G.cloneElement(G.Children.only(i), l))
    );
  }, t;
}(G.Component);
ft.contextType = Bs;
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
    current: typeof Element > "u" ? s.any : function(e, t, n, r, o, a) {
      var i = e[t];
      return s.instanceOf(i && "ownerDocument" in i ? i.ownerDocument.defaultView.Element : Element)(e, t, n, r, o, a);
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
    var n = dh;
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
ft.UNMOUNTED = wn;
ft.EXITED = Ct;
ft.ENTERING = St;
ft.ENTERED = Xt;
ft.EXITING = mo;
const js = ft, Ls = (e) => e.scrollTop;
function mr(e, t) {
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
const fh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"];
function ho(e) {
  return `scale(${e}, ${e ** 2})`;
}
const mh = {
  entering: {
    opacity: 1,
    transform: ho(1)
  },
  entered: {
    opacity: 1,
    transform: "none"
  }
}, Kr = typeof navigator < "u" && /^((?!chrome|android).)*(safari|mobile)/i.test(navigator.userAgent) && /(os |version\/)15(.|_)4/i.test(navigator.userAgent), Wo = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    addEndListener: r,
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
    TransitionComponent: b = js
  } = t, x = he(t, fh), P = vn(), w = T.useRef(), E = Un(), y = T.useRef(null), C = We(y, a.ref, n), N = (H) => (_) => {
    if (H) {
      const z = y.current;
      _ === void 0 ? H(z) : H(z, _);
    }
  }, I = N(f), B = N((H, _) => {
    Ls(H);
    const {
      duration: z,
      delay: te,
      easing: Q
    } = mr({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "enter"
    });
    let O;
    u === "auto" ? (O = E.transitions.getAutoHeightDuration(H.clientHeight), w.current = O) : O = z, H.style.transition = [E.transitions.create("opacity", {
      duration: O,
      delay: te
    }), E.transitions.create("transform", {
      duration: Kr ? O : O * 0.666,
      delay: te,
      easing: Q
    })].join(","), c && c(H, _);
  }), V = N(d), k = N(p), S = N((H) => {
    const {
      duration: _,
      delay: z,
      easing: te
    } = mr({
      style: h,
      timeout: u,
      easing: i
    }, {
      mode: "exit"
    });
    let Q;
    u === "auto" ? (Q = E.transitions.getAutoHeightDuration(H.clientHeight), w.current = Q) : Q = _, H.style.transition = [E.transitions.create("opacity", {
      duration: Q,
      delay: z
    }), E.transitions.create("transform", {
      duration: Kr ? Q : Q * 0.666,
      delay: Kr ? z : z || Q * 0.333,
      easing: te
    })].join(","), H.style.opacity = 0, H.style.transform = ho(0.75), v && v(H);
  }), $ = N(g);
  return /* @__PURE__ */ m(b, R({
    appear: o,
    in: l,
    nodeRef: y,
    onEnter: B,
    onEntered: V,
    onEntering: I,
    onExit: S,
    onExited: $,
    onExiting: k,
    addEndListener: (H) => {
      u === "auto" && P.start(w.current || 0, H), r && r(y.current, H);
    },
    timeout: u === "auto" ? null : u
  }, x, {
    children: (H, _) => /* @__PURE__ */ T.cloneElement(a, R({
      style: R({
        opacity: 0,
        transform: ho(0.75),
        visibility: H === "exited" && !l ? "hidden" : void 0
      }, mh[H], h, a.props.style),
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
  children: Bn.isRequired,
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
const go = Wo, hh = (e) => {
  let t;
  return e < 1 ? t = 5.11916 * e ** 2 : t = 4.5 * Math.log(e + 1) + 2, (t / 100).toFixed(2);
}, ii = hh, gh = ["anchorEl", "component", "components", "componentsProps", "container", "disablePortal", "keepMounted", "modifiers", "open", "placement", "popperOptions", "popperRef", "transition", "slots", "slotProps"], bh = Re(Ds, {
  name: "MuiPopper",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Vs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r;
  const o = bs(), a = ut({
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
    transition: P,
    slots: w,
    slotProps: E
  } = a, y = he(a, gh), C = (r = w == null ? void 0 : w.root) != null ? r : c == null ? void 0 : c.Root, N = R({
    anchorEl: i,
    container: f,
    disablePortal: v,
    keepMounted: g,
    modifiers: p,
    open: h,
    placement: u,
    popperOptions: b,
    popperRef: x,
    transition: P
  }, y);
  return /* @__PURE__ */ m(bh, R({
    as: l,
    direction: o == null ? void 0 : o.direction,
    slots: {
      root: C
    },
    slotProps: E ?? d
  }, N, {
    ref: n
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
const Fs = Vs;
function vh(e) {
  return nt("MuiTooltip", e);
}
const yh = wt("MuiTooltip", ["popper", "popperInteractive", "popperArrow", "popperClose", "tooltip", "tooltipArrow", "touch", "tooltipPlacementLeft", "tooltipPlacementRight", "tooltipPlacementTop", "tooltipPlacementBottom", "arrow"]), bt = yh, wh = ["arrow", "children", "classes", "components", "componentsProps", "describeChild", "disableFocusListener", "disableHoverListener", "disableInteractive", "disableTouchListener", "enterDelay", "enterNextDelay", "enterTouchDelay", "followCursor", "id", "leaveDelay", "leaveTouchDelay", "onClose", "onOpen", "open", "placement", "PopperComponent", "PopperProps", "slotProps", "slots", "title", "TransitionComponent", "TransitionProps"];
function xh(e) {
  return Math.round(e * 1e5) / 1e5;
}
const Eh = (e) => {
  const {
    classes: t,
    disableInteractive: n,
    arrow: r,
    touch: o,
    placement: a
  } = e, i = {
    popper: ["popper", !n && "popperInteractive", r && "popperArrow"],
    tooltip: ["tooltip", r && "tooltipArrow", o && "touch", `tooltipPlacement${et(a.split("-")[0])}`],
    arrow: ["arrow"]
  };
  return dt(i, vh, t);
}, kh = Re(Fs, {
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
})), Th = Re("div", {
  name: "MuiTooltip",
  slot: "Tooltip",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.tooltip, n.touch && t.touch, n.arrow && t.tooltipArrow, t[`tooltipPlacement${et(n.placement.split("-")[0])}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => R({
  backgroundColor: e.vars ? e.vars.palette.Tooltip.bg : pr(e.palette.grey[700], 0.92),
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
  lineHeight: `${xh(16 / 14)}em`,
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
})), Nh = Re("span", {
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
  color: e.vars ? e.vars.palette.Tooltip.bg : pr(e.palette.grey[700], 0.9),
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
let Jn = !1;
const si = new jn();
let mn = {
  x: 0,
  y: 0
};
function Zn(e, t) {
  return (n) => {
    t && t(n), e(n);
  };
}
const zs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a, i, l, c, d, f, v, g, p, h, u, b, x, P, w, E, y;
  const C = ut({
    props: t,
    name: "MuiTooltip"
  }), {
    arrow: N = !1,
    children: I,
    components: B = {},
    componentsProps: V = {},
    describeChild: k = !1,
    disableFocusListener: S = !1,
    disableHoverListener: $ = !1,
    disableInteractive: F = !1,
    disableTouchListener: H = !1,
    enterDelay: _ = 100,
    enterNextDelay: z = 0,
    enterTouchDelay: te = 700,
    followCursor: Q = !1,
    id: O,
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
    TransitionProps: ne
  } = C, A = he(C, wh), le = /* @__PURE__ */ T.isValidElement(I) ? I : /* @__PURE__ */ m("span", {
    children: I
  }), Te = Un(), Pe = Te.direction === "rtl", [Ee, kt] = T.useState(), [$e, rt] = T.useState(null), Be = T.useRef(!1), ot = F || Q, Ne = vn(), jt = vn(), Tt = vn(), on = vn(), [Hn, Ko] = as({
    controlled: X,
    default: !1,
    name: "Tooltip",
    state: "open"
  });
  let at = Hn;
  if (process.env.NODE_ENV !== "production") {
    const {
      current: re
    } = T.useRef(X !== void 0);
    T.useEffect(() => {
      Ee && Ee.disabled && !re && se !== "" && Ee.tagName.toLowerCase() === "button" && console.error(["MUI: You are providing a disabled `button` child to the Tooltip component.", "A disabled element does not fire events.", "Tooltip needs to listen to the child element's events to display the title.", "", "Add a simple wrapper element, such as a `span`."].join(`
`));
    }, [se, Ee, re]);
  }
  const Mr = os(O), an = T.useRef(), Gn = $n(() => {
    an.current !== void 0 && (document.body.style.WebkitUserSelect = an.current, an.current = void 0), on.clear();
  });
  T.useEffect(() => Gn, [Gn]);
  const Jo = (re) => {
    si.clear(), Jn = !0, Ko(!0), W && !at && W(re);
  }, Wn = $n(
    /**
     * @param {React.SyntheticEvent | Event} event
     */
    (re) => {
      si.start(800 + M, () => {
        Jn = !1;
      }), Ko(!1), Y && at && Y(re), Ne.start(Te.transitions.duration.shortest, () => {
        Be.current = !1;
      });
    }
  ), Ir = (re) => {
    Be.current && re.type !== "touchstart" || (Ee && Ee.removeAttribute("title"), jt.clear(), Tt.clear(), _ || Jn && z ? jt.start(Jn ? z : _, () => {
      Jo(re);
    }) : Jo(re));
  }, Zo = (re) => {
    jt.clear(), Tt.start(M, () => {
      Wn(re);
    });
  }, {
    isFocusVisibleRef: Qo,
    onBlur: Sl,
    onFocus: Ol,
    ref: Rl
  } = is(), [, ea] = T.useState(!1), ta = (re) => {
    Sl(re), Qo.current === !1 && (ea(!1), Zo(re));
  }, na = (re) => {
    Ee || kt(re.currentTarget), Ol(re), Qo.current === !0 && (ea(!0), Ir(re));
  }, ra = (re) => {
    Be.current = !0;
    const je = le.props;
    je.onTouchStart && je.onTouchStart(re);
  }, oa = Ir, aa = Zo, Pl = (re) => {
    ra(re), Tt.clear(), Ne.clear(), Gn(), an.current = document.body.style.WebkitUserSelect, document.body.style.WebkitUserSelect = "none", on.start(te, () => {
      document.body.style.WebkitUserSelect = an.current, Ir(re);
    });
  }, $l = (re) => {
    le.props.onTouchEnd && le.props.onTouchEnd(re), Gn(), Tt.start(U, () => {
      Wn(re);
    });
  };
  T.useEffect(() => {
    if (!at)
      return;
    function re(je) {
      (je.key === "Escape" || je.key === "Esc") && Wn(je);
    }
    return document.addEventListener("keydown", re), () => {
      document.removeEventListener("keydown", re);
    };
  }, [Wn, at]);
  const _l = We(le.ref, Rl, kt, n);
  !se && se !== 0 && (at = !1);
  const Ar = T.useRef(), Ml = (re) => {
    const je = le.props;
    je.onMouseMove && je.onMouseMove(re), mn = {
      x: re.clientX,
      y: re.clientY
    }, Ar.current && Ar.current.update();
  }, sn = {}, Dr = typeof se == "string";
  k ? (sn.title = !at && Dr && !$ ? se : null, sn["aria-describedby"] = at ? Mr : null) : (sn["aria-label"] = Dr ? se : null, sn["aria-labelledby"] = at && !Dr ? Mr : null);
  const Ue = R({}, sn, A, le.props, {
    className: Se(A.className, le.props.className),
    onTouchStart: ra,
    ref: _l
  }, Q ? {
    onMouseMove: Ml
  } : {});
  process.env.NODE_ENV !== "production" && (Ue["data-mui-internal-clone-element"] = !0, T.useEffect(() => {
    Ee && !Ee.getAttribute("data-mui-internal-clone-element") && console.error(["MUI: The `children` component of the Tooltip is not forwarding its props correctly.", "Please make sure that props are spread on the same element that the ref is applied to."].join(`
`));
  }, [Ee]));
  const ln = {};
  H || (Ue.onTouchStart = Pl, Ue.onTouchEnd = $l), $ || (Ue.onMouseOver = Zn(oa, Ue.onMouseOver), Ue.onMouseLeave = Zn(aa, Ue.onMouseLeave), ot || (ln.onMouseOver = oa, ln.onMouseLeave = aa)), S || (Ue.onFocus = Zn(na, Ue.onFocus), Ue.onBlur = Zn(ta, Ue.onBlur), ot || (ln.onFocus = na, ln.onBlur = ta)), process.env.NODE_ENV !== "production" && le.props.title && console.error(["MUI: You have provided a `title` prop to the child of <Tooltip />.", `Remove this title prop \`${le.props.title}\` or the Tooltip component.`].join(`
`));
  const Il = T.useMemo(() => {
    var re;
    let je = [{
      name: "arrow",
      enabled: !!$e,
      options: {
        element: $e,
        padding: 4
      }
    }];
    return (re = q.popperOptions) != null && re.modifiers && (je = je.concat(q.popperOptions.modifiers)), R({}, q.popperOptions, {
      modifiers: je
    });
  }, [$e, q]), cn = R({}, C, {
    isRtl: Pe,
    arrow: N,
    disableInteractive: ot,
    placement: K,
    PopperComponentProp: J,
    touch: Be.current
  }), Br = Eh(cn), ia = (r = (o = ee.popper) != null ? o : B.Popper) != null ? r : kh, sa = (a = (i = (l = ee.transition) != null ? l : B.Transition) != null ? i : j) != null ? a : go, la = (c = (d = ee.tooltip) != null ? d : B.Tooltip) != null ? c : Th, ca = (f = (v = ee.arrow) != null ? v : B.Arrow) != null ? f : Nh, Al = yn(ia, R({}, q, (g = Z.popper) != null ? g : V.popper, {
    className: Se(Br.popper, q == null ? void 0 : q.className, (p = (h = Z.popper) != null ? h : V.popper) == null ? void 0 : p.className)
  }), cn), Dl = yn(sa, R({}, ne, (u = Z.transition) != null ? u : V.transition), cn), Bl = yn(la, R({}, (b = Z.tooltip) != null ? b : V.tooltip, {
    className: Se(Br.tooltip, (x = (P = Z.tooltip) != null ? P : V.tooltip) == null ? void 0 : x.className)
  }), cn), jl = yn(ca, R({}, (w = Z.arrow) != null ? w : V.arrow, {
    className: Se(Br.arrow, (E = (y = Z.arrow) != null ? y : V.arrow) == null ? void 0 : E.className)
  }), cn);
  return /* @__PURE__ */ D(T.Fragment, {
    children: [/* @__PURE__ */ T.cloneElement(le, Ue), /* @__PURE__ */ m(ia, R({
      as: J ?? Fs,
      placement: K,
      anchorEl: Q ? {
        getBoundingClientRect: () => ({
          top: mn.y,
          left: mn.x,
          right: mn.x,
          bottom: mn.y,
          width: 0,
          height: 0
        })
      } : Ee,
      popperRef: Ar,
      open: Ee ? at : !1,
      id: Mr,
      transition: !0
    }, ln, Al, {
      popperOptions: Il,
      children: ({
        TransitionProps: re
      }) => /* @__PURE__ */ m(sa, R({
        timeout: Te.transitions.duration.shorter
      }, re, Dl, {
        children: /* @__PURE__ */ D(la, R({}, Bl, {
          children: [se, N ? /* @__PURE__ */ m(ca, R({}, jl, {
            ref: rt
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
  children: Bn.isRequired,
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
const Ch = zs;
function li(e, t, n) {
  return e ? /* @__PURE__ */ m(Ci, { className: `papi-menu-icon-${n ? "leading" : "trailing"}`, children: /* @__PURE__ */ m("img", { src: e, alt: `${n ? "Leading" : "Trailing"} icon for ${t}` }) }) : void 0;
}
function Us(e) {
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
    isDense: f = !0,
    isSubMenuParent: v = !1,
    hasDisabledGutters: g = !1,
    hasDivider: p = !1,
    focusVisibleClassName: h,
    id: u,
    children: b
  } = e, x = /* @__PURE__ */ m(
    bc,
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
      children: n ? /* @__PURE__ */ D(yt, { children: [
        li(a, n, !0),
        /* @__PURE__ */ m(vc, { primary: n, inset: !a && o }),
        v ? /* @__PURE__ */ m(Ci, { className: "papi-menu-icon-trailing", children: /* @__PURE__ */ m(xs, {}) }) : li(i, n, !1)
      ] }) : b
    }
  );
  return r ? /* @__PURE__ */ m(Ch, { title: r, placement: "right", children: /* @__PURE__ */ m("div", { children: x }) }) : x;
}
function Hs(e) {
  return Object.entries(e.groups).map(([n, r]) => ({ id: n, group: r }));
}
function Sh(e) {
  const [t, n] = ie(void 0), { parentMenuItem: r, parentItemProps: o, menuDefinition: a } = e, i = (d) => {
    n(d.currentTarget);
  }, l = () => {
    n(void 0);
  }, c = () => {
    let d = Hs(a).filter((f) => "menuItem" in f.group);
    if (!(r != null && r.id))
      throw new Error("A valid parent menu item is required for submenus.");
    return d = d.filter(
      (f) => "menuItem" in f.group && f.group.menuItem === r.id
    ), /* @__PURE__ */ m(Xo, { ...e, includedGroups: d });
  };
  return /* @__PURE__ */ D(yt, { children: [
    /* @__PURE__ */ m(Us, { onClick: i, ...o, isSubMenuParent: !0 }),
    /* @__PURE__ */ m(
      yc,
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
const Oh = (e, t) => t.filter((o) => o.group === e).sort((o, a) => (o.order || 0) - (a.order || 0));
function Xo(e) {
  const { menuDefinition: t, onClick: n, commandHandler: r, includedGroups: o } = e, { items: a, allowForLeadingIcons: i } = hr(() => {
    const f = o && o.length > 0 ? o : (
      // We're apparently laying out a single-column menu (presumably a context menu). In this
      // case, all groups should be included except ones that belong to a submenu.
      Hs(t).filter((h) => !("menuItem" in h.group))
    ), v = Object.values(f).sort(
      (h, u) => (h.group.order || 0) - (u.group.order || 0)
    ), g = [];
    v.forEach((h) => {
      Oh(h.id, t.items).forEach(
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
            n == null || n(u), r(g);
          },
          ...p
        },
        h
      );
    }
    return /* @__PURE__ */ m(
      Sh,
      {
        parentMenuItem: g,
        parentItemProps: p,
        ...e
      },
      d + g.id
    );
  }) }, d);
}
function Rh(e) {
  const { menuDefinition: t, columnId: n } = e;
  let a = Object.entries(t.groups).map(([i, l]) => ({ id: i, group: l })).filter((i) => "column" in i.group);
  return n && "columns" in t && // Without this type assertion, TS doesn't know what columns is.
  // eslint-disable-next-line no-type-assertion/no-type-assertion
  t.columns[n] && (a = a.filter(
    (i) => "column" in i.group && i.group.column === n
  )), /* @__PURE__ */ m(Xo, { ...e, includedGroups: a });
}
function Ph({
  commandHandler: e,
  menuDefinition: t,
  id: n,
  metadata: r,
  onClick: o,
  className: a
}) {
  return /* @__PURE__ */ D(
    Si,
    {
      id: n,
      item: !0,
      xs: "auto",
      role: "menu",
      "aria-label": n,
      className: `papi-menu-column ${a ?? ""}`,
      children: [
        /* @__PURE__ */ m("h3", { "aria-label": r.label, className: `papi-menu-column-header ${a ?? ""}`, children: r.label }),
        /* @__PURE__ */ m(wc, { id: n, dense: !0, className: a ?? "", children: /* @__PURE__ */ m(
          Rh,
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
function $h({
  commandHandler: e,
  className: t,
  multiColumnMenu: n,
  id: r
}) {
  const { columns: o } = n, a = hr(() => {
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
  return /* @__PURE__ */ m(
    Si,
    {
      container: !0,
      spacing: 0,
      className: `papi-multi-column-menu ${t ?? ""}`,
      columns: a.length,
      role: "menu",
      "aria-label": "GridMenu",
      id: r,
      children: a.map((i, l) => /* @__PURE__ */ m(
        Ph,
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
const Gs = /* @__PURE__ */ T.createContext({});
process.env.NODE_ENV !== "production" && (Gs.displayName = "ListContext");
const _h = Gs;
function Mh(e) {
  return nt("MuiList", e);
}
wt("MuiList", ["root", "padding", "dense", "subheader"]);
const Ih = ["children", "className", "component", "dense", "disablePadding", "subheader"], Ah = (e) => {
  const {
    classes: t,
    disablePadding: n,
    dense: r,
    subheader: o
  } = e;
  return dt({
    root: ["root", !n && "padding", r && "dense", o && "subheader"]
  }, Mh, t);
}, Dh = Re("ul", {
  name: "MuiList",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.disablePadding && t.padding, n.dense && t.dense, n.subheader && t.subheader];
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
})), Ws = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = ut({
    props: t,
    name: "MuiList"
  }), {
    children: o,
    className: a,
    component: i = "ul",
    dense: l = !1,
    disablePadding: c = !1,
    subheader: d
  } = r, f = he(r, Ih), v = T.useMemo(() => ({
    dense: l
  }), [l]), g = R({}, r, {
    component: i,
    dense: l,
    disablePadding: c
  }), p = Ah(g);
  return /* @__PURE__ */ m(_h.Provider, {
    value: v,
    children: /* @__PURE__ */ D(Dh, R({
      as: i,
      className: Se(p.root, a),
      ref: n,
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
const Bh = Ws, jh = ["actions", "autoFocus", "autoFocusItem", "children", "className", "disabledItemsFocusable", "disableListWrap", "onKeyDown", "variant"];
function Jr(e, t, n) {
  return e === t ? e.firstChild : t && t.nextElementSibling ? t.nextElementSibling : n ? null : e.firstChild;
}
function ci(e, t, n) {
  return e === t ? n ? e.firstChild : e.lastChild : t && t.previousElementSibling ? t.previousElementSibling : n ? null : e.lastChild;
}
function Xs(e, t) {
  if (t === void 0)
    return !0;
  let n = e.innerText;
  return n === void 0 && (n = e.textContent), n = n.trim().toLowerCase(), n.length === 0 ? !1 : t.repeating ? n[0] === t.keys[0] : n.indexOf(t.keys.join("")) === 0;
}
function hn(e, t, n, r, o, a) {
  let i = !1, l = o(e, t, t ? n : !1);
  for (; l; ) {
    if (l === e.firstChild) {
      if (i)
        return !1;
      i = !0;
    }
    const c = r ? !1 : l.disabled || l.getAttribute("aria-disabled") === "true";
    if (!l.hasAttribute("tabindex") || !Xs(l, a) || c)
      l = o(e, l, n);
    else
      return l.focus(), !0;
  }
  return !1;
}
const qs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const {
    // private
    // eslint-disable-next-line react/prop-types
    actions: r,
    autoFocus: o = !1,
    autoFocusItem: a = !1,
    children: i,
    className: l,
    disabledItemsFocusable: c = !1,
    disableListWrap: d = !1,
    onKeyDown: f,
    variant: v = "selectedMenu"
  } = t, g = he(t, jh), p = T.useRef(null), h = T.useRef({
    keys: [],
    repeating: !0,
    previousKeyMatched: !0,
    lastTime: null
  });
  It(() => {
    o && p.current.focus();
  }, [o]), T.useImperativeHandle(r, () => ({
    adjustStyleForScrollbar: (w, E) => {
      const y = !p.current.style.width;
      if (w.clientHeight < p.current.clientHeight && y) {
        const C = `${ss(Oe(w))}px`;
        p.current.style[E.direction === "rtl" ? "paddingLeft" : "paddingRight"] = C, p.current.style.width = `calc(100% + ${C})`;
      }
      return p.current;
    }
  }), []);
  const u = (w) => {
    const E = p.current, y = w.key, C = Oe(E).activeElement;
    if (y === "ArrowDown")
      w.preventDefault(), hn(E, C, d, c, Jr);
    else if (y === "ArrowUp")
      w.preventDefault(), hn(E, C, d, c, ci);
    else if (y === "Home")
      w.preventDefault(), hn(E, null, d, c, Jr);
    else if (y === "End")
      w.preventDefault(), hn(E, null, d, c, ci);
    else if (y.length === 1) {
      const N = h.current, I = y.toLowerCase(), B = performance.now();
      N.keys.length > 0 && (B - N.lastTime > 500 ? (N.keys = [], N.repeating = !0, N.previousKeyMatched = !0) : N.repeating && I !== N.keys[0] && (N.repeating = !1)), N.lastTime = B, N.keys.push(I);
      const V = C && !N.repeating && Xs(C, N);
      N.previousKeyMatched && (V || hn(E, C, !1, c, Jr, N)) ? w.preventDefault() : N.previousKeyMatched = !1;
    }
    f && f(w);
  }, b = We(p, n);
  let x = -1;
  T.Children.forEach(i, (w, E) => {
    if (!/* @__PURE__ */ T.isValidElement(w)) {
      x === E && (x += 1, x >= i.length && (x = -1));
      return;
    }
    process.env.NODE_ENV !== "production" && sr.isFragment(w) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), w.props.disabled || (v === "selectedMenu" && w.props.selected || x === -1) && (x = E), x === E && (w.props.disabled || w.props.muiSkipListHighlight || w.type.muiSkipListHighlight) && (x += 1, x >= i.length && (x = -1));
  });
  const P = T.Children.map(i, (w, E) => {
    if (E === x) {
      const y = {};
      return a && (y.autoFocus = !0), w.props.tabIndex === void 0 && v === "selectedMenu" && (y.tabIndex = 0), /* @__PURE__ */ T.cloneElement(w, y);
    }
    return w;
  });
  return /* @__PURE__ */ m(Bh, R({
    role: "menu",
    ref: b,
    className: l,
    onKeyDown: u,
    tabIndex: o ? 0 : -1
  }, g, {
    children: P
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
const Lh = qs, Vh = ["addEndListener", "appear", "children", "easing", "in", "onEnter", "onEntered", "onEntering", "onExit", "onExited", "onExiting", "style", "timeout", "TransitionComponent"], Fh = {
  entering: {
    opacity: 1
  },
  entered: {
    opacity: 1
  }
}, Ys = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = Un(), o = {
    enter: r.transitions.duration.enteringScreen,
    exit: r.transitions.duration.leavingScreen
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
    TransitionComponent: P = js
  } = t, w = he(t, Vh), E = T.useRef(null), y = We(E, l.ref, n), C = (F) => (H) => {
    if (F) {
      const _ = E.current;
      H === void 0 ? F(_) : F(_, H);
    }
  }, N = C(g), I = C((F, H) => {
    Ls(F);
    const _ = mr({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "enter"
    });
    F.style.webkitTransition = r.transitions.create("opacity", _), F.style.transition = r.transitions.create("opacity", _), f && f(F, H);
  }), B = C(v), V = C(u), k = C((F) => {
    const H = mr({
      style: b,
      timeout: x,
      easing: c
    }, {
      mode: "exit"
    });
    F.style.webkitTransition = r.transitions.create("opacity", H), F.style.transition = r.transitions.create("opacity", H), p && p(F);
  }), S = C(h);
  return /* @__PURE__ */ m(P, R({
    appear: i,
    in: d,
    nodeRef: E,
    onEnter: I,
    onEntered: B,
    onEntering: N,
    onExit: k,
    onExited: S,
    onExiting: V,
    addEndListener: (F) => {
      a && a(E.current, F);
    },
    timeout: x
  }, w, {
    children: (F, H) => /* @__PURE__ */ T.cloneElement(l, R({
      style: R({
        opacity: 0,
        visibility: F === "exited" && !d ? "hidden" : void 0
      }, Fh[F], b, l.props.style),
      ref: y
    }, H))
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
  children: Bn.isRequired,
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
const zh = Ys;
function Uh(e) {
  return nt("MuiBackdrop", e);
}
wt("MuiBackdrop", ["root", "invisible"]);
const Hh = ["children", "className", "component", "components", "componentsProps", "invisible", "open", "slotProps", "slots", "TransitionComponent", "transitionDuration"], Gh = (e) => {
  const {
    classes: t,
    invisible: n
  } = e;
  return dt({
    root: ["root", n && "invisible"]
  }, Uh, t);
}, Wh = Re("div", {
  name: "MuiBackdrop",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, n.invisible && t.invisible];
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
})), Ks = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a;
  const i = ut({
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
    TransitionComponent: b = zh,
    transitionDuration: x
  } = i, P = he(i, Hh), w = R({}, i, {
    component: d,
    invisible: g
  }), E = Gh(w), y = (r = h.root) != null ? r : v.root;
  return /* @__PURE__ */ m(b, R({
    in: p,
    timeout: x
  }, P, {
    children: /* @__PURE__ */ m(Wh, R({
      "aria-hidden": !0
    }, y, {
      as: (o = (a = u.root) != null ? a : f.Root) != null ? o : d,
      className: Se(E.root, c, y == null ? void 0 : y.className),
      ownerState: R({}, w, y == null ? void 0 : y.ownerState),
      classes: E,
      ref: n,
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
const Xh = Ks;
function qh(e) {
  return nt("MuiModal", e);
}
wt("MuiModal", ["root", "hidden", "backdrop"]);
const Yh = ["BackdropComponent", "BackdropProps", "classes", "className", "closeAfterTransition", "children", "container", "component", "components", "componentsProps", "disableAutoFocus", "disableEnforceFocus", "disableEscapeKeyDown", "disablePortal", "disableRestoreFocus", "disableScrollLock", "hideBackdrop", "keepMounted", "onBackdropClick", "onClose", "onTransitionEnter", "onTransitionExited", "open", "slotProps", "slots", "theme"], Kh = (e) => {
  const {
    open: t,
    exited: n,
    classes: r
  } = e;
  return dt({
    root: ["root", !t && n && "hidden"],
    backdrop: ["backdrop"]
  }, qh, r);
}, Jh = Re("div", {
  name: "MuiModal",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, !n.open && n.exited && t.hidden];
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
})), Zh = Re(Xh, {
  name: "MuiModal",
  slot: "Backdrop",
  overridesResolver: (e, t) => t.backdrop
})({
  zIndex: -1
}), Js = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a, i, l, c;
  const d = ut({
    name: "MuiModal",
    props: t
  }), {
    BackdropComponent: f = Zh,
    BackdropProps: v,
    className: g,
    closeAfterTransition: p = !1,
    children: h,
    container: u,
    component: b,
    components: x = {},
    componentsProps: P = {},
    disableAutoFocus: w = !1,
    disableEnforceFocus: E = !1,
    disableEscapeKeyDown: y = !1,
    disablePortal: C = !1,
    disableRestoreFocus: N = !1,
    disableScrollLock: I = !1,
    hideBackdrop: B = !1,
    keepMounted: V = !1,
    onBackdropClick: k,
    open: S,
    slotProps: $,
    slots: F
    // eslint-disable-next-line react/prop-types
  } = d, H = he(d, Yh), _ = R({}, d, {
    closeAfterTransition: p,
    disableAutoFocus: w,
    disableEnforceFocus: E,
    disableEscapeKeyDown: y,
    disablePortal: C,
    disableRestoreFocus: N,
    disableScrollLock: I,
    hideBackdrop: B,
    keepMounted: V
  }), {
    getRootProps: z,
    getBackdropProps: te,
    getTransitionProps: Q,
    portalRef: O,
    isTopModal: M,
    exited: U,
    hasTransition: Y
  } = Yf(R({}, _, {
    rootRef: n
  })), W = R({}, _, {
    exited: U
  }), X = Kh(W), K = {};
  if (h.props.tabIndex === void 0 && (K.tabIndex = "-1"), Y) {
    const {
      onEnter: ne,
      onExited: A
    } = Q();
    K.onEnter = ne, K.onExited = A;
  }
  const J = (r = (o = F == null ? void 0 : F.root) != null ? o : x.Root) != null ? r : Jh, q = (a = (i = F == null ? void 0 : F.backdrop) != null ? i : x.Backdrop) != null ? a : f, Z = (l = $ == null ? void 0 : $.root) != null ? l : P.root, ee = (c = $ == null ? void 0 : $.backdrop) != null ? c : P.backdrop, se = Dt({
    elementType: J,
    externalSlotProps: Z,
    externalForwardedProps: H,
    getSlotProps: z,
    additionalProps: {
      ref: n,
      as: b
    },
    ownerState: W,
    className: Se(g, Z == null ? void 0 : Z.className, X == null ? void 0 : X.root, !W.open && W.exited && (X == null ? void 0 : X.hidden))
  }), j = Dt({
    elementType: q,
    externalSlotProps: ee,
    additionalProps: v,
    getSlotProps: (ne) => te(R({}, ne, {
      onClick: (A) => {
        k && k(A), ne != null && ne.onClick && ne.onClick(A);
      }
    })),
    className: Se(ee == null ? void 0 : ee.className, v == null ? void 0 : v.className, X == null ? void 0 : X.backdrop),
    ownerState: W
  });
  return !V && !S && (!Y || U) ? null : /* @__PURE__ */ m(Mn, {
    ref: O,
    container: u,
    disablePortal: C,
    children: /* @__PURE__ */ D(J, R({}, se, {
      children: [!B && f ? /* @__PURE__ */ m(q, R({}, j)) : null, /* @__PURE__ */ m(dr, {
        disableEnforceFocus: E,
        disableAutoFocus: w,
        disableRestoreFocus: N,
        isEnabled: M,
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
  children: Bn.isRequired,
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
const Qh = Js;
function eg(e) {
  return nt("MuiPaper", e);
}
wt("MuiPaper", ["root", "rounded", "outlined", "elevation", "elevation0", "elevation1", "elevation2", "elevation3", "elevation4", "elevation5", "elevation6", "elevation7", "elevation8", "elevation9", "elevation10", "elevation11", "elevation12", "elevation13", "elevation14", "elevation15", "elevation16", "elevation17", "elevation18", "elevation19", "elevation20", "elevation21", "elevation22", "elevation23", "elevation24"]);
const tg = ["className", "component", "elevation", "square", "variant"], ng = (e) => {
  const {
    square: t,
    elevation: n,
    variant: r,
    classes: o
  } = e, a = {
    root: ["root", r, !t && "rounded", r === "elevation" && `elevation${n}`]
  };
  return dt(a, eg, o);
}, rg = Re("div", {
  name: "MuiPaper",
  slot: "Root",
  overridesResolver: (e, t) => {
    const {
      ownerState: n
    } = e;
    return [t.root, t[n.variant], !n.square && t.rounded, n.variant === "elevation" && t[`elevation${n.elevation}`]];
  }
})(({
  theme: e,
  ownerState: t
}) => {
  var n;
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
    backgroundImage: `linear-gradient(${pr("#fff", ii(t.elevation))}, ${pr("#fff", ii(t.elevation))})`
  }, e.vars && {
    backgroundImage: (n = e.vars.overlays) == null ? void 0 : n[t.elevation]
  }));
}), Zs = /* @__PURE__ */ T.forwardRef(function(t, n) {
  const r = ut({
    props: t,
    name: "MuiPaper"
  }), {
    className: o,
    component: a = "div",
    elevation: i = 1,
    square: l = !1,
    variant: c = "elevation"
  } = r, d = he(r, tg), f = R({}, r, {
    component: a,
    elevation: i,
    square: l,
    variant: c
  }), v = ng(f);
  return process.env.NODE_ENV !== "production" && Un().shadows[i] === void 0 && console.error([`MUI: The elevation provided <Paper elevation={${i}}> is not available in the theme.`, `Please make sure that \`theme.shadows[${i}]\` is defined.`].join(`
`)), /* @__PURE__ */ m(rg, R({
    as: a,
    ownerState: f,
    className: Se(v.root, o),
    ref: n
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
  elevation: rn(ps, (e) => {
    const {
      elevation: t,
      variant: n
    } = e;
    return t > 0 && n === "outlined" ? new Error(`MUI: Combining \`elevation={${t}}\` with \`variant="${n}"\` has no effect. Either use \`elevation={0}\` or use a different \`variant\`.`) : null;
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
const og = Zs;
function ag(e) {
  return nt("MuiPopover", e);
}
wt("MuiPopover", ["root", "paper"]);
const ig = ["onEntering"], sg = ["action", "anchorEl", "anchorOrigin", "anchorPosition", "anchorReference", "children", "className", "container", "elevation", "marginThreshold", "open", "PaperProps", "slots", "slotProps", "transformOrigin", "TransitionComponent", "transitionDuration", "TransitionProps", "disableScrollLock"], lg = ["slotProps"];
function pi(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.height / 2 : t === "bottom" && (n = e.height), n;
}
function di(e, t) {
  let n = 0;
  return typeof t == "number" ? n = t : t === "center" ? n = e.width / 2 : t === "right" && (n = e.width), n;
}
function ui(e) {
  return [e.horizontal, e.vertical].map((t) => typeof t == "number" ? `${t}px` : t).join(" ");
}
function rr(e) {
  return typeof e == "function" ? e() : e;
}
const cg = (e) => {
  const {
    classes: t
  } = e;
  return dt({
    root: ["root"],
    paper: ["paper"]
  }, ag, t);
}, pg = Re(Qh, {
  name: "MuiPopover",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), Qs = Re(og, {
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
}), el = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o, a;
  const i = ut({
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
    disableScrollLock: B = !1
  } = i, V = he(i.TransitionProps, ig), k = he(i, sg), S = (r = E == null ? void 0 : E.paper) != null ? r : P, $ = T.useRef(), F = We($, S.ref), H = R({}, i, {
    anchorOrigin: d,
    anchorReference: v,
    elevation: u,
    marginThreshold: b,
    externalPaperSlotProps: S,
    transformOrigin: y,
    TransitionComponent: C,
    transitionDuration: N,
    TransitionProps: V
  }), _ = cg(H), z = T.useCallback(() => {
    if (v === "anchorPosition")
      return process.env.NODE_ENV !== "production" && (f || console.error('MUI: You need to provide a `anchorPosition` prop when using <Popover anchorReference="anchorPosition" />.')), f;
    const ne = rr(c), A = ne && ne.nodeType === 1 ? ne : Oe($.current).body, le = A.getBoundingClientRect();
    if (process.env.NODE_ENV !== "production") {
      const Te = A.getBoundingClientRect();
      process.env.NODE_ENV !== "test" && Te.top === 0 && Te.left === 0 && Te.right === 0 && Te.bottom === 0 && console.warn(["MUI: The `anchorEl` prop provided to the component is invalid.", "The anchor element should be part of the document layout.", "Make sure the element is present in the document or that it's not display none."].join(`
`));
    }
    return {
      top: le.top + pi(le, d.vertical),
      left: le.left + di(le, d.horizontal)
    };
  }, [c, d.horizontal, d.vertical, f, v]), te = T.useCallback((ne) => ({
    vertical: pi(ne, y.vertical),
    horizontal: di(ne, y.horizontal)
  }), [y.horizontal, y.vertical]), Q = T.useCallback((ne) => {
    const A = {
      width: ne.offsetWidth,
      height: ne.offsetHeight
    }, le = te(A);
    if (v === "none")
      return {
        top: null,
        left: null,
        transformOrigin: ui(le)
      };
    const Te = z();
    let Pe = Te.top - le.vertical, Ee = Te.left - le.horizontal;
    const kt = Pe + A.height, $e = Ee + A.width, rt = Jt(rr(c)), Be = rt.innerHeight - b, ot = rt.innerWidth - b;
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
      transformOrigin: ui(le)
    };
  }, [c, v, z, te, b]), [O, M] = T.useState(x), U = T.useCallback(() => {
    const ne = $.current;
    if (!ne)
      return;
    const A = Q(ne);
    A.top !== null && (ne.style.top = A.top), A.left !== null && (ne.style.left = A.left), ne.style.transformOrigin = A.transformOrigin, M(!0);
  }, [Q]);
  T.useEffect(() => (B && window.addEventListener("scroll", U), () => window.removeEventListener("scroll", U)), [c, B, U]);
  const Y = (ne, A) => {
    I && I(ne, A), U();
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
    const ne = rs(() => {
      U();
    }), A = Jt(c);
    return A.addEventListener("resize", ne), () => {
      ne.clear(), A.removeEventListener("resize", ne);
    };
  }, [c, x, U]);
  let X = N;
  N === "auto" && !C.muiSupportAuto && (X = void 0);
  const K = h || (c ? Oe(rr(c)).body : void 0), J = (o = w == null ? void 0 : w.root) != null ? o : pg, q = (a = w == null ? void 0 : w.paper) != null ? a : Qs, Z = Dt({
    elementType: q,
    externalSlotProps: R({}, S, {
      style: O ? S.style : R({}, S.style, {
        opacity: 0
      })
    }),
    additionalProps: {
      elevation: u,
      ref: F
    },
    ownerState: H,
    className: Se(_.paper, S == null ? void 0 : S.className)
  }), ee = Dt({
    elementType: J,
    externalSlotProps: (E == null ? void 0 : E.root) || {},
    externalForwardedProps: k,
    additionalProps: {
      ref: n,
      slotProps: {
        backdrop: {
          invisible: !0
        }
      },
      container: K,
      open: x
    },
    ownerState: H,
    className: Se(_.root, p)
  }), {
    slotProps: se
  } = ee, j = he(ee, lg);
  return /* @__PURE__ */ m(J, R({}, j, !Es(J) && {
    slotProps: se,
    disableScrollLock: B
  }, {
    children: /* @__PURE__ */ m(C, R({
      appear: !0,
      in: x,
      onEntering: Y,
      onExited: W,
      timeout: X
    }, V, {
      children: /* @__PURE__ */ m(q, R({}, Z, {
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
  action: Ro,
  /**
   * An HTML element, [PopoverVirtualElement](/material-ui/react-popover/#virtual-element),
   * or a function that returns either.
   * It's used to set the position of the popover.
   */
  anchorEl: rn(s.oneOfType([lt, s.func]), (e) => {
    if (e.open && (!e.anchorReference || e.anchorReference === "anchorEl")) {
      const t = rr(e.anchorEl);
      if (t && t.nodeType === 1) {
        const n = t.getBoundingClientRect();
        if (process.env.NODE_ENV !== "test" && n.top === 0 && n.left === 0 && n.right === 0 && n.bottom === 0)
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
    component: Vp
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
const dg = el;
function ug(e) {
  return nt("MuiMenu", e);
}
wt("MuiMenu", ["root", "paper", "list"]);
const fg = ["onEntering"], mg = ["autoFocus", "children", "className", "disableAutoFocusItem", "MenuListProps", "onClose", "open", "PaperProps", "PopoverClasses", "transitionDuration", "TransitionProps", "variant", "slots", "slotProps"], hg = {
  vertical: "top",
  horizontal: "right"
}, gg = {
  vertical: "top",
  horizontal: "left"
}, bg = (e) => {
  const {
    classes: t
  } = e;
  return dt({
    root: ["root"],
    paper: ["paper"],
    list: ["list"]
  }, ug, t);
}, vg = Re(dg, {
  shouldForwardProp: (e) => ys(e) || e === "classes",
  name: "MuiMenu",
  slot: "Root",
  overridesResolver: (e, t) => t.root
})({}), yg = Re(Qs, {
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
}), wg = Re(Lh, {
  name: "MuiMenu",
  slot: "List",
  overridesResolver: (e, t) => t.list
})({
  // We disable the focus ring for mouse, touch and keyboard users.
  outline: 0
}), tl = /* @__PURE__ */ T.forwardRef(function(t, n) {
  var r, o;
  const a = ut({
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
    slots: P = {},
    slotProps: w = {}
  } = a, E = he(a.TransitionProps, fg), y = he(a, mg), C = Un(), N = C.direction === "rtl", I = R({}, a, {
    autoFocus: i,
    disableAutoFocusItem: d,
    MenuListProps: f,
    onEntering: b,
    PaperProps: p,
    transitionDuration: u,
    TransitionProps: E,
    variant: x
  }), B = bg(I), V = i && !d && g, k = T.useRef(null), S = (Q, O) => {
    k.current && k.current.adjustStyleForScrollbar(Q, C), b && b(Q, O);
  }, $ = (Q) => {
    Q.key === "Tab" && (Q.preventDefault(), v && v(Q, "tabKeyDown"));
  };
  let F = -1;
  T.Children.map(l, (Q, O) => {
    /* @__PURE__ */ T.isValidElement(Q) && (process.env.NODE_ENV !== "production" && sr.isFragment(Q) && console.error(["MUI: The Menu component doesn't accept a Fragment as a child.", "Consider providing an array instead."].join(`
`)), Q.props.disabled || (x === "selectedMenu" && Q.props.selected || F === -1) && (F = O));
  });
  const H = (r = P.paper) != null ? r : yg, _ = (o = w.paper) != null ? o : p, z = Dt({
    elementType: P.root,
    externalSlotProps: w.root,
    ownerState: I,
    className: [B.root, c]
  }), te = Dt({
    elementType: H,
    externalSlotProps: _,
    ownerState: I,
    className: B.paper
  });
  return /* @__PURE__ */ m(vg, R({
    onClose: v,
    anchorOrigin: {
      vertical: "bottom",
      horizontal: N ? "right" : "left"
    },
    transformOrigin: N ? hg : gg,
    slots: {
      paper: H,
      root: P.root
    },
    slotProps: {
      root: z,
      paper: te
    },
    open: g,
    ref: n,
    transitionDuration: u,
    TransitionProps: R({
      onEntering: S
    }, E),
    ownerState: I
  }, y, {
    classes: h,
    children: /* @__PURE__ */ m(wg, R({
      onKeyDown: $,
      actions: k,
      autoFocus: i && (F === -1 || d),
      autoFocusItem: V,
      variant: x
    }, f, {
      className: Se(B.list, f.className),
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
const xg = tl;
function Sv({
  className: e,
  commandHandler: t,
  menuDefinition: n,
  children: r
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
  }, []), c = hr(() => {
    if (o !== void 0)
      return { top: o.mouseY, left: o.mouseX };
  }, [o]);
  return (((d = n == null ? void 0 : n.items) == null ? void 0 : d.length) ?? 0) === 0 || !r ? r : /* @__PURE__ */ D(
    "div",
    {
      className: `papi-context-menu-target ${e ?? ""}`,
      onContextMenu: i,
      children: [
        r,
        /* @__PURE__ */ m(
          xg,
          {
            className: `papi-context-menu ${e ?? ""}`,
            open: o !== void 0,
            onClose: l,
            anchorReference: "anchorPosition",
            anchorPosition: c,
            children: /* @__PURE__ */ m(
              Xo,
              {
                menuDefinition: n,
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
function Eg(e) {
  return {
    preserveValue: !0,
    ...e
  };
}
const bo = (e, t, n = {}) => {
  const r = $t(t);
  r.current = t;
  const o = $t(n);
  o.current = Eg(o.current);
  const [a, i] = ie(() => r.current), [l, c] = ie(!0);
  return Fe(() => {
    let d = !0;
    return c(!!e), (async () => {
      if (e) {
        const f = await e();
        d && (i(() => f), c(!1));
      }
    })(), () => {
      d = !1, o.current.preserveValue || i(() => r.current);
    };
  }, [e]), [a, l];
}, kg = ws(/* @__PURE__ */ m("path", {
  d: "M3 18h18v-2H3zm0-5h18v-2H3zm0-7v2h18V6z"
}), "Menu");
function Tg({
  menuProvider: e,
  normalMenu: t,
  fullMenu: n,
  commandHandler: r,
  containerRef: o,
  className: a,
  ariaLabelPrefix: i,
  children: l
}) {
  const [c, d] = ie(!1), [f, v] = ie(!1), g = Ce(() => {
    c && d(!1), v(!1);
  }, [c]), p = Ce((E) => {
    E.stopPropagation(), d((y) => {
      const C = !y;
      return C && E.shiftKey ? v(!0) : C || v(!1), C;
    });
  }, []), h = Ce(
    (E) => (g(), r(E)),
    [r, g]
  ), [u, b] = ie({ top: 1, left: 1 });
  Fe(() => {
    if (c) {
      const E = o == null ? void 0 : o.current;
      if (E) {
        const y = E.getBoundingClientRect(), C = window.scrollY, N = window.scrollX, I = y.top + C + E.clientHeight, B = y.left + N;
        b({ top: I, left: B });
      }
    }
  }, [c, o]);
  const [x] = bo(
    Ce(async () => (e == null ? void 0 : e(!1)) ?? t, [e, t, c]),
    t
  ), [P] = bo(
    Ce(async () => (e == null ? void 0 : e(!0)) ?? n ?? x, [e, n, x, c]),
    n ?? x
  ), w = f && P ? P : x;
  return /* @__PURE__ */ D(yt, { children: [
    /* @__PURE__ */ m(
      Oi,
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
        children: l ?? /* @__PURE__ */ m(kg, {})
      }
    ),
    /* @__PURE__ */ m(
      xc,
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
          $h,
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
function Ov({
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
  return /* @__PURE__ */ m(
    Oi,
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
const gt = "scrBook", Ng = "scrRef", Ot = "source", Cg = "details", Sg = "Scripture Reference", Og = "Scripture Book", nl = "Type", Rg = "Details";
function Pg(e, t) {
  const n = t ?? !1;
  return [
    {
      accessorFn: (r) => `${me.bookNumberToId(r.start.bookNum)} ${r.start.chapterNum}:${r.start.verseNum}`,
      id: gt,
      header: (e == null ? void 0 : e.scriptureReferenceColumnName) ?? Sg,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? me.bookNumberToEnglishName(o.start.bookNum) : r.row.groupingColumnId === gt ? Lr(o.start) : void 0;
      },
      getGroupingValue: (r) => r.start.bookNum,
      sortingFn: (r, o) => ro(r.original.start, o.original.start),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => Lr(r.start),
      id: Ng,
      header: void 0,
      cell: (r) => {
        const o = r.row.original;
        return r.row.getIsGrouped() ? void 0 : Lr(o.start);
      },
      sortingFn: (r, o) => ro(r.original.start, o.original.start),
      enableGrouping: !1
    },
    {
      accessorFn: (r) => r.source.displayName,
      id: Ot,
      header: n ? (e == null ? void 0 : e.typeColumnName) ?? nl : void 0,
      cell: (r) => n || r.row.getIsGrouped() ? r.getValue() : void 0,
      getGroupingValue: (r) => r.source.id,
      sortingFn: (r, o) => r.original.source.displayName.localeCompare(o.original.source.displayName),
      enableGrouping: !0
    },
    {
      accessorFn: (r) => r.detail,
      id: Cg,
      header: (e == null ? void 0 : e.detailsColumnName) ?? Rg,
      cell: (r) => r.getValue(),
      enableGrouping: !1
    }
  ];
}
function Rv({
  sources: e,
  showColumnHeaders: t = !1,
  showSourceColumn: n = !1,
  scriptureReferenceColumnName: r,
  scriptureBookGroupName: o,
  typeColumnName: a,
  detailsColumnName: i,
  onRowSelected: l
}) {
  const [c, d] = ie([]), [f, v] = ie([{ id: gt, desc: !1 }]), [g, p] = ie(() => e.flatMap((k) => {
    const S = k.source;
    return k.data.map(($) => ({
      ...$,
      source: S
    }));
  })), [h, u] = ie({});
  Fe(() => {
    p(() => e.flatMap((k) => {
      const S = k.source;
      return k.data.map(($) => ({
        ...$,
        source: S
      }));
    }));
  }, [e]);
  const b = hr(
    () => Pg(
      {
        scriptureReferenceColumnName: r,
        typeColumnName: a,
        detailsColumnName: i
      },
      n
    ),
    [r, a, i, n]
  );
  Fe(() => {
    c.includes(Ot) ? v([
      { id: Ot, desc: !1 },
      { id: gt, desc: !1 }
    ]) : v([{ id: gt, desc: !1 }]);
  }, [c]);
  const x = Ce(
    (k, S) => !S || ro(k, S) === 0 ? `${jr(k)}` : `${jr(k)}-${jr(S)}`,
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
    onGroupingChange: d,
    onSortingChange: v,
    onRowSelectionChange: u,
    getExpandedRowModel: uc(),
    getGroupedRowModel: fc(),
    getCoreRowModel: Ti(),
    getSortedRowModel: Ni(),
    getRowId: P,
    autoResetExpanded: !1,
    enableMultiRowSelection: !1,
    enableSubRowSelection: !1
  });
  Fe(() => {
    if (l) {
      const k = w.getSelectedRowModel().rowsById, S = Object.keys(k);
      if (S.length === 1) {
        const $ = g.find((F) => P(F) === S[0]) || void 0;
        $ && l($);
      }
    }
  }, [h, g, P, l, w]);
  const E = o ?? Og, y = a ?? nl, C = [
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
  ], N = (k) => {
    d(JSON.parse(k));
  }, I = (k, S) => {
    !k.getIsGrouped() && !k.getIsSelected() && k.getToggleSelectedHandler()(S);
  }, B = (k, S) => k.getIsGrouped() ? "" : L("banded-row", S % 2 === 0 ? "even" : "odd"), V = (k, S, $) => {
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
  return /* @__PURE__ */ D("div", { className: "pr-twp pr-flex pr-h-full pr-w-full pr-flex-col", children: [
    !t && /* @__PURE__ */ D(
      ar,
      {
        value: JSON.stringify(c),
        onValueChange: (k) => {
          N(k);
        },
        children: [
          /* @__PURE__ */ m(On, { className: "pr-mb-1 pr-mt-2", children: /* @__PURE__ */ m(ir, {}) }),
          /* @__PURE__ */ m(Rn, { position: "item-aligned", children: /* @__PURE__ */ m(lp, { children: C.map((k) => /* @__PURE__ */ m(Ke, { value: JSON.stringify(k.value), children: k.label }, k.label)) }) })
        ]
      }
    ),
    /* @__PURE__ */ D(vr, { className: "pr-relative pr-flex pr-flex-col pr-overflow-y-auto pr-p-0", children: [
      t && /* @__PURE__ */ m(yr, { children: w.getHeaderGroups().map((k) => /* @__PURE__ */ m(vt, { children: k.headers.filter((S) => S.column.columnDef.header).map((S) => (
        /* For sticky column headers to work, we probably need to change the default definition of the shadcn Table component. See https://github.com/shadcn-ui/ui/issues/1151 */
        /* @__PURE__ */ m(Pn, { colSpan: S.colSpan, className: "top-0 pr-sticky", children: S.isPlaceholder ? void 0 : /* @__PURE__ */ D("div", { children: [
          S.column.getCanGroup() ? /* @__PURE__ */ m(
            we,
            {
              variant: "ghost",
              title: `Toggle grouping by ${S.column.columnDef.header}`,
              onClick: S.column.getToggleGroupingHandler(),
              type: "button",
              children: S.column.getIsGrouped() ? "🛑" : "👊 "
            }
          ) : void 0,
          " ",
          xn(S.column.columnDef.header, S.getContext())
        ] }) }, S.id)
      )) }, k.id)) }),
      /* @__PURE__ */ m(wr, { children: w.getRowModel().rows.map((k, S) => /* @__PURE__ */ m(
        vt,
        {
          "data-state": k.getIsSelected() ? "selected" : "",
          className: L(B(k, S)),
          onClick: ($) => I(k, $),
          children: k.getVisibleCells().map(($) => {
            if (!($.getIsPlaceholder() || $.column.columnDef.enableGrouping && !$.getIsGrouped() && ($.column.columnDef.id !== Ot || !n)))
              return /* @__PURE__ */ m(
                Yt,
                {
                  className: L(
                    $.column.columnDef.id,
                    "pr-p-[1px]",
                    V(c, k, $)
                  ),
                  children: (() => $.getIsGrouped() ? /* @__PURE__ */ D(
                    we,
                    {
                      variant: "ghost",
                      onClick: k.getToggleExpandedHandler(),
                      type: "button",
                      children: [
                        k.getIsExpanded() ? "👇" : "👉",
                        " ",
                        xn($.column.columnDef.cell, $.getContext()),
                        " (",
                        k.subRows.length,
                        ")"
                      ]
                    }
                  ) : xn($.column.columnDef.cell, $.getContext()))()
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
function $g({ onSearch: e, placeholder: t, isFullWidth: n }) {
  const [r, o] = ie(""), a = (i) => {
    o(i), e(i);
  };
  return /* @__PURE__ */ m(
    Dn,
    {
      className: L(
        "pr-flex pr-h-10 pr-rounded-md pr-border pr-border-input pr-bg-background pr-px-3 pr-py-2 pr-text-sm pr-ring-offset-background file:pr-border-0 file:pr-bg-transparent file:pr-text-sm file:pr-font-medium placeholder:pr-text-muted-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-[color:hsl(240,5%,64.9%)] focus-visible:pr-ring-offset-2 disabled:pr-cursor-not-allowed disabled:pr-opacity-50",
        { "pr-w-full": n }
      ),
      placeholder: t,
      value: r,
      onChange: (i) => a(i.target.value)
    }
  );
}
function Pv({
  id: e,
  isDisabled: t = !1,
  orientation: n = "horizontal",
  min: r = 0,
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
    Ec,
    {
      id: e,
      disabled: t,
      orientation: n,
      min: r,
      max: o,
      step: a,
      marks: i,
      defaultValue: l,
      value: c,
      valueLabelDisplay: d,
      className: `papi-slider ${n} ${f ?? ""}`,
      onChange: v,
      onChangeCommitted: g
    }
  );
}
function $v({
  autoHideDuration: e = void 0,
  id: t,
  isOpen: n = !1,
  className: r,
  onClose: o,
  anchorOrigin: a = { vertical: "bottom", horizontal: "left" },
  ContentProps: i,
  children: l
}) {
  const c = {
    action: (i == null ? void 0 : i.action) || l,
    message: i == null ? void 0 : i.message,
    className: r
  };
  return /* @__PURE__ */ m(
    kc,
    {
      autoHideDuration: e ?? void 0,
      open: n,
      onClose: o,
      anchorOrigin: a,
      id: t,
      ContentProps: c
    }
  );
}
const rl = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.Root,
  {
    orientation: "vertical",
    ref: n,
    className: L("pr-flex pr-gap-1 pr-rounded-md pr-text-muted-foreground", e),
    ...t
  }
));
rl.displayName = De.List.displayName;
const ol = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.List,
  {
    ref: n,
    className: L(
      "pr-flex-fit pr-mlk-items-center pr-w-[124px] pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
ol.displayName = De.List.displayName;
const _g = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.Trigger,
  {
    ref: n,
    ...t,
    className: L(
      "overflow-clip pr-inline-flex pr-w-[116px] pr-cursor-pointer pr-items-center pr-justify-center pr-break-words pr-rounded-sm pr-border-0 pr-bg-muted pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-text-inherit pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    )
  }
)), al = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.Content,
  {
    ref: n,
    className: L(
      "mt-2 pr-ms-5 pr-flex-grow pr-text-foreground pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
al.displayName = De.Content.displayName;
function _v({
  tabList: e,
  onSearch: t,
  searchPlaceholder: n,
  headerTitle: r,
  isSearchBarFullWidth: o = !1
}) {
  return /* @__PURE__ */ D("div", { children: [
    /* @__PURE__ */ D("div", { className: "pr-space-y-2 pr-pb-2", children: [
      r ? /* @__PURE__ */ m("h1", { children: r }) : "",
      /* @__PURE__ */ m(
        $g,
        {
          isFullWidth: o,
          onSearch: t,
          placeholder: n
        }
      )
    ] }),
    /* @__PURE__ */ D(rl, { children: [
      /* @__PURE__ */ m(ol, { children: e.map((a) => /* @__PURE__ */ m(_g, { value: a.value, children: a.value }, a.key)) }),
      e.map((a) => /* @__PURE__ */ m(al, { value: a.value, children: a.content }, a.key))
    ] })
  ] });
}
const il = T.forwardRef(({ className: e, orientation: t = "horizontal", decorative: n = !0, ...r }, o) => /* @__PURE__ */ m(
  Ri.Root,
  {
    ref: o,
    decorative: n,
    orientation: t,
    className: L(
      "pr-shrink-0 pr-bg-border",
      t === "horizontal" ? "pr-h-[1px] pr-w-full" : "pr-h-full pr-w-[1px]",
      e
    ),
    ...r
  }
));
il.displayName = Ri.Root.displayName;
function Mv({ children: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-twp pr-grid", children: e });
}
function Iv({
  primary: e,
  secondary: t,
  generateActionComponent: n,
  isLoading: r = !1,
  loadingMessage: o
}) {
  return /* @__PURE__ */ D("div", { className: "pr-flex pr-items-center pr-justify-between pr-space-x-4 pr-py-2", children: [
    /* @__PURE__ */ D("div", { children: [
      /* @__PURE__ */ m("p", { className: "pr-text-sm pr-font-medium pr-leading-none", children: e }),
      /* @__PURE__ */ m("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    r ? /* @__PURE__ */ m("p", { className: "pr-text-sm pr-text-muted-foreground", children: o }) : n()
  ] });
}
function Av({ primary: e, secondary: t, includeSeparator: n = !1 }) {
  return /* @__PURE__ */ D("div", { className: "pr-space-y-4 pr-py-2", children: [
    /* @__PURE__ */ D("div", { children: [
      /* @__PURE__ */ m("h3", { className: "pr-text-lg pr-font-medium", children: e }),
      /* @__PURE__ */ m("p", { className: "pr-text-sm pr-text-muted-foreground", children: t })
    ] }),
    n ? /* @__PURE__ */ m(il, {}) : ""
  ] });
}
function Dv({
  id: e,
  isChecked: t,
  isDisabled: n = !1,
  hasError: r = !1,
  className: o,
  onChange: a
}) {
  return /* @__PURE__ */ m(
    Tc,
    {
      id: e,
      checked: t,
      disabled: n,
      className: `papi-switch ${r ? "error" : ""} ${o ?? ""}`,
      onChange: a
    }
  );
}
const Mg = xo(
  "pr-text-sm pr-font-medium pr-leading-none peer-disabled:pr-cursor-not-allowed peer-disabled:pr-opacity-70"
), sl = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(Pi.Root, { ref: n, className: L(Mg(), e), ...t }));
sl.displayName = Pi.Root.displayName;
function Bv({
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
  value: f,
  onChange: v,
  onFocus: g,
  onBlur: p
}) {
  return /* @__PURE__ */ D("div", { className: L("pr-inline-grid pr-items-center pr-gap-1.5", { "pr-w-full": r }), children: [
    /* @__PURE__ */ m(
      sl,
      {
        htmlFor: e,
        className: L({
          "pr-text-red-600": n,
          "pr-hidden": !a
        }),
        children: `${a}${l ? "*" : ""}`
      }
    ),
    /* @__PURE__ */ m(
      Dn,
      {
        id: e,
        disabled: t,
        placeholder: i,
        required: l,
        className: L(c, { "pr-border-red-600": n }),
        defaultValue: d,
        value: f,
        onChange: v,
        onFocus: g,
        onBlur: p
      }
    ),
    /* @__PURE__ */ m("p", { className: L({ "pr-hidden": !o }), children: o })
  ] });
}
function jv({
  menuProvider: e,
  commandHandler: t,
  className: n,
  id: r,
  children: o
}) {
  const a = $t(void 0);
  return /* @__PURE__ */ m("div", { ref: a, style: { position: "relative" }, children: /* @__PURE__ */ m(Nc, { position: "static", id: r, children: /* @__PURE__ */ D(Cc, { className: `papi-toolbar ${n ?? ""}`, variant: "dense", children: [
    e ? /* @__PURE__ */ m(
      Tg,
      {
        commandHandler: t,
        containerRef: a,
        menuProvider: e
      }
    ) : void 0,
    o ? /* @__PURE__ */ m("div", { className: "papi-toolbar-children", children: o }) : void 0
  ] }) }) });
}
const Lv = De.Root, Ig = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.List,
  {
    ref: n,
    className: L(
      "pr-inline-flex pr-h-10 pr-items-center pr-justify-center pr-rounded-md pr-bg-muted pr-p-1 pr-text-muted-foreground",
      e
    ),
    ...t
  }
));
Ig.displayName = De.List.displayName;
const Ag = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.Trigger,
  {
    ref: n,
    className: L(
      "pr-inline-flex pr-items-center pr-justify-center pr-whitespace-nowrap pr-rounded-sm pr-px-3 pr-py-1.5 pr-text-sm pr-font-medium pr-ring-offset-background pr-transition-all hover:pr-text-foreground focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50 data-[state=active]:pr-bg-background data-[state=active]:pr-text-foreground data-[state=active]:pr-shadow-sm",
      e
    ),
    ...t
  }
));
Ag.displayName = De.Trigger.displayName;
const Dg = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  De.Content,
  {
    ref: n,
    className: L(
      "pr-mt-2 pr-ring-offset-background focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2",
      e
    ),
    ...t
  }
));
Dg.displayName = De.Content.displayName;
const Qn = (e) => e === "asc" ? /* @__PURE__ */ m(tc, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : e === "desc" ? /* @__PURE__ */ m(nc, { className: "pr-ml-2 pr-h-4 pr-w-4" }) : /* @__PURE__ */ m(rc, { className: "pr-ml-2 pr-h-4 pr-w-4" }), Bg = (e, t, n, r, o) => [
  {
    accessorKey: "character",
    header: ({ column: a }) => /* @__PURE__ */ D(we, { onClick: () => a.toggleSorting(void 0), children: [
      e,
      Qn(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "unicodeValue",
    header: ({ column: a }) => /* @__PURE__ */ D(we, { onClick: () => a.toggleSorting(void 0), children: [
      t,
      Qn(a.getIsSorted())
    ] }),
    cell: ({ row: a }) => a.getValue("character").charCodeAt(0).toString(16).toUpperCase().padStart(4, "0")
  },
  {
    accessorKey: "count",
    header: ({ column: a }) => /* @__PURE__ */ D(we, { onClick: () => a.toggleSorting(void 0), children: [
      n,
      Qn(a.getIsSorted())
    ] })
  },
  {
    accessorKey: "status",
    header: ({ column: a, table: i }) => {
      const l = i.getSelectedRowModel().rows, c = [];
      return l.forEach((d) => {
        c.push(d.getValue("character"));
      }), /* @__PURE__ */ D("div", { children: [
        /* @__PURE__ */ m("div", { className: "pr-flex pr-justify-center", children: /* @__PURE__ */ D(we, { onClick: () => a.toggleSorting(void 0), children: [
          r,
          Qn(a.getIsSorted())
        ] }) }),
        /* @__PURE__ */ D("div", { className: "pr-flex pr-justify-center", children: [
          /* @__PURE__ */ m(we, { children: /* @__PURE__ */ m(
            da,
            {
              className: "pr-h-5 pr-w-5",
              onClick: () => {
                o(c, !0);
              }
            }
          ) }),
          /* @__PURE__ */ m(we, { children: /* @__PURE__ */ m(
            ua,
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
      return i === !0 ? /* @__PURE__ */ m(da, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : i === !1 ? /* @__PURE__ */ m(ua, { className: "pr-ml-2 pr-h-5 pr-w-5" }) : /* @__PURE__ */ m(fa, { className: "pr-ml-2 pr-h-5 pr-w-5" });
    }
  }
];
function jg({
  tableData: e,
  onStatusChange: t,
  onSelectCharacter: n,
  localizedStrings: r
}) {
  const o = r["%webView_inventory_table_header_character%"], a = r["%webView_inventory_table_header_unicode_value%"], i = r["%webView_inventory_table_header_count%"], l = r["%webView_inventory_table_header_status%"], c = (d, f) => {
    f.toggleAllRowsSelected(!1), d.toggleSelected(void 0), n(d.getValue("character"));
  };
  return /* @__PURE__ */ m("div", { className: "pr-overflow-y-auto", children: /* @__PURE__ */ m(
    mp,
    {
      columns: Bg(
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
const fi = (e, t, n) => {
  if (!e || e === "" || t === "")
    return [];
  const r = [], o = e.split(`
`);
  let a = "0", i = "0", l = 0;
  return o.forEach((c) => {
    const d = c.split(/\s+/);
    c.startsWith("\\c") && ([, a] = d, i = "0"), c.startsWith("\\v") && ([, i] = d, a === "0" && (a = n.chapterNum.toString()));
    for (let f = 0; f < d.length; f++)
      if (d[f].includes(t)) {
        const v = Math.max(0, f - 2), g = Math.min(d.length, f + 3), p = d.slice(v, g).join(" "), h = {
          reference: { ...n, chapterNum: +a, verseNum: +i },
          snippet: p,
          key: l
        };
        l += 1, r.push(h);
      }
  }), r;
};
function Lg({
  selectedCharacter: e,
  text: t,
  scriptureReference: n,
  setScriptureReference: r,
  localizedStrings: o
}) {
  const a = o["%webView_inventory_occurrences_table_header_reference%"], i = o["%webView_inventory_occurrences_table_header_occurrence%"], [l, c] = ie(
    fi(t, e, n)
  );
  return Fe(
    () => c(fi(t, e, n)),
    [t, e, n]
  ), /* @__PURE__ */ D(vr, { children: [
    /* @__PURE__ */ m(yr, { children: /* @__PURE__ */ D(vt, { children: [
      /* @__PURE__ */ m(Pn, { children: a }),
      /* @__PURE__ */ m(Pn, { children: i })
    ] }) }),
    /* @__PURE__ */ m(wr, { children: l.map((d) => /* @__PURE__ */ D(
      vt,
      {
        onClick: () => {
          r(d.reference);
        },
        children: [
          /* @__PURE__ */ m(Yt, { children: `${me.bookNumberToEnglishName(d.reference.bookNum)} ${d.reference.chapterNum}:${d.reference.verseNum}` }),
          /* @__PURE__ */ m(Yt, { children: d.snippet })
        ]
      },
      d.key
    )) })
  ] });
}
const Vg = async (e, t, n, r, o) => {
  const a = [];
  return cc(e, "").forEach((i) => {
    if (n !== "" && !i.includes(n))
      return;
    const l = a.find((c) => c.character === i);
    if (l)
      l.count += 1;
    else {
      let c;
      if (r.includes(i) && (c = !0), o.includes(i) && (c = !1), t === "all" || t === "approved" && c === !0 || t === "unapproved" && c === !1 || t === "unknown" && c === void 0) {
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
function Vv({
  scriptureReference: e,
  setScriptureReference: t,
  localizedStrings: n,
  projectId: r,
  getSetting: o,
  setSetting: a,
  getText: i
}) {
  const l = n["%webView_characterInventory_characters_all%"], c = n["%webView_characterInventory_characters_approved%"], d = n["%webView_characterInventory_characters_unapproved%"], f = n["%webView_characterInventory_characters_unknown%"], v = n["%webView_inventory_scope_book%"], g = n["%webView_inventory_scope_chapter%"], p = n["%webView_inventory_scope_verse%"], h = n["%webView_inventory_filter_text%"], [u, b] = ie([]), [x, P] = ie([]), [w, E] = ie(void 0), [y, C] = ie("book"), [N, I] = ie("all"), [B, V] = ie(""), [k, S] = ie([]), [$, F] = ie(""), H = (_, z) => {
    S((te) => {
      let Q = [];
      return _.forEach((O) => {
        Q = te.map((M) => M.character === O && M.status !== z ? { ...M, status: z } : M);
      }), b((O) => {
        let M = [...O];
        return _.forEach((U) => {
          z === !0 ? M.includes(U) || M.push(U) : M = M.filter((Y) => Y !== U);
        }), a("validCharacters", r, M), M;
      }), P((O) => {
        let M = [...O];
        return _.forEach((U) => {
          z === !1 ? M.includes(U) || M.push(U) : M = M.filter(
            (Y) => Y !== U
          );
        }), a("invalidCharacters", r, M), M;
      }), Q;
    });
  };
  return Fe(() => {
    (async () => {
      try {
        b(await o("validCharacters", r)), P(await o("invalidCharacters", r));
      } catch {
        throw new Error("Failed to fetch characters from project settings");
      }
    })();
  }, [r, o]), Fe(() => {
    (async () => {
      try {
        const z = await i(r, e, y);
        E(z);
      } catch {
        throw new Error("Failed getting scripture text");
      }
    })();
  }, [r, e, y, i]), Fe(() => {
    if (!w) {
      S([]);
      return;
    }
    (async () => {
      try {
        S(
          await Vg(w, N, B, u, x)
        );
      } catch {
        throw new Error("Failed building table data");
      }
    })();
  }, [u, x, w, N, B]), /* @__PURE__ */ D("div", { className: "pr-twp", children: [
    /* @__PURE__ */ D("div", { className: "pr-flex", children: [
      /* @__PURE__ */ D(
        ar,
        {
          onValueChange: (_) => I(_),
          defaultValue: N,
          children: [
            /* @__PURE__ */ m(On, { children: /* @__PURE__ */ m(ir, { placeholder: "Select filter" }) }),
            /* @__PURE__ */ D(Rn, { children: [
              /* @__PURE__ */ m(Ke, { value: "all", children: l }),
              /* @__PURE__ */ m(Ke, { value: "approved", children: c }),
              /* @__PURE__ */ m(Ke, { value: "unapproved", children: d }),
              /* @__PURE__ */ m(Ke, { value: "unknown", children: f })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ D(ar, { onValueChange: (_) => C(_), defaultValue: y, children: [
        /* @__PURE__ */ m(On, { children: /* @__PURE__ */ m(ir, { placeholder: "Select scope" }) }),
        /* @__PURE__ */ D(Rn, { children: [
          /* @__PURE__ */ m(Ke, { value: "book", children: v }),
          /* @__PURE__ */ m(Ke, { value: "chapter", children: g }),
          /* @__PURE__ */ m(Ke, { value: "verse", children: p })
        ] })
      ] }),
      /* @__PURE__ */ m(
        Dn,
        {
          className: "pr-rounded-md pr-border",
          placeholder: h,
          value: B,
          onChange: (_) => {
            V(_.target.value);
          }
        }
      )
    ] }),
    /* @__PURE__ */ m(
      "div",
      {
        className: `pr-overflow-y-auto pr-rounded-md pr-border ${$ !== "" && "pr-max-h-96"}`,
        children: /* @__PURE__ */ m(
          jg,
          {
            tableData: k,
            onStatusChange: H,
            onSelectCharacter: (_) => {
              F(_);
            },
            localizedStrings: n
          }
        )
      }
    ),
    $ !== "" && /* @__PURE__ */ m("div", { className: "pr-mt-4 pr-rounded-md pr-border", children: /* @__PURE__ */ m(
      Lg,
      {
        selectedCharacter: $,
        text: w,
        scriptureReference: e,
        setScriptureReference: (_) => t(_),
        localizedStrings: n
      }
    ) })
  ] });
}
function Fv({
  isInstalling: e,
  handleClick: t,
  buttonText: n
}) {
  return /* @__PURE__ */ m(
    we,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-text-white pr-transition pr-duration-300 pr-ease-in-out",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e,
          "pr-bg-blue-600": !e,
          "pr-bg-white pr-text-blue-600": !n,
          "pr-w-20": n
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ m(gr, { size: 15, className: "pr-animate-spin" }) : /* @__PURE__ */ D(yt, { children: [
        /* @__PURE__ */ m(oc, { size: 25, className: L("pr-h-4 pr-w-4", { "pr-mr-1": n }) }),
        n
      ] })
    }
  );
}
function zv({ isEnabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    we,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ D(yt, { children: [
        /* @__PURE__ */ m(gr, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Enabling..."
      ] }) : "Enable"
    }
  );
}
function Uv({ isDisabling: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    we,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-bg-gray-300 pr-text-black pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-gray-400": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ D(yt, { children: [
        /* @__PURE__ */ m(gr, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-black" }),
        "Disabling..."
      ] }) : "Disable"
    }
  );
}
function Hv({ isUpdating: e, handleClick: t }) {
  return /* @__PURE__ */ m(
    we,
    {
      className: L(
        "pr-h-8 pr-rounded-md pr-bg-blue-600 pr-px-4 pr-text-white pr-transition pr-duration-300 pr-ease-in-out hover:pr-text-white",
        {
          "pr-cursor-not-allowed pr-bg-blue-700": e
        }
      ),
      onClick: t,
      children: e ? /* @__PURE__ */ D(yt, { children: [
        /* @__PURE__ */ m(gr, { size: 15, className: "pr-mr-1 pr-animate-spin pr-text-white" }),
        "Updating..."
      ] }) : "Update"
    }
  );
}
function Pt() {
  return Pt = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, Pt.apply(this, arguments);
}
const Fg = ["children", "options"], mi = ["allowFullScreen", "allowTransparency", "autoComplete", "autoFocus", "autoPlay", "cellPadding", "cellSpacing", "charSet", "className", "classId", "colSpan", "contentEditable", "contextMenu", "crossOrigin", "encType", "formAction", "formEncType", "formMethod", "formNoValidate", "formTarget", "frameBorder", "hrefLang", "inputMode", "keyParams", "keyType", "marginHeight", "marginWidth", "maxLength", "mediaGroup", "minLength", "noValidate", "radioGroup", "readOnly", "rowSpan", "spellCheck", "srcDoc", "srcLang", "srcSet", "tabIndex", "useMap"].reduce((e, t) => (e[t.toLowerCase()] = t, e), { for: "htmlFor" }), hi = { amp: "&", apos: "'", gt: ">", lt: "<", nbsp: " ", quot: "“" }, zg = ["style", "script"], Ug = /([-A-Z0-9_:]+)(?:\s*=\s*(?:(?:"((?:\\.|[^"])*)")|(?:'((?:\\.|[^'])*)')|(?:\{((?:\\.|{[^}]*?}|[^}])*)\})))?/gi, Hg = /mailto:/i, Gg = /\n{2,}$/, ll = /^( *>[^\n]+(\n[^\n]+)*\n*)+\n{2,}/, Wg = /^ *> ?/gm, Xg = /^ {2,}\n/, qg = /^(?:( *[-*_])){3,} *(?:\n *)+\n/, cl = /^\s*(`{3,}|~{3,}) *(\S+)?([^\n]*?)?\n([\s\S]+?)\s*\1 *(?:\n *)*\n?/, pl = /^(?: {4}[^\n]+\n*)+(?:\n *)+\n?/, Yg = /^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/, Kg = /^(?:\n *)*\n/, Jg = /\r\n?/g, Zg = /^\[\^([^\]]+)](:.*)\n/, Qg = /^\[\^([^\]]+)]/, eb = /\f/g, tb = /^\s*?\[(x|\s)\]/, dl = /^ *(#{1,6}) *([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, ul = /^ *(#{1,6}) +([^\n]+?)(?: +#*)?(?:\n *)*(?:\n|$)/, fl = /^([^\n]+)\n *(=|-){3,} *(?:\n *)+\n/, vo = /^ *(?!<[a-z][^ >/]* ?\/>)<([a-z][^ >/]*) ?([^>]*)\/{0}>\n?(\s*(?:<\1[^>]*?>[\s\S]*?<\/\1>|(?!<\1)[\s\S])*?)<\/\1>\n*/i, nb = /&([a-z0-9]+|#[0-9]{1,6}|#x[0-9a-fA-F]{1,6});/gi, ml = /^<!--[\s\S]*?(?:-->)/, rb = /^(data|aria|x)-[a-z_][a-z\d_.-]*$/, yo = /^ *<([a-z][a-z0-9:]*)(?:\s+((?:<.*?>|[^>])*))?\/?>(?!<\/\1>)(\s*\n)?/i, ob = /^\{.*\}$/, ab = /^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/, ib = /^<([^ >]+@[^ >]+)>/, sb = /^<([^ >]+:\/[^ >]+)>/, lb = /-([a-z])?/gi, hl = /^(.*\|?.*)\n *(\|? *[-:]+ *\|[-| :]*)\n((?:.*\|.*\n)*)\n?/, cb = /^\[([^\]]*)\]:\s+<?([^\s>]+)>?\s*("([^"]*)")?/, pb = /^!\[([^\]]*)\] ?\[([^\]]*)\]/, db = /^\[([^\]]*)\] ?\[([^\]]*)\]/, ub = /(\[|\])/g, fb = /(\n|^[-*]\s|^#|^ {2,}|^-{2,}|^>\s)/, mb = /\t/g, hb = /^ *\| */, gb = /(^ *\||\| *$)/g, bb = / *$/, vb = /^ *:-+: *$/, yb = /^ *:-+ *$/, wb = /^ *-+: *$/, xb = /^([*_])\1((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1\1(?!\1)/, Eb = /^([*_])((?:\[.*?\][([].*?[)\]]|<.*?>(?:.*?<.*?>)?|`.*?`|~+.*?~+|.)*?)\1(?!\1|\w)/, kb = /^==((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)==/, Tb = /^~~((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)~~/, Nb = /^\\([^0-9A-Za-z\s])/, Cb = /^[\s\S]+?(?=[^0-9A-Z\s\u00c0-\uffff&#;.()'"]|\d+\.|\n\n| {2,}\n|\w+:\S|$)/i, Sb = /^\n+/, Ob = /^([ \t]*)/, Rb = /\\([^\\])/g, gi = / *\n+$/, Pb = /(?:^|\n)( *)$/, qo = "(?:\\d+\\.)", Yo = "(?:[*+-])";
function gl(e) {
  return "( *)(" + (e === 1 ? qo : Yo) + ") +";
}
const bl = gl(1), vl = gl(2);
function yl(e) {
  return new RegExp("^" + (e === 1 ? bl : vl));
}
const $b = yl(1), _b = yl(2);
function wl(e) {
  return new RegExp("^" + (e === 1 ? bl : vl) + "[^\\n]*(?:\\n(?!\\1" + (e === 1 ? qo : Yo) + " )[^\\n]*)*(\\n|$)", "gm");
}
const xl = wl(1), El = wl(2);
function kl(e) {
  const t = e === 1 ? qo : Yo;
  return new RegExp("^( *)(" + t + ") [\\s\\S]+?(?:\\n{2,}(?! )(?!\\1" + t + " (?!" + t + " ))\\n*|\\s*\\n*$)");
}
const Tl = kl(1), Nl = kl(2);
function bi(e, t) {
  const n = t === 1, r = n ? Tl : Nl, o = n ? xl : El, a = n ? $b : _b;
  return { t(i, l, c) {
    const d = Pb.exec(c);
    return d && (l.o || !l._ && !l.u) ? r.exec(i = d[1] + i) : null;
  }, i: ae.HIGH, l(i, l, c) {
    const d = n ? +i[2] : void 0, f = i[0].replace(Gg, `
`).match(o);
    let v = !1;
    return { p: f.map(function(g, p) {
      const h = a.exec(g)[0].length, u = new RegExp("^ {1," + h + "}", "gm"), b = g.replace(u, "").replace(a, ""), x = p === f.length - 1, P = b.indexOf(`

`) !== -1 || x && v;
      v = P;
      const w = c._, E = c.o;
      let y;
      c.o = !0, P ? (c._ = !1, y = b.replace(gi, `

`)) : (c._ = !0, y = b.replace(gi, ""));
      const C = l(y, c);
      return c._ = w, c.o = E, C;
    }), m: n, g: d };
  }, h: (i, l, c) => e(i.m ? "ol" : "ul", { key: c.k, start: i.g }, i.p.map(function(d, f) {
    return e("li", { key: f }, l(d, c));
  })) };
}
const Mb = /^\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Ib = /^!\[([^\]]*)]\( *((?:\([^)]*\)|[^() ])*) *"?([^)"]*)?"?\)/, Cl = [ll, cl, pl, dl, fl, ul, ml, hl, xl, Tl, El, Nl], Ab = [...Cl, /^[^\n]+(?:  \n|\n{2,})/, vo, yo];
function Db(e) {
  return e.replace(/[ÀÁÂÃÄÅàáâãäåæÆ]/g, "a").replace(/[çÇ]/g, "c").replace(/[ðÐ]/g, "d").replace(/[ÈÉÊËéèêë]/g, "e").replace(/[ÏïÎîÍíÌì]/g, "i").replace(/[Ññ]/g, "n").replace(/[øØœŒÕõÔôÓóÒò]/g, "o").replace(/[ÜüÛûÚúÙù]/g, "u").replace(/[ŸÿÝý]/g, "y").replace(/[^a-z0-9- ]/gi, "").replace(/ /gi, "-").toLowerCase();
}
function Bb(e) {
  return wb.test(e) ? "right" : vb.test(e) ? "center" : yb.test(e) ? "left" : null;
}
function vi(e, t, n) {
  const r = n.$;
  n.$ = !0;
  const o = t(e.trim(), n);
  n.$ = r;
  let a = [[]];
  return o.forEach(function(i, l) {
    i.type === "tableSeparator" ? l !== 0 && l !== o.length - 1 && a.push([]) : (i.type !== "text" || o[l + 1] != null && o[l + 1].type !== "tableSeparator" || (i.v = i.v.replace(bb, "")), a[a.length - 1].push(i));
  }), a;
}
function jb(e, t, n) {
  n._ = !0;
  const r = vi(e[1], t, n), o = e[2].replace(gb, "").split("|").map(Bb), a = function(i, l, c) {
    return i.trim().split(`
`).map(function(d) {
      return vi(d, l, c);
    });
  }(e[3], t, n);
  return n._ = !1, { S: o, A: a, L: r, type: "table" };
}
function yi(e, t) {
  return e.S[t] == null ? {} : { textAlign: e.S[t] };
}
function mt(e) {
  return function(t, n) {
    return n._ ? e.exec(t) : null;
  };
}
function ht(e) {
  return function(t, n) {
    return n._ || n.u ? e.exec(t) : null;
  };
}
function it(e) {
  return function(t, n) {
    return n._ || n.u ? null : e.exec(t);
  };
}
function gn(e) {
  return function(t) {
    return e.exec(t);
  };
}
function Lb(e, t, n) {
  if (t._ || t.u || n && !n.endsWith(`
`))
    return null;
  let r = "";
  e.split(`
`).every((a) => !Cl.some((i) => i.test(a)) && (r += a + `
`, a.trim()));
  const o = r.trimEnd();
  return o == "" ? null : [r, o];
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
  return e.replace(Rb, "$1");
}
function or(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !0, n.u = !0;
  const a = e(t, n);
  return n._ = r, n.u = o, a;
}
function Vb(e, t, n) {
  const r = n._ || !1, o = n.u || !1;
  n._ = !1, n.u = !0;
  const a = e(t, n);
  return n._ = r, n.u = o, a;
}
function Fb(e, t, n) {
  return n._ = !1, e(t, n);
}
const Zr = (e, t, n) => ({ v: or(t, e[1], n) });
function Qr() {
  return {};
}
function eo() {
  return null;
}
function zb(...e) {
  return e.filter(Boolean).join(" ");
}
function to(e, t, n) {
  let r = e;
  const o = t.split(".");
  for (; o.length && (r = r[o[0]], r !== void 0); )
    o.shift();
  return r || n;
}
var ae;
function Ub(e, t = {}) {
  t.overrides = t.overrides || {}, t.slugify = t.slugify || Db, t.namedCodesToUnicode = t.namedCodesToUnicode ? Pt({}, hi, t.namedCodesToUnicode) : hi;
  const n = t.createElement || T.createElement;
  function r(p, h, ...u) {
    const b = to(t.overrides, `${p}.props`, {});
    return n(function(x, P) {
      const w = to(P, x);
      return w ? typeof w == "function" || typeof w == "object" && "render" in w ? w : to(P, `${x}.component`, x) : x;
    }(p, t.overrides), Pt({}, h, b, { className: zb(h == null ? void 0 : h.className, b.className) || void 0 }), ...u);
  }
  function o(p) {
    let h = !1;
    t.forceInline ? h = !0 : t.forceBlock || (h = fb.test(p) === !1);
    const u = f(d(h ? p : `${p.trimEnd().replace(Sb, "")}

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
        return x = u[0], typeof x == "string" ? r("span", { key: "outer" }, x) : x;
      x = null;
    }
    return T.createElement(b, { key: "outer" }, x);
  }
  function a(p) {
    const h = p.match(Ug);
    return h ? h.reduce(function(u, b, x) {
      const P = b.indexOf("=");
      if (P !== -1) {
        const w = function(N) {
          return N.indexOf("-") !== -1 && N.match(rb) === null && (N = N.replace(lb, function(I, B) {
            return B.toUpperCase();
          })), N;
        }(b.slice(0, P)).trim(), E = function(N) {
          const I = N[0];
          return (I === '"' || I === "'") && N.length >= 2 && N[N.length - 1] === I ? N.slice(1, -1) : N;
        }(b.slice(P + 1).trim()), y = mi[w] || w, C = u[y] = function(N, I) {
          return N === "style" ? I.split(/;\s?/).reduce(function(B, V) {
            const k = V.slice(0, V.indexOf(":"));
            return B[k.replace(/(-[a-z])/g, (S) => S[1].toUpperCase())] = V.slice(k.length + 1).trim(), B;
          }, {}) : N === "href" ? Gt(I) : (I.match(ob) && (I = I.slice(1, I.length - 1)), I === "true" || I !== "false" && I);
        }(w, E);
        typeof C == "string" && (vo.test(C) || yo.test(C)) && (u[y] = T.cloneElement(o(C.trim()), { key: x }));
      } else
        b !== "style" && (u[mi[b] || b] = !0);
      return u;
    }, {}) : null;
  }
  const i = [], l = {}, c = { blockQuote: { t: it(ll), i: ae.HIGH, l: (p, h, u) => ({ v: h(p[0].replace(Wg, ""), u) }), h: (p, h, u) => r("blockquote", { key: u.k }, h(p.v, u)) }, breakLine: { t: gn(Xg), i: ae.HIGH, l: Qr, h: (p, h, u) => r("br", { key: u.k }) }, breakThematic: { t: it(qg), i: ae.HIGH, l: Qr, h: (p, h, u) => r("hr", { key: u.k }) }, codeBlock: { t: it(pl), i: ae.MAX, l: (p) => ({ v: p[0].replace(/^ {4}/gm, "").replace(/\n+$/, ""), M: void 0 }), h: (p, h, u) => r("pre", { key: u.k }, r("code", Pt({}, p.O, { className: p.M ? `lang-${p.M}` : "" }), p.v)) }, codeFenced: { t: it(cl), i: ae.MAX, l: (p) => ({ O: a(p[3] || ""), v: p[4], M: p[2] || void 0, type: "codeBlock" }) }, codeInline: { t: ht(Yg), i: ae.LOW, l: (p) => ({ v: p[2] }), h: (p, h, u) => r("code", { key: u.k }, p.v) }, footnote: { t: it(Zg), i: ae.MAX, l: (p) => (i.push({ I: p[2], j: p[1] }), {}), h: eo }, footnoteReference: { t: mt(Qg), i: ae.HIGH, l: (p) => ({ v: p[1], B: `#${t.slugify(p[1])}` }), h: (p, h, u) => r("a", { key: u.k, href: Gt(p.B) }, r("sup", { key: u.k }, p.v)) }, gfmTask: { t: mt(tb), i: ae.HIGH, l: (p) => ({ R: p[1].toLowerCase() === "x" }), h: (p, h, u) => r("input", { checked: p.R, key: u.k, readOnly: !0, type: "checkbox" }) }, heading: { t: it(t.enforceAtxHeadings ? ul : dl), i: ae.HIGH, l: (p, h, u) => ({ v: or(h, p[2], u), T: t.slugify(p[2]), C: p[1].length }), h: (p, h, u) => r(`h${p.C}`, { id: p.T, key: u.k }, h(p.v, u)) }, headingSetext: { t: it(fl), i: ae.MAX, l: (p, h, u) => ({ v: or(h, p[1], u), C: p[2] === "=" ? 1 : 2, type: "heading" }) }, htmlComment: { t: gn(ml), i: ae.HIGH, l: () => ({}), h: eo }, image: { t: ht(Ib), i: ae.HIGH, l: (p) => ({ D: p[1], B: wi(p[2]), F: p[3] }), h: (p, h, u) => r("img", { key: u.k, alt: p.D || void 0, title: p.F || void 0, src: Gt(p.B) }) }, link: { t: mt(Mb), i: ae.LOW, l: (p, h, u) => ({ v: Vb(h, p[1], u), B: wi(p[2]), F: p[3] }), h: (p, h, u) => r("a", { key: u.k, href: Gt(p.B), title: p.F }, h(p.v, u)) }, linkAngleBraceStyleDetector: { t: mt(sb), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], type: "link" }) }, linkBareUrlDetector: { t: (p, h) => h.N ? null : mt(ab)(p, h), i: ae.MAX, l: (p) => ({ v: [{ v: p[1], type: "text" }], B: p[1], F: void 0, type: "link" }) }, linkMailtoDetector: { t: mt(ib), i: ae.MAX, l(p) {
    let h = p[1], u = p[1];
    return Hg.test(u) || (u = "mailto:" + u), { v: [{ v: h.replace("mailto:", ""), type: "text" }], B: u, type: "link" };
  } }, orderedList: bi(r, 1), unorderedList: bi(r, 2), newlineCoalescer: { t: it(Kg), i: ae.LOW, l: Qr, h: () => `
` }, paragraph: { t: Lb, i: ae.LOW, l: Zr, h: (p, h, u) => r("p", { key: u.k }, h(p.v, u)) }, ref: { t: mt(cb), i: ae.MAX, l: (p) => (l[p[1]] = { B: p[2], F: p[4] }, {}), h: eo }, refImage: { t: ht(pb), i: ae.MAX, l: (p) => ({ D: p[1] || void 0, P: p[2] }), h: (p, h, u) => r("img", { key: u.k, alt: p.D, src: Gt(l[p.P].B), title: l[p.P].F }) }, refLink: { t: mt(db), i: ae.MAX, l: (p, h, u) => ({ v: h(p[1], u), Z: h(p[0].replace(ub, "\\$1"), u), P: p[2] }), h: (p, h, u) => l[p.P] ? r("a", { key: u.k, href: Gt(l[p.P].B), title: l[p.P].F }, h(p.v, u)) : r("span", { key: u.k }, h(p.Z, u)) }, table: { t: it(hl), i: ae.HIGH, l: jb, h: (p, h, u) => r("table", { key: u.k }, r("thead", null, r("tr", null, p.L.map(function(b, x) {
    return r("th", { key: x, style: yi(p, x) }, h(b, u));
  }))), r("tbody", null, p.A.map(function(b, x) {
    return r("tr", { key: x }, b.map(function(P, w) {
      return r("td", { key: w, style: yi(p, w) }, h(P, u));
    }));
  }))) }, tableSeparator: { t: function(p, h) {
    return h.$ ? (h._ = !0, hb.exec(p)) : null;
  }, i: ae.HIGH, l: function() {
    return { type: "tableSeparator" };
  }, h: () => " | " }, text: { t: gn(Cb), i: ae.MIN, l: (p) => ({ v: p[0].replace(nb, (h, u) => t.namedCodesToUnicode[u] ? t.namedCodesToUnicode[u] : h) }), h: (p) => p.v }, textBolded: { t: ht(xb), i: ae.MED, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => r("strong", { key: u.k }, h(p.v, u)) }, textEmphasized: { t: ht(Eb), i: ae.LOW, l: (p, h, u) => ({ v: h(p[2], u) }), h: (p, h, u) => r("em", { key: u.k }, h(p.v, u)) }, textEscaped: { t: ht(Nb), i: ae.HIGH, l: (p) => ({ v: p[1], type: "text" }) }, textMarked: { t: ht(kb), i: ae.LOW, l: Zr, h: (p, h, u) => r("mark", { key: u.k }, h(p.v, u)) }, textStrikethroughed: { t: ht(Tb), i: ae.LOW, l: Zr, h: (p, h, u) => r("del", { key: u.k }, h(p.v, u)) } };
  t.disableParsingRawHTML !== !0 && (c.htmlBlock = { t: gn(vo), i: ae.HIGH, l(p, h, u) {
    const [, b] = p[3].match(Ob), x = new RegExp(`^${b}`, "gm"), P = p[3].replace(x, ""), w = (E = P, Ab.some((I) => I.test(E)) ? Fb : or);
    var E;
    const y = p[1].toLowerCase(), C = zg.indexOf(y) !== -1;
    u.N = u.N || y === "a";
    const N = C ? p[3] : w(h, P, u);
    return u.N = !1, { O: a(p[2]), v: N, G: C, H: C ? y : p[1] };
  }, h: (p, h, u) => r(p.H, Pt({ key: u.k }, p.O), p.G ? p.v : h(p.v, u)) }, c.htmlSelfClosing = { t: gn(yo), i: ae.HIGH, l: (p) => ({ O: a(p[2] || ""), H: p[1] }), h: (p, h, u) => r(p.H, Pt({}, p.O, { key: u.k })) });
  const d = function(p) {
    let h = Object.keys(p);
    function u(b, x) {
      let P = [], w = "";
      for (; b; ) {
        let E = 0;
        for (; E < h.length; ) {
          const y = h[E], C = p[y], N = C.t(b, x, w);
          if (N) {
            const I = N[0];
            b = b.substring(I.length);
            const B = C.l(N, u, x);
            B.type == null && (B.type = y), P.push(B), w = I;
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
      return u(function(P) {
        return P.replace(Jg, `
`).replace(eb, "").replace(mb, "    ");
      }(b), x);
    };
  }(c), f = (v = function(p) {
    return function(h, u, b) {
      return p[h.type].h(h, u, b);
    };
  }(c), function p(h, u = {}) {
    if (Array.isArray(h)) {
      const b = u.k, x = [];
      let P = !1;
      for (let w = 0; w < h.length; w++) {
        u.k = w;
        const E = p(h[w], u), y = typeof E == "string";
        y && P ? x[x.length - 1] += E : E !== null && x.push(E), P = y;
      }
      return u.k = b, x;
    }
    return v(h, p, u);
  });
  var v;
  const g = o(e);
  return i.length ? r("div", null, g, r("footer", { key: "footer" }, i.map(function(p) {
    return r("div", { id: t.slugify(p.j), key: p.j }, p.j, f(d(p.I, { _: !0 })));
  }))) : g;
}
(function(e) {
  e[e.MAX = 0] = "MAX", e[e.HIGH = 1] = "HIGH", e[e.MED = 2] = "MED", e[e.LOW = 3] = "LOW", e[e.MIN = 4] = "MIN";
})(ae || (ae = {}));
const Hb = (e) => {
  let { children: t, options: n } = e, r = function(o, a) {
    if (o == null)
      return {};
    var i, l, c = {}, d = Object.keys(o);
    for (l = 0; l < d.length; l++)
      a.indexOf(i = d[l]) >= 0 || (c[i] = o[i]);
    return c;
  }(e, Fg);
  return T.cloneElement(Ub(t, n), r);
};
function Gv({ markdown: e }) {
  return /* @__PURE__ */ m("div", { className: "pr-prose", children: /* @__PURE__ */ m(Hb, { children: e }) });
}
const Wv = (e, t) => {
  Fe(() => {
    if (!e)
      return () => {
      };
    const n = e(t);
    return () => {
      n();
    };
  }, [e, t]);
}, no = () => !1, Xv = (e, t) => {
  const [n] = bo(
    Ce(async () => {
      if (!e)
        return no;
      const r = await Promise.resolve(e(t));
      return async () => r();
    }, [t, e]),
    no,
    // We want the unsubscriber to return to default value immediately upon changing subscription
    // So the useEffect below will unsubscribe asap
    { preserveValue: !1 }
  );
  Fe(() => () => {
    n !== no && n();
  }, [n]);
}, Gb = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "div",
    {
      ref: n,
      className: L(
        "pr-rounded-lg pr-border pr-bg-card pr-text-card-foreground pr-shadow-sm",
        e
      ),
      ...t
    }
  )
);
Gb.displayName = "Card";
const Wb = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "div",
    {
      ref: n,
      className: L("pr-flex pr-flex-col pr-space-y-1.5 pr-p-6", e),
      ...t
    }
  )
);
Wb.displayName = "CardHeader";
const Xb = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m(
    "h3",
    {
      ref: n,
      className: L("pr-text-2xl pr-font-semibold pr-leading-none pr-tracking-tight", e),
      ...t,
      children: t.children
    }
  )
);
Xb.displayName = "CardTitle";
const qb = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("p", { ref: n, className: L("pr-text-sm pr-text-muted-foreground", e), ...t }));
qb.displayName = "CardDescription";
const Yb = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: L("pr-p-6 pr-pt-0", e), ...t })
);
Yb.displayName = "CardContent";
const Kb = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: L("pr-flex pr-items-center pr-p-6 pr-pt-0", e), ...t })
);
Kb.displayName = "CardFooter";
const Jb = xo(
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
), Zb = G.forwardRef(({ className: e, variant: t, ...n }, r) => /* @__PURE__ */ m("div", { ref: r, role: "alert", className: L(Jb({ variant: t }), e), ...n }));
Zb.displayName = "Alert";
const Qb = G.forwardRef(
  ({ className: e, ...t }, n) => /* @__PURE__ */ D(
    "h5",
    {
      ref: n,
      className: L("pr-mb-1 pr-font-medium pr-leading-none pr-tracking-tight", e),
      ...t,
      children: [
        t.children,
        " "
      ]
    }
  )
);
Qb.displayName = "AlertTitle";
const ev = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m("div", { ref: n, className: L("pr-text-sm [&_p]:pr-leading-relaxed", e), ...t }));
ev.displayName = "AlertDescription";
const tv = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ D(
  bn.Root,
  {
    ref: n,
    className: L(
      "pr-relative pr-flex pr-w-full pr-touch-none pr-select-none pr-items-center",
      e
    ),
    ...t,
    children: [
      /* @__PURE__ */ m(bn.Track, { className: "pr-relative pr-h-2 pr-w-full pr-grow pr-overflow-hidden pr-rounded-full pr-bg-secondary", children: /* @__PURE__ */ m(bn.Range, { className: "pr-absolute pr-h-full pr-bg-primary" }) }),
      /* @__PURE__ */ m(bn.Thumb, { className: "pr-block pr-h-5 pr-w-5 pr-rounded-full pr-border-2 pr-border-primary pr-bg-background pr-ring-offset-background pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 disabled:pr-pointer-events-none disabled:pr-opacity-50" })
    ]
  }
));
tv.displayName = bn.Root.displayName;
const nv = G.forwardRef(({ className: e, ...t }, n) => /* @__PURE__ */ m(
  oo.Root,
  {
    className: L(
      "pr-peer pr-inline-flex pr-h-6 pr-w-11 pr-shrink-0 pr-cursor-pointer pr-items-center pr-rounded-full pr-border-2 pr-border-transparent pr-transition-colors focus-visible:pr-outline-none focus-visible:pr-ring-2 focus-visible:pr-ring-ring focus-visible:pr-ring-offset-2 focus-visible:pr-ring-offset-background disabled:pr-cursor-not-allowed disabled:pr-opacity-50 data-[state=checked]:pr-bg-primary data-[state=unchecked]:pr-bg-input",
      e
    ),
    ...t,
    ref: n,
    children: /* @__PURE__ */ m(
      oo.Thumb,
      {
        className: L(
          "pr-pointer-events-none pr-block pr-h-5 pr-w-5 pr-rounded-full pr-bg-background pr-shadow-lg pr-ring-0 pr-transition-transform data-[state=checked]:pr-translate-x-5 data-[state=unchecked]:pr-translate-x-0"
        )
      }
    )
  }
));
nv.displayName = oo.Root.displayName;
function rv(e, t = "top") {
  if (!e || typeof document > "u")
    return;
  const n = document.head || document.querySelector("head"), r = n.querySelector(":first-child"), o = document.createElement("style");
  o.appendChild(document.createTextNode(e)), t === "top" && r ? n.insertBefore(o, r) : n.appendChild(o);
}
rv(`/*
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
.banded-row:hover {
  cursor: pointer;
}

.banded-row[data-state="selected"]:hover {
  cursor: default;
}
`, "top");
export {
  Zb as Alert,
  ev as AlertDescription,
  Qb as AlertTitle,
  Tv as BookChapterControl,
  we as Button,
  Gb as Card,
  Yb as CardContent,
  qb as CardDescription,
  Kb as CardFooter,
  Wb as CardHeader,
  Xb as CardTitle,
  Nv as ChapterRangeSelector,
  Vv as CharacterInventory,
  Tp as Checkbox,
  Cv as Checklist,
  va as ComboBox,
  Sv as ContextMenu,
  mp as DataTable,
  Uv as DisableButton,
  Bi as DropdownMenu,
  Li as DropdownMenuCheckboxItem,
  No as DropdownMenuContent,
  wv as DropdownMenuGroup,
  ji as DropdownMenuItem,
  br as DropdownMenuLabel,
  xv as DropdownMenuPortal,
  kv as DropdownMenuRadioGroup,
  qc as DropdownMenuRadioItem,
  Co as DropdownMenuSeparator,
  Yc as DropdownMenuShortcut,
  Ev as DropdownMenuSub,
  Xc as DropdownMenuSubContent,
  Wc as DropdownMenuSubTrigger,
  Gc as DropdownMenuTrigger,
  zv as EnableButton,
  $h as GridMenu,
  Tg as HamburgerMenuButton,
  Ov as IconButton,
  Dn as Input,
  Fv as InstallButton,
  sl as Label,
  Wt as LabelPosition,
  Mv as List,
  Av as ListHeader,
  Iv as ListItem,
  Gv as MarkdownRenderer,
  Us as MenuItem,
  _v as NavigationContentSearch,
  Rv as ScriptureResultsViewer,
  $g as SearchBar,
  ar as Select,
  Rn as SelectContent,
  lp as SelectGroup,
  Ke as SelectItem,
  cp as SelectLabel,
  Fi as SelectScrollDownButton,
  Vi as SelectScrollUpButton,
  pp as SelectSeparator,
  On as SelectTrigger,
  ir as SelectValue,
  tv as ShadCnSlider,
  nv as ShadCnSwitch,
  Pv as Slider,
  $v as Snackbar,
  Dv as Switch,
  vr as Table,
  wr as TableBody,
  fp as TableCaption,
  Yt as TableCell,
  up as TableFooter,
  Pn as TableHead,
  yr as TableHeader,
  vt as TableRow,
  Lv as Tabs,
  Dg as TabsContent,
  Ig as TabsList,
  Ag as TabsTrigger,
  Bv as TextField,
  jv as Toolbar,
  Hv as UpdateButton,
  rl as VerticalTabs,
  al as VerticalTabsContent,
  ol as VerticalTabsList,
  _g as VerticalTabsTrigger,
  ip as buttonVariants,
  Wv as useEvent,
  Xv as useEventAsync,
  bo as usePromise
};
//# sourceMappingURL=index.js.map
